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
  AlertCircle,
  Lock
} from 'lucide-react';
import { FULL_PAPERS } from '../papers/PastPapersView';
import {
  ALL_STUDY_GUIDE_CHAPTERS,
  DEGREE_CHAPTERS,
  TVET_CHAPTERS
} from '../../data/studyGuideContent';
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

  // Home Screen Subject Filter: [All] [TVET N1-N6] [Degree]
  const [homeSubjectFilter, setHomeSubjectFilter] = useState<'all' | 'tvet' | 'degree'>('all');
  const [showAllHomeSubjects, setShowAllHomeSubjects] = useState(false);

  const filteredHomeChapters = useMemo(() => {
    if (homeSubjectFilter === 'tvet') return TVET_CHAPTERS;
    if (homeSubjectFilter === 'degree') return DEGREE_CHAPTERS;
    return ALL_STUDY_GUIDE_CHAPTERS;
  }, [homeSubjectFilter]);

  const visibleHomeChapters = useMemo(() => {
    if (homeSubjectFilter === 'degree' || showAllHomeSubjects) {
      return filteredHomeChapters;
    }
    return filteredHomeChapters.slice(0, 12);
  }, [filteredHomeChapters, homeSubjectFilter, showAllHomeSubjects]);

  // Global Search filter across Study Guide / TVET chapters AND FULL_PAPERS
  const globalStudyGuideResults = useMemo(() => {
    const q = globalSearchQuery.trim().toLowerCase();
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
    }).slice(0, 12);
  }, [globalSearchQuery]);

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
    }).slice(0, 20);
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
    <div className="min-h-screen bg-gradient-to-b from-[#061128] via-[#0A1F44] to-[#050D1E] text-white font-sans antialiased selection:bg-[#FFD400] selection:text-black overflow-x-hidden">
      {/* TOP ANNOUNCEMENT BANNER */}
      <div className="bg-gradient-to-r from-[#0A1F44] via-[#102B60] to-[#0A1F44] border-b border-[#FFD400]/50 px-3 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-center">
          <span className="text-[11px] sm:text-xs font-extrabold tracking-wide text-[#FFD400] uppercase">
            TVET N1-N6 + DEGREE FULLY LOADED - 48+ Subjects - Start Studying Now
          </span>
          <a
            href="/study-guide"
            onClick={(e) => {
              e.preventDefault();
              setCurrentTab('studyGuide');
              if (typeof window !== 'undefined') {
                window.history.pushState({}, '', '/study-guide');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-[11px] shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <span>Start Studying Now</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* 1. HEADER (DEEP NAVY + GOLD ACCENTS) */}
      <header className="sticky top-0 z-50 bg-[#061128]/95 backdrop-blur-md border-b border-[#1E3A6E]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2">
          {/* Logo NEXOVIAN Left */}
          <div
            className="flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FFD400] text-black flex items-center justify-center font-black text-lg sm:text-xl shadow-lg">
              N
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg sm:text-2xl tracking-wider sm:tracking-widest text-[#FFD400]">
                NEXOVIAN
              </span>
              <span className="hidden sm:block text-[10px] text-slate-300 tracking-widest uppercase -mt-1 font-mono">
                The Learning Brain
              </span>
            </div>
          </div>

          {/* Nav Links & Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Global Search Input in Header */}
            <div className="hidden lg:flex items-center relative">
              <Search className="w-4 h-4 text-[#FFD400] absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search: N4 Electrotechnics, INF1505, Grade 12..."
                value={globalSearchQuery}
                onChange={(e) => {
                  setGlobalSearchQuery(e.target.value);
                  setIsSearchModalOpen(true);
                }}
                onFocus={() => setIsSearchModalOpen(true)}
                className="w-72 pl-9 pr-3 py-1.5 rounded-full bg-[#0D1E42] border border-[#FFD400]/60 text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#FFD400]"
              />
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="lg:hidden p-2 rounded-full bg-[#0D1E42] border border-[#FFD400]/60 text-[#FFD400] hover:bg-[#142D61] cursor-pointer"
              title="Search"
              aria-label="Search curriculum and past papers"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Past Papers & Memos Navbar Link */}
            <button
              onClick={() => navigateToPastPapers()}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#1E3A6E] bg-[#0D1E42]/60 text-xs font-bold text-white hover:border-[#FFD400] hover:text-[#FFD400] transition-colors cursor-pointer"
            >
              <span>📚 Past Papers &amp; Memos</span>
            </button>

            <button
              onClick={() => setCurrentTab('calculator')}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#1E3A6E] bg-[#0D1E42]/60 text-xs font-semibold text-slate-200 hover:border-[#FFD400] hover:text-white transition-colors cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5 text-[#FFD400]" />
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
              className="flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-[11px] sm:text-sm shadow-md transition-all cursor-pointer whitespace-nowrap transform hover:scale-105 active:scale-95"
            >
              <span>📚</span>
              <span className="sm:hidden">Study Guide</span>
              <span className="hidden sm:inline">Nexovian Study Guide</span>
            </a>

            {/* Header Action Buttons */}
            {hasActiveAccess ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => setCurrentTab('mySubscription')}
                  className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>My Subscription</span>
                </button>
                <button
                  onClick={handleStartLearning}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer transform hover:scale-105 active:scale-95 whitespace-nowrap"
                >
                  Open App
                </button>
              </div>
            ) : (
              <>
                {isAuthenticated ? (
                  <button
                    onClick={() => setCurrentTab('mySubscription')}
                    className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0D1E42] hover:bg-[#132959] border border-[#1E3A6E] text-xs font-medium text-white cursor-pointer"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-[#FFD400]" />
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
                    className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#1E3A6E] bg-[#0D1E42]/80 hover:border-[#FFD400] text-white font-bold text-[11px] sm:text-sm transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Login
                  </button>
                )}

                <button
                  onClick={handleStartTrial}
                  className="px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-[11px] sm:text-sm shadow-lg shadow-[#FFD400]/25 transition-all cursor-pointer transform hover:scale-105 active:scale-95 flex items-center gap-1 whitespace-nowrap"
                >
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black shrink-0" />
                  <span className="sm:hidden">Free Trial</span>
                  <span className="hidden sm:inline">Start 2-Day Free Trial</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        {/* ========================================================
            HERO SECTION (DARK BLUE + GOLD PREMIUM THEME)
           ======================================================== */}
        <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 px-4 sm:px-6 text-center border-b border-[#1E3A6E]">
          {/* Subtle Deep Navy + Gold glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#14397B]/50 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D1E42] border border-[#FFD400]/50 text-[#FFD400] text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD400] shrink-0" />
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
              <span className="text-[#FFD400] font-mono font-bold flex items-center gap-1">
                <Search className="w-3.5 h-3.5" />
                <span>Popular:</span>
              </span>
              {[
                { label: 'TVET N1–N6', q: 'TVET' },
                { label: 'BCom Accounting', q: 'Financial Accounting' },
                { label: 'LLB Law', q: 'Constitutional Law' },
                { label: 'Nursing', q: 'Anatomy' },
                { label: 'N4 Electrotechnics', q: 'N4 Electrotechnics' },
                { label: 'Grade 12 Physics', q: 'Momentum' }
              ].map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => handleOpenGlobalSearch(chip.q)}
                  className="px-3 py-1 rounded-full bg-[#0D1E42] hover:bg-[#142D61] border border-[#FFD400]/50 hover:border-[#FFD400] text-white/95 hover:text-[#FFD400] font-semibold text-[11px] transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Big Study Guide, TVET N1-N6 & Degree Hero Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/study-guide"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentTab('studyGuide');
                  if (typeof window !== 'undefined') {
                    window.history.pushState({}, '', '/study-guide');
                  }
                }}
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-[#FFD400] hover:bg-yellow-400 text-[#061128] font-black text-sm sm:text-lg shadow-[0_0_30px_rgba(255,212,0,0.45)] border-2 border-yellow-200/70 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>📚</span>
                <span>Open Study Guide</span>
              </a>

              <a
                href="/study-guide/tvet-n1-n6"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentTab('studyGuideTvet');
                  if (typeof window !== 'undefined') {
                    window.history.pushState({}, '', '/study-guide/tvet-n1-n6');
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-[#0D1E42] hover:bg-[#132959] text-[#FFD400] font-black text-sm sm:text-base border-2 border-[#FFD400]/70 shadow-lg transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>🛠️</span>
                <span>TVET N1–N6 (36)</span>
              </a>

              <a
                href="/study-guide/degree-modules"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentTab('studyGuideDegree');
                  if (typeof window !== 'undefined') {
                    window.history.pushState({}, '', '/study-guide/degree-modules');
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-[#0D1E42] hover:bg-[#132959] text-[#FFD400] font-black text-sm sm:text-base border-2 border-[#FFD400]/70 shadow-lg transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>🎓</span>
                <span>Degree Modules (12)</span>
              </a>
            </div>

            {/* ACTIVE SUBSCRIPTION CARD OR SINGLE MAIN 2-DAY FREE TRIAL CTA */}
            {hasActiveAccess ? (
              <div id="instant-unlock" className="mt-10 max-w-3xl mx-auto bg-gradient-to-r from-[#0A1F44] via-[#102B60] to-[#061128] border-2 border-[#FFD400] rounded-3xl p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold uppercase mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#FFD400]" />
                  <span>
                    {subRecord?.status === 'trial' ? '2-Day Free Trial Active' : 'Subscription Active'}
                  </span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                  Welcome Back &mdash; Full Access Unlocked
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-200 max-w-xl mx-auto leading-relaxed">
                  All {ALL_STUDY_GUIDE_CHAPTERS.length} Study Guide chapters (Grade 12, TVET N1–N6 &amp; Degree), 12 official languages (including SASL), DBE past papers, and AI Tutor are unlocked.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentTab('studyGuide');
                      if (typeof window !== 'undefined') {
                        window.history.pushState({}, '', '/study-guide');
                      }
                    }}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-base shadow-[0_0_25px_rgba(255,212,0,0.4)] flex items-center justify-center gap-2.5 cursor-pointer transition-transform active:scale-95"
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
            INTERACTIVE HOME SUBJECTS FILTER: [All] [TVET N1-N6] [Degree]
           ======================================================== */}
        <section id="study-guide-subjects" className="py-12 sm:py-16 bg-[#071530] border-b border-[#1E3A6E] px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs uppercase font-mono font-bold text-[#FFD400] tracking-widest block mb-1">
                  STUDY GUIDE LIBRARY • 48+ SUBJECTS &amp; {ALL_STUDY_GUIDE_CHAPTERS.length} CHAPTERS
                </span>
                <h2 className="font-display font-black text-2xl sm:text-4xl text-white">
                  Browse Subjects by Level
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-2xl">
                  Switch between Grade 12 CAPS, 36 TVET N1–N6 engineering trades, and all 12 Degree Killer Modules.
                </p>
              </div>

              {/* Filter Tabs: [All] [TVET N1-N6] [Degree] */}
              <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter home study guide subjects">
                {[
                  { id: 'all' as const, label: `All (${ALL_STUDY_GUIDE_CHAPTERS.length})` },
                  { id: 'tvet' as const, label: `TVET N1-N6 (${TVET_CHAPTERS.length})` },
                  { id: 'degree' as const, label: `Degree (${DEGREE_CHAPTERS.length})` }
                ].map((tabItem) => {
                  const active = homeSubjectFilter === tabItem.id;
                  return (
                    <button
                      key={tabItem.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => {
                        setHomeSubjectFilter(tabItem.id);
                        setShowAllHomeSubjects(false);
                      }}
                      className={`min-h-[44px] px-4 sm:px-5 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all duration-200 cursor-pointer ${
                        active
                          ? 'bg-[#FFD400] text-[#061128] shadow-[0_0_20px_rgba(255,212,0,0.35)] scale-[1.03]'
                          : 'bg-[#0D1E42] text-slate-200 border border-[#1E3A6E] hover:border-[#FFD400] hover:text-[#FFD400]'
                      }`}
                    >
                      {tabItem.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filtered Subject Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {visibleHomeChapters.map((ch) => {
                const chPath = `${ch.backPath}/${ch.slug}`;
                return (
                  <a
                    key={ch.slug}
                    href={chPath}
                    onClick={(e) => {
                      e.preventDefault();
                      if (typeof window !== 'undefined') {
                        window.history.pushState({}, '', chPath);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                      setCurrentTab('studyGuideChapter');
                    }}
                    className="group bg-[#0D1E42] hover:bg-[#122859] border border-[#1E3A6E] hover:border-[#FFD400] rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all duration-300 hover:-translate-y-1 shadow-lg cursor-pointer min-w-0"
                  >
                    <div className="space-y-2 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#FFD400]/15 border border-[#FFD400]/40 text-[#FFD400] font-mono text-[11px] font-bold">
                          <span>{ch.subjectIcon}</span>
                          <span>{ch.subjectLabel}</span>
                        </span>
                        {!hasActiveAccess && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-300">
                            <Lock className="w-3 h-3 shrink-0" />
                            <span>Trial / Sub</span>
                          </span>
                        )}
                      </div>
                      <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-[#FFD400] transition-colors break-words">
                        {ch.title}
                      </h3>
                      <p className="text-xs text-slate-300 line-clamp-2 break-words leading-relaxed">
                        {ch.shortDescription}
                      </p>
                    </div>

                    <div className="min-h-[42px] w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFD400] group-hover:bg-yellow-400 text-[#061128] font-black text-xs sm:text-sm transition-colors shadow-sm">
                      <span>{hasActiveAccess ? 'Open Chapter' : 'Unlock Chapter'}</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Expand / Section Action Bar */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              {homeSubjectFilter !== 'degree' && filteredHomeChapters.length > 12 && (
                <button
                  type="button"
                  onClick={() => setShowAllHomeSubjects((prev) => !prev)}
                  className="min-h-[46px] px-6 py-2.5 rounded-2xl bg-[#0D1E42] hover:bg-[#132959] border border-[#FFD400]/60 text-[#FFD400] font-black text-xs sm:text-sm transition-all cursor-pointer"
                >
                  {showAllHomeSubjects
                    ? 'Show Fewer Chapters'
                    : `Show All ${filteredHomeChapters.length} ${homeSubjectFilter === 'tvet' ? 'TVET' : ''} Chapters`}
                </button>
              )}

              <a
                href={
                  homeSubjectFilter === 'tvet'
                    ? '/study-guide/tvet-n1-n6'
                    : homeSubjectFilter === 'degree'
                    ? '/study-guide/degree-modules'
                    : '/study-guide'
                }
                onClick={(e) => {
                  e.preventDefault();
                  const targetTab =
                    homeSubjectFilter === 'tvet'
                      ? 'studyGuideTvet'
                      : homeSubjectFilter === 'degree'
                      ? 'studyGuideDegree'
                      : 'studyGuide';
                  const targetUrl =
                    homeSubjectFilter === 'tvet'
                      ? '/study-guide/tvet-n1-n6'
                      : homeSubjectFilter === 'degree'
                      ? '/study-guide/degree-modules'
                      : '/study-guide';
                  if (typeof window !== 'undefined') {
                    window.history.pushState({}, '', targetUrl);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                  setCurrentTab(targetTab);
                }}
                className="min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl bg-[#FFD400] hover:bg-yellow-400 text-[#061128] font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>
                  {homeSubjectFilter === 'tvet'
                    ? 'Open Full TVET N1–N6 Library (36)'
                    : homeSubjectFilter === 'degree'
                    ? 'Open Full Degree Library (12)'
                    : 'Open Complete Study Guide Hub'}
                </span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================
            HOW IT WORKS SECTION (4 PREMIUM STEPS)
           ======================================================== */}
        <section className="py-14 sm:py-20 bg-[#081736] border-b border-[#1E3A6E] px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <span className="text-xs uppercase font-mono font-bold text-[#FFD400] tracking-widest block mb-1">
                SIMPLE 4-STEP ROADMAP
              </span>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-white">
                How It Works
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl mx-auto">
                Go from confused to exam-ready in minutes with structured Study Guides, TVET N1–N6 notes, Degree Killer Modules, and instant answers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  step: '1',
                  icon: '🚀',
                  title: '1. Start Free Trial',
                  desc: 'Unlock full access for 2 days free (R0 today) — cancel anytime before 2 days.'
                },
                {
                  step: '2',
                  icon: '📚',
                  title: '2. Pick Your Subject',
                  desc: 'Choose Grade 12 CAPS, 36 TVET N1–N6 subjects, or 12 Degree Killer Modules.'
                },
                {
                  step: '3',
                  icon: '🧠',
                  title: '3. Study + Practice',
                  desc: 'Read simple English notes, key formulas, worked examples, and test with Show Answer questions.'
                },
                {
                  step: '4',
                  icon: '🎓',
                  title: '4. Pass Your Exam',
                  desc: 'Walk into your matric or NATED exam confident with past papers and mother-tongue memos.'
                }
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-[#0D1E42] hover:bg-[#122859] border border-[#FFD400]/35 hover:border-[#FFD400] rounded-3xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl" aria-hidden="true">
                        {item.icon}
                      </span>
                      <span className="w-8 h-8 rounded-full bg-[#FFD400] text-black font-black text-sm flex items-center justify-center shadow-md">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="font-display font-black text-lg text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              {hasActiveAccess ? (
                <a
                  href="/study-guide"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentTab('studyGuide');
                    if (typeof window !== 'undefined') {
                      window.history.pushState({}, '', '/study-guide');
                    }
                  }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-sm sm:text-base shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Start Studying Now</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={handleStartTrial}
                  disabled={checkoutLoading}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-sm sm:text-base shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-60"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{checkoutLoading ? 'Connecting Paystack...' : '1. Start Free Trial Now'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================
            GRADES GRID (UNDER EACH GRADE CARD: VIEW PAST PAPERS)
           ======================================================== */}
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-mono font-bold text-[#FFD400] tracking-widest block mb-1">
              CURRICULUM COVERAGE (GRADE 4 TO UNIVERSITY)
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white">
              Every Grade. Every Subject. All in Your Language.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl mx-auto">
              Explore past papers, CAPS notes, and step-by-step memos tailored specifically for your level.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {ALL_GRADES.map((grade) => (
              <div
                key={grade.id}
                className="bg-[#0D1E42] border border-[#1E3A6E] hover:border-[#FFD400] rounded-3xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#FFD400]/20 text-[#FFD400] text-[10px] font-mono font-bold">
                      {grade.badge}
                    </span>
                    <span className="text-[10px] text-slate-300 font-mono">
                      {grade.subjectsCount} Subj
                    </span>
                  </div>

                  <h3 className="font-display font-black text-base sm:text-lg text-white group-hover:text-[#FFD400] transition-colors">
                    {grade.name}
                  </h3>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    {grade.level}
                  </p>
                </div>

                {/* Under each Grade card: small link "View Past Papers" -> /papers?grade=X */}
                <div className="mt-4 pt-3 border-t border-[#1E3A6E]">
                  <button
                    onClick={() => navigateToPastPapers(grade.id)}
                    className="w-full text-left text-xs font-bold text-[#FFD400] hover:text-yellow-300 flex items-center justify-between transition-colors cursor-pointer"
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
        <section className="py-16 sm:py-24 bg-[#071530] border-y border-[#1E3A6E] px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs uppercase font-mono font-bold text-[#FFD400] tracking-widest block mb-1">
                PATENT-PENDING LEARNING ENGINE
              </span>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-white">
                How Memo Translation Works in Real Life
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300">
                Original DBE Past Paper (English) + Explanation in YOUR Mother Tongue
              </p>
            </div>

            {/* Interactive Demo Card */}
            <div className="bg-[#0D1E42] border border-[#1E3A6E] rounded-3xl p-6 sm:p-8 shadow-2xl">
              
              {/* Question Header */}
              <div className="p-4 rounded-2xl bg-[#061128] border border-[#1E3A6E] mb-5">
                <div className="text-[11px] font-mono font-bold text-[#FFD400] uppercase tracking-wider mb-1">
                  DBE Mathematics Paper 1 &bull; Question 1.1
                </div>
                <p className="text-base sm:text-lg font-bold text-white">
                  Solve for x: <span className="font-mono text-[#FFD400]">2x + 3 = 7</span>
                </p>
                <p className="text-xs text-slate-300 mt-1 font-mono">
                  Official DBE Memo: 2x = 4 &rarr; x = 2 (2 marks)
                </p>
              </div>

              {/* Action Banner with Language Dropdown */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#061128] border border-[#1E3A6E] mb-4">
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
            <div className="max-w-xl mx-auto bg-gradient-to-br from-[#0D1E42] via-[#102B60] to-[#061128] border-2 border-[#FFD400] rounded-3xl p-8 sm:p-10 text-center shadow-2xl relative overflow-hidden">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold uppercase mb-4">
                {subRecord?.status === 'trial' ? '2-DAY FREE TRIAL ACTIVE' : 'SUBSCRIPTION ACTIVE'}
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-2">
                Full Access Active
              </h3>
              <p className="text-sm text-[#FFD400] font-bold mb-6">
                All Study Guides, AI Tutor &amp; Past Papers Unlocked
              </p>
              <button
                type="button"
                onClick={() => setCurrentTab('mySubscription')}
                className="w-full py-4 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-base shadow-xl shadow-yellow-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
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
      <footer className="border-t border-[#1E3A6E] py-10 px-4 sm:px-6 bg-[#061128] text-center text-xs text-slate-300">
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
            <div className="aspect-video bg-[#061128] rounded-2xl border border-[#1E3A6E] flex flex-col items-center justify-center p-6 text-xs text-slate-200">
              <div className="p-3 bg-[#0D1E42] rounded-xl border border-[#1E3A6E] text-left w-full space-y-1 mb-3">
                <span className="text-[#FFD400] font-bold block">1. Choose any subject &amp; past paper</span>
                <span>2. Tap [🌐 Explain in My Language]</span>
                <span className="text-emerald-400 block">3. Immediate mother-tongue explanation in isiZulu, Sepedi, etc.</span>
              </div>
              <button
                onClick={() => {
                  setIsDemoModalOpen(false);
                  handleStartTrial();
                }}
                className="w-full py-3 bg-[#FFD400] text-black font-black rounded-xl text-xs hover:bg-yellow-400 flex items-center justify-center gap-2 cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-[#040B1B]/85 backdrop-blur-md flex items-start justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#0A1F44] border border-[#FFD400]/60 rounded-3xl max-w-3xl w-full p-5 sm:p-6 text-left shadow-2xl relative my-6 sm:my-8">
            <button
              onClick={() => setIsSearchModalOpen(false)}
              aria-label="Close global search"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-slate-300 hover:text-white rounded-full bg-[#061128] hover:bg-[#132959] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Search Input */}
            <div className="flex items-center gap-2 mb-4 pr-10">
              <Search className="w-5 h-5 text-[#FFD400] shrink-0" />
              <h3 className="font-display font-black text-lg sm:text-xl text-white">
                Search Study Guides, TVET N1–N6 &amp; Past Papers
              </h3>
            </div>

            <div className="relative mb-5">
              <Search className="w-4 h-4 text-[#FFD400] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                autoFocus
                placeholder="Search anything: N4 Electrotechnics, Power Machines, Momentum, INF1505..."
                value={globalSearchQuery}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-2xl bg-[#061128] border border-[#FFD400]/70 text-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FFD400]"
              />
              {globalSearchQuery && (
                <button
                  onClick={() => setGlobalSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick search chips */}
            <div className="flex flex-wrap items-center gap-1.5 mb-5 pb-4 border-b border-[#1E3A6E]">
              <span className="text-[11px] font-mono text-[#FFD400] font-bold mr-1">Popular:</span>
              {['TVET', 'N4 Electrotechnics', 'Financial Accounting', 'LLB Law', 'Nursing', 'Psychology', 'Momentum'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setGlobalSearchQuery(tag)}
                  className="px-2.5 py-1 rounded-full bg-[#061128] hover:bg-[#132959] border border-[#1E3A6E] hover:border-[#FFD400] text-[11px] text-slate-200 hover:text-[#FFD400] transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Results counter */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300 mb-3 font-mono">
              <span>
                {globalSearchQuery
                  ? `Found ${globalStudyGuideResults.length} study guide(s) & ${globalSearchResults.length} past paper(s)`
                  : `Type to search all ${ALL_STUDY_GUIDE_CHAPTERS.length} Study Guide chapters (Grade 12, TVET N1–N6 & Degree) and past papers`}
              </span>
              <span className="text-[#FFD400]">Grade 4 to University, TVET N1–N6 &amp; Degree</span>
            </div>

            {/* Results list */}
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {globalSearchQuery && globalStudyGuideResults.length === 0 && globalSearchResults.length === 0 && (
                <div className="p-8 text-center text-slate-300 text-xs">
                  No direct matches for &ldquo;{globalSearchQuery}&rdquo;. Try searching a TVET N-level (e.g. N4, Electronics), Physics, Maths, or course code.
                </div>
              )}

              {/* Study Guide & TVET Chapter Matches */}
              {globalStudyGuideResults.map((ch) => {
                const chPath = `${ch.backPath}/${ch.slug}`;
                return (
                  <div
                    key={ch.slug}
                    className="p-4 rounded-2xl bg-[#061128] border border-[#FFD400]/40 hover:border-[#FFD400] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-[#FFD400]/20 border border-[#FFD400]/40 text-[#FFD400] font-mono text-[10px] font-bold">
                          {ch.subjectIcon} {ch.subjectLabel} • Ch {ch.chapterNumber}
                        </span>
                        {!hasActiveAccess && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-300">
                            <Lock className="w-3 h-3" />
                            <span>Trial / Subscribed</span>
                          </span>
                        )}
                      </div>
                      <h4 className="font-display font-black text-sm sm:text-base text-white break-words">
                        {ch.title}
                      </h4>
                      <p className="text-xs text-slate-300 line-clamp-2">{ch.shortDescription}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSearchModalOpen(false);
                        if (typeof window !== 'undefined') {
                          window.history.pushState({}, '', chPath);
                        }
                        setCurrentTab('studyGuideChapter');
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-xs flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      <span>{hasActiveAccess ? 'Open Chapter' : 'Unlock Chapter'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}

              {globalSearchResults.map((paper) => (
                <div
                  key={paper.id}
                  className="p-4 rounded-2xl bg-[#061128] border border-[#1E3A6E] hover:border-[#FFD400]/60 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-md bg-[#0D1E42] border border-[#FFD400]/40 text-[#FFD400] font-mono text-[10px] font-bold">
                          {paper.gradeName}
                        </span>
                        <span className="text-slate-300 text-xs font-mono">&bull; {paper.subject}</span>
                      </div>
                      <h4 className="font-display font-black text-sm sm:text-base text-white">
                        {paper.title}
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-[#FFD400] shrink-0 font-bold">
                      {paper.totalMarks} Marks &bull; {paper.duration}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 whitespace-pre-wrap font-mono">
                    {paper.questions[0]?.questionText || 'Official National Examination paper with step-by-step marking guidelines.'}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#1E3A6E]">
                    <button
                      onClick={() => {
                        setIsSearchModalOpen(false);
                        navigateToPastPapers(paper.gradeId);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#0D1E42] hover:bg-[#142D61] text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#FFD400]" />
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
                      className="px-3 py-1.5 rounded-xl bg-[#0D1E42] hover:bg-[#142D61] border border-[#FFD400]/50 text-[#FFD400] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Explain in YOUR language</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsSearchModalOpen(false);
                        handleStartLearning();
                      }}
                      className="ml-auto px-3 py-1.5 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-xs flex items-center gap-1 transition-colors cursor-pointer"
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
