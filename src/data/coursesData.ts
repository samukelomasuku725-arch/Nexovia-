import { Track } from '../types';

export const TRACKS: Track[] = [
  {
    id: 'fullstack-mastery',
    title: 'Full-Stack Modern Engineering',
    tagline: 'Architect end-to-end resilient web applications from clean UI to high-throughput data layers.',
    description: 'Master the full engineering lifecycle: component architecture, deterministic state flow, responsive mobile-first touch interfaces, robust APIs, and relational persistence.',
    level: 'Intermediate',
    durationHours: 32,
    iconName: 'Layers',
    imagePath: '/src/assets/images/track_fullstack_1790670967843.jpg',
    category: 'Software Engineering',
    skills: ['React 19', 'TypeScript', 'Node.js', 'System Architecture', 'SQL Performance', 'Mobile PWA'],
    modules: [
      {
        id: 'mod-fs-1',
        trackId: 'fullstack-mastery',
        title: 'Modern Component Architecture & State Modeling',
        description: 'Construct predictable, fluid user interfaces using deterministic state machines, unidirectional data flow, and responsive ergonomics.',
        order: 1,
        lessons: [
          {
            id: 'fs-lesson-1',
            moduleId: 'mod-fs-1',
            trackId: 'fullstack-mastery',
            title: 'Zero-Latency State Flow & UI Determinism',
            subtitle: 'Eliminate race conditions and erratic re-renders with state machines and optimistic updates.',
            durationMinutes: 18,
            readTime: '6 min read',
            content: {
              overview: 'Reliable web applications treat state not as ad-hoc boolean toggles, but as formal transitions through valid mathematical states. When network latency occurs, optimistic UI guarantees instantaneous tactile feedback while preserving rollback safety.',
              keyTakeaways: [
                'Avoid impossible UI states by replacing boolean flags (isLoading, isError, isSuccess) with explicit discriminated union state machines.',
                'Optimistic updates require immediate cache updates paired with automated rollback snapshots.',
                'Keep derived computations inside useMemo or pure selectors rather than synchronizing them across separate state variables.'
              ],
              sections: [
                {
                  heading: '1. The Anti-Pattern of Boolean Explosion',
                  body: 'When building interactive applications, engineers frequently accumulate disjoint booleans: isLoading, isError, isSubmitting, hasSubmitted, and isEmpty. These permit impossible states where an interface is simultaneously "loading" and "showing error". By formalizing states with TypeScript discriminated unions, the compiler prevents invalid renderings entirely.',
                  codeBlock: {
                    language: 'typescript',
                    filename: 'stateMachine.ts',
                    code: `type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T; updatedAt: number }
  | { status: 'error'; error: Error; canRetry: boolean };

function renderView(state: AsyncState<UserProfile>) {
  switch (state.status) {
    case 'idle':
      return <EmptyPlaceholder />;
    case 'loading':
      return <LoadingSkeleton />;
    case 'success':
      return <ProfileCard profile={state.data} />;
    case 'error':
      return <ErrorNotice error={state.error} onRetry={retryFetch} />;
  }
}`
                  }
                },
                {
                  heading: '2. Optimistic UI with Rollback Boundaries',
                  body: 'On mobile networks, waiting 350ms for a like, bookmark, or checkbox round-trip destroys perceived performance. Optimistic patterns immediately apply the mutation to the client cache. If the server rejects the request with an HTTP 4xx/5xx, the client invokes the rollback handler and surfaces an unboxed, subtle retry affordance.',
                  callout: {
                    type: 'tip',
                    text: 'Always store the previous snapshot before optimistic mutation. Never clear the rollback snapshot until the HTTP 200 payload confirms server persistence.'
                  }
                }
              ]
            },
            exercise: {
              type: 'code_editor',
              title: 'Interactive State Reducer Sandbox',
              prompt: 'Implement the action handler for "SUBMIT_SUCCESS" to transition the reducer from "submitting" to "success" state with timestamp and clean payload.',
              initialCode: `// Complete the reducer state transition
type State = 
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; timestamp: number; payload: string };

type Action = 
  | { type: 'START_SUBMIT' }
  | { type: 'SUBMIT_SUCCESS'; payload: string };

function formReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START_SUBMIT':
      return { status: 'submitting' };
    case 'SUBMIT_SUCCESS':
      // Return the updated state object:
      return { status: 'success', timestamp: Date.now(), payload: action.payload };
    default:
      return state;
  }
}`,
              solutionCode: `return { status: 'success', timestamp: Date.now(), payload: action.payload };`,
              language: 'typescript',
              hint: 'Return an object containing status: "success", timestamp, and the action.payload.'
            },
            quiz: [
              {
                id: 'q-fs-1-1',
                question: 'Why are discriminated union state machines superior to multiple boolean flags like isLoading and isError?',
                options: [
                  'They compile faster in standard Vite configurations.',
                  'They eliminate impossible states such as loading and error being simultaneously true.',
                  'They allow direct database access without an API.',
                  'They compress JSON payloads automatically over the wire.'
                ],
                correctIndex: 1,
                explanation: 'Discriminated unions ensure that the system exists in exactly one valid state at any instant, eliminating conflicting boolean combinations.'
              },
              {
                id: 'q-fs-1-2',
                question: 'What is mandatory when executing an optimistic UI update?',
                options: [
                  'Freezing all user input for 2 seconds.',
                  'Retaining a prior snapshot to allow rollback if the server mutation fails.',
                  'Converting all numbers into floating points.',
                  'Sending an SMS notification to the client.'
                ],
                correctIndex: 1,
                explanation: 'Optimistic UI must be safely reversible: retaining the previous state snapshot allows instantaneous rollback without corrupting application memory.'
              }
            ],
            audioScript: 'Welcome to Lesson 1: Zero-Latency State Flow. We explore deterministic state machines and optimistic client transitions to deliver fluid, bug-free web experiences.'
          },
          {
            id: 'fs-lesson-2',
            moduleId: 'mod-fs-1',
            trackId: 'fullstack-mastery',
            title: 'Mobile-First Touch Ergonomics & Thumb Zones',
            subtitle: 'Engineering tactile interfaces engineered specifically for smartphone viewports.',
            durationMinutes: 15,
            readTime: '5 min read',
            content: {
              overview: 'Smartphones represent over 60% of modern internet traffic. Building production applications requires honoring physical human biomechanics: natural thumb sweep zones, minimum 44px hitboxes, and zero accidental mis-taps.',
              keyTakeaways: [
                'Primary actions must sit in the natural thumb zone (bottom 40% of viewport).',
                'Touch hitboxes must never drop below 44x44px, regardless of visual icon size.',
                'The aggregate height of all fixed sticky chrome on mobile must remain below 15% of total screen height.'
              ],
              sections: [
                {
                  heading: '1. Thumb Zone Geometry',
                  body: 'When a user holds a modern phone one-handed, the thumb sweeps naturally across the lower third of the display. Placing primary navigation tabs and critical actions at the top forces reach fatigue or two-handed repositioning.',
                  callout: {
                    type: 'info',
                    text: 'BrightPath adheres to the 15% Mobile Sticky Cap: top and bottom navigation bars together consume less than 15% of vertical space, dedicating 85% to uninterrupted learning.'
                  }
                },
                {
                  heading: '2. Hitbox Padding vs Visual Footprint',
                  body: 'An icon can be visually styled at 18px or 20px, but its interactive container must expand to at least 44x44px. Wrap interactive triggers with min-h-[44px] min-w-[44px] flex items-center justify-center or negative tap-margin offsets.',
                  codeBlock: {
                    language: 'tsx',
                    filename: 'TouchButton.tsx',
                    code: `// Accessible touch target with compact visual icon
export function IconButton({ icon: Icon, label, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-slate-100 active:scale-95 transition-transform"
    >
      <Icon className="w-5 h-5 text-slate-700" />
    </button>
  );
}`
                  }
                }
              ]
            },
            exercise: {
              type: 'flexbox_visualizer',
              title: 'Mobile Bottom Tab Bar Layout Sandbox',
              prompt: 'Adjust the alignment and padding to construct an ergonomic mobile bottom navigation bar with 4 evenly distributed touch targets.',
              hint: 'Ensure items are spaced evenly and touch height reaches at least 48px.'
            },
            quiz: [
              {
                id: 'q-fs-2-1',
                question: 'What is the recommended minimum interactive hitbox dimension for touch devices under WCAG guidelines?',
                options: ['24 x 24px', '32 x 32px', '44 x 44px', '72 x 72px'],
                correctIndex: 2,
                explanation: 'A minimum 44 x 44px target prevents mistaps and accommodates the average human thumb pad footprint.'
              }
            ],
            audioScript: 'Lesson 2 focuses on Mobile-First Touch Ergonomics. Discover how thumb reach zones, 44px touch targets, and sticky height caps create intuitive smartphone experiences.'
          }
        ]
      },
      {
        id: 'mod-fs-2',
        trackId: 'fullstack-mastery',
        title: 'High-Performance APIs & Data Layer',
        description: 'Design idempotent endpoints, streaming HTTP responses, connection pooling, and resilient database queries.',
        order: 2,
        lessons: [
          {
            id: 'fs-lesson-3',
            moduleId: 'mod-fs-2',
            trackId: 'fullstack-mastery',
            title: 'Idempotency, Streaming & Resilient Endpoints',
            subtitle: 'Guaranteeing transaction safety against network retries and duplicate mobile requests.',
            durationMinutes: 22,
            readTime: '7 min read',
            content: {
              overview: 'Mobile devices switch between Wi-Fi and cellular networks constantly, resulting in dropped packets and automated client retries. Idempotency keys protect critical operations like payments, course enrollments, and state updates from executing twice.',
              keyTakeaways: [
                'POST mutations on unreliable networks require an Idempotency-Key header.',
                'Cached responses for idempotency keys must carry a TTL matching maximum client retry windows.',
                'Streaming protocols (Server-Sent Events) drastically lower time-to-first-token compared to monolithic JSON responses.'
              ],
              sections: [
                {
                  heading: '1. Designing Idempotent Mutation Endpoints',
                  body: 'An idempotent operation produces the exact same server state whether executed once or ten times. While GET and PUT are idempotent by specification, POST requests require an application-level key stored in Redis or PostgreSQL.',
                  codeBlock: {
                    language: 'typescript',
                    filename: 'idempotencyMiddleware.ts',
                    code: `export async function handleIdempotentPost(req: Request, res: Response) {
  const idempotencyKey = req.headers['idempotency-key'];
  if (!idempotencyKey) {
    return res.status(400).json({ error: 'Missing Idempotency-Key header' });
  }

  const cachedResult = await redis.get(\`idemp:\${idempotencyKey}\`);
  if (cachedResult) {
    return res.status(200).json(JSON.parse(cachedResult));
  }

  const result = await processTransaction(req.body);
  await redis.setex(\`idemp:\${idempotencyKey}\`, 86400, JSON.stringify(result));
  return res.status(201).json(result);
}`
                  }
                }
              ]
            },
            quiz: [
              {
                id: 'q-fs-3-1',
                question: 'Which HTTP method is naturally non-idempotent by default standard specification?',
                options: ['GET', 'PUT', 'DELETE', 'POST'],
                correctIndex: 3,
                explanation: 'POST is designed to create new resources and is non-idempotent unless explicitly protected with an idempotency mechanism.'
              }
            ],
            audioScript: 'Lesson 3 covers Idempotency and Resilient APIs. Learn how idempotency keys and streaming protocols protect distributed applications from network turbulence.'
          }
        ]
      }
    ]
  },
  {
    id: 'ai-systems',
    title: 'AI Engineering & Intelligent Systems',
    tagline: 'Build deterministic, production-grade applications powered by modern language models and vector spaces.',
    description: 'Move beyond basic prompts. Learn structured JSON outputs, semantic embeddings, vector index geometries, RAG retrieval pipelines, and autonomous agent orchestration with strict evaluation bounds.',
    level: 'Advanced',
    durationHours: 36,
    iconName: 'Cpu',
    imagePath: '/src/assets/images/track_ai_engineering_1790670984057.jpg',
    category: 'Artificial Intelligence',
    skills: ['LLM Orchestration', 'Vector Embeddings', 'RAG Pipelines', 'Function Calling', 'Deterministic Schemas', 'Agent Guardrails'],
    modules: [
      {
        id: 'mod-ai-1',
        trackId: 'ai-systems',
        title: 'Structured LLM Outputs & Prompt Architecture',
        description: 'Constrain stochastic language models into reliable, typed data pipelines that integrate seamlessly with backend services.',
        order: 1,
        lessons: [
          {
            id: 'ai-lesson-1',
            moduleId: 'mod-ai-1',
            trackId: 'ai-systems',
            title: 'Deterministic JSON Schemas & Constrained Decoding',
            subtitle: 'Eliminating markdown noise and hallucinated properties through grammar-guided generation.',
            durationMinutes: 20,
            readTime: '6 min read',
            content: {
              overview: 'In production systems, language models cannot simply output free-form markdown chat. They must emit strict JSON objects adhering to validated JSON Schemas that plug directly into databases and API endpoints.',
              keyTakeaways: [
                'Use responseSchema and responseMimeType: "application/json" rather than begging the model in prompt prose.',
                'Define strict enums and required property lists to eliminate ambiguous keys.',
                'Validate incoming model outputs with Zod or TypeBox before saving to database.'
              ],
              sections: [
                {
                  heading: '1. Constrained Generation vs Post-Hoc Parsing',
                  body: 'Early AI apps used regex to strip ```json code fences from chat outputs. Modern production APIs support constrained decoding, where tokens outside the valid JSON grammar are masked out at inference time.',
                  codeBlock: {
                    language: 'typescript',
                    filename: 'structuredAi.ts',
                    code: `import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI();
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: 'Analyze the architectural pros and cons of event sourcing.',
  config: {
    responseMimeType: 'application/json',
    responseSchema: {
      type: Type.OBJECT,
      properties: {
        summary: { type: Type.STRING },
        tradeoffs: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              dimension: { type: Type.STRING },
              advantage: { type: Type.STRING },
              complexityFactor: { type: Type.STRING, enum: ['LOW', 'MEDIUM', 'HIGH'] }
            },
            required: ['dimension', 'advantage', 'complexityFactor']
          }
        }
      },
      required: ['summary', 'tradeoffs']
    }
  }
});`
                  }
                }
              ]
            },
            exercise: {
              type: 'code_editor',
              title: 'JSON Schema Configuration Sandbox',
              prompt: 'Configure the schema properties to extract "headline" (string) and "confidenceScore" (number between 0 and 1).',
              initialCode: `// Configure the schema properties
const schema = {
  type: 'object',
  properties: {
    // Add headline and confidenceScore:
    headline: { type: 'string' },
    confidenceScore: { type: 'number' }
  },
  required: ['headline', 'confidenceScore']
};`,
              solutionCode: `headline: { type: 'string' }, confidenceScore: { type: 'number' }`,
              language: 'typescript',
              hint: 'Specify headline as string and confidenceScore as number inside properties.'
            },
            quiz: [
              {
                id: 'q-ai-1-1',
                question: 'What is the primary benefit of grammar-guided constrained decoding for LLM outputs?',
                options: [
                  'It increases the model size ten-fold.',
                  'It mathematically prevents the model from generating syntactically invalid JSON or unapproved keys.',
                  'It translates code to assembly language automatically.',
                  'It eliminates the need for an internet connection.'
                ],
                correctIndex: 1,
                explanation: 'Grammar-guided decoding prunes the token probability distribution at every step, ensuring the output strictly adheres to the requested schema.'
              }
            ],
            audioScript: 'Welcome to AI Systems Lesson 1: Deterministic JSON Schemas. Discover how constrained grammar decoding turns unpredictable text models into hardened API pipelines.'
          },
          {
            id: 'ai-lesson-2',
            moduleId: 'mod-ai-1',
            trackId: 'ai-systems',
            title: 'Vector Spaces & Hybrid Search Architectures',
            subtitle: 'Combining dense semantic embeddings with sparse BM25 lexical search for high precision RAG.',
            durationMinutes: 24,
            readTime: '8 min read',
            content: {
              overview: 'Dense vector search excels at conceptual similarity, but frequently fails on exact serial numbers, product codes, or acronyms. Production retrieval systems utilize Hybrid Search (Reciprocal Rank Fusion) to pair cosine similarity with lexical BM25 matching.',
              keyTakeaways: [
                'Cosine distance measures angular alignment in high-dimensional embedding spaces.',
                'Chunking strategy must preserve semantic boundaries (paragraphs, markdown headings) rather than arbitrary character cuts.',
                'Reciprocal Rank Fusion (RRF) normalizes scores across disparate search algorithms without manual weight tuning.'
              ],
              sections: [
                {
                  heading: '1. The Math of Reciprocal Rank Fusion',
                  body: 'Given rank positions from both dense vector similarity and BM25 full-text queries, RRF computes a unified score for each document chunk using a smoothing constant (typically k=60).',
                  codeBlock: {
                    language: 'typescript',
                    filename: 'rrfRanker.ts',
                    code: `// Reciprocal Rank Fusion implementation
export function calculateRRF(
  denseRank: number,
  sparseRank: number,
  k: number = 60
): number {
  const denseScore = 1 / (k + denseRank);
  const sparseScore = 1 / (k + sparseRank);
  return denseScore + sparseScore;
}`
                  }
                }
              ]
            },
            quiz: [
              {
                id: 'q-ai-2-1',
                question: 'Why is hybrid search (Dense Vector + Sparse BM25) preferred over pure vector search in production?',
                options: [
                  'Pure vector search is illegal in Europe.',
                  'Sparse BM25 captures exact keyword matches and identifiers that semantic vector models often blur.',
                  'BM25 requires no server memory.',
                  'Dense vectors can only represent English text.'
                ],
                correctIndex: 1,
                explanation: 'Dense embeddings excel at conceptual meaning, while BM25 guarantees precision for exact SKU names, error codes, and technical jargon.'
              }
            ],
            audioScript: 'Lesson 2 explores Vector Spaces and Hybrid Search. Learn how reciprocal rank fusion unites lexical precision with semantic understanding.'
          }
        ]
      }
    ]
  },
  {
    id: 'cloud-devops',
    title: 'Cloud Infrastructure & Production Resilience',
    tagline: 'Engineer automated container pipelines, Kubernetes clusters, and zero-downtime deployment topologies.',
    description: 'Learn enterprise infrastructure as code, multi-stage container optimization, CI/CD pipeline automation, observability with OpenTelemetry, and graceful fault tolerance.',
    level: 'Intermediate',
    durationHours: 28,
    iconName: 'Cloud',
    imagePath: '/src/assets/images/track_cloud_devops_1790671007652.jpg',
    category: 'Cloud & Infrastructure',
    skills: ['Docker Hardening', 'Kubernetes', 'CI/CD Pipelines', 'OpenTelemetry', 'Zero-Downtime Deployment', 'Network Security'],
    modules: [
      {
        id: 'mod-cloud-1',
        trackId: 'cloud-devops',
        title: 'Container Optimization & Production Hardening',
        description: 'Build minimal, secure, non-root container images with layered caching and vulnerability scanning.',
        order: 1,
        lessons: [
          {
            id: 'cloud-lesson-1',
            moduleId: 'mod-cloud-1',
            trackId: 'cloud-devops',
            title: 'Multi-Stage Docker Builds & Rootless Execution',
            subtitle: 'Shrinking 1.2GB node_modules images down to 65MB secure production binaries.',
            durationMinutes: 19,
            readTime: '6 min read',
            content: {
              overview: 'Shipping development dependencies, compiler toolchains, and package managers into production containers introduces massive attack surfaces and slow cold starts. Multi-stage builds separate compilation from execution environments.',
              keyTakeaways: [
                'Never run production containers as root; define an unprivileged appuser (UID 10001).',
                'Copy only compiled build artifacts and production node_modules into the final scratch or distroless base.',
                'Order Dockerfile instructions from least-frequently changed to most-frequently changed to maximize build cache reuse.'
              ],
              sections: [
                {
                  heading: '1. Anatomy of a Hardened Containerfile',
                  body: 'By utilizing multi-stage builds and distroless images, an application leaves behind bash shells, package installers, and build tools, drastically reducing Common Vulnerabilities and Exposures (CVEs).',
                  codeBlock: {
                    language: 'dockerfile',
                    filename: 'Dockerfile',
                    code: `# Stage 1: Build & Prune
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --production

# Stage 2: Production Minimal Runtime
FROM gcr.io/distroless/nodejs22-debian12
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER 10001:10001
ENV NODE_ENV=production
EXPOSE 3000
CMD ["dist/server.js"]`
                  }
                }
              ]
            },
            quiz: [
              {
                id: 'q-cloud-1-1',
                question: 'Why should production containers avoid running under the root user (UID 0)?',
                options: [
                  'Root users cannot open network ports.',
                  'Container breakout vulnerabilities allow attackers root access to the underlying host OS.',
                  'Linux kernels disallow root containers entirely.',
                  'Root containers take three times as long to download.'
                ],
                correctIndex: 1,
                explanation: 'Running as root in a container increases risk; if an attacker escapes container isolation, they inherit root privileges on the host node.'
              }
            ],
            audioScript: 'Welcome to Cloud & DevOps Lesson 1. Discover multi-stage builds and rootless containerization for secure, lightweight deployments.'
          }
        ]
      }
    ]
  },
  {
    id: 'product-design',
    title: 'Design Systems & Mobile UX',
    tagline: 'Craft accessible, high-contrast, thumb-friendly interfaces with disciplined typographic hierarchy.',
    description: 'Bridge the gap between design and code. Learn semantic color systems, 60-30-10 color allocation, zero-pill metadata discipline, WCAG AA accessibility, and micro-interaction latency budgets.',
    level: 'Beginner',
    durationHours: 20,
    iconName: 'Palette',
    imagePath: '/src/assets/images/track_fullstack_1790670967843.jpg',
    category: 'Design & UX',
    skills: ['Design Tokens', '60-30-10 Color Rule', 'WCAG AA Standards', 'Typography Hierarchy', 'Thumb Ergonomics'],
    modules: [
      {
        id: 'mod-design-1',
        trackId: 'product-design',
        title: 'Visual Hierarchy & Anti-Slop Discipline',
        description: 'Create distinctive, elegant interfaces that convey confidence and eliminate generic AI aesthetic tropes.',
        order: 1,
        lessons: [
          {
            id: 'design-lesson-1',
            moduleId: 'mod-design-1',
            trackId: 'product-design',
            title: 'The 60-30-10 Rule & Zero-Pill Typography',
            subtitle: 'How disciplined spacing and unboxed metadata transform messy screens into editorial masterpieces.',
            durationMinutes: 16,
            readTime: '5 min read',
            content: {
              overview: 'Generic websites default to purple gradients, floating stat pills, and rounded cards inside rounded cards. Professional design achieves clarity through intentional contrast ratios, mathematical spacing, and quiet metadata.',
              keyTakeaways: [
                '60% dominant neutral canvas, 30% structural surfaces and dividers, 10% intentional accent color.',
                'Metadata (tags, dates, read times) should be clean unboxed text separated by subtle typographic dots (·), never wrapped in static pill boxes.',
                'Every viewport frame must have exactly one dominant visual anchor to guide user attention.'
              ],
              sections: [
                {
                  heading: '1. The Anti-Pill Movement',
                  body: 'Pills were invented for interactive click triggers. When designers enclose every piece of passive metadata (like "Published 2026" or "5 min read") inside bordered capsule badges, the screen degenerates into visual clutter.',
                  codeBlock: {
                    language: 'tsx',
                    filename: 'MetadataRow.tsx',
                    code: `// Elegant, unboxed metadata row
export function ArticleMeta({ author, date, duration }: MetaProps) {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
      <span>{author}</span>
      <span aria-hidden="true" className="text-slate-300">·</span>
      <span>{date}</span>
      <span aria-hidden="true" className="text-slate-300">·</span>
      <span>{duration} read</span>
    </div>
  );
}`
                  }
                }
              ]
            },
            quiz: [
              {
                id: 'q-des-1-1',
                question: 'According to modern design discipline, how should static text metadata (e.g. read time, date) be formatted?',
                options: [
                  'Inside multi-colored neon pill boxes with glowing borders.',
                  'As clean, unboxed text with subtle typographic separators like mid-dots (·).',
                  'In uppercase code comments like // DURATION: 5MIN.',
                  'Inside blinking animated badges.'
                ],
                correctIndex: 1,
                explanation: 'Static metadata belongs as quiet, unboxed text; reserving pill boundaries strictly for interactive filter buttons and tabs.'
              }
            ],
            audioScript: 'Lesson 1 introduces the 60-30-10 color rule and Zero-Pill typography. Learn how human editorial pacing creates interfaces that inspire confidence.'
          }
        ]
      }
    ]
  }
];
