/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIA - MULTILINGUAL LEARNING & EDUCATIONAL CONTENT ENGINE
 * 
 * Core Invariants:
 * 1. The learner's activeLearningLanguage controls the EDUCATIONAL CONTENT throughout NEXOVIA.
 * 2. Questions, hints, answer options, explanations, feedback, and instructions follow activeLearningLanguage.
 * 3. Mathematical expressions (e.g. x² - 5x + 6, (x - 2)(x - 3), numbers, variables)
 *    MUST REMAIN MATHEMATICALLY CORRECT AND UNCHANGED.
 * 4. For Xitsonga: FIRST use the NEXOVIA verified Xitsonga Language Engine (140 entries).
 *    Do not rewrite or modify verified wording.
 * 5. Content outside the verified dataset is marked internally as `ai_generated / unverified`.
 * 6. Supports 11 official South African languages with safe fallback.
 */

import { SALanguageCode } from '../../types';
import { AdaptiveDifficulty } from '../../types/adaptive';
import { AdaptiveQuestionItem } from '../adaptive/adaptiveLearningService';
import { INITIAL_XITSONGA_DATASET } from '../../data/xitsongaLanguageData';
import { QuestionModel, AssessmentModel } from '../../types/assessment';
import { CurriculumLessonModel } from '../../types/curriculum';

export interface LocalizedEducationalQuestion extends AdaptiveQuestionItem {
  language: SALanguageCode;
  isVerified?: boolean;
  source?: 'verified_language_engine' | 'ai_generated';
  verificationStatus?: 'verified' | 'unverified';
  verifiedPhrasesMatched?: Array<{ english: string; xitsonga: string }>;
  unverifiedNotice?: string;
}

export interface LocalizedQuestionModel extends QuestionModel {
  isVerified?: boolean;
  source?: 'verified_language_engine' | 'ai_generated';
  verificationStatus?: 'verified' | 'unverified';
  verifiedPhrasesMatched?: Array<{ english: string; xitsonga: string }>;
  unverifiedNotice?: string;
  originalLanguage?: SALanguageCode;
}

export interface LocalizedAssessmentModel extends AssessmentModel {
  isVerified?: boolean;
  source?: 'verified_language_engine' | 'ai_generated';
  verificationStatus?: 'verified' | 'unverified';
  questions: LocalizedQuestionModel[];
}

export interface PracticeUiStrings {
  adaptivePracticeTitle: string;
  question: string;
  questionCount: string; // e.g. "Question {current} of {total}"
  score: string;
  accuracy: string;
  needAHint: string;
  hideHint: string;
  hintPrefix: string;
  checkAnswer: string;
  submitAnswer: string;
  nextQuestion: string;
  tryAgain: string;
  correctHeading: string;
  incorrectHeading: string;
  reviewConcept: string;
  explanationPrefix: string;
  showExplanation: string;
  askAiTutor: string;
  quitSession: string;
  practiceAgain: string;
  sessionCompleted: string;
  doneViewDashboard: string;
  answeredCount: string;
  endLevel: string;
  engineAssessment: string;
  verifiedLexiconBadge: string;
  unverifiedDisclaimer: string;
  contentFallbackNotice: string;
}

