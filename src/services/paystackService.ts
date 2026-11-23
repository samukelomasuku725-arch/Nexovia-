/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN PAYSTACK 2-DAY FREE TRIAL & SUBSCRIPTION SERVICE
 *
 * Uses Paystack LIVE public key (pk_live_... via VITE_PAYSTACK_PUBLIC_KEY / NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY / /api/paystack/public-key)
 * with PaystackPop.setup inline checkout (amount: 6000 ZAR cents, currency: 'ZAR', ref: 'NEXOVIAN-' + timestamp),
 * updates Supabase `public.profiles` (is_paid, trial_end, paystack_ref) in the payment callback,
 * stores `nexovian_paid = 'true'` in localStorage, and verifies `public.profiles` on login & page load.
 */

import { supabase } from '../supabase';
import {
  checkFastTrialState,
  recordPaymentSuccess,
  TrialStateResult,
  TrialTimelineInfo,
  PREMIUM_TRIAL_ENDS_AT_ISO,
  PREMIUM_TRIAL_ENDS_AT
} from './antiAbuseService';

export const SUBSCRIPTION_PLAN_NAME = 'Nexovian Monthly';
export const PAYSTACK_SUCCESS_URL =
  typeof window !== 'undefined' ? `${window.location.origin}/success` : 'https://nexovian.group/success';
export const SUBSCRIPTION_AMOUNT_CENTS = 6000; // R60 in cents
export const SUBSCRIPTION_AMOUNT_ZAR = 60;

export const PENDING_TRIAL_STORAGE_KEY = 'nexovian_pending_trial';

export interface PaystackSubscriptionRecord {
  status: 'none' | 'trial' | 'active' | 'cancelled' | 'expired' | 'anonymous';
  has_access: boolean;
  trial_end_date: string | null;
  next_payment_date: string | null;
  subscription_code: string | null;
  days_remaining: number;
  hours_remaining: number;
  is_admin?: boolean;
  cancelled_at?: string | null;
}

export interface SubscriptionStatus {
  isSubscribed: boolean;
  isTrialActive: boolean;
  isTrialExpired: boolean;
  hoursRemainingInTrial: number;
  trialExpiresAt: Date;
  subscriptionPlan: string;
  reference?: string;
  showYellowBox: boolean;
  actualTrialEndDate: string;
  smartBlockMessage?: string;
  timelineInfo: TrialTimelineInfo;
  isAdmin?: boolean;
}

// Authoritative in-memory store populated strictly from Supabase `profiles` / `users` / server verification
const verifiedAccessByEmail = new Map<string, PaystackSubscriptionRecord>();

function normalizeEmail(email?: string | null): string {
  return String(email || '').trim().toLowerCase();
}

function isFutureDate(isoDate?: string | null): boolean {
  if (!isoDate) return false;
  const ms = new Date(isoDate).getTime();
  return Number.isFinite(ms) && ms > Date.now();
}

function getRemainingTime(isoDate?: string | null): { days: number; hours: number } {
  if (!isoDate) return { days: 0, hours: 0 };
  const diffMs = Math.max(0, new Date(isoDate).getTime() - Date.now());
  const hours = Math.ceil(diffMs / (1000 * 60 * 60));
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return { days, hours };
}

export function getCachedPaystackStatus(email?: string | null): PaystackSubscriptionRecord | null {
  const norm = normalizeEmail(email);
  if (!norm) return null;
  const record = verifiedAccessByEmail.get(norm);
  if (!record) return null;

  const now = Date.now();
  if (record.status === 'trial' && record.trial_end_date && now > new Date(record.trial_end_date).getTime()) {
    return { ...record, status: 'expired', has_access: false };
  }
  if (
    record.status === 'active' &&
    record.next_payment_date &&
    now > new Date(record.next_payment_date).getTime()
  ) {
    return { ...record, status: 'expired', has_access: false };
  }
  return record;
}

