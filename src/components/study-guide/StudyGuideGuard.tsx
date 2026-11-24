/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN STUDY GUIDE ACCESS GUARD
 * Only logged-in users with an Active 2-Day Free Trial or Active Monthly Subscription
 * can open Study Guide chapters.
 * Non-subscribed users see "Start 2-Day Free Trial to unlock".
 */

import React, { useEffect, useState } from 'react';
import { Lock, Sparkles, ArrowRight, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import {
  checkSupabasePaidAccess,
  isUserActive,
  startTwoDayFreeTrialCheckout,
  syncSubscriptionStatus
} from '../../services/paystackService';
import { supabase } from '../../supabase';
import TestOneRandButton from '../payment/TestOneRandButton';

interface StudyGuideGuardProps {
  children: React.ReactNode;
}

export const StudyGuideGuard: React.FC<StudyGuideGuardProps> = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { setCurrentTab } = useLearning();

  const [hasAccess, setHasAccess] = useState<boolean>(() => isAuthenticated && isUserActive(user));
  const [checking, setChecking] = useState<boolean>(Boolean(isAuthenticated && user?.email));
  const [startingCheckout, setStartingCheckout] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function verifyAccess() {
      if (!isAuthenticated || !user?.email) {
        if (mounted) {
          setHasAccess(false);
          setChecking(false);
        }
        return;
      }

      setChecking(true);

      try {
        const directCheck = await checkSupabasePaidAccess(user.email);
        if (directCheck.isPaid) {
          await syncSubscriptionStatus(directCheck.email || user.email, user.id);
          if (mounted) setHasAccess(true);
          return;
        }

        const synced = await syncSubscriptionStatus(user.email, user.id);
        if (mounted) {
          setHasAccess(Boolean(synced.has_access));
        }
      } catch {
        if (mounted) {
          setHasAccess(Boolean(isAuthenticated && isUserActive(user)));
        }
      } finally {
        if (mounted) setChecking(false);
      }
    }

    verifyAccess();

    const onSubUpdate = () => {
      if (mounted) {
        setHasAccess(Boolean(isAuthenticated && isUserActive(user)));
      }
    };
    window.addEventListener('nexovian-subscription-updated', onSubUpdate);
    return () => {
      mounted = false;
      window.removeEventListener('nexovian-subscription-updated', onSubUpdate);
    };
  }, [isAuthenticated, user?.email, user?.id]);

  if (isLoading || checking) {
    return (
      <div className="min-h-[80vh] bg-[#061128] text-white flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 text-slate-200 text-sm">
          <Loader2 className="w-7 h-7 animate-spin text-[#FFD400]" />
          <span>Checking Study Guide access...</span>
        </div>
      </div>
    );
  }

  if (hasAccess) {
    return <>{children}</>;
  }

  const handleStartTrial = async () => {
    const {
      data: { user: authUser }
    } = await supabase.auth.getUser();
    if (!authUser) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login?next=' + encodeURIComponent(window.location.pathname);
      }
      return;
    }

    setErrorMsg(null);
    setStartingCheckout(true);
    const result = await startTwoDayFreeTrialCheckout({
      user: { id: authUser.id, email: authUser.email },
      onRequireAuth: () => {
        if (typeof window !== 'undefined') {
          window.location.href = '/login?next=' + encodeURIComponent(window.location.pathname);
        }
      }
    });
    if (!result.success && result.error) {
      setErrorMsg(result.error);
    }
    setStartingCheckout(false);
  };

  return (
    <div className="min-h-[85vh] bg-gradient-to-b from-[#061128] via-[#0A1F44] to-[#050D1E] text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full bg-[#0A1F44]/90 border-2 border-[#FFD400]/60 rounded-3xl p-8 sm:p-10 text-center shadow-[0_0_40px_rgba(255,212,0,0.12)] space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#FFD400]/15 border border-[#FFD400]/50 text-[#FFD400] flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
            Start 2-Day Free Trial to unlock
          </h1>
          <p className="text-sm text-slate-200 leading-relaxed">
            Unlock all Grade 12 CAPS, 36 TVET N1–N6, NCV Level 2–4, and 12 Degree Study Guide chapters, formulas, worked examples, and practice questions inside Nexovian.
          </p>
          <p className="text-xs text-[#FFD400] font-semibold">
            2 days free • Then R60/month • Cancel before 2 days for R0
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2 text-left">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <button
          type="button"
          onClick={handleStartTrial}
          disabled={startingCheckout}
          className="w-full min-h-[52px] py-4 px-6 rounded-2xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-base shadow-[0_0_25px_rgba(255,212,0,0.35)] transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          <Sparkles className="w-5 h-5 text-black shrink-0" />
          <span>
            {startingCheckout ? 'Connecting to Paystack...' : 'Start 2-Day Free Trial to unlock'}
          </span>
          <ArrowRight className="w-4 h-4 text-black shrink-0" />
        </button>

        <TestOneRandButton />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1 text-xs">
          {!isAuthenticated && (
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.href = '/login?next=' + encodeURIComponent(window.location.pathname);
                } else {
                  setCurrentTab('login');
                }
              }}
              className="text-[#FFD400] font-bold hover:underline cursor-pointer"
            >
              Already have an account? Log in
            </button>
          )}
          <a
            href="/study-guide"
            onClick={(e) => {
              e.preventDefault();
              setCurrentTab('studyGuide');
              if (typeof window !== 'undefined') window.history.pushState({}, '', '/study-guide');
            }}
            className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Grade 12 Study Guide</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StudyGuideGuard;
