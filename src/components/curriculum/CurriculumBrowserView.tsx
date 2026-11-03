import React, { useState, useMemo, useEffect } from 'react';
import {
  School,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Award,
  ArrowLeft,
  Calendar,
  Layers,
  Search,
  Check,
  X,
  Lightbulb,
  Clock,
  Zap,
  Globe,
  Sliders,
  AlertTriangle,
  RotateCcw,
  Target,
  ArrowRight,
  Info,
  Flame,
  LayoutDashboard,
  FileText
} from 'lucide-react';
import { curriculumEngine } from '../../services/curriculum/curriculumEngine';
import {
  CurriculumLessonModel,
  CurriculumSearchResult,
  SouthAfricanPhaseId,
  SubjectModel,
  TopicModel
} from '../../types/curriculum';
import { useLearning } from '../../context/LearningContext';
import { useTranslation } from '../../i18n/I18nContext';
import { SA_LANGUAGES } from '../../data/learningContextData';
import { SALanguageCode } from '../../types';
import { SOURCE_CLASSIFICATION_INFO } from '../../config/curriculumConfig';
import { CurriculumSearchModal } from './CurriculumSearchModal';
import { CurriculumAdminManagerModal } from './CurriculumAdminManagerModal';
import { LearnerCurriculumDashboard } from './LearnerCurriculumDashboard';
import { AdaptivePracticeSessionModal } from '../adaptive/AdaptivePracticeSessionModal';
import { multilingualEducationalService } from '../../services/language/multilingualEducationalService';
import { PastPapersTab } from './PastPapersTab';

