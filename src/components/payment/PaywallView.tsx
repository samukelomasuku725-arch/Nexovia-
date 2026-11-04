/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN PAYWALL VIEW (/paywall)
 * Design: Deep Navy #0A1F44, Green #007A4D, Gold #FFB612, Sky Blue #1E88E5, Orange #FF6B35.
 * 
 * Flow:
 * - Button 1 Green: "Pay R60 with SnapScan - 30 Days" -> https://pos.snapscan.io/qr/NKJJYpV6 (new tab)
 * - Text under: "Step 1: Pay R60 on SnapScan. Step 2: Come back here, enter your phone + SnapScan reference to get your code instantly."
 * - Form: Phone Number + SnapScan Reference + Email + Button "Get My Unlock Code"
 * - On submit -> POST /api/generate-code:
 *   a) Validate phone (10 digits) and reference not empty
 *   b) Auto-generate UNIQUE code NEX-XXXXXX
 *   c) Save to DB status='unused', phone, email, reference
 *   d) Show success screen INSTANTLY on same page: Big Gold box: "YOUR UNLOCK CODE IS: NEX-482910" + Button [Copy Code] + Text "Write it down. Use once only. Valid 30 days after use."
 *   e) Button below: "Enter Code to Unlock" -> /unlock
 * - Help only: Small link at bottom: "Need help? WhatsApp 063 650 8381"
 */

