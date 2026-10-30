/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * NEXOVIA Academic Voice-to-Document - Client-Side PDF Generation Engine
 */

import { jsPDF } from 'jspdf';
import { AcademicDocument } from '../../types/academicVoice';

export interface PdfExportOptions {
  includeCoverPage?: boolean;
  includeStudentVoiceNotes?: boolean;
  includeTvetSignOff?: boolean;
  includeReferenceList?: boolean;
  customNotes?: string;
}

/**
 * Generates an academic publication-quality A4 PDF document
 * adhering to South African tertiary and TVET college formatting standards.
 */
export function generateAcademicPdf(
  docData: AcademicDocument,
  options: PdfExportOptions = {}
): { pdfBlob: Blob; pdfUrl: string; download: () => void } {
  const {
    includeCoverPage = true,
    includeStudentVoiceNotes = true,
    includeTvetSignOff = true,
    includeReferenceList = true
  } = options;

  // Initialize A4 PDF: 210mm x 297mm
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginLeft = 25;
  const marginRight = 25;
  const marginTop = 25;
  const marginBottom = 25;
  const contentWidth = pageWidth - marginLeft - marginRight; // 160mm

  let currentY = marginTop;

  // Helper to check page overflow and break cleanly
  const checkPageBreak = (neededHeight: number) => {
    if (currentY + neededHeight > pageHeight - marginBottom) {
      pdf.addPage();
      currentY = marginTop;
      return true;
    }
    return false;
  };

  // Helper to format text with word wrap
  const renderWrappedText = (
    text: string,
    x: number,
    fontSize: number,
    isBold = false,
    color = [30, 41, 59] as [number, number, number],
    lineHeight = 5
  ) => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
    pdf.setTextColor(color[0], color[1], color[2]);

    const lines = pdf.splitTextToSize(text, contentWidth);
    for (const line of lines) {
      checkPageBreak(lineHeight);
      pdf.text(line, x, currentY);
      currentY += lineHeight;
    }
  };

  // ==========================================
  // 1. FORMAL ACADEMIC COVER PAGE (PAGE 1)
  // ==========================================
  if (includeCoverPage) {
    // Institution Header
    currentY = 40;
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(15, 23, 42);
    const instUpper = (docData.institution || 'HIGHER EDUCATION & TRAINING').toUpperCase();
    pdf.text(instUpper, pageWidth / 2, currentY, { align: 'center' });
    currentY += 8;

    if (docData.facultyOrDepartment) {
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(71, 85, 105);
      pdf.text(docData.facultyOrDepartment, pageWidth / 2, currentY, { align: 'center' });
      currentY += 6;
    }

    // Horizontal Accent Line
    currentY += 4;
    pdf.setDrawColor(217, 119, 6); // Amber-600
    pdf.setLineWidth(0.8);
    pdf.line(pageWidth / 2 - 35, currentY, pageWidth / 2 + 35, currentY);
    currentY += 25;

    // Assignment Title
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(15, 23, 42);
    const titleLines = pdf.splitTextToSize(docData.title || 'Academic Assignment', 150);
    for (const tLine of titleLines) {
      pdf.text(tLine, pageWidth / 2, currentY, { align: 'center' });
      currentY += 8;
    }

    // Subtitle / Document Type
    currentY += 4;
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(180, 83, 9); // Amber-700
    const docTypeLabel = formatDocType(docData.documentType);
    const sectorBadge = docData.educationSector === 'tvet' ? 'TVET Portfolio of Evidence (PoE)' : 'University Academic Submission';
    pdf.text(`${docTypeLabel.toUpperCase()} · ${sectorBadge.toUpperCase()}`, pageWidth / 2, currentY, { align: 'center' });

    // Student & Submission Details Table Box
    currentY = 145;
    const boxX = marginLeft + 5;
    const boxWidth = contentWidth - 10;
    const boxHeight = 85;

    pdf.setFillColor(248, 250, 252); // Slate-50
    pdf.setDrawColor(203, 213, 225); // Slate-300
    pdf.setLineWidth(0.3);
    pdf.roundedRect(boxX, currentY, boxWidth, boxHeight, 3, 3, 'FD');

    let rowY = currentY + 10;
    const labelX = boxX + 8;
    const valueX = boxX + 55;

    const details = [
      { label: 'Student Name:', val: docData.studentName || 'Not Specified' },
      { label: 'Student Number:', val: docData.studentNumber || 'Not Specified' },
      { label: 'Course / Programme:', val: docData.courseOrProgramme || 'Engineering / Studies' },
      { label: 'Module Code & Title:', val: `${docData.moduleCode || ''} ${docData.moduleTitle ? '- ' + docData.moduleTitle : ''}`.trim() || 'General Module' },
      { label: 'Lecturer / Assessor:', val: docData.lecturerOrAssessor || 'Course Facilitator' },
      { label: 'Submission Date:', val: docData.submissionDate || new Date().toISOString().split('T')[0] },
      { label: 'Referencing Format:', val: docData.referencingStyle === 'apa' ? 'APA 7th Edition' : 'Harvard (South Africa Standard)' },
      { label: 'Actual Word Count:', val: `${docData.actualWordCount || 0} words (Target: ${docData.targetWordCount || 'N/A'})` }
    ];

    for (const d of details) {
      pdf.setFontSize(9.5);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(71, 85, 105);
      pdf.text(d.label, labelX, rowY);

      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(15, 23, 42);
      const valTrunc = d.val.length > 45 ? d.val.slice(0, 42) + '...' : d.val;
      pdf.text(valTrunc, valueX, rowY);

      rowY += 9;
    }

    // Plagiarism & Academic Integrity Declaration Box
    currentY = 245;
    pdf.setFontSize(7.5);
    pdf.setFont('helvetica', 'italic');
    pdf.setTextColor(100, 116, 139);
    const declText =
      'Plagiarism Declaration: I confirm that this submission is my own original academic work. ' +
      'All theoretical insights, empirical observations, and external scholarly citations have been acknowledged ' +
      'in full accordance with institutional and departmental referencing codes.';
    const declLines = pdf.splitTextToSize(declText, contentWidth - 10);
    for (const dl of declLines) {
      pdf.text(dl, pageWidth / 2, currentY, { align: 'center' });
      currentY += 3.8;
    }

    // Institutional Notice
    currentY += 2;
    pdf.setFontSize(7);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(148, 163, 184);
    pdf.text('NEXOVIA Academic Voice-to-Document Engine · South African Tertiary & TVET Framework', pageWidth / 2, currentY, { align: 'center' });

    // Add page for body content
    pdf.addPage();
    currentY = marginTop;
  }

  // ==========================================
  // 2. DOCUMENT BODY SECTIONS
  // ==========================================

  // Render Title on Top of First Content Page
  if (!includeCoverPage) {
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(15, 23, 42);
    pdf.text(docData.title, marginLeft, currentY);
    currentY += 8;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(100, 116, 139);
    pdf.text(`${docData.studentName} (${docData.studentNumber}) · ${docData.institution}`, marginLeft, currentY);
    currentY += 10;
  }

  // Iterate Sections
  for (let sIdx = 0; sIdx < (docData.sections || []).length; sIdx++) {
    const section = docData.sections[sIdx];
    checkPageBreak(18);

    // Section Heading
    pdf.setFontSize(12.5);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(15, 23, 42);
    pdf.text(section.heading, marginLeft, currentY);
    currentY += 6;

    // Student Voice Callout (if enabled and present)
    if (includeStudentVoiceNotes && section.studentVoicePoints && section.studentVoicePoints.length > 0) {
      checkPageBreak(14);
      pdf.setFillColor(254, 243, 199); // Amber-100
      pdf.setDrawColor(245, 158, 11); // Amber-500
      pdf.setLineWidth(0.4);

      const notesText = `Spoken Voice Input: "${section.studentVoicePoints.join('; ')}"`;
      const noteLines = pdf.splitTextToSize(notesText, contentWidth - 8);
      const boxH = Math.max(10, noteLines.length * 4.2 + 4);

      pdf.roundedRect(marginLeft, currentY, contentWidth, boxH, 1.5, 1.5, 'FD');

      let nY = currentY + 4;
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'italic');
      pdf.setTextColor(146, 64, 14); // Amber-900
      for (const nl of noteLines) {
        pdf.text(nl, marginLeft + 4, nY);
        nY += 4;
      }
      currentY += boxH + 4;
    }

    // Section Content Paragraphs
    const paragraphs = (section.content || '').split('\n').filter((p) => p.trim().length > 0);
    for (const para of paragraphs) {
      renderWrappedText(para.trim(), marginLeft, 10, false, [30, 41, 59], 5.2);
      currentY += 3.5; // Paragraph spacing
    }

    currentY += 4; // Section separation
  }

  // ==========================================
  // 3. TVET OHS COMPLIANCE & ASSESSOR SIGN-OFF
  // ==========================================
  if (docData.educationSector === 'tvet' && includeTvetSignOff) {
    checkPageBreak(55);

    // TVET Workplace Safety & Logbook Banner
    pdf.setFillColor(241, 245, 249); // Slate-100
    pdf.setDrawColor(148, 163, 184); // Slate-400
    pdf.setLineWidth(0.5);
    pdf.roundedRect(marginLeft, currentY, contentWidth, 52, 2, 2, 'FD');

    let signY = currentY + 6;
    pdf.setFontSize(10.5);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(15, 23, 42);
    pdf.text('TVET PORTFOLIO OF EVIDENCE (PoE) & ASSESSOR SIGN-OFF', marginLeft + 5, signY);
    signY += 6;

    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(71, 85, 105);
    pdf.text(
      'Occupational Health and Safety (OHS Act 85 of 1993) compliance verified. Practical logbook verified by college assessor.',
      marginLeft + 5,
      signY
    );
    signY += 10;

    // Assessor signature lines
    const col1X = marginLeft + 5;
    const col2X = marginLeft + 85;

    pdf.setFontSize(8.5);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(15, 23, 42);
    pdf.text('Assessor Name: ___________________________', col1X, signY);
    pdf.text('Assessment Date: _______________________', col2X, signY);
    signY += 10;

    pdf.text('Assessor Signature: _______________________', col1X, signY);
    pdf.text('Outcome:  [  ] Competent   [  ] Not Yet Competent', col2X, signY);
    signY += 10;

    pdf.text('Internal Moderator: _______________________', col1X, signY);
    pdf.text('College Stamp: _________________________', col2X, signY);

    currentY += 58;
  }

  // ==========================================
  // 4. REFERENCES LIST
  // ==========================================
  if (includeReferenceList && docData.references && docData.references.length > 0) {
    checkPageBreak(35);

    pdf.setFontSize(13);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(15, 23, 42);
    const refHeading = docData.referencingStyle === 'apa' ? 'References (APA 7th Edition)' : 'References (Harvard South Africa)';
    pdf.text(refHeading, marginLeft, currentY);
    currentY += 8;

    for (let rIdx = 0; rIdx < docData.references.length; rIdx++) {
      const ref = docData.references[rIdx];
      checkPageBreak(14);

      // Formatted academic reference entry:
      // Author (Year). Title. Source. DOI/URL
      const formattedEntry = `${ref.author} (${ref.year}). ${ref.title}. ${ref.source}.${ref.urlOrDoi ? ' Available at: ' + ref.urlOrDoi : ''}`;

      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(30, 41, 59);

      const refLines = pdf.splitTextToSize(formattedEntry, contentWidth - 4);
      for (const rLine of refLines) {
        checkPageBreak(4.5);
        pdf.text(rLine, marginLeft + 2, currentY);
        currentY += 4.5;
      }

      // Verification Badge Note
      pdf.setFontSize(7.5);
      if (ref.verified) {
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(22, 101, 52); // Green-800
        pdf.text(`[Verified Scholarly Source · ${ref.verificationSource || 'Academic Register'}]`, marginLeft + 2, currentY);
      } else {
        pdf.setFont('helvetica', 'italic');
        pdf.setTextColor(180, 83, 9); // Amber-700
        pdf.text('[Unverified Source · Please cross-check campus library catalog]', marginLeft + 2, currentY);
      }
      currentY += 5.5;
    }
  }

  // ==========================================
  // 5. RUNNING HEADERS & FOOTER PAGE NUMBERS
  // ==========================================
  const totalPages = pdf.getNumberOfPages();
  const startPage = includeCoverPage ? 2 : 1;

  for (let p = startPage; p <= totalPages; p++) {
    pdf.setPage(p);

    // Running Header
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(148, 163, 184); // Slate-400
    const headerTitle = docData.title.length > 50 ? docData.title.slice(0, 48) + '...' : docData.title;
    pdf.text(`${docData.studentName} · ${headerTitle}`, marginLeft, 15);
    pdf.text(`${docData.moduleCode || ''}`, pageWidth - marginRight, 15, { align: 'right' });

    pdf.setDrawColor(226, 232, 240); // Slate-200
    pdf.setLineWidth(0.2);
    pdf.line(marginLeft, 17, pageWidth - marginRight, 17);

    // Running Footer Page Number
    pdf.setDrawColor(226, 232, 240);
    pdf.line(marginLeft, pageHeight - 15, pageWidth - marginRight, pageHeight - 15);

    pdf.setFontSize(8);
    pdf.setTextColor(100, 116, 139);
    const pageStr = includeCoverPage ? `Page ${p - 1} of ${totalPages - 1}` : `Page ${p} of ${totalPages}`;
    pdf.text(pageStr, pageWidth / 2, pageHeight - 10, { align: 'center' });
    pdf.text('NEXOVIA Academic Engine', pageWidth - marginRight, pageHeight - 10, { align: 'right' });
  }

  // Create downloadable blob and URL
  const pdfBlob = pdf.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);

  const cleanFilename = `${docData.moduleCode || 'Academic'}_${(docData.title || 'Document').replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;

  const download = () => {
    pdf.save(cleanFilename);
  };

  return {
    pdfBlob,
    pdfUrl,
    download
  };
}

function formatDocType(type: string): string {
  switch (type) {
    case 'essay':
      return 'Academic Essay';
    case 'research_report':
      return 'Formal Research Report';
    case 'literature_review':
      return 'Literature Review & Synthesis';
    case 'practical_report':
      return 'Laboratory & Practical Report';
    case 'tvet_project':
      return 'TVET Workplace Project & PoE';
    case 'lecture_notes':
      return 'Lecture Notes & Study Summary';
    default:
      return 'Academic Document';
  }
}
