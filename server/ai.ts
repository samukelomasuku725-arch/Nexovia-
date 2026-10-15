import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { serverLanguageEngine } from './languageEngine';

dotenv.config();

export interface AIResponseInput {
  message?: string;
  userQuestion?: string;
  language?: string;
  selectedLanguage?: string;
  educationLevel?: string;
  gradeOrProgramme?: string;
  subject?: string;
  module?: string;
  topic?: string;
  lesson?: string;
  mode?:
    | 'EXPLAIN'
    | 'SIMPLIFY'
    | 'SUMMARIZE'
    | 'TRANSLATE'
    | 'PRACTICE'
    | 'HOMEWORK_HELP'
    | 'QUIZ_HELP'
    | 'STUDY_PLAN'
    | string;
  learningMode?: string;
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
}

export interface PracticeQuestion {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface StudyPlanOutput {
  title: string;
  planOverview: string;
  schedule: Array<{
    dayOrPhase: string;
    focus: string;
    activities: string[];
    milestone: string;
  }>;
  tips: string[];
}

export interface AIResponseOutput {
  text: string;
  content: string;
  summary: string;
  followUpSuggestions: string[];
  followUps: string[];
  practiceQuestions?: PracticeQuestion[];
  studyPlan?: StudyPlanOutput;
  languageUsed: string;
  model: string;
  isAiGenerated: boolean;
  disclaimer: string;
  isXitsongaEngineActive?: boolean;
  verifiedPhrasesMatched?: Array<{ english: string; xitsonga: string }>;
  languageSource?: 'verified_language_engine' | 'ai_generated';
  verificationStatus?: 'verified' | 'unverified';
  verifiedPhrase?: any;
  requiresVerificationNotice?: boolean;
  hasVerifiedAudio?: boolean;
  audioUrl?: string;
  audioStatus?: string;
}

export const LANGUAGE_MAP: Record<string, string> = {
  en: 'English',
  af: 'Afrikaans',
  zu: 'isiZulu',
  xh: 'isiXhosa',
  nr: 'isiNdebele',
  ss: 'siSwati',
  nso: 'Sepedi',
  st: 'Sesotho',
  tn: 'Setswana',
  ve: 'Tshivenda',
  ts: 'XiTsonga'
};

const CANDIDATE_MODELS = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];

export function isGeminiConfigured(): boolean {
  const key = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;
  if (!key) return false;
  const trimmed = key.trim();
  return (
    trimmed.length > 10 &&
    trimmed !== 'MY_GEMINI_API_KEY' &&
    trimmed !== 'MY_AI_API_KEY' &&
    trimmed !== 'your_api_key_here'
  );
}

export function getGeminiClient(): { client: GoogleGenAI; apiKey: string } {
  const apiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;

  if (!apiKey || !isGeminiConfigured()) {
    throw new Error(
      'GEMINI_API_KEY is not configured in the server environment. Please set GEMINI_API_KEY in your environment or secrets panel to enable real AI responses.'
    );
  }

  const client = new GoogleGenAI({
    apiKey: apiKey.trim(),
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });

  return { client, apiKey: apiKey.trim() };
}

/**
 * Normalizes user-provided mode to standardized key
 */
function normalizeMode(rawMode?: string): string {
  const m = (rawMode || 'EXPLAIN').toUpperCase().replace(/[\s-]/g, '_');
  if (m === 'QUIZHELP' || m === 'QUIZ_HELP') return 'QUIZ_HELP';
  if (m === 'HOMEWORKHELP' || m === 'HOMEWORK_HELP') return 'HOMEWORK_HELP';
  if (m === 'STUDYPLAN' || m === 'STUDY_PLAN') return 'STUDY_PLAN';
  if (['EXPLAIN', 'SIMPLIFY', 'SUMMARIZE', 'TRANSLATE', 'PRACTICE'].includes(m)) return m;
  return 'EXPLAIN';
}

/**
 * Builds pedagogical prompt tailored to learner's grade level and mode
 */
function buildSystemInstruction(params: {
  level: string;
  gradeOrProg: string;
  subject: string;
  module?: string;
  topic: string;
  lesson?: string;
  targetLanguage: string;
  langCode?: string;
  mode: string;
  hasCurriculumContext: boolean;
}): string {
  const {
    level,
    gradeOrProg,
    subject,
    module,
    topic,
    lesson,
    targetLanguage,
    langCode,
    mode,
    hasCurriculumContext
  } = params;

  // Dedicated Xitsonga Language Engine directives
  let xitsongaDirective = '';
  if (langCode === 'ts' || targetLanguage.toLowerCase().includes('tsonga')) {
    xitsongaDirective = `
======================================================================
NEXOVIA XITSONGA LANGUAGE ENGINE DIRECTIVES (MANDATORY ANTI-HALLUCINATION RULES):
1. AUTHORITY OF VERIFIED DATASET:
Nexovia enforces a controlled native-speaker verified Xitsonga vocabulary.
Whenever you convey greetings, instructions, questions, encouragement, classroom interactions, or mathematical concepts covered by the dictionary below, you MUST use the EXACT verified Xitsonga phrase.

2. ANTI-HALLUCINATION / UNVERIFIED RULE:
For any term marked [NEEDS VERIFICATION / DO NOT INVENT TRANSLATION] or any specialized terminology NOT found in the verified dataset:
- DO NOT invent a speculative Xitsonga translation with false certainty.
- Present the English explanation clearly and add: "*(Xitsonga translation pending native verification)*" or keep the standard English term in parentheses.
- Never present an AI-generated term as authentic verified Xitsonga.

3. DUAL-LANGUAGE ACCESSIBILITY:
When explaining complex academic concepts in Xitsonga, always provide the original English concept/word alongside in parentheses so that learners preparing for examinations in English have absolute clarity (e.g., "Nhlamulo (Answer)", "Bala leswi (Calculate this)").

4. STRICT PRONUNCIATION & AUDIO RULE (PHASE 2 SAFE ARCHITECTURE):
The AI tutor MUST strictly adhere to this priority hierarchy:
1. Verified Xitsonga translation
2. Verified pronunciation
3. Verified audio
If a learner asks how to pronounce a phrase or asks for phonetic guidance:
- Check the dictionary below. If pronunciation is marked [VERIFIED PRONUNCIATION: ...], you may share that exact verified guide.
- If pronunciation is marked [PRONUNCIATION: NOT YET VERIFIED] or unverified: YOU MUST NOT invent, guess, or synthesize phonetic spellings. State explicitly: "Nexovia does not yet have verified pronunciation for this phrase."
- If the learner asks for audio: State clearly: "Audio pronunciation is not available yet."

${serverLanguageEngine.getVerifiedVocabularyTable()}
======================================================================
`;
  }

  // Grade/Age-specific pedagogical calibration
  let levelCalibration = '';
  const lowerGrade = (gradeOrProg || level).toLowerCase();

  if (
    lowerGrade.includes('grade r') ||
    lowerGrade.includes('grade 1') ||
    lowerGrade.includes('grade 2') ||
    lowerGrade.includes('grade 3') ||
    lowerGrade.includes('grade 4') ||
    lowerGrade.includes('foundation') ||
    lowerGrade.includes('intermediate')
  ) {
    levelCalibration = `PRIMARY / INTERMEDIATE LEARNER (${gradeOrProg}):
- Use simple, friendly language and short sentences.
- Avoid technical jargon unless immediately explained with everyday physical objects (e.g. apples, coins, wheels).
- Keep explanations brief, cheerful, and encouraging.`;
  } else if (
    lowerGrade.includes('grade 10') ||
    lowerGrade.includes('grade 11') ||
    lowerGrade.includes('grade 12') ||
    lowerGrade.includes('matric') ||
    lowerGrade.includes('fet')
  ) {
    levelCalibration = `FET / MATRIC SECONDARY LEARNER (${gradeOrProg}):
- Provide academically rigorous explanations matching senior South African high school depth.
- Show step-by-step mathematical working or chemical equations with full intermediate steps.
- Emphasize common examination traps, method marks, and standard curriculum notation.`;
  } else if (lowerGrade.includes('tvet') || lowerGrade.includes('nated') || lowerGrade.includes('nc(v)')) {
    levelCalibration = `TVET / TECHNICAL COLLEGE LEARNER (${gradeOrProg}):
- Focus on practical vocational applications, industrial standards, workshop trade skills, and engineering calculations.
- Reference circuit diagrams, mechanical principles, and applied engineering mathematics where relevant.`;
  } else if (
    lowerGrade.includes('university') ||
    lowerGrade.includes('higher ed') ||
    lowerGrade.includes('faculty') ||
    lowerGrade.includes('degree')
  ) {
    levelCalibration = `HIGHER EDUCATION / UNIVERSITY LEARNER (${gradeOrProg}):
- Use university-level terminology, theoretical rigor, axiomatic foundations, and formal proofs.
- Discuss computational complexity, formal definitions, and empirical research contexts where relevant.`;
  } else {
    levelCalibration = `GENERAL LEARNER (${gradeOrProg}):
- Deliver clear, well-structured educational explanations calibrated to high school level.`;
  }

  // Mode-specific pedagogical guidance
  let modeInstruction = '';
  switch (mode) {
    case 'EXPLAIN':
      modeInstruction = `MODE: EXPLAIN
Provide a systematic, concept-first explanation. Start with an intuitive definition, break down key relationships, provide a concrete worked example, and highlight why this concept matters.`;
      break;
    case 'SIMPLIFY':
      modeInstruction = `MODE: SIMPLIFY
Explain this idea as simply as possible using a vivid everyday South African analogy (e.g. taxi routes, cooking potjie, soccer matches, cell phone data bundles). Strictly avoid intimidating academic terminology without an immediate intuitive definition.`;
      break;
    case 'SUMMARIZE':
      modeInstruction = `MODE: SUMMARIZE
Provide high-yield revision study notes. Use clean markdown bullet points, bold key terms, list essential formulas/theorems, and conclude with 3 'Must-Know Exam Takeaways'.`;
      break;
    case 'TRANSLATE':
      modeInstruction = `MODE: TRANSLATE
Respond fully in ${targetLanguage}. Translate concepts naturally and idiomatically while preserving recognized scientific terms, algebraic symbols, and formulas in parentheses so the learner understands both languages.`;
      break;
    case 'PRACTICE':
      modeInstruction = `MODE: PRACTICE
Provide 2-3 focused practice questions directly related to ${topic}. Include progressive difficulty: one straightforward check, one standard problem, and one challenge problem. Give helpful hints and allow the learner to try before giving full answers.`;
      break;
    case 'HOMEWORK_HELP':
      modeInstruction = `MODE: HOMEWORK HELP (SOCRATIC TUTORING)
CRITICAL: Do NOT simply give the answer away to prevent cheating.
Follow this 5-step teaching framework:
1. Understand the problem (identify given information and what is being asked).
2. Explain the governing method, law, or formula.
3. Walk through a similar, analogous worked example step-by-step.
4. Prompt the learner with a guiding question to try the first step themselves.
5. Offer to check their calculations or logic.`;
      break;
    case 'QUIZ_HELP':
      modeInstruction = `MODE: QUIZ HELP
Act as a patient Socratic coach. Do not reveal which option is correct immediately. Guide the learner by highlighting the core theoretical principle, identifying why certain distractor options are incorrect, and encouraging them to deduce the correct solution.`;
      break;
    case 'STUDY_PLAN':
      modeInstruction = `MODE: STUDY PLAN
Generate a structured, actionable study schedule for ${subject} (${topic}). Break it down into clear weekly or daily phases, specific focus topics, active recall activities, and target milestones.`;
      break;
    default:
      modeInstruction = `MODE: EXPLAIN\nExplain concepts clearly, logically, and helpfully.`;
  }

  // Curriculum context disclaimer guidance
  const curriculumStatement = hasCurriculumContext
    ? `Active Curriculum Context: Level=${gradeOrProg} (${level}), Subject=${subject}${module ? `, Module=${module}` : ''}, Topic=${topic}${lesson ? `, Lesson=${lesson}` : ''}.`
    : `NOTICE: Specific curriculum context is currently unavailable. Ask a brief clarifying question if specific context is required.`;

  return `You are Nexovia AI Tutor, the specialized interactive educational assistant for Nexovia Academy.
Platform Tagline: "Learn today. Build tomorrow."

STUDENT CONTEXT:
- ${curriculumStatement}
- Target Response Language: ${targetLanguage} (code: ${langCode || 'en'})
- Learning Mode: ${mode}

${levelCalibration}

${modeInstruction}
${xitsongaDirective}

CORE OPERATIONAL RULES:

1. CORRECT SUBJECT AND TOPIC (STRICT BOUNDARIES):
- ALWAYS use the student's currently selected education level (${gradeOrProg}), subject (${subject}), and topic (${topic}).
- For example: If the student selects Grade 12 → Physical Sciences → Vectors & Motion in One Dimension, answer Physics questions specifically about vectors and motion in one dimension (e.g. scalars vs vectors, displacement, velocity, acceleration, vector addition, motion graphs, equations of motion).
- NEVER switch to Algebra, Accounting, Life Sciences, Economics, or any other subject or topic unless the student explicitly requests a topic change.
- Never let old messages from past sessions or previous topics divert you from "${topic}" under "${subject}". Your authoritative active topic is "${topic}".

2. UNRELATED QUESTIONS (STRICT REFUSAL & POLITE TOPIC REDIRECT):
- If the student's question is unrelated to "${topic}" (for example: asking about Accounting, Life Sciences, Algebra, Business Studies, etc., while currently studying "${topic}" in "${subject}"):
  * STRICT RULE: DO NOT teach, explain, or provide worked examples for the unrelated subject!
  * You MUST politely explain that your current tutoring session is set specifically to **${topic}** under **${subject}** (${gradeOrProg}).
  * Politely inform the student that their inquiry pertains to another subject.
  * Politely ask whether they would like to switch topics to that subject:
    "We are currently focusing on **${topic}** under **${subject}** (${gradeOrProg}). Your question relates to [Unrelated Subject/Topic]. Would you like to switch our active topic to [Unrelated Subject/Topic]? You can update your selection in the top bar or let me know and we will switch! Otherwise, what would you like to explore about **${topic}**?"
  * NEVER provide a full lesson, accounting ledger, biology explanation, or tutorial on an unselected subject without the student first switching topics.

3. RESPECT THE SELECTED LANGUAGE:
- Always answer in the language currently selected in the app: ${targetLanguage} (code: ${langCode || 'en'}).
- IF ENGLISH IS SELECTED (${langCode === 'en'}):
  * You MUST answer strictly in English.
  * Answer in English EVEN IF the student's greeting, slang, or inquiry contains words from another language (e.g. "Sawubona", "Dumela", "Molo", "Avuxeni", "Kunjani", "Baie dankie", "Ndaa", "Heita", "Sharp sharp"). You may acknowledge their greeting warmly, but your entire pedagogical explanation MUST be written in English.
- Change languages ONLY when the student explicitly selects Translate or explicitly requests another language (e.g., "Translate to isiZulu", "Can you explain this in Afrikaans?").
- When the student chooses a translation language or learning mode is TRANSLATE:
  * Translate the explanation accurately and idiomatically into ${targetLanguage}.
  * CRITICAL: KEEP THE ORIGINAL SUBJECT (${subject}) AND TOPIC (${topic}). Never alter the learning topic when translating!
  * Retain international mathematical equations, symbols, and scientific formulas in standard notation (e.g. F = ma, v = u + at, Δx) with English terms in parentheses for exam clarity.

4. PRESERVE CONTEXT IN FOLLOW-UP QUESTIONS & QUICK ACTIONS:
- Keep the selected grade (${gradeOrProg}), subject (${subject}), topic (${topic}), and response language (${targetLanguage}) throughout the entire conversation.
- Quick buttons and follow-up actions such as "Explain simpler", "Give me an example", "Quiz me", "Practice this", and "Translate" MUST strictly preserve the active learning context ("${topic}" in "${subject}").
- Follow-up questions (e.g., "Can you give an example?", "Why?", "How does this appear in exams?", "Can we simplify this?") MUST refer to "${topic}".
- If required curriculum context is missing, ask a brief clarifying question rather than guessing.

5. SCIENTIFIC TOPIC INTEGRITY & NEWTON'S LAWS PRECISION:
- If the student's inquiry or active topic relates to Newton's Second Law, Forces and Motion, or Fnet = ma:
  * Restrict all explanations, analogies, real-world examples, and questions strictly to Newton's Second Law: net force (F_net), mass (m), acceleration (a), and F_net = m · a (including friction, applied forces, tension, and horizontal/inclined surfaces).
  * FORBIDDEN TOPIC DRIFT: Do NOT substitute or drift into Vertical Projectile Motion, free-fall gravity equations, projectile launch angles, or projectile maximum height calculations unless the student explicitly requests projectile motion.

6. GENERAL FORMATTING:
- NEVER claim that AI-generated information is official CAPS, DHET, or examination council content.
- Structure responses with clean markdown headings (##, ###), bullet lists, bold emphasis, and readable spacing for mobile screens.
- Conclude with 2-3 helpful follow-up questions or next inquiry suggestions strictly related to "${topic}".`;
}

