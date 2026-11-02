/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { LearningProvider, useLearning } from './context/LearningContext';
import { I18nProvider, useTranslation } from './i18n/I18nContext';
import { Navbar } from './components/layout/Navbar';
import { MobileTabBar } from './components/layout/MobileTabBar';
import { HeroSection } from './components/home/HeroSection';
import { DailyRoutineCard } from './components/home/DailyRoutineCard';
import { SchoolPathwayView } from './components/pathways/SchoolPathwayView';
import { TvetPathwayView } from './components/pathways/TvetPathwayView';
import { HigherEdPathwayView } from './components/pathways/HigherEdPathwayView';
import { TrackCatalog } from './components/tracks/TrackCatalog';
import { FlashcardPractice } from './components/practice/FlashcardPractice';
import { PublicLandingView } from './components/home/PublicLandingView';
import { SavedLearningArea } from './components/saved/SavedLearningArea';
import { UserProfileView } from './components/profile/UserProfileView';
import { AITutorView } from './components/tutor/AITutorView';
import { ScanAndLearnView } from './components/scan/ScanAndLearnView';
import { AdaptiveDashboardView } from './components/adaptive/AdaptiveDashboardView';
import { AssessmentHubView } from './components/assessment/AssessmentHubView';
import { StudentMasteryDashboardView } from './components/dashboard/StudentMasteryDashboardView';
import { LearnHubView } from './components/learn/LearnHubView';
import { MyProgressHubView } from './components/progress/MyProgressHubView';
import { AcademicVoiceView } from './components/academic/AcademicVoiceView';
import { AdminQuestionBankView } from './components/admin/AdminQuestionBankView';
import { AboutUsView } from './components/about/AboutUsView';
import { LessonPlayerModal } from './components/player/LessonPlayerModal';
import { CertificateModal } from './components/certificate/CertificateModal';
import { SearchModal } from './components/search/SearchModal';
import { PwaInstallBanner } from './components/pwa/PwaInstallBanner';
import { ToastProvider } from './components/layout/ToastNotification';
import { AuthModal } from './components/auth/AuthModal';
import { Footer } from './components/layout/Footer';
import { SplashScreen } from './components/common/SplashScreen';
import { useAuth } from './context/AuthContext';
import { CreateAccountScreen } from './components/auth/CreateAccountScreen';
import { SubscriptionBanner } from './components/subscription/SubscriptionBanner';
import { isAdminUser } from './services/antiAbuseService';
import { LogoIcon } from './components/common/LogoIcon';
import { APP_CONFIG } from './config/brand';
import { 
  ArrowRight, 
  Sparkles, 
  Camera,
  Compass,
  Zap,
  Target,
  Shield, 
  Cpu, 
  Code, 
  BookOpen, 
  MessageSquare, 
  School, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck,
  Award 
} from 'lucide-react';

