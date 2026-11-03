/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN PAYSTACK SUBSCRIPTION SERVICE
 * 
 * Pricing & States:
 * - Price: R60 / learner / month (6000 cents)
 * - Plan: "NEXOVIAN R60 Learner"
 * - Paystack Reference: "NEXOVIAN_" + user.id + (optional timestamp for uniqueness)
 * - Metadata: company: "NEXOVIAN", user_id: user.id
 * 
 * Implements 5 User States:
 * - State 1: Anonymous visitor (no account) -> No paywall, no blocking
 * - State 2: New account (first time email) -> 2-Day Free Trial (48h), full access
 * - State 3: Expired trial -> Fire paywall card. Yellow box ONLY if email in used_trial_emails DB.
 * - State 4: Paid user -> Full access, no paywall
 * - State 5: Admin bypass -> Email in admin list or localStorage NEXOVIAN_ADMIN = MPUMALANGA2026 -> Full access always
 */

import { supabase } from '../supabase';
import {
  checkFastTrialState,
  checkDeepTrialState,
  recordPaymentSuccess,
  isAdminUser,
  formatSouthAfricanDate,
  TrialStateResult,
  TrialTimelineInfo,
  PREMIUM_TRIAL_ENDS_AT_ISO,
  PREMIUM_TRIAL_ENDS_AT
} from './antiAbuseService';

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref: string;
        plan?: string;
        metadata?: any;
        callback: (response: { reference: string; status: string; trans?: string }) => void;
        onClose: () => void;
      }) => {
        openIframe: () => void;
      };
    };
  }
}

export const PAYSTACK_PUBLIC_KEY =
  (import.meta as any).env?.VITE_PAYSTACK_PUBLIC_KEY || 'pk_live_nexovian_placeholder_key';

export const SUBSCRIPTION_PLAN_NAME = 'NEXOVIAN R60 Learner';
export const SUBSCRIPTION_AMOUNT_CENTS = 6000; // R60 in cents
export const SUBSCRIPTION_AMOUNT_ZAR = 60; // R60

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

/**
 * Checks if the user has an active subscription or if their 2-day free trial is active/expired.
 */
export function checkUserSubscription(user: { id: string; email?: string; createdAt?: string } | null): SubscriptionStatus {
  const trialState: TrialStateResult = checkFastTrialState(user);
  const trialExpiresAt = new Date(PREMIUM_TRIAL_ENDS_AT_ISO);

  return {
    isSubscribed: trialState.isSubscribed,
    isTrialActive: trialState.isTrialActive,
    isTrialExpired: trialState.isTrialExpired,
    hoursRemainingInTrial: trialState.hoursRemainingInTrial,
    trialExpiresAt,
    subscriptionPlan: SUBSCRIPTION_PLAN_NAME,
    showYellowBox: trialState.showYellowBox,
    actualTrialEndDate: trialState.actualTrialEndDate || PREMIUM_TRIAL_ENDS_AT,
    smartBlockMessage: trialState.smartMessage,
    timelineInfo: trialState.timelineInfo,
    isAdmin: trialState.isAdmin
  };
}

/**
 * Activates subscription for user locally and syncs to Supabase profiles & used_trial_emails table as PAID_USER.
 */
export async function markUserSubscribed(
  userId: string,
  reference: string,
  email?: string
): Promise<void> {
  const localKey = `nexovian_sub_${userId}`;
  localStorage.setItem(localKey, 'active');
  localStorage.setItem(`nexovian_ref_${userId}`, reference);

  if (email) {
    await recordPaymentSuccess(email, reference, userId);
  }

  try {
    await supabase.from('profiles').update({
      subscription_status: 'PAID_USER',
      subscription_plan: SUBSCRIPTION_PLAN_NAME,
      subscription_ref: reference,
      subscription_date: new Date().toISOString()
    }).eq('id', userId);
  } catch (err) {
    console.warn('Note: could not update remote subscription profile:', err);
  }
}

/**
 * Initiates Paystack inline payment popup.
 * Fallback to modal confirmation if Paystack script is blocked or offline.
 */
export function openPaystackPayment({
  user,
  onSuccess,
  onClose
}: {
  user: { id: string; email: string };
  onSuccess: (reference: string) => void;
  onClose?: () => void;
}) {
  const ref = `NEXOVIAN_${user.id}_${Date.now()}`;

  if (typeof window !== 'undefined' && window.PaystackPop) {
    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: user.email,
      amount: SUBSCRIPTION_AMOUNT_CENTS, // 6000 cents = R60
      currency: 'ZAR',
      ref,
      plan: SUBSCRIPTION_PLAN_NAME,
      metadata: {
        company: 'NEXOVIAN',
        user_id: user.id,
        custom_fields: [
          {
            display_name: 'Company',
            variable_name: 'company',
            value: 'NEXOVIAN'
          },
          {
            display_name: 'Platform',
            variable_name: 'platform',
            value: 'nexovian.ai.studio'
          },
          {
            display_name: 'Status',
            variable_name: 'status',
            value: 'PAID_USER'
          }
        ]
      },
      callback: (response) => {
        const finalRef = response.reference || ref;
        markUserSubscribed(user.id, finalRef, user.email);
        onSuccess(finalRef);
      },
      onClose: () => {
        if (onClose) onClose();
      }
    });

    handler.openIframe();
  } else {
    console.info('Paystack Inline script not loaded directly; applying demo subscription');
    const confirmed = window.confirm(
      `NEXOVIAN Payment (Paystack R60/month)\n\nAmount: R60 (6000 cents)\nPlan: NEXOVIAN R60 Learner\nRef: ${ref}\nStatus: PAID_USER\nCompany: NEXOVIAN\n\nClick OK to simulate successful Paystack payment.`
    );
    if (confirmed) {
      markUserSubscribed(user.id, ref, user.email);
      onSuccess(ref);
    } else {
      if (onClose) onClose();
    }
  }
}
