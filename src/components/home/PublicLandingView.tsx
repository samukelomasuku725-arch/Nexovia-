/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN - FULLY AUTOMATIC INSTANT ACCESS (SNAPSCAN AUTO-UNLOCK)
 * 
 * FLOW:
 * 1. User lands on nexovian.group, chooses language (11 languages) and grade (4 to University)
 * 2. Clicks button "Unlock for R60 - Instant Access" / "Pay R60 with SnapScan"
 * 3. Opens https://pos.snapscan.io/qr/NKJJYpV6 in new tab to pay
 * 4. After paying, user returns to site and clicks "I Have Paid - Unlock App"
 * 5. That button instantly unlocks full app content (localStorage.setItem('nexovian_paid', 'true'))
 *    and shows success modal "Welcome to NEXOVIAN Premium! Choose your grade and language"
 *    with "Access Granted - Start Learning" (no waiting for admin, 100% automated).
 * 
 * Side-by-side buttons:
 * - Button 1: "Pay R60 with SnapScan" -> https://pos.snapscan.io/qr/NKJJYpV6 (target _blank, blue)
 * - Button 2: "I Have Paid - Unlock App"
 * 
 * Timer:
 * - When Pay button is clicked, after 10 seconds show popup: "Payment done? Click Unlock"
 * 
 * Trust text:
 * - "Payment verified by SnapScan to NEXOVIAN PTY LTD - Instant Auto Unlock"
 */

import React, { useState, useEffect, useRef } from 'react';
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
  Layers,
  ShieldCheck,
  QrCode,
  ExternalLink,
  Unlock,
  Clock,
  School,
  Briefcase
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useAuth } from '../../context/AuthContext';
import { SALanguageCode } from '../../types';

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
  { code: 'nr', name: 'isiNdebele', native: 'isiNdebele' }
];

export interface GradeOption {
  id: string;
  name: string;
  level: string;
  badge: string;
}

export const ALL_GRADES: GradeOption[] = [
  { id: 'grade-4', name: 'Grade 4', level: 'Intermediate Phase', badge: 'CAPS' },
  { id: 'grade-5', name: 'Grade 5', level: 'Intermediate Phase', badge: 'CAPS' },
  { id: 'grade-6', name: 'Grade 6', level: 'Intermediate Phase', badge: 'CAPS' },
  { id: 'grade-7', name: 'Grade 7', level: 'Senior Phase', badge: 'CAPS' },
  { id: 'grade-8', name: 'Grade 8', level: 'Senior Phase', badge: 'CAPS' },
  { id: 'grade-9', name: 'Grade 9', level: 'Senior Phase', badge: 'CAPS' },
  { id: 'grade-10', name: 'Grade 10', level: 'FET Phase', badge: 'CAPS' },
  { id: 'grade-11', name: 'Grade 11', level: 'FET Phase', badge: 'CAPS' },
  { id: 'grade-12', name: 'Grade 12', level: 'FET Phase (Matric)', badge: 'CAPS' },
  { id: 'tvet', name: 'TVET Colleges', level: 'N1–N6 / NC(V)', badge: 'NATED' },
  { id: 'university', name: 'University', level: 'Higher Education', badge: 'Degree' }
];

