import {
  AdaptiveDifficulty,
  AdaptiveProfile,
  DEFAULT_MASTERY_THRESHOLDS,
  LearnerInsights,
  LearnerOnboardingGoals,
  LearnerPerformanceEvent,
  LearnerStreakInfo,
  LearningRecommendation,
  MasteryStatus,
  MasteryThresholds,
  NextBestLesson,
  SpacedReviewSchedule,
  TopicMastery
} from '../../types/adaptive';
import { SCHOOL_GRADES, TVET_QUALIFICATIONS } from '../../data/curriculumData';
import { TRACKS } from '../../data/coursesData';

// Map of canonical prerequisite dependencies in South African curriculum
export const CURRICULUM_PREREQUISITES: Record<string, { prerequisiteTopic: string; subject: string; reason: string }> = {
  'Algebraic Fractions': {
    prerequisiteTopic: 'Fractions & Ratios',
    subject: 'Mathematics',
    reason: 'Understanding basic numerator/denominator operations is essential before simplifying algebraic fractions.'
  },
  'Quadratic Equations': {
    prerequisiteTopic: 'Algebra & Factorization',
    subject: 'Mathematics',
    reason: 'Factorization of trinomials and binomials is required to solve quadratic equations.'
  },
  'Calculus & Derivatives': {
    prerequisiteTopic: 'Functions & Graphs',
    subject: 'Mathematics',
    reason: 'Gradient and secant concepts on parabolic functions form the foundation for limits and derivatives.'
  },
  'Trigonometric Equations': {
    prerequisiteTopic: 'Trigonometry Basics',
    subject: 'Mathematics',
    reason: 'Standard sine, cosine and tangent ratios must be mastered before solving reduction formulae.'
  },
  'Newton\'s Laws of Motion': {
    prerequisiteTopic: 'Vectors & Scalars',
    subject: 'Physical Sciences',
    reason: 'Drawing Free-Body Diagrams (FBDs) requires vector resolution into horizontal and vertical components.'
  },
  'Work, Energy & Power': {
    prerequisiteTopic: 'Newton\'s Laws of Motion',
    subject: 'Physical Sciences',
    reason: 'The Work-Energy Theorem directly derives from resultant force and acceleration.'
  },
  'Electric Circuits & Ohm\'s Law': {
    prerequisiteTopic: 'Electrostatics',
    subject: 'Physical Sciences',
    reason: 'Potential difference and charge flow concepts depend on electric field fundamentals.'
  },
  'Acid-Base Reactions': {
    prerequisiteTopic: 'Chemical Bonding & Stoichiometry',
    subject: 'Physical Sciences',
    reason: 'Balancing neutralization equations requires mole calculations and valence electron principles.'
  }
};

/**
 * 1. MULTI-SIGNAL TOPIC MASTERY CALCULATION
 * 
 * Master Heuristic:
 * - 40% Recent assessment / quiz accuracy (last 5 scores)
 * - 25% Overall practice accuracy (all time)
 * - 15% Difficulty factor (hard questions reward more than easy)
 * - 10% Trend & Improvement velocity
 * - 10% Engagement & completion volume
 * - Gentle time decay for topics not practiced in > 14 days
 */
export function calculateTopicMastery(
  events: LearnerPerformanceEvent[],
  thresholds: MasteryThresholds = DEFAULT_MASTERY_THRESHOLDS,
  now: Date = new Date()
): TopicMastery {
  if (!events || events.length === 0) {
    return {
      topic: 'Unknown Topic',
      subject: 'General',
      gradeOrProgramme: 'General',
      masteryScore: 0,
      status: 'needs_support',
      accuracy: 0,
      totalAttempts: 0,
      correctAttempts: 0,
      recentScores: [],
      lastPracticedAt: new Date(0).toISOString(),
      trend: 'stable',
      improvementPercentage: 0,
      recommendedDifficulty: 'easy',
      weakSubtopics: [],
      repeatedMistakes: [],
      daysSincePractice: 999,
      confidence: 'insufficient_data'
    };
  }

  const topic = events[0].topic;
  const subject = events[0].subject;
  const gradeOrProgramme = events[0].gradeOrProgramme;

  // Sort events chronologically (newest last)
  const sorted = [...events].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const totalAttempts = sorted.length;
  const correctAttempts = sorted.filter((e) => e.correct).length;
  const overallAccuracy = Math.round((correctAttempts / totalAttempts) * 100);

  // Recent scores (last 5)
  const recentEvents = sorted.slice(-5);
  const recentScores = recentEvents.map((e) =>
    e.percentage !== undefined ? e.percentage : e.correct ? 100 : 0
  );
  const recentAccuracy =
    recentScores.reduce((sum, s) => sum + s, 0) / (recentScores.length || 1);

  // Difficulty weighting: Hard correct gives +20%, Medium gives +10%, Easy gives +0%
  let difficultyBonus = 0;
  const hardAttempts = sorted.filter((e) => e.difficulty === 'hard');
  const hardCorrect = hardAttempts.filter((e) => e.correct).length;
  if (hardAttempts.length > 0) {
    difficultyBonus += Math.min(15, (hardCorrect / hardAttempts.length) * 15);
  } else {
    // If only easy completed, cap high mastery until medium/hard attempted
    difficultyBonus = 5;
  }

  // Trend detection (compare first half to second half if >= 4 attempts)
  let trend: 'improving' | 'declining' | 'stable' = 'stable';
  let improvementPercentage = 0;
  if (sorted.length >= 4) {
    const half = Math.floor(sorted.length / 2);
    const olderEvents = sorted.slice(0, half);
    const newerEvents = sorted.slice(half);

    const olderAcc = (olderEvents.filter((e) => e.correct).length / olderEvents.length) * 100;
    const newerAcc = (newerEvents.filter((e) => e.correct).length / newerEvents.length) * 100;
    improvementPercentage = Math.round(newerAcc - olderAcc);

    if (improvementPercentage >= 10) trend = 'improving';
    else if (improvementPercentage <= -10) trend = 'declining';
  }

  // Engagement volume score (caps at 10 items)
  const volumeFactor = Math.min(10, totalAttempts * 1.5);

  // Time decay: if last practice was > 14 days ago, slight decay (max -15%)
  const lastEvent = sorted[sorted.length - 1];
  const lastDate = new Date(lastEvent.timestamp);
  const daysSincePractice = Math.max(
    0,
    Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))
  );

  let decayPenalty = 0;
  if (daysSincePractice > 14) {
    decayPenalty = Math.min(15, Math.floor((daysSincePractice - 14) / 5) * 3);
  }

  // Raw weighted score calculation
  const weightedScore =
    recentAccuracy * 0.4 +
    overallAccuracy * 0.25 +
    difficultyBonus +
    Math.max(-5, Math.min(10, improvementPercentage * 0.2)) +
    volumeFactor -
    decayPenalty;

  // Clamp 0 to 100
  const finalMasteryScore = Math.max(0, Math.min(100, Math.round(weightedScore)));

  // Map to transparent status
  let status: MasteryStatus = 'needs_support';
  if (finalMasteryScore <= thresholds.needsSupportMax) {
    status = 'needs_support';
  } else if (finalMasteryScore <= thresholds.developingMax) {
    status = 'developing';
  } else if (finalMasteryScore <= thresholds.basicMax) {
    status = 'basic';
  } else if (finalMasteryScore <= thresholds.strongMax) {
    status = 'strong';
  } else {
    status = 'mastered';
  }

  // Subtopics and repeated mistakes identification
  const incorrectEvents = sorted.filter((e) => !e.correct);
  const repeatedMistakesMap: Record<string, number> = {};
  const weakSubtopicsMap: Record<string, number> = {};

  for (const item of incorrectEvents) {
    if (item.subtopic) {
      weakSubtopicsMap[item.subtopic] = (weakSubtopicsMap[item.subtopic] || 0) + 1;
    }
    const mistakeKey = item.questionType || item.subtopic || 'Conceptual understanding';
    repeatedMistakesMap[mistakeKey] = (repeatedMistakesMap[mistakeKey] || 0) + 1;
  }

  const weakSubtopics = Object.keys(weakSubtopicsMap).filter(
    (k) => weakSubtopicsMap[k] >= 1
  );
  const repeatedMistakes = Object.keys(repeatedMistakesMap).filter(
    (k) => repeatedMistakesMap[k] >= 2
  );

  // Recommended difficulty
  let recommendedDifficulty: AdaptiveDifficulty = 'medium';
  if (finalMasteryScore < 50 || recentAccuracy < 50) {
    recommendedDifficulty = 'easy';
  } else if (finalMasteryScore >= 75 && recentAccuracy >= 80) {
    recommendedDifficulty = 'hard';
  } else {
    recommendedDifficulty = 'medium';
  }

  // Confidence based on sample size
  let confidence: 'insufficient_data' | 'low' | 'moderate' | 'high' = 'low';
  if (totalAttempts < 3) confidence = 'insufficient_data';
  else if (totalAttempts <= 6) confidence = 'low';
  else if (totalAttempts <= 12) confidence = 'moderate';
  else confidence = 'high';

  return {
    topic,
    subject,
    gradeOrProgramme,
    masteryScore: finalMasteryScore,
    status,
    accuracy: overallAccuracy,
    totalAttempts,
    correctAttempts,
    recentScores,
    lastPracticedAt: lastEvent.timestamp,
    trend,
    improvementPercentage,
    recommendedDifficulty,
    weakSubtopics,
    repeatedMistakes,
    daysSincePractice,
    confidence
  };
}

