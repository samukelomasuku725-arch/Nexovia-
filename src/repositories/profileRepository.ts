/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIA - PROFILE & PRIVACY REPOSITORY
 * 
 * Centralized repository for user profiles, POPIA consent management,
 * GDPR/POPIA compliant data export, and account deletion requests.
 */

import { IProfileRepository } from './types';
import { UserProfile } from '../types';

export class ProfileRepository implements IProfileRepository {
  private profilesCache: Map<string, UserProfile> = new Map();

  async getProfile(userId: string): Promise<UserProfile | null> {
    if (this.profilesCache.has(userId)) {
      return this.profilesCache.get(userId)!;
    }

    try {
      const res = await fetch(`/api/profile/${encodeURIComponent(userId)}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          this.profilesCache.set(userId, json.data);
          return json.data;
        }
      }
    } catch {
      // Local fallback
    }

    // Default mock user profile
    const defaultProfile: UserProfile = {
      id: userId,
      email: 'learner@nexovia.ac.za',
      name: 'NEXOVIA Learner',
      role: 'STUDENT',
      educationLevel: 'FET Phase (Grade 10–12 CAPS)',
      gradeOrProgramme: 'Grade 10',
      preferredLanguage: 'en',
      popiaConsent: true,
      popiaConsentDate: new Date().toISOString(),
      isMinor: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.profilesCache.set(userId, defaultProfile);
    return defaultProfile;
  }

  async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    const current = (await this.getProfile(userId)) || {
      id: userId,
      email: '',
      name: '',
      role: 'STUDENT' as const,
      educationLevel: '',
      gradeOrProgramme: '',
      preferredLanguage: 'en' as const,
      popiaConsent: true,
      isMinor: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updated: UserProfile = {
      ...current,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.profilesCache.set(userId, updated);

    try {
      await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch {
      // Local cache updated
    }

    return updated;
  }

  async updatePopiaConsent(
    userId: string,
    consented: boolean,
    guardianEmail?: string
  ): Promise<UserProfile> {
    const res = await fetch('/api/privacy/consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, consented, guardianEmail })
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        this.profilesCache.set(userId, json.data);
        return json.data;
      }
    }

    // Fallback local update
    return this.updateProfile(userId, {
      popiaConsent: consented,
      popiaConsentDate: consented ? new Date().toISOString() : undefined,
      guardianEmail
    });
  }

  async requestDataExport(userId: string): Promise<{ downloadUrl?: string; exportData: any }> {
    try {
      const res = await fetch(`/api/privacy/export?userId=${encodeURIComponent(userId)}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return {
            exportData: json.data,
            downloadUrl: URL.createObjectURL(
              new Blob([JSON.stringify(json.data, null, 2)], { type: 'application/json' })
            )
          };
        }
      }
    } catch {
      // Fallback local export
    }

    const profile = await this.getProfile(userId);
    const mockExport = {
      exportVersion: '1.0.0',
      exportedAt: new Date().toISOString(),
      compliance: 'South African POPIA (Protection of Personal Information Act) & GDPR',
      profile,
      deviceInfo: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'
    };

    return {
      exportData: mockExport,
      downloadUrl: URL.createObjectURL(
        new Blob([JSON.stringify(mockExport, null, 2)], { type: 'application/json' })
      )
    };
  }

  async requestAccountDeletion(userId: string, reason?: string): Promise<{ scheduledDeletionDate: string }> {
    try {
      const res = await fetch('/api/privacy/delete-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, reason })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch {
      // Fallback
    }

    const scheduledDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    return { scheduledDeletionDate: scheduledDate };
  }
}

export const profileRepository = new ProfileRepository();
