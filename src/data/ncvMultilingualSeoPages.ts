/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 11-LANGUAGE TVET & NCV LEVEL 2-4 SEO LANDING PAGES
 */

export interface NcvMultilingualSeoPageData {
  slug: string;
  path: string;
  title: string;
  h1: string;
  metaDescription: string;
  badge: string;
  leadParagraph: string;
  subLeadParagraph: string;
  languagesHeading: string;
  languageHighlights: Array<{ language: string; term: string }>;
  allLanguagesLine: string;
  topicsHeading: string;
  topicsCovered: string[];
  howItWorksHeading: string;
  howItWorksSteps: string[];
  closingHighlight: string;
  keywords: string;
  relatedChapterPath: string;
  relatedChapterLabel: string;
  tutorPresetLang: string;
}

export const NCV_MULTILINGUAL_SEO_PAGES: NcvMultilingualSeoPageData[] = [
  {
    slug: 'ncv-office-administration-11-languages',
    path: '/study-guide/ncv-office-administration-11-languages',
    title: 'NCV Office Administration Level 2-4 in All 11 Languages | Nexovian',
    h1: 'NCV Office Administration Level 2-4 in All 11 Languages | Nexovian',
    metaDescription:
      'NCV Office Administration Level 2-4 taught in all 11 South African official languages on Nexovian: Xitsonga (Vulawuri bya Hofisi), Sepedi (Taolo ya Ofisi), isiZulu (Ukuphathwa Kwehhovisi), Tshivenda (Ndangulo ya Ofisi) & more TVET guides.',
    badge: 'NCV Office Administration • All 11 Languages',
    leadParagraph:
      "Nexovian is South Africa's only NCV Office Administration platform teaching in all 11 official languages. DHET textbooks are English only. Nexovian translates Office Administration into your home language.",
    subLeadParagraph:
      'Select your home language on nexovian.group and master NCV Office Administration Level 2, Level 3, and Level 4 with clear explanations, past papers, and step-by-step assessment help.',
    languagesHeading: 'Office Administration Available in All 11 Official Languages',
    languageHighlights: [
      { language: 'Xitsonga', term: 'Vulawuri bya Hofisi NCV Level 2-4' },
      { language: 'Sepedi', term: 'Taolo ya Ofisi' },
      { language: 'isiZulu', term: 'Ukuphathwa Kwehhovisi' },
      { language: 'Tshivenda', term: 'Ndangulo ya Ofisi' }
    ],
    allLanguagesLine:
      'Also available in: Sesotho, Setswana, siSwati (Siswati), isiNdebele, isiXhosa, Afrikaans, and English.',
    topicsHeading: 'What We Cover in NCV Office Administration (Level 2–4)',
    topicsCovered: [
      'Office Data Processing — MS Word, Excel formulas (=SUM, =AVERAGE), Mail Merge & typing',
      'Business Practice — business operations, ethics & customer communication',
      'Office Practice — filing systems, reception, scheduling & correspondence',
      'New Venture Creation, Life Orientation, English & Maths Literacy',
      'Original DHET Past Papers & Assessments explained step-by-step in your language'
    ],
    howItWorksHeading: 'How to Start Learning Office Administration in Your Language',
    howItWorksSteps: [
      'Go to nexovian.group homepage',
      'Select your language (Xitsonga, Sepedi, isiZulu, Tshivenda, or any of the 11 official languages)',
      'Open NCV Office Administration Level 2–4 or search any topic',
      'Get past papers, study guides, and AI tutor answers in your home language'
    ],
    closingHighlight:
      'Select language on nexovian.group and start learning today. Only on Nexovian - 11-language TVET education.',
    keywords: 'NCV Office Administration Xitsonga Sepedi Zulu Venda',
    relatedChapterPath: '/study-guide/ncv-level-2-3-4/ncv-office-data-processing',
    relatedChapterLabel: 'Open NCV Office Data Processing Guide',
    tutorPresetLang: 'ts'
  },
  {
    slug: 'electrical-trade-theory-11-languages',
    path: '/study-guide/electrical-trade-theory-11-languages',
    title: 'Electrical Trade Theory N1-N3 & NCV in All 11 Languages | Nexovian',
    h1: 'Electrical Trade Theory N1-N3 & NCV in All 11 Languages | Nexovian',
    metaDescription:
      'Learn Electrical Trade Theory N1, N2, N3 & NCV Level 2-4 in Xitsonga, Sepedi, isiZulu, Tshivenda & all 11 SA languages on Nexovian. AC/DC circuits, transformers, earthing, Ohm’s Law & TVET past papers.',
    badge: 'TVET Electrical N1–N3 & NCV L2–L4 • 11 Languages',
    leadParagraph:
      'Learn Electrical Trade Theory in Xitsonga, Sepedi, Zulu, Venda, Sesotho, Setswana, Siswati, Ndebele, Xhosa, Afrikaans, English.',
    subLeadParagraph:
      "Nexovian explains Future Managers and DHET Electrical books in your language: AC/DC circuits, transformers, earthing, switchgear, Ohm's Law, electrical machines N1 N2 N3 NCV Level 2-4.",
    languagesHeading: '11-Language Electrical AI Tutor & Past Papers',
    languageHighlights: [
      { language: 'Xitsonga', term: 'AC/DC circuits, ti-transformer & gezi hi Xitsonga' },
      { language: 'Sepedi', term: 'Ditšhikoloho tša mohlagase le Melao ya Ohm ka Sepedi' },
      { language: 'isiZulu', term: 'Amasekhethi kagesi, ama-transformer ne-earthing ngesiZulu' },
      { language: 'Tshivenda', term: 'Mudagasi, zwi-transformer na u tsireledza nga Tshivenda' }
    ],
    allLanguagesLine:
      'All 11 official languages supported: Xitsonga, Sepedi, isiZulu, Tshivenda, Sesotho, Setswana, siSwati, isiNdebele, isiXhosa, Afrikaans & English.',
    topicsHeading: 'Electrical Modules & Past Papers Explained in Your Language',
    topicsCovered: [
      'AC/DC Circuits — series, parallel & power calculations',
      'Transformers and Electrical Machines (N1, N2, N3 & NCV Level 2–4)',
      'Earthing, Switchgear & Electrical Protection Systems',
      "Ohm's Law (V = I × R), Power (P = V × I) & Energy (E = P × t)",
      'Past papers explained step-by-step in Xitsonga, Sepedi, isiZulu & all 11 languages'
    ],
    howItWorksHeading: 'How to Learn Electrical Trade Theory on Nexovian',
    howItWorksSteps: [
      'Go to nexovian.group',
      'Choose your home language',
      'Search "Electrical Trade Theory"',
      'Get instant step-by-step answer and past paper memo explanation in your language'
    ],
    closingHighlight:
      'Only platform in SA with 11-language Electrical AI tutor. Past papers explained in Xitsonga, Sepedi, Zulu.',
    keywords: 'Electrical Trade Theory Xitsonga Sepedi Zulu Venda N1 N2 N3',
    relatedChapterPath: '/study-guide/ncv-level-2-3-4/ncv-electrical-principles-and-practice',
    relatedChapterLabel: 'Open NCV Electrical Principles Guide',
    tutorPresetLang: 'ts'
  },
  {
    slug: 'information-technology-ncv-11-languages',
    path: '/study-guide/information-technology-ncv-11-languages',
    title: 'NCV Information Technology Level 2-4 in All 11 Languages | Nexovian',
    h1: 'NCV Information Technology Level 2-4 in All 11 Languages | Nexovian',
    metaDescription:
      'NCV Information Technology & Computer Programming Level 2-4 in Xitsonga, Sepedi, isiZulu, Tshivenda & all 11 official languages. Systems Analysis, Coding, Networking, Databases & TVET Past Papers.',
    badge: 'NCV Information Technology • All 11 Languages',
    leadParagraph:
      'IT and Computer Programming NCV Level 2-4 taught in 11 languages only on Nexovian. DHET IT subjects are English only.',
    subLeadParagraph:
      'Nexovian teaches: Systems Analysis, Computer Programming, Data Communication, Past Papers in Xitsonga, Sepedi, Zulu, Venda, Sotho, Tswana, Swati, Ndebele, Xhosa, Afrikaans. Learn coding, networking, databases in your home language.',
    languagesHeading: 'Learn Coding, Networking & Databases in Your Home Language',
    languageHighlights: [
      { language: 'Xitsonga', term: 'Computer Programming, Databases & Networks hi Xitsonga' },
      { language: 'Sepedi', term: 'Go ngwala khoutu, didatapeisi le dinetweke ka Sepedi' },
      { language: 'isiZulu', term: 'Uhlelo lwekhompyutha, amadathabheyisi namanethiwekhi ngesiZulu' },
      { language: 'Tshivenda', term: 'U phurogirema, dzidathabeisi na netiweke nga Tshivenda' }
    ],
    allLanguagesLine:
      'Full 11-language coverage: Xitsonga, Sepedi, isiZulu, Tshivenda, Sesotho, Setswana, siSwati, isiNdebele, isiXhosa, Afrikaans & English.',
    topicsHeading: 'NCV Information Technology L2–L4 Subjects Covered',
    topicsCovered: [
      'Systems Analysis & Design — SDLC, Algorithms & Flowcharts',
      'Computer Programming — Variables, If-Else logic, Loops & HTML',
      'Data Communication & Networking fundamentals',
      'Relational Databases — Tables, Primary Keys & SQL basics',
      'DHET IT Past Papers & AI Tutor answers in Xitsonga, Sepedi, isiZulu & more'
    ],
    howItWorksHeading: 'How NCV IT Works on Nexovian',
    howItWorksSteps: [
      'Visit nexovian.group',
      'Select your preferred South African language',
      'Search "Information Technology" or "NCV IT"',
      'Learn coding, databases & networking with AI Tutor explanations in your home language'
    ],
    closingHighlight:
      'AI tutor answers IT questions in Xitsonga etc. nexovian.group - Select language - Search IT - Learn. Only multilingual IT TVET platform in South Africa.',
    keywords: 'NCV IT Xitsonga Sepedi Zulu Venda Information Technology',
    relatedChapterPath: '/study-guide/ncv-level-2-3-4/ncv-information-technology',
    relatedChapterLabel: 'Open NCV Information Technology Guide',
    tutorPresetLang: 'ts'
  },
  {
    slug: 'financial-management-ncv-11-languages',
    path: '/study-guide/financial-management-ncv-11-languages',
    title: 'NCV Financial Management Level 2-4 in All 11 Languages | Nexovian',
    h1: 'NCV Financial Management Level 2-4 in All 11 Languages | Nexovian',
    metaDescription:
      'NCV Financial Management, Applied Accounting & Economic Environment Level 2-4 in all 11 official languages on Nexovian. DHET past papers and AI tutor in Xitsonga, Sepedi, isiZulu & Tshivenda.',
    badge: 'NCV Finance & Accounting • All 11 Languages',
    leadParagraph:
      'Financial Management, Accounting, Economics NCV Level 2-4 in all 11 official languages.',
    subLeadParagraph:
      'Nexovian explains: Applied Accounting, Financial Management, Economic Environment, Past Papers in Xitsonga, Sepedi, Zulu, Venda, Sotho, Tswana, Swati, Ndebele, Xhosa. DHET Financial books English only - Nexovian translates to your language.',
    languagesHeading: '11-Language Financial Management & Accounting Support',
    languageHighlights: [
      { language: 'Xitsonga', term: 'Applied Accounting, Debit/Credit & Economics hi Xitsonga' },
      { language: 'Sepedi', term: 'Taolo ya Ditšhelete, Akhaonting le Ekonomi ka Sepedi' },
      { language: 'isiZulu', term: 'Ukuphathwa Kwezimali, Ukubalwa Kwezimali & Umphakathi ngesiZulu' },
      { language: 'Tshivenda', term: 'Ndangulo ya Masheleni, Akhaunthini na Ekonomi nga Tshivenda' }
    ],
    allLanguagesLine:
      'Supported across Xitsonga, Sepedi, isiZulu, Tshivenda, Sesotho, Setswana, siSwati, isiNdebele, isiXhosa, Afrikaans & English.',
    topicsHeading: 'NCV Financial Modules Covered Step-by-Step',
    topicsCovered: [
      'Applied Accounting — Journals, Ledgers, Trial Balance, Income Statement & Balance Sheet',
      'Financial Management — Accounting Equation (Assets = Liabilities + Equity) & Profit',
      'Economic Environment — Supply & Demand, Inflation, Interest Rates & SA VAT (15%)',
      'AI tutor for step-by-step Financial calculations in your home language',
      'Original DHET Past Papers with bilingual & mother-tongue memos'
    ],
    howItWorksHeading: 'How to Master NCV Finance in Your Home Language',
    howItWorksSteps: [
      'Open nexovian.group',
      'Pick your language (Xitsonga, Sepedi, isiZulu, Tshivenda, or any of the 11 official languages)',
      'Open NCV Finance, Economics & Accounting or search any formula',
      'Practise calculations with worked examples and the AI Tutor in your language'
    ],
    closingHighlight:
      'AI tutor for Financial calculations in home language. nexovian.group - 11-language Financial education only on Nexovian.',
    keywords: 'NCV Financial Management Xitsonga Sepedi Zulu Venda',
    relatedChapterPath: '/study-guide/ncv-level-2-3-4/ncv-finance-financial-accounting',
    relatedChapterLabel: 'Open NCV Financial Accounting Guide',
    tutorPresetLang: 'ts'
  },
  {
    slug: 'mathematics-ncv-11-languages',
    path: '/study-guide/mathematics-ncv-11-languages',
    title: 'NCV Mathematics Level 2-4 in All 11 Languages | Nexovian',
    h1: 'NCV Mathematics Level 2-4 in All 11 Languages | Nexovian',
    metaDescription:
      'NCV Mathematics Level 2-4 taught in Xitsonga, Sepedi, isiZulu, Tshivenda & all 11 SA languages on Nexovian. Algebra, Trigonometry, Calculus, Statistics & DHET past paper solutions step-by-step.',
    badge: 'NCV Mathematics L2–L4 • All 11 Languages',
    leadParagraph:
      'Mathematics NCV Level 2-4 taught in Xitsonga, Sepedi, Zulu, Venda and all 11 languages only on Nexovian.',
    subLeadParagraph:
      'We explain: Algebra, Trigonometry, Calculus, Statistics, Past Papers in your home language. Ask any Maths question in Xitsonga, Sepedi, Zulu on nexovian.group and get step-by-step solution in your language.',
    languagesHeading: 'Only 11-Language Maths TVET Platform in South Africa',
    languageHighlights: [
      { language: 'Xitsonga', term: 'Algebra, Trigonometry, Calculus & Statistics hi Xitsonga' },
      { language: 'Sepedi', term: 'Mathematiki ya NCV Level 2-4 le ditharollo ka Sepedi' },
      { language: 'isiZulu', term: 'Izibalo ze-NCV: i-Algebra, i-Trigonometry & i-Calculus ngesiZulu' },
      { language: 'Tshivenda', term: 'Mbalo dza NCV na thandululo nga Tshivenda' }
    ],
    allLanguagesLine:
      'Available in Xitsonga, Sepedi, isiZulu, Tshivenda, Sesotho, Setswana, siSwati, isiNdebele, isiXhosa, Afrikaans & English.',
    topicsHeading: 'NCV Mathematics Topics & Step-by-Step Solver',
    topicsCovered: [
      'Algebra — equations, exponents, logs & factorisation',
      'Trigonometry — ratios, identities, graphs & triangles',
      'Calculus — limits, derivatives & rates of change',
      'Statistics & Data Handling — mean, median, variance & probability',
      'DHET NCV Maths Past Papers + Step-by-Step Calculator explanations in your language'
    ],
    howItWorksHeading: 'How to Solve NCV Maths in Your Home Language',
    howItWorksSteps: [
      'Go to nexovian.group',
      'Select Xitsonga, Sepedi, isiZulu, Tshivenda, or any of the 11 official languages',
      'Ask any Maths question or enter an equation in the Step-by-Step Calculator',
      'Read the clear step-by-step Maths solution in your home language'
    ],
    closingHighlight:
      'Only 11-language Maths TVET platform in South Africa. DHET Maths in English - Nexovian in your language.',
    keywords: 'NCV Mathematics Xitsonga Sepedi Zulu Venda',
    relatedChapterPath: '/study-guide/maths-grade-12/algebra',
    relatedChapterLabel: 'Open Algebra & Maths Study Guide',
    tutorPresetLang: 'ts'
  }
];

export function findNcvMultilingualSeoPage(pathname: string): NcvMultilingualSeoPageData | null {
  const clean = pathname.toLowerCase().replace(/\/+$/, '');
  if (clean === '/study-guide/ncv-office-administration-xitsonga') {
    return NCV_MULTILINGUAL_SEO_PAGES[0];
  }
  return NCV_MULTILINGUAL_SEO_PAGES.find((p) => p.path === clean) || null;
}
