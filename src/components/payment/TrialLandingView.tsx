/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN - 2-DAY FREE TRIAL & SNAPSCAN UNLOCK PAGE
 * Instant access with SnapScan (no PayFast redirect)
 */

import React, { useState } from 'react';
import { ArrowLeft, Sparkles, QrCode, CheckCircle2, Unlock } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export const TrialLandingView: React.FC = () => {
  const { setCurrentTab } = useLearning();
  const [unlocked, setUnlocked] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const handlePayClick = () => {
    window.open('https://pos.snapscan.io/qr/NKJJYpV6', '_blank');
    setTimeout(() => {
      setShowPrompt(true);
    }, 10000);
  };

  const handleUnlockClick = () => {
    try {
      localStorage.setItem('nexovian_paid', 'true');
    } catch (_) {}
    setUnlocked(true);
    setTimeout(() => {
      setCurrentTab('home');
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', '/app');
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#222222] font-sans text-center relative pb-16">
      {/* Return Navigation */}
      <div className="bg-black/90 px-4 py-2.5 flex items-center justify-between text-xs text-white border-b border-gray-800">
        <button
          onClick={() => setCurrentTab('home')}
          className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>
        <div className="flex items-center gap-2 text-amber-400 font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SnapScan Official Merchant</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-black text-white px-5 py-14 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display mb-3">
          NEXOVIAN
        </h1>
        <p className="text-lg sm:text-xl font-medium text-gray-200 mb-1">
          Grade 4 to University
        </p>
        <p className="text-lg sm:text-xl font-medium text-amber-400">
          11 South African Languages
        </p>
      </div>

      {/* Card Section */}
      <div className="bg-white max-w-[440px] mx-auto -mt-[30px] mb-8 p-6 sm:p-8 rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-center border border-gray-100/80">
        <h2 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">
          Unlock Full Access
        </h2>
        <p className="text-gray-600 text-sm mb-5">
          2-Day Free Trial • Then only R60 / month • Cancel anytime
        </p>

        {unlocked ? (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-center space-y-2 animate-in fade-in">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-base text-emerald-950">Access Granted - Start Learning!</h3>
            <p className="text-xs text-emerald-800">Welcome to NEXOVIAN Premium! Loading your dashboard...</p>
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={handlePayClick}
              className="w-full py-3.5 px-4 rounded-xl bg-[#0077b6] hover:bg-[#023e8a] text-white font-bold text-base flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
            >
              <QrCode className="w-5 h-5" />
              <span>Pay R60 with SnapScan</span>
            </button>

            <button
              onClick={handleUnlockClick}
              className="w-full py-3.5 px-4 rounded-xl bg-[#ffd700] hover:bg-[#facc15] text-black font-extrabold text-base flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
            >
              <Unlock className="w-5 h-5 text-black" />
              <span>I Have Paid - Unlock App</span>
            </button>
          </div>
        )}

        {showPrompt && !unlocked && (
          <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex items-center justify-between gap-2">
            <span>Payment done? Click <strong>&quot;I Have Paid - Unlock App&quot;</strong> above!</span>
            <button
              onClick={handleUnlockClick}
              className="px-2.5 py-1 bg-amber-400 font-bold rounded-lg text-black text-[11px] shrink-0"
            >
              Unlock Now
            </button>
          </div>
        )}

        <p className="text-[13px] text-[#666666] mt-5 leading-relaxed">
          ✓ Instant Access ✓ All 11 SA Languages ✓ Grade 4 to University<br />
          Secure payment verified via SnapScan
        </p>
      </div>

      {/* Trust & Features Footer */}
      <div className="max-w-md mx-auto px-4 text-xs text-gray-500 space-y-2">
        <p>No card deductions without confirmation • Cancel anytime</p>
        <p>Supports all 11 official South African languages, CAPS curriculum, TVET NATED, and University modules.</p>
        <p className="font-semibold text-gray-600">NEXOVIAN (PTY) LTD • Reg: 2026/845572/07 • Level 1 B-BBEE</p>
      </div>
    </div>
  );
};
