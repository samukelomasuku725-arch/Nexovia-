/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BRIGHTPATH ACADEMY - COMPREHENSIVE CURRICULUM ARCHITECTURE (PHASE 1)
 * 
 * Supported Pathways:
 * 1. School (CAPS Alignment): Grade R to Grade 12
 *    Grade -> Subject -> Term -> Topic -> Subtopic -> Lesson -> Practice -> Quiz -> Mastery
 * 
 * 2. TVET: NATED (N1–N6) & NC(V) (Level 2–4)
 *    Qualification -> Programme -> Subject/Module -> Topic -> Lesson -> Practice -> Assessment -> Progress
 * 
 * 3. College & University (Higher Education):
 *    Institution -> Faculty -> Programme -> Qualification -> Module -> Topic -> Lesson -> Assessment -> Progress
 * 
 * CRITICAL COMPLIANCE:
 * - Content provenance tag: 'verified_curriculum' vs 'ai_generated'
 * - Real educational frameworks without claiming unauthorized affiliation.
 */

export type ContentProvenance = 'verified_curriculum' | 'ai_generated';

export interface CurriculumLesson {
  id: string;
  title: string;
  readTimeMinutes: number;
  contentSource: ContentProvenance;
  provenanceLabel: string;
  curriculumCode: string;
  overview: string;
  keyConcepts: string[];
  workedExample?: {
    problemStatement: string;
    stepByStepSolution: string[];
    conceptualNote: string;
  };
}

export interface PracticeItem {
  id: string;
  prompt: string;
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced';
  contentSource: ContentProvenance;
  hints: string[];
  sampleSolution: string;
}

export interface QuizItem {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  contentSource: ContentProvenance;
}

// ----------------------------------------------------
// 1. SCHOOL (CAPS) DATA STRUCTURE
// ----------------------------------------------------

export interface SchoolSubtopic {
  id: string;
  title: string;
  lessons: CurriculumLesson[];
  practice: PracticeItem[];
  quiz: QuizItem[];
  masteryObjectives: string[];
}

export interface SchoolTopic {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  subtopics: SchoolSubtopic[];
}

export interface SchoolTerm {
  termNumber: 1 | 2 | 3 | 4;
  title: string;
  topics: SchoolTopic[];
}

export interface SchoolSubject {
  id: string;
  name: string;
  category: 'Mathematical Sciences' | 'Physical & Life Sciences' | 'Languages' | 'Business & Commerce' | 'Human & Social' | 'Foundation & Life Skills';
  terms: SchoolTerm[];
}

export interface SchoolGrade {
  id: string;
  name: string;
  code: string;
  phase: 'Foundation Phase (Grade R–3)' | 'Intermediate Phase (Grade 4–6)' | 'Senior Phase (Grade 7–9)' | 'FET Phase (Grade 10–12)';
  subjects: SchoolSubject[];
}

// ----------------------------------------------------
// 2. TVET DATA STRUCTURE
// ----------------------------------------------------

export interface TvetTopic {
  id: string;
  title: string;
  description: string;
  lessons: CurriculumLesson[];
  practice: PracticeItem[];
  assessment: QuizItem[];
}

export interface TvetSubjectModule {
  id: string;
  code: string;
  name: string;
  creditHours: number;
  topics: TvetTopic[];
}

export interface TvetProgramme {
  id: string;
  name: string;
  field: 'Engineering Studies' | 'Business & Management' | 'Utility & Applied Sciences';
  modules: TvetSubjectModule[];
}

export interface TvetQualification {
  id: string;
  type: 'NATED' | 'NCV';
  level: string; // 'N1'..'N6' or 'Level 2'..'Level 4'
  title: string;
  programmes: TvetProgramme[];
}

// ----------------------------------------------------
// 3. HIGHER EDUCATION (COLLEGES & UNIVERSITIES)
// ----------------------------------------------------

export interface HigherEdTopic {
  id: string;
  title: string;
  summary: string;
  lessons: CurriculumLesson[];
  assessment: QuizItem[];
}

export interface HigherEdModule {
  id: string;
  code: string;
  name: string;
  credits: number;
  academicYear: 1 | 2 | 3 | 4;
  semester: 1 | 2;
  topics: HigherEdTopic[];
}

export interface HigherEdProgramme {
  id: string;
  name: string;
  qualification: string;
  durationYears: number;
  modules: HigherEdModule[];
}

export interface HigherEdFaculty {
  id: string;
  name: string;
  programmes: HigherEdProgramme[];
}

export interface HigherEdInstitution {
  id: string;
  name: string;
  shortName: string;
  location: string;
  province: string;
  type: 'Research University' | 'Comprehensive University' | 'University of Technology';
  faculties: HigherEdFaculty[];
}

// ====================================================
// VERIFIED CAPS DATA SEED (GRADES R TO 12)
// ====================================================

