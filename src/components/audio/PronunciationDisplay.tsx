/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Nexovian Xitsonga Language Engine - Pronunciation Display (Phase 2)
 * 
 * CORE RULES:
 * 1. If a pronunciation field has been verified (pronunciationStatus === 'verified'):
 *    Display it underneath the Xitsonga phrase.
 *    Structure:
 *    English: [English phrase]
 *    XiTsonga: [Xitsonga phrase]
 *    Pronunciation: [verified pronunciation]
 *    🔊 Listen
 * 
 * 2. If pronunciation has NOT been verified:
 *    DO NOT display a guessed pronunciation.
 */

import React from 'react';
import { SpeakerButton } from './SpeakerButton';
import { LanguageRecord } from '../../types/language';
import { CheckCircle2, Mic } from 'lucide-react';

export interface PronunciationDisplayProps {
  phrase?: LanguageRecord;
  english?: string;
  xitsonga?: string;
  pronunciation?: string;
  pronunciationStatus?: 'unavailable' | 'pending_verification' | 'verified';
  audioUrl?: string;
  audioStatus?: 'unavailable' | 'pending_verification' | 'verified';
  voiceSource?: 'native_speaker' | 'ai_generated' | 'curriculum_specialist' | 'unspecified';
  onPracticeClick?: () => void;
  className?: string;
}

export const PronunciationDisplay: React.FC<PronunciationDisplayProps> = ({
  phrase,
  english = phrase?.english || '',
  xitsonga = phrase?.xitsonga || '',
  pronunciation = phrase?.pronunciation || '',
  pronunciationStatus = phrase?.pronunciationStatus || 'unavailable',
  audioUrl = phrase?.audioUrl,
  audioStatus = phrase?.audioStatus || 'unavailable',
  voiceSource = phrase?.voiceSource,
  onPracticeClick,
  className = ''
}) => {
  const isPronunciationVerified =
    pronunciationStatus === 'verified' && Boolean(pronunciation && pronunciation.trim());

  return (
    <div
      className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3 ${className}`}
    >
      {/* English Meaning */}
      <div>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
          English
        </span>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {english || '—'}
        </p>
      </div>

      {/* XiTsonga Phrase */}
      <div>
        <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-0.5">
          XiTsonga
        </span>
        <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
          {xitsonga || <span className="text-slate-400 italic">Translation not yet verified</span>}
        </p>
      </div>

      {/* Pronunciation: DISPLAY ONLY IF VERIFIED */}
      {isPronunciationVerified && (
        <div className="pt-1 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              Pronunciation
            </span>
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 className="w-2.5 h-2.5" />
              Verified
            </span>
          </div>
          <p className="text-sm font-mono text-emerald-800 dark:text-emerald-300 bg-emerald-50/60 dark:bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-200/60 dark:border-emerald-800/60 inline-block">
            {pronunciation}
          </p>
        </div>
      )}

      {/* Interactive Audio Controls: 🔊 Listen button */}
      <div className="pt-2 flex flex-wrap items-center gap-2">
        <SpeakerButton
          audioUrl={audioUrl}
          audioStatus={audioStatus}
          voiceSource={voiceSource}
          phraseText={xitsonga}
          size="md"
        />

        {onPracticeClick && (
          <button
            onClick={onPracticeClick}
            type="button"
            className="min-h-[44px] px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 active:scale-95"
          >
            <Mic className="w-3.5 h-3.5 text-amber-500" />
            <span>Practice</span>
          </button>
        )}
      </div>
    </div>
  );
};
