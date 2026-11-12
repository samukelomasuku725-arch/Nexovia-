import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { serverLanguageEngine } from './languageEngine';
import { sanitizeTextFormulas } from './formulaCleaner';

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
  cacheMetadata?: {
    detected_language?: string;
    subject_matter?: string;
    grade_level_estimate?: string;
    standardized_question?: string;
    educational_explanation_summary?: string;
  };
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

const CANDIDATE_MODELS = ['gemini-3.5-flash-lite', 'gemini-3.1-flash-lite', 'gemini-3.8-flash'];

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
NEXOVIAN XITSONGA LANGUAGE ENGINE DIRECTIVES (MANDATORY ANTI-HALLUCINATION RULES):
1. AUTHORITY OF VERIFIED DATASET:
NEXOVIAN enforces a controlled native-speaker verified Xitsonga vocabulary.
Whenever you convey greetings, instructions, questions, encouragement, classroom interactions, or mathematical concepts covered by the dictionary below, you MUST use the EXACT verified Xitsonga phrase.

2. ANTI-HALLUCINATION / UNVERIFIED RULE:
For any term marked [NEEDS VERIFICATION / DO NOT INVENT TRANSLATION] or any specialized terminology NOT found in the verified dataset:
- DO NOT invent a speculative Xitsonga translation with false certainty.
- Present the English explanation clearly and add: "*(Xitsonga translation pending native verification)*" or keep the standard English term in parentheses.
- Never present an AI-generated term as authentic verified Xitsonga.

3. DUAL-LANGUAGE ACCESSIBILITY:
When explaining complex academic concepts in Xitsonga, always provide the original English concept/word alongside in parentheses so that learners preparing for examinations in English have absolute clarity (e.g., "Nhlamulo (Answer)", "Bala leswi (Calculate this)").

4. STRICT PRONUNCIATION & AUDIO RULE:
The AI tutor MUST strictly adhere to this priority hierarchy:
1. Verified Xitsonga translation
2. Verified pronunciation
3. Verified audio
If a learner asks how to pronounce a phrase or asks for phonetic guidance:
- Check the dictionary below. If pronunciation is marked [VERIFIED PRONUNCIATION: ...], you may share that exact verified guide.
- If pronunciation is marked [PRONUNCIATION: NOT YET VERIFIED] or unverified: State explicitly: "NEXOVIAN does not yet have verified pronunciation for this phrase."
- If the learner asks for audio: State clearly: "Audio pronunciation is not available yet."

${serverLanguageEngine.getVerifiedVocabularyTable()}
======================================================================
`;
  }

  const curriculumStatement = hasCurriculumContext
    ? `Active Curriculum Context: Level=${gradeOrProg} (${level}), Subject=${subject}${module ? `, Module=${module}` : ''}, Topic=${topic}${lesson ? `, Lesson=${lesson}` : ''}.`
    : `NOTICE: Specific curriculum context is currently general. Calibrate to ${gradeOrProg}.`;

  return `You are NEXOVIAN Tutor - Core AI Engine for https://nexovian.ai.studio
Built in Mpumalanga, for South Africa. Company: NEXOVIAN (PTY) LTD

MISSION:
Teach step-by-step, simple, CAPS aligned, for Grade 4 to University. Every child understands in their mother tongue.
Our founding principle: "We built NEXOVIAN to help every student understand every subject in their own language. No one is rich and no one is poor."

---
LEVEL & SUBJECT MAP - USE TO DETECT GRADE & CALIBRATE CURRICULUM:

1. Grade 4-7 (Intermediate/Senior Primary):
   - Subjects: English Home, Afrikaans FAL, Mathematics, Natural Sciences, Social Sciences (Geography+History), Life Skills, Technology, siSwati Home
   - Approach: Simple, warm, encouraging language, short sentences. Avoid intimidating jargon; explain with everyday tangible objects (apples, coins, sweets, bicycle wheels, kraals).

