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
  APP_LEVELS,
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
    availableSubjects.find((s) => s.name === learningContext.subject) || null;

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

  const handleSelectLevel = (levelName: string, categoryName: string, keepSubjectOpen = false) => {
    const currentScrollY = window.scrollY;
    const subjectsForNewLevel = getSubjectsForLevel(levelName);
    
    // Check if the current subject exists in the newly selected grade/pathway
    const matchingSubject = subjectsForNewLevel.find(
      (s) => s.name.toLowerCase() === (learningContext.subject || '').toLowerCase()
    );

    let nextSubject = '';
    let nextTopic = '';

    if (matchingSubject) {
      nextSubject = matchingSubject.name;
      // Retain topic if it exists or matches closely in the subject's topic list for this level
      const matchingTopic = learningContext.topic && matchingSubject.topics.find(
        (t) => t.toLowerCase() === learningContext.topic.toLowerCase() ||
               t.toLowerCase().includes(learningContext.topic.toLowerCase()) ||
               learningContext.topic.toLowerCase().includes(t.toLowerCase())
      );
      if (matchingTopic) {
        nextTopic = matchingTopic;
      } else {
        nextTopic = '';
      }
    } else {
      // Incompatible old subject: clear subject and topic so learner can choose their own
      nextSubject = '';
      nextTopic = '';
    }

    updateLearningContext({
      educationLevel: categoryName,
      gradeOrProgramme: levelName,
      subject: nextSubject,
      topic: nextTopic
    });

    if (isAuthenticated) {
      updateProfile({
        educationLevel: categoryName,
        gradeOrProgramme: levelName
      }).catch(() => {});
    }

    setIsLevelOpen(false);
    // If keepSubjectOpen is requested (from inside the level selector) or if subject was cleared, keep subject menu open
    if (keepSubjectOpen || !nextSubject) {
      setIsSubjectOpen(true);
    } else {
      setIsSubjectOpen(false);
    }

    requestAnimationFrame(() => {
      window.scrollTo({ top: currentScrollY, behavior: 'instant' });
      setTimeout(() => window.scrollTo({ top: currentScrollY, behavior: 'instant' }), 50);
    });
  };

  const handleSelectLevelQuick = (lvl: string) => {
    const cat = EDUCATION_SYSTEM.find((c) => c.levels.includes(lvl));
    const catName = cat ? cat.name : 'School';
    handleSelectLevel(lvl, catName, true);
  };

  const handleSelectSubject = (subjectName: string) => {
    const currentScrollY = window.scrollY;
    const subjectsForCurrentLevel = getSubjectsForLevel(learningContext.gradeOrProgramme);
    const subj = subjectsForCurrentLevel.find((s) => s.name.toLowerCase() === subjectName.toLowerCase());
    // Changing the subject must clear any incompatible old topic
    const topicStillValid = subj ? subj.topics.includes(learningContext.topic) : false;
    const nextTopic = topicStillValid ? learningContext.topic : '';

    updateLearningContext({
      subject: subj ? subj.name : subjectName,
      topic: nextTopic
    });

    requestAnimationFrame(() => {
      window.scrollTo({ top: currentScrollY, behavior: 'instant' });
      setTimeout(() => window.scrollTo({ top: currentScrollY, behavior: 'instant' }), 50);
    });
  };

  const handleSelectTopic = (topicName: string) => {
    const currentScrollY = window.scrollY;
    updateLearningContext({ topic: topicName });
    setIsSubjectOpen(false);

    requestAnimationFrame(() => {
      window.scrollTo({ top: currentScrollY, behavior: 'instant' });
      setTimeout(() => window.scrollTo({ top: currentScrollY, behavior: 'instant' }), 50);
    });
  };

  const handleClearSubjectOrTopic = () => {
    const currentScrollY = window.scrollY;
    updateLearningContext({ subject: '', topic: '' });

    requestAnimationFrame(() => {
      window.scrollTo({ top: currentScrollY, behavior: 'instant' });
      setTimeout(() => window.scrollTo({ top: currentScrollY, behavior: 'instant' }), 50);
    });
  };

  const handleSelectLanguage = (code: string) => {
    const currentScrollY = window.scrollY;
    updateLearningContext({ language: code as any });
    if (isAuthenticated) {
      updateProfile({ preferredLanguage: code }).catch(() => {});
    }
    setIsLanguageOpen(false);

    requestAnimationFrame(() => {
      window.scrollTo({ top: currentScrollY, behavior: 'instant' });
      setTimeout(() => window.scrollTo({ top: currentScrollY, behavior: 'instant' }), 50);
    });
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
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                !learningContext.subject
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700 animate-pulse'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 text-slate-900 dark:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-500" />
              <span className="truncate max-w-[180px] sm:max-w-[300px]">
                {learningContext.subject
                  ? learningContext.topic
                    ? `${learningContext.subject}: ${learningContext.topic}`
                    : `${learningContext.subject} (Select Topic)`
                  : 'Choose Subject & Topic'}
              </span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {isSubjectOpen && (
              <div
                className="absolute top-full left-0 mt-2 max-h-[85vh] sm:max-h-[540px] overflow-y-auto bg-[#0F172A] border border-slate-700/90 rounded-2xl shadow-2xl z-50 p-3 sm:p-4 space-y-4 text-xs text-white"
                style={{
                  width: 'min(95vw, 680px)',
                  minWidth: '320px',
                  maxWidth: '95vw',
                }}
              >
                <div>
                  <div className="flex items-center justify-between px-1 mb-2">
                    <span className="font-bold text-xs uppercase tracking-wider text-[#facc15] font-mono">
                      1. SELECT LEVEL &amp; SUBJECT
                    </span>
                    {learningContext.subject && (
                      <button
                        onClick={handleClearSubjectOrTopic}
                        className="text-xs text-[#facc15] hover:underline font-semibold cursor-pointer"
                      >
                        Clear Selection
                      </button>
                    )}
                  </div>

                  {/* Level Selector FIRST before subject */}
                  <div className="mb-3.5 bg-slate-900/95 p-2.5 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
                      <span className="flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-[#facc15]" />
                        <span>Select Level:</span>
                      </span>
                      <span className="text-[#facc15] font-mono lowercase">
                        active: {learningContext.gradeOrProgramme || 'Grade 10'}
                      </span>
                    </div>

                    {/* Level buttons: Grade 4 to University */}
                    <div className="flex flex-wrap gap-1.5">
                      {APP_LEVELS.map((lvl) => {
                        const isCurrent = (learningContext.gradeOrProgramme || 'Grade 10') === lvl;
                        return (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => handleSelectLevelQuick(lvl)}
                            className={`px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                              isCurrent
                                ? 'bg-[#facc15] text-[#0F172A] font-black shadow-md ring-2 ring-yellow-400'
                                : 'bg-slate-800/90 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700/80 font-medium'
                            }`}
                          >
                            {lvl}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Subject Sub-header for selected level */}
                  <div className="px-1 mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-200">
                      Subjects for <span className="text-[#facc15] font-bold">{learningContext.gradeOrProgramme || 'Grade 10'}</span>:
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {availableSubjects.length} subjects
                    </span>
                  </div>

                  {/* 2-column grid with auto-height buttons showing full text */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5 px-0.5 mb-2">
                    {availableSubjects.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => handleSelectSubject(s.name)}
                        className={`rounded-xl text-center flex items-center justify-center transition-all cursor-pointer font-medium ${
                          learningContext.subject === s.name
                            ? 'bg-[#facc15] text-slate-950 font-bold shadow-md ring-2 ring-yellow-400/60'
                            : 'bg-slate-800/90 text-slate-100 hover:bg-slate-800 hover:text-white border border-slate-700 hover:border-yellow-400/40'
                        }`}
                        style={{
                          whiteSpace: 'normal',
                          overflow: 'visible',
                          textOverflow: 'clip',
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                          lineHeight: 1.2,
                          minHeight: '42px',
                          height: 'auto',
                          padding: '8px 12px',
                          fontSize: '13px',
                          textAlign: 'center'
                        }}
                      >
                        <span
                          className="w-full text-center"
                          style={{
                            whiteSpace: 'normal',
                            overflow: 'visible',
                            textOverflow: 'clip',
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word',
                            lineHeight: 1.2,
                            fontSize: '13px'
                          }}
                        >
                          {s.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <span className="font-bold text-xs uppercase tracking-wider text-[#facc15] px-1 block mb-2 font-mono">
                    {learningContext.subject
                      ? `2. SELECT TOPIC (${learningContext.subject})`
                      : '2. SELECT TOPIC (Choose a subject above first)'}
                  </span>
                  {currentSubjectObj ? (
                    <div className="space-y-1.5">
                      {/* Option for open subject questions */}
                      <button
                        type="button"
                        onClick={() => handleSelectTopic('')}
                        className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between text-xs transition-colors cursor-pointer ${
                          !learningContext.topic
                            ? 'bg-yellow-400/20 text-[#facc15] font-bold border border-yellow-400/40'
                            : 'hover:bg-slate-800 text-slate-300 border border-transparent'
                        }`}
                      >
                        <span className="italic">All Topics / Ask Any Question</span>
                        {!learningContext.topic && (
                          <Check className="w-3.5 h-3.5 text-[#facc15] shrink-0" />
                        )}
                      </button>
                      {currentSubjectObj.topics.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => handleSelectTopic(t)}
                          className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between text-xs transition-colors cursor-pointer ${
                            learningContext.topic === t
                              ? 'bg-yellow-400/20 text-[#facc15] font-bold border border-yellow-400/40'
                              : 'hover:bg-slate-800 text-slate-300 border border-transparent'
                          }`}
                        >
                          <span className="break-words leading-relaxed">{t}</span>
                          {learningContext.topic === t && (
                            <Check className="w-3.5 h-3.5 text-[#facc15] shrink-0 ml-2" />
                          )}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-slate-400 text-xs italic bg-slate-900/60 rounded-xl border border-dashed border-slate-800">
                      Select a subject above to view curriculum topics.
                    </div>
                  )}
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
                      const currentScrollY = window.scrollY;
                      updateLearningContext({ mode: m.id as any });
                      setIsModeOpen(false);
                      requestAnimationFrame(() => {
                        window.scrollTo({ top: currentScrollY, behavior: 'instant' });
                        setTimeout(() => window.scrollTo({ top: currentScrollY, behavior: 'instant' }), 50);
                      });
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
