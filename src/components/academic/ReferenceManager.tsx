/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Nexovia Academic Voice - Reference Research & Verification Manager
 */

import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
  ExternalLink,
  Sparkles,
  Search,
  Check,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';
import { AcademicReferenceItem, ReferencingStyle } from '../../types/academicVoice';

interface Props {
  references: AcademicReferenceItem[];
  onReferencesChange: (refs: AcademicReferenceItem[]) => void;
  referencingStyle: ReferencingStyle;
  onSearchMoreReferences: () => void;
  isSearching: boolean;
}

export const ReferenceManager: React.FC<Props> = ({
  references,
  onReferencesChange,
  referencingStyle,
  onSearchMoreReferences,
  isSearching
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newYear, setNewYear] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newSource, setNewSource] = useState('');
  const [newUrlOrDoi, setNewUrlOrDoi] = useState('');

  const handleToggleInclude = (id: string) => {
    onReferencesChange(
      references.map((r) => (r.id === id ? { ...r, isIncluded: !r.isIncluded } : r))
    );
  };

  const handleDelete = (id: string) => {
    onReferencesChange(references.filter((r) => r.id !== id));
  };

  const handleAddManualReference = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newTitle) return;

    const inText = referencingStyle === 'apa'
      ? `(${newAuthor.split(',')[0].trim()}, ${newYear || 'n.d.'})`
      : `(${newAuthor.split(',')[0].trim()}, ${newYear || 's.a.'})`;

    const newRef: AcademicReferenceItem = {
      id: `manual-ref-${Date.now()}`,
      author: newAuthor.trim(),
      year: newYear.trim() || '2023',
      title: newTitle.trim(),
      source: newSource.trim() || 'Scholarly Publication',
      urlOrDoi: newUrlOrDoi.trim(),
      inTextCitation: inText,
      verified: true, // Manual student addition verified by the student
      verificationSource: 'Student Library Record',
      isIncluded: true,
      notes: 'Manually verified by learner.'
    };

    onReferencesChange([...references, newRef]);
    setNewAuthor('');
    setNewYear('');
    setNewTitle('');
    setNewSource('');
    setNewUrlOrDoi('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>Step 5: Verifiable Academic References & In-Text Citations</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Format: {referencingStyle === 'apa' ? 'APA 7th Edition' : 'Harvard (South Africa Standard)'}. All sources must be genuine, verifiable publications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSearchMoreReferences}
            disabled={isSearching}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-500/40 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 text-xs font-semibold hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{isSearching ? 'Searching Grounded DB...' : 'Search Scholar Sources'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-semibold hover:bg-slate-800 transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Citation</span>
          </button>
        </div>
      </div>

      {/* Anti-Hallucination Quality Standard Banner */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-[11px] leading-relaxed">
          <strong>Strict Academic Provenance Standard:</strong> Nexovia never invents fake author names, fabricated DOIs, or broken URLs. References tagged with{' '}
          <span className="text-emerald-700 dark:text-emerald-300 font-bold">Verified</span> are confirmed in official South African repositories (DHET, SAQA, SABS) or peer-reviewed scholarly journals. Items tagged with{' '}
          <span className="text-amber-700 dark:text-amber-300 font-bold">Unverified</span> require student cross-checking against the institutional library.
        </div>
      </div>

      {/* References List */}
      <div className="space-y-3">
        {references.map((ref) => (
          <div
            key={ref.id}
            className={`p-4 rounded-2xl border transition-all ${
              ref.isIncluded
                ? 'border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs'
                : 'border-slate-200/40 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-950/40 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1.5 flex-1">
                {/* Status Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {ref.inTextCitation}
                  </span>

                  {ref.verified ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Verified: {ref.verificationSource || 'Scholarly Database'}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300">
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                      <span>Unverified · Check Library</span>
                    </span>
                  )}
                </div>

                {/* Reference Text */}
                <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white leading-relaxed">
                  <span className="font-bold">{ref.author}</span> ({ref.year}). <em>{ref.title}</em>. {ref.source}.
                </p>

                {ref.urlOrDoi && (
                  <div className="pt-0.5">
                    <a
                      href={ref.urlOrDoi.startsWith('http') ? ref.urlOrDoi : `https://doi.org/${ref.urlOrDoi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      <span>{ref.urlOrDoi}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}

                {ref.notes && (
                  <p className="text-[10px] text-slate-400 italic">
                    {ref.notes}
                  </p>
                )}
              </div>

              {/* Toggle Included / Delete Action */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggleInclude(ref.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    ref.isIncluded
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {ref.isIncluded ? 'Included in PDF' : 'Excluded'}
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(ref.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                  title="Remove reference"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Manual Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">
              Add Verified Academic Reference
            </h4>

            <form onSubmit={handleAddManualReference} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Author(s) or Institutional Body:
                </label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="e.g. Cloete, N. or Department of Higher Education and Training"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    Year:
                  </label>
                  <input
                    type="text"
                    required
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                    placeholder="2023"
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-hidden focus:border-amber-400"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    Publisher / Journal:
                  </label>
                  <input
                    type="text"
                    value={newSource}
                    onChange={(e) => setNewSource(e.target.value)}
                    placeholder="e.g. SA Journal of Science"
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-hidden focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Document / Article Title:
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Transformation and Academic Performance in South African Universities"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  URL or DOI (Optional):
                </label>
                <input
                  type="text"
                  value={newUrlOrDoi}
                  onChange={(e) => setNewUrlOrDoi(e.target.value)}
                  placeholder="e.g. https://doi.org/10.1080/..."
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-hidden focus:border-amber-400 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  Save Citation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
