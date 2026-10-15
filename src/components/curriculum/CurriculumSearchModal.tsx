import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  BookOpen,
  ArrowRight,
  Filter,
  CheckCircle2,
  Sparkles,
  Info,
  Layers,
  GraduationCap
} from 'lucide-react';
import { curriculumEngine } from '../../services/curriculum/curriculumEngine';
import { CurriculumSearchResult } from '../../types/curriculum';
import { useLearning } from '../../context/LearningContext';
import { SOURCE_CLASSIFICATION_INFO } from '../../config/curriculumConfig';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (result: CurriculumSearchResult) => void;
}

export const CurriculumSearchModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelectResult
}) => {
  const { adaptiveProfile } = useLearning();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<string>('all');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');

  const grades = curriculumEngine.getGradeLevels();

  // Create mastery map from Phase 5
  const masteryMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const [topic, m] of Object.entries(adaptiveProfile.topicMasteries)) {
      map[topic] = m.masteryScore;
    }
    return map;
  }, [adaptiveProfile.topicMasteries]);

  // Execute search
  const results = useMemo(() => {
    if (!searchTerm.trim() && selectedGradeFilter === 'all' && selectedSubjectFilter === 'all') {
      return [];
    }

    return curriculumEngine.search(
      {
        keyword: searchTerm,
        gradeId: selectedGradeFilter === 'all' ? undefined : selectedGradeFilter,
        subjectId: selectedSubjectFilter === 'all' ? undefined : selectedSubjectFilter
      },
      masteryMap
    );
  }, [searchTerm, selectedGradeFilter, selectedSubjectFilter, masteryMap]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header & Search Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-slate-900 dark:text-white text-base">
                  Search CAPS Curriculum
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Search topics, lessons, and concepts across Grade R–12
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

          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="e.g. fractions, algebra, Newton's laws, vectors, integers..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              autoFocus
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
              <Filter className="w-3 h-3" />
              <span>Filters:</span>
            </span>

            <select
              value={selectedGradeFilter}
              onChange={(e) => setSelectedGradeFilter(e.target.value)}
              className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
            >
              <option value="all">All Grades (R–12)</option>
              {grades.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name} ({g.phaseName})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-2.5">
          {results.length > 0 ? (
            results.map((res) => {
              const badgeInfo = SOURCE_CLASSIFICATION_INFO[res.sourceClassification];

              return (
                <div
                  key={`${res.type}-${res.id}`}
                  onClick={() => {
                    onSelectResult(res);
                    onClose();
                  }}
                  className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      <span className="font-bold text-amber-600 dark:text-amber-400">
                        {res.gradeName}
                      </span>
                      <span>·</span>
                      <span>{res.subjectName}</span>
                      <span>·</span>
                      <span>Term {res.termNumber}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${badgeInfo.badgeColor}`}>
                        {badgeInfo.label}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {res.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1">
                      {res.matchSnippet}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-3">
                    {res.masteryScore !== undefined && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        Mastery: {res.masteryScore}%
                      </span>
                    )}

                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-amber-400 group-hover:text-slate-950 text-slate-400 flex items-center justify-center transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })
          ) : searchTerm.trim() ? (
            <div className="text-center py-10 space-y-2">
              <Info className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No curriculum results found for "{searchTerm}"
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Try searching for related concepts like "algebra", "fractions", "Newton", "vectors", or select a specific Grade filter.
              </p>
            </div>
          ) : (
            <div className="text-center py-10 space-y-2 text-xs text-slate-400">
              <Search className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-1" />
              <p className="font-medium text-slate-600 dark:text-slate-400">
                Type keywords above to search all South African CAPS topics & lessons
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
                {['Algebra', 'Fractions', 'Quadratic', 'Newton', 'Integers', 'Vectors'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchTerm(term)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-slate-600 dark:text-slate-300 text-xs transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
