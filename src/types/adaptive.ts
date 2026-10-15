import { SALanguageCode } from './index';

// ==========================================
// PHASE 5: ADAPTIVE LEARNING ENGINE TYPES
// ==========================================

export type MasteryStatus =
  | 'needs_support' // 0-39%
  | 'developing'    // 40-59%
  | 'basic'         // 60-74%
  | 'strong'        // 75-89%
  | 'mastered';      // 90-100%

export type AdaptiveDifficulty = 'easy' | 'medium' | 'hard';

export type PerformanceSource =
  | 'practice'
  | 'quiz'
  | 'ai_tutor'
  | 'scan_learn'
  | 'lesson'
  | 'assessment';

export interface MasteryThresholds {
  needsSupportMax: number; // default: 39
  developingMax: number;   // default: 59
  basicMax: number;        // default: 74
  strongMax: number;       // default: 89
  masteredMin: number;     // default: 90
}

export const DEFAULT_MASTERY_THRESHOLDS: MasteryThresholds = {
  needsSupportMax: 39,
  developingMax: 59,
  basicMax: 74,
  strongMax: 89,
  masteredMin: 90
};

/**
 * Atomic performance record tracking learner activity at question/exercise level
 */
export interface LearnerPerformanceEvent {
  id: string;
  learnerId: string;
  gradeOrProgramme: string;
  qualification?: string;
  institution?: string;
  subject: string;
  module?: string;
  topic: string;
  subtopic?: string;
  lessonId?: string;
  assessmentId?: string;
  questionId?: string;
  questionType?: 'multiple_choice' | 'calculation' | 'conceptual' | 'short_answer';
  answer?: string;
  correct: boolean;
  score: number;
  percentage: number;
  difficulty: AdaptiveDifficulty;
  timeSpentSeconds: number;
  attemptsCount: number;
  hintsUsed: number;
  source: PerformanceSource;
  completed: boolean;
  timestamp: string; // ISO string
}

/**
 * Calculated topic mastery heuristic based on multiple performance signals
 */
export interface TopicMastery {
  topic: string;
  subject: string;
  gradeOrProgramme: string;
  masteryScore: number; // 0-100 heuristic
  status: MasteryStatus;
  accuracy: number; // 0-100
  totalAttempts: number;
  correctAttempts: number;
  recentScores: number[]; // last 5 percentage scores
  lastPracticedAt: string; // ISO date
  trend: 'improving' | 'declining' | 'stable';
  improvementPercentage: number;
  recommendedDifficulty: AdaptiveDifficulty;
  weakSubtopics: string[];
  repeatedMistakes: string[];
  daysSincePractice: number;
  confidence: 'insufficient_data' | 'low' | 'moderate' | 'high';
}

export type RecommendationType =
  | 'continue_lesson'
  | 'review_previous'
  | 'practice_weak'
  | 'take_quiz'
  | 'attempt_harder'
  | 'revisit_prerequisite'
  | 'start_next'
  | 'create_study_plan'
  | 'ask_ai_tutor';

export interface LearningRecommendation {
  id: string;
  type: RecommendationType;
  title: string;
  description: string;
  reason: string; // Mandatory pedagogical explanation
  priority: number; // 1 (highest) to 6
  priorityLabel: 'Prerequisite' | 'Unfinished' | 'Weak Area' | 'Spaced Review' | 'Next Lesson' | 'Challenge';
  subject: string;
  topic: string;
  recommendedDifficulty?: AdaptiveDifficulty;
  targetTab: 'home' | 'school' | 'tvet' | 'higherEd' | 'tutor' | 'scan' | 'practice' | 'saved';
  actionData?: {
    lessonId?: string;
    moduleId?: string;
    trackId?: string;
    topic?: string;
    difficulty?: AdaptiveDifficulty;
    questionCount?: number;
    tutorMode?: string;
  };
  estimatedMinutes: number;
  createdAt: string;
}

export interface NextBestLesson {
  lessonId: string;
  title: string;
  topic: string;
  subject: string;
  gradeOrProgramme: string;
  pathway: 'school' | 'tvet' | 'higherEd' | 'tracks';
  reason: string;
  priorityLabel: string;
  durationMinutes: number;
  prerequisiteOf?: string;
}

export interface SpacedReviewSchedule {
  topic: string;
  subject: string;
  gradeOrProgramme: string;
  mastery: number;
  dueForReview: boolean;
  urgency: 'high' | 'medium' | 'low' | 'none';
  daysSincePractice: number;
  recommendedIntervalDays: number;
  reason: string;
}

export interface LearnerStreakInfo {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  isStreakProtected: boolean; // Missed 1 day won't feel punitive
  streakMessage: string;
  weeklyActivity: Array<{
    day: string; // 'Mon', 'Tue', etc.
    date: string; // YYYY-MM-DD
    minutes: number;
    completed: boolean;
  }>;
}

export interface LearnerInsights {
  strongestSubject: string;
  strongestTopic: string;
  topWeakness?: string;
  summaryText: string;
  encouragementText: string;
  monthlyImprovement?: {
    topic: string;
    changePercent: number;
  };
}

export interface LearnerOnboardingGoals {
  isConfigured: boolean;
  selectedGrade: string;
  focusSubjects: string[];
  weeklyHoursGoal: number;
  targetExamDate?: string;
  preferredLanguage: SALanguageCode;
}

export interface AdaptiveProfile {
  learnerId: string;
  gradeOrProgramme: string;
  topicMasteries: Record<string, TopicMastery>;
  weakAreas: TopicMastery[];
  strongAreas: TopicMastery[];
  nextBestLesson: NextBestLesson | null;
  recommendations: LearningRecommendation[];
  spacedReviews: SpacedReviewSchedule[];
  streak: LearnerStreakInfo;
  insights: LearnerInsights;
  overallStats: {
    overallProgressPercent: number;
    totalLessonsCompleted: number;
    totalQuestionsAnswered: number;
    practiceAccuracy: number;
    totalStudyMinutes: number;
  };
  onboarding: LearnerOnboardingGoals;
  lastUpdated: string;
}