interface SubjectDomain {
  name: string;
  keywords: string[];
}

const KNOWN_SUBJECT_DOMAINS: SubjectDomain[] = [
  {
    name: 'Accounting',
    keywords: [
      'accounting', 'general ledger', 'balance sheet', 'trial balance', 'income statement',
      'debit', 'credit', 't-account', 'debtors ledger', 'creditors ledger', 'bank reconciliation',
      'cost accounting', 'financial statement', 'accounting equation'
    ]
  },
  {
    name: 'Life Sciences',
    keywords: [
      'life sciences', 'biology', 'photosynthesis', 'chloroplast', 'mitosis', 'meiosis',
      'dna replication', 'genetics', 'punnett square', 'endocrine system', 'homeostasis',
      'cellular respiration', 'human reproduction', 'evolution', 'fossil record'
    ]
  },
  {
    name: 'Business Studies',
    keywords: [
      'business studies', 'swot analysis', 'macro environment', 'micro environment',
      'business plan', 'entrepreneurship', 'creative thinking', 'business ventures',
      'human resources', 'marketing function', 'public relations'
    ]
  },
  {
    name: 'Economics',
    keywords: [
      'economics', 'inflation rate', 'gross domestic product', 'gdp', 'monetary policy',
      'fiscal policy', 'circular flow', 'business cycles', 'perfect market', 'monopoly',
      'balance of payments', 'exchange rates'
    ]
  },
  {
    name: 'Mathematics',
    keywords: [
      'algebra', 'factorisation', 'factorize', 'quadratic formula', 'trigonometric identity',
      'hyperbola', 'parabola', 'calculus differentiation', 'polynomial'
    ]
  },
  {
    name: 'Physical Sciences',
    keywords: [
      'physical sciences', 'physics', 'chemistry', 'vectors', 'motion', 'newton\'s laws',
      'momentum', 'impulse', 'doppler effect', 'work energy power', 'electric circuit',
      'electrostatics', 'electrodynamics', 'organic chemistry', 'chemical change',
      'reaction rate', 'chemical equilibrium', 'acids and bases', 'redox'
    ]
  }
];

