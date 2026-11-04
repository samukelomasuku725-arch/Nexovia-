/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN SNAPSCAN 30-DAY AUTO-LOCK SUBSCRIPTION SERVICE
 * 
 * Flow:
 * 1. User pays R60 via SnapScan (https://pos.snapscan.io/qr/NKJJYpV6).
 * 2. User enters phone, reference, and email -> calls POST /api/verify-payment.
 * 3. AUTO-UNLOCK:
 *    - payment_status = 'paid'
 *    - subscription_status = 'active'
 *    - subscription_start = now
 *    - subscription_end = now + 30 days
 *    - access_code = NEX-XXXXXX
 *    - localStorage: nexovian_paid = 'true', nexovian_subscription stored
 * 4. AUTO-LOCK AFTER 30 DAYS (CRITICAL):
 *    - checkAccess(user):
 *      - IF subscription_status == 'active' AND now <= subscription_end -> allow
 *      - IF now > subscription_end -> set status = 'expired', deny, redirect to /paywall
 *    - Protected routes: /dashboard, /subjects, /papers (full memo), /quiz, /notes, /videos
 *    - Free routes (no lock): / (homepage), /papers (first 2 preview questions only), /login, /register, /paywall
 */

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
  isNearExpiry: boolean; // <= 7 days
}

const STORAGE_KEY = 'nexovian_subscription';
const LEGACY_PAID_KEY = 'nexovian_paid';
const OVERRIDE_KEY = 'nexovian_subscription_override';

export const ADMIN_EMAILS = [
  'samukelomasuku725@gmail.com',
  'admin@nexovian.co.za',
  'admin@nexovian.ai',
  'admin@nexovian.group',
  'nexovian@gmail.com'
];

/**
 * Get current stored subscription data from localStorage
 */
export function getStoredSubscription(): SnapScanSubscriptionData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn('[Subscription] Failed to parse subscription data:', err);
    return null;
  }
}

/**
 * Save subscription data to localStorage
 */
export function saveSubscription(data: SnapScanSubscriptionData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    if (data.subscription_status === 'active' && Date.now() <= data.subscription_end) {
      localStorage.setItem(LEGACY_PAID_KEY, 'true');
    } else {
      localStorage.setItem(LEGACY_PAID_KEY, 'false');
    }
  } catch (err) {
    console.warn('[Subscription] Failed to save subscription data:', err);
  }
}

export function isAppUnlocked(user?: any): boolean {
  if (typeof window === 'undefined') return false;
  // Admin bypass
  const email = user?.email?.toLowerCase?.() || '';
  if (email && ADMIN_EMAILS.includes(email)) return true;

  const unlocked = localStorage.getItem('nexovian_unlocked') === 'true';
  const paid = localStorage.getItem(LEGACY_PAID_KEY) === 'true';
  const sub = getStoredSubscription();
  const validSub = sub && sub.subscription_status === 'active' && Date.now() <= sub.subscription_end;
  return Boolean(unlocked && paid && validSub);
}

/**
 * Core checkAccess route guard and runtime verifier.
 * Requires:
 * - nexovian_unlocked === 'true'
 * - Active subscription where now <= subscription_end
 * Auto-locks immediately when now > subscription_end or unlocked flag missing.
 */
