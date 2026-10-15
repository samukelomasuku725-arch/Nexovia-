import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.resolve(__dirname, '..', 'data_progress.json');

export interface StoredAIMessage {
  id: string;
  conversationId?: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  mode?: string;
  summary?: string;
  followUps?: string[];
  isAiGenerated?: boolean;
  disclaimer?: string;
  saved?: boolean;
}

export interface StoredAIConversation {
  id: string;
  userId: string;
  title: string;
  educationLevel: string;
  gradeOrProgramme?: string;
  subject: string;
  module?: string;
  topic: string;
  lesson?: string;
  language: string;
  mode: string;
  messages: StoredAIMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface StoredSavedContent {
  id: string;
  userId: string;
  conversationId?: string;
  messageId?: string;
  title: string;
  content: string;
  subject: string;
  topic: string;
  language: string;
  type?: string;
  createdAt: string;
}

export interface StoredStudyPlanScheduleItem {
  dayOrPhase: string;
  focus: string;
  activities: string[];
  milestone: string;
}

export interface StoredStudyPlan {
  id: string;
  userId: string;
  title: string;
  gradeOrProgramme: string;
  subject: string;
  topic: string;
  availableStudyTime: string;
  targetDate?: string;
  planOverview: string;
  schedule: StoredStudyPlanScheduleItem[];
  tips: string[];
  createdAt: string;
}

export interface StoredScanSession {
  id: string;
  userId: string;
  title: string;
  thumbnail: string;
  mimeType: string;
  initialQuestion: string;
  mode: string;
  educationLevel: string;
  gradeOrProgramme: string;
  subject: string;
  module?: string;
  topic: string;
  language: string;
  aiExplanation: string;
  summary: string;
  clarityAssessment: {
    isClear: boolean;
    issue: string;
    message: string;
  };
  followUpSuggestions: string[];
  messages: Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }>;
  practiceQuestions?: any[];
  quiz?: any;
  saved: boolean;
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// PHASE 5: ADAPTIVE LEARNING ENGINE MODELS
// ==========================================

export interface StoredLearnerPerformanceEvent {
  id: string;
  learnerId: string;
  gradeOrProgramme: string;
  qualification?: string;
  institution?: string;
  subject: string;
  module?: string;
  topic: string;
  subtopic?: string;
  lessonId?: string;
  assessmentId?: string;
  questionId?: string;
  questionType?: string;
  answer?: string;
  correct: boolean;
  score: number;
  percentage: number;
  difficulty: 'easy' | 'medium' | 'hard';
  timeSpentSeconds: number;
  attemptsCount: number;
  hintsUsed: number;
  source: 'practice' | 'quiz' | 'ai_tutor' | 'scan_learn' | 'lesson' | 'assessment';
  completed: boolean;
  timestamp: string;
}

export interface StoredOnboardingGoals {
  isConfigured: boolean;
  selectedGrade: string;
  focusSubjects: string[];
  weeklyHoursGoal: number;
  targetExamDate?: string;
  preferredLanguage: string;
}

export interface UserStoredProgress {
  userId: string;
  questionsAskedCount: number;
  practiceSessionsCount: number;
  quizAttempts: Array<{
    id: string;
    quizId: string;
    quizTitle: string;
    subject: string;
    topic: string;
    score: number;
    totalQuestions: number;
    percentage: number;
    completedAt: string;
  }>;
  topicsStudied: string[];
  savedLearning: StoredSavedContent[];
  conversations: StoredAIConversation[];
  studyPlans: StoredStudyPlan[];
  scanSessions: StoredScanSession[];
  performanceEvents?: StoredLearnerPerformanceEvent[];
  completedLessonIds?: string[];
  onboardingGoals?: StoredOnboardingGoals;
  learnedDays?: string[];
  academicDocuments?: StoredAcademicDocument[];
  academicVoiceTier?: 'free' | 'premium';
  lastActiveDate: string;
}

export interface StoredAcademicReferenceItem {
  id: string;
  author: string;
  year: string;
  title: string;
  source: string;
  urlOrDoi?: string;
  inTextCitation: string;
  verified: boolean;
  verificationSource?: string;
  isIncluded: boolean;
  notes?: string;
}

export interface StoredAcademicDocumentSection {
  id: string;
  heading: string;
  content: string;
  studentVoicePoints?: string[];
  aiEnhanced?: boolean;
}

export interface StoredAcademicDocument {
  id: string;
  userId: string;
  title: string;
  documentType: 'essay' | 'research_report' | 'literature_review' | 'practical_report' | 'tvet_project' | 'lecture_notes';
  educationSector: 'university' | 'tvet';
  institution: string;
  facultyOrDepartment: string;
  courseOrProgramme: string;
  moduleCode: string;
  moduleTitle: string;
  studentName: string;
  studentNumber: string;
  lecturerOrAssessor?: string;
  submissionDate: string;
  targetWordCount: number;
  actualWordCount: number;
  referencingStyle: 'harvard' | 'apa';
  language: string;
  recordingDurationSeconds?: number;
  rawTranscript: string;
  cleanedTranscript: string;
  instructionsOrRubric?: string;
  sections: StoredAcademicDocumentSection[];
  references: StoredAcademicReferenceItem[];
  tvetCompliance?: {
    qualificationType: 'NATED' | 'NCV';
    level: string;
    isPoE: boolean;
    ohsCompliant: boolean;
    stepProcedureLogged: boolean;
    workshopEquipment?: string[];
    assessorName?: string;
    assessorNumber?: string;
    moderatorName?: string;
    assessmentOutcome?: 'competent' | 'not_yet_competent' | 'pending';
    requiresAssessorSignOff: boolean;
  };
  institutionComplianceNotes?: string;
  createdAt: string;
  updatedAt: string;
  exportedPdfCount: number;
  lastExportedAt?: string;
}

function loadAllData(): Record<string, UserStoredProgress> {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      // Migrate missing arrays if needed
      for (const k of Object.keys(parsed)) {
        if (!Array.isArray(parsed[k].conversations)) parsed[k].conversations = [];
        if (!Array.isArray(parsed[k].savedLearning)) parsed[k].savedLearning = [];
        if (!Array.isArray(parsed[k].studyPlans)) parsed[k].studyPlans = [];
        if (!Array.isArray(parsed[k].scanSessions)) parsed[k].scanSessions = [];
        if (!Array.isArray(parsed[k].performanceEvents)) parsed[k].performanceEvents = [];
        if (!Array.isArray(parsed[k].completedLessonIds)) parsed[k].completedLessonIds = [];
        if (!Array.isArray(parsed[k].learnedDays)) parsed[k].learnedDays = [];
        if (!Array.isArray(parsed[k].academicDocuments)) parsed[k].academicDocuments = [];
        if (!parsed[k].academicVoiceTier) parsed[k].academicVoiceTier = 'free';
      }
      return parsed;
    }
  } catch (err) {
    console.error('Failed to read progress database:', err);
  }
  return {};
}

