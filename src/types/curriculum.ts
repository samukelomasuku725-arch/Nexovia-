/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIA - PHASE 6: CAPS CURRICULUM ENGINE TYPES
 * 
 * Hierarchy:
 * Education Level -> Grade -> Subject -> Phase -> Term -> Topic -> Subtopic -> Lesson -> Learning Objective -> Activity -> Practice -> Assessment
 * 
 * Extensible for CAPS, TVET (NATED & NCV), Colleges, and Universities.
 */

import { SALanguageCode } from './index';
import { AdaptiveDifficulty, MasteryStatus } from './adaptive';

// Curriculum Types & Categories
export type CurriculumType =
  | 'CAPS'               // South African Curriculum and Assessment Policy Statement (Grade R–12)
  | 'NATED'              // TVET National Accredited Technical Education Diploma (N1–N6)
  | 'NCV'                // TVET National Certificate (Vocational) (Levels 2–4)
  | 'INSTITUTIONAL'      // Accredited College Diploma / Certificate
  | 'UNIVERSITY'         // Higher Education Degree / Faculty Curriculum
  | 'TEACHER_CREATED';   // Educator Custom Learning Pathway

export type ContentStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export type SourceClassification =
  | 'VERIFIED'           // Official verified curriculum document (e.g. Department of Basic Education CAPS)
  | 'TEACHER_CREATED'    // Vetted by registered South African teachers
  | 'AI_GENERATED'       // Generated via Gemini AI assistance
  | 'DEMO';              // Demonstration sample content clearly labelled

export type SouthAfricanPhaseId =
  | 'foundation'   // Grade R to Grade 3
  | 'intermediate' // Grade 4 to Grade 6
  | 'senior'       // Grade 7 to Grade 9
  | 'fet';         // Grade 10 to Grade 12 (Further Education and Training)

export type BloomTaxonomyLevel =
  | 'Remembering'
  | 'Understanding'
  | 'Applying'
  | 'Analyzing'
  | 'Evaluating'
  | 'Creating';

/**
 * 1. Source Classification & Verification Provenance
 */
export interface CurriculumSourceInfo {
  classification: SourceClassification;
  sourceName: string;
  sourceDocument?: string;
  sourceReference?: string;
  sourceUrl?: string;
  sourceVersion?: string;
  verificationStatus: 'verified' | 'pending_review' | 'demo' | 'unverified';
  verifiedAt?: string;
  verifiedBy?: string;
  disclaimer: string;
}

/**
 * 2. Curriculum Definition & Version
 */
export interface CurriculumMetadata {
  id: string;
  name: string;
  code: string;
  type: CurriculumType;
  educationLevel: string;
  version: string; // e.g. "2024.1"
  status: ContentStatus;
  description: string;
  supportedLanguages: SALanguageCode[];
  defaultLanguage: SALanguageCode;
  sourceInfo: CurriculumSourceInfo;
  createdAt: string;
  updatedAt: string;
}

/**
 * 3. School Phase (Foundation, Intermediate, Senior, FET)
 */
export interface EducationPhaseConfig {
  id: SouthAfricanPhaseId;
  name: string;
  grades: string[]; // e.g. ['grade-10', 'grade-11', 'grade-12']
  description: string;
  curriculumType: CurriculumType;
  compulsorySubjectCategories: string[];
  electiveSubjectCategories?: string[];
}

/**
 * 4. Grade Definition
 */
export interface GradeLevelConfig {
  id: string; // e.g. 'grade-8', 'grade-10'
  name: string; // e.g. 'Grade 8', 'Grade 10'
  number: number; // 0 for Grade R, 1..12
  phaseId: SouthAfricanPhaseId;
  phaseName: string;
  availableSubjectIds: string[];
  description: string;
}

/**
 * 5. Measurable Learning Objective
 */
export interface LearningObjective {
  id: string;
  code?: string; // e.g. 'CAPS-MTH-G10-T1-LO1'
  description: string;
  taxonomyLevel: BloomTaxonomyLevel;
  isMeasurable: boolean;
  successCriteria?: string[];
}

/**
 * 6. Lesson Activity
 */
export interface LessonActivity {
  id: string;
  title: string;
  instructions: string;
  type: 'worked_example' | 'guided_exercise' | 'interactive_widget' | 'reflection' | 'group_task';
  estimatedMinutes: number;
  sampleSolution?: string;
}

/**
 * 7. Lesson Model
 */
