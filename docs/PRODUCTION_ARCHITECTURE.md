# Nexovia Academy — Production & Scalability Architecture

## Executive Summary
This document outlines the production architecture, security engineering, data privacy compliance, and scalability blueprint for **Nexovia Academy**, designed to scale from the current development preview to **500,000+ registered South African learners**.

---

## 1. System Architecture Overview

```
                      [ Learner Web / Android PWA ]
                                   │
                                   ▼
                       [ CDN & Edge Caching ]
                       (Cloudflare / Fastly)
                                   │
              ┌────────────────────┴────────────────────┐
              ▼                                         ▼
    [ Static UI Assets & SPA ]             [ Secure Edge Proxy / Node API ]
    - Vite React 19 Bundle                 - Express / Fastify / Supabase Edge
    - Service Worker Cache (Workbox)       - Correlation IDs & Auth Verification
    - Local / IndexedDB Fallbacks          - Rate Limiting & Input Sanitization
                                                        │
              ┌─────────────────────────────────────────┼─────────────────────────┐
              ▼                                         ▼                         ▼
   [ Supabase Auth & RLS ]                 [ Scalable Supabase DB ]       [ Asynchronous Worker ]
   - JWT Verification                      - PostgreSQL 15+ Cluster       - Background Job Queue
   - RBAC (Student, Teacher, Admin)        - Read Replicas & Supavisor    - Batch Marking & Reports
   - POPIA Minor Protections               - Automated Partitioning       - Asynchronous AI Tasks
              │                                         │
              ▼                                         ▼
   [ Supabase Storage ]                    [ AI Service Provider ]
   - /avatars (Public)                     - Gemini 3.8 Flash API
   - /scans (Private/Signed)               - Socratic Voice & Vision
   - /attachments (Private)                - STT & TTS Pipeline
```

---

## 2. Centralized Data Access Layer (DAL)

The frontend does not query databases directly. All UI components interact through clean, typed repository contracts in `src/repositories/`:

| Repository Interface | Responsibilities | Production Adapter |
|---|---|---|
| `ICurriculumRepository` | Hierarchy (Grade R–12), subjects, terms, lessons, learning objectives, multi-language search. | `CurriculumRepository` (Supabase Postgres + CDN cache) |
| `IAssessmentRepository` | Question bank filtering, assessment authoring, authoritative server-side marking, attempt history. | `AssessmentRepository` (Supabase Postgres + Edge functions) |
| `ILearnerProgressRepository` | Topic mastery calculations, performance event logging, adaptive next-best-lesson recommendations. | `LearnerProgressRepository` (Postgres + Supabase Realtime) |
| `IProfileRepository` | User account lifecycle, POPIA consent tracking, DSAR data export, scheduled account deletion. | `ProfileRepository` (Supabase Auth & Profiles table) |
| `IAIConversationRepository` | Socratic AI chat logs, persistent notes, study plan milestones, scan sessions. | `AIConversationRepository` (Supabase Postgres) |
| `IStorageService` | Uploading and signed-URL retrieval for camera scans, written homework photos, and avatar images. | `StorageService` (Supabase Storage) |
| `ICacheService` | Stale-while-revalidate TTL caching for curriculum structures and assessment templates. | `CacheService` (In-memory / Redis / Edge KV) |

---

## 3. Supabase-Ready Relational Database Design

The complete SQL schema is maintained in `supabase/migrations/20261005000000_production_schema.sql`.

### Key Relational Entities:
1. **`profiles`**: Linked directly to `auth.users(id)` via Foreign Key Cascade. Encapsulates POPIA consent timestamp, minor status flag, guardian email, and role.
2. **Curriculum Tables**: `curricula`, `phases`, `grades`, `subjects`, `terms`, `topics`, `subtopics`, `lessons`, `learning_objectives`, `curriculum_translations`.
3. **Assessments & Question Bank**: `questions` (8 supported question types), `assessments`, `assessment_questions`.
4. **Authoritative Attempts**: `assessment_attempts` storing full score percentage, rubric evaluations, anti-cheating signals (blur count, tab switches), and question-level feedback.
5. **Adaptive Learning**: `topic_mastery` storing current percentage and mastery status (`NOT_STARTED`, `BEGINNER`, `DEVELOPING`, `PROFICIENT`, `MASTERED`), and `adaptive_performance_events`.
6. **Audit & Compliance**: `audit_logs` tracking sensitive operations with actor UUID, action type, IP address, and timestamp.

### Row Level Security (RLS) Strategy:
- **Learners**: Strictly isolated. A learner can only read published curriculum and questions, and can only read/insert their own attempts, notes, and profile.
- **Teachers / Staff**: Authorized to draft curriculum, create question items, review assessment submissions, and grade written responses.
- **Administrators**: Full system visibility and audit log inspection.

---

## 4. Scalability Target: 500,000 Registered Learners

To scale efficiently to 500,000 registered users in South Africa:

1. **Connection Pooling & Supavisor**:
   - PostgreSQL connections must be pooled using Supabase Supavisor / pgBouncer in transaction mode to prevent connection exhaustion during peak school hours (08:00–16:00 SAST).
2. **Aggressive CDN Caching for Curriculum**:
   - CAPS curriculum metadata (Grade R–12) is static or versioned quarterly. Edge CDN nodes cache curriculum JSON with `Cache-Control: public, max-age=86400, stale-while-revalidate=604800`.
3. **Asynchronous Batch Processing (`server/jobsQueue.ts`)**:
   - Heavy tasks such as batch assessment grading, multi-week study plan generation, and POPIA data exports run in the background queue rather than blocking HTTP request threads.
4. **Data Partitioning**:
   - `adaptive_performance_events` and `audit_logs` should be range-partitioned by month (`created_at`) when table size exceeds 10 million rows.
5. **Mobile-First Data Economy**:
   - South African learners frequently operate under mobile data constraints. Images are WebP/AVIF compressed, API payloads are trimmed, and PWA caches assets locally.

---

## 5. Security & POPIA / Minor Protection Compliance

Nexovia complies with the **Protection of Personal Information Act (POPIA Act No. 4 of 2013)** and Section 34 (General Prohibition on Processing Personal Information of Children):

- **Explicit Consent**: Stored in `profiles.popia_consent` with exact timestamp.
- **Minor Oversight**: When a learner is under 18 (`is_minor = true`), guardian notification and email consent linking are enforced.
- **Data Subject Access Request (DSAR)**: Learners can download their full JSON personal data archive at `/api/privacy/export`.
- **Right to Erasure (Section 24)**: Users can initiate an account deletion request with a mandatory 30-day statutory grace period at `/api/privacy/delete-account`.
- **Zero Secrets on Client**: API keys and database credentials reside exclusively on the server or in edge environment variables.

---

## 6. Migration Guide to Live Supabase

When transitioning from the development environment to a live Supabase project:

1. Create a Supabase project in the desired cloud region (e.g., `af-south-1` or `eu-west-1`).
2. Run the migration script:
   ```bash
   supabase db push
   # or execute supabase/migrations/20261005000000_production_schema.sql via SQL Editor
   ```
3. Configure environment variables in `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   GEMINI_API_KEY=your-gemini-api-key
   ```
4. Configure Supabase Storage buckets:
   - `avatars` (Public read, Authenticated write)
   - `scans` (Private, Signed URLs only)
   - `attachments` (Private, Signed URLs only)
   - `exports` (Private, 24-hour expiry)
