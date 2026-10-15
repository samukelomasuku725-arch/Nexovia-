import { Flashcard } from '../types';

export const FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    trackId: 'fullstack-mastery',
    topic: 'Full-Stack Architecture',
    question: 'What is the key difference between optimistic updates and standard mutation handling?',
    answer: 'Optimistic updates modify the client UI immediately assuming network success, keeping a snapshot in reserve. If the server rejects the mutation, the client rolls back gracefully rather than leaving the user waiting.',
    codeSnippet: 'setState(optimisticValue);\nawait api.mutate().catch(() => setState(snapshot));',
    difficulty: 'Core'
  },
  {
    id: 'fc-2',
    trackId: 'fullstack-mastery',
    topic: 'Touch Ergonomics',
    question: 'Why is 44x44px the universal standard for mobile touch targets?',
    answer: 'It matches the average human physical thumb contact pad (approx. 10mm). Targets smaller than 44px create mis-taps and reach fatigue on smartphone touchscreens.',
    difficulty: 'Foundation'
  },
  {
    id: 'fc-3',
    trackId: 'ai-systems',
    topic: 'AI Systems & LLMs',
    question: 'How does grammar-guided constrained decoding eliminate JSON hallucination?',
    answer: 'Rather than parsing JSON after output generation, constrained decoding intercepts the model token logits at every step, masking out all tokens that would violate the specified JSON schema grammar.',
    codeSnippet: 'config: { responseMimeType: "application/json", responseSchema: schema }',
    difficulty: 'Expert'
  },
  {
    id: 'fc-4',
    trackId: 'ai-systems',
    topic: 'Vector Search',
    question: 'What is Reciprocal Rank Fusion (RRF) and why is it used in Hybrid Search?',
    answer: 'RRF is an algorithm that combines rankings from different search techniques (e.g. dense semantic vector similarity and sparse BM25 keyword search) using formula 1 / (60 + rank), eliminating the need for manual scoring weights.',
    difficulty: 'Core'
  },
  {
    id: 'fc-5',
    trackId: 'cloud-devops',
    topic: 'Cloud Infrastructure',
    question: 'Why should production container runtimes avoid executing as root (UID 0)?',
    answer: 'If an attacker breaks out of a container process run as root, they inherit root privileges on the host kernel node. Running as a dedicated unprivileged user restricts damage to the isolated container namespace.',
    codeSnippet: 'USER 10001:10001',
    difficulty: 'Core'
  },
  {
    id: 'fc-6',
    trackId: 'product-design',
    topic: 'Design Systems',
    question: 'What does the 60-30-10 color rule prescribe in clean interface design?',
    answer: '60% dominant neutral canvas (light/dark field), 30% structural surfaces (cards, borders, subtle text), and 10% high-intent accent reserved strictly for interactive focus points and primary action CTAs.',
    difficulty: 'Foundation'
  },
  {
    id: 'fc-7',
    trackId: 'fullstack-mastery',
    topic: 'API Design',
    question: 'What is an Idempotency Key and why is it essential for mobile network operations?',
    answer: 'A unique UUID header sent by the client during mutations. If a mobile request times out and the device auto-retries, the server recognizes the key and returns the previously processed result instead of repeating the transaction.',
    codeSnippet: 'headers: { "Idempotency-Key": "4a7f-..." }',
    difficulty: 'Core'
  },
  {
    id: 'fc-8',
    trackId: 'product-design',
    topic: 'Zero-Pill Discipline',
    question: 'Why should static metadata not be wrapped in pill boxes or colored chips?',
    answer: 'Pills were designed as interactive click targets. Using pills for static text (dates, tags, read times) creates visual clutter ("badge sandwiches") and distracts from content hierarchy. Metadata should be clean unboxed text separated by ·.',
    difficulty: 'Foundation'
  }
];
