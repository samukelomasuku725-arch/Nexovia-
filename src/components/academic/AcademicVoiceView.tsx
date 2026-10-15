/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Nexovia Academic Voice-to-Document Main View
 */

import React, { useState, useEffect } from 'react';
import {
  Mic,
  FileText,
  Sliders,
  BookOpen,
  Download,
  FolderOpen,
  Crown,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Briefcase,
  Layers,
  RotateCcw
} from 'lucide-react';
import {
  AcademicDocument,
  AcademicDocumentType,
  AcademicReferenceItem,
  AcademicSector,
  AcademicVoiceTierStatus,
  ReferencingStyle
} from '../../types/academicVoice';
import { academicVoiceService } from '../../services/academic/academicVoiceService';
import { AudioRecorderUploader } from './AudioRecorderUploader';
import { TranscriptEditor } from './TranscriptEditor';
import { AcademicDetailsForm } from './AcademicDetailsForm';
import { DocumentPreviewEditor } from './DocumentPreviewEditor';
import { ReferenceManager } from './ReferenceManager';
import { PdfExportSection } from './PdfExportSection';
import { SavedDocumentsModal } from './SavedDocumentsModal';
import { ScholarPremiumModal } from './ScholarPremiumModal';
import { useLearning } from '../../context/LearningContext';

type WizardStep = 1 | 2 | 3 | 4 | 5 | 6;

