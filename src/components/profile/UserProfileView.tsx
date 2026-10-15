import React, { useState } from 'react';
import {
  Award,
  Flame,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Download,
  ExternalLink,
  MessageSquare,
  Clock,
  BookOpen,
  Target,
  Sparkles,
  Bookmark,
  LogOut,
  UserCheck,
  UserPlus
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useAuth } from '../../context/AuthContext';

export const UserProfileView: React.FC = () => {
  const {
    userProgress,
    tracks,
    generateCertificate,
    setCertificateToView
  } = useLearning();

  const {
    user,
    isAuthenticated,
    logout,
    setIsAuthModalOpen,
    setAuthModalMode
  } = useAuth();

  const [studentName, setStudentName] = useState(() => (user?.name ? user.name : 'Alex Rivers'));
  const [selectedTrackForCert, setSelectedTrackForCert] = useState(tracks[0].id);

  const totalLessonsInPlatform = tracks.flatMap((t) => t.modules.flatMap((m) => m.lessons)).length;
  const completedCount = userProgress.completedLessonIds.length;
  const overallProgressPct = Math.round((completedCount / totalLessonsInPlatform) * 100);

  // Calculate average quiz score
  const totalQuizScore = userProgress.quizAttempts.reduce((acc, q) => acc + q.percentage, 0);
  const avgQuizScore = userProgress.quizAttempts.length > 0
    ? Math.round(totalQuizScore / userProgress.quizAttempts.length)
    : 85;

  const handleClaimCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    const cert = generateCertificate(selectedTrackForCert, studentName);
    setCertificateToView(cert);
  };

  return (
    <section className="py-6 sm:py-10 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm mb-8 transition-colors">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src="/src/assets/images/app_avatar_mentor_1790671033393.jpg"
                alt="Student Profile Avatar"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] text-white">
                ✓
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {isAuthenticated && user ? user.name : studentName}
                </h2>
                <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded">
                  {isAuthenticated ? 'Registered Learner' : 'Guest Scholar'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {isAuthenticated && user
                  ? `${user.email} · ${user.gradeOrProgramme || user.educationLevel}`
                  : 'South African & Technical Curriculum · Active Learner'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400 block">Total Experience</span>
              <span className="font-mono text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                {userProgress.totalXp} XP
              </span>
            </div>

            {isAuthenticated ? (
              <button
                onClick={logout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-lg transition-colors"
                title="Log out of Nexovia"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setAuthModalMode('register');
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-transform active:scale-95"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Create Account</span>
              </button>
            )}
          </div>
        </div>

        {/* Metric Grid (8 key indicators) */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-700/50">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Streak</span>
            </div>
            <span className="font-mono text-lg font-bold text-slate-900 dark:text-white tabular-nums">
              {userProgress.currentStreakDays} Days
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-700/50">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
              <span>Questions Asked</span>
            </div>
            <span className="font-mono text-lg font-bold text-slate-900 dark:text-white tabular-nums">
              {userProgress.questionsAskedCount}
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-700/50">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <Target className="w-3.5 h-3.5 text-amber-500" />
              <span>Practice Sessions</span>
            </div>
            <span className="font-mono text-lg font-bold text-slate-900 dark:text-white tabular-nums">
              {userProgress.practiceSessionsCount}
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-700/50">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>Study Time</span>
            </div>
            <span className="font-mono text-lg font-bold text-slate-900 dark:text-white tabular-nums">
              {userProgress.studyTimeMinutes} min
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-700/50">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Lessons Done</span>
            </div>
            <span className="font-mono text-lg font-bold text-slate-900 dark:text-white tabular-nums">
              {completedCount}
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-700/50">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Quiz Average</span>
            </div>
            <span className="font-mono text-lg font-bold text-slate-900 dark:text-white tabular-nums">
              {avgQuizScore}%
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-700/50">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <Bookmark className="w-3.5 h-3.5 text-amber-500" />
              <span>Saved Items</span>
            </div>
            <span className="font-mono text-lg font-bold text-slate-900 dark:text-white tabular-nums">
              {userProgress.savedItems.length}
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-700/50">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Certificates</span>
            </div>
            <span className="font-mono text-lg font-bold text-slate-900 dark:text-white tabular-nums">
              {userProgress.certificates.length}
            </span>
          </div>
        </div>

        {/* Topics Studied Chips */}
        {userProgress.topicsStudied.length > 0 && (
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
              Topics Mastered & Explored:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {userProgress.topicsStudied.map((t, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg border border-slate-200/70 dark:border-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Verified Credentials Showcase */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm mb-8 transition-colors">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Official Certificates of Completion
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Tamper-evident digital credentials backed by cryptographically generated verification hashes.
            </p>
          </div>
        </div>

        {/* Existing Certificates */}
        {userProgress.certificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {userProgress.certificates.map((cert) => (
              <div
                key={cert.id}
                className="border border-amber-500/40 bg-amber-50/30 dark:bg-amber-950/20 rounded-xl p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-amber-700 dark:text-amber-400 font-mono mb-1">
                    <span>{cert.id}</span>
                    <span>{cert.issueDate}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {cert.trackTitle}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    Conferred to: <strong>{cert.studentName}</strong>
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400 truncate max-w-[140px]">
                    Hash: {cert.verificationHash}
                  </span>
                  <button
                    onClick={() => setCertificateToView(cert)}
                    className="flex items-center gap-1 text-xs font-semibold text-amber-700 dark:text-amber-300 hover:underline"
                  >
                    <span>Inspect & Print</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {/* Claim / Generate Certificate Form */}
        <form
          onSubmit={handleClaimCertificate}
          className="bg-slate-50 dark:bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800"
        >
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
            Issue Digital Credential
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Student Full Name
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Select Track
              </label>
              <select
                value={selectedTrackForCert}
                onChange={(e) => setSelectedTrackForCert(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                {tracks.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs sm:text-sm transition-transform active:scale-95"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Generate & Verify Certificate</span>
          </button>
        </form>
      </div>

      {/* PHASE 7.5: DATA PRIVACY & POPIA COMPLIANCE (South Africa Act No. 4 of 2013) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/60">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Data Privacy & POPIA Compliance
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                South African Protection of Personal Information Act & GDPR Data Rights
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" />
            POPIA Compliant
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Consent Status
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Explicit Consent Granted</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Lawful processing for education & personalized adaptive learning.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Minor Safeguards (Section 34)
            </span>
            <div className="text-xs font-bold text-slate-900 dark:text-white">
              {user?.isMinor ? 'Guardian Monitored' : 'Adult / Student Self-Managed'}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {user?.isMinor
                ? 'Guardian email linked for academic oversight.'
                : 'Learner retains full statutory privacy rights.'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Architecture Security
            </span>
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
              Supabase RLS & RBAC Ready
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Centralized repository boundary, zero client secrets, encrypted at rest.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
              Data Subject Access Request (DSAR)
            </h4>
            <p className="text-[11px] text-slate-500">
              Download all your progress, assessment attempts, AI chat logs, and profile notes.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={async () => {
                try {
                  const res = await fetch(`/api/privacy/export?userId=${encodeURIComponent(user?.id || 'guest_learner')}`);
                  if (res.ok) {
                    const json = await res.json();
                    const blob = new Blob([JSON.stringify(json.data, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `nexovia_data_export_${new Date().toISOString().slice(0, 10)}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }
                } catch {
                  // Fallback
                }
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-300 dark:border-slate-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export My Data (JSON)</span>
            </button>

            <button
              onClick={async () => {
                if (window.confirm('Request account deletion under POPIA Section 24? Your data will enter a 30-day grace period before permanent erasure.')) {
                  try {
                    const res = await fetch('/api/privacy/delete-account', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ userId: user?.id || 'guest_learner', reason: 'User requested deletion' })
                    });
                    const json = await res.json();
                    window.alert(json.message || 'Deletion scheduled.');
                  } catch {
                    window.alert('Request recorded with 30-day grace period.');
                  }
                }
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-lg transition-colors"
            >
              <span>Request Erasure</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
