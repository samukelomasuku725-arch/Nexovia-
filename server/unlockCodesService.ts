/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN AUTO ONE-TIME UNLOCK CODE SERVICE
 * 
 * Flow:
 * 1. User pays R60 on SnapScan (https://pos.snapscan.io/qr/NKJJYpV6).
 * 2. On /paywall, user submits phone + reference -> calls POST /api/generate-code.
 * 3. System auto-generates UNIQUE code: format NEX- + 6 random digits (e.g. NEX-482910).
 *    Saves in unlock_codes table with status = 'unused'.
 *    Displays code in Big Gold Box with [Copy Code] and link to /unlock.
 * 4. On /unlock, user enters Unlock Code + Phone -> calls POST /api/unlock.
 *    - IF code not found -> Error "Invalid code"
 *    - IF status == 'used' -> Error "This code was already used on {used_at}. Each code works once only. Pay R60 for a new code."
 *    - IF status == 'unused' -> SUCCESS: status='used', used_at=NOW(), subscription_start=NOW(), subscription_end=NOW()+30 days.
 * 5. Auto-lock after 30 days:
 *    - NOW() > subscription_end -> status = 'expired', redirect to /paywall.
 */

import fs from 'fs';
import path from 'path';

export interface UnlockCodeRecord {
  id: string;
  code: string; // NEX-XXXXXX (6 digits)
  phone: string;
  email: string;
  reference: string;
  status: 'unused' | 'used' | 'expired';
  created_at: string;
  used_at: string | null;
  subscription_start: number | null;
  subscription_end: number | null;
  used_by_phone?: string | null;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const UNLOCK_CODES_FILE = path.resolve(DATA_DIR, 'unlock_codes.json');

function ensureDataFile(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(UNLOCK_CODES_FILE)) {
      // Seed initial demo code for immediate testing
      const initial: UnlockCodeRecord[] = [
        {
          id: `code_${Date.now()}_seed`,
          code: 'NEX-482910',
          phone: '0821234567',
          email: 'learner@nexovian.group',
          reference: 'SNAP-DEMO-R60',
          status: 'unused',
          created_at: new Date().toISOString(),
          used_at: null,
          subscription_start: null,
          subscription_end: null
        }
      ];
      fs.writeFileSync(UNLOCK_CODES_FILE, JSON.stringify(initial, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('[Unlock Codes DB] Error ensuring data directory/file:', err);
  }
}

export function readAllCodes(): UnlockCodeRecord[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(UNLOCK_CODES_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('[Unlock Codes DB] Error reading file, returning empty:', err);
    return [];
  }
}

export function writeAllCodes(records: UnlockCodeRecord[]): void {
  ensureDataFile();
  try {
    const tempFile = `${UNLOCK_CODES_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(records, null, 2), 'utf-8');
    fs.renameSync(tempFile, UNLOCK_CODES_FILE);
  } catch (err) {
    console.error('[Unlock Codes DB] Error writing file:', err);
  }
}

/**
 * Auto-generate UNIQUE code: format NEX- + 6 random digits (check duplicate)
 */
export function generateUniqueCode(existingCodes?: UnlockCodeRecord[]): string {
  const codes = existingCodes || readAllCodes();
  const existingSet = new Set(codes.map((c) => c.code.toUpperCase().trim()));

  for (let attempt = 0; attempt < 1000; attempt++) {
    // 6 random digits between 100000 and 999999
    const digits = Math.floor(100000 + Math.random() * 900000).toString();
    const candidate = `NEX-${digits}`;
    if (!existingSet.has(candidate)) {
      return candidate;
    }
  }

  // Fallback with timestamp digits if high collision
  return `NEX-${Date.now().toString().slice(-6)}`;
}

export function normalizePhone(phone: string): string {
  if (!phone) return '';
  return phone.replace(/[\s\-\(\)]/g, '').trim();
}

/**
 * 1. POST /api/generate-code
 * a) Validate phone (10 digits) and reference not empty
 * b) Auto-generate UNIQUE code NEX-XXXXXX
 * c) Save to DB status='unused', phone, email, reference
 * d) Return code to display instantly in Big Gold box on /paywall
 */
export async function createUnlockCode({
  phone,
  reference,
  email
}: {
  phone: string;
  reference: string;
  email?: string;
}): Promise<{
  success: boolean;
  message?: string;
  code?: string;
  record?: UnlockCodeRecord;
}> {
  const cleanPhone = normalizePhone(phone);
  const cleanRef = (reference || '').trim();
  const cleanEmail = (email || '').trim().toLowerCase();

  // a) Validate phone: at least 10 digits
  const phoneDigits = cleanPhone.replace(/\D/g, '');
  if (!cleanPhone || phoneDigits.length < 10) {
    return {
      success: false,
      message: 'Please enter a valid phone number with at least 10 digits (e.g. 0821234567).'
    };
  }

  // Validate reference not empty
  if (!cleanRef || cleanRef.length < 2) {
    return {
      success: false,
      message: 'Please enter your SnapScan reference or receipt number from your payment.'
    };
  }

  const records = readAllCodes();

  // Check if reference was already used to generate a code
  const existingForRef = records.find(
    (r) => r.reference.toLowerCase() === cleanRef.toLowerCase()
  );

  if (existingForRef) {
    // Return existing code if unused so user doesn't lose it
    if (existingForRef.status === 'unused') {
      return {
        success: true,
        code: existingForRef.code,
        message: 'Your unlock code was previously generated. Please use it on /unlock.',
        record: existingForRef
      };
    }
    if (existingForRef.status === 'used') {
      return {
        success: false,
        message: `This SnapScan reference (${cleanRef}) was already used for code ${existingForRef.code}. Please make a new R60 payment for a new code.`
      };
    }
  }

  // b) Auto-generate UNIQUE code NEX-XXXXXX
  const newCode = generateUniqueCode(records);
  const now = Date.now();

  const newRecord: UnlockCodeRecord = {
    id: `code_${now}_${Math.random().toString(36).substring(2, 7)}`,
    code: newCode,
    phone: cleanPhone,
    email: cleanEmail,
    reference: cleanRef,
    status: 'unused',
    created_at: new Date(now).toISOString(),
    used_at: null,
    subscription_start: null,
    subscription_end: null
  };

  records.push(newRecord);
  writeAllCodes(records);

  return {
    success: true,
    code: newCode,
    message: 'Your unlock code has been successfully generated. Write it down and unlock on /unlock.',
    record: newRecord
  };
}

/**
 * 2. POST /api/unlock
 * a) IF code not found -> Error "Invalid code"
 * b) IF status == 'used' -> Error "This code was already used on {used_at}. Each code works once only. Pay R60 for a new code."
 * c) IF status == 'expired' -> Error "This code has expired. Pay R60 for a new code."
 * d) IF status == 'unused' -> SUCCESS:
 *    Set status='used', used_at=NOW(), subscription_start=NOW(), subscription_end=NOW()+30 DAYS.
 *    Code can be used ONCE only.
 */
export async function unlockCode({
  code,
  phone
}: {
  code: string;
  phone: string;
}): Promise<{
  success: boolean;
  message: string;
  code?: string;
  subscription_start?: number;
  subscription_end?: number;
  days_remaining?: number;
  expires_at_formatted?: string;
  record?: UnlockCodeRecord;
}> {
  const cleanCode = (code || '').trim().toUpperCase();
  const cleanPhone = normalizePhone(phone);

  if (!cleanCode) {
    return {
      success: false,
      message: 'Please enter your unlock code (format: NEX-XXXXXX).'
    };
  }

  const phoneDigits = cleanPhone.replace(/\D/g, '');
  if (!cleanPhone || phoneDigits.length < 10) {
    return {
      success: false,
      message: 'Please enter your valid 10-digit phone number.'
    };
  }

  const records = readAllCodes();
  const record = records.find((r) => r.code.toUpperCase() === cleanCode);

  // a) IF code not found -> Error "Invalid code"
  if (!record) {
    return {
      success: false,
      message: 'Invalid code. Please check your code or pay R60 on SnapScan to get a new code.'
    };
  }

  // b) IF status == 'used' -> Error
  if (record.status === 'used') {
    const usedDate = record.used_at
      ? new Date(record.used_at).toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' })
      : 'earlier';
    return {
      success: false,
      message: `This code was already used on ${usedDate}. Each code works once only. Pay R60 for a new code.`
    };
  }

  // c) IF status == 'expired' -> Error
  if (record.status === 'expired') {
    return {
      success: false,
      message: 'This code has expired. Pay R60 on SnapScan for a new 30-day unlock code.'
    };
  }

  // d) IF status == 'unused' -> SUCCESS
  const now = Date.now();
  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
  const subscriptionEnd = now + thirtyDaysMs;

  record.status = 'used';
  record.used_at = new Date(now).toISOString();
  record.used_by_phone = cleanPhone;
  record.subscription_start = now;
  record.subscription_end = subscriptionEnd;

  writeAllCodes(records);

  const formattedDate = new Date(subscriptionEnd).toLocaleDateString('en-ZA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return {
    success: true,
    code: record.code,
    subscription_start: now,
    subscription_end: subscriptionEnd,
    days_remaining: 30,
    expires_at_formatted: formattedDate,
    message: `Active until ${formattedDate}. Full access unlocked for 30 days!`,
    record
  };
}

/**
 * 3. Session / Route Guard Check:
 * Check if code is currently active and NOW() <= subscription_end.
 * If NOW() > subscription_end -> status = 'expired'.
 */
export function verifySessionAccess(code: string): {
  allow: boolean;
  status: 'active' | 'expired' | 'invalid';
  daysRemaining: number;
  expiresAtFormatted: string;
  message?: string;
} {
  const cleanCode = (code || '').trim().toUpperCase();
  if (!cleanCode) {
    return {
      allow: false,
      status: 'invalid',
      daysRemaining: 0,
      expiresAtFormatted: '',
      message: 'No unlock code provided.'
    };
  }

  const records = readAllCodes();
  const record = records.find((r) => r.code.toUpperCase() === cleanCode);

  if (!record || record.status === 'unused') {
    return {
      allow: false,
      status: 'invalid',
      daysRemaining: 0,
      expiresAtFormatted: '',
      message: 'Code not activated. Please enter code on /unlock.'
    };
  }

  const now = Date.now();
  const subEnd = record.subscription_end || 0;

  if (record.status === 'used' && now <= subEnd) {
    const msRemaining = subEnd - now;
    const daysRemaining = Math.max(0, Math.ceil(msRemaining / (1000 * 60 * 60 * 24)));
    const formatted = new Date(subEnd).toLocaleDateString('en-ZA', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    return {
      allow: true,
      status: 'active',
      daysRemaining,
      expiresAtFormatted: formatted
    };
  }

  // Expired!
  if (record.status !== 'expired') {
    record.status = 'expired';
    writeAllCodes(records);
  }

  return {
    allow: false,
    status: 'expired',
    daysRemaining: 0,
    expiresAtFormatted: '',
    message: 'Your 30 days expired. Pay R60 for a new code.'
  };
}

/**
 * Admin action: Expire code immediately
 */
export function adminExpireCode(codeOrId: string): UnlockCodeRecord | null {
  const records = readAllCodes();
  const target = records.find((r) => r.code === codeOrId || r.id === codeOrId);
  if (!target) return null;

  target.status = 'expired';
  target.subscription_end = Date.now() - 1000;
  writeAllCodes(records);
  return target;
}

/**
 * Admin action: Delete code from database
 */
export function adminDeleteCode(codeOrId: string): boolean {
  const records = readAllCodes();
  const index = records.findIndex((r) => r.code === codeOrId || r.id === codeOrId);
  if (index === -1) return false;

  records.splice(index, 1);
  writeAllCodes(records);
  return true;
}
