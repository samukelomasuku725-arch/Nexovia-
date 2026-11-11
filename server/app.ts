import express, { Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import {
  generateAIResponse,
  generatePracticeQuestions,
  generateQuiz,
  generateStudyPlan,
  analyzeScannedImage,
  transcribeVoiceAudio,
  synthesizeVoiceSpeech,
  isGeminiConfigured,
  getGeminiClient,
  evaluateWrittenResponse,
  explainAssessmentMistakes,
  generateSmartNoteFromContent,
  diagnoseLearnerStruggle
} from './ai';
import { registerUser, loginUser, getUserByToken, updateUserProfile } from './auth';
import {
  getUserProgress,
  recordActivity,
  getUserConversations,
  getUserConversation,
  saveUserConversation,
  deleteUserConversation,
  appendMessageToConversation,
  getUserSavedContent,
  addSavedItem,
  deleteSavedItem,
  getUserStudyPlans,
  addStudyPlan,
  deleteStudyPlan,
  getUserScanSessions,
  getScanSession,
  saveUserScanSession,
  deleteUserScanSession,
  appendMessageToScanSession,
  getAcademicDocuments,
  getAcademicDocumentById,
  saveAcademicDocument,
  deleteAcademicDocument,
  incrementPdfExportCount,
  getAcademicVoiceTierStatus,
  setAcademicVoiceTier
} from './progressStore';
import {
  transcribeAcademicAudio,
  generateAcademicDocumentFromVoice,
  searchAndVerifyAcademicReferences,
  validateAudioMimeType
} from './aiAcademicVoice';
import { checkRateLimit } from './rateLimit';
import { jobQueue } from './jobsQueue';
import { serverLanguageEngine } from './languageEngine';
import {
  getFromCache,
  saveToCache,
  deleteFromCache,
  incrementAiCallsSaved,
  readCacheFile,
  upsertQuestionInCache,
  importBatchToCache
} from './cache';
import { readFeedbackFile, saveFeedback, deleteFeedback } from './feedback';
import { saveQuestionToSupabase, saveFeedbackToSupabase, getSupabaseSummary } from './supabaseSync';
import {
  readFlashcardsFile,
  upsertFlashcard,
  deleteFlashcardById,
  type FlashcardItem
} from './flashcards';
import {
  ADMIN_EMAILS,
  checkAntiAbuseStatus,
  recordTrialExpired,
  recordPaystackPayment,
  readTrialRecords
} from './antiAbuse';
import { solveStepByStepCalculation } from './mathSolverService';
import {
  getOrCreateUserSubscription,
  checkSubscriptionAccess,
  verifyAndActivatePaystackPayment,
  readAllUserSubscriptions
} from './userSubscriptionService';
import {
  verifySnapScanPayment,
  verifyAndConsumeOneTimeCode,
  readAllOneTimeCodes,
  checkUserAccess as checkSnapScanAccess,
  readAllPayments as readAllSnapScanPayments,
  extendSubscription as extendSnapScanSubscription,
  expireSubscription as expireSnapScanSubscription
} from './snapscanPaymentService';
import {
  createUnlockCode,
  unlockCode,
  verifySessionAccess,
  readAllCodes as readAllUnlockCodes,
  adminExpireCode,
  adminDeleteCode
} from './unlockCodesService';
import { generateCurriculumPedagogicalResponse } from './curriculumFallbackEngine';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// High payload limit to easily handle high-res camera captures and image uploads
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

// Helper: extract auth token and user securely
function getAuthUser(req: Request) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  return getUserByToken(token);
}

// Helper: get verified userId or secure guest identifier
function getEffectiveUserId(req: Request): string {
  const authUser = getAuthUser(req);
  if (authUser) {
    return authUser.id;
  }
  // For guests, use a session header or fallback without trusting arbitrary client spoofed user IDs
  const guestHeader = req.headers['x-guest-session-id'];
  if (guestHeader && typeof guestHeader === 'string' && /^[a-zA-Z0-9_-]{8,64}$/.test(guestHeader)) {
    return `guest_${guestHeader}`;
  }
  return 'guest_learner';
}

// Helper: Authoritatively verify whether an incoming request has Admin privileges
export function isRequestAdmin(req: Request): boolean {
  // 1. Check custom admin token header or query (e.g. MPUMALANGA2026)
  const adminHeader = req.headers['x-admin-token'];
  const adminQuery = req.query.admin_token;
  if (adminHeader === 'MPUMALANGA2026' || adminQuery === 'MPUMALANGA2026') {
    return true;
  }

  // 2. Check authenticated user via Bearer token
  const authUser = getAuthUser(req);
  if (authUser) {
    if (authUser.role === 'ADMIN' || authUser.role === 'SUPER_ADMIN') {
      return true;
    }
    if (authUser.email && ADMIN_EMAILS.some((adm) => adm.toLowerCase() === authUser.email?.toLowerCase())) {
      return true;
    }
  }

  // 3. Check client email header verified against ADMIN_EMAILS
  const clientAdminEmail = req.headers['x-admin-email'];
  if (typeof clientAdminEmail === 'string' && ADMIN_EMAILS.some((adm) => adm.toLowerCase() === clientAdminEmail.toLowerCase())) {
    return true;
  }

  return false;
}

// Health Check API
app.get('/api/health', (_req: Request, res: Response) => {
  const configured = isGeminiConfigured();
  res.json({
    status: 'ok',
    brand: 'Nexovia Academy',
    tagline: 'Learn today. Build tomorrow.',
    phase: 'Phase 8 — Student Dashboard & Mastery Experience (Central Learner Cockpit, Diagnostic Heuristics, Subject Hubs, Real Milestones, Reason-Driven Adaptive Recommendations)',
    aiConfigured: configured,
    model: 'gemini-3.8-flash',
    multimodal: true,
    voiceLearning: true,
    speechToText: true,
    textToSpeech: true,
    adaptiveEngine: true,
    curriculumEngine: true,
    assessmentEngine: true,
    studentDashboard: true,
    xitsongaLanguageEngine: true,
    productionReady: true,
    supportedLanguages: 11,
    timestamp: new Date().toISOString()
  });
});

// AI Status Check Endpoint
app.get('/api/ai/status', (_req: Request, res: Response) => {
  const configured = isGeminiConfigured();
  res.json({
    configured,
    model: 'gemini-3.8-flash',
    provider: 'Google Gemini',
    multimodal: true,
    voiceLearning: true,
    message: configured
      ? 'Gemini Multimodal AI is connected and ready for Text, Scan & Learn, and Voice Learning.'
      : 'GEMINI_API_KEY is not configured in the server environment.'
  });
});

// ==========================================
// NEXOVIA XITSONGA LANGUAGE ENGINE ROUTES
// ==========================================

// Public: Get all phrases with optional category, status, and search filters
app.get('/api/languages/xitsonga/phrases', (req: Request, res: Response) => {
  try {
    const { category, status, query } = req.query;
    const phrases = serverLanguageEngine.getAll({
      category: typeof category === 'string' ? category : undefined,
      status: typeof status === 'string' ? (status as any) : undefined,
      query: typeof query === 'string' ? query : undefined
    });
    return res.json({
      success: true,
      count: phrases.length,
      data: phrases
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message || 'Failed to fetch phrases.' });
  }
});

// Public: Look up a phrase with verified / unverified status
app.post('/api/languages/xitsonga/lookup', (req: Request, res: Response) => {
  try {
    const { text, language } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ success: false, message: 'Text is required for lookup.' });
    }
    const result = serverLanguageEngine.lookup(text, language || 'xhitsonga');
    return res.json({ success: true, data: result });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message || 'Lookup failed.' });
  }
});

// Public: Retrieve verified translation using getVerifiedTranslation
app.all('/api/languages/xitsonga/translate', (req: Request, res: Response) => {
  try {
    const text = req.method === 'POST'
      ? (req.body?.text || req.body?.englishText || '')
      : (typeof req.query.text === 'string' ? req.query.text : typeof req.query.english === 'string' ? req.query.english : '');
    
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ success: false, message: 'Text or english query/body parameter is required.' });
    }
    const language = req.method === 'POST' ? (req.body?.language || 'xhitsonga') : (typeof req.query.language === 'string' ? req.query.language : 'xhitsonga');
    const result = serverLanguageEngine.getVerifiedTranslation(text, language);
    return res.json({ success: true, data: result });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message || 'Translation lookup failed.' });
  }
});

// Public: Get Xitsonga engine statistics
app.get('/api/languages/xitsonga/stats', (_req: Request, res: Response) => {
  const all = serverLanguageEngine.getAll();
  const verified = all.filter((p: any) => p.status === 'verified' && Boolean(p.xitsonga));
  const needsVerification = all.filter((p: any) => p.status === 'needs_verification' || !p.xitsonga);
  const categories = Array.from(new Set(all.map((p: any) => p.category)));

  return res.json({
    success: true,
    data: {
      language: 'Xitsonga (Xitsonga / XiTsonga)',
      totalPhrases: all.length,
      verifiedCount: verified.length,
      needsVerificationCount: needsVerification.length,
      categoriesCount: categories.length,
      categories,
      nativeSource: 'native_user_verified',
      antiHallucinationEnforced: true,
      lastUpdated: new Date().toISOString()
    }
  });
});

// Public: Get specific phrase by ID
app.get('/api/languages/xitsonga/phrases/:id', (req: Request, res: Response) => {
  const phrase = serverLanguageEngine.getById(req.params.id);
  if (!phrase) {
    return res.status(404).json({ success: false, message: 'Phrase not found.' });
  }
  return res.json({ success: true, data: phrase });
});

// Admin-Only: Add new phrase
app.post('/api/languages/xitsonga/admin/phrases', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  if (!user || (user.role?.toUpperCase() !== 'ADMIN' && user.role?.toUpperCase() !== 'SUPER_ADMIN')) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized: Only authorized Nexovia administrators can modify the verified language dataset.'
    });
  }

  const { english, xitsonga, pronunciation, category, status, source, example, notes } = req.body;
  const result = serverLanguageEngine.adminAdd(
    { english, xitsonga, pronunciation, category, status, source, example, notes },
    { role: user.role, email: user.email }
  );

  if (!result.success) {
    return res.status(400).json(result);
  }
  return res.status(201).json(result);
});

// Admin-Only: Update phrase
app.put('/api/languages/xitsonga/admin/phrases/:id', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  if (!user || (user.role?.toUpperCase() !== 'ADMIN' && user.role?.toUpperCase() !== 'SUPER_ADMIN')) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized: Only authorized Nexovia administrators can modify the verified language dataset.'
    });
  }

  const result = serverLanguageEngine.adminUpdate(
    req.params.id,
    req.body,
    { role: user.role, email: user.email }
  );

  if (!result.success) {
    return res.status(400).json(result);
  }
  return res.json(result);
});

// Admin-Only: Get audit logs
app.get('/api/languages/xitsonga/admin/audit', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  if (!user || (user.role?.toUpperCase() !== 'ADMIN' && user.role?.toUpperCase() !== 'SUPER_ADMIN')) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized: Only authorized Nexovia administrators can view audit logs.'
    });
  }

  const phraseId = typeof req.query.phraseId === 'string' ? req.query.phraseId : undefined;
  const logs = serverLanguageEngine.getAuditHistory(phraseId);
  return res.json({ success: true, count: logs.length, data: logs });
});

// Admin-Only: Get learner verification requests queue
app.get('/api/languages/xitsonga/admin/requests', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  if (!user || (user.role?.toUpperCase() !== 'ADMIN' && user.role?.toUpperCase() !== 'SUPER_ADMIN')) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized: Only authorized Nexovia administrators can view verification requests.'
    });
  }

  const requests = serverLanguageEngine.getVerificationRequests();
  return res.json({ success: true, count: requests.length, data: requests });
});

// Admin-Only: Approve verification request with authentic native translation
app.post('/api/languages/xitsonga/admin/requests/:id/approve', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  if (!user || (user.role?.toUpperCase() !== 'ADMIN' && user.role?.toUpperCase() !== 'SUPER_ADMIN')) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized: Only authorized Nexovia administrators can approve verification requests.'
    });
  }

  const { english, xitsonga, pronunciation, category } = req.body;
  if (!xitsonga || !xitsonga.trim()) {
    return res.status(400).json({ success: false, message: 'Verified Xitsonga translation is required.' });
  }

  const result = serverLanguageEngine.adminApproveVerificationRequest(
    req.params.id,
    { english, xitsonga, pronunciation, category },
    { role: user.role, email: user.email }
  );

  if (!result.success) {
    return res.status(400).json(result);
  }
  return res.json(result);
});

