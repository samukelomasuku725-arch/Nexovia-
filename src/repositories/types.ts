/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIA - DATA ACCESS LAYER (REPOSITORY INTERFACES)
 * 
 * Provides an abstract, decoupled boundary between UI components and backend storage.
 * Supports:
 * - Development: In-memory / localStorage / Express REST proxy
 * - Production: Supabase PostgreSQL (REST & Realtime), Supabase Auth, Supabase Storage
 */

import {
  UserProfile,
  UserRole,
  UserProgress,
  AIConversation,
  SavedLearningItem,
  ScanSession,
  PaginatedResult,
  PaginationParams,
  SALanguageCode
} from '../types';
import {
  CurriculumMetadata,
  SubjectModel,
  GradeLevelConfig,
  EducationPhaseConfig,
  CurriculumLessonModel,
  CurriculumSearchQuery,
  CurriculumSearchResult
} from '../types/curriculum';
import {
  AssessmentModel,
  AssessmentAttempt,
  QuestionModel,
  QuestionBankFilter,
  LearnerAnswerValue
} from '../types/assessment';
import {
  AdaptiveProfile,
  LearnerPerformanceEvent,
  MasteryThresholds
} from '../types/adaptive';

// ---------------------------------------------------------------------------
// 1. CURRICULUM REPOSITORY
// ---------------------------------------------------------------------------
export interface ICurriculumRepository {
  getCurricula(): Promise<CurriculumMetadata[]>;
  getPhases(): Promise<EducationPhaseConfig[]>;
  getGradeLevels(): Promise<GradeLevelConfig[]>;
  getSubjectsForGrade(gradeId: string, canViewDrafts?: boolean): Promise<SubjectModel[]>;
  getSubjectById(subjectId: string): Promise<SubjectModel | undefined>;
  getLessonById(lessonId: string): Promise<CurriculumLessonModel | undefined>;
  search(query: CurriculumSearchQuery, masteryMap?: Record<string, number>): Promise<CurriculumSearchResult[]>;
}

// ---------------------------------------------------------------------------
// 2. ASSESSMENT & QUESTION BANK REPOSITORY
// ---------------------------------------------------------------------------
export interface IAssessmentRepository {
  getAssessments(params?: {
    canViewDrafts?: boolean;
    type?: string;
    grade?: string;
    subject?: string;
    pagination?: PaginationParams;
  }): Promise<PaginatedResult<AssessmentModel>>;

  getAssessmentById(id: string): Promise<AssessmentModel | undefined>;
  
  getQuestions(filter: QuestionBankFilter, pagination?: PaginationParams): Promise<PaginatedResult<QuestionModel>>;
  addQuestion(question: QuestionModel): Promise<QuestionModel>;
  saveAssessment(assessment: AssessmentModel): Promise<{ success: boolean; errors?: string[] }>;

  // Authoritative server-side submission
  submitAssessmentAttempt(params: {
    assessmentId: string;
    learnerId: string;
    answers: Record<string, LearnerAnswerValue>;
    timeUsedSeconds: number;
    submissionToken?: string;
    antiCheatingLogs?: { windowBlurCount: number; tabSwitchCount: number; connectionDropCount: number };
  }): Promise<AssessmentAttempt>;

  getAttemptsByLearner(learnerId: string, pagination?: PaginationParams): Promise<PaginatedResult<AssessmentAttempt>>;
  getAttemptById(attemptId: string): Promise<AssessmentAttempt | undefined>;
}

// ---------------------------------------------------------------------------
// 3. LEARNER PROGRESS & ADAPTIVE REPOSITORY
// ---------------------------------------------------------------------------
export interface ILearnerProgressRepository {
  getProgress(userId: string): Promise<UserProgress>;
  updateProgress(userId: string, updates: Partial<UserProgress>): Promise<UserProgress>;
  recordPerformanceEvent(event: Omit<LearnerPerformanceEvent, 'id' | 'timestamp'>): Promise<LearnerPerformanceEvent>;
  getPerformanceEvents(userId: string, pagination?: PaginationParams): Promise<PaginatedResult<LearnerPerformanceEvent>>;
  getAdaptiveProfile(userId: string, thresholds?: MasteryThresholds): Promise<AdaptiveProfile>;
}

// ---------------------------------------------------------------------------
// 4. USER PROFILE & AUTH REPOSITORY
// ---------------------------------------------------------------------------
export interface IProfileRepository {
  getProfile(userId: string): Promise<UserProfile | null>;
  updateProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile>;
  updatePopiaConsent(userId: string, consented: boolean, guardianEmail?: string): Promise<UserProfile>;
  requestDataExport(userId: string): Promise<{ downloadUrl?: string; exportData: any }>;
  requestAccountDeletion(userId: string, reason?: string): Promise<{ scheduledDeletionDate: string }>;
}

// ---------------------------------------------------------------------------
// 5. AI CONVERSATIONS & SAVED CONTENT REPOSITORY
// ---------------------------------------------------------------------------
export interface IAIConversationRepository {
  getConversations(userId: string, pagination?: PaginationParams): Promise<PaginatedResult<AIConversation>>;
  getConversationById(conversationId: string): Promise<AIConversation | null>;
  saveConversation(conversation: AIConversation): Promise<AIConversation>;
  deleteConversation(conversationId: string): Promise<boolean>;
  getSavedContent(userId: string, pagination?: PaginationParams): Promise<PaginatedResult<SavedLearningItem>>;
  addSavedItem(item: SavedLearningItem): Promise<SavedLearningItem>;
  deleteSavedItem(itemId: string): Promise<boolean>;
}

// ---------------------------------------------------------------------------
// 6. STORAGE SERVICE (PREPARED FOR SUPABASE STORAGE)
// ---------------------------------------------------------------------------
export interface IStorageService {
  uploadFile(params: {
    bucket: 'avatars' | 'scans' | 'attachments' | 'exports';
    path: string;
    file: Blob | Buffer | string; // Base64 or binary
    contentType: string;
  }): Promise<{ publicUrl?: string; path: string }>;

  getSignedUrl(bucket: string, path: string, expiresInSeconds?: number): Promise<string>;
  deleteFile(bucket: string, path: string): Promise<boolean>;
}

// ---------------------------------------------------------------------------
// 7. CACHE SERVICE (REPLACEABLE FOR IN-MEMORY / REDIS / CDN)
// ---------------------------------------------------------------------------
export interface ICacheService {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
  delete(key: string): Promise<boolean>;
  flush(): Promise<void>;
}