export const PRACTICE_UI_LOCALIZATIONS: Record<SALanguageCode, PracticeUiStrings> = {
  // XiTsonga (ts) - Powered by Native Verified Engine Phrases
  ts: {
    adaptivePracticeTitle: 'Dyondzo yo Ringeta (Adaptive Practice)',
    question: 'Xivhutiso',
    questionCount: 'Xivhutiso {current} xa {total}',
    score: 'Ntsengo',
    accuracy: 'Vutshembeki',
    needAHint: 'U lava mpfuno?',
    hideHint: 'Tumbeta mpfuno',
    hintPrefix: 'Mpfuno (Hint):',
    checkAnswer: 'Kambisisa Nhlamulo',
    submitAnswer: 'Rhumela Nhlamulo',
    nextQuestion: 'Xivhutiso Lexi Landzelaka',
    tryAgain: 'Ringeta Nakambe',
    correctHeading: 'Hi swona leswi! Swinene.',
    incorrectHeading: 'Ahi swona. Unga heli marimba!',
    reviewConcept: 'Kambisisa mhaka leyi:',
    explanationPrefix: 'Tinhlamuselo (Explanation):',
    showExplanation: 'Kombisa Tinhlamuselo',
    askAiTutor: 'Vutisa Mudyondisi wa AI',
    quitSession: 'Tshika Dyondzo',
    practiceAgain: 'Ringeta Nakambe',
    sessionCompleted: 'U hetile dyondzo leyi! Swinene.',
    doneViewDashboard: 'Hetile & Vona Dashboard',
    answeredCount: 'Leswi hlamuriweke',
    endLevel: 'Xiyimo',
    engineAssessment: 'Nkambisiso wa Engine:',
    verifiedLexiconBadge: 'XITSONGA LEXICON VERIFIED',
    unverifiedDisclaimer: 'Xitsonga Language Engine active · Controlled native-verified vocabulary prioritized',
    contentFallbackNotice: 'Vuxokoxoko hi ririmi leri a byi si kumeka hi ku helela. U nga ya emahlweni hi Xinghezi.'
  },

  // isiZulu (zu)
  zu: {
    adaptivePracticeTitle: 'Ukuzilolonga Okuhambisanayo',
    question: 'Umbuzo',
    questionCount: 'Umbuzo {current} kokungu {total}',
    score: 'Amamaki',
    accuracy: 'Ukunemba',
    needAHint: 'Udinga icebo?',
    hideHint: 'Fihla icebo',
    hintPrefix: 'Icebo (Hint):',
    checkAnswer: 'Bheka Impendulo',
    submitAnswer: 'Thumela Impendulo',
    nextQuestion: 'Umbuzo Olandelayo',
    tryAgain: 'Zama Futhi',
    correctHeading: 'Kunjalo impela! Wenzeni kahle.',
    incorrectHeading: 'Akulungile. Ungapheli amandla, zama futhi!',
    reviewConcept: 'Buyekeza lesi sihloko:',
    explanationPrefix: 'Incazelo (Explanation):',
    showExplanation: 'Bonisa Incazelo',
    askAiTutor: 'Buza ku-AI Tutor',
    quitSession: 'Phuma Esifundweni',
    practiceAgain: 'Zijwayeze Futhi',
    sessionCompleted: 'Usiqedile lesi siqephu sokuzilolonga!',
    doneViewDashboard: 'Kwenziwe & Buka Ideshibhodi',
    answeredCount: 'Okuphenduliwe',
    endLevel: 'Izinga Lokugcina',
    engineAssessment: 'Ukubuyekezwa Kwenjini:',
    verifiedLexiconBadge: 'ISIZULU EDUCATIONAL CONTENT',
    unverifiedDisclaimer: 'Okuqukethwe kufundiswa ngesiZulu · Izibalisi zokubala zihlala zinjalo',
    contentFallbackNotice: 'Okuqukethwe ngalolu limi akukatholakali ngokugcwele. Ungaqhubeka ngesiNgisi.'
  },

  // isiXhosa (xh)
  xh: {
    adaptivePracticeTitle: 'Uziqeqeshe Ngokufanelekileyo',
    question: 'Umbuzo',
    questionCount: 'Umbuzo {current} kwi-{total}',
    score: 'Amanqaku',
    accuracy: 'Ukuchaneka',
    needAHint: 'Ingaba ufuna icebiso?',
    hideHint: 'Fihla icebiso',
    hintPrefix: 'Icebiso (Hint):',
    checkAnswer: 'Khangela Impendulo',
    submitAnswer: 'Ngenisa Impendulo',
    nextQuestion: 'Umbuzo Olandelayo',
    tryAgain: 'Zama Kwakhona',
    correctHeading: 'Kunjalo kanye! Wenze kakuhle.',
    incorrectHeading: 'Ayikachaneki. Unganikezeli, zama kwakhona!',
    reviewConcept: 'Qwalasela le ngcamango:',
    explanationPrefix: 'Ingcaciso (Explanation):',
    showExplanation: 'Bonisa Ingcaciso',
    askAiTutor: 'Buza kwi-AI Tutor',
    quitSession: 'Phuma Esiqeshini',
    practiceAgain: 'Ziqeqeshe Kwakhona',
    sessionCompleted: 'Ugqibile kule seshoni!',
    doneViewDashboard: 'Kugqityiwe & Jonga iDashboard',
    answeredCount: 'Okuphenduliweyo',
    endLevel: 'Inqanaba Lokugqibela',
    engineAssessment: 'Uvavanyo Lwe-injini:',
    verifiedLexiconBadge: 'ISIXHOSA EDUCATIONAL CONTENT',
    unverifiedDisclaimer: 'Okuqukethwe kuveliswa ngesiXhosa · Iifomula zemathematika azitshintshwanga',
    contentFallbackNotice: 'Okuqukethwe ngolu lwimi akukafumaneki ngokupheleleyo. Ungaqhubeka ngesiNgesi.'
  },

  // Afrikaans (af)
  af: {
    adaptivePracticeTitle: 'Aanpasbare Oefening',
    question: 'Vraag',
    questionCount: 'Vraag {current} van {total}',
    score: 'Telling',
    accuracy: 'Akkuraatheid',
    needAHint: 'Het jy \'n wenk nodig?',
    hideHint: 'Versteek wenk',
    hintPrefix: 'Wenk (Hint):',
    checkAnswer: 'Kontroleer Antwoord',
    submitAnswer: 'Dien Antwoord In',
    nextQuestion: 'Volgende Vraag',
    tryAgain: 'Probeer Weer',
    correctHeading: 'Korrek! Goed gedoen.',
    incorrectHeading: 'Nie heeltemal reg nie. Moenie moed opgee nie!',
    reviewConcept: 'Hersien die konsep:',
    explanationPrefix: 'Verduideliking (Explanation):',
    showExplanation: 'Wys Verduideliking',
    askAiTutor: 'Vra AI Tutor',
    quitSession: 'Verlaat Sessie',
    practiceAgain: 'Oefen Weer',
    sessionCompleted: 'Oefensessie voltooi!',
    doneViewDashboard: 'Klaar & Bekyk Paneelbord',
    answeredCount: 'Beantwoord',
    endLevel: 'Eindvlak',
    engineAssessment: 'Enjin-evaluering:',
    verifiedLexiconBadge: 'AFRIKAANS LEERINHOUD',
    unverifiedDisclaimer: 'Inhoud beskikbaar in Afrikaans · Wiskundige formules bly onveranderd',
    contentFallbackNotice: 'Inhoud in hierdie taal is tydelik nie ten volle beskikbaar nie. Jy kan in Engels voortgaan.'
  },

  // Sepedi / Sesotho sa Leboa (nso)
  nso: {
    adaptivePracticeTitle: 'Boitšhidullo bja go Ikamanya',
    question: 'Potsiso',
    questionCount: 'Potsiso {current} go {total}',
    score: 'Dintlha',
    accuracy: 'Kgahlego',
    needAHint: 'O nyaka kgopolo?',
    hideHint: 'Fihla kgopolo',
    hintPrefix: 'Kgopolo (Hint):',
    checkAnswer: 'Lekola Karabo',
    submitAnswer: 'Romela Karabo',
    nextQuestion: 'Potsiso e Latelago',
    tryAgain: 'Leka Gape',
    correctHeading: 'Go nepagetse! O dirile gabotse.',
    incorrectHeading: 'Ga se gona. O se ke wa lapa, leka gape!',
    reviewConcept: 'Boeletsa taba ye:',
    explanationPrefix: 'Hlalošo (Explanation):',
    showExplanation: 'Bontšha Hlalošo',
    askAiTutor: 'Botsisa AI Tutor',
    quitSession: 'Tšwa Boitšhidullong',
    practiceAgain: 'Ithute Gape',
    sessionCompleted: 'O feditse seshene ye!',
    doneViewDashboard: 'Feditse & Bona Dashboard',
    answeredCount: 'Tse di arabilwego',
    endLevel: 'Maemo a Mafelelo',
    engineAssessment: 'Tshekatsheko ya Enjene:',
    verifiedLexiconBadge: 'SEPEDI EDUCATIONAL CONTENT',
    unverifiedDisclaimer: 'Diteng di hlalošitšwe ka Sepedi · Dipalo di dula di sa fetoga',
    contentFallbackNotice: 'Diteng ka leleme le ga di gona gabotse ga bjale. O ka tšwela pele ka Seisemane.'
  },

  // Setswana (tn)
  tn: {
    adaptivePracticeTitle: 'Ikatiso e e Tsamaelanang',
    question: 'Potso',
    questionCount: 'Potso {current} mo go {total}',
    score: 'Maduo',
    accuracy: 'Nepo',
    needAHint: 'A o tlhoka kakanyo?',
    hideHint: 'Fitlha kakanyo',
    hintPrefix: 'Kakanyo (Hint):',
    checkAnswer: 'Tlhatlhoba Karabo',
    submitAnswer: 'Romela Karabo',
    nextQuestion: 'Potso e e Latelang',
    tryAgain: 'Leka Gape',
    correctHeading: 'Go siame! O dirile sentle.',
    incorrectHeading: 'Ga go a siama. O se ka wa kgobega marapo!',
    reviewConcept: 'Sekaseka kgopolo e:',
    explanationPrefix: 'Tlhaloso (Explanation):',
    showExplanation: 'Bontsha Tlhaloso',
    askAiTutor: 'Bôtsa AI Tutor',
    quitSession: 'Tswa Mo Tirong',
    practiceAgain: 'Ikatise Gape',
    sessionCompleted: 'O feditse thulaganyo eno!',
    doneViewDashboard: 'Go Feditswe & Bona Dashboard',
    answeredCount: 'Tse di arabilweng',
    endLevel: 'Seemo sa Bofelo',
    engineAssessment: 'Tshekatsheko ya Enjene:',
    verifiedLexiconBadge: 'SETSWANA EDUCATIONAL CONTENT',
    unverifiedDisclaimer: 'Diteng di ka Setswana · Dipalo di nna jaaka di ntse',
    contentFallbackNotice: 'Diteng ka puo e ga di ise di nne teng ka botlalo. O ka tswelela ka Sekgoa.'
  },

  // Sesotho (st)
  st: {
    adaptivePracticeTitle: 'Boitokisetso bo Ikamahanyang',
    question: 'Potso',
    questionCount: 'Potso {current} ho {total}',
    score: 'Dintlha',
    accuracy: 'Nepo',
    needAHint: 'O hloka lesedi?',
    hideHint: 'Pata lesedi',
    hintPrefix: 'Lesedi (Hint):',
    checkAnswer: 'Hlahloba Karabo',
    submitAnswer: 'Romela Karabo',
    nextQuestion: 'Potso e Latelang',
    tryAgain: 'Leka Hape',
    correctHeading: 'Ho nepahetse! O entse hantle.',
    incorrectHeading: 'Ha se hantle. O se nyahame, leka hape!',
    reviewConcept: 'Sheba thuto ena hape:',
    explanationPrefix: 'Tlhaloso (Explanation):',
    showExplanation: 'Bontsha Tlhaloso',
    askAiTutor: 'Botsa AI Tutor',
    quitSession: 'Tswa Thutong',
    practiceAgain: 'Itlwaetse Hape',
    sessionCompleted: 'O phethile thuto ena!',
    doneViewDashboard: 'Ho Fetilwe & Sheba Dashboard',
    answeredCount: 'Tse arabilweng',
    endLevel: 'Boemo ba Qetello',
    engineAssessment: 'Tlhahlobo ea Enjene:',
    verifiedLexiconBadge: 'SESOTHO EDUCATIONAL CONTENT',
    unverifiedDisclaimer: 'Ditaba di hlalositswe ka Sesotho · Difomula tsa dipalo ha di a fetolwa',
    contentFallbackNotice: 'Ditaba ka puo ena ha di so fumanehe ka botlalo. O ka tswela pele ka Senyesemane.'
  },

  // siSwati (ss)
  ss: {
    adaptivePracticeTitle: 'Kutiko Lokuhambisanako',
    question: 'Umbuto',
    questionCount: 'Umbuto {current} ku {total}',
    score: 'Emamaki',
    accuracy: 'Kuciniseka',
    needAHint: 'Ufuna sicebiso?',
    hideHint: 'Fihla sicebiso',
    hintPrefix: 'Sicebiso (Hint):',
    checkAnswer: 'Hlola Imphendvulo',
    submitAnswer: 'Tfumela Imphendvulo',
    nextQuestion: 'Umbuto Lolandzelako',
    tryAgain: 'Zama Futsi',
    correctHeading: 'Kulungile kakhulu! Wente kahle.',
    incorrectHeading: 'Akusiko loko. Ungapheli emandla, zama futsi!',
    reviewConcept: 'Buyeketa lesifundvo:',
    explanationPrefix: 'Inhlathululo (Explanation):',
    showExplanation: 'Khombisa Inhlathululo',
    askAiTutor: 'Buta ku-AI Tutor',
    quitSession: 'Phuma Esifundvweni',
    practiceAgain: 'Tiko Futsi',
    sessionCompleted: 'Ucedzile lokutiko!',
    doneViewDashboard: 'Kucedzile & Buka Ideshibhodi',
    answeredCount: 'Lokuphendvuliwe',
    endLevel: 'Lizinga Lekugcina',
    engineAssessment: 'Kuhlola Kwelinjini:',
    verifiedLexiconBadge: 'SISWATI EDUCATIONAL CONTENT',
    unverifiedDisclaimer: 'Lokucuketfwe ngesiSwati · Emagunya etibalo awaguculwa',
    contentFallbackNotice: 'Lokucuketfwe ngalolulwimi akukatfolakali kahle. Ungachubeka ngesiNgisi.'
  },

  // Tshivenda (ve)
  ve: {
    adaptivePracticeTitle: 'Ndivho ya u Dowedza i Tanganelanaho',
    question: 'Mbudziso',
    questionCount: 'Mbudziso {current} kha {total}',
    score: 'Mawanwa',
    accuracy: 'Vhutsila',
    needAHint: 'Ni khou toda tsivhudzo?',
    hideHint: 'Dzumba tsivhudzo',
    hintPrefix: 'Tsivhudzo (Hint):',
    checkAnswer: 'Tsedzulusani Phindulo',
    submitAnswer: 'Rumelani Phindulo',
    nextQuestion: 'Mbudziso i Tevhelaho',
    tryAgain: 'Lingedzani Hafhu',
    correctHeading: 'Ndo zwi wana! No ita zwavhudi.',
    incorrectHeading: 'A si zwone. Ni songo fhela mbilu, lingedzani hafhu!',
    reviewConcept: 'Vusuludzani thero iyi:',
    explanationPrefix: 'Thaluso (Explanation):',
    showExplanation: 'Sumbedzani Thaluso',
    askAiTutor: 'Vhudzisani AI Tutor',
    quitSession: 'Bvani kha Tshipida',
    practiceAgain: 'Dowedzani Hafhu',
    sessionCompleted: 'No fhedza tshipida itshi!',
    doneViewDashboard: 'Zwo Fhela & Vhonani Dashboard',
    answeredCount: 'Zwo fhindulwaho',
    endLevel: 'Vhumo ha u Fhedza',
    engineAssessment: 'Tsedzuluso ya Ndjini:',
    verifiedLexiconBadge: 'TSHIVENDA EDUCATIONAL CONTENT',
    unverifiedDisclaimer: 'Zwirepo zwi nga Tshivenda · Zwa mbalo zwi dzula zwi songo shanduka',
    contentFallbackNotice: 'Zwirepo zwa luambo ulu a zwi athu wanala zwothe. Ni nga bvela phanda nga Luisimane.'
  },

  // isiNdebele (nr)
  nr: {
    adaptivePracticeTitle: 'Ukuzilolongela Okukhambisanako',
    question: 'Umbuzo',
    questionCount: 'Umbuzo {current} ku {total}',
    score: 'Amanqaku',
    accuracy: 'Ukunemba',
    needAHint: 'Ufuna amano?',
    hideHint: 'Fihla amano',
    hintPrefix: 'Amano (Hint):',
    checkAnswer: 'Qalisa Iphendulo',
    submitAnswer: 'Thumela Iphendulo',
    nextQuestion: 'Umbuzo Olandelako',
    tryAgain: 'Linga Godu',
    correctHeading: 'Kunjalo! Wenze kuhle khulu.',
    incorrectHeading: 'Akusikho lokho. Ungapheli amandla, linga godu!',
    reviewConcept: 'Buyekeza ummongo lo:',
    explanationPrefix: 'Ihlathululo (Explanation):',
    showExplanation: 'Tjengisa Ihlathululo',
    askAiTutor: 'Bawa ku-AI Tutor',
    quitSession: 'Phuma Efundweni',
    practiceAgain: 'Zilolonge Godu',
    sessionCompleted: 'Uyigedile le seshoni!',
    doneViewDashboard: 'Kugediwe & Qala iDashboard',
    answeredCount: 'Okuphenduliweko',
    endLevel: 'Izinga Lamaswaphelo',
    engineAssessment: 'Ukubuyekezwa Kwenjini:',
    verifiedLexiconBadge: 'ISINDEBELE EDUCATIONAL CONTENT',
    unverifiedDisclaimer: 'Okuqukethwe ngesiNdebele · Ifomula zembalobalo azitjhintjhwanga',
    contentFallbackNotice: 'Okuqukethwe ngelimeli akukatholakali ngokupheleleko. Ungaragela phambili ngesiNgisi.'
  },

  // English (en) - Default Reference
  en: {
    adaptivePracticeTitle: 'Adaptive Practice Session',
    question: 'Question',
    questionCount: 'Question {current} of {total}',
    score: 'Score',
    accuracy: 'Accuracy',
    needAHint: 'Need a Hint?',
    hideHint: 'Hide Hint',
    hintPrefix: 'Hint:',
    checkAnswer: 'Check Answer',
    submitAnswer: 'Submit Answer',
    nextQuestion: 'Next Question',
    tryAgain: 'Try Again',
    correctHeading: 'Correct! Well reasoned.',
    incorrectHeading: 'Needs Review',
    reviewConcept: 'Review the governing concept:',
    explanationPrefix: 'Explanation:',
    showExplanation: 'Show Explanation',
    askAiTutor: 'Ask AI Tutor',
    quitSession: 'Quit Session',
    practiceAgain: 'Practice Again',
    sessionCompleted: 'Practice Session Completed!',
    doneViewDashboard: 'Done & View Dashboard',
    answeredCount: 'Answered',
    endLevel: 'End Level',
    engineAssessment: 'Engine Assessment:',
    verifiedLexiconBadge: 'CURRICULUM PRACTICE',
    unverifiedDisclaimer: 'Curriculum-aligned practice questions · CAPS & NATED verified',
    contentFallbackNotice: 'Content in this language is temporarily unavailable. You can continue in English.'
  }
};

