/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN ACADEMY - PHASE 8: PROGRESS TRENDS VISUALIZATION
 * 
 * Mobile-first, responsive SVG data visualizations:
 * 1. Diagnostic Mastery Over Time (trend points & line)
 * 2. Assessment Performance Over Time (score bar chart with pass thresholds)
 * 3. Lessons Completed Progression
 * 4. Daily Study Activity (minutes per day)
 * 
 * Designed for mobile legibility with no heavy external chart libraries.
 * Handles new learner empty state cleanly:
 * "No trend yet. Complete a few learning activities to see your progress."
 */

import React from 'react';
import {
  TrendingUp,
  BarChart3,
  Calendar,
  Clock,
  BookOpen,
  Award,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ProgressTrendsData } from '../../types/dashboard';
import { useLearning } from '../../context/LearningContext';

interface ProgressTrendsViewProps {
  trends: ProgressTrendsData;
}

export const ProgressTrendsView: React.FC<ProgressTrendsViewProps> = ({ trends }) => {
  const { setCurrentTab } = useLearning();

  if (!trends.hasSufficientData) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto shadow-xs space-y-4 animate-fade-in">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
          <TrendingUp className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            No trend yet
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
            Complete a few learning activities to see your progress over time.
          </p>
        </div>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <button
            onClick={() => setCurrentTab('school')}
            className="w-full sm:w-auto px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-transform active:scale-95"
          >
            Start Your First Lesson
          </button>
          <button
            onClick={() => setCurrentTab('practice')}
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-xl text-xs transition-colors"
          >
            Try Practice Questions
          </button>
        </div>
      </div>
    );
  }

  // Calculate SVG polyline points for Mastery Trend
  const masteryPoints = trends.masteryOverTime;
  const maxMastery = 100;
  const svgWidth = 400;
  const svgHeight = 140;
  const paddingX = 40;
  const paddingY = 25;

  const pointsString = masteryPoints
    .map((p, idx) => {
      const x = paddingX + (idx / (masteryPoints.length - 1)) * (svgWidth - 2 * paddingX);
      const y = svgHeight - paddingY - (p.value / maxMastery) * (svgHeight - 2 * paddingY);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="w-full max-w-full overflow-hidden space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950">
                Progress Analytics
              </span>
              <span className="text-xs text-slate-500">Heuristic Trajectory</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Learning Progress & Performance Trends
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
              Track how your diagnostic mastery, assessment scores, and daily study habits evolve over time.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-right self-start sm:self-auto">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Active Evaluation Window
            </span>
            <span className="text-xs font-bold font-mono text-slate-900 dark:text-white">
              Last 4 Weeks · Term 1
            </span>
          </div>
        </div>
      </div>

      {/* Grid: 4 Core Visualizations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Mastery Over Time (Clean Line Chart) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    Mastery Over Time
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    Weekly diagnostic accuracy trajectory
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                {masteryPoints[masteryPoints.length - 1]?.value}% Current
              </span>
            </div>

            {/* SVG Line Graph */}
            <div className="w-full bg-slate-50 dark:bg-slate-950/60 rounded-2xl p-2 border border-slate-100 dark:border-slate-800 overflow-hidden">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-36">
                {/* Horizontal gridlines */}
                <line x1={paddingX} y1={paddingY} x2={svgWidth - paddingX} y2={paddingY} stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeDasharray="3 3" />
                <line x1={paddingX} y1={svgHeight / 2} x2={svgWidth - paddingX} y2={svgHeight / 2} stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeDasharray="3 3" />
                <line x1={paddingX} y1={svgHeight - paddingY} x2={svgWidth - paddingX} y2={svgHeight - paddingY} stroke="currentColor" className="text-slate-200 dark:text-slate-800" />

                {/* Trend line */}
                <polyline
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={pointsString}
                />

                {/* Data points */}
                {masteryPoints.map((p, idx) => {
                  const cx = paddingX + (idx / (masteryPoints.length - 1)) * (svgWidth - 2 * paddingX);
                  const cy = svgHeight - paddingY - (p.value / maxMastery) * (svgHeight - 2 * paddingY);
                  return (
                    <g key={idx}>
                      <circle cx={cx} cy={cy} r="5" fill="#f59e0b" className="stroke-white dark:stroke-slate-900 stroke-2" />
                      <text
                        x={cx}
                        y={cy - 10}
                        textAnchor="middle"
                        className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300"
                      >
                        {p.value}%
                      </text>
                      <text
                        x={cx}
                        y={svgHeight - 6}
                        textAnchor="middle"
                        className="text-[9px] fill-slate-400 font-semibold"
                      >
                        {p.date}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            Steady upward trend reflects targeted reinforcement in foundational topics.
          </p>
        </div>

        {/* 2. Assessment Performance Over Time (Bar Chart) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    Assessment Scores
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    Recent quizzes, diagnostic tests & practicals
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {trends.assessmentScoresOverTime.map((asm, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-[200px] sm:max-w-xs">
                      {asm.title}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] text-slate-400">{asm.date}</span>
                      <strong className={`font-mono text-xs ${asm.passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {asm.scorePercentage}%
                      </strong>
                    </div>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${asm.passed ? 'bg-emerald-500' : 'bg-rose-500'}`}
                      style={{ width: `${asm.scorePercentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Pass Threshold: ≥50% (Exam) / ≥70% (Mastery)</span>
            <button
              onClick={() => setCurrentTab('assessments')}
              className="text-purple-600 dark:text-purple-400 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Exams Hub</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 3. Cumulative Lessons Completed */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    Lessons Completed
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    Cumulative curriculum progression
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center my-4">
              {trends.lessonsCompletedOverTime.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800"
                >
                  <span className="font-mono text-xl font-bold text-blue-600 dark:text-blue-400 block">
                    {step.value}
                  </span>
                  <span className="text-[10px] text-slate-500 block truncate mt-0.5">
                    {step.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
            Pacing matches CAPS recommendation for Term 1 core curriculum.
          </p>
        </div>

        {/* 4. Daily Study Activity (Weekly Minutes Bar Chart) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    Study Time (Minutes/Day)
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    7-day learning routine consistency
                  </span>
                </div>
              </div>
            </div>

            {/* Vertical Bar Chart */}
            <div className="flex items-end justify-between gap-2 h-28 pt-4 px-2 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-100 dark:border-slate-800">
              {trends.studyMinutesByDay.map((d, idx) => {
                const maxMinutes = 60;
                const heightPct = Math.min(100, Math.round((d.minutes / maxMinutes) * 100));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                    <span className="text-[9px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      {d.minutes}m
                    </span>
                    <div className="w-full max-w-[24px] bg-slate-200 dark:bg-slate-800 rounded-t-lg overflow-hidden h-20 flex items-end">
                      <div
                        className="w-full bg-emerald-500 rounded-t-lg transition-all duration-500"
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            Target goal: 30 minutes/day for optimal spaced repetition retention.
          </p>
        </div>
      </div>
    </div>
  );
};
