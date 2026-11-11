/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN (PTY) LTD - ABOUT US PAGE (/about)
 * 
 * Design:
 * - Clean, white background
 * - Black text
 * - Mkhuhlu village banner at top (3 rural learners with phones)
 * 
 * Sections (Numbers strictly preserved as requested):
 * - [Section 1 - Who We Are]
 *   Headline: Built in Mkhuhlu, For Every Learner in South Africa
 * - [Section 2 - Our Story - use text I will provide in next message]
 * - [Section 3 - What We Do]
 * - [Section 4 - Why Mother Tongue Matters]
 * - [Section 5 - Compliance & Ownership]
 * 
 * Footer trust bar stays at very bottom of this page.
 */

import React from 'react';
import {
  ArrowLeft,
  MapPin,
  ShieldCheck,
  Award,
  Globe,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Users,
  GraduationCap,
  Briefcase,
  Layers,
  ArrowRight,
  Heart
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { APP_CONFIG } from '../../config/brand';

export const AboutUsView: React.FC = () => {
  const { setCurrentTab, setActiveLearningLanguage } = useLearning();

  const handleStartInLang = (langCode: 'ts' | 'ss' | 'en') => {
    setActiveLearningLanguage(langCode);
    setCurrentTab('learn');
    if (typeof window !== 'undefined') {
      window.history.pushState({ tab: 'learn', lang: langCode }, '', `/learn?lang=${langCode}`);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20 md:pb-12 transition-colors">
      
      {/* Top Header / Breadcrumb Bar */}
      <div className="bg-slate-50 border-b border-slate-200 sticky top-0 z-20 backdrop-blur-md bg-slate-50/95">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setCurrentTab('home');
                if (typeof window !== 'undefined') {
                  window.history.pushState({}, '', '/');
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer"
              aria-label="Back to Home"
            >
              <ArrowLeft className="w-4 h-4 text-slate-700" />
              <span>Back to Home</span>
            </button>
            <div className="h-4 w-px bg-slate-300 hidden sm:block" />
            <span className="text-xs font-semibold text-slate-600 hidden sm:inline">
              About Us · NEXOVIAN (PTY) LTD
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
              Oakley, Mpumalanga
            </span>
          </div>
        </div>
      </div>

      {/* TOP BANNER: Oakley Village Banner (3 rural learners with phones) */}
      <section aria-label="Oakley Village Banner" className="relative w-full bg-slate-950 overflow-hidden">
        <div className="relative h-64 sm:h-80 md:h-96 lg:h-[420px] w-full">
          <img
            src="/src/assets/images/mkhuhlu_rural_learners_1792744372735.jpg"
            alt="Three rural South African learners with smartphones smiling in Oakley village, Mpumalanga"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          {/* Subtle gradient vignette to keep text legible */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

          {/* Banner Overlaid Caption */}
          <div className="absolute bottom-6 left-4 sm:left-8 right-4 sm:right-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-mono mb-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Oakley, Bushbuckridge · Mpumalanga, South Africa</span>
            </div>
            <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              About NEXOVIAN
            </h1>
            <p className="text-xs sm:text-base text-slate-200 mt-1 max-w-2xl font-normal leading-relaxed">
              Empowering South Africa&apos;s youth with cutting-edge AI learning in their mother tongue.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-14 sm:space-y-20">

        {/* ========================================================= */}
        {/* [Section 1 - Who We Are] */}
        {/* ========================================================= */}
        <section id="section-1" aria-label="Section 1 - Who We Are" className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 font-mono">
              [Section 1 - Who We Are]
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Built in Oakley, For Every Learner in South Africa
          </h2>

          <div className="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-4">
            <p className="font-medium text-slate-900 text-base sm:text-lg">
              <strong>NEXOVIAN (PTY) LTD</strong> is Mpumalanga&apos;s first homegrown artificial intelligence educational technology enterprise, founded and rooted in Oakley (Bushbuckridge Municipality), Mpumalanga.
            </p>
            <p>
              We are a <strong>100% Black Owned, 100% Youth Owned, and 100% Rural Owned</strong> company operating at <strong>B-BBEE Level 1 (135% procurement recognition)</strong>. We build next-generation educational technologies tailored specifically for South African students across the complete academic continuum:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 list-none pl-0 mt-4">
              <li className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>CAPS Grades 4–12</span>
                </div>
                <p className="text-xs text-slate-600">Foundation, Intermediate, Senior &amp; FET phases aligned with DBE syllabus.</p>
              </li>
              <li className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>TVET Colleges (N1–N6)</span>
                </div>
                <p className="text-xs text-slate-600">Engineering studies, Business NATED programmes &amp; NC(V) certifications.</p>
              </li>
              <li className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>University Preparation</span>
                </div>
                <p className="text-xs text-slate-600">Higher education transition, calculus, physical sciences, and academic skills.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* ========================================================= */}
        {/* [Section 2 - Our Story - use text I will provide in next message] */}
        {/* ========================================================= */}
        <section id="section-2" aria-label="Section 2 - Our Story" className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 font-mono">
              [Section 2 - Our Story - use text I will provide in next message]
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
            Our Story
          </h2>

          <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/50 border-2 border-dashed border-amber-300/80 space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <Heart className="w-4 h-4 text-amber-600 fill-amber-500" />
              <span>Founder &amp; Community Journey</span>
            </div>
            <p className="text-sm sm:text-base text-slate-800 italic leading-relaxed">
              [Section 2 - Our Story: Standing by for your story text in your next message. This section is primed and formatted to seamlessly receive your exact wording, founder history, and community milestones from Oakley.]
            </p>
            <div className="pt-2 text-xs text-amber-800 font-medium">
              Ready to insert: Send your story narrative and it will be typeset here immediately.
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* [Section 3 - What We Do] */}
        {/* ========================================================= */}
        <section id="section-3" aria-label="Section 3 - What We Do" className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 font-mono">
              [Section 3 - What We Do]
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
            What We Do
          </h2>

          <div className="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              NEXOVIAN bridges the historical resource gap in South African education by pairing world-class artificial intelligence with verified South African national curriculum frameworks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose mt-6">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h3 className="font-bold text-base text-slate-950">
                  STEM in 11 Official Languages
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We teach Mathematics, Physical Sciences, Life Sciences, and Accounting in all 11 official South African languages, featuring specialized native engines for Xitsonga and siSwati.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h3 className="font-bold text-base text-slate-950">
                  24/7 Socratic AI Tutor
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Our Socratic mentor doesn&apos;t just spit out answers—it asks guiding questions, diagnoses conceptual gaps, provides step-by-step breakdowns, and adapts to each student&apos;s pace.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h3 className="font-bold text-base text-slate-950">
                  Interactive Science Simulations
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Hands-on digital laboratories—such as Ohm&apos;s Law circuit simulators, chemical reaction balancers, and vector visualizers—let students experiment directly on any smartphone.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <h3 className="font-bold text-base text-slate-950">
                  Voice-to-Document &amp; Scan &amp; Learn
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Learners can speak their thoughts in their home language to create academic study notes, or snap a photo of a textbook problem to receive structured curriculum solutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* [Section 4 - Why Mother Tongue Matters] */}
        {/* ========================================================= */}
        <section id="section-4" aria-label="Section 4 - Why Mother Tongue Matters" className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 font-mono">
              [Section 4 - Why Mother Tongue Matters]
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
            Why Mother Tongue Matters
          </h2>

          <div className="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              Decades of global and South African educational research (including UNESCO and DBE foundational studies) consistently show that students grasp complex STEM concepts significantly faster and deeper when introduced in their primary language.
            </p>
            <p>
              When a Grade 10 student in Oakley attempts to master Ohm&apos;s Law or quadratic factorisation while simultaneously struggling with English linguistic hurdles, cognitive capacity is divided. By explaining scientific principles first in <strong>Xitsonga</strong> or <strong>siSwati</strong> alongside standard English terminology, NEXOVIAN achieves three breakthroughs:
            </p>

            <div className="space-y-3 not-prose mt-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  A
                </div>
                <div>
                  <h4 className="font-bold text-slate-950 text-sm">Eliminates Cognitive Friction</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    Learners focus 100% of their mental bandwidth on the physics or mathematical logic, rather than decoding unfamiliar second-language vocabulary.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  B
                </div>
                <div>
                  <h4 className="font-bold text-slate-950 text-sm">Bilingual Examination Mastery</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    Every native explanation is paired with official DBE English curriculum terms, preparing students to excel in standardized national matric and TVET exams.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  C
                </div>
                <div>
                  <h4 className="font-bold text-slate-950 text-sm">Cultural Dignity in Modern Technology</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    Affirms that indigenous African languages are vibrant, viable mediums for high-level computer science, quantum physics, and mathematical inquiry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* [Section 5 - Compliance & Ownership] */}
        {/* ========================================================= */}
        <section id="section-5" aria-label="Section 5 - Compliance & Ownership" className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-300 font-mono">
              [Section 5 - Compliance & Ownership]
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
            Compliance &amp; Ownership
          </h2>

          <div className="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              NEXOVIAN (PTY) LTD is structured to adhere to all South African statutory, corporate governance, and public procurement standards:
            </p>

            {/* Official Credentials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 not-prose mt-6">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                  Registered Legal Entity
                </span>
                <p className="font-bold text-slate-950 text-base">
                  NEXOVIAN (PTY) LTD
                </p>
                <span className="text-xs text-slate-600 block">
                  Private Enterprise registered under CIPC South Africa
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                  CIPC Registration Number
                </span>
                <p className="font-mono font-bold text-slate-950 text-base">
                  2026/845572/07
                </p>
                <span className="text-xs text-slate-600 block">
                  Official Companies and Intellectual Property Commission
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                  B-BBEE Status &amp; Procurement
                </span>
                <p className="font-bold text-emerald-800 text-base">
                  Level 1 Contributor (135%)
                </p>
                <span className="text-xs text-slate-600 block">
                  Maximum preferential procurement recognition
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                  Ownership Demographics
                </span>
                <p className="font-bold text-slate-950 text-base">
                  100% Black · 100% Youth · 100% Rural
                </p>
                <span className="text-xs text-slate-600 block">
                  Exclusively owned and led by rural South African youth
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                  Operational Headquarters
                </span>
                <p className="font-bold text-slate-950 text-base">
                  Oakley, Mpumalanga
                </p>
                <span className="text-xs text-slate-600 block">
                  Bushbuckridge Local Municipality · Ehlanzeni District
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                  Curriculum Frameworks
                </span>
                <p className="font-bold text-slate-950 text-base">
                  CAPS &amp; DHET Aligned
                </p>
                <span className="text-xs text-slate-600 block">
                  Department of Basic Education &amp; Higher Education standards
                </span>
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleStartInLang('ts')}
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-transform active:scale-95 cursor-pointer"
              >
                Start Learning in Xitsonga
              </button>
              <button
                onClick={() => handleStartInLang('ss')}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs sm:text-sm transition-transform active:scale-95 cursor-pointer"
              >
                Sungula Ku Funda hi siSwati
              </button>
              <button
                onClick={() => handleStartInLang('en')}
                className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Start in English
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default AboutUsView;
