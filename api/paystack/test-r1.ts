/**
 * Vercel Serverless Function: /api/paystack/test-r1
 *
 * Restricted R1 (100 ZAR cents) one-time test payment endpoint.
 * Strictly allowed ONLY for the authenticated test email (samukelomasuku17@gmail.com).
 * Does NOT attach PAYSTACK_PLAN_CODE (not a subscription), and triggers the same
 * charge.success webhook at /api/paystack-webhook.
 */

import { createClient } from '@supabase/supabase-js';

const TEST_R1_EMAIL = 'samukelomasuku17@gmail.com';
const DEFAULT_CALLBACK_URL = 'https://nexovian.group/success';
const ALLOWED_ORIGIN_PATTERNS = [
  /^https:\/\/([a-z0-9-]+\.)?nexovian\.group$/i,
  /^http:\/\/localhost:\d+$/i,
  /^https:\/\/[a-z0-9-]+\.vercel\.app$/i,
  /^https:\/\/[a-z0-9-]+\.run\.app$/i
];

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
      return res.status(401).json({ success: false, error: 'Authentication required.' });
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
      return res.status(401).json({ success: false, error: 'Invalid or expired session.' });
    }

    const email = String(authUser.email || '').trim().toLowerCase();
    if (email !== TEST_R1_EMAIL) {
      return res.status(403).json({ success: false, error: 'Test R1 payment is restricted.' });
    }

    const secretKey = (process.env.PAYSTACK_SECRET_KEY || '').trim();
    if (!secretKey) {
      return res.status(500).json({ success: false, error: 'PAYSTACK_SECRET_KEY not configured.' });
    }

    const { callbackUrl } = req.body || {};
    const reference = `NEXOVIAN-TESTR1-${Date.now()}`;
    const finalCallback = resolveSafeCallbackUrl(callbackUrl, req.headers?.origin, req.headers?.host);

    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        amount: 100, // R1.00 once (100 ZAR cents), not a subscription
        currency: 'ZAR',
        reference,
        callback_url: finalCallback,
        metadata: {
          type: 'test_r1_one_time',
          one_time_test: true,
          user_id: authUser.id,
          email
        }
      })
    });

    const paystackData: any = await paystackRes.json();
    if (!paystackRes.ok || !paystackData?.status || !paystackData?.data?.authorization_url) {
      return res.status(paystackRes.status >= 400 ? paystackRes.status : 502).json({
        success: false,
        error: paystackData?.message || 'Failed to initialize R1 test payment.'
      });
    }

    return res.status(200).json({
      success: true,
      authorization_url: paystackData.data.authorization_url,
      access_code: paystackData.data.access_code,
      reference: paystackData.data.reference || reference
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || 'R1 test checkout error.' });
  }
}
