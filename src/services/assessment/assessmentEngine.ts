/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIA - PHASE 7: ASSESSMENT ENGINE
 * 
 * Core evaluation engine:
 * 1. Automatic Marking of all 8 Question Types
 * 2. Written Response Evaluation (provisional AI-assisted + teacher manual review)
 * 3. Results aggregation, topic performance, and learning-objective metrics
 * 4. Integration with Phase 5 Adaptive Learning Engine (LearnerPerformanceEvent generation)
 * 5. Question Bank filtering and Assessment Builder validation
 */

import {
  AiAssistedEvaluation,
  AssessmentAttempt,
  AssessmentModel,
  LearnerAnswer,
  LearnerAnswerValue,
  QuestionBankFilter,
  QuestionModel,
  QuestionResult,
  TopicPerformanceResult
} from '../../types/assessment';
import { LearnerPerformanceEvent } from '../../types/adaptive';
import { SEED_ASSESSMENTS, SEED_QUESTION_BANK } from '../../data/assessmentSeedData';

export class AssessmentEngine {
  private assessments: AssessmentModel[] = SEED_ASSESSMENTS;
  private questionBank: QuestionModel[] = SEED_QUESTION_BANK;

  // -------------------------------------------------------------------------
  // 1. ASSESSMENT RETRIEVAL & FILTERING
  // -------------------------------------------------------------------------
  getAssessments(canViewDrafts = false): AssessmentModel[] {
    return this.assessments.filter((a) => (canViewDrafts ? true : a.status === 'PUBLISHED'));
  }

  getAssessmentById(id: string): AssessmentModel | undefined {
    return this.assessments.find((a) => a.id === id);
  }

  getQuestionById(id: string): QuestionModel | undefined {
    return this.questionBank.find((q) => q.id === id);
  }

