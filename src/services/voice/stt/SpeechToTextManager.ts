import {
  MicrophonePermissionStatus,
  SpeechToTextProvider,
  STTOptions,
  STTProviderType,
  STTState
} from '../types';
import { WebSpeechSTTProvider } from './WebSpeechSTTProvider';
import { ServerGeminiSTTProvider } from './ServerGeminiSTTProvider';

export class SpeechToTextManager {
  private webSpeechProvider: WebSpeechSTTProvider;
  private serverGeminiProvider: ServerGeminiSTTProvider;
  private providerPreference: STTProviderType = 'auto';
  private activeProvider: SpeechToTextProvider;

  constructor() {
    this.webSpeechProvider = new WebSpeechSTTProvider();
    this.serverGeminiProvider = new ServerGeminiSTTProvider();
    this.activeProvider = this.resolveProvider('auto');
  }

  setProviderPreference(pref: STTProviderType) {
    this.providerPreference = pref;
    this.activeProvider = this.resolveProvider(pref);
  }

  getProviderPreference(): STTProviderType {
    return this.providerPreference;
  }

  getActiveProvider(): SpeechToTextProvider {
    return this.activeProvider;
  }

  getAvailableProviders(): Array<{ id: STTProviderType; name: string; supported: boolean; description: string }> {
    return [
      {
        id: 'auto',
        name: 'Auto-Select (Recommended)',
        supported: this.webSpeechProvider.isSupported() || this.serverGeminiProvider.isSupported(),
        description: 'Automatically chooses fast device-native recognition or cloud AI transcription.'
      },
      {
        id: 'webspeech',
        name: 'Device Web Speech API',
        supported: this.webSpeechProvider.isSupported(),
        description: 'Instant zero-latency streaming on Chrome, Edge, Safari, and Android.'
      },
      {
        id: 'gemini-server',
        name: 'NEXOVIA Gemini Multimodal AI',
        supported: this.serverGeminiProvider.isSupported(),
        description: 'High-accuracy neural transcription supporting all South African education terminology.'
      }
    ];
  }

  isSupported(): boolean {
    return this.activeProvider.isSupported();
  }

  async checkPermission(): Promise<MicrophonePermissionStatus> {
    return this.activeProvider.checkPermission();
  }

  async requestPermission(): Promise<boolean> {
    return this.activeProvider.requestPermission();
  }

  async startRecording(
    options?: STTOptions,
    onInterimResult?: (transcript: string) => void
  ): Promise<void> {
    this.activeProvider = this.resolveProvider(this.providerPreference);
    if (!this.activeProvider.isSupported()) {
      throw new Error('Speech recognition is not supported in this browser. Please use text typing.');
    }
    return this.activeProvider.startRecording(options, onInterimResult);
  }

  async stopRecording(): Promise<string> {
    return this.activeProvider.stopRecording();
  }

  cancel(): void {
    this.activeProvider.cancel();
    this.webSpeechProvider.cancel();
    this.serverGeminiProvider.cancel();
  }

  getState(): STTState {
    return this.activeProvider.getState();
  }

  getAudioLevel(): number {
    if (this.activeProvider.getAudioLevel) {
      return this.activeProvider.getAudioLevel();
    }
    return 0;
  }

  private resolveProvider(pref: STTProviderType): SpeechToTextProvider {
    if (pref === 'webspeech') {
      return this.webSpeechProvider;
    }
    if (pref === 'gemini-server') {
      return this.serverGeminiProvider;
    }
    // 'auto' mode: prefer web speech if supported, else server gemini
    if (this.webSpeechProvider.isSupported()) {
      return this.webSpeechProvider;
    }
    return this.serverGeminiProvider;
  }
}

export const sttManager = new SpeechToTextManager();
