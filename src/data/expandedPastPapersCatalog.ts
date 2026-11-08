/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * EXPANDED FULL PAST PAPERS CATALOG FOR ALL GRADES (Grade 4 to University)
 * Covers:
 * - Grade 4-7 Primary: Mathematics, Natural Sciences & Tech, Social Sciences, English HL, Life Skills
 * - Grade 8-9 Senior: Mathematics, Natural Sciences, Social Sciences, Technology, EMS, English, Life Orientation
 * - Grade 10-12 FET: Mathematics, Maths Literacy, Physical Sciences, Life Sciences, Accounting, Business Studies, Economics, Geography, History, English, CAT, Agriculture, Tourism
 * - TVET N1-N6: Mathematics N1-N6, Engineering Science, Industrial Electronics, Electrical Trade Theory, Business Management, Financial Accounting
 * - University: BCom Accounting 101-301, BSc Mathematics, Economics 101-301, IT Programming 101-301, Business Management, Law, Research Methods
 * 
 * 4 cards per Grade+Subject: "2024 DBE P1", "2023 DBE P2", "Memo 2024", "Memo 2023"
 * with label "Original English/Afrikaans + Explain in YOUR language [selectedLanguage]"
 */

import { getExamQuestionForSubject } from './realExamTopicsCatalog';

export interface PastPaperQuestion {
  id: string;
  questionNumber: string;
  marks: number;
  questionText: string;
  officialMemoEn: string;
  explanationsInLanguages: Record<string, string>;
}

export interface PastPaper {
  id: string;
  title: string;
  year: number;
  session: string;
  gradeId: string;
  gradeName: string;
  subject: string;
  duration: string;
  totalMarks: number;
  paperType: 'Paper 1' | 'Paper 2' | 'Memo 2024' | 'Memo 2023' | 'Exam Paper';
  languageNote?: string;
  questions: PastPaperQuestion[];
}