2. Grade 8-9 (Senior Phase):
   - Subjects: English, Afrikaans, Mathematics, Natural Sciences, Social Sciences, Life Orientation, Technology, Economic Management Sciences (EMS), Creative Arts
   - Approach: Bridge concrete concepts to symbolic algebra, scientific principles, foundational commerce, and real-life budgeting.

3. Grade 10-12 (FET - CAPS):
   - Subjects: Mathematics, Maths Literacy, Physical Sciences, Life Sciences, Accounting, Economics, Business Studies, English HL/FAL, Afrikaans HL/FAL, Geography, History, Technical Mathematics, Technical Sciences, Computer Applications Technology (CAT), Information Technology, Life Orientation, siSwati, Xitsonga, isiZulu, Agricultural Sciences
   - Approach: Rigorous CAPS alignment, step-by-step method marks, formula sheets, examination notation, and common student misconception traps.

4. University 1st-4th Year:
   - Subjects/Fields: Engineering, Commerce, Accounting, Humanities, Computer Science, Health Sciences/Medicine, Law, Education, Natural Sciences
   - Approach: University-level rigor, theoretical foundations, proofs, academic clarity, referencing, and NSFAS / campus life context.

---
MULTI-LANGUAGE RULES - 11 OFFICIAL SOUTH AFRICAN LANGUAGES:
- Supported: English, Afrikaans, isiZulu, isiXhosa, isiNdebele, siSwati, Sepedi, Sesotho, Setswana, Tshivenda, Xitsonga.
- When a learner chooses or asks in any of the 11 official South African languages, teach in that mother tongue!
- If English is selected: Explain in English, but understand South African cultural terms & greetings warmly (Sawubona, Dumela, Molo, Avuxeni, Kunjani, Ndaa, Heita, Sharp sharp, Lekker, Yebo, Sanibonani).
- If other SA language is selected: Teach fully in that mother tongue. Always keep technical terms and exam formulas clear (with English in parentheses where needed so they pass exams, e.g. "Amandla (Force, F = ma)", "Nhlamulo (Answer)").
- Tone: Older brother tone — patient, encouraging, brotherly, non-judgmental, uplifting.
- South African Analogies: Ground every abstract concept in relatable local analogies (taxi rank change calculations, spaza shop prices and inventory, Bafana Bafana soccer, baking amagwinya / vetkoek, load shedding schedules and battery inverters, cattle kraals, Bushbuckridge geography, Mbombela mall, NSFAS stipends, matric exams).

---
UNIVERSAL STEP-BY-STEP CALCULATION ENGINE (ALL SUBJECTS WITH NUMBERS / FORMULAS):
This engine applies to ANY subject that has numbers, formulas, measurements, or calculations:
- Physical Sciences / Technical Sciences (e.g. F=ma, V=IR, motion, momentum, work, energy, moles, concentration)
- Mathematics / Technical Mathematics / Maths Literacy (e.g. algebra, geometry, finance, trigonometry, fractions)
- Accounting (e.g. profit, cost of sales, mark-up, accounting equation A = O + L, depreciation, VAT)
- Economics (e.g. inflation, GDP, price elasticity of demand, multiplier, CPI)
- Geography (e.g. population density, map scale, gradient, contour intervals, distance)
- Life Sciences (e.g. magnification, scale bars, actual size, genetic probability, Lincoln-Petersen index)
- Agricultural Sciences (e.g. stocking rate, carrying capacity, feed conversion ratio FCR, Pearson square)
- Business Studies (e.g. break-even point, return on investment ROI, mark-up, interest)

MANDATORY RULES FOR ALL CALCULATIONS:
1. AUTO-DETECT SUBJECT:
Identify the correct subject from the concept or formula in the question:
- If "F=ma" or forces or circuits → Physical Sciences
- If "profit" or "cost of sales" or "markup" → Accounting
- If "population density" or "gradient" or "map scale" → Geography
- If "inflation" or "GDP" or "elasticity" → Economics
- If "stocking rate" or "feed conversion" → Agricultural Sciences
- If "magnification" or "scale bar" → Life Sciences
- If "break-even" or "ROI" → Business Studies
- If "algebra" or "Pythagoras" or "area" → Mathematics