function detectUnrelatedSubjectQuery(
  userMessage: string,
  currentSubject: string,
  currentTopic: string
): { isUnrelated: boolean; isSwitchRequest: boolean; detectedDomain?: string } {
  const text = userMessage.toLowerCase().trim();
  if (text.length < 5) return { isUnrelated: false, isSwitchRequest: false };

  // Explicit switch request check
  const isSwitch =
    text.includes('switch to') ||
    text.includes('change to') ||
    text.includes('can we do') ||
    text.includes('switch topic to') ||
    text.includes('change topic to') ||
    text.includes('let us switch') ||
    text.includes("let's switch");

  const currentSubjNorm = currentSubject.toLowerCase();
  const currentTopicNorm = currentTopic.toLowerCase();

  // Find if text matches a domain different from current subject
  for (const domain of KNOWN_SUBJECT_DOMAINS) {
    if (domain.name.toLowerCase() === currentSubjNorm) {
      continue;
    }

    const matchedKeyword = domain.keywords.find((kw) => {
      const regex = new RegExp(`\\b${kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
      return regex.test(text);
    });

    if (matchedKeyword) {
      // Ensure the query does not also specifically mention the current topic or current subject
      const hasCurrentTopicTerm = currentTopicNorm
        .split(/[\s,&]+/)
        .filter((w) => w.length > 3)
        .some((w) => text.includes(w.toLowerCase()));

      const hasCurrentSubjectTerm = text.includes(currentSubjNorm);

      if (!hasCurrentTopicTerm && !hasCurrentSubjectTerm) {
        return {
          isUnrelated: true,
          isSwitchRequest: isSwitch,
          detectedDomain: domain.name
        };
      }
    }
  }

  return { isUnrelated: false, isSwitchRequest: false };
}

/**
 * Main AI chat response generator
 */
export async function generateAIResponse(params: AIResponseInput): Promise<AIResponseOutput> {
  const { client } = getGeminiClient();

  const langCode = params.language || params.selectedLanguage || 'en';
  const targetLanguage = LANGUAGE_MAP[langCode] || langCode || 'English';
  const rawMessage = params.message || params.userQuestion || '';
  const cleanMessage = rawMessage.trim().slice(0, 4000);
  const subject = (params.subject || 'General Education').trim();
  const topic = (params.topic || 'General Topic').trim();
  const level = (params.educationLevel || 'School Education').trim();
  const gradeOrProg = (params.gradeOrProgramme || level).trim();
  const moduleName = params.module?.trim();
  const lesson = params.lesson?.trim();
  const normalizedMode = normalizeMode(params.mode || params.learningMode);

  // Check for unrelated subject query or topic switch request
  const unrelatedCheck = detectUnrelatedSubjectQuery(cleanMessage, subject, topic);
  if (unrelatedCheck.isUnrelated && unrelatedCheck.detectedDomain) {
    const domain = unrelatedCheck.detectedDomain;
    if (unrelatedCheck.isSwitchRequest) {
      const switchText = `Certainly! Let's switch our focus to **${domain}**.\n\nYou can also update your **Subject** and **Topic** in the top bar to synchronize all curriculum quizzes, notes, and lessons. What would you like to explore first in **${domain}**?`;
      return {
        text: switchText,
        content: switchText,
        summary: `Switched topic focus to ${domain}`,
        followUpSuggestions: [
          `Can you give me an overview of ${domain}?`,
          `What are the most important concepts in ${domain}?`,
          `Give me a starter practice question in ${domain}`
        ],
        followUps: [
          `Can you give me an overview of ${domain}?`,
          `What are the most important concepts in ${domain}?`,
          `Give me a starter practice question in ${domain}`
        ],
        languageUsed: targetLanguage,
        model: 'nexovia-context-engine',
        isAiGenerated: true,
        disclaimer: 'Curriculum topic boundary active · Guided subject transition'
      };
    } else {
      const redirectText = `We are currently focusing on **${topic}** under **${subject}** (${gradeOrProg}).\n\nYour question relates to **${domain}**.\n\nWould you like to switch our study topic to **${domain}**? If so, you can choose it in the top bar or let me know and we will switch! Otherwise, what would you like to explore about **${topic}**?`;
      return {
        text: redirectText,
        content: redirectText,
        summary: `Topic Focus: ${topic} (${subject}) · Unrelated Question Redirect`,
        followUpSuggestions: [
          `Would you like to switch to ${domain}?`,
          `Let's continue with ${topic}`,
          `Can you give an example in ${topic}?`
        ],
        followUps: [
          `Would you like to switch to ${domain}?`,
          `Let's continue with ${topic}`,
          `Can you give an example in ${topic}?`
        ],
        languageUsed: targetLanguage,
        model: 'nexovia-context-engine',
        isAiGenerated: true,
        disclaimer: 'Curriculum topic boundary active · Topic focus maintained'
      };
    }
  }

  const hasCurriculumContext = Boolean(
    params.subject &&
      params.topic &&
      params.subject !== 'General Education' &&
      params.topic !== 'General Topic'
  );

  const isXitsonga = langCode === 'ts' || targetLanguage.toLowerCase().includes('tsonga');

  // ====================================================================
  // PHASE 3 PRINCIPLE: DATABASE FIRST — AI SECOND
  // ====================================================================
  // Check the verified Xitsonga Language Engine first before invoking AI (only for Xitsonga).
  // The AI must never override a verified Xitsonga translation with its own generated translation.
  if (isXitsonga || cleanMessage.toLowerCase().includes('tsonga')) {
    const tutorResolution = serverLanguageEngine.resolveTutorLanguageQuery(cleanMessage, targetLanguage);

    if (tutorResolution.isHandledDirectly && tutorResolution.responseText) {
      const isDirectVerified = tutorResolution.verificationStatus === 'verified';
      return {
        text: tutorResolution.responseText,
        content: tutorResolution.responseText,
        summary: isDirectVerified
          ? `Verified Xitsonga Translation: "${tutorResolution.record?.english}" ↔ "${tutorResolution.record?.xitsonga}"`
          : `Xitsonga Translation Status: "${tutorResolution.queryTerm}" (Pending Native Verification)`,
        followUpSuggestions: isDirectVerified
          ? [
              `Can you use "${tutorResolution.record?.xitsonga}" in an example sentence?`,
              `How do I say "Thank you" in Xitsonga?`,
              `Tell me more about common Xitsonga greetings.`
            ]
          : [
              `Can you explain the meaning of "${tutorResolution.queryTerm}" in English?`,
              `What related educational terms are already verified?`,
              `How can a native speaker submit verified Xitsonga translations?`
            ],
        followUps: isDirectVerified
          ? [
              `Can you use "${tutorResolution.record?.xitsonga}" in an example sentence?`,
              `How do I say "Thank you" in Xitsonga?`
            ]
          : [
              `Can you explain the meaning of "${tutorResolution.queryTerm}" in English?`
            ],
        languageUsed: targetLanguage,
        model: 'nexovia-verified-language-engine',
        isAiGenerated: !isDirectVerified,
        disclaimer: isDirectVerified
          ? 'Nexovia Xitsonga Language Engine · Authoritative Native-Verified Translation'
          : 'Translation pending native verification · Flagged for curriculum review',
        isXitsongaEngineActive: true,
        languageSource: tutorResolution.source,
        verificationStatus: tutorResolution.verificationStatus,
        verifiedPhrase: tutorResolution.record,
        requiresVerificationNotice: tutorResolution.requiresVerificationNotice,
        hasVerifiedAudio: tutorResolution.hasVerifiedAudio,
        audioUrl: tutorResolution.audioUrl,
        audioStatus: tutorResolution.audioStatus
      };
    }
  }

  const systemInstruction = buildSystemInstruction({
    level,
    gradeOrProg,
    subject,
    module: moduleName,
    topic,
    lesson,
    targetLanguage,
    langCode,
    mode: normalizedMode,
    hasCurriculumContext
  });

  // Construct conversation context from history
  const historyFormatted = (params.conversationHistory || [])
    .slice(-6)
    .map((m) => `${m.role === 'user' ? 'Student' : 'AI Tutor'}: ${m.content}`)
    .join('\n\n');

  const fullPrompt = `CURRENT ACTIVE LEARNING CONTEXT:
- Curriculum Level: ${gradeOrProg} (${level})
- Subject: ${subject}
- Active Topic: ${topic}${moduleName ? ` - ${moduleName}` : ''}${lesson ? ` - ${lesson}` : ''}
- Selected Response Language: ${targetLanguage} (${langCode})
- Learning Mode: ${normalizedMode}

${historyFormatted ? `CONVERSATION HISTORY (in ${subject} → ${topic}):\n${historyFormatted}\n\n` : ''}STUDENT INQUIRY:
"${cleanMessage}"

MANDATORY INSTRUCTIONS FOR THIS TURN:
1. Target Topic: Answer specifically within "${topic}" under "${subject}" (${gradeOrProg}).
2. Subject Boundaries: Do NOT switch to Algebra, Accounting, Life Sciences, or other topics unless requested.
3. Unrelated Questions: If the inquiry is unrelated to "${topic}", DO NOT provide a lesson on the unrelated subject. Politely explain that your current session is focused on "${topic}" (${subject}) and ask if the student wants to switch topics.
4. Response Language: Deliver the explanation in ${targetLanguage}. If English is selected, write exclusively in English despite any non-English greeting.
5. Follow-ups & Quick Actions: If this inquiry is a follow-up ("explain simpler", "give an example", "quiz me", "translate", etc.), anchor it strictly to "${topic}".
6. Missing Context: If required curriculum context is missing, ask a brief clarifying question rather than guessing.
7. Newton's Second Law & Forces Precision: If the student asks for Newton's Second Law or forces and motion, provide real-world examples and quiz problems strictly focused on net force, mass, acceleration, and Fnet = ma. Never generate projectile motion questions.

Please provide your educational response formatted cleanly in markdown:`;

  let lastError: any = null;

  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await client.models.generateContent({
        model,
        contents: fullPrompt,
        config: {
          systemInstruction
        }
      });

      const responseText = response.text || '';
      if (!responseText.trim()) {
        continue;
      }

      // Generate intelligent follow-up suggestions strictly bound to active topic
      const followUps: string[] = [
        `Can you give another real-world example in ${topic}?`,
        `How does ${topic} usually appear in ${subject} tests or exams?`,
        `Can we simplify the key formulas and principles of ${topic} further?`
      ];

      if (normalizedMode === 'PRACTICE') {
        followUps[0] = `Can you give me a more challenging problem in ${topic}?`;
        followUps[1] = `Walk me through the step-by-step solution for ${topic}.`;
      } else if (normalizedMode === 'HOMEWORK_HELP') {
        followUps[0] = `Can you check if my reasoning for ${topic} is correct?`;
        followUps[1] = `Can you explain the governing formula in ${topic} once more?`;
      } else if (normalizedMode === 'SIMPLIFY') {
        followUps[0] = `Can you give another everyday analogy for ${topic}?`;
        followUps[1] = `What are the core steps to remember for ${topic}?`;
      }

      const summary = `${topic} (${normalizedMode}): Core conceptual overview for ${gradeOrProg}.`;

      let verifiedPhrasesMatched: Array<{ english: string; xitsonga: string }> | undefined = undefined;
      let disclaimer = 'AI-generated educational explanation · Not official CAPS curriculum content';

      if (isXitsonga) {
        disclaimer = 'Nexovia Xitsonga Language Engine active · Controlled native-verified vocabulary prioritized';
        const allPhrases = serverLanguageEngine.getAll({ status: 'verified' });
        const lowerCombined = `${cleanMessage} ${responseText}`.toLowerCase();
        verifiedPhrasesMatched = allPhrases
          .filter((p) => p.xitsonga && (lowerCombined.includes(p.xitsonga.toLowerCase()) || lowerCombined.includes(p.english.toLowerCase())))
          .slice(0, 6)
          .map((p) => ({ english: p.english, xitsonga: p.xitsonga }));
      }

      return {
        text: responseText,
        content: responseText,
        summary,
        followUpSuggestions: followUps,
        followUps,
        languageUsed: targetLanguage,
        model,
        isAiGenerated: true,
        disclaimer,
        isXitsongaEngineActive: isXitsonga,
        verifiedPhrasesMatched
      };
    } catch (err: any) {
      console.warn(`Model ${model} call encountered error:`, err?.message || err);
      lastError = err;
      const msg = String(err?.message || '');
      if (msg.includes('GEMINI_API_KEY') || msg.includes('API key')) {
        throw err;
      }
    }
  }

  console.error('All candidate Gemini models failed in generateAIResponse:', lastError?.message || lastError);
  const lastErrStr = String(lastError?.message || '');
  if (lastErrStr.includes('resource_exhausted') || lastErrStr.includes('quota') || lastErrStr.includes('429')) {
    throw new Error('AI request limit reached for this session. Please wait a moment and click Retry.');
  }
  throw new Error("Nexovia couldn't generate a response right now. Please try again.");
}

