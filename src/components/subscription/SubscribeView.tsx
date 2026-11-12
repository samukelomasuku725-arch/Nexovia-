/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN SUBSCRIBE VIEW (/subscribe)
 * 
 * Plan Details:
 * - Plan Code: PLN_suslgrc1q9rtsfi
 * - Plan Name: Nexovian Monthly
 * - Amount: R60/month, Interval: Monthly, Currency: ZAR
 * - Paystack Payment Page: https://paystack.shop/pay/2vrisypa3i
 * 
 * Protects Tutor, Scan & Understand, Voice Docs:
 * If user not ACTIVE, shows this Subscribe page.
 * If ACTIVE, allows access.
 */

import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  MessageCircle,
  ExternalLink,
  KeyRound,
  Zap,
  Globe
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import {
  startPaystackCheckout,
  PAYSTACK_PLAN_CODE,
  PAYSTACK_PLAN_NAME,
  PAYSTACK_PAYMENT_PAGE
} from '../../services/paystackService';
import { WHATSAPP_REMIND_URL } from '../../services/antiAbuseService';

interface SubscribeViewProps {
  protectedFeature?: 'AI Tutor' | 'Scan & Understand' | 'Voice Docs' | string;
}

export const SubscribeView: React.FC<SubscribeViewProps> = ({ protectedFeature }) => {
  const { user } = useAuth();
  const { setCurrentTab } = useLearning();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleSubscribe = async () => {
    setIsRedirecting(true);
    try {
      await startPaystackCheckout({
        user,
        returnUrl: typeof window !== 'undefined' ? `${window.location.origin}/success` : 'https://nexovian.group/success'
      });
    } catch (err) {
      console.error('Subscription redirect error:', err);
      if (typeof window !== 'undefined') {
        window.location.href = PAYSTACK_PAYMENT_PAGE;
      }
    } finally {
      setIsRedirecting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10 bg-[#0a0a0a] text-white">
      <div className="w-full max-w-2xl bg-[#0F172A] border border-gray-700/80 rounded-[28px] p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-6 animate-in fade-in zoom-in-95">
        
        {/* Top Glow Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

        {/* Badge & Lock Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/15 text-[#fbbf24] border border-amber-400/30 font-mono">
            <Lock className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span>Subscription Required</span>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Plan Code: <span className="text-amber-300 font-bold">{PAYSTACK_PLAN_CODE}</span>
          </div>
        </div>

        {/* Feature Notice if redirected from protected page */}
        {protectedFeature && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-200 text-xs sm:text-sm font-medium flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              To access <strong className="text-white font-bold">{protectedFeature}</strong>, an active Nexovian subscription is required.
            </span>
          </div>
        )}

        {/* Main Title & Value Proposition */}
        <div className="text-center sm:text-left space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight leading-tight">
            Unlock Full Access with {PAYSTACK_PLAN_NAME}
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Full access to South Africa&apos;s leading AI educational platform calibrated for CAPS Grade 4 to 12, TVET Colleges, and University courses in all 11 official languages.
          </p>
        </div>

        {/* Plan Pricing Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0a0a0a] border-2 border-amber-400/40 shadow-inner flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-widest block">
              Monthly Recurring Access
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white font-display">
              R60 <span className="text-base sm:text-lg font-medium text-slate-400">/ month</span>
            </div>
            <p className="text-xs text-slate-400">
              Billed monthly via Paystack • Cancel anytime • Zero hidden fees
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-1.5 shrink-0">
            <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full font-mono">
              <Zap className="w-3.5 h-3.5" />
              <span>Instant Auto-Activation</span>
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              Currency: ZAR (South Africa)
            </span>
          </div>
        </div>

        {/* Feature Check List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3 border-y border-gray-800 text-xs sm:text-sm text-slate-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Socratic AI Tutor in all 11 SA Languages</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Scan &amp; Understand handwritten math &amp; memos</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Voice-to-Document academic note generation</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Grade 4 to University &amp; TVET N1–N6 coverage</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Official CAPS &amp; NSC Exam Memos unlocked</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Secure 256-bit encrypted Paystack billing</span>
          </div>
        </div>

        {/* Action Buttons: Subscribe & Start 2-Day Free Trial */}
        <div className="space-y-3 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Button 1: Subscribe R60/month */}
            <button
              type="button"
              onClick={handleSubscribe}
              disabled={isRedirecting}
              className="w-full h-[52px] rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 transition-all active:scale-98 cursor-pointer disabled:opacity-60"
            >
              <CreditCard className="w-4 h-4" />
              <span>{isRedirecting ? 'Connecting Paystack...' : 'Subscribe R60/month'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Button 2: Start 2-Day Free Trial */}
            <button
              type="button"
              onClick={handleSubscribe}
              disabled={isRedirecting}
              className="w-full h-[52px] rounded-2xl bg-slate-800 hover:bg-slate-700 border border-amber-400/50 text-amber-300 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer disabled:opacity-60"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Start 2-Day Free Trial</span>
            </button>
          </div>

          {/* Secondary Actions: Direct Paystack link & Unlock code */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-2 text-xs text-slate-400 font-medium">
            <a
              href={PAYSTACK_PAYMENT_PAGE}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 flex items-center gap-1 underline underline-offset-4"
            >
              <span>Or pay directly on Paystack Checkout Page</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              type="button"
              onClick={() => {
                setCurrentTab('unlock');
                if (typeof window !== 'undefined') window.history.pushState({}, '', '/unlock');
              }}
              className="hover:text-white flex items-center gap-1.5 text-slate-300"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>Have an Unlock Code?</span>
            </button>
          </div>
        </div>

        {/* Footer Support Info */}
        <div className="pt-2 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-400">
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>NEXOVIAN (PTY) LTD • Mpumalanga, South Africa</span>
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
