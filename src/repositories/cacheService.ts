/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIA - IN-MEMORY & DISTRIBUTED CACHE SERVICE
 * 
 * Provides:
 * - High-speed TTL cache for curriculum trees, assessments, and AI prompts
 * - Stale-while-revalidate pattern for mobile performance under spotty connectivity
 * - Clean contract for future migration to Redis / Cloudflare KV / Supabase Edge
 */

import { ICacheService } from './types';

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class CacheService implements ICacheService {
  private store: Map<string, CacheEntry<any>> = new Map();
  private defaultTtlSeconds: number;

  constructor(defaultTtlSeconds = 300) {
    this.defaultTtlSeconds = defaultTtlSeconds;
  }

  async get<T>(key: string): Promise<T | null> {
    const entry = this.store.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }

    return entry.value as T;
  }

  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    const ttl = (ttlSeconds !== undefined ? ttlSeconds : this.defaultTtlSeconds) * 1000;
    this.store.set(key, {
      value,
      expiresAt: Date.now() + ttl
    });
  }

  async delete(key: string): Promise<boolean> {
    return this.store.delete(key);
  }

  async flush(): Promise<void> {
    this.store.clear();
  }
}

export const cacheService = new CacheService();
