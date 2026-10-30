import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  Square,
  X,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Volume2,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { SALanguageCode } from '../../types';
import { sttManager } from '../../services/voice/stt/SpeechToTextManager';
import { STTState, MicrophonePermissionStatus } from '../../services/voice/types';
import { getLanguageCapability } from '../../services/voice/languageCapabilities';

interface VoiceInputButtonProps {
  onTranscriptionReady: (text: string) => void;
  language: SALanguageCode;
  disabled?: boolean;
  className?: string;
  onStateChange?: (state: STTState) => void;
}

export const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({
  onTranscriptionReady,
  language,
  disabled = false,
  className = '',
  onStateChange
}) => {
  const [state, setState] = useState<STTState>('idle');
  const [interimText, setInterimText] = useState('');
  const [duration, setDuration] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<MicrophonePermissionStatus>('prompt');
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const timerRef = useRef<any>(null);
  const visualizerRef = useRef<any>(null);

  const langCapability = getLanguageCapability(language);

  useEffect(() => {
    onStateChange?.(state);
  }, [state, onStateChange]);

  useEffect(() => {
    // Initial check of permission if supported
    sttManager.checkPermission().then(setPermissionStatus).catch(() => {});
  }, []);

  // Duration timer & audio level polling when listening
  useEffect(() => {
    if (state === 'listening') {
      setDuration(0);
      timerRef.current = setInterval(() => {
        setDuration((d) => d + 1);
      }, 1000);

      visualizerRef.current = setInterval(() => {
        const level = sttManager.getAudioLevel();
        setAudioLevel(level);
      }, 80);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (visualizerRef.current) clearInterval(visualizerRef.current);
      setAudioLevel(0);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (visualizerRef.current) clearInterval(visualizerRef.current);
    };
  }, [state]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleStartListening = async () => {
    if (disabled) return;
    setErrorMessage(null);
    setInterimText('');

    if (!sttManager.isSupported()) {
      setErrorMessage(
        'Speech recognition is not supported in this browser. Please use text typing, or try Chrome, Edge, or Android WebView.'
      );
      setState('error');
      return;
    }

    // Check permission
    const currentPerm = await sttManager.checkPermission();
    setPermissionStatus(currentPerm);

    if (currentPerm === 'denied') {
      setShowPermissionModal(true);
      setErrorMessage(
        'Microphone access is blocked in your browser settings. Please allow microphone access to speak your questions.'
      );
      setState('error');
      return;
    }

    try {
      setState('listening');
      await sttManager.startRecording(
        {
          language,
          interimResults: true,
          continuous: true
        },
        (interim) => {
          setInterimText(interim);
        }
      );
    } catch (err: any) {
      console.warn('Voice recording start error:', err);
      setState('error');
      const msg = err?.message || 'Could not access microphone.';
      if (msg.toLowerCase().includes('permission') || msg.toLowerCase().includes('denied')) {
        setShowPermissionModal(true);
        setErrorMessage('Microphone permission was denied. Please allow microphone access in your browser address bar.');
      } else {
        setErrorMessage(msg);
      }
    }
  };

  const handleStopListening = async () => {
    if (state !== 'listening') return;
    setState('processing');

    try {
      const finalTranscript = await sttManager.stopRecording();
      const resultingText = finalTranscript.trim() || interimText.trim();

      if (!resultingText || resultingText.length < 2) {
        setErrorMessage(
          'No speech was detected. Please make sure your microphone is working and speak clearly.'
        );
        setState('error');
        return;
      }

      setState('completed');
      onTranscriptionReady(resultingText);

      // Auto-revert to idle after 3 seconds while keeping user's text in textarea
      setTimeout(() => {
        setState((current) => (current === 'completed' ? 'idle' : current));
        setInterimText('');
      }, 2500);
    } catch (err: any) {
      console.error('Stop voice recording error:', err);
      setState('error');
      setErrorMessage(err?.message || 'Could not convert audio to text. Please try again or type your question.');
    }
  };

  const handleCancel = () => {
    sttManager.cancel();
    setState('idle');
    setInterimText('');
    setErrorMessage(null);
  };

  return (
    <>
      <div className={`relative inline-flex items-center ${className}`}>
        {/* IDLE STATE BUTTON */}
        {state === 'idle' && (
          <button
            type="button"
            onClick={handleStartListening}
            disabled={disabled}
            className="p-2 sm:p-2.5 text-slate-500 hover:text-amber-500 dark:text-slate-400 dark:hover:text-amber-400 hover:bg-amber-500/10 rounded-xl transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none group"
            title={`Speak your question (${langCapability.name} - ${langCapability.sttDialect})`}
            aria-label="Speak question using microphone"
          >
            <Mic className="w-5 h-5 transition-transform group-hover:scale-110" />
          </button>
        )}

        {/* LISTENING STATE ACTIVE OVERLAY */}
        {state === 'listening' && (
          <div className="flex items-center gap-2 bg-amber-500 text-slate-950 px-3 py-1.5 rounded-xl font-medium shadow-md shadow-amber-500/20 animate-in fade-in zoom-in-95 duration-150">
            {/* Pulsing indicator */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600" />
            </span>

            {/* Dynamic Sound Wave visualizer bars */}
            <div className="flex items-end gap-0.5 h-4 w-7 px-0.5">
              <span
                className="w-1 bg-slate-950 rounded-full transition-all duration-75"
                style={{ height: `${Math.max(4, Math.min(16, 4 + audioLevel * 24))}px` }}
              />
              <span
                className="w-1 bg-slate-950 rounded-full transition-all duration-75"
                style={{ height: `${Math.max(6, Math.min(16, 6 + audioLevel * 32))}px` }}
              />
              <span
                className="w-1 bg-slate-950 rounded-full transition-all duration-75"
                style={{ height: `${Math.max(4, Math.min(16, 4 + audioLevel * 20))}px` }}
              />
            </div>

            <span className="text-xs font-bold font-mono tracking-tight">
              {formatDuration(duration)}
            </span>

            <span className="text-xs font-semibold hidden sm:inline ml-0.5">
              Listening...
            </span>

            {/* Stop & Finish Button */}
            <button
              type="button"
              onClick={handleStopListening}
              className="p-1 hover:bg-slate-950/10 rounded-lg transition-colors ml-1"
              title="Finish speaking and convert to text"
              aria-label="Done speaking"
            >
              <Square className="w-4 h-4 fill-slate-950" />
            </button>

            {/* Cancel Button */}
            <button
              type="button"
              onClick={handleCancel}
              className="p-1 hover:bg-slate-950/10 rounded-lg transition-colors"
              title="Cancel recording"
              aria-label="Cancel recording"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* PROCESSING STATE */}
        {state === 'processing' && (
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm animate-pulse">
            <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />
            <span className="text-xs font-medium">Converting to text...</span>
          </div>
        )}

        {/* COMPLETED STATE */}
        {state === 'completed' && (
          <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-2.5 py-1.5 rounded-xl border border-emerald-500/20 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Transcribed</span>
          </div>
        )}

        {/* ERROR STATE */}
        {state === 'error' && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleStartListening}
              className="p-2 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 rounded-xl transition-colors"
              title="Voice recording error. Tap to retry."
              aria-label="Retry microphone input"
            >
              <AlertCircle className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              title="Dismiss error"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* FLOATING LIVE TRANSCRIPTION PREVIEW DURING LISTENING */}
      {state === 'listening' && interimText && (
        <div className="absolute bottom-full left-0 right-0 mb-2 p-2.5 bg-white dark:bg-slate-900 border border-amber-500/40 rounded-xl shadow-lg z-20 text-xs text-slate-800 dark:text-slate-200 flex items-start gap-2 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
          <div className="flex-1">
            <span className="font-semibold text-amber-600 dark:text-amber-400 block text-[10px] uppercase tracking-wider mb-0.5">
              Live Speech Detection ({langCapability.name}):
            </span>
            <span className="italic leading-relaxed">{interimText}</span>
          </div>
        </div>
      )}

      {/* ERROR BANNER NOTIFICATION */}
      {errorMessage && state === 'error' && (
        <div className="absolute bottom-full left-0 right-0 mb-2 p-3 bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-900 rounded-xl shadow-md z-20 text-xs text-rose-800 dark:text-rose-200 flex items-start justify-between gap-2">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Microphone Notice</p>
              <p className="mt-0.5 text-[11px] leading-relaxed opacity-90">{errorMessage}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="p-1 text-rose-400 hover:text-rose-700 dark:hover:text-rose-200 shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* PERMISSION HELP MODAL */}
      {showPermissionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-5 shadow-2xl text-slate-900 dark:text-white">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3">
              <Mic className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold">Microphone Access Required</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Nexovian Academy needs microphone permission so you can speak questions directly to your AI Tutor.
            </p>
            <div className="mt-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
              <p className="font-semibold text-slate-800 dark:text-slate-100">To allow access:</p>
              <p>1. Tap the lock or tune icon beside the website address in your browser.</p>
              <p>2. Set <strong>Microphone</strong> to <strong>Allow</strong>.</p>
              <p>3. Tap Try Again below.</p>
            </div>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowPermissionModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg"
              >
                Use Text Typing
              </button>
              <button
                type="button"
                onClick={async () => {
                  setShowPermissionModal(false);
                  const ok = await sttManager.requestPermission();
                  if (ok) {
                    handleStartListening();
                  }
                }}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl shadow transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
