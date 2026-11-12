import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {
  AIConversation,
  AIMessage,
  AITutorMode,
  GeneratedQuiz,
  LearningContextState,
  Lesson,
  QuizAttempt,
  SALanguageCode,
  SavedLearningItem,
  ScanClarityAssessment,
  ScanMode,
  ScanSession,
  ScanSessionMessage,
  StudyPlan,
  Track,
  UserNote,
  UserProgress
} from '../types';
import {
  AdaptiveDifficulty,
  AdaptiveProfile,
  DEFAULT_MASTERY_THRESHOLDS,
  LearnerPerformanceEvent,
  MasteryThresholds
} from '../types/adaptive';
import {
  buildAdaptiveProfile,
  getSampleLearnerEvents
} from '../services/adaptive/adaptiveLearningService';
import { TRACKS } from '../data/coursesData';
import { SA_LANGUAGES } from '../data/learningContextData';
import { getSubjectsForLevel } from '../data/educationData';
import { ttsManager } from '../services/voice/tts/TextToSpeechManager';
import { isTtsSupportedForLanguage } from '../services/voice/languageCapabilities';

import { learnerStrugglesService } from '../services/struggles/learnerStrugglesService';

export type AppTab = 'landing' | 'login' | 'signup' | 'calculator' | 'home' | 'dashboard' | 'explore' | 'learn' | 'school' | 'tvet' | 'higherEd' | 'tracks' | 'tutor' | 'scan' | 'practice' | 'saved' | 'profile' | 'adaptive' | 'assessments' | 'academicVoice' | 'progress' | 'adminBank' | 'about' | 'smartNotes' | 'myStruggles' | 'success' | 'cancel' | 'trial' | 'paywall' | 'subscribe' | 'papers' | 'adminPayments' | 'unlock' | 'adminCodes' | 'terms' | 'refundPolicy' | 'privacyPolicy' | 'contact' | 'studyGuide' | 'studyGuidePhysics' | 'studyGuideLifeSciences' | 'studyGuideChapter';

export interface GeminiStatusInfo {
  checked: boolean;
  configured: boolean;
  model: string;
  multimodal?: boolean;
  message?: string;
}

interface LearningContextType {
  tracks: Track[];
  userProgress: UserProgress;
  activeTrack: Track;
  activeLesson: Lesson | null;
  activeLessonId: string | null;
  currentTab: AppTab;
  setCurrentTab: (tab: AppTab) => void;
  openLesson: (lessonId: string) => void;
  closeLesson: () => void;
  markLessonComplete: (lessonId: string, xpBonus?: number) => void;
  toggleBookmark: (lessonId: string) => void;
  saveNote: (lessonId: string, lessonTitle: string, trackTitle: string, content: string) => void;
  recordQuizScore: (lessonId: string, score: number) => void;
  setActiveTrackId: (trackId: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isPwaPromptOpen: boolean;
  setIsPwaPromptOpen: (open: boolean) => void;
  isOffline: boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Audio narration support (strictly English & Afrikaans only)
  audioState: {
    isPlaying: boolean;
    isPaused?: boolean;
    rate: number;
    supported: boolean;
    language: string;
    voiceNotice?: string;
    autoPlayAnswers?: boolean;
    currentMessageId?: string | null;
  };
  playNarration: (text: string, langCode?: SALanguageCode, messageId?: string) => void;
  pauseNarration: () => void;
  resumeNarration: () => void;
  stopNarration: () => void;
  setSpeechRate: (rate: number) => void;
  setAutoPlayAnswers: (enabled: boolean) => void;

  // Gemini AI Status
  geminiStatus: GeminiStatusInfo;
  checkGeminiStatus: () => Promise<void>;

  // Unified Multilingual Learning State
  activeLearningLanguage: SALanguageCode;
  setActiveLearningLanguage: (lang: SALanguageCode) => void;

  // Phase 2: Learning Context State
  learningContext: LearningContextState;
  updateLearningContext: (partial: Partial<LearningContextState>) => void;

  // Phase 2: AI Conversations
  conversations: AIConversation[];
  activeConversation: AIConversation | null;
  createNewConversation: (title?: string) => AIConversation;
  renameConversation: (id: string, newTitle: string) => void;
  deleteConversation: (id: string) => void;
  setActiveConversationId: (id: string) => void;
  sendMessageToTutor: (userQuestion: string, modeOverride?: AITutorMode, languageOverride?: SALanguageCode) => Promise<void>;
  isTutorLoading: boolean;
  tutorError: string | null;
  clearTutorError: () => void;
  retryLastMessage: () => void;
  clearActiveConversation: () => void;

  // Phase 2: Saved Learning Area
  savedItems: SavedLearningItem[];
  saveLearningItem: (item: Omit<SavedLearningItem, 'id' | 'createdAt'>) => SavedLearningItem;
  removeSavedItem: (id: string) => void;

  // Phase 2: Quiz Generator
  activeGeneratedQuiz: GeneratedQuiz | null;
  setActiveGeneratedQuiz: (quiz: GeneratedQuiz | null) => void;
  generateQuiz: (topicOverride?: string, quizRequest?: string) => Promise<GeneratedQuiz>;
  recordQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'completedAt'>) => QuizAttempt;

  // Phase 2: Study Plan Generator & Manager
  studyPlans: StudyPlan[];
  createStudyPlan: (availableTime?: string, targetDate?: string) => Promise<StudyPlan>;
  removeStudyPlan: (id: string) => Promise<void>;

  // Phase 3: Scan & Learn Multimodal Vision
  scanSessions: ScanSession[];
  activeScanSession: ScanSession | null;
  setActiveScanSession: (session: ScanSession | null) => void;
  isScanLoading: boolean;
  scanError: string | null;
  clearScanError: () => void;
  analyzeScannedImage: (params: {
    imageBase64: string;
    mimeType?: string;
    question?: string;
    mode?: ScanMode;
    educationLevel?: string;
    gradeOrProgramme?: string;
    subject?: string;
    module?: string;
    topic?: string;
    language?: SALanguageCode;
  }) => Promise<ScanSession>;
  sendScanFollowUp: (sessionId: string, message: string, imageBase64?: string, mimeType?: string) => Promise<ScanSessionMessage>;
  saveScanSession: (session: ScanSession) => Promise<void>;
  deleteScanSession: (sessionId: string) => Promise<void>;

  // Phase 5: Adaptive Learning Engine
  adaptiveProfile: AdaptiveProfile;
  performanceEvents: LearnerPerformanceEvent[];
  masteryThresholds: MasteryThresholds;
  recordPerformanceEvent: (event: Omit<LearnerPerformanceEvent, 'id' | 'timestamp'>) => LearnerPerformanceEvent;
  updateMasteryThresholds: (thresholds: Partial<MasteryThresholds>) => void;
  seedSampleAdaptiveData: () => void;
  clearAdaptiveData: () => void;
}

const STORAGE_KEY = 'nexovian_learning_progress_v2';

