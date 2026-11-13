/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN PAYSTACK 2-DAY FREE TRIAL & SUBSCRIPTION SERVICE
 *
 * All Paystack keys and plan codes stay strictly on the server via env vars
 * (PAYSTACK_SECRET_KEY & PAYSTACK_PLAN_CODE). Frontend never hardcodes secrets or plan codes.
 */

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

function getCacheKey(email: string): string {
  return `nexovian_paystack_sub_${email.trim().toLowerCase()}`;
}

export function getCachedPaystackStatus(email?: string | null): PaystackSubscriptionRecord | null {
  if (typeof window === 'undefined' || !email) return null;
  try {
    const raw = localStorage.getItem(getCacheKey(email));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PaystackSubscriptionRecord;
    const now = Date.now();
    if (parsed.status === 'trial' && parsed.trial_end_date && now > new Date(parsed.trial_end_date).getTime()) {
      parsed.status = 'expired';
      parsed.has_access = false;
    } else if (
      parsed.status === 'active' &&
      parsed.next_payment_date &&
      now > new Date(parsed.next_payment_date).getTime()
    ) {
      parsed.status = 'expired';
      parsed.has_access = false;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveCachedPaystackStatus(email: string, state: PaystackSubscriptionRecord): void {
  if (typeof window === 'undefined' || !email) return;
  try {
    const normEmail = email.trim().toLowerCase();
    localStorage.setItem(getCacheKey(normEmail), JSON.stringify(state));
    if (state.has_access && (state.status === 'trial' || state.status === 'active')) {
      localStorage.setItem('nexovian_paystack_active', 'true');
      localStorage.setItem(`nexovian_paid_status_${normEmail}`, state.status === 'active' ? 'PAID_USER' : 'TRIAL');
    } else {
      localStorage.removeItem('nexovian_paystack_active');
      localStorage.removeItem('nexovian_paid');
      localStorage.removeItem('isPremium');
      localStorage.removeItem('nexovian_premium');
      localStorage.removeItem('nexovian_unlocked');
      localStorage.removeItem(`nexovian_paid_status_${normEmail}`);
    }
    window.dispatchEvent(new CustomEvent('nexovian-subscription-updated', { detail: state }));
  } catch {
    // Ignore storage errors
  }
}

export function clearCachedPaystackFlags(userId?: string, email?: string): void {
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
      const normEmail = email.trim().toLowerCase();
      localStorage.removeItem(`nexovian_paid_status_${normEmail}`);
    }
  } catch {
    // Ignore
  }
}

export async function syncSubscriptionStatus(
  email?: string | null,
  userId?: string | null
): Promise<PaystackSubscriptionRecord> {
  if (!email) {
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

  try {
    const params = new URLSearchParams({ email: email.trim().toLowerCase() });
    if (userId) params.set('userId', userId);
    const res = await fetch(`/api/paystack/status?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      const record: PaystackSubscriptionRecord = {
        status: data.status || 'none',
        has_access: Boolean(data.has_access),
        trial_end_date: data.trial_end_date || null,
        next_payment_date: data.next_payment_date || null,
        subscription_code: data.subscription_code || null,
        days_remaining: Number(data.days_remaining || 0),
        hours_remaining: Number(data.hours_remaining || 0),
        is_admin: Boolean(data.is_admin),
        cancelled_at: data.record?.cancelled_at || null
      };
      saveCachedPaystackStatus(email, record);
      return record;
    }
  } catch (err) {
    console.warn('[Paystack Status Sync Warning]:', err);
  }

  return (
    getCachedPaystackStatus(email) || {
      status: 'none',
      has_access: false,
      trial_end_date: null,
      next_payment_date: null,
      subscription_code: null,
      days_remaining: 0,
      hours_remaining: 0
    }
  );
}

/**
 * Starts the 2-Day Free Trial Paystack flow.
 * - If logged out, sets pending trial intent and invokes onRequireAuth (or redirects to /login).
 * - If logged in, calls POST /api/paystack/subscribe (server uses env vars only) and redirects to Paystack checkout.
 */
export async function startTwoDayFreeTrialCheckout({
  user,
  onRequireAuth
}: {
  user?: { id?: string; email?: string; name?: string } | null;
  onRequireAuth?: () => void;
} = {}): Promise<{ success: boolean; redirectedToAuth?: boolean; error?: string }> {
  const email = user?.email?.trim();
  if (!email) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(PENDING_TRIAL_STORAGE_KEY, 'true');
    }
    if (onRequireAuth) {
      onRequireAuth();
    } else if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/login');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    return { success: true, redirectedToAuth: true };
  }

  const targetCallback =
    typeof window !== 'undefined' ? `${window.location.origin}/success` : PAYSTACK_SUCCESS_URL;

  try {
    const res = await fetch('/api/paystack/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        userId: user?.id || '',
        callbackUrl: targetCallback
      })
    });

    const data = await res.json();
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
 * Strictly requires logged-in user AND confirmed Paystack 2-day trial or active monthly subscription.
 * Never grants fake Active status before Paystack card/bank payment confirmation.
 */
export function isUserActive(user?: any): boolean {
  if (typeof window === 'undefined') return false;

  if (!user || !user.email) {
    return false;
  }

  const cached = getCachedPaystackStatus(user.email);
  if (!cached || !cached.has_access) {
    return false;
  }

  if (cached.status === 'trial' && cached.trial_end_date) {
    return Date.now() <= new Date(cached.trial_end_date).getTime();
  }

  if (cached.status === 'active') {
    return !cached.next_payment_date || Date.now() <= new Date(cached.next_payment_date).getTime();
  }

  return false;
}
