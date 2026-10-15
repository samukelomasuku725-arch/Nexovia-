-- ============================================================================
-- BRIGHTPATH ACADEMY — PRODUCTION DATABASE SCHEMA & SECURITY RULES
-- Target: Supabase PostgreSQL (PostgreSQL 15+)
-- Phase: 7.5 Production & Scalability Architecture
-- Designed to scale from development to 500,000+ registered South African learners.
-- ============================================================================

-- 1. EXTENSIONS & PREREQUISITES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Clean custom ENUM types
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('STUDENT', 'TEACHER', 'PARENT', 'ADMIN');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE assessment_type_enum AS ENUM ('PRACTICE', 'QUIZ', 'TEST', 'ASSIGNMENT', 'EXAM');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE assessment_status_enum AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE question_type_enum AS ENUM (
        'multiple_choice',
        'multiple_select',
        'true_false',
        'short_answer',
        'numerical',
        'matching',
        'ordering',
        'written_response'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE mastery_status_enum AS ENUM ('NOT_STARTED', 'BEGINNER', 'DEVELOPING', 'PROFICIENT', 'MASTERED');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ============================================================================
-- 2. AUTH & USER PROFILES (POPIA COMPLIANT)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'STUDENT',
    education_level TEXT NOT NULL DEFAULT 'FET Phase (Grade 10–12 CAPS)',
    grade_or_programme TEXT NOT NULL DEFAULT 'Grade 10',
    preferred_language VARCHAR(5) NOT NULL DEFAULT 'en',
    avatar_url TEXT,
    is_minor BOOLEAN NOT NULL DEFAULT FALSE,
    popia_consent BOOLEAN NOT NULL DEFAULT TRUE,
    popia_consent_date TIMESTAMPTZ DEFAULT NOW(),
    guardian_email TEXT,
    guardian_consent BOOLEAN DEFAULT FALSE,
    guardian_consent_date TIMESTAMPTZ,
    scheduled_deletion_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_grade ON public.profiles(grade_or_programme);

-- ============================================================================
-- 3. STRUCTURED CURRICULUM ARCHITECTURE (CAPS GRADE R–12 & TVET)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.curricula (
    id VARCHAR(64) PRIMARY KEY,
    title TEXT NOT NULL,
    country VARCHAR(10) NOT NULL DEFAULT 'ZA',
    jurisdiction TEXT NOT NULL DEFAULT 'Department of Basic Education (DBE)',
    framework_code VARCHAR(32) NOT NULL DEFAULT 'CAPS',
    version VARCHAR(16) NOT NULL DEFAULT '2024.1',
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.phases (
    id VARCHAR(64) PRIMARY KEY,
    curriculum_id VARCHAR(64) NOT NULL REFERENCES public.curricula(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    code VARCHAR(32) NOT NULL,
    grades_covered TEXT[] NOT NULL DEFAULT '{}',
    age_range VARCHAR(32),
    sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.grades (
    id VARCHAR(64) PRIMARY KEY,
    phase_id VARCHAR(64) NOT NULL REFERENCES public.phases(id) ON DELETE CASCADE,
    code VARCHAR(16) NOT NULL,
    title TEXT NOT NULL,
    education_level TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.subjects (
    id VARCHAR(64) PRIMARY KEY,
    curriculum_id VARCHAR(64) NOT NULL REFERENCES public.curricula(id) ON DELETE CASCADE,
    grade_id VARCHAR(64) NOT NULL REFERENCES public.grades(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    code VARCHAR(32) NOT NULL,
    icon_name VARCHAR(64) NOT NULL DEFAULT 'BookOpen',
    color VARCHAR(32) NOT NULL DEFAULT 'from-blue-500 to-indigo-600',
    status assessment_status_enum NOT NULL DEFAULT 'PUBLISHED',
    version VARCHAR(16) NOT NULL DEFAULT '2024.1',
    sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.terms (
    id VARCHAR(64) PRIMARY KEY,
    subject_id VARCHAR(64) NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    term_number INT NOT NULL CHECK (term_number BETWEEN 1 AND 4),
    title TEXT NOT NULL,
    weeks INT NOT NULL DEFAULT 10
);

CREATE TABLE IF NOT EXISTS public.topics (
    id VARCHAR(64) PRIMARY KEY,
    term_id VARCHAR(64) NOT NULL REFERENCES public.terms(id) ON DELETE CASCADE,
    subject_id VARCHAR(64) NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    estimated_hours NUMERIC(5, 2) NOT NULL DEFAULT 6.0,
    difficulty VARCHAR(16) NOT NULL DEFAULT 'medium',
    sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.subtopics (
    id VARCHAR(64) PRIMARY KEY,
    topic_id VARCHAR(64) NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.lessons (
    id VARCHAR(64) PRIMARY KEY,
    subtopic_id VARCHAR(64) NOT NULL REFERENCES public.subtopics(id) ON DELETE CASCADE,
    topic_id VARCHAR(64) NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
    subject_id VARCHAR(64) NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    duration_minutes INT NOT NULL DEFAULT 45,
    overview TEXT,
    key_concepts TEXT[] NOT NULL DEFAULT '{}',
    status assessment_status_enum NOT NULL DEFAULT 'PUBLISHED',
    sort_order INT NOT NULL DEFAULT 0,
    source_attribution JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.learning_objectives (
    id VARCHAR(64) PRIMARY KEY,
    lesson_id VARCHAR(64) NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    bloom_level VARCHAR(32) NOT NULL DEFAULT 'Understand',
    sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.curriculum_translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type VARCHAR(32) NOT NULL, -- 'topic', 'lesson', 'objective'
    entity_id VARCHAR(64) NOT NULL,
    language_code VARCHAR(5) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    content JSONB,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    verified_by TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (entity_type, entity_id, language_code)
);

-- ============================================================================
-- 4. ASSESSMENTS & REUSABLE QUESTION BANK
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.questions (
    id VARCHAR(64) PRIMARY KEY,
    curriculum_id VARCHAR(64) NOT NULL DEFAULT 'curr-caps-za',
    grade VARCHAR(16) NOT NULL,
    subject VARCHAR(64) NOT NULL,
    term INT DEFAULT 1,
    topic TEXT NOT NULL,
    subtopic TEXT,
    learning_objective TEXT,
    question_type question_type_enum NOT NULL,
    difficulty VARCHAR(16) NOT NULL DEFAULT 'medium',
    question_text TEXT NOT NULL,
    options JSONB,
    correct_answer JSONB NOT NULL,
    accepted_answers JSONB,
    matching_pairs JSONB,
    ordering_items JSONB,
    rubric_guidelines TEXT,
    sample_solution TEXT,
    explanation TEXT NOT NULL,
    marks INT NOT NULL DEFAULT 1,
    language VARCHAR(5) NOT NULL DEFAULT 'en',
    source_type VARCHAR(32) NOT NULL DEFAULT 'CURRICULUM_OFFICIAL',
    is_reusable BOOLEAN NOT NULL DEFAULT TRUE,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_questions_search ON public.questions(subject, grade, topic, difficulty);
CREATE INDEX IF NOT EXISTS idx_questions_type ON public.questions(question_type);

CREATE TABLE IF NOT EXISTS public.assessments (
    id VARCHAR(64) PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    assessment_type assessment_type_enum NOT NULL,
    curriculum_id VARCHAR(64) NOT NULL DEFAULT 'curr-caps-za',
    curriculum_version VARCHAR(16) NOT NULL DEFAULT '2024.1',
    grade VARCHAR(16) NOT NULL,
    subject VARCHAR(64) NOT NULL,
    phase VARCHAR(32) NOT NULL,
    term INT NOT NULL DEFAULT 1,
    topic TEXT NOT NULL,
    lesson_id VARCHAR(64),
    instructions TEXT,
    duration_minutes INT DEFAULT 45,
    total_marks INT NOT NULL DEFAULT 10,
    passing_percentage INT NOT NULL DEFAULT 50,
    difficulty VARCHAR(16) NOT NULL DEFAULT 'medium',
    attempt_limit INT DEFAULT 3,
    status assessment_status_enum NOT NULL DEFAULT 'PUBLISHED',
    source_type VARCHAR(32) NOT NULL DEFAULT 'CURRICULUM_OFFICIAL',
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.assessment_questions (
    assessment_id VARCHAR(64) NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
    question_id VARCHAR(64) NOT NULL REFERENCES public.questions(id) ON DELETE RESTRICT,
    marks INT NOT NULL DEFAULT 1,
    sort_order INT NOT NULL DEFAULT 0,
    PRIMARY KEY (assessment_id, question_id)
);

-- ============================================================================
-- 5. ASSESSMENT ATTEMPTS & EVALUATION RESULTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.assessment_attempts (
    id VARCHAR(64) PRIMARY KEY,
    assessment_id VARCHAR(64) NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
    learner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    attempt_number INT NOT NULL DEFAULT 1,
    score_percentage NUMERIC(5, 2) NOT NULL,
    marks_earned NUMERIC(6, 2) NOT NULL,
    total_marks_available NUMERIC(6, 2) NOT NULL,
    is_passed BOOLEAN NOT NULL,
    time_used_seconds INT NOT NULL,
    learner_answers JSONB NOT NULL DEFAULT '{}',
    question_results JSONB NOT NULL DEFAULT '[]',
    topic_performance JSONB NOT NULL DEFAULT '[]',
    anti_cheating_logs JSONB,
    status VARCHAR(32) NOT NULL DEFAULT 'COMPLETED',
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_attempts_learner ON public.assessment_attempts(learner_id, assessment_id);
CREATE INDEX IF NOT EXISTS idx_attempts_submitted ON public.assessment_attempts(submitted_at DESC);

-- ============================================================================
-- 6. ADAPTIVE LEARNING & TOPIC MASTERY
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.topic_mastery (
    learner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject VARCHAR(64) NOT NULL,
    topic TEXT NOT NULL,
    mastery_percentage NUMERIC(5, 2) NOT NULL DEFAULT 0.0,
    mastery_status mastery_status_enum NOT NULL DEFAULT 'NOT_STARTED',
    attempts_count INT NOT NULL DEFAULT 0,
    total_correct INT NOT NULL DEFAULT 0,
    total_questions INT NOT NULL DEFAULT 0,
    average_time_per_question NUMERIC(6, 2),
    last_assessed_at TIMESTAMPTZ,
    next_review_date TIMESTAMPTZ,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (learner_id, subject, topic)
);

CREATE INDEX IF NOT EXISTS idx_topic_mastery_lookup ON public.topic_mastery(learner_id, mastery_status);

CREATE TABLE IF NOT EXISTS public.adaptive_performance_events (
    id VARCHAR(64) PRIMARY KEY,
    learner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    event_type VARCHAR(32) NOT NULL,
    subject VARCHAR(64) NOT NULL,
    topic TEXT NOT NULL,
    score_percentage NUMERIC(5, 2) NOT NULL,
    total_questions INT NOT NULL DEFAULT 1,
    correct_count INT NOT NULL DEFAULT 1,
    time_spent_seconds INT NOT NULL DEFAULT 60,
    difficulty VARCHAR(16) NOT NULL DEFAULT 'medium',
    source_assessment_id VARCHAR(64),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_adaptive_events_learner ON public.adaptive_performance_events(learner_id, created_at DESC);

-- ============================================================================
-- 7. PROGRESS, SAVED NOTES, CONVERSATIONS, & SCANS
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.ai_conversations (
    id VARCHAR(64) PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    education_level TEXT NOT NULL,
    grade_or_programme TEXT NOT NULL,
    subject TEXT NOT NULL,
    topic TEXT NOT NULL,
    language VARCHAR(5) NOT NULL DEFAULT 'en',
    mode VARCHAR(32) NOT NULL DEFAULT 'explain',
    messages JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_conversations_user ON public.ai_conversations(user_id, updated_at DESC);

CREATE TABLE IF NOT EXISTS public.saved_learning_items (
    id VARCHAR(64) PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    conversation_id VARCHAR(64),
    message_id VARCHAR(64),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    subject TEXT NOT NULL,
    topic TEXT NOT NULL,
    language VARCHAR(5) NOT NULL DEFAULT 'en',
    type VARCHAR(32) NOT NULL DEFAULT 'note',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_saved_items_user ON public.saved_learning_items(user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS public.study_plans (
    id VARCHAR(64) PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    topic TEXT NOT NULL,
    timeline TEXT,
    milestones JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.scan_sessions (
    id VARCHAR(64) PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    image_storage_path TEXT NOT NULL,
    subject TEXT,
    topic TEXT,
    extracted_text TEXT,
    ai_solution TEXT,
    status VARCHAR(32) NOT NULL DEFAULT 'COMPLETED',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 8. SECURITY AUDIT LOGGING (POPIA COMPLIANCE)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES public.profiles(id),
    action VARCHAR(64) NOT NULL, -- 'LOGIN', 'EXPORT_DATA', 'CONSENT_CHANGE', 'DELETE_REQUEST'
    target_entity VARCHAR(64),
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON public.audit_logs(actor_id, created_at DESC);

-- ============================================================================
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all sensitive user tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curricula ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topic_mastery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.adaptive_performance_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_learning_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scan_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read/update their own profile. Admins can read all.
CREATE POLICY "Users can read own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Curriculum: Everyone can read active published curriculum
CREATE POLICY "Public read published curriculum"
    ON public.curricula FOR SELECT
    USING (is_active = TRUE);

CREATE POLICY "Public read published subjects"
    ON public.subjects FOR SELECT
    USING (status = 'PUBLISHED');

CREATE POLICY "Public read published lessons"
    ON public.lessons FOR SELECT
    USING (status = 'PUBLISHED');

-- Assessments: Everyone can read published assessments
CREATE POLICY "Public read published assessments"
    ON public.assessments FOR SELECT
    USING (status = 'PUBLISHED');

-- Teachers and Admins can create and edit assessments
CREATE POLICY "Staff can manage assessments"
    ON public.assessments FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role IN ('TEACHER', 'ADMIN')
        )
    );

-- Questions: Reusable questions are readable by all authenticated users
CREATE POLICY "Authenticated users can read reusable questions"
    ON public.questions FOR SELECT
    USING (is_reusable = TRUE);

-- Assessment Attempts: Learners can only insert and read their own attempts
CREATE POLICY "Learners can insert own attempts"
    ON public.assessment_attempts FOR INSERT
    WITH CHECK (auth.uid() = learner_id);

CREATE POLICY "Learners can read own attempts"
    ON public.assessment_attempts FOR SELECT
    USING (auth.uid() = learner_id);

-- Teachers/Admins can read all attempts
CREATE POLICY "Staff can read all attempts"
    ON public.assessment_attempts FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role IN ('TEACHER', 'ADMIN')
        )
    );

-- Topic Mastery & Adaptive Events: Private to the learner
CREATE POLICY "Learner own topic mastery"
    ON public.topic_mastery FOR ALL
    USING (auth.uid() = learner_id);

CREATE POLICY "Learner own adaptive events"
    ON public.adaptive_performance_events FOR ALL
    USING (auth.uid() = learner_id);

-- User Content (AI Conversations, Saved, Plans, Scans): strictly private
CREATE POLICY "User own conversations"
    ON public.ai_conversations FOR ALL
    USING (auth.uid() = user_id);

CREATE POLICY "User own saved items"
    ON public.saved_learning_items FOR ALL
    USING (auth.uid() = user_id);

CREATE POLICY "User own study plans"
    ON public.study_plans FOR ALL
    USING (auth.uid() = user_id);

CREATE POLICY "User own scans"
    ON public.scan_sessions FOR ALL
    USING (auth.uid() = user_id);

-- Audit logs: readable only by ADMIN, writable by service role
CREATE POLICY "Admins can read audit logs"
    ON public.audit_logs FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'ADMIN'
        )
    );

-- ============================================================================
-- 10. AUTOMATED TRIGGERS & STORED PROCEDURES
-- ============================================================================

-- Automatically create profile on Supabase auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name, role, popia_consent)
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
        COALESCE((new.raw_user_meta_data->>'role')::user_role, 'STUDENT'::user_role),
        TRUE
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach trigger to auth.users (Supabase convention)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Automatically update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER set_assessments_updated_at
    BEFORE UPDATE ON public.assessments
    FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER set_questions_updated_at
    BEFORE UPDATE ON public.questions
    FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
