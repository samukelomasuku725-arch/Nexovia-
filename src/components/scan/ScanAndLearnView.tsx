/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * PHASE 3: SCAN & LEARN + IMAGE UNDERSTANDING COMPONENT
 * 
 * Full mobile-first interface allowing learners to:
 * 1. Capture photos using device camera
 * 2. Upload images from gallery (JPEG, PNG, WebP)
 * 3. Inspect image preview, rotate/replace, and specify questions
 * 4. Choose from 7 Scan Modes (Explain, Solve With Me, Simplify, Translate, Summarize, Practice, Quiz Me)
 * 5. Adapt to 11 official South African languages and learner grade level
 * 6. Send securely to server-side Google Gemini multimodal vision
 * 7. Provide clarity evaluation (with actionable retake advice for blurry/cropped photos)
 * 8. Multi-turn follow-up chat with image context preserved
 * 9. Interactive Practice & Quiz question player
 * 10. Persistent library saving and review of previous scan sessions
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  Image as ImageIcon,
  Sparkles,
  RefreshCw,
  Trash2,
  Send,
  HelpCircle,
  BookOpen,
  Check,
  Copy,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ChevronDown,
  Layers,
  History,
  X,
  Maximize2,
  FileCheck,
  Bookmark,
  Share2,
  SlidersHorizontal,
  GraduationCap
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useTranslation } from '../../i18n/I18nContext';
import { ScanMode, SALanguageCode, ScanSession, GeneratedQuizQuestion } from '../../types';
import { SAMPLE_SCANS, SampleScanItem } from '../../data/sampleScansData';
import { VoiceInputButton } from '../voice/VoiceInputButton';
import { MessageAudioControls } from '../voice/MessageAudioControls';
import { SA_LANGUAGES } from '../../data/learningContextData';
import { CleanFormulaRenderer } from '../common/CleanFormulaRenderer';
import { cleanFormulaString } from '../../utils/formulaCleaner';

const SCAN_MODES: { id: ScanMode; label: string; desc: string; icon: string }[] = [
  { id: 'explain', label: 'Explain', desc: 'Break down visible concepts, diagrams, and steps.', icon: '💡' },
  { id: 'solve_with_me', label: 'Solve With Me', desc: 'Step-by-step Socratic teaching method.', icon: '✍️' },
  { id: 'simplify', label: 'Simplify', desc: 'Simple words and everyday SA analogies.', icon: '🌱' },
  { id: 'translate', label: 'Translate', desc: 'Translate visible material to your language.', icon: '🌐' },
  { id: 'summarize', label: 'Summarize', desc: 'High-yield revision notes and formulas.', icon: '📝' },
  { id: 'practice', label: 'Practice', desc: 'Generate practice problems from this scan.', icon: '🎯' },
  { id: 'quiz_me', label: 'Quiz Me', desc: 'Interactive quiz based on scanned material.', icon: '⚡' }
];

const SUGGESTED_QUESTIONS = [
  'What does this mean?',
  'Explain this step by step.',
  'Help me solve this.',
  'Translate this.',
  'Give me practice questions.'
];

