import React, { useState, useRef, useEffect } from 'react';
import { Search, Download, Sun, Moon, Sparkles, Camera, Compass, BookOpen, User, Globe, Check, ChevronDown, Award, ArrowRight, Mic, MoreHorizontal, Layers, TrendingUp, Folder, AlertTriangle, Calculator } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../i18n/I18nContext';
import { APP_CONFIG } from '../../config/brand';
import { XitsongaPhrasebookModal } from '../language/XitsongaPhrasebookModal';
import { MoreToolsModal } from './MoreToolsModal';
import { LogoIcon } from '../common/LogoIcon';

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

  const { isAuthenticated, user, setIsAuthModalOpen, setAuthModalMode, logout } = useAuth();
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
    <header className="sticky top-0 z-50 bg-[#0F0F0F]/95 backdrop-blur-md border-b border-[#262626] transition-colors w-full max-w-full overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 md:h-16 flex items-center justify-between gap-3 w-full max-w-full">
        {/* Zone 1: Futuristic N Logo Mark & Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentTab(isAuthenticated ? 'home' : 'landing')}
            className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
            aria-label={`${APP_CONFIG.appName} Home`}
          >
            {/* LogoIcon: 40x40, rounded 10px, dark #0F0F0F, vibrant #FACC15 yellow glow & circuit lines/brain */}
            <LogoIcon size={40} className="shrink-0 group-hover:scale-105 transition-transform" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-lg sm:text-xl font-black tracking-wider text-white block leading-tight">
                  {APP_CONFIG.appName}
                </span>
                <span className="hidden xl:inline-block w-1.5 h-1.5 rounded-full bg-[#FACC15] animate-pulse shadow-[0_0_8px_#FACC15]" />
              </div>
              <span className="hidden sm:block text-[9.5px] font-mono tracking-tight text-[#FACC15] -mt-0.5 truncate max-w-[210px]">
                The Learning Brain That Grows With You
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: clean text navigation links (Hidden on mobile, bottom tab bar takes over) */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium text-slate-400" aria-label="Main Navigation">
          <button
            onClick={() => setCurrentTab('home')}
            className={`transition-colors hover:text-white py-1 whitespace-nowrap ${
              currentTab === 'home' || currentTab === 'dashboard'
                ? 'text-[#FACC15] font-bold border-b-2 border-[#FACC15] shadow-[0_4px_12px_-4px_rgba(250,204,21,0.5)]'
                : ''
            }`}
          >
            {t('navHome')}
          </button>

          <button
            onClick={() => setCurrentTab('learn')}
            className={`flex items-center gap-1.5 transition-colors hover:text-white py-1 whitespace-nowrap ${
              currentTab === 'learn' || currentTab === 'school' || currentTab === 'tvet' || currentTab === 'higherEd'
                ? 'text-[#FACC15] font-bold border-b-2 border-[#FACC15] shadow-[0_4px_12px_-4px_rgba(250,204,21,0.5)]'
                : ''
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#FACC15]" />
            <span>Learn</span>
          </button>

          <button
            onClick={() => setCurrentTab('papers')}
            className={`flex items-center gap-1.5 transition-colors hover:text-white py-1 whitespace-nowrap ${
              currentTab === 'papers'
                ? 'text-[#FACC15] font-bold border-b-2 border-[#FACC15]'
                : ''
            }`}
          >
            <span className="text-sm">📚</span>
            <span>Past Papers &amp; Memos</span>
          </button>

          {/* Yellow Nexovian Study Guide Button */}
          <a
            href="/study-guide"
            onClick={(e) => {
              e.preventDefault();
              setCurrentTab('studyGuide');
              if (typeof window !== 'undefined') {
                window.history.pushState({}, '', '/study-guide');
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-bold text-xs shadow-md transition-all whitespace-nowrap cursor-pointer transform hover:scale-105 active:scale-95"
          >
            <span>📚</span>
            <span>Nexovian Study Guide</span>
          </a>

          <button
            onClick={() => setCurrentTab('calculator')}
            className={`flex items-center gap-1.5 transition-colors hover:text-white py-1 whitespace-nowrap ${
              currentTab === 'calculator'
                ? 'text-[#FACC15] font-bold border-b-2 border-[#FACC15]'
                : ''
            }`}
          >
            <Calculator className="w-4 h-4 text-[#FACC15]" />
            <span>Math Solver</span>
          </button>

          <button
            onClick={() => setCurrentTab('tutor')}
            className={`flex items-center gap-1.5 transition-colors hover:text-white py-1 whitespace-nowrap ${
              currentTab === 'tutor'
                ? 'text-[#FACC15] font-bold border-b-2 border-[#FACC15] shadow-[0_4px_12px_-4px_rgba(250,204,21,0.5)]'
                : ''
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#FACC15]" />
            <span>Ask Nexovian AI</span>
          </button>

          <button
            onClick={() => setCurrentTab('academicVoice')}
            className={`flex items-center gap-1.5 transition-colors hover:text-white py-1 whitespace-nowrap ${
              currentTab === 'academicVoice'
                ? 'text-[#FACC15] font-bold border-b-2 border-[#FACC15] shadow-[0_4px_12px_-4px_rgba(250,204,21,0.5)]'
                : ''
            }`}
          >
            <Mic className="w-4 h-4 text-[#FACC15]" />
            <span>Voice-to-Document</span>
          </button>

          <button
            onClick={() => setCurrentTab('progress')}
            className={`flex items-center gap-1.5 transition-colors hover:text-white py-1 whitespace-nowrap ${
              currentTab === 'progress'
                ? 'text-[#FACC15] font-bold border-b-2 border-[#FACC15] shadow-[0_4px_12px_-4px_rgba(250,204,21,0.5)]'
                : ''
            }`}
          >
            <TrendingUp className="w-4 h-4 text-[#FACC15]" />
            <span>My Progress</span>
          </button>

          <button
            onClick={() => setCurrentTab('smartNotes')}
            className={`flex items-center gap-1.5 transition-colors hover:text-white py-1 whitespace-nowrap ${
              currentTab === 'smartNotes'
                ? 'text-[#FACC15] font-bold border-b-2 border-[#FACC15]'
                : ''
            }`}
          >
            <Folder className="w-4 h-4 text-[#FACC15]" />
            <span>Smart Notes</span>
          </button>

          <button
            onClick={() => setCurrentTab('myStruggles')}
            className={`flex items-center gap-1.5 transition-colors hover:text-slate-900 dark:hover:text-white py-1 whitespace-nowrap ${
              currentTab === 'myStruggles'
                ? 'text-amber-500 dark:text-amber-300 font-semibold border-b-2 border-amber-400 shadow-[0_4px_12px_-4px_rgba(251,191,36,0.4)]'
                : ''
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>My Struggles</span>
          </button>

          <button
            onClick={() => {
              setCurrentTab('about');
              if (typeof window !== 'undefined') {
                window.history.pushState({}, '', '/about');
              }
            }}
            className={`flex items-center gap-1.5 transition-colors hover:text-slate-900 dark:hover:text-white py-1 whitespace-nowrap cursor-pointer ${
              currentTab === 'about'
                ? 'text-emerald-600 dark:text-emerald-400 font-semibold border-b-2 border-emerald-500'
                : ''
            }`}
          >
            <span>About Us</span>
          </button>

          {isAuthenticated && (
            <button
              onClick={() => setCurrentTab('mySubscription')}
              className={`flex items-center gap-1.5 transition-colors hover:text-white py-1 whitespace-nowrap cursor-pointer ${
                currentTab === 'mySubscription'
                  ? 'text-[#FACC15] font-bold border-b-2 border-[#FACC15]'
                  : ''
              }`}
            >
              <span>My Subscription</span>
            </button>
          )}

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
              title="Open Nexovian Xitsonga Language Engine & Phrasebook"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Xitsonga Engine</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </button>
          )}

          {/* 12 South African Languages Selector */}
          <div className="relative" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 text-xs font-medium border border-slate-200/80 dark:border-slate-800 transition-colors cursor-pointer select-none"
              title="Select one of South Africa's 12 official languages (incl SASL 🤟)"
              aria-expanded={isLangOpen}
            >
              <Globe className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="font-semibold">{currentLanguageInfo?.nativeName || currentLanguageInfo?.name || 'English'}</span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <>
                {/* Fixed invisible backdrop to close on outside click */}
                <div
                  className="fixed inset-0 z-[9998]"
                  onClick={() => setIsLangOpen(false)}
                  aria-hidden="true"
                />
                <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#333333] rounded-xl shadow-2xl py-2 z-[9999] max-h-80 overflow-y-auto">
                  <div className="px-3 py-1.5 border-b border-slate-100 dark:border-[#262626] mb-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      12 Official SA Languages (incl SASL 🤟)
                    </span>
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setLanguage(lang.code);
                        setActiveLearningLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs hover:bg-amber-50 dark:hover:bg-[#222222] transition-colors cursor-pointer ${
                        (activeLearningLanguage || language) === lang.code
                          ? 'text-amber-700 dark:text-amber-400 font-bold bg-amber-50/60 dark:bg-[#262626]'
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
            </>
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

          {/* User Account Trigger & Logout Button */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setCurrentTab('mySubscription')}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-black bg-[#FFD400] hover:bg-yellow-400 rounded-lg transition-all cursor-pointer whitespace-nowrap"
                title="Manage your trial & subscription"
              >
                <span>My Subscription</span>
              </button>

              <button
                onClick={() => setCurrentTab('profile')}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-xs"
                title={`Logged in as ${user.name} (${user.email})`}
              >
                <div className="w-6 h-6 rounded-full bg-yellow-400 text-slate-950 flex items-center justify-center font-bold text-[11px] shrink-0">
                  {user.name ? user.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:flex flex-col text-left leading-tight">
                  <span className="truncate max-w-[150px] font-bold text-xs text-slate-900 dark:text-white">
                    Welcome, {user.name || 'Learner'}
                  </span>
                  <span className="truncate max-w-[150px] font-mono text-[10px] text-slate-500 dark:text-slate-400">
                    {user.email}
                  </span>
                </div>
              </button>

              <button
                onClick={logout}
                className="px-2.5 py-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors border border-red-200 dark:border-red-900/60 cursor-pointer"
                title="Log out"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setCurrentTab('login')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-colors border border-slate-200 dark:border-slate-800 cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
              <button
                onClick={() => setCurrentTab('signup')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-black bg-[#FFD400] hover:bg-yellow-400 rounded-lg transition-all shadow-sm cursor-pointer"
              >
                <span>Start 2-Day Free Trial</span>
              </button>
            </div>
          )}

          {/* Mobile Yellow Study Guide Button */}
          <a
            href="/study-guide"
            onClick={(e) => {
              e.preventDefault();
              setCurrentTab('studyGuide');
              if (typeof window !== 'undefined') {
                window.history.pushState({}, '', '/study-guide');
              }
            }}
            className="md:hidden flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-black bg-[#FFD400] hover:bg-yellow-400 rounded-lg shadow-sm transition-all active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <span>📚</span>
            <span>Study Guide</span>
          </a>

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

