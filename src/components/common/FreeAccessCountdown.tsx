/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * FREE PROMOTION COUNTDOWN / BANNER COMPONENT
 * Rule 3: Free Access Till Wednesday 12 Nov 2026 23:59 SAST
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { FREE_ACCESS_LABEL, getFreeAccessRemaining, isFreeAccessActive } from '../../config/freeAccessConfig';

interface Props {
  variant?: 'banner' | 'card' | 'compact';
  onAction?: () => void;
  actionText?: string;
}

export const FreeAccessCountdown: React.FC<Props> = ({
  variant = 'banner',
  onAction,
  actionText = 'Start Free Learning'
}) => {
  const [remaining, setRemaining] = useState(getFreeAccessRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining(getFreeAccessRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isFreeAccessActive()) {
    return null;
  }

  if (variant === 'compact') {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fbbf24]/15 border border-[#fbbf24]/40 text-[#fbbf24] text-xs font-mono font-bold">
        <Sparkles className="w-3.5 h-3.5 text-[#fbbf24]" />
        <span>Free Access Ends: {FREE_ACCESS_LABEL}</span>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#18181b] to-black border-2 border-emerald-500/60 shadow-[0_0_25px_rgba(16,185,129,0.2)] text-white">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase mb-1">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Free Access Week &bull; No Payment Needed</span>
        </div>
        <h3 className="text-lg font-black text-white">
          Free Access Week &mdash; No Payment Needed Till Wed 12 Nov 23:59
        </h3>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
          You have full unlocked access to all Grade 4 to University subjects, 12 languages (including SASL 🤟), past papers, and AI Socratic tutor.
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#262626]">
          <div className="flex items-center gap-2 font-mono text-xs text-[#fbbf24]">
            <Clock className="w-4 h-4 text-[#fbbf24]" />
            <span>Free access ends: <strong className="text-white font-bold">{FREE_ACCESS_LABEL}</strong> ({remaining.formatted})</span>
          </div>

          {onAction && (
            <button
              onClick={onAction}
              className="px-4 py-2 rounded-xl bg-[#fbbf24] hover:bg-yellow-400 text-black font-black text-xs transition-transform active:scale-95 cursor-pointer shadow-md flex items-center gap-1.5"
            >
              <span>{actionText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Default: Top Banner
  return (
    <div className="w-full bg-gradient-to-r from-emerald-900/90 via-[#007A4D] to-emerald-900/90 text-white px-3 py-2 text-xs font-medium border-b border-emerald-400/30 shadow-md">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-base">🎉</span>
          <span className="font-bold tracking-tight">
            FREE WEEK: All Premium Features Free Till Wed 12 Nov! &mdash; No Code Needed
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-[11px] text-emerald-100">
          <span className="hidden sm:inline">
            Free access ends: <strong className="text-white">{FREE_ACCESS_LABEL}</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-black/30 border border-white/20 text-[#fbbf24] font-bold">
            {remaining.formatted}
          </span>
          {onAction && (
            <button
              onClick={onAction}
              className="px-2.5 py-1 rounded bg-[#fbbf24] hover:bg-yellow-400 text-black font-bold cursor-pointer transition-transform active:scale-95"
            >
              {actionText} &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
