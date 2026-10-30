/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN - USER TRIAL STATES & PAYWALL ENGINE (CLIENT)
 * 
 * Implements the 5 User States:
 * 1. STATE 1 - Anonymous visitor:
 *    - No account / New link click: DO NOT show subscription required card, DO NOT show "already used" message.
 * 2. STATE 2 - New Account Created (First time email):
 *    - 1 day free trial (24h from user creation), full access to tutor.
 *    - Email saved to used_trial_emails DB AFTER trial ends, NOT before.
 * 3. STATE 3 - Expired Trial (Trial ended, never paid):
 *    - If email exists in used_trial_emails AND never paid: Show yellow box
 *      "Hey! You already used your 1 free day on {actualTrialEndDate}. NEXOVIAN is R60/month to support all 11 languages. Pay to continue learning! 🔥"
 *    - If brand new trial just ended today: Show normal title "Your 1 day free trial ended - Pay R60 to continue" (NO yellow box).
 * 4. STATE 4 - Paid User:
 *    - Full access, no paywall.
 * 5. STATE 5 - Admin Bypass:
 *    - Email in admin list OR localStorage NEXOVIAN_ADMIN = MPUMALANGA2026 = Full access always.
 * 6. NO GLOBAL LOCALSTORAGE CHECK: Check is strictly per-email in DB, not global device.
 */

import { supabase } from '../supabase';

export const ADMIN_EMAILS = [
  'samukelomasuku725@gmail.com',
  'admin@nexovian.co.za',
  'admin@nexovian.ai',
  'nexovian@gmail.com'
];

// Clean legacy global device block localStorage keys to ensure no visitor is blocked globally
if (typeof window !== 'undefined') {
  try {
    localStorage.removeItem('nexovian_used_trial_records_v2');
    localStorage.removeItem('nexovian_device_id_v2');
    localStorage.removeItem('trialUsed');
    localStorage.removeItem('nexovian_device_trials');
  } catch {
    // Ignore
  }
}

/**
 * Checks if the user is an admin (Rule 5: Admin bypass)
 */
export function isAdminUser(user?: { email?: string } | null): boolean {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('NEXOVIAN_ADMIN') === 'MPUMALANGA2026') {
      return true;
    }
  }
  if (!user || !user.email) return false;
  const email = user.email.toLowerCase().trim();
  return ADMIN_EMAILS.some((adm) => adm.toLowerCase() === email);
}

/**
 * Format a Date into South African standard text: e.g. "28 October 2026"
 */
export function formatSouthAfricanDate(dateInput: Date | string | number = new Date()): string {
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) {
      return new Date().toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    return d.toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch {
    return new Date().toLocaleDateString();
  }
}

export interface TrialStateResult {
  isAllowed: boolean;
  isSubscribed: boolean;
  isTrialActive: boolean;
  isTrialExpired: boolean;
  hoursRemainingInTrial: number;
  showYellowBox: boolean;
  actualTrialEndDate: string;
  smartMessage: string;
  isAdmin?: boolean;
  isPaidUser?: boolean;
  isAnonymous?: boolean;
}

/**
 * Checks if a specific email is a paid customer locally
 */
export function isUserPaidLocally(userId?: string, email?: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    if (userId && localStorage.getItem(`nexovian_sub_${userId}`) === 'active') {
      return true;
    }
    if (email && localStorage.getItem(`nexovian_paid_status_${email.toLowerCase().trim()}`) === 'PAID_USER') {
      return true;
    }
  } catch {
    // Ignore
  }
  return false;
}

/**
 * Fast synchronous check for immediate UI rendering without global device block
 */
export function checkFastTrialState(user: { id: string; email?: string; createdAt?: string } | null): TrialStateResult {
  // STATE 1: Anonymous visitor (No account / New link click)
  if (!user || !user.email) {
    return {
      isAllowed: true,
      isSubscribed: false,
      isTrialActive: true,
      isTrialExpired: false,
      hoursRemainingInTrial: 24,
      showYellowBox: false,
      actualTrialEndDate: '',
      smartMessage: '',
      isAnonymous: true
    };
  }

  // STATE 5: Admin bypass (You)
  if (isAdminUser(user)) {
    return {
      isAllowed: true,
      isSubscribed: true,
      isTrialActive: false,
      isTrialExpired: false,
      hoursRemainingInTrial: 999,
      showYellowBox: false,
      actualTrialEndDate: '',
      smartMessage: '',
      isAdmin: true
    };
  }

  const normEmail = user.email.toLowerCase().trim();

  // STATE 4: Paid User
  if (isUserPaidLocally(user.id, normEmail)) {
    return {
      isAllowed: true,
      isSubscribed: true,
      isTrialActive: false,
      isTrialExpired: false,
      hoursRemainingInTrial: 0,
      showYellowBox: false,
      actualTrialEndDate: '',
      smartMessage: '',
      isPaidUser: true
    };
  }

  // Check if this specific email was previously stored as expired
  const expiredKey = `nexovian_trial_expired_${normEmail}`;
  const storedExpiredDate = localStorage.getItem(expiredKey);
  if (storedExpiredDate) {
    const formatted = formatSouthAfricanDate(storedExpiredDate);
    return {
      isAllowed: false,
      isSubscribed: false,
      isTrialActive: false,
      isTrialExpired: true,
      hoursRemainingInTrial: 0,
      showYellowBox: true,
      actualTrialEndDate: formatted,
      smartMessage: `Hey! You already used your 1 free day on ${formatted}. NEXOVIAN is R60/month to support all 11 languages. Pay to continue learning! 🔥`
    };
  }

  // Check user creation time (24h free trial)
  const createdDate = user.createdAt ? new Date(user.createdAt) : new Date();
  const trialEnd = new Date(createdDate.getTime() + 24 * 60 * 60 * 1000);
  const now = new Date();

  if (now.getTime() < trialEnd.getTime()) {
    // STATE 2: New Account Created (1 day free trial active)
    const hoursRemaining = Math.max(1, Math.ceil((trialEnd.getTime() - now.getTime()) / (60 * 60 * 1000)));
    return {
      isAllowed: true,
      isSubscribed: false,
      isTrialActive: true,
      isTrialExpired: false,
      hoursRemainingInTrial: hoursRemaining,
      showYellowBox: false,
      actualTrialEndDate: formatSouthAfricanDate(trialEnd),
      smartMessage: ''
    };
  }

  // STATE 3: Trial ended
  const actualTrialEndDate = formatSouthAfricanDate(trialEnd);
  return {
    isAllowed: false,
    isSubscribed: false,
    isTrialActive: false,
    isTrialExpired: true,
    hoursRemainingInTrial: 0,
    showYellowBox: false, // Brand new trial just ended today -> NO yellow box
    actualTrialEndDate,
    smartMessage: ''
  };
}

