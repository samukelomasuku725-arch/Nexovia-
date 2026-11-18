/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN ORIGINAL OFFICE ADMINISTRATION TEXTBOOK (LEVEL 2, 3, 4) — ALL 11 LANGUAGES
 * Route: /textbooks/ncv-office-administration-textbook
 * Online reading only on nexovian.group
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Eye,
  EyeOff,
  Globe,
  Home,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useTranslation } from '../../i18n/I18nContext';
import { SALanguageCode } from '../../i18n/types';
import {
  NCV_OFFICE_ADMIN_TEXTBOOK_CHAPTERS,
  TEXTBOOK_LANGUAGES,
  TEXTBOOK_UI_STRINGS,
  TextbookChapter,
  TextbookLangKey
} from '../../data/ncvOfficeAdminTextbookData';

const PAGE_META_DESC =
  "Read Nexovian's original Office Administration textbook Level 2-4 online in Xitsonga, Sepedi, isiZulu, Tshivenda, Sesotho, Setswana, Siswati, isiNdebele, isiXhosa, Afrikaans and English. Original Nexovian study material.";

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

export const NcvOfficeAdminTextbookPage: React.FC = () => {
  const { setCurrentTab, setActiveLearningLanguage } = useLearning();
  const { language: globalLanguage, setLanguage } = useTranslation();

  const [selectedLang, setSelectedLang] = useState<TextbookLangKey>(() => {
    return readUrlLangParam() || mapCodeToTextbookLang(globalLanguage) || 'English';
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

  const ui = TEXTBOOK_UI_STRINGS[selectedLang];

  // On initial mount, ensure global Navbar dropdown matches URL ?lang= or selected language
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

  // Two-way sync: if user picks a language in the top Navbar dropdown, translate textbook too
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
    document.title = ui.pageTitle;

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
  }, [ui.pageTitle]);

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
    tab: 'landing' | 'studyGuideNcv' | 'studyGuideMultilingualSeo' | 'learn',
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

  const level2Chapters = NCV_OFFICE_ADMIN_TEXTBOOK_CHAPTERS.filter((c) => c.level === 2);
  const level3Chapters = NCV_OFFICE_ADMIN_TEXTBOOK_CHAPTERS.filter((c) => c.level === 3);
  const level4Chapters = NCV_OFFICE_ADMIN_TEXTBOOK_CHAPTERS.filter((c) => c.level === 4);

  const renderChapterCard = (chapter: TextbookChapter) => (
    <article
      key={chapter.id}
      className="bg-[#0D1E42] border border-[#1E3A6E] hover:border-[#FFD400]/60 rounded-3xl p-5 sm:p-7 shadow-xl space-y-5 transition-colors"
    >
      {/* Chapter Header */}
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full bg-[#FFD400]/15 border border-[#FFD400]/50 text-[#FFD400] font-mono text-xs font-bold uppercase tracking-wider">
            {chapter.chapterLabelByLanguage[selectedLang]}
          </span>
          <span className="px-3 py-1 rounded-full bg-[#061128] border border-[#1E3A6E] text-emerald-300 text-xs font-bold">
            {ui.originalChapterBadge}
          </span>
        </div>
        <h3 className="font-display font-black text-xl sm:text-2xl text-white pt-1">
          {chapter.titleByLanguage[selectedLang]}
        </h3>
        <p className="text-xs sm:text-sm text-[#FFD400] font-semibold">
          {chapter.subtitleByLanguage[selectedLang]}
        </p>
      </div>

      {/* 1. Summary in Your Language */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#071530] border border-[#FFD400]/35 space-y-2">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
          {activeLangObj.summaryPrefix}
        </div>
        <p className="text-sm sm:text-base text-slate-100 leading-relaxed">
          {chapter.summaryByLanguage[selectedLang]}
        </p>
      </div>

      {/* 2. Key Terms Translated */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
          {ui.keyTermsHeading} ({selectedLang})
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {chapter.keyTerms.map((kt) => (
            <div
              key={kt.termEn}
              className="p-3.5 rounded-2xl bg-[#061128] border border-[#1E3A6E] space-y-1.5"
            >
              <div className="text-xs font-bold text-slate-300">{kt.termEn}</div>
              <div className="text-sm font-black text-[#FFD400]">
                {kt.translations[selectedLang]}
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">
                {kt.meaningByLanguage[selectedLang]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Worked Example */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#061128] border border-emerald-500/40 space-y-2.5">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
          {ui.workedExampleHeading}
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
          {ui.solutionLabel} {chapter.workedExample.finalAnswerByLanguage[selectedLang]}
        </div>
      </div>

      {/* 4. Practice Questions + Answers Explained */}
      <div className="space-y-3">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
          {ui.practiceHeading}
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
                      <span>{ui.hideAnswerBtn}</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>{ui.showAnswerBtn}</span>
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

      {/* 5. Ask AI Tutor Button */}
      <div className="pt-1">
        <a
          href={`/learn?lang=${activeLangObj.code}`}
          onClick={handleAskAiTutor}
          className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-sm shadow-md transition-all cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 shrink-0" />
          <span>
            {ui.askAiTutorBtn} ({selectedLang})
          </span>
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
        {/* Top Internal Navigation */}
        <nav aria-label="Textbook Breadcrumb" className="flex flex-wrap items-center justify-between gap-3">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('landing', '/');
            }}
            className="inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0D1E42] border border-[#1E3A6E] hover:border-[#FFD400] text-xs sm:text-sm font-bold text-slate-200 hover:text-[#FFD400] transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4 shrink-0" />
            <span>{ui.backToHome}</span>
          </a>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/study-guide/ncv-office-administration-11-languages"
              onClick={(e) => {
                e.preventDefault();
                navigate(
                  'studyGuideMultilingualSeo',
                  '/study-guide/ncv-office-administration-11-languages'
                );
              }}
              className="inline-flex items-center min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0D1E42] border border-[#FFD400]/40 hover:border-[#FFD400] text-xs font-bold text-[#FFD400] transition-colors cursor-pointer"
            >
              {ui.guide11Langs}
            </a>
            <a
              href="/study-guide/ncv-office-administration-xitsonga"
              onClick={(e) => {
                e.preventDefault();
                navigate(
                  'studyGuideMultilingualSeo',
                  '/study-guide/ncv-office-administration-xitsonga'
                );
              }}
              className="inline-flex items-center min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0D1E42] border border-[#FFD400]/40 hover:border-[#FFD400] text-xs font-bold text-[#FFD400] transition-colors cursor-pointer"
            >
              {ui.guideXitsonga}
            </a>
          </div>
        </nav>

        {/* TOP 11-LANGUAGE SWITCHER BAR (DROPDOWN + BUTTONS SYNCED WITH GLOBAL HEADER) */}
        <section
          aria-label="11 Official Languages Textbook Switcher"
          className="bg-[#0D1E42] border-2 border-[#FFD400]/65 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
              <Globe className="w-4 h-4 shrink-0" />
              <span>{ui.selectLangHeading}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <label htmlFor="textbook-top-lang-select" className="sr-only">
                Select Textbook Language
              </label>
              <select
                id="textbook-top-lang-select"
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
                    {lang.key} — {lang.subjectName}
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

        {/* 1. HERO SECTION */}
        <section className="bg-[#0D1E42] border-2 border-[#FFD400]/55 rounded-3xl p-6 sm:p-9 shadow-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD400]/15 border border-[#FFD400]/50 text-[#FFD400] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>{ui.topBadge}</span>
          </div>

          <div className="space-y-2.5">
            <h1 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight break-words">
              {ui.heroTitle}
            </h1>
            <p className="text-lg sm:text-2xl font-black text-[#FFD400]">{ui.heroSubtitle}</p>
            <p className="text-sm sm:text-base font-bold text-emerald-300">{ui.heroNativeLine}</p>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
              {activeLangObj.tagline}
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
              <span>{ui.readOnlineBtn}</span>
            </button>
          </div>
        </section>

        {/* Level Filter Tabs */}
        <div ref={chaptersTopRef} className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'ALL' as const, label: ui.filterAll },
              { id: 2 as const, label: ui.filterL2 },
              { id: 3 as const, label: ui.filterL3 },
              { id: 4 as const, label: ui.filterL4 }
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
            {ui.activeLangLabel} {selectedLang} ({activeLangObj.subjectName})
          </span>
        </div>

        {/* 2. LEVEL 2 NEXOVIAN CHAPTERS */}
        {(levelFilter === 'ALL' || levelFilter === 2) && (
          <section className="space-y-5">
            <div className="border-b border-[#FFD400]/40 pb-2">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#FFD400]">
                {ui.level2Heading} — {activeLangObj.subjectName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">{ui.level2Sub}</p>
            </div>
            <div className="space-y-5">{level2Chapters.map(renderChapterCard)}</div>
          </section>
        )}

        {/* 3. LEVEL 3 NEXOVIAN CHAPTERS */}
        {(levelFilter === 'ALL' || levelFilter === 3) && (
          <section className="space-y-5">
            <div className="border-b border-[#FFD400]/40 pb-2">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#FFD400]">
                {ui.level3Heading} — {activeLangObj.subjectName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">{ui.level3Sub}</p>
            </div>
            <div className="space-y-5">{level3Chapters.map(renderChapterCard)}</div>
          </section>
        )}

        {/* 4. LEVEL 4 NEXOVIAN CHAPTERS */}
        {(levelFilter === 'ALL' || levelFilter === 4) && (
          <section className="space-y-5">
            <div className="border-b border-[#FFD400]/40 pb-2">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#FFD400]">
                {ui.level4Heading} — {activeLangObj.subjectName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">{ui.level4Sub}</p>
            </div>
            <div className="space-y-5">{level4Chapters.map(renderChapterCard)}</div>
          </section>
        )}

        {/* INTERNAL LINKS & SEO KEYWORDS */}
        <section className="bg-[#0D1E42] border border-[#1E3A6E] rounded-3xl p-6 shadow-lg space-y-4">
          <h2 className="font-display font-bold text-lg text-[#FFD400]">
            {ui.exploreMoreHeading}
          </h2>
          <div className="flex flex-wrap gap-2.5">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('landing', '/');
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-xs cursor-pointer"
            >
              <span>{ui.exploreHomepage}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="/study-guide/ncv-office-administration-11-languages"
              onClick={(e) => {
                e.preventDefault();
                navigate(
                  'studyGuideMultilingualSeo',
                  '/study-guide/ncv-office-administration-11-languages'
                );
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#061128] hover:bg-[#132959] border border-[#1E3A6E] hover:border-[#FFD400] text-slate-100 hover:text-[#FFD400] font-bold text-xs cursor-pointer"
            >
              <span>{ui.explore11Langs}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="/study-guide/ncv-office-administration-xitsonga"
              onClick={(e) => {
                e.preventDefault();
                navigate(
                  'studyGuideMultilingualSeo',
                  '/study-guide/ncv-office-administration-xitsonga'
                );
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#061128] hover:bg-[#132959] border border-[#1E3A6E] hover:border-[#FFD400] text-slate-100 hover:text-[#FFD400] font-bold text-xs cursor-pointer"
            >
              <span>{ui.exploreXitsonga}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="pt-3 border-t border-[#1E3A6E] text-xs font-mono text-slate-300 leading-relaxed">
            <span className="text-[#FFD400] font-bold">{ui.keywordsLabel} </span>
            {ui.keywordsValue}
          </div>
        </section>

        {/* COPYRIGHT NOTICE & ORIGINAL MATERIAL DISCLAIMER */}
        <footer className="bg-[#071530] border border-[#FFD400]/40 rounded-3xl p-6 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>{ui.copyrightHeader}</span>
          </div>
          <p className="font-bold text-white">{ui.copyrightText}</p>
          <p className="text-slate-300">{ui.disclaimerText}</p>
        </footer>
      </div>
    </div>
  );
};

export default NcvOfficeAdminTextbookPage;
