/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN ACADEMY - PHASE 7: ASSESSMENT PLAYER MODAL
 * 
 * Mobile-first, Android-friendly assessment test-taking environment:
 * - Supports all 8 Question Types:
 *   1. Multiple Choice
 *   2. Multiple Select
 *   3. True/False
 *   4. Short Answer
 *   5. Numerical Answer
 *   6. Matching
 *   7. Ordering
 *   8. Written Response
 * - Timed assessments with automatic submission on expiration
 * - Untimed assessments without intrusive timers
 * - Safe answer preservation in localStorage
 * - Flag questions for review
 * - Unfinished questions warning modal
 * - Anti-cheating blur/tab-switch tracking foundation
 * - Instant feedback in PRACTICE mode
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  X,
  Clock,
  Flag,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Send,
  Layers,
  Check,
  BookOpen
} from 'lucide-react';
import {
  AssessmentModel,
  LearnerAnswer,
  LearnerAnswerValue,
  QuestionModel,
  QuestionType
} from '../../types/assessment';
import { assessmentEngine } from '../../services/assessment/assessmentEngine';
import { useLearning } from '../../context/LearningContext';
import { useAuth } from '../../context/AuthContext';
import { SOURCE_CLASSIFICATION_INFO } from '../../config/curriculumConfig';
import {
  multilingualEducationalService,
  LocalizedQuestionModel,
  LocalizedAssessmentModel
} from '../../services/language/multilingualEducationalService';

interface Props {
  isOpen: boolean;
  assessment: AssessmentModel | null;
  onClose: () => void;
  onComplete: (attempt: any) => void;
}

const STORAGE_PREFIX = 'nexovian_asmt_draft_';