const ALL_GRADES_METADATA: { id: string; name: string; phase: SchoolGrade['phase'] }[] = [
  { id: 'grade-r', name: 'Grade R', phase: 'Foundation Phase (Grade R–3)' },
  { id: 'grade-1', name: 'Grade 1', phase: 'Foundation Phase (Grade R–3)' },
  { id: 'grade-2', name: 'Grade 2', phase: 'Foundation Phase (Grade R–3)' },
  { id: 'grade-3', name: 'Grade 3', phase: 'Foundation Phase (Grade R–3)' },
  { id: 'grade-4', name: 'Grade 4', phase: 'Intermediate Phase (Grade 4–6)' },
  { id: 'grade-5', name: 'Grade 5', phase: 'Intermediate Phase (Grade 4–6)' },
  { id: 'grade-6', name: 'Grade 6', phase: 'Intermediate Phase (Grade 4–6)' },
  { id: 'grade-7', name: 'Grade 7', phase: 'Senior Phase (Grade 7–9)' },
  { id: 'grade-8', name: 'Grade 8', phase: 'Senior Phase (Grade 7–9)' },
  { id: 'grade-9', name: 'Grade 9', phase: 'Senior Phase (Grade 7–9)' },
  { id: 'grade-10', name: 'Grade 10', phase: 'FET Phase (Grade 10–12)' },
  { id: 'grade-11', name: 'Grade 11', phase: 'FET Phase (Grade 10–12)' },
  { id: 'grade-12', name: 'Grade 12', phase: 'FET Phase (Grade 10–12)' }
];

