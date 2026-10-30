/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN FLASHCARDS STORE & ADMIN BACKEND
 */

import fs from 'fs';
import path from 'path';

export interface FlashcardItem {
  id: string;
  trackId: string;
  topic: string;
  question: string;
  answer: string;
  codeSnippet?: string;
  difficulty: 'Foundation' | 'Core' | 'Expert';
  xp?: number;
}

const FLASHCARDS_FILE_PATH = path.resolve(process.cwd(), 'flashcardsCache.json');

const DEFAULT_FLASHCARDS: FlashcardItem[] = [
  {
    id: 'fc-1',
    trackId: 'fullstack-mastery',
    topic: 'Full-Stack Architecture',
    question: 'What is the key difference between optimistic updates and standard mutation handling?',
    answer: 'Optimistic updates modify the client UI immediately assuming network success, keeping a snapshot in reserve. If the server rejects the mutation, the client rolls back gracefully rather than leaving the user waiting.',
    codeSnippet: 'setState(optimisticValue);\nawait api.mutate().catch(() => setState(snapshot));',
    difficulty: 'Core',
    xp: 10
  },
  {
    id: 'fc-2',
    trackId: 'fullstack-mastery',
    topic: 'Mobile Ergonomics',
    question: 'Why is 44x44px the universal standard for mobile touch targets?',
    answer: 'It matches the average human physical thumb contact pad (approx. 10mm). Targets smaller than 44px create mis-taps and reach fatigue on smartphone touchscreens.',
    difficulty: 'Foundation',
    xp: 10
  },
  {
    id: 'fc-3',
    trackId: 'ai-systems',
    topic: 'AI Systems & LLMs',
    question: 'How does grammar-guided constrained decoding eliminate JSON hallucination?',
    answer: 'Rather than parsing JSON after output generation, constrained decoding intercepts the model token logits at every step, masking out all tokens that would violate the specified JSON schema grammar.',
    codeSnippet: 'config: { responseMimeType: "application/json", responseSchema: schema }',
    difficulty: 'Expert',
    xp: 15
  },
  {
    id: 'fc-4',
    trackId: 'ai-systems',
    topic: 'Vector Search',
    question: 'What is Reciprocal Rank Fusion (RRF) and why is it used in Hybrid Search?',
    answer: 'RRF is an algorithm that combines rankings from different search techniques (e.g. dense semantic vector similarity and sparse BM25 keyword search) using formula 1 / (60 + rank), eliminating the need for manual scoring weights.',
    difficulty: 'Core',
    xp: 10
  },
  {
    id: 'fc-5',
    trackId: 'cloud-devops',
    topic: 'Cloud Infrastructure',
    question: 'Why should production container runtimes avoid executing as root (UID 0)?',
    answer: 'If an attacker breaks out of a container process run as root, they inherit root privileges on the host kernel node. Running as a dedicated unprivileged user restricts damage to the isolated container namespace.',
    codeSnippet: 'USER 10001:10001',
    difficulty: 'Core',
    xp: 10
  },
  {
    id: 'fc-6',
    trackId: 'product-design',
    topic: 'Design Systems',
    question: 'What does the 60-30-10 color rule prescribe in clean interface design?',
    answer: '60% dominant neutral canvas (light/dark field), 30% structural surfaces (cards, borders, subtle text), and 10% high-intent accent reserved strictly for interactive focus points and primary action CTAs.',
    difficulty: 'Foundation',
    xp: 10
  },
  {
    id: 'fc-7',
    trackId: 'fullstack-mastery',
    topic: 'API Design',
    question: 'What is an Idempotency Key and why is it essential for mobile network operations?',
    answer: 'A unique UUID header sent by the client during mutations. If a mobile request times out and the device auto-retries, the server recognizes the key and returns the previously processed result instead of repeating the transaction.',
    codeSnippet: 'headers: { "Idempotency-Key": "4a7f-..." }',
    difficulty: 'Core',
    xp: 10
  },
  {
    id: 'fc-8',
    trackId: 'product-design',
    topic: 'Clean Visual Hierarchy',
    question: 'Why should static metadata avoid heavy box styling or nested pill badges?',
    answer: 'Boxes and pills were designed as interactive click targets. Using them for static text creates visual clutter and distracts from content hierarchy. Metadata should be clean unboxed text separated by ·.',
    difficulty: 'Foundation',
    xp: 10
  }
];

export function readFlashcardsFile(): FlashcardItem[] {
  try {
    if (!fs.existsSync(FLASHCARDS_FILE_PATH)) {
      fs.writeFileSync(FLASHCARDS_FILE_PATH, JSON.stringify(DEFAULT_FLASHCARDS, null, 2), 'utf8');
      return DEFAULT_FLASHCARDS;
    }
    const raw = fs.readFileSync(FLASHCARDS_FILE_PATH, 'utf8');
    const parsed = JSON.parse(raw || '[]');
    return Array.isArray(parsed) ? parsed : DEFAULT_FLASHCARDS;
  } catch (err) {
    console.error('Error reading flashcardsCache.json:', err);
    return DEFAULT_FLASHCARDS;
  }
}

export function writeFlashcardsFile(cards: FlashcardItem[]): void {
  try {
    fs.writeFileSync(FLASHCARDS_FILE_PATH, JSON.stringify(cards, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing flashcardsCache.json:', err);
  }
}

export function upsertFlashcard(item: Partial<FlashcardItem>): FlashcardItem {
  const cards = readFlashcardsFile();
  const id = item.id || `fc-${Date.now()}`;
  const existingIdx = cards.findIndex((c) => c.id === id);

  const card: FlashcardItem = {
    id,
    trackId: item.trackId || 'general',
    topic: item.topic || 'General Knowledge',
    question: item.question || '',
    answer: item.answer || '',
    codeSnippet: item.codeSnippet,
    difficulty: item.difficulty === 'Expert' || item.difficulty === 'Foundation' ? item.difficulty : 'Core',
    xp: typeof item.xp === 'number' && item.xp > 0 ? item.xp : 10
  };

  if (existingIdx >= 0) {
    cards[existingIdx] = card;
  } else {
    cards.push(card);
  }

  writeFlashcardsFile(cards);
  return card;
}

export function deleteFlashcardById(id: string): boolean {
  const cards = readFlashcardsFile();
  const filtered = cards.filter((c) => c.id !== id);
  if (filtered.length !== cards.length) {
    writeFlashcardsFile(filtered);
    return true;
  }
  return false;
}
