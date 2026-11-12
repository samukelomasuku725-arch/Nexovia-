/**
 * Vercel Serverless Function for /api/scan & /api/ai/scan
 */
import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    console.error("MISSING GEMINI_API_KEY");
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
      imageBase64,
      mimeType = 'image/jpeg',
      question = 'Please explain what is shown in this image.',
      mode = 'explain',
      educationLevel = 'FET Phase (Grade 10-12 CAPS)',
      gradeOrProgramme = 'Grade 12',
      subject = 'General Education',
      topic = 'Scanned Material',
      language = 'zu'
    } = req.body || {};

    if (!imageBase64 || typeof imageBase64 !== 'string' || imageBase64.length < 50) {
      return res.status(400).json({
        error: "INVALID_IMAGE",
        message: "No valid image received. Please take a photo or choose an image from your gallery."
      });
    }

    let cleanBase64 = imageBase64;
    if (cleanBase64.includes(',')) {
      cleanBase64 = cleanBase64.split(',')[1];
    }
    cleanBase64 = cleanBase64.replace(/\s/g, '');

    const ai = new GoogleGenAI({ apiKey });

    const promptText = `You are NEXOVIAN's South African Curriculum AI Tutor.
Analyze this scanned educational image for a ${gradeOrProgramme} (${educationLevel}) student studying ${subject} (${topic}).
Mode: ${mode}
Explain the concepts in ${language === 'zu' ? 'isiZulu' : language} with clear step-by-step logic.
Question from student: ${question}

Provide your response in JSON format with fields:
{
  "explanation": "Detailed step-by-step educational explanation in the requested language",
  "summary": "Short 1-sentence summary",
  "followUpSuggestions": ["Suggested follow-up 1", "Suggested follow-up 2"]
}`;

    const candidateModels = ['gemini-3.5-flash-lite', 'gemini-3.1-flash-lite', 'gemini-3.8-flash'];
    let response: any = null;
    let lastError: any = null;

    for (const candidateModel of candidateModels) {
      try {
        response = await ai.models.generateContent({
          model: candidateModel,
          contents: {
            parts: [
              { inlineData: { mimeType, data: cleanBase64 } },
              { text: promptText }
            ]
          },
          config: {
            responseMimeType: 'application/json'
          }
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

    const responseText = response.text || '';
    const cleaned = responseText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
    let parsed: any;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = {
        explanation: responseText || "Scanned material analyzed successfully.",
        summary: "Scanned material reviewed.",
        followUpSuggestions: ["Explain this step by step", "Show another example"]
      };
    }

    const sessionId = `scan_${Date.now()}`;
    const sessionRecord = {
      id: sessionId,
      title: `${subject} · ${topic}`,
      thumbnail: imageBase64.slice(0, 500000),
      mimeType,
      initialQuestion: question,
      mode: (mode || 'explain').toLowerCase(),
      educationLevel,
      gradeOrProgramme,
      subject,
      topic,
      language,
      aiExplanation: parsed.explanation,
      summary: parsed.summary,
      clarityAssessment: { isClear: true, issue: 'none', message: 'Image processed.' },
      followUpSuggestions: parsed.followUpSuggestions || [],
      messages: [
        { id: `u_${Date.now()}`, role: 'user', content: question, timestamp: new Date().toISOString() },
        { id: `a_${Date.now()}`, role: 'assistant', content: parsed.explanation, timestamp: new Date().toISOString(), isAiGenerated: true }
      ],
      saved: false,
      createdAt: new Date().toISOString()
    };

    return res.status(200).json({
      success: true,
      data: {
        session: sessionRecord,
        analysis: parsed
      }
    });
  } catch (error: any) {
    const errorMsg = String(error?.message || error || '');
    console.error("Gemini Scan Error:", errorMsg);

    if (errorMsg.includes("429") || errorMsg.includes("quota") || errorMsg.includes("limit") || error?.status === 429) {
      return res.status(429).json({
        error: "LIMIT_REACHED",
        message: "Daily AI limit reached. NEXOVIAN uses Google Gemini free tier (50 scans/day). Limit resets at midnight SAST. Try tomorrow or upgrade to NEXOVIAN Pro for unlimited.",
        isiZuluMessage: "Umkhawulo wansuku zonke ufinyelelwe. Zama kusasa ekuseni noma thuthukela ku-Pro.",
        retryAfter: "midnight SAST"
      });
    }

    return res.status(500).json({
      error: "AI_ERROR",
      message: errorMsg || "NEXOVIAN could not analyze the image right now. Please try again."
    });
  }
}
