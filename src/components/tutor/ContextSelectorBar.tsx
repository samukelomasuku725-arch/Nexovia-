import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Globe,
  Sparkles,
  ChevronDown,
  Volume2,
  VolumeX,
  Check,
  FileText,
  PenTool,
  HelpCircle
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useAuth } from '../../context/AuthContext';
import { AITutorMode } from '../../types';
import {
  EDUCATION_SYSTEM,
  getSubjectsForLevel,
  SA_OFFICIAL_LANGUAGES,
  SubjectDemo
} from '../../data/educationData';

export const ContextSelectorBar: React.FC = () => {
  const { learningContext, updateLearningContext } = useLearning();
  const { user, updateProfile, isAuthenticated } = useAuth();

  const [isLevelOpen, setIsLevelOpen] = useState(false);
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isModeOpen, setIsModeOpen] = useState(false);

  const availableSubjects: SubjectDemo[] = getSubjectsForLevel(learningContext.gradeOrProgramme);
  const currentSubjectObj =
    availableSubjects.find((s) => s.name === learningContext.subject) || availableSubjects[0];

  const currentLangObj =
    SA_OFFICIAL_LANGUAGES.find((l) => l.code === learningContext.language) ||
    SA_OFFICIAL_LANGUAGES[0];

  const modes: { id: AITutorMode; label: string; desc: string }[] = [
    { id: 'explain', label: 'Explain', desc: 'Systematic explanation with real-world examples and step-by-step logic.' },
    { id: 'simplify', label: 'Simplify', desc: 'Turn complex concepts into plain language with intuitive everyday analogies.' },
    { id: 'summarize', label: 'Summarize', desc: 'High-yield revision notes, key definitions, and core formulas.' },
    { id: 'translate', label: 'Translate', desc: 'Translate educational content into the selected South African language.' },
    { id: 'practice', label: 'Practice', desc: 'Interactive problem-solving challenges and conceptual practice.' },
    { id: 'homework_help', label: 'Homework Help', desc: 'Socratic step-by-step guidance without just giving away answers.' },
    { id: 'quiz_help', label: 'Quiz Help', desc: 'Socratic hint & reasoning guidance without giving away the direct answer.' },
    { id: 'study_plan', label: 'Study Plan', desc: 'Customized timetable, topic milestones, and exam readiness strategy.' }
  ];

  const currentModeObj =
    modes.find((m) => m.id === learningContext.mode) || modes[0];

  const handleSelectLevel = (levelName: string, categoryName: string) => {
    const subjectsForNewLevel = getSubjectsForLevel(levelName);
    const defaultSubject = subjectsForNewLevel[0]?.name || 'Mathematics';
    const defaultTopic = subjectsForNewLevel[0]?.topics[0] || 'General Concepts';

    updateLearningContext({
      educationLevel: categoryName,
      gradeOrProgramme: levelName,
      subject: defaultSubject,
      topic: defaultTopic
    });

    if (isAuthenticated) {
      updateProfile({
        educationLevel: categoryName,
        gradeOrProgramme: levelName
      }).catch(() => {});
    }

    setIsLevelOpen(false);
  };

  const handleSelectSubject = (subjectName: string) => {
    const subj = availableSubjects.find((s) => s.name === subjectName);
    const defaultTopic = subj?.topics[0] || 'General Concepts';

    updateLearningContext({
      subject: subjectName,
      topic: defaultTopic
    });
    setIsSubjectOpen(false);
  };

  const handleSelectTopic = (topicName: string) => {
    updateLearningContext({ topic: topicName });
    setIsSubjectOpen(false);
  };

  const handleSelectLanguage = (code: string) => {
    updateLearningContext({ language: code as any });
    if (isAuthenticated) {
      updateProfile({ preferredLanguage: code }).catch(() => {});
    }
    setIsLanguageOpen(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 p-2.5 sm:p-3 transition-colors shrink-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-3">
        {/* Left: Education Level -> Subject -> Topic */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Level Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsLevelOpen(!isLevelOpen);
                setIsSubjectOpen(false);
                setIsLanguageOpen(false);
                setIsModeOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg text-xs font-semibold transition-colors"
            >
              <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
              <span className="truncate max-w-[120px] sm:max-w-[150px]">
                {learningContext.gradeOrProgramme || 'Grade 10'}
              </span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {isLevelOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-64 max-h-80 overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl z-50 p-2 space-y-2 text-xs">
                {EDUCATION_SYSTEM.map((cat) => (
                  <div key={cat.id} className="space-y-1">
                    <span className="font-bold text-[10px] uppercase tracking-wider text-slate-400 px-2 block">
                      {cat.name}
                    </span>
                    {cat.levels.map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => handleSelectLevel(lvl, cat.name)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                          learningContext.gradeOrProgramme === lvl
                            ? 'bg-amber-400/20 text-amber-700 dark:text-amber-300 font-bold'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>{lvl}</span>
                        {learningContext.gradeOrProgramme === lvl && (
                          <Check className="w-3.5 h-3.5 text-amber-500" />
                        )}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <span className="text-slate-300 dark:text-slate-700">/</span>

          {/* Subject & Topic Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsSubjectOpen(!isSubjectOpen);
                setIsLevelOpen(false);
                setIsLanguageOpen(false);
                setIsModeOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg text-xs font-semibold transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-500" />
              <span className="truncate max-w-[130px] sm:max-w-[180px]">
                {learningContext.subject}: {learningContext.topic}
              </span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {isSubjectOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-80 max-h-88 overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl z-50 p-2 space-y-3 text-xs">
                <div>
                  <span className="font-bold text-[10px] uppercase tracking-wider text-slate-400 px-2 block mb-1">
                    Select Subject
                  </span>
                  <div className="grid grid-cols-2 gap-1 px-1 mb-2">
                    {availableSubjects.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => handleSelectSubject(s.name)}
                        className={`px-2 py-1.5 rounded-lg text-left text-xs truncate transition-colors ${
                          learningContext.subject === s.name
                            ? 'bg-amber-500 text-slate-950 font-bold'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-[10px] uppercase tracking-wider text-slate-400 px-2 block mb-1">
                    Select Topic ({learningContext.subject})
                  </span>
                  <div className="space-y-1">
                    {currentSubjectObj.topics.map((t) => (
                      <button
                        key={t}
                        onClick={() => handleSelectTopic(t)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between text-xs transition-colors ${
                          learningContext.topic === t
                            ? 'bg-amber-400/20 text-amber-700 dark:text-amber-300 font-bold'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span className="truncate">{t}</span>
                        {learningContext.topic === t && (
                          <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Language Selector & Mode Selector */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Language Selector (Distinguishing Text Language vs Voice) */}
          <div className="relative">
            <button
              onClick={() => {
                setIsLanguageOpen(!isLanguageOpen);
                setIsLevelOpen(false);
                setIsSubjectOpen(false);
                setIsModeOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-900 dark:text-white rounded-lg text-xs font-semibold transition-colors"
              title="Select language"
            >
              <Globe className="w-3.5 h-3.5 text-amber-500" />
              <span>{currentLangObj.name}</span>
              {currentLangObj.hasVoice ? (
                <span title="Voice available (English/Afrikaans)">
                  <Volume2 className="w-3 h-3 text-emerald-500 ml-0.5" />
                </span>
              ) : (
                <span title="Text translation only (Voice unavailable)">
                  <VolumeX className="w-3 h-3 text-slate-400 ml-0.5" />
                </span>
              )}
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {isLanguageOpen && (
              <div className="absolute top-full right-0 mt-1.5 w-72 max-h-80 overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl z-50 p-2 space-y-1 text-xs">
                <div className="p-2 bg-slate-50 dark:bg-slate-950 rounded-lg mb-2 text-[11px] text-slate-500">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-0.5">
                    South African Languages
                  </span>
                  Voice read-aloud is strictly enabled for English and Afrikaans. Text translation applies to all 11 languages.
                </div>

                {SA_OFFICIAL_LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => handleSelectLanguage(l.code)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                      learningContext.language === l.code
                        ? 'bg-amber-400/20 text-amber-700 dark:text-amber-300 font-bold'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-semibold flex items-center gap-1.5">
                        <span>{l.name}</span>
                        {l.code === 'ts' && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-400 text-slate-950 uppercase">
                            Native Engine
                          </span>
                        )}
                      </div>
                      <span className={`text-[10px] block ${l.code === 'ts' ? 'text-amber-600 dark:text-amber-400 font-bold' : l.hasVoice ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-slate-400'}`}>
                        {l.code === 'ts' ? '● Native Verified Engine (80 Phrases)' : l.hasVoice ? '● Voice Audio Available' : '○ Text Translation Only'}
                      </span>
                    </div>
                    {learningContext.language === l.code && (
                      <Check className="w-3.5 h-3.5 text-amber-500" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mode Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setIsModeOpen(!isModeOpen);
                setIsLevelOpen(false);
                setIsSubjectOpen(false);
                setIsLanguageOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentModeObj.label}</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>

            {isModeOpen && (
              <div className="absolute top-full right-0 mt-1.5 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl z-50 p-2 space-y-1 text-xs">
                {modes.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      updateLearningContext({ mode: m.id as any });
                      setIsModeOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg transition-colors ${
                      learningContext.mode === m.id
                        ? 'bg-amber-400/20 text-amber-800 dark:text-amber-300 font-bold'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="font-bold">{m.label}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-normal leading-tight mt-0.5">
                      {m.desc}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