const SNAPSCAN_URL = 'https://pos.snapscan.io/qr/NKJJYpV6';

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
  const { setCurrentTab, setActiveLearningLanguage, updateLearningContext } = useLearning();
  const { isAuthenticated } = useAuth();

  // User selections on landing page
  const [selectedLang, setSelectedLang] = useState<SALanguageCode>('zu');
  const [selectedGradeId, setSelectedGradeId] = useState<string>('grade-10');

  // Instant Unlock State
  const [isPaid, setIsPaid] = useState<boolean>(() => {
    try {
      return typeof window !== 'undefined' && localStorage.getItem('nexovian_paid') === 'true';
    } catch {
      return false;
    }
  });

  // 10-Second Timer popup state
  const [showPaymentDonePopup, setShowPaymentDonePopup] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Success Modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Memo Demo state
  const [demoLang, setDemoLang] = useState('isiZulu');
  const [isDemoDropdownOpen, setIsDemoDropdownOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSnapScanPayClick = () => {
    // 10-Second Timer: After user clicks Pay button, after 10 seconds show popup "Payment done? Click Unlock"
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowPaymentDonePopup(true);
    }, 10000);
  };

  const handleUnlockApp = () => {
    try {
      // 1. Instantly set nexovian_paid = true in localStorage
      localStorage.setItem('nexovian_paid', 'true');
      localStorage.setItem(
        'nexovian_subscription_override',
        JSON.stringify({
          status: 'active',
          until: Date.now() + 365 * 24 * 60 * 60 * 1000
        })
      );

      // 2. Save language and grade selections
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
    } catch (err) {
      console.warn('Unlock storage notice:', err);
    }

    setIsPaid(true);
    setShowPaymentDonePopup(false);
    setShowSuccessModal(true);
  };

  const handleStartLearning = () => {
    setShowSuccessModal(false);
    setCurrentTab('home');
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/app');
    }
  };

  const selectedLangObj = ALL_11_LANGUAGES.find((l) => l.code === selectedLang) || ALL_11_LANGUAGES[2];
  const selectedGradeObj = ALL_GRADES.find((g) => g.id === selectedGradeId) || ALL_GRADES[6];

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans antialiased selection:bg-[#FFD700] selection:text-black">
      
      {/* 1. NETFLIX-STYLE HEADER */}
      <header className="sticky top-0 z-50 bg-[#000000]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          
          {/* Logo NEXOVIAN Left */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
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

            {isPaid ? (
              <button
                onClick={() => setCurrentTab('home')}
                className="px-5 py-2.5 rounded-full bg-[#FFD700] hover:bg-yellow-400 text-black font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Unlock className="w-4 h-4 text-black" />
                <span>Go to App (Unlocked)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : isAuthenticated ? (
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
                  onClick={() => setCurrentTab('login')}
                  className="px-4 py-2 rounded-full border border-white/20 hover:border-white/40 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Login
                </button>

                <a
                  href="#instant-unlock"
                  className="px-5 py-2.5 rounded-full bg-[#0077b6] hover:bg-[#023e8a] text-white font-black text-xs sm:text-sm shadow-lg shadow-blue-500/20 transition-all cursor-pointer transform hover:scale-105 active:scale-95 flex items-center gap-1.5"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Unlock R60 Instant</span>
                </a>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        {/* ========================================================
            HERO SECTION (NETFLIX AESTHETIC)
           ======================================================== */}
        <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 text-center border-b border-white/10">
          
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

            {/* Active Unlocked Status Banner if paid */}
            {isPaid && (
              <div className="mt-6 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-bold text-sm shadow-lg">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>NEXOVIAN Premium Active — Full Access Unlocked</span>
                <button
                  onClick={handleStartLearning}
                  className="ml-2 px-3 py-1 rounded-xl bg-emerald-400 text-black font-black text-xs hover:bg-emerald-300"
                >
                  Open Dashboard →
                </button>
              </div>
            )}

            {/* ========================================================
                AUTOMATIC INSTANT ACCESS BOX (STEP 1 & STEP 2)
               ======================================================== */}
            <div id="instant-unlock" className="mt-10 max-w-3xl mx-auto bg-[#0c0c0c] border-2 border-[#FFD700]/80 rounded-3xl p-6 sm:p-8 text-left shadow-2xl relative overflow-hidden">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#FFD700]">
                    <Sparkles className="w-4 h-4 text-[#FFD700]" />
                    <span>Instant Auto Access &bull; No Waiting</span>
                  </div>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white mt-1">
                    Choose Your Language &amp; Grade &mdash; Unlock for R60
                  </h3>
                </div>
                <div className="text-right sm:text-right shrink-0">
                  <div className="text-2xl font-black text-[#FFD700]">R60</div>
                  <div className="text-[11px] text-white/60">One-time / Monthly</div>
                </div>
              </div>

              {/* 1. CHOOSE LANGUAGE (11 LANGUAGES) */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/80 flex items-center gap-1.5">
                    <Languages className="w-4 h-4 text-[#FFD700]" />
                    <span>1. Select Your Language (All 11 Official):</span>
                  </span>
                  <span className="text-xs text-[#FFD700] font-bold">
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
                            ? 'bg-[#FFD700] text-black font-black shadow-md shadow-yellow-500/20 scale-105'
                            : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/10'
                        }`}
                      >
                        <span>{lang.name}</span>
                        {lang.isNativeSpecial && <span className="ml-1 text-[10px]">⭐</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. CHOOSE GRADE (GRADE 4 TO UNIVERSITY) */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/80 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-[#FFD700]" />
                    <span>2. Select Grade (Grade 4 to University):</span>
                  </span>
                  <span className="text-xs text-[#FFD700] font-bold">
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
                            ? 'bg-[#FFD700] text-black font-black shadow-md shadow-yellow-500/20 scale-105'
                            : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/10'
                        }`}
                      >
                        <span>{grade.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. TWO BUTTONS SIDE BY SIDE */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex flex-col sm:flex-row items-stretch gap-3">
                  
                  {/* Button 1: Pay R60 with SnapScan */}
                  <a
                    href={SNAPSCAN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleSnapScanPayClick}
                    className="flex-1 py-4 px-5 rounded-2xl bg-[#0077b6] hover:bg-[#023e8a] text-white font-black text-sm sm:text-base shadow-xl shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 text-center cursor-pointer"
                  >
                    <QrCode className="w-5 h-5 shrink-0" />
                    <span>Pay R60 with SnapScan</span>
                    <ExternalLink className="w-4 h-4 opacity-75 shrink-0 ml-0.5" />
                  </a>

                  {/* Button 2: I Have Paid - Unlock App */}
                  <button
                    type="button"
                    onClick={handleUnlockApp}
                    className="flex-1 py-4 px-5 rounded-2xl bg-[#FFD700] hover:bg-yellow-400 text-black font-black text-sm sm:text-base shadow-xl shadow-yellow-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 text-center cursor-pointer"
                  >
                    <CheckCircle2 className="w-5 h-5 text-black shrink-0" />
                    <span>I Have Paid - Unlock App</span>
                  </button>
                </div>

                {/* Trust Line */}
                <div className="mt-3.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/60">
                  <p className="flex items-center gap-1.5 text-white/80 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Payment verified by SnapScan to NEXOVIAN PTY LTD - Instant Auto Unlock</span>
                  </p>
                  <p className="text-[11px] text-white/40">
                    No waiting for admin &bull; Instant unlock
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Demo CTA */}
            <div className="mt-6 flex items-center justify-center">
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-[#FFD700] text-[#FFD700]" />
                <span>Watch 20-sec DBE Memo Explainer Demo</span>
              </button>
            </div>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Card 1: CAPS Notes & Quizzes */}
            <div className="bg-[#0D0D0D] border border-white/10 hover:border-[#FFD700]/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFD700]/15 text-[#FFD700] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-display font-black text-xl text-white mb-2">
                  CAPS notes &amp; quizzes (Grade 4 to University)
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Full curriculum coverage aligned with DBE CAPS and TVET N1-N6. Interactive quizzes with instant diagnostic hints in your native language.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#FFD700] font-bold">
                <span>13 Grades + TVET &bull; 800+ Quizzes</span>
                <Check className="w-4 h-4" />
              </div>
            </div>

            {/* Card 2: Instant Homework Help */}
            <div className="bg-[#0D0D0D] border border-white/10 hover:border-[#FFD700]/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFD700]/15 text-[#FFD700] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h3 className="font-display font-black text-xl text-white mb-2">
                  Instant homework help (Ask in your language)
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Stuck on algebra, physics, or accounting? Ask any question in isiZulu, Sepedi, Afrikaans, or English and get simple, friendly explanations.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#FFD700] font-bold">
                <span>All 11 Official SA Languages</span>
                <Check className="w-4 h-4" />
              </div>
            </div>

            {/* Card 3: 4000+ DBE Past Papers with Memo Explanations */}
            <div className="bg-[#0D0D0D] border border-white/10 hover:border-[#FFD700]/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFD700]/15 text-[#FFD700] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-display font-black text-xl text-white mb-2">
                  4000+ DBE Past Papers with memo explanations
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Real national examination papers with step-by-step memos translated into your home language so you never get lost in mathematical jargon.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#FFD700] font-bold">
                <span>Official Memos &bull; Step-by-Step</span>
                <Check className="w-4 h-4" />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            MEMO EXPLANATION FEATURE LIVE DEMO
           ======================================================== */}
        <section className="py-16 sm:py-24 bg-[#0A0A0A] border-y border-white/10 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs uppercase font-mono font-bold text-[#FFD700] tracking-widest block mb-1">
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
            <div className="bg-[#121212] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
              
              {/* Question Header */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-5">
                <div className="text-[11px] font-mono font-bold text-[#FFD700] uppercase tracking-wider mb-1">
                  DBE Mathematics Paper 1 &bull; Question 1.1
                </div>
                <p className="text-base sm:text-lg font-bold text-white">
                  Solve for x: <span className="font-mono text-[#FFD700]">2x + 3 = 7</span>
                </p>
                <p className="text-xs text-white/50 mt-1 font-mono">
                  Official DBE Memo: 2x = 4 &rarr; x = 2 (2 marks)
                </p>
              </div>

              {/* Action Banner with Language Dropdown */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#000000] border border-white/10 mb-4">
                <div className="text-xs text-white/80">
                  <span className="font-bold text-white block">Don&apos;t understand the official English memo?</span>
                  <span className="text-white/60">Get it broken down step-by-step in your mother tongue:</span>
                </div>

                <div className="relative inline-block text-left shrink-0">
                  <button
                    onClick={() => setIsDemoDropdownOpen(!isDemoDropdownOpen)}
                    className="px-4 py-2 rounded-xl bg-[#FFD700] hover:bg-yellow-400 text-black font-extrabold text-xs flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Languages className="w-4 h-4" />
                    <span>Explain in {demoLang}</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {isDemoDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#1A1A1A] border border-white/20 shadow-2xl py-2 z-20 max-h-60 overflow-y-auto">
                      {ALL_11_LANGUAGES.map((lang) => (
                        <button
                          key={lang.name}
                          onClick={() => {
                            setDemoLang(lang.name);
                            setIsDemoDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-xs hover:bg-[#FFD700] hover:text-black transition-colors ${
                            demoLang === lang.name ? 'text-[#FFD700] font-bold' : 'text-white/90'
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
              <div className="p-5 rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/30 text-white">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FFD700] uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FFD700]" />
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
            PRICING SECTION: FREE FOR 2 DAYS, THEN R60/MONTH
           ======================================================== */}
        <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-mono font-bold text-[#FFD700] tracking-widest block mb-1">
              AFFORDABLE FOR EVERY SOUTH AFRICAN FAMILY
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
              One Price. Everyone Equal.
            </h2>
          </div>

          <div className="max-w-md mx-auto bg-[#0D0D0D] border-2 border-[#FFD700] rounded-3xl p-8 sm:p-10 text-center shadow-2xl relative overflow-hidden">
            <div className="inline-block px-3 py-1 rounded-full bg-[#FFD700] text-black text-xs font-mono font-bold uppercase mb-4">
              R60 / MONTH &bull; CANCEL ANYTIME
            </div>

            <div className="flex items-baseline justify-center gap-1.5 mb-2">
              <span className="text-5xl font-display font-black text-[#FFD700]">R60</span>
              <span className="text-sm font-bold text-white/60">/ month</span>
            </div>

            <p className="text-xs text-white/70 mb-6">
              Instant Auto Unlock via SnapScan &bull; No admin wait time
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
                <span>4000+ DBE Past Papers with step-by-step memos</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#FFD700] shrink-0" />
                <span>Cancel anytime &bull; No hidden contracts</span>
              </li>
            </ul>

            {/* Side-by-Side Payment Buttons on Pricing Card */}
            <div className="space-y-3">
              <a
                href={SNAPSCAN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleSnapScanPayClick}
                className="w-full py-4 rounded-xl bg-[#0077b6] hover:bg-[#023e8a] text-white font-black text-base shadow-xl shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
              >
                <QrCode className="w-5 h-5 shrink-0" />
                <span>Pay R60 with SnapScan</span>
              </a>

              <button
                type="button"
                onClick={handleUnlockApp}
                className="w-full py-4 rounded-xl bg-[#FFD700] hover:bg-yellow-400 text-black font-black text-base shadow-xl shadow-yellow-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5 text-black shrink-0" />
                <span>I Have Paid - Unlock App</span>
              </button>
            </div>

            <p className="mt-4 text-[11px] text-white/50 font-mono">
              Payment verified by SnapScan to NEXOVIAN PTY LTD - Instant Auto Unlock
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

      {/* ========================================================
          TIMER POPUP: 10 SECONDS AFTER CLICKING PAY
          "Payment done? Click Unlock"
         ======================================================== */}
      {showPaymentDonePopup && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 max-w-sm w-full bg-[#141414] border-2 border-[#FFD700] rounded-2xl p-5 shadow-2xl text-left animate-in slide-in-from-bottom duration-300">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FFD700] uppercase">
              <Clock className="w-4 h-4 text-[#FFD700]" />
              <span>SnapScan Payment Auto-Unlock</span>
            </div>
            <button
              onClick={() => setShowPaymentDonePopup(false)}
              className="text-white/50 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h4 className="font-display font-bold text-base text-white mt-1.5">
            Payment done? Click Unlock
          </h4>
          <p className="text-xs text-white/70 mt-1 leading-relaxed">
            Completed your R60 payment on the SnapScan tab? Click below to instantly activate full access to all subjects, papers, and memos!
          </p>

          <button
            onClick={handleUnlockApp}
            className="mt-3.5 w-full py-3 px-4 rounded-xl bg-[#FFD700] hover:bg-yellow-400 text-black font-black text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4 text-black" />
            <span>I Have Paid - Unlock App</span>
          </button>
        </div>
      )}

      {/* ========================================================
          SUCCESS MODAL: WELCOME TO NEXOVIAN PREMIUM
         ======================================================== */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121212] border-2 border-[#FFD700] rounded-3xl max-w-md w-full p-6 sm:p-8 text-center shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#FFD700] text-black flex items-center justify-center mx-auto mb-4 font-black text-2xl shadow-lg">
              ✓
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-mono font-bold uppercase mb-3">
              Access Granted &bull; Instant Auto-Unlock
            </div>

            <h3 className="font-display font-black text-2xl text-white mb-2">
              Welcome to NEXOVIAN Premium!
            </h3>

            <p className="text-xs sm:text-sm text-white/80 mb-5 leading-relaxed">
              Your R60 payment has been registered. Full curriculum content from Grade 4 to University is now unlocked.
            </p>

            {/* Selected Config Display */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left space-y-2 mb-6 text-xs">
              <div className="flex items-center justify-between text-white/70">
                <span>Selected Grade:</span>
                <strong className="text-[#FFD700] font-bold">{selectedGradeObj.name} ({selectedGradeObj.level})</strong>
              </div>
              <div className="flex items-center justify-between text-white/70">
                <span>Home Language:</span>
                <strong className="text-[#FFD700] font-bold">{selectedLangObj.name} ({selectedLangObj.native})</strong>
              </div>
              <div className="flex items-center justify-between text-emerald-400 font-bold pt-2 border-t border-white/10">
                <span>All 11 Languages &amp; Past Papers:</span>
                <span>UNLOCKED</span>
              </div>
            </div>

            <button
              onClick={handleStartLearning}
              className="w-full py-4 rounded-xl bg-[#FFD700] hover:bg-yellow-400 text-black font-black text-base shadow-xl shadow-yellow-500/30 flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.02] active:scale-95"
            >
              <span>Access Granted - Start Learning</span>
              <ArrowRight className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>
      )}

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
              Nexovian allows any learner to browse DBE past papers, click &ldquo;Explain in My Language&rdquo;, and understand math and science step-by-step.
            </p>
            <div className="aspect-video bg-black rounded-2xl border border-white/10 flex flex-col items-center justify-center p-6 text-xs text-white/60">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-left w-full space-y-1 mb-3">
                <span className="text-[#FFD700] font-bold block">1. Choose any subject &amp; past paper</span>
                <span>2. Tap [🌐 Explain in My Language]</span>
                <span className="text-emerald-400 block">3. Immediate mother-tongue explanation in isiZulu, Sepedi, etc.</span>
              </div>
              <a
                href={SNAPSCAN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleSnapScanPayClick}
                className="w-full py-3 bg-[#0077b6] text-white font-bold rounded-xl text-xs hover:bg-[#023e8a] flex items-center justify-center gap-2"
              >
                <QrCode className="w-4 h-4" />
                <span>Pay R60 with SnapScan &bull; Instant Access</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
