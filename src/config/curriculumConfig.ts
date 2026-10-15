/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BRIGHTPATH ACADEMY - SOUTH AFRICAN CAPS CURRICULUM CONFIGURATION
 * 
 * Scalable definitions for:
 * 1. 4 South African School Phases
 * 2. 13 School Grades (Grade R to Grade 12)
 * 3. Curriculum Versions
 * 4. Source Verification Disclaimers
 */

import {
  CurriculumMetadata,
  EducationPhaseConfig,
  GradeLevelConfig,
  SouthAfricanPhaseId,
  SourceClassification
} from '../types/curriculum';

// ---------------------------------------------------------------------------
// 1. SOUTH AFRICAN EDUCATION PHASES CONFIGURATION
// ---------------------------------------------------------------------------
export const SOUTH_AFRICAN_PHASES: Record<SouthAfricanPhaseId, EducationPhaseConfig> = {
  foundation: {
    id: 'foundation',
    name: 'Foundation Phase',
    grades: ['grade-r', 'grade-1', 'grade-2', 'grade-3'],
    description: 'Grade R to Grade 3: Home Language, First Additional Language, Mathematics, and Life Skills.',
    curriculumType: 'CAPS',
    compulsorySubjectCategories: ['Mathematical Sciences', 'Languages', 'Foundation & Life Skills']
  },
  intermediate: {
    id: 'intermediate',
    name: 'Intermediate Phase',
    grades: ['grade-4', 'grade-5', 'grade-6'],
    description: 'Grade 4 to Grade 6: Languages, Mathematics, Natural Sciences & Technology, Social Sciences, Life Skills.',
    curriculumType: 'CAPS',
    compulsorySubjectCategories: ['Mathematical Sciences', 'Languages', 'Physical & Life Sciences', 'Human & Social Sciences', 'Foundation & Life Skills']
  },
  senior: {
    id: 'senior',
    name: 'Senior Phase',
    grades: ['grade-7', 'grade-8', 'grade-9'],
    description: 'Grade 7 to Grade 9: Mathematics, Natural Sciences, Technology, Social Sciences, Economic & Management Sciences (EMS), Creative Arts, Life Orientation.',
    curriculumType: 'CAPS',
    compulsorySubjectCategories: ['Mathematical Sciences', 'Physical & Life Sciences', 'Technology & Engineering', 'Business & Commerce', 'Languages', 'Human & Social Sciences']
  },
  fet: {
    id: 'fet',
    name: 'Further Education and Training (FET) Phase',
    grades: ['grade-10', 'grade-11', 'grade-12'],
    description: 'Grade 10 to Grade 12 (National Senior Certificate / Matric): Core subjects (Languages, Mathematics or Mathematical Literacy, Life Orientation) plus elective pathways (Physical Sciences, Accounting, Information Technology, etc.).',
    curriculumType: 'CAPS',
    compulsorySubjectCategories: ['Mathematical Sciences', 'Languages', 'Foundation & Life Skills'],
    electiveSubjectCategories: ['Physical & Life Sciences', 'Business & Commerce', 'Technology & Engineering', 'Human & Social Sciences']
  }
};

