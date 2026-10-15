import React, { useState } from 'react';
import { Bookmark, FileText, ArrowRight, Trash2, Copy, Check, BookOpen } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export const SavedNotesView: React.FC = () => {
  const { userProgress, tracks, openLesson, toggleBookmark, saveNote } = useLearning();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Collect bookmarked lessons
  const bookmarkedLessons = tracks.flatMap((t) =>
    t.modules.flatMap((m) =>
      m.lessons
        .filter((l) => userProgress.bookmarkedLessonIds.includes(l.id))
        .map((l) => ({ ...l, trackTitle: t.title }))
    )
  );

  const notesList = Object.values(userProgress.notes).filter((n) => n.content.trim().length > 0);

  const handleCopyNote = (key: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const handleDeleteNote = (lessonId: string, lessonTitle: string, trackTitle: string) => {
    saveNote(lessonId, lessonTitle, trackTitle, '');
  };

  return (
    <section className="py-6 sm:py-10 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
          Personal Knowledge Base
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          Saved Notes & Bookmarks
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Review your personal architectural annotations and saved study guides.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Bookmarked Lessons Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Bookmark className="w-4 h-4 text-amber-500" />
              <span>Bookmarked Lessons ({bookmarkedLessons.length})</span>
            </h3>
          </div>

          {bookmarkedLessons.length > 0 ? (
            <div className="space-y-2.5">
              {bookmarkedLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-3.5 shadow-sm flex items-center justify-between gap-3 group hover:border-amber-400 transition-colors"
                >
                  <div className="truncate">
                    <span className="text-[11px] text-slate-400 block truncate">
                      {lesson.trackTitle}
                    </span>
                    <button
                      onClick={() => openLesson(lesson.id)}
                      className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 text-left truncate block mt-0.5"
                    >
                      {lesson.title}
                    </button>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => toggleBookmark(lesson.id)}
                      className="p-1.5 text-amber-500 hover:text-slate-400 rounded-lg transition-colors"
                      title="Remove bookmark"
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                    <button
                      onClick={() => openLesson(lesson.id)}
                      className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors"
                      title="Open lesson"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-6 text-center text-xs text-slate-500">
              No bookmarked lessons yet. Bookmark any lesson while reading for rapid access.
            </div>
          )}
        </div>

        {/* Personal Notes Column (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-amber-500" />
              <span>Study Notes ({notesList.length})</span>
            </h3>
          </div>

          {notesList.length > 0 ? (
            <div className="space-y-4">
              {notesList.map((note) => (
                <div
                  key={note.lessonId}
                  className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="truncate">
                      <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold block truncate">
                        {note.trackTitle}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                        {note.lessonTitle}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleCopyNote(note.lessonId, note.content)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-colors"
                        title="Copy note to clipboard"
                      >
                        {copiedKey === note.lessonId ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note.lessonId, note.lessonTitle, note.trackTitle)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg transition-colors"
                        title="Delete note"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openLesson(note.lessonId)}
                        className="p-1.5 text-amber-600 hover:text-amber-700 rounded-lg transition-colors text-xs font-semibold flex items-center gap-1"
                      >
                        <span>Open</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-3 rounded-lg leading-relaxed whitespace-pre-wrap font-sans">
                    {note.content}
                  </p>

                  <div className="mt-2 text-[10px] text-slate-400 text-right">
                    Updated {note.updatedAt}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center text-xs text-slate-500">
              You haven't written any notes yet. Open any lesson and write key insights in the Notes tab!
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
