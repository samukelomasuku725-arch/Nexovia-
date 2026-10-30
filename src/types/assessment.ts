/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIA - PHASE 7: ASSESSMENTS & EXAM ENGINE TYPES
 * 
 * Comprehensive assessment architecture supporting:
 * - Assessment Types: PRACTICE, QUIZ, TEST, ASSIGNMENT, EXAM
 * - 8 Question Types:
 *   1. Multiple Choice
 *   2. Multiple Select
 *   3. True/False
 *   4. Short Answer
 *   5. Numerical Answer
 *   6. Matching
 *   7. Ordering
 *   8. Written Response
 * - Timed & Untimed modes with anti-cheating foundations
 * - Automatic and AI-assisted manual marking
 * - Topic and learning-objective mastery integration (Phase 5 Adaptive Engine)
 * - CAPS curriculum alignment (Phase 6)
 * - 11 official South African languages
 */

import { SALanguageCode } from './index';
import { AdaptiveDifficulty, MasteryStatus } from './adaptive';
import { SourceClassification, SouthAfricanPhaseId } from './curriculum';

// ---------------------------------------------------------------------------
// 1. ASSESSMENT TYPES
// ---------------------------------------------------------------------------
export type AssessmentType =
  | 'PRACTICE'     // Unlimited attempts, instant feedback, adaptive difficulty
  | 'QUIZ'         // Short formative check, limited attempts (e.g. 3), optional timer
  | 'TEST'         // Summative module test, strict timer, no answer reveal before submit
  | 'ASSIGNMENT'   // Extended coursework, written responses, teacher/AI rubric grading
  | 'EXAM';        // Formal multi-section examination, invigilation instructions, strict timer

export type AssessmentStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export type AttemptStatus =
  | 'IN_PROGRESS'
  | 'SUBMITTED'
  | 'MARKING'
  | 'MARKED'
  | 'CANCELLED'
  | 'EXPIRED';

// ---------------------------------------------------------------------------
// 2. QUESTION TYPES (8 SUPPORTED TYPES)
// ---------------------------------------------------------------------------
export type QuestionType =
  | 'multiple_choice'   // Single correct choice out of multiple options
  | 'multiple_select'   // One or more correct choices out of multiple options
  | 'true_false'        // Binary true or false statement
  | 'short_answer'      // Brief text or phrase matched against acceptedAnswers
  | 'numerical_answer'  // Numeric value with configurable tolerance and units
  | 'matching'          // Match pairs between left column and right column
  | 'ordering'          // Arrange items into correct sequential order
  | 'written_response'; // Long-form explanation requiring rubric / teacher marking

// ---------------------------------------------------------------------------
// 3. QUESTION OPTION & PAIR STRUCTURES
// ---------------------------------------------------------------------------
export interface QuestionOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface MatchingPair {
  id: string;
  prompt: string; // Left side (e.g. "Kinetic Energy")
  match: string;  // Right side (e.g. "Energy of motion (½mv²)")
}

export interface OrderingItem {
  id: string;
  text: string;
  correctOrder: number; // 1-indexed correct position
}

// ---------------------------------------------------------------------------
// 4. QUESTION MODEL
// ---------------------------------------------------------------------------
export interface QuestionModel {
  id: string;
  questionText: string;
  questionType: QuestionType;
  marks: number;
  difficulty: AdaptiveDifficulty;
  
  // Curriculum context
  curriculumId?: string;
  curriculumVersion?: string;
  grade?: string;
  subject?: string;
  phase?: SouthAfricanPhaseId;
  term?: 1 | 2 | 3 | 4;
  topic?: string;
  subtopic?: string;
  lessonId?: string;
  learningObjective?: string;
  
  // Source provenance
  sourceType: SourceClassification;
  sourceReference?: string;

  // Question content by type
  options?: QuestionOption[];             // For multiple_choice and multiple_select
  correctAnswer?: string | string[];     // String ID(s) or True/False value
  acceptedAnswers?: string[];            // For short_answer (case-insensitive variants)
  numericalTarget?: number;              // For numerical_answer
  numericalTolerance?: number;           // E.g. 0.05 or 0 for exact
  numericalUnit?: string;                // E.g. "m/s²", "N", "kg", "°C"
  matchingPairs?: MatchingPair[];        // For matching
  orderingItems?: OrderingItem[];        // For ordering
  rubricGuidelines?: string[];           // For written_response grading criteria
  sampleSolution?: string;               // Exemplar solution

  // Pedagogical explanations & aids
  explanation: string;
  hint?: string;
  
  // Language & Translations
  language: SALanguageCode;
  translations?: Partial<Record<SALanguageCode, {
    questionText: string;
    options?: QuestionOption[];
    explanation?: string;
    hint?: string;
  }>>;
}

// ---------------------------------------------------------------------------
// 5. ASSESSMENT SECTION MODEL (FOR EXAMS)
// ---------------------------------------------------------------------------
export interface AssessmentSection {
  id: string;
  title: string;          // e.g. "Section A: Multiple Choice & Short Questions"
  instructions: string;   // e.g. "Answer ALL questions in this section."
  questionIds: string[];  // Questions in this section
  order: number;
}

