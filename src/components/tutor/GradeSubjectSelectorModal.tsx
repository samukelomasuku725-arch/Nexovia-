/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GRADE & SUBJECT SELECTOR MODAL (GRADE 4 TO UNIVERSITY)
 * Dark Gold Theme: #0a0a0a / #1a1a1a / #d4af37 / #fbbf24
 */

import React, { useState } from 'react';
import { X, Search, Check, GraduationCap, School, Briefcase } from 'lucide-react';
import { GRADE_OPTIONS, getSubjectsForGrade } from '../../data/gradesAndSubjectsData';

interface Props {
  isOpen: boolean;
  type: 'grade' | 'subject';
  currentGrade: string;
  currentSubject: string;
  onSelectGrade: (grade: string) => void;
  onSelectSubject: (subject: string) => void;
  onClose: () => void;
}

export const GradeSubjectSelectorModal: React.FC<Props> = ({
  isOpen,
  type,
  currentGrade,
  currentSubject,
  onSelectGrade,
  onSelectSubject,
  onClose
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const isGrade = type === 'grade';
  const availableItems: string[] = isGrade
    ? [...GRADE_OPTIONS]
    : getSubjectsForGrade(currentGrade);

  const filteredItems = availableItems.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase().trim())
  );

  const handleSelect = (item: string) => {
    const currentScrollY = window.scrollY;
    if (isGrade) {
      onSelectGrade(item);
    } else {
      onSelectSubject(item);
    }
    onClose();
    requestAnimationFrame(() => {
      window.scrollTo({ top: currentScrollY, behavior: 'instant' });
      setTimeout(() => window.scrollTo({ top: currentScrollY, behavior: 'instant' }), 50);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md max-h-[82vh] bg-[#141414] border-2 border-[#d4af37] rounded-3xl shadow-[0_0_35px_rgba(212,175,55,0.25)] flex flex-col overflow-hidden text-white">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#262626] flex items-center justify-between gap-3 bg-[#1a1a1a]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#d4af37]/20 border border-[#d4af37] text-[#fbbf24] flex items-center justify-center font-bold">
              {isGrade ? <School className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">
                {isGrade ? 'Choose Your Grade / Level' : `Choose Subject (${currentGrade})`}
              </h2>
              <p className="text-[11px] text-slate-400 font-mono">
                {isGrade ? 'Grade 4 to University' : `${availableItems.length} subjects available`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-[#262626] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input if subject list is long */}
        <div className="p-3 border-b border-[#262626] bg-[#111]">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search ${isGrade ? 'grade (e.g. 10, TVET, University)' : 'subject (e.g. Maths, Science, Accounting)'}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#1a1a1a] text-white text-xs placeholder-slate-500 pl-9 pr-4 py-2.5 rounded-xl border border-[#333] focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
            />
          </div>
        </div>

        {/* Scrollable List */}
        <div className="p-3 overflow-y-auto space-y-1 flex-1 font-sans">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 font-mono">
              No matching items found.
            </div>
          ) : (
            filteredItems.map((item) => {
              const isSelected = isGrade ? currentGrade === item : currentSubject === item;
              return (
                <button
                  key={item}
                  onClick={() => handleSelect(item)}
                  className={`w-full p-3 rounded-2xl border text-left text-xs font-semibold flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                    isSelected
                      ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#fbbf24] shadow-xs'
                      : 'border-transparent bg-[#18181b] hover:bg-[#222] text-slate-200 hover:text-white'
                  }`}
                >
                  <span className="truncate">{item}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#fbbf24] shrink-0" />}
                </button>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-[#262626] bg-[#1a1a1a] flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Active: <strong className="text-[#fbbf24]">{isGrade ? currentGrade : currentSubject}</strong></span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-[#262626] hover:bg-[#333] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