/**
 * 2. IDENTIFY WEAK AREAS
 * Filters topics where mastery is below 60% or where repeated mistakes occur.
 */
export function identifyWeakAreas(
  masteries: Record<string, TopicMastery> | TopicMastery[],
  limit = 5
): TopicMastery[] {
  const list = Array.isArray(masteries) ? masteries : Object.values(masteries);
  return list
    .filter((m) => m.masteryScore < 60 || m.status === 'needs_support' || m.status === 'developing')
    .sort((a, b) => a.masteryScore - b.masteryScore) // Lowest mastery first
    .slice(0, limit);
}

/**
 * 3. IDENTIFY STRONG AREAS
 * Filters topics where mastery is 75%+ or recent positive improvements occurred.
 */
export function identifyStrongAreas(
  masteries: Record<string, TopicMastery> | TopicMastery[],
  limit = 5
): TopicMastery[] {
  const list = Array.isArray(masteries) ? masteries : Object.values(masteries);
  return list
    .filter((m) => m.masteryScore >= 75 || m.status === 'strong' || m.status === 'mastered')
    .sort((a, b) => b.masteryScore - a.masteryScore) // Highest mastery first
    .slice(0, limit);
}

/**
 * 4. NEXT BEST LESSON
 * 
 * Strict Priority Order:
 * 1. Critical prerequisite weakness (< 40%)
 * 2. Unfinished required learning
 * 3. Weak topic needing reinforcement (40–59%)
 * 4. Scheduled spaced review
 * 5. Next curriculum sequence lesson
 * 6. Challenge / extension
 */
export function getRecommendedNextLesson(
  performanceEvents: LearnerPerformanceEvent[],
  masteries: Record<string, TopicMastery> | TopicMastery[],
  completedLessonIds: string[] = [],
  gradeOrProgramme = 'Grade 10',
  preferredSubject = 'Mathematics'
): NextBestLesson | null {
  const masteryList = Array.isArray(masteries) ? masteries : Object.values(masteries);
  const masteryMap: Record<string, TopicMastery> = {};
  for (const m of masteryList) {
    masteryMap[m.topic] = m;
  }

  // Priority 1: Check if any topic the learner is attempting has an unmet critical prerequisite (< 40% mastery)
  for (const [targetTopic, prereqInfo] of Object.entries(CURRICULUM_PREREQUISITES)) {
    const targetM = masteryMap[targetTopic];
    const prereqM = masteryMap[prereqInfo.prerequisiteTopic];

    // If learner is working on target topic, but prerequisite is weak or missing
    if (targetM && (!prereqM || prereqM.masteryScore < 40)) {
      return {
        lessonId: `lesson-prereq-${prereqInfo.prerequisiteTopic.toLowerCase().replace(/\s+/g, '-')}`,
        title: `Master ${prereqInfo.prerequisiteTopic} First`,
        topic: prereqInfo.prerequisiteTopic,
        subject: prereqInfo.subject,
        gradeOrProgramme,
        pathway: 'school',
        reason: `Critical Prerequisite: ${prereqInfo.reason}`,
        priorityLabel: 'Prerequisite' as const,
        durationMinutes: 15,
        prerequisiteOf: targetTopic
      };
    }
  }

  // Priority 2: Unfinished required learning in current track
  for (const track of TRACKS) {
    for (const mod of track.modules) {
      for (const lesson of mod.lessons) {
        if (!completedLessonIds.includes(lesson.id)) {
          // Check if previous lesson in module was completed or if it's the first
          return {
            lessonId: lesson.id,
            title: lesson.title,
            topic: mod.title,
            subject: track.title,
            gradeOrProgramme,
            pathway: 'tracks',
            reason: `Continue your structured sequence in ${track.title} (${lesson.readTime || '15 min'}).`,
            priorityLabel: 'Unfinished' as const,
            durationMinutes: lesson.durationMinutes || 15
          };
        }
      }
    }
  }

  // Priority 3: Weak topic needing reinforcement (40–59% mastery)
  const weakTopic = masteryList.find(
    (m) => m.masteryScore >= 40 && m.masteryScore < 60
  );
  if (weakTopic) {
    return {
      lessonId: `lesson-reinforce-${weakTopic.topic.toLowerCase().replace(/\s+/g, '-')}`,
      title: `${weakTopic.topic} Step-by-Step Reinforcement`,
      topic: weakTopic.topic,
      subject: weakTopic.subject,
      gradeOrProgramme: weakTopic.gradeOrProgramme || gradeOrProgramme,
      pathway: 'school',
      reason: `Reinforce ${weakTopic.topic} because your current accuracy is ${weakTopic.accuracy}%.`,
      priorityLabel: 'Weak Area' as const,
      durationMinutes: 12
    };
  }

  // Priority 4: Scheduled Spaced Review (topics > 10 days old)
  const dueReview = masteryList.find(
    (m) => m.daysSincePractice >= 10 && m.masteryScore >= 60
  );
  if (dueReview) {
    return {
      lessonId: `lesson-review-${dueReview.topic.toLowerCase().replace(/\s+/g, '-')}`,
      title: `Quick Spaced Review: ${dueReview.topic}`,
      topic: dueReview.topic,
      subject: dueReview.subject,
      gradeOrProgramme: dueReview.gradeOrProgramme || gradeOrProgramme,
      pathway: 'school',
      reason: `Spaced Review: It's been ${dueReview.daysSincePractice} days since you last practiced ${dueReview.topic}.`,
      priorityLabel: 'Spaced Review' as const,
      durationMinutes: 10
    };
  }

  // Priority 5: Next Curriculum Lesson from School CAPS or TVET
  const matchingGrade = SCHOOL_GRADES.find(
    (g) => g.name.toLowerCase().includes(gradeOrProgramme.toLowerCase()) || g.id === 'grade-10'
  ) || SCHOOL_GRADES[10];

  const matchingSubject = matchingGrade.subjects.find(
    (s) => s.name.toLowerCase().includes(preferredSubject.toLowerCase())
  ) || matchingGrade.subjects[0];

  if (matchingSubject && matchingSubject.terms[0]?.topics[0]?.subtopics[0]?.lessons[0]) {
    const curLesson = matchingSubject.terms[0].topics[0].subtopics[0].lessons[0];
    const curTopic = matchingSubject.terms[0].topics[0].title;
    return {
      lessonId: curLesson.id,
      title: curLesson.title,
      topic: curTopic,
      subject: matchingSubject.name,
      gradeOrProgramme: matchingGrade.name,
      pathway: 'school',
      reason: `Next curriculum unit in standard CAPS sequence for ${matchingGrade.name}.`,
      priorityLabel: 'Next Lesson' as const,
      durationMinutes: curLesson.readTimeMinutes || 15
    };
  }

  // Priority 6: Challenge / Extension (for learners with strong mastery across topics)
  const strongTopic = masteryList.find((m) => m.masteryScore >= 80);
  if (strongTopic) {
    return {
      lessonId: `lesson-challenge-${strongTopic.topic.toLowerCase().replace(/\s+/g, '-')}`,
      title: `Advanced Problem Solving: ${strongTopic.topic}`,
      topic: strongTopic.topic,
      subject: strongTopic.subject,
      gradeOrProgramme,
      pathway: 'school',
      reason: `Challenge: You've achieved ${strongTopic.masteryScore}% mastery in ${strongTopic.topic}. Ready for higher-order exam questions.`,
      priorityLabel: 'Challenge' as const,
      durationMinutes: 20
    };
  }

  return null;
}

