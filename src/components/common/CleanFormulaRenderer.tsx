import React from 'react';
import { parseAndCleanContent, TextBlockItem } from '../../utils/formulaCleaner';

interface CleanFormulaRendererProps {
  content: string;
  language?: string;
  className?: string;
}

export const CleanFormulaRenderer: React.FC<CleanFormulaRendererProps> = ({
  content,
  language = 'en',
  className = ''
}) => {
  if (!content) return null;

  const blocks: TextBlockItem[] = parseAndCleanContent(content, language);

  return (
    <div className={`space-y-4 ${className}`}>
      {blocks.map((block, idx) => {
        if (block.type === 'formula_box') {
          return (
            <div
              key={idx}
              className="my-4 rounded-2xl border-2 border-[#facc15] bg-[#1e293b] text-white p-4 sm:p-6 shadow-xl transition-all select-text"
            >
              {/* Language Formula Label Header (e.g. 📘 IFOMULA:) */}
              <div className="flex items-center justify-center gap-2 mb-3 text-xs sm:text-sm font-black text-[#facc15] uppercase tracking-widest border-b border-[#facc15]/20 pb-2">
                <span>{block.label || '📘 FORMULA:'}</span>
              </div>

              {/* Centered Large Bold Formula List */}
              <div className="flex flex-col items-center justify-center space-y-2 font-mono font-bold text-base sm:text-xl md:text-2xl text-center text-slate-100 tracking-wide">
                {(block.formulas && block.formulas.length > 0 ? block.formulas : [block.content]).map((formula, fIdx) => (
                  <div
                    key={fIdx}
                    className="w-full max-w-lg py-1.5 px-3 rounded-lg bg-[#0F172A]/70 border border-[#facc15]/30 text-center shadow-inner break-words"
                  >
                    {formula}
                  </div>
                ))}
              </div>
            </div>
          );
        }

        if (block.type === 'practice_box') {
          return (
            <div
              key={idx}
              className="my-3 p-4 rounded-2xl bg-slate-900 border border-slate-700/80 text-slate-100 shadow-md"
            >
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#facc15] mb-1.5">
                <span>🎯</span>
                <span>QUICK PRACTICE</span>
              </div>
              <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap text-slate-200">
                {block.content}
              </div>
            </div>
          );
        }

        // Standard text block with markdown styling
        return (
          <div
            key={idx}
            className="prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans text-slate-800 dark:text-slate-200"
          >
            {block.content}
          </div>
        );
      })}
    </div>
  );
};
