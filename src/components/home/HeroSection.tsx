/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN (PTY) LTD - HOME PAGE HERO SECTION
 * Reg: 2026/845572/07 | B-BBEE Level 1 (135%) | Mkhuhlu, Mpumalanga
 * 
 * South African Colors: Green (#007A4D), Gold/Yellow (#FFB612), Black (#0A0F1F), White
 * Headline:
 *   Line 1 (Xitsonga): Dyondza hi Ririmi Ra Wena
 *   Line 2 (English): Learn In Your Language
 * Sub-headline:
 *   "NEXOVIAN is Mpumalanga's first AI learning platform teaching Maths, Science & Life Sciences in all 11 official languages — including Xitsonga & siSwati Native Engine, built in Mkhuhlu for rural learners."
 * 3 CTAs:
 *   - Start Learning in Xitsonga (/learn?lang=ts) [Primary Green/Yellow]
 *   - Sungula Ku Funda hi siSwati (/learn?lang=ss)
 *   - Start in English (/learn?lang=en)
 * Language Badges:
 *   English • Afrikaans • isiZulu • isiXhosa • Sepedi • Sesotho • Setswana • siSwati ★ Native • Xitsonga ★ Native • Tshivenda • isiNdebele
 * Right Visual:
 *   3 rural learners (boy and girls) with phones, happy, in Mkhuhlu village background
 * Trust Bar:
 *   ✅ CAPS Aligned | ✅ DHET Aligned | ✅ B-BBEE Level 1 (135%) | Reg: 2026/845572/07 | 100% Youth Owned
 */

import React from 'react';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Award,
  Globe,
  MapPin,
  CheckCircle2,
  Star,
  BookOpen
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useTranslation } from '../../i18n/I18nContext';
import { SALanguageCode } from '../../i18n/types';
import { APP_CONFIG } from '../../config/brand';
import { PayFastSubscriptionForm } from '../payment/PayFastSubscriptionForm';