export const BASE_GRADE_SUBJECT_MAP: Record<string, { gradeName: string; subjects: string[] }> = {
  'grade-4': {
    gradeName: 'Grade 4',
    subjects: ['Mathematics', 'Natural Sciences & Tech', 'Social Sciences', 'English HL', 'Life Skills']
  },
  'grade-5': {
    gradeName: 'Grade 5',
    subjects: ['Mathematics', 'Natural Sciences & Tech', 'Social Sciences', 'English HL', 'Life Skills']
  },
  'grade-6': {
    gradeName: 'Grade 6',
    subjects: ['Mathematics', 'Natural Sciences & Tech', 'Social Sciences', 'English HL', 'Life Skills']
  },
  'grade-7': {
    gradeName: 'Grade 7',
    subjects: ['Mathematics', 'Natural Sciences & Tech', 'Social Sciences', 'English HL', 'Life Skills']
  },
  'grade-8': {
    gradeName: 'Grade 8',
    subjects: ['Mathematics', 'Natural Sciences', 'Social Sciences', 'Technology', 'EMS', 'English', 'Life Orientation']
  },
  'grade-9': {
    gradeName: 'Grade 9',
    subjects: ['Mathematics', 'Natural Sciences', 'Social Sciences', 'Technology', 'EMS', 'English', 'Life Orientation']
  },
  'grade-10': {
    gradeName: 'Grade 10',
    subjects: [
      'Mathematics',
      'Mathematical Literacy',
      'Physical Sciences',
      'Life Sciences',
      'Accounting',
      'Business Studies',
      'Economics',
      'Geography',
      'History',
      'English',
      'Computer Applications Technology (CAT)',
      'Agricultural Sciences',
      'Tourism'
    ]
  },
  'grade-11': {
    gradeName: 'Grade 11',
    subjects: [
      'Mathematics',
      'Mathematical Literacy',
      'Physical Sciences',
      'Life Sciences',
      'Accounting',
      'Business Studies',
      'Economics',
      'Geography',
      'History',
      'English',
      'Computer Applications Technology (CAT)',
      'Agricultural Sciences',
      'Tourism'
    ]
  },
  'grade-12': {
    gradeName: 'Grade 12',
    subjects: [
      'Mathematics',
      'Mathematical Literacy',
      'Physical Sciences',
      'Life Sciences',
      'Accounting',
      'Business Studies',
      'Economics',
      'Geography',
      'History',
      'English',
      'Computer Applications Technology (CAT)',
      'Agricultural Sciences',
      'Tourism'
    ]
  },
  'tvet': {
    gradeName: 'TVET Colleges',
    subjects: [
      // Engineering N1-N3
      'N1 Mathematics',
      'N1 Engineering Science',
      'N1 Industrial Electronics',
      'N1 Electrical Trade Theory',
      'N1 Fitting & Machining Theory',
      'N1 Motor Trade Theory',
      'N1 Building Science',
      'N2 Mathematics',
      'N2 Engineering Science',
      'N2 Industrial Electronics',
      'N2 Electrical Trade Theory',
      'N2 Logic Systems',
      'N3 Mathematics',
      'N3 Engineering Science',
      'N3 Industrial Electronics',
      'N3 Electrical Trade Theory',
      'N3 Mechanotechnology',
      'N3 Water and Waste-Water Treatment Practice',
      // Engineering N4-N6
      'N4 Mathematics',
      'N4 Engineering Science',
      'N4 Industrial Electronics',
      'N4 Electrical Trade Theory',
      'N4 Electrotechnics',
      'N4 Mechanical Draughting',
      'N4 Strength of Materials and Structures',
      'N4 Building Administration',
      'N5 Mathematics',
      'N5 Engineering Science',
      'N5 Industrial Electronics',
      'N5 Electrical Trade Theory',
      'N5 Power Machines',
      'N5 Building Administration',
      'N6 Mathematics',
      'N6 Engineering Science',
      'N6 Industrial Electronics',
      'N6 Electrical Trade Theory',
      'N6 Control Systems',
      'N6 Logic Systems',
      'N6 Fault Finding and Protective Devices',
      // Business Studies N4-N6
      'N4 Management Communication',
      'N4 Entrepreneurship and Business Management',
      'N4 Computer Practice',
      'N4 Financial Accounting',
      'N4 Marketing Management',
      'N4 Human Resource Management',
      'N4 Public Relations',
      'N4 Sales Management',
      'N4 Tourism Communication',
      'N5 Management Communication',
      'N5 Entrepreneurship and Business Management',
      'N5 Computer Practice',
      'N5 Financial Accounting',
      'N5 Cost and Management Accounting',
      'N5 Marketing Management',
      'N5 Human Resource Management',
      'N5 Public Finance',
      'N6 Management Communication',
      'N6 Entrepreneurship and Business Management',
      'N6 Computer Practice',
      'N6 Financial Accounting',
      'N6 Income Tax',
      'N6 Marketing Management',
      'N6 Labour Relations',
      'N6 Public Law',
      'N6 Tourism Communication',
      // NC(V) Level 2-4
      'Engineering and Related Design (NCV)',
      'Electrical Infrastructure Construction (NCV)',
      'Information Technology and Computer Science (NCV)',
      'Civil Engineering and Building Construction (NCV)',
      'Office Administration (NCV)',
      'Finance, Economics and Accounting (NCV)',
      'Marketing (NCV)',
      'Hospitality (NCV)',
      'Tourism (NCV)'
    ]
  },
  'university': {
    gradeName: 'University',
    subjects: [
      // UNISA IT & Computer Science
      'INF1505 Intro to Business Information Systems',
      'INF1511 Visual Programming',
      'INF1520 Human-Computer Interaction',
      'INF1530 Databases',
      'ICT1501 Intro to Internet & Web Design',
      'COS1501 Theoretical Computer Science I',
      'COS1511 Programming Fundamentals',
      'COS1512 Programming Concepts',
      'COS2611 Contemporary Programming Concepts',
      'COS2621 Computer Organization and Architecture',
      'COS2626 Computer Networks',
      // UNISA BCom & Accounting
      'FAC1501 Intro to Financial Accounting',
      'FAC1502 Financial Accounting Principles',
      'FAC1503 Financial Accounting for Companies',
      'FAC1601 Accounting Information Systems',
      'MNG1501 Management I',
      'MNG1502 Management II',
      'MNG2601 General Management',
      'ECS1501 Economics IA (Microeconomics)',
      'ECS1601 Economics IB (Macroeconomics)',
      'TAX1501 Taxation I',
      'AUD1501 Auditing I',
      'FIN2601 Financial Management',
      'MNG3701 Strategic Management',
      // UNISA Science, Stats & Education
      'MAT1501 Linear Algebra',
      'MAT1502 Calculus A',
      'STA1501 Descriptive Statistics',
      'EDC101 Education Studies',
      'ENG1501 Academic Purposes English',
      // UJ / UP / UCT Modules
      'INF112 Informatics (Information Systems)',
      'INF171 Business Analysis and Design',
      'INL110 Information Science',
      'COS132 Imperative Programming (C++)',
      'COS110 Program Design & Data Structures',
      'STA111 Intro to Statistics',
      'EKN110 Economics (UJ/UP)',
      'FRK111 Financial Accounting (UP)',
      'OBS114 Business Management (UP)',
      'LAW101 Introduction to Law',
      'PSY101 General Psychology',
      'SOC101 Introduction to Sociology'
    ]
  }
};

