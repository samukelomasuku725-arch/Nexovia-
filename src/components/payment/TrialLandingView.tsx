/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN - 2-DAY FREE TRIAL LANDING PAGE
 */

import React, { useState } from 'react';
import { ArrowLeft, Sparkles, CreditCard, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { startTwoDayFreeTrialCheckout } from '../../services/paystackService';

export const TrialLandingView: React.FC = () => {
  const { user } = useAuth();
  const { setCurrentTab } = useLearning();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleStartTrial = async () => {
    setLoading(true);
    setErrorMsg(null);
    const res = await startTwoDayFreeTrialCheckout({
      user,
      onRequireAuth: () => setCurrentTab('login')
    });
    if (!res.success && res.error) {
      setErrorMsg(res.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#222222] font-sans text-center relative pb-16">
      {/* Return Navigation */}
      <div className="bg-black/90 px-4 py-2.5 flex items-center justify-between text-xs text-white border-b border-gray-800">
        <button
          onClick={() => setCurrentTab('landing')}
          className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>
        <div className="flex items-center gap-2 text-amber-400 font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>2-Day Free Trial &bull; Paystack</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-black text-white px-5 py-14 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display mb-3">
          NEXOVIAN
        </h1>
        <p className="text-lg sm:text-xl font-medium text-gray-200 mb-1">
          Grade 4 to University &amp; CAPS Study Guides
        </p>
        <p className="text-lg sm:text-xl font-medium text-amber-400">
          All 11 Official South African Languages
        </p>
      </div>

      {/* Card Section */}
      <div className="bg-white max-w-[460px] mx-auto -mt-[30px] mb-8 p-6 sm:p-8 rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-center border border-gray-100/80">
        <h2 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">
          Unlock Full Access
        </h2>
        <p className="text-gray-600 text-sm mb-5">
          2-Day Free Trial &bull; First payment of R60 in 2 days &bull; Cancel anytime for R0
        </p>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 text-left">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <button
          type="button"
          onClick={handleStartTrial}
          disabled={loading}
          className="w-full py-4 px-4 rounded-xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-base flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer disabled:opacity-60"
        >
          <CreditCard className="w-5 h-5" />
          <span>
            {loading ? 'Connecting Paystack...' : 'Start 2-Day Free Trial - Then R60/month'}
          </span>
        </button>

        <p className="text-[13px] text-[#666666] mt-5 leading-relaxed">
          &#10003; 2 Days Free &#10003; All Study Guides &amp; Past Papers &#10003; 11 SA Languages<br />
          Secure subscription managed via Paystack
        </p>
      </div>

      <div className="max-w-md mx-auto px-4 text-xs text-gray-500 space-y-2">
        <p>Cancel before 2 days in My Subscription for R0</p>
        <p className="font-semibold text-gray-600">NEXOVIAN (PTY) LTD &bull; Reg: 2026/845572/07 &bull; Level 1 B-BBEE</p>
      </div>
    </div>
  );
};