export function checkAccess(user?: any): AccessCheckResult {
  const now = Date.now();

  // Admin bypass
  const email = user?.email?.toLowerCase?.() || '';
  if (email && ADMIN_EMAILS.includes(email)) {
    return {
      allow: true,
      status: 'active',
      daysRemaining: 999,
      hoursRemaining: 999 * 24,
      expiresAtFormatted: 'Admin Unlimited Access',
      accessCode: 'NEX-ADMIN',
      isNearExpiry: false
    };
  }

  // Strict check: Must have nexovian_unlocked == 'true'
  const isUnlockedFlag = typeof window !== 'undefined' ? localStorage.getItem('nexovian_unlocked') === 'true' : false;
  if (!isUnlockedFlag) {
    return {
      allow: false,
      status: 'unregistered',
      daysRemaining: 0,
      hoursRemaining: 0,
      expiresAtFormatted: 'No active subscription / Locked',
      accessCode: '',
      reason: 'unregistered',
      isNearExpiry: false
    };
  }

  let sub = getStoredSubscription();

  // Handle legacy nexovian_paid or override if existing
  if (!sub) {
    const legacyPaid = typeof window !== 'undefined' ? localStorage.getItem(LEGACY_PAID_KEY) : null;
    const legacyOverride = typeof window !== 'undefined' ? localStorage.getItem(OVERRIDE_KEY) : null;
    
    if (legacyPaid === 'true' || legacyOverride) {
      // Synthesize 30-day window from current time or override
      let until = now + 30 * 24 * 60 * 60 * 1000;
      if (legacyOverride) {
        try {
          const parsed = JSON.parse(legacyOverride);
          if (parsed.until && typeof parsed.until === 'number') {
            until = parsed.until;
          }
        } catch (_) {}
      }

      sub = {
        access_code: 'NEX-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        payment_phone: '0821234567',
        payment_reference: 'MIGRATED',
        payment_status: 'paid',
        subscription_status: now <= until ? 'active' : 'expired',
        subscription_start: now - 24 * 60 * 60 * 1000,
        subscription_end: until,
        last_payment_date: now - 24 * 60 * 60 * 1000
      };
      saveSubscription(sub);
    }
  }

  if (!sub) {
    return {
      allow: false,
      status: 'unregistered',
      daysRemaining: 0,
      hoursRemaining: 0,
      expiresAtFormatted: 'No active subscription',
      accessCode: '',
      reason: 'unregistered',
      isNearExpiry: false
    };
  }

  const msRemaining = sub.subscription_end - now;
  const daysRemaining = Math.max(0, Math.ceil(msRemaining / (1000 * 60 * 60 * 24)));
  const hoursRemaining = Math.max(0, Math.round(msRemaining / (1000 * 60 * 60)));
  const expiresAtFormatted = new Date(sub.subscription_end).toLocaleDateString('en-ZA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  // Check 30-day active condition
  if (sub.subscription_status === 'active' && now <= sub.subscription_end) {
    return {
      allow: true,
      status: 'active',
      daysRemaining,
      hoursRemaining,
      expiresAtFormatted,
      accessCode: sub.access_code,
      isNearExpiry: daysRemaining <= 7
    };
  }

  // AUTO-LOCK: Subscription expired!
  if (sub.subscription_status === 'active' && now > sub.subscription_end) {
    sub.subscription_status = 'expired';
    saveSubscription(sub);
  }

  return {
    allow: false,
    status: 'expired',
    daysRemaining: 0,
    hoursRemaining: 0,
    expiresAtFormatted,
    accessCode: sub.access_code,
    reason: 'subscription_expired',
    isNearExpiry: false
  };
}

/**
 * Verify payment on the server via POST /api/verify-payment
 * Auto-approves and unlocks immediately
 */
export async function verifyAndUnlockPayment({
  phone,
  reference,
  email,
  name
}: {
  phone: string;
  reference: string;
  email?: string;
  name?: string;
}): Promise<{
  success: boolean;
  message?: string;
  access_code?: string;
  subscription_end?: number;
}> {
  try {
    const res = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone: phone.trim(),
        reference: reference.trim(),
        email: email?.trim(),
        name: name?.trim()
      })
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      return {
        success: false,
        message: data.message || 'Payment verification failed. Please check your details.'
      };
    }

    const subData: SnapScanSubscriptionData = {
      access_code: data.access_code,
      payment_phone: phone.trim(),
      payment_reference: reference.trim(),
      payment_status: 'paid',
      subscription_status: 'active',
      subscription_start: data.subscription_start || Date.now(),
      subscription_end: data.subscription_end || Date.now() + 30 * 24 * 60 * 60 * 1000,
      last_payment_date: Date.now()
    };

    saveSubscription(subData);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nexovian_unlocked', 'true');
      localStorage.setItem(LEGACY_PAID_KEY, 'true');
      localStorage.setItem('nexovian_verified_code', data.access_code);
    }

    return {
      success: true,
      access_code: data.access_code,
      subscription_end: data.subscription_end,
      message: data.message
    };
  } catch (err: any) {
    console.error('[Subscription] Error verifying payment:', err);
    return {
      success: false,
      message: err?.message || 'Network error while verifying payment.'
    };
  }
}

