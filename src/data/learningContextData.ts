import { AITutorModeConfig, SALanguage } from '../types';

export const SA_LANGUAGES: SALanguage[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    hasVoice: true,
    voiceLabel: 'Voice Available (English)'
  },
  {
    code: 'af',
    name: 'Afrikaans',
    nativeName: 'Afrikaans',
    hasVoice: true,
    voiceLabel: 'Stem Beskikbaar (Afrikaans)'
  },
  {
    code: 'zu',
    name: 'isiZulu',
    nativeName: 'isiZulu',
    hasVoice: false,
    voiceLabel: 'Text translation only (Voice unavailable)'
  },
  {
    code: 'xh',
    name: 'isiXhosa',
    nativeName: 'isiXhosa',
    hasVoice: false,
    voiceLabel: 'Text translation only (Voice unavailable)'
  },
  {
    code: 'nr',
    name: 'isiNdebele',
    nativeName: 'isiNdebele',
    hasVoice: false,
    voiceLabel: 'Text translation only (Voice unavailable)'
  },
  {
    code: 'ss',
    name: 'siSwati',
    nativeName: 'siSwati',
    hasVoice: false,
    voiceLabel: 'Text translation only (Voice unavailable)'
  },
  {
    code: 'nso',
    name: 'Sepedi',
    nativeName: 'Sesotho sa Leboa',
    hasVoice: false,
    voiceLabel: 'Text translation only (Voice unavailable)'
  },
  {
    code: 'st',
    name: 'Sesotho',
    nativeName: 'Sesotho',
    hasVoice: false,
    voiceLabel: 'Text translation only (Voice unavailable)'
  },
  {
    code: 'tn',
    name: 'Setswana',
    nativeName: 'Setswana',
    hasVoice: false,
    voiceLabel: 'Text translation only (Voice unavailable)'
  },
  {
    code: 've',
    name: 'Tshivenda',
    nativeName: 'Tshivenḓa',
    hasVoice: false,
    voiceLabel: 'Text translation only (Voice unavailable)'
  },
  {
    code: 'ts',
    name: 'Xitsonga',
    nativeName: 'Xitsonga',
    hasVoice: false,
    voiceLabel: 'Controlled Native Engine (140 phrases · Safe Pronunciation & Audio Arch)'
  }
];

export const AI_TUTOR_MODES: AITutorModeConfig[] = [
  {
    id: 'explain',
    label: 'Explain',
    description: 'Detailed concept explanation calibrated to your current curriculum level.',
    iconName: 'BookOpen',
    actionPrompt: 'Explain this concept clearly at my current level with relevant examples and practical intuition.',
    placeholderText: 'Ask any question (e.g. "How does the quadratic formula work?" or "Explain optimistic UI updates")...'
  },
  {
    id: 'simplify',
    label: 'Simplify',
    description: 'Turn complex or intimidating concepts into intuitive everyday analogies.',
    iconName: 'Sparkles',
    actionPrompt: 'Simplify this concept using plain language, real-world metaphors, and simple steps.',
    placeholderText: 'What complex idea would you like simplified into plain language?'
  },
  {
    id: 'summarize',
    label: 'Summarize',
    description: 'Generate high-yield revision summaries, key formulas, and exam study points.',
    iconName: 'FileText',
    actionPrompt: 'Create a concise, structured study summary with bullet points, essential formulas, and core takeaways.',
    placeholderText: 'Paste a lesson, topic, or question to generate concise study notes...'
  },
  {
    id: 'translate',
    label: 'Translate',
    description: 'Translate educational explanations into your selected South African language.',
    iconName: 'Globe',
    actionPrompt: 'Translate this educational concept accurately into the selected South African language, retaining key technical clarity.',
    placeholderText: 'Enter text or concept to translate into your chosen South African language...'
  },
  {
    id: 'practice',
    label: 'Practice',
    description: 'Generate realistic practice problems and step-by-step challenges.',
    iconName: 'PenTool',
    actionPrompt: 'Generate 2-3 targeted practice questions for this topic with progressive difficulty.',
    placeholderText: 'Ask for practice problems on a specific subtopic (e.g. "Factoring quadratics")...'
  },
  {
    id: 'homework_help',
    label: 'Homework Help',
    description: 'Step-by-step Socratic teaching: method breakdown, analogous examples, and answer checks.',
    iconName: 'LifeBuoy',
    actionPrompt: 'Walk me through how to solve this homework problem methodically without just giving away the final answer.',
    placeholderText: 'Share a homework problem you want to understand (e.g. "How do I solve problem 4 on momentum?")...'
  },
  {
    id: 'quiz_help',
    label: 'Quiz Help',
    description: 'Socratic hint & reasoning guidance without directly giving away the answer.',
    iconName: 'HelpCircle',
    actionPrompt: 'Guide me with Socratic questions and conceptual hints to help me solve this problem on my own without spoiling the answer.',
    placeholderText: 'Paste a problem you are stuck on: "Why is option B incorrect for this problem?"'
  },
  {
    id: 'study_plan',
    label: 'Study Plan',
    description: 'Personalized study schedule, weekly milestones, and high-yield revision tactics.',
    iconName: 'Calendar',
    actionPrompt: 'Create a structured study plan tailored to my curriculum level, available hours, and target test date.',
    placeholderText: 'Describe your exam date or available study hours (e.g. "Exam in 3 weeks, 5 hours per week")...'
  }
];

