/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIA ACADEMY - PHASE 8: TOPIC MASTERY DETAIL MODAL
 * 
 * Detailed mastery breakdown:
 * - Diagnostic mastery score & status
 * - Performance trend (e.g. 52% → 61% → 68% Improving)
 * - Strong vs Weak subtopics breakdown
 * - Non-shaming encouraging recommendations
 * - Disclaimer: Diagnostic heuristics, not official DBE marks.
 */

import React from 'react';
import {
  X,
  Sparkles,
  TrendingUp,
  Target,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { TopicMasteryDetail } from '../../types/dashboard';
import { useLearning } from '../../context/LearningContext';

interface TopicMasteryModalProps {
  detail: TopicMasteryDetail | null;
  onClose: () => void;
  onPractice: (topicName: string) => void;
}

export const TopicMasteryModal: React.FC<TopicMasteryModalProps> = ({
  detail,
  onClose,
  onPractice
}) => {
  const { setCurrentTab, updateLearningContext } = useLearning();

  if (!detail) return null;

  const getMasteryColor = (score: number) => {
    if (score >= 90) return 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800';
    if (score >= 75) return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800';
    if (score >= 60) return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800';
    if (score >= 40) return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800';
    return 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800';
  };

  const handleAskAiTutor = () => {
    if (updateLearningContext) {
      updateLearningContext({
        educationLevel: 'FET Phase (Grade 10–12 CAPS)',
        gradeOrProgramme: 'Grade 10',
        subject: detail.subject,
        topic: detail.topic,
        language: 'en',
        mode: 'explain'
      });
    }
    onClose();
    setCurrentTab('tutor');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="topic-mastery-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {detail.subject}
              </span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="text-xs text-slate-500">Diagnostic Mastery</span>
            </div>
            <h3 id="topic-mastery-title" className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              {detail.topic}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Score & Heuristic Status Card */}
          <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${getMasteryColor(detail.masteryPercentage)}`}>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider opacity-80 block mb-1">
                Current Diagnostic Mastery
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-3xl font-extrabold">
                  {detail.masteryPercentage}%
                </span>
                <span className="text-xs font-semibold capitalize">
                  {detail.masteryStatus.replace('_', ' ').toLowerCase()}
                </span>
              </div>
              <p className="text-[11px] opacity-90 mt-1">
                Calculated from practice sessions, quizzes, and assessment attempts.
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs font-bold block mb-1 opacity-80">
                Performance Trend
              </span>
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span>{detail.recentScores.join('% → ')}%</span>
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block mt-0.5">
                Steady Progress Detected
              </span>
            </div>
          </div>

          {/* Official DBE Disclaimer */}
          <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Notice:</strong> Nexovia mastery percentages are internal diagnostic heuristics designed to personalize your learning difficulty. They do not represent official Department of Basic Education (DBE) or school report card marks.
            </p>
          </div>

          {/* Subtopic Strengths vs Weaknesses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Strong Subtopics */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>You’re Doing Well With</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {detail.strongSubtopics.map((sub, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-1.5">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{sub}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weak Subtopics */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-400 mb-2">
                <AlertCircle className="w-4 h-4 text-rose-500" />
                <span>Concepts Needing Practice</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {detail.weakSubtopics.map((sub, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-1.5">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{sub}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommended Action */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-amber-500/20">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
              Adaptive Recommendation
            </span>
            <p className="text-xs sm:text-sm text-slate-900 dark:text-white font-medium">
              {detail.recommendedAction}
            </p>
          </div>

          {/* Mastery Scale Reference */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Nexovia Diagnostic Mastery Scale
            </span>
            <div className="grid grid-cols-5 gap-1.5 text-center text-[10px]">
              <div className="p-1.5 rounded bg-rose-100 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 font-medium">
                0–39%<br /><span className="text-[9px]">Support</span>
              </div>
              <div className="p-1.5 rounded bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 font-medium">
                40–59%<br /><span className="text-[9px]">Developing</span>
              </div>
              <div className="p-1.5 rounded bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-medium">
                60–74%<br /><span className="text-[9px]">Basic</span>
              </div>
              <div className="p-1.5 rounded bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-medium">
                75–89%<br /><span className="text-[9px]">Strong</span>
              </div>
              <div className="p-1.5 rounded bg-purple-100 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 font-medium">
                90–100%<br /><span className="text-[9px]">Mastered</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleAskAiTutor}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Explain With AI Tutor</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onPractice(detail.topic);
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl shadow-xs transition-transform active:scale-95"
          >
            <Target className="w-3.5 h-3.5" />
            <span>Practice Topic Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