/**
 * Verify and consume a one-time voucher/access code from database:
 * - Checks used=false
 * - Marks used=true
 * - Sets localStorage nexovian_unlocked='true' and nexovian_paid='true'
 */
export async function verifyOneTimeCode({
  code,
  phone,
  email,
  name
}: {
  code: string;
  phone: string;
  email?: string;
  name?: string;
}): Promise<{
  success: boolean;
  message?: string;
  access_code?: string;
  subscription_end?: number;
}> {
  try {
    const res = await fetch('/api/verify-one-time-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: code.trim(),
        phone: phone.trim(),
        email: email?.trim(),
        name: name?.trim()
      })
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      return {
        success: false,
        message: data.message || 'One-time code verification failed. Code may be invalid or already used.'
      };
    }

    const subData: SnapScanSubscriptionData = {
      access_code: data.access_code,
      payment_phone: phone.trim(),
      payment_reference: `CODE:${data.access_code}`,
      payment_status: 'paid',
      subscription_status: 'active',
      subscription_start: data.subscription_start || Date.now(),
      subscription_end: data.subscription_end || Date.now() + 30 * 24 * 60 * 60 * 1000,
      last_payment_date: Date.now()
    };

    saveSubscription(subData);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nexovian_unlocked', 'true');
      localStorage.setItem(LEGACY_PAID_KEY, 'true');
      localStorage.setItem('nexovian_verified_code', data.access_code);
    }

    return {
      success: true,
      access_code: data.access_code,
      subscription_end: data.subscription_end,
      message: data.message
    };
  } catch (err: any) {
    console.error('[Subscription] Error verifying one-time code:', err);
    return {
      success: false,
      message: err?.message || 'Network error while verifying one-time code.'
    };
  }
}

/**
 * 1. POST /api/generate-code
 * Auto-generates unique one-time code NEX-XXXXXX on /paywall
 */
export async function generateUnlockCodeApi({
  phone,
  reference,
  email
}: {
  phone: string;
  reference: string;
  email?: string;
}): Promise<{
  success: boolean;
  code?: string;
  message?: string;
}> {
  try {
    const res = await fetch('/api/generate-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: phone.trim(),
        reference: reference.trim(),
        email: email?.trim()
      })
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      return {
        success: false,
        message: data.message || 'Failed to generate code. Please verify details.'
      };
    }

    return {
      success: true,
      code: data.code,
      message: data.message
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Network error generating code.'
    };
  }
}

/**
 * 2. POST /api/unlock
 * Checks code from database:
 * a) IF not found -> "Invalid code"
 * b) IF status == 'used' -> "This code was already used..."
 * c) IF status == 'unused' -> SUCCESS: status='used', activates 30-day session
 */
export async function unlockAppWithCodeApi({
  code,
  phone
}: {
  code: string;
  phone: string;
}): Promise<{
  success: boolean;
  message: string;
  code?: string;
  subscription_end?: number;
  expires_at_formatted?: string;
  days_remaining?: number;
}> {
  try {
    const res = await fetch('/api/unlock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: code.trim().toUpperCase(),
        phone: phone.trim()
      })
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      return {
        success: false,
        message: data.message || 'Unlock failed. Please check code and phone number.'
      };
    }

    // Save active 30-day session in localStorage
    const now = Date.now();
    const subEnd = data.subscription_end || now + 30 * 24 * 60 * 60 * 1000;
    const subData: SnapScanSubscriptionData = {
      access_code: data.code,
      payment_phone: phone.trim(),
      payment_reference: `UNLOCK_CODE:${data.code}`,
      payment_status: 'paid',
      subscription_status: 'active',
      subscription_start: data.subscription_start || now,
      subscription_end: subEnd,
      last_payment_date: now
    };

    saveSubscription(subData);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nexovian_unlocked', 'true');
      localStorage.setItem(LEGACY_PAID_KEY, 'true');
      localStorage.setItem('nexovian_active_code', data.code);
      localStorage.setItem('nexovian_active_phone', phone.trim());
    }

    return {
      success: true,
      code: data.code,
      subscription_end: subEnd,
      expires_at_formatted: data.expires_at_formatted,
      days_remaining: data.days_remaining || 30,
      message: data.message || 'App successfully unlocked!'
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Network error unlocking app. Please try again.'
    };
  }
}


