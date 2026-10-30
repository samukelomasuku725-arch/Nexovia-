/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * NEXOVIA Language Engine - Multilingual Architecture
 */

export type LanguageEntryStatus = 'verified' | 'needs_verification' | 'ai_generated' | 'unverified';

export type AudioStatus = 'unavailable' | 'pending_verification' | 'verified';
export type PronunciationStatus = 'unavailable' | 'pending_verification' | 'verified';
export type VoiceSource = 'native_speaker' | 'ai_generated' | 'curriculum_specialist' | 'unspecified';

export type LanguageEntryCategory =
  | 'basic_language'
  | 'classroom'
  | 'learning_instructions'
  | 'tutor_conversation'
  | 'encouragement'
  | 'mathematics'
  | 'mathematics_sentences'
  | 'ai_tutor'
  | 'everyday_conversation'
  | 'understanding_questions'
  | 'problem_solving'
  | 'explaining_concepts'
  | 'basic'
  | 'instructions'
  | 'conversation'
  | 'tutor'
  | 'everyday'
  | string;

export interface TranslationResult {
  found: boolean;
  status: 'verified' | 'needs_verification' | 'ai_generated';
  translation: string | null;
  message: string;
  entry?: LanguageRecord;
}

export interface LanguageRecord {
  id: string;
  language: string; // e.g., 'xhitsonga' or 'xitsonga'
  english: string;
  xitsonga: string;
  pronunciation: string; // Left empty until verified audio/phonetic info is available
  category: LanguageEntryCategory | string;
  status: LanguageEntryStatus;
  source: string; // e.g. 'native_user_verified', 'pending_verification'
  example: string;
  notes: string;
  audioUrl?: string; // Audio recording URL (MP3, WAV, M4A)
  audioStatus?: AudioStatus; // 'unavailable' | 'pending_verification' | 'verified'
  pronunciationStatus?: PronunciationStatus; // 'unavailable' | 'pending_verification' | 'verified'
  voiceSource?: VoiceSource; // 'native_speaker' | 'ai_generated' | 'curriculum_specialist'
  verifiedBy?: string;
  verifiedAt?: string;
  createdAt: string;
  updatedAt: string;
  version?: number;
}

export interface LanguageAuditLog {
  id: string;
  phraseId: string;
  action: 'created' | 'updated' | 'verified' | 'marked_for_review' | 'audio_uploaded' | 'audio_verified' | 'audio_deleted';
  changedBy: string;
  previousData?: Partial<LanguageRecord>;
  newData: Partial<LanguageRecord>;
  timestamp: string;
  reason?: string;
}

export type PhraseVerificationBadge =
  | 'VERIFIED XITSONGA'
  | 'NEEDS VERIFICATION'
  | 'AI-GENERATED / UNVERIFIED';

export interface LanguageLookupResult {
  found: boolean;
  matchType: 'exact' | 'normalized' | 'fuzzy' | 'none';
  entry?: LanguageRecord;
  english: string;
  xitsonga: string | null;
  badge: PhraseVerificationBadge;
  pronunciation: string;
  status: LanguageEntryStatus;
  source: string;
  audioUrl?: string;
  audioStatus?: AudioStatus;
  pronunciationStatus?: PronunciationStatus;
  voiceSource?: VoiceSource;
  requiresVerificationNotice: boolean;
}

export interface LanguageEngineStats {
  totalPhrases: number;
  verifiedCount: number;
  needsVerificationCount: number;
  verifiedAudioCount?: number;
  verifiedPronunciationCount?: number;
  categoriesCount: number;
  language: string;
  lastUpdated: string;
}

export interface PronunciationPracticeAttempt {
  id: string;
  phraseId: string;
  audioBlobUrl?: string;
  mimeType?: string;
  durationSeconds?: number;
  timestamp: string;
  status: 'recorded' | 'submitted_for_review' | 'reviewed';
  notes?: string;
}
