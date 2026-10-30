/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN ACADEMY - UNIFIED LEARN HUB VIEW
 * 
 * Clean, beginner-friendly learning gateway:
 * - Guides students through choosing their education level (Grades 4-12, TVET, University)
 * - 3-Step Guided Learning Selector (Level -> Subject -> Activity)
 * - Clear cards for School (CAPS), TVET (NATED & NC(V)), and University
 * - Prominent "Back to Home" button for effortless return
 * - Direct 1-tap lesson launch with zero dead clicks or repeated steps
 */

import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  School,
  Briefcase,
  GraduationCap,
  Sparkles,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Clock,
  Layers,
  HelpCircle,
  Play,
  Award,
  Mic
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useTranslation } from '../../i18n/I18nContext';
import { SchoolPathwayView } from '../pathways/SchoolPathwayView';
import { TvetPathwayView } from '../pathways/TvetPathwayView';
import { HigherEdPathwayView } from '../pathways/HigherEdPathwayView';

export const LearnHubView: React.FC = () => {
  const { setCurrentTab, tracks, openLesson, updateLearningContext } = useLearning();
  const { t } = useTranslation();

  // Active view: 'hub' (beginner selector) or deep pathway views ('school' | 'tvet' | 'higherEd')
  const [activePathwayDetail, setActivePathwayDetail] = useState<'none' | 'school' | 'tvet' | 'higherEd'>('none');

  // Guided 3-step selector state
  const [selectedLevel, setSelectedLevel] = useState<'school' | 'tvet' | 'higherEd'>('school');
  const [selectedGrade, setSelectedGrade] = useState<string>('Grade 11');
  const [selectedSubject, setSelectedSubject] = useState<string>('Mathematics');
  const [selectedActivity, setSelectedActivity] = useState<'lesson' | 'tutor' | 'quiz' | 'voice'>('lesson');

  // Subjects by level
  const schoolSubjects = [
    'Mathematics',
    'Physical Sciences',
    'Life Sciences',
    'English First Additional',
    'Accounting',
    'Economics',
    'Geography'
  ];

  const tvetSubjects = [
    'Engineering Mathematics (N1-N6)',
    'Electrotechnics (N3-N6)',
    'Industrial Electronics',
    'Mechanotechnics',
    'Financial Accounting N4-N6',
    'NC(V) Electrical Principles'
  ];

  const universitySubjects = [
    'Calculus & Linear Algebra',
    'Electromagnetic Fields & Waves',
    'Computer Science & Algorithms',
    'Microeconomics & Macroeconomics',
    'Organic Chemistry & Biochemistry',
    'Academic Writing & Research'
  ];

  const currentSubjectList =
    selectedLevel === 'school'
      ? schoolSubjects
      : selectedLevel === 'tvet'
      ? tvetSubjects
      : universitySubjects;

  const handleLaunchGuidedActivity = () => {
    // Context update for AI Tutor if that activity is chosen
    if (updateLearningContext) {
      updateLearningContext({
        educationLevel:
          selectedLevel === 'school'
            ? 'School (CAPS)'
            : selectedLevel === 'tvet'
            ? 'TVET College'
            : 'University',
        gradeOrProgramme: selectedGrade,
        subject: selectedSubject,
        topic: `${selectedSubject} Fundamentals`,
        mode: 'explain'
      });
    }

    if (selectedActivity === 'lesson') {
      // Find matching or first available lesson
      const firstLesson = tracks[0]?.modules[0]?.lessons[0];
      if (firstLesson) {
        openLesson(firstLesson.id);
      } else {
        setActivePathwayDetail(selectedLevel);
      }
    } else if (selectedActivity === 'tutor') {
      setCurrentTab('tutor');
    } else if (selectedActivity === 'quiz') {
      setCurrentTab('practice');
    } else if (selectedActivity === 'voice') {
      setCurrentTab('academicVoice');
    }
  };

  // If user opened a deep pathway from here, render it with a quick back button
  if (activePathwayDetail === 'school') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={() => setActivePathwayDetail('none')}
              className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Learn Hub</span>
            </button>
            <span className="text-xs font-semibold text-slate-500">School (CAPS Grades R–12)</span>
          </div>
        </div>
        <SchoolPathwayView />
      </div>
    );
  }

  if (activePathwayDetail === 'tvet') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={() => setActivePathwayDetail('none')}
              className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Learn Hub</span>
            </button>
            <span className="text-xs font-semibold text-slate-500">TVET (NATED & NC(V))</span>
          </div>
        </div>
        <TvetPathwayView />
      </div>
    );
  }

  if (activePathwayDetail === 'higherEd') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={() => setActivePathwayDetail('none')}
              className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Learn Hub</span>
            </button>
            <span className="text-xs font-semibold text-slate-500">University (Higher Education)</span>
          </div>
        </div>
        <HigherEdPathwayView />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 md:pb-16 text-slate-900 dark:text-slate-100">
      {/* 1. Header with Breadcrumb / Return to Home */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 sticky top-0 z-20 backdrop-blur-md bg-white/95 dark:bg-slate-900/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentTab('home')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Return to Home Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Home</span>
            </button>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />
            <div>
              <h1 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Learn
              </h1>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                Choose your education level, subject and start learning
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentTab('tutor')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI Tutor</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* 2. Interactive 3-Step Guided Learning Finder */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-8 shadow-sm">
          <div className="max-w-3xl mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
              Guided Learning Finder
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              What do you want to learn today?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              Select your education level and subject below. We will guide you straight to the right lesson or activity without confusing menus.
            </p>
          </div>

          <div className="space-y-6">
            {/* Step 1: Education Level */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
                Step 1: Choose Your Education Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedLevel('school');
                    setSelectedSubject(schoolSubjects[0]);
                  }}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all min-h-[58px] ${
                    selectedLevel === 'school'
                      ? 'border-amber-500 bg-amber-500/10 text-slate-900 dark:text-white ring-2 ring-amber-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-bold">
                    <School className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs sm:text-sm font-bold truncate">School (CAPS)</span>
                    <span className="block text-[11px] text-slate-500 dark:text-slate-400 truncate">Grades 4–12</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedLevel('tvet');
                    setSelectedSubject(tvetSubjects[0]);
                  }}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all min-h-[58px] ${
                    selectedLevel === 'tvet'
                      ? 'border-blue-500 bg-blue-500/10 text-slate-900 dark:text-white ring-2 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0 font-bold">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs sm:text-sm font-bold truncate">TVET Colleges</span>
                    <span className="block text-[11px] text-slate-500 dark:text-slate-400 truncate">N1–N6 & NC(V)</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedLevel('higherEd');
                    setSelectedSubject(universitySubjects[0]);
                  }}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all min-h-[58px] ${
                    selectedLevel === 'higherEd'
                      ? 'border-emerald-500 bg-emerald-500/10 text-slate-900 dark:text-white ring-2 ring-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 font-bold">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs sm:text-sm font-bold truncate">University</span>
                    <span className="block text-[11px] text-slate-500 dark:text-slate-400 truncate">Higher Education</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 2: Subject Picker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
                Step 2: Choose Your Subject
              </label>
              <div className="flex flex-wrap gap-2">
                {currentSubjectList.map((subj) => (
                  <button
                    key={subj}
                    type="button"
                    onClick={() => setSelectedSubject(subj)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
                      selectedSubject === subj
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {subj}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Choose Activity */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
                Step 3: Choose Your Learning Activity
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'lesson', label: 'Read Lesson', icon: BookOpen, desc: 'Structured content' },
                  { id: 'tutor', label: 'Ask AI Tutor', icon: Sparkles, desc: 'Step-by-step help' },
                  { id: 'quiz', label: 'Practice Quiz', icon: Award, desc: 'Test mastery' },
                  { id: 'voice', label: 'Voice Report', icon: Mic, desc: 'Generate PDF' }
                ].map((act) => {
                  const Icon = act.icon;
                  const isSelected = selectedActivity === act.id;
                  return (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => setSelectedActivity(act.id as any)}
                      className={`p-3 rounded-2xl border text-left transition-all min-h-[64px] ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10 text-slate-900 dark:text-white ring-2 ring-amber-500/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-amber-500' : 'text-slate-400'}`} />
                      <span className="block text-xs font-bold">{act.label}</span>
                      <span className="block text-[10px] text-slate-500">{act.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Launch Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Ready to study <strong className="text-slate-900 dark:text-white">{selectedSubject}</strong> via{' '}
                <span className="text-amber-600 dark:text-amber-400 font-semibold">{selectedActivity}</span>
              </div>
              <button
                type="button"
                onClick={handleLaunchGuidedActivity}
                className="w-full sm:w-auto px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 min-h-[48px]"
              >
                <span>Start Learning {selectedSubject}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* 3. Deep Pathways Overview Cards */}
        <section>
          <div className="mb-4">
            <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Full Curriculum Frameworks
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Need comprehensive syllabus breakdowns? Explore each sector's full structure below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* School Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                    <School className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    CAPS Certified
                  </span>
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  School: Grades 4–12
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  Foundation, Intermediate, Senior, and FET Phases. Terms 1–4 with full lesson notes and practice tasks.
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500">13 Grades</span>
                <button
                  type="button"
                  onClick={() => setActivePathwayDetail('school')}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 min-h-[44px]"
                >
                  <span>Explore School</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* TVET Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-bold">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    DHET Aligned
                  </span>
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  TVET Colleges
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  NATED Engineering & Business Studies (N1–N6) and NC(V) Levels 2–4 with practical workshop assignments.
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500">N1–N6 & NC(V)</span>
                <button
                  type="button"
                  onClick={() => setActivePathwayDetail('tvet')}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 min-h-[44px]"
                >
                  <span>Explore TVET</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* University Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    Higher Ed
                  </span>
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  University
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  Engineering, STEM, Commerce, and Humanities modules with academic citations and lecture notes.
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500">Faculties & Modules</span>
                <button
                  type="button"
                  onClick={() => setActivePathwayDetail('higherEd')}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 min-h-[44px]"
                >
                  <span>Explore University</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Quick Featured Lessons */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Featured Lessons
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Jump right into interactive lessons with audio narration and practice quizzes
              </p>
            </div>
            <button
              type="button"
              onClick={() => setCurrentTab('tracks')}
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>View All Tracks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tracks.flatMap((t) => t.modules.flatMap((m) => m.lessons)).slice(0, 4).map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 hover:border-amber-400 dark:hover:border-amber-500 transition-colors shadow-2xs"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>{lesson.durationMinutes} min read</span>
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                    {lesson.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {lesson.subtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => openLesson(lesson.id)}
                  className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition-transform active:scale-95 shrink-0 flex items-center gap-1.5 min-h-[44px]"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Start</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
