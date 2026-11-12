/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN AUTH & TRIAL AUTO-LOCK SYSTEM
 * 
 * Database User Fields:
 * - trial_start_date: datetime, default now() on register
 * - trial_end_date: trial_start_date + 2 days
 * - subscription_status: enum 'trial' | 'active' | 'expired' (default 'trial')
 * - subscription_end_date: datetime nullable
 * - paystack_reference: nullable string
 * 
 * Logic on every protected route:
 * - Get user from DB (not localStorage only)
 * - Calculate days: now() - trial_start_date
 * - IF subscription_status == 'trial' AND now() > trial_end_date -> redirect to /paywall?reason=trial_expired
 * - IF subscription_status == 'active' AND now() > subscription_end_date -> set status 'expired' and redirect to /paywall?reason=subscription_expired
 * - IF status == 'expired' -> redirect to /paywall
 * - Otherwise allow.
 */

import fs from 'fs';
import path from 'path';
import { supabase } from '../src/supabase.js';

export type SubscriptionStatusEnum = 'trial' | 'active' | 'expired';

export interface UserSubscriptionRecord {
  user_id: string;
  email: string;
  full_name?: string;
  trial_start_date: string;
  trial_end_date: string;
  subscription_status: SubscriptionStatusEnum;
  subscription_end_date: string | null;
  paystack_reference: string | null;
  created_at: string;
  updated_at: string;
}

const DB_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.resolve(DB_DIR, 'user_subscriptions.json');

const ADMIN_EMAILS = [
  'samukelomasuku725@gmail.com',
  'admin@nexovian.co.za',
  'admin@nexovian.ai',
  'admin@nexovian.group',
  'nexovian@gmail.com'
];

function ensureDbFile(): void {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('[Subscription DB] Error ensuring DB file:', err);
  }
}

export function readAllUserSubscriptions(): UserSubscriptionRecord[] {
  ensureDbFile();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('[Subscription DB] Error reading DB file, returning empty array:', err);
    return [];
  }
}

export function writeAllUserSubscriptions(records: UserSubscriptionRecord[]): void {
  ensureDbFile();
  try {
    const tmp = `${DB_FILE}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(records, null, 2), 'utf-8');
    fs.renameSync(tmp, DB_FILE);
  } catch (err) {
    console.error('[Subscription DB] Error writing DB file:', err);
  }
}

/**
 * Register or get a user's subscription record.
 * Sets 2-Day free trial on first registration.
 */
export async function getOrCreateUserSubscription({
  email,
  userId,
  fullName
}: {
  email: string;
  userId?: string;
  fullName?: string;
}): Promise<UserSubscriptionRecord> {
  const normEmail = (email || '').trim().toLowerCase();
  const records = readAllUserSubscriptions();
  const now = new Date();
  const nowIso = now.toISOString();

  let existing = records.find(
    (r) => r.email.toLowerCase() === normEmail || (userId && r.user_id === userId)
  );

  if (existing) {
    let changed = false;

    // Check expiration if on trial
    if (existing.subscription_status === 'trial') {
      const trialEnd = new Date(existing.trial_end_date);
      if (now.getTime() > trialEnd.getTime()) {
        existing.subscription_status = 'expired';
        existing.updated_at = nowIso;
        changed = true;
      }
    }

    // Check expiration if on active subscription
    if (existing.subscription_status === 'active' && existing.subscription_end_date) {
      const subEnd = new Date(existing.subscription_end_date);
      if (now.getTime() > subEnd.getTime()) {
        existing.subscription_status = 'expired';
        existing.updated_at = nowIso;
        changed = true;
      }
    }

    if (userId && !existing.user_id) {
      existing.user_id = userId;
      changed = true;
    }

    if (changed) {
      writeAllUserSubscriptions(records);
      await syncToSupabaseProfile(existing);
    }

    return existing;
  }

  // Create new user subscription with 2-day trial
  const twoDaysLater = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
  const newRecord: UserSubscriptionRecord = {
    user_id: userId || `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    email: normEmail,
    full_name: fullName || '',
    trial_start_date: nowIso,
    trial_end_date: twoDaysLater.toISOString(),
    subscription_status: 'trial',
    subscription_end_date: null,
    paystack_reference: null,
    created_at: nowIso,
    updated_at: nowIso
  };

  records.push(newRecord);
  writeAllUserSubscriptions(records);
  await syncToSupabaseProfile(newRecord);

  return newRecord;
}

/**
 * Validates subscription access for a protected route.
 * Returns whether access is allowed or redirect is required.
 */
