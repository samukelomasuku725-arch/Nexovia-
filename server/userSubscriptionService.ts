/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN PAYSTACK 2-DAY FREE TRIAL & SUBSCRIPTION SERVICE
 * 
 * Database User Subscription Fields:
 * - subscription_status: 'none' | 'trial' | 'active' | 'cancelled' | 'expired'
 * - trial_start_date: ISO datetime nullable
 * - trial_end_date: ISO datetime nullable (NOW + 2 days when trial starts)
 * - subscription_end_date: ISO datetime nullable
 * - next_payment_date: ISO datetime nullable (equals trial_end_date during trial, or +30d when active)
 * - paystack_reference: nullable string
 * - paystack_subscription_code: nullable string
 * - paystack_email_token: nullable string
 * - paystack_customer_code: nullable string
 * - paystack_authorization_code: nullable string
 * - cancelled_at: ISO datetime nullable
 */

import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { supabase as anonSupabase } from '../src/supabase.js';

function getServerSupabaseClient() {
  const url = (
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    ''
  ).trim();
  const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();
  if (url && serviceKey) {
    return createClient(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });
  }
  return anonSupabase;
}

export type SubscriptionStatusEnum = 'none' | 'trial' | 'active' | 'cancelled' | 'expired';

export interface UserSubscriptionRecord {
  user_id: string;
  email: string;
  full_name?: string;
  trial_start_date: string | null;
  trial_end_date: string | null;
  subscription_status: SubscriptionStatusEnum;
  subscription_end_date: string | null;
  next_payment_date: string | null;
  paystack_reference: string | null;
  paystack_subscription_code?: string | null;
  paystack_email_token?: string | null;
  paystack_customer_code?: string | null;
  paystack_authorization_code?: string | null;
  cancelled_at?: string | null;
  created_at: string;
  updated_at: string;
}

const DB_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.resolve(DB_DIR, 'user_subscriptions.json');

