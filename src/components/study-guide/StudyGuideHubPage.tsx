/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GRADE 12 STUDY GUIDE HOME PAGE (/study-guide)
 * Nexovian dark blue + gold theme
 * Includes:
 * - Search bar (across all 20 chapters & 4 subjects)
 * - Overall Progress bar (X / 20 chapters completed)
 * - "Continue where you left off" quick resume card
 * - All 4 Subjects (Physics, Life Sciences, Maths Literacy, Mathematics)
 * - Matric Exam Tips card (/study-guide/matric-exam-tips)
 * - Mobile-first large touch targets (min-h-[48px])
 */

import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Lock,
  PlayCircle,
  Search,
  Sparkles,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import {
  ALL_STUDY_GUIDE_CHAPTERS,
  DEGREE_CHAPTERS,
  findStudyGuideChapter,
  LIFE_SCIENCES_CHAPTERS,
  MATHS_CHAPTERS,
  MATHS_LITERACY_CHAPTERS,
  NCV_CHAPTERS,
  PHYSICS_CHAPTERS,
  TVET_CHAPTERS,
  StudyGuideChapterData
} from '../../data/studyGuideContent';
import { isUserActive, syncSubscriptionStatus } from '../../services/paystackService';
import { supabase } from '../../supabase';
import { useStudyGuideProgress } from '../../utils/studyGuideProgress';

