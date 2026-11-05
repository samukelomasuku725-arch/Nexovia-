/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN ACADEMY - UNIFIED LEARN HUB VIEW (AUTHENTIC DARK THEME #0F0F0F + #FACC15)
 * 
 * 3-Step Guided Learning Selector:
 * - Step 1: Choose Level (School CAPS Grades 4-12 / TVET N1-N6 / University)
 * - Step 2: Choose Subject
 * - Step 3: Choose Learning Activity & Browse Subjects
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
  Mic,
  Calculator
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

  if (activePathwayDetail === 'school') {
    return (
      <div className="min-h-screen bg-[#0F0F0F] text-[#F8FAFC] pb-20">
        <div className="bg-[#141414] border-b border-[#262626] sticky top-0 z-20 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={() => setActivePathwayDetail('none')}
              className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-300 hover:text-[#FACC15] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#FACC15]" />
              <span>Back to Learn Hub</span>
            </button>
            <span className="text-xs font-semibold text-[#FACC15]">School (CAPS Grades 4–12)</span>
          </div>
        </div>
        <SchoolPathwayView />
      </div>
    );
  }

  if (activePathwayDetail === 'tvet') {
    return (
      <div className="min-h-screen bg-[#0F0F0F] text-[#F8FAFC] pb-20">
        <div className="bg-[#141414] border-b border-[#262626] sticky top-0 z-20 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={() => setActivePathwayDetail('none')}
              className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-300 hover:text-[#FACC15] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#FACC15]" />
              <span>Back to Learn Hub</span>
            </button>
            <span className="text-xs font-semibold text-[#FACC15]">TVET (NATED & NC(V))</span>
          </div>
        </div>
        <TvetPathwayView />
      </div>
    );
  }

  if (activePathwayDetail === 'higherEd') {
    return (
      <div className="min-h-screen bg-[#0F0F0F] text-[#F8FAFC] pb-20">
        <div className="bg-[#141414] border-b border-[#262626] sticky top-0 z-20 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={() => setActivePathwayDetail('none')}
              className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-300 hover:text-[#FACC15] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#FACC15]" />
              <span>Back to Learn Hub</span>
            </button>
            <span className="text-xs font-semibold text-[#FACC15]">University (Higher Education)</span>
          </div>
        </div>
        <HigherEdPathwayView />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#F8FAFC] pb-24 md:pb-16">
      {/* 1. Header with Breadcrumb / Return to Home */}
      <header className="bg-[#141414] border-b border-[#262626] sticky top-0 z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentTab('home')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 bg-[#1E1E22] hover:bg-[#26262B] hover:text-[#FACC15] transition-colors cursor-pointer"
              aria-label="Return to Home Dashboard"
            >
              <ArrowLeft className="w-4 h-4 text-[#FACC15]" />
              <span>Home</span>
            </button>
            <div className="h-4 w-px bg-[#262626] hidden sm:block" />
            <div>
              <h1 className="font-display text-base sm:text-lg font-bold text-white">
                Learn
              </h1>
              <p className="text-[11px] text-slate-400 hidden sm:block font-mono">
                Choose your education level, subject and start learning
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentTab('tutor')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black text-black bg-[#FACC15] hover:bg-yellow-400 transition-all shadow-[0_0_12px_rgba(250,204,21,0.4)] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Ask AI Tutor</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* 2. Interactive 3-Step Guided Learning Finder */}
        <section className="bg-[#121214] border border-[#262626] rounded-3xl p-5 sm:p-8 shadow-2xl">
          <div className="max-w-3xl mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#FACC15] font-mono block mb-1">
              3-Step Guided Learning Hub
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-black text-white">
              What do you want to learn today?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select your education level, choose your subject, and launch lessons or Socratic tutoring directly.
            </p>
          </div>

          <div className="space-y-6">
            {/* Step 1: Education Level (School CAPS Grades 4-12 / TVET N1-N6 / University) */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#FACC15] mb-2.5">
                Step 1: Choose Your Education Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedLevel('school');
                    setSelectedSubject(schoolSubjects[0]);
                  }}
                  className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all min-h-[62px] cursor-pointer ${
                    selectedLevel === 'school'
                      ? 'border-[#FACC15] bg-[#FACC15]/15 text-white ring-2 ring-[#FACC15]/40 shadow-[0_0_15px_-3px_rgba(250,204,21,0.3)]'
                      : 'border-[#262626] hover:border-[#383838] bg-[#18181B] text-slate-300'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FACC15] text-black flex items-center justify-center shrink-0 font-bold shadow-xs">
                    <School className="w-5 h-5 text-black" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs sm:text-sm font-bold truncate text-white">School (CAPS)</span>
                    <span className="block text-[11px] text-[#FACC15] truncate font-mono">Grades 4–12</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedLevel('tvet');
                    setSelectedSubject(tvetSubjects[0]);
                  }}
                  className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all min-h-[62px] cursor-pointer ${
                    selectedLevel === 'tvet'
                      ? 'border-[#FACC15] bg-[#FACC15]/15 text-white ring-2 ring-[#FACC15]/40 shadow-[0_0_15px_-3px_rgba(250,204,21,0.3)]'
                      : 'border-[#262626] hover:border-[#383838] bg-[#18181B] text-slate-300'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FACC15] text-black flex items-center justify-center shrink-0 font-bold shadow-xs">
                    <Briefcase className="w-5 h-5 text-black" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs sm:text-sm font-bold truncate text-white">TVET Colleges</span>
                    <span className="block text-[11px] text-[#FACC15] truncate font-mono">N1–N6 & NC(V)</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedLevel('higherEd');
                    setSelectedSubject(universitySubjects[0]);
                  }}
                  className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all min-h-[62px] cursor-pointer ${
                    selectedLevel === 'higherEd'
                      ? 'border-[#FACC15] bg-[#FACC15]/15 text-white ring-2 ring-[#FACC15]/40 shadow-[0_0_15px_-3px_rgba(250,204,21,0.3)]'
                      : 'border-[#262626] hover:border-[#383838] bg-[#18181B] text-slate-300'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FACC15] text-black flex items-center justify-center shrink-0 font-bold shadow-xs">
                    <GraduationCap className="w-5 h-5 text-black" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs sm:text-sm font-bold truncate text-white">University</span>
                    <span className="block text-[11px] text-[#FACC15] truncate font-mono">Higher Education</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 2: Subject Picker */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#FACC15] mb-2.5">
                Step 2: Choose Your Subject
              </label>
              <div className="flex flex-wrap gap-2">
                {currentSubjectList.map((subj) => (
                  <button
                    key={subj}
                    type="button"
                    onClick={() => setSelectedSubject(subj)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all min-h-[44px] cursor-pointer ${
                      selectedSubject === subj
                        ? 'bg-[#FACC15] text-black shadow-[0_0_12px_rgba(250,204,21,0.4)]'
                        : 'bg-[#18181B] text-slate-300 hover:text-white border border-[#2E2E32] hover:border-[#444]'
                    }`}
                  >
                    {subj}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Choose Learning Activity */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#FACC15] mb-2.5">
                Step 3: Browse Subjects & Choose Activity
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'lesson', label: 'Read Lesson', icon: BookOpen, desc: 'Structured notes' },
                  { id: 'tutor', label: 'Ask AI Tutor', icon: Sparkles, desc: 'Step-by-step help' },
                  { id: 'quiz', label: 'Practice Quiz', icon: Award, desc: 'Test mastery' },
                  { id: 'voice', label: 'Voice Docs', icon: Mic, desc: 'Academic audio' }
                ].map((act) => {
                  const Icon = act.icon;
                  const isSelected = selectedActivity === act.id;
                  return (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => setSelectedActivity(act.id as any)}
                      className={`p-3.5 rounded-2xl border text-left transition-all min-h-[64px] cursor-pointer ${
                        isSelected
                          ? 'border-[#FACC15] bg-[#FACC15]/15 text-white ring-2 ring-[#FACC15]/40 shadow-[0_0_12px_rgba(250,204,21,0.25)]'
                          : 'border-[#262626] hover:border-[#383838] bg-[#18181B] text-slate-300'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-[#FACC15]' : 'text-slate-400'}`} />
                      <span className="block text-xs font-bold text-white">{act.label}</span>
                      <span className="block text-[10px] text-slate-400">{act.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Launch Button */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#262626]">
              <div className="text-xs text-slate-400">
                Ready to study <strong className="text-[#FACC15]">{selectedSubject}</strong> via{' '}
                <span className="text-white font-semibold">{selectedActivity}</span>
              </div>
              <button
                type="button"
                onClick={handleLaunchGuidedActivity}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#FACC15] hover:bg-yellow-400 text-black font-black rounded-xl text-xs sm:text-sm shadow-[0_0_20px_-3px_rgba(250,204,21,0.5)] transition-all active:scale-95 flex items-center justify-center gap-2 min-h-[48px] cursor-pointer"
              >
                <span>Start Learning {selectedSubject}</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </section>

        {/* 3. Deep Pathways Overview Cards */}
        <section>
          <div className="mb-4">
            <h2 className="font-display text-lg sm:text-xl font-bold text-white">
              Full Curriculum Frameworks
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Explore complete syllabus breakdowns for each education phase.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* School Card */}
            <div className="bg-[#141417] border border-[#262626] rounded-3xl p-5 sm:p-6 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FACC15] text-black flex items-center justify-center font-bold shadow-xs">
                    <School className="w-5 h-5 text-black" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FACC15]/20 text-[#FACC15] border border-[#FACC15]/40">
                    CAPS Certified
                  </span>
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-white">
                  School: Grades 4–12
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Foundation, Intermediate, Senior, and FET Phases. Terms 1–4 with full lesson notes and practice tasks.
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-[#262626] flex items-center justify-between">
                <span className="text-xs text-[#FACC15] font-mono">13 Grades</span>
                <button
                  type="button"
                  onClick={() => setActivePathwayDetail('school')}
                  className="px-3.5 py-2 bg-[#1E1E22] hover:bg-[#2A2A2E] text-white hover:text-[#FACC15] font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 min-h-[44px] cursor-pointer"
                >
                  <span>Explore School</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#FACC15]" />
                </button>
              </div>
            </div>

            {/* TVET Card */}
            <div className="bg-[#141417] border border-[#262626] rounded-3xl p-5 sm:p-6 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FACC15] text-black flex items-center justify-center font-bold shadow-xs">
                    <Briefcase className="w-5 h-5 text-black" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FACC15]/20 text-[#FACC15] border border-[#FACC15]/40">
                    DHET Aligned
                  </span>
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-white">
                  TVET Colleges
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  NATED Engineering & Business Studies (N1–N6) and NC(V) Levels 2–4 with practical assignments.
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-[#262626] flex items-center justify-between">
                <span className="text-xs text-[#FACC15] font-mono">N1–N6 & NC(V)</span>
                <button
                  type="button"
                  onClick={() => setActivePathwayDetail('tvet')}
                  className="px-3.5 py-2 bg-[#1E1E22] hover:bg-[#2A2A2E] text-white hover:text-[#FACC15] font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 min-h-[44px] cursor-pointer"
                >
                  <span>Explore TVET</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#FACC15]" />
                </button>
              </div>
            </div>

            {/* University Card */}
            <div className="bg-[#141417] border border-[#262626] rounded-3xl p-5 sm:p-6 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FACC15] text-black flex items-center justify-center font-bold shadow-xs">
                    <GraduationCap className="w-5 h-5 text-black" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FACC15]/20 text-[#FACC15] border border-[#FACC15]/40">
                    Higher Ed
                  </span>
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-white">
                  University
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Engineering, STEM, Commerce, and Humanities modules with academic citations and lecture notes.
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-[#262626] flex items-center justify-between">
                <span className="text-xs text-[#FACC15] font-mono">Faculties & Modules</span>
                <button
                  type="button"
                  onClick={() => setActivePathwayDetail('higherEd')}
                  className="px-3.5 py-2 bg-[#1E1E22] hover:bg-[#2A2A2E] text-white hover:text-[#FACC15] font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 min-h-[44px] cursor-pointer"
                >
                  <span>Explore University</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#FACC15]" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LearnHubView;