export const ADMIN_EMAILS = [
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
 * Finds or initializes a user's subscription record with default status 'none'
 * (User must initiate the 2-day free trial via Paystack checkout to unlock access).
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
    (r) => (normEmail && r.email.toLowerCase() === normEmail) || (userId && r.user_id === userId)
  );

  if (existing) {
    let changed = false;

    if (existing.subscription_status === 'trial' && existing.trial_end_date) {
      const trialEnd = new Date(existing.trial_end_date);
      if (now.getTime() > trialEnd.getTime()) {
        // If they have a Paystack subscription code and it hasn't been cancelled, keep checking or wait for webhook;
        // locally mark expired until active charge.success arrives.
        existing.subscription_status = 'expired';
        existing.updated_at = nowIso;
        changed = true;
      }
    }

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
    if (fullName && !existing.full_name) {
      existing.full_name = fullName;
      changed = true;
    }

    if (changed) {
      writeAllUserSubscriptions(records);
      await syncToSupabaseProfile(existing);
    }

    return existing;
  }

  const newRecord: UserSubscriptionRecord = {
    user_id: userId || `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    email: normEmail,
    full_name: fullName || '',
    trial_start_date: null,
    trial_end_date: null,
    subscription_status: 'none',
    subscription_end_date: null,
    next_payment_date: null,
    paystack_reference: null,
    paystack_subscription_code: null,
    paystack_email_token: null,
    paystack_customer_code: null,
    paystack_authorization_code: null,
    cancelled_at: null,
    created_at: nowIso,
    updated_at: nowIso
  };

  records.push(newRecord);
  writeAllUserSubscriptions(records);
  await syncToSupabaseProfile(newRecord);

  return newRecord;
}

/**
 * Validates subscription access for a protected route (Study Guide, AI Tutor, Scan, Voice Docs).
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
  reason?: 'trial_expired' | 'subscription_expired' | 'expired' | 'cancelled' | 'no_subscription' | 'unauthenticated';
  record?: UserSubscriptionRecord;
  trial_end_date?: string | null;
  next_payment_date?: string | null;
  subscription_code?: string | null;
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

  let record = await getOrCreateUserSubscription({
    email: normEmail,
    userId
  });

  // Authoritative check on Supabase `users` table (is_paid, plan) first
  const supabaseClient = getServerSupabaseClient();
  if (normEmail) {
    try {
      const { data: paidUser } = await supabaseClient
        .from('users')
        .select('is_paid, plan, paystack_reference, paid_at')
        .eq('email', normEmail)
        .maybeSingle();

      if (paidUser?.is_paid === true) {
        const planName = String(paidUser.plan || 'trial').toLowerCase();
        const paidAtIso = paidUser.paid_at || new Date().toISOString();
        const paidAtMs = new Date(paidAtIso).getTime();
        const endIso =
          planName === 'active' || planName === 'monthly'
            ? new Date(paidAtMs + 30 * 24 * 60 * 60 * 1000).toISOString()
            : new Date(paidAtMs + 2 * 24 * 60 * 60 * 1000).toISOString();

        return {
          allow: true,
          status: planName === 'active' || planName === 'monthly' ? 'active' : 'trial',
          record: {
            ...record,
            subscription_status: planName === 'active' || planName === 'monthly' ? 'active' : 'trial',
            paystack_reference: paidUser.paystack_reference || record.paystack_reference,
            trial_end_date: endIso,
            next_payment_date: endIso,
            subscription_end_date: endIso
          },
          trial_end_date: endIso,
          next_payment_date: endIso,
          subscription_code: record.paystack_subscription_code || null
        };
      }
    } catch {
      // Fall through to profiles/local record
    }
  }

  // Fallback check on Supabase profiles if local record shows 'none'
  if (record.subscription_status === 'none' && normEmail) {
    try {
      const { data: profile } = await supabaseClient
        .from('profiles')
        .select('id, email, is_paid, trial_end, paystack_ref, created_at')
        .eq('email', normEmail)
        .maybeSingle();
      if (profile && profile.is_paid === true && profile.trial_end) {
        const isFuture = new Date(profile.trial_end).getTime() > Date.now();
        record.subscription_status = isFuture ? 'trial' : 'expired';
        record.trial_start_date = profile.created_at || null;
        record.trial_end_date = profile.trial_end;
        record.subscription_end_date = profile.trial_end;
        record.next_payment_date = profile.trial_end;
        record.paystack_reference = profile.paystack_ref || null;
      }
    } catch {
      // Non-blocking
    }
  }

  const now = new Date();
  const hasPaystackProof = Boolean(
    record.paystack_reference || record.paystack_subscription_code || record.paystack_authorization_code
  );

  if (record.subscription_status === 'trial') {
    if (!hasPaystackProof || !record.trial_end_date) {
      return {
        allow: false,
        status: 'none',
        reason: 'no_subscription',
        record
      };
    }

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
        record,
        trial_end_date: record.trial_end_date,
        next_payment_date: record.next_payment_date,
        subscription_code: record.paystack_subscription_code
      };
    }

    const msRemaining = trialEnd.getTime() - now.getTime();
    const hoursRemaining = Math.max(0, Math.round(msRemaining / (1000 * 60 * 60)));
    const daysRemaining = Math.max(0, Math.ceil(msRemaining / (1000 * 60 * 60 * 24)));

    return {
      allow: true,
      status: 'trial',
      record,
      trial_end_date: record.trial_end_date,
      next_payment_date: record.next_payment_date || record.trial_end_date,
      subscription_code: record.paystack_subscription_code,
      daysRemaining,
      hoursRemaining
    };
  }

  if (record.subscription_status === 'active') {
    if (!hasPaystackProof) {
      return {
        allow: false,
        status: 'none',
        reason: 'no_subscription',
        record
      };
    }
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
          record,
          trial_end_date: record.trial_end_date,
          next_payment_date: record.next_payment_date,
          subscription_code: record.paystack_subscription_code
        };
      }
    }

    return {
      allow: true,
      status: 'active',
      record,
      trial_end_date: record.trial_end_date,
      next_payment_date: record.next_payment_date || record.subscription_end_date,
      subscription_code: record.paystack_subscription_code
    };
  }

  if (record.subscription_status === 'cancelled') {
    return {
      allow: false,
      status: 'cancelled',
      reason: 'cancelled',
      record,
      trial_end_date: record.trial_end_date,
      next_payment_date: null,
      subscription_code: record.paystack_subscription_code
    };
  }

  if (record.subscription_status === 'none') {
    return {
      allow: false,
      status: 'none',
      reason: 'no_subscription',
      record,
      trial_end_date: null,
      next_payment_date: null,
      subscription_code: null
    };
  }

  return {
    allow: false,
    status: 'expired',
    reason: 'expired',
    record,
    trial_end_date: record.trial_end_date,
    next_payment_date: record.next_payment_date,
    subscription_code: record.paystack_subscription_code
  };
}

/**
 * Activates a 2-Day Free Trial after Paystack card authorization and subscription creation (start_date = NOW + 2 days).
 */
export async function activatePaystackTrial({
  email,
  userId,
  reference,
  startDateIso,
  subscriptionCode,
  emailToken,
  customerCode,
  authorizationCode
}: {
  email: string;
  userId?: string;
  reference: string;
  startDateIso?: string;
  subscriptionCode?: string | null;
  emailToken?: string | null;
  customerCode?: string | null;
  authorizationCode?: string | null;
}): Promise<UserSubscriptionRecord> {
  const normEmail = (email || '').trim().toLowerCase();
  const records = readAllUserSubscriptions();
  const now = new Date();
  const twoDaysLater = startDateIso ? new Date(startDateIso) : new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
  const trialEndIso = twoDaysLater.toISOString();

  let existing = records.find(
    (r) => r.email.toLowerCase() === normEmail || (userId && r.user_id === userId)
  );

  if (!existing) {
    existing = await getOrCreateUserSubscription({ email: normEmail, userId });
  }

  existing.subscription_status = 'trial';
  existing.trial_start_date = existing.trial_start_date || now.toISOString();
  existing.trial_end_date = trialEndIso;
  existing.next_payment_date = trialEndIso;
  existing.subscription_end_date = trialEndIso;
  existing.paystack_reference = reference;
  if (subscriptionCode) existing.paystack_subscription_code = subscriptionCode;
  if (emailToken) existing.paystack_email_token = emailToken;
  if (customerCode) existing.paystack_customer_code = customerCode;
  if (authorizationCode) existing.paystack_authorization_code = authorizationCode;
  existing.cancelled_at = null;
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
 * Verifies and activates recurring monthly R60 payment via Paystack:
 * - sets subscription_status = 'active'
 * - sets subscription_end_date & next_payment_date = now() + 30 days
 * - saves paystack_reference & optional subscription details
 */
export async function verifyAndActivatePaystackPayment({
  reference,
  email,
  userId,
  subscriptionCode,
  emailToken,
  customerCode,
  authorizationCode,
  nextPaymentDate
}: {
  reference: string;
  email: string;
  userId?: string;
  subscriptionCode?: string | null;
  emailToken?: string | null;
  customerCode?: string | null;
  authorizationCode?: string | null;
  nextPaymentDate?: string | null;
}): Promise<UserSubscriptionRecord> {
  const normEmail = (email || '').trim().toLowerCase();
  const records = readAllUserSubscriptions();
  const now = new Date();
  const thirtyDaysLater = nextPaymentDate
    ? new Date(nextPaymentDate)
    : new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  let existing = records.find(
    (r) => r.email.toLowerCase() === normEmail || (userId && r.user_id === userId)
  );

  if (!existing) {
    existing = await getOrCreateUserSubscription({ email: normEmail, userId });
  }

  existing.subscription_status = 'active';
  existing.subscription_end_date = thirtyDaysLater.toISOString();
  existing.next_payment_date = thirtyDaysLater.toISOString();
  existing.paystack_reference = reference;
  if (subscriptionCode) existing.paystack_subscription_code = subscriptionCode;
  if (emailToken) existing.paystack_email_token = emailToken;
  if (customerCode) existing.paystack_customer_code = customerCode;
  if (authorizationCode) existing.paystack_authorization_code = authorizationCode;
  existing.cancelled_at = null;
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
 * Marks a user subscription as 'cancelled' (e.g., cancelled before 2 days -> R0 charged, or subscription.disable webhook).
 */
export async function markSubscriptionCancelled(email: string): Promise<UserSubscriptionRecord | null> {
  const normEmail = (email || '').trim().toLowerCase();
  if (!normEmail) return null;
  const records = readAllUserSubscriptions();
  const nowIso = new Date().toISOString();

  const idx = records.findIndex((r) => r.email.toLowerCase() === normEmail);
  if (idx === -1) {
    return null;
  }

  records[idx].subscription_status = 'cancelled';
  records[idx].next_payment_date = null;
  records[idx].cancelled_at = nowIso;
  records[idx].updated_at = nowIso;

  writeAllUserSubscriptions(records);
  await syncToSupabaseProfile(records[idx]);
  return records[idx];
}

export async function deactivateUserSubscription(email: string): Promise<UserSubscriptionRecord | null> {
  return markSubscriptionCancelled(email);
}

export async function getUserSubscriptionRecord(email: string): Promise<UserSubscriptionRecord | null> {
  const normEmail = (email || '').trim().toLowerCase();
  if (!normEmail) return null;
  const records = readAllUserSubscriptions();
  return records.find((r) => r.email.toLowerCase() === normEmail) || null;
}

async function syncToSupabaseProfile(record: UserSubscriptionRecord): Promise<void> {
  try {
    if (!record.email) return;
    const supabaseClient = getServerSupabaseClient();
    const isPaid = record.subscription_status === 'trial' || record.subscription_status === 'active';
    const normEmail = record.email.trim().toLowerCase();

    if (isPaid) {
      const unlockPayload = {
        is_paid: true,
        plan: record.subscription_status === 'active' ? 'active' : 'trial',
        paystack_reference: record.paystack_reference,
        paid_at: record.updated_at || new Date().toISOString()
      };
      const { data: updatedRows, error: updErr } = await supabaseClient
        .from('users')
        .update(unlockPayload)
        .eq('email', normEmail)
        .select('email');

      if (updErr || !updatedRows || updatedRows.length === 0) {
        await supabaseClient.from('users').insert({ email: normEmail, ...unlockPayload });
      }
    }

    await supabaseClient.from('profiles').upsert(
      {
        id: record.user_id,
        email: normEmail,
        is_paid: record.subscription_status === 'trial' || record.subscription_status === 'active',
        trial_end: record.trial_end_date || record.subscription_end_date || null,
        paystack_ref: record.paystack_reference || null
      },
      { onConflict: 'email' }
    );
  } catch {
    // Non-blocking sync
  }
}
