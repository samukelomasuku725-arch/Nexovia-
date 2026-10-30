/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * NEXOVIA Academic Voice Client Service
 */

import {
  AcademicDocument,
  AcademicReferenceItem,
  AcademicVoiceTierStatus
} from '../../types/academicVoice';

const LOCAL_STORAGE_KEY = 'nexovia_academic_docs_cache';
const LOCAL_TIER_KEY = 'nexovia_academic_tier_preference';

export const academicVoiceService = {
  /**
   * Transcribes spoken audio file or recorded base64 blob
   */
  async transcribeAudio(params: {
    audioBase64: string;
    mimeType: string;
    language?: string;
    durationSeconds?: number;
  }): Promise<{ text: string; language: string; wordCount: number }> {
    const res = await fetch('/api/academic-voice/transcribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Speech-to-text service failed to transcribe audio.');
    }

    return {
      text: data.text,
      language: data.language || params.language || 'en',
      wordCount: data.wordCount || (data.text || '').split(/\s+/).filter(Boolean).length
    };
  },

  /**
   * Generates a structured academic document from the student's voice transcript
   */
  async generateDocument(params: {
    transcript: string;
    documentType: string;
    educationSector: 'university' | 'tvet';
    institution: string;
    facultyOrDepartment?: string;
    courseOrProgramme: string;
    moduleCode: string;
    moduleTitle: string;
    title: string;
    studentName: string;
    studentNumber: string;
    lecturerOrAssessor?: string;
    submissionDate?: string;
    targetWordCount: number;
    instructionsOrRubric?: string;
    referencingStyle: 'harvard' | 'apa';
    language?: string;
  }): Promise<any> {
    const res = await fetch('/api/academic-voice/generate-document', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Academic document structuring service failed.');
    }

    return data.data;
  },

  /**
   * Searches and verifies real scholarly literature and statutory sources
   */
  async searchReferences(params: {
    topic: string;
    subject: string;
    moduleCode?: string;
    educationSector: 'university' | 'tvet';
    referencingStyle: 'harvard' | 'apa';
  }): Promise<AcademicReferenceItem[]> {
    const res = await fetch('/api/academic-voice/research-references', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Reference research failed.');
    }

    return data.data || [];
  },

  /**
   * Fetches saved academic documents for the current user
   */
  async getDocuments(): Promise<AcademicDocument[]> {
    try {
      const res = await fetch('/api/academic-voice/documents');
      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.data)) {
        // Cache to localStorage
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.data));
        return data.data;
      }
    } catch (err) {
      console.warn('Network error fetching academic documents from server, reading localStorage fallback:', err);
    }

    // Fallback to localStorage
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}

    return [];
  },

  /**
   * Saves or updates an academic document
   */
  async saveDocument(doc: AcademicDocument): Promise<AcademicDocument> {
    try {
      const res = await fetch('/api/academic-voice/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doc)
      });
      const data = await res.json();
      if (res.ok && data.success && data.document) {
        this.updateLocalCache(data.document);
        return data.document;
      }
    } catch (err) {
      console.warn('Server save failed, saving to localStorage:', err);
    }

    // Fallback to local save
    this.updateLocalCache(doc);
    return doc;
  },

  /**
   * Deletes an academic document by ID
   */
  async deleteDocument(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/academic-voice/documents/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (res.ok && data.success) {
        this.removeFromLocalCache(id);
        return true;
      }
    } catch (err) {
      console.warn('Server delete failed, deleting from localStorage:', err);
    }

    this.removeFromLocalCache(id);
    return true;
  },

  /**
   * Increments the PDF export counter on the server
   */
  async recordPdfExport(id: string): Promise<void> {
    try {
      await fetch(`/api/academic-voice/documents/${id}/export`, {
        method: 'POST'
      });
    } catch {}
  },

  /**
   * Gets tier status (Free vs Premium R60/mo)
   */
  async getTierStatus(): Promise<AcademicVoiceTierStatus> {
    try {
      const res = await fetch('/api/academic-voice/tier-status');
      const data = await res.json();
      if (res.ok && data.success && data.status) {
        return data.status;
      }
    } catch {}

    // Fallback default
    const localTier = (localStorage.getItem(LOCAL_TIER_KEY) as 'free' | 'premium') || 'free';
    const isFree = localTier === 'free';
    return {
      tier: localTier,
      monthlyDocumentLimit: isFree ? 3 : -1,
      documentsCreatedThisMonth: 0,
      remainingDocuments: isFree ? 3 : 999,
      maxRecordingMinutes: isFree ? 5 : 30,
      premiumPriceZar: 60,
      canRecordLongAudio: !isFree,
      canExportHighResPdf: true,
      hasScholarSearchGrounding: true,
      resetDate: 'Next Month 1st'
    };
  },

  /**
   * Sets tier (Free vs Premium R60/mo)
   */
  async setTier(tier: 'free' | 'premium'): Promise<AcademicVoiceTierStatus> {
    localStorage.setItem(LOCAL_TIER_KEY, tier);
    try {
      const res = await fetch('/api/academic-voice/upgrade-tier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier })
      });
      const data = await res.json();
      if (res.ok && data.success && data.status) {
        return data.status;
      }
    } catch {}

    return this.getTierStatus();
  },

  updateLocalCache(doc: AcademicDocument): void {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      let list: AcademicDocument[] = raw ? JSON.parse(raw) : [];
      const idx = list.findIndex((d) => d.id === doc.id);
      if (idx >= 0) {
        list[idx] = doc;
      } else {
        list.unshift(doc);
      }
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    } catch {}
  },

  removeFromLocalCache(id: string): void {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        const list: AcademicDocument[] = JSON.parse(raw);
        const filtered = list.filter((d) => d.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
      }
    } catch {}
  }
};
