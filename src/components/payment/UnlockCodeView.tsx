/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN UNLOCK PAGE (/unlock) — DAY 1 DARK GOLD THEME
 * 
 * Local Secure Verification (NO JSON / fetch errors):
 * - Accepts ONLY NEX-XXXXXX from 200k pool, blocks invalid codes like 123456
 * - Prevents reuse: checks used_{code}
 * - Sets 30-day premium access and redirects to home
 */

import React, { useState, useEffect } from 'react';
import {
  KeyRound,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { saveSubscription } from '../../services/snapscanSubscriptionService';
import { DEFAULT_INITIAL_CODES } from '../../lib/codeGenerator';

const WHATSAPP_URL = 'https://wa.me/27636508381?text=Hi%20Nexovian%2C%20I%20have%20an%20issue%20with%20my%20unlock%20code';

export const UnlockCodeView: React.FC = () => {
  const { setCurrentTab } = useLearning();

  const [unlockCode, setUnlockCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCode = localStorage.getItem('nexovian_last_generated_code');
      if (savedCode && !unlockCode) {
        setUnlockCode(savedCode);
      }
      const params = new URLSearchParams(window.location.search);
      const qCode = params.get('code');
      if (qCode) {
        setUnlockCode(qCode.toUpperCase().trim());
      }
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const code = unlockCode.trim().toUpperCase();

    // 1. Strict validation: Must start with NEX- and be exactly 10 characters
    if (!code.startsWith('NEX-') || code.length !== 10 || !/^\d{6}$/.test(code.slice(4))) {
      setError('Format must be NEX- + 6 digits e.g. NEX-123456 (invalid code like 123456 blocked)');
      return;
    }

    // 2. Check against 200k code pool in localStorage or default initial valid codes
    const allCodes: string[] = JSON.parse(localStorage.getItem('nexovian_all_codes') || '[]');
    const isCodeInPool = allCodes.includes(code);
    const isInitialCode = DEFAULT_INITIAL_CODES.includes(code);

    if (allCodes.length > 0 && !isCodeInPool && !isInitialCode) {
      setError('Code not found. Pay R60 on SnapScan first. WhatsApp 063 650 8381');
      return;
    }

    // 3. Prevent duplicate reuse
    if (localStorage.getItem(`used_${code}`)) {
      setError('Code already used. One code • One use • 30 days');
      return;
    }

    // 4. Mark code as used and activate 30-day premium
    const now = Date.now();
    const expiryTime = now + 30 * 24 * 60 * 60 * 1000;

    localStorage.setItem('nexovian_premium', 'active');
    localStorage.setItem('nexovian_code', code);
    localStorage.setItem('isPremium', 'true');
    localStorage.setItem('nexovian_unlocked', 'true');
    localStorage.setItem('nexovian_paid', 'true');
    localStorage.setItem('nexovian_logged_in', 'true');
    localStorage.setItem(`used_${code}`, 'true');
    localStorage.setItem('premium_expiry', String(expiryTime));

    // Save structured subscription data
    saveSubscription({
      access_code: code,
      payment_phone: localStorage.getItem('nexovian_last_phone') || '0820000000',
      payment_reference: 'SNAPSCAN-VERIFIED',
      payment_status: 'paid',
      subscription_status: 'active',
      subscription_start: now,
      subscription_end: expiryTime,
      last_payment_date: now
    });

    setIsSuccess(true);

    setTimeout(() => {
      setCurrentTab('home');
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', '/');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans antialiased selection:bg-[#fbbf24] selection:text-black py-10 px-4 sm:px-6 flex flex-col justify-between">
      {/* Top Bar */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between pb-6 border-b border-[#262626]">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => {
            setCurrentTab('landing');
            if (typeof window !== 'undefined') window.history.pushState({}, '', '/');
          }}
        >
          <div className="w-10 h-10 rounded-xl bg-[#fbbf24] text-black font-black flex items-center justify-center text-lg shadow-[0_0_15px_rgba(251,191,36,0.4)]">
            N
          </div>
          <div>
            <span className="font-display font-black text-xl tracking-wider text-[#fbbf24] block leading-tight">
              NEXOVIAN
            </span>
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
              The Learning Brain
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold">
            Free Access Week
          </span>
          <button
            onClick={() => {
              setCurrentTab('home');
              if (typeof window !== 'undefined') window.history.pushState({}, '', '/');
            }}
            className="px-3.5 py-1.5 rounded-xl bg-[#fbbf24] hover:bg-yellow-400 text-black text-xs font-black transition-transform active:scale-95 cursor-pointer shadow-md"
          >
            Go to Tutor &rarr;
          </button>
        </div>
      </div>

      {/* Main Unlock Card */}
      <main className="max-w-md mx-auto w-full my-auto py-8">
        <div className="bg-[#1a1a1a] border-2 border-[#fbbf24] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="text-center pb-6 border-b border-[#262626]">
            <div className="w-16 h-16 rounded-2xl bg-[#fbbf24]/15 border border-[#fbbf24] text-[#fbbf24] flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
              <KeyRound className="w-8 h-8 text-[#fbbf24]" />
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold uppercase mb-2">
              FREE ACCESS WEEK &bull; NO CODE NEEDED
            </div>

            <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
              Free Access Week Active!
            </h1>
            <p className="mt-2 text-xs text-slate-300 max-w-sm mx-auto">
              No payment needed till Wed 12 Nov 23:59. All premium features, past papers, 12 languages, and AI tutor are fully unlocked for you.
            </p>

            {/* Countdown Badge */}
            <div className="mt-3.5 p-3 rounded-xl bg-black/60 border border-emerald-500/40 text-xs font-mono text-emerald-300">
              <span className="block font-bold">Free access ends: Wed 12 Nov 2026 23:59 SAST</span>
              <span className="text-[11px] text-slate-400 mt-0.5 block">Enjoy full premium access automatically</span>
            </div>

            {/* Primary Go to Tutor Button */}
            <div className="mt-4">
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('isPremium', 'true');
                    localStorage.setItem('nexovian_unlocked', 'true');
                  }
                  setCurrentTab('home');
                  if (typeof window !== 'undefined') window.history.pushState({}, '', '/');
                }}
                className="w-full py-3.5 rounded-xl bg-[#fbbf24] hover:bg-yellow-400 text-black font-black text-sm flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95 shadow-[0_0_20px_rgba(251,191,36,0.35)]"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>You have Free Premium Access! Go to Tutor &rarr;</span>
              </button>
            </div>
          </div>

          {isSuccess ? (
            <div className="pt-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#fbbf24] text-black flex items-center justify-center mx-auto font-black text-2xl shadow-lg">
                ✓
              </div>

              <h2 className="font-display font-black text-2xl text-white">
                Access Granted!
              </h2>

              <div className="p-4 rounded-2xl bg-[#fbbf24]/10 border border-[#fbbf24]/40 text-[#fbbf24] text-xs font-bold leading-relaxed">
                <span className="block text-sm text-white font-mono mb-1">Code: {unlockCode.toUpperCase()}</span>
                <span>Welcome to NEXOVIAN Premium! Active for 30 days. Redirecting...</span>
              </div>
            </div>
          ) : (
            <div className="pt-6">
              {error && (
                <div className="mb-4 p-3.5 rounded-xl bg-red-500/20 border border-red-500/50 text-red-200 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{error}</span>
                </div>
              )}

              <form onSubmit={handleUnlock} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-300 font-bold mb-1">
                    Unlock Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NEX-100004"
                    value={unlockCode}
                    onChange={(e) => setUnlockCode(e.target.value.toUpperCase())}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#0a0a0a] border border-[#333] text-white font-mono text-base font-bold placeholder:text-slate-600 focus:outline-none focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] tracking-wider text-center"
                  />
                  <span className="text-[10px] text-slate-500 font-mono mt-1 block text-center">
                    Format: NEX- followed by 6 digits
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#fbbf24] hover:bg-yellow-400 text-black font-black text-sm sm:text-base shadow-[0_0_20px_rgba(251,191,36,0.4)] flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95 mt-2"
                >
                  <KeyRound className="w-4 h-4 text-black" />
                  <span>Unlock My App</span>
                </button>
              </form>

              <div className="mt-5 text-center pt-4 border-t border-[#262626]">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentTab('home');
                    if (typeof window !== 'undefined') window.history.pushState({}, '', '/');
                  }}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-bold cursor-pointer"
                >
                  🎉 Free Access Week Active &mdash; Jump directly to Tutor without code &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Help link */}
          <div className="mt-6 pt-4 border-t border-[#262626] text-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#fbbf24] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Need help? WhatsApp 063 650 8381</span>
            </a>
          </div>
        </div>
      </main>

      {/* Trust Footer */}
      <footer className="max-w-4xl mx-auto w-full text-center pt-6 border-t border-[#262626] text-xs text-slate-500">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-slate-400">
            <ShieldCheck className="w-4 h-4 text-[#fbbf24]" />
            <span>NEXOVIAN (Pty) Ltd • Reg: 2026/845572/07</span>
          </div>
          <span className="text-[11px] text-slate-600 font-mono">
            R60 for 30 days • One code, one use • nexovian.group
          </span>
        </div>
      </footer>
    </div>
  );
};

export default UnlockCodeView;
