/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Trial / Promotion Access Configuration
 * Legacy open free-week bypasses are permanently disabled; access requires
 * authenticated account + active Paystack 2-Day Free Trial or Monthly Subscription.
 */

export const FREE_ACCESS_LABEL = "2-Day Free Trial via Paystack";

export function isFreeAccessActive(): boolean {
  return false;
}

export function getFreeAccessRemaining(): {
  isFree: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
} {
  return {
    isFree: false,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    formatted: "2-Day Free Trial Required"
  };
}
