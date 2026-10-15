/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * BrightPath Language Engine - Core Controlled Vocabulary Service
 * 
 * CORE RULES:
 * 1. Prioritize controlled, verified Xitsonga vocabulary instead of freely inventing translations.
 * 2. If a verified translation exists, return and use it exactly.
 * 3. If no verified translation exists, DO NOT confidently invent one.
 * 4. Mark unverified phrases as requiring verification.
 * 5. Keep the original English meaning available.
 * 6. Never silently replace a verified Xitsonga phrase with an AI-generated alternative.
 * 7. Normal learners must NOT be able to modify the verified language database.
 */

import {
  LanguageRecord,
  LanguageLookupResult,
  LanguageAuditLog,
  LanguageEngineStats,
  LanguageEntryStatus
} from '../../types/language';
import { INITIAL_XITSONGA_DATASET } from '../../data/xitsongaLanguageData';

const STORAGE_KEY = 'brightpath_language_phrases_v1';
const AUDIT_STORAGE_KEY = 'brightpath_language_audit_v1';

export class LanguageEngineService {
  private phrases: Map<string, LanguageRecord> = new Map();
  private auditLogs: LanguageAuditLog[] = [];

  constructor() {
    this.init();
  }

  private init() {
    // 1. Populate initial verified native dataset
    for (const record of INITIAL_XITSONGA_DATASET) {
      this.phrases.set(record.id, { ...record });
    }

    // 2. Load any local persisted admin overrides or additions
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: LanguageRecord[] = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            for (const item of parsed) {
              if (item && item.id) {
                this.phrases.set(item.id, item);
              }
            }
          }
        }

        const storedAudit = localStorage.getItem(AUDIT_STORAGE_KEY);
        if (storedAudit) {
          const parsedAudit: LanguageAuditLog[] = JSON.parse(storedAudit);
          if (Array.isArray(parsedAudit)) {
            this.auditLogs = parsedAudit;
          }
        }
      } catch (err) {
        console.warn('LanguageEngine: Could not read local storage', err);
      }
    }
  }

  private persist() {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const list = Array.from(this.phrases.values());
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(this.auditLogs));
      } catch (err) {
        console.warn('LanguageEngine: Could not persist to local storage', err);
      }
    }
  }

  /**
   * Normalize text for consistent lexical lookup
   */
  private normalize(str: string): string {
    return str
      .toLowerCase()
      .trim()
      .replace(/[?!.,;:’'"“”]/g, '')
      .replace(/\s+/g, ' ');
  }

  /**
   * Look up a phrase in the language engine.
   * Prioritizes controlled verified Xitsonga vocabulary.
   */
  public lookup(
    text: string,
    language: string = 'xhitsonga'
  ): LanguageLookupResult {
    const clean = (text || '').trim();
    if (!clean) {
      return {
        found: false,
        matchType: 'none',
        english: '',
        xitsonga: null,
        badge: 'AI-GENERATED / UNVERIFIED',
        pronunciation: '',
        status: 'unverified',
        source: 'unmatched',
        requiresVerificationNotice: true
      };
    }

    const norm = this.normalize(clean);
    const langKey = language.toLowerCase();

    // 1. Check exact English match
    for (const record of this.phrases.values()) {
      if (
        record.language.toLowerCase().includes(langKey) ||
        langKey.includes(record.language.toLowerCase()) ||
        langKey === 'ts' ||
        langKey === 'xitsonga'
      ) {
        if (record.english.trim().toLowerCase() === clean.toLowerCase()) {
          return this.buildResult(record, 'exact');
        }
      }
    }

    // 2. Check normalized English match
    for (const record of this.phrases.values()) {
      if (
        record.language.toLowerCase().includes(langKey) ||
        langKey.includes(record.language.toLowerCase()) ||
        langKey === 'ts' ||
        langKey === 'xitsonga'
      ) {
        if (this.normalize(record.english) === norm) {
          return this.buildResult(record, 'normalized');
        }
      }
    }

    // 3. Check exact Xitsonga match (reverse lookup)
    for (const record of this.phrases.values()) {
      if (record.xitsonga && record.xitsonga.trim().toLowerCase() === clean.toLowerCase()) {
        return this.buildResult(record, 'exact');
      }
    }

    // 4. Check normalized Xitsonga match
    for (const record of this.phrases.values()) {
      if (record.xitsonga && this.normalize(record.xitsonga) === norm) {
        return this.buildResult(record, 'normalized');
      }
    }

    // 5. No controlled entry found -> DO NOT invent a translation!
    return {
      found: false,
      matchType: 'none',
      english: clean,
      xitsonga: null,
      badge: 'AI-GENERATED / UNVERIFIED',
      pronunciation: '',
      status: 'unverified',
      source: 'unmatched',
      requiresVerificationNotice: true
    };
  }

  /**
   * getVerifiedTranslation:
   * Prioritizes controlled, verified Xitsonga vocabulary.
   * If a verified translation exists, returns it exactly as stored.
   * If no verified translation exists, DO NOT invent one -> returns "Translation not yet verified."
   */
  public getVerifiedTranslation(
    englishText: string,
    targetLanguage: string = 'xhitsonga'
  ): {
    translation: string;
    isVerified: boolean;
    status: LanguageEntryStatus;
    english: string;
    xitsonga: string | null;
    entry?: LanguageRecord;
    message?: string;
  } {
    const lookupResult = this.lookup(englishText, targetLanguage);

    if (lookupResult.found && lookupResult.status === 'verified' && lookupResult.xitsonga) {
      return {
        translation: lookupResult.xitsonga,
        isVerified: true,
        status: 'verified',
        english: lookupResult.english,
        xitsonga: lookupResult.xitsonga,
        entry: lookupResult.entry,
        message: 'Verified native translation retrieved successfully.'
      };
    }

    if (lookupResult.found && lookupResult.status === 'needs_verification') {
      return {
        translation: 'Translation not yet verified.',
        isVerified: false,
        status: 'needs_verification',
        english: lookupResult.english,
        xitsonga: null,
        entry: lookupResult.entry,
        message: 'This term is tracked in BrightPath but awaits native verification.'
      };
    }

    return {
      translation: 'Translation not yet verified.',
      isVerified: false,
      status: 'unverified',
      english: englishText,
      xitsonga: null,
      message: 'No verified translation exists in the controlled dictionary.'
    };
  }

  private buildResult(
    entry: LanguageRecord,
    matchType: 'exact' | 'normalized'
  ): LanguageLookupResult {
    const isVerified = entry.status === 'verified' && Boolean(entry.xitsonga && entry.xitsonga.trim());
    const isPending = entry.status === 'needs_verification' || !entry.xitsonga || !entry.xitsonga.trim();

    return {
      found: true,
      matchType,
      entry,
      english: entry.english,
      xitsonga: isVerified ? entry.xitsonga : null,
      badge: isVerified
        ? 'VERIFIED XITSONGA'
        : isPending
        ? 'NEEDS VERIFICATION'
        : 'AI-GENERATED / UNVERIFIED',
      pronunciation: entry.pronunciation || '',
      status: entry.status,
      source: entry.source,
      audioUrl: entry.audioUrl,
      audioStatus: entry.audioStatus || 'unavailable',
      pronunciationStatus: entry.pronunciationStatus || 'unavailable',
      voiceSource: entry.voiceSource,
      requiresVerificationNotice: !isVerified
    };
  }

  /**
   * Search and filter all phrases
   */
  public getAllPhrases(filter?: {
    category?: string;
    status?: LanguageEntryStatus;
    query?: string;
  }): LanguageRecord[] {
    let list = Array.from(this.phrases.values());

    if (filter?.category && filter.category !== 'all') {
      list = list.filter((p) => p.category.toLowerCase() === filter.category?.toLowerCase());
    }

    if (filter?.status && filter.status !== ('all' as any)) {
      list = list.filter((p) => p.status === filter.status);
    }

    if (filter?.query && filter.query.trim()) {
      const q = this.normalize(filter.query);
      list = list.filter(
        (p) =>
          this.normalize(p.english).includes(q) ||
          this.normalize(p.xitsonga).includes(q) ||
          this.normalize(p.category).includes(q) ||
          this.normalize(p.notes).includes(q)
      );
    }

    return list.sort((a, b) => a.id.localeCompare(b.id));
  }

  /**
   * Return verified phrases only
   */
  public getVerifiedPhrases(): LanguageRecord[] {
    return Array.from(this.phrases.values()).filter(
      (p) => p.status === 'verified' && Boolean(p.xitsonga && p.xitsonga.trim())
    );
  }

  /**
   * Return phrases that need verification
   */
  public getNeedsVerificationPhrases(): LanguageRecord[] {
    return Array.from(this.phrases.values()).filter(
      (p) => p.status === 'needs_verification' || !p.xitsonga || !p.xitsonga.trim()
    );
  }

  /**
   * Find all verified phrases that appear inside a given sentence/paragraph
   */
  public findMatchingVerifiedPhrases(text: string): LanguageRecord[] {
    if (!text || typeof text !== 'string') return [];
    const lower = text.toLowerCase();
    const matches: LanguageRecord[] = [];

    for (const record of this.phrases.values()) {
      if (record.status === 'verified' && record.xitsonga) {
        const engLower = record.english.toLowerCase();
        const xitLower = record.xitsonga.toLowerCase();
        if (
          lower.includes(engLower) ||
          lower.includes(xitLower)
        ) {
          matches.push(record);
        }
      }
    }
    return matches;
  }

  /**
   * Get stats about the language engine
   */
  public getStats(): LanguageEngineStats {
    const all = Array.from(this.phrases.values());
    const verified = all.filter((p) => p.status === 'verified' && Boolean(p.xitsonga));
    const needsVerification = all.filter((p) => p.status === 'needs_verification' || !p.xitsonga);
    const verifiedAudio = all.filter((p) => p.audioStatus === 'verified' && Boolean(p.audioUrl));
    const verifiedPronunciation = all.filter((p) => p.pronunciationStatus === 'verified' && Boolean(p.pronunciation));
    const categories = new Set(all.map((p) => p.category));

    return {
      totalPhrases: all.length,
      verifiedCount: verified.length,
      needsVerificationCount: needsVerification.length,
      verifiedAudioCount: verifiedAudio.length,
      verifiedPronunciationCount: verifiedPronunciation.length,
      categoriesCount: categories.size,
      language: 'Xitsonga (Xitsonga / XiTsonga)',
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * ADMIN OPERATION: Update or upload audio recording
   * Security & Anti-Hallucination: AI-generated voices cannot automatically receive 'verified' status.
   */
  public adminUpdateAudio(
    id: string,
    audioData: {
      audioUrl: string;
      audioStatus: 'unavailable' | 'pending_verification' | 'verified';
      voiceSource?: 'native_speaker' | 'ai_generated' | 'curriculum_specialist' | 'unspecified';
    },
    userContext: { role?: string; email?: string }
  ): { success: boolean; data?: LanguageRecord; error?: string } {
    const role = (userContext.role || '').toUpperCase();
    if (role !== 'ADMIN' && role !== 'SUPER_ADMIN' && role !== 'CURRICULUM_ADMIN') {
      return { success: false, error: 'Unauthorized: Administrative role required to upload audio.' };
    }

    const existing = this.phrases.get(id);
    if (!existing) {
      return { success: false, error: 'Phrase not found.' };
    }

    // STRICT PHASE 2 INVARIANT: AI voices must remain 'pending_verification' until human reviewed
    let safeAudioStatus = audioData.audioStatus;
    if (audioData.voiceSource === 'ai_generated' && safeAudioStatus === 'verified') {
      safeAudioStatus = 'pending_verification';
    }

    const updated: LanguageRecord = {
      ...existing,
      audioUrl: audioData.audioUrl,
      audioStatus: safeAudioStatus,
      voiceSource: audioData.voiceSource || 'native_speaker',
      verifiedBy: safeAudioStatus === 'verified' ? userContext.email || 'Administrator' : existing.verifiedBy,
      verifiedAt: safeAudioStatus === 'verified' ? new Date().toISOString() : existing.verifiedAt,
      version: (existing.version || 1) + 1,
      updatedAt: new Date().toISOString()
    };

    this.phrases.set(id, updated);
    this.auditLogs.unshift({
      id: `audit_${Date.now()}`,
      phraseId: id,
      action: safeAudioStatus === 'verified' ? 'audio_verified' : 'audio_uploaded',
      changedBy: userContext.email || 'Administrator',
      previousData: existing,
      newData: {
        audioUrl: updated.audioUrl,
        audioStatus: updated.audioStatus,
        voiceSource: updated.voiceSource
      },
      reason: safeAudioStatus === 'verified' ? 'Verified audio recording approved' : 'Audio recording uploaded for verification',
      timestamp: new Date().toISOString()
    });

    this.persist();
    return { success: true, data: updated };
  }

  /**
   * ADMIN OPERATION: Delete audio recording
   */
  public adminDeleteAudio(
    id: string,
    userContext: { role?: string; email?: string }
  ): { success: boolean; data?: LanguageRecord; error?: string } {
    const role = (userContext.role || '').toUpperCase();
    if (role !== 'ADMIN' && role !== 'SUPER_ADMIN' && role !== 'CURRICULUM_ADMIN') {
      return { success: false, error: 'Unauthorized: Administrative role required to delete audio.' };
    }

    const existing = this.phrases.get(id);
    if (!existing) {
      return { success: false, error: 'Phrase not found.' };
    }

    const updated: LanguageRecord = {
      ...existing,
      audioUrl: undefined,
      audioStatus: 'unavailable',
      voiceSource: undefined,
      version: (existing.version || 1) + 1,
      updatedAt: new Date().toISOString()
    };

    this.phrases.set(id, updated);
    this.auditLogs.unshift({
      id: `audit_${Date.now()}`,
      phraseId: id,
      action: 'audio_deleted',
      changedBy: userContext.email || 'Administrator',
      previousData: existing,
      newData: { audioStatus: 'unavailable' },
      reason: 'Audio removed by administrator',
      timestamp: new Date().toISOString()
    });

    this.persist();
    return { success: true, data: updated };
  }

  /**
   * ADMIN OPERATION: Update pronunciation
   */
  public adminUpdatePronunciation(
    id: string,
    data: {
      pronunciation: string;
      pronunciationStatus: 'unavailable' | 'pending_verification' | 'verified';
    },
    userContext: { role?: string; email?: string }
  ): { success: boolean; data?: LanguageRecord; error?: string } {
    const role = (userContext.role || '').toUpperCase();
    if (role !== 'ADMIN' && role !== 'SUPER_ADMIN' && role !== 'CURRICULUM_ADMIN') {
      return { success: false, error: 'Unauthorized: Administrative role required to update pronunciation.' };
    }

    const existing = this.phrases.get(id);
    if (!existing) {
      return { success: false, error: 'Phrase not found.' };
    }

    const updated: LanguageRecord = {
      ...existing,
      pronunciation: data.pronunciation.trim(),
      pronunciationStatus: data.pronunciationStatus,
      version: (existing.version || 1) + 1,
      updatedAt: new Date().toISOString()
    };

    this.phrases.set(id, updated);
    this.auditLogs.unshift({
      id: `audit_${Date.now()}`,
      phraseId: id,
      action: data.pronunciationStatus === 'verified' ? 'verified' : 'updated',
      changedBy: userContext.email || 'Administrator',
      previousData: existing,
      newData: {
        pronunciation: updated.pronunciation,
        pronunciationStatus: updated.pronunciationStatus
      },
      reason: 'Pronunciation updated by administrator',
      timestamp: new Date().toISOString()
    });

    this.persist();
    return { success: true, data: updated };
  }

  /**
   * Get specific phrase by ID
   */
  public getPhraseById(id: string): LanguageRecord | undefined {
    return this.phrases.get(id);
  }

  /**
   * ADMIN OPERATION: Add new phrase
   * Security: Requires administrative role check. Normal learners cannot modify.
   */
  public adminAddPhrase(
    data: {
      english: string;
      xitsonga: string;
      pronunciation?: string;
      category: string;
      status: LanguageEntryStatus;
      source: string;
      example?: string;
      notes?: string;
    },
    userContext: { role?: string; email?: string }
  ): { success: boolean; data?: LanguageRecord; error?: string } {
    const role = (userContext.role || '').toUpperCase();
    if (role !== 'ADMIN' && role !== 'SUPER_ADMIN' && role !== 'CURRICULUM_ADMIN') {
      return {
        success: false,
        error: 'Unauthorized: Administrative role required to modify the verified language dataset.'
      };
    }

    if (!data.english || !data.english.trim()) {
      return { success: false, error: 'English phrase is required.' };
    }

    const id = `ts_custom_${Date.now()}`;
    const newRecord: LanguageRecord = {
      id,
      language: 'xhitsonga',
      english: data.english.trim(),
      xitsonga: (data.xitsonga || '').trim(),
      pronunciation: (data.pronunciation || '').trim(),
      category: data.category || 'everyday',
      status: data.status,
      source: data.source || `admin_${userContext.email || 'verified'}`,
      example: (data.example || '').trim(),
      notes: (data.notes || '').trim(),
      verifiedBy: data.status === 'verified' ? userContext.email || 'Administrator' : undefined,
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.phrases.set(id, newRecord);

    const audit: LanguageAuditLog = {
      id: `audit_${Date.now()}`,
      phraseId: id,
      action: 'created',
      changedBy: userContext.email || 'Administrator',
      newData: newRecord,
      timestamp: new Date().toISOString(),
      reason: 'Admin added new terminology entry'
    };
    this.auditLogs.unshift(audit);

    this.persist();
    return { success: true, data: newRecord };
  }

  /**
   * ADMIN OPERATION: Update existing phrase
   * Security: Requires administrative role check. Normal learners cannot modify.
   */
  public adminUpdatePhrase(
    id: string,
    updates: Partial<LanguageRecord>,
    userContext: { role?: string; email?: string },
    reason?: string
  ): { success: boolean; data?: LanguageRecord; error?: string } {
    const role = (userContext.role || '').toUpperCase();
    if (role !== 'ADMIN' && role !== 'SUPER_ADMIN' && role !== 'CURRICULUM_ADMIN') {
      return {
        success: false,
        error: 'Unauthorized: Administrative role required to modify the verified language dataset.'
      };
    }

    const existing = this.phrases.get(id);
    if (!existing) {
      return { success: false, error: 'Phrase not found.' };
    }

    const previousData = { ...existing };
    const updated: LanguageRecord = {
      ...existing,
      ...updates,
      id: existing.id, // Prevent ID mutation
      language: existing.language,
      version: (existing.version || 1) + 1,
      updatedAt: new Date().toISOString()
    };

    if (updates.status === 'verified' && existing.status !== 'verified') {
      updated.verifiedBy = userContext.email || 'Administrator';
    }

    this.phrases.set(id, updated);

    const audit: LanguageAuditLog = {
      id: `audit_${Date.now()}`,
      phraseId: id,
      action: updates.status === 'verified' ? 'verified' : 'updated',
      changedBy: userContext.email || 'Administrator',
      previousData,
      newData: updates,
      timestamp: new Date().toISOString(),
      reason: reason || 'Admin updated phrase details'
    };
    this.auditLogs.unshift(audit);

    this.persist();
    return { success: true, data: updated };
  }

  /**
   * Get audit log history for a phrase or all phrases
   */
  public getAuditHistory(phraseId?: string): LanguageAuditLog[] {
    if (phraseId) {
      return this.auditLogs.filter((a) => a.phraseId === phraseId);
    }
    return [...this.auditLogs];
  }
}

export const languageEngine = new LanguageEngineService();

/**
 * Reusable helper function matching requirement:
 * getVerifiedTranslation(englishText, targetLanguage)
 */
export function getVerifiedTranslation(englishText: string, targetLanguage: string = 'xhitsonga') {
  return languageEngine.getVerifiedTranslation(englishText, targetLanguage);
}