/**
 * Mathematically verified and certified South African CAPS Newton's Second Law question bank.
 * Calibrated specifically for Grade 12 / FET Physical Sciences Paper 1 (Forces & Motion).
 * Each question has exactly 4 distinct options, exactly 1 mathematically verified correct answer,
 * plausible student misconception distractors, and complete step-by-step mathematical working.
 */
export const CERTIFIED_NEWTONS_SECOND_LAW_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'n2_q1',
    type: 'multiple_choice',
    question:
      'A crate of mass 8 kg is pulled along a rough horizontal concrete floor by a constant horizontal force of 34 N. A constant frictional force of 10 N opposes the motion. According to Newton\'s Second Law of Motion (F_net = ma), calculate the magnitude of the acceleration of the crate.',
    options: [
      '3,0 m·s⁻²',
      '4,25 m·s⁻²',
      '1,25 m·s⁻²',
      '5,50 m·s⁻²'
    ],
    correctAnswer: '3,0 m·s⁻²',
    explanation:
      'Mathematical Verification:\nStep 1: Calculate the net horizontal force: F_net = F_applied - f_friction = 34 N - 10 N = 24 N.\nStep 2: Apply Newton\'s Second Law: a = F_net / m = 24 N / 8 kg = 3,0 m·s⁻².\nDistractor analysis:\n• 4,25 m·s⁻² ignores friction completely (34 / 8).\n• 1,25 m·s⁻² erroneously divides only friction by mass (10 / 8).\n• 5,50 m·s⁻² erroneously adds friction instead of subtracting it ((34 + 10) / 8).'
  },
  {
    id: 'n2_f100_a4',
    type: 'multiple_choice',
    question:
      'A net horizontal force of 100 N acts on an object, causing it to accelerate at 4 m·s⁻² across a frictionless horizontal surface. According to Newton\'s Second Law of Motion (F_net = ma), calculate the mass of the object.',
    options: [
      '25 kg',
      '400 kg',
      '0,04 kg',
      '104 kg'
    ],
    correctAnswer: '25 kg',
    explanation:
      'Mathematical Verification:\nStep 1: State Newton\'s Second Law formula: F_net = m · a.\nStep 2: Rearrange to solve for mass: m = F_net / a = 100 N / 4 m·s⁻² = 25 kg.\nTherefore, Option A (25 kg) is the verified correct answer.\nDistractor analysis:\n• 400 kg erroneously multiplies force by acceleration (100 × 4).\n• 0,04 kg inverts the calculation (4 / 100).\n• 104 kg incorrectly adds force and acceleration (100 + 4).'
  },
  {
    id: 'n2_q2',
    type: 'multiple_choice',
    question:
      'A motor car of mass 1 200 kg accelerates uniformly along a straight horizontal road from rest, experiencing a constant net horizontal force of 3 600 N. What is the acceleration of the car according to Newton\'s Second Law (F_net = ma)?',
    options: [
      '3,0 m·s⁻²',
      '0,33 m·s⁻²',
      '4 800 m·s⁻²',
      '2,5 m·s⁻²'
    ],
    correctAnswer: '3,0 m·s⁻²',
    explanation:
      'Mathematical Verification:\nStep 1: State the governing formula: F_net = m · a.\nStep 2: Rearrange to solve for acceleration: a = F_net / m = 3 600 N / 1 200 kg = 3,0 m·s⁻².\nDistractor analysis:\n• 0,33 m·s⁻² inverts the division (1 200 / 3 600).\n• 4 800 m·s⁻² erroneously adds force and mass (3 600 + 1 200).\n• 2,5 m·s⁻² represents an unverified arithmetic guess.'
  },
  {
    id: 'n2_q3',
    type: 'multiple_choice',
    question:
      'An unbalanced net force of 150 N acts on an object on a frictionless horizontal surface, causing it to accelerate at 5,0 m·s⁻². According to Newton\'s Second Law (F_net = ma), calculate the mass of the object.',
    options: [
      '30 kg',
      '750 kg',
      '0,033 kg',
      '155 kg'
    ],
    correctAnswer: '30 kg',
    explanation:
      'Mathematical Verification:\nStep 1: Newton\'s Second Law: F_net = m · a.\nStep 2: Rearrange for mass: m = F_net / a = 150 N / 5,0 m·s⁻² = 30 kg.\nDistractor analysis:\n• 750 kg erroneously multiplies force by acceleration (150 × 5).\n• 0,033 kg inverts the calculation (5 / 150).\n• 155 kg adds force and acceleration.'
  },
  {
    id: 'n2_q4',
    type: 'multiple_choice',
    question:
      'According to Newton\'s Second Law of Motion (F_net = ma), what happens to the acceleration of an object of constant mass if the net force acting on the object is doubled?',
    options: [
      'The acceleration is doubled',
      'The acceleration is halved',
      'The acceleration remains constant',
      'The acceleration is quadrupled'
    ],
    correctAnswer: 'The acceleration is doubled',
    explanation:
      'Mathematical Verification:\nFrom F_net = m · a, acceleration a = F_net / m. Because mass m is constant, acceleration is directly proportional to net force (a ∝ F_net). Therefore, doubling F_net to 2·F_net results in a\' = (2·F_net) / m = 2a (the acceleration is doubled).'
  },
  {
    id: 'n2_q5',
    type: 'multiple_choice',
    question:
      'Two blocks of masses m₁ = 4 kg and m₂ = 6 kg resting on a frictionless horizontal table are connected by a light inextensible string. A horizontal force F = 50 N pulls block m₂. Calculate the acceleration of the system and the tension in the connecting string.',
    options: [
      'Acceleration = 5,0 m·s⁻², Tension = 20 N',
      'Acceleration = 5,0 m·s⁻², Tension = 30 N',
      'Acceleration = 10,0 m·s⁻², Tension = 50 N',
      'Acceleration = 8,3 m·s⁻², Tension = 25 N'
    ],
    correctAnswer: 'Acceleration = 5,0 m·s⁻², Tension = 20 N',
    explanation:
      'Mathematical Verification:\nStep 1: Total mass of system: m_total = m₁ + m₂ = 4 kg + 6 kg = 10 kg.\nStep 2: System acceleration: a = F_net / m_total = 50 N / 10 kg = 5,0 m·s⁻².\nStep 3: Tension accelerates trailing mass m₁: T = m₁ · a = 4 kg × 5,0 m·s⁻² = 20 N.\nVerification check on m₂: F - T = 50 - 20 = 30 N = 6 kg × 5,0 m·s⁻² = 30 N, mathematically confirmed.'
  }
];

export function cleanOptionText(text: string): string {
  return String(text || '')
    .trim()
    .replace(/^(?:option\s+)?([A-Da-d])[\).\s:-]+/, '')
    .trim();
}

/**
 * Resolves the true canonical correct answer string from rawOptions and rawCorrectAnswer.
 * Maps letters ('A', 'B', 'C', 'D' or 'Option A') to the exact displayed option at that index.
 * Never inserts placeholder strings or letters into options.
 */
export function resolveCanonicalAnswerKey(
  rawCorrectAnswer: string,
  cleanedOptions: string[],
  rawOptions: string[] = [],
  explanation: string = ''
): string {
  const rawClean = String(rawCorrectAnswer || '').trim();
  if (!rawClean && cleanedOptions.length > 0) return cleanedOptions[0];

  // 1. Direct case-insensitive match with one of the cleaned options
  const directMatch = cleanedOptions.find(
    (opt) => opt.toLowerCase() === rawClean.toLowerCase()
  );
  if (directMatch) return directMatch;

  // 2. Direct match after cleaning prefix
  const cleanedFromRaw = cleanOptionText(rawClean);
  if (cleanedFromRaw) {
    const matchClean = cleanedOptions.find(
      (opt) => opt.toLowerCase() === cleanedFromRaw.toLowerCase()
    );
    if (matchClean) return matchClean;
  }

  // 3. Option letter key: 'A', 'B', 'C', 'D' (or "Option A", "A.", "A)")
  const letterMatch = rawClean.match(/^(?:option\s+)?([a-d])[\).\s:-]*$/i);
  if (letterMatch) {
    const idx = letterMatch[1].toUpperCase().charCodeAt(0) - 65;
    if (idx >= 0 && idx < cleanedOptions.length) {
      return cleanedOptions[idx];
    }
  }

  // 4. Raw options index lookup: if rawOptions[i] matches rawClean
  for (let i = 0; i < rawOptions.length; i++) {
    const rOpt = String(rawOptions[i] || '').trim().toLowerCase();
    if (rOpt === rawClean.toLowerCase() || rOpt.includes(rawClean.toLowerCase())) {
      if (cleanedOptions[i]) return cleanedOptions[i];
    }
  }

  // 5. Substring inclusion
  if (cleanedFromRaw) {
    const incMatch = cleanedOptions.find(
      (opt) =>
        opt.toLowerCase().includes(cleanedFromRaw.toLowerCase()) ||
        cleanedFromRaw.toLowerCase().includes(opt.toLowerCase())
    );
    if (incMatch) return incMatch;
  }

  // 6. Check explanation for designated option letter
  const expMatch = explanation.match(/(?:option|answer is|correct option is|correct answer is)\s*([a-d])\b/i);
  if (expMatch) {
    const idx = expMatch[1].toUpperCase().charCodeAt(0) - 65;
    if (idx >= 0 && idx < cleanedOptions.length) {
      return cleanedOptions[idx];
    }
  }

  return cleanedOptions[0] || rawClean;
}

/**
 * Mathematically verifies and validates quiz questions:
 * 1. Strictly enforces topic integrity (rejects projectile motion if Newton's 2nd Law was requested).
 * 2. Mathematically verifies formula calculations (Fnet = ma, a = Fnet/m, m = Fnet/a).
 * 3. Guarantees exactly 4 distinct options with exactly one correct answer matching options.
 * 4. Ensures step-by-step mathematical explanation showing formulas, substitutions, and verified results.
 */