/**
 * Async check against server & Supabase used_trial_emails table
 */
export async function checkDeepTrialState(
  user: { id: string; email?: string; createdAt?: string } | null
): Promise<TrialStateResult> {
  const fast = checkFastTrialState(user);
  if (!user || !user.email || fast.isAdmin || fast.isPaidUser) {
    return fast;
  }

  const normEmail = user.email.toLowerCase().trim();

  try {
    const res = await fetch('/api/anti-abuse/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: normEmail, userCreatedAt: user.createdAt })
    });

    if (res.ok) {
      const data = await res.json();

      if (data.status === 'PAID_USER' || data.isPaidUser) {
        localStorage.setItem(`nexovian_sub_${user.id}`, 'active');
        localStorage.setItem(`nexovian_paid_status_${normEmail}`, 'PAID_USER');
        return {
          ...fast,
          isAllowed: true,
          isSubscribed: true,
          isTrialActive: false,
          isTrialExpired: false,
          isPaidUser: true
        };
      }

      if (data.status === 'TRIAL_EXPIRED' || data.blocked) {
        // Save locally per-email
        const dateStr = data.actualTrialEndDate || fast.actualTrialEndDate;
        if (data.showYellowBox) {
          localStorage.setItem(`nexovian_trial_expired_${normEmail}`, dateStr);
        }

        return {
          isAllowed: false,
          isSubscribed: false,
          isTrialActive: false,
          isTrialExpired: true,
          hoursRemainingInTrial: 0,
          showYellowBox: Boolean(data.showYellowBox),
          actualTrialEndDate: dateStr,
          smartMessage: data.smartMessage || (data.showYellowBox
            ? `Hey! You already used your 1 free day on ${dateStr}. NEXOVIAN is R60/month to support all 11 languages. Pay to continue learning! 🔥`
            : '')
        };
      }

      if (data.status === 'TRIAL_ACTIVE') {
        return {
          ...fast,
          isAllowed: true,
          isSubscribed: false,
          isTrialActive: true,
          isTrialExpired: false,
          hoursRemainingInTrial: data.hoursRemaining || fast.hoursRemainingInTrial,
          showYellowBox: false
        };
      }
    }
  } catch {
    // Non-blocking fallback
  }

  // Also query Supabase directly for used_trial_emails
  try {
    const { data } = await supabase
      .from('used_trial_emails')
      .select('*')
      .eq('email', normEmail)
      .maybeSingle();

    if (data) {
      if (data.status === 'PAID_USER') {
        localStorage.setItem(`nexovian_sub_${user.id}`, 'active');
        localStorage.setItem(`nexovian_paid_status_${normEmail}`, 'PAID_USER');
        return {
          ...fast,
          isAllowed: true,
          isSubscribed: true,
          isTrialActive: false,
          isTrialExpired: false,
          isPaidUser: true
        };
      } else {
        const endDate = formatSouthAfricanDate(data.trial_ended_at || data.trial_started_at || new Date());
        localStorage.setItem(`nexovian_trial_expired_${normEmail}`, endDate);
        return {
          isAllowed: false,
          isSubscribed: false,
          isTrialActive: false,
          isTrialExpired: true,
          hoursRemainingInTrial: 0,
          showYellowBox: true,
          actualTrialEndDate: endDate,
          smartMessage: `Hey! You already used your 1 free day on ${endDate}. NEXOVIAN is R60/month to support all 11 languages. Pay to continue learning! 🔥`
        };
      }
    }
  } catch {
    // Non-blocking
  }

  return fast;
}

/**
 * Saves payment success and marks user as PAID_USER
 */
export async function recordPaymentSuccess(
  email: string,
  reference: string,
  userId?: string
): Promise<void> {
  const normEmail = email.toLowerCase().trim();
  if (userId) {
    localStorage.setItem(`nexovian_sub_${userId}`, 'active');
  }
  localStorage.setItem(`nexovian_paid_status_${normEmail}`, 'PAID_USER');
  localStorage.removeItem(`nexovian_trial_expired_${normEmail}`);

  try {
    await fetch('/api/anti-abuse/record-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: normEmail, userId, reference })
    });
  } catch {
    // Ignore
  }

  try {
    await supabase.from('used_trial_emails').upsert(
      {
        email: normEmail,
        status: 'PAID_USER',
        paid_at: new Date().toISOString(),
        paystack_reference: reference,
        updated_at: new Date().toISOString()
      },
      { onConflict: 'email' }
    );
  } catch {
    // Ignore
  }
}
