# Nexovia Xitsonga Language Engine & Supabase Migration Blueprint

## 1. Executive Summary & Design Principles

Nexovia prioritizes controlled, verified native-speaker vocabulary to deliver high-quality educational assistance to South African learners.

### The Core Invariant
- **Verified Native Precedence**: When a verified native Xitsonga translation exists in the dataset, it is used verbatim.
- **Strict Anti-Hallucination Guardrail**: When a requested academic concept or phrase has no verified Xitsonga equivalent, the engine **never invents a translation**.
- **Transparent Status**: Unverified terms return `"Translation not yet verified."` or retain the English terminology in parentheses alongside a clear verification notice.
- **Dual-Language Accessibility**: Academic terms in mathematics and sciences always maintain their English counterpart in parentheses to prepare South African learners for national CAPS / DHET assessments.

---

## 2. Supabase Database Schema (PostgreSQL)

When ready to connect to Supabase, run the following SQL migration script in your Supabase SQL Editor:

```sql
-- ====================================================================
-- NEXOVIA LANGUAGE ENGINE: POSTGRESQL & SUPABASE RLS SCHEMA
-- PHASE 1 & 2: CONTROLLED VOCABULARY, VERIFIED PRONUNCIATION & AUDIO
-- ====================================================================

-- 1. Create Enums
CREATE TYPE language_status_enum AS ENUM (
  'verified',
  'needs_verification',
  'ai_generated',
  'unverified'
);

CREATE TYPE audio_status_enum AS ENUM (
  'unavailable',
  'pending_verification',
  'verified'
);

CREATE TYPE pronunciation_status_enum AS ENUM (
  'unavailable',
  'pending_verification',
  'verified'
);

CREATE TYPE voice_source_enum AS ENUM (
  'native_speaker',
  'curriculum_specialist',
  'ai_generated',
  'unspecified'
);

-- 2. Language Entries Table (Phase 1 + Phase 2 Extended)
CREATE TABLE public.language_records (
  id TEXT PRIMARY KEY,
  language TEXT NOT NULL DEFAULT 'xhitsonga',
  english TEXT NOT NULL,
  xitsonga TEXT NOT NULL DEFAULT '',
  pronunciation TEXT DEFAULT '',
  category TEXT NOT NULL DEFAULT 'basic',
  status language_status_enum NOT NULL DEFAULT 'needs_verification',
  source TEXT NOT NULL DEFAULT 'native_user_verified',
  example TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  
  -- Phase 2 Audio & Pronunciation Fields
  audio_url TEXT,
  audio_status audio_status_enum NOT NULL DEFAULT 'unavailable',
  pronunciation_status pronunciation_status_enum NOT NULL DEFAULT 'unavailable',
  voice_source voice_source_enum DEFAULT 'native_speaker',
  verified_by TEXT,
  verified_at TIMESTAMPTZ,
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indices for rapid lookup
CREATE INDEX idx_lang_records_english ON public.language_records (LOWER(english));
CREATE INDEX idx_lang_records_xitsonga ON public.language_records (LOWER(xitsonga));
CREATE INDEX idx_lang_records_status ON public.language_records (status);
CREATE INDEX idx_lang_records_category ON public.language_records (category);
CREATE INDEX idx_lang_records_audio ON public.language_records (audio_status);
CREATE INDEX idx_lang_records_pronunciation ON public.language_records (pronunciation_status);

-- 3. Audit History Table
CREATE TABLE public.language_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phrase_id TEXT NOT NULL REFERENCES public.language_records(id) ON DELETE CASCADE,
  action TEXT NOT NULL, -- 'created', 'updated', 'verified', 'marked_for_review', 'audio_uploaded', 'audio_verified', 'audio_deleted'
  changed_by TEXT NOT NULL,
  previous_data JSONB,
  new_data JSONB NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Learner Practice Attempts Table (Phase 2 Foundation)
CREATE TABLE public.language_practice_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phrase_id TEXT NOT NULL REFERENCES public.language_records(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  recording_storage_path TEXT,
  duration_seconds NUMERIC,
  status TEXT NOT NULL DEFAULT 'submitted_for_review',
  educator_feedback TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Supabase Storage Buckets Setup
-- Insert storage buckets into Supabase Storage
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('xitsonga-audio-recordings', 'xitsonga-audio-recordings', true),
  ('xitsonga-learner-practice', 'xitsonga-learner-practice', false)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Public Read for verified native audio recordings
CREATE POLICY "Public Read Access for Native Recordings"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'xitsonga-audio-recordings');

-- Storage RLS: Only Admins can upload, replace, or delete verified recordings
CREATE POLICY "Admin Upload Access for Native Recordings"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'xitsonga-audio-recordings'
  AND (
    (auth.jwt() ->> 'role') IN ('ADMIN', 'SUPER_ADMIN', 'CURRICULUM_ADMIN')
    OR (auth.jwt() -> 'user_metadata' ->> 'role') IN ('ADMIN', 'SUPER_ADMIN', 'CURRICULUM_ADMIN')
  )
);

CREATE POLICY "Admin Delete Access for Native Recordings"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'xitsonga-audio-recordings'
  AND (
    (auth.jwt() ->> 'role') IN ('ADMIN', 'SUPER_ADMIN', 'CURRICULUM_ADMIN')
    OR (auth.jwt() -> 'user_metadata' ->> 'role') IN ('ADMIN', 'SUPER_ADMIN', 'CURRICULUM_ADMIN')
  )
);

-- Storage RLS: Learners can upload their own practice audio
CREATE POLICY "Learner Practice Audio Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'xitsonga-learner-practice'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.language_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.language_audit_logs ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies

-- Public Read Policy: All authenticated users and anonymous learners can query verified phrases
CREATE POLICY "Public Read Access for Language Records"
ON public.language_records
FOR SELECT
TO authenticated, anon
USING (true);

-- Admin Mutation Policy: Only curriculum administrators can insert/update/verify phrases
CREATE POLICY "Admin Write Access for Language Records"
ON public.language_records
FOR ALL
TO authenticated
USING (
  (auth.jwt() ->> 'role') IN ('ADMIN', 'SUPER_ADMIN', 'CURRICULUM_ADMIN')
  OR (auth.jwt() -> 'user_metadata' ->> 'role') IN ('ADMIN', 'SUPER_ADMIN', 'CURRICULUM_ADMIN')
)
WITH CHECK (
  (auth.jwt() ->> 'role') IN ('ADMIN', 'SUPER_ADMIN', 'CURRICULUM_ADMIN')
  OR (auth.jwt() -> 'user_metadata' ->> 'role') IN ('ADMIN', 'SUPER_ADMIN', 'CURRICULUM_ADMIN')
);

-- Admin Audit Read Policy: Only administrators can read audit history
CREATE POLICY "Admin Read Access for Audit Logs"
ON public.language_audit_logs
FOR SELECT
TO authenticated
USING (
  (auth.jwt() ->> 'role') IN ('ADMIN', 'SUPER_ADMIN', 'CURRICULUM_ADMIN')
);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_language_record_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  NEW.version = OLD.version + 1;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_language_record
BEFORE UPDATE ON public.language_records
FOR EACH ROW
EXECUTE FUNCTION update_language_record_timestamp();
```

