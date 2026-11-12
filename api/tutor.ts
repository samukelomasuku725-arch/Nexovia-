/**
 * Vercel Serverless Function for /api/tutor
 */
import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return res.status(500).json({
      error: "GEMINI_API_KEY_MISSING",
      message: "GEMINI_API_KEY not configured on server. Add to Vercel env."
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      userQuestion = '',
      message = '',
      selectedLanguage = 'zu',
      language = 'zu',
      gradeOrProgramme = 'Grade 12',
      subject = 'Mathematics',
      topic = 'General',
      mode = 'explain',
      conversationHistory = []
    } = req.body || {};

    const promptQuestion = userQuestion || message || 'Hello!';

    const ai = new GoogleGenAI({ apiKey });

    const promptText = `You are NEXOVIAN Socratic AI Tutor calibrated for the South African curriculum.
Grade/Level: ${gradeOrProgramme}
Subject: ${subject}
Topic: ${topic}
Teaching Mode: ${mode}
Language: ${selectedLanguage || language}

Student Question:
${promptQuestion}

Respond helpfully in ${selectedLanguage || language} with clear step-by-step logic, encouraging tone, and Socratic guidance.`;

    const candidateModels = ['gemini-3.5-flash-lite', 'gemini-3.1-flash-lite', 'gemini-3.8-flash'];
    let response: any = null;
    let lastError: any = null;

    for (const candidateModel of candidateModels) {
      try {
        response = await ai.models.generateContent({
          model: candidateModel,
          contents: promptText
        });
        if (response) break;
      } catch (err: any) {
        lastError = err;
        const errMsg = String(err?.message || '');
        if (errMsg.includes('429') || errMsg.includes('quota') || errMsg.includes('limit') || err?.status === 429) {
          throw err;
        }
      }
    }

    if (!response && lastError) {
      throw lastError;
    }

    const answer = response.text || '';

    return res.status(200).json({
      success: true,
      answer,
      data: {
        content: answer,
        summary: `Answer for ${subject} (${topic})`,
        followUps: [
          'Can you give another example?',
          'Walk me through step by step.',
          'Let us practice a problem.'
        ]
      }
    });
  } catch (error: any) {
    const errorMsg = String(error?.message || error || '');
    console.error("Gemini Tutor Error:", errorMsg);

    if (errorMsg.includes("429") || errorMsg.includes("quota") || errorMsg.includes("limit") || error?.status === 429) {
      return res.status(429).json({
        error: "LIMIT_REACHED",
        message: "Daily AI limit reached. NEXOVIAN uses Google Gemini free tier (50 requests/day). Limit resets at midnight SAST. Try tomorrow or upgrade to NEXOVIAN Pro for unlimited.",
        isiZuluMessage: "Umkhawulo wansuku zonke ufinyelelwe. Zama kusasa ekuseni noma thuthukela ku-Pro.",
        retryAfter: "midnight SAST"
      });
    }

    return res.status(500).json({
      error: "AI_ERROR",
      message: errorMsg || "NEXOVIAN could not process the question right now. Please try again."
    });
  }
}