// ---------------------------------------------------------------------------
// 6. ASSESSMENT MODEL
// ---------------------------------------------------------------------------
export interface AssessmentModel {
  id: string;
  title: string;
  description: string;
  assessmentType: AssessmentType;

  // Curriculum Linkage
  curriculumId: string;
  curriculumVersion: string;
  grade: string;
  subject: string;
  phase: SouthAfricanPhaseId;
  term?: 1 | 2 | 3 | 4;
  topic?: string;
  lessonId?: string;

  instructions: string;
  durationMinutes?: number; // null or undefined means untimed
  totalMarks: number;
  passingPercentage: number; // e.g. 50%
  difficulty: AdaptiveDifficulty;
  attemptLimit: number; // e.g. 1 for formal exam, 3 for quiz, 0 for unlimited

  questions: QuestionModel[];
  sections?: AssessmentSection[];

  status: AssessmentStatus;
  sourceType: SourceClassification;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// 7. LEARNER ANSWER & ATTEMPT STATE
// ---------------------------------------------------------------------------
export type LearnerAnswerValue =
  | string                           // single choice, true/false, short answer, numerical
  | string[]                         // multiple select
  | Record<string, string>           // matching: promptId -> matchId
  | string[];                        // ordering: list of itemIds in chosen order

export interface LearnerAnswer {
  questionId: string;
  questionType: QuestionType;
  value: LearnerAnswerValue;
  isAnswered: boolean;
  isFlagged?: boolean;
  timeSpentSeconds: number;
  lastUpdated: string;
}

// ---------------------------------------------------------------------------
// 8. MARKING & QUESTION EVALUATION
// ---------------------------------------------------------------------------
export interface AiAssistedEvaluation {
  suggestedMarks: number;
  maxMarks: number;
  rubricBreakdown: {
    criterion: string;
    pointsAwarded: number;
    maxPoints: number;
    comment: string;
  }[];
  conceptualStrengths: string[];
  areasForImprovement: string[];
  constructiveFeedback: string;
  isAiAssisted: true;
  evaluatedAt: string;
}

export interface QuestionResult {
  questionId: string;
  questionType: QuestionType;
  marksAwarded: number;
  marksAvailable: number;
  isCorrect: boolean;
  isPartiallyCorrect?: boolean;
  learnerAnswer: LearnerAnswerValue;
  correctAnswer: any;
  explanation: string;
  feedback?: string;
  topic?: string;
  learningObjective?: string;
  
  // Written response evaluation
  markingType: 'auto' | 'ai_assisted' | 'teacher_manual';
  aiEvaluation?: AiAssistedEvaluation;
  teacherFeedback?: {
    teacherId: string;
    teacherName: string;
    marksAwarded: number;
    comments: string;
    markedAt: string;
  };
}

// ---------------------------------------------------------------------------
// 9. ASSESSMENT ATTEMPT & PERFORMANCE MODEL
// ---------------------------------------------------------------------------
export interface TopicPerformanceResult {
  topic: string;
  marksEarned: number;
  marksAvailable: number;
  percentage: number;
  status: MasteryStatus;
}

export interface AssessmentAttempt {
  id: string;
  learnerId: string;
  assessmentId: string;
  assessmentTitle: string;
  assessmentType: AssessmentType;
  curriculumId: string;
  grade: string;
  subject: string;
  topic?: string;

  startedAt: string;
  submittedAt?: string;
  status: AttemptStatus;
  
  answers: Record<string, LearnerAnswer>;
  questionResults?: QuestionResult[];

  score?: number;            // Total marks awarded
  totalMarks?: number;       // Total marks possible
  percentage?: number;       // Score / totalMarks * 100
  passed?: boolean;          // percentage >= passingPercentage

  timeUsedSeconds?: number;
  attemptNumber: number;

  // Anti-cheating foundation metrics (transparently communicated)
  antiCheatingLogs?: {
    windowBlurCount: number;
    tabSwitchCount: number;
    connectionDropCount: number;
  };

  // Performance breakdown
  topicPerformance?: Record<string, TopicPerformanceResult>;
  learningObjectivePerformance?: Record<string, {
    objective: string;
    marksEarned: number;
    marksAvailable: number;
    percentage: number;
  }>;

  // Synchronization status
  isSyncedWithServer: boolean;
}

// ---------------------------------------------------------------------------
// 10. QUESTION BANK SEARCH & FILTER
// ---------------------------------------------------------------------------
export interface QuestionBankFilter {
  grade?: string;
  subject?: string;
  phase?: SouthAfricanPhaseId;
  term?: 1 | 2 | 3 | 4;
  topic?: string;
  difficulty?: AdaptiveDifficulty;
  questionType?: QuestionType;
  sourceType?: SourceClassification;
  language?: SALanguageCode;
  searchKeyword?: string;
}
