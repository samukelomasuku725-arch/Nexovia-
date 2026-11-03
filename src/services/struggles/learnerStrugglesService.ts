/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN LEARNER STRUGGLES AI SERVICE
 * Detects 2+ failures in the same topic, increments struggle_count,
 * generates AI improvement suggestions & recommended resources,
 * and syncs with Supabase table `learner_struggles`.
 */

import { supabase } from '../../supabase';

export interface LearnerStruggle {
  id: string;
  user_id: string;
  subject: string;
  topic: string;
  struggle_count: number;
  ai_suggestion: string;
  suggested_resource: string;
  is_resolved: boolean;
  updated_at: string;
}

const LOCAL_STRUGGLES_KEY = 'nexovian_learner_struggles_v2_cache';
const TOPIC_FAILURES_KEY = 'nexovian_topic_failures_count_v2';

export const DEFAULT_SEED_STRUGGLES: LearnerStruggle[] = [
  {
    id: 'seed-struggle-1',
    user_id: 'guest_learner',
    subject: 'Physical Sciences',
    topic: "Newton's Second Law (Friction on Incline)",
    struggle_count: 3,
    ai_suggestion: 'When resolving forces on an inclined plane, remember that normal force is N = m·g·cos(θ), NOT just m·g. Always resolve weight into perpendicular (mg cos θ) and parallel (mg sin θ) components before calculating kinetic friction fₖ = μₖ·N.',
    suggested_resource: "CAPS Physical Sciences Grade 11-12: Inclined Planes & Friction Mastery Drill (Worked Solutions)",
    is_resolved: false,
    updated_at: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'seed-struggle-2',
    user_id: 'guest_learner',
    subject: 'Mathematics',
    topic: 'Algebraic Fractions & Negative Exponents',
    struggle_count: 2,
    ai_suggestion: 'Common mistake: Inverting only one term when dividing algebraic fractions. Rule: Factorize numerators and denominators FIRST before canceling anything. Never cancel across a + or - sign without common factoring.',
    suggested_resource: "CAPS Mathematics Grade 10-11 Paper 1: Algebraic Fractions & Factorisation Step-by-Step Guide",
    is_resolved: false,
    updated_at: new Date(Date.now() - 3600000 * 20).toISOString()
  }
];

