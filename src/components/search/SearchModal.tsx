import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Layers, Sparkles, ArrowRight } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { FLASHCARDS } from '../../data/flashcardsData';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, tracks, openLesson, setActiveTrackId, setCurrentTab } = useLearning();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  // Search tracks
  const matchedTracks = cleanQuery
    ? tracks.filter(
        (t) =>
          t.title.toLowerCase().includes(cleanQuery) ||
          t.description.toLowerCase().includes(cleanQuery) ||
          t.skills.some((s) => s.toLowerCase().includes(cleanQuery))
      )
    : [];

  // Search lessons
  const allLessons = tracks.flatMap((t) =>
    t.modules.flatMap((m) => m.lessons.map((l) => ({ ...l, trackTitle: t.title, trackId: t.id })))
  );

  const matchedLessons = cleanQuery
    ? allLessons.filter(
        (l) =>
          l.title.toLowerCase().includes(cleanQuery) ||
          l.subtitle.toLowerCase().includes(cleanQuery) ||
          l.content.overview.toLowerCase().includes(cleanQuery)
      )
    : [];

  // Search flashcards
  const matchedCards = cleanQuery
    ? FLASHCARDS.filter(
        (c) =>
          c.question.toLowerCase().includes(cleanQuery) ||
          c.answer.toLowerCase().includes(cleanQuery) ||
          c.topic.toLowerCase().includes(cleanQuery)
      )
    : [];

  const hasResults =
    matchedTracks.length > 0 || matchedLessons.length > 0 || matchedCards.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24"
      onClick={() => setIsSearchOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, tracks, concepts (e.g. state machines, vector search, docker)..."
            className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded border border-slate-200 dark:border-slate-700">
              ESC
            </kbd>
          )}
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto space-y-6">
          {!cleanQuery ? (
            <div className="py-8 text-center text-xs text-slate-500 dark:text-slate-400">
              <p className="mb-2 font-semibold">Quick Suggestions:</p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {['Zero-Latency State', 'Thumb Ergonomics', 'JSON Schemas', 'Docker Builds', '60-30-10 Rule'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-950/40 text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : hasResults ? (
            <>
              {/* Tracks Section */}
              {matchedTracks.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Learning Tracks ({matchedTracks.length})</span>
                  </h4>
                  <div className="space-y-1.5">
                    {matchedTracks.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setActiveTrackId(t.id);
                          setCurrentTab('tracks');
                          setIsSearchOpen(false);
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400">
                            {t.title}
                          </div>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                            {t.tagline}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Lessons Section */}
              {matchedLessons.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Lessons ({matchedLessons.length})</span>
                  </h4>
                  <div className="space-y-1.5">
                    {matchedLessons.map((l) => (
                      <button
                        key={l.id}
                        onClick={() => {
                          setActiveTrackId(l.trackId);
                          openLesson(l.id);
                          setIsSearchOpen(false);
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between group transition-colors"
                      >
                        <div className="truncate">
                          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold block truncate">
                            {l.trackTitle}
                          </span>
                          <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 truncate">
                            {l.title}
                          </div>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate block">
                            {l.subtitle}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 shrink-0 ml-2">
                          {l.readTime}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Flashcards Section */}
              {matchedCards.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Flashcard Concepts ({matchedCards.length})</span>
                  </h4>
                  <div className="space-y-1.5">
                    {matchedCards.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          setCurrentTab('practice');
                          setIsSearchOpen(false);
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 block transition-colors group"
                      >
                        <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400">
                          {c.question}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {c.answer}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="py-8 text-center text-xs text-slate-500">
              No results found for "{query}". Try a different keyword.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
