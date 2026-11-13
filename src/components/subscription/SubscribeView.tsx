/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN SUBSCRIBE VIEW (/subscribe)
 *
 * Protects Study Guide, AI Tutor, Scan & Understand, and Voice Docs:
 * - User must log in / create an account first.
 * - Starts a 2-Day Free Trial via POST /api/paystack/subscribe (R0 today, first R60 billing in 2 days).
 */

import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  CreditCard,
  MessageCircle,
  Zap,
  Globe,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import {
  startTwoDayFreeTrialCheckout,
  SUBSCRIPTION_PLAN_NAME
} from '../../services/paystackService';
import { WHATSAPP_REMIND_URL } from '../../services/antiAbuseService';

interface SubscribeViewProps {
  protectedFeature?: 'Study Guide' | 'AI Tutor' | 'Scan & Understand' | 'Voice Docs' | string;
}

export const SubscribeView: React.FC<SubscribeViewProps> = ({ protectedFeature }) => {
  const { user, isAuthenticated } = useAuth();
  const { setCurrentTab } = useLearning();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleStartTrial = async () => {
    setIsRedirecting(true);
    setErrorMsg(null);
    try {
      const result = await startTwoDayFreeTrialCheckout({
        user,
        onRequireAuth: () => {
          setCurrentTab('login');
          if (typeof window !== 'undefined') {
            window.history.pushState({}, '', '/login');
          }
        }
      });
      if (!result.success && result.error) {
        setErrorMsg(result.error);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Unable to connect to Paystack checkout.');
    } finally {
      setIsRedirecting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10 bg-[#0a0a0a] text-white">
      <div className="w-full max-w-2xl bg-[#0F172A] border border-gray-700/80 rounded-[28px] p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

        {/* Badge & Status Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/15 text-[#fbbf24] border border-amber-400/30 font-mono">
            <Lock className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span>2-Day Free Trial Required</span>
          </div>

          {isAuthenticated && (
            <button
              type="button"
              onClick={() => setCurrentTab('mySubscription')}
              className="text-xs text-amber-300 hover:underline font-semibold cursor-pointer"
            >
              Manage My Subscription &rarr;
            </button>
          )}
        </div>

        {/* Feature Notice */}
        {protectedFeature && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-200 text-xs sm:text-sm font-medium flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              To access <strong className="text-white font-bold">{protectedFeature}</strong>, activate your 2-day free trial (then R60/month). Cancel anytime before 2 days for R0.
            </span>
          </div>
        )}

        {/* Main Title & Value Proposition */}
        <div className="text-center sm:text-left space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight leading-tight">
            Unlock Full Access with {SUBSCRIPTION_PLAN_NAME}
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Full access to South Africa&apos;s leading AI educational platform calibrated for CAPS Grade 4 to 12, Study Guides, TVET Colleges, and University courses in all 11 official languages.
          </p>
        </div>

        {/* Plan Pricing Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0a0a0a] border-2 border-amber-400/40 shadow-inner flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">
              2-Day Free Trial Included
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white font-display">
              R60 <span className="text-base sm:text-lg font-medium text-slate-400">/ month after trial</span>
            </div>
            <p className="text-xs text-slate-400">
              First R60 payment scheduled in 2 days &bull; Cancel before 2 days for R0
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-1.5 shrink-0">
            <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full font-mono">
              <Zap className="w-3.5 h-3.5" />
              <span>Instant Full Access</span>
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              Currency: ZAR (Paystack)
            </span>
          </div>
        </div>

        {/* Feature Check List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3 border-y border-gray-800 text-xs sm:text-sm text-slate-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Full CAPS Grade 12 Study Guides</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Socratic AI Tutor in all 11 SA Languages</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Scan &amp; Understand homework &amp; memos</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Voice-to-Document academic notes</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Official CAPS &amp; NSC Exam Memos</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>One-click cancellation in My Subscription</span>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Single Main Action Button */}
        <div className="space-y-3 pt-1">
          <button
            type="button"
            onClick={handleStartTrial}
            disabled={isRedirecting}
            className="w-full h-[56px] rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 transition-all active:scale-98 cursor-pointer disabled:opacity-60"
          >
            <CreditCard className="w-5 h-5" />
            <span>
              {isRedirecting
                ? 'Connecting Paystack...'
                : 'Start 2-Day Free Trial - Then R60/month'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {!isAuthenticated && (
            <p className="text-center text-xs text-slate-400">
              You will be asked to create an account or log in first before starting your 2-day free trial.
            </p>
          )}
        </div>

        {/* Footer Support Info */}
        <div className="pt-2 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-400">
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>NEXOVIAN (PTY) LTD &bull; Mpumalanga, South Africa</span>
          </div>

          <a
            href={WHATSAPP_REMIND_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Need help? WhatsApp 063 650 8381</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SubscribeView;
