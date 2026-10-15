/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Nexovia Xitsonga Language Engine - Phrasebook & Verification Hub
 */

import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  BookOpen,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Filter,
  ShieldCheck,
  Plus,
  Edit3,
  History,
  Sparkles,
  ArrowRight,
  Send,
  Lock,
  Mic,
  FileAudio
} from 'lucide-react';
import { languageEngine } from '../../services/language/languageEngine';
import { LanguageRecord, LanguageEntryStatus, PronunciationPracticeAttempt } from '../../types/language';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { SpeakerButton } from '../audio/SpeakerButton';
import { PronunciationPracticeModal } from '../audio/PronunciationPracticeModal';
import { AdminAudioUploadModal } from '../audio/AdminAudioUploadModal';

interface XitsongaPhrasebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPhraseForTutor?: (phrase: LanguageRecord) => void;
}

export const XitsongaPhrasebookModal: React.FC<XitsongaPhrasebookModalProps> = ({
  isOpen,
  onClose,
  onSelectPhraseForTutor
}) => {
  const { user } = useAuth();
  const { setCurrentTab, updateLearningContext } = useLearning();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Admin state
  const [editingPhrase, setEditingPhrase] = useState<LanguageRecord | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [adminActionError, setAdminActionError] = useState<string | null>(null);
  const [adminActionSuccess, setAdminActionSuccess] = useState<string | null>(null);
  const [showAuditHistory, setShowAuditHistory] = useState(false);

  // Phase 2 Audio & Pronunciation state
  const [practicePhrase, setPracticePhrase] = useState<LanguageRecord | null>(null);
  const [audioAdminPhrase, setAudioAdminPhrase] = useState<LanguageRecord | null>(null);

  // Form states for add/edit
  const [formData, setFormData] = useState({
    english: '',
    xitsonga: '',
    pronunciation: '',
    category: 'basic',
    status: 'verified' as LanguageEntryStatus,
    source: 'native_user_verified',
    example: '',
    notes: ''
  });

  const isAdmin = useMemo(() => {
    const role = (user?.role || '').toUpperCase();
    return role === 'ADMIN' || role === 'SUPER_ADMIN' || role === 'CURRICULUM_ADMIN';
  }, [user]);

  const stats = useMemo(() => {
    return languageEngine.getStats();
  }, []);

  const phrases = useMemo(() => {
    return languageEngine.getAllPhrases({
      category: selectedCategory,
      status: selectedStatus as any,
      query: searchQuery
    });
  }, [selectedCategory, selectedStatus, searchQuery, editingPhrase, isAddingNew]);

  const auditLogs = useMemo(() => {
    return languageEngine.getAuditHistory();
  }, [showAuditHistory]);

  if (!isOpen) return null;

  const handleCopy = (id: string, text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleSendToTutor = (record: LanguageRecord) => {
    if (updateLearningContext) {
      updateLearningContext({
        language: 'ts',
        topic: record.english
      });
    }
    if (onSelectPhraseForTutor) {
      onSelectPhraseForTutor(record);
    } else {
      setCurrentTab('tutor');
    }
    onClose();
  };

  const startEdit = (phrase: LanguageRecord) => {
    if (!isAdmin) {
      setAdminActionError('Unauthorized: Only Nexovia administrators can modify verified phrases.');
      return;
    }
    setEditingPhrase(phrase);
    setFormData({
      english: phrase.english,
      xitsonga: phrase.xitsonga,
      pronunciation: phrase.pronunciation,
      category: phrase.category,
      status: phrase.status,
      source: phrase.source,
      example: phrase.example,
      notes: phrase.notes
    });
    setAdminActionError(null);
    setAdminActionSuccess(null);
  };

  const startAddNew = () => {
    if (!isAdmin) {
      setAdminActionError('Unauthorized: Only Nexovia administrators can add phrases.');
      return;
    }
    setIsAddingNew(true);
    setFormData({
      english: '',
      xitsonga: '',
      pronunciation: '',
      category: 'basic',
      status: 'verified',
      source: `admin_${user?.email || 'verified'}`,
      example: '',
      notes: ''
    });
    setAdminActionError(null);
    setAdminActionSuccess(null);
  };

  const handleSavePhrase = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminActionError(null);
    setAdminActionSuccess(null);

    if (!isAdmin) {
      setAdminActionError('Unauthorized: Administrator role required.');
      return;
    }

    if (editingPhrase) {
      const res = languageEngine.adminUpdatePhrase(
        editingPhrase.id,
        {
          english: formData.english,
          xitsonga: formData.xitsonga,
          pronunciation: formData.pronunciation,
          category: formData.category,
          status: formData.status,
          source: formData.source,
          example: formData.example,
          notes: formData.notes
        },
        { role: user?.role, email: user?.email }
      );
      if (res.success) {
        setAdminActionSuccess('Phrase updated successfully in verified dataset.');
        setEditingPhrase(null);
      } else {
        setAdminActionError(res.error || 'Failed to update phrase.');
      }
    } else if (isAddingNew) {
      const res = languageEngine.adminAddPhrase(
        formData,
        { role: user?.role, email: user?.email }
      );
      if (res.success) {
        setAdminActionSuccess('New phrase added to verified dataset.');
        setIsAddingNew(false);
      } else {
        setAdminActionError(res.error || 'Failed to add phrase.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-400 text-slate-950">
                Foundational Language Engine
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Controlled Native Vocabulary (80 Phrases)</span>
              </span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Nexovia Xitsonga Phrasebook
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Native-speaker verified educational vocabulary across everyday language, classroom interactions, mathematics, and Socratic tutoring. AI models are strictly constrained to these verified phrases.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={startAddNew}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Phrase</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats & Legend Strip */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-slate-600 dark:text-slate-400">
              Total Terms: <strong className="text-slate-900 dark:text-white font-mono">{stats.totalPhrases}</strong>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Verified: <strong className="font-mono">{stats.verifiedCount}</strong></span>
            </span>
            <span className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Pending Native Verification: <strong className="font-mono">{stats.needsVerificationCount}</strong></span>
            </span>
            {stats.verifiedAudioCount !== undefined && stats.verifiedAudioCount > 0 && (
              <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Verified Audio: <strong className="font-mono">{stats.verifiedAudioCount}</strong></span>
              </span>
            )}
            {stats.verifiedPronunciationCount !== undefined && stats.verifiedPronunciationCount > 0 && (
              <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Verified Pronunciations: <strong className="font-mono">{stats.verifiedPronunciationCount}</strong></span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500">
              Anti-Hallucination Guardrails: <strong className="text-emerald-600">Active</strong>
            </span>
            {isAdmin && (
              <button
                onClick={() => setShowAuditHistory(!showAuditHistory)}
                className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:underline ml-2"
              >
                <History className="w-3 h-3" />
                <span>Audit History</span>
              </button>
            )}
          </div>
        </div>

        {/* Admin Alerts */}
        {adminActionError && (
          <div className="mx-4 sm:mx-6 mt-3 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center justify-between">
            <span>{adminActionError}</span>
            <button onClick={() => setAdminActionError(null)} className="text-rose-400 hover:text-rose-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        {adminActionSuccess && (
          <div className="mx-4 sm:mx-6 mt-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-center justify-between">
            <span>{adminActionSuccess}</span>
            <button onClick={() => setAdminActionSuccess(null)} className="text-emerald-400 hover:text-emerald-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search English or Xitsonga (e.g. 'Hello', 'Nhlamulo', 'Calculate')..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
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

          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Categories ({stats.totalPhrases})</option>
              <option value="basic">Set 1 — Basic Language</option>
              <option value="classroom">Set 2 — Classroom</option>
              <option value="instructions">Set 4 — Learning Instructions</option>
              <option value="conversation">Set 5 — Tutor Conversation</option>
              <option value="encouragement">Set 6 — Encouragement</option>
              <option value="mathematics">Set 7 — Mathematics</option>
              <option value="mathematics_sentences">Set 8 — Math Sentences</option>
              <option value="tutor">Set 10 — AI Tutor Interactions</option>
              <option value="everyday_conversation">Set 11 — Everyday Classroom</option>
              <option value="understanding_questions">Set 12 — Understanding Checks</option>
              <option value="problem_solving">Set 13 — Problem Solving</option>
              <option value="explaining_concepts">Set 14 — Explaining Concepts</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Statuses</option>
              <option value="verified">Verified Xitsonga Only</option>
              <option value="needs_verification">Pending Verification</option>
            </select>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Edit / Add Form Modal */}
          {(editingPhrase || isAddingNew) && (
            <div className="mb-6 p-5 rounded-2xl bg-amber-50/50 dark:bg-slate-800/80 border border-amber-300 dark:border-amber-800/80 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-amber-600" />
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {editingPhrase ? `Edit Phrase: ${editingPhrase.english}` : 'Add New Verified Phrase'}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setEditingPhrase(null);
                    setIsAddingNew(false);
                  }}
                  className="text-slate-400 hover:text-slate-600 text-xs"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleSavePhrase} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    English Concept / Phrase *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.english}
                    onChange={(e) => setFormData({ ...formData, english: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Xitsonga Translation (Leave empty if unverified)
                  </label>
                  <input
                    type="text"
                    value={formData.xitsonga}
                    onChange={(e) => setFormData({ ...formData, xitsonga: e.target.value })}
                    placeholder="Exact native phrasing..."
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    <option value="verified">Verified Xitsonga</option>
                    <option value="needs_verification">Needs Verification</option>
                    <option value="unverified">Unverified</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    <option value="basic">Basic Language</option>
                    <option value="classroom">Classroom</option>
                    <option value="instructions">Instructions</option>
                    <option value="conversation">Tutor Conversation</option>
                    <option value="encouragement">Encouragement</option>
                    <option value="mathematics">Mathematics</option>
                    <option value="mathematics_sentences">Math Sentences</option>
                    <option value="tutor">AI Tutor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Pronunciation Guide (Optional phonetic breakdown)
                  </label>
                  <input
                    type="text"
                    value={formData.pronunciation}
                    onChange={(e) => setFormData({ ...formData, pronunciation: e.target.value })}
                    placeholder="Leave empty until verified audio/phonetic info is available"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Source
                  </label>
                  <input
                    type="text"
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Pedagogical Notes / Native Usage
                  </label>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingPhrase(null);
                      setIsAddingNew(false);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold"
                  >
                    Save Phrase Record
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Audit History Drawer if toggled */}
          {showAuditHistory && (
            <div className="mb-6 p-4 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-amber-500" />
                  <span>Administrative Change History & Audit Logs</span>
                </h4>
                <button onClick={() => setShowAuditHistory(false)} className="text-slate-400 text-xs">
                  Close
                </button>
              </div>
              {auditLogs.length === 0 ? (
                <p className="text-xs text-slate-500">No modifications logged yet. Native dataset in pristine state.</p>
              ) : (
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="text-[11px] p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-amber-600 dark:text-amber-400 uppercase">{log.action}: </span>
                        <span>{log.phraseId} by {log.changedBy}</span>
                        {log.reason && <span className="text-slate-400"> ({log.reason})</span>}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{new Date(log.timestamp).toLocaleTimeString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Phrases Grid */}
          {phrases.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
              <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300">No matching phrases found</h3>
              <p className="text-xs text-slate-500 mt-1">Try relaxing your search query or category filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {phrases.map((phrase) => {
                const isVerified = phrase.status === 'verified' && Boolean(phrase.xitsonga);
                const isPending = phrase.status === 'needs_verification' || !phrase.xitsonga;

                return (
                  <div
                    key={phrase.id}
                    className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-amber-400/60 dark:hover:border-amber-500/50 transition-all flex flex-col justify-between shadow-2xs group"
                  >
                    <div>
                      {/* Badge Header */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {phrase.category.replace('_', ' ')}
                        </span>

                        {isVerified ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            <span>VERIFIED XITSONGA</span>
                          </span>
                        ) : isPending ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                            <AlertTriangle className="w-3 h-3 text-amber-500" />
                            <span>NEEDS VERIFICATION</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700">
                            <HelpCircle className="w-3 h-3 text-slate-400" />
                            <span>AI-GENERATED / UNVERIFIED</span>
                          </span>
                        )}
                      </div>

                      {/* Content Rows */}
                      <div className="space-y-1 mt-1">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                            English:
                          </span>
                          <span className="text-sm font-semibold text-slate-900 dark:text-white">
                            {phrase.english}
                          </span>
                        </div>

                        <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800/60">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 dark:text-amber-400 block mb-0.5">
                            Xitsonga:
                          </span>
                          {phrase.xitsonga ? (
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="text-base font-bold text-amber-600 dark:text-amber-300 font-display">
                                  {phrase.xitsonga}
                                </span>
                                <SpeakerButton
                                  audioUrl={phrase.audioUrl}
                                  audioStatus={phrase.audioStatus}
                                  voiceSource={phrase.voiceSource}
                                  phraseText={phrase.xitsonga}
                                  size="sm"
                                  showLabel={false}
                                />
                              </div>
                              <button
                                onClick={() => handleCopy(phrase.id, phrase.xitsonga)}
                                title="Copy Xitsonga phrase"
                                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded transition-colors"
                              >
                                {copiedId === phrase.id ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs italic text-amber-700/80 dark:text-amber-400/80 bg-amber-50/50 dark:bg-amber-950/20 px-2 py-0.5 rounded block">
                              Pending native user verification · Translation not invented
                            </span>
                          )}
                        </div>

                        {/* Pronunciation Section: Display ONLY if verified! */}
                        {phrase.pronunciationStatus === 'verified' && phrase.pronunciation ? (
                          <div className="text-[11px] text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 pt-1.5">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600">Pronunciation:</span>
                            <span className="font-mono bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 font-semibold">
                              {phrase.pronunciation}
                            </span>
                            <span className="text-[9px] text-emerald-600 font-bold uppercase">(Verified)</span>
                          </div>
                        ) : (
                          <div className="text-[10px] text-slate-400 italic pt-1 flex items-center gap-1">
                            <VolumeX className="w-3 h-3 text-slate-400" />
                            <span>Pronunciation phonetics & audio pending verification</span>
                          </div>
                        )}

                        {/* Example sentence */}
                        {phrase.example && (
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 italic pt-1">
                            "{phrase.example}"
                          </p>
                        )}
                        {phrase.notes && (
                          <p className="text-[10px] text-slate-500 pt-0.5">
                            Note: {phrase.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="mt-3.5 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-slate-400">
                        Source: {phrase.source}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {/* Pronunciation Practice Trigger */}
                        <button
                          onClick={() => setPracticePhrase(phrase)}
                          className="flex items-center gap-1 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-[11px] font-semibold transition-colors"
                          title="Practice Saying Phrase"
                        >
                          <Mic className="w-3 h-3 text-amber-500" />
                          <span className="hidden sm:inline">Practice</span>
                        </button>

                        {/* Admin Audio & Pronunciation Manager */}
                        {isAdmin && (
                          <button
                            onClick={() => setAudioAdminPhrase(phrase)}
                            className="flex items-center gap-1 px-2 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-[11px] font-semibold transition-colors"
                            title="Manage Audio & Pronunciation (Admin)"
                          >
                            <FileAudio className="w-3 h-3 text-emerald-600" />
                            <span className="hidden sm:inline">Audio</span>
                          </button>
                        )}

                        {isAdmin && (
                          <button
                            onClick={() => startEdit(phrase)}
                            className="p-1 text-slate-400 hover:text-amber-500 transition-colors"
                            title="Edit Phrase Record (Admin)"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          onClick={() => handleSendToTutor(phrase)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[11px] shadow-2xs transition-transform active:scale-95"
                        >
                          <Send className="w-3 h-3" />
                          <span>Tutor</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500 text-[11px]">
            <Lock className="w-3.5 h-3.5 text-amber-500" />
            <span>
              Learners enjoy full read-only access. Modifications require administrator authorization and are audited.
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold rounded-xl text-xs transition-colors"
          >
            Close Phrasebook
          </button>
        </div>
      </div>

      {/* Phase 2: Pronunciation Practice Modal */}
      <PronunciationPracticeModal
        phrase={practicePhrase}
        isOpen={Boolean(practicePhrase)}
        onClose={() => setPracticePhrase(null)}
      />

      {/* Phase 2: Admin Audio Upload & Review Modal */}
      <AdminAudioUploadModal
        phrase={audioAdminPhrase}
        isOpen={Boolean(audioAdminPhrase)}
        onClose={() => setAudioAdminPhrase(null)}
        onSaved={(updated) => {
          setAudioAdminPhrase(null);
        }}
      />
    </div>
  );
};
