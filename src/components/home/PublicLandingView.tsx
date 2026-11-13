/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN (Pty) Ltd | Reg: 2026/234078/07 | nexovian.group
 * 2-Day Free Trial -> R60/month via Paystack
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Play,
  Sparkles,
  Check,
  CheckCircle2,
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
  Search,
  CreditCard,
  AlertCircle
} from 'lucide-react';
import { FULL_PAPERS } from '../papers/PastPapersView';
import { useLearning } from '../../context/LearningContext';
import { useAuth } from '../../context/AuthContext';
import { SALanguageCode } from '../../types';
import {
  getCachedPaystackStatus,
  isUserActive,
  startTwoDayFreeTrialCheckout,
  syncSubscriptionStatus
} from '../../services/paystackService';


export interface LanguageOption {
  code: SALanguageCode;
  name: string;
  native: string;
  isNativeSpecial?: boolean;
}

export const ALL_11_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'af', name: 'Afrikaans', native: 'Afrikaans' },
  { code: 'zu', name: 'isiZulu', native: 'isiZulu' },
  { code: 'xh', name: 'isiXhosa', native: 'isiXhosa' },
  { code: 'nso', name: 'Sepedi', native: 'Sesotho sa Leboa' },
  { code: 'st', name: 'Sesotho', native: 'Sesotho' },
  { code: 'tn', name: 'Setswana', native: 'Setswana' },
  { code: 'ss', name: 'siSwati', native: 'siSwati', isNativeSpecial: true },
  { code: 'ts', name: 'Xitsonga', native: 'Xitsonga', isNativeSpecial: true },
  { code: 've', name: 'Tshivenda', native: 'Tshivenḓa' },
  { code: 'nr', name: 'isiNdebele', native: 'isiNdebele' },
  { code: 'sasl', name: 'SASL 🤟', native: 'SASL 🤟', isNativeSpecial: true }
];

export interface GradeOption {
  id: string;
  name: string;
  level: string;
  badge: string;
  subjectsCount: number;
  papersCount: number;
}

export const ALL_GRADES: GradeOption[] = [
  { id: 'grade-4', name: 'Grade 4', level: 'Intermediate Phase', badge: 'CAPS', subjectsCount: 6, papersCount: 180 },
  { id: 'grade-5', name: 'Grade 5', level: 'Intermediate Phase', badge: 'CAPS', subjectsCount: 6, papersCount: 195 },
  { id: 'grade-6', name: 'Grade 6', level: 'Intermediate Phase', badge: 'CAPS', subjectsCount: 6, papersCount: 210 },
  { id: 'grade-7', name: 'Grade 7', level: 'Senior Phase', badge: 'CAPS', subjectsCount: 9, papersCount: 290 },
  { id: 'grade-8', name: 'Grade 8', level: 'Senior Phase', badge: 'CAPS', subjectsCount: 9, papersCount: 310 },
  { id: 'grade-9', name: 'Grade 9', level: 'Senior Phase', badge: 'CAPS', subjectsCount: 9, papersCount: 340 },
  { id: 'grade-10', name: 'Grade 10', level: 'FET Phase', badge: 'CAPS', subjectsCount: 12, papersCount: 520 },
  { id: 'grade-11', name: 'Grade 11', level: 'FET Phase', badge: 'CAPS', subjectsCount: 12, papersCount: 580 },
  { id: 'grade-12', name: 'Grade 12', level: 'FET Phase (Matric)', badge: 'CAPS', subjectsCount: 14, papersCount: 850 },
  { id: 'tvet', name: 'TVET Colleges', level: 'N1–N6 / NC(V)', badge: 'NATED', subjectsCount: 18, papersCount: 420 },
  { id: 'university', name: 'University', level: 'Higher Education', badge: 'Degree', subjectsCount: 24, papersCount: 360 }
];

const WHATSAPP_URL = 'https://wa.me/27636508381?text=Hi%20Nexovian%2C%20I%20have%20a%20question%20about%20learning%20in%20my%20language';

