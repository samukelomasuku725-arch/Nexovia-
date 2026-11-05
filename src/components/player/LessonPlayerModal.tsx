import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Bookmark,
  CheckCircle2,
  Volume2,
  VolumeX,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  FileText,
  HelpCircle,
  Code2,
  Check,
  AlertCircle,
  Share2
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { InteractivePlayground } from '../sandbox/InteractivePlayground';
import { multilingualEducationalService } from '../../services/language/multilingualEducationalService';
import { AnswerFeedbackWidget } from '../feedback/AnswerFeedbackWidget';
import { CleanFormulaRenderer } from '../common/CleanFormulaRenderer';
import { cleanFormulaString } from '../../utils/formulaCleaner';
import { smartNotesService } from '../../services/notes/smartNotesService';
import { learnerStrugglesService } from '../../services/struggles/learnerStrugglesService';
import { useAuth } from '../../context/AuthContext';

export const LessonPlayerModal: React.FC = () => {
  const {
    activeLesson,
    activeTrack,
    closeLesson,
    openLesson,
    markLessonComplete,
    toggleBookmark,
    saveNote,
    recordQuizScore,
    userProgress,
    audioState,
    playNarration,
    stopNarration,
    setSpeechRate,
    activeLearningLanguage
  } = useLearning();

  const [activeTab, setActiveTab] = useState<'lesson' | 'notes'>('lesson');
  const [noteContent, setNoteContent] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const { user } = useAuth();
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [exercisePassed, setExercisePassed] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isGeneratingSmartNote, setIsGeneratingSmartNote] = useState(false);
  const [smartNoteSuccess, setSmartNoteSuccess] = useState<string | null>(null);

  const localizedQuiz = useMemo(() => {
    return activeLesson?.quiz
      ? multilingualEducationalService.localizeLessonQuiz(activeLesson.quiz, activeLearningLanguage)
      : [];
  }, [activeLesson?.quiz, activeLearningLanguage]);

  const uiStrings = useMemo(() => {
    return multilingualEducationalService.getUiStrings(activeLearningLanguage);
  }, [activeLearningLanguage]);

  // Initialize notes from context for this lesson
  useEffect(() => {
    if (activeLesson) {
      const existingNote = userProgress.notes[activeLesson.id]?.content || '';
      setNoteContent(existingNote);
      setSelectedAnswers({});
      setQuizSubmitted(false);
      setQuizScore(null);
      setExercisePassed(false);
      setShowCelebration(false);
      setSmartNoteSuccess(null);
    }
  }, [activeLesson?.id]);

  if (!activeLesson) return null;

  const isCompleted = userProgress.completedLessonIds.includes(activeLesson.id);
  const isBookmarked = userProgress.bookmarkedLessonIds.includes(activeLesson.id);

  // Find next and previous lessons
  const allLessons = activeTrack.modules.flatMap((m) => m.lessons);
  const currentIndex = allLessons.findIndex((l) => l.id === activeLesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  // Audio narration handler
  const handleToggleAudio = () => {
    if (audioState.isPlaying) {
      stopNarration();
    } else {
      const script =
        activeLesson.audioScript ||
        `${activeLesson.title}. ${activeLesson.subtitle}. ${activeLesson.content.overview}`;
      playNarration(script);
    }
  };

  // Note saving
  const handleNoteChange = (text: string) => {
    setNoteContent(text);
    saveNote(activeLesson.id, activeLesson.title, activeTrack.title, text);
  };

  // Auto-generate Smart Note v2 with AI
  const handleGenerateSmartNote = async () => {
    setIsGeneratingSmartNote(true);
    setSmartNoteSuccess(null);
    try {
      const sectionsText = activeLesson.content.sections.map((s) => `${s.heading}: ${s.body}`).join('\n\n');
      const fullText = `Title: ${activeLesson.title}\nSubtitle: ${activeLesson.subtitle}\nOverview: ${activeLesson.content.overview}\n\n${sectionsText}`;
      await smartNotesService.generateSmartNote({
        content: fullText,
        title: activeLesson.title,
        subject: activeTrack.title || 'General',
        topic: activeLesson.subtitle || activeLesson.title,
        userId: user?.id
      });
      setSmartNoteSuccess('Smart Note v2 saved to Subject Folders!');
      setTimeout(() => setSmartNoteSuccess(null), 4000);
    } catch (err: any) {
      console.error('Failed generating smart note:', err);
      setSmartNoteSuccess('Failed to generate smart note. Try again.');
    } finally {
      setIsGeneratingSmartNote(false);
    }
  };

  // Quiz submission
  const handleOptionSelect = (questionId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    if (!activeLesson.quiz || activeLesson.quiz.length === 0) return;
    let correct = 0;
    activeLesson.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });

    const scorePct = Math.round((correct / activeLesson.quiz.length) * 100);
    setQuizScore(scorePct);
    setQuizSubmitted(true);
    recordQuizScore(activeLesson.id, scorePct);

    // Learner Struggles AI: If quiz score < 60, record topic failure
    if (scorePct < 60) {
      learnerStrugglesService.recordTopicFailure({
        userId: user?.id,
        subject: activeTrack.title || 'General',
        topic: activeLesson.title,
        grade: 'Curriculum'
      }).catch((err) => console.warn('[LearnerStruggles] Failed recording quiz struggle:', err));
    }

    if (scorePct >= 70) {
      markLessonComplete(activeLesson.id, 50);
      setShowCelebration(true);
    }
  };

  const handleCompleteLesson = () => {
    markLessonComplete(activeLesson.id, 50);
    setShowCelebration(true);
    setTimeout(() => {
      if (nextLesson) {
        openLesson(nextLesson.id);
      }
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 md:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-5xl h-full md:h-[92vh] bg-white dark:bg-slate-950 md:rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
        {/* Top Header Bar */}
        <div className="h-14 sm:h-16 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 truncate">
            <button
              onClick={closeLesson}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              aria-label="Back to tracks"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="truncate">
              <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                <span className="truncate">{activeTrack.title}</span>
                <span aria-hidden="true">·</span>
                <span>{activeLesson.readTime}</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                {activeLesson.title}
              </h2>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Audio Narration Trigger */}
            <div className="flex items-center bg-slate-200/70 dark:bg-slate-800 rounded-lg p-0.5">
              <button
                onClick={handleToggleAudio}
                className={`min-h-[38px] px-2.5 flex items-center gap-1.5 text-xs font-medium rounded-md transition-colors ${
                  audioState.isPlaying
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                }`}
                title={audioState.isPlaying ? 'Stop narration' : 'Listen to lesson narration'}
              >
                {audioState.isPlaying ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
                <span className="hidden sm:inline">
                  {audioState.isPlaying ? 'Mute' : 'Listen'}
                </span>
              </button>

              {audioState.isPlaying && (
                <div className="flex items-center gap-1 px-1.5 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                  {([1.0, 1.25, 1.5] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setSpeechRate(r)}
                      className={`px-1 rounded ${
                        audioState.rate === r
                          ? 'font-bold text-amber-600 dark:text-amber-400'
                          : 'opacity-70'
                      }`}
                    >
                      {r}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => toggleBookmark(activeLesson.id)}
              className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ${
                isBookmarked
                  ? 'text-amber-500'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark lesson'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Close button */}
            <button
              onClick={closeLesson}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="Close lesson"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Secondary Bar for Mobile Tabs: Lesson vs Notes */}
        <div className="flex sm:hidden border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 px-4">
          <button
            onClick={() => setActiveTab('lesson')}
            className={`py-2 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'lesson'
                ? 'border-amber-500 text-slate-900 dark:text-white'
                : 'border-transparent text-slate-500'
            }`}
          >
            Lesson Guide
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`py-2 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'notes'
                ? 'border-amber-500 text-slate-900 dark:text-white'
                : 'border-transparent text-slate-500'
            }`}
          >
            My Notes {noteContent.length > 0 && '•'}
          </button>
        </div>

        {/* Main Content Area (Split Grid on Desktop, Tabbed on Mobile) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12">
          {/* Main Article & Interactive Deck (8 cols on desktop) */}
          <div
            className={`p-5 sm:p-8 lg:col-span-8 overflow-y-auto ${
              activeTab === 'notes' ? 'hidden sm:block' : 'block'
            }`}
          >
            {/* Overview Box */}
            <div className="bg-[#18181B] border border-[#FACC15]/30 rounded-2xl p-5 mb-8 shadow-md">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FACC15] mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15]" />
                <span>Core Concept Overview</span>
              </h3>
              <div className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                <CleanFormulaRenderer content={activeLesson.content.overview} />
              </div>

              {/* Key Takeaways */}
              <div className="mt-4 pt-4 border-t border-amber-500/20">
                <span className="text-xs font-semibold text-slate-900 dark:text-white block mb-2">
                  Key Takeaways
                </span>
                <ul className="space-y-2">
                  {activeLesson.content.keyTakeaways.map((takeaway, idx) => (
                    <li
                      key={idx}
                      className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2"
                    >
                      <Check className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span>{cleanFormulaString(takeaway)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Editorial Content Sections */}
            <div className="space-y-8">
              {activeLesson.content.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-3">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {cleanFormulaString(section.heading)}
                  </h3>
                  <div className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    <CleanFormulaRenderer content={section.body} />
                  </div>

                  {/* Code block if present */}
                  {section.codeBlock && (
                    <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-md my-4">
                      {section.codeBlock.filename && (
                        <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                          {section.codeBlock.filename}
                        </div>
                      )}
                      <pre className="p-4 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed">
                        <code>{section.codeBlock.code}</code>
                      </pre>
                    </div>
                  )}

                  {/* Callout if present */}
                  {section.callout && (
                    <div
                      className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                        section.callout.type === 'tip'
                          ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300'
                          : 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-300'
                      }`}
                    >
                      <strong>Note: </strong>
                      {section.callout.text}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Interactive Sandbox Playground */}
            {activeLesson.exercise && (
              <div className="mt-10">
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="w-5 h-5 text-amber-500" />
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    Hands-On Interactive Sandbox
                  </h3>
                </div>
                <InteractivePlayground
                  exercise={activeLesson.exercise}
                  onSuccess={() => setExercisePassed(true)}
                />
              </div>
            )}

            {/* Knowledge Check Quiz */}
            {activeLesson.quiz && activeLesson.quiz.length > 0 && (
              <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-amber-500" />
                    <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                      Knowledge Check
                    </h3>
                  </div>
                  {quizScore !== null && (
                    <span
                      className={`font-mono text-xs font-bold px-2.5 py-1 rounded-lg ${
                        quizScore >= 70
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}
                    >
                      Score: {quizScore}%
                    </span>
                  )}
                </div>

                <div className="space-y-6">
                  {localizedQuiz.map((q, qIdx) => {
                    const chosen = selectedAnswers[q.id];
                    const isRight = chosen === q.correctIndex;

                    return (
                      <div
                        key={q.id}
                        className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5"
                      >
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                          {qIdx + 1}. {cleanFormulaString(q.question)}
                        </h4>

                        <div className="space-y-2">
                          {q.options.map((opt: string, optIdx: number) => {
                            let optionStyles = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400';
                            if (quizSubmitted) {
                              if (optIdx === q.correctIndex) {
                                optionStyles = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-semibold';
                              } else if (chosen === optIdx && !isRight) {
                                optionStyles = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-300';
                              } else {
                                optionStyles = 'opacity-50 border-slate-200 dark:border-slate-800 text-slate-500';
                              }
                            } else if (chosen === optIdx) {
                              optionStyles = 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-slate-900 dark:text-white font-semibold';
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleOptionSelect(q.id, optIdx)}
                                disabled={quizSubmitted}
                                className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-start gap-2.5 ${optionStyles}`}
                              >
                                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 font-mono">
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{cleanFormulaString(opt)}</span>
                              </button>
                            );
                          })}
                        </div>

                        {quizSubmitted && (
                          <>
                            <div className="mt-3 p-3 bg-white dark:bg-slate-800 rounded-lg text-xs leading-relaxed text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                              <strong className="text-amber-600 dark:text-amber-400 block mb-1">
                                {uiStrings.explanationPrefix || 'Explanation: '}
                              </strong>
                              <CleanFormulaRenderer content={q.explanation} />
                            </div>
                            <AnswerFeedbackWidget
                              question={q.question}
                              answer={q.explanation || q.options[q.correctIndex] || ''}
                            />
                          </>
                        )}
                      </div>
                    );
                  })}

                  {!quizSubmitted ? (
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={Object.keys(selectedAnswers).length < activeLesson.quiz.length}
                      className="w-full py-3 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-sm transition-transform active:scale-98 shadow-sm"
                    >
                      {uiStrings.submitAnswer || 'Submit Quiz & Verify Answers'}
                    </button>
                  ) : (
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 text-sm font-semibold">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>Quiz completed! Score recorded in progress profile.</span>
                      </div>
                      <button
                        onClick={() => {
                          setQuizSubmitted(false);
                          setSelectedAnswers({});
                        }}
                        className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
                      >
                        {uiStrings.tryAgain || 'Retry'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Bottom Lesson Navigation & Complete Action */}
            <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 pb-8">
              <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3">
                {prevLesson ? (
                  <button
                    onClick={() => openLesson(prevLesson.id)}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>
                ) : (
                  <div />
                )}

                {nextLesson && (
                  <button
                    onClick={() => openLesson(nextLesson.id)}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors"
                  >
                    <span>Next Lesson</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                onClick={handleCompleteLesson}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 ${
                  isCompleted
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isCompleted ? 'Completed ✓ (+50 XP)' : 'Mark as Complete'}</span>
              </button>
            </div>
          </div>

          {/* Right Sidebar: Notes & Track Syllabus (4 cols on desktop) */}
          <div
            className={`border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-5 sm:p-6 lg:col-span-4 flex flex-col justify-between ${
              activeTab === 'lesson' ? 'hidden sm:flex' : 'flex'
            }`}
          >
            <div>
              {/* Personal Notes Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  <FileText className="w-3.5 h-3.5 text-amber-500" />
                  <span>My Engineering Notes</span>
                </div>
                <span className="text-[11px] text-slate-400">Auto-saved</span>
              </div>

              <textarea
                value={noteContent}
                onChange={(e) => handleNoteChange(e.target.value)}
                placeholder="Jot key takeaways, architectural decisions, or questions..."
                rows={6}
                className="w-full p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none leading-relaxed"
              />

              <button
                onClick={handleGenerateSmartNote}
                disabled={isGeneratingSmartNote}
                className="mt-2.5 w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs shadow-sm transition-all disabled:opacity-50 cursor-pointer active:scale-98"
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>{isGeneratingSmartNote ? 'Generating Smart Note...' : '⚡ Generate Smart Note v2 (AI)'}</span>
              </button>
              {smartNoteSuccess && (
                <p className="mt-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 text-center animate-fade-in">
                  ✓ {smartNoteSuccess}
                </p>
              )}

              {/* Track Syllabus Progress */}
              <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Track Curriculum
                </h4>

                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                  {activeTrack.modules.map((m) => (
                    <div key={m.id} className="space-y-1">
                      <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {m.title}
                      </div>
                      {m.lessons.map((l) => {
                        const isCurrent = l.id === activeLesson.id;
                        const isDone = userProgress.completedLessonIds.includes(l.id);

                        return (
                          <button
                            key={l.id}
                            onClick={() => openLesson(l.id)}
                            className={`w-full flex items-center justify-between p-2 rounded-lg text-xs text-left transition-colors ${
                              isCurrent
                                ? 'bg-amber-400/20 text-slate-950 dark:text-amber-300 font-bold border border-amber-500/30'
                                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              {isDone ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                              ) : (
                                <span className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-slate-600 shrink-0" />
                              )}
                              <span className="truncate">{l.title}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 shrink-0 ml-1">
                              {l.durationMinutes}m
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Offline notification card */}
            <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Offline Ready · Cached locally in browser</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
