import { SALanguageCode } from '../../types';

export type STTState = 'idle' | 'listening' | 'processing' | 'completed' | 'error';

export type MicrophonePermissionStatus =
  | 'prompt'
  | 'granted'
  | 'denied'
  | 'unavailable'
  | 'unsupported';

export interface STTOptions {
  language?: SALanguageCode;
  interimResults?: boolean;
  continuous?: boolean;
}

export interface STTResult {
  text: string;
  isFinal: boolean;
  confidence?: number;
  error?: string;
  languageUsed?: string;
}

export type STTProviderType = 'auto' | 'webspeech' | 'gemini-server';
export type TTSProviderType = 'auto' | 'webspeech' | 'gemini-server';

/**
 * Speech-to-Text provider abstraction.
 * Allows interchangeable transcription engines (Web Speech API, Gemini Server Audio, Whisper, etc.)
 */
export interface SpeechToTextProvider {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  isSupported(): boolean;
  checkPermission(): Promise<MicrophonePermissionStatus>;
  requestPermission(): Promise<boolean>;
  startRecording(
    options?: STTOptions,
    onInterimResult?: (transcript: string) => void
  ): Promise<void>;
  stopRecording(): Promise<string>;
  cancel(): void;
  getState(): STTState;
  getAudioLevel?: () => number; // 0 to 1 for live visualizer
}

export type TTSPlaybackState = 'idle' | 'playing' | 'paused' | 'stopped' | 'error';

export interface TTSOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  voiceName?: string;
  onStart?: () => void;
  onEnd?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onError?: (err: Error) => void;
}

/**
 * Text-to-Speech provider abstraction.
 * Allows interchangeable synthesis engines (Web Speech API, Gemini TTS, etc.)
 */
export interface TextToSpeechProvider {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  isSupported(): boolean;
  isLanguageSupported(language: SALanguageCode): boolean;
  speak(text: string, language: SALanguageCode, options?: TTSOptions): Promise<void>;
  pause(): void;
  resume(): void;
  stop(): void;
  getState(): TTSPlaybackState;
  isPlaying(): boolean;
  isPaused(): boolean;
  getAvailableVoices(language?: SALanguageCode): Array<{ id: string; name: string; lang: string }>;
}

export interface VoiceCapability {
  code: SALanguageCode;
  name: string;
  nativeName: string;
  text: boolean;
  speechToText: boolean;
  textToSpeech: boolean;
  sttDialect: string;
  ttsVoiceAvailable: boolean;
  ttsVoiceName?: string;
  notes: string;
}

export type LanguageCapabilityMap = Record<SALanguageCode, VoiceCapability>;

export interface VoiceSettings {
  autoPlayResponses: boolean;
  speechRate: number; // 0.75, 1.0, 1.25, 1.5
  speechPitch: number; // 0.8, 1.0, 1.2
  sttProvider: STTProviderType;
  ttsProvider: TTSProviderType;
}
