export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface InteractiveExercise {
  type: 'code_editor' | 'flexbox_visualizer' | 'api_simulator' | 'token_counter';
  title: string;
  prompt: string;
  initialCode?: string;
  solutionCode?: string;
  language?: string;
  hint: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  trackId: string;
  title: string;
  subtitle: string;
  durationMinutes: number;
  readTime: string;
  content: {
    overview: string;
    keyTakeaways: string[];
    sections: {
      heading: string;
      body: string;
      codeBlock?: {
        language: string;
        code: string;
        filename?: string;
      };
      callout?: {
        type: 'tip' | 'warning' | 'info';
        text: string;
      };
    }[];
  };
  exercise?: InteractiveExercise;
  quiz?: QuizQuestion[];
  audioScript?: string;
}

export interface Module {
  id: string;
  trackId: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Track {
  id: string;
  title: string;
  tagline: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationHours: number;
  iconName: string;
  imagePath: string;
  category: string;
  skills: string[];
  modules: Module[];
}

export interface Flashcard {
  id: string;
  trackId: string;
  topic: string;
  question: string;
  answer: string;
  codeSnippet?: string;
  difficulty: 'Foundation' | 'Core' | 'Expert';
}

export interface UserNote {
  lessonId: string;
  lessonTitle: string;
  trackTitle: string;
  updatedAt: string;
  content: string;
}

export interface CertificateData {
  id: string;
  studentName: string;
  trackId: string;
  trackTitle: string;
  issueDate: string;
  completionScore: number;
  instructorName: string;
  verificationHash: string;
}

// ==========================================
// PHASE 2: AI TUTOR & LEARNING ENGINE TYPES
// ==========================================

export type SALanguageCode =
  | 'en'
  | 'af'
  | 'zu'
  | 'xh'
  | 'nr'
  | 'ss'
  | 'nso'
  | 'st'
  | 'tn'
  | 've'
  | 'ts';

export interface SALanguage {
  code: SALanguageCode;
  name: string;
  nativeName: string;
  hasVoice: boolean; // Voice is ONLY true for English and Afrikaans
  voiceLabel?: string;
}

export type AITutorMode =
  | 'explain'
  | 'simplify'
  | 'summarize'
  | 'translate'
  | 'practice'
  | 'homework_help'
  | 'quiz_help'
  | 'study_plan';

export interface AITutorModeConfig {
  id: AITutorMode;
  label: string;
  description: string;
  iconName: string;
  actionPrompt: string;
  placeholderText: string;
}

export interface LearningContextState {
  educationLevel: string; // e.g. "FET Phase (Grade 10-12)", "TVET / NATED", "Higher Education"
  gradeOrProgramme: string; // e.g. "Grade 10", "Grade 12 / Matric", "NATED N4", "University 1st Year"
  subject: string; // e.g. "Mathematics", "Physical Sciences", "Engineering Mathematics"
  module?: string;
  topic: string; // e.g. "Algebra & Factorization", "Calculus", "Electric Circuits"
  lesson?: string;
  language: SALanguageCode;
  mode: AITutorMode;
}

export interface GeneratedQuizQuestion {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface GeneratedQuiz {
  id: string;
  title: string;
  educationLevel: string;
  gradeOrProgramme: string;
  subject: string;
  topic: string;
  isAiGenerated: true;
  disclaimer: string;
  questions: GeneratedQuizQuestion[];
  createdAt: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  quizTitle: string;
  subject: string;
  topic: string;
  answers: Record<string, string>;
  score: number;
  totalQuestions: number;
  completedAt: string;
  percentage: number;
}

export interface AIMessage {
  id: string;
  conversationId?: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  mode?: AITutorMode;
  summary?: string;
  followUps?: string[];
  generatedQuiz?: GeneratedQuiz;
  isDemo?: boolean;
  isAiGenerated?: boolean;
  disclaimer?: string;
  saved?: boolean;
  languageSource?: 'verified_language_engine' | 'ai_generated';
  verificationStatus?: 'verified' | 'unverified' | 'needs_verification';
  targetLanguage?: string;
  verifiedPhrase?: any;
  hasVerifiedAudio?: boolean;
  audioUrl?: string;
  audioStatus?: 'unavailable' | 'pending_verification' | 'verified';
  requiresVerificationNotice?: boolean;
  verifiedPhrasesMatched?: Array<{ english: string; xitsonga: string }>;
}

export interface AIConversation {
  id: string;
  userId: string;
  title: string;
  educationLevel: string;
  gradeOrProgramme: string;
  subject: string;
  module?: string;
  topic: string;
  lesson?: string;
  language: SALanguageCode;
  mode: AITutorMode;
  messages: AIMessage[];
  createdAt: string;
  updatedAt: string;
}

export type SavedItemType = 'explanation' | 'summary' | 'question' | 'flashcard' | 'note' | 'scan_explanation' | 'scan_session';

// ==========================================
// PHASE 3: SCAN & LEARN / IMAGE UNDERSTANDING TYPES
// ==========================================

export type ScanMode =
  | 'explain'
  | 'solve_with_me'
  | 'simplify'
  | 'translate'
  | 'summarize'
  | 'practice'
  | 'quiz_me';

export interface ScanModeConfig {
  id: ScanMode;
  label: string;
  description: string;
  iconName: string;
  defaultQuestion: string;
}

export interface ScanClarityAssessment {
  isClear: boolean;
  issue?: 'blurry' | 'incomplete' | 'cropped' | 'unreadable' | 'none';
  message?: string;
}

export interface ScanSessionMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isAiGenerated?: boolean;
}

export interface ScanSession {
  id: string;
  userId?: string;
  title: string;
  imageUrl: string; // base64 or preview URL
  thumbnail?: string; // compressed or preview data
  mimeType: string;
  initialQuestion: string;
  mode: ScanMode;
  educationLevel: string;
  gradeOrProgramme: string;
  subject: string;
  module?: string;
  topic: string;
  language: SALanguageCode;
  aiExplanation: string;
  summary?: string;
  clarityAssessment: ScanClarityAssessment;
  followUpSuggestions: string[];
  messages: ScanSessionMessage[];
  practiceQuestions?: GeneratedQuizQuestion[];
  quiz?: GeneratedQuiz;
  isAiGenerated: boolean;
  disclaimer: string;
  saved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SavedLearningItem {
  id: string;
  userId?: string;
  conversationId?: string;
  messageId?: string;
  type: SavedItemType;
  title: string;
  content: string;
  subject: string;
  topic: string;
  language: SALanguageCode;
  createdAt: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

export interface StudyPlanScheduleItem {
  dayOrPhase: string;
  focus: string;
  activities: string[];
  milestone: string;
}

export interface StudyPlan {
  id: string;
  userId: string;
  title: string;
  gradeOrProgramme: string;
  subject: string;
  topic: string;
  availableStudyTime: string;
  targetDate?: string;
  planOverview: string;
  schedule: StudyPlanScheduleItem[];
  tips: string[];
  createdAt: string;
}

export interface UserProgress {
  completedLessonIds: string[];
  lessonQuizScores: Record<string, number>;
  bookmarkedLessonIds: string[];
  notes: Record<string, UserNote>;
  currentStreakDays: number;
  lastActiveDate: string;
  activeTrackId: string;
  activeLessonId?: string;
  totalXp: number;
  certificates: CertificateData[];
  learnedDays: string[]; // ISO date strings (YYYY-MM-DD)
  // Phase 2 additions
  questionsAskedCount: number;
  practiceSessionsCount: number;
  quizAttempts: QuizAttempt[];
  savedItems: SavedLearningItem[];
  topicsStudied: string[];
  studyTimeMinutes: number;
  lastActivityTimestamp: string;
  conversations: AIConversation[];
  activeConversationId?: string;
}

// Re-export Phase 5 Adaptive Learning Types
export * from './adaptive';

// Re-export Phase 6 CAPS Curriculum Engine Types
export * from './curriculum';

// Re-export Phase 7 Assessment & Exam Types
export * from './assessment';

// Re-export Phase 8 Student Dashboard & Mastery Types
export * from './dashboard';

// ==========================================
// PHASE 7.5: PRODUCTION & SCALABILITY TYPES
// ==========================================

export type UserRole = 'STUDENT' | 'TEACHER' | 'PARENT' | 'ADMIN';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  educationLevel: string;
  gradeOrProgramme: string;
  preferredLanguage: SALanguageCode;
  avatarUrl?: string;
  popiaConsent: boolean;
  popiaConsentDate?: string;
  isMinor: boolean;
  guardianEmail?: string;
  guardianConsent?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  cursor?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
  nextCursor?: string;
}

export interface ApiStandardResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    requestId?: string;
    timestamp?: string;
    cached?: boolean;
    pagination?: {
      total: number;
      page: number;
      pageSize: number;
      hasMore: boolean;
    };
  };
}

export * from './language';



