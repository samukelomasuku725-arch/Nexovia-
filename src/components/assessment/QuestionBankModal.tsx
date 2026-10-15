/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIA ACADEMY - PHASE 7: QUESTION BANK MODAL
 * 
 * Central Question Bank management:
 * - Search & filter across 8 Question Types
 * - Filter by Grade, Subject, Topic, Difficulty, and Source Type
 * - Author new reusable curriculum-aligned questions
 */

import React, { useState } from 'react';
import {
  X,
  Search,
  Plus,
  BookOpen,
  Filter,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Tag,
  ShieldCheck,
  Check
} from 'lucide-react';
import { QuestionModel, QuestionType } from '../../types/assessment';
import { assessmentEngine } from '../../services/assessment/assessmentEngine';
import { SOURCE_CLASSIFICATION_INFO } from '../../config/curriculumConfig';
import { AdaptiveDifficulty } from '../../types/adaptive';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onQuestionAdded?: (q: QuestionModel) => void;
}

export const QuestionBankModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onQuestionAdded
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // New Question Form state
  const [newText, setNewText] = useState('');
  const [newType, setNewType] = useState<QuestionType>('multiple_choice');
  const [newMarks, setNewMarks] = useState(2);
  const [newDifficulty, setNewDifficulty] = useState<AdaptiveDifficulty>('medium');
  const [newSubject, setNewSubject] = useState('Mathematics');
  const [newGrade, setNewGrade] = useState('grade-10');
  const [newTopic, setNewTopic] = useState('Algebra & Factorization');
  const [newCorrectAnswer, setNewCorrectAnswer] = useState('');
  const [newExplanation, setNewExplanation] = useState('');
  const [newOptionA, setNewOptionA] = useState('');
  const [newOptionB, setNewOptionB] = useState('');
  const [newOptionC, setNewOptionC] = useState('');
  const [newOptionD, setNewOptionD] = useState('');

  if (!isOpen) return null;

  const filteredQuestions = assessmentEngine.filterQuestionBank({
    questionType: selectedType === 'all' ? undefined : (selectedType as QuestionType),
    difficulty: selectedDifficulty === 'all' ? undefined : (selectedDifficulty as AdaptiveDifficulty),
    searchKeyword: searchTerm
  });

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim() || !newExplanation.trim()) return;

    let options = undefined;
    if (newType === 'multiple_choice') {
      options = [
        { id: 'opt-a', text: newOptionA || 'Option A' },
        { id: 'opt-b', text: newOptionB || 'Option B' },
        { id: 'opt-c', text: newOptionC || 'Option C' },
        { id: 'opt-d', text: newOptionD || 'Option D' }
      ];
    }

    const created: QuestionModel = {
      id: `qb_custom_${Date.now()}`,
      questionText: newText.trim(),
      questionType: newType,
      marks: Number(newMarks) || 2,
      difficulty: newDifficulty,
      curriculumId: 'caps-sa-2024',
      grade: newGrade,
      subject: newSubject,
      phase: 'fet',
      topic: newTopic,
      sourceType: 'TEACHER_CREATED',
      options,
      correctAnswer: newCorrectAnswer || (newType === 'multiple_choice' ? 'opt-a' : 'true'),
      explanation: newExplanation.trim(),
      language: 'en'
    };

    assessmentEngine.addQuestionToBank(created);
    if (onQuestionAdded) onQuestionAdded(created);

    // Reset form
    setNewText('');
    setNewExplanation('');
    setIsCreatingNew(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Reusable Question Bank
              </h3>
              <p className="text-xs text-slate-500">
                Browse and author curriculum questions across all 8 question types
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCreatingNew(!isCreatingNew)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-transform active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isCreatingNew ? 'Browse Bank' : 'Add Question'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Filters (when browsing) */}
        {!isCreatingNew && (
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex flex-wrap items-center gap-2.5 text-xs">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search questions by text or topic..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium"
            >
              <option value="all">All Types</option>
              <option value="multiple_choice">Multiple Choice</option>
              <option value="multiple_select">Multiple Select</option>
              <option value="true_false">True / False</option>
              <option value="short_answer">Short Answer</option>
              <option value="numerical_answer">Numerical Answer</option>
              <option value="matching">Matching</option>
              <option value="ordering">Ordering</option>
              <option value="written_response">Written Response</option>
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          
          {/* CREATE NEW QUESTION FORM */}
          {isCreatingNew ? (
            <form onSubmit={handleCreateQuestion} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  Question Text *
                </label>
                <textarea
                  rows={3}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Enter the complete question prompt..."
                  required
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Question Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as QuestionType)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  >
                    <option value="multiple_choice">Multiple Choice</option>
                    <option value="multiple_select">Multiple Select</option>
                    <option value="true_false">True / False</option>
                    <option value="short_answer">Short Answer</option>
                    <option value="numerical_answer">Numerical Answer</option>
                    <option value="matching">Matching</option>
                    <option value="ordering">Ordering</option>
                    <option value="written_response">Written Response</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Marks</label>
                  <input
                    type="number"
                    min={1}
                    value={newMarks}
                    onChange={(e) => setNewMarks(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Difficulty</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value as AdaptiveDifficulty)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              {/* Multiple Choice Option Fields */}
              {newType === 'multiple_choice' && (
                <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                  <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Multiple Choice Options:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={newOptionA}
                      onChange={(e) => setNewOptionA(e.target.value)}
                      placeholder="Option A (Correct)"
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                    />
                    <input
                      type="text"
                      value={newOptionB}
                      onChange={(e) => setNewOptionB(e.target.value)}
                      placeholder="Option B"
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                    />
                    <input
                      type="text"
                      value={newOptionC}
                      onChange={(e) => setNewOptionC(e.target.value)}
                      placeholder="Option C"
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                    />
                    <input
                      type="text"
                      value={newOptionD}
                      onChange={(e) => setNewOptionD(e.target.value)}
                      placeholder="Option D"
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  Pedagogical Explanation *
                </label>
                <textarea
                  rows={2}
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  placeholder="Explain why the answer is correct and provide step-by-step reasoning..."
                  required
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingNew(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 font-semibold text-slate-600 dark:text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold"
                >
                  Save Question to Bank
                </button>
              </div>
            </form>
          ) : (
            /* QUESTIONS LIST */
            <div className="space-y-3">
              {filteredQuestions.map((q) => {
                const badge = SOURCE_CLASSIFICATION_INFO[q.sourceType || 'DEMO'];

                return (
                  <div
                    key={q.id}
                    className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 text-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-amber-600 dark:text-amber-400 uppercase text-[10px] tracking-wider">
                          {q.questionType.replace('_', ' ')}
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">·</span>
                        <span className="text-slate-500 font-semibold">{q.marks} Marks</span>
                        <span className="text-slate-300 dark:text-slate-700">·</span>
                        <span className="text-slate-500">{q.subject} · {q.grade}</span>
                      </div>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badge.badgeColor}`}>
                        {badge.label}
                      </span>
                    </div>

                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                      {q.questionText}
                    </h4>

                    <p className="text-slate-600 dark:text-slate-400 line-clamp-2">
                      <strong className="text-slate-700 dark:text-slate-300">Explanation: </strong>
                      {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <span>{filteredQuestions.length} Questions in Bank</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
