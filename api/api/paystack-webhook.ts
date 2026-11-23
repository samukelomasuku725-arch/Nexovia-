import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const secretKey = (process.env.PAYSTACK_SECRET_KEY || '').trim();
  const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
  const signature = req.headers['x-paystack-signature'];

  const expected = crypto.createHmac('sha512', secretKey).update(rawBody).digest('hex');
  if (!signature || signature !== expected) {
    console.warn('UNLOCK: Invalid signature');
    return res.status(401).send('Invalid signature');
  }

  const event = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

  if (event?.event === 'charge.success') {
    const email = String(event.data?.customer?.email || '').trim().toLowerCase();
    const reference = String(event.data?.reference || '').trim();
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || '', { auth: { autoRefreshToken: false, persistSession: false } });

    const payload = { is_paid: true, plan: 'trial', paystack_reference: reference, paid_at: new Date().toISOString() };
    const { data } = await supabase.from('users').update(payload).eq('email', email).select('email');
    if (!data || data.length === 0) {
      await supabase.from('users').insert({ email, ...payload });
    }
    console.log('UNLOCK: success', { email, reference });
  }

  return res.status(200).send('OK');
}