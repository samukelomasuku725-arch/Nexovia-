/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN - 2-DAY FREE TRIAL TIMELINE & PAYWALL ENGINE
 * 
 * EXACT TIMELINE (SAST UTC+2):
 * - Trial Start: Sunday 02 Nov
 * - Trial End: Tuesday 04 Nov 11:59 PM SAST
 * 
 * 3-DAY TIMELINE PROGRESSION:
 * - Day 1 - Sunday: "🎉 Day 1/3 FREE - Welcome to NEXOVIAN! Full access unlocked"
 * - Day 2 - Monday: "🔥 Day 2/3 FREE - Keep going! Payment system goes live today"
 * - Day 3 - Tuesday (morning before 9am): "⏰ LAST DAY FREE - Upgrade today for R60/month to keep everything"
 * - Tuesday 9:00 AM SAST onward: HARD PAYWALL
 *     Title: "Your 3-Day Trial Ends Tonight"
 *     Message: "Your progress will be saved. Pay R60/month to continue learning & get your certificates."
 *     Button 1: "Pay R60 & Keep Learning (Live Tuesday 9am)"
 *     Button 2: "Remind me Tuesday 9am on WhatsApp" -> https://wa.me/27636508381?text=REMIND%20ME%20R60
 * 
 * - After Tuesday 04 Nov 23:59 SAST:
 *     Title: "Your 3-Day Trial Ends Tonight" / "Your 3-Day Trial Ended - Pay R60 to continue"
 *     If email in used_trial_emails:
 *     "Hey! You already used your 3 Days FREE on Tuesday 04 Nov. NEXOVIAN is R60/month to support all 11 languages. Pay to continue learning! 🔥"
 */

import { supabase } from '../supabase';

export const ADMIN_EMAILS = [
  'samukelomasuku725@gmail.com',
  'admin@nexovian.co.za',
  'admin@nexovian.ai',
  'nexovian@gmail.com'
];

// Clean legacy device block keys to ensure no visitor is blocked globally
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

// ==========================================
// 2-DAY FREE TRIAL TIMELINE CONSTANTS (SAST UTC+2)
// ==========================================
export const PREMIUM_TRIAL_LABEL = '2-Day Free Trial';
export const TRIAL_START_SAST = '2026-11-02T00:00:00+02:00'; // Sunday 02 Nov
export const TRIAL_MONDAY_SAST = '2026-11-03T00:00:00+02:00'; // Monday 03 Nov
export const TRIAL_TUESDAY_SAST = '2026-11-04T00:00:00+02:00'; // Tuesday 04 Nov
export const TRIAL_TUESDAY_9AM_SAST = '2026-11-04T09:00:00+02:00'; // Tuesday 04 Nov 9:00 AM SAST (Hard paywall trigger)
export const PREMIUM_TRIAL_ENDS_AT = 'Tuesday 04 Nov 23:59 SAST';
export const PREMIUM_TRIAL_ENDS_AT_ISO = '2026-11-04T23:59:59+02:00';
export const WHATSAPP_REMIND_URL = 'https://wa.me/27636508381?text=REMIND%20ME%20R60';

export type TrialTimelineStage = 'DAY_1_SUNDAY' | 'DAY_2_MONDAY' | 'DAY_3_TUESDAY' | 'TUESDAY_9AM_PAYWALL' | 'TRIAL_EXPIRED';

export interface TrialTimelineInfo {
  stage: TrialTimelineStage;
  dayNumber: number; // 1, 2, or 3
  dayLabel: string; // 'Sunday', 'Monday', 'Tuesday'
  bannerMessage: string;
  isHardPaywall: boolean;
  hardPaywallTitle: string;
  hardPaywallMessage: string;
  button1Text: string;
  button2Text: string;
  button2Url: string;
  hoursRemaining: number;
  trialEndsAtFormatted: string;
}

/**
 * Checks if the user is an admin
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
 * Format a Date into South African standard text: e.g. "04 November 2026"
 */
export function formatSouthAfricanDate(dateInput: Date | string | number = new Date()): string {
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) {
      return 'Tuesday 04 Nov';
    }
    return d.toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch {
    return 'Tuesday 04 Nov';
  }
}

/**
 * Calculates current trial timeline info based on SAST clock and stage
 */
