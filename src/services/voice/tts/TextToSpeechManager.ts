import {
  TextToSpeechProvider,
  TTSOptions,
  TTSPlaybackState,
  TTSProviderType
} from '../types';
import { SALanguageCode } from '../../../types';
import { WebSpeechTTSProvider } from './WebSpeechTTSProvider';
import { ServerGeminiTTSProvider } from './ServerGeminiTTSProvider';
import { isTtsSupportedForLanguage } from '../languageCapabilities';

export interface TTSStateUpdate {
  state: TTSPlaybackState;
  currentMessageId: string | null;
  language: SALanguageCode;
  error?: string;
}

type Listener = (state: TTSStateUpdate) => void;

export class TextToSpeechManager {
  private webSpeechProvider: WebSpeechTTSProvider;
  private serverGeminiProvider: ServerGeminiTTSProvider;
  private providerPreference: TTSProviderType = 'auto';
  private activeProvider: TextToSpeechProvider;

  private currentMessageId: string | null = null;
  private currentLanguage: SALanguageCode = 'en';
  private speechRate: number = 1.0;
  private speechPitch: number = 1.0;
  private autoPlayAnswers: boolean = false;
  private listeners: Set<Listener> = new Set();
  private lastError?: string;

  constructor() {
    this.webSpeechProvider = new WebSpeechTTSProvider();
    this.serverGeminiProvider = new ServerGeminiTTSProvider();
    this.activeProvider = this.resolveProvider('auto');
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    // Send current state
    listener(this.getStateSnapshot());
    return () => this.listeners.delete(listener);
  }

  private notify() {
    const snapshot = this.getStateSnapshot();
    this.listeners.forEach((l) => l(snapshot));
  }

  getStateSnapshot(): TTSStateUpdate {
    return {
      state: this.activeProvider.getState(),
      currentMessageId: this.currentMessageId,
      language: this.currentLanguage,
      error: this.lastError
    };
  }

  setProviderPreference(pref: TTSProviderType) {
    this.providerPreference = pref;
    this.activeProvider = this.resolveProvider(pref);
  }

  getProviderPreference(): TTSProviderType {
    return this.providerPreference;
  }

  setSpeechRate(rate: number) {
    this.speechRate = Math.max(0.5, Math.min(2.0, rate));
  }

  getSpeechRate(): number {
    return this.speechRate;
  }

  setSpeechPitch(pitch: number) {
    this.speechPitch = Math.max(0.5, Math.min(1.5, pitch));
  }

  getSpeechPitch(): number {
    return this.speechPitch;
  }

  setAutoPlayAnswers(enabled: boolean) {
    this.autoPlayAnswers = enabled;
  }

  getAutoPlayAnswers(): boolean {
    return this.autoPlayAnswers;
  }

  isLanguageSupported(language: SALanguageCode): boolean {
    return isTtsSupportedForLanguage(language);
  }

  async speakMessage(
    messageId: string,
    text: string,
    language: SALanguageCode = 'en'
  ): Promise<void> {
    if (!this.isLanguageSupported(language)) {
      this.lastError = `Voice output is only supported for English and Afrikaans. Text explanation provided.`;
      this.notify();
      return;
    }

    // If already playing this message, toggle pause
    if (this.currentMessageId === messageId && this.activeProvider.isPlaying()) {
      this.pause();
      return;
    }

    if (this.currentMessageId === messageId && this.activeProvider.isPaused()) {
      this.resume();
      return;
    }

    // Stop existing playback
    this.stop();

    this.currentMessageId = messageId;
    this.currentLanguage = language;
    this.lastError = undefined;

    const options: TTSOptions = {
      rate: this.speechRate,
      pitch: this.speechPitch,
      onStart: () => {
        this.notify();
      },
      onPause: () => {
        this.notify();
      },
      onResume: () => {
        this.notify();
      },
      onEnd: () => {
        this.currentMessageId = null;
        this.notify();
      },
      onError: (err) => {
        this.lastError = err.message;
        this.currentMessageId = null;
        this.notify();
      }
    };

    try {
      this.activeProvider = this.resolveProvider(this.providerPreference);
      await this.activeProvider.speak(text, language, options);
    } catch (err: any) {
      this.lastError = err.message || 'Voice playback failed.';
      this.currentMessageId = null;
      this.notify();
      throw err;
    }
  }

  pause(): void {
    this.activeProvider.pause();
    this.notify();
  }

  resume(): void {
    this.activeProvider.resume();
    this.notify();
  }

  stop(): void {
    this.activeProvider.stop();
    this.currentMessageId = null;
    this.notify();
  }

  isPlaying(): boolean {
    return this.activeProvider.isPlaying();
  }

  isPaused(): boolean {
    return this.activeProvider.isPaused();
  }

  isMessagePlaying(messageId: string): boolean {
    return this.currentMessageId === messageId && this.activeProvider.isPlaying();
  }

  isMessagePaused(messageId: string): boolean {
    return this.currentMessageId === messageId && this.activeProvider.isPaused();
  }

  getCurrentMessageId(): string | null {
    return this.currentMessageId;
  }

  private resolveProvider(pref: TTSProviderType): TextToSpeechProvider {
    if (pref === 'webspeech') {
      return this.webSpeechProvider;
    }
    if (pref === 'gemini-server') {
      return this.serverGeminiProvider;
    }
    // 'auto' mode: prefer web speech if available
    if (this.webSpeechProvider.isSupported()) {
      return this.webSpeechProvider;
    }
    return this.serverGeminiProvider;
  }
}

export const ttsManager = new TextToSpeechManager();