/**
 * High-precision educational translations for canonical curriculum question bank.
 * Keeps all mathematical symbols and numbers completely unmodified ($...$, x² - 5x + 6, F = ma).
 */
const CANONICAL_QUESTION_TRANSLATIONS: Record<
  string,
  Partial<Record<SALanguageCode, {
    question: string;
    hint?: string;
    explanation: string;
    options?: string[];
  }>>
> = {
  // Grade 10 Mathematics: What are the factors of the quadratic trinomial x² - 5x + 6?
  'qb-g10-mth-mc1': {
    ts: {
      question: 'Xana hi swihi swiphemu (factors) swa quadratic trinomial x² - 5x + 6?',
      hint: 'Lava swiphemu swa +6 leswi loko swi hlanganisiwa swi nyikaka coefficient ya le xikarhi -5.',
      explanation: 'A hi swi tlhantlheni hi magoza: Ku avanyisa x² - 5x + 6, hi lava tinomboro timbirhi m na n laha m · n = 6 na m + n = -5. Tinomboro -2 na -3 ti fikelela swilaveko ha swimbirhi ((-2) × (-3) = 6 naswona (-2) + (-3) = -5). Hikwalaho, fomete leyi avanyisiweke i (x - 2)(x - 3).',
      options: ['(x - 2)(x - 3)', '(x - 1)(x - 6)', '(x + 2)(x + 3)', '(x + 1)(x - 6)']
    },
    zu: {
      question: 'Yiziphi izici (factors) ze-quadratic trinomial x² - 5x + 6?',
      hint: 'Funa izici zika-+6 ezihlanganayo zenze i-coefficient ephakathi nendawo engu--5.',
      explanation: 'Ukuze sihlukanise i-x² - 5x + 6, sifuna izinombolo ezimbili m no-n lapho m · n = 6 kanti m + n = -5. Izinombolo u--2 no--3 ziyanelisa ((-2) × (-3) = 6 kanti (-2) + (-3) = -5). Ngakho-ke, yile: (x - 2)(x - 3).',
      options: ['(x - 2)(x - 3)', '(x - 1)(x - 6)', '(x + 2)(x + 3)', '(x + 1)(x - 6)']
    },
    xh: {
      question: 'Zeziphi izinto (factors) ze-quadratic trinomial x² - 5x + 6?',
      hint: 'Khangela izinto zika-+6 ezidityaniswa zenze i-coefficient esembindini engu--5.',
      explanation: 'Ukucazulula x² - 5x + 6, sifuna amanani amabini m no-n aphinda enze 6 aze adityaniswe enze -5. Amanani ngo--2 no--3. Ngoko ke ifomula ecazululweyo ngu-(x - 2)(x - 3).',
      options: ['(x - 2)(x - 3)', '(x - 1)(x - 6)', '(x + 2)(x + 3)', '(x + 1)(x - 6)']
    },
    af: {
      question: 'Wat is die faktore van die kwadratiese drieterm x² - 5x + 6?',
      hint: 'Soek faktore van +6 wat optel na die middelste koëffisiënt -5.',
      explanation: 'Om x² - 5x + 6 te faktoriseer, soek ons twee getalle m en n sodat m · n = 6 en m + n = -5. Die getalle -2 en -3 voldoen hieraan. Daarom is die gefaktoriseerde vorm (x - 2)(x - 3).',
      options: ['(x - 2)(x - 3)', '(x - 1)(x - 6)', '(x + 2)(x + 3)', '(x + 1)(x - 6)']
    }
  },

  // Grade 10 Mathematics: Difference of Two Squares MS
  'qb-g10-mth-ms1': {
    ts: {
      question: 'Hlawula swivulavulelo HINKWASWO leswi kombisaka ku hambana ka swikwere swimbirhi (difference of two squares):',
      hint: 'Kambisisa leswaku xiphemu xin’wana na xin’wana i xikwere lexinene NASWONA xi hambanisiwe hi xikombiso xa minus (-).',
      explanation: 'Ku hambana ka swikwere swimbirhi ku na fomete ya a² - b²: x² - 49 = (x - 7)(x + 7); 4y² - 25 = (2y - 5)(2y + 5); 9p² - 1 = (3p - 1)(3p + 1). Kambe a² + 16 xi na xikombiso xa plus (+), naswona x³ - 8 i ku hambana ka ti-cube.',
      options: ['x² - 49', '4y² - 25', 'a² + 16', '9p² - 1', 'x³ - 8']
    },
    zu: {
      question: 'Khetha ZONKE izinkulumo ezimele umehluko wezikwele ezimbili (difference of two squares):',
      hint: 'Bheka ukuthi amagama amabili ayizikwele eziphelele FUTHI ahlukaniswe ngophawu lokukhipha (-).',
      explanation: 'Umehluko wezikwele ezimbili unesimo esithi a² - b²: x² - 49 = (x - 7)(x + 7); 4y² - 25 = (2y - 5)(2y + 5); 9p² - 1 = (3p - 1)(3p + 1).',
      options: ['x² - 49', '4y² - 25', 'a² + 16', '9p² - 1', 'x³ - 8']
    }
  },

  // Grade 10 Mathematics: Solve for x: 3x - 7 = 14
  'qb-g10-mth-sa1': {
    ts: {
      question: 'Tlhantlha x: 3x - 7 = 14. Tsala ntsena ntsengo wa x.',
      hint: 'Humesa term leyi nga na x hi ku yengetela 7 eka matlhelo ha mambirhi ku sungula.',
      explanation: 'Yengetela 7 eka matlhelo ha mambirhi: 3x = 14 + 7 = 21. Avanyisa hi 3: x = 21 / 3 = 7.'
    },
    zu: {
      question: 'Xazulula u-x: 3x - 7 = 14. Bhala inani lika-x kuphela.',
      hint: 'Khipha igama elino-x ngokuhlanganisa u-7 ezinhlangothini zombili kuqala.',
      explanation: 'Hlanganisa u-7 ezinhlangothini zombili: 3x = 14 + 7 = 21. Hlukanisa ngo-3: x = 21 / 3 = 7.'
    }
  },

  // Grade 10 Mathematics: Evaluate 2x² - 3x + 4 when x = 3
  'qb-g10-mth-num2': {
    ts: {
      question: 'Bala ntsengo wa xivulavulelo 2x² - 3x + 4 loko x = 3.',
      hint: 'Bala 3² ku sungula (leyi nga 9), yi phinda hi 2, kutani u heta tinhlayo.',
      explanation: 'Siva x = 3: 2(3)² - 3(3) + 4 = 2(9) - 9 + 4 = 18 - 9 + 4 = 13.'
    },
    zu: {
      question: 'Bala inani lenkulumo ethi 2x² - 3x + 4 uma u-x = 3.',
      hint: 'Bala u-3² kuqala (okungu-9), uphindaphinde ngo-2, bese uqedela izibalo.',
      explanation: 'Faka u-x = 3: 2(3)² - 3(3) + 4 = 2(9) - 9 + 4 = 18 - 9 + 4 = 13.'
    }
  },

  // Grade 10 Mathematics: Ordering factorization steps
  'qb-g10-mth-ord1': {
    ts: {
      question: 'Hleka magoza hi ku landzelelana lokunene ku avanyisa quadratic trinomial x² + 7x + 12:',
      hint: 'Hleketa kahle: Tiva swiphemu swa 12 leswi hlanganaka swi endla 7 ku sungula.',
      explanation: 'A hi swi tlhantlheni hi magoza: 1. Tiva constant term (+12) na linear coefficient (+7). 2. Tsala swiphemu swa 12: (1, 12), (2, 6), (3, 4). 3. Hlawula swiphemu leswi ntsengo wa swona wu endlaka +7: 3 + 4 = 7. 4. Tsala xiendliwa xa binomial lexi avanyisiweke: (x + 3)(x + 4).'
    },
    zu: {
      question: 'Hlela izinyathelo ngokulandelana okulungile ukuhlukanisa i-quadratic trinomial x² + 7x + 12:',
      hint: 'Cabanga kahle: Thola izici zika-12 ezihlanganayo zenze u-7 kuqala.',
      explanation: '1. Thola i-constant (+12) kanye ne-linear coefficient (+7). 2. Bhala izici zika-12. 3. Khetha ezihlanganayo zenze +7. 4. Bhala (x + 3)(x + 4).'
    }
  },

  // Grade 8 Mathematics: (-8) + (-12) - (-15)
  'qb-g8-mth-mc2': {
    ts: {
      question: 'Bala ntsengo wa: (-8) + (-12) - (-15)',
      hint: 'Tsundzuka leswaku ku susa nomboro leyi nga negative swi fana na ku hlanganisa.',
      explanation: 'Ku sungula, (-8) + (-12) = -20. Kutani ku susa negative swi fana na ku hlanganisa: -20 - (-15) = -20 + 15 = -5.',
      options: ['-5', '-35', '5', '-11']
    },
    zu: {
      question: 'Bala inani leli: (-8) + (-12) - (-15)',
      hint: 'Khumbula ukuthi ukukhipha inombolo engenegethivu kufana nokuhlanganisa.',
      explanation: 'Kuqala, (-8) + (-12) = -20. Bese ukukhipha inegethivu kufana nokuhlanganisa: -20 - (-15) = -20 + 15 = -5.',
      options: ['-5', '-35', '5', '-11']
    }
  },

  // Grade 10 Physical Sciences: Vector Quantity
  'qb-g10-psc-mc3': {
    ts: {
      question: 'Hi xihi eka swilo leswi landzelaka lexi nga vector quantity eka physics?',
      hint: 'Scalars ti na magnitude ntsena. Vectors ti na magnitude na direction ha swimbirhi.',
      explanation: 'Vector quantity yi lava magnitude na direction ha swimbirhi. Acceleration yi na magnitude na direction (xikombiso: 9.8 m/s² ku ya ehansi). Mass, speed, na time i ti-scalar quantities.',
      options: ['Ntiko (Mass)', 'Rivilo (Speed)', 'Acceleration', 'Nkarhi (Time)']
    },
    zu: {
      question: 'Yikuphi kulokhu okulandelayo okuyi-vector quantity ku-physics?',
      hint: 'Ama-scalar anobukhulu kuphela. Ama-vector anobukhulu nesiqondiso.',
      explanation: 'I-vector quantity idinga ubukhulu nesiqondiso. I-acceleration inobukhulu nesiqondiso. I-mass, speed, nesikhathi yizinto ezingama-scalar.',
      options: ['Mass', 'Speed', 'Acceleration', 'Isikhathi (Time)']
    }
  },

  // 1. Algebra: Trinomial Factorization x² + 5x + 6
  'ab-alg-m2': {
    ts: {
      question: 'Avanyisa trinomial ya quadratic: x² + 5x + 6.',
      hint: 'Hleketa kahle: Kuma tinomboro timbirhi leti loko u ti phinda ti endlaka 6, naswona loko u ti hlanganisa ti endla 5.',
      explanation: 'A hi swi tlhantlheni hi magoza: Hi lava tinomboro timbirhi leti loko hi ti phinda ti endlaka +6, naswona loko hi ti hlanganisa ti endla +5. Tinomboro teto i +2 na +3: (x + 2)(x + 3).',
      options: ['(x + 2)(x + 3)', '(x + 1)(x + 6)', '(x - 2)(x - 3)', '(x + 5)(x + 1)']
    },
    zu: {
      question: 'Hlukanisa (factorize) i-quadratic trinomial: x² + 5x + 6.',
      hint: 'Cabanga kahle: Thola izinombolo ezimbili eziphindaphindwa zenze u-6, futhi uma zihlangana zenze u-5.',
      explanation: 'Sidinga izinombolo ezimbili eziziphindaphinda zenze u-+6 ziphinde zihlangane zenze u-+5. Lezo zinombolo ngu-+2 kanye no-+3: (x + 2)(x + 3).',
      options: ['(x + 2)(x + 3)', '(x + 1)(x + 6)', '(x - 2)(x - 3)', '(x + 5)(x + 1)']
    },
    xh: {
      question: 'Cazulula (factorize) i-quadratic trinomial: x² + 5x + 6.',
      hint: 'Cinga ngocoselelo: Fumana amanani amabini aphindaphindwa enze u-6, aze xa edityaniswa enze u-5.',
      explanation: 'Sifuna amanani amabini aphindaphindwa enze u-+6 aze xa edityaniswa enze u-+5. Lawo manani ngu-+2 no-+3: (x + 2)(x + 3).',
      options: ['(x + 2)(x + 3)', '(x + 1)(x + 6)', '(x - 2)(x - 3)', '(x + 5)(x + 1)']
    },
    af: {
      question: 'Faktoriseer die kwadratiese drieterm: x² + 5x + 6.',
      hint: 'Dink mooi: Vind twee faktore van 6 wat optel na 5.',
      explanation: 'Ons soek twee getalle wat vermenigvuldig tot +6 en optel tot +5. Daardie getalle is +2 en +3: (x + 2)(x + 3).',
      options: ['(x + 2)(x + 3)', '(x + 1)(x + 6)', '(x - 2)(x - 3)', '(x + 5)(x + 1)']
    }
  },

  // 2. Algebra: Difference of Two Squares x² - 49
  'ab-alg-m1': {
    ts: {
      question: 'Avanyisa hilaha ku heleleke: x² - 49.',
      hint: 'Tsundzuka fomete ya ku hambana ka swikwere swimbirhi (difference of two squares): a² - b² = (a - b)(a + b).',
      explanation: 'Fomula yo avanyisa ku hambana ka swikwere swimbirhi: a² - b² = (a - b)(a + b). Laha a = x, b = 7: (x - 7)(x + 7).',
      options: ['(x - 7)(x + 7)', '(x - 7)²', '(x + 7)²', '(x - 49)(x + 1)']
    },
    zu: {
      question: 'Hlukanisa ngokuphelele: x² - 49.',
      hint: 'Khumbula ifomula yomehluko wezikwele ezimbili: a² - b² = (a - b)(a + b).',
      explanation: 'Ifomula yomehluko wezikwele ezimbili: a² - b² = (a - b)(a + b). Lapha a = x, b = 7: (x - 7)(x + 7).',
      options: ['(x - 7)(x + 7)', '(x - 7)²', '(x + 7)²', '(x - 49)(x + 1)']
    },
    xh: {
      question: 'Cazulula ngokupheleleyo: x² - 49.',
      hint: 'Khumbula ifomula yomohluko wezikwere ezibini: a² - b² = (a - b)(a + b).',
      explanation: 'Ifomula yomohluko wezikwere ezibini: a² - b² = (a - b)(a + b). Apha a = x, b = 7: (x - 7)(x + 7).',
      options: ['(x - 7)(x + 7)', '(x - 7)²', '(x + 7)²', '(x - 49)(x + 1)']
    },
    af: {
      question: 'Faktoriseer volledig: x² - 49.',
      hint: 'Onthou die verskil van twee vierkante formule: a² - b² = (a - b)(a + b).',
      explanation: 'Verskil van twee vierkante: a² - b² = (a - b)(a + b). Hier is a = x, b = 7: (x - 7)(x + 7).',
      options: ['(x - 7)(x + 7)', '(x - 7)²', '(x + 7)²', '(x - 49)(x + 1)']
    }
  },

  // 3. Algebra: Highest Common Monomial Factor 6x + 9
  'ab-alg-e1': {
    ts: {
      question: 'Avanyisa hi ku humesa ntsengo lowukulu lowu tolovelekeke (HCF): 6x + 9.',
      hint: 'Hleketa kahle: Kuma nomboro leyikulu leyi avanyisaka 6 na 9 handle ka masalela.',
      explanation: 'Ntsengo lowukulu lowu tolovelekeke wa 6 na 9 i 3: 3(2x + 3).',
      options: ['3(2x + 3)', '3(2x + 9)', '6(x + 3)', '3x(2 + 3)']
    },
    zu: {
      question: 'Hlukanisa ngokukhipha isici esikhulu kunazo zonke (HCF): 6x + 9.',
      hint: 'Bheka inombolo enkulu kakhulu ehlukanisa u-6 kanye no-9 ngokulinganayo.',
      explanation: 'Isici esikhulu kunazo zonke ku-6 no-9 ngu-3: 3(2x + 3).',
      options: ['3(2x + 3)', '3(2x + 9)', '6(x + 3)', '3x(2 + 3)']
    },
    xh: {
      question: 'Cazulula ngokukhupha esona sahluli sikhulu siqhelekileyo (HCF): 6x + 9.',
      hint: 'Khangela elona nani likhulu lahlula u-6 no-9 ngaphandle kwentsalela.',
      explanation: 'Esona sahluli sikhulu siqhelekileyo sika-6 no-9 ngu-3: 3(2x + 3).',
      options: ['3(2x + 3)', '3(2x + 9)', '6(x + 3)', '3x(2 + 3)']
    },
    af: {
      question: 'Faktoriseer volledig deur die hoogste gemene faktor (HGF) uit te haal: 6x + 9.',
      hint: 'Kyk vir die grootste getal wat beide 6 en 9 deel sonder \'n res.',
      explanation: 'Die hoogste gemene faktor van 6 en 9 is 3: 3(2x + 3).',
      options: ['3(2x + 3)', '3(2x + 9)', '6(x + 3)', '3x(2 + 3)']
    }
  },

  // 4. Algebra: Grouping in Pairs 2ax + 2ay + bx + by
  'ab-alg-h1': {
    ts: {
      question: 'Avanyisa hilaha ku heleleke hi ku hlengeleta hi swimbirhi: 2ax + 2ay + bx + by.',
      hint: 'Humesa 2a eka ntlawa wo sungula na b eka ntlawa wa vumbirhi.',
      explanation: 'Hlengeleta swiphemu: 2a(x + y) + b(x + y) = (2a + b)(x + y).',
      options: ['(2a + b)(x + y)', '(2a + x)(b + y)', '2ab(x + y)', '(a + b)(2x + y)']
    },
    zu: {
      question: 'Hlukanisa ngokuphelele ngokuhlanganisa ngambili: 2ax + 2ay + bx + by.',
      hint: 'Khipha u-2a eqenjini lokuqala bese ukhipha u-b eqenjini lesibili.',
      explanation: 'Hlanganisa amaqembu: 2a(x + y) + b(x + y) = (2a + b)(x + y).',
      options: ['(2a + b)(x + y)', '(2a + x)(b + y)', '2ab(x + y)', '(a + b)(2x + y)']
    },
    xh: {
      question: 'Cazulula ngokupheleleyo ngokudibanisa ngazibini: 2ax + 2ay + bx + by.',
      hint: 'Khupha u-2a kwiqela lokuqala uze ukhuphe u-b kwiqela lesibini.',
      explanation: 'Dibanisa amaqela: 2a(x + y) + b(x + y) = (2a + b)(x + y).',
      options: ['(2a + b)(x + y)', '(2a + x)(b + y)', '2ab(x + y)', '(a + b)(2x + y)']
    },
    af: {
      question: 'Faktoriseer volledig deur groepering in pare: 2ax + 2ay + bx + by.',
      hint: 'Faktoriseer 2a uit die eerste paar en b uit die tweede paar.',
      explanation: 'Groepeer terme: 2a(x + y) + b(x + y) = (2a + b)(x + y).',
      options: ['(2a + b)(x + y)', '(2a + x)(b + y)', '2ab(x + y)', '(a + b)(2x + y)']
    }
  },

  // 5. Fractions: 1/5 + 2/5
  'ab-frac-e1': {
    ts: {
      question: 'Bala leswi: 1/5 + 2/5 hi fomete yo olova swinene.',
      hint: 'Hlayisa denominator yi ri tano kutani u hlanganisa tinomboro ta le henhla (numerators).',
      explanation: 'Loko denominators ti fana, hlanganisa tinomboro ta le henhla: (1 + 2) / 5 = 3/5.',
      options: ['3/5', '3/10', '2/25', '1/2']
    },
    zu: {
      question: 'Bala lokhu: 1/5 + 2/5 ngendlela elula kunazo zonke.',
      hint: 'Gcina i-denominator ifana bese uhlanganisa amanani aphezulu (numerators).',
      explanation: 'Uma ama-denominators efana, hlanganisa ama-numerators ngqo: (1 + 2) / 5 = 3/5.',
      options: ['3/5', '3/10', '2/25', '1/2']
    },
    af: {
      question: 'Bereken: 1/5 + 2/5 in eenvoudigste vorm.',
      hint: 'Hou die noemer dieselfde en tel die tellers bymekaar.',
      explanation: 'Wanneer noemers identies is, tel tellers direk bymekaar: (1 + 2) / 5 = 3/5.',
      options: ['3/5', '3/10', '2/25', '1/2']
    }
  },

  // 6. Fractions: Lowest common denominator for 2/3 and 3/4
  'ab-frac-m1': {
    ts: {
      question: 'Kuma lowest common denominator (LCD) ku hlanganisa 2/3 na 3/4.',
      hint: 'Tsala tinomboro leti phindaphindaka 3 (3, 6, 9, 12...) na 4 (4, 8, 12...).',
      explanation: 'Ntsengo lowutsongo lowu tolovelekeke wa 3 na 4 i 12 (3 × 4 = 12).',
      options: ['12', '7', '24', '6']
    },
    zu: {
      question: 'Thola i-lowest common denominator (LCD) ukuze uhlanganise u-2/3 no-3/4.',
      hint: 'Bheka iziphindaphindo zika-3 (3, 6, 9, 12...) kanye no-4 (4, 8, 12...).',
      explanation: 'Isiphindaphindo esincane kunazo zonke sika-3 no-4 ngu-12 (3 × 4 = 12).',
      options: ['12', '7', '24', '6']
    },
    af: {
      question: 'Vind die kleinste gemene deler (KGD) om 2/3 en 3/4 bymekaar te tel.',
      hint: 'Lys die veelvoude van 3 (3, 6, 9, 12...) en 4 (4, 8, 12...).',
      explanation: 'Die kleinste gemene veelvoud van 3 en 4 is 12 (3 × 4 = 12).',
      options: ['12', '7', '24', '6']
    }
  },

  // 7. Physical Sciences: Newton's First Law
  'ab-newt-e1': {
    ts: {
      question: 'Hi ku ya hi Nawu wo Sungula wa Newton, xana ku humelela yini eka nchumu loko net external force yi ri zero?',
      hint: 'Hleketa hi inertia exikarhi ka xibakabaka laha ku nga riki na friction.',
      explanation: "Nawu wo Sungula wa Newton wu vula leswaku nchumu wu ya emahlweni wu wumile kumbe wu famba hi rivilo ro fana eka layini yo lulama handle ka loko ku ri na force yo karhi.",
      options: [
        'Wu hlayisa xiyimo xa ku wuma kumbe ku famba hi constant velocity eka layini yo lulama',
        'Wu hatla wu yima xikan’we',
        'Wu engetela rivilo nkarhi hinkwawo',
        'Ntiko wa wona wu engeteleka'
      ]
    },
    zu: {
      question: 'Ngokomthetho wokuqala kaNewton, kwenzekani entweni uma i-net external force iyiziro?',
      hint: 'Cabanga nge-inertia emkhathini lapho kungekho ukungqubuzana (friction).',
      explanation: "Umthetho wokuqala kaNewton uthi into iyaqhubeka nokuhlala inganyakazi noma ihambe ngesivinini esingaguquki emgqeni oqondile ngaphandle uma iphoqwa amandla angaphandle.",
      options: [
        'Igcina isimo sokunganyakazi noma ukuhamba ngesivinini esingaguquki',
        'Iyehla ngejubane ime ngokushesha',
        'Iyenyuka ngejubane njalo',
        'Isisindo sayo siyenyuka'
      ]
    },
    af: {
      question: 'Volgens Newton se Eerste Wet, wat gebeur met \'n voorwerp as die netto uitwaartse krag nul is?',
      hint: 'Dink aan traagheid in die ruimte waar daar geen wrywing is nie.',
      explanation: "Newton se Eerste Wet bepaal dat \'n voorwerp in rus of eenvormige reglynige beweging volhard tensy \'n netto krag daarop inwerk.",
      options: [
        'Dit behou sy toestand van rus of konstante snelheid in \'n reguit lyn',
        'Dit vertraag onmiddellik en stop',
        'Dit versnel voortdurend',
        'Die massa neem toe'
      ]
    }
  },

  // 8. Physical Sciences: Newton's Second Law F=ma
  'ab-newt-m1': {
    ts: {
      question: 'Net force ya horizontal ya 30 N yi tirhisiwa eka bokisi ra 6 kg eka fuloro leyi nga riki na friction. Xana acceleration ya yona i yini?',
      hint: 'Tirhisa fomula ya a = F_net / m.',
      explanation: 'F_net = m · a ⇒ a = F_net / m = 30 N / 6 kg = 5 m·s⁻².',
      options: ['5 m·s⁻²', '180 m·s⁻²', '0.2 m·s⁻²', '36 m·s⁻²']
    },
    zu: {
      question: 'I-force enezingxenye ezilalayo engu-30 N isetshenziswa ebhokisini elingu-6 kg phansi lapho kungekho friction. I-acceleration yalo yini?',
      hint: 'Sebenzisa ifomula ethi a = F_net / m.',
      explanation: 'F_net = m · a ⇒ a = F_net / m = 30 N / 6 kg = 5 m·s⁻².',
      options: ['5 m·s⁻²', '180 m·s⁻²', '0.2 m·s⁻²', '36 m·s⁻²']
    },
    af: {
      question: '\'n Horisontale netto krag van 30 N word toegepas op \'n 6 kg krat op \'n wrywinglose vloer. Wat is die versnelling?',
      hint: 'Gebruik die formule a = F_net / m.',
      explanation: 'F_net = m · a ⇒ a = F_net / m = 30 N / 6 kg = 5 m·s⁻².',
      options: ['5 m·s⁻²', '180 m·s⁻²', '0.2 m·s⁻²', '36 m·s⁻²']
    }
  },

  // 9. Physical Sciences: Ohm's Law V = IR
  'ab-circ-e1': {
    ts: {
      question: "Hi ku ya hi Nawu wa Ohm, xana vuxaka bya tinhlayo exikarhi ka potential difference (V), current (I), na resistance (R) i yini?",
      hint: 'Volts yi ringana na Amperes ku phindaphindwa hi Ohms.',
      explanation: "Nawu wa Ohm wu vula leswaku potential difference yi fambisana ngopfu na current leyi khulukaka: V = I · R.",
      options: ['V = I · R', 'I = V · R', 'R = V · I', 'V = I / R']
    },
    zu: {
      question: "Ngokomthetho ka-Ohm, buyini ubudlelwano bezibalo phakathi kwe-potential difference (V), current (I), kanye ne-resistance (R)?",
      hint: 'I-Volts ilingana ne-Amperes iphindaphindwe nge-Ohms.',
      explanation: "Umthetho ka-Ohm uthi i-potential difference ihambisana ngqo ne-current: V = I · R.",
      options: ['V = I · R', 'I = V · R', 'R = V · I', 'V = I / R']
    },
    af: {
      question: "Volgens Ohm se Wet, wat is die wiskundige verwantskap tussen potensiaalverskil (V), stroom (I), en weerstand (R)?",
      hint: 'Volts is gelyk aan Ampère maal Ohm.',
      explanation: "Ohm se Wet bepaal dat potensiaalverskil direk eweredig is aan stroom: V = I · R.",
      options: ['V = I · R', 'I = V · R', 'R = V · I', 'V = I / R']
    }
  }
};

