import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

export interface AIRequestParams {
  userQuestion: string;
  selectedLanguage: string; // e.g. "en", "zu", "af", "xh", etc.
  educationLevel: string; // e.g. "FET Phase (Grade 10-12 CAPS)"
  gradeOrProgramme?: string; // e.g. "Grade 10", "NATED N4"
  subject: string; // e.g. "Mathematics", "Physical Sciences"
  topic: string; // e.g. "Algebra & Factorization"
  learningMode: 'explain' | 'simplify' | 'summarize' | 'translate' | 'practice' | 'quiz_help';
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
}

export interface StructuredAIResponse {
  content: string;
  summary: string;
  followUps: string[];
  quizQuestions?: Array<{
    id: string;
    type: 'multiple_choice' | 'true_false' | 'short_answer';
    question: string;
    options?: string[];
    correctAnswer: string;
    explanation: string;
  }>;
  detectedLanguage: string;
  isDemo: boolean;
  modelUsed: string;
}

const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  af: 'Afrikaans',
  zu: 'isiZulu',
  xh: 'isiXhosa',
  nr: 'isiNdebele',
  ss: 'siSwati',
  nso: 'Sepedi (Northern Sotho)',
  st: 'Sesotho (Southern Sotho)',
  tn: 'Setswana',
  ve: 'Tshivenḓa',
  ts: 'Xitsonga'
};

/**
 * Reusable server-side function to generate structured educational responses
 */
export async function generateAIResponse(params: AIRequestParams): Promise<StructuredAIResponse> {
  const apiKey = process.env.AI_API_KEY || process.env.GEMINI_API_KEY;
  const modelName = process.env.AI_MODEL || 'gemini-3.5-flash-lite';
  const languageName = LANGUAGE_NAMES[params.selectedLanguage] || params.selectedLanguage || 'English';

  // Sanitize input strings
  const question = (params.userQuestion || '').trim().slice(0, 3000);
  const subject = (params.subject || 'General Education').slice(0, 100);
  const topic = (params.topic || 'General Topic').slice(0, 100);
  const level = (params.educationLevel || 'High School').slice(0, 100);
  const grade = (params.gradeOrProgramme || '').slice(0, 100);
  const mode = params.learningMode || 'explain';

  // If API key is missing or default placeholder, provide high-quality marked demo response
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey === 'MY_AI_API_KEY') {
    return generateDemoResponse({
      question,
      language: languageName,
      level,
      grade,
      subject,
      topic,
      mode
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Mode-specific pedagogical guidance
    let modeInstruction = '';
    switch (mode) {
      case 'explain':
        modeInstruction = `Provide a comprehensive, pedagogical explanation calibrated specifically for ${grade || level}. Use clear conceptual definitions, step-by-step logic, and one practical real-world application.`;
        break;
      case 'simplify':
        modeInstruction = `Break down this concept using extreme simplicity, vivid everyday analogies, and clear plain terms. Imagine explaining to someone encountering it for the very first time.`;
        break;
      case 'summarize':
        modeInstruction = `Provide concise, bulleted revision notes. Include key definitions, essential mathematical or scientific formulas, rules, and 3 high-yield exam takeaways.`;
        break;
      case 'translate':
        modeInstruction = `Translate the educational explanation into ${languageName}. Preserve standard technical terms in parentheses where helpful for South African curriculum students. Ensure natural, grammatically correct phrasing.`;
        break;
      case 'practice':
        modeInstruction = `Generate 2-3 realistic practice questions appropriate for ${grade || level} ${subject}. Include a mix of multiple choice and step-by-step problems with full explanations.`;
        break;
      case 'quiz_help':
        modeInstruction = `Do NOT give the direct answer immediately. Act as a patient Socratic tutor. Point out the core principle, ask a guiding question to test their understanding, and explain common traps or misconceptions.`;
        break;
      default:
        modeInstruction = 'Explain the concept clearly and helpfully.';
    }

    const systemPrompt = `You are Nexovia AI Tutor, a South African and international educational mentor.
Your motto is: "Learn today. Build tomorrow."

STUDENT CONTEXT:
- Education Level: ${level} ${grade ? `(${grade})` : ''}
- Subject: ${subject}
- Topic: ${topic}
- Target Language: ${languageName}
- Pedagogical Mode: ${mode}

MODE DIRECTIVE:
${modeInstruction}

IMPORTANT GUIDELINES:
1. Always adapt difficulty, notation, and terminology to the student's exact education level (${grade || level}).
2. When the target language is not English, respond in that language (${languageName}), while keeping recognized universal formulas or technical terms accessible.
3. Be encouraging, clear, and mathematically/scientifically rigorous.
4. If generating practice questions, output them structured inside the JSON output.
5. You must return ONLY a valid, parseable JSON object matching this schema:
{
  "content": "Detailed markdown explanation or response formatted with headers, bold text, lists, and code/math blocks where appropriate.",
  "summary": "1-2 sentence high-level summary of the core insight.",
  "followUps": ["Follow-up question 1?", "Follow-up question 2?", "Follow-up question 3?"],
  "quizQuestions": [
    {
      "id": "q1",
      "type": "multiple_choice",
      "question": "Question text here",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option B",
      "explanation": "Why Option B is correct."
    }
  ]
}`;

    // Format conversation history
    const historyText = (params.conversationHistory || [])
      .slice(-6)
      .map((m) => `${m.role === 'user' ? 'Student' : 'Tutor'}: ${m.content}`)
      .join('\n');

    const promptContents = `${systemPrompt}

${historyText ? `RECENT CONVERSATION:\n${historyText}\n` : ''}
CURRENT STUDENT INQUIRY:
"${question}"

Return ONLY the raw JSON object. Do not include markdown code block backticks if possible, or wrap strictly in valid JSON.`;

    // Timeout race: 8000ms max to prevent indefinite blocking
    const responsePromise = ai.models.generateContent({
      model: modelName,
      contents: promptContents,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('AI Request Timeout')), 8000)
    );

    const response = await Promise.race([responsePromise, timeoutPromise]);

    const responseText = response.text || '';
    let parsed: any;
    try {
      const cleaned = responseText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = {
        content: responseText || 'Nexovia processed your question successfully.',
        summary: `Key study takeaway for ${topic}`,
        followUps: [
          `Can you provide another example in ${topic}?`,
          `How does this apply to practical exam questions?`,
          `Can we simplify this further?`
        ]
      };
    }

    return {
      content: parsed.content || responseText,
      summary: parsed.summary || `Key study takeaway for ${topic}`,
      followUps: Array.isArray(parsed.followUps) ? parsed.followUps.slice(0, 3) : [],
      quizQuestions: Array.isArray(parsed.quizQuestions) ? parsed.quizQuestions : undefined,
      detectedLanguage: languageName,
      isDemo: false,
      modelUsed: modelName
    };
  } catch (error: any) {
    console.error('Gemini API call failed:', error?.message || error);
    // As per user specification:
    // If an AI request fails:
    // Show: "Nexovia couldn't generate a response right now."
    // Provide: Retry, Return to Tutor
    throw new Error("Nexovia couldn't generate a response right now.");
  }
}

