/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Nexovian Xitsonga Language Engine - Phase 2 Audio Player
 * 
 * Mobile-first, accessible, responsive audio player supporting:
 * - Play / Pause / Replay
 * - Loading state
 * - Error state
 * - Audio unavailable state ("Audio pronunciation is not available yet.")
 * - Minimum 44px touch targets for Android / mobile devices
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { AudioStatus, VoiceSource } from '../../types/language';

export interface AudioPlayerProps {
  audioUrl?: string | null;
  audioStatus?: AudioStatus;
  voiceSource?: VoiceSource;
  phraseText?: string;
  englishText?: string;
  onEnded?: () => void;
  className?: string;
  compact?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  audioStatus = 'unavailable',
  voiceSource = 'native_speaker',
  phraseText,
  englishText,
  onEnded,
  className = '',
  compact = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isVerified = audioStatus === 'verified' && Boolean(audioUrl);
  const isAvailable = Boolean(audioUrl) && audioStatus !== 'unavailable';

  // Cleanup on unmount or URL change
  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setHasError(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
  }, [audioUrl]);

  const handlePlayPause = () => {
    if (!audioUrl || !isAvailable) {
      return;
    }

    if (!audioRef.current) {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.addEventListener('loadstart', () => setIsLoading(true));
      audio.addEventListener('canplay', () => setIsLoading(false));
      audio.addEventListener('timeupdate', () => {
        if (audio.duration && !isNaN(audio.duration)) {
          setCurrentTime(audio.currentTime);
          setDuration(audio.duration);
          setProgress((audio.currentTime / audio.duration) * 100);
        }
      });
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        setProgress(100);
        if (onEnded) onEnded();
      });
      audio.addEventListener('error', (e) => {
        setIsLoading(false);
        setIsPlaying(false);
        setHasError(true);
        setErrorMessage('Failed to load audio stream. Please check network connection.');
      });
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      setHasError(false);
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setIsPlaying(false);
          setHasError(true);
          setErrorMessage(err.message || 'Playback error occurred.');
        });
    }
  };

  const handleReplay = () => {
    if (audioRef.current && isAvailable) {
      audioRef.current.currentTime = 0;
      setProgress(0);
      setCurrentTime(0);
      audioRef.current.play().then(() => setIsPlaying(true));
    } else {
      handlePlayPause();
    }
  };

  // State: Audio Unavailable
  if (!isAvailable) {
    return (
      <div
        className={`flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs ${className}`}
        role="status"
        aria-label="Audio pronunciation status"
      >
        <VolumeX className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="font-medium">Audio pronunciation is not available yet.</span>
      </div>
    );
  }

  // Compact Pill / Bar Player
  if (compact) {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <button
          onClick={handlePlayPause}
          disabled={isLoading}
          aria-label={isPlaying ? 'Pause audio' : 'Play verified pronunciation'}
          className="min-w-10 min-h-10 sm:min-w-9 sm:min-h-9 flex items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all active:scale-95 shadow-sm"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>

        {isPlaying && (
          <button
            onClick={handleReplay}
            title="Replay pronunciation"
            aria-label="Replay audio"
            className="min-w-9 min-h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  }

  // Full Mobile-First Responsive Player
  return (
    <div
      className={`p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm ${className}`}
    >
      {/* Voice Source & Verification Header */}
      <div className="flex items-center justify-between gap-2 mb-2.5 text-xs">
        <div className="flex items-center gap-1.5 font-semibold">
          {isVerified ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              Verified Native Audio
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
              <AlertCircle className="w-3 h-3 text-amber-600 dark:text-amber-400" />
              Audio Pending Verification
            </span>
          )}
        </div>

        <span className="text-[11px] text-slate-400">
          {voiceSource === 'native_speaker'
            ? 'Native Xitsonga Speaker'
            : voiceSource === 'curriculum_specialist'
            ? 'Curriculum Specialist'
            : 'Unverified Source'}
        </span>
      </div>

      {/* Phrase Context */}
      {phraseText && (
        <div className="mb-3">
          <div className="text-base font-bold text-slate-900 dark:text-white">
            {phraseText}
          </div>
          {englishText && (
            <div className="text-xs text-slate-500 dark:text-slate-400">
              "{englishText}"
            </div>
          )}
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="mb-3 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center justify-between">
          <span>{errorMessage}</span>
          <button
            onClick={handlePlayPause}
            className="font-bold underline ml-2 hover:text-rose-900"
          >
            Retry
          </button>
        </div>
      )}

      {/* Progress Track */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
        <div
          className="bg-emerald-500 h-full transition-all duration-100 ease-linear rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls Row - 44px min tap targets for mobile */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Main Play/Pause Button */}
          <button
            onClick={handlePlayPause}
            disabled={isLoading}
            aria-label={isPlaying ? 'Pause pronunciation' : 'Play pronunciation'}
            className="w-12 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white flex items-center justify-center font-bold shadow-md transition-all"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          {/* Replay Button */}
          <button
            onClick={handleReplay}
            title="Replay from start"
            aria-label="Replay pronunciation from beginning"
            className="w-11 h-11 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Audio Duration Indicators */}
        <div className="text-right text-xs font-mono text-slate-400">
          <span>
            {Math.floor(currentTime)}s / {Math.floor(duration) || '--'}s
          </span>
        </div>
      </div>
    </div>
  );
};
