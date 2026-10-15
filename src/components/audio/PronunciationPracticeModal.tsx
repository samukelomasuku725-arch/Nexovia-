/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Nexovia Xitsonga Language Engine - Pronunciation Practice (Phase 2 Foundation)
 * 
 * Learner workflow:
 * 1. Listen to verified reference audio (if available)
 * 2. Record themselves saying the phrase (MediaRecorder API)
 * 3. Playback their recording
 * 4. Submit for review / teacher feedback
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Mic,
  Square,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Volume2,
  AlertCircle,
  Send,
  Loader2,
  Sparkles
} from 'lucide-react';
import { LanguageRecord, PronunciationPracticeAttempt } from '../../types/language';
import { SpeakerButton } from './SpeakerButton';

export interface PronunciationPracticeModalProps {
  phrase: LanguageRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitAttempt?: (attempt: PronunciationPracticeAttempt) => void;
}

export const PronunciationPracticeModal: React.FC<PronunciationPracticeModalProps> = ({
  phrase,
  isOpen,
  onClose,
  onSubmitAttempt
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isPlayingBack, setIsPlayingBack] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [micError, setMicError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const playbackAudioRef = useRef<HTMLAudioElement | null>(null);

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleResetRecording = () => {
    if (isRecording) {
      handleStopRecording();
    }
    if (playbackAudioRef.current) {
      playbackAudioRef.current.pause();
      playbackAudioRef.current = null;
    }
    setRecordedAudioUrl(null);
    setIsPlayingBack(false);
    setRecordingDuration(0);
  };

  // Reset state on phrase change or modal close
  useEffect(() => {
    if (!isOpen) {
      handleResetRecording();
      setIsSubmitted(false);
    }
  }, [isOpen, phrase]);

  if (!isOpen || !phrase) return null;

  const handleStartRecording = async () => {
    setMicError(null);
    audioChunksRef.current = [];

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Microphone recording is not supported in this browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(url);

        // Stop media stream tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);

      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      setMicError(
        err.name === 'NotAllowedError'
          ? 'Microphone permission was denied. Please allow microphone access in your browser settings to practice pronunciation.'
          : err.message || 'Could not access microphone.'
      );
    }
  };

  const handleTogglePlayback = () => {
    if (!recordedAudioUrl) return;

    if (!playbackAudioRef.current) {
      const audio = new Audio(recordedAudioUrl);
      playbackAudioRef.current = audio;
      audio.addEventListener('ended', () => setIsPlayingBack(false));
    }

    if (isPlayingBack) {
      playbackAudioRef.current.pause();
      setIsPlayingBack(false);
    } else {
      playbackAudioRef.current.currentTime = 0;
      playbackAudioRef.current
        .play()
        .then(() => setIsPlayingBack(true))
        .catch(() => setIsPlayingBack(false));
    }
  };

  const handleSubmit = () => {
    if (!recordedAudioUrl) return;

    const attempt: PronunciationPracticeAttempt = {
      id: `att_${Date.now()}`,
      phraseId: phrase.id,
      audioBlobUrl: recordedAudioUrl,
      durationSeconds: recordingDuration,
      timestamp: new Date().toISOString(),
      status: 'submitted_for_review',
      notes: `Learner pronunciation practice for: ${phrase.xitsonga || phrase.english}`
    };

    if (onSubmitAttempt) {
      onSubmitAttempt(attempt);
    }

    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Pronunciation Practice (Beta)
              </h3>
              <p className="text-[11px] text-slate-400">
                Xitsonga Language Engine · Phase 2
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Reference Target Card */}
          <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-slate-800/60 border border-amber-200/80 dark:border-slate-700">
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">
              Step 1: Target Phrase
            </span>
            <div className="text-xl font-bold text-slate-900 dark:text-white mb-0.5">
              {phrase.xitsonga || phrase.english}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mb-3">
              "{phrase.english}"
            </div>

            {/* Pronunciation Guide (Only if verified!) */}
            {phrase.pronunciationStatus === 'verified' && phrase.pronunciation && (
              <div className="mb-3 text-xs font-mono text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-lg inline-block border border-emerald-200 dark:border-emerald-800">
                Guide: {phrase.pronunciation}
              </div>
            )}

            {/* Listen to Verified Reference Button */}
            <div>
              <SpeakerButton
                audioUrl={phrase.audioUrl}
                audioStatus={phrase.audioStatus}
                phraseText={phrase.xitsonga}
                size="md"
              />
            </div>
          </div>

          {/* Step 2: Record Learner Audio */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Step 2: Record Your Pronunciation
            </span>

            {micError && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{micError}</span>
              </div>
            )}

            {isSubmitted ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                  Recording Submitted for Educator Review
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-400">
                  Your audio attempt has been saved. Native speaker feedback will be available in future updates.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 underline"
                >
                  Practice again
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                {!recordedAudioUrl ? (
                  !isRecording ? (
                    <button
                      onClick={handleStartRecording}
                      type="button"
                      className="min-h-[52px] px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-sm shadow-md flex items-center gap-2 transition-all"
                    >
                      <Mic className="w-5 h-5" />
                      <span>Start Recording</span>
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center mx-auto animate-pulse shadow-lg">
                        <Mic className="w-8 h-8" />
                      </div>
                      <div className="text-sm font-mono font-bold text-rose-600 dark:text-rose-400">
                        Recording: {recordingDuration}s
                      </div>
                      <button
                        onClick={handleStopRecording}
                        type="button"
                        className="min-h-[44px] px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 mx-auto active:scale-95 shadow-sm"
                      >
                        <Square className="w-4 h-4 fill-current" />
                        <span>Stop Recording</span>
                      </button>
                    </div>
                  )
                ) : (
                  <div className="w-full space-y-4">
                    <div className="flex items-center justify-center gap-3">
                      {/* Playback Learner Recording */}
                      <button
                        onClick={handleTogglePlayback}
                        type="button"
                        className="min-h-[44px] px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 active:scale-95"
                      >
                        {isPlayingBack ? (
                          <>
                            <Pause className="w-4 h-4 fill-current" />
                            <span>Pause Playback</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                            <span>Play My Recording</span>
                          </>
                        )}
                      </button>

                      {/* Re-record */}
                      <button
                        onClick={handleResetRecording}
                        type="button"
                        className="min-h-[44px] px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 active:scale-95"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Try Again</span>
                      </button>
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleSubmit}
                      type="button"
                      className="w-full min-h-[48px] py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-slate-950 font-bold text-xs shadow-sm flex items-center justify-center gap-2 active:scale-98"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Recording for Review</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
