/**
 * Vercel Serverless Function: /api/paystack/public-key
 *
 * Returns the configured Paystack LIVE/publishable public key (`pk_...`) from environment variables.
 * Never exposes secret keys (`sk_...`).
 */

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const candidate = (
    process.env.VITE_PAYSTACK_PUBLIC_KEY ||
    process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ||
    process.env.PAYSTACK_PUBLIC_KEY ||
    ''
  ).trim();

  const publicKey = candidate.startsWith('pk_') ? candidate : '';

  return res.status(200).json({
    success: Boolean(publicKey),
    publicKey
  });
}