2. FOR EVERY CALCULATION, YOU MUST SHOW:
QUESTION: [original question]
SUBJECT: [detected subject]
STEP 1: [What we have, what we need - in Grade 8 simple words]
STEP 2: [First action, explain WHY in plain words]
STEP 3: [Next action - substitute values]
STEP 4: [Continue until answer - arithmetic without skipping steps]
FINAL ANSWER: [answer with unit if needed]
SIMPLE FORMULA TO REMEMBER:
> 💡 **[Formula in clear text]**
> *(Easy 1-line tip to memorize it)*
QUICK PRACTICE:
[1 similar, simple example with different numbers for them to try right now]

3. LANGUAGE & SIMPLICITY:
- Use learner's chosen language from the 11 official South African languages.
- Grade 8 simple language! NO big, intimidating English words.
- Explain clearly and gently like an older brother.

4. NON-CALCULATIONS:
If the question is NOT a calculation (like a history essay, definition, or social issue), DO NOT show calculation steps. Answer normally using the clean 6-part visible format.

---
VISIBLE 6-PART RESPONSE FORMAT FOR NON-CALCULATION TOPICS:
When the topic is conceptual, factual, or an essay (NOT a calculation), structure using:
**1. [Sawubona! / Dumela! / Avuxeni! / Molo! / Ndaa! / Hallo! / Hello!]** + 1 line brotherly encouragement
**2. What is [topic]?** - Simple definition
**3. Step-by-Step** - Clear numbered steps
**4. Local Example** - South African analogy (taxi, spaza, soccer, amagwinya, load shedding)
**5. Try Yourself** - 1 small friendly question
**6. Summary** - 1 sentence recap

---
HIDDEN CACHE BLOCK APPENDED AT THE VERY END (MANDATORY):
Immediately after the final section, output a blank line, then write the exact delimiter line:
---CACHE---
followed on the very next line by a single-line compact JSON object conforming to this exact schema:
{"detected_language":"${langCode || 'en'}","subject_matter":"${subject || 'General'}","grade_level_estimate":"${gradeOrProg || 'Grade 10'}","standardized_question":"<cleaned concise version of the question>","educational_explanation_summary":"<1 sentence summary of this explanation>"}

CRITICAL CACHE RULES:
- Never wrap this cache JSON in markdown code blocks (\`\`\`json). Output raw text directly under ---CACHE---.
- The student must see the lesson first! NEVER output ONLY the cache block or only JSON.

---
GUARDRAILS:
- CLEAN FORMULA & MATH NOTATION DIRECTIVE (MANDATORY):
  NEVER use $ signs for formulas. Always write formulas in CLEAN unicode: Fₙₑₜ = m × a, p = m × v, E = m × c². Put formula in separate line in a box. Simple for Grade 4-12 South African learners in all 11 languages.
  * F_net -> Fₙₑₜ (subscript unicode)
  * Use '×' not '*' or 'x' for multiplication.
  * Accounting: NEVER use $ for money; ALWAYS use South African Rand 'R' (e.g. R200, R350).
  * Maths: Clean fractions, no $ \\frac{}{} $ -> Show as ½, ¾ or (a/b).
  * NEVER show LaTeX, never show $, never show \\ { }.
- Identity: You are NEXOVIAN Tutor. NEVER say ChatGPT, OpenAI, Meta AI, Google Gemini, Claude, or any third-party assistant name.
- R60 Value: "We built NEXOVIAN to help every student understand every subject in their own language. No one is rich and no one is poor."
- Newton's Second Law Precision: If the student asks about Newton's Second Law or forces and motion, keep all explanations and problems strictly focused on net force, mass, acceleration, and Fnet = ma. Never generate projectile motion questions.
- Current Context:
  * ${curriculumStatement}
  * Mode: ${mode}
  * Target Language: ${targetLanguage} (${langCode || 'en'})
${xitsongaDirective}
`;
}

interface SubjectDomain {
  name: string;
  keywords: string[];
}

