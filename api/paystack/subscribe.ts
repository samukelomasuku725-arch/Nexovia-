/**
 * Vercel Serverless Function: /api/paystack/subscribe
 *
 * Starts a 2-Day Free Trial Paystack subscription flow:
 * - Requires authenticated Supabase Bearer session (returns 401 if unauthenticated).
 * - Requires PAYSTACK_SECRET_KEY and PAYSTACK_PLAN_CODE from environment variables (zero hardcoding).
 * - Requires both verified user email and user_id in Paystack metadata.
 * - Sets subscription start_date to NOW + 2 days so the first R60 charge is in 2 days, NOT today.
 */

import { createClient } from '@supabase/supabase-js';

const DEFAULT_CALLBACK_URL = 'https://nexovian.group/success';
const ALLOWED_ORIGIN_PATTERNS = [
  /^https:\/\/([a-z0-9-]+\.)?nexovian\.group$/i,
  /^http:\/\/localhost:\d+$/i,
  /^https:\/\/[a-z0-9-]+\.vercel\.app$/i,
  /^https:\/\/[a-z0-9-]+\.run\.app$/i
];

function resolveAllowedOrigin(originHeader?: string): string {
  if (originHeader && ALLOWED_ORIGIN_PATTERNS.some((re) => re.test(originHeader.trim()))) {
    return originHeader.trim();
  }
  return 'https://nexovian.group';
}

function resolveSafeCallbackUrl(rawCallback: any, originHeader?: string, hostHeader?: string): string {
  const candidate = typeof rawCallback === 'string' ? rawCallback.trim() : '';
  if (candidate) {
    try {
      const parsed = new URL(candidate);
      if (ALLOWED_ORIGIN_PATTERNS.some((re) => re.test(parsed.origin))) {
        return parsed.toString();
      }
    } catch {
      // ignore invalid URL
    }
  }
  const fallbackOrigin =
    originHeader && ALLOWED_ORIGIN_PATTERNS.some((re) => re.test(originHeader.trim()))
      ? originHeader.trim()
      : hostHeader
      ? `https://${hostHeader}`
      : '';
  return fallbackOrigin ? `${fallbackOrigin}/success` : DEFAULT_CALLBACK_URL;
}

export default async function handler(req: any, res: any) {
  const allowedOrigin = resolveAllowedOrigin(req.headers?.origin);
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const authHeader = String(req.headers?.authorization || '');
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required. Please log in before starting your 2-day free trial.'
      });
    }

    const supabaseUrl = (
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.SUPABASE_URL ||
      process.env.VITE_SUPABASE_URL ||
      'https://elvzpyksawrpdzfdnwsj.supabase.co'
    ).trim();
    const supabaseKey = (
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      process.env.VITE_SUPABASE_ANON_KEY ||
      'sb_publishable_Qvje6uGCD42PcmnFypO89g__TuoqTxR'
    ).trim();

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });
    const {
      data: { user: authUser },
      error: authError
    } = await supabase.auth.getUser(token);

    if (authError || !authUser) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired session. Please log in again.'
      });
    }

    const finalEmail = String(authUser.email || '').trim().toLowerCase();
    const finalUserId = String(authUser.id || '').trim();

    if (!finalEmail || !finalEmail.includes('@') || !finalUserId) {
      return res.status(401).json({
        success: false,
        error: 'Verified account email and user ID are required before starting your 2-day free trial.'
      });
    }

    const secretKey = (process.env.PAYSTACK_SECRET_KEY || '').trim();
    const planCode = (process.env.PAYSTACK_PLAN_CODE || '').trim();

    if (!secretKey || !planCode) {
      return res.status(500).json({
        success: false,
        error: 'Paystack configuration missing. Please configure PAYSTACK_SECRET_KEY and PAYSTACK_PLAN_CODE in environment variables.'
      });
    }

    const { callbackUrl } = req.body || {};
    const trialEnd = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
    const startDate = trialEnd.toISOString();
    const reference = `NEX_TRIAL_${finalUserId}_${Date.now()}`;
    const finalCallback = resolveSafeCallbackUrl(callbackUrl, req.headers?.origin, req.headers?.host);

    // Initialize Paystack checkout WITHOUT passing `plan` here so R60 is NOT charged today.
    // Once card authorization succeeds, /api/paystack/verify and /api/paystack/webhook create the
    // subscription on PAYSTACK_PLAN_CODE with start_date = NOW + 2 days.
    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: finalEmail,
        amount: 100, // R1.00 card/bank authorization check (first R60 subscription charge happens in 2 days)
        currency: 'ZAR',
        reference,
        callback_url: finalCallback,
        metadata: {
          type: 'two_day_trial',
          user_id: finalUserId,
          email: finalEmail,
          plan_code: planCode,
          start_date: startDate,
          company: 'Nexovian',
          custom_fields: [
            {
              display_name: 'Subscription',
              variable_name: 'subscription',
              value: '2-Day Free Trial, then R60/month'
            },
            {
              display_name: 'First R60 Billing Date',
              variable_name: 'start_date',
              value: startDate
            }
          ]
        }
      })
    });

    const paystackData: any = await paystackRes.json();

    if (!paystackRes.ok || !paystackData?.status || !paystackData?.data?.authorization_url) {
      return res.status(paystackRes.status >= 400 ? paystackRes.status : 502).json({
        success: false,
        error: paystackData?.message || 'Failed to initialize Paystack trial checkout.'
      });
    }

    return res.status(200).json({
      success: true,
      authorization_url: paystackData.data.authorization_url,
      access_code: paystackData.data.access_code,
      reference: paystackData.data.reference || reference,
      start_date: startDate,
      trial_end_date: startDate
    });
  } catch (error: any) {
    console.error('[Paystack Subscribe Error]:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to start Paystack checkout.'
    });
  }
}
