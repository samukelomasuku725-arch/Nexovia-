/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIA - CENTRALIZED DATA ACCESS LAYER
 * 
 * Provides unified access to all domain repositories:
 * - curriculum
 * - assessments
 * - progress
 * - profile
 * - ai
 * - storage
 * - cache
 * 
 * Allows swapping between mock/local storage, REST proxy, and Supabase without UI changes.
 */

export * from './types';
export * from './apiClient';
export * from './curriculumRepository';
export * from './assessmentRepository';
export * from './learnerProgressRepository';
export * from './profileRepository';
export * from './aiConversationRepository';
export * from './storageService';
export * from './cacheService';

import { curriculumRepository } from './curriculumRepository';
import { assessmentRepository } from './assessmentRepository';
import { learnerProgressRepository } from './learnerProgressRepository';
import { profileRepository } from './profileRepository';
import { aiConversationRepository } from './aiConversationRepository';
import { storageService } from './storageService';
import { cacheService } from './cacheService';

export const repositories = {
  curriculum: curriculumRepository,
  assessments: assessmentRepository,
  progress: learnerProgressRepository,
  profile: profileRepository,
  ai: aiConversationRepository,
  storage: storageService,
  cache: cacheService
};

export default repositories;