export const StudyGuideHubPage: React.FC = () => {
  const { setCurrentTab } = useLearning();
  const { user, isAuthenticated } = useAuth();
  const [hasAccess, setHasAccess] = useState<boolean>(() => isAuthenticated && isUserActive(user));
  const { progress, totalChapters, completedCount } = useStudyGuideProgress();

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let active = true;
    const refresh = () => {
      if (active) setHasAccess(Boolean(isAuthenticated && isUserActive(user)));
    };
    refresh();
    if (isAuthenticated && user?.email) {
      syncSubscriptionStatus(user.email, user.id).then(refresh).catch(() => {});
    }
    window.addEventListener('nexovian-subscription-updated', refresh);
    return () => {
      active = false;
      window.removeEventListener('nexovian-subscription-updated', refresh);
    };
  }, [isAuthenticated, user]);

  const navigate = (
    tab:
      | 'landing'
      | 'studyGuidePhysics'
      | 'studyGuideLifeSciences'
      | 'studyGuideMathsLiteracy'
      | 'studyGuideMaths'
      | 'studyGuideTvet'
      | 'studyGuideDegree'
      | 'studyGuideNcv'
      | 'studyGuideChapter'
      | 'studyGuideExamTips',
    path: string
  ) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentTab(tab);
  };

  const progressPercent = totalChapters > 0 ? Math.round((completedCount / totalChapters) * 100) : 0;

  const continueChapter: StudyGuideChapterData = useMemo(() => {
    if (progress.lastChapterSlug) {
      const found = findStudyGuideChapter(progress.lastChapterSlug);
      if (found) return found;
    }
    return PHYSICS_CHAPTERS[0];
  }, [progress.lastChapterSlug]);

  const isResumeSaved = Boolean(progress.lastChapterSlug);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return ALL_STUDY_GUIDE_CHAPTERS.filter((ch) => {
      return (
        ch.title.toLowerCase().includes(q) ||
        ch.subjectLabel.toLowerCase().includes(q) ||
        ch.shortDescription.toLowerCase().includes(q) ||
        ch.summary.some((s) => s.toLowerCase().includes(q)) ||
        ch.formulas.some(
          (f) => f.expression.toLowerCase().includes(q) || f.meaning.toLowerCase().includes(q)
        )
      );
    });
  }, [searchQuery]);

  const subjectCards = [
    {
      id: 'physics',
      icon: '⚡',
      title: '⚡ Physics',
      chapters: PHYSICS_CHAPTERS,
      tab: 'studyGuidePhysics' as const,
      path: '/study-guide/physics-grade-12',
      cta: 'Open Physics Chapters',
      description:
        'Momentum & Impulse, Vertical Projectile Motion, Work, Energy & Power, Electrostatics, Electrodynamics, and Photoelectric Effect.'
    },
    {
      id: 'life-sciences',
      icon: '🧬',
      title: '🧬 Life Sciences',
      chapters: LIFE_SCIENCES_CHAPTERS,
      tab: 'studyGuideLifeSciences' as const,
      path: '/study-guide/life-sciences-grade-12',
      cta: 'Open Life Sciences Chapters',
      description:
        'DNA - Code of Life, Meiosis, Genetics & Inheritance, and Evolution - Human Evolution.'
    },
    {
      id: 'maths',
      icon: '📐',
      title: '📐 Mathematics',
      chapters: MATHS_CHAPTERS,
      tab: 'studyGuideMaths' as const,
      path: '/study-guide/maths-grade-12',
      cta: 'Open Mathematics Chapters',
      description:
        'Algebra, Functions, Trigonometry, Geometry & Analytical Geometry, and Probability & Statistics.'
    },
    {
      id: 'maths-literacy',
      icon: '📊',
      title: '📊 Maths Literacy',
      chapters: MATHS_LITERACY_CHAPTERS,
      tab: 'studyGuideMathsLiteracy' as const,
      path: '/study-guide/maths-literacy-grade-12',
      cta: 'Open Maths Literacy Chapters',
      description:
        'Finance, Data Handling, Measurement, Maps & Plans, and Probability & Tariffs.'
    },
    {
      id: 'tvet-n1-n6',
      icon: '🛠️',
      title: '🛠️ TVET N1-N6 (36 Subjects)',
      chapters: TVET_CHAPTERS,
      tab: 'studyGuideTvet' as const,
      path: '/study-guide/tvet-n1-n6',
      cta: 'Open All 36 TVET Chapters',
      description:
        'All 36 TVET N1–N6 subjects: Mathematics, Eng. Science, Electrotechnics, Mechanotechnics, Electronics, Draughting, Power Machines & Trades.'
    },
    {
      id: 'degree-modules',
      icon: '🎓',
      title: '🎓 Degree — Modules Students Fail Most',
      chapters: DEGREE_CHAPTERS,
      tab: 'studyGuideDegree' as const,
      path: '/study-guide/degree-modules',
      cta: 'Open Degree Killer Modules',
      description:
        'BCom Accounting & Economics, BEd, LLB Law, Nursing, Social Work / Psychology (Research & Development) & IT (Programming, SQL, SDLC).'
    },
    {
      id: 'ncv-level-2-3-4',
      icon: '📋',
      title: '📋 NCV — Level 2, 3, 4 (All 7 Programmes)',
      chapters: NCV_CHAPTERS,
      tab: 'studyGuideNcv' as const,
      path: '/study-guide/ncv-level-2-3-4',
      cta: 'Open NCV Level 2–4 Chapters',
      description:
        'Office Admin, Finance & Accounting, Electrical, Civil & Building Construction, Engineering & Related Design, Information Technology, and Tourism & Hospitality.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#061128] via-[#0A1F44] to-[#050D1E] text-white py-8 sm:py-10 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Back link */}
        <div>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('landing', '/');
            }}
            className="inline-flex items-center gap-2 min-h-[44px] px-3 py-2 rounded-xl bg-[#0D1E42] border border-[#1E3A6E] hover:border-[#FFD400] text-xs sm:text-sm font-bold text-slate-200 hover:text-[#FFD400] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>Back to Home</span>
          </a>
        </div>

        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D2758] border border-[#FFD400]/50 text-[#FFD400] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>Interactive In-App Study Guide • {totalChapters} Chapters</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Grade 12, TVET &amp; Degree Study Guide
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Simple English summaries, key formulas &amp; diagrams, step-by-step worked examples, and 5 practice questions with hidden answers for every chapter.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-[#0D1E42] border-2 border-[#FFD400]/45 rounded-3xl p-4 sm:p-5 shadow-xl space-y-3">
          <label htmlFor="study-guide-search" className="sr-only">
            Search all {totalChapters} chapters across Grade 12 CAPS, TVET N1-N6, NCV Level 2-4, and Degree Killer Modules
          </label>
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-[#FFD400] absolute left-4 pointer-events-none" />
            <input
              id="study-guide-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, formulas, or modules (e.g. Momentum, N4 Electrotechnics, Office Data Processing, Financial Accounting)..."
              className="w-full min-h-[52px] pl-12 pr-12 py-3 rounded-2xl bg-[#061128] border border-[#1E3A6E] focus:border-[#FFD400] focus:outline-none focus:ring-2 focus:ring-[#FFD400]/30 text-base text-white placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 w-9 h-9 rounded-xl bg-[#0D2758] hover:bg-[#163875] text-slate-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {searchQuery.trim() && (
            <div className="pt-2 space-y-2.5">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
                {searchResults.length}{' '}
                {searchResults.length === 1 ? 'Chapter Found' : 'Chapters Found'}
              </div>

              {searchResults.length === 0 ? (
                <div className="bg-[#071530] border border-[#1E3A6E] rounded-2xl p-5 text-sm text-slate-300 text-center">
                  No chapters matched &ldquo;{searchQuery}&rdquo;. Try searching &ldquo;Momentum&rdquo;, &ldquo;Genetics&rdquo;, &ldquo;Finance&rdquo;, or &ldquo;Algebra&rdquo;.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                  {searchResults.map((ch) => {
                    const chPath = `${ch.backPath}/${ch.slug}`;
                    const isDone = progress.completedSlugs.includes(ch.slug);
                    return (
                      <a
                        key={ch.slug}
                        href={chPath}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate('studyGuideChapter', chPath);
                        }}
                        className="group bg-[#071530] hover:bg-[#102552] border border-[#1E3A6E] hover:border-[#FFD400] rounded-2xl p-4 flex flex-col justify-between gap-3 transition-all cursor-pointer"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-2 text-[11px] font-bold">
                            <span className="text-[#FFD400]">
                              {ch.subjectIcon} {ch.subjectLabel} • Ch {ch.chapterNumber}
                            </span>
                            {isDone ? (
                              <span className="inline-flex items-center gap-1 text-emerald-300">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Done</span>
                              </span>
                            ) : !hasAccess ? (
                              <span className="inline-flex items-center gap-1 text-amber-300">
                                <Lock className="w-3 h-3" />
                                <span>Trial</span>
                              </span>
                            ) : null}
                          </div>
                          <div className="font-display font-bold text-sm sm:text-base text-white group-hover:text-[#FFD400] transition-colors">
                            {ch.title}
                          </div>
                        </div>
                        <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#FFD400]">
                          <span>{hasAccess ? 'Open Chapter' : 'Unlock Chapter'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Progress Bar + Continue Where You Left Off */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {/* Progress Tracker Card */}
          <div className="bg-[#0D1E42] border border-[#1E3A6E] rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
                  Your Study Progress
                </div>
                <h2 className="font-display font-black text-xl sm:text-2xl text-white mt-1">
                  {completedCount} of {totalChapters} Chapters Completed
                </h2>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-[#FFD400]/15 border border-[#FFD400]/50 text-[#FFD400] font-mono font-black text-sm shrink-0">
                {progressPercent}%
              </div>
            </div>

            <div className="space-y-2">
              <div
                className="w-full h-4 rounded-full bg-[#061128] border border-[#1E3A6E] overflow-hidden"
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Study Guide completion progress"
              >
                <div
                  className="h-full bg-gradient-to-r from-[#FFB612] to-[#FFD400] transition-all duration-500 rounded-full"
                  style={{ width: `${Math.max(progressPercent, completedCount > 0 ? 5 : 0)}%` }}
                />
              </div>
              <p className="text-xs text-slate-300">
                {completedCount === 0
                  ? 'Open any chapter and tap "Mark Chapter Complete" to track your exam readiness.'
                  : completedCount === totalChapters
                  ? `All ${totalChapters} chapters completed! Review Matric Exam Tips and DBE Past Papers to lock in top marks.`
                  : `${totalChapters - completedCount} chapters left across all ${subjectCards.length} subjects.`}
              </p>
            </div>
          </div>

          {/* Continue Where You Left Off Card */}
          <div className="bg-[#0D1E42] border-2 border-[#FFD400]/60 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
                <PlayCircle className="w-4 h-4" />
                <span>
                  {isResumeSaved ? 'Continue Where You Left Off' : 'Start Here • Recommended Chapter'}
                </span>
              </div>
              <h2 className="font-display font-black text-lg sm:text-xl text-white leading-snug">
                {continueChapter.subjectIcon} {continueChapter.subjectLabel} — Chapter{' '}
                {continueChapter.chapterNumber}: {continueChapter.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 line-clamp-2">
                {continueChapter.shortDescription}
              </p>
            </div>

            <a
              href={`${continueChapter.backPath}/${continueChapter.slug}`}
              onClick={async (e) => {
                e.preventDefault();
                const chapterPath = `${continueChapter.backPath}/${continueChapter.slug}`;
                if (!hasAccess) {
                  const {
                    data: { user: authUser }
                  } = await supabase.auth.getUser();
                  if (!authUser) {
                    if (typeof window !== 'undefined') {
                      window.location.href = '/login?next=' + encodeURIComponent(chapterPath);
                    }
                    return;
                  }
                }
                navigate('studyGuideChapter', chapterPath);
              }}
              className="min-h-[50px] w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-sm sm:text-base shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              {hasAccess ? (
                <>
                  <span>{isResumeSaved ? 'Continue Studying' : 'Start Chapter 1'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Start 2-Day Free Trial to Open</span>
                </>
              )}
            </a>
          </div>
        </div>

        {/* All 4 Subjects Grid */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display font-black text-xl sm:text-2xl text-white">
              All Subjects
            </h2>
            <span className="text-xs font-mono font-semibold text-[#FFD400]">
              Tap any subject to view all chapters
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
            {subjectCards.map((subj) => {
              const subjDone = subj.chapters.filter((ch) =>
                progress.completedSlugs.includes(ch.slug)
              ).length;
              const subjTotal = subj.chapters.length;
              const subjPct = Math.round((subjDone / subjTotal) * 100);

              return (
                <a
                  key={subj.id}
                  href={subj.path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(subj.tab, subj.path);
                  }}
                  className="group relative bg-[#0D1E42] hover:bg-[#112654] border-2 border-[#FFD400]/45 hover:border-[#FFD400] rounded-3xl p-6 sm:p-7 transition-all duration-300 shadow-[0_12px_36px_rgba(0,0,0,0.35)] hover:shadow-[0_0_32px_rgba(255,212,0,0.2)] flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="text-4xl sm:text-5xl" aria-hidden="true">
                        {subj.icon}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#061128] border border-[#1E3A6E] text-slate-200 text-xs font-bold">
                          {subjDone}/{subjTotal} Done
                        </span>
                        <span className="px-3 py-1 rounded-full bg-[#FFD400]/15 border border-[#FFD400]/50 text-[#FFD400] text-xs font-bold">
                          {subjTotal} {subjTotal === 1 ? 'Chapter' : 'Chapters'}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-display font-black text-2xl text-white group-hover:text-[#FFD400] transition-colors mb-2.5">
                      {subj.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed mb-5">
                      {subj.description}
                    </p>

                    {/* Mini subject progress bar */}
                    <div className="w-full h-2 rounded-full bg-[#061128] overflow-hidden mb-5">
                      <div
                        className="h-full bg-[#FFD400] transition-all duration-500"
                        style={{ width: `${subjPct}%` }}
                      />
                    </div>
                  </div>

                  <div className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FFD400] text-black font-black text-sm sm:text-base shadow-md group-hover:bg-yellow-400 transition-colors">
                    <span>{subj.cta}</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Final Card: Matric Exam Tips Page Link */}
        <div className="bg-gradient-to-r from-[#0D1E42] via-[#11295B] to-[#0D1E42] border-2 border-[#FFD400] rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD400]/20 border border-[#FFD400]/50 text-[#FFD400] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Essential Exam Strategy</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white flex items-center gap-2.5">
              <GraduationCap className="w-7 h-7 text-[#FFD400] shrink-0" />
              <span>Matric Exam Tips</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Learn how to study effectively, manage exam room time (1 mark = 1 minute), and secure easy marks to pass with confidence.
            </p>
          </div>

          <a
            href="/study-guide/matric-exam-tips"
            onClick={(e) => {
              e.preventDefault();
              navigate('studyGuideExamTips', '/study-guide/matric-exam-tips');
            }}
            className="min-h-[52px] inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-sm sm:text-base shadow-lg transition-all active:scale-95 whitespace-nowrap cursor-pointer shrink-0"
          >
            <span>Open Matric Exam Tips</span>
            <ArrowRight className="w-5 h-5 shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default StudyGuideHubPage;