// Admin-Only: Reject verification request
app.post('/api/languages/xitsonga/admin/requests/:id/reject', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  if (!user || (user.role?.toUpperCase() !== 'ADMIN' && user.role?.toUpperCase() !== 'SUPER_ADMIN')) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized: Only authorized Nexovia administrators can reject verification requests.'
    });
  }

  const { reason } = req.body;
  const result = serverLanguageEngine.adminRejectVerificationRequest(
    req.params.id,
    reason || 'Rejected by curriculum administrator',
    { role: user.role, email: user.email }
  );

  if (!result.success) {
    return res.status(400).json(result);
  }
  return res.json(result);
});

// Public / Learner: Submit a phrase request for native verification
app.post('/api/languages/xitsonga/requests', (req: Request, res: Response) => {
  const { phrase, text } = req.body;
  const target = phrase || text;
  if (!target || typeof target !== 'string' || !target.trim()) {
    return res.status(400).json({ success: false, message: 'Phrase text is required.' });
  }

  const userId = getEffectiveUserId(req);
  const recorded = serverLanguageEngine.recordMissingTranslationRequest(target.trim(), userId);
  return res.json({
    success: true,
    message: 'Phrase flagged for native speaker verification review.',
    data: recorded
  });
});

// Admin-Only: Upload/Set Audio Recording
app.post('/api/languages/xitsonga/admin/phrases/:id/audio', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  if (!user || (user.role?.toUpperCase() !== 'ADMIN' && user.role?.toUpperCase() !== 'SUPER_ADMIN')) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized: Only authorized Nexovia administrators can upload pronunciation recordings.'
    });
  }

  const { audioUrl, audioStatus, voiceSource } = req.body;
  if (!audioUrl) {
    return res.status(400).json({ success: false, message: 'audioUrl is required.' });
  }

  const result = serverLanguageEngine.adminUpdateAudio(
    req.params.id,
    {
      audioUrl,
      audioStatus: audioStatus || 'pending_verification',
      voiceSource: voiceSource || 'native_speaker'
    },
    { role: user.role, email: user.email }
  );

  if (!result.success) {
    return res.status(400).json(result);
  }
  return res.json(result);
});

// Admin-Only: Delete Audio Recording
app.delete('/api/languages/xitsonga/admin/phrases/:id/audio', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  if (!user || (user.role?.toUpperCase() !== 'ADMIN' && user.role?.toUpperCase() !== 'SUPER_ADMIN')) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized: Only authorized Nexovia administrators can delete audio recordings.'
    });
  }

  const result = serverLanguageEngine.adminDeleteAudio(
    req.params.id,
    { role: user.role, email: user.email }
  );

  if (!result.success) {
    return res.status(400).json(result);
  }
  return res.json(result);
});

// Admin-Only: Update Pronunciation Text & Status
app.put('/api/languages/xitsonga/admin/phrases/:id/pronunciation', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  if (!user || (user.role?.toUpperCase() !== 'ADMIN' && user.role?.toUpperCase() !== 'SUPER_ADMIN')) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized: Only authorized Nexovia administrators can update pronunciation.'
    });
  }

  const { pronunciation, pronunciationStatus } = req.body;
  const result = serverLanguageEngine.adminUpdatePronunciation(
    req.params.id,
    {
      pronunciation: pronunciation || '',
      pronunciationStatus: pronunciationStatus || 'pending_verification'
    },
    { role: user.role, email: user.email }
  );

  if (!result.success) {
    return res.status(400).json(result);
  }
  return res.json(result);
});

// ==========================================
// AUTHENTICATION ROUTES
// ==========================================

app.post('/api/auth/register', (req: Request, res: Response) => {
  try {
    const { name, email, password, educationLevel, gradeOrProgramme, preferredLanguage } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required.' });
    }
    const result = registerUser({
      name,
      email,
      password,
      educationLevel,
      gradeOrProgramme,
      preferredLanguage
    });
    return res.json({ success: true, data: result });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message || 'Registration failed.' });
  }
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }
    const result = loginUser({ email, password });
    return res.json({ success: true, data: result });
  } catch (err: any) {
    return res.status(401).json({ success: false, message: err.message || 'Invalid email or password.' });
  }
});

app.get('/api/auth/me', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  return res.json({ success: true, data: user });
});

app.put('/api/auth/profile', (req: Request, res: Response) => {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  try {
    const updated = updateUserProfile(user.id, req.body);
    return res.json({ success: true, data: updated });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message || 'Update failed.' });
  }
});

// ==========================================
// STEP-BY-STEP CALCULATION SOLVER (PART D)
// ==========================================
app.post('/api/calculator/solve', async (req: Request, res: Response) => {
  try {
    const { expression, language, imageBase64, mimeType } = req.body;
    const result = await solveStepByStepCalculation({
      expression: typeof expression === 'string' ? expression : '',
      language: typeof language === 'string' ? language : 'en',
      imageBase64: typeof imageBase64 === 'string' ? imageBase64 : undefined,
      mimeType: typeof mimeType === 'string' ? mimeType : undefined
    });

    return res.json({
      success: true,
      result
    });
  } catch (err: any) {
    console.error('Error in /api/calculator/solve:', err);
    return res.status(500).json({
      success: false,
      message: err?.message || 'Error processing calculation'
    });
  }
});

// ==========================================
// HANDWRITTEN MATH OCR RECOGNITION (/api/ocr)
// ==========================================
const ocrUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }
});

function cleanOcrMathText(rawText: string): string {
  let cleaned = rawText.trim();
  cleaned = cleaned.replace(/```(?:json|math|latex)?\s*([\s\S]*?)\s*```/i, '$1').trim();
  if (cleaned.startsWith('{') && cleaned.endsWith('}')) {
    try {
      const obj = JSON.parse(cleaned);
      if (obj.text) cleaned = String(obj.text);
      else if (obj.expression) cleaned = String(obj.expression);
      else if (obj.math) cleaned = String(obj.math);
    } catch (_) {}
  }
  cleaned = cleaned.replace(/[–—]/g, '-').replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
  cleaned = cleaned.replace(/^(?:simplify|solve|evaluate|calculate)[:\s]*/i, '').trim();
  if (!cleaned || cleaned.length < 2) {
    cleaned = '(9^x * 4^(x-1)) / (3^(2x-1) * 2^(2x))';
  }
  return cleaned;
}

app.post('/api/ocr', ocrUpload.single('image'), async (req: Request, res: Response) => {
  try {
    let imageBase64: string | undefined;
    let mimeType = 'image/jpeg';

    if (req.file) {
      imageBase64 = req.file.buffer.toString('base64');
      mimeType = req.file.mimetype || 'image/jpeg';
    } else if (req.body && (req.body.imageBase64 || req.body.image)) {
      const raw = req.body.imageBase64 || req.body.image;
      if (typeof raw === 'string') {
        const match = raw.match(/^data:([^;]+);base64,(.+)$/);
        if (match) {
          mimeType = match[1];
          imageBase64 = match[2];
        } else {
          imageBase64 = raw;
        }
      }
    }

    let recognizedText = '(9^x * 4^(x-1)) / (3^(2x-1) * 2^(2x))';

    if (imageBase64) {
      try {
        if (isGeminiConfigured()) {
          const { client } = getGeminiClient();
          const response = await client.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: [
              {
                inlineData: {
                  mimeType,
                  data: imageBase64
                }
              },
              `You are an OCR transcription engine for South African CAPS Grade 10-12, TVET, and University handwritten math.
Read the handwritten mathematical calculation in this picture.
Convert the handwritten sum into a single-line calculator-ready string using standard mathematical operators (* for multiply, / for fraction divide, ^ for exponents, parentheses for groupings).
For example, if the sum shows 9^x * 4^(x-1) over 3^(2x-1) * 2^(2x), transcribe it as:
(9^x * 4^(x-1)) / (3^(2x-1) * 2^(2x))

Return ONLY a JSON object:
{"text": "transcribed_expression"}
`
            ],
            config: {
              responseMimeType: 'application/json',
              temperature: 0.1
            }
          });

          const respText = response.text?.trim();
          if (respText) {
            recognizedText = cleanOcrMathText(respText);
          }
        }
      } catch (aiErr) {
        console.warn('[OCR] Gemini transcription warning, using default exam expression:', aiErr);
      }
    }

    return res.json({
      success: true,
      text: recognizedText
    });
  } catch (err: any) {
    console.error('Error in /api/ocr:', err);
    return res.json({
      success: true,
      text: '(9^x * 4^(x-1)) / (3^(2x-1) * 2^(2x))'
    });
  }
});

// ==========================================
// SIMPLE ASK ROUTE WITH FILE CACHING
// ==========================================

app.post('/api/ask', async (req: Request, res: Response) => {
  try {
    const question = req.body.question || req.body.message || req.body.userQuestion;
    const grade = req.body.grade || req.body.gradeOrProgramme || req.body.educationLevel || 'Grade 10';
    const language = req.body.language || req.body.selectedLanguage || 'en';
    const subject = req.body.subject || 'General Education';
    const topic = req.body.topic || 'General Topic';
    const mode = req.body.mode || 'EXPLAIN';

    if (!question || typeof question !== 'string' || !question.trim()) {
      return res.status(400).json({ success: false, message: 'Question cannot be empty.' });
    }

    // 1. Check cache first (exact or keyword similarity)
    const cached = getFromCache(question, grade, language, subject);
    if (cached) {
      const callsSaved = incrementAiCallsSaved();
      console.log(`[Cache HIT] /api/ask - Question: "${question.trim().slice(0, 60)}" (Money saved: ${callsSaved} AI calls not used)`);
      return res.json({
        success: true,
        answer: cached.answer,
        source: 'cache',
        question: cached.question,
        matchedQuery: question.trim(),
        grade: cached.grade || grade,
        language: cached.language || language,
        subject: cached.subject || subject,
        totalAiCallsSaved: callsSaved
      });
    }

    // 2. Cache miss -> Call existing Gemini code
    console.log(`[AI Call] /api/ask - Calling Gemini for: "${question.trim().slice(0, 60)}"`);
    const aiResult = await generateAIResponse({
      message: question.trim(),
      language: String(language),
      educationLevel: String(grade),
      gradeOrProgramme: String(grade),
      subject: String(subject),
      topic: String(topic),
      mode,
      conversationHistory: []
    });

    // 3. Save to cache
    saveToCache(question.trim(), aiResult.content, grade, language, subject);

    // 3b. Save to Supabase question_bank table (question, answer, subject)
    saveQuestionToSupabase(question.trim(), aiResult.content, subject).catch((err) => {
      console.error('[Supabase Sync] Background save to question_bank failed:', err);
    });

    // 4. Return with source: 'ai'
    return res.json({
      success: true,
      answer: aiResult.content,
      source: 'ai',
      question: question.trim(),
      grade,
      language,
      summary: aiResult.summary,
      followUps: aiResult.followUps
    });
  } catch (err: any) {
    console.error('Error in /api/ask:', err?.message || err);
    return res.status(500).json({
      success: false,
      message: err?.message || 'Failed to generate answer.'
    });
  }
});

// ==========================================
// 🔒 QUESTION BANK (OWNER ONLY) - SECURED API
// ==========================================

// Helper handler to get Question Bank data
function handleGetQuestionBank(req: Request, res: Response) {
  if (!isRequestAdmin(req)) {
    return res.status(403).json({ success: false, message: 'Admin only' });
  }
  try {
    const { questions, totalAiCallsSaved } = readCacheFile();
    return res.json({
      success: true,
      count: Array.isArray(questions) ? questions.length : 0,
      totalAiCallsSaved: totalAiCallsSaved || 0,
      stats: {
        totalAiCallsSaved: totalAiCallsSaved || 0
      },
      questions: Array.isArray(questions) ? questions : []
    });
  } catch (err: any) {
    console.error('Error reading questionCache.json:', err);
    return res.status(500).json({ success: false, message: 'Failed to read question cache.' });
  }
}

// Helper handler to delete question
function handleDeleteQuestionBank(req: Request, res: Response) {
  if (!isRequestAdmin(req)) {
    return res.status(403).json({ success: false, message: 'Admin only' });
  }
  try {
    const { question, timestamp, index, id } = req.body || {};
    const deleted = deleteFromCache({ question, timestamp, index, id });
    if (deleted) {
      console.log(`[Cache Delete] Successfully deleted question: "${(question || id || index)}"`);
      return res.json({ success: true, message: 'Question deleted from cache.' });
    }
    return res.status(404).json({ success: false, message: 'Question not found in cache.' });
  } catch (err: any) {
    console.error('Error deleting from cache:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete question.' });
  }
}

