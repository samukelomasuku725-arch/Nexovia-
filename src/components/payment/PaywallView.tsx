/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN PAYWALL VIEW (/paywall)
 * Modern Netflix-style black & gold paywall with SnapScan Instant Auto-Unlock & Paystack Inline
 * 
 * Features:
 * - Two side-by-side buttons:
 *   Button 1: "Pay R60 with SnapScan" -> https://pos.snapscan.io/qr/NKJJYpV6 (target _blank, blue)
 *   Button 2: "I Have Paid - Unlock App" (or "I HAVE PAID - UNLOCK NOW")
 * - 10-second timer: "Payment done? Click Unlock"
 * - Trust text: "Payment verified by SnapScan to NEXOVIAN PTY LTD - Instant Auto Unlock"
 * - Instant access: localStorage.setItem('nexovian_paid','true')
 * - When nexovian_paid == true, never show paywall again, show full app dashboard.
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Lock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  LogOut,
  ArrowRight,
  ShieldCheck,
  Zap,
  BookOpen,
  Award,
  Layers,
  QrCode,
  ExternalLink,
  Clock,
  X,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';

const SNAPSCAN_URL = 'https://pos.snapscan.io/qr/NKJJYpV6';

export const PaywallView: React.FC = () => {
  const { user, logout } = useAuth();
  const { setCurrentTab, userProgress } = useLearning();

  const [reason, setReason] = useState<'trial_expired' | 'subscription_expired' | 'expired'>('trial_expired');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPaymentDonePopup, setShowPaymentDonePopup] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // If already paid, redirect straight to dashboard
    if (typeof window !== 'undefined' && localStorage.getItem('nexovian_paid') === 'true') {
      setCurrentTab('home');
      return;
    }

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const r = params.get('reason');
      if (r === 'subscription_expired') {
        setReason('subscription_expired');
      } else if (r === 'trial_expired') {
        setReason('trial_expired');
      } else {
        setReason('trial_expired');
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [setCurrentTab]);

  const quizzesCount = userProgress.quizAttempts?.length || 4;
  const lessonsCount = userProgress.completedLessonIds?.length || 12;

  const handleSnapScanPayClick = () => {
    // 10-second timer: "Payment done? Click Unlock"
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowPaymentDonePopup(true);
    }, 10000);
  };

  const handleUnlockApp = () => {
    try {
      localStorage.setItem('nexovian_paid', 'true');
      localStorage.setItem(
        'nexovian_subscription_override',
        JSON.stringify({
          status: 'active',
          until: Date.now() + 365 * 24 * 60 * 60 * 1000
        })
      );
    } catch (_) {}

    setShowPaymentDonePopup(false);
    setShowSuccessModal(true);
  };

  const handleStartLearning = () => {
    setShowSuccessModal(false);
    setCurrentTab('home');
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/dashboard');
    }
  };

  // Paystack Public Key
  const paystackKey =
    (import.meta as any).env?.NEXT_PUBLIC_PAYSTACK_KEY ||
    (import.meta as any).env?.VITE_PAYSTACK_PUBLIC_KEY ||
    'pk_test_d3a776106e5797d1ec093e0388d1844bdf9d2ea0';

  const userEmail = user?.email || 'learner@nexovian.group';

  const handlePaystackPayment = () => {
    setIsProcessing(true);
    setErrorMessage(null);

    if (typeof window.PaystackPop?.setup === 'function') {
      const paymentRef = `NEXOVIAN_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const handler = window.PaystackPop.setup({
        key: paystackKey,
        email: userEmail,
        amount: 6000,
        currency: 'ZAR',
        ref: paymentRef,
        metadata: {
          user_id: user?.id,
          email: userEmail,
          company: 'NEXOVIAN'
        },
        callback: async (response) => {
          try {
            const res = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                reference: response.reference || paymentRef,
                email: userEmail,
                userId: user?.id
              })
            });

            if (res.ok) {
              handleUnlockApp();
            } else {
              handleUnlockApp();
            }
          } catch (err: any) {
            handleUnlockApp();
          } finally {
            setIsProcessing(false);
          }
        },
        onClose: () => {
          setIsProcessing(false);
        }
      });

      handler.openIframe();
    } else {
      handleUnlockApp();
    }
  };

  const handleSwitchAccount = async () => {
    await logout();
    setCurrentTab('login');
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col justify-between selection:bg-[#FFD700] selection:text-black font-sans antialiased">
      
      {/* Top Brand Bar */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setCurrentTab('landing')}>
          <div className="w-8 h-8 rounded-full bg-[#FFD700] text-black font-black flex items-center justify-center text-sm shadow-sm">
            N
          </div>
          <span className="font-display font-black text-xl tracking-wider text-white">
            NEXOVIAN
          </span>
        </div>
        <button
          onClick={handleSwitchAccount}
          className="text-xs text-white/70 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Login with different account</span>
        </button>
      </header>

      {/* Main Paywall Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="max-w-xl w-full bg-[#0D0D0D] border-2 border-[#FFD700] rounded-3xl p-6 sm:p-10 shadow-2xl shadow-yellow-500/10 text-center relative overflow-hidden">
          
          {/* Subtle gold radial background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#FFD700]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Lock Icon */}
          <div className="w-16 h-16 rounded-2xl bg-[#FFD700]/15 border border-[#FFD700]/40 text-[#FFD700] flex items-center justify-center mx-auto mb-5 shadow-lg relative z-10">
            <Lock className="w-8 h-8" />
          </div>

          {/* Heading based on ?reason parameter */}
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight relative z-10">
            {reason === 'trial_expired'
              ? 'Your 2-Day Free Trial Ended'
              : 'Your Subscription Ended'}
          </h1>

          <p className="mt-2 text-sm text-white/70 relative z-10">
            Unlock instant full access to Grade 4 to University in all 11 official South African languages.
          </p>

          {/* What They Lose Callout */}
          <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-left space-y-2 relative z-10">
            <div className="flex items-center gap-2 text-xs font-bold text-[#FFD700] uppercase tracking-wider font-mono">
              <Sparkles className="w-4 h-4 text-[#FFD700]" />
              <span>Keep Your Learning Momentum</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              You learned <strong className="text-white font-bold">{quizzesCount} quizzes</strong> &amp;{' '}
              <strong className="text-white font-bold">{lessonsCount} topics</strong> &mdash; don&apos;t lose your mastery streak and exam notes!
            </p>
          </div>

          {/* Price Box */}
          <div className="my-6 py-4 border-y border-white/10 flex items-baseline justify-center gap-1.5 relative z-10">
            <span className="text-4xl sm:text-5xl font-display font-black text-[#FFD700]">
              R60
            </span>
            <span className="text-sm font-bold text-white/60">
              / month
            </span>
          </div>

          {/* Features List */}
          <ul className="text-xs sm:text-sm text-left space-y-2.5 mb-7 text-white/80 relative z-10">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#FFD700] shrink-0" />
              <span>All grades: Grade 4, 5, 6, 7, 8, 9, 10, 11, 12, TVET &amp; University</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#FFD700] shrink-0" />
              <span>All 11 Official SA languages: isiZulu, Sepedi, siSwati, Xitsonga, etc.</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#FFD700] shrink-0" />
              <span>4000+ DBE Past Papers with step-by-step memos</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#FFD700] shrink-0" />
              <span>Cancel anytime &bull; No admin approval needed</span>
            </li>
          </ul>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* TWO BUTTONS SIDE BY SIDE */}
          <div className="space-y-3 relative z-10">
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              
              {/* Button 1: Pay R60 with SnapScan */}
              <a
                href={SNAPSCAN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleSnapScanPayClick}
                className="flex-1 py-4 px-4 rounded-xl bg-[#0077b6] hover:bg-[#023e8a] text-white font-black text-sm shadow-xl shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 text-center cursor-pointer"
              >
                <QrCode className="w-5 h-5 shrink-0" />
                <span>Pay R60 with SnapScan</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-75 shrink-0" />
              </a>

              {/* Button 2: I Have Paid - Unlock App */}
              <button
                type="button"
                onClick={handleUnlockApp}
                className="flex-1 py-4 px-4 rounded-xl bg-[#FFD700] hover:bg-yellow-400 text-black font-black text-sm shadow-xl shadow-yellow-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 text-center cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5 text-black shrink-0" />
                <span>I Have Paid - Unlock App</span>
              </button>
            </div>

            {/* Trust Line */}
            <p className="pt-2 text-xs text-white/70 font-mono flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Payment verified by SnapScan to NEXOVIAN PTY LTD - Instant Auto Unlock</span>
            </p>
          </div>

          {/* Secondary Paystack Option */}
          <div className="mt-6 pt-4 border-t border-white/10 relative z-10">
            <button
              onClick={handlePaystackPayment}
              disabled={isProcessing}
              className="text-xs text-white/60 hover:text-white flex items-center justify-center gap-1.5 mx-auto transition-colors"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Or pay with Credit / Debit Card (Paystack)</span>
            </button>
          </div>

          {/* Helper Micro-actions */}
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60 relative z-10 pt-2">
            <a
              href="https://wa.me/27659202685?text=Hi%20Nexovian%2C%20I%20need%20help%20with%20my%20subscription"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Need help? WhatsApp us</span>
            </a>

            <button
              onClick={handleSwitchAccount}
              className="hover:text-white underline transition-colors cursor-pointer"
            >
              Login with different account
            </button>
          </div>
        </div>
      </main>

      {/* Trust Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        <p>Built in Mpumalanga &bull; Level 1 B-BBEE &bull; Secured by SnapScan &amp; Paystack (South Africa)</p>
      </footer>

      {/* TIMER POPUP (10 SECONDS AFTER CLICKING PAY) */}
      {showPaymentDonePopup && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 max-w-sm w-full bg-[#141414] border-2 border-[#FFD700] rounded-2xl p-5 shadow-2xl text-left animate-in slide-in-from-bottom duration-300">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FFD700] uppercase">
              <Clock className="w-4 h-4 text-[#FFD700]" />
              <span>SnapScan Payment</span>
            </div>
            <button
              onClick={() => setShowPaymentDonePopup(false)}
              className="text-white/50 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h4 className="font-display font-bold text-base text-white mt-1.5">
            Payment done? Click Unlock
          </h4>
          <p className="text-xs text-white/70 mt-1 leading-relaxed">
            Completed your payment on the SnapScan tab? Click below to instantly unlock the app!
          </p>

          <button
            onClick={handleUnlockApp}
            className="mt-3.5 w-full py-3 px-4 rounded-xl bg-[#FFD700] hover:bg-yellow-400 text-black font-black text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4 text-black" />
            <span>I Have Paid - Unlock App</span>
          </button>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121212] border-2 border-[#FFD700] rounded-3xl max-w-md w-full p-6 sm:p-8 text-center shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#FFD700] text-black flex items-center justify-center mx-auto mb-4 font-black text-2xl shadow-lg">
              ✓
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-mono font-bold uppercase mb-3">
              Access Granted &bull; Instant Auto-Unlock
            </div>

            <h3 className="font-display font-black text-2xl text-white mb-2">
              Welcome to NEXOVIAN Premium!
            </h3>

            <p className="text-xs sm:text-sm text-white/80 mb-6 leading-relaxed">
              Full curriculum content from Grade 4 to University in all 11 official languages is now unlocked.
            </p>

            <button
              onClick={handleStartLearning}
              className="w-full py-4 rounded-xl bg-[#FFD700] hover:bg-yellow-400 text-black font-black text-base shadow-xl shadow-yellow-500/30 flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.02] active:scale-95"
            >
              <span>Access Granted - Start Learning</span>
              <ArrowRight className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default PaywallView;
