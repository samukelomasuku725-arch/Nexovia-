/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  GraduationCap, 
  Building2, 
  BookOpen, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Plus, 
  CheckCircle2, 
  X,
  Search,
  School,
  Mic,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { HIGHER_ED_INSTITUTIONS, HigherEdInstitution, HigherEdFaculty, HigherEdProgramme, HigherEdModule, HigherEdTopic, CurriculumLesson, QuizItem } from '../../data/curriculumData';
import { useTranslation } from '../../i18n/I18nContext';
import { useLearning } from '../../context/LearningContext';
import { APP_CONFIG } from '../../config/brand';

export const HigherEdPathwayView: React.FC = () => {
  const { t } = useTranslation();
  const { setCurrentTab, updateLearningContext } = useLearning();

  const [institutions, setInstitutions] = useState<HigherEdInstitution[]>(HIGHER_ED_INSTITUTIONS);
  const [selectedInstId, setSelectedInstId] = useState<string>('uct');
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>('uct-ebe');
  const [selectedProgId, setSelectedProgId] = useState<string>('uct-beng-elec');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('uct-eee2046f');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('uct-top-fourier');

  // Custom institution dialog state
  const [isAddingInst, setIsAddingInst] = useState<boolean>(false);
  const [customInstName, setCustomInstName] = useState<string>('');
  const [customFacultyName, setCustomFacultyName] = useState<string>('');

  // Interactive Content States
  const [activeLesson, setActiveLesson] = useState<CurriculumLesson | null>(null);
  const [activeAssessment, setActiveAssessment] = useState<QuizItem | null>(null);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  const currentInst = institutions.find(i => i.id === selectedInstId) || institutions[0];
  const currentFaculty = currentInst.faculties.find(f => f.id === selectedFacultyId) || currentInst.faculties[0];
  const currentProg = currentFaculty?.programmes.find(p => p.id === selectedProgId) || currentFaculty?.programmes[0];
  const currentModule = currentProg?.modules.find(m => m.id === selectedModuleId) || currentProg?.modules[0];
  const currentTopic = currentModule?.topics.find(top => top.id === selectedTopicId) || currentModule?.topics[0];

  const handleInstSelect = (instId: string) => {
    setSelectedInstId(instId);
    const inst = institutions.find(i => i.id === instId);
    if (inst && inst.faculties[0]) {
      setSelectedFacultyId(inst.faculties[0].id);
      if (inst.faculties[0].programmes[0]) {
        setSelectedProgId(inst.faculties[0].programmes[0].id);
        const mod = inst.faculties[0].programmes[0].modules[0];
        if (mod) {
          setSelectedModuleId(mod.id);
          if (mod.topics[0]) setSelectedTopicId(mod.topics[0].id);
        }
      }
    }
    setActiveLesson(null);
    setActiveAssessment(null);
  };

  const handleFacultySelect = (facId: string) => {
    setSelectedFacultyId(facId);
    const fac = currentInst.faculties.find(f => f.id === facId);
    if (fac && fac.programmes[0]) {
      setSelectedProgId(fac.programmes[0].id);
      const mod = fac.programmes[0].modules[0];
      if (mod) {
        setSelectedModuleId(mod.id);
        if (mod.topics[0]) setSelectedTopicId(mod.topics[0].id);
      }
    }
    setActiveLesson(null);
    setActiveAssessment(null);
  };

  const handleProgSelect = (progId: string) => {
    setSelectedProgId(progId);
    const prog = currentFaculty.programmes.find(p => p.id === progId);
    if (prog && prog.modules[0]) {
      setSelectedModuleId(prog.modules[0].id);
      if (prog.modules[0].topics[0]) setSelectedTopicId(prog.modules[0].topics[0].id);
    }
    setActiveLesson(null);
    setActiveAssessment(null);
  };

  const handleAddCustomInstitution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInstName.trim()) return;

    const newId = `custom-${Date.now()}`;
    const newInst: HigherEdInstitution = {
      id: newId,
      name: customInstName.trim(),
      shortName: customInstName.trim().slice(0, 6).toUpperCase(),
      location: 'South Africa',
      province: 'National',
      type: 'Comprehensive University',
      faculties: [
        {
          id: `${newId}-fac-1`,
          name: customFacultyName.trim() || 'General Faculty',
          programmes: [
            {
              id: `${newId}-prog-1`,
              name: 'Undergraduate Diploma & Degree Modules',
              qualification: 'Degree / Diploma',
              durationYears: 3,
              modules: [
                {
                  id: `${newId}-mod-1`,
                  code: 'MOD101',
                  name: 'Foundational Academic Principles',
                  credits: 16,
                  academicYear: 1,
                  semester: 1,
                  topics: [
                    {
                      id: `${newId}-top-1`,
                      title: 'Core Methodologies & Research Analysis',
                      summary: 'Academic principles customized for your course.',
                      lessons: [],
                      assessment: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };

    setInstitutions(prev => [...prev, newInst]);
    setSelectedInstId(newId);
    setSelectedFacultyId(newInst.faculties[0].id);
    setSelectedProgId(newInst.faculties[0].programmes[0].id);
    setSelectedModuleId(newInst.faculties[0].programmes[0].modules[0].id);
    setSelectedTopicId(newInst.faculties[0].programmes[0].modules[0].topics[0].id);
    setIsAddingInst(false);
    setCustomInstName('');
    setCustomFacultyName('');
  };

  const handleAskTutor = (topicTitle: string) => {
    updateLearningContext({
      educationLevel: 'Higher Education',
      gradeOrProgramme: `${currentInst.name} · ${currentProg?.name}`,
      subject: currentModule?.name || 'Higher Education Course',
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
          <span>{t('pathwayHigherEdTitle')}</span>
          <span aria-hidden="true">·</span>
          <span>Universities & Colleges</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          Higher Education Multi-Institution Architecture
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl leading-relaxed">
          Institution → Faculty → Programme → Qualification → Module → Topic → Lesson → Assessment → Progress.
          Scalable multi-institution support covering public universities, comprehensive universities, and private colleges.
        </p>

        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            <strong>Multi-Institution Standard:</strong> Not limited to one institution. Explore premier South African universities or configure your college.
          </span>
        </div>
      </div>

      {/* Academic Voice-to-Document Action Banner */}
      <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-900/15 via-slate-900/5 to-amber-500/10 border border-purple-200 dark:border-purple-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
              <span>Academic Voice-to-Document</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 uppercase">
                University Mode
              </span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Record spoken lectures, research thoughts, or assignment ideas and convert them into organized academic essays and downloadable A4 PDFs.
            </p>
          </div>
        </div>
        <button
          onClick={() => setCurrentTab('academicVoice')}
          className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-sm transition-transform active:scale-95 shrink-0"
        >
          <span>Voice-to-Document</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Step 1: Multi-Institution Selector Carousel */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            1. {t('hierarchyInstitution')} ({institutions.length} Available)
          </label>
          <button
            onClick={() => setIsAddingInst(!isAddingInst)}
            className="flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Custom Institution</span>
          </button>
        </div>

        {/* Custom Institution Modal/Drawer */}
        {isAddingInst && (
          <form onSubmit={handleAddCustomInstitution} className="p-4 bg-amber-500/10 dark:bg-amber-400/5 rounded-2xl border border-amber-500/20 mb-4 max-w-lg">
            <h4 className="text-xs font-bold uppercase text-slate-800 dark:text-slate-200 mb-2">
              Configure Your College or University
            </h4>
            <div className="space-y-2">
              <input
                type="text"
                value={customInstName}
                onChange={e => setCustomInstName(e.target.value)}
                placeholder="e.g. Durban University of Technology, Rhodes University, etc."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                required
              />
              <input
                type="text"
                value={customFacultyName}
                onChange={e => setCustomFacultyName(e.target.value)}
                placeholder="Faculty (e.g. Faculty of Accounting & Informatics)"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-amber-400 text-slate-950 font-bold text-xs rounded-lg shadow-sm"
                >
                  Save Institution
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingInst(false)}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Institutions Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {institutions.map(inst => {
            const isSelected = inst.id === selectedInstId;
            return (
              <button
                key={inst.id}
                onClick={() => handleInstSelect(inst.id)}
                className={`min-h-[44px] px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all select-none active:scale-95 ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-950 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{inst.shortName || inst.name}</span>
                <span className="text-[10px] ml-1.5 opacity-60">({inst.location.split(',')[0]})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Faculty Selection */}
      <div className="mb-6">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">
          2. {t('hierarchyFaculty')}
        </label>
        <div className="flex flex-wrap gap-2">
          {currentInst.faculties.map(faculty => {
            const isSelected = faculty.id === selectedFacultyId;
            return (
              <button
                key={faculty.id}
                onClick={() => handleFacultySelect(faculty.id)}
                className={`min-h-[44px] px-4 py-2 text-xs font-medium rounded-xl border transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500 text-amber-900 dark:text-amber-300 font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {faculty.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Programme & Qualification Selection */}
      {currentFaculty && (
        <div className="mb-6">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">
            3. {t('hierarchyProgramme')} & 4. {t('hierarchyDegree')}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentFaculty.programmes.map(prog => {
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
                    <span className="text-[10px] font-mono text-slate-400 uppercase">{prog.qualification}</span>
                    <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">{prog.durationYears} Years</span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold truncate">{prog.name}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 5: Module, Topic, Lesson, and Assessment Drilldown */}
      {currentProg && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-6">
          {/* Left Column: Academic Modules & Topics (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              5. {t('hierarchyModule')}s & 6. {t('hierarchyTopic')}s
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
                      <span className="text-[11px] text-slate-400">
                        Year {mod.academicYear} · Semester {mod.semester} · {mod.credits} Credits
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                      {mod.name}
                    </h4>
                  </div>

                  {isModSelected && (
                    <div className="px-4 pb-4 pt-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Topics in {mod.code} ({mod.topics.length})
                      </span>

                      {mod.topics.length === 0 ? (
                        <p className="text-xs text-slate-500 italic py-2">
                          University lecture modules configured. Launch Nexovian AI for specialized syllabus assistance.
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
                                {topic.summary}
                              </p>

                              {/* Lesson and Assessment action buttons */}
                              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                                {topic.lessons.length > 0 && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveLesson(topic.lessons[0]);
                                      setActiveAssessment(null);
                                    }}
                                    className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-amber-400 hover:text-slate-950 rounded text-[10px] font-semibold"
                                  >
                                    Lesson
                                  </button>
                                )}
                                {topic.assessment.length > 0 && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveAssessment(topic.assessment[0]);
                                      setActiveLesson(null);
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
                        onClick={() => handleAskTutor(`${mod.name} (${mod.code}) at ${currentInst.name}`)}
                        className="w-full mt-2 py-2 px-3 bg-amber-400/20 hover:bg-amber-400/30 text-amber-800 dark:text-amber-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Ask AI Tutor for {mod.code} Assistance</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Interactive Lesson, Theoretical Proof & Assessment (7 cols) */}
          <div className="lg:col-span-7">
            {activeLesson ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Higher Ed Accredited Framework</span>
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {activeLesson.curriculumCode}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">{activeLesson.readTimeMinutes} min</span>
                </div>

                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  7. {activeLesson.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeLesson.overview}
                </p>

                <div className="mt-5 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Theoretical Foundation & Rigor
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
                    <span>{completedItems[activeLesson.id] ? 'Completed Topic' : 'Mark Completed'}</span>
                  </button>

                  <button
                    onClick={() => handleAskTutor(activeLesson.title)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ask AI Tutor to Explain</span>
                  </button>
                </div>
              </div>
            ) : activeAssessment ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    8. {t('hierarchyAssessment')} Question
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-slate-500">
                    University Standard Check
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
                <GraduationCap className="w-12 h-12 text-amber-500/80 mx-auto mb-3" />
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  9. University {t('hierarchyProgress')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-md mx-auto leading-relaxed">
                  Select a module topic to inspect academic lecture summaries, proof methodologies, and problem sets.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