function saveAllData(data: Record<string, UserStoredProgress>): void {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write progress database:', err);
  }
}

export function getUserProgress(userId: string): UserStoredProgress {
  const all = loadAllData();
  if (!all[userId]) {
    all[userId] = {
      userId,
      questionsAskedCount: 0,
      practiceSessionsCount: 0,
      quizAttempts: [],
      topicsStudied: [],
      savedLearning: [],
      conversations: [],
      studyPlans: [],
      scanSessions: [],
      performanceEvents: [],
      completedLessonIds: [],
      learnedDays: [new Date().toISOString().split('T')[0]],
      lastActiveDate: new Date().toISOString().split('T')[0]
    };
    saveAllData(all);
  }
  if (!all[userId].scanSessions) {
    all[userId].scanSessions = [];
  }
  if (!all[userId].performanceEvents) {
    all[userId].performanceEvents = [];
  }
  if (!all[userId].completedLessonIds) {
    all[userId].completedLessonIds = [];
  }
  if (!all[userId].learnedDays) {
    all[userId].learnedDays = [all[userId].lastActiveDate || new Date().toISOString().split('T')[0]];
  }
  return all[userId];
}

export function recordActivity(
  userId: string,
  event: {
    type: 'question_asked' | 'practice_completed' | 'topic_studied' | 'scan_analyzed';
    topic?: string;
    quizAttempt?: {
      quizId: string;
      quizTitle: string;
      subject: string;
      topic: string;
      score: number;
      totalQuestions: number;
      percentage: number;
    };
  }
): UserStoredProgress {
  const prog = getUserProgress(userId);
  prog.lastActiveDate = new Date().toISOString().split('T')[0];

  if (event.type === 'question_asked' || event.type === 'scan_analyzed') {
    prog.questionsAskedCount += 1;
  } else if (event.type === 'practice_completed') {
    prog.practiceSessionsCount += 1;
    if (event.quizAttempt) {
      prog.quizAttempts.unshift({
        ...event.quizAttempt,
        id: `att_${Date.now()}`,
        completedAt: new Date().toISOString()
      });
    }
  }

  if (event.topic && !prog.topicsStudied.includes(event.topic)) {
    prog.topicsStudied.push(event.topic);
  }

  const all = loadAllData();
  all[userId] = prog;
  saveAllData(all);
  return prog;
}