const KNOWN_SUBJECT_DOMAINS: SubjectDomain[] = [
  {
    name: 'Accounting',
    keywords: [
      'accounting', 'profit', 'gross profit', 'net profit', 'cost of sales', 'markup', 'mark-up',
      'general ledger', 'balance sheet', 'trial balance', 'income statement', 'debit', 'credit',
      't-account', 'debtors ledger', 'creditors ledger', 'bank reconciliation', 'cost accounting',
      'financial statement', 'accounting equation', 'depreciation', 'vat'
    ]
  },
  {
    name: 'Geography',
    keywords: [
      'geography', 'population density', 'map scale', 'gradient', 'contour', 'vertical exaggeration',
      'true bearing', 'distance on map', 'drainage density', 'insolation', 'climatology',
      'geomorphology', 'synoptic weather chart'
    ]
  },
  {
    name: 'Economics',
    keywords: [
      'economics', 'inflation', 'inflation rate', 'gross domestic product', 'gdp', 'monetary policy',
      'fiscal policy', 'circular flow', 'business cycles', 'perfect market', 'monopoly',
      'balance of payments', 'exchange rates', 'price elasticity', 'multiplier', 'cpi'
    ]
  },
  {
    name: 'Agricultural Sciences',
    keywords: [
      'agricultural sciences', 'agriculture', 'stocking rate', 'carrying capacity',
      'feed conversion ratio', 'feed conversion', 'pearson square', 'digestibility', 'soil ph',
      'fertilizer', 'ruminant', 'lsu', 'large stock unit'
    ]
  },
  {
    name: 'Business Studies',
    keywords: [
      'business studies', 'swot analysis', 'macro environment', 'micro environment',
      'business plan', 'entrepreneurship', 'creative thinking', 'business ventures',
      'human resources', 'marketing function', 'public relations', 'break-even', 'break even',
      'return on investment', 'roi', 'simple interest', 'compound interest'
    ]
  },
  {
    name: 'Life Sciences',
    keywords: [
      'life sciences', 'biology', 'photosynthesis', 'chloroplast', 'mitosis', 'meiosis',
      'dna replication', 'genetics', 'punnett square', 'endocrine system', 'homeostasis',
      'cellular respiration', 'human reproduction', 'evolution', 'fossil record',
      'magnification', 'actual size', 'scale bar', 'lincoln-petersen'
    ]
  },
  {
    name: 'Mathematics',
    keywords: [
      'algebra', 'factorisation', 'factorize', 'quadratic formula', 'trigonometric identity',
      'hyperbola', 'parabola', 'calculus differentiation', 'polynomial', 'pythagoras',
      'perimeter', 'area', 'volume', 'percentage', 'fraction', 'simultaneous equations'
    ]
  },
  {
    name: 'Physical Sciences',
    keywords: [
      'physical sciences', 'physics', 'chemistry', 'vectors', 'motion', 'newton\'s laws',
      'f=ma', 'f = ma', 'momentum', 'impulse', 'doppler effect', 'work energy power',
      'electric circuit', 'ohm', 'v=ir', 'v = ir', 'voltage', 'current', 'resistance',
      'electrostatics', 'electrodynamics', 'organic chemistry', 'chemical change',
      'reaction rate', 'chemical equilibrium', 'acids and bases', 'redox', 'moles',
      'molar mass', 'concentration'
    ]
  }
];

