/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SERVER-SIDE RATE LIMITING & SUBSCRIPTION TIER ARCHITECTURE
 * 
 * Supports:
 * - Free vs Premium tier limits
 * - Per-user & per-guest quota tracking
 * - Minute burst throttling
 * - Automated abuse & spam protection
 */

export type UserSubscriptionTier = 'free' | 'premium';

interface RateLimitRecord {
  countMinute: number;
  minuteReset: number;
  countDay: number;
  dayReset: number;
  lastMessageHash?: string;
  duplicateCount?: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

export const TIER_LIMITS = {
  free: {
    maxPerMinute: 10,
    maxPerDay: 35,
    label: 'Nexovia Free Learner'
  },
  premium: {
    maxPerMinute: 30,
    maxPerDay: 300,
    label: 'Nexovia Scholar Premium'
  }
};

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  dailyLimit: number;
  dailyRemaining: number;
  resetSeconds: number;
  tier: UserSubscriptionTier;
  error?: string;
}

export function checkRateLimit(
  userId: string,
  tier: UserSubscriptionTier = 'free',
  messageContent?: string
): RateLimitResult {
  const now = Date.now();
  const oneMinute = 60 * 1000;
  const oneDay = 24 * 60 * 60 * 1000;

  const limits = TIER_LIMITS[tier] || TIER_LIMITS.free;

  let record = rateLimitStore.get(userId);

  if (!record) {
    record = {
      countMinute: 0,
      minuteReset: now + oneMinute,
      countDay: 0,
      dayReset: now + oneDay,
      duplicateCount: 0
    };
    rateLimitStore.set(userId, record);
  }

  // Reset 1-minute window if expired
  if (now > record.minuteReset) {
    record.countMinute = 0;
    record.minuteReset = now + oneMinute;
    record.duplicateCount = 0;
  }

  // Reset 24-hour window if expired
  if (now > record.dayReset) {
    record.countDay = 0;
    record.dayReset = now + oneDay;
  }

  // Automated abuse protection: duplicate rapid submission detector
  if (messageContent) {
    const hash = messageContent.trim().toLowerCase().slice(0, 100);
    if (record.lastMessageHash === hash) {
      record.duplicateCount = (record.duplicateCount || 0) + 1;
      if (record.duplicateCount > 3) {
        return {
          allowed: false,
          limit: limits.maxPerMinute,
          remaining: 0,
          dailyLimit: limits.maxPerDay,
          dailyRemaining: Math.max(0, limits.maxPerDay - record.countDay),
          resetSeconds: 15,
          tier,
          error: 'Rapid duplicate inquiries detected. Please wait a moment before sending another message.'
        };
      }
    } else {
      record.lastMessageHash = hash;
      record.duplicateCount = 0;
    }
  }

  // Check burst limit
  if (record.countMinute >= limits.maxPerMinute) {
    const waitSec = Math.ceil((record.minuteReset - now) / 1000);
    return {
      allowed: false,
      limit: limits.maxPerMinute,
      remaining: 0,
      dailyLimit: limits.maxPerDay,
      dailyRemaining: Math.max(0, limits.maxPerDay - record.countDay),
      resetSeconds: waitSec,
      tier,
      error: `Too many AI requests. Please wait ${waitSec} seconds before asking your next question.`
    };
  }

  // Check daily limit
  if (record.countDay >= limits.maxPerDay) {
    const waitHours = Math.ceil((record.dayReset - now) / (1000 * 60 * 60));
    return {
      allowed: false,
      limit: limits.maxPerMinute,
      remaining: 0,
      dailyLimit: limits.maxPerDay,
      dailyRemaining: 0,
      resetSeconds: Math.ceil((record.dayReset - now) / 1000),
      tier,
      error: tier === 'free'
        ? `Daily AI question limit (${limits.maxPerDay} questions) reached for your Free plan. Quota resets in ~${waitHours} hour(s).`
        : `Daily AI usage limit (${limits.maxPerDay} questions) reached. Quota resets in ~${waitHours} hour(s).`
    };
  }

  // Increment counters
  record.countMinute += 1;
  record.countDay += 1;

  return {
    allowed: true,
    limit: limits.maxPerMinute,
    remaining: limits.maxPerMinute - record.countMinute,
    dailyLimit: limits.maxPerDay,
    dailyRemaining: limits.maxPerDay - record.countDay,
    resetSeconds: Math.ceil((record.minuteReset - now) / 1000),
    tier
  };
}

