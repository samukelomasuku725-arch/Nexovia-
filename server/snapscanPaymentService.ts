/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN SNAPSCAN PAYMENT & 30-DAY AUTO-LOCK SUBSCRIPTION SERVICE
 * 
 * BUSINESS SPECIFICATION:
 * - NEXOVIAN (Pty) Ltd | Reg: 2026/234078/07 | nexovian.group
 * - Price: R60 for 30 days access
 * - SnapScan Payment Link: https://pos.snapscan.io/qr/NKJJYpV6
 * - Contact WhatsApp: https://wa.me/27636508381
 * 
 * SCHEMA:
 * - payment_status: 'pending' | 'paid'
 * - payment_reference: string (SnapScan ref / receipt / phone number)
 * - payment_phone: string (learner's phone)
 * - access_code: string (unique generated like NEX-XXXXXX)
 * - subscription_status: 'active' | 'expired'
 * - subscription_start: timestamp (ms)
 * - subscription_end: timestamp (ms, start + 30 days)
 * - last_payment_date: timestamp (ms)
 */

import fs from 'fs';
import path from 'path';

export interface SnapScanPaymentRecord {
  id: string;
  name?: string;
  email?: string;
  payment_phone: string;
  payment_reference: string;
  access_code: string;
  payment_status: 'pending' | 'paid';
  subscription_status: 'active' | 'expired';
  subscription_start: number;
  subscription_end: number;
  last_payment_date: number;
  created_at: string;
  updated_at: string;
}

export interface OneTimeCodeRecord {
  code: string;
  amount: number;
  used: boolean;
  created_at: string;
  used_at: string | null;
  used_by_phone: string | null;
  used_by_email: string | null;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const PAYMENTS_FILE = path.resolve(DATA_DIR, 'snapscan_payments.json');
const CODES_FILE = path.resolve(DATA_DIR, 'one_time_codes.json');

const INITIAL_ONE_TIME_CODES: OneTimeCodeRecord[] = [
  {
    code: 'NEX-60R-DEMO',
    amount: 60,
    used: false,
    created_at: new Date().toISOString(),
    used_at: null,
    used_by_phone: null,
    used_by_email: null
  },
  {
    code: 'NEX-SNAP60',
    amount: 60,
    used: false,
    created_at: new Date().toISOString(),
    used_at: null,
    used_by_phone: null,
    used_by_email: null
  },
  {
    code: 'NEX-MPU2026',
    amount: 60,
    used: false,
    created_at: new Date().toISOString(),
    used_at: null,
    used_by_phone: null,
    used_by_email: null
  }
];

function ensurePaymentsFile(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(PAYMENTS_FILE)) {
      fs.writeFileSync(PAYMENTS_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
    if (!fs.existsSync(CODES_FILE)) {
      fs.writeFileSync(CODES_FILE, JSON.stringify(INITIAL_ONE_TIME_CODES, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('[SnapScan DB] Error ensuring data directory/file:', err);
  }
}

export function readAllOneTimeCodes(): OneTimeCodeRecord[] {
  ensurePaymentsFile();
  try {
    const raw = fs.readFileSync(CODES_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('[SnapScan DB] Error reading codes file, returning default list:', err);
    return [];
  }
}

export function writeAllOneTimeCodes(codes: OneTimeCodeRecord[]): void {
  ensurePaymentsFile();
  try {
    const tempFile = `${CODES_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(codes, null, 2), 'utf-8');
    fs.renameSync(tempFile, CODES_FILE);
  } catch (err) {
    console.error('[SnapScan DB] Error writing codes file:', err);
  }
}

export function readAllPayments(): SnapScanPaymentRecord[] {
  ensurePaymentsFile();
  try {
    const raw = fs.readFileSync(PAYMENTS_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('[SnapScan DB] Error reading file, returning empty list:', err);
    return [];
  }
}

export function writeAllPayments(records: SnapScanPaymentRecord[]): void {
  ensurePaymentsFile();
  try {
    const tempFile = `${PAYMENTS_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(records, null, 2), 'utf-8');
    fs.renameSync(tempFile, PAYMENTS_FILE);
  } catch (err) {
    console.error('[SnapScan DB] Error writing payments file:', err);
  }
}

function generateAccessCode(): string {
  // Generates NEX-XXXXXX format with 6 alphanumeric uppercase chars
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `NEX-${code}`;
}

export function normalizePhone(phone: string): string {
  if (!phone) return '';
  return phone.replace(/[\s\-\(\)]/g, '').trim();
}

/**
 * Validates and auto-approves a SnapScan payment:
 * 1. Checks phone has at least 10 digits
 * 2. Checks reference is not empty
 * 3. Sets subscription to active for 30 days
 */
export async function verifySnapScanPayment({
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
  subscription_start?: number;
  subscription_end?: number;
  subscription_status?: 'active' | 'expired';
  record?: SnapScanPaymentRecord;
}> {
  const cleanPhone = normalizePhone(phone);
  const cleanRef = (reference || '').trim();
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanName = (name || '').trim();

  // Validate phone: at least 10 digits
  const phoneDigits = cleanPhone.replace(/\D/g, '');
  if (phoneDigits.length < 10) {
    return {
      success: false,
      message: 'Please enter a valid phone number (at least 10 digits).'
    };
  }

  // Validate reference: non-empty
  if (!cleanRef || cleanRef.length < 2) {
    return {
      success: false,
      message: 'Please enter the SnapScan reference or receipt number from your payment.'
    };
  }

  // Replace auto-approve with SnapScan webhook verification later - verify amount R60 via SnapScan API
  const now = Date.now();
  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
  const subscriptionEnd = now + thirtyDaysMs;

  const records = readAllPayments();

  // Find existing record by phone or email to preserve access_code or renew
  let existing = records.find(
    (r) =>
      r.payment_phone === cleanPhone ||
      (cleanEmail && r.email && r.email.toLowerCase() === cleanEmail)
  );

  let recordToReturn: SnapScanPaymentRecord;

  if (existing) {
    // Renewal: keep same access code, update subscription to now + 30 days
    existing.payment_status = 'paid';
    existing.subscription_status = 'active';
    existing.subscription_start = now;
    existing.subscription_end = subscriptionEnd;
    existing.last_payment_date = now;
    existing.payment_reference = cleanRef;
    if (cleanEmail && !existing.email) existing.email = cleanEmail;
    if (cleanName && !existing.name) existing.name = cleanName;
    existing.updated_at = new Date().toISOString();

    recordToReturn = existing;
  } else {
    // New subscription record
    const accessCode = generateAccessCode();
    const newRecord: SnapScanPaymentRecord = {
      id: `snap_${now}_${Math.random().toString(36).substring(2, 7)}`,
      name: cleanName || 'Nexovian Learner',
      email: cleanEmail || '',
      payment_phone: cleanPhone,
      payment_reference: cleanRef,
      access_code: accessCode,
      payment_status: 'paid',
      subscription_status: 'active',
      subscription_start: now,
      subscription_end: subscriptionEnd,
      last_payment_date: now,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    records.push(newRecord);
    recordToReturn = newRecord;
  }

  writeAllPayments(records);

  return {
    success: true,
    access_code: recordToReturn.access_code,
    subscription_start: recordToReturn.subscription_start,
    subscription_end: recordToReturn.subscription_end,
    subscription_status: 'active',
    record: recordToReturn
  };
}

/**
 * Access check helper on the server
 */
export function checkUserAccess({
  phone,
  email,
  accessCode
}: {
  phone?: string;
  email?: string;
  accessCode?: string;
}): {
  allow: boolean;
  status: 'active' | 'expired' | 'unregistered';
  daysRemaining: number;
  subscription_end?: number;
  record?: SnapScanPaymentRecord;
} {
  const records = readAllPayments();
  const cleanPhone = phone ? normalizePhone(phone) : '';
  const cleanEmail = email ? email.trim().toLowerCase() : '';
  const cleanCode = accessCode ? accessCode.trim().toUpperCase() : '';

  const record = records.find(
    (r) =>
      (cleanCode && r.access_code === cleanCode) ||
      (cleanPhone && r.payment_phone === cleanPhone) ||
      (cleanEmail && r.email && r.email.toLowerCase() === cleanEmail)
  );

  if (!record) {
    return {
      allow: false,
      status: 'unregistered',
      daysRemaining: 0
    };
  }

  const now = Date.now();
  if (record.subscription_status === 'active' && now <= record.subscription_end) {
    const msRemaining = record.subscription_end - now;
    const daysRemaining = Math.max(0, Math.ceil(msRemaining / (1000 * 60 * 60 * 24)));
    return {
      allow: true,
      status: 'active',
      daysRemaining,
      subscription_end: record.subscription_end,
      record
    };
  }

  // If expired, update record status if needed
  if (record.subscription_status === 'active' && now > record.subscription_end) {
    record.subscription_status = 'expired';
    record.updated_at = new Date().toISOString();
    writeAllPayments(records);
  }

  return {
    allow: false,
    status: 'expired',
    daysRemaining: 0,
    subscription_end: record.subscription_end,
    record
  };
}

/**
 * Admin action: Extend 30 days
 */
export function extendSubscription(idOrCode: string): SnapScanPaymentRecord | null {
  const records = readAllPayments();
  const target = records.find((r) => r.id === idOrCode || r.access_code === idOrCode);
  if (!target) return null;

  const now = Date.now();
  const baseTime = target.subscription_end > now ? target.subscription_end : now;
  target.subscription_end = baseTime + 30 * 24 * 60 * 60 * 1000;
  target.subscription_status = 'active';
  target.updated_at = new Date().toISOString();

  writeAllPayments(records);
  return target;
}

/**
 * Admin action: Expire now
 */
export function expireSubscription(idOrCode: string): SnapScanPaymentRecord | null {
  const records = readAllPayments();
  const target = records.find((r) => r.id === idOrCode || r.access_code === idOrCode);
  if (!target) return null;

  target.subscription_status = 'expired';
  target.subscription_end = Date.now() - 1000;
  target.updated_at = new Date().toISOString();

  writeAllPayments(records);
  return target;
}

/**
 * Verify and consume a one-time code:
 * - Checks in database as used=false
 * - Marks used=true
 * - Creates/updates 30-day active subscription
 */
export async function verifyAndConsumeOneTimeCode({
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
  subscription_start?: number;
  subscription_end?: number;
}> {
  const cleanCode = (code || '').trim().toUpperCase();
  const cleanPhone = normalizePhone(phone);
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanName = (name || '').trim();

  if (!cleanCode) {
    return {
      success: false,
      message: 'Please enter a valid one-time access code.'
    };
  }

  const codes = readAllOneTimeCodes();
  let codeRecord = codes.find((c) => c.code === cleanCode);

  if (!codeRecord) {
    // If not found in codes list, check if reference matches a verified payment
    const payments = readAllPayments();
    const matchingPayment = payments.find(
      (p) => p.access_code === cleanCode || p.payment_reference.toUpperCase() === cleanCode
    );

    if (matchingPayment && matchingPayment.payment_status === 'paid') {
      const now = Date.now();
      return {
        success: true,
        access_code: matchingPayment.access_code,
        subscription_start: matchingPayment.subscription_start,
        subscription_end: matchingPayment.subscription_end
      };
    }

    return {
      success: false,
      message: `Invalid access code "${cleanCode}". Please enter a valid one-time code or complete SnapScan payment.`
    };
  }

  if (codeRecord.used) {
    return {
      success: false,
      message: `This code "${cleanCode}" has already been used on ${new Date(codeRecord.used_at || Date.now()).toLocaleDateString('en-ZA')}. Each code is one-time use only.`
    };
  }

  // Mark as used=true in database
  codeRecord.used = true;
  codeRecord.used_at = new Date().toISOString();
  codeRecord.used_by_phone = cleanPhone || 'phone_user';
  codeRecord.used_by_email = cleanEmail || null;
  writeAllOneTimeCodes(codes);

  // Activate 30-day subscription
  const now = Date.now();
  const subscriptionEnd = now + 30 * 24 * 60 * 60 * 1000;
  const payments = readAllPayments();

  let existing = payments.find(
    (r) =>
      (cleanPhone && r.payment_phone === cleanPhone) ||
      (cleanEmail && r.email && r.email.toLowerCase() === cleanEmail)
  );

  if (existing) {
    existing.payment_status = 'paid';
    existing.subscription_status = 'active';
    existing.subscription_start = now;
    existing.subscription_end = subscriptionEnd;
    existing.access_code = cleanCode;
    existing.updated_at = new Date().toISOString();
  } else {
    payments.push({
      id: `snap_${now}_${Math.random().toString(36).substring(2, 7)}`,
      name: cleanName || 'Nexovian Learner',
      email: cleanEmail || '',
      payment_phone: cleanPhone || '0821234567',
      payment_reference: `CODE:${cleanCode}`,
      access_code: cleanCode,
      payment_status: 'paid',
      subscription_status: 'active',
      subscription_start: now,
      subscription_end: subscriptionEnd,
      last_payment_date: now,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }

  writeAllPayments(payments);

  return {
    success: true,
    access_code: cleanCode,
    subscription_start: now,
    subscription_end: subscriptionEnd,
    message: 'One-time code successfully verified and consumed. Access granted for 30 days.'
  };
}