export async function checkSubscriptionAccess({
  email,
  userId
}: {
  email?: string;
  userId?: string;
}): Promise<{
  allow: boolean;
  status: SubscriptionStatusEnum | 'anonymous';
  reason?: 'trial_expired' | 'subscription_expired' | 'expired' | 'unauthenticated';
  record?: UserSubscriptionRecord;
  daysRemaining?: number;
  hoursRemaining?: number;
  isAdmin?: boolean;
}> {
  if (!email && !userId) {
    return {
      allow: false,
      status: 'anonymous',
      reason: 'unauthenticated'
    };
  }

  const normEmail = (email || '').trim().toLowerCase();

  // Admin bypass
  if (normEmail && ADMIN_EMAILS.includes(normEmail)) {
    return {
      allow: true,
      status: 'active',
      isAdmin: true
    };
  }

  const record = await getOrCreateUserSubscription({
    email: normEmail,
    userId
  });

  const now = new Date();

  // 1. IF trial has passed trial_end_date
  if (record.subscription_status === 'trial') {
    const trialEnd = new Date(record.trial_end_date);
    if (now.getTime() > trialEnd.getTime()) {
      record.subscription_status = 'expired';
      record.updated_at = now.toISOString();
      const records = readAllUserSubscriptions();
      const idx = records.findIndex((r) => r.email.toLowerCase() === record.email.toLowerCase());
      if (idx !== -1) records[idx] = record;
      writeAllUserSubscriptions(records);
      await syncToSupabaseProfile(record);

      return {
        allow: false,
        status: 'expired',
        reason: 'trial_expired',
        record
      };
    }

    const msRemaining = trialEnd.getTime() - now.getTime();
    const hoursRemaining = Math.max(0, Math.round(msRemaining / (1000 * 60 * 60)));
    const daysRemaining = Math.max(0, Math.ceil(msRemaining / (1000 * 60 * 60 * 24)));

    return {
      allow: true,
      status: 'trial',
      record,
      daysRemaining,
      hoursRemaining
    };
  }

  // 2. IF active subscription has passed subscription_end_date
  if (record.subscription_status === 'active') {
    if (record.subscription_end_date) {
      const subEnd = new Date(record.subscription_end_date);
      if (now.getTime() > subEnd.getTime()) {
        record.subscription_status = 'expired';
        record.updated_at = now.toISOString();
        const records = readAllUserSubscriptions();
        const idx = records.findIndex((r) => r.email.toLowerCase() === record.email.toLowerCase());
        if (idx !== -1) records[idx] = record;
        writeAllUserSubscriptions(records);
        await syncToSupabaseProfile(record);

        return {
          allow: false,
          status: 'expired',
          reason: 'subscription_expired',
          record
        };
      }
    }

    return {
      allow: true,
      status: 'active',
      record
    };
  }

  // 3. IF status is already expired
  return {
    allow: false,
    status: 'expired',
    reason: 'expired',
    record
  };
}

/**
 * Verifies and activates payment via Paystack:
 * - sets subscription_status = 'active'
 * - sets subscription_end_date = now() + 30 days
 * - saves paystack_reference
 */
export async function verifyAndActivatePaystackPayment({
  reference,
  email,
  userId
}: {
  reference: string;
  email: string;
  userId?: string;
}): Promise<UserSubscriptionRecord> {
  const normEmail = (email || '').trim().toLowerCase();
  const records = readAllUserSubscriptions();
  const now = new Date();
  const thirtyDaysLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  let existing = records.find(
    (r) => r.email.toLowerCase() === normEmail || (userId && r.user_id === userId)
  );

  if (!existing) {
    existing = await getOrCreateUserSubscription({ email: normEmail, userId });
  }

  existing.subscription_status = 'active';
  existing.subscription_end_date = thirtyDaysLater.toISOString();
  existing.paystack_reference = reference;
  existing.updated_at = now.toISOString();

  const idx = records.findIndex((r) => r.email.toLowerCase() === normEmail);
  if (idx !== -1) {
    records[idx] = existing;
  } else {
    records.push(existing);
  }
  writeAllUserSubscriptions(records);

  await syncToSupabaseProfile(existing);
  return existing;
}

/**
 * Deactivates user subscription when subscription.disable webhook event is received.
 * Sets subscription_status = 'expired'.
 */
export async function deactivateUserSubscription(email: string): Promise<UserSubscriptionRecord | null> {
  const normEmail = (email || '').trim().toLowerCase();
  const records = readAllUserSubscriptions();
  const now = new Date();

  let existing = records.find(
    (r) => r.email.toLowerCase() === normEmail
  );

  if (!existing) {
    return null;
  }

  existing.subscription_status = 'expired';
  existing.updated_at = now.toISOString();

  const idx = records.findIndex((r) => r.email.toLowerCase() === normEmail);
  if (idx !== -1) {
    records[idx] = existing;
    writeAllUserSubscriptions(records);
    await syncToSupabaseProfile(existing);
  }

  return existing;
}

async function syncToSupabaseProfile(record: UserSubscriptionRecord): Promise<void> {
  try {
    if (!record.email) return;
    await supabase.from('profiles').upsert(
      {
        id: record.user_id,
        email: record.email,
        full_name: record.full_name || '',
        trial_start_date: record.trial_start_date,
        trial_end_date: record.trial_end_date,
        subscription_status: record.subscription_status,
        subscription_end_date: record.subscription_end_date,
        paystack_reference: record.paystack_reference,
        updated_at: record.updated_at
      },
      { onConflict: 'email' }
    );
  } catch (err) {
    // Non-blocking sync
  }
}
