/**
 * Vercel Serverless Function: /api/paystack/initialize
 * 
 * Initializes a Paystack checkout transaction for:
 * Plan Code: PLN_suslgrc1q9rtsfi (Nexovian Monthly - R60/month, ZAR)
 * Redirects to Paystack checkout, then back to nexovian.group/success
 */

const PLAN_CODE = 'PLN_suslgrc1q9rtsfi';
const PLAN_NAME = 'Nexovian Monthly';
const AMOUNT_CENTS = 6000; // R60 in cents
const DIRECT_PAYMENT_PAGE = 'https://paystack.shop/pay/2vrisypa3i';
const DEFAULT_CALLBACK_URL = 'https://nexovian.group/success';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, userId, callbackUrl } = req.body || {};
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    const finalEmail = (email || '').trim().toLowerCase() || 'learner@nexovian.group';
    const finalCallback = callbackUrl || DEFAULT_CALLBACK_URL;
    const reference = `NEX_${userId || 'anon'}_${Date.now()}`;

    // If secret key is configured, initialize transaction via official Paystack API
    if (secretKey && secretKey.startsWith('sk_')) {
      try {
        const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${secretKey.trim()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: finalEmail,
            amount: AMOUNT_CENTS,
            currency: 'ZAR',
            plan: PLAN_CODE,
            reference,
            callback_url: finalCallback,
            metadata: {
              user_id: userId,
              email: finalEmail,
              plan_code: PLAN_CODE,
              plan_name: PLAN_NAME,
              company: 'Nexovian'
            }
          })
        });

        const paystackData: any = await paystackRes.json();
        if (paystackData?.status && paystackData?.data?.authorization_url) {
          return res.status(200).json({
            success: true,
            authorization_url: paystackData.data.authorization_url,
            access_code: paystackData.data.access_code,
            reference: paystackData.data.reference || reference,
            plan_code: PLAN_CODE
          });
        }

        console.warn('[Paystack Initialize API Notice]:', paystackData?.message || 'Using payment page fallback');
      } catch (err: any) {
        console.warn('[Paystack Initialize API Network Error]:', err?.message);
      }
    }

    // Fallback directly to Paystack payment page link provided by user
    return res.status(200).json({
      success: true,
      authorization_url: DIRECT_PAYMENT_PAGE,
      reference,
      plan_code: PLAN_CODE,
      directPayPage: true
    });
  } catch (error: any) {
    console.error('[Paystack Initialize Error]:', error);
    return res.status(200).json({
      success: true,
      authorization_url: DIRECT_PAYMENT_PAGE,
      reference: `NEX_${Date.now()}`,
      plan_code: PLAN_CODE,
      directPayPage: true
    });
  }
}
