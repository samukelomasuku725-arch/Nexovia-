/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIA ACADEMY - PHASE 7: ASSESSMENT BUILDER MODAL
 * 
 * Teacher and Administrator Assessment Authoring Studio:
 * - Create Practice, Quiz, Test, Assignment, and Exam assessments
 * - Add, remove, and reorder questions from Question Bank or custom creation
 * - Assign marks, configure duration, passing threshold, and attempt limits
 * - Strict structural validation before publishing (prevents malformed assessments)
 */

import React, { useState } from 'react';
import {
  X,
  Sliders,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import {
  AssessmentModel,
  AssessmentType,
  QuestionModel,
  QuestionType
} from '../../types/assessment';
import { assessmentEngine } from '../../services/assessment/assessmentEngine';
import { GRADE_LEVELS } from '../../config/curriculumConfig';
import { CAPS_SUBJECTS_CATALOG } from '../../data/capsCurriculumDemoData';
import { AdaptiveDifficulty } from '../../types/adaptive';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAssessmentSaved: (assessment: AssessmentModel) => void;
}

export const AssessmentBuilderModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onAssessmentSaved
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assessmentType, setAssessmentType] = useState<AssessmentType>('QUIZ');
  const [grade, setGrade] = useState('grade-10');
  const [subject, setSubject] = useState('Mathematics');
  const [term, setTerm] = useState<1 | 2 | 3 | 4>(1);
  const [topic, setTopic] = useState('Algebra & Factorization');
  const [instructions, setInstructions] = useState('Answer all questions carefully.');
  const [durationMinutes, setDurationMinutes] = useState<number | undefined>(20);
  const [passingPercentage, setPassingPercentage] = useState<number>(50);
  const [attemptLimit, setAttemptLimit] = useState<number>(3);
  const [difficulty, setDifficulty] = useState<AdaptiveDifficulty>('medium');

  // Selected Questions
  const [selectedQuestions, setSelectedQuestions] = useState<QuestionModel[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Question Bank Picker Filter State
  const [pickerFilterType, setPickerFilterType] = useState<string>('all');
  const [pickerSearch, setPickerSearch] = useState<string>('');

  if (!isOpen) return null;

  // Filter available questions from question bank
  const bankQuestions = assessmentEngine.filterQuestionBank({
    questionType: pickerFilterType === 'all' ? undefined : (pickerFilterType as QuestionType),
    searchKeyword: pickerSearch
  });

  const totalMarks = selectedQuestions.reduce((sum, q) => sum + (q.marks || 1), 0);

  // Toggle question in assessment
  const toggleQuestionSelection = (q: QuestionModel) => {
    if (selectedQuestions.some((item) => item.id === q.id)) {
      setSelectedQuestions(selectedQuestions.filter((item) => item.id !== q.id));
    } else {
      setSelectedQuestions([...selectedQuestions, q]);
    }
  };

  // Reorder questions
  const moveQuestion = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= selectedQuestions.length) return;
    const next = [...selectedQuestions];
    const [moved] = next.splice(fromIdx, 1);
    next.splice(toIdx, 0, moved);
    setSelectedQuestions(next);
  };

  // Update question marks
  const updateQuestionMarks = (qId: string, marks: number) => {
    setSelectedQuestions(
      selectedQuestions.map((q) => (q.id === qId ? { ...q, marks: Math.max(1, marks) } : q))
    );
  };

  // Handle Save & Publish
  const handlePublish = () => {
    const candidate: AssessmentModel = {
      id: `asmt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title: title.trim(),
      description: description.trim() || `${subject} ${assessmentType.toLowerCase()} assessment for ${grade}.`,
      assessmentType,
      curriculumId: 'caps-sa-2024',
      curriculumVersion: '2024.1',
      grade,
      subject,
      phase: 'fet',
      term,
      topic,
      instructions,
      durationMinutes: assessmentType === 'PRACTICE' ? undefined : durationMinutes,
      totalMarks,
      passingPercentage,
      difficulty,
      attemptLimit: assessmentType === 'PRACTICE' ? 0 : attemptLimit,
      questions: selectedQuestions,
      status: 'PUBLISHED',
      sourceType: 'TEACHER_CREATED',
      createdBy: 'Educator Authoring Studio',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const validation = assessmentEngine.validateAssessment(candidate);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    const saveResult = assessmentEngine.saveAssessment(candidate);
    if (saveResult.success) {
      onAssessmentSaved(candidate);
      onClose();
    } else {
      setValidationErrors(saveResult.errors || ['Could not publish assessment.']);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                  Assessment Authoring Studio
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                  Teacher Mode
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Step {step} of 3: {step === 1 ? 'Details & Curriculum' : step === 2 ? 'Select Questions' : 'Review & Publish'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-5 py-2.5 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            {[1, 2, 3].map((s) => (
              <button
                key={s}
                onClick={() => setStep(s as any)}
                className={`flex items-center gap-1.5 font-semibold transition-colors ${
                  step === s
                    ? 'text-amber-600 dark:text-amber-400 font-bold'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-mono ${
                    step === s ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 dark:bg-slate-800'
                  }`}
                >
                  {s}
                </span>
                <span>{s === 1 ? 'Metadata' : s === 2 ? 'Questions' : 'Publish'}</span>
              </button>
            ))}
          </div>

          <span className="text-slate-400">
            {selectedQuestions.length} Questions Selected · {totalMarks} Marks
          </span>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* Validation Errors Alert */}
          {validationErrors.length > 0 && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-xs text-rose-900 dark:text-rose-300 space-y-1">
              <strong className="block mb-1">Please fix the following validation errors:</strong>
              <ul className="list-disc list-inside space-y-0.5">
                {validationErrors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* STEP 1: ASSESSMENT METADATA */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Assessment Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Grade 10 Mathematics: Term 1 Quadratic Equations Test"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Assessment Type
                  </label>
                  <select
                    value={assessmentType}
                    onChange={(e) => setAssessmentType(e.target.value as AssessmentType)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="PRACTICE">PRACTICE (Self-paced, unlimited attempts)</option>
                    <option value="QUIZ">QUIZ (Formative, 3 attempts)</option>
                    <option value="TEST">TEST (Summative, timed, strict)</option>
                    <option value="ASSIGNMENT">ASSIGNMENT (Written response coursework)</option>
                    <option value="EXAM">EXAM (Formal examination blueprint)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Target Grade
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {GRADE_LEVELS.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physical Sciences">Physical Sciences</option>
                    <option value="Natural Sciences">Natural Sciences</option>
                    <option value="Life Skills">Life Skills</option>
                    <option value="Electrotechnics">Electrotechnics (TVET)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    value={durationMinutes || ''}
                    disabled={assessmentType === 'PRACTICE'}
                    onChange={(e) => setDurationMinutes(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder={assessmentType === 'PRACTICE' ? 'Untimed' : '20'}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-medium disabled:opacity-50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Passing Percentage (%)
                  </label>
                  <input
                    type="number"
                    value={passingPercentage}
                    onChange={(e) => setPassingPercentage(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Attempt Limit
                  </label>
                  <input
                    type="number"
                    value={assessmentType === 'PRACTICE' ? 0 : attemptLimit}
                    disabled={assessmentType === 'PRACTICE'}
                    onChange={(e) => setAttemptLimit(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white font-medium disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Assessment Instructions
                </label>
                <textarea
                  rows={3}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Instructions for students taking this assessment..."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          )}

          {/* STEP 2: SELECT QUESTIONS */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={pickerSearch}
                    onChange={(e) => setPickerSearch(e.target.value)}
                    placeholder="Search question text or topic..."
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                  />
                  <select
                    value={pickerFilterType}
                    onChange={(e) => setPickerFilterType(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="all">All Question Types</option>
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

                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                  {selectedQuestions.length} selected ({totalMarks} Marks)
                </span>
              </div>

              {/* Question Bank Selection List */}
              <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                {bankQuestions.map((q) => {
                  const isSelected = selectedQuestions.some((item) => item.id === q.id);

                  return (
                    <div
                      key={q.id}
                      onClick={() => toggleQuestionSelection(q)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 text-xs ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/20'
                          : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                      }`}
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2 text-slate-400">
                          <span className="font-bold text-slate-700 dark:text-slate-300 uppercase text-[10px]">
                            {q.questionType.replace('_', ' ')}
                          </span>
                          <span>·</span>
                          <span>{q.marks} Marks</span>
                          <span>·</span>
                          <span>{q.topic}</span>
                        </div>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {q.questionText}
                        </p>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-1 ${
                          isSelected
                            ? 'bg-amber-500 border-amber-500 text-slate-950'
                            : 'border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: REORDER & PUBLISH */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1 text-xs">
                <span className="font-bold text-slate-900 dark:text-white block">
                  {title || 'Untitled Assessment'}
                </span>
                <span className="text-slate-500 block">
                  {assessmentType} · {grade} · {subject} · {totalMarks} Total Marks · {selectedQuestions.length} Questions
                </span>
              </div>

              <div className="space-y-2.5">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Reorder and Adjust Question Marks:
                </span>

                {selectedQuestions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <p className="font-medium text-slate-900 dark:text-white truncate">
                        {q.questionText}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center gap-1">
                        <label className="text-[10px] text-slate-400">Marks:</label>
                        <input
                          type="number"
                          min={1}
                          max={50}
                          value={q.marks}
                          onChange={(e) => updateQuestionMarks(q.id, Number(e.target.value))}
                          className="w-12 px-1.5 py-1 text-center font-bold rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                        />
                      </div>

                      <button
                        onClick={() => moveQuestion(idx, idx - 1)}
                        disabled={idx === 0}
                        className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveQuestion(idx, idx + 1)}
                        disabled={idx === selectedQuestions.length - 1}
                        className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setSelectedQuestions(selectedQuestions.filter((item) => item.id !== q.id))}
                        className="p-1 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-5 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between">
          <button
            onClick={() => setStep((prev) => Math.max(1, prev - 1) as any)}
            disabled={step === 1}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 disabled:opacity-30"
          >
            Previous
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep((prev) => Math.min(3, prev + 1) as any)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handlePublish}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-xs transition-transform active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Publish Assessment</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
