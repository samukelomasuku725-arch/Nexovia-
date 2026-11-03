/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN - 2-DAY FREE TRIAL LANDING PAGE
 * Exact user-specified layout and PayFast checkout
 */

import React from 'react';
import { ArrowLeft, Sparkles, BookOpen } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export const TrialLandingView: React.FC = () => {
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
          <span>PayFast Capitec Business Official Merchant</span>
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

      {/* Card Section: Overlaps hero with -30px margin */}
      <div className="bg-white max-w-[400px] mx-auto -mt-[30px] mb-8 p-[30px_20px] rounded-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-center border border-gray-100/80 px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">
          Start 2-Day Free Trial
        </h2>
        <p className="text-gray-600 text-base font-normal mb-6">
          Then only R60 / month
        </p>
        
        <form action="https://www.payfast.co.za/eng/process" method="post" id="trialLandingForm">
          <input type="hidden" name="merchant_id" value="37812581" />
          <input type="hidden" name="merchant_key" value="obu7uzftfncig" />
          <input type="hidden" name="return_url" value="https://nexovian.group/success" />
          <input type="hidden" name="cancel_url" value="https://nexovian.group/cancel" />
          <input type="hidden" name="notify_url" value="https://nexovian.group/notify" />
          <input type="hidden" name="amount" value="0" />
          <input type="hidden" name="item_name" value="Nexovian Trial" />
          <input type="hidden" name="subscription_type" value="1" />
          <input type="hidden" name="recurring_amount" value="60" />
          <input type="hidden" name="frequency" value="3" />
          <input type="hidden" name="cycles" value="0" />
          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-900 text-white font-bold text-[19px] p-[18px] rounded-[12px] border-none cursor-pointer transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            style={{
              background: 'black',
              color: 'white',
              padding: '18px',
              border: 'none',
              borderRadius: '12px',
              fontSize: '19px',
              fontWeight: 'bold',
              width: '100%',
              cursor: 'pointer'
            }}
          >
            Start 2-Day Free Trial
          </button>
        </form>
        
        <p className="text-[13px] text-[#666666] mt-[15px] leading-relaxed">
          ✓ 2 Days Free ✓ R60/month after ✓ Cancel anytime<br />
          Secure payment by PayFast to Capitec Business
        </p>
      </div>

      {/* Trust & Features Footer */}
      <div className="max-w-md mx-auto px-4 text-xs text-gray-500 space-y-2">
        <p>No immediate charge • Cancel anytime before 48 hours</p>
        <p>Supports all 11 official South African languages, CAPS curriculum, TVET NATED, and University modules.</p>
        <p className="font-semibold text-gray-600">NEXOVIAN (PTY) LTD • Reg: 2026/845572/07 • Level 1 B-BBEE</p>
      </div>
    </div>
  );
};