const MEMO_DEMO_EXPLANATIONS: Record<string, string> = {
  isiZulu:
    'Sombulula u-x: 2x + 3 = 7. Isinyathelo 1: Khipha u-3 nhlangothi zombili: 2x = 7 - 3 = 4. Isinyathelo 2: Hlukanisa ngo-2 nhlangothi zombili: x = 4 / 2 = 2. Impendulo yokugcina: x = 2.',
  Afrikaans:
    'Los op vir x: 2x + 3 = 7. Stap 1: Trek 3 aan beide kante af: 2x = 7 - 3 = 4. Stap 2: Deel deur 2 aan beide kante: x = 4 / 2 = 2. Finale antwoord: x = 2.',
  Sepedi:
    'Rarolla x: 2x + 3 = 7. Mogato 1: Ntšha 3 mahlakoreng a mabedi: 2x = 7 - 3 = 4. Mogato 2: Arola ka 2: x = 4 / 2 = 2. Karabo ya mafelelo: x = 2.',
  Sesotho:
    ' rarolla x: 2x + 3 = 7. Mohato 1: Tlosa 3 mahlakoreng ka bobeli: 2x = 7 - 3 = 4. Mohato 2: Arola ka 2: x = 4 / 2 = 2. Karabo: x = 2.',
  isiXhosa:
    'Sombulula u-x: 2x + 3 = 7. Inyathelo 1: Susa u-3 kumacala omabini: 2x = 7 - 3 = 4. Inyathelo 2: Yahlula ngo-2: x = 4 / 2 = 2. Impendulo: x = 2.',
  Setswana:
    'Rarabolola x: 2x + 3 = 7. Kgato 1: Ntsha 3 mo matlhakoreng oomabedi: 2x = 7 - 3 = 4. Kgato 2: Kgaoganya ka 2: x = 4 / 2 = 2. Karabo: x = 2.',
  Xitsonga:
    'Ololoxa x: 2x + 3 = 7. Goza 1: Susa 3 matlhelo hamambirhi: 2x = 7 - 3 = 4. Goza 2: Ava hi 2: x = 4 / 2 = 2. Nhlamulo: x = 2.',
  siSwati:
    'Catulula x: 2x + 3 = 7. Sinhatselo 1: Susa 3 tinhlangotsini totimbili: 2x = 7 - 3 = 4. Sinhatselo 2: Hlukanisa nga-2: x = 4 / 2 = 2. Imphendvulo: x = 2.',
  Tshivenda:
    'Tandululani x: 2x + 3 = 7. Vhukando 1: Tutshelani 3 masiani othe: 2x = 7 - 3 = 4. Vhukando 2: Kovhani nga 2: x = 4 / 2 = 2. Phindulo: x = 2.',
  isiNdebele:
    'Rarulula u-x: 2x + 3 = 7. Igadango 1: Susa u-3 kizo zombili iinhlangothi: 2x = 7 - 3 = 4. Igadango 2: Hlukanisa ngo-2: x = 4 / 2 = 2. Imfundo: x = 2.',
  English:
    'Solve for x: 2x + 3 = 7. Step 1: Subtract 3 from both sides: 2x = 7 - 3 = 4. Step 2: Divide both sides by 2: x = 4 / 2 = 2. Final answer: x = 2.'
};

