/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN GROUP - MISSION, VISION & CORE VALUES SECTION
 * Modern, clean, and professional for nexovian.group
 * Designed for all South African learners, optimized for mobile & low-resource devices.
 */

import React from 'react';
import { Target, Eye, Smartphone, Globe2, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export const MissionVisionSection: React.FC = () => {
  const coreValues = [
    {
      id: 'accessibility',
      number: '01',
      title: 'Accessibility First',
      description: "If it doesn't work on a cheap phone, it doesn't work.",
      icon: Smartphone,
      accentColor: 'text-[#3B82F6]',
      badgeBg: 'bg-blue-50 text-[#3B82F6] border-blue-100'
    },
    {
      id: 'language',
      number: '02',
      title: 'Language is Power',
      description: 'Teach in the language a child dreams in.',
      icon: Globe2,
      accentColor: 'text-[#3B82F6]',
      badgeBg: 'bg-blue-50 text-[#3B82F6] border-blue-100'
    },
    {
      id: 'affordable',
      number: '03',
      title: 'Affordable Forever',
      description: 'Education must never be a luxury.',
      icon: ShieldCheck,
      accentColor: 'text-[#3B82F6]',
      badgeBg: 'bg-blue-50 text-[#3B82F6] border-blue-100'
    },
    {
      id: 'built-sa',
      number: '04',
      title: 'Built for SA',
      description: 'Designed for load shedding, low data, and real classrooms.',
      icon: Zap,
      accentColor: 'text-[#3B82F6]',
      badgeBg: 'bg-blue-50 text-[#3B82F6] border-blue-100'
    }
  ];

  return (
    <section
      id="mission-and-vision"
      aria-label="Mission and Vision"
      className="w-full bg-[#0F172A] text-slate-100 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 relative overflow-hidden transition-colors border-b border-slate-800"
    >
      {/* Subtle Ambient Glow for Nexovian Blue #3B82F6 Accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/4 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl pointer-events-none -z-0"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-0"
      />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-[#3B82F6]/40 text-[#3B82F6] text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#3B82F6]" />
            <span>nexovian.group · Purpose &amp; Impact</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            Mission &amp; Vision
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-400 font-normal leading-relaxed">
            Building Africa&apos;s most accessible multilingual intelligence — bridging classrooms from Mpumalanga to the world.
          </p>
        </div>

        {/* 2 LARGE CARDS SIDE-BY-SIDE ON DESKTOP, STACKED ON MOBILE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Card 1: OUR MISSION */}
          <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-slate-200/80 hover:shadow-2xl hover:border-[#3B82F6]/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#3B82F6] to-cyan-400" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-[#3B82F6] flex items-center justify-center group-hover:bg-[#3B82F6] group-hover:text-white transition-all duration-300 shadow-sm">
                    <Target className="w-6 h-6 stroke-[2.25]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest text-[#3B82F6] block">
                      Purpose
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                      OUR MISSION
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full hidden sm:inline-block">
                  01 / IMPACT
                </span>
              </div>

              {/* Exact Mission Content */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-700 font-medium leading-relaxed sm:leading-loose">
                &ldquo;To make quality education affordable and accessible to every learner in South Africa — from Grade 4 to University — in all 11 official languages, using AI to teach, explain, and guide, no matter where you live in Mpumalanga, Mbombela, Bushbuckridge, or beyond.&rdquo;
              </p>
            </div>

            {/* Bottom Meta Pill for cheap phone reassurance */}
            <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Grade 4 to University</span>
              </span>
              <span className="font-mono text-[#3B82F6] font-semibold">11 Official Languages</span>
            </div>
          </div>

          {/* Card 2: OUR VISION */}
          <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-slate-200/80 hover:shadow-2xl hover:border-[#3B82F6]/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 to-[#3B82F6]" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-[#3B82F6] flex items-center justify-center group-hover:bg-[#3B82F6] group-hover:text-white transition-all duration-300 shadow-sm">
                    <Eye className="w-6 h-6 stroke-[2.25]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest text-[#3B82F6] block">
                      Future
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                      OUR VISION
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full hidden sm:inline-block">
                  02 / HORIZON
                </span>
              </div>

              {/* Exact Vision Content */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-700 font-medium leading-relaxed sm:leading-loose">
                &ldquo;To become South Africa&apos;s #1 multilingual AI learning group — where no child is left behind because of language, location, or money. A platform where a learner can scan homework with a camera, get instant AI help, and pass with confidence.&rdquo;
              </p>
            </div>

            {/* Bottom Meta Pill */}
            <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                <span>Multimodal Camera AI</span>
              </span>
              <span className="font-mono text-emerald-600 font-semibold">Zero Learner Left Behind</span>
            </div>
          </div>
        </div>

        {/* THIRD FULL-WIDTH SECTION: OUR CORE VALUES */}
        <div className="pt-4 sm:pt-6 space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <div className="text-[11px] font-mono font-bold text-[#3B82F6] uppercase tracking-wider mb-1">
                Guiding Principles · nexovian.group
              </div>
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                OUR CORE VALUES
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md">
              Four non-negotiable commitments engineered for real South African conditions, load shedding, and affordable access.
            </p>
          </div>

          {/* 4 Small Cards in a Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {coreValues.map((value) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={value.id}
                  className="bg-white text-slate-900 rounded-2xl p-5 sm:p-6 shadow-md border border-slate-200/80 hover:shadow-xl hover:border-[#3B82F6] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Icon & Number */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#3B82F6] flex items-center justify-center group-hover:bg-[#3B82F6] group-hover:text-white transition-all duration-300 shadow-2xs">
                        <IconComponent className="w-5 h-5 stroke-[2.25]" />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-400">
                        {value.number}
                      </span>
                    </div>

                    {/* Value Title */}
                    <h4 className="font-display text-base sm:text-lg font-bold text-slate-950 mb-2 group-hover:text-[#3B82F6] transition-colors">
                      {value.title}
                    </h4>

                    {/* Value Exact Description */}
                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                      {value.description}
                    </p>
                  </div>

                  {/* Micro Footer Indicator */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>NEXOVIAN Standard</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
