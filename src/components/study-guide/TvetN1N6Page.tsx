/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * TVET N1-N6 (NATED) STUDY GUIDE CHAPTER LIST (/study-guide/tvet-n1-n6)
 * Exact same Nexovian dark blue + gold layout and trial/subscription lock.
 * Displays all 36 TVET N1-N6 subjects with N-level filters, trade icons, and search.
 */

import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Lock,
  Sparkles,
  CheckCircle2,
  Search,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { TVET_CHAPTERS } from '../../data/studyGuideContent';
import { isUserActive, startTwoDayFreeTrialCheckout } from '../../services/paystackService';
import { supabase } from '../../supabase';
import { useStudyGuideProgress } from '../../utils/studyGuideProgress';

type NLevelFilter = 'ALL' | 'N1' | 'N2' | 'N3' | 'N4' | 'N5' | 'N6';

const N_LEVEL_TABS: NLevelFilter[] = ['ALL', 'N1', 'N2', 'N3', 'N4', 'N5', 'N6'];

export function getTvetNLevel(title: string): Exclude<NLevelFilter, 'ALL'> {
  const match = title.match(/\b(N[1-6])\b/i);
  if (match) {
    return match[1].toUpperCase() as Exclude<NLevelFilter, 'ALL'>;
  }
  return 'N1';
}

export function getTvetSubjectMeta(title: string): { icon: string; trade: string } {
  const lower = title.toLowerCase();
  if (lower.includes('mathematics') || lower.includes('maths')) {
    return { icon: '📐', trade: 'Mathematics' };
  }
  if (lower.includes('engineering science')) {
    return { icon: '⚙️', trade: 'Engineering Science' };
  }
  if (lower.includes('industrial electronics')) {
    return { icon: '🔌', trade: 'Industrial Electronics' };
  }
  if (lower.includes('electrical trade theory')) {
    return { icon: '⚡', trade: 'Electrical Trade Theory' };
  }
  if (lower.includes('electrotechnics')) {
    return { icon: '⚡', trade: 'Electrotechnics' };
  }
  if (lower.includes('fitting & machining')) {
    return { icon: '🔩', trade: 'Fitting & Machining' };
  }
  if (lower.includes('mechanotechnics')) {
    return { icon: '⚙️', trade: 'Mechanotechnics' };
  }
  if (lower.includes('motor trade theory')) {
    return { icon: '🚗', trade: 'Motor Trade Theory' };
  }
  if (lower.includes('mechanical draughting')) {
    return { icon: '📏', trade: 'Mechanical Draughting' };
  }
  if (lower.includes('power machines')) {
    return { icon: '🔥', trade: 'Power Machines' };
  }
  return { icon: '🛠️', trade: 'TVET NATED' };
}