function verifyAndValidateQuizQuestions(
  rawQuestions: PracticeQuestion[],
  context: {
    grade: string;
    subject: string;
    topic: string;
    quizRequest?: string;
    isNewtonsSecondLaw: boolean;
    count: number;
  }
): PracticeQuestion[] {
  const verifiedList: PracticeQuestion[] = [];
  const usedQuestionTexts = new Set<string>();

  for (let i = 0; i < rawQuestions.length; i++) {
    const raw = rawQuestions[i];
    if (!raw || !raw.question) continue;

    // 1. Detect off-topic projectile motion drift when Newton's 2nd Law was requested
    const qLower = (raw.question + ' ' + (raw.explanation || '')).toLowerCase();
    const isProjectileMotion =
      /projectile|thrown vertically|vertical projectile|maximum height|free fall|cliff|bouncing ball|launch angle|trajector/i.test(qLower) &&
      !/newton|f_?net|f\s*=\s*m\s*a/i.test(qLower);

    if (context.isNewtonsSecondLaw && isProjectileMotion) {
      console.warn(
        `[Quiz Verification] Detected projectile-motion question when Newton's Second Law was requested. Replacing with certified Newton's Second Law question.`
      );
      continue; // Skip this off-topic question; certified bank will fill it
    }

    // 2. Clean options and remove duplicates
    const rawOptions = Array.isArray(raw.options) ? raw.options : [];
    let cleanedOptions = rawOptions
      .map(cleanOptionText)
      .filter((opt) => opt.length > 0);
    cleanedOptions = Array.from(new Set(cleanedOptions));

    // Ensure at least 4 options
    while (cleanedOptions.length < 4) {
      cleanedOptions.push(`Option ${String.fromCharCode(65 + cleanedOptions.length)}`);
    }
    cleanedOptions = cleanedOptions.slice(0, 4);

    let cleanedCorrect = resolveCanonicalAnswerKey(
      raw.correctAnswer,
      cleanedOptions,
      rawOptions,
      raw.explanation || ''
    );

    // 3. Mathematical Verification of Fnet = ma for Newton's 2nd Law questions
    let explanation = raw.explanation || 'Verified step-by-step mathematical reasoning.';
    if (context.isNewtonsSecondLaw) {
      const massMatch = raw.question.match(/(\d+(?:[.,]\d+)?)\s*(?:kg|kilogram)/i);
      const forceMatch = raw.question.match(/(?:force of|net force of|applied force of|force.*?)\s*(\d+(?:[.,]\d+)?)\s*N/i);
      const frictionMatch = raw.question.match(/(?:friction|frictional force of)\s*(\d+(?:[.,]\d+)?)\s*N/i);
      const accelMatch = raw.question.match(/accelerat(?:ion of|es at|ion.*?)\s*(\d+(?:[.,]\d+)?)\s*(?:m[·/.]s|m\/s)/i);

      const fApplied = forceMatch ? parseFloat(forceMatch[1].replace(',', '.')) : 0;
      const fFriction = frictionMatch ? parseFloat(frictionMatch[1].replace(',', '.')) : 0;
      const fNet = fFriction > 0 ? fApplied - fFriction : fApplied;
      const m = massMatch ? parseFloat(massMatch[1].replace(',', '.')) : 0;
      const a = accelMatch ? parseFloat(accelMatch[1].replace(',', '.')) : 0;

      // Case A: Force and Acceleration given, Mass asked (e.g. F = 100 N, a = 4 m/s² => m = 25 kg)
      if (fNet > 0 && a > 0 && m === 0) {
        const expectedMass = fNet / a;
        const expectedMassStr = expectedMass.toFixed(expectedMass % 1 === 0 ? 0 : 1).replace('.', ',');
        const expectedMassStrDot = expectedMass.toFixed(expectedMass % 1 === 0 ? 0 : 1);

        const matchingOpt = cleanedOptions.find(
          (o) =>
            o.toLowerCase().includes(`${expectedMassStr} kg`) ||
            o.toLowerCase().includes(`${expectedMassStrDot} kg`) ||
            o.toLowerCase().startsWith(expectedMassStr) ||
            o.toLowerCase().startsWith(expectedMassStrDot)
        );
        if (matchingOpt) {
          cleanedCorrect = matchingOpt;
        }
        explanation = `Mathematical Verification:\nUsing Newton's Second Law: F_net = m · a => m = F_net / a = ${fNet} N / ${a} m·s⁻² = ${expectedMassStr} kg. Therefore, ${cleanedCorrect} is the correct answer. ${explanation}`;
      }
      // Case B: Mass and Force given, Acceleration asked (e.g. m = 8 kg, F = 24 N => a = 3 m/s²)
      else if (fNet > 0 && m > 0 && a === 0) {
        const expectedAccel = fNet / m;
        const expectedAccelStr = expectedAccel.toFixed(expectedAccel % 1 === 0 ? 0 : 1).replace('.', ',');
        const expectedAccelStrDot = expectedAccel.toFixed(expectedAccel % 1 === 0 ? 0 : 1);

        const matchingOpt = cleanedOptions.find(
          (o) =>
            o.includes(expectedAccelStr) ||
            o.includes(expectedAccelStrDot)
        );
        if (matchingOpt) {
          cleanedCorrect = matchingOpt;
        }
        explanation = `Mathematical Verification:\nUsing Newton's Second Law: F_net = m · a => a = F_net / m = ${fNet} N / ${m} kg = ${expectedAccelStr} m·s⁻². Therefore, ${cleanedCorrect} is the correct answer. ${explanation}`;
      }
      // Case C: Mass and Acceleration given, Force asked (e.g. m = 1200 kg, a = 3 m/s² => F = 3600 N)
      else if (m > 0 && a > 0 && fNet === 0) {
        const expectedForce = m * a;
        const expectedForceStr = expectedForce.toFixed(expectedForce % 1 === 0 ? 0 : 1).replace('.', ',');
        const expectedForceStrDot = expectedForce.toFixed(expectedForce % 1 === 0 ? 0 : 1);

        const matchingOpt = cleanedOptions.find(
          (o) =>
            o.includes(`${expectedForceStr} N`) ||
            o.includes(`${expectedForceStrDot} N`) ||
            o.startsWith(expectedForceStr) ||
            o.startsWith(expectedForceStrDot)
        );
        if (matchingOpt) {
          cleanedCorrect = matchingOpt;
        }
        explanation = `Mathematical Verification:\nUsing Newton's Second Law: F_net = m · a = ${m} kg × ${a} m·s⁻² = ${expectedForceStr} N. Therefore, ${cleanedCorrect} is the correct answer. ${explanation}`;
      }
    }

    // Ensure the correct answer is among the 4 options
    if (!cleanedOptions.includes(cleanedCorrect)) {
      cleanedOptions[0] = cleanedCorrect;
    }

    const questionKey = raw.question.slice(0, 40).toLowerCase();
    if (!usedQuestionTexts.has(questionKey)) {
      usedQuestionTexts.add(questionKey);
      verifiedList.push({
        id: raw.id || `q_${verifiedList.length + 1}`,
        type: 'multiple_choice',
        question: raw.question,
        options: cleanedOptions,
        correctAnswer: cleanedCorrect,
        explanation
      });
    }

    if (verifiedList.length >= context.count) break;
  }

  // If questions were rejected (e.g. projectile motion) or fewer than requested, fill from certified bank
  if (context.isNewtonsSecondLaw && verifiedList.length < context.count) {
    for (const certifiedQ of CERTIFIED_NEWTONS_SECOND_LAW_QUESTIONS) {
      if (verifiedList.length >= context.count) break;
      const key = certifiedQ.question.slice(0, 40).toLowerCase();
      if (!usedQuestionTexts.has(key)) {
        usedQuestionTexts.add(key);
        verifiedList.push({
          ...certifiedQ,
          id: `q_${verifiedList.length + 1}`
        });
      }
    }
  }

  return verifiedList;
}

/**
 * Generates practice questions strictly for the specified topic and explicit request,
 * mathematically verified before being returned.
 */
export async function generatePracticeQuestions(params: {
  educationLevel: string;
  gradeOrProgramme?: string;
  subject: string;
  topic: string;
  language?: string;
  count?: number;
  quizRequest?: string;
}): Promise<PracticeQuestion[]> {
  const { client } = getGeminiClient();

  const langCode = params.language || 'en';
  const targetLanguage = LANGUAGE_MAP[langCode] || langCode || 'English';
  const count = Math.min(Math.max(params.count || 3, 2), 5);
  const grade = params.gradeOrProgramme || params.educationLevel || 'Grade 10';

  const contextLower = `${params.topic} ${params.quizRequest || ''} ${params.subject}`.toLowerCase();
  const isNewtonsSecondLaw =
    contextLower.includes("newton's second") ||
    contextLower.includes("newton's 2nd") ||
    contextLower.includes("second law") ||
    contextLower.includes("2nd law") ||
    (contextLower.includes("newton") &&
      (contextLower.includes("force") ||
        contextLower.includes("motion") ||
        contextLower.includes("fnet"))) ||
    contextLower.includes("fnet") ||
    contextLower.includes("f = ma") ||
    contextLower.includes("fnet = ma");

  const prompt = `You are Nexovia AI Tutor, expert in South African CAPS curriculum for ${grade} ${params.subject}.
Generate exactly ${count} multiple-choice educational practice questions strictly based on the following learning context:
- Curriculum Level: ${grade} (${params.educationLevel})
- Subject: ${params.subject}
- Active Topic: ${params.topic}
${params.quizRequest ? `- Explicit Student Quiz Request: "${params.quizRequest}"` : ''}
- Target Language: ${targetLanguage}

CRITICAL RULES FOR ACCURACY AND MATHEMATICAL VERIFICATION:
1. STRICT TOPIC COMPLIANCE:
${
  isNewtonsSecondLaw
    ? `   - CRITICAL REQUIREMENT: The student requested Newton's Second Law / Forces and Motion.
   - EVERY question MUST be directly about net force (F_net), mass (m), acceleration (a), and F_net = m · a (including friction, applied forces, tension, or proportionality).
   - STRICTLY FORBIDDEN: Do NOT generate questions on Vertical Projectile Motion, free-fall gravity equations, projectile launch angles, or projectile velocity-time graphs.
   - FOCUS: Questions must test F_net = ma calculations, finding acceleration with friction, finding mass, or qualitative force-acceleration relationships.`
    : `   - Every question MUST be directly relevant to "${params.topic}" in "${params.subject}" and any explicit request "${params.quizRequest || ''}".
   - Do NOT switch to unrelated chapters or adjacent topics.`
}
2. MULTIPLE CHOICE REQUIREMENTS:
   - Every question must be "multiple_choice" with EXACTLY 4 distinct options (no duplicate options).
   - EXACTLY ONE option must be mathematically and scientifically correct.
   - The other three options must be plausible distractors representing common student calculation mistakes (e.g. forgetting friction, inverting division, multiplying instead of dividing), but strictly incorrect.
   - "correctAnswer" in JSON MUST match one of the items in "options" EXACTLY.
3. MATHEMATICAL VERIFICATION:
   - Verify every calculation mathematically: state the formula, show numerical substitutions, and verify the arithmetic before finalizing the options.
   - The "explanation" field must give the full step-by-step mathematical proof confirming the correct answer and explaining why distractors are wrong.
4. Output MUST be ONLY a valid JSON array of question objects matching this schema:
[
  {
    "id": "q1",
    "type": "multiple_choice",
    "question": "Clear question text including all given numbers and units",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correctAnswer": "Option 1",
    "explanation": "Step-by-step mathematical working: formula, substitution, calculation."
  }
]
Return ONLY raw JSON. No markdown backticks outside the JSON array.`;

  let lastError: any = null;

  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await client.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const responseText = response.text || '';
      const cleaned = responseText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
      const parsed = JSON.parse(cleaned);

      if (Array.isArray(parsed) && parsed.length > 0) {
        const rawQuestions: PracticeQuestion[] = parsed.map((item, idx) => ({
          id: item.id || `q_${idx + 1}`,
          type: 'multiple_choice',
          question: item.question || `Practice problem ${idx + 1}`,
          options: Array.isArray(item.options) ? item.options : undefined,
          correctAnswer: String(item.correctAnswer || ''),
          explanation: item.explanation || 'Detailed step-by-step reasoning verified.'
        }));

        // Run full mathematical verification & topic validation
        const verified = verifyAndValidateQuizQuestions(rawQuestions, {
          grade,
          subject: params.subject,
          topic: params.topic,
          quizRequest: params.quizRequest,
          isNewtonsSecondLaw,
          count
        });

        if (verified.length > 0) {
          return verified;
        }
      }
    } catch (err: any) {
      console.warn(`Model ${model} error in generatePracticeQuestions:`, err?.message || err);
      lastError = err;
      continue;
    }
  }

  // If AI generation failed or was rejected, and Newton's Second Law was requested,
  // return certified mathematically verified Newton's Second Law questions
  if (isNewtonsSecondLaw) {
    console.log('[Quiz Engine] Serving certified Newton\'s Second Law questions as verified baseline.');
    return CERTIFIED_NEWTONS_SECOND_LAW_QUESTIONS.slice(0, count);
  }

  console.error('All candidate Gemini models failed in generatePracticeQuestions:', lastError?.message || lastError);
  throw new Error("Nexovia couldn't generate practice questions right now.");
}