export function getTrialTimelineInfo(overrideNow?: Date): TrialTimelineInfo {
  // Support testing override via query param ?trial_stage=1|2|3|9am|expired or localStorage
  if (typeof window !== 'undefined') {
    try {
      const params = new URLSearchParams(window.location.search);
      const qOverride = params.get('trial_stage') || localStorage.getItem('nexovian_trial_stage_override');
      if (qOverride === '1' || qOverride === 'sunday') return buildStageInfo('DAY_1_SUNDAY');
      if (qOverride === '2' || qOverride === 'monday') return buildStageInfo('DAY_2_MONDAY');
      if (qOverride === '3' || qOverride === 'tuesday_morning') return buildStageInfo('DAY_3_TUESDAY');
      if (qOverride === '9am' || qOverride === 'tuesday_9am' || qOverride === 'hard_paywall') return buildStageInfo('TUESDAY_9AM_PAYWALL');
      if (qOverride === 'expired') return buildStageInfo('TRIAL_EXPIRED');
    } catch {
      // Ignore
    }
  }

  const now = overrideNow || new Date();
  const nowMs = now.getTime();
  const trialEndMs = new Date(PREMIUM_TRIAL_ENDS_AT_ISO).getTime();
  const tuesday9amMs = new Date(TRIAL_TUESDAY_9AM_SAST).getTime();
  const tuesday0amMs = new Date(TRIAL_TUESDAY_SAST).getTime();
  const monday0amMs = new Date(TRIAL_MONDAY_SAST).getTime();

  if (nowMs > trialEndMs) {
    return buildStageInfo('TRIAL_EXPIRED');
  }
  if (nowMs >= tuesday9amMs) {
    return buildStageInfo('TUESDAY_9AM_PAYWALL');
  }
  if (nowMs >= tuesday0amMs) {
    return buildStageInfo('DAY_3_TUESDAY');
  }
  if (nowMs >= monday0amMs) {
    return buildStageInfo('DAY_2_MONDAY');
  }

  // Before Monday -> Day 1 (Sunday 02 Nov / Welcome)
  return buildStageInfo('DAY_1_SUNDAY');
}

