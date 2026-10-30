/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN ACADEMY - PHASE 8: DEDICATED "MY MASTERY" EXPERIENCE
 * 
 * Comprehensive diagnostic mastery tree:
 * 1. By Subject (Mathematics, Physical Sciences, Life Sciences, Technical Mathematics)
 * 2. By Topic (Algebra, Equations, Mechanics, etc.)
 * 3. By Subtopic (granular skill level)
 * 
 * Official Nexovian 5-Tier Diagnostic Heuristic Scale:
 * - 0–39: Needs significant support
 * - 40–59: Developing
 * - 60–74: Basic understanding
 * - 75–89: Strong
 * - 90–100: Mastered
 * 
 * Educational Disclaimer: Nexovian mastery scores are diagnostic heuristics,
 * not official Department of Basic Education (DBE) report card marks.
 */

import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  Target,
  ArrowRight,
  ChevronRight,
  Filter,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Calculator,
  Atom,
  Leaf,
  Cpu,
  BookOpen
} from 'lucide-react';
import { SubjectMasteryTree, TopicMasteryDetail } from '../../types/dashboard';
import { MasteryStatus } from '../../types/adaptive';
import { useLearning } from '../../context/LearningContext';

interface MyMasteryViewProps {
  masteryTrees: SubjectMasteryTree[];
  onOpenTopicDetail: (topicName: string) => void;
  onPracticeTopic: (topicName: string) => void;
}