export function saveCachedPaystackStatus(email: string, state: PaystackSubscriptionRecord): void {
  const normEmail = normalizeEmail(email);
  if (!normEmail) return;

  if (state.has_access && (state.status === 'trial' || state.status === 'active')) {
    verifiedAccessByEmail.set(normEmail, state);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('nexovian_paid', 'true');
        if (state.trial_end_date) {
          localStorage.setItem('nexovian_trial_end', state.trial_end_date);
        }
        localStorage.setItem('nexovian_paid_email', normEmail);
      } catch {
        // Ignore storage errors
      }
    }
  } else {
    verifiedAccessByEmail.set(normEmail, { ...state, has_access: false });
    clearCachedPaystackFlags(undefined, normEmail);
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('nexovian-subscription-updated', { detail: state }));
  }
}

export function clearCachedPaystackFlags(userId?: string, email?: string): void {
  if (email) {
    verifiedAccessByEmail.delete(normalizeEmail(email));
  } else {
    verifiedAccessByEmail.clear();
  }

  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem('nexovian_paystack_active');
    localStorage.removeItem('nexovian_paid');
    localStorage.removeItem('nexovian_trial_end');
    localStorage.removeItem('nexovian_paid_email');
    localStorage.removeItem('isPremium');
    localStorage.removeItem('nexovian_premium');
    localStorage.removeItem('nexovian_unlocked');
    localStorage.removeItem('nexovian_subscription');
    if (userId) {
      localStorage.removeItem(`nexovian_sub_${userId}`);
    }
    if (email) {
      const normEmail = normalizeEmail(email);
      localStorage.removeItem(`nexovian_paid_status_${normEmail}`);
      localStorage.removeItem(`nexovian_paystack_sub_${normEmail}`);
    }
  } catch {
    // Ignore storage errors
  }
}

/**
 * Resolves the Paystack LIVE public key (`pk_...`) from existing env vars or runtime `/api/paystack/public-key`.
 * Never hardcodes secrets or switches to a test key.
 */
async function resolvePaystackPublicKey(): Promise<string> {
  const env = ((import.meta as any)?.env || {}) as Record<string, string | undefined>;
  const buildTimeKey = (
    env.VITE_PAYSTACK_PUBLIC_KEY ||
    env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ||
    env.PAYSTACK_PUBLIC_KEY ||
    ''
  ).trim();

  if (buildTimeKey.startsWith('pk_')) {
    return buildTimeKey;
  }

  try {
    const res = await fetch('/api/paystack/public-key');
    if (res.ok) {
      const data = await res.json();
      const serverKey = String(data?.publicKey || '').trim();
      if (serverKey.startsWith('pk_')) {
        return serverKey;
      }
    }
  } catch {
    // Ignore fetch error
  }

  return '';
}

/**
 * Ensures `window.PaystackPop` from https://js.paystack.co/v1/inline.js is ready before opening checkout.
 */
