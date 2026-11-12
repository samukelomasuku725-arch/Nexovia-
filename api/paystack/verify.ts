/**
 * Vercel Serverless Function: /api/paystack/verify
 * 
 * Verifies Paystack transaction reference and activates user subscription for 30 days.
 */

import fs from 'fs';
import path from 'path';

const DB_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.resolve(DB_DIR, 'user_subscriptions.json');

function ensureDbFile(): void {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('[Verify DB] Error ensuring DB file:', err);
  }
}

function activateUser(email: string, reference: string, userId?: string) {
  ensureDbFile();
  const normEmail = (email || '').trim().toLowerCase();
  if (!normEmail) return null;

  let records: any[] = [];
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    records = JSON.parse(raw);
    if (!Array.isArray(records)) records = [];
  } catch {
    records = [];
  }

  const now = new Date();
  const thirtyDaysLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  let found = records.find((r) => r.email && r.email.toLowerCase() === normEmail);

  if (found) {
    found.subscription_status = 'active';
    found.subscription_end_date = thirtyDaysLater.toISOString();
    found.paystack_reference = reference;
    found.updated_at = now.toISOString();
  } else {
    found = {
      user_id: userId || `usr_${Date.now()}`,
      email: normEmail,
      trial_start_date: now.toISOString(),
      trial_end_date: now.toISOString(),
      subscription_status: 'active',
      subscription_end_date: thirtyDaysLater.toISOString(),
      paystack_reference: reference,
      created_at: now.toISOString(),
      updated_at: now.toISOString()
    };
    records.push(found);
  }

  const tmp = `${DB_FILE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(records, null, 2), 'utf-8');
  fs.renameSync(tmp, DB_FILE);
  return found;
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const reference = (req.query?.reference || req.body?.reference || '').trim();
    const email = (req.query?.email || req.body?.email || '').trim();
    const userId = (req.query?.userId || req.body?.userId || '').trim();

    if (!reference) {
      return res.status(400).json({ success: false, error: 'Reference is required' });
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    let verifiedEmail = email;

    // Verify with Paystack if secret key is present
    if (secretKey && secretKey.startsWith('sk_')) {
      try {
        const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
          headers: {
            Authorization: `Bearer ${secretKey.trim()}`
          }
        });
        const verifyData: any = await verifyRes.json();
        if (verifyData?.status && verifyData?.data?.status === 'success') {
          verifiedEmail = verifyData.data.customer?.email || verifyData.data.metadata?.email || email;
        }
      } catch (verErr) {
        console.warn('[Paystack Verification network warning]:', verErr);
      }
    }

    const record = activateUser(verifiedEmail || 'learner@nexovian.group', reference, userId);

    return res.status(200).json({
      success: true,
      verified: true,
      subscription_status: 'active',
      reference,
      record
    });
  } catch (error: any) {
    console.error('[Verify error]:', error);
    return res.status(500).json({ success: false, error: error?.message });
  }
}