interface HeroSectionProps {
  onScrollToFinder?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToFinder }) => {
  const { setCurrentTab, setActiveLearningLanguage } = useLearning();
  const { setLanguage } = useTranslation();

  // Navigate to learn tab with specific language parameter
  const handleNavigateToLearn = (langCode: SALanguageCode) => {
    // 1. Update i18n & learning context
    setLanguage(langCode);
    setActiveLearningLanguage(langCode);
    setCurrentTab('learn');

    // 2. Push state to URL so browser address bar reflects /learn?lang=...
    if (typeof window !== 'undefined') {
      const newUrl = `/learn?lang=${langCode}`;
      window.history.pushState({ tab: 'learn', lang: langCode }, '', newUrl);
    }
  };

  // 11 official South African languages with Native markers
  const languagesList: Array<{ code: SALanguageCode; label: string; isNative?: boolean }> = [
    { code: 'en', label: 'English' },
    { code: 'af', label: 'Afrikaans' },
    { code: 'zu', label: 'isiZulu' },
    { code: 'xh', label: 'isiXhosa' },
    { code: 'nso', label: 'Sepedi' },
    { code: 'st', label: 'Sesotho' },
    { code: 'tn', label: 'Setswana' },
    { code: 'ss', label: 'siSwati', isNative: true },
    { code: 'ts', label: 'Xitsonga', isNative: true },
    { code: 've', label: 'Tshivenda' },
    { code: 'nr', label: 'isiNdebele' }
  ];

  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* HERO SECTION */}
      <section
        aria-label="NEXOVIAN Hero"
        className="relative pt-4 sm:pt-8 pb-8 sm:pb-12 bg-gradient-to-b from-slate-900 via-[#0A0F1F] to-slate-950 text-white border-b border-slate-800/80"
      >
        {/* Subtle Ambient South African Flag Color Gradients (Green & Gold) */}
        <div className="absolute top-0 left-10 w-80 h-80 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-24 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Top Company Identity & Location Kicker */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 font-mono text-[11px] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>NEXOVIAN (PTY) LTD</span>
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="inline-flex items-center gap-1 text-slate-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Mkhuhlu, Mpumalanga</span>
            </span>
            <span aria-hidden="true" className="text-slate-600 hidden sm:inline">·</span>
            <span className="text-amber-400 font-medium hidden sm:inline">
              B-BBEE Level 1 (135%)
            </span>
            <span aria-hidden="true" className="text-slate-600 hidden md:inline">·</span>
            <span className="text-slate-400 font-medium hidden md:inline">
              Reg: 2026/845572/07
            </span>
          </div>

          {/* Main 2-Column Hero Grid: Left Content (7 cols) + Right Illustration (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* LEFT COLUMN: Headings, Sub-headline, CTAs, Language Badges */}
            <div className="lg:col-span-7 flex flex-col justify-center min-w-0">
              
              {/* 1. HEADLINE (Large, Bold, 2 Lines) */}
              <h1 className="font-display font-black tracking-tight leading-[1.08] text-balance">
                {/* Line 1 in Xitsonga */}
                <span className="block text-3xl sm:text-5xl lg:text-6xl text-white">
                  Dyondza hi Ririmi Ra Wena
                </span>
                {/* Line 2 in English with South African Gold & Green Accent */}
                <span className="block text-2xl sm:text-4xl lg:text-5xl mt-1.5 sm:mt-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 bg-clip-text text-transparent font-extrabold">
                  Learn In Your Language
                </span>
              </h1>

              {/* 2. SUB-HEADLINE (Smaller, under headline) */}
              <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl text-pretty">
                NEXOVIAN is Mpumalanga&apos;s first AI learning platform teaching Maths, Science &amp; Life Sciences in all 11 official languages &mdash; including Xitsonga &amp; siSwati Native Engine, built in Mkhuhlu for rural learners.
              </p>

              {/* Secondary capability summary */}
              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl">
                Comprehensive curriculum coverage: CAPS Grade 4–12, TVET N1–N6 &amp; NC(V), and University preparation with instant AI Socratic assistance.
              </p>

              {/* 3. THREE CTA BUTTONS SIDE BY SIDE */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 w-full">
                {/* Button 1: Start Learning in Xitsonga (Primary South African Green/Yellow) */}
                <a
                  href="/learn?lang=ts"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigateToLearn('ts');
                  }}
                  className="flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 min-h-[48px] whitespace-nowrap cursor-pointer border border-amber-300/40"
                  aria-label="Start Learning in Xitsonga"
                >
                  <BookOpen className="w-4 h-4 text-slate-950" />
                  <span>Start Learning in Xitsonga</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </a>

                {/* Button 2: Sungula Ku Funda hi siSwati */}
                <a
                  href="/learn?lang=ss"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigateToLearn('ss');
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-bold text-amber-300 bg-slate-900/90 hover:bg-slate-800 border-2 border-amber-400/60 hover:border-amber-400 rounded-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 min-h-[48px] whitespace-nowrap cursor-pointer"
                  aria-label="Sungula Ku Funda hi siSwati"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Sungula Ku Funda hi siSwati</span>
                </a>

                {/* Button 3: Start in English */}
                <a
                  href="/learn?lang=en"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigateToLearn('en');
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-slate-600 rounded-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 min-h-[48px] whitespace-nowrap cursor-pointer"
                  aria-label="Start in English"
                >
                  <span>Start in English</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>

              {/* PayFast 2-Day Free Trial Subscription Form */}
              <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800/90 shadow-xl max-w-xl">
                <PayFastSubscriptionForm />
              </div>

              {/* 4. LANGUAGE BADGES ROW UNDER BUTTONS */}
              <div className="mt-6 pt-5 border-t border-slate-800/90">
                <div className="flex items-center gap-2 mb-2.5">
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    Official South African Languages
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/70 border border-emerald-800/80 px-2 py-0.5 rounded-md ml-auto hidden sm:inline-block">
                    Full Native Audio &amp; Text
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
                  {languagesList.map((lang, index) => {
                    const isNative = lang.isNative;
                    return (
                      <React.Fragment key={lang.code}>
                        <button
                          type="button"
                          onClick={() => handleNavigateToLearn(lang.code)}
                          title={`Learn curriculum in ${lang.label}`}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all text-xs cursor-pointer ${
                            isNative
                              ? 'bg-amber-500/15 text-amber-300 border border-amber-400/50 hover:bg-amber-500/25 font-bold shadow-2xs'
                              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/90 hover:text-white border border-slate-700/60 font-medium'
                          }`}
                        >
                          <span>{lang.label}</span>
                          {isNative && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold text-amber-400 ml-0.5 bg-amber-400/15 px-1 rounded">
                              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                              <span>Native</span>
                            </span>
                          )}
                        </button>
                        {index < languagesList.length - 1 && (
                          <span aria-hidden="true" className="text-slate-600 text-xs hidden xs:inline select-none">
                            •
                          </span>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: 5. ILLUSTRATION OF 3 RURAL LEARNERS */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-700/80 bg-slate-900 group">
                <img
                  src="/src/assets/images/mkhuhlu_rural_learners_1792744372735.jpg"
                  alt="Three happy South African rural learners with smartphones learning maths and science in Mkhuhlu, Mpumalanga"
                  className="w-full h-72 sm:h-84 lg:h-96 object-cover object-center transform transition-transform duration-700 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                
                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Overlaid Location & Caption Badge */}
                <div className="absolute top-3 left-3 px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-700/80 flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold text-white">Mkhuhlu Village, Mpumalanga</span>
                </div>

                {/* Floating Bottom Card: Real Impact Highlight */}
                <div className="absolute bottom-3 left-3 right-3 p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-amber-400/30 shadow-xl text-slate-100">
                  <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1">
                    <span className="font-bold text-amber-400 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400" />
                      Rural STEM Excellence
                    </span>
                    <span className="font-mono text-emerald-400 font-semibold">100% Rural Owned</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-snug font-medium">
                    Built by Mkhuhlu youth to ensure no South African learner is left behind due to geography or mother-tongue barriers.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Maths · Science · Life Sciences</span>
                    <button
                      type="button"
                      onClick={() => handleNavigateToLearn('ts')}
                      className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition-colors"
                    >
                      <span>Explore Lessons</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
