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

export async function GET(req: Request): Promise<Response> {
  try {
    const url = new URL(req.url);
    const reference = (url.searchParams.get('reference') || url.searchParams.get('trxref') || '').trim();

    if (!reference || !/^[a-zA-Z0-9._-]+$/.test(reference)) {
      return Response.json(
        { status: false, message: 'Valid Paystack transaction reference is required.' },
        { status: 400 }
      );
    }

    const secretKey = (process.env.PAYSTACK_SECRET_KEY || '').trim();
    if (!secretKey) {
      return Response.json(
        { status: false, message: 'PAYSTACK_SECRET_KEY is not configured.' },
        { status: 500 }
      );
    }

    const paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${secretKey}`
        }
      }
    );

    const paystackJson: any = await paystackRes.json();

    // If Paystack confirms charge succeeded, persist unlock to Supabase users table
    if (paystackRes.ok && paystackJson?.status === true && paystackJson?.data?.status === 'success') {
      const email = String(
        paystackJson.data?.customer?.email || paystackJson.data?.metadata?.email || ''
      )
        .trim()
        .toLowerCase();

      const supabase = getSupabaseAdminClient();
      if (supabase && email) {
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
            await supabase.from('users').insert({ email, ...unlockPayload });
          }
          console.log('UNLOCK: verified payment via /api/verify-payment', { email, reference });
        } catch (err: any) {
          console.error('UNLOCK: verify-payment DB sync error:', err?.message || err);
        }
      }
    }

    return Response.json(paystackJson, { status: paystackRes.status });
  } catch (err: any) {
    console.error('[verify-payment Error]:', err?.message || err);
    return Response.json(
      { status: false, message: err?.message || 'Failed to verify Paystack payment.' },
      { status: 500 }
    );
  }
}
