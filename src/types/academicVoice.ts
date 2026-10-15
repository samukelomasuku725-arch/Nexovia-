/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * BrightPath Academic Voice-to-Document Types
 */

export type AcademicSector = 'university' | 'tvet';

export type AcademicDocumentType =
  | 'essay'
  | 'research_report'
  | 'literature_review'
  | 'practical_report'
  | 'tvet_project'
  | 'lecture_notes';

export type ReferencingStyle = 'harvard' | 'apa';

export interface AcademicReferenceItem {
  id: string;
  author: string;
  year: string;
  title: string;
  source: string; // Journal / Book / Official Publication / SA Statutory Gazette
  urlOrDoi?: string;
  inTextCitation: string; // e.g. "(Mabunda, 2023)" or "Mabunda (2023, p. 45)"
  verified: boolean; // True if verified against real scholarly/official databases
  verificationSource?: string; // e.g. "Google Scholar", "DHET Register", "SAQA Policy"
  isIncluded: boolean;
  notes?: string;
}

export interface AcademicDocumentSection {
  id: string;
  heading: string;
  content: string;
  studentVoicePoints?: string[]; // Quotes/points originating directly from the student's spoken recording
  aiEnhanced?: boolean;
}

export interface TvetComplianceData {
  qualificationType: 'NATED' | 'NCV';
  level: string; // e.g. "N4", "N5", "NC(V) Level 3"
  isPoE: boolean; // Portfolio of Evidence component
  ohsCompliant: boolean; // Occupational Health and Safety Act (Act 85 of 1993) safety checks
  stepProcedureLogged: boolean;
  workshopEquipment?: string[];
  assessorName?: string;
  assessorNumber?: string;
  moderatorName?: string;
  assessmentOutcome?: 'competent' | 'not_yet_competent' | 'pending';
  requiresAssessorSignOff: boolean;
}

export interface AcademicDocument {
  id: string;
  userId: string;
  title: string;
  documentType: AcademicDocumentType;
  educationSector: AcademicSector;
  institution: string;
  facultyOrDepartment: string;
  courseOrProgramme: string;
  moduleCode: string;
  moduleTitle: string;
  studentName: string;
  studentNumber: string;
  lecturerOrAssessor?: string;
  submissionDate: string;
  targetWordCount: number;
  actualWordCount: number;
  referencingStyle: ReferencingStyle;
  language: string; // e.g. 'en', 'ts', 'zu', 'af', etc.
  recordingDurationSeconds?: number;
  rawTranscript: string;
  cleanedTranscript: string;
  instructionsOrRubric?: string;
  sections: AcademicDocumentSection[];
  references: AcademicReferenceItem[];
  tvetCompliance?: TvetComplianceData;
  institutionComplianceNotes?: string;
  createdAt: string;
  updatedAt: string;
  exportedPdfCount: number;
  lastExportedAt?: string;
}

export interface AcademicVoiceTierStatus {
  tier: 'free' | 'premium';
  monthlyDocumentLimit: number; // 3 for free, unlimited (-1) for premium
  documentsCreatedThisMonth: number;
  remainingDocuments: number;
  maxRecordingMinutes: number; // 5 min for free, 30 min for premium
  premiumPriceZar: number; // 50 (R50 per month)
  canRecordLongAudio: boolean;
  canExportHighResPdf: boolean;
  hasScholarSearchGrounding: boolean;
  resetDate: string;
}

export interface AudioRecordingState {
  isRecording: boolean;
  isPaused: boolean;
  durationSeconds: number;
  audioBlob: Blob | null;
  audioUrl: string | null;
  mimeType: string;
  fileName?: string;
  fileSize?: number;
}
