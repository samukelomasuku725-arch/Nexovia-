/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Nexovian Xitsonga Language Engine - Admin Audio & Pronunciation Hub (Phase 2)
 * 
 * CORE ADMIN RULES:
 * 1. Only authorized administrators (ADMIN, SUPER_ADMIN, CURRICULUM_ADMIN) can upload/modify.
 * 2. Supported formats: MP3, WAV, M4A (or live microphone capture).
 * 3. AI-generated voice rule: AI-generated speech MUST NEVER automatically receive
 *    audioStatus = "verified". It must remain "pending_verification".
 * 4. Learners have read-only access.
 */

import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Mic,
  Square,
  Play,
  Pause,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Loader2,
  Sparkles,
  FileAudio
} from 'lucide-react';
import { LanguageRecord, AudioStatus, PronunciationStatus, VoiceSource } from '../../types/language';
import { languageEngine } from '../../services/language/languageEngine';
import { useAuth } from '../../context/AuthContext';

export interface AdminAudioUploadModalProps {
  phrase: LanguageRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved?: (updatedPhrase: LanguageRecord) => void;
}

export const AdminAudioUploadModal: React.FC<AdminAudioUploadModalProps> = ({
  phrase,
  isOpen,
  onClose,
  onSaved
}) => {
  const { user } = useAuth();

  const [audioUrl, setAudioUrl] = useState<string>('');
  const [audioStatus, setAudioStatus] = useState<AudioStatus>('pending_verification');
  const [voiceSource, setVoiceSource] = useState<VoiceSource>('native_speaker');
  const [pronunciation, setPronunciation] = useState<string>('');
  const [pronunciationStatus, setPronunciationStatus] = useState<PronunciationStatus>('pending_verification');

  // Audio preview playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPreviewRef = useRef<HTMLAudioElement | null>(null);

  // Live recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Sync state with phrase when opened
  React.useEffect(() => {
    if (phrase) {
      setAudioUrl(phrase.audioUrl || '');
      setAudioStatus(phrase.audioStatus || 'unavailable');
      setVoiceSource(phrase.voiceSource || 'native_speaker');
      setPronunciation(phrase.pronunciation || '');
      setPronunciationStatus(phrase.pronunciationStatus || 'unavailable');
      setStatusMessage(null);
      setIsPlaying(false);
    }
  }, [phrase, isOpen]);

  const isAdmin = React.useMemo(() => {
    const role = (user?.role || '').toUpperCase();
    return role === 'ADMIN' || role === 'SUPER_ADMIN' || role === 'CURRICULUM_ADMIN';
  }, [user]);

  if (!isOpen || !phrase) return null;

  // Handle file upload (MP3, WAV, M4A)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['audio/mp3', 'audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/m4a', 'audio/x-m4a', 'audio/webm', 'audio/ogg'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(mp3|wav|m4a|webm|ogg)$/i)) {
      setStatusMessage({
        text: 'Unsupported audio format. Please upload MP3, WAV, or M4A.',
        isError: true
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setAudioUrl(dataUrl);
      if (audioStatus === 'unavailable') {
        setAudioStatus('pending_verification');
      }
      setStatusMessage({
        text: `Audio file "${file.name}" loaded successfully.`,
        isError: false
      });
    };
    reader.readAsDataURL(file);
  };

  // Live mic recording for native speakers
  const handleStartLiveRecord = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const chunks: Blob[] = [];
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          setAudioUrl(reader.result as string);
          if (audioStatus === 'unavailable') {
            setAudioStatus('pending_verification');
          }
        };
        reader.readAsDataURL(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((s) => s + 1);
      }, 1000);
    } catch (err: any) {
      setStatusMessage({
        text: `Microphone access failed: ${err.message}`,
        isError: true
      });
    }
  };

  const handleStopLiveRecord = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    }
  };

  // Toggle playback preview
  const handleTogglePreview = () => {
    if (!audioUrl) return;

    if (!audioPreviewRef.current) {
      const audio = new Audio(audioUrl);
      audioPreviewRef.current = audio;
      audio.addEventListener('ended', () => setIsPlaying(false));
      audio.addEventListener('error', () => {
        setIsPlaying(false);
        setStatusMessage({ text: 'Preview error.', isError: true });
      });
    }

    if (isPlaying) {
      audioPreviewRef.current.pause();
      setIsPlaying(false);
    } else {
      audioPreviewRef.current.currentTime = 0;
      audioPreviewRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  // Delete audio
  const handleDeleteAudio = () => {
    if (!isAdmin) {
      setStatusMessage({ text: 'Unauthorized.', isError: true });
      return;
    }

    const res = languageEngine.adminDeleteAudio(phrase.id, {
      role: user?.role,
      email: user?.email
    });

    if (res.success && res.data) {
      setAudioUrl('');
      setAudioStatus('unavailable');
      setStatusMessage({ text: 'Audio recording deleted successfully.', isError: false });
      if (onSaved) onSaved(res.data);
    } else {
      setStatusMessage({ text: res.error || 'Failed to delete audio.', isError: true });
    }
  };

  // Save changes
  const handleSave = () => {
    if (!isAdmin) {
      setStatusMessage({
        text: 'Access Denied: Only authorized Nexovian administrators can modify audio records.',
        isError: true
      });
      return;
    }

    // STRICT PHASE 2 RULE: AI voice can never be marked verified
    let safeAudioStatus = audioStatus;
    if (voiceSource === 'ai_generated' && safeAudioStatus === 'verified') {
      safeAudioStatus = 'pending_verification';
      setStatusMessage({
        text: 'Anti-Hallucination Policy: AI-generated voice cannot receive "verified" status. Set to "pending_verification".',
        isError: true
      });
    }

    setSaving(true);

    try {
      // 1. Update audio
      let currentRecord = phrase;
      if (audioUrl) {
        const audioRes = languageEngine.adminUpdateAudio(
          phrase.id,
          {
            audioUrl,
            audioStatus: safeAudioStatus,
            voiceSource
          },
          { role: user?.role, email: user?.email }
        );
        if (audioRes.data) currentRecord = audioRes.data;
      }

      // 2. Update pronunciation
      const pronRes = languageEngine.adminUpdatePronunciation(
        phrase.id,
        {
          pronunciation,
          pronunciationStatus
        },
        { role: user?.role, email: user?.email }
      );
      if (pronRes.data) currentRecord = pronRes.data;

      setSaving(false);
      setStatusMessage({ text: 'Audio and pronunciation updated successfully.', isError: false });

      if (onSaved) onSaved(currentRecord);
      setTimeout(() => onClose(), 1200);
    } catch (err: any) {
      setSaving(false);
      setStatusMessage({ text: err.message || 'Error saving changes.', isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold">
              <FileAudio className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Pronunciation & Audio Management
              </h3>
              <p className="text-[11px] text-slate-400">
                Authorized Administrator Portal · Phase 2
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Security Warning if not admin */}
        {!isAdmin && (
          <div className="m-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-3">
            <Lock className="w-5 h-5 shrink-0 text-rose-600" />
            <div>
              <strong className="block font-semibold">Access Denied (Read-Only)</strong>
              <span>Normal learners cannot modify pronunciation recordings. Only curriculum administrators have authorization.</span>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Target Phrase Badge */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Phrase ({phrase.category})
            </span>
            <div className="text-lg font-bold text-slate-900 dark:text-white">
              {phrase.xitsonga || <span className="text-amber-500 italic">No Xitsonga translation stored</span>}
            </div>
            <div className="text-xs text-slate-500">"{phrase.english}"</div>
          </div>

          {/* Feedback message */}
          {statusMessage && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                statusMessage.isError
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200'
              }`}
            >
              {statusMessage.isError ? (
                <AlertTriangle className="w-4 h-4 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* SECTION 1: Audio Recording (File Upload or Mic) */}
          <div className="space-y-3 pt-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              1. Audio Recording (MP3, WAV, M4A)
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* File upload trigger */}
              <label className="min-h-[48px] px-3 py-2.5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 cursor-pointer transition-colors text-center">
                <Upload className="w-4 h-4 text-slate-500" />
                <span>Upload File (MP3/WAV/M4A)</span>
                <input
                  type="file"
                  accept="audio/*,.mp3,.wav,.m4a"
                  onChange={handleFileChange}
                  disabled={!isAdmin}
                  className="hidden"
                />
              </label>

              {/* Record live mic */}
              {!isRecording ? (
                <button
                  type="button"
                  onClick={handleStartLiveRecord}
                  disabled={!isAdmin}
                  className="min-h-[48px] px-3 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Mic className="w-4 h-4" />
                  <span>Record from Mic</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStopLiveRecord}
                  className="min-h-[48px] px-3 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors animate-pulse"
                >
                  <Square className="w-4 h-4 fill-current" />
                  <span>Stop Recording ({recordingSeconds}s)</span>
                </button>
              )}
            </div>

            {/* Audio Preview Strip if audio is loaded */}
            {audioUrl && (
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleTogglePreview}
                    className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center transition-all active:scale-95"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    )}
                  </button>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                    Audio Loaded ({audioUrl.startsWith('data:') ? 'Recording / Data URI' : 'Stream URL'})
                  </span>
                </div>

                {isAdmin && (
                  <button
                    type="button"
                    onClick={handleDeleteAudio}
                    title="Delete audio recording"
                    className="w-8 h-8 rounded-lg text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-950 flex items-center justify-center transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* SECTION 2: Voice Source & Safe Verification Policy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Voice Source
              </label>
              <select
                value={voiceSource}
                onChange={(e) => {
                  const val = e.target.value as VoiceSource;
                  setVoiceSource(val);
                  // Strict invariant: AI voice cannot be marked verified
                  if (val === 'ai_generated' && audioStatus === 'verified') {
                    setAudioStatus('pending_verification');
                  }
                }}
                disabled={!isAdmin}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white"
              >
                <option value="native_speaker">Native Speaker Recording</option>
                <option value="curriculum_specialist">Curriculum Specialist</option>
                <option value="ai_generated">AI-Generated Voice (Cannot be auto-verified)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Audio Status
              </label>
              <select
                value={audioStatus}
                onChange={(e) => setAudioStatus(e.target.value as AudioStatus)}
                disabled={!isAdmin || voiceSource === 'ai_generated'}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white"
              >
                <option value="unavailable">Unavailable</option>
                <option value="pending_verification">Pending Verification</option>
                <option value="verified">Verified (Native Approved)</option>
              </select>
              {voiceSource === 'ai_generated' && (
                <span className="text-[10px] text-amber-500 block mt-1">
                  AI voice locked to "Pending Verification"
                </span>
              )}
            </div>
          </div>

          {/* SECTION 3: Pronunciation Guide */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              2. Verified Pronunciation Guide (Phonetic / Written)
            </label>
            <input
              type="text"
              value={pronunciation}
              onChange={(e) => setPronunciation(e.target.value)}
              placeholder="e.g. 'Rhee ksee-leh' (Leave empty if unverified!)"
              disabled={!isAdmin}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 font-mono"
            />

            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                Pronunciation Status
              </label>
              <select
                value={pronunciationStatus}
                onChange={(e) => setPronunciationStatus(e.target.value as PronunciationStatus)}
                disabled={!isAdmin}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white"
              >
                <option value="unavailable">Unavailable (Do Not Display)</option>
                <option value="pending_verification">Pending Native Verification</option>
                <option value="verified">Verified (Approved for Display)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Cancel
          </button>

          {isAdmin && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center gap-2 active:scale-95 transition-all"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              <span>Save & Publish</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
