/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SOUTH AFRICAN SIGN LANGUAGE (SASL 🤟) LEARNING HUB COMPONENT
 * 
 * 4 Free Resource Sections with Full Credit & Attribution:
 * A) Wits Free eBook: wits.ac.za (Source: Wits University - Free)
 * B) NID Dictionary: 20 words with "Watch Sign" links (Signs by NID - Free - Thank you NID)
 * C) DeafTV YouTube: 3 curated educational videos (Videos by DeafTV SA - Free)
 * D) Book Dash: Handlab.co.za (Stories by Book Dash + Handlab - Free)
 */

import React, { useState } from 'react';
import {
  BookOpen,
  ExternalLink,
  Video,
  Play,
  Heart,
  Search,
  Sparkles,
  Award,
  Globe
} from 'lucide-react';

interface SignWord {
  word: string;
  category: 'Basics' | 'STEM / Maths' | 'School & Learning' | 'Everyday';
  description: string;
  searchUrl: string;
}

const NID_DICTIONARY_WORDS: SignWord[] = [
  { word: 'Hello / Welcome', category: 'Basics', description: 'Open palm wave with friendly smile', searchUrl: 'https://deafnet.co.za/learn-sasl/' },
  { word: 'Thank you', category: 'Basics', description: 'Flat hand touches chin, extends outward', searchUrl: 'https://deafnet.co.za/learn-sasl/' },
  { word: 'Please', category: 'Basics', description: 'Circular rub over the chest with open palm', searchUrl: 'https://deafnet.co.za/learn-sasl/' },
  { word: 'Teacher / Mundyondisi', category: 'School & Learning', description: 'Double pinched hands out from temples', searchUrl: 'https://deafnet.co.za/learn-sasl/' },
  { word: 'Student / Learner', category: 'School & Learning', description: 'Lifting knowledge from open book palm to forehead', searchUrl: 'https://deafnet.co.za/learn-sasl/' },
  { word: 'School', category: 'School & Learning', description: 'Double horizontal clap with flat palms', searchUrl: 'https://deafnet.co.za/learn-sasl/' },
  { word: 'Mathematics', category: 'STEM / Maths', description: 'M-handshapes brushing past each other', searchUrl: 'https://deafnet.co.za/learn-sasl/' },
  { word: 'Science', category: 'STEM / Maths', description: 'Pouring alternating imaginary beakers', searchUrl: 'https://deafnet.co.za/learn-sasl/' },
  { word: 'Calculate / Equals', category: 'STEM / Maths', description: 'Parallel index fingers drawing equal sign', searchUrl: 'https://deafnet.co.za/learn-sasl/' },
  { word: 'Problem / Question', category: 'School & Learning', description: 'Curled fingers tapping to form question mark', searchUrl: 'https://deafnet.co.za/learn-sasl/' },
  { word: 'Understand / I get it', category: 'Basics', description: 'Flick index finger upward by temple with lightbulb motion', searchUrl: 'https://deafnet.co.za/learn-sasl/' },
  { word: 'Don\'t Understand', category: 'Basics', description: 'Index finger flick by temple + gentle headshake', searchUrl: 'https://deafnet.co.za/learn-sasl/' },
  { word: 'Help', category: 'Basics', description: 'Thumbs up on flat palm lifting upward together', searchUrl: 'https://deafnet.co.za/learn-sasl/' },
  { word: 'Book', category: 'School & Learning', description: 'Palms together then opened like a book', searchUrl: 'https://deafnet.co.za/learn-sasl/' },
  { word: 'Computer / Technology', category: 'STEM / Maths', description: 'C-hand moving up the forearm', searchUrl: 'https://deafnet.co.za/learn-sasl/' },
  { word: 'South Africa', category: 'Everyday', description: 'Hand outlines rainbow nation contour', searchUrl: 'https://deafnet.co.za/learn-sasl/' },
  { word: 'Exam / Test', category: 'School & Learning', description: 'Index fingers writing in air followed by checkmark', searchUrl: 'https://deafnet.co.za/learn-sasl/' },
  { word: 'Practice / Homework', category: 'School & Learning', description: 'Fist rubbing top of index finger repeatedly', searchUrl: 'https://deafnet.co.za/learn-sasl/' },
  { word: 'Friend', category: 'Everyday', description: 'Interlocking index fingers together', searchUrl: 'https://deafnet.co.za/learn-sasl/' },
  { word: 'Success / Finished', category: 'Basics', description: 'Double open hands twist outwards in celebration', searchUrl: 'https://deafnet.co.za/learn-sasl/' }
];

