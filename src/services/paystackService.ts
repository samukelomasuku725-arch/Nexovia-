/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN PAYSTACK 2-DAY FREE TRIAL & SUBSCRIPTION SERVICE
 *
 * All Paystack keys and plan codes stay strictly on the server via env vars
 * (PAYSTACK_SECRET_KEY & PAYSTACK_PLAN_CODE). Frontend never hardcodes secrets or plan codes.
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
export const SUBSCRIPTION_AMOUNT_CENTS = 6000; // R60/month after 2-day free trial
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

// Authoritative in-memory store populated strictly from Supabase `users` / server verification
const verifiedAccessByEmail = new Map<string, PaystackSubscriptionRecord>();

function normalizeEmail(email?: string | null): string {
  return String(email || '').trim().toLowerCase();
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
 * Checks authoritative payment unlock directly via:
 * 1) supabase.auth.getUser() -> Supabase `users` table (is_paid, plan)
 * 2) Server fallback /api/paystack/status (service-role query on `users` + `profiles`)
 */
export async function checkSupabasePaidAccess(
  fallbackEmail?: string | null
): Promise<{ isPaid: boolean; plan: string; email: string | null }> {
  let targetEmail = normalizeEmail(fallbackEmail);

  try {
    const { data: authData } = await supabase.auth.getUser();
    if (authData?.user?.email) {
      targetEmail = normalizeEmail(authData.user.email);
    }
  } catch {
    // Continue with fallbackEmail if getUser() has no active Supabase token yet
  }

  if (!targetEmail) {
    return { isPaid: false, plan: 'free', email: null };
  }

  try {
    const { data: userRow, error } = await supabase
      .from('users')
      .select('is_paid, plan')
      .eq('email', targetEmail)
      .maybeSingle();

    if (!error && userRow?.is_paid === true) {
      return {
        isPaid: true,
        plan: String(userRow.plan || 'trial'),
        email: targetEmail
      };
    }
  } catch {
    // Fall through to server-verified status check
  }

  return { isPaid: false, plan: 'free', email: targetEmail };
}

export async function syncSubscriptionStatus(
  email?: string | null,
  userId?: string | null
): Promise<PaystackSubscriptionRecord> {
  const supabaseCheck = await checkSupabasePaidAccess(email);
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
    const record: PaystackSubscriptionRecord = {
      status: isMonthly ? 'active' : 'trial',
      has_access: true,
      trial_end_date: null,
      next_payment_date: null,
      subscription_code: null,
      days_remaining: isMonthly ? 30 : 2,
      hours_remaining: isMonthly ? 720 : 48
    };
    saveCachedPaystackStatus(targetEmail, record);
    return record;
  }

  try {
    const params = new URLSearchParams({ email: targetEmail });
    if (userId) params.set('userId', userId);
    const res = await fetch(`/api/paystack/status?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      const serverPaid = Boolean(data.is_paid || data.has_access);
      const serverStatus: PaystackSubscriptionRecord['status'] =
        data.status && data.status !== 'none'
          ? data.status
          : serverPaid
            ? data.plan === 'active'
              ? 'active'
              : 'trial'
            : 'none';

      const record: PaystackSubscriptionRecord = {
        status: serverStatus,
        has_access: serverPaid,
        trial_end_date: data.trial_end_date || null,
        next_payment_date: data.next_payment_date || null,
        subscription_code: data.subscription_code || null,
        days_remaining: Number(data.days_remaining || 0),
        hours_remaining: Number(data.hours_remaining || 0),
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
 * Starts the 2-Day Free Trial Paystack flow.
 * - Checks supabase.auth.getUser() first: if unauthenticated, redirects to /login?next=<pathname> and returns early.
 * - If logged in, calls POST /api/paystack/subscribe with Bearer token + verified email & userId and redirects to Paystack checkout.
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
  if (!email || !userId) {
    if (typeof window !== 'undefined') {
      const nextTarget = `${window.location.pathname}${window.location.search || ''}` || '/';
      window.location.href = `/login?next=${encodeURIComponent(nextTarget)}`;
    }
    return { success: false, redirectedToAuth: true };
  }

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
 * Strictly requires logged-in user AND server/Supabase-confirmed `is_paid === true` or confirmed trial/subscription.
 * Never grants access based only on localStorage or client-only flags.
 */
export function isUserActive(user?: any): boolean {
  if (typeof window === 'undefined') return false;

  if (!user || !user.email) {
    return false;
  }

  const verified = getCachedPaystackStatus(user.email);
  if (!verified || !verified.has_access) {
    return false;
  }

  if (verified.status === 'trial') {
    return !verified.trial_end_date || Date.now() <= new Date(verified.trial_end_date).getTime();
  }

  if (verified.status === 'active') {
    return !verified.next_payment_date || Date.now() <= new Date(verified.next_payment_date).getTime();
  }

  return false;
}
