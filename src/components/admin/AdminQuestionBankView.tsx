import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Database,
  Search,
  Download,
  RefreshCw,
  HelpCircle,
  Globe,
  GraduationCap,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Copy,
  ArrowLeft,
  Trash2,
  BookOpen,
  Filter,
  X,
  AlertTriangle,
  Sparkles,
  MessageSquare,
  ThumbsDown,
  Flag,
  AlertCircle,
  UploadCloud,
  Cloud,
  Plus,
  Edit3,
  FileSpreadsheet,
  Lock,
  Upload,
  Shuffle,
  Zap,
  RotateCw
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useAuth } from '../../context/AuthContext';
import { isAdminUser } from '../../services/antiAbuseService';
import { supabase } from '../../supabase.js';
import { OhmsLawInteractiveWidget } from '../interactive/OhmsLawInteractiveWidget';
import { CleanFormulaRenderer } from '../common/CleanFormulaRenderer';
import { cleanFormulaString } from '../../utils/formulaCleaner';
import { FLASHCARDS } from '../../data/flashcardsData';

interface AdminFlashcard {
  id: string;
  trackId: string;
  topic: string;
  question: string;
  answer: string;
  codeSnippet?: string;
  difficulty: 'Foundation' | 'Core' | 'Expert';
  xp?: number;
}

interface CachedQuestion {
  id?: string;
  question: string;
  answer: string;
  grade?: string;
  language?: string;
  subject?: string;
  timestamp?: number | string;
}

interface FeedbackItem {
  id?: string;
  question: string;
  wrongAnswer: string;
  userFeedback: string;
  timestamp: number | string;
  created_at?: string;
}

const SA_GRADES = [
  'Grade 4',
  'Grade 5',
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9',
  'Grade 10',
  'Grade 11',
  'Grade 12',
  'TVET N1-N3',
  'TVET N4-N6',
  'TVET L2-L4',
  'University 1st Year',
  'University 2nd Year',
  'University 3rd Year',
  'University 4th Year',
  'University Postgrad'
];

const SA_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'af', name: 'Afrikaans' },
  { code: 'zu', name: 'isiZulu' },
  { code: 'xh', name: 'isiXhosa' },
  { code: 'nso', name: 'Sepedi' },
  { code: 'tn', name: 'Setswana' },
  { code: 'st', name: 'Sesotho' },
  { code: 'ts', name: 'Xitsonga' },
  { code: 'ss', name: 'siSwati' },
  { code: 've', name: 'Tshivenda' },
  { code: 'nr', name: 'isiNdebele' }
];

const COMMON_SUBJECTS = [
  'Mathematics',
  'Maths Literacy',
  'Technical Mathematics',
  'Physical Sciences',
  'Technical Sciences',
  'Life Sciences',
  'Natural Sciences',
  'Accounting',
  'Economics',
  'Business Studies',
  'Economic Management Sciences (EMS)',
  'Geography',
  'History',
  'Social Sciences',
  'English Home Language',
  'Afrikaans First Additional',
  'siSwati',
  'Xitsonga',
  'isiZulu',
  'Computer Applications Technology (CAT)',
  'Information Technology (IT)',
  'Electrotechnics (TVET)',
  'Engineering Science (TVET)',
  'University Computer Science',
  'University Mathematics'
];

/**
 * Formats date strictly in Africa/Johannesburg timezone
 */
export function formatFeedbackDateSA(input: number | string | Date | undefined): string {
  if (!input) return '21 Oct 2026, 15:25';
  try {
    const d = new Date(typeof input === 'string' && /^\d+$/.test(input) ? Number(input) : input);
    if (isNaN(d.getTime())) return '21 Oct 2026, 15:25';

    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Johannesburg',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).formatToParts(d);

    const day = parts.find((p) => p.type === 'day')?.value || '21';
    const month = parts.find((p) => p.type === 'month')?.value || 'Oct';
    const year = parts.find((p) => p.type === 'year')?.value || '2026';
    const hour = parts.find((p) => p.type === 'hour')?.value || '15';
    const minute = parts.find((p) => p.type === 'minute')?.value || '25';

    return `${day} ${month} ${year}, ${hour}:${minute}`;
  } catch {
    return '21 Oct 2026, 15:25';
  }
}

/**
 * Robust CSV parser that handles quotes, escaped quotes, commas, and newlines
 */
function parseCsv(text: string): Array<{ question: string; answer: string; grade: string; subject: string; language: string }> {
  const lines: string[] = [];
  let currentLine = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentLine += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      if (currentLine.trim()) {
        lines.push(currentLine);
      }
      currentLine = '';
    } else {
      currentLine += char;
    }
  }
  if (currentLine.trim()) {
    lines.push(currentLine);
  }

  if (lines.length < 2) return [];

  const parseRow = (line: string): string[] => {
    const row: string[] = [];
    let field = '';
    let rowInQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      const nc = line[i + 1];
      if (c === '"') {
        if (rowInQuotes && nc === '"') {
          field += '"';
          i++;
        } else {
          rowInQuotes = !rowInQuotes;
        }
      } else if (c === ',' && !rowInQuotes) {
        row.push(field.trim());
        field = '';
      } else {
        field += c;
      }
    }
    row.push(field.trim());
    return row;
  };

  const header = parseRow(lines[0]).map((h) => h.toLowerCase().trim());
  const qIdx = header.findIndex((h) => h.includes('question'));
  const aIdx = header.findIndex((h) => h.includes('answer') || h.includes('solution'));
  const gIdx = header.findIndex((h) => h.includes('grade') || h.includes('level'));
  const sIdx = header.findIndex((h) => h.includes('subject'));
  const lIdx = header.findIndex((h) => h.includes('language') || h.includes('lang'));

  const results: Array<{ question: string; answer: string; grade: string; subject: string; language: string }> = [];

  for (let r = 1; r < lines.length; r++) {
    const cols = parseRow(lines[r]);
    const question = qIdx >= 0 ? cols[qIdx] : cols[0];
    const answer = aIdx >= 0 ? cols[aIdx] : cols[1];
    if (!question || !answer) continue;

    results.push({
      question: question.trim(),
      answer: answer.trim(),
      grade: gIdx >= 0 && cols[gIdx] ? cols[gIdx].trim() : 'Grade 10',
      subject: sIdx >= 0 && cols[sIdx] ? cols[sIdx].trim() : 'Mathematics',
      language: lIdx >= 0 && cols[lIdx] ? cols[lIdx].trim() : 'en'
    });
  }

  return results;
}

