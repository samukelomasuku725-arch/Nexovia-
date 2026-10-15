import React from 'react';
import { Flame, CheckCircle2, ChevronRight, Zap, Target } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export const DailyRoutineCard: React.FC = () => {
  const { userProgress, setCurrentTab } = useLearning();

  // Generate 7 days of the current week
  const today = new Date();
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Find Monday of the current week
  const currentDayIndex = (today.getDay() + 6) % 7; // 0 = Mon, 6 = Sun
  const monday = new Date(today);
  monday.setDate(today.getDate() - currentDayIndex);

  const weekDays = daysOfWeek.map((dayName, index) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + index);
    const dateStr = d.toISOString().split('T')[0];
    const isToday = index === currentDayIndex;
    const isCompleted = userProgress.learnedDays.includes(dateStr);
    return {
      name: dayName,
      dateNum: d.getDate(),
      dateStr,
      isToday,
      isCompleted
    };
  });

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm transition-colors">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                {userProgress.currentStreakDays} Day Streak
              </span>
              <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-0.5">
                <Zap className="w-3 h-3 fill-current" />
                1.5x XP Active
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span>Goal: 1 lesson / day</span>
              <span aria-hidden="true">·</span>
              <span>Total XP: {userProgress.totalXp}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setCurrentTab('practice')}
          className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/40 rounded-lg transition-colors"
        >
          <span>Daily Quiz</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 7-Day Scroller */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2 pt-1 pb-2">
        {weekDays.map((d) => (
          <div
            key={d.dateStr}
            className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl text-center transition-all ${
              d.isToday
                ? 'bg-amber-500 text-slate-950 font-bold ring-2 ring-amber-400/40 ring-offset-2 dark:ring-offset-slate-900'
                : d.isCompleted
                ? 'bg-amber-500/15 text-slate-900 dark:text-slate-100 border border-amber-500/30'
                : 'bg-slate-50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500'
            }`}
          >
            <span className="text-[10px] uppercase tracking-wider font-medium mb-1">
              {d.name}
            </span>
            <span className="text-sm tabular-nums font-semibold">
              {d.dateNum}
            </span>
            <div className="mt-1">
              {d.isCompleted ? (
                <CheckCircle2
                  className={`w-3.5 h-3.5 ${
                    d.isToday ? 'text-slate-950' : 'text-amber-500'
                  }`}
                />
              ) : (
                <span className="block w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile-only CTA */}
      <div className="sm:hidden mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 text-amber-500" />
          Complete today's quick review
        </span>
        <button
          onClick={() => setCurrentTab('practice')}
          className="px-2.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 rounded-md"
        >
          Start
        </button>
      </div>
    </div>
  );
};
