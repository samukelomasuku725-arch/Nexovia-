/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BRIGHTPATH ACADEMY - CURRICULUM REPOSITORY IMPLEMENTATION
 */

import { ICurriculumRepository } from './types';
import { curriculumEngine } from '../services/curriculum/curriculumEngine';
import {
  CurriculumLessonModel,
  CurriculumMetadata,
  CurriculumSearchQuery,
  CurriculumSearchResult,
  EducationPhaseConfig,
  GradeLevelConfig,
  SubjectModel
} from '../types/curriculum';

export class CurriculumRepository implements ICurriculumRepository {
  async getCurricula(): Promise<CurriculumMetadata[]> {
    return curriculumEngine.getAvailableCurricula();
  }

  async getPhases(): Promise<EducationPhaseConfig[]> {
    return curriculumEngine.getPhases();
  }

  async getGradeLevels(): Promise<GradeLevelConfig[]> {
    return curriculumEngine.getGradeLevels();
  }

  async getSubjectsForGrade(gradeId: string, canViewDrafts = false): Promise<SubjectModel[]> {
    return curriculumEngine.getSubjectsForGrade(gradeId, canViewDrafts);
  }

  async getSubjectById(subjectId: string): Promise<SubjectModel | undefined> {
    return curriculumEngine.getSubjectById(subjectId);
  }

  async getLessonById(lessonId: string): Promise<CurriculumLessonModel | undefined> {
    return curriculumEngine.getLessonById(lessonId);
  }

  async search(query: CurriculumSearchQuery, masteryMap: Record<string, number> = {}): Promise<CurriculumSearchResult[]> {
    return curriculumEngine.search(query, masteryMap);
  }
}

export const curriculumRepository = new CurriculumRepository();
