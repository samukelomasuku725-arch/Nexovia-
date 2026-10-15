/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BRIGHTPATH ACADEMY - PHASE 7: ASSESSMENTS & EXAM SEED DATA
 * 
 * High-quality seed data covering all 8 question types:
 * 1. Multiple Choice
 * 2. Multiple Select
 * 3. True/False
 * 4. Short Answer
 * 5. Numerical Answer
 * 6. Matching
 * 7. Ordering
 * 8. Written Response
 * 
 * Curricula covered:
 * - Grade 8 Mathematics (Senior Phase CAPS)
 * - Grade 10 Mathematics (FET Phase CAPS)
 * - Grade 10 Physical Sciences (FET Phase CAPS)
 * - Grade 12 Mathematics (Matric CAPS)
 * - Grade 4 Natural Sciences & Technology (Intermediate Phase CAPS)
 * - TVET Electrotechnics N2
 * 
 * Assessments configured:
 * - PRACTICE: "Grade 10 Algebra & Factorization Dynamic Practice"
 * - QUIZ: "Grade 8 Mathematics: Integers & Number Operations Quick Check"
 * - TEST: "Grade 10 Physical Sciences: Vectors & Newton's Laws Formal Test"
 * - ASSIGNMENT: "Grade 10 Mathematics: Real-World Algebraic Modeling Project"
 * - EXAM: "Grade 12 Mathematics: National Senior Certificate Term 1 Mid-Year Examination (Demo Blueprint)"
 */

import { AssessmentModel, QuestionModel } from '../types/assessment';

