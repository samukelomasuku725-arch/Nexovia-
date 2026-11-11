/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN STUDY GUIDE - LIFE SCIENCES GRADE 12 (/study-guide/life-sciences-grade-12)
 * SA CAPS Grade 12 Only
 */

import React from 'react';
import { ArrowLeft, ChevronRight, Dna, BookOpen, Clock, FileText, CheckCircle2 } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export interface LifeSciencesChapter {
  id: string;
  slug: string;
  chapterNumber: number;
  title: string;
  strand: string;
  marksEst: string;
  summary: string;
}

export const LIFE_SCIENCES_CHAPTERS: LifeSciencesChapter[] = [
  {
    id: 'ls-1',
    slug: 'dna-protein-synthesis',
    chapterNumber: 1,
    title: 'DNA & Protein Synthesis',
    strand: 'Life at the Molecular Level',
    marksEst: '27-30 Marks (Paper 2)',
    summary: 'Structure of DNA and RNA, DNA replication in the nucleus, transcription to mRNA, and translation at ribosomes into polypeptide chains.'
  },
  {
    id: 'ls-2',
    slug: 'meiosis-reproduction',
    chapterNumber: 2,
    title: 'Meiosis & Reproduction',
    strand: 'Life Processes in Plants & Animals',
    marksEst: '21-25 Marks (Paper 1 & 2)',
    summary: 'Meiosis I and II, crossing over and random assortment generating genetic variation, non-disjunction (Down syndrome), and human reproductive systems.'
  },
  {
    id: 'ls-3',
    slug: 'genetics-inheritance',
    chapterNumber: 3,
    title: 'Genetics & Inheritance',
    strand: 'Life at the Molecular Level',
    marksEst: '45-48 Marks (Paper 2)',
    summary: 'Monohybrid and dihybrid crosses, Mendel’s laws, sex-linked inheritance (haemophilia, colour blindness), blood group alleles, and pedigree diagrams.'
  },
  {
    id: 'ls-4',
    slug: 'evolution',
    chapterNumber: 4,
    title: 'Evolution',
    strand: 'Diversity, Change & Continuity',
    marksEst: '64-66 Marks (Paper 2)',
    summary: 'Evidence for evolution (fossil records, biogeography, genetics), Lamarckism vs Darwinism, speciation through geographic isolation, and human evolution hominid fossil sites.'
  },
  {
    id: 'ls-5',
    slug: 'human-impact-environment',
    chapterNumber: 5,
    title: 'Human Impact on Environment',
    strand: 'Environmental Studies',
    marksEst: 'Paper 1 Section',
    summary: 'Water availability and quality, food security, loss of biodiversity, solid waste management, and greenhouse effect global warming.'
  }
];

export const LifeSciencesGrade12Page: React.FC = () => {
  const { setCurrentTab } = useLearning();

  const handleNavigate = (path: string, tab: any) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    setCurrentTab(tab);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans antialiased pb-20">
      {/* Top Breadcrumb & Return Bar */}
      <div className="bg-[#141414] border-b border-[#262626] px-4 py-3 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a
            href="/study-guide"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate('/study-guide', 'studyGuide');
            }}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-300 hover:text-[#FFD400] transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4 text-[#FFD400]" />
            <span>&larr; Back to Study Guides</span>
          </a>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/40">
              Grade 12 Life Sciences • CAPS
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1A1A] border border-emerald-500/40 mb-3 text-xs font-mono text-emerald-400">
            <Dna className="w-3.5 h-3.5 text-emerald-400" />
            <span>SA CAPS Grade 12 Syllabus</span>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight flex flex-wrap items-center gap-3">
            <span>🧬 Life Sciences Grade 12</span>
            <span className="text-xs sm:text-sm font-mono font-bold px-3 py-1 bg-[#007A4D] text-white rounded-xl">
              5 Core Strands
            </span>
          </h1>

          <p className="mt-2 text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Select a chapter below for high-yield CAPS revision notes, biological process diagrams, genetics cross templates, and Matric final exam questions.
          </p>
        </div>

        {/* Chapters List */}
        <div className="space-y-3 sm:space-y-4">
          {LIFE_SCIENCES_CHAPTERS.map((ch) => {
            const chapterUrl = `/study-guide/life-sciences-grade-12/${ch.slug}`;

            return (
              <div
                key={ch.id}
                onClick={() => handleNavigate(chapterUrl, 'studyGuideChapter')}
                className="group bg-[#141414] hover:bg-[#1A1A1A] border-2 border-[#262626] hover:border-[#FFD400]/50 rounded-2xl p-4 sm:p-5 transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#007A4D] text-white font-black flex items-center justify-center text-sm shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    {ch.chapterNumber}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-[#FFD400] transition-colors">
                        Chapter {ch.chapterNumber}: {ch.title}
                      </h2>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 max-w-2xl leading-relaxed">
                      {ch.summary}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] font-mono text-slate-400">
                      <span className="text-emerald-400">{ch.strand}</span>
                      <span>&bull;</span>
                      <span>{ch.marksEst}</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
                  <span className="text-xs font-bold text-[#FFD400] group-hover:underline">
                    Study Chapter
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#262626] group-hover:bg-[#FFD400] text-slate-300 group-hover:text-black flex items-center justify-center transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LifeSciencesGrade12Page;
