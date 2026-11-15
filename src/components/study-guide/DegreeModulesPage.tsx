/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * DEGREE - MODULES STUDENTS FAIL MOST (/study-guide/degree-modules)
 * Exact same Nexovian dark blue + gold layout and trial/subscription lock.
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
import { DEGREE_CHAPTERS } from '../../data/studyGuideContent';
import { isUserActive, startTwoDayFreeTrialCheckout } from '../../services/paystackService';
import { useStudyGuideProgress } from '../../utils/studyGuideProgress';

type FacultyFilter = 'ALL' | 'BCom' | 'BEd' | 'LLB' | 'Nursing' | 'Psychology' | 'IT';

const FACULTY_TABS: FacultyFilter[] = ['ALL', 'BCom', 'BEd', 'LLB', 'Nursing', 'Psychology', 'IT'];

export function getDegreeFaculty(title: string): Exclude<FacultyFilter, 'ALL'> {
  const lower = title.toLowerCase();
  if (lower.startsWith('bcom')) return 'BCom';
  if (lower.startsWith('bed')) return 'BEd';
  if (lower.startsWith('llb')) return 'LLB';
  if (lower.startsWith('nursing')) return 'Nursing';
  if (lower.includes('psychology') || lower.includes('social work')) return 'Psychology';
  return 'IT';
}

export const DegreeModulesPage: React.FC = () => {
  const { setCurrentTab } = useLearning();
  const { user, isAuthenticated } = useAuth();
  const hasAccess = isAuthenticated && isUserActive(user);
  const { progress } = useStudyGuideProgress();
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const completedInSubject = DEGREE_CHAPTERS.filter((ch) =>
    progress.completedSlugs.includes(ch.slug)
  ).length;

  const facultyCounts = useMemo(() => {
    const counts: Record<FacultyFilter, number> = {
      ALL: DEGREE_CHAPTERS.length,
      BCom: 0,
      BEd: 0,
      LLB: 0,
      Nursing: 0,
      Psychology: 0,
      IT: 0
    };
    DEGREE_CHAPTERS.forEach((ch) => {
      const fac = getDegreeFaculty(ch.title);
      counts[fac] += 1;
    });
    return counts;
  }, []);

  const filteredChapters = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return DEGREE_CHAPTERS.filter((ch) => {
      const fac = getDegreeFaculty(ch.title);
      if (selectedFaculty !== 'ALL' && fac !== selectedFaculty) return false;
      if (!q) return true;
      return (
        ch.title.toLowerCase().includes(q) ||
        ch.shortDescription.toLowerCase().includes(q) ||
        fac.toLowerCase().includes(q) ||
        ch.summary.some((s) => s.toLowerCase().includes(q)) ||
        ch.formulas.some(
          (f) => f.expression.toLowerCase().includes(q) || f.meaning.toLowerCase().includes(q)
        )
      );
    });
  }, [selectedFaculty, searchQuery]);

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

  const handleStartTrial = () => {
    startTwoDayFreeTrialCheckout({
      user,
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
            Exam &amp; Study Tips
          </a>
        </div>

        {/* Header */}
        <div className="bg-[#0D1E42] border border-[#FFD400]/40 rounded-3xl p-5 sm:p-8 mb-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFD400]/15 border border-[#FFD400]/50 text-[#FFD400] text-xs font-bold uppercase tracking-wider">
              <span>🎓 DEGREE — MODULES STUDENTS FAIL MOST • {DEGREE_CHAPTERS.length} Modules</span>
            </span>
            <span className="text-xs font-semibold text-slate-300">
              {completedInSubject}/{DEGREE_CHAPTERS.length} Completed
            </span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-white mb-2 break-words">
            Degree Killer Modules (BCom, BEd, LLB, Nursing, Psych &amp; IT)
          </h1>
          <p className="text-sm text-slate-300">
            Filter by faculty or search any module for simple summary notes, key formulas &amp; concepts, step-by-step worked example, and 5 practice questions with hidden answers.
          </p>

          {!hasAccess && (
            <div className="mt-5 p-4 rounded-2xl bg-[#071530] border border-[#FFD400]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <Lock className="w-4 h-4 text-[#FFD400] shrink-0" />
                <span>Start 2-Day Free Trial to unlock all {DEGREE_CHAPTERS.length} Degree chapters.</span>
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

        {/* Search & Faculty Filter Bar */}
        <div className="bg-[#0D1E42] border border-[#1E3A6E] rounded-3xl p-4 sm:p-5 mb-6 shadow-lg space-y-4">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#FFD400] absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Degree modules (e.g. Financial Accounting, LLB Constitutional, Pharmacology, SQL)..."
              aria-label="Search Degree modules"
              className="w-full min-h-[48px] pl-11 pr-10 py-2.5 rounded-2xl bg-[#061128] border border-[#1E3A6E] focus:border-[#FFD400] focus:outline-none text-sm text-white placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear Degree search"
                className="absolute right-3 w-8 h-8 rounded-xl bg-[#0D2758] hover:bg-[#163875] text-slate-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {FACULTY_TABS.map((fac) => {
              const isSelected = selectedFaculty === fac;
              return (
                <button
                  key={fac}
                  type="button"
                  onClick={() => setSelectedFaculty(fac)}
                  className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#FFD400] text-black shadow-md scale-[1.03]'
                      : 'bg-[#061128] text-slate-200 border border-[#1E3A6E] hover:border-[#FFD400]/60 hover:text-[#FFD400]'
                  }`}
                >
                  {fac === 'ALL' ? `All (${facultyCounts.ALL})` : `${fac} (${facultyCounts[fac]})`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Chapters List */}
        {filteredChapters.length === 0 ? (
          <div className="bg-[#0D1E42] border border-[#1E3A6E] rounded-2xl p-8 text-center text-sm text-slate-300 space-y-3">
            <p>No Degree modules matched &ldquo;{searchQuery}&rdquo; in {selectedFaculty}.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedFaculty('ALL');
                setSearchQuery('');
              }}
              className="min-h-[44px] px-5 py-2 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-xs cursor-pointer"
            >
              Show All {DEGREE_CHAPTERS.length} Degree Modules
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredChapters.map((chapter) => {
              const path = `/study-guide/degree-modules/${chapter.slug}`;
              const isCompleted = progress.completedSlugs.includes(chapter.slug);
              const faculty = getDegreeFaculty(chapter.title);
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
                          {chapter.subjectIcon}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-[#FFD400] text-black font-mono text-xs font-black">
                          {faculty}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-[#FFD400]/15 text-[#FFD400] font-mono text-xs font-bold border border-[#FFD400]/30">
                          Module {chapter.chapterNumber}
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
                        {chapter.title}
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

export default DegreeModulesPage;
