/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN PAYFAST CANCELLATION PAGE (/cancel)
 */

import React from 'react';
import { ArrowLeft, RefreshCw, Home, ShieldAlert } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { PayFastSubscriptionForm } from './PayFastSubscriptionForm';

export const CancelView: React.FC = () => {
  const { setCurrentTab } = useLearning();

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-center space-y-6">
        
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/30">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">
            Payment Cancelled
          </h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto">
            Your transaction was not completed and you haven&apos;t been charged. You can retry starting your 2-Day Free Trial below or continue exploring free materials.
          </p>
        </div>

        {/* Retry Form */}
        <div className="py-2">
          <PayFastSubscriptionForm buttonText="Retry 2-Day Free Trial - Then R60/Month" />
        </div>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-center">
          <button
            onClick={() => {
              setCurrentTab('home');
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