/**
 * 5. PERSONALIZED RECOMMENDATIONS GENERATOR
 * Every recommendation includes an explicit reason.
 */
export function generateRecommendations(
  masteries: Record<string, TopicMastery> | TopicMastery[],
  completedLessonIds: string[] = [],
  studyPlansCount = 0
): LearningRecommendation[] {
  const list = Array.isArray(masteries) ? masteries : Object.values(masteries);
  const recs: LearningRecommendation[] = [];

  // Rec 1: Weakest topic practice
  const weakest = list.filter((m) => m.masteryScore < 60).sort((a, b) => a.masteryScore - b.masteryScore)[0];
  if (weakest) {
    recs.push({
      id: `rec-weak-${weakest.topic.toLowerCase().replace(/\s+/g, '-')}`,
      type: 'practice_weak',
      title: `Practice ${weakest.topic}`,
      description: `Target ${weakest.weakSubtopics[0] || 'core problem areas'} with progressive feedback.`,
      reason: `Practice ${weakest.topic} because your recent accuracy is ${weakest.accuracy}%.`,
      priority: 1,
      priorityLabel: 'Weak Area',
      subject: weakest.subject,
      topic: weakest.topic,
      recommendedDifficulty: weakest.recommendedDifficulty,
      targetTab: 'practice',
      actionData: {
        topic: weakest.topic,
        difficulty: weakest.recommendedDifficulty,
        questionCount: 5
      },
      estimatedMinutes: 10,
      createdAt: new Date().toISOString()
    });

    // Also recommend Socratic AI Tutor explanation for very low mastery
    if (weakest.masteryScore < 40) {
      recs.push({
        id: `rec-tutor-${weakest.topic.toLowerCase().replace(/\s+/g, '-')}`,
        type: 'ask_ai_tutor',
        title: `Ask AI Tutor: Break Down ${weakest.topic}`,
        description: `Get step-by-step guidance in your preferred language using everyday analogies.`,
        reason: `Your mastery in ${weakest.topic} is ${weakest.masteryScore}%. An intuitive Socratic explanation can build core confidence.`,
        priority: 2,
        priorityLabel: 'Prerequisite',
        subject: weakest.subject,
        topic: weakest.topic,
        targetTab: 'tutor',
        actionData: {
          topic: weakest.topic,
          tutorMode: 'simplify'
        },
        estimatedMinutes: 8,
        createdAt: new Date().toISOString()
      });
    }
  }

  // Rec 2: Spaced review for older mastered/basic topics
  const reviewDue = list.find((m) => m.daysSincePractice >= 7 && m.masteryScore >= 60);
  if (reviewDue) {
    recs.push({
      id: `rec-review-${reviewDue.topic.toLowerCase().replace(/\s+/g, '-')}`,
      type: 'review_previous',
      title: `Review ${reviewDue.topic}`,
      description: `Quick 5-minute refresher quiz to reinforce long-term memory retention.`,
      reason: `You last practiced ${reviewDue.topic} ${reviewDue.daysSincePractice} days ago. A quick recall session strengthens retention.`,
      priority: 3,
      priorityLabel: 'Spaced Review',
      subject: reviewDue.subject,
      topic: reviewDue.topic,
      recommendedDifficulty: 'medium',
      targetTab: 'practice',
      actionData: {
        topic: reviewDue.topic,
        difficulty: 'medium',
        questionCount: 3
      },
      estimatedMinutes: 5,
      createdAt: new Date().toISOString()
    });
  }

  // Rec 3: Advanced Challenge for strong topic
  const strong = list.find((m) => m.masteryScore >= 80);
  if (strong) {
    recs.push({
      id: `rec-strong-${strong.topic.toLowerCase().replace(/\s+/g, '-')}`,
      type: 'attempt_harder',
      title: `Challenge: Advanced ${strong.topic}`,
      description: `Tackle complex exam-level questions designed to sharpen critical reasoning.`,
      reason: `High Mastery: You scored ${strong.masteryScore}% in ${strong.topic}. Stretch your capabilities with hard problems.`,
      priority: 5,
      priorityLabel: 'Challenge',
      subject: strong.subject,
      topic: strong.topic,
      recommendedDifficulty: 'hard',
      targetTab: 'practice',
      actionData: {
        topic: strong.topic,
        difficulty: 'hard',
        questionCount: 4
      },
      estimatedMinutes: 15,
      createdAt: new Date().toISOString()
    });
  }

  // Rec 4: Study Plan recommendation if none active
  if (studyPlansCount === 0) {
    recs.push({
      id: 'rec-study-plan',
      type: 'create_study_plan',
      title: 'Generate Personalized Study Schedule',
      description: 'Set your exam date and study hours to let BrightPath pace your daily learning.',
      reason: 'Learners with structured study plans maintain 3x higher completion rates.',
      priority: 4,
      priorityLabel: 'Unfinished',
      subject: 'All Subjects',
      topic: 'Exam Readiness',
      targetTab: 'home',
      actionData: {},
      estimatedMinutes: 3,
      createdAt: new Date().toISOString()
    });
  }

  return recs.slice(0, 5);
}

/**
 * 6. PERSONALIZED PRACTICE GENERATOR
 * Adapts difficulty based on mastery level and recent mistakes.
 */
export function getRecommendedPractice(
  topic: string,
  masteries: Record<string, TopicMastery> | TopicMastery[]
): {
  difficulty: AdaptiveDifficulty;
  targetQuestionsCount: number;
  focusSubtopic?: string;
  guidanceHint: string;
} {
  const list = Array.isArray(masteries) ? masteries : Object.values(masteries);
  const mastery = list.find((m) => m.topic.toLowerCase() === topic.toLowerCase());

  if (!mastery || mastery.confidence === 'insufficient_data') {
    return {
      difficulty: 'medium',
      targetQuestionsCount: 5,
      guidanceHint: 'Standard diagnostic session to assess your current understanding.'
    };
  }

  if (mastery.masteryScore < 50 || mastery.accuracy < 50) {
    return {
      difficulty: 'easy',
      targetQuestionsCount: 5,
      focusSubtopic: mastery.weakSubtopics[0],
      guidanceHint: `Foundational practice focusing on step-by-step concepts in ${mastery.weakSubtopics[0] || topic}.`
    };
  }

  if (mastery.masteryScore >= 80 && mastery.recentScores.every((s) => s >= 75)) {
    return {
      difficulty: 'hard',
      targetQuestionsCount: 4,
      guidanceHint: 'Multi-step synthesis questions calibrated for exam distinction level.'
    };
  }

  return {
    difficulty: 'medium',
    targetQuestionsCount: 5,
    focusSubtopic: mastery.weakSubtopics[0],
    guidanceHint: `Balanced practice covering standard application questions in ${topic}.`
  };
}

/**
 * 7. SPACED REVIEW CALCULATION
 * 
 * Strategy:
 * - Weak (<60): review within 2 days
 * - Developing/Basic (60-74): review within 5 days
 * - Strong (75-89): review within 10 days
 * - Mastered (90+): review after 18-21 days
 */