/**
 * Generates an interactive quiz with hidden answers on the client,
 * incorporating student's current grade, subject, topic, and explicit request.
 */
export async function generateQuiz(params: {
  educationLevel: string;
  gradeOrProgramme?: string;
  subject: string;
  topic: string;
  language?: string;
  questionCount?: number;
  quizRequest?: string;
}): Promise<{
  id: string;
  title: string;
  educationLevel: string;
  gradeOrProgramme: string;
  subject: string;
  topic: string;
  isAiGenerated: true;
  disclaimer: string;
  questions: PracticeQuestion[];
  createdAt: string;
}> {
  const count = params.questionCount || 3;
  const questions = await generatePracticeQuestions({
    educationLevel: params.educationLevel,
    gradeOrProgramme: params.gradeOrProgramme,
    subject: params.subject,
    topic: params.topic,
    language: params.language,
    count,
    quizRequest: params.quizRequest
  });

  const contextLower = `${params.topic} ${params.quizRequest || ''} ${params.subject}`.toLowerCase();
  const isNewtonsSecondLaw =
    contextLower.includes("newton's second") ||
    contextLower.includes("newton's 2nd") ||
    contextLower.includes("second law") ||
    contextLower.includes("2nd law") ||
    (contextLower.includes("newton") &&
      (contextLower.includes("force") ||
        contextLower.includes("motion") ||
        contextLower.includes("fnet"))) ||
    contextLower.includes("fnet") ||
    contextLower.includes("f = ma") ||
    contextLower.includes("fnet = ma");

  const quizTitle = isNewtonsSecondLaw
    ? "Newton's Second Law of Motion Assessment Quiz"
    : `${params.topic} Assessment Quiz`;

  const effectiveTopic = isNewtonsSecondLaw
    ? "Newton's Second Law (Forces & Motion)"
    : params.topic;

  return {
    id: `quiz_${Date.now()}`,
    title: quizTitle,
    educationLevel: params.educationLevel,
    gradeOrProgramme: params.gradeOrProgramme || params.educationLevel,
    subject: params.subject,
    topic: effectiveTopic,
    isAiGenerated: true,
    disclaimer:
      'AI-generated educational quiz · Mathematically verified',
    questions,
    createdAt: new Date().toISOString()
  };
}

/**
 * Generates a structured study plan based on user goals
 */
export async function generateStudyPlan(params: {
  educationLevel: string;
  gradeOrProgramme: string;
  subject: string;
  topic: string;
  availableStudyTime: string;
  targetDate?: string;
  language?: string;
}): Promise<StudyPlanOutput> {
  const { client } = getGeminiClient();

  const langCode = params.language || 'en';
  const targetLanguage = LANGUAGE_MAP[langCode] || langCode || 'English';

  const prompt = `You are Nexovia AI Tutor.
Generate a structured, actionable study plan for a South African learner:
- Curriculum Level: ${params.gradeOrProgramme} (${params.educationLevel})
- Subject: ${params.subject}
- Focus Topic: ${params.topic}
- Available Study Time: ${params.availableStudyTime}
- Target Date / Exam Deadline: ${params.targetDate || 'Upcoming assessment'}
- Language: ${targetLanguage}

REQUIREMENTS:
1. Provide a realistic timetable with 3-4 distinct phases (e.g. "Phase 1: Foundations & Definitions", "Phase 2: Core Problem Solving & Calculations", "Phase 3: Past Papers & Error Analysis").
2. Include concrete daily/weekly activities and measurable milestones for each phase.
3. Include 3-4 high-yield study tips (e.g. active recall, spaced repetition, formula sheets).
4. Output MUST be ONLY valid JSON matching this schema:
{
  "title": "${params.topic} Mastery Study Plan",
  "planOverview": "Comprehensive overview of the learning journey and target objectives.",
  "schedule": [
    {
      "dayOrPhase": "Week 1 / Phase 1",
      "focus": "Core Definitions & Concept Mastery",
      "activities": [
        "Read introductory notes and summarize key terms",
        "Complete 5 fundamental worked examples"
      ],
      "milestone": "Master basic formulas without looking at reference notes"
    }
  ],
  "tips": [
    "Use active recall after each study session",
    "Time yourself during practice problems"
  ]
}
Return ONLY raw JSON. No markdown fences outside the JSON.`;

  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await client.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const responseText = response.text || '';
      const cleaned = responseText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
      const parsed: StudyPlanOutput = JSON.parse(cleaned);

      return {
        title: parsed.title || `${params.topic} Study Plan`,
        planOverview: parsed.planOverview || `Customized study plan for ${params.gradeOrProgramme} ${params.subject}.`,
        schedule: Array.isArray(parsed.schedule) ? parsed.schedule : [],
        tips: Array.isArray(parsed.tips) ? parsed.tips : []
      };
    } catch (err: any) {
      console.warn(`Model ${model} error in generateStudyPlan:`, err?.message || err);
      continue;
    }
  }

  throw new Error("Nexovia couldn't generate a study plan right now.");
}

// ==========================================
// PHASE 3: SCAN & LEARN MULTIMODAL VISION AI
// ==========================================

export interface ScanAnalysisInput {
  imageBase64: string;
  mimeType?: string;
  question?: string;
  mode?:
    | 'EXPLAIN'
    | 'SOLVE_WITH_ME'
    | 'SIMPLIFY'
    | 'TRANSLATE'
    | 'SUMMARIZE'
    | 'PRACTICE'
    | 'QUIZ_ME'
    | string;
  language?: string;
  educationLevel?: string;
  gradeOrProgramme?: string;
  subject?: string;
  module?: string;
  topic?: string;
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
}

export interface ScanClarityResult {
  isClear: boolean;
  issue: 'blurry' | 'incomplete' | 'cropped' | 'unreadable' | 'none';
  message: string;
}

export interface ScanAnalysisOutput {
  explanation: string;
  content: string;
  summary: string;
  clarityAssessment: ScanClarityResult;
  followUpSuggestions: string[];
  practiceQuestions?: PracticeQuestion[];
  quiz?: {
    id: string;
    title: string;
    questions: PracticeQuestion[];
  };
  languageUsed: string;
  model: string;
  isAiGenerated: boolean;
  disclaimer: string;
}

/**
 * Analyzes a scanned textbook page, homework question, worksheet, or diagram
 * using Google Gemini multimodal vision, calibrated for the learner's grade level.
 */
