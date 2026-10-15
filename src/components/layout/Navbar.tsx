import React, { useState, useRef, useEffect } from 'react';
import { Search, Download, Sun, Moon, Sparkles, Camera, Compass, BookOpen, User, Globe, Check, ChevronDown, Award, ArrowRight, Mic, MoreHorizontal, Layers, TrendingUp } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../i18n/I18nContext';
import { APP_CONFIG } from '../../config/brand';
import { XitsongaPhrasebookModal } from '../language/XitsongaPhrasebookModal';
import { MoreToolsModal } from './MoreToolsModal';

export const Navbar: React.FC = () => {
  const {
    currentTab,
    setCurrentTab,
    setIsSearchOpen,
    setIsPwaPromptOpen,
    theme,
    toggleTheme,
    userProgress,
    activeTrack,
    openLesson,
    activeLearningLanguage,
    setActiveLearningLanguage
  } = useLearning();

  const { isAuthenticated, user, setIsAuthModalOpen, setAuthModalMode } = useAuth();
  const { t, language, setLanguage, languages, currentLanguageInfo } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isPhrasebookOpen, setIsPhrasebookOpen] = useState(false);
  const [isMoreToolsOpen, setIsMoreToolsOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close language dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Find next unfinished lesson
  const getNextLessonId = () => {
    for (const mod of activeTrack.modules) {
      for (const lesson of mod.lessons) {
        if (!userProgress.completedLessonIds.includes(lesson.id)) {
          return lesson.id;
        }
      }
    }
    return activeTrack.modules[0]?.lessons[0]?.id;
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 md:h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            aria-label={`${APP_CONFIG.appName} Home`}
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-amber-500 text-amber-400 dark:text-slate-950 flex items-center justify-center font-bold text-lg shadow-sm transition-transform group-hover:scale-105 shrink-0">
              ✦
            </div>
            <div>
              <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 block leading-tight truncate max-w-[180px] sm:max-w-none">
                {APP_CONFIG.appName}
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links (Hidden on mobile, bottom tab bar takes over) */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium text-slate-600 dark:text-slate-400" aria-label="Main Navigation">
          <button
            onClick={() => setCurrentTab('home')}
            className={`transition-colors hover:text-slate-900 dark:hover:text-white py-1 whitespace-nowrap ${
              currentTab === 'home' || currentTab === 'dashboard'
                ? 'text-slate-900 dark:text-white font-semibold border-b-2 border-amber-500'
                : ''
            }`}
          >
            {t('navHome')}
          </button>

          <button
            onClick={() => setCurrentTab('learn')}
            className={`flex items-center gap-1.5 transition-colors hover:text-slate-900 dark:hover:text-white py-1 whitespace-nowrap ${
              currentTab === 'learn' || currentTab === 'school' || currentTab === 'tvet' || currentTab === 'higherEd'
                ? 'text-slate-900 dark:text-white font-semibold border-b-2 border-amber-500'
                : ''
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>Learn</span>
          </button>

          <button
            onClick={() => setCurrentTab('tutor')}
            className={`flex items-center gap-1.5 transition-colors hover:text-slate-900 dark:hover:text-white py-1 whitespace-nowrap ${
              currentTab === 'tutor'
                ? 'text-slate-900 dark:text-white font-semibold border-b-2 border-amber-500'
                : ''
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Ask Nexovia AI</span>
          </button>

          <button
            onClick={() => setCurrentTab('academicVoice')}
            className={`flex items-center gap-1.5 transition-colors hover:text-slate-900 dark:hover:text-white py-1 whitespace-nowrap ${
              currentTab === 'academicVoice'
                ? 'text-slate-900 dark:text-white font-semibold border-b-2 border-amber-500'
                : ''
            }`}
          >
            <Mic className="w-4 h-4 text-amber-500" />
            <span>Voice-to-Document</span>
          </button>

          <button
            onClick={() => setCurrentTab('progress')}
            className={`flex items-center gap-1.5 transition-colors hover:text-slate-900 dark:hover:text-white py-1 whitespace-nowrap ${
              currentTab === 'progress'
                ? 'text-slate-900 dark:text-white font-semibold border-b-2 border-amber-500'
                : ''
            }`}
          >
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span>My Progress</span>
          </button>

          <button
            onClick={() => setIsMoreToolsOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="More practice tools, exams, and settings"
          >
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <span>More</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions + Language selector */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Xitsonga Hub Shortcut when Xitsonga is active */}
          {language === 'ts' && (
            <button
              onClick={() => setIsPhrasebookOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 transition-colors shadow-2xs"
              title="Open Nexovia Xitsonga Language Engine & Phrasebook"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Xitsonga Engine</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </button>
          )}

          {/* 11 South African Languages Selector */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 text-xs font-medium border border-slate-200/80 dark:border-slate-800 transition-colors"
              title="Select one of South Africa's 11 official languages"
              aria-expanded={isLangOpen}
            >
              <Globe className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="font-semibold">{currentLanguageInfo.nativeName}</span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50 max-h-80 overflow-y-auto">
                <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 mb-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    11 Official SA Languages
                  </span>
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setActiveLearningLanguage(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors ${
                      (activeLearningLanguage || language) === lang.code
                        ? 'text-amber-700 dark:text-amber-400 font-bold bg-amber-50/60 dark:bg-slate-800/60'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold">{lang.nativeName}</span>
                        {lang.code === 'ts' && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-400 text-slate-950 uppercase">
                            Native Engine
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400">{lang.name}</span>
                    </div>
                    {language === lang.code && <Check className="w-4 h-4 text-amber-500" />}
                  </button>
                ))}

                <div className="pt-1.5 mt-1 border-t border-slate-100 dark:border-slate-800 px-2">
                  <button
                    onClick={() => {
                      setIsLangOpen(false);
                      setIsPhrasebookOpen(true);
                    }}
                    className="w-full py-1.5 px-2 text-left rounded-lg text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-between"
                  >
                    <span>Browse Xitsonga Phrasebook (140 Entries · 80 Verified Native)</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-2 sm:px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-xs font-medium"
            aria-label={t('navSearch')}
          >
            <Search className="w-4 h-4" />
            <span className="hidden lg:inline">{t('navSearch')}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* User Account Trigger */}
          {isAuthenticated && user ? (
            <button
              onClick={() => setCurrentTab('profile')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-semibold"
              title={`Logged in as ${user.name}`}
            >
              <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-[11px]">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden xl:inline truncate max-w-[90px]">{user.name.split(' ')[0]}</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setAuthModalMode('login');
                setIsAuthModalOpen(true);
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-colors border border-slate-200 dark:border-slate-800"
            >
              <User className="w-3.5 h-3.5" />
              <span>{t('navLogin')}</span>
            </button>
          )}

          {/* Primary Action CTA: Launch AI Tutor */}
          <button
            onClick={() => setCurrentTab('tutor')}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all active:scale-95 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('navAiTutor')}</span>
          </button>
        </div>
      </div>

      {/* Xitsonga Phrasebook Modal */}
      <XitsongaPhrasebookModal
        isOpen={isPhrasebookOpen}
        onClose={() => setIsPhrasebookOpen(false)}
      />

      {/* Secondary Tools & Options Modal */}
      <MoreToolsModal
        isOpen={isMoreToolsOpen}
        onClose={() => setIsMoreToolsOpen(false)}
        onOpenPhrasebook={() => setIsPhrasebookOpen(true)}
        onOpenProfile={() => setCurrentTab('profile')}
      />
    </header>
  );
};