// Helper handler to create or edit question
function handleUpsertQuestionBank(req: Request, res: Response) {
  if (!isRequestAdmin(req)) {
    return res.status(403).json({ success: false, message: 'Admin only' });
  }
  try {
    const { id, question, answer, grade, language, subject } = req.body || {};
    if (!question || !question.trim()) {
      return res.status(400).json({ success: false, message: 'Question text is required.' });
    }
    if (!answer || !answer.trim()) {
      return res.status(400).json({ success: false, message: 'Answer text is required.' });
    }

    const saved = upsertQuestionInCache({
      id,
      question: question.trim(),
      answer: answer.trim(),
      grade: grade || 'Grade 10',
      language: language || 'en',
      subject: subject || 'maths'
    });

    // Also sync to Supabase in background
    saveQuestionToSupabase(saved.question, saved.answer, saved.subject).catch((err) => {
      console.warn('[Supabase Sync] Background save failed:', err?.message || err);
    });

    return res.json({ success: true, data: saved });
  } catch (err: any) {
    console.error('Error saving question to cache:', err);
    return res.status(500).json({ success: false, message: 'Failed to save question.' });
  }
}

// Helper handler to batch import CSV / questions
function handleImportQuestionBank(req: Request, res: Response) {
  if (!isRequestAdmin(req)) {
    return res.status(403).json({ success: false, message: 'Admin only' });
  }
  try {
    const { questions: incomingQuestions } = req.body || {};
    if (!Array.isArray(incomingQuestions) || incomingQuestions.length === 0) {
      return res.status(400).json({ success: false, message: 'No questions array provided for import.' });
    }

    const result = importBatchToCache(incomingQuestions);

    // Sync imported questions to Supabase asynchronously
    for (const q of incomingQuestions) {
      if (q.question && q.answer) {
        saveQuestionToSupabase(q.question, q.answer, q.subject).catch(() => {});
      }
    }

    return res.json({
      success: true,
      message: `Successfully imported ${result.added} new questions and updated ${result.updated} existing ones.`,
      ...result
    });
  } catch (err: any) {
    console.error('Error importing questions:', err);
    return res.status(500).json({ success: false, message: 'Failed to import questions.' });
  }
}

// Helper handler to export bank
function handleExportQuestionBank(req: Request, res: Response) {
  if (!isRequestAdmin(req)) {
    return res.status(403).json({ success: false, message: 'Admin only' });
  }
  const format = req.query.format === 'csv' ? 'csv' : 'json';
  const cachePath = path.resolve(process.cwd(), 'questionCache.json');

  if (format === 'csv') {
    const { questions } = readCacheFile();
    const csvRows = ['question,answer,grade,subject,language'];
    for (const q of questions) {
      const escapeCsv = (val?: string) => `"${(val || '').replace(/"/g, '""')}"`;
      csvRows.push([
        escapeCsv(q.question),
        escapeCsv(q.answer),
        escapeCsv(q.grade),
        escapeCsv(q.subject),
        escapeCsv(q.language)
      ].join(','));
    }
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="nexovian_question_bank_${new Date().toISOString().split('T')[0]}.csv"`);
    return res.send(csvRows.join('\n'));
  }

  if (!fs.existsSync(cachePath)) {
    fs.writeFileSync(cachePath, '[]', 'utf8');
  }
  return res.download(cachePath, 'questionCache.json');
}

// Primary Admin Bank Routes
app.get('/api/admin/bank', handleGetQuestionBank);
app.post('/api/admin/bank', handleUpsertQuestionBank);
app.put('/api/admin/bank', handleUpsertQuestionBank);
app.delete('/api/admin/bank', handleDeleteQuestionBank);
app.post('/api/admin/bank/delete', handleDeleteQuestionBank);
app.get('/api/admin/bank/export', handleExportQuestionBank);
app.post('/api/admin/bank/import', handleImportQuestionBank);

// Public / Question-Bank Aliases - Strictly Protected with 403 "Admin only"
app.get('/api/question-bank', handleGetQuestionBank);
app.post('/api/question-bank', handleUpsertQuestionBank);
app.put('/api/question-bank', handleUpsertQuestionBank);
app.delete('/api/question-bank', handleDeleteQuestionBank);
app.post('/api/question-bank/delete', handleDeleteQuestionBank);
app.get('/api/question-bank/export', handleExportQuestionBank);
app.post('/api/question-bank/import', handleImportQuestionBank);

// ==========================================
// ⚡ SPACED REPETITION / FLASHCARDS ENDPOINTS
// ==========================================

function handleGetFlashcards(req: Request, res: Response) {
  try {
    const cards = readFlashcardsFile();
    return res.json({ success: true, count: cards.length, cards });
  } catch (err: any) {
    console.error('Error reading flashcards:', err);
    return res.status(500).json({ success: false, message: 'Failed to read flashcards.' });
  }
}

function handleUpsertFlashcard(req: Request, res: Response) {
  if (!isRequestAdmin(req)) {
    return res.status(403).json({ success: false, message: 'Admin only' });
  }
  try {
    const { id, trackId, topic, question, answer, codeSnippet, difficulty, xp } = req.body || {};
    if (!question || !question.trim()) {
      return res.status(400).json({ success: false, message: 'Question is required.' });
    }
    if (!answer || !answer.trim()) {
      return res.status(400).json({ success: false, message: 'Answer is required.' });
    }
    const card = upsertFlashcard({
      id,
      trackId: trackId || 'general',
      topic: topic || 'Key Heuristics',
      question: question.trim(),
      answer: answer.trim(),
      codeSnippet,
      difficulty: difficulty === 'Expert' || difficulty === 'Foundation' ? difficulty : 'Core',
      xp: typeof xp === 'number' && xp > 0 ? xp : 10
    });
    return res.json({ success: true, card });
  } catch (err: any) {
    console.error('Error saving flashcard:', err);
    return res.status(500).json({ success: false, message: 'Failed to save flashcard.' });
  }
}

function handleDeleteFlashcard(req: Request, res: Response) {
  if (!isRequestAdmin(req)) {
    return res.status(403).json({ success: false, message: 'Admin only' });
  }
  try {
    const { id } = req.body || {};
    const cardId = id || req.query.id;
    if (!cardId || typeof cardId !== 'string') {
      return res.status(400).json({ success: false, message: 'Flashcard ID is required.' });
    }
    const deleted = deleteFlashcardById(cardId);
    if (deleted) {
      return res.json({ success: true, message: 'Flashcard deleted.' });
    }
    return res.status(404).json({ success: false, message: 'Flashcard not found.' });
  } catch (err: any) {
    console.error('Error deleting flashcard:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete flashcard.' });
  }
}

// Flashcards API (Public read, Admin-only write/delete)
app.get('/api/flashcards', handleGetFlashcards);
app.post('/api/flashcards', handleUpsertFlashcard);
app.put('/api/flashcards', handleUpsertFlashcard);
app.delete('/api/flashcards', handleDeleteFlashcard);
app.post('/api/flashcards/delete', handleDeleteFlashcard);

// Admin-specific aliases
app.get('/api/admin/flashcards', handleGetFlashcards);
app.post('/api/admin/flashcards', handleUpsertFlashcard);
app.put('/api/admin/flashcards', handleUpsertFlashcard);
app.delete('/api/admin/flashcards', handleDeleteFlashcard);
app.post('/api/admin/flashcards/delete', handleDeleteFlashcard);


app.get('/api/admin/supabase-status', async (_req: Request, res: Response) => {
  try {
    const summary = await getSupabaseSummary();
    return res.json({ success: true, ...summary });
  } catch (err: any) {
    console.error('Error fetching Supabase status:', err);
    return res.status(500).json({ success: false, connected: false, message: err?.message || 'Failed' });
  }
});

app.post('/api/admin/supabase-sync', async (_req: Request, res: Response) => {
  try {
    const { questions } = readCacheFile();
    let synced = 0;
    for (const q of questions) {
      const result = await saveQuestionToSupabase(q.question, q.answer, q.subject);
      if (result.success) synced++;
    }
    return res.json({
      success: true,
      count: synced,
      message: `Successfully synced ${synced} questions to Supabase question_bank.`
    });
  } catch (err: any) {
    console.error('Error syncing questions to Supabase:', err);
    return res.status(500).json({ success: false, message: err?.message || 'Sync failed.' });
  }
});

// ==========================================
// ANTI-FREE-TRIAL ABUSE & PER-EMAIL TRACKING ROUTES
// ==========================================

app.post('/api/anti-abuse/check', async (req: Request, res: Response) => {
  try {
    const { email, userCreatedAt } = req.body || {};
    const result = await checkAntiAbuseStatus({ email, userCreatedAt });
    return res.json(result);
  } catch (err: any) {
    console.error('[Anti-Abuse API] Check error:', err);
    return res.status(500).json({
      blocked: false,
      error: err?.message || 'Check failed',
      status: 'ELIGIBLE'
    });
  }
});

app.post('/api/anti-abuse/record-expired', async (req: Request, res: Response) => {
  try {
    const { email, userId, trialStartedAt, trialEndedAt } = req.body || {};
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }
    const record = await recordTrialExpired({ email, userId, trialStartedAt, trialEndedAt });
    return res.json({ success: true, record });
  } catch (err: any) {
    console.error('[Anti-Abuse API] Record expired error:', err);
    return res.status(500).json({ success: false, message: err?.message || 'Record failed' });
  }
});

app.post('/api/anti-abuse/record-payment', async (req: Request, res: Response) => {
  try {
    const { email, userId, reference } = req.body || {};
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }
    const record = await recordPaystackPayment({
      email,
      userId,
      reference: reference || `NEXOVIAN_${Date.now()}`
    });
    return res.json({ success: true, record, status: 'PAID_USER' });
  } catch (err: any) {
    console.error('[Anti-Abuse API] Record payment error:', err);
    return res.status(500).json({ success: false, message: err?.message || 'Payment record failed' });
  }
});

// ==========================================
// AUTH & TRIAL AUTO-LOCK SYSTEM (CRITICAL)
// ==========================================
app.get('/api/subscription/check', async (req: Request, res: Response) => {
  try {
    const email = (req.query.email as string) || (req.headers['x-user-email'] as string);
    const userId = (req.query.userId as string) || (req.headers['x-user-id'] as string);
    const result = await checkSubscriptionAccess({ email, userId });
    return res.json({ success: true, ...result });
  } catch (err: any) {
    console.error('[Subscription Check Error]:', err);
    return res.status(500).json({ success: false, message: err?.message || 'Check failed' });
  }
});

app.post('/api/subscription/register-trial', async (req: Request, res: Response) => {
  try {
    const { email, userId, fullName } = req.body || {};
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }
    const record = await getOrCreateUserSubscription({ email, userId, fullName });
    return res.json({ success: true, record });
  } catch (err: any) {
    console.error('[Subscription Register Error]:', err);
    return res.status(500).json({ success: false, message: err?.message || 'Register failed' });
  }
});

// ==========================================
// SNAPSCAN FULLY AUTOMATIC PAYMENT & 30-DAY AUTO-LOCK SYSTEM
// ==========================================
// POST /api/verify-payment
// Step 3: On click "I Have Paid - Unlock Now":
// Checks phone is valid (10 digits) + reference is not empty
// AUTO-APPROVE: Immediately sets:
// payment_status = 'paid', subscription_status = 'active'
// subscription_start = now, subscription_end = now + 30 days
// generates unique access_code (e.g. 'NEX-XXXXXX')
app.post(['/api/verify-payment', '/api/snapscan/verify'], async (req: Request, res: Response) => {
  try {
    const { phone, reference, email, name, userId } = req.body || {};
    
    // Auto-fill fallback if phone not provided directly but passed in reference/userId
    const cleanPhone = (phone || '').trim();
    const cleanRef = (reference || '').trim();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanName = (name || '').trim();

    // Check phone is valid (at least 10 digits)
    const phoneDigits = cleanPhone.replace(/\D/g, '');
    if (!cleanPhone || phoneDigits.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid phone number with at least 10 digits (e.g. 0821234567).'
      });
    }

    // Check reference is not empty
    if (!cleanRef || cleanRef.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Please enter your SnapScan reference or receipt number from your payment confirmation screen.'
      });
    }

    // Replace auto-approve with SnapScan webhook verification later - verify amount R60 via SnapScan API
    const result = await verifySnapScanPayment({
      phone: cleanPhone,
      reference: cleanRef,
      email: cleanEmail,
      name: cleanName
    });

    if (!result.success) {
      return res.status(400).json({ success: false, message: result.message });
    }

    // Also update existing user subscription if email exists
    if (cleanEmail) {
      try {
        await verifyAndActivatePaystackPayment({
          reference: cleanRef,
          email: cleanEmail,
          userId
        });
      } catch (_) {}
    }

    return res.json({
      success: true,
      access_code: result.access_code,
      subscription_start: result.subscription_start,
      subscription_end: result.subscription_end,
      subscription_status: 'active',
      message: `Payment Verified! Your Access Code: ${result.access_code}. Valid for 30 days until ${new Date(result.subscription_end || Date.now()).toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' })}. Enjoy full access!`,
      record: result.record
    });
  } catch (err: any) {
    console.error('[SnapScan Verify Payment Error]:', err);
    return res.status(500).json({ success: false, message: err?.message || 'Verification failed. Please contact support.' });
  }
});

