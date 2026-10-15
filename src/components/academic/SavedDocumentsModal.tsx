/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Nexovia Academic Voice - Saved Documents Library Modal
 */

import React, { useState } from 'react';
import {
  X,
  FileText,
  Trash2,
  Edit2,
  Download,
  Calendar,
  Building2,
  GraduationCap,
  Briefcase,
  Search,
  Check,
  FolderOpen
} from 'lucide-react';
import { AcademicDocument } from '../../types/academicVoice';
import { generateAcademicPdf } from '../../services/academic/academicPdfGenerator';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  documents: AcademicDocument[];
  onOpenDocument: (doc: AcademicDocument) => void;
  onDeleteDocument: (id: string) => void;
  onRenameDocument: (id: string, newTitle: string) => void;
}

export const SavedDocumentsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  documents,
  onOpenDocument,
  onDeleteDocument,
  onRenameDocument
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  if (!isOpen) return null;

  const filtered = documents.filter((doc) => {
    const q = searchTerm.toLowerCase();
    return (
      doc.title.toLowerCase().includes(q) ||
      doc.institution.toLowerCase().includes(q) ||
      doc.moduleCode.toLowerCase().includes(q) ||
      doc.moduleTitle.toLowerCase().includes(q)
    );
  });

  const handleStartRename = (doc: AcademicDocument) => {
    setEditingId(doc.id);
    setEditTitle(doc.title);
  };

  const handleSaveRename = (id: string) => {
    if (editTitle.trim()) {
      onRenameDocument(id, editTitle.trim());
    }
    setEditingId(null);
  };

  const handleDirectDownload = (doc: AcademicDocument) => {
    const { download } = generateAcademicPdf(doc);
    download();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-3xl max-h-[85vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Saved Academic Documents
              </h3>
              <p className="text-xs text-slate-400">
                {documents.length} document{documents.length === 1 ? '' : 's'} saved to your account
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, institution, or module code..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:border-amber-400"
            />
          </div>
        </div>

        {/* Documents List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No academic documents found. Record or transcribe voice notes to generate your first document.
            </div>
          ) : (
            filtered.map((doc) => {
              const isTvet = doc.educationSector === 'tvet';

              return (
                <div
                  key={doc.id}
                  className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-amber-400/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isTvet
                            ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900'
                            : 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-900'
                        }`}
                      >
                        {isTvet ? 'TVET College' : 'University'}
                      </span>

                      {doc.moduleCode && (
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold">
                          {doc.moduleCode}
                        </span>
                      )}

                      <span className="text-[10px] text-slate-400">
                        {doc.actualWordCount || 0} words
                      </span>
                    </div>

                    {editingId === doc.id ? (
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-amber-400 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveRename(doc.id)}
                          className="p-1 text-emerald-600 hover:text-emerald-700"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                        {doc.title}
                      </h4>
                    )}

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                      <span>{doc.institution}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{doc.submissionDate || (doc.createdAt || '').split('T')[0]}</span>
                      </span>
                      {doc.exportedPdfCount > 0 && (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                          Exported {doc.exportedPdfCount}x
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        onOpenDocument(doc);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-2xs transition-all active:scale-95"
                    >
                      Open in Editor
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDirectDownload(doc)}
                      className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStartRename(doc)}
                      className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                      title="Rename document"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteDocument(doc.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600"
                      title="Delete document"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
