/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Legacy compatibility wrapper — delegates all access checks to Paystack 2-Day Free Trial
 * and Monthly Subscription status. Zero SnapScan or free-week bypasses remain.
 */

import {
  getCachedPaystackStatus,
  isUserActive,
  saveCachedPaystackStatus
} from './paystackService';

export interface SnapScanSubscriptionData {
  access_code: string;
  payment_phone: string;
  payment_reference: string;
  payment_status: 'pending' | 'paid';
  subscription_status: 'active' | 'expired';
  subscription_start: number;
  subscription_end: number;
  last_payment_date: number;
}

export interface AccessCheckResult {
  allow: boolean;
  status: 'active' | 'expired' | 'unregistered';
  daysRemaining: number;
  hoursRemaining: number;
  expiresAtFormatted: string;
  accessCode: string;
  reason?: 'subscription_expired' | 'unregistered' | 'expired';
  isNearExpiry: boolean;
}

export function getStoredSubscription(): SnapScanSubscriptionData | null {
  return null;
}

export function saveSubscription(data: SnapScanSubscriptionData, email?: string): void {
  if (email && data.subscription_status === 'active') {
    saveCachedPaystackStatus(email, {
      status: 'active',
      has_access: true,
      trial_end_date: null,
      next_payment_date: new Date(data.subscription_end).toISOString(),
      subscription_code: data.access_code || null,
      days_remaining: 30,
      hours_remaining: 720
    });
  }
}

export function isAppUnlocked(user?: any): boolean {
  return isUserActive(user);
}

export function checkAccess(user?: any): AccessCheckResult {
  if (!user || !user.email) {
    return {
      allow: false,
      status: 'unregistered',
      daysRemaining: 0,
      hoursRemaining: 0,
      expiresAtFormatted: 'Account required',
      accessCode: '',
      reason: 'unregistered',
      isNearExpiry: false
    };
  }

  const active = isUserActive(user);
  const cached = getCachedPaystackStatus(user.email);

  if (active) {
    const endIso = cached?.next_payment_date || cached?.trial_end_date;
    const endMs = endIso ? new Date(endIso).getTime() : Date.now() + 2 * 24 * 60 * 60 * 1000;
    const msRem = Math.max(0, endMs - Date.now());
    const daysRemaining = cached?.days_remaining || Math.max(1, Math.ceil(msRem / (1000 * 60 * 60 * 24)));
    const hoursRemaining = cached?.hours_remaining || Math.max(1, Math.round(msRem / (1000 * 60 * 60)));
    return {
      allow: true,
      status: 'active',
      daysRemaining,
      hoursRemaining,
      expiresAtFormatted: endIso
        ? new Date(endIso).toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' })
        : 'Active',
      accessCode: cached?.subscription_code || 'PAYSTACK-ACTIVE',
      isNearExpiry: daysRemaining <= 2
    };
  }

  return {
    allow: false,
    status: cached?.status === 'cancelled' || cached?.status === 'expired' ? 'expired' : 'unregistered',
    daysRemaining: 0,
    hoursRemaining: 0,
    expiresAtFormatted: 'No active subscription',
    accessCode: '',
    reason: cached?.status === 'cancelled' || cached?.status === 'expired' ? 'subscription_expired' : 'unregistered',
    isNearExpiry: false
  };
}

export async function verifyAndUnlockPayment(_params: any): Promise<{ success: boolean; message: string }> {
  return {
    success: false,
    message: 'Please start your 2-Day Free Trial via Paystack checkout.'
  };
}

export async function generateUnlockCodeApi(_params: any): Promise<{ success: boolean; message: string; code?: string }> {
  return {
    success: false,
    message: 'Please start your 2-Day Free Trial via Paystack checkout.'
  };
}

export async function unlockWithCodeApi(_params: {
  code: string;
  phone: string;
}): Promise<{
  success: boolean;
  message: string;
  code?: string;
  expires_at_formatted?: string;
  subscription_start?: number;
  subscription_end?: number;
}> {
  const res = await fetch('/api/unlock', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(_params)
  });
  return res.json();
}