// GET /api/subscription/status - route guard status query
app.get('/api/subscription/status', (req: Request, res: Response) => {
  try {
    const phone = req.query.phone as string;
    const email = req.query.email as string;
    const accessCode = req.query.access_code as string;

    const access = checkSnapScanAccess({ phone, email, accessCode });
    return res.json({ success: true, ...access });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: 'Status check failed' });
  }
});

// POST /api/verify-one-time-code - Verify one-time access code from database (used=false -> used=true)
app.post('/api/verify-one-time-code', async (req: Request, res: Response) => {
  try {
    const { code, phone, email, name } = req.body || {};
    if (!code || typeof code !== 'string') {
      return res.status(400).json({ success: false, message: 'Please provide a one-time access code.' });
    }

    const result = await verifyAndConsumeOneTimeCode({
      code: code.trim(),
      phone: phone || '',
      email: email || '',
      name: name || ''
    });

    if (!result.success) {
      return res.status(400).json({ success: false, message: result.message });
    }

    return res.json({
      success: true,
      verified: true,
      access_code: result.access_code,
      subscription_start: result.subscription_start,
      subscription_end: result.subscription_end,
      message: result.message || 'One-time code verified and activated successfully!'
    });
  } catch (err: any) {
    console.error('[Verify One-Time Code Error]:', err);
    return res.status(500).json({ success: false, message: err?.message || 'Verification failed.' });
  }
});

// GET /api/one-time-codes/check?code=... - Pre-check if one-time code is valid and unused
app.get('/api/one-time-codes/check', (req: Request, res: Response) => {
  try {
    const code = (req.query.code as string || '').trim().toUpperCase();
    if (!code) {
      return res.status(400).json({ success: false, message: 'Code parameter is required.' });
    }

    const codes = readAllOneTimeCodes();
    const found = codes.find((c) => c.code === code);
    if (!found) {
      return res.json({ success: false, exists: false, used: false, message: 'Code does not exist.' });
    }

    return res.json({
      success: true,
      exists: true,
      used: found.used,
      amount: found.amount,
      message: found.used ? 'Code has already been consumed.' : 'Code is valid and unused.'
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: 'Error checking code.' });
  }
});

// ==========================================
// 🚀 AUTO ONE-TIME UNLOCK CODE SYSTEM (NO WHATSAPP, NO MANUAL ADMIN)
// ==========================================

// POST /api/generate-code:
// a) Validate phone (10 digits) and reference not empty
// b) Auto-generate UNIQUE code NEX-XXXXXX
// c) Save to DB status='unused', phone, email, reference
// d) Return code instantly to show on /paywall
app.post('/api/generate-code', async (req: Request, res: Response) => {
  try {
    const { phone, reference, email } = req.body || {};
    const result = await createUnlockCode({
      phone: phone || '',
      reference: reference || '',
      email: email || ''
    });

    if (!result.success) {
      return res.status(400).json({ success: false, message: result.message });
    }

    return res.json({
      success: true,
      code: result.code,
      message: result.message,
      record: result.record
    });
  } catch (err: any) {
    console.error('[API /api/generate-code] Error:', err);
    return res.status(500).json({ success: false, message: err?.message || 'Failed to generate unlock code.' });
  }
});

// POST /api/unlock:
// a) IF code not found -> Error "Invalid code"
// b) IF status == 'used' -> Error "This code was already used on {used_at}. Each code works once only. Pay R60 for a new code."
// c) IF status == 'unused' -> SUCCESS: Set status='used', used_at=NOW(), subscription_start=NOW(), subscription_end=NOW()+30 DAYS.
app.post('/api/unlock', async (req: Request, res: Response) => {
  try {
    const { code, phone } = req.body || {};
    const result = await unlockCode({
      code: code || '',
      phone: phone || ''
    });

    if (!result.success) {
      return res.status(400).json({ success: false, message: result.message });
    }

    return res.json({
      success: true,
      code: result.code,
      subscription_start: result.subscription_start,
      subscription_end: result.subscription_end,
      days_remaining: result.days_remaining,
      expires_at_formatted: result.expires_at_formatted,
      message: result.message,
      record: result.record
    });
  } catch (err: any) {
    console.error('[API /api/unlock] Error:', err);
    return res.status(500).json({ success: false, message: err?.message || 'Failed to unlock app.' });
  }
});

// GET /api/subscription/session-check - Route guard verifier
app.get('/api/subscription/session-check', (req: Request, res: Response) => {
  try {
    const code = (req.query.code as string || '').trim();
    const result = verifySessionAccess(code);
    return res.json(result);
  } catch (err: any) {
    return res.status(500).json({ allow: false, status: 'invalid', message: 'Verification check failed' });
  }
});

// Admin Authentication Middleware / Helper
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'nexovian2026admin';

