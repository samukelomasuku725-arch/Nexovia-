/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN PAYWALL VIEW (/paywall)
 * Presents the 2-Day Free Trial (then R60/month) Paystack flow. Auth required first.
 */

import React, { useState, useEffect } from 'react';
import {
  Lock,
  Sparkles,
  AlertCircle,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { isUserActive, startTwoDayFreeTrialCheckout } from '../../services/paystackService';

const WHATSAPP_URL = 'https://wa.me/27636508381?text=Hi%20Nexovian%2C%20I%20need%20help%20with%20my%20subscription';

export const PaywallView: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { setCurrentTab } = useLearning();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && isUserActive(user)) {
      setCurrentTab('home');
    }
  }, [isAuthenticated, user, setCurrentTab]);

  const handleStartTrial = async () => {
    setErrorMessage(null);
    setLoading(true);
    const res = await startTwoDayFreeTrialCheckout({
      user,
      onRequireAuth: () => {
        setCurrentTab('login');
        if (typeof window !== 'undefined') {
          window.history.pushState({}, '', '/login');
        }
      }
    });
    if (!res.success && res.error) {
      setErrorMessage(res.error);
    }
    setLoading(false);
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
          {isAuthenticated ? (
            <button
              type="button"
              onClick={() => setCurrentTab('mySubscription')}
              className="px-3.5 py-1.5 rounded-full border border-[#FFB612]/50 text-[#FFB612] hover:bg-[#FFB612]/10 text-xs font-bold transition-colors cursor-pointer"
            >
              My Subscription
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentTab('login')}
              className="px-3.5 py-1.5 rounded-full border border-[#FFB612]/50 text-[#FFB612] hover:bg-[#FFB612]/10 text-xs font-bold transition-colors cursor-pointer"
            >
              Log in
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setCurrentTab('landing');
              if (typeof window !== 'undefined') window.history.pushState({}, '', '/');
            }}
            className="text-xs font-bold text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            &larr; Home
          </button>
        </div>
      </div>

      {/* Main Content Box */}
      <main className="max-w-xl mx-auto w-full my-auto py-8">
        <div className="bg-[#000000] border-2 border-[#007A4D] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="text-center pb-6 border-b border-white/10">
            <div className="w-16 h-16 rounded-full bg-[#007A4D]/20 border-2 border-[#007A4D] text-[#007A4D] flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Lock className="w-8 h-8 text-[#007A4D]" />
            </div>

            <div className="inline-block px-3.5 py-1 rounded-full bg-[#FFB612]/20 border border-[#FFB612]/40 text-[#FFB612] text-xs font-mono font-bold uppercase mb-2">
              2-DAY FREE TRIAL &bull; THEN R60/MONTH
            </div>

            <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              Start 2-Day Free Trial
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-white/70 max-w-md mx-auto">
              Enjoy 2 days free access to CAPS Study Guides, Grade 4 to University subjects, 4,000+ past papers, and AI Tutor. First R60 payment happens in 2 days. Cancel before 2 days for R0.
            </p>
          </div>

          <div className="py-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/90 border-b border-white/10 pb-5">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#007A4D] shrink-0" />
              <span>Grade 12 Physics &amp; Life Sciences Study Guides</span>
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

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleStartTrial}
            disabled={loading}
            className="w-full py-4 rounded-xl bg-[#FFB612] hover:bg-yellow-400 disabled:opacity-60 text-black font-black text-base shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01] active:scale-95"
          >
            <Sparkles className="w-5 h-5 text-black" />
            <span>
              {loading
                ? 'Connecting Paystack...'
                : 'Start 2-Day Free Trial - Then R60/month'}
            </span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>

          <p className="text-center text-xs text-white/60">
            {isAuthenticated
              ? 'First payment is scheduled in 2 days. Cancel anytime before then and pay R0.'
              : 'Create an account or log in first to activate your 2-day free trial.'}
          </p>

          <div className="pt-4 border-t border-white/10 text-center">
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

      {/* Footer */}
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
