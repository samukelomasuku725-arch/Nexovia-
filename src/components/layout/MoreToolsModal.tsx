/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN ACADEMY - SECONDARY TOOLS & SETTINGS MODAL
 * 
 * Clean, organized secondary menu for less frequently used features,
 * keeping the primary 4 actions (Learn, Ask AI, Voice-to-Doc, My Progress)
 * completely uncluttered and beginner-friendly.
 */

import React from 'react';
import {
  X,
  Camera,
  Award,
  Compass,
  Layers,
  BookOpen,
  Bookmark,
  Volume2,
  User,
  Settings,
  Globe,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Database,
  Folder,
  AlertTriangle
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useTranslation } from '../../i18n/I18nContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenPhrasebook?: () => void;
  onOpenVoiceSettings?: () => void;
  onOpenProfile?: () => void;
}

export const MoreToolsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onOpenPhrasebook,
  onOpenVoiceSettings,
  onOpenProfile
}) => {
  const { setCurrentTab } = useLearning();
  const { t, language } = useTranslation();

  if (!isOpen) return null;

  const navigateTo = (tab: any) => {
    setCurrentTab(tab);
    onClose();
  };

  const toolCategories = [
    {
      title: 'Practice & Evaluation Tools',
      items: [
        {
          id: 'scan',
          title: 'Scan & Learn',
          subtitle: 'Camera problem solver & textbook helper',
          icon: Camera,
          color: 'bg-blue-500 text-white',
          onClick: () => navigateTo('scan')
        },
        {
          id: 'assessments',
          title: 'Formal Assessments & Exams',
          subtitle: 'Timed test simulation & curriculum tests',
          icon: Award,
          color: 'bg-amber-500 text-slate-950',
          onClick: () => navigateTo('assessments')
        },
        {
          id: 'practice',
          title: 'Daily Practice Flashcards',
          subtitle: 'Quick-fire heuristics & spaced repetition',
          icon: Sparkles,
          color: 'bg-emerald-500 text-white',
          onClick: () => navigateTo('practice')
        },
        {
          id: 'adaptive',
          title: 'Adaptive Learning Diagnostics',
          subtitle: 'Real-time difficulty & weakness targeting',
          icon: Compass,
          color: 'bg-purple-500 text-white',
          onClick: () => navigateTo('adaptive')
        },
        {
          id: 'myStruggles',
          title: 'Learner Struggles AI',
          subtitle: 'Hotspot diagnosis, repeated mistakes & recovery',
          icon: AlertTriangle,
          color: 'bg-amber-500 text-slate-950',
          onClick: () => navigateTo('myStruggles')
        }
      ]
    },
    {
      title: 'Curriculum & Resources',
      items: [
        {
          id: 'smartNotes',
          title: 'Smart Notes v2 (Subject Folders)',
          subtitle: 'Drive-style subject folders & auto-summaries',
          icon: Folder,
          color: 'bg-blue-600 text-white',
          onClick: () => navigateTo('smartNotes')
        },
        {
          id: 'tracks',
          title: 'Featured STEM & Coding Tracks',
          subtitle: 'Foundational modules and structured lessons',
          icon: Layers,
          color: 'bg-indigo-500 text-white',
          onClick: () => navigateTo('tracks')
        },
        {
          id: 'saved',
          title: 'Saved Notes & Bookmarks',
          subtitle: 'Your personal library of bookmarked content',
          icon: Bookmark,
          color: 'bg-rose-500 text-white',
          onClick: () => navigateTo('saved')
        },
        {
          id: 'phrasebook',
          title: 'Xitsonga & SA Languages Lab',
          subtitle: 'Vernacular math terms & pronunciation practice',
          icon: BookOpen,
          color: 'bg-teal-500 text-white',
          onClick: () => {
            onClose();
            if (onOpenPhrasebook) onOpenPhrasebook();
          }
        }
      ]
    },
    {
      title: 'Account & Settings',
      items: [
        {
          id: 'mySubscription',
          title: 'My Subscription',
          subtitle: 'Manage your 2-day free trial, R60 billing & cancellation',
          icon: ShieldCheck,
          color: 'bg-[#FFD400] text-black',
          onClick: () => navigateTo('mySubscription')
        },
        {
          id: 'profile',
          title: 'Learner Profile & Goals',
          subtitle: 'Grade, target subjects & study milestones',
          icon: User,
          color: 'bg-slate-700 text-white',
          onClick: () => {
            onClose();
            if (onOpenProfile) onOpenProfile();
            else navigateTo('profile');
          }
        },
        {
          id: 'voice_settings',
          title: 'Voice Narration & Speed Settings',
          subtitle: 'Custom voice provider, speed & pitch',
          icon: Volume2,
          color: 'bg-amber-600 text-white',
          onClick: () => {
            onClose();
            if (onOpenVoiceSettings) onOpenVoiceSettings();
          }
        },
        {
          id: 'about',
          title: 'About Us (/about)',
          subtitle: 'NEXOVIAN story, Oakley roots & compliance',
          icon: ShieldCheck,
          color: 'bg-emerald-600 text-white',
          onClick: () => {
            navigateTo('about');
            if (typeof window !== 'undefined') {
              window.history.pushState({}, '', '/about');
            }
          }
        }
      ]
    }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="more-tools-title"
    >
      <div
        className="bg-white dark:bg-slate-900 w-full sm:max-w-xl max-h-[85vh] sm:max-h-[90vh] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h2 id="more-tools-title" className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Secondary Tools & Options
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Explore extra learning tools, practice labs, and settings
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close tools menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {toolCategories.map((cat, idx) => (
            <div key={idx}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
                {cat.title}
              </h3>
              <div className="space-y-2">
                {cat.items.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.id}
                      onClick={tool.onClick}
                      className="w-full flex items-center justify-between p-3 rounded-2xl border border-slate-200/70 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 bg-slate-50/50 dark:bg-slate-950/50 hover:bg-white dark:hover:bg-slate-900 transition-all text-left group min-h-[52px]"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-9 h-9 rounded-xl ${tool.color} flex items-center justify-center shrink-0 shadow-2xs`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                            {tool.title}
                          </span>
                          <span className="block text-[11px] text-slate-500 dark:text-slate-400 truncate">
                            {tool.subtitle}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Nexovian Academy · South Africa</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-bold rounded-xl text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
