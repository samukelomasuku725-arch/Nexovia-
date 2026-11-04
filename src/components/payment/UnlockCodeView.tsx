/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN UNLOCK PAGE (/unlock)
 * 
 * Heading: "Enter Your Unlock Code"
 * Inputs: Unlock Code + Phone Number + Button "Unlock My App"
 * Flow:
 * - Calls POST /api/unlock
 * - Error cases: Invalid code, Already used on {date}, Expired
 * - Success: Sets status='used', used_at=NOW(), subscription_start=NOW(), subscription_end=NOW()+30 days
 * - Redirects to /dashboard and shows "Active until {date}"
 * - Small help link: "Need help? WhatsApp 063 650 8381"
 */

import React, { useState, useEffect } from 'react';
import {
  KeyRound,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Lock,
  Sparkles,
  Phone
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { unlockAppWithCodeApi } from '../../services/snapscanSubscriptionService';

const WHATSAPP_URL = 'https://wa.me/27636508381?text=Hi%20Nexovian%2C%20I%20have%20an%20issue%20with%20my%20unlock%20code';

export const UnlockCodeView: React.FC = () => {
  const { setCurrentTab } = useLearning();

  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{
    code: string;
    expiresAtFormatted: string;
  } | null>(null);

  useEffect(() => {
    // Auto-fill code/phone if saved from /paywall
    if (typeof window !== 'undefined') {
      const savedCode = localStorage.getItem('nexovian_last_generated_code');
      const savedPhone = localStorage.getItem('nexovian_last_phone');
      if (savedCode && !code) setCode(savedCode);
      if (savedPhone && !phone) setPhone(savedPhone);

      // Check query param e.g. /unlock?code=NEX-482910
      const params = new URLSearchParams(window.location.search);
      const qCode = params.get('code');
      if (qCode) setCode(qCode.toUpperCase().trim());
      const qPhone = params.get('phone');
      if (qPhone) setPhone(qPhone.trim());
    }
  }, []);

  const handleUnlockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanCode = code.trim().toUpperCase();
    const cleanPhone = phone.trim();

    if (!cleanCode) {
      setErrorMessage('Please enter your unlock code (format: NEX-XXXXXX).');
      return;
    }

    if (!cleanPhone || cleanPhone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter your valid 10-digit phone number (e.g. 0821234567).');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await unlockAppWithCodeApi({
        code: cleanCode,
        phone: cleanPhone
      });

      if (!result.success) {
        setErrorMessage(result.message || 'Invalid code or code already used.');
      } else {
        setSuccessInfo({
          code: cleanCode,
          expiresAtFormatted: result.expires_at_formatted || '30 days from today'
        });

        // Redirect after brief celebration to home/dashboard
        setTimeout(() => {
          setCurrentTab('home');
          if (typeof window !== 'undefined') {
            window.history.pushState({}, '', '/app');
          }
        }, 1600);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Server connection error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1F44] text-white font-sans antialiased selection:bg-[#FFB612] selection:text-black py-10 px-4 sm:px-6 flex flex-col justify-between">
      
      {/* Top Bar */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between pb-6 border-b border-white/10">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => {
            setCurrentTab('landing');
            if (typeof window !== 'undefined') window.history.pushState({}, '', '/');
          }}
        >
          <div className="w-10 h-10 rounded-full bg-[#FFB612] text-black font-black flex items-center justify-center text-lg shadow-lg">
            N
          </div>
          <div>
            <span className="font-display font-black text-xl tracking-wider text-white block leading-tight">
              NEXOVIAN
            </span>
            <span className="text-[10px] text-[#FFB612] font-mono uppercase tracking-wider">
              The Learning Brain
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            setCurrentTab('paywall');
            if (typeof window !== 'undefined') window.history.pushState({}, '', '/paywall');
          }}
          className="text-xs font-bold text-[#FFB612] hover:underline"
        >
          Need a code? Pay R60 &rarr;
        </button>
      </div>

      {/* Main Unlock Card */}
      <main className="max-w-md mx-auto w-full my-auto py-8">
        <div className="bg-[#000000] border-2 border-[#FFB612] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="text-center pb-6 border-b border-white/10">
            <div className="w-16 h-16 rounded-full bg-[#FFB612]/20 border-2 border-[#FFB612] text-[#FFB612] flex items-center justify-center mx-auto mb-4 shadow-xl">
              <KeyRound className="w-8 h-8 text-[#FFB612]" />
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-mono font-bold uppercase mb-2">
              ONE CODE &bull; ONE USE &bull; 30 DAYS
            </div>

            <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
              Enter Your Unlock Code
            </h1>
            <p className="mt-2 text-xs text-white/70">
              Enter the unique 6-digit code generated from your R60 SnapScan payment:
            </p>
          </div>

          {successInfo ? (
            <div className="pt-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-[#007A4D] text-white flex items-center justify-center mx-auto font-black text-2xl shadow-lg">
                ✓
              </div>

              <h2 className="font-display font-black text-2xl text-white">
                Access Granted!
              </h2>

              <div className="p-4 rounded-2xl bg-[#007A4D]/20 border border-[#007A4D] text-emerald-300 text-xs font-bold leading-relaxed">
                <span className="block text-sm text-white font-mono mb-1">Code: {successInfo.code}</span>
                <span>Active until {successInfo.expiresAtFormatted}. Redirecting to your learning dashboard...</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setCurrentTab('home');
                  if (typeof window !== 'undefined') window.history.pushState({}, '', '/app');
                }}
                className="w-full py-3.5 rounded-xl bg-[#007A4D] text-white font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Go to Dashboard Now &rarr;</span>
              </button>
            </div>
          ) : (
            <div className="pt-6">
              {errorMessage && (
                <div className="mb-4 p-3.5 rounded-xl bg-red-500/20 border border-red-500/50 text-red-200 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleUnlockSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/80 font-bold mb-1">
                    Unlock Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NEX-482910"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-mono text-base font-bold placeholder:text-white/30 placeholder:font-sans focus:outline-none focus:border-[#FFB612] tracking-wider text-center"
                  />
                  <span className="text-[10px] text-white/50 font-mono mt-1 block text-center">
                    Format: NEX- followed by 6 digits
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/80 font-bold mb-1">
                    Phone Number (Used for Payment) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0821234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#FFB612]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#007A4D] hover:bg-emerald-600 disabled:opacity-50 text-white font-black text-sm sm:text-base shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01] active:scale-95 mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying Code...</span>
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4" />
                      <span>Unlock My App</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-5 text-center pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentTab('paywall');
                    if (typeof window !== 'undefined') window.history.pushState({}, '', '/paywall');
                  }}
                  className="text-xs text-[#1E88E5] hover:underline font-bold"
                >
                  Don&apos;t have a code yet? Pay R60 on SnapScan to get one &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Small Help Link at bottom */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-emerald-400 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Need help? WhatsApp 063 650 8381</span>
            </a>
          </div>
        </div>
      </main>

      {/* Trust Footer */}
      <footer className="max-w-4xl mx-auto w-full text-center pt-6 border-t border-white/10 text-xs text-white/60">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-white/80">
            <ShieldCheck className="w-4 h-4 text-[#007A4D]" />
            <span>NEXOVIAN (Pty) Ltd &bull; Reg: 2026/234078/07</span>
          </div>
          <span className="text-[11px] text-white/40">
            R60 for 30 days &bull; One code, one use &bull; nexovian.group
          </span>
        </div>
      </footer>
    </div>
  );
};