export function calculateReviewPriority(
  mastery: TopicMastery,
  now: Date = new Date()
): SpacedReviewSchedule {
  let recommendedIntervalDays = 7;
  let urgency: 'high' | 'medium' | 'low' | 'none' = 'none';

  if (mastery.masteryScore < 60) {
    recommendedIntervalDays = 2;
  } else if (mastery.masteryScore < 75) {
    recommendedIntervalDays = 5;
  } else if (mastery.masteryScore < 90) {
    recommendedIntervalDays = 10;
  } else {
    recommendedIntervalDays = 18;
  }

  const daysSince = mastery.daysSincePractice;
  const dueForReview = daysSince >= recommendedIntervalDays;

  if (dueForReview) {
    if (daysSince >= recommendedIntervalDays * 2) {
      urgency = 'high';
    } else if (daysSince >= recommendedIntervalDays + 2) {
      urgency = 'medium';
    } else {
      urgency = 'low';
    }
  }

  let reason = '';
  if (dueForReview) {
    reason = `Scheduled review: Last practiced ${daysSince} days ago (recommended cadence: every ${recommendedIntervalDays} days).`;
  } else {
    reason = `Memory is fresh: Next suggested review in ${recommendedIntervalDays - daysSince} days.`;
  }

  return {
    topic: mastery.topic,
    subject: mastery.subject,
    gradeOrProgramme: mastery.gradeOrProgramme,
    mastery: mastery.masteryScore,
    dueForReview,
    urgency,
    daysSincePractice: daysSince,
    recommendedIntervalDays,
    reason
  };
}

/**
 * 8. LEARNER STREAK & PROGRESS
 * Non-punitive: Missed day shows gentle encouragement rather than negative penalty.
 */
