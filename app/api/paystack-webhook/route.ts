import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

function getSupabaseAdminClient() {
  const supabaseUrl = (
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    ''
  ).trim();
  const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

function verifyPaystackSignature(
  rawBody: string,
  signatureHeader: string | null,
  secretKey: string
): boolean {
  if (!signatureHeader || !secretKey) return false;
  const expectedHex = crypto.createHmac('sha512', secretKey).update(rawBody).digest('hex');
  const expectedBuf = Buffer.from(expectedHex, 'utf8');
  const receivedBuf = Buffer.from(signatureHeader.trim(), 'utf8');
  if (expectedBuf.length !== receivedBuf.length) {
    return false;
  }
  return crypto.timingSafeEqual(expectedBuf, receivedBuf);
}

export async function POST(req: Request): Promise<Response> {
  try {
    const secretKey = (process.env.PAYSTACK_SECRET_KEY || '').trim();
    if (!secretKey) {
      console.error('UNLOCK: Missing PAYSTACK_SECRET_KEY environment variable');
      return new Response('Server configuration error', { status: 500 });
    }

    const rawBody = await req.text();
    const signature = req.headers.get('x-paystack-signature');

    if (!verifyPaystackSignature(rawBody, signature, secretKey)) {
      console.warn('UNLOCK: Invalid Paystack webhook signature rejected');
      return new Response('Invalid signature', { status: 401 });
    }

    let event: any;
    try {
      event = JSON.parse(rawBody);
    } catch {
      return new Response('OK', { status: 200 });
    }

    if (event?.event === 'charge.success') {
      const data = event.data || {};
      const email = String(
        data?.customer?.email || data?.metadata?.email || data?.email || ''
      )
        .trim()
        .toLowerCase();
      const reference = String(data?.reference || '').trim();
      const amount = Number(data?.amount || 0);

      if (!email || !reference) {
        console.error('UNLOCK: charge.success missing email or reference', { email, reference, amount });
        return new Response('OK', { status: 200 });
      }

      const supabase = getSupabaseAdminClient();
      if (!supabase) {
        console.error(
          'UNLOCK: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment',
          { email, reference, amount }
        );
        return new Response('OK', { status: 200 });
      }

      const paidAt = new Date().toISOString();
      const unlockPayload = {
        is_paid: true,
        plan: 'trial',
        paystack_reference: reference,
        paid_at: paidAt
      };

      try {
        const { data: updatedRows, error: updateError } = await supabase
          .from('users')
          .update(unlockPayload)
          .eq('email', email)
          .select('email');

        if (updateError || !updatedRows || updatedRows.length === 0) {
          if (updateError) {
            console.warn('UNLOCK: users update failed or missing row, attempting insert:', {
              email,
              reference,
              message: updateError.message
            });
          }

          const { error: insertError } = await supabase.from('users').insert({
            email,
            ...unlockPayload
          });

          if (insertError) {
            console.error('UNLOCK: error inserting paid user into Supabase users table:', {
              email,
              reference,
              amount,
              error: insertError.message
            });
          } else {
            console.log('UNLOCK: success (inserted new paid user)', { email, reference, amount });
          }
        } else {
          console.log('UNLOCK: success (updated existing user)', { email, reference, amount });
        }

        // Optional sync: safely ignored if profiles table does not exist
        try {
          const trialEnd =
            data?.metadata?.start_date || new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString();
          await supabase
            .from('profiles')
            .upsert(
              {
                email,
                subscription_status: 'trial',
                trial_start_date: paidAt,
                trial_end_date: trialEnd,
                subscription_end_date: trialEnd,
                paystack_reference: reference,
                updated_at: paidAt
              },
              { onConflict: 'email' }
            );
        } catch {
          // Optional profiles table not required — never breaks webhook
        }
      } catch (dbErr: any) {
        console.error('UNLOCK: unexpected Supabase error during webhook unlock:', {
          email,
          reference,
          amount,
          error: dbErr?.message || String(dbErr)
        });
      }
    }

    return new Response('OK', { status: 200 });
  } catch (err: any) {
    console.error('UNLOCK: unhandled webhook error:', err?.message || err);
    return new Response('OK', { status: 200 });
  }
}