  // -------------------------------------------------------------------------
  // 2. AUTOMATIC MARKING OF 8 QUESTION TYPES
  // -------------------------------------------------------------------------
  markLearnerAnswer(
    question: QuestionModel,
    answer: LearnerAnswerValue | undefined,
    aiFeedback?: AiAssistedEvaluation
  ): QuestionResult {
    const marksAvailable = question.marks || 1;

    // Case 1: Unanswered
    if (answer === undefined || answer === null || answer === '' || (Array.isArray(answer) && answer.length === 0)) {
      return {
        questionId: question.id,
        questionType: question.questionType,
        marksAwarded: 0,
        marksAvailable,
        isCorrect: false,
        learnerAnswer: answer || '',
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        feedback: 'No answer was provided.',
        topic: question.topic,
        learningObjective: question.learningObjective,
        markingType: question.questionType === 'written_response' ? 'ai_assisted' : 'auto'
      };
    }

    // TYPE 1: MULTIPLE CHOICE
    if (question.questionType === 'multiple_choice') {
      const isCorrect = String(answer).trim().toLowerCase() === String(question.correctAnswer).trim().toLowerCase();
      return {
        questionId: question.id,
        questionType: 'multiple_choice',
        marksAwarded: isCorrect ? marksAvailable : 0,
        marksAvailable,
        isCorrect,
        learnerAnswer: answer,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        feedback: isCorrect ? 'Correct! Well done.' : 'Incorrect option selected.',
        topic: question.topic,
        learningObjective: question.learningObjective,
        markingType: 'auto'
      };
    }

    // TYPE 2: MULTIPLE SELECT
    if (question.questionType === 'multiple_select') {
      const selected = Array.isArray(answer) ? answer.map((s) => String(s).trim()) : [String(answer).trim()];
      const target = Array.isArray(question.correctAnswer)
        ? question.correctAnswer.map((s) => String(s).trim())
        : [String(question.correctAnswer).trim()];

      const selectedSet = new Set(selected);
      const targetSet = new Set(target);

      // Check exact match
      const isExactMatch =
        selectedSet.size === targetSet.size &&
        [...selectedSet].every((val) => targetSet.has(val));

      // Calculate partial credit (1 mark per correct selection minus incorrect)
      let matches = 0;
      selected.forEach((val) => {
        if (targetSet.has(val)) matches++;
      });
      const falsePositives = selected.filter((val) => !targetSet.has(val)).length;
      const partialScore = Math.max(0, Math.round(((matches - falsePositives) / targetSet.size) * marksAvailable));

      return {
        questionId: question.id,
        questionType: 'multiple_select',
        marksAwarded: isExactMatch ? marksAvailable : partialScore,
        marksAvailable,
        isCorrect: isExactMatch,
        isPartiallyCorrect: !isExactMatch && partialScore > 0,
        learnerAnswer: selected,
        correctAnswer: target,
        explanation: question.explanation,
        feedback: isExactMatch
          ? 'All correct options selected!'
          : partialScore > 0
          ? `Partially correct (${matches} of ${targetSet.size} correct selected).`
          : 'Incorrect combination of options.',
        topic: question.topic,
        learningObjective: question.learningObjective,
        markingType: 'auto'
      };
    }

    // TYPE 3: TRUE / FALSE
    if (question.questionType === 'true_false') {
      const normalizedAnswer = String(answer).trim().toLowerCase();
      const normalizedTarget = String(question.correctAnswer).trim().toLowerCase();
      const isCorrect = normalizedAnswer === normalizedTarget;

      return {
        questionId: question.id,
        questionType: 'true_false',
        marksAwarded: isCorrect ? marksAvailable : 0,
        marksAvailable,
        isCorrect,
        learnerAnswer: normalizedAnswer,
        correctAnswer: normalizedTarget,
        explanation: question.explanation,
        feedback: isCorrect ? 'Correct statement evaluation.' : 'Incorrect evaluation.',
        topic: question.topic,
        learningObjective: question.learningObjective,
        markingType: 'auto'
      };
    }

    // TYPE 4: SHORT ANSWER
    if (question.questionType === 'short_answer') {
      const cleanAnswer = String(answer).trim().toLowerCase();
      const accepted = (question.acceptedAnswers || [String(question.correctAnswer)]).map((a) =>
        String(a).trim().toLowerCase()
      );

      const isCorrect = accepted.some((acc) => acc === cleanAnswer || cleanAnswer.includes(acc));

      return {
        questionId: question.id,
        questionType: 'short_answer',
        marksAwarded: isCorrect ? marksAvailable : 0,
        marksAvailable,
        isCorrect,
        learnerAnswer: String(answer).trim(),
        correctAnswer: question.correctAnswer || accepted[0],
        explanation: question.explanation,
        feedback: isCorrect ? 'Exact match accepted.' : `Expected: ${question.correctAnswer || accepted[0]}`,
        topic: question.topic,
        learningObjective: question.learningObjective,
        markingType: 'auto'
      };
    }

    // TYPE 5: NUMERICAL ANSWER
    if (question.questionType === 'numerical_answer') {
      const rawString = String(answer).trim();
      const parsedNum = parseFloat(rawString.replace(/[^0-9.-]/g, ''));
      const target = question.numericalTarget !== undefined ? question.numericalTarget : parseFloat(String(question.correctAnswer));
      const tolerance = question.numericalTolerance !== undefined ? question.numericalTolerance : 0.05;

      let isCorrect = false;
      if (!isNaN(parsedNum) && !isNaN(target)) {
        isCorrect = Math.abs(parsedNum - target) <= tolerance;
      }

      // Fallback check against accepted answers
      if (!isCorrect && question.acceptedAnswers) {
        isCorrect = question.acceptedAnswers.some(
          (acc) => acc.trim().toLowerCase() === rawString.toLowerCase()
        );
      }

      return {
        questionId: question.id,
        questionType: 'numerical_answer',
        marksAwarded: isCorrect ? marksAvailable : 0,
        marksAvailable,
        isCorrect,
        learnerAnswer: rawString,
        correctAnswer: `${target} ${question.numericalUnit || ''}`.trim(),
        explanation: question.explanation,
        feedback: isCorrect
          ? `Accurate numerical answer within tolerance (±${tolerance}).`
          : `Calculated value was outside accepted range (${target} ± ${tolerance}).`,
        topic: question.topic,
        learningObjective: question.learningObjective,
        markingType: 'auto'
      };
    }

    // TYPE 6: MATCHING
    if (question.questionType === 'matching') {
      const userPairs = typeof answer === 'object' && !Array.isArray(answer) ? (answer as Record<string, string>) : {};
      
      let targetMap: Record<string, string> = {};
      if (typeof question.correctAnswer === 'string') {
        try {
          targetMap = JSON.parse(question.correctAnswer);
        } catch {
          targetMap = {};
        }
      } else if (typeof question.correctAnswer === 'object' && question.correctAnswer !== null) {
        targetMap = question.correctAnswer as unknown as Record<string, string>;
      }

      const totalPairs = question.matchingPairs?.length || Object.keys(targetMap).length || 1;
      let matchedCount = 0;

      for (const [promptId, matchedVal] of Object.entries(userPairs)) {
        if (targetMap[promptId] && targetMap[promptId] === matchedVal) {
          matchedCount++;
        }
      }

      const isExactMatch = matchedCount === totalPairs;
      const partialMarks = Math.round((matchedCount / totalPairs) * marksAvailable);

      return {
        questionId: question.id,
        questionType: 'matching',
        marksAwarded: isExactMatch ? marksAvailable : partialMarks,
        marksAvailable,
        isCorrect: isExactMatch,
        isPartiallyCorrect: !isExactMatch && partialMarks > 0,
        learnerAnswer: userPairs,
        correctAnswer: targetMap,
        explanation: question.explanation,
        feedback: isExactMatch
          ? 'All pairs matched accurately!'
          : `Matched ${matchedCount} of ${totalPairs} pairs correctly.`,
        topic: question.topic,
        learningObjective: question.learningObjective,
        markingType: 'auto'
      };
    }

    // TYPE 7: ORDERING
    if (question.questionType === 'ordering') {
      const userOrder = Array.isArray(answer) ? answer.map(String) : [];
      const targetOrder = Array.isArray(question.correctAnswer)
        ? question.correctAnswer.map(String)
        : (question.orderingItems || [])
            .sort((a, b) => a.correctOrder - b.correctOrder)
            .map((item) => item.id);

      const isExactMatch =
        userOrder.length === targetOrder.length &&
        userOrder.every((val, idx) => val === targetOrder[idx]);

      return {
        questionId: question.id,
        questionType: 'ordering',
        marksAwarded: isExactMatch ? marksAvailable : 0,
        marksAvailable,
        isCorrect: isExactMatch,
        learnerAnswer: userOrder,
        correctAnswer: targetOrder,
        explanation: question.explanation,
        feedback: isExactMatch ? 'Sequence ordered correctly.' : 'Sequence order was incorrect.',
        topic: question.topic,
        learningObjective: question.learningObjective,
        markingType: 'auto'
      };
    }

    // TYPE 8: WRITTEN RESPONSE
    if (question.questionType === 'written_response') {
      const text = String(answer).trim();
      const hasContent = text.length > 15;

      // Provisional score: if AI feedback provided, use it; otherwise provisional 60% if well written
      const suggestedMarks = aiFeedback?.suggestedMarks !== undefined
        ? aiFeedback.suggestedMarks
        : hasContent
        ? Math.round(marksAvailable * 0.7)
        : 0;

      return {
        questionId: question.id,
        questionType: 'written_response',
        marksAwarded: suggestedMarks,
        marksAvailable,
        isCorrect: suggestedMarks >= Math.ceil(marksAvailable * 0.5),
        learnerAnswer: text,
        correctAnswer: question.sampleSolution || 'Consult the rubric and exemplar solution below.',
        explanation: question.explanation,
        feedback: aiFeedback?.constructiveFeedback || 'Written response recorded for pedagogical assessment.',
        topic: question.topic,
        learningObjective: question.learningObjective,
        markingType: 'ai_assisted',
        aiEvaluation: aiFeedback
      };
    }

    // Fallback
    return {
      questionId: question.id,
      questionType: question.questionType,
      marksAwarded: 0,
      marksAvailable,
      isCorrect: false,
      learnerAnswer: answer,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      topic: question.topic,
      learningObjective: question.learningObjective,
      markingType: 'auto'
    };
  }