// ==========================================
// CONVERSATIONS PERSISTENCE
// ==========================================

export function getUserConversations(userId: string): StoredAIConversation[] {
  const prog = getUserProgress(userId);
  return prog.conversations || [];
}

export function getUserConversation(userId: string, conversationId: string): StoredAIConversation | null {
  const prog = getUserProgress(userId);
  return prog.conversations.find((c) => c.id === conversationId) || null;
}

export function saveUserConversation(userId: string, conversation: StoredAIConversation): StoredAIConversation {
  const prog = getUserProgress(userId);
  const existingIdx = prog.conversations.findIndex((c) => c.id === conversation.id);
  if (existingIdx >= 0) {
    prog.conversations[existingIdx] = {
      ...prog.conversations[existingIdx],
      ...conversation,
      updatedAt: new Date().toISOString()
    };
  } else {
    prog.conversations.unshift(conversation);
  }

  const all = loadAllData();
  all[userId] = prog;
  saveAllData(all);
  return conversation;
}

export function deleteUserConversation(userId: string, conversationId: string): boolean {
  const prog = getUserProgress(userId);
  const beforeLen = prog.conversations.length;
  prog.conversations = prog.conversations.filter((c) => c.id !== conversationId);
  if (prog.conversations.length !== beforeLen) {
    const all = loadAllData();
    all[userId] = prog;
    saveAllData(all);
    return true;
  }
  return false;
}