---

## 3. How to Connect to Supabase

1. Add environment variables to `.env`:
   ```bash
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=eyJhbGci...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
   ```

2. Seed initial 140 dataset records using the built-in initial dataset:
   ```ts
   import { createClient } from '@supabase/supabase-js';
   import { INITIAL_XITSONGA_DATASET } from '../src/data/xitsongaLanguageData';

   const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

   export async function seedXitsongaDataset() {
     const records = INITIAL_XITSONGA_DATASET.map(item => ({
       id: item.id,
       language: item.language,
       english: item.english,
       xitsonga: item.xitsonga,
       pronunciation: item.pronunciation,
       category: item.category,
       status: item.status,
       source: item.source,
       example: item.example,
       notes: item.notes,
       version: 1,
       created_at: item.createdAt,
       updated_at: item.updatedAt
     }));

     const { error } = await supabase.from('language_records').upsert(records);
     if (error) console.error('Seeding error:', error);
     else console.log('Successfully seeded Xitsonga dataset to Supabase!');
   }
   ```

3. Update `server/languageEngine.ts` to query `supabase` with fallback to in-memory/cache.

---

## 4. Current Endpoints in Nexovia

- `GET /api/languages/xitsonga/phrases` (filter by `category`, `status`, `query`)
- `GET /api/languages/xitsonga/phrases/:id` (fetch single phrase)
- `POST /api/languages/xitsonga/lookup` (returns exact match, status, and verification badges)
- `GET /api/languages/xitsonga/translate?text=...` (retrieves verified translation or "Translation not yet verified.")
- `POST /api/languages/xitsonga/translate` (body: `{ text: "..." }`)
- `GET /api/languages/xitsonga/stats` (verified counts, total records, category distribution)
- `POST /api/languages/xitsonga/admin/phrases` (Admin role required)
- `PUT /api/languages/xitsonga/admin/phrases/:id` (Admin role required)
- `GET /api/languages/xitsonga/admin/audit` (Admin role required)