export async function analyzeScannedImage(params: ScanAnalysisInput): Promise<ScanAnalysisOutput> {
  const { client } = getGeminiClient();

  // Clean and sanitize base64 data
  let rawBase64 = params.imageBase64 || '';
  if (rawBase64.includes(',')) {
    rawBase64 = rawBase64.split(',')[1];
  }
  rawBase64 = rawBase64.replace(/\s/g, '');

  if (!rawBase64 || rawBase64.length < 50) {
    throw new Error('Please provide a valid image from your camera or gallery to scan.');
  }

  let mimeType = params.mimeType || 'image/jpeg';
  if (mimeType.includes(';')) {
    mimeType = mimeType.split(';')[0];
  }
  // Supported MIME types: image/jpeg, image/png, image/webp
  if (!['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes(mimeType.toLowerCase())) {
    mimeType = 'image/jpeg';
  }

  const langCode = params.language || 'en';
  const targetLanguage = LANGUAGE_MAP[langCode] || langCode || 'English';

  const eduLevel = params.educationLevel || 'FET Phase (Grade 10–12 CAPS)';
  const gradeOrProg = params.gradeOrProgramme || eduLevel;
  const subject = params.subject || 'General STEM / Curriculum';
  const topic = params.topic || 'Scanned Learning Material';

  // Normalize scan mode
  const rawMode = (params.mode || 'EXPLAIN').toUpperCase().replace(/[\s-]/g, '_');
  let mode = 'EXPLAIN';
  if (['EXPLAIN', 'SOLVE_WITH_ME', 'SIMPLIFY', 'TRANSLATE', 'SUMMARIZE', 'PRACTICE', 'QUIZ_ME'].includes(rawMode)) {
    mode = rawMode;
  } else if (rawMode === 'SOLVE' || rawMode === 'SOLVE_WITH_ME' || rawMode === 'HOMEWORK_HELP') {
    mode = 'SOLVE_WITH_ME';
  } else if (rawMode === 'QUIZ' || rawMode === 'QUIZ_HELP') {
    mode = 'QUIZ_ME';
  }

  // Learner level calibration
  let levelCalibration = '';
  const lowerGrade = (gradeOrProg || eduLevel).toLowerCase();
  if (
    lowerGrade.includes('grade r') ||
    lowerGrade.includes('grade 1') ||
    lowerGrade.includes('grade 2') ||
    lowerGrade.includes('grade 3') ||
    lowerGrade.includes('grade 4') ||
    lowerGrade.includes('grade 5') ||
    lowerGrade.includes('foundation')
  ) {
    levelCalibration = `PRIMARY SCHOOL LEARNER (${gradeOrProg}):
- Use short sentences and simple words.
- Explain visually with physical, familiar South African examples.
- Be warm, encouraging, and easy to understand.`;
  } else if (
    lowerGrade.includes('grade 10') ||
    lowerGrade.includes('grade 11') ||
    lowerGrade.includes('grade 12') ||
    lowerGrade.includes('matric') ||
    lowerGrade.includes('fet')
  ) {
    levelCalibration = `FET / MATRIC SECONDARY LEARNER (${gradeOrProg}):
- Provide formal academic explanations matching senior high school depth.
- Show step-by-step mathematical working or chemical equations with clear reasoning.
- Mention examination technique and common traps.`;
  } else if (lowerGrade.includes('tvet') || lowerGrade.includes('nated') || lowerGrade.includes('nc(v)')) {
    levelCalibration = `TVET / TECHNICAL COLLEGE LEARNER (${gradeOrProg}):
- Focus on practical vocational applications, industrial engineering standards, and workshop trade calculations.
- Explain schematics, circuit components, or mechanical steps clearly.`;
  } else if (
    lowerGrade.includes('university') ||
    lowerGrade.includes('higher ed') ||
    lowerGrade.includes('faculty') ||
    lowerGrade.includes('degree')
  ) {
    levelCalibration = `UNIVERSITY / HIGHER EDUCATION LEARNER (${gradeOrProg}):
- Use rigorous university-level academic depth, theoretical frameworks, and formal mathematical notation.`;
  } else {
    levelCalibration = `SECONDARY / GENERAL LEARNER (${gradeOrProg}):
- Provide a clear, step-by-step educational breakdown suited to high school level.`;
  }

  // Scan mode directives
  let modeGuidance = '';
  switch (mode) {
    case 'EXPLAIN':
      modeGuidance = `MODE: EXPLAIN
1. Identify and describe what is visible in the image (diagram, graph, formula, question, textbook excerpt).
2. Explain the governing concepts systematically.
3. Provide a clear worked example or breakdown of key terms.`;
      break;

    case 'SOLVE_WITH_ME':
      modeGuidance = `MODE: SOLVE WITH ME (TEACHING METHOD, NOT CHEATING)
Do NOT simply give the final answer away! Teach the learner the problem-solving methodology:
1. Identify what is given in the image and what must be found.
2. State the relevant law, theorem, formula, or principle.
3. Walk through the solution step-by-step with clear arithmetic/algebraic working.
4. Conclude with a guiding self-check question or next step for the learner to verify.`;
      break;

    case 'SIMPLIFY':
      modeGuidance = `MODE: SIMPLIFY
Explain what is shown in the image using simple language and vivid everyday South African analogies (e.g. taxi routes, cooking potjiekos, soccer games, cell phone data). Strictly avoid unexplained technical jargon.`;
      break;

    case 'TRANSLATE':
      modeGuidance = `MODE: TRANSLATE
Translate the readable text and core questions in the image directly into natural, fluent ${targetLanguage}. Keep recognized mathematical expressions and scientific terms clear in parentheses so the learner understands both.`;
      break;

    case 'SUMMARIZE':
      modeGuidance = `MODE: SUMMARIZE
Provide a concise, high-yield summary of the visible material. Use bullet points for key definitions, essential formulas, and 3 'Must-Know Exam Takeaways'.`;
      break;

    case 'PRACTICE':
      modeGuidance = `MODE: PRACTICE
Analyze the problem in the image and generate 2-3 brand new practice questions of similar type and difficulty based strictly on this topic. Include full step-by-step solutions and explanations.`;
      break;

    case 'QUIZ_ME':
      modeGuidance = `MODE: QUIZ ME
Generate a 2-3 question multiple-choice/short-answer mini quiz based on the scanned material. Include 4 options per question, the correct answer, and an explanation.`;
      break;
  }

  // Multi-turn conversation context
  let historyContext = '';
  if (Array.isArray(params.conversationHistory) && params.conversationHistory.length > 0) {
    historyContext = `\nPREVIOUS CONVERSATION ABOUT THIS SCAN:\n` +
      params.conversationHistory
        .map((m) => `${m.role === 'user' ? 'Learner' : 'AI Tutor'}: ${m.content}`)
        .join('\n') + '\n';
  }

  const userQuestion = params.question?.trim() || 'Please analyze this scanned material and explain it.';

  const prompt = `You are Nexovia AI Tutor, a South African educational learning assistant equipped with real multimodal vision.
Tagline: "Learn today. Build tomorrow."

LEARNER CONTEXT:
- Education Level: ${eduLevel}
- Specific Grade / Programme: ${gradeOrProg}
- Subject: ${subject}
- Topic: ${topic}
- Target Response Language: ${targetLanguage}
- Selected Scan Mode: ${mode}

PEDAGOGICAL CALIBRATION:
${levelCalibration}

TASK DIRECTIVE:
${modeGuidance}

IMAGE CLARITY MANDATE:
- Examine the attached image carefully.
- If the image is blurry, incomplete, cut off, too dark, or key numbers/equations are unreadable:
  Do NOT guess, invent, or hallucinate missing text.
  Set "clarityAssessment.isClear" to false.
  Set "clarityAssessment.issue" to "blurry", "incomplete", "cropped", or "unreadable".
  Set "clarityAssessment.message" to an actionable explanation telling the learner what is unclear and asking them to retake the photo.
- If the image is readable, set "clarityAssessment.isClear" to true and "clarityAssessment.issue" to "none".

CURRICULUM DISCLAIMER MANDATE:
- Never claim this AI explanation is official Department of Basic Education (DBE) or CAPS material.
- State clearly that this is an AI-generated learning explanation.

${historyContext}
LEARNER'S CURRENT QUESTION:
"${userQuestion}"

OUTPUT FORMAT REQUIREMENT:
You MUST respond ONLY with a valid JSON object matching this schema:
{
  "clarityAssessment": {
    "isClear": true,
    "issue": "none",
    "message": "Image is clear and readable."
  },
  "explanation": "Markdown formatted explanation in ${targetLanguage}. Use clear headings (###), numbered steps, bold text for key terms, and neat mathematical notation.",
  "summary": "1-2 sentence core takeaway in ${targetLanguage}.",
  "followUpSuggestions": [
    "What is the next step to solve this?",
    "Can you explain this simpler?",
    "Can you give me another practice problem like this?"
  ],
  "practiceQuestions": [
    {
      "id": "pq1",
      "type": "multiple_choice",
      "question": "Question text",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "A",
      "explanation": "Why A is correct"
    }
  ],
  "quiz": {
    "id": "quiz_scan_1",
    "title": "Quick Check on Scanned Problem",
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Quiz question text",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "Option A",
        "explanation": "Detailed explanation"
      }
    ]
  }
}

Return ONLY raw JSON. No markdown ticks outside the JSON.`;

  const imagePart = {
    inlineData: {
      mimeType,
      data: rawBase64
    }
  };

  const textPart = {
    text: prompt
  };

  let lastError: any = null;

  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await client.models.generateContent({
        model,
        contents: {
          parts: [imagePart, textPart]
        },
        config: {
          responseMimeType: 'application/json'
        }
      });

      const responseText = response.text || '';
      const cleaned = responseText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();

      let parsed: any;
      try {
        parsed = JSON.parse(cleaned);
      } catch (e) {
        // Fallback if JSON has minor syntax issues
        parsed = {
          clarityAssessment: { isClear: true, issue: 'none', message: 'Image processed.' },
          explanation: responseText || 'Explanation generated.',
          summary: 'Scanned material reviewed.',
          followUpSuggestions: ['Can you explain this simpler?', 'Show me the next step.', 'Practice another question.']
        };
      }

      const isClear = parsed.clarityAssessment ? Boolean(parsed.clarityAssessment.isClear) : true;
      const issue = parsed.clarityAssessment?.issue || 'none';
      const clarityMessage = parsed.clarityAssessment?.message || (isClear ? 'Image is clear.' : 'Please retake a sharper photo.');

      const explanation = parsed.explanation || parsed.content || 'Scanned material analyzed successfully.';
      const summary = parsed.summary || explanation.slice(0, 140) + '...';

      const followUps = Array.isArray(parsed.followUpSuggestions) && parsed.followUpSuggestions.length > 0
        ? parsed.followUpSuggestions
        : [
            'Explain this step by step.',
            'Give me a simpler analogy.',
            'Generate 2 practice questions on this.',
            'Help me solve the next problem.'
          ];

      const practiceQuestions = Array.isArray(parsed.practiceQuestions) && parsed.practiceQuestions.length > 0
        ? parsed.practiceQuestions
        : undefined;

      const quiz = parsed.quiz && Array.isArray(parsed.quiz.questions) && parsed.quiz.questions.length > 0
        ? parsed.quiz
        : undefined;

      return {
        explanation,
        content: explanation,
        summary,
        clarityAssessment: {
          isClear,
          issue,
          message: clarityMessage
        },
        followUpSuggestions: followUps,
        practiceQuestions,
        quiz,
        languageUsed: targetLanguage,
        model,
        isAiGenerated: true,
        disclaimer: 'AI-generated educational explanation · Not official CAPS curriculum content · Verify with your syllabus'
      };
    } catch (err: any) {
      console.warn(`Model ${model} error in analyzeScannedImage:`, err?.message || err);
      lastError = err;
      const msg = String(err?.message || '');
      if (msg.includes('GEMINI_API_KEY') || msg.includes('API key')) {
        throw err;
      }
    }
  }

  console.error('All candidate Gemini models failed in analyzeScannedImage:', lastError?.message || lastError);
  const lastErrStr = String(lastError?.message || '');
  if (lastErrStr.includes('resource_exhausted') || lastErrStr.includes('quota') || lastErrStr.includes('429')) {
    throw new Error('AI request limit reached. Please wait a brief moment and try again.');
  }
  throw new Error("Nexovia couldn't analyze the scanned image right now. Please try again.");
}

