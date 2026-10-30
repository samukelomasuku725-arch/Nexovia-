-- NEXOVIAN ANTI-FREE-TRIAL ABUSE SCHEMA
-- Table: used_trial_emails

CREATE TABLE IF NOT EXISTS public.used_trial_emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  phone_number TEXT,
  device_id TEXT,
  status TEXT DEFAULT 'TRIAL_USED', -- 'TRIAL_USED' | 'PAID_USER'
  trial_started_at TIMESTAMPTZ DEFAULT now(),
  paid_at TIMESTAMPTZ,
  paystack_reference TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index on email and device_id for fast lookup
CREATE INDEX IF NOT EXISTS idx_used_trial_emails_email ON public.used_trial_emails(email);
CREATE INDEX IF NOT EXISTS idx_used_trial_emails_device_id ON public.used_trial_emails(device_id);
CREATE INDEX IF NOT EXISTS idx_used_trial_emails_status ON public.used_trial_emails(status);

-- Enable RLS
ALTER TABLE public.used_trial_emails ENABLE ROW LEVEL SECURITY;

-- Allow anon read & upsert for anti-abuse checks
CREATE POLICY "Allow anon select on used_trial_emails" ON public.used_trial_emails
  FOR SELECT USING (true);

CREATE POLICY "Allow anon insert/update on used_trial_emails" ON public.used_trial_emails
  FOR ALL USING (true) WITH CHECK (true);