export const PublicLandingView: React.FC = () => {
  const { setCurrentTab, setActiveLearningLanguage, updateLearningContext } = useLearning();
  const { isAuthenticated, user } = useAuth();

  // Selected Language & Grade
  const [selectedLang, setSelectedLang] = useState<SALanguageCode>('zu');
  const [selectedGradeId, setSelectedGradeId] = useState<string>('grade-10');

  // Real subscription state (requires Auth + active Paystack trial or monthly subscription)
  const [hasActiveAccess, setHasActiveAccess] = useState<boolean>(() => isAuthenticated && isUserActive(user));
  const [subRecord, setSubRecord] = useState(() => (user?.email ? getCachedPaystackStatus(user.email) : null));
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const refresh = () => {
      if (!mounted) return;
      setHasActiveAccess(Boolean(isAuthenticated && isUserActive(user)));
      setSubRecord(user?.email ? getCachedPaystackStatus(user.email) : null);
    };
    refresh();
    if (isAuthenticated && user?.email) {
      syncSubscriptionStatus(user.email, user.id)
        .then(() => refresh())
        .catch(() => {});
    }
    window.addEventListener('nexovian-subscription-updated', refresh);
    return () => {
      mounted = false;
      window.removeEventListener('nexovian-subscription-updated', refresh);
    };
  }, [isAuthenticated, user?.email, user?.id]);

  // Memo Demo state
  const [demoLang, setDemoLang] = useState('isiZulu');
  const [isDemoDropdownOpen, setIsDemoDropdownOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Global Search state
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Global Search filter across FULL_PAPERS, module codes, subjects, and grades
  const globalSearchResults = useMemo(() => {
    const q = globalSearchQuery.trim().toLowerCase();
    if (!q) return [];
    return FULL_PAPERS.filter((paper) => {
      const matchTitle = paper.title.toLowerCase().includes(q);
      const matchSubject = paper.subject.toLowerCase().includes(q);
      const matchGrade = paper.gradeName.toLowerCase().includes(q) || paper.gradeId.toLowerCase().includes(q);
      const matchSession = paper.session.toLowerCase().includes(q);
      const matchQuestions = paper.questions.some(
        (question) =>
          question.questionText.toLowerCase().includes(q) ||
          question.officialMemoEn.toLowerCase().includes(q)
      );
      return matchTitle || matchSubject || matchGrade || matchSession || matchQuestions;
    }).slice(0, 30);
  }, [globalSearchQuery]);

  const handleOpenGlobalSearch = (presetQuery?: string) => {
    if (presetQuery) {
      setGlobalSearchQuery(presetQuery);
    }
    setIsSearchModalOpen(true);
  };

  const persistSelectedContext = () => {
    try {
      localStorage.setItem('nexovian_academy_language', selectedLang);
      localStorage.setItem('nexovian_selected_grade', selectedGradeId);
      setActiveLearningLanguage(selectedLang);
      const gradeObj = ALL_GRADES.find((g) => g.id === selectedGradeId);
      if (gradeObj) {
        updateLearningContext({
          language: selectedLang,
          gradeOrProgramme: gradeObj.name,
          educationLevel: gradeObj.level
        });
      }
    } catch (_) {}
  };

  const handleStartTrial = async () => {
    persistSelectedContext();
    setCheckoutError(null);
    setCheckoutLoading(true);
    const result = await startTwoDayFreeTrialCheckout({
      user,
      onRequireAuth: () => {
        setCurrentTab('login');
        if (typeof window !== 'undefined') {
          window.history.pushState({}, '', '/login');
        }
      }
    });
    if (!result.success && result.error) {
      setCheckoutError(result.error);
    }
    setCheckoutLoading(false);
  };

  const handleStartLearning = () => {
    persistSelectedContext();
    setCurrentTab('home');
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/app');
    }
  };

  const navigateToPastPapers = (gradeId?: string) => {
    setCurrentTab('papers');
    if (typeof window !== 'undefined') {
      const url = gradeId ? `/papers?grade=${gradeId}` : '/papers';
      window.history.pushState({}, '', url);
    }
  };

  const selectedLangObj = ALL_11_LANGUAGES.find((l) => l.code === selectedLang) || ALL_11_LANGUAGES[2];
  const selectedGradeObj = ALL_GRADES.find((g) => g.id === selectedGradeId) || ALL_GRADES[6];

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans antialiased selection:bg-[#FFB612] selection:text-black">
      
      {/* 1. HEADER (DEEP NAVY ACCENTS) */}
      <header className="sticky top-0 z-50 bg-[#000000]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          
          {/* Logo NEXOVIAN Left */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 rounded-full bg-[#FFB612] text-black flex items-center justify-center font-black text-xl shadow-lg">
              N
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-2xl tracking-widest text-[#FFB612]">
                NEXOVIAN
              </span>
              <span className="text-[10px] text-white/60 tracking-widest uppercase -mt-1 font-mono">
                The Learning Brain
              </span>
            </div>
          </div>

          {/* Nav Links & Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Global Search Input in Header */}
            <div className="hidden lg:flex items-center relative">
              <Search className="w-4 h-4 text-[#FFB612] absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder="🔍 Search: INF1505, N4 Management, Grade 6 Social Sciences..."
                value={globalSearchQuery}
                onChange={(e) => {
                  setGlobalSearchQuery(e.target.value);
                  setIsSearchModalOpen(true);
                }}
                onFocus={() => setIsSearchModalOpen(true)}
                className="w-72 pl-9 pr-3 py-1.5 rounded-full bg-[#1a1a1a] border border-[#d4af37] text-white text-xs placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-[#FFB612]"
              />
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="lg:hidden p-2 rounded-full bg-[#1a1a1a] border border-[#d4af37] text-[#FFB612] hover:bg-white/10"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Past Papers & Memos Navbar Link */}
            <button
              onClick={() => navigateToPastPapers()}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/20 text-xs font-bold text-white hover:border-[#FFB612] hover:text-[#FFB612] transition-colors cursor-pointer"
            >
              <span>📚 Past Papers &amp; Memos</span>
            </button>

            <button
              onClick={() => setCurrentTab('calculator')}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/20 text-xs font-semibold text-white/80 hover:text-white transition-colors"
            >
              <Calculator className="w-3.5 h-3.5 text-[#FFB612]" />
              <span>Step-by-Step Calculator</span>
            </button>

            {/* Nexovian Study Guide Yellow Header Button */}
            <a
              href="/study-guide"
              onClick={(e) => {
                e.preventDefault();
                setCurrentTab('studyGuide');
                if (typeof window !== 'undefined') {
                  window.history.pushState({}, '', '/study-guide');
                }
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#FFD400] hover:bg-yellow-400 text-black font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer whitespace-nowrap transform hover:scale-105 active:scale-95"
            >
              <span>📚</span>
              <span>Nexovian Study Guide</span>
            </a>

            {/* Header Action Buttons */}
            {hasActiveAccess ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentTab('mySubscription')}
                  className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>My Subscription</span>
                </button>
                <button
                  onClick={handleStartLearning}
                  className="px-4 py-2 rounded-full bg-[#FFB612] hover:bg-yellow-400 text-black font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer transform hover:scale-105 active:scale-95"
                >
                  Open App
                </button>
              </div>
            ) : (
              <>
                {isAuthenticated ? (
                  <button
                    onClick={() => setCurrentTab('mySubscription')}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-medium text-white cursor-pointer"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-[#FFB612]" />
                    <span>
                      {subRecord?.status === 'cancelled'
                        ? 'Cancelled'
                        : subRecord?.status === 'expired'
                        ? 'Trial Expired'
                        : 'Trial Not Started'}
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentTab('login')}
                    className="px-4 py-2 rounded-full border border-white/20 hover:border-white/40 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    Login
                  </button>
                )}

                <button
                  onClick={handleStartTrial}
                  className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#007A4D] hover:bg-emerald-600 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-700/30 transition-all cursor-pointer transform hover:scale-105 active:scale-95 flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-[#FFB612]" />
                  <span>Start 2-Day Free Trial</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        {/* ========================================================
            HERO SECTION (NETFLIX AESTHETIC WITH DEEP NAVY GLOW)
           ======================================================== */}
        <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 text-center border-b border-white/10">
          
          {/* Subtle Deep Navy cinematic glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#0A1F44] rounded-full blur-[140px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1F44] border border-[#FFB612]/50 text-[#FFB612] text-xs font-mono font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB612]" />
              <span>SOUTH AFRICA&apos;S 12 OFFICIAL LANGUAGES (incl SASL 🤟) EDUCATION PLATFORM</span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.12]">
              Imagine a Netflix for Learning &mdash; <span className="text-[#FFB612]">One App from Grade 4 to University</span>
            </h1>

            {/* Sub */}
            <p className="mt-5 text-lg sm:text-2xl text-white font-extrabold max-w-2xl mx-auto">
              &ldquo;We don&apos;t change the exam paper. We change how you understand it.&rdquo;
            </p>

            {/* Sub2 */}
            <p className="mt-2 text-sm sm:text-base text-white/70 max-w-xl mx-auto font-medium">
              Original DBE Past Paper (English/Afrikaans) + Explain memo step-by-step in YOUR language
            </p>

            {/* Popular Search Chips */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-[#FFB612] font-mono font-bold flex items-center gap-1">
                <Search className="w-3.5 h-3.5" />
                <span>Popular:</span>
              </span>
              {[
                { label: 'INF1505', q: 'INF1505' },
                { label: 'N4 Management', q: 'N4 Management Communication' },
                { label: 'Grade 12 Maths', q: 'Grade 12 Mathematics' },
                { label: 'FAC1502', q: 'FAC1502' },
                { label: 'Grade 6 Social Sciences', q: 'Grade 6 Social Sciences' },
                { label: 'N4 Computer Practice', q: 'Computer Practice' }
              ].map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => handleOpenGlobalSearch(chip.q)}
                  className="px-3 py-1 rounded-full bg-[#1a1a1a] hover:bg-[#262626] border border-[#d4af37]/60 hover:border-[#FFB612] text-white/90 hover:text-[#FFB612] font-semibold text-[11px] transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Nexovian Study Guide Yellow Hero Button */}
            <div className="mt-7 flex justify-center">
              <a
                href="/study-guide"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentTab('studyGuide');
                  if (typeof window !== 'undefined') {
                    window.history.pushState({}, '', '/study-guide');
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#FFD400] hover:bg-yellow-400 text-black font-bold text-base sm:text-lg shadow-[0_0_25px_rgba(255,212,0,0.5)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>📚</span>
                <span>Nexovian Study Guide</span>
              </a>
            </div>

            {/* ACTIVE SUBSCRIPTION CARD OR SINGLE MAIN 2-DAY FREE TRIAL CTA */}
            {hasActiveAccess ? (
              <div id="instant-unlock" className="mt-10 max-w-3xl mx-auto bg-gradient-to-r from-emerald-950/90 via-[#0A1F44] to-black border-2 border-emerald-400 rounded-3xl p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold uppercase mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#FFB612]" />
                  <span>
                    {subRecord?.status === 'trial' ? '2-Day Free Trial Active' : 'Subscription Active'}
                  </span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                  Welcome Back &mdash; Full Access Unlocked
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                  All Study Guides, Grade 4 to University subjects, 12 official languages (including SASL), DBE past papers, and AI Tutor are unlocked.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentTab('studyGuide')}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#FFB612] hover:bg-yellow-400 text-black font-black text-base shadow-[0_0_25px_rgba(255,182,18,0.4)] flex items-center justify-center gap-2.5 cursor-pointer transition-transform active:scale-95"
                  >
                    <BookOpen className="w-5 h-5 text-black" />
                    <span>Open Study Guide</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentTab('mySubscription')}
                    className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>My Subscription</span>
                  </button>
                </div>
              </div>
            ) : (
              <div id="instant-unlock" className="mt-10 max-w-3xl mx-auto bg-[#0A1F44] border-2 border-[#FFB612] rounded-3xl p-6 sm:p-8 text-left shadow-2xl relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-white/10">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold uppercase text-[#FFB612]">
                      <Sparkles className="w-4 h-4 text-[#FFB612]" />
                      <span>2-Day Free Trial &bull; First R60 charge in 2 days</span>
                      {isAuthenticated && (
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 text-[10px]">
                          {subRecord?.status === 'cancelled'
                            ? 'Cancelled'
                            : subRecord?.status === 'expired'
                            ? 'Trial Expired'
                            : 'Trial Not Started'}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-black text-xl sm:text-2xl text-white mt-1">
                      Choose Your Language &amp; Grade &mdash; Start Free Trial
                    </h3>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-2xl font-black text-[#FFB612]">R0 Today</div>
                    <div className="text-[11px] text-white/60">Then R60/month &bull; Cancel anytime</div>
                  </div>
                </div>

                {/* 1. CHOOSE LANGUAGE */}
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/80 flex items-center gap-1.5">
                      <Languages className="w-4 h-4 text-[#FFB612]" />
                      <span>1. SELECT YOUR LANGUAGE (ALL 12 incl SASL):</span>
                    </span>
                    <span className="text-xs text-[#FFB612] font-bold">
                      {selectedLangObj.name} ({selectedLangObj.native})
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {ALL_11_LANGUAGES.map((lang) => {
                      const isSelected = selectedLang === lang.code;
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => setSelectedLang(lang.code)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#FFB612] text-black font-black shadow-md shadow-yellow-500/20 scale-105'
                              : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/10'
                          }`}
                        >
                          <span>{lang.name}</span>
                          {lang.isNativeSpecial && <span className="ml-1 text-[10px]">&#11088;</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. CHOOSE GRADE */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/80 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-[#FFB612]" />
                      <span>2. Select Grade (Grade 4 to University):</span>
                    </span>
                    <span className="text-xs text-[#FFB612] font-bold">
                      {selectedGradeObj.name} &bull; {selectedGradeObj.level}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {ALL_GRADES.map((grade) => {
                      const isSelected = selectedGradeId === grade.id;
                      return (
                        <button
                          key={grade.id}
                          type="button"
                          onClick={() => setSelectedGradeId(grade.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#FFB612] text-black font-black shadow-md shadow-yellow-500/20 scale-105'
                              : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/10'
                          }`}
                        >
                          <span>{grade.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {checkoutError && (
                  <div className="mt-5 p-3 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{checkoutError}</span>
                  </div>
                )}

                {/* ONE MAIN BUTTON ON HOME PAGE */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <button
                    type="button"
                    onClick={handleStartTrial}
                    disabled={checkoutLoading}
                    className="w-full py-4 px-6 rounded-2xl bg-[#FFB612] hover:bg-yellow-400 text-black font-black text-base shadow-xl shadow-yellow-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 text-center cursor-pointer disabled:opacity-60"
                  >
                    <Sparkles className="w-5 h-5 text-black shrink-0" />
                    <span>
                      {checkoutLoading
                        ? 'Connecting to Paystack...'
                        : 'Start 2-Day Free Trial - Then R60/month'}
                    </span>
                    <ArrowRight className="w-4 h-4 shrink-0 ml-0.5" />
                  </button>
                  <p className="mt-2.5 text-center text-[11px] text-white/60">
                    Create an account or log in &bull; Full access for 2 days free &bull; Cancel before 2 days and pay R0
                  </p>
                </div>
              </div>
            )}

            {/* Quick Demo CTA */}
            <div className="mt-6 flex items-center justify-center">
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-[#FFB612] text-[#FFB612]" />
                <span>Watch 20-sec DBE Memo Explainer Demo</span>
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================
            GRADES GRID (UNDER EACH GRADE CARD: VIEW PAST PAPERS)
           ======================================================== */}
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-mono font-bold text-[#FFB612] tracking-widest block mb-1">
              CURRICULUM COVERAGE (GRADE 4 TO UNIVERSITY)
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white">
              Every Grade. Every Subject. All in Your Language.
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mt-2 max-w-xl mx-auto">
              Explore past papers, CAPS notes, and step-by-step memos tailored specifically for your level.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {ALL_GRADES.map((grade) => (
              <div
                key={grade.id}
                className="bg-[#0A1F44] border border-white/15 hover:border-[#FFB612] rounded-3xl p-5 flex flex-col justify-between transition-all group hover:scale-[1.02] shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#FFB612]/20 text-[#FFB612] text-[10px] font-mono font-bold">
                      {grade.badge}
                    </span>
                    <span className="text-[10px] text-white/40 font-mono">
                      {grade.subjectsCount} Subj
                    </span>
                  </div>

                  <h3 className="font-display font-black text-lg text-white group-hover:text-[#FFB612] transition-colors">
                    {grade.name}
                  </h3>
                  <p className="text-[11px] text-white/60 mt-0.5">
                    {grade.level}
                  </p>
                </div>

                {/* Under each Grade card: small link "View Past Papers" -> /papers?grade=X */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <button
                    onClick={() => navigateToPastPapers(grade.id)}
                    className="w-full text-left text-xs font-bold text-[#1E88E5] hover:text-[#FFB612] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>View Past Papers</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            FEATURES SECTION (3 CARDS)
           ======================================================== */}
        <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 border-t border-white/10">
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-mono font-bold text-[#FFB612] tracking-widest block mb-1">
              BUILT FOR SOUTH AFRICAN LEARNERS
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white">
              Everything You Need to Ace Your Exams
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Card 1: CAPS Notes & Quizzes */}
            <div className="bg-[#0A1F44] border border-white/10 hover:border-[#FFB612]/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all group shadow-xl">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFB612]/15 text-[#FFB612] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-display font-black text-xl text-white mb-2">
                  CAPS notes &amp; quizzes (Grade 4 to University)
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Full curriculum coverage aligned with DBE CAPS and TVET N1-N6. Interactive quizzes with instant diagnostic hints in your native language.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#FFB612] font-bold">
                <span>13 Grades + TVET &bull; 800+ Quizzes</span>
                <Check className="w-4 h-4 text-[#007A4D]" />
              </div>
            </div>

            {/* Card 2: Instant Homework Help */}
            <div className="bg-[#0A1F44] border border-white/10 hover:border-[#FFB612]/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all group shadow-xl">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFB612]/15 text-[#FFB612] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h3 className="font-display font-black text-xl text-white mb-2">
                  Instant homework help (Ask in your language)
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Stuck on algebra, physics, or accounting? Ask any question in isiZulu, Sepedi, Afrikaans, or English and get simple, friendly explanations.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#FFB612] font-bold">
                <span>All 11 Official SA Languages</span>
                <Check className="w-4 h-4 text-[#007A4D]" />
              </div>
            </div>

            {/* Card 3: 4000+ DBE Past Papers with Memo Explanations */}
            <div className="bg-[#0A1F44] border border-white/10 hover:border-[#FFB612]/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all group shadow-xl">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFB612]/15 text-[#FFB612] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-display font-black text-xl text-white mb-2">
                  4000+ DBE Past Papers with memo explanations
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Real national examination papers with step-by-step memos translated into your home language so you never get lost in mathematical jargon.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#FFB612] font-bold">
                <span>Official Memos &bull; Step-by-Step</span>
                <Check className="w-4 h-4 text-[#007A4D]" />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            MEMO EXPLANATION FEATURE LIVE DEMO
           ======================================================== */}
        <section className="py-16 sm:py-24 bg-[#050D1A] border-y border-white/10 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs uppercase font-mono font-bold text-[#FFB612] tracking-widest block mb-1">
                PATENT-PENDING LEARNING ENGINE
              </span>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-white">
                How Memo Translation Works in Real Life
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-white/60">
                Original DBE Past Paper (English) + Explanation in YOUR Mother Tongue
              </p>
            </div>

            {/* Interactive Demo Card */}
            <div className="bg-[#0A1F44] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
              
              {/* Question Header */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 mb-5">
                <div className="text-[11px] font-mono font-bold text-[#FFB612] uppercase tracking-wider mb-1">
                  DBE Mathematics Paper 1 &bull; Question 1.1
                </div>
                <p className="text-base sm:text-lg font-bold text-white">
                  Solve for x: <span className="font-mono text-[#FFB612]">2x + 3 = 7</span>
                </p>
                <p className="text-xs text-white/50 mt-1 font-mono">
                  Official DBE Memo: 2x = 4 &rarr; x = 2 (2 marks)
                </p>
              </div>

              {/* Action Banner with Language Dropdown */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-black/60 border border-white/10 mb-4">
                <div className="text-xs text-white/80">
                  <span className="font-bold text-white block">Don&apos;t understand the official English memo?</span>
                  <span className="text-white/60">Get it broken down step-by-step in your mother tongue:</span>
                </div>

                <div className="relative inline-block text-left shrink-0">
                  <button
                    onClick={() => setIsDemoDropdownOpen(!isDemoDropdownOpen)}
                    className="px-4 py-2 rounded-xl bg-[#FFB612] hover:bg-yellow-400 text-black font-extrabold text-xs flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Languages className="w-4 h-4" />
                    <span>Explain in {demoLang}</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {isDemoDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#0c182b] border border-white/20 shadow-2xl py-2 z-20 max-h-60 overflow-y-auto">
                      {ALL_11_LANGUAGES.map((lang) => (
                        <button
                          key={lang.name}
                          onClick={() => {
                            setDemoLang(lang.name);
                            setIsDemoDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-xs hover:bg-[#FFB612] hover:text-black transition-colors ${
                            demoLang === lang.name ? 'text-[#FFB612] font-bold' : 'text-white/90'
                          }`}
                        >
                          {lang.name} ({lang.native})
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Translation Output Box */}
              <div className="p-5 rounded-2xl bg-[#007A4D]/20 border border-[#007A4D]/40 text-white">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Step-by-Step Memo Explanation ({demoLang})</span>
                </div>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
                  {MEMO_DEMO_EXPLANATIONS[demoLang] || MEMO_DEMO_EXPLANATIONS.isiZulu}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            PRICING SECTION: R60 FOR 30 DAYS ACCESS
           ======================================================== */}
        <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-mono font-bold text-[#FFB612] tracking-widest block mb-1">
              AFFORDABLE FOR EVERY SOUTH AFRICAN FAMILY
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
              One Price. Everyone Equal.
            </h2>
          </div>

          {hasActiveAccess ? (
            <div className="max-w-xl mx-auto bg-gradient-to-r from-emerald-950/90 via-[#0A1F44] to-black border-2 border-emerald-400 rounded-3xl p-8 sm:p-10 text-center shadow-2xl relative overflow-hidden">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold uppercase mb-4">
                {subRecord?.status === 'trial' ? '2-DAY FREE TRIAL ACTIVE' : 'SUBSCRIPTION ACTIVE'}
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-2">
                Full Access Active
              </h3>
              <p className="text-sm text-emerald-200 font-bold mb-6">
                All Study Guides, AI Tutor &amp; Past Papers Unlocked
              </p>
              <button
                type="button"
                onClick={() => setCurrentTab('mySubscription')}
                className="w-full py-4 rounded-xl bg-[#FFB612] hover:bg-yellow-400 text-black font-black text-base shadow-xl shadow-yellow-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5 text-black" />
                <span>Manage My Subscription</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          ) : (
            <div className="max-w-md mx-auto bg-[#0A1F44] border-2 border-[#007A4D] rounded-3xl p-8 sm:p-10 text-center shadow-2xl relative overflow-hidden">
              <div className="inline-block px-3 py-1 rounded-full bg-[#007A4D] text-white text-xs font-mono font-bold uppercase mb-4">
                2-DAY FREE TRIAL &bull; THEN R60/MONTH
              </div>

              <div className="flex items-baseline justify-center gap-1.5 mb-2">
                <span className="text-5xl font-display font-black text-[#FFB612]">R0</span>
                <span className="text-sm font-bold text-white/60">today &bull; then R60/month</span>
              </div>

              <p className="text-xs text-white/70 mb-6">
                First R60 payment charged after 2 days &bull; Cancel anytime before 2 days for R0
              </p>

              <ul className="text-left text-xs sm:text-sm space-y-3 mb-8 text-white/90">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#007A4D] shrink-0" />
                  <span>Full CAPS Grade 12 Study Guides</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#007A4D] shrink-0" />
                  <span>All 12 official South African languages (incl SASL)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#007A4D] shrink-0" />
                  <span>4000+ DBE Past Papers with step-by-step memos</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#007A4D] shrink-0" />
                  <span>Cancel anytime before 2 days &bull; R0 charged</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={handleStartTrial}
                disabled={checkoutLoading}
                className="w-full py-4 rounded-xl bg-[#FFB612] hover:bg-yellow-400 text-black font-black text-base shadow-xl shadow-yellow-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <CreditCard className="w-5 h-5 text-black shrink-0" />
                <span>
                  {checkoutLoading
                    ? 'Connecting Paystack...'
                    : 'Start 2-Day Free Trial - Then R60/month'}
                </span>
                <ArrowRight className="w-4 h-4 text-black shrink-0" />
              </button>
            </div>
          )}
        </section>
      </main>

      {/* ========================================================
          TRUST FOOTER
          NEXOVIAN (Pty) Ltd | Reg: 2026/234078/07 | nexovian.group
          Built in Mpumalanga | Level 1 B-BBEE | 100% CAPS Aligned | Contact WhatsApp: https://wa.me/27636508381
         ======================================================== */}
      <footer className="border-t border-white/10 py-10 px-4 sm:px-6 bg-[#000000] text-center text-xs text-white/60">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FFB612] text-black font-bold flex items-center justify-center text-sm">
              N
            </div>
            <div className="text-left">
              <span className="font-display font-black text-white text-base block leading-tight">
                NEXOVIAN (Pty) Ltd
              </span>
              <span className="text-[10px] text-white/50 font-mono">
                Reg: 2026/234078/07 &bull; nexovian.group
              </span>
            </div>
          </div>

          <p className="text-xs text-white/70">
            Built in Mpumalanga &bull; Level 1 B-BBEE &bull; 100% CAPS Aligned &bull;{' '}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FFB612] hover:underline font-bold inline-flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Need help? WhatsApp 063 650 8381</span>
            </a>
          </p>

          <p className="text-white/40 text-[11px]">
            &copy; {new Date().getFullYear()} NEXOVIAN (Pty) Ltd. All rights reserved.
          </p>
        </div>
      </footer>

      {/* 20-Second Demo Modal */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A1F44] border border-white/20 rounded-3xl max-w-lg w-full p-6 text-center shadow-2xl relative">
            <button
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-white/60 hover:text-white rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-14 h-14 rounded-full bg-[#FFB612] text-black flex items-center justify-center mx-auto mb-4 font-bold shadow-lg">
              <Play className="w-6 h-6 fill-black ml-1" />
            </div>
            <h3 className="font-display font-black text-xl text-white mb-2">
              20-Second Platform Walkthrough
            </h3>
            <p className="text-xs text-white/70 mb-5 leading-relaxed">
              Nexovian allows any learner to browse DBE past papers, click &ldquo;Explain in My Language&rdquo;, and understand math and science step-by-step.
            </p>
            <div className="aspect-video bg-black rounded-2xl border border-white/10 flex flex-col items-center justify-center p-6 text-xs text-white/60">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-left w-full space-y-1 mb-3">
                <span className="text-[#FFB612] font-bold block">1. Choose any subject &amp; past paper</span>
                <span>2. Tap [🌐 Explain in My Language]</span>
                <span className="text-emerald-400 block">3. Immediate mother-tongue explanation in isiZulu, Sepedi, etc.</span>
              </div>
              <button
                onClick={() => {
                  setIsDemoModalOpen(false);
                  handleStartTrial();
                }}
                className="w-full py-3 bg-[#FFB612] text-black font-black rounded-xl text-xs hover:bg-yellow-400 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start 2-Day Free Trial - Then R60/month</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Global Search Modal */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#0c0c0c] border border-[#d4af37]/60 rounded-3xl max-w-3xl w-full p-6 text-left shadow-2xl relative my-8">
            <button
              onClick={() => setIsSearchModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-white/60 hover:text-white rounded-full bg-white/5 hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Search Input */}
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-5 h-5 text-[#FFB612] shrink-0" />
              <h3 className="font-display font-black text-xl text-white">
                Global Curriculum &amp; Past Paper Search
              </h3>
            </div>

            <div className="relative mb-5">
              <Search className="w-4 h-4 text-[#FFB612] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                autoFocus
                placeholder="Search anything: INF1505, N4 Management, Grade 6 Social Sciences, Photosynthesis..."
                value={globalSearchQuery}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-2xl bg-[#1a1a1a] border border-[#d4af37] text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFB612]"
              />
              {globalSearchQuery && (
                <button
                  onClick={() => setGlobalSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick search chips */}
            <div className="flex flex-wrap items-center gap-1.5 mb-5 pb-4 border-b border-white/10">
              <span className="text-[11px] font-mono text-[#FFB612] font-bold mr-1">Popular:</span>
              {['INF1505', 'N4 Management', 'Grade 12 Maths', 'FAC1502', 'Grade 6 Social Sciences', 'N4 Computer Practice'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setGlobalSearchQuery(tag)}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-[11px] text-white/80 hover:text-[#FFB612] transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Results counter */}
            <div className="flex items-center justify-between text-xs text-white/60 mb-3 font-mono">
              <span>
                {globalSearchQuery ? `Found ${globalSearchResults.length} matching paper(s)` : 'Type to search all grades, TVET & university modules'}
              </span>
              <span className="text-[#FFB612]">Grade 4 to University</span>
            </div>

            {/* Results list */}
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {globalSearchQuery && globalSearchResults.length === 0 && (
                <div className="p-8 text-center text-white/60 text-xs">
                  No direct exam paper matches for &ldquo;{globalSearchQuery}&rdquo;. Try searching by course code (e.g. INF1505, N4) or subject.
                </div>
              )}

              {globalSearchResults.map((paper) => (
                <div
                  key={paper.id}
                  className="p-4 rounded-2xl bg-[#141414] border border-white/10 hover:border-[#FFB612]/60 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-md bg-[#0A1F44] border border-[#FFB612]/40 text-[#FFB612] font-mono text-[10px] font-bold">
                          {paper.gradeName}
                        </span>
                        <span className="text-white/60 text-xs font-mono">&bull; {paper.subject}</span>
                      </div>
                      <h4 className="font-display font-black text-sm sm:text-base text-white">
                        {paper.title}
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-[#FFB612] shrink-0 font-bold">
                      {paper.totalMarks} Marks &bull; {paper.duration}
                    </span>
                  </div>

                  <p className="text-xs text-white/70 whitespace-pre-wrap font-mono">
                    {paper.questions[0]?.questionText || 'Official National Examination paper with step-by-step marking guidelines.'}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
                    <button
                      onClick={() => {
                        setIsSearchModalOpen(false);
                        navigateToPastPapers(paper.gradeId);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#FFB612]" />
                      <span>{paper.year} {paper.paperType || 'Paper 1'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsSearchModalOpen(false);
                        navigateToPastPapers(paper.gradeId);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#007A4D]/30 hover:bg-[#007A4D]/50 border border-[#007A4D] text-emerald-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Memo</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsSearchModalOpen(false);
                        navigateToPastPapers(paper.gradeId);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#0A1F44] hover:bg-[#122e66] border border-[#FFB612]/50 text-[#FFB612] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Explain in YOUR language</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsSearchModalOpen(false);
                        handleStartLearning();
                      }}
                      className="ml-auto px-3 py-1.5 rounded-xl bg-[#FFB612] hover:bg-yellow-400 text-black font-black text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Ask Tisha 🤖</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
