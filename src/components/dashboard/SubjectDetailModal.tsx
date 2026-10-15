/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIA ACADEMY - PHASE 8: SUBJECT DETAIL DASHBOARD MODAL
 * 
 * Complete subject exploration:
 * Subject Overview → Current Term → Topics → Lessons → Practice → Assessments
 */

import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Compass,
  Award,
  ChevronRight,
  Sparkles,
  Calculator,
  Atom,
  Leaf,
  Cpu,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { SubjectDashboardCard } from '../../types/dashboard';
import { useLearning } from '../../context/LearningContext';

interface SubjectDetailModalProps {
  subject: SubjectDashboardCard | null;
  onClose: () => void;
  onOpenTopicMastery: (topicName: string) => void;
  onStartPractice: (topicName: string) => void;
}

export const SubjectDetailModal: React.FC<SubjectDetailModalProps> = ({
  subject,
  onClose,
  onOpenTopicMastery,
  onStartPractice
}) => {
  const { setCurrentTab, openLesson } = useLearning();
  const [selectedTerm, setSelectedTerm] = useState<number>(1);

  if (!subject) return null;

  // Mock term topic data derived from CAPS Grade 10
  const termTopics: Record<number, Array<{
    id: string;
    title: string;
    subtopicsCount: number;
    completionPct: number;
    masteryScore: number;
    masteryStatus: string;
    lastActivity: string;
    firstLessonId: string;
  }>> = {
    1: [
      {
        id: 'top-1',
        title: subject.id === 'math' ? 'Algebra & Factorization' : subject.id === 'phys' ? "Newton's Laws of Motion" : 'Cell Structure & Mitosis',
        subtopicsCount: 4,
        completionPct: 75,
        masteryScore: subject.masteryPercentage,
        masteryStatus: subject.masteryStatus,
        lastActivity: 'Yesterday',
        firstLessonId: 'caps-g10-math-t1-l1'
      },
      {
        id: 'top-2',
        title: subject.id === 'math' ? 'Algebraic Fractions' : subject.id === 'phys' ? 'Vectors & Scalars' : 'Molecules for Life',
        subtopicsCount: 3,
        completionPct: 50,
        masteryScore: 54,
        masteryStatus: 'DEVELOPING',
        lastActivity: '3 days ago',
        firstLessonId: 'caps-g10-math-t1-l2'
      },
      {
        id: 'top-3',
        title: subject.id === 'math' ? 'Quadratic Equations' : subject.id === 'phys' ? 'Work, Energy & Power' : 'Support & Transport Systems',
        subtopicsCount: 5,
        completionPct: 20,
        masteryScore: 38,
        masteryStatus: 'NEEDS_SUPPORT',
        lastActivity: '5 days ago',
        firstLessonId: 'caps-g10-math-t1-l3'
      }
    ],
    2: [
      {
        id: 'top-4',
        title: subject.id === 'math' ? 'Functions & Graphs (Hyperbola/Parabola)' : subject.id === 'phys' ? 'Electric Circuits & Ohm\'s Law' : 'Plant Organs & Anatomy',
        subtopicsCount: 4,
        completionPct: 0,
        masteryScore: 0,
        masteryStatus: 'NOT_STARTED',
        lastActivity: 'Not started',
        firstLessonId: 'caps-g10-math-t2-l1'
      }
    ],
    3: [
      {
        id: 'top-5',
        title: subject.id === 'math' ? 'Trigonometry & Reduction Formulae' : subject.id === 'phys' ? 'Chemical Reactions & Stoichiometry' : 'Biodiversity & Classification',
        subtopicsCount: 4,
        completionPct: 0,
        masteryScore: 0,
        masteryStatus: 'NOT_STARTED',
        lastActivity: 'Not started',
        firstLessonId: 'caps-g10-math-t3-l1'
      }
    ],
    4: [
      {
        id: 'top-6',
        title: subject.id === 'math' ? 'Analytical Geometry & Statistics' : subject.id === 'phys' ? 'Electromagnetism & Waves' : 'Environmental Studies & Biomes',
        subtopicsCount: 4,
        completionPct: 0,
        masteryScore: 0,
        masteryStatus: 'NOT_STARTED',
        lastActivity: 'Not started',
        firstLessonId: 'caps-g10-math-t4-l1'
      }
    ]
  };

  const currentTopics = termTopics[selectedTerm] || termTopics[1];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'MASTERED':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 px-2 py-0.5 rounded-md">
            <Sparkles className="w-3 h-3 text-purple-500" />
            Mastered (≥90%)
          </span>
        );
      case 'STRONG':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-md">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            Strong (75–89%)
          </span>
        );
      case 'BASIC':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded-md">
            Basic (60–74%)
          </span>
        );
      case 'DEVELOPING':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 px-2 py-0.5 rounded-md">
            Developing (40–59%)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 px-2 py-0.5 rounded-md">
            <AlertCircle className="w-3 h-3 text-rose-500" />
            Needs Practice (&lt;40%)
          </span>
        );
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="subject-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-white shadow-xs`}>
              {subject.id === 'math' && <Calculator className="w-5 h-5" />}
              {subject.id === 'phys' && <Atom className="w-5 h-5" />}
              {subject.id === 'life' && <Leaf className="w-5 h-5" />}
              {subject.id === 'tech' && <Cpu className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="subject-detail-title" className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {subject.title}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                  {subject.code}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                CAPS Grade 10 · 4 Terms · Official DBE Framework
              </p>
            </div>
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
          {/* Key Metrics Header */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Completion
              </span>
              <span className="font-mono text-lg font-bold text-slate-900 dark:text-white">
                {subject.completionPercentage}%
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Topic Mastery
              </span>
              <span className="font-mono text-lg font-bold text-amber-600 dark:text-amber-400">
                {subject.masteryPercentage}%
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Lessons Done
              </span>
              <span className="font-mono text-lg font-bold text-slate-900 dark:text-white">
                {subject.lessonsCompleted}/{subject.totalLessons}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Term Phase
              </span>
              <span className="font-mono text-lg font-bold text-blue-600 dark:text-blue-400">
                Term 1
              </span>
            </div>
          </div>

          {/* Term Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Curriculum Terms
              </label>
              <span className="text-[11px] text-slate-500">
                DBE Academic Schedule
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTerm(t)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                    selectedTerm === t
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Term {t}
                </button>
              ))}
            </div>
          </div>

          {/* Topics List */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Term {selectedTerm} Topics & Mastery
            </h4>
            <div className="space-y-3">
              {currentTopics.map((top) => (
                <div
                  key={top.id}
                  className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-amber-400/50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <div>
                      <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                        {top.title}
                      </h5>
                      <span className="text-[11px] text-slate-500">
                        {top.subtopicsCount} Subtopics · Last Activity: {top.lastActivity}
                      </span>
                    </div>
                    <div>{getStatusBadge(top.masteryStatus)}</div>
                  </div>

                  {/* Progress & Actions */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-500">Mastery:</span>
                      <strong className="text-amber-600 dark:text-amber-400 font-mono">
                        {top.masteryScore}%
                      </strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenTopicMastery(top.title)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        Inspect Mastery
                      </button>

                      <button
                        onClick={() => {
                          onClose();
                          onStartPractice(top.title);
                        }}
                        className="flex items-center gap-1 px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[11px] rounded-lg transition-transform active:scale-95"
                      >
                        <span>Practice</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500 text-center sm:text-left">
            Diagnostic mastery heuristics guide adaptive practice.
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                setCurrentTab('school');
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-semibold rounded-xl transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Full Curriculum</span>
            </button>
            <button
              onClick={() => {
                onClose();
                setCurrentTab('assessments');
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl shadow-xs transition-transform active:scale-95"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Term Assessments</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
