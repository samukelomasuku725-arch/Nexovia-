/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * CENTRAL BRAND & APPLICATION CONFIGURATION
 * 
 * IMPORTANT: This is the single source of truth for the application name,
 * tagline, enterprise registration status, and legal curriculum disclaimers.
 * If the CIPC-approved company or brand name changes in the future,
 * update it ONLY here and all components, headers, footers, and meta tags
 * will seamlessly reflect the new brand name.
 */

export interface AppConfig {
  /** Temporary app name pending final CIPC registration */
  appName: string;
  /** Short brand name for compact mobile displays */
  shortName: string;
  /** Primary brand tagline */
  tagline: string;
  /** Core institutional vision */
  coreVision: string;
  /** Application phase */
  phase: string;
  /** Application version */
  version: string;
  /** CIPC enterprise compliance note */
  cipcNotice: string;
  /** Official curriculum independence disclaimer */
  curriculumDisclaimer: string;
  /** Contact and support */
  supportEmail: string;
  /** Default region / country */
  country: string;
  /** Year of launch */
  launchYear: number;
}

export const APP_CONFIG: AppConfig = {
  appName: 'BrightPath Academy',
  shortName: 'BrightPath',
  tagline: 'Learn today. Build tomorrow.',
  coreVision: 'Create one learning platform that can support a learner\'s journey from Grade R all the way to University.',
  phase: 'Phase 1 - Mobile-First Foundation',
  version: '1.0.0-phase1',
  cipcNotice: 'Temporary educational platform name registered for Phase 1 architecture and testing pending final CIPC corporate clearance.',
  curriculumDisclaimer: 'BrightPath Academy is an independent educational platform. Verified curriculum frameworks are strictly distinguished from AI-generated learning support and practice. We do not claim official affiliation with or endorsement by DBE, DHET, Umalusi, SAQA, or examination councils.',
  supportEmail: 'support@brightpath.ac.za',
  country: 'South Africa',
  launchYear: 2026
};

export default APP_CONFIG;
