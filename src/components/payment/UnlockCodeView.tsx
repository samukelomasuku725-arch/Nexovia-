/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN UNLOCK / TRIAL ACCESS PAGE (/unlock)
 */

import React, { useState, useEffect } from 'react';
import {
  KeyRound,
  AlertCircle,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { startTwoDayFreeTrialCheckout, syncSubscriptionStatus } from '../../services/paystackService';

const WHATSAPP_URL = 'https://wa.me/27636508381?text=Hi%20Nexovian%2C%20I%20have%20an%20issue%20with%20my%20access%20code';

export const UnlockCodeView: React.FC = () => {
  const { user } = useAuth();
  const { setCurrentTab } = useLearning();

  const [unlockCode, setUnlockCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [startingTrial, setStartingTrial] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const qCode = params.get('code');
      if (qCode) {
        setUnlockCode(qCode.toUpperCase().trim());
      }
    }
  }, []);

  const handleStartTrial = async () => {
    setStartingTrial(true);
    setError(null);
    const res = await startTwoDayFreeTrialCheckout({
      user,
      onRequireAuth: () => setCurrentTab('login')
    });
    if (!res.success && res.error) {
      setError(res.error);
    }
    setStartingTrial(false);
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const code = unlockCode.trim().toUpperCase();
    if (!code.startsWith('NEX-') || code.length !== 10 || !/^\d{6}$/.test(code.slice(4))) {
      setError('Format must be NEX- + 6 digits (e.g. NEX-123456).');
      return;
    }

    try {
      const res = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, email: user?.email || '' })
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        setError(data?.error || 'Code not found or already used. Start your 2-day free trial via Paystack instead.');
        return;
      }

      if (user?.email) {
        await syncSubscriptionStatus(user.email, user.id);
      }

      setIsSuccess(true);
      setTimeout(() => {
        setCurrentTab('studyGuide');
        if (typeof window !== 'undefined') {
          window.history.pushState({}, '', '/study-guide');
        }
      }, 1500);
    } catch {
      setError('Unable to verify code right now. Please start your 2-day free trial with Paystack.');
    }
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

        <button
          type="button"
          onClick={() => {
            setCurrentTab('landing');
            if (typeof window !== 'undefined') window.history.pushState({}, '', '/');
          }}
          className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer"
        >
          &larr; Home
        </button>
      </div>

      {/* Main Card */}
      <main className="max-w-md mx-auto w-full my-auto py-8">
        <div className="bg-[#1a1a1a] border-2 border-[#fbbf24] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="text-center pb-5 border-b border-[#262626] space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#fbbf24]/15 border border-[#fbbf24] text-[#fbbf24] flex items-center justify-center mx-auto">
              <CreditCard className="w-7 h-7 text-[#fbbf24]" />
            </div>

            <h1 className="font-display font-black text-2xl text-white tracking-tight">
              Start Your 2-Day Free Trial
            </h1>
            <p className="text-xs text-slate-300">
              Try Nexovian free for 2 days (Study Guides, AI Tutor &amp; Past Papers). First R60 charge starts after 2 days. Cancel anytime for R0.
            </p>

            <button
              type="button"
              onClick={handleStartTrial}
              disabled={startingTrial}
              className="w-full py-3.5 px-4 rounded-xl bg-[#fbbf24] hover:bg-yellow-400 text-black font-black text-sm flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95 disabled:opacity-60"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>
                {startingTrial ? 'Connecting Paystack...' : 'Start 2-Day Free Trial - Then R60/month'}
              </span>
            </button>
          </div>

          {isSuccess ? (
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#fbbf24] text-black flex items-center justify-center mx-auto font-black text-xl">
                &#10003;
              </div>
              <h2 className="font-display font-black text-xl text-white">Access Granted!</h2>
              <p className="text-xs text-slate-300">Redirecting to Study Guide...</p>
            </div>
          ) : (
            <div>
              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-200 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleUnlock} className="space-y-3">
                <label className="block text-[11px] font-mono uppercase text-slate-400 font-bold">
                  Have an Institutional Voucher Code?
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NEX-100004"
                  value={unlockCode}
                  onChange={(e) => setUnlockCode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#333] text-white font-mono text-sm font-bold placeholder:text-slate-600 focus:outline-none focus:border-[#fbbf24] tracking-wider text-center"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <KeyRound className="w-4 h-4 text-[#fbbf24]" />
                  <span>Redeem Voucher Code</span>
                </button>
              </form>
            </div>
          )}

          <div className="pt-4 border-t border-[#262626] text-center">
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

      <footer className="max-w-4xl mx-auto w-full text-center pt-6 border-t border-[#262626] text-xs text-slate-500">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-slate-400">
            <ShieldCheck className="w-4 h-4 text-[#fbbf24]" />
            <span>NEXOVIAN (Pty) Ltd &bull; Reg: 2026/845572/07</span>
          </div>
          <span className="text-[11px] text-slate-600 font-mono">
            2-Day Free Trial, then R60/month &bull; nexovian.group
          </span>
        </div>
      </footer>
    </div>
  );
};

export default UnlockCodeView;
