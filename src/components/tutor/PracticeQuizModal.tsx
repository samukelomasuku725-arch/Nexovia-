import React, { useState, useMemo } from 'react';
import {
  X,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Award,
  BookmarkPlus
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { GeneratedQuiz } from '../../types';
import { multilingualEducationalService } from '../../services/language/multilingualEducationalService';
import { AnswerFeedbackWidget } from '../feedback/AnswerFeedbackWidget';
import { CleanFormulaRenderer } from '../common/CleanFormulaRenderer';
import { cleanFormulaString } from '../../utils/formulaCleaner';

interface Props {
  quiz: GeneratedQuiz;
  onClose: () => void;
}

export function cleanOptionLabel(text: string): string {
  return String(text || '')
    .trim()
    .replace(/^(?:option\s+)?([A-Da-d])[\).\s:-]+/, '')
    .trim();
}

export function resolveOptionKey(rawCorrect: string, options: string[]): string {
  const raw = String(rawCorrect || '').trim();
  if (!raw && options.length > 0) return options[0];

  // 1. Direct match with one of the options (case-insensitive)
  const direct = options.find((opt) => opt.toLowerCase() === raw.toLowerCase());
  if (direct) return direct;

  // 2. Direct match after cleaning option label
  const cleanedRaw = cleanOptionLabel(raw);
  if (cleanedRaw) {
    const cleanedMatch = options.find((opt) => opt.toLowerCase() === cleanedRaw.toLowerCase());
    if (cleanedMatch) return cleanedMatch;
  }

  // 3. Option letter key: 'A', 'B', 'C', 'D' (or "Option A", "A.", "A)")
  const letterMatch = raw.match(/^(?:option\s+)?([a-d])[\).\s:-]*$/i);
  if (letterMatch) {
    const idx = letterMatch[1].toUpperCase().charCodeAt(0) - 65;
    if (idx >= 0 && idx < options.length) {
      return options[idx];
    }
  }

  // 4. Substring inclusion
  if (cleanedRaw) {
    const incMatch = options.find(
      (opt) =>
        opt.toLowerCase().includes(cleanedRaw.toLowerCase()) ||
        cleanedRaw.toLowerCase().includes(opt.toLowerCase())
    );
    if (incMatch) return incMatch;
  }

  // Fallback to first option if still not matched
  return options[0] || raw;
}

export function normalizeQuizQuestion(q: any): any {
  if (!q) return q;

  const rawOptions = Array.isArray(q.options) ? q.options : [];
  // Clean option labels (e.g. "A) 25 kg" -> "25 kg")
  const cleanedOptions = rawOptions
    .map((opt: string) => cleanOptionLabel(opt))
    .filter((opt: string) => opt.length > 0);

  const finalOptions = cleanedOptions.length > 0 ? cleanedOptions : rawOptions;
  const canonicalCorrectAnswer = resolveOptionKey(q.correctAnswer, finalOptions);

  return {
    ...q,
    options: finalOptions,
    correctAnswer: canonicalCorrectAnswer
  };
}

export const isAnswerMatching = (ans1: string, ans2: string, options?: string[]): boolean => {
  if (!ans1 || !ans2) return false;
  const a1 = ans1.trim();
  const a2 = ans2.trim();
  if (a1.toLowerCase() === a2.toLowerCase()) return true;

  const c1 = cleanOptionLabel(a1);
  const c2 = cleanOptionLabel(a2);
  if (c1 && c2 && c1 === c2) return true;

  // Check letter match against options array (e.g. 'A' vs '25 kg')
  if (options && options.length > 0) {
    const isLetter = (s: string) => /^(?:option\s+)?([a-d])[\).\s:-]*$/i.test(s);
    if (isLetter(a1) && !isLetter(a2)) {
      const idx = a1.match(/([a-d])/i)![1].toUpperCase().charCodeAt(0) - 65;
      if (options[idx] && (options[idx].toLowerCase() === a2.toLowerCase() || cleanOptionLabel(options[idx]) === c2)) {
        return true;
      }
    }
    if (isLetter(a2) && !isLetter(a1)) {
      const idx = a2.match(/([a-d])/i)![1].toUpperCase().charCodeAt(0) - 65;
      if (options[idx] && (options[idx].toLowerCase() === a1.toLowerCase() || cleanOptionLabel(options[idx]) === c1)) {
        return true;
      }
    }
  }

  return false;
};

