/**
 * Vercel Serverless Function: /api/paystack/verify
 *
 * Verifies a Paystack transaction reference after redirect from Paystack checkout,
 * creates the Paystack subscription starting in 2 days (start_date = NOW + 2 days)
 * using PAYSTACK_PLAN_CODE, and marks the user's status as 'trial' (or 'active').
 */

import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://elvzpyksawrpdzfdnwsj.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_Qvje6uGCD42PcmnFypO89g__TuoqTxR';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function getDbFile(): string {
  const localDir = path.resolve(process.cwd(), 'data');
  try {
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    const localFile = path.resolve(localDir, 'user_subscriptions.json');
    if (!fs.existsSync(localFile)) {
      fs.writeFileSync(localFile, JSON.stringify([], null, 2), 'utf-8');
    }
    fs.accessSync(localFile, fs.constants.W_OK);
    return localFile;
  } catch {
    const tmpFile = '/tmp/nexovian_user_subscriptions.json';
    if (!fs.existsSync(tmpFile)) {
      fs.writeFileSync(tmpFile, JSON.stringify([], null, 2), 'utf-8');
    }
    return tmpFile;
  }
}

function readRecords(): any[] {
  try {
    const dbFile = getDbFile();
    const raw = fs.readFileSync(dbFile, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeRecords(records: any[]): void {
  try {
    const dbFile = getDbFile();
    const tmp = `${dbFile}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(records, null, 2), 'utf-8');
    fs.renameSync(tmp, dbFile);
  } catch (err) {
    console.warn('[Verify DB write warning]:', err);
  }
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const reference = String(req.query?.reference || req.query?.trxref || req.body?.reference || '').trim();
    const reqEmail = String(req.query?.email || req.body?.email || '').trim().toLowerCase();
    const reqUserId = String(req.query?.userId || req.body?.userId || '').trim();

    if (!reference) {
      return res.status(400).json({ success: false, error: 'Payment reference is required.' });
    }

    const secretKey = (process.env.PAYSTACK_SECRET_KEY || '').trim();
    const planCode = (process.env.PAYSTACK_PLAN_CODE || '').trim();

    if (!secretKey) {
      return res.status(500).json({ success: false, error: 'PAYSTACK_SECRET_KEY not configured.' });
    }

    const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`
      }
    });
    const verifyData: any = await verifyRes.json();

    if (!verifyRes.ok || !verifyData?.status || verifyData?.data?.status !== 'success') {
      return res.status(400).json({
        success: false,
        verified: false,
        error: verifyData?.data?.gateway_response || verifyData?.message || 'Paystack transaction verification failed.'
      });
    }

    const txData = verifyData.data;
    const verifiedEmail = (txData.customer?.email || txData.metadata?.email || reqEmail || '').trim().toLowerCase();
    const userId = reqUserId || txData.metadata?.user_id || `usr_${Date.now()}`;
    const customerCode = txData.customer?.customer_code || null;
    const authorizationCode = txData.authorization?.authorization_code || null;
    const metadata = txData.metadata || {};
    const isTrialInit = metadata.type === 'two_day_trial';

    const now = new Date();
    const startDateIso = metadata.start_date || new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString();

    const records = readRecords();
    let existing = records.find((r) => r.email && r.email.toLowerCase() === verifiedEmail);

    let subscriptionCode: string | null = existing?.paystack_subscription_code || null;
    let emailToken: string | null = existing?.paystack_email_token || null;

    // Create delayed Paystack subscription starting in 2 days if not already created
    if (isTrialInit && planCode && customerCode && (!subscriptionCode || existing?.subscription_status !== 'trial')) {
      try {
        const subPayload: any = {
          customer: customerCode,
          plan: planCode,
          start_date: startDateIso
        };
        if (authorizationCode) {
          subPayload.authorization = authorizationCode;
        }
        const subRes = await fetch('https://api.paystack.co/subscription', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${secretKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(subPayload)
        });
        const subData: any = await subRes.json();
        if (subData?.status && subData?.data?.subscription_code) {
          subscriptionCode = subData.data.subscription_code;
          emailToken = subData.data.email_token || emailToken;
        } else {
          console.warn('[Paystack Subscription Create Notice]:', subData?.message);
        }
      } catch (subErr) {
        console.warn('[Paystack Subscription Create Warning]:', subErr);
      }
    }

    const nextDateIso = isTrialInit
      ? startDateIso
      : new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();
    const newStatus = isTrialInit ? 'trial' : 'active';

    if (existing) {
      existing.subscription_status = newStatus;
      existing.trial_start_date = existing.trial_start_date || now.toISOString();
      if (isTrialInit) {
        existing.trial_end_date = startDateIso;
      }
      existing.subscription_end_date = nextDateIso;
      existing.next_payment_date = nextDateIso;
      existing.paystack_reference = reference;
      if (subscriptionCode) existing.paystack_subscription_code = subscriptionCode;
      if (emailToken) existing.paystack_email_token = emailToken;
      if (customerCode) existing.paystack_customer_code = customerCode;
      if (authorizationCode) existing.paystack_authorization_code = authorizationCode;
      existing.cancelled_at = null;
      existing.updated_at = now.toISOString();
    } else {
      existing = {
        user_id: userId,
        email: verifiedEmail,
        trial_start_date: now.toISOString(),
        trial_end_date: startDateIso,
        subscription_status: newStatus,
        subscription_end_date: nextDateIso,
        next_payment_date: nextDateIso,
        paystack_reference: reference,
        paystack_subscription_code: subscriptionCode,
        paystack_email_token: emailToken,
        paystack_customer_code: customerCode,
        paystack_authorization_code: authorizationCode,
        cancelled_at: null,
        created_at: now.toISOString(),
        updated_at: now.toISOString()
      };
      records.push(existing);
    }

    writeRecords(records);

    try {
      if (verifiedEmail) {
        await supabase.from('profiles').upsert(
          {
            id: existing.user_id,
            email: verifiedEmail,
            trial_start_date: existing.trial_start_date,
            trial_end_date: existing.trial_end_date,
            subscription_status: existing.subscription_status,
            subscription_end_date: existing.subscription_end_date,
            paystack_reference: reference,
            updated_at: existing.updated_at
          },
          { onConflict: 'email' }
        );
      }
    } catch {
      // Non-blocking
    }

    return res.status(200).json({
      success: true,
      verified: true,
      email: existing.email,
      status: existing.subscription_status,
      subscription_status: existing.subscription_status,
      trial_end_date: existing.trial_end_date,
      next_payment_date: existing.next_payment_date,
      subscription_code: existing.paystack_subscription_code,
      reference,
      record: existing
    });
  } catch (error: any) {
    console.error('[Paystack Verify Error]:', error);
    return res.status(500).json({ success: false, error: error?.message || 'Verification failed' });
  }
}