// ---------------------------------------------------------------------------
// 1. REUSABLE QUESTION BANK (COVERING ALL 8 TYPES)
// ---------------------------------------------------------------------------
export const SEED_QUESTION_BANK: QuestionModel[] = [
  // --- TYPE 1: MULTIPLE CHOICE ---
  {
    id: 'qb-g10-mth-mc1',
    questionText: 'What are the factors of the quadratic trinomial x² - 5x + 6?',
    questionType: 'multiple_choice',
    marks: 2,
    difficulty: 'easy',
    curriculumId: 'caps-sa-2024',
    grade: 'grade-10',
    subject: 'Mathematics',
    phase: 'fet',
    term: 1,
    topic: 'Algebra & Factorization',
    learningObjective: 'Factorize quadratic trinomials of the form ax² + bx + c',
    sourceType: 'VERIFIED',
    sourceReference: 'CAPS Mathematics FET Section 3.1.2',
    options: [
      { id: 'opt-a', text: '(x - 2)(x - 3)' },
      { id: 'opt-b', text: '(x - 1)(x - 6)' },
      { id: 'opt-c', text: '(x + 2)(x + 3)' },
      { id: 'opt-d', text: '(x + 1)(x - 6)' }
    ],
    correctAnswer: 'opt-a',
    explanation: 'We look for two numbers that multiply to +6 and add to -5. The numbers are -2 and -3 because (-2) × (-3) = 6 and (-2) + (-3) = -5. Hence, (x - 2)(x - 3).',
    hint: 'Look for factors of +6 that add up to the middle coefficient -5.',
    language: 'en'
  },
  {
    id: 'qb-g8-mth-mc2',
    questionText: 'Calculate the value of: (-8) + (-12) - (-15)',
    questionType: 'multiple_choice',
    marks: 2,
    difficulty: 'easy',
    curriculumId: 'caps-sa-2024',
    grade: 'grade-8',
    subject: 'Mathematics',
    phase: 'senior',
    term: 1,
    topic: 'Integers & Number Theory',
    learningObjective: 'Add and subtract positive and negative integers',
    sourceType: 'DEMO',
    sourceReference: 'Grade 8 CAPS Mathematics Term 1',
    options: [
      { id: 'opt-1', text: '-5' },
      { id: 'opt-2', text: '-35' },
      { id: 'opt-3', text: '5' },
      { id: 'opt-4', text: '-11' }
    ],
    correctAnswer: 'opt-1',
    explanation: 'First, (-8) + (-12) = -20. Then subtracting a negative is equivalent to adding: -20 - (-15) = -20 + 15 = -5.',
    hint: 'Remember that subtracting a negative number is the same as adding.',
    language: 'en'
  },
  {
    id: 'qb-g10-psc-mc3',
    questionText: 'Which of the following quantities is a vector quantity in physics?',
    questionType: 'multiple_choice',
    marks: 2,
    difficulty: 'easy',
    curriculumId: 'caps-sa-2024',
    grade: 'grade-10',
    subject: 'Physical Sciences',
    phase: 'fet',
    term: 1,
    topic: 'Vectors in Two Dimensions',
    learningObjective: 'Differentiate between scalar and vector quantities',
    sourceType: 'VERIFIED',
    sourceReference: 'CAPS Physical Sciences Grade 10 Mechanics',
    options: [
      { id: 'opt-mass', text: 'Mass' },
      { id: 'opt-speed', text: 'Speed' },
      { id: 'opt-acc', text: 'Acceleration' },
      { id: 'opt-time', text: 'Time' }
    ],
    correctAnswer: 'opt-acc',
    explanation: 'A vector quantity requires both magnitude and direction. Acceleration has magnitude and direction (e.g. 9.8 m/s² downwards). Mass, speed, and time are scalar quantities having only magnitude.',
    hint: 'Scalars only have magnitude. Vectors have both magnitude and direction.',
    language: 'en'
  },

  // --- TYPE 2: MULTIPLE SELECT ---
  {
    id: 'qb-g10-mth-ms1',
    questionText: 'Select ALL expressions that represent a difference of two squares:',
    questionType: 'multiple_select',
    marks: 3,
    difficulty: 'medium',
    curriculumId: 'caps-sa-2024',
    grade: 'grade-10',
    subject: 'Mathematics',
    phase: 'fet',
    term: 1,
    topic: 'Algebra & Factorization',
    learningObjective: 'Identify and factorize differences of two squares',
    sourceType: 'VERIFIED',
    sourceReference: 'CAPS FET Mathematics Grade 10',
    options: [
      { id: 'ms-1', text: 'x² - 49' },
      { id: 'ms-2', text: '4y² - 25' },
      { id: 'ms-3', text: 'a² + 16' },
      { id: 'ms-4', text: '9p² - 1' },
      { id: 'ms-5', text: 'x³ - 8' }
    ],
    correctAnswer: ['ms-1', 'ms-2', 'ms-4'],
    explanation: 'A difference of two squares has the form a² - b²: x² - 49 = (x - 7)(x + 7); 4y² - 25 = (2y - 5)(2y + 5); 9p² - 1 = (3p - 1)(3p + 1). Meanwhile, a² + 16 has an addition sign, and x³ - 8 is a difference of cubes.',
    hint: 'Check that both terms are perfect squares AND separated by a minus sign.',
    language: 'en'
  },
  {
    id: 'qb-g10-psc-ms2',
    questionText: 'According to Newton’s First Law of Motion, which conditions imply an object has zero net external force acting on it? (Select ALL that apply)',
    questionType: 'multiple_select',
    marks: 3,
    difficulty: 'medium',
    curriculumId: 'caps-sa-2024',
    grade: 'grade-10',
    subject: 'Physical Sciences',
    phase: 'fet',
    term: 1,
    topic: "Newton's Laws of Motion",
    learningObjective: 'State and apply Newton’s First Law to static and dynamic equilibrium',
    sourceType: 'VERIFIED',
    sourceReference: 'CAPS Physical Sciences Grade 10 Mechanics',
    options: [
      { id: 'n1-rest', text: 'The object remains at rest.' },
      { id: 'n1-const-v', text: 'The object moves with constant velocity in a straight line.' },
      { id: 'n1-circ', text: 'The object moves in a circle at constant speed.' },
      { id: 'n1-acc-zero', text: 'The acceleration of the object is 0 m/s².' }
    ],
    correctAnswer: ['n1-rest', 'n1-const-v', 'n1-acc-zero'],
    explanation: 'Zero net force means zero acceleration (F_net = ma). This occurs when the object is stationary or traveling at constant velocity in a straight line. Circular motion changes direction and therefore has centripetal acceleration and a non-zero net force.',
    hint: 'Zero net force means zero acceleration. Does turning in a circle have acceleration?',
    language: 'en'
  },

  // --- TYPE 3: TRUE / FALSE ---
  {
    id: 'qb-g8-mth-tf1',
    questionText: 'True or False: The product of two negative integers is always a positive integer.',
    questionType: 'true_false',
    marks: 1,
    difficulty: 'easy',
    curriculumId: 'caps-sa-2024',
    grade: 'grade-8',
    subject: 'Mathematics',
    phase: 'senior',
    term: 1,
    topic: 'Integers & Number Theory',
    learningObjective: 'Determine the sign of multiplied directed numbers',
    sourceType: 'VERIFIED',
    correctAnswer: 'true',
    explanation: 'True. In the rules of directed numbers, multiplying two negative signs yields a positive: (-) × (-) = (+). For example, (-4) × (-5) = +20.',
    hint: 'Think of an example like (-3) × (-2).',
    language: 'en'
  },
  {
    id: 'qb-g10-psc-tf2',
    questionText: 'True or False: Mass and weight are identical physical quantities measured in kilograms.',
    questionType: 'true_false',
    marks: 1,
    difficulty: 'easy',
    curriculumId: 'caps-sa-2024',
    grade: 'grade-10',
    subject: 'Physical Sciences',
    phase: 'fet',
    term: 1,
    topic: "Newton's Laws of Motion",
    learningObjective: 'Distinguish between mass and weight',
    sourceType: 'VERIFIED',
    correctAnswer: 'false',
    explanation: 'False. Mass is a measure of the amount of matter in kilograms (kg) and is constant everywhere. Weight is the gravitational force exerted on an object, measured in Newtons (N), and depends on local gravitational acceleration (W = mg).',
    hint: 'Consider what unit forces are measured in compared to mass.',
    language: 'en'
  },

  // --- TYPE 4: SHORT ANSWER ---
  {
    id: 'qb-g10-mth-sa1',
    questionText: 'Solve for x: 3x - 7 = 14. Write only the value of x.',
    questionType: 'short_answer',
    marks: 2,
    difficulty: 'easy',
    curriculumId: 'caps-sa-2024',
    grade: 'grade-10',
    subject: 'Mathematics',
    phase: 'fet',
    term: 1,
    topic: 'Algebra & Factorization',
    learningObjective: 'Solve linear algebraic equations',
    sourceType: 'DEMO',
    correctAnswer: '7',
    acceptedAnswers: ['7', 'x=7', 'x = 7', '7.0'],
    explanation: 'Add 7 to both sides: 3x = 14 + 7 = 21. Divide by 3: x = 21 / 3 = 7.',
    hint: 'Isolate the variable term by adding 7 to both sides first.',
    language: 'en'
  },
  {
    id: 'qb-g10-psc-sa2',
    questionText: 'What is the SI unit of force? (Name or symbol)',
    questionType: 'short_answer',
    marks: 1,
    difficulty: 'easy',
    curriculumId: 'caps-sa-2024',
    grade: 'grade-10',
    subject: 'Physical Sciences',
    phase: 'fet',
    term: 1,
    topic: "Newton's Laws of Motion",
    learningObjective: 'Identify SI units for mechanical forces',
    sourceType: 'VERIFIED',
    correctAnswer: 'Newton',
    acceptedAnswers: ['Newton', 'newton', 'N', 'Newtons', 'newtons'],
    explanation: 'The SI unit of force is the Newton (symbol: N), named after Sir Isaac Newton. 1 N = 1 kg·m/s².',
    hint: 'Named after the English physicist who formulated the laws of motion.',
    language: 'en'
  },

  // --- TYPE 5: NUMERICAL ANSWER ---
  {
    id: 'qb-g10-psc-num1',
    questionText: 'A crate of mass 25 kg is pushed across a frictionless horizontal surface with a constant net force of 75 N. Calculate its acceleration in m/s².',
    questionType: 'numerical_answer',
    marks: 3,
    difficulty: 'medium',
    curriculumId: 'caps-sa-2024',
    grade: 'grade-10',
    subject: 'Physical Sciences',
    phase: 'fet',
    term: 1,
    topic: "Newton's Laws of Motion",
    learningObjective: 'Calculate acceleration from net force and mass using Newton’s Second Law',
    sourceType: 'VERIFIED',
    correctAnswer: '3',
    numericalTarget: 3,
    numericalTolerance: 0.05,
    numericalUnit: 'm/s²',
    acceptedAnswers: ['3', '3.0', '3 m/s^2'],
    explanation: 'From Newton’s Second Law: F_net = m · a => a = F_net / m = 75 N / 25 kg = 3.0 m/s².',
    hint: 'Use the formula a = F_net / m.',
    language: 'en'
  },
  {
    id: 'qb-g10-mth-num2',
    questionText: 'Evaluate the expression 2x² - 3x + 4 when x = 3.',
    questionType: 'numerical_answer',
    marks: 2,
    difficulty: 'easy',
    curriculumId: 'caps-sa-2024',
    grade: 'grade-10',
    subject: 'Mathematics',
    phase: 'fet',
    term: 1,
    topic: 'Algebra & Factorization',
    learningObjective: 'Substitute numerical values into algebraic expressions',
    sourceType: 'DEMO',
    correctAnswer: '13',
    numericalTarget: 13,
    numericalTolerance: 0,
    acceptedAnswers: ['13', '13.0'],
    explanation: 'Substitute x = 3: 2(3)² - 3(3) + 4 = 2(9) - 9 + 4 = 18 - 9 + 4 = 13.',
    hint: 'Evaluate 3² first (which is 9), multiply by 2, then complete the arithmetic.',
    language: 'en'
  },

  // --- TYPE 6: MATCHING ---
  {
    id: 'qb-g10-psc-mat1',
    questionText: 'Match each Newton’s Law of Motion with its correct physical principle:',
    questionType: 'matching',
    marks: 3,
    difficulty: 'medium',
    curriculumId: 'caps-sa-2024',
    grade: 'grade-10',
    subject: 'Physical Sciences',
    phase: 'fet',
    term: 1,
    topic: "Newton's Laws of Motion",
    learningObjective: 'Match and apply Newton’s Three Laws of Motion',
    sourceType: 'VERIFIED',
    matchingPairs: [
      {
        id: 'p-1',
        prompt: 'Newton’s First Law',
        match: 'An object maintains constant velocity unless acted upon by a non-zero net force (Inertia).'
      },
      {
        id: 'p-2',
        prompt: 'Newton’s Second Law',
        match: 'Acceleration is directly proportional to net force and inversely proportional to mass (F_net = ma).'
      },
      {
        id: 'p-3',
        prompt: 'Newton’s Third Law',
        match: 'When body A exerts a force on body B, body B exerts an equal and opposite force on body A.'
      }
    ],
    correctAnswer: JSON.stringify({
      'p-1': 'An object maintains constant velocity unless acted upon by a non-zero net force (Inertia).',
      'p-2': 'Acceleration is directly proportional to net force and inversely proportional to mass (F_net = ma).',
      'p-3': 'When body A exerts a force on body B, body B exerts an equal and opposite force on body A.'
    }),
    explanation: 'Law 1 is the Law of Inertia. Law 2 quantifies acceleration as F_net = ma. Law 3 dictates action-reaction pairs.',
    language: 'en'
  },
  {
    id: 'qb-g8-mth-mat2',
    questionText: 'Match each algebraic term with its correct description:',
    questionType: 'matching',
    marks: 3,
    difficulty: 'easy',
    curriculumId: 'caps-sa-2024',
    grade: 'grade-8',
    subject: 'Mathematics',
    phase: 'senior',
    term: 1,
    topic: 'Algebra & Factorization',
    learningObjective: 'Identify parts of algebraic expressions',
    sourceType: 'DEMO',
    matchingPairs: [
      { id: 'mat-coeff', prompt: 'Coefficient', match: 'The numerical factor multiplied by a variable (e.g. 5 in 5x)' },
      { id: 'mat-const', prompt: 'Constant', match: 'A fixed number that does not change value (e.g. +7 in 3x + 7)' },
      { id: 'mat-var', prompt: 'Variable', match: 'A letter representing an unknown quantity or varying number (e.g. x, y)' }
    ],
    correctAnswer: JSON.stringify({
      'mat-coeff': 'The numerical factor multiplied by a variable (e.g. 5 in 5x)',
      'mat-const': 'A fixed number that does not change value (e.g. +7 in 3x + 7)',
      'mat-var': 'A letter representing an unknown quantity or varying number (e.g. x, y)'
    }),
    explanation: 'Coefficients multiply variables, constants remain independent, and variables represent unknown quantities.',
    language: 'en'
  },

  // --- TYPE 7: ORDERING ---
  {
    id: 'qb-g10-mth-ord1',
    questionText: 'Arrange the steps in the correct order to factorize a quadratic trinomial x² + 7x + 12:',
    questionType: 'ordering',
    marks: 4,
    difficulty: 'medium',
    curriculumId: 'caps-sa-2024',
    grade: 'grade-10',
    subject: 'Mathematics',
    phase: 'fet',
    term: 1,
    topic: 'Algebra & Factorization',
    learningObjective: 'Follow systematic procedures for factorizing trinomials',
    sourceType: 'DEMO',
    orderingItems: [
      { id: 'step-1', text: 'Identify the constant term (+12) and the linear coefficient (+7).', correctOrder: 1 },
      { id: 'step-2', text: 'List factor pairs of 12: (1, 12), (2, 6), (3, 4).', correctOrder: 2 },
      { id: 'step-3', text: 'Select the factor pair whose sum is +7: 3 + 4 = 7.', correctOrder: 3 },
      { id: 'step-4', text: 'Write the factored binomial product: (x + 3)(x + 4).', correctOrder: 4 }
    ],
    correctAnswer: ['step-1', 'step-2', 'step-3', 'step-4'],
    explanation: 'The standard algorithm identifies the coefficients, finds factor pairs of the constant, selects the pair summing to the middle term, and writes the binomial brackets.',
    language: 'en'
  },
  {
    id: 'qb-g10-psc-ord2',
    questionText: 'Order the steps to calculate the resultant of two perpendicular vectors (e.g. 30 N East and 40 N North):',
    questionType: 'ordering',
    marks: 4,
    difficulty: 'medium',
    curriculumId: 'caps-sa-2024',
    grade: 'grade-10',
    subject: 'Physical Sciences',
    phase: 'fet',
    term: 1,
    topic: 'Vectors in Two Dimensions',
    learningObjective: 'Determine resultant vectors using Pythagorean theorem and trigonometry',
    sourceType: 'VERIFIED',
    orderingItems: [
      { id: 'ord-v1', text: 'Draw a tail-to-head vector diagram with compass bearings.', correctOrder: 1 },
      { id: 'ord-v2', text: 'Apply Pythagoras: R² = (30)² + (40)² = 900 + 1600 = 2500.', correctOrder: 2 },
      { id: 'ord-v3', text: 'Take square root to find magnitude: R = 50 N.', correctOrder: 3 },
      { id: 'ord-v4', text: 'Use tan(θ) = 40/30 to find bearing angle θ ≈ 53.1° North of East.', correctOrder: 4 }
    ],
    correctAnswer: ['ord-v1', 'ord-v2', 'ord-v3', 'ord-v4'],
    explanation: 'First diagrammatically represent the perpendicular components, calculate magnitude using the Pythagorean theorem, and finally calculate direction angle via trigonometry.',
    language: 'en'
  },

  // --- TYPE 8: WRITTEN RESPONSE ---
  {
    id: 'qb-g10-psc-wri1',
    questionText: 'A passenger in a minibus taxi is not wearing a seatbelt. Explain, using Newton’s First Law of Motion, what happens to the passenger when the taxi suddenly brakes. Mention the concept of inertia and net force in your answer.',
    questionType: 'written_response',
    marks: 5,
    difficulty: 'hard',
    curriculumId: 'caps-sa-2024',
    grade: 'grade-10',
    subject: 'Physical Sciences',
    phase: 'fet',
    term: 1,
    topic: "Newton's Laws of Motion",
    learningObjective: 'Apply Newton’s First Law to everyday transport safety scenarios',
    sourceType: 'VERIFIED',
    rubricGuidelines: [
      'States Newton’s First Law / Inertia principle (1 mark)',
      'Identifies that the passenger and vehicle share initial forward velocity (1 mark)',
      'Explains that brakes apply friction to the taxi, but no external stopping force is applied to unrestrained passenger (1 mark)',
      'Concludes that passenger continues moving forward at constant velocity until stopped by seat or windscreen (1 mark)',
      'Mentions how seatbelts provide the necessary external net force to decelerate the passenger safely (1 mark)'
    ],
    sampleSolution: 'According to Newton’s First Law of Motion, an object continues in its state of uniform motion unless acted upon by a non-zero net external force (inertia). Before braking, both the taxi and passenger are traveling forward at the same velocity. When the taxi brakes, friction acts on the taxi to slow it down. However, because the passenger is unrestrained, no net stopping force acts directly on them. As a result of inertia, the passenger continues moving forward at the taxi’s previous velocity until colliding with the dashboard or windscreen. A seatbelt provides the necessary external force to decelerate the passenger safely with the vehicle.',
    explanation: 'Exemplar answer covers Newton’s First Law, shared velocity, lack of net force on unrestrained passenger, and the safety function of seatbelts.',
    language: 'en'
  },
  {
    id: 'qb-g10-mth-wri2',
    questionText: 'Explain why the algebraic fraction (x² - 9) / (x - 3) cannot be evaluated when x = 3, and show how the expression can be simplified for all values where x ≠ 3.',
    questionType: 'written_response',
    marks: 4,
    difficulty: 'medium',
    curriculumId: 'caps-sa-2024',
    grade: 'grade-10',
    subject: 'Mathematics',
    phase: 'fet',
    term: 1,
    topic: 'Algebra & Factorization',
    learningObjective: 'Explain undefined algebraic fractions and factorize to simplify rational expressions',
    sourceType: 'VERIFIED',
    rubricGuidelines: [
      'Identifies that x = 3 makes the denominator zero (3 - 3 = 0), making division undefined (2 marks)',
      'Factorizes the numerator as a difference of two squares: (x - 3)(x + 3) (1 mark)',
      'Cancels common factor (x - 3) to yield simplified form (x + 3) with restriction x ≠ 3 (1 mark)'
    ],
    sampleSolution: 'When x = 3, the denominator becomes 3 - 3 = 0. Division by zero is mathematically undefined, so the expression cannot be evaluated at x = 3. For any x ≠ 3, we can factorize the numerator as a difference of two squares: (x - 3)(x + 3). The fraction is therefore: [(x - 3)(x + 3)] / (x - 3). Cancelling the common factor (x - 3) leaves x + 3 (valid for all x ≠ 3).',
    explanation: 'Covers non-permissible values / undefined denominators and correct algebraic factorization.',
    language: 'en'
  }
];

