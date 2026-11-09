import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export const RefundPolicyPage: React.FC = () => {
  const { setCurrentTab } = useLearning();

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#222222] font-sans text-center relative pb-16">
      {/* Return Navigation */}
      <div className="bg-black/90 px-4 py-2.5 flex items-center justify-between text-xs text-white border-b border-gray-800">
        <button
          onClick={() => setCurrentTab('home')}
          className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>
        <div className="flex items-center gap-2 text-amber-400 font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CAPS Official Curriculum</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-black text-white px-5 py-14 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display mb-3">
          NEXOVIAN
        </h1>
        <p className="text-lg sm:text-xl font-medium text-gray-200 mb-1">
          Grade 4 to University
        </p>
        <p className="text-lg sm:text-xl font-medium text-amber-400">
          11 South African Languages
        </p>
      </div>

      {/* Card Section */}
      <div className="bg-white max-w-[560px] mx-auto -mt-[30px] mb-8 p-6 sm:p-8 rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-center border border-gray-100/80">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
          Refund &amp; Cancellation Policy
        </h2>

        <div className="text-gray-700 text-sm leading-relaxed space-y-3.5 text-left bg-gray-50 p-4 rounded-xl border border-gray-100">
          <p>
            <strong className="text-gray-900">Cancellation:</strong> Cancel anytime. Access continues until end of month you paid for. No cancellation fee.
          </p>
          <p>
            <strong className="text-gray-900">Refunds:</strong> Because you get a 2-day free trial, subscriptions are generally non-refundable. If charged in error or you did not use service at all and contact us within 7 days, email{' '}
            <a
              href="mailto:samukelomasuku725@gmail.com"
              className="text-[#0077b6] hover:underline font-medium"
            >
              samukelomasuku725@gmail.com
            </a>{' '}
            and we will review within 5 business days.
          </p>
          <p>
            <strong className="text-gray-900">How to Cancel:</strong> Email{' '}
            <a
              href="mailto:samukelomasuku725@gmail.com?subject=CANCEL"
              className="text-[#0077b6] hover:underline font-medium"
            >
              samukelomasuku725@gmail.com
            </a>{' '}
            with subject &quot;CANCEL&quot;.
          </p>
        </div>
      </div>

      {/* Trust & Features Footer */}
      <div className="max-w-md mx-auto px-4 text-xs text-gray-500 space-y-2">
        <p>No card deductions without confirmation • Cancel anytime</p>
        <p>Supports all 11 official South African languages, CAPS curriculum, TVET NATED, and University modules.</p>
        <p className="font-semibold text-gray-600">NEXOVIAN (PTY) LTD • Reg: 2026/845572/07 • Level 1 B-BBEE</p>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
