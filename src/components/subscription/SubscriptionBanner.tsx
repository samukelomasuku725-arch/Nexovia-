/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN 2-DAY FREE TRIAL & PAYWALL BANNER
 * 
 * EXACT TIMELINE (SAST UTC+2):
 * - Trial Start: Sunday 02 Nov
 * - Trial End: Tuesday 04 Nov 11:59 PM SAST
 * - Hard Paywall begins: Tuesday 9:00 AM SAST
 * 
 * 3-DAY PROGRESSION:
 * - Day 1 - Sunday: "🎉 Day 1/3 FREE - Welcome to NEXOVIAN! Full access unlocked"
 * - Day 2 - Monday: "🔥 Day 2/3 FREE - Keep going! Payment system goes live today"
 * - Day 3 - Tuesday: "⏰ LAST DAY FREE - Upgrade today for R60/month to keep everything"
 * 
 * ON TUESDAY 9AM (AND AFTER TRIAL EXPIRES) - HARD PAYWALL:
 * - Title: "Your 3-Day Trial Ends Tonight"
 * - Message: "Your progress will be saved. Pay R60/month to continue learning & get your certificates."
 * - Button 1: "Pay R60 & Keep Learning (Live Tuesday 9am)"
 * - Button 2: "Remind me Tuesday 9am on WhatsApp" -> https://wa.me/27636508381?text=REMIND%20ME%20R60
 * - Card: Rounded 24px, dark #0F172A, border gray 1px, padding 24px
 * - Badge: "⚠️ SUBSCRIPTION REQUIRED" - yellow #facc15 on #3f3a1f
 * - Ticks: All 11 SA Languages, Socratic AI Tutor, Continuous Feedback Pipeline
 * - Footer: "NEXOVIAN (PTY) LTD • Built in Mpumalanga • Level 1 B-BBEE"
 */

