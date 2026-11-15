/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * STUDY GUIDE PROGRESS & CONTINUE-WHERE-YOU-LEFT-OFF STORAGE
 */

import { useEffect, useState } from 'react';
import { ALL_STUDY_GUIDE_CHAPTERS } from '../data/studyGuideContent';

export interface StudyGuideProgressState {
  completedSlugs: string[];
  visitedSlugs: string[];
  lastChapterSlug: string | null;
}

const STORAGE_KEY = 'nexovian_study_guide_progress_v1';
const PROGRESS_EVENT = 'nexovian-study-guide-progress';

const VALID_SLUGS = new Set(ALL_STUDY_GUIDE_CHAPTERS.map((c) => c.slug));

const DEFAULT_STATE: StudyGuideProgressState = {
  completedSlugs: [],
  visitedSlugs: [],
  lastChapterSlug: null
};

export function getStudyGuideProgress(): StudyGuideProgressState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    const completedSlugs = Array.isArray(parsed.completedSlugs)
      ? parsed.completedSlugs.filter((s: unknown): s is string => typeof s === 'string' && VALID_SLUGS.has(s))
      : [];
    const visitedSlugs = Array.isArray(parsed.visitedSlugs)
      ? parsed.visitedSlugs.filter((s: unknown): s is string => typeof s === 'string' && VALID_SLUGS.has(s))
      : [];
    const lastChapterSlug =
      typeof parsed.lastChapterSlug === 'string' && VALID_SLUGS.has(parsed.lastChapterSlug)
        ? parsed.lastChapterSlug
        : null;

    return {
      completedSlugs,
      visitedSlugs,
      lastChapterSlug
    };
  } catch {
    return DEFAULT_STATE;
  }
}

function saveStudyGuideProgress(next: StudyGuideProgressState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(PROGRESS_EVENT, { detail: next }));
  } catch {
    // ignore storage quota errors
  }
}

export function markChapterVisited(slug: string): StudyGuideProgressState {
  if (!VALID_SLUGS.has(slug)) return getStudyGuideProgress();
  const current = getStudyGuideProgress();
  const visitedSlugs = current.visitedSlugs.includes(slug)
    ? current.visitedSlugs
    : [...current.visitedSlugs, slug];
  const next: StudyGuideProgressState = {
    ...current,
    visitedSlugs,
    lastChapterSlug: slug
  };
  saveStudyGuideProgress(next);
  return next;
}

export function toggleChapterCompleted(slug: string): StudyGuideProgressState {
  if (!VALID_SLUGS.has(slug)) return getStudyGuideProgress();
  const current = getStudyGuideProgress();
  const exists = current.completedSlugs.includes(slug);
  const completedSlugs = exists
    ? current.completedSlugs.filter((s) => s !== slug)
    : [...current.completedSlugs, slug];
  const visitedSlugs = current.visitedSlugs.includes(slug)
    ? current.visitedSlugs
    : [...current.visitedSlugs, slug];

  const next: StudyGuideProgressState = {
    completedSlugs,
    visitedSlugs,
    lastChapterSlug: slug
  };
  saveStudyGuideProgress(next);
  return next;
}

export function useStudyGuideProgress() {
  const [progress, setProgress] = useState<StudyGuideProgressState>(() => getStudyGuideProgress());

  useEffect(() => {
    const sync = () => setProgress(getStudyGuideProgress());
    window.addEventListener(PROGRESS_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return {
    progress,
    totalChapters: ALL_STUDY_GUIDE_CHAPTERS.length,
    completedCount: progress.completedSlugs.length,
    visitedCount: progress.visitedSlugs.length,
    toggleComplete: (slug: string) => {
      const updated = toggleChapterCompleted(slug);
      setProgress(updated);
    },
    markVisited: (slug: string) => {
      const updated = markChapterVisited(slug);
      setProgress(updated);
    }
  };
}
