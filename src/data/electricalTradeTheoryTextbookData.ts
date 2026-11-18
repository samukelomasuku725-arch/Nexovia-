/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN ORIGINAL ELECTRICAL TRADE THEORY TEXTBOOK DATA (N1, N2, N3)
 * Route: /textbooks/electrical-trade-theory-textbook
 *
 * 100% Nexovian Original study material written by Nexovian.
 * Read online only on nexovian.group.
 * All 12 Chapters: N1 (1-4), N2 (5-8), N3 (9-12) across 11 official languages.
 */

export type {
  LocalizedSteps,
  LocalizedText,
  TextbookChapter,
  TextbookKeyTerm,
  TextbookLangKey,
  TextbookLanguageOption
} from './textbook/officeAdminTypes';
export { TEXTBOOK_LANGUAGES } from './textbook/officeAdminTypes';

import { TextbookChapter } from './textbook/officeAdminTypes';
import { ELECTRICAL_N1_CHAPTERS } from './textbook/electricalN1';
import { ELECTRICAL_N2_CHAPTERS } from './textbook/electricalN2';
import { ELECTRICAL_N3_CHAPTERS } from './textbook/electricalN3';

export const ELECTRICAL_TRADE_THEORY_CHAPTERS: TextbookChapter[] = [
  ...ELECTRICAL_N1_CHAPTERS,
  ...ELECTRICAL_N2_CHAPTERS,
  ...ELECTRICAL_N3_CHAPTERS
];
