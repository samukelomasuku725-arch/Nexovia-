import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  Copy,
  Check,
  BookmarkPlus,
  RotateCcw,
  Trash2,
  Edit2,
  Plus,
  MessageSquare,
  AlertCircle,
  HelpCircle,
  PenTool,
  Calendar,
  Layers,
  Lightbulb,
  Globe,
  FileQuestion,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { ContextSelectorBar } from './ContextSelectorBar';
import { PracticeQuizModal } from './PracticeQuizModal';
import { StudyPlanModal } from './StudyPlanModal';
import { AI_TUTOR_MODES, SA_LANGUAGES } from '../../data/learningContextData';
import { APP_CONFIG } from '../../config/brand';
import { AITutorMode } from '../../types';
import { VoiceInputButton } from '../voice/VoiceInputButton';
import { MessageAudioControls } from '../voice/MessageAudioControls';
import { VoiceSettingsModal } from '../voice/VoiceSettingsModal';
import { XitsongaPhrasebookModal } from '../language/XitsongaPhrasebookModal';
import { languageEngine } from '../../services/language/languageEngine';
import { SpeakerButton } from '../audio/SpeakerButton';
import { PronunciationDisplay } from '../audio/PronunciationDisplay';
import { PronunciationPracticeModal } from '../audio/PronunciationPracticeModal';
import { LanguageRecord } from '../../types/language';

