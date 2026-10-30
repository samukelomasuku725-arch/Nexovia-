/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN - PER-EMAIL TRIAL & PAYWALL ENGINE (SERVER)
 * 
 * Rules:
 * 1. STATE 1 - Anonymous visitor:
 *    - No account / New link click: DO NOT show subscription card, DO NOT show "already used" message.
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
 * 6. NO GLOBAL DEVICE BLOCKING: Check is strictly per-email in DB.
 */

import fs from 'fs';
import path from 'path';
import { supabase } from '../src/supabase.js';

export const ADMIN_EMAILS = [
  'samukelomasuku725@gmail.com',
  'admin@nexovian.co.za',
  'admin@nexovian.ai',
  'nexovian@gmail.com'
];

export interface TrialRecord {
  id: string;
  email: string;
  phoneNumber?: string;
  status: 'TRIAL_USED' | 'PAID_USER';
  trialStartedAt: string;
  trialEndedAt?: string;
  paidAt?: string;
  paystackReference?: string;
  updatedAt: string;
}

const USED_TRIALS_FILE_PATH = path.resolve(process.cwd(), 'used_trials.json');
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

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

export function readTrialRecords(): TrialRecord[] {
  try {
    if (!fs.existsSync(USED_TRIALS_FILE_PATH)) {
      return [];
    }
    const raw = fs.readFileSync(USED_TRIALS_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('[Anti-Abuse] Could not read used_trials.json:', err);
    return [];
  }
}

export function writeTrialRecords(records: TrialRecord[]): void {
  try {
    const tempPath = `${USED_TRIALS_FILE_PATH}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(records, null, 2), 'utf-8');
    fs.renameSync(tempPath, USED_TRIALS_FILE_PATH);
  } catch (err) {
    console.error('[Anti-Abuse] Error writing used_trials.json:', err);
  }
}

async function syncToSupabaseTable(record: TrialRecord): Promise<void> {
  try {
    const { error } = await supabase.from('used_trial_emails').upsert(
      {
        email: record.email.toLowerCase(),
        phone_number: record.phoneNumber || null,
        status: record.status,
        trial_started_at: record.trialStartedAt,
        trial_ended_at: record.trialEndedAt || null,
        paid_at: record.paidAt || null,
        paystack_reference: record.paystackReference || null,
        updated_at: new Date().toISOString()
      },
      { onConflict: 'email' }
    );
    if (error && error.code !== 'PGRST205') {
      console.warn('[Anti-Abuse] Supabase used_trial_emails sync note:', error.message);
    }
  } catch {
    // Non-blocking
  }
}

/**
 * Checks email state across the 5 NEXOVIAN states.
 */
export async function checkAntiAbuseStatus({
  email,
  userCreatedAt
}: {
  email?: string;
  userCreatedAt?: string;
}) {
  const normEmail = (email || '').trim().toLowerCase();

  // STATE 1: Anonymous visitor
  if (!normEmail) {
    return {
      blocked: false,
      status: 'ANONYMOUS',
      canUseFreeTrial: true,
      showYellowBox: false
    };
  }

  // STATE 5: Admin bypass
  if (ADMIN_EMAILS.some((adm) => adm.toLowerCase() === normEmail)) {
    return {
      blocked: false,
      status: 'ADMIN',
      isAdmin: true,
      isPaidUser: true,
      canUseFreeTrial: false,
      showYellowBox: false
    };
  }

  const now = new Date();
  const records = readTrialRecords();

  // Query Supabase for remote record if table exists
  let remoteRecord: any = null;
  try {
    const { data } = await supabase
      .from('used_trial_emails')
      .select('*')
      .eq('email', normEmail)
      .maybeSingle();
    if (data) remoteRecord = data;
  } catch {
    // Ignore
  }

  const localMatch = records.find((r) => r.email.toLowerCase() === normEmail);
  const isPaid = localMatch?.status === 'PAID_USER' || remoteRecord?.status === 'PAID_USER';

  // STATE 4: Paid User
  if (isPaid) {
    return {
      blocked: false,
      status: 'PAID_USER',
      isPaidUser: true,
      canUseFreeTrial: false,
      showYellowBox: false
    };
  }

  // Check if email already existed in used_trial_emails DB
  const hadExistingRecord = Boolean(localMatch || remoteRecord);

  if (hadExistingRecord) {
    // STATE 3A: Email already recorded in DB from previous trial -> Show yellow box!
    const trialEnd = (localMatch?.trialEndedAt || remoteRecord?.trial_ended_at)
      ? new Date(localMatch?.trialEndedAt || remoteRecord?.trial_ended_at)
      : new Date(localMatch?.trialStartedAt || remoteRecord?.trial_started_at || now);
    const actualTrialEndDate = formatSouthAfricanDate(trialEnd);

    return {
      blocked: true,
      status: 'TRIAL_EXPIRED',
      showYellowBox: true,
      actualTrialEndDate,
      smartMessage: `Hey! You already used your 1 free day on ${actualTrialEndDate}. NEXOVIAN is R60/month to support all 11 languages. Pay to continue learning! 🔥`
    };
  }

  // Email NOT in used_trial_emails DB yet: Check user's creation time (State 2 vs State 3B)
  if (userCreatedAt) {
    const createdDate = new Date(userCreatedAt);
    const trialEnd = new Date(createdDate.getTime() + ONE_DAY_MS);

    if (now.getTime() >= trialEnd.getTime()) {
      // STATE 3B: Brand new trial just ended today!
      // Rule 2: Save to used_trial_emails DB AFTER trial ends, not before
      const newRecord: TrialRecord = {
        id: `trial_${Date.now()}`,
        email: normEmail,
        status: 'TRIAL_USED',
        trialStartedAt: createdDate.toISOString(),
        trialEndedAt: trialEnd.toISOString(),
        updatedAt: now.toISOString()
      };
      records.push(newRecord);
      writeTrialRecords(records);
      await syncToSupabaseTable(newRecord);

      // Rule 3: If brand new trial just ended today -> Show normal title, NO yellow box
      return {
        blocked: true,
        status: 'TRIAL_EXPIRED',
        showYellowBox: false,
        actualTrialEndDate: formatSouthAfricanDate(trialEnd),
        smartMessage: ''
      };
    } else {
      // STATE 2: New account created (trial active)
      const hoursRemaining = Math.max(1, Math.ceil((trialEnd.getTime() - now.getTime()) / (60 * 60 * 1000)));
      return {
        blocked: false,
        status: 'TRIAL_ACTIVE',
        hoursRemaining,
        showYellowBox: false,
        canUseFreeTrial: true
      };
    }
  }

  // Default: Eligible fresh email
  return {
    blocked: false,
    status: 'ELIGIBLE',
    canUseFreeTrial: true,
    showYellowBox: false
  };
}

/**
 * Record trial expired in used_trial_emails DB
 */
export async function recordTrialExpired({
  email,
  userId,
  trialStartedAt,
  trialEndedAt
}: {
  email: string;
  userId?: string;
  trialStartedAt?: string;
  trialEndedAt?: string;
}): Promise<TrialRecord> {
  const normEmail = email.trim().toLowerCase();
  const records = readTrialRecords();
  const now = new Date().toISOString();

  let existing = records.find((r) => r.email.toLowerCase() === normEmail);
  if (existing) {
    existing.trialEndedAt = trialEndedAt || now;
    existing.updatedAt = now;
  } else {
    existing = {
      id: userId || `trial_${Date.now()}`,
      email: normEmail,
      status: 'TRIAL_USED',
      trialStartedAt: trialStartedAt || now,
      trialEndedAt: trialEndedAt || now,
      updatedAt: now
    };
    records.push(existing);
  }

  writeTrialRecords(records);
  await syncToSupabaseTable(existing);
  return existing;
}

/**
 * Record payment for user - marks as PAID_USER
 */
export async function recordPaystackPayment({
  email,
  userId,
  reference
}: {
  email: string;
  userId?: string;
  reference: string;
}): Promise<TrialRecord> {
  const normEmail = email.trim().toLowerCase();
  const records = readTrialRecords();
  const now = new Date().toISOString();

  let existing = records.find((r) => r.email.toLowerCase() === normEmail);
  if (existing) {
    existing.status = 'PAID_USER';
    existing.paidAt = now;
    existing.paystackReference = reference;
    existing.updatedAt = now;
  } else {
    existing = {
      id: userId || `paid_${Date.now()}`,
      email: normEmail,
      status: 'PAID_USER',
      trialStartedAt: now,
      paidAt: now,
      paystackReference: reference,
      updatedAt: now
    };
    records.push(existing);
  }

  writeTrialRecords(records);
  await syncToSupabaseTable(existing);

  if (userId) {
    try {
      await supabase.from('profiles').update({
        subscription_status: 'PAID_USER',
        subscription_plan: 'NEXOVIAN R60 Learner',
        subscription_ref: reference,
        subscription_date: now,
        updated_at: now
      }).eq('id', userId);
    } catch {
      // Non-blocking
    }
  }

  return existing;
}
