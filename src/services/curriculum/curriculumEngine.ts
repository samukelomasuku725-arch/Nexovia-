/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BRIGHTPATH ACADEMY - CAPS CURRICULUM ENGINE SERVICE (PHASE 6)
 * 
 * Core engine providing:
 * 1. Curriculum Hierarchy Traversal (Level -> Grade -> Subject -> Phase -> Term -> Topic -> Subtopic -> Lesson)
 * 2. Prerequisite verification connected to Phase 5 Mastery
 * 3. 11-Language Content resolution with transparent fallback notices
 * 4. Curriculum Search across grades, subjects, topics, and lessons
 * 5. Publication status filtering (PUBLISHED vs DRAFT for admins)
 * 6. AI Tutor context generation
 */

import {
  CurriculumLessonModel,
  CurriculumMetadata,
  CurriculumSearchQuery,
  CurriculumSearchResult,
  EducationPhaseConfig,
  GradeLevelConfig,
  LanguageFallbackStatus,
  PrerequisiteRule,
  SouthAfricanPhaseId,
  SubjectModel,
  TermModel,
  TopicModel
} from '../../types/curriculum';
import {
  AVAILABLE_CURRICULA,
  DEFAULT_CURRICULUM_VERSION,
  GRADE_LEVELS,
  SOUTH_AFRICAN_PHASES
} from '../../config/curriculumConfig';
import { CAPS_SUBJECTS_CATALOG } from '../../data/capsCurriculumDemoData';
import { SALanguageCode } from '../../types';
import { SA_LANGUAGES } from '../../data/learningContextData';

export class CurriculumEngine {
  private subjects: SubjectModel[] = CAPS_SUBJECTS_CATALOG;
  private currentVersion = DEFAULT_CURRICULUM_VERSION;

  /**
   * Get all registered curriculum frameworks (CAPS, TVET, etc.)
   */
  getAvailableCurricula(): CurriculumMetadata[] {
    return AVAILABLE_CURRICULA;
  }

  /**
   * Get all 4 South African School Phases
   */
  getPhases(): EducationPhaseConfig[] {
    return Object.values(SOUTH_AFRICAN_PHASES);
  }

  /**
   * Get Phase by Phase ID
   */
  getPhaseById(phaseId: SouthAfricanPhaseId): EducationPhaseConfig | undefined {
    return SOUTH_AFRICAN_PHASES[phaseId];
  }

  /**
   * Get all 13 Grade Levels (Grade R to Grade 12)
   */
  getGradeLevels(): GradeLevelConfig[] {
    return GRADE_LEVELS;
  }

  /**
   * Get Grade by Grade ID
   */
  getGradeById(gradeId: string): GradeLevelConfig | undefined {
    return GRADE_LEVELS.find((g) => g.id === gradeId);
  }

  /**
   * Get Subjects available for a specific Grade, filtered by status
   */
  getSubjectsForGrade(gradeId: string, canViewDrafts = false): SubjectModel[] {
    return this.subjects.filter((s) => {
      const isAvailableInGrade = s.gradeIds.includes(gradeId);
      const isAllowedStatus = canViewDrafts ? true : s.status === 'PUBLISHED';
      return isAvailableInGrade && isAllowedStatus;
    });
  }

  /**
   * Get Subject by ID
   */
  getSubjectById(subjectId: string): SubjectModel | undefined {
    return this.subjects.find((s) => s.id === subjectId);
  }

  /**
   * Get Terms for a Subject
   */
  getTermsForSubject(subjectId: string): TermModel[] {
    const subj = this.getSubjectById(subjectId);
    return subj ? subj.terms : [];
  }

  /**
   * Lookup Topic by ID
   */
  getTopicById(topicId: string): TopicModel | undefined {
    for (const subj of this.subjects) {
      for (const term of subj.terms) {
        const found = term.topics.find((t) => t.id === topicId);
        if (found) return found;
      }
    }
    return undefined;
  }

  /**
   * Lookup Lesson by ID
   */
  getLessonById(lessonId: string): CurriculumLessonModel | undefined {
    for (const subj of this.subjects) {
      for (const term of subj.terms) {
        for (const topic of term.topics) {
          for (const subtopic of topic.subtopics) {
            const found = subtopic.lessons.find((l) => l.id === lessonId);
            if (found) return found;
          }
        }
      }
    }
    return undefined;
  }

  /**
   * 2. PREREQUISITE VERIFICATION (CONNECTED TO PHASE 5 ADAPTIVE ENGINE)
   * Determines if a learner has met required foundational topics.
   */
  checkTopicPrerequisites(
    topic: TopicModel,
    learnerMasteryMap: Record<string, number>
  ): {
    isBlocked: boolean;
    unmetPrerequisites: PrerequisiteRule[];
    warningMessage?: string;
  } {
    if (!topic.prerequisites || topic.prerequisites.length === 0) {
      return { isBlocked: false, unmetPrerequisites: [] };
    }

    const unmet: PrerequisiteRule[] = [];

    for (const rule of topic.prerequisites) {
      // Find current mastery for prerequisite topic
      const currentMastery = learnerMasteryMap[rule.prerequisiteTopicTitle] ?? 0;

      if (currentMastery < rule.minimumMasteryRequired) {
        unmet.push(rule);
      }
    }

    if (unmet.length > 0) {
      const first = unmet[0];
      return {
        isBlocked: true,
        unmetPrerequisites: unmet,
        warningMessage: `Foundational prerequisite required: "${first.prerequisiteTopicTitle}" (${first.reason})`
      };
    }

    return { isBlocked: false, unmetPrerequisites: [] };
  }

