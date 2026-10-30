import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  Zap,
  Target,
  Flame,
  Award,
  BookOpen,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Clock,
  Sliders,
  RotateCcw,
  MessageSquare,
  HelpCircle,
  ChevronRight,
  Calendar,
  Layers,
  ShieldCheck,
  RefreshCw,
  Info
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { AdaptiveDifficulty, TopicMastery, MasteryStatus } from '../../types/adaptive';
import { AdaptivePracticeSessionModal } from './AdaptivePracticeSessionModal';
import { MasteryThresholdsModal } from './MasteryThresholdsModal';

export const AdaptiveDashboardView: React.FC = () => {
  const {
    adaptiveProfile,
    masteryThresholds,
    updateMasteryThresholds,
    seedSampleAdaptiveData,
    clearAdaptiveData,
    setCurrentTab,
    sendMessageToTutor,
    openLesson,
    createStudyPlan
  } = useLearning();

  // Active Practice Modal state
  const [practiceModalOpen, setPracticeModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('Algebra & Factorization');
  const [selectedSubject, setSelectedSubject] = useState<string>('Mathematics');
  const [selectedDifficulty, setSelectedDifficulty] = useState<AdaptiveDifficulty>('medium');
  const [focusSubtopic, setFocusSubtopic] = useState<string | undefined>(undefined);

  // Thresholds Modal state
  const [thresholdsModalOpen, setThresholdsModalOpen] = useState(false);

  // Subject filter for the Mastery Matrix
  const [subjectFilter, setSubjectFilter] = useState<string>('All');

  const {
    topicMasteries,
    weakAreas,
    strongAreas,
    nextBestLesson,
    recommendations,
    spacedReviews,
    streak,
    insights,
    overallStats
  } = adaptiveProfile;

  const allMasteryList = Object.values(topicMasteries);

  // Filter masteries
  const filteredMasteryList = subjectFilter === 'All'
    ? allMasteryList
    : allMasteryList.filter((m) => m.subject.toLowerCase() === subjectFilter.toLowerCase());

  // Launch practice helper
  const handleLaunchPractice = (
    topic: string,
    subject = 'Mathematics',
    difficulty: AdaptiveDifficulty = 'medium',
    subtopic?: string
  ) => {
    setSelectedTopic(topic);
    setSelectedSubject(subject);
    setSelectedDifficulty(difficulty);
    setFocusSubtopic(subtopic);
    setPracticeModalOpen(true);
  };

  // Launch AI Tutor for a topic
  const handleAskTutor = (topic: string, promptText?: string) => {
    setCurrentTab('tutor');
    sendMessageToTutor(
      promptText ||
        `Hi! I'm studying ${topic} in the South African curriculum. Can you give me a clear Socratic explanation and an everyday example to help me master this?`
    );
  };

  // Status badge styling helper
  const getStatusBadge = (status: MasteryStatus, score: number) => {
    switch (status) {
      case 'needs_support':
        return {
          label: 'Needs Support',
          bg: 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900',
          bar: 'bg-rose-500'
        };
      case 'developing':
        return {
          label: 'Developing',
          bg: 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900',
          bar: 'bg-amber-500'
        };
      case 'basic':
        return {
          label: 'Basic',
          bg: 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900',
          bar: 'bg-blue-500'
        };
      case 'strong':
        return {
          label: 'Strong',
          bg: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900',
          bar: 'bg-emerald-500'
        };
      case 'mastered':
        return {
          label: 'Mastered',
          bg: 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-900',
          bar: 'bg-purple-500'
        };
      default:
        return {
          label: 'Developing',
          bg: 'bg-slate-100 text-slate-700 border-slate-200',
          bar: 'bg-slate-400'
        };
    }
  };

  // Extract unique subjects
  const availableSubjects = ['All', ...Array.from(new Set(allMasteryList.map((m) => m.subject)))];

  return (
    <div className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
      {/* 1. Header Zone */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              <Compass className="w-3.5 h-3.5" />
              <span>Phase 5 · Adaptive Engine</span>
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Grade 10 CAPS & TVET Alignment
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
            Personalized Learning Journey
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Nexovian's multi-signal heuristics continuously analyze what you know, target weak areas, schedule spaced recall, and determine your next best lesson.
          </p>
        </div>

        {/* Engine Utility Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setThresholdsModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-xs transition-colors"
            title="Configure mastery scale percentage thresholds"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-500" />
            <span>Mastery Scale</span>
          </button>

          <button
            onClick={() => seedSampleAdaptiveData()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-300 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 text-xs font-semibold text-amber-800 dark:text-amber-300 shadow-xs transition-colors"
            title="Load authentic Grade 10 CAPS performance data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Load Demo History</span>
          </button>

          <button
            onClick={() => clearAdaptiveData()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors"
            title="Reset performance events to fresh slate"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* 2. Heuristic Transparency Banner */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-white dark:to-slate-900 border border-amber-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-slate-700 dark:text-slate-300">
            <strong className="text-slate-900 dark:text-white">Nexovian Heuristic Model: </strong>
            Mastery is calculated from practice accuracy (25%), recent assessments (40%), difficulty factors (15%), improvement trends (10%), and spaced recall retention. This represents an internal learning guide, not an official standardized exam result.
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-300 whitespace-nowrap">
            Transparent · Configurable
          </span>
        </div>
      </div>

      {/* 3. Metric Cards Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Overall Mastery */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Overall Mastery</span>
            <Target className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
              {overallStats.overallProgressPercent}%
            </span>
            <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
              Heuristic
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${overallStats.overallProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Practice Accuracy */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Accuracy</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
              {overallStats.practiceAccuracy}%
            </span>
            <span className="text-[11px] text-slate-400">
              across {overallStats.totalQuestionsAnswered} Qs
            </span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 truncate">
            {overallStats.totalStudyMinutes} mins deliberate study
          </div>
        </div>

        {/* Learning Streak */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Consistency Streak</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
              {streak.currentStreak}
            </span>
            <span className="text-xs font-semibold text-slate-500">Days</span>
          </div>
          <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium mt-2 truncate">
            {streak.isStreakProtected ? 'Protected' : 'Active routine'}
          </div>
        </div>

        {/* Focus Subject */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Strongest Domain</span>
            <Award className="w-4 h-4 text-purple-500" />
          </div>
          <div className="mt-1">
            <span className="text-base sm:text-lg font-display font-bold text-slate-900 dark:text-white block truncate">
              {insights.strongestSubject}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
              Top: {insights.strongestTopic}
            </span>
          </div>
          <div className="text-[11px] text-purple-600 dark:text-purple-400 font-medium mt-1">
            High retention
          </div>
        </div>
      </div>

      {/* 4. NEXT BEST LESSON (PRIORITY SECTION 6) */}
      {nextBestLesson && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white border border-slate-800 shadow-xl p-6 sm:p-8">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  Priority 1 · Recommended Next Step
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700">
                  {nextBestLesson.priorityLabel}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{nextBestLesson.durationMinutes} min activity</span>
                </span>
              </div>

              <div>
                <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
                  {nextBestLesson.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {nextBestLesson.subject} · {nextBestLesson.topic}
                </p>
              </div>

              {/* Explicit Reason */}
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                <span className="font-bold text-amber-300 block mb-0.5">Why this was chosen for you:</span>
                {nextBestLesson.reason}
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5">
              <button
                onClick={() => {
                  if (nextBestLesson.lessonId.startsWith('lesson-prereq-') || nextBestLesson.lessonId.startsWith('lesson-reinforce-')) {
                    handleLaunchPractice(nextBestLesson.topic, nextBestLesson.subject, 'easy');
                  } else {
                    openLesson(nextBestLesson.lessonId);
                  }
                }}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-sm shadow-md transition-all active:scale-95 whitespace-nowrap"
              >
                <span>Start Learning Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleAskTutor(nextBestLesson.topic, `Can you explain the key concepts in ${nextBestLesson.title} before I start?`)}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                <span>Explain in Socratic Tutor</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. WEAK AREAS & STRONG AREAS (SECTIONS 3 & 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 3: NEEDS PRACTICE (Weak Areas < 60%) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg">
                    Needs Practice
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Automatically identified curriculum gaps needing reinforcement
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400">
                {weakAreas.length} Topics
              </span>
            </div>

            {weakAreas.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <span>No critical weak areas identified! All tested topics are currently at 60%+ mastery.</span>
              </div>
            ) : (
              <div className="space-y-3">
                {weakAreas.map((topicItem) => {
                  const reasonText =
                    topicItem.repeatedMistakes.length > 0
                      ? `Repeated mistakes in: ${topicItem.repeatedMistakes.join(', ')}`
                      : topicItem.weakSubtopics.length > 0
                      ? `Lower accuracy in ${topicItem.weakSubtopics[0]}`
                      : `Accuracy is currently ${topicItem.accuracy}%`;

                  return (
                    <div
                      key={topicItem.topic}
                      className="p-4 rounded-xl border border-rose-100 dark:border-rose-900/30 bg-rose-50/30 dark:bg-rose-950/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm">
                            {topicItem.topic}
                          </h4>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-200/70 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300">
                            {topicItem.masteryScore}%
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          {reasonText}
                        </p>
                        <span className="text-[11px] text-slate-400 block">
                          {topicItem.subject} · Recommended: {topicItem.recommendedDifficulty} mode
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          handleLaunchPractice(
                            topicItem.topic,
                            topicItem.subject,
                            topicItem.recommendedDifficulty,
                            topicItem.weakSubtopics[0]
                          )
                        }
                        className="shrink-0 flex items-center justify-center gap-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs shadow-xs transition-transform active:scale-95"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Practice 5 Qs</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Section 4: YOU'RE DOING WELL (Strong Areas 75%+) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg">
                    You're Doing Well
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    High mastery and positive growth topics ready for extension
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                {strongAreas.length} Topics
              </span>
            </div>

            {strongAreas.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <span>Practice more topics to reach 75%+ strong status and unlock exam challenges!</span>
              </div>
            ) : (
              <div className="space-y-3">
                {strongAreas.map((topicItem) => (
                  <div
                    key={topicItem.topic}
                    className="p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/30 dark:bg-emerald-950/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm">
                          {topicItem.topic}
                        </h4>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-200/70 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                          {topicItem.masteryScore}%
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        {topicItem.improvementPercentage > 0
                          ? `+${topicItem.improvementPercentage}% improvement across recent attempts`
                          : 'Solid consistent application accuracy'}
                      </p>
                      <span className="text-[11px] text-slate-400 block">
                        {topicItem.subject} · {topicItem.correctAttempts}/{topicItem.totalAttempts} correct
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        handleLaunchPractice(
                          topicItem.topic,
                          topicItem.subject,
                          'hard'
                        )
                      }
                      className="shrink-0 flex items-center justify-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-xs transition-transform active:scale-95"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>Try Advanced (Hard)</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 6. PERSONALIZED RECOMMENDATIONS (SECTION 5) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg">
                Personalized Recommendations
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Every suggestion has a documented pedagogical reason — no random exercises
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
            {recommendations.length} Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex flex-col justify-between gap-3 group hover:border-amber-400 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {rec.priorityLabel}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{rec.estimatedMinutes} min</span>
                  </span>
                </div>

                <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {rec.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2.5">
                  {rec.description}
                </p>

                {/* Explicit Reason Callout */}
                <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-[11px] text-amber-900 dark:text-amber-300">
                  <span className="font-semibold">Reason: </span>
                  {rec.reason}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium truncate">
                  {rec.subject}
                </span>

                {rec.type === 'ask_ai_tutor' ? (
                  <button
                    onClick={() => handleAskTutor(rec.topic)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs transition-transform active:scale-95"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Ask Tutor</span>
                  </button>
                ) : rec.type === 'create_study_plan' ? (
                  <button
                    onClick={() => createStudyPlan('2 hours / day', 'Final Matric Examinations')}
                    className="flex items-center gap-1 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs transition-transform active:scale-95"
                  >
                    <Calendar className="w-3 h-3" />
                    <span>Plan Study</span>
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      handleLaunchPractice(
                        rec.topic,
                        rec.subject,
                        rec.recommendedDifficulty || 'medium'
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs transition-transform active:scale-95"
                  >
                    <span>Practice</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. SPACED REVIEW QUEUE */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg">
                Spaced Repetition & Recall Queue
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Paced reviews timed to combat memory decay before exams
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Cadence: 2d (weak) to 18d (mastered)
          </span>
        </div>

        {spacedReviews.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-400">
            Complete practice sets to build your spaced repetition schedule.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {spacedReviews.map((rev) => (
              <div
                key={rev.topic}
                className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2.5 ${
                  rev.dueForReview
                    ? 'border-amber-300 dark:border-amber-900/50 bg-amber-50/40 dark:bg-amber-950/20'
                    : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-display font-bold text-slate-900 dark:text-white text-xs truncate">
                      {rev.topic}
                    </span>
                    {rev.dueForReview ? (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 uppercase">
                        Review Due
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium">
                        Fresh
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                    {rev.reason}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400">
                    Mastery: {rev.mastery}%
                  </span>
                  <button
                    onClick={() => handleLaunchPractice(rev.topic, rev.subject, 'medium')}
                    className="flex items-center gap-1 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline"
                  >
                    <span>{rev.dueForReview ? 'Review Now' : 'Quick Test'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 8. TOPIC MASTERY MATRIX & CURRICULUM EXPLORER (SECTION 2) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg">
              Topic Mastery Matrix
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Multi-signal score breakdown across verified curriculum units
            </p>
          </div>

          {/* Subject Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
            {availableSubjects.map((subj) => (
              <button
                key={subj}
                onClick={() => setSubjectFilter(subj)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  subjectFilter === subj
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>
        </div>

        {/* Transparent Mastery Scale Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 text-center">
            <span className="text-[10px] font-bold text-rose-700 dark:text-rose-400 uppercase block">
              0 – {masteryThresholds.needsSupportMax}%
            </span>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Needs Support
            </span>
          </div>

          <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-center">
            <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase block">
              {masteryThresholds.needsSupportMax + 1} – {masteryThresholds.developingMax}%
            </span>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Developing
            </span>
          </div>

          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 text-center">
            <span className="text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase block">
              {masteryThresholds.developingMax + 1} – {masteryThresholds.basicMax}%
            </span>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Basic Understanding
            </span>
          </div>

          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 text-center">
            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase block">
              {masteryThresholds.basicMax + 1} – {masteryThresholds.strongMax}%
            </span>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Strong
            </span>
          </div>

          <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/40 text-center col-span-2 sm:col-span-1">
            <span className="text-[10px] font-bold text-purple-700 dark:text-purple-400 uppercase block">
              {masteryThresholds.strongMax + 1} – 100%
            </span>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Mastered
            </span>
          </div>
        </div>

        {/* Topic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMasteryList.map((m) => {
            const badge = getStatusBadge(m.status, m.masteryScore);

            return (
              <div
                key={m.topic}
                className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/70 hover:shadow-md transition-shadow flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {m.subject}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badge.bg}`}>
                      {badge.label}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-slate-900 dark:text-white text-base">
                    {m.topic}
                  </h4>

                  {/* Mastery Progress Bar */}
                  <div className="mt-2.5">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">
                        Mastery Heuristic
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {m.masteryScore}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`${badge.bar} h-full rounded-full transition-all duration-500`}
                        style={{ width: `${m.masteryScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Signals Details */}
                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                    <div>
                      <span>Accuracy: </span>
                      <strong className="text-slate-700 dark:text-slate-300">{m.accuracy}%</strong>
                    </div>
                    <div>
                      <span>Attempts: </span>
                      <strong className="text-slate-700 dark:text-slate-300">{m.totalAttempts}</strong>
                    </div>
                    <div>
                      <span>Trend: </span>
                      <strong className="text-slate-700 dark:text-slate-300 capitalize">
                        {m.trend === 'improving' ? '↗ Improving' : m.trend === 'declining' ? '↘ Declining' : '→ Stable'}
                      </strong>
                    </div>
                    <div>
                      <span>Last Seen: </span>
                      <strong className="text-slate-700 dark:text-slate-300">
                        {m.daysSincePractice === 0 ? 'Today' : `${m.daysSincePractice}d ago`}
                      </strong>
                    </div>
                  </div>

                  {/* Weak Subtopics */}
                  {m.weakSubtopics.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {m.weakSubtopics.map((sub, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-900/40"
                        >
                          Focus: {sub}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleAskTutor(m.topic)}
                    className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-amber-600"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Tutor</span>
                  </button>

                  <button
                    onClick={() =>
                      handleLaunchPractice(
                        m.topic,
                        m.subject,
                        m.recommendedDifficulty,
                        m.weakSubtopics[0]
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs shadow-xs transition-transform active:scale-95"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Practice</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      <AdaptivePracticeSessionModal
        isOpen={practiceModalOpen}
        onClose={() => setPracticeModalOpen(false)}
        topic={selectedTopic}
        subject={selectedSubject}
        initialDifficulty={selectedDifficulty}
        focusSubtopic={focusSubtopic}
      />

      <MasteryThresholdsModal
        isOpen={thresholdsModalOpen}
        onClose={() => setThresholdsModalOpen(false)}
        thresholds={masteryThresholds}
        onSave={(newThresholds) => updateMasteryThresholds(newThresholds)}
      />
    </div>
  );
};
