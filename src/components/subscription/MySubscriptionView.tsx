/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN — MY SUBSCRIPTION VIEW (/my-subscription)
 * Displays:
 * - Subscription Status (2-Day Free Trial / Active / Cancelled / Expired / None)
 * - Trial ends on [date]
 * - Next payment R60 on [date] (or R0 if cancelled before trial ends)
 * - Cancel Subscription button
 */

import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  CreditCard,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  XCircle,
  Loader2,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import {
  cancelUserSubscription,
  getCachedPaystackStatus,
  PaystackSubscriptionRecord,
  startTwoDayFreeTrialCheckout,
  syncSubscriptionStatus
} from '../../services/paystackService';

function formatDateZA(isoDate?: string | null): string {
  if (!isoDate) return '—';
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-ZA', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export const MySubscriptionView: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { setCurrentTab } = useLearning();

  const [subState, setSubState] = useState<PaystackSubscriptionRecord | null>(() =>
    user?.email ? getCachedPaystackStatus(user.email) : null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [cancelling, setCancelling] = useState<boolean>(false);
  const [confirmingCancel, setConfirmingCancel] = useState<boolean>(false);
  const [startingTrial, setStartingTrial] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      if (!user?.email) {
        if (active) setLoading(false);
        return;
      }
      setLoading(true);
      const fresh = await syncSubscriptionStatus(user.email, user.id);
      if (active) {
        setSubState(fresh);
        setLoading(false);
      }
    }
    load();

    const onSubUpdate = () => {
      if (active && user?.email) {
        setSubState(getCachedPaystackStatus(user.email));
      }
    };
    window.addEventListener('nexovian-subscription-updated', onSubUpdate);
    return () => {
      active = false;
      window.removeEventListener('nexovian-subscription-updated', onSubUpdate);
    };
  }, [user?.email, user?.id]);

  const handleCancelSubscription = async () => {
    if (!user?.email) return;
    setCancelling(true);
    setFeedback(null);
    try {
      const res = await cancelUserSubscription(user.email, user.id);
      if (res.success) {
        const refreshed = await syncSubscriptionStatus(user.email, user.id);
        setSubState(refreshed);
        setConfirmingCancel(false);
        setFeedback({ type: 'success', text: res.message });
      } else {
        setFeedback({ type: 'error', text: res.message });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', text: err?.message || 'Failed to cancel subscription.' });
    } finally {
      setCancelling(false);
    }
  };

  const handleStartTrial = async () => {
    setStartingTrial(true);
    setFeedback(null);
    const result = await startTwoDayFreeTrialCheckout({
      user,
      onRequireAuth: () => setCurrentTab('login')
    });
    if (!result.success && result.error) {
      setFeedback({ type: 'error', text: result.error });
    }
    setStartingTrial(false);
  };

  const status = subState?.status || 'none';
  const hasConfirmedAccess = Boolean(subState?.has_access);
  const isTrial = status === 'trial' && hasConfirmedAccess;
  const isActive = status === 'active' && hasConfirmedAccess;
  const isCancelled = status === 'cancelled';
  const isExpired = status === 'expired';

  const statusLabel = isTrial
    ? 'Active (2-Day Free Trial)'
    : isActive
    ? 'Active (R60/month)'
    : isCancelled
    ? 'Cancelled (R0 Due)'
    : isExpired
    ? 'Trial Expired'
    : 'Trial Not Started';

  const statusBadgeClass = isTrial
    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
    : isActive
    ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
    : isCancelled
    ? 'bg-slate-700/60 text-slate-300 border-slate-600'
    : 'bg-rose-500/15 text-rose-300 border-rose-500/40';

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#0A0F1F] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-5">
          <ShieldCheck className="w-12 h-12 text-[#FFD400] mx-auto" />
          <h1 className="text-2xl font-black font-display">My Subscription</h1>
          <p className="text-sm text-slate-300">
            Please log in or create an account to manage your Nexovian 2-Day Free Trial and monthly subscription.
          </p>
          <button
            onClick={() => setCurrentTab('login')}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-sm cursor-pointer transition-all"
          >
            Log in / Create Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1F] text-white py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentTab('landing')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-[#FFD400] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <button
            onClick={() => setCurrentTab('studyGuide')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFD400] hover:underline cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Open Study Guide</span>
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Nexovian Billing &amp; Access
              </span>
              <h1 className="text-2xl sm:text-3xl font-black font-display mt-1">
                My Subscription
              </h1>
              <p className="text-xs text-slate-400 mt-1">{user.email}</p>
            </div>

            <span
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border ${statusBadgeClass}`}
            >
              {isTrial || isActive ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5" />
              )}
              <span>{statusLabel}</span>
            </span>
          </div>

          {feedback && (
            <div
              className={`p-4 rounded-2xl border text-xs font-semibold flex items-start gap-2.5 ${
                feedback.type === 'success'
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/60 border-rose-500/40 text-rose-200'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <span>{feedback.text}</span>
            </div>
          )}

          {loading ? (
            <div className="py-10 flex flex-col items-center justify-center gap-2 text-slate-400 text-sm">
              <Loader2 className="w-6 h-6 animate-spin text-[#FFD400]" />
              <span>Loading subscription details...</span>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Plan Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                    <Calendar className="w-4 h-4 text-[#FFD400]" />
                    <span>Trial ends on</span>
                  </div>
                  <div className="text-sm font-bold text-white">
                    {(isTrial || isActive) && subState?.trial_end_date
                      ? formatDateZA(subState.trial_end_date)
                      : 'Trial Not Started'}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                    <CreditCard className="w-4 h-4 text-emerald-400" />
                    <span>Next payment R60 on</span>
                  </div>
                  <div className="text-sm font-bold text-white">
                    {isCancelled
                      ? 'Cancelled (R0 will be charged)'
                      : (isTrial || isActive) && (subState?.next_payment_date || subState?.trial_end_date)
                      ? formatDateZA(subState.next_payment_date || subState.trial_end_date)
                      : 'Not scheduled yet (add card/bank on Paystack)'}
                  </div>
                </div>
              </div>

              {/* Status details */}
              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 text-xs text-slate-300 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Plan</span>
                  <span className="font-bold text-white">Nexovian Monthly (R60/month ZAR)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Free Trial Policy</span>
                  <span className="font-semibold text-emerald-400">2 Days Free &bull; Cancel before trial ends for R0</span>
                </div>
                {hasConfirmedAccess && subState?.subscription_code && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Paystack Subscription Code</span>
                    <span className="font-mono text-slate-200">{subState.subscription_code}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              {isTrial || isActive ? (
                <div className="pt-2 space-y-3">
                  {!confirmingCancel ? (
                    <button
                      type="button"
                      onClick={() => setConfirmingCancel(true)}
                      className="w-full py-3.5 px-5 rounded-2xl bg-rose-950/50 hover:bg-rose-900/60 border border-rose-500/40 text-rose-300 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Cancel Subscription</span>
                    </button>
                  ) : (
                    <div className="p-4 rounded-2xl bg-rose-950/70 border border-rose-500/50 space-y-3">
                      <p className="text-xs text-rose-100 leading-relaxed font-medium">
                        {isTrial
                          ? 'Are you sure you want to cancel your 2-day free trial? You will be charged R0 and your subscription will stop immediately.'
                          : 'Are you sure you want to cancel your R60/month subscription? You will not be billed again.'}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2.5">
                        <button
                          type="button"
                          onClick={handleCancelSubscription}
                          disabled={cancelling}
                          className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                        >
                          {cancelling ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Cancelling...</span>
                            </>
                          ) : (
                            <span>Confirm Cancel Subscription (R0)</span>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmingCancel(false)}
                          className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs cursor-pointer"
                        >
                          Keep Subscription
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="pt-2 space-y-3">
                  <button
                    type="button"
                    onClick={handleStartTrial}
                    disabled={startingTrial}
                    className="w-full py-4 px-6 rounded-2xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-base flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer disabled:opacity-60"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>
                      {startingTrial
                        ? 'Connecting to Paystack...'
                        : 'Start 2-Day Free Trial - Then R60/month'}
                    </span>
                  </button>
                  <p className="text-[11px] text-center text-slate-400">
                    First charge of R60 is scheduled in 2 days. Cancel anytime before 2 days and pay R0.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MySubscriptionView;
