import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Volume2,
  Mic,
  Settings2,
  Check,
  Globe,
  Sliders,
  AlertCircle,
  HelpCircle,
  Play,
  Square,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { ttsManager } from '../../services/voice/tts/TextToSpeechManager';
import { sttManager } from '../../services/voice/stt/SpeechToTextManager';
import { SA_LANGUAGE_CAPABILITIES } from '../../services/voice/languageCapabilities';
import { STTProviderType, TTSProviderType } from '../../services/voice/types';
import { SALanguageCode } from '../../types';

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeLanguage: SALanguageCode;
  onSelectLanguage?: (lang: SALanguageCode) => void;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({
  isOpen,
  onClose,
  activeLanguage,
  onSelectLanguage
}) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'matrix' | 'test'>('settings');
  const [autoPlay, setAutoPlay] = useState<boolean>(ttsManager.getAutoPlayAnswers());
  const [speechRate, setSpeechRateState] = useState<number>(ttsManager.getSpeechRate());
  const [speechPitch, setSpeechPitchState] = useState<number>(ttsManager.getSpeechPitch());
  const [sttProvider, setSttProvider] = useState<STTProviderType>(sttManager.getProviderPreference());
  const [ttsProvider, setTtsProvider] = useState<TTSProviderType>(ttsManager.getProviderPreference());

  // Mic test state
  const [isTestingMic, setIsTestingMic] = useState(false);
  const [testAudioLevel, setTestAudioLevel] = useState(0);
  const [testTranscript, setTestTranscript] = useState('');
  const [testStatus, setTestStatus] = useState<string>('Press "Start Mic Test" and speak into your microphone.');
  const testIntervalRef = useRef<any>(null);

  useEffect(() => {
    setAutoPlay(ttsManager.getAutoPlayAnswers());
    setSpeechRateState(ttsManager.getSpeechRate());
    setSpeechPitchState(ttsManager.getSpeechPitch());
    setSttProvider(sttManager.getProviderPreference());
    setTtsProvider(ttsManager.getProviderPreference());
  }, [isOpen]);

  // Clean up mic test on close
  useEffect(() => {
    if (!isOpen) {
      if (isTestingMic) {
        sttManager.cancel();
        setIsTestingMic(false);
      }
      if (testIntervalRef.current) clearInterval(testIntervalRef.current);
    }
  }, [isOpen, isTestingMic]);

  if (!isOpen) return null;

  const handleToggleAutoPlay = () => {
    const next = !autoPlay;
    setAutoPlay(next);
    ttsManager.setAutoPlayAnswers(next);
  };

  const handleSpeechRateChange = (rate: number) => {
    setSpeechRateState(rate);
    ttsManager.setSpeechRate(rate);
  };

  const handleSpeechPitchChange = (pitch: number) => {
    setSpeechPitchState(pitch);
    ttsManager.setSpeechPitch(pitch);
  };

  const handleSttProviderChange = (provider: STTProviderType) => {
    setSttProvider(provider);
    sttManager.setProviderPreference(provider);
  };

  const handleTtsProviderChange = (provider: TTSProviderType) => {
    setTtsProvider(provider);
    ttsManager.setProviderPreference(provider);
  };

  const handleTestAudioSample = () => {
    ttsManager.speakMessage(
      'sample-test',
      'Welcome to Nexovia Academy. Your voice-learning system is calibrated and ready.',
      activeLanguage === 'af' ? 'af' : 'en'
    );
  };

  const handleStartMicTest = async () => {
    setIsTestingMic(true);
    setTestTranscript('');
    setTestStatus('Listening... Speak a sentence into your microphone now.');

    testIntervalRef.current = setInterval(() => {
      setTestAudioLevel(sttManager.getAudioLevel());
    }, 80);

    try {
      await sttManager.startRecording(
        { language: activeLanguage, interimResults: true },
        (interim) => {
          setTestTranscript(interim);
        }
      );
    } catch (err: any) {
      setIsTestingMic(false);
      if (testIntervalRef.current) clearInterval(testIntervalRef.current);
      setTestStatus(`Microphone test failed: ${err.message || 'Permission denied'}`);
    }
  };

  const handleStopMicTest = async () => {
    if (!isTestingMic) return;
    setTestStatus('Analyzing recorded speech...');
    try {
      const finalResult = await sttManager.stopRecording();
      setIsTestingMic(false);
      if (testIntervalRef.current) clearInterval(testIntervalRef.current);
      setTestAudioLevel(0);
      setTestTranscript(finalResult || 'No speech captured. Try speaking closer to the microphone.');
      setTestStatus('Microphone test complete! Your voice input is operational.');
    } catch (err: any) {
      setIsTestingMic(false);
      if (testIntervalRef.current) clearInterval(testIntervalRef.current);
      setTestStatus(`Transcription test error: ${err.message}`);
    }
  };

  const languagesList = Object.values(SA_LANGUAGE_CAPABILITIES);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl text-slate-900 dark:text-white overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">Voice Learning Configuration</h2>
              <p className="text-xs text-slate-500">
                Speech-to-Text & Text-to-Speech settings for Nexovia Academy
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-4 pt-2 gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'settings'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Voice Controls</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('matrix')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'matrix'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>11 Languages Capabilities</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('test')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'test'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Mic & Audio Diagnostic</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {/* TAB 1: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Auto-Play Responses Toggle */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    Auto-Play AI Responses
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Automatically read tutor answers aloud when using English or Afrikaans. Kept off by default to preserve battery and avoid unexpected audio playback in public spaces.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleToggleAutoPlay}
                  className={`w-12 h-6 rounded-full transition-colors relative shrink-0 focus:outline-none ${
                    autoPlay ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                  aria-label="Toggle auto play"
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                      autoPlay ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Speech Speed / Rate Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-800 dark:text-slate-200">
                    Speech Playback Rate
                  </label>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                    {speechRate}x
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[0.75, 1.0, 1.25, 1.5].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => handleSpeechRateChange(rate)}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                        speechRate === rate
                          ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {rate === 1.0 ? '1.0x (Normal)' : `${rate}x`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Speech Pitch Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-800 dark:text-slate-200">
                    Vocal Pitch Tone
                  </label>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                    {speechPitch === 1.0 ? 'Standard' : speechPitch < 1.0 ? 'Lower' : 'Higher'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { pitch: 0.85, label: 'Deep / Warm' },
                    { pitch: 1.0, label: 'Standard Tone' },
                    { pitch: 1.15, label: 'Clear / Bright' }
                  ].map((p) => (
                    <button
                      key={p.pitch}
                      type="button"
                      onClick={() => handleSpeechPitchChange(p.pitch)}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                        speechPitch === p.pitch
                          ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Speech-to-Text Provider Preference */}
              <div className="space-y-2">
                <label className="font-semibold text-slate-800 dark:text-slate-200 block">
                  Speech-to-Text Recognition Engine
                </label>
                <div className="space-y-2">
                  {[
                    {
                      id: 'auto' as STTProviderType,
                      title: 'Automatic Selection (Recommended)',
                      desc: 'Uses device-native Web Speech recognition when available, with automatic fallback to Gemini Multimodal Audio.'
                    },
                    {
                      id: 'webspeech' as STTProviderType,
                      title: 'Browser Web Speech API',
                      desc: 'Runs directly in-browser on Chrome, Edge, Safari, and Android with zero latency.'
                    },
                    {
                      id: 'gemini-server' as STTProviderType,
                      title: 'Nexovia Gemini Multimodal Audio',
                      desc: 'Sends audio to server-side Gemini AI for high-accuracy South African dialect recognition.'
                    }
                  ].map((p) => (
                    <label
                      key={p.id}
                      onClick={() => handleSttProviderChange(p.id)}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        sttProvider === p.id
                          ? 'border-amber-500 bg-amber-500/5 dark:bg-amber-500/10'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="sttProvider"
                        checked={sttProvider === p.id}
                        onChange={() => handleSttProviderChange(p.id)}
                        className="mt-1 text-amber-500 focus:ring-amber-400"
                      />
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">{p.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{p.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Audio test playback button */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-500">Test audio narration output:</span>
                <button
                  type="button"
                  onClick={handleTestAudioSample}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-700 dark:text-slate-300 rounded-xl font-semibold transition-colors text-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Play Sample Audio</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: 11 SA LANGUAGES CAPABILITY MATRIX */}
          {activeTab === 'matrix' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 leading-relaxed flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Strict Capability Verification:</strong> All 11 official South African languages feature rich curriculum translations and text explanations. Spoken input (Speech-to-Text) is supported across all languages. Voice audio output (Text-to-Speech) is enabled for English and Afrikaans where high-quality voice models are present on standard consumer devices.
                </div>
              </div>

              <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                      <tr>
                        <th className="py-2.5 px-3">Language</th>
                        <th className="py-2.5 px-3 text-center">Text Curriculum</th>
                        <th className="py-2.5 px-3 text-center">Voice Input (STT)</th>
                        <th className="py-2.5 px-3 text-center">Audio Readout (TTS)</th>
                        <th className="py-2.5 px-3">Dialect & Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {languagesList.map((lang) => {
                        const isCurrent = lang.code === activeLanguage;
                        return (
                          <tr
                            key={lang.code}
                            className={`transition-colors ${
                              isCurrent ? 'bg-amber-500/10 font-medium' : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                            }`}
                          >
                            <td className="py-2.5 px-3">
                              <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                                {lang.name}
                                {isCurrent && (
                                  <span className="text-[9px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.5 rounded-full">
                                    Active
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-slate-400">{lang.nativeName}</div>
                            </td>

                            {/* Text */}
                            <td className="py-2.5 px-3 text-center">
                              <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                                ✓ Yes
                              </span>
                            </td>

                            {/* STT */}
                            <td className="py-2.5 px-3 text-center">
                              <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                                ✓ {lang.speechToText ? 'Yes' : 'AI'}
                              </span>
                            </td>

                            {/* TTS */}
                            <td className="py-2.5 px-3 text-center">
                              {lang.textToSpeech ? (
                                <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                                  ✓ Enabled
                                </span>
                              ) : (
                                <span className="inline-flex items-center text-slate-400 font-medium text-[11px]">
                                  Text only
                                </span>
                              )}
                            </td>

                            {/* Status */}
                            <td className="py-2.5 px-3 text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                              <div className="font-mono text-[10px] text-slate-700 dark:text-slate-300">
                                {lang.sttDialect}
                              </div>
                              <div>{lang.textToSpeech ? 'Full Voice & Text' : 'Text explanation on screen'}</div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MIC & AUDIO DIAGNOSTIC TEST */}
          {activeTab === 'test' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      Live Microphone Diagnostic
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Verify that your microphone captures clear sound waves and converts words to text.
                    </p>
                  </div>
                  {!isTestingMic ? (
                    <button
                      type="button"
                      onClick={handleStartMicTest}
                      className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow transition-colors"
                    >
                      <Mic className="w-4 h-4" />
                      <span>Start Mic Test</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleStopMicTest}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow transition-colors"
                    >
                      <Square className="w-4 h-4 fill-current" />
                      <span>Finish & Transcribe</span>
                    </button>
                  )}
                </div>

                {/* Live VU Meter */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Input Volume Level (VU Meter)</span>
                    <span className="font-mono">{Math.round(testAudioLevel * 100)}%</span>
                  </div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 rounded-full transition-all duration-75"
                      style={{ width: `${Math.min(100, Math.max(testAudioLevel * 100, isTestingMic ? 5 : 0))}%` }}
                    />
                  </div>
                </div>

                {/* Status text */}
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                  <div className="font-semibold text-slate-700 dark:text-slate-300">Diagnostic Status:</div>
                  <div className="mt-1 text-slate-500 leading-relaxed">{testStatus}</div>
                  {testTranscript && (
                    <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200">
                      <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 block mb-0.5">
                        Transcribed Speech:
                      </span>
                      <p className="italic font-medium">"{testTranscript}"</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Tips for Best Recording */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1.5 text-slate-500">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                  Best Practices for South African Learners:
                </span>
                <p>• Hold your phone 15–20cm from your mouth when speaking.</p>
                <p>• Speak in your normal tone of voice — no need to shout.</p>
                <p>• You can speak in any of the 11 official languages; make sure your preferred language is selected in the tutor bar.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-400">
            Nexovia Voice Learning · Phase 4
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 font-bold rounded-xl text-xs transition-colors shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
