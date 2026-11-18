/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN ORIGINAL ELECTRICAL TRADE THEORY TEXTBOOK (N1, N2, N3) — ALL 11 LANGUAGES
 * Route: /textbooks/electrical-trade-theory-textbook
 * LIVE — Online reading only on nexovian.group.
 * Title, Subtitle & Buttons strictly ENGLISH ONLY; chapter content translates when language selected.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Eye,
  EyeOff,
  Globe,
  Home,
  Library,
  MessageSquare,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useTranslation } from '../../i18n/I18nContext';
import { SALanguageCode } from '../../i18n/types';
import {
  ELECTRICAL_TRADE_THEORY_CHAPTERS,
  TEXTBOOK_LANGUAGES,
  TextbookChapter,
  TextbookLangKey
} from '../../data/electricalTradeTheoryTextbookData';

const PAGE_TITLE = 'Electrical Trade Theory Textbook - N1, N2, N3 in 11 Languages | Nexovian';
const PAGE_META_DESC =
  "Read Nexovian's original Electrical Trade Theory N1, N2 & N3 textbook online for free with exact worked maths examples and 11 South African language translations inside every chapter.";

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

export const ElectricalTradeTheoryTextbookPage: React.FC = () => {
  const { setCurrentTab, setActiveLearningLanguage } = useLearning();
  const { language: globalLanguage, setLanguage } = useTranslation();

  // Default chapter language to English unless explicit ?lang= query param was provided
  const [selectedLang, setSelectedLang] = useState<TextbookLangKey>(() => {
    return readUrlLangParam() || 'English';
  });
  const [levelFilter, setLevelFilter] = useState<'ALL' | 2 | 3 | 4>('ALL');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const chaptersTopRef = useRef<HTMLDivElement | null>(null);
  const lastSyncedGlobalLangRef = useRef<string>(globalLanguage);

  const activeLangObj = useMemo(
    () =>
      TEXTBOOK_LANGUAGES.find((l) => l.key === selectedLang) ||
      TEXTBOOK_LANGUAGES[TEXTBOOK_LANGUAGES.length - 1],
    [selectedLang]
  );

  // If URL explicitly requests ?lang= on load, sync global language state
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

  // Two-way sync: if user changes top Navbar dropdown while reading, translate chapter content too
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
    tab: 'landing' | 'textbooksLibrary' | 'ncvOfficeAdminTextbook' | 'learn',
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

  const handleReadOnline = () => {
    chaptersTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const n1Chapters = ELECTRICAL_TRADE_THEORY_CHAPTERS.filter((c) => c.level === 2);
  const n2Chapters = ELECTRICAL_TRADE_THEORY_CHAPTERS.filter((c) => c.level === 3);
  const n3Chapters = ELECTRICAL_TRADE_THEORY_CHAPTERS.filter((c) => c.level === 4);

  const renderChapterCard = (chapter: TextbookChapter) => (
    <article
      key={chapter.id}
      className="bg-[#0D1E42] border border-[#1E3A6E] hover:border-[#FFD400]/60 rounded-3xl p-5 sm:p-7 shadow-xl space-y-5 transition-colors"
    >
      {/* Chapter Header — Title/Badge ENGLISH ONLY, Subtitle translates with selected language */}
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full bg-[#FFD400]/15 border border-[#FFD400]/50 text-[#FFD400] font-mono text-xs font-bold uppercase tracking-wider">
            {chapter.chapterLabelByLanguage.English}
          </span>
          <span className="px-3 py-1 rounded-full bg-[#061128] border border-[#1E3A6E] text-emerald-300 text-xs font-bold">
            Nexovian Original • Read Online Only
          </span>
        </div>
        <h3 className="font-display font-black text-xl sm:text-2xl text-white pt-1">
          {chapter.titleByLanguage.English}
        </h3>
        <p className="text-xs sm:text-sm text-[#FFD400] font-semibold">
          {chapter.subtitleByLanguage[selectedLang]}
        </p>
      </div>

      {/* 1. Chapter Summary (Translates when language selected) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#071530] border border-[#FFD400]/35 space-y-2">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
          Summary ({selectedLang})
        </div>
        <p className="text-sm sm:text-base text-slate-100 leading-relaxed">
          {chapter.summaryByLanguage[selectedLang]}
        </p>
      </div>

      {/* 2. 3 Key Terms */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
          Key Terms ({selectedLang})
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {chapter.keyTerms.map((kt) => (
            <div
              key={kt.termEn}
              className="p-3.5 rounded-2xl bg-[#061128] border border-[#1E3A6E] space-y-1.5"
            >
              <div className="text-xs font-bold text-slate-300">{kt.termEn}</div>
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

      {/* 3. Worked Example with Step-by-Step Maths */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#061128] border border-emerald-500/40 space-y-2.5">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
          Worked Example
        </div>
        <p className="text-sm font-bold text-white leading-relaxed">
          {chapter.workedExample.questionByLanguage[selectedLang]}
        </p>
        <ul className="space-y-1.5 text-xs sm:text-sm text-slate-200 list-disc pl-5">
          {chapter.workedExample.stepsByLanguage[selectedLang].map((step, idx) => (
            <li key={`${chapter.id}-step-${idx}`}>{step}</li>
          ))}
        </ul>
        <div className="pt-1 text-xs sm:text-sm font-black text-[#FFD400]">
          Solution: {chapter.workedExample.finalAnswerByLanguage[selectedLang]}
        </div>
      </div>

      {/* 4. Practice Questions + Show/Hide Answer (ENGLISH BUTTONS ONLY) */}
      <div className="space-y-3">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
          Practice Questions + Answers Explained
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
                  Q{pq.number}. {pq.questionByLanguage[selectedLang]}
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
                    {pq.answerByLanguage[selectedLang]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Ask AI Tutor Button — ENGLISH ONLY TEXT */}
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

  return (
    <div
      onCopy={(e) => e.preventDefault()}
      className="min-h-screen bg-gradient-to-b from-[#061128] via-[#0A1F44] to-[#050D1E] text-white py-6 sm:py-8 px-4 sm:px-6 lg:px-8 overflow-x-hidden select-none"
    >
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        {/* Top Internal Navigation — ENGLISH ONLY */}
        <nav
          aria-label="Electrical Textbook Breadcrumb"
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

        {/* TOP 11-LANGUAGE CHAPTER TRANSLATOR BAR */}
        <section
          aria-label="11 Official Languages Chapter Translator"
          className="bg-[#0D1E42] border-2 border-[#FFD400]/65 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
              <Globe className="w-4 h-4 shrink-0" />
              <span>Select Language for Chapter Content (11 Languages)</span>
            </div>

            <div className="flex items-center gap-2.5">
              <label htmlFor="electrical-top-lang-select" className="sr-only">
                Select Chapter Language
              </label>
              <select
                id="electrical-top-lang-select"
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

        {/* 1. HERO SECTION — ENGLISH ONLY */}
        <section className="bg-[#0D1E42] border-2 border-[#FFD400]/55 rounded-3xl p-6 sm:p-9 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD400]/15 border border-[#FFD400]/50 text-[#FFD400] text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4 shrink-0" />
              <span>NEXOVIAN ORIGINAL TEXTBOOK • N1, N2, N3 • WRITTEN BY NEXOVIAN</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/60 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
              ✅ LIVE • READ ONLINE ONLY
            </span>
          </div>

          <div className="space-y-2.5">
            <h1 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight break-words">
              Electrical Trade Theory Textbook — N1, N2, N3
            </h1>
            <p className="text-lg sm:text-2xl font-black text-[#FFD400]">
              Learn in Your Language. 100% FREE. 100% Nexovian Original.
            </p>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
              Master all 12 chapters across N1, N2, and N3 with exact step-by-step worked calculations, 36 key terms, and 24 practice questions with explained answers. Select any of the 11 official languages above to translate chapter content while keeping formulas and units exact.
            </p>
          </div>

          {/* Primary Button: KEEP ONLY [Read Online Free] */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleReadOnline}
              className="min-h-[50px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-sm sm:text-base shadow-lg transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <BookOpen className="w-5 h-5 shrink-0" />
              <span>Read Online Free</span>
            </button>
          </div>
        </section>

        {/* Level Filter Tabs — ENGLISH ONLY */}
        <div ref={chaptersTopRef} className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'ALL' as const, label: 'All Chapters (12)' },
              { id: 2 as const, label: 'N1 (4 Chapters)' },
              { id: 3 as const, label: 'N2 (4 Chapters)' },
              { id: 4 as const, label: 'N3 (4 Chapters)' }
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
            Chapter Language: {selectedLang}
          </span>
        </div>

        {/* N1 CHAPTERS (1–4) */}
        {(levelFilter === 'ALL' || levelFilter === 2) && (
          <section className="space-y-5">
            <div className="border-b border-[#FFD400]/40 pb-2">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#FFD400]">
                N1 CHAPTERS — Foundations &amp; DC Theory
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Basic Electricity, Electrical Tools &amp; Safety, DC Circuits, and Magnetism &amp; Electromagnetism
              </p>
            </div>
            <div className="space-y-5">{n1Chapters.map(renderChapterCard)}</div>
          </section>
        )}

        {/* N2 CHAPTERS (5–8) */}
        {(levelFilter === 'ALL' || levelFilter === 3) && (
          <section className="space-y-5">
            <div className="border-b border-[#FFD400]/40 pb-2">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#FFD400]">
                N2 CHAPTERS — AC Theory, Machines &amp; Protection
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                AC Theory &amp; RMS, Single-Phase Transformers, DC Motors &amp; Generators, and Circuit Protection &amp; Earthing
              </p>
            </div>
            <div className="space-y-5">{n2Chapters.map(renderChapterCard)}</div>
          </section>
        )}

        {/* N3 CHAPTERS (9–12) */}
        {(levelFilter === 'ALL' || levelFilter === 4) && (
          <section className="space-y-5">
            <div className="border-b border-[#FFD400]/40 pb-2">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#FFD400]">
                N3 CHAPTERS — Three Phase Systems, Instruments &amp; Regulations
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Star &amp; Delta 3-Phase Systems, Induction Motors &amp; Starters, Measuring Instruments, and Wiring &amp; Fault Finding
              </p>
            </div>
            <div className="space-y-5">{n3Chapters.map(renderChapterCard)}</div>
          </section>
        )}

        {/* INTERNAL LINKS SECTION — ENGLISH ONLY */}
        <section className="bg-[#0D1E42] border border-[#1E3A6E] rounded-3xl p-6 shadow-lg space-y-4">
          <h2 className="font-display font-bold text-lg text-[#FFD400]">
            Explore More on Nexovian
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
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('landing', '/');
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#061128] hover:bg-[#132959] border border-[#1E3A6E] hover:border-[#FFD400] text-slate-100 hover:text-[#FFD400] font-bold text-xs cursor-pointer"
            >
              <span>nexovian.group Homepage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* COPYRIGHT NOTICE & ORIGINAL MATERIAL DISCLAIMER — ENGLISH ONLY */}
        <footer className="bg-[#071530] border border-[#FFD400]/40 rounded-3xl p-6 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>100% Nexovian Original Study Material — Read Online Only</span>
          </div>
          <p className="font-bold text-white">
            &copy; 2026 Nexovian. Original Nexovian study material. For online reading only on nexovian.group.
          </p>
          <p className="text-slate-300">
            Nexovian textbooks are original learning guides created by Nexovian to help students understand Electrical Trade Theory N1, N2, and N3 across South Africa&apos;s 11 official languages. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default ElectricalTradeTheoryTextbookPage;
