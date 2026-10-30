/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Nexovian Academic Voice - PDF Export & Preview Controls
 */

import React, { useState } from 'react';
import {
  Download,
  FileDown,
  Printer,
  CheckCircle2,
  FileText,
  Sparkles,
  Sliders,
  ExternalLink,
  Save,
  Check
} from 'lucide-react';
import { AcademicDocument } from '../../types/academicVoice';
import { generateAcademicPdf } from '../../services/academic/academicPdfGenerator';

interface Props {
  documentData: AcademicDocument;
  onSaveDocument: () => void;
  isSaving: boolean;
}

export const PdfExportSection: React.FC<Props> = ({
  documentData,
  onSaveDocument,
  isSaving
}) => {
  const [includeCoverPage, setIncludeCoverPage] = useState(true);
  const [includeStudentVoiceNotes, setIncludeStudentVoiceNotes] = useState(true);
  const [includeTvetSignOff, setIncludeTvetSignOff] = useState(true);
  const [includeReferenceList, setIncludeReferenceList] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [textExportSuccess, setTextExportSuccess] = useState(false);

  const handleDownloadPdf = () => {
    const { download } = generateAcademicPdf(documentData, {
      includeCoverPage,
      includeStudentVoiceNotes,
      includeTvetSignOff,
      includeReferenceList
    });

    download();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleExportText = () => {
    let fullText = `${documentData.institution.toUpperCase()}\n`;
    if (documentData.facultyOrDepartment) fullText += `${documentData.facultyOrDepartment}\n`;
    fullText += `Title: ${documentData.title}\n`;
    fullText += `Student: ${documentData.studentName} (${documentData.studentNumber})\n`;
    fullText += `Module: ${documentData.moduleCode} - ${documentData.moduleTitle}\n`;
    fullText += `Date: ${documentData.submissionDate}\n`;
    fullText += `Word Count: ${documentData.actualWordCount}\n\n`;
    fullText += `=========================================\n\n`;

    for (const sec of documentData.sections) {
      fullText += `${sec.heading}\n\n`;
      fullText += `${sec.content}\n\n`;
      if (sec.studentVoicePoints && sec.studentVoicePoints.length > 0) {
        fullText += `[Student Voice Input: ${sec.studentVoicePoints.join('; ')}]\n\n`;
      }
    }

    if (documentData.references && documentData.references.length > 0) {
      fullText += `=========================================\n`;
      fullText += `REFERENCES (${documentData.referencingStyle.toUpperCase()} STYLE)\n\n`;
      for (const ref of documentData.references) {
        fullText += `${ref.author} (${ref.year}). ${ref.title}. ${ref.source}.${ref.urlOrDoi ? ' ' + ref.urlOrDoi : ''}\n\n`;
      }
    }

    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(documentData.moduleCode || 'Assignment').replace(/\s+/g, '_')}_${documentData.title.slice(0, 20).replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    setTextExportSuccess(true);
    setTimeout(() => setTextExportSuccess(false), 3000);
  };

  return (
    <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <FileDown className="w-5 h-5 text-amber-500" />
            <span>Step 6: Preview, Download PDF & Keep Editable</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Produces an official A4 formatted academic document ready for submission to your faculty or TVET college.
          </p>
        </div>

        <button
          type="button"
          onClick={onSaveDocument}
          disabled={isSaving}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors shadow-2xs self-start sm:self-auto"
        >
          <Save className="w-3.5 h-3.5 text-emerald-500" />
          <span>{isSaving ? 'Saving...' : 'Save to Nexovian Account'}</span>
        </button>
      </div>

      {/* PDF Generation Layout Toggles */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          Document Export Options
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 cursor-pointer">
            <input
              type="checkbox"
              checked={includeCoverPage}
              onChange={(e) => setIncludeCoverPage(e.target.checked)}
              className="rounded-md text-amber-500 focus:ring-amber-400"
            />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Formal Cover Page
            </span>
          </label>

          <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 cursor-pointer">
            <input
              type="checkbox"
              checked={includeReferenceList}
              onChange={(e) => setIncludeReferenceList(e.target.checked)}
              className="rounded-md text-amber-500 focus:ring-amber-400"
            />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Reference List Page
            </span>
          </label>

          <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 cursor-pointer">
            <input
              type="checkbox"
              checked={includeStudentVoiceNotes}
              onChange={(e) => setIncludeStudentVoiceNotes(e.target.checked)}
              className="rounded-md text-amber-500 focus:ring-amber-400"
            />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Student Voice Callouts
            </span>
          </label>

          {documentData.educationSector === 'tvet' && (
            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 cursor-pointer">
              <input
                type="checkbox"
                checked={includeTvetSignOff}
                onChange={(e) => setIncludeTvetSignOff(e.target.checked)}
                className="rounded-md text-amber-500 focus:ring-amber-400"
              />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                TVET Assessor Stamp Box
              </span>
            </label>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <button
          type="button"
          onClick={handleDownloadPdf}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-98 text-slate-950 font-bold text-sm shadow-md transition-all"
        >
          {downloadSuccess ? (
            <>
              <Check className="w-4 h-4 text-slate-950" />
              <span>PDF Downloaded Successfully!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-slate-950" />
              <span>Download Academic PDF (A4)</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleExportText}
          className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors shadow-2xs"
        >
          {textExportSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Text Exported</span>
            </>
          ) : (
            <>
              <FileText className="w-4 h-4 text-slate-400" />
              <span>Export Text (.txt)</span>
            </>
          )}
        </button>
      </div>

      <p className="text-xs text-slate-400 text-center">
        🔒 Your document remains fully editable in Nexovian even after exporting. You can return, modify sections, and regenerate PDFs anytime.
      </p>
    </div>
  );
};
