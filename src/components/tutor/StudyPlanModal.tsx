/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  BookmarkPlus,
  BookOpen,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { StudyPlan } from '../../types';

interface Props {
  onClose: () => void;
  onOpenQuiz?: () => void;
}

export const StudyPlanModal: React.FC<Props> = ({ onClose }) => {
  const { learningContext, createStudyPlan, saveLearningItem, studyPlans } = useLearning();

  const [availableTime, setAvailableTime] = useState('4 hours per week');
  const [targetDate, setTargetDate] = useState('Upcoming test in 3 weeks');
  const [generatedPlan, setGeneratedPlan] = useState<StudyPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const timePresets = [
    '2 hours per week',
    '4 hours per week',
    '7 hours per week (1h daily)',
    '12+ hours per week (intensive)'
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const plan = await createStudyPlan(availableTime, targetDate);
      setGeneratedPlan(plan);
    } catch (err: any) {
      setError(err?.message || "Nexovian couldn't generate a study plan right now.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToLibrary = () => {
    if (!generatedPlan) return;
    saveLearningItem({
      type: 'summary',
      title: generatedPlan.title,
      content: `${generatedPlan.planOverview}\n\nSchedule:\n${generatedPlan.schedule
        .map((s) => `### ${s.dayOrPhase}: ${s.focus}\n- Activities: ${s.activities.join(', ')}\n- Milestone: ${s.milestone}`)
        .join('\n\n')}\n\nStudy Tips:\n${generatedPlan.tips.map((t) => `- ${t}`).join('\n')}`,
      subject: generatedPlan.subject,
      topic: generatedPlan.topic,
      language: learningContext.language,
      tags: ['Study Plan', generatedPlan.gradeOrProgramme]
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
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-sm">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Personalized Study Plan
              </h2>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {learningContext.gradeOrProgramme || learningContext.educationLevel} · {learningContext.subject}: {learningContext.topic}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close study plan modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {!generatedPlan ? (
            <form onSubmit={handleGenerate} className="space-y-5">
              <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  The AI Tutor will craft a step-by-step revision roadmap calibrated for{' '}
                  <strong>{learningContext.gradeOrProgramme || learningContext.educationLevel}</strong> in{' '}
                  <strong>{learningContext.subject}</strong> ({learningContext.topic}).
                </p>
              </div>

              {/* Time Presets */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Available Study Time</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {timePresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAvailableTime(preset)}
                      className={`p-2.5 rounded-xl border text-xs text-left transition-colors font-medium ${
                        availableTime === preset
                          ? 'border-amber-500 bg-amber-500/10 text-amber-900 dark:text-amber-200 font-bold'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  <span>Target Date / Test Deadline</span>
                </label>
                <input
                  type="text"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  placeholder="e.g. Matric Trials in 4 weeks, or Term 2 Test"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {error && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-xs text-rose-800 dark:text-rose-300">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Synthesizing Study Schedule...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Structured Study Plan</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Generated Plan Overview */}
              <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
                  {generatedPlan.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {generatedPlan.planOverview}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded">
                    Time: {generatedPlan.availableStudyTime}
                  </span>
                  <span className="bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded">
                    Target: {generatedPlan.targetDate}
                  </span>
                </div>
              </div>

              {/* Schedule Timeline */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Phase Timeline & Milestones
                </h4>
                <div className="space-y-3">
                  {generatedPlan.schedule.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 shadow-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-xs text-amber-600 dark:text-amber-400">
                          {item.dayOrPhase}
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          ✓ {item.milestone}
                        </span>
                      </div>
                      <div className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                        {item.focus}
                      </div>
                      <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-1 pl-1">
                        {item.activities.map((act, aIdx) => (
                          <li key={aIdx}>{act}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Recall Tips */}
              {generatedPlan.tips && generatedPlan.tips.length > 0 && (
                <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-xl space-y-2">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 block">
                    High-Yield Exam & Active Recall Tips
                  </span>
                  <ul className="text-xs text-emerald-900/90 dark:text-emerald-300/90 space-y-1 list-disc list-inside">
                    {generatedPlan.tips.map((tip, tIdx) => (
                      <li key={tIdx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Bottom Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-2">
                <button
                  onClick={() => setGeneratedPlan(null)}
                  className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  ← Modify Parameters
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleSaveToLibrary}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl transition-all shadow-sm active:scale-95"
                  >
                    <BookmarkPlus className="w-3.5 h-3.5" />
                    <span>{savedSuccess ? 'Saved to Library!' : 'Save Plan to Library'}</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-sm active:scale-95"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
