/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN PAYSTACK CHECKOUT SUCCESS PAGE (/success)
 * Verifies the Paystack reference against /api/paystack/verify, creates/activates
 * the 2-Day Free Trial subscription (first R60 charge in 2 days), and unlocks full access.
 */

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BookOpen,
  CreditCard,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import {
  saveCachedPaystackStatus,
  startTwoDayFreeTrialCheckout
} from '../../services/paystackService';

interface VerifyState {
  status: 'verifying' | 'success' | 'error';
  message: string;
  trialEndDate: string | null;
  nextPaymentDate: string | null;
  subscriptionCode: string | null;
  subStatus: 'trial' | 'active';
}

function formatDateZA(isoDate?: string | null): string {
  if (!isoDate) return 'In 2 days';
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return 'In 2 days';
  return d.toLocaleDateString('en-ZA', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export const SuccessView: React.FC = () => {
  const { user } = useAuth();
  const { setCurrentTab } = useLearning();

  const [verifyState, setVerifyState] = useState<VerifyState>({
    status: 'verifying',
    message: 'Verifying your Paystack 2-day free trial...',
    trialEndDate: null,
    nextPaymentDate: null,
    subscriptionCode: null,
    subStatus: 'trial'
  });

  useEffect(() => {
    let active = true;

    async function verifyReference() {
      if (typeof window === 'undefined') return;
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('reference') || params.get('trxref');

      if (!ref) {
        setVerifyState({
          status: 'error',
          message: 'No Paystack transaction reference was found in the URL.',
          trialEndDate: null,
          nextPaymentDate: null,
          subscriptionCode: null,
          subStatus: 'trial'
        });
        return;
      }

      try {
        const query = new URLSearchParams({ reference: ref });
        if (user?.email) query.set('email', user.email);
        if (user?.id) query.set('userId', user.id);

        const res = await fetch(`/api/paystack/verify?${query.toString()}`);
        const data = await res.json();

        if (!active) return;

        if (res.ok && data?.success) {
          const emailToCache = data.email || data.record?.email || user?.email;
          const rawStatus = data.subscription_status || data.status;
          const recordStatus: 'trial' | 'active' = rawStatus === 'active' ? 'active' : 'trial';

          if (emailToCache) {
            saveCachedPaystackStatus(emailToCache, {
              status: recordStatus,
              has_access: true,
              trial_end_date: data.trial_end_date || null,
              next_payment_date: data.next_payment_date || data.trial_end_date || null,
              subscription_code: data.subscription_code || null,
              days_remaining: recordStatus === 'trial' ? 2 : 30,
              hours_remaining: recordStatus === 'trial' ? 48 : 720
            });
          }

          setVerifyState({
            status: 'success',
            message:
              recordStatus === 'active'
                ? 'Active — Your monthly R60 Nexovian subscription is confirmed!'
                : 'Active — Your 2-Day Free Trial is now confirmed! First R60 payment is scheduled on your trial end date.',
            trialEndDate: data.trial_end_date || null,
            nextPaymentDate: data.next_payment_date || data.trial_end_date || null,
            subscriptionCode: data.subscription_code || null,
            subStatus: recordStatus
          });
        } else {
          setVerifyState({
            status: 'error',
            message: data?.error || 'Could not verify Paystack authorization. Please contact support or retry.',
            trialEndDate: null,
            nextPaymentDate: null,
            subscriptionCode: null,
            subStatus: 'trial'
          });
        }
      } catch (err: any) {
        if (!active) return;
        setVerifyState({
          status: 'error',
          message: err?.message || 'Network error verifying Paystack transaction.',
          trialEndDate: null,
          nextPaymentDate: null,
          subscriptionCode: null,
          subStatus: 'trial'
        });
      }
    }

    verifyReference();
    return () => {
      active = false;
    };
  }, [user?.email, user?.id]);

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-[#0a0a0a] text-white">
      <div className="w-full max-w-xl bg-[#1a1a1a] border-2 border-[#fbbf24] rounded-3xl p-6 sm:p-10 shadow-[0_0_40px_rgba(251,191,36,0.25)] text-center space-y-6">
        {verifyState.status === 'verifying' ? (
          <div className="py-10 space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-[#fbbf24] mx-auto" />
            <h1 className="text-xl font-black text-white font-display">
              Activating Your 2-Day Free Trial...
            </h1>
            <p className="text-xs text-slate-400">
              Confirming your Paystack card setup and setting your first payment date to 2 days from now.
            </p>
          </div>
        ) : verifyState.status === 'error' ? (
          <div className="space-y-5">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-400 flex items-center justify-center">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white font-display">Verification Issue</h1>
            <p className="text-sm text-rose-200">{verifyState.message}</p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() =>
                  startTwoDayFreeTrialCheckout({
                    user,
                    onRequireAuth: () => setCurrentTab('login')
                  })
                }
                className="flex-1 py-3.5 px-5 rounded-xl bg-[#fbbf24] hover:bg-yellow-400 text-black font-black text-sm cursor-pointer"
              >
                Start 2-Day Free Trial - Then R60/month
              </button>
              <button
                type="button"
                onClick={() => setCurrentTab('mySubscription')}
                className="py-3.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm cursor-pointer"
              >
                My Subscription
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-400/40 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono mb-3">
                {verifyState.subStatus === 'active'
                  ? 'Subscription Active • R60/month'
                  : '2-Day Free Trial Activated'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
                {verifyState.subStatus === 'active'
                  ? 'Welcome to Nexovian!'
                  : '2-Day Free Trial Started!'}
              </h1>
              <p className="mt-2 text-sm text-slate-300">{verifyState.message}</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-slate-800 space-y-2.5 text-left text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Trial ends on</span>
                <span className="font-bold text-white">{formatDateZA(verifyState.trialEndDate)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Next payment R60 on</span>
                <span className="font-bold text-[#fbbf24]">
                  {formatDateZA(verifyState.nextPaymentDate || verifyState.trialEndDate)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Cancel before 2 days</span>
                <span className="font-bold text-emerald-400">R0 charged</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCurrentTab('studyGuide')}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#fbbf24] hover:bg-yellow-400 text-black font-black text-sm rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.4)] flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-black" />
                <span>Open Study Guide</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              <button
                type="button"
                onClick={() => setCurrentTab('tutor')}
                className="w-full sm:w-auto px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl border border-slate-700 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Open AI Tutor</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentTab('mySubscription')}
                className="w-full sm:w-auto px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-sm rounded-xl border border-slate-700 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <span>My Subscription</span>
              </button>
            </div>
          </>
        )}

        <p className="text-xs text-slate-500 pt-2 font-mono">
          Need help? WhatsApp 063 650 8381 &bull; NEXOVIAN (PTY) LTD
        </p>
      </div>
    </div>
  );
};

export default SuccessView;
