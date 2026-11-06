/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN FOOTER — DAY 1 DARK GOLD THEME
 * Includes compliance & legal navigation links for Paystack merchant approval:
 * - /about (About Us)
 * - /pricing (Pricing)
 * - /contact (Contact Support)
 * - /terms (Terms and Conditions)
 * - /privacy (Privacy Policy)
 * - /refund (Refund and Cancellation Policy)
 */

import React, { useState } from 'react';
import { useLearning } from '../../context/LearningContext';
import { useTranslation } from '../../i18n/I18nContext';
import { APP_CONFIG } from '../../config/brand';
import { LogoIcon } from '../common/LogoIcon';
import { LegalPagesModal, LegalDocType } from '../legal/LegalPagesModal';
import { ShieldCheck, Lock, RefreshCcw, DollarSign, Mail, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentTab, setIsPwaPromptOpen } = useLearning();
  const { t } = useTranslation();

  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType | null>(null);

  const openLegalModal = (doc: LegalDocType) => {
    setActiveLegalDoc(doc);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', `/${doc}`);
    }
  };

  return (
    <>
      <footer className="mt-20 border-t border-[#262626] bg-[#0a0a0a] text-slate-300 py-10 pb-24 md:pb-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          
          {/* Top Brand & Main Navigation */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#262626]">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <LogoIcon size={32} className="shrink-0" />
                <span className="font-display text-xl font-black tracking-wide text-[#fbbf24]">
                  {APP_CONFIG.appName}
                </span>
              </div>
              <p className="text-xs font-semibold text-[#fbbf24] font-mono">
                The Learning Brain That Grows With You
              </p>
              <p className="text-[11px] text-slate-400 mt-1 max-w-md">
                NEXOVIAN (PTY) LTD • Registration: 2026/845572/07 • Level 1 B-BBEE
              </p>
            </div>

            {/* Academic Pathways Navigation */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-medium text-slate-400">
              <button
                onClick={() => setCurrentTab('school')}
                className="hover:text-[#fbbf24] transition-colors cursor-pointer"
              >
                School (CAPS)
              </button>
              <button
                onClick={() => setCurrentTab('tvet')}
                className="hover:text-[#fbbf24] transition-colors cursor-pointer"
              >
                TVET Colleges
              </button>
              <button
                onClick={() => setCurrentTab('higherEd')}
                className="hover:text-[#fbbf24] transition-colors cursor-pointer"
              >
                University
              </button>
              <button
                onClick={() => setCurrentTab('tutor')}
                className="hover:text-[#fbbf24] transition-colors cursor-pointer text-[#fbbf24] font-bold"
              >
                AI Socratic Tutor
              </button>
              <button
                onClick={() => setCurrentTab('papers')}
                className="hover:text-[#fbbf24] transition-colors cursor-pointer"
              >
                Past Papers
              </button>
              <button
                onClick={() => setIsPwaPromptOpen(true)}
                className="text-[#fbbf24] font-bold hover:underline cursor-pointer"
              >
                Install App
              </button>
            </div>
          </div>

          {/* Compliance & Paystack Approval Legal Links Grid */}
          <div className="pt-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-3">
              Legal, Compliance &amp; Consumer Protection
            </span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
              <button
                onClick={() => openLegalModal('about')}
                className="hover:text-[#fbbf24] text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span>About Us (/about)</span>
              </button>

              <button
                onClick={() => openLegalModal('pricing')}
                className="hover:text-[#fbbf24] text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <DollarSign className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span>Pricing (/pricing)</span>
              </button>

              <button
                onClick={() => openLegalModal('contact')}
                className="hover:text-[#fbbf24] text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span>Contact (/contact)</span>
              </button>

              <button
                onClick={() => openLegalModal('terms')}
                className="hover:text-[#fbbf24] text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span>Terms of Service (/terms)</span>
              </button>

              <button
                onClick={() => openLegalModal('privacy')}
                className="hover:text-[#fbbf24] text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span>Privacy Policy (/privacy)</span>
              </button>

              <button
                onClick={() => openLegalModal('refund')}
                className="hover:text-[#fbbf24] text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer font-bold text-[#fbbf24]"
              >
                <RefreshCcw className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span>Refund Policy (/refund)</span>
              </button>
            </div>
          </div>

          {/* South African Curriculum Notice */}
          <div className="py-3 text-[11px] text-slate-500 leading-relaxed border-t border-[#262626]">
            <p>
              <strong>Curriculum Framework Notice:</strong> Aligned with the South African National Curriculum Statement (CAPS) Grades 4–12, TVET DHET NATED programmes, and University frameworks across all 11 official languages.
            </p>
          </div>

          {/* Bottom Copyright & Badges */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3 border-t border-[#262626]">
            <p>© {new Date().getFullYear()} NEXOVIAN (PTY) LTD · Reg: 2026/845572/07 · All rights reserved.</p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#fbbf24]">
              <span>Grade 4–Varsity</span>
              <span aria-hidden="true" className="text-slate-600">|</span>
              <span>11 Official Languages</span>
              <span aria-hidden="true" className="text-slate-600">|</span>
              <span>R60 / 30 Days</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Compliance Modal */}
      {activeLegalDoc && (
        <LegalPagesModal
          isOpen={!!activeLegalDoc}
          docType={activeLegalDoc}
          onClose={() => setActiveLegalDoc(null)}
          onSelectDoc={(doc) => setActiveLegalDoc(doc)}
        />
      )}
    </>
  );
};

export default Footer;
