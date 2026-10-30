/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN ACADEMY - PHASE 8: STUDENT DASHBOARD & MASTERY EXPERIENCE
 * 
 * Central learner home answering:
 * 1. What am I learning?
 * 2. What have I completed?
 * 3. How am I performing?
 * 4. What am I good at?
 * 5. What do I need to improve?
 * 6. What should I learn next?
 * 7. What assessments do I have?
 * 8. What is my current study plan?
 * 9. How is my progress changing over time?
 * 
 * Built with real data from Phases 5–7.5. No fake statistics.
 */

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Flame,
  Award,
  BookOpen,
  Compass,
  Camera,
  MessageSquare,
  Search,
  Bell,
  Clock,
  Target,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Play,
  RotateCcw,
  Calendar,
  Layers,
  ChevronRight,
  Filter,
  BarChart3,
  Lightbulb,
  ExternalLink,
  ShieldCheck,
  CheckSquare,
  Square,
  Volume2,
  Mic,
  School,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../i18n/I18nContext';
import { dashboardService } from '../../services/dashboard/dashboardService';
import { AITutorMode } from '../../types';
import {
  DashboardStudyTask,
  LearnerAchievement,
  StudentDashboardSummary,
  SubjectDashboardCard,
  TopicMasteryDetail
} from '../../types/dashboard';
import { SubjectDetailModal } from './SubjectDetailModal';
import { TopicMasteryModal } from './TopicMasteryModal';
import { NewLearnerOnboardingModal } from './NewLearnerOnboardingModal';
import { NotificationsModal } from './NotificationsModal';
import { MyMasteryView } from './MyMasteryView';
import { ProgressTrendsView } from './ProgressTrendsView';
import { LearnerProfileModal } from './LearnerProfileModal';
import { ContextualAITutorBar } from './ContextualAITutorBar';
import { getSubjectsForLevel } from '../../data/educationData';
import { AnswerFeedbackWidget } from '../feedback/AnswerFeedbackWidget';
import { OhmsLawInteractiveWidget } from '../interactive/OhmsLawInteractiveWidget';
import { HeroSection } from '../home/HeroSection';
import { MissionHeroBanner } from '../home/MissionHeroBanner';