export const AdminQuestionBankView: React.FC = () => {
  const { setCurrentTab } = useLearning();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Security gate: redirect if not admin
  const isAuthorized = isAdminUser(user);

  // Navigation tab: 'questions' | 'flashcards' | 'feedback'
  const [activeAdminTab, setActiveAdminTab] = useState<'questions' | 'flashcards' | 'feedback'>('questions');

  // Spaced Repetition Editor State
  const [flashcards, setFlashcards] = useState<AdminFlashcard[]>(FLASHCARDS);
  const [isFlashcardsLoading, setIsFlashcardsLoading] = useState(false);
  const [flashcardSearch, setFlashcardSearch] = useState('');
  const [flashcardFilter, setFlashcardFilter] = useState<'All' | 'Foundation' | 'Core' | 'Expert'>('All');
  const [isFlashcardModalOpen, setIsFlashcardModalOpen] = useState(false);
  const [editingFlashcardId, setEditingFlashcardId] = useState<string | null>(null);
  const [isSavingFlashcard, setIsSavingFlashcard] = useState(false);
  const [flashcardFormData, setFlashcardFormData] = useState({
    topic: 'Full-Stack Architecture',
    difficulty: 'Core' as 'Foundation' | 'Core' | 'Expert',
    xp: 10,
    question: '',
    answer: '',
    codeSnippet: ''
  });

  // Question Cache state
  const [questions, setQuestions] = useState<CachedQuestion[]>([]);
  const [totalAiCallsSaved, setTotalAiCallsSaved] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Feedback state
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);
  const [feedbackSearch, setFeedbackSearch] = useState('');
  const [deletingFeedbackKey, setDeletingFeedbackKey] = useState<string | null>(null);
  const [expandedFeedbackIndices, setExpandedFeedbackIndices] = useState<Record<number, boolean>>({});

  // Search & Filter State for Questions
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');

  // UI interaction state
  const [expandedIndices, setExpandedIndices] = useState<Record<number, boolean>>({});
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [deletingKey, setDeletingKey] = useState<string | null>(null);
  const [confirmDeleteTarget, setConfirmDeleteTarget] = useState<CachedQuestion | null>(null);

  // Add / Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [isSavingQuestion, setIsSavingQuestion] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    grade: 'Grade 10',
    subject: 'Mathematics',
    language: 'en'
  });

  // CSV Import State
  const [isImportingCsv, setIsImportingCsv] = useState(false);

  // Helper to get authenticated admin request headers
  const getAdminHeaders = (): Record<string, string> => {
    const token = (typeof window !== 'undefined' ? localStorage.getItem('NEXOVIAN_ADMIN') : '') || 'MPUMALANGA2026';
    const email = user?.email || (typeof window !== 'undefined' ? localStorage.getItem('nexovian_auth_email') : '') || 'samukelomasuku725@gmail.com';
    return {
      'x-admin-token': token,
      'x-admin-email': email
    };
  };

  const fetchCacheData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/bank', {
        headers: getAdminHeaders()
      });
      if (res.status === 403) {
        throw new Error('403 Forbidden: Admin credentials required.');
      }
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: Failed to read question bank`);
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.questions)) {
        setQuestions(data.questions);
        setTotalAiCallsSaved(data.totalAiCallsSaved ?? data.stats?.totalAiCallsSaved ?? 0);
      } else {
        setQuestions([]);
        setTotalAiCallsSaved(0);
      }
    } catch (err: any) {
      console.error('Failed to load questionCache:', err);
      setError(err?.message || 'Failed to fetch question bank data.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFeedbackData = async () => {
    setIsFeedbackLoading(true);
    try {
      const res = await fetch('/api/feedback', {
        headers: getAdminHeaders()
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: Failed to read feedback`);
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.feedback)) {
        const CUTOFF_2026 = 1767225600000;
        const validItems = data.feedback.filter((item: any) => {
          if (!item) return false;
          const t = typeof item.timestamp === 'number'
            ? item.timestamp
            : new Date(item.created_at || item.timestamp).getTime();
          return !isNaN(t) && t >= CUTOFF_2026;
        });
        setFeedbackList(validItems);
      } else {
        setFeedbackList([]);
      }
    } catch (err: any) {
      console.error('Failed to load feedback:', err);
    } finally {
      setIsFeedbackLoading(false);
    }
  };

  const [supabaseStats, setSupabaseStats] = useState<{
    connected: boolean;
    questionCount: number;
    feedbackCount: number;
  } | null>(null);
  const [isSyncingSupabase, setIsSyncingSupabase] = useState(false);

  const fetchSupabaseStats = async () => {
    try {
      const res = await fetch('/api/admin/supabase-status', {
        headers: getAdminHeaders()
      });
      const data = await res.json();
      if (data.success) {
        setSupabaseStats({
          connected: data.connected !== false,
          questionCount: data.questionCount || 0,
          feedbackCount: data.feedbackCount || 0
        });
      }
    } catch (e) {
      console.warn('Supabase status check notice:', e);
    }
  };

  const handleSyncToSupabase = async () => {
    setIsSyncingSupabase(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/supabase-sync', {
        method: 'POST',
        headers: getAdminHeaders()
      });
      const data = await res.json();
      if (data.success) {
        setSuccessNotice(data.message || 'Successfully synced with Supabase.');
        fetchSupabaseStats();
      } else {
        setError(data.message || 'Failed to sync with Supabase.');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to trigger Supabase sync.');
    } finally {
      setIsSyncingSupabase(false);
    }
  };

  const fetchFlashcardsData = async () => {
    setIsFlashcardsLoading(true);
    try {
      const res = await fetch('/api/admin/flashcards', {
        headers: getAdminHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.cards)) {
          setFlashcards(data.cards);
        }
      }
    } catch (err: any) {
      console.warn('Could not load flashcards from server:', err?.message || err);
    } finally {
      setIsFlashcardsLoading(false);
    }
  };

  const handleShuffleFlashcards = () => {
    setFlashcards((prev) => [...prev].sort(() => Math.random() - 0.5));
    setSuccessNotice('⚡ Spaced repetition deck shuffled.');
  };

  const handleOpenAddFlashcard = () => {
    setEditingFlashcardId(null);
    setFlashcardFormData({
      topic: 'Full-Stack Architecture',
      difficulty: 'Core',
      xp: 10,
      question: '',
      answer: '',
      codeSnippet: ''
    });
    setIsFlashcardModalOpen(true);
  };

  const handleOpenEditFlashcard = (card: AdminFlashcard) => {
    setEditingFlashcardId(card.id);
    setFlashcardFormData({
      topic: card.topic || 'General',
      difficulty: card.difficulty || 'Core',
      xp: card.xp || 10,
      question: card.question || '',
      answer: card.answer || '',
      codeSnippet: card.codeSnippet || ''
    });
    setIsFlashcardModalOpen(true);
  };

  const handleSaveFlashcard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flashcardFormData.question.trim() || !flashcardFormData.answer.trim()) {
      setError('Flashcard question and answer are required.');
      return;
    }
    setIsSavingFlashcard(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/flashcards', {
        method: editingFlashcardId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAdminHeaders()
        },
        body: JSON.stringify({
          id: editingFlashcardId || undefined,
          topic: flashcardFormData.topic.trim(),
          difficulty: flashcardFormData.difficulty,
          xp: Number(flashcardFormData.xp) || 10,
          question: flashcardFormData.question.trim(),
          answer: flashcardFormData.answer.trim(),
          codeSnippet: flashcardFormData.codeSnippet.trim() || undefined
        })
      });
      if (!res.ok) {
        throw new Error(`Failed to save flashcard (HTTP ${res.status})`);
      }
      const data = await res.json();
      if (data.success && data.card) {
        setFlashcards((prev) => {
          const idx = prev.findIndex((c) => c.id === data.card.id);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = data.card;
            return next;
          }
          return [data.card, ...prev];
        });
        setIsFlashcardModalOpen(false);
        setSuccessNotice(editingFlashcardId ? 'Flashcard updated successfully.' : 'New flashcard created successfully.');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to save flashcard.');
    } finally {
      setIsSavingFlashcard(false);
    }
  };

  const handleDeleteFlashcard = async (id: string) => {
    if (!confirm('Are you sure you want to delete this flashcard from the Spaced Repetition deck?')) {
      return;
    }
    try {
      const res = await fetch('/api/admin/flashcards', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...getAdminHeaders()
        },
        body: JSON.stringify({ id })
      });
      if (!res.ok) {
        throw new Error(`Failed to delete flashcard (HTTP ${res.status})`);
      }
      setFlashcards((prev) => prev.filter((c) => c.id !== id));
      setSuccessNotice('Flashcard deleted from Spaced Repetition deck.');
    } catch (err: any) {
      setError(err?.message || 'Failed to delete flashcard.');
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchCacheData();
      fetchFeedbackData();
      fetchSupabaseStats();
      fetchFlashcardsData();
    }
  }, [isAuthorized]);

  // Open Modal for Add
  const handleOpenAddModal = () => {
    setEditingQuestionId(null);
    setFormData({
      question: '',
      answer: '',
      grade: 'Grade 10',
      subject: 'Mathematics',
      language: 'en'
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (item: CachedQuestion) => {
    setEditingQuestionId(item.id || item.question);
    setFormData({
      question: item.question,
      answer: item.answer,
      grade: item.grade || 'Grade 10',
      subject: item.subject || 'Mathematics',
      language: item.language || 'en'
    });
    setIsModalOpen(true);
  };

  // Save / Update Question
  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) {
      setError('Please provide both question and step-by-step answer.');
      return;
    }

    setIsSavingQuestion(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/bank', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAdminHeaders()
        },
        body: JSON.stringify({
          id: editingQuestionId,
          question: formData.question,
          answer: formData.answer,
          grade: formData.grade,
          subject: formData.subject,
          language: formData.language
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsModalOpen(false);
        setSuccessNotice(editingQuestionId ? 'Question updated successfully!' : 'Question added to Bank!');
        setTimeout(() => setSuccessNotice(null), 3000);
        fetchCacheData();
      } else {
        throw new Error(data.message || 'Failed to save question.');
      }
    } catch (err: any) {
      console.error('Error saving question:', err);
      setError(err?.message || 'Failed to save question.');
    } finally {
      setIsSavingQuestion(false);
    }
  };

  // Delete question from questionCache.json
  const handleDeleteQuestion = async (item: CachedQuestion) => {
    const itemKey = item.id || item.question;
    setDeletingKey(itemKey);
    setError(null);
    try {
      const res = await fetch('/api/admin/bank', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...getAdminHeaders()
        },
        body: JSON.stringify({
          id: item.id,
          question: item.question,
          timestamp: item.timestamp
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setQuestions((prev) =>
          prev.filter((q) => {
            if (item.id && q.id) return q.id !== item.id;
            if (item.timestamp && q.timestamp) return String(q.timestamp) !== String(item.timestamp);
            return q.question.trim().toLowerCase() !== item.question.trim().toLowerCase();
          })
        );
        setConfirmDeleteTarget(null);
        setSuccessNotice('Question removed from Question Bank.');
        setTimeout(() => setSuccessNotice(null), 3000);
      } else {
        throw new Error(data.message || 'Failed to delete question from cache.');
      }
    } catch (err: any) {
      console.error('Failed to delete question:', err);
      setError(err?.message || 'Could not delete question.');
    } finally {
      setDeletingKey(null);
    }
  };

  // Delete feedback item from feedback.json
  const handleDeleteFeedback = async (item: FeedbackItem) => {
    const itemKey = item.id || String(item.timestamp);
    setDeletingFeedbackKey(itemKey);
    setError(null);
    try {
      const res = await fetch('/api/feedback', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...getAdminHeaders()
        },
        body: JSON.stringify({
          id: item.id,
          timestamp: item.timestamp
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFeedbackList((prev) =>
          prev.filter((f) => (item.id ? f.id !== item.id : String(f.timestamp) !== String(item.timestamp)))
        );
        setSuccessNotice('Feedback dismissed/removed from feedback.json.');
        setTimeout(() => setSuccessNotice(null), 3000);
      } else {
        throw new Error(data.message || 'Failed to remove feedback.');
      }
    } catch (err: any) {
      console.error('Failed to delete feedback:', err);
      setError(err?.message || 'Could not remove feedback.');
    } finally {
      setDeletingFeedbackKey(null);
    }
  };

  // Export Bank as CSV
  const handleExportCsv = () => {
    try {
      const csvRows = ['question,answer,grade,subject,language'];
      const escapeCsv = (val?: string) => `"${(val || '').replace(/"/g, '""')}"`;
      for (const q of questions) {
        csvRows.push([
          escapeCsv(q.question),
          escapeCsv(q.answer),
          escapeCsv(q.grade || 'Grade 10'),
          escapeCsv(q.subject || 'Mathematics'),
          escapeCsv(q.language || 'en')
        ].join(','));
      }
      const csvBlob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(csvBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nexovian_question_bank_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('CSV export failed:', err);
      window.location.href = `/api/admin/bank/export?format=csv&admin_token=${encodeURIComponent(localStorage.getItem('NEXOVIAN_ADMIN') || 'MPUMALANGA2026')}`;
    }
  };

  // Export as JSON file
  const handleExportJson = () => {
    try {
      const exportData = activeAdminTab === 'questions' ? questions : feedbackList;
      const jsonString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activeAdminTab === 'questions' ? 'nexovian_question_bank' : 'learnerFeedback'}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('JSON Export failed:', err);
      if (activeAdminTab === 'questions') {
        window.location.href = `/api/admin/bank/export?admin_token=${encodeURIComponent(localStorage.getItem('NEXOVIAN_ADMIN') || 'MPUMALANGA2026')}`;
      }
    }
  };

  // Handle CSV File Selection and Import
  const handleCsvFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImportingCsv(true);
    setError(null);
    try {
      const text = await file.text();
      const parsedItems = parseCsv(text);
      if (parsedItems.length === 0) {
        throw new Error('No valid questions found in CSV file. Ensure headers contain "question" and "answer".');
      }

      const res = await fetch('/api/admin/bank/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAdminHeaders()
        },
        body: JSON.stringify({ questions: parsedItems })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessNotice(data.message || `Successfully imported ${parsedItems.length} questions.`);
        setTimeout(() => setSuccessNotice(null), 4000);
        fetchCacheData();
      } else {
        throw new Error(data.message || 'Import failed.');
      }
    } catch (err: any) {
      console.error('Error importing CSV:', err);
      setError(err?.message || 'Failed to import CSV file.');
    } finally {
      setIsImportingCsv(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      // Grade filter
      if (selectedGrade !== 'all') {
        const qg = (q.grade || '').toLowerCase();
        const sg = selectedGrade.toLowerCase();
        if (!qg.includes(sg)) return false;
      }

      // Subject filter
      if (selectedSubject !== 'all') {
        const qs = (q.subject || '').toLowerCase();
        const ss = selectedSubject.toLowerCase();
        if (!qs.includes(ss)) return false;
      }

      // Language filter
      if (selectedLanguage !== 'all') {
        const ql = (q.language || 'en').toLowerCase();
        if (ql !== selectedLanguage.toLowerCase()) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const inQuestion = q.question.toLowerCase().includes(query);
        const inAnswer = q.answer.toLowerCase().includes(query);
        const inSubject = (q.subject || '').toLowerCase().includes(query);
        if (!inQuestion && !inAnswer && !inSubject) return false;
      }

      return true;
    });
  }, [questions, selectedGrade, selectedSubject, selectedLanguage, searchQuery]);

  // Filter feedback
  const filteredFeedback = useMemo(() => {
    if (!feedbackSearch.trim()) return feedbackList;
    const query = feedbackSearch.trim().toLowerCase();
    return feedbackList.filter((f) => {
      const qMatch = f.question?.toLowerCase().includes(query);
      const aMatch = f.wrongAnswer?.toLowerCase().includes(query);
      const fMatch = f.userFeedback?.toLowerCase().includes(query);
      return qMatch || aMatch || fMatch;
    });
  }, [feedbackList, feedbackSearch]);

  const toggleExpand = (idx: number) => {
    setExpandedIndices((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const toggleExpandFeedback = (idx: number) => {
    setExpandedFeedbackIndices((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleCopyAnswer = (idx: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const resetAllFilters = () => {
    setSelectedGrade('all');
    setSelectedSubject('all');
    setSelectedLanguage('all');
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedGrade !== 'all' ||
    selectedSubject !== 'all' ||
    selectedLanguage !== 'all' ||
    searchQuery.trim() !== '';

  // Unauthorized screen guard
  if (!isAuthorized) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-4 border border-amber-300 dark:border-amber-700">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
          🔒 Admin Access Only
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          The Question Bank is reserved for NEXOVIAN curriculum administrators and company owners.
        </p>
        <button
          onClick={() => {
            setCurrentTab('home');
            if (typeof window !== 'undefined') {
              window.history.replaceState({}, '', '/');
            }
          }}
          className="mt-6 w-full py-3 bg-[#facc15] hover:bg-yellow-400 text-[#0F172A] font-bold rounded-xl text-sm transition-all shadow-md active:scale-95"
        >
          Return to Learning Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Hidden file input for CSV import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={handleCsvFileChange}
      />

      {/* Top Header Navigation */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setCurrentTab('home');
              if (typeof window !== 'undefined') {
                window.history.replaceState({}, '', '/');
              }
            }}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-xs"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-amber-500" />
                <span>Admin Management</span>
              </span>
              <span>·</span>
              <span className="font-mono text-slate-500">Grade 4 to University & TVET</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-bold normal-case text-xs border border-emerald-300/80 dark:border-emerald-800">
                <Sparkles className="w-3 h-3 text-emerald-500" />
                <span>Saved: {totalAiCallsSaved} AI calls</span>
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold normal-case text-xs border border-blue-200 dark:border-blue-800">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span>Supabase: {supabaseStats?.questionCount ?? 0}</span>
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              🔒 Question Bank (Owner Only)
            </h1>
          </div>
        </div>

        {/* Action Controls: Add, Import CSV, Export Bank */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Add Question Button */}
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#facc15] hover:bg-yellow-400 text-[#0F172A] font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            title="Add a new verified question for Grade 4-12, TVET, or University"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Question</span>
          </button>

          {/* Import CSV Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isImportingCsv}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold transition-all disabled:opacity-50"
            title="Import questions from a CSV file (columns: question, answer, grade, subject, language)"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
            <span>{isImportingCsv ? 'Importing CSV...' : 'Import CSV'}</span>
          </button>

          {/* Export Bank Button */}
          <button
            onClick={handleExportCsv}
            disabled={questions.length === 0}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold transition-all disabled:opacity-50"
            title="Export Question Bank as CSV spreadsheet"
          >
            <Download className="w-4 h-4 text-amber-500" />
            <span>Export Bank</span>
          </button>

          {/* Supabase Sync Button */}
          <button
            onClick={handleSyncToSupabase}
            disabled={isSyncingSupabase || questions.length === 0}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900 text-xs sm:text-sm font-semibold transition-all disabled:opacity-50"
            title="Sync all questions from local Question Bank to Supabase question_bank table"
          >
            <UploadCloud className={`w-4 h-4 ${isSyncingSupabase ? 'animate-bounce text-emerald-500' : ''}`} />
            <span>{isSyncingSupabase ? 'Syncing...' : 'Sync Supabase'}</span>
          </button>

          {/* Refresh Button */}
          <button
            onClick={() => {
              fetchCacheData();
              fetchFeedbackData();
              fetchSupabaseStats();
            }}
            disabled={isLoading || isFeedbackLoading}
            className="flex items-center justify-center p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all disabled:opacity-50"
            title="Refresh bank"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading || isFeedbackLoading ? 'animate-spin text-amber-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Notice / Feedback Toast */}
      {successNotice && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 shadow-sm animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{successNotice}</span>
          </div>
          <button onClick={() => setSuccessNotice(null)} className="p-1 hover:text-emerald-950 dark:hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="p-1 hover:text-rose-950 dark:hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* SECTION TABS: "Question Bank" vs "Spaced Repetition Editor" vs "Learner Feedback" */}
      <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-200 dark:border-slate-800 pb-1">
        <button
          onClick={() => setActiveAdminTab('questions')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
            activeAdminTab === 'questions'
              ? 'bg-[#facc15] text-[#0F172A] border-[#facc15] shadow-xs'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Question Bank (Owner Only)</span>
          <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/10 dark:bg-white/10 font-bold">
            {questions.length}
          </span>
        </button>

        <button
          onClick={() => setActiveAdminTab('flashcards')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
            activeAdminTab === 'flashcards'
              ? 'bg-[#facc15] text-[#0F172A] border-[#facc15] shadow-xs'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Spaced Repetition Editor</span>
          <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/10 dark:bg-white/10 font-bold">
            {flashcards.length}
          </span>
        </button>

        <button
          onClick={() => setActiveAdminTab('feedback')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
            activeAdminTab === 'feedback'
              ? 'bg-[#facc15] text-[#0F172A] border-[#facc15] shadow-xs'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Learner Feedback (2026)</span>
          <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/10 dark:bg-white/10 font-bold">
            {feedbackList.length}
          </span>
        </button>
      </div>

      {/* TAB 1: QUESTION BANK MANAGEMENT */}
      {activeAdminTab === 'questions' && (
        <div>
          {/* Search, Grade & Subject Filters Bar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 mb-6 shadow-xs space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* Search input */}
              <div className="md:col-span-2 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Grade 4-12, TVET, University questions or concepts..."
                  className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              {/* Grade Selector */}
              <div>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 capitalize"
                >
                  <option value="all">All Levels (Grade 4–Univ)</option>
                  <optgroup label="Primary (Grade 4-7)">
                    <option value="Grade 4">Grade 4</option>
                    <option value="Grade 5">Grade 5</option>
                    <option value="Grade 6">Grade 6</option>
                    <option value="Grade 7">Grade 7</option>
                  </optgroup>
                  <optgroup label="Senior (Grade 8-9)">
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 9">Grade 9</option>
                  </optgroup>
                  <optgroup label="FET CAPS (Grade 10-12)">
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </optgroup>
                  <optgroup label="TVET Colleges">
                    <option value="TVET N1-N3">TVET N1–N3</option>
                    <option value="TVET N4-N6">TVET N4–N6</option>
                    <option value="TVET L2-L4">TVET L2–L4 (NCV)</option>
                  </optgroup>
                  <optgroup label="University">
                    <option value="University 1st Year">University 1st Year</option>
                    <option value="University 2nd Year">University 2nd Year</option>
                    <option value="University 3rd Year">University 3rd Year</option>
                    <option value="University 4th Year">University 4th Year</option>
                  </optgroup>
                </select>
              </div>

              {/* Language Selector */}
              <div>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                >
                  <option value="all">All 11 Official Languages</option>
                  {SA_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.name} ({l.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Level Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <span>Showing <strong>{filteredQuestions.length}</strong> of {questions.length} questions</span>
                {hasActiveFilters && (
                  <button
                    onClick={resetAllFilters}
                    className="flex items-center gap-1 text-amber-600 dark:text-amber-400 hover:underline font-semibold ml-2"
                  >
                    <X className="w-3 h-3" />
                    <span>Reset filters</span>
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-400 mr-1">Quick Select:</span>
                {['all', 'Grade 4', 'Grade 7', 'Grade 8', 'Grade 10', 'Grade 12', 'TVET', 'University'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedGrade(lvl)}
                    className={`px-2 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      selectedGrade === lvl
                        ? 'bg-[#facc15] text-[#0F172A] shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {lvl === 'all' ? 'All Levels' : lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Questions List */}
          {isLoading ? (
            <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400">
              <RefreshCw className="w-6 h-6 mx-auto animate-spin mb-3 text-amber-500" />
              <p className="text-xs font-medium">Reading Question Bank...</p>
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <HelpCircle className="w-10 h-10 mx-auto text-slate-400 dark:text-slate-600 mb-3" />
              <h3 className="font-display text-base font-bold text-slate-800 dark:text-slate-200">
                {hasActiveFilters ? 'No questions match the current filters' : 'Question bank is currently empty'}
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Click "Add Question" above or "Import CSV" to populate the official Grade 4 to University curriculum bank.
              </p>
              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  onClick={handleOpenAddModal}
                  className="px-4 py-2 bg-[#facc15] hover:bg-yellow-400 text-[#0F172A] font-bold rounded-xl text-xs"
                >
                  Add First Question
                </button>
                {hasActiveFilters && (
                  <button
                    onClick={resetAllFilters}
                    className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredQuestions.map((item, idx) => {
                const isExpanded = Boolean(expandedIndices[idx]);
                const isDeleting = deletingKey === (item.id || item.question);
                const isConfirmingDelete =
                  confirmDeleteTarget &&
                  (confirmDeleteTarget.id === item.id || confirmDeleteTarget.question === item.question);

                const displaySubject = item.subject || 'Mathematics';

                return (
                  <div
                    key={item.id || idx}
                    className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-sm transition-all"
                  >
                    {/* Header row: Metadata badges, Question, Edit, Delete, Toggle */}
                    <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 select-none">
                      <div
                        onClick={() => toggleExpand(idx)}
                        className="flex-1 min-w-0 cursor-pointer"
                      >
                        {/* Metadata line: Grade, Subject, Language, Timestamp */}
                        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold mb-2">
                          <span className="px-2.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-[11px]">
                            {item.grade || 'Grade 10'}
                          </span>

                          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300">
                            {displaySubject}
                          </span>

                          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase text-[11px] font-mono">
                            {item.language || 'en'}
                          </span>

                          {item.timestamp && (
                            <span className="text-[11px] text-slate-400 font-normal">
                              {formatFeedbackDateSA(item.timestamp)}
                            </span>
                          )}
                        </div>

                        {/* Question text */}
                        <h3 className="font-display text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                          {cleanFormulaString(item.question)}
                        </h3>
                      </div>

                      {/* Actions: Edit, Delete, Expand/Collapse */}
                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-start pt-1">
                        {/* Edit Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEditModal(item);
                          }}
                          className="min-h-[36px] px-2.5 py-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg transition-colors"
                          title="Edit question and solution"
                          aria-label="Edit question"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-amber-500" />
                          <span className="hidden sm:inline">Edit</span>
                        </button>

                        {/* Delete button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfirmDeleteTarget(item);
                          }}
                          disabled={isDeleting}
                          className="min-h-[36px] px-2.5 py-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 border border-transparent hover:border-rose-200 dark:hover:border-rose-800 rounded-lg transition-colors"
                          title="Delete question from Question Bank"
                          aria-label="Delete question"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>

                        {/* Expand/Collapse Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(idx);
                          }}
                          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          aria-label={isExpanded ? 'Collapse answer' : 'Expand answer'}
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Inline Confirmation for Delete */}
                    {isConfirmingDelete && (
                      <div className="px-4 py-3 bg-rose-50 dark:bg-rose-950/60 border-t border-b border-rose-200 dark:border-rose-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-rose-900 dark:text-rose-200">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                          <span>Are you sure you want to delete this question from the bank?</span>
                        </div>
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <button
                            onClick={() => setConfirmDeleteTarget(null)}
                            className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleDeleteQuestion(item)}
                            disabled={isDeleting}
                            className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold flex items-center gap-1 shadow-xs disabled:opacity-50"
                          >
                            {isDeleting ? (
                              <>
                                <RefreshCw className="w-3 h-3 animate-spin" />
                                <span>Deleting...</span>
                              </>
                            ) : (
                              <>
                                <Trash2 className="w-3 h-3" />
                                <span>Yes, Delete</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Expanded Answer Content */}
                    {isExpanded && (
                      <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Verified Step-by-Step Solution:
                          </span>
                          <button
                            onClick={() => handleCopyAnswer(idx, cleanFormulaString(item.answer))}
                            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>{copiedIndex === idx ? 'Copied!' : 'Copy'}</span>
                          </button>
                        </div>

                        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                          <CleanFormulaRenderer content={item.answer} language={item.language || 'en'} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SPACED REPETITION EDITOR */}
      {activeAdminTab === 'flashcards' && (
        <div className="space-y-6">
          {/* Top Controls: Filter tabs, Shuffle Deck, Search & Add Flashcard */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <span>⚡ Spaced Repetition Editor (Owner Only)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Configure daily heuristics, CAPS concepts, XP milestones, and deck card sequence.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleShuffleFlashcards}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-2xs"
                  title="Shuffle deck cards"
                >
                  <Shuffle className="w-4 h-4 text-amber-500" />
                  <span>Shuffle Deck</span>
                </button>

                <button
                  onClick={handleOpenAddFlashcard}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#facc15] hover:bg-yellow-400 text-[#0F172A] font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                  title="Add a new flashcard to spaced repetition deck"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Add Flashcard</span>
                </button>
              </div>
            </div>

            {/* Filter Tabs & Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              {/* Difficulty Tabs: All, Foundation, Core, Expert */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl w-fit">
                {(['All', 'Foundation', 'Core', 'Expert'] as const).map((diff) => {
                  const count = diff === 'All'
                    ? flashcards.length
                    : flashcards.filter((c) => c.difficulty === diff).length;

                  return (
                    <button
                      key={diff}
                      onClick={() => setFlashcardFilter(diff)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                        flashcardFilter === diff
                          ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <span>{diff}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search input */}
              <div className="relative sm:w-72">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={flashcardSearch}
                  onChange={(e) => setFlashcardSearch(e.target.value)}
                  placeholder="Search questions or heuristics..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Flashcards Cards Grid */}
          {(() => {
            const filtered = flashcards.filter((c) => {
              const matchesDiff = flashcardFilter === 'All' || c.difficulty === flashcardFilter;
              const matchesQuery = !flashcardSearch.trim() ||
                c.question.toLowerCase().includes(flashcardSearch.toLowerCase()) ||
                c.answer.toLowerCase().includes(flashcardSearch.toLowerCase()) ||
                c.topic.toLowerCase().includes(flashcardSearch.toLowerCase());
              return matchesDiff && matchesQuery;
            });

            if (filtered.length === 0) {
              return (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-10 text-center text-slate-500">
                  <Zap className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-50" />
                  <p className="font-semibold text-sm">No flashcards found matching the selected filter.</p>
                </div>
              );
            }

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((card, idx) => (
                  <div
                    key={card.id || idx}
                    className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-amber-400/60 dark:hover:border-amber-500/60 transition-all space-y-4"
                  >
                    <div>
                      {/* Top Bar: Topic, Difficulty, XP Badge, Action Buttons */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            {card.topic}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              card.difficulty === 'Expert'
                                ? 'bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800'
                                : card.difficulty === 'Foundation'
                                ? 'bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
                                : 'bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                            }`}
                          >
                            {card.difficulty}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                            +{card.xp || 10} XP
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenEditFlashcard(card)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors"
                            title="Edit flashcard"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteFlashcard(card.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
                            title="Delete flashcard"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Question */}
                      <div className="mb-3">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                          Prompt Question
                        </span>
                        <h4 className="font-display text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                          {cleanFormulaString(card.question)}
                        </h4>
                      </div>

                      {/* Answer with CleanFormulaRenderer */}
                      <div>
                        <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                          Heuristic Solution
                        </span>
                        <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                          <CleanFormulaRenderer content={card.answer} />
                        </div>
                      </div>

                      {/* Code Snippet */}
                      {card.codeSnippet && (
                        <div className="mt-3 p-2.5 rounded-xl bg-slate-950 text-emerald-400 font-mono text-[11px] border border-slate-800 overflow-x-auto">
                          <code>{card.codeSnippet}</code>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                      <span>ID: {card.id}</span>
                      <span>Card XP: {card.xp || 10} points</span>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB 3: LEARNER FEEDBACK */}
      {activeAdminTab === 'feedback' && (
        <div>
          {/* Feedback search bar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 mb-6 shadow-xs">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={feedbackSearch}
                onChange={(e) => setFeedbackSearch(e.target.value)}
                placeholder="Search feedback notes, questions or explanations..."
                className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>
          </div>

          {/* Feedback list */}
          {isFeedbackLoading ? (
            <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400">
              <RefreshCw className="w-6 h-6 mx-auto animate-spin mb-3 text-amber-500" />
              <p className="text-xs font-medium">Loading feedback...</p>
            </div>
          ) : filteredFeedback.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500 mb-3" />
              <h3 className="font-display text-base font-bold text-slate-800 dark:text-slate-200">
                No active learner feedback flags
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                When students flag incorrect or unhelpful answers, they will be shown here for review.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFeedback.map((item, idx) => {
                const isExpanded = Boolean(expandedFeedbackIndices[idx]);
                const isDeleting = deletingFeedbackKey === (item.id || String(item.timestamp));

                return (
                  <div
                    key={item.id || idx}
                    className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{formatFeedbackDateSA(item.timestamp)}</span>
                        </div>
                        <h4 className="font-display text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          {cleanFormulaString(item.question)}
                        </h4>

                        <div className="mt-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-200 mb-1">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <span>Learner Feedback (What was wrong):</span>
                          </div>
                          <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-100 font-medium leading-relaxed whitespace-pre-wrap">
                            "{item.userFeedback}"
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteFeedback(item)}
                        disabled={isDeleting}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Dismiss</span>
                      </button>
                    </div>

                    {item.wrongAnswer && (
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                        <button
                          onClick={() => toggleExpandFeedback(idx)}
                          className="flex items-center justify-between w-full text-left text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white select-none"
                        >
                          <span>{isExpanded ? 'Hide Flagged Answer' : 'View Flagged Answer Provided'}</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        {isExpanded && (
                          <div className="mt-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-xs max-h-60 overflow-y-auto">
                            <CleanFormulaRenderer content={item.wrongAnswer} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ADD / EDIT QUESTION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#facc15] text-[#0F172A] flex items-center justify-center font-bold">
                  {editingQuestionId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {editingQuestionId ? 'Edit Question & Solution' : 'Add Question to Bank'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Grade 4 to University & TVET · Instant Vernacular Caching
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSaveQuestion} className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Level / Grade */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Level / Grade
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {SA_GRADES.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    list="common-subjects-list"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Mathematics"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <datalist id="common-subjects-list">
                    {COMMON_SUBJECTS.map((s) => (
                      <option key={s} value={s} />
                    ))}
                  </datalist>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Language
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {SA_LANGUAGES.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.name} ({l.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Question Text */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Question Text
                </label>
                <textarea
                  rows={3}
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="e.g. State Newton's Second Law of Motion and calculate the acceleration of a 5kg mass with a net force of 20N."
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
                  required
                />
              </div>

              {/* Step-by-Step Answer Text */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Step-by-Step Solution & Formula
                </label>
                <textarea
                  rows={6}
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="QUESTION: ...&#10;SUBJECT: ...&#10;STEP 1: ...&#10;STEP 2: ...&#10;FINAL ANSWER: ...&#10;SIMPLE FORMULA TO REMEMBER: ..."
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans leading-relaxed"
                  required
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingQuestion}
                  className="px-5 py-2.5 rounded-xl bg-[#facc15] hover:bg-yellow-400 text-[#0F172A] text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSavingQuestion ? 'Saving Question...' : editingQuestionId ? 'Update Question' : 'Save to Question Bank'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ADD / EDIT FLASHCARD MODAL */}
      {isFlashcardModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#facc15] text-[#0F172A] flex items-center justify-center font-bold">
                  {editingFlashcardId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {editingFlashcardId ? 'Edit Spaced Repetition Flashcard' : 'Add New Flashcard'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Spaced Repetition Lab · CAPS Heuristics & XP Rewards
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsFlashcardModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSaveFlashcard} className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Topic */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Topic / Domain
                  </label>
                  <input
                    type="text"
                    value={flashcardFormData.topic}
                    onChange={(e) => setFlashcardFormData({ ...flashcardFormData, topic: e.target.value })}
                    placeholder="e.g. Physical Sciences"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Difficulty Level
                  </label>
                  <select
                    value={flashcardFormData.difficulty}
                    onChange={(e) => setFlashcardFormData({ ...flashcardFormData, difficulty: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Foundation">Foundation</option>
                    <option value="Core">Core</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                {/* XP Reward */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    XP Reward Points
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={flashcardFormData.xp}
                    onChange={(e) => setFlashcardFormData({ ...flashcardFormData, xp: parseInt(e.target.value, 10) || 10 })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              {/* Question Text */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Prompt Question
                </label>
                <textarea
                  rows={3}
                  value={flashcardFormData.question}
                  onChange={(e) => setFlashcardFormData({ ...flashcardFormData, question: e.target.value })}
                  placeholder="e.g. State Newton's Second Law formula and define each variable."
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
                  required
                />
              </div>

              {/* Heuristic Answer Text */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Heuristic Solution & Formulas
                </label>
                <textarea
                  rows={4}
                  value={flashcardFormData.answer}
                  onChange={(e) => setFlashcardFormData({ ...flashcardFormData, answer: e.target.value })}
                  placeholder="Solution steps, explanation, and formula (F_net = m * a)"
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans leading-relaxed"
                  required
                />
                {flashcardFormData.answer.trim() && (
                  <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Clean Formula Preview:</span>
                    <CleanFormulaRenderer content={flashcardFormData.answer} />
                  </div>
                )}
              </div>

              {/* Code Snippet (Optional) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Code Snippet (Optional)
                </label>
                <textarea
                  rows={2}
                  value={flashcardFormData.codeSnippet}
                  onChange={(e) => setFlashcardFormData({ ...flashcardFormData, codeSnippet: e.target.value })}
                  placeholder="e.g. F = m * a; // in Newtons"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-emerald-400 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsFlashcardModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingFlashcard}
                  className="px-5 py-2.5 rounded-xl bg-[#facc15] hover:bg-yellow-400 text-[#0F172A] text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSavingFlashcard ? 'Saving Flashcard...' : editingFlashcardId ? 'Update Flashcard' : 'Save to Deck'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
