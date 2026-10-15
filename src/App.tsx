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
import { LessonPlayerModal } from './components/player/LessonPlayerModal';
import { CertificateModal } from './components/certificate/CertificateModal';
import { SearchModal } from './components/search/SearchModal';
import { PwaInstallBanner } from './components/pwa/PwaInstallBanner';
import { ToastProvider } from './components/layout/ToastNotification';
import { AuthModal } from './components/auth/AuthModal';
import { Footer } from './components/layout/Footer';
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
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-16 md:pb-0">
      {/* 3-Zone Top Navigation Bar */}
      <Navbar />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentTab === 'home' && <StudentMasteryDashboardView />}
        {currentTab === 'explore' && (
          <div>
            <HeroSection />

            {/* THREE PRIMARY EDUCATION PATHWAYS (PHASE 1 FOUNDATION) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 my-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                    South African Unified Structure
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
                {/* Pathway Card 1: School (CAPS) */}
                <div 
                  onClick={() => setCurrentTab('school')}
                  className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group active:scale-98"
                >
                  <div>
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src="/src/assets/images/pathway_school_stem_1790752906177.jpg"
                        alt="Science and mathematics educational workspace"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 text-white">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/80 text-slate-950">
                          {t('pathwaySchoolBadge')}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                        <School className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <span>Foundation to FET Phases</span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                        {t('pathwaySchoolTitle')}
                      </h3>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Grade → Subject → Term → Topic → Subtopic → Lesson → Practice → Quiz → Mastery.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                      Explore 13 Grades
                    </span>
                    <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Pathway Card 2: TVET Colleges */}
                <div 
                  onClick={() => setCurrentTab('tvet')}
                  className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group active:scale-98"
                >
                  <div>
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src="/src/assets/images/pathway_tvet_tech_1790752917493.jpg"
                        alt="Technical workshop and engineering workbench"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 text-white">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/80 text-white">
                          {t('pathwayTvetBadge')}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                        <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>NATED & NC(V) Certificates</span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                        {t('pathwayTvetTitle')}
                      </h3>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Qualification → Programme → Subject/Module → Topic → Lesson → Practice → Assessment.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      Explore N1–N6 & L2–L4
                    </span>
                    <ArrowRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Pathway Card 3: Higher Education */}
                <div 
                  onClick={() => setCurrentTab('higherEd')}
                  className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group active:scale-98"
                >
                  <div>
                    <div className="relative h-44 overflow-hidden bg-slate-900 flex items-center justify-center p-6 text-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-slate-900 to-slate-950" />
                      <div className="relative z-10">
                        <GraduationCap className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                        <span className="text-xs text-purple-200 font-semibold block">
                          UCT · Wits · UP · UJ · Stellenbosch · UNISA
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 text-white">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/80 text-white">
                          {t('pathwayHigherEdBadge')}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                        <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span>Multi-Institution Structure</span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                        {t('pathwayHigherEdTitle')}
                      </h3>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Institution → Faculty → Programme → Qualification → Module → Topic → Lesson.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                      Explore Degree Modules
                    </span>
                    <ArrowRight className="w-4 h-4 text-purple-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </section>

            {/* AI TUTOR & SCAN & LEARN PRIMARY ADJACENCY BANNERS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: Scan & Learn */}
              <div className="bg-gradient-to-br from-amber-500/15 via-amber-400/5 to-white dark:to-slate-900 border border-amber-500/30 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-xs">
                      <Camera className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300">
                      Phase 3 · Vision AI
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    Scan & Learn
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                    Take a photo of textbook pages, homework questions, or circuit diagrams. Gemini analyzes clarity, explains step-by-step, generates quizzes, and answers follow-ups in 11 SA languages.
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-amber-500/20 flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">
                    Camera · Gallery · 7 Modes
                  </span>
                  <button
                    onClick={() => setCurrentTab('scan')}
                    className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs shadow-xs transition-transform active:scale-95"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Open Scan & Learn</span>
                  </button>
                </div>
              </div>

              {/* Card 2: AI Tutor */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-xs">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300">
                      11 SA Languages
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-white">
                    Conversational AI Tutor
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                    Socratic tutoring calibrated for Grade R–12 CAPS, TVET NATED Colleges, and University courses. Ask anything, simplify concepts, generate study plans, and master examinations.
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">
                    Socratic · Study Plans · Practice
                  </span>
                  <button
                    onClick={() => setCurrentTab('tutor')}
                    className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-xl text-xs shadow-xs transition-transform active:scale-95"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Launch AI Tutor</span>
                  </button>
                </div>
              </div>
            </section>

            {/* PHASE 5: ADAPTIVE LEARNING ENGINE HOME SPOTLIGHT */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
              <div className="bg-white dark:bg-slate-900 border border-amber-500/30 rounded-3xl p-5 sm:p-7 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                        <Compass className="w-3.5 h-3.5" />
                        <span>Adaptive Learning Engine</span>
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Real-time heuristic evaluation
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        {adaptiveProfile.nextBestLesson ? (
                          <>Next Recommended Activity: {adaptiveProfile.nextBestLesson.title}</>
                        ) : (
                          <>Personalized Learning Pathway</>
                        )}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
                        {adaptiveProfile.nextBestLesson
                          ? adaptiveProfile.nextBestLesson.reason
                          : "Continuous performance modeling detects what you know, targets weak areas, and calculates optimal difficulty."}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                        Mastery: <strong className="text-slate-900 dark:text-white">{adaptiveProfile.overallStats.overallProgressPercent}%</strong>
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-medium">
                        Needs Practice: <strong className="font-bold">{adaptiveProfile.weakAreas.length} Topics</strong>
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-medium">
                        Doing Well: <strong className="font-bold">{adaptiveProfile.strongAreas.length} Topics</strong>
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5">
                    <button
                      onClick={() => setCurrentTab('adaptive')}
                      className="flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-transform active:scale-95 whitespace-nowrap"
                    >
                      <Compass className="w-4 h-4" />
                      <span>Open Adaptive Engine</span>
                    </button>
                    <button
                      onClick={() => setCurrentTab('assessments')}
                      className="flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl text-xs transition-colors"
                    >
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      <span>Evaluations & Exams</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Daily Routine / Streak Zone */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
              <DailyRoutineCard />
            </section>

            {/* Featured Tracks Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                    Featured Curriculum
                  </div>
                  <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                    Start Building Today
                  </h2>
                </div>
                <button
                  onClick={() => setCurrentTab('tracks')}
                  className="flex items-center gap-1 text-xs font-semibold text-amber-700 dark:text-amber-300 hover:text-amber-800 transition-colors"
                >
                  <span>View All 4 Tracks</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 2-Column Hero Tracks Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tracks.slice(0, 2).map((track) => {
                  const firstLesson = track.modules[0]?.lessons[0];
                  return (
                    <div
                      key={track.id}
                      className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                          <span className="font-semibold text-amber-600 dark:text-amber-400">
                            {track.category}
                          </span>
                          <span>{track.durationHours} Hours · {track.level}</span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                          {track.title}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {track.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                          {track.skills.map((skill, sIdx) => (
                            <span key={sIdx}>
                              {skill}
                              {sIdx < track.skills.length - 1 && <span className="mx-1 text-slate-300 dark:text-slate-700">·</span>}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                        <span className="text-xs text-slate-500">
                          {track.modules.length} Modules · {track.modules.flatMap(m => m.lessons).length} Lessons
                        </span>
                        {firstLesson && (
                          <button
                            onClick={() => openLesson(firstLesson.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-transform active:scale-95"
                          >
                            <span>Start Lesson</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Quick Practice Prompt Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 my-10">
              <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span>Daily Quick-Fire Heuristics</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold">
                    Test your understanding
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-xl">
                    Reinforce foundational concepts across Mathematics, Physical Sciences, Electrotechnics, and Computing.
                  </p>
                </div>
                <button
                  onClick={() => setCurrentTab('practice')}
                  className="px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md active:scale-95 whitespace-nowrap"
                >
                  Start Practice Review
                </button>
              </div>
            </section>
          </div>
        )}

        {/* Dedicated Education Pathway & Learning Hub Views */}
        {currentTab === 'learn' && <LearnHubView />}
        {currentTab === 'progress' && <MyProgressHubView />}
        {currentTab === 'school' && <SchoolPathwayView />}
        {currentTab === 'tvet' && <TvetPathwayView />}
        {currentTab === 'higherEd' && <HigherEdPathwayView />}

        {/* Existing Functional Views */}
        {currentTab === 'tutor' && <AITutorView />}
        {currentTab === 'scan' && <ScanAndLearnView />}
        {currentTab === 'tracks' && <TrackCatalog />}
        {currentTab === 'practice' && <FlashcardPractice />}
        {currentTab === 'saved' && <SavedLearningArea />}
        {currentTab === 'profile' && <UserProfileView />}
        {currentTab === 'adaptive' && <AdaptiveDashboardView />}
        {currentTab === 'assessments' && <AssessmentHubView />}
        {currentTab === 'academicVoice' && <AcademicVoiceView />}
      </main>

      {/* Global Footer (shown on all tabs except immersive tutor chat and scan view) */}
      {currentTab !== 'tutor' && currentTab !== 'scan' && <Footer />}

      {/* Mobile Bottom Tab Bar (Fixed thumb navigation for Android & mobile screens) */}
      <MobileTabBar />

      {/* Modals & Overlays */}
      <LessonPlayerModal />
      <CertificateModal />
      <SearchModal />
      <PwaInstallBanner />
      <AuthModal />
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

