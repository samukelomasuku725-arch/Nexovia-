/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN ORIGINAL OFFICE ADMINISTRATION TEXTBOOK (LEVEL 2, 3, 4) IN ALL 11 LANGUAGES
 * Written by Nexovian for South African students — Online reading only.
 */

export type {
  TextbookLangKey,
  LocalizedText,
  LocalizedSteps,
  TextbookLanguageOption,
  TextbookKeyTerm,
  TextbookChapter
} from './textbook/officeAdminTypes';

export { TEXTBOOK_LANGUAGES } from './textbook/officeAdminTypes';
export type { TextbookUiStrings } from './textbook/officeAdminUiStrings';
export { TEXTBOOK_UI_STRINGS } from './textbook/officeAdminUiStrings';

import { TextbookChapter } from './textbook/officeAdminTypes';
import { OFFICE_ADMIN_LEVEL_2_CHAPTERS } from './textbook/officeAdminLevel2';
import { OFFICE_ADMIN_LEVEL_3_CHAPTERS } from './textbook/officeAdminLevel3';
import { OFFICE_ADMIN_LEVEL_4_CHAPTERS } from './textbook/officeAdminLevel4';

export const NCV_OFFICE_ADMIN_TEXTBOOK_CHAPTERS: TextbookChapter[] = [
  ...OFFICE_ADMIN_LEVEL_2_CHAPTERS,
  ...OFFICE_ADMIN_LEVEL_3_CHAPTERS,
  ...OFFICE_ADMIN_LEVEL_4_CHAPTERS
];