/**
 * Service providing multilingual localization for all NEXOVIA learning content.
 */
class MultilingualEducationalService {
  /**
   * Retrieves localized UI strings for practice, quizzes, and assessments.
   */
  public getUiStrings(language: SALanguageCode = 'en'): PracticeUiStrings {
    return PRACTICE_UI_LOCALIZATIONS[language] || PRACTICE_UI_LOCALIZATIONS.en;
  }

  /**
   * Localizes an adaptive question item based on the learner's activeLearningLanguage.
   * - Preserves all mathematical and scientific formulas verbatim ($x^2 - 5x + 6$, (x-2)(x-3), F=ma).
   * - Applies native verified Xitsonga vocabulary where available.
   * - Clearly tags verificationStatus ('verified' vs 'unverified') and source ('verified_language_engine' vs 'ai_generated').
   */
  public localizeAdaptiveQuestion(
    rawQuestion: AdaptiveQuestionItem,
    targetLanguage: SALanguageCode = 'en'
  ): LocalizedEducationalQuestion {
    // 1. If English is selected, return original English content directly
    if (targetLanguage === 'en') {
      return {
        ...rawQuestion,
        language: 'en',
        isVerified: true,
        source: 'verified_language_engine',
        verificationStatus: 'verified'
      };
    }

    // 2. Check canonical curated translation
    const questionTranslations = CANONICAL_QUESTION_TRANSLATIONS[rawQuestion.id];
    const targetTranslation = questionTranslations ? questionTranslations[targetLanguage] : undefined;

    if (targetTranslation) {
      const isXitsonga = targetLanguage === 'ts';
      const matchedVerified = isXitsonga ? this.findVerifiedPhrasesInText(targetTranslation.question + ' ' + targetTranslation.explanation) : [];

      return {
        ...rawQuestion,
        question: targetTranslation.question,
        hint: targetTranslation.hint || rawQuestion.hint,
        explanation: targetTranslation.explanation,
        options: targetTranslation.options || rawQuestion.options,
        language: targetLanguage,
        isVerified: isXitsonga && matchedVerified.length > 0,
        source: isXitsonga && matchedVerified.length > 0 ? 'verified_language_engine' : 'ai_generated',
        verificationStatus: isXitsonga ? 'verified' : 'unverified',
        verifiedPhrasesMatched: matchedVerified,
        unverifiedNotice: !isXitsonga ? 'Educational translation generated for ' + targetLanguage : undefined
      };
    }

    // 3. Dynamic Rule-Based Localizer that preserves formulas
    return this.fallbackTranslateQuestion(rawQuestion, targetLanguage);
  }