class LearnerStrugglesService {
  /**
   * Get cached struggles
   */
  private getLocalStruggles(): LearnerStruggle[] {
    if (typeof window === 'undefined') return DEFAULT_SEED_STRUGGLES;
    try {
      const raw = localStorage.getItem(LOCAL_STRUGGLES_KEY);
      if (!raw) {
        localStorage.setItem(LOCAL_STRUGGLES_KEY, JSON.stringify(DEFAULT_SEED_STRUGGLES));
        return DEFAULT_SEED_STRUGGLES;
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : DEFAULT_SEED_STRUGGLES;
    } catch {
      return DEFAULT_SEED_STRUGGLES;
    }
  }

  /**
   * Save local struggles cache
   */
  private saveLocalStruggles(struggles: LearnerStruggle[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(LOCAL_STRUGGLES_KEY, JSON.stringify(struggles));
    } catch (err) {
      console.warn('Failed to cache struggles:', err);
    }
  }

  /**
   * Get internal failure count map for topics: "subject::topic" -> count
   */
  private getTopicFailureCounts(): Record<string, number> {
    if (typeof window === 'undefined') return {};
    try {
      const raw = localStorage.getItem(TOPIC_FAILURES_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  private saveTopicFailureCounts(counts: Record<string, number>): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(TOPIC_FAILURES_KEY, JSON.stringify(counts));
    } catch (err) {
      console.warn('Failed to cache topic failures:', err);
    }
  }

  /**
   * Fetch struggles for user from Supabase and merge with local cache
   */
  async fetchStruggles(userId?: string): Promise<LearnerStruggle[]> {
    const local = this.getLocalStruggles();

    if (!userId || userId === 'guest_learner') {
      return local;
    }

    try {
      const { data, error } = await supabase
        .from('learner_struggles')
        .select('*')
        .eq('user_id', userId)
        .order('struggle_count', { ascending: false });

      if (error) {
        console.warn('[LearnerStruggles] Supabase fetch error:', error.message);
        return local;
      }

      if (Array.isArray(data) && data.length > 0) {
        const mergedMap = new Map<string, LearnerStruggle>();
        data.forEach((s) => mergedMap.set(s.id, s));
        local.forEach((s) => {
          if (!mergedMap.has(s.id)) mergedMap.set(s.id, s);
        });
        const combined = Array.from(mergedMap.values());
        this.saveLocalStruggles(combined);
        return combined;
      }

      return local;
    } catch (err) {
      console.warn('[LearnerStruggles] Error in fetchStruggles:', err);
      return local;
    }
  }

  /**
   * Record a topic failure from a quiz or assessment.
   * If failed 2+ times, generates AI recommendation and inserts/increments in `learner_struggles` table!
   */
  async recordTopicFailure(params: {
    userId?: string;
    subject: string;
    topic: string;
    grade?: string;
    failedQuestions?: string[];
  }): Promise<{ isStruggleRecorded: boolean; struggle?: LearnerStruggle }> {
    const effectiveUserId = params.userId || 'guest_learner';
    const cleanSubject = params.subject.trim() || 'General';
    const cleanTopic = params.topic.trim() || 'General Practice';
    const key = `${cleanSubject.toLowerCase()}::${cleanTopic.toLowerCase()}`;

    // 1. Increment topic failure count
    const failureCounts = this.getTopicFailureCounts();
    const currentCount = (failureCounts[key] || 0) + 1;
    failureCounts[key] = currentCount;
    this.saveTopicFailureCounts(failureCounts);

    console.log(`[LearnerStruggles] Topic "${cleanTopic}" failure count is now ${currentCount}`);

    // If failed less than 2 times, don't trigger struggle yet
    if (currentCount < 2) {
      return { isStruggleRecorded: false };
    }

    // 2. Fetch AI diagnosis & suggested resource
    let aiSuggestion = `You've encountered difficulty with "${cleanTopic}" multiple times. Focus on the core equations and state your known variables clearly before calculating.`;
    let suggestedResource = `NEXOVIAN ${cleanSubject} Review Series · Chapter on ${cleanTopic}`;

    try {
      const res = await fetch('/api/ai/struggles/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subject: cleanSubject,
          topic: cleanTopic,
          struggleCount: currentCount,
          grade: params.grade,
          failedQuestions: params.failedQuestions
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.diagnosis) {
          aiSuggestion = data.diagnosis.ai_suggestion || aiSuggestion;
          suggestedResource = data.diagnosis.suggested_resource || suggestedResource;
        }
      }
    } catch (err) {
      console.warn('[LearnerStruggles] AI diagnosis error:', err);
    }

    // 3. Upsert struggle in local cache and Supabase
    const local = this.getLocalStruggles();
    const existingIndex = local.findIndex(
      (s) => s.subject.toLowerCase() === cleanSubject.toLowerCase() && s.topic.toLowerCase() === cleanTopic.toLowerCase()
    );

    let struggleItem: LearnerStruggle;
    if (existingIndex >= 0) {
      struggleItem = {
        ...local[existingIndex],
        struggle_count: currentCount,
        ai_suggestion: aiSuggestion,
        suggested_resource: suggestedResource,
        is_resolved: false,
        updated_at: new Date().toISOString()
      };
      local[existingIndex] = struggleItem;
    } else {
      struggleItem = {
        id: `str-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        user_id: effectiveUserId,
        subject: cleanSubject,
        topic: cleanTopic,
        struggle_count: currentCount,
        ai_suggestion: aiSuggestion,
        suggested_resource: suggestedResource,
        is_resolved: false,
        updated_at: new Date().toISOString()
      };
      local.unshift(struggleItem);
    }

    this.saveLocalStruggles(local);

    // 4. Upsert in Supabase table `learner_struggles`
    if (params.userId && params.userId !== 'guest_learner') {
      try {
        const { error } = await supabase.from('learner_struggles').upsert(
          {
            id: struggleItem.id,
            user_id: params.userId,
            subject: struggleItem.subject,
            topic: struggleItem.topic,
            struggle_count: struggleItem.struggle_count,
            ai_suggestion: struggleItem.ai_suggestion,
            suggested_resource: struggleItem.suggested_resource,
            is_resolved: false,
            updated_at: struggleItem.updated_at
          },
          { onConflict: 'id' }
        );

        if (error) {
          console.warn('[LearnerStruggles] Supabase upsert error:', error.message);
        }
      } catch (err) {
        console.warn('[LearnerStruggles] Supabase sync error:', err);
      }
    }

    return { isStruggleRecorded: true, struggle: struggleItem };
  }

  /**
   * Mark a struggle as resolved
   */
  async resolveStruggle(struggleId: string, userId?: string): Promise<boolean> {
    const local = this.getLocalStruggles();
    const target = local.find((s) => s.id === struggleId);
    if (target) {
      target.is_resolved = true;
      target.updated_at = new Date().toISOString();
      this.saveLocalStruggles(local);
    }

    // Reset failure counter for this topic
    if (target) {
      const counts = this.getTopicFailureCounts();
      const key = `${target.subject.toLowerCase()}::${target.topic.toLowerCase()}`;
      delete counts[key];
      this.saveTopicFailureCounts(counts);
    }

    if (userId && userId !== 'guest_learner') {
      try {
        const { error } = await supabase
          .from('learner_struggles')
          .update({
            is_resolved: true,
            updated_at: new Date().toISOString()
          })
          .eq('id', struggleId)
          .eq('user_id', userId);

        if (error) {
          console.warn('[LearnerStruggles] Supabase resolve error:', error.message);
        }
      } catch (err) {
        console.warn('[LearnerStruggles] Supabase update error:', err);
      }
    }

    return true;
  }
}

export const learnerStrugglesService = new LearnerStrugglesService();
