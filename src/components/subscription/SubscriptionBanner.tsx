/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN 2-DAY FREE TRIAL & SUBSCRIPTION BANNER
 * Displays 'Trial Not Started' + 'Start 2-Day Free Trial' before Paystack confirmation,
 * and live 'Active (2-Day Free Trial)' dates only after Paystack payment is confirmed.
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, CreditCard, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import {
  getCachedPaystackStatus,
  PaystackSubscriptionRecord,
  startTwoDayFreeTrialCheckout,
  syncSubscriptionStatus
} from '../../services/paystackService';

export const SubscriptionBanner: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { setCurrentTab } = useLearning();
  const [subState, setSubState] = useState<PaystackSubscriptionRecord | null>(() =>
    user?.email ? getCachedPaystackStatus(user.email) : null
  );

  useEffect(() => {
    let active = true;
    if (!isAuthenticated || !user?.email) {
      setSubState(null);
      return;
    }

    setSubState(getCachedPaystackStatus(user.email));
    syncSubscriptionStatus(user.email, user.id)
      .then((fresh) => {
        if (active) setSubState(fresh);
      })
      .catch(() => {});

    const onUpdate = () => {
      if (active && user?.email) {
        setSubState(getCachedPaystackStatus(user.email));
      }
    };
    window.addEventListener('nexovian-subscription-updated', onUpdate);
    return () => {
      active = false;
      window.removeEventListener('nexovian-subscription-updated', onUpdate);
    };
  }, [isAuthenticated, user?.email, user?.id]);

  if (!isAuthenticated || !user?.email) return null;

  const status = subState?.status || 'none';
  const hasAccess = Boolean(subState?.has_access);

  // Confirmed monthly active users don't need a banner cluttering their header
  if (status === 'active' && hasAccess) return null;

  // Confirmed Active 2-Day Free Trial bar (only after Paystack card/bank confirmation)
  if (status === 'trial' && hasAccess) {
    const trialEndsText = subState?.trial_end_date
      ? new Date(subState.trial_end_date).toLocaleDateString('en-ZA', {
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit'
        })
      : 'in 2 days';

    return (
      <div className="bg-[#0F172A] border-b border-emerald-500/30 text-white px-3 sm:px-4 py-2 text-xs flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-bold text-emerald-300">
            Active &bull; 2-Day Free Trial
          </span>
          <span className="text-slate-300">
            &bull; Trial ends {trialEndsText} &bull; Next payment R60 on {trialEndsText}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setCurrentTab('mySubscription')}
          className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600 text-amber-300 font-bold text-[11px] flex items-center gap-1 cursor-pointer shrink-0"
        >
          <CreditCard className="w-3 h-3" />
          <span>My Subscription</span>
        </button>
      </div>
    );
  }

  // Logged-in user with no confirmed Paystack payment yet -> Trial Not Started
  return (
    <div className="bg-[#0F172A] border-b border-amber-400/30 text-white px-3 sm:px-4 py-2 text-xs flex flex-col sm:flex-row items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span className="font-medium text-slate-200">
          {status === 'cancelled'
            ? 'Subscription cancelled (R0 charged). Restart your trial anytime.'
            : status === 'expired'
            ? 'Trial expired. Start your subscription on Paystack to keep full access.'
            : 'Trial Not Started — Add card or bank details on Paystack to activate your 2-day free trial.'}
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() => setCurrentTab('mySubscription')}
          className="px-3 py-1 rounded-full border border-slate-700 text-slate-300 hover:text-white text-[11px] font-semibold cursor-pointer"
        >
          My Subscription
        </button>
        <button
          type="button"
          onClick={() =>
            startTwoDayFreeTrialCheckout({
              user,
              onRequireAuth: () => setCurrentTab('login')
            })
          }
          className="px-3.5 py-1 rounded-full bg-[#FFB612] hover:bg-yellow-400 text-black font-extrabold text-[11px] flex items-center gap-1 cursor-pointer"
        >
          <span>Start 2-Day Free Trial - Then R60/month</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default SubscriptionBanner;
