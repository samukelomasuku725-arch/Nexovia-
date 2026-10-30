import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, CheckCircle2, Send, X, AlertCircle } from 'lucide-react';
import { supabase } from '../../supabase.js';

interface AnswerFeedbackWidgetProps {
  question: string;
  answer: string;
  className?: string;
  onFeedbackSaved?: () => void;
}

export const AnswerFeedbackWidget: React.FC<AnswerFeedbackWidgetProps> = ({
  question,
  answer,
  className = '',
  onFeedbackSaved
}) => {
  const [feedbackState, setFeedbackState] = useState<'idle' | 'helpful' | 'unhelpful_editing' | 'submitted'>('idle');
  const [userReason, setUserReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleHelpfulYes = () => {
    setFeedbackState('helpful');
    // Optional positive feedback recording
  };

  const handleHelpfulNo = () => {
    setFeedbackState('unhelpful_editing');
    setErrorMessage(null);
  };

  const handleSubmitWrongFeedback = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userReason.trim()) {
      setErrorMessage('Please describe what was wrong or how the answer should be improved.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question || 'Study Question',
          wrongAnswer: answer || '',
          userFeedback: userReason.trim(),
          timestamp: Date.now()
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFeedbackState('submitted');
        // Direct client sync to Supabase feedback table using supabase.js
        try {
          supabase
            .from('feedback')
            .insert([{ user_feedback: userReason.trim() }])
            .then(({ error }) => {
              if (error) console.warn('[Supabase Client] Feedback write note:', error.message);
            });
        } catch (_) {}
        if (onFeedbackSaved) onFeedbackSaved();
      } else {
        throw new Error(data.message || 'Failed to submit feedback.');
      }
    } catch (err: any) {
      console.error('Error submitting feedback:', err);
      setErrorMessage(err?.message || 'Could not save feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs ${className}`}>
      {feedbackState === 'idle' && (
        <div className="flex flex-wrap items-center gap-2 text-slate-500 dark:text-slate-400">
          <span className="font-medium text-slate-700 dark:text-slate-300">
            Was this helpful?
          </span>
          <div className="inline-flex items-center gap-1.5 ml-1">
            <button
              type="button"
              onClick={handleHelpfulYes}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-300 border border-slate-200/80 dark:border-slate-700 font-semibold transition-all active:scale-95 text-xs"
              aria-label="Was this helpful? Yes"
            >
              <ThumbsUp className="w-3.5 h-3.5 text-emerald-500" />
              <span>👍 Yes</span>
            </button>

            <button
              type="button"
              onClick={handleHelpfulNo}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-700 dark:text-slate-300 hover:text-rose-700 dark:hover:text-rose-300 border border-slate-200/80 dark:border-slate-700 font-semibold transition-all active:scale-95 text-xs"
              aria-label="Was this helpful? No"
            >
              <ThumbsDown className="w-3.5 h-3.5 text-rose-500" />
              <span>👎 No</span>
            </button>
          </div>
        </div>
      )}

      {feedbackState === 'helpful' && (
        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Thanks for your feedback! Glad this was helpful.</span>
        </div>
      )}

      {feedbackState === 'unhelpful_editing' && (
        <form onSubmit={handleSubmitWrongFeedback} className="space-y-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-amber-300 dark:border-amber-800/80">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
              <span>What was wrong with this answer?</span>
            </span>
            <button
              type="button"
              onClick={() => setFeedbackState('idle')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Cancel feedback"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <textarea
            value={userReason}
            onChange={(e) => setUserReason(e.target.value)}
            placeholder="Type what was wrong or how to correct this explanation..."
            rows={2}
            className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-y"
          />

          {errorMessage && (
            <p className="text-rose-600 dark:text-rose-400 text-[11px] font-medium">
              {errorMessage}
            </p>
          )}

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setFeedbackState('idle')}
              className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !userReason.trim()}
              className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-transform active:scale-95"
            >
              <Send className="w-3 h-3" />
              <span>{isSubmitting ? 'Saving...' : 'Submit Feedback'}</span>
            </button>
          </div>
        </form>
      )}

      {feedbackState === 'submitted' && (
        <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Feedback saved to question bank. Thank you for helping us improve!</span>
        </div>
      )}
    </div>
  );
};
