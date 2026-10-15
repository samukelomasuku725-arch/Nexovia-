import {
  MicrophonePermissionStatus,
  SpeechToTextProvider,
  STTOptions,
  STTState
} from '../types';

export class ServerGeminiSTTProvider implements SpeechToTextProvider {
  readonly id = 'gemini-server';
  readonly name = 'BrightPath Gemini Multimodal Audio';
  readonly description = 'Server-side AI transcription with accurate South African dialect adaptation.';

  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private mediaStream: MediaStream | null = null;
  private state: STTState = 'idle';
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private audioDataArray: Uint8Array | null = null;
  private currentLanguage: string = 'en';

  isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!(
      navigator.mediaDevices &&
      typeof navigator.mediaDevices.getUserMedia === 'function' &&
      typeof MediaRecorder !== 'undefined'
    );
  }

  async checkPermission(): Promise<MicrophonePermissionStatus> {
    if (!this.isSupported()) return 'unsupported';

    if (navigator.permissions?.query) {
      try {
        const status = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        if (status.state === 'granted') return 'granted';
        if (status.state === 'denied') return 'denied';
        return 'prompt';
      } catch {
        return 'prompt';
      }
    }
    return 'prompt';
  }

  async requestPermission(): Promise<boolean> {
    if (!this.isSupported()) return false;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch {
      return false;
    }
  }

  async startRecording(
    options?: STTOptions,
    _onInterimResult?: (transcript: string) => void
  ): Promise<void> {
    if (!this.isSupported()) {
      this.state = 'error';
      throw new Error('Microphone recording is not supported in this environment.');
    }

    this.cancel();
    this.audioChunks = [];
    this.currentLanguage = options?.language || 'en';

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      });

      // Audio analysis for live visualizer
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
        const source = this.audioContext.createMediaStreamSource(this.mediaStream);
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 64;
        source.connect(this.analyser);
        this.audioDataArray = new Uint8Array(this.analyser.frequencyBinCount);
      }

      // Pick best supported mimeType
      const mimeTypes = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/mp4',
        'audio/ogg;codecs=opus',
        'audio/wav'
      ];
      let selectedMimeType = '';
      for (const mime of mimeTypes) {
        if (MediaRecorder.isTypeSupported(mime)) {
          selectedMimeType = mime;
          break;
        }
      }

      this.mediaRecorder = selectedMimeType
        ? new MediaRecorder(this.mediaStream, { mimeType: selectedMimeType })
        : new MediaRecorder(this.mediaStream);

      this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data && event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.start(250); // Slice chunks every 250ms
      this.state = 'listening';
    } catch (err: any) {
      this.state = 'error';
      this.cleanUpStreams();
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        throw new Error('Microphone permission was denied. Please allow microphone access in your browser settings.');
      }
      throw new Error(`Could not access microphone: ${err.message || 'Device error'}`);
    }
  }

  async stopRecording(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder || this.state !== 'listening') {
        this.state = 'idle';
        this.cleanUpStreams();
        resolve('');
        return;
      }

      this.state = 'processing';

      this.mediaRecorder.onstop = async () => {
        try {
          const mimeType = this.mediaRecorder?.mimeType || 'audio/webm';
          const audioBlob = new Blob(this.audioChunks, { type: mimeType });
          this.cleanUpStreams();

          if (audioBlob.size < 500) {
            this.state = 'error';
            reject(new Error('Audio recording too brief. Please hold the microphone and speak your question clearly.'));
            return;
          }

          // Convert Blob to Base64
          const base64Data = await this.blobToBase64(audioBlob);

          // Call server endpoint
          const response = await fetch('/api/ai/transcribe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              audioBase64: base64Data,
              mimeType,
              language: this.currentLanguage
            })
          });

          const data = await response.json();
          if (!response.ok || !data.success) {
            throw new Error(data.message || 'Server transcription failed.');
          }

          this.state = 'completed';
          resolve(data.text || '');
        } catch (err: any) {
          this.state = 'error';
          reject(err);
        }
      };

      try {
        this.mediaRecorder.stop();
      } catch (err) {
        this.cleanUpStreams();
        this.state = 'error';
        reject(err);
      }
    });
  }

  cancel(): void {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      try {
        this.mediaRecorder.stop();
      } catch {}
    }
    this.cleanUpStreams();
    this.audioChunks = [];
    this.state = 'idle';
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

  private cleanUpStreams(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
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
    this.mediaRecorder = null;
  }

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        // strip data:*/*;base64, if present
        const base64 = result.includes(',') ? result.split(',')[1] : result;
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}