export function buildStageInfo(stage: TrialTimelineStage): TrialTimelineInfo {
  const trialEndsAtFormatted = PREMIUM_TRIAL_ENDS_AT;
  const hardPaywallMessage = 'Your progress will be saved. Pay R60/month to continue learning.';
  const button1Text = 'Pay R60 & Keep Learning (Live Tuesday 9am)';
  const button2Text = 'Remind me Tuesday 9am on WhatsApp';
  const button2Url = WHATSAPP_REMIND_URL;

  switch (stage) {
    case 'DAY_1_SUNDAY':
      return {
        stage,
        dayNumber: 1,
        dayLabel: 'Day 1',
        bannerMessage: '🎉 Day 1/2 FREE - Welcome to NEXOVIAN! Full access unlocked',
        isHardPaywall: false,
        hardPaywallTitle: 'Your 2-Day Free Trial Ends Soon',
        hardPaywallMessage,
        button1Text,
        button2Text,
        button2Url,
        hoursRemaining: 48,
        trialEndsAtFormatted
      };
    case 'DAY_2_MONDAY':
      return {
        stage,
        dayNumber: 2,
        dayLabel: 'Day 2',
        bannerMessage: '🔥 Day 2/2 FREE - Keep going! R60/month after trial',
        isHardPaywall: false,
        hardPaywallTitle: 'Your 2-Day Free Trial Ends Soon',
        hardPaywallMessage,
        button1Text,
        button2Text,
        button2Url,
        hoursRemaining: 24,
        trialEndsAtFormatted
      };
    case 'DAY_3_TUESDAY':
      return {
        stage,
        dayNumber: 2,
        dayLabel: 'Final Day',
        bannerMessage: '⏰ LAST DAY FREE - Upgrade today for R60/month to keep everything',
        isHardPaywall: false,
        hardPaywallTitle: 'Your 2-Day Free Trial Ends Tonight',
        hardPaywallMessage,
        button1Text,
        button2Text,
        button2Url,
        hoursRemaining: 12,
        trialEndsAtFormatted
      };
    case 'TUESDAY_9AM_PAYWALL':
      return {
        stage,
        dayNumber: 2,
        dayLabel: 'Trial Ending',
        bannerMessage: '⏰ LAST DAY FREE - Upgrade today for R60/month to keep everything',
        isHardPaywall: true,
        hardPaywallTitle: 'Your 2-Day Free Trial Ends Tonight',
        hardPaywallMessage,
        button1Text,
        button2Text,
        button2Url,
        hoursRemaining: 6,
        trialEndsAtFormatted
      };
    case 'TRIAL_EXPIRED':
    default:
      return {
        stage: 'TRIAL_EXPIRED',
        dayNumber: 2,
        dayLabel: 'Expired',
        bannerMessage: 'Your 2-Day Free Trial Ended - Pay R60 to continue',
        isHardPaywall: true,
        hardPaywallTitle: 'Your 2-Day Free Trial Ended',
        hardPaywallMessage,
        button1Text,
        button2Text,
        button2Url,
        hoursRemaining: 0,
        trialEndsAtFormatted
      };
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
  timelineInfo: TrialTimelineInfo;
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
    if (localStorage.getItem('nexovian_paid') === 'true') {
      return true;
    }
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
 * Fast synchronous check for immediate UI rendering with 3-Day trial timeline
 */
export function checkFastTrialState(user: { id: string; email?: string; createdAt?: string } | null): TrialStateResult {
  const timeline = getTrialTimelineInfo();

  // Instant SnapScan paid check (bypasses all paywalls and restrictions)
  if (typeof window !== 'undefined' && localStorage.getItem('nexovian_paid') === 'true') {
    return {
      isAllowed: true,
      isSubscribed: true,
      isTrialActive: false,
      isTrialExpired: false,
      hoursRemainingInTrial: 999999,
      showYellowBox: false,
      actualTrialEndDate: 'UNLOCKED',
      smartMessage: 'NEXOVIAN Premium Active',
      timelineInfo: timeline,
      isPaidUser: true
    };
  }

  // STATE 1: Anonymous visitor (No account / New link click)
  if (!user || !user.email) {
    return {
      isAllowed: true,
      isSubscribed: false,
      isTrialActive: true,
      isTrialExpired: false,
      hoursRemainingInTrial: timeline.hoursRemaining,
      showYellowBox: false,
      actualTrialEndDate: PREMIUM_TRIAL_ENDS_AT,
      smartMessage: '',
      timelineInfo: timeline,
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
      timelineInfo: timeline,
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
      timelineInfo: timeline,
      isPaidUser: true
    };
  }

  // Check if this specific email was previously marked as trial expired
  const expiredKey = `nexovian_trial_expired_${normEmail}`;
  const storedExpiredDate = localStorage.getItem(expiredKey);
  if (storedExpiredDate) {
    return {
      isAllowed: false,
      isSubscribed: false,
      isTrialActive: false,
      isTrialExpired: true,
      hoursRemainingInTrial: 0,
      showYellowBox: true,
      actualTrialEndDate: PREMIUM_TRIAL_ENDS_AT,
      smartMessage: `Hey! You already used your 2-Day Free Trial. NEXOVIAN is R60/month to support all 11 languages. Pay to continue learning! 🔥`,
      timelineInfo: timeline
    };
  }

  // 3-Day Timeline logic:
  // If Tuesday 9am or later, or expired, enforce HARD PAYWALL!
  if (timeline.isHardPaywall) {
    return {
      isAllowed: false,
      isSubscribed: false,
      isTrialActive: false,
      isTrialExpired: true,
      hoursRemainingInTrial: timeline.hoursRemaining,
      showYellowBox: false,
      actualTrialEndDate: PREMIUM_TRIAL_ENDS_AT,
      smartMessage: '',
      timelineInfo: timeline
    };
  }

  // Active 3-Day Trial (Sunday, Monday, Tuesday before 9am)
  return {
    isAllowed: true,
    isSubscribed: false,
    isTrialActive: true,
    isTrialExpired: false,
    hoursRemainingInTrial: timeline.hoursRemaining,
    showYellowBox: false,
    actualTrialEndDate: PREMIUM_TRIAL_ENDS_AT,
    smartMessage: '',
    timelineInfo: timeline
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
  const timeline = fast.timelineInfo;

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

      if (data.status === 'TRIAL_EXPIRED' || data.blocked || data.status === 'TUESDAY_9AM_PAYWALL') {
        const dateStr = data.actualTrialEndDate || PREMIUM_TRIAL_ENDS_AT;
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
            ? `Hey! You already used your 2-Day Free Trial. NEXOVIAN is R60/month to support all 11 languages. Pay to continue learning! 🔥`
            : ''),
          timelineInfo: { ...timeline, isHardPaywall: true }
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

  // Query Supabase directly for used_trial_emails
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
        const endDate = PREMIUM_TRIAL_ENDS_AT;
        localStorage.setItem(`nexovian_trial_expired_${normEmail}`, endDate);
        return {
          isAllowed: false,
          isSubscribed: false,
          isTrialActive: false,
          isTrialExpired: true,
          hoursRemainingInTrial: 0,
          showYellowBox: true,
          actualTrialEndDate: endDate,
          smartMessage: `Hey! You already used your 2-Day Free Trial. NEXOVIAN is R60/month to support all 11 languages. Pay to continue learning! 🔥`,
          timelineInfo: { ...timeline, isHardPaywall: true }
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
