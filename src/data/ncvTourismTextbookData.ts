/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN ORIGINAL NCV TOURISM TEXTBOOK DATA (LEVEL 2, 3, 4 — 9 CHAPTERS)
 * Route: /textbooks/ncv-tourism-textbook
 * Read Online Only on nexovian.group.
 */

import { TOURISM_LEVEL2_CHAPTERS } from './textbook/tourismLevel2';
import { TOURISM_LEVEL3_CHAPTERS } from './textbook/tourismLevel3';
import { TOURISM_LEVEL4_CHAPTERS } from './textbook/tourismLevel4';
import {
  TEXTBOOK_LANGUAGES,
  TextbookLangKey,
  TourismChapter,
  TourismQuizQuestion
} from './textbook/tourismTypes';

export type { TextbookLangKey, TourismChapter, TourismQuizQuestion };
export { TEXTBOOK_LANGUAGES };

export const NCV_TOURISM_CHAPTERS: TourismChapter[] = [
  ...TOURISM_LEVEL2_CHAPTERS,
  ...TOURISM_LEVEL3_CHAPTERS,
  ...TOURISM_LEVEL4_CHAPTERS
];
