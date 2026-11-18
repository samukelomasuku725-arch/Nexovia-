/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 11-LANGUAGE TVET & NCV LEVEL 2-4 SEO LANDING PAGE RENDERER
 * Nexovian dark blue + gold theme
 */

import React, { useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Globe,
  Home,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import {
  findNcvMultilingualSeoPage,
  NCV_MULTILINGUAL_SEO_PAGES
} from '../../data/ncvMultilingualSeoPages';
import { isUserActive, startTwoDayFreeTrialCheckout } from '../../services/paystackService';

export const NcvMultilingualSeoPage: React.FC = () => {
  const { setCurrentTab } = useLearning();
  const { user, isAuthenticated } = useAuth();
  const hasAccess = isAuthenticated && isUserActive(user);

  const currentPath =
    typeof window !== 'undefined' ? window.location.pathname : NCV_MULTILINGUAL_SEO_PAGES[0].path;
  const page = findNcvMultilingualSeoPage(currentPath) || NCV_MULTILINGUAL_SEO_PAGES[0];

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const prevTitle = document.title;
    document.title = page.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute('content', page.metaDescription);
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, [page]);

  const navigate = (
    tab:
      | 'landing'
      | 'studyGuide'
      | 'studyGuideNcv'
      | 'studyGuideTvet'
      | 'studyGuideChapter'
      | 'studyGuideMultilingualSeo'
      | 'learn'
      | 'papers'
      | 'login',
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
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Internal Navigation Links */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-3">
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

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/study-guide/ncv-level-2-3-4"
              onClick={(e) => {
                e.preventDefault();
                navigate('studyGuideNcv', '/study-guide/ncv-level-2-3-4');
              }}
              className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0D1E42] border border-[#FFD400]/40 hover:border-[#FFD400] text-xs sm:text-sm font-bold text-[#FFD400] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
              <span>All NCV Level 2–4 Guides</span>
            </a>
            <a
              href="/study-guide/tvet-n1-n6"
              onClick={(e) => {
                e.preventDefault();
                navigate('studyGuideTvet', '/study-guide/tvet-n1-n6');
              }}
              className="inline-flex items-center min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0D1E42] border border-[#FFD400]/40 hover:border-[#FFD400] text-xs sm:text-sm font-bold text-[#FFD400] transition-colors cursor-pointer"
            >
              TVET N1–N6 (36)
            </a>
          </div>
        </nav>

        {/* Main Hero Article */}
        <article className="bg-[#0D1E42] border border-[#FFD400]/45 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFD400]/15 border border-[#FFD400]/50 text-[#FFD400] text-xs font-bold uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5 shrink-0" />
            <span>{page.badge}</span>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-4xl text-white leading-tight break-words">
            {page.h1}
          </h1>

          <p className="text-base sm:text-lg font-bold text-[#FFD400] leading-relaxed">
            {page.leadParagraph}
          </p>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {page.subLeadParagraph}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={`/learn?lang=${page.tutorPresetLang}`}
              onClick={(e) => {
                e.preventDefault();
                navigate('learn', `/learn?lang=${page.tutorPresetLang}`);
              }}
              className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-sm shadow-lg transition-all cursor-pointer"
            >
              <Globe className="w-4 h-4 shrink-0" />
              <span>Select Language &amp; Open AI Tutor</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </a>

            <a
              href={page.relatedChapterPath}
              onClick={(e) => {
                e.preventDefault();
                navigate('studyGuideChapter', page.relatedChapterPath);
              }}
              className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#071530] hover:bg-[#102552] border border-[#FFD400]/60 text-[#FFD400] font-black text-sm transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>{page.relatedChapterLabel}</span>
            </a>

            {!hasAccess && (
              <button
                type="button"
                onClick={handleStartTrial}
                className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#007A4D] hover:bg-emerald-700 text-white font-black text-sm transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Start 2-Day Free Trial (R0 today)</span>
              </button>
            )}
          </div>
        </article>

        {/* 11 Official Languages Section */}
        <section className="bg-[#0D1E42] border border-[#1E3A6E] rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#FFD400]">
            {page.languagesHeading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {page.languageHighlights.map((item) => (
              <div
                key={item.language}
                className="p-4 rounded-2xl bg-[#061128] border border-[#1E3A6E] space-y-1"
              >
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
                  {item.language}
                </div>
                <div className="text-sm sm:text-base font-bold text-white">{item.term}</div>
              </div>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
            {page.allLanguagesLine}
          </p>
        </section>

        {/* Topics Covered Section */}
        <section className="bg-[#0D1E42] border border-[#1E3A6E] rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#FFD400]">
            {page.topicsHeading}
          </h2>
          <ul className="space-y-3">
            {page.topicsCovered.map((topic) => (
              <li
                key={topic}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#061128] border border-[#1E3A6E] text-sm sm:text-base text-slate-100"
              >
                <CheckCircle2 className="w-5 h-5 text-[#FFD400] shrink-0 mt-0.5" />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* How It Works Section */}
        <section className="bg-[#0D1E42] border border-[#1E3A6E] rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#FFD400]">
            {page.howItWorksHeading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {page.howItWorksSteps.map((step, idx) => (
              <div
                key={step}
                className="p-4 rounded-2xl bg-[#061128] border border-[#1E3A6E] flex items-center gap-3.5"
              >
                <span className="w-9 h-9 rounded-full bg-[#FFD400] text-black font-black text-sm flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="text-sm sm:text-base font-bold text-white">{step}</span>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-2xl bg-[#071530] border border-[#FFD400]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm sm:text-base font-black text-[#FFD400]">
              {page.closingHighlight}
            </p>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('landing', '/');
              }}
              className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-xs whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Go to nexovian.group</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* Cross-Links to Other 11-Language TVET & NCV Pages + Keywords */}
        <section className="bg-[#0D1E42] border border-[#1E3A6E] rounded-3xl p-5 sm:p-6 shadow-lg space-y-4">
          <h2 className="font-display font-bold text-base sm:text-lg text-white">
            More 11-Language TVET &amp; NCV Guides on Nexovian
          </h2>
          <div className="flex flex-wrap gap-2">
            {NCV_MULTILINGUAL_SEO_PAGES.map((p) => {
              const isCurrent = p.path === page.path;
              return (
                <a
                  key={p.path}
                  href={p.path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('studyGuideMultilingualSeo', p.path);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                    isCurrent
                      ? 'bg-[#FFD400] text-black border-[#FFD400]'
                      : 'bg-[#061128] text-slate-200 border-[#1E3A6E] hover:border-[#FFD400] hover:text-[#FFD400]'
                  }`}
                >
                  {p.title.replace(' | Nexovian', '')}
                </a>
              );
            })}
          </div>
          <div className="pt-2 border-t border-[#1E3A6E] text-xs font-mono text-slate-300">
            <span className="text-[#FFD400] font-bold">Keywords: </span>
            {page.keywords}
          </div>
        </section>
      </div>
    </div>
  );
};

export default NcvMultilingualSeoPage;
