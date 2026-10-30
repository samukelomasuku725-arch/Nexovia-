/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN ACADEMY - PHASE 8: CONTEXTUAL AI TUTOR QUICK ACTIONS (SECTION 22)
 * 
 * Direct dashboard actions connecting to the Socratic AI Tutor:
 * 1. "Explain my weak areas"
 * 2. "Help me improve Mathematics"
 * 3. "Create a study plan"
 * 4. "Practice my weakest topic"
 * 5. "Explain my latest assessment mistakes"
 * 
 * Supplies full academic context: Grade, subject, topic, and mode.
 */

import React from 'react';
import {
  Sparkles,
  HelpCircle,
  TrendingUp,
  Calendar,
  Target,
  AlertCircle,
  ArrowRight,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { StudentDashboardSummary } from '../../types/dashboard';

interface ContextualAITutorBarProps {
  summary: StudentDashboardSummary;
}

export const ContextualAITutorBar: React.FC<ContextualAITutorBarProps> = ({ summary }) => {
  const { setCurrentTab, updateLearningContext } = useLearning();

  const weakestTopicName = summary.needsPractice[0]?.topic || 'Algebraic Fractions';

  const handleLaunchTutor = (actionType: 'weak_areas' | 'improve_math' | 'study_plan' | 'practice_weakest' | 'assessment_mistakes') => {
    switch (actionType) {
      case 'weak_areas':
        updateLearningContext({
          educationLevel: summary.educationLevel,
          gradeOrProgramme: summary.gradeOrProgramme,
          subject: 'Mathematics',
          topic: weakestTopicName,
          language: summary.preferredLanguage,
          mode: 'explain'
        });
        break;

      case 'improve_math':
        updateLearningContext({
          educationLevel: summary.educationLevel,
          gradeOrProgramme: summary.gradeOrProgramme,
          subject: 'Mathematics',
          topic: 'Algebra & Factorization',
          language: summary.preferredLanguage,
          mode: 'explain'
        });
        break;

      case 'study_plan':
        updateLearningContext({
          educationLevel: summary.educationLevel,
          gradeOrProgramme: summary.gradeOrProgramme,
          subject: 'Mathematics',
          topic: 'Term 1 Exam Preparation',
          language: summary.preferredLanguage,
          mode: 'study_plan'
        });
        break;

      case 'practice_weakest':
        updateLearningContext({
          educationLevel: summary.educationLevel,
          gradeOrProgramme: summary.gradeOrProgramme,
          subject: 'Mathematics',
          topic: weakestTopicName,
          language: summary.preferredLanguage,
          mode: 'practice'
        });
        break;

      case 'assessment_mistakes':
        updateLearningContext({
          educationLevel: summary.educationLevel,
          gradeOrProgramme: summary.gradeOrProgramme,
          subject: 'Mathematics',
          topic: 'Grade 10 Term 1 Quiz Review',
          language: summary.preferredLanguage,
          mode: 'quiz_help'
        });
        break;
    }

    setCurrentTab('tutor');
  };

  const actions = [
    {
      id: 'weak_areas' as const,
      label: 'Explain my weak areas',
      subtext: `Target: ${weakestTopicName}`,
      icon: AlertCircle,
      color: 'hover:border-rose-400 dark:hover:border-rose-500'
    },
    {
      id: 'improve_math' as const,
      label: 'Help me improve Mathematics',
      subtext: 'Core algebra & functions',
      icon: TrendingUp,
      color: 'hover:border-amber-400 dark:hover:border-amber-500'
    },
    {
      id: 'study_plan' as const,
      label: 'Create a study plan',
      subtext: 'Personalized weekly schedule',
      icon: Calendar,
      color: 'hover:border-blue-400 dark:hover:border-blue-500'
    },
    {
      id: 'practice_weakest' as const,
      label: 'Practice my weakest topic',
      subtext: 'Step-by-step Socratic drill',
      icon: Target,
      color: 'hover:border-emerald-400 dark:hover:border-emerald-500'
    },
    {
      id: 'assessment_mistakes' as const,
      label: 'Explain my latest assessment mistakes',
      subtext: 'Diagnostic test analysis',
      icon: HelpCircle,
      color: 'hover:border-purple-400 dark:hover:border-purple-500'
    }
  ];

  return (
    <section className="w-full max-w-full overflow-hidden px-4 py-5 sm:p-7 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white border border-slate-800 rounded-3xl shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800 w-full max-w-full">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-xs shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Contextual AI Guidance
              </span>
              <span className="text-slate-400 text-xs hidden sm:inline">·</span>
              <span className="text-slate-400 text-xs hidden sm:inline">11 SA Languages Supported</span>
            </div>
            <h3 className="font-display text-base sm:text-lg font-bold text-white mt-0.5 truncate">
              Ask Nexovian Socratic Tutor
            </h3>
          </div>
        </div>

        <button
          onClick={() => setCurrentTab('tutor')}
          className="self-start sm:self-auto shrink-0 flex items-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/15 transition-colors whitespace-nowrap"
        >
          <span>Open Full Tutor</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Socratic Tutor suggestion cards: vertical stack with gap-4, full width, overflow-hidden */}
      <div className="flex flex-col gap-4 w-full max-w-full overflow-hidden">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={() => handleLaunchTutor(act.id)}
              className={`w-full max-w-full p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 ${act.color} text-left flex items-center justify-between gap-3 transition-all group active:scale-[0.99] overflow-hidden`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-sm text-white leading-snug group-hover:text-amber-300 transition-colors break-words">
                    &ldquo;{act.label}&rdquo;
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">
                    {act.subtext}
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-700/50 group-hover:bg-amber-400/20 text-xs font-semibold text-slate-300 group-hover:text-amber-300 transition-colors">
                <span className="hidden xs:inline">Ask</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
