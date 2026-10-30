import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  Award,
  Zap,
  BookOpen,
  MessageSquare,
  Lightbulb,
  ShieldCheck,
  Globe
} from 'lucide-react';
import {
  AdaptiveDifficulty,
  LearnerPerformanceEvent,
  TopicMastery
} from '../../types/adaptive';
import {
  computeAdaptiveDifficulty,
  getAdaptiveQuestionsForTopic,
  AdaptiveQuestionItem
} from '../../services/adaptive/adaptiveLearningService';
import { useLearning } from '../../context/LearningContext';
import {
  multilingualEducationalService,
  LocalizedEducationalQuestion
} from '../../services/language/multilingualEducationalService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  topic: string;
  subject?: string;
  initialDifficulty?: AdaptiveDifficulty;
  focusSubtopic?: string;
}

export const AdaptivePracticeSessionModal: React.FC<Props> = ({
  isOpen,
  onClose,
  topic,
  subject = 'Mathematics',
  initialDifficulty = 'medium',
  focusSubtopic
}) => {
  const { recordPerformanceEvent, setCurrentTab, sendMessageToTutor, activeLearningLanguage } = useLearning();

  const [currentDifficulty, setCurrentDifficulty] = useState<AdaptiveDifficulty>(initialDifficulty);
  const [questionPool, setQuestionPool] = useState<LocalizedEducationalQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [adaptiveNotice, setAdaptiveNotice] = useState<string | null>(null);

  const uiStrings = multilingualEducationalService.getUiStrings(activeLearningLanguage);

  // History within this session
  const [sessionResults, setSessionResults] = useState<
    Array<{
      question: LocalizedEducationalQuestion;
      selected: string;
      correct: boolean;
      difficulty: AdaptiveDifficulty;
    }>
  >([]);

  // Initialize and localize questions whenever session opens or activeLearningLanguage changes
  useEffect(() => {
    if (isOpen) {
      setCurrentDifficulty(initialDifficulty);
      const rawQuestions = getAdaptiveQuestionsForTopic(topic, initialDifficulty, 6);
      const localizedQuestions = rawQuestions.map((q) =>
        multilingualEducationalService.localizeAdaptiveQuestion(q, activeLearningLanguage)
      );
      setQuestionPool(localizedQuestions);
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setIsSubmitted(false);
      setShowHint(false);
      setSessionCompleted(false);
      setSessionResults([]);
      setAdaptiveNotice(null);
    }
  }, [isOpen, topic, initialDifficulty, activeLearningLanguage]);

  if (!isOpen) return null;

  const currentQ = questionPool[currentQuestionIndex];

  const handleSelect = (opt: string) => {
    if (isSubmitted) return;
    setSelectedOption(opt);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption || !currentQ || isSubmitted) return;

    const isCorrect = selectedOption.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase();
    setIsSubmitted(true);

    const resultItem = {
      question: currentQ,
      selected: selectedOption,
      correct: isCorrect,
      difficulty: currentDifficulty
    };

    const updatedResults = [...sessionResults, resultItem];
    setSessionResults(updatedResults);

    // Record atomic performance event into Adaptive Engine
    recordPerformanceEvent({
      learnerId: 'guest_learner',
      gradeOrProgramme: 'Grade 10',
      subject: currentQ.subject || subject,
      topic: currentQ.topic || topic,
      subtopic: currentQ.subtopic || focusSubtopic,
      questionId: currentQ.id,
      questionType: 'multiple_choice',
      answer: selectedOption,
      correct: isCorrect,
      score: isCorrect ? 1 : 0,
      percentage: isCorrect ? 100 : 0,
      difficulty: currentDifficulty,
      timeSpentSeconds: 45,
      attemptsCount: 1,
      hintsUsed: showHint ? 1 : 0,
      source: 'practice',
      completed: true
    });

    // Run dynamic adaptive engine algorithm
    const nextEval = computeAdaptiveDifficulty(
      updatedResults.map((r) => ({ correct: r.correct, difficulty: r.difficulty }))
    );

    if (nextEval.nextDifficulty !== currentDifficulty) {
      setCurrentDifficulty(nextEval.nextDifficulty);
      setAdaptiveNotice(nextEval.changeReason);
    } else if (nextEval.consecutiveCorrect === 1 && !isCorrect) {
      setAdaptiveNotice(null);
    }
  };

  const handleNext = () => {
    const nextIdx = currentQuestionIndex + 1;
    // Check if session ends (target 5 questions)
    if (nextIdx >= Math.min(questionPool.length, 5)) {
      setSessionCompleted(true);
      return;
    }

    setCurrentQuestionIndex(nextIdx);
    setSelectedOption(null);
    setIsSubmitted(false);
    setShowHint(false);
  };

  const handleAskAITutor = () => {
    if (!currentQ) return;
    onClose();
    setCurrentTab('tutor');
    sendMessageToTutor(
      `Can you explain step-by-step why the answer to "${currentQ.question}" is "${currentQ.correctAnswer}"? I'm practicing ${currentQ.topic}.`
    );
  };

  // Compute final summary
  const totalAnswered = sessionResults.length;
  const correctCount = sessionResults.filter((r) => r.correct).length;
  const accuracyPct = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  Adaptive Practice: {topic}
                </h3>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    currentDifficulty === 'easy'
                      ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                      : currentDifficulty === 'medium'
                      ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300'
                      : 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300'
                  }`}
                >
                  {currentDifficulty}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
                {subject} {focusSubtopic ? `· Focus: ${focusSubtopic}` : ''}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress & Adaptive Banner */}
        <div className="px-5 py-2.5 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-100 dark:border-slate-800 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              Question {Math.min(currentQuestionIndex + 1, 5)} of 5
            </span>
            <div className="flex items-center gap-1">
              <span className="font-medium text-slate-700 dark:text-slate-300">
                Score: {correctCount}/{totalAnswered}
              </span>
              <span className="mx-1">·</span>
              <span className="text-amber-600 dark:text-amber-400 font-semibold">
                {accuracyPct}%
              </span>
            </div>
          </div>

          {/* Mini progress segments */}
          <div className="grid grid-cols-5 gap-1.5 h-1.5 w-full">
            {[0, 1, 2, 3, 4].map((idx) => {
              const res = sessionResults[idx];
              let bg = 'bg-slate-200 dark:bg-slate-800';
              if (res) {
                bg = res.correct ? 'bg-emerald-500' : 'bg-rose-500';
              } else if (idx === currentQuestionIndex && !sessionCompleted) {
                bg = 'bg-amber-500';
              }
              return <div key={idx} className={`rounded-full h-full ${bg} transition-colors`} />;
            })}
          </div>

          {/* Adaptive Engine Notice Banner */}
          {adaptiveNotice && (
            <div className="mt-1 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-1.5 animate-in slide-in-from-top-1 duration-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{adaptiveNotice}</span>
            </div>
          )}
        </div>

        {/* Question Body or Completion Screen */}
        <div className="p-5 overflow-y-auto flex-1 text-sm">
          {!sessionCompleted && currentQ ? (
            <div className="space-y-4">
              {/* Question metadata badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {currentQ.subtopic || currentQ.topic}
                </span>
                {!isSubmitted && currentQ.hint && (
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="flex items-center gap-1 text-xs text-amber-700 dark:text-amber-400 hover:underline"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
                  </button>
                )}
              </div>

              {/* Hint Box */}
              {showHint && currentQ.hint && (
                <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">Hint:</span>
                    {currentQ.hint}
                  </div>
                </div>
              )}

              {/* Question Prompt */}
              <h4 className="font-display font-semibold text-base text-slate-900 dark:text-white leading-relaxed">
                {currentQ.question}
              </h4>

              {/* Options */}
              <div className="space-y-2 pt-1">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedOption === option;
                  const isCorrect = option === currentQ.correctAnswer;

                  let optClass = 'border-slate-200 dark:border-slate-800 hover:border-amber-400 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200';

                  if (isSubmitted) {
                    if (isCorrect) {
                      optClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      optClass = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
                    } else {
                      optClass = 'border-slate-200 dark:border-slate-800 opacity-60 bg-slate-50 dark:bg-slate-900/40';
                    }
                  } else if (isSelected) {
                    optClass = 'border-amber-500 ring-2 ring-amber-400/20 bg-amber-50/50 dark:bg-amber-950/30 font-semibold text-slate-900 dark:text-white';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(option)}
                      disabled={isSubmitted}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${optClass}`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-xs font-bold mt-0.5 border ${
                          isSubmitted && isCorrect
                            ? 'bg-emerald-500 text-white border-emerald-500'
                            : isSubmitted && isSelected && !isCorrect
                            ? 'bg-rose-500 text-white border-rose-500'
                            : isSelected
                            ? 'bg-amber-500 text-slate-950 border-amber-500'
                            : 'border-slate-300 dark:border-slate-700 text-slate-500'
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="text-xs sm:text-sm flex-1 leading-snug">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback Explanation */}
              {isSubmitted && (
                <div
                  className={`p-4 rounded-xl border animate-in fade-in duration-200 ${
                    selectedOption === currentQ.correctAnswer
                      ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/40 text-emerald-950 dark:text-emerald-200'
                      : 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/40 text-rose-950 dark:text-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider">
                      {selectedOption === currentQ.correctAnswer ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span>Correct! Well reasoned.</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                          <span>Review the concept:</span>
                        </>
                      )}
                    </div>

                    <button
                      onClick={handleAskAITutor}
                      className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Ask AI Tutor</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    {currentQ.explanation}
                  </p>
                </div>
              )}
            </div>
          ) : sessionCompleted ? (
            /* Session Completed Screen */
            <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-950 mx-auto flex items-center justify-center font-bold shadow-lg shadow-amber-500/20">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  Practice Session Completed!
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Your performance events have been analyzed by Nexovian's Adaptive Learning Engine.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Accuracy</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">{accuracyPct}%</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Answered</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">{correctCount}/{totalAnswered}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">End Level</span>
                  <span className="text-lg font-bold capitalize text-amber-600 dark:text-amber-400">{currentDifficulty}</span>
                </div>
              </div>

              {/* Dynamic feedback message */}
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 max-w-md mx-auto text-left">
                <span className="font-semibold block mb-0.5">Engine Assessment:</span>
                {accuracyPct >= 80 ? (
                  <span>
                    Outstanding performance! Your mastery in <strong>{topic}</strong> is increasing. The engine recommends advancing to higher-order synthesis questions or starting the next sequence lesson.
                  </span>
                ) : accuracyPct >= 50 ? (
                  <span>
                    Good effort! You've demonstrated basic understanding. Reviewing the step-by-step explanations will help solidify tricky subtopics before exams.
                  </span>
                ) : (
                  <span>
                    Keep going! The engine has noted key problem areas. Consider asking the AI Tutor for a simplified Socratic explanation to build foundational confidence.
                  </span>
                )}
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          {!sessionCompleted ? (
            <>
              <button
                onClick={onClose}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Quit Session
              </button>

              {!isSubmitted ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={!selectedOption}
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 text-xs font-bold rounded-xl shadow-xs transition-transform active:scale-95"
                >
                  <span>Check Answer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-amber-400 hover:bg-slate-800 dark:hover:bg-amber-300 text-white dark:text-slate-950 text-xs font-bold rounded-xl shadow-xs transition-transform active:scale-95"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </>
          ) : (
            <div className="w-full flex items-center justify-between">
              <button
                onClick={() => {
                  // restart practice
                  setSessionCompleted(false);
                  setCurrentQuestionIndex(0);
                  setSelectedOption(null);
                  setIsSubmitted(false);
                  setSessionResults([]);
                }}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Practice Again</span>
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl shadow-xs"
              >
                Done & View Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
