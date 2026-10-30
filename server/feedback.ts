import fs from 'fs';
import path from 'path';

export interface FeedbackItem {
  id?: string;
  question: string;
  wrongAnswer: string;
  userFeedback: string;
  timestamp: number | string;
  created_at?: string;
}

const FEEDBACK_FILE_PATH = path.resolve(process.cwd(), 'feedback.json');

// Cutoff timestamp for 2026-01-01 00:00:00 UTC (1767225600000)
export const CUTOFF_TIMESTAMP_2026 = new Date('2026-01-01T00:00:00Z').getTime();

/**
 * Returns created_at timestamp in Africa/Johannesburg timezone:
 * Equivalent to NOW() AT TIME ZONE 'Africa/Johannesburg'
 */
export function getJohannesburgCreatedAt(date: Date = new Date()): string {
  try {
    const d = new Date(date);
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Africa/Johannesburg',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).formatToParts(d);

    const year = parts.find((p) => p.type === 'year')?.value || '2026';
    const month = parts.find((p) => p.type === 'month')?.value || '10';
    const day = parts.find((p) => p.type === 'day')?.value || '21';
    const hour = parts.find((p) => p.type === 'hour')?.value || '15';
    const minute = parts.find((p) => p.type === 'minute')?.value || '25';
    const second = parts.find((p) => p.type === 'second')?.value || '00';

    return `${year}-${month}-${day} ${hour}:${minute}:${second}+02:00`;
  } catch {
    return new Date().toISOString();
  }
}

/**
 * Display format: "21 Oct 2026, 15:25"
 */
export function formatJohannesburgDisplayDate(input: number | string | Date): string {
  try {
    const d = new Date(typeof input === 'string' && /^\d+$/.test(input) ? Number(input) : input);
    if (isNaN(d.getTime())) return '21 Oct 2026, 15:25';

    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Johannesburg',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).formatToParts(d);

    const day = parts.find((p) => p.type === 'day')?.value || '21';
    const month = parts.find((p) => p.type === 'month')?.value || 'Oct';
    const year = parts.find((p) => p.type === 'year')?.value || '2026';
    const hour = parts.find((p) => p.type === 'hour')?.value || '15';
    const minute = parts.find((p) => p.type === 'minute')?.value || '25';

    return `${day} ${month} ${year}, ${hour}:${minute}`;
  } catch {
    return '21 Oct 2026, 15:25';
  }
}

/**
 * Reads feedback.json safely from disk, filtering out all items with date < 2026-01-01.
 */
export function readFeedbackFile(): FeedbackItem[] {
  try {
    if (!fs.existsSync(FEEDBACK_FILE_PATH)) {
      fs.writeFileSync(FEEDBACK_FILE_PATH, '[]', 'utf8');
      return [];
    }
    const raw = fs.readFileSync(FEEDBACK_FILE_PATH, 'utf8');
    const items = JSON.parse(raw || '[]');
    if (!Array.isArray(items)) return [];

    // Filter out all old seed feedback with date < 2026-01-01
    const validItems: FeedbackItem[] = items.filter((item: any) => {
      if (!item) return false;
      const t = typeof item.timestamp === 'number'
        ? item.timestamp
        : new Date(item.created_at || item.timestamp).getTime();
      return !isNaN(t) && t >= CUTOFF_TIMESTAMP_2026;
    }).map((item: any) => ({
      ...item,
      created_at: item.created_at || getJohannesburgCreatedAt(new Date(item.timestamp || Date.now()))
    }));

    // If any legacy items were stripped, persist the cleaned list back to disk
    if (validItems.length !== items.length) {
      fs.writeFileSync(FEEDBACK_FILE_PATH, JSON.stringify(validItems, null, 2), 'utf8');
      console.log(`[Feedback Purge] Deleted ${items.length - validItems.length} old feedback items dated prior to 2026-01-01.`);
    }

    return validItems;
  } catch (err) {
    console.error('Error reading feedback.json:', err);
    return [];
  }
}

/**
 * Saves a new feedback record to feedback.json with {question, wrongAnswer, userFeedback, timestamp, created_at}.
 * Default created_at uses NOW() AT TIME ZONE 'Africa/Johannesburg'.
 */
export function saveFeedback(
  question: string,
  wrongAnswer: string,
  userFeedback: string
): FeedbackItem {
  const items = readFeedbackFile();
  const now = Date.now();
  const newItem: FeedbackItem = {
    id: `fb_${now}_${Math.random().toString(36).substring(2, 7)}`,
    question: question.trim(),
    wrongAnswer: wrongAnswer.trim(),
    userFeedback: userFeedback.trim(),
    timestamp: now,
    created_at: getJohannesburgCreatedAt(new Date(now))
  };

  items.unshift(newItem);
  fs.writeFileSync(FEEDBACK_FILE_PATH, JSON.stringify(items, null, 2), 'utf8');
  console.log(`[Feedback Saved] Question: "${newItem.question.slice(0, 50)}", Created: ${newItem.created_at}`);
  return newItem;
}

/**
 * Deletes a feedback item by id, timestamp, or index.
 */
export function deleteFeedback(identifier: {
  id?: string;
  timestamp?: number | string;
  index?: number;
}): boolean {
  try {
    const items = readFeedbackFile();
    const initialLen = items.length;
    let filtered = [...items];

    if (identifier.id) {
      filtered = filtered.filter((f) => f.id !== identifier.id);
    } else if (identifier.timestamp !== undefined) {
      filtered = filtered.filter((f) => String(f.timestamp) !== String(identifier.timestamp));
    } else if (typeof identifier.index === 'number' && identifier.index >= 0 && identifier.index < filtered.length) {
      filtered.splice(identifier.index, 1);
    }

    if (filtered.length !== initialLen) {
      fs.writeFileSync(FEEDBACK_FILE_PATH, JSON.stringify(filtered, null, 2), 'utf8');
      return true;
    }
    return false;
  } catch (err) {
    console.error('Error deleting from feedback.json:', err);
    return false;
  }
}
