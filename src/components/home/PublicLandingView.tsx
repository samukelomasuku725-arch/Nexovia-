/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN - NEW HOMEPAGE AT ROOT / (PUBLIC, NO LOGIN REQUIRED)
 * Modern Netflix-style: Black background #000000, Gold #FFD700, White text, mobile-first.
 * 
 * Hero:
 * - Headline: "Imagine a Netflix for Learning - One App from Grade 4 to University"
 * - Sub: "We don't change the exam paper. We change how you understand it."
 * - Sub2: "Original DBE Past Paper (English/Afrikaans) + Explain memo step-by-step in YOUR language"
 * - Badges: 11 languages: isiZulu, Sesotho, Afrikaans, Xitsonga, siSwati, Sepedi, Setswana, isiXhosa, Tshivenda, isiNdebele, English
 * - 2 Buttons: "Start FREE 2-Day Trial" -> /register | "Watch 20sec Demo" -> video modal
 * 
 * Features section (3 cards):
 * 1. CAPS notes & quizzes (Grade 4 to University)
 * 2. Instant homework help (Ask in your language)
 * 3. 4000+ DBE Past Papers with memo explanations
 * 
 * Pricing section:
 * - FREE for 2 Days, then R60/month
 * - List: All grades, All 11 languages, Cancel anytime
 * - Button: "Start Learning Now"
 * 
 * Trust footer:
 * "Built in Mpumalanga | Level 1 B-BBEE | 100% CAPS Aligned | Contact WhatsApp"
 */

import React, { useState } from 'react';
import {
  Play,
  Sparkles,
  Check,
  ChevronDown,
  Languages,
  FileText,
  HelpCircle,
  Calculator,
  MessageCircle,
  X,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useAuth } from '../../context/AuthContext';
import { SALanguageCode } from '../../types';

const SA_LANGUAGES_BADGES = [
  'isiZulu',
  'Sesotho',
  'Afrikaans',
  'Xitsonga',
  'siSwati',
  'Sepedi',
  'Setswana',
  'isiXhosa',
  'Tshivenda',
  'isiNdebele',
  'English'
];

const MEMO_DEMO_EXPLANATIONS: Record<string, string> = {
  isiZulu: 'Explanation in isiZulu: Okokuqala, susa u-3 ezinhlangothini zombili: 2x = 7 - 3 = 4. Bese uhlukanisa ngo-2 ezinhlangothini zombili ukuze uthole u-x: x = 4 / 2 = 2. Impendulo yokugcina ngu-x = 2.',
  Sepedi: 'Explanation in Sepedi: Sa mathomo, tloša 3 mahlakoreng ka bobedi: 2x = 7 - 3 = 4. Ke moka arola ka 2 mahlakoreng ka bobedi go hwetša x: x = 4 / 2 = 2. Karabo ya mafelelo ke x = 2.',
  siSwati: 'Explanation in siSwati: Kwekucala, susa 3 etinhlangotsini totimbili: 2x = 7 - 3 = 4. Ngemuva kwaloko yehlukanisa nga-2 kuto totimbili tinhlangotsi kute utfole x: x = 4 / 2 = 2. Imphendvulo yekugcina ngu-x = 2.',
  Xitsonga: 'Explanation in Xitsonga: Xo sungula, susa 3 eka matlhelo ha mambirhi: 2x = 7 - 3 = 4. Kutani ava hi 2 eka matlhelo ha mambirhi ku kuma x: x = 4 / 2 = 2. Nhlamulo yo hetelela i x = 2.',
  Afrikaans: 'Explanation in Afrikaans: Eerstens, trek 3 aan albei kante van die vergelyking af: 2x = 7 - 3 = 4. Deel dan deur 2 aan albei kante om x te kry: x = 4 / 2 = 2. Die finale antwoord is x = 2.',
  isiXhosa: 'Explanation in isiXhosa: Okokuqala, thabatha u-3 kumacala omabini: 2x = 7 - 3 = 4. Emva koko yahlula ngo-2 kumacala omabini ukuze ufumane u-x: x = 4 / 2 = 2. Imfihlelo yokugqibela ngu-x = 2.',
  Sesotho: 'Explanation in Sesotho: Sa pele, tlosa 3 mahlakoreng ka bobedi: 2x = 7 - 3 = 4. Ka mora moo arola ka 2 mahlakoreng ka bobedi ho fumana x: x = 4 / 2 = 2. Karabo ya ho qetela ke x = 2.',
  Setswana: 'Explanation in Setswana: Sa ntlha, tlosa 3 mo matlhakoreng ootlhe: 2x = 7 - 3 = 4. Go tswa foo kgaoganya ka 2 mo matlhakoreng ootlhe go bona x: x = 4 / 2 = 2. Karabo ya bofelo ke x = 2.',
  Tshivenda: 'Explanation in Tshivenda: Tsha u thoma, tusa 3 matungo othe: 2x = 7 - 3 = 4. Nga murahu kovha nga 2 matungo othe u wana x: x = 4 / 2 = 2. Phindulo ya u fhedzisela ndi x = 2.',
  isiNdebele: 'Explanation in isiNdebele: Kokuthoma, susa u-3 kiyo yomibili imihlangothi: 2x = 7 - 3 = 4. Ngemva kwalokho yahlula ngo-2 kiyo yomibili imihlangothi ukufumana u-x: x = 4 / 2 = 2. Imvelaphi yokugcina ngu-x = 2.',
  English: 'Explanation in English: First, subtract 3 from both sides: 2x = 7 - 3 = 4. Then divide both sides by 2 to solve for x: x = 4 / 2 = 2. The final answer is x = 2.'
};