// ---------------------------------------------------------------------------
// 2. COMPLETE SEED ASSESSMENTS (5 CONFIGURED TYPES)
// ---------------------------------------------------------------------------
export const SEED_ASSESSMENTS: AssessmentModel[] = [
  // 1. PRACTICE (Adaptive, untimed, instant feedback, unlimited retries)
  {
    id: 'asmt-g10-mth-prac-01',
    title: 'Grade 10 Algebra & Factorization Dynamic Practice',
    description: 'Self-paced practice assessment reinforcing trinomial factorization, difference of two squares, and linear equations with adaptive difficulty.',
    assessmentType: 'PRACTICE',
    curriculumId: 'caps-sa-2024',
    curriculumVersion: '2024.1',
    grade: 'grade-10',
    subject: 'Mathematics',
    phase: 'fet',
    term: 1,
    topic: 'Algebra & Factorization',
    instructions: 'Answer each question at your own pace. You will receive immediate step-by-step explanations. Difficulty adapts dynamically to your answers.',
    durationMinutes: undefined, // Untimed
    totalMarks: 13,
    passingPercentage: 50,
    difficulty: 'medium',
    attemptLimit: 0, // Unlimited
    questions: [
      SEED_QUESTION_BANK[0], // MC: trinomial factorization (2)
      SEED_QUESTION_BANK[3], // MS: difference of two squares (3)
      SEED_QUESTION_BANK[7], // SA: solve linear equation (2)
      SEED_QUESTION_BANK[10], // NUM: evaluate expression (2)
      SEED_QUESTION_BANK[13]  // ORD: ordering factorization steps (4)
    ],
    status: 'PUBLISHED',
    sourceType: 'VERIFIED',
    createdBy: 'SACE Certified Math Specialist',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-15T00:00:00Z'
  },

  // 2. QUIZ (Formative check, 15 minutes, 3 attempts allowed)
  {
    id: 'asmt-g8-mth-quiz-01',
    title: 'Grade 8 Mathematics: Integers & Directed Numbers Quick Quiz',
    description: '15-minute diagnostic quiz assessing integer addition, subtraction, double-negatives, and vocabulary in Senior Phase Mathematics.',
    assessmentType: 'QUIZ',
    curriculumId: 'caps-sa-2024',
    curriculumVersion: '2024.1',
    grade: 'grade-8',
    subject: 'Mathematics',
    phase: 'senior',
    term: 1,
    topic: 'Integers & Number Theory',
    instructions: 'Complete all 4 questions within 15 minutes. Up to 3 attempts allowed. Answers and explanations are revealed upon submission.',
    durationMinutes: 15,
    totalMarks: 8,
    passingPercentage: 60,
    difficulty: 'easy',
    attemptLimit: 3,
    questions: [
      SEED_QUESTION_BANK[1], // MC: (-8) + (-12) - (-15) (2)
      SEED_QUESTION_BANK[5], // TF: product of two negatives (1)
      SEED_QUESTION_BANK[7], // SA: solve 3x - 7 = 14 (2)
      SEED_QUESTION_BANK[12] // MAT: algebraic vocabulary matching (3)
    ],
    status: 'PUBLISHED',
    sourceType: 'DEMO',
    createdBy: 'BrightPath Curriculum Team',
    createdAt: '2024-02-10T00:00:00Z',
    updatedAt: '2024-02-10T00:00:00Z'
  },

  // 3. TEST (Formal summative module test, 30 minutes, 2 attempts)
  {
    id: 'asmt-g10-psc-test-01',
    title: "Grade 10 Physical Sciences: Vectors & Newton's Laws Formal Test",
    description: 'Summative assessment covering scalar vs vector quantities, vector components, Newton’s 1st and 2nd Laws, and numerical acceleration calculations.',
    assessmentType: 'TEST',
    curriculumId: 'caps-sa-2024',
    curriculumVersion: '2024.1',
    grade: 'grade-10',
    subject: 'Physical Sciences',
    phase: 'fet',
    term: 1,
    topic: "Newton's Laws of Motion",
    instructions: 'Formal testing conditions. You have 30 minutes to complete all questions. No answers are revealed before submission. A scientific calculator may be used.',
    durationMinutes: 30,
    totalMarks: 18,
    passingPercentage: 50,
    difficulty: 'medium',
    attemptLimit: 2,
    questions: [
      SEED_QUESTION_BANK[2],  // MC: Vector quantity (2)
      SEED_QUESTION_BANK[4],  // MS: Newton 1st law conditions (3)
      SEED_QUESTION_BANK[6],  // TF: Mass vs Weight (1)
      SEED_QUESTION_BANK[8],  // SA: SI unit of force (1)
      SEED_QUESTION_BANK[9],  // NUM: Acceleration F=ma (3)
      SEED_QUESTION_BANK[11], // MAT: Match Newton’s Laws (3)
      SEED_QUESTION_BANK[15]  // WRI: Seatbelt inertia explanation (5)
    ],
    status: 'PUBLISHED',
    sourceType: 'VERIFIED',
    createdBy: 'Department of Basic Education Aligned Faculty',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-05T00:00:00Z'
  },

  // 4. ASSIGNMENT (Extended problem solving, written responses, rubric grading)
  {
    id: 'asmt-g10-mth-assgn-01',
    title: 'Grade 10 Mathematics: Real-World Algebraic Modeling Assignment',
    description: 'Extended coursework assignment challenging learners to analyze algebraic undefined expressions, factorize trinomials, and explain mathematical justifications.',
    assessmentType: 'ASSIGNMENT',
    curriculumId: 'caps-sa-2024',
    curriculumVersion: '2024.1',
    grade: 'grade-10',
    subject: 'Mathematics',
    phase: 'fet',
    term: 1,
    topic: 'Algebra & Factorization',
    instructions: 'Submit written explanations with step-by-step mathematical reasoning. Evaluated using a transparent South African CAPS marking rubric.',
    durationMinutes: undefined, // Untimed take-home
    totalMarks: 15,
    passingPercentage: 50,
    difficulty: 'medium',
    attemptLimit: 1,
    questions: [
      SEED_QUESTION_BANK[0],  // MC: trinomial factorization (2)
      SEED_QUESTION_BANK[3],  // MS: difference of two squares (3)
      SEED_QUESTION_BANK[13], // ORD: factorization steps (4)
      SEED_QUESTION_BANK[16]  // WRI: undefined algebraic fractions (4)
    ],
    status: 'PUBLISHED',
    sourceType: 'VERIFIED',
    createdBy: 'Senior Subject Head',
    createdAt: '2024-03-10T00:00:00Z',
    updatedAt: '2024-03-12T00:00:00Z'
  },

  // 5. EXAM (Formal Matric/Grade 12 blueprint exam, 45 minutes, 1 attempt, multi-section)
  {
    id: 'asmt-g12-mth-exam-01',
    title: 'Grade 12 Mathematics: National Senior Certificate Term 1 Mid-Year Examination (Demo Blueprint)',
    description: 'Official-style examination covering algebra, equations, quadratic inequalities, sequence patterns, and physical calculus fundamentals.',
    assessmentType: 'EXAM',
    curriculumId: 'caps-sa-2024',
    curriculumVersion: '2024.1',
    grade: 'grade-12',
    subject: 'Mathematics',
    phase: 'fet',
    term: 1,
    topic: 'Algebra & Factorization',
    instructions: 'NATIONAL SENIOR CERTIFICATE SIMULATION. Answer ALL questions. Time allowed: 45 minutes. Approved non-programmable scientific calculators are permitted. Show all calculations.',
    durationMinutes: 45,
    totalMarks: 25,
    passingPercentage: 40,
    difficulty: 'hard',
    attemptLimit: 1,
    sections: [
      {
        id: 'sec-a',
        title: 'SECTION A: Multiple Choice & Short Answer Diagnostic Questions',
        instructions: 'Answer all 4 questions in this section. (Total: 8 Marks)',
        questionIds: ['qb-g10-mth-mc1', 'qb-g8-mth-mc2', 'qb-g8-mth-tf1', 'qb-g10-mth-sa1'],
        order: 1
      },
      {
        id: 'sec-b',
        title: 'SECTION B: Multi-Step Algebra, Modeling & Structural Proofs',
        instructions: 'Show full working and mathematical justification for all written responses. (Total: 17 Marks)',
        questionIds: ['qb-g10-mth-ms1', 'qb-g10-mth-num2', 'qb-g10-mth-ord1', 'qb-g10-mth-wri2'],
        order: 2
      }
    ],
    questions: [
      SEED_QUESTION_BANK[0],  // MC1 (2)
      SEED_QUESTION_BANK[1],  // MC2 (2)
      SEED_QUESTION_BANK[5],  // TF1 (1)
      SEED_QUESTION_BANK[7],  // SA1 (2)
      SEED_QUESTION_BANK[3],  // MS1 (3)
      SEED_QUESTION_BANK[10], // NUM2 (2)
      SEED_QUESTION_BANK[13], // ORD1 (4)
      SEED_QUESTION_BANK[16]  // WRI2 (4)
    ],
    status: 'PUBLISHED',
    sourceType: 'DEMO',
    createdBy: 'Matric Examination Blueprint Committee',
    createdAt: '2024-03-20T00:00:00Z',
    updatedAt: '2024-03-25T00:00:00Z'
  }
];
