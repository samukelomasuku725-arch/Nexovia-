import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  isTestR1Account,
  isUserActive,
  startTestOneRandCheckout
} from '../../services/paystackService';

interface TestOneRandButtonProps {
  className?: string;
}

export const TestOneRandButton: React.FC<TestOneRandButtonProps> = ({ className = '' }) => {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isAuthenticated || !isTestR1Account(user?.email) || isUserActive(user)) {
    return null;
  }

  const handleTestPayR1 = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await startTestOneRandCheckout({
        user: { id: user?.id, email: user?.email, name: user?.name }
      });
      if (!res.success && res.error) {
        setErrorMsg(res.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      <button
        type="button"
        onClick={handleTestPayR1}
        disabled={loading}
        className="w-full py-2.5 px-4 rounded-xl border border-emerald-400/60 bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 transition-colors"
      >
        <span>{loading ? 'Connecting Paystack (R1)...' : 'Test Pay R1'}</span>
      </button>
      {errorMsg && (
        <p className="text-[11px] text-rose-300 text-center">{errorMsg}</p>
      )}
    </div>
  );
};

export default TestOneRandButton;
