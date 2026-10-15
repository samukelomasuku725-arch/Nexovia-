/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Nexovia Academic Voice - Document Preview & Live Section Editor
 */

import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Trash2,
  Sparkles,
  Quote,
  CheckCircle2,
  AlertTriangle,
  MoveUp,
  MoveDown,
  Wrench,
  ShieldCheck,
  Edit3
} from 'lucide-react';
import { AcademicDocumentSection, TvetComplianceData } from '../../types/academicVoice';

interface Props {
  title: string;
  onTitleChange: (title: string) => void;
  sections: AcademicDocumentSection[];
  onSectionsChange: (sections: AcademicDocumentSection[]) => void;
  educationSector: 'university' | 'tvet';
  tvetCompliance?: TvetComplianceData;
  actualWordCount: number;
}

export const DocumentPreviewEditor: React.FC<Props> = ({
  title,
  onTitleChange,
  sections,
  onSectionsChange,
  educationSector,
  tvetCompliance,
  actualWordCount
}) => {
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);

  const handleUpdateHeading = (id: string, heading: string) => {
    onSectionsChange(
      sections.map((sec) => (sec.id === id ? { ...sec, heading } : sec))
    );
  };

  const handleUpdateContent = (id: string, content: string) => {
    onSectionsChange(
      sections.map((sec) => (sec.id === id ? { ...sec, content } : sec))
    );
  };

  const handleAddSection = () => {
    const newSec: AcademicDocumentSection = {
      id: `sec-${Date.now()}`,
      heading: `${sections.length + 1}. New Academic Section`,
      content: 'Enter section content here...',
      studentVoicePoints: [],
      aiEnhanced: false
    };
    onSectionsChange([...sections, newSec]);
    setEditingSectionId(newSec.id);
  };

  const handleDeleteSection = (id: string) => {
    onSectionsChange(sections.filter((sec) => sec.id !== id));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= sections.length) return;

    const copy = [...sections];
    const temp = copy[index];
    copy[index] = copy[newIdx];
    copy[newIdx] = temp;
    onSectionsChange(copy);
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-bold uppercase tracking-wider">Document Title</span>
          <span className="font-mono font-semibold text-amber-600 dark:text-amber-400">
            Total {actualWordCount} words
          </span>
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-amber-400 focus:outline-hidden pb-1"
        />
      </div>

      {/* Distinction Explainer Banner */}
      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <Quote className="w-3.5 h-3.5 text-amber-600" />
          <span>
            <strong>Attribution Notice:</strong> Spoken student ideas are highlighted in amber callouts. Academic framing and literature synthesis are organized in the main body.
          </span>
        </div>
        <button
          type="button"
          onClick={handleAddSection}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Section</span>
        </button>
      </div>

      {/* Sections List */}
      <div className="space-y-4">
        {sections.map((sec, idx) => (
          <div
            key={sec.id}
            className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3.5 shadow-2xs"
          >
            {/* Section Header Controls */}
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <input
                type="text"
                value={sec.heading}
                onChange={(e) => handleUpdateHeading(sec.id, e.target.value)}
                className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white bg-transparent flex-1 focus:outline-hidden focus:border-b focus:border-amber-400"
              />

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleMove(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30"
                  title="Move section up"
                >
                  <MoveUp className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleMove(idx, 'down')}
                  disabled={idx === sections.length - 1}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30"
                  title="Move section down"
                >
                  <MoveDown className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteSection(sec.id)}
                  className="p-1 rounded-md text-slate-400 hover:text-rose-600 ml-1"
                  title="Delete section"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Student Spoken Ideas Highlight Callout */}
            {sec.studentVoicePoints && sec.studentVoicePoints.length > 0 && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  <Quote className="w-3 h-3" />
                  <span>Student Voice Input Preserved in this section:</span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-[11px] leading-relaxed">
                  {sec.studentVoicePoints.map((pt, pIdx) => (
                    <li key={pIdx}>{pt}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Editable Content */}
            <textarea
              value={sec.content}
              onChange={(e) => handleUpdateContent(sec.id, e.target.value)}
              rows={Math.max(4, Math.ceil((sec.content || '').length / 90))}
              className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-amber-400 leading-relaxed font-sans"
            />
          </div>
        ))}
      </div>

      {/* TVET PoE & OHS Compliance Banner (if TVET mode) */}
      {educationSector === 'tvet' && (
        <div className="p-5 rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                TVET Portfolio of Evidence (PoE) & OHS Compliance
              </h4>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-600 text-white font-bold">
              OHS ACT 85 OF 1993
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            This project report incorporates formal workshop equipment inspection, risk mitigation checks, and step-by-step practical logs.
            When exported to PDF, an Assessor Verification & College Stamp Box is generated automatically.
          </p>

          {tvetCompliance?.workshopEquipment && (
            <div className="text-xs text-slate-600 dark:text-slate-400 pt-1">
              <strong>Verified Equipment Logged:</strong>{' '}
              {tvetCompliance.workshopEquipment.join(', ')}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