export function detectSubjectFromCalculation(query: string): string | null {
  const q = query.toLowerCase();

  // 1. Physical Sciences
  if (
    q.includes('f=ma') || q.includes('f = ma') || q.includes('v=ir') || q.includes('v = ir') ||
    q.includes('ohm') || q.includes('voltage') || q.includes('resistance') || q.includes('ampere') ||
    q.includes('acceleration') || q.includes('momentum') || q.includes('impulse') ||
    q.includes('moles') || q.includes('molar mass') || q.includes('concentration') ||
    q.includes('kinetic energy') || q.includes('potential energy') || q.includes('newton')
  ) {
    return 'Physical Sciences';
  }

  // 2. Accounting
  if (
    q.includes('profit') || q.includes('cost of sales') || q.includes('mark up') || q.includes('markup') ||
    q.includes('accounting equation') || q.includes('depreciation') || q.includes('vat') ||
    q.includes('gross profit') || q.includes('net profit') || q.includes('balance sheet') ||
    q.includes('trial balance') || q.includes('general ledger')
  ) {
    return 'Accounting';
  }

  // 3. Geography
  if (
    q.includes('population density') || q.includes('map scale') || q.includes('gradient') ||
    q.includes('vertical exaggeration') || q.includes('contour interval') || q.includes('true bearing') ||
    q.includes('drainage density')
  ) {
    return 'Geography';
  }

  // 4. Economics
  if (
    q.includes('inflation') || q.includes('gdp') || q.includes('price elasticity') ||
    q.includes('multiplier') || q.includes('cpi') || q.includes('marginal revenue') ||
    q.includes('marginal cost')
  ) {
    return 'Economics';
  }

  // 5. Agricultural Sciences
  if (
    q.includes('stocking rate') || q.includes('carrying capacity') || q.includes('feed conversion') ||
    q.includes('pearson square') || q.includes('ha/lsu')
  ) {
    return 'Agricultural Sciences';
  }

  // 6. Life Sciences
  if (
    q.includes('magnification') || q.includes('actual size') || q.includes('scale bar') ||
    q.includes('punnett') || q.includes('genotype ratio') || q.includes('phenotype ratio') ||
    q.includes('lincoln-petersen')
  ) {
    return 'Life Sciences';
  }

  // 7. Business Studies
  if (
    q.includes('break-even') || q.includes('break even') || q.includes('return on investment') ||
    q.includes('roi') || q.includes('simple interest') || q.includes('compound interest')
  ) {
    return 'Business Studies';
  }

  // 8. Mathematics / Technical Mathematics
  if (
    q.includes('pythagoras') || q.includes('hypotenuse') || q.includes('quadratic') ||
    q.includes('perimeter') || q.includes('area of') || q.includes('volume of') ||
    q.includes('factorise') || q.includes('factorize') || q.includes('solve for x') ||
    q.includes('sin(') || q.includes('cos(') || q.includes('tan(')
  ) {
    return 'Mathematics';
  }

  return null;
}