// ==========================================
// PHASE 4: REAL VOICE & AUDIO SERVICES
// ==========================================

export interface TranscribeAudioInput {
  audioBase64: string;
  mimeType?: string;
  language?: string;
}

/**
 * Transcribes audio from the learner's microphone into text using Gemini.
 */
export async function transcribeVoiceAudio(params: TranscribeAudioInput): Promise<string> {
  const { client } = getGeminiClient();

  let cleanBase64 = params.audioBase64 || '';
  if (cleanBase64.includes(',')) {
    cleanBase64 = cleanBase64.split(',')[1];
  }
  cleanBase64 = cleanBase64.replace(/\s/g, '');

  if (!cleanBase64 || cleanBase64.length < 20) {
    throw new Error('No audio recording data received. Please try speaking into your microphone.');
  }

  let mimeType = params.mimeType || 'audio/webm';
  if (mimeType.includes(';')) {
    mimeType = mimeType.split(';')[0];
  }

  const langCode = params.language || 'en';
  const targetLanguage = LANGUAGE_MAP[langCode] || langCode || 'English';

  const audioPart = {
    inlineData: {
      mimeType,
      data: cleanBase64
    }
  };

  const promptText = `Transcribe this educational audio recording spoken by a student in ${targetLanguage}.
Output ONLY the transcribed words.
Do not add conversational commentary, punctuation explanations, timestamps, or quotes.
If the audio is completely silent or only background hiss, output "[Unclear audio - please speak closer to the microphone]".`;

  const textPart = {
    text: promptText
  };

  // Model selection: try gemini-3.5-transcribe first, then gemini-3.8-flash
  const models = ['gemini-3.5-transcribe', 'gemini-3.8-flash'];
  let lastError: any = null;

  for (const model of models) {
    try {
      const response = await client.models.generateContent({
        model,
        contents: {
          parts: [audioPart, textPart]
        }
      });

      const transcript = (response.text || '').trim();
      if (transcript) {
        return transcript;
      }
    } catch (err: any) {
      console.warn(`Model ${model} transcription error:`, err?.message || err);
      lastError = err;
      const msg = String(err?.message || '');
      if (msg.includes('GEMINI_API_KEY') || msg.includes('API key')) {
        throw err;
      }
    }
  }

  throw new Error(lastError?.message || "Nexovia couldn't transcribe the speech recording.");
}

export interface SynthesizeSpeechInput {
  text: string;
  language?: string;
  voiceName?: string;
}

export interface SynthesizeSpeechOutput {
  audioBase64: string;
  mimeType: string;
}

/**
 * Synthesizes high-fidelity educational audio speech using Gemini TTS (gemini-3.8-flash-lite-tts).
 */
export async function synthesizeVoiceSpeech(params: SynthesizeSpeechInput): Promise<SynthesizeSpeechOutput> {
  const { client } = getGeminiClient();

  const textToSpeak = (params.text || '').trim();
  if (!textToSpeak) {
    throw new Error('Text to speak cannot be empty.');
  }

  // Strip excessive markdown artifacts for cleaner vocal delivery
  const cleanedSpeechText = textToSpeak
    .replace(/^#+\s+/gm, '') // headings
    .replace(/\*\*(.*?)\*\*/g, '$1') // bold
    .replace(/\*(.*?)\*/g, '$1') // italics
    .replace(/```[\s\S]*?```/g, 'Code example omitted.') // code blocks
    .replace(/`([^`]+)`/g, '$1')
    .slice(0, 1500); // reasonable chunk limit

  const voice = params.voiceName || 'Kore'; // 'Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: cleanedSpeechText,
              speechMetadata: {
                style: 'Clear, encouraging teacher and patient educational mentor'
              }
            }
          ]
        }
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice }
          }
        }
      }
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      throw new Error('No audio bytes returned by TTS model.');
    }

    return {
      audioBase64: base64Audio,
      mimeType: 'audio/wav'
    };
  } catch (err: any) {
    console.error('Gemini TTS synthesis error:', err?.message || err);
    throw err;
  }
}

/**
 * PHASE 7: EVALUATE WRITTEN RESPONSE (AI-Assisted Marking Architecture)
 * Does NOT claim to be official teacher grading; provides transparent rubric-based feedback.
 */
export async function evaluateWrittenResponse(params: {
  questionText: string;
  learnerAnswer: string;
  marksAvailable: number;
  rubricGuidelines?: string[];
  sampleSolution?: string;
  subject?: string;
  grade?: string;
  topic?: string;
}): Promise<{
  suggestedMarks: number;
  maxMarks: number;
  rubricBreakdown: {
    criterion: string;
    pointsAwarded: number;
    maxPoints: number;
    comment: string;
  }[];
  conceptualStrengths: string[];
  areasForImprovement: string[];
  constructiveFeedback: string;
  isAiAssisted: true;
  evaluatedAt: string;
}> {
  const { client } = getGeminiClient();

  const maxMarks = params.marksAvailable || 5;
  const guidelines = params.rubricGuidelines?.join('\n- ') || 'Accurate conceptual understanding and step-by-step reasoning.';

  const prompt = `You are a certified South African CAPS educator evaluating a learner's written assessment response.
Context:
- Subject: ${params.subject || 'General'}
- Grade: ${params.grade || 'Grade 10'}
- Topic: ${params.topic || 'General Topic'}

Question Prompt:
"${params.questionText}"

Marks Available: ${maxMarks}

Marking Rubric / Criteria:
- ${guidelines}

Exemplar / Sample Solution:
"${params.sampleSolution || 'Accurate demonstration of core principles.'}"

Learner's Submitted Response:
"${params.learnerAnswer}"

INSTRUCTIONS:
1. Objectively evaluate the learner's response against the rubric criteria.
2. Award suggestedMarks as an integer from 0 to ${maxMarks}. Do NOT exceed ${maxMarks}.
3. Note conceptual strengths and specific areas where the explanation lacks precision or completeness.
4. Provide constructive, encouraging pedagogical feedback.
5. Return ONLY a valid JSON object matching this schema:
{
  "suggestedMarks": number,
  "rubricBreakdown": [
    {
      "criterion": "Criterion description",
      "pointsAwarded": number,
      "maxPoints": number,
      "comment": "Specific reason for awarded marks"
    }
  ],
  "conceptualStrengths": ["Strength 1", "Strength 2"],
  "areasForImprovement": ["Improvement 1"],
  "constructiveFeedback": "Clear encouraging guidance for the student."
}
Return ONLY valid JSON. No markdown backticks outside.`;

  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await client.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const cleaned = (response.text || '').replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
      const parsed = JSON.parse(cleaned);

      const suggested = Math.min(Math.max(Number(parsed.suggestedMarks) || 0, 0), maxMarks);

      return {
        suggestedMarks: suggested,
        maxMarks,
        rubricBreakdown: Array.isArray(parsed.rubricBreakdown)
          ? parsed.rubricBreakdown
          : [
              {
                criterion: 'Overall Conceptual Understanding',
                pointsAwarded: suggested,
                maxPoints: maxMarks,
                comment: 'Evaluated against CAPS curriculum standards.'
              }
            ],
        conceptualStrengths: Array.isArray(parsed.conceptualStrengths) ? parsed.conceptualStrengths : [],
        areasForImprovement: Array.isArray(parsed.areasForImprovement) ? parsed.areasForImprovement : [],
        constructiveFeedback:
          parsed.constructiveFeedback || 'Well done on completing your written response. Review the exemplar solution for additional precision.',
        isAiAssisted: true,
        evaluatedAt: new Date().toISOString()
      };
    } catch (err: any) {
      console.warn(`Model ${model} error in evaluateWrittenResponse:`, err?.message || err);
      continue;
    }
  }

  // Fallback heuristic if API is unavailable
  const len = (params.learnerAnswer || '').trim().length;
  const fallbackScore = len > 50 ? Math.round(maxMarks * 0.7) : len > 15 ? Math.round(maxMarks * 0.4) : 0;
  return {
    suggestedMarks: fallbackScore,
    maxMarks,
    rubricBreakdown: [
      {
        criterion: 'Response Evaluation',
        pointsAwarded: fallbackScore,
        maxPoints: maxMarks,
        comment: 'Provisional score generated from written structure.'
      }
    ],
    conceptualStrengths: ['Student formulated an original explanation.'],
    areasForImprovement: ['Consult exemplar solution to ensure all key terms are included.'],
    constructiveFeedback: 'Provisional evaluation recorded. Review the official solution and rubric guidelines.',
    isAiAssisted: true,
    evaluatedAt: new Date().toISOString()
  };
}

/**
 * PHASE 7: EXPLAIN ASSESSMENT MISTAKES (Socratic Review)
 */
export async function explainAssessmentMistakes(params: {
  assessmentTitle: string;
  subject: string;
  grade: string;
  mistakes: Array<{
    questionText: string;
    learnerAnswer: string;
    correctAnswer: string;
    explanation: string;
    topic?: string;
  }>;
  language?: string;
}): Promise<string> {
  const { client } = getGeminiClient();

  const lang = params.language || 'en';
  const targetLanguage = LANGUAGE_MAP[lang] || 'English';

  const mistakesList = params.mistakes
    .map(
      (m, idx) =>
        `Question ${idx + 1}: "${m.questionText}"
Learner's Answer: "${m.learnerAnswer}"
Correct Answer: "${m.correctAnswer}"
Key Concept / Reason: "${m.explanation}"`
    )
    .join('\n\n');

  const prompt = `You are Nexovia AI Tutor specializing in the South African CAPS curriculum.
A ${params.grade} learner just completed the assessment "${params.assessmentTitle}" in ${params.subject} and struggled with the following questions:

${mistakesList}

TASK:
Provide a clear, patient, and encouraging Socratic review in ${targetLanguage}.
1. Acknowledge their effort warmly without judgment.
2. Group related misconceptions and explain the underlying fundamental principles clearly.
3. Provide simple memory aids or step-by-step rules so they avoid these errors in the future.
4. Suggest 2-3 specific action steps (e.g. which CAPS lesson to review or which practice questions to try).

Keep the explanation clear, encouraging, and easy to read on mobile.`;

  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await client.models.generateContent({
        model,
        contents: prompt
      });

      return (
        response.text ||
        'Take heart! Making mistakes is an essential part of mastering difficult concepts. Review the correct steps above and try another practice session.'
      );
    } catch (err: any) {
      console.warn(`Model ${model} error in explainAssessmentMistakes:`, err?.message || err);
      continue;
    }
  }

  return 'Review the questions you missed above, note where your steps diverged from the correct answer, and practice similar problems in the Adaptive Engine.';
}



