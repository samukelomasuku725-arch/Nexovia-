import React from 'react';
import { useLearning } from '../../context/LearningContext';
import { useTranslation } from '../../i18n/I18nContext';
import { APP_CONFIG } from '../../config/brand';

export const Footer: React.FC = () => {
  const { setCurrentTab, setIsPwaPromptOpen } = useLearning();
  const { t } = useTranslation();

  return (
    <footer className="mt-20 border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100 dark:border-slate-900">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-5 h-5 rounded-md bg-slate-900 dark:bg-amber-500 text-amber-400 dark:text-slate-950 flex items-center justify-center font-bold text-xs">
                ✦
              </span>
              <span className="font-display text-lg font-bold text-slate-900 dark:text-white">
                {APP_CONFIG.appName}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              "{APP_CONFIG.tagline}"
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
          <p>© {new Date().getFullYear()} {APP_CONFIG.appName}. {t('allRightsReserved')}</p>
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span>Grade R – University</span>
            <span aria-hidden="true">·</span>
            <span>11 SA Languages</span>
            <span aria-hidden="true">·</span>
            <span>CAPS & TVET Aligned</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