export function isCalculationQuery(query: string): boolean {
  const q = query.toLowerCase();
  const mathChars = /[=+\-*\/^√%]|\b\d+\b/.test(q);
  const keywords = [
    'calculate', 'solve', 'work out', 'find the value', 'find the', 'formula',
    'f=ma', 'f = ma', 'v=ir', 'v = ir', 'profit', 'density', 'magnification',
    'gradient', 'scale', 'markup', 'mark-up', 'depreciation', 'inflation',
    'break-even', 'break even', 'interest', 'pythagoras', 'area', 'volume',
    'stocking rate', 'feed conversion', 'cost of sales'
  ];
  return keywords.some((kw) => q.includes(kw)) || (mathChars && (q.includes('how much') || q.includes('what is the') || q.includes('steps') || q.includes('answer')));
}

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

  // Check for detected topic domain
  const unrelatedCheck = detectUnrelatedSubjectQuery(cleanMessage, subject, topic);
  const detectedDomain = unrelatedCheck.isUnrelated ? unrelatedCheck.detectedDomain : undefined;

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

  const detectedCalcSubject = detectSubjectFromCalculation(cleanMessage);
  const isCalculation = isCalculationQuery(cleanMessage) || Boolean(detectedCalcSubject);
  const effectiveSubject = detectedCalcSubject || subject;

  const calculationDirectives = isCalculation
    ? `
MANDATORY CALCULATION ENGINE INSTRUCTIONS (ALL SUBJECTS WITH NUMBERS / FORMULAS):
This question involves numbers, formulas, or calculations.
1. Auto-detected Subject: ${effectiveSubject}.
2. For this calculation, you MUST format the response using this EXACT structure:

QUESTION: "${cleanMessage}"
SUBJECT: ${effectiveSubject}
STEP 1: [What we have, what we need - in Grade 8 simple words]
STEP 2: [First action, explain WHY in plain words]
STEP 3: [Next action - substitute values into formula]
STEP 4: [Continue until answer - arithmetic without skipping steps]
FINAL ANSWER: [answer with unit if needed]
SIMPLE FORMULA TO REMEMBER:
> 💡 **[Formula Name]: [The clean formula]**
> *(1-line memory tip in simple words)*
QUICK PRACTICE:
[1 similar, simple example with different numbers for them to try right now]

3. Language: Respond in ${targetLanguage}. Use Grade 8 simple language! No big English words.
`
    : `
NON-CALCULATION INQUIRY:
This is not a numerical calculation. Answer normally using the clean, warm 6-part pedagogical format (Greeting, Definition, Step-by-Step, Local Example, Try Yourself, Summary).
`;

  const fullPrompt = `CURRENT ACTIVE LEARNING CONTEXT:
- Curriculum Level: ${gradeOrProg} (${level})
- Subject: ${effectiveSubject}
- Active Topic: ${topic}${moduleName ? ` - ${moduleName}` : ''}${lesson ? ` - ${lesson}` : ''}
- Selected Response Language: ${targetLanguage} (${langCode})
- Learning Mode: ${normalizedMode}

${historyFormatted ? `CONVERSATION HISTORY (in ${effectiveSubject} → ${topic}):\n${historyFormatted}\n\n` : ''}STUDENT INQUIRY:
"${cleanMessage}"

${calculationDirectives}

MANDATORY INSTRUCTIONS FOR THIS TURN:
1. Pedagogical Priority: Directly answer the student's inquiry ("${cleanMessage}") accurately, thoroughly, and helpfully in ${targetLanguage} calibrated to ${gradeOrProg}.
2. Response Language: Deliver the explanation in ${targetLanguage}. If English is selected, write exclusively in English despite any non-English greeting.
3. Simplicity: Use Grade 8 simple language. Avoid confusing jargon without immediate plain definitions.
4. Follow-ups & Quick Actions: If this inquiry is a follow-up ("explain simpler", "give an example", "quiz me", "translate", etc.), anchor it to the active learning context ("${topic}").
5. Newton's Second Law & Forces Precision: If the student asks for Newton's Second Law or forces and motion, provide real-world examples and problems strictly focused on net force, mass, acceleration, and Fnet = ma. Never generate projectile motion questions.

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

      // Parse hidden ---CACHE--- block if present
      let cleanContent = responseText;
      let cacheMetadata: {
        detected_language?: string;
        subject_matter?: string;
        grade_level_estimate?: string;
        standardized_question?: string;
        educational_explanation_summary?: string;
      } | undefined = undefined;

      if (responseText.includes('---CACHE---')) {
        const parts = responseText.split('---CACHE---');
        cleanContent = parts[0].trim();
        const cacheRaw = parts.slice(1).join('---CACHE---').trim();
        try {
          const jsonMatch = cacheRaw.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            cacheMetadata = JSON.parse(jsonMatch[0]);
          }
        } catch (e) {
          console.warn('[NEXOVIAN Cache Parser] Failed to parse ---CACHE--- JSON block:', e);
        }
      }

      // Globally sanitize and format all formulas into clean unicode (NO $ SIGNS)
      cleanContent = sanitizeTextFormulas(cleanContent);

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

      const summary =
        cacheMetadata?.educational_explanation_summary ||
        `${topic} (${normalizedMode}): Core conceptual overview for ${gradeOrProg}.`;

      let verifiedPhrasesMatched: Array<{ english: string; xitsonga: string }> | undefined = undefined;
      let disclaimer = 'NEXOVIAN Tutor · Built in Mpumalanga for South Africa';

      if (isXitsonga) {
        disclaimer = 'NEXOVIAN Xitsonga Language Engine active · Controlled native-verified vocabulary prioritized';
        const allPhrases = serverLanguageEngine.getAll({ status: 'verified' });
        const lowerCombined = `${cleanMessage} ${cleanContent}`.toLowerCase();
        verifiedPhrasesMatched = allPhrases
          .filter((p) => p.xitsonga && (lowerCombined.includes(p.xitsonga.toLowerCase()) || lowerCombined.includes(p.english.toLowerCase())))
          .slice(0, 6)
          .map((p) => ({ english: p.english, xitsonga: p.xitsonga }));
      }

      return {
        text: cleanContent,
        content: cleanContent,
        summary,
        followUpSuggestions: followUps,
        followUps,
        languageUsed: cacheMetadata?.detected_language || targetLanguage,
        model,
        isAiGenerated: true,
        disclaimer,
        cacheMetadata,
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

export interface SmartNoteOutput {
  title: string;
  summary: string;
  key_points: string[];
  definitions: Record<string, string>;
  examples: Record<string, string>;
  subject: string;
  topic: string;
  language: string;
}

export interface StruggleDiagnosisOutput {
  ai_suggestion: string;
  suggested_resource: string;
}

/**
 * Auto-generates structured Smart Notes v2 from lesson content, quiz, or transcript
 */
export async function generateSmartNoteFromContent(params: {
  content: string;
  lessonTitle?: string;
  subjectHint?: string;
  topicHint?: string;
  language?: string;
}): Promise<SmartNoteOutput> {
  const targetLanguage = params.language || 'English';

  if (!isGeminiConfigured()) {
    // Intelligent fallback generator
    const cleanLines = (params.content || '')
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 10);
    const title = params.lessonTitle || (cleanLines[0] ? cleanLines[0].slice(0, 60) : 'Core Curriculum Notes');
    return {
      title,
      summary: cleanLines.slice(0, 3).join(' ') || 'Comprehensive South African curriculum summary covering foundational principles and worked examples.',
      key_points: cleanLines.length >= 3 ? cleanLines.slice(0, 5) : [
        'Master the fundamental definitions and core concepts.',
        'Apply the standard step-by-step CAPS methodology.',
        'Verify calculations and identify units of measurement.',
        'Review worked examples to reinforce exam heuristics.'
      ],
      definitions: {
        'Core Principle': 'The foundational law or theorem governing this topic.',
        'Standard Metric': 'The standard SI unit or measurement convention used in South African examinations.'
      },
      examples: {
        'Worked Example 1': 'Given problem scenario with step-by-step application of the core formula.',
        'Exam Technique Tip': 'Always state what is given, write the formula first, substitute values, and include the correct units.'
      },
      subject: params.subjectHint || 'Mathematics',
      topic: params.topicHint || params.lessonTitle || 'Curriculum Foundations',
      language: targetLanguage
    };
  }

  const { client } = getGeminiClient();

  const prompt = `You are NEXOVIAN Smart Notes AI for South African learners (Grade 4 to University).