// ---------------------------------------------------------------------------
// 2. 13 SCHOOL GRADES CONFIGURATION (GRADE R TO GRADE 12)
// ---------------------------------------------------------------------------
export const GRADE_LEVELS: GradeLevelConfig[] = [
  {
    id: 'grade-r',
    name: 'Grade R',
    number: 0,
    phaseId: 'foundation',
    phaseName: 'Foundation Phase',
    availableSubjectIds: ['sub-gr-literacy', 'sub-gr-numeracy', 'sub-gr-lifeskills'],
    description: 'Reception Year: Early literacy, emergent numeracy, spatial and motor foundations.'
  },
  {
    id: 'grade-1',
    name: 'Grade 1',
    number: 1,
    phaseId: 'foundation',
    phaseName: 'Foundation Phase',
    availableSubjectIds: ['sub-g1-maths', 'sub-g1-hl', 'sub-g1-fal', 'sub-g1-lifeskills'],
    description: 'Foundation Stage 1: Phonics, basic addition/subtraction, writing, creative arts.'
  },
  {
    id: 'grade-2',
    name: 'Grade 2',
    number: 2,
    phaseId: 'foundation',
    phaseName: 'Foundation Phase',
    availableSubjectIds: ['sub-g2-maths', 'sub-g2-hl', 'sub-g2-fal', 'sub-g2-lifeskills'],
    description: 'Foundation Stage 2: Reading fluency, two-digit operations, patterns and shapes.'
  },
  {
    id: 'grade-3',
    name: 'Grade 3',
    number: 3,
    phaseId: 'foundation',
    phaseName: 'Foundation Phase',
    availableSubjectIds: ['sub-g3-maths', 'sub-g3-hl', 'sub-g3-fal', 'sub-g3-lifeskills'],
    description: 'Foundation Stage 3: Multiplication tables, reading comprehension, problem solving.'
  },
  {
    id: 'grade-4',
    name: 'Grade 4',
    number: 4,
    phaseId: 'intermediate',
    phaseName: 'Intermediate Phase',
    availableSubjectIds: ['sub-g4-maths', 'sub-g4-nst', 'sub-g4-ss', 'sub-g4-hl', 'sub-g4-fal', 'sub-g4-lifeskills'],
    description: 'Intermediate Stage 1: Transition to multiple teachers, Natural Sciences, Technology.'
  },
  {
    id: 'grade-5',
    name: 'Grade 5',
    number: 5,
    phaseId: 'intermediate',
    phaseName: 'Intermediate Phase',
    availableSubjectIds: ['sub-g5-maths', 'sub-g5-nst', 'sub-g5-ss', 'sub-g5-hl', 'sub-g5-fal', 'sub-g5-lifeskills'],
    description: 'Intermediate Stage 2: Fractions, Earth and beyond, South African geography and history.'
  },
  {
    id: 'grade-6',
    name: 'Grade 6',
    number: 6,
    phaseId: 'intermediate',
    phaseName: 'Intermediate Phase',
    availableSubjectIds: ['sub-g6-maths', 'sub-g6-nst', 'sub-g6-ss', 'sub-g6-hl', 'sub-g6-fal', 'sub-g6-lifeskills'],
    description: 'Intermediate Stage 3: Decimals, ecosystems, electricity, preparation for Senior Phase.'
  },
  {
    id: 'grade-7',
    name: 'Grade 7',
    number: 7,
    phaseId: 'senior',
    phaseName: 'Senior Phase',
    availableSubjectIds: ['sub-g7-maths', 'sub-g7-ns', 'sub-g7-tech', 'sub-g7-ems', 'sub-g7-ss', 'sub-g7-lo'],
    description: 'Senior Stage 1: High school entry, introductory algebra, Economic and Management Sciences.'
  },
  {
    id: 'grade-8',
    name: 'Grade 8',
    number: 8,
    phaseId: 'senior',
    phaseName: 'Senior Phase',
    availableSubjectIds: ['sub-g8-maths', 'sub-g8-ns', 'sub-g8-tech', 'sub-g8-ems', 'sub-g8-ss', 'sub-g8-lo'],
    description: 'Senior Stage 2: Algebraic equations, integers, chemical reactions, financial literacy.'
  },
  {
    id: 'grade-9',
    name: 'Grade 9',
    number: 9,
    phaseId: 'senior',
    phaseName: 'Senior Phase',
    availableSubjectIds: ['sub-g9-maths', 'sub-g9-ns', 'sub-g9-tech', 'sub-g9-ems', 'sub-g9-ss', 'sub-g9-lo'],
    description: 'Senior Stage 3: Grade 10 subject choice decision year, geometry theorems, human physiology.'
  },
  {
    id: 'grade-10',
    name: 'Grade 10',
    number: 10,
    phaseId: 'fet',
    phaseName: 'FET Phase (Further Education and Training)',
    availableSubjectIds: ['sub-g10-maths', 'sub-g10-mathlit', 'sub-g10-physsci', 'sub-g10-lifesci', 'sub-g10-acc', 'sub-g10-it'],
    description: 'FET Stage 1: National Senior Certificate foundations, trinomial factorization, Newton’s laws.'
  },
  {
    id: 'grade-11',
    name: 'Grade 11',
    number: 11,
    phaseId: 'fet',
    phaseName: 'FET Phase (Further Education and Training)',
    availableSubjectIds: ['sub-g11-maths', 'sub-g11-mathlit', 'sub-g11-physsci', 'sub-g11-lifesci', 'sub-g11-acc', 'sub-g11-it'],
    description: 'FET Stage 2: In-depth curriculum synthesis, quadratic inequalities, electromagnetism.'
  },
  {
    id: 'grade-12',
    name: 'Grade 12 (Matric)',
    number: 12,
    phaseId: 'fet',
    phaseName: 'FET Phase (Further Education and Training)',
    availableSubjectIds: ['sub-g12-maths', 'sub-g12-mathlit', 'sub-g12-physsci', 'sub-g12-lifesci', 'sub-g12-acc', 'sub-g12-it'],
    description: 'National Senior Certificate (NSC Matric): Calculus, organic chemistry, university entrance preparation.'
  }
];

