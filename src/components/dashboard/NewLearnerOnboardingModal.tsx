/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIA ACADEMY - PHASE 8: NEW LEARNER ONBOARDING WIZARD
 * 
 * Guides first-time learners through customizing their academic profile:
 * 1. Grade / Education Level Selection
 * 2. Focus Subjects Selection
 * 3. 11 South African Official Languages
 * 4. Daily Learning Goal (time commitment)
 */

import React, { useState } from 'react';
import {
  X,
  GraduationCap,
  BookOpen,
  Globe,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { SALanguageCode } from '../../types';
import { SA_LANGUAGES } from '../../i18n/translations';
import { useAuth } from '../../context/AuthContext';

interface NewLearnerOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const NewLearnerOnboardingModal: React.FC<NewLearnerOnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const { user, updateProfile } = useAuth();

  const [step, setStep] = useState<number>(1);
  const [educationLevel, setEducationLevel] = useState('FET Phase (Grade 10–12 CAPS)');
  const [gradeOrProgramme, setGradeOrProgramme] = useState('Grade 10');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([
    'Mathematics',
    'Physical Sciences'
  ]);
  const [preferredLanguage, setPreferredLanguage] = useState<SALanguageCode>('en');
  const [dailyMinutes, setDailyMinutes] = useState<number>(30);
  const [primaryGoal, setPrimaryGoal] = useState<'matric_exam' | 'topic_catchup' | 'curriculum_ahead' | 'tvet_career'>('matric_exam');

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

  const handleSave = async () => {
    try {
      await updateProfile({
        educationLevel,
        gradeOrProgramme,
        preferredLanguage
      });
    } catch {
      // Fallback
    }
    onComplete();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-wizard-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Wizard Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Step {step} of 3 · Personalize Nexovia
            </span>
            <h3 id="onboarding-wizard-title" className="font-display text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              Welcome to Nexovia Academy
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 pt-3 flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                step >= s ? 'bg-amber-400' : 'bg-slate-200 dark:bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Wizard Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Select Your Academic Phase & Grade
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Calibrates curriculum content to your specific South African framework.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Education Level
                </label>
                <select
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="FET Phase (Grade 10–12 CAPS)">FET Phase (Grade 10–12 CAPS)</option>
                  <option value="Senior Phase (Grade 7–9 CAPS)">Senior Phase (Grade 7–9 CAPS)</option>
                  <option value="Intermediate Phase (Grade 4–6 CAPS)">Intermediate Phase (Grade 4–6 CAPS)</option>
                  <option value="Foundation Phase (Grade R–3 CAPS)">Foundation Phase (Grade R–3 CAPS)</option>
                  <option value="TVET NATED (N1–N6)">TVET NATED (N1–N6)</option>
                  <option value="TVET NC(V) (Levels 2–4)">TVET NC(V) (Levels 2–4)</option>
                  <option value="Higher Education (University)">Higher Education (University)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Grade / Year Level
                </label>
                <select
                  value={gradeOrProgramme}
                  onChange={(e) => setGradeOrProgramme(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11">Grade 11</option>
                  <option value="Grade 12 / Matric">Grade 12 / Matric</option>
                  <option value="Grade 9">Grade 9</option>
                  <option value="NATED N4">NATED N4</option>
                  <option value="NC(V) Level 3">NC(V) Level 3</option>
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Choose Your Priority Subjects
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select at least 2 subjects to populate your initial dashboard.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {availableSubjects.map((sub) => {
                  const isSelected = selectedSubjects.includes(sub);
                  return (
                    <button
                      key={sub}
                      onClick={() => toggleSubject(sub)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-slate-900 dark:text-white'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{sub}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Preferred Language & Daily Goal
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  All 11 South African official languages are supported for AI tutoring.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Learning Language
                </label>
                <select
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value as SALanguageCode)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  {SA_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.name} ({l.nativeName})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Daily Study Goal
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[15, 30, 45, 60].map((mins) => (
                    <button
                      key={mins}
                      onClick={() => setDailyMinutes(mins)}
                      className={`p-2 rounded-xl text-xs font-bold text-center border transition-all ${
                        dailyMinutes === mins
                          ? 'border-amber-400 bg-amber-400 text-slate-950 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {mins}m / day
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Primary Learning Goal
                </label>
                <select
                  value={primaryGoal}
                  onChange={(e) => setPrimaryGoal(e.target.value as any)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="matric_exam">Prepare for Matric & Final Exams</option>
                  <option value="topic_catchup">Master Weak Topics & Catch Up</option>
                  <option value="curriculum_ahead">Learn Ahead of School Terms</option>
                  <option value="tvet_career">Practical Technical Career Skills</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl shadow-xs transition-transform active:scale-95"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl shadow-xs transition-transform active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch My Dashboard</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
