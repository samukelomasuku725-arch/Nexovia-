import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Layers, Sparkles, ArrowRight, GraduationCap } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { FLASHCARDS } from '../../data/flashcardsData';
import { ALL_STUDY_GUIDE_CHAPTERS } from '../../data/studyGuideContent';

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

  // Search Study Guide & TVET N1-N6 chapters
  const matchedChapters = cleanQuery
    ? ALL_STUDY_GUIDE_CHAPTERS.filter(
        (ch) =>
          ch.title.toLowerCase().includes(cleanQuery) ||
          ch.subjectLabel.toLowerCase().includes(cleanQuery) ||
          ch.shortDescription.toLowerCase().includes(cleanQuery) ||
          ch.summary.some((s) => s.toLowerCase().includes(cleanQuery)) ||
          ch.formulas.some(
            (f) => f.expression.toLowerCase().includes(cleanQuery) || f.meaning.toLowerCase().includes(cleanQuery)
          )
      ).slice(0, 12)
    : [];

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
    matchedChapters.length > 0 ||
    matchedTracks.length > 0 ||
    matchedLessons.length > 0 ||
    matchedCards.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#040B1B]/80 backdrop-blur-sm flex items-start justify-center p-3 sm:p-6 pt-12 sm:pt-24"
      onClick={() => setIsSearchOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-2xl bg-[#0A1F44] rounded-2xl shadow-2xl border border-[#FFD400]/45 overflow-hidden flex flex-col max-h-[82vh] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#1E3A6E] flex items-center gap-3 bg-[#061128]">
          <Search className="w-5 h-5 text-[#FFD400] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Study Guides, TVET N1–N6, formulas, lessons..."
            className="flex-1 min-w-0 bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="p-1.5 text-slate-300 hover:text-[#FFD400] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              aria-label="Close search"
              className="text-[10px] font-mono px-2 py-1 bg-[#0D1E42] text-slate-300 hover:text-white rounded border border-[#1E3A6E] cursor-pointer"
            >
              ESC
            </button>
          )}
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto space-y-6">
          {!cleanQuery ? (
            <div className="py-6 text-center text-xs text-slate-300">
              <p className="mb-3 font-semibold text-[#FFD400]">Popular Searches (Grade 12, TVET N1–N6 &amp; Degree):</p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {['Financial Accounting', 'LLB Law', 'Psychology', 'TVET N4', 'Electrotechnics', 'Momentum'].map(
                  (term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-xl bg-[#0D1E42] border border-[#1E3A6E] hover:border-[#FFD400] text-slate-200 hover:text-[#FFD400] transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : hasResults ? (
            <>
              {/* Study Guide & TVET Chapters Section */}
              {matchedChapters.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#FFD400] mb-2 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Study Guide &amp; TVET Chapters ({matchedChapters.length})</span>
                  </h4>
                  <div className="space-y-1.5">
                    {matchedChapters.map((ch) => {
                      const path = `${ch.backPath}/${ch.slug}`;
                      return (
                        <button
                          key={ch.slug}
                          type="button"
                          onClick={() => {
                            if (typeof window !== 'undefined') {
                              window.history.pushState({}, '', path);
                            }
                            setCurrentTab('studyGuideChapter');
                            setIsSearchOpen(false);
                          }}
                          className="w-full text-left p-3 rounded-xl bg-[#061128] hover:bg-[#112A5C] border border-[#1E3A6E] hover:border-[#FFD400] flex items-center justify-between gap-2 group transition-all cursor-pointer"
                        >
                          <div className="min-w-0">
                            <span className="text-[10px] text-[#FFD400] font-bold block truncate">
                              {ch.subjectIcon} {ch.subjectLabel} • Ch {ch.chapterNumber}
                            </span>
                            <div className="text-xs sm:text-sm font-bold text-white group-hover:text-[#FFD400] truncate">
                              {ch.title}
                            </div>
                            <span className="text-[11px] text-slate-300 truncate block">
                              {ch.shortDescription}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[#FFD400] shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tracks Section */}
              {matchedTracks.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#FFD400]" />
                    <span>Learning Tracks ({matchedTracks.length})</span>
                  </h4>
                  <div className="space-y-1.5">
                    {matchedTracks.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          setActiveTrackId(t.id);
                          setCurrentTab('tracks');
                          setIsSearchOpen(false);
                        }}
                        className="w-full text-left p-2.5 rounded-xl bg-[#061128] hover:bg-[#112A5C] border border-[#1E3A6E] flex items-center justify-between group transition-colors cursor-pointer"
                      >
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-bold text-white group-hover:text-[#FFD400] truncate">
                            {t.title}
                          </div>
                          <span className="text-[11px] text-slate-300 line-clamp-1">
                            {t.tagline}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#FFD400] shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Lessons Section */}
              {matchedLessons.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#FFD400]" />
                    <span>Lessons ({matchedLessons.length})</span>
                  </h4>
                  <div className="space-y-1.5">
                    {matchedLessons.map((l) => (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => {
                          setActiveTrackId(l.trackId);
                          openLesson(l.id);
                          setIsSearchOpen(false);
                        }}
                        className="w-full text-left p-2.5 rounded-xl bg-[#061128] hover:bg-[#112A5C] border border-[#1E3A6E] flex items-center justify-between group transition-colors cursor-pointer"
                      >
                        <div className="truncate min-w-0">
                          <span className="text-[10px] text-[#FFD400] font-semibold block truncate">
                            {l.trackTitle}
                          </span>
                          <div className="text-xs sm:text-sm font-bold text-white group-hover:text-[#FFD400] truncate">
                            {l.title}
                          </div>
                          <span className="text-[11px] text-slate-300 truncate block">
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
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFD400]" />
                    <span>Flashcard Concepts ({matchedCards.length})</span>
                  </h4>
                  <div className="space-y-1.5">
                    {matchedCards.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          setCurrentTab('practice');
                          setIsSearchOpen(false);
                        }}
                        className="w-full text-left p-2.5 rounded-xl bg-[#061128] hover:bg-[#112A5C] border border-[#1E3A6E] block transition-colors group cursor-pointer"
                      >
                        <div className="text-xs font-bold text-white group-hover:text-[#FFD400]">
                          {c.question}
                        </div>
                        <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                          {c.answer}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="py-8 text-center text-xs text-slate-300">
              No results found for &ldquo;{query}&rdquo;. Try searching a TVET subject (e.g. N4, Electrotechnics) or Grade 12 topic.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