export const StudentMasteryDashboardView: React.FC = () => {
  const {
    userProgress,
    adaptiveProfile,
    setCurrentTab,
    openLesson,
    setIsSearchOpen,
    learningContext,
    updateLearningContext
  } = useLearning();

  const { user, isAuthenticated, setIsAuthModalOpen, setAuthModalMode, logout } = useAuth();
  const { t } = useTranslation();

  // Active sub-navigation tab
  const [dashboardSubTab, setDashboardSubTab] = useState<'overview' | 'mastery' | 'trends' | 'study_plan'>('overview');

  // Active modals
  const [selectedSubjectForDetail, setSelectedSubjectForDetail] = useState<SubjectDashboardCard | null>(null);
  const [selectedTopicDetail, setSelectedTopicDetail] = useState<TopicMasteryDetail | null>(null);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [quickLevel, setQuickLevel] = useState<'school' | 'tvet' | 'higherEd'>('school');
  const [quickSubject, setQuickSubject] = useState<string>('Mathematics');

  // Local study task completion toggle for interactive feel
  const [completedTaskIds, setCompletedTaskIds] = useState<Record<string, boolean>>({
    task_2: true
  });

  // Quick Study Question & Feedback state on main learning page
  const [dashboardAskQuery, setDashboardAskQuery] = useState('');
  const [dashboardAnswerData, setDashboardAnswerData] = useState<{
    question: string;
    answer: string;
    source: string;
  } | null>(null);
  const [isDashboardAskLoading, setIsDashboardAskLoading] = useState(false);

  const handleDashboardAsk = async (customQ?: string) => {
    const q = (customQ || dashboardAskQuery).trim();
    if (!q) return;
    setIsDashboardAskLoading(true);
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          grade: summary.gradeOrProgramme || 'Grade 10',
          language: summary.preferredLanguage || learningContext?.language || 'en',
          subject: learningContext?.subject || 'Mathematics'
        })
      });
      const data = await res.json();
      if (data.success && data.answer) {
        setDashboardAnswerData({
          question: q,
          answer: data.answer,
          source: data.source || 'cache'
        });
      }
    } catch (err) {
      console.error('Error in dashboard quick ask:', err);
    } finally {
      setIsDashboardAskLoading(false);
    }
  };

  // Compile full dashboard summary from real data
  const summary: StudentDashboardSummary = useMemo(() => {
    return dashboardService.buildDashboardSummary({
      user: user as any,
      userProgress,
      adaptiveProfile
    });
  }, [user, userProgress, adaptiveProfile]);

  const toggleTask = (taskId: string) => {
    setCompletedTaskIds((prev) => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const handleOpenTopicMastery = (topicName: string) => {
    const detail = dashboardService.getTopicMasteryDetail(topicName, adaptiveProfile);
    setSelectedTopicDetail(detail);
  };

  const handleStartPractice = (topicName: string) => {
    setCurrentTab('practice');
  };

  const launchContextualTutor = (topic: string, mode: AITutorMode = 'explain') => {
    if (updateLearningContext) {
      const available = getSubjectsForLevel(summary.gradeOrProgramme);
      const matched = available.find((s) =>
        s.topics.some((t) => t.toLowerCase() === topic.toLowerCase() || topic.toLowerCase().includes(t.toLowerCase()))
      );
      const subj = matched ? matched.name : learningContext?.subject || 'Mathematics';

      updateLearningContext({
        educationLevel: summary.educationLevel,
        gradeOrProgramme: summary.gradeOrProgramme,
        subject: subj,
        topic,
        language: summary.preferredLanguage || learningContext?.language || 'en',
        mode
      });
    }
    setCurrentTab('tutor');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 md:pb-12 text-slate-900 dark:text-slate-100 transition-colors w-full max-w-[100vw] overflow-x-hidden">
      {/* 1. TOP HEADER & LEARNER COCKPIT BAR */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 sticky top-0 z-30 shadow-xs backdrop-blur-md bg-white/95 dark:bg-slate-900/95 w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-2 sm:gap-4 w-full max-w-full">
          {/* Learner Info */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="relative shrink-0">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center font-bold text-sm shadow-xs border border-amber-400">
                {summary.learnerName.charAt(0)}
              </div>
              <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="font-display text-sm sm:text-base lg:text-lg font-bold text-slate-900 dark:text-white truncate">
                  Welcome back, {summary.learnerName.split(' ')[0]}
                </h1>
                <span className="hidden sm:inline-flex text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 shrink-0">
                  {summary.gradeOrProgramme}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
                {summary.educationLevel} · CAPS South Africa
              </p>
            </div>
          </div>

          {/* Controls: Streak, Notifications, Search, Profile */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Streak Badge */}
            <div
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-bold shrink-0"
              title={`Consecutive learning days. Longest: ${summary.streak.longestStreakDays} days.`}
            >
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 shrink-0" />
              <span className="hidden sm:inline">
                {summary.streak.currentStreakDays > 0
                  ? `${summary.streak.currentStreakDays} day streak 🔥`
                  : 'Start streak'}
              </span>
              <span className="sm:hidden text-[11px]">
                {summary.streak.currentStreakDays > 0
                  ? `${summary.streak.currentStreakDays}d 🔥`
                  : '0d'}
              </span>
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="relative p-1.5 sm:p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              {summary.notifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white dark:ring-slate-900" />
              )}
            </button>

            {/* Global Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 sm:p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
              aria-label="Search curriculum and tests"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Learner Profile Button */}
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors shrink-0"
            >
              <span>Profile</span>
            </button>

            {/* User Name, Email & Logout Button */}
            {user?.email && (
              <div className="flex items-center gap-2 shrink-0">
                <div className="hidden lg:flex flex-col text-right leading-tight">
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[130px]">
                    {user.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 truncate max-w-[130px]">
                    {user.email}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-xl transition-colors shrink-0 cursor-pointer"
                  title="Log out of Supabase"
                >
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* TOP MISSION HERO BANNER (RIGHT BELOW HEADER/LOGO, ABOVE EVERYTHING ELSE) */}
      <div className="max-w-7xl mx-auto w-full">
        <MissionHeroBanner />
      </div>

      {/* 2. MAIN DASHBOARD CONTENT GRID */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 w-full max-w-full overflow-hidden">

        {/* SUB NAVIGATION TABS: Overview, My Mastery, Progress Tracker, Study Plan */}
        <div className="w-full max-w-full px-4 sm:px-0">
          <div className="w-full max-w-full overflow-x-auto scrollbar-hide py-1">
            <div className="flex items-center gap-2 p-1.5 bg-slate-200/80 dark:bg-slate-800/80 rounded-2xl min-w-max flex-nowrap shadow-xs">
              <button
                onClick={() => setDashboardSubTab('overview')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                  dashboardSubTab === 'overview'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Overview</span>
              </button>

              <button
                onClick={() => setDashboardSubTab('mastery')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                  dashboardSubTab === 'mastery'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Target className="w-3.5 h-3.5 text-amber-500" />
                <span>My Mastery</span>
              </button>

              <button
                onClick={() => setDashboardSubTab('trends')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                  dashboardSubTab === 'trends'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                <span>Progress Tracker</span>
              </button>

              <button
                onClick={() => setDashboardSubTab('study_plan')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                  dashboardSubTab === 'study_plan'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                <span>Study Plan</span>
              </button>
            </div>
          </div>
        </div>

        {/* CONDITIONALLY RENDER BASED ON SUB TAB */}
        {dashboardSubTab === 'mastery' && (
          <MyMasteryView
            masteryTrees={summary.masteryTrees}
            onOpenTopicDetail={handleOpenTopicMastery}
            onPracticeTopic={handleStartPractice}
          />
        )}

        {dashboardSubTab === 'trends' && (
          <ProgressTrendsView trends={summary.progressTrends} />
        )}

        {dashboardSubTab === 'study_plan' && (
          <div className="w-full max-w-full overflow-hidden space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500 text-white">
                      Study Plan
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Adaptive Pacing
                    </span>
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    {summary.studyPlan?.title || 'Personalized Study Plan'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                    Structured tasks based on your current curriculum goals and upcoming term assessments.
                  </p>
                </div>

                <button
                  onClick={() => launchContextualTutor('Personalized Study Plan', 'study_plan')}
                  className="self-start sm:self-auto flex items-center gap-1.5 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-transform active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Customize Plan with AI</span>
                </button>
              </div>

              {/* Tasks Sections */}
              {summary.studyPlan ? (
                <div className="space-y-6 mt-6">
                  {/* Today's Tasks */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Today's Tasks
                    </h3>
                    <div className="space-y-2.5">
                      {summary.studyPlan.todayTasks.map((task) => {
                        const isChecked = !!completedTaskIds[task.id];
                        return (
                          <div
                            key={task.id}
                            className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-amber-400 transition-colors"
                          >
                            <div
                              onClick={() => toggleTask(task.id)}
                              className="flex items-center gap-3 cursor-pointer min-w-0"
                            >
                              {isChecked ? (
                                <CheckSquare className="w-5 h-5 text-emerald-500 shrink-0" />
                              ) : (
                                <Square className="w-5 h-5 text-slate-400 shrink-0" />
                              )}
                              <div className="min-w-0">
                                <span className={`text-xs sm:text-sm font-bold block truncate ${isChecked ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                                  {task.title}
                                </span>
                                <p className="text-[11px] text-slate-500">
                                  {task.subject} · {task.milestone}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                              <span className="text-xs text-slate-400 font-mono">
                                {task.estimatedMinutes} mins
                              </span>
                              <button
                                onClick={() => handleStartPractice(task.title)}
                                className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-transform active:scale-95"
                              >
                                Start Task
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Upcoming Tasks */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Upcoming Tasks
                    </h3>
                    <div className="space-y-2.5">
                      {summary.studyPlan.upcomingTasks.map((task) => (
                        <div
                          key={task.id}
                          className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <Square className="w-5 h-5 text-slate-300 dark:text-slate-700 shrink-0" />
                            <div>
                              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                                {task.title}
                              </span>
                              <p className="text-[11px] text-slate-500">
                                {task.subject} · {task.milestone}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs text-slate-400 font-mono shrink-0">
                            {task.estimatedMinutes} mins
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    No active study plan found.
                  </p>
                  <button
                    onClick={() => launchContextualTutor('Create a Study Plan', 'study_plan')}
                    className="mt-3 px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl"
                  >
                    Create a personalized study plan
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {dashboardSubTab === 'overview' && (
          <>
            {/* 1. HERO SECTION FOR NEXOVIAN (PTY) LTD */}
            <HeroSection />

            {/* 2. GUIDED LEARNING FINDER - KEPT DIRECTLY BELOW HERO */}
            <section
              id="guided-learning-finder"
              aria-label="Guided Learning Finder"
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xs transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-0.5 rounded-full border border-amber-300 dark:border-amber-700/60 font-mono">
                      Guided Learning Finder
                    </span>
                    <span className="text-xs text-slate-500">1-Tap Direct Syllabus</span>
                  </div>
                  <h2 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    Pick Your Level, Subject &amp; Start in 1 Click
                  </h2>
                </div>
                <span className="text-xs text-slate-500 hidden sm:inline">
                  CAPS Grade 4–12 · TVET N1–N6 · University
                </span>
              </div>

              <div className="space-y-4">
                {/* Level selector tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  <button
                    type="button"
                    onClick={() => {
                      setQuickLevel('school');
                      setQuickSubject('Mathematics');
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap min-h-[40px] flex items-center gap-1.5 cursor-pointer ${
                      quickLevel === 'school'
                        ? 'bg-amber-400 text-slate-950 shadow-2xs font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <School className="w-3.5 h-3.5" />
                    <span>School: Grades 4–12</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setQuickLevel('tvet');
                      setQuickSubject('Engineering Mathematics');
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap min-h-[40px] flex items-center gap-1.5 cursor-pointer ${
                      quickLevel === 'tvet'
                        ? 'bg-blue-500 text-white shadow-2xs font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>TVET: N1–N6 &amp; NC(V)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setQuickLevel('higherEd');
                      setQuickSubject('Calculus & Linear Algebra');
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap min-h-[40px] flex items-center gap-1.5 cursor-pointer ${
                      quickLevel === 'higherEd'
                        ? 'bg-emerald-500 text-white shadow-2xs font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>University</span>
                  </button>
                </div>

                {/* Quick subject pills */}
                <div className="flex flex-wrap gap-2">
                  {(quickLevel === 'school'
                    ? ['Mathematics', 'Physical Sciences', 'Life Sciences', 'English', 'Accounting', 'Economics']
                    : quickLevel === 'tvet'
                    ? ['Engineering Mathematics', 'Electrotechnics', 'Industrial Electronics', 'Mechanotechnics', 'Financial Accounting']
                    : ['Calculus & Linear Algebra', 'Electromagnetic Waves', 'Computer Science', 'Microeconomics', 'Organic Chemistry']
                  ).map((subj) => (
                    <button
                      key={subj}
                      type="button"
                      onClick={() => setQuickSubject(subj)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all min-h-[38px] cursor-pointer ${
                        quickSubject === subj
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold shadow-2xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {subj}
                    </button>
                  ))}
                </div>

                {/* Direct 1-tap launch action bar */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">
                    Selected: <strong className="text-slate-900 dark:text-white">{quickSubject}</strong>
                  </span>
                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => {
                        launchContextualTutor(`${quickSubject} Fundamentals`, 'explain');
                      }}
                      className="flex-1 sm:flex-initial px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition-transform active:scale-95 flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Ask AI About {quickSubject}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentTab('learn')}
                      className="flex-1 sm:flex-initial px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>View All Lessons</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. CONTEXTUAL AI TUTOR QUICK ACTIONS */}
            <ContextualAITutorBar summary={summary} />

            {/* 4. QUICK STUDY ASSISTANT (Immediate answers + "Was this helpful? 👍 Yes / 👎 No" feedback) */}
            <section aria-label="Quick Study Question Assistant" className="mb-6 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-sm shadow-2xs">
                    ✦
                  </div>
                  <div>
                    <h3 className="font-display text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      Ask Any Study Question
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Instant verified explanations powered by local question bank & AI
                    </p>
                  </div>
                </div>

                {/* Quick suggestions */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="text-[11px] text-slate-400 mr-1 hidden lg:inline">Try:</span>
                  {[
                    "What is Ohm's Law?",
                    "What are the states of matter?",
                    "What is photosynthesis?"
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setDashboardAskQuery(preset);
                        handleDashboardAsk(preset);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-950/60 text-slate-700 dark:text-slate-300 hover:text-amber-800 dark:hover:text-amber-300 text-[11px] font-semibold transition-colors"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input row */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a maths or science question (e.g. How to solve linear equations?)..."
                  value={dashboardAskQuery}
                  onChange={(e) => setDashboardAskQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleDashboardAsk();
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
                <button
                  type="button"
                  onClick={() => handleDashboardAsk()}
                  disabled={isDashboardAskLoading || !dashboardAskQuery.trim()}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-transform active:scale-95 shrink-0"
                >
                  {isDashboardAskLoading ? 'Searching...' : 'Get Answer'}
                </button>
              </div>

              {/* Answer display with Feedback Widget */}
              {dashboardAnswerData && (
                <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      Answer for: "{dashboardAnswerData.question}"
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-mono font-bold">
                      {dashboardAnswerData.source === 'cache' ? '⚡ Local Bank' : '✨ AI Generated'}
                    </span>
                  </div>

                  <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-line font-normal text-slate-800 dark:text-slate-200">
                    {dashboardAnswerData.answer}
                  </div>

                  {/* Interactive Ohm's Law Simulation when question or answer relates to Ohm's Law */}
                  {(dashboardAnswerData.question.toLowerCase().includes('ohm') ||
                    dashboardAnswerData.answer.toLowerCase().includes("ohm's law")) && (
                    <OhmsLawInteractiveWidget />
                  )}

                  {/* The Feedback Widget: "Was this helpful? 👍 Yes / 👎 No" */}
                  <AnswerFeedbackWidget
                    question={dashboardAnswerData.question}
                    answer={dashboardAnswerData.answer}
                  />
                </div>
              )}
            </section>
        
        {/* THE FOUR MAIN PRIMARY ACTIONS (Clean, beginner-friendly, large mobile buttons) */}
        <section aria-label="Main Learning Actions">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Primary Actions
              </span>
              <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                What would you like to do?
              </h2>
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline">
              Choose an action to get started immediately
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* 1. Learn Card */}
            <button
              onClick={() => setCurrentTab('learn')}
              className="flex flex-col justify-between p-5 bg-white dark:bg-slate-900 border-2 border-slate-200/80 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-400 rounded-3xl text-left shadow-sm hover:shadow-md transition-all group active:scale-98 min-h-[160px]"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold mb-3.5 shadow-sm group-hover:scale-105 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Learn
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Grades 4–12 · TVET N1–N6 · University
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400">
                <span>Browse Subjects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* 2. Ask Nexovian AI Card */}
            <button
              onClick={() => setCurrentTab('tutor')}
              className="flex flex-col justify-between p-5 bg-white dark:bg-slate-900 border-2 border-slate-200/80 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 rounded-3xl text-left shadow-sm hover:shadow-md transition-all group active:scale-98 min-h-[160px]"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-bold mb-3.5 shadow-sm group-hover:scale-105 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Ask Nexovian AI
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Step-by-step help in 11 SA languages & voice
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                <span>Ask a Question</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* 3. Voice-to-Document Card */}
            <button
              onClick={() => setCurrentTab('academicVoice')}
              className="flex flex-col justify-between p-5 bg-white dark:bg-slate-900 border-2 border-slate-200/80 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-400 rounded-3xl text-left shadow-sm hover:shadow-md transition-all group active:scale-98 min-h-[160px]"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold mb-3.5 shadow-sm group-hover:scale-105 transition-transform">
                  <Mic className="w-6 h-6" />
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Voice-to-Document
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Record or upload audio to export academic PDFs
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-orange-600 dark:text-orange-400">
                <span>Create Document</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* 4. My Progress Card */}
            <button
              onClick={() => setCurrentTab('progress')}
              className="flex flex-col justify-between p-5 bg-white dark:bg-slate-900 border-2 border-slate-200/80 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-400 rounded-3xl text-left shadow-sm hover:shadow-md transition-all group active:scale-98 min-h-[160px]"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold mb-3.5 shadow-sm group-hover:scale-105 transition-transform">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  My Progress
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {summary.overallProgress.curriculumCompletionPercentage}% mastery · {summary.streak.currentStreakDays} day streak
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>View My Stats</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </section>

        {/* SECONDARY PRACTICE TOOLS STRIP */}
        <section aria-label="Secondary Practice Tools">
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Secondary Practice Tools
            </h3>
            <span className="text-[11px] text-slate-400">Additional interactive modes</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => setCurrentTab('scan')}
              className="flex items-center gap-2.5 p-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl hover:border-blue-400 transition-all text-left shadow-2xs group min-h-[48px]"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0">
                <Camera className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-slate-900 dark:text-white truncate">Scan & Learn</span>
                <span className="block text-[10px] text-slate-500 truncate">Camera Solver</span>
              </div>
            </button>

            <button
              onClick={() => setCurrentTab('practice')}
              className="flex items-center gap-2.5 p-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl hover:border-emerald-400 transition-all text-left shadow-2xs group min-h-[48px]"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-slate-900 dark:text-white truncate">Daily Review</span>
                <span className="block text-[10px] text-slate-500 truncate">Flashcard Lab</span>
              </div>
            </button>

            <button
              onClick={() => setCurrentTab('assessments')}
              className="flex items-center gap-2.5 p-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl hover:border-purple-400 transition-all text-left shadow-2xs group min-h-[48px]"
            >
              <div className="w-8 h-8 rounded-xl bg-purple-500 text-white flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-slate-900 dark:text-white truncate">Evaluations</span>
                <span className="block text-[10px] text-slate-500 truncate">Exam Bank</span>
              </div>
            </button>

            <button
              onClick={() => setCurrentTab('adaptive')}
              className="flex items-center gap-2.5 p-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl hover:border-amber-400 transition-all text-left shadow-2xs group min-h-[48px]"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
                <Target className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-slate-900 dark:text-white truncate">Adaptive Engine</span>
                <span className="block text-[10px] text-slate-500 truncate">Weakness Targets</span>
              </div>
            </button>
          </div>
        </section>

        {/* 3. HERO: CONTINUE LEARNING SECTION */}
        {summary.continueLearning && (
          <section className="bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-white dark:to-slate-900 border border-amber-500/30 rounded-3xl p-5 sm:p-7 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950">
                    Continue Learning
                  </span>
                  <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                    {summary.continueLearning.subject} · {summary.continueLearning.topic}
                  </span>
                </div>

                <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {summary.continueLearning.lessonTitle}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {summary.continueLearning.reason}
                </p>

                {/* Progress bar */}
                <div className="pt-2 max-w-md">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                    <span>Lesson progress: <strong>{summary.continueLearning.progressPercentage}%</strong></span>
                    <span>~{summary.continueLearning.estimatedRemainingMinutes} mins remaining</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${summary.continueLearning.progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5">
                <button
                  onClick={() => openLesson(summary.continueLearning!.lessonId)}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-sm shadow-xs transition-transform active:scale-95 whitespace-nowrap"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Continue Lesson</span>
                </button>

                <button
                  onClick={() => launchContextualTutor(summary.continueLearning!.topic, 'explain')}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Ask Tutor for Guidance</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* 4. TODAY'S PROGRESS & OVERALL PROGRESS (DUAL CARDS) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card A: Today's Progress */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    Today’s Progress
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-slate-400">
                  Daily Habit
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center my-4">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                  <span className="font-mono text-lg sm:text-xl font-bold text-slate-900 dark:text-white block">
                    {summary.todayProgress.lessonsCompletedToday}
                  </span>
                  <span className="text-[10px] text-slate-500">Lessons</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                  <span className="font-mono text-lg sm:text-xl font-bold text-amber-600 dark:text-amber-400 block">
                    {summary.todayProgress.questionsAnsweredToday}
                  </span>
                  <span className="text-[10px] text-slate-500">Questions</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                  <span className="font-mono text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400 block">
                    {summary.todayProgress.practiceCompletedToday}
                  </span>
                  <span className="text-[10px] text-slate-500">Practice</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                  <span className="font-mono text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400 block">
                    {summary.todayProgress.studyTimeMinutesToday}m
                  </span>
                  <span className="text-[10px] text-slate-500">Study Time</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                  <span className="font-mono text-lg sm:text-xl font-bold text-purple-600 dark:text-purple-400 block">
                    {summary.todayProgress.assessmentsCompletedToday}
                  </span>
                  <span className="text-[10px] text-slate-500">Assessments</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
              {summary.todayProgress.hasActivityToday
                ? 'Great consistency! Daily practice reinforces neural memory pathways.'
                : 'Start learning today to build your progress.'}
            </p>
          </div>

          {/* Card B: Overall Progress (Clear Separation: Completion vs Mastery) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    Overall Curriculum & Mastery
                  </h3>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Dual Metrics
                </span>
              </div>

              {/* Distinction Display */}
              <div className="space-y-3 my-2">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Curriculum Completion
                    </span>
                    <strong className="font-mono text-slate-900 dark:text-white">
                      {summary.overallProgress.curriculumCompletionPercentage}% ({summary.overallProgress.lessonsCompletedCount}/{summary.overallProgress.totalLessonsCount} Lessons)
                    </strong>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${summary.overallProgress.curriculumCompletionPercentage}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Average Topic Mastery (Heuristic)
                    </span>
                    <strong className="font-mono text-amber-600 dark:text-amber-400">
                      {summary.overallProgress.averageAssessmentScorePercentage}% ({summary.overallProgress.topicsMasteredCount} Mastered)
                    </strong>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${summary.overallProgress.averageAssessmentScorePercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Official Disclaimer */}
            <p className="text-[11px] text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
              * Completion denotes content reviewed. Mastery reflects evaluated question accuracy.
            </p>
          </div>
        </section>

        {/* 5. OFFICIAL DBE DISCLAIMER BANNER */}
        <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Educational Transparency Notice:</strong> Nexovian mastery scores are diagnostic learning analytics derived from Socratic quizzes and practice sessions. They guide adaptive recommendations and do not represent official Department of Basic Education (DBE) or school report card marks.
          </p>
        </div>

        {/* 6. MY SUBJECTS SECTION */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                CAPS Subjects
              </span>
              <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                My Subjects & Topic Mastery
              </h2>
            </div>
            <button
              onClick={() => setCurrentTab('school')}
              className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>Curriculum Tree</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {summary.subjects.map((sub) => (
              <div
                key={sub.id}
                onClick={() => setSelectedSubjectForDetail(sub)}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 hover:border-amber-400 dark:hover:border-amber-500 transition-all cursor-pointer group shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {sub.code}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      sub.masteryPercentage >= 75
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                        : sub.masteryPercentage >= 50
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                        : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                    }`}>
                      {sub.masteryPercentage}% Mastery
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {sub.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    Current: <strong>{sub.currentTopic}</strong>
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                      <span>Curriculum</span>
                      <span>{sub.completionPercentage}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${sub.completionPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-amber-700 dark:text-amber-400">
                  <span>Explore Subject</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. NEEDS PRACTICE & STRONG AREAS (DUAL SECTIONS) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column A: Needs Practice (Weak Area Detection with encouraging tone) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    Needs Practice
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    Encouraging target areas identified by Socratic quizzes
                  </span>
                </div>
              </div>
            </div>

            {summary.needsPractice.length === 0 ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  No weak areas flagged! You’re currently performing well across all assessed topics.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {summary.needsPractice.slice(0, 3).map((w, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-rose-200/60 dark:border-rose-900/40 bg-rose-50/30 dark:bg-rose-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                          {w.topic}
                        </h4>
                        <span className="font-mono text-xs font-bold text-rose-600 dark:text-rose-400">
                          {w.masteryScore}%
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                        {w.weakSubtopics && w.weakSubtopics.length > 0
                          ? `Target focus: ${w.weakSubtopics.join(', ')}`
                          : 'Practice foundational problem-solving steps.'}
                      </p>
                    </div>

                    <button
                      onClick={() => handleStartPractice(w.topic)}
                      className="shrink-0 flex items-center justify-center gap-1 px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg text-xs shadow-xs transition-transform active:scale-95"
                    >
                      <Target className="w-3.5 h-3.5" />
                      <span>Practice</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Column B: Strong Areas (Celebrate achievements) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    You’re Doing Well
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    High accuracy demonstrated in recent evaluations
                  </span>
                </div>
              </div>
            </div>

            {summary.strongAreas.length === 0 ? (
              <div className="text-center py-6">
                <Lightbulb className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Complete lessons and practice sessions to reveal your strongest skills.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {summary.strongAreas.slice(0, 3).map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40 bg-emerald-50/30 dark:bg-emerald-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                          {s.topic}
                        </h4>
                        <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          {s.masteryScore}%
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                        {s.trend === 'improving'
                          ? 'Consistent upward trajectory across quiz attempts.'
                          : 'High baseline accuracy on core curriculum problems.'}
                      </p>
                    </div>

                    <button
                      onClick={() => handleStartPractice(s.topic)}
                      className="shrink-0 flex items-center justify-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs shadow-xs transition-transform active:scale-95"
                    >
                      <span>Challenge</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 8. RECOMMENDED FOR YOU (REASON-DRIVEN ENGINE) */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Phase 5 Adaptive Engine
              </span>
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Recommended For You (With Explicit Reasons)
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {summary.recommendations.map((rec, rIdx) => (
              <div
                key={rIdx}
                className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {rec.priorityLabel}
                    </span>
                    <span>{rec.estimatedMinutes} mins</span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {rec.title}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    <strong className="text-amber-700 dark:text-amber-400">Why:</strong> {rec.reason}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">{rec.subject}</span>
                  <button
                    onClick={() => {
                      if (rec.targetTab === 'practice') {
                        setCurrentTab('practice');
                      } else if (rec.targetTab === 'tutor') {
                        setCurrentTab('tutor');
                      } else {
                        setCurrentTab('school');
                      }
                    }}
                    className="flex items-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline"
                  >
                    <span>Start Activity</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 9. ASSESSMENTS & EXAM ENGINE (PHASE 7 INTEGRATION) */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Phase 7 Assessment Hub
              </span>
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Upcoming & Recent Assessments
              </h3>
            </div>
            <button
              onClick={() => setCurrentTab('assessments')}
              className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
            >
              <span>View All Assessments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Upcoming Tests */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Upcoming Assigned Tests
              </span>
              {summary.upcomingAssessments.map((asm) => (
                <div
                  key={asm.id}
                  className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                        {asm.assessmentType}
                      </span>
                      <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        asm.status === 'COMPLETED'
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                          : asm.status === 'IN_PROGRESS'
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                          : asm.status === 'NEEDS_REVIEW'
                          ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}>
                        {asm.status.replace('_', ' ')}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {asm.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      {asm.subject} · {asm.topic} · {asm.durationMinutes || 45} mins · {asm.totalMarks} Marks {asm.dueDate ? `· Due: ${asm.dueDate}` : ''}
                    </p>
                    <span className="text-[10px] text-slate-400 block">
                      Attempts used: {asm.attemptsUsed} {asm.attemptLimit ? `/ ${asm.attemptLimit}` : ''}
                      {asm.latestScorePercentage !== undefined ? ` · Latest Score: ${asm.latestScorePercentage}%` : ''}
                    </span>
                  </div>

                  <button
                    onClick={() => setCurrentTab('assessments')}
                    className={`shrink-0 px-3.5 py-1.5 font-bold text-xs rounded-xl shadow-xs transition-transform active:scale-95 whitespace-nowrap self-end sm:self-auto ${
                      asm.status === 'IN_PROGRESS'
                        ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                        : asm.status === 'COMPLETED'
                        ? 'bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
                        : asm.status === 'NEEDS_REVIEW'
                        ? 'bg-rose-600 hover:bg-rose-500 text-white'
                        : 'bg-purple-600 hover:bg-purple-500 text-white'
                    }`}
                  >
                    {asm.status === 'IN_PROGRESS'
                      ? 'Continue'
                      : asm.status === 'COMPLETED'
                      ? 'View Result'
                      : asm.status === 'NEEDS_REVIEW'
                      ? 'Review Mistakes'
                      : 'Start'}
                  </button>
                </div>
              ))}
            </div>

            {/* Recent Results */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Recent Results & Feedback
              </span>
              {summary.recentAssessments.map((res) => (
                <div
                  key={res.attemptId}
                  className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        res.isPassed
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                          : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                      }`}>
                        {res.isPassed ? 'Passed' : 'Needs Review'}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {res.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Score: <strong className="text-slate-900 dark:text-white font-mono">{res.scorePercentage}%</strong> ({res.marksEarned}/{res.totalMarks} marks) · {res.markingStatus}
                    </p>
                  </div>

                  <button
                    onClick={() => setCurrentTab('assessments')}
                    className="shrink-0 px-3 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-lg transition-colors"
                  >
                    Review
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10. STUDY PLAN (PHASE 5 INTEGRATION) */}
        {summary.studyPlan && (
          <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Personalized Study Plan
                </span>
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  {summary.studyPlan.title}
                </h3>
              </div>
              <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                {summary.studyPlan.timeline}
              </span>
            </div>

            <div className="space-y-2.5">
              {summary.studyPlan.todayTasks.map((task) => {
                const isChecked = !!completedTaskIds[task.id];
                return (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between gap-3 cursor-pointer hover:border-amber-400 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-emerald-500 shrink-0" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-400 shrink-0" />
                      )}
                      <div>
                        <span className={`text-xs font-bold ${isChecked ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                          {task.title}
                        </span>
                        <p className="text-[11px] text-slate-500">
                          {task.subject} · {task.milestone}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs text-slate-400 shrink-0">
                      {task.estimatedMinutes} mins
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 11. ACHIEVEMENTS & REAL CRITERIA */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Milestones & Badges
              </span>
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Earned Achievements
              </h3>
            </div>
            <span className="text-xs text-slate-500">
              Triggered by genuine academic activity
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {summary.achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-3.5 rounded-xl border text-center flex flex-col items-center justify-between ${
                  ach.isUnlocked
                    ? ach.badgeColor
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-slate-400 opacity-60'
                }`}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center font-bold bg-white/80 dark:bg-slate-900/80 shadow-xs">
                    {ach.category === 'LEARNING' && <BookOpen className="w-5 h-5" />}
                    {ach.category === 'ASSESSMENT' && <Award className="w-5 h-5" />}
                    {ach.category === 'STREAK' && <Flame className="w-5 h-5" />}
                    {ach.category === 'MASTERY' && <Sparkles className="w-5 h-5" />}
                  </div>
                  <h4 className="font-bold text-xs line-clamp-1">{ach.title}</h4>
                  <p className="text-[10px] opacity-80 mt-0.5 line-clamp-2">{ach.description}</p>
                </div>

                <div className="mt-3 w-full">
                  <div className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-current rounded-full"
                      style={{ width: `${(ach.currentProgress / ach.targetProgress) * 100}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-bold block">
                    {ach.isUnlocked ? 'Unlocked ✓' : `${ach.currentProgress}/${ach.targetProgress}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 12. RECENT ACTIVITY TIMELINE */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
          <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mb-4">
            Recent Learning Activity
          </h3>

          <div className="space-y-3">
            {summary.recentActivity.map((act) => (
              <div
                key={act.id}
                className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white">{act.title}</h5>
                    <span className="text-[11px] text-slate-500">{act.subtitle}</span>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400">{act.timestamp}</span>
              </div>
            ))}
          </div>
        </section>
      </>
    )}

      </main>

      {/* MODALS */}
      {selectedSubjectForDetail && (
        <SubjectDetailModal
          subject={selectedSubjectForDetail}
          onClose={() => setSelectedSubjectForDetail(null)}
          onOpenTopicMastery={handleOpenTopicMastery}
          onStartPractice={handleStartPractice}
        />
      )}

      {selectedTopicDetail && (
        <TopicMasteryModal
          detail={selectedTopicDetail}
          onClose={() => setSelectedTopicDetail(null)}
          onPractice={handleStartPractice}
        />
      )}

      {isOnboardingOpen && (
        <NewLearnerOnboardingModal
          isOpen={isOnboardingOpen}
          onClose={() => setIsOnboardingOpen(false)}
          onComplete={() => {}}
        />
      )}

      {isNotificationsOpen && (
        <NotificationsModal
          notifications={summary.notifications}
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          onSelectAction={(tab) => setCurrentTab(tab as any)}
        />
      )}

      {isProfileModalOpen && (
        <LearnerProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
        />
      )}
    </div>
  );
};
