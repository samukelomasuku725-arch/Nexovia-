import {
  MicrophonePermissionStatus,
  SpeechToTextProvider,
  STTOptions,
  STTState
} from '../types';
import { getSttLocale } from '../languageCapabilities';

export class WebSpeechSTTProvider implements SpeechToTextProvider {
  readonly id = 'webspeech';
  readonly name = 'Web Speech Recognition';
  readonly description = 'Device-native browser speech recognition with immediate real-time transcription.';

  private recognition: any = null;
  private state: STTState = 'idle';
  private transcript = '';
  private interimTranscript = '';
  private onInterimCallback?: (text: string) => void;
  private resolveStop?: (finalTranscript: string) => void;
  private rejectStop?: (reason: any) => void;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private mediaStream: MediaStream | null = null;
  private audioDataArray: Uint8Array | null = null;

  isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!(
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition
    );
  }

  async checkPermission(): Promise<MicrophonePermissionStatus> {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      return 'unsupported';
    }

    if (navigator.permissions?.query) {
      try {
        const status = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        if (status.state === 'granted') return 'granted';
        if (status.state === 'denied') return 'denied';
        return 'prompt';
      } catch {
        // Fall back to prompt state
        return 'prompt';
      }
    }
    return 'prompt';
  }

  async requestPermission(): Promise<boolean> {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      return false;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Keep track of stream for audio level analysis if desired, then release if not actively recording
      stream.getTracks().forEach((t) => t.stop());
      return true;
    } catch {
      return false;
    }
  }

  async startRecording(
    options?: STTOptions,
    onInterimResult?: (transcript: string) => void
  ): Promise<void> {
    if (!this.isSupported()) {
      this.state = 'error';
      throw new Error('Web Speech Recognition is not supported in this browser.');
    }

    // Cancel any ongoing instance
    this.cancel();

    this.transcript = '';
    this.interimTranscript = '';
    this.onInterimCallback = onInterimResult;
    this.state = 'listening';

    // Start audio visualizer stream concurrently if possible
    try {
      if (navigator.mediaDevices?.getUserMedia) {
        this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          this.audioContext = new AudioCtx();
          const source = this.audioContext.createMediaStreamSource(this.mediaStream);
          this.analyser = this.audioContext.createAnalyser();
          this.analyser.fftSize = 64;
          source.connect(this.analyser);
          this.audioDataArray = new Uint8Array(this.analyser.frequencyBinCount);
        }
      }
    } catch (e) {
      // Audio stream for visualizer failed, but speech recognition can still proceed
      console.warn('Microphone visualizer stream initialization warning:', e);
    }

    const SpeechRecClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    this.recognition = new SpeechRecClass();
    const lang = options?.language || 'en';
    this.recognition.lang = getSttLocale(lang);
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 1;

    this.recognition.onresult = (event: any) => {
      let currentFinal = '';
      let currentInterim = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        if (result.isFinal) {
          currentFinal += result[0].transcript + ' ';
        } else {
          currentInterim += result[0].transcript;
        }
      }

      if (currentFinal) {
        this.transcript += currentFinal;
      }
      this.interimTranscript = currentInterim;

      const combined = (this.transcript + ' ' + this.interimTranscript).trim();
      if (this.onInterimCallback) {
        this.onInterimCallback(combined);
      }
    };

    this.recognition.onerror = (event: any) => {
      console.warn('SpeechRecognition error:', event.error);
      if (event.error === 'no-speech') {
        // Still allow the user to continue speaking or finish
        return;
      }
      this.state = 'error';
      if (this.rejectStop) {
        this.rejectStop(new Error(`Speech recognition error: ${event.error}`));
        this.rejectStop = undefined;
        this.resolveStop = undefined;
      }
    };

    this.recognition.onend = () => {
      if (this.state === 'listening') {
        // Recognition ended naturally or stopped
        this.state = 'completed';
        const finalResult = (this.transcript + ' ' + this.interimTranscript).trim();
        if (this.resolveStop) {
          this.resolveStop(finalResult);
          this.resolveStop = undefined;
          this.rejectStop = undefined;
        }
      }
      this.cleanUpAudioStream();
    };

    try {
      this.recognition.start();
    } catch (err) {
      this.state = 'error';
      this.cleanUpAudioStream();
      throw err;
    }
  }

  async stopRecording(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.state = 'processing';
      this.resolveStop = resolve;
      this.rejectStop = reject;

      if (!this.recognition) {
        this.state = 'completed';
        this.cleanUpAudioStream();
        resolve(this.transcript.trim());
        return;
      }

      try {
        this.recognition.stop();
        // Give short grace period for onend or final results
        setTimeout(() => {
          if (this.resolveStop) {
            const finalResult = (this.transcript + ' ' + this.interimTranscript).trim();
            this.state = 'completed';
            this.cleanUpAudioStream();
            this.resolveStop(finalResult);
            this.resolveStop = undefined;
            this.rejectStop = undefined;
          }
        }, 600);
      } catch (err) {
        this.cleanUpAudioStream();
        reject(err);
      }
    });
  }

  cancel(): void {
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch {}
      this.recognition = null;
    }
    this.cleanUpAudioStream();
    this.state = 'idle';
    this.transcript = '';
    this.interimTranscript = '';
  }

  getState(): STTState {
    return this.state;
  }

  getAudioLevel(): number {
    if (!this.analyser || !this.audioDataArray) return 0;
    this.analyser.getByteFrequencyData(this.audioDataArray as any);
    let sum = 0;
    for (let i = 0; i < this.audioDataArray.length; i++) {
      sum += this.audioDataArray[i];
    }
    const average = sum / this.audioDataArray.length;
    return Math.min(1, Math.max(0, average / 128));
  }

  private cleanUpAudioStream(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((t) => t.stop());
      this.mediaStream = null;
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      try {
        this.audioContext.close();
      } catch {}
      this.audioContext = null;
    }
    this.analyser = null;
    this.audioDataArray = null;
  }
}
