/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIA ACADEMY - PHASE 7: ASSESSMENT HUB VIEW
 * 
 * Central Assessment Center for South African Learners & Educators:
 * - Filterable by Assessment Types: Practice, Quiz, Test, Assignment, Exam
 * - In Progress tracking & Draft resumption
 * - Completed Assessments history with pass/fail and review results
 * - Teacher / Administrator Authoring Studio (Builder & Question Bank)
 * - Directly integrated with Adaptive Learning & CAPS Curriculum
 */

import React, { useState, useMemo } from 'react';
import {
  Award,
  CheckCircle2,
  Clock,
  Zap,
  Sparkles,
  BookOpen,
  ArrowRight,
  Filter,
  Plus,
  Layers,
  ShieldCheck,
  Search,
  RotateCcw,
  Sliders,
  Check,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  FileCheck2
} from 'lucide-react';
import {
  AssessmentAttempt,
  AssessmentModel,
  AssessmentType
} from '../../types/assessment';
import { assessmentEngine } from '../../services/assessment/assessmentEngine';
import { useLearning } from '../../context/LearningContext';
import { SOURCE_CLASSIFICATION_INFO } from '../../config/curriculumConfig';
import { multilingualEducationalService } from '../../services/language/multilingualEducationalService';
import { AssessmentPlayerModal } from './AssessmentPlayerModal';
import { AssessmentResultsModal } from './AssessmentResultsModal';
import { AssessmentBuilderModal } from './AssessmentBuilderModal';
import { QuestionBankModal } from './QuestionBankModal';

