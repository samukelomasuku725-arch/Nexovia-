/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SALanguageCode =
  | 'en'   // English
  | 'af'   // Afrikaans
  | 'zu'   // isiZulu
  | 'xh'   // isiXhosa
  | 'nr'   // isiNdebele
  | 'ss'   // siSwati
  | 'nso'  // Sepedi
  | 'st'   // Sesotho
  | 'tn'   // Setswana
  | 've'   // Tshivenda
  | 'ts'   // Xitsonga / itsonga
  | 'sasl'; // South African Sign Language (SASL)

export interface LanguageInfo {
  code: SALanguageCode;
  name: string;
  nativeName: string;
  pronunciationNotes: string;
}

export interface TranslationDictionary {
  // Navigation
  navHome: string;
  navPathways: string;
  navSchool: string;
  navTvet: string;
  navHigherEd: string;
  navAiTutor: string;
  navPractice: string;
  navAssessments: string;
  navProgress: string;
  navProfile: string;
  navSearch: string;
  navLogin: string;
  navSignUp: string;
  navLogout: string;

  // Hero & Vision
  heroTagline: string;
  heroVision: string;
  heroSubtext: string;
  heroExploreBtn: string;
  heroTutorBtn: string;
  heroBadgePhase1: string;

  // Pathways overview
  pathwaySchoolTitle: string;
  pathwaySchoolSubtitle: string;
  pathwaySchoolBadge: string;
  pathwayTvetTitle: string;
  pathwayTvetSubtitle: string;
  pathwayTvetBadge: string;
  pathwayHigherEdTitle: string;
  pathwayHigherEdSubtitle: string;
  pathwayHigherEdBadge: string;
  pathwayAiTutorTitle: string;
  pathwayAiTutorSubtitle: string;

  // School CAPS hierarchy
  hierarchyGrade: string;
  hierarchySubject: string;
  hierarchyTerm: string;
  hierarchyTopic: string;
  hierarchySubtopic: string;
  hierarchyLesson: string;
  hierarchyPractice: string;
  hierarchyQuiz: string;
  hierarchyMastery: string;
  selectGradePrompt: string;
  selectSubjectPrompt: string;
  selectTermPrompt: string;
  term1: string;
  term2: string;
  term3: string;
  term4: string;

  // TVET hierarchy
  hierarchyQualification: string;
  hierarchyProgramme: string;
  hierarchySubjectModule: string;
  hierarchyAssessment: string;
  hierarchyProgress: string;
  tvetNatedTitle: string;
  tvetNatedSubtitle: string;
  tvetNcvTitle: string;
  tvetNcvSubtitle: string;

  // Higher Ed hierarchy
  hierarchyInstitution: string;
  hierarchyFaculty: string;
  hierarchyDegree: string;
  hierarchyModule: string;
  selectInstitutionPrompt: string;
  selectFacultyPrompt: string;

  // Content Verification & Badges (Crucial: never fake curriculum)
  badgeVerifiedCurriculum: string;
  badgeAiGenerated: string;
  verifiedCurriculumNotice: string;
  aiGeneratedNotice: string;
  curriculumDisclaimerText: string;

  // Interactive Lesson & Assessment Actions
  btnStartLesson: string;
  btnCompleted: string;
  btnMarkComplete: string;
  btnPracticeNow: string;
  btnTakeQuiz: string;
  btnAskTutor: string;
  btnCheckAnswer: string;
  btnTryAgain: string;
  btnNextQuestion: string;
  btnSubmitQuiz: string;
  btnBackToOverview: string;
  btnSwitchLanguage: string;

  // Feedback & Stats
  quizScoreLabel: string;
  masteryLevelLabel: string;
  streakDaysLabel: string;
  questionsAnsweredLabel: string;
  correctFeedback: string;
  incorrectFeedback: string;
  explanationHeader: string;
  stepByStepSolution: string;

  // Search & Filters
  searchPlaceholder: string;
  allPathwaysFilter: string;
  noResultsFound: string;

  // Footer & Compliance
  footerBrandNotice: string;
  footerIndependenceDisclaimer: string;
  allRightsReserved: string;

  // Phase 8: Student Dashboard & Mastery (All 11 Languages)
  dashboardWelcome?: string;
  dashboardOverview?: string;
  dashboardMyMastery?: string;
  dashboardTrends?: string;
  dashboardStudyPlan?: string;
  dashboardContinueLearning?: string;
  dashboardTodayProgress?: string;
  dashboardOverallProgress?: string;
  dashboardMySubjects?: string;
  dashboardNeedsPractice?: string;
  dashboardDoingWell?: string;
  dashboardRecommended?: string;
  dashboardUpcomingAssessments?: string;
  dashboardRecentAssessments?: string;
  dashboardAchievements?: string;
  dashboardRecentActivity?: string;
}
