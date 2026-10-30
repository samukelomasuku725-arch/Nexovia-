import React, { useState } from 'react';
import {
  Bookmark,
  FileText,
  Sparkles,
  Camera,
  ArrowRight,
  HelpCircle,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Search,
  BookOpen,
  Filter
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { SavedItemType } from '../../types';
import { CleanFormulaRenderer } from '../common/CleanFormulaRenderer';
import { cleanFormulaString } from '../../utils/formulaCleaner';

export const SavedLearningArea: React.FC = () => {
  const {
    savedItems,
    removeSavedItem,
    userProgress,
    tracks,
    openLesson,
    toggleBookmark,
    saveNote,
    studyPlans,
    removeStudyPlan,
    scanSessions,
    setActiveScanSession,
    setCurrentTab
  } = useLearning();

  const [activeFilter, setActiveFilter] = useState<'all' | SavedItemType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Bookmarked lessons
  const bookmarkedLessons = tracks.flatMap((t) =>
    t.modules.flatMap((m) =>
      m.lessons
        .filter((l) => userProgress.bookmarkedLessonIds.includes(l.id))
        .map((l) => ({ ...l, trackTitle: t.title }))
    )
  );

  // Notes
  const notesList = Object.values(userProgress.notes).filter((n) => n.content.trim().length > 0);

  // Filter saved items
  const filteredSavedItems = savedItems.filter((item) => {
    const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
    const matchesQuery =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(cleanFormulaString(text));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const getBadgeColor = (type: SavedItemType) => {
    switch (type) {
      case 'explanation':
        return 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40';
      case 'summary':
        return 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40';
      case 'question':
        return 'text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40';
      case 'flashcard':
        return 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40';
      case 'note':
        return 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800';
      case 'scan_session':
      case 'scan_explanation':
        return 'text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800';
    }
  };

  return (
    <section className="py-6 sm:py-10 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            Personal Knowledge Base
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Saved Learning Repository
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Access your saved AI explanations, high-yield summaries, scanned materials, and notes.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved learning..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl mb-8 overflow-x-auto w-fit max-w-full">
        {(
          [
            { id: 'all', label: 'All Items' },
            { id: 'scan_session', label: 'Scanned Material (Vision)' },
            { id: 'explanation', label: 'AI Explanations' },
            { id: 'summary', label: 'Summaries' },
            { id: 'question', label: 'Practice Questions' },
            { id: 'note', label: 'Study Notes' }
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as any)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeFilter === tab.id
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Saved Learning Items (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Saved Learning Records ({filteredSavedItems.length})</span>
          </h3>

          {filteredSavedItems.length > 0 ? (
            <div className="space-y-4">
              {filteredSavedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm transition-all hover:border-amber-400/50"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2 text-xs mb-1">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${getBadgeColor(item.type)}`}>
                          {item.type.toUpperCase()}
                        </span>
                        <span className="text-slate-400 font-medium">
                          {item.subject} · {item.topic}
                        </span>
                      </div>
                      <h4 className="font-display text-base font-bold text-slate-900 dark:text-white">
                        {cleanFormulaString(item.title)}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleCopy(item.id, item.content)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-colors"
                        title="Copy content"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => removeSavedItem(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg transition-colors"
                        title="Delete item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl shadow-xs">
                    <CleanFormulaRenderer content={item.content} language={item.language} />
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Saved {new Date(item.createdAt).toLocaleDateString()}</span>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex gap-1.5">
                        {item.tags.map((t, idx) => (
                          <span key={idx} className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-10 text-center text-xs text-slate-500">
              No saved items found. You can save AI Tutor responses, quiz summaries, or study notes at any time!
            </div>
          )}
        </div>

        {/* Bookmarked Curriculum Lessons (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Saved Scan Sessions Section */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-500" />
                <span>Scanned Sessions ({scanSessions.length})</span>
              </h3>
              <button
                onClick={() => setCurrentTab('scan')}
                className="text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline"
              >
                + Scan New
              </button>
            </div>

            {scanSessions.length > 0 ? (
              <div className="space-y-2.5">
                {scanSessions.slice(0, 5).map((session) => (
                  <div
                    key={session.id}
                    onClick={() => {
                      setActiveScanSession(session);
                      setCurrentTab('scan');
                    }}
                    className="p-2.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50 dark:hover:bg-slate-800 rounded-xl cursor-pointer transition-colors flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2 truncate">
                      {session.thumbnail ? (
                        <img src={session.thumbnail} alt="" className="w-8 h-8 rounded object-cover shrink-0" />
                      ) : (
                        <div className="w-8 h-8 rounded bg-amber-100 dark:bg-slate-700 flex items-center justify-center shrink-0">
                          <Camera className="w-3.5 h-3.5 text-amber-600" />
                        </div>
                      )}
                      <div className="truncate">
                        <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                          {session.title}
                        </span>
                        <span className="text-[10px] text-slate-500 line-clamp-1">
                          "{session.initialQuestion}"
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                No scans saved yet. Snap a document with Scan & Learn to review it anytime.
              </p>
            )}
          </div>

          {/* Bookmarks Section */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-3">
              <Bookmark className="w-4 h-4 text-amber-500" />
              <span>Bookmarked Lessons ({bookmarkedLessons.length})</span>
            </h3>

            {bookmarkedLessons.length > 0 ? (
              <div className="space-y-2">
                {bookmarkedLessons.map((l) => (
                  <div
                    key={l.id}
                    className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between gap-2"
                  >
                    <div className="truncate">
                      <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold block truncate">
                        {l.trackTitle}
                      </span>
                      <button
                        onClick={() => openLesson(l.id)}
                        className="text-xs font-bold text-slate-900 dark:text-slate-100 hover:text-amber-600 dark:hover:text-amber-400 text-left truncate block"
                      >
                        {l.title}
                      </button>
                    </div>

                    <button
                      onClick={() => toggleBookmark(l.id)}
                      className="p-1 text-amber-500 hover:text-slate-400 shrink-0"
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                No bookmarked lessons yet.
              </p>
            )}
          </div>

          {/* Quick Study Notes Section */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-amber-500" />
              <span>Lesson Notes ({notesList.length})</span>
            </h3>

            {notesList.length > 0 ? (
              <div className="space-y-2.5">
                {notesList.map((n) => (
                  <div
                    key={n.lessonId}
                    className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl"
                  >
                    <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                      {n.lessonTitle}
                    </span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">
                      {n.content}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                No personal lesson notes recorded.
              </p>
            )}
          </div>

          {/* Saved Study Plans Section */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Study Plans ({studyPlans.length})</span>
            </h3>

            {studyPlans.length > 0 ? (
              <div className="space-y-3">
                {studyPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {plan.title}
                      </span>
                      <button
                        onClick={() => removeStudyPlan(plan.id)}
                        className="text-slate-400 hover:text-rose-500 p-1"
                        title="Delete study plan"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold block">
                      {plan.subject} · {plan.gradeOrProgramme}
                    </span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {plan.planOverview}
                    </p>
                    <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                      <span>{plan.availableStudyTime}</span>
                      <span>{new Date(plan.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                No study plans generated yet. Use the AI Tutor to create your first customized revision plan!
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