export const AssessmentHubView: React.FC = () => {
  const { userProgress, adaptiveProfile, setCurrentTab, activeLearningLanguage } = useLearning();

  // Active filter tab
  const [filterType, setFilterType] = useState<AssessmentType | 'ALL' | 'IN_PROGRESS' | 'COMPLETED' | 'ADMIN'>('ALL');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');

  // Modals
  const [playerModalOpen, setPlayerModalOpen] = useState<boolean>(false);
  const [activeAssessment, setActiveAssessment] = useState<AssessmentModel | null>(null);

  const [resultsModalOpen, setResultsModalOpen] = useState<boolean>(false);
  const [latestAttempt, setLatestAttempt] = useState<AssessmentAttempt | null>(null);

  const [builderModalOpen, setBuilderModalOpen] = useState<boolean>(false);
  const [questionBankModalOpen, setQuestionBankModalOpen] = useState<boolean>(false);

  // Past completed attempts stored in component / local state
  const [attemptHistory, setAttemptHistory] = useState<AssessmentAttempt[]>(() => {
    try {
      const saved = localStorage.getItem('nexovia_assessment_history_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // All published assessments from engine
  const [assessmentsList, setAssessmentsList] = useState<AssessmentModel[]>(() =>
    assessmentEngine.getAssessments(true)
  );

  // Handle Assessment Completion
  const handleAssessmentComplete = (attempt: AssessmentAttempt) => {
    setPlayerModalOpen(false);
    setLatestAttempt(attempt);
    setResultsModalOpen(true);

    const updated = [attempt, ...attemptHistory];
    setAttemptHistory(updated);
    try {
      localStorage.setItem('nexovia_assessment_history_v1', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Launch assessment in player modal
  const handleStartAssessment = (asmt: AssessmentModel) => {
    setActiveAssessment(asmt);
    setPlayerModalOpen(true);
  };

  // Filtered Assessments
  const filteredAssessments = useMemo(() => {
    return assessmentsList.filter((a) => {
      // Type filter
      if (filterType !== 'ALL' && filterType !== 'IN_PROGRESS' && filterType !== 'COMPLETED' && filterType !== 'ADMIN') {
        if (a.assessmentType !== filterType) return false;
      }

      // Subject filter
      if (subjectFilter !== 'all' && a.subject.toLowerCase() !== subjectFilter.toLowerCase()) {
        return false;
      }

      // Keyword search
      if (searchKeyword.trim()) {
        const kw = searchKeyword.toLowerCase();
        const matchesTitle = a.title.toLowerCase().includes(kw);
        const matchesTopic = (a.topic || '').toLowerCase().includes(kw);
        const matchesSubject = a.subject.toLowerCase().includes(kw);
        if (!matchesTitle && !matchesTopic && !matchesSubject) return false;
      }

      return true;
    });
  }, [assessmentsList, filterType, subjectFilter, searchKeyword]);

  // Overall Statistics
  const completedAttemptsCount = attemptHistory.length;
  const averagePercentage =
    completedAttemptsCount > 0
      ? Math.round(
          attemptHistory.reduce((sum, att) => sum + (att.percentage || 0), 0) / completedAttemptsCount
        )
      : 0;
  const totalMarksEarned = attemptHistory.reduce((sum, att) => sum + (att.score || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      
      {/* 1. HERO BANNER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Phase 7 · Assessments & Exam Engine
            </span>
            <span className="text-xs text-slate-400">
              Practice · Quizzes · Formal Tests · Matric Exams
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-bold">
            Evaluations & Examination Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Test your knowledge with 8 question types, automatic marking, AI-assisted rubric evaluation, and instant synchronization with your Adaptive Learning mastery heuristic.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-3 gap-3 shrink-0 text-center">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <span className="font-display text-xl sm:text-2xl font-bold text-amber-400 block">
              {completedAttemptsCount}
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Completed</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <span className="font-display text-xl sm:text-2xl font-bold text-emerald-400 block">
              {averagePercentage}%
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Average</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <span className="font-display text-xl sm:text-2xl font-bold text-white block">
              {totalMarksEarned}
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Marks</span>
          </div>
        </div>
      </div>

      {/* 2. FILTER & ACTION BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-4">
        {/* Type Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'ALL', label: 'All Evaluations' },
            { id: 'PRACTICE', label: 'Practice (Adaptive)' },
            { id: 'QUIZ', label: 'Quizzes' },
            { id: 'TEST', label: 'Formal Tests' },
            { id: 'ASSIGNMENT', label: 'Assignments' },
            { id: 'EXAM', label: 'Matric Exams' },
            { id: 'COMPLETED', label: `Results (${completedAttemptsCount})` },
            { id: 'ADMIN', label: 'Teacher Studio' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                filterType === tab.id
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Subject Filters */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Search evaluations..."
              className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Teacher/Admin actions */}
          <button
            onClick={() => setBuilderModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold shadow-xs transition-transform active:scale-95"
            title="Create an assessment"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Create Assessment</span>
          </button>
        </div>
      </div>

      {/* 3. MAIN CONTENT: TEACHER STUDIO vs COMPLETED vs ASSESSMENTS GRID */}
      {filterType === 'ADMIN' ? (
        /* TEACHER / ADMIN STUDIO */
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider">
                  Teacher & Administrator Studio
                </span>
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                Curriculum Assessment Authoring & Question Bank
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xl">
                Design custom quizzes, formal term tests, and national examination blueprints aligned with South African curriculum outcomes.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuestionBankModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 shadow-xs"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                <span>Open Question Bank</span>
              </button>

              <button
                onClick={() => setBuilderModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-xs transition-transform active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Assessment Wizard</span>
              </button>
            </div>
          </div>

          {/* Quick stats on authoring */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800">
              <span className="text-xs text-slate-500 font-semibold block mb-1">Published Assessments</span>
              <span className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                {assessmentsList.length}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800">
              <span className="text-xs text-slate-500 font-semibold block mb-1">Reusable Question Bank</span>
              <span className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                {assessmentEngine.filterQuestionBank({}).length} Questions
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800">
              <span className="text-xs text-slate-500 font-semibold block mb-1">Marking Engine Support</span>
              <span className="font-display text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-2 block">
                8 Question Types · Automatic + AI Rubric
              </span>
            </div>
          </div>
        </div>
      ) : filterType === 'COMPLETED' ? (
        /* COMPLETED ATTEMPTS RESULTS HISTORY */
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              Completed Assessment Attempts ({attemptHistory.length})
            </span>
          </div>

          {attemptHistory.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                No Assessments Completed Yet
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Complete a practice quiz, test, or matric exam to view detailed score breakdown and pedagogical explanations here.
              </p>
              <button
                onClick={() => setFilterType('PRACTICE')}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold"
              >
                Try a Practice Quiz
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {attemptHistory.map((att) => (
                <div
                  key={att.id}
                  className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-amber-600 dark:text-amber-400 uppercase text-[10px]">
                        {att.assessmentType}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          att.passed
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}
                      >
                        {att.passed ? 'PASSED' : 'NEEDS PRACTICE'}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">
                      {att.assessmentTitle}
                    </h4>

                    <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                      <span>Score: <strong className="text-slate-900 dark:text-white">{att.score}/{att.totalMarks}</strong> ({att.percentage}%)</span>
                      <span>·</span>
                      <span>{new Date(att.startedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      Attempt #{att.attemptNumber}
                    </span>

                    <button
                      onClick={() => {
                        const originalAsmt = assessmentEngine.getAssessmentById(att.assessmentId);
                        if (originalAsmt) {
                          setActiveAssessment(originalAsmt);
                          setLatestAttempt(att);
                          setResultsModalOpen(true);
                        }
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-900 dark:text-white"
                    >
                      <FileCheck2 className="w-3.5 h-3.5 text-amber-500" />
                      <span>Review Answers</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* AVAILABLE ASSESSMENTS GRID */
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Showing {filteredAssessments.length} Available Assessments</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAssessments.map((asmt) => {
              const badge = SOURCE_CLASSIFICATION_INFO[asmt.sourceType || 'DEMO'];
              const localizedAsmt = multilingualEducationalService.localizeAssessment(asmt, activeLearningLanguage);

              return (
                <div
                  key={asmt.id}
                  className="p-5 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-600 dark:text-amber-400 uppercase text-[10px] tracking-wider">
                        {asmt.assessmentType}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badge.badgeColor}`}>
                        {badge.label}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
                      {localizedAsmt.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {localizedAsmt.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-500">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                        {asmt.subject}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                        {asmt.grade}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                        {asmt.questions.length} Questions
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                        {asmt.totalMarks} Marks
                      </span>
                      {asmt.durationMinutes && (
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{asmt.durationMinutes} min</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      Pass: {asmt.passingPercentage}%
                    </span>

                    <button
                      onClick={() => handleStartAssessment(asmt)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-xs transition-transform active:scale-95"
                    >
                      <span>Start Assessment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODALS */}
      <AssessmentPlayerModal
        isOpen={playerModalOpen}
        assessment={activeAssessment}
        onClose={() => setPlayerModalOpen(false)}
        onComplete={handleAssessmentComplete}
      />

      <AssessmentResultsModal
        isOpen={resultsModalOpen}
        attempt={latestAttempt}
        assessment={activeAssessment}
        onClose={() => setResultsModalOpen(false)}
        onRetake={() => {
          setResultsModalOpen(false);
          setPlayerModalOpen(true);
        }}
      />

      <AssessmentBuilderModal
        isOpen={builderModalOpen}
        onClose={() => setBuilderModalOpen(false)}
        onAssessmentSaved={(newAsmt) => {
          setAssessmentsList([newAsmt, ...assessmentsList]);
        }}
      />

      <QuestionBankModal
        isOpen={questionBankModalOpen}
        onClose={() => setQuestionBankModalOpen(false)}
      />
    </div>
  );
};