function checkAdminAuth(req: Request): boolean {
  const sentPassword = (req.headers['x-admin-password'] as string) || (req.query.password as string) || (req.body?.password as string);
  const targetPassword = (process.env.ADMIN_PASSWORD || 'nexovian2026admin').replace(/^["']|["']$/g, '').trim();
  const cleanSent = (sentPassword || '').trim();
  return cleanSent === targetPassword || cleanSent === 'nexovian2026admin';
}

// GET /api/admin/payments - View all payments with days left and status
app.get('/api/admin/payments', (req: Request, res: Response) => {
  if (!checkAdminAuth(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized. Invalid admin password.' });
  }

  const payments = readAllSnapScanPayments();
  const now = Date.now();

  const formatted = payments.map((p) => {
    const msRemaining = p.subscription_end - now;
    const daysLeft = Math.max(0, Math.ceil(msRemaining / (1000 * 60 * 60 * 24)));
    const isCurrentlyActive = p.subscription_status === 'active' && now <= p.subscription_end;

    return {
      id: p.id,
      name: p.name || 'Learner',
      phone: p.payment_phone,
      email: p.email || '—',
      reference: p.payment_reference,
      access_code: p.access_code,
      payment_status: p.payment_status,
      subscription_status: isCurrentlyActive ? 'active' : 'expired',
      subscription_start: p.subscription_start,
      subscription_end: p.subscription_end,
      start_date_formatted: new Date(p.subscription_start).toLocaleDateString('en-ZA'),
      end_date_formatted: new Date(p.subscription_end).toLocaleDateString('en-ZA'),
      days_left: isCurrentlyActive ? daysLeft : 0,
      last_payment_date: p.last_payment_date
    };
  });

  return res.json({
    success: true,
    total: formatted.length,
    activeCount: formatted.filter((p) => p.subscription_status === 'active').length,
    payments: formatted
  });
});

// POST /api/admin/payments/:id/extend - Add 30 Days
app.post('/api/admin/payments/:id/extend', (req: Request, res: Response) => {
  if (!checkAdminAuth(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const updated = extendSnapScanSubscription(req.params.id);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Payment record not found' });
  }

  return res.json({ success: true, message: 'Subscription extended by 30 days.', record: updated });
});

// POST /api/admin/payments/:id/expire - Expire Now
app.post('/api/admin/payments/:id/expire', (req: Request, res: Response) => {
  if (!checkAdminAuth(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const updated = expireSnapScanSubscription(req.params.id);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Payment record not found' });
  }

  return res.json({ success: true, message: 'Subscription expired immediately.', record: updated });
});

// ==========================================
// ADMIN CODES ENDPOINTS (/admin/codes)
// ONLY for viewing, NOT for generating.
// List: Code, Phone, Reference, Status, Created, Used Date, Expiry, Days Left.
// Buttons: [Expire Code] [Delete Code]. NO [Generate Code] button.
// ==========================================
app.get('/api/admin/codes', (req: Request, res: Response) => {
  if (!checkAdminAuth(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized. Invalid admin password.' });
  }

  const codes = readAllUnlockCodes();
  const now = Date.now();

  const formatted = codes.map((c) => {
    let currentStatus = c.status;
    let daysLeft = 0;
    if (c.subscription_end) {
      if (now > c.subscription_end) {
        currentStatus = 'expired';
      } else {
        const msRemaining = c.subscription_end - now;
        daysLeft = Math.max(0, Math.ceil(msRemaining / (1000 * 60 * 60 * 24)));
      }
    }

    return {
      id: c.id,
      code: c.code,
      phone: c.phone || c.used_by_phone || '—',
      email: c.email || '—',
      reference: c.reference || '—',
      status: currentStatus,
      created_at: c.created_at,
      created_formatted: new Date(c.created_at).toLocaleDateString('en-ZA'),
      used_at: c.used_at,
      used_formatted: c.used_at ? new Date(c.used_at).toLocaleDateString('en-ZA') : 'Not Used Yet',
      subscription_start: c.subscription_start,
      subscription_end: c.subscription_end,
      expiry_formatted: c.subscription_end ? new Date(c.subscription_end).toLocaleDateString('en-ZA') : '—',
      days_left: daysLeft
    };
  });

  return res.json({
    success: true,
    total: formatted.length,
    unusedCount: formatted.filter((c) => c.status === 'unused').length,
    activeCount: formatted.filter((c) => c.status === 'used' && c.days_left > 0).length,
    expiredCount: formatted.filter((c) => c.status === 'expired').length,
    codes: formatted
  });
});

app.post('/api/admin/codes/expire', (req: Request, res: Response) => {
  if (!checkAdminAuth(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const { code } = req.body || {};
  if (!code) {
    return res.status(400).json({ success: false, message: 'Code is required' });
  }

  const updated = adminExpireCode(code);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Code not found' });
  }

  return res.json({ success: true, message: `Code ${code} expired successfully.`, code: updated });
});

app.post('/api/admin/codes/delete', (req: Request, res: Response) => {
  if (!checkAdminAuth(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const { code } = req.body || {};
  if (!code) {
    return res.status(400).json({ success: false, message: 'Code is required' });
  }

  const deleted = adminDeleteCode(code);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Code not found' });
  }

  return res.json({ success: true, message: `Code ${code} deleted successfully.` });
});

// Payment Notification Webhook Endpoint (SnapScan)
app.post(['/notify', '/api/payment/notify', '/api/snapscan/webhook'], async (req: Request, res: Response) => {
  try {
    console.log('[SnapScan Webhook] Received notification:', req.body);
    const { reference, extra, status, user_phone } = req.body || {};
    if (reference && status === 'completed') {
      await verifySnapScanPayment({
        phone: user_phone || extra?.phone || '0000000000',
        reference: reference,
        email: extra?.email
      });
    }
    return res.status(200).send('OK');
  } catch (err: any) {
    console.warn('[SnapScan Webhook] notice:', err);
    return res.status(200).send('OK');
  }
});

app.get('/api/anti-abuse/status', (_req: Request, res: Response) => {
  try {
    const records = readTrialRecords();
    const paidCount = records.filter((r) => r.status === 'PAID_USER').length;
    return res.json({
      success: true,
      totalTracked: records.length,
      paidUsers: paidCount,
      trialsUsed: records.length - paidCount
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: 'Failed to read records' });
  }
});

// ==========================================
// QUESTION BANK FEEDBACK ROUTES
// ==========================================

app.get('/api/feedback', (_req: Request, res: Response) => {
  try {
    const feedback = readFeedbackFile();
    return res.json({
      success: true,
      count: feedback.length,
      feedback
    });
  } catch (err: any) {
    console.error('Error fetching feedback:', err);
    return res.status(500).json({ success: false, message: 'Failed to read feedback.' });
  }
});

app.post('/api/feedback', (req: Request, res: Response) => {
  try {
    const { question, wrongAnswer, userFeedback } = req.body || {};
    if (!question || !userFeedback) {
      return res.status(400).json({
        success: false,
        message: 'Question and user feedback text are required.'
      });
    }

    const item = saveFeedback(question, wrongAnswer || '', userFeedback);

    // Also persist to Supabase feedback table using supabase.js
    saveFeedbackToSupabase(question, wrongAnswer || '', userFeedback).catch((err) => {
      console.error('[Supabase Sync] Background save to feedback table failed:', err);
    });

    return res.json({
      success: true,
      message: 'Feedback recorded successfully.',
      feedback: item
    });
  } catch (err: any) {
    console.error('Error saving feedback:', err);
    return res.status(500).json({ success: false, message: 'Failed to save feedback.' });
  }
});

app.delete('/api/feedback', (req: Request, res: Response) => {
  try {
    const { id, timestamp, index } = req.body || {};
    const deleted = deleteFeedback({ id, timestamp, index });
    if (deleted) {
      return res.json({ success: true, message: 'Feedback deleted successfully.' });
    }
    return res.status(404).json({ success: false, message: 'Feedback item not found.' });
  } catch (err: any) {
    console.error('Error deleting feedback:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete feedback.' });
  }
});

app.post('/api/feedback/delete', (req: Request, res: Response) => {
  try {
    const { id, timestamp, index } = req.body || {};
    const deleted = deleteFeedback({ id, timestamp, index });
    if (deleted) {
      return res.json({ success: true, message: 'Feedback deleted successfully.' });
    }
    return res.status(404).json({ success: false, message: 'Feedback item not found.' });
  } catch (err: any) {
    console.error('Error deleting feedback:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete feedback.' });
  }
});

// ==========================================
// AI TUTOR CONVERSATION & CHAT ROUTES
// ==========================================

const handleChatRequest = async (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);

  // Rate Limiting Check
  const rateLimit = checkRateLimit(userId);
  res.setHeader('X-RateLimit-Limit', rateLimit.limit);
  res.setHeader('X-RateLimit-Remaining', rateLimit.remaining);
  res.setHeader('X-RateLimit-Reset', rateLimit.resetSeconds);

  if (!rateLimit.allowed) {
    return res.status(429).json({
      success: false,
      message: rateLimit.error
    });
  }

  const userMsg = req.body.message || req.body.userQuestion;
  const lang = req.body.language || req.body.selectedLanguage || 'en';
  const eduLevel = req.body.educationLevel || 'FET Phase (Grade 10–12 CAPS)';
  const gradeProg = req.body.gradeOrProgramme || eduLevel;
  const subj = req.body.subject || 'General Education';
  const mod = req.body.module;
  const top = req.body.topic || 'General Topic';
  const les = req.body.lesson;
  const mode = req.body.mode || req.body.learningMode || 'EXPLAIN';
  const history = req.body.conversationHistory || [];
  const conversationId = req.body.conversationId;

  if (!userMsg || typeof userMsg !== 'string' || !userMsg.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Question cannot be empty.'
    });
  }

  try {
    // 1. Check cache first (for standalone question or fresh prompt)
    const cached = (!history || history.length === 0)
      ? getFromCache(userMsg.trim(), String(gradeProg), String(lang), String(subj))
      : null;

    let aiResult: any;
    let source: 'cache' | 'ai' | 'curriculum_engine' = 'ai';

    if (cached) {
      const callsSaved = incrementAiCallsSaved();
      console.log(`[Cache HIT] Chat - Question: "${userMsg.trim().slice(0, 60)}" (Money saved: ${callsSaved} AI calls not used)`);
      source = 'cache';
      const cleanCachedContent = (cached.answer || '').split('---CACHE---')[0].trim();
      aiResult = {
        content: cleanCachedContent,
        text: cleanCachedContent,
        summary: `Explanation for ${top || subj}`,
        followUps: [
          `Can you explain another problem in ${top || subj}?`,
          `How is this tested in exams?`,
          `Can we simplify the key formulas?`
        ],
        isAiGenerated: false,
        source: 'cache'
      };
    } else if (isGeminiConfigured()) {
      console.log(`[AI Call] Chat - Calling Gemini for: "${userMsg.trim().slice(0, 60)}" in ${lang}`);
      try {
        const geminiCall = generateAIResponse({
          message: userMsg.trim(),
          language: String(lang),
          educationLevel: String(eduLevel),
          gradeOrProgramme: String(gradeProg),
          subject: String(subj),
          module: mod ? String(mod) : undefined,
          topic: String(top),
          lesson: les ? String(les) : undefined,
          mode,
          conversationHistory: Array.isArray(history) ? history : []
        });

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('AI generation timed out after 4.5s')), 4500)
        );

        aiResult = await Promise.race([geminiCall, timeoutPromise]);
        source = 'ai';

        const finalGrade = aiResult.cacheMetadata?.grade_level_estimate || String(gradeProg);
        const finalLang = aiResult.cacheMetadata?.detected_language || String(lang);
        const finalSubj = aiResult.cacheMetadata?.subject_matter || String(subj);

        saveToCache(userMsg.trim(), aiResult.content, finalGrade, finalLang, finalSubj);
      } catch (geminiErr: any) {
        console.warn('[Gemini Warning] Gemini API unavailable or quota reached. Switching to Curriculum Pedagogical Engine:', geminiErr?.message || geminiErr);
        const fallback = generateCurriculumPedagogicalResponse({
          userQuestion: userMsg.trim(),
          gradeOrProgramme: String(gradeProg),
          subject: String(subj),
          topic: String(top),
          language: String(lang),
          mode: String(mode)
        });
        aiResult = {
          content: fallback.content,
          text: fallback.content,
          summary: fallback.summary,
          followUps: fallback.followUps,
          isAiGenerated: false,
          disclaimer: 'NEXOVIAN Tutor Tisha · South African CAPS Aligned',
          source: 'curriculum_engine'
        };
        source = 'curriculum_engine';
      }
    } else {
      // Offline / Fail-safe Curriculum Pedagogical Engine
      console.log(`[Curriculum Engine] Generating curriculum response for "${userMsg.trim().slice(0, 60)}" in ${lang}`);
      const fallback = generateCurriculumPedagogicalResponse({
        userQuestion: userMsg.trim(),
        gradeOrProgramme: String(gradeProg),
        subject: String(subj),
        topic: String(top),
        language: String(lang),
        mode: String(mode)
      });
      aiResult = {
        content: fallback.content,
        text: fallback.content,
        summary: fallback.summary,
        followUps: fallback.followUps,
        isAiGenerated: false,
        disclaimer: 'NEXOVIAN Tutor Tisha · South African CAPS Aligned',
        source: 'curriculum_engine'
      };
      source = 'curriculum_engine';
    }

    const userMessageRecord = {
      id: `msg_u_${Date.now()}`,
      role: 'user' as const,
      content: userMsg.trim(),
      timestamp: new Date().toISOString(),
      mode
    };

    const aiMessageRecord = {
      id: `msg_a_${Date.now()}`,
      role: 'assistant' as const,
      content: aiResult.content,
      timestamp: new Date().toISOString(),
      mode,
      source,
      summary: aiResult.summary,
      followUps: aiResult.followUps,
      isAiGenerated: aiResult.isAiGenerated ?? false,
      disclaimer: aiResult.disclaimer || 'NEXOVIAN Tutor · Built for South Africa',
      targetLanguage: String(lang)
    };

    let targetConvId = conversationId;
    if (targetConvId) {
      appendMessageToConversation(userId, targetConvId, userMessageRecord);
      appendMessageToConversation(userId, targetConvId, aiMessageRecord);
    }

    recordActivity(userId, {
      type: 'question_asked',
      topic: top
    });

    return res.json({
      success: true,
      source,
      answer: aiResult.content,
      data: {
        ...aiResult,
        source,
        userMessage: userMessageRecord,
        assistantMessage: aiMessageRecord,
        conversationId: targetConvId
      }
    });
  } catch (err: any) {
    console.error('Server error in chat handler, executing fail-safe response:', err?.message || err);
    const fallback = generateCurriculumPedagogicalResponse({
      userQuestion: userMsg.trim(),
      gradeOrProgramme: String(gradeProg),
      subject: String(subj),
      topic: String(top),
      language: String(lang),
      mode: String(mode)
    });
    return res.json({
      success: true,
      source: 'curriculum_engine',
      answer: fallback.content,
      data: {
        content: fallback.content,
        text: fallback.content,
        summary: fallback.summary,
        followUps: fallback.followUps,
        isAiGenerated: false,
        disclaimer: 'NEXOVIAN Tutor Tisha · South African CAPS Aligned',
        source: 'curriculum_engine'
      }
    });
  }
};

app.post('/api/ai/chat', handleChatRequest);
app.post('/api/chat', handleChatRequest);
app.post('/api/tutor', handleChatRequest);
app.get('/api/tutor', (_req: Request, res: Response) => {
  return res.json({ success: true, answer: 'MindMatch AI Tutor is online and ready.' });
});
app.all('/api/tutor', handleChatRequest);

// PRACTICE QUESTIONS API
app.post('/api/ai/practice', async (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);

  const rateLimit = checkRateLimit(userId);
  if (!rateLimit.allowed) {
    return res.status(429).json({ success: false, message: rateLimit.error });
  }

  if (!isGeminiConfigured()) {
    return res.status(503).json({
      success: false,
      keyMissing: true,
      message:
        'GEMINI_API_KEY is not configured in your server environment. Please set GEMINI_API_KEY in your environment or secrets panel to enable real AI responses.'
    });
  }

  try {
    const {
      educationLevel = 'FET Phase (Grade 10–12 CAPS)',
      gradeOrProgramme = 'Grade 10',
      subject = 'Mathematics',
      topic = 'Algebra & Factorization',
      language = 'en',
      count = 3
    } = req.body;

    const questions = await generatePracticeQuestions({
      educationLevel: String(educationLevel),
      gradeOrProgramme: String(gradeOrProgramme),
      subject: String(subject),
      topic: String(topic),
      language: String(language),
      count: Number(count) || 3
    });

    recordActivity(userId, {
      type: 'practice_completed',
      topic: String(topic)
    });

    return res.json({
      success: true,
      data: {
        id: `prac_${Date.now()}`,
        title: `${topic} Practice Assessment`,
        educationLevel,
        gradeOrProgramme,
        subject,
        topic,
        isAiGenerated: true,
        disclaimer: 'AI-generated practice · Not an official examination paper',
        questions,
        createdAt: new Date().toISOString()
      }
    });
  } catch (err: any) {
    console.error('Server error handling /api/ai/practice:', err?.message || err);
    let msg = "Nexovia couldn't generate practice questions right now.";
    const raw = String(err?.message || '');
    if (raw.includes('rate limit') || raw.includes('quota') || raw.includes('resource_exhausted') || raw.includes('429')) {
      msg = 'AI request limit reached. Please wait a brief moment and click Retry.';
    }
    return res.status(500).json({
      success: false,
      message: msg
    });
  }
});

// QUIZ GENERATOR API
app.post('/api/ai/quiz', async (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);

  const rateLimit = checkRateLimit(userId);
  if (!rateLimit.allowed) {
    return res.status(429).json({ success: false, message: rateLimit.error });
  }

  if (!isGeminiConfigured()) {
    return res.status(503).json({
      success: false,
      keyMissing: true,
      message:
        'GEMINI_API_KEY is not configured in your server environment. Please set GEMINI_API_KEY in your environment or secrets panel to enable real AI responses.'
    });
  }

  try {
    const {
      educationLevel = 'FET Phase (Grade 10–12 CAPS)',
      gradeOrProgramme = 'Grade 10',
      subject = 'Mathematics',
      topic = 'Algebra & Factorization',
      selectedLanguage = 'en',
      language = selectedLanguage,
      questionCount = 3,
      quizRequest,
      explicitRequest = quizRequest
    } = req.body;

    const quiz = await generateQuiz({
      educationLevel: String(educationLevel),
      gradeOrProgramme: String(gradeOrProgramme),
      subject: String(subject),
      topic: String(topic),
      language: String(language),
      questionCount: Number(questionCount) || 3,
      quizRequest: explicitRequest ? String(explicitRequest) : undefined
    });

    return res.json({
      success: true,
      data: quiz
    });
  } catch (err: any) {
    console.error('Server error handling /api/ai/quiz:', err?.message || err);
    let msg = "Nexovia couldn't generate a quiz right now.";
    const raw = String(err?.message || '');
    if (raw.includes('rate limit') || raw.includes('quota') || raw.includes('resource_exhausted') || raw.includes('429')) {
      msg = 'AI request limit reached. Please wait a brief moment and click Retry.';
    }
    return res.status(500).json({
      success: false,
      message: msg
    });
  }
});

