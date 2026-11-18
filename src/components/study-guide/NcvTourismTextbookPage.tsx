/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN ORIGINAL NCV TOURISM TEXTBOOK (LEVEL 2, 3, 4 — 9 CHAPTERS)
 * Route: /textbooks/ncv-tourism-textbook
 * LIVE — Online reading only on nexovian.group.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  Eye,
  EyeOff,
  Globe,
  HelpCircle,
  Home,
  Library,
  MessageSquare,
  RotateCcw,
  ShieldCheck,
  XCircle
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useTranslation } from '../../i18n/I18nContext';
import { SALanguageCode } from '../../i18n/types';
import {
  NCV_TOURISM_CHAPTERS,
  TEXTBOOK_LANGUAGES,
  TextbookLangKey,
  TourismChapter
} from '../../data/ncvTourismTextbookData';

const PAGE_TITLE = 'NCV Tourism Textbook - Level 2, 3, 4 (9 Chapters) | Nexovian';
const PAGE_META_DESC =
  'Read Nexovian’s free NCV Tourism Level 2, 3 & 4 textbook online: 9 complete chapters with South African worked examples, key terms, practice questions, and interactive 5-question quizzes.';

const mapCodeToTextbookLang = (code?: string | null): TextbookLangKey | null => {
  if (!code) return null;
  const normalized = code.trim().toLowerCase();
  const matched = TEXTBOOK_LANGUAGES.find(
    (l) => l.code.toLowerCase() === normalized || l.key.toLowerCase() === normalized
  );
  return matched ? matched.key : null;
};

const readUrlLangParam = (): TextbookLangKey | null => {
  if (typeof window === 'undefined') return null;
  try {
    const params = new URLSearchParams(window.location.search);
    return mapCodeToTextbookLang(params.get('lang'));
  } catch {
    return null;
  }
};