export const PracticeQuizModal: React.FC<Props> = ({ quiz, onClose }) => {
  const { recordQuizAttempt, saveLearningItem, activeLearningLanguage } = useLearning();

  const localizedQuiz = useMemo(() => {
    const raw = multilingualEducationalService.localizeGeneratedQuiz(quiz, activeLearningLanguage);
    if (!raw || !raw.questions) return raw;
    return {
      ...raw,
      questions: raw.questions.map((q: any) => normalizeQuizQuestion(q))
    };
  }, [quiz, activeLearningLanguage]);

  const uiStrings = useMemo(() => {
    return multilingualEducationalService.getUiStrings(activeLearningLanguage);
  }, [activeLearningLanguage]);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSelectOption = (questionId: string, value: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleShortAnswerChange = (questionId: string, value: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    localizedQuiz.questions.forEach((q: any) => {
      const userAns = (answers[q.id] || '').trim();
      const rightAns = (q.correctAnswer || '').trim();

      if (q.type === 'short_answer') {
        // Simple fuzzy match for short answers
        const u = userAns.toLowerCase();
        const r = rightAns.toLowerCase();
        if (u.length > 2 && (r.includes(u) || u.includes(r) || isAnswerMatching(userAns, rightAns, q.options))) {
          correctCount++;
        }
      } else {
        if (isAnswerMatching(userAns, rightAns, q.options)) {
          correctCount++;
        }
      }
    });

    const calculatedPercentage = Math.round((correctCount / localizedQuiz.questions.length) * 100);
    setScore(calculatedPercentage);
    setSubmitted(true);

    // Record persistent attempt
    recordQuizAttempt({
      quizId: localizedQuiz.id,
      quizTitle: localizedQuiz.title,
      subject: localizedQuiz.subject,
      topic: localizedQuiz.topic,
      answers,
      score: correctCount,
      totalQuestions: localizedQuiz.questions.length,
      percentage: calculatedPercentage
    });
  };

  const handleSaveQuizToLibrary = () => {
    saveLearningItem({
      type: 'question',
      title: `${localizedQuiz.title} (${localizedQuiz.subject})`,
      content: localizedQuiz.questions
        .map(
          (q: any, idx: number) =>
            `Q${idx + 1}: ${q.question}\nCorrect: ${q.correctAnswer}\nExplanation: ${q.explanation}`
        )
        .join('\n\n'),
      subject: localizedQuiz.subject,
      topic: localizedQuiz.topic,
      language: activeLearningLanguage,
      tags: ['AI Practice Quiz', localizedQuiz.gradeOrProgramme || localizedQuiz.educationLevel]
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="px-5 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{localizedQuiz.gradeOrProgramme || localizedQuiz.educationLevel} · {localizedQuiz.subject}</span>
            </div>
            <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
              {localizedQuiz.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-colors"
            aria-label="Close Quiz"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mandatory AI Disclaimer Banner */}
        <div className="px-5 py-2.5 bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-900/40 flex items-center gap-2 text-xs text-amber-800 dark:text-amber-300">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <span>
            <strong>{activeLearningLanguage === 'ts' ? 'Xilemo:' : 'Disclaimer:'}</strong> {activeLearningLanguage === 'ts' ? (uiStrings.unverifiedDisclaimer || localizedQuiz.disclaimer) : localizedQuiz.disclaimer}
          </span>
        </div>

        {/* Questions Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {localizedQuiz.questions.map((q: any, qIdx: number) => {
            const chosen = answers[q.id] || '';
            const isRight =
              submitted &&
              (q.type === 'short_answer'
                ? chosen.toLowerCase().includes(q.correctAnswer.toLowerCase()) || q.correctAnswer.toLowerCase().includes(chosen.toLowerCase())
                : isAnswerMatching(chosen, q.correctAnswer, q.options));

            return (
              <div
                key={q.id}
                className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 rounded-xl p-4 sm:p-5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {uiStrings.question || 'Question'} {qIdx + 1} · {q.type.replace('_', ' ')}
                  </span>
                  {submitted && (
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${
                        isRight
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}
                    >
                      {isRight ? 'Correct ✓' : 'Incorrect ✗'}
                    </span>
                  )}
                </div>

                <h4 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white mb-3">
                  {cleanFormulaString(q.question)}
                </h4>

                {/* Multiple Choice & True/False Options */}
                {q.options && q.options.length > 0 ? (
                  <div className="space-y-2">
                    {q.options.map((opt: string, optIdx: number) => {
                      let btnStyle =
                        'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-amber-400';

                      if (submitted) {
                        if (isAnswerMatching(opt, q.correctAnswer, q.options)) {
                          btnStyle =
                            'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-semibold';
                        } else if (chosen === opt && !isRight) {
                          btnStyle =
                            'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300';
                        } else {
                          btnStyle = 'opacity-50 border-slate-200 dark:border-slate-800';
                        }
                      } else if (chosen === opt) {
                        btnStyle =
                          'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-slate-900 dark:text-white font-semibold ring-1 ring-amber-500';
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, opt)}
                          disabled={submitted}
                          className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-start gap-2.5 ${btnStyle}`}
                        >
                          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 font-mono">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{cleanFormulaString(opt)}</span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  /* Short Answer Field */
                  <div>
                    <input
                      type="text"
                      disabled={submitted}
                      value={chosen}
                      onChange={(e) => handleShortAnswerChange(q.id, e.target.value)}
                      placeholder={activeLearningLanguage === 'ts' ? 'Tsala nhlamulo ya wena laha...' : 'Type your answer here...'}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    {submitted && (
                      <div className="mt-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                        Expected Answer: <span className="text-amber-600 dark:text-amber-400 font-mono">{cleanFormulaString(q.correctAnswer)}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Explanation Card */}
                {submitted && (
                  <>
                    <div className="mt-3 p-3 bg-white dark:bg-slate-900 rounded-lg text-xs leading-relaxed text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                      <strong className="text-amber-600 dark:text-amber-400 block mb-1">
                        {uiStrings.explanationPrefix || 'Explanation: '}
                      </strong>
                      <CleanFormulaRenderer content={q.explanation} />
                    </div>
                    <AnswerFeedbackWidget
                      question={q.question}
                      answer={q.explanation || q.correctAnswer || ''}
                    />
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            {submitted && score !== null ? (
              <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                Final Score: {score}% ({Math.round((score / 100) * localizedQuiz.questions.length)} / {localizedQuiz.questions.length} Correct)
              </span>
            ) : (
              <span>Answer all questions to submit and record score</span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {submitted ? (
              <>
                <button
                  onClick={handleSaveQuizToLibrary}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <BookmarkPlus className="w-3.5 h-3.5 text-amber-500" />
                  <span>{savedSuccess ? 'Saved ✓' : 'Save Quiz'}</span>
                </button>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setAnswers({});
                    setScore(null);
                  }}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{uiStrings.tryAgain || 'Retake Quiz'}</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(answers).length < localizedQuiz.questions.length}
                className="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-xl transition-all shadow-sm active:scale-95"
              >
                {uiStrings.submitAnswer || 'Submit Answers'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
