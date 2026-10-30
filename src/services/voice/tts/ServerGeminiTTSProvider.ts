import { TextToSpeechProvider, TTSOptions, TTSPlaybackState } from '../types';
import { SALanguageCode } from '../../../types';
import { isTtsSupportedForLanguage } from '../languageCapabilities';

export class ServerGeminiTTSProvider implements TextToSpeechProvider {
  readonly id = 'gemini-server';
  readonly name = 'NEXOVIA Gemini Neural Voice';
  readonly description = 'Natural neural voice synthesis powered by Gemini.';

  private state: TTSPlaybackState = 'idle';
  private audioElement: HTMLAudioElement | null = null;
  private currentObjectUrl: string | null = null;

  isSupported(): boolean {
    return typeof window !== 'undefined' && typeof Audio !== 'undefined';
  }

  isLanguageSupported(language: SALanguageCode): boolean {
    return isTtsSupportedForLanguage(language);
  }

  async speak(text: string, language: SALanguageCode, options?: TTSOptions): Promise<void> {
    if (!this.isSupported()) {
      throw new Error('Audio playback is not supported in this browser.');
    }

    if (!this.isLanguageSupported(language)) {
      throw new Error('Voice audio is only supported for English and Afrikaans.');
    }

    this.stop();

    try {
      this.state = 'playing';
      options?.onStart?.();

      const response = await fetch('/api/ai/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          language,
          voiceName: options?.voiceName || 'Kore'
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success || !data.audioBase64) {
        throw new Error(data.message || 'Server TTS synthesis failed.');
      }

      // Convert base64 to blob audio url
      const byteCharacters = atob(data.audioBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: data.mimeType || 'audio/wav' });

      if (this.currentObjectUrl) {
        URL.revokeObjectURL(this.currentObjectUrl);
      }
      this.currentObjectUrl = URL.createObjectURL(blob);

      this.audioElement = new Audio(this.currentObjectUrl);
      this.audioElement.playbackRate = options?.rate ?? 1.0;

      this.audioElement.onpause = () => {
        if (this.audioElement && !this.audioElement.ended) {
          this.state = 'paused';
          options?.onPause?.();
        }
      };

      this.audioElement.onplay = () => {
        this.state = 'playing';
        options?.onResume?.();
      };

      this.audioElement.onended = () => {
        this.state = 'stopped';
        this.cleanUp();
        options?.onEnd?.();
      };

      this.audioElement.onerror = () => {
        this.state = 'error';
        this.cleanUp();
        options?.onError?.(new Error('Audio playback encountered an error.'));
      };

      await this.audioElement.play();
    } catch (err: any) {
      this.state = 'error';
      this.cleanUp();
      options?.onError?.(err);
      throw err;
    }
  }

  pause(): void {
    if (this.audioElement && !this.audioElement.paused) {
      this.audioElement.pause();
      this.state = 'paused';
    }
  }

  resume(): void {
    if (this.audioElement && this.audioElement.paused) {
      this.audioElement.play();
      this.state = 'playing';
    }
  }

  stop(): void {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
    this.cleanUp();
    this.state = 'stopped';
  }

  getState(): TTSPlaybackState {
    return this.state;
  }

  isPlaying(): boolean {
    return this.state === 'playing';
  }

  isPaused(): boolean {
    return this.state === 'paused';
  }

  getAvailableVoices(_language?: SALanguageCode): Array<{ id: string; name: string; lang: string }> {
    return [
      { id: 'Kore', name: 'Kore (Encouraging Teacher)', lang: 'en-ZA' },
      { id: 'Puck', name: 'Puck (Engaging Mentor)', lang: 'en-ZA' },
      { id: 'Fenrir', name: 'Fenrir (Deep Clarity)', lang: 'en-ZA' },
      { id: 'Zephyr', name: 'Zephyr (Gentle Tutor)', lang: 'en-ZA' }
    ];
  }

  private cleanUp(): void {
    if (this.currentObjectUrl) {
      URL.revokeObjectURL(this.currentObjectUrl);
      this.currentObjectUrl = null;
    }
    this.audioElement = null;
  }
}