async function ensurePaystackPop(): Promise<any | null> {
  if (typeof window === 'undefined') return null;
  if ((window as any).PaystackPop) {
    return (window as any).PaystackPop;
  }

  await new Promise<void>((resolve) => {
    const existing = document.querySelector('script[src*="js.paystack.co/v1/inline.js"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => resolve(), { once: true });
      setTimeout(() => resolve(), 3000);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
    setTimeout(() => resolve(), 4000);
  });

  return (window as any).PaystackPop || null;
}

/**
 * Persists a verified Paystack payment into Supabase `public.profiles`
 * (`id`, `email`, `is_paid`, `trial_end`, `paystack_ref`) and `localStorage.nexovian_paid = 'true'`.
 * Logs and alerts immediately if Supabase update fails.
 */
export async function savePaidProfileToSupabase({
  userId,
  email,
  paystackRef,
  trialEndIso
}: {
  userId?: string | null;
  email?: string | null;
  paystackRef: string;
  trialEndIso?: string;
}): Promise<{ success: boolean; trialEnd: string; error?: string }> {
  const trialEnd = trialEndIso || new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString();

  let currentUserId = String(userId || '').trim();
  let currentEmail = normalizeEmail(email);

  try {
    const {
      data: { user: authUser }
    } = await supabase.auth.getUser();
    if (authUser?.id) currentUserId = authUser.id;
    if (authUser?.email) currentEmail = normalizeEmail(authUser.email);
  } catch {
    // Use provided userId / email
  }

  if (!currentEmail && !currentUserId) {
    const msg = 'Cannot update Supabase profiles: missing user email and user id.';
    console.log(msg);
    if (typeof window !== 'undefined' && typeof window.alert === 'function') {
      window.alert(msg);
    }
    return { success: false, trialEnd, error: msg };
  }

  let upsertError: any = null;

  try {
    if (currentUserId) {
      const { error } = await supabase.from('profiles').upsert(
        {
          id: currentUserId,
          email: currentEmail,
          is_paid: true,
          trial_end: trialEnd,
          paystack_ref: paystackRef
        },
        { onConflict: 'id' }
      );
      upsertError = error;

      // If a row with this email already exists under another id, upsert on email conflict instead
      if (upsertError) {
        const errMsg = String(upsertError.message || '').toLowerCase();
        if (errMsg.includes('email') || errMsg.includes('unique') || upsertError.code === '23505') {
          const { error: retryErr } = await supabase.from('profiles').upsert(
            {
              id: currentUserId,
              email: currentEmail,
              is_paid: true,
              trial_end: trialEnd,
              paystack_ref: paystackRef
            },
            { onConflict: 'email' }
          );
          upsertError = retryErr;
        }
      }
    } else {
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', currentEmail)
        .maybeSingle();

      const resolvedId =
        existingProfile?.id ||
        (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
          ? crypto.randomUUID()
          : undefined);

      const profilePayload: Record<string, any> = {
        email: currentEmail,
        is_paid: true,
        trial_end: trialEnd,
        paystack_ref: paystackRef
      };
      if (resolvedId) {
        profilePayload.id = resolvedId;
      }

      const { error } = await supabase
        .from('profiles')
        .upsert(profilePayload, { onConflict: 'email' });
      upsertError = error;
    }
  } catch (err: any) {
    upsertError = err;
  }

  if (upsertError) {
    const errText = upsertError?.message || JSON.stringify(upsertError);
    console.log('Supabase profiles upsert error:', upsertError);
    if (typeof window !== 'undefined' && typeof window.alert === 'function') {
      window.alert(`Payment received (Ref: ${paystackRef}), but Supabase unlock failed: ${errText}`);
    }
    return { success: false, trialEnd, error: errText };
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('nexovian_paid', 'true');
      localStorage.setItem('nexovian_trial_end', trialEnd);
      if (currentEmail) {
        localStorage.setItem('nexovian_paid_email', currentEmail);
      }
    } catch {
      // Ignore storage errors
    }
  }

  if (currentEmail) {
    saveCachedPaystackStatus(currentEmail, {
      status: 'trial',
      has_access: true,
      trial_end_date: trialEnd,
      next_payment_date: trialEnd,
      subscription_code: paystackRef,
      days_remaining: 2,
      hours_remaining: 48
    });
  }

  return { success: true, trialEnd };
}

/**
 * Checks authoritative payment unlock directly via:
 * 1) supabase.auth.getUser() -> Supabase `profiles` table (`is_paid`, `trial_end`, `paystack_ref`)
 * 2) Fallback: Supabase `users` table (`is_paid`, `plan`) if no `profiles` row exists yet
 */
