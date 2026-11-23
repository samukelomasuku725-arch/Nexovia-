/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ELECTRICAL TRADE THEORY IN XITSONGA — N1, N2, N3 & NCV LEVEL 2-4
 * Nexovian dark blue + gold theme
 */

import React, { useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Globe,
  Sparkles,
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { isUserActive, startTwoDayFreeTrialCheckout } from '../../services/paystackService';
import { supabase } from '../../supabase';

const FEATURES_XITSONGA = [
  'AC/DC Circuits - ku hlamusela ka AC/DC circuits hi Xitsonga',
  'Transformers and Electrical Machines - ti-transformer na michini ya gezi',
  'Switchgear, Protection and Earthing - ku sirhelela na earthing',
  'N1, N2, N3 and NCV Level 2-4 Past Papers explained in Xitsonga',
  "Ohm's Law, Power, Energy calculations in Xitsonga",
  '11-Language AI Tutor - ask any Electrical question in Xitsonga and get step-by-step answer'
];

const HOW_IT_WORKS_STEPS = [
  { step: '1', text: 'Go to nexovian.group' },
  { step: '2', text: 'Select Xitsonga as your language' },
  { step: '3', text: 'Search "Electrical Trade Theory" or "N1 Electrical"' },
  { step: '4', text: 'Get instant explanation in Xitsonga' }
];

const KEYWORDS = [
  'Electrical Trade Theory Xitsonga',
  'N1 Electrical Xitsonga',
  'N2 Electrical Xitsonga',
  'N3 Electrical Xitsonga',
  'NCV Electrical Xitsonga',
  'gezi hi Xitsonga',
  'Electrical in Tsonga language',
  'TVET Electrical Xitsonga'
];

export const ElectricalXitsongaPage: React.FC = () => {
  const { setCurrentTab } = useLearning();
  const { user, isAuthenticated } = useAuth();
  const hasAccess = isAuthenticated && isUserActive(user);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const prevTitle = document.title;
    document.title = 'Electrical Trade Theory in Xitsonga - N1 N2 N3 & NCV Level 2-4 | Nexovian';
    return () => {
      document.title = prevTitle;
    };
  }, []);

  const navigate = (
    tab:
      | 'landing'
      | 'studyGuideTvet'
      | 'studyGuideNcv'
      | 'studyGuideChapter'
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
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('landing', '/');
            }}
            className="inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0D1E42] border border-[#1E3A6E] hover:border-[#FFD400] text-xs sm:text-sm font-bold text-slate-200 hover:text-[#FFD400] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>Back to Home</span>
          </a>

          <div className="flex flex-wrap items-center gap-2">
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
            <a
              href="/study-guide/ncv-level-2-3-4"
              onClick={(e) => {
                e.preventDefault();
                navigate('studyGuideNcv', '/study-guide/ncv-level-2-3-4');
              }}
              className="inline-flex items-center min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0D1E42] border border-[#FFD400]/40 hover:border-[#FFD400] text-xs sm:text-sm font-bold text-[#FFD400] transition-colors cursor-pointer"
            >
              NCV Level 2–4
            </a>
          </div>
        </div>

        {/* Hero Card */}
        <article className="bg-[#0D1E42] border border-[#FFD400]/45 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFD400]/15 border border-[#FFD400]/50 text-[#FFD400] text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 shrink-0" />
            <span>Gezi hi Xitsonga • N1, N2, N3 &amp; NCV Level 2–4</span>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-4xl text-white leading-tight break-words">
            Electrical Trade Theory in Xitsonga - N1 N2 N3 &amp; NCV Level 2-4 | Nexovian
          </h1>

          <p className="text-base sm:text-lg font-bold text-[#FFD400] leading-relaxed">
            Nexovian is the ONLY platform in South Africa that teaches Electrical Trade Theory in Xitsonga (Xitsonga).
          </p>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            For TVET students who struggle with English textbooks from Future Managers and DHET, Nexovian translates complex Electrical concepts into simple Xitsonga.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="/learn?lang=ts"
              onClick={(e) => {
                e.preventDefault();
                navigate('learn', '/learn?lang=ts');
              }}
              className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-sm shadow-lg transition-all cursor-pointer"
            >
              <Globe className="w-4 h-4 shrink-0" />
              <span>Open AI Tutor in Xitsonga</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </a>

            <a
              href="/study-guide/ncv-level-2-3-4/ncv-electrical-principles-and-practice"
              onClick={(e) => {
                e.preventDefault();
                navigate(
                  'studyGuideChapter',
                  '/study-guide/ncv-level-2-3-4/ncv-electrical-principles-and-practice'
                );
              }}
              className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#071530] hover:bg-[#102552] border border-[#FFD400]/60 text-[#FFD400] font-black text-sm transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>NCV Electrical Study Guide</span>
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

        {/* What you get in Xitsonga */}
        <section className="bg-[#0D1E42] border border-[#1E3A6E] rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#FFD400]">
            What you get in Xitsonga on Nexovian:
          </h2>
          <ul className="space-y-3">
            {FEATURES_XITSONGA.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#061128] border border-[#1E3A6E] text-sm sm:text-base text-slate-100"
              >
                <CheckCircle2 className="w-5 h-5 text-[#FFD400] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* How it works */}
        <section className="bg-[#0D1E42] border border-[#1E3A6E] rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#FFD400]">
            How it works:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HOW_IT_WORKS_STEPS.map((item) => (
              <div
                key={item.step}
                className="p-4 rounded-2xl bg-[#061128] border border-[#1E3A6E] flex items-center gap-3.5"
              >
                <span className="w-9 h-9 rounded-full bg-[#FFD400] text-black font-black text-sm flex items-center justify-center shrink-0">
                  {item.step}
                </span>
                <span className="text-sm sm:text-base font-bold text-white">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-[#071530] border border-[#FFD400]/40 space-y-3">
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Unlike static pre-translated books that don&apos;t exist, Nexovian uses on-demand AI translation to explain any Future Managers or DHET Electrical module in Xitsonga, Sepedi, Zulu, Venda, Tsonga and all 11 official languages.
            </p>
            <p className="text-sm sm:text-base font-black text-[#FFD400]">
              Study Electrical Trade Theory in your home language today - only on Nexovian.
            </p>
          </div>
        </section>

        {/* Keywords Footer Card */}
        <section className="bg-[#0D1E42] border border-[#1E3A6E] rounded-3xl p-5 sm:p-6 shadow-lg space-y-3">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
            Keywords
          </div>
          <div className="flex flex-wrap gap-2">
            {KEYWORDS.map((kw) => (
              <span
                key={kw}
                className="px-3 py-1.5 rounded-xl bg-[#061128] border border-[#1E3A6E] text-xs font-semibold text-slate-200"
              >
                {kw}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ElectricalXitsongaPage;