export const PublicLandingView: React.FC = () => {
  const { setCurrentTab } = useLearning();
  const { isAuthenticated } = useAuth();

  const [demoLang, setDemoLang] = useState('isiZulu');
  const [isDemoDropdownOpen, setIsDemoDropdownOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleStartTrial = () => {
    setCurrentTab('signup');
  };

  const handleGoToLogin = () => {
    setCurrentTab('login');
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans antialiased selection:bg-[#FFD700] selection:text-black">
      
      {/* 1. NETFLIX-STYLE HEADER */}
      <header className="sticky top-0 z-50 bg-[#000000]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          
          {/* Logo NEXOVIAN Left */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-full bg-[#FFD700] text-black flex items-center justify-center font-black text-xl shadow-lg">
              N
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-2xl tracking-widest text-[#FFD700]">
                NEXOVIAN
              </span>
              <span className="text-[10px] text-white/60 tracking-widest uppercase -mt-1 font-mono">
                The Learning Brain
              </span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentTab('calculator')}
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 text-xs font-semibold hover:border-[#FFD700] hover:text-[#FFD700] transition-colors"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Step-by-Step Calculator</span>
            </button>

            {isAuthenticated ? (
              <button
                onClick={() => setCurrentTab('home')}
                className="px-5 py-2.5 rounded-full bg-[#FFD700] hover:bg-yellow-400 text-black font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Go to App</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <>
                <button
                  onClick={handleGoToLogin}
                  className="px-5 py-2 rounded-full border border-white/20 hover:border-white/40 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Login
                </button>

                <button
                  onClick={handleStartTrial}
                  className="px-5 py-2.5 rounded-full bg-[#FFD700] hover:bg-yellow-400 text-black font-black text-xs sm:text-sm shadow-lg shadow-yellow-500/20 transition-all cursor-pointer transform hover:scale-105 active:scale-95"
                >
                  Start FREE 2-Day Trial
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        {/* ========================================================
            HERO SECTION (NETFLIX AESTHETIC)
           ======================================================== */}
        <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-32 px-4 sm:px-6 text-center border-b border-white/10">
          
          {/* Subtle Netflix cinematic glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FFD700]/10 rounded-full blur-[140px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD700]/15 border border-[#FFD700]/40 text-[#FFD700] text-xs font-mono font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>South Africa&apos;s 11 Official Languages Education Platform</span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.12]">
              Imagine a Netflix for Learning &mdash; <span className="text-[#FFD700]">One App from Grade 4 to University</span>
            </h1>

            {/* Sub */}
            <p className="mt-5 text-lg sm:text-2xl text-white font-extrabold max-w-2xl mx-auto">
              &ldquo;We don&apos;t change the exam paper. We change how you understand it.&rdquo;
            </p>

            {/* Sub2 */}
            <p className="mt-2 text-sm sm:text-base text-white/70 max-w-xl mx-auto font-medium">
              Original DBE Past Paper (English/Afrikaans) + Explain memo step-by-step in YOUR language
            </p>

            {/* 11 Languages Badges */}
            <div className="mt-7 flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
              {SA_LANGUAGES_BADGES.map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/15 text-white/90 transition-colors"
                >
                  {lang}
                </span>
              ))}
            </div>

            {/* 2 CTA Buttons */}
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <button
                onClick={handleStartTrial}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#FFD700] hover:bg-yellow-400 text-black font-black text-base shadow-xl shadow-yellow-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Start FREE 2-Day Trial</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-base border border-white/20 transition-all cursor-pointer flex items-center justify-center gap-2.5"
              >
                <div className="w-6 h-6 rounded-full bg-[#FFD700] text-black flex items-center justify-center font-bold">
                  <Play className="w-3 h-3 fill-black ml-0.5" />
                </div>
                <span>Watch 20sec Demo</span>
              </button>
            </div>

            {/* Micro trust guarantee */}
            <p className="mt-4 text-xs text-white/40">
              ✓ 2 Days Free &bull; ✓ R60/month after &bull; ✓ Cancel anytime with 1 click
            </p>
          </div>
        </section>

        {/* ========================================================
            FEATURES SECTION (3 CARDS)
           ======================================================== */}
        <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-mono font-bold text-[#FFD700] tracking-widest block mb-1">
              BUILT FOR SOUTH AFRICAN LEARNERS
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white">
              Everything You Need to Ace Your Exams
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: CAPS Notes & Quizzes */}
            <div className="bg-[#0D0D0D] border border-white/10 hover:border-[#FFD700]/50 rounded-3xl p-7 transition-all duration-300 shadow-xl group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#FFD700]/10 text-[#FFD700] flex items-center justify-center font-bold mb-5 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-7 h-7" />
                </div>
                <h3 className="font-display font-black text-xl text-white mb-2">
                  CAPS Notes &amp; Quizzes (Grade 4 to University)
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Full Term 1 to Term 4 syllabus coverage for School, TVET (NATED N1&ndash;N6), and University modules with interactive quiz feedback.
                </p>
              </div>
              <div className="pt-5 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#FFD700]">
                <span>Grades 4&ndash;12 &bull; TVET &bull; University</span>
                <Check className="w-4 h-4" />
              </div>
            </div>

            {/* Card 2: Instant Homework Help */}
            <div className="bg-[#0D0D0D] border border-white/10 hover:border-[#FFD700]/50 rounded-3xl p-7 transition-all duration-300 shadow-xl group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#FFD700]/10 text-[#FFD700] flex items-center justify-center font-bold mb-5 group-hover:scale-105 transition-transform">
                  <Languages className="w-7 h-7" />
                </div>
                <h3 className="font-display font-black text-xl text-white mb-2">
                  Instant Homework Help (Ask in Your Language)
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Stuck on a tricky concept? Ask questions and receive step-by-step teacher explanations in your mother tongue &mdash; in all 11 SA languages.
                </p>
              </div>
              <div className="pt-5 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#FFD700]">
                <span>11 Official Languages</span>
                <Check className="w-4 h-4" />
              </div>
            </div>

            {/* Card 3: 4000+ DBE Past Papers with Memos */}
            <div className="bg-[#0D0D0D] border border-white/10 hover:border-[#FFD700]/50 rounded-3xl p-7 transition-all duration-300 shadow-xl group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#FFD700]/10 text-[#FFD700] flex items-center justify-center font-bold mb-5 group-hover:scale-105 transition-transform">
                  <FileText className="w-7 h-7" />
                </div>
                <h3 className="font-display font-black text-xl text-white mb-2">
                  4000+ DBE Past Papers with Memo Explanations
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  National Senior Certificate (NSC) exam papers with official marking guidelines. Tap one button to translate any memo line-by-line.
                </p>
              </div>
              <div className="pt-5 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#FFD700]">
                <span>2018&ndash;2024 Exam Walkthroughs</span>
                <Check className="w-4 h-4" />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            INTERACTIVE MEMO EXPLANATION DEMO (EXPERIENCE IT NOW)
           ======================================================== */}
        <section className="py-14 sm:py-20 bg-[#0A0A0A] border-y border-white/10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <span className="text-xs uppercase font-mono font-bold text-[#FFD700] tracking-widest block mb-1">
                SEE HOW IT WORKS
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                Live Memo Explanation in 11 Languages
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-white/60">
                DBE exam papers stay in English, but the underlying solution is explained in your mother tongue
              </p>
            </div>

            <div className="bg-[#121212] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="p-4 rounded-2xl bg-black border border-white/10 font-mono space-y-2">
                <div className="flex items-center justify-between text-xs text-white/50 border-b border-white/10 pb-2">
                  <span className="text-[#FFD700] font-bold">DBE Mathematics NSC Examination</span>
                  <span>Paper 1 &bull; Question 1.1</span>
                </div>
                <div className="text-base sm:text-lg font-bold text-white pt-1">
                  Solve for x: <span className="text-[#FFD700]">2x + 3 = 7</span>
                </div>
                <div className="text-xs text-emerald-400 font-bold border-t border-white/10 pt-2 flex items-center justify-between">
                  <span>Official Memo Solution:</span>
                  <span className="bg-emerald-950/80 px-2 py-0.5 rounded text-emerald-300">
                    x = 2 [2 Marks]
                  </span>
                </div>
              </div>

              {/* Memo selector */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs font-bold text-white/80 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#FFD700]" />
                  <span>Don&apos;t understand the memo? Get it in your language:</span>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setIsDemoDropdownOpen(!isDemoDropdownOpen)}
                    className="px-4 py-2.5 rounded-xl bg-[#007A4D] hover:bg-[#006640] text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Languages className="w-4 h-4 text-[#FFD700]" />
                    <span>Explain in: {demoLang}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isDemoDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDemoDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 max-h-60 overflow-y-auto bg-[#1A1A1A] border border-white/20 rounded-2xl shadow-2xl z-30 p-1.5 divide-y divide-white/10">
                      {SA_LANGUAGES_BADGES.map((l) => (
                        <button
                          key={l}
                          onClick={() => {
                            setDemoLang(l);
                            setIsDemoDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                            demoLang === l ? 'bg-[#FFD700] text-black font-bold' : 'text-white hover:bg-white/10'
                          }`}
                        >
                          <span>{l}</span>
                          {demoLang === l && <Check className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Yellow Explanation Box */}
              <div className="mt-4 p-5 rounded-2xl bg-[#FFF9D2] text-slate-950 border-2 border-[#F59E0B] shadow-lg">
                <div className="flex items-center justify-between mb-1 pb-1 border-b border-amber-300">
                  <span className="text-[11px] font-mono font-black uppercase text-amber-950">
                    NEXOVIAN Multilingual Memo Explainer
                  </span>
                  <span className="text-[11px] font-bold bg-amber-200 px-2 py-0.5 rounded text-amber-900">
                    {demoLang}
                  </span>
                </div>
                <p className="text-xs sm:text-[14px] leading-relaxed font-semibold text-slate-900 mt-1">
                  {MEMO_DEMO_EXPLANATIONS[demoLang] || MEMO_DEMO_EXPLANATIONS.English}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            PRICING SECTION (FREE 2 DAYS, THEN R60/MONTH)
           ======================================================== */}
        <section id="pricing" className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-mono font-bold text-[#FFD700] tracking-widest block mb-1">
              SIMPLE &amp; EQUAL PRICING
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
              One Price. Everyone Equal.
            </h2>
          </div>

          <div className="max-w-md mx-auto bg-[#0D0D0D] border-2 border-[#FFD700] rounded-3xl p-8 sm:p-10 text-center shadow-2xl relative overflow-hidden">
            <div className="inline-block px-3 py-1 rounded-full bg-[#FFD700] text-black text-xs font-mono font-bold uppercase mb-4">
              FREE FOR 2 DAYS, THEN R60/MONTH
            </div>

            <div className="flex items-baseline justify-center gap-1.5 mb-2">
              <span className="text-5xl font-display font-black text-[#FFD700]">R60</span>
              <span className="text-sm font-bold text-white/60">/ month</span>
            </div>

            <p className="text-xs text-white/70 mb-6">
              Pay R0 today &bull; Full unlimited access for 48 hours
            </p>

            <ul className="text-left text-xs sm:text-sm space-y-3 mb-8 text-white/90">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#FFD700] shrink-0" />
                <span>All grades (Grade 4 to University)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#FFD700] shrink-0" />
                <span>All 11 official South African languages</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#FFD700] shrink-0" />
                <span>Cancel anytime &bull; No hidden fees</span>
              </li>
            </ul>

            <button
              onClick={handleStartTrial}
              className="w-full py-4 rounded-xl bg-[#FFD700] hover:bg-yellow-400 text-black font-black text-base shadow-xl shadow-yellow-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Start Learning Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="mt-3 text-[11px] text-white/40">
              Secured by Paystack &bull; Level 1 B-BBEE
            </p>
          </div>
        </section>
      </main>

      {/* ========================================================
          TRUST FOOTER
          Built in Mpumalanga | Level 1 B-BBEE | 100% CAPS Aligned | Contact WhatsApp
         ======================================================== */}
      <footer className="border-t border-white/10 py-10 px-4 sm:px-6 bg-[#000000] text-center text-xs text-white/60">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FFD700] text-black font-bold flex items-center justify-center text-sm">
              N
            </div>
            <span className="font-display font-black text-white text-base">
              NEXOVIAN
            </span>
          </div>

          <p className="text-xs text-white/70">
            Built in Mpumalanga &bull; Level 1 B-BBEE &bull; 100% CAPS Aligned &bull;{' '}
            <a
              href="https://wa.me/27659202685?text=Hi%20Nexovian%2C%20I%20have%20a%20question%20about%20learning%20in%20my%20language"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FFD700] hover:underline font-bold inline-flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Contact WhatsApp</span>
            </a>
          </p>

          <p className="text-white/40 text-[11px]">
            &copy; {new Date().getFullYear()} Nexovian (Pty) Ltd. All rights reserved.
          </p>
        </div>
      </footer>

      {/* 20-Second Demo Modal */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-white/20 rounded-3xl max-w-lg w-full p-6 text-center shadow-2xl relative">
            <button
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-white/60 hover:text-white rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-14 h-14 rounded-full bg-[#FFD700] text-black flex items-center justify-center mx-auto mb-4 font-bold shadow-lg">
              <Play className="w-6 h-6 fill-black ml-1" />
            </div>
            <h3 className="font-display font-black text-xl text-white mb-2">
              20-Second Platform Walkthrough
            </h3>
            <p className="text-xs text-white/70 mb-5 leading-relaxed">
              Nexovian allows any learner to browse DBE past papers, click &ldquo;Explain in My Language&rdquo;, and understand the math and science step-by-step.
            </p>
            <div className="aspect-video bg-black rounded-2xl border border-white/10 flex flex-col items-center justify-center p-6 text-xs text-white/60">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-left w-full space-y-1 mb-3">
                <span className="text-[#FFD700] font-bold block">1. Choose any subject &amp; past paper</span>
                <span>2. Tap [🌐 Explain in My Language]</span>
                <span className="text-emerald-400 block">3. Immediate mother-tongue explanation in isiZulu, Sesotho, etc.</span>
              </div>
              <button
                onClick={() => {
                  setIsDemoModalOpen(false);
                  setCurrentTab('signup');
                }}
                className="w-full py-3 bg-[#FFD700] text-black font-bold rounded-xl text-xs hover:bg-yellow-400"
              >
                Start Your 2-Day Free Trial
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