export async function checkSupabasePaidAccess(
  fallbackEmail?: string | null,
  fallbackUserId?: string | null
): Promise<{
  isPaid: boolean;
  plan: string;
  email: string | null;
  trialEnd: string | null;
  paystackRef: string | null;
  hasProfileRow?: boolean;
  expired?: boolean;
}> {
  let targetUserId = String(fallbackUserId || '').trim();
  let targetEmail = normalizeEmail(fallbackEmail);

  try {
    const { data: authData } = await supabase.auth.getUser();
    if (authData?.user?.id) {
      targetUserId = authData.user.id;
    }
    if (authData?.user?.email) {
      targetEmail = normalizeEmail(authData.user.email);
    }
  } catch {
    // Continue with fallback credentials if getUser() has no active Supabase token yet
  }

  if (!targetEmail && typeof window !== 'undefined') {
    try {
      targetEmail = normalizeEmail(localStorage.getItem('nexovian_paid_email'));
    } catch {
      // Ignore
    }
  }

  if (!targetEmail && !targetUserId) {
    return {
      isPaid: false,
      plan: 'free',
      email: null,
      trialEnd: null,
      paystackRef: null
    };
  }

  // 1. Check authoritative `public.profiles` table (`is_paid` + `trial_end` in the future)
  try {
    let profileRow: any = null;

    if (targetUserId) {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, is_paid, trial_end, paystack_ref')
        .eq('id', targetUserId)
        .maybeSingle();
      if (!error && data) {
        profileRow = data;
      }
    }

    if (!profileRow && targetEmail) {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, is_paid, trial_end, paystack_ref')
        .eq('email', targetEmail)
        .maybeSingle();
      if (!error && data) {
        profileRow = data;
      }
    }

    if (profileRow) {
      const resolvedEmail = normalizeEmail(profileRow.email) || targetEmail || null;
      const validFutureTrial = isFutureDate(profileRow.trial_end);

      if (profileRow.is_paid === true && validFutureTrial) {
        return {
          isPaid: true,
          plan: 'trial',
          email: resolvedEmail,
          trialEnd: profileRow.trial_end,
          paystackRef: profileRow.paystack_ref || null,
          hasProfileRow: true
        };
      }

      return {
        isPaid: false,
        plan: 'free',
        email: resolvedEmail,
        trialEnd: profileRow.trial_end || null,
        paystackRef: profileRow.paystack_ref || null,
        hasProfileRow: true,
        expired: Boolean(profileRow.is_paid === true && !validFutureTrial)
      };
    }
  } catch (err) {
    console.log('Supabase profiles check warning:', err);
  }

  // 2. Fallback check on `users` table if no `profiles` row exists
  if (targetEmail) {
    try {
      const { data: userRow, error } = await supabase
        .from('users')
        .select('is_paid, plan, paystack_reference, paid_at')
        .eq('email', targetEmail)
        .maybeSingle();

      if (!error && userRow?.is_paid === true) {
        const plan = String(userRow.plan || 'trial');
        const paidAtMs = userRow.paid_at ? new Date(userRow.paid_at).getTime() : Date.now();
        const defaultEnd =
          plan === 'active' || plan === 'monthly'
            ? new Date(paidAtMs + 30 * 24 * 60 * 60 * 1000).toISOString()
            : new Date(paidAtMs + 2 * 24 * 60 * 60 * 1000).toISOString();

        return {
          isPaid: isFutureDate(defaultEnd),
          plan,
          email: targetEmail,
          trialEnd: defaultEnd,
          paystackRef: userRow.paystack_reference || null,
          hasProfileRow: false
        };
      }
    } catch {
      // Fall through to server-verified status check
    }
  }

  return {
    isPaid: false,
    plan: 'free',
    email: targetEmail || null,
    trialEnd: null,
    paystackRef: null,
    hasProfileRow: false
  };
}

