/**
 * Vercel Serverless Function: /api/paystack-webhook
 *
 * Verifies Paystack webhook signature (HMAC SHA-512 with PAYSTACK_SECRET_KEY)
 * and updates user subscription status in Supabase `profiles` (via Service Role Key) & local state:
 * - charge.success -> marks `profiles.is_paid = true`, `trial_end`, `paystack_ref`
 * - subscription.create -> stores subscription_code & email_token, preserves/sets 'trial' or 'active'
 * - subscription.disable / subscription.not_renew -> marks user 'cancelled'
 */

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

function getSupabaseAdminClient() {
  const url = (
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    'https://elvzpyksawrpdzfdnwsj.supabase.co'
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

function readRecords(): any[] {
  try {
    const raw = fs.readFileSync(getDbFile(), 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeRecords(records: any[]): void {
  try {
    const dbFile = getDbFile();
    const tmp = `${dbFile}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(records, null, 2), 'utf-8');
    fs.renameSync(tmp, dbFile);
  } catch (err) {
    console.warn('[Webhook DB write warning]:', err);
  }
}

async function syncProfile(record: any): Promise<void> {
  const supabase = getSupabaseAdminClient();
  if (!supabase || !record?.email) {
    console.warn('UNLOCK: Missing Supabase Service Role client or email in /api/paystack-webhook');
    return;
  }

  const isPaid = record.subscription_status === 'trial' || record.subscription_status === 'active';
  const email = String(record.email).trim().toLowerCase();
  const trialEnd =
    record.next_payment_date ||
    record.trial_end_date ||
    new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString();

  try {
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    const metadataId =
      record.user_id &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(record.user_id))
        ? String(record.user_id)
        : null;
    const resolvedId = existingProfile?.id || metadataId || crypto.randomUUID();

    const { error: profileErr } = await supabase.from('profiles').upsert(
      {
        id: resolvedId,
        email,
        is_paid: isPaid,
        trial_end: isPaid ? trialEnd : new Date().toISOString(),
        paystack_ref: record.paystack_reference || null
      },
      { onConflict: 'email' }
    );

    if (profileErr) {
      console.error('UNLOCK: profiles upsert error in /api/paystack-webhook:', profileErr.message);
    } else {
      console.log('UNLOCK: profiles updated via /api/paystack-webhook', {
        email,
        is_paid: isPaid,
        paystack_ref: record.paystack_reference || null
      });
    }
  } catch (err: any) {
    console.error('UNLOCK: profiles sync error:', err?.message || err);
  }

  try {
    if (isPaid) {
      const unlockPayload = {
        is_paid: true,
        plan: record.subscription_status === 'active' ? 'active' : 'trial',
        paystack_reference: record.paystack_reference || null,
        paid_at: record.updated_at || new Date().toISOString()
      };
      const { data: updated, error: updErr } = await supabase
        .from('users')
        .update(unlockPayload)
        .eq('email', email)
        .select('email');

      if (updErr || !updated || updated.length === 0) {
        await supabase.from('users').insert({ email, ...unlockPayload });
      }
    }
  } catch {
    // Non-blocking optional users table sync
  }
}

export const config = {
  api: {
    bodyParser: false
  }
};

function readRawBody(req: any): Promise<string> {
  if (typeof req.body === 'string') return Promise.resolve(req.body);
  if (Buffer.isBuffer(req.body)) return Promise.resolve(req.body.toString('utf8'));
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer | string) => {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk, 'utf8') : chunk);
    });
    req.on('end', () => {
      if (chunks.length > 0) {
        resolve(Buffer.concat(chunks).toString('utf8'));
      } else if (req.body && typeof req.body === 'object') {
        resolve(JSON.stringify(req.body));
      } else {
        resolve('');
      }
    });
    req.on('error', reject);
  });
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const secretKey = (process.env.PAYSTACK_SECRET_KEY || '').trim();
    const planCode = (process.env.PAYSTACK_PLAN_CODE || '').trim();
    const sigHeader = req.headers['x-paystack-signature'];
    const signature = Array.isArray(sigHeader) ? sigHeader[0] : sigHeader;

    if (!secretKey) {
      return res.status(500).json({ error: 'PAYSTACK_SECRET_KEY not configured' });
    }

    const rawBody = await readRawBody(req);
    const expectedHex = crypto.createHmac('sha512', secretKey).update(rawBody).digest('hex');
    const expectedBuf = Buffer.from(expectedHex, 'utf8');
    const receivedBuf = Buffer.from(String(signature || '').trim(), 'utf8');

    if (!signature || expectedBuf.length !== receivedBuf.length || !crypto.timingSafeEqual(expectedBuf, receivedBuf)) {
      return res.status(401).json({ error: 'Invalid Paystack webhook signature' });
    }

    const event = JSON.parse(rawBody);
    const eventType = event?.event;
    const data = event?.data;
    const now = new Date();
    const nowIso = now.toISOString();

    if (eventType === 'charge.success') {
      const customerEmail = (data?.customer?.email || data?.metadata?.email || data?.email || '').trim().toLowerCase();
      const reference = data?.reference || `PAY_${Date.now()}`;
      const userId = data?.metadata?.user_id;
      const isTrialInit = data?.metadata?.type === 'two_day_trial';
      const customerCode = data?.customer?.customer_code || null;
      const authorizationCode = data?.authorization?.authorization_code || null;

      if (customerEmail) {
        const records = readRecords();
        let found = records.find((r) => r.email?.toLowerCase() === customerEmail);
        const startDateIso = data?.metadata?.start_date || new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString();

        let subscriptionCode = found?.paystack_subscription_code || null;
        let emailToken = found?.paystack_email_token || null;

        if (isTrialInit && secretKey && planCode && customerCode && !subscriptionCode) {
          try {
            const subRes = await fetch('https://api.paystack.co/subscription', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${secretKey}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                customer: customerCode,
                plan: planCode,
                authorization: authorizationCode,
                start_date: startDateIso
              })
            });
            const subData: any = await subRes.json();
            if (subData?.status && subData?.data?.subscription_code) {
              subscriptionCode = subData.data.subscription_code;
              emailToken = subData.data.email_token || emailToken;
            }
          } catch (err) {
            console.warn('[Webhook subscription create error]:', err);
          }
        }

        const nextDateIso = isTrialInit ? startDateIso : new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();
        const statusToSet = isTrialInit ? 'trial' : 'active';

        if (found) {
          found.subscription_status = statusToSet;
          if (isTrialInit) {
            found.trial_start_date = found.trial_start_date || nowIso;
            found.trial_end_date = startDateIso;
          } else {
            found.trial_end_date = nextDateIso;
          }
          found.subscription_end_date = nextDateIso;
          found.next_payment_date = nextDateIso;
          found.paystack_reference = reference;
          if (subscriptionCode) found.paystack_subscription_code = subscriptionCode;
          if (emailToken) found.paystack_email_token = emailToken;
          if (customerCode) found.paystack_customer_code = customerCode;
          if (authorizationCode) found.paystack_authorization_code = authorizationCode;
          found.cancelled_at = null;
          found.updated_at = nowIso;
        } else {
          found = {
            user_id: userId || `usr_${Date.now()}`,
            email: customerEmail,
            trial_start_date: nowIso,
            trial_end_date: nextDateIso,
            subscription_status: statusToSet,
            subscription_end_date: nextDateIso,
            next_payment_date: nextDateIso,
            paystack_reference: reference,
            paystack_subscription_code: subscriptionCode,
            paystack_email_token: emailToken,
            paystack_customer_code: customerCode,
            paystack_authorization_code: authorizationCode,
            cancelled_at: null,
            created_at: nowIso,
            updated_at: nowIso
          };
          records.push(found);
        }

        writeRecords(records);
        await syncProfile(found);
      }

      return res.status(200).json({ status: 'success', message: 'Charge processed' });
    }

    if (eventType === 'subscription.create') {
      const customerEmail = (data?.customer?.email || '').trim().toLowerCase();
      const subscriptionCode = data?.subscription_code || null;
      const emailToken = data?.email_token || null;
      const nextPaymentDate = data?.next_payment_date || null;

      if (customerEmail) {
        const records = readRecords();
        let found = records.find((r) => r.email?.toLowerCase() === customerEmail);
        if (found) {
          if (subscriptionCode) found.paystack_subscription_code = subscriptionCode;
          if (emailToken) found.paystack_email_token = emailToken;
          if (nextPaymentDate) {
            found.next_payment_date = nextPaymentDate;
            found.subscription_end_date = nextPaymentDate;
          }
          if (found.subscription_status === 'none') {
            found.subscription_status = 'trial';
            found.trial_start_date = found.trial_start_date || nowIso;
            found.trial_end_date = nextPaymentDate || new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString();
          }
          found.updated_at = nowIso;
          writeRecords(records);
          await syncProfile(found);
        }
      }
      return res.status(200).json({ status: 'success', message: 'Subscription recorded' });
    }

    if (eventType === 'subscription.disable' || eventType === 'subscription.not_renew') {
      const customerEmail = (data?.customer?.email || data?.email || '').trim().toLowerCase();
      if (customerEmail) {
        const records = readRecords();
        const found = records.find((r) => r.email?.toLowerCase() === customerEmail);
        if (found) {
          found.subscription_status = 'cancelled';
          found.next_payment_date = null;
          found.cancelled_at = nowIso;
          found.updated_at = nowIso;
          writeRecords(records);
          await syncProfile(found);
        }
      }
      return res.status(200).json({ status: 'success', message: 'Subscription marked cancelled' });
    }

    return res.status(200).json({ status: 'success', received: true });
  } catch (err: any) {
    console.error('[Paystack Webhook Error]:', err);
    return res.status(500).json({ error: 'Webhook processing error', message: err?.message });
  }
}