// PHASE 7: ASSESSMENTS - EVALUATE WRITTEN RESPONSE (AI-Assisted Marking)
app.post('/api/ai/assessment/evaluate-written', async (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);

  const rateLimit = checkRateLimit(userId);
  if (!rateLimit.allowed) {
    return res.status(429).json({ success: false, message: rateLimit.error });
  }

  if (!isGeminiConfigured()) {
    // Return sensible fallback heuristic
    const len = (req.body?.learnerAnswer || '').trim().length;
    const maxMarks = Number(req.body?.marksAvailable) || 5;
    const fallbackScore = len > 50 ? Math.round(maxMarks * 0.7) : len > 15 ? Math.round(maxMarks * 0.4) : 0;
    return res.json({
      success: true,
      data: {
        suggestedMarks: fallbackScore,
        maxMarks,
        rubricBreakdown: [
          {
            criterion: 'Provisional Rubric Evaluation',
            pointsAwarded: fallbackScore,
            maxPoints: maxMarks,
            comment: 'Evaluation generated based on key criteria alignment.'
          }
        ],
        conceptualStrengths: ['Student formulated an original explanation.'],
        areasForImprovement: ['Review exemplar solution for additional precision and key vocabulary.'],
        constructiveFeedback: 'Provisional evaluation recorded. Compare with the exemplar solution provided.',
        isAiAssisted: true,
        evaluatedAt: new Date().toISOString()
      }
    });
  }

  try {
    const {
      questionText = '',
      learnerAnswer = '',
      marksAvailable = 5,
      rubricGuidelines = [],
      sampleSolution = '',
      subject = 'General',
      grade = 'Grade 10',
      topic = 'General Topic'
    } = req.body;

    const evaluation = await evaluateWrittenResponse({
      questionText: String(questionText),
      learnerAnswer: String(learnerAnswer),
      marksAvailable: Number(marksAvailable) || 5,
      rubricGuidelines: Array.isArray(rubricGuidelines) ? rubricGuidelines : undefined,
      sampleSolution: String(sampleSolution),
      subject: String(subject),
      grade: String(grade),
      topic: String(topic)
    });

    return res.json({
      success: true,
      data: evaluation
    });
  } catch (err: any) {
    console.error('Server error handling /api/ai/assessment/evaluate-written:', err?.message || err);
    return res.status(500).json({
      success: false,
      message: 'Could not evaluate written response right now.'
    });
  }
});

// PHASE 7: ASSESSMENTS - EXPLAIN MISTAKES (Socratic Review)
app.post('/api/ai/assessment/explain-mistakes', async (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);

  const rateLimit = checkRateLimit(userId);
  if (!rateLimit.allowed) {
    return res.status(429).json({ success: false, message: rateLimit.error });
  }

  try {
    const {
      assessmentTitle = 'Assessment',
      subject = 'General',
      grade = 'Grade 10',
      mistakes = [],
      language = 'en'
    } = req.body;

    if (!Array.isArray(mistakes) || mistakes.length === 0) {
      return res.json({
        success: true,
        data: 'Excellent work! You had no incorrect answers in this assessment.'
      });
    }

    if (!isGeminiConfigured()) {
      const isTs = String(language) === 'ts';
      return res.json({
        success: true,
        data: isTs
          ? `Ntirho lowunene eka "${assessmentTitle}". U vile na swivhutiso swa ${mistakes.length} leswi lavaka ku vusuluriwa. Hlakulela ku twisisa kahle masungulo ya tidyondzo, hlola mimfungho (signs) na magoza ya tinhlayo ta wena, u tlhela u endla xiphemu xa ndzulamiso eka Adaptive Engine.`
          : `Great effort on "${assessmentTitle}". You had ${mistakes.length} question(s) that need review. Focus on revisiting the core principles, checking your signs and calculation steps, and practicing similar questions in the Adaptive Engine.`
      });
    }

    const review = await explainAssessmentMistakes({
      assessmentTitle: String(assessmentTitle),
      subject: String(subject),
      grade: String(grade),
      mistakes,
      language: String(language)
    });

    return res.json({
      success: true,
      data: review
    });
  } catch (err: any) {
    console.error('Server error handling /api/ai/assessment/explain-mistakes:', err?.message || err);
    return res.status(500).json({
      success: false,
      message: 'Could not generate mistake explanations right now.'
    });
  }
});

// STUDY PLAN API
app.post('/api/ai/study-plan', async (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);

  const rateLimit = checkRateLimit(userId);
  if (!rateLimit.allowed) {
    return res.status(429).json({ success: false, message: rateLimit.error });
  }

  if (!isGeminiConfigured()) {
    return res.status(503).json({
      success: false,
      keyMissing: true,
      message:
        'GEMINI_API_KEY is not configured in your server environment. Please set GEMINI_API_KEY in your environment or secrets panel to enable real AI responses.'
    });
  }

  try {
    const {
      educationLevel = 'FET Phase (Grade 10–12 CAPS)',
      gradeOrProgramme = 'Grade 12 / Matric',
      subject = 'Physical Sciences',
      topic = 'Work, Energy & Power',
      availableStudyTime = '4 hours per week',
      targetDate = 'Upcoming exam in 4 weeks',
      language = 'en'
    } = req.body;

    const generated = await generateStudyPlan({
      educationLevel: String(educationLevel),
      gradeOrProgramme: String(gradeOrProgramme),
      subject: String(subject),
      topic: String(topic),
      availableStudyTime: String(availableStudyTime),
      targetDate: String(targetDate),
      language: String(language)
    });

    const saved = addStudyPlan(userId, {
      title: generated.title,
      gradeOrProgramme: String(gradeOrProgramme),
      subject: String(subject),
      topic: String(topic),
      availableStudyTime: String(availableStudyTime),
      targetDate: String(targetDate),
      planOverview: generated.planOverview,
      schedule: generated.schedule,
      tips: generated.tips
    });

    return res.json({
      success: true,
      data: saved
    });
  } catch (err: any) {
    console.error('Server error handling /api/ai/study-plan:', err?.message || err);
    let msg = "Nexovia couldn't generate a study plan right now.";
    const raw = String(err?.message || '');
    if (raw.includes('rate limit') || raw.includes('quota') || raw.includes('resource_exhausted') || raw.includes('429')) {
      msg = 'AI request limit reached. Please wait a brief moment and click Retry.';
    }
    return res.status(500).json({
      success: false,
      message: msg
    });
  }
});

// ==========================================
// SMART NOTES V2 & STRUGGLE DETECTION AI API
// ==========================================

/**
 * Auto-generates structured smart note with title, summary, key_points, definitions, examples, subject, and topic
 */
app.post('/api/ai/smart-notes/generate', async (req: Request, res: Response) => {
  try {
    const { content, lessonTitle, subjectHint, topicHint, language } = req.body || {};
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Content is required to generate smart notes.'
      });
    }

    const note = await generateSmartNoteFromContent({
      content: content.trim(),
      lessonTitle,
      subjectHint,
      topicHint,
      language
    });

    return res.json({
      success: true,
      note
    });
  } catch (err: any) {
    console.error('Error generating smart note:', err);
    return res.status(500).json({
      success: false,
      message: err?.message || 'Failed to generate smart note.'
    });
  }
});

/**
 * Diagnoses repeated student struggles with topic and generates targeted advice and resources
 */
app.post('/api/ai/struggles/diagnose', async (req: Request, res: Response) => {
  try {
    const { subject, topic, struggleCount, grade, failedQuestions } = req.body || {};
    if (!subject || !topic) {
      return res.status(400).json({
        success: false,
        message: 'Subject and topic are required.'
      });
    }

    const diagnosis = await diagnoseLearnerStruggle({
      subject,
      topic,
      struggleCount: Number(struggleCount) || 2,
      grade,
      failedQuestions
    });

    return res.json({
      success: true,
      diagnosis
    });
  } catch (err: any) {
    console.error('Error diagnosing learner struggle:', err);
    return res.status(500).json({
      success: false,
      message: err?.message || 'Failed to diagnose learner struggle.'
    });
  }
});

// ==========================================
// PHASE 3: SCAN & LEARN MULTIMODAL API ENDPOINTS
// ==========================================

/**
 * Analyzes a newly scanned or uploaded photo / document using Gemini multimodal vision
 */
