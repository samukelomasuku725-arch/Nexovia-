/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN SUBSCRIPTION & TRIAL BANNER / MODAL
 * 
 * Requirements:
 * - Headline: "R60 per learner / month - Learn in your language"
 * - Button: "Pay R60/month now - Paystack"
 * - Card #0F172A, Yellow #facc15, Footer NEXOVIAN (PTY) LTD
 * 
 * 5 States:
 * 1. Anonymous visitor: DO NOT show modal, DO NOT show "already used" message
 * 2. New account: 1 day free trial (24h), full access, subtle top banner
 * 3. Expired trial: Show FIRE paywall card:
 *    - If email exists in used_trial_emails DB & never paid: Show yellow box
 *      "Hey! You already used your 1 free day on {actualTrialEndDate}. NEXOVIAN is R60/month to support all 11 languages. Pay to continue learning! 🔥"
 *    - If brand new trial just ended today: Normal title "Your 1 day free trial ended - Pay R60 to continue" (NO yellow box)
 * 4. Paid user: Full access, no paywall
 * 5. Admin bypass: Email in admin list or localStorage NEXOVIAN_ADMIN = MPUMALANGA2026 -> Full access always
 */

import React, { useState, useEffect } from 'react';
import {
  Check,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  checkUserSubscription,
  openPaystackPayment,
  SubscriptionStatus,
  SUBSCRIPTION_AMOUNT_ZAR,
  SUBSCRIPTION_PLAN_NAME
} from '../../services/paystackService';
import { checkDeepTrialState, isAdminUser } from '../../services/antiAbuseService';

export const SubscriptionBanner: React.FC = () => {
  const { user } = useAuth();
  const [subStatus, setSubStatus] = useState<SubscriptionStatus | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // STATE 1: Anonymous visitor -> Do not show subscription modal
    if (!user || !user.email) {
      setSubStatus(null);
      return;
    }

    // STATE 5: Admin bypass -> Do not show subscription modal
    if (isAdminUser(user)) {
      setSubStatus(null);
      return;
    }

    // 1. Initial fast local check
    const initialStatus = checkUserSubscription(user);
    setSubStatus(initialStatus);

    // 2. Async check against DB used_trial_emails
    checkDeepTrialState(user).then((deep) => {
      if (isAdminUser(user) || deep.isAdmin || deep.isPaidUser) {
        setSubStatus((prev) => prev ? { ...prev, isSubscribed: true, isTrialExpired: false } : null);
        return;
      }

      setSubStatus((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          isSubscribed: deep.isSubscribed,
          isTrialActive: deep.isTrialActive,
          isTrialExpired: deep.isTrialExpired,
          hoursRemainingInTrial: deep.hoursRemainingInTrial,
          showYellowBox: deep.showYellowBox,
          actualTrialEndDate: deep.actualTrialEndDate,
          smartBlockMessage: deep.smartMessage
        };
      });
    });
  }, [user]);

  // STATE 1: Anonymous visitor -> Hide completely
  if (!user || !user.email) return null;

  // STATE 5: Admin bypass -> Hide completely
  if (isAdminUser(user) || subStatus?.isAdmin) return null;

  if (!subStatus) return null;

  // STATE 4: Paid user -> Hide completely
  if (subStatus.isSubscribed) return null;

  const handlePay = () => {
    setIsProcessing(true);
    openPaystackPayment({
      user: { id: user.id, email: user.email },
      onSuccess: () => {
        setIsProcessing(false);
        setSubStatus(checkUserSubscription(user));
      },
      onClose: () => {
        setIsProcessing(false);
      }
    });
  };

  return (
    <>
      {/* STATE 3: Expired trial -> Show FIRE paywall card EXACT as screenshot */}
      {subStatus.isTrialExpired ? (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0F172A] border border-gray-700 rounded-[24px] p-[24px] text-white shadow-2xl space-y-4 relative overflow-hidden">
            {/* Top badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#facc15] bg-[#3f3a1f] border border-yellow-700/50 w-fit select-none">
              <span>⚠️</span>
              <span>SUBSCRIPTION REQUIRED</span>
            </div>

            <div>
              <h2 className="text-[24px] font-bold text-white leading-tight font-display">
                Your 1 day free trial ended - Pay R60 to continue
              </h2>

              {/* Yellow box ONLY if email in used_trial_emails DB & never paid */}
              {subStatus.showYellowBox && (
                <div className="mt-3 p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-[#facc15] text-xs sm:text-sm font-medium leading-relaxed">
                  {subStatus.smartBlockMessage || `Hey! You already used your 1 free day on ${subStatus.actualTrialEndDate}. NEXOVIAN is R60/month to support all 11 languages. Pay to continue learning! 🔥`}
                </div>
              )}

              <p className="mt-3 text-sm text-[#d1d5db] leading-relaxed font-normal">
                We built NEXOVIAN to help every student understand every subject in their own language. No one is rich and no one is poor.
              </p>
            </div>

            {/* Check list yellow ticks ✓ */}
            <div className="space-y-2.5 py-3 border-y border-gray-800 text-sm text-slate-200">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#facc15] shrink-0" />
                <span>All 11 South African Official Languages</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#facc15] shrink-0" />
                <span>Socratic AI Tutor &amp; Grade 4 to University Coverage</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#facc15] shrink-0" />
                <span>Continuous Feedback Pipeline &amp; Streak Tracking</span>
              </div>
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full h-[52px] rounded-[25px] bg-[#facc15] hover:bg-yellow-400 text-black font-bold text-base flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98 cursor-pointer disabled:opacity-60"
              >
                <span>💳</span>
                <span>Pay R60/month now - Paystack</span>
              </button>
              <p className="mt-2 text-center text-xs text-gray-400 font-normal">
                Cancel anytime • Secure Paystack gateway (R60/month)
              </p>
            </div>

            <div className="pt-1 text-center text-[11px] text-gray-400 font-medium tracking-tight">
              NEXOVIAN (PTY) LTD • Built in Mpumalanga • Level 1 B-BBEE
            </div>
          </div>
        </div>
      ) : (
        /* STATE 2: 1-Day free trial active -> subtle top reminder banner */
        <div className="bg-[#0F172A] border-b border-yellow-400/30 text-white px-4 py-2 text-xs flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="font-bold text-yellow-300">R60 per learner / month - Learn in your language</span>
            <span className="hidden md:inline text-slate-400">
              (1-day free trial active: {subStatus.hoursRemainingInTrial}h remaining)
            </span>
          </div>

          <button
            type="button"
            onClick={handlePay}
            className="px-3.5 py-1 rounded-full bg-[#facc15] hover:bg-[#eab308] text-[#0F172A] font-bold text-xs flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer shrink-0"
          >
            <span>Pay R60/month now - Paystack</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </>
  );
};

export default SubscriptionBanner;
