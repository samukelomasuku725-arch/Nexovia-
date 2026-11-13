/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN PAYMENT CANCELLATION PAGE (/cancel)
 */

import React, { useState } from 'react';
import { Home, ShieldAlert, CreditCard, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { startTwoDayFreeTrialCheckout } from '../../services/paystackService';

export const CancelView: React.FC = () => {
  const { user } = useAuth();
  const { setCurrentTab } = useLearning();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRetryTrial = async () => {
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
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/30">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">
            Checkout Not Completed
          </h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto">
            Your Paystack trial setup was cancelled and you have been charged R0. You can start your 2-day free trial anytime below.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-500/40 text-rose-600 dark:text-rose-200 text-xs flex items-center gap-2 text-left">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="py-2">
          <button
            type="button"
            onClick={handleRetryTrial}
            disabled={loading}
            className="w-full py-4 px-6 rounded-2xl bg-[#FFB612] hover:bg-yellow-400 text-black font-black text-base flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-60"
          >
            <CreditCard className="w-5 h-5" />
            <span>
              {loading ? 'Connecting Paystack...' : 'Start 2-Day Free Trial - Then R60/month'}
            </span>
          </button>
        </div>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-center">
          <button
            type="button"
            onClick={() => {
              setCurrentTab('landing');
              if (typeof window !== 'undefined') window.history.pushState({}, '', '/');
            }}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </button>
        </div>
      </div>
    </div>
  );
};
