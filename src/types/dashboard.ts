/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIA - PHASE 8: STUDENT DASHBOARD & MASTERY TYPES
 */

import { SALanguageCode } from './index';
import {
  AdaptiveDifficulty,
  LearningRecommendation,
  MasteryStatus,
  TopicMastery
} from './adaptive';
import { AssessmentAttempt, AssessmentModel, AssessmentType } from './assessment';

export interface ContinueLearningItem {
  subject: string;
  topic: string;
  lessonId: string;
  lessonTitle: string;
  progressPercentage: number;
  estimatedRemainingMinutes: number;
  gradeOrProgramme: string;
  thumbnailUrl?: string;
  reason: string;
}

export interface TodayProgressStats {
  lessonsCompletedToday: number;
  questionsAnsweredToday: number;
  practiceCompletedToday: number;
  studyTimeMinutesToday: number;
  assessmentsCompletedToday: number;
  hasActivityToday: boolean;
}

export interface OverallProgressStats {
  curriculumCompletionPercentage: number;
  lessonsCompletedCount: number;
  totalLessonsCount: number;
  activeSubjectsCount: number;
  averageAssessmentScorePercentage: number;
  totalStudyTimeMinutes: number;
  streakDays: number;
  topicsMasteredCount: number;
  totalTopicsCount: number;
}

export interface SubjectDashboardCard {
  id: string;
  title: string;
  code: string;
  color: string;
  iconName: string;
  lessonsCompleted: number;
  totalLessons: number;
  completionPercentage: number;
  masteryPercentage: number;
  masteryStatus: MasteryStatus;
  currentTopic: string;
  recommendedAction: string;
}

export interface DashboardAssessmentItem {
  id: string;
  title: string;
  assessmentType: AssessmentType;
  subject: string;
  topic: string;
  durationMinutes?: number;
  totalMarks: number;
  passingPercentage: number;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'NEEDS_REVIEW';
  dueDate?: string;
  attemptsUsed: number;
  attemptLimit?: number;
  latestScorePercentage?: number;
  isPassed?: boolean;
}

export interface DashboardAssessmentResultItem {
  attemptId: string;
  assessmentId: string;
  title: string;
  assessmentType: AssessmentType;
  subject: string;
  scorePercentage: number;
  marksEarned: number;
  totalMarks: number;
  isPassed: boolean;
  completedAt: string;
  markingStatus: 'AUTOMATIC' | 'AI_ASSISTED' | 'MANUAL_PENDING' | 'VERIFIED';
}

export interface DashboardStudyTask {
  id: string;
  subject: string;
  title: string;
  milestone: string;
  completed: boolean;
  estimatedMinutes?: number;
}

export interface DashboardStudyPlan {
  id: string;
  title: string;
  subject: string;
  topic: string;
  timeline: string;
  todayTasks: DashboardStudyTask[];
  upcomingTasks: DashboardStudyTask[];
  completedTasksCount: number;
  totalTasksCount: number;
}

export interface StreakStats {
  currentStreakDays: number;
  longestStreakDays: number;
  learnedDays: string[]; // YYYY-MM-DD
  todayCompleted: boolean;
}

export type AchievementCategory = 'LEARNING' | 'MASTERY' | 'STREAK' | 'ASSESSMENT';

export interface LearnerAchievement {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  icon: string;
  currentProgress: number;
  targetProgress: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  badgeColor: string;
}

export interface RecentActivityItem {
  id: string;
  type: 'LESSON' | 'PRACTICE' | 'ASSESSMENT' | 'STUDY_PLAN' | 'SCAN' | 'TUTOR';
  title: string;
  subtitle: string;
  timestamp: string;
  scorePercentage?: number;
  iconName: string;
}

export interface DashboardNotification {
  id: string;
  type: 'REMINDER' | 'ACHIEVEMENT' | 'RECOMMENDATION' | 'ASSESSMENT' | 'FEEDBACK';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionTab?: string;
  actionParams?: Record<string, any>;
}

export interface TopicMasteryDetail {
  topic: string;
  subject: string;
  masteryPercentage: number;
  masteryStatus: MasteryStatus;
  attemptsCount: number;
  totalQuestionsAnswered: number;
  totalCorrect: number;
  recentScores: number[]; // e.g. [52, 61, 68]
  trend: 'improving' | 'stable' | 'declining';
  lastPracticedDate?: string;
  strongSubtopics: string[];
  weakSubtopics: string[];
  recommendedAction: string;
  nextRecommendedDifficulty: AdaptiveDifficulty;
}

export interface ProgressTrendPoint {
  date: string; // e.g. 'Mon', 'Tue' or 'Week 1'
  value: number;
  label?: string;
}

export interface ProgressTrendsData {
  hasSufficientData: boolean;
  masteryOverTime: ProgressTrendPoint[];
  assessmentScoresOverTime: Array<{
    title: string;
    scorePercentage: number;
    date: string;
    passed: boolean;
  }>;
  lessonsCompletedOverTime: ProgressTrendPoint[];
  studyMinutesByDay: Array<{
    day: string;
    minutes: number;
  }>;
}

export interface SubtopicMasteryItem {
  id: string;
  name: string;
  masteryPercentage: number;
  masteryStatus: MasteryStatus;
  statusLabel: string;
}

export interface SubjectMasteryTree {
  subjectId: string;
  subjectTitle: string;
  code: string;
  overallMasteryPercentage: number;
  topics: Array<{
    id: string;
    title: string;
    masteryPercentage: number;
    masteryStatus: MasteryStatus;
    statusLabel: string;
    subtopics: SubtopicMasteryItem[];
    lastPracticed: string;
    attemptsCount: number;
    trend: 'improving' | 'stable' | 'declining';
  }>;
}

export interface StudentDashboardSummary {
  learnerId: string;
  learnerName: string;
  email: string;
  role: string;
  educationLevel: string;
  gradeOrProgramme: string;
  preferredLanguage: SALanguageCode;
  isNewLearner: boolean;
  continueLearning: ContinueLearningItem | null;
  todayProgress: TodayProgressStats;
  overallProgress: OverallProgressStats;
  subjects: SubjectDashboardCard[];
  needsPractice: TopicMastery[];
  strongAreas: TopicMastery[];
  recommendations: LearningRecommendation[];
  upcomingAssessments: DashboardAssessmentItem[];
  recentAssessments: DashboardAssessmentResultItem[];
  studyPlan: DashboardStudyPlan | null;
  streak: StreakStats;
  achievements: LearnerAchievement[];
  recentActivity: RecentActivityItem[];
  notifications: DashboardNotification[];
  progressTrends: ProgressTrendsData;
  masteryTrees: SubjectMasteryTree[];
}

export interface OnboardingPreferences {
  gradeOrProgramme: string;
  educationLevel: string;
  selectedSubjects: string[];
  preferredLanguage: SALanguageCode;
  targetDailyMinutes: number;
  primaryGoal: 'matric_exam' | 'topic_catchup' | 'curriculum_ahead' | 'tvet_career' | 'higher_ed';
}
