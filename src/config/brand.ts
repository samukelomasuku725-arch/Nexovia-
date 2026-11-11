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
  /** Legal entity name */
  companyName: string;
  /** CIPC registration */
  registrationNumber: string;
  /** B-BBEE Level */
  bbbeeLevel: string;
  /** Ownership profile */
  ownership: string;
  /** Headquarters location */
  location: string;
}

export const APP_CONFIG: AppConfig = {
  appName: 'NEXOVIAN',
  shortName: 'NEXOVIAN',
  companyName: 'NEXOVIAN (PTY) LTD',
  registrationNumber: '2026/845572/07',
  bbbeeLevel: 'B-BBEE Level 1 (135%)',
  ownership: '100% Black Owned · 100% Youth · 100% Rural',
  location: 'Oakley, Mpumalanga',
  tagline: 'Dyondza hi Ririmi Ra Wena — Learn In Your Language',
  coreVision: 'Mpumalanga\'s first AI learning platform teaching Maths, Science & Life Sciences in all 11 official languages — built in Oakley for rural learners.',
  phase: 'Phase 1 - Mobile-First Foundation',
  version: '1.0.0-phase1',
  cipcNotice: 'NEXOVIAN (PTY) LTD · Reg: 2026/845572/07 · B-BBEE Level 1 (135%) · 100% Black, Youth & Rural Owned · Oakley, Mpumalanga',
  curriculumDisclaimer: 'NEXOVIAN is an independent educational platform aligned with CAPS (Grade 4–12), DHET (TVET N1–N6), and University frameworks.',
  supportEmail: 'support@nexovian.ai',
  country: 'South Africa',
  launchYear: 2026
};

export default APP_CONFIG;