const DEAF_TV_VIDEOS = [
  {
    id: '1',
    title: 'SASL ABC & Fingerspelling Fundamentals',
    provider: 'DeafTV SA',
    desc: 'Complete fingerspelling from A-Z with proper facial expressions & South African hand shapes.',
    url: 'https://www.youtube.com/results?search_query=DeafTV+South+African+Sign+Language+Alphabet',
    thumbnail: '🤟 Alphabet A-Z'
  },
  {
    id: '2',
    title: 'Classroom & Academic Signs for CAPS Learners',
    provider: 'DeafTV SA',
    desc: 'Core educational vocabulary: questions, numbers, math symbols, and classroom etiquette.',
    url: 'https://www.youtube.com/results?search_query=DeafTV+SA+classroom+signs',
    thumbnail: '📚 Academic Signs'
  },
  {
    id: '3',
    title: 'STEM & Science Vocabulary in SASL',
    provider: 'DeafTV SA',
    desc: 'Scientific concepts, calculations, biology terms, and experiments explained in native SASL.',
    url: 'https://www.youtube.com/results?search_query=DeafTV+SA+science+mathematics+signs',
    thumbnail: '🔬 STEM & Science'
  }
];

export const SASLResourceHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Basics', 'STEM / Maths', 'School & Learning', 'Everyday'];

  const filteredWords = NID_DICTIONARY_WORDS.filter((item) => {
    const matchesSearch = item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 mb-12 px-4 sm:px-6 space-y-8 animate-in fade-in duration-300">
      
      {/* SASL Official Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#141414] via-[#1a1a1a] to-[#141414] border-2 border-[#fbbf24] shadow-[0_0_35px_rgba(251,191,36,0.15)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#fbbf24] text-black font-black text-3xl flex items-center justify-center shrink-0 shadow-lg">
            🤟
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#fbbf24]/20 text-[#fbbf24] border border-[#fbbf24]/40 text-xs font-mono font-bold uppercase">
                12th Official SA Language
              </span>
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> 100% Free Open Educational Resources
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              South African Sign Language (SASL 🤟) Learning Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Curated free resources for Deaf learners, educators, and hearing allies across all 9 provinces.
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2 text-xs font-mono text-[#fbbf24] bg-[#262626] px-4 py-2 rounded-xl border border-[#333]">
          <Award className="w-4 h-4 text-[#fbbf24]" />
          <span>Strict Non-Profit Free Community Access</span>
        </div>
      </div>

      {/* SECTION A: Wits Free eBook */}
      <div className="p-6 rounded-3xl bg-[#141414] border border-[#2e2e32] hover:border-[#fbbf24]/50 transition-all">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#262626]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  A) Wits University SASL Free eBook &amp; Grammar Guide
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Official academic guides, grammar structures, and cultural notes on South African Sign Language.
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-mono font-bold">
              Source: Wits University - Free
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#1a1a1a] p-4 rounded-2xl border border-[#262626]">
          <p className="text-xs text-slate-300 leading-relaxed">
            Access free learning literature, research papers, and foundational linguistics material hosted by Wits Centre for Deaf Studies.
          </p>
          <a
            href="https://www.wits.ac.za/deaf-studies/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shrink-0 transition-transform active:scale-95 shadow-md cursor-pointer"
          >
            <span>Open Wits eBook Resource</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* SECTION B: NID Dictionary (20 Words) */}
      <div className="p-6 rounded-3xl bg-[#141414] border border-[#2e2e32] hover:border-[#fbbf24]/50 transition-all">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#262626]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#fbbf24]/20 text-[#fbbf24] flex items-center justify-center font-bold">
              🤟
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                B) National Institute for the Deaf (NID) Vocabulary Guide (20 Essential Signs)
              </h3>
              <p className="text-xs text-slate-400">
                Foundational signs for daily classroom communication, STEM, and student life.
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
              Signs by NID - Free - Thank you NID
            </span>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="my-4 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sign word (e.g. Mathematics, Teacher, Science)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1a1a1a] border border-[#333] text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#fbbf24]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-hide py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#fbbf24] text-black'
                    : 'bg-[#1e1e1e] text-slate-400 hover:text-white border border-[#333]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 20 Word Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredWords.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#fbbf24] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-xs font-bold text-white group-hover:text-[#fbbf24] transition-colors">
                    {item.word}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#262626] text-slate-400">
                    {item.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <a
                href={item.searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg bg-[#262626] hover:bg-[#fbbf24] text-slate-300 hover:text-black text-xs font-bold transition-all cursor-pointer"
              >
                <span>Watch Sign</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION C: DeafTV YouTube */}
      <div className="p-6 rounded-3xl bg-[#141414] border border-[#2e2e32] hover:border-[#fbbf24]/50 transition-all">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#262626]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold">
              <Video className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                C) DeafTV SA Video Tutorials (Curated Lessons)
              </h3>
              <p className="text-xs text-slate-400">
                Visual video lessons by native South African Deaf signers and educators.
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-mono font-bold">
              Videos by DeafTV SA - Free
            </span>
          </div>
        </div>

        {/* 3 Video Cards */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {DEAF_TV_VIDEOS.map((vid) => (
            <div
              key={vid.id}
              className="p-4 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] flex flex-col justify-between hover:border-red-500/60 transition-all"
            >
              <div>
                <div className="h-32 rounded-xl bg-gradient-to-br from-red-950/40 via-[#262626] to-black border border-red-500/20 flex flex-col items-center justify-center p-3 text-center mb-3">
                  <Play className="w-8 h-8 text-red-400 mb-1" />
                  <span className="text-xs font-bold text-white">{vid.thumbnail}</span>
                  <span className="text-[10px] text-red-300 font-mono mt-0.5">DeafTV Free Lesson</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1 leading-snug">
                  {vid.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {vid.desc}
                </p>
              </div>

              <a
                href={vid.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                <span>Watch on YouTube / DeafTV</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION D: Book Dash + Handlab */}
      <div className="p-6 rounded-3xl bg-[#141414] border border-[#2e2e32] hover:border-[#fbbf24]/50 transition-all">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#262626]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                D) Book Dash &amp; Handlab Visual Sign Stories
              </h3>
              <p className="text-xs text-slate-400">
                Children&apos;s storybooks adapted into South African Sign Language for reading &amp; literacy.
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
              Stories by Book Dash + Handlab - Free
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#1a1a1a] p-4 rounded-2xl border border-[#262626]">
          <p className="text-xs text-slate-300 leading-relaxed">
            Handlab translates beloved South African storybooks by Book Dash into animated and recorded SASL signed stories so every child can read and learn.
          </p>
          <a
            href="https://handlab.co.za/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 shrink-0 transition-transform active:scale-95 shadow-md cursor-pointer"
          >
            <span>Visit Handlab.co.za</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Bottom Attribution Footer */}
      <div className="text-center pt-2">
        <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5 font-mono">
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          <span>Proudly supporting SASL as the 12th official language of South Africa. All content free and credited to its rightful creators.</span>
        </p>
      </div>

    </div>
  );
};
