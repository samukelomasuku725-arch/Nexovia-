import React, { useState } from 'react';
import {
  X,
  Sparkles,
  AlertTriangle,
  RotateCcw,
  Check,
  Award,
  BookmarkPlus,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useAuth } from '../../context/AuthContext';
import { PracticeQuestion } from '../../../server/ai';

export interface GeneratedPracticeSet {
  id: string;
  title: string;
  educationLevel: string;
  subject: string;
  topic: string;
  isAiGenerated: true;
  disclaimer: string;
  questions: PracticeQuestion[];
  createdAt: string;
}

interface Props {
  practiceSet: GeneratedPracticeSet;
  onClose: () => void;
}

export const PracticeGeneratorModal: React.FC<Props> = ({ practiceSet, onClose }) => {
  const { recordQuizAttempt, saveLearningItem } = useLearning();
  const { user } = useAuth();

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

  const handleSubmit = async () => {
    let correctCount = 0;
    practiceSet.questions.forEach((q) => {
      const userAns = (answers[q.id] || '').trim().toLowerCase();
      const rightAns = q.correctAnswer.trim().toLowerCase();

      if (q.type === 'short_answer') {
        if (
          userAns.length > 2 &&
          (rightAns.includes(userAns) || userAns.includes(rightAns) || userAns === rightAns)
        ) {
          correctCount++;
        }
      } else {
        if (userAns === rightAns) {
          correctCount++;
        }
      }
    });

    const calculatedPercentage = Math.round((correctCount / practiceSet.questions.length) * 100);
    setScore(calculatedPercentage);
    setSubmitted(true);

    // Record persistent attempt
    recordQuizAttempt({
      quizId: practiceSet.id,
      quizTitle: practiceSet.title,
      subject: practiceSet.subject,
      topic: practiceSet.topic,
      answers,
      score: correctCount,
      totalQuestions: practiceSet.questions.length,
      percentage: calculatedPercentage
    });

    // Send event to server if user is logged in
    fetch('/api/progress/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'practice_completed',
        topic: practiceSet.topic,
        quizAttempt: {
          quizId: practiceSet.id,
          quizTitle: practiceSet.title,
          subject: practiceSet.subject,
          topic: practiceSet.topic,
          score: correctCount,
          totalQuestions: practiceSet.questions.length,
          percentage: calculatedPercentage
        }
      })
    }).catch(() => {});
  };

  const handleSaveToLibrary = () => {
    saveLearningItem({
      type: 'question',
      title: `${practiceSet.title} (${practiceSet.subject})`,
      content: practiceSet.questions
        .map(
          (q, idx) =>
            `Q${idx + 1} (${q.type}): ${q.question}\nCorrect: ${q.correctAnswer}\nWorking / Explanation: ${q.explanation}`
        )
        .join('\n\n'),
      subject: practiceSet.subject,
      topic: practiceSet.topic,
      language: 'en',
      tags: ['AI Practice', practiceSet.educationLevel, practiceSet.subject]
    });

    // Also persist to server
    fetch('/api/saved', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: `${practiceSet.title} (${practiceSet.subject})`,
        content: practiceSet.questions
          .map(
            (q, idx) =>
              `Q${idx + 1}: ${q.question}\nCorrect: ${q.correctAnswer}\nExplanation: ${q.explanation}`
          )
          .join('\n\n'),
        subject: practiceSet.subject,
        topic: practiceSet.topic,
        language: 'en',
        type: 'question'
      })
    }).catch(() => {});

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="px-5 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {practiceSet.educationLevel} · {practiceSet.subject}
              </span>
            </div>
            <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
              {practiceSet.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-colors"
            aria-label="Close Practice"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mandatory AI Practice Disclaimer Banner */}
        <div className="px-5 py-2.5 bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-900/40 flex items-center gap-2 text-xs text-amber-900 dark:text-amber-300 shrink-0">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <span>
            <strong>Practice Notice:</strong> {practiceSet.disclaimer}
          </span>
        </div>

        {/* Questions Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {practiceSet.questions.map((q, qIdx) => {
            const chosen = answers[q.id] || '';
            const isRight =
              submitted &&
              (q.type === 'short_answer'
                ? chosen.toLowerCase().includes(q.correctAnswer.toLowerCase()) ||
                  q.correctAnswer.toLowerCase().includes(chosen.toLowerCase())
                : chosen.toLowerCase() === q.correctAnswer.toLowerCase());

            return (
              <div
                key={q.id}
                className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 rounded-xl p-4 sm:p-5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Question {qIdx + 1} of {practiceSet.questions.length} ·{' '}
                    {q.type.replace('_', ' ')}
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
                  {q.question}
                </h4>

                {/* Multiple Choice & True/False */}
                {q.options && q.options.length > 0 ? (
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      let btnStyle =
                        'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-amber-400';

                      if (submitted) {
                        if (opt.toLowerCase() === q.correctAnswer.toLowerCase()) {
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
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  /* Short Answer */
                  <div>
                    <input
                      type="text"
                      disabled={submitted}
                      value={chosen}
                      onChange={(e) => handleShortAnswerChange(q.id, e.target.value)}
                      placeholder="Type your answer here..."
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    {submitted && (
                      <div className="mt-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                        Expected Answer:{' '}
                        <span className="text-amber-600 dark:text-amber-400 font-mono">
                          {q.correctAnswer}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Explanation */}
                {submitted && (
                  <div className="mt-3 p-3 bg-white dark:bg-slate-900 rounded-lg text-xs leading-relaxed text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                    <strong>Explanation: </strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500">
            {submitted && score !== null ? (
              <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                Score: {score}% ({Math.round((score / 100) * practiceSet.questions.length)} /{' '}
                {practiceSet.questions.length} Correct)
              </span>
            ) : (
              <span>
                Questions answered: {Object.keys(answers).length} / {practiceSet.questions.length}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {submitted ? (
              <>
                <button
                  onClick={handleSaveToLibrary}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <BookmarkPlus className="w-3.5 h-3.5 text-amber-500" />
                  <span>{savedSuccess ? 'Saved ✓' : 'Save Practice'}</span>
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
                  <span>Retry Practice</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={Object.keys(answers).length < practiceSet.questions.length}
                className="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-xl transition-all shadow-sm active:scale-95"
              >
                Submit Practice Answers
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
