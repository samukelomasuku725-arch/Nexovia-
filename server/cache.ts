import fs from 'fs';
import path from 'path';

export interface CachedQuestionItem {
  id?: string;
  question: string;
  answer: string;
  grade?: string;
  language?: string;
  subject?: string;
  timestamp: number | string;
}

export interface CacheStore {
  totalAiCallsSaved: number;
  stats: {
    totalAiCallsSaved: number;
  };
  questions: CachedQuestionItem[];
}

const CACHE_FILE_PATH = path.resolve(process.cwd(), 'questionCache.json');

const STOP_WORDS = new Set([
  'what', 'is', 'the', 'a', 'an', 'and', 'or', 'in', 'of', 'to', 'for', 'with',
  'on', 'at', 'by', 'from', 'about', 'as', 'into', 'like', 'through', 'after',
  'over', 'between', 'out', 'against', 'during', 'without', 'before', 'under',
  'around', 'among', 'can', 'could', 'you', 'please', 'tell', 'me', 'explain',
  'how', 'why', 'who', 'which', 'when', 'where', 'do', 'does', 'did', 'are',
  'were', 'be', 'been', 'being', 'have', 'has', 'had', 'i', 'my', 'we', 'our',
  'help', 'understand', 'give', 'show', 'describe', 'define', 'solve', 'work',
  'key', 'concept', 'concepts'
]);

/**
 * Normalizes tokens and strips standard plural suffixes for accurate keyword matching.
 */
function cleanToken(token: string): string {
  let w = token.toLowerCase().trim();
  if (w.endsWith("'s")) {
    w = w.slice(0, -2);
  }
  if (w.endsWith('s') && !w.endsWith('ss') && w.length > 3) {
    w = w.slice(0, -1);
  }
  return w;
}

/**
 * Extracts distinct, meaningful keywords from a question string.
 */
export function extractKeywords(text: string): string[] {
  if (!text) return [];
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !STOP_WORDS.has(w))
    .map(cleanToken);

  return Array.from(new Set(words));
}

/**
 * Reads questionCache.json safely supporting both object envelopes and legacy arrays.
 */
export function readCacheFile(): { questions: CachedQuestionItem[]; totalAiCallsSaved: number } {
  try {
    if (!fs.existsSync(CACHE_FILE_PATH)) {
      const initial: CacheStore = {
        totalAiCallsSaved: 0,
        stats: { totalAiCallsSaved: 0 },
        questions: []
      };
      fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(initial, null, 2), 'utf8');
      return { questions: [], totalAiCallsSaved: 0 };
    }

    const raw = fs.readFileSync(CACHE_FILE_PATH, 'utf8');
    const parsed = JSON.parse(raw || '[]');

    if (Array.isArray(parsed)) {
      return {
        questions: parsed,
        totalAiCallsSaved: 0
      };
    }

    const total = parsed.totalAiCallsSaved ?? parsed.stats?.totalAiCallsSaved ?? 0;
    const questions = Array.isArray(parsed.questions) ? parsed.questions : [];

    return {
      questions,
      totalAiCallsSaved: typeof total === 'number' ? total : 0
    };
  } catch (err) {
    console.error('Error reading questionCache.json:', err);
    return { questions: [], totalAiCallsSaved: 0 };
  }
}

/**
 * Writes to questionCache.json maintaining stats counter and questions array.
 */