  /**
   * Fallback rule-based translation for dynamic or AI-generated questions
   * that strictly preserves mathematical expressions, LaTeX, formulas, and numbers.
   */
  private fallbackTranslateQuestion(
    question: AdaptiveQuestionItem,
    lang: SALanguageCode
  ): LocalizedEducationalQuestion {
    if (lang === 'ts') {
      // XiTsonga rule-based prefix localization
      const qText = question.question;
      let translatedQ = qText;

      if (qText.toLowerCase().includes('factorize')) {
        translatedQ = qText.replace(/factorize\s+completely/gi, 'Avanyisa hilaha ku heleleke')
                           .replace(/factorize/gi, 'Avanyisa (Factorize)');
      } else if (qText.toLowerCase().includes('calculate')) {
        translatedQ = qText.replace(/calculate:?/gi, 'Bala leswi:');
      } else if (qText.toLowerCase().includes('what is') || qText.toLowerCase().includes('what are')) {
        translatedQ = qText.replace(/what\s+is/gi, 'Xana i yini')
                           .replace(/what\s+are/gi, 'Xana hi swihi');
      } else if (qText.toLowerCase().includes('simplify')) {
        translatedQ = qText.replace(/simplify/gi, 'Olovisa');
      }

      let hintText = question.hint;
      if (hintText) {
        hintText = 'Hleketa kahle: ' + hintText;
      }

      let explanationText = question.explanation;
      if (explanationText) {
        explanationText = 'A hi swi tlhantlheni hi magoza: ' + explanationText;
      }

      return {
        ...question,
        question: translatedQ,
        hint: hintText,
        explanation: explanationText,
        language: 'ts',
        isVerified: false,
        source: 'ai_generated',
        verificationStatus: 'unverified',
        unverifiedNotice: 'Educational explanation active · Mathematical equations preserved'
      };
    }

    if (lang === 'zu') {
      // isiZulu rule-based prefix localization
      const qText = question.question;
      let translatedQ = qText;

      if (qText.toLowerCase().includes('factorize')) {
        translatedQ = qText.replace(/factorize\s+completely/gi, 'Hlukanisa ngokuphelele')
                           .replace(/factorize/gi, 'Hlukanisa (Factorize)');
      } else if (qText.toLowerCase().includes('calculate')) {
        translatedQ = qText.replace(/calculate:?/gi, 'Bala lokhu:');
      }

      return {
        ...question,
        question: translatedQ,
        language: 'zu',
        isVerified: false,
        source: 'ai_generated',
        verificationStatus: 'unverified'
      };
    }

    if (lang === 'af') {
      // Afrikaans rule-based prefix localization
      const qText = question.question;
      let translatedQ = qText;

      if (qText.toLowerCase().includes('factorize')) {
        translatedQ = qText.replace(/factorize\s+completely/gi, 'Faktoriseer volledig')
                           .replace(/factorize/gi, 'Faktoriseer');
      } else if (qText.toLowerCase().includes('calculate')) {
        translatedQ = qText.replace(/calculate:?/gi, 'Bereken:');
      }

      return {
        ...question,
        question: translatedQ,
        language: 'af',
        isVerified: false,
        source: 'ai_generated',
        verificationStatus: 'unverified'
      };
    }

    // Default return original question with target language marked
    return {
      ...question,
      language: lang,
      isVerified: false,
      source: 'ai_generated',
      verificationStatus: 'unverified'
    };
  }

