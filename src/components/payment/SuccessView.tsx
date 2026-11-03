/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN PAYFAST SUBSCRIPTION SUCCESS PAGE (/success)
 */

import React, { useEffect } from 'react';
import { CheckCircle2, BookOpen, Sparkles, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useAuth } from '../../context/AuthContext';
import { recordPaymentSuccess } from '../../services/antiAbuseService';

export const SuccessView: React.FC = () => {
  const { setCurrentTab } = useLearning();
  const { user } = useAuth();

  useEffect(() => {
    // Mark user as subscribed locally
    if (user?.email) {
      recordPaymentSuccess(user.email, 'PAYFAST-TRIAL', user.id);
    } else {
      localStorage.setItem('nexovian_payfast_trial_active', 'true');
    }
  }, [user]);

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-center space-y-6">
        
        {/* Animated Celebration Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center border border-emerald-500/30 shadow-[0_0_24px_rgba(16,185,129,0.25)]">
          <CheckCircle2 className="w-10 h-10 animate-bounce" />
        </div>

        {/* Heading & Mission */}
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-mono mb-3">
            Payment Confirmed • PayFast Active
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-display tracking-tight">
            Welcome to Nexovian! 🎉
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed max-w-xl mx-auto">
            Your 2-day free trial started. You now have access to Grade 4 to University in 11 languages. After 2 days, R60/month will be billed automatically. Cancel anytime.
          </p>
        </div>

        {/* Access Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left py-4 border-y border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-2">
            <span className="text-emerald-500 font-bold">✓</span>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">All 11 Languages</p>
              <p className="text-[11px] text-slate-500">siSwati, Xitsonga, Zulu &amp; more</p>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-2">
            <span className="text-emerald-500 font-bold">✓</span>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Grade R to Varsity</p>
              <p className="text-[11px] text-slate-500">CAPS, TVET &amp; Degree modules</p>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-2">
            <span className="text-emerald-500 font-bold">✓</span>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Past Papers &amp; Memos</p>
              <p className="text-[11px] text-slate-500">2018–2024 with AI Step-by-Step</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              setCurrentTab('learn');
              if (typeof window !== 'undefined') window.history.pushState({}, '', '/learn');
            }}
            className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 text-slate-950 font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:-translate-y-0.5 active:scale-95"
          >
            <BookOpen className="w-4 h-4 text-slate-950" />
            <span>Start Learning Now</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>

          <button
            onClick={() => {
              setCurrentTab('tutor');
              if (typeof window !== 'undefined') window.history.pushState({}, '', '/tutor');
            }}
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-400/50 font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Ask AI Tutor</span>
          </button>
        </div>

        <p className="text-xs text-slate-400 pt-2">
          Questions or help? WhatsApp our team directly at +27 63 650 8381 • NEXOVIAN (PTY) LTD
        </p>
      </div>
    </div>
  );
};
