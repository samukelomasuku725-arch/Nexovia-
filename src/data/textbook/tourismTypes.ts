/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Types for Nexovian Original NCV Tourism Textbook (Level 2, 3, 4) — 9 Chapters
 */

import { LocalizedSteps, LocalizedText, TextbookLangKey, TEXTBOOK_LANGUAGES } from './officeAdminTypes';

export type { TextbookLangKey, LocalizedText, LocalizedSteps };
export { TEXTBOOK_LANGUAGES };

export interface TourismQuizQuestion {
  number: number;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

export interface TourismKeyTerm {
  termEn: string;
  translations: LocalizedText;
  meaningByLanguage: LocalizedText;
}

export interface TourismChapter {
  id: string;
  level: 2 | 3 | 4;
  chapterNumber: number;
  chapterLabel: string;
  title: string;
  subtitleByLanguage: LocalizedText;
  explanationParagraphs: string[];
  summaryByLanguage: LocalizedText;
  keyTerms: TourismKeyTerm[];
  workedExample: {
    title: string;
    scenario: string;
    steps: string[];
    finalAnswer: string;
  };
  practiceQuestions: Array<{
    number: number;
    question: string;
    answer: string;
  }>;
  quickQuiz: TourismQuizQuestion[];
}