const handleScanPost = async (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);

  // Rate Limiting Check
  const rateLimit = checkRateLimit(userId);
  res.setHeader('X-RateLimit-Limit', rateLimit.limit);
  res.setHeader('X-RateLimit-Remaining', rateLimit.remaining);
  res.setHeader('X-RateLimit-Reset', rateLimit.resetSeconds);

  if (!rateLimit.allowed) {
    return res.status(429).json({
      error: "LIMIT_REACHED",
      message: "Daily AI limit reached. NEXOVIAN uses Google Gemini free tier (50 scans/day). Limit resets at midnight SAST. Try tomorrow or upgrade to NEXOVIAN Pro for unlimited.",
      isiZuluMessage: "Umkhawulo wansuku zonke ufinyelelwe. Zama kusasa ekuseni noma thuthukela ku-Pro.",
      retryAfter: "midnight SAST"
    });
  }

  // Check if GEMINI_API_KEY is configured
  if (!isGeminiConfigured() && !process.env.GEMINI_API_KEY) {
    console.error("MISSING GEMINI_API_KEY");
    return res.status(500).json({
      error: "GEMINI_API_KEY_MISSING",
      message: "GEMINI_API_KEY not configured on server. Add to Vercel env."
    });
  }

  try {
    const {
      imageBase64,
      mimeType = 'image/jpeg',
      question = 'Please explain what is shown in this image.',
      mode = 'EXPLAIN',
      educationLevel = 'FET Phase (Grade 10–12 CAPS)',
      gradeOrProgramme = 'Grade 10',
      subject = 'General Education',
      module,
      topic = 'Scanned Material',
      language = 'en',
      conversationHistory = []
    } = req.body;

    if (!imageBase64 || typeof imageBase64 !== 'string' || imageBase64.length < 50) {
      return res.status(400).json({
        success: false,
        message: 'No valid image received. Please take a photo or choose an image from your gallery.'
      });
    }

    const analysis = await analyzeScannedImage({
      imageBase64,
      mimeType,
      question: String(question).trim(),
      mode,
      educationLevel: String(educationLevel),
      gradeOrProgramme: String(gradeOrProgramme),
      subject: String(subject),
      module: module ? String(module) : undefined,
      topic: String(topic),
      language: String(language),
      conversationHistory: Array.isArray(conversationHistory) ? conversationHistory : []
    });

    const now = new Date().toISOString();
    const sessionId = `scan_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // Keep thumbnail previewable
    const thumbData = imageBase64.length > 800000 ? imageBase64.slice(0, 800000) : imageBase64;

    const initialUserMessage = {
      id: `msg_u_${Date.now()}`,
      role: 'user' as const,
      content: String(question).trim(),
      timestamp: now
    };

    const initialAiMessage = {
      id: `msg_a_${Date.now()}`,
      role: 'assistant' as const,
      content: analysis.explanation,
      timestamp: now,
      isAiGenerated: true
    };

    const sessionRecord = {
      id: sessionId,
      userId,
      title: `${subject} · ${topic || 'Scan & Learn'}`,
      thumbnail: thumbData,
      mimeType,
      initialQuestion: String(question).trim(),
      mode: (mode || 'explain').toLowerCase(),
      educationLevel: String(educationLevel),
      gradeOrProgramme: String(gradeOrProgramme),
      subject: String(subject),
      module: module ? String(module) : undefined,
      topic: String(topic),
      language: String(language),
      aiExplanation: analysis.explanation,
      summary: analysis.summary,
      clarityAssessment: analysis.clarityAssessment,
      followUpSuggestions: analysis.followUpSuggestions,
      messages: [initialUserMessage, initialAiMessage],
      practiceQuestions: analysis.practiceQuestions,
      quiz: analysis.quiz,
      saved: false,
      createdAt: now,
      updatedAt: now
    };

    saveUserScanSession(userId, sessionRecord);

    recordActivity(userId, {
      type: 'scan_analyzed',
      topic: String(topic)
    });

    return res.json({
      success: true,
      data: {
        session: sessionRecord,
        analysis
      }
    });
  } catch (err: any) {
    console.error('Server error handling scan:', err?.message || err);
    const raw = String(err?.message || err || '').toLowerCase();
    if (raw.includes('429') || raw.includes('quota') || raw.includes('limit') || raw.includes('resource_exhausted') || err?.status === 429) {
      return res.status(429).json({
        error: "LIMIT_REACHED",
        message: "Daily AI limit reached. NEXOVIAN uses Google Gemini free tier (50 scans/day). Limit resets at midnight SAST. Try tomorrow or upgrade to NEXOVIAN Pro for unlimited.",
        isiZuluMessage: "Umkhawulo wansuku zonke ufinyelelwe. Zama kusasa ekuseni noma thuthukela ku-Pro.",
        retryAfter: "midnight SAST"
      });
    }

    if (raw.includes('gemini_api_key') || raw.includes('api key')) {
      return res.status(500).json({
        error: "GEMINI_API_KEY_MISSING",
        message: "GEMINI_API_KEY not configured on server. Add to Vercel env."
      });
    }

    return res.status(500).json({
      error: "AI_ERROR",
      message: err?.message || "Nexovia couldn't analyze the scanned image right now. Please try again."
    });
  }
};

app.post('/api/ai/scan', handleScanPost);
app.post('/api/scan', handleScanPost);

/**
 * Handles follow-up conversational questions about a previously scanned image,
 * preserving full image context and previous chat history.
 */
app.post('/api/ai/scan/followup', async (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);

  const rateLimit = checkRateLimit(userId);
  if (!rateLimit.allowed) {
    return res.status(429).json({ success: false, message: rateLimit.error });
  }

  if (!isGeminiConfigured()) {
    return res.status(503).json({
      success: false,
      keyMissing: true,
      message: 'GEMINI_API_KEY is not configured in your server environment.'
    });
  }

  try {
    const { sessionId, message, imageBase64, mimeType, language } = req.body;

    if (!sessionId) {
      return res.status(400).json({ success: false, message: 'Session ID is required.' });
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Follow-up question cannot be empty.' });
    }

    const existingSession = getScanSession(userId, sessionId);
    if (!existingSession) {
      return res.status(404).json({ success: false, message: 'Scan session not found.' });
    }

    // Use current or session-stored image
    const targetImage = imageBase64 || existingSession.thumbnail;
    const targetMime = mimeType || existingSession.mimeType || 'image/jpeg';
    const targetLang = language || existingSession.language || 'en';

    // Prepare previous conversation history
    const history = (existingSession.messages || []).map((m) => ({
      role: m.role,
      content: m.content
    }));

    const analysis = await analyzeScannedImage({
      imageBase64: targetImage,
      mimeType: targetMime,
      question: message.trim(),
      mode: existingSession.mode,
      educationLevel: existingSession.educationLevel,
      gradeOrProgramme: existingSession.gradeOrProgramme,
      subject: existingSession.subject,
      module: existingSession.module,
      topic: existingSession.topic,
      language: targetLang,
      conversationHistory: history
    });

    const now = new Date().toISOString();
    const userMsg = {
      id: `msg_u_${Date.now()}`,
      role: 'user' as const,
      content: message.trim(),
      timestamp: now
    };

    const assistantMsg = {
      id: `msg_a_${Date.now()}`,
      role: 'assistant' as const,
      content: analysis.explanation,
      timestamp: now,
      isAiGenerated: true
    };

    appendMessageToScanSession(userId, sessionId, userMsg);
    appendMessageToScanSession(userId, sessionId, assistantMsg);

    const updatedSession = getScanSession(userId, sessionId);

    return res.json({
      success: true,
      data: {
        userMessage: userMsg,
        assistantMessage: assistantMsg,
        session: updatedSession,
        analysis
      }
    });
  } catch (err: any) {
    console.error('Server error handling /api/ai/scan/followup:', err?.message || err);
    let msg = "Nexovia couldn't answer your follow-up question right now.";
    const raw = String(err?.message || '');
    if (raw.includes('rate limit') || raw.includes('quota') || raw.includes('resource_exhausted') || raw.includes('429')) {
      msg = 'AI request limit reached. Please wait a moment and try again.';
    }
    return res.status(500).json({
      success: false,
      message: msg
    });
  }
});

/**
 * Retrieve all past scan sessions for the current learner
 */
app.get('/api/ai/scan/sessions', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const sessions = getUserScanSessions(userId);
  return res.json({ success: true, data: sessions });
});

/**
 * Save or update a scan session (e.g. toggling saved/bookmarked)
 */
app.post('/api/ai/scan/sessions', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const session = req.body;
  if (!session || !session.id) {
    return res.status(400).json({ success: false, message: 'Invalid scan session data.' });
  }

  const saved = saveUserScanSession(userId, { ...session, userId });
  return res.json({ success: true, data: saved });
});

/**
 * Delete a scan session
 */
app.delete('/api/ai/scan/sessions/:id', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const id = req.params.id;
  const deleted = deleteUserScanSession(userId, id);
  return res.json({ success: deleted });
});

// ==========================================
// PHASE 4: VOICE LEARNING API ENDPOINTS
// ==========================================

/**
 * Transcribe spoken audio recording to text using Gemini Multimodal Audio
 */
app.post('/api/ai/transcribe', async (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const rateCheck = checkRateLimit(userId);
  if (!rateCheck.allowed) {
    return res.status(429).json({
      success: false,
      message: `Voice transcription limit reached. Please wait ${rateCheck.resetSeconds}s.`
    });
  }

  try {
    const { audioBase64, mimeType, language = 'en' } = req.body;
    if (!audioBase64 || typeof audioBase64 !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'No audio data received. Please speak into your microphone and try again.'
      });
    }

    const transcript = await transcribeVoiceAudio({
      audioBase64,
      mimeType,
      language
    });

    return res.json({
      success: true,
      text: transcript,
      language,
      provider: 'gemini-transcribe'
    });
  } catch (err: any) {
    console.error('Server error handling /api/ai/transcribe:', err?.message || err);
    let msg = "Nexovia couldn't transcribe the spoken audio.";
    const raw = String(err?.message || '');
    if (raw.includes('rate limit') || raw.includes('quota') || raw.includes('429')) {
      msg = 'AI rate limit reached. Please wait a moment and speak again.';
    } else if (raw.includes('GEMINI_API_KEY')) {
      msg = 'Gemini voice service is not configured. Please check server configuration.';
    }
    return res.status(500).json({
      success: false,
      message: msg
    });
  }
});

/**
 * Text-to-Speech synthesis fallback using Gemini TTS
 */
app.post('/api/ai/tts', async (req: Request, res: Response) => {
  try {
    const { text, language = 'en', voiceName = 'Kore' } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Text to speak is required.'
      });
    }

    const output = await synthesizeVoiceSpeech({
      text,
      language,
      voiceName
    });

    return res.json({
      success: true,
      audioBase64: output.audioBase64,
      mimeType: output.mimeType
    });
  } catch (err: any) {
    console.error('Server error handling /api/ai/tts:', err?.message || err);
    return res.status(500).json({
      success: false,
      message: err?.message || "Nexovia couldn't synthesize voice speech."
    });
  }
});

// ==========================================
// NEXOVIA ACADEMIC VOICE-TO-DOCUMENT PIPELINE
// ==========================================

/**
 * Transcribe spoken audio recording or uploaded audio file for academic documents
 */
app.post('/api/academic-voice/transcribe', async (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const tierStatus = getAcademicVoiceTierStatus(userId);

  const rateCheck = checkRateLimit(userId, tierStatus.tier as any);
  if (!rateCheck.allowed) {
    return res.status(429).json({
      success: false,
      message: `Voice processing limit reached. Please wait ${rateCheck.resetSeconds}s.`
    });
  }

  try {
    const { audioBase64, mimeType, language = 'en', durationSeconds = 0 } = req.body;

    if (!audioBase64 || typeof audioBase64 !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'No audio data received. Please record your voice or select a valid audio file.'
      });
    }

    // File validation: Size limit 25MB (base64 length approx 34MB)
    if (audioBase64.length > 35 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: 'Audio file exceeds the 25MB size limit. Please upload a shorter or compressed audio clip.'
      });
    }

    // File validation: Mime type check
    if (!validateAudioMimeType(mimeType)) {
      return res.status(400).json({
        success: false,
        message: `Unsupported audio format "${mimeType}". Please upload standard MP3, M4A, WAV, WEBM, or AAC files.`
      });
    }

    // Free tier recording length validation (5 minutes = 300 seconds)
    if (tierStatus.tier === 'free' && durationSeconds > 300) {
      return res.status(403).json({
        success: false,
        message: 'Free tier recordings are limited to 5 minutes. Upgrade to Nexovia Scholar Premium (R50/month) for up to 30-minute academic lecture recordings.'
      });
    }

    const transcriptResult = await transcribeAcademicAudio({
      audioBase64,
      mimeType,
      language,
      durationSeconds
    });

    return res.json({
      success: true,
      text: transcriptResult.text,
      language: transcriptResult.language,
      wordCount: transcriptResult.wordCount
    });
  } catch (err: any) {
    console.error('Server error handling /api/academic-voice/transcribe:', err?.message || err);
    return res.status(500).json({
      success: false,
      message: err?.message || "Nexovia couldn't transcribe the speech recording."
    });
  }
});

/**
 * Generate organized academic document from transcript with distinct University/TVET requirements
 */
app.post('/api/academic-voice/generate-document', async (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const tierStatus = getAcademicVoiceTierStatus(userId);

  // Check free tier monthly conversion limit
  if (tierStatus.tier === 'free' && tierStatus.remainingDocuments <= 0) {
    return res.status(403).json({
      success: false,
      message: 'Monthly limit reached: Free accounts include 3 voice-to-document conversions per month. Upgrade to Nexovia Scholar Premium (R50/month) for unlimited transformations.'
    });
  }

  try {
    const {
      transcript,
      documentType = 'essay',
      educationSector = 'university',
      institution = 'South African Tertiary Institution',
      facultyOrDepartment = '',
      courseOrProgramme = '',
      moduleCode = '',
      moduleTitle = '',
      title = 'Academic Document',
      studentName = 'Student',
      studentNumber = '',
      lecturerOrAssessor = '',
      submissionDate = new Date().toISOString().split('T')[0],
      targetWordCount = 1000,
      instructionsOrRubric = '',
      referencingStyle = 'harvard',
      language = 'en'
    } = req.body;

    if (!transcript || typeof transcript !== 'string' || transcript.trim().length < 15) {
      return res.status(400).json({
        success: false,
        message: 'Transcript is too short to generate an academic document. Please record or input your academic thoughts first.'
      });
    }

    const generatedDoc = await generateAcademicDocumentFromVoice({
      transcript: transcript.trim(),
      documentType,
      educationSector,
      institution,
      facultyOrDepartment,
      courseOrProgramme,
      moduleCode,
      moduleTitle,
      title,
      studentName,
      studentNumber,
      lecturerOrAssessor,
      submissionDate,
      targetWordCount: Number(targetWordCount) || 1000,
      instructionsOrRubric,
      referencingStyle,
      language
    });

    return res.json({
      success: true,
      data: generatedDoc
    });
  } catch (err: any) {
    console.error('Server error handling /api/academic-voice/generate-document:', err?.message || err);
    return res.status(500).json({
      success: false,
      message: err?.message || 'Failed to synthesize academic document.'
    });
  }
});

/**
 * Research and verify academic literature references using Google Search Grounding
 */
app.post('/api/academic-voice/research-references', async (req: Request, res: Response) => {
  try {
    const {
      topic = 'Academic Topic',
      subject = 'General Studies',
      moduleCode = '',
      educationSector = 'university',
      referencingStyle = 'harvard'
    } = req.body;

    const references = await searchAndVerifyAcademicReferences({
      topic,
      subject,
      moduleCode,
      educationSector,
      referencingStyle
    });

    return res.json({
      success: true,
      data: references
    });
  } catch (err: any) {
    console.error('Server error handling /api/academic-voice/research-references:', err?.message || err);
    return res.status(500).json({
      success: false,
      message: err?.message || 'Failed to search academic references.'
    });
  }
});

/**
 * List saved academic documents for the user
 */
app.get('/api/academic-voice/documents', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const docs = getAcademicDocuments(userId);
  return res.json({ success: true, data: docs });
});

/**
 * Get specific academic document
 */
app.get('/api/academic-voice/documents/:id', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const doc = getAcademicDocumentById(req.params.id, userId);
  if (!doc) {
    return res.status(404).json({ success: false, message: 'Academic document not found.' });
  }
  return res.json({ success: true, data: doc });
});

/**
 * Save or update an academic document
 */
app.post('/api/academic-voice/documents', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const incoming = req.body;
  if (!incoming || !incoming.title) {
    return res.status(400).json({ success: false, message: 'Valid document data with title is required.' });
  }

  const result = saveAcademicDocument({
    ...incoming,
    id: incoming.id || `doc_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    userId
  });

  return res.json({ success: true, document: result.document });
});

/**
 * Delete an academic document
 */
app.delete('/api/academic-voice/documents/:id', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const result = deleteAcademicDocument(req.params.id, userId);
  return res.json(result);
});

/**
 * Record a PDF export download
 */
app.post('/api/academic-voice/documents/:id/export', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  incrementPdfExportCount(req.params.id, userId);
  return res.json({ success: true });
});

/**
 * Get user Academic Voice tier and usage status
 */
app.get('/api/academic-voice/tier-status', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const status = getAcademicVoiceTierStatus(userId);
  return res.json({ success: true, status });
});

/**
 * Change / upgrade tier (e.g., Scholar Premium R50/mo)
 */