export interface CurriculumLessonModel {
  id: string;
  subtopicId: string;
  topicId: string;
  subjectId: string;
  gradeId: string;
  phaseId: SouthAfricanPhaseId;
  termNumber: 1 | 2 | 3 | 4;
  curriculumVersion: string;
  title: string;
  introduction: string;
  learningObjectives: LearningObjective[];
  explanation: {
    heading: string;
    body: string;
    keyPoints: string[];
    formulaeOrDefinitions?: string[];
  }[];
  workedExamples?: {
    problemStatement: string;
    stepByStepSolution: string[];
    conceptualNote: string;
  }[];
  activities: LessonActivity[];
  practiceItemsCount: number;
  estimatedDurationMinutes: number;
  difficulty: AdaptiveDifficulty;
  curriculumReference: string;
  sourceInfo: CurriculumSourceInfo;
  language: SALanguageCode;
  availableTranslations: SALanguageCode[];
  status: ContentStatus;
  order: number;
}

/**
 * 8. Subtopic Model
 */
export interface SubtopicModel {
  id: string;
  topicId: string;
  title: string;
  description: string;
  learningObjectives: LearningObjective[];
  lessons: CurriculumLessonModel[];
  estimatedHours: number;
  order: number;
  status: ContentStatus;
}

/**
 * 9. Prerequisite Rule
 */
export interface PrerequisiteRule {
  prerequisiteTopicId: string;
  prerequisiteTopicTitle: string;
  prerequisiteGrade: string;
  subject: string;
  minimumMasteryRequired: number; // e.g. 50%
  reason: string;
  isCritical: boolean;
}

/**
 * 10. Topic Model
 */
export interface TopicModel {
  id: string;
  termNumber: 1 | 2 | 3 | 4;
  subjectId: string;
  gradeId: string;
  phaseId: SouthAfricanPhaseId;
  curriculumVersion: string;
  title: string;
  description: string;
  learningObjectives: LearningObjective[];
  prerequisites: PrerequisiteRule[];
  estimatedHours: number;
  subtopics: SubtopicModel[];
  order: number;
  sourceInfo: CurriculumSourceInfo;
  status: ContentStatus;
}

/**
 * 11. Term Model
 */
export interface TermModel {
  termNumber: 1 | 2 | 3 | 4;
  title: string; // e.g. "Term 1: Number Patterns & Algebra"
  subjectId: string;
  gradeId: string;
  topics: TopicModel[];
  recommendedWeeks: number;
}

/**
 * 12. Subject Model
 */
export interface SubjectModel {
  id: string;
  code: string;
  name: string;
  gradeIds: string[]; // e.g. ['grade-10', 'grade-11', 'grade-12']
  phaseIds: SouthAfricanPhaseId[];
  category:
    | 'Mathematical Sciences'
    | 'Physical & Life Sciences'
    | 'Languages'
    | 'Business & Commerce'
    | 'Human & Social Sciences'
    | 'Technology & Engineering'
    | 'Foundation & Life Skills';
  description: string;
  curriculumType: CurriculumType;
  curriculumVersion: string;
  status: ContentStatus;
  terms: TermModel[];
  supportedLanguages: SALanguageCode[];
  iconName: string;
}

/**
 * 13. Multi-Language Content Model & Fallback
 */
export interface LocalizedCurriculumContent<T> {
  primaryLanguage: SALanguageCode;
  availableLanguages: SALanguageCode[];
  contentByLanguage: Partial<Record<SALanguageCode, T>>;
  isAiTranslated?: Partial<Record<SALanguageCode, boolean>>;
}

export interface LanguageFallbackStatus {
  requestedLanguage: SALanguageCode;
  resolvedLanguage: SALanguageCode;
  isExactMatch: boolean;
  isAiAssistedTranslation: boolean;
  statusMessage: string;
}

/**
 * 14. Learner Context & Navigation State
 */
export interface LearnerCurriculumState {
  curriculumVersion: string;
  selectedGradeId: string;
  selectedSubjectId: string;
  selectedTermNumber: 1 | 2 | 3 | 4;
  selectedTopicId?: string;
  selectedSubtopicId?: string;
  selectedLessonId?: string;
  enrolledSubjectIds: string[];
}

/**
 * 15. Curriculum Search Query & Result
 */
export interface CurriculumSearchQuery {
  keyword: string;
  gradeId?: string;
  subjectId?: string;
  phaseId?: SouthAfricanPhaseId;
  termNumber?: 1 | 2 | 3 | 4;
  language?: SALanguageCode;
  status?: ContentStatus;
}

export interface CurriculumSearchResult {
  type: 'topic' | 'subtopic' | 'lesson';
  id: string;
  title: string;
  description: string;
  gradeName: string;
  gradeId: string;
  subjectName: string;
  subjectId: string;
  termNumber: 1 | 2 | 3 | 4;
  topicTitle: string;
  lessonId?: string;
  matchSnippet: string;
  sourceClassification: SourceClassification;
  masteryScore?: number;
}
