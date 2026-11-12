/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIA - LEARNER PROGRESS & ADAPTIVE REPOSITORY
 * 
 * Centralized, decoupled repository for learner progress, performance events,
 * mastery evaluation, and adaptive profile compilation.
 */

import { ILearnerProgressRepository } from './types';
import {
  AdaptiveProfile,
  LearnerPerformanceEvent,
  MasteryThresholds,
  PaginatedResult,
  PaginationParams,
  UserProgress
} from '../types';
import {
  buildAdaptiveProfile,
  getSampleLearnerEvents
} from '../services/adaptive/adaptiveLearningService';

export class LearnerProgressRepository implements ILearnerProgressRepository {
  private eventsCache: Map<string, LearnerPerformanceEvent[]> = new Map();
  private progressCache: Map<string, UserProgress> = new Map();

  constructor() {
    this.initFromLocalStorage();
  }

  private initFromLocalStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem('nexovia_events_cache');
        if (stored) {
          const parsed = JSON.parse(stored);
          for (const [userId, events] of Object.entries(parsed)) {
            this.eventsCache.set(userId, events as LearnerPerformanceEvent[]);
          }
        }
      }
    } catch {
      // Storage unavailable
    }
  }

  private persistLocalStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const obj: Record<string, LearnerPerformanceEvent[]> = {};
        for (const [k, v] of this.eventsCache.entries()) {
          obj[k] = v.slice(-200);
        }
        localStorage.setItem('nexovia_events_cache', JSON.stringify(obj));
      }
    } catch {
      // Ignore
    }
  }

  async getProgress(userId: string): Promise<UserProgress> {
    // 1. Try server fetch
    try {
      const res = await fetch('/api/progress');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          this.progressCache.set(userId, json.data);
          return json.data;
        }
      }
    } catch {
      // Offline fallback
    }

    if (this.progressCache.has(userId)) {
      return this.progressCache.get(userId)!;
    }

    const fallback: UserProgress = {
      completedLessonIds: [],
      lessonQuizScores: {},
      bookmarkedLessonIds: [],
      notes: {},
      currentStreakDays: 1,
      lastActiveDate: new Date().toISOString(),
      activeTrackId: 'school-grade10',
      totalXp: 120,
      learnedDays: [new Date().toISOString().slice(0, 10)],
      questionsAskedCount: 0,
      practiceSessionsCount: 0,
      quizAttempts: [],
      savedItems: [],
      topicsStudied: [],
      studyTimeMinutes: 30,
      lastActivityTimestamp: new Date().toISOString(),
      conversations: []
    };
    this.progressCache.set(userId, fallback);
    return fallback;
  }

  async updateProgress(userId: string, updates: Partial<UserProgress>): Promise<UserProgress> {
    const current = await this.getProgress(userId);
    const merged: UserProgress = {
      ...current,
      ...updates,
      lastActiveDate: new Date().toISOString()
    };

    this.progressCache.set(userId, merged);

    try {
      await fetch('/api/progress/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch {
      // Offline
    }

    return merged;
  }

  async recordPerformanceEvent(
    event: Omit<LearnerPerformanceEvent, 'id' | 'timestamp'>
  ): Promise<LearnerPerformanceEvent> {
    const fullEvent: LearnerPerformanceEvent = {
      ...event,
      id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString()
    };

    const userEvents = this.eventsCache.get(event.learnerId) || [];
    userEvents.push(fullEvent);
    this.eventsCache.set(event.learnerId, userEvents);
    this.persistLocalStorage();

    // Fire and forget server progress sync
    try {
      fetch('/api/progress/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'assessment_completed',
          topic: event.topic,
          score: event.percentage,
          timeSpent: event.timeSpentSeconds
        })
      }).catch(() => {});
    } catch {
      // Ignore
    }

    return fullEvent;
  }

  async getPerformanceEvents(
    userId: string,
    pagination?: PaginationParams
  ): Promise<PaginatedResult<LearnerPerformanceEvent>> {
    let events = this.eventsCache.get(userId);
    if (!events || events.length === 0) {
      events = getSampleLearnerEvents(userId);
      this.eventsCache.set(userId, events);
    }

    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 20;
    const start = (page - 1) * pageSize;
    const paginated = events.slice(start, start + pageSize);

    return {
      data: paginated,
      total: events.length,
      page,
      pageSize,
      hasMore: start + pageSize < events.length
    };
  }

  async getAdaptiveProfile(userId: string, thresholds?: MasteryThresholds): Promise<AdaptiveProfile> {
    const eventsResult = await this.getPerformanceEvents(userId);
    const progress = await this.getProgress(userId);
    return buildAdaptiveProfile(eventsResult.data, progress.completedLessonIds || [], [], 0, undefined, thresholds);
  }
}

export const learnerProgressRepository = new LearnerProgressRepository();
