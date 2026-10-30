/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Nexovian Academic Voice - Audio Recorder & Uploader
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  Square,
  Pause,
  Play,
  RotateCcw,
  Upload,
  FileAudio,
  AlertCircle,
  CheckCircle2,
  Volume2,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import { AudioRecordingState } from '../../types/academicVoice';
import { SA_LANGUAGES } from '../../data/learningContextData';

interface Props {
  onAudioReady: (audioBlob: Blob, mimeType: string, durationSeconds: number, fileName?: string) => void;
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
  maxMinutes: number;
  isProcessing: boolean;
}

export const AudioRecorderUploader: React.FC<Props> = ({
  onAudioReady,
  selectedLanguage,
  onLanguageChange,
  maxMinutes,
  isProcessing
}) => {
  const [mode, setMode] = useState<'record' | 'upload'>('record');

  // Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Audio Visualizer
  const [audioLevel, setAudioLevel] = useState<number>(0);

  // Upload State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Clean up streams & audio context on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Start live microphone recording
  const handleStartRecording = async () => {
    setErrorMessage(null);
    setRecordedBlob(null);
    setAudioUrl(null);
    audioChunksRef.current = [];
    setDurationSeconds(0);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Microphone audio recording is not supported in this browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      // Visualizer setup
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const audioCtx = new AudioCtx();
        audioContextRef.current = audioCtx;
        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 64;
        source.connect(analyser);
        analyserRef.current = analyser;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const updateLevel = () => {
          if (!analyserRef.current) return;
          analyserRef.current.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const avg = sum / dataArray.length;
          setAudioLevel(Math.min(100, Math.round((avg / 128) * 100)));
          animFrameRef.current = requestAnimationFrame(updateLevel);
        };
        updateLevel();
      }

      // Pick best supported MIME type
      const mimeTypes = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/mp4',
        'audio/ogg;codecs=opus',
        'audio/wav'
      ];
      let selectedMime = '';
      for (const mime of mimeTypes) {
        if (MediaRecorder.isTypeSupported(mime)) {
          selectedMime = mime;
          break;
        }
      }

      const recorder = selectedMime
        ? new MediaRecorder(stream, { mimeType: selectedMime })
        : new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const finalMime = recorder.mimeType || 'audio/webm';
        const blob = new Blob(audioChunksRef.current, { type: finalMime });
        setRecordedBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);

        // Stop media tracks
        stream.getTracks().forEach((track) => track.stop());
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        setAudioLevel(0);

        if (blob.size < 500) {
          setErrorMessage('Recording was too short. Please speak clearly into your microphone.');
        } else {
          onAudioReady(blob, finalMime, durationSeconds);
        }
      };

      recorder.start(300);
      setIsRecording(true);
      setIsPaused(false);

      timerRef.current = setInterval(() => {
        setDurationSeconds((prev) => {
          const next = prev + 1;
          if (next >= maxMinutes * 60) {
            handleStopRecording();
          }
          return next;
        });
      }, 1000);
    } catch (err: any) {
      console.error('Recording start error:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setErrorMessage('Microphone access was denied. Please allow microphone permissions in your browser address bar.');
      } else {
        setErrorMessage(err.message || 'Could not start microphone recording.');
      }
    }
  };

  const handlePauseRecording = () => {
    if (mediaRecorderRef.current && isRecording && !isPaused) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const handleResumeRecording = () => {
    if (mediaRecorderRef.current && isRecording && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      timerRef.current = setInterval(() => {
        setDurationSeconds((prev) => {
          const next = prev + 1;
          if (next >= maxMinutes * 60) {
            handleStopRecording();
          }
          return next;
        });
      }, 1000);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const handleReset = () => {
    handleStopRecording();
    setRecordedBlob(null);
    setAudioUrl(null);
    setDurationSeconds(0);
    setUploadedFile(null);
    setErrorMessage(null);
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Handle Audio File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // File validation: Size limit 25MB
    const maxSizeBytes = 25 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setUploadError(`File size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds the 25MB limit. Please upload a smaller audio clip.`);
      return;
    }

    // File validation: Format check
    const validExtensions = ['.mp3', '.m4a', '.wav', '.webm', '.ogg', '.aac', '.flac'];
    const lowerName = file.name.toLowerCase();
    const hasValidExt = validExtensions.some((ext) => lowerName.endsWith(ext));

    if (!hasValidExt && !file.type.startsWith('audio/')) {
      setUploadError('Unsupported file format. Please upload an MP3, M4A, WAV, WEBM, or AAC recording.');
      return;
    }

    setUploadedFile(file);
    const url = URL.createObjectURL(file);
    setAudioUrl(url);

    // Approximate duration or emit
    const audioObj = new Audio(url);
    audioObj.onloadedmetadata = () => {
      const dur = Math.round(audioObj.duration) || 60;
      setDurationSeconds(dur);
      onAudioReady(file, file.type || 'audio/mpeg', dur, file.name);
    };
    audioObj.onerror = () => {
      // If duration couldn't be loaded, still emit with safe default
      onAudioReady(file, file.type || 'audio/mpeg', 60, file.name);
    };
  };

  return (
    <div className="space-y-5">
      {/* Recording vs Upload Mode Switcher */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => {
              if (!isRecording) {
                setMode('record');
                handleReset();
              }
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              mode === 'record'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Mic className="w-3.5 h-3.5 text-amber-500" />
            <span>Record Voice</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (!isRecording) {
                setMode('upload');
                handleReset();
              }
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              mode === 'upload'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Upload className="w-3.5 h-3.5 text-amber-500" />
            <span>Upload File (MP3, M4A, WAV)</span>
          </button>
        </div>

        {/* Spoken Language Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="spoken-lang" className="text-xs text-slate-400 hidden sm:inline">
            Spoken Language:
          </label>
          <select
            id="spoken-lang"
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            disabled={isRecording || isProcessing}
            className="px-2.5 py-1 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold"
          >
            {SA_LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.nativeName} ({l.name})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Language Capability Notice */}
      {selectedLanguage !== 'en' && (
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-[11px] leading-relaxed">
            <strong>Multilingual Academic Adaptation Active:</strong> You can record your concepts in{' '}
            {SA_LANGUAGES.find((l) => l.code === selectedLanguage)?.name || 'your mother tongue'}. Nexovian will
            transcribe your authentic spoken ideas and synthesize them into a formal tertiary or TVET academic document
            with specialized glossaries and dual-language precision.
          </div>
        </div>
      )}

      {/* MODE 1: DIRECT MICROPHONE RECORDING */}
      {mode === 'record' && (
        <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col items-center justify-center text-center space-y-4">
          {/* Timer Display */}
          <div className="flex items-center gap-2 font-mono text-2xl font-bold text-slate-900 dark:text-white">
            <Clock className={`w-5 h-5 ${isRecording && !isPaused ? 'text-rose-500 animate-pulse' : 'text-slate-400'}`} />
            <span>{formatTime(durationSeconds)}</span>
            <span className="text-xs font-sans text-slate-400 font-normal">
              / max {maxMinutes} mins
            </span>
          </div>

          {/* Visualizer Wave Bar */}
          <div className="w-full max-w-xs h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex items-center">
            <div
              className={`h-full transition-all duration-75 ${
                isRecording && !isPaused
                  ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-amber-400'
                  : 'bg-slate-300 dark:bg-slate-700'
              }`}
              style={{
                width: isRecording && !isPaused ? `${Math.max(8, audioLevel)}%` : '0%'
              }}
            />
          </div>

          {/* Recording Controls */}
          <div className="flex items-center gap-3">
            {!isRecording && !recordedBlob && (
              <button
                type="button"
                onClick={handleStartRecording}
                disabled={isProcessing}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-sm shadow-md transition-all"
              >
                <Mic className="w-4 h-4 text-slate-950" />
                <span>Start Recording</span>
              </button>
            )}

            {isRecording && (
              <>
                {isPaused ? (
                  <button
                    type="button"
                    onClick={handleResumeRecording}
                    className="p-3 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                    title="Resume Recording"
                  >
                    <Play className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePauseRecording}
                    className="p-3 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors"
                    title="Pause Recording"
                  >
                    <Pause className="w-5 h-5" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleStopRecording}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-md transition-all animate-pulse"
                >
                  <Square className="w-4 h-4 fill-white" />
                  <span>Finish & Transcribe</span>
                </button>
              </>
            )}

            {recordedBlob && !isRecording && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Re-record</span>
                </button>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Voice Captured ({formatTime(durationSeconds)})</span>
                </div>
              </div>
            )}
          </div>

          {/* Audio Playback for recorded audio */}
          {audioUrl && (
            <div className="w-full max-w-md pt-2">
              <audio src={audioUrl} controls className="w-full h-8" />
            </div>
          )}

          {errorMessage && (
            <div className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1.5 mt-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <p className="text-[11px] text-slate-400 max-w-md">
            Speak naturally about your assignment, laboratory experiment, research ideas, or TVET workplace task.
            Punctuation, technical citations, and headings will be formatted automatically.
          </p>
        </div>
      )}

      {/* MODE 2: AUDIO FILE UPLOAD */}
      {mode === 'upload' && (
        <div className="p-6 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 flex flex-col items-center justify-center text-center space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*,.mp3,.m4a,.wav,.webm,.ogg,.aac,.flac"
            onChange={handleFileUpload}
            disabled={isProcessing}
            className="hidden"
            id="academic-voice-file-input"
          />

          {!uploadedFile ? (
            <label
              htmlFor="academic-voice-file-input"
              className="flex flex-col items-center cursor-pointer group space-y-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <FileAudio className="w-7 h-7" />
              </div>

              <div>
                <span className="text-sm font-bold text-slate-900 dark:text-white block group-hover:text-amber-600 transition-colors">
                  Choose an audio file from your phone or device
                </span>
                <span className="text-xs text-slate-400 mt-1 block">
                  Supports MP3, M4A, WAV, WEBM, and AAC (up to 25MB)
                </span>
              </div>

              <span className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold shadow-xs">
                Browse Files
              </span>
            </label>
          ) : (
            <div className="space-y-3 w-full max-w-md">
              <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-between text-left">
                <div className="flex items-center gap-3">
                  <FileAudio className="w-5 h-5 text-emerald-600" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block truncate max-w-[200px]">
                      {uploadedFile.name}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB · Duration: {formatTime(durationSeconds)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-semibold text-slate-500 hover:text-rose-600 p-1"
                >
                  Remove
                </button>
              </div>

              {audioUrl && <audio src={audioUrl} controls className="w-full h-8" />}
            </div>
          )}

          {uploadError && (
            <div className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1.5 mt-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
