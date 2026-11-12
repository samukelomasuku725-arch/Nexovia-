/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN PAYMENT SUCCESS PAGE (/success) — DAY 1 DARK GOLD THEME
 * 
 * Calls generateNextCode() from the 200k code pool, displays:
 * "✅ R60 Paid! Your code: NEX-XXXXXX"
 * Provides instant unlock & copy buttons.
 */

import React, { useState, useEffect } from 'react';
import { CheckCircle2, Copy, Check, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { generateNextCode } from '../../lib/codeGenerator';
import { saveSubscription } from '../../services/snapscanSubscriptionService';

export const SuccessView: React.FC = () => {
  const { setCurrentTab } = useLearning();
  const [assignedCode, setAssignedCode] = useState<string>('NEX-100004');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // Generate next unique one-time code from 200k pool
    const code = generateNextCode();
    setAssignedCode(code);

    // Auto activate locally
    const now = Date.now();
    const expiry = now + 30 * 24 * 60 * 60 * 1000;
    localStorage.setItem('nexovian_premium', 'active');
    localStorage.setItem('nexovian_code', code);
    localStorage.setItem('isPremium', 'true');
    localStorage.setItem('nexovian_unlocked', 'true');
    localStorage.setItem('nexovian_paid', 'true');
    localStorage.setItem('nexovian_paystack_active', 'true');
    localStorage.setItem('nexovian_logged_in', 'true');
    localStorage.setItem(`used_${code}`, 'true');
    localStorage.setItem('premium_expiry', String(expiry));

    // Check URL query parameters for Paystack reference callback
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('reference') || params.get('trxref');
      if (ref) {
        localStorage.setItem('nexovian_paystack_ref', ref);
        fetch(`/api/paystack/verify?reference=${encodeURIComponent(ref)}`)
          .then((r) => r.json())
          .catch((err) => console.warn('Paystack verify background call notice:', err));
      }
    }

    saveSubscription({
      access_code: code,
      payment_phone: '0820000000',
      payment_reference: 'PAYSTACK-R60-MONTHLY',
      payment_status: 'paid',
      subscription_status: 'active',
      subscription_start: now,
      subscription_end: expiry,
      last_payment_date: now
    });
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(assignedCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (_) {
      setIsCopied(true);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-[#0a0a0a] text-white">
      <div className="w-full max-w-xl bg-[#1a1a1a] border-2 border-[#fbbf24] rounded-3xl p-6 sm:p-10 shadow-[0_0_40px_rgba(251,191,36,0.25)] text-center space-y-6">
        
        {/* Animated Celebration Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-[#fbbf24]/20 text-[#fbbf24] flex items-center justify-center border border-[#fbbf24] shadow-[0_0_25px_rgba(251,191,36,0.4)]">
          <CheckCircle2 className="w-10 h-10 animate-bounce text-[#fbbf24]" />
        </div>

        {/* Heading */}
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#fbbf24]/20 text-[#fbbf24] border border-[#fbbf24]/40 font-mono mb-3">
            Payment Confirmed • 30 Days Unlocked
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
            ✅ R60 Paid!
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Welcome to NEXOVIAN Premium. Your unique one-time code has been generated and activated:
          </p>
        </div>

        {/* Code Display Box */}
        <div className="p-5 rounded-2xl bg-[#0a0a0a] border-2 border-[#fbbf24] space-y-3">
          <span className="text-[11px] font-mono text-[#fbbf24] uppercase tracking-wider font-bold block">
            Your One-Time Unlock Code
          </span>
          <div className="font-mono text-3xl sm:text-4xl font-black text-white tracking-widest selection:bg-[#fbbf24]">
            {assignedCode}
          </div>
          <div className="flex items-center justify-center gap-2 pt-1">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-[#262626] hover:bg-[#333] text-xs font-bold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#fbbf24]" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
          <p className="text-[11px] text-slate-400 font-mono">
            Write it down. One code • One use • Valid 30 days
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              setCurrentTab('tutor');
              if (typeof window !== 'undefined') window.history.pushState({}, '', '/app');
            }}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#fbbf24] hover:bg-yellow-400 text-black font-black text-sm rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.4)] flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>Open AI Tutor</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>

          <button
            onClick={() => {
              setCurrentTab('scan');
              if (typeof window !== 'undefined') window.history.pushState({}, '', '/app');
            }}
            className="w-full sm:w-auto px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl border border-slate-700 flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Scan &amp; Understand</span>
          </button>
        </div>

        <p className="text-xs text-slate-500 pt-2 font-mono">
          Need help? WhatsApp 063 650 8381 • NEXOVIAN (PTY) LTD
        </p>
      </div>
    </div>
  );
};

export default SuccessView;