export async function syncSubscriptionStatus(
  email?: string | null,
  userId?: string | null
): Promise<PaystackSubscriptionRecord> {
  const supabaseCheck = await checkSupabasePaidAccess(email, userId);
  const targetEmail = supabaseCheck.email || normalizeEmail(email);

  if (!targetEmail) {
    return {
      status: 'anonymous',
      has_access: false,
      trial_end_date: null,
      next_payment_date: null,
      subscription_code: null,
      days_remaining: 0,
      hours_remaining: 0
    };
  }

  if (supabaseCheck.isPaid) {
    const isMonthly = supabaseCheck.plan === 'active' || supabaseCheck.plan === 'monthly';
    const remaining = getRemainingTime(supabaseCheck.trialEnd);
    const record: PaystackSubscriptionRecord = {
      status: isMonthly ? 'active' : 'trial',
      has_access: true,
      trial_end_date: supabaseCheck.trialEnd,
      next_payment_date: supabaseCheck.trialEnd,
      subscription_code: supabaseCheck.paystackRef,
      days_remaining: remaining.days || (isMonthly ? 30 : 2),
      hours_remaining: remaining.hours || (isMonthly ? 720 : 48)
    };
    saveCachedPaystackStatus(targetEmail, record);
    return record;
  }

  // If `profiles` explicitly says `is_paid = false` or `trial_end` expired, lock immediately
  if (supabaseCheck.hasProfileRow) {
    const lockedProfileRecord: PaystackSubscriptionRecord = {
      status: supabaseCheck.expired ? 'expired' : 'none',
      has_access: false,
      trial_end_date: supabaseCheck.trialEnd,
      next_payment_date: null,
      subscription_code: supabaseCheck.paystackRef,
      days_remaining: 0,
      hours_remaining: 0
    };
    saveCachedPaystackStatus(targetEmail, lockedProfileRecord);
    return lockedProfileRecord;
  }

  try {
    const params = new URLSearchParams({ email: targetEmail });
    if (userId) params.set('userId', userId);
    const res = await fetch(`/api/paystack/status?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      const endDate = data.trial_end_date || data.next_payment_date || null;
      const serverPaid = Boolean(data.is_paid || data.has_access) && (!endDate || isFutureDate(endDate));
      const serverStatus: PaystackSubscriptionRecord['status'] =
        data.status && data.status !== 'none'
          ? serverPaid
            ? data.status
            : 'expired'
          : serverPaid
            ? data.plan === 'active'
              ? 'active'
              : 'trial'
            : 'none';

      const remaining = getRemainingTime(endDate);
      const record: PaystackSubscriptionRecord = {
        status: serverStatus,
        has_access: serverPaid,
        trial_end_date: data.trial_end_date || null,
        next_payment_date: data.next_payment_date || null,
        subscription_code: data.subscription_code || null,
        days_remaining: Number(data.days_remaining || remaining.days || 0),
        hours_remaining: Number(data.hours_remaining || remaining.hours || 0),
        is_admin: Boolean(data.is_admin),
        cancelled_at: data.record?.cancelled_at || null
      };
      saveCachedPaystackStatus(targetEmail, record);
      return record;
    }
  } catch (err) {
    console.warn('[Paystack Status Sync Warning]:', err);
  }

  const lockedRecord: PaystackSubscriptionRecord = {
    status: 'none',
    has_access: false,
    trial_end_date: null,
    next_payment_date: null,
    subscription_code: null,
    days_remaining: 0,
    hours_remaining: 0
  };
  saveCachedPaystackStatus(targetEmail, lockedRecord);
  return lockedRecord;
}

/**
 * Starts the 2-Day Free Trial / R60 Paystack flow.
 * - Checks supabase.auth.getUser() first: if unauthenticated, redirects to /login?next=<pathname> and returns early.
 * - Opens PaystackPop.setup with LIVE public key (amount: 6000 cents = R60, currency: 'ZAR', ref: 'NEXOVIAN-' + timestamp).
 * - On Paystack payment success callback: upserts Supabase `public.profiles` (`id`, `email`, `is_paid: true`, `trial_end`, `paystack_ref`),
 *   saves `nexovian_paid = 'true'` to localStorage, and reloads the page to display unlocked content.
 */
export async function startTwoDayFreeTrialCheckout({
  user
}: {
  user?: { id?: string; email?: string; name?: string } | null;
  onRequireAuth?: () => void;
} = {}): Promise<{ success: boolean; redirectedToAuth?: boolean; error?: string }> {
  const {
    data: { user: authUser }
  } = await supabase.auth.getUser();

  if (!authUser) {
    if (typeof window !== 'undefined') {
      const nextTarget = `${window.location.pathname}${window.location.search || ''}` || '/';
      window.location.href = `/login?next=${encodeURIComponent(nextTarget)}`;
    }
    return { success: false, redirectedToAuth: true };
  }

  const email = (authUser.email || user?.email || '').trim().toLowerCase();
  const userId = (authUser.id || user?.id || '').trim();
  if (!email) {
    if (typeof window !== 'undefined') {
      const nextTarget = `${window.location.pathname}${window.location.search || ''}` || '/';
      window.location.href = `/login?next=${encodeURIComponent(nextTarget)}`;
    }
    return { success: false, redirectedToAuth: true };
  }

  // Primary path: PaystackPop Inline Live Checkout (amount: 6000 = R60, ZAR, NEXOVIAN- + timestamp)
  const [publicKey, PaystackPop] = await Promise.all([resolvePaystackPublicKey(), ensurePaystackPop()]);

  if (publicKey && PaystackPop) {
    const reference = `NEXOVIAN-${Date.now()}`;

    return await new Promise<{ success: boolean; error?: string }>((resolve) => {
      try {
        const handler = PaystackPop.setup({
          key: publicKey,
          email,
          amount: 6000,
          currency: 'ZAR',
          ref: reference,
          metadata: {
            user_id: userId,
            email,
            custom_fields: [
              {
                display_name: 'Subscription',
                variable_name: 'subscription',
                value: 'Nexovian 2-Day Free Trial / R60'
              }
            ]
          },
          callback: function (response: { reference?: string }) {
            void (async () => {
              const paystackRef = response?.reference || reference;
              const trialEndIso = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString();

              const saveResult = await savePaidProfileToSupabase({
                userId,
                email,
                paystackRef,
                trialEndIso
              });

              if (!saveResult.success) {
                resolve({ success: false, error: saveResult.error });
                return;
              }

              // Sync server verify route non-blockingly so backend records match
              try {
                await fetch(
                  `/api/paystack/verify?reference=${encodeURIComponent(paystackRef)}&email=${encodeURIComponent(email)}&userId=${encodeURIComponent(userId)}`
                );
              } catch {
                // Non-blocking
              }

              if (typeof window !== 'undefined') {
                sessionStorage.removeItem(PENDING_TRIAL_STORAGE_KEY);
                window.location.reload();
              }
              resolve({ success: true });
            })();
          },
          onClose: function () {
            resolve({ success: false });
          }
        });

        handler.openIframe();
      } catch (err: any) {
        const errMsg = err?.message || 'Unable to open Paystack checkout.';
        console.log('PaystackPop.setup error:', err);
        resolve({ success: false, error: errMsg });
      }
    });
  }

  // Fallback path if only server-side secret key is configured
  const {
    data: { session }
  } = await supabase.auth.getSession();
  const accessToken = session?.access_token || '';
  if (!accessToken) {
    if (typeof window !== 'undefined') {
      const nextTarget = `${window.location.pathname}${window.location.search || ''}` || '/';
      window.location.href = `/login?next=${encodeURIComponent(nextTarget)}`;
    }
    return { success: false, redirectedToAuth: true };
  }

  const targetCallback =
    typeof window !== 'undefined' ? `${window.location.origin}/success` : PAYSTACK_SUCCESS_URL;

  try {
    const res = await fetch('/api/paystack/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        email,
        userId,
        callbackUrl: targetCallback
      })
    });

    const data = await res.json();
    if (res.status === 401) {
      if (typeof window !== 'undefined') {
        const nextTarget = `${window.location.pathname}${window.location.search || ''}` || '/';
        window.location.href = `/login?next=${encodeURIComponent(nextTarget)}`;
      }
      return { success: false, redirectedToAuth: true };
    }

    if (!res.ok || !data?.authorization_url) {
      return {
        success: false,
        error: data?.error || 'Could not start Paystack 2-day free trial checkout. Please try again.'
      };
    }

    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(PENDING_TRIAL_STORAGE_KEY);
      window.location.href = data.authorization_url;
    }
    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Network error while connecting to Paystack.'
    };
  }
}

export async function startPaystackCheckout({
  user,
  onRequireAuth
}: {
  user?: { id?: string; email?: string; name?: string } | null;
  returnUrl?: string;
  onRequireAuth?: () => void;
} = {}): Promise<{ success: boolean; redirectedToAuth?: boolean; error?: string }> {
  return startTwoDayFreeTrialCheckout({ user, onRequireAuth });
}

export async function cancelUserSubscription(
  email: string,
  userId?: string
): Promise<{ success: boolean; message: string }> {
  const res = await fetch('/api/paystack/cancel', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, userId })
  });
  const data = await res.json();
  if (!res.ok || !data?.success) {
    return {
      success: false,
      message: data?.error || data?.message || 'Unable to cancel subscription right now.'
    };
  }

  try {
    await supabase
      .from('profiles')
      .update({ is_paid: false })
      .eq('email', normalizeEmail(email));
  } catch {
    // Non-blocking
  }

  clearCachedPaystackFlags(userId, email);
  saveCachedPaystackStatus(email, {
    status: 'cancelled',
    has_access: false,
    trial_end_date: data.record?.trial_end_date || null,
    next_payment_date: null,
    subscription_code: data.record?.paystack_subscription_code || null,
    days_remaining: 0,
    hours_remaining: 0,
    cancelled_at: data.record?.cancelled_at || new Date().toISOString()
  });

  return {
    success: true,
    message: data.message || 'Subscription cancelled. R0 will be charged.'
  };
}

export async function markUserSubscribed(
  userId: string,
  reference: string,
  email?: string,
  status: 'trial' | 'active' = 'trial',
  trialEndDate?: string | null,
  nextPaymentDate?: string | null,
  subscriptionCode?: string | null
): Promise<void> {
  if (email) {
    saveCachedPaystackStatus(email, {
      status,
      has_access: true,
      trial_end_date: trialEndDate || null,
      next_payment_date: nextPaymentDate || trialEndDate || null,
      subscription_code: subscriptionCode || null,
      days_remaining: status === 'trial' ? 2 : 30,
      hours_remaining: status === 'trial' ? 48 : 720
    });
    if (status === 'active') {
      await recordPaymentSuccess(email, reference, userId);
    }
  }
}

export function checkUserSubscription(
  user: { id: string; email?: string; createdAt?: string } | null
): SubscriptionStatus {
  const trialState: TrialStateResult = checkFastTrialState(user);
  const cached = user?.email ? getCachedPaystackStatus(user.email) : null;
  const trialExpiresAt = cached?.trial_end_date
    ? new Date(cached.trial_end_date)
    : new Date(PREMIUM_TRIAL_ENDS_AT_ISO);

  if (cached) {
    return {
      isSubscribed: cached.status === 'active' && cached.has_access,
      isTrialActive: cached.status === 'trial' && cached.has_access,
      isTrialExpired: cached.status === 'expired' || cached.status === 'cancelled',
      hoursRemainingInTrial: cached.hours_remaining || 0,
      trialExpiresAt,
      subscriptionPlan: SUBSCRIPTION_PLAN_NAME,
      showYellowBox: cached.status === 'expired',
      actualTrialEndDate: cached.trial_end_date || PREMIUM_TRIAL_ENDS_AT,
      smartBlockMessage: trialState.smartMessage,
      timelineInfo: trialState.timelineInfo,
      isAdmin: false
    };
  }

  return {
    isSubscribed: false,
    isTrialActive: false,
    isTrialExpired: false,
    hoursRemainingInTrial: 0,
    trialExpiresAt,
    subscriptionPlan: SUBSCRIPTION_PLAN_NAME,
    showYellowBox: false,
    actualTrialEndDate: '',
    smartBlockMessage: '',
    timelineInfo: trialState.timelineInfo,
    isAdmin: false
  };
}

/**
 * Authoritative access check for protected routes: Study Guide, AI Tutor, Scan & Understand, Voice Docs.
 * Strictly checks confirmed Supabase `profiles` (`is_paid === true` and `trial_end` in the future).
 * On reload before async Supabase sync completes, checks `localStorage.nexovian_paid === 'true'` and non-expired `nexovian_trial_end`.
 */
export function isUserActive(user?: any): boolean {
  if (typeof window === 'undefined') return false;

  if (user?.email) {
    const verified = getCachedPaystackStatus(user.email);
    if (verified) {
      if (!verified.has_access) return false;
      if (verified.status === 'trial') {
        return !verified.trial_end_date || Date.now() < new Date(verified.trial_end_date).getTime();
      }
      if (verified.status === 'active') {
        return !verified.next_payment_date || Date.now() < new Date(verified.next_payment_date).getTime();
      }
      return false;
    }
  }

  try {
    if (localStorage.getItem('nexovian_paid') === 'true') {
      const storedTrialEnd = localStorage.getItem('nexovian_trial_end');
      if (!storedTrialEnd || Date.now() < new Date(storedTrialEnd).getTime()) {
        return true;
      }
      localStorage.removeItem('nexovian_paid');
      localStorage.removeItem('nexovian_trial_end');
    }
  } catch {
    // Ignore storage errors
  }

  return false;
}