export const AssessmentPlayerModal: React.FC<Props> = ({
  isOpen,
  assessment,
  onClose,
  onComplete
}) => {
  const { recordPerformanceEvent, activeLearningLanguage } = useLearning();
  const { user } = useAuth();
  const currentUserId = user?.id || 'learner_guest';

  // Navigation & Answers State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, LearnerAnswer>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [showQuestionPalette, setShowQuestionPalette] = useState<boolean>(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState<boolean>(false);
  const [showExitWarning, setShowExitWarning] = useState<boolean>(false);

  // Practice Mode: Instant Feedback reveal for answered questions
  const [practiceRevealedAnswers, setPracticeRevealedAnswers] = useState<Record<string, boolean>>({});

  // Timed Assessment State
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);
  const [isTimeExpired, setIsTimeExpired] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Anti-cheating logs (transparent count of window blurs / interruptions)
  const [windowBlurCount, setWindowBlurCount] = useState<number>(0);

  // Timing tracking
  const startTimeRef = useRef<number>(Date.now());
  const timerIntervalRef = useRef<any>(null);

  // Initialize assessment attempt
  useEffect(() => {
    if (!isOpen || !assessment) return;

    startTimeRef.current = Date.now();
    setCurrentQuestionIndex(0);
    setShowQuestionPalette(false);
    setShowConfirmSubmit(false);
    setShowExitWarning(false);
    setIsTimeExpired(false);
    setIsSubmitting(false);
    setWindowBlurCount(0);
    setPracticeRevealedAnswers({});

    // Load saved draft answers from localStorage if available
    const draftKey = `${STORAGE_PREFIX}${assessment.id}_${currentUserId}`;
    let loadedAnswers: Record<string, LearnerAnswer> = {};
    try {
      const saved = localStorage.getItem(draftKey);
      if (saved) {
        loadedAnswers = JSON.parse(saved);
      }
    } catch {
      // ignore
    }

    // Initialize all questions with blank answer objects if not already present
    const initAnswers: Record<string, LearnerAnswer> = { ...loadedAnswers };
    const initFlags: Record<string, boolean> = {};

    assessment.questions.forEach((q) => {
      if (!initAnswers[q.id]) {
        let initialVal: LearnerAnswerValue = '';
        if (q.questionType === 'multiple_select') initialVal = [];
        if (q.questionType === 'matching') initialVal = {};
        if (q.questionType === 'ordering') {
          // Initialize with shuffled IDs
          const itemIds = (q.orderingItems || []).map((it) => it.id);
          initialVal = [...itemIds].sort(() => 0.5 - Math.random());
        }

        initAnswers[q.id] = {
          questionId: q.id,
          questionType: q.questionType,
          value: initialVal,
          isAnswered: false,
          timeSpentSeconds: 0,
          lastUpdated: new Date().toISOString()
        };
      }
      initFlags[q.id] = initAnswers[q.id]?.isFlagged || false;
    });

    setAnswers(initAnswers);
    setFlaggedQuestions(initFlags);

    // Initialize timer if timed assessment
    if (assessment.durationMinutes && assessment.durationMinutes > 0) {
      const totalSec = assessment.durationMinutes * 60;
      setSecondsRemaining(totalSec);

      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev === null) return null;
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            setIsTimeExpired(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setSecondsRemaining(null);
    }

    // Anti-cheating blur listener
    const handleBlur = () => {
      setWindowBlurCount((prev) => prev + 1);
    };
    window.addEventListener('blur', handleBlur);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      window.removeEventListener('blur', handleBlur);
    };
  }, [isOpen, assessment?.id]);

  // Handle auto-submit on time expiration
  useEffect(() => {
    if (isTimeExpired && isOpen && assessment && !isSubmitting) {
      handleSubmitAssessment(true);
    }
  }, [isTimeExpired]);

  // Localize assessment and questions using activeLearningLanguage
  const localizedAssessment = useMemo(() => {
    return assessment
      ? multilingualEducationalService.localizeAssessment(assessment, activeLearningLanguage)
      : null;
  }, [assessment, activeLearningLanguage]);

  const uiStrings = useMemo(() => {
    return multilingualEducationalService.getUiStrings(activeLearningLanguage);
  }, [activeLearningLanguage]);

  // Auto-save answers to localStorage
  const saveDraftToLocalStorage = (updated: Record<string, LearnerAnswer>) => {
    if (!assessment) return;
    try {
      const draftKey = `${STORAGE_PREFIX}${assessment.id}_${currentUserId}`;
      localStorage.setItem(draftKey, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  if (!isOpen || !assessment) return null;

  const questions = (localizedAssessment?.questions || assessment.questions) as LocalizedQuestionModel[];
  const currentQuestion = questions[currentQuestionIndex] || questions[0];
  const currentAnswer = answers[currentQuestion.id] || {
    questionId: currentQuestion.id,
    questionType: currentQuestion.questionType,
    value: '',
    isAnswered: false,
    timeSpentSeconds: 0,
    lastUpdated: new Date().toISOString()
  };

  // Answer modification handler
  const handleUpdateAnswer = (val: LearnerAnswerValue) => {
    const isAnswered =
      Array.isArray(val)
        ? val.length > 0
        : typeof val === 'object' && val !== null
        ? Object.keys(val).length > 0
        : String(val).trim().length > 0;

    const updated: Record<string, LearnerAnswer> = {
      ...answers,
      [currentQuestion.id]: {
        ...currentAnswer,
        value: val,
        isAnswered,
        isFlagged: flaggedQuestions[currentQuestion.id],
        lastUpdated: new Date().toISOString()
      }
    };

    setAnswers(updated);
    saveDraftToLocalStorage(updated);
  };

  // Flag toggle
  const handleToggleFlag = () => {
    const nextFlag = !flaggedQuestions[currentQuestion.id];
    const updatedFlags = {
      ...flaggedQuestions,
      [currentQuestion.id]: nextFlag
    };
    setFlaggedQuestions(updatedFlags);

    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: {
        ...currentAnswer,
        isFlagged: nextFlag
      }
    };
    setAnswers(updatedAnswers);
    saveDraftToLocalStorage(updatedAnswers);
  };

  // Submit assessment logic
  const handleSubmitAssessment = async (forcedByTime = false) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const elapsedSeconds = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));

    // Clear draft in localStorage
    try {
      const draftKey = `${STORAGE_PREFIX}${assessment.id}_${currentUserId}`;
      localStorage.removeItem(draftKey);
    } catch {
      // ignore
    }

    // Evaluate attempt
    const attempt = assessmentEngine.evaluateAssessmentAttempt(
      assessment,
      answers,
      currentUserId,
      elapsedSeconds,
      1,
      {
        windowBlurCount,
        tabSwitchCount: windowBlurCount,
        connectionDropCount: 0
      }
    );

    // Convert to Phase 5 adaptive learning events and record them
    const adaptiveEvents = assessmentEngine.convertAttemptToAdaptiveEvents(attempt, assessment);
    for (const ev of adaptiveEvents) {
      recordPerformanceEvent(ev);
    }

    setIsSubmitting(false);
    onComplete(attempt);
  };

  // Format timer seconds as MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Calculate statistics
  const answeredCount = Object.values(answers).filter((a) => a.isAnswered).length;
  const unansweredCount = questions.length - answeredCount;
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border-0 sm:border border-slate-200 dark:border-slate-800 rounded-none sm:rounded-2xl w-full max-w-4xl h-full sm:h-[92vh] shadow-2xl flex flex-col overflow-hidden">
        
        {/* 1. TOP APP BAR */}
        <header className="px-4 py-3 sm:px-6 sm:py-3.5 border-b border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={() => {
                if (answeredCount > 0) setShowExitWarning(true);
                else onClose();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Close Assessment"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300">
                  {assessment.assessmentType}
                </span>
                <span className="text-xs text-slate-400 truncate hidden sm:inline">
                  {assessment.subject} · {assessment.grade}
                </span>
              </div>
              <h2 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                {localizedAssessment?.title || assessment.title}
              </h2>
            </div>
          </div>

          {/* Right Header Controls: Timer, Palette, and Submit */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Countdown Timer (if timed) */}
            {secondsRemaining !== null && (
              <div
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition-colors ${
                  secondsRemaining < 60
                    ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-300 animate-pulse'
                    : secondsRemaining < 300
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(secondsRemaining)}</span>
              </div>
            )}

            {/* Question Overview Toggle */}
            <button
              onClick={() => setShowQuestionPalette(!showQuestionPalette)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Overview of all questions"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Questions</span>
              <span className="font-bold">({answeredCount}/{questions.length})</span>
            </button>

            {/* Submit CTA */}
            <button
              onClick={() => setShowConfirmSubmit(true)}
              disabled={isSubmitting}
              className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-xs transition-transform active:scale-95"
            >
              Submit
            </button>
          </div>
        </header>

        {/* 2. PROGRESS STRIP & QUESTION PALETTE DROPDOWN */}
        <div className="relative shrink-0">
          {/* Progress Bar */}
          <div className="h-1 w-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full bg-amber-500 transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Palette Dropdown Tray */}
          {showQuestionPalette && (
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 animate-in slide-in-from-top-2 duration-150 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  Question Navigation
                </span>
                <div className="flex items-center gap-3 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                    Answered ({answeredCount})
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                    Flagged ({flaggedCount})
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" />
                    Unanswered ({unansweredCount})
                  </span>
                </div>
              </div>

              {/* Grid of question chips */}
              <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-1.5 max-h-40 overflow-y-auto">
                {questions.map((q, idx) => {
                  const ans = answers[q.id];
                  const isCurrent = idx === currentQuestionIndex;
                  const isAnswered = ans?.isAnswered;
                  const isFlagged = flaggedQuestions[q.id];

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentQuestionIndex(idx);
                        setShowQuestionPalette(false);
                      }}
                      className={`relative p-2 rounded-lg text-xs font-bold transition-all text-center ${
                        isCurrent
                          ? 'ring-2 ring-amber-500 bg-slate-900 text-white dark:bg-white dark:text-slate-950'
                          : isAnswered
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                      }`}
                    >
                      {idx + 1}
                      {isFlagged && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 ring-1 ring-white dark:ring-slate-900" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 3. MAIN QUESTION CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
          {/* Question Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-600 dark:text-amber-400">
                {uiStrings.questionCount
                  ? uiStrings.questionCount.replace('{current}', String(currentQuestionIndex + 1)).replace('{total}', String(questions.length))
                  : `Question ${currentQuestionIndex + 1} of ${questions.length}`}
              </span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="text-slate-500 font-medium">
                {currentQuestion.marks} {currentQuestion.marks === 1 ? 'Mark' : 'Marks'}
              </span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="capitalize text-slate-500">
                Difficulty: {currentQuestion.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Flag question button */}
              <button
                onClick={handleToggleFlag}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                  flaggedQuestions[currentQuestion.id]
                    ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-400'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800'
                }`}
              >
                <Flag className={`w-3.5 h-3.5 ${flaggedQuestions[currentQuestion.id] ? 'fill-current' : ''}`} />
                <span>{flaggedQuestions[currentQuestion.id] ? 'Flagged' : 'Flag Question'}</span>
              </button>

              {/* Source classification badge */}
              {(() => {
                const badge = SOURCE_CLASSIFICATION_INFO[currentQuestion.sourceType || 'DEMO'];
                return (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badge.badgeColor}`}>
                    {badge.label}
                  </span>
                );
              })()}

              {/* Language Verification Status Badge */}
              {activeLearningLanguage === 'ts' && (
                currentQuestion.verificationStatus === 'verified' ? (
                  <span
                    className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300"
                    title="Verified Xitsonga Language Engine · Exact stored wording preserved"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{uiStrings.verifiedLexiconBadge}</span>
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/40 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300"
                    title="AI-generated educational translation · Mathematical equations preserved · Unverified"
                  >
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    <span>AI-GENERATED / UNVERIFIED</span>
                  </span>
                )
              )}
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-relaxed">
              {currentQuestion.questionText}
            </h3>

            {currentQuestion.hint && assessment.assessmentType === 'PRACTICE' && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block mb-0.5">{uiStrings.hintPrefix || 'Hint:'}</strong>
                  {currentQuestion.hint}
                </div>
              </div>
            )}
          </div>

          {/* 4. DYNAMIC QUESTION TYPE CONTROLS (ALL 8 TYPES) */}
          <div className="space-y-4 pt-2">
            
            {/* TYPE 1: MULTIPLE CHOICE */}
            {currentQuestion.questionType === 'multiple_choice' && (
              <div className="space-y-2.5">
                {(currentQuestion.options || []).map((opt) => {
                  const isSelected = String(currentAnswer.value) === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleUpdateAnswer(opt.id)}
                      className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between gap-3 text-sm active:scale-99 ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/70 dark:bg-amber-950/20 ring-2 ring-amber-400/20 font-semibold text-slate-900 dark:text-white'
                          : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>{opt.text}</span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-amber-500 bg-amber-500 text-slate-950'
                            : 'border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {isSelected && <span className="w-2 h-2 rounded-full bg-slate-950" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* TYPE 2: MULTIPLE SELECT */}
            {currentQuestion.questionType === 'multiple_select' && (
              <div className="space-y-2.5">
                <p className="text-xs text-slate-500 mb-2 font-medium">
                  Select all options that apply:
                </p>
                {(currentQuestion.options || []).map((opt) => {
                  const arr = Array.isArray(currentAnswer.value) ? currentAnswer.value : [];
                  const isSelected = arr.includes(opt.id);

                  const toggleOpt = () => {
                    const next = isSelected ? arr.filter((x) => x !== opt.id) : [...arr, opt.id];
                    handleUpdateAnswer(next);
                  };

                  return (
                    <button
                      key={opt.id}
                      onClick={toggleOpt}
                      className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between gap-3 text-sm ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/70 dark:bg-amber-950/20 ring-2 ring-amber-400/20 font-semibold text-slate-900 dark:text-white'
                          : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>{opt.text}</span>
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-amber-500 bg-amber-500 text-slate-950'
                            : 'border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* TYPE 3: TRUE / FALSE */}
            {currentQuestion.questionType === 'true_false' && (
              <div className="grid grid-cols-2 gap-3 max-w-md">
                {(['true', 'false'] as const).map((val) => {
                  const isSelected = String(currentAnswer.value).toLowerCase() === val;
                  return (
                    <button
                      key={val}
                      onClick={() => handleUpdateAnswer(val)}
                      className={`py-5 px-6 rounded-xl border text-center font-display font-bold text-base transition-all active:scale-98 ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500 text-slate-950 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {val.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            )}

            {/* TYPE 4: SHORT ANSWER */}
            {currentQuestion.questionType === 'short_answer' && (
              <div className="space-y-2 max-w-lg">
                <label className="text-xs text-slate-400 block font-medium">
                  Type your concise answer below:
                </label>
                <input
                  type="text"
                  value={String(currentAnswer.value || '')}
                  onChange={(e) => handleUpdateAnswer(e.target.value)}
                  placeholder="Enter answer..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            )}

            {/* TYPE 5: NUMERICAL ANSWER */}
            {currentQuestion.questionType === 'numerical_answer' && (
              <div className="space-y-2 max-w-md">
                <label className="text-xs text-slate-400 block font-medium">
                  Enter calculated numerical value {currentQuestion.numericalUnit && `(${currentQuestion.numericalUnit})`}:
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    value={String(currentAnswer.value || '')}
                    onChange={(e) => handleUpdateAnswer(e.target.value)}
                    placeholder="e.g. 3.0"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono font-bold text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  {currentQuestion.numericalUnit && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 font-bold">
                      {currentQuestion.numericalUnit}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* TYPE 6: MATCHING */}
            {currentQuestion.questionType === 'matching' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500 font-medium">
                  Match each item in Column A with its corresponding item in Column B:
                </p>
                <div className="space-y-3">
                  {(currentQuestion.matchingPairs || []).map((pair) => {
                    const userMap = (currentAnswer.value as Record<string, string>) || {};
                    const selectedMatch = userMap[pair.id] || '';

                    // Available matches
                    const allMatches = (currentQuestion.matchingPairs || []).map((p) => p.match);

                    return (
                      <div
                        key={pair.id}
                        className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
                      >
                        <span className="font-bold text-slate-900 dark:text-white md:w-1/3">
                          {pair.prompt}
                        </span>

                        <div className="md:w-2/3">
                          <select
                            value={selectedMatch}
                            onChange={(e) => {
                              const nextMap = { ...userMap, [pair.id]: e.target.value };
                              handleUpdateAnswer(nextMap);
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                          >
                            <option value="">-- Choose matching definition --</option>
                            {allMatches.map((m, idx) => (
                              <option key={idx} value={m}>
                                {m}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TYPE 7: ORDERING */}
            {currentQuestion.questionType === 'ordering' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500 font-medium">
                  Use the Up / Down arrows to arrange the items into the correct chronological sequence:
                </p>
                <div className="space-y-2">
                  {(() => {
                    const userOrder = Array.isArray(currentAnswer.value)
                      ? (currentAnswer.value as string[])
                      : (currentQuestion.orderingItems || []).map((it) => it.id);

                    const itemsMap = new Map((currentQuestion.orderingItems || []).map((it) => [it.id, it]));

                    const moveItem = (fromIdx: number, toIdx: number) => {
                      if (toIdx < 0 || toIdx >= userOrder.length) return;
                      const next = [...userOrder];
                      const [moved] = next.splice(fromIdx, 1);
                      next.splice(toIdx, 0, moved);
                      handleUpdateAnswer(next);
                    };

                    return userOrder.map((itemId, idx) => {
                      const item = itemsMap.get(itemId);
                      if (!item) return null;

                      return (
                        <div
                          key={itemId}
                          className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-bold flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <span className="font-medium text-slate-900 dark:text-white">
                              {item.text}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => moveItem(idx, idx - 1)}
                              disabled={idx === 0}
                              className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 disabled:opacity-30 hover:bg-slate-200"
                              title="Move Up"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => moveItem(idx, idx + 1)}
                              disabled={idx === userOrder.length - 1}
                              className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 disabled:opacity-30 hover:bg-slate-200"
                              title="Move Down"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            )}

            {/* TYPE 8: WRITTEN RESPONSE */}
            {currentQuestion.questionType === 'written_response' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Structured Explanation / Mathematical Justification:</span>
                  <span>{String(currentAnswer.value || '').length} characters</span>
                </div>

                <textarea
                  rows={6}
                  value={String(currentAnswer.value || '')}
                  onChange={(e) => handleUpdateAnswer(e.target.value)}
                  placeholder="Provide your complete written response with step-by-step reasoning..."
                  className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm font-sans leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-500"
                />

                {currentQuestion.rubricGuidelines && currentQuestion.rubricGuidelines.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 text-xs space-y-1.5">
                    <span className="font-bold text-slate-700 dark:text-slate-300 block">
                      Marking Rubric Criteria ({currentQuestion.marks} Marks Available):
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                      {currentQuestion.rubricGuidelines.map((g, gIdx) => (
                        <li key={gIdx}>{g}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* PRACTICE MODE ONLY: REVEAL INSTANT PEDAGOGICAL EXPLANATION */}
            {assessment.assessmentType === 'PRACTICE' && currentAnswer.isAnswered && (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                {!practiceRevealedAnswers[currentQuestion.id] ? (
                  <button
                    onClick={() =>
                      setPracticeRevealedAnswers((prev) => ({
                        ...prev,
                        [currentQuestion.id]: true
                      }))
                    }
                    className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{uiStrings.showExplanation || 'Check Instant Feedback & Explanation'}</span>
                  </button>
                ) : (
                  <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 text-xs space-y-2">
                    <div className="flex items-center justify-between font-bold text-amber-900 dark:text-amber-300">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>{uiStrings.correctHeading || 'Instant Practice Feedback:'}</span>
                      </span>
                      {activeLearningLanguage === 'ts' && (
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 px-2 py-0.5 bg-emerald-100/60 dark:bg-emerald-900/40 rounded">
                          {currentQuestion.verificationStatus === 'verified' ? 'VERIFIED TRANSLATION' : 'AI-GENERATED / UNVERIFIED'}
                        </span>
                      )}
                    </div>
                    <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      <strong className="block mb-1">{uiStrings.explanationPrefix}</strong>
                      {currentQuestion.explanation}
                    </div>
                    {currentQuestion.unverifiedNotice && (
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 italic pt-1 border-t border-amber-200/40 dark:border-amber-900/40">
                        {currentQuestion.unverifiedNotice}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        {/* 5. BOTTOM NAVIGATION BAR */}
        <footer className="px-4 py-3 sm:px-6 sm:py-3.5 border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <span className="text-xs text-slate-400 font-medium">
            {answeredCount} of {questions.length} answered
          </span>

          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold shadow-xs transition-transform active:scale-95"
            >
              <span>{uiStrings.nextQuestion || 'Next'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => setShowConfirmSubmit(true)}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-xs transition-transform active:scale-95"
            >
              <span>{uiStrings.submitAnswer || 'Finish & Submit'}</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </button>
          )}
        </footer>

        {/* CONFIRM SUBMISSION MODAL DIALOG */}
        {showConfirmSubmit && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                    Submit Assessment?
                  </h3>
                  <p className="text-xs text-slate-500">
                    {assessment.title}
                  </p>
                </div>
              </div>

              {unansweredCount > 0 ? (
                <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block mb-0.5">You have {unansweredCount} unanswered question(s).</strong>
                    Are you sure you want to finish now? Unanswered questions will receive 0 marks.
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  All {questions.length} questions have been answered. Once submitted, your answers will be automatically marked and integrated with your learning profile.
                </p>
              )}

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  onClick={() => setShowConfirmSubmit(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100"
                >
                  Return to Test
                </button>
                <button
                  onClick={() => {
                    setShowConfirmSubmit(false);
                    handleSubmitAssessment();
                  }}
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-xs"
                >
                  {isSubmitting ? 'Evaluating...' : 'Yes, Submit Now'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* EXIT WARNING MODAL DIALOG */}
        {showExitWarning && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-600 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                    Leave Assessment?
                  </h3>
                  <p className="text-xs text-slate-500">
                    Your answers will be saved as a draft.
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                You have answered {answeredCount} of {questions.length} questions. You can safely return later to complete this assessment.
              </p>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  onClick={() => setShowExitWarning(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold"
                >
                  Continue Assessment
                </button>
                <button
                  onClick={() => {
                    setShowExitWarning(false);
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100"
                >
                  Leave for Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