export function updateLearningStreak(
  learnedDays: string[] = [],
  lastActiveDate?: string,
  now: Date = new Date()
): LearnerStreakInfo {
  const todayStr = now.toISOString().split('T')[0];
  const uniqueDays = Array.from(new Set(learnedDays)).sort();

  // Build last 7 days visual chart
  const weeklyActivity: Array<{ day: string; date: string; minutes: number; completed: boolean }> = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dStr = d.toISOString().split('T')[0];
    const completed = uniqueDays.includes(dStr);
    weeklyActivity.push({
      day: dayNames[d.getDay()],
      date: dStr,
      minutes: completed ? 25 : 0,
      completed
    });
  }

  if (uniqueDays.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: todayStr,
      isStreakProtected: false,
      streakMessage: 'Start your learning journey today! Every question answered builds your future.',
      weeklyActivity
    };
  }

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  // Calculate streaks across chronological unique days
  for (let i = 0; i < uniqueDays.length; i++) {
    if (i === 0) {
      tempStreak = 1;
    } else {
      const prev = new Date(uniqueDays[i - 1]);
      const curr = new Date(uniqueDays[i]);
      const diffDays = Math.round((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        tempStreak++;
      } else {
        tempStreak = 1;
      }
    }
    if (tempStreak > longestStreak) {
      longestStreak = tempStreak;
    }
  }

  // Check if active today or yesterday
  const lastLearnedDate = uniqueDays[uniqueDays.length - 1];
  const diffFromToday = Math.round(
    (now.getTime() - new Date(lastLearnedDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  let isStreakProtected = false;
  if (diffFromToday === 0) {
    currentStreak = tempStreak;
  } else if (diffFromToday === 1) {
    currentStreak = tempStreak;
    isStreakProtected = true;
  } else {
    // Missed more than 1 day - restart streak gently without punishment
    currentStreak = 0;
  }

  let streakMessage = '';
  if (currentStreak === 0) {
    streakMessage = 'No stress — picking up where you left off is what matters most! Complete a lesson to restart your streak.';
  } else if (currentStreak === 1) {
    streakMessage = 'Awesome start! Study tomorrow to reach a 2-day streak.';
  } else {
    streakMessage = `🔥 Brilliant consistency! You've learned for ${currentStreak} days in a row.`;
  }

  return {
    currentStreak,
    longestStreak: Math.max(longestStreak, currentStreak),
    lastActiveDate: lastLearnedDate,
    isStreakProtected,
    streakMessage,
    weeklyActivity
  };
}

/**
 * 9. LEARNER INSIGHTS & EXPLANATIONS
 */
export function getLearnerInsights(
  masteries: Record<string, TopicMastery> | TopicMastery[],
  streakInfo: LearnerStreakInfo,
  events: LearnerPerformanceEvent[] = []
): LearnerInsights {
  const list = Array.isArray(masteries) ? masteries : Object.values(masteries);

  if (list.length === 0 || events.length === 0) {
    return {
      strongestSubject: 'Mathematics',
      strongestTopic: 'Curriculum Foundations',
      summaryText: 'Welcome to BrightPath Academy! As you practice lessons and ask questions, your adaptive dashboard will reveal your individual strengths and high-yield focus areas.',
      encouragementText: 'Every question you answer helps tailor your personal study plan.'
    };
  }

  // Find strongest topic
  const sortedByMastery = [...list].sort((a, b) => b.masteryScore - a.masteryScore);
  const strongestTopicObj = sortedByMastery[0];

  // Group by subject to find strongest subject
  const subjectScores: Record<string, { totalScore: number; count: number }> = {};
  for (const m of list) {
    if (!subjectScores[m.subject]) {
      subjectScores[m.subject] = { totalScore: 0, count: 0 };
    }
    subjectScores[m.subject].totalScore += m.masteryScore;
    subjectScores[m.subject].count += 1;
  }

  let strongestSubject = 'Mathematics';
  let bestAvg = 0;
  for (const [subj, data] of Object.entries(subjectScores)) {
    const avg = data.totalScore / data.count;
    if (avg > bestAvg) {
      bestAvg = avg;
      strongestSubject = subj;
    }
  }

  // Find most improved or weakest
  const weakTopicObj = sortedByMastery.filter((m) => m.masteryScore < 60)[0];
  const improvedTopicObj = list.find((m) => m.trend === 'improving' && m.improvementPercentage > 0);

  let summaryText = `You're strongest in ${strongestSubject}, demonstrating ${strongestTopicObj.masteryScore}% mastery in ${strongestTopicObj.topic}.`;
  if (weakTopicObj) {
    summaryText += ` ${weakTopicObj.topic} needs more practice to reach strong exam readiness.`;
  }

  let encouragementText = 'Keep up the great momentum! Your deliberate practice is translating into real curriculum mastery.';
  if (streakInfo.currentStreak >= 3) {
    encouragementText = `Outstanding dedication with a ${streakInfo.currentStreak}-day learning streak! You are building solid academic stamina.`;
  }

  return {
    strongestSubject,
    strongestTopic: strongestTopicObj.topic,
    topWeakness: weakTopicObj ? weakTopicObj.topic : undefined,
    summaryText,
    encouragementText,
    monthlyImprovement: improvedTopicObj
      ? {
          topic: improvedTopicObj.topic,
          changePercent: improvedTopicObj.improvementPercentage
        }
      : undefined
  };
}

export function computeAdaptiveDifficulty(
  recentAnswers: { correct: boolean; difficulty: AdaptiveDifficulty }[]
): {
  nextDifficulty: AdaptiveDifficulty;
  changeReason: string;
  consecutiveCorrect: number;
  consecutiveIncorrect: number;
} {
  if (!recentAnswers || recentAnswers.length === 0) {
    return {
      nextDifficulty: 'medium',
      changeReason: 'Starting at standard baseline difficulty.',
      consecutiveCorrect: 0,
      consecutiveIncorrect: 0
    };
  }

  // Count consecutive correct or incorrect answers from the end
  let consecutiveCorrect = 0;
  let consecutiveIncorrect = 0;

  for (let i = recentAnswers.length - 1; i >= 0; i--) {
    if (recentAnswers[i].correct) {
      if (consecutiveIncorrect === 0) {
        consecutiveCorrect++;
      } else {
        break;
      }
    } else {
      if (consecutiveCorrect === 0) {
        consecutiveIncorrect++;
      } else {
        break;
      }
    }
  }

  const currentDiff = recentAnswers[recentAnswers.length - 1].difficulty;

  // Escalation: 2 consecutive correct answers -> step up
  if (consecutiveCorrect >= 2) {
    if (currentDiff === 'easy') {
      return {
        nextDifficulty: 'medium',
        changeReason: 'Great progress! Stepping up to Medium difficulty application questions.',
        consecutiveCorrect,
        consecutiveIncorrect: 0
      };
    }
    if (currentDiff === 'medium') {
      return {
        nextDifficulty: 'hard',
        changeReason: 'Excellent mastery! Escalating to Hard higher-order synthesis questions.',
        consecutiveCorrect,
        consecutiveIncorrect: 0
      };
    }
    return {
      nextDifficulty: 'hard',
      changeReason: 'Outstanding performance at maximum challenge level!',
      consecutiveCorrect,
      consecutiveIncorrect: 0
    };
  }

  // De-escalation: 2 consecutive incorrect answers -> step down
  if (consecutiveIncorrect >= 2) {
    if (currentDiff === 'hard') {
      return {
        nextDifficulty: 'medium',
        changeReason: 'Stepping back to Medium to solidify fundamental steps.',
        consecutiveCorrect: 0,
        consecutiveIncorrect
      };
    }
    if (currentDiff === 'medium') {
      return {
        nextDifficulty: 'easy',
        changeReason: 'Reducing to Easy for step-by-step foundational reinforcement.',
        consecutiveCorrect: 0,
        consecutiveIncorrect
      };
    }
    return {
      nextDifficulty: 'easy',
      changeReason: 'Focusing on foundational concepts with hints enabled.',
      consecutiveCorrect: 0,
      consecutiveIncorrect
    };
  }

  return {
    nextDifficulty: currentDiff,
    changeReason: `Maintaining ${currentDiff} difficulty.`,
    consecutiveCorrect,
    consecutiveIncorrect
  };
}

/**
 * 11. SAMPLE PERFORMANCE EVENTS FOR SOUTH AFRICAN CAPS & TVET
 * Realistic performance history showcasing weak areas, strong areas, and review items.
 */
export function getSampleLearnerEvents(learnerId = 'learner_sipho_mokoena'): LearnerPerformanceEvent[] {
  const now = Date.now();
  const DAY_MS = 24 * 60 * 60 * 1000;

  return [
    // --- Algebra & Factorization (STRONG AREA: ~87% mastery, improving) ---
    {
      id: 'evt-alg-1',
      learnerId,
      gradeOrProgramme: 'Grade 10',
      subject: 'Mathematics',
      module: 'Term 1: Number & Algebra',
      topic: 'Algebra & Factorization',
      subtopic: 'Trinomial Factorization',
      questionId: 'q-alg-1',
      questionType: 'multiple_choice',
      correct: true,
      score: 1,
      percentage: 100,
      difficulty: 'medium',
      timeSpentSeconds: 45,
      attemptsCount: 1,
      hintsUsed: 0,
      source: 'practice',
      completed: true,
      timestamp: new Date(now - 6 * DAY_MS).toISOString()
    },
    {
      id: 'evt-alg-2',
      learnerId,
      gradeOrProgramme: 'Grade 10',
      subject: 'Mathematics',
      module: 'Term 1: Number & Algebra',
      topic: 'Algebra & Factorization',
      subtopic: 'Difference of Two Squares',
      questionId: 'q-alg-2',
      questionType: 'calculation',
      correct: true,
      score: 1,
      percentage: 100,
      difficulty: 'medium',
      timeSpentSeconds: 52,
      attemptsCount: 1,
      hintsUsed: 0,
      source: 'practice',
      completed: true,
      timestamp: new Date(now - 5 * DAY_MS).toISOString()
    },
    {
      id: 'evt-alg-3',
      learnerId,
      gradeOrProgramme: 'Grade 10',
      subject: 'Mathematics',
      module: 'Term 1: Number & Algebra',
      topic: 'Algebra & Factorization',
      subtopic: 'Grouping in Pairs',
      questionId: 'q-alg-3',
      questionType: 'short_answer',
      correct: true,
      score: 1,
      percentage: 100,
      difficulty: 'hard',
      timeSpentSeconds: 85,
      attemptsCount: 1,
      hintsUsed: 0,
      source: 'assessment',
      completed: true,
      timestamp: new Date(now - 3 * DAY_MS).toISOString()
    },
    {
      id: 'evt-alg-4',
      learnerId,
      gradeOrProgramme: 'Grade 10',
      subject: 'Mathematics',
      module: 'Term 1: Number & Algebra',
      topic: 'Algebra & Factorization',
      subtopic: 'Common Monomial Factors',
      questionId: 'q-alg-4',
      questionType: 'multiple_choice',
      correct: true,
      score: 1,
      percentage: 100,
      difficulty: 'hard',
      timeSpentSeconds: 65,
      attemptsCount: 1,
      hintsUsed: 0,
      source: 'practice',
      completed: true,
      timestamp: new Date(now - 1 * DAY_MS).toISOString()
    },
    {
      id: 'evt-alg-5',
      learnerId,
      gradeOrProgramme: 'Grade 10',
      subject: 'Mathematics',
      module: 'Term 1: Number & Algebra',
      topic: 'Algebra & Factorization',
      subtopic: 'Higher Degree Factorization',
      questionId: 'q-alg-5',
      questionType: 'calculation',
      correct: true,
      score: 1,
      percentage: 100,
      difficulty: 'hard',
      timeSpentSeconds: 90,
      attemptsCount: 1,
      hintsUsed: 0,
      source: 'practice',
      completed: true,
      timestamp: new Date(now - 2 * 60 * 60 * 1000).toISOString()
    },

    // --- Fractions & Ratios (WEAK AREA: ~48% mastery, repeated equivalent fractions mistakes) ---
    {
      id: 'evt-frac-1',
      learnerId,
      gradeOrProgramme: 'Grade 10',
      subject: 'Mathematics',
      module: 'Term 1: Number & Algebra',
      topic: 'Fractions & Ratios',
      subtopic: 'Equivalent Fractions',
      questionId: 'q-frac-1',
      questionType: 'calculation',
      correct: false,
      score: 0,
      percentage: 0,
      difficulty: 'medium',
      timeSpentSeconds: 70,
      attemptsCount: 2,
      hintsUsed: 1,
      source: 'practice',
      completed: true,
      timestamp: new Date(now - 4 * DAY_MS).toISOString()
    },
    {
      id: 'evt-frac-2',
      learnerId,
      gradeOrProgramme: 'Grade 10',
      subject: 'Mathematics',
      module: 'Term 1: Number & Algebra',
      topic: 'Fractions & Ratios',
      subtopic: 'Equivalent Fractions',
      questionId: 'q-frac-2',
      questionType: 'multiple_choice',
      correct: false,
      score: 0,
      percentage: 0,
      difficulty: 'medium',
      timeSpentSeconds: 60,
      attemptsCount: 2,
      hintsUsed: 1,
      source: 'practice',
      completed: true,
      timestamp: new Date(now - 3 * DAY_MS).toISOString()
    },
    {
      id: 'evt-frac-3',
      learnerId,
      gradeOrProgramme: 'Grade 10',
      subject: 'Mathematics',
      module: 'Term 1: Number & Algebra',
      topic: 'Fractions & Ratios',
      subtopic: 'Simplifying Common Denominators',
      questionId: 'q-frac-3',
      questionType: 'calculation',
      correct: true,
      score: 1,
      percentage: 100,
      difficulty: 'easy',
      timeSpentSeconds: 40,
      attemptsCount: 1,
      hintsUsed: 0,
      source: 'practice',
      completed: true,
      timestamp: new Date(now - 2 * DAY_MS).toISOString()
    },
    {
      id: 'evt-frac-4',
      learnerId,
      gradeOrProgramme: 'Grade 10',
      subject: 'Mathematics',
      module: 'Term 1: Number & Algebra',
      topic: 'Fractions & Ratios',
      subtopic: 'Equivalent Fractions',
      questionId: 'q-frac-4',
      questionType: 'calculation',
      correct: false,
      score: 0,
      percentage: 0,
      difficulty: 'medium',
      timeSpentSeconds: 85,
      attemptsCount: 3,
      hintsUsed: 2,
      source: 'quiz',
      completed: true,
      timestamp: new Date(now - 1 * DAY_MS).toISOString()
    },
    {
      id: 'evt-frac-5',
      learnerId,
      gradeOrProgramme: 'Grade 10',
      subject: 'Mathematics',
      module: 'Term 1: Number & Algebra',
      topic: 'Fractions & Ratios',
      subtopic: 'Ratio Word Problems',
      questionId: 'q-frac-5',
      questionType: 'short_answer',
      correct: true,
      score: 1,
      percentage: 100,
      difficulty: 'easy',
      timeSpentSeconds: 50,
      attemptsCount: 1,
      hintsUsed: 0,
      source: 'practice',
      completed: true,
      timestamp: new Date(now - 18 * 60 * 60 * 1000).toISOString()
    },

    // --- Quadratic Equations (CRITICAL PREREQUISITE GAP: attempted but low ~32%) ---
    {
      id: 'evt-quad-1',
      learnerId,
      gradeOrProgramme: 'Grade 10',
      subject: 'Mathematics',
      module: 'Term 1: Equations & Inequalities',
      topic: 'Quadratic Equations',
      subtopic: 'Solving by Factorization',
      questionId: 'q-quad-1',
      questionType: 'calculation',
      correct: false,
      score: 0,
      percentage: 0,
      difficulty: 'medium',
      timeSpentSeconds: 110,
      attemptsCount: 2,
      hintsUsed: 2,
      source: 'quiz',
      completed: true,
      timestamp: new Date(now - 2 * DAY_MS).toISOString()
    },
    {
      id: 'evt-quad-2',
      learnerId,
      gradeOrProgramme: 'Grade 10',
      subject: 'Mathematics',
      module: 'Term 1: Equations & Inequalities',
      topic: 'Quadratic Equations',
      subtopic: 'Zero Product Property',
      questionId: 'q-quad-2',
      questionType: 'multiple_choice',
      correct: true,
      score: 1,
      percentage: 100,
      difficulty: 'easy',
      timeSpentSeconds: 65,
      attemptsCount: 1,
      hintsUsed: 1,
      source: 'practice',
      completed: true,
      timestamp: new Date(now - 1 * DAY_MS).toISOString()
    },
    {
      id: 'evt-quad-3',
      learnerId,
      gradeOrProgramme: 'Grade 10',
      subject: 'Mathematics',
      module: 'Term 1: Equations & Inequalities',
      topic: 'Quadratic Equations',
      subtopic: 'Trinomial Root Extraction',
      questionId: 'q-quad-3',
      questionType: 'calculation',
      correct: false,
      score: 0,
      percentage: 0,
      difficulty: 'hard',
      timeSpentSeconds: 120,
      attemptsCount: 3,
      hintsUsed: 2,
      source: 'assessment',
      completed: true,
      timestamp: new Date(now - 12 * 60 * 60 * 1000).toISOString()
    },

    // --- Newton's Laws of Motion (WEAK AREA: ~54% mastery, Free-Body Diagram struggles) ---
    {
      id: 'evt-newt-1',
      learnerId,
      gradeOrProgramme: 'Grade 10',
      subject: 'Physical Sciences',
      module: 'Term 2: Mechanics',
      topic: "Newton's Laws of Motion",
      subtopic: 'Free-Body Diagrams (FBD)',
      questionId: 'q-newt-1',
      questionType: 'conceptual',
      correct: false,
      score: 0,
      percentage: 0,
      difficulty: 'medium',
      timeSpentSeconds: 95,
      attemptsCount: 2,
      hintsUsed: 1,
      source: 'practice',
      completed: true,
      timestamp: new Date(now - 5 * DAY_MS).toISOString()
    },
    {
      id: 'evt-newt-2',
      learnerId,
      gradeOrProgramme: 'Grade 10',
      subject: 'Physical Sciences',
      module: 'Term 2: Mechanics',
      topic: "Newton's Laws of Motion",
      subtopic: 'First Law of Inertia',
      questionId: 'q-newt-2',
      questionType: 'multiple_choice',
      correct: true,
      score: 1,
      percentage: 100,
      difficulty: 'easy',
      timeSpentSeconds: 38,
      attemptsCount: 1,
      hintsUsed: 0,
      source: 'practice',
      completed: true,
      timestamp: new Date(now - 4 * DAY_MS).toISOString()
    },
    {
      id: 'evt-newt-3',
      learnerId,
      gradeOrProgramme: 'Grade 10',
      subject: 'Physical Sciences',
      module: 'Term 2: Mechanics',
      topic: "Newton's Laws of Motion",
      subtopic: 'Free-Body Diagrams (FBD)',
      questionId: 'q-newt-3',
      questionType: 'conceptual',
      correct: false,
      score: 0,
      percentage: 0,
      difficulty: 'medium',
      timeSpentSeconds: 105,
      attemptsCount: 2,
      hintsUsed: 2,
      source: 'practice',
      completed: true,
      timestamp: new Date(now - 2 * DAY_MS).toISOString()
    },
    {
      id: 'evt-newt-4',
      learnerId,
      gradeOrProgramme: 'Grade 10',
      subject: 'Physical Sciences',
      module: 'Term 2: Mechanics',
      topic: "Newton's Laws of Motion",
      subtopic: 'Second Law F=ma',
      questionId: 'q-newt-4',
      questionType: 'calculation',
      correct: true,
      score: 1,
      percentage: 100,
      difficulty: 'medium',
      timeSpentSeconds: 75,
      attemptsCount: 1,
      hintsUsed: 0,
      source: 'assessment',
      completed: true,
      timestamp: new Date(now - 14 * 60 * 60 * 1000).toISOString()
    },

    // --- Electric Circuits & Ohm's Law (SPACED REVIEW CANDIDATE: practiced 13 days ago, 78% mastery) ---
    {
      id: 'evt-circ-1',
      learnerId,
      gradeOrProgramme: 'Grade 10',
      subject: 'Physical Sciences',
      module: 'Term 3: Electricity & Magnetism',
      topic: "Electric Circuits & Ohm's Law",
      subtopic: "Ohm's Law V=IR",
      questionId: 'q-circ-1',
      questionType: 'calculation',
      correct: true,
      score: 1,
      percentage: 100,
      difficulty: 'medium',
      timeSpentSeconds: 65,
      attemptsCount: 1,
      hintsUsed: 0,
      source: 'practice',
      completed: true,
      timestamp: new Date(now - 14 * DAY_MS).toISOString()
    },
    {
      id: 'evt-circ-2',
      learnerId,
      gradeOrProgramme: 'Grade 10',
      subject: 'Physical Sciences',
      module: 'Term 3: Electricity & Magnetism',
      topic: "Electric Circuits & Ohm's Law",
      subtopic: 'Series Resistor Combinations',
      questionId: 'q-circ-2',
      questionType: 'calculation',
      correct: true,
      score: 1,
      percentage: 100,
      difficulty: 'medium',
      timeSpentSeconds: 80,
      attemptsCount: 1,
      hintsUsed: 0,
      source: 'practice',
      completed: true,
      timestamp: new Date(now - 13 * DAY_MS).toISOString()
    },
    {
      id: 'evt-circ-3',
      learnerId,
      gradeOrProgramme: 'Grade 10',
      subject: 'Physical Sciences',
      module: 'Term 3: Electricity & Magnetism',
      topic: "Electric Circuits & Ohm's Law",
      subtopic: 'Parallel Branch Currents',
      questionId: 'q-circ-3',
      questionType: 'calculation',
      correct: false,
      score: 0,
      percentage: 0,
      difficulty: 'hard',
      timeSpentSeconds: 95,
      attemptsCount: 2,
      hintsUsed: 1,
      source: 'practice',
      completed: true,
      timestamp: new Date(now - 13 * DAY_MS).toISOString()
    },
    {
      id: 'evt-circ-4',
      learnerId,
      gradeOrProgramme: 'Grade 10',
      subject: 'Physical Sciences',
      module: 'Term 3: Electricity & Magnetism',
      topic: "Electric Circuits & Ohm's Law",
      subtopic: 'Voltmeter Connection Principles',
      questionId: 'q-circ-4',
      questionType: 'multiple_choice',
      correct: true,
      score: 1,
      percentage: 100,
      difficulty: 'easy',
      timeSpentSeconds: 42,
      attemptsCount: 1,
      hintsUsed: 0,
      source: 'assessment',
      completed: true,
      timestamp: new Date(now - 12 * DAY_MS).toISOString()
    }
  ];
}

/**
 * 10. OVERALL ADAPTIVE PROFILE CALCULATOR
 */
export function buildAdaptiveProfile(
  events: LearnerPerformanceEvent[] = [],
  completedLessonIds: string[] = [],
  learnedDays: string[] = [],
  studyPlansCount = 0,
  onboardingData?: Partial<LearnerOnboardingGoals>,
  thresholds: MasteryThresholds = DEFAULT_MASTERY_THRESHOLDS,
  now: Date = new Date()
): AdaptiveProfile {
  // Group events by topic
  const eventsByTopic: Record<string, LearnerPerformanceEvent[]> = {};
  for (const e of events) {
    if (!eventsByTopic[e.topic]) {
      eventsByTopic[e.topic] = [];
    }
    eventsByTopic[e.topic].push(e);
  }

  // Calculate mastery for each topic
  const topicMasteries: Record<string, TopicMastery> = {};
  for (const [topic, topicEvents] of Object.entries(eventsByTopic)) {
    topicMasteries[topic] = calculateTopicMastery(topicEvents, thresholds, now);
  }

  const masteryList = Object.values(topicMasteries);
  const weakAreas = identifyWeakAreas(masteryList);
  const strongAreas = identifyStrongAreas(masteryList);

  const grade = onboardingData?.selectedGrade || (events[0]?.gradeOrProgramme) || 'Grade 10';
  const nextBestLesson = getRecommendedNextLesson(
    events,
    topicMasteries,
    completedLessonIds,
    grade
  );

  const recommendations = generateRecommendations(
    topicMasteries,
    completedLessonIds,
    studyPlansCount
  );

  const spacedReviews = masteryList.map((m) => calculateReviewPriority(m, now));

  const streak = updateLearningStreak(learnedDays, undefined, now);
  const insights = getLearnerInsights(topicMasteries, streak, events);

  // Overall statistics
  const totalQuestions = events.length;
  const correctCount = events.filter((e) => e.correct).length;
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const studyMinutes = Math.round(events.reduce((sum, e) => sum + (e.timeSpentSeconds || 60), 0) / 60);

  const avgMastery =
    masteryList.length > 0
      ? Math.round(masteryList.reduce((sum, m) => sum + m.masteryScore, 0) / masteryList.length)
      : 0;

  return {
    learnerId: events[0]?.learnerId || 'guest_learner',
    gradeOrProgramme: grade,
    topicMasteries,
    weakAreas,
    strongAreas,
    nextBestLesson,
    recommendations,
    spacedReviews,
    streak,
    insights,
    overallStats: {
      overallProgressPercent: avgMastery,
      totalLessonsCompleted: completedLessonIds.length,
      totalQuestionsAnswered: totalQuestions,
      practiceAccuracy: accuracy,
      totalStudyMinutes: studyMinutes
    },
    onboarding: {
      isConfigured: Boolean(onboardingData?.isConfigured || events.length > 0),
      selectedGrade: grade,
      focusSubjects: onboardingData?.focusSubjects || ['Mathematics', 'Physical Sciences'],
      weeklyHoursGoal: onboardingData?.weeklyHoursGoal || 5,
      preferredLanguage: onboardingData?.preferredLanguage || 'en'
    },
    lastUpdated: now.toISOString()
  };
}

export interface AdaptiveQuestionItem {
  id: string;
  topic: string;
  subject: string;
  difficulty: AdaptiveDifficulty;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  subtopic: string;
  hint: string;
}

export const ADAPTIVE_QUESTION_BANK: AdaptiveQuestionItem[] = [
  // --- Fractions & Ratios ---
  {
    id: 'ab-frac-e1',
    topic: 'Fractions & Ratios',
    subject: 'Mathematics',
    difficulty: 'easy',
    subtopic: 'Equivalent Fractions',
    question: 'Which of the following is equivalent to the fraction 3/4?',
    options: ['6/8', '9/16', '5/6', '7/12'],
    correctAnswer: '6/8',
    explanation: 'Multiplying both numerator and denominator of 3/4 by 2 gives (3 × 2) / (4 × 2) = 6/8.',
    hint: 'Multiply or divide the top and bottom by the same integer factor.'
  },
  {
    id: 'ab-frac-e2',
    topic: 'Fractions & Ratios',
    subject: 'Mathematics',
    difficulty: 'easy',
    subtopic: 'Simplifying Common Denominators',
    question: 'Calculate: 1/5 + 2/5 in simplest form.',
    options: ['3/5', '3/10', '2/25', '1/2'],
    correctAnswer: '3/5',
    explanation: 'When denominators are identical, add the numerators directly: (1 + 2) / 5 = 3/5.',
    hint: 'Keep the denominator the same and add the numerators.'
  },
  {
    id: 'ab-frac-m1',
    topic: 'Fractions & Ratios',
    subject: 'Mathematics',
    difficulty: 'medium',
    subtopic: 'Equivalent Fractions',
    question: 'Find the lowest common denominator (LCD) to add 2/3 and 3/4.',
    options: ['12', '7', '24', '6'],
    correctAnswer: '12',
    explanation: 'The least common multiple of 3 and 4 is 12 (3 × 4 = 12).',
    hint: 'List the multiples of 3 (3, 6, 9, 12...) and 4 (4, 8, 12...).'
  },
  {
    id: 'ab-frac-m2',
    topic: 'Fractions & Ratios',
    subject: 'Mathematics',
    difficulty: 'medium',
    subtopic: 'Ratio Word Problems',
    question: 'A recipe shares flour and sugar in the ratio 3:2. If 600g of flour is used, how much sugar is needed?',
    options: ['400g', '300g', '900g', '200g'],
    correctAnswer: '400g',
    explanation: '1 part = 600g ÷ 3 = 200g. Sugar = 2 parts = 2 × 200g = 400g.',
    hint: 'Divide the known quantity by its ratio part to find the unit value.'
  },
  {
    id: 'ab-frac-h1',
    topic: 'Fractions & Ratios',
    subject: 'Mathematics',
    difficulty: 'hard',
    subtopic: 'Algebraic Fractions',
    question: 'Simplify the algebraic fraction: (2x / 3) + (x / 6) - (x / 4).',
    options: ['7x / 12', '5x / 12', 'x / 2', '2x / 5'],
    correctAnswer: '7x / 12',
    explanation: 'The LCD of 3, 6, and 4 is 12. Converting: (8x + 2x - 3x) / 12 = 7x / 12.',
    hint: 'Find the common denominator 12 for all three denominators.'
  },

  // --- Algebra & Factorization ---
  {
    id: 'ab-alg-e1',
    topic: 'Algebra & Factorization',
    subject: 'Mathematics',
    difficulty: 'easy',
    subtopic: 'Common Monomial Factors',
    question: 'Factorize completely by taking out the highest common factor: 6x + 9.',
    options: ['3(2x + 3)', '3(2x + 9)', '6(x + 3)', '3x(2 + 3)'],
    correctAnswer: '3(2x + 3)',
    explanation: 'The highest common numerical factor of 6 and 9 is 3: 3(2x + 3).',
    hint: 'Look for the largest number that divides both 6 and 9 without remainder.'
  },
  {
    id: 'ab-alg-m1',
    topic: 'Algebra & Factorization',
    subject: 'Mathematics',
    difficulty: 'medium',
    subtopic: 'Difference of Two Squares',
    question: 'Factorize completely: x² - 49.',
    options: ['(x - 7)(x + 7)', '(x - 7)²', '(x + 7)²', '(x - 49)(x + 1)'],
    correctAnswer: '(x - 7)(x + 7)',
    explanation: 'Difference of two squares formula: a² - b² = (a - b)(a + b). Here a = x, b = 7.',
    hint: 'Recognize the pattern a² - b².'
  },
  {
    id: 'ab-alg-m2',
    topic: 'Algebra & Factorization',
    subject: 'Mathematics',
    difficulty: 'medium',
    subtopic: 'Trinomial Factorization',
    question: 'Factorize the quadratic trinomial: x² + 5x + 6.',
    options: ['(x + 2)(x + 3)', '(x + 1)(x + 6)', '(x - 2)(x - 3)', '(x + 5)(x + 1)'],
    correctAnswer: '(x + 2)(x + 3)',
    explanation: 'We need two numbers that multiply to +6 and add to +5. Those numbers are +2 and +3.',
    hint: 'Find two factors of 6 that add up to 5.'
  },
  {
    id: 'ab-alg-h1',
    topic: 'Algebra & Factorization',
    subject: 'Mathematics',
    difficulty: 'hard',
    subtopic: 'Grouping in Pairs',
    question: 'Factorize completely by grouping: 2ax + 2ay + bx + by.',
    options: ['(2a + b)(x + y)', '(2a + x)(b + y)', '2ab(x + y)', '(a + b)(2x + y)'],
    correctAnswer: '(2a + b)(x + y)',
    explanation: 'Group terms: 2a(x + y) + b(x + y) = (2a + b)(x + y).',
    hint: 'Factor out 2a from the first pair and b from the second pair.'
  },

  // --- Newton's Laws of Motion ---
  {
    id: 'ab-newt-e1',
    topic: "Newton's Laws of Motion",
    subject: 'Physical Sciences',
    difficulty: 'easy',
    subtopic: 'First Law of Inertia',
    question: "According to Newton's First Law, what happens to an object when the net external force acting on it is zero?",
    options: [
      'It maintains its state of rest or constant velocity in a straight line',
      'It immediately slows down and stops',
      'It accelerates continuously',
      'Its mass increases proportionally'
    ],
    correctAnswer: 'It maintains its state of rest or constant velocity in a straight line',
    explanation: "Newton's First Law states an object continues in its state of rest or uniform motion unless acted upon by a non-zero net force.",
    hint: 'Think about inertia in space where there is no friction.'
  },
  {
    id: 'ab-newt-m1',
    topic: "Newton's Laws of Motion",
    subject: 'Physical Sciences',
    difficulty: 'medium',
    subtopic: 'Second Law F=ma',
    question: 'A horizontal net force of 30 N is applied to a 6 kg crate on a frictionless floor. What is its acceleration?',
    options: ['5 m·s⁻²', '180 m·s⁻²', '0.2 m·s⁻²', '36 m·s⁻²'],
    correctAnswer: '5 m·s⁻²',
    explanation: 'F_net = m · a ⇒ a = F_net / m = 30 N / 6 kg = 5 m·s⁻².',
    hint: 'Use the formula a = F_net / m.'
  },
  {
    id: 'ab-newt-m2',
    topic: "Newton's Laws of Motion",
    subject: 'Physical Sciences',
    difficulty: 'medium',
    subtopic: 'Free-Body Diagrams (FBD)',
    question: 'A box rests on a horizontal desk. In a Free-Body Diagram of the box, which two forces act on it?',
    options: [
      'Gravitational force downwards and normal force upwards',
      'Normal force downwards and friction upwards',
      'Applied force forwards and gravity forwards',
      'Centripetal force and momentum'
    ],
    correctAnswer: 'Gravitational force downwards and normal force upwards',
    explanation: 'Gravity pulls the box downwards towards the Earth, and the desk exerts an equal normal force perpendicular upwards.',
    hint: 'What pulls down, and what supports it from falling through the table?'
  },
  {
    id: 'ab-newt-h1',
    topic: "Newton's Laws of Motion",
    subject: 'Physical Sciences',
    difficulty: 'hard',
    subtopic: 'Incline Plane Forces',
    question: 'A block of mass 10 kg sits on a 30° frictionless incline (g = 9.8 m·s⁻²). What is the component of gravitational force acting parallel down the slope?',
    options: ['49 N', '84.9 N', '98 N', '19.6 N'],
    correctAnswer: '49 N',
    explanation: 'F_parallel = m · g · sin(θ) = 10 × 9.8 × sin(30°) = 98 × 0.5 = 49 N.',
    hint: 'Remember that the parallel component along the incline is F_g · sin(θ).'
  },

  // --- Electric Circuits & Ohm's Law ---
  {
    id: 'ab-circ-e1',
    topic: "Electric Circuits & Ohm's Law",
    subject: 'Physical Sciences',
    difficulty: 'easy',
    subtopic: "Ohm's Law V=IR",
    question: "According to Ohm's Law, what is the mathematical relationship between potential difference (V), current (I), and resistance (R)?",
    options: ['V = I · R', 'I = V · R', 'R = V · I', 'V = I / R'],
    correctAnswer: 'V = I · R',
    explanation: 'Ohm’s Law states that potential difference is directly proportional to current through a conductor at constant temperature: V = IR.',
    hint: 'Volts equals Amperes times Ohms.'
  },
  {
    id: 'ab-circ-m1',
    topic: "Electric Circuits & Ohm's Law",
    subject: 'Physical Sciences',
    difficulty: 'medium',
    subtopic: 'Series Resistor Combinations',
    question: 'Two resistors of 4 Ω and 6 Ω are connected in series across a 20 V battery. What is the total current flowing in the circuit?',
    options: ['2 A', '0.5 A', '10 A', '4 A'],
    correctAnswer: '2 A',
    explanation: 'R_total = 4 Ω + 6 Ω = 10 Ω. Current I = V / R_total = 20 V / 10 Ω = 2 A.',
    hint: 'Add the resistances directly for series resistors, then use I = V / R.'
  },
  {
    id: 'ab-circ-h1',
    topic: "Electric Circuits & Ohm's Law",
    subject: 'Physical Sciences',
    difficulty: 'hard',
    subtopic: 'Parallel Branch Currents',
    question: 'Two resistors of 6 Ω and 3 Ω are connected in parallel across a 12 V supply. What is the total current leaving the battery?',
    options: ['6 A', '2 A', '4 A', '1.33 A'],
    correctAnswer: '6 A',
    explanation: '1/R_p = 1/6 + 1/3 = 3/6 ⇒ R_p = 2 Ω. Total current I = V / R_p = 12 V / 2 Ω = 6 A.',
    hint: 'Calculate the equivalent parallel resistance first: (6 × 3) / (6 + 3).'
  }
];

export function getAdaptiveQuestionsForTopic(
  topic: string,
  targetDifficulty: AdaptiveDifficulty = 'medium',
  count = 3
): AdaptiveQuestionItem[] {
  const normalized = topic.toLowerCase();
  let matches = ADAPTIVE_QUESTION_BANK.filter(
    (q) => q.topic.toLowerCase().includes(normalized) || normalized.includes(q.topic.toLowerCase())
  );

  if (matches.length === 0) {
    // Fallback to all questions
    matches = ADAPTIVE_QUESTION_BANK;
  }

  // Filter prioritized by desired difficulty first
  const diffMatches = matches.filter((q) => q.difficulty === targetDifficulty);
  const otherMatches = matches.filter((q) => q.difficulty !== targetDifficulty);

  const combined = [...diffMatches, ...otherMatches];
  return combined.slice(0, count);
}
