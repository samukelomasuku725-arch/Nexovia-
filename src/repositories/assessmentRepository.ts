/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIA - ASSESSMENT & QUESTION BANK REPOSITORY
 * 
 * Centralized, decoupled repository implementation for assessments, question bank,
 * and authoritative learner attempt submissions.
 */

import { IAssessmentRepository } from './types';
import { assessmentEngine } from '../services/assessment/assessmentEngine';
import {
  AssessmentAttempt,
  AssessmentModel,
  LearnerAnswerValue,
  PaginationParams,
  PaginatedResult,
  QuestionBankFilter,
  QuestionModel
} from '../types';

export class AssessmentRepository implements IAssessmentRepository {
  private attemptsStore: AssessmentAttempt[] = [];

  constructor() {
    this.loadCachedAttempts();
  }

  private loadCachedAttempts() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem('nexovia_assessment_attempts_cache');
        if (stored) {
          this.attemptsStore = JSON.parse(stored);
        }
      }
    } catch {
      // LocalStorage unavailable, use memory
    }
  }

  private persistCachedAttempts() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(
          'nexovia_assessment_attempts_cache',
          JSON.stringify(this.attemptsStore.slice(-100))
        );
      }
    } catch {
      // Ignore storage errors
    }
  }

  async getAssessments(params?: {
    canViewDrafts?: boolean;
    type?: string;
    grade?: string;
    subject?: string;
    pagination?: PaginationParams;
  }): Promise<PaginatedResult<AssessmentModel>> {
    let all = assessmentEngine.getAssessments(params?.canViewDrafts ?? false);

    if (params?.type && params.type !== 'ALL') {
      all = all.filter((a) => a.assessmentType === params.type);
    }
    if (params?.grade && params.grade !== 'ALL') {
      all = all.filter((a) => a.grade === params.grade);
    }
    if (params?.subject && params.subject !== 'ALL') {
      all = all.filter((a) => a.subject === params.subject);
    }

    const page = params?.pagination?.page || 1;
    const pageSize = params?.pagination?.pageSize || 20;
    const start = (page - 1) * pageSize;
    const paginated = all.slice(start, start + pageSize);

    return {
      data: paginated,
      total: all.length,
      page,
      pageSize,
      hasMore: start + pageSize < all.length
    };
  }

  async getAssessmentById(id: string): Promise<AssessmentModel | undefined> {
    return assessmentEngine.getAssessmentById(id);
  }

  async getQuestions(
    filter: QuestionBankFilter,
    pagination?: PaginationParams
  ): Promise<PaginatedResult<QuestionModel>> {
    const all = assessmentEngine.filterQuestionBank(filter);
    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 20;
    const start = (page - 1) * pageSize;
    const paginated = all.slice(start, start + pageSize);

    return {
      data: paginated,
      total: all.length,
      page,
      pageSize,
      hasMore: start + pageSize < all.length
    };
  }

  async addQuestion(question: QuestionModel): Promise<QuestionModel> {
    assessmentEngine.addQuestionToBank(question);
    return question;
  }

  async saveAssessment(assessment: AssessmentModel): Promise<{ success: boolean; errors?: string[] }> {
    return assessmentEngine.saveAssessment(assessment);
  }

  async submitAssessmentAttempt(params: {
    assessmentId: string;
    learnerId: string;
    answers: Record<string, LearnerAnswerValue>;
    timeUsedSeconds: number;
    submissionToken?: string;
    antiCheatingLogs?: { windowBlurCount: number; tabSwitchCount: number; connectionDropCount: number };
  }): Promise<AssessmentAttempt> {
    const assessment = assessmentEngine.getAssessmentById(params.assessmentId);
    if (!assessment) {
      throw new Error(`Assessment not found: ${params.assessmentId}`);
    }

    // Try server-side authoritative submission endpoint first
    try {
      const res = await fetch('/api/assessments/attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const attempt = json.data as AssessmentAttempt;
          this.attemptsStore.unshift(attempt);
          this.persistCachedAttempts();
          return attempt;
        }
      }
    } catch {
      // Backend request failed, fallback to local engine marking
    }

    // Client-side fallback evaluation
    const answersMap: Record<string, any> = {};
    for (const [qId, val] of Object.entries(params.answers)) {
      answersMap[qId] = {
        questionId: qId,
        value: val,
        timeSpentSeconds: Math.round(params.timeUsedSeconds / Math.max(1, Object.keys(params.answers).length)),
        isFlaggedForReview: false
      };
    }

    const attempt = assessmentEngine.evaluateAssessmentAttempt(
      assessment,
      answersMap,
      params.learnerId,
      params.timeUsedSeconds,
      1,
      params.antiCheatingLogs
    );

    this.attemptsStore.unshift(attempt);
    this.persistCachedAttempts();
    return attempt;
  }

  async getAttemptsByLearner(
    learnerId: string,
    pagination?: PaginationParams
  ): Promise<PaginatedResult<AssessmentAttempt>> {
    // Try remote fetch
    try {
      const res = await fetch(`/api/assessments/attempts?learnerId=${encodeURIComponent(learnerId)}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          return {
            data: json.data,
            total: json.data.length,
            page: 1,
            pageSize: json.data.length,
            hasMore: false
          };
        }
      }
    } catch {
      // Use local cache
    }

    const filtered = this.attemptsStore.filter((a) => a.learnerId === learnerId);
    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 20;
    const start = (page - 1) * pageSize;

    return {
      data: filtered.slice(start, start + pageSize),
      total: filtered.length,
      page,
      pageSize,
      hasMore: start + pageSize < filtered.length
    };
  }

  async getAttemptById(attemptId: string): Promise<AssessmentAttempt | undefined> {
    const found = this.attemptsStore.find((a) => a.id === attemptId);
    if (found) return found;

    try {
      const res = await fetch(`/api/assessments/attempts/${encodeURIComponent(attemptId)}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch {
      // Fallback
    }

    return undefined;
  }
}

export const assessmentRepository = new AssessmentRepository();
