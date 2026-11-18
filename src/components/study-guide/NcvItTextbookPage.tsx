/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN ORIGINAL NCV INFORMATION TECHNOLOGY & COMPUTER SCIENCE TEXTBOOK
 * Status: IN PROGRESS — Chapters 1–3 LIVE (out of 10 Chapters)
 * Route: /textbooks/ncv-it-computer-science-textbook
 * Read Online Only on nexovian.group.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Cpu,
  Eye,
  EyeOff,
  Home,
  Library,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import {
  ItChapter,
  NCV_IT_LIVE_CHAPTERS,
  NCV_IT_ROADMAP
} from '../../data/ncvItTextbookData';

const PAGE_TITLE =
  'NCV Information Technology & Computer Science Textbook (Chapters 1-7 LIVE) | Nexovian';
const PAGE_META_DESC =
  'Read Chapters 1–7 of Nexovian’s original NCV Information Technology & Computer Science Level 2–4 textbook free online, now including Level 4 Web Development.';

export const NcvItTextbookPage: React.FC = () => {
  const { setCurrentTab } = useLearning();
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const chaptersTopRef = useRef<HTMLDivElement | null>(null);

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

  const renderChapterCard = (chapter: ItChapter) => (
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
          Chapter {chapter.chapterNumber}: {chapter.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#FFD400] font-semibold">{chapter.subtitle}</p>
      </div>

      {/* 1. Clear Explanation */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#071530] border border-[#FFD400]/35 space-y-4">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
          1. Clear Explanation (NCV Level {chapter.level}) — Simple English Study Notes
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
            {sec.bullets && (
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-200 list-disc pl-5">
                {sec.bullets.map((b, idx) => (
                  <li key={`${sec.heading}-b-${idx}`}>{b}</li>
                ))}
              </ul>
            )}
            {sec.codeBlock && (
              <pre className="p-3.5 rounded-xl bg-[#040B1A] border border-[#1E3A6E] text-xs sm:text-sm font-mono text-emerald-300 overflow-x-auto whitespace-pre">
                {sec.codeBlock}
              </pre>
            )}
          </div>
        ))}
      </div>

      {/* 2. Key Terms Box */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
          2. Key Terms Box (English)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
        {chapter.workedExample.codeBlock && (
          <pre className="p-3.5 rounded-xl bg-[#040B1A] border border-emerald-500/35 text-xs sm:text-sm font-mono text-emerald-300 overflow-x-auto whitespace-pre">
            {chapter.workedExample.codeBlock}
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
                {pq.questionCodeBlock && (
                  <pre className="p-3 rounded-xl bg-[#040B1A] border border-[#1E3A6E] text-xs font-mono text-amber-200 overflow-x-auto whitespace-pre">
                    {pq.questionCodeBlock}
                  </pre>
                )}
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
                  <div className="p-3 rounded-xl bg-[#007A4D]/20 border border-[#007A4D]/50 text-xs sm:text-sm text-emerald-100 leading-relaxed space-y-2">
                    <div>{pq.answer}</div>
                    {pq.answerCodeBlock && (
                      <pre className="p-3 rounded-xl bg-[#040B1A] border border-emerald-500/40 text-xs font-mono text-emerald-200 overflow-x-auto whitespace-pre">
                        {pq.answerCodeBlock}
                      </pre>
                    )}
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
          aria-label="IT Textbook Breadcrumb"
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
              <Cpu className="w-4 h-4 shrink-0" />
              <span>Level 2, 3, 4 • 10 Chapters Planned</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/60 text-amber-200 text-xs font-mono font-bold uppercase tracking-wider">
              IN PROGRESS - 7/10 LIVE
            </span>
          </div>

          <div className="space-y-2.5">
            <h1 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight break-words">
              NCV Information Technology &amp; Computer Science
            </h1>
            <p className="text-lg sm:text-2xl font-black text-[#FFD400]">
              Chapters 1–7 LIVE Now (Level 2, Level 3 &amp; Level 4 Web Dev). Read Online Only.
            </p>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
              Study all of Level 2 (Chapters 1–3), all of Level 3 (Chapters 4–6), and Level 4 Chapter 7 (Web Development: HTML, CSS &amp; JavaScript) free right now, while Chapters 8–10 are added next.
            </p>
          </div>

          <div>
            <button
              type="button"
              onClick={handleReadOnline}
              className="min-h-[50px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-sm sm:text-base shadow-lg transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <BookOpen className="w-5 h-5 shrink-0" />
              <span>Read Chapters 1-7 FREE</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </section>

        {/* LEVEL 2 LIVE CHAPTERS (1–3) */}
        <section ref={chaptersTopRef} className="space-y-5">
          <div className="border-b border-[#FFD400]/40 pb-2">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#FFD400]">
              LEVEL 2 — Chapters 1–3 (LIVE Now)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Introduction to Computing, Computer Hardware &amp; Storage, and Software, Operating Systems &amp; File Management
            </p>
          </div>
          <div className="space-y-5">
            {NCV_IT_LIVE_CHAPTERS.filter((c) => c.level === 2).map(renderChapterCard)}
          </div>
        </section>

        {/* LEVEL 3 LIVE CHAPTERS (4–6) */}
        <section className="space-y-5">
          <div className="border-b border-[#FFD400]/40 pb-2">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#FFD400]">
              LEVEL 3 — Chapters 4–6 (LIVE Now)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Networks &amp; Internet, Python Programming Fundamentals, and Data, Spreadsheets &amp; Databases
            </p>
          </div>
          <div className="space-y-5">
            {NCV_IT_LIVE_CHAPTERS.filter((c) => c.level === 3).map(renderChapterCard)}
          </div>
        </section>

        {/* LEVEL 4 LIVE CHAPTER (7) */}
        <section className="space-y-5">
          <div className="border-b border-[#FFD400]/40 pb-2">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#FFD400]">
              LEVEL 4 — Chapter 7 (LIVE Now)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Web Development — HTML, CSS &amp; JavaScript
            </p>
          </div>
          <div className="space-y-5">
            {NCV_IT_LIVE_CHAPTERS.filter((c) => c.level === 4).map(renderChapterCard)}
          </div>
        </section>

        {/* CHAPTERS 1–10 ROADMAP */}
        <section className="bg-[#0D1E42] border border-[#1E3A6E] rounded-3xl p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display font-black text-xl text-[#FFD400]">
              Full 10-Chapter Course Roadmap (7/10 LIVE)
            </h2>
            <span className="text-xs font-mono text-slate-300">Chapter 10 = Bonus Exam Prep</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {NCV_IT_ROADMAP.map((item) => (
              <div
                key={item.chapterNumber}
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

export default NcvItTextbookPage;