const INITIAL_CONVERSATION: AIConversation = {
  id: 'conv-init-1',
  userId: 'learner-1',
  title: 'Welcome & Problem Solving in Algebra',
  educationLevel: 'FET Phase (Grade 10–12 CAPS)',
  gradeOrProgramme: 'Grade 10',
  subject: 'Mathematics',
  topic: 'Algebra & Factorization',
  language: 'en',
  mode: 'explain',
  createdAt: '2026-09-28T10:00:00.000Z',
  updatedAt: '2026-09-28T10:05:00.000Z',
  messages: [
    {
      id: 'msg-welcome-1',
      role: 'assistant',
      content: `Welcome to **Nexovian AI Tutor**! 
*Tagline: "Learn today. Build tomorrow."*

I am your interactive curriculum mentor. How can I help you master **Algebra & Factorization** today?
- Select your **Education Level**, **Subject**, and **Topic**.
- Choose your **Mode** (Explain, Simplify, Summarize, Translate, Practice, or Quiz Help).
- Choose from 11 official South African languages!`,
      timestamp: '2026-09-28T10:00:00.000Z',
      mode: 'explain',
      summary: 'Nexovian AI Tutor Introduction',
      followUps: [
        'How do I factorize quadratic trinomials?',
        'Can you simplify completing the square with an analogy?',
        'Give me 2 practice questions with step-by-step solutions.'
      ]
    }
  ]
};

const DEFAULT_PROGRESS: UserProgress = {
  completedLessonIds: ['fs-lesson-1'],
  lessonQuizScores: { 'fs-lesson-1': 100 },
  bookmarkedLessonIds: ['fs-lesson-2'],
  notes: {
    'fs-lesson-1': {
      lessonId: 'fs-lesson-1',
      lessonTitle: 'Zero-Latency State Flow & UI Determinism',
      trackTitle: 'Full-Stack Modern Engineering',
      updatedAt: '2026-09-28',
      content: 'Key rule: never pair isLoading and isError as independent booleans. Use discriminated unions for deterministic state transitions!'
    }
  },
  currentStreakDays: 4,
  lastActiveDate: new Date().toISOString().split('T')[0],
  activeTrackId: 'fullstack-mastery',
  totalXp: 450,
  learnedDays: ['2026-09-25', '2026-09-26', '2026-09-27', '2026-09-28', '2026-09-29'],
  // Phase 2 default metrics
  questionsAskedCount: 6,
  practiceSessionsCount: 3,
  quizAttempts: [],
  savedItems: [
    {
      id: 'saved-1',
      type: 'summary',
      title: 'Factoring Quadratic Equations',
      content: 'Formula: ax² + bx + c = 0. When a=1, find factors of c that sum to b. Check with FOIL expansion.',
      subject: 'Mathematics',
      topic: 'Algebra & Factorization',
      language: 'en',
      createdAt: '2026-09-28T14:30:00.000Z',
      tags: ['Algebra', 'Grade 10', 'Formulas']
    }
  ],
  topicsStudied: ['Algebra & Factorization', 'Zero-Latency State Flow', 'Ohm’s Law'],
  studyTimeMinutes: 85,
  lastActivityTimestamp: new Date().toISOString(),
  conversations: [INITIAL_CONVERSATION],
  activeConversationId: INITIAL_CONVERSATION.id
};

export const normalizePath = (rawPath?: string): string => {
  if (!rawPath) return '/';
  const clean = rawPath.toLowerCase().split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
  return clean;
};

export const pathToTab = (cleanPath: string, search = ''): AppTab => {
  if (cleanPath === '/signup' || cleanPath === '/register') return 'signup';
  if (cleanPath === '/login') return 'login';
  if (cleanPath === '/trial' || cleanPath === '/pricing') return 'trial';
  if (cleanPath === '/learn' || search.includes('lang=')) return 'learn';
  if (cleanPath === '/calculator' || cleanPath === '/calc') return 'calculator';
  if (cleanPath === '/papers') return 'papers';
  if (cleanPath === '/paywall') return 'paywall';
  if (cleanPath === '/subscribe') return 'subscribe';
  if (cleanPath === '/unlock') return 'unlock';
  if (cleanPath === '/admin/payments') return 'adminPayments';
  if (cleanPath === '/admin/codes') return 'adminCodes';
  if (cleanPath === '/app' || cleanPath === '/dashboard' || cleanPath === '/subjects' || cleanPath === '/quiz') return 'home';
  if (cleanPath === '/success') return 'success';
  if (cleanPath === '/cancel') return 'cancel';
  if (cleanPath === '/smart-notes' || cleanPath === '/notes') return 'smartNotes';
  if (cleanPath === '/my-struggles' || cleanPath === '/struggles') return 'myStruggles';
  if (cleanPath === '/admin' || cleanPath === '/admin/bank') return 'adminBank';
  if (cleanPath === '/about') return 'about';
  if (cleanPath === '/terms') return 'terms';
  if (cleanPath === '/refund-policy' || cleanPath === '/refund') return 'refundPolicy';
  if (cleanPath === '/privacy-policy' || cleanPath === '/privacy') return 'privacyPolicy';
  if (cleanPath === '/contact') return 'contact';
  if (cleanPath === '/study-guide' || cleanPath === '/study-guides') return 'studyGuide';
  if (cleanPath === '/study-guide/physics-grade-12') return 'studyGuidePhysics';
  if (cleanPath === '/study-guide/life-sciences-grade-12') return 'studyGuideLifeSciences';
  if (cleanPath.startsWith('/study-guide/')) return 'studyGuideChapter';
  return 'landing';
};

