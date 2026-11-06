/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN FULL GRADE & SUBJECT CATALOG (Grade 4 to University)
 * Covers: Primary CAPS (Grade 4-7), Senior CAPS (Grade 8-9),
 * FET CAPS (Grade 10-12), TVET (N1-N6), and University (Year 1 to Honours).
 */

export const GRADE_OPTIONS = [
  'Grade 4',
  'Grade 5',
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9',
  'Grade 10',
  'Grade 11',
  'Grade 12',
  'TVET N1',
  'TVET N2',
  'TVET N3',
  'TVET N4',
  'TVET N5',
  'TVET N6',
  'University Year 1',
  'University Year 2',
  'University Year 3',
  'University Honours'
] as const;

export type GradeOption = typeof GRADE_OPTIONS[number];

// 1. Primary CAPS (Grade 4–7)
export const PRIMARY_CAPS_SUBJECTS = [
  'Mathematics',
  'Natural Sciences & Technology',
  'Social Sciences (History & Geography)',
  'English Home Language',
  'English First Additional Language',
  'Home Language (11 Official Languages)',
  'Life Skills',
  'Creative Arts & Culture'
];

// 2. Senior CAPS (Grade 8–9)
export const SENIOR_CAPS_SUBJECTS = [
  'Mathematics',
  'Natural Sciences',
  'Social Sciences',
  'Technology',
  'Economic & Management Sciences (EMS)',
  'English Home Language',
  'English First Additional Language',
  'Home Language',
  'Life Orientation',
  'Creative Arts'
];

// 3. FET CAPS (Grade 10–12) — ~30 official CAPS subjects
export const FET_CAPS_SUBJECTS = [
  'Mathematics',
  'Mathematical Literacy',
  'Technical Mathematics',
  'Physical Sciences',
  'Technical Sciences',
  'Life Sciences',
  'Accounting',
  'Economics',
  'Business Studies',
  'Geography',
  'History',
  'English Home Language',
  'English First Additional Language',
  'Home Language (11 Languages)',
  'Life Orientation',
  'Computer Applications Technology (CAT)',
  'Information Technology (IT)',
  'Agricultural Sciences',
  'Agricultural Management Practices',
  'Tourism',
  'Consumer Studies',
  'Hospitality Studies',
  'Engineering Graphics & Design (EGD)',
  'Civil Technology',
  'Electrical Technology',
  'Mechanical Technology',
  'Visual Arts',
  'Dramatic Arts',
  'Music',
  'Religion Studies'
];

// 4. TVET Colleges (N1–N6)
export const TVET_SUBJECTS = [
  'Mathematics N1-N6',
  'Engineering Science N1-N4',
  'Industrial Electronics N1-N6',
  'Electrical Trade Theory N1-N3',
  'Electrotechnics N4-N6',
  'Fitting & Machining Theory',
  'Motor Trade Theory',
  'Diesel Trade Theory',
  'Mechanotechnics N4-N6',
  'Financial Accounting N4-N6',
  'Management Communication N4-N6',
  'Entrepreneurship & Business Management N4-N6',
  'Cost & Management Accounting N5-N6',
  'Computer Practice N4-N6',
  'Public Administration N4-N6',
  'Personnel Management N4-N6',
  'Marketing Management N4-N6'
];

// 5. University Higher Education (Year 1 to Honours)
export const UNIVERSITY_SUBJECTS = [
  'BCom Accounting & Financial Reporting',
  'BSc Mathematics & Calculus',
  'Linear Algebra & Differential Equations',
  'Microeconomics & Macroeconomics (Economics 101)',
  'Computer Science & Algorithms',
  'Data Structures & Software Engineering',
  'IT Programming (Java, Python, C++)',
  'BSc Physics & Classical Mechanics',
  'BSc Chemistry & Organic Chemistry',
  'Molecular Biology & Genetics',
  'BEd Educational Foundations & Pedagogy',
  'BA Law & Jurisprudence',
  'Constitutional & Administrative Law',
  'Criminal Law & South African Procedure',
  'Electrical Engineering Circuits & Signals',
  'Mechanical Engineering Dynamics & Thermodynamics',
  'Civil Engineering Structures & Fluid Mechanics',
  'Statistics & Probability Theory',
  'Business Management & Corporate Strategy',
  'Academic Writing & Research Methodology'
];

/**
 * Returns the relevant subject list based on the chosen Grade/Level.
 */
export function getSubjectsForGrade(grade: string): string[] {
  if (!grade) return FET_CAPS_SUBJECTS;

  const g = grade.trim();

  if (['Grade 4', 'Grade 5', 'Grade 6', 'Grade 7'].includes(g)) {
    return PRIMARY_CAPS_SUBJECTS;
  }
  if (['Grade 8', 'Grade 9'].includes(g)) {
    return SENIOR_CAPS_SUBJECTS;
  }
  if (['Grade 10', 'Grade 11', 'Grade 12'].includes(g) || g.startsWith('Grade 1')) {
    return FET_CAPS_SUBJECTS;
  }
  if (g.startsWith('TVET')) {
    return TVET_SUBJECTS;
  }
  if (g.startsWith('University')) {
    return UNIVERSITY_SUBJECTS;
  }

  return FET_CAPS_SUBJECTS;
}