export const AITutorView: React.FC = () => {
  const {
    learningContext,
    conversations,
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
    saveLearningItem,
    playNarration,
    stopNarration,
    audioState,
    activeGeneratedQuiz,
    setActiveGeneratedQuiz,
    generateQuiz,
    geminiStatus,
    checkGeminiStatus,
    setCurrentTab
  } = useLearning();

  const [inputMessage, setInputMessage] = useState('');
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [savedMsgId, setSavedMsgId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingConvId, setEditingConvId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [isStudyPlanOpen, setIsStudyPlanOpen] = useState(false);
  const [isVoiceSettingsOpen, setIsVoiceSettingsOpen] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [isPhrasebookOpen, setIsPhrasebookOpen] = useState(false);
  const [practicePhrase, setPracticePhrase] = useState<LanguageRecord | null>(null);
  const [translatingForMsgId, setTranslatingForMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const currentLangObj =
    SA_LANGUAGES.find((l) => l.code === learningContext.language) || SA_LANGUAGES[0];
  const modeKey = (learningContext.mode || 'explain').toLowerCase();
  const currentModeObj =
    AI_TUTOR_MODES.find((m) => m.id.toLowerCase() === modeKey) || AI_TUTOR_MODES[0];

  // Auto-scroll messages to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages, isTutorLoading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isTutorLoading) return;
    const msg = inputMessage;
    setInputMessage('');
    await sendMessageToTutor(msg);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 1500);
  };

  const handleSaveResponse = (msg: any) => {
    saveLearningItem({
      type: learningContext.mode === 'summarize' ? 'summary' : 'explanation',
      title: `${learningContext.topic} - ${learningContext.mode.toUpperCase()}`,
      content: msg.content,
      subject: learningContext.subject,
      topic: learningContext.topic,
      language: learningContext.language,
      conversationId: activeConversation?.id,
      messageId: msg.id,
      tags: [learningContext.subject, learningContext.gradeOrProgramme || learningContext.educationLevel]
    });
    setSavedMsgId(msg.id);
    setTimeout(() => setSavedMsgId(null), 2000);
  };

  const handleVoicePlay = (text: string) => {
    if (audioState.isPlaying) {
      stopNarration();
    } else {
      playNarration(text, learningContext.language);
    }
  };

  const handleStartRename = (id: string, currentTitle: string) => {
    setEditingConvId(id);
    setEditingTitle(currentTitle);
  };

  const handleSaveRename = (id: string) => {
    renameConversation(id, editingTitle);
    setEditingConvId(null);
  };

  const handleCreateQuiz = async (specificRequest?: string | React.MouseEvent) => {
    try {
      const explicitStr = typeof specificRequest === 'string' ? specificRequest : undefined;
      const lastUserQuestion = [...(activeConversation?.messages || [])]
        .reverse()
        .find((m) => m.role === 'user')?.content;
      await generateQuiz(undefined, explicitStr || lastUserQuestion);
    } catch {
      // handled in context
    }
  };

  // Learning Action Handlers — strictly preserving subject, topic, and grade context
  const handlePracticeThis = async () => {
    await sendMessageToTutor(
      `Generate 2-3 focused practice questions for ${learningContext.topic} (${learningContext.subject}, ${learningContext.gradeOrProgramme || learningContext.educationLevel}) with progressive difficulty. Give me hints first rather than full answers.`,
      'practice'
    );
  };

  const handleExplainSimpler = async () => {
    await sendMessageToTutor(
      `Can you explain ${learningContext.topic} (${learningContext.subject}, ${learningContext.gradeOrProgramme || learningContext.educationLevel}) much more simply using an intuitive everyday South African analogy?`,
      'simplify'
    );
  };

  const handleGiveExample = async () => {
    await sendMessageToTutor(
      `Can you provide a concrete, step-by-step real-world example illustrating ${learningContext.topic} (${learningContext.subject}, ${learningContext.gradeOrProgramme || learningContext.educationLevel})?`,
      'explain'
    );
  };

  const handleTranslateToggle = (msgId: string) => {
    setTranslatingForMsgId((prev) => (prev === msgId ? null : msgId));
  };

  const handleSelectTranslationLanguage = async (targetLang: { code: string; name: string }) => {
    setTranslatingForMsgId(null);
    await sendMessageToTutor(
      `Please translate and explain the key concepts of ${learningContext.topic} (${learningContext.subject}, ${learningContext.gradeOrProgramme || learningContext.educationLevel}) into ${targetLang.name}. Retain all scientific formulas, equations, and curriculum depth accurately.`,
      'translate',
      targetLang.code as any
    );
  };

  const handleCheckKeyStatus = async () => {
    setIsCheckingStatus(true);
    await checkGeminiStatus();
    setIsCheckingStatus(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
      {/* Interactive Curriculum & Language Context Selector Bar */}
      <ContextSelectorBar />

      {/* Main Chat Deck */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Conversations History Sidebar / Drawer */}
        <aside
          className={`absolute md:static top-0 bottom-0 left-0 z-20 w-72 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          {/* Sidebar Header */}
          <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Conversations
            </span>
            <button
              onClick={() => {
                createNewConversation();
                setIsSidebarOpen(false);
              }}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-transform active:scale-95 shadow-sm"
              title="Start a fresh conversation"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New</span>
            </button>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {conversations.map((conv) => {
              const isActive = activeConversation?.id === conv.id;
              const isEditing = editingConvId === conv.id;

              return (
                <div
                  key={conv.id}
                  className={`group rounded-xl p-2 transition-colors flex items-center justify-between gap-2 text-xs ${
                    isActive
                      ? 'bg-amber-500/15 text-slate-950 dark:text-amber-300 font-semibold border border-amber-500/30'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {isEditing ? (
                    <div className="flex-1 flex items-center gap-1">
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded px-1.5 py-0.5 text-xs text-slate-900 dark:text-white"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSaveRename(conv.id)}
                        className="p-1 text-emerald-600 hover:text-emerald-700"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setActiveConversationId(conv.id);
                        setIsSidebarOpen(false);
                      }}
                      className="flex-1 text-left truncate flex items-center gap-2"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="truncate">{conv.title}</span>
                    </button>
                  )}

                  {!isEditing && (
                    <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleStartRename(conv.id, conv.title)}
                        className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        title="Rename conversation"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      {conversations.length > 1 && (
                        <button
                          onClick={() => deleteConversation(conv.id)}
                          className="p-1 text-slate-400 hover:text-rose-500"
                          title="Delete conversation"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Action Tools from Sidebar */}
          <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <button
              onClick={() => {
                setIsStudyPlanOpen(true);
                setIsSidebarOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              <span>Create Study Plan</span>
            </button>

            <button
              onClick={handleCreateQuiz}
              disabled={isTutorLoading}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <PenTool className="w-3.5 h-3.5 text-amber-500" />
              <span>Practice Quiz</span>
            </button>
          </div>
        </aside>

        {/* Backdrop for Mobile Sidebar */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden fixed inset-0 bg-black/40 z-10"
          />
        )}

        {/* Chat Stream & Interaction Stage */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50/50 dark:bg-slate-950">
          {/* Active Context Banner Bar */}
          <div className="px-4 py-2 bg-slate-100/70 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2 truncate">
              <button
                onClick={() => setCurrentTab('home')}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-2xs mr-1 shrink-0"
                title="Return to Home Dashboard"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Home</span>
              </button>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden p-1 text-slate-600 dark:text-slate-300 hover:bg-slate-200 rounded"
                title="Toggle conversation list"
              >
                <Layers className="w-4 h-4" />
              </button>
              <span className="font-semibold text-amber-600 dark:text-amber-400">
                {learningContext.subject}
              </span>
              <span aria-hidden="true">·</span>
              <span className="truncate">{learningContext.topic}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-[11px] uppercase bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300">
                {currentLangObj.name} ({learningContext.mode})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsVoiceSettingsOpen(true)}
                className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:text-amber-500 py-1 px-2 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
                title="Voice Learning & Audio Settings"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Voice Settings</span>
              </button>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700">·</span>
              <button
                onClick={() => setIsStudyPlanOpen(true)}
                className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Study Plan</span>
              </button>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700">·</span>
              <button
                onClick={clearActiveConversation}
                className="text-[11px] text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="Clear message history in this chat"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Nexovia Xitsonga Language Engine Active Banner */}
          {learningContext.language === 'ts' && (
            <div className="px-4 py-2.5 bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-transparent border-b border-amber-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-2xs">
                  TS
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                    <span>Nexovia Xitsonga Language Engine Active</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono font-bold">
                      140 Entries · 80 Verified Native
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Database First — AI Second · Controlled native vocabulary prioritized · Strictly no invented translations
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPhrasebookOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs shadow-xs transition-transform active:scale-95 shrink-0"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Xitsonga Phrasebook</span>
                </button>
              </div>
            </div>
          )}

          {/* Gemini API Key Missing Notice */}
          {geminiStatus.checked && !geminiStatus.configured && (
            <div className="px-4 py-2.5 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900/60 flex items-center justify-between gap-3 text-xs text-amber-900 dark:text-amber-200">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>
                  <strong>Setup Required:</strong> GEMINI_API_KEY is not configured in the server environment. Set GEMINI_API_KEY in your server environment secrets to activate real AI responses.
                </span>
              </div>
              <button
                onClick={handleCheckKeyStatus}
                disabled={isCheckingStatus}
                className="flex items-center gap-1 px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg font-bold text-[11px] transition-colors shrink-0 shadow-xs"
              >
                <RefreshCw className={`w-3 h-3 ${isCheckingStatus ? 'animate-spin' : ''}`} />
                <span>Check Status</span>
              </button>
            </div>
          )}

          {/* Voice Availability Banner */}
          {audioState.voiceNotice && (
            <div className="px-4 py-1.5 bg-amber-50 dark:bg-amber-950/40 text-[11px] text-amber-800 dark:text-amber-300 border-b border-amber-200 dark:border-amber-900/50 flex items-center justify-between">
              <span>{audioState.voiceNotice}</span>
              <button
                onClick={() => stopNarration()}
                className="text-amber-900 dark:text-amber-200 font-bold ml-2"
              >
                ✕
              </button>
            </div>
          )}

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {(!activeConversation || activeConversation.messages.length === 0) && (
              <div className="max-w-lg mx-auto my-auto text-center py-8 px-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xl mx-auto mb-4 shadow-md">
                  ✦
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {APP_CONFIG.appName} AI Tutor
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                  Ready to assist in <strong className="text-slate-700 dark:text-slate-300">{learningContext.subject}</strong>: {learningContext.topic} ({learningContext.gradeOrProgramme || learningContext.educationLevel}) in <strong className="text-slate-700 dark:text-slate-300">{currentLangObj.name}</strong>.
                </p>

                <div className="mt-6 flex flex-col gap-2">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-left">
                    Suggested Inquiries:
                  </span>
                  <button
                    onClick={() =>
                      sendMessageToTutor(
                        `Explain the fundamental concepts of ${learningContext.topic} step-by-step for ${learningContext.gradeOrProgramme || learningContext.educationLevel}.`
                      )
                    }
                    className="p-3 bg-white dark:bg-slate-900 hover:bg-amber-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-left text-slate-700 dark:text-slate-200 transition-colors shadow-sm"
                  >
                    💡 "Explain the fundamental concepts of {learningContext.topic} step-by-step."
                  </button>
                  <button
                    onClick={() =>
                      sendMessageToTutor(
                        `Give me a practical everyday South African analogy to simplify ${learningContext.topic}.`,
                        'simplify'
                      )
                    }
                    className="p-3 bg-white dark:bg-slate-900 hover:bg-amber-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-left text-slate-700 dark:text-slate-200 transition-colors shadow-sm"
                  >
                    ✨ "Give me a practical everyday analogy to simplify {learningContext.topic}."
                  </button>
                  <button
                    onClick={() =>
                      sendMessageToTutor(
                        `Generate 2-3 realistic practice questions for ${learningContext.topic} with progressive difficulty.`,
                        'practice'
                      )
                    }
                    className="p-3 bg-white dark:bg-slate-900 hover:bg-amber-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-left text-slate-700 dark:text-slate-200 transition-colors shadow-sm"
                  >
                    🎯 "Practice this: Generate 2-3 realistic practice questions for {learningContext.topic}."
                  </button>
                  <button
                    onClick={() => setIsStudyPlanOpen(true)}
                    className="p-3 bg-white dark:bg-slate-900 hover:bg-amber-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-left text-slate-700 dark:text-slate-200 transition-colors shadow-sm"
                  >
                    📅 "Create a study plan for {learningContext.topic}."
                  </button>
                </div>
              </div>
            )}

            {activeConversation?.messages.map((msg) => {
              const isAssistant = msg.role === 'assistant';

              return (
                <div
                  key={msg.id}
                  className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-3xl rounded-2xl p-4 sm:p-5 shadow-sm transition-all ${
                      isAssistant
                        ? 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                        : 'bg-amber-400 text-slate-950 font-medium ml-8'
                    }`}
                  >
                    {/* Assistant Message Header */}
                    {isAssistant && (
                      <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="w-5 h-5 rounded bg-slate-900 dark:bg-amber-500 text-amber-400 dark:text-slate-950 flex items-center justify-center font-bold text-[10px]">
                            ✦
                          </span>
                          <span className="font-bold text-slate-900 dark:text-white">
                            {APP_CONFIG.appName} AI Tutor
                          </span>
                          {msg.languageSource === 'verified_language_engine' && (
                            <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-mono px-2 py-0.5 rounded-full font-bold flex items-center gap-1 shadow-2xs">
                              <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                              VERIFIED LEXICON
                            </span>
                          )}
                          {msg.isAiGenerated && learningContext.language === 'ts' && msg.languageSource !== 'verified_language_engine' && (
                            <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono px-1.5 py-0.5 rounded uppercase">
                              AI-GENERATED
                            </span>
                          )}
                          {msg.mode && (
                            <span className="text-[10px] bg-amber-500/10 text-amber-700 dark:text-amber-400 font-mono px-1.5 py-0.5 rounded uppercase">
                              {msg.mode}
                            </span>
                          )}
                        </div>

                        {/* Top Utility Buttons */}
                        <div className="flex items-center gap-1">
                          {/* Audio read-aloud controls (Listen, Pause, Resume, Stop) */}
                          <MessageAudioControls
                            messageId={msg.id}
                            content={msg.content}
                            language={learningContext.language}
                            onOpenCapabilityModal={() => setIsVoiceSettingsOpen(true)}
                          />

                          {/* Copy button */}
                          <button
                            onClick={() => handleCopy(msg.id, msg.content)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            title="Copy text"
                          >
                            {copiedMsgId === msg.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>

                          {/* Save response button */}
                          <button
                            onClick={() => handleSaveResponse(msg)}
                            className="p-1.5 text-slate-500 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            title="Save response to personal library"
                          >
                            {savedMsgId === msg.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <BookmarkPlus className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Content formatted with markdown styling */}
                    <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans">
                      {msg.content}
                    </div>

                    {/* Phase 3: Verified Phrase Pronunciation Card if direct translation retrieved */}
                    {isAssistant && msg.verifiedPhrase && (
                      <div className="mt-3">
                        <PronunciationDisplay
                          phrase={msg.verifiedPhrase}
                          english={msg.verifiedPhrase.english}
                          xitsonga={msg.verifiedPhrase.xitsonga}
                          pronunciation={msg.verifiedPhrase.pronunciation}
                          pronunciationStatus={msg.verifiedPhrase.pronunciationStatus}
                          audioUrl={msg.verifiedPhrase.audioUrl}
                          audioStatus={msg.verifiedPhrase.audioStatus}
                          voiceSource={msg.verifiedPhrase.voiceSource}
                          onPracticeClick={() => setPracticePhrase(msg.verifiedPhrase)}
                        />
                      </div>
                    )}

                    {/* Phase 3: Verification Notice if translation unverified / pending */}
                    {isAssistant && msg.requiresVerificationNotice && (
                      <div className="mt-3 p-3 rounded-xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs">
                        <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200">
                          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                          <span>Nexovia Language Engine Notice: Unverified Translation</span>
                        </div>
                        <p className="mt-1 text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed">
                          Nexovia strictly prohibits artificial translation guessing. This phrase is tracked and flagged for native speaker curriculum verification. English explanations remain available.
                        </p>
                      </div>
                    )}

                    {/* Detected Verified Xitsonga terms tag if active */}
                    {isAssistant && learningContext.language === 'ts' && (() => {
                      const matched = languageEngine.findMatchingVerifiedPhrases(msg.content);
                      if (matched.length === 0) return null;
                      return (
                        <div className="mt-3 p-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800 text-xs">
                          <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300 text-[11px] mb-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span>Verified Native Xitsonga Vocabulary In Use:</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-1.5">
                            {matched.slice(0, 5).map((m) => (
                              <div
                                key={m.id}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 font-semibold text-[10px]"
                              >
                                <span>{m.xitsonga}</span>
                                <span className="opacity-75">({m.english})</span>
                                <SpeakerButton
                                  audioUrl={m.audioUrl}
                                  audioStatus={m.audioStatus}
                                  voiceSource={m.voiceSource}
                                  phraseText={m.xitsonga}
                                  size="sm"
                                  showLabel={false}
                                  className="min-h-5 min-w-5 p-0.5 ml-0.5 border-0 bg-transparent hover:bg-emerald-200/50"
                                />
                                <button
                                  onClick={() => setPracticePhrase(m)}
                                  className="px-1 py-0.5 ml-0.5 rounded text-[9px] font-bold bg-emerald-200 dark:bg-emerald-800/80 hover:bg-emerald-300 dark:hover:bg-emerald-700 text-emerald-900 dark:text-emerald-100 transition-colors"
                                  title="Practice pronunciation"
                                >
                                  Practice
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Disclaimer badge */}
                    {isAssistant && (
                      <div className="mt-3 pt-2 text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5 border-t border-slate-100/60 dark:border-slate-800/60">
                        <ShieldCheck className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>
                          {msg.disclaimer || (learningContext.language === 'ts'
                            ? 'Nexovia Xitsonga Language Engine · Controlled native-verified vocabulary prioritized · Unverified terms retain English meaning'
                            : 'AI-generated educational explanation · Not official CAPS curriculum content')}
                        </span>
                      </div>
                    )}

                    {/* LEARNING ACTIONS ROW (Practice, Simplify, Example, Translate, Quiz, Save) */}
                    {isAssistant && (
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                          Next Learning Actions:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          <button
                            onClick={handlePracticeThis}
                            className="flex items-center gap-1 text-xs bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 font-semibold px-2.5 py-1.5 rounded-lg border border-amber-500/20 transition-colors"
                          >
                            <span>🎯 Practice this</span>
                          </button>
                          <button
                            onClick={handleExplainSimpler}
                            className="flex items-center gap-1 text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
                          >
                            <span>💡 Explain simpler</span>
                          </button>
                          <button
                            onClick={handleGiveExample}
                            className="flex items-center gap-1 text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
                          >
                            <span>✨ Give me an example</span>
                          </button>
                          <div className="relative">
                            <button
                              onClick={() => handleTranslateToggle(msg.id)}
                              className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-colors ${
                                translatingForMsgId === msg.id
                                  ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-400 text-amber-900 dark:text-amber-200 font-semibold'
                                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                              }`}
                              title="Translate this explanation into a South African language"
                            >
                              <span>🌐 Translate</span>
                            </button>
                            {translatingForMsgId === msg.id && (
                              <div className="absolute left-0 bottom-full mb-2 z-30 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-1.5 max-h-56 overflow-y-auto">
                                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                                  Translate explanation to:
                                </div>
                                {SA_LANGUAGES.map((lang) => (
                                  <button
                                    key={lang.code}
                                    onClick={() => handleSelectTranslationLanguage(lang)}
                                    className={`w-full text-left px-2 py-1.5 text-xs rounded-lg transition-colors flex items-center justify-between ${
                                      learningContext.language === lang.code
                                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-bold'
                                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                                    }`}
                                  >
                                    <span>{lang.name}</span>
                                    <span className="text-[10px] text-slate-400 uppercase font-mono">{lang.code}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => handleCreateQuiz(msg.content)}
                            className="flex items-center gap-1 text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
                          >
                            <span>📝 Quiz me</span>
                          </button>
                          <button
                            onClick={() => handleSaveResponse(msg)}
                            className="flex items-center gap-1 text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
                          >
                            <span>{savedMsgId === msg.id ? '✓ Saved' : '🔖 Save this'}</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Follow-up suggestions if available */}
                    {isAssistant && msg.followUps && msg.followUps.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100/60 dark:border-slate-800/60">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                          Follow-up Questions:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.followUps.map((fu, fIdx) => (
                            <button
                              key={fIdx}
                              onClick={() => sendMessageToTutor(fu)}
                              className="text-left text-xs bg-slate-50 dark:bg-slate-800/70 hover:bg-amber-100 dark:hover:bg-amber-950/40 text-slate-700 dark:text-slate-300 px-2.5 py-1.5 rounded-lg border border-slate-200/80 dark:border-slate-700 transition-colors"
                            >
                              {fu}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing / Loading Indicator */}
            {isTutorLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex items-center gap-3">
                  <span className="w-5 h-5 rounded bg-slate-900 dark:bg-amber-500 text-amber-400 dark:text-slate-950 flex items-center justify-center font-bold text-[10px] animate-pulse">
                    ✦
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span>Synthesizing response for {learningContext.topic}</span>
                    <span className="flex gap-1 ml-1">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce"
                        style={{ animationDelay: '0ms' }}
                      />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce"
                        style={{ animationDelay: '150ms' }}
                      />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce"
                        style={{ animationDelay: '300ms' }}
                      />
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message with Friendly Details & Retry Button */}
            {tutorError && (
              <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-rose-800 dark:text-rose-300">
                <div className="flex items-start sm:items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5 sm:mt-0" />
                  <span>{tutorError}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={retryLastMessage}
                    className="flex items-center gap-1 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold transition-colors shadow-sm"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retry</span>
                  </button>
                  <button
                    onClick={clearTutorError}
                    className="px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-lg font-semibold transition-colors shadow-sm"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Sticky Input Bar at Bottom (Engineered for Android thumb ergonomics) */}
          <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 shrink-0">
            {/* Quick Xitsonga phrase chips if language is Xitsonga */}
            {learningContext.language === 'ts' && (
              <div className="max-w-4xl mx-auto flex items-center gap-1.5 overflow-x-auto pb-2 mb-1 scrollbar-none text-xs">
                <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 shrink-0 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Native Phrases:</span>
                </span>
                {[
                  { en: 'Please explain', ts: 'Mundyondisi, nikombela uhlamisela' },
                  { en: "I don't understand", ts: 'Andzi Twisisi' },
                  { en: 'Calculate this', ts: 'Bala leswi' },
                  { en: "Let's start", ts: 'Ahi sungule' },
                  { en: 'Send question', ts: 'Nisendeli xi vhutiso' },
                  { en: 'What is this?', ts: 'Iyini lexi' }
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setInputMessage(chip.ts)}
                    className="shrink-0 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-300/80 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-[11px] font-medium transition-colors"
                  >
                    <span className="font-bold">{chip.ts}</span>
                    <span className="opacity-70 text-[9px] ml-1">({chip.en})</span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setIsPhrasebookOpen(true)}
                  className="shrink-0 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-bold hover:bg-slate-200"
                >
                  + All 80
                </button>
              </div>
            )}

            <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex items-end gap-2">
              <div className="flex-1 relative bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-amber-500/40 focus-within:border-amber-500 flex items-end">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder={currentModeObj.placeholderText}
                  rows={2}
                  className="flex-1 p-3 bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 resize-none focus:outline-none leading-relaxed"
                />

                {/* Voice Input Microphone Button */}
                <div className="p-1.5 pb-2">
                  <VoiceInputButton
                    language={learningContext.language}
                    disabled={isTutorLoading}
                    onTranscriptionReady={(transcribed) => {
                      setInputMessage((prev) => (prev ? `${prev.trim()} ${transcribed}` : transcribed));
                      setTimeout(() => {
                        inputRef.current?.focus();
                      }, 50);
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!inputMessage.trim() || isTutorLoading}
                className="min-h-[48px] min-w-[48px] flex items-center justify-center bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 rounded-xl font-bold shadow-md transition-all active:scale-95 shrink-0"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>

            <div className="max-w-4xl mx-auto flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
              <span>Shift + Enter for new line · Press Enter to send</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsStudyPlanOpen(true)}
                  className="text-amber-600 dark:text-amber-400 font-semibold hover:underline"
                >
                  Study Plan
                </button>
                <span>·</span>
                <button
                  onClick={handleCreateQuiz}
                  className="text-amber-600 dark:text-amber-400 font-semibold hover:underline"
                >
                  Practice Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Quiz Modal */}
      {activeGeneratedQuiz && (
        <PracticeQuizModal
          quiz={activeGeneratedQuiz}
          onClose={() => setActiveGeneratedQuiz(null)}
        />
      )}

      {/* Study Plan Modal */}
      {isStudyPlanOpen && (
        <StudyPlanModal onClose={() => setIsStudyPlanOpen(false)} />
      )}

      {/* Voice Learning Settings & Capability Modal */}
      <VoiceSettingsModal
        isOpen={isVoiceSettingsOpen}
        onClose={() => setIsVoiceSettingsOpen(false)}
        activeLanguage={learningContext.language}
      />

      {/* Xitsonga Native Language Engine Phrasebook Modal */}
      <XitsongaPhrasebookModal
        isOpen={isPhrasebookOpen}
        onClose={() => setIsPhrasebookOpen(false)}
        onSelectPhraseForTutor={(phrase) => {
          setInputMessage(phrase.xitsonga || phrase.english);
          setTimeout(() => inputRef.current?.focus(), 100);
        }}
      />

      {/* Pronunciation Practice Modal */}
      <PronunciationPracticeModal
        phrase={practicePhrase}
        isOpen={Boolean(practicePhrase)}
        onClose={() => setPracticePhrase(null)}
      />
    </div>
  );
};