import React, { useState, useEffect } from 'react';
import {
  Lock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  QrCode,
  ExternalLink,
  Copy,
  Check,
  Clock,
  Layers,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { checkAccess, generateUnlockCodeApi } from '../../services/snapscanSubscriptionService';

const SNAPSCAN_URL = 'https://pos.snapscan.io/qr/NKJJYpV6';
const WHATSAPP_URL = 'https://wa.me/27636508381?text=Hi%20Nexovian%2C%20I%20have%20a%20question%20about%20my%20unlock%20code';

export const PaywallView: React.FC = () => {
  const { user } = useAuth();
  const { setCurrentTab } = useLearning();

  const [phone, setPhone] = useState('');
  const [reference, setReference] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [reason, setReason] = useState<string>('subscription_expired');

  useEffect(() => {
    // If user already has active 30-day access, skip to home
    const status = checkAccess(user);
    if (status.allow) {
      setCurrentTab('home');
      return;
    }

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const r = params.get('reason');
      if (r) setReason(r);
    }
  }, [user, setCurrentTab]);

  const handlePayClick = () => {
    window.open(SNAPSCAN_URL, '_blank');
  };

  const handleGenerateCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanPhone = phone.trim();
    const cleanRef = reference.trim();

    if (!cleanPhone || cleanPhone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit phone number (e.g. 0821234567).');
      return;
    }

    if (!cleanRef || cleanRef.length < 2) {
      setErrorMessage('Please enter your SnapScan reference or receipt number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await generateUnlockCodeApi({
        phone: cleanPhone,
        reference: cleanRef,
        email: email.trim() || user?.email
      });

      if (!result.success || !result.code) {
        setErrorMessage(result.message || 'Failed to generate code. Please verify details.');
      } else {
        setGeneratedCode(result.code);
        // Save temporary generated code for easy auto-fill on /unlock
        if (typeof window !== 'undefined') {
          localStorage.setItem('nexovian_last_generated_code', result.code);
          localStorage.setItem('nexovian_last_phone', cleanPhone);
        }
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error communicating with server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = async () => {
    if (!generatedCode) return;
    try {
      await navigator.clipboard.writeText(generatedCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch (_) {
      setIsCopied(true);
    }
  };

  const navigateToUnlock = () => {
    setCurrentTab('unlock');
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/unlock');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1F44] text-white font-sans antialiased selection:bg-[#FFB612] selection:text-black py-10 px-4 sm:px-6 flex flex-col justify-between">
      
      {/* Top Bar */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between pb-6 border-b border-white/10">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => {
            setCurrentTab('landing');
            if (typeof window !== 'undefined') window.history.pushState({}, '', '/');
          }}
        >
          <div className="w-10 h-10 rounded-full bg-[#FFB612] text-black font-black flex items-center justify-center text-lg shadow-lg">
            N
          </div>
          <div>
            <span className="font-display font-black text-xl tracking-wider text-white block leading-tight">
              NEXOVIAN
            </span>
            <span className="text-[10px] text-[#FFB612] font-mono uppercase tracking-wider">
              The Learning Brain
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={navigateToUnlock}
            className="px-3.5 py-1.5 rounded-full border border-[#FFB612]/50 text-[#FFB612] hover:bg-[#FFB612]/10 text-xs font-bold transition-colors cursor-pointer"
          >
            Have a code? Unlock &rarr;
          </button>
          <button
            onClick={() => {
              setCurrentTab('landing');
              if (typeof window !== 'undefined') window.history.pushState({}, '', '/');
            }}
            className="text-xs font-bold text-white/70 hover:text-white transition-colors"
          >
            &larr; Home
          </button>
        </div>
      </div>

      {/* Main Content Box */}
      <main className="max-w-xl mx-auto w-full my-auto py-8">
        
        {/* Expiration or lock notice banner if applicable */}
        {reason === 'subscription_expired' && !generatedCode && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-500/15 border border-amber-400 text-amber-200 text-xs flex items-center gap-3 shadow-lg">
            <Clock className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <strong className="block font-bold">Your 30-day access has expired.</strong>
              <span>Pay R60 on SnapScan below to get your new unlock code instantly.</span>
            </div>
          </div>
        )}

        <div className="bg-[#000000] border-2 border-[#007A4D] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center pb-6 border-b border-white/10">
            <div className="w-16 h-16 rounded-full bg-[#007A4D]/20 border-2 border-[#007A4D] text-[#007A4D] flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Lock className="w-8 h-8 text-[#007A4D]" />
            </div>

            <div className="inline-block px-3.5 py-1 rounded-full bg-[#FFB612]/20 border border-[#FFB612]/40 text-[#FFB612] text-xs font-mono font-bold uppercase mb-2">
              R60 FOR 30 DAYS &bull; ONE CODE, ONE USE
            </div>

            <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              Unlock Full App &mdash; R60
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-white/70 max-w-md mx-auto">
              30 days full access &mdash; All grades (Grade 4 to University), all subjects, all 11 languages
            </p>
          </div>

          {/* Value Checklist */}
          <div className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/90 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#007A4D] shrink-0" />
              <span>Grade 4 to University CAPS</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#007A4D] shrink-0" />
              <span>All 11 Official SA Languages</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#007A4D] shrink-0" />
              <span>4,000+ DBE Past Papers &amp; Memos</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#007A4D] shrink-0" />
              <span>Instant AI Homework &amp; Memo Tutor</span>
            </div>
          </div>

          {/* SUCCESS SCREEN: BIG GOLD BOX (Generated code) */}
          {generatedCode ? (
            <div className="pt-6 text-center space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-[#007A4D] text-white flex items-center justify-center mx-auto font-black text-2xl shadow-lg">
                ✓
              </div>

              <h2 className="font-display font-black text-2xl text-white">
                Code Generated Automatically!
              </h2>

              {/* Big Gold Box */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#FFB612] to-amber-500 text-black shadow-2xl border-4 border-yellow-300 relative overflow-hidden">
                <span className="text-xs font-mono font-black uppercase tracking-widest text-black/70 block mb-1.5">
                  YOUR ONE-TIME UNLOCK CODE IS:
                </span>

                <div className="text-3xl sm:text-4xl font-mono font-black tracking-wider my-3 select-all bg-black/10 py-3 px-4 rounded-2xl border border-black/15">
                  {generatedCode}
                </div>

                <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-black text-[#FFB612] hover:bg-slate-900 font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-transform active:scale-95"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Code Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="mt-3.5 text-xs text-black/80 font-bold leading-relaxed">
                  Write it down. Use once only. Valid for 30 days after use.
                </p>
              </div>

              {/* Button Below: Enter Code to Unlock -> /unlock */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={navigateToUnlock}
                  className="w-full py-4 rounded-2xl bg-[#007A4D] hover:bg-emerald-600 text-white font-black text-base shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01] active:scale-95"
                >
                  <span>Enter Code to Unlock &rarr;</span>
                </button>
              </div>

              <div className="text-xs text-white/60">
                <span>Code already saved for phone: </span>
                <strong className="text-white font-mono">{phone}</strong>
              </div>
            </div>
          ) : (
            /* PAYWALL MAIN FLOW: ONLY 2 BUTTONS + FORM */
            <div className="pt-6 space-y-6">
              
              {/* Button 1 Green: Pay R60 with SnapScan - 30 Days */}
              <div>
                <button
                  type="button"
                  onClick={handlePayClick}
                  className="w-full py-4 rounded-2xl bg-[#007A4D] hover:bg-emerald-600 text-white font-black text-base shadow-xl shadow-emerald-950/40 flex items-center justify-center gap-2.5 cursor-pointer transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center"
                >
                  <QrCode className="w-5 h-5 shrink-0" />
                  <span>Pay R60 with SnapScan &mdash; 30 Days</span>
                  <ExternalLink className="w-4 h-4 opacity-75 shrink-0" />
                </button>

                {/* Text under */}
                <p className="mt-2.5 text-xs text-white/70 text-center font-medium leading-relaxed">
                  Step 1: Pay R60 on SnapScan.<br />
                  Step 2: Come back here, enter your phone + SnapScan reference to get your code instantly.
                </p>
              </div>

              {/* Form: Phone + SnapScan Reference + Email + Button "Get My Unlock Code" */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-[#FFB612]" />
                  <span className="text-xs font-mono font-bold uppercase text-[#FFB612]">
                    Instant In-App Auto Code Generator
                  </span>
                </div>

                {errorMessage && (
                  <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleGenerateCodeSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-white/80 font-bold mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0821234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#FFB612]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-white/80 font-bold mb-1">
                      SnapScan Reference / Receipt Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SNAP-98124 or reference on payment screen"
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#FFB612]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-white/80 font-bold mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="learner@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#FFB612]"
                    />
                  </div>

                  {/* Button 2: Get My Unlock Code */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-[#FFB612] hover:bg-yellow-400 disabled:opacity-50 text-black font-black text-sm sm:text-base shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01] active:scale-95 mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Generating Code...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-black" />
                        <span>Get My Unlock Code</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={navigateToUnlock}
                    className="text-xs text-[#1E88E5] hover:underline font-bold inline-flex items-center gap-1"
                  >
                    <span>Already received your unlock code? Click here to unlock</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Small WhatsApp Help Link at bottom */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-emerald-400 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Need help? WhatsApp 063 650 8381</span>
            </a>
          </div>
        </div>
      </main>

      {/* Trust Badge Footer */}
      <footer className="max-w-4xl mx-auto w-full text-center pt-6 border-t border-white/10 text-xs text-white/60">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-white/80">
            <ShieldCheck className="w-4 h-4 text-[#007A4D]" />
            <span>NEXOVIAN (Pty) Ltd &bull; Reg: 2026/234078/07</span>
          </div>
          <span className="text-[11px] text-white/40">
            100% CAPS Aligned &bull; All 11 Official South African Languages &bull; nexovian.group
          </span>
        </div>
      </footer>
    </div>
  );
};
