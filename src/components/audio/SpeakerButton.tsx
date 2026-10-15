/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Nexovia Xitsonga Language Engine - Phase 2 Speaker Button
 * 
 * Reusable 🔊 Listen button adhering strictly to Phase 2 rules:
 * - IF verified audio exists: plays audio with animated waves indicator.
 * - IF verified audio does not exist: shows clear message:
 *   "Audio pronunciation is not available yet."
 * - Does NOT automatically generate or hallucinate audio.
 * - Mobile-first: 44px touch-accessible target.
 */

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Pause, Play, AlertCircle, X, Check } from 'lucide-react';
import { AudioStatus, VoiceSource } from '../../types/language';

export interface SpeakerButtonProps {
  audioUrl?: string | null;
  audioStatus?: AudioStatus;
  voiceSource?: VoiceSource;
  phraseText?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
  onPlayStart?: () => void;
  onPlayEnd?: () => void;
}

export const SpeakerButton: React.FC<SpeakerButtonProps> = ({
  audioUrl,
  audioStatus = 'unavailable',
  voiceSource,
  phraseText,
  size = 'md',
  showLabel = true,
  className = '',
  onPlayStart,
  onPlayEnd
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showUnavailableToast, setShowUnavailableToast] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isVerifiedAudio = audioStatus === 'verified' && Boolean(audioUrl);

  // Clean up audio on unmount or URL change
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, [audioUrl]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // RULE 1: If verified audio exists -> play audio
    if (isVerifiedAudio && audioUrl) {
      if (!audioRef.current) {
        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.addEventListener('ended', () => {
          setIsPlaying(false);
          if (onPlayEnd) onPlayEnd();
        });

        audio.addEventListener('error', () => {
          setIsPlaying(false);
          triggerUnavailableNotice('Failed to stream verified audio recording.');
        });
      }

      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        if (onPlayStart) onPlayStart();
        audioRef.current.currentTime = 0;
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            setIsPlaying(false);
            triggerUnavailableNotice('Could not play audio on this device.');
          });
      }
      return;
    }

    // RULE 2: If verified audio does NOT exist -> show safe notice
    triggerUnavailableNotice('Audio pronunciation is not available yet.');
  };

  const triggerUnavailableNotice = (msg: string) => {
    setShowUnavailableToast(true);
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = setTimeout(() => {
      setShowUnavailableToast(false);
    }, 3200);
  };

  // Dimensions calibration for touch targets
  const buttonDimensions =
    size === 'sm'
      ? 'min-h-[36px] min-w-[36px] px-2 py-1 text-xs'
      : size === 'lg'
      ? 'min-h-[48px] min-w-[48px] px-4 py-2.5 text-sm'
      : 'min-h-[44px] min-w-[44px] px-3 py-2 text-xs';

  return (
    <div className="relative inline-flex items-center">
      <button
        onClick={handleClick}
        type="button"
        aria-label={
          isVerifiedAudio
            ? isPlaying
              ? `Pause pronunciation for ${phraseText || 'phrase'}`
              : `Listen to verified pronunciation for ${phraseText || 'phrase'}`
            : 'Audio pronunciation is not available yet'
        }
        className={`inline-flex items-center justify-center gap-1.5 rounded-xl font-semibold transition-all active:scale-95 select-none ${buttonDimensions} ${
          isVerifiedAudio
            ? isPlaying
              ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400/50'
              : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40'
            : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700/80'
        } ${className}`}
      >
        {isVerifiedAudio ? (
          isPlaying ? (
            <Pause className="w-4 h-4 fill-current shrink-0" />
          ) : (
            <Volume2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          )
        ) : (
          <Volume2 className="w-4 h-4 shrink-0 text-slate-400" />
        )}

        {showLabel && (
          <span className="font-semibold whitespace-nowrap">
            {isPlaying ? 'Playing...' : 'Listen'}
          </span>
        )}

        {/* Animated wave dots when active */}
        {isPlaying && (
          <span className="flex items-center gap-0.5 ml-0.5">
            <span className="w-1 h-2 rounded-full bg-white animate-pulse" />
            <span className="w-1 h-3 rounded-full bg-white animate-pulse delay-75" />
            <span className="w-1 h-1.5 rounded-full bg-white animate-pulse delay-150" />
          </span>
        )}
      </button>

      {/* Accessible Floating Toast / Popover when audio is unavailable */}
      {showUnavailableToast && (
        <div
          role="status"
          aria-live="polite"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 p-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs shadow-xl flex items-center justify-between gap-2 border border-slate-700 dark:border-slate-300 animate-in fade-in slide-in-from-bottom-2 duration-150"
        >
          <div className="flex items-center gap-1.5 font-medium">
            <VolumeX className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600 shrink-0" />
            <span>Audio pronunciation is not available yet.</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowUnavailableToast(false);
            }}
            className="text-slate-400 hover:text-white dark:hover:text-black shrink-0 p-0.5"
            aria-label="Dismiss notice"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};
