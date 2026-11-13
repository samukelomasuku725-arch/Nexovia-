/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN LEGAL & COMPLIANCE MODAL
 * Covers: /about, /pricing, /contact, /terms, /privacy, /refund
 * Designed for CPA, POPIA, and Paystack merchant approval requirements.
 */

import React from 'react';
import { X, ShieldCheck, FileText, Lock, RefreshCcw, DollarSign, Mail, Phone, MapPin } from 'lucide-react';

export type LegalDocType = 'about' | 'pricing' | 'contact' | 'terms' | 'privacy' | 'refund';

interface LegalPagesModalProps {
  isOpen: boolean;
  docType: LegalDocType;
  onClose: () => void;
  onSelectDoc: (doc: LegalDocType) => void;
}

export const LegalPagesModal: React.FC<LegalPagesModalProps> = ({
  isOpen,
  docType,
  onClose,
  onSelectDoc
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl max-h-[85vh] bg-[#141414] border border-[#fbbf24]/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white">
        
        {/* Header Tabs */}
        <div className="p-4 sm:p-5 border-b border-[#262626] flex items-center justify-between gap-2 bg-[#1a1a1a]">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-1">
            {[
              { id: 'about', label: 'About Us' },
              { id: 'pricing', label: 'Pricing' },
              { id: 'contact', label: 'Contact' },
              { id: 'terms', label: 'Terms' },
              { id: 'privacy', label: 'Privacy' },
              { id: 'refund', label: 'Refund Policy' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => onSelectDoc(t.id as LegalDocType)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  docType === t.id
                    ? 'bg-[#fbbf24] text-black shadow-xs'
                    : 'text-slate-400 hover:text-white bg-[#262626]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#262626] transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
          
          {docType === 'about' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#fbbf24]">
                <ShieldCheck className="w-6 h-6" />
                <h2 className="text-xl font-bold text-white">About NEXOVIAN</h2>
              </div>
              <p>
                <strong>NEXOVIAN (PTY) LTD</strong> (Registration: 2026/845572/07) is a pioneering South African educational technology institution headquartered in Mpumalanga.
              </p>
              <p>
                Our mission is to eliminate educational inequality through mother-tongue learning. We believe that <em>no child is a slow learner — every child is fast in their own language</em>.
              </p>
              <div className="p-4 rounded-2xl bg-[#1e1e1e] border border-[#333] space-y-2">
                <h3 className="font-bold text-white text-xs uppercase tracking-wider text-[#fbbf24]">Platform Pillars</h3>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>Curriculum aligned with CAPS Grades 4–12, TVET Colleges (N1–N6), and University modules</li>
                  <li>All 11 South African Official Languages supported with native-verified databases</li>
                  <li>Controlled native vocabulary: strictly no invented translations</li>
                  <li>Offline progressive web application (PWA) capability for data-constrained communities</li>
                </ul>
              </div>
            </div>
          )}

          {docType === 'pricing' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#fbbf24]">
                <DollarSign className="w-6 h-6" />
                <h2 className="text-xl font-bold text-white">Transparent Pricing</h2>
              </div>
              <p>
                NEXOVIAN provides affordable, all-inclusive academic access for every learner in South Africa:
              </p>
              <div className="p-5 rounded-2xl bg-[#1e1e1e] border-2 border-[#fbbf24] text-center space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-[#fbbf24]">Standard Subscription</span>
                <div className="text-3xl font-black text-white">R60 <span className="text-sm font-normal text-slate-400">/ 30 Days</span></div>
                <p className="text-xs text-slate-300">
                  Full unlimited access to all 11 languages, Grade 4 to University subjects, past papers with memos, and the Socratic AI Tutor.
                </p>
              </div>
              <ul className="text-xs space-y-1.5 text-slate-400 list-disc pl-5">
                <li>No hidden fees or unexpected debit orders.</li>
                <li>Instant automatic unlocking with one-time verification code.</li>
                <li>Active for 30 consecutive calendar days from activation date.</li>
              </ul>
            </div>
          )}

          {docType === 'contact' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#fbbf24]">
                <Mail className="w-6 h-6" />
                <h2 className="text-xl font-bold text-white">Contact &amp; Customer Support</h2>
              </div>
              <p>We are available to assist students, parents, and educators 7 days a week:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-[#1e1e1e] border border-[#333] space-y-1">
                  <div className="flex items-center gap-2 text-[#fbbf24] font-bold">
                    <Phone className="w-4 h-4" />
                    <span>WhatsApp &amp; Tel</span>
                  </div>
                  <p className="text-white">+27 63 650 8381</p>
                  <p className="text-slate-400">Direct instant assistance for unlock codes</p>
                </div>

                <div className="p-4 rounded-xl bg-[#1e1e1e] border border-[#333] space-y-1">
                  <div className="flex items-center gap-2 text-[#fbbf24] font-bold">
                    <Mail className="w-4 h-4" />
                    <span>Email Inquiries</span>
                  </div>
                  <p className="text-white">samukelomasuku725@gmail.com</p>
                  <p className="text-slate-400">admin@nexovian.group</p>
                </div>

                <div className="p-4 rounded-xl bg-[#1e1e1e] border border-[#333] space-y-1 sm:col-span-2">
                  <div className="flex items-center gap-2 text-[#fbbf24] font-bold">
                    <MapPin className="w-4 h-4" />
                    <span>Registered Office</span>
                  </div>
                  <p className="text-white">NEXOVIAN (PTY) LTD, Mpumalanga, South Africa</p>
                  <p className="text-slate-400">Company Registration No: 2026/845572/07</p>
                </div>
              </div>
            </div>
          )}

          {docType === 'terms' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-2 text-[#fbbf24]">
                <FileText className="w-5 h-5" />
                <h2 className="text-lg font-bold text-white">Terms and Conditions</h2>
              </div>
              <p>
                By accessing or using the NEXOVIAN platform, you agree to be bound by these Terms of Service in compliance with the laws of the Republic of South Africa.
              </p>
              <h3 className="font-bold text-white text-sm">1. Educational Services</h3>
              <p>
                NEXOVIAN provides digital study guides, interactive Socratic lessons, and past exam reviews. All materials are intended for study preparation and do not replace official examination registration with the Department of Basic Education or DHET.
              </p>
              <h3 className="font-bold text-white text-sm">2. One-Time Code Use</h3>
              <p>
                Each unlock code (format NEX-XXXXXX) is strictly single-use and non-transferable. Once entered, the code activates 30 days of full access.
              </p>
              <h3 className="font-bold text-white text-sm">3. Acceptable Use</h3>
              <p>
                Users agree not to scrape, redistribute, or reverse engineer any native linguistic datasets or curriculum materials without express written authorization.
              </p>
            </div>
          )}

          {docType === 'privacy' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-2 text-[#fbbf24]">
                <Lock className="w-5 h-5" />
                <h2 className="text-lg font-bold text-white">Privacy Policy (POPIA Compliant)</h2>
              </div>
              <p>
                NEXOVIAN is committed to safeguarding your personal information in accordance with the Protection of Personal Information Act (POPIA).
              </p>
              <h3 className="font-bold text-white text-sm">1. Information We Collect</h3>
              <p>
                We collect your phone number, email address, chosen grade, and preferred language exclusively to deliver customized curriculum lessons and maintain active subscriptions.
              </p>
              <h3 className="font-bold text-white text-sm">2. Data Security</h3>
              <p>
                We do not sell, rent, or distribute personal information to third-party marketing companies. Financial transactions are processed via secure verified payment gateways.
              </p>
            </div>
          )}

          {docType === 'refund' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#fbbf24]">
                <RefreshCcw className="w-6 h-6" />
                <h2 className="text-xl font-bold text-white">Refund and Cancellation Policy</h2>
              </div>
              <p>
                In compliance with the South African Consumer Protection Act (CPA):
              </p>
              <div className="p-4 rounded-2xl bg-[#1e1e1e] border border-[#fbbf24]/50 space-y-2">
                <h3 className="font-bold text-[#fbbf24] text-xs uppercase tracking-wider">7-Day Money-Back Guarantee</h3>
                <p className="text-xs text-slate-300">
                  If you experience any technical difficulties or are unsatisfied with your subscription, you may request a full refund within 7 calendar days of your payment.
                </p>
              </div>
              <h3 className="font-bold text-white text-sm">How to Request a Refund:</h3>
              <p className="text-xs">
                Contact our support team on WhatsApp at <strong>+27 63 650 8381</strong> or via email at <strong>samukelomasuku725@gmail.com</strong> with your account email and Paystack payment reference. Approved refunds are processed to your original payment method within 3–5 business days.
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#262626] flex items-center justify-between text-xs text-slate-500 bg-[#1a1a1a]">
          <span>NEXOVIAN (PTY) LTD • Reg: 2026/845572/07</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#262626] hover:bg-[#333] text-white font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
