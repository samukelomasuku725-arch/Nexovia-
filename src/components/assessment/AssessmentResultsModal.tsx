/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIA ACADEMY - PHASE 7: ASSESSMENT RESULTS MODAL
 * 
 * Detailed performance breakdown:
 * - Score, percentage, marks earned/available, pass/fail status
 * - Topic mastery integration & learning-objective performance
 * - Question-by-question review with explanations & AI-assisted rubric breakdown
 * - Actions: "Explain My Mistakes with AI Tutor", "Practice Weak Topics", "Retake Assessment"
 */

import React, { useState, useMemo } from 'react';
import {
  X,
  Award,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Sparkles,
  Zap,
  ArrowRight,
  BookOpen,
  RotateCcw,
  MessageSquare,
  HelpCircle,
  Layers,
  ChevronDown,
  ChevronUp,
  ShieldCheck
} from 'lucide-react';
import { AssessmentAttempt, AssessmentModel } from '../../types/assessment';
import { useLearning } from '../../context/LearningContext';
import { multilingualEducationalService } from '../../services/language/multilingualEducationalService';

interface Props {
  isOpen: boolean;
  attempt: AssessmentAttempt | null;
  assessment: AssessmentModel | null;
  onClose: () => void;
  onRetake?: () => void;
}

export const AssessmentResultsModal: React.FC<Props> = ({
  isOpen,
  attempt,
  assessment,
  onClose,
  onRetake
}) => {
  const { setCurrentTab, updateLearningContext, sendMessageToTutor, activeLearningLanguage } = useLearning();

  const localizedAssessment = useMemo(() => {
    return assessment
      ? multilingualEducationalService.localizeAssessment(assessment, activeLearningLanguage)
      : null;
  }, [assessment, activeLearningLanguage]);

  const uiStrings = useMemo(() => {
    return multilingualEducationalService.getUiStrings(activeLearningLanguage);
  }, [activeLearningLanguage]);

  const [activeTab, setActiveTab] = useState<'summary' | 'review'>('summary');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  // AI Tutor Explain Mistakes State
  const [isExplainingMistakes, setIsExplainingMistakes] = useState<boolean>(false);
  const [mistakesExplanation, setMistakesExplanation] = useState<string | null>(null);

  if (!isOpen || !attempt || !assessment) return null;

  const currentAsmt = localizedAssessment || assessment;

  const score = attempt.score ?? 0;
  const totalMarks = attempt.totalMarks ?? 1;
  const percentage = attempt.percentage ?? Math.round((score / totalMarks) * 100);
  const passed = attempt.passed ?? percentage >= (assessment.passingPercentage || 50);

  const results = attempt.questionResults || [];
  const correctCount = results.filter((r) => r.isCorrect).length;
  const incorrectCount = results.filter((r) => !r.isCorrect && !r.isPartiallyCorrect).length;
  const partialCount = results.filter((r) => r.isPartiallyCorrect).length;

  const mistakes = results
    .filter((r) => !r.isCorrect)
    .map((r) => {
      const q = currentAsmt.questions.find((x) => x.id === r.questionId);
      return {
        questionText: q?.questionText || 'Question',
        learnerAnswer: String(r.learnerAnswer),
        correctAnswer: String(r.correctAnswer),
        explanation: q?.explanation || r.explanation,
        topic: r.topic
      };
    });

  // Call server to explain mistakes
  const handleExplainMistakesWithAi = async () => {
    setIsExplainingMistakes(true);
    setMistakesExplanation(null);

    try {
      const res = await fetch('/api/ai/assessment/explain-mistakes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assessmentTitle: currentAsmt.title,
          subject: currentAsmt.subject,
          grade: currentAsmt.grade,
          mistakes,
          language: activeLearningLanguage
        })
      });

      const data = await res.json();
      if (data.success && data.data) {
        setMistakesExplanation(data.data);
      } else {
        setMistakesExplanation(
          activeLearningLanguage === 'ts'
            ? 'Vusulula swivhutiso leswi u hoxeke eka swona. Hlakulela ku twisisa kahle tidyondzo ta masungulo na magoza ya tinhlayo.'
            : 'Revisit the questions where your answers diverged from the correct answer. Focus on understanding the core definitions and checking each calculation step.'
        );
      }
    } catch {
      setMistakesExplanation(
        activeLearningLanguage === 'ts'
          ? 'Tiyisela! Ku avanyisa na ku endla swihoxo i xiphemu xa nkoka xo dyondza. Tlhantlha magoza ma ri kahle.'
          : 'Focus on revisiting the core principles of the questions you missed. Practicing similar questions in the Adaptive Engine will help reinforce these concepts.'
      );
    } finally {
      setIsExplainingMistakes(false);
    }
  };

  // Launch AI Tutor chat with full assessment context
  const handleLaunchAiTutorChat = () => {
    updateLearningContext({
      educationLevel: `${currentAsmt.phase} (${currentAsmt.grade} CAPS)`,
      gradeOrProgramme: currentAsmt.grade,
      subject: currentAsmt.subject,
      topic: currentAsmt.topic || 'General Topic',
      lesson: currentAsmt.title,
      language: activeLearningLanguage,
      mode: 'explain'
    });

    const mistakeSummary = mistakes.slice(0, 3).map((m) => `• ${m.questionText}: expected "${m.correctAnswer}"`).join('\n');
    setCurrentTab('tutor');
    onClose();

    sendMessageToTutor(
      activeLearningLanguage === 'ts'
        ? `Xewani! Ndzi hetile dyondzo yo ringeta "${currentAsmt.title}" eka ${currentAsmt.subject} naswona ndzi kume ${percentage}%. Ndzi kombela mpfuno ku twisisa lomu ndzi nga hoxa kona:\n${mistakeSummary}\nA hi swi tlhantlheni hi magoza?`
        : `Hello! I just finished the assessment "${currentAsmt.title}" in ${currentAsmt.subject} and scored ${percentage}%. I need help understanding where I made mistakes:\n${mistakeSummary}\nCan you guide me step-by-step?`
    );
  };

  // Format seconds as M:SS
  const formatDuration = (secs?: number) => {
    if (!secs) return '0 min';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300">
                {assessment.assessmentType} Result
              </span>
              <span className="text-xs text-slate-400">
                {assessment.subject} · {assessment.grade}
              </span>
            </div>
            <h2 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              {assessment.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Summary vs Question Review */}
        <div className="px-5 pt-3 border-b border-slate-100 dark:border-slate-800 flex gap-2">
          <button
            onClick={() => setActiveTab('summary')}
            className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'summary'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Performance Overview
          </button>
          <button
            onClick={() => setActiveTab('review')}
            className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'review'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Question Review ({results.length})
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: SUMMARY */}
          {activeTab === 'summary' && (
            <div className="space-y-6">
              
              {/* Score Hero Card */}
              <div
                className={`p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left ${
                  passed
                    ? 'bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-500/30'
                    : 'bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/30'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        passed
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-amber-500 text-slate-950'
                      }`}
                    >
                      {passed ? 'Passed' : 'Needs Practice'}
                    </span>
                    <span className="text-xs text-slate-500">
                      Passing Threshold: {assessment.passingPercentage}%
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                    {percentage}%
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    You earned <strong className="text-slate-900 dark:text-white">{score}</strong> out of{' '}
                    <strong className="text-slate-900 dark:text-white">{totalMarks}</strong> total marks.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center shrink-0">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
                    <span className="text-base font-bold text-emerald-600 dark:text-emerald-400 block">
                      {correctCount}
                    </span>
                    <span className="text-[10px] text-slate-400">Correct</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
                    <span className="text-base font-bold text-rose-600 dark:text-rose-400 block">
                      {incorrectCount}
                    </span>
                    <span className="text-[10px] text-slate-400">Incorrect</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
                    <span className="text-base font-bold text-slate-700 dark:text-slate-300 block">
                      {formatDuration(attempt.timeUsedSeconds)}
                    </span>
                    <span className="text-[10px] text-slate-400">Time Used</span>
                  </div>
                </div>
              </div>

              {/* Topic Performance Matrix (Phase 5 Adaptive Connection) */}
              {attempt.topicPerformance && Object.keys(attempt.topicPerformance).length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-amber-500" />
                    <span>Topic Performance & Adaptive Mastery</span>
                  </h4>

                  <div className="space-y-2">
                    {Object.values(attempt.topicPerformance).map((tp) => (
                      <div
                        key={tp.topic}
                        className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-4 text-xs"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 dark:text-white">
                              {tp.topic}
                            </span>
                            <span className="font-bold text-slate-700 dark:text-slate-300">
                              {tp.marksEarned}/{tp.marksAvailable} Marks ({tp.percentage}%)
                            </span>
                          </div>

                          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                tp.percentage >= 75
                                  ? 'bg-emerald-500'
                                  : tp.percentage >= 50
                                  ? 'bg-amber-500'
                                  : 'bg-rose-500'
                              }`}
                              style={{ width: `${tp.percentage}%` }}
                            />
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize shrink-0 ${
                            tp.status === 'mastered' || tp.status === 'strong'
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                              : tp.status === 'basic'
                              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                              : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300'
                          }`}
                        >
                          {tp.status.replace('_', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Socratic Review Box */}
              {mistakes.length > 0 && (
                <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3 shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <h4 className="font-display font-bold text-sm">
                        AI Tutor Assessment Insights
                      </h4>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Socratic AI
                    </span>
                  </div>

                  {mistakesExplanation ? (
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                      {mistakesExplanation}
                    </p>
                  ) : (
                    <p className="text-xs text-slate-300 leading-relaxed">
                      You struggled with {mistakes.length} question(s). Click below to generate an encouraging Socratic explanation of your misconceptions.
                    </p>
                  )}

                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleExplainMistakesWithAi}
                      disabled={isExplainingMistakes}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-transform active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isExplainingMistakes ? 'Analyzing...' : 'Explain My Mistakes with AI'}</span>
                    </button>

                    <button
                      onClick={handleLaunchAiTutorChat}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                      <span>Chat with AI Tutor</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: QUESTION-BY-QUESTION REVIEW */}
          {activeTab === 'review' && (
            <div className="space-y-4">
              {results.map((r, idx) => {
                const q = currentAsmt.questions.find((x) => x.id === r.questionId);
                const isExpanded = expandedQuestionId === r.questionId;

                return (
                  <div
                    key={r.questionId}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                            r.isCorrect
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                              : r.isPartiallyCorrect
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                          }`}
                        >
                          {r.isCorrect ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                            <span className="font-bold text-slate-700 dark:text-slate-300">
                              {uiStrings.question || 'Question'} {idx + 1}
                            </span>
                            <span>·</span>
                            <span>{r.marksAwarded}/{r.marksAvailable} Marks</span>
                            <span>·</span>
                            <span className="capitalize">{r.questionType.replace('_', ' ')}</span>
                          </div>
                          <h4 className="font-display font-semibold text-xs sm:text-sm text-slate-900 dark:text-white leading-relaxed">
                            {q?.questionText || 'Question'}
                          </h4>
                        </div>
                      </div>

                      <button
                        onClick={() => setExpandedQuestionId(isExpanded ? null : r.questionId)}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Answer Comparison summary */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1.5">
                      <div>
                        <strong className="text-slate-500">{activeLearningLanguage === 'ts' ? 'Nhlamulo ya Wena: ' : 'Your Answer: '}</strong>
                        <span className={r.isCorrect ? 'text-emerald-700 dark:text-emerald-300 font-semibold' : 'text-rose-700 dark:text-rose-300'}>
                          {typeof r.learnerAnswer === 'object' ? JSON.stringify(r.learnerAnswer) : String(r.learnerAnswer || 'No answer')}
                        </span>
                      </div>

                      {!r.isCorrect && (
                        <div>
                          <strong className="text-slate-500">{activeLearningLanguage === 'ts' ? 'Nhlamulo Leyinene: ' : 'Correct Answer: '}</strong>
                          <span className="text-slate-900 dark:text-white font-semibold">
                            {typeof r.correctAnswer === 'object' ? JSON.stringify(r.correctAnswer) : String(r.correctAnswer)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Expanded Explanation & Pedagogical Details */}
                    {isExpanded && (
                      <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 text-xs space-y-2.5 animate-in fade-in duration-150">
                        <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-300">
                          <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                          <span>{uiStrings.explanationPrefix || 'Pedagogical Explanation:'}</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {q?.explanation || r.explanation}
                        </p>

                        {/* Written response AI rubric feedback */}
                        {r.aiEvaluation && (
                          <div className="pt-2 border-t border-amber-200/60 dark:border-amber-900/40 space-y-2">
                            <span className="font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              <span>AI-Assisted Rubric Feedback:</span>
                            </span>
                            <p className="text-slate-600 dark:text-slate-400">
                              {r.aiEvaluation.constructiveFeedback}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            {onRetake && (
              <button
                onClick={onRetake}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Assessment</span>
              </button>
            )}

            <button
              onClick={() => {
                setCurrentTab('adaptive');
                onClose();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-transform active:scale-95"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Practice Weak Areas</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
