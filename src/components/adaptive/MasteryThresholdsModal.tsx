import React, { useState } from 'react';
import { X, Sliders, RotateCcw, Check, Info, ShieldCheck } from 'lucide-react';
import { DEFAULT_MASTERY_THRESHOLDS, MasteryThresholds } from '../../types/adaptive';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  thresholds: MasteryThresholds;
  onSave: (thresholds: MasteryThresholds) => void;
}

export const MasteryThresholdsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  thresholds,
  onSave
}) => {
  const [localThresholds, setLocalThresholds] = useState<MasteryThresholds>({ ...thresholds });
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleReset = () => {
    setLocalThresholds({ ...DEFAULT_MASTERY_THRESHOLDS });
    setError(null);
  };

  const handleSave = () => {
    const { needsSupportMax, developingMax, basicMax, strongMax } = localThresholds;

    if (
      needsSupportMax >= developingMax ||
      developingMax >= basicMax ||
      basicMax >= strongMax ||
      strongMax >= 100
    ) {
      setError('Thresholds must be strictly ascending: Needs Support < Developing < Basic < Strong < 100%.');
      return;
    }

    onSave({
      ...localThresholds,
      masteredMin: strongMax + 1
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-slate-900 dark:text-white text-base">
                Mastery Scale Thresholds
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Configure Nexovian's heuristic mastery progression bands
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

        {/* Content */}
        <div className="p-5 space-y-5 overflow-y-auto flex-1 text-sm">
          {/* Heuristic Disclaimer */}
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div>
              <span className="font-semibold block mb-0.5">Nexovian Learning Heuristic Notice</span>
              The mastery score is an internal adaptive metric calculated from practice accuracy, recent assessments, difficulty weighting, and spaced review. It is not an officially accredited CAPS or TVET examination mark.
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-xs text-rose-700 dark:text-rose-300">
              {error}
            </div>
          )}

          {/* Scale Sliders / Inputs */}
          <div className="space-y-4">
            {/* Needs Significant Support */}
            <div className="p-3.5 rounded-xl border border-rose-200/80 dark:border-rose-900/40 bg-rose-50/40 dark:bg-rose-950/20">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-rose-700 dark:text-rose-400 text-xs uppercase tracking-wider">
                  Needs Significant Support (0 – {localThresholds.needsSupportMax}%)
                </span>
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                  Cap: {localThresholds.needsSupportMax}%
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="50"
                value={localThresholds.needsSupportMax}
                onChange={(e) => {
                  setError(null);
                  setLocalThresholds((prev) => ({ ...prev, needsSupportMax: Number(e.target.value) }));
                }}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Triggers prerequisite reinforcement, foundational hints, and Socratic AI Tutor recommendations.
              </p>
            </div>

            {/* Developing */}
            <div className="p-3.5 rounded-xl border border-amber-200/80 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/20">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-amber-700 dark:text-amber-400 text-xs uppercase tracking-wider">
                  Developing ({localThresholds.needsSupportMax + 1} – {localThresholds.developingMax}%)
                </span>
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                  Cap: {localThresholds.developingMax}%
                </span>
              </div>
              <input
                type="range"
                min={localThresholds.needsSupportMax + 5}
                max="70"
                value={localThresholds.developingMax}
                onChange={(e) => {
                  setError(null);
                  setLocalThresholds((prev) => ({ ...prev, developingMax: Number(e.target.value) }));
                }}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Identified in "Needs Practice" section to reinforce core problem solving before exam readiness.
              </p>
            </div>

            {/* Basic Understanding */}
            <div className="p-3.5 rounded-xl border border-blue-200/80 dark:border-blue-900/40 bg-blue-50/40 dark:bg-blue-950/20">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-blue-700 dark:text-blue-400 text-xs uppercase tracking-wider">
                  Basic Understanding ({localThresholds.developingMax + 1} – {localThresholds.basicMax}%)
                </span>
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                  Cap: {localThresholds.basicMax}%
                </span>
              </div>
              <input
                type="range"
                min={localThresholds.developingMax + 5}
                max="85"
                value={localThresholds.basicMax}
                onChange={(e) => {
                  setError(null);
                  setLocalThresholds((prev) => ({ ...prev, basicMax: Number(e.target.value) }));
                }}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Standard application questions and medium difficulty quizzes.
              </p>
            </div>

            {/* Strong */}
            <div className="p-3.5 rounded-xl border border-emerald-200/80 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/20">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-emerald-700 dark:text-emerald-400 text-xs uppercase tracking-wider">
                  Strong ({localThresholds.basicMax + 1} – {localThresholds.strongMax}%)
                </span>
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                  Cap: {localThresholds.strongMax}%
                </span>
              </div>
              <input
                type="range"
                min={localThresholds.basicMax + 5}
                max="95"
                value={localThresholds.strongMax}
                onChange={(e) => {
                  setError(null);
                  setLocalThresholds((prev) => ({ ...prev, strongMax: Number(e.target.value) }));
                }}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Appears in "You're Doing Well" section with optional extension challenges.
              </p>
            </div>

            {/* Mastered */}
            <div className="p-3.5 rounded-xl border border-purple-200/80 dark:border-purple-900/40 bg-purple-50/40 dark:bg-purple-950/20">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-purple-700 dark:text-purple-400 text-xs uppercase tracking-wider">
                  Mastered ({localThresholds.strongMax + 1} – 100%)
                </span>
                <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">
                  {localThresholds.strongMax + 1}%+
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Concepts mastered for long-term retention. Spaced review intervals expand up to 18–21 days.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl shadow-xs transition-transform active:scale-95"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Apply Thresholds</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