export const NcvTourismTextbookPage: React.FC = () => {
  const { setCurrentTab, setActiveLearningLanguage } = useLearning();
  const { language: globalLanguage, setLanguage } = useTranslation();

  const [selectedLang, setSelectedLang] = useState<TextbookLangKey>(() => {
    return readUrlLangParam() || 'English';
  });
  const [levelFilter, setLevelFilter] = useState<'ALL' | 2 | 3 | 4>('ALL');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [quizSelections, setQuizSelections] = useState<Record<string, number>>({});
  const chaptersTopRef = useRef<HTMLDivElement | null>(null);
  const lastSyncedGlobalLangRef = useRef<string>(globalLanguage);

  const activeLangObj = useMemo(
    () =>
      TEXTBOOK_LANGUAGES.find((l) => l.key === selectedLang) ||
      TEXTBOOK_LANGUAGES[TEXTBOOK_LANGUAGES.length - 1],
    [selectedLang]
  );

  useEffect(() => {
    const urlLangKey = readUrlLangParam();
    if (urlLangKey) {
      const targetOption = TEXTBOOK_LANGUAGES.find((l) => l.key === urlLangKey);
      if (targetOption) {
        const targetCode = targetOption.code as SALanguageCode;
        lastSyncedGlobalLangRef.current = targetCode;
        setSelectedLang(urlLangKey);
        setLanguage(targetCode);
        setActiveLearningLanguage(targetCode);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (globalLanguage === lastSyncedGlobalLangRef.current) return;
    lastSyncedGlobalLangRef.current = globalLanguage;

    const mapped = mapCodeToTextbookLang(globalLanguage);
    if (mapped && mapped !== selectedLang) {
      setSelectedLang(mapped);
      if (typeof window !== 'undefined') {
        try {
          const url = new URL(window.location.href);
          url.searchParams.set('lang', globalLanguage);
          window.history.replaceState({}, '', `${url.pathname}${url.search}`);
        } catch {
          // Ignore URL sync failures
        }
      }
    }
  }, [globalLanguage, selectedLang]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const prevTitle = document.title;
    document.title = PAGE_TITLE;

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute('content', PAGE_META_DESC);
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  const handleSelectLanguage = (langKey: TextbookLangKey, langCode: string) => {
    const saCode = langCode as SALanguageCode;
    lastSyncedGlobalLangRef.current = saCode;
    setSelectedLang(langKey);
    setLanguage(saCode);
    setActiveLearningLanguage(saCode);

    if (typeof window !== 'undefined') {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('lang', langCode);
        window.history.replaceState({}, '', `${url.pathname}${url.search}`);
      } catch {
        // Ignore history update failures
      }
    }
  };

  const navigate = (
    tab: 'landing' | 'textbooksLibrary' | 'ncvOfficeAdminTextbook' | 'electricalTextbook' | 'learn',
    path: string
  ) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentTab(tab);
  };

  const handleAskAiTutor = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetCode = activeLangObj.code as SALanguageCode;
    setLanguage(targetCode);
    setActiveLearningLanguage(targetCode);
    navigate('learn', `/learn?lang=${targetCode}`);
  };

  const toggleAnswer = (chapterId: string, qNum: number) => {
    const key = `${chapterId}-q${qNum}`;
    setRevealedAnswers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const selectQuizOption = (chapterId: string, qNum: number, optionIndex: number) => {
    const key = `${chapterId}-quiz-${qNum}`;
    setQuizSelections((prev) => ({ ...prev, [key]: optionIndex }));
  };

  const resetChapterQuiz = (chapter: TourismChapter) => {
    setQuizSelections((prev) => {
      const next = { ...prev };
      chapter.quickQuiz.forEach((q) => {
        delete next[`${chapter.id}-quiz-${q.number}`];
      });
      return next;
    });
  };

  const handleReadOnline = () => {
    chaptersTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const level2Chapters = NCV_TOURISM_CHAPTERS.filter((c) => c.level === 2);
  const level3Chapters = NCV_TOURISM_CHAPTERS.filter((c) => c.level === 3);
  const level4Chapters = NCV_TOURISM_CHAPTERS.filter((c) => c.level === 4);

  const renderChapterCard = (chapter: TourismChapter) => {
    const answeredCount = chapter.quickQuiz.filter(
      (q) => quizSelections[`${chapter.id}-quiz-${q.number}`] !== undefined
    ).length;
    const correctCount = chapter.quickQuiz.filter(
      (q) => quizSelections[`${chapter.id}-quiz-${q.number}`] === q.correctIndex
    ).length;

    return (
      <article
        key={chapter.id}
        className="bg-[#0D1E42] border border-[#1E3A6E] hover:border-[#FFD400]/60 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6 transition-colors"
      >
        {/* Chapter Header */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-full bg-[#FFD400]/15 border border-[#FFD400]/50 text-[#FFD400] font-mono text-xs font-bold uppercase tracking-wider">
              {chapter.chapterLabel}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#061128] border border-[#1E3A6E] text-emerald-300 text-xs font-bold">
              Nexovian Original • Read Online Only
            </span>
          </div>
          <h3 className="font-display font-black text-xl sm:text-2xl text-white pt-1">
            Chapter {chapter.chapterNumber}: {chapter.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#FFD400] font-semibold">
            {chapter.subtitleByLanguage[selectedLang]}
          </p>
        </div>

        {/* 1. Clear Explanation in Simple English for NCV Students */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#071530] border border-[#FFD400]/35 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
              Clear Explanation (NCV Level {chapter.level})
            </span>
            <span className="text-[11px] font-mono text-slate-300">
              Simple English Study Notes
            </span>
          </div>
          <div className="space-y-2.5 text-sm sm:text-base text-slate-100 leading-relaxed">
            {chapter.explanationParagraphs.map((para, idx) => (
              <p key={`${chapter.id}-p-${idx}`}>{para}</p>
            ))}
          </div>

          {selectedLang !== 'English' && (
            <div className="mt-3 p-3.5 rounded-xl bg-[#061128] border border-[#FFD400]/45 space-y-1">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
                Summary in {selectedLang}
              </div>
              <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
                {chapter.summaryByLanguage[selectedLang]}
              </p>
            </div>
          )}
        </div>

        {/* 2. Key Terms Box */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
            Key Terms Box ({selectedLang})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {chapter.keyTerms.map((kt) => (
              <div
                key={kt.termEn}
                className="p-3.5 rounded-2xl bg-[#061128] border border-[#1E3A6E] space-y-1.5"
              >
                <div className="text-xs font-black text-white">{kt.termEn}</div>
                {selectedLang !== 'English' && (
                  <div className="text-sm font-black text-[#FFD400]">
                    {kt.translations[selectedLang]}
                  </div>
                )}
                <div className="text-xs text-slate-300 leading-relaxed">
                  {kt.meaningByLanguage[selectedLang]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Worked Example (Real South African Example) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#061128] border border-emerald-500/40 space-y-2.5">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
            Worked Example — {chapter.workedExample.title}
          </div>
          <p className="text-sm font-bold text-white leading-relaxed">
            {chapter.workedExample.scenario}
          </p>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-200 list-disc pl-5">
            {chapter.workedExample.steps.map((step, idx) => (
              <li key={`${chapter.id}-step-${idx}`}>{step}</li>
            ))}
          </ul>
          <div className="pt-1 text-xs sm:text-sm font-black text-[#FFD400]">
            Answer: {chapter.workedExample.finalAnswer}
          </div>
        </div>

        {/* 4. 2 Practice Questions with Show/Hide Answer */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
            Practice Questions &amp; Answers
          </h4>
          <div className="space-y-2.5">
            {chapter.practiceQuestions.map((pq) => {
              const ansKey = `${chapter.id}-q${pq.number}`;
              const isShown = Boolean(revealedAnswers[ansKey]);
              return (
                <div
                  key={ansKey}
                  className="p-4 rounded-2xl bg-[#061128] border border-[#1E3A6E] space-y-2.5"
                >
                  <p className="text-xs sm:text-sm font-bold text-white leading-relaxed">
                    Q{pq.number}. {pq.question}
                  </p>
                  <button
                    type="button"
                    onClick={() => toggleAnswer(chapter.id, pq.number)}
                    className="inline-flex items-center gap-2 min-h-[40px] px-4 py-1.5 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-xs cursor-pointer transition-colors"
                  >
                    {isShown ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Hide Answer</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Show Answer</span>
                      </>
                    )}
                  </button>
                  {isShown && (
                    <div className="p-3 rounded-xl bg-[#007A4D]/20 border border-[#007A4D]/50 text-xs sm:text-sm text-emerald-100 leading-relaxed">
                      {pq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Quick Quiz — 5 Multiple Choice Questions */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#061128] border-2 border-[#FFD400]/45 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span>Quick Quiz — 5 Multiple Choice Questions</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#0D1E42] border border-[#1E3A6E] text-xs font-mono font-bold text-white">
                Score: {correctCount} / {chapter.quickQuiz.length}
                {answeredCount > 0 ? ` (${answeredCount} answered)` : ''}
              </span>
              {answeredCount > 0 && (
                <button
                  type="button"
                  onClick={() => resetChapterQuiz(chapter)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#0D1E42] hover:bg-[#162C5B] border border-[#1E3A6E] text-xs font-bold text-[#FFD400] cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Retry</span>
                </button>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {chapter.quickQuiz.map((quiz) => {
              const selKey = `${chapter.id}-quiz-${quiz.number}`;
              const chosenIdx = quizSelections[selKey];
              const hasAnswered = chosenIdx !== undefined;
              const letters = ['A', 'B', 'C', 'D'] as const;

              return (
                <div
                  key={selKey}
                  className="p-3.5 sm:p-4 rounded-2xl bg-[#0D1E42] border border-[#1E3A6E] space-y-2.5"
                >
                  <p className="text-xs sm:text-sm font-bold text-white leading-relaxed">
                    {quiz.number}. {quiz.question}
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {quiz.options.map((opt, optIdx) => {
                      const isChosen = chosenIdx === optIdx;
                      const isCorrect = optIdx === quiz.correctIndex;
                      let optionStyle =
                        'bg-[#061128] border-[#1E3A6E] text-slate-200 hover:border-[#FFD400] hover:text-[#FFD400]';

                      if (hasAnswered) {
                        if (isCorrect) {
                          optionStyle =
                            'bg-emerald-500/20 border-emerald-400 text-emerald-100 font-bold';
                        } else if (isChosen) {
                          optionStyle =
                            'bg-rose-500/20 border-rose-400 text-rose-100 font-bold';
                        } else {
                          optionStyle =
                            'bg-[#061128]/70 border-[#1E3A6E]/60 text-slate-400';
                        }
                      }

                      return (
                        <button
                          key={`${selKey}-opt-${optIdx}`}
                          type="button"
                          onClick={() => selectQuizOption(chapter.id, quiz.number, optIdx)}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 transition-colors cursor-pointer ${optionStyle}`}
                        >
                          <span className="font-mono font-black shrink-0 text-[#FFD400]">
                            {letters[optIdx]}.
                          </span>
                          <span className="flex-1">{opt}</span>
                          {hasAnswered && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          )}
                          {hasAnswered && isChosen && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {hasAnswered && (
                    <div
                      className={`p-2.5 rounded-xl text-xs leading-relaxed ${
                        chosenIdx === quiz.correctIndex
                          ? 'bg-emerald-500/15 border border-emerald-400/40 text-emerald-100'
                          : 'bg-amber-500/15 border border-amber-400/40 text-amber-100'
                      }`}
                    >
                      <span className="font-black">
                        {chosenIdx === quiz.correctIndex ? 'Correct! ' : 'Check Answer: '}
                      </span>
                      {quiz.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. Ask AI Tutor Button */}
        <div className="pt-1">
          <a
            href={`/learn?lang=${activeLangObj.code}`}
            onClick={handleAskAiTutor}
            className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-sm shadow-md transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 shrink-0" />
            <span>Ask AI Tutor in Your Language</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </a>
        </div>
      </article>
    );
  };

  return (
    <div
      onCopy={(e) => e.preventDefault()}
      className="min-h-screen bg-gradient-to-b from-[#061128] via-[#0A1F44] to-[#050D1E] text-white py-6 sm:py-8 px-4 sm:px-6 lg:px-8 overflow-x-hidden select-none"
    >
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        {/* Top Breadcrumb */}
        <nav
          aria-label="Tourism Textbook Breadcrumb"
          className="flex flex-wrap items-center justify-between gap-3"
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('landing', '/');
            }}
            className="inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0D1E42] border border-[#1E3A6E] hover:border-[#FFD400] text-xs sm:text-sm font-bold text-slate-200 hover:text-[#FFD400] transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4 shrink-0" />
            <span>nexovian.group Homepage</span>
          </a>

          <a
            href="/textbooks"
            onClick={(e) => {
              e.preventDefault();
              navigate('textbooksLibrary', '/textbooks');
            }}
            className="inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0D1E42] border border-[#FFD400]/40 hover:border-[#FFD400] text-xs font-bold text-[#FFD400] transition-colors cursor-pointer"
          >
            <Library className="w-4 h-4 shrink-0" />
            <span>Nexovian Textbooks Library</span>
          </a>
        </nav>

        {/* TOP 11-LANGUAGE TRANSLATOR BAR */}
        <section
          aria-label="11 Official Languages Chapter Translator"
          className="bg-[#0D1E42] border-2 border-[#FFD400]/65 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
              <Globe className="w-4 h-4 shrink-0" />
              <span>Select Language for Summaries &amp; Key Terms (11 Languages)</span>
            </div>

            <div className="flex items-center gap-2.5">
              <label htmlFor="tourism-top-lang-select" className="sr-only">
                Select Chapter Language
              </label>
              <select
                id="tourism-top-lang-select"
                value={selectedLang}
                onChange={(e) => {
                  const chosenKey = e.target.value as TextbookLangKey;
                  const found = TEXTBOOK_LANGUAGES.find((l) => l.key === chosenKey);
                  if (found) {
                    handleSelectLanguage(found.key, found.code);
                  }
                }}
                className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-[#061128] border-2 border-[#FFD400]/80 text-[#FFD400] text-xs font-black focus:outline-none focus:ring-2 focus:ring-[#FFD400] cursor-pointer"
              >
                {TEXTBOOK_LANGUAGES.map((lang) => (
                  <option key={lang.key} value={lang.key} className="bg-[#061128] text-white">
                    {lang.key}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {TEXTBOOK_LANGUAGES.map((lang) => {
              const isActive = lang.key === selectedLang;
              return (
                <button
                  key={lang.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => handleSelectLanguage(lang.key, lang.code)}
                  className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#FFD400] text-black shadow-md scale-[1.03]'
                      : 'bg-[#061128] text-slate-200 border border-[#1E3A6E] hover:border-[#FFD400] hover:text-[#FFD400]'
                  }`}
                >
                  {lang.key}
                </button>
              );
            })}
          </div>
        </section>

        {/* HERO SECTION */}
        <section className="bg-[#0D1E42] border-2 border-[#FFD400]/55 rounded-3xl p-6 sm:p-9 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD400]/15 border border-[#FFD400]/50 text-[#FFD400] text-xs font-bold uppercase tracking-wider">
              <Compass className="w-4 h-4 shrink-0" />
              <span>Level 2, 3, 4 • 9 Chapters</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/60 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
              LIVE
            </span>
          </div>

          <div className="space-y-2.5">
            <h1 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight break-words">
              NCV Tourism — Level 2, 3, 4
            </h1>
            <p className="text-lg sm:text-2xl font-black text-[#FFD400]">
              9 Complete Chapters. 100% FREE. Read Online Only.
            </p>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
              Master Tourism Geography, Customer Care, Accommodation &amp; Transport, Tour Guiding, Sustainable Tourism, 7Ps Marketing, Tour Costing &amp; Travel Docs, and Tourism Entrepreneurship with South African worked examples, practice questions, and interactive 5-question chapter quizzes.
            </p>
          </div>

          <div>
            <button
              type="button"
              onClick={handleReadOnline}
              className="min-h-[50px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-sm sm:text-base shadow-lg transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <BookOpen className="w-5 h-5 shrink-0" />
              <span>Read FREE</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </section>

        {/* Level Filter Tabs */}
        <div ref={chaptersTopRef} className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'ALL' as const, label: 'All Chapters (9)' },
              { id: 2 as const, label: 'Level 2 (3 Chapters)' },
              { id: 3 as const, label: 'Level 3 (3 Chapters)' },
              { id: 4 as const, label: 'Level 4 (3 Chapters)' }
            ].map((tabItem) => {
              const active = levelFilter === tabItem.id;
              return (
                <button
                  key={String(tabItem.id)}
                  type="button"
                  onClick={() => setLevelFilter(tabItem.id)}
                  className={`min-h-[44px] px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                    active
                      ? 'bg-[#FFD400] text-black shadow-md'
                      : 'bg-[#0D1E42] text-slate-200 border border-[#1E3A6E] hover:border-[#FFD400] hover:text-[#FFD400]'
                  }`}
                >
                  {tabItem.label}
                </button>
              );
            })}
          </div>
          <span className="text-xs font-mono font-bold text-[#FFD400]">
            Glossary Language: {selectedLang}
          </span>
        </div>

        {/* LEVEL 2 CHAPTERS (1–3) */}
        {(levelFilter === 'ALL' || levelFilter === 2) && (
          <section className="space-y-5">
            <div className="border-b border-[#FFD400]/40 pb-2">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#FFD400]">
                LEVEL 2 — Tourism Foundations, SA Geography &amp; Customer Care
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Chapters 1–3: Introduction to Tourism, South African Tourism Geography, and Customer Care &amp; Communication
              </p>
            </div>
            <div className="space-y-5">{level2Chapters.map(renderChapterCard)}</div>
          </section>
        )}

        {/* LEVEL 3 CHAPTERS (4–6) */}
        {(levelFilter === 'ALL' || levelFilter === 3) && (
          <section className="space-y-5">
            <div className="border-b border-[#FFD400]/40 pb-2">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#FFD400]">
                LEVEL 3 — Hospitality, Guiding Operations &amp; Sustainability
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Chapters 4–6: Accommodation &amp; Transport, Tour Planning &amp; Tour Guiding, and Sustainable &amp; Responsible Tourism
              </p>
            </div>
            <div className="space-y-5">{level3Chapters.map(renderChapterCard)}</div>
          </section>
        )}

        {/* LEVEL 4 CHAPTERS (7–9) */}
        {(levelFilter === 'ALL' || levelFilter === 4) && (
          <section className="space-y-5">
            <div className="border-b border-[#FFD400]/40 pb-2">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#FFD400]">
                LEVEL 4 — Marketing, Costing, Legislation &amp; Entrepreneurship
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Chapters 7–9: Tourism Marketing &amp; Sales, Tour Costing, Quoting &amp; Travel Docs, and Tourism Management &amp; Entrepreneurship
              </p>
            </div>
            <div className="space-y-5">{level4Chapters.map(renderChapterCard)}</div>
          </section>
        )}

        {/* INTERNAL LINKS SECTION */}
        <section className="bg-[#0D1E42] border border-[#1E3A6E] rounded-3xl p-6 shadow-lg space-y-4">
          <h2 className="font-display font-bold text-lg text-[#FFD400]">
            Explore More Free Nexovian Textbooks
          </h2>
          <div className="flex flex-wrap gap-2.5">
            <a
              href="/textbooks"
              onClick={(e) => {
                e.preventDefault();
                navigate('textbooksLibrary', '/textbooks');
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-xs cursor-pointer"
            >
              <span>Nexovian Textbooks Library</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="/textbooks/ncv-office-administration-textbook"
              onClick={(e) => {
                e.preventDefault();
                navigate('ncvOfficeAdminTextbook', '/textbooks/ncv-office-administration-textbook');
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#061128] hover:bg-[#132959] border border-[#1E3A6E] hover:border-[#FFD400] text-slate-100 hover:text-[#FFD400] font-bold text-xs cursor-pointer"
            >
              <span>NCV Office Administration Textbook</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="/textbooks/electrical-trade-theory-textbook"
              onClick={(e) => {
                e.preventDefault();
                navigate('electricalTextbook', '/textbooks/electrical-trade-theory-textbook');
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#061128] hover:bg-[#132959] border border-[#1E3A6E] hover:border-[#FFD400] text-slate-100 hover:text-[#FFD400] font-bold text-xs cursor-pointer"
            >
              <span>Electrical Trade Theory Textbook</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* COPYRIGHT FOOTER */}
        <footer className="bg-[#071530] border border-[#FFD400]/40 rounded-3xl p-6 space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>100% Nexovian Original Study Material — Read Online Only</span>
          </div>
          <p className="font-bold text-white">
            &copy; 2026 Nexovian. Original Nexovian study material. For online reading only on nexovian.group.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default NcvTourismTextbookPage;