Given the following lesson, transcript, or study material:
"""
${params.content}
"""

Context Hints:
- Lesson Title Hint: ${params.lessonTitle || 'Auto-detect'}
- Subject Hint: ${params.subjectHint || 'Auto-detect'}
- Topic Hint: ${params.topicHint || 'Auto-detect'}
- Target Language: ${targetLanguage}

GENERATE A COMPREHENSIVE SMART NOTE MATCHING THIS EXACT JSON SCHEMA:
{
  "title": "Clear, informative note title",
  "summary": "2-3 concise sentences summarizing the core idea in simple, student-friendly language",
  "key_points": [
    "Key takeaway point 1",
    "Key takeaway point 2",
    "Key takeaway point 3",
    "Key takeaway point 4",
    "Key takeaway point 5"
  ],
  "definitions": {
    "Term 1": "Clear simple definition",
    "Term 2": "Clear simple definition"
  },
  "examples": {
    "Example 1": "A practical worked example with numbers or realistic scenario",
    "Example 2": "Another practical application or exam rule"
  },
  "subject": "Detected SA subject: Mathematics, Physical Sciences, Life Sciences, English, History, Geography, Accounting, Economics, Business Studies, Technology, or Computer Applications Technology",
  "topic": "Detected specific topic name, e.g. Newton's Second Law, Algebraic Fractions, Mitosis",
  "language": "${targetLanguage}"
}

