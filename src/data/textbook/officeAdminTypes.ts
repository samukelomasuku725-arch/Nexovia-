/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Shared types & 11-language definitions for Nexovian Original Office Administration Textbook
 */

export type TextbookLangKey =
  | 'Xitsonga'
  | 'Sepedi'
  | 'isiZulu'
  | 'Tshivenda'
  | 'Sesotho'
  | 'Setswana'
  | 'Siswati'
  | 'isiNdebele'
  | 'isiXhosa'
  | 'Afrikaans'
  | 'English';

export type LocalizedText = Record<TextbookLangKey, string>;
export type LocalizedSteps = Record<TextbookLangKey, string[]>;

export interface TextbookLanguageOption {
  key: TextbookLangKey;
  code: string;
  subjectName: string;
  tagline: string;
  summaryPrefix: string;
}

export interface TextbookKeyTerm {
  termEn: string;
  translations: LocalizedText;
  meaningByLanguage: LocalizedText;
}

export interface TextbookChapter {
  id: string;
  level: 2 | 3 | 4;
  chapterNumber: number;
  chapterLabelByLanguage: LocalizedText;
  titleByLanguage: LocalizedText;
  subtitleByLanguage: LocalizedText;
  summaryByLanguage: LocalizedText;
  keyTerms: TextbookKeyTerm[];
  workedExample: {
    questionByLanguage: LocalizedText;
    stepsByLanguage: LocalizedSteps;
    finalAnswerByLanguage: LocalizedText;
  };
  practiceQuestions: Array<{
    number: number;
    questionByLanguage: LocalizedText;
    answerByLanguage: LocalizedText;
  }>;
}

export const TEXTBOOK_LANGUAGES: TextbookLanguageOption[] = [
  {
    key: 'Xitsonga',
    code: 'ts',
    subjectName: 'Vulawuri bya Hofisi',
    tagline: 'Tsala hi Nexovian - Dyondza hi ririmi ra wena eka nexovian.group.',
    summaryPrefix: 'Nkomiso wa Nexovian hi Xitsonga (Vulawuri bya Hofisi)'
  },
  {
    key: 'Sepedi',
    code: 'nso',
    subjectName: 'Taolo ya Ofisi',
    tagline: 'Ngwadilwe ke Nexovian — Ithute ka leleme la gago go nexovian.group.',
    summaryPrefix: 'Kakaretšo ya Nexovian ka Sepedi (Taolo ya Ofisi)'
  },
  {
    key: 'isiZulu',
    code: 'zu',
    subjectName: 'Ukuphathwa Kwehhovisi',
    tagline: 'Ibhalwe yi-Nexovian — Funda ngolimi lwakho ku-nexovian.group.',
    summaryPrefix: 'Isifinyezo se-Nexovian ngesiZulu (Ukuphathwa Kwehhovisi)'
  },
  {
    key: 'Tshivenda',
    code: 've',
    subjectName: 'Ndangulo ya Ofisi',
    tagline: 'Yo nwalwa nga Nexovian — Gudani nga luambo lwanu kha nexovian.group.',
    summaryPrefix: 'Manweledzo a Nexovian nga Tshivenda (Ndangulo ya Ofisi)'
  },
  {
    key: 'Sesotho',
    code: 'st',
    subjectName: 'Taolo ya Ofisi',
    tagline: 'E ngotswe ke Nexovian — Ithute ka puo ya hao ho nexovian.group.',
    summaryPrefix: 'Kakaretso ya Nexovian ka Sesotho (Taolo ya Ofisi)'
  },
  {
    key: 'Setswana',
    code: 'tn',
    subjectName: 'Taolo ya Ofisi',
    tagline: 'Kwadilwe ke Nexovian — Ithute ka puo ya gago mo nexovian.group.',
    summaryPrefix: 'Tshobokanyo ya Nexovian ka Setswana (Taolo ya Ofisi)'
  },
  {
    key: 'Siswati',
    code: 'ss',
    subjectName: 'Kuphatfwa Kwelihhovisi',
    tagline: 'Ibhalwe yi-Nexovian — Fundza ngelulwimi lwakho ku-nexovian.group.',
    summaryPrefix: 'Sifinyeto se-Nexovian ngeSiswati (Kuphatfwa Kwelihhovisi)'
  },
  {
    key: 'isiNdebele',
    code: 'nr',
    subjectName: 'Ukuphathwa Kwe-ofisi',
    tagline: 'Itlolwe yi-Nexovian — Funda ngelimi lakho ku-nexovian.group.',
    summaryPrefix: 'Isirhunyezo se-Nexovian ngesiNdebele (Ukuphathwa Kwe-ofisi)'
  },
  {
    key: 'isiXhosa',
    code: 'xh',
    subjectName: 'Ulawulo lwe-Ofisi',
    tagline: 'Ibhalwe yi-Nexovian — Funda ngolwimi lwakho kwi-nexovian.group.',
    summaryPrefix: 'Isishwankathelo se-Nexovian ngesiXhosa (Ulawulo lwe-Ofisi)'
  },
  {
    key: 'Afrikaans',
    code: 'af',
    subjectName: 'Kantooradministrasie',
    tagline: 'Geskryf deur Nexovian — Leer aanlyn in jou eie taal op nexovian.group.',
    summaryPrefix: 'Nexovian Opsomming in Afrikaans (Kantooradministrasie)'
  },
  {
    key: 'English',
    code: 'en',
    subjectName: 'Office Administration',
    tagline: 'Written by Nexovian — Read online in simple English on nexovian.group.',
    summaryPrefix: 'Nexovian Summary in English (Office Administration)'
  }
];
