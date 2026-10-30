/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Nexovian Academic Voice - Institutional & Assignment Configuration Form
 */

import React from 'react';
import {
  GraduationCap,
  Briefcase,
  Building2,
  BookOpen,
  FileText,
  Sliders,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Award
} from 'lucide-react';
import { AcademicDocumentType, AcademicSector, ReferencingStyle } from '../../types/academicVoice';

interface FormData {
  sector: AcademicSector;
  institution: string;
  facultyOrDepartment: string;
  courseOrProgramme: string;
  moduleCode: string;
  moduleTitle: string;
  title: string;
  studentName: string;
  studentNumber: string;
  lecturerOrAssessor: string;
  submissionDate: string;
  targetWordCount: number;
  documentType: AcademicDocumentType;
  referencingStyle: ReferencingStyle;
  instructionsOrRubric: string;
}

interface Props {
  formData: FormData;
  onChange: (updated: Partial<FormData>) => void;
}

const POPULAR_UNIVERSITIES = [
  'University of Cape Town (UCT)',
  'University of the Witwatersrand (Wits)',
  'University of Pretoria (UP)',
  'University of South Africa (UNISA)',
  'University of Johannesburg (UJ)',
  'Stellenbosch University (SU)',
  'University of KwaZulu-Natal (UKZN)',
  'Tshwane University of Technology (TUT)',
  'Nelson Mandela University (NMU)',
  'Rhodes University',
  'North-West University (NWU)',
  'University of the Free State (UFS)'
];

const POPULAR_TVET_COLLEGES = [
  'Tshwane North TVET College',
  'Tshwane South TVET College',
  'Ekurhuleni West TVET College (EWC)',
  'Ekurhuleni East TVET College',
  'False Bay TVET College',
  'Northlink TVET College',
  'College of Cape Town',
  'Orbit TVET College',
  'Buffalo City TVET College',
  'Sedibeng TVET College',
  'Mopani South East TVET College',
  'Majuba TVET College'
];