/**
 * Deterministic, high-yield demo generator when AI backend is intentionally offline/unconfigured
 */
export function generateDemoResponse(context: {
  question: string;
  language: string;
  level: string;
  grade: string;
  subject: string;
  topic: string;
  mode: string;
}): StructuredAIResponse {
  const { question, language, level, grade, subject, topic, mode } = context;

  const content = `### ${topic} — ${mode.toUpperCase()} MODE
*Context: ${grade || level} · Subject: ${subject} · Language: ${language}*

**Concept Overview:**
In **${subject}** at the **${grade || level}** level, **${topic}** centers around foundational principles and systematic problem-solving steps.

${
  mode === 'simplify'
    ? `**Everyday Metaphor:**
Think of **${topic}** like a balanced weighing scale: whatever operation you perform on one side, you must mirror on the other to preserve equilibrium. When analyzing "${question || topic}", isolate the unknown variable step-by-step.`
    : mode === 'summarize'
    ? `**High-Yield Revision Points:**
1. **Core Rule:** Master the standard notation and definition for ${topic}.
2. **Key Method:** Always verify boundary conditions and check for extraneous solutions.
3. **Common Trap:** Avoid sign errors during distribution and transposition.`
    : mode === 'quiz_help'
    ? `**Socratic Guidance:**
Before checking the final answer, ask yourself:
- What fundamental definition connects the known variables in this question?
- If you test a simple numerical value or sketch the graph, does the trend support your hypothesis?
- What would happen if the sign or direction were reversed?`
    : `**Step-by-Step Breakdown:**
1. Identify the given parameters and what the question is asking you to solve or construct.
2. Apply the canonical formula or theorem governing **${topic}**.
3. Substitute the given values methodically, observing correct mathematical units and signs.
4. Confirm whether your answer is physically and mathematically reasonable.`
}

*(Demo Mode · AI backend offline. Connect your AI API Key in Settings to enable live neural responses.)*`;

  return {
    content,
    summary: `Essential revision principles for ${topic} (${grade || level}).`,
    followUps: [
      `How do I solve a typical exam question on ${topic}?`,
      `Can you provide a practice quiz on this topic?`,
      `Explain the common pitfalls in ${subject}.`
    ],
    quizQuestions: [
      {
        id: 'demo-q1',
        type: 'multiple_choice',
        question: `In ${subject} (${topic}), which strategy is most effective when approaching complex problems?`,
        options: [
          'Memorizing numbers without understanding the formula',
          'Breaking the problem into known parameters and applying first principles',
          'Skipping steps to save time',
          'Assuming the answer is always zero'
        ],
        correctAnswer: 'Breaking the problem into known parameters and applying first principles',
        explanation: 'Systematic decomposition and understanding first principles ensure reliable problem solving across all exam scenarios.'
      }
    ],
    detectedLanguage: language,
    isDemo: true,
    modelUsed: 'demo-mode'
  };
}