  // -------------------------------------------------------------------------
  // 3. COMPLETE ATTEMPT EVALUATION & PERFORMANCE AGGREGATION
  // -------------------------------------------------------------------------
  evaluateAssessmentAttempt(
    assessment: AssessmentModel,
    answers: Record<string, LearnerAnswer>,
    learnerId: string,
    timeUsedSeconds: number,
    attemptNumber = 1,
    antiCheatingLogs?: { windowBlurCount: number; tabSwitchCount: number; connectionDropCount: number }
  ): AssessmentAttempt {
    const questionResults: QuestionResult[] = [];
    let totalScore = 0;
    let totalPossibleMarks = 0;

    // Topic performance tracking
    const topicTracker: Record<string, { earned: number; available: number }> = {};
    const loTracker: Record<string, { earned: number; available: number }> = {};

    for (const q of assessment.questions) {
      const learnerAns = answers[q.id];
      const result = this.markLearnerAnswer(q, learnerAns?.value);
      questionResults.push(result);

      totalScore += result.marksAwarded;
      totalPossibleMarks += result.marksAvailable;

      // Topic aggregation
      const topicName = q.topic || assessment.topic || 'General';
      if (!topicTracker[topicName]) {
        topicTracker[topicName] = { earned: 0, available: 0 };
      }
      topicTracker[topicName].earned += result.marksAwarded;
      topicTracker[topicName].available += result.marksAvailable;

      // Learning Objective aggregation
      if (q.learningObjective) {
        if (!loTracker[q.learningObjective]) {
          loTracker[q.learningObjective] = { earned: 0, available: 0 };
        }
        loTracker[q.learningObjective].earned += result.marksAwarded;
        loTracker[q.learningObjective].available += result.marksAvailable;
      }
    }

    const percentage = totalPossibleMarks > 0 ? Math.round((totalScore / totalPossibleMarks) * 100) : 0;
    const passed = percentage >= (assessment.passingPercentage || 50);

    // Build topic performance breakdown
    const topicPerformance: Record<string, TopicPerformanceResult> = {};
    for (const [topic, data] of Object.entries(topicTracker)) {
      const pct = data.available > 0 ? Math.round((data.earned / data.available) * 100) : 0;
      let status: TopicPerformanceResult['status'] = 'developing';
      if (pct >= 90) status = 'mastered';
      else if (pct >= 75) status = 'strong';
      else if (pct >= 60) status = 'basic';
      else if (pct >= 40) status = 'developing';
      else status = 'needs_support';

      topicPerformance[topic] = {
        topic,
        marksEarned: data.earned,
        marksAvailable: data.available,
        percentage: pct,
        status
      };
    }

    // Build Learning Objective performance
    const learningObjectivePerformance: AssessmentAttempt['learningObjectivePerformance'] = {};
    for (const [obj, data] of Object.entries(loTracker)) {
      learningObjectivePerformance[obj] = {
        objective: obj,
        marksEarned: data.earned,
        marksAvailable: data.available,
        percentage: data.available > 0 ? Math.round((data.earned / data.available) * 100) : 0
      };
    }

    return {
      id: `att_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      learnerId,
      assessmentId: assessment.id,
      assessmentTitle: assessment.title,
      assessmentType: assessment.assessmentType,
      curriculumId: assessment.curriculumId,
      grade: assessment.grade,
      subject: assessment.subject,
      topic: assessment.topic,
      startedAt: new Date(Date.now() - timeUsedSeconds * 1000).toISOString(),
      submittedAt: new Date().toISOString(),
      status: 'MARKED',
      answers,
      questionResults,
      score: totalScore,
      totalMarks: totalPossibleMarks,
      percentage,
      passed,
      timeUsedSeconds,
      attemptNumber,
      antiCheatingLogs,
      topicPerformance,
      learningObjectivePerformance,
      isSyncedWithServer: true
    };
  }

  // -------------------------------------------------------------------------
  // 4. CONVERT ATTEMPT TO PHASE 5 ADAPTIVE ENGINE EVENTS
  // -------------------------------------------------------------------------
  convertAttemptToAdaptiveEvents(
    attempt: AssessmentAttempt,
    assessment: AssessmentModel
  ): LearnerPerformanceEvent[] {
    const events: LearnerPerformanceEvent[] = [];
    const timestamp = attempt.submittedAt || new Date().toISOString();

    for (const result of attempt.questionResults || []) {
      const question = assessment.questions.find((q) => q.id === result.questionId);
      const isCorrect = result.isCorrect;
      const topicName = question?.topic || assessment.topic || 'General Topic';

      events.push({
        id: `ev_asmt_${Date.now()}_${result.questionId}`,
        learnerId: attempt.learnerId,
        timestamp,
        gradeOrProgramme: assessment.grade,
        subject: assessment.subject,
        topic: topicName,
        lessonId: assessment.lessonId || assessment.title,
        assessmentId: assessment.id,
        questionId: question?.id || result.questionId,
        questionType: 'multiple_choice',
        answer: String(result.learnerAnswer),
        correct: isCorrect,
        score: result.marksAwarded,
        percentage: result.marksAvailable > 0 ? (result.marksAwarded / result.marksAvailable) * 100 : 0,
        difficulty: question?.difficulty || assessment.difficulty || 'medium',
        timeSpentSeconds: 30,
        attemptsCount: attempt.attemptNumber,
        hintsUsed: 0,
        source: assessment.assessmentType === 'PRACTICE' ? 'practice' : 'assessment',
        completed: true
      });
    }

    return events;
  }

  // -------------------------------------------------------------------------
  // 5. QUESTION BANK SEARCH & FILTER
  // -------------------------------------------------------------------------
  filterQuestionBank(filter: QuestionBankFilter): QuestionModel[] {
    return this.questionBank.filter((q) => {
      if (filter.grade && q.grade !== filter.grade) return false;
      if (filter.subject && q.subject?.toLowerCase() !== filter.subject.toLowerCase()) return false;
      if (filter.phase && q.phase !== filter.phase) return false;
      if (filter.term && q.term !== filter.term) return false;
      if (filter.topic && q.topic?.toLowerCase() !== filter.topic.toLowerCase()) return false;
      if (filter.difficulty && q.difficulty !== filter.difficulty) return false;
      if (filter.questionType && q.questionType !== filter.questionType) return false;
      if (filter.sourceType && q.sourceType !== filter.sourceType) return false;
      if (filter.language && q.language !== filter.language) return false;

      if (filter.searchKeyword) {
        const kw = filter.searchKeyword.toLowerCase();
        const matchesText = q.questionText.toLowerCase().includes(kw);
        const matchesTopic = q.topic?.toLowerCase().includes(kw);
        const matchesObj = q.learningObjective?.toLowerCase().includes(kw);
        if (!matchesText && !matchesTopic && !matchesObj) return false;
      }

      return true;
    });
  }

  addQuestionToBank(question: QuestionModel): QuestionModel {
    this.questionBank.unshift(question);
    return question;
  }

  // -------------------------------------------------------------------------
  // 6. ASSESSMENT BUILDER & VALIDATION
  // -------------------------------------------------------------------------
  validateAssessment(assessment: Partial<AssessmentModel>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!assessment.title || assessment.title.trim().length < 3) {
      errors.push('Title must be at least 3 characters.');
    }

    if (!assessment.subject) {
      errors.push('Subject must be selected.');
    }

    if (!assessment.grade) {
      errors.push('Grade level must be selected.');
    }

    if (!assessment.questions || assessment.questions.length === 0) {
      errors.push('Assessment must contain at least one question.');
    } else {
      assessment.questions.forEach((q, idx) => {
        if (!q.questionText || q.questionText.trim().length === 0) {
          errors.push(`Question #${idx + 1} has empty text.`);
        }
        if (!q.marks || q.marks < 1) {
          errors.push(`Question #${idx + 1} must have at least 1 mark assigned.`);
        }
        if (q.questionType === 'multiple_choice' && (!q.options || q.options.length < 2)) {
          errors.push(`Question #${idx + 1} (Multiple Choice) must have at least 2 options.`);
        }
        if (q.questionType === 'multiple_choice' && !q.correctAnswer) {
          errors.push(`Question #${idx + 1} must have a designated correct answer.`);
        }
        if (q.questionType === 'true_false' && !q.correctAnswer) {
          errors.push(`Question #${idx + 1} (True/False) must define a correct answer.`);
        }
      });
    }

    if (assessment.passingPercentage !== undefined && (assessment.passingPercentage < 10 || assessment.passingPercentage > 100)) {
      errors.push('Passing percentage must be between 10% and 100%.');
    }

    if (assessment.durationMinutes !== undefined && assessment.durationMinutes <= 0) {
      errors.push('Duration must be greater than 0 minutes when configured.');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  saveAssessment(assessment: AssessmentModel): { success: boolean; errors?: string[] } {
    const validation = this.validateAssessment(assessment);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    const idx = this.assessments.findIndex((a) => a.id === assessment.id);
    if (idx >= 0) {
      this.assessments[idx] = assessment;
    } else {
      this.assessments.unshift(assessment);
    }

    return { success: true };
  }
}

export const assessmentEngine = new AssessmentEngine();