export function writeCacheFile(questions: CachedQuestionItem[], totalAiCallsSaved?: number): void {
  try {
    const current = readCacheFile();
    const callsSaved = totalAiCallsSaved !== undefined ? totalAiCallsSaved : current.totalAiCallsSaved;
    const payload: CacheStore = {
      totalAiCallsSaved: callsSaved,
      stats: {
        totalAiCallsSaved: callsSaved
      },
      questions
    };
    fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(payload, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing to questionCache.json:', err);
  }
}

/**
 * Increments totalAiCallsSaved by 1 and persists to questionCache.json.
 */
export function incrementAiCallsSaved(): number {
  try {
    const current = readCacheFile();
    const updated = (current.totalAiCallsSaved || 0) + 1;
    writeCacheFile(current.questions, updated);
    return updated;
  } catch (err) {
    console.error('Error incrementing totalAiCallsSaved:', err);
    return 0;
  }
}

/**
 * Returns current totalAiCallsSaved.
 */
export function getAiCallsSaved(): number {
  return readCacheFile().totalAiCallsSaved;
}

/**
 * Checks questionCache.json for an exact match OR a similar question with matching keywords.
 */
export function getFromCache(
  question: string,
  grade?: string,
  language?: string,
  subject?: string
): CachedQuestionItem | null {
  try {
    const { questions } = readCacheFile();
    if (!questions || questions.length === 0) return null;

    const qClean = question.trim().toLowerCase();
    const gClean = grade ? grade.trim().toLowerCase() : undefined;
    const lClean = language ? language.trim().toLowerCase() : undefined;
    const sClean = subject ? subject.trim().toLowerCase() : undefined;

    // 1. Exact match check first
    const exactMatch = questions.find((item) => {
      if (item.question.trim().toLowerCase() !== qClean) return false;
      if (lClean && item.language && item.language.trim().toLowerCase() !== lClean) return false;
      if (gClean && item.grade && item.grade.trim().toLowerCase() !== gClean) return false;
      if (sClean && item.subject && item.subject.trim().toLowerCase() !== sClean) return false;
      return true;
    });

    if (exactMatch) {
      return exactMatch;
    }

    // 2. Keyword similarity matching (cost saver)
    const queryKeywords = extractKeywords(question);
    if (queryKeywords.length === 0) {
      return null;
    }

    interface MatchCandidate {
      item: CachedQuestionItem;
      score: number;
      commonKeywords: string[];
    }

    const candidates: MatchCandidate[] = [];

    for (const item of questions) {
      // Language compatibility guard: don't match English query to IsiZulu or vice versa if specified
      if (lClean && item.language) {
        const itemLang = item.language.trim().toLowerCase();
        if (itemLang !== lClean) {
          continue;
        }
      }

      const itemKeywords = extractKeywords(item.question);
      if (itemKeywords.length === 0) continue;

      const common = queryKeywords.filter((k) => itemKeywords.includes(k));
      const matchCount = common.length;

      let isMatch = false;
      let score = 0;

      // Single keyword query: match if keyword is present
      if (queryKeywords.length === 1) {
        if (matchCount === 1) {
          isMatch = true;
          score = 1.0;
        }
      } else if (queryKeywords.length === 2) {
        // Two keywords: require both, or 1 if it's a long distinctive keyword (>= 6 chars)
        if (matchCount >= 2) {
          isMatch = true;
          score = 1.0;
        } else if (matchCount === 1 && common[0].length >= 6) {
          isMatch = true;
          score = 0.7;
        }
      } else {
        // 3+ keywords: require at least 2 common keywords and sufficient overlap ratio
        const overlap = matchCount / queryKeywords.length;
        if (matchCount >= 2 && overlap >= 0.35) {
          isMatch = true;
          score = overlap + matchCount * 0.2;
        } else if (matchCount >= 1 && common.some((k) => k.length >= 8)) {
          // Distinctive long keyword match like 'photosynthesis'
          isMatch = true;
          score = 0.6;
        }
      }

      if (isMatch) {
        // Relevance boosts for matching grade and subject
        if (gClean && item.grade && item.grade.trim().toLowerCase() === gClean) {
          score += 0.3;
        }
        if (sClean && item.subject && item.subject.trim().toLowerCase().includes(sClean)) {
          score += 0.3;
        }
        candidates.push({ item, score, commonKeywords: common });
      }
    }

    if (candidates.length > 0) {
      // Sort by highest similarity score
      candidates.sort((a, b) => b.score - a.score);
      const best = candidates[0];
      console.log(
        `[Cost Saver Match] Similar question found in cache: "${best.item.question}" for query: "${question}" (matched keywords: ${best.commonKeywords.join(', ')})`
      );
      return best.item;
    }

    return null;
  } catch (err) {
    console.error('Error reading from questionCache.json:', err);
    return null;
  }
}

function normalizeSubject(subject?: string, questionText?: string): string {
  if (subject) {
    const s = subject.trim().toLowerCase();
    if (s === 'maths' || s === 'mathematics' || s.includes('math') || s.includes('algebra') || s.includes('calc')) {
      return 'maths';
    }
    if (s === 'science' || s === 'sciences' || s.includes('physics') || s.includes('chem') || s.includes('bio') || s.includes('sci')) {
      return 'science';
    }
    return s;
  }
  const q = (questionText || '').toLowerCase();
  if (
    q.includes('ohm') ||
    q.includes('circuit') ||
    q.includes('voltage') ||
    q.includes('current') ||
    q.includes('matter') ||
    q.includes('atom') ||
    q.includes('cell') ||
    q.includes('photosynthesis') ||
    q.includes('force') ||
    q.includes('gravity') ||
    q.includes('energy')
  ) {
    return 'science';
  }
  return 'maths';
}

/**
 * Appends or updates a question and answer in questionCache.json with subject (maths/science) and timestamp (Date.now()).
 */
export function saveToCache(
  question: string,
  answer: string,
  grade?: string,
  language?: string,
  subject?: string
): void {
  try {
    const { questions, totalAiCallsSaved } = readCacheFile();
    const items = [...questions];

    const qClean = question.trim().toLowerCase();
    const gClean = grade ? grade.trim().toLowerCase() : undefined;
    const lClean = language ? language.trim().toLowerCase() : undefined;

    const existingIndex = items.findIndex((item) => {
      if (item.question.trim().toLowerCase() !== qClean) return false;
      if (gClean && item.grade && item.grade.trim().toLowerCase() !== gClean) return false;
      if (lClean && item.language && item.language.trim().toLowerCase() !== lClean) return false;
      return true;
    });

    const finalSubject = normalizeSubject(subject, question);

    const newRecord: CachedQuestionItem = {
      id: `qc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      question: question.trim(),
      answer,
      grade: grade || 'Grade 10',
      language: language || 'en',
      subject: finalSubject,
      timestamp: Date.now()
    };

    if (existingIndex >= 0) {
      items[existingIndex] = {
        ...items[existingIndex],
        ...newRecord
      };
    } else {
      items.push(newRecord);
    }

    writeCacheFile(items, totalAiCallsSaved);
  } catch (err) {
    console.error('Error writing to questionCache.json:', err);
  }
}

/**
 * Deletes an item from questionCache.json by index, question text, or timestamp.
 */
export function deleteFromCache(identifier: {
  index?: number;
  question?: string;
  timestamp?: number | string;
  id?: string;
}): boolean {
  try {
    const { questions, totalAiCallsSaved } = readCacheFile();
    let items = [...questions];
    const initialLength = items.length;

    if (identifier.id) {
      items = items.filter((item) => item.id !== identifier.id);
    } else if (identifier.timestamp !== undefined && identifier.question) {
      const qNorm = identifier.question.trim().toLowerCase();
      items = items.filter(
        (item) =>
          !(String(item.timestamp) === String(identifier.timestamp) && item.question.trim().toLowerCase() === qNorm)
      );
    } else if (identifier.timestamp !== undefined) {
      items = items.filter((item) => String(item.timestamp) !== String(identifier.timestamp));
    } else if (identifier.question) {
      const qNorm = identifier.question.trim().toLowerCase();
      items = items.filter((item) => item.question.trim().toLowerCase() !== qNorm);
    } else if (typeof identifier.index === 'number' && identifier.index >= 0 && identifier.index < items.length) {
      items.splice(identifier.index, 1);
    }

    if (items.length !== initialLength) {
      writeCacheFile(items, totalAiCallsSaved);
      return true;
    }
    return false;
  } catch (err) {
    console.error('Error deleting from questionCache.json:', err);
    return false;
  }
}

/**
 * Upserts a single question in questionCache.json (supports edit and create)
 */
export function upsertQuestionInCache(itemData: {
  id?: string;
  question: string;
  answer: string;
  grade?: string;
  language?: string;
  subject?: string;
}): CachedQuestionItem {
  const { questions, totalAiCallsSaved } = readCacheFile();
  const items = [...questions];

  const qClean = itemData.question.trim();
  const finalSubject = normalizeSubject(itemData.subject, itemData.question);

  let targetIndex = -1;
  if (itemData.id) {
    targetIndex = items.findIndex((item) => item.id === itemData.id);
  }
  if (targetIndex === -1) {
    targetIndex = items.findIndex((item) => item.question.trim().toLowerCase() === qClean.toLowerCase());
  }

  const record: CachedQuestionItem = {
    id: itemData.id || `qc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    question: qClean,
    answer: itemData.answer,
    grade: itemData.grade || 'Grade 10',
    language: itemData.language || 'en',
    subject: finalSubject,
    timestamp: Date.now()
  };

  if (targetIndex >= 0) {
    items[targetIndex] = {
      ...items[targetIndex],
      ...record
    };
  } else {
    items.unshift(record);
  }

  writeCacheFile(items, totalAiCallsSaved);
  return record;
}

/**
 * Batch imports questions from CSV or bulk list into questionCache.json
 */
export function importBatchToCache(
  entries: Array<{
    question: string;
    answer: string;
    grade?: string;
    language?: string;
    subject?: string;
  }>
): { added: number; updated: number; total: number } {
  const { questions, totalAiCallsSaved } = readCacheFile();
  const items = [...questions];
  let added = 0;
  let updated = 0;

  for (const entry of entries) {
    if (!entry.question || !entry.answer) continue;
    const qClean = entry.question.trim();
    if (!qClean) continue;

    const existingIdx = items.findIndex(
      (item) => item.question.trim().toLowerCase() === qClean.toLowerCase()
    );

    const record: CachedQuestionItem = {
      id: `qc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      question: qClean,
      answer: entry.answer.trim(),
      grade: entry.grade?.trim() || 'Grade 10',
      language: entry.language?.trim() || 'en',
      subject: normalizeSubject(entry.subject, entry.question),
      timestamp: Date.now()
    };

    if (existingIdx >= 0) {
      items[existingIdx] = {
        ...items[existingIdx],
        ...record,
        id: items[existingIdx].id || record.id
      };
      updated++;
    } else {
      items.push(record);
      added++;
    }
  }

  writeCacheFile(items, totalAiCallsSaved);
  return { added, updated, total: items.length };
}
