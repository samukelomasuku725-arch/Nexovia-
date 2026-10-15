/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BRIGHTPATH ACADEMY - SOUTH AFRICAN CAPS CURRICULUM DATA (PHASE 6)
 * 
 * Structured curriculum model across South African school phases:
 * - Foundation Phase (Grade R–3)
 * - Intermediate Phase (Grade 4–6)
 * - Senior Phase (Grade 7–9)
 * - FET Phase (Grade 10–12)
 * 
 * CRITICAL COMPLIANCE:
 * - All demo content is explicitly marked with SourceClassification = 'DEMO'.
 * - No false claims of official Department of Basic Education affiliation.
 * - Language-aware content model supporting South Africa's 11 official languages.
 */

import { SubjectModel } from '../types/curriculum';

export const CAPS_SUBJECTS_CATALOG: SubjectModel[] = [
  // =========================================================================
  // 1. GRADE 8 MATHEMATICS (SENIOR PHASE)
  // =========================================================================
  {
    id: 'sub-g8-maths',
    code: 'CAPS-SP-MTH-08',
    name: 'Mathematics',
    gradeIds: ['grade-8'],
    phaseIds: ['senior'],
    category: 'Mathematical Sciences',
    description: 'Senior Phase Grade 8 CAPS Mathematics covering Numbers, Operations, Patterns, Algebra, and Geometry.',
    curriculumType: 'CAPS',
    curriculumVersion: '2024.1',
    status: 'PUBLISHED',
    iconName: 'Calculator',
    supportedLanguages: ['en', 'af', 'zu', 'xh', 'nr', 'ss', 'nso', 'st', 'tn', 've', 'ts'],
    terms: [
      {
        termNumber: 1,
        title: 'Term 1: Number Operations & Algebraic Expressions',
        subjectId: 'sub-g8-maths',
        gradeId: 'grade-8',
        recommendedWeeks: 10,
        topics: [
          {
            id: 'top-g8-mth-t1-integers',
            termNumber: 1,
            subjectId: 'sub-g8-maths',
            gradeId: 'grade-8',
            phaseId: 'senior',
            curriculumVersion: '2024.1',
            title: 'Integers & Number Theory',
            description: 'Calculations with positive and negative integers, multiplicative inverses, and additive inverses.',
            estimatedHours: 9,
            order: 1,
            sourceInfo: {
              classification: 'DEMO',
              sourceName: 'Grade 8 CAPS Mathematics Curriculum Blueprint',
              sourceReference: 'Section 3: Numbers, Operations and Relationships',
              verificationStatus: 'demo',
              disclaimer: 'Curriculum blueprint clearly marked as demonstration material.'
            },
            status: 'PUBLISHED',
            learningObjectives: [
              {
                id: 'lo-g8-int-1',
                code: 'G8-MTH-T1-LO1',
                description: 'Add and subtract positive and negative integers using a number line and algebraic rules.',
                taxonomyLevel: 'Applying',
                isMeasurable: true,
                successCriteria: ['Correctly compute (-8) + 12 = 4', 'Explain why subtracting a negative is equivalent to addition']
              },
              {
                id: 'lo-g8-int-2',
                code: 'G8-MTH-T1-LO2',
                description: 'Multiply and divide directed numbers and determine sign outcomes.',
                taxonomyLevel: 'Understanding',
                isMeasurable: true,
                successCriteria: ['Recall rules: (+) × (-) = (-), (-) × (-) = (+)']
              }
            ],
            prerequisites: [],
            subtopics: [
              {
                id: 'sub-g8-int-rules',
                topicId: 'top-g8-mth-t1-integers',
                title: 'Rules of Directed Numbers',
                description: 'Signs and operations with negative values.',
                estimatedHours: 4,
                order: 1,
                status: 'PUBLISHED',
                learningObjectives: [
                  {
                    id: 'lo-sub-g8-int-1',
                    description: 'Determine the sign of multi-step integer expressions.',
                    taxonomyLevel: 'Applying',
                    isMeasurable: true
                  }
                ],
                lessons: [
                  {
                    id: 'les-g8-int-intro',
                    subtopicId: 'sub-g8-int-rules',
                    topicId: 'top-g8-mth-t1-integers',
                    subjectId: 'sub-g8-maths',
                    gradeId: 'grade-8',
                    phaseId: 'senior',
                    termNumber: 1,
                    curriculumVersion: '2024.1',
                    title: 'Understanding Negative Numbers & Real-World Inverses',
                    introduction: 'In everyday life in South Africa, directed numbers appear in temperatures (e.g. Sutherland winters at -6°C), bank account overdrafts, and altitude above/below sea level.',
                    estimatedDurationMinutes: 20,
                    difficulty: 'easy',
                    curriculumReference: 'CAPS Mathematics Grade 8 Term 1 Topic 1.1',
                    order: 1,
                    status: 'PUBLISHED',
                    language: 'en',
                    availableTranslations: ['en', 'af', 'zu', 'xh'],
                    sourceInfo: {
                      classification: 'DEMO',
                      sourceName: 'Grade 8 CAPS Demo Unit',
                      verificationStatus: 'demo',
                      disclaimer: 'Demonstration lesson aligned with CAPS layout.'
                    },
                    practiceItemsCount: 5,
                    learningObjectives: [
                      {
                        id: 'lo-g8-les1-1',
                        description: 'Plot directed numbers on a horizontal number line and calculate their distance from zero.',
                        taxonomyLevel: 'Understanding',
                        isMeasurable: true
                      }
                    ],
                    explanation: [
                      {
                        heading: '1. What is an Integer?',
                        body: 'Integers consist of all positive whole numbers, their negative opposites, and zero: {..., -3, -2, -1, 0, 1, 2, 3, ...}. Fractions and decimals are NOT integers.',
                        keyPoints: [
                          'Every integer has an additive inverse: 5 + (-5) = 0.',
                          'Numbers to the left of 0 are smaller: -10 is smaller than -2.'
                        ]
                      },
                      {
                        heading: '2. Addition and Subtraction of Directed Numbers',
                        body: 'Adding a negative is the same as subtracting: 7 + (-3) = 7 - 3 = 4. Subtracting a negative creates a positive double negation: 5 - (-4) = 5 + 4 = 9.',
                        keyPoints: [
                          'Same sign: add absolute values and keep the sign: (-4) + (-3) = -7',
                          'Opposite signs: take the difference and use the sign of the larger absolute value: (-9) + 4 = -5'
                        ]
                      }
                    ],
                    workedExamples: [
                      {
                        problemStatement: 'Calculate: (-15) + (-8) - (-12).',
                        stepByStepSolution: [
                          'Step 1: Simplify double signs: (-15) - 8 + 12.',
                          'Step 2: Combine negative terms: (-15 - 8) = -23.',
                          'Step 3: Add 12: -23 + 12 = -11.'
                        ],
                        conceptualNote: 'Take operations step-by-step from left to right after clearing double negative signs.'
                      }
                    ],
                    activities: [
                      {
                        id: 'act-g8-int-1',
                        title: 'Altitude & Temperature Problem Solving',
                        instructions: 'A weather station in Drakensberg measures 8°C at noon. By midnight, the temperature drops by 14°C. Calculate the midnight temperature.',
                        type: 'guided_exercise',
                        estimatedMinutes: 8,
                        sampleSolution: '8°C - 14°C = -6°C.'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 'top-g8-mth-t1-algebra',
            termNumber: 1,
            subjectId: 'sub-g8-maths',
            gradeId: 'grade-8',
            phaseId: 'senior',
            curriculumVersion: '2024.1',
            title: 'Algebraic Expressions & Equations',
            description: 'Recognizing variables, constants, coefficients, like and unlike terms, and solving simple linear equations.',
            estimatedHours: 12,
            order: 2,
            sourceInfo: {
              classification: 'DEMO',
              sourceName: 'Grade 8 CAPS Mathematics Section 3: Patterns, Functions & Algebra',
              verificationStatus: 'demo',
              disclaimer: 'Curriculum demo unit with measurable learning objectives.'
            },
            status: 'PUBLISHED',
            learningObjectives: [
              {
                id: 'lo-g8-alg-1',
                code: 'G8-MTH-T1-LO3',
                description: 'Identify the variable, coefficient, constant, and number of terms in an algebraic expression.',
                taxonomyLevel: 'Remembering',
                isMeasurable: true
              },
              {
                id: 'lo-g8-alg-2',
                code: 'G8-MTH-T1-LO4',
                description: 'Add and subtract like terms to simplify linear expressions.',
                taxonomyLevel: 'Applying',
                isMeasurable: true
              },
              {
                id: 'lo-g8-alg-3',
                code: 'G8-MTH-T1-LO5',
                description: 'Solve single-variable linear equations using additive and multiplicative inverses.',
                taxonomyLevel: 'Analyzing',
                isMeasurable: true
              }
            ],
            prerequisites: [
              {
                prerequisiteTopicId: 'top-g8-mth-t1-integers',
                prerequisiteTopicTitle: 'Integers & Number Theory',
                prerequisiteGrade: 'Grade 8',
                subject: 'Mathematics',
                minimumMasteryRequired: 50,
                reason: 'Working with negative coefficients requires mastery of integer sign rules.',
                isCritical: true
              }
            ],
            subtopics: [
              {
                id: 'sub-g8-alg-terms',
                topicId: 'top-g8-mth-t1-algebra',
                title: 'Introduction to Algebraic Expressions',
                description: 'Anatomy of terms, coefficients, variables and like terms.',
                estimatedHours: 6,
                order: 1,
                status: 'PUBLISHED',
                learningObjectives: [
                  {
                    id: 'lo-sub-g8-alg-1',
                    description: 'Combine like terms with positive and negative coefficients.',
                    taxonomyLevel: 'Applying',
                    isMeasurable: true
                  }
                ],
                lessons: [
                  {
                    id: 'les-g8-alg-intro',
                    subtopicId: 'sub-g8-alg-terms',
                    topicId: 'top-g8-mth-t1-algebra',
                    subjectId: 'sub-g8-maths',
                    gradeId: 'grade-8',
                    phaseId: 'senior',
                    termNumber: 1,
                    curriculumVersion: '2024.1',
                    title: 'Variables, Coefficients and Like Terms',
                    introduction: 'Algebra is the universal language of problem solving where unknown quantities are represented by letters (variables) to formulate patterns and rules.',
                    estimatedDurationMinutes: 20,
                    difficulty: 'medium',
                    curriculumReference: 'CAPS Mathematics Grade 8 Term 1 Topic 1.2',
                    order: 1,
                    status: 'PUBLISHED',
                    language: 'en',
                    availableTranslations: ['en', 'af', 'zu', 'xh'],
                    sourceInfo: {
                      classification: 'DEMO',
                      sourceName: 'Grade 8 CAPS Demo Blueprint',
                      verificationStatus: 'demo',
                      disclaimer: 'Curriculum structure provided for South African educational standards.'
                    },
                    practiceItemsCount: 5,
                    learningObjectives: [
                      {
                        id: 'lo-g8-alg-les1',
                        description: 'Differentiate between like terms (same variable and exponent) and unlike terms.',
                        taxonomyLevel: 'Understanding',
                        isMeasurable: true
                      }
                    ],
                    explanation: [
                      {
                        heading: '1. Anatomy of an Algebraic Term',
                        body: 'In the term -7x², -7 is the numerical coefficient, x is the variable, and 2 is the exponent or index.',
                        keyPoints: [
                          'A constant is a term with no variable (e.g. +5).',
                          'Terms are separated ONLY by + and - operations.'
                        ]
                      },
                      {
                        heading: '2. Combining Like Terms',
                        body: 'Only like terms (terms sharing identical variables raised to identical powers) can be added or subtracted. For example, 4x and 3x are like terms (4x + 3x = 7x), but 4x and 3y are unlike terms.',
                        keyPoints: [
                          '3a + 5a = 8a',
                          '2x² + 7x cannot be simplified further because exponents differ.'
                        ]
                      }
                    ],
                    workedExamples: [
                      {
                        problemStatement: 'Simplify: 5x + 3y - 2x + 7y - 4.',
                        stepByStepSolution: [
                          'Step 1: Group like terms together: (5x - 2x) + (3y + 7y) - 4.',
                          'Step 2: Combine x terms: 5x - 2x = 3x.',
                          'Step 3: Combine y terms: 3y + 7y = 10y.',
                          'Step 4: Bring down the constant: 3x + 10y - 4.'
                        ],
                        conceptualNote: 'Remember that terms carry their preceding sign (+ or -) when re-arranging.'
                      }
                    ],
                    activities: [
                      {
                        id: 'act-g8-alg-1',
                        title: 'Identifying Variables and Coefficients',
                        instructions: 'For the expression 4x³ - 9x + 12, state the: (a) number of terms, (b) coefficient of x, (c) constant term.',
                        type: 'guided_exercise',
                        estimatedMinutes: 6,
                        sampleSolution: '(a) 3 terms, (b) -9 (including the sign), (c) +12.'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 2. GRADE 10 MATHEMATICS (FET PHASE)
  // =========================================================================
  {
    id: 'sub-g10-maths',
    code: 'CAPS-FET-MTH-10',
    name: 'Mathematics',
    gradeIds: ['grade-10'],
    phaseIds: ['fet'],
    category: 'Mathematical Sciences',
    description: 'Grade 10 CAPS Mathematics (NSC FET Phase): Algebraic factorization, fractions, quadratic equations, Euclidean geometry, analytical geometry, and trigonometry.',
    curriculumType: 'CAPS',
    curriculumVersion: '2024.1',
    status: 'PUBLISHED',
    iconName: 'Percent',
    supportedLanguages: ['en', 'af', 'zu', 'xh', 'nr', 'ss', 'nso', 'st', 'tn', 've', 'ts'],
    terms: [
      {
        termNumber: 1,
        title: 'Term 1: Number & Algebra',
        subjectId: 'sub-g10-maths',
        gradeId: 'grade-10',
        recommendedWeeks: 11,
        topics: [
          {
            id: 'top-g10-mth-t1-algebra',
            termNumber: 1,
            subjectId: 'sub-g10-maths',
            gradeId: 'grade-10',
            phaseId: 'fet',
            curriculumVersion: '2024.1',
            title: 'Algebra & Factorization',
            description: 'Trinomial factorization, difference of two squares, grouping in pairs, and common monomial factors.',
            estimatedHours: 15,
            order: 1,
            sourceInfo: {
              classification: 'DEMO',
              sourceName: 'Grade 10 CAPS Mathematics Curriculum Statement',
              sourceReference: 'CAPS Section 3: Algebra',
              verificationStatus: 'demo',
              disclaimer: 'Curriculum structure aligned with DBE CAPS topic breakdowns.'
            },
            status: 'PUBLISHED',
            learningObjectives: [
              {
                id: 'lo-g10-alg-1',
                code: 'G10-MTH-T1-LO1',
                description: 'Factorize algebraic expressions by taking out a common factor.',
                taxonomyLevel: 'Applying',
                isMeasurable: true
              },
              {
                id: 'lo-g10-alg-2',
                code: 'G10-MTH-T1-LO2',
                description: 'Factorize difference of two squares expressions: a² - b² = (a - b)(a + b).',
                taxonomyLevel: 'Applying',
                isMeasurable: true
              },
              {
                id: 'lo-g10-alg-3',
                code: 'G10-MTH-T1-LO3',
                description: 'Factorize quadratic trinomials of the form ax² + bx + c where a = 1 and a > 1.',
                taxonomyLevel: 'Analyzing',
                isMeasurable: true
              },
              {
                id: 'lo-g10-alg-4',
                code: 'G10-MTH-T1-LO4',
                description: 'Factorize by grouping terms in pairs or grouping three terms into a perfect square trinomial.',
                taxonomyLevel: 'Evaluating',
                isMeasurable: true
              }
            ],
            prerequisites: [
              {
                prerequisiteTopicId: 'top-g8-mth-t1-algebra',
                prerequisiteTopicTitle: 'Algebraic Expressions & Equations',
                prerequisiteGrade: 'Grade 8/9',
                subject: 'Mathematics',
                minimumMasteryRequired: 60,
                reason: 'Understanding distributive law expansion is required before reverse-engineering factors.',
                isCritical: true
              }
            ],
            subtopics: [
              {
                id: 'sub-g10-alg-trinomials',
                topicId: 'top-g10-mth-t1-algebra',
                title: 'Quadratic Trinomial Factorization',
                description: 'Systematic factoring of trinomials into binomial pairs.',
                estimatedHours: 6,
                order: 1,
                status: 'PUBLISHED',
                learningObjectives: [
                  {
                    id: 'lo-sub-g10-alg-1',
                    description: 'Find two integer factors that multiply to the constant term and sum to the middle linear coefficient.',
                    taxonomyLevel: 'Applying',
                    isMeasurable: true
                  }
                ],
                lessons: [
                  {
                    id: 'les-g10-alg-trinomials-std',
                    subtopicId: 'sub-g10-alg-trinomials',
                    topicId: 'top-g10-mth-t1-algebra',
                    subjectId: 'sub-g10-maths',
                    gradeId: 'grade-10',
                    phaseId: 'fet',
                    termNumber: 1,
                    curriculumVersion: '2024.1',
                    title: 'Factorizing Trinomials of the form x² + bx + c',
                    introduction: 'Trinomial factorization is the core technique required across Grade 10 to Grade 12 for solving quadratic equations, finding parabola x-intercepts, and simplifying rational algebraic expressions.',
                    estimatedDurationMinutes: 25,
                    difficulty: 'medium',
                    curriculumReference: 'CAPS Grade 10 Mathematics Term 1 Topic 1',
                    order: 1,
                    status: 'PUBLISHED',
                    language: 'en',
                    availableTranslations: ['en', 'af', 'zu', 'xh'],
                    sourceInfo: {
                      classification: 'DEMO',
                      sourceName: 'Grade 10 CAPS Reference Document',
                      verificationStatus: 'demo',
                      disclaimer: 'Curriculum structure calibrated for South African Matric standards.'
                    },
                    practiceItemsCount: 5,
                    learningObjectives: [
                      {
                        id: 'lo-g10-les-tri-1',
                        description: 'Factorize trinomials with positive and negative constant terms into two linear binomials.',
                        taxonomyLevel: 'Applying',
                        isMeasurable: true
                      }
                    ],
                    explanation: [
                      {
                        heading: '1. The Factor Principle',
                        body: 'Factoring reverse-engineers binomial multiplication (FOIL). When multiplying (x + p)(x + q), we get x² + (p + q)x + pq. Thus, to factor x² + bx + c, we must find two numbers p and q such that p × q = c and p + q = b.',
                        keyPoints: [
                          'If c > 0: p and q have the SAME sign (matching the sign of b).',
                          'If c < 0: p and q have OPPOSITE signs (the larger absolute factor takes the sign of b).'
                        ]
                      },
                      {
                        heading: '2. Step-by-Step Procedure',
                        body: 'Always check first if a common numerical factor can be extracted before factoring the trinomial.',
                        keyPoints: [
                          'Step 1: Write in descending order: ax² + bx + c.',
                          'Step 2: List factor pairs of c.',
                          'Step 3: Select the pair that sums to b.'
                        ]
                      }
                    ],
                    workedExamples: [
                      {
                        problemStatement: 'Factorize: x² - 5x - 24.',
                        stepByStepSolution: [
                          'Step 1: Look at c = -24. Signs must be opposite (+ and -).',
                          'Step 2: Look at b = -5. The larger factor must be negative.',
                          'Step 3: Factor pairs of 24: (1, 24), (2, 12), (3, 8), (4, 6).',
                          'Step 4: Check difference: +3 and -8 sum to -5 and multiply to -24.',
                          'Step 5: Write factors: (x - 8)(x + 3).'
                        ],
                        conceptualNote: 'Always verify by expanding: (x - 8)(x + 3) = x² + 3x - 8x - 24 = x² - 5x - 24.'
                      }
                    ],
                    activities: [
                      {
                        id: 'act-g10-tri-1',
                        title: 'Target Factor Practice',
                        instructions: 'Factorize the expressions: (a) x² + 7x + 12, (b) x² - 9x + 20, (c) x² + 2x - 15.',
                        type: 'guided_exercise',
                        estimatedMinutes: 10,
                        sampleSolution: '(a) (x + 3)(x + 4), (b) (x - 4)(x - 5), (c) (x + 5)(x - 3).'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 'top-g10-mth-t1-fractions',
            termNumber: 1,
            subjectId: 'sub-g10-maths',
            gradeId: 'grade-10',
            phaseId: 'fet',
            curriculumVersion: '2024.1',
            title: 'Fractions & Ratios',
            description: 'Simplifying algebraic fractions, finding lowest common denominators (LCD), and operations with rational expressions.',
            estimatedHours: 12,
            order: 2,
            sourceInfo: {
              classification: 'DEMO',
              sourceName: 'Grade 10 CAPS Mathematics Curriculum Blueprint',
              verificationStatus: 'demo',
              disclaimer: 'Demonstration content matching South African syllabus.'
            },
            status: 'PUBLISHED',
            learningObjectives: [
              {
                id: 'lo-g10-frac-1',
                code: 'G10-MTH-T1-LO5',
                description: 'Determine the LCD of algebraic denominators including linear and quadratic expressions.',
                taxonomyLevel: 'Analyzing',
                isMeasurable: true
              },
              {
                id: 'lo-g10-frac-2',
                code: 'G10-MTH-T1-LO6',
                description: 'Simplify algebraic fractions by factoring numerators and denominators before canceling common factors.',
                taxonomyLevel: 'Applying',
                isMeasurable: true
              }
            ],
            prerequisites: [
              {
                prerequisiteTopicId: 'top-g10-mth-t1-algebra',
                prerequisiteTopicTitle: 'Algebra & Factorization',
                prerequisiteGrade: 'Grade 10',
                subject: 'Mathematics',
                minimumMasteryRequired: 60,
                reason: 'Factoring trinomials and difference of squares is mandatory to cancel common factors in fractions.',
                isCritical: true
              }
            ],
            subtopics: [
              {
                id: 'sub-g10-frac-ops',
                topicId: 'top-g10-mth-t1-fractions',
                title: 'Simplifying Algebraic Fractions',
                description: 'Reducing rational algebraic expressions.',
                estimatedHours: 5,
                order: 1,
                status: 'PUBLISHED',
                learningObjectives: [
                  {
                    id: 'lo-sub-g10-frac-1',
                    description: 'Factorize numerator and denominator fully and state restrictions where denominator equals zero.',
                    taxonomyLevel: 'Applying',
                    isMeasurable: true
                  }
                ],
                lessons: [
                  {
                    id: 'les-g10-frac-simplify',
                    subtopicId: 'sub-g10-frac-ops',
                    topicId: 'top-g10-mth-t1-fractions',
                    subjectId: 'sub-g10-maths',
                    gradeId: 'grade-10',
                    phaseId: 'fet',
                    termNumber: 1,
                    curriculumVersion: '2024.1',
                    title: 'Simplifying Rational Expressions by Factoring',
                    introduction: 'In algebraic fractions, terms separated by addition or subtraction CANNOT be canceled directly. You must convert both numerator and denominator into products of factors first.',
                    estimatedDurationMinutes: 20,
                    difficulty: 'medium',
                    curriculumReference: 'CAPS Grade 10 Mathematics Term 1 Topic 2',
                    order: 1,
                    status: 'PUBLISHED',
                    language: 'en',
                    availableTranslations: ['en', 'af', 'zu'],
                    sourceInfo: {
                      classification: 'DEMO',
                      sourceName: 'Grade 10 CAPS Demo Unit',
                      verificationStatus: 'demo',
                      disclaimer: 'Demonstration lesson aligned with CAPS layout.'
                    },
                    practiceItemsCount: 5,
                    learningObjectives: [
                      {
                        id: 'lo-g10-les-frac-1',
                        description: 'Factor algebraic expressions and cancel identical factors.',
                        taxonomyLevel: 'Applying',
                        isMeasurable: true
                      }
                    ],
                    explanation: [
                      {
                        heading: '1. Golden Rule of Algebraic Fractions',
                        body: 'NEVER cancel terms that are added or subtracted. Factor completely first, then cancel common FACTORS.',
                        keyPoints: [
                          'Incorrect: In (x² - 4)/(x - 2), canceling the x is an error.',
                          'Correct: Factor numerator: (x - 2)(x + 2) / (x - 2) = x + 2 (for x ≠ 2).'
                        ]
                      }
                    ],
                    workedExamples: [
                      {
                        problemStatement: 'Simplify: (x² + 5x + 6) / (x² - 4).',
                        stepByStepSolution: [
                          'Step 1: Factor numerator trinomial: (x + 2)(x + 3).',
                          'Step 2: Factor denominator difference of squares: (x - 2)(x + 2).',
                          'Step 3: Identify common factor (x + 2) and cancel: (x + 3) / (x - 2).',
                          'Step 4: Note restrictions: x ≠ 2 and x ≠ -2.'
                        ],
                        conceptualNote: 'Restrictions are values that make any denominator in the process zero (undefined).'
                      }
                    ],
                    activities: []
                  }
                ]
              }
            ]
          },
          {
            id: 'top-g10-mth-t1-quadratics',
            termNumber: 1,
            subjectId: 'sub-g10-maths',
            gradeId: 'grade-10',
            phaseId: 'fet',
            curriculumVersion: '2024.1',
            title: 'Quadratic Equations',
            description: 'Solving quadratic equations by factorization using the zero-product principle: a · b = 0 ⇒ a = 0 or b = 0.',
            estimatedHours: 10,
            order: 3,
            sourceInfo: {
              classification: 'DEMO',
              sourceName: 'Grade 10 CAPS Mathematics Curriculum Blueprint',
              verificationStatus: 'demo',
              disclaimer: 'Curriculum structure aligned with South African CAPS standards.'
            },
            status: 'PUBLISHED',
            learningObjectives: [
              {
                id: 'lo-g10-quad-1',
                code: 'G10-MTH-T1-LO7',
                description: 'Apply the Zero Product Property to solve equations in factored form.',
                taxonomyLevel: 'Applying',
                isMeasurable: true
              },
              {
                id: 'lo-g10-quad-2',
                code: 'G10-MTH-T1-LO8',
                description: 'Rearrange equations into standard quadratic form ax² + bx + c = 0 before factoring.',
                taxonomyLevel: 'Analyzing',
                isMeasurable: true
              }
            ],
            prerequisites: [
              {
                prerequisiteTopicId: 'top-g10-mth-t1-algebra',
                prerequisiteTopicTitle: 'Algebra & Factorization',
                prerequisiteGrade: 'Grade 10',
                subject: 'Mathematics',
                minimumMasteryRequired: 65,
                reason: 'Solving quadratic equations requires instant trinomial and difference-of-squares factorization.',
                isCritical: true
              }
            ],
            subtopics: [
              {
                id: 'sub-g10-quad-factor',
                topicId: 'top-g10-mth-t1-quadratics',
                title: 'Solving by Factorization',
                description: 'Standard form equations and root extraction.',
                estimatedHours: 5,
                order: 1,
                status: 'PUBLISHED',
                learningObjectives: [
                  {
                    id: 'lo-sub-g10-quad-1',
                    description: 'Find real roots of standard quadratic equations.',
                    taxonomyLevel: 'Applying',
                    isMeasurable: true
                  }
                ],
                lessons: [
                  {
                    id: 'les-g10-quad-solve',
                    subtopicId: 'sub-g10-quad-factor',
                    topicId: 'top-g10-mth-t1-quadratics',
                    subjectId: 'sub-g10-maths',
                    gradeId: 'grade-10',
                    phaseId: 'fet',
                    termNumber: 1,
                    curriculumVersion: '2024.1',
                    title: 'The Zero Product Principle in Quadratic Equations',
                    introduction: 'If two quantities multiply to equal zero, at least one of them must be zero. This simple mathematical axiom is the key to solving higher-order polynomial equations.',
                    estimatedDurationMinutes: 20,
                    difficulty: 'medium',
                    curriculumReference: 'CAPS Grade 10 Mathematics Term 1 Topic 3',
                    order: 1,
                    status: 'PUBLISHED',
                    language: 'en',
                    availableTranslations: ['en', 'af', 'zu'],
                    sourceInfo: {
                      classification: 'DEMO',
                      sourceName: 'Grade 10 CAPS Demo Unit',
                      verificationStatus: 'demo',
                      disclaimer: 'Demonstration lesson aligned with CAPS layout.'
                    },
                    practiceItemsCount: 5,
                    learningObjectives: [
                      {
                        id: 'lo-g10-les-quad-1',
                        description: 'Write equations in standard form ax² + bx + c = 0 and solve for roots.',
                        taxonomyLevel: 'Applying',
                        isMeasurable: true
                      }
                    ],
                    explanation: [
                      {
                        heading: '1. Standard Quadratic Form',
                        body: 'Before factoring, ALWAYS arrange all terms on one side so that the other side equals zero: ax² + bx + c = 0.',
                        keyPoints: [
                          'A quadratic equation has up to two distinct real solutions.',
                          'Never divide both sides by variable x, as this deletes the solution x = 0.'
                        ]
                      }
                    ],
                    workedExamples: [
                      {
                        problemStatement: 'Solve for x: x² - 3x = 10.',
                        stepByStepSolution: [
                          'Step 1: Move 10 to left side into standard form: x² - 3x - 10 = 0.',
                          'Step 2: Factor the trinomial: (x - 5)(x + 2) = 0.',
                          'Step 3: Apply zero product principle: x - 5 = 0 OR x + 2 = 0.',
                          'Step 4: Solve linear factors: x = 5 or x = -2.'
                        ],
                        conceptualNote: 'Verify both solutions in the original equation.'
                      }
                    ],
                    activities: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 3. GRADE 10 PHYSICAL SCIENCES (FET PHASE)
  // =========================================================================
  {
    id: 'sub-g10-physsci',
    code: 'CAPS-FET-PSC-10',
    name: 'Physical Sciences',
    gradeIds: ['grade-10'],
    phaseIds: ['fet'],
    category: 'Physical & Life Sciences',
    description: 'Grade 10 CAPS Physical Sciences (Physics & Chemistry): Mechanics, Vectors, Newton’s Laws, Electricity, Chemical Systems, and Stoichiometry.',
    curriculumType: 'CAPS',
    curriculumVersion: '2024.1',
    status: 'PUBLISHED',
    iconName: 'Atom',
    supportedLanguages: ['en', 'af', 'zu', 'xh', 'nr', 'ss', 'nso', 'st', 'tn', 've', 'ts'],
    terms: [
      {
        termNumber: 1,
        title: 'Term 1: Mechanics & Vectors',
        subjectId: 'sub-g10-physsci',
        gradeId: 'grade-10',
        recommendedWeeks: 10,
        topics: [
          {
            id: 'top-g10-psc-vectors',
            termNumber: 1,
            subjectId: 'sub-g10-physsci',
            gradeId: 'grade-10',
            phaseId: 'fet',
            curriculumVersion: '2024.1',
            title: 'Vectors & Scalars',
            description: 'Distinguishing scalar and vector physical quantities, vector representation, resultant vectors, and horizontal/vertical resolution.',
            estimatedHours: 8,
            order: 1,
            sourceInfo: {
              classification: 'DEMO',
              sourceName: 'Grade 10 CAPS Physical Sciences Curriculum Statement',
              verificationStatus: 'demo',
              disclaimer: 'Demo CAPS physical science structure.'
            },
            status: 'PUBLISHED',
            learningObjectives: [
              {
                id: 'lo-g10-psc-vec-1',
                description: 'Define scalar as a quantity with magnitude only, and vector as a quantity having magnitude and direction.',
                taxonomyLevel: 'Remembering',
                isMeasurable: true
              },
              {
                id: 'lo-g10-psc-vec-2',
                description: 'Determine the resultant of collinear and perpendicular vectors using Pythagoras and trigonometry.',
                taxonomyLevel: 'Applying',
                isMeasurable: true
              }
            ],
            prerequisites: [],
            subtopics: [
              {
                id: 'sub-g10-psc-vec-def',
                topicId: 'top-g10-psc-vectors',
                title: 'Vector Fundamentals',
                description: 'Representing force, velocity, displacement, and acceleration vectors.',
                estimatedHours: 4,
                order: 1,
                status: 'PUBLISHED',
                learningObjectives: [],
                lessons: [
                  {
                    id: 'les-g10-psc-vec-intro',
                    subtopicId: 'sub-g10-psc-vec-def',
                    topicId: 'top-g10-psc-vectors',
                    subjectId: 'sub-g10-physsci',
                    gradeId: 'grade-10',
                    phaseId: 'fet',
                    termNumber: 1,
                    curriculumVersion: '2024.1',
                    title: 'Vectors vs Scalars in Physical Systems',
                    introduction: 'In physics, specifying magnitude alone is insufficient for quantities like force or velocity. A navigation drone flying at 50 km/h must know its direction to avoid collisions.',
                    estimatedDurationMinutes: 18,
                    difficulty: 'easy',
                    curriculumReference: 'CAPS Physical Sciences Grade 10 Mechanics 1.1',
                    order: 1,
                    status: 'PUBLISHED',
                    language: 'en',
                    availableTranslations: ['en', 'af', 'zu'],
                    sourceInfo: {
                      classification: 'DEMO',
                      sourceName: 'Grade 10 CAPS Demo Physics',
                      verificationStatus: 'demo',
                      disclaimer: 'Curriculum structure aligned with CAPS specifications.'
                    },
                    practiceItemsCount: 4,
                    learningObjectives: [
                      {
                        id: 'lo-g10-psc-les-vec-1',
                        description: 'Categorize common physical quantities as vectors or scalars.',
                        taxonomyLevel: 'Understanding',
                        isMeasurable: true
                      }
                    ],
                    explanation: [
                      {
                        heading: '1. Scalars and Vectors Defined',
                        body: 'Scalar: Physical quantity with magnitude (size) only. Examples: mass (kg), time (s), speed (m/s), distance (m), temperature (°C).\nVector: Physical quantity with BOTH magnitude and direction. Examples: force (N), weight (N downwards), velocity (m/s East), displacement (m), acceleration (m/s²).',
                        keyPoints: [
                          'Distance is scalar; displacement is vector.',
                          'Speed is scalar; velocity is vector.'
                        ]
                      }
                    ],
                    workedExamples: [],
                    activities: []
                  }
                ]
              }
            ]
          },
          {
            id: 'top-g10-psc-newton',
            termNumber: 1,
            subjectId: 'sub-g10-physsci',
            gradeId: 'grade-10',
            phaseId: 'fet',
            curriculumVersion: '2024.1',
            title: "Newton's Laws of Motion",
            description: "Newton's First, Second, and Third Laws of Motion, Free-Body Diagrams (FBD), friction, and net force calculations.",
            estimatedHours: 12,
            order: 2,
            sourceInfo: {
              classification: 'DEMO',
              sourceName: 'Grade 10 CAPS Physical Sciences Curriculum Statement',
              verificationStatus: 'demo',
              disclaimer: 'Demo physics curriculum model.'
            },
            status: 'PUBLISHED',
            learningObjectives: [
              {
                id: 'lo-g10-newt-1',
                description: "State Newton's First Law and explain the physical concept of inertia.",
                taxonomyLevel: 'Understanding',
                isMeasurable: true
              },
              {
                id: 'lo-g10-newt-2',
                description: 'Draw accurate labeled Free-Body Diagrams representing all external forces on a body.',
                taxonomyLevel: 'Applying',
                isMeasurable: true
              },
              {
                id: 'lo-g10-newt-3',
                description: 'Apply F_net = m · a to calculate acceleration, mass, or applied force.',
                taxonomyLevel: 'Applying',
                isMeasurable: true
              }
            ],
            prerequisites: [
              {
                prerequisiteTopicId: 'top-g10-psc-vectors',
                prerequisiteTopicTitle: 'Vectors & Scalars',
                prerequisiteGrade: 'Grade 10',
                subject: 'Physical Sciences',
                minimumMasteryRequired: 60,
                reason: 'Resolving horizontal and vertical force components in FBDs requires vector addition.',
                isCritical: true
              }
            ],
            subtopics: [
              {
                id: 'sub-g10-newt-fbd',
                topicId: 'top-g10-psc-newton',
                title: 'Free-Body Diagrams & Second Law',
                description: 'Free-body analysis and force equations.',
                estimatedHours: 6,
                order: 1,
                status: 'PUBLISHED',
                learningObjectives: [],
                lessons: [
                  {
                    id: 'les-g10-newt-fbd-mastery',
                    subtopicId: 'sub-g10-newt-fbd',
                    topicId: 'top-g10-psc-newton',
                    subjectId: 'sub-g10-physsci',
                    gradeId: 'grade-10',
                    phaseId: 'fet',
                    termNumber: 1,
                    curriculumVersion: '2024.1',
                    title: 'Constructing Free-Body Diagrams (FBD) for Motion',
                    introduction: 'In South African physical science exams, constructing a correct Free-Body Diagram is the foundation for earning full marks in mechanics problems.',
                    estimatedDurationMinutes: 22,
                    difficulty: 'medium',
                    curriculumReference: 'CAPS Physical Sciences Grade 10 Mechanics 1.2',
                    order: 1,
                    status: 'PUBLISHED',
                    language: 'en',
                    availableTranslations: ['en', 'af', 'zu'],
                    sourceInfo: {
                      classification: 'DEMO',
                      sourceName: 'Grade 10 CAPS Demo Physics',
                      verificationStatus: 'demo',
                      disclaimer: 'Curriculum structure aligned with CAPS specifications.'
                    },
                    practiceItemsCount: 4,
                    learningObjectives: [
                      {
                        id: 'lo-g10-les-fbd-1',
                        description: 'Draw a dot representing the object with labeled force arrows pointing away from the dot.',
                        taxonomyLevel: 'Applying',
                        isMeasurable: true
                      }
                    ],
                    explanation: [
                      {
                        heading: '1. Standard Free-Body Diagram Rules',
                        body: 'In an official CAPS exam: (1) represent the object as a single dot, (2) all force vectors must point AWAY from the dot, (3) label every vector clearly with standard notation (F_g for gravity, F_N for normal force, F_app for applied force, f_k for kinetic friction).',
                        keyPoints: [
                          'Never include forces exerted BY the object on other objects.',
                          'Do not attach vectors directly to surfaces in an FBD.'
                        ]
                      }
                    ],
                    workedExamples: [],
                    activities: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 4. GRADE 12 MATHEMATICS (MATRIC FET PHASE)
  // =========================================================================
  {
    id: 'sub-g12-maths',
    code: 'CAPS-FET-MTH-12',
    name: 'Mathematics',
    gradeIds: ['grade-12'],
    phaseIds: ['fet'],
    category: 'Mathematical Sciences',
    description: 'Grade 12 CAPS National Senior Certificate (NSC Matric) Mathematics: Sequences & Series, Functions, Calculus, Trigonometry, and Probability.',
    curriculumType: 'CAPS',
    curriculumVersion: '2024.1',
    status: 'PUBLISHED',
    iconName: 'GraduationCap',
    supportedLanguages: ['en', 'af', 'zu', 'xh', 'nr', 'ss', 'nso', 'st', 'tn', 've', 'ts'],
    terms: [
      {
        termNumber: 1,
        title: 'Term 1: Sequences, Series & Functions',
        subjectId: 'sub-g12-maths',
        gradeId: 'grade-12',
        recommendedWeeks: 10,
        topics: [
          {
            id: 'top-g12-mth-seq',
            termNumber: 1,
            subjectId: 'sub-g12-maths',
            gradeId: 'grade-12',
            phaseId: 'fet',
            curriculumVersion: '2024.1',
            title: 'Sequences & Series',
            description: 'Arithmetic progressions (AP), geometric progressions (GP), sum to infinity of convergent series, and sigma notation.',
            estimatedHours: 12,
            order: 1,
            sourceInfo: {
              classification: 'DEMO',
              sourceName: 'Grade 12 CAPS NSC Mathematics Curriculum',
              verificationStatus: 'demo',
              disclaimer: 'Curriculum structure aligned with Matric exam blueprints.'
            },
            status: 'PUBLISHED',
            learningObjectives: [
              {
                id: 'lo-g12-seq-1',
                description: 'Derive the general term and sum formula for arithmetic and geometric sequences.',
                taxonomyLevel: 'Analyzing',
                isMeasurable: true
              },
              {
                id: 'lo-g12-seq-2',
                description: 'Determine the convergence condition |r| < 1 and evaluate sum to infinity: S_∞ = a / (1 - r).',
                taxonomyLevel: 'Evaluating',
                isMeasurable: true
              }
            ],
            prerequisites: [],
            subtopics: [
              {
                id: 'sub-g12-seq-geom',
                topicId: 'top-g12-mth-seq',
                title: 'Geometric Sequences & Sum to Infinity',
                description: 'Common ratios and convergence criteria.',
                estimatedHours: 6,
                order: 1,
                status: 'PUBLISHED',
                learningObjectives: [],
                lessons: [
                  {
                    id: 'les-g12-seq-geom-inf',
                    subtopicId: 'sub-g12-seq-geom',
                    topicId: 'top-g12-mth-seq',
                    subjectId: 'sub-g12-maths',
                    gradeId: 'grade-12',
                    phaseId: 'fet',
                    termNumber: 1,
                    curriculumVersion: '2024.1',
                    title: 'Convergence and Sum to Infinity in Geometric Series',
                    introduction: 'In matric exam Paper 1, question 2 and 3 regularly assess geometric series where consecutive terms decrease towards zero.',
                    estimatedDurationMinutes: 25,
                    difficulty: 'hard',
                    curriculumReference: 'CAPS NSC Mathematics Grade 12 Term 1 Topic 1',
                    order: 1,
                    status: 'PUBLISHED',
                    language: 'en',
                    availableTranslations: ['en', 'af', 'zu'],
                    sourceInfo: {
                      classification: 'DEMO',
                      sourceName: 'Grade 12 CAPS Demo Unit',
                      verificationStatus: 'demo',
                      disclaimer: 'Curriculum structure provided for South African NSC examinations.'
                    },
                    practiceItemsCount: 4,
                    learningObjectives: [],
                    explanation: [
                      {
                        heading: '1. Condition for Convergence',
                        body: 'A geometric series converges to a finite sum as n → ∞ IF AND ONLY IF the common ratio satisfies -1 < r < 1 (i.e. |r| < 1). If |r| ≥ 1, the series diverges.',
                        keyPoints: [
                          'Formula: S_∞ = a / (1 - r)',
                          'Here a is the first term, and r is the common ratio: r = T₂ / T₁.'
                        ]
                      }
                    ],
                    workedExamples: [],
                    activities: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 5. GRADE 4 NATURAL SCIENCES & TECHNOLOGY (INTERMEDIATE PHASE)
  // =========================================================================
  {
    id: 'sub-g4-nst',
    code: 'CAPS-IP-NST-04',
    name: 'Natural Sciences & Technology',
    gradeIds: ['grade-4'],
    phaseIds: ['intermediate'],
    category: 'Physical & Life Sciences',
    description: 'Intermediate Phase Grade 4 CAPS: Living & Non-living Things, Structures, Materials, Energy, and Earth & Beyond.',
    curriculumType: 'CAPS',
    curriculumVersion: '2024.1',
    status: 'PUBLISHED',
    iconName: 'Leaf',
    supportedLanguages: ['en', 'af', 'zu', 'xh', 'nr', 'ss', 'nso', 'st', 'tn', 've', 'ts'],
    terms: [
      {
        termNumber: 1,
        title: 'Term 1: Life & Living: Plants & Animals',
        subjectId: 'sub-g4-nst',
        gradeId: 'grade-4',
        recommendedWeeks: 10,
        topics: [
          {
            id: 'top-g4-nst-living',
            termNumber: 1,
            subjectId: 'sub-g4-nst',
            gradeId: 'grade-4',
            phaseId: 'intermediate',
            curriculumVersion: '2024.1',
            title: 'Living and Non-Living Things',
            description: 'The seven life processes that distinguish living organisms from non-living matter.',
            estimatedHours: 8,
            order: 1,
            sourceInfo: {
              classification: 'DEMO',
              sourceName: 'Grade 4 CAPS NST Curriculum Blueprint',
              verificationStatus: 'demo',
              disclaimer: 'Intermediate Phase demonstration curriculum structure.'
            },
            status: 'PUBLISHED',
            learningObjectives: [
              {
                id: 'lo-g4-nst-1',
                description: 'Identify the 7 life processes: movement, reproduction, sensitivity, growth, respiration, excretion, nutrition (MRS GREN).',
                taxonomyLevel: 'Remembering',
                isMeasurable: true
              }
            ],
            prerequisites: [],
            subtopics: [
              {
                id: 'sub-g4-nst-processes',
                topicId: 'top-g4-nst-living',
                title: 'The Seven Life Processes',
                description: 'Fundamental biological characteristics.',
                estimatedHours: 4,
                order: 1,
                status: 'PUBLISHED',
                learningObjectives: [],
                lessons: [
                  {
                    id: 'les-g4-nst-processes',
                    subtopicId: 'sub-g4-nst-processes',
                    topicId: 'top-g4-nst-living',
                    subjectId: 'sub-g4-nst',
                    gradeId: 'grade-4',
                    phaseId: 'intermediate',
                    termNumber: 1,
                    curriculumVersion: '2024.1',
                    title: 'How to Tell if Something is Alive (MRS GREN)',
                    introduction: 'In nature around our homes and schools, we see rocks, plants, water, insects, and soil. How do scientists determine what is truly living?',
                    estimatedDurationMinutes: 15,
                    difficulty: 'easy',
                    curriculumReference: 'CAPS NST Grade 4 Term 1 Topic 1',
                    order: 1,
                    status: 'PUBLISHED',
                    language: 'en',
                    availableTranslations: ['en', 'af', 'zu', 'xh'],
                    sourceInfo: {
                      classification: 'DEMO',
                      sourceName: 'Grade 4 CAPS Demo',
                      verificationStatus: 'demo',
                      disclaimer: 'Demonstration lesson aligned with CAPS layout.'
                    },
                    practiceItemsCount: 3,
                    learningObjectives: [],
                    explanation: [
                      {
                        heading: '1. The Seven Signs of Life',
                        body: 'All living things perform seven essential functions: Movement, Respiration, Sensitivity to surroundings, Growth, Reproduction, Excretion of waste, and Nutrition.',
                        keyPoints: [
                          'Plants also move (growing towards sunlight) and feed (making food via photosynthesis).',
                          'A car moves and consumes fuel, but it does NOT reproduce or grow, so it is non-living.'
                        ]
                      }
                    ],
                    workedExamples: [],
                    activities: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 6. GRADE R (FOUNDATION PHASE RECEPTION YEAR)
  // =========================================================================
  {
    id: 'sub-gr-numeracy',
    code: 'CAPS-FP-NUM-00',
    name: 'Mathematics (Emergent Numeracy)',
    gradeIds: ['grade-r'],
    phaseIds: ['foundation'],
    category: 'Mathematical Sciences',
    description: 'Grade R Foundation Phase CAPS: Emergent counting, spatial awareness, shapes, and patterns.',
    curriculumType: 'CAPS',
    curriculumVersion: '2024.1',
    status: 'PUBLISHED',
    iconName: 'Sparkles',
    supportedLanguages: ['en', 'af', 'zu', 'xh', 'nr', 'ss', 'nso', 'st', 'tn', 've', 'ts'],
    terms: [
      {
        termNumber: 1,
        title: 'Term 1: Counting & Spatial Relations',
        subjectId: 'sub-gr-numeracy',
        gradeId: 'grade-r',
        recommendedWeeks: 10,
        topics: [
          {
            id: 'top-gr-num-count',
            termNumber: 1,
            subjectId: 'sub-gr-numeracy',
            gradeId: 'grade-r',
            phaseId: 'foundation',
            curriculumVersion: '2024.1',
            title: 'Numbers and Counting 1 to 10',
            description: 'One-to-one correspondence, counting objects, and number rhymes.',
            estimatedHours: 8,
            order: 1,
            sourceInfo: {
              classification: 'DEMO',
              sourceName: 'Grade R CAPS Foundation Blueprint',
              verificationStatus: 'demo',
              disclaimer: 'Early childhood demonstration curriculum.'
            },
            status: 'PUBLISHED',
            learningObjectives: [
              {
                id: 'lo-gr-num-1',
                description: 'Count forwards and backwards from 1 to 10 using fingers, beads, and rhythmic rhymes.',
                taxonomyLevel: 'Remembering',
                isMeasurable: true
              }
            ],
            prerequisites: [],
            subtopics: [
              {
                id: 'sub-gr-count-objects',
                topicId: 'top-gr-num-count',
                title: 'Counting Objects 1 to 5',
                description: 'Matching number names to concrete objects.',
                estimatedHours: 4,
                order: 1,
                status: 'PUBLISHED',
                learningObjectives: [],
                lessons: [
                  {
                    id: 'les-gr-num-1to5',
                    subtopicId: 'sub-gr-count-objects',
                    topicId: 'top-gr-num-count',
                    subjectId: 'sub-gr-numeracy',
                    gradeId: 'grade-r',
                    phaseId: 'foundation',
                    termNumber: 1,
                    curriculumVersion: '2024.1',
                    title: 'Counting 1 to 5 with Animals and Fruit',
                    introduction: 'Let us count the animals and fruits! Count along: One protea, two lions, three apples, four birds, five stars!',
                    estimatedDurationMinutes: 10,
                    difficulty: 'easy',
                    curriculumReference: 'CAPS Foundation Phase Grade R Term 1 Numeracy',
                    order: 1,
                    status: 'PUBLISHED',
                    language: 'en',
                    availableTranslations: ['en', 'af', 'zu', 'xh'],
                    sourceInfo: {
                      classification: 'DEMO',
                      sourceName: 'Grade R CAPS Demo',
                      verificationStatus: 'demo',
                      disclaimer: 'Demonstration foundation lesson.'
                    },
                    practiceItemsCount: 3,
                    learningObjectives: [],
                    explanation: [
                      {
                        heading: '1. One-to-One Counting',
                        body: 'Touch each object once as you say the number out loud.',
                        keyPoints: [
                          '1, 2, 3, 4, 5!',
                          'The last number you say tells you how many there are in total.'
                        ]
                      }
                    ],
                    workedExamples: [],
                    activities: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
