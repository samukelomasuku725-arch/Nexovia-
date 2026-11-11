/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN STUDY GUIDE - CHAPTER DETAIL TEMPLATE
 * Route: /study-guide/physics-grade-12/momentum (and dynamic slug handler)
 * SA CAPS Grade 12 Only
 */

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, BookOpen, CheckCircle2, AlertCircle, HelpCircle, ChevronDown, ChevronUp, Copy, Check, Calculator } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export const StudyGuideChapterPage: React.FC = () => {
  const { setCurrentTab } = useLearning();

  // State-backed pathname so navigating between chapters updates the view immediately
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return typeof window !== 'undefined' ? window.location.pathname : '';
  });

  useEffect(() => {
    const onPop = () => {
      setCurrentPath(typeof window !== 'undefined' ? window.location.pathname : '');
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const isLifeSciences = currentPath.includes('life-sciences-grade-12');
  const pathParts = currentPath.split('/').filter(Boolean);
  const currentSlug = pathParts[pathParts.length - 1] || 'momentum';

  const [expandedSolutions, setExpandedSolutions] = useState<Record<number, boolean>>({});

  const toggleSolution = (qNum: number) => {
    setExpandedSolutions((prev) => ({
      ...prev,
      [qNum]: !prev[qNum]
    }));
  };

  const handleNavigate = (path: string, tab: any) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    setCurrentPath(path);
    setCurrentTab(tab);
  };

  const backUrl = isLifeSciences ? '/study-guide/life-sciences-grade-12' : '/study-guide/physics-grade-12';
  const backTab = isLifeSciences ? 'studyGuideLifeSciences' : 'studyGuidePhysics';
  const parentName = isLifeSciences ? 'Life Sciences Grade 12' : 'Physics Grade 12';

  // If slug is not momentum, render a clean placeholder template with link to Chapter 1
  if (currentSlug !== 'momentum' && !isLifeSciences) {
    const chapterName = currentSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white font-sans antialiased pb-20">
        <div className="bg-[#141414] border-b border-[#262626] px-4 py-3 sticky top-0 z-30 backdrop-blur-md">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <a
              href={backUrl}
              onClick={(e) => {
                e.preventDefault();
                handleNavigate(backUrl, backTab);
              }}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-300 hover:text-[#FFD400] transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-white/5"
            >
              <ArrowLeft className="w-4 h-4 text-[#FFD400]" />
              <span>&larr; Back to {parentName}</span>
            </a>
            <span className="text-[11px] font-mono text-[#FFD400] bg-[#FFD400]/10 border border-[#FFD400]/30 px-2.5 py-0.5 rounded-full uppercase">
              CAPS Revision
            </span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#FFD400] text-black font-black text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            ⚡
          </div>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-white mb-3">
            {chapterName}
          </h1>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mb-8">
            This CAPS Grade 12 chapter module is currently being finalized. You can view the live full template for Chapter 1: Momentum &amp; Impulse below.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/study-guide/physics-grade-12/momentum"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('/study-guide/physics-grade-12/momentum', 'studyGuideChapter');
              }}
              className="px-6 py-3.5 rounded-2xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-sm shadow-md transition-all cursor-pointer inline-flex items-center justify-center"
            >
              📚 View Chapter 1: Momentum &amp; Impulse (Full Template)
            </a>
            <a
              href={backUrl}
              onClick={(e) => {
                e.preventDefault();
                handleNavigate(backUrl, backTab);
              }}
              className="px-6 py-3.5 rounded-2xl bg-[#1E1E1E] hover:bg-[#2A2A2A] text-white font-bold text-sm border border-[#333] transition-all cursor-pointer inline-flex items-center justify-center"
            >
              &larr; Return to Chapter List
            </a>
          </div>
        </div>
      </div>
    );
  }

  // If slug is Life Sciences chapter
  if (isLifeSciences) {
    const chapterName = currentSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white font-sans antialiased pb-20">
        <div className="bg-[#141414] border-b border-[#262626] px-4 py-3 sticky top-0 z-30 backdrop-blur-md">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <a
              href={backUrl}
              onClick={(e) => {
                e.preventDefault();
                handleNavigate(backUrl, backTab);
              }}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-300 hover:text-[#FFD400] transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-white/5"
            >
              <ArrowLeft className="w-4 h-4 text-[#FFD400]" />
              <span>&larr; Back to {parentName}</span>
            </a>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full uppercase">
              CAPS Revision
            </span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#007A4D] text-white font-black text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            🧬
          </div>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-white mb-3">
            {chapterName}
          </h1>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mb-8">
            This Life Sciences Grade 12 chapter module is currently being finalized. You can view the live full Physics template for Chapter 1: Momentum &amp; Impulse below.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/study-guide/physics-grade-12/momentum"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('/study-guide/physics-grade-12/momentum', 'studyGuideChapter');
              }}
              className="px-6 py-3.5 rounded-2xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-sm shadow-md transition-all cursor-pointer inline-flex items-center justify-center"
            >
              📚 View Physics Chapter 1 Template
            </a>
            <a
              href="/study-guide/life-sciences-grade-12"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('/study-guide/life-sciences-grade-12', 'studyGuideLifeSciences');
              }}
              className="px-6 py-3.5 rounded-2xl bg-[#1E1E1E] hover:bg-[#2A2A2A] text-white font-bold text-sm border border-[#333] transition-all cursor-pointer inline-flex items-center justify-center"
            >
              &larr; Return to Life Sciences Chapters
            </a>
          </div>
        </div>
      </div>
    );
  }

  // EXACT SPECIFICATION FOR /study-guide/physics-grade-12/momentum
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans antialiased pb-24">
      {/* 1. TOP HEADER & BREADCRUMB */}
      <div className="bg-[#141414] border-b border-[#262626] px-4 py-3 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a
            href="/study-guide/physics-grade-12"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate('/study-guide/physics-grade-12', 'studyGuidePhysics');
            }}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-300 hover:text-[#FFD400] transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4 text-[#FFD400]" />
            <span>&larr; Back to Physics Grade 12</span>
          </a>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FFD400]/15 text-[#FFD400] border border-[#FFD400]/40">
              CAPS Paper 1 Revision
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 space-y-8">
        
        {/* Title Section */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1A1A] border border-[#FFD400]/40 mb-3 text-xs font-mono text-[#FFD400]">
            <span>Grade 12 Physical Sciences • Chapter 1</span>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
            Chapter 1: Momentum &amp; Impulse
          </h1>

          <p className="mt-1 text-slate-400 text-xs sm:text-sm font-mono">
            Focus: Conservation of Linear Momentum &bull; Newton&apos;s Second Law &bull; Impulse
          </p>
        </div>

        {/* SECTION 1: SIMPLE SUMMARY */}
        <div className="bg-[#141414] border-2 border-[#262626] rounded-3xl p-6 sm:p-7 shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-[#FFD400] text-black flex items-center justify-center font-bold text-sm">
              💡
            </div>
            <h2 className="font-display font-black text-lg sm:text-xl text-white">
              Simple Summary
            </h2>
          </div>

          <div className="bg-[#1E1E1E] border border-white/10 rounded-2xl p-4 sm:p-5 text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
            <p className="text-white font-semibold mb-2">
              Momentum is how much &ldquo;moving power&rdquo; an object has. Heavier + faster = more momentum.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              In physics, any moving object has linear momentum. The momentum depends on two things: how heavy it is (its mass $m$ in kilograms) and how fast it is travelling (its velocity $v$ in meters per second). Because velocity has direction, <strong>momentum is always a vector quantity</strong>.
            </p>
          </div>
        </div>

        {/* SECTION 2: KEY FORMULAS */}
        <div className="bg-[#141414] border-2 border-[#262626] rounded-3xl p-6 sm:p-7 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-[#FFD400] text-black flex items-center justify-center font-bold text-sm">
              📐
            </div>
            <h2 className="font-display font-black text-lg sm:text-xl text-white">
              Key Formulas (Official CAPS Formula Sheet)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 font-mono">
            <div className="bg-[#1A1A1A] border-2 border-[#FFD400]/40 rounded-2xl p-4 text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                Linear Momentum
              </span>
              <div className="text-lg sm:text-xl font-black text-[#FFD400]">
                p = m &times; v
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Units: kg&middot;m/s
              </span>
            </div>

            <div className="bg-[#1A1A1A] border-2 border-[#FFD400]/40 rounded-2xl p-4 text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                Impulse-Momentum Theorem
              </span>
              <div className="text-lg sm:text-xl font-black text-[#FFD400]">
                Fnet &times; &Delta;t = &Delta;p
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                &Delta;p = m(vf - vi) &bull; N&middot;s
              </span>
            </div>

            <div className="bg-[#1A1A1A] border-2 border-[#FFD400]/40 rounded-2xl p-4 text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                Conservation of Momentum
              </span>
              <div className="text-base sm:text-lg font-black text-[#FFD400] leading-snug">
                Total momentum before = Total momentum after
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                &sum;p_before = &sum;p_after
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 3: WORKED EXAMPLE */}
        <div className="bg-[#141414] border-2 border-[#262626] rounded-3xl p-6 sm:p-7 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-[#007A4D] text-white flex items-center justify-center font-bold text-sm">
              ✏️
            </div>
            <h2 className="font-display font-black text-lg sm:text-xl text-white">
              Worked Example (With Full Working)
            </h2>
          </div>

          <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-[#FFD400] uppercase block mb-1">
                Problem Statement:
              </span>
              <p className="text-sm sm:text-base font-semibold text-white">
                A 2kg ball moves at 3 m/s east. Calculate the momentum of the ball.
              </p>
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase block mb-2">
                Step-by-Step CAPS Solution:
              </span>

              <div className="bg-black/60 rounded-xl p-4 font-mono text-xs sm:text-sm space-y-2 border border-white/5">
                <div className="text-slate-400">
                  Step 1: Identify given data with direction
                </div>
                <div className="text-white pl-3">
                  m = 2 kg<br />
                  v = 3 m/s east
                </div>

                <div className="text-slate-400 pt-1">
                  Step 2: State formula from formula sheet (1 Mark)
                </div>
                <div className="text-[#FFD400] pl-3 font-bold">
                  p = m &times; v
                </div>

                <div className="text-slate-400 pt-1">
                  Step 3: Substitution (1 Mark)
                </div>
                <div className="text-white pl-3">
                  p = 2 &times; 3
                </div>

                <div className="text-slate-400 pt-1">
                  Step 4: Final answer with correct unit AND direction (1 Mark)
                </div>
                <div className="text-emerald-400 pl-3 font-black text-base sm:text-lg">
                  p = 6 kg&middot;m/s east
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: PRACTICE QUESTIONS */}
        <div className="bg-[#141414] border-2 border-[#262626] rounded-3xl p-6 sm:p-7 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#FFD400] text-black flex items-center justify-center font-bold text-sm">
                📝
              </div>
              <h2 className="font-display font-black text-lg sm:text-xl text-white">
                Practice Questions (5 CAPS Questions)
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">
              Tap &ldquo;Show Solution&rdquo; to check your working
            </span>
          </div>

          <div className="space-y-4">
            {/* Question 1 */}
            <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-[#FFD400] text-black font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      A 1200 kg car travels east at 25 m/s. Calculate the momentum of the car.
                    </p>
                    <span className="text-[11px] font-mono text-slate-400 mt-0.5 block">
                      [3 Marks]
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleSolution(1)}
                  className="px-3 py-1.5 rounded-xl bg-[#262626] hover:bg-[#333] text-xs font-bold text-[#FFD400] transition-colors shrink-0 cursor-pointer flex items-center gap-1"
                >
                  <span>{expandedSolutions[1] ? 'Hide' : 'Show Solution'}</span>
                  {expandedSolutions[1] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {expandedSolutions[1] && (
                <div className="mt-4 pt-3 border-t border-white/10 bg-black/40 rounded-xl p-3 font-mono text-xs space-y-1.5 text-slate-200">
                  <p className="text-emerald-400 font-bold">Solution:</p>
                  <p>p = m &times; v &checkmark; (Formula)</p>
                  <p>p = (1200)(25) &checkmark; (Substitution)</p>
                  <p className="text-[#FFD400] font-black text-sm">p = 30 000 kg&middot;m/s east (or 3 &times; 10^4 kg&middot;m/s east) &checkmark; (Answer with unit &amp; direction)</p>
                </div>
              )}
            </div>

            {/* Question 2 */}
            <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-[#FFD400] text-black font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      A 0.05 kg tennis ball strikes a racket horizontally at 30 m/s east and rebounds in the opposite direction at 20 m/s. Calculate the change in momentum (&Delta;p) of the tennis ball.
                    </p>
                    <span className="text-[11px] font-mono text-slate-400 mt-0.5 block">
                      [4 Marks]
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleSolution(2)}
                  className="px-3 py-1.5 rounded-xl bg-[#262626] hover:bg-[#333] text-xs font-bold text-[#FFD400] transition-colors shrink-0 cursor-pointer flex items-center gap-1"
                >
                  <span>{expandedSolutions[2] ? 'Hide' : 'Show Solution'}</span>
                  {expandedSolutions[2] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {expandedSolutions[2] && (
                <div className="mt-4 pt-3 border-t border-white/10 bg-black/40 rounded-xl p-3 font-mono text-xs space-y-1.5 text-slate-200">
                  <p className="text-emerald-400 font-bold">Solution:</p>
                  <p>Choose East as positive (+). Then West is negative (-).</p>
                  <p>&Delta;p = m(vf - vi) &checkmark;</p>
                  <p>&Delta;p = 0.05 [ (-20) - (+30) ] &checkmark; (Substitution with correct opposite sign)</p>
                  <p>&Delta;p = 0.05(-50) = -2.5 kg&middot;m/s</p>
                  <p className="text-[#FFD400] font-black text-sm">&Delta;p = 2.5 kg&middot;m/s west &checkmark; (Magnitude, unit, and direction)</p>
                </div>
              )}
            </div>

            {/* Question 3 */}
            <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-[#FFD400] text-black font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      A net force of 450 N acts to the right on a stationary 15 kg crate for 4 seconds. Calculate the final velocity of the crate using the impulse-momentum theorem.
                    </p>
                    <span className="text-[11px] font-mono text-slate-400 mt-0.5 block">
                      [4 Marks]
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleSolution(3)}
                  className="px-3 py-1.5 rounded-xl bg-[#262626] hover:bg-[#333] text-xs font-bold text-[#FFD400] transition-colors shrink-0 cursor-pointer flex items-center gap-1"
                >
                  <span>{expandedSolutions[3] ? 'Hide' : 'Show Solution'}</span>
                  {expandedSolutions[3] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {expandedSolutions[3] && (
                <div className="mt-4 pt-3 border-t border-white/10 bg-black/40 rounded-xl p-3 font-mono text-xs space-y-1.5 text-slate-200">
                  <p className="text-emerald-400 font-bold">Solution:</p>
                  <p>Fnet &times; &Delta;t = &Delta;p &checkmark;</p>
                  <p>Fnet &times; &Delta;t = m(vf - vi)</p>
                  <p>(450)(4) = 15(vf - 0) &checkmark; (Substitution)</p>
                  <p>1800 = 15vf</p>
                  <p className="text-[#FFD400] font-black text-sm">vf = 120 m/s to the right &checkmark;</p>
                </div>
              )}
            </div>

            {/* Question 4 */}
            <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-[#FFD400] text-black font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      A 0.4 kg trolley moving east at 2 m/s collides with and couples to a stationary 0.6 kg trolley. Calculate the velocity of the combined trolleys immediately after the collision.
                    </p>
                    <span className="text-[11px] font-mono text-slate-400 mt-0.5 block">
                      [4 Marks]
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleSolution(4)}
                  className="px-3 py-1.5 rounded-xl bg-[#262626] hover:bg-[#333] text-xs font-bold text-[#FFD400] transition-colors shrink-0 cursor-pointer flex items-center gap-1"
                >
                  <span>{expandedSolutions[4] ? 'Hide' : 'Show Solution'}</span>
                  {expandedSolutions[4] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {expandedSolutions[4] && (
                <div className="mt-4 pt-3 border-t border-white/10 bg-black/40 rounded-xl p-3 font-mono text-xs space-y-1.5 text-slate-200">
                  <p className="text-emerald-400 font-bold">Solution:</p>
                  <p>&sum;p_before = &sum;p_after &checkmark;</p>
                  <p>m1&middot;v1i + m2&middot;v2i = (m1 + m2)vf</p>
                  <p>(0.4)(2) + (0.6)(0) = (0.4 + 0.6)vf &checkmark;</p>
                  <p>0.8 = (1.0)vf</p>
                  <p className="text-[#FFD400] font-black text-sm">vf = 0.8 m/s east &checkmark;</p>
                </div>
              )}
            </div>

            {/* Question 5 */}
            <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-[#FFD400] text-black font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    5
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      State the Principle of Conservation of Linear Momentum in words as required by the DBE CAPS examination marking guidelines.
                    </p>
                    <span className="text-[11px] font-mono text-slate-400 mt-0.5 block">
                      [2 Marks]
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleSolution(5)}
                  className="px-3 py-1.5 rounded-xl bg-[#262626] hover:bg-[#333] text-xs font-bold text-[#FFD400] transition-colors shrink-0 cursor-pointer flex items-center gap-1"
                >
                  <span>{expandedSolutions[5] ? 'Hide' : 'Show Solution'}</span>
                  {expandedSolutions[5] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {expandedSolutions[5] && (
                <div className="mt-4 pt-3 border-t border-white/10 bg-black/40 rounded-xl p-3 font-mono text-xs space-y-1.5 text-slate-200">
                  <p className="text-emerald-400 font-bold">Official CAPS Definition (2 Marks):</p>
                  <p className="italic text-white">
                    &ldquo;The total linear momentum of an isolated (closed) system remains constant (is conserved) in magnitude and direction.&rdquo;
                  </p>
                  <p className="text-[11px] text-amber-300">
                    *Tip: Always write &ldquo;isolated system&rdquo; or &ldquo;closed system&rdquo; to secure the 2nd mark.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 5: MATRIC EXAM TIP */}
        <div className="bg-gradient-to-r from-amber-950/60 via-[#1F1700] to-black border-2 border-[#FFD400] rounded-3xl p-6 sm:p-7 shadow-[0_0_25px_rgba(255,212,0,0.2)]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFD400] text-black font-black text-xl flex items-center justify-center shrink-0 shadow-md">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-[#FFD400] uppercase tracking-wider">
                  Matric Examiner Secret
                </span>
              </div>
              <h3 className="font-display font-black text-xl sm:text-2xl text-white mb-2">
                Matric Exam Tip: Always Show Direction
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                Always show direction. Use + and - for left/right (or east/west).
              </p>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Remember: in CAPS Physical Sciences Paper 1, momentum and impulse are vectors. If you write an answer like <code className="text-[#FFD400] font-bold">6 kg&middot;m/s</code> without stating <code className="text-[#FFD400] font-bold">east</code>, you lose 1 mark every single time. Always state your sign convention at the top of your calculation (e.g. <em>&ldquo;Take right as positive&rdquo;</em>).
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="pt-6 border-t border-[#262626] flex items-center justify-between">
          <a
            href="/study-guide/physics-grade-12"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate('/study-guide/physics-grade-12', 'studyGuidePhysics');
            }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1A1A1A] hover:bg-[#262626] text-white hover:text-[#FFD400] font-bold text-xs sm:text-sm border border-[#333] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#FFD400]" />
            <span>&larr; Back to Physics Grade 12 Chapters</span>
          </a>

          <a
            href="/study-guide"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate('/study-guide', 'studyGuide');
            }}
            className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            All Study Guides
          </a>
        </div>

      </div>
    </div>
  );
};

export default StudyGuideChapterPage;
