/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN ORIGINAL NCV MARKETING TEXTBOOK
 * Status: LIVE — Level 2 Complete: Chapters 1–10 LIVE + 100-Mark L2 Mock Exam & Memo
 * Route: /textbooks/ncv-marketing-textbook
 * Read Online Only on nexovian.group.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Eye,
  EyeOff,
  Home,
  Library,
  Megaphone,
  MessageSquare,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import {
  NCV_MARKETING_L2_MOCK_EXAM,
  NCV_MARKETING_LIVE_CHAPTERS,
  NCV_MARKETING_ROADMAP,
  NcvMarketingChapter
} from '../../data/ncvMarketingTextbookData';

const PAGE_TITLE = 'NCV Marketing Textbook — Level 2, Level 3 & Level 4 | Nexovian';
const PAGE_META_DESC =
  'Read Nexovian’s original NCV Marketing textbook free online — Complete Level 2 (10/10 Chapters LIVE + 100-Mark Mock Exam & Memo): Marketing Basics, SWOT, Behaviour, STP, 4Ps/7Ps, Branding, Pricing, Distribution, CRM & Marketing Plan.';

export const NcvMarketingTextbookPage: React.FC = () => {
  const { setCurrentTab } = useLearning();
  const [levelFilter, setLevelFilter] = useState<'ALL' | 2 | 3 | 4>('ALL');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [selectedMcqs, setSelectedMcqs] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [showSectionAMemo, setShowSectionAMemo] = useState(false);
  const [showFullExamMemo, setShowFullExamMemo] = useState(false);
  const chaptersTopRef = useRef<HTMLDivElement | null>(null);
  const mockExamRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const prevTitle = document.title;
    document.title = PAGE_TITLE;

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute('content', PAGE_META_DESC);
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  const navigate = (
    tab:
      | 'landing'
      | 'textbooksLibrary'
      | 'ncvOfficeAdminTextbook'
      | 'electricalTextbook'
      | 'ncvTourismTextbook'
      | 'ncvItTextbook'
      | 'ncvFinanceTextbook'
      | 'ncvEconomicEnvironmentTextbook'
      | 'learn',
    path: string
  ) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentTab(tab);
  };

  const toggleAnswer = (chapterId: string, qNum: number) => {
    const key = `${chapterId}-q${qNum}`;
    setRevealedAnswers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleReadOnline = () => {
    chaptersTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleJumpToMockExam = () => {
    if (levelFilter !== 'ALL' && levelFilter !== 2) {
      setLevelFilter(2);
    }
    setTimeout(() => {
      mockExamRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const mcqAnsweredCount = NCV_MARKETING_L2_MOCK_EXAM.sectionAMcqs.filter(
    (q) => Boolean(selectedMcqs[q.number])
  ).length;
  const mcqCorrectCount = NCV_MARKETING_L2_MOCK_EXAM.sectionAMcqs.filter(
    (q) => selectedMcqs[q.number] === q.correctLetter
  ).length;

  const sectionBQuestions = NCV_MARKETING_L2_MOCK_EXAM.writtenQuestions.filter(
    (q) => q.section === 'B'
  );
  const sectionCQuestions = NCV_MARKETING_L2_MOCK_EXAM.writtenQuestions.filter(
    (q) => q.section === 'C'
  );

  const level2Chapters = NCV_MARKETING_LIVE_CHAPTERS.filter((c) => c.level === 2);
  const level3Chapters = NCV_MARKETING_LIVE_CHAPTERS.filter((c) => c.level === 3);
  const level4Chapters = NCV_MARKETING_LIVE_CHAPTERS.filter((c) => c.level === 4);

  const renderChapterCard = (chapter: NcvMarketingChapter) => (
    <article
      key={chapter.id}
      className="bg-[#0D1E42] border border-[#1E3A6E] hover:border-[#FFD400]/60 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6 transition-colors"
    >
      {/* Chapter Header */}
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full bg-[#FFD400]/15 border border-[#FFD400]/50 text-[#FFD400] font-mono text-xs font-bold uppercase tracking-wider">
            {chapter.chapterLabel}
          </span>
          <span className="px-3 py-1 rounded-full bg-[#061128] border border-emerald-400/50 text-emerald-300 text-xs font-bold">
            LIVE • Read Online Only
          </span>
        </div>
        <h3 className="font-display font-black text-xl sm:text-2xl text-white pt-1">
          {chapter.displayHeading || `Chapter ${chapter.chapterNumber}: ${chapter.title}`}
        </h3>
        <p className="text-xs sm:text-sm text-[#FFD400] font-semibold">{chapter.subtitle}</p>
      </div>

      {/* 1. Clear Explanation */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#071530] border border-[#FFD400]/35 space-y-4">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
          1. Clear Explanation (Level {chapter.level}) — Simple English Study Notes
        </div>

        {chapter.sections.map((sec) => (
          <div key={sec.heading} className="space-y-2">
            <h4 className="font-display font-bold text-base sm:text-lg text-white">
              {sec.heading}
            </h4>
            {sec.paragraphs.map((p, idx) => (
              <p key={`${sec.heading}-p-${idx}`} className="text-sm sm:text-base text-slate-100 leading-relaxed">
                {p}
              </p>
            ))}
            {sec.formulaBlock && (
              <pre className="p-3.5 rounded-xl bg-[#040B1A] border border-[#1E3A6E] text-xs sm:text-sm font-mono text-emerald-300 overflow-x-auto whitespace-pre">
                {sec.formulaBlock}
              </pre>
            )}
            {sec.bullets && (
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-200 list-disc pl-5">
                {sec.bullets.map((b, idx) => (
                  <li key={`${sec.heading}-b-${idx}`}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* 2. Key Terms Box */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
          2. Key Terms Box (English)
        </h4>
        <div
          className={
            chapter.keyTerms.length === 4 || chapter.keyTerms.length === 8
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'
              : 'grid grid-cols-1 md:grid-cols-3 gap-3'
          }
        >
          {chapter.keyTerms.map((kt) => (
            <div
              key={kt.term}
              className="p-3.5 rounded-2xl bg-[#061128] border border-[#1E3A6E] space-y-1.5"
            >
              <div className="text-sm font-black text-[#FFD400]">{kt.term}</div>
              <div className="text-xs text-slate-200 leading-relaxed">{kt.definition}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Worked Example */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#061128] border border-emerald-500/40 space-y-2.5">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
          3. Worked Example — {chapter.workedExample.title}
        </div>
        <p className="text-sm font-bold text-white leading-relaxed">
          {chapter.workedExample.scenario}
        </p>
        {chapter.workedExample.formulaBlock && (
          <pre className="p-3.5 rounded-xl bg-[#040B1A] border border-emerald-500/35 text-xs sm:text-sm font-mono text-emerald-300 overflow-x-auto whitespace-pre">
            {chapter.workedExample.formulaBlock}
          </pre>
        )}
        <ul className="space-y-1.5 text-xs sm:text-sm text-slate-200 list-disc pl-5">
          {chapter.workedExample.steps.map((step, idx) => (
            <li key={`${chapter.id}-step-${idx}`}>{step}</li>
          ))}
        </ul>
        <div className="pt-1 text-xs sm:text-sm font-black text-[#FFD400]">
          Answer: {chapter.workedExample.finalAnswer}
        </div>
      </div>

      {/* 4. Practice Questions & Answers */}
      <div className="space-y-3">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
          4. Practice Questions &amp; Answers
        </h4>
        <div className="space-y-2.5">
          {chapter.practiceQuestions.map((pq) => {
            const ansKey = `${chapter.id}-q${pq.number}`;
            const isShown = Boolean(revealedAnswers[ansKey]);
            return (
              <div
                key={ansKey}
                className="p-4 rounded-2xl bg-[#061128] border border-[#1E3A6E] space-y-2.5"
              >
                <div className="text-[11px] font-mono font-bold uppercase text-[#FFD400]">
                  Q{pq.number} — {pq.label}
                </div>
                <p className="text-xs sm:text-sm font-bold text-white leading-relaxed">
                  {pq.question}
                </p>
                <button
                  type="button"
                  onClick={() => toggleAnswer(chapter.id, pq.number)}
                  className="inline-flex items-center gap-2 min-h-[40px] px-4 py-1.5 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-xs cursor-pointer transition-colors"
                >
                  {isShown ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hide Answer</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Show Answer</span>
                    </>
                  )}
                </button>
                {isShown && (
                  <div className="p-3 rounded-xl bg-[#007A4D]/20 border border-[#007A4D]/50 text-xs sm:text-sm text-emerald-100 leading-relaxed">
                    {pq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Ask AI Tutor */}
      <div className="pt-1">
        <a
          href="/learn?lang=en"
          onClick={(e) => {
            e.preventDefault();
            navigate('learn', '/learn?lang=en');
          }}
          className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-sm shadow-md transition-all cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 shrink-0" />
          <span>Ask AI Tutor in Your Language</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </a>
      </div>
    </article>
  );

  return (
    <div
      onCopy={(e) => e.preventDefault()}
      className="min-h-screen bg-gradient-to-b from-[#061128] via-[#0A1F44] to-[#050D1E] text-white py-6 sm:py-8 px-4 sm:px-6 lg:px-8 overflow-x-hidden select-none"
    >
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        {/* Top Breadcrumb */}
        <nav
          aria-label="NCV Marketing Textbook Breadcrumb"
          className="flex flex-wrap items-center justify-between gap-3"
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('landing', '/');
            }}
            className="inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0D1E42] border border-[#1E3A6E] hover:border-[#FFD400] text-xs sm:text-sm font-bold text-slate-200 hover:text-[#FFD400] transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4 shrink-0" />
            <span>nexovian.group Homepage</span>
          </a>

          <a
            href="/textbooks"
            onClick={(e) => {
              e.preventDefault();
              navigate('textbooksLibrary', '/textbooks');
            }}
            className="inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0D1E42] border border-[#FFD400]/40 hover:border-[#FFD400] text-xs font-bold text-[#FFD400] transition-colors cursor-pointer"
          >
            <Library className="w-4 h-4 shrink-0" />
            <span>Nexovian Textbooks Library</span>
          </a>
        </nav>

        {/* HERO SECTION */}
        <section className="bg-[#0D1E42] border-2 border-[#FFD400]/55 rounded-3xl p-6 sm:p-9 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD400]/15 border border-[#FFD400]/50 text-[#FFD400] text-xs font-bold uppercase tracking-wider">
              <Megaphone className="w-4 h-4 shrink-0" />
              <span>Level 2 Complete • 10 Chapters + 100-Mark Mock Exam LIVE</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/60 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
              LIVE • L2 10/10 + EXAM &amp; MEMO
            </span>
          </div>

          <div className="space-y-2.5">
            <h1 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight break-words">
              NCV Marketing
            </h1>
            <p className="text-lg sm:text-2xl font-black text-[#FFD400]">
              Level 2 Complete (Chapters 1–10 + 100-Mark Mock Exam &amp; Memo LIVE): Full Curriculum — Read Online Only.
            </p>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
              Master all 10 Level 2 chapters (Marketing Basics, SWOT, Behaviour, STP, 4Ps/7Ps, Branding &amp; Labelling, Break-Even Pricing &amp; AIDA, Distribution, RATER CRM &amp; 7-Section Marketing Plan) plus the full 2-hour, 100-mark Level 2 Mock Exam Paper with Official Marking Memo—100% original South African study material free online.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleReadOnline}
              className="min-h-[50px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-sm sm:text-base shadow-lg transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <BookOpen className="w-5 h-5 shrink-0" />
              <span>Read All 10 Chapters FREE</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            <button
              type="button"
              onClick={handleJumpToMockExam}
              className="min-h-[50px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#061128] hover:bg-[#132959] border-2 border-[#FFD400]/70 text-[#FFD400] font-black text-sm sm:text-base shadow-lg transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <ClipboardCheck className="w-5 h-5 shrink-0" />
              <span>L2 Mock Exam (100 Marks)</span>
            </button>

            <div className="inline-flex flex-wrap gap-2">
              {(['ALL', 2] as const).map((lvl) => (
                <button
                  key={String(lvl)}
                  type="button"
                  onClick={() => setLevelFilter(lvl)}
                  className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-black transition-colors cursor-pointer ${
                    levelFilter === lvl
                      ? 'bg-emerald-500 text-black'
                      : 'bg-[#061128] border border-[#1E3A6E] text-slate-200 hover:border-[#FFD400]'
                  }`}
                >
                  {lvl === 'ALL' ? 'All Levels (10 + Exam)' : 'Level 2 (10 + Exam)'}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* LEVEL 2 LIVE CHAPTERS */}
        {(levelFilter === 'ALL' || levelFilter === 2) && level2Chapters.length > 0 && (
          <section ref={chaptersTopRef} className="space-y-5">
            <div className="border-b border-[#FFD400]/40 pb-2">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#FFD400]">
                LEVEL 2 — Chapters 1–10 (100% Complete &amp; LIVE)
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Ch 1: Basics • Ch 2: SWOT • Ch 3: Behaviour • Ch 4: STP • Ch 5: 4Ps/7Ps • Ch 6: Branding • Ch 7: Pricing &amp; AIDA • Ch 8: Distribution • Ch 9: CRM • Ch 10: Marketing Plan &amp; Exam Revision
              </p>
            </div>
            <div className="space-y-5">{level2Chapters.map(renderChapterCard)}</div>
          </section>
        )}

        {/* LEVEL 2 FULL MOCK EXAM PAPER & OFFICIAL MEMO */}
        {(levelFilter === 'ALL' || levelFilter === 2) && (
          <section
            id="l2-mock-exam"
            ref={mockExamRef}
            className="bg-[#0D1E42] border-2 border-[#FFD400]/65 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6"
          >
            {/* Exam Header */}
            <div className="border-b border-[#FFD400]/40 pb-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD400]/15 border border-[#FFD400]/50 text-[#FFD400] font-mono text-xs font-bold uppercase tracking-wider">
                  <ClipboardCheck className="w-4 h-4 shrink-0" />
                  <span>Level 2 • Full Mock Exam Paper</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/60 text-emerald-300 font-mono text-xs font-bold uppercase">
                  Time: {NCV_MARKETING_L2_MOCK_EXAM.timeAllocation} | Total: {NCV_MARKETING_L2_MOCK_EXAM.totalMarks} Marks
                </span>
              </div>

              <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                {NCV_MARKETING_L2_MOCK_EXAM.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#FFD400] font-bold">
                Instructions: {NCV_MARKETING_L2_MOCK_EXAM.instructions}
              </p>

              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    const nextState = !showFullExamMemo;
                    setShowFullExamMemo(nextState);
                    setShowSectionAMemo(nextState);
                  }}
                  className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-xs cursor-pointer transition-colors"
                >
                  {showFullExamMemo ? (
                    <>
                      <EyeOff className="w-4 h-4 shrink-0" />
                      <span>Hide Full Official Memo</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 shrink-0" />
                      <span>Show Full Official Memo</span>
                    </>
                  )}
                </button>

                {mcqAnsweredCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedMcqs({})}
                    className="inline-flex items-center gap-1.5 min-h-[42px] px-3.5 py-2 rounded-xl bg-[#061128] border border-[#1E3A6E] hover:border-[#FFD400] text-slate-200 font-bold text-xs cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                    <span>Reset MCQ Picks</span>
                  </button>
                )}
              </div>
            </div>

            {/* SECTION A: MULTIPLE CHOICE — 10 MARKS */}
            <div className="p-4 sm:p-6 rounded-2xl bg-[#071530] border border-[#1E3A6E] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E3A6E] pb-3">
                <div>
                  <h3 className="font-display font-black text-lg sm:text-xl text-[#FFD400]">
                    {NCV_MARKETING_L2_MOCK_EXAM.sectionATitle} — {NCV_MARKETING_L2_MOCK_EXAM.sectionAMarks} MARKS
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {NCV_MARKETING_L2_MOCK_EXAM.sectionAInstructions}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {(showSectionAMemo || showFullExamMemo) && (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 font-mono text-xs font-bold">
                      MCQ Score: {mcqCorrectCount}/{NCV_MARKETING_L2_MOCK_EXAM.sectionAMcqs.length}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowSectionAMemo((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-xs cursor-pointer transition-colors"
                  >
                    {showSectionAMemo || showFullExamMemo ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Hide Section A Memo</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Check Section A Memo</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {NCV_MARKETING_L2_MOCK_EXAM.sectionAMcqs.map((mcq) => {
                  const chosen = selectedMcqs[mcq.number];
                  const revealA = showSectionAMemo || showFullExamMemo;

                  return (
                    <div
                      key={mcq.number}
                      className="p-4 rounded-2xl bg-[#061128] border border-[#1E3A6E] space-y-2.5"
                    >
                      <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                        <span className="text-[#FFD400] font-mono mr-1.5">{mcq.number}</span>
                        {mcq.question}
                      </div>

                      <div className="space-y-1.5">
                        {mcq.options.map((opt) => {
                          const isSelected = chosen === opt.letter;
                          const isCorrectOption = opt.letter === mcq.correctLetter;

                          let btnStyle =
                            'bg-[#0D1E42] border-[#1E3A6E] text-slate-200 hover:border-[#FFD400]';
                          if (revealA) {
                            if (isCorrectOption) {
                              btnStyle =
                                'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold';
                            } else if (isSelected && !isCorrectOption) {
                              btnStyle = 'bg-rose-500/20 border-rose-400 text-rose-200';
                            }
                          } else if (isSelected) {
                            btnStyle = 'bg-[#FFD400]/20 border-[#FFD400] text-[#FFD400] font-bold';
                          }

                          return (
                            <button
                              key={`${mcq.number}-${opt.letter}`}
                              type="button"
                              onClick={() =>
                                setSelectedMcqs((prev) => ({ ...prev, [mcq.number]: opt.letter }))
                              }
                              className={`w-full text-left px-3 py-2 rounded-xl border text-xs transition-colors cursor-pointer ${btnStyle}`}
                            >
                              <span className="font-mono font-bold mr-1.5">{opt.letter}.</span>
                              <span>{opt.text}</span>
                            </button>
                          );
                        })}
                      </div>

                      {revealA && (
                        <div className="pt-1 text-[11px] font-bold text-emerald-300">
                          Memo: {mcq.memoSummary}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECTION B: SHORT QUESTIONS — 40 MARKS */}
            <div className="p-4 sm:p-6 rounded-2xl bg-[#071530] border border-[#1E3A6E] space-y-4">
              <div className="border-b border-[#1E3A6E] pb-3">
                <h3 className="font-display font-black text-lg sm:text-xl text-[#FFD400]">
                  {NCV_MARKETING_L2_MOCK_EXAM.sectionBTitle} — {NCV_MARKETING_L2_MOCK_EXAM.sectionBMarks} MARKS
                </h3>
              </div>

              <div className="space-y-4">
                {sectionBQuestions.map((q) => {
                  const memoKey = `l2-exam-q${q.questionNumber}`;
                  const isMemoShown = showFullExamMemo || Boolean(revealedAnswers[memoKey]);

                  return (
                    <div
                      key={memoKey}
                      className="p-4 sm:p-5 rounded-2xl bg-[#061128] border border-[#1E3A6E] space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-display font-black text-base text-white">
                          {q.title}
                        </h4>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FFD400]/15 border border-[#FFD400]/40 text-[#FFD400] font-mono text-xs font-bold">
                          {q.totalMarks} Marks
                        </span>
                      </div>

                      {q.scenario && (
                        <p className="p-3 rounded-xl bg-[#0D1E42] border border-[#1E3A6E] text-xs sm:text-sm text-slate-200 leading-relaxed">
                          {q.scenario}
                        </p>
                      )}

                      <div className="space-y-2">
                        {q.subQuestions.map((sq) => (
                          <div
                            key={sq.code}
                            className="text-xs sm:text-sm text-slate-100 leading-relaxed flex items-start justify-between gap-3"
                          >
                            <div>
                              <span className="font-mono font-bold text-[#FFD400] mr-2">
                                {sq.code}
                              </span>
                              <span>{sq.prompt}</span>
                            </div>
                            <span className="font-mono text-xs text-slate-300 shrink-0">
                              ({sq.marks})
                            </span>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setRevealedAnswers((prev) => ({
                            ...prev,
                            [memoKey]: !prev[memoKey]
                          }))
                        }
                        className="inline-flex items-center gap-2 min-h-[38px] px-4 py-1.5 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-xs cursor-pointer transition-colors"
                      >
                        {isMemoShown ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Hide Q{q.questionNumber} Memo</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>Show Q{q.questionNumber} Memo</span>
                          </>
                        )}
                      </button>

                      {isMemoShown && (
                        <div className="p-3.5 rounded-xl bg-[#007A4D]/20 border border-[#007A4D]/50 space-y-1.5 text-xs sm:text-sm text-emerald-100 leading-relaxed">
                          <div className="font-mono text-[11px] font-bold uppercase text-emerald-300">
                            Official Memo — Question {q.questionNumber}
                          </div>
                          {q.subQuestions.map((sq) => (
                            <div key={`${sq.code}-memo`}>
                              <span className="font-mono font-bold text-[#FFD400] mr-1.5">
                                {sq.code}
                              </span>
                              <span>{sq.memoAnswer}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECTION C: LONG QUESTIONS — 50 MARKS */}
            <div className="p-4 sm:p-6 rounded-2xl bg-[#071530] border border-[#1E3A6E] space-y-4">
              <div className="border-b border-[#1E3A6E] pb-3">
                <h3 className="font-display font-black text-lg sm:text-xl text-[#FFD400]">
                  {NCV_MARKETING_L2_MOCK_EXAM.sectionCTitle} — {NCV_MARKETING_L2_MOCK_EXAM.sectionCMarks} MARKS
                </h3>
              </div>

              <div className="space-y-4">
                {sectionCQuestions.map((q) => {
                  const memoKey = `l2-exam-q${q.questionNumber}`;
                  const isMemoShown = showFullExamMemo || Boolean(revealedAnswers[memoKey]);

                  return (
                    <div
                      key={memoKey}
                      className="p-4 sm:p-5 rounded-2xl bg-[#061128] border border-[#1E3A6E] space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-display font-black text-base text-white">
                          {q.title}
                        </h4>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FFD400]/15 border border-[#FFD400]/40 text-[#FFD400] font-mono text-xs font-bold">
                          {q.totalMarks} Marks
                        </span>
                      </div>

                      {q.scenario && (
                        <p className="p-3 rounded-xl bg-[#0D1E42] border border-[#FFD400]/30 text-xs sm:text-sm font-semibold text-white leading-relaxed">
                          {q.scenario}
                        </p>
                      )}

                      <div className="space-y-2">
                        {q.subQuestions.map((sq) => (
                          <div
                            key={sq.code}
                            className="text-xs sm:text-sm text-slate-100 leading-relaxed flex items-start justify-between gap-3"
                          >
                            <div>
                              <span className="font-mono font-bold text-[#FFD400] mr-2">
                                {sq.code}
                              </span>
                              <span>{sq.prompt}</span>
                            </div>
                            <span className="font-mono text-xs text-slate-300 shrink-0">
                              ({sq.marks})
                            </span>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setRevealedAnswers((prev) => ({
                            ...prev,
                            [memoKey]: !prev[memoKey]
                          }))
                        }
                        className="inline-flex items-center gap-2 min-h-[38px] px-4 py-1.5 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-xs cursor-pointer transition-colors"
                      >
                        {isMemoShown ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Hide Q{q.questionNumber} Memo</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>Show Q{q.questionNumber} Memo</span>
                          </>
                        )}
                      </button>

                      {isMemoShown && (
                        <div className="p-3.5 rounded-xl bg-[#007A4D]/20 border border-[#007A4D]/50 space-y-1.5 text-xs sm:text-sm text-emerald-100 leading-relaxed">
                          <div className="font-mono text-[11px] font-bold uppercase text-emerald-300">
                            Official Memo — Question {q.questionNumber}
                          </div>
                          {q.subQuestions.map((sq) => (
                            <div key={`${sq.code}-memo`}>
                              <span className="font-mono font-bold text-[#FFD400] mr-1.5">
                                {sq.code}
                              </span>
                              <span>{sq.memoAnswer}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* OFFICIAL MARKING MEMO SUMMARY BAR */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#061128] border border-emerald-400/45 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Official Marking Memo
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 font-semibold">
                    {NCV_MARKETING_L2_MOCK_EXAM.stopNote}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const nextState = !showFullExamMemo;
                    setShowFullExamMemo(nextState);
                    setShowSectionAMemo(nextState);
                  }}
                  className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs cursor-pointer transition-colors"
                >
                  {showFullExamMemo ? (
                    <>
                      <EyeOff className="w-4 h-4 shrink-0" />
                      <span>Hide Complete Memo</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 shrink-0" />
                      <span>View Complete Memo (100 Marks)</span>
                    </>
                  )}
                </button>
              </div>

              {showFullExamMemo && (
                <div className="pt-2 border-t border-emerald-500/30 space-y-3 text-xs sm:text-sm text-emerald-100">
                  <div>
                    <div className="font-mono text-xs font-bold text-[#FFD400] mb-1">
                      SECTION A ANSWERS (10 Marks)
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {NCV_MARKETING_L2_MOCK_EXAM.sectionAMcqs.map((mcq) => (
                        <div key={`full-memo-${mcq.number}`}>{mcq.memoSummary}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* LEVEL 3 LIVE CHAPTERS */}
        {(levelFilter === 'ALL' || levelFilter === 3) && level3Chapters.length > 0 && (
          <section className="space-y-5">
            <div className="border-b border-emerald-400/40 pb-2">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-emerald-300">
                LEVEL 3
              </h2>
            </div>
            <div className="space-y-5">{level3Chapters.map(renderChapterCard)}</div>
          </section>
        )}

        {/* LEVEL 4 LIVE CHAPTERS */}
        {(levelFilter === 'ALL' || levelFilter === 4) && level4Chapters.length > 0 && (
          <section className="space-y-5">
            <div className="border-b border-sky-400/40 pb-2">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-sky-300">
                LEVEL 4
              </h2>
            </div>
            <div className="space-y-5">{level4Chapters.map(renderChapterCard)}</div>
          </section>
        )}

        {/* COURSE ROADMAP */}
        <section className="bg-[#0D1E42] border border-[#1E3A6E] rounded-3xl p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display font-black text-xl text-[#FFD400]">
              Course Roadmap — Level 2 Complete (10/10 Chapters LIVE)
            </h2>
            <span className="text-xs font-mono text-emerald-300 font-bold">
              Expanding Chapter-by-Chapter
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {NCV_MARKETING_ROADMAP.map((item) => (
              <div
                key={`${item.level}-${item.chapterNumber}`}
                className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#061128] border border-[#1E3A6E] text-xs"
              >
                <div className="space-y-0.5">
                  <div className="font-mono text-[11px] text-[#FFD400]">
                    Level {item.level} • Chapter {item.chapterNumber}
                  </div>
                  <div className="font-bold text-white">{item.title}</div>
                </div>
                {item.status === 'LIVE' ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 font-bold shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>LIVE</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0D1E42] border border-[#1E3A6E] text-slate-300 font-bold shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                    <span>NEXT</span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* INTERNAL LINKS SECTION */}
        <section className="bg-[#0D1E42] border border-[#1E3A6E] rounded-3xl p-6 shadow-lg space-y-4">
          <h2 className="font-display font-bold text-lg text-[#FFD400]">
            Explore More Free Nexovian Textbooks
          </h2>
          <div className="flex flex-wrap gap-2.5">
            <a
              href="/textbooks"
              onClick={(e) => {
                e.preventDefault();
                navigate('textbooksLibrary', '/textbooks');
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-xs cursor-pointer"
            >
              <span>Nexovian Textbooks Library</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="/textbooks/ncv-office-administration-textbook"
              onClick={(e) => {
                e.preventDefault();
                navigate('ncvOfficeAdminTextbook', '/textbooks/ncv-office-administration-textbook');
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#061128] hover:bg-[#132959] border border-[#1E3A6E] hover:border-[#FFD400] text-slate-100 hover:text-[#FFD400] font-bold text-xs cursor-pointer"
            >
              <span>NCV Office Administration Textbook</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="/textbooks/electrical-trade-theory-textbook"
              onClick={(e) => {
                e.preventDefault();
                navigate('electricalTextbook', '/textbooks/electrical-trade-theory-textbook');
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#061128] hover:bg-[#132959] border border-[#1E3A6E] hover:border-[#FFD400] text-slate-100 hover:text-[#FFD400] font-bold text-xs cursor-pointer"
            >
              <span>Electrical Trade Theory Textbook</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="/textbooks/ncv-tourism-textbook"
              onClick={(e) => {
                e.preventDefault();
                navigate('ncvTourismTextbook', '/textbooks/ncv-tourism-textbook');
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#061128] hover:bg-[#132959] border border-[#1E3A6E] hover:border-[#FFD400] text-slate-100 hover:text-[#FFD400] font-bold text-xs cursor-pointer"
            >
              <span>NCV Tourism Textbook</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="/textbooks/ncv-it-computer-science-textbook"
              onClick={(e) => {
                e.preventDefault();
                navigate('ncvItTextbook', '/textbooks/ncv-it-computer-science-textbook');
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#061128] hover:bg-[#132959] border border-[#1E3A6E] hover:border-[#FFD400] text-slate-100 hover:text-[#FFD400] font-bold text-xs cursor-pointer"
            >
              <span>NCV IT &amp; Computer Science Textbook</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="/textbooks/ncv-finance-economics-accounting-textbook"
              onClick={(e) => {
                e.preventDefault();
                navigate('ncvFinanceTextbook', '/textbooks/ncv-finance-economics-accounting-textbook');
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#061128] hover:bg-[#132959] border border-[#1E3A6E] hover:border-[#FFD400] text-slate-100 hover:text-[#FFD400] font-bold text-xs cursor-pointer"
            >
              <span>NCV Finance, Economics &amp; Accounting Textbook</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="/textbooks/ncv-economic-environment-textbook"
              onClick={(e) => {
                e.preventDefault();
                navigate('ncvEconomicEnvironmentTextbook', '/textbooks/ncv-economic-environment-textbook');
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#061128] hover:bg-[#132959] border border-[#1E3A6E] hover:border-[#FFD400] text-slate-100 hover:text-[#FFD400] font-bold text-xs cursor-pointer"
            >
              <span>NCV Economic Environment Textbook</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* COPYRIGHT FOOTER */}
        <footer className="bg-[#071530] border border-[#FFD400]/40 rounded-3xl p-6 space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>100% Nexovian Original Study Material — Read Online Only</span>
          </div>
          <p className="font-bold text-white">
            &copy; 2026 Nexovian. Original Nexovian study material. For online reading only on nexovian.group.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default NcvMarketingTextbookPage;
