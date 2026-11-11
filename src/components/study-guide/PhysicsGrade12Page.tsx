/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN STUDY GUIDE - PHYSICS GRADE 12 (/study-guide/physics-grade-12)
 * SA CAPS Grade 12 Only
 */

import React from 'react';
import { ArrowLeft, ChevronRight, Zap, BookOpen, Clock, FileText, CheckCircle2 } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export interface PhysicsChapter {
  id: string;
  slug: string;
  chapterNumber: number;
  title: string;
  topic: string;
  marksEst: string;
  isAvailable: boolean;
  summary: string;
}

export const PHYSICS_CHAPTERS: PhysicsChapter[] = [
  {
    id: 'phys-1',
    slug: 'momentum',
    chapterNumber: 1,
    title: 'Momentum & Impulse',
    topic: 'Mechanics',
    marksEst: '15-20 Marks',
    isAvailable: true,
    summary: 'Conservation of linear momentum, impulse, elastic vs inelastic collisions and Newton’s second law in terms of momentum.'
  },
  {
    id: 'phys-2',
    slug: 'vertical-projectile-motion',
    chapterNumber: 2,
    title: 'Vertical Projectile Motion',
    topic: 'Mechanics',
    marksEst: '15-20 Marks',
    isAvailable: true,
    summary: 'Equations of motion in 1D, position-time, velocity-time, and acceleration-time graphs for objects thrown upwards and downwards.'
  },
  {
    id: 'phys-3',
    slug: 'work-energy-power',
    chapterNumber: 3,
    title: 'Work, Energy & Power',
    topic: 'Mechanics',
    marksEst: '15-18 Marks',
    isAvailable: true,
    summary: 'Work-energy theorem, conservative and non-conservative forces, conservation of mechanical energy, and average power calculations.'
  },
  {
    id: 'phys-4',
    slug: 'electrostatics',
    chapterNumber: 4,
    title: 'Electrostatics',
    topic: 'Fields',
    marksEst: '15-18 Marks',
    isAvailable: true,
    summary: 'Coulomb’s Law, electric field strength, field line diagrams, and net electrostatic force on multiple point charges.'
  },
  {
    id: 'phys-5',
    slug: 'electric-circuits',
    chapterNumber: 5,
    title: 'Electric Circuits',
    topic: 'Electricity',
    marksEst: '18-22 Marks',
    isAvailable: true,
    summary: 'Ohm’s law, internal resistance, emf, series-parallel resistor networks, power dissipation, and lost volts.'
  },
  {
    id: 'phys-6',
    slug: 'electrodynamics',
    chapterNumber: 6,
    title: 'Electrodynamics',
    topic: 'Electricity & Magnetism',
    marksEst: '12-15 Marks',
    isAvailable: true,
    summary: 'Generators vs motors, AC circuits, root mean square (rms) current and voltage, Faraday’s law, and Fleming’s rules.'
  },
  {
    id: 'phys-7',
    slug: 'doppler-effect',
    chapterNumber: 7,
    title: 'Doppler Effect',
    topic: 'Waves & Sound',
    marksEst: '10-12 Marks',
    isAvailable: true,
    summary: 'Apparent frequency shifts for sound and light, redshift/blueshift in astronomy, and medical ultrasound applications.'
  },
  {
    id: 'phys-8',
    slug: 'photoelectric-effect',
    chapterNumber: 8,
    title: 'Photoelectric Effect',
    topic: 'Matter & Materials',
    marksEst: '10-14 Marks',
    isAvailable: true,
    summary: 'Photon energy, work function, threshold frequency, maximum kinetic energy of photoelectrons, and dual nature of light.'
  }
];

export const PhysicsGrade12Page: React.FC = () => {
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
            href="/study-guide"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate('/study-guide', 'studyGuide');
            }}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-300 hover:text-[#FFD400] transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4 text-[#FFD400]" />
            <span>&larr; Back to Study Guides</span>
          </a>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FFD400]/15 text-[#FFD400] border border-[#FFD400]/40">
              Grade 12 Physical Sciences • Paper 1
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1A1A] border border-[#FFD400]/40 mb-3 text-xs font-mono text-[#FFD400]">
            <Zap className="w-3.5 h-3.5 text-[#FFD400]" />
            <span>SA CAPS Grade 12 Syllabus</span>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight flex flex-wrap items-center gap-3">
            <span>⚡ Physics Grade 12</span>
            <span className="text-xs sm:text-sm font-mono font-bold px-3 py-1 bg-[#FFD400] text-black rounded-xl">
              8 Core Chapters
            </span>
          </h1>

          <p className="mt-2 text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Select a chapter below for high-yield revision summaries, official CAPS formulas, worked examples showing full mark-allocation, and exam tips.
          </p>
        </div>

        {/* Chapters List */}
        <div className="space-y-3 sm:space-y-4">
          {PHYSICS_CHAPTERS.map((ch) => {
            const chapterUrl = `/study-guide/physics-grade-12/${ch.slug}`;
            const isFeatured = ch.slug === 'momentum';

            return (
              <div
                key={ch.id}
                onClick={() => handleNavigate(chapterUrl, 'studyGuideChapter')}
                className={`group bg-[#141414] hover:bg-[#1A1A1A] border-2 ${
                  isFeatured ? 'border-[#FFD400]/70 shadow-[0_0_20px_rgba(255,212,0,0.15)]' : 'border-[#262626] hover:border-[#FFD400]/50'
                } rounded-2xl p-4 sm:p-5 transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FFD400] text-black font-black flex items-center justify-center text-sm shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    {ch.chapterNumber}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-[#FFD400] transition-colors">
                        Chapter {ch.chapterNumber}: {ch.title}
                      </h2>
                      {isFeatured && (
                        <span className="px-2 py-0.5 rounded-full bg-[#FFD400] text-black font-bold text-[10px] uppercase font-mono shadow-xs">
                          Full Template Active
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 max-w-2xl leading-relaxed">
                      {ch.summary}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] font-mono text-slate-400">
                      <span className="text-[#FFD400]">{ch.topic}</span>
                      <span>&bull;</span>
                      <span>{ch.marksEst} in Finals</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
                  <span className="text-xs font-bold text-[#FFD400] group-hover:underline">
                    Study Chapter
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#262626] group-hover:bg-[#FFD400] text-slate-300 group-hover:text-black flex items-center justify-center transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PhysicsGrade12Page;
