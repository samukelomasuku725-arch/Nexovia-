/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN ACADEMY - UNIFIED MY PROGRESS HUB VIEW
 * 
 * Clean, beginner-friendly progress tracking:
 * - Clear 4 tabs: Overview, Mastery Tree, Learning Trends, Certificates & Saved
 * - Quick "Back to Home" button for effortless return
 * - Shows real student progress, XP, streak, and mastery percentages
 * - Large mobile-friendly buttons and readable typography
 */

import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Award,
  TrendingUp,
  Target,
  Flame,
  CheckCircle2,
  Calendar,
  Layers,
  BookOpen,
  ArrowRight,
  Bookmark,
  Sparkles,
  FileText,
  Clock
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useAuth } from '../../context/AuthContext';
import { dashboardService } from '../../services/dashboard/dashboardService';
import { MyMasteryView } from '../dashboard/MyMasteryView';
import { ProgressTrendsView } from '../dashboard/ProgressTrendsView';

export const MyProgressHubView: React.FC = () => {
  const {
    userProgress,
    adaptiveProfile,
    setCurrentTab,
    openLesson,
    certificateToView,
    setCertificateToView
  } = useLearning();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<'overview' | 'mastery' | 'trends' | 'saved'>('overview');

  const summary = useMemo(() => {
    return dashboardService.buildDashboardSummary({
      user: user as any,
      userProgress,
      adaptiveProfile
    });
  }, [user, userProgress, adaptiveProfile]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 md:pb-16 text-slate-900 dark:text-slate-100">
      {/* 1. Header with Breadcrumb / Return to Home */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 sticky top-0 z-20 backdrop-blur-md bg-white/95 dark:bg-slate-900/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentTab('home')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Return to Home Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Home</span>
            </button>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />
            <div>
              <h1 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                My Progress
              </h1>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                Track your mastery, streak, and verified learning milestones
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentTab('learn')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-2xs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Continue Learning</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* Sub-tab Navigation */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/80 dark:bg-slate-800/80 rounded-2xl w-full sm:w-fit overflow-x-auto scrollbar-none shadow-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-500" />
            <span>Overview & Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('mastery')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'mastery'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-blue-500" />
            <span>Subject Mastery</span>
          </button>

          <button
            onClick={() => setActiveTab('trends')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'trends'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span>Learning Trends</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'saved'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-purple-500" />
            <span>Saved & Certificates</span>
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* 4 Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span>Overall Mastery</span>
                  <Target className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {summary.overallProgress.curriculumCompletionPercentage}%
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Based on quiz & practice results</p>
              </div>

              <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span>Completed Lessons</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {summary.overallProgress.lessonsCompletedCount}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Modules finished</p>
              </div>

              <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span>Learning Streak</span>
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {summary.streak.currentStreakDays} Days
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Longest: {summary.streak.longestStreakDays} days</p>
              </div>

              <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span>Total XP Earned</span>
                  <Award className="w-4 h-4 text-purple-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {userProgress.totalXp || 0}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Experience points</p>
              </div>
            </div>

            {/* Strengths & Focus Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    Strong Areas ({adaptiveProfile.strongAreas.length})
                  </h3>
                </div>
                {adaptiveProfile.strongAreas.length > 0 ? (
                  <div className="space-y-2">
                    {adaptiveProfile.strongAreas.map((area, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs"
                      >
                        <span className="font-bold text-emerald-900 dark:text-emerald-200">{area.topic}</span>
                        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          {Math.round(area.masteryScore)}%
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 py-4">Complete a practice quiz to identify your strengths.</p>
                )}
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4 text-rose-500" />
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    Areas to Review ({adaptiveProfile.weakAreas.length})
                  </h3>
                </div>
                {adaptiveProfile.weakAreas.length > 0 ? (
                  <div className="space-y-2">
                    {adaptiveProfile.weakAreas.map((area, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs"
                      >
                        <span className="font-bold text-rose-900 dark:text-rose-200">{area.topic}</span>
                        <button
                          onClick={() => setCurrentTab('practice')}
                          className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-[10px]"
                        >
                          Practice
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 py-4">No weak areas identified yet! Keep practicing.</p>
                )}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-4">
                Recent Achievements
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {summary.achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className={`p-3.5 rounded-2xl border text-center ${
                      ach.isUnlocked
                        ? 'border-amber-400 bg-amber-50/50 dark:bg-amber-950/20'
                        : 'border-slate-200 dark:border-slate-800 opacity-60'
                    }`}
                  >
                    <div className="text-2xl mb-1">{ach.icon}</div>
                    <span className="block text-xs font-bold text-slate-900 dark:text-white truncate">
                      {ach.title}
                    </span>
                    <span className="block text-[10px] text-slate-500 truncate mt-0.5">
                      {ach.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Mastery Tree */}
        {activeTab === 'mastery' && (
          <MyMasteryView
            masteryTrees={summary.masteryTrees}
            onOpenTopicDetail={() => {}}
            onPracticeTopic={() => setCurrentTab('practice')}
          />
        )}

        {/* Tab 3: Trends */}
        {activeTab === 'trends' && (
          <ProgressTrendsView trends={summary.progressTrends} />
        )}

        {/* Tab 4: Saved & Certificates */}
        {activeTab === 'saved' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs">
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                Saved Notes & Documents
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Access your saved lesson notes and academic voice-to-document reports.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setCurrentTab('saved')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 font-bold text-xs rounded-xl transition-colors"
                >
                  View Bookmarked Lessons & Notes
                </button>
                <button
                  onClick={() => setCurrentTab('academicVoice')}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-colors"
                >
                  Open Voice-to-Document Library
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
