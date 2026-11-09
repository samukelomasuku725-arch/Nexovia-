/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN - PAST PAPERS & MEMORANDUMS TAB COMPONENT
 * 
 * Features:
 * 1. Filter by Year (2018–2024), Season (Nov, June, March/Trial), Paper (P1, P2)
 * 2. Question Paper viewer with detailed question-by-question mark allocations
 * 3. Step-by-step Memorandum reader with model solutions and common student mistakes
 * 4. 1-Click "Ask AI to Explain" in all 11 official South African languages
 */

import React, { useState, useMemo } from 'react';
import {
  FileText,
  CheckCircle2,
  Sparkles,
  Calendar,
  Clock,
  Award,
  Filter,
  Eye,
  X,
  MessageSquare,
  HelpCircle,
  AlertTriangle,
  Download,
  BookOpen
} from 'lucide-react';
import { PAST_PAPERS_DATABASE, PastPaperItem, ExamSeason, PaperType } from '../../data/pastPapersData';
import { useLearning } from '../../context/LearningContext';
import { useTranslation } from '../../i18n/I18nContext';
import { MemoLanguageExplainer } from '../common/MemoLanguageExplainer';

interface PastPapersTabProps {
  currentSubjectName: string;
  currentGradeName: string;
  onLaunchAiTutor?: (paperPrompt: string) => void;
}

