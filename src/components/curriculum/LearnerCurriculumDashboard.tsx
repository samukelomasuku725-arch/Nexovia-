import React from 'react';
import {
  School,
  BookOpen,
  CheckCircle2,
  Clock,
  Compass,
  Zap,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Calendar,
  Layers,
  ChevronRight,
  Sparkles,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { curriculumEngine } from '../../services/curriculum/curriculumEngine';

interface Props {
  selectedGradeId: string;
  onSelectGrade: (gradeId: string) => void;
  onSelectSubject: (subjectId: string) => void;
  onOpenLesson: (lessonId: string) => void;
}

export const LearnerCurriculumDashboard: React.FC<Props> = ({
  selectedGradeId,
  onSelectGrade,
  onSelectSubject,
  onOpenLesson
}) => {
  const {
    adaptiveProfile,
    userProgress,
    setCurrentTab,
    learningContext,
    sendMessageToTutor
  } = useLearning();

  const currentGrade = curriculumEngine.getGradeById(selectedGradeId) || curriculumEngine.getGradeLevels()[10];
  const gradeSubjects = curriculumEngine.getSubjectsForGrade(currentGrade.id);

  const {
    nextBestLesson,
    weakAreas,
    strongAreas,
    overallStats
  } = adaptiveProfile;

  return (
    <div className="space-y-6">
      {/* 1. Grade & Phase Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 text-white border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
            <School className="w-4 h-4" />
            <span>{currentGrade.phaseName} · National CAPS Curriculum</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold">
            {currentGrade.name} Academic Roadmap
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            {currentGrade.description}
          </p>
        </div>

        {/* Grade Switcher */}
        <div className="shrink-0 flex items-center gap-2">
          <label htmlFor="grade-select" className="text-xs text-slate-400">
            Switch Grade:
          </label>
          <select
            id="grade-select"
            value={selectedGradeId}
            onChange={(e) => onSelectGrade(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {curriculumEngine.getGradeLevels().map((g) => (
              <option key={g.id} value={g.id}>
                {g.name} ({g.phaseName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. Priority Next Lesson & Needs Practice from Phase 5 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Next Best Lesson Card */}
        {nextBestLesson && (
          <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-950/20 flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  Adaptive Recommendation
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{nextBestLesson.durationMinutes} min</span>
                </span>
              </div>

              <div>
                <h4 className="font-display font-bold text-slate-900 dark:text-white text-base">
                  {nextBestLesson.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  {nextBestLesson.subject} · {nextBestLesson.topic}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200/80 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300">
                <span className="font-bold">Reason: </span>
                {nextBestLesson.reason}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-amber-200/60 dark:border-amber-900/40">
              <span className="text-[11px] text-slate-500">
                Priority: {nextBestLesson.priorityLabel}
              </span>
              <button
                onClick={() => onOpenLesson(nextBestLesson.lessonId)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs shadow-xs transition-transform active:scale-95"
              >
                <span>Continue Lesson</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Needs Practice Highlight */}
        <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500" />
                <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm">
                  Curriculum Units Needing Practice
                </h4>
              </div>
              <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">
                {weakAreas.length} Alert{weakAreas.length !== 1 ? 's' : ''}
              </span>
            </div>

            {weakAreas.length > 0 ? (
              <div className="space-y-2.5">
                {weakAreas.slice(0, 2).map((item) => (
                  <div
                    key={item.topic}
                    className="p-3 rounded-xl border border-rose-100 dark:border-rose-950/60 bg-rose-50/40 dark:bg-rose-950/20 flex items-center justify-between gap-2"
                  >
                    <div>
                      <span className="font-bold text-xs text-slate-900 dark:text-white block">
                        {item.topic}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {item.subject} · Mastery: {item.masteryScore}%
                      </span>
                    </div>

                    <button
                      onClick={() => setCurrentTab('adaptive')}
                      className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg text-xs"
                    >
                      Reinforce
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-4 text-center text-xs text-slate-400">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
                <span>All tested units are currently at 60%+ mastery!</span>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-500">Overall Progress: {overallStats.overallProgressPercent}%</span>
            <button
              onClick={() => setCurrentTab('adaptive')}
              className="text-amber-600 dark:text-amber-400 font-semibold hover:underline flex items-center gap-1"
            >
              <span>View Full Adaptive Report</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. My Subjects Grid for this Grade */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-bold text-slate-900 dark:text-white text-base">
            Curriculum Subjects ({gradeSubjects.length})
          </h3>
          <span className="text-xs text-slate-400">
            Terms 1–4 Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {gradeSubjects.map((subj) => {
            const totalTopics = subj.terms.reduce((acc, t) => acc + t.topics.length, 0);

            return (
              <div
                key={subj.id}
                onClick={() => onSelectSubject(subj.id)}
                className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-mono text-[10px] font-bold text-amber-600 dark:text-amber-400">
                      {subj.code}
                    </span>
                    <span>{subj.category}</span>
                  </div>

                  <h4 className="font-display font-bold text-slate-900 dark:text-white text-base group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {subj.name}
                  </h4>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {subj.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">
                    {totalTopics} Structured Units
                  </span>
                  <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Open Syllabus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
