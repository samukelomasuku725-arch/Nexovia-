/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN STUDY GUIDE - MAIN HUB PAGE (/study-guide)
 * SA CAPS Grade 12 Only
 */

import React from 'react';
import { ArrowLeft, Sparkles, BookOpen, ChevronRight, Zap, Dna, ShieldCheck } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export const StudyGuideHubPage: React.FC = () => {
  const { setCurrentTab } = useLearning();

  const handleNavigate = (path: string, tab: any) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    setCurrentTab(tab);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans antialiased pb-20">
      {/* Top Breadcrumb & Return Bar */}
      <div className="bg-[#141414] border-b border-[#262626] px-4 py-3 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate('/', 'landing');
            }}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-300 hover:text-[#FFD400] transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4 text-[#FFD400]" />
            <span>&larr; Back to Home</span>
          </a>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FFD400]/15 text-[#FFD400] border border-[#FFD400]/40">
              SA CAPS Grade 12
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        {/* Title Header with Yellow Highlight / Badge */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1A1A] border border-[#FFD400]/50 mb-4 shadow-[0_0_15px_rgba(255,212,0,0.2)]">
            <span className="text-base">📚</span>
            <span className="text-xs font-mono font-bold text-[#FFD400] uppercase tracking-wider">
              Official Matric Revision
            </span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            <span className="inline-block px-3 py-1 bg-[#FFD400] text-black rounded-2xl mr-2 rotate-[-1deg] shadow-[0_0_20px_rgba(255,212,0,0.4)]">
              Nexovian
            </span>
            <span>Study Guide</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            High-yield, CAPS-aligned Grade 12 study guides designed specifically for South African Matric learners. Master key definitions, formulas, and exam tips.
          </p>
        </div>

        {/* 2 Main Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {/* Card 1: Physics Grade 12 */}
          <div
            onClick={() => handleNavigate('/study-guide/physics-grade-12', 'studyGuidePhysics')}
            className="group relative bg-[#141414] hover:bg-[#181818] border-2 border-[#262626] hover:border-[#FFD400] rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(255,212,0,0.25)] cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-[#FFD400] text-black flex items-center justify-center font-black text-2xl shadow-[0_0_15px_rgba(255,212,0,0.4)] group-hover:scale-105 transition-transform">
                  ⚡
                </div>
                <span className="text-xs font-mono font-bold text-[#FFD400] bg-[#FFD400]/10 border border-[#FFD400]/30 px-3 py-1 rounded-full uppercase">
                  Paper 1 • 150 Marks
                </span>
              </div>

              <h2 className="font-display font-black text-2xl sm:text-3xl text-white group-hover:text-[#FFD400] transition-colors mb-3">
                Physics Grade 12
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm font-medium mb-6">
                Mechanics &bull; Electricity &bull; Waves &bull; Matter
              </p>

              <div className="space-y-2 mb-6">
                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD400]" />
                  <span>8 Core Chapters (Momentum, Projectiles, Circuits &amp; more)</span>
                </div>
                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD400]" />
                  <span>Formulas, Worked Examples &amp; Matric Exam Tips</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#262626] flex items-center justify-between text-xs sm:text-sm font-bold text-[#FFD400]">
              <span>Open Physics Guide</span>
              <div className="w-8 h-8 rounded-full bg-[#FFD400] text-black flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 2: Life Sciences Grade 12 */}
          <div
            onClick={() => handleNavigate('/study-guide/life-sciences-grade-12', 'studyGuideLifeSciences')}
            className="group relative bg-[#141414] hover:bg-[#181818] border-2 border-[#262626] hover:border-[#FFD400] rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(255,212,0,0.25)] cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-[#007A4D] text-white flex items-center justify-center font-black text-2xl shadow-[0_0_15px_rgba(0,122,77,0.4)] group-hover:scale-105 transition-transform">
                  🧬
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full uppercase">
                  Paper 1 &amp; 2 • CAPS
                </span>
              </div>

              <h2 className="font-display font-black text-2xl sm:text-3xl text-white group-hover:text-[#FFD400] transition-colors mb-3">
                Life Sciences Grade 12
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm font-medium mb-6">
                DNA &bull; Meiosis &bull; Genetics &bull; Evolution
              </p>

              <div className="space-y-2 mb-6">
                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>5 Core Strands (Protein synthesis, Meiosis, Genetics, Evolution)</span>
                </div>
                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Biological Diagrams, Key Terminology &amp; Past Paper Questions</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#262626] flex items-center justify-between text-xs sm:text-sm font-bold text-[#FFD400]">
              <span>Open Life Sciences Guide</span>
              <div className="w-8 h-8 rounded-full bg-[#FFD400] text-black flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* CAPS Curriculum Guarantee Footer */}
        <div className="mt-14 max-w-xl mx-auto p-4 rounded-2xl bg-[#141414] border border-white/10 text-center text-xs text-slate-400 flex items-center justify-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#FFD400] shrink-0" />
          <span>Strictly South African CAPS Grade 12 curriculum. No international or irrelevant syllabus.</span>
        </div>
      </div>
    </div>
  );
};

export default StudyGuideHubPage;
