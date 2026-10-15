/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Server-Side Nexovia Language Engine (Xitsonga & Multilingual Architecture)
 * 
 * CORE RULES:
 * 1. Prioritize controlled, verified vocabulary.
 * 2. If a verified translation exists, use it exactly.
 * 3. If no verified translation exists, do NOT invent one.
 * 4. Keep the original English meaning available.
 * 5. Never silently replace a verified phrase with AI hallucinations.
 * 6. Admin authorization required for modifications.
 */

export type LanguageEntryStatus = 'verified' | 'needs_verification' | 'unverified';
export type AudioStatus = 'unavailable' | 'pending_verification' | 'verified';
export type PronunciationStatus = 'unavailable' | 'pending_verification' | 'verified';
export type VoiceSource = 'native_speaker' | 'ai_generated' | 'curriculum_specialist' | 'unspecified';

export interface ServerLanguageRecord {
  id: string;
  language: string;
  english: string;
  xitsonga: string;
  pronunciation: string;
  category: string;
  status: LanguageEntryStatus;
  source: string;
  example: string;
  notes: string;
  audioUrl?: string;
  audioStatus?: AudioStatus;
  pronunciationStatus?: PronunciationStatus;
  voiceSource?: VoiceSource;
  verifiedBy?: string;
  verifiedAt?: string;
  createdAt: string;
  updatedAt: string;
  version?: number;
}

export interface ServerLanguageAuditLog {
  id: string;
  phraseId: string;
  action: 'created' | 'updated' | 'verified' | 'marked_for_review' | 'audio_uploaded' | 'audio_verified' | 'audio_deleted';
  changedBy: string;
  previousData?: Partial<ServerLanguageRecord>;
  newData: Partial<ServerLanguageRecord>;
  timestamp: string;
  reason?: string;
}

export interface VerificationRequest {
  id: string;
  queryText: string;
  detectedLanguage: string;
  requestedBy: string;
  requestCount: number;
  status: 'pending_review' | 'verified' | 'rejected';
  firstRequestedAt: string;
  lastRequestedAt: string;
  notes?: string;
}

