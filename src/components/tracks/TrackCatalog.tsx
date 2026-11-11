import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Clock, Award, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { Track } from '../../types';

export const TrackCatalog: React.FC = () => {
  const { tracks, activeTrack, setActiveTrackId, openLesson, userProgress } = useLearning();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedTrackId, setExpandedTrackId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'Software Engineering', label: 'Engineering' },
    { id: 'Artificial Intelligence', label: 'AI & Systems' },
    { id: 'Cloud & Infrastructure', label: 'Cloud & DevOps' },
    { id: 'Design & UX', label: 'Product & Design' }
  ];

  const filteredTracks = selectedCategory === 'all'
    ? tracks
    : tracks.filter((t) => t.category === selectedCategory);

  const toggleExpand = (trackId: string) => {
    setExpandedTrackId((prev) => (prev === trackId ? null : trackId));
  };

  return (
    <section className="py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
              Curated Curriculum
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Career Learning Tracks
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Engineered pathways that progress from fundamental concepts to production-grade implementation.
            </p>
          </div>

          {/* Interactive Category Filter Tabs (Single-line, functional buttons) */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTracks.map((track) => {
            const isCurrentActive = activeTrack.id === track.id;
            const isExpanded = expandedTrackId === track.id;

            const allLessons = track.modules.flatMap((m) => m.lessons);
            const completedCount = allLessons.filter((l) =>
              userProgress.completedLessonIds.includes(l.id)
            ).length;
            const progressPct = allLessons.length > 0 ? Math.round((completedCount / allLessons.length) * 100) : 0;
            const isCompleted = progressPct === 100 && allLessons.length > 0;

            return (
              <div
                key={track.id}
                className={`flex flex-col bg-white dark:bg-slate-900 border rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-md ${
                  isCurrentActive
                    ? 'border-amber-500/80 ring-1 ring-amber-500/30'
                    : 'border-slate-200/80 dark:border-slate-800'
                }`}
              >
                {/* Track Card Visual Asset */}
                <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={track.imagePath}
                    alt={track.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback gradient if image fails
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Level & Category unboxed overlay text */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
                    <span className="font-semibold px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-sm">
                      {track.category}
                    </span>
                    {isCurrentActive && (
                      <span className="font-semibold px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                        In Progress
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-xs text-white/90 flex items-center justify-between font-medium">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{track.durationHours} Hours</span>
                    </div>
                    <span>{track.level}</span>
                  </div>
                </div>

                {/* Track Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Zero-Pill Unboxed Metadata */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium mb-1.5">
                      <span>{track.modules.length} Modules</span>
                      <span aria-hidden="true">·</span>
                      <span>{allLessons.length} Lessons</span>
                      <span aria-hidden="true">·</span>
                      <span>Certificate</span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {track.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {track.tagline}
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-500 dark:text-slate-400">Track Progress</span>
                        <span className="font-mono font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
                          {progressPct}% ({completedCount}/{allLessons.length})
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Controls */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setActiveTrackId(track.id);
                          const nextUncompleted = allLessons.find(
                            (l) => !userProgress.completedLessonIds.includes(l.id)
                          ) || allLessons[0];
                          if (nextUncompleted) openLesson(nextUncompleted.id);
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all active:scale-95"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{completedCount > 0 ? 'Continue Track' : 'Start Track'}</span>
                      </button>

                      <button
                        onClick={() => toggleExpand(track.id)}
                        className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        title={isExpanded ? 'Hide Syllabus' : 'View Syllabus'}
                        aria-label="Toggle Syllabus"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Collapsible Syllabus Drawer */}
                {isExpanded && (
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 border-t border-slate-200/80 dark:border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Curriculum Syllabus
                    </h4>
                    {track.modules.map((mod, modIdx) => (
                      <div key={mod.id} className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/70 dark:border-slate-800">
                        <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 mb-2">
                          {modIdx + 1}. {mod.title}
                        </div>
                        <div className="space-y-1.5">
                          {mod.lessons.map((lesson) => {
                            const isDone = userProgress.completedLessonIds.includes(lesson.id);
                            return (
                              <button
                                key={lesson.id}
                                onClick={() => openLesson(lesson.id)}
                                className="w-full flex items-center justify-between text-left py-1.5 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-xs transition-colors group"
                              >
                                <div className="flex items-center gap-2 truncate">
                                  {isDone ? (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                  ) : (
                                    <span className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-slate-600 shrink-0" />
                                  )}
                                  <span className={`truncate ${isDone ? 'text-slate-500 dark:text-slate-400' : 'text-slate-800 dark:text-slate-200 font-medium'}`}>
                                    {lesson.title}
                                  </span>
                                </div>
                                <span className="text-[11px] text-slate-400 ml-2 shrink-0">
                                  {lesson.durationMinutes}m
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
