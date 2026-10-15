import React, { useState, useEffect } from 'react';
import {
  Volume2,
  Pause,
  Play,
  Square,
  VolumeX,
  Info,
  Sparkles
} from 'lucide-react';
import { SALanguageCode } from '../../types';
import { ttsManager, TTSStateUpdate } from '../../services/voice/tts/TextToSpeechManager';
import { isTtsSupportedForLanguage, getLanguageCapability } from '../../services/voice/languageCapabilities';

interface MessageAudioControlsProps {
  messageId: string;
  content: string;
  language: SALanguageCode;
  onOpenCapabilityModal?: () => void;
  className?: string;
}

export const MessageAudioControls: React.FC<MessageAudioControlsProps> = ({
  messageId,
  content,
  language,
  onOpenCapabilityModal,
  className = ''
}) => {
  const [ttsState, setTtsState] = useState<TTSStateUpdate>(ttsManager.getStateSnapshot());
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const unsubscribe = ttsManager.subscribe((newState) => {
      setTtsState(newState);
    });
    return unsubscribe;
  }, []);

  const isSupported = isTtsSupportedForLanguage(language);
  const capability = getLanguageCapability(language);
  const isThisMessageCurrent = ttsState.currentMessageId === messageId;
  const isPlaying = isThisMessageCurrent && ttsState.state === 'playing';
  const isPaused = isThisMessageCurrent && ttsState.state === 'paused';

  const handleListen = async () => {
    if (!isSupported) {
      setShowNotice(true);
      setTimeout(() => setShowNotice(false), 4500);
      return;
    }
    await ttsManager.speakMessage(messageId, content, language);
  };

  const handlePause = () => {
    ttsManager.pause();
  };

  const handleResume = () => {
    ttsManager.resume();
  };

  const handleStop = () => {
    ttsManager.stop();
  };

  // If TTS is NOT supported for this language (e.g., isiZulu, isiXhosa, Sepedi, etc.)
  if (!isSupported) {
    return (
      <div className={`relative inline-flex items-center gap-1.5 ${className}`}>
        <button
          type="button"
          onClick={() => {
            setShowNotice(!showNotice);
            if (onOpenCapabilityModal) onOpenCapabilityModal();
          }}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 py-1 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={`Voice audio is not available for ${capability.name}. Click to view voice capabilities.`}
        >
          <VolumeX className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[10px] hidden sm:inline">Text only</span>
          <Info className="w-3 h-3 text-slate-400 opacity-60" />
        </button>

        {showNotice && (
          <div className="absolute bottom-full left-0 mb-1 z-30 w-64 p-2.5 bg-slate-900 text-white rounded-xl shadow-xl text-[11px] leading-relaxed border border-slate-700 animate-in fade-in slide-in-from-bottom-1">
            <p className="font-semibold text-amber-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Voice Narration
            </p>
            <p className="mt-1 text-slate-300">
              Voice audio output is only available in <strong>English</strong> and <strong>Afrikaans</strong> on standard devices.
            </p>
            <p className="mt-1 text-slate-400">
              Full text explanation in <strong>{capability.name}</strong> is displayed on screen.
            </p>
            {onOpenCapabilityModal && (
              <button
                type="button"
                onClick={onOpenCapabilityModal}
                className="mt-2 text-[10px] text-amber-300 hover:underline font-bold block"
              >
                View 11 Languages Capability Matrix →
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  // If TTS IS supported (English or Afrikaans)
  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      {/* 1. LISTEN BUTTON (when not active) */}
      {!isThisMessageCurrent && (
        <button
          type="button"
          onClick={handleListen}
          className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium group"
          title={`Listen to response in ${capability.name}`}
          aria-label="Listen to answer"
        >
          <Volume2 className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-500 transition-transform group-hover:scale-110" />
          <span className="text-[11px] font-semibold">Listen</span>
        </button>
      )}

      {/* ACTIVE PLAYBACK CONTROLS (Pause, Resume, Stop) */}
      {isThisMessageCurrent && (
        <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 rounded-lg p-0.5 animate-in fade-in">
          {/* Active Speaking Indicator */}
          <div className="flex items-center gap-1 px-1.5 py-0.5">
            <span className="flex items-end gap-0.5 h-3">
              <span className={`w-0.5 bg-amber-500 rounded-full transition-all ${isPlaying ? 'animate-bounce' : 'h-1.5'}`} style={{ height: isPlaying ? '10px' : '4px', animationDelay: '0ms' }} />
              <span className={`w-0.5 bg-amber-500 rounded-full transition-all ${isPlaying ? 'animate-bounce' : 'h-2.5'}`} style={{ height: isPlaying ? '12px' : '6px', animationDelay: '150ms' }} />
              <span className={`w-0.5 bg-amber-500 rounded-full transition-all ${isPlaying ? 'animate-bounce' : 'h-1.5'}`} style={{ height: isPlaying ? '8px' : '4px', animationDelay: '300ms' }} />
            </span>
            <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 hidden sm:inline">
              {isPlaying ? 'Speaking' : 'Paused'}
            </span>
          </div>

          {/* PAUSE BUTTON */}
          {isPlaying && (
            <button
              type="button"
              onClick={handlePause}
              className="p-1 text-amber-800 dark:text-amber-200 hover:bg-amber-500/20 rounded transition-colors"
              title="Pause playback"
              aria-label="Pause audio playback"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
            </button>
          )}

          {/* RESUME BUTTON */}
          {isPaused && (
            <button
              type="button"
              onClick={handleResume}
              className="p-1 text-amber-800 dark:text-amber-200 hover:bg-amber-500/20 rounded transition-colors"
              title="Resume playback"
              aria-label="Resume audio playback"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
            </button>
          )}

          {/* STOP BUTTON */}
          <button
            type="button"
            onClick={handleStop}
            className="p-1 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
            title="Stop playback"
            aria-label="Stop audio playback"
          >
            <Square className="w-3 h-3 fill-current" />
          </button>
        </div>
      )}
    </div>
  );
};