import React, { useState, useEffect } from 'react';
import {
  Check,
  ArrowRight,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  checkUserSubscription,
  openPaystackPayment,
  startPaystackCheckout,
  SubscriptionStatus,
  SUBSCRIPTION_AMOUNT_ZAR,
  SUBSCRIPTION_PLAN_NAME
} from '../../services/paystackService';
import {
  checkDeepTrialState,
  isAdminUser,
  WHATSAPP_REMIND_URL,
  PREMIUM_TRIAL_ENDS_AT
} from '../../services/antiAbuseService';
import { QrCode, Unlock, KeyRound } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export const SubscriptionBanner: React.FC = () => {
  const { user } = useAuth();
  const { setCurrentTab } = useLearning();
  const [subStatus, setSubStatus] = useState<SubscriptionStatus | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Instant SnapScan paid check: Never show subscription modal
    if (typeof window !== 'undefined' && localStorage.getItem('nexovian_paid') === 'true') {
      setSubStatus(null);
      return;
    }

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
          actualTrialEndDate: deep.actualTrialEndDate || PREMIUM_TRIAL_ENDS_AT,
          smartBlockMessage: deep.smartMessage,
          timelineInfo: deep.timelineInfo
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

  const timeline = subStatus.timelineInfo;
  const isPaywallActive = subStatus.isTrialExpired || timeline?.isHardPaywall;

  return (
    <>
      {/* ========================================================
          HARD PAYWALL CARD (ON TUESDAY 9AM OR TRIAL EXPIRED)
          Exact Design: Rounded 24px, #0F172A, border gray 1px, p-24px
         ======================================================== */}
      {isPaywallActive ? (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-[#0F172A] border border-gray-700 rounded-[24px] p-[24px] text-white shadow-2xl space-y-4 relative overflow-hidden my-auto animate-in fade-in zoom-in-95">
            {/* Top badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#facc15] bg-[#3f3a1f] border border-yellow-700/50 w-fit select-none">
              <span>⚠️</span>
              <span>SUBSCRIPTION REQUIRED</span>
            </div>

            <div>
              <h2 className="text-[24px] font-bold text-white leading-tight font-display">
                {timeline?.hardPaywallTitle || 'Your 2-Day Free Trial Ended'}
              </h2>

              {/* Yellow box ONLY if email in used_trial_emails DB & never paid */}
              {subStatus.showYellowBox && (
                <div className="mt-3 p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-[#facc15] text-xs sm:text-sm font-medium leading-relaxed">
                  {subStatus.smartBlockMessage || `Hey! You already used your 2-Day Free Trial. NEXOVIAN is R60/month to support all 11 languages. Pay to continue learning! 🔥`}
                </div>
              )}

              {/* Message */}
              <p className="mt-2.5 text-sm sm:text-[15px] font-medium text-amber-300 leading-snug">
                Your progress will be saved. Pay R60/month to continue learning.
              </p>

              <p className="mt-2 text-xs sm:text-sm text-[#d1d5db] leading-relaxed font-normal">
                We built NEXOVIAN to help every student understand every subject in their own language. No one is rich and no one is poor.
              </p>
            </div>

            {/* Check list yellow ticks ✓ */}
            <div className="space-y-2 py-3 border-y border-gray-800 text-xs sm:text-sm text-slate-200">
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

            {/* Action Buttons: Paystack Subscribe R60, SnapScan & Unlock Code */}
            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={() => startPaystackCheckout({ user })}
                className="w-full h-[50px] rounded-[25px] bg-[#FFB612] hover:bg-yellow-400 text-black font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20 transition-all active:scale-98 cursor-pointer"
              >
                <span>Subscribe R60/month</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => window.open('https://pos.snapscan.io/qr/NKJJYpV6', '_blank')}
                  className="w-full h-[46px] rounded-[23px] bg-[#0077b6] hover:bg-[#023e8a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 cursor-pointer"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Pay with SnapScan</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentTab('unlock');
                    if (typeof window !== 'undefined') {
                      window.history.pushState({}, '', '/unlock');
                    }
                  }}
                  className="w-full h-[46px] rounded-[23px] bg-slate-800 hover:bg-slate-700 border border-gray-700 text-slate-200 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 cursor-pointer"
                >
                  <KeyRound className="w-4 h-4 text-amber-400" />
                  <span>Enter Code to Unlock</span>
                </button>
              </div>

              {/* Button 2: "Remind me Tuesday 9am on WhatsApp" */}
              <a
                href={WHATSAPP_REMIND_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-[48px] rounded-[25px] bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/50 text-[#4ade80] hover:text-[#22c55e] font-bold text-sm sm:text-[15px] flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Remind me Tuesday 9am on WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>

            <div className="pt-1 text-center text-[11px] text-gray-400 font-medium tracking-tight">
              NEXOVIAN (PTY) LTD • Built in Mpumalanga • Level 1 B-BBEE
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================
            STATE 2: 3-DAY FREE TRIAL ACTIVE BANNER (SUN - TUE)
            Day 1: "🎉 Day 1/3 FREE - Welcome to NEXOVIAN! Full access unlocked"
            Day 2: "🔥 Day 2/3 FREE - Keep going! Payment system goes live today"
            Day 3: "⏰ LAST DAY FREE - Upgrade today for R60/month to keep everything"
           ======================================================== */
        <div className="bg-[#0F172A] border-b border-yellow-400/30 text-white px-3 sm:px-4 py-2.5 text-xs flex flex-col md:flex-row items-center justify-between gap-2.5 transition-all">
          <div className="flex items-center gap-2 text-center md:text-left">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse shrink-0" />
            <span className="font-bold text-yellow-300 sm:text-[13px]">
              {timeline?.bannerMessage || '🎉 Day 1/2 FREE - Welcome to NEXOVIAN! Full access unlocked'}
            </span>
            <span className="hidden lg:inline text-slate-400 font-medium text-[11px]">
              (2-Day Free Trial · R60/month)
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={WHATSAPP_REMIND_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-medium text-[11px] flex items-center gap-1 transition-all"
              title="Get a WhatsApp reminder before the trial ends"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp Reminder</span>
            </a>

            <button
              type="button"
              onClick={() => startPaystackCheckout({ user })}
              className="px-3.5 py-1.5 rounded-full bg-[#FFB612] hover:bg-yellow-400 text-black font-extrabold text-xs flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer shadow-sm"
            >
              <span>Subscribe R60/month</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SubscriptionBanner;
