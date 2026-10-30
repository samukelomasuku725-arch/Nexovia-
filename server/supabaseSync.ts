/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIA ACADEMY - SUPABASE DATABASE INTEGRATION
 * 
 * Connects question answering and learner feedback to Supabase:
 * - Table `question_bank`: { question, answer, subject }
 * - Table `feedback`: { question_id, user_feedback }
 * 
 * Uses the client from root /supabase.js
 */

import { supabase } from '../supabase.js';

function normalizeSubject(subject?: string, questionText?: string): string {
  if (subject) {
    const s = subject.trim().toLowerCase();
    if (s === 'maths' || s === 'mathematics' || s.includes('math') || s.includes('algebra') || s.includes('calc')) {
      return 'maths';
    }
    if (s === 'science' || s === 'sciences' || s.includes('physics') || s.includes('chem') || s.includes('bio') || s.includes('sci')) {
      return 'science';
    }
    return s;
  }
  const q = (questionText || '').toLowerCase();
  if (
    q.includes('ohm') ||
    q.includes('circuit') ||
    q.includes('voltage') ||
    q.includes('current') ||
    q.includes('matter') ||
    q.includes('atom') ||
    q.includes('cell') ||
    q.includes('photosynthesis') ||
    q.includes('force') ||
    q.includes('gravity') ||
    q.includes('energy')
  ) {
    return 'science';
  }
  return 'maths';
}

/**
 * Saves a question, its answer, and subject to Supabase `question_bank` table.
 */
export async function saveQuestionToSupabase(
  question: string,
  answer: string,
  subject?: string
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    if (!question || !answer) {
      return { success: false, error: 'Question and answer are required.' };
    }

    const normSubject = normalizeSubject(subject, question);

    const { data, error } = await supabase
      .from('question_bank')
      .insert([
        {
          question: question.trim(),
          answer: answer.trim(),
          subject: normSubject
        }
      ])
      .select('id, question, subject');

    if (error) {
      console.error('[Supabase Sync] Error inserting into question_bank:', error.message);
      return { success: false, error: error.message };
    }

    const insertedId = data?.[0]?.id;
    console.log(`[Supabase Sync] Saved question to question_bank table (id: ${insertedId}, subject: ${normSubject}): "${question.trim().slice(0, 40)}..."`);
    return { success: true, id: insertedId };
  } catch (err: any) {
    console.error('[Supabase Sync] Unexpected error in saveQuestionToSupabase:', err?.message || err);
    return { success: false, error: err?.message || 'Unexpected error' };
  }
}

/**
 * Saves user feedback to Supabase `feedback` table.
 * If a matching question exists in question_bank, links its foreign key question_id.
 */
export async function saveFeedbackToSupabase(
  question: string,
  wrongAnswer: string,
  userFeedback: string
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    if (!userFeedback) {
      return { success: false, error: 'User feedback text is required.' };
    }

    let linkedQuestionId: string | null = null;

    // 1. Look up if this question already exists in question_bank
    if (question && question.trim()) {
      try {
        const { data: existingQ } = await supabase
          .from('question_bank')
          .select('id')
          .ilike('question', question.trim())
          .limit(1);

        if (existingQ && existingQ.length > 0 && existingQ[0].id) {
          linkedQuestionId = existingQ[0].id;
        } else if (wrongAnswer && wrongAnswer.trim()) {
          // If question is not in question_bank yet, insert it so question_id foreign key is valid
          const normSubject = normalizeSubject(undefined, question);
          const { data: newQ } = await supabase
            .from('question_bank')
            .insert([
              {
                question: question.trim(),
                answer: wrongAnswer.trim(),
                subject: normSubject
              }
            ])
            .select('id');

          if (newQ && newQ.length > 0 && newQ[0].id) {
            linkedQuestionId = newQ[0].id;
          }
        }
      } catch (lookupErr: any) {
        console.warn('[Supabase Sync] Lookup/create in question_bank skipped:', lookupErr?.message);
      }
    }

    // 2. Insert into feedback table
    const payload: { user_feedback: string; question_id?: string | null } = {
      user_feedback: userFeedback.trim()
    };
    if (linkedQuestionId) {
      payload.question_id = linkedQuestionId;
    }

    const { data, error } = await supabase
      .from('feedback')
      .insert([payload])
      .select('id, user_feedback, question_id');

    if (error) {
      console.error('[Supabase Sync] Error inserting into feedback table:', error.message);
      return { success: false, error: error.message };
    }

    const fbId = data?.[0]?.id;
    console.log(`[Supabase Sync] Saved feedback to feedback table (id: ${fbId}, question_id: ${linkedQuestionId}): "${userFeedback.trim().slice(0, 40)}..."`);
    return { success: true, id: fbId };
  } catch (err: any) {
    console.error('[Supabase Sync] Unexpected error in saveFeedbackToSupabase:', err?.message || err);
    return { success: false, error: err?.message || 'Unexpected error' };
  }
}

/**
 * Returns summary stats from Supabase tables for health check and admin view.
 */
export async function getSupabaseSummary(): Promise<{
  connected: boolean;
  questionCount: number;
  feedbackCount: number;
  recentQuestions?: any[];
  recentFeedback?: any[];
  error?: string;
}> {
  try {
    const [qRes, fbRes] = await Promise.all([
      supabase.from('question_bank').select('id, question, answer, subject', { count: 'exact' }).limit(50),
      supabase.from('feedback').select('id, user_feedback, question_id, question_bank(question, answer, subject)', { count: 'exact' }).limit(50)
    ]);

    if (qRes.error && fbRes.error) {
      return {
        connected: false,
        questionCount: 0,
        feedbackCount: 0,
        error: qRes.error.message
      };
    }

    return {
      connected: true,
      questionCount: qRes.count ?? (qRes.data?.length || 0),
      feedbackCount: fbRes.count ?? (fbRes.data?.length || 0),
      recentQuestions: qRes.data || [],
      recentFeedback: fbRes.data || []
    };
  } catch (err: any) {
    return {
      connected: false,
      questionCount: 0,
      feedbackCount: 0,
      error: err?.message || 'Failed to fetch Supabase summary'
    };
  }
}