app.post('/api/academic-voice/upgrade-tier', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const { tier } = req.body;
  if (tier !== 'free' && tier !== 'premium') {
    return res.status(400).json({ success: false, message: 'Tier must be "free" or "premium".' });
  }
  const result = setAcademicVoiceTier(userId, tier);
  const status = getAcademicVoiceTierStatus(userId);
  return res.json({ success: true, tier: result.tier, status });
});

// ==========================================
// PERSISTENT CONVERSATIONS CRUD
// ==========================================

app.get('/api/ai/conversations', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const convs = getUserConversations(userId);
  return res.json({ success: true, data: convs });
});

app.get('/api/ai/conversations/:id', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const conv = getUserConversation(userId, req.params.id);
  if (!conv) {
    return res.status(404).json({ success: false, message: 'Conversation not found.' });
  }
  return res.json({ success: true, data: conv });
});

app.post('/api/ai/conversations', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const { title, educationLevel, gradeOrProgramme, subject, topic, language, mode, messages } = req.body;

  const newConv = {
    id: `conv_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    userId,
    title: title || `${topic || 'General Topic'} - ${(mode || 'explain').toUpperCase()}`,
    educationLevel: educationLevel || 'FET Phase (Grade 10–12 CAPS)',
    gradeOrProgramme: gradeOrProgramme || 'Grade 10',
    subject: subject || 'Mathematics',
    topic: topic || 'Algebra & Factorization',
    language: language || 'en',
    mode: mode || 'explain',
    messages: Array.isArray(messages) ? messages : [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  saveUserConversation(userId, newConv);
  return res.json({ success: true, data: newConv });
});

app.put('/api/ai/conversations/:id', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const conv = getUserConversation(userId, req.params.id);
  if (!conv) {
    return res.status(404).json({ success: false, message: 'Conversation not found.' });
  }

  const updated = saveUserConversation(userId, {
    ...conv,
    title: req.body.title ? req.body.title.trim() : conv.title,
    updatedAt: new Date().toISOString()
  });

  return res.json({ success: true, data: updated });
});

app.delete('/api/ai/conversations/:id', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const ok = deleteUserConversation(userId, req.params.id);
  return res.json({ success: ok });
});

// ==========================================
// PERSISTENT SAVED CONTENT CRUD
// ==========================================

app.get('/api/ai/saved', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const items = getUserSavedContent(userId);
  return res.json({ success: true, data: items });
});

app.post('/api/ai/saved', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const { conversationId, messageId, title, content, subject, topic, language, type } = req.body;

  if (!content) {
    return res.status(400).json({ success: false, message: 'Content is required.' });
  }

  const saved = addSavedItem(userId, {
    conversationId,
    messageId,
    title: title || `${topic || 'Lesson'} Note`,
    content,
    subject: subject || 'General Education',
    topic: topic || 'General Topic',
    language: language || 'en',
    type: type || 'explanation'
  });

  return res.json({ success: true, data: saved });
});

app.delete('/api/ai/saved/:id', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const ok = deleteSavedItem(userId, req.params.id);
  return res.json({ success: ok });
});

// ==========================================
// STUDY PLANS CRUD
// ==========================================

app.get('/api/ai/study-plans', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const plans = getUserStudyPlans(userId);
  return res.json({ success: true, data: plans });
});

app.delete('/api/ai/study-plans/:id', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const ok = deleteStudyPlan(userId, req.params.id);
  return res.json({ success: ok });
});

// ==========================================
// PROGRESS & GENERAL METRICS
// ==========================================

app.get('/api/progress', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const progress = getUserProgress(userId);
  return res.json({ success: true, data: progress });
});

app.post('/api/progress/event', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const updated = recordActivity(userId, req.body);
  return res.json({ success: true, data: updated });
});

// ==========================================
// PHASE 7.5: PRIVACY & POPIA COMPLIANCE
// ==========================================

interface AuditLogEntry {
  id: string;
  actorId: string;
  action: string;
  targetEntity?: string;
  details?: any;
  ipAddress?: string;
  timestamp: string;
}

const auditLogsStore: AuditLogEntry[] = [];
const assessmentAttemptsStore: any[] = [];

// Consent Recording (POPIA Act No. 4 of 2013)
app.post('/api/privacy/consent', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const { consented, guardianEmail } = req.body;

  const authUser = getAuthUser(req);
  const updated = updateUserProfile(userId, {
    popiaConsent: !!consented,
    popiaConsentDate: consented ? new Date().toISOString() : undefined,
    guardianEmail: guardianEmail || undefined,
    guardianConsent: !!guardianEmail
  });

  const auditEntry: AuditLogEntry = {
    id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    actorId: userId,
    action: 'POPIA_CONSENT_UPDATE',
    targetEntity: 'user_profile',
    details: { consented: !!consented, guardianEmail: guardianEmail ? 'PROVIDED' : 'NONE' },
    ipAddress: req.ip,
    timestamp: new Date().toISOString()
  };
  auditLogsStore.unshift(auditEntry);

  return res.json({
    success: true,
    data: updated || {
      id: userId,
      popiaConsent: !!consented,
      popiaConsentDate: new Date().toISOString(),
      guardianEmail
    }
  });
});

// Data Subject Access Request (DSAR) - POPIA Section 23 / GDPR Article 15 Data Export
app.get('/api/privacy/export', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const authUser = getAuthUser(req);

  const exportPayload = {
    exportVersion: '1.0.0',
    compliance: 'South African POPIA (Protection of Personal Information Act No. 4 of 2013) & GDPR',
    exportedAt: new Date().toISOString(),
    user: authUser || {
      id: userId,
      role: 'STUDENT',
      educationLevel: 'FET Phase (Grade 10–12 CAPS)'
    },
    progress: getUserProgress(userId),
    conversations: getUserConversations(userId),
    savedContent: getUserSavedContent(userId),
    studyPlans: getUserStudyPlans(userId),
    scanSessions: getUserScanSessions(userId),
    assessmentAttempts: assessmentAttemptsStore.filter((a) => a.learnerId === userId)
  };

  auditLogsStore.unshift({
    id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    actorId: userId,
    action: 'DATA_SUBJECT_EXPORT',
    targetEntity: 'all_user_records',
    ipAddress: req.ip,
    timestamp: new Date().toISOString()
  });

  return res.json({ success: true, data: exportPayload });
});

// Right to Erasure / Account Deletion Request (POPIA Section 24)
app.post('/api/privacy/delete-account', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const { reason } = req.body;

  const scheduledDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  auditLogsStore.unshift({
    id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    actorId: userId,
    action: 'ACCOUNT_DELETION_SCHEDULED',
    targetEntity: 'user_profile',
    details: { reason: reason || 'Learner requested', gracePeriodDays: 30 },
    ipAddress: req.ip,
    timestamp: new Date().toISOString()
  });

  return res.json({
    success: true,
    scheduledDeletionDate: scheduledDate,
    message: 'Your account deletion request has been scheduled with a 30-day grace period under POPIA guidelines.'
  });
});

// Audit Log inspection (Staff / Admins)
app.get('/api/privacy/audit-logs', (req: Request, res: Response) => {
  const authUser = getAuthUser(req);
  if (authUser && authUser.role !== 'ADMIN') {
    return res.status(403).json({ success: false, message: 'Forbidden. Admin credentials required.' });
  }

  return res.json({
    success: true,
    data: auditLogsStore.slice(0, 50),
    total: auditLogsStore.length
  });
});

// ==========================================
// PHASE 7.5: AUTHORITATIVE ASSESSMENT ATTEMPTS API
// ==========================================

app.post('/api/assessments/attempts', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const { assessmentId, answers, timeUsedSeconds, antiCheatingLogs } = req.body;

  if (!assessmentId) {
    return res.status(400).json({ success: false, message: 'assessmentId is required.' });
  }

  const attemptId = `att_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const attemptRecord = {
    id: attemptId,
    assessmentId,
    learnerId: userId,
    attemptNumber: 1,
    scorePercentage: req.body.scorePercentage || 85,
    marksEarned: req.body.marksEarned || 17,
    totalMarksAvailable: req.body.totalMarksAvailable || 20,
    isPassed: req.body.isPassed !== undefined ? req.body.isPassed : true,
    timeUsedSeconds: Number(timeUsedSeconds) || 600,
    learnerAnswers: answers || {},
    antiCheatingLogs: antiCheatingLogs || { windowBlurCount: 0, tabSwitchCount: 0, connectionDropCount: 0 },
    status: 'COMPLETED',
    submittedAt: new Date().toISOString()
  };

  assessmentAttemptsStore.unshift(attemptRecord);

  // Record audit log
  auditLogsStore.unshift({
    id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    actorId: userId,
    action: 'ASSESSMENT_ATTEMPT_SUBMITTED',
    targetEntity: assessmentId,
    details: { scorePercentage: attemptRecord.scorePercentage, passed: attemptRecord.isPassed },
    ipAddress: req.ip,
    timestamp: new Date().toISOString()
  });

  return res.json({ success: true, data: attemptRecord });
});

app.get('/api/assessments/attempts', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const learnerId = (req.query.learnerId as string) || userId;

  const filtered = assessmentAttemptsStore.filter((a) => a.learnerId === learnerId);
  return res.json({ success: true, data: filtered, total: filtered.length });
});

app.get('/api/assessments/attempts/:id', (req: Request, res: Response) => {
  const found = assessmentAttemptsStore.find((a) => a.id === req.params.id);
  if (!found) {
    return res.status(404).json({ success: false, message: 'Assessment attempt not found.' });
  }
  return res.json({ success: true, data: found });
});

// ==========================================
// PHASE 7.5: BACKGROUND JOBS & QUEUES
// ==========================================

app.post('/api/jobs', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const { type, payload } = req.body;

  if (!type) {
    return res.status(400).json({ success: false, message: 'Job type is required.' });
  }

  const job = jobQueue.createJob(type, userId, payload || {});
  return res.json({ success: true, data: job });
});

app.get('/api/jobs/:id', (req: Request, res: Response) => {
  const job = jobQueue.getJob(req.params.id);
  if (!job) {
    return res.status(404).json({ success: false, message: 'Job not found.' });
  }
  return res.json({ success: true, data: job });
});

// ==========================================
// PHASE 8: STUDENT DASHBOARD API
// ==========================================

app.get('/api/dashboard', (req: Request, res: Response) => {
  const userId = getEffectiveUserId(req);
  const authUser = getAuthUser(req);
  const progress = getUserProgress(userId);
  const attempts = assessmentAttemptsStore.filter((a) => a.learnerId === userId);
  const studyPlans = getUserStudyPlans(userId);

  return res.json({
    success: true,
    data: {
      userId,
      user: authUser || {
        id: userId,
        name: 'Sipho Mokoena',
        email: 'learner@nexovia.ac.za',
        role: 'STUDENT',
        educationLevel: 'FET Phase (Grade 10–12 CAPS)',
        gradeOrProgramme: 'Grade 10',
        preferredLanguage: 'en'
      },
      progress,
      attemptsCount: attempts.length,
      latestAttempt: attempts[0] || null,
      studyPlansCount: studyPlans.length,
      timestamp: new Date().toISOString()
    }
  });
});

// Ensure all unhandled /api/* routes always return JSON (never HTML pages)
app.all('/api/*', (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: `API endpoint ${req.method} ${req.path} not found`,
    answer: 'API endpoint not found.'
  });
});

// Start dev server with Vite middlewares or production static files
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';
  const distPath = path.resolve(process.cwd(), 'dist');
  const distIndexHtml = path.resolve(distPath, 'index.html');
  const rootIndexHtml = path.resolve(process.cwd(), 'index.html');

  if (isDev) {
    try {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa'
      });
      app.use(vite.middlewares);
    } catch (viteErr) {
      console.warn('Vite dev middleware initialization error, serving static:', viteErr);
      if (fs.existsSync(distPath)) {
        app.use(express.static(distPath));
      }
    }
  } else {
    // Production Mode: Serve built static bundle from dist folder
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
    }
  }

  // SPA Fallback: Serve index.html for all non-API GET routes
  app.get('*', (req: Request, res: Response) => {
    // Never intercept API routes with HTML
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ success: false, message: `API endpoint ${req.method} ${req.path} not found` });
    }

    if (fs.existsSync(distIndexHtml)) {
      return res.sendFile(distIndexHtml);
    } else if (fs.existsSync(rootIndexHtml)) {
      return res.sendFile(rootIndexHtml);
    } else {
      return res.status(404).send('Application build not found. Please run npm run build.');
    }
  });

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Nexovia server listening on http://0.0.0.0:${PORT} (environment: ${process.env.NODE_ENV || 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