export const ScanAndLearnView: React.FC = () => {
  const {
    learningContext,
    updateLearningContext,
    analyzeScannedImage,
    sendScanFollowUp,
    saveScanSession,
    deleteScanSession,
    scanSessions,
    activeScanSession,
    setActiveScanSession,
    isScanLoading,
    scanError,
    clearScanError,
    geminiStatus,
    checkGeminiStatus,
    saveLearningItem
  } = useLearning();

  const { t, language: currentLang, setLanguage } = useTranslation();

  // Local state for image intake
  const [selectedImageBase64, setSelectedImageBase64] = useState<string | null>(null);
  const [selectedMimeType, setSelectedMimeType] = useState<string>('image/jpeg');
  const [selectedMode, setSelectedMode] = useState<ScanMode>('explain');
  const [userQuestion, setUserQuestion] = useState<string>('Explain what is shown in this image.');
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraPermissionError, setCameraPermissionError] = useState<string | null>(null);
  const [showHistoryDrawer, setShowHistoryDrawer] = useState<boolean>(false);
  const [copiedExplanation, setCopiedExplanation] = useState<boolean>(false);
  const [followUpInput, setFollowUpInput] = useState<string>('');
  const [activeQuizAnswers, setActiveQuizAnswers] = useState<Record<string, string>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [imageZoomOpen, setImageZoomOpen] = useState<boolean>(false);

  // Video and canvas refs for live camera
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Sync activeScanSession with local image if available
  useEffect(() => {
    if (activeScanSession && !selectedImageBase64) {
      setSelectedImageBase64(activeScanSession.imageUrl || activeScanSession.thumbnail || null);
      setSelectedMimeType(activeScanSession.mimeType || 'image/jpeg');
      setSelectedMode(activeScanSession.mode);
      setUserQuestion(activeScanSession.initialQuestion);
    }
  }, [activeScanSession]);

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  // Scroll to bottom of follow-up chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeScanSession?.messages]);

  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // Start live webcam / mobile camera viewfinder
  const startCamera = async () => {
    setCameraPermissionError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        // Fallback directly to native input capture
        cameraInputRef.current?.click();
        return;
      }

      // Try environment (back) camera first on mobile
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });

      streamRef.current = stream;
      setIsCameraActive(true);

      // Attach to video element
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
      }, 100);
    } catch (err: any) {
      console.warn('Camera access error:', err);
      stopCameraStream();
      const errMsg = err?.name === 'NotAllowedError' || err?.name === 'PermissionDeniedError'
        ? 'Camera permission was denied. You can take a photo with your device app or select from your gallery.'
        : 'Live camera is unavailable in this environment. Please choose an image from your device gallery.';
      setCameraPermissionError(errMsg);
      // Automatically trigger native input fallback on user intent
      cameraInputRef.current?.click();
    }
  };

  // Capture snapshot from active video stream
  const captureSnapshot = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

    setSelectedImageBase64(dataUrl);
    setSelectedMimeType('image/jpeg');
    stopCameraStream();
    clearScanError();
  };

  // Handle file uploads (Gallery or native camera input)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate MIME types: JPEG, PNG, WebP
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowed.includes(file.type.toLowerCase())) {
      alert('Please upload a supported image format: JPEG, PNG, or WebP.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setSelectedImageBase64(result);
      setSelectedMimeType(file.type || 'image/jpeg');
      stopCameraStream();
      clearScanError();
    };
    reader.readAsDataURL(file);
    // Reset file input so same file can be re-selected if desired
    e.target.value = '';
  };

  // Select sample scan for testing
  const handleSelectSample = (sample: SampleScanItem) => {
    setSelectedImageBase64(sample.svgDataUri);
    setSelectedMimeType('image/svg+xml');
    setSelectedMode(sample.suggestedMode);
    setUserQuestion(sample.suggestedQuestion);
    updateLearningContext({
      gradeOrProgramme: sample.grade,
      subject: sample.subject,
      topic: sample.topic
    });
    stopCameraStream();
    clearScanError();
  };

  // Remove current image
  const handleRemoveImage = () => {
    setSelectedImageBase64(null);
    setActiveScanSession(null);
    stopCameraStream();
    clearScanError();
    setActiveQuizAnswers({});
    setIsQuizSubmitted(false);
  };

  // Submit scan for AI analysis
  const handleScanSubmit = async (modeOverride?: ScanMode, questionOverride?: string) => {
    if (!selectedImageBase64) return;
    const activeMode = modeOverride || selectedMode;
    const activeQ = questionOverride || userQuestion;

    try {
      const session = await analyzeScannedImage({
        imageBase64: selectedImageBase64,
        mimeType: selectedMimeType,
        question: activeQ,
        mode: activeMode,
        educationLevel: learningContext.educationLevel,
        gradeOrProgramme: learningContext.gradeOrProgramme,
        subject: learningContext.subject,
        module: learningContext.module,
        topic: learningContext.topic,
        language: learningContext.language
      });
      setActiveQuizAnswers({});
      setIsQuizSubmitted(false);
    } catch (err) {
      // Error handled in context state
    }
  };

  // Handle follow-up chat submit
  const handleFollowUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpInput.trim() || !activeScanSession) return;
    const q = followUpInput.trim();
    setFollowUpInput('');

    try {
      await sendScanFollowUp(
        activeScanSession.id,
        q,
        selectedImageBase64 || undefined,
        selectedMimeType
      );
    } catch (err) {
      // Handled in context
    }
  };

  const handleCopyExplanation = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedExplanation(true);
    setTimeout(() => setCopiedExplanation(false), 2000);
  };

  // Quiz submission
  const handleQuizSubmit = (quiz: { questions: GeneratedQuizQuestion[] }) => {
    let score = 0;
    quiz.questions.forEach((q) => {
      const userAns = activeQuizAnswers[q.id];
      if (userAns && userAns.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) {
        score++;
      }
    });
    setQuizScore(score);
    setIsQuizSubmitted(true);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Top Banner & Header */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-14 md:top-16 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-xs">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  Scan & Learn
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300">
                  Multimodal Gemini AI
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Snap textbook pages, diagrams, or homework to understand in 11 SA languages.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Review Past Scans Button */}
            <button
              onClick={() => setShowHistoryDrawer(!showHistoryDrawer)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
            >
              <History className="w-3.5 h-3.5" />
              <span>Past Scans ({scanSessions.length})</span>
            </button>

            {/* Clear / New Scan */}
            {selectedImageBase64 && (
              <button
                onClick={handleRemoveImage}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors border border-rose-200 dark:border-rose-900/60"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>New Scan</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Image Capture, Preview & Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* CAMERA / IMAGE UPLOAD CARD */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            {/* Mode 1: Live Viewfinder */}
            {isCameraActive ? (
              <div className="relative bg-black aspect-4/3 flex flex-col justify-between">
                <video
                  ref={videoRef}
                  playsInline
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                />
                {/* Viewfinder Target Reticle */}
                <div className="absolute inset-8 border-2 border-amber-400/80 rounded-xl pointer-events-none flex flex-col justify-between p-2">
                  <div className="flex justify-between text-[10px] text-amber-300 font-mono">
                    <span>TOP ALIGN</span>
                    <span>HD 1080P</span>
                  </div>
                  <div className="text-center text-[10px] text-amber-300 font-mono bg-black/40 py-0.5 rounded">
                    Position textbook page or diagram inside frame
                  </div>
                </div>

                {/* Camera Action Bar */}
                <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4 px-4">
                  <button
                    onClick={stopCameraStream}
                    className="p-3 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md transition-colors"
                    title="Cancel camera"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <button
                    onClick={captureSnapshot}
                    className="w-16 h-16 rounded-full bg-amber-400 border-4 border-white text-slate-950 flex items-center justify-center font-bold shadow-lg hover:scale-105 active:scale-95 transition-transform"
                    title="Take Photo"
                  >
                    <div className="w-5 h-5 rounded-full bg-slate-950" />
                  </button>
                </div>
              </div>
            ) : selectedImageBase64 ? (
              /* Mode 2: Selected Image Preview */
              <div className="relative bg-slate-950 aspect-4/3 flex items-center justify-center overflow-hidden group">
                <img
                  src={selectedImageBase64}
                  alt="Scanned Educational Document"
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={() => setImageZoomOpen(true)}
                />

                {/* Floating Preview Controls */}
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setImageZoomOpen(true)}
                    className="p-1.5 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg backdrop-blur-xs transition-colors shadow-sm"
                    title="Full view"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-1.5 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg backdrop-blur-xs transition-colors shadow-sm"
                    title="Replace Image"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleRemoveImage}
                    className="p-1.5 bg-rose-600/90 hover:bg-rose-600 text-white rounded-lg backdrop-blur-xs transition-colors shadow-sm"
                    title="Remove Image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/60 backdrop-blur-xs text-[11px] text-white font-mono">
                  {selectedMimeType.replace('image/', '').toUpperCase()} · Tap to zoom
                </div>
              </div>
            ) : (
              /* Mode 3: Empty State Intake (Take Photo or Choose Gallery) */
              <div className="p-6 sm:p-8 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 border border-amber-200 dark:border-amber-800/60 shadow-xs">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Add Learning Material to Scan
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm">
                  Snap a photo of your textbook, past paper question, circuit diagram, or handwritten problem.
                </p>

                {/* Primary Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full">
                  <button
                    onClick={startCamera}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-sm transition-all active:scale-95"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Take Photo</span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold rounded-xl text-xs sm:text-sm transition-colors border border-slate-200 dark:border-slate-700"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Choose from Gallery</span>
                  </button>
                </div>

                {/* Android Permission Feedback */}
                {cameraPermissionError && (
                  <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-left flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-900 dark:text-amber-200">
                      <p className="font-semibold">{cameraPermissionError}</p>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-1 text-amber-700 dark:text-amber-300 underline font-bold"
                      >
                        Click here to browse gallery or files
                      </button>
                    </div>
                  </div>
                )}

                {/* Try Sample Educational Scans */}
                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80 w-full text-left">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Or Test Drive a Sample Problem:
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {SAMPLE_SCANS.map((sample) => (
                      <button
                        key={sample.id}
                        onClick={() => handleSelectSample(sample)}
                        className="w-full px-3 py-2 rounded-xl text-left bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 transition-colors flex items-center justify-between text-xs"
                      >
                        <div className="truncate mr-2">
                          <span className="font-semibold text-slate-800 dark:text-slate-200 block truncate">
                            {sample.title}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {sample.category} · {sample.grade}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* EDUCATION CONTEXT & LANGUAGE SELECTOR BAR */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Education Context
              </span>
              <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                Calibrated for {learningContext.gradeOrProgramme}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">GRADE / LEVEL</label>
                <select
                  value={learningContext.gradeOrProgramme}
                  onChange={(e) => updateLearningContext({ gradeOrProgramme: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 font-medium focus:ring-1 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="Grade 5">Grade 5 (Intermediate)</option>
                  <option value="Grade 8">Grade 8 (Senior)</option>
                  <option value="Grade 10">Grade 10 (FET CAPS)</option>
                  <option value="Grade 11">Grade 11 (FET CAPS)</option>
                  <option value="Grade 12 / Matric">Grade 12 / Matric</option>
                  <option value="TVET NATED N1–N3">TVET NATED N1–N3</option>
                  <option value="TVET NATED N4–N6">TVET NATED N4–N6</option>
                  <option value="University Undergraduate">University Degree</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">EXPLANATION LANGUAGE</label>
                <select
                  value={learningContext.language}
                  onChange={(e) => updateLearningContext({ language: e.target.value as SALanguageCode })}
                  className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 font-medium focus:ring-1 focus:ring-amber-500 focus:outline-none"
                >
                  {SA_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.nativeName} ({lang.name})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* SCAN MODES SELECTOR */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1.5">SCAN MODE</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {SCAN_MODES.map((m) => {
                  const isActive = selectedMode === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => {
                        setSelectedMode(m.id);
                        if (activeScanSession && selectedImageBase64) {
                          handleScanSubmit(m.id);
                        }
                      }}
                      className={`p-2 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                        isActive
                          ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-slate-900 dark:text-white font-bold ring-1 ring-amber-500/50'
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span>{m.icon}</span>
                        <span className="font-semibold truncate">{m.label}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 line-clamp-1">{m.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* QUESTION INPUT & QUICK CHIPS */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1">WHAT DO YOU WANT TO UNDERSTAND?</label>
              <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pr-1.5 focus-within:ring-2 focus-within:ring-amber-500">
                <input
                  type="text"
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder="e.g. Explain step 2, or Solve for x..."
                  className="flex-1 px-3 py-2 bg-transparent text-xs text-slate-900 dark:text-white focus:outline-none"
                />
                <VoiceInputButton
                  language={learningContext.language}
                  onTranscriptionReady={(transcribed) => {
                    setUserQuestion((prev) => (prev ? `${prev.trim()} ${transcribed}` : transcribed));
                  }}
                />
              </div>

              {/* Quick suggestions */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {SUGGESTED_QUESTIONS.map((sq, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setUserQuestion(sq);
                      if (selectedImageBase64) {
                        handleScanSubmit(undefined, sq);
                      }
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-[11px] text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    {sq}
                  </button>
                ))}
              </div>
            </div>

            {/* SCAN ACTION CTA */}
            {selectedImageBase64 && (
              <button
                onClick={() => handleScanSubmit()}
                disabled={isScanLoading}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
              >
                {isScanLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Image with Gemini Vision...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Scan & Understand with AI</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Right Column: AI Analysis, Clarity Assessment, Follow-up Chat & Quizzes (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Scan Error Message */}
          {scanError && (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs flex items-start justify-between gap-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <div>
                  <p className="font-semibold">{scanError}</p>
                  <p className="text-[11px] text-rose-600 dark:text-rose-300 mt-0.5">
                    Verify that your GEMINI_API_KEY is configured in your server environment.
                  </p>
                </div>
              </div>
              <button
                onClick={clearScanError}
                className="text-rose-600 hover:text-rose-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Active AI Scan Session Results */}
          {activeScanSession ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              {/* Header Status & Save Button */}
              <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {activeScanSession.title}
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {activeScanSession.mode.replace('_', ' ')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => saveScanSession(activeScanSession)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border ${
                      activeScanSession.saved
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {activeScanSession.saved ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Saved to Library</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>Save to Library</span>
                      </>
                    )}
                  </button>

                  {/* Voice Narration Audio Controls */}
                  <MessageAudioControls
                    messageId={activeScanSession.id}
                    content={activeScanSession.aiExplanation}
                    language={activeScanSession.language}
                  />

                  <button
                    onClick={() => handleCopyExplanation(activeScanSession.aiExplanation)}
                    className="p-1.5 bg-white dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
                    title="Copy explanation"
                  >
                    {copiedExplanation ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* CLARITY ASSESSMENT BANNER */}
              {activeScanSession.clarityAssessment && !activeScanSession.clarityAssessment.isClear && (
                <div className="p-4 bg-amber-50 dark:bg-amber-950/50 border-b border-amber-200 dark:border-amber-800/60 text-xs flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold text-amber-900 dark:text-amber-200">
                      Image Notice: {activeScanSession.clarityAssessment.issue?.toUpperCase()}
                    </p>
                    <p className="text-amber-800 dark:text-amber-300 mt-0.5">
                      {activeScanSession.clarityAssessment.message}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={startCamera}
                        className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-[11px]"
                      >
                        Retake Photo
                      </button>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold rounded-lg text-[11px]"
                      >
                        Upload Another
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* PRIMARY AI EXPLANATION BODY */}
              <div className="p-5 sm:p-6 space-y-4">
                {/* Initial question context */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px] mb-0.5">
                    Learner Asked:
                  </span>
                  <p className="text-slate-800 dark:text-slate-200 font-medium">
                    "{cleanFormulaString(activeScanSession.initialQuestion)}"
                  </p>
                </div>

                {/* Explanation text formatted with clean formula rendering */}
                <div className="max-w-none text-xs sm:text-sm leading-relaxed">
                  <CleanFormulaRenderer
                    content={activeScanSession.aiExplanation}
                    language={activeScanSession.language}
                  />
                </div>

                {/* High-yield summary badge */}
                {activeScanSession.summary && (
                  <div className="mt-4 p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300 mb-1">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <span>Key Takeaway:</span>
                    </div>
                    <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      <CleanFormulaRenderer
                        content={activeScanSession.summary}
                        language={activeScanSession.language}
                      />
                    </div>
                  </div>
                )}

                {/* Curriculum Disclaimer */}
                <div className="pt-2 text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-800">
                  {activeScanSession.disclaimer}
                </div>

                {/* QUICK ACTIONS BAR */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Quick Follow-Up Actions:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleScanSubmit('practice')}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-semibold hover:bg-blue-100 border border-blue-200 dark:border-blue-900 transition-colors flex items-center gap-1.5"
                    >
                      <span>🎯</span>
                      <span>Practice this</span>
                    </button>

                    <button
                      onClick={() => handleScanSubmit('quiz_me')}
                      className="px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-xs font-semibold hover:bg-purple-100 border border-purple-200 dark:border-purple-900 transition-colors flex items-center gap-1.5"
                    >
                      <span>⚡</span>
                      <span>Quiz me</span>
                    </button>

                    <button
                      onClick={() => handleScanSubmit('simplify')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-100 border border-emerald-200 dark:border-emerald-900 transition-colors flex items-center gap-1.5"
                    >
                      <span>🌱</span>
                      <span>Explain simpler</span>
                    </button>

                    <button
                      onClick={() => handleScanSubmit('translate')}
                      className="px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-xs font-semibold hover:bg-amber-100 border border-amber-200 dark:border-amber-900 transition-colors flex items-center gap-1.5"
                    >
                      <span>🌐</span>
                      <span>Translate</span>
                    </button>
                  </div>
                </div>

                {/* INTERACTIVE QUIZ IF GENERATED */}
                {activeScanSession.quiz && activeScanSession.quiz.questions && activeScanSession.quiz.questions.length > 0 && (
                  <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/60 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">⚡</span>
                        <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                          {activeScanSession.quiz.title || 'Check Your Understanding'}
                        </h4>
                      </div>
                      {isQuizSubmitted && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                          Score: {quizScore} / {activeScanSession.quiz.questions.length}
                        </span>
                      )}
                    </div>

                    <div className="space-y-4">
                      {activeScanSession.quiz.questions.map((q: any, qIdx: number) => {
                        const isCorrect = isQuizSubmitted && activeQuizAnswers[q.id] === q.correctAnswer;
                        return (
                          <div
                            key={q.id || qIdx}
                            className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-purple-900/40 space-y-2 text-xs"
                          >
                            <span className="font-bold text-slate-900 dark:text-white block">
                              {qIdx + 1}. {cleanFormulaString(q.question)}
                            </span>

                            {q.options && Array.isArray(q.options) && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                                {q.options.map((opt: string, optIdx: number) => {
                                  const isSelected = activeQuizAnswers[q.id] === opt;
                                  return (
                                    <button
                                      key={optIdx}
                                      onClick={() => {
                                        if (isQuizSubmitted) return;
                                        setActiveQuizAnswers((prev) => ({ ...prev, [q.id]: opt }));
                                      }}
                                      className={`px-3 py-2 text-left rounded-lg border text-xs transition-colors flex items-center justify-between ${
                                        isSelected
                                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/60 font-semibold text-purple-900 dark:text-purple-200'
                                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                                      }`}
                                    >
                                      <span>{cleanFormulaString(opt)}</span>
                                      {isSelected && <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />}
                                    </button>
                                  );
                                })}
                              </div>
                            )}

                            {isQuizSubmitted && (
                              <div
                                className={`mt-2 p-2.5 rounded-lg text-[11px] ${
                                  isCorrect
                                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200'
                                    : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 border border-rose-200'
                                }`}
                              >
                                <p className="font-bold">
                                  {isCorrect ? '✓ Correct!' : `✗ Correct Answer: ${cleanFormulaString(q.correctAnswer)}`}
                                </p>
                                <div className="mt-0.5">
                                  <CleanFormulaRenderer content={q.explanation} />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {!isQuizSubmitted ? (
                      <button
                        onClick={() => handleQuizSubmit(activeScanSession.quiz!)}
                        className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
                      >
                        Submit Quiz
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setActiveQuizAnswers({});
                          setIsQuizSubmitted(false);
                        }}
                        className="w-full py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-semibold rounded-xl text-xs transition-colors"
                      >
                        Retake Quiz
                      </button>
                    )}
                  </div>
                )}

                {/* PRACTICE QUESTIONS IF GENERATED */}
                {activeScanSession.practiceQuestions && activeScanSession.practiceQuestions.length > 0 && (
                  <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🎯</span>
                      <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                        Targeted Practice Challenges
                      </h4>
                    </div>

                    <div className="space-y-3">
                      {activeScanSession.practiceQuestions.map((pq: any, pqIdx: number) => (
                        <div
                          key={pq.id || pqIdx}
                          className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/40 text-xs space-y-2"
                        >
                          <span className="font-bold text-slate-900 dark:text-white block">
                            Problem {pqIdx + 1}: {pq.question}
                          </span>

                          <details className="mt-2 text-slate-600 dark:text-slate-400">
                            <summary className="font-semibold text-blue-600 dark:text-blue-400 cursor-pointer select-none">
                              Reveal Step-by-Step Solution & Answer
                            </summary>
                            <div className="mt-2 p-2.5 rounded-lg bg-blue-50/50 dark:bg-slate-800/80 border border-blue-100 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300">
                              <p className="font-bold text-blue-700 dark:text-blue-300 mb-1">
                                Answer: {pq.correctAnswer}
                              </p>
                              <p>{pq.explanation}</p>
                            </div>
                          </details>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* MULTI-TURN FOLLOW-UP CONVERSATION FEED */}
              <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 p-4 sm:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Follow-Up Discussion About This Image
                  </span>
                  <span className="text-[10px] text-slate-400">Image context preserved</span>
                </div>

                {/* Message bubbles */}
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {activeScanSession.messages &&
                    activeScanSession.messages.map((msg, idx) => {
                      const isUser = msg.role === 'user';
                      return (
                        <div
                          key={msg.id || idx}
                          className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                        >
                          {!isUser && (
                            <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                              ✦
                            </div>
                          )}

                          <div
                            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                              isUser
                                ? 'bg-amber-400 text-slate-950 font-medium rounded-br-xs'
                                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-xs shadow-xs whitespace-pre-line'
                            }`}
                          >
                            {msg.content}
                          </div>
                        </div>
                      );
                    })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Follow-up question input with Voice Input */}
                <form onSubmit={handleFollowUpSubmit} className="flex items-center gap-2">
                  <div className="flex-1 flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pr-1.5 focus-within:ring-2 focus-within:ring-amber-500">
                    <input
                      type="text"
                      value={followUpInput}
                      onChange={(e) => setFollowUpInput(e.target.value)}
                      placeholder="Ask a follow-up question about this image..."
                      disabled={isScanLoading}
                      className="flex-1 px-3.5 py-2.5 bg-transparent text-xs text-slate-900 dark:text-white focus:outline-none"
                    />
                    <VoiceInputButton
                      language={activeScanSession.language}
                      disabled={isScanLoading}
                      onTranscriptionReady={(transcribed) => {
                        setFollowUpInput((prev) => (prev ? `${prev.trim()} ${transcribed}` : transcribed));
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!followUpInput.trim() || isScanLoading}
                    className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-xs shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Ask</span>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            /* Empty Right State when no active scan */
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center flex flex-col items-center justify-center min-h-[380px] shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                No Scan Selected
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm">
                Take a photo or pick a sample problem on the left to begin your interactive AI explanation.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* PAST SCANS DRAWER */}
      {showHistoryDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 dark:border-slate-800">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-amber-500" />
                <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                  Past Scan Sessions
                </h3>
              </div>
              <button
                onClick={() => setShowHistoryDrawer(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {scanSessions.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No scan sessions saved yet. Snap a textbook problem to get started!
                </div>
              ) : (
                scanSessions.map((session) => (
                  <div
                    key={session.id}
                    onClick={() => {
                      setActiveScanSession(session);
                      setSelectedImageBase64(session.imageUrl || session.thumbnail || null);
                      setSelectedMimeType(session.mimeType || 'image/jpeg');
                      setSelectedMode(session.mode);
                      setShowHistoryDrawer(false);
                    }}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                      activeScanSession?.id === session.id
                        ? 'border-amber-500 bg-amber-50/50 dark:bg-slate-800 font-medium'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  >
                    {/* Thumbnail */}
                    {session.thumbnail ? (
                      <img
                        src={session.thumbnail}
                        alt="Thumbnail"
                        className="w-12 h-12 rounded-lg object-cover bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-slate-800 text-amber-600 flex items-center justify-center shrink-0">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900 dark:text-white truncate block">
                          {session.title}
                        </span>
                        <span className="text-[10px] text-slate-400 ml-2">
                          {new Date(session.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        "{session.initialQuestion}"
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteScanSession(session.id);
                      }}
                      className="text-slate-400 hover:text-rose-500 p-1"
                      title="Delete session"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setShowHistoryDrawer(false)}
                className="w-full py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-xs hover:bg-slate-200 transition-colors"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULL IMAGE ZOOM MODAL */}
      {imageZoomOpen && selectedImageBase64 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
          <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setImageZoomOpen(false)}
              className="absolute -top-10 right-0 p-2 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImageBase64}
              alt="High Resolution Scan"
              className="max-h-[85vh] max-w-full object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
