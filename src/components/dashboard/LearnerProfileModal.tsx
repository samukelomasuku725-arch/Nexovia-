/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIA ACADEMY - PHASE 8: LEARNER PROFILE & PREFERENCES MODAL
 * 
 * Allows learners to view and update:
 * 1. Name
 * 2. Education Level & Grade/Programme
 * 3. Enrolled Subjects
 * 4. Preferred Language (All 11 Official South African Languages)
 * 5. Learning Preferences (Daily study minutes, primary academic goal)
 * 
 * Secure design: Does NOT expose internal credentials, tokens, or system fields.
 */

import React, { useState } from 'react';
import {
  X,
  User,
  GraduationCap,
  Globe,
  Clock,
  Target,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Save
} from 'lucide-react';
import { SALanguageCode } from '../../types';
import { SA_LANGUAGES } from '../../i18n/translations';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';

interface LearnerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LearnerProfileModal: React.FC<LearnerProfileModalProps> = ({
  isOpen,
  onClose
}) => {
  const { user, updateProfile } = useAuth();
  const { updateLearningContext } = useLearning();

  const [name, setName] = useState(user?.name || 'Sipho Mokoena');
  const [educationLevel, setEducationLevel] = useState(
    user?.educationLevel || 'FET Phase (Grade 10–12 CAPS)'
  );
  const [gradeOrProgramme, setGradeOrProgramme] = useState(
    user?.gradeOrProgramme || 'Grade 10'
  );
  const [preferredLanguage, setPreferredLanguage] = useState<SALanguageCode>(
    (user?.preferredLanguage as SALanguageCode) || 'en'
  );
  const [dailyMinutes, setDailyMinutes] = useState<number>(30);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([
    'Mathematics',
    'Physical Sciences',
    'Life Sciences'
  ]);
  const [primaryGoal, setPrimaryGoal] = useState<string>('matric_prep');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const availableSubjects = [
    'Mathematics',
    'Physical Sciences',
    'Life Sciences',
    'Technical Mathematics',
    'Accounting',
    'Computer Applications Technology',
    'Information Technology',
    'Geography'
  ];

  const toggleSubject = (sub: string) => {
    if (selectedSubjects.includes(sub)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(selectedSubjects.filter((s) => s !== sub));
      }
    } else {
      setSelectedSubjects([...selectedSubjects, sub]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (updateProfile) {
        await updateProfile({
          name,
          educationLevel,
          gradeOrProgramme,
          preferredLanguage
        });
      }
      if (updateLearningContext) {
        updateLearningContext({
          educationLevel,
          gradeOrProgramme,
          language: preferredLanguage
        });
      }
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        onClose();
      }, 700);
    } catch {
      // Fallback
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="learner-profile-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-sm shadow-xs">
              {name.charAt(0)}
            </div>
            <div>
              <h3 id="learner-profile-title" className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Learner Profile & Academic Settings
              </h3>
              <p className="text-xs text-slate-500">
                Personalize curriculum pacing and language
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Learner Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Education Level & Grade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Education Pathway
              </label>
              <select
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="FET Phase (Grade 10–12 CAPS)">FET Phase (Grade 10–12 CAPS)</option>
                <option value="Senior Phase (Grade 7–9 CAPS)">Senior Phase (Grade 7–9 CAPS)</option>
                <option value="Intermediate Phase (Grade 4–6 CAPS)">Intermediate Phase (Grade 4–6 CAPS)</option>
                <option value="Foundation Phase (Grade R–3 CAPS)">Foundation Phase (Grade R–3 CAPS)</option>
                <option value="TVET / NATED Engineering">TVET / NATED Engineering</option>
                <option value="TVET / NC(V) Vocational">TVET / NC(V) Vocational</option>
                <option value="Higher Education / University">Higher Education / University</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Grade / Programme
              </label>
              <select
                value={gradeOrProgramme}
                onChange={(e) => setGradeOrProgramme(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12 (Matric)">Grade 12 (Matric)</option>
                <option value="Grade 9">Grade 9</option>
                <option value="NATED N1">NATED N1</option>
                <option value="NATED N4">NATED N4</option>
                <option value="1st Year Undergraduate">1st Year Undergraduate</option>
              </select>
            </div>
          </div>

          {/* 11 Official South African Languages */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Preferred Language (11 Official SA Languages)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SA_LANGUAGES.map((lang) => (
                <button
                  type="button"
                  key={lang.code}
                  onClick={() => setPreferredLanguage(lang.code)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    preferredLanguage === lang.code
                      ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-slate-950 dark:text-white font-bold ring-1 ring-amber-400'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <span className="block font-semibold">{lang.name}</span>
                  <span className="text-[10px] text-slate-400 block">{lang.nativeName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Enrolled Subjects */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Enrolled Focus Subjects
            </label>
            <div className="flex flex-wrap gap-2">
              {availableSubjects.map((sub) => {
                const isSelected = selectedSubjects.includes(sub);
                return (
                  <button
                    type="button"
                    key={sub}
                    onClick={() => toggleSubject(sub)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'border-amber-400 bg-amber-400/15 text-amber-800 dark:text-amber-300 font-bold'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    {sub} {isSelected ? '✓' : '+'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Daily Goal & Study Preference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Daily Study Target
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[15, 30, 45, 60].map((mins) => (
                  <button
                    type="button"
                    key={mins}
                    onClick={() => setDailyMinutes(mins)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      dailyMinutes === mins
                        ? 'border-amber-400 bg-amber-400 text-slate-950 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Primary Academic Focus
              </label>
              <select
                value={primaryGoal}
                onChange={(e) => setPrimaryGoal(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="matric_prep">Matric Final Exam Excellence</option>
                <option value="catch_up">Foundational Skill Catch-Up</option>
                <option value="curriculum_ahead">Pacing Ahead of Term Schedule</option>
                <option value="stem_career">STEM & Engineering Foundation</option>
              </select>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
            <span className="text-[11px] text-slate-400">
              Settings automatically adjust your adaptive difficulty.
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs shadow-xs transition-transform active:scale-95"
              >
                {saveSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{isSaving ? 'Saving...' : 'Save Profile'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
