/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIA ACADEMY - PHASE 8: CONTEXTUAL AI TUTOR QUICK ACTIONS (SECTION 22)
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
    <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Contextual AI Guidance
              </span>
              <span className="text-slate-400 text-xs">·</span>
              <span className="text-slate-400 text-xs">11 SA Languages Supported</span>
            </div>
            <h3 className="font-display text-lg font-bold text-white mt-0.5">
              Ask Nexovia Socratic Tutor
            </h3>
          </div>
        </div>

        <button
          onClick={() => setCurrentTab('tutor')}
          className="self-start md:self-auto flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/15 transition-colors"
        >
          <span>Open Full Tutor</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 5 Specific Contextual Prompts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={() => handleLaunchTutor(act.id)}
              className={`p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 ${act.color} text-left flex flex-col justify-between transition-all group active:scale-98`}
            >
              <div>
                <div className="w-7 h-7 rounded-lg bg-white/10 text-amber-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-bold text-xs text-white leading-snug group-hover:text-amber-300 transition-colors">
                  &ldquo;{act.label}&rdquo;
                </h4>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                  {act.subtext}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-700/40 flex items-center justify-between text-[10px] text-slate-400 font-semibold group-hover:text-amber-300">
                <span>Launch</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
