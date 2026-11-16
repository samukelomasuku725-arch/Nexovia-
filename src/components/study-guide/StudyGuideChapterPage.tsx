/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * STUDY GUIDE CHAPTER PAGE
 * Strictly follows the 5-section layout:
 * 1. Simple Summary (easy English)
 * 2. Key Formulas / Diagrams box
 * 3. Worked Example (step-by-step)
 * 4. 5 Practice Questions
 * 5. "Show Answer" button for each question (hidden until clicked)
 */

import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calculator,
  CheckCircle2,
  Eye,
  EyeOff,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import {
  DEGREE_CHAPTERS,
  findStudyGuideChapter,
  LIFE_SCIENCES_CHAPTERS,
  MATHS_CHAPTERS,
  MATHS_LITERACY_CHAPTERS,
  NCV_CHAPTERS,
  PHYSICS_CHAPTERS,
  TVET_CHAPTERS
} from '../../data/studyGuideContent';
import { useStudyGuideProgress } from '../../utils/studyGuideProgress';

export const StudyGuideChapterPage: React.FC = () => {
  const { setCurrentTab } = useLearning();
  const [pathname, setPathname] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/study-guide/physics-grade-12/momentum'
  );
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});
  const { progress, toggleComplete, markVisited } = useStudyGuideProgress();

  useEffect(() => {
    const syncPath = () => {
      if (typeof window !== 'undefined') {
        setPathname(window.location.pathname);
        setRevealedAnswers({});
      }
    };
    window.addEventListener('popstate', syncPath);
    window.addEventListener('nexovian-navigation', syncPath);
    return () => {
      window.removeEventListener('popstate', syncPath);
      window.removeEventListener('nexovian-navigation', syncPath);
    };
  }, []);

  const cleanPath = pathname.toLowerCase().replace(/\/+$/, '');
  const parts = cleanPath.split('/').filter(Boolean);
  const rawSlug = parts[2] || 'momentum';

  const chapter = findStudyGuideChapter(rawSlug) || PHYSICS_CHAPTERS[0];
  const isCompleted = progress.completedSlugs.includes(chapter.slug);

  // Record this chapter as the most recently opened chapter & reset hidden answers when slug changes
  useEffect(() => {
    setRevealedAnswers({});
    markVisited(chapter.slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter.slug]);

  const siblingChapters =
    chapter.subject === 'physics'
      ? PHYSICS_CHAPTERS
      : chapter.subject === 'life-sciences'
      ? LIFE_SCIENCES_CHAPTERS
      : chapter.subject === 'maths-literacy'
      ? MATHS_LITERACY_CHAPTERS
      : chapter.subject === 'maths'
      ? MATHS_CHAPTERS
      : chapter.subject === 'degree'
      ? DEGREE_CHAPTERS
      : chapter.subject === 'ncv'
      ? NCV_CHAPTERS
      : TVET_CHAPTERS;
  const currentIndex = siblingChapters.findIndex((c) => c.slug === chapter.slug);
  const prevChapter = currentIndex > 0 ? siblingChapters[currentIndex - 1] : null;
  const nextChapter =
    currentIndex >= 0 && currentIndex < siblingChapters.length - 1
      ? siblingChapters[currentIndex + 1]
      : null;

  const navigate = (
    tab:
      | 'studyGuide'
      | 'studyGuidePhysics'
      | 'studyGuideLifeSciences'
      | 'studyGuideMathsLiteracy'
      | 'studyGuideMaths'
      | 'studyGuideTvet'
      | 'studyGuideDegree'
      | 'studyGuideNcv'
      | 'studyGuideChapter'
      | 'studyGuideExamTips',
    path: string
  ) => {
    setRevealedAnswers({});
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setPathname(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentTab(tab);
  };

  const toggleAnswer = (questionNumber: number) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [questionNumber]: !prev[questionNumber]
    }));
  };

  const subjectTab =
    chapter.subject === 'physics'
      ? 'studyGuidePhysics'
      : chapter.subject === 'life-sciences'
      ? 'studyGuideLifeSciences'
      : chapter.subject === 'maths-literacy'
      ? 'studyGuideMathsLiteracy'
      : chapter.subject === 'maths'
      ? 'studyGuideMaths'
      : chapter.subject === 'degree'
      ? 'studyGuideDegree'
      : chapter.subject === 'ncv'
      ? 'studyGuideNcv'
      : 'studyGuideTvet';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#061128] via-[#0A1F44] to-[#050D1E] text-white py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-7 sm:space-y-8">
        {/* Top Back Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <a
            href={chapter.backPath}
            onClick={(e) => {
              e.preventDefault();
              navigate(subjectTab, chapter.backPath);
            }}
            className="inline-flex items-center gap-2 min-h-[44px] px-3 py-2 rounded-xl bg-[#0D1E42] border border-[#1E3A6E] hover:border-[#FFD400] text-xs sm:text-sm font-bold text-slate-200 hover:text-[#FFD400] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>Back to {chapter.subjectLabel}</span>
          </a>

          <a
            href="/study-guide"
            onClick={(e) => {
              e.preventDefault();
              navigate('studyGuide', '/study-guide');
            }}
            className="inline-flex items-center min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0D1E42] border border-[#FFD400]/40 hover:border-[#FFD400] text-xs sm:text-sm font-bold text-[#FFD400] transition-colors cursor-pointer"
          >
            All Study Guides
          </a>
        </div>

        {/* Chapter Hero Header */}
        <header className="bg-[#0D1E42] border-2 border-[#FFD400]/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFD400]/15 border border-[#FFD400]/50 text-[#FFD400] text-xs font-bold uppercase tracking-wider">
              <span>{chapter.subjectIcon}</span>
              <span>
                {chapter.subjectLabel} • Chapter {chapter.chapterNumber}
              </span>
            </div>

            {isCompleted && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Completed</span>
              </span>
            )}
          </div>

          <h1 className="font-display font-black text-2xl sm:text-4xl text-white leading-tight break-words">
            Chapter {chapter.chapterNumber}: {chapter.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {chapter.shortDescription}
          </p>
        </header>

        {/* SECTION 1: Simple Summary (easy English) */}
        <section className="bg-[#0D1E42] border border-[#1E3A6E] rounded-3xl p-5 sm:p-8 shadow-xl space-y-4">
          <div className="flex items-center gap-2.5 text-[#FFD400]">
            <BookOpen className="w-5 h-5 shrink-0" />
            <h2 className="font-display font-black text-xl sm:text-2xl text-white">
              Simple Summary
            </h2>
          </div>
          <div className="space-y-3 text-slate-100 text-sm sm:text-base leading-relaxed">
            {chapter.summary.map((line, idx) => (
              <p key={idx} className="bg-[#071530] border border-[#1E3A6E] rounded-2xl p-4 break-words">
                {line}
              </p>
            ))}
          </div>
        </section>

        {/* SECTION 2: Key Formulas / Diagrams Box */}
        <section className="bg-[#0D1E42] border-2 border-[#FFD400]/45 rounded-3xl p-5 sm:p-8 shadow-xl space-y-5">
          <div className="flex items-center gap-2.5 text-[#FFD400]">
            <Calculator className="w-5 h-5 shrink-0" />
            <h2 className="font-display font-black text-xl sm:text-2xl text-white">
              {chapter.formulasTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {chapter.formulas.map((f, idx) => (
              <div
                key={idx}
                className="bg-[#071530] border border-[#FFD400]/35 rounded-2xl p-4 flex flex-col justify-between gap-1.5 min-w-0"
              >
                <div className="font-mono font-black text-base sm:text-lg text-[#FFD400] break-words">
                  {f.expression}
                </div>
                <div className="text-xs sm:text-sm text-slate-300 break-words leading-relaxed">
                  {f.meaning}
                </div>
              </div>
            ))}
          </div>

          {chapter.diagramLines && chapter.diagramLines.length > 0 && (
            <div className="bg-[#050F24] border border-[#1E3A6E] rounded-2xl p-4 overflow-x-auto max-w-full">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#FFD400] mb-2">
                Visual Diagram
              </div>
              <pre className="font-mono text-xs sm:text-sm text-slate-100 leading-relaxed whitespace-pre">
                {chapter.diagramLines.join('\n')}
              </pre>
            </div>
          )}
        </section>

        {/* SECTION 3: Worked Example (step-by-step) */}
        <section className="bg-[#0D1E42] border border-[#1E3A6E] rounded-3xl p-5 sm:p-8 shadow-xl space-y-5">
          <div className="flex items-center gap-2.5 text-[#FFD400]">
            <Lightbulb className="w-5 h-5 shrink-0" />
            <h2 className="font-display font-black text-xl sm:text-2xl text-white">
              Worked Example (Step-by-Step)
            </h2>
          </div>

          <div className="bg-[#071530] border-l-4 border-[#FFD400] rounded-r-2xl p-4 sm:p-5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#FFD400] mb-1">
              Question
            </div>
            <p className="text-sm sm:text-base font-semibold text-white break-words leading-relaxed">
              {chapter.workedExample.question}
            </p>
          </div>

          <div className="space-y-2.5">
            {chapter.workedExample.steps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-[#071530] border border-[#1E3A6E] rounded-xl p-3.5 text-sm text-slate-100 font-mono min-w-0"
              >
                <span className="w-6 h-6 rounded-full bg-[#FFD400] text-black font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed min-w-0 break-words">{step}</span>
              </div>
            ))}
          </div>

          <div className="bg-emerald-950/50 border border-emerald-400/40 rounded-2xl p-4 flex items-start sm:items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
            <div className="min-w-0">
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                Final Answer
              </div>
              <div className="font-mono font-bold text-sm sm:text-base text-white break-words">
                {chapter.workedExample.finalAnswer}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 & 5: 5 Practice Questions with "Show Answer" button */}
        <section className="bg-[#0D1E42] border border-[#1E3A6E] rounded-3xl p-5 sm:p-8 shadow-xl space-y-5">
          <div className="flex items-center gap-2.5 text-[#FFD400]">
            <HelpCircle className="w-5 h-5 shrink-0" />
            <h2 className="font-display font-black text-xl sm:text-2xl text-white">
              5 Practice Questions
            </h2>
          </div>

          <div className="space-y-4">
            {chapter.practiceQuestions.map((pq) => {
              const isShown = Boolean(revealedAnswers[pq.number]);
              return (
                <div
                  key={pq.number}
                  className="bg-[#071530] border border-[#1E3A6E] rounded-2xl p-4 sm:p-5 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1.5 min-w-0">
                      <span className="inline-block text-xs font-mono font-bold text-[#FFD400] uppercase">
                        Question {pq.number}
                      </span>
                      <p className="text-sm sm:text-base font-semibold text-white leading-relaxed break-words">
                        {pq.question}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleAnswer(pq.number)}
                      aria-expanded={isShown}
                      className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-sm whitespace-nowrap shrink-0 shadow-md transition-all cursor-pointer active:scale-95"
                    >
                      {isShown ? (
                        <>
                          <EyeOff className="w-4 h-4 shrink-0" />
                          <span>Hide Answer</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 shrink-0" />
                          <span>Show Answer</span>
                        </>
                      )}
                    </button>
                  </div>

                  {isShown && (
                    <div className="bg-[#0D234D] border border-[#FFD400]/45 rounded-xl p-4 space-y-1.5">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#FFD400]">
                        Answer
                      </div>
                      {pq.answer.map((line, lineIdx) => (
                        <p
                          key={lineIdx}
                          className="text-sm text-slate-100 leading-relaxed font-mono whitespace-pre-wrap break-words"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Chapter Completion Toggle Bar */}
        <div className="bg-[#0D1E42] border-2 border-[#FFD400]/45 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
              Track Your Progress
            </div>
            <div className="font-display font-bold text-base sm:text-lg text-white">
              {isCompleted
                ? 'Great work! This chapter is marked as completed.'
                : 'Finished reading and practicing this chapter?'}
            </div>
          </div>

          <button
            type="button"
            onClick={() => toggleComplete(chapter.slug)}
            className={`w-full sm:w-auto min-h-[50px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-black text-sm sm:text-base transition-all active:scale-95 cursor-pointer shrink-0 ${
              isCompleted
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg'
                : 'bg-[#FFD400] hover:bg-yellow-400 text-black shadow-lg'
            }`}
          >
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{isCompleted ? 'Completed ✓' : 'Mark Chapter Complete'}</span>
          </button>
        </div>

        {/* Bottom Prev / Next Chapter Navigation */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
          {prevChapter ? (
            <a
              href={`${prevChapter.backPath}/${prevChapter.slug}`}
              onClick={(e) => {
                e.preventDefault();
                navigate('studyGuideChapter', `${prevChapter.backPath}/${prevChapter.slug}`);
              }}
              className="min-h-[50px] inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-[#0D1E42] hover:bg-[#122859] border border-[#1E3A6E] hover:border-[#FFD400] text-white font-bold text-sm transition-colors cursor-pointer text-center"
            >
              <ArrowLeft className="w-4 h-4 text-[#FFD400] shrink-0" />
              <span className="break-words">Previous: {prevChapter.title}</span>
            </a>
          ) : (
            <div />
          )}

          {nextChapter && (
            <a
              href={`${nextChapter.backPath}/${nextChapter.slug}`}
              onClick={(e) => {
                e.preventDefault();
                navigate('studyGuideChapter', `${nextChapter.backPath}/${nextChapter.slug}`);
              }}
              className="min-h-[50px] inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-sm transition-colors shadow-md cursor-pointer text-center"
            >
              <span className="break-words">Next: {nextChapter.title}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyGuideChapterPage;