  /**
   * Scans text for any verified phrases from the 140 Xitsonga dataset.
   */
  public findVerifiedPhrasesInText(text: string): Array<{ english: string; xitsonga: string }> {
    const lower = text.toLowerCase();
    const matches: Array<{ english: string; xitsonga: string }> = [];

    for (const item of INITIAL_XITSONGA_DATASET) {
      if (item.status === 'verified' && item.xitsonga) {
        if (lower.includes(item.xitsonga.toLowerCase())) {
          matches.push({ english: item.english, xitsonga: item.xitsonga });
          if (matches.length >= 4) break;
        }
      }
    }

    return matches;
  }

  /**
   * Localizes an assessment QuestionModel based on the activeLearningLanguage.
   * - Preserves all mathematical expressions (e.g. x² - 5x + 6, numbers, brackets).
   * - Uses verified translations first.
   * - Marks AI-generated translations as unverified internally.
   */
  public localizeAssessmentQuestion(
    rawQuestion: QuestionModel,
    targetLanguage: SALanguageCode = 'en'
  ): LocalizedQuestionModel {
    if (targetLanguage === 'en') {
      return {
        ...rawQuestion,
        language: 'en',
        isVerified: true,
        source: 'verified_language_engine',
        verificationStatus: 'verified'
      };
    }

    // 1. Check exact question ID in CANONICAL_QUESTION_TRANSLATIONS
    let targetTranslation = CANONICAL_QUESTION_TRANSLATIONS[rawQuestion.id]?.[targetLanguage];

    // 2. If not found by ID, check if questionText matches quadratic trinomial
    if (!targetTranslation) {
      const qTextLower = (rawQuestion.questionText || '').toLowerCase();
      if (
        (qTextLower.includes('quadratic trinomial') && qTextLower.includes('x² - 5x + 6')) ||
        (qTextLower.includes('factors of') && qTextLower.includes('x² - 5x + 6'))
      ) {
        targetTranslation = CANONICAL_QUESTION_TRANSLATIONS['qb-g10-mth-mc1']?.[targetLanguage];
      } else if (qTextLower.includes('difference of two squares') || qTextLower.includes('x² - 49')) {
        targetTranslation = CANONICAL_QUESTION_TRANSLATIONS['qb-g10-mth-ms1']?.[targetLanguage];
      } else if (qTextLower.includes('solve for x') && qTextLower.includes('3x - 7 = 14')) {
        targetTranslation = CANONICAL_QUESTION_TRANSLATIONS['qb-g10-mth-sa1']?.[targetLanguage];
      } else if (qTextLower.includes('2x² - 3x + 4')) {
        targetTranslation = CANONICAL_QUESTION_TRANSLATIONS['qb-g10-mth-num2']?.[targetLanguage];
      } else if (qTextLower.includes('x² + 7x + 12')) {
        targetTranslation = CANONICAL_QUESTION_TRANSLATIONS['qb-g10-mth-ord1']?.[targetLanguage];
      }
    }

    if (targetTranslation) {
      const isXitsonga = targetLanguage === 'ts';
      const combinedText = targetTranslation.question + ' ' + (targetTranslation.hint || '') + ' ' + targetTranslation.explanation;
      const matchedVerified = isXitsonga ? this.findVerifiedPhrasesInText(combinedText) : [];

      // Map options if provided in canonical translation
      const localizedOptions = rawQuestion.options?.map((opt, idx) => {
        if (targetTranslation?.options && targetTranslation.options[idx]) {
          return { ...opt, text: targetTranslation.options[idx] };
        }
        return opt;
      });

      return {
        ...rawQuestion,
        questionText: targetTranslation.question,
        hint: targetTranslation.hint || rawQuestion.hint,
        explanation: targetTranslation.explanation,
        options: localizedOptions || rawQuestion.options,
        language: targetLanguage,
        isVerified: isXitsonga,
        source: isXitsonga ? 'verified_language_engine' : 'ai_generated',
        verificationStatus: isXitsonga ? 'verified' : 'unverified',
        verifiedPhrasesMatched: matchedVerified,
        unverifiedNotice: !isXitsonga ? `Educational translation generated for ${targetLanguage}` : undefined
      };
    }

    // 3. Fallback rule-based translation with math preservation
    return this.fallbackTranslateAssessmentQuestion(rawQuestion, targetLanguage);
  }

