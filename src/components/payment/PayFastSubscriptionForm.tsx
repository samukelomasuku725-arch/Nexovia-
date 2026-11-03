/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN PAYFAST 2-DAY FREE TRIAL SUBSCRIPTION FORM
 * Official merchant integration for https://nexovian.group
 */

import React, { useEffect, useState } from 'react';

interface Props {
  className?: string;
  buttonText?: string;
  showBadges?: boolean;
  asCard?: boolean;
}

export const PayFastSubscriptionForm: React.FC<Props> = ({
  className = '',
  buttonText = 'Start 2-Day Free Trial',
  showBadges = true,
  asCard = false
}) => {
  const [billingDate, setBillingDate] = useState<string>('');

  useEffect(() => {
    // Billing date is today + 2 days
    const d = new Date();
    d.setDate(d.getDate() + 2);
    setBillingDate(d.toISOString().split('T')[0]);
  }, []);

  const formElement = (
    <form
      action="https://www.payfast.co.za/eng/process"
      method="post"
      id="nexovianForm"
      className="w-full flex flex-col items-center"
    >
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
      {billingDate && <input type="hidden" name="billing_date" id="billing_date" value={billingDate} />}

      {/* Button: Black background, white text, padding: 18px, border-radius: 12px, font-size: 19px, bold, full width */}
      <button
        type="submit"
        className="w-full bg-black hover:bg-neutral-900 text-white font-bold text-[19px] p-[18px] rounded-[12px] border-none cursor-pointer transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg"
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
        {buttonText}
      </button>

      {showBadges && (
        <p className="text-[13px] text-[#666666] dark:text-gray-400 mt-[15px] leading-relaxed text-center font-normal">
          ✓ 2 Days Free ✓ R60/month after ✓ Cancel anytime<br />
          Secure payment by PayFast to Capitec Business
        </p>
      )}
    </form>
  );

  if (asCard) {
    return (
      <div
        className={`bg-white text-gray-900 max-w-[400px] mx-auto p-[30px_20px] rounded-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-center border border-gray-100 ${className}`}
        style={{
          background: 'white',
          maxWidth: '400px',
          margin: '-30px auto 30px',
          padding: '30px 20px',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Start 2-Day Free Trial</h2>
        <p className="text-gray-600 mb-6 text-sm">Then only R60 / month</p>
        {formElement}
      </div>
    );
  }

  return (
    <div className={`w-full max-w-lg mx-auto text-center ${className}`}>
      {formElement}
    </div>
  );
};
