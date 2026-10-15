import { TextToSpeechProvider, TTSOptions, TTSPlaybackState } from '../types';
import { SALanguageCode } from '../../../types';
import { isTtsSupportedForLanguage } from '../languageCapabilities';

export class WebSpeechTTSProvider implements TextToSpeechProvider {
  readonly id = 'webspeech';
  readonly name = 'Web Speech Synthesis';
  readonly description = 'Device-native text-to-speech audio reader.';

  private state: TTSPlaybackState = 'idle';
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private keepAliveInterval: any = null;
  private activeLanguage: SALanguageCode = 'en';

  isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  isLanguageSupported(language: SALanguageCode): boolean {
    return isTtsSupportedForLanguage(language);
  }

  async speak(text: string, language: SALanguageCode, options?: TTSOptions): Promise<void> {
    if (!this.isSupported()) {
      throw new Error('Speech synthesis is not supported in this browser.');
    }

    if (!this.isLanguageSupported(language)) {
      throw new Error(
        `Voice audio is currently only supported for English and Afrikaans. Text explanations are provided for all other languages.`
      );
    }

    this.stop();

    const cleanedText = this.cleanTextForSpeech(text);
    if (!cleanedText) return;

    this.activeLanguage = language;
    const utterance = new SpeechSynthesisUtterance(cleanedText);
    this.currentUtterance = utterance;

    // Dialect selection
    utterance.lang = language === 'af' ? 'af-ZA' : 'en-ZA';
    utterance.rate = options?.rate ?? 1.0;
    utterance.pitch = options?.pitch ?? 1.0;
    utterance.volume = options?.volume ?? 1.0;

    // Pick best matching voice
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const match = voices.find(
        (v) =>
          v.lang.toLowerCase() === utterance.lang.toLowerCase() ||
          v.lang.toLowerCase().startsWith(language)
      );
      if (match) {
        utterance.voice = match;
      }
    }

    utterance.onstart = () => {
      this.state = 'playing';
      this.startKeepAlive();
      options?.onStart?.();
    };

    utterance.onpause = () => {
      this.state = 'paused';
      this.stopKeepAlive();
      options?.onPause?.();
    };

    utterance.onresume = () => {
      this.state = 'playing';
      this.startKeepAlive();
      options?.onResume?.();
    };

    utterance.onend = () => {
      this.state = 'stopped';
      this.stopKeepAlive();
      this.currentUtterance = null;
      options?.onEnd?.();
    };

    utterance.onerror = (event) => {
      this.state = 'error';
      this.stopKeepAlive();
      this.currentUtterance = null;
      if (event.error !== 'interrupted' && event.error !== 'canceled') {
        options?.onError?.(new Error(`Speech synthesis error: ${event.error}`));
      }
    };

    window.speechSynthesis.speak(utterance);
  }

  pause(): void {
    if (this.isSupported() && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      this.state = 'paused';
      this.stopKeepAlive();
    }
  }

  resume(): void {
    if (this.isSupported() && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      this.state = 'playing';
      this.startKeepAlive();
    }
  }

  stop(): void {
    if (this.isSupported()) {
      this.stopKeepAlive();
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
      this.state = 'stopped';
    }
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

  getAvailableVoices(language?: SALanguageCode): Array<{ id: string; name: string; lang: string }> {
    if (!this.isSupported()) return [];
    const voices = window.speechSynthesis.getVoices();
    return voices
      .filter((v) => !language || v.lang.toLowerCase().startsWith(language))
      .map((v) => ({
        id: v.name,
        name: v.name,
        lang: v.lang
      }));
  }

  private cleanTextForSpeech(raw: string): string {
    return raw
      .replace(/```[\s\S]*?```/g, ' [Code sample omitted for voice playback] ')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/^#{1,6}\s+/gm, '') // Markdown headings
      .replace(/\*\*(.*?)\*\*/g, '$1') // bold
      .replace(/\*(.*?)\*/g, '$1') // italics
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // links
      .replace(/[-*•]\s+/g, '') // list bullets
      .replace(/\n+/g, ' ')
      .trim();
  }

  /**
   * Chromium bug workaround: speech synthesis can freeze after ~15s
   * if not periodically triggered with pause/resume.
   */
  private startKeepAlive(): void {
    this.stopKeepAlive();
    this.keepAliveInterval = setInterval(() => {
      if (this.state === 'playing' && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 12000);
  }

  private stopKeepAlive(): void {
    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
      this.keepAliveInterval = null;
    }
  }
}