export const AcademicDetailsForm: React.FC<Props> = ({ formData, onChange }) => {
  const isTvet = formData.sector === 'tvet';

  return (
    <div className="space-y-6">
      {/* 1. SECTOR SELECTOR (UNIVERSITY VS TVET) */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          Step 3A: Select Tertiary Education Sector
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              onChange({
                sector: 'university',
                institution: formData.institution.includes('TVET')
                  ? 'University of Cape Town (UCT)'
                  : formData.institution,
                documentType: formData.documentType === 'tvet_project' ? 'essay' : formData.documentType
              });
            }}
            className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all ${
              formData.sector === 'university'
                ? 'bg-purple-50/70 dark:bg-purple-950/30 border-purple-400 dark:border-purple-600 shadow-xs'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            <div
              className={`p-2.5 rounded-xl ${
                formData.sector === 'university'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <GraduationCap className="w-5 h-5" />
            </div>

            <div>
              <span className="font-display font-bold text-sm text-slate-900 dark:text-white block">
                University Higher Education
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 block leading-relaxed">
                Degrees, Diplomas & Honours (UCT, Wits, UP, UNISA, UJ, Stellenbosch). Scholarly literature reviews, essays, methodology.
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              onChange({
                sector: 'tvet',
                institution: !formData.institution.includes('TVET')
                  ? 'Tshwane North TVET College'
                  : formData.institution,
                documentType: 'tvet_project'
              });
            }}
            className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all ${
              formData.sector === 'tvet'
                ? 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-400 dark:border-blue-600 shadow-xs'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            <div
              className={`p-2.5 rounded-xl ${
                formData.sector === 'tvet'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Briefcase className="w-5 h-5" />
            </div>

            <div>
              <span className="font-display font-bold text-sm text-slate-900 dark:text-white block">
                TVET College (NATED N1–N6 & NC(V))
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 block leading-relaxed">
                Technical, Engineering & Business Studies. Portfolio of Evidence (PoE), OHS Act safety logs, assessor sign-off blocks.
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* 2. DOCUMENT TYPE */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          Step 3B: Document Type
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { id: 'essay' as const, label: 'Essay & Assignment', desc: 'Thesis, body paragraphs & conclusion' },
            { id: 'research_report' as const, label: 'Research Report', desc: 'Abstract, methods, findings & discussion' },
            { id: 'literature_review' as const, label: 'Literature Review', desc: 'Thematic synthesis of academic sources' },
            { id: 'practical_report' as const, label: 'Practical / Lab Report', desc: 'Apparatus, steps, observations & data' },
            { id: 'tvet_project' as const, label: 'TVET Workplace PoE', desc: 'OHS Act compliance & assessor sign-off' },
            { id: 'lecture_notes' as const, label: 'Lecture Summary', desc: 'Thematic notes, definitions & formulae' }
          ].map((type) => {
            const isSelected = formData.documentType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => onChange({ documentType: type.id })}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-amber-400 bg-amber-500/10 text-slate-900 dark:text-white shadow-2xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <span className="text-xs font-bold block">{type.label}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5 leading-snug">{type.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. INSTITUTION & FACULTY DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Institution */}
        <div className="space-y-1.5">
          <label htmlFor="inst-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
            <span>Institution / College:</span>
            <span className="text-[10px] text-slate-400">Select or type custom</span>
          </label>
          <input
            id="inst-input"
            type="text"
            list="popular-inst-list"
            value={formData.institution}
            onChange={(e) => onChange({ institution: e.target.value })}
            placeholder={isTvet ? 'e.g. Tshwane North TVET College' : 'e.g. University of Cape Town (UCT)'}
            className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:border-amber-400"
          />
          <datalist id="popular-inst-list">
            {(isTvet ? POPULAR_TVET_COLLEGES : POPULAR_UNIVERSITIES).map((inst) => (
              <option key={inst} value={inst} />
            ))}
          </datalist>
        </div>

        {/* Faculty / Department */}
        <div className="space-y-1.5">
          <label htmlFor="dept-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Faculty / Department:
          </label>
          <input
            id="dept-input"
            type="text"
            value={formData.facultyOrDepartment}
            onChange={(e) => onChange({ facultyOrDepartment: e.target.value })}
            placeholder={isTvet ? 'e.g. Electrical & Mechanical Engineering' : 'e.g. Faculty of Engineering & the Built Environment'}
            className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:border-amber-400"
          />
        </div>

        {/* Course / Programme */}
        <div className="space-y-1.5">
          <label htmlFor="prog-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Course / Programme:
          </label>
          <input
            id="prog-input"
            type="text"
            value={formData.courseOrProgramme}
            onChange={(e) => onChange({ courseOrProgramme: e.target.value })}
            placeholder={isTvet ? 'e.g. Electrical Engineering NATED N4' : 'e.g. BSc Computer Science'}
            className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:border-amber-400"
          />
        </div>

        {/* Module Code & Title */}
        <div className="space-y-1.5">
          <label htmlFor="module-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Module Code & Title:
          </label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              value={formData.moduleCode}
              onChange={(e) => onChange({ moduleCode: e.target.value })}
              placeholder="e.g. EEE2046F"
              className="px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:border-amber-400 font-mono"
            />
            <input
              type="text"
              value={formData.moduleTitle}
              onChange={(e) => onChange({ moduleTitle: e.target.value })}
              placeholder="e.g. Embedded Systems"
              className="col-span-2 px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:border-amber-400"
            />
          </div>
        </div>

        {/* Assignment Title */}
        <div className="space-y-1.5 md:col-span-2">
          <label htmlFor="title-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Assignment / Report Title:
          </label>
          <input
            id="title-input"
            type="text"
            value={formData.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="e.g. Laboratory Investigation of Butterworth Low-Pass Filter Frequency Response"
            className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:border-amber-400 font-semibold"
          />
        </div>

        {/* Student Name & Student Number */}
        <div className="space-y-1.5">
          <label htmlFor="stud-name-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Student Full Name:
          </label>
          <input
            id="stud-name-input"
            type="text"
            value={formData.studentName}
            onChange={(e) => onChange({ studentName: e.target.value })}
            placeholder="e.g. Samukelo Masuku"
            className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:border-amber-400"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="stud-num-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Student Number / ID:
          </label>
          <input
            id="stud-num-input"
            type="text"
            value={formData.studentNumber}
            onChange={(e) => onChange({ studentNumber: e.target.value })}
            placeholder="e.g. 202488921"
            className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:border-amber-400 font-mono"
          />
        </div>

        {/* Lecturer / Assessor */}
        <div className="space-y-1.5">
          <label htmlFor="lec-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Lecturer / Assessor Name (Optional):
          </label>
          <input
            id="lec-input"
            type="text"
            value={formData.lecturerOrAssessor}
            onChange={(e) => onChange({ lecturerOrAssessor: e.target.value })}
            placeholder="e.g. Prof. M. Ndlovu"
            className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:border-amber-400"
          />
        </div>

        {/* Submission Date */}
        <div className="space-y-1.5">
          <label htmlFor="date-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Submission Date:
          </label>
          <input
            id="date-input"
            type="date"
            value={formData.submissionDate}
            onChange={(e) => onChange({ submissionDate: e.target.value })}
            className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:border-amber-400"
          />
        </div>
      </div>

      {/* 4. WORD COUNT & REFERENCING STYLE */}
      <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Word count */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span>Target Word Count:</span>
            <span className="font-mono text-amber-600 dark:text-amber-400">{formData.targetWordCount} words</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[600, 800, 1200, 1500, 2000, 2500].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => onChange({ targetWordCount: count })}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  formData.targetWordCount === count
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-2xs'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        {/* Referencing style */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
            Referencing Standard:
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onChange({ referencingStyle: 'harvard' })}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                formData.referencingStyle === 'harvard'
                  ? 'border-amber-500 bg-amber-500/15 text-slate-950 dark:text-amber-300 font-bold'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400'
              }`}
            >
              Harvard (South Africa Standard)
            </button>

            <button
              type="button"
              onClick={() => onChange({ referencingStyle: 'apa' })}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                formData.referencingStyle === 'apa'
                  ? 'border-amber-500 bg-amber-500/15 text-slate-950 dark:text-amber-300 font-bold'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400'
              }`}
            >
              APA 7th Edition
            </button>
          </div>
        </div>
      </div>

      {/* 5. RUBRIC / SPECIAL INSTRUCTIONS */}
      <div className="space-y-1.5">
        <label htmlFor="rubric-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
          <span>Lecturer's Instructions / Rubric Guidelines (Optional):</span>
          <span className="text-[10px] text-slate-400">Guarantees alignment with your assignment brief</span>
        </label>
        <textarea
          id="rubric-input"
          value={formData.instructionsOrRubric}
          onChange={(e) => onChange({ instructionsOrRubric: e.target.value })}
          rows={3}
          placeholder="e.g. Must include critical evaluation of 3 empirical studies; for TVET: include OHS safety check and circuit calculations table..."
          className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:border-amber-400"
        />
      </div>

      {/* INSTITUTIONAL COMPLIANCE DISCLAIMER */}
      <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/70 dark:bg-blue-950/20 text-xs text-blue-900 dark:text-blue-300 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="text-[11px] leading-relaxed">
          <strong className="block mb-0.5">South African Institutional Compliance Verification:</strong>
          Nexovian formats documents according to tertiary and TVET (NATED/NCV) curriculum benchmarks.
          Please always confirm your faculty's specific cover sheet and plagiarism declaration requirements prior to final submission.
        </div>
      </div>
    </div>
  );
};
