/**
 * Vercel Serverless Function: /api/paystack/subscribe
 *
 * Starts a 2-Day Free Trial Paystack subscription flow:
 * - Requires PAYSTACK_SECRET_KEY and PAYSTACK_PLAN_CODE from environment variables (zero hardcoding).
 * - Requires an authenticated user's email.
 * - Sets subscription start_date to NOW + 2 days so the first R60 charge is in 2 days, NOT today.
 * - Initializes Paystack card checkout to capture card/billing authorization and redirects to /success.
 */

const DEFAULT_CALLBACK_URL = 'https://nexovian.group/success';

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
    const secretKey = (process.env.PAYSTACK_SECRET_KEY || '').trim();
    const planCode = (process.env.PAYSTACK_PLAN_CODE || '').trim();

    if (!secretKey || !planCode) {
      return res.status(500).json({
        success: false,
        error: 'Paystack configuration missing. Please configure PAYSTACK_SECRET_KEY and PAYSTACK_PLAN_CODE in environment variables.'
      });
    }

    const { email, userId, callbackUrl } = req.body || {};
    const finalEmail = (email || '').trim().toLowerCase();

    if (!finalEmail || !finalEmail.includes('@')) {
      return res.status(400).json({
        success: false,
        error: 'Please log in or create an account with a valid email address before starting your 2-day free trial.'
      });
    }

    const trialEnd = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
    const startDate = trialEnd.toISOString();
    const reference = `NEX_TRIAL_${userId || 'usr'}_${Date.now()}`;

    const originHeader = req.headers.origin || (req.headers.host ? `https://${req.headers.host}` : '');
    const finalCallback = callbackUrl || (originHeader ? `${originHeader}/success` : DEFAULT_CALLBACK_URL);

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
          user_id: userId || '',
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