export const PastPapersTab: React.FC<PastPapersTabProps> = ({
  currentSubjectName,
  currentGradeName,
  onLaunchAiTutor
}) => {
  const { setCurrentTab, updateLearningContext, activeLearningLanguage } = useLearning();
  const { t } = useTranslation();

  // Filters
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedSeason, setSelectedSeason] = useState<ExamSeason | 'all'>('all');
  const [selectedPaper, setSelectedPaper] = useState<PaperType | 'all'>('all');

  // Modal inspection states
  const [viewingPaperModal, setViewingPaperModal] = useState<PastPaperItem | null>(null);
  const [viewingMemoModal, setViewingMemoModal] = useState<PastPaperItem | null>(null);

  // Available Years
  const availableYears = [2024, 2023, 2022, 2021, 2020, 2019, 2018];

  // Filtered papers matching subject or grade, or fallback to the rich database
  const filteredPapers = useMemo(() => {
    let papers = PAST_PAPERS_DATABASE;

    // Filter by subject if matching, otherwise show relevant exam papers
    const subjLower = currentSubjectName.toLowerCase();
    const matchedBySubject = papers.filter((p) => {
      const pSubj = p.subject.toLowerCase();
      return pSubj.includes(subjLower) || subjLower.includes(pSubj) ||
        (subjLower.includes('math') && pSubj.includes('math')) ||
        (subjLower.includes('science') && pSubj.includes('science')) ||
        (subjLower.includes('physics') && pSubj.includes('phys'));
    });

    if (matchedBySubject.length > 0) {
      papers = matchedBySubject;
    }

    // Secondary grade filter
    const gradeLower = currentGradeName.toLowerCase();
    const matchedByGrade = papers.filter((p) => {
      const pGrade = p.gradeOrLevel.toLowerCase();
      return pGrade.includes(gradeLower) || gradeLower.includes(pGrade);
    });

    if (matchedByGrade.length > 0) {
      papers = matchedByGrade;
    }

    // Apply Year Filter
    if (selectedYear !== 'all') {
      papers = papers.filter((p) => p.year === selectedYear);
    }

    // Apply Season Filter
    if (selectedSeason !== 'all') {
      papers = papers.filter((p) => p.season === selectedSeason);
    }

    // Apply Paper Filter
    if (selectedPaper !== 'all') {
      papers = papers.filter((p) => p.paper === selectedPaper);
    }

    return papers;
  }, [currentSubjectName, currentGradeName, selectedYear, selectedSeason, selectedPaper]);

  // Handle Ask AI to Explain
  const handleAskAiToExplain = (paper: PastPaperItem) => {
    if (onLaunchAiTutor) {
      onLaunchAiTutor(paper.aiExplanationPrompt);
    } else {
      updateLearningContext({
        subject: paper.subject,
        gradeOrProgramme: paper.gradeOrLevel,
        topic: `${paper.year} ${paper.paper} Exam Revision`
      });
      setCurrentTab('tutor');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Filter Controls */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white border border-slate-700 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-400 text-slate-950">
                Official CAPS & TVET Repository
              </span>
              <span className="text-xs text-slate-300 font-mono">
                2018–2024 Exam Archive
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display">
              Past Examination Papers & Memos
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Target your study with genuine National Senior Certificate (NSC) & TVET past papers. Review detailed step-by-step marking memorandums and get step-by-step AI Socratic explanations in your mother tongue.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-3 py-1.5 rounded-xl">
              {filteredPapers.length} Papers Available
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-5 pt-4 border-t border-slate-700/80 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>

          {/* Year Filter */}
          <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setSelectedYear('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                selectedYear === 'all'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              All Years
            </button>
            {availableYears.map((yr) => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-2 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  selectedYear === yr
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>

          {/* Paper Type Filter */}
          <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setSelectedPaper('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                selectedPaper === 'all'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              All Papers
            </button>
            {(['Paper 1', 'Paper 2'] as PaperType[]).map((pType) => (
              <button
                key={pType}
                onClick={() => setSelectedPaper(pType)}
                className={`px-2 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  selectedPaper === pType
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {pType}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Past Papers Cards Grid */}
      {filteredPapers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPapers.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-amber-400/60 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {item.gradeOrLevel}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/60">
                      {item.season}
                    </span>
                  </div>
                  <span className="text-xs font-bold font-mono text-slate-500">
                    {item.totalMarks} Marks · {item.durationHours}h
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {item.year} {item.season.split(' ')[0]} – {item.paper}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {item.description}
                </p>

                {/* Question Paper Preview Pills */}
                <div className="mt-3.5 space-y-1">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                    Core Topics Covered:
                  </span>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5 whitespace-pre-wrap">
                    {item.questionPaperSummary.map((sum, sIdx) => (
                      <div key={sIdx}>
                        • {sum}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Question Paper, Memo, Ask AI */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {/* Question Paper Button */}
                  <button
                    onClick={() => setViewingPaperModal(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-500" />
                    <span>📄 Question Paper</span>
                  </button>

                  {/* Memo Button */}
                  <button
                    onClick={() => setViewingMemoModal(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>✅ Memo</span>
                  </button>
                </div>

                {/* Ask AI to Explain Button */}
                <button
                  onClick={() => handleAskAiToExplain(item)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-xs transition-transform active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>🤖 Ask AI to Explain</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">
            No papers match your filter criteria
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try selecting &ldquo;All Years&rdquo; or &ldquo;All Papers&rdquo; to explore the complete South African examination archive.
          </p>
          <button
            onClick={() => {
              setSelectedYear('all');
              setSelectedSeason('all');
              setSelectedPaper('all');
            }}
            className="px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded-xl text-xs"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Question Paper Inspection Modal */}
      {viewingPaperModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-amber-500 block">
                  QUESTION PAPER PREVIEW
                </span>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  {viewingPaperModal.questionPaperTitle}
                </h3>
              </div>
              <button
                onClick={() => setViewingPaperModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Subject: {viewingPaperModal.subject} ({viewingPaperModal.gradeOrLevel})
                </span>
                <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                  Total: {viewingPaperModal.totalMarks} Marks · Time: {viewingPaperModal.durationHours} Hours
                </span>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Examination Sections & Questions:
                </h4>
                <div className="space-y-2">
                  {viewingPaperModal.questionPaperSummary.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-700 dark:text-amber-300 font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {idx + 1}
                      </span>
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-300 space-y-1">
                <strong>💡 Examination Instructions to Candidates:</strong>
                <p>Answer ALL the questions. Clearly show ALL calculations, diagrams, and formulas. You may use an approved non-programmable calculator unless stated otherwise.</p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
              <button
                onClick={() => {
                  const paper = viewingPaperModal;
                  setViewingPaperModal(null);
                  setViewingMemoModal(paper);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Switch to Official Marking Memo</span>
              </button>

              <button
                onClick={() => {
                  const paper = viewingPaperModal;
                  setViewingPaperModal(null);
                  handleAskAiToExplain(paper);
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition-transform active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ask AI to Explain Paper</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Memorandum Inspection Modal */}
      {viewingMemoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-emerald-50/50 dark:bg-emerald-950/20">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 block flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  OFFICIAL MARKING GUIDELINE & MEMORANDUM
                </span>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  {viewingMemoModal.memoTitle}
                </h3>
              </div>
              <button
                onClick={() => setViewingMemoModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              <div className="text-xs text-slate-500 leading-relaxed">
                Review official examiner guidelines, mark allocations, and model solutions. Study common errors flagged by chief markers to avoid losing marks on your exam.
              </div>

              <div className="space-y-4">
                {viewingMemoModal.memoKeySteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                        {step.questionNumber} · {step.topic}
                      </span>
                      <span className="text-xs font-bold text-slate-500 font-mono">
                        [{step.maxMarks} Marks]
                      </span>
                    </div>

                    {/* Model Solution Box */}
                    <div className="p-3 rounded-xl bg-slate-900 text-amber-300 font-mono text-xs border border-amber-500/30">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        Model Solution & Derivation:
                      </span>
                      {step.modelSolution}
                    </div>

                    {/* Marking Guideline */}
                    <div className="text-xs text-slate-700 dark:text-slate-300">
                      <strong>Marking Rule: </strong>
                      {step.guideline}
                    </div>

                    {/* Common Mistakes */}
                    {step.commonMistakes && (
                      <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-800/40 text-xs text-rose-900 dark:text-rose-300 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <div>
                          <strong>Common Marker Warning: </strong>
                          {step.commonMistakes}
                        </div>
                      </div>
                    )}

                    {/* CORE REQUIREMENT 8: [🌐 Explain in My Language ▼] below EVERY memo with 11 languages */}
                    <MemoLanguageExplainer
                      memo={{
                        questionText: `${step.questionNumber} - ${step.topic}`,
                        memoSolution: step.modelSolution,
                        guideline: step.guideline,
                        commonMistakes: step.commonMistakes
                      }}
                      initialOpen={false}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
              <button
                onClick={() => {
                  const paper = viewingMemoModal;
                  setViewingMemoModal(null);
                  setViewingPaperModal(paper);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:underline"
              >
                <FileText className="w-4 h-4" />
                <span>Return to Question Paper</span>
              </button>

              <button
                onClick={() => {
                  const paper = viewingMemoModal;
                  setViewingMemoModal(null);
                  handleAskAiToExplain(paper);
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition-transform active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Explain Memo Step-by-Step with AI</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
