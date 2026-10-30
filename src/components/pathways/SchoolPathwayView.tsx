/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN ACADEMY - PHASE 6 CAPS CURRICULUM ENGINE
 * 
 * Renders the comprehensive CAPS Curriculum Engine:
 * Level -> Grade -> Subject -> Phase -> Term -> Topic -> Subtopic -> Lesson -> Learning Objectives -> Activities -> Practice -> Assessments.
 */

import React from 'react';
import { CurriculumBrowserView } from '../curriculum/CurriculumBrowserView';

export const SchoolPathwayView: React.FC = () => {
  return <CurriculumBrowserView />;
};
