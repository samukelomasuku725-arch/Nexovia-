import React from 'react';
import { ArrowRight, School, Briefcase, GraduationCap, Sparkles, Camera, BookOpen, Mic } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useTranslation } from '../../i18n/I18nContext';
import { APP_CONFIG } from '../../config/brand';

export const HeroSection: React.FC = () => {
  const { setCurrentTab } = useLearning();
  const { t } = useTranslation();

  return (
    <section className="relative pt-4 sm:pt-8 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Grid: Value Proposition + Primary Hero Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Core Message & Call to Action (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Clean unboxed editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-3">
              <span>{APP_CONFIG.appName}</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span>{t('heroBadgePhase1')}</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span>11 SA Languages</span>
            </div>

            {/* Headline with tagline */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15] text-balance">
              Learn today. <br className="hidden sm:inline" />
              <span className="text-amber-600 dark:text-amber-400 underline decoration-amber-400/40 underline-offset-8">
                Build tomorrow.
              </span>
            </h1>

            {/* Subheading / Description */}
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              {t('heroVision')}
            </p>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
              {t('heroSubtext')}
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setCurrentTab('school')}
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-sm transition-all active:scale-95 whitespace-nowrap"
              >
                <School className="w-4 h-4" />
                <span>{t('pathwaySchoolTitle')} (R–12)</span>
              </button>

              <button
                onClick={() => setCurrentTab('tvet')}
                className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700/80 rounded-xl transition-colors whitespace-nowrap"
              >
                <Briefcase className="w-4 h-4" />
                <span>{t('pathwayTvetTitle')}</span>
              </button>

              <button
                onClick={() => setCurrentTab('higherEd')}
                className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700/80 rounded-xl transition-colors whitespace-nowrap"
              >
                <GraduationCap className="w-4 h-4" />
                <span>{t('pathwayHigherEdTitle')}</span>
              </button>

              <button
                onClick={() => setCurrentTab('scan')}
                className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-amber-950 dark:text-amber-200 bg-amber-400/20 hover:bg-amber-400/30 border border-amber-500/40 rounded-xl transition-all whitespace-nowrap active:scale-95"
              >
                <Camera className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Scan & Learn</span>
              </button>

              <button
                onClick={() => setCurrentTab('tutor')}
                className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700/80 rounded-xl transition-all whitespace-nowrap active:scale-95 border border-slate-200/60 dark:border-slate-700"
              >
                <Mic className="w-4 h-4 text-amber-500" />
                <span>Voice AI Tutor</span>
              </button>
            </div>

            {/* Claim-to-Proof Quantitative Adjacency */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="block font-mono text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                  Grade R–12
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 block">
                  CAPS Framework
                </span>
              </div>
              <div>
                <span className="block font-mono text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                  N1–N6 / L2–L4
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 block">
                  TVET Accredited
                </span>
              </div>
              <div>
                <span className="block font-mono text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                  11 Languages
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 block">
                  Official SA Text
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Dominant Visual Anchor + Interactive Pathway Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/70 dark:border-slate-800 group">
              <img
                src="/src/assets/images/hero_nexovia_students_1790752895958.jpg"
                alt="South African learners collaborating on tablets and textbooks in a bright modern library"
                className="w-full h-64 sm:h-72 lg:h-84 object-cover transform transition-transform duration-500 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent" />

              {/* Floating Overlaid Pathway Quick Access Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-white/20 dark:border-slate-800 text-slate-900 dark:text-slate-100">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                  <span className="font-semibold text-amber-600 dark:text-amber-400">
                    South African Unified Pathway
                  </span>
                  <span>Phase 1 Architecture</span>
                </div>
                <h3 className="text-sm font-bold truncate">
                  Grade R → TVET → University
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed line-clamp-2">
                  Standard curriculum hierarchy with verified syllabus breakdowns and Gemini AI tutoring.
                </p>
                <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentTab('school')}
                    className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    <span>{t('heroExploreBtn')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setCurrentTab('tutor')}
                    className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  >
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>{t('heroTutorBtn')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