export const TvetN1N6Page: React.FC = () => {
  const { setCurrentTab } = useLearning();
  const { user, isAuthenticated } = useAuth();
  const hasAccess = isAuthenticated && isUserActive(user);
  const { progress } = useStudyGuideProgress();
  const [selectedLevel, setSelectedLevel] = useState<NLevelFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const completedInSubject = TVET_CHAPTERS.filter((ch) =>
    progress.completedSlugs.includes(ch.slug)
  ).length;

  const levelCounts = useMemo(() => {
    const counts: Record<NLevelFilter, number> = {
      ALL: TVET_CHAPTERS.length,
      N1: 0,
      N2: 0,
      N3: 0,
      N4: 0,
      N5: 0,
      N6: 0
    };
    TVET_CHAPTERS.forEach((ch) => {
      const lvl = getTvetNLevel(ch.title);
      counts[lvl] += 1;
    });
    return counts;
  }, []);

  const filteredChapters = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return TVET_CHAPTERS.filter((ch) => {
      const lvl = getTvetNLevel(ch.title);
      if (selectedLevel !== 'ALL' && lvl !== selectedLevel) return false;
      if (!q) return true;
      return (
        ch.title.toLowerCase().includes(q) ||
        ch.shortDescription.toLowerCase().includes(q) ||
        lvl.toLowerCase().includes(q) ||
        ch.summary.some((s) => s.toLowerCase().includes(q)) ||
        ch.formulas.some(
          (f) => f.expression.toLowerCase().includes(q) || f.meaning.toLowerCase().includes(q)
        )
      );
    });
  }, [selectedLevel, searchQuery]);

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
    <div className="min-h-screen bg-gradient-to-b from-[#061128] via-[#0A1F44] to-[#050D1E] text-white py-8 sm:py-10 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
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
        <div className="bg-[#0D1E42] border border-[#FFD400]/40 rounded-3xl p-5 sm:p-8 mb-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFD400]/15 border border-[#FFD400]/50 text-[#FFD400] text-xs font-bold uppercase tracking-wider">
              <span>🛠️ TVET N1-N6 (NATED) • 36 Subjects</span>
            </span>
            <span className="text-xs font-semibold text-slate-300">
              {completedInSubject}/{TVET_CHAPTERS.length} Completed
            </span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-white mb-2 break-words">
            TVET N1-N6 Chapters (36 Subjects)
          </h1>
          <p className="text-sm text-slate-300">
            Filter by N-Level (N1 to N6) or search any trade subject for simple summary notes, key formulas, worked example, and 5 practice questions with hidden answers.
          </p>

          {!hasAccess && (
            <div className="mt-5 p-4 rounded-2xl bg-[#071530] border border-[#FFD400]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <Lock className="w-4 h-4 text-[#FFD400] shrink-0" />
                <span>Start 2-Day Free Trial to unlock all 36 TVET N1-N6 chapters.</span>
              </div>
              <button
                type="button"
                onClick={handleStartTrial}
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-sm whitespace-nowrap cursor-pointer shadow-md transition-transform active:scale-95"
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Start 2-Day Free Trial to unlock</span>
              </button>
            </div>
          )}
        </div>

        {/* Filter by N-Level & Search */}
        <div className="bg-[#0D1E42] border border-[#1E3A6E] rounded-3xl p-4 sm:p-5 mb-6 shadow-lg space-y-4">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#FFD400] absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search TVET N1–N6 subjects (e.g. N4 Electrotechnics, Fitting, Power Machines)..."
              aria-label="Search TVET N1-N6 chapters"
              className="w-full min-h-[48px] pl-11 pr-10 py-2.5 rounded-2xl bg-[#061128] border border-[#1E3A6E] focus:border-[#FFD400] focus:outline-none text-sm text-white placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear TVET search"
                className="absolute right-3 w-8 h-8 rounded-xl bg-[#0D2758] hover:bg-[#163875] text-slate-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {N_LEVEL_TABS.map((lvl) => {
              const isSelected = selectedLevel === lvl;
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedLevel(lvl)}
                  className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#FFD400] text-black shadow-md scale-[1.03]'
                      : 'bg-[#061128] text-slate-200 border border-[#1E3A6E] hover:border-[#FFD400]/60 hover:text-[#FFD400]'
                  }`}
                >
                  {lvl === 'ALL' ? `All (${levelCounts.ALL})` : `${lvl} (${levelCounts[lvl]})`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Chapters List */}
        {filteredChapters.length === 0 ? (
          <div className="bg-[#0D1E42] border border-[#1E3A6E] rounded-2xl p-8 text-center text-sm text-slate-300 space-y-3">
            <p>No TVET subjects matched &ldquo;{searchQuery}&rdquo; in {selectedLevel}.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedLevel('ALL');
                setSearchQuery('');
              }}
              className="min-h-[44px] px-5 py-2 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-xs cursor-pointer"
            >
              Show All 36 TVET Subjects
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredChapters.map((chapter) => {
              const path = `/study-guide/tvet-n1-n6/${chapter.slug}`;
              const isCompleted = progress.completedSlugs.includes(chapter.slug);
              const nLevel = getTvetNLevel(chapter.title);
              const subjectMeta = getTvetSubjectMeta(chapter.title);
              const displayIcon =
                chapter.subjectIcon && chapter.subjectIcon !== '🛠️'
                  ? chapter.subjectIcon
                  : subjectMeta.icon;

              return (
                <a
                  key={chapter.slug}
                  href={path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('studyGuideChapter', path);
                  }}
                  className="group block bg-[#0D1E42] hover:bg-[#122859] border border-[#1E3A6E] hover:border-[#FFD400] rounded-2xl p-5 sm:p-6 transition-all duration-200 shadow-md hover:-translate-y-0.5 cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-[#061128] border border-[#FFD400]/40 text-lg shrink-0"
                          aria-hidden="true"
                        >
                          {displayIcon}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-[#FFD400] text-black font-mono text-xs font-black">
                          {nLevel}
                        </span>
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

                    <div className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FFD400] group-hover:bg-yellow-400 text-black font-black text-sm whitespace-nowrap shrink-0 shadow-sm transition-colors">
                      <span>{hasAccess ? 'Open Chapter' : 'Unlock Chapter'}</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TvetN1N6Page;