const MainLayout: React.FC = () => {
  const { currentTab, setCurrentTab, tracks, openLesson, adaptiveProfile } = useLearning();
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F6F5EF] flex items-center justify-center p-4">
        <div className="text-center">
          <LogoIcon size={48} className="animate-pulse mx-auto" />
          <p className="mt-4 font-mono text-xs font-bold text-slate-700">Connecting to NEXOVIAN...</p>
        </div>
      </div>
    );
  }

  // FIXED: SHOW LANDING PAGE BEFORE LOGIN (NOT CreateAccountScreen)
  // This is your Trust Fix + Step-by-Step Calculator entry point
  if (!isAuthenticated) {
    if (currentTab === 'about') {
      return (
        <div className="min-h-screen flex flex-col bg-slate-50">
          <AboutUsView />
          <Footer />
          <MobileTabBar />
        </div>
      );
    }
    return <PublicLandingView />;
  }

  // Admin route guard
  if (currentTab === 'adminBank' && !isAdminUser(user)) {
    setCurrentTab('home');
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
      window.history.replaceState({}, '', '/');
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-16 md:pb-0 w-full max-w-[100vw] overflow-x-hidden">
      <SubscriptionBanner />
      <Navbar />
      <main className="flex-1 w-full max-w-[100vw] overflow-x-hidden">
        {currentTab === 'home' && <StudentMasteryDashboardView />}
        {currentTab === 'explore' && (
          <div>
            <HeroSection />
            <section className="max-w-7xl mx-auto px-4 sm:px-6 my-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f0ff]" />
                    <span>South African Unified Structure</span>
                  </div>
                  <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                    Three Education Pathways
                  </h2>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
                  From Grade R foundation skills to university degrees, all structured with verified curriculum frameworks.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div onClick={() => setCurrentTab('school')} className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)] transition-all cursor-pointer flex flex-col justify-between group active:scale-98">
                  <div>
                    <div className="relative h-44 overflow-hidden">
                      <img src="/src/assets/images/pathway_school_stem_1790752906177.jpg" alt="Science and mathematics educational workspace" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 text-white">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500 text-slate-950 shadow-[0_0_10px_-2px_rgba(6,182,212,0.6)]">{t('pathwaySchoolBadge')}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                        <School className="w-4 h-4 text-cyan-400" />
                        <span>Foundation to FET Phases</span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">{t('pathwaySchoolTitle')}</h3>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">Grade → Subject → Term → Topic → Subtopic → Lesson → Practice → Quiz → Mastery.</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-semibold text-cyan-500 dark:text-cyan-400">Explore 13 Grades</span>
                    <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div onClick={() => setCurrentTab('tvet')} className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group active:scale-98">
                  <div>
                    <div className="relative h-44 overflow-hidden">
                      <img src="/src/assets/images/pathway_tvet_tech_1790752917493.jpg" alt="Technical workshop and engineering workbench" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 text-white">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/80 text-white">{t('pathwayTvetBadge')}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                        <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>NATED & NC(V) Certificates</span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">{t('pathwayTvetTitle')}</h3>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">Qualification → Programme → Subject/Module → Topic → Lesson → Practice → Assessment.</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">Explore N1–N6 & L2–L4</span>
                    <ArrowRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div onClick={() => setCurrentTab('higherEd')} className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group active:scale-98">
                  <div>
                    <div className="relative h-44 overflow-hidden bg-slate-900 flex items-center justify-center p-6 text-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-slate-900 to-slate-950" />
                      <div className="relative z-10">
                        <GraduationCap className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                        <span className="text-xs text-purple-200 font-semibold block">UCT · Wits · UP · UJ · Stellenbosch · UNISA</span>
                      </div>
                      <div className="absolute bottom-3 left-3 text-white">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/80 text-white">{t('pathwayHigherEdBadge')}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                        <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span>Multi-Institution Structure</span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">{t('pathwayHigherEdTitle')}</h3>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">Institution → Faculty → Programme → Qualification → Module → Topic → Lesson.</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">Explore Degree Modules</span>
                    <ArrowRight className="w-4 h-4 text-purple-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </section>
            <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-cyan-950/40 via-slate-900/90 to-slate-950 text-white border border-cyan-500/30 hover:border-cyan-500/50 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-[0_0_20px_-5px_rgba(6,182,212,0.15)] transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-400 text-slate-950 flex items-center justify-center font-bold shadow-[0_0_12px_rgba(6,182,212,0.5)]"><Camera className="w-5 h-5" /></div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Phase 3 · Vision AI</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">Scan & Learn</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">Take a photo of textbook pages, homework questions, or circuit diagrams. Gemini analyzes clarity, explains step-by-step, generates quizzes, and answers follow-ups in 11 SA languages.</p>
                </div>
                <div className="mt-5 pt-4 border-t border-cyan-500/20 flex items-center justify-between">
                  <span className="text-xs font-semibold text-cyan-300 font-mono">Camera · Gallery · 7 Modes</span>
                  <button onClick={() => setCurrentTab('scan')} className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 text-slate-950 font-bold rounded-xl text-xs shadow-[0_0_15px_-2px_rgba(6,182,212,0.4)] transition-transform active:scale-95"><Camera className="w-3.5 h-3.5" /><span>Open Scan & Learn</span></button>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-950/40 via-slate-900/90 to-slate-950 text-white border border-purple-500/30 hover:border-purple-500/50 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-[0_0_20px_-5px_rgba(168,85,247,0.15)] transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center font-bold shadow-[0_0_12px_rgba(168,85,247,0.5)]"><Sparkles className="w-5 h-5 text-cyan-300" /></div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">11 SA Languages</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">Conversational AI Tutor</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">Socratic tutoring calibrated for Grade R–12 CAPS, TVET NATED Colleges, and University courses. Ask anything, simplify concepts, generate study plans, and master examinations.</p>
                </div>
                <div className="mt-5 pt-4 border-t border-purple-500/20 flex items-center justify-between">
                  <span className="text-xs font-semibold text-purple-300 font-mono">Socratic · Study Plans · Practice</span>
                  <button onClick={() => setCurrentTab('tutor')} className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 hover:from-purple-400 hover:to-cyan-300 text-white font-bold rounded-xl text-xs shadow-[0_0_15px_-2px_rgba(168,85,247,0.4)] transition-transform active:scale-95"><MessageSquare className="w-3.5 h-3.5" /><span>Launch AI Tutor</span></button>
                </div>
              </div>
            </section>
            <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
              <DailyRoutineCard />
            </section>
          </div>
        )}
        {currentTab === 'learn' && <LearnHubView />}
        {currentTab === 'progress' && <MyProgressHubView />}
        {currentTab === 'school' && <SchoolPathwayView />}
        {currentTab === 'tvet' && <TvetPathwayView />}
        {currentTab === 'higherEd' && <HigherEdPathwayView />}
        {currentTab === 'tutor' && <AITutorView />}
        {currentTab === 'scan' && <ScanAndLearnView />}
        {currentTab === 'tracks' && <TrackCatalog />}
        {currentTab === 'practice' && <FlashcardPractice />}
        {currentTab === 'saved' && <SavedLearningArea />}
        {currentTab === 'profile' && <UserProfileView />}
        {currentTab === 'adaptive' && <AdaptiveDashboardView />}
        {currentTab === 'assessments' && <AssessmentHubView />}
        {currentTab === 'academicVoice' && <AcademicVoiceView />}
        {currentTab === 'adminBank' && <AdminQuestionBankView />}
        {currentTab === 'about' && <AboutUsView />}
      </main>
      {currentTab !== 'tutor' && currentTab !== 'scan' && <Footer />}
      <MobileTabBar />
      <LessonPlayerModal />
      <CertificateModal />
      <SearchModal />
      <PwaInstallBanner />
      <AuthModal />
      <SplashScreen />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <I18nProvider>
        <ToastProvider>
          <LearningProvider>
            <MainLayout />
          </LearningProvider>
        </ToastProvider>
      </I18nProvider>
    </AuthProvider>
  );
}