/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN SMART NOTES V2 - SUBJECT FOLDERS & AI NOTE GENERATOR
 * Google Drive-style Subject Folders + Socratic Synthesis
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Folder,
  FolderOpen,
  Search,
  Plus,
  BookOpen,
  Sparkles,
  Calendar,
  ChevronRight,
  FileText,
  Trash2,
  Edit3,
  X,
  Share2,
  CheckCircle2,
  ArrowLeft,
  Copy,
  Lightbulb,
  ExternalLink,
  Layers,
  HelpCircle,
  Clock,
  Send
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import {
  smartNotesService,
  SmartNote,
  SubjectFolder,
  SUBJECT_FOLDER_CONFIG
} from '../../services/notes/smartNotesService';
import { CleanFormulaRenderer } from '../common/CleanFormulaRenderer';
import { cleanFormulaString } from '../../utils/formulaCleaner';

export const SmartNotesView: React.FC = () => {
  const { user, supabaseUser } = useAuth();
  const { setCurrentTab } = useLearning();

  const userId = supabaseUser?.id || user?.id;

  const [notes, setNotes] = useState<SmartNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Selected note for modal viewer
  const [activeNote, setActiveNote] = useState<SmartNote | null>(null);

  // Note creation / AI generation modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createMode, setCreateMode] = useState<'ai' | 'manual'>('ai');
  const [rawContentInput, setRawContentInput] = useState('');
  const [lessonTitleInput, setLessonTitleInput] = useState('');
  const [subjectHintInput, setSubjectHintInput] = useState('Mathematics');
  const [topicHintInput, setTopicHintInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Manual note state
  const [manualTitle, setManualTitle] = useState('');
  const [manualSubject, setManualSubject] = useState('Mathematics');
  const [manualTopic, setManualTopic] = useState('');
  const [manualSummary, setManualSummary] = useState('');
  const [manualKeyPoints, setManualKeyPoints] = useState('');
  const [manualDefinitions, setManualDefinitions] = useState('');
  const [manualExamples, setManualExamples] = useState('');

  // Load notes on mount
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    smartNotesService
      .fetchNotes(userId)
      .then((data) => {
        if (isMounted) {
          setNotes(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load notes:', err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [userId]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Folders grouped by subject
  const folders: SubjectFolder[] = useMemo(() => {
    return smartNotesService.groupNotesBySubject(notes);
  }, [notes]);

  // Filter notes based on selected folder and search query
  const filteredNotes = useMemo(() => {
    return notes.filter((n) => {
      const matchesFolder = selectedFolder === null || n.subject === selectedFolder;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesFolder;

      const matchesQuery =
        n.title.toLowerCase().includes(q) ||
        n.topic.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q) ||
        n.subject.toLowerCase().includes(q) ||
        n.key_points.some((kp) => kp.toLowerCase().includes(q));

      return matchesFolder && matchesQuery;
    });
  }, [notes, selectedFolder, searchQuery]);

  // Handle AI Note Generation
  const handleGenerateSmartNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawContentInput.trim()) {
      showToast('Please paste some text, lesson summary, or transcript.');
      return;
    }

    setIsGenerating(true);
    try {
      const generated = await smartNotesService.generateSmartNoteFromAI({
        content: rawContentInput.trim(),
        lessonTitle: lessonTitleInput.trim() || undefined,
        subjectHint: subjectHintInput,
        topicHint: topicHintInput.trim() || undefined
      });

      const saved = await smartNotesService.saveNote(generated, userId);
      setNotes((prev) => [saved, ...prev.filter((n) => n.id !== saved.id)]);
      setIsCreateModalOpen(false);
      setRawContentInput('');
      setLessonTitleInput('');
      setTopicHintInput('');
      setActiveNote(saved);
      showToast(`✨ Smart Note "${saved.title}" saved to ${saved.subject}!`);
    } catch (err: any) {
      console.error('Error generating smart note:', err);
      showToast('Generation encountered an issue, saved via fallback template.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle Manual Save
  const handleSaveManualNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualTitle.trim()) {
      showToast('Title is required');
      return;
    }

    const keyPointsArray = manualKeyPoints
      .split('\n')
      .map((k) => k.trim())
      .filter((k) => k.length > 0);

    // Parse simple key:value definitions
    const defsMap: Record<string, string> = {};
    manualDefinitions.split('\n').forEach((line) => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        defsMap[parts[0].trim()] = parts.slice(1).join(':').trim();
      } else if (line.trim()) {
        defsMap[line.trim()] = 'Key defined term.';
      }
    });

    const exMap: Record<string, string> = {};
    manualExamples.split('\n').forEach((line, idx) => {
      if (line.trim()) {
        exMap[`Example ${idx + 1}`] = line.trim();
      }
    });

    const saved = await smartNotesService.saveNote(
      {
        title: manualTitle.trim(),
        summary: manualSummary.trim() || 'Custom learner notes.',
        key_points: keyPointsArray.length > 0 ? keyPointsArray : ['Core concept review.'],
        definitions: defsMap,
        examples: exMap,
        subject: manualSubject,
        topic: manualTopic.trim() || 'General Study',
        language: 'en'
      },
      userId
    );

    setNotes((prev) => [saved, ...prev.filter((n) => n.id !== saved.id)]);
    setIsCreateModalOpen(false);
    setActiveNote(saved);
    showToast(`Note "${saved.title}" created successfully.`);
  };

  // Delete note
  const handleDeleteNote = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!confirm('Are you sure you want to delete this smart note?')) return;

    await smartNotesService.deleteNote(id, userId);
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (activeNote?.id === id) setActiveNote(null);
    showToast('Smart note deleted.');
  };

  const copyToClipboard = (text: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      showToast('Copied note to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 p-4 rounded-2xl bg-[#0F172A] border border-[#facc15] text-[#facc15] text-xs sm:text-sm font-semibold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <Sparkles className="w-4 h-4 text-[#facc15]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Header */}
      <div className="bg-gradient-to-b from-[#0F172A] via-[#111827] to-[#0F172A] text-white border-b border-slate-800 py-8 sm:py-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Notes v2 · Subject Folders</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              My Subject Folders &amp; Smart Notes
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 mt-1 max-w-2xl">
              Organized by subject like Google Drive. Auto-extract summaries, key points, definitions, and worked examples from any lesson or transcript.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setCreateMode('ai');
                setIsCreateModalOpen(true);
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#facc15] hover:bg-yellow-400 text-[#0F172A] font-bold text-xs sm:text-sm shadow-lg hover:shadow-yellow-500/20 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 stroke-[2.5]" />
              <span>Generate Smart Note</span>
            </button>

            <button
              onClick={() => {
                setCreateMode('manual');
                setIsCreateModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-xs sm:text-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Blank Note</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Search & Navigation Breadcrumb Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
            <button
              onClick={() => setSelectedFolder(null)}
              className={`hover:text-slate-950 dark:hover:text-white transition-colors flex items-center gap-1.5 ${
                selectedFolder === null ? 'text-blue-600 dark:text-blue-400 font-bold' : ''
              }`}
            >
              <Folder className="w-4 h-4 text-amber-500" />
              <span>All Subject Folders</span>
            </button>

            {selectedFolder && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-950 dark:text-white font-bold flex items-center gap-1">
                  <FolderOpen className="w-4 h-4 text-blue-500" />
                  <span>{selectedFolder}</span>
                </span>
                <button
                  onClick={() => setSelectedFolder(null)}
                  className="ml-2 text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  View All
                </button>
              </>
            )}
          </div>

          {/* Search bar across all notes */}
          <div className="relative sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in all notes or topics..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* SECTION 1: GOOGLE DRIVE STYLE SUBJECT FOLDERS */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Folder className="w-5 h-5 text-amber-500" />
              <span>Subject Folders</span>
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              {folders.length} {folders.length === 1 ? 'folder' : 'folders'} · {notes.length} notes total
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {folders.map((folder) => {
              const isSelected = selectedFolder === folder.subject;
              return (
                <button
                  key={folder.subject}
                  onClick={() => setSelectedFolder(isSelected ? null : folder.subject)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between group relative ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-400 dark:border-blue-600 shadow-md ring-2 ring-blue-500/30'
                      : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-700 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl ${folder.bgLight} ${folder.bgDark} flex items-center justify-center ${folder.color}`}>
                      {isSelected ? (
                        <FolderOpen className="w-5 h-5" />
                      ) : (
                        <Folder className="w-5 h-5 fill-current/20" />
                      )}
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      {folder.notesCount}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-500 transition-colors">
                      {folder.subject}
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                      {folder.notesCount} {folder.notesCount === 1 ? 'smart note' : 'smart notes'}
                    </p>
                  </div>

                  {isSelected && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: SMART NOTES CARDS LIST */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              <span>
                {selectedFolder ? `${selectedFolder} Notes` : 'All Smart Notes'}
              </span>
              <span className="text-xs font-mono font-normal text-slate-400">
                ({filteredNotes.length})
              </span>
            </h2>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-slate-500">
              <Sparkles className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-2" />
              <p className="text-sm font-medium">Loading Smart Notes...</p>
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-500 flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto">
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  No notes found
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {searchQuery
                    ? `No notes match "${searchQuery}". Clear your search to see all notes.`
                    : `No notes yet in ${selectedFolder || 'this folder'}. Create your first note now!`}
                </p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-[#facc15] hover:bg-yellow-400 text-[#0F172A] font-bold text-xs sm:text-sm shadow-md transition-all inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 stroke-[2.5]" />
                <span>Create or Auto-Generate Note</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredNotes.map((note) => {
                const folderCfg = SUBJECT_FOLDER_CONFIG[note.subject] || SUBJECT_FOLDER_CONFIG['General'];
                const formattedDate = new Date(note.created_at).toLocaleDateString('en-ZA', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                });

                const keyPointsCount = Array.isArray(note.key_points) ? note.key_points.length : 0;
                const defsCount = Object.keys(note.definitions || {}).length;

                return (
                  <div
                    key={note.id}
                    onClick={() => setActiveNote(note)}
                    className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 flex flex-col justify-between cursor-pointer group relative"
                  >
                    <div>
                      {/* Top Meta: Subject & Topic Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${folderCfg.bgLight} ${folderCfg.bgDark} ${folderCfg.color} border ${folderCfg.borderColor}`}
                        >
                          {note.subject}
                        </span>

                        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formattedDate}</span>
                        </span>
                      </div>

                      {/* Topic Kicker */}
                      <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-bold block mb-1">
                        {note.topic}
                      </span>

                      {/* Title */}
                      <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                        {cleanFormulaString(note.title)}
                      </h3>

                      {/* Summary Preview */}
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                        {cleanFormulaString(note.summary)}
                      </p>
                    </div>

                    {/* Card Footer: Counts & Action Buttons */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-2 text-[11px] font-mono">
                        <span>{keyPointsCount} points</span>
                        <span>·</span>
                        <span>{defsCount} terms</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => handleDeleteNote(note.id, e)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
                          title="Delete note"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* FULL NOTE VIEWER MODAL */}
      {activeNote && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50/50 dark:bg-slate-950/50">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    {activeNote.subject}
                  </span>
                  <span className="text-xs font-mono text-slate-500 font-semibold">
                    {activeNote.topic}
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-slate-400">
                    {new Date(activeNote.created_at).toLocaleDateString('en-ZA', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>

                <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                  {cleanFormulaString(activeNote.title)}
                </h2>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() =>
                    copyToClipboard(
                      `${activeNote.title}\n\nSUMMARY:\n${activeNote.summary}\n\nKEY POINTS:\n${activeNote.key_points.join(
                        '\n'
                      )}`
                    )
                  }
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Copy note text"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => handleDeleteNote(activeNote.id, e)}
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
                  title="Delete note"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveNote(null)}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Close viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
              {/* Summary Section */}
              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 block mb-1">
                  Executive Summary
                </span>
                <div className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed">
                  <CleanFormulaRenderer content={activeNote.summary} />
                </div>
              </div>

              {/* Key Points (Array) */}
              {Array.isArray(activeNote.key_points) && activeNote.key_points.length > 0 && (
                <div>
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Key Takeaway Points</span>
                  </h3>
                  <div className="space-y-2">
                    {activeNote.key_points.map((pt, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 flex items-start gap-3"
                      >
                        <span className="font-mono text-xs font-bold text-[#facc15] mt-0.5">
                          {idx + 1}.
                        </span>
                        <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          <CleanFormulaRenderer content={pt} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Definitions (Glossary) */}
              {activeNote.definitions && Object.keys(activeNote.definitions).length > 0 && (
                <div>
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-500" />
                    <span>Definitions &amp; Core Terminology</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(activeNote.definitions).map(([term, def], idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xs"
                      >
                        <span className="text-xs font-bold text-slate-950 dark:text-white block mb-1">
                          {term}
                        </span>
                        <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          <CleanFormulaRenderer content={String(def)} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Examples (JSON) */}
              {activeNote.examples && Object.keys(activeNote.examples).length > 0 && (
                <div>
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-purple-500" />
                    <span>Worked Examples &amp; Exam Calculations</span>
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(activeNote.examples).map(([title, ex], idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                      >
                        <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 block mb-1">
                          {title}
                        </span>
                        <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          <CleanFormulaRenderer content={String(ex)} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-500">
                Saved in {activeNote.subject} folder
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setCurrentTab('tutor');
                  }}
                  className="px-4 py-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-semibold hover:bg-purple-200 transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask AI Tutor About This</span>
                </button>
                <button
                  onClick={() => setActiveNote(null)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / AI GENERATE SMART NOTE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#facc15] text-[#0F172A] flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    Create Smart Note v2
                  </h3>
                  <p className="text-xs text-slate-500">
                    Auto-synthesizes key points, definitions, and worked examples
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode Selector */}
            <div className="px-6 pt-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <button
                type="button"
                onClick={() => setCreateMode('ai')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  createMode === 'ai'
                    ? 'bg-[#facc15] text-[#0F172A] shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Auto-Generate from Text / Lesson</span>
              </button>

              <button
                type="button"
                onClick={() => setCreateMode('manual')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  createMode === 'manual'
                    ? 'bg-[#facc15] text-[#0F172A] shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Manual Creation</span>
              </button>
            </div>

            {/* FORM 1: AI Auto-Generate */}
            {createMode === 'ai' ? (
              <form onSubmit={handleGenerateSmartNote} className="p-6 space-y-4 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Subject (Auto-categorized folder)
                    </label>
                    <select
                      value={subjectHintInput}
                      onChange={(e) => setSubjectHintInput(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                    >
                      <option value="Mathematics">Mathematics</option>
                      <option value="Physical Sciences">Physical Sciences</option>
                      <option value="Life Sciences">Life Sciences</option>
                      <option value="English">English</option>
                      <option value="Accounting">Accounting</option>
                      <option value="Economics">Economics</option>
                      <option value="Geography">Geography</option>
                      <option value="History">History</option>
                      <option value="General">General / TVET</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Topic or Lesson Title (Optional)
                    </label>
                    <input
                      type="text"
                      value={topicHintInput}
                      onChange={(e) => setTopicHintInput(e.target.value)}
                      placeholder="e.g. Newton's Second Law, Mitosis"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Lesson Content / Transcript / Study Material
                  </label>
                  <textarea
                    rows={6}
                    value={rawContentInput}
                    onChange={(e) => setRawContentInput(e.target.value)}
                    placeholder="Paste textbook explanation, teacher notes, formula steps, or lesson audio transcript here..."
                    className="w-full px-3.5 py-3 text-xs sm:text-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] leading-relaxed"
                    required
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    NEXOVIAN AI will detect key definitions, generate bullet points, and structure worked examples into a clean subject folder.
                  </p>
                </div>

                <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="px-5 py-2.5 rounded-xl bg-[#facc15] hover:bg-yellow-400 text-[#0F172A] font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="w-4 h-4 animate-spin text-[#0F172A]" />
                        <span>Synthesizing Smart Note...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 stroke-[2.5]" />
                        <span>Auto-Generate Note</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* FORM 2: Manual Creation */
              <form onSubmit={handleSaveManualNote} className="p-6 space-y-4 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Note Title
                    </label>
                    <input
                      type="text"
                      value={manualTitle}
                      onChange={(e) => setManualTitle(e.target.value)}
                      placeholder="e.g. Work-Energy Theorem"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Subject
                    </label>
                    <select
                      value={manualSubject}
                      onChange={(e) => setManualSubject(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                    >
                      <option value="Mathematics">Mathematics</option>
                      <option value="Physical Sciences">Physical Sciences</option>
                      <option value="Life Sciences">Life Sciences</option>
                      <option value="English">English</option>
                      <option value="Accounting">Accounting</option>
                      <option value="Economics">Economics</option>
                      <option value="Geography">Geography</option>
                      <option value="History">History</option>
                      <option value="General">General / TVET</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Topic / Sub-chapter
                  </label>
                  <input
                    type="text"
                    value={manualTopic}
                    onChange={(e) => setManualTopic(e.target.value)}
                    placeholder="e.g. Mechanics & Energy"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Summary
                  </label>
                  <textarea
                    rows={2}
                    value={manualSummary}
                    onChange={(e) => setManualSummary(e.target.value)}
                    placeholder="Brief 2-sentence overview..."
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Key Points (One point per line)
                  </label>
                  <textarea
                    rows={3}
                    value={manualKeyPoints}
                    onChange={(e) => setManualKeyPoints(e.target.value)}
                    placeholder="Point 1&#10;Point 2&#10;Point 3"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Definitions (Format: Term: Definition, one per line)
                  </label>
                  <textarea
                    rows={2}
                    value={manualDefinitions}
                    onChange={(e) => setManualDefinitions(e.target.value)}
                    placeholder="Work: The product of the displacement and the component of force in direction of motion"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#facc15] hover:bg-yellow-400 text-[#0F172A] font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                  >
                    Save Note to Folder
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