export function appendMessageToConversation(
  userId: string,
  conversationId: string,
  message: StoredAIMessage
): StoredAIConversation {
  const prog = getUserProgress(userId);
  let conv = prog.conversations.find((c) => c.id === conversationId);

  if (!conv) {
    conv = {
      id: conversationId,
      userId,
      title: message.content.slice(0, 35) + '...',
      educationLevel: 'FET Phase (Grade 10–12 CAPS)',
      subject: 'General Education',
      topic: 'General Topic',
      language: 'en',
      mode: message.mode || 'explain',
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    prog.conversations.unshift(conv);
  }

  conv.messages.push(message);
  conv.updatedAt = new Date().toISOString();

  const all = loadAllData();
  all[userId] = prog;
  saveAllData(all);
  return conv;
}

// ==========================================
// SAVED CONTENT PERSISTENCE
// ==========================================

export function getUserSavedContent(userId: string): StoredSavedContent[] {
  const prog = getUserProgress(userId);
  return prog.savedLearning || [];
}

export function addSavedItem(
  userId: string,
  item: {
    conversationId?: string;
    messageId?: string;
    title: string;
    content: string;
    subject: string;
    topic: string;
    language: string;
    type?: string;
  }
): StoredSavedContent {
  const prog = getUserProgress(userId);
  const newItem: StoredSavedContent = {
    id: `save_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    userId,
    ...item,
    createdAt: new Date().toISOString()
  };

  prog.savedLearning.unshift(newItem);
  const all = loadAllData();
  all[userId] = prog;
  saveAllData(all);
  return newItem;
}

export function deleteSavedItem(userId: string, itemId: string): boolean {
  const prog = getUserProgress(userId);
  const beforeLen = prog.savedLearning.length;
  prog.savedLearning = prog.savedLearning.filter((s) => s.id !== itemId);
  if (prog.savedLearning.length !== beforeLen) {
    const all = loadAllData();
    all[userId] = prog;
    saveAllData(all);
    return true;
  }
  return false;
}

// ==========================================
// STUDY PLAN PERSISTENCE
// ==========================================

export function getUserStudyPlans(userId: string): StoredStudyPlan[] {
  const prog = getUserProgress(userId);
  return prog.studyPlans || [];
}

export function addStudyPlan(userId: string, plan: Omit<StoredStudyPlan, 'id' | 'userId' | 'createdAt'>): StoredStudyPlan {
  const prog = getUserProgress(userId);
  const newPlan: StoredStudyPlan = {
    id: `plan_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    userId,
    ...plan,
    createdAt: new Date().toISOString()
  };

  if (!prog.studyPlans) prog.studyPlans = [];
  prog.studyPlans.unshift(newPlan);

  const all = loadAllData();
  all[userId] = prog;
  saveAllData(all);
  return newPlan;
}

export function deleteStudyPlan(userId: string, planId: string): boolean {
  const prog = getUserProgress(userId);
  if (!prog.studyPlans) return false;
  const beforeLen = prog.studyPlans.length;
  prog.studyPlans = prog.studyPlans.filter((p) => p.id !== planId);
  if (prog.studyPlans.length !== beforeLen) {
    const all = loadAllData();
    all[userId] = prog;
    saveAllData(all);
    return true;
  }
  return false;
}

// ==========================================
// SCAN SESSIONS PERSISTENCE
// ==========================================

export function getUserScanSessions(userId: string): StoredScanSession[] {
  const prog = getUserProgress(userId);
  return prog.scanSessions || [];
}

export function getScanSession(userId: string, sessionId: string): StoredScanSession | undefined {
  const prog = getUserProgress(userId);
  return (prog.scanSessions || []).find((s) => s.id === sessionId);
}

export function saveUserScanSession(userId: string, session: StoredScanSession): StoredScanSession {
  const prog = getUserProgress(userId);
  if (!prog.scanSessions) prog.scanSessions = [];

  const existingIdx = prog.scanSessions.findIndex((s) => s.id === session.id);
  if (existingIdx >= 0) {
    prog.scanSessions[existingIdx] = {
      ...prog.scanSessions[existingIdx],
      ...session,
      updatedAt: new Date().toISOString()
    };
  } else {
    prog.scanSessions.unshift(session);
  }

  const all = loadAllData();
  all[userId] = prog;
  saveAllData(all);
  return session;
}

export function deleteUserScanSession(userId: string, sessionId: string): boolean {
  const prog = getUserProgress(userId);
  if (!prog.scanSessions) return false;
  const beforeLen = prog.scanSessions.length;
  prog.scanSessions = prog.scanSessions.filter((s) => s.id !== sessionId);
  if (prog.scanSessions.length !== beforeLen) {
    const all = loadAllData();
    all[userId] = prog;
    saveAllData(all);
    return true;
  }
  return false;
}

export function appendMessageToScanSession(
  userId: string,
  sessionId: string,
  message: { id: string; role: 'user' | 'assistant'; content: string; timestamp: string }
): boolean {
  const prog = getUserProgress(userId);
  if (!prog.scanSessions) return false;
  const session = prog.scanSessions.find((s) => s.id === sessionId);
  if (!session) return false;

  if (!Array.isArray(session.messages)) session.messages = [];
  session.messages.push(message);
  session.updatedAt = new Date().toISOString();

  const all = loadAllData();
  all[userId] = prog;
  saveAllData(all);
  return true;
}

// ==========================================
// PHASE 5: ADAPTIVE LEARNING ENGINE STORAGE
// ==========================================

export function recordLearnerPerformanceEvent(
  userId: string,
  eventData: Omit<StoredLearnerPerformanceEvent, 'id' | 'learnerId' | 'timestamp'> & {
    id?: string;
    timestamp?: string;
  }
): StoredLearnerPerformanceEvent {
  const prog = getUserProgress(userId);
  if (!prog.performanceEvents) prog.performanceEvents = [];
  if (!prog.learnedDays) prog.learnedDays = [];

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  if (!prog.learnedDays.includes(todayStr)) {
    prog.learnedDays.push(todayStr);
  }
  prog.lastActiveDate = todayStr;

  const event: StoredLearnerPerformanceEvent = {
    ...eventData,
    id: eventData.id || `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    learnerId: userId,
    timestamp: eventData.timestamp || now.toISOString()
  };

  // Prepend new event
  prog.performanceEvents.unshift(event);

  // If topic not in topicsStudied, add it
  if (event.topic && !prog.topicsStudied.includes(event.topic)) {
    prog.topicsStudied.push(event.topic);
  }

  // Update study time minutes
  if (event.timeSpentSeconds) {
    prog.practiceSessionsCount = (prog.practiceSessionsCount || 0) + 1;
  }

  const all = loadAllData();
  all[userId] = prog;
  saveAllData(all);
  return event;
}

export function getLearnerPerformanceEvents(userId: string): StoredLearnerPerformanceEvent[] {
  const prog = getUserProgress(userId);
  return prog.performanceEvents || [];
}

export function updateLearnerOnboarding(
  userId: string,
  goals: Partial<StoredOnboardingGoals>
): StoredOnboardingGoals {
  const prog = getUserProgress(userId);
  prog.onboardingGoals = {
    isConfigured: true,
    selectedGrade: goals.selectedGrade || prog.onboardingGoals?.selectedGrade || 'Grade 10',
    focusSubjects: goals.focusSubjects || prog.onboardingGoals?.focusSubjects || ['Mathematics'],
    weeklyHoursGoal: goals.weeklyHoursGoal || prog.onboardingGoals?.weeklyHoursGoal || 5,
    targetExamDate: goals.targetExamDate || prog.onboardingGoals?.targetExamDate,
    preferredLanguage: goals.preferredLanguage || prog.onboardingGoals?.preferredLanguage || 'en'
  };

  const all = loadAllData();
  all[userId] = prog;
  saveAllData(all);
  return prog.onboardingGoals;
}

export function getLearnerOnboarding(userId: string): StoredOnboardingGoals | undefined {
  const prog = getUserProgress(userId);
  return prog.onboardingGoals;
}

export function markLearnerLessonCompleted(userId: string, lessonId: string): boolean {
  const prog = getUserProgress(userId);
  if (!prog.completedLessonIds) prog.completedLessonIds = [];
  if (!prog.completedLessonIds.includes(lessonId)) {
    prog.completedLessonIds.push(lessonId);
    const today = new Date().toISOString().split('T')[0];
    if (!prog.learnedDays) prog.learnedDays = [];
    if (!prog.learnedDays.includes(today)) {
      prog.learnedDays.push(today);
    }
    prog.lastActiveDate = today;

    const all = loadAllData();
    all[userId] = prog;
    saveAllData(all);
    return true;
  }
  return false;
}

/**
 * Seeds realistic performance history for testing and immediate demo evaluation
 */
export function seedSampleAdaptiveProfile(
  userId: string,
  preset: 'struggling' | 'high_achiever' | 'improving' | 'new_learner'
): { success: boolean; eventCount: number } {
  const prog = getUserProgress(userId);
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;

  if (preset === 'new_learner') {
    prog.performanceEvents = [];
    prog.completedLessonIds = [];
    prog.learnedDays = [new Date().toISOString().split('T')[0]];
    prog.onboardingGoals = {
      isConfigured: false,
      selectedGrade: 'Grade 10',
      focusSubjects: ['Mathematics'],
      weeklyHoursGoal: 5,
      preferredLanguage: 'en'
    };
    const all = loadAllData();
    all[userId] = prog;
    saveAllData(all);
    return { success: true, eventCount: 0 };
  }

  const events: StoredLearnerPerformanceEvent[] = [];
  const learnedDays: string[] = [];

  if (preset === 'struggling') {
    // 5 days active
    for (let d = 4; d >= 0; d--) {
      learnedDays.push(new Date(now - d * dayMs).toISOString().split('T')[0]);
    }

    // Weak in Fractions & Ratios (Accuracy ~38%)
    for (let i = 0; i < 6; i++) {
      const isCorrect = i === 1 || i === 4;
      events.push({
        id: `seed_struggle_frac_${i}`,
        learnerId: userId,
        gradeOrProgramme: 'Grade 10',
        subject: 'Mathematics',
        topic: 'Fractions & Ratios',
        subtopic: 'Equivalent Fractions',
        questionType: 'calculation',
        correct: isCorrect,
        score: isCorrect ? 1 : 0,
        percentage: isCorrect ? 100 : 0,
        difficulty: 'easy',
        timeSpentSeconds: 65,
        attemptsCount: isCorrect ? 1 : 2,
        hintsUsed: isCorrect ? 0 : 2,
        source: 'practice',
        completed: true,
        timestamp: new Date(now - (5 - i) * 6 * 3600 * 1000).toISOString()
      });
    }

    // Developing in Algebra & Factorization (~55%)
    for (let i = 0; i < 4; i++) {
      const isCorrect = i % 2 === 0;
      events.push({
        id: `seed_struggle_alg_${i}`,
        learnerId: userId,
        gradeOrProgramme: 'Grade 10',
        subject: 'Mathematics',
        topic: 'Algebra & Factorization',
        subtopic: 'Common Factor',
        questionType: 'multiple_choice',
        correct: isCorrect,
        score: isCorrect ? 1 : 0,
        percentage: isCorrect ? 100 : 0,
        difficulty: 'medium',
        timeSpentSeconds: 45,
        attemptsCount: 1,
        hintsUsed: 1,
        source: 'quiz',
        completed: true,
        timestamp: new Date(now - (4 - i) * 12 * 3600 * 1000).toISOString()
      });
    }

    // Moderate in Functions & Graphs (~68%)
    for (let i = 0; i < 4; i++) {
      const isCorrect = i !== 0;
      events.push({
        id: `seed_struggle_func_${i}`,
        learnerId: userId,
        gradeOrProgramme: 'Grade 10',
        subject: 'Mathematics',
        topic: 'Functions & Graphs',
        subtopic: 'Linear Functions',
        questionType: 'multiple_choice',
        correct: isCorrect,
        score: isCorrect ? 1 : 0,
        percentage: isCorrect ? 100 : 0,
        difficulty: 'medium',
        timeSpentSeconds: 40,
        attemptsCount: 1,
        hintsUsed: 0,
        source: 'practice',
        completed: true,
        timestamp: new Date(now - (3 - i) * 8 * 3600 * 1000).toISOString()
      });
    }
  } else if (preset === 'high_achiever') {
    // 7 days active streak
    for (let d = 6; d >= 0; d--) {
      learnedDays.push(new Date(now - d * dayMs).toISOString().split('T')[0]);
    }

    // High mastery in Algebra (88%)
    for (let i = 0; i < 8; i++) {
      const isCorrect = i !== 2;
      events.push({
        id: `seed_achieve_alg_${i}`,
        learnerId: userId,
        gradeOrProgramme: 'Grade 10',
        subject: 'Mathematics',
        topic: 'Algebra & Factorization',
        subtopic: 'Quadratic Trinomials',
        questionType: 'multiple_choice',
        correct: isCorrect,
        score: isCorrect ? 1 : 0,
        percentage: isCorrect ? 100 : 0,
        difficulty: i > 4 ? 'hard' : 'medium',
        timeSpentSeconds: 30,
        attemptsCount: 1,
        hintsUsed: 0,
        source: 'practice',
        completed: true,
        timestamp: new Date(now - (8 - i) * 6 * 3600 * 1000).toISOString()
      });
    }

    // High mastery in Newton's Laws (92%)
    for (let i = 0; i < 6; i++) {
      const isCorrect = true;
      events.push({
        id: `seed_achieve_phys_${i}`,
        learnerId: userId,
        gradeOrProgramme: 'Grade 10',
        subject: 'Physical Sciences',
        topic: 'Newton\'s Laws of Motion',
        subtopic: 'Second Law of Motion',
        questionType: 'calculation',
        correct: isCorrect,
        score: 1,
        percentage: 100,
        difficulty: 'hard',
        timeSpentSeconds: 50,
        attemptsCount: 1,
        hintsUsed: 0,
        source: 'quiz',
        completed: true,
        timestamp: new Date(now - (6 - i) * 12 * 3600 * 1000).toISOString()
      });
    }
  } else if (preset === 'improving') {
    // 6 days active
    for (let d = 5; d >= 0; d--) {
      learnedDays.push(new Date(now - d * dayMs).toISOString().split('T')[0]);
    }

    // Older low scores, newer high scores (+24% improvement)
    for (let i = 0; i < 8; i++) {
      const isCorrect = i >= 3; // First 3 wrong, next 5 right
      events.push({
        id: `seed_improve_alg_${i}`,
        learnerId: userId,
        gradeOrProgramme: 'Grade 10',
        subject: 'Mathematics',
        topic: 'Algebra & Factorization',
        subtopic: 'Difference of Two Squares',
        questionType: 'multiple_choice',
        correct: isCorrect,
        score: isCorrect ? 1 : 0,
        percentage: isCorrect ? 100 : 0,
        difficulty: 'medium',
        timeSpentSeconds: 40,
        attemptsCount: 1,
        hintsUsed: isCorrect ? 0 : 1,
        source: 'practice',
        completed: true,
        timestamp: new Date(now - (8 - i) * 10 * 3600 * 1000).toISOString()
      });
    }
  }

  prog.performanceEvents = events;
  prog.learnedDays = learnedDays;
  prog.lastActiveDate = new Date().toISOString().split('T')[0];
  prog.completedLessonIds = ['mod-1-lesson-1', 'lesson-math-alg-1'];
  prog.onboardingGoals = {
    isConfigured: true,
    selectedGrade: 'Grade 10',
    focusSubjects: ['Mathematics', 'Physical Sciences'],
    weeklyHoursGoal: 6,
    preferredLanguage: 'en'
  };

  const all = loadAllData();
  all[userId] = prog;
  saveAllData(all);
  return { success: true, eventCount: events.length };
}

// ==========================================
// ACADEMIC VOICE-TO-DOCUMENT DATA MANAGEMENT
// ==========================================

export function getAcademicDocuments(userId: string): StoredAcademicDocument[] {
  const prog = getUserProgress(userId);
  if (!Array.isArray(prog.academicDocuments)) {
    prog.academicDocuments = [];
  }
  return [...prog.academicDocuments].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function getAcademicDocumentById(id: string, userId: string): StoredAcademicDocument | null {
  const docs = getAcademicDocuments(userId);
  return docs.find((d) => d.id === id) || null;
}

export function saveAcademicDocument(doc: StoredAcademicDocument): { success: boolean; document: StoredAcademicDocument } {
  const all = loadAllData();
  if (!all[doc.userId]) {
    all[doc.userId] = getUserProgress(doc.userId);
  }
  if (!Array.isArray(all[doc.userId].academicDocuments)) {
    all[doc.userId].academicDocuments = [];
  }

  const existingIdx = all[doc.userId].academicDocuments!.findIndex((d) => d.id === doc.id);
  const now = new Date().toISOString();

  const finalDoc: StoredAcademicDocument = {
    ...doc,
    updatedAt: now,
    createdAt: doc.createdAt || now,
    exportedPdfCount: doc.exportedPdfCount || 0
  };

  if (existingIdx >= 0) {
    all[doc.userId].academicDocuments![existingIdx] = finalDoc;
  } else {
    all[doc.userId].academicDocuments!.unshift(finalDoc);
  }

  saveAllData(all);
  return { success: true, document: finalDoc };
}

export function deleteAcademicDocument(id: string, userId: string): { success: boolean } {
  const all = loadAllData();
  if (!all[userId] || !Array.isArray(all[userId].academicDocuments)) {
    return { success: false };
  }

  const initialLen = all[userId].academicDocuments!.length;
  all[userId].academicDocuments = all[userId].academicDocuments!.filter((d) => d.id !== id);

  if (all[userId].academicDocuments.length !== initialLen) {
    saveAllData(all);
    return { success: true };
  }
  return { success: false };
}

export function incrementPdfExportCount(id: string, userId: string): void {
  const all = loadAllData();
  if (all[userId] && Array.isArray(all[userId].academicDocuments)) {
    const doc = all[userId].academicDocuments!.find((d) => d.id === id);
    if (doc) {
      doc.exportedPdfCount = (doc.exportedPdfCount || 0) + 1;
      doc.lastExportedAt = new Date().toISOString();
      saveAllData(all);
    }
  }
}

export function getAcademicVoiceTierStatus(userId: string) {
  const prog = getUserProgress(userId);
  const tier = prog.academicVoiceTier || 'free';
  const docs = prog.academicDocuments || [];

  const now = new Date();
  const currentMonthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const createdThisMonth = docs.filter((d) => (d.createdAt || '').startsWith(currentMonthPrefix)).length;

  const isFree = tier === 'free';
  const monthlyLimit = isFree ? 3 : -1;
  const remaining = isFree ? Math.max(0, 3 - createdThisMonth) : 999;
  const maxMins = isFree ? 5 : 30;

  // Next reset date is the first day of next month
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  return {
    tier,
    monthlyDocumentLimit: monthlyLimit,
    documentsCreatedThisMonth: createdThisMonth,
    remainingDocuments: remaining,
    maxRecordingMinutes: maxMins,
    premiumPriceZar: 50,
    canRecordLongAudio: !isFree,
    canExportHighResPdf: true,
    hasScholarSearchGrounding: true,
    resetDate: nextMonth.toISOString().split('T')[0]
  };
}

export function setAcademicVoiceTier(userId: string, tier: 'free' | 'premium'): { success: boolean; tier: 'free' | 'premium' } {
  const all = loadAllData();
  if (!all[userId]) {
    all[userId] = getUserProgress(userId);
  }
  all[userId].academicVoiceTier = tier;
  saveAllData(all);
  return { success: true, tier };
}


