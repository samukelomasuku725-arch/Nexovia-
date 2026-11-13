/**
 * Vercel Serverless Function: /api/paystack/status
 *
 * Returns authoritative subscription/trial status for a logged-in user.
 * Never returns a fake 'active' status — a user is ONLY 'trial' or 'active'
 * after Paystack payment/authorization has been confirmed.
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
    return localFile;
  } catch {
    return '/tmp/nexovian_user_subscriptions.json';
  }
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const email = String(req.query?.email || '').trim().toLowerCase();
    const userId = String(req.query?.userId || '').trim();

    if (!email) {
      return res.status(200).json({
        success: true,
        status: 'anonymous',
        has_access: false,
        trial_end_date: null,
        next_payment_date: null,
        subscription_code: null
      });
    }

    let records: any[] = [];
    try {
      const dbFile = getDbFile();
      if (fs.existsSync(dbFile)) {
        records = JSON.parse(fs.readFileSync(dbFile, 'utf-8')) || [];
      }
    } catch {
      records = [];
    }

    let found = records.find((r) => r.email?.toLowerCase() === email || (userId && r.user_id === userId));

    // Fallback to Supabase profiles if local file has no confirmed record
    if (!found || found.subscription_status === 'none') {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', email)
          .maybeSingle();
        if (profile && profile.subscription_status && profile.subscription_status !== 'none') {
          found = {
            user_id: profile.id || userId,
            email,
            subscription_status: profile.subscription_status,
            trial_start_date: profile.trial_start_date || null,
            trial_end_date: profile.trial_end_date || null,
            subscription_end_date: profile.subscription_end_date || null,
            next_payment_date: profile.trial_end_date || profile.subscription_end_date || null,
            paystack_reference: profile.paystack_reference || null
          };
        }
      } catch {
        // Non-blocking fallback
      }
    }

    if (!found) {
      return res.status(200).json({
        success: true,
        status: 'none',
        has_access: false,
        trial_end_date: null,
        next_payment_date: null,
        subscription_code: null
      });
    }

    const now = Date.now();
    let status = found.subscription_status || 'none';
    let hasAccess = false;

    const hasPaystackProof = Boolean(
      found.paystack_reference || found.paystack_subscription_code || found.paystack_authorization_code
    );

    if (status === 'trial') {
      if (!hasPaystackProof || !found.trial_end_date) {
        status = 'none';
      } else if (now <= new Date(found.trial_end_date).getTime()) {
        hasAccess = true;
      } else {
        status = 'expired';
      }
    } else if (status === 'active') {
      if (!hasPaystackProof) {
        status = 'none';
      } else if (!found.subscription_end_date || now <= new Date(found.subscription_end_date).getTime()) {
        hasAccess = true;
      } else {
        status = 'expired';
      }
    }

    return res.status(200).json({
      success: true,
      status,
      has_access: hasAccess,
      trial_end_date: status === 'none' ? null : found.trial_end_date || null,
      next_payment_date:
        status === 'cancelled' || status === 'none'
          ? null
          : found.next_payment_date || found.subscription_end_date || found.trial_end_date || null,
      subscription_code: found.paystack_subscription_code || null,
      cancelled_at: found.cancelled_at || null,
      record: found
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || 'Status lookup failed' });
  }
}