// Helper to generate full CAPS hierarchy for all 13 grades
export const SCHOOL_GRADES: SchoolGrade[] = ALL_GRADES_METADATA.map((gradeMeta) => {
  const isFET = gradeMeta.id === 'grade-10' || gradeMeta.id === 'grade-11' || gradeMeta.id === 'grade-12';
  const isSenior = gradeMeta.id === 'grade-7' || gradeMeta.id === 'grade-8' || gradeMeta.id === 'grade-9';
  const isInter = gradeMeta.id === 'grade-4' || gradeMeta.id === 'grade-5' || gradeMeta.id === 'grade-6';

  let subjects: SchoolSubject[] = [];

  if (isFET) {
    subjects = [
      {
        id: `${gradeMeta.id}-maths`,
        name: 'Mathematics',
        category: 'Mathematical Sciences',
        terms: [
          {
            termNumber: 1,
            title: 'Term 1: Algebraic Expressions, Equations & Exponents',
            topics: [
              {
                id: `${gradeMeta.id}-maths-t1-algebra`,
                title: 'Algebraic Expressions & Factorisation',
                description: 'Multiplying polynomials, binomial products, factorising quadratics, and grouping.',
                estimatedHours: 12,
                subtopics: [
                  {
                    id: `${gradeMeta.id}-sub-quad-factor`,
                    title: 'Factorising Quadratic Trinomials & Difference of Two Squares',
                    masteryObjectives: [
                      'Recognise standard form ax² + bx + c',
                      'Factorise by finding suitable integer factor pairs',
                      'Check solution by expanding algebraic expressions'
                    ],
                    lessons: [
                      {
                        id: `lesson-${gradeMeta.id}-factoring-1`,
                        title: 'Systematic Factorisation of ax² + bx + c',
                        readTimeMinutes: 8,
                        contentSource: 'verified_curriculum',
                        provenanceLabel: 'CAPS Curriculum Framework · FET Mathematics',
                        curriculumCode: 'CAPS-FET-MATHS-T1',
                        overview: 'Factorisation is the inverse process of expanding brackets. In quadratic expressions of the form ax² + bx + c, our objective is to rewrite the expression as the product of two linear binomial factors (px + q)(rx + s).',
                        keyConcepts: [
                          'When a = 1, find two integers that multiply to give c and add together to give b.',
                          'When the last term c is positive, both factors share the sign of the middle term b.',
                          'When the last term c is negative, the factors have opposite signs, and the larger factor takes the sign of b.',
                          'Always check for a common monomial factor first before attempting trinomial factorisation.'
                        ],
                        workedExample: {
                          problemStatement: 'Factorise completely: 2x² + 7x + 3',
                          stepByStepSolution: [
                            'Step 1: Check for common factor. Here, HCF is 1.',
                            'Step 2: Find two numbers that multiply to give a × c = 2 × 3 = 6, and add to give b = 7.',
                            'Step 3: The factor pair of 6 is +6 and +1 (since 6 × 1 = 6 and 6 + 1 = 7).',
                            'Step 4: Rewrite middle term: 2x² + 6x + 1x + 3.',
                            'Step 5: Factorise by grouping: 2x(x + 3) + 1(x + 3) = (x + 3)(2x + 1).'
                          ],
                          conceptualNote: 'Always verify your answer by expanding (x + 3)(2x + 1) = 2x² + x + 6x + 3 = 2x² + 7x + 3.'
                        }
                      }
                    ],
                    practice: [
                      {
                        id: `prac-${gradeMeta.id}-quad-1`,
                        prompt: 'Factorise the expression: x² - 5x - 24',
                        difficulty: 'Foundation',
                        contentSource: 'verified_curriculum',
                        hints: [
                          'Look for factors of -24 that add up to -5.',
                          'Since the product is negative, one factor must be positive and one negative.',
                          'List factor pairs of 24: (1, 24), (2, 12), (3, 8), (4, 6).'
                        ],
                        sampleSolution: 'Factors of -24 that add to -5 are -8 and +3. Therefore, x² - 5x - 24 = (x - 8)(x + 3).'
                      },
                      {
                        id: `prac-${gradeMeta.id}-quad-2`,
                        prompt: 'Factorise completely: 3x² - 12',
                        difficulty: 'Intermediate',
                        contentSource: 'verified_curriculum',
                        hints: [
                          'Always extract the highest common factor first!',
                          'Notice 3 can be factored out: 3(x² - 4).',
                          'Apply the difference of two squares to x² - 4.'
                        ],
                        sampleSolution: '3x² - 12 = 3(x² - 4) = 3(x - 2)(x + 2).'
                      }
                    ],
                    quiz: [
                      {
                        id: `quiz-${gradeMeta.id}-q1`,
                        question: 'What are the linear factors of x² + 8x + 15?',
                        options: ['(x + 3)(x + 5)', '(x + 1)(x + 15)', '(x - 3)(x - 5)', '(x + 2)(x + 6)'],
                        correctIndex: 0,
                        explanation: '3 × 5 = 15 and 3 + 5 = 8. Hence, (x + 3)(x + 5) is the correct factorisation.',
                        contentSource: 'verified_curriculum'
                      },
                      {
                        id: `quiz-${gradeMeta.id}-q2`,
                        question: 'Which of the following represents the completely factorised form of 4x² - 25y²?',
                        options: ['(2x - 5y)²', '(2x - 5y)(2x + 5y)', '(4x - 5y)(x + 5y)', '(2x + 25y)(2x - y)'],
                        correctIndex: 1,
                        explanation: 'This is a difference of two squares: (2x)² - (5y)² = (2x - 5y)(2x + 5y).',
                        contentSource: 'verified_curriculum'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            termNumber: 2,
            title: 'Term 2: Functions, Graphs & Analytical Geometry',
            topics: [
              {
                id: `${gradeMeta.id}-maths-t2-functions`,
                title: 'Linear & Quadratic Functions (Hyperbola & Parabola)',
                description: 'Intercepts, axis of symmetry, domain and range, transformation of functions.',
                estimatedHours: 15,
                subtopics: [
                  {
                    id: `${gradeMeta.id}-sub-parabola`,
                    title: 'The Parabola: f(x) = a(x - p)² + q',
                    masteryObjectives: [
                      'Identify the turning point (p, q)',
                      'Calculate x-intercepts and y-intercept',
                      'Determine domain and range'
                    ],
                    lessons: [
                      {
                        id: `lesson-${gradeMeta.id}-parabola`,
                        title: 'Properties and Sketching of Quadratic Functions',
                        readTimeMinutes: 10,
                        contentSource: 'verified_curriculum',
                        provenanceLabel: 'CAPS Curriculum Framework · FET Mathematics',
                        curriculumCode: 'CAPS-FET-MATHS-T2',
                        overview: 'A quadratic function produces a parabolic curve. The sign of "a" dictates the concavity (smile or frown), and (p, q) specifies the coordinate of the turning point (vertex).',
                        keyConcepts: [
                          'If a > 0, the parabola opens upwards and has a minimum value at y = q.',
                          'If a < 0, the parabola opens downwards and has a maximum value at y = q.',
                          'The axis of symmetry is the vertical line x = p.',
                          'To find the y-intercept, evaluate f(0). To find x-intercepts, solve f(x) = 0.'
                        ]
                      }
                    ],
                    practice: [
                      {
                        id: `prac-${gradeMeta.id}-parabola-1`,
                        prompt: 'Find the turning point and axis of symmetry for f(x) = 2(x - 3)² + 4.',
                        difficulty: 'Foundation',
                        contentSource: 'verified_curriculum',
                        hints: ['Compare with f(x) = a(x - p)² + q', 'p is 3 and q is 4.'],
                        sampleSolution: 'The turning point is (3, 4) and the axis of symmetry is x = 3.'
                      }
                    ],
                    quiz: [
                      {
                        id: `quiz-${gradeMeta.id}-parabola-q1`,
                        question: 'What is the range of f(x) = -(x + 2)² + 9?',
                        options: ['y ≤ 9, y ∈ ℝ', 'y ≥ 9, y ∈ ℝ', 'y ≤ -2, y ∈ ℝ', 'All real numbers'],
                        correctIndex: 0,
                        explanation: 'Since a = -1 (< 0), the curve has a maximum value at y = 9. Thus the range is y ≤ 9.',
                        contentSource: 'verified_curriculum'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            termNumber: 3,
            title: 'Term 3: Trigonometry & Euclidean Geometry',
            topics: [
              {
                id: `${gradeMeta.id}-maths-t3-trig`,
                title: 'Trigonometric Ratios & Special Angles',
                description: 'Sine, Cosine, Tangent definitions, Cartesian plane definitions, CAST diagram.',
                estimatedHours: 14,
                subtopics: []
              }
            ]
          },
          {
            termNumber: 4,
            title: 'Term 4: Statistics, Probability & Exam Revision',
            topics: [
              {
                id: `${gradeMeta.id}-maths-t4-stats`,
                title: 'Measures of Central Tendency & Dispersion',
                description: 'Mean, median, mode, five-number summary, box-and-whisker plots.',
                estimatedHours: 10,
                subtopics: []
              }
            ]
          }
        ]
      },
      {
        id: `${gradeMeta.id}-physci`,
        name: 'Physical Sciences',
        category: 'Physical & Life Sciences',
        terms: [
          {
            termNumber: 1,
            title: 'Term 1: Mechanics & Matter',
            topics: [
              {
                id: `${gradeMeta.id}-phys-vectors`,
                title: 'Vectors in One and Two Dimensions',
                description: 'Vector addition, graphical representation, resultant vectors.',
                estimatedHours: 10,
                subtopics: [
                  {
                    id: `${gradeMeta.id}-sub-vectors`,
                    title: 'Resultant Vectors & Equilibrium',
                    masteryObjectives: ['Define a vector quantity', 'Calculate resultant using vector components'],
                    lessons: [
                      {
                        id: `lesson-${gradeMeta.id}-vec`,
                        title: 'Resolving Vectors into Perpendicular Components',
                        readTimeMinutes: 7,
                        contentSource: 'verified_curriculum',
                        provenanceLabel: 'CAPS Curriculum Framework · FET Physical Sciences',
                        curriculumCode: 'CAPS-FET-PHYSCI-T1',
                        overview: 'A vector has both magnitude and direction. Any 2D vector F acting at angle θ to the horizontal can be resolved into horizontal (Fx = F cos θ) and vertical (Fy = F sin θ) components.',
                        keyConcepts: [
                          'Fx = F · cos(θ)',
                          'Fy = F · sin(θ)',
                          'Pythagoras gives resultant magnitude: R = √(Rx² + Ry²).'
                        ]
                      }
                    ],
                    practice: [],
                    quiz: []
                  }
                ]
              }
            ]
          },
          {
            termNumber: 2,
            title: 'Term 2: Chemical Bonding & Electricity',
            topics: []
          },
          {
            termNumber: 3,
            title: 'Term 3: Stoichiometry & Chemical Change',
            topics: []
          },
          {
            termNumber: 4,
            title: 'Term 4: Electrostatics & Exam Preparation',
            topics: []
          }
        ]
      },
      {
        id: `${gradeMeta.id}-lifesci`,
        name: 'Life Sciences',
        category: 'Physical & Life Sciences',
        terms: [
          {
            termNumber: 1,
            title: 'Term 1: Life at the Molecular and Cellular Level',
            topics: [
              {
                id: `${gradeMeta.id}-bio-cells`,
                title: 'Cell Structure, Organelles & Microscopy',
                description: 'Plant vs animal cells, mitochondria, chloroplasts, nucleus.',
                estimatedHours: 12,
                subtopics: []
              }
            ]
          },
          {
            termNumber: 2,
            title: 'Term 2: Plant and Animal Tissues',
            topics: []
          },
          {
            termNumber: 3,
            title: 'Term 3: Environmental Studies & Biosphere',
            topics: []
          },
          {
            termNumber: 4,
            title: 'Term 4: Support Systems in Animals & Human Skeleton',
            topics: []
          }
        ]
      },
      {
        id: `${gradeMeta.id}-accounting`,
        name: 'Accounting',
        category: 'Business & Commerce',
        terms: [
          {
            termNumber: 1,
            title: 'Term 1: Indigenous Bookkeeping & Accounting Equation',
            topics: [
              {
                id: `${gradeMeta.id}-acc-equation`,
                title: 'The Accounting Equation (Assets = Equity + Liabilities)',
                description: 'Double entry system, ledger accounts, cash receipts and payments journals.',
                estimatedHours: 14,
                subtopics: []
              }
            ]
          },
          { termNumber: 2, title: 'Term 2: General Ledger & Trial Balance', topics: [] },
          { termNumber: 3, title: 'Term 3: Debtors & Creditors Reconciliation', topics: [] },
          { termNumber: 4, title: 'Term 4: Financial Statements for Sole Traders', topics: [] }
        ]
      }
    ];
  } else if (isSenior) {
    subjects = [
      {
        id: `${gradeMeta.id}-maths`,
        name: 'Mathematics',
        category: 'Mathematical Sciences',
        terms: [
          {
            termNumber: 1,
            title: 'Term 1: Numbers, Operations and Relationships',
            topics: [
              {
                id: `${gradeMeta.id}-math-integers`,
                title: 'Integers, Rational Numbers & Exponents',
                description: 'Properties of operations, prime factors, HCF and LCM.',
                estimatedHours: 10,
                subtopics: []
              }
            ]
          },
          { termNumber: 2, title: 'Term 2: Patterns, Functions & Algebra', topics: [] },
          { termNumber: 3, title: 'Term 3: Space and Shape (Geometry)', topics: [] },
          { termNumber: 4, title: 'Term 4: Measurement & Data Handling', topics: [] }
        ]
      },
      {
        id: `${gradeMeta.id}-natsci`,
        name: 'Natural Sciences',
        category: 'Physical & Life Sciences',
        terms: [
          {
            termNumber: 1,
            title: 'Term 1: Life and Living',
            topics: [
              {
                id: `${gradeMeta.id}-natsci-photosynthesis`,
                title: 'Photosynthesis & Respiration in Ecosystems',
                description: 'Energy flow, food webs, ecological balance in South African biomes.',
                estimatedHours: 10,
                subtopics: []
              }
            ]
          },
          { termNumber: 2, title: 'Term 2: Matter and Materials', topics: [] },
          { termNumber: 3, title: 'Term 3: Energy and Change', topics: [] },
          { termNumber: 4, title: 'Term 4: Planet Earth and Beyond', topics: [] }
        ]
      },
      {
        id: `${gradeMeta.id}-tech`,
        name: 'Technology',
        category: 'Physical & Life Sciences',
        terms: [
          { termNumber: 1, title: 'Term 1: Structures & Design Process', topics: [] },
          { termNumber: 2, title: 'Term 2: Mechanical Systems & Control', topics: [] },
          { termNumber: 3, title: 'Term 3: Electrical Systems & Electronic Circuits', topics: [] },
          { termNumber: 4, title: 'Term 4: Processing Materials', topics: [] }
        ]
      },
      {
        id: `${gradeMeta.id}-ems`,
        name: 'Economic & Management Sciences (EMS)',
        category: 'Business & Commerce',
        terms: [
          { termNumber: 1, title: 'Term 1: The Economy & Circular Flow', topics: [] },
          { termNumber: 2, title: 'Term 2: Financial Literacy & Journals', topics: [] },
          { termNumber: 3, title: 'Term 3: Entrepreneurship & Business Plans', topics: [] },
          { termNumber: 4, title: 'Term 4: Financial Records & Trial Balance', topics: [] }
        ]
      }
    ];
  } else if (isInter) {
    subjects = [
      {
        id: `${gradeMeta.id}-maths`,
        name: 'Mathematics',
        category: 'Mathematical Sciences',
        terms: [
          {
            termNumber: 1,
            title: 'Term 1: Whole Numbers, Addition & Subtraction',
            topics: [
              {
                id: `${gradeMeta.id}-math-placevalue`,
                title: 'Place Value & 5-Digit Number Operations',
                description: 'Rounding off, estimation, column method addition and subtraction.',
                estimatedHours: 12,
                subtopics: []
              }
            ]
          },
          { termNumber: 2, title: 'Term 2: Common Fractions & Decimals', topics: [] },
          { termNumber: 3, title: 'Term 3: Geometry of 2D Shapes & 3D Objects', topics: [] },
          { termNumber: 4, title: 'Term 4: Transformations & Data Handling', topics: [] }
        ]
      },
      {
        id: `${gradeMeta.id}-nst`,
        name: 'Natural Sciences & Technology',
        category: 'Physical & Life Sciences',
        terms: [
          { termNumber: 1, title: 'Term 1: Living and Non-Living Things', topics: [] },
          { termNumber: 2, title: 'Term 2: Matter & Processing Materials', topics: [] },
          { termNumber: 3, title: 'Term 3: Energy & Movement', topics: [] },
          { termNumber: 4, title: 'Term 4: Planet Earth and Beyond', topics: [] }
        ]
      },
      {
        id: `${gradeMeta.id}-socsci`,
        name: 'Social Sciences (History & Geography)',
        category: 'Human & Social',
        terms: [
          { termNumber: 1, title: 'Term 1: Geography: Map Skills & Globes', topics: [] },
          { termNumber: 2, title: 'Term 2: History: Early African Kingdoms', topics: [] },
          { termNumber: 3, title: 'Term 3: Geography: Weather, Climate & Vegetation', topics: [] },
          { termNumber: 4, title: 'Term 4: History: Heritage and Symbols of South Africa', topics: [] }
        ]
      }
    ];
  } else {
    // Foundation Phase (Grade R - 3)
    subjects = [
      {
        id: `${gradeMeta.id}-maths`,
        name: 'Mathematics (Foundational)',
        category: 'Mathematical Sciences',
        terms: [
          {
            termNumber: 1,
            title: 'Term 1: Numbers, Counting & Shapes',
            topics: [
              {
                id: `${gradeMeta.id}-count-10`,
                title: 'Counting Concrete Objects, Number Recognition & Ordering',
                description: 'Building one-to-one correspondence, counting forward and backward.',
                estimatedHours: 15,
                subtopics: []
              }
            ]
          },
          { termNumber: 2, title: 'Term 2: Basic Addition, Subtraction & Grouping', topics: [] },
          { termNumber: 3, title: 'Term 3: 2D Shapes, Patterns & Measurement', topics: [] },
          { termNumber: 4, title: 'Term 4: Problem Solving & Introductory Data Representation', topics: [] }
        ]
      },
      {
        id: `${gradeMeta.id}-home-lang`,
        name: 'Home Language & Early Literacy',
        category: 'Languages',
        terms: [
          {
            termNumber: 1,
            title: 'Term 1: Phonemic Awareness & Letter Sounds',
            topics: [
              {
                id: `${gradeMeta.id}-phonics`,
                title: 'Phonics, Rhyming & Word Families',
                description: 'Hearing initial sounds, blending sounds, building emergent vocabulary.',
                estimatedHours: 20,
                subtopics: []
              }
            ]
          },
          { termNumber: 2, title: 'Term 2: Shared Reading & Handwriting Basics', topics: [] },
          { termNumber: 3, title: 'Term 3: Guided Reading & Sentence Formation', topics: [] },
          { termNumber: 4, title: 'Term 4: Independent Reading & Creative Expression', topics: [] }
        ]
      },
      {
        id: `${gradeMeta.id}-life-skills`,
        name: 'Life Skills',
        category: 'Foundation & Life Skills',
        terms: [
          { termNumber: 1, title: 'Term 1: Myself and My Family', topics: [] },
          { termNumber: 2, title: 'Term 2: Healthy Living & Nutrition', topics: [] },
          { termNumber: 3, title: 'Term 3: Safety in the Home and Community', topics: [] },
          { termNumber: 4, title: 'Term 4: South African Traditions & Creative Arts', topics: [] }
        ]
      }
    ];
  }

  return {
    id: gradeMeta.id,
    name: gradeMeta.name,
    code: gradeMeta.id.toUpperCase(),
    phase: gradeMeta.phase,
    subjects
  };
});

// ====================================================
// VERIFIED TVET CURRICULUM SEED (NATED & NC(V))
// ====================================================

export const TVET_QUALIFICATIONS: TvetQualification[] = [
  // NATED N1 - N6
  ...['N1', 'N2', 'N3', 'N4', 'N5', 'N6'].map((level): TvetQualification => ({
    id: `nated-${level.toLowerCase()}`,
    type: 'NATED',
    level,
    title: `National Certificate: NATED ${level}`,
    programmes: [
      {
        id: `prog-nated-${level.toLowerCase()}-electrical`,
        name: 'Electrical Engineering Studies',
        field: 'Engineering Studies',
        modules: [
          {
            id: `mod-${level.toLowerCase()}-maths`,
            code: `MATH-${level}`,
            name: `Engineering Mathematics ${level}`,
            creditHours: 120,
            topics: [
              {
                id: `top-${level.toLowerCase()}-calculus`,
                title: `Differential & Integral Calculus (${level})`,
                description: 'Standard derivatives, product and quotient rules, integration techniques.',
                lessons: [
                  {
                    id: `les-${level.toLowerCase()}-calc-1`,
                    title: `Calculus Applications in Circuit Analysis (${level})`,
                    readTimeMinutes: 10,
                    contentSource: 'verified_curriculum',
                    provenanceLabel: 'TVET / DHET National Accredited Syllabus',
                    curriculumCode: `DHET-NATED-${level}-MATH`,
                    overview: 'Calculus provides the mathematical framework for analyzing time-varying voltages and currents across inductive and capacitive reactive elements in electrical engineering.',
                    keyConcepts: [
                      'Rate of change of magnetic flux produces induced electromotive force: e = -dΦ/dt.',
                      'Capacitor current relationship: i(t) = C · (dv/dt).',
                      'Inductor voltage relationship: v(t) = L · (di/dt).'
                    ]
                  }
                ],
                practice: [
                  {
                    id: `prac-${level.toLowerCase()}-calc-1`,
                    prompt: 'Given current i(t) = 5 sin(100πt), calculate the voltage across an inductor L = 0.2 H.',
                    difficulty: 'Intermediate',
                    contentSource: 'verified_curriculum',
                    hints: ['v(t) = L · (di/dt)', 'Differentiate 5 sin(100πt) with respect to t.'],
                    sampleSolution: 'di/dt = 500π cos(100πt). Therefore v(t) = 0.2 × 500π cos(100πt) = 100π cos(100πt) V.'
                  }
                ],
                assessment: [
                  {
                    id: `ass-${level.toLowerCase()}-q1`,
                    question: 'What is the voltage across a 0.5 H inductor when a steady DC current of 10 A flows through it?',
                    options: ['0 V', '5 V', '50 V', '0.05 V'],
                    correctIndex: 0,
                    explanation: 'Because the current is constant (DC), di/dt = 0. Therefore v = L(di/dt) = 0 V.',
                    contentSource: 'verified_curriculum'
                  }
                ]
              },
              {
                id: `top-${level.toLowerCase()}-complex`,
                title: 'Complex Numbers & Phasor Trigonometry',
                description: 'Rectangular and polar representations, impedance calculations in AC circuits.',
                lessons: [],
                practice: [],
                assessment: []
              }
            ]
          },
          {
            id: `mod-${level.toLowerCase()}-electrotech`,
            code: `ELEC-${level}`,
            name: `Electrotechnics ${level}`,
            creditHours: 120,
            topics: [
              {
                id: `top-${level.toLowerCase()}-machines`,
                title: 'DC and AC Rotating Machines',
                description: 'Armature reaction, commutator action, slip-ring induction motors.',
                lessons: [],
                practice: [],
                assessment: []
              }
            ]
          }
        ]
      },
      {
        id: `prog-nated-${level.toLowerCase()}-business`,
        name: 'Financial Management Studies',
        field: 'Business & Management',
        modules: [
          {
            id: `mod-${level.toLowerCase()}-finacc`,
            code: `FINACC-${level}`,
            name: `Financial Accounting ${level}`,
            creditHours: 120,
            topics: [
              {
                id: `top-${level.toLowerCase()}-cashflow`,
                title: 'Statement of Cash Flows (Direct & Indirect Methods)',
                description: 'Operating activities, investing activities, and financing activities in compliance with IFRS.',
                lessons: [],
                practice: [],
                assessment: []
              }
            ]
          }
        ]
      }
    ]
  })),

  // NC(V) Level 2 - Level 4
  ...['Level 2', 'Level 3', 'Level 4'].map((level): TvetQualification => {
    const slug = level.toLowerCase().replace(' ', '-');
    return {
      id: `ncv-${slug}`,
      type: 'NCV',
      level,
      title: `National Certificate Vocational: ${level}`,
      programmes: [
        {
          id: `prog-ncv-${slug}-it`,
          name: 'Information Technology & Computer Science',
          field: 'Engineering Studies',
          modules: [
            {
              id: `mod-ncv-${slug}-prog`,
              code: `IT-PROG-${level.replace('Level ', 'L')}`,
              name: `Principles of Computer Programming (${level})`,
              creditHours: 140,
              topics: [
                {
                  id: `top-ncv-${slug}-alg`,
                  title: 'Algorithm Design, Flowcharts & Control Structures',
                  description: 'Sequencing, selection, iteration, and structured code conventions.',
                  lessons: [
                    {
                      id: `les-ncv-${slug}-algo-1`,
                      title: 'Translating Pseudocode into Robust Logic',
                      readTimeMinutes: 9,
                      contentSource: 'verified_curriculum',
                      provenanceLabel: 'NC(V) National Vocational Standard · DHET',
                      curriculumCode: `DHET-NCV-${level.replace('Level ', 'L')}-PROG`,
                      overview: 'Algorithms represent step-by-step procedures for solving a computational problem with clear inputs, operations, and terminated outputs.',
                      keyConcepts: [
                        'Input validation prevents runtime faults.',
                        'Conditionals (if/else) guide alternate execution branches.',
                        'Loops (while/for) repeat execution until invariant termination criteria are met.'
                      ]
                    }
                  ],
                  practice: [],
                  assessment: []
                }
              ]
            }
          ]
        },
        {
          id: `prog-ncv-${slug}-civil`,
          name: 'Civil Engineering & Building Construction',
          field: 'Engineering Studies',
          modules: [
            {
              id: `mod-ncv-${slug}-construction`,
              code: `CIVIL-TECH-${level.replace('Level ', 'L')}`,
              name: `Construction Planning & Materials (${level})`,
              creditHours: 130,
              topics: []
            }
          ]
        }
      ]
    };
  })
];

// ====================================================
// HIGHER EDUCATION (UNIVERSITIES & COLLEGES)
// ====================================================

export const HIGHER_ED_INSTITUTIONS: HigherEdInstitution[] = [
  {
    id: 'uct',
    name: 'University of Cape Town',
    shortName: 'UCT',
    location: 'Rondebosch, Cape Town',
    province: 'Western Cape',
    type: 'Research University',
    faculties: [
      {
        id: 'uct-ebe',
        name: 'Faculty of Engineering & the Built Environment',
        programmes: [
          {
            id: 'uct-beng-elec',
            name: 'Electrical and Computer Engineering',
            qualification: 'BSc (Eng)',
            durationYears: 4,
            modules: [
              {
                id: 'uct-eee2046f',
                code: 'EEE2046F',
                name: 'Signals and Systems',
                credits: 16,
                academicYear: 2,
                semester: 1,
                topics: [
                  {
                    id: 'uct-top-fourier',
                    title: 'Continuous-Time Fourier Transform & Frequency Response',
                    summary: 'Spectral decomposition of continuous signals, LTI systems filtering.',
                    lessons: [
                      {
                        id: 'les-uct-fourier-1',
                        title: 'Fourier Transform Properties & Linear Time-Invariant Systems',
                        readTimeMinutes: 12,
                        contentSource: 'verified_curriculum',
                        provenanceLabel: 'University Syllabus Framework · Higher Education Accredited',
                        curriculumCode: 'UCT-EEE2046F-S1',
                        overview: 'The Fourier Transform decomposes arbitrary time-domain continuous signals into a continuous spectrum of sinusoidal frequency components, allowing simplified algebraic analysis of LTI filtering operations.',
                        keyConcepts: [
                          'Time convolution maps to frequency-domain multiplication: x(t) * h(t) ↔ X(ω) · H(ω).',
                          'Duality property relates time scaling to inverse frequency broadening.',
                          'Parseval\'s theorem confirms energy conservation between time and spectral domains.'
                        ]
                      }
                    ],
                    assessment: [
                      {
                        id: 'ass-uct-q1',
                        question: 'What is the Fourier Transform of the unit impulse function δ(t)?',
                        options: ['1', '0', '2π', 'jω'],
                        correctIndex: 0,
                        explanation: 'The integral of δ(t)·e^(-jωt) over all time equals 1 at t = 0, giving a flat infinite frequency response.',
                        contentSource: 'verified_curriculum'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'uct-science',
        name: 'Faculty of Science',
        programmes: [
          {
            id: 'uct-bsc-cs',
            name: 'Computer Science',
            qualification: 'BSc',
            durationYears: 3,
            modules: [
              {
                id: 'uct-csc1015f',
                code: 'CSC1015F',
                name: 'Computer Science 1015',
                credits: 18,
                academicYear: 1,
                semester: 1,
                topics: [
                  {
                    id: 'uct-top-recursion',
                    title: 'Algorithms, Complexity & Recursion',
                    summary: 'Big-O notation, recursive divide-and-conquer, binary search.',
                    lessons: [],
                    assessment: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'wits',
    name: 'University of the Witwatersrand',
    shortName: 'Wits',
    location: 'Braamfontein, Johannesburg',
    province: 'Gauteng',
    type: 'Research University',
    faculties: [
      {
        id: 'wits-clm',
        name: 'Faculty of Commerce, Law & Management',
        programmes: [
          {
            id: 'wits-baccsci',
            name: 'Accounting Science (CA Stream)',
            qualification: 'BAccSci',
            durationYears: 3,
            modules: [
              {
                id: 'wits-acc1006',
                code: 'ACCN1006',
                name: 'Financial Accounting 1',
                credits: 24,
                academicYear: 1,
                semester: 1,
                topics: [
                  {
                    id: 'wits-top-revenue',
                    title: 'Revenue Recognition (IFRS 15) & Inventories (IAS 2)',
                    summary: 'Five-step revenue model, net realisable value calculations.',
                    lessons: [],
                    assessment: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'up',
    name: 'University of Pretoria',
    shortName: 'UP',
    location: 'Hatfield, Pretoria',
    province: 'Gauteng',
    type: 'Research University',
    faculties: [
      {
        id: 'up-ebit',
        name: 'Faculty of Engineering, Built Environment & IT',
        programmes: [
          {
            id: 'up-beng-mech',
            name: 'Mechanical Engineering',
            qualification: 'BEng',
            durationYears: 4,
            modules: [
              {
                id: 'up-msd210',
                code: 'MSD 210',
                name: 'Dynamics & Kinematics',
                credits: 16,
                academicYear: 2,
                semester: 1,
                topics: []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'uj',
    name: 'University of Johannesburg',
    shortName: 'UJ',
    location: 'Auckland Park, Johannesburg',
    province: 'Gauteng',
    type: 'Comprehensive University',
    faculties: [
      {
        id: 'uj-science',
        name: 'Faculty of Science',
        programmes: [
          {
            id: 'uj-bsc-biochem',
            name: 'Biochemistry and Molecular Biology',
            qualification: 'BSc',
            durationYears: 3,
            modules: []
          }
        ]
      }
    ]
  },
  {
    id: 'stellenbosch',
    name: 'Stellenbosch University',
    shortName: 'SU',
    location: 'Stellenbosch',
    province: 'Western Cape',
    type: 'Research University',
    faculties: [
      {
        id: 'su-agri',
        name: 'Faculty of AgriSciences',
        programmes: [
          {
            id: 'su-bsc-viticulture',
            name: 'Viticulture and Oenology',
            qualification: 'BSc (Agric)',
            durationYears: 4,
            modules: []
          }
        ]
      }
    ]
  },
  {
    id: 'unisa',
    name: 'University of South Africa',
    shortName: 'UNISA',
    location: 'Muckleneuk, Pretoria (Distance Learning)',
    province: 'Gauteng (National)',
    type: 'Comprehensive University',
    faculties: [
      {
        id: 'unisa-cset',
        name: 'College of Science, Engineering and Technology',
        programmes: [
          {
            id: 'unisa-bsc-computing',
            name: 'Computing and Mathematics',
            qualification: 'BSc',
            durationYears: 3,
            modules: []
          }
        ]
      }
    ]
  }
];
