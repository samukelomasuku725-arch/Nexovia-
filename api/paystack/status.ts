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

function getSupabaseAdminClient() {
  const url = (
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    ''
  ).trim();
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
}

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

    // Authoritative check: query Supabase `users` table (is_paid, plan) using service role key
    const supabase = getSupabaseAdminClient();
    if (supabase) {
      try {
        const { data: paidUser } = await supabase
          .from('users')
          .select('is_paid, plan, paystack_reference, paid_at')
          .eq('email', email)
          .maybeSingle();

        if (paidUser?.is_paid === true) {
          const planName = String(paidUser.plan || 'trial').toLowerCase();
          const paidAtMs = paidUser.paid_at ? new Date(paidUser.paid_at).getTime() : Date.now();
          const endDate =
            planName === 'active' || planName === 'monthly'
              ? new Date(paidAtMs + 30 * 24 * 60 * 60 * 1000).toISOString()
              : new Date(paidAtMs + 2 * 24 * 60 * 60 * 1000).toISOString();

          return res.status(200).json({
            success: true,
            is_paid: true,
            plan: paidUser.plan || 'trial',
            status: planName === 'active' || planName === 'monthly' ? 'active' : 'trial',
            has_access: true,
            trial_end_date: endDate,
            next_payment_date: endDate,
            subscription_code: null,
            paystack_reference: paidUser.paystack_reference || null
          });
        }
      } catch {
        // Fallback to profiles / local file below
      }
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
    if ((!found || found.subscription_status === 'none') && supabase) {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('id, email, is_paid, trial_end, paystack_ref, created_at')
          .eq('email', email)
          .maybeSingle();
        if (profile && profile.is_paid === true && profile.trial_end) {
          const isFuture = new Date(profile.trial_end).getTime() > Date.now();
          found = {
            user_id: profile.id || userId,
            email,
            subscription_status: isFuture ? 'trial' : 'expired',
            trial_start_date: profile.created_at || null,
            trial_end_date: profile.trial_end,
            subscription_end_date: profile.trial_end,
            next_payment_date: profile.trial_end,
            paystack_reference: profile.paystack_ref || null
          };
        }
      } catch {
        // Non-blocking fallback
      }
    }

    if (!found) {
      return res.status(200).json({
        success: true,
        is_paid: false,
        plan: 'free',
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
