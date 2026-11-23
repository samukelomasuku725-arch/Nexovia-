/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN TEXTBOOKS LIBRARY PAGE (/textbooks)
 * ENGLISH ONLY • 100% FREE • 100% Nexovian Original • Read Online Only
 * Translations are only shown inside individual textbook chapter pages after selecting a language.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Globe,
  Home,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  ThumbsUp
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { TEXTBOOKS_CATALOG, TextbookCatalogItem } from '../../data/textbooksLibraryData';

const PAGE_TITLE = 'FREE Nexovian Textbooks Library in 11 Languages | Learn in Your Language';
const PAGE_META_DESC =
  'Browse the FREE Nexovian Textbooks Library. Read original Nexovian NCV Office Administration, Electrical Trade Theory, NCV Tourism, NCV IT & Computer Science, and NCV Finance, Economics & Accounting textbooks online.';

const VOTES_STORAGE_KEY = 'nexovian_textbook_votes_v1';

export const TextbooksLibraryPage: React.FC = () => {
  const { setCurrentTab } = useLearning();

  const [searchQuery, setSearchQuery] = useState('');
  const [votedIds, setVotedIds] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const raw = localStorage.getItem(VOTES_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const voteSectionRef = useRef<HTMLElement | null>(null);

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
      | 'ncvOfficeAdminTextbook'
      | 'electricalTextbook'
      | 'ncvTourismTextbook'
      | 'ncvItTextbook'
      | 'ncvFinanceTextbook'
      | 'ncvEconomicEnvironmentTextbook'
      | 'ncvMarketingTextbook',
    path: string
  ) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentTab(tab);
  };

  const handleVote = (id: string) => {
    setVotedIds((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(VOTES_STORAGE_KEY, JSON.stringify(next));
        } catch {
          // Ignore storage errors
        }
      }
      return next;
    });
  };

  const filteredBooks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return TEXTBOOKS_CATALOG;
    return TEXTBOOKS_CATALOG.filter((book) => {
      return (
        book.subjectEn.toLowerCase().includes(q) ||
        book.levelBadge.toLowerCase().includes(q) ||
        book.description.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  const comingSoonBooks = useMemo(
    () => TEXTBOOKS_CATALOG.filter((b) => b.status === 'COMING_SOON'),
    []
  );

  const renderCard = (book: TextbookCatalogItem) => {
    const isLive = book.status === 'LIVE';
    const isInProgress = book.status === 'IN_PROGRESS';
    const hasReadableBook = isLive || isInProgress;
    const isVoted = Boolean(votedIds[book.id]);
    const voteTotal = book.initialVotes + (isVoted ? 1 : 0);
    const liveHref = book.href || '/textbooks/ncv-office-administration-textbook';
    const targetTab =
      book.targetTab ||
      (book.id === 'electrical-trade-theory'
        ? 'electricalTextbook'
        : book.id === 'ncv-tourism'
          ? 'ncvTourismTextbook'
          : book.id === 'ncv-it-computer-science'
            ? 'ncvItTextbook'
            : book.id === 'ncv-finance-economics-accounting'
              ? 'ncvFinanceTextbook'
              : book.id === 'ncv-economic-environment'
                ? 'ncvEconomicEnvironmentTextbook'
                : book.id === 'ncv-marketing'
                  ? 'ncvMarketingTextbook'
                  : 'ncvOfficeAdminTextbook');

    return (
      <article
        key={book.id}
        className={`rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-5 transition-all ${
          hasReadableBook
            ? 'bg-[#0D1E42] border-2 border-[#FFD400] shadow-[#FFD400]/15'
            : 'bg-[#0D1E42] border border-[#1E3A6E] hover:border-slate-500/70'
        }`}
      >
        <div className="space-y-3">
          {/* Status + Level Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                isLive
                  ? 'bg-emerald-500/20 border border-emerald-400/60 text-emerald-300'
                  : isInProgress
                    ? 'bg-amber-500/20 border border-amber-400/60 text-amber-200'
                    : 'bg-[#061128] border border-[#1E3A6E] text-slate-300'
              }`}
            >
              {isLive
                ? '✅ LIVE'
                : isInProgress
                  ? book.statusBadge || 'IN PROGRESS - 3/10 LIVE'
                  : '🔜 COMING SOON'}
            </span>

            <span className="px-3 py-1 rounded-full bg-[#061128] border border-[#FFD400]/40 text-[#FFD400] font-mono text-xs font-bold">
              {book.levelBadge}
            </span>
          </div>

          {/* English Card Title Only */}
          <h2 className="font-display font-black text-lg sm:text-xl text-white leading-snug">
            {book.subjectEn}
          </h2>

          {/* English Card Description Only */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{book.description}</p>

          {/* Chapters Count + Votes Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#061128] border border-[#1E3A6E] text-xs font-mono font-bold text-slate-200">
              <BookOpen className="w-3.5 h-3.5 text-[#FFD400]" />
              <span>{book.chaptersCount} Chapters</span>
            </span>
            {!isLive && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#061128] border border-[#1E3A6E] text-xs font-mono text-slate-300">
                <ThumbsUp className="w-3 h-3 text-[#FFD400]" />
                <span>{voteTotal} votes</span>
              </span>
            )}
          </div>
        </div>

        {/* English Action Button */}
        <div>
          {hasReadableBook ? (
            <a
              href={liveHref}
              onClick={(e) => {
                e.preventDefault();
                navigate(targetTab, liveHref);
              }}
              className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-sm shadow-lg transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>{book.ctaLabel || 'Read FREE'}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </a>
          ) : (
            <button
              type="button"
              onClick={() => handleVote(book.id)}
              className={`w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                isVoted
                  ? 'bg-emerald-600/25 border border-emerald-400/60 text-emerald-200'
                  : 'bg-[#1A2947] hover:bg-[#23365B] border border-slate-500/50 text-slate-200'
              }`}
            >
              <ThumbsUp className="w-4 h-4 shrink-0" />
              <span>{isVoted ? `Voted ✓ (${voteTotal})` : 'Coming Soon - Vote for Next'}</span>
            </button>
          )}
        </div>
      </article>
    );
  };

  return (
    <div
      onCopy={(e) => e.preventDefault()}
      className="min-h-screen bg-gradient-to-b from-[#061128] via-[#0A1F44] to-[#050D1E] text-white py-6 sm:py-8 px-4 sm:px-6 lg:px-8 overflow-x-hidden select-none"
    >
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {/* Top Navigation — ENGLISH ONLY */}
        <nav aria-label="Textbooks Library Navigation" className="flex flex-wrap items-center justify-between gap-3">
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
            href="/textbooks/ncv-office-administration-textbook"
            onClick={(e) => {
              e.preventDefault();
              navigate('ncvOfficeAdminTextbook', '/textbooks/ncv-office-administration-textbook');
            }}
            className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black text-xs font-black transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>Read FREE</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </a>
        </nav>

        {/* TOP HERO & SEARCH SECTION — ENGLISH ONLY */}
        <section className="bg-[#0D1E42] border-2 border-[#FFD400]/55 rounded-3xl p-6 sm:p-9 shadow-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD400]/15 border border-[#FFD400]/50 text-[#FFD400] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>NEXOVIAN TEXTBOOK LIBRARY • 100% FREE • READ ONLINE ONLY</span>
          </div>

          <div className="space-y-2.5">
            <h1 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight break-words">
              Nexovian Textbook Library — FREE Textbooks Library
            </h1>
            <p className="text-base sm:text-xl font-bold text-[#FFD400] leading-relaxed">
              Learn in your language. 100% FREE. 100% Nexovian Original. Read Online Only.
            </p>
            <p className="text-xs sm:text-sm text-slate-300">
              Open any FREE textbook below to choose your preferred language (all 11 official languages available inside chapter content).
            </p>
          </div>

          {/* Search Bar — ENGLISH ONLY */}
          <div className="relative max-w-2xl">
            <Search className="w-5 h-5 text-[#FFD400] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your textbook... e.g. Office Admin, Electrical, Tourism, IT"
              aria-label="Search your textbook"
              className="w-full min-h-[52px] pl-12 pr-4 py-3 rounded-2xl bg-[#061128] border-2 border-[#1E3A6E] focus:border-[#FFD400] text-white text-sm sm:text-base placeholder:text-slate-400 focus:outline-none transition-colors select-text"
            />
          </div>
        </section>

        {/* 10 TEXTBOOK CARDS GRID — ENGLISH ONLY */}
        <section aria-label="Nexovian Textbooks Catalog">
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredBooks.map(renderCard)}
            </div>
          ) : (
            <div className="bg-[#0D1E42] border border-[#1E3A6E] rounded-3xl p-8 text-center space-y-4">
              <p className="text-sm sm:text-base font-bold text-slate-200">
                No textbook matched your search.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-xs sm:text-sm cursor-pointer"
              >
                Show All Textbooks
              </button>
            </div>
          )}
        </section>

        {/* VOTE FOR NEXT TEXTBOOK — ENGLISH ONLY */}
        <section
          ref={voteSectionRef}
          className="bg-[#0D1E42] border border-[#FFD400]/50 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5"
        >
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
              <ThumbsUp className="w-4 h-4 shrink-0" />
              <span>Vote for Next Textbook</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
              Vote for Next Textbook
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Click any subject below to vote for the next Nexovian Original textbook release:
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {comingSoonBooks.map((book) => {
              const isVoted = Boolean(votedIds[book.id]);
              const count = book.initialVotes + (isVoted ? 1 : 0);
              return (
                <button
                  key={`vote-${book.id}`}
                  type="button"
                  onClick={() => handleVote(book.id)}
                  className={`min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    isVoted
                      ? 'bg-[#FFD400] text-black font-black shadow-md'
                      : 'bg-[#061128] text-slate-200 border border-[#1E3A6E] hover:border-[#FFD400] hover:text-[#FFD400]'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5 shrink-0" />
                  <span>{book.subjectEn}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-mono ${
                      isVoted ? 'bg-black/15 text-black' : 'bg-[#0D1E42] text-[#FFD400]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* WHY NEXOVIAN TEXTBOOKS? (3 POINTS) — ENGLISH ONLY */}
        <section className="space-y-4">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#FFD400]">
            Why Nexovian Textbooks?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#0D1E42] border border-[#1E3A6E] rounded-3xl p-6 space-y-2.5 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-[#FFD400]/15 border border-[#FFD400]/50 flex items-center justify-center text-[#FFD400]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-display font-black text-lg text-white">100% FREE</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Read original Nexovian chapters online at zero cost with no barriers.
              </p>
            </div>

            <div className="bg-[#0D1E42] border border-[#1E3A6E] rounded-3xl p-6 space-y-2.5 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-[#FFD400]/15 border border-[#FFD400]/50 flex items-center justify-center text-[#FFD400]">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-display font-black text-lg text-white">11 Official Languages</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Switch inside each textbook across Xitsonga, Sepedi, isiZulu, Tshivenda, Sesotho, Setswana, Siswati, isiNdebele, isiXhosa, Afrikaans &amp; English.
              </p>
            </div>

            <div className="bg-[#0D1E42] border border-[#1E3A6E] rounded-3xl p-6 space-y-2.5 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-[#FFD400]/15 border border-[#FFD400]/50 flex items-center justify-center text-[#FFD400]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-display font-black text-lg text-white">
                AI Tutor in Your Language
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Ask questions directly from any chapter and get step-by-step explanations in your selected home language.
              </p>
            </div>
          </div>
        </section>

        {/* BOTTOM NAVIGATION / INTERNAL LINKS — ENGLISH ONLY */}
        <section className="bg-[#0D1E42] border border-[#1E3A6E] rounded-3xl p-6 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FFD400]">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Explore Nexovian</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('landing', '/');
              }}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl bg-[#061128] hover:bg-[#132959] border border-[#1E3A6E] hover:border-[#FFD400] text-slate-100 hover:text-[#FFD400] font-bold text-xs sm:text-sm cursor-pointer"
            >
              <span>Homepage — nexovian.group</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="/textbooks/ncv-office-administration-textbook"
              onClick={(e) => {
                e.preventDefault();
                navigate('ncvOfficeAdminTextbook', '/textbooks/ncv-office-administration-textbook');
              }}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-xs sm:text-sm cursor-pointer"
            >
              <span>NCV Office Administration Textbook — Read FREE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="/textbooks/electrical-trade-theory-textbook"
              onClick={(e) => {
                e.preventDefault();
                navigate('electricalTextbook', '/textbooks/electrical-trade-theory-textbook');
              }}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-xs sm:text-sm cursor-pointer"
            >
              <span>Electrical Trade Theory Textbook — Read FREE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="/textbooks/ncv-tourism-textbook"
              onClick={(e) => {
                e.preventDefault();
                navigate('ncvTourismTextbook', '/textbooks/ncv-tourism-textbook');
              }}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-xs sm:text-sm cursor-pointer"
            >
              <span>NCV Tourism Textbook — Read FREE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="/textbooks/ncv-it-computer-science-textbook"
              onClick={(e) => {
                e.preventDefault();
                navigate('ncvItTextbook', '/textbooks/ncv-it-computer-science-textbook');
              }}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-xs sm:text-sm cursor-pointer"
            >
              <span>NCV IT &amp; Computer Science Textbook — Read FREE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="/textbooks/ncv-finance-economics-accounting-textbook"
              onClick={(e) => {
                e.preventDefault();
                navigate('ncvFinanceTextbook', '/textbooks/ncv-finance-economics-accounting-textbook');
              }}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-xs sm:text-sm cursor-pointer"
            >
              <span>NCV Finance, Economics &amp; Accounting Textbook — Read FREE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="/textbooks/ncv-economic-environment-textbook"
              onClick={(e) => {
                e.preventDefault();
                navigate('ncvEconomicEnvironmentTextbook', '/textbooks/ncv-economic-environment-textbook');
              }}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-xs sm:text-sm cursor-pointer"
            >
              <span>NCV Economic Environment Textbook — Read FREE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="/textbooks/ncv-marketing-textbook"
              onClick={(e) => {
                e.preventDefault();
                navigate('ncvMarketingTextbook', '/textbooks/ncv-marketing-textbook');
              }}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-xs sm:text-sm cursor-pointer"
            >
              <span>NCV Marketing Textbook — Read FREE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* COPYRIGHT FOOTER — ENGLISH ONLY */}
        <footer className="bg-[#071530] border border-[#FFD400]/40 rounded-3xl p-6 space-y-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
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

export default TextbooksLibraryPage;