// ---------------------------------------------------------------------------
// 3. CURRICULUM VERSIONS
// ---------------------------------------------------------------------------
export const AVAILABLE_CURRICULA: CurriculumMetadata[] = [
  {
    id: 'caps-sa-2024',
    name: 'CAPS Standard National Curriculum',
    code: 'CAPS-DBE-2024.1',
    type: 'CAPS',
    educationLevel: 'Grade R to Grade 12',
    version: '2024.1',
    status: 'PUBLISHED',
    description: 'South African National Curriculum and Assessment Policy Statement (CAPS) guidelines aligned for school examinations.',
    supportedLanguages: ['en', 'af', 'zu', 'xh', 'nr', 'ss', 'nso', 'st', 'tn', 've', 'ts'],
    defaultLanguage: 'en',
    sourceInfo: {
      classification: 'DEMO',
      sourceName: 'BrightPath South African CAPS Reference Blueprint',
      sourceDocument: 'Curriculum & Assessment Policy Frameworks',
      verificationStatus: 'demo',
      disclaimer: 'Curriculum structures are calibrated for South African educational standards. Content items are labeled DEMO or VERIFIED accordingly.'
    },
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-09-01T00:00:00Z'
  },
  {
    id: 'caps-sa-2025-preview',
    name: 'CAPS 2025 Coding & Robotics Enriched Preview',
    code: 'CAPS-DBE-2025.Preview',
    type: 'CAPS',
    educationLevel: 'Grade R to Grade 12',
    version: '2025.1-Preview',
    status: 'DRAFT',
    description: 'Curriculum blueprint including Coding & Robotics integrations and updated term paces.',
    supportedLanguages: ['en', 'af', 'zu', 'xh'],
    defaultLanguage: 'en',
    sourceInfo: {
      classification: 'DEMO',
      sourceName: 'Draft Curriculum Blueprint',
      verificationStatus: 'pending_review',
      disclaimer: 'Draft curriculum version for educational review.'
    },
    createdAt: '2024-10-01T00:00:00Z',
    updatedAt: '2024-10-01T00:00:00Z'
  }
];

export const DEFAULT_CURRICULUM_VERSION = '2024.1';

// ---------------------------------------------------------------------------
// 4. SOURCE VERIFICATION BADGES & PROVENANCE HELPERS
// ---------------------------------------------------------------------------
export const SOURCE_CLASSIFICATION_INFO: Record<
  SourceClassification,
  { label: string; badgeColor: string; description: string }
> = {
  VERIFIED: {
    label: 'Verified CAPS Document',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
    description: 'Content directly aligned with and verified against published Department of Basic Education CAPS curriculum documents.'
  },
  TEACHER_CREATED: {
    label: 'Teacher Created',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border-blue-300 dark:border-blue-800',
    description: 'Authored and reviewed by South African subject specialists and registered SACE educators.'
  },
  AI_GENERATED: {
    label: 'AI-Assisted Educational Tool',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300 border-purple-300 dark:border-purple-800',
    description: 'Generated using Gemini Multimodal AI calibrated to CAPS curriculum topics. Not an official state examination document.'
  },
  DEMO: {
    label: 'Demo Blueprint Content',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    description: 'Demonstration and testing curriculum content clearly marked. Does not claim government affiliation.'
  }
};