export const MyMasteryView: React.FC<MyMasteryViewProps> = ({
  masteryTrees,
  onOpenTopicDetail,
  onPracticeTopic
}) => {
  const { setCurrentTab, updateLearningContext } = useLearning();

  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [selectedStatusTier, setSelectedStatusTier] = useState<string>('all');
  const [expandedTopicIds, setExpandedTopicIds] = useState<Record<string, boolean>>({
    'math-top-1': true,
    'phys-top-1': true
  });

  const toggleExpandTopic = (topicId: string) => {
    setExpandedTopicIds((prev) => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const filteredTrees = masteryTrees
    .filter((tree) => selectedSubjectFilter === 'all' || tree.subjectId === selectedSubjectFilter)
    .map((tree) => {
      const filteredTopics = tree.topics.filter((topic) => {
        if (selectedStatusTier === 'all') return true;
        if (selectedStatusTier === 'mastered') return topic.masteryPercentage >= 90;
        if (selectedStatusTier === 'strong') return topic.masteryPercentage >= 75 && topic.masteryPercentage < 90;
        if (selectedStatusTier === 'basic') return topic.masteryPercentage >= 60 && topic.masteryPercentage < 75;
        if (selectedStatusTier === 'developing') return topic.masteryPercentage >= 40 && topic.masteryPercentage < 60;
        if (selectedStatusTier === 'needs_support') return topic.masteryPercentage < 40;
        return true;
      });
      return {
        ...tree,
        topics: filteredTopics
      };
    })
    .filter((tree) => tree.topics.length > 0);

  const getTierBadge = (percentage: number) => {
    if (percentage >= 90) {
      return {
        label: 'Mastered',
        subtext: '90–100%',
        color: 'text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800'
      };
    }
    if (percentage >= 75) {
      return {
        label: 'Strong',
        subtext: '75–89%',
        color: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
      };
    }
    if (percentage >= 60) {
      return {
        label: 'Basic understanding',
        subtext: '60–74%',
        color: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800'
      };
    }
    if (percentage >= 40) {
      return {
        label: 'Developing',
        subtext: '40–59%',
        color: 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800'
      };
    }
    return {
      label: 'Needs significant support',
      subtext: '0–39%',
      color: 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800'
    };
  };

  const getSubjectIcon = (id: string) => {
    switch (id) {
      case 'math':
        return <Calculator className="w-5 h-5 text-amber-500" />;
      case 'phys':
        return <Atom className="w-5 h-5 text-blue-500" />;
      case 'life':
        return <Leaf className="w-5 h-5 text-emerald-500" />;
      default:
        return <Cpu className="w-5 h-5 text-purple-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in w-full max-w-full overflow-hidden">
      {/* 1. Header & Diagnostic Scale Guide */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950">
                Diagnostic Mastery Experience
              </span>
              <span className="text-xs text-slate-500">
                Continuous Heuristic Analytics
              </span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              My Curriculum Mastery Spectrum
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Calculated across your practice questions, Socratic tutor dialogues, and exam attempts to guide adaptive learning pacing.
            </p>
          </div>

          <button
            onClick={() => setCurrentTab('practice')}
            className="self-start md:self-auto flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-transform active:scale-95 whitespace-nowrap"
          >
            <Target className="w-4 h-4" />
            <span>Practice Weak Areas</span>
          </button>
        </div>

        {/* 5-Tier Scale Display */}
        <div className="mt-5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
            Nexovian Diagnostic Mastery Scale
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
            <div className="p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20">
              <span className="font-bold text-rose-700 dark:text-rose-300 block">0–39%</span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400">Needs significant support</span>
            </div>
            <div className="p-2.5 rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20">
              <span className="font-bold text-blue-700 dark:text-blue-300 block">40–59%</span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400">Developing</span>
            </div>
            <div className="p-2.5 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20">
              <span className="font-bold text-amber-700 dark:text-amber-300 block">60–74%</span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400">Basic understanding</span>
            </div>
            <div className="p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20">
              <span className="font-bold text-emerald-700 dark:text-emerald-300 block">75–89%</span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400">Strong</span>
            </div>
            <div className="p-2.5 rounded-xl border border-purple-200 dark:border-purple-900/50 bg-purple-50/50 dark:bg-purple-950/20">
              <span className="font-bold text-purple-700 dark:text-purple-300 block">90–100%</span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400">Mastered</span>
            </div>
          </div>
        </div>

        {/* Official Transparency Disclaimer */}
        <div className="mt-4 p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Heuristic Transparency:</strong> Nexovian mastery percentages reflect continuous question response accuracy and time-weighted practice retention. They do not constitute official academic marks issued by schools or the South African Department of Basic Education.
          </p>
        </div>
      </div>

      {/* 2. Interactive Subject & Status Filters */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Subject Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedSubjectFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedSubjectFilter === 'all'
                ? 'bg-amber-400 text-slate-950 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            All Subjects
          </button>
          {masteryTrees.map((st) => (
            <button
              key={st.subjectId}
              onClick={() => setSelectedSubjectFilter(st.subjectId)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedSubjectFilter === st.subjectId
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {st.subjectTitle}
            </button>
          ))}
        </div>

        {/* Tier Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-[11px] font-semibold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Tier:
          </span>
          {[
            { id: 'all', label: 'All' },
            { id: 'needs_support', label: 'Needs Support' },
            { id: 'developing', label: 'Developing' },
            { id: 'basic', label: 'Basic' },
            { id: 'strong', label: 'Strong' },
            { id: 'mastered', label: 'Mastered' }
          ].map((tier) => (
            <button
              key={tier.id}
              onClick={() => setSelectedStatusTier(tier.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                selectedStatusTier === tier.id
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tier.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Mastery Hierarchy Listing */}
      <div className="space-y-6">
        {filteredTrees.map((subjectTree) => (
          <div
            key={subjectTree.subjectId}
            className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4"
          >
            {/* Subject Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  {getSubjectIcon(subjectTree.subjectId)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                      {subjectTree.subjectTitle}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {subjectTree.code}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span>{subjectTree.topics.length} Evaluated Topics</span>
                    <span>·</span>
                    <span>CAPS Grade 10 Framework</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Subject Mastery
                  </span>
                  <span className="font-mono text-lg font-bold text-amber-600 dark:text-amber-400">
                    {subjectTree.overallMasteryPercentage}%
                  </span>
                </div>
                <div className="w-16 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${subjectTree.overallMasteryPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Topics Under Subject */}
            <div className="space-y-3">
              {subjectTree.topics.map((topic) => {
                const isExpanded = !!expandedTopicIds[topic.id];
                const tier = getTierBadge(topic.masteryPercentage);

                return (
                  <div
                    key={topic.id}
                    className="border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-950/40"
                  >
                    {/* Topic Row */}
                    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                            {topic.title}
                          </h4>
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg border ${tier.color}`}>
                            {tier.label} ({topic.masteryPercentage}%)
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span>Attempts: {topic.attemptsCount}</span>
                          <span>·</span>
                          <span>Last practiced: {topic.lastPracticed}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                            <TrendingUp className="w-3.5 h-3.5" />
                            {topic.trend}
                          </span>
                        </div>
                      </div>

                      {/* Topic Action Controls */}
                      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        <button
                          onClick={() => onOpenTopicDetail(topic.title)}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors"
                        >
                          View Details
                        </button>

                        <button
                          onClick={() => onPracticeTopic(topic.title)}
                          className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-transform active:scale-95"
                        >
                          Practice Now
                        </button>

                        <button
                          onClick={() => toggleExpandTopic(topic.id)}
                          className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title={isExpanded ? 'Collapse subtopics' : 'Expand subtopics'}
                        >
                          <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Subtopics Granular Breakdown (Accordion) */}
                    {isExpanded && (
                      <div className="p-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                          Subtopic Mastery Breakdown
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {topic.subtopics.map((st) => {
                            const stTier = getTierBadge(st.masteryPercentage);
                            return (
                              <div
                                key={st.id}
                                className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
                              >
                                <div className="min-w-0">
                                  <span className="font-semibold text-slate-900 dark:text-white block truncate">
                                    {st.name}
                                  </span>
                                  <span className="text-[10px] text-slate-500">
                                    {stTier.label}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                  <div className="w-12 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                    <div
                                      className={`h-full rounded-full ${
                                        st.masteryPercentage >= 75
                                          ? 'bg-emerald-500'
                                          : st.masteryPercentage >= 50
                                          ? 'bg-amber-500'
                                          : 'bg-rose-500'
                                      }`}
                                      style={{ width: `${st.masteryPercentage}%` }}
                                    />
                                  </div>
                                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                                    {st.masteryPercentage}%
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