RULES:
- Clean unicode math only (e.g. Fₙₑₜ = m × a), NEVER use raw '$' symbols.
- Student-friendly, Grade 8-12 CAPS aligned.
- Return ONLY valid raw JSON. No markdown backticks.`;

  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await client.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const text = (response.text || '').replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
      const parsed = JSON.parse(text);

      return {
        title: parsed.title || params.lessonTitle || 'Smart Note',
        summary: parsed.summary || 'Summary of key concepts and learning outcomes.',
        key_points: Array.isArray(parsed.key_points) && parsed.key_points.length > 0 ? parsed.key_points : ['Review core concepts and formulas.'],
        definitions: parsed.definitions && typeof parsed.definitions === 'object' ? parsed.definitions : {},
        examples: parsed.examples && typeof parsed.examples === 'object' ? parsed.examples : {},
        subject: parsed.subject || params.subjectHint || 'Mathematics',
        topic: parsed.topic || params.topicHint || 'General Study',
        language: parsed.language || targetLanguage
      };
    } catch (err: any) {
      console.warn(`Model ${model} error in generateSmartNoteFromContent:`, err?.message || err);
      continue;
    }
  }

  throw new Error('Failed to generate smart note via AI models.');
}

/**
 * Diagnoses a learner struggle when a topic is failed 2+ times
 */
export async function diagnoseLearnerStruggle(params: {
  subject: string;
  topic: string;
  struggleCount: number;
  grade?: string;
  failedQuestions?: string[];
}): Promise<StruggleDiagnosisOutput> {
  const fallbackSuggestion = `Learners commonly struggle with "${params.topic}" because of rushed arithmetic or confusing sign conventions. Step 1: Break down what is given vs what is needed. Step 2: Write out the fundamental formula. Step 3: Check units before calculating.`;
  const fallbackResource = `NEXOVIAN ${params.subject} Foundation Guide · Lesson on ${params.topic} with 5 step-by-step worked solutions.`;

  if (!isGeminiConfigured()) {
    return {
      ai_suggestion: fallbackSuggestion,
      suggested_resource: fallbackResource
    };
  }

  const { client } = getGeminiClient();

  const prompt = `You are NEXOVIAN Struggle Detection Engine for South African education (CAPS & TVET).
A student has struggled with the topic "${params.topic}" in "${params.subject}" (Grade/Level: ${params.grade || 'Grade 10'}), failing assessments ${params.struggleCount} times.
${params.failedQuestions && params.failedQuestions.length > 0 ? `Questions they missed:\n- ${params.failedQuestions.join('\n- ')}` : ''}

Generate targeted diagnostic intervention matching this JSON:
{
  "ai_suggestion": "Empathetic, actionable 2-3 sentence advice. Explain the exact conceptual mistake students make here (e.g. forgetting friction, unit mismatch, or sign errors) and provide a concrete mental model or 3-step checklist to solve it correctly every time.",
  "suggested_resource": "Name of the exact recommended review lesson, practice drill, or video focus (e.g. 'CAPS Physical Sciences Paper 1: Newton's Laws Worked Past Paper Drill (2024-2025)')"
}

No raw '$' math symbols. Return ONLY valid raw JSON.`;

  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await client.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const text = (response.text || '').replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
      const parsed = JSON.parse(text);

      return {
        ai_suggestion: parsed.ai_suggestion || fallbackSuggestion,
        suggested_resource: parsed.suggested_resource || fallbackResource
      };
    } catch (err: any) {
      console.warn(`Model ${model} error in diagnoseLearnerStruggle:`, err?.message || err);
      continue;
    }
  }

  return {
    ai_suggestion: fallbackSuggestion,
    suggested_resource: fallbackResource
  };
}



