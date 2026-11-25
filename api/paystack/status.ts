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

    // Authoritative check: query Supabase `profiles` (`is_unlocked`, `subscription_status`) using service role key
    const supabase = getSupabaseAdminClient();
    if (supabase) {
      try {
        let profile: any = null;
        const { data: fullProfile, error: fullErr } = await supabase
          .from('profiles')
          .select('id, email, is_unlocked, subscription_status, trial_end, paystack_ref, created_at')
          .eq('email', email)
          .maybeSingle();

        if (!fullErr && fullProfile) {
          profile = fullProfile;
        } else if (fullErr) {
          const { data: minProfile } = await supabase
            .from('profiles')
            .select('id, email, is_unlocked, subscription_status')
            .eq('email', email)
            .maybeSingle();
          profile = minProfile;
        }

        if (profile) {
          const isUnlocked = profile.is_unlocked === true;
          const subStatus = String(profile.subscription_status || (isUnlocked ? 'active' : 'locked')).toLowerCase();
          const trialEnd = profile.trial_end || null;
          const validTrialEnd = !trialEnd || new Date(trialEnd).getTime() > Date.now() || subStatus === 'active';

          if (isUnlocked && validTrialEnd) {
            const endDate =
              trialEnd || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
            return res.status(200).json({
              success: true,
              is_unlocked: true,
              subscription_status: subStatus,
              plan: subStatus || 'active',
              status: 'active',
              has_access: true,
              trial_end_date: endDate,
              next_payment_date: endDate,
              subscription_code: null,
              paystack_reference: profile.paystack_ref || null
            });
          }

          return res.status(200).json({
            success: true,
            is_unlocked: false,
            subscription_status: subStatus || 'locked',
            plan: 'free',
            status: isUnlocked && !validTrialEnd ? 'expired' : 'none',
            has_access: false,
            trial_end_date: trialEnd,
            next_payment_date: null,
            subscription_code: null
          });
        }
      } catch {
        // Fallback to users / local file below
      }

      try {
        const { data: paidUser } = await supabase
          .from('users')
          .select('is_unlocked, subscription_status, plan, paystack_reference, paid_at')
          .eq('email', email)
          .maybeSingle();

        if (paidUser?.is_unlocked === true) {
          const planName = String(paidUser.subscription_status || paidUser.plan || 'active').toLowerCase();
          const paidAtMs = paidUser.paid_at ? new Date(paidUser.paid_at).getTime() : Date.now();
          const endDate =
            planName === 'active' || planName === 'monthly'
              ? new Date(paidAtMs + 30 * 24 * 60 * 60 * 1000).toISOString()
              : new Date(paidAtMs + 2 * 24 * 60 * 60 * 1000).toISOString();

          return res.status(200).json({
            success: true,
            is_unlocked: true,
            subscription_status: 'active',
            plan: paidUser.plan || 'active',
            status: 'active',
            has_access: true,
            trial_end_date: endDate,
            next_payment_date: endDate,
            subscription_code: null,
            paystack_reference: paidUser.paystack_reference || null
          });
        }
      } catch {
        // Fallback to local file below
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

    if (!found) {
      return res.status(200).json({
        success: true,
        is_unlocked: false,
        subscription_status: 'locked',
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
      is_unlocked: hasAccess,
      subscription_status: hasAccess ? 'active' : status,
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