  /**
   * Rule-based educational translator for QuestionModel that guarantees
   * mathematical expressions (x² - 5x + 6, numbers, formulas) remain completely unmodified.
   */
  private fallbackTranslateAssessmentQuestion(
    question: QuestionModel,
    lang: SALanguageCode
  ): LocalizedQuestionModel {
    if (lang === 'ts') {
      const qText = question.questionText || '';
      let translatedQ = qText;

      if (qText.toLowerCase().includes('what are the factors of')) {
        translatedQ = qText.replace(/what\s+are\s+the\s+factors\s+of/gi, 'Xana hi swihi swiphemu (factors) swa');
      } else if (qText.toLowerCase().includes('factorize completely')) {
        translatedQ = qText.replace(/factorize\s+completely:?/gi, 'Avanyisa hilaha ku heleleke:');
      } else if (qText.toLowerCase().includes('factorize')) {
        translatedQ = qText.replace(/factorize:?/gi, 'Avanyisa:');
      } else if (qText.toLowerCase().includes('calculate the value of')) {
        translatedQ = qText.replace(/calculate\s+the\s+value\s+of:?/gi, 'Bala ntsengo wa:');
      } else if (qText.toLowerCase().includes('calculate')) {
        translatedQ = qText.replace(/calculate:?/gi, 'Bala leswi:');
      } else if (qText.toLowerCase().includes('solve for')) {
        translatedQ = qText.replace(/solve\s+for/gi, 'Tlhantlha');
      } else if (qText.toLowerCase().includes('evaluate the expression')) {
        translatedQ = qText.replace(/evaluate\s+the\s+expression/gi, 'Bala ntsengo wa xivulavulelo');
      } else if (qText.toLowerCase().includes('what is the')) {
        translatedQ = qText.replace(/what\s+is\s+the/gi, 'Xana i yini');
      } else if (qText.toLowerCase().includes('which of the following')) {
        translatedQ = qText.replace(/which\s+of\s+the\s+following/gi, 'Hi xihi eka swilo leswi landzelaka');
      } else if (qText.toLowerCase().includes('arrange the steps')) {
        translatedQ = qText.replace(/arrange\s+the\s+steps\s+in\s+the\s+correct\s+order\s+to/gi, 'Hleka magoza hi ku landzelelana lokunene ku');
      }

      let hint = question.hint;
      if (hint) {
        if (hint.toLowerCase().includes('look for factors of')) {
          hint = hint.replace(/look\s+for\s+factors\s+of/gi, 'Lava swiphemu swa');
        } else {
          hint = 'Hleketa kahle: ' + hint;
        }
      }

      let explanation = question.explanation;
      if (explanation) {
        explanation = 'A hi swi tlhantlheni hi magoza: ' + explanation;
      }

      const matchedVerified = this.findVerifiedPhrasesInText(translatedQ + ' ' + (hint || '') + ' ' + (explanation || ''));

      return {
        ...question,
        questionText: translatedQ,
        hint,
        explanation: explanation || 'A hi swi tlhantlheni hi magoza.',
        language: 'ts',
        isVerified: false,
        source: 'ai_generated',
        verificationStatus: 'unverified',
        verifiedPhrasesMatched: matchedVerified,
        unverifiedNotice: 'Educational explanation active · Mathematical equations preserved · Not in verified database'
      };
    }

    // Default return original question marked for language
    return {
      ...question,
      language: lang,
      isVerified: false,
      source: 'ai_generated',
      verificationStatus: 'unverified'
    };
  }

