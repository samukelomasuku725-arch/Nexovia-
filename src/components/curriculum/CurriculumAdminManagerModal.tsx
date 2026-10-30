import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  FileCheck2,
  Layers,
  Sparkles,
  Sliders,
  Check,
  AlertTriangle,
  RotateCcw,
  Globe,
  Tag,
  BookOpen,
  Eye,
  Plus
} from 'lucide-react';
import { curriculumEngine } from '../../services/curriculum/curriculumEngine';
import { ContentStatus, SourceClassification, SubjectModel } from '../../types/curriculum';
import { SOURCE_CLASSIFICATION_INFO } from '../../config/curriculumConfig';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  canManage: boolean;
}

export const CurriculumAdminManagerModal: React.FC<Props> = ({
  isOpen,
  onClose,
  canManage
}) => {
  const curricula = curriculumEngine.getAvailableCurricula();
  const phases = curriculumEngine.getPhases();
  const grades = curriculumEngine.getGradeLevels();

  const [activeTab, setActiveTab] = useState<'versions' | 'sources' | 'status' | 'translations'>('versions');
  const [selectedCurriculumId, setSelectedCurriculumId] = useState<string>(curricula[0]?.id || 'caps-sa-2024');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-slate-900 dark:text-white text-base">
                  Curriculum Governance & Administration
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                  Educator / Admin
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage curriculum versions, source verification, publication states, and 11-language translations
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-5 pt-3 border-b border-slate-100 dark:border-slate-800 flex gap-2">
          {[
            { id: 'versions' as const, label: 'Curriculum Versions' },
            { id: 'sources' as const, label: 'Source Provenance' },
            { id: 'status' as const, label: 'Publication States' },
            { id: 'translations' as const, label: 'Language Coverage' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs">
          {/* Tab 1: Versions */}
          {activeTab === 'versions' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/40 text-slate-700 dark:text-slate-300">
                <strong>Curriculum Versioning Policy: </strong>
                Nexovian supports multiple active curriculum standards (e.g. CAPS Standard vs CAPS Coding & Robotics Preview). Learners always remain linked to their selected version without silent data overwrites.
              </div>

              <div className="space-y-2.5">
                {curricula.map((curr) => (
                  <div
                    key={curr.id}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">
                          {curr.name}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          v{curr.version}
                        </span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                            curr.status === 'PUBLISHED'
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                              : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                          }`}
                        >
                          {curr.status}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-snug">
                        {curr.description}
                      </p>
                      <span className="text-[11px] text-slate-400 block pt-0.5">
                        Code: {curr.code} · Created: {new Date(curr.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <span className="shrink-0 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                      {curr.status === 'PUBLISHED' ? 'Active' : 'Preview'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Sources */}
          {activeTab === 'sources' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                <strong>Source Classification Framework: </strong>
                All educational items must possess clear provenance. Unverified AI-generated or demonstration items are strictly labeled to avoid false claims of official accreditation.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(Object.keys(SOURCE_CLASSIFICATION_INFO) as SourceClassification[]).map((key) => {
                  const info = SOURCE_CLASSIFICATION_INFO[key];
                  return (
                    <div
                      key={key}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${info.badgeColor}`}>
                          {info.label}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 uppercase">{key}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                        {info.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 3: Statuses */}
          {activeTab === 'status' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-amber-900 dark:text-amber-300">
                <strong>Publication Visibility Guard: </strong>
                Learners only have access to items marked <span className="font-bold">PUBLISHED</span>. Draft units are retained in the editor pipeline for pedagogical review.
              </div>

              <div className="space-y-2">
                {[
                  {
                    status: 'PUBLISHED' as const,
                    badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
                    desc: 'Fully vetted, verified for accuracy, and visible to all registered learners across School, TVET, and University pathways.'
                  },
                  {
                    status: 'DRAFT' as const,
                    badge: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
                    desc: 'Under active lesson development or curriculum alignment review. Hidden from normal student accounts.'
                  },
                  {
                    status: 'ARCHIVED' as const,
                    badge: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
                    desc: 'Superseded curriculum versions retained for historic student transcripts and certificate verification.'
                  }
                ].map((item) => (
                  <div
                    key={item.status}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-3"
                  >
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase shrink-0 ${item.badge}`}>
                      {item.status}
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Translations */}
          {activeTab === 'translations' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 text-blue-900 dark:text-blue-300">
                <strong>11 Official South African Languages Matrix: </strong>
                Nexovian never duplicates structural trees. Lessons have an English master text with registered translation states. Unauthored translations dynamically leverage Socratic AI translation with clear provenance.
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { code: 'en', name: 'English', status: 'Primary Master' },
                  { code: 'af', name: 'Afrikaans', status: 'Core Available' },
                  { code: 'zu', name: 'isiZulu', status: 'Core Available' },
                  { code: 'xh', name: 'isiXhosa', status: 'Core Available' },
                  { code: 'nso', name: 'Sepedi', status: 'AI Assisted' },
                  { code: 'st', name: 'Sesotho', status: 'AI Assisted' },
                  { code: 'tn', name: 'Setswana', status: 'AI Assisted' },
                  { code: 'ss', name: 'siSwati', status: 'AI Assisted' },
                  { code: 'nr', name: 'isiNdebele', status: 'AI Assisted' },
                  { code: 've', name: 'Tshivenda', status: 'AI Assisted' },
                  { code: 'ts', name: 'Xitsonga', status: 'AI Assisted' }
                ].map((lang) => (
                  <div
                    key={lang.code}
                    className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">{lang.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{lang.code.toUpperCase()}</span>
                    </div>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        lang.status === 'Primary Master'
                          ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300'
                          : lang.status === 'Core Available'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {lang.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Nexovian Academy Content Engine v6.1</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-xs"
          >
            Close Manager
          </button>
        </div>
      </div>
    </div>
  );
};
