import React from 'react';
import { useLearning } from '../../context/LearningContext';
import { useTranslation } from '../../i18n/I18nContext';
import { APP_CONFIG } from '../../config/brand';
import { LogoIcon } from '../common/LogoIcon';

export const Footer: React.FC = () => {
  const { setCurrentTab, setIsPwaPromptOpen } = useLearning();
  const { t } = useTranslation();

  return (
    <footer className="mt-20 border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 py-10 pb-20 md:pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100 dark:border-slate-900">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <LogoIcon size={28} className="shrink-0" />
              <span className="font-display text-lg font-black tracking-wide bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                {APP_CONFIG.appName}
              </span>
            </div>
            <p className="text-xs font-medium text-cyan-500/90 dark:text-cyan-400/90 font-mono">
              {APP_CONFIG.tagline}
            </p>
            <p className="text-[11px] text-slate-400 mt-1 max-w-md">
              {APP_CONFIG.cipcNotice}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 sm:gap-6 text-xs font-medium text-slate-600 dark:text-slate-400">
            <button
              onClick={() => setCurrentTab('school')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {t('navSchool')}
            </button>
            <button
              onClick={() => setCurrentTab('tvet')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {t('navTvet')}
            </button>
            <button
              onClick={() => setCurrentTab('higherEd')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {t('navHigherEd')}
            </button>
            <button
              onClick={() => setCurrentTab('tutor')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {t('navAiTutor')}
            </button>
            <button
              onClick={() => setCurrentTab('practice')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {t('navPractice')}
            </button>
            <button
              onClick={() => {
                setCurrentTab('about');
                if (typeof window !== 'undefined') {
                  window.history.pushState({}, '', '/about');
                }
              }}
              className="hover:text-slate-900 dark:hover:text-white transition-colors font-semibold text-emerald-600 dark:text-emerald-400"
            >
              About Us
            </button>
            <button
              onClick={() => setIsPwaPromptOpen(true)}
              className="text-amber-600 dark:text-amber-400 font-semibold hover:underline"
            >
              Install PWA
            </button>
          </div>
        </div>

        {/* Independent Curriculum Disclaimer Notice */}
        <div className="py-4 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed border-b border-slate-100 dark:border-slate-900">
          <p>
            <strong>Curriculum Framework Notice:</strong> {APP_CONFIG.curriculumDisclaimer}
          </p>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} NEXOVIAN (PTY) LTD · Reg: 2026/845572/07 · {t('allRightsReserved')}</p>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>Grade R-University</span>
            <span aria-hidden="true" className="text-slate-400 font-bold">|</span>
            <span>11 SA Languages</span>
            <span aria-hidden="true" className="text-slate-400 font-bold">|</span>
            <span>CAPS & TVET Aligned</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

