/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN LEARNER STRUGGLES AI DASHBOARD
 * Automated 2+ failure detection, AI diagnostic advice, and resource recommendations.
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ArrowRight,
  TrendingDown,
  RotateCcw,
  Check,
  Zap,
  Target,
  Search,
  Filter,
  Flame,
  ShieldCheck,
  Compass,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import {
  learnerStrugglesService,
  LearnerStruggle
} from '../../services/struggles/learnerStrugglesService';
import { CleanFormulaRenderer } from '../common/CleanFormulaRenderer';
import { cleanFormulaString } from '../../utils/formulaCleaner';

export const LearnerStrugglesView: React.FC = () => {
  const { user, supabaseUser } = useAuth();
  const { setCurrentTab, sendMessageToTutor } = useLearning();

  const userId = supabaseUser?.id || user?.id;

  const [struggles, setStruggles] = useState<LearnerStruggle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterMode, setFilterMode] = useState<'all' | 'needs_attention' | 'resolved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Simulation test state
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    learnerStrugglesService
      .fetchStruggles(userId)
      .then((data) => {
        if (isMounted) {
          setStruggles(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load struggles:', err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [userId]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const activeStrugglesCount = useMemo(() => {
    return struggles.filter((s) => !s.is_resolved).length;
  }, [struggles]);

  const needsAttentionCount = useMemo(() => {
    return struggles.filter((s) => !s.is_resolved && s.struggle_count >= 3).length;
  }, [struggles]);

  const resolvedCount = useMemo(() => {
    return struggles.filter((s) => s.is_resolved).length;
  }, [struggles]);

  // Filtered struggles
  const filteredStruggles = useMemo(() => {
    return struggles.filter((s) => {
      if (filterMode === 'needs_attention') {
        if (s.is_resolved || s.struggle_count < 3) return false;
      } else if (filterMode === 'resolved') {
        if (!s.is_resolved) return false;
      } else {
        // 'all' shows active unresolved first, then resolved
      }

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        s.topic.toLowerCase().includes(q) ||
        s.subject.toLowerCase().includes(q) ||
        s.ai_suggestion.toLowerCase().includes(q)
      );
    });
  }, [struggles, filterMode, searchQuery]);

  // Mark as Resolved
  const handleMarkResolved = async (struggleId: string) => {
    await learnerStrugglesService.resolveStruggle(struggleId, userId);
    setStruggles((prev) =>
      prev.map((s) => (s.id === struggleId ? { ...s, is_resolved: true } : s))
    );
    showToast('🎉 Topic marked as resolved! Great progress.');
  };

  // Launch AI Tutor on this struggle topic
  const handlePracticeWithTutor = async (struggle: LearnerStruggle) => {
    setCurrentTab('tutor');
    const prompt = `I am struggling with "${struggle.topic}" in ${struggle.subject}. I have failed questions on this topic ${struggle.struggle_count} times. Please teach me the core concept step-by-step with simple formulas and a worked example, so I never get it wrong again.`;
    sendMessageToTutor(prompt);
  };

  // Simulate a test failure for user to see the detection live
  const handleSimulateTopicFailure = async () => {
    setIsSimulating(true);
    const sampleTopics = [
      { subject: 'Physical Sciences', topic: 'Vertical Projectile Motion (Sign Conventions)' },
      { subject: 'Mathematics', topic: 'Trigonometric Reduction & Negative Angles' },
      { subject: 'Accounting', topic: 'Bank Reconciliation & Outstanding Deposits' }
    ];
    const picked = sampleTopics[Math.floor(Math.random() * sampleTopics.length)];

    try {
      // Trigger failure twice to breach 2+ threshold
      await learnerStrugglesService.recordTopicFailure({
        userId,
        subject: picked.subject,
        topic: picked.topic,
        grade: 'Grade 11'
      });
      const result = await learnerStrugglesService.recordTopicFailure({
        userId,
        subject: picked.subject,
        topic: picked.topic,
        grade: 'Grade 11'
      });

      if (result.struggle) {
        setStruggles((prev) => [result.struggle!, ...prev.filter((s) => s.id !== result.struggle!.id)]);
        showToast(`⚠️ Struggle detected for "${picked.topic}" (Failed 2x). AI diagnostic generated!`);
      }
    } catch (err) {
      console.error('Simulation error:', err);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 p-4 rounded-2xl bg-[#0F172A] border border-[#facc15] text-[#facc15] text-xs sm:text-sm font-semibold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <Sparkles className="w-4 h-4 text-[#facc15]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Header */}
      <div className="bg-gradient-to-b from-[#0F172A] via-[#111827] to-[#0F172A] text-white border-b border-slate-800 py-8 sm:py-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Learner Struggles AI · Diagnostic Engine</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              My Struggle Hotspots &amp; AI Recovery
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 mt-1 max-w-2xl">
              NEXOVIAN automatically detects when you fail the same topic 2+ times in quizzes. Get personalized AI diagnostic advice and exact resources to pass with confidence.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSimulateTopicFailure}
              disabled={isSimulating}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-xs sm:text-sm font-semibold transition-all disabled:opacity-50"
              title="Simulate 2 consecutive quiz mistakes to test struggle AI trigger"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>{isSimulating ? 'Analyzing Failure...' : 'Simulate Quiz Mistake (2x)'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* STATS OVERVIEW CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Active Topic Struggles
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                {activeStrugglesCount}
              </div>
              <span className="text-[11px] text-slate-400">Failed 2+ times in evaluations</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center">
              <TrendingDown className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-xs flex items-center justify-between ring-2 ring-rose-500/20">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Needs Attention (3+ Fails)
              </span>
              <div className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400 mt-1">
                {needsAttentionCount}
              </div>
              <span className="text-[11px] text-slate-400">Requires focused tutor intervention</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center animate-pulse">
              <Flame className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Resolved Topics
              </span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                {resolvedCount}
              </div>
              <span className="text-[11px] text-slate-400">Mastered after recovery drill</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* CONTROLS & FILTER BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: `All Hotspots (${struggles.length})` },
              { id: 'needs_attention', label: `⚠️ Needs Attention (${needsAttentionCount})` },
              { id: 'resolved', label: `Resolved (${resolvedCount})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterMode(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  filterMode === tab.id
                    ? 'bg-[#facc15] text-[#0F172A] shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by subject or topic..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            />
          </div>
        </div>

        {/* STRUGGLES LIST */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="p-12 text-center text-slate-500">
              <Sparkles className="w-8 h-8 text-rose-500 animate-spin mx-auto mb-2" />
              <p className="text-sm font-medium">Scanning learning hotspots...</p>
            </div>
          ) : filteredStruggles.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto">
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  {filterMode === 'needs_attention'
                    ? 'No topics urgently need attention!'
                    : 'No learning struggles found'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  You are performing consistently. When you encounter difficulty with the same topic 2+ times in practice, NEXOVIAN AI will diagnose it here automatically.
                </p>
              </div>
              <button
                onClick={handleSimulateTopicFailure}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs"
              >
                Test Detection Trigger (Simulate 2x Mistakes)
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5">
              {filteredStruggles.map((struggle) => {
                const isNeedsAttention = struggle.struggle_count >= 3 && !struggle.is_resolved;

                return (
                  <div
                    key={struggle.id}
                    className={`bg-white dark:bg-slate-900 border rounded-3xl p-5 sm:p-7 shadow-xs transition-all ${
                      struggle.is_resolved
                        ? 'border-emerald-200/70 dark:border-emerald-900/40 opacity-75'
                        : isNeedsAttention
                        ? 'border-rose-400 dark:border-rose-700/80 shadow-md ring-1 ring-rose-500/20'
                        : 'border-slate-200/80 dark:border-slate-800 hover:border-amber-400'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                      <div className="space-y-4 flex-1">
                        {/* Header Badges */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                            {struggle.subject}
                          </span>

                          {/* Struggle Count Badge */}
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                            Failed {struggle.struggle_count}x in evaluations
                          </span>

                          {/* Requirement 3: Badge if struggle_count >= 3 = "Needs Attention" */}
                          {isNeedsAttention && (
                            <span className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-600 text-white shadow-xs animate-pulse flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              <span>Needs Attention</span>
                            </span>
                          )}

                          {struggle.is_resolved && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              <span>Resolved</span>
                            </span>
                          )}

                          <span className="text-[11px] font-mono text-slate-400 ml-auto">
                            Updated {new Date(struggle.updated_at).toLocaleDateString('en-ZA')}
                          </span>
                        </div>

                        {/* Topic Title */}
                        <div>
                          <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight">
                            {cleanFormulaString(struggle.topic)}
                          </h3>
                        </div>

                        {/* AI Suggestion Box */}
                        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40">
                          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-2">
                            <Sparkles className="w-4 h-4 text-amber-500" />
                            <span>AI Diagnostic Advice</span>
                          </div>
                          <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                            <CleanFormulaRenderer content={struggle.ai_suggestion} />
                          </div>
                        </div>

                        {/* Suggested Resource */}
                        {struggle.suggested_resource && (
                          <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40 flex items-start gap-3">
                            <BookOpen className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                            <div className="min-w-0">
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 block mb-0.5">
                                Recommended CAPS Resource / Drill:
                              </span>
                              <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold truncate">
                                {struggle.suggested_resource}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 pt-2 lg:pt-0">
                        <button
                          onClick={() => handlePracticeWithTutor(struggle)}
                          className="px-4 py-2.5 rounded-xl bg-[#facc15] hover:bg-yellow-400 text-[#0F172A] font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                          <Sparkles className="w-4 h-4 stroke-[2.5]" />
                          <span>Practice with AI Tutor</span>
                        </button>

                        {!struggle.is_resolved ? (
                          <button
                            onClick={() => handleMarkResolved(struggle.id)}
                            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95 flex items-center justify-center gap-2"
                          >
                            <Check className="w-4 h-4 stroke-[2.5]" />
                            <span>Mark as Resolved</span>
                          </button>
                        ) : (
                          <div className="px-4 py-2 text-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Resolved</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
