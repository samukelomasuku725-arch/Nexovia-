/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Briefcase, 
  Cpu, 
  Wrench, 
  BookOpen, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Award, 
  Layers, 
  CheckCircle2, 
  X,
  Compass,
  Mic,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { TVET_QUALIFICATIONS, TvetQualification, TvetProgramme, TvetSubjectModule, TvetTopic, CurriculumLesson, PracticeItem, QuizItem } from '../../data/curriculumData';
import { useTranslation } from '../../i18n/I18nContext';
import { useLearning } from '../../context/LearningContext';
import { APP_CONFIG } from '../../config/brand';

export const TvetPathwayView: React.FC = () => {
  const { t } = useTranslation();
  const { setCurrentTab, updateLearningContext } = useLearning();

  const [activeQualType, setActiveQualType] = useState<'NATED' | 'NCV'>('NATED');
  const [selectedQualId, setSelectedQualId] = useState<string>('nated-n4');
  const [selectedProgId, setSelectedProgId] = useState<string>('prog-nated-n4-electrical');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('mod-n4-maths');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('top-n4-calculus');

  // Interactive Content States
  const [activeLesson, setActiveLesson] = useState<CurriculumLesson | null>(null);
  const [activePractice, setActivePractice] = useState<PracticeItem | null>(null);
  const [activeAssessment, setActiveAssessment] = useState<QuizItem | null>(null);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  // Filter qualifications by type
  const availableQuals = TVET_QUALIFICATIONS.filter(q => q.type === activeQualType);
  const currentQual = TVET_QUALIFICATIONS.find(q => q.id === selectedQualId) || availableQuals[3] || availableQuals[0];
  const currentProg = currentQual.programmes.find(p => p.id === selectedProgId) || currentQual.programmes[0];
  const currentModule = currentProg?.modules.find(m => m.id === selectedModuleId) || currentProg?.modules[0];
  const currentTopic = currentModule?.topics.find(top => top.id === selectedTopicId) || currentModule?.topics[0];

  const handleQualTypeSwitch = (type: 'NATED' | 'NCV') => {
    setActiveQualType(type);
    const quals = TVET_QUALIFICATIONS.filter(q => q.type === type);
    if (quals.length > 0) {
      setSelectedQualId(quals[0].id);
      if (quals[0].programmes[0]) {
        setSelectedProgId(quals[0].programmes[0].id);
        const mod = quals[0].programmes[0].modules[0];
        if (mod) {
          setSelectedModuleId(mod.id);
          if (mod.topics[0]) setSelectedTopicId(mod.topics[0].id);
        }
      }
    }
    setActiveLesson(null);
    setActivePractice(null);
    setActiveAssessment(null);
  };

  const handleQualSelect = (qualId: string) => {
    setSelectedQualId(qualId);
    const qual = TVET_QUALIFICATIONS.find(q => q.id === qualId);
    if (qual && qual.programmes[0]) {
      setSelectedProgId(qual.programmes[0].id);
      const mod = qual.programmes[0].modules[0];
      if (mod) {
        setSelectedModuleId(mod.id);
        if (mod.topics[0]) setSelectedTopicId(mod.topics[0].id);
      }
    }
    setActiveLesson(null);
    setActivePractice(null);
    setActiveAssessment(null);
  };

  const handleProgSelect = (progId: string) => {
    setSelectedProgId(progId);
    const prog = currentQual.programmes.find(p => p.id === progId);
    if (prog && prog.modules[0]) {
      setSelectedModuleId(prog.modules[0].id);
      if (prog.modules[0].topics[0]) setSelectedTopicId(prog.modules[0].topics[0].id);
    }
    setActiveLesson(null);
    setActivePractice(null);
    setActiveAssessment(null);
  };

  const handleAskTutor = (topicTitle: string) => {
    updateLearningContext({
      educationLevel: `TVET / ${currentQual.level}`,
      gradeOrProgramme: currentProg?.name || 'Engineering Studies',
      subject: currentModule?.name || 'Electrotechnics',
      topic: topicTitle,
      language: 'en',
      mode: 'explain'
    });
    setCurrentTab('tutor');
  };

  const toggleComplete = (id: string) => {
    setCompletedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Return to Home Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-2xs"
          aria-label="Return to Home Dashboard"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>
      </div>

      {/* Editorial Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1.5">
          <span>{APP_CONFIG.appName}</span>
          <span aria-hidden="true">·</span>
          <span>{t('pathwayTvetTitle')}</span>
          <span aria-hidden="true">·</span>
          <span>Technical & Vocational Colleges</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          TVET College Curriculum Hierarchy
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl leading-relaxed">
          Qualification → Programme → Subject / Module → Topic → Lesson → Practice → Assessment → Progress.
          Accredited NATED N1–N6 certificates and NC(V) Levels 2–4 vocational training standards.
        </p>

        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            <strong>Verified Syllabus Standard:</strong> Independent TVET framework aligned with South African occupational modules.
          </span>
        </div>
      </div>

      {/* TVET Academic Voice-to-Document Action Banner */}
      <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-900/15 via-slate-900/5 to-amber-500/10 border border-blue-200 dark:border-blue-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
              <span>TVET Practical Voice-to-Document</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 uppercase">
                TVET PoE Mode
              </span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Record workshop notes, tool observations, and practical tasks. Generate an OHS Act compliant Portfolio of Evidence (PoE) with an assessor sign-off block and downloadable PDF.
            </p>
          </div>
        </div>
        <button
          onClick={() => setCurrentTab('academicVoice')}
          className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition-transform active:scale-95 shrink-0"
        >
          <span>Voice-to-PoE</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Level Type Toggle (NATED vs NC(V)) */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-xl mb-6 max-w-md">
        <button
          onClick={() => handleQualTypeSwitch('NATED')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all min-h-[44px] ${
            activeQualType === 'NATED'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          NATED (N1 – N6)
        </button>
        <button
          onClick={() => handleQualTypeSwitch('NCV')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all min-h-[44px] ${
            activeQualType === 'NCV'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          NC(V) Vocational (L2 – L4)
        </button>
      </div>

      {/* Step 1: Qualification Levels (e.g. N1 to N6 or Level 2 to Level 4) */}
      <div className="mb-6">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">
          1. {t('hierarchyQualification')} Level
        </label>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {availableQuals.map(qual => {
            const isSelected = qual.id === selectedQualId;
            return (
              <button
                key={qual.id}
                onClick={() => handleQualSelect(qual.id)}
                className={`min-h-[44px] px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all select-none active:scale-95 ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-950 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {qual.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Programme Selection */}
      <div className="mb-6">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">
          2. {t('hierarchyProgramme')}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {currentQual.programmes.map(prog => {
            const isSelected = prog.id === selectedProgId;
            return (
              <button
                key={prog.id}
                onClick={() => handleProgSelect(prog.id)}
                className={`p-3.5 text-left rounded-xl border transition-all min-h-[50px] ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500 text-amber-900 dark:text-amber-200 font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">{prog.field}</span>
                  <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">{prog.modules.length} Modules</span>
                </div>
                <div className="text-xs sm:text-sm font-semibold truncate">{prog.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Module & Topic Viewer */}
      {currentProg && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-6">
          {/* Left Column: Modules & Topics (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              3. {t('hierarchySubjectModule')}s & 4. {t('hierarchyTopic')}s
            </h3>

            {currentProg.modules.map(mod => {
              const isModSelected = mod.id === selectedModuleId;
              return (
                <div
                  key={mod.id}
                  className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all overflow-hidden ${
                    isModSelected
                      ? 'border-amber-500 shadow-md ring-1 ring-amber-500/20'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div
                    onClick={() => {
                      setSelectedModuleId(mod.id);
                      if (mod.topics[0]) setSelectedTopicId(mod.topics[0].id);
                    }}
                    className="p-4 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                        {mod.code}
                      </span>
                      <span className="text-[11px] text-slate-400">{mod.creditHours} Nominal Hours</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                      {mod.name}
                    </h4>
                  </div>

                  {isModSelected && (
                    <div className="px-4 pb-4 pt-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Topics in this Module ({mod.topics.length})
                      </span>

                      {mod.topics.length === 0 ? (
                        <p className="text-xs text-slate-500 italic py-2">
                          Standard practical modules. Launch Nexovian AI to generate exercises.
                        </p>
                      ) : (
                        mod.topics.map(topic => {
                          const isTopSelected = topic.id === selectedTopicId;
                          return (
                            <div
                              key={topic.id}
                              onClick={() => {
                                setSelectedTopicId(topic.id);
                                if (topic.lessons[0]) setActiveLesson(topic.lessons[0]);
                                setActivePractice(null);
                                setActiveAssessment(null);
                              }}
                              className={`p-3 rounded-xl border text-xs cursor-pointer mb-2 transition-all ${
                                isTopSelected
                                  ? 'bg-amber-50 dark:bg-slate-800 border-amber-400 font-bold text-slate-900 dark:text-white'
                                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                              }`}
                            >
                              <div className="font-semibold">{topic.title}</div>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                                {topic.description}
                              </p>

                              {/* Lesson / Practice / Assessment triggers */}
                              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                                {topic.lessons.length > 0 && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveLesson(topic.lessons[0]);
                                      setActivePractice(null);
                                      setActiveAssessment(null);
                                    }}
                                    className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-amber-400 hover:text-slate-950 rounded text-[10px] font-semibold"
                                  >
                                    Lesson
                                  </button>
                                )}
                                {topic.practice.length > 0 && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActivePractice(topic.practice[0]);
                                      setActiveLesson(null);
                                      setActiveAssessment(null);
                                    }}
                                    className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-amber-400 hover:text-slate-950 rounded text-[10px] font-semibold"
                                  >
                                    Practice
                                  </button>
                                )}
                                {topic.assessment.length > 0 && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveAssessment(topic.assessment[0]);
                                      setActiveLesson(null);
                                      setActivePractice(null);
                                    }}
                                    className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-amber-400 hover:text-slate-950 rounded text-[10px] font-semibold"
                                  >
                                    Assessment
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}

                      <button
                        onClick={() => handleAskTutor(`${mod.name} ${currentQual.level}`)}
                        className="w-full mt-2 py-2 px-3 bg-amber-400/20 hover:bg-amber-400/30 text-amber-800 dark:text-amber-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Ask AI Tutor for Step-by-Step {mod.name} Help</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: TVET Interactive Lesson, Calculation Practice & Assessment (7 cols) */}
          <div className="lg:col-span-7">
            {activeLesson ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified TVET Framework</span>
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {activeLesson.curriculumCode}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">{activeLesson.readTimeMinutes} min</span>
                </div>

                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  5. {activeLesson.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeLesson.overview}
                </p>

                <div className="mt-5 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Accredited Technical Formulas & Principles
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    {activeLesson.keyConcepts.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => toggleComplete(activeLesson.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                      completedItems[activeLesson.id]
                        ? 'bg-emerald-500 text-white border-transparent'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{completedItems[activeLesson.id] ? 'Completed Module' : 'Mark Completed'}</span>
                  </button>

                  <button
                    onClick={() => handleAskTutor(activeLesson.title)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ask Nexovian AI</span>
                  </button>
                </div>
              </div>
            ) : activePractice ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    6. {t('hierarchyPractice')} Calculation
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-slate-500">
                    TVET Exam Preparation
                  </span>
                </div>

                <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {activePractice.prompt}
                </h3>

                <div className="mt-5 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Technical Solution
                  </span>
                  <p className="text-xs sm:text-sm font-mono text-slate-900 dark:text-white leading-relaxed">
                    {activePractice.sampleSolution}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => toggleComplete(activePractice.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                      completedItems[activePractice.id]
                        ? 'bg-emerald-500 text-white border-transparent'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{completedItems[activePractice.id] ? 'Solved' : 'Mark Solved'}</span>
                  </button>

                  <button
                    onClick={() => handleAskTutor(`Guide me step by step on this TVET problem: ${activePractice.prompt}`)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Solve With AI Tutor</span>
                  </button>
                </div>
              </div>
            ) : activeAssessment ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    7. {t('hierarchyAssessment')} Question
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-slate-500">
                    Accredited Check
                  </span>
                </div>

                <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mb-4">
                  {activeAssessment.question}
                </h3>

                <div className="space-y-2">
                  {activeAssessment.options.map((option, oIdx) => {
                    const isSelected = selectedQuizOption === oIdx;
                    const isCorrect = oIdx === activeAssessment.correctIndex;
                    let optionStyle = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200';

                    if (quizSubmitted) {
                      if (isCorrect) {
                        optionStyle = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'bg-red-50 dark:bg-red-950/50 border-red-500 text-red-800 dark:text-red-300';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-amber-500/10 border-amber-500 text-amber-900 dark:text-amber-300 font-semibold';
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={quizSubmitted}
                        onClick={() => setSelectedQuizOption(oIdx)}
                        className={`w-full p-3.5 text-left rounded-xl border text-xs sm:text-sm flex items-center justify-between min-h-[44px] ${optionStyle}`}
                      >
                        <span>{option}</span>
                        {quizSubmitted && isCorrect && <Check className="w-4 h-4 text-emerald-500" />}
                        {quizSubmitted && isSelected && !isCorrect && <X className="w-4 h-4 text-red-500" />}
                      </button>
                    );
                  })}
                </div>

                {!quizSubmitted ? (
                  <button
                    disabled={selectedQuizOption === null}
                    onClick={() => {
                      setQuizSubmitted(true);
                      if (selectedQuizOption === activeAssessment.correctIndex) {
                        toggleComplete(activeAssessment.id);
                      }
                    }}
                    className="w-full mt-5 py-2.5 bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-950 rounded-xl font-bold text-xs shadow-sm disabled:opacity-50"
                  >
                    Check Assessment
                  </button>
                ) : (
                  <div className="mt-5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {activeAssessment.explanation}
                    </p>
                    <button
                      onClick={() => {
                        setQuizSubmitted(false);
                        setSelectedQuizOption(null);
                      }}
                      className="mt-3 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      {t('btnTryAgain')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center shadow-sm">
                <Wrench className="w-12 h-12 text-amber-500/80 mx-auto mb-3" />
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  8. TVET {t('hierarchyProgress')} Tracker
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-md mx-auto leading-relaxed">
                  Select a module topic from the list to view verified technical lessons, engineering practice calculations, and accredited assessments.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
