import React, { useState, useMemo, useEffect } from 'react';
import { RotateCw, Check, X, Trophy, ShieldCheck } from 'lucide-react';
import { FLASHCARDS } from '../../data/flashcardsData';
import { useLearning } from '../../context/LearningContext';
import { useAuth } from '../../context/AuthContext';
import { isAdminUser } from '../../services/antiAbuseService';
import { multilingualEducationalService } from '../../services/language/multilingualEducationalService';
import { CleanFormulaRenderer } from '../common/CleanFormulaRenderer';
import { cleanFormulaString } from '../../utils/formulaCleaner';
import { Flashcard } from '../../types';

export const FlashcardPractice: React.FC = () => {
  const { userProgress, recordPerformanceEvent, learningContext, activeLearningLanguage, setCurrentTab } = useLearning();
  const { user } = useAuth();
  const isAdmin = isAdminUser(user);

  const [deck, setDeck] = useState<Flashcard[]>(FLASHCARDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [reviewIds, setReviewIds] = useState<string[]>([]);

  // Load latest flashcards from backend if available
  useEffect(() => {
    let isMounted = true;
    fetch('/api/flashcards')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data && Array.isArray(data.cards) && data.cards.length > 0) {
          setDeck(data.cards);
        }
      })
      .catch(() => {
        // Fallback to local default flashcards
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const rawCard = deck[currentIndex % (deck.length || 1)];
  const currentCard = useMemo(() => {
    return rawCard
      ? multilingualEducationalService.localizeFlashcard(rawCard, activeLearningLanguage)
      : null;
  }, [rawCard, activeLearningLanguage]);

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < deck.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleMarkMastered = () => {
    if (!currentCard) return;
    if (!masteredIds.includes(currentCard.id)) {
      setMasteredIds((prev) => [...prev, currentCard.id]);
    }
    setReviewIds((prev) => prev.filter((id) => id !== currentCard.id));

    const xpEarned = currentCard.xp || 10;

    // Record into Adaptive Learning Engine
    recordPerformanceEvent({
      learnerId: 'guest_learner',
      gradeOrProgramme: learningContext.gradeOrProgramme || 'Grade 10',
      subject: 'Computing & Foundations',
      topic: currentCard.topic || 'Software Foundations',
      questionId: currentCard.id,
      questionType: 'conceptual',
      correct: true,
      score: 1,
      percentage: 100,
      difficulty: currentCard.difficulty === 'Expert' ? 'hard' : currentCard.difficulty === 'Core' ? 'medium' : 'easy',
      timeSpentSeconds: 30,
      attemptsCount: 1,
      hintsUsed: 0,
      source: 'practice',
      completed: true
    });

    handleNext();
  };

  const handleMarkReview = () => {
    if (!currentCard) return;
    if (!reviewIds.includes(currentCard.id)) {
      setReviewIds((prev) => [...prev, currentCard.id]);
    }
    setMasteredIds((prev) => prev.filter((id) => id !== currentCard.id));

    // Record into Adaptive Learning Engine
    recordPerformanceEvent({
      learnerId: 'guest_learner',
      gradeOrProgramme: learningContext.gradeOrProgramme || 'Grade 10',
      subject: 'Computing & Foundations',
      topic: currentCard.topic || 'Software Foundations',
      questionId: currentCard.id,
      questionType: 'conceptual',
      correct: false,
      score: 0,
      percentage: 0,
      difficulty: currentCard.difficulty === 'Expert' ? 'hard' : currentCard.difficulty === 'Core' ? 'medium' : 'easy',
      timeSpentSeconds: 45,
      attemptsCount: 1,
      hintsUsed: 1,
      source: 'practice',
      completed: true
    });

    handleNext();
  };

  const masteryPct = deck.length > 0
    ? Math.round((masteredIds.length / deck.length) * 100)
    : 0;

  const currentXp = currentCard?.xp || 10;

  return (
    <section className="py-6 sm:py-10 max-w-4xl mx-auto px-4 sm:px-6">
      {/* Header - Clean public view (no shuffle button, no metadata pills) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            Spaced Repetition Lab
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Daily Quick-Fire Flashcards
          </h2>
        </div>

        {/* Admin shortcut if logged in as admin */}
        {isAdmin && (
          <button
            onClick={() => setCurrentTab('adminBank')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-900 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 rounded-xl transition-colors hover:bg-amber-200"
            title="Open Spaced Repetition Editor in Admin Portal"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>Admin Editor</span>
          </button>
        )}
      </div>

      {/* Progress Metric Bar: Deck Progress, Card count, Mastered % */}
      <div className="mb-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Deck Progress</span>
            <span aria-hidden="true">·</span>
            <span>Card {deck.length > 0 ? currentIndex + 1 : 0} of {deck.length}</span>
            <span aria-hidden="true">·</span>
            <span>{masteredIds.length} Mastered</span>
          </div>
          <div className="w-48 sm:w-64 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-1.5">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${masteryPct}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span className="font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
            {masteryPct}%
          </span>
        </div>
      </div>

      {/* Flashcard Stage: PROMPT QUESTION Card & Tap to Flip */}
      {currentCard ? (
        <div className="space-y-6">
          <div
            onClick={() => setIsFlipped((prev) => !prev)}
            className="w-full min-h-[300px] sm:min-h-[340px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group relative select-none"
          >
            {/* Card Metadata Top - Clean (Touch Ergonomics metadata hidden in public view) */}
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                {!isFlipped ? 'Prompt Question' : 'Answer'}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-semibold group-hover:text-amber-500 transition-colors">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Tap to flip</span>
              </div>
            </div>

            {/* Card Center Content */}
            <div className="my-auto py-4">
              {!isFlipped ? (
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-relaxed">
                    {cleanFormulaString(currentCard.question)}
                  </h3>
                </div>
              ) : (
                <div className="animate-in fade-in duration-200">
                  <div className="text-base sm:text-lg text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                    <CleanFormulaRenderer content={currentCard.answer} />
                  </div>

                  {currentCard.codeSnippet && (
                    <div className="mt-4 p-3 bg-slate-950 rounded-xl font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto">
                      <code>{currentCard.codeSnippet}</code>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Card Footer Hint: Clean learner instruction */}
            <div className="text-xs text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span>{isFlipped ? 'Answer Revealed' : 'Tap card to reveal answer'}</span>
              <span className="text-[11px] text-slate-400">Card {currentIndex + 1} of {deck.length}</span>
            </div>
          </div>

          {/* Action Ergonomic Buttons: Needs Review / Mastered (+10 XP) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <button
              onClick={handleMarkReview}
              className="min-h-[50px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-all active:scale-95 shadow-2xs"
            >
              <X className="w-4 h-4 text-rose-500" />
              <span>Needs Review</span>
            </button>

            <button
              onClick={handleMarkMastered}
              className="min-h-[50px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-400 hover:bg-yellow-400 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-95"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Mastered (+{currentXp} XP)</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-slate-500">
          No flashcards loaded.
        </div>
      )}
    </section>
  );
};
