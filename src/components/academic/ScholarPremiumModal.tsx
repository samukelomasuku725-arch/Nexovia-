/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * NEXOVIAN Academic Voice - Scholar Premium Configuration Modal
 */

import React from 'react';
import {
  X,
  Crown,
  Check,
  Sparkles,
  Zap,
  ShieldCheck,
  Clock,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { AcademicVoiceTierStatus } from '../../types/academicVoice';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  tierStatus: AcademicVoiceTierStatus;
  onUpdateTier: (tier: 'free' | 'premium') => void;
}

export const ScholarPremiumModal: React.FC<Props> = ({
  isOpen,
  onClose,
  tierStatus,
  onUpdateTier
}) => {
  if (!isOpen) return null;

  const isCurrentPremium = tierStatus.tier === 'premium';

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                  NEXOVIAN Scholar Premium
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 uppercase">
                  R60 / Month
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Enhanced academic speech-to-document capacity for university & TVET students.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Free Tier Card */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              !isCurrentPremium
                ? 'border-slate-400 dark:border-slate-600 bg-slate-50/70 dark:bg-slate-800/40'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 opacity-70'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-display font-bold text-sm text-slate-900 dark:text-white">
                Free Student Tier
              </span>
              <span className="text-xs font-semibold text-slate-500">R0</span>
            </div>

            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>3 voice-to-document conversions / month</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Max 5-minute audio recordings</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Harvard & APA in-text citations</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Standard A4 PDF download</span>
              </li>
            </ul>

            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
              {!isCurrentPremium ? (
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block text-center">
                  Current Active Plan
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    onUpdateTier('free');
                    onClose();
                  }}
                  className="w-full py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                >
                  Downgrade to Free
                </button>
              )}
            </div>
          </div>

          {/* Premium Tier Card */}
          <div
            className={`p-4 rounded-2xl border relative overflow-hidden transition-all ${
              isCurrentPremium
                ? 'border-amber-500 bg-amber-500/10 shadow-md'
                : 'border-amber-400/80 bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-white dark:to-slate-900'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-500" />
                <span>Scholar Premium</span>
              </span>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">R60 / mo</span>
            </div>

            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-200 font-medium">
              <li className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span><strong>Unlimited</strong> voice document conversions</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Up to <strong>30-minute</strong> audio lecture recordings</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Grounded Scholar literature verification</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>TVET PoE logbook & assessor package</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Priority AI model processing</span>
              </li>
            </ul>

            <div className="mt-4 pt-3 border-t border-amber-200 dark:border-amber-900/50">
              {isCurrentPremium ? (
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block text-center">
                  ✓ Active Premium Scholar
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    onUpdateTier('premium');
                    onClose();
                  }}
                  className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-sm transition-all active:scale-95"
                >
                  Activate Scholar Premium (R60/mo)
                </button>
              )}
            </div>
          </div>
        </div>

        {/* POPIA / Privacy & Transparent Pricing Guarantee */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Honest Student Subscription Guarantee:</span>
          </div>
          <p>
            No hidden fees, no lock-in contracts. You can switch between Free and Scholar Premium at any time.
            All audio recordings, transcripts, and academic documents remain strictly private and protected under South African POPIA regulations.
          </p>
        </div>
      </div>
    </div>
  );
};