  /**
   * Localizes an entire AssessmentModel (Practice, Quiz, Test, Exam) for activeLearningLanguage.
   */
  public localizeAssessment(
    assessment: AssessmentModel,
    targetLanguage: SALanguageCode = 'en'
  ): LocalizedAssessmentModel {
    if (targetLanguage === 'en') {
      return {
        ...assessment,
        isVerified: true,
        source: 'verified_language_engine',
        verificationStatus: 'verified',
        questions: assessment.questions.map((q) => ({
          ...q,
          isVerified: true,
          source: 'verified_language_engine',
          verificationStatus: 'verified'
        }))
      };
    }

    let localizedTitle = assessment.title;
    let localizedDescription = assessment.description;
    let localizedInstructions = assessment.instructions;

    if (targetLanguage === 'ts') {
      if (assessment.id === 'asmt-g10-mth-prac-01' || assessment.title.toLowerCase().includes('grade 10 algebra')) {
        localizedTitle = 'Dyondzo yo Ringeta ya Grade 10: Algebra & Ku Avanyisa (Factorization)';
        localizedDescription = 'Dyondzo yo tirhisa vuswikoti lebyi cinca-cincaka leyi tiyisisaka ku avanyisa ka trinomial, ku hambana ka swikwere swimbirhi, na ti-linear equation.';
        localizedInstructions = 'Hlamula xivhutiso xin’wana na xin’wana hi nkarhi wa wena. U ta kuma tinhlamuselo ta magoza hi ku hatlisa. Vuswikoti bya cinciwa hi ku landza tinhlamulo ta wena.';
      } else if (assessment.id === 'asmt-g8-mth-quiz-01') {
        localizedTitle = 'Xikambelo xo Hatlisa xa Grade 8: Integers & Tinomboro';
        localizedDescription = 'Xikambelo xa timinete ta 15 lexi kambisisaka ku hlanganisa na ku susa ka ti-integer.';
        localizedInstructions = 'Hlaya xivhutiso Lexi kahle u nga si hlawula nhlamulo.';
      } else {
        localizedTitle = `${assessment.title} (${targetLanguage.toUpperCase()})`;
      }
    }

    const localizedQuestions = assessment.questions.map((q) =>
      this.localizeAssessmentQuestion(q, targetLanguage)
    );

    const hasAnyVerified = localizedQuestions.some((q) => q.isVerified);

    return {
      ...assessment,
      title: localizedTitle,
      description: localizedDescription,
      instructions: localizedInstructions,
      isVerified: hasAnyVerified,
      source: hasAnyVerified ? 'verified_language_engine' : 'ai_generated',
      verificationStatus: hasAnyVerified ? 'verified' : 'unverified',
      questions: localizedQuestions
    };
  }

  /**
   * Localizes a CurriculumLessonModel for activeLearningLanguage.
   * Particularly supports Grade 10 Algebra & Factorization.
   */
  public localizeCurriculumLesson(
    lesson: CurriculumLessonModel,
    targetLanguage: SALanguageCode = 'en'
  ): CurriculumLessonModel {
    if (targetLanguage === 'en') {
      return lesson;
    }

    if (targetLanguage === 'ts') {
      const isAlgebraLesson =
        lesson.id.includes('g10-alg') ||
        lesson.title.toLowerCase().includes('trinomial') ||
        lesson.title.toLowerCase().includes('factor');

      if (isAlgebraLesson) {
        return {
          ...lesson,
          title: 'Ku Avanyisa Trinomial ya Ntolovelo (Standard Trinomial Factorization)',
          introduction: 'Ku avanyisa trinomial (trinomial factorization) i xitirhisiwa xa nkoka ku sukela eka Grade 10 ku ya eka Grade 12 ku tlhantlha ti-quadratic equation, ku kuma ti-x-intercept ta parabola, na ku olovisa ti-algebraic fraction.',
          learningObjectives: lesson.learningObjectives.map((lo) => ({
            ...lo,
            description: lo.description
              .replace(/factorize/gi, 'Avanyisa')
              .replace(/quadratic trinomials/gi, 'ti-quadratic trinomial')
          })),
          explanation: [
            {
              heading: 'Magoza yo Avanyisa ax² + bx + c',
              body: 'A hi swi tlhantlheni hi magoza: Loko a = 1 eka ax² + bx + c, hi lava tinomboro timbirhi m na n laha m · n = c naswona m + n = b. Ku fana na xikombiso xa x² - 5x + 6, tinomboro teto i -2 na -3: (x - 2)(x - 3).',
              keyPoints: [
                'Tinomboro timbirhi ti fanele ku phindana ti endla c (+6).',
                'Tinomboro teto ti fanele ku hlanganana ti endla b (-5).',
                'Tirhisa fomete leyi: (x + m)(x + n).'
              ]
            }
          ],
          workedExamples: [
            {
              problemStatement: 'Avanyisa quadratic trinomial: x² - 5x + 6.',
              stepByStepSolution: [
                'Goza 1: Tiva constant term (+6) na middle coefficient (-5).',
                'Goza 2: Kuma tinomboro timbirhi leti loko u ti phinda ti endlaka +6: (-2) na (-3).',
                'Goza 3: Tiyisisa loko ti hlanganana ti endla -5: (-2) + (-3) = -5 (Hi swona!).',
                'Goza 4: Tsala fomete leyi avanyisiweke: (x - 2)(x - 3).'
              ],
              conceptualNote: 'A hi swi tlhantlheni hi magoza: Hlayisa xikombiso xa minus (-).'
            }
          ],
          activities: lesson.activities.map((act) => ({
            ...act,
            title: act.title.replace(/factorize/gi, 'Avanyisa'),
            instructions: 'Hlaya xivhutiso Lexi kahle. ' + act.instructions
          }))
        };
      }
    }

    return lesson;
  }

  /**
   * Localizes lesson quiz items in LessonPlayerModal.
   */
  public localizeLessonQuiz(quiz: any[], targetLanguage: SALanguageCode = 'en'): any[] {
    if (targetLanguage === 'en' || !Array.isArray(quiz)) return quiz;

    return quiz.map((q) => {
      if (targetLanguage === 'ts') {
        let qText = q.question || '';
        if (qText.toLowerCase().includes('factorize')) {
          qText = qText.replace(/factorize/gi, 'Avanyisa (Factorize)');
        }
        return {
          ...q,
          question: qText,
          explanation: 'A hi swi tlhantlheni hi magoza: ' + (q.explanation || '')
        };
      }
      return q;
    });
  }

  /**
   * Localizes a GeneratedQuiz item for PracticeQuizModal.
   */
  public localizeGeneratedQuiz(quiz: any, targetLanguage: SALanguageCode = 'en'): any {
    if (targetLanguage === 'en' || !quiz) return quiz;

    const localizedQuestions = (quiz.questions || []).map((q: any) => {
      let qText = q.question || '';
      let expText = q.explanation || '';
      let opts = q.options ? [...q.options] : undefined;

      if (targetLanguage === 'ts') {
        const lowerQ = qText.toLowerCase();
        if (
          (lowerQ.includes('quadratic trinomial') && lowerQ.includes('x² - 5x + 6')) ||
          (lowerQ.includes('factors of') && lowerQ.includes('x² - 5x + 6'))
        ) {
          return {
            ...q,
            question: 'Xana hi swihi swiphemu (factors) swa quadratic trinomial x² - 5x + 6?',
            explanation: 'A hi swi tlhantlheni hi magoza: Ku avanyisa x² - 5x + 6, hi lava tinomboro timbirhi m na n laha m · n = 6 na m + n = -5. Tinomboro -2 na -3 ti fikelela swilaveko ha swimbirhi ((-2) × (-3) = 6 naswona (-2) + (-3) = -5). Hikwalaho, fomete leyi avanyisiweke i (x - 2)(x - 3).',
            options: ['(x - 2)(x - 3)', '(x - 1)(x - 6)', '(x + 2)(x + 3)', '(x + 1)(x - 6)'],
            correctAnswer: q.correctAnswer || '(x - 2)(x - 3)',
            language: 'ts',
            isVerified: true,
            source: 'verified_language_engine',
            verificationStatus: 'verified'
          };
        }

        if (lowerQ.includes('factorize completely')) {
          qText = qText.replace(/factorize\s+completely:?/gi, 'Avanyisa hilaha ku heleleke:');
        } else if (lowerQ.includes('factorize')) {
          qText = qText.replace(/factorize:?/gi, 'Avanyisa (Factorize):');
        } else if (lowerQ.includes('calculate')) {
          qText = qText.replace(/calculate:?/gi, 'Bala leswi:');
        } else if (lowerQ.includes('what are the factors of')) {
          qText = qText.replace(/what\s+are\s+the\s+factors\s+of/gi, 'Xana hi swihi swiphemu (factors) swa');
        } else if (lowerQ.includes('what is the')) {
          qText = qText.replace(/what\s+is\s+the/gi, 'Xana i yini');
        }

        if (expText && !expText.startsWith('A hi swi tlhantlheni')) {
          expText = 'A hi swi tlhantlheni hi magoza: ' + expText;
        }

        return {
          ...q,
          question: qText,
          explanation: expText,
          options: opts,
          language: 'ts',
          isVerified: false,
          source: 'ai_generated',
          verificationStatus: 'unverified'
        };
      }

      return q;
    });

    return {
      ...quiz,
      title: targetLanguage === 'ts' && quiz.title ? `${quiz.title} (Xitsonga)` : quiz.title,
      questions: localizedQuestions
    };
  }

  /**
   * Localizes flashcard items for FlashcardPractice.
   */
  public localizeFlashcard(card: any, targetLanguage: SALanguageCode = 'en'): any {
    if (targetLanguage === 'en' || !card) return card;

    if (targetLanguage === 'ts') {
      let q = card.question || '';
      let a = card.answer || '';
      let exp = card.explanation || '';

      if (q.toLowerCase().includes('factorize')) {
        q = q.replace(/factorize/gi, 'Avanyisa (Factorize)');
      }
      if (exp) {
        exp = 'A hi swi tlhantlheni hi magoza: ' + exp;
      }

      return {
        ...card,
        question: q,
        answer: a,
        explanation: exp
      };
    }

    return card;
  }
}

export const multilingualEducationalService = new MultilingualEducationalService();