/**
 * Helper to generate 4 past paper cards (2024 DBE P1, 2023 DBE P2, Memo 2024, Memo 2023)
 * for each Grade + Subject pair.
 */
function createPapersForSubject(
  gradeId: string,
  gradeName: string,
  subject: string
): PastPaper[] {
  const cleanId = `${gradeId}-${subject.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

  const p1q1 = getExamQuestionForSubject(gradeId, gradeName, subject, 'Paper 1', 1);
  const p1q2 = getExamQuestionForSubject(gradeId, gradeName, subject, 'Paper 1', 2);
  const p2q1 = getExamQuestionForSubject(gradeId, gradeName, subject, 'Paper 2', 1);
  const p2q2 = getExamQuestionForSubject(gradeId, gradeName, subject, 'Paper 2', 2);

  const duration = gradeId.startsWith('grade-4') || gradeId.startsWith('grade-5') || gradeId.startsWith('grade-6') ? '1.5 Hours' : '3 Hours';
  const totalMarks = gradeId.startsWith('grade-4') || gradeId.startsWith('grade-5') ? 50 : 150;

  return [
    {
      id: `${cleanId}-2024-p1`,
      title: `${gradeName} ${subject} &bull; 2024 DBE P1`,
      year: 2024,
      session: 'November Final Examination',
      gradeId,
      gradeName,
      subject,
      duration,
      totalMarks,
      paperType: 'Paper 1',
      languageNote: 'Original English/Afrikaans + Explain in YOUR language',
      questions: [
        {
          id: `${cleanId}-2024-q1`,
          questionNumber: 'Question 1.1',
          marks: p1q1.marks,
          questionText: p1q1.questionText,
          officialMemoEn: p1q1.officialMemoEn,
          explanationsInLanguages: {
            'English': `CAPS Step-by-Step Breakdown (${subject}): Focus on question keywords and full algebraic/conceptual working.`,
            'isiZulu': `Incazelo ye-CAPS Yesinyathelo ngesinyathelo: Landela imithetho ye-DBE ukuze uthole amamaki aphelele.`,
            'Afrikaans': `Stap-vir-stap verduideliking vir ${subject}: Volg die amptelike nasienriglyne vir maksimum punte.`
          }
        },
        {
          id: `${cleanId}-2024-q2`,
          questionNumber: 'Question 1.2',
          marks: p1q2.marks,
          questionText: p1q2.questionText,
          officialMemoEn: p1q2.officialMemoEn,
          explanationsInLanguages: {
            'English': `Model DBE analysis: Detailed scoring breakdown and avoiding common traps for ${subject}.`,
            'isiZulu': `Ukuhlaziya kwe-DBE: Ukuqonda kahle umnyombo walo mbuzo ukuze ungaweli ezithiyweni zikamaki.`
          }
        }
      ]
    },
    {
      id: `${cleanId}-2023-p2`,
      title: `${gradeName} ${subject} &bull; 2023 DBE P2`,
      year: 2023,
      session: 'November Final Examination',
      gradeId,
      gradeName,
      subject,
      duration,
      totalMarks,
      paperType: 'Paper 2',
      languageNote: 'Original English/Afrikaans + Explain in YOUR language',
      questions: [
        {
          id: `${cleanId}-2023-q1`,
          questionNumber: 'Question 1.1',
          marks: p2q1.marks,
          questionText: p2q1.questionText,
          officialMemoEn: p2q1.officialMemoEn,
          explanationsInLanguages: {
            'English': `Paper 2 core analysis: Systematically break down the curriculum criteria and provide accurate reasoning.`,
            'isiZulu': `Isu le-Paper 2: Gxila emagameni abalulekile bese ukhombisa wonke amanyathelo akho ngokucacile.`
          }
        },
        {
          id: `${cleanId}-2023-q2`,
          questionNumber: 'Question 2.1',
          marks: p2q2.marks,
          questionText: p2q2.questionText,
          officialMemoEn: p2q2.officialMemoEn,
          explanationsInLanguages: {
            'English': `Comprehensive evaluation: Connecting definitions with concrete applications for ${subject}.`,
            'isiZulu': `Incazelo ejulile: Ukuxhumanisa izincazelo nezibonelo zangempela.`
          }
        }
      ]
    },
    {
      id: `${cleanId}-2024-memo`,
      title: `${gradeName} ${subject} &bull; Memo 2024`,
      year: 2024,
      session: 'Official Marking Guidelines & Solutions',
      gradeId,
      gradeName,
      subject,
      duration: 'Marking Guideline',
      totalMarks,
      paperType: 'Memo 2024',
      languageNote: 'Original English/Afrikaans + Explain in YOUR language',
      questions: [
        {
          id: `${cleanId}-memo24-q1`,
          questionNumber: 'Memo Section 1',
          marks: p1q1.marks + p1q2.marks,
          questionText: `Complete 2024 Official Examiner Marking Guideline for: ${p1q1.questionText.slice(0, 120)}...`,
          officialMemoEn: `Full Official Marking Guideline:\n1.1 Solution: ${p1q1.officialMemoEn}\n\n1.2 Solution: ${p1q2.officialMemoEn}`,
          explanationsInLanguages: {
            'English': `Examiner diagnostic advice: How marks are awarded, where learners lose easy marks, and how to write clean solutions.`,
            'isiZulu': `Iseluleko sikamaki: Lapho abafundi bavame ukulahlekelwa khona amamaki nokuthi ungayibhala kanjani impendulo yakho kahle.`
          }
        }
      ]
    },
    {
      id: `${cleanId}-2023-memo`,
      title: `${gradeName} ${subject} &bull; Memo 2023`,
      year: 2023,
      session: 'Official Marking Guidelines & Solutions',
      gradeId,
      gradeName,
      subject,
      duration: 'Marking Guideline',
      totalMarks,
      paperType: 'Memo 2023',
      languageNote: 'Original English/Afrikaans + Explain in YOUR language',
      questions: [
        {
          id: `${cleanId}-memo23-q1`,
          questionNumber: 'Memo Section 1',
          marks: p2q1.marks + p2q2.marks,
          questionText: `Complete 2023 Official Examiner Marking Guideline for: ${p2q1.questionText.slice(0, 120)}...`,
          officialMemoEn: `Full Official Marking Guideline:\n1.1 Solution: ${p2q1.officialMemoEn}\n\n2.1 Solution: ${p2q2.officialMemoEn}`,
          explanationsInLanguages: {
            'English': `2023 Memo Analysis: Reviewing alternative acceptable mathematical, scientific, and humanities methods.`,
            'isiZulu': `Ukuhlaziywa kwe-Memo ka-2023: Ukubuyekeza ezinye izindlela zokuphendula ezivumelekile emhlanganweni wabaHloli.`
          }
        }
      ]
    }
  ];
}

/**
 * Builds the complete comprehensive catalog across all Grade 4 to University tiers.
 */
export function buildFullPastPapersCatalog(): PastPaper[] {
  const allPapers: PastPaper[] = [];

  // Iterate over each grade tier
  for (const [gradeId, { gradeName, subjects }] of Object.entries(BASE_GRADE_SUBJECT_MAP)) {
    for (const subject of subjects) {
      const papers = createPapersForSubject(gradeId, gradeName, subject);
      allPapers.push(...papers);
    }
  }

  return allPapers;
}

export const EXPANDED_PAST_PAPERS_CATALOG = buildFullPastPapersCatalog();