export const AcademicVoiceView: React.FC = () => {
  const { learningContext, activeLearningLanguage, setCurrentTab } = useLearning();

  // Wizard Navigation
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);

  // Audio State
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioMimeType, setAudioMimeType] = useState<string>('audio/webm');
  const [durationSeconds, setDurationSeconds] = useState<number>(0);
  const [audioFileName, setAudioFileName] = useState<string | undefined>(undefined);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(activeLearningLanguage || 'en');

  // Transcription State
  const [transcript, setTranscript] = useState<string>('');
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
  const [transcriptionError, setTranscriptionError] = useState<string | null>(null);

  // Academic Configuration Form State
  const [formData, setFormData] = useState({
    sector: (learningContext.educationLevel === 'tvet' ? 'tvet' : 'university') as AcademicSector,
    institution: learningContext.educationLevel === 'tvet'
      ? 'Tshwane North TVET College'
      : 'University of Cape Town (UCT)',
    facultyOrDepartment: 'Engineering & Built Environment',
    courseOrProgramme: learningContext.gradeOrProgramme || 'Electrical Engineering',
    moduleCode: 'ENG204',
    moduleTitle: learningContext.subject || 'Engineering Science & Mathematics',
    title: 'Laboratory Investigation & Practical Evidence Report',
    studentName: 'Student Learner',
    studentNumber: '202488921',
    lecturerOrAssessor: 'Course Lecturer',
    submissionDate: new Date().toISOString().split('T')[0],
    targetWordCount: 1000,
    documentType: (learningContext.educationLevel === 'tvet' ? 'tvet_project' : 'essay') as AcademicDocumentType,
    referencingStyle: 'harvard' as ReferencingStyle,
    instructionsOrRubric: 'Synthesize student observations into formal academic report structure.'
  });

  // Generated Document State
  const [activeDocument, setActiveDocument] = useState<AcademicDocument | null>(null);
  const [isGeneratingDoc, setIsGeneratingDoc] = useState<boolean>(false);
  const [generateError, setGenerateError] = useState<string | null>(null);

  // Reference Search State
  const [isSearchingRefs, setIsSearchingRefs] = useState<boolean>(false);

  // Saved Documents Library & Tier Status
  const [savedDocs, setSavedDocs] = useState<AcademicDocument[]>([]);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState<boolean>(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState<boolean>(false);
  const [tierStatus, setTierStatus] = useState<AcademicVoiceTierStatus>({
    tier: 'free',
    monthlyDocumentLimit: 3,
    documentsCreatedThisMonth: 0,
    remainingDocuments: 3,
    maxRecordingMinutes: 5,
    premiumPriceZar: 50,
    canRecordLongAudio: false,
    canExportHighResPdf: true,
    hasScholarSearchGrounding: true,
    resetDate: 'Next Month 1st'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);

  // Load Saved Docs & Tier Status on Mount
  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const [docs, status] = await Promise.all([
        academicVoiceService.getDocuments(),
        academicVoiceService.getTierStatus()
      ]);
      setSavedDocs(docs);
      setTierStatus(status);
    } catch (err) {
      console.warn('Error loading initial academic data:', err);
    }
  };

  // Convert Audio to Base64
  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // Handle when audio is captured or uploaded
  const handleAudioReady = async (
    blob: Blob,
    mimeType: string,
    duration: number,
    fileName?: string
  ) => {
    setAudioBlob(blob);
    setAudioMimeType(mimeType);
    setDurationSeconds(duration);
    setAudioFileName(fileName);
    setTranscriptionError(null);

    // Auto-transcribe upon capture
    await executeTranscription(blob, mimeType, duration);
  };

  // Execute Transcription
  const executeTranscription = async (
    blobToUse?: Blob,
    mimeToUse?: string,
    durationToUse?: number
  ) => {
    const targetBlob = blobToUse || audioBlob;
    const targetMime = mimeToUse || audioMimeType;
    const targetDur = durationToUse || durationSeconds;

    if (!targetBlob) return;

    setIsTranscribing(true);
    setTranscriptionError(null);

    try {
      const base64 = await blobToBase64(targetBlob);
      const res = await academicVoiceService.transcribeAudio({
        audioBase64: base64,
        mimeType: targetMime,
        language: selectedLanguage,
        durationSeconds: targetDur
      });

      setTranscript(res.text);
      setCurrentStep(2); // Progress to Transcript Review
    } catch (err: any) {
      console.error('Transcription failed:', err);
      setTranscriptionError(
        err.message || 'Could not transcribe the spoken speech. Please retry or type your thoughts.'
      );
      setCurrentStep(2);
    } finally {
      setIsTranscribing(false);
    }
  };

  // Generate Academic Document
  const handleGenerateDocument = async () => {
    if (!transcript.trim()) {
      setGenerateError('Please ensure you have a voice transcript or notes before generating.');
      return;
    }

    setIsGeneratingDoc(true);
    setGenerateError(null);

    try {
      const result = await academicVoiceService.generateDocument({
        transcript,
        documentType: formData.documentType,
        educationSector: formData.sector,
        institution: formData.institution,
        facultyOrDepartment: formData.facultyOrDepartment,
        courseOrProgramme: formData.courseOrProgramme,
        moduleCode: formData.moduleCode,
        moduleTitle: formData.moduleTitle,
        title: formData.title,
        studentName: formData.studentName,
        studentNumber: formData.studentNumber,
        lecturerOrAssessor: formData.lecturerOrAssessor,
        submissionDate: formData.submissionDate,
        targetWordCount: formData.targetWordCount,
        instructionsOrRubric: formData.instructionsOrRubric,
        referencingStyle: formData.referencingStyle,
        language: selectedLanguage
      });

      const newDoc: AcademicDocument = {
        id: `doc_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        userId: 'current_user',
        title: result.title || formData.title,
        documentType: formData.documentType,
        educationSector: formData.sector,
        institution: formData.institution,
        facultyOrDepartment: formData.facultyOrDepartment,
        courseOrProgramme: formData.courseOrProgramme,
        moduleCode: formData.moduleCode,
        moduleTitle: formData.moduleTitle,
        studentName: formData.studentName,
        studentNumber: formData.studentNumber,
        lecturerOrAssessor: formData.lecturerOrAssessor,
        submissionDate: formData.submissionDate,
        targetWordCount: formData.targetWordCount,
        actualWordCount: result.actualWordCount || 0,
        referencingStyle: formData.referencingStyle,
        language: selectedLanguage,
        recordingDurationSeconds: durationSeconds,
        rawTranscript: transcript,
        cleanedTranscript: transcript,
        instructionsOrRubric: formData.instructionsOrRubric,
        sections: result.sections || [],
        references: result.references || [],
        tvetCompliance: result.tvetCompliance,
        institutionComplianceNotes: result.institutionComplianceNotes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        exportedPdfCount: 0
      };

      setActiveDocument(newDoc);
      // Auto-save initial version
      await academicVoiceService.saveDocument(newDoc);
      await loadSavedData();

      setCurrentStep(4); // Advance to Document Editor
    } catch (err: any) {
      console.error('Document generation error:', err);
      setGenerateError(err.message || 'Could not generate academic document. Please check your inputs.');
    } finally {
      setIsGeneratingDoc(false);
    }
  };

  // Search More Verifiable References
  const handleSearchMoreReferences = async () => {
    if (!activeDocument) return;

    setIsSearchingRefs(true);
    try {
      const foundRefs = await academicVoiceService.searchReferences({
        topic: activeDocument.title,
        subject: activeDocument.moduleTitle || 'General',
        moduleCode: activeDocument.moduleCode,
        educationSector: activeDocument.educationSector,
        referencingStyle: activeDocument.referencingStyle
      });

      // Merge avoiding duplicates
      const currentIds = new Set(activeDocument.references.map((r) => r.title.toLowerCase()));
      const filtered = foundRefs.filter((r) => !currentIds.has(r.title.toLowerCase()));

      const updatedRefs = [...activeDocument.references, ...filtered];
      const updatedDoc = { ...activeDocument, references: updatedRefs };
      setActiveDocument(updatedDoc);
      await academicVoiceService.saveDocument(updatedDoc);
    } catch (err) {
      console.error('Error searching references:', err);
    } finally {
      setIsSearchingRefs(false);
    }
  };

  // Save Document to database
  const handleSaveDocument = async () => {
    if (!activeDocument) return;
    setIsSaving(true);
    try {
      const saved = await academicVoiceService.saveDocument(activeDocument);
      setActiveDocument(saved);
      setSaveSuccessNotice('Document saved successfully to your Nexovia account!');
      await loadSavedData();
      setTimeout(() => setSaveSuccessNotice(null), 3000);
    } catch (err) {
      console.error('Failed to save document:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // Reopen a saved document
  const handleOpenSavedDocument = (doc: AcademicDocument) => {
    setActiveDocument(doc);
    setTranscript(doc.rawTranscript || '');
    setFormData({
      sector: doc.educationSector,
      institution: doc.institution,
      facultyOrDepartment: doc.facultyOrDepartment || '',
      courseOrProgramme: doc.courseOrProgramme,
      moduleCode: doc.moduleCode,
      moduleTitle: doc.moduleTitle,
      title: doc.title,
      studentName: doc.studentName,
      studentNumber: doc.studentNumber,
      lecturerOrAssessor: doc.lecturerOrAssessor || '',
      submissionDate: doc.submissionDate,
      targetWordCount: doc.targetWordCount,
      documentType: doc.documentType,
      referencingStyle: doc.referencingStyle,
      instructionsOrRubric: doc.instructionsOrRubric || ''
    });
    setCurrentStep(4);
  };

  // Delete saved document
  const handleDeleteDocument = async (id: string) => {
    await academicVoiceService.deleteDocument(id);
    await loadSavedData();
    if (activeDocument && activeDocument.id === id) {
      setActiveDocument(null);
      setCurrentStep(1);
    }
  };

  // Rename document
  const handleRenameDocument = async (id: string, newTitle: string) => {
    const doc = savedDocs.find((d) => d.id === id);
    if (doc) {
      const updated = { ...doc, title: newTitle };
      await academicVoiceService.saveDocument(updated);
      await loadSavedData();
      if (activeDocument && activeDocument.id === id) {
        setActiveDocument(updated);
      }
    }
  };

  // Reset to create new document
  const handleStartNewDocument = () => {
    setActiveDocument(null);
    setTranscript('');
    setAudioBlob(null);
    setDurationSeconds(0);
    setTranscriptionError(null);
    setCurrentStep(1);
  };

  const stepsConfig = [
    { num: 1 as const, label: 'Audio Capture', icon: Mic },
    { num: 2 as const, label: 'Transcript', icon: FileText },
    { num: 3 as const, label: 'Assignment Details', icon: Sliders },
    { num: 4 as const, label: 'Academic Editor', icon: BookOpen },
    { num: 5 as const, label: 'References', icon: Layers },
    { num: 6 as const, label: 'PDF Export', icon: Download }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Back to Home Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-2xs"
          aria-label="Return to Home Dashboard"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>
      </div>

      {/* 1. TOP HEADER & TIER BAR */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              Higher Ed & TVET Academic Voice
            </span>
            <span className="text-xs text-slate-400">
              University & NATED N1–N6 / NC(V)
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Academic Voice-to-Document
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Record spoken research thoughts, lectures, or workshop tasks. Nexovia transforms your authentic ideas
            into structured academic assignments and professional A4 PDFs.
          </p>
        </div>

        {/* Tier status badge & action buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          {/* Subscription Tier Pill */}
          <button
            type="button"
            onClick={() => setIsPremiumModalOpen(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              tierStatus.tier === 'premium'
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-800 dark:text-amber-300'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-400'
            }`}
          >
            {tierStatus.tier === 'premium' ? (
              <>
                <Crown className="w-3.5 h-3.5 text-amber-500" />
                <span>Scholar Premium (Active)</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Free Plan ({tierStatus.remainingDocuments} left)</span>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold ml-1">
                  R50/mo
                </span>
              </>
            )}
          </button>

          {/* Saved Documents Drawer */}
          <button
            type="button"
            onClick={() => setIsSavedModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-2xs"
          >
            <FolderOpen className="w-3.5 h-3.5 text-slate-500" />
            <span>My Documents ({savedDocs.length})</span>
          </button>

          {activeDocument && (
            <button
              type="button"
              onClick={handleStartNewDocument}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>New Document</span>
            </button>
          )}
        </div>
      </div>

      {/* Save Success Notice */}
      {saveSuccessNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveSuccessNotice}</span>
        </div>
      )}

      {/* 2. STEPPER PROGRESS BAR */}
      <div className="overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center min-w-[650px] gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
          {stepsConfig.map((s, idx) => {
            const Icon = s.icon;
            const isActive = currentStep === s.num;
            const isCompleted = currentStep > s.num;

            return (
              <React.Fragment key={s.num}>
                <button
                  type="button"
                  onClick={() => {
                    // Allow navigating if step is unlocked
                    if (s.num <= 3 || activeDocument) {
                      setCurrentStep(s.num);
                    }
                  }}
                  disabled={s.num > 3 && !activeDocument}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                      : isCompleted
                      ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                      : 'text-slate-400 hover:text-slate-600 disabled:opacity-40 disabled:hover:text-slate-400'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{s.label}</span>
                </button>

                {idx < stepsConfig.length - 1 && (
                  <span className="text-slate-300 dark:text-slate-700 font-bold text-xs">
                    ›
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 3. WIZARD STEP CONTENTS */}
      <div className="space-y-6">
        {/* STEP 1: AUDIO RECORDING & UPLOAD */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <AudioRecorderUploader
              onAudioReady={handleAudioReady}
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
              maxMinutes={tierStatus.maxRecordingMinutes}
              isProcessing={isTranscribing}
            />

            {transcript.trim().length > 0 && (
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  <span>Continue to Transcript</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: TRANSCRIPT REVIEW & EDIT */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <TranscriptEditor
              transcript={transcript}
              onTranscriptChange={setTranscript}
              isTranscribing={isTranscribing}
              transcriptionError={transcriptionError}
              onRetryTranscription={() => executeTranscription()}
              language={selectedLanguage}
            />

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Audio</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                disabled={!transcript.trim()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
              >
                <span>Configure Assignment Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: ACADEMIC DETAILS FORM */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <AcademicDetailsForm
              formData={formData}
              onChange={(updated) => setFormData((prev) => ({ ...prev, ...updated }))}
            />

            {generateError && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-300 dark:border-rose-900/50 text-xs text-rose-800 dark:text-rose-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{generateError}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Transcript</span>
              </button>

              <button
                type="button"
                onClick={handleGenerateDocument}
                disabled={isGeneratingDoc || !transcript.trim()}
                className="flex items-center gap-2 px-7 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {isGeneratingDoc
                    ? 'Synthesizing Academic Document...'
                    : 'Generate Academic Document'}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: DOCUMENT LIVE EDITOR */}
        {currentStep === 4 && activeDocument && (
          <div className="space-y-6">
            <DocumentPreviewEditor
              title={activeDocument.title}
              onTitleChange={(title) => setActiveDocument({ ...activeDocument, title })}
              sections={activeDocument.sections}
              onSectionsChange={(sections) => {
                const totalWords = sections.reduce(
                  (acc, s) => acc + (s.content || '').split(/\s+/).filter(Boolean).length,
                  0
                );
                setActiveDocument({ ...activeDocument, sections, actualWordCount: totalWords });
              }}
              educationSector={activeDocument.educationSector}
              tvetCompliance={activeDocument.tvetCompliance}
              actualWordCount={activeDocument.actualWordCount}
            />

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Assignment Details</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveDocument}
                  disabled={isSaving}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-2xs"
                >
                  {isSaving ? 'Saving...' : 'Save Draft'}
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  <span>Review References ({activeDocument.references?.length || 0})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: REFERENCES MANAGER */}
        {currentStep === 5 && activeDocument && (
          <div className="space-y-6">
            <ReferenceManager
              references={activeDocument.references}
              onReferencesChange={(references) =>
                setActiveDocument({ ...activeDocument, references })
              }
              referencingStyle={activeDocument.referencingStyle}
              onSearchMoreReferences={handleSearchMoreReferences}
              isSearching={isSearchingRefs}
            />

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Document Editor</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(6)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
              >
                <span>Proceed to PDF Export</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: PDF EXPORT & PREVIEW */}
        {currentStep === 6 && activeDocument && (
          <div className="space-y-6">
            <PdfExportSection
              documentData={activeDocument}
              onSaveDocument={handleSaveDocument}
              isSaving={isSaving}
            />

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to References</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200"
              >
                <span>Edit Document Content</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODALS */}
      <SavedDocumentsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        documents={savedDocs}
        onOpenDocument={handleOpenSavedDocument}
        onDeleteDocument={handleDeleteDocument}
        onRenameDocument={handleRenameDocument}
      />

      <ScholarPremiumModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
        tierStatus={tierStatus}
        onUpdateTier={async (newTier) => {
          const updated = await academicVoiceService.setTier(newTier);
          setTierStatus(updated);
        }}
      />
    </div>
  );
};