export const CurriculumBrowserView: React.FC = () => {
  const {
    setCurrentTab,
    learningContext,
    updateLearningContext,
    markLessonComplete,
    userProgress,
    adaptiveProfile,
    sendMessageToTutor,
    activeLearningLanguage,
    setActiveLearningLanguage
  } = useLearning();

  const { language } = useTranslation();

  const resolveGradeIdFromContext = (gradeOrProg: string): string => {
    if (!gradeOrProg) return 'grade-10';
    const lower = gradeOrProg.toLowerCase();
    if (lower.includes('grade r')) return 'grade-r';
    const match = lower.match(/\bgrade\s*([0-9]+)\b/);
    if (match) return `grade-${match[1]}`;
    if (lower.includes('matric')) return 'grade-12';
    return 'grade-10';
  };

  // Mode: 'browse' vs 'dashboard'
  const [viewMode, setViewMode] = useState<'browse' | 'dashboard'>('browse');

  // Hierarchy Navigation State initialized from learningContext
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<SouthAfricanPhaseId | 'all'>('all');
  const [selectedGradeId, setSelectedGradeId] = useState<string>(() =>
    resolveGradeIdFromContext(learningContext?.gradeOrProgramme || '')
  );
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('sub-g10-maths');
  const [selectedTermNumber, setSelectedTermNumber] = useState<1 | 2 | 3 | 4>(1);
  const [selectedTopicId, setSelectedTopicId] = useState<string>('top-g10-mth-t1-algebra');
  const [activeLesson, setActiveLesson] = useState<CurriculumLessonModel | null>(null);
  const [activeViewTab, setActiveViewTab] = useState<'term' | 'pastPapers'>('term');

  // Sync with global learningContext when user navigates or changes context elsewhere
  useEffect(() => {
    if (learningContext?.gradeOrProgramme) {
      const gId = resolveGradeIdFromContext(learningContext.gradeOrProgramme);
      if (gId !== selectedGradeId) {
        setSelectedGradeId(gId);
        const subjs = curriculumEngine.getSubjectsForGrade(gId);
        if (subjs.length > 0) {
          const matched = learningContext.subject
            ? subjs.find((s) => s.name.toLowerCase() === learningContext.subject.toLowerCase())
            : undefined;
          const nextSubj = matched || subjs[0];
          setSelectedSubjectId(nextSubj.id);
          setSelectedTermNumber(1);
          const firstTopic = nextSubj.terms[0]?.topics[0];
          if (firstTopic) setSelectedTopicId(firstTopic.id);
        }
      } else if (learningContext.subject) {
        const subjs = curriculumEngine.getSubjectsForGrade(selectedGradeId);
        const matched = subjs.find((s) => s.name.toLowerCase() === learningContext.subject.toLowerCase());
        if (matched && matched.id !== selectedSubjectId) {
          setSelectedSubjectId(matched.id);
        }
      }
    }
  }, [learningContext?.gradeOrProgramme, learningContext?.subject]);

  // Lesson Translation Selector state - synced with activeLearningLanguage
  const lessonLanguage = activeLearningLanguage;

  const displayLesson = useMemo(() => {
    return activeLesson
      ? multilingualEducationalService.localizeCurriculumLesson(activeLesson, activeLearningLanguage)
      : null;
  }, [activeLesson, activeLearningLanguage]);

  // Modals
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adaptivePracticeModalOpen, setAdaptivePracticeModalOpen] = useState(false);

  // All Phases & Grades
  const phases = curriculumEngine.getPhases();
  const grades = curriculumEngine.getGradeLevels();

  // Filtered Grades
  const filteredGrades = selectedPhaseFilter === 'all'
    ? grades
    : grades.filter((g) => g.phaseId === selectedPhaseFilter);

  // Current selections
  const currentGrade = curriculumEngine.getGradeById(selectedGradeId) || grades[10];
  const availableSubjects = curriculumEngine.getSubjectsForGrade(currentGrade.id);
  const currentSubject = availableSubjects.find((s) => s.id === selectedSubjectId) || availableSubjects[0];
  const currentTerms = currentSubject ? currentSubject.terms : [];
  const currentTerm = currentTerms.find((t) => t.termNumber === selectedTermNumber) || currentTerms[0];
  const currentTopics = currentTerm ? currentTerm.topics : [];
  const currentTopic = currentTopics.find((t) => t.id === selectedTopicId) || currentTopics[0];

  // Learner Mastery Map from Phase 5
  const masteryMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const [topicName, m] of Object.entries(adaptiveProfile.topicMasteries)) {
      map[topicName] = m.masteryScore;
    }
    return map;
  }, [adaptiveProfile.topicMasteries]);

  // Handle Grade Change — preserve subject if valid in newly chosen grade
  const handleGradeChange = (gradeId: string) => {
    setSelectedGradeId(gradeId);
    const subjs = curriculumEngine.getSubjectsForGrade(gradeId);
    if (subjs.length > 0) {
      const currentSubjName = availableSubjects.find((s) => s.id === selectedSubjectId)?.name || learningContext.subject;
      const matchedSubj = subjs.find((s) => s.name.toLowerCase() === currentSubjName.toLowerCase());
      const nextSubj = matchedSubj || subjs[0];

      setSelectedSubjectId(nextSubj.id);
      setSelectedTermNumber(1);
      const firstTopic = nextSubj.terms[0]?.topics[0];
      if (firstTopic) setSelectedTopicId(firstTopic.id);

      const targetGradeObj = curriculumEngine.getGradeById(gradeId);
      if (targetGradeObj) {
        updateLearningContext({
          gradeOrProgramme: targetGradeObj.name,
          educationLevel: targetGradeObj.phaseName,
          subject: nextSubj.name,
          topic: firstTopic ? firstTopic.title : ''
        });
      }
    }
    setActiveLesson(null);
  };

  // Handle Subject Change
  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setSelectedTermNumber(1);
    const subj = curriculumEngine.getSubjectById(subjectId);
    const firstTopic = subj?.terms[0]?.topics[0];
    if (firstTopic) setSelectedTopicId(firstTopic.id);
    if (subj) {
      updateLearningContext({
        subject: subj.name,
        topic: firstTopic ? firstTopic.title : ''
      });
    }
    setActiveLesson(null);
  };

  // Launch AI Tutor with full CAPS curriculum context
  const handleOpenAiTutorWithContext = (lesson: CurriculumLessonModel) => {
    const currentTopicMastery = masteryMap[lesson.title] || 0;
    const context = curriculumEngine.buildCurriculumTutorContext(lesson, currentTopicMastery);

    updateLearningContext({
      educationLevel: context.educationLevel,
      gradeOrProgramme: context.gradeOrProgramme,
      subject: context.subject,
      topic: context.topic,
      lesson: context.lesson,
      language: lessonLanguage,
      mode: 'explain'
    });

    setCurrentTab('tutor');
    sendMessageToTutor(
      `Hello! I am learning "${lesson.title}" in ${context.gradeOrProgramme} ${context.subject}. Can you give me an engaging Socratic explanation and test my understanding?`
    );
  };

  // Handle selecting result from search
  const handleSelectSearchResult = (result: CurriculumSearchResult) => {
    handleGradeChange(result.gradeId);
    handleSubjectChange(result.subjectId);
    setSelectedTermNumber(result.termNumber);

    if (result.type === 'lesson' && result.lessonId) {
      const lesson = curriculumEngine.getLessonById(result.lessonId);
      if (lesson) {
        setSelectedTopicId(lesson.topicId);
        setActiveLesson(lesson);
      }
    } else if (result.type === 'topic') {
      setSelectedTopicId(result.id);
      setActiveLesson(null);
    }
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

      {/* 1. Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              Phase 6 · CAPS Curriculum Engine
            </span>
            <span className="text-xs text-slate-400">
              Grade R–12 · Verified & Demo Provenance
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            South African School Curriculum
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Explore verified curriculum hierarchies from Foundation Phase to Matric, with measurable learning objectives, multi-language support, and adaptive prerequisite tracking.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View mode toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('browse')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === 'browse'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Browse Syllabus</span>
            </button>
            <button
              onClick={() => setViewMode('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === 'dashboard'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>My Curriculum</span>
            </button>
          </div>

          {/* Search Trigger */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-xs transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-amber-500" />
            <span>Search Curriculum</span>
          </button>

          {/* Governance / Admin Modal */}
          <button
            onClick={() => setAdminModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50 dark:bg-purple-950/30 hover:bg-purple-100 text-xs font-semibold text-purple-700 dark:text-purple-300 transition-colors"
            title="Curriculum Versions, Sources, and Governance"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Governance</span>
          </button>
        </div>
      </div>

      {/* 2. Main Content based on View Mode */}
      {viewMode === 'dashboard' ? (
        <LearnerCurriculumDashboard
          selectedGradeId={selectedGradeId}
          onSelectGrade={handleGradeChange}
          onSelectSubject={handleSubjectChange}
          onOpenLesson={(lessonId) => {
            const lesson = curriculumEngine.getLessonById(lessonId);
            if (lesson) {
              handleGradeChange(lesson.gradeId);
              handleSubjectChange(lesson.subjectId);
              setSelectedTermNumber(lesson.termNumber);
              setSelectedTopicId(lesson.topicId);
              setActiveLesson(lesson);
              setViewMode('browse');
            }
          }}
        />
      ) : (
        /* Browse Mode: Hierarchy Browser */
        <div className="space-y-6">
          {/* Breadcrumbs Navigation */}
          <nav className="flex flex-wrap items-center gap-1 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <button
              onClick={() => setActiveLesson(null)}
              className="hover:text-amber-600 dark:hover:text-amber-400 font-semibold"
            >
              {currentGrade.name}
            </button>
            <ChevronRight className="w-3 h-3 text-slate-400" />

            <button
              onClick={() => setActiveLesson(null)}
              className="hover:text-amber-600 dark:hover:text-amber-400 font-semibold"
            >
              {currentSubject?.name || 'Subject'}
            </button>
            <ChevronRight className="w-3 h-3 text-slate-400" />

            <button
              onClick={() => setActiveLesson(null)}
              className="hover:text-amber-600 dark:hover:text-amber-400 font-semibold"
            >
              Term {selectedTermNumber}
            </button>

            {currentTopic && (
              <>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
                  {currentTopic.title}
                </span>
              </>
            )}

            {activeLesson && (
              <>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="font-bold text-amber-600 dark:text-amber-400 truncate max-w-[220px]">
                  {activeLesson.title}
                </span>
              </>
            )}
          </nav>

          {/* If a lesson is actively open, display the complete Lesson Viewer */}
          {activeLesson ? (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Back to Topic Button */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setActiveLesson(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Topic: {currentTopic?.title}</span>
                </button>

                {/* Multilingual Selector for Lesson */}
                <div className="flex items-center gap-2">
                  <label htmlFor="lesson-lang-select" className="text-xs text-slate-400 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-amber-500" />
                    <span>Active Language:</span>
                  </label>
                  <select
                    id="lesson-lang-select"
                    value={activeLearningLanguage}
                    onChange={(e) => setActiveLearningLanguage(e.target.value as SALanguageCode)}
                    className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold"
                  >
                    {SA_LANGUAGES.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.nativeName} ({lang.name})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Language Fallback Notice */}
              {(() => {
                const langStatus = curriculumEngine.resolveLessonLanguage(activeLesson, activeLearningLanguage);
                if (!langStatus.isExactMatch && activeLearningLanguage !== 'ts') {
                  return (
                    <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-300 flex items-start gap-2.5">
                      <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block mb-0.5">Language Availability Notice:</strong>
                        {langStatus.statusMessage}
                      </div>
                    </div>
                  );
                }
                return null;
              })()}

              {/* Main Lesson Content Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
                {/* Lesson Header */}
                <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {activeLesson.curriculumReference}
                    </span>

                    {/* Source Classification Badge */}
                    {(() => {
                      const badge = SOURCE_CLASSIFICATION_INFO[activeLesson.sourceInfo.classification];
                      return (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badge.badgeColor}`}>
                          {badge.label}
                        </span>
                      );
                    })()}

                    {activeLearningLanguage === 'ts' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300">
                        XITSONGA VERIFIED ENGINE ACTIVE
                      </span>
                    )}

                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{activeLesson.estimatedDurationMinutes} mins</span>
                    </span>

                    <span className="text-xs text-slate-400 capitalize">
                      Difficulty: {activeLesson.difficulty}
                    </span>
                  </div>

                  <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {displayLesson?.title || activeLesson.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {displayLesson?.introduction || activeLesson.introduction}
                  </p>
                </div>

                {/* Measurable Learning Objectives (Requirement 13) */}
                {(displayLesson?.learningObjectives || activeLesson.learningObjectives).length > 0 && (
                  <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
                      <Target className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      <span>Measurable Learning Objectives</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 list-disc list-inside">
                      {(displayLesson?.learningObjectives || activeLesson.learningObjectives).map((lo) => (
                        <li key={lo.id} className="leading-relaxed">
                          <span className="font-medium">{lo.description}</span>
                          <span className="text-[10px] text-amber-700 dark:text-amber-400 font-mono ml-1.5">
                            [{lo.taxonomyLevel}]
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Step-by-Step Explanations */}
                <div className="space-y-5">
                  {(displayLesson?.explanation || activeLesson.explanation).map((section, sIdx) => (
                    <div key={sIdx} className="space-y-2">
                      <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                        {section.heading}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                        {section.body}
                      </p>

                      {section.keyPoints.length > 0 && (
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                            Key Takeaways:
                          </span>
                          <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside">
                            {section.keyPoints.map((kp, kIdx) => (
                              <li key={kIdx}>{kp}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Worked Examples */}
                {(displayLesson?.workedExamples || activeLesson.workedExamples) && (displayLesson?.workedExamples || activeLesson.workedExamples)!.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Worked Exam Examples</span>
                    </h3>

                    {(displayLesson?.workedExamples || activeLesson.workedExamples)!.map((ex, eIdx) => (
                      <div
                        key={eIdx}
                        className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 space-y-2.5"
                      >
                        <div className="font-semibold text-xs text-slate-900 dark:text-white">
                          Problem: {ex.problemStatement}
                        </div>

                        <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300 pl-3 border-l-2 border-amber-400">
                          {ex.stepByStepSolution.map((step, stIdx) => (
                            <div key={stIdx}>{step}</div>
                          ))}
                        </div>

                        {ex.conceptualNote && (
                          <div className="text-[11px] text-amber-700 dark:text-amber-400 italic">
                            💡 Conceptual Note: {ex.conceptualNote}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Activities */}
                {(displayLesson?.activities || activeLesson.activities) && (displayLesson?.activities || activeLesson.activities)!.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                      Practice Activities
                    </h3>

                    {(displayLesson?.activities || activeLesson.activities)!.map((act) => (
                      <div
                        key={act.id}
                        className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900 dark:text-white">
                            {act.title}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {act.estimatedMinutes} mins
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          {act.instructions}
                        </p>
                        {act.sampleSolution && (
                          <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-xs text-emerald-900 dark:text-emerald-300 border border-emerald-200/60">
                            <strong>Answer / Solution: </strong>
                            {act.sampleSolution}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Integration Actions & Verification Footer */}
                <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Ask AI Tutor with context */}
                    <button
                      onClick={() => handleOpenAiTutorWithContext(activeLesson)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold rounded-xl text-xs shadow-xs transition-transform active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 dark:text-amber-500" />
                      <span>Ask AI Tutor with Lesson Context</span>
                    </button>

                    {/* Launch Adaptive Practice */}
                    <button
                      onClick={() => setAdaptivePracticeModalOpen(true)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs shadow-xs transition-transform active:scale-95"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Start Adaptive Practice</span>
                    </button>

                    {/* Launch Assessment */}
                    <button
                      onClick={() => setCurrentTab('assessments')}
                      className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs shadow-xs transition-transform active:scale-95"
                    >
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      <span>Take Topic Assessment</span>
                    </button>
                  </div>

                  {/* Mark complete */}
                  <button
                    onClick={() => {
                      markLessonComplete(activeLesson.id);
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Mark Complete</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Hierarchy Navigation Tree */
            <div className="space-y-6">
              {/* Step 1: Phase Filter Pills */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Step 1: South African School Phase
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setSelectedPhaseFilter('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                      selectedPhaseFilter === 'all'
                        ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    All Phases (R–12)
                  </button>

                  {phases.map((ph) => (
                    <button
                      key={ph.id}
                      onClick={() => setSelectedPhaseFilter(ph.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                        selectedPhaseFilter === ph.id
                          ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      {ph.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Grade Selector Bar */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Step 2: Select Grade ({filteredGrades.length} Grades Available)
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-13 gap-1.5">
                  {filteredGrades.map((g) => {
                    const isSelected = g.id === selectedGradeId;
                    return (
                      <button
                        key={g.id}
                        onClick={() => handleGradeChange(g.id)}
                        className={`p-2.5 rounded-xl text-center flex flex-col items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold shadow-sm'
                            : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-400'
                        }`}
                      >
                        <span className="text-xs font-bold block">{g.name}</span>
                        <span className="text-[9px] text-slate-400 truncate max-w-full">
                          {g.phaseName.replace(' Phase', '')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Subject Tabs */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Step 3: Choose Subject for {currentGrade.name}
                </span>

                {availableSubjects.length > 0 ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {availableSubjects.map((subj) => {
                      const isSelected = subj.id === selectedSubjectId;
                      return (
                        <button
                          key={subj.id}
                          onClick={() => handleSubjectChange(subj.id)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                            isSelected
                              ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-400'
                          }`}
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>{subj.name}</span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 text-xs text-slate-500">
                    This curriculum content is not available yet. Try another subject or ask the AI Tutor for help.
                  </div>
                )}
              </div>

              {/* Step 4: Terms 1–4 Switcher & Past Papers Tab */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Step 4: Academic Terms & Past Papers
                  </span>
                  <span className="text-xs font-mono text-amber-500 font-semibold">
                    100% CAPS & TVET Aligned
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {([1, 2, 3, 4] as const).map((tNum) => {
                    const isSelected = activeViewTab === 'term' && selectedTermNumber === tNum;
                    const matchingTerm = currentTerms.find((t) => t.termNumber === tNum);

                    return (
                      <button
                        key={tNum}
                        onClick={() => {
                          setActiveViewTab('term');
                          setSelectedTermNumber(tNum);
                          if (matchingTerm && matchingTerm.topics.length > 0) {
                            setSelectedTopicId(matchingTerm.topics[0].id);
                          }
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-white dark:bg-slate-900 border-amber-500 ring-2 ring-amber-400/20 shadow-xs'
                            : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <span className={`text-xs font-bold ${isSelected ? 'text-amber-600 dark:text-amber-400' : 'text-slate-800 dark:text-slate-200'}`}>
                            Term {tNum}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono font-medium">
                            {matchingTerm ? `${matchingTerm.topics.length} Units` : '4 Units'}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 line-clamp-1">
                          {matchingTerm?.title || `Term ${tNum} Syllabus`}
                        </span>
                      </button>
                    );
                  })}

                  {/* 5th Tab: Past Papers & Memos */}
                  <button
                    onClick={() => setActiveViewTab('pastPapers')}
                    className={`p-3 rounded-xl border text-left transition-all col-span-2 sm:col-span-1 ${
                      activeViewTab === 'pastPapers'
                        ? 'bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-950 border-amber-500 ring-2 ring-amber-400/20 shadow-xs'
                        : 'bg-gradient-to-br from-amber-50/60 to-white dark:from-slate-900 dark:to-slate-900/60 border-amber-300/60 dark:border-amber-500/30 hover:border-amber-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`text-xs font-bold flex items-center gap-1.5 ${activeViewTab === 'pastPapers' ? 'text-amber-400 dark:text-slate-950' : 'text-slate-900 dark:text-white'}`}>
                        <FileText className="w-3.5 h-3.5 text-amber-500" />
                        <span>Past Papers</span>
                      </span>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-600 dark:text-amber-400">
                        2018–2024
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      Papers & Memos + AI
                    </span>
                  </button>
                </div>
              </div>

              {/* View Switcher: Term Units Grid vs Past Papers Tab */}
              {activeViewTab === 'pastPapers' ? (
                <PastPapersTab
                  currentSubjectName={currentSubject?.name || 'Mathematics'}
                  currentGradeName={currentGrade?.name || 'Grade 12'}
                  onLaunchAiTutor={(prompt) => {
                    updateLearningContext({
                      subject: currentSubject?.name,
                      gradeOrProgramme: currentGrade?.name
                    });
                    setCurrentTab('tutor');
                  }}
                />
              ) : (
                /* Step 5: Topics & Lessons Grid */
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Step 5: Units & Lessons in Term {selectedTermNumber}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">
                      {currentTopics.length} Units Available
                    </span>
                  </div>

                  {currentTopics.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentTopics.map((top) => {
                        const masteryScore = masteryMap[top.title] || 0;
                        const prereqCheck = curriculumEngine.checkTopicPrerequisites(top, masteryMap);

                        return (
                          <div
                            key={top.id}
                            className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 hover:shadow-xs transition-shadow"
                          >
                            {/* Topic Header */}
                            <div>
                              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                                <span className="font-semibold text-amber-600 dark:text-amber-400">
                                  {top.estimatedHours} Hours Suggested
                                </span>
                                <span className="font-bold text-slate-700 dark:text-slate-300">
                                  Mastery: {masteryScore}%
                                </span>
                              </div>

                              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                                {top.title}
                              </h3>

                              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                                {top.description}
                              </p>
                            </div>

                            {/* Prerequisite Alert if Unmet */}
                            {prereqCheck.isBlocked && (
                              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-[11px] text-rose-900 dark:text-rose-300 flex items-start gap-2">
                                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                                <span>{prereqCheck.warningMessage}</span>
                              </div>
                            )}

                            {/* Lessons in Topic */}
                            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                                Lessons in this unit:
                              </span>

                              {top.subtopics.flatMap((st) => st.lessons).map((les) => (
                                <div
                                  key={les.id}
                                  onClick={() => setActiveLesson(les)}
                                  className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 hover:border-amber-400 transition-colors cursor-pointer flex items-center justify-between gap-3 group"
                                >
                                  <div className="space-y-0.5">
                                    <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors block">
                                      {les.title}
                                    </span>
                                    <span className="text-[10px] text-slate-400 block">
                                      {les.estimatedDurationMinutes} mins · {les.learningObjectives.length} Objectives · {les.sourceInfo.classification}
                                    </span>
                                  </div>

                                  <div className="shrink-0 w-6 h-6 rounded-md bg-white dark:bg-slate-800 text-slate-400 group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center transition-colors">
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 text-slate-400 text-xs">
                      This curriculum content is not available yet for Term {selectedTermNumber}. Try another subject or term, or ask the AI Tutor for help.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <CurriculumSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectResult={handleSelectSearchResult}
      />

      <CurriculumAdminManagerModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        canManage={true}
      />

      {activeLesson && (
        <AdaptivePracticeSessionModal
          isOpen={adaptivePracticeModalOpen}
          onClose={() => setAdaptivePracticeModalOpen(false)}
          topic={displayLesson?.title || activeLesson.title}
          subject={currentSubject?.name || 'Mathematics'}
          initialDifficulty={activeLesson.difficulty}
        />
      )}
    </div>
  );
};
