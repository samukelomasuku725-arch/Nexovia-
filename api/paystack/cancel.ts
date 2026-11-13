/**
 * Vercel Serverless Function: /api/paystack/cancel
 *
 * Disables the user's Paystack subscription via POST https://api.paystack.co/subscription/disable
 * and marks the subscription as 'cancelled' in the database (charging R0 if before trial end).
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

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { email, userId } = req.body || {};
    const normEmail = (email || '').trim().toLowerCase();

    if (!normEmail) {
      return res.status(400).json({ success: false, error: 'User email is required to cancel subscription.' });
    }

    const secretKey = (process.env.PAYSTACK_SECRET_KEY || '').trim();
    const dbFile = getDbFile();
    let records: any[] = [];
    try {
      records = JSON.parse(fs.readFileSync(dbFile, 'utf-8')) || [];
    } catch {
      records = [];
    }

    let found = records.find((r) => r.email?.toLowerCase() === normEmail || (userId && r.user_id === userId));
    let subCode = found?.paystack_subscription_code || null;
    let emailToken = found?.paystack_email_token || null;

    // Look up subscription from Paystack if code/token missing locally
    if (secretKey && (!subCode || !emailToken)) {
      try {
        const listRes = await fetch('https://api.paystack.co/subscription?perPage=50', {
          headers: { Authorization: `Bearer ${secretKey}` }
        });
        const listData: any = await listRes.json();
        if (listData?.status && Array.isArray(listData.data)) {
          const match = listData.data.find(
            (s: any) =>
              s?.customer?.email?.toLowerCase() === normEmail &&
              (s?.status === 'active' || s?.status === 'attention' || s?.status === 'non-renewing')
          );
          if (match) {
            subCode = match.subscription_code;
            emailToken = match.email_token;
          }
        }
      } catch (err) {
        console.warn('[Paystack Subscription Lookup Warning]:', err);
      }
    }

    // Disable subscription in Paystack if code & token exist
    if (secretKey && subCode && emailToken) {
      const disableRes = await fetch('https://api.paystack.co/subscription/disable', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: subCode,
          token: emailToken
        })
      });
      const disableData: any = await disableRes.json();
      if (!disableRes.ok || !disableData?.status) {
        console.warn('[Paystack Subscription Disable Notice]:', disableData?.message);
      }
    }

    const nowIso = new Date().toISOString();
    const wasInTrial = found?.subscription_status === 'trial';

    if (found) {
      found.subscription_status = 'cancelled';
      found.next_payment_date = null;
      found.cancelled_at = nowIso;
      found.updated_at = nowIso;
      if (subCode) found.paystack_subscription_code = subCode;
      if (emailToken) found.paystack_email_token = emailToken;
    } else {
      found = {
        user_id: userId || `usr_${Date.now()}`,
        email: normEmail,
        trial_start_date: null,
        trial_end_date: null,
        subscription_status: 'cancelled',
        subscription_end_date: null,
        next_payment_date: null,
        paystack_reference: null,
        paystack_subscription_code: subCode,
        paystack_email_token: emailToken,
        cancelled_at: nowIso,
        created_at: nowIso,
        updated_at: nowIso
      };
      records.push(found);
    }

    const tmp = `${dbFile}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(records, null, 2), 'utf-8');
    fs.renameSync(tmp, dbFile);

    try {
      await supabase.from('profiles').upsert(
        {
          id: found.user_id,
          email: normEmail,
          subscription_status: 'cancelled',
          updated_at: nowIso
        },
        { onConflict: 'email' }
      );
    } catch {
      // Non-blocking
    }

    return res.status(200).json({
      success: true,
      status: 'cancelled',
      charged_amount: 'R0',
      message: wasInTrial
        ? 'Your 2-day free trial subscription has been cancelled. R0 will be charged.'
        : 'Your monthly subscription has been cancelled. You will not be billed again.',
      record: found
    });
  } catch (error: any) {
    console.error('[Paystack Cancel Error]:', error);
    return res.status(500).json({ success: false, error: error?.message || 'Failed to cancel subscription.' });
  }
}
