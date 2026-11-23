/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GRADE 12 PHYSICS STUDY GUIDE CHAPTER LIST (/study-guide/physics-grade-12)
 */

import React from 'react';
import { ArrowLeft, ArrowRight, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { PHYSICS_CHAPTERS } from '../../data/studyGuideContent';
import { isUserActive, startTwoDayFreeTrialCheckout } from '../../services/paystackService';
import { supabase } from '../../supabase';
import { useStudyGuideProgress } from '../../utils/studyGuideProgress';

export const PhysicsGrade12Page: React.FC = () => {
  const { setCurrentTab } = useLearning();
  const { user, isAuthenticated } = useAuth();
  const hasAccess = isAuthenticated && isUserActive(user);
  const { progress } = useStudyGuideProgress();
  const completedInSubject = PHYSICS_CHAPTERS.filter((ch) =>
    progress.completedSlugs.includes(ch.slug)
  ).length;

  const navigate = (
    tab: 'studyGuide' | 'studyGuideChapter' | 'studyGuideExamTips' | 'login',
    path: string
  ) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentTab(tab);
  };

  const handleStartTrial = async () => {
    const {
      data: { user: authUser }
    } = await supabase.auth.getUser();
    if (!authUser) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login?next=' + encodeURIComponent(window.location.pathname);
      }
      return;
    }

    await startTwoDayFreeTrialCheckout({
      user: { id: authUser.id, email: authUser.email },
      onRequireAuth: () => navigate('login', '/login')
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#061128] via-[#0A1F44] to-[#050D1E] text-white py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Top Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-7">
          <a
            href="/study-guide"
            onClick={(e) => {
              e.preventDefault();
              navigate('studyGuide', '/study-guide');
            }}
            className="inline-flex items-center gap-2 min-h-[44px] px-3 py-2 rounded-xl bg-[#0D1E42] border border-[#1E3A6E] hover:border-[#FFD400] text-xs sm:text-sm font-bold text-slate-200 hover:text-[#FFD400] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>Back to Study Guide Home</span>
          </a>

          <a
            href="/study-guide/matric-exam-tips"
            onClick={(e) => {
              e.preventDefault();
              navigate('studyGuideExamTips', '/study-guide/matric-exam-tips');
            }}
            className="inline-flex items-center min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0D1E42] border border-[#FFD400]/40 hover:border-[#FFD400] text-xs sm:text-sm font-bold text-[#FFD400] transition-colors cursor-pointer"
          >
            Matric Exam Tips
          </a>
        </div>

        {/* Header */}
        <div className="bg-[#0D1E42] border border-[#FFD400]/40 rounded-3xl p-6 sm:p-8 mb-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFD400]/15 border border-[#FFD400]/50 text-[#FFD400] text-xs font-bold uppercase tracking-wider">
              <span>⚡ Grade 12 Physical Sciences</span>
            </span>
            <span className="text-xs font-semibold text-slate-300">
              {completedInSubject}/{PHYSICS_CHAPTERS.length} Completed
            </span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white mb-2">
            Physics Chapters
          </h1>
          <p className="text-sm text-slate-300">
            Select a chapter below for simple summary notes, key formulas, worked example, and 5 practice questions with answers.
          </p>

          {!hasAccess && (
            <div className="mt-5 p-4 rounded-2xl bg-[#071530] border border-[#FFD400]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <Lock className="w-4 h-4 text-[#FFD400] shrink-0" />
                <span>Start 2-Day Free Trial to unlock all Physics chapters.</span>
              </div>
              <button
                type="button"
                onClick={handleStartTrial}
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-sm whitespace-nowrap cursor-pointer shadow-md"
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Start 2-Day Free Trial to unlock</span>
              </button>
            </div>
          )}
        </div>

        {/* Chapters List (1 to 6) */}
        <div className="space-y-4">
          {PHYSICS_CHAPTERS.map((chapter) => {
            const path = `/study-guide/physics-grade-12/${chapter.slug}`;
            const isCompleted = progress.completedSlugs.includes(chapter.slug);
            return (
              <a
                key={chapter.slug}
                href={path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate('studyGuideChapter', path);
                }}
                className="group block bg-[#0D1E42] hover:bg-[#122859] border border-[#1E3A6E] hover:border-[#FFD400] rounded-2xl p-5 sm:p-6 transition-all duration-200 shadow-md cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#FFD400]/15 text-[#FFD400] font-mono text-xs font-bold border border-[#FFD400]/30">
                        Chapter {chapter.chapterNumber}
                      </span>
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Completed</span>
                        </span>
                      ) : hasAccess ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Unlocked</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300">
                          <Lock className="w-3 h-3" />
                          <span>Start 2-Day Free Trial to unlock</span>
                        </span>
                      )}
                    </div>
                    <h2 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-[#FFD400] transition-colors break-words">
                      Chapter {chapter.chapterNumber}: {chapter.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 break-words">
                      {chapter.shortDescription}
                    </p>
                  </div>

                  <div className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FFD400] group-hover:bg-yellow-400 text-black font-black text-sm whitespace-nowrap shrink-0 shadow-sm">
                    <span>{hasAccess ? 'Open Chapter' : 'Unlock Chapter'}</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PhysicsGrade12Page;
