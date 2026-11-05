/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * HOME SOCRATIC HERO COMPONENT (AUTHENTIC DARK THEME #0F0F0F + #FACC15)
 * 
 * Requirement 2:
 * "Home: Ask Nexovia Socratic Tutor with 4 cards: Explain my weak areas,
 * Help me improve Mathematics, Create a study plan, Practice my weakest topic + big N logo"
 */

import React from 'react';
import {
  AlertCircle,
  TrendingUp,
  Calendar,
  Target,
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { LogoIcon } from '../common/LogoIcon';
import { useLearning } from '../../context/LearningContext';

interface HomeSocraticHeroProps {
  onOpenStudyPlan?: () => void;
  onOpenPracticeQuiz?: () => void;
}

export const HomeSocraticHero: React.FC<HomeSocraticHeroProps> = ({
  onOpenStudyPlan,
  onOpenPracticeQuiz
}) => {
  const { setCurrentTab, updateLearningContext, learningContext } = useLearning();

  const handleAction = (actionId: 'weak_areas' | 'improve_math' | 'study_plan' | 'practice_weakest') => {
    switch (actionId) {
      case 'weak_areas':
        updateLearningContext({
          subject: 'Mathematics',
          topic: 'Algebraic Fractions & Weak Areas',
          mode: 'explain'
        });
        setCurrentTab('tutor');
        break;

      case 'improve_math':
        updateLearningContext({
          subject: 'Mathematics',
          topic: 'Algebra & Factorization',
          mode: 'explain'
        });
        setCurrentTab('tutor');
        break;

      case 'study_plan':
        if (onOpenStudyPlan) {
          onOpenStudyPlan();
        } else {
          updateLearningContext({
            subject: 'Mathematics',
            topic: 'Term 1 Exam Preparation',
            mode: 'study_plan'
          });
          setCurrentTab('tutor');
        }
        break;

      case 'practice_weakest':
        if (onOpenPracticeQuiz) {
          onOpenPracticeQuiz();
        } else {
          updateLearningContext({
            subject: 'Mathematics',
            topic: 'Quadratic Equations Practice Drill',
            mode: 'practice'
          });
          setCurrentTab('tutor');
        }
        break;
    }
  };

  const cards = [
    {
      id: 'weak_areas' as const,
      label: 'Explain my weak areas',
      subtext: 'Step-by-step diagnostic breakdown of tricky concepts',
      icon: AlertCircle,
      tag: 'Diagnostic'
    },
    {
      id: 'improve_math' as const,
      label: 'Help me improve Mathematics',
      subtext: 'Core algebra, equations, trigonometry & functions',
      icon: TrendingUp,
      tag: 'Priority'
    },
    {
      id: 'study_plan' as const,
      label: 'Create a study plan',
      subtext: 'Custom weekly schedule tailored to your exam dates',
      icon: Calendar,
      tag: 'Planning'
    },
    {
      id: 'practice_weakest' as const,
      label: 'Practice my weakest topic',
      subtext: 'Interactive Socratic drill with instant guidance',
      icon: Target,
      tag: 'Practice'
    }
  ];

  return (
    <section className="w-full bg-[#121214] border border-[#262626] rounded-3xl p-5 sm:p-8 shadow-2xl my-6">
      {/* Top Header with Big N Logo */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 pb-6 border-b border-[#262626]">
        {/* Big N Logo (Yellow & Dark, glowing) */}
        <div className="shrink-0 p-2 rounded-2xl bg-[#0F0F0F] border border-[#FACC15]/40 shadow-[0_0_25px_rgba(250,204,21,0.35)]">
          <LogoIcon size={84} />
        </div>

        <div className="text-center sm:text-left flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FACC15]/20 text-[#FACC15] border border-[#FACC15]/40">
              Socratic Learning Brain
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">•</span>
            <span className="text-xs text-slate-400 font-mono">11 Official Languages</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
            Ask Nexovia Socratic Tutor
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-2xl leading-relaxed">
            Personalized CAPS Grades 4–12, TVET, and University tutoring. Ask in Xitsonga, isiZulu, Sepedi, or English — step-by-step guidance without dead ends.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <button
              onClick={() => setCurrentTab('tutor')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FACC15] hover:bg-yellow-400 text-black font-black text-xs transition-all shadow-[0_0_15px_-3px_rgba(250,204,21,0.5)] cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Launch Full Socratic Tutor</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => handleAction(card.id)}
              className="group text-left p-5 rounded-2xl bg-[#18181B] hover:bg-[#1E1E22] border border-[#2E2E32] hover:border-[#FACC15] transition-all shadow-md flex items-start justify-between gap-4 cursor-pointer active:scale-[0.99]"
            >
              <div className="flex items-start gap-3.5 min-w-0 flex-1">
                <div className="w-11 h-11 rounded-xl bg-[#26262B] group-hover:bg-[#FACC15] text-[#FACC15] group-hover:text-black flex items-center justify-center shrink-0 transition-colors shadow-xs">
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FACC15]">
                      {card.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-[#FACC15] transition-colors leading-snug">
                    {card.label}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {card.subtext}
                  </p>
                </div>
              </div>

              <div className="shrink-0 p-2 rounded-xl bg-[#26262B] group-hover:bg-[#FACC15] text-slate-400 group-hover:text-black transition-colors self-center">
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default HomeSocraticHero;