export const tabToPath = (tab: AppTab): string => {
  switch (tab) {
    case 'landing': return '/';
    case 'signup': return '/signup';
    case 'login': return '/login';
    case 'trial': return '/trial';
    case 'learn': return '/learn';
    case 'calculator': return '/calculator';
    case 'papers': return '/papers';
    case 'paywall': return '/paywall';
    case 'subscribe': return '/subscribe';
    case 'unlock': return '/unlock';
    case 'adminPayments': return '/admin/payments';
    case 'adminCodes': return '/admin/codes';
    case 'home': return '/app';
    case 'success': return '/success';
    case 'cancel': return '/cancel';
    case 'smartNotes': return '/smart-notes';
    case 'myStruggles': return '/my-struggles';
    case 'adminBank': return '/admin';
    case 'about': return '/about';
    case 'terms': return '/terms';
    case 'refundPolicy': return '/refund-policy';
    case 'privacyPolicy': return '/privacy-policy';
    case 'contact': return '/contact';
    case 'studyGuide': return '/study-guide';
    case 'studyGuidePhysics': return '/study-guide/physics-grade-12';
    case 'studyGuideLifeSciences': return '/study-guide/life-sciences-grade-12';
    case 'studyGuideChapter': return typeof window !== 'undefined' ? window.location.pathname : '/study-guide/physics-grade-12/momentum';
    default: return '/';
  }
};

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tracks] = useState<Track[]>(TRACKS);
  const [currentTab, setCurrentTabState] = useState<AppTab>(() => {
    if (typeof window !== 'undefined') {
      const clean = normalizePath(window.location.pathname);
      return pathToTab(clean, window.location.search);
    }
    return 'landing';
  });

  const setCurrentTab = (tab: AppTab) => {
    setCurrentTabState(tab);
    if (typeof window !== 'undefined') {
      const targetPath = tabToPath(tab);
      const currentClean = normalizePath(window.location.pathname);
      if (targetPath && currentClean !== targetPath) {
        window.history.pushState({}, '', targetPath);
      }
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = () => {
      const clean = normalizePath(window.location.pathname);
      const tab = pathToTab(clean, window.location.search);
      setCurrentTabState(tab);
    };

    // Global interceptor for standard internal anchor links
    const handleGlobalLinkClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (
        href &&
        href.startsWith('/') &&
        !href.startsWith('//') &&
        !anchor.getAttribute('target') &&
        !anchor.getAttribute('download')
      ) {
        try {
          const url = new URL(anchor.href, window.location.origin);
          const clean = normalizePath(url.pathname);
          const tab = pathToTab(clean, url.search);
          e.preventDefault();
          window.history.pushState({}, '', clean);
          setCurrentTab(tab);
          window.dispatchEvent(new PopStateEvent('popstate'));
        } catch {
          // fallback to default navigation if URL parsing fails
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleGlobalLinkClick);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleGlobalLinkClick);
    };
  }, []);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPwaPromptOpen, setIsPwaPromptOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('nexovian_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (_) {}
    return 'dark'; // Default futuristic dark mode
  });

  // AI Tutor & Quiz state
  const [isTutorLoading, setIsTutorLoading] = useState(false);
  const [tutorError, setTutorError] = useState<string | null>(null);
  const [lastPrompt, setLastPrompt] = useState<string>('');
  const [activeGeneratedQuiz, setActiveGeneratedQuiz] = useState<GeneratedQuiz | null>(null);
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([]);
  const [geminiStatus, setGeminiStatus] = useState<GeminiStatusInfo>({
    checked: false,
    configured: false,
    model: 'gemini-3.8-flash'
  });

  // Phase 3: Scan & Learn state
  const [scanSessions, setScanSessions] = useState<ScanSession[]>([]);
  const [activeScanSession, setActiveScanSession] = useState<ScanSession | null>(null);
  const [isScanLoading, setIsScanLoading] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const clearScanError = () => setScanError(null);

  // Unified Multilingual Learning State
  const [activeLearningLanguage, setActiveLearningLanguageState] = useState<SALanguageCode>(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get('lang') as SALanguageCode;
        if (urlLang) return urlLang;
      }
      const stored = localStorage.getItem('nexovian_academy_language') as SALanguageCode;
      if (stored) return stored;
    } catch {
      // fallback
    }
    return 'en';
  });

  const setActiveLearningLanguage = (newLang: SALanguageCode) => {
    setActiveLearningLanguageState(newLang);
    try {
      localStorage.setItem('nexovian_academy_language', newLang);
      window.dispatchEvent(new CustomEvent('nexovian_language_changed', { detail: newLang }));
    } catch {
      // ignore
    }
    setLearningContext((prev) => ({ ...prev, language: newLang }));
  };

  // Sync with global language changes
  useEffect(() => {
    const handleLangSync = (e: any) => {
      const lang = e?.detail || localStorage.getItem('nexovian_academy_language');
      if (lang && lang !== activeLearningLanguage) {
        setActiveLearningLanguageState(lang);
        setLearningContext((prev) => ({ ...prev, language: lang }));
      }
    };
    window.addEventListener('nexovian_language_changed', handleLangSync);
    window.addEventListener('storage', handleLangSync);
    return () => {
      window.removeEventListener('nexovian_language_changed', handleLangSync);
      window.removeEventListener('storage', handleLangSync);
    };
  }, [activeLearningLanguage]);

  // Learning Context State
  const [learningContext, setLearningContext] = useState<LearningContextState>(() => {
    let initialLang: SALanguageCode = 'en';
    try {
      const stored = localStorage.getItem('nexovian_academy_language') as SALanguageCode;
      if (stored) initialLang = stored;
    } catch {}

    return {
      educationLevel: 'FET Phase (Grade 10–12 CAPS)',
      gradeOrProgramme: 'Grade 10',
      subject: 'Mathematics',
      topic: 'Algebra & Factorization',
      language: initialLang,
      mode: 'explain'
    };
  });

  // Check Gemini Status
  const checkGeminiStatus = async () => {
    try {
      const res = await fetch('/api/ai/status');
      const data = await res.json();
      setGeminiStatus({
        checked: true,
        configured: Boolean(data.configured),
        model: data.model || 'gemini-3.8-flash',
        message: data.message
      });
    } catch {
      setGeminiStatus({
        checked: true,
        configured: false,
        model: 'gemini-3.8-flash',
        message: 'Could not connect to server AI service.'
      });
    }
  };

  // Audio Speech state synchronized with ttsManager
  const [audioState, setAudioState] = useState<{
    isPlaying: boolean;
    isPaused?: boolean;
    rate: number;
    supported: boolean;
    language: string;
    voiceNotice?: string;
    autoPlayAnswers?: boolean;
    currentMessageId?: string | null;
  }>({
    isPlaying: false,
    isPaused: false,
    rate: 1.0,
    supported: typeof window !== 'undefined' && 'speechSynthesis' in window,
    language: 'en',
    autoPlayAnswers: false,
    currentMessageId: null
  });

  useEffect(() => {
    const unsub = ttsManager.subscribe((update) => {
      setAudioState((prev) => ({
        ...prev,
        isPlaying: update.state === 'playing',
        isPaused: update.state === 'paused',
        language: update.language,
        currentMessageId: update.currentMessageId,
        voiceNotice: update.error
      }));
    });
    return unsub;
  }, []);

  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...DEFAULT_PROGRESS,
          ...parsed,
          savedItems: parsed.savedItems || DEFAULT_PROGRESS.savedItems,
          conversations: parsed.conversations?.length ? parsed.conversations : DEFAULT_PROGRESS.conversations,
          quizAttempts: parsed.quizAttempts || [],
          topicsStudied: parsed.topicsStudied || DEFAULT_PROGRESS.topicsStudied
        };
      }
    } catch {
      // fallback
    }
    return DEFAULT_PROGRESS;
  });

  // Initial fetch: check AI status and load server persistent data
  useEffect(() => {
    checkGeminiStatus();

    // Fetch persistent conversations, saved items, and study plans from server
    fetch('/api/ai/conversations')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setUserProgress((prev) => ({
            ...prev,
            conversations: data.data,
            activeConversationId: prev.activeConversationId || data.data[0].id
          }));
        }
      })
      .catch(() => {});

    fetch('/api/ai/saved')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setUserProgress((prev) => ({
            ...prev,
            savedItems: data.data
          }));
        }
      })
      .catch(() => {});

    fetch('/api/ai/study-plans')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setStudyPlans(data.data);
        }
      })
      .catch(() => {});

    // Phase 3: Fetch persistent scan sessions
    fetch('/api/ai/scan/sessions')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setScanSessions(data.data);
          if (data.data.length > 0 && !activeScanSession) {
            setActiveScanSession(data.data[0]);
          }
        }
      })
      .catch(() => {});
  }, []);

  // Online / offline listener
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userProgress));
    } catch {
      // ignore
    }
  }, [userProgress]);

  // ==========================================
  // PHASE 5: ADAPTIVE LEARNING ENGINE STATE
  // ==========================================
  const ADAPTIVE_EVENTS_KEY = 'nexovian_adaptive_events_v2';
  const THRESHOLDS_KEY = 'nexovian_mastery_thresholds_v2';

  const [performanceEvents, setPerformanceEvents] = useState<LearnerPerformanceEvent[]>(() => {
    try {
      const stored = localStorage.getItem(ADAPTIVE_EVENTS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback to sample
    }
    return getSampleLearnerEvents();
  });

  const [masteryThresholds, setMasteryThresholds] = useState<MasteryThresholds>(() => {
    try {
      const stored = localStorage.getItem(THRESHOLDS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed.needsSupportMax === 'number') return parsed;
      }
    } catch {
      // fallback
    }
    return DEFAULT_MASTERY_THRESHOLDS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(ADAPTIVE_EVENTS_KEY, JSON.stringify(performanceEvents));
    } catch {
      // ignore
    }
  }, [performanceEvents]);

  useEffect(() => {
    try {
      localStorage.setItem(THRESHOLDS_KEY, JSON.stringify(masteryThresholds));
    } catch {
      // ignore
    }
  }, [masteryThresholds]);

  const adaptiveProfile = useMemo(() => {
    return buildAdaptiveProfile(
      performanceEvents,
      userProgress.completedLessonIds,
      userProgress.learnedDays,
      studyPlans.length,
      {
        selectedGrade: learningContext.gradeOrProgramme || 'Grade 10',
        preferredLanguage: learningContext.language
      },
      masteryThresholds
    );
  }, [
    performanceEvents,
    userProgress.completedLessonIds,
    userProgress.learnedDays,
    studyPlans.length,
    learningContext.gradeOrProgramme,
    learningContext.language,
    masteryThresholds
  ]);

  const recordPerformanceEvent = (
    event: Omit<LearnerPerformanceEvent, 'id' | 'timestamp'>
  ): LearnerPerformanceEvent => {
    const fullEvent: LearnerPerformanceEvent = {
      ...event,
      id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString()
    };
    setPerformanceEvents((prev) => [fullEvent, ...prev]);
    return fullEvent;
  };

  const updateMasteryThresholds = (thresholds: Partial<MasteryThresholds>) => {
    setMasteryThresholds((prev) => ({
      ...prev,
      ...thresholds
    }));
  };

  const seedSampleAdaptiveData = () => {
    const sample = getSampleLearnerEvents();
    setPerformanceEvents(sample);
  };

  const clearAdaptiveData = () => {
    setPerformanceEvents([]);
  };

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === 'k' && (e.metaKey || e.ctrlKey)) ||
        (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA')
      ) {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute active track
  const activeTrack = useMemo(() => {
    return tracks.find((t) => t.id === userProgress.activeTrackId) || tracks[0];
  }, [tracks, userProgress.activeTrackId]);

  // Compute active lesson
  const activeLesson = useMemo(() => {
    if (!activeLessonId) return null;
    for (const track of tracks) {
      for (const mod of track.modules) {
        const found = mod.lessons.find((l) => l.id === activeLessonId);
        if (found) return found;
      }
    }
    return null;
  }, [tracks, activeLessonId]);

  // Active AI conversation
  const activeConversation = useMemo(() => {
    const convId = userProgress.activeConversationId;
    return userProgress.conversations.find((c) => c.id === convId) || userProgress.conversations[0] || null;
  }, [userProgress.conversations, userProgress.activeConversationId]);

  const openLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
  };

  const closeLesson = () => {
    stopNarration();
    setActiveLessonId(null);
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('nexovian_theme', theme);
    } catch (_) {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const updateLearningContext = (partial: Partial<LearningContextState>) => {
    setLearningContext((prev) => {
      const gradeChanged = partial.gradeOrProgramme !== undefined && partial.gradeOrProgramme !== prev.gradeOrProgramme;
      let nextSubject = partial.subject !== undefined ? partial.subject : prev.subject;
      let nextTopic = partial.topic !== undefined ? partial.topic : prev.topic;

      // Changing the grade must refresh the available subjects and clear any incompatible old subject or topic
      if (gradeChanged && partial.subject === undefined) {
        const availableForNewGrade = getSubjectsForLevel(partial.gradeOrProgramme!);
        const isSubjectValid = availableForNewGrade.some(
          (s) => s.name.toLowerCase() === (prev.subject || '').toLowerCase()
        );
        if (isSubjectValid) {
          const matchedSubj = availableForNewGrade.find(
            (s) => s.name.toLowerCase() === (prev.subject || '').toLowerCase()
          );
          if (matchedSubj && prev.topic && !matchedSubj.topics.includes(prev.topic)) {
            nextTopic = '';
          }
        } else {
          nextSubject = '';
          nextTopic = '';
        }
      }

      // Changing the subject must clear any incompatible old topic
      if (partial.subject !== undefined && partial.subject !== prev.subject && partial.topic === undefined) {
        const currentGrade = partial.gradeOrProgramme || prev.gradeOrProgramme;
        const available = getSubjectsForLevel(currentGrade);
        const subjObj = available.find((s) => s.name === partial.subject);
        if (subjObj && prev.topic && !subjObj.topics.includes(prev.topic)) {
          nextTopic = '';
        } else if (!subjObj) {
          nextTopic = '';
        }
      }

      const updated = {
        ...prev,
        ...partial,
        subject: nextSubject,
        topic: nextTopic
      };

      if (partial.language && partial.language !== activeLearningLanguage) {
        setActiveLearningLanguageState(partial.language);
        try {
          localStorage.setItem('nexovian_academy_language', partial.language);
          localStorage.setItem('nexovian_academy_language', partial.language);
          window.dispatchEvent(new CustomEvent('nexovian_language_changed', { detail: partial.language }));
          window.dispatchEvent(new CustomEvent('nexovian_language_changed', { detail: partial.language }));
        } catch {}

        // Update active conversation's language seamlessly
        setUserProgress((p) => {
          const active = p.conversations.find((c) => c.id === p.activeConversationId);
          if (active && active.language !== partial.language) {
            return {
              ...p,
              conversations: p.conversations.map((c) =>
                c.id === active.id ? { ...c, language: partial.language! } : c
              )
            };
          }
          return p;
        });
      }

      // Track topic in user progress
      if (updated.topic && !userProgress.topicsStudied.includes(updated.topic)) {
        setUserProgress((p) => ({
          ...p,
          topicsStudied: [...p.topicsStudied, updated.topic!]
        }));
      }

      // Synchronize active conversation with new subject/topic/grade if changed
      const topicChanged = updated.topic !== prev.topic;
      const subjectChanged = updated.subject !== prev.subject;
      if (topicChanged || subjectChanged || gradeChanged) {
        const targetSubj = updated.subject;
        const targetTop = updated.topic;
        const targetLevel = updated.educationLevel;
        const targetGrade = updated.gradeOrProgramme || targetLevel;
        const targetLang = updated.language;
        const targetMode = updated.mode;

        const welcomeTitle = targetTop
          ? `${targetTop} - ${targetMode.toUpperCase()}`
          : targetSubj
          ? `${targetSubj} - ${targetMode.toUpperCase()}`
          : `${targetGrade} Studies`;

        const welcomeContent = targetSubj && targetTop
          ? `Welcome to **Nexovian AI Tutor**!\n\nTutor ready for **${targetTop}** (${targetSubj} · ${targetGrade}).\nMode: **${targetMode.toUpperCase()}** · Language: **${targetLang.toUpperCase()}**.\n\nAsk any question about **${targetTop}**, or choose a quick action below!`
          : targetSubj
          ? `Welcome to **Nexovian AI Tutor**!\n\nTutor ready for **${targetSubj}** (${targetGrade}).\nMode: **${targetMode.toUpperCase()}** · Language: **${targetLang.toUpperCase()}**.\n\nChoose a topic from the top bar or ask any question about **${targetSubj}** to begin!`
          : `Welcome to **Nexovian AI Tutor**!\n\nI am your interactive curriculum mentor for **${targetGrade}**.\nMode: **${targetMode.toUpperCase()}** · Language: **${targetLang.toUpperCase()}**.\n\nWhat would you like to study in **${targetGrade}** today? Select a subject and topic above, or ask any question to get started!`;

        const defaultFollowUps = targetSubj && targetTop
          ? [
              `What are the core concepts of ${targetTop}?`,
              `Can you give a real-world example of ${targetTop}?`,
              `How does ${targetTop} appear in tests or exams?`
            ]
          : targetSubj
          ? [
              `What are the most important topics in ${targetSubj}?`,
              `Can you give an overview of ${targetSubj} for ${targetGrade}?`,
              `Give me a starter practice question in ${targetSubj}.`
            ]
          : [
              `What subjects are available in ${targetGrade}?`,
              `Help me create a study plan for ${targetGrade}`,
              `Explain how exams are structured for ${targetGrade}`
            ];

        setUserProgress((p) => {
          // Check if user has an existing conversation matching this subject & topic
          const match = p.conversations.find((c) => c.subject === targetSubj && c.topic === targetTop);
          if (match) {
            return {
              ...p,
              activeConversationId: match.id
            };
          }

          const active = p.conversations.find((c) => c.id === p.activeConversationId) || p.conversations[0];
          const hasUserMessages = active?.messages.some((m) => m.role === 'user');
          if (active && !hasUserMessages) {
            const updatedConv: AIConversation = {
              ...active,
              title: welcomeTitle,
              educationLevel: targetLevel,
              gradeOrProgramme: targetGrade,
              subject: targetSubj,
              topic: targetTop,
              language: targetLang,
              mode: targetMode,
              updatedAt: new Date().toISOString(),
              messages: [
                {
                  id: `msg-${Date.now()}`,
                  role: 'assistant',
                  content: welcomeContent,
                  timestamp: new Date().toISOString(),
                  mode: targetMode,
                  summary: `${targetTop || targetSubj || targetGrade} Learning Overview`,
                  followUps: defaultFollowUps
                }
              ]
            };
            return {
              ...p,
              conversations: p.conversations.map((c) => (c.id === active.id ? updatedConv : c)),
              activeConversationId: updatedConv.id
            };
          }

          // Otherwise create a fresh conversation dedicated to this new context
          const newConv: AIConversation = {
            id: `conv-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            userId: 'learner-1',
            title: welcomeTitle,
            educationLevel: targetLevel,
            gradeOrProgramme: targetGrade,
            subject: targetSubj,
            topic: targetTop,
            language: targetLang,
            mode: targetMode,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            messages: [
              {
                id: `msg-${Date.now()}`,
                role: 'assistant',
                content: welcomeContent,
                timestamp: new Date().toISOString(),
                mode: targetMode,
                summary: `${targetTop || targetSubj || targetGrade} Learning Overview`,
                followUps: defaultFollowUps
              }
            ]
          };
          return {
            ...p,
            conversations: [newConv, ...p.conversations],
            activeConversationId: newConv.id
          };
        });
      }

      return updated;
    });
  };

  const markLessonComplete = (lessonId: string, xpBonus = 50) => {
    const todayStr = new Date().toISOString().split('T')[0];
    setUserProgress((prev) => {
      const alreadyCompleted = prev.completedLessonIds.includes(lessonId);
      const newCompleted = alreadyCompleted
        ? prev.completedLessonIds
        : [...prev.completedLessonIds, lessonId];

      const newLearnedDays = prev.learnedDays.includes(todayStr)
        ? prev.learnedDays
        : [...prev.learnedDays, todayStr];

      let newStreak = prev.currentStreakDays;
      if (prev.lastActiveDate !== todayStr) {
        newStreak += 1;
      }

      return {
        ...prev,
        completedLessonIds: newCompleted,
        learnedDays: newLearnedDays,
        currentStreakDays: newStreak,
        lastActiveDate: todayStr,
        lastActivityTimestamp: new Date().toISOString(),
        studyTimeMinutes: prev.studyTimeMinutes + 15,
        totalXp: prev.totalXp + (alreadyCompleted ? 0 : xpBonus)
      };
    });

    // Record into Adaptive Learning Engine
    recordPerformanceEvent({
      learnerId: 'guest_learner',
      gradeOrProgramme: learningContext.gradeOrProgramme || 'Grade 10',
      subject: activeTrack.title || 'Curriculum',
      topic: activeLesson?.title || 'Lesson Unit',
      lessonId,
      correct: true,
      score: 1,
      percentage: 100,
      difficulty: 'easy',
      timeSpentSeconds: (activeLesson?.durationMinutes || 15) * 60,
      attemptsCount: 1,
      hintsUsed: 0,
      source: 'lesson',
      completed: true
    });
  };

  const toggleBookmark = (lessonId: string) => {
    setUserProgress((prev) => {
      const isBookmarked = prev.bookmarkedLessonIds.includes(lessonId);
      return {
        ...prev,
        bookmarkedLessonIds: isBookmarked
          ? prev.bookmarkedLessonIds.filter((id) => id !== lessonId)
          : [...prev.bookmarkedLessonIds, lessonId]
      };
    });
  };

  const saveNote = (lessonId: string, lessonTitle: string, trackTitle: string, content: string) => {
    const todayStr = new Date().toISOString().split('T')[0];
    setUserProgress((prev) => ({
      ...prev,
      notes: {
        ...prev.notes,
        [lessonId]: {
          lessonId,
          lessonTitle,
          trackTitle,
          updatedAt: todayStr,
          content
        }
      },
      lastActivityTimestamp: new Date().toISOString()
    }));
  };

  const recordQuizScore = (lessonId: string, score: number) => {
    setUserProgress((prev) => {
      const prevBestScore = prev.lessonQuizScores?.[lessonId] ?? 0;
      const scoreImprovement = Math.max(0, score - prevBestScore);
      const earnedXp = Math.round(scoreImprovement * 0.5);
      const newBestScore = Math.max(prevBestScore, score);

      return {
        ...prev,
        lessonQuizScores: {
          ...prev.lessonQuizScores,
          [lessonId]: newBestScore
        },
        totalXp: prev.totalXp + earnedXp,
        lastActivityTimestamp: new Date().toISOString()
      };
    });
  };

  const setActiveTrackId = (trackId: string) => {
    setUserProgress((prev) => ({
      ...prev,
      activeTrackId: trackId
    }));
  };

  // ==========================================
  // VOICE & READ-ALOUD SYSTEM (ENGLISH & AFRIKAANS ONLY)
  // ==========================================
  const playNarration = (text: string, langCode: SALanguageCode = 'en', messageId: string = 'msg_narration') => {
    if (!audioState.supported || typeof window === 'undefined') return;

    if (!isTtsSupportedForLanguage(langCode)) {
      setAudioState((prev) => ({
        ...prev,
        isPlaying: false,
        voiceNotice: `Voice audio playback is only supported for English and Afrikaans. Text translation remains active.`
      }));
      return;
    }

    ttsManager.speakMessage(messageId, text, langCode);
  };

  const pauseNarration = () => {
    ttsManager.pause();
  };

  const resumeNarration = () => {
    ttsManager.resume();
  };

  const stopNarration = () => {
    ttsManager.stop();
  };

  const setSpeechRate = (rate: number) => {
    ttsManager.setSpeechRate(rate);
    setAudioState((prev) => ({ ...prev, rate }));
  };

  const setAutoPlayAnswers = (enabled: boolean) => {
    ttsManager.setAutoPlayAnswers(enabled);
    setAudioState((prev) => ({ ...prev, autoPlayAnswers: enabled }));
  };

  // ==========================================
  // AI CONVERSATION MANAGEMENT
  // ==========================================
  const createNewConversation = (title?: string): AIConversation => {
    const targetSubj = learningContext.subject;
    const targetTop = learningContext.topic;
    const targetGrade = learningContext.gradeOrProgramme || learningContext.educationLevel;
    const targetMode = learningContext.mode;

    const convTitle =
      title ||
      (targetTop
        ? `${targetTop} - ${targetMode.toUpperCase()}`
        : targetSubj
        ? `${targetSubj} - ${targetMode.toUpperCase()}`
        : `${targetGrade} Studies`);

    const convContent =
      targetSubj && targetTop
        ? `Tutor ready for **${targetTop}** (${targetSubj} · ${targetGrade}).\nMode: **${targetMode.toUpperCase()}** · Language: **${learningContext.language.toUpperCase()}**.\nAsk me any question or request step-by-step guidance!`
        : targetSubj
        ? `Tutor ready for **${targetSubj}** (${targetGrade}).\nMode: **${targetMode.toUpperCase()}** · Language: **${learningContext.language.toUpperCase()}**.\nChoose a topic above or ask any question to begin!`
        : `Tutor ready for **${targetGrade}**.\nMode: **${targetMode.toUpperCase()}** · Language: **${learningContext.language.toUpperCase()}**.\nWhat would you like to study today? Choose a subject above or ask any question to get started!`;

    const newConv: AIConversation = {
      id: `conv-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId: 'learner-1',
      title: convTitle,
      educationLevel: learningContext.educationLevel,
      gradeOrProgramme: learningContext.gradeOrProgramme,
      subject: targetSubj,
      topic: targetTop,
      language: learningContext.language,
      mode: targetMode,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: `msg-${Date.now()}`,
          role: 'assistant',
          content: convContent,
          timestamp: new Date().toISOString(),
          mode: targetMode
        }
      ]
    };

    setUserProgress((prev) => ({
      ...prev,
      conversations: [newConv, ...prev.conversations],
      activeConversationId: newConv.id
    }));

    return newConv;
  };

  const renameConversation = (id: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    setUserProgress((prev) => ({
      ...prev,
      conversations: prev.conversations.map((c) =>
        c.id === id ? { ...c, title: newTitle.trim(), updatedAt: new Date().toISOString() } : c
      )
    }));
  };

  const deleteConversation = (id: string) => {
    setUserProgress((prev) => {
      const remaining = prev.conversations.filter((c) => c.id !== id);
      const nextActive = remaining.length > 0 ? remaining[0].id : undefined;
      return {
        ...prev,
        conversations: remaining,
        activeConversationId: nextActive
      };
    });
  };

  const setActiveConversationId = (id: string) => {
    setUserProgress((prev) => {
      const conv = prev.conversations.find((c) => c.id === id);
      if (conv) {
        setLearningContext((current) => ({
          ...current,
          educationLevel: conv.educationLevel || current.educationLevel,
          gradeOrProgramme: conv.gradeOrProgramme || current.gradeOrProgramme,
          subject: conv.subject || current.subject,
          topic: conv.topic || current.topic,
          language: conv.language || current.language,
          mode: conv.mode || current.mode
        }));
        if (conv.language && conv.language !== activeLearningLanguage) {
          setActiveLearningLanguageState(conv.language);
          try {
            localStorage.setItem('nexovian_academy_language', conv.language);
            window.dispatchEvent(new CustomEvent('nexovian_language_changed', { detail: conv.language }));
          } catch {}
        }
      }
      return {
        ...prev,
        activeConversationId: id
      };
    });
  };

  const clearActiveConversation = () => {
    if (!activeConversation) return;
    setUserProgress((prev) => ({
      ...prev,
      conversations: prev.conversations.map((c) =>
        c.id === activeConversation.id
          ? {
              ...c,
              messages: [
                {
                  id: `msg-${Date.now()}`,
                  role: 'assistant',
                  content: `Conversation cleared. Ready for your next question in **${c.topic}**!`,
                  timestamp: new Date().toISOString(),
                  mode: c.mode
                }
              ],
              updatedAt: new Date().toISOString()
            }
          : c
      )
    }));
  };

  // ==========================================
  // SEND MESSAGE TO AI TUTOR
  // ==========================================
  const sendMessageToTutor = async (
    userQuestion: string,
    modeOverride?: AITutorMode,
    languageOverride?: SALanguageCode
  ) => {
    if (!userQuestion.trim()) return;
    const effectiveMode = modeOverride || learningContext.mode;
    const effectiveLang = languageOverride || learningContext.language;
    if (modeOverride && modeOverride !== learningContext.mode) {
      setLearningContext((prev) => ({ ...prev, mode: modeOverride }));
    }
    if (languageOverride && languageOverride !== learningContext.language) {
      setActiveLearningLanguage(languageOverride);
    }

    setLastPrompt(userQuestion);
    setTutorError(null);
    setIsTutorLoading(true);

    const userMsg: AIMessage = {
      id: `msg-u-${Date.now()}`,
      role: 'user',
      content: userQuestion.trim(),
      timestamp: new Date().toISOString(),
      mode: effectiveMode
    };

    // Ensure active conversation matches current topic
    let targetConv = activeConversation;
    if (!targetConv || targetConv.topic !== learningContext.topic || targetConv.subject !== learningContext.subject) {
      targetConv = createNewConversation();
    }

    // Append user message immediately
    setUserProgress((prev) => ({
      ...prev,
      questionsAskedCount: prev.questionsAskedCount + 1,
      totalXp: prev.totalXp + 5,
      lastActivityTimestamp: new Date().toISOString(),
      conversations: prev.conversations.map((c) =>
        c.id === targetConv!.id
          ? {
              ...c,
              messages: [...c.messages, userMsg],
              updatedAt: new Date().toISOString(),
              topic: learningContext.topic,
              subject: learningContext.subject,
              language: effectiveLang,
              mode: effectiveMode
            }
          : c
      )
    }));

    try {
      // Filter history: ensure only valid messages are included to prevent cross-subject contamination
      const history = (targetConv?.messages || [])
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .slice(-6)
        .map((m) => ({
          role: m.role,
          content: m.content
        }));

      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          userQuestion: userQuestion.trim(),
          message: userQuestion.trim(),
          conversationId: targetConv.id,
          selectedLanguage: effectiveLang,
          language: effectiveLang,
          educationLevel: learningContext.educationLevel,
          gradeOrProgramme: learningContext.gradeOrProgramme || learningContext.educationLevel,
          subject: learningContext.subject,
          module: learningContext.module,
          topic: learningContext.topic,
          lesson: learningContext.lesson,
          learningMode: effectiveMode,
          mode: effectiveMode,
          conversationHistory: history
        })
      });

      if (!res.ok) {
        const errorText = await res.text().catch(() => '');
        console.error('Tutor API error response:', res.status, errorText);
        throw new Error(`Server returned status ${res.status}: ${errorText.slice(0, 120) || res.statusText}`);
      }

      const text = await res.text();
      let data: any;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('Tutor response is not valid JSON:', text);
        throw parseError;
      }

      if (!data.success && !data.answer) {
        if (data.keyMissing) {
          throw new Error('Gemini API key is not configured. Please set the GEMINI_API_KEY environment variable in your server environment.');
        }
        throw new Error(data.message || "NEXOVIAN couldn't generate a response right now.");
      }

      const aiData = data.data || {};
      const rawContent = data.answer || aiData.content || aiData.text || '';
      const cleanContent = rawContent.split('---CACHE---')[0].trim();

      const aiMsg: AIMessage = {
        id: aiData.assistantMessage?.id || `msg-a-${Date.now()}`,
        role: 'assistant',
        content: cleanContent,
        timestamp: new Date().toISOString(),
        mode: effectiveMode,
        summary: aiData.summary || `Key study points for ${learningContext.topic}`,
        followUps: aiData.followUps || aiData.followUpSuggestions || [],
        cacheMetadata: aiData.cacheMetadata,
        isAiGenerated: aiData.isAiGenerated ?? true,
        disclaimer: aiData.disclaimer || 'NEXOVIAN Tutor · Built in Mpumalanga for South Africa',
        languageSource: aiData.languageSource,
        verificationStatus: aiData.verificationStatus,
        targetLanguage: aiData.languageUsed,
        verifiedPhrase: aiData.verifiedPhrase,
        hasVerifiedAudio: aiData.hasVerifiedAudio,
        audioUrl: aiData.audioUrl,
        audioStatus: aiData.audioStatus,
        requiresVerificationNotice: aiData.requiresVerificationNotice,
        verifiedPhrasesMatched: aiData.verifiedPhrasesMatched
      };

      setUserProgress((prev) => ({
        ...prev,
        practiceSessionsCount:
          effectiveMode === 'practice'
            ? prev.practiceSessionsCount + 1
            : prev.practiceSessionsCount,
        studyTimeMinutes: prev.studyTimeMinutes + 2,
        conversations: prev.conversations.map((c) =>
          c.id === targetConv!.id
            ? {
                ...c,
                messages: [...c.messages, aiMsg],
                updatedAt: new Date().toISOString()
              }
            : c
        )
      }));

      // Voice Auto-Play (only if explicitly enabled by learner in voice settings)
      if (ttsManager.getAutoPlayAnswers() && isTtsSupportedForLanguage(learningContext.language)) {
        setTimeout(() => {
          ttsManager.speakMessage(aiMsg.id, aiMsg.content, learningContext.language);
        }, 400);
      }
    } catch (err: any) {
      console.error('Tutor message error:', err);
      setTutorError(err?.message || "NEXOVIAN couldn't generate a response right now.");
    } finally {
      setIsTutorLoading(false);
    }
  };

  const retryLastMessage = () => {
    if (lastPrompt) {
      sendMessageToTutor(lastPrompt);
    }
  };

  const clearTutorError = () => {
    setTutorError(null);
  };

  // ==========================================
  // SAVED LEARNING AREA
  // ==========================================
  const saveLearningItem = (item: Omit<SavedLearningItem, 'id' | 'createdAt'>): SavedLearningItem => {
    const newItem: SavedLearningItem = {
      ...item,
      id: `saved-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString()
    };

    setUserProgress((prev) => ({
      ...prev,
      savedItems: [newItem, ...prev.savedItems],
      totalXp: prev.totalXp + 15,
      lastActivityTimestamp: new Date().toISOString()
    }));

    // Sync to server persistent storage
    fetch('/api/ai/saved', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newItem.title,
        content: newItem.content,
        subject: newItem.subject,
        topic: newItem.topic,
        language: newItem.language,
        type: newItem.type,
        conversationId: item.conversationId,
        messageId: item.messageId
      })
    }).catch(() => {});

    return newItem;
  };

  const removeSavedItem = (id: string) => {
    setUserProgress((prev) => ({
      ...prev,
      savedItems: prev.savedItems.filter((i) => i.id !== id)
    }));
    fetch(`/api/ai/saved/${id}`, { method: 'DELETE' }).catch(() => {});
  };

  // ==========================================
  // STUDY PLAN GENERATOR & MANAGER
  // ==========================================
  const createStudyPlan = async (availableTime?: string, targetDate?: string): Promise<StudyPlan> => {
    setIsTutorLoading(true);
    setTutorError(null);
    try {
      const res = await fetch('/api/ai/study-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          educationLevel: learningContext.educationLevel,
          gradeOrProgramme: learningContext.gradeOrProgramme,
          subject: learningContext.subject,
          topic: learningContext.topic,
          availableStudyTime: availableTime || '4 hours per week',
          targetDate: targetDate || 'Upcoming test in 3 weeks',
          language: learningContext.language
        })
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        if (json.keyMissing) {
          throw new Error('Gemini API key is not configured. Please set the GEMINI_API_KEY environment variable in your server environment.');
        }
        throw new Error(json.message || "NEXOVIAN couldn't generate a study plan right now.");
      }

      const plan: StudyPlan = json.data;
      setStudyPlans((prev) => [plan, ...prev.filter((p) => p.id !== plan.id)]);
      return plan;
    } catch (err: any) {
      console.error('Study plan generation error:', err);
      setTutorError(err?.message || "NEXOVIAN couldn't generate a study plan right now.");
      throw err;
    } finally {
      setIsTutorLoading(false);
    }
  };

  const removeStudyPlan = async (id: string) => {
    setStudyPlans((prev) => prev.filter((p) => p.id !== id));
    fetch(`/api/ai/study-plans/${id}`, { method: 'DELETE' }).catch(() => {});
  };

  // ==========================================
  // QUIZ GENERATOR ENGINE
  // ==========================================
  const generateQuiz = async (topicOverride?: string, quizRequest?: string): Promise<GeneratedQuiz> => {
    const targetTopic = topicOverride || learningContext.topic;
    setIsTutorLoading(true);
    setTutorError(null);

    // If quizRequest was not explicitly passed, inspect the active conversation's last user inquiry
    const lastUserInquiry = activeConversation?.messages
      ? [...activeConversation.messages].reverse().find((m) => m.role === 'user')?.content
      : undefined;
    const effectiveQuizRequest = quizRequest || lastUserInquiry;

    try {
      const res = await fetch('/api/ai/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          educationLevel: learningContext.educationLevel,
          gradeOrProgramme: learningContext.gradeOrProgramme,
          subject: learningContext.subject,
          topic: targetTopic,
          quizRequest: effectiveQuizRequest,
          questionCount: 3,
          selectedLanguage: learningContext.language
        })
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "NEXOVIAN couldn't generate a response right now.");
      }

      const quizData: GeneratedQuiz = json.data;
      setActiveGeneratedQuiz(quizData);
      return quizData;
    } catch (err: any) {
      console.error('Quiz generation error:', err);
      setTutorError("NEXOVIAN couldn't generate a response right now.");
      throw err;
    } finally {
      setIsTutorLoading(false);
    }
  };

  const recordQuizAttempt = (attempt: Omit<QuizAttempt, 'id' | 'completedAt'>): QuizAttempt => {
    const fullAttempt: QuizAttempt = {
      ...attempt,
      id: `att-${Date.now()}`,
      completedAt: new Date().toISOString()
    };

    setUserProgress((prev) => ({
      ...prev,
      quizAttempts: [fullAttempt, ...prev.quizAttempts],
      practiceSessionsCount: prev.practiceSessionsCount + 1,
      totalXp: prev.totalXp + fullAttempt.score * 10,
      lastActivityTimestamp: new Date().toISOString()
    }));

    // Record atomic performance event into Adaptive Learning Engine
    recordPerformanceEvent({
      learnerId: 'guest_learner',
      gradeOrProgramme: learningContext.gradeOrProgramme || 'Grade 10',
      subject: attempt.subject || 'General',
      topic: attempt.topic || 'General Practice',
      assessmentId: attempt.quizId,
      correct: attempt.percentage >= 60,
      score: attempt.score,
      percentage: attempt.percentage,
      difficulty: 'medium',
      timeSpentSeconds: 60,
      attemptsCount: 1,
      hintsUsed: 0,
      source: 'quiz',
      completed: true
    });

    // Learner Struggles AI: Detect topic struggle if percentage < 60 (2+ failures triggers AI diagnostics)
    if (attempt.percentage < 60) {
      learnerStrugglesService.recordTopicFailure({
        subject: attempt.subject || 'General',
        topic: attempt.topic || 'General Practice',
        grade: learningContext.gradeOrProgramme || 'Grade 10'
      }).catch((err) => console.warn('[LearnerStruggles] Failed to record topic struggle:', err));
    }

    return fullAttempt;
  };

  // ==========================================
  // PHASE 3: SCAN & LEARN MULTIMODAL FUNCTIONS
  // ==========================================
  const analyzeScannedImage = async (params: {
    imageBase64: string;
    mimeType?: string;
    question?: string;
    mode?: ScanMode;
    educationLevel?: string;
    gradeOrProgramme?: string;
    subject?: string;
    module?: string;
    topic?: string;
    language?: SALanguageCode;
  }): Promise<ScanSession> => {
    setIsScanLoading(true);
    setScanError(null);

    try {
      const res = await fetch('/api/ai/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: params.imageBase64,
          mimeType: params.mimeType || 'image/jpeg',
          question: params.question || 'Please explain what is shown in this image.',
          mode: params.mode || 'explain',
          educationLevel: params.educationLevel || learningContext.educationLevel,
          gradeOrProgramme: params.gradeOrProgramme || learningContext.gradeOrProgramme,
          subject: params.subject || learningContext.subject,
          module: params.module || learningContext.module,
          topic: params.topic || learningContext.topic,
          language: params.language || learningContext.language
        })
      });

      const text = await res.text();
      let json: any = null;
      try {
        json = text ? JSON.parse(text) : null;
      } catch (e) {
        console.error("Invalid JSON:", text);
        throw new Error("AI server not configured. Please add GEMINI_API_KEY in Vercel env vars and redeploy.");
      }

      if (res.status === 429 || json?.error === "LIMIT_REACHED") {
        const quotaErr: any = new Error(json?.message || "Daily AI limit reached. NEXOVIAN uses Google Gemini free tier (50 scans/day). Limit resets at midnight SAST. Try tomorrow or upgrade to NEXOVIAN Pro for unlimited.");
        quotaErr.isQuota = true;
        quotaErr.quotaData = json;
        throw quotaErr;
      }

      if (!res.ok || !json?.success) {
        if (json?.keyMissing || json?.error === "GEMINI_API_KEY_MISSING") {
          throw new Error('Gemini API key is not configured. Please set GEMINI_API_KEY in your server environment.');
        }
        throw new Error(json?.message || json?.error || `Server error ${res.status}: ${text.slice(0, 140)}`);
      }

      const session: ScanSession = json.data.session;
      setActiveScanSession(session);
      setScanSessions((prev) => [session, ...prev.filter((s) => s.id !== session.id)]);
      return session;
    } catch (err: any) {
      console.error('Scan analysis error:', err);
      const msg = err?.message || "NEXOVIAN couldn't analyze the scanned image right now.";
      setScanError(msg);
      throw err;
    } finally {
      setIsScanLoading(false);
    }
  };

  const sendScanFollowUp = async (
    sessionId: string,
    message: string,
    imageBase64?: string,
    mimeType?: string
  ): Promise<ScanSessionMessage> => {
    if (!message.trim()) {
      throw new Error('Follow-up question cannot be empty.');
    }
    setIsScanLoading(true);
    setScanError(null);

    try {
      const res = await fetch('/api/ai/scan/followup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: message.trim(),
          imageBase64,
          mimeType,
          language: learningContext.language
        })
      });

      const text = await res.text();
      let json: any = null;
      try {
        json = text ? JSON.parse(text) : null;
      } catch (e) {
        console.error("Invalid JSON:", text);
        throw new Error("AI server not configured. Please add GEMINI_API_KEY in Vercel env vars and redeploy.");
      }

      if (res.status === 429 || json?.error === "LIMIT_REACHED") {
        throw new Error(json?.message || "Daily AI limit reached.");
      }

      if (!res.ok || !json?.success) {
        throw new Error(json?.message || "NEXOVIAN couldn't process your follow-up question.");
      }

      const updatedSession: ScanSession = json.data.session;
      const assistantMessage: ScanSessionMessage = json.data.assistantMessage;

      setActiveScanSession(updatedSession);
      setScanSessions((prev) =>
        prev.map((s) => (s.id === sessionId ? updatedSession : s))
      );

      return assistantMessage;
    } catch (err: any) {
      console.error('Scan follow-up error:', err);
      const msg = err?.message || "NEXOVIAN couldn't process your follow-up question.";
      setScanError(msg);
      throw err;
    } finally {
      setIsScanLoading(false);
    }
  };

  const saveScanSession = async (session: ScanSession) => {
    const updated = { ...session, saved: !session.saved, updatedAt: new Date().toISOString() };
    setActiveScanSession(updated);
    setScanSessions((prev) => prev.map((s) => (s.id === session.id ? updated : s)));

    // Also add to saved items library if newly saved
    if (updated.saved) {
      saveLearningItem({
        type: 'scan_session',
        title: updated.title,
        content: `**Question:** ${updated.initialQuestion}\n\n**AI Explanation:**\n${updated.aiExplanation}`,
        subject: updated.subject,
        topic: updated.topic,
        language: updated.language,
        tags: ['Scan & Learn', updated.mode, updated.gradeOrProgramme],
        metadata: {
          sessionId: updated.id,
          thumbnail: updated.thumbnail?.slice(0, 1000)
        }
      });
    }

    fetch('/api/ai/scan/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    }).catch(() => {});
  };

  const deleteScanSession = async (sessionId: string) => {
    setScanSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (activeScanSession?.id === sessionId) {
      setActiveScanSession(null);
    }
    fetch(`/api/ai/scan/sessions/${sessionId}`, { method: 'DELETE' }).catch(() => {});
  };

  return (
    <LearningContext.Provider
      value={{
        tracks,
        userProgress,
        activeTrack,
        activeLesson,
        activeLessonId,
        currentTab,
        setCurrentTab,
        openLesson,
        closeLesson,
        markLessonComplete,
        toggleBookmark,
        saveNote,
        recordQuizScore,
        setActiveTrackId,
        isSearchOpen,
        setIsSearchOpen,
        isPwaPromptOpen,
        setIsPwaPromptOpen,
        isOffline,
        theme,
        toggleTheme,
        audioState,
        playNarration,
        pauseNarration,
        resumeNarration,
        stopNarration,
        setSpeechRate,
        setAutoPlayAnswers,

        // Gemini AI Status
        geminiStatus,
        checkGeminiStatus,

        // Multilingual Unified Learning State
        activeLearningLanguage,
        setActiveLearningLanguage,

        // Phase 2
        learningContext,
        updateLearningContext,
        conversations: userProgress.conversations,
        activeConversation,
        createNewConversation,
        renameConversation,
        deleteConversation,
        setActiveConversationId,
        sendMessageToTutor,
        isTutorLoading,
        tutorError,
        clearTutorError,
        retryLastMessage,
        clearActiveConversation,

        savedItems: userProgress.savedItems,
        saveLearningItem,
        removeSavedItem,

        activeGeneratedQuiz,
        setActiveGeneratedQuiz,
        generateQuiz,
        recordQuizAttempt,

        // Study Plans
        studyPlans,
        createStudyPlan,
        removeStudyPlan,

        // Phase 3: Scan & Learn
        scanSessions,
        activeScanSession,
        setActiveScanSession,
        isScanLoading,
        scanError,
        clearScanError,
        analyzeScannedImage,
        sendScanFollowUp,
        saveScanSession,
        deleteScanSession,

        // Phase 5: Adaptive Learning Engine
        adaptiveProfile,
        performanceEvents,
        masteryThresholds,
        recordPerformanceEvent,
        updateMasteryThresholds,
        seedSampleAdaptiveData,
        clearAdaptiveData
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
