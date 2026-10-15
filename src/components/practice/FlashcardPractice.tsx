import React, { useState, useMemo } from 'react';
import { RotateCw, Check, X, Sparkles, Shuffle, Lightbulb, Trophy } from 'lucide-react';
import { FLASHCARDS } from '../../data/flashcardsData';
import { useLearning } from '../../context/LearningContext';
import { multilingualEducationalService } from '../../services/language/multilingualEducationalService';

export const FlashcardPractice: React.FC = () => {
  const { markLessonComplete, userProgress, recordPerformanceEvent, learningContext, activeLearningLanguage } = useLearning();
  const [deck, setDeck] = useState(FLASHCARDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [reviewIds, setReviewIds] = useState<string[]>([]);
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Foundation' | 'Core' | 'Expert'>('All');

  const filteredDeck = difficultyFilter === 'All'
    ? deck
    : deck.filter((c) => c.difficulty === difficultyFilter);

  const rawCard = filteredDeck[currentIndex % (filteredDeck.length || 1)];
  const currentCard = useMemo(() => {
    return rawCard
      ? multilingualEducationalService.localizeFlashcard(rawCard, activeLearningLanguage)
      : null;
  }, [rawCard, activeLearningLanguage]);

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < filteredDeck.length - 1) {
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

  const handleShuffle = () => {
    setIsFlipped(false);
    setDeck((prev) => [...prev].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
  };

  const masteryPct = filteredDeck.length > 0
    ? Math.round((masteredIds.length / filteredDeck.length) * 100)
    : 0;

  return (
    <section className="py-6 sm:py-10 max-w-4xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            Spaced Repetition Lab
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Daily Quick-Fire Flashcards
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Reinforce core architectural heuristics, API protocols, and zero-slop design principles.
          </p>
        </div>

        {/* Shuffle and Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Shuffle Deck</span>
          </button>
        </div>
      </div>

      {/* Difficulty Filter Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl mb-6 w-fit">
        {(['All', 'Foundation', 'Core', 'Expert'] as const).map((diff) => (
          <button
            key={diff}
            onClick={() => {
              setDifficultyFilter(diff);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              difficultyFilter === diff
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {diff}
          </button>
        ))}
      </div>

      {/* Progress Metric Bar */}
      <div className="mb-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span>Deck Progress</span>
            <span aria-hidden="true">·</span>
            <span>Card {currentIndex + 1} of {filteredDeck.length}</span>
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

      {/* 3D Flashcard Stage */}
      {currentCard ? (
        <div className="space-y-6">
          <div
            onClick={() => setIsFlipped((prev) => !prev)}
            className="w-full min-h-[300px] sm:min-h-[340px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group relative select-none"
          >
            {/* Card Metadata Top */}
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <span>{currentCard.topic}</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  {currentCard.difficulty}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Tap to flip</span>
              </div>
            </div>

            {/* Card Center Content */}
            <div className="my-auto py-4">
              {!isFlipped ? (
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block mb-2">
                    Prompt Question
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-relaxed">
                    {currentCard.question}
                  </h3>
                </div>
              ) : (
                <div className="animate-in fade-in duration-200">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400 block mb-2">
                    Architectural Answer
                  </span>
                  <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                    {currentCard.answer}
                  </p>

                  {currentCard.codeSnippet && (
                    <div className="mt-4 p-3 bg-slate-950 rounded-xl font-mono text-xs text-emerald-400 border border-slate-800">
                      <code>{currentCard.codeSnippet}</code>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Card Footer Hint */}
            <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span>{isFlipped ? 'Answer Revealed' : 'Click card to reveal architectural answer'}</span>
              <span>Nexovia Revision System</span>
            </div>
          </div>

          {/* Action Ergonomic Buttons */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <button
              onClick={handleMarkReview}
              className="min-h-[48px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-all active:scale-95"
            >
              <X className="w-4 h-4 text-rose-500" />
              <span>Needs Review</span>
            </button>

            <button
              onClick={handleMarkMastered}
              className="min-h-[48px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-sm transition-all active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>Mastered (+10 XP)</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-slate-500">
          No flashcards match this filter.
        </div>
      )}
    </section>
  );
};