  /**
   * 3. 11-LANGUAGE CONTENT RESOLUTION WITH TRANSPARENT FALLBACK
   * Does not fabricate translations; clearly identifies English base vs available translations.
   */
  resolveLessonLanguage(
    lesson: CurriculumLessonModel,
    requestedLanguage: SALanguageCode
  ): LanguageFallbackStatus {
    const isSupported = lesson.availableTranslations.includes(requestedLanguage);
    const langInfo = SA_LANGUAGES.find((l) => l.code === requestedLanguage);
    const langName = langInfo ? langInfo.name : requestedLanguage;

    if (requestedLanguage === 'en' || isSupported) {
      return {
        requestedLanguage,
        resolvedLanguage: requestedLanguage,
        isExactMatch: true,
        isAiAssistedTranslation: false,
        statusMessage: `Curriculum content displayed in ${langName}.`
      };
    }

    // Fallback notice
    return {
      requestedLanguage,
      resolvedLanguage: 'en',
      isExactMatch: false,
      isAiAssistedTranslation: true,
      statusMessage: `Official lesson content is currently authored in English. AI-assisted translation for ${langName} is available via the AI Tutor.`
    };
  }

  /**
   * 4. CURRICULUM SEARCH ENGINE
   * Searches across Grade, Subject, Topic, and Lesson content.
   */
  search(query: CurriculumSearchQuery, learnerMasteryMap: Record<string, number> = {}): CurriculumSearchResult[] {
    const keyword = (query.keyword || '').trim().toLowerCase();
    if (!keyword && !query.gradeId && !query.subjectId) {
      return [];
    }

    const results: CurriculumSearchResult[] = [];

    for (const subj of this.subjects) {
      // Optional subject filter
      if (query.subjectId && subj.id !== query.subjectId) continue;

      for (const term of subj.terms) {
        if (query.termNumber && term.termNumber !== query.termNumber) continue;

        for (const topic of term.topics) {
          // Grade match
          if (query.gradeId && topic.gradeId !== query.gradeId) continue;

          const gradeObj = this.getGradeById(topic.gradeId);
          const gradeName = gradeObj ? gradeObj.name : topic.gradeId;
          const masteryScore = learnerMasteryMap[topic.title];

          // Check Topic match
          const topicMatches =
            !keyword ||
            topic.title.toLowerCase().includes(keyword) ||
            topic.description.toLowerCase().includes(keyword);

          if (topicMatches && keyword) {
            results.push({
              type: 'topic',
              id: topic.id,
              title: topic.title,
              description: topic.description,
              gradeName,
              gradeId: topic.gradeId,
              subjectName: subj.name,
              subjectId: subj.id,
              termNumber: term.termNumber,
              topicTitle: topic.title,
              matchSnippet: topic.description.substring(0, 110) + '...',
              sourceClassification: topic.sourceInfo.classification,
              masteryScore
            });
          }

          // Check Lessons in Topic
          for (const subtopic of topic.subtopics) {
            for (const lesson of subtopic.lessons) {
              const lessonMatches =
                !keyword ||
                lesson.title.toLowerCase().includes(keyword) ||
                lesson.introduction.toLowerCase().includes(keyword) ||
                lesson.explanation.some((e) => e.body.toLowerCase().includes(keyword));

              if (lessonMatches) {
                results.push({
                  type: 'lesson',
                  id: lesson.id,
                  title: lesson.title,
                  description: lesson.introduction,
                  gradeName,
                  gradeId: topic.gradeId,
                  subjectName: subj.name,
                  subjectId: subj.id,
                  termNumber: term.termNumber,
                  topicTitle: topic.title,
                  lessonId: lesson.id,
                  matchSnippet: lesson.introduction.substring(0, 110) + '...',
                  sourceClassification: lesson.sourceInfo.classification,
                  masteryScore
                });
              }
            }
          }
        }
      }
    }

    return results.slice(0, 20);
  }

  /**
   * 5. AI TUTOR CONTEXT PRIME
   * Prepares structured curriculum metadata for Socratic AI tutoring.
   */
  buildCurriculumTutorContext(
    lesson: CurriculumLessonModel,
    learnerMastery = 0
  ): {
    educationLevel: string;
    gradeOrProgramme: string;
    subject: string;
    topic: string;
    lesson: string;
    promptContext: string;
  } {
    const grade = this.getGradeById(lesson.gradeId);
    const subj = this.getSubjectById(lesson.subjectId);
    const topic = this.getTopicById(lesson.topicId);

    const gradeName = grade ? grade.name : 'Grade 10';
    const phaseName = grade ? grade.phaseName : 'Senior Phase';
    const subjName = subj ? subj.name : 'Mathematics';
    const topicTitle = topic ? topic.title : 'General Topic';

    const objectivesList = lesson.learningObjectives.map((lo) => `- ${lo.description}`).join('\n');

    const promptContext = `Curriculum Context:
- System: South African National Curriculum (CAPS ${lesson.curriculumVersion})
- Phase: ${phaseName}
- Grade: ${gradeName}
- Subject: ${subjName}
- Term: Term ${lesson.termNumber}
- Topic: ${topicTitle}
- Current Lesson: ${lesson.title}
- Lesson Learning Objectives:
${objectivesList || '- Build foundational problem solving'}
- Learner Current Mastery: ${learnerMastery}%
- Source Classification: ${lesson.sourceInfo.classification} (${lesson.sourceInfo.sourceName})`;

    return {
      educationLevel: `${phaseName} (${gradeName} CAPS)`,
      gradeOrProgramme: gradeName,
      subject: subjName,
      topic: topicTitle,
      lesson: lesson.title,
      promptContext
    };
  }
}

export const curriculumEngine = new CurriculumEngine();
