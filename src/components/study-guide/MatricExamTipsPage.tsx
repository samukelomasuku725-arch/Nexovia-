/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * MATRIC EXAM TIPS PAGE (/study-guide/matric-exam-tips)
 * Exact same Nexovian dark blue + gold design, phone-friendly big cards & buttons.
 * Sections:
 * 1. How to Study
 * 2. Time Management
 * 3. How to Pass
 */

import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  GraduationCap,
  Lightbulb,
  Target
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export const MatricExamTipsPage: React.FC = () => {
  const { setCurrentTab } = useLearning();

  const navigate = (tab: 'studyGuide' | 'papers', path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentTab(tab);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#061128] via-[#0A1F44] to-[#050D1E] text-white py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-7 sm:space-y-8">
        {/* Top Back Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <a
            href="/study-guide"
            onClick={(e) => {
              e.preventDefault();
              navigate('studyGuide', '/study-guide');
            }}
            className="inline-flex items-center gap-2 min-h-[44px] px-3 py-2 rounded-xl bg-[#0D1E42] border border-[#1E3A6E] hover:border-[#FFD400] text-xs sm:text-sm font-bold text-slate-200 hover:text-[#FFD400] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>Back to Study Guide Home</span>
          </a>
        </div>

        {/* Hero Header */}
        <header className="bg-[#0D1E42] border-2 border-[#FFD400]/55 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFD400]/15 border border-[#FFD400]/50 text-[#FFD400] text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>Final Matric Launch Guide • CAPS Grade 12</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-white leading-tight">
            Matric Exam Tips: How to Study, Manage Time &amp; Pass
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            Simple, practical strategies built for South African Grade 12 learners to turn daily revision into confident exam marks.
          </p>
        </header>

        {/* SECTION 1: How to Study */}
        <section className="bg-[#0D1E42] border border-[#1E3A6E] rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#FFD400] text-black flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FFD400]">
                Step 1
              </span>
              <h2 className="font-display font-black text-xl sm:text-2xl text-white">
                How to Study Smart
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: '1. Test Yourself — Do Not Just Read',
                body: 'Reading notes over and over feels easy, but your brain forgets quickly. Read the Simple Summary, then try every Practice Question BEFORE clicking "Show Answer".'
              },
              {
                title: '2. Master Key Formulas & Definitions First',
                body: 'In Physics and Maths, writing the correct formula gives you instant marks. Memorise exact CAPS definitions (like Momentum, Newton’s laws, DNA, and Scale) word for word.'
              },
              {
                title: '3. Practice Real DBE Past Papers',
                body: 'Exams repeat similar question styles every year. After finishing each Study Guide chapter, do 2 past paper questions on that exact topic and check the official memo.'
              },
              {
                title: '4. Fix Mistakes Immediately',
                body: 'Never ignore a wrong answer. Write down WHY you got it wrong (wrong unit, sign error, forgot to convert cm to m) so you do not repeat it in finals.'
              }
            ].map((tip, idx) => (
              <div
                key={idx}
                className="bg-[#071530] border border-[#1E3A6E] rounded-2xl p-5 space-y-2"
              >
                <h3 className="font-display font-bold text-base sm:text-lg text-[#FFD400]">
                  {tip.title}
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed">{tip.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: Time Management */}
        <section className="bg-[#0D1E42] border-2 border-[#FFD400]/45 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#FFD400] text-black flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FFD400]">
                Step 2
              </span>
              <h2 className="font-display font-black text-xl sm:text-2xl text-white">
                Time Management (Study &amp; Exam Hall)
              </h2>
            </div>
          </div>

          <div className="space-y-3.5">
            {[
              {
                label: '40–10 Study Rule at Home',
                detail:
                  'Study with zero phone distractions for 40 minutes (1 chapter + 5 practice questions), then rest for 10 minutes. Two focused blocks a day beats 5 hours of distracted reading.'
              },
              {
                label: '1 Mark = 1 Minute in the Exam Room',
                detail:
                  'A 150-mark paper in 3 hours gives you 180 minutes. Spend about 1 minute per mark — for example, a 6-mark question should take max 6–7 minutes.'
              },
              {
                label: 'Use the First 5 Minutes to Scan',
                detail:
                  'Before writing, read all instructions and tick the easiest questions first. Building confidence early stops exam panic.'
              },
              {
                label: 'Never Get Stuck on One Hard Question',
                detail:
                  'If a question takes more than its minutes, circle it, leave space, and move on. Collect all easy marks from other sections first, then come back at the end.'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 bg-[#071530] border border-[#1E3A6E] rounded-2xl p-4 sm:p-5"
              >
                <span className="w-7 h-7 rounded-full bg-[#FFD400] text-black font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div className="space-y-1 min-w-0">
                  <div className="font-bold text-sm sm:text-base text-white">
                    {item.label}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: How to Pass */}
        <section className="bg-[#0D1E42] border border-[#1E3A6E] rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#FFD400] text-black flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FFD400]">
                Step 3
              </span>
              <h2 className="font-display font-black text-xl sm:text-2xl text-white">
                How to Pass (And Aim Higher!)
              </h2>
            </div>
          </div>

          {/* Easy Marks Checklist */}
          <div className="bg-[#071530] border-l-4 border-[#FFD400] rounded-r-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFD400]">
              <Target className="w-4 h-4" />
              <span>Guarantee Your Core Marks Every Exam</span>
            </div>
            <ul className="space-y-2.5 text-sm text-slate-100">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span>
                  <strong>Always show your working steps:</strong> Even if your final calculator answer is wrong, method marks for formula + substitution often earn 60–75% of the question.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span>
                  <strong>Check units &amp; conversions:</strong> Physics (m/s, kg, J, C, N) and Maths Literacy (cm to m, ml to litres, Rands and cents) deduct marks if units are missing or wrong.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span>
                  <strong>Answer the exact action verb:</strong> &ldquo;State/Define&rdquo; = short sentence; &ldquo;Calculate&rdquo; = formula + steps + unit; &ldquo;Explain&rdquo; = cause AND effect.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span>
                  <strong>Use the last 10 minutes to check:</strong> Confirm calculator is in <strong>DEG</strong> mode for Trigonometry, check negative signs, and verify every sub-question was attempted.
                </span>
              </li>
            </ul>
          </div>

          {/* NSC Pass Levels Box */}
          <div className="bg-[#050F24] border border-[#FFD400]/35 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFD400]">
              <Lightbulb className="w-4 h-4" />
              <span>South African NSC Matric Pass Targets</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="bg-[#0D1E42] border border-[#1E3A6E] rounded-xl p-4">
                <div className="font-mono font-black text-[#FFD400]">40%+ Home Lang</div>
                <div className="text-slate-200 mt-1 text-xs sm:text-sm">
                  Minimum pass foundation — aim for 50%+ on every paper for safety.
                </div>
              </div>
              <div className="bg-[#0D1E42] border border-[#1E3A6E] rounded-xl p-4">
                <div className="font-mono font-black text-[#FFD400]">Diploma Pass</div>
                <div className="text-slate-200 mt-1 text-xs sm:text-sm">
                  40%+ in 4 designated subjects &amp; 40%+ Home Language (TVET / Diploma).
                </div>
              </div>
              <div className="bg-[#0D1E42] border border-[#1E3A6E] rounded-xl p-4">
                <div className="font-mono font-black text-[#FFD400]">Bachelor&apos;s Pass</div>
                <div className="text-slate-200 mt-1 text-xs sm:text-sm">
                  50%+ in 4 designated subjects &amp; 40%+ Home Language (University entry).
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Big Phone-Friendly Bottom CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
          <button
            type="button"
            onClick={() => navigate('studyGuide', '/study-guide')}
            className="min-h-[52px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-sm sm:text-base shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <BookOpen className="w-5 h-5" />
            <span>Back to All 20 Chapters</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => navigate('papers', '/papers')}
            className="min-h-[52px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0D1E42] hover:bg-[#122859] border-2 border-[#FFD400]/50 hover:border-[#FFD400] text-white font-bold text-sm sm:text-base transition-all active:scale-95 cursor-pointer"
          >
            <span>Practice DBE Past Papers</span>
            <ArrowRight className="w-4 h-4 text-[#FFD400]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatricExamTipsPage;
