/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN STUDY GUIDE ACCESS GUARD
 * Only logged-in users with an Active 2-Day Free Trial or Active Monthly Subscription
 * can view the Study Guide (/study-guide and all chapter pages).
 * Logged-out or inactive users see ONLY the "Start 2-Day Free Trial - Then R60/month" CTA.
 */

import React, { useEffect, useState } from 'react';
import { Lock, Sparkles, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import {
  isUserActive,
  startTwoDayFreeTrialCheckout,
  syncSubscriptionStatus
} from '../../services/paystackService';

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

      const localAllowed = isUserActive(user);
      if (mounted) setHasAccess(localAllowed);

      try {
        await syncSubscriptionStatus(user.email, user.id);
        if (mounted) {
          setHasAccess(isUserActive(user));
        }
      } catch {
        // Keep evaluated state
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
      <div className="min-h-[80vh] bg-[#0a0a0a] text-white flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 text-slate-300 text-sm">
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
    setErrorMsg(null);
    setStartingCheckout(true);
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
    setStartingCheckout(false);
  };

  return (
    <div className="min-h-[85vh] bg-[#0a0a0a] text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full bg-[#111111] border-2 border-[#FFD400]/50 rounded-3xl p-8 sm:p-10 text-center shadow-2xl space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#FFD400]/15 border border-[#FFD400]/40 text-[#FFD400] flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
            Nexovian Study Guide
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Create an account and activate your 2-day free trial to unlock all CAPS Grade 12 Physics and Life Sciences Study Guides. Cancel before 2 days for R0.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2 text-left">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <button
          type="button"
          onClick={handleStartTrial}
          disabled={startingCheckout}
          className="w-full py-4 px-6 rounded-2xl bg-[#FFD400] hover:bg-yellow-400 text-black font-black text-base shadow-[0_0_25px_rgba(255,212,0,0.35)] transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          <Sparkles className="w-5 h-5 text-black shrink-0" />
          <span>
            {startingCheckout
              ? 'Connecting to Paystack...'
              : 'Start 2-Day Free Trial - Then R60/month'}
          </span>
          <ArrowRight className="w-4 h-4 text-black shrink-0" />
        </button>

        {!isAuthenticated && (
          <p className="text-xs text-slate-400">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => {
                setCurrentTab('login');
                if (typeof window !== 'undefined') window.history.pushState({}, '', '/login');
              }}
              className="text-[#FFD400] font-bold hover:underline cursor-pointer"
            >
              Log in here
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default StudyGuideGuard;
