/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * FREE PROMOTION ACCESS WINDOW CONFIGURATION
 * Rule 3: Free Access Till Wednesday 12 Nov 2026 23:59 SAST (21:59:59 UTC)
 */

// SAST is UTC+2, so 23:59:59 SAST = 21:59:59Z
export const FREE_TILL_DATE = new Date("2026-11-12T21:59:59Z");

export const FREE_ACCESS_LABEL = "Wed 12 Nov 2026 23:59 SAST";

/**
 * Checks whether the current instant is within the Free Promotion Window.
 */
export function isFreeAccessActive(): boolean {
  return Date.now() < FREE_TILL_DATE.getTime();
}

/**
 * Computes remaining time until free access expires.
 */
export function getFreeAccessRemaining(): {
  isFree: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
} {
  const diff = FREE_TILL_DATE.getTime() - Date.now();
  if (diff <= 0) {
    return {
      isFree: false,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      formatted: "Promotion ended"
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    isFree: true,
    days,
    hours,
    minutes,
    seconds,
    formatted: `${days}d ${hours}h ${minutes}m ${seconds}s`
  };
}