export interface CurriculaStructure {
  id: string;
  name: string;
  levels: {
    id: string;
    name: string;
    subjects: {
      id: string;
      name: string;
      topics: string[];
    }[];
  }[];
}

export const CURRICULA_DATABASE: CurriculaStructure[] = [
  {
    id: 'fet_phase',
    name: 'FET Phase (Grade 10–12 CAPS)',
    levels: [
      {
        id: 'grade_10',
        name: 'Grade 10',
        subjects: [
          {
            id: 'g10_maths',
            name: 'Mathematics',
            topics: [
              'Algebra & Factorization',
              'Exponents & Surds',
              'Linear & Quadratic Equations',
              'Functions & Graphs (Straight line, Parabola, Hyperbola)',
              'Trigonometry (Ratios, Angles of Elevation)',
              'Euclidean Geometry',
              'Analytical Geometry',
              'Statistics & Probability'
            ]
          },
          {
            id: 'g10_physics',
            name: 'Physical Sciences',
            topics: [
              'Vectors & Scalars',
              'Motion in One Dimension',
              'Mechanical Energy & Gravitational Potential',
              'States of Matter & Kinetic Molecular Theory',
              'Chemical Bonding & Periodic Table',
              'Electric Circuits & Ohm’s Law'
            ]
          },
          {
            id: 'g10_lifesci',
            name: 'Life Sciences',
            topics: [
              'Cell Structure & Microscopy',
              'Mitosis & Cell Division',
              'Plant & Animal Tissues',
              'Support & Transport Systems in Plants',
              'Human Skeleton & Locomotion'
            ]
          },
          {
            id: 'g10_accounting',
            name: 'Accounting',
            topics: [
              'Accounting Equation (A = O + L)',
              'Cash Receipts & Cash Payments Journals',
              'General Ledger Posting',
              'Trial Balance Preparation',
              'Financial Statements for Sole Traders'
            ]
          }
        ]
      },
      {
        id: 'grade_11',
        name: 'Grade 11',
        subjects: [
          {
            id: 'g11_maths',
            name: 'Mathematics',
            topics: [
              'Exponents & Quadratic Equations',
              'Number Patterns & Quadratic Sequences',
              'Functions & Inverses',
              'Trigonometric Equations & Identities',
              'Circle Geometry (Theorems & Proofs)',
              'Probability (Venn Diagrams, Tree Diagrams)'
            ]
          },
          {
            id: 'g11_physics',
            name: 'Physical Sciences',
            topics: [
              'Newton’s Laws of Motion',
              'Electrostatics & Coulomb’s Law',
              'Electric Circuits (Internal Resistance)',
              'Intermolecular Forces & Ideal Gases',
              'Stoichiometry & Molar Mass Calculations',
              'Acids & Bases'
            ]
          }
        ]
      },
      {
        id: 'grade_12',
        name: 'Grade 12 / Matric',
        subjects: [
          {
            id: 'g12_maths',
            name: 'Mathematics',
            topics: [
              'Arithmetic & Geometric Sequences and Series',
              'Functions, Inverses & Exponential Models',
              'Differential Calculus (First Principles, Rules)',
              'Applications of Calculus (Cubic Functions, Optimization)',
              'Financial Mathematics (Annuities, Sinking Funds)',
              'Trigonometry (Compound & Double Angles)',
              'Euclidean Geometry (Proportionality & Similarity)'
            ]
          },
          {
            id: 'g12_physics',
            name: 'Physical Sciences',
            topics: [
              'Momentum & Impulse',
              'Work, Energy & Power',
              'Doppler Effect (Sound & Light Waves)',
              'Rates of Reaction & Chemical Equilibrium (Kc)',
              'Electrochemical Cells (Galvanic & Electrolytic)',
              'Organic Chemistry (IUPAC Naming & Reactions)'
            ]
          },
          {
            id: 'g12_lifesci',
            name: 'Life Sciences',
            topics: [
              'DNA, RNA & Protein Synthesis',
              'Meiosis & Genetic Mutations',
              'Reproduction in Vertebrates & Humans',
              'Human Endocrine System & Homeostasis',
              'Evolution by Natural Selection'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'tvet_nated',
    name: 'TVET / NATED Colleges',
    levels: [
      {
        id: 'nated_n1',
        name: 'NATED N1',
        subjects: [
          {
            id: 'n1_maths',
            name: 'Mathematics N1',
            topics: [
              'Fractions, Decimals & Indices',
              'Basic Algebraic Expressions & Factorization',
              'Linear Equations & Formula Manipulation',
              'Right-Angled Trigonometry'
            ]
          },
          {
            id: 'n1_engsci',
            name: 'Engineering Science N1',
            topics: [
              'Dynamics & Velocity Calculations',
              'Statics & Moments',
              'Energy, Work & Power',
              'Basic Electrical Principles'
            ]
          }
        ]
      },
      {
        id: 'nated_n4',
        name: 'NATED N4',
        subjects: [
          {
            id: 'n4_maths',
            name: 'Engineering Mathematics N4',
            topics: [
              'Determinants & Matrix Systems (Cramer’s Rule)',
              'Complex Numbers & De Moivre’s Theorem',
              'Differentiation (Product, Quotient & Chain Rules)',
              'Integration (Standard Forms & Substitution)',
              'Trigonometric Equations & Waveform Synthesis'
            ]
          },
          {
            id: 'n4_electrotechnics',
            name: 'Electrotechnics N4',
            topics: [
              'Direct Current Machines (Motors & Generators)',
              'AC Theory & Single-Phase Circuits',
              'Transformers & Efficiency Calculations',
              'Measuring Instruments & Galvanometers'
            ]
          }
        ]
      },
      {
        id: 'nated_n6',
        name: 'NATED N6',
        subjects: [
          {
            id: 'n6_maths',
            name: 'Engineering Mathematics N6',
            topics: [
              'Partial Differentiation & Error Approximation',
              'Integration by Parts & Partial Fractions',
              'First & Second Order Differential Equations',
              'Surface Area & Volumes of Revolution'
            ]
          },
          {
            id: 'n6_controlsys',
            name: 'Control Systems N6',
            topics: [
              'Laplace Transforms & Transfer Functions',
              'Block Diagram Reduction',
              'Bode Plots & Frequency Response',
              'PID Controllers & System Stability'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'higher_ed',
    name: 'Higher Education / University',
    levels: [
      {
        id: 'he_year1',
        name: 'University 1st Year',
        subjects: [
          {
            id: 'cs101',
            name: 'Computer Science 101',
            topics: [
              'Algorithmic Thinking & Pseudocode',
              'Control Structures & Functions',
              'Memory Allocation & Pointers',
              'Object-Oriented Programming Fundamentals'
            ]
          },
          {
            id: 'calc101',
            name: 'Calculus & Linear Algebra',
            topics: [
              'Limits, Continuity & Derivatives',
              'Fundamental Theorem of Calculus',
              'Vector Spaces & Basis Transformations',
              'Eigenvalues & Eigenvectors'
            ]
          }
        ]
      },
      {
        id: 'he_year2',
        name: 'University 2nd Year',
        subjects: [
          {
            id: 'dsa',
            name: 'Data Structures & Algorithms',
            topics: [
              'Big-O Time & Space Complexity',
              'Trees, AVL Trees & Heaps',
              'Graph Traversal (BFS & DFS)',
              'Dynamic Programming & Memoization',
              'Hash Tables & Collision Resolution'
            ]
          },
          {
            id: 'dbsystems',
            name: 'Database Architecture',
            topics: [
              'Relational Algebra & Normalization (1NF to BCNF)',
              'ACID Transactions & Concurrency Control',
              'Indexing Strategies (B-Trees & Hash Indexes)',
              'Distributed Sharding & Replication'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'professional',
    name: 'Professional Software Engineering',
    levels: [
      {
        id: 'pro_fullstack',
        name: 'Full-Stack Modern Engineering',
        subjects: [
          {
            id: 'pro_fe',
            name: 'Frontend Systems',
            topics: [
              'Zero-Latency State Flow & UI Determinism',
              'Mobile-First Touch Ergonomics & Thumb Zones',
              'Idempotency & Streaming Response Protocols',
              'Performance Budgets & Compositor Rendering'
            ]
          },
          {
            id: 'pro_ai',
            name: 'AI Engineering',
            topics: [
              'Deterministic JSON Schemas & Constrained Decoding',
              'Vector Spaces & Hybrid Search Architectures',
              'Retrieval-Augmented Generation (RAG)',
              'Autonomous Agents & Evaluation Guardrails'
            ]
          }
        ]
      }
    ]
  }
];