// 80 Native-Supplied Xitsonga Entries (Preserved Verbatim)
const INITIAL_ENTRIES: ServerLanguageRecord[] = [
  // SET 1 — BASIC LANGUAGE
  { id: 'ts_basic_001', language: 'xhitsonga', english: 'Hello', xitsonga: 'Ahee', pronunciation: '', category: 'basic', status: 'verified', source: 'native_user_verified', example: 'Ahee mudyondyi (Hello student)', notes: 'Standard greeting', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_basic_002', language: 'xhitsonga', english: 'Good morning', xitsonga: 'Rhi xile', pronunciation: '', category: 'basic', status: 'verified', source: 'native_user_verified', example: 'Rhi xile mundyondyisi', notes: 'Morning greeting', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_basic_003', language: 'xhitsonga', english: 'Thank you', xitsonga: 'Ndza khensa', pronunciation: '', category: 'basic', status: 'verified', source: 'native_user_verified', example: 'Ndza khensa swinene', notes: 'Gratitude expression', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_basic_004', language: 'xhitsonga', english: 'Please', xitsonga: 'Ndza kombela', pronunciation: '', category: 'basic', status: 'verified', source: 'native_user_verified', example: 'Ndza kombela mpfuno', notes: 'Polite request prefix', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_basic_005', language: 'xhitsonga', english: 'Come here', xitsonga: 'Tana lani', pronunciation: '', category: 'basic', status: 'verified', source: 'native_user_verified', example: 'Tana lani u dyondza', notes: 'Approach instruction', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_basic_006', language: 'xhitsonga', english: 'Go there', xitsonga: 'Famba laya', pronunciation: '', category: 'basic', status: 'verified', source: 'native_user_verified', example: 'Famba laya eka xikolo', notes: 'Proceed instruction', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_basic_007', language: 'xhitsonga', english: 'People', xitsonga: 'Munhu', pronunciation: '', category: 'basic', status: 'verified', source: 'native_user_verified', example: 'Munhu un’wana na un’wana', notes: 'Supplied native term', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_basic_008', language: 'xhitsonga', english: 'Teacher', xitsonga: 'Mundyondyisi', pronunciation: '', category: 'basic', status: 'verified', source: 'native_user_verified', example: 'Mundyondyisi wa mina', notes: 'Educator title', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_basic_009', language: 'xhitsonga', english: 'Student', xitsonga: 'Mudyondyi', pronunciation: '', category: 'basic', status: 'verified', source: 'native_user_verified', example: 'Mudyondyi u hlaya bhuku', notes: 'Learner title', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_basic_010', language: 'xhitsonga', english: 'School', xitsonga: 'Xikolo', pronunciation: '', category: 'basic', status: 'verified', source: 'native_user_verified', example: 'Xikolo xa Nexovia', notes: 'School institution', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },

  // SET 2 — CLASSROOM
  { id: 'ts_class_011', language: 'xhitsonga', english: 'Book', xitsonga: 'Bhuku', pronunciation: '', category: 'classroom', status: 'verified', source: 'native_user_verified', example: 'Hlaya bhuku leri', notes: 'Textbook / book', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_class_012', language: 'xhitsonga', english: 'Pen', xitsonga: 'Xitsalo', pronunciation: '', category: 'classroom', status: 'verified', source: 'native_user_verified', example: 'Teka xitsalo u tsala', notes: 'Writing pen', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_class_013', language: 'xhitsonga', english: 'Question', xitsonga: 'Xivhutiso', pronunciation: '', category: 'classroom', status: 'verified', source: 'native_user_verified', example: 'Hlaya xivhutiso lexi', notes: 'Inquiry', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_class_014', language: 'xhitsonga', english: 'Answer', xitsonga: 'Nhlamulo', pronunciation: '', category: 'classroom', status: 'verified', source: 'native_user_verified', example: 'Nhlamulo ya ntiyiso', notes: 'Response / solution', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_class_015', language: 'xhitsonga', english: 'Learn', xitsonga: 'Dyondza', pronunciation: '', category: 'classroom', status: 'verified', source: 'native_user_verified', example: 'Ahi dyondze swinwe', notes: 'To study', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_class_016', language: 'xhitsonga', english: 'Read', xitsonga: 'Hlaya', pronunciation: '', category: 'classroom', status: 'verified', source: 'native_user_verified', example: 'Hlaya mhaka leyi', notes: 'To read', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_class_017', language: 'xhitsonga', english: 'Write', xitsonga: 'Tsala', pronunciation: '', category: 'classroom', status: 'verified', source: 'native_user_verified', example: 'Tsala nhlamulo yawena', notes: 'To write', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_class_018', language: 'xhitsonga', english: 'Teacher, please explain', xitsonga: 'Mundyondisi, nikombela uhlamisela', pronunciation: '', category: 'classroom', status: 'verified', source: 'native_user_verified', example: 'Mundyondisi, nikombela uhlamisela xivhutiso lexi', notes: 'Learner request', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_class_019', language: 'xhitsonga', english: "I don't understand", xitsonga: 'Andzi Twisisi', pronunciation: '', category: 'classroom', status: 'verified', source: 'native_user_verified', example: 'Andzi Twisisi, kombela ku hlamisela', notes: 'Signaling difficulty', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_class_020', language: 'xhitsonga', english: 'I understand', xitsonga: 'Ndza Twisisa', pronunciation: '', category: 'classroom', status: 'verified', source: 'native_user_verified', example: 'Ndza Twisisa sweswi', notes: 'Comprehension confirmation', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },

  // SET 4 — LEARNING INSTRUCTIONS
  { id: 'ts_inst_021', language: 'xhitsonga', english: 'Listen', xitsonga: 'Yingisela', pronunciation: '', category: 'instructions', status: 'verified', source: 'native_user_verified', example: 'Yingisela mudyondyisi', notes: 'Listening instruction', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_inst_022', language: 'xhitsonga', english: 'Look', xitsonga: 'Langusa', pronunciation: '', category: 'instructions', status: 'verified', source: 'native_user_verified', example: 'Langusa xifaniso lexi', notes: 'Visual instruction', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_inst_023', language: 'xhitsonga', english: 'Try again', xitsonga: 'Phinda futhi', pronunciation: '', category: 'instructions', status: 'verified', source: 'native_user_verified', example: 'Phinda futhi u ta swi kuma', notes: 'Retrial encouragement', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_inst_024', language: 'xhitsonga', english: 'Well done', xitsonga: 'Uzamile', pronunciation: '', category: 'instructions', status: 'verified', source: 'native_user_verified', example: 'Uzamile swinene!', notes: 'Commendation', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_inst_025', language: 'xhitsonga', english: 'Correct', xitsonga: '', pronunciation: '', category: 'instructions', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Native translation unverified / empty pending verification', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_inst_026', language: 'xhitsonga', english: 'Wrong', xitsonga: 'Ahiswona', pronunciation: '', category: 'instructions', status: 'verified', source: 'native_user_verified', example: 'Ahiswona, phinda futhi', notes: 'Correction signal', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_inst_027', language: 'xhitsonga', english: 'Choose', xitsonga: '', pronunciation: '', category: 'instructions', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Keep as current / do not change pending verification', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_inst_028', language: 'xhitsonga', english: 'Show me', xitsonga: 'Nikombi', pronunciation: '', category: 'instructions', status: 'verified', source: 'native_user_verified', example: 'Nikombi ntirho wa wena', notes: 'Demonstration prompt', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_inst_029', language: 'xhitsonga', english: 'What is this?', xitsonga: 'Iyini lexi', pronunciation: '', category: 'instructions', status: 'verified', source: 'native_user_verified', example: 'Iyini lexi u xi hlayaka?', notes: 'Inquiry', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_inst_030', language: 'xhitsonga', english: 'What does this mean?', xitsonga: 'Xihlamisela yini lexi', pronunciation: '', category: 'instructions', status: 'verified', source: 'native_user_verified', example: 'Xihlamisela yini lexi rito leri?', notes: 'Definition inquiry', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },

  // SET 5 — TUTOR CONVERSATION
  { id: 'ts_conv_031', language: 'xhitsonga', english: 'Are you ready?', xitsonga: 'Uti lungiserhini?', pronunciation: '', category: 'conversation', status: 'verified', source: 'native_user_verified', example: 'Uti lungiserhini ku sungula?', notes: 'Readiness check', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_conv_032', language: 'xhitsonga', english: "Let's start", xitsonga: 'Ahi sungule', pronunciation: '', category: 'conversation', status: 'verified', source: 'native_user_verified', example: 'Ahi sungule dyondzo', notes: 'Starting phrase', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_conv_033', language: 'xhitsonga', english: 'Do you understand?', xitsonga: 'Waswi twists?', pronunciation: '', category: 'conversation', status: 'verified', source: 'native_user_verified', example: 'Waswi twists leswi?', notes: 'Supplied conversational phrase', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_conv_034', language: 'xhitsonga', english: 'Do you have a question?', xitsonga: 'Unaxi vhutiso?', pronunciation: '', category: 'conversation', status: 'verified', source: 'native_user_verified', example: 'Unaxi vhutiso eka leswi?', notes: 'Prompt for questions', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_conv_035', language: 'xhitsonga', english: 'Ask me', xitsonga: 'Nivhutisi', pronunciation: '', category: 'conversation', status: 'verified', source: 'native_user_verified', example: 'Nivhutisi xin’wana na xin’wana', notes: 'Open invitation', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_conv_036', language: 'xhitsonga', english: "Don't worry", xitsonga: 'Unga chilling', pronunciation: '', category: 'conversation', status: 'verified', source: 'native_user_verified', example: 'Unga chilling, hi ta swi endla', notes: 'Colloquial reassuring phrase', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_conv_037', language: 'xhitsonga', english: "Let's try", xitsonga: 'Ahi Rhinghesi', pronunciation: '', category: 'conversation', status: 'verified', source: 'native_user_verified', example: 'Ahi Rhinghesi xivhutiso', notes: 'Collaborative attempt', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_conv_038', language: 'xhitsonga', english: 'Take your time', xitsonga: 'Teka nkarhi waweh', pronunciation: '', category: 'conversation', status: 'verified', source: 'native_user_verified', example: 'Teka nkarhi waweh u hleketa', notes: 'Patience encouragement', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_conv_039', language: 'xhitsonga', english: 'Excellent!', xitsonga: 'Swing Endlile', pronunciation: '', category: 'conversation', status: 'verified', source: 'native_user_verified', example: 'Swing Endlile!', notes: 'Exclamation of excellence', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_conv_040', language: 'xhitsonga', english: 'See you tomorrow', xitsonga: 'Ntak vhona mundzuku', pronunciation: '', category: 'conversation', status: 'verified', source: 'native_user_verified', example: 'Ntak vhona mundzuku eka dyondzo', notes: 'Farewell', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },

  // SET 6 — ENCOURAGEMENT
  { id: 'ts_enc_041', language: 'xhitsonga', english: 'You are doing well', xitsonga: 'Uyedla kahle swinene', pronunciation: '', category: 'encouragement', status: 'verified', source: 'native_user_verified', example: 'Uyedla kahle swinene namuntlha!', notes: 'Affirming progress', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_enc_042', language: 'xhitsonga', english: 'Keep going', xitsonga: 'Yana mahlweni ungayimi', pronunciation: '', category: 'encouragement', status: 'verified', source: 'native_user_verified', example: 'Yana mahlweni ungayimi', notes: 'Persistence', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_enc_043', language: 'xhitsonga', english: "Don't give up", xitsonga: 'Ungaheli marimba', pronunciation: '', category: 'encouragement', status: 'verified', source: 'native_user_verified', example: 'Ungaheli marimba', notes: 'Resilience', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_enc_044', language: 'xhitsonga', english: 'You can do it', xitsonga: 'Utaswi endla', pronunciation: '', category: 'encouragement', status: 'verified', source: 'native_user_verified', example: 'Utaswi endla, ndza tshemba', notes: 'Confidence booster', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_enc_045', language: 'xhitsonga', english: 'Try once more', xitsonga: 'Phinda futhi', pronunciation: '', category: 'encouragement', status: 'verified', source: 'native_user_verified', example: 'Phinda futhi', notes: 'Extra try', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_enc_046', language: 'xhitsonga', english: "That's correct", xitsonga: 'Uswikumile', pronunciation: '', category: 'encouragement', status: 'verified', source: 'native_user_verified', example: 'Uswikumile!', notes: 'Found the answer', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_enc_047', language: 'xhitsonga', english: 'Good answer', xitsonga: 'Ukume yoho answer', pronunciation: '', category: 'encouragement', status: 'verified', source: 'native_user_verified', example: 'Ukume yoho answer', notes: 'Supplied native blend phrase', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_enc_048', language: 'xhitsonga', english: "Let's solve it together", xitsonga: 'Ahiswi lunghisi swine', pronunciation: '', category: 'encouragement', status: 'verified', source: 'native_user_verified', example: 'Ahiswi lunghisi swine', notes: 'Joint effort', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_enc_049', language: 'xhitsonga', english: 'Think carefully', xitsonga: 'Hleketa kahle', pronunciation: '', category: 'encouragement', status: 'verified', source: 'native_user_verified', example: 'Hleketa kahle', notes: 'Thoughtfulness', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_enc_050', language: 'xhitsonga', english: 'You are improving', xitsonga: 'Uyendla swoh', pronunciation: '', category: 'encouragement', status: 'verified', source: 'native_user_verified', example: 'Uyendla swoh', notes: 'Progress affirmation', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },

  // SET 7 — MATHEMATICS
  { id: 'ts_math_051', language: 'xhitsonga', english: 'Number', xitsonga: 'Nambara', pronunciation: '', category: 'mathematics', status: 'verified', source: 'native_user_verified', example: 'Nambara ya vumbirhi', notes: 'Numeral', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_math_052', language: 'xhitsonga', english: 'Add', xitsonga: 'Yengetela', pronunciation: '', category: 'mathematics', status: 'verified', source: 'native_user_verified', example: 'Yengetela timbirhi', notes: 'Addition', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_math_053', language: 'xhitsonga', english: 'Subtract', xitsonga: 'Susa', pronunciation: '', category: 'mathematics', status: 'verified', source: 'native_user_verified', example: 'Susa yin’we', notes: 'Subtraction', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_math_054', language: 'xhitsonga', english: 'Multiply', xitsonga: 'Phinda', pronunciation: '', category: 'mathematics', status: 'verified', source: 'native_user_verified', example: 'Phinda nambara', notes: 'Multiplication', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_math_055', language: 'xhitsonga', english: 'Divide', xitsonga: '', pronunciation: '', category: 'mathematics', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Native translation unverified / empty pending verification', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_math_056', language: 'xhitsonga', english: 'Calculate', xitsonga: 'Vhala', pronunciation: '', category: 'mathematics', status: 'verified', source: 'native_user_verified', example: 'Vhala nhlamulo', notes: 'Calculate', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_math_057', language: 'xhitsonga', english: 'Answer', xitsonga: 'Nhlamulo', pronunciation: '', category: 'mathematics', status: 'verified', source: 'native_user_verified', example: 'Tsala nhlamulo', notes: 'Result', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_math_058', language: 'xhitsonga', english: 'Problem', xitsonga: 'Nkinga', pronunciation: '', category: 'mathematics', status: 'verified', source: 'native_user_verified', example: 'Nkinga ya tinhlayo', notes: 'Math problem', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_math_059', language: 'xhitsonga', english: 'Solution', xitsonga: '', pronunciation: '', category: 'mathematics', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Keep as current / do not change pending verification', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_math_060', language: 'xhitsonga', english: 'Show your working', xitsonga: 'Kombisa ntirhо wa wena', pronunciation: '', category: 'mathematics', status: 'verified', source: 'native_user_verified', example: 'Kombisa ntirhо wa wena', notes: 'Show calculation steps', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },

  // SET 8 — MATHEMATICS SENTENCES
  { id: 'ts_math_sent_061', language: 'xhitsonga', english: 'What is 2 + 2?', xitsonga: 'Imani nhlamula ya 2+2?', pronunciation: '', category: 'mathematics_sentences', status: 'verified', source: 'native_user_verified', example: 'Imani nhlamula ya 2+2?', notes: 'Arithmetic sentence', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_math_sent_062', language: 'xhitsonga', english: 'What is the answer?', xitsonga: 'Yiku yini nhlamulo?', pronunciation: '', category: 'mathematics_sentences', status: 'verified', source: 'native_user_verified', example: 'Yiku yini nhlamulo ya xivhutiso?', notes: 'Answer query', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_math_sent_063', language: 'xhitsonga', english: 'Calculate this', xitsonga: 'Bala leswi', pronunciation: '', category: 'mathematics_sentences', status: 'verified', source: 'native_user_verified', example: 'Bala leswi u kuma nhlamulo', notes: 'Calculation instruction', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_math_sent_064', language: 'xhitsonga', english: 'Read the question carefully', xitsonga: 'Hlaya xivhutiso Lexi kahle', pronunciation: '', category: 'mathematics_sentences', status: 'verified', source: 'native_user_verified', example: 'Hlaya xivhutiso Lexi kahle', notes: 'Reading instruction', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_math_sent_065', language: 'xhitsonga', english: 'Write your answer', xitsonga: 'Tsala nhlamulo yawena', pronunciation: '', category: 'mathematics_sentences', status: 'verified', source: 'native_user_verified', example: 'Tsala nhlamulo yawena', notes: 'Writing instruction', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_math_sent_066', language: 'xhitsonga', english: 'Show your working', xitsonga: 'Kombisa ntirhо wa wena', pronunciation: '', category: 'mathematics_sentences', status: 'verified', source: 'native_user_verified', example: 'Kombisa ntirhо wa wena', notes: 'Method display instruction', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_math_sent_067', language: 'xhitsonga', english: 'Try the question again', xitsonga: 'Zama xivhutisa lexi futhi', pronunciation: '', category: 'mathematics_sentences', status: 'verified', source: 'native_user_verified', example: 'Zama xivhutisa lexi futhi', notes: 'Retrial sentence', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_math_sent_068', language: 'xhitsonga', english: 'Which answer is correct?', xitsonga: 'Hi yini nhlamulo yakahle?', pronunciation: '', category: 'mathematics_sentences', status: 'verified', source: 'native_user_verified', example: 'Hi yini nhlamulo yakahle?', notes: 'Multiple choice query', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_math_sent_069', language: 'xhitsonga', english: "Let's solve this problem", xitsonga: 'Ahi lunghise nkinga leyi', pronunciation: '', category: 'mathematics_sentences', status: 'verified', source: 'native_user_verified', example: 'Ahi lunghise nkinga leyi', notes: 'Joint solving sentence', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_math_sent_070', language: 'xhitsonga', english: 'Well done, you got the correct answer!', xitsonga: 'Yeeh, ukume yoho nhlamulo', pronunciation: '', category: 'mathematics_sentences', status: 'verified', source: 'native_user_verified', example: 'Yeeh, ukume yoho nhlamulo!', notes: 'Success celebration', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },

  // SET 10 — AI TUTOR
  { id: 'ts_tutor_071', language: 'xhitsonga', english: 'How can I help you?', xitsonga: 'Ningaku pfuna hiyini?', pronunciation: '', category: 'tutor', status: 'verified', source: 'native_user_verified', example: 'Ningaku pfuna hiyini namuntlha?', notes: 'Opening greeting', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_tutor_072', language: 'xhitsonga', english: 'What do you want to learn?', xitsonga: 'Ulava kudyondya yini?', pronunciation: '', category: 'tutor', status: 'verified', source: 'native_user_verified', example: 'Ulava kudyondya yini?', notes: 'Topic query', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_tutor_073', language: 'xhitsonga', english: 'Which subject are you studying?', xitsonga: 'Ulava kuhlaya subject yini?', pronunciation: '', category: 'tutor', status: 'verified', source: 'native_user_verified', example: 'Ulava kuhlaya subject yini?', notes: 'Subject calibration', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_tutor_074', language: 'xhitsonga', english: 'Send me the question.', xitsonga: 'Nisendeli xi vhutiso', pronunciation: '', category: 'tutor', status: 'verified', source: 'native_user_verified', example: 'Nisendeli xi vhutiso', notes: 'Submission prompt', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_tutor_075', language: 'xhitsonga', english: 'Take a picture of the question.', xitsonga: 'Teka xi nepe xa xi vhutisa', pronunciation: '', category: 'tutor', status: 'verified', source: 'native_user_verified', example: 'Teka xi nepe xa xi vhutisa', notes: 'Camera scan prompt', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_tutor_076', language: 'xhitsonga', english: "I'll explain it step by step.", xitsonga: 'Ntak hlamisela hixi gava hixi gava', pronunciation: '', category: 'tutor', status: 'verified', source: 'native_user_verified', example: 'Ntak hlamisela hixi gava hixi gava', notes: 'Step-by-step guidance', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_tutor_077', language: 'xhitsonga', english: 'Here is the answer.', xitsonga: 'Hileyi nhlamulo yaweh', pronunciation: '', category: 'tutor', status: 'verified', source: 'native_user_verified', example: 'Hileyi nhlamulo yaweh', notes: 'Solution presentation', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_tutor_078', language: 'xhitsonga', english: 'Do you want another example?', xitsonga: 'Ulava xifaniso xinwani?', pronunciation: '', category: 'tutor', status: 'verified', source: 'native_user_verified', example: 'Ulava xifaniso xinwani?', notes: 'Follow-up offer', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_tutor_079', language: 'xhitsonga', english: "Let's practice together.", xitsonga: 'Ahiti lunghisele xikanweh', pronunciation: '', category: 'tutor', status: 'verified', source: 'native_user_verified', example: 'Ahiti lunghisele xikanweh', notes: 'Practice invitation', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },
  { id: 'ts_tutor_080', language: 'xhitsonga', english: 'Ask me anything.', xitsonga: 'Nihilism xinwani na xinwani', pronunciation: '', category: 'tutor', status: 'verified', source: 'native_user_verified', example: 'Nihilism xinwani na xinwani', notes: 'Supplied open invitation phrase', createdAt: '2026-10-06T00:00:00.000Z', updatedAt: '2026-10-06T00:00:00.000Z' },

  // SET 11 — EVERYDAY CONVERSATION (Entries 81–95)
  { id: 'ts_everyday_081', language: 'xhitsonga', english: 'How are you?', xitsonga: '', pronunciation: '', category: 'everyday_conversation', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_everyday_082', language: 'xhitsonga', english: 'I am fine', xitsonga: '', pronunciation: '', category: 'everyday_conversation', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_everyday_083', language: 'xhitsonga', english: 'Good afternoon', xitsonga: '', pronunciation: '', category: 'everyday_conversation', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_everyday_084', language: 'xhitsonga', english: 'Good evening', xitsonga: '', pronunciation: '', category: 'everyday_conversation', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_everyday_085', language: 'xhitsonga', english: 'Goodbye', xitsonga: '', pronunciation: '', category: 'everyday_conversation', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_everyday_086', language: 'xhitsonga', english: 'Have a good day', xitsonga: '', pronunciation: '', category: 'everyday_conversation', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_everyday_087', language: 'xhitsonga', english: 'What is your name?', xitsonga: '', pronunciation: '', category: 'everyday_conversation', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_everyday_088', language: 'xhitsonga', english: 'My name is', xitsonga: '', pronunciation: '', category: 'everyday_conversation', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_everyday_089', language: 'xhitsonga', english: 'Where are you going?', xitsonga: '', pronunciation: '', category: 'everyday_conversation', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_everyday_090', language: 'xhitsonga', english: 'I am going home', xitsonga: '', pronunciation: '', category: 'everyday_conversation', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_everyday_091', language: 'xhitsonga', english: 'Yes', xitsonga: '', pronunciation: '', category: 'everyday_conversation', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_everyday_092', language: 'xhitsonga', english: 'No', xitsonga: '', pronunciation: '', category: 'everyday_conversation', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_everyday_093', language: 'xhitsonga', english: 'Excuse me', xitsonga: '', pronunciation: '', category: 'everyday_conversation', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_everyday_094', language: 'xhitsonga', english: 'I am sorry', xitsonga: '', pronunciation: '', category: 'everyday_conversation', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_everyday_095', language: 'xhitsonga', english: 'Welcome', xitsonga: '', pronunciation: '', category: 'everyday_conversation', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },

  // SET 12 — UNDERSTANDING QUESTIONS (Entries 96–110)
  { id: 'ts_quest_096', language: 'xhitsonga', english: 'Who is this?', xitsonga: '', pronunciation: '', category: 'understanding_questions', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_quest_097', language: 'xhitsonga', english: 'Where is it?', xitsonga: '', pronunciation: '', category: 'understanding_questions', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_quest_098', language: 'xhitsonga', english: 'When does it start?', xitsonga: '', pronunciation: '', category: 'understanding_questions', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_quest_099', language: 'xhitsonga', english: 'Why is this happening?', xitsonga: '', pronunciation: '', category: 'understanding_questions', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_quest_100', language: 'xhitsonga', english: 'How does it work?', xitsonga: '', pronunciation: '', category: 'understanding_questions', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_quest_101', language: 'xhitsonga', english: 'Which one is right?', xitsonga: '', pronunciation: '', category: 'understanding_questions', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_quest_102', language: 'xhitsonga', english: 'Is this correct?', xitsonga: '', pronunciation: '', category: 'understanding_questions', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_quest_103', language: 'xhitsonga', english: 'Can you repeat?', xitsonga: '', pronunciation: '', category: 'understanding_questions', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_quest_104', language: 'xhitsonga', english: 'Can you speak slowly?', xitsonga: '', pronunciation: '', category: 'understanding_questions', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_quest_105', language: 'xhitsonga', english: 'What did you say?', xitsonga: '', pronunciation: '', category: 'understanding_questions', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_quest_106', language: 'xhitsonga', english: 'Do you know?', xitsonga: '', pronunciation: '', category: 'understanding_questions', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_quest_107', language: 'xhitsonga', english: 'I know', xitsonga: '', pronunciation: '', category: 'understanding_questions', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_quest_108', language: 'xhitsonga', english: 'I do not know', xitsonga: '', pronunciation: '', category: 'understanding_questions', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_quest_109', language: 'xhitsonga', english: 'What is next?', xitsonga: '', pronunciation: '', category: 'understanding_questions', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_quest_110', language: 'xhitsonga', english: 'Where is the mistake?', xitsonga: '', pronunciation: '', category: 'understanding_questions', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },

  // SET 13 — PROBLEM SOLVING (Entries 111–125)
  { id: 'ts_prob_111', language: 'xhitsonga', english: "Let's solve it step by step.", xitsonga: 'A hi swi tlhantlheni hi magoza.', pronunciation: '', category: 'problem_solving', status: 'verified', source: 'native_user_verified', example: 'A hi swi tlhantlheni hi magoza ku kuma nhlamulo.', notes: 'Verified native step-by-step problem solving instruction.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_prob_112', language: 'xhitsonga', english: 'First step', xitsonga: '', pronunciation: '', category: 'problem_solving', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_prob_113', language: 'xhitsonga', english: 'Second step', xitsonga: '', pronunciation: '', category: 'problem_solving', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_prob_114', language: 'xhitsonga', english: 'Final step', xitsonga: '', pronunciation: '', category: 'problem_solving', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_prob_115', language: 'xhitsonga', english: 'Check your answer', xitsonga: '', pronunciation: '', category: 'problem_solving', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_prob_116', language: 'xhitsonga', english: 'Find the value', xitsonga: '', pronunciation: '', category: 'problem_solving', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_prob_117', language: 'xhitsonga', english: 'Simplify the equation', xitsonga: '', pronunciation: '', category: 'problem_solving', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_prob_118', language: 'xhitsonga', english: 'Substitute the numbers', xitsonga: '', pronunciation: '', category: 'problem_solving', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_prob_119', language: 'xhitsonga', english: 'Draw a diagram', xitsonga: '', pronunciation: '', category: 'problem_solving', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_prob_120', language: 'xhitsonga', english: 'What is the formula?', xitsonga: '', pronunciation: '', category: 'problem_solving', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_prob_121', language: 'xhitsonga', english: 'Use this formula', xitsonga: '', pronunciation: '', category: 'problem_solving', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_prob_122', language: 'xhitsonga', english: 'Compare the two answers', xitsonga: '', pronunciation: '', category: 'problem_solving', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_prob_123', language: 'xhitsonga', english: 'Explain your reasoning', xitsonga: '', pronunciation: '', category: 'problem_solving', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_prob_124', language: 'xhitsonga', english: 'Is there another way?', xitsonga: '', pronunciation: '', category: 'problem_solving', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_prob_125', language: 'xhitsonga', english: 'We have solved it', xitsonga: '', pronunciation: '', category: 'problem_solving', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },

  // SET 14 — EXPLAINING CONCEPTS (Entries 126–140)
  { id: 'ts_expl_126', language: 'xhitsonga', english: 'What is the definition?', xitsonga: '', pronunciation: '', category: 'explaining_concepts', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_expl_127', language: 'xhitsonga', english: 'Give an example', xitsonga: '', pronunciation: '', category: 'explaining_concepts', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_expl_128', language: 'xhitsonga', english: 'In other words', xitsonga: '', pronunciation: '', category: 'explaining_concepts', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_expl_129', language: 'xhitsonga', english: 'For example', xitsonga: '', pronunciation: '', category: 'explaining_concepts', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_expl_130', language: 'xhitsonga', english: 'This means that', xitsonga: '', pronunciation: '', category: 'explaining_concepts', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_expl_131', language: 'xhitsonga', english: 'Remember this rule', xitsonga: '', pronunciation: '', category: 'explaining_concepts', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_expl_132', language: 'xhitsonga', english: 'Pay attention to this', xitsonga: '', pronunciation: '', category: 'explaining_concepts', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_expl_133', language: 'xhitsonga', english: 'This is important', xitsonga: '', pronunciation: '', category: 'explaining_concepts', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_expl_134', language: 'xhitsonga', english: 'Notice the difference', xitsonga: '', pronunciation: '', category: 'explaining_concepts', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_expl_135', language: 'xhitsonga', english: 'In summary', xitsonga: '', pronunciation: '', category: 'explaining_concepts', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_expl_136', language: 'xhitsonga', english: 'Main idea', xitsonga: '', pronunciation: '', category: 'explaining_concepts', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_expl_137', language: 'xhitsonga', english: 'Key concept', xitsonga: '', pronunciation: '', category: 'explaining_concepts', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_expl_138', language: 'xhitsonga', english: 'Conclusion', xitsonga: '', pronunciation: '', category: 'explaining_concepts', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_expl_139', language: 'xhitsonga', english: 'In the next lesson', xitsonga: '', pronunciation: '', category: 'explaining_concepts', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' },
  { id: 'ts_expl_140', language: 'xhitsonga', english: 'Well understood', xitsonga: '', pronunciation: '', category: 'explaining_concepts', status: 'needs_verification', source: 'pending_verification', example: '', notes: 'Pending native verification. Do not invent automated translation.', createdAt: '2026-10-07T00:00:00.000Z', updatedAt: '2026-10-07T00:00:00.000Z' }
];

class ServerLanguageEngine {
  private phrases: Map<string, ServerLanguageRecord> = new Map();
  private auditLogs: ServerLanguageAuditLog[] = [];
  private verificationRequests: Map<string, VerificationRequest> = new Map();

  constructor() {
    for (const entry of INITIAL_ENTRIES) {
      this.phrases.set(entry.id, { ...entry });
    }
  }

  private normalize(str: string): string {
    return (str || '')
      .toLowerCase()
      .trim()
      .replace(/[?!.,;:’'"“”]/g, '')
      .replace(/\s+/g, ' ');
  }

  public lookup(text: string, language: string = 'xhitsonga'): {
    found: boolean;
    entry?: ServerLanguageRecord;
    badge: 'VERIFIED XITSONGA' | 'NEEDS VERIFICATION' | 'AI-GENERATED / UNVERIFIED';
    xitsonga: string | null;
    english: string;
    requiresVerificationNotice: boolean;
  } {
    const clean = (text || '').trim();
    if (!clean) {
      return {
        found: false,
        badge: 'AI-GENERATED / UNVERIFIED',
        xitsonga: null,
        english: '',
        requiresVerificationNotice: true
      };
    }

    const norm = this.normalize(clean);

    // Exact English
    for (const record of this.phrases.values()) {
      if (record.english.toLowerCase() === clean.toLowerCase()) {
        const isVerified = record.status === 'verified' && Boolean(record.xitsonga);
        return {
          found: true,
          entry: record,
          badge: isVerified ? 'VERIFIED XITSONGA' : 'NEEDS VERIFICATION',
          xitsonga: isVerified ? record.xitsonga : null,
          english: record.english,
          requiresVerificationNotice: !isVerified
        };
      }
    }

    // Normalized English
    for (const record of this.phrases.values()) {
      if (this.normalize(record.english) === norm) {
        const isVerified = record.status === 'verified' && Boolean(record.xitsonga);
        return {
          found: true,
          entry: record,
          badge: isVerified ? 'VERIFIED XITSONGA' : 'NEEDS VERIFICATION',
          xitsonga: isVerified ? record.xitsonga : null,
          english: record.english,
          requiresVerificationNotice: !isVerified
        };
      }
    }

    // Exact or normalized Xitsonga reverse check
    for (const record of this.phrases.values()) {
      if (record.xitsonga && (record.xitsonga.toLowerCase() === clean.toLowerCase() || this.normalize(record.xitsonga) === norm)) {
        return {
          found: true,
          entry: record,
          badge: 'VERIFIED XITSONGA',
          xitsonga: record.xitsonga,
          english: record.english,
          requiresVerificationNotice: false
        };
      }
    }

    // Unknown phrase -> DO NOT invent!
    return {
      found: false,
      badge: 'AI-GENERATED / UNVERIFIED',
      xitsonga: null,
      english: clean,
      requiresVerificationNotice: true
    };
  }

  public getAll(filter?: { category?: string; status?: LanguageEntryStatus; query?: string }): ServerLanguageRecord[] {
    let list = Array.from(this.phrases.values());
    if (filter?.category && filter.category !== 'all') {
      list = list.filter((p) => p.category.toLowerCase() === filter.category?.toLowerCase());
    }
    if (filter?.status && filter.status !== ('all' as any)) {
      list = list.filter((p) => p.status === filter.status);
    }
    if (filter?.query) {
      const q = this.normalize(filter.query);
      list = list.filter(
        (p) =>
          this.normalize(p.english).includes(q) ||
          this.normalize(p.xitsonga).includes(q) ||
          this.normalize(p.category).includes(q)
      );
    }
    return list.sort((a, b) => a.id.localeCompare(b.id));
  }

  public getById(id: string): ServerLanguageRecord | undefined {
    return this.phrases.get(id);
  }

  public getVerifiedVocabularyTable(): string {
    const verified = Array.from(this.phrases.values()).filter(
      (p) => p.status === 'verified' && Boolean(p.xitsonga)
    );
    const unverified = Array.from(this.phrases.values()).filter(
      (p) => p.status === 'needs_verification' || !p.xitsonga
    );

    const tableRows = verified
      .map((p) => {
        const pron = p.pronunciationStatus === 'verified' && p.pronunciation
          ? ` [VERIFIED PRONUNCIATION: ${p.pronunciation}]`
          : ' [PRONUNCIATION: NOT YET VERIFIED]';
        const aud = p.audioStatus === 'verified' ? ' [AUDIO: VERIFIED]' : ' [AUDIO: NOT AVAILABLE]';
        return `- "${p.english}" → "${p.xitsonga}" [VERIFIED TRANSLATION]${pron}${aud} (category: ${p.category})`;
      })
      .join('\n');

    const unverifiedRows = unverified
      .map((p) => `- "${p.english}" → [NEEDS VERIFICATION / DO NOT INVENT TRANSLATION]`)
      .join('\n');

    return `### NEXOVIA AUTHORITATIVE XITSONGA CONTROLLED VOCABULARY:
${tableRows}

### TERMS REQUIRING NATIVE VERIFICATION (DO NOT INVENT XITSONGA TRANSLATIONS):
${unverifiedRows}`;
  }

  public getStats() {
    const all = Array.from(this.phrases.values());
    const verified = all.filter((p) => p.status === 'verified' && Boolean(p.xitsonga));
    const needsVerification = all.filter((p) => p.status === 'needs_verification' || !p.xitsonga);
    const verifiedAudio = all.filter((p) => p.audioStatus === 'verified' && Boolean(p.audioUrl));
    const verifiedPronunciation = all.filter((p) => p.pronunciationStatus === 'verified' && Boolean(p.pronunciation));
    const categories = Array.from(new Set(all.map((p) => p.category)));

    return {
      language: 'Xitsonga (Xitsonga / XiTsonga)',
      totalPhrases: all.length,
      verifiedCount: verified.length,
      needsVerificationCount: needsVerification.length,
      verifiedAudioCount: verifiedAudio.length,
      verifiedPronunciationCount: verifiedPronunciation.length,
      categoriesCount: categories.length,
      categories,
      nativeSource: 'native_user_verified',
      antiHallucinationEnforced: true,
      lastUpdated: new Date().toISOString()
    };
  }

  public adminUpdateAudio(
    id: string,
    audioData: {
      audioUrl: string;
      audioStatus: AudioStatus;
      voiceSource?: VoiceSource;
    },
    userContext: { role?: string; email?: string }
  ): { success: boolean; data?: ServerLanguageRecord; error?: string } {
    const role = (userContext.role || '').toUpperCase();
    if (role !== 'ADMIN' && role !== 'SUPER_ADMIN' && role !== 'CURRICULUM_ADMIN') {
      return { success: false, error: 'Unauthorized: Administrative role required to upload or update audio recordings.' };
    }

    const existing = this.phrases.get(id);
    if (!existing) {
      return { success: false, error: 'Phrase not found.' };
    }

    // STRICT PHASE 2 RULE: AI-generated speech must NEVER automatically receive audioStatus = "verified"
    let safeAudioStatus: AudioStatus = audioData.audioStatus;
    if (audioData.voiceSource === 'ai_generated' && safeAudioStatus === 'verified') {
      safeAudioStatus = 'pending_verification';
    }

    const updated: ServerLanguageRecord = {
      ...existing,
      audioUrl: audioData.audioUrl,
      audioStatus: safeAudioStatus,
      voiceSource: audioData.voiceSource || 'native_speaker',
      verifiedBy: safeAudioStatus === 'verified' ? userContext.email || 'Curriculum Administrator' : existing.verifiedBy,
      verifiedAt: safeAudioStatus === 'verified' ? new Date().toISOString() : existing.verifiedAt,
      version: (existing.version || 1) + 1,
      updatedAt: new Date().toISOString()
    };

    this.phrases.set(id, updated);
    this.auditLogs.unshift({
      id: `audit_${Date.now()}`,
      phraseId: id,
      action: safeAudioStatus === 'verified' ? 'audio_verified' : 'audio_uploaded',
      changedBy: userContext.email || 'Administrator',
      previousData: existing,
      newData: {
        audioUrl: updated.audioUrl,
        audioStatus: updated.audioStatus,
        voiceSource: updated.voiceSource
      },
      reason: safeAudioStatus === 'verified' ? 'Audio verified by administrator' : 'Audio uploaded for review',
      timestamp: new Date().toISOString()
    });

    return { success: true, data: updated };
  }

  public adminDeleteAudio(
    id: string,
    userContext: { role?: string; email?: string }
  ): { success: boolean; data?: ServerLanguageRecord; error?: string } {
    const role = (userContext.role || '').toUpperCase();
    if (role !== 'ADMIN' && role !== 'SUPER_ADMIN' && role !== 'CURRICULUM_ADMIN') {
      return { success: false, error: 'Unauthorized: Administrative role required to delete audio recordings.' };
    }

    const existing = this.phrases.get(id);
    if (!existing) {
      return { success: false, error: 'Phrase not found.' };
    }

    const updated: ServerLanguageRecord = {
      ...existing,
      audioUrl: undefined,
      audioStatus: 'unavailable',
      voiceSource: undefined,
      version: (existing.version || 1) + 1,
      updatedAt: new Date().toISOString()
    };

    this.phrases.set(id, updated);
    this.auditLogs.unshift({
      id: `audit_${Date.now()}`,
      phraseId: id,
      action: 'audio_deleted',
      changedBy: userContext.email || 'Administrator',
      previousData: existing,
      newData: { audioStatus: 'unavailable' },
      reason: 'Audio removed by administrator',
      timestamp: new Date().toISOString()
    });

    return { success: true, data: updated };
  }

  public adminUpdatePronunciation(
    id: string,
    data: {
      pronunciation: string;
      pronunciationStatus: PronunciationStatus;
    },
    userContext: { role?: string; email?: string }
  ): { success: boolean; data?: ServerLanguageRecord; error?: string } {
    const role = (userContext.role || '').toUpperCase();
    if (role !== 'ADMIN' && role !== 'SUPER_ADMIN' && role !== 'CURRICULUM_ADMIN') {
      return { success: false, error: 'Unauthorized: Administrative role required to update pronunciation.' };
    }

    const existing = this.phrases.get(id);
    if (!existing) {
      return { success: false, error: 'Phrase not found.' };
    }

    const updated: ServerLanguageRecord = {
      ...existing,
      pronunciation: data.pronunciation.trim(),
      pronunciationStatus: data.pronunciationStatus,
      version: (existing.version || 1) + 1,
      updatedAt: new Date().toISOString()
    };

    this.phrases.set(id, updated);
    this.auditLogs.unshift({
      id: `audit_${Date.now()}`,
      phraseId: id,
      action: data.pronunciationStatus === 'verified' ? 'verified' : 'updated',
      changedBy: userContext.email || 'Administrator',
      previousData: existing,
      newData: {
        pronunciation: updated.pronunciation,
        pronunciationStatus: updated.pronunciationStatus
      },
      reason: 'Pronunciation updated by administrator',
      timestamp: new Date().toISOString()
    });

    return { success: true, data: updated };
  }

  public adminAdd(
    data: { english: string; xitsonga: string; pronunciation?: string; category: string; status: LanguageEntryStatus; source: string; example?: string; notes?: string },
    userContext: { role?: string; email?: string }
  ): { success: boolean; data?: ServerLanguageRecord; error?: string } {
    const role = (userContext.role || '').toUpperCase();
    if (role !== 'ADMIN' && role !== 'SUPER_ADMIN' && role !== 'CURRICULUM_ADMIN') {
      return { success: false, error: 'Unauthorized: Administrative role required to modify the verified language dataset.' };
    }

    if (!data.english || !data.english.trim()) {
      return { success: false, error: 'English phrase is required.' };
    }

    const id = `ts_custom_${Date.now()}`;
    const newRecord: ServerLanguageRecord = {
      id,
      language: 'xhitsonga',
      english: data.english.trim(),
      xitsonga: (data.xitsonga || '').trim(),
      pronunciation: (data.pronunciation || '').trim(),
      category: data.category || 'everyday',
      status: data.status,
      source: data.source || `admin_${userContext.email || 'verified'}`,
      example: (data.example || '').trim(),
      notes: (data.notes || '').trim(),
      verifiedBy: data.status === 'verified' ? userContext.email || 'Administrator' : undefined,
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.phrases.set(id, newRecord);
    this.auditLogs.unshift({
      id: `audit_${Date.now()}`,
      phraseId: id,
      action: 'created',
      changedBy: userContext.email || 'Administrator',
      newData: newRecord,
      timestamp: new Date().toISOString()
    });

    return { success: true, data: newRecord };
  }

  public adminUpdate(
    id: string,
    updates: Partial<ServerLanguageRecord>,
    userContext: { role?: string; email?: string }
  ): { success: boolean; data?: ServerLanguageRecord; error?: string } {
    const role = (userContext.role || '').toUpperCase();
    if (role !== 'ADMIN' && role !== 'SUPER_ADMIN' && role !== 'CURRICULUM_ADMIN') {
      return { success: false, error: 'Unauthorized: Administrative role required to modify the verified language dataset.' };
    }

    const existing = this.phrases.get(id);
    if (!existing) {
      return { success: false, error: 'Phrase not found.' };
    }

    const updated: ServerLanguageRecord = {
      ...existing,
      ...updates,
      id: existing.id,
      version: (existing.version || 1) + 1,
      updatedAt: new Date().toISOString()
    };

    if (updates.status === 'verified') {
      updated.verifiedBy = userContext.email || 'Administrator';
    }

    this.phrases.set(id, updated);
    this.auditLogs.unshift({
      id: `audit_${Date.now()}`,
      phraseId: id,
      action: updates.status === 'verified' ? 'verified' : 'updated',
      changedBy: userContext.email || 'Administrator',
      previousData: existing,
      newData: updates,
      timestamp: new Date().toISOString()
    });

    return { success: true, data: updated };
  }

  public getAuditHistory(phraseId?: string): ServerLanguageAuditLog[] {
    if (phraseId) {
      return this.auditLogs.filter((a) => a.phraseId === phraseId);
    }
    return [...this.auditLogs];
  }

  /**
   * getVerifiedTranslation:
   * Prioritizes controlled, verified Xitsonga vocabulary.
   * If a verified translation exists, returns it exactly as stored.
   * If no verified translation exists, DO NOT invent one -> returns "Translation not yet verified."
   */
  public getVerifiedTranslation(
    englishText: string,
    targetLanguage: string = 'xhitsonga'
  ): {
    translation: string;
    isVerified: boolean;
    status: LanguageEntryStatus;
    english: string;
    xitsonga: string | null;
    entry?: ServerLanguageRecord;
    message?: string;
  } {
    const lookupResult = this.lookup(englishText, targetLanguage);

    if (lookupResult.found && lookupResult.badge === 'VERIFIED XITSONGA' && lookupResult.xitsonga) {
      return {
        translation: lookupResult.xitsonga,
        isVerified: true,
        status: 'verified',
        english: lookupResult.english,
        xitsonga: lookupResult.xitsonga,
        entry: lookupResult.entry,
        message: 'Verified native translation retrieved successfully.'
      };
    }

    if (lookupResult.found && lookupResult.badge === 'NEEDS VERIFICATION') {
      return {
        translation: 'Translation not yet verified.',
        isVerified: false,
        status: 'needs_verification',
        english: lookupResult.english,
        xitsonga: null,
        entry: lookupResult.entry,
        message: 'This term is tracked in Nexovia but awaits native verification.'
      };
    }

    return {
      translation: 'Translation not yet verified.',
      isVerified: false,
      status: 'unverified',
      english: englishText,
      xitsonga: null,
      message: 'No verified translation exists in the controlled dictionary.'
    };
  }

  /**
   * ADMIN VERIFICATION PIPELINE (PHASE 3)
   * Tracks learner requests for unverified or missing translations.
   */
  public recordMissingTranslationRequest(queryText: string, userId: string = 'learner'): VerificationRequest {
    const clean = (queryText || '').trim();
    const key = this.normalize(clean);
    const existing = this.verificationRequests.get(key);
    if (existing) {
      existing.requestCount += 1;
      existing.lastRequestedAt = new Date().toISOString();
      return existing;
    }
    const newReq: VerificationRequest = {
      id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      queryText: clean,
      detectedLanguage: 'xhitsonga',
      requestedBy: userId,
      requestCount: 1,
      status: 'pending_review',
      firstRequestedAt: new Date().toISOString(),
      lastRequestedAt: new Date().toISOString(),
      notes: 'Learner requested translation via Nexovia AI Tutor'
    };
    this.verificationRequests.set(key, newReq);
    return newReq;
  }

  public getVerificationRequests(): VerificationRequest[] {
    return Array.from(this.verificationRequests.values())
      .sort((a, b) => b.requestCount - a.requestCount || b.lastRequestedAt.localeCompare(a.lastRequestedAt));
  }

  public adminApproveVerificationRequest(
    requestId: string,
    data: {
      english: string;
      xitsonga: string;
      pronunciation?: string;
      category?: string;
    },
    userContext: { role?: string; email?: string }
  ) {
    const role = (userContext.role || '').toUpperCase();
    if (role !== 'ADMIN' && role !== 'SUPER_ADMIN' && role !== 'CURRICULUM_ADMIN') {
      return { success: false, error: 'Unauthorized: Administrative role required to approve verification requests.' };
    }

    let targetReq: VerificationRequest | undefined;
    for (const req of this.verificationRequests.values()) {
      if (req.id === requestId) {
        targetReq = req;
        break;
      }
    }

    if (!targetReq) {
      return { success: false, error: 'Verification request not found.' };
    }

    const addResult = this.adminAdd(
      {
        english: data.english || targetReq.queryText,
        xitsonga: data.xitsonga,
        pronunciation: data.pronunciation || '',
        category: data.category || 'classroom',
        status: 'verified',
        source: 'native_user_verified',
        notes: `Verified from learner request (requested ${targetReq.requestCount} times)`
      },
      userContext
    );

    if (addResult.success) {
      targetReq.status = 'verified';
    }

    return addResult;
  }

  public adminRejectVerificationRequest(
    requestId: string,
    reason: string,
    userContext: { role?: string; email?: string }
  ) {
    const role = (userContext.role || '').toUpperCase();
    if (role !== 'ADMIN' && role !== 'SUPER_ADMIN' && role !== 'CURRICULUM_ADMIN') {
      return { success: false, error: 'Unauthorized: Administrative role required to reject verification requests.' };
    }

    for (const req of this.verificationRequests.values()) {
      if (req.id === requestId) {
        req.status = 'rejected';
        req.notes = reason || 'Rejected by curriculum administrator';
        return { success: true };
      }
    }

    return { success: false, error: 'Verification request not found.' };
  }

  /**
   * TUTOR LANGUAGE FLOW RESOLVER (PHASE 3)
   * Enforces: DATABASE FIRST — AI SECOND.
   * If a learner asks for a translation or phrase meaning:
   * 1. Search verified database first.
   * 2. If verified, return exact stored text.
   * 3. If missing, do NOT invent. Flag as needs_verification.
   * 4. If asked to invent, refuse safely.
   */
  public resolveTutorLanguageQuery(userMessage: string, targetLanguage: string = 'xhitsonga'): {
    isHandledDirectly: boolean;
    isTranslationQuery: boolean;
    isReverseLookup: boolean;
    isInventRequest: boolean;
    queryTerm: string;
    found: boolean;
    record?: ServerLanguageRecord;
    responseText?: string;
    source: 'verified_language_engine' | 'ai_generated';
    verificationStatus: 'verified' | 'unverified';
    requiresVerificationNotice?: boolean;
    hasVerifiedAudio?: boolean;
    audioUrl?: string;
    audioStatus?: AudioStatus;
  } {
    const raw = (userMessage || '').trim();
    if (!raw) {
      return {
        isHandledDirectly: false,
        isTranslationQuery: false,
        isReverseLookup: false,
        isInventRequest: false,
        queryTerm: '',
        found: false,
        source: 'ai_generated',
        verificationStatus: 'unverified'
      };
    }

    const lower = raw.toLowerCase();

    // Invariant check: Refuse to invent Xitsonga translations
    const isInventRequest =
      (lower.includes('invent') || lower.includes('make up') || lower.includes('guess a') || lower.includes('create a word') || lower.includes('invent a')) &&
      (lower.includes('tsonga') || lower.includes('translation') || lower.includes('language'));

    if (isInventRequest) {
      return {
        isHandledDirectly: true,
        isTranslationQuery: false,
        isReverseLookup: false,
        isInventRequest: true,
        queryTerm: raw,
        found: false,
        source: 'verified_language_engine',
        verificationStatus: 'unverified',
        requiresVerificationNotice: true,
        responseText: `Nexovia strictly enforces a controlled, native-speaker verified Xitsonga vocabulary.

**Language Engine Invariant:**
Our AI Tutor is prohibited from inventing, guessing, or synthesizing unverified Xitsonga translations. All authentic Xitsonga translations must be supplied and verified by native language specialists before they can be marked as verified.

If you have a term you'd like added, our curriculum administrators have been notified in the verification review queue. English educational explanations remain available!`
      };
    }

    // Pattern 1: English -> Xitsonga translation inquiry
    // e.g. "What is Good morning in Xitsonga?", "How do I say 'Thank you' in Xitsonga?", "Translate school to Xitsonga"
    const enToTsPatterns = [
      /(?:what\s+is|what's|how\s+do\s+you\s+say|how\s+to\s+say|translate|how\s+do\s+i\s+say)\s+["'“]?([^"'”\n?]+?)["'”]?\s+(?:in|to|into)\s+x?itsonga/i,
      /(?:x?itsonga\s+(?:word|translation|term)\s+for)\s+["'“]?([^"'”\n?]+?)["'”]?/i,
      /(?:how\s+do\s+i\s+say|how\s+to\s+say)\s+["'“]?([^"'”\n?]+?)["'”]?$/i,
      /^translate\s+["'“]?([^"'”\n?]+?)["'”]?$/i
    ];

    let extractedTerm = '';
    let isEnToTs = false;

    for (const pattern of enToTsPatterns) {
      const match = raw.match(pattern);
      if (match && match[1]) {
        extractedTerm = match[1].trim().replace(/[?.!,]+$/, '');
        isEnToTs = true;
        break;
      }
    }

    // Pattern 2: Xitsonga -> English reverse lookup inquiry
    // e.g. "What does Ndza khensa mean?", "What is the meaning of Rhi xile?", "Meaning of Bhuku"
    const tsToEnPatterns = [
      /(?:what\s+does|what\s+do)\s+["'“]?([^"'”\n?]+?)["'”]?\s+mean/i,
      /(?:meaning\s+of)\s+["'“]?([^"'”\n?]+?)["'”]?/i,
      /(?:what\s+is)\s+["'“]?([^"'”\n?]+?)["'”]?\s+(?:in\s+english)/i
    ];

    let isTsToEn = false;
    if (!isEnToTs) {
      for (const pattern of tsToEnPatterns) {
        const match = raw.match(pattern);
        if (match && match[1]) {
          extractedTerm = match[1].trim().replace(/[?.!,]+$/, '');
          isTsToEn = true;
          break;
        }
      }
    }

    // Direct match if query itself is a short isolated word/phrase
    if (!extractedTerm && raw.length < 50 && (raw.startsWith('"') || raw.startsWith("'") || raw.split(' ').length <= 4)) {
      const candidate = raw.replace(/["'“”]/g, '').trim();
      const directLookup = this.lookup(candidate);
      if (directLookup.found && directLookup.entry) {
        extractedTerm = candidate;
        if (directLookup.entry.xitsonga.toLowerCase() === candidate.toLowerCase()) {
          isTsToEn = true;
        } else {
          isEnToTs = true;
        }
      }
    }

    if (!extractedTerm) {
      return {
        isHandledDirectly: false,
        isTranslationQuery: false,
        isReverseLookup: false,
        isInventRequest: false,
        queryTerm: '',
        found: false,
        source: 'ai_generated',
        verificationStatus: 'unverified'
      };
    }

    // Search verified database
    const lookupResult = this.lookup(extractedTerm);

    if (lookupResult.found && lookupResult.entry && lookupResult.badge === 'VERIFIED XITSONGA' && lookupResult.xitsonga) {
      const record = lookupResult.entry;
      const hasAudio = record.audioStatus === 'verified' && Boolean(record.audioUrl);

      // Case A: English -> Xitsonga
      if (isEnToTs || (!isTsToEn && record.english.toLowerCase() === extractedTerm.toLowerCase())) {
        const pronLine = record.pronunciationStatus === 'verified' && record.pronunciation
          ? `\n\nPronunciation:\n\`${record.pronunciation}\``
          : '';
        const exLine = record.example ? `\n\n*Example:* "${record.example}"` : '';

        return {
          isHandledDirectly: true,
          isTranslationQuery: true,
          isReverseLookup: false,
          isInventRequest: false,
          queryTerm: extractedTerm,
          found: true,
          record,
          source: 'verified_language_engine',
          verificationStatus: 'verified',
          hasVerifiedAudio: hasAudio,
          audioUrl: record.audioUrl,
          audioStatus: record.audioStatus,
          responseText: `${record.english} in Xitsonga is:

${record.xitsonga}${pronLine}${exLine}

🔊 Listen`
        };
      }

      // Case B: Xitsonga -> English
      return {
        isHandledDirectly: true,
        isTranslationQuery: true,
        isReverseLookup: true,
        isInventRequest: false,
        queryTerm: extractedTerm,
        found: true,
        record,
        source: 'verified_language_engine',
        verificationStatus: 'verified',
        hasVerifiedAudio: hasAudio,
        audioUrl: record.audioUrl,
        audioStatus: record.audioStatus,
        responseText: `${record.xitsonga} means "${record.english}."
${record.example ? `\n*Example:* "${record.example}"\n` : ''}
🔊 Listen`
      };
    }

    // Case C: Missing / unverified phrase -> DO NOT invent!
    this.recordMissingTranslationRequest(extractedTerm);

    return {
      isHandledDirectly: true,
      isTranslationQuery: true,
      isReverseLookup: isTsToEn,
      isInventRequest: false,
      queryTerm: extractedTerm,
      found: false,
      source: 'verified_language_engine',
      verificationStatus: 'unverified',
      requiresVerificationNotice: true,
      responseText: `Nexovia does not yet have a verified Xitsonga translation for "${extractedTerm}".

English explanation available.`
    };
  }
}

export const serverLanguageEngine = new ServerLanguageEngine();

/**
 * Reusable server-side helper function:
 * getVerifiedTranslation(englishText, targetLanguage)
 */
export function getVerifiedTranslation(englishText: string, targetLanguage: string = 'xhitsonga') {
  return serverLanguageEngine.getVerifiedTranslation(englishText, targetLanguage);
}

