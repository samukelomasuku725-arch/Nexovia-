/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Nexovian Academic Voice - Editable Transcript Review
 */

import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Copy,
  Check,
  AlignLeft,
  Volume2
} from 'lucide-react';

interface Props {
  transcript: string;
  onTranscriptChange: (text: string) => void;
  isTranscribing: boolean;
  transcriptionError: string | null;
  onRetryTranscription: () => void;
  language: string;
}

export const TranscriptEditor: React.FC<Props> = ({
  transcript,
  onTranscriptChange,
  isTranscribing,
  transcriptionError,
  onRetryTranscription,
  language
}) => {
  const [copied, setCopied] = useState(false);

  const wordCount = transcript.trim() ? transcript.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = transcript.length;

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Capitalize sentences and clean up double spaces
  const handleFormatClean = () => {
    let clean = transcript
      .replace(/\s+/g, ' ')
      .replace(/([.?!])\s*([a-z])/g, (_match, p1, p2) => `${p1} ${p2.toUpperCase()}`)
      .trim();

    // Auto capitalize first letter
    if (clean.length > 0) {
      clean = clean.charAt(0).toUpperCase() + clean.slice(1);
    }
    onTranscriptChange(clean);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-amber-500" />
              <span>Step 2: Review & Edit Voice Transcript</span>
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 font-bold uppercase">
              {language.toUpperCase()}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Review the captured transcript below. You can correct any misheard technical terms, add missing numbers, or adjust paragraphs before academic synthesis.
          </p>
        </div>

        {/* Word count & utility buttons */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {wordCount} Words · {charCount} Chars
          </span>

          <button
            type="button"
            onClick={handleFormatClean}
            disabled={!transcript.trim()}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            title="Clean formatting and punctuation"
          >
            <AlignLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleCopy}
            disabled={!transcript.trim()}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            title="Copy transcript text"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Loading state indicator */}
      {isTranscribing && (
        <div className="p-8 rounded-2xl border border-amber-300 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 text-center space-y-3">
          <div className="w-10 h-10 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center animate-spin">
            <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Transcribing Spoken Speech with Multimodal AI...
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Organizing paragraphs, preserving South African technical terminology, and checking dialect nuances.
            </p>
          </div>
        </div>
      )}

      {/* Transcription Failure Warning Banner */}
      {transcriptionError && !isTranscribing && (
        <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200 text-xs space-y-2">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold">Transcription Service Alert:</strong>
              <span>{transcriptionError}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={onRetryTranscription}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 text-white font-semibold text-xs hover:bg-rose-500 transition-colors shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Transcription</span>
            </button>
            <span className="text-[11px] text-slate-500">
              Or type your notes directly in the box below.
            </span>
          </div>
        </div>
      )}

      {/* Editable Transcript Textarea */}
      {!isTranscribing && (
        <div className="relative">
          <textarea
            value={transcript}
            onChange={(e) => onTranscriptChange(e.target.value)}
            placeholder="Your transcribed spoken speech will appear here. You can also paste or type your raw assignment thoughts directly..."
            rows={8}
            className="w-full p-4 text-xs sm:text-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-amber-400 leading-relaxed font-sans resize-y shadow-2xs"
          />

          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span>
              💡 Tip: Include your core hypothesis, experimental findings, or TVET workshop steps.
            </span>
            <span>
              {wordCount >= 20 ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Academic Structuring
                </span>
              ) : (
                <span className="text-amber-600">Minimum 20 words suggested</span>
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
