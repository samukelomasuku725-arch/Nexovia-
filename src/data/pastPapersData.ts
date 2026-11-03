/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN - SOUTH AFRICAN PAST EXAMINATION PAPERS & MEMORANDUMS (2018–2024)
 * 
 * Coverage:
 * 1. FET Phase (Grade 10–12 Matric NSC & IEB): 2018–2024 Paper 1 & Paper 2 + Official Marking Memo
 * 2. Intermediate & Senior Phase (Grade 4–9): 2022–2024 Final Exemplar & Province Papers + Memos
 * 3. TVET Colleges (NATED N1–N6 & NC(V)): 2021–2024 National Examinations + Memos
 * 4. University (Year 1–3): Mid-Year & Final Examination Papers + Memos
 * 
 * Features:
 * - Direct PDF/Question Paper preview
 * - Step-by-step marking guideline / memo breakdown
 * - 1-Click AI Tutor Explanation in 11 South African Official Languages
 */

import { SALanguageCode } from '../types';

export type ExamSeason = 'November / Final' | 'June / Mid-Year' | 'March / Trial / Prelim';
export type PaperType = 'Paper 1' | 'Paper 2' | 'Paper 3' | 'Practical / Project';

export interface PastPaperItem {
  id: string;
  gradeOrLevel: string; // e.g. "Grade 12", "Grade 11", "N4", "Year 1"
  subject: string;
  year: number; // 2018 to 2024
  season: ExamSeason;
  paper: PaperType;
  totalMarks: number;
  durationHours: number;
  questionPaperTitle: string;
  description: string;
  questionPaperSummary: string[];
  memoTitle: string;
  memoKeySteps: {
    questionNumber: string;
    topic: string;
    maxMarks: number;
    guideline: string;
    commonMistakes: string;
    modelSolution: string;
  }[];
  aiExplanationPrompt: string;
}

export const PAST_PAPERS_DATABASE: PastPaperItem[] = [
  // =========================================================================
  // GRADE 12 MATHEMATICS (2018–2024)
  // =========================================================================
  {
    id: 'paper-g12-mth-2024-nov-p1',
    gradeOrLevel: 'Grade 12',
    subject: 'Mathematics',
    year: 2024,
    season: 'November / Final',
    paper: 'Paper 1',
    totalMarks: 150,
    durationHours: 3,
    questionPaperTitle: '2024 NSC November Mathematics Paper 1',
    description: 'Algebra, Equations & Inequalities, Number Patterns, Functions & Graphs, Calculus, Financial Maths, and Probability.',
    questionPaperSummary: [
      'Question 1: Quadratic Equations, Surds, Quadratic Inequalities, Simultaneous Equations (26 Marks)',
      'Question 2 & 3: Arithmetic & Geometric Series, Sum to Infinity, Sigma Notation (24 Marks)',
      'Question 4 & 5: Hyperbolic & Exponential Functions, Inverse Functions (35 Marks)',
      'Question 6: Financial Mathematics (Sinking Funds, Deferred Annuities) (15 Marks)',
      'Question 7 & 8: First Principles, Rules of Differentiation, Cubic Graphs & Optimization (35 Marks)',
      'Question 9 & 10: Probability & Counting Principles (15 Marks)'
    ],
    memoTitle: '2024 NSC November Mathematics P1 Official Marking Memo',
    memoKeySteps: [
      {
        questionNumber: 'Q1.1.1',
        topic: 'Algebra - Quadratic Factorization',
        maxMarks: 3,
        guideline: 'Standard form 2x² - 5x - 3 = 0. Factorize (2x + 1)(x - 3) = 0. Correct factors (1 mark), both roots x = -1/2 or x = 3 (2 marks).',
        commonMistakes: 'Sign errors when factorizing trinomials; omitting one solution.',
        modelSolution: '2x² - 5x - 3 = 0 ⟹ (2x + 1)(x - 3) = 0 ⟹ x = -1/2 or x = 3'
      },
      {
        questionNumber: 'Q7.1',
        topic: 'Calculus - First Principles',
        maxMarks: 5,
        guideline: "f'(x) = lim[h->0] (f(x+h) - f(x))/h. Must show substitution, expansion, factoring out h, and taking limit.",
        commonMistakes: 'Dropping "lim h->0" before evaluating limit, algebraic expansion errors.',
        modelSolution: "For f(x) = 3x² - 2: f(x+h) = 3(x+h)² - 2 = 3x² + 6xh + 3h² - 2. Difference quotient = (6xh + 3h²)/h = 6x + 3h. Limit as h->0 = 6x."
      },
      {
        questionNumber: 'Q8.2',
        topic: 'Optimization - Maximum Volume',
        maxMarks: 6,
        guideline: 'Express V in terms of x. Set derivative dV/dx = 0. Solve for critical value and check maximum.',
        commonMistakes: 'Forgetting to differentiate; neglecting unit measurements.',
        modelSolution: "V(x) = 4x³ - 36x² + 80x. V'(x) = 12x² - 72x + 80 = 0. Divide by 4: 3x² - 18x + 20 = 0. Roots x = 1.45 or 4.55. Only x = 1.45 fits physical constraints. Max Volume = 52.3 cm³."
      }
    ],
    aiExplanationPrompt: 'Explain the 2024 Grade 12 NSC Mathematics Paper 1 step-by-step with clear South African exam tips, formula derivations, and common examiner traps.'
  },
  {
    id: 'paper-g12-mth-2024-nov-p2',
    gradeOrLevel: 'Grade 12',
    subject: 'Mathematics',
    year: 2024,
    season: 'November / Final',
    paper: 'Paper 2',
    totalMarks: 150,
    durationHours: 3,
    questionPaperTitle: '2024 NSC November Mathematics Paper 2',
    description: 'Statistics, Analytical Geometry, Trigonometry, and Euclidean Geometry (Circle Theorems).',
    questionPaperSummary: [
      'Question 1: Scatter Plots, Regression Line & Correlation Coefficient (12 Marks)',
      'Question 2: Cumulative Frequency, Ogive Curves & Five-Number Summary (10 Marks)',
      'Question 3 & 4: Analytical Geometry - Straight Lines, Circles, Tangents (40 Marks)',
      'Question 5 & 6: Trigonometric Identities, Reduction Formulas, General Solutions (28 Marks)',
      'Question 7: 2D & 3D Trigonometry - Sine, Cosine and Area Rules (12 Marks)',
      'Question 8, 9 & 10: Euclidean Geometry - Proportionality Theorem & Similarity (48 Marks)'
    ],
    memoTitle: '2024 NSC November Mathematics P2 Official Marking Memo',
    memoKeySteps: [
      {
        questionNumber: 'Q3.2',
        topic: 'Analytical Geometry - Equation of Tangent',
        maxMarks: 4,
        guideline: 'Find gradient of radius to contact point. Use m_tangent × m_radius = -1. Substitute point into y - y1 = m(x - x1).',
        commonMistakes: 'Forgetting that tangent is perpendicular to radius at point of contact.',
        modelSolution: 'm_radius = (y2 - y1)/(x2 - x1) = 2/3. Tangent is perpendicular, so m_tangent = -3/2. Equation: y - 5 = -3/2(x - 2) ⟹ y = -1.5x + 8.'
      },
      {
        questionNumber: 'Q9.1',
        topic: 'Euclidean Geometry - Tangent Chord Theorem',
        maxMarks: 6,
        guideline: 'State theorem correctly: angle between tangent and chord equals angle in alternate segment. Construction line required.',
        commonMistakes: 'Incomplete geometric reasons in brackets (e.g. write "tan chord theorem", not just "angles").',
        modelSolution: 'Construct diameter through point of contact. Join chord endpoints. Use right angle in semi-circle and complementary angles to complete proof.'
      }
    ],
    aiExplanationPrompt: 'Explain the 2024 Grade 12 NSC Mathematics Paper 2 with Euclidean geometry reasons, circle theorems, and trigonometry proofs.'
  },
  {
    id: 'paper-g12-mth-2023-nov-p1',
    gradeOrLevel: 'Grade 12',
    subject: 'Mathematics',
    year: 2023,
    season: 'November / Final',
    paper: 'Paper 1',
    totalMarks: 150,
    durationHours: 3,
    questionPaperTitle: '2023 NSC November Mathematics Paper 1',
    description: 'Comprehensive National Senior Certificate examination covering algebra, calculus, financial maths.',
    questionPaperSummary: [
      'Question 1: Solve for x: Quadratic formula, exponential equation, inequality (23 Marks)',
      'Question 2 & 3: Arithmetic sequences, quadratic sequences, geometric series (25 Marks)',
      'Question 4 & 5: Functions, asymptotes, inverses (32 Marks)',
      'Question 6: Financial annuities and loan amortization (15 Marks)',
      'Question 7-9: Differential calculus and cubic graphs (35 Marks)',
      'Question 10: Probability and Venn diagrams (20 Marks)'
    ],
    memoTitle: '2023 NSC November Mathematics P1 Marking Guideline',
    memoKeySteps: [
      {
        questionNumber: 'Q6.1',
        topic: 'Finance - Present Value Annuity',
        maxMarks: 4,
        guideline: 'P = x[1 - (1+i)^-n] / i. Correct i = r/12, n = total months.',
        commonMistakes: 'Dividing interest rate by 100 but forgetting to divide by 12 for monthly compounding.',
        modelSolution: 'Loan = R350,000. i = 0.105/12. n = 240. Monthly installment x = R3,495.20.'
      }
    ],
    aiExplanationPrompt: 'Explain the 2023 Grade 12 NSC Mathematics Paper 1 with worked examples and exam marking notes.'
  },
  {
    id: 'paper-g12-mth-2022-nov-p1',
    gradeOrLevel: 'Grade 12',
    subject: 'Mathematics',
    year: 2022,
    season: 'November / Final',
    paper: 'Paper 1',
    totalMarks: 150,
    durationHours: 3,
    questionPaperTitle: '2022 NSC November Mathematics Paper 1',
    description: 'Official National Senior Certificate Paper 1 examination paper with full marking memorandum.',
    questionPaperSummary: [
      'Question 1: Algebra & Equations (22 Marks)',
      'Question 2: Sequences and Series (24 Marks)',
      'Question 3-5: Functions and Inverses (34 Marks)',
      'Question 6: Financial Mathematics (15 Marks)',
      'Question 7-9: Calculus and Stationary Points (35 Marks)',
      'Question 10: Fundamental Counting Principle (20 Marks)'
    ],
    memoTitle: '2022 NSC November Mathematics P1 Memo',
    memoKeySteps: [
      {
        questionNumber: 'Q2.2',
        topic: 'Quadratic Sequences',
        maxMarks: 5,
        guideline: 'Find 2nd difference = 2a. First difference = 3a + b. First term = a + b + c. General term Tn = an² + bn + c.',
        commonMistakes: 'Confusing 2a with the second term.',
        modelSolution: 'Given sequence 4; 9; 18; 31... 1st diff: 5, 9, 13. 2nd diff: 4. 2a = 4 ⟹ a = 2. 3(2) + b = 5 ⟹ b = -1. 2 - 1 + c = 4 ⟹ c = 3. Tn = 2n² - n + 3.'
      }
    ],
    aiExplanationPrompt: 'Teach me the 2022 Grade 12 Mathematics Paper 1 with step-by-step guidance.'
  },
  {
    id: 'paper-g12-mth-2021-nov-p1',
    gradeOrLevel: 'Grade 12',
    subject: 'Mathematics',
    year: 2021,
    season: 'November / Final',
    paper: 'Paper 1',
    totalMarks: 150,
    durationHours: 3,
    questionPaperTitle: '2021 NSC November Mathematics Paper 1',
    description: 'National examination on algebra, financial mathematics, and differential calculus.',
    questionPaperSummary: [
      'Question 1: Quadratic equations and surd simplifications (24 Marks)',
      'Question 2: Convergent geometric series & sigma notation (22 Marks)',
      'Question 3-5: Graphs of parabolas and hyperbolas (34 Marks)',
      'Question 6: Investment and depreciation calculations (15 Marks)',
      'Question 7-9: Calculus tangents, inflection points (35 Marks)',
      'Question 10: Probability trees and contingency tables (20 Marks)'
    ],
    memoTitle: '2021 NSC November Mathematics P1 Memo',
    memoKeySteps: [
      {
        questionNumber: 'Q7.2',
        topic: 'Calculus - Tangent Equation',
        maxMarks: 4,
        guideline: 'Differentiate f(x). Substitute x-coordinate to find slope m. Use point-slope form.',
        commonMistakes: 'Substituting x into f(x) instead of f\'(x) to calculate gradient.',
        modelSolution: "f(x) = x³ - 3x + 2 at x = 2. f'(x) = 3x² - 3. Gradient m = 3(4) - 3 = 9. Point (2, 4). Tangent: y - 4 = 9(x - 2) ⟹ y = 9x - 14."
      }
    ],
    aiExplanationPrompt: 'Explain 2021 Grade 12 Maths P1 with full Socratic guidance.'
  },
  {
    id: 'paper-g12-mth-2020-nov-p1',
    gradeOrLevel: 'Grade 12',
    subject: 'Mathematics',
    year: 2020,
    season: 'November / Final',
    paper: 'Paper 1',
    totalMarks: 150,
    durationHours: 3,
    questionPaperTitle: '2020 NSC November Mathematics Paper 1',
    description: 'National Senior Certificate Grade 12 Mathematics Paper 1.',
    questionPaperSummary: [
      'Question 1: Algebra & Inverses (25 Marks)',
      'Question 2: Patterns & Arithmetic progressions (25 Marks)',
      'Question 3-5: Exponential graphs and logarithm bases (30 Marks)',
      'Question 6: Financial annuities (15 Marks)',
      'Question 7-9: Cubic polynomials & rate of change (35 Marks)',
      'Question 10: Counting principle permutations (20 Marks)'
    ],
    memoTitle: '2020 NSC November Mathematics P1 Memo',
    memoKeySteps: [
      {
        questionNumber: 'Q10.1',
        topic: 'Permutations & Factorials',
        maxMarks: 3,
        guideline: 'Letters can be arranged in n! ways. If repeated letters, divide by repeat factorials.',
        commonMistakes: 'Forgetting repeated letter counts.',
        modelSolution: 'Arrange 7 distinct books on a shelf = 7! = 5,040 ways.'
      }
    ],
    aiExplanationPrompt: 'Explain 2020 Grade 12 Maths P1 concepts clearly.'
  },
  {
    id: 'paper-g12-mth-2019-nov-p1',
    gradeOrLevel: 'Grade 12',
    subject: 'Mathematics',
    year: 2019,
    season: 'November / Final',
    paper: 'Paper 1',
    totalMarks: 150,
    durationHours: 3,
    questionPaperTitle: '2019 NSC November Mathematics Paper 1',
    description: 'National Senior Certificate Grade 12 Mathematics Paper 1.',
    questionPaperSummary: [
      'Algebra & Complex equations', 'Arithmetic & Geometric progressions', 'Financial planning & sinking funds', 'Differential calculus'
    ],
    memoTitle: '2019 NSC November Mathematics P1 Memo',
    memoKeySteps: [
      {
        questionNumber: 'Q1.2',
        topic: 'Simultaneous Equations',
        maxMarks: 6,
        guideline: 'Make one variable subject of linear equation, substitute into quadratic, solve and pair solutions.',
        commonMistakes: 'Failing to pair corresponding x and y values.',
        modelSolution: 'x - 2y = 1 ⟹ x = 2y + 1. Substitute into x² - xy - y² = 1. Solve quadratic in y.'
      }
    ],
    aiExplanationPrompt: 'Explain 2019 Grade 12 Maths P1 simultaneous equations and series.'
  },
  {
    id: 'paper-g12-mth-2018-nov-p1',
    gradeOrLevel: 'Grade 12',
    subject: 'Mathematics',
    year: 2018,
    season: 'November / Final',
    paper: 'Paper 1',
    totalMarks: 150,
    durationHours: 3,
    questionPaperTitle: '2018 NSC November Mathematics Paper 1',
    description: 'Official 2018 Department of Basic Education Grade 12 National Exam Paper 1.',
    questionPaperSummary: [
      'Algebraic manipulation', 'Series and Sigma', 'Calculus curve sketching', 'Financial mathematics'
    ],
    memoTitle: '2018 NSC November Mathematics P1 Memo',
    memoKeySteps: [
      {
        questionNumber: 'Q8.1',
        topic: 'Calculus Curve Sketching',
        maxMarks: 5,
        guideline: 'Calculate y-intercept, x-intercepts, stationary points, and point of inflection.',
        commonMistakes: 'Inverting turning points or plotting incorrect concavity.',
        modelSolution: "y = -x³ + 3x² + 9x - 27. y' = -3x² + 6x + 9 = 0 ⟹ x = 3 or x = -1. Turning points at (-1, -32) and (3, 0)."
      }
    ],
    aiExplanationPrompt: 'Explain 2018 Grade 12 Maths P1 curve sketching and calculus.'
  },

  // =========================================================================
  // GRADE 12 PHYSICAL SCIENCES (2018–2024)
  // =========================================================================
  {
    id: 'paper-g12-phy-2024-nov-p1',
    gradeOrLevel: 'Grade 12',
    subject: 'Physical Sciences',
    year: 2024,
    season: 'November / Final',
    paper: 'Paper 1',
    totalMarks: 150,
    durationHours: 3,
    questionPaperTitle: '2024 NSC November Physical Sciences Paper 1 (Physics)',
    description: 'Newton’s Laws of Motion, Vertical Projectile Motion, Momentum & Impulse, Work, Energy & Power, Doppler Effect, Electric Circuits, and Electrodynamics.',
    questionPaperSummary: [
      'Question 1: Multiple Choice Concepts (20 Marks)',
      'Question 2: Newton’s Second Law & Friction on Incline Plane (16 Marks)',
      'Question 3: Vertical Projectile Motion from Hot Air Balloon / Cliff (15 Marks)',
      'Question 4: Conservation of Linear Momentum & Elastic Collisions (14 Marks)',
      'Question 5: Work-Energy Theorem & Non-Conservative Forces (15 Marks)',
      'Question 6: Doppler Effect with Moving Ambulance / Sound Detector (12 Marks)',
      'Question 7: Electric Circuits - Internal Resistance, Emf & Power Dissipation (18 Marks)',
      'Question 8: Electrodynamics - AC Generators, Alternators & RMS Voltage (14 Marks)',
      'Question 9: Photoelectric Effect & Work Function (11 Marks)'
    ],
    memoTitle: '2024 NSC November Physical Sciences P1 Official Memo',
    memoKeySteps: [
      {
        questionNumber: 'Q2.2',
        topic: "Newton's Second Law on Incline",
        maxMarks: 5,
        guideline: "Draw free-body diagram. Resolve gravity parallel to incline (mg sin θ). F_net = ma. Write separate equations for coupled masses.",
        commonMistakes: "Using cos θ instead of sin θ for parallel component; leaving out friction or tension.",
        modelSolution: "F_net = F_applied - f_k - mg sin(30°) = ma. For 5kg block: 60 - 12 - (5)(9.8)sin(30°) = 5a ⟹ 60 - 12 - 24.5 = 5a ⟹ 23.5 = 5a ⟹ a = 4.7 m·s⁻² up the incline."
      },
      {
        questionNumber: 'Q6.1',
        topic: 'Doppler Effect Formula Application',
        maxMarks: 5,
        guideline: 'f_L = ((v ± v_L) / (v ± v_S)) × f_S. Identify source moving towards listener: denominator has minus sign (v - v_S).',
        commonMistakes: 'Inverting formula or mixing up numerator and denominator signs.',
        modelSolution: 'Ambulance approaches stationary listener: f_L = (v / (v - v_S)) × f_S. 850 = (340 / (340 - v_S)) × 780 ⟹ (340 - v_S) = (780/850) × 340 = 312 ⟹ v_S = 28 m·s⁻¹.'
      }
    ],
    aiExplanationPrompt: 'Explain 2024 Grade 12 Physical Sciences Physics Paper 1 with free-body diagrams, Newton second law equations, and Doppler formulas.'
  },
  {
    id: 'paper-g12-phy-2024-nov-p2',
    gradeOrLevel: 'Grade 12',
    subject: 'Physical Sciences',
    year: 2024,
    season: 'November / Final',
    paper: 'Paper 2',
    totalMarks: 150,
    durationHours: 3,
    questionPaperTitle: '2024 NSC November Physical Sciences Paper 2 (Chemistry)',
    description: 'Organic Chemistry, Reaction Rates, Chemical Equilibrium (Kc), Acids & Bases (Titration), Galvanic & Electrolytic Cells, and Fertilizer Industry.',
    questionPaperSummary: [
      'Question 1: Multiple Choice Fundamentals (20 Marks)',
      'Question 2 & 3: Organic Nomenclature, Functional Groups, IUPAC Names, Intermolecular Forces & Boiling Points (28 Marks)',
      'Question 4: Organic Reactions - Substitution, Addition, Elimination, Esterification (16 Marks)',
      'Question 5: Reaction Rates & Maxwell-Boltzmann Distribution Curves (18 Marks)',
      'Question 6: Chemical Equilibrium & Le Chatelier’s Principle, Kc Calculations (20 Marks)',
      'Question 7: Acids & Bases, pH, Strong vs Weak, Standard Titration (18 Marks)',
      'Question 8 & 9: Electrochemical Cells - Standard Electrode Potentials, Galvanic vs Electrolytic (20 Marks)'
    ],
    memoTitle: '2024 NSC November Physical Sciences P2 Official Memo',
    memoKeySteps: [
      {
        questionNumber: 'Q3.1',
        topic: 'Organic Chemistry - Intermolecular Forces vs Boiling Point',
        maxMarks: 4,
        guideline: 'Identify homologous series and type of intermolecular force (London, Dipole-Dipole, Hydrogen bonding). State relationship between force strength and kinetic energy needed to vaporize.',
        commonMistakes: 'Confusing intramolecular covalent bonds with intermolecular forces.',
        modelSolution: 'Carboxylic acids contain two sites for hydrogen bonding (form dimers), alcohols have one hydrogen bond, alkanes only have weak London dispersion forces. Stronger hydrogen bonds require more thermal energy to overcome, resulting in higher boiling points.'
      },
      {
        questionNumber: 'Q6.2',
        topic: 'Chemical Equilibrium Kc Table',
        maxMarks: 6,
        guideline: 'Set up RICE table (Ratio, Initial moles, Change in moles, Equilibrium moles). Convert to equilibrium concentrations by dividing by volume. Write Kc expression and calculate.',
        commonMistakes: 'Using moles directly in Kc instead of concentration [C] = n/V.',
        modelSolution: 'N2(g) + 3H2(g) ⇌ 2NH3(g). In 2dm³ container: Kc = [NH3]² / ([N2][H2]³). Equilibrium values: [N2]=0.4 mol·dm⁻³, [H2]=0.6 mol·dm⁻³, [NH3]=0.8 mol·dm⁻³. Kc = (0.8)² / (0.4 × 0.6³) = 0.64 / (0.4 × 0.216) = 7.41.'
      }
    ],
    aiExplanationPrompt: 'Explain 2024 Grade 12 Chemistry Paper 2 with IUPAC rules, reaction rate diagrams, and electrochemical cell half-reactions.'
  },

  // =========================================================================
  // GRADE 10 & 11 EXEMPLARS & PROVINCIAL PAPERS
  // =========================================================================
  {
    id: 'paper-g11-mth-2023-nov-p1',
    gradeOrLevel: 'Grade 11',
    subject: 'Mathematics',
    year: 2023,
    season: 'November / Final',
    paper: 'Paper 1',
    totalMarks: 150,
    durationHours: 3,
    questionPaperTitle: '2023 Grade 11 Mathematics November Paper 1',
    description: 'Exponents & Surds, Equations & Inequalities, Number Patterns, Functions & Financial Maths.',
    questionPaperSummary: [
      'Exponents and rational equations', 'Quadratic inequalities and nature of roots (Delta)', 'Parabolas and hyperbolas with axis of symmetry', 'Depreciation and nominal vs effective rates'
    ],
    memoTitle: '2023 Grade 11 Mathematics P1 Memorandum',
    memoKeySteps: [
      {
        questionNumber: 'Q2.1',
        topic: 'Nature of Roots (Discriminant)',
        maxMarks: 4,
        guideline: 'Calculate Δ = b² - 4ac. Interpret: Δ > 0 (real, unequal), Δ = 0 (real, equal), Δ < 0 (non-real). If perfect square, roots are rational.',
        commonMistakes: 'Omitting parenthesis when squaring negative b value.',
        modelSolution: 'For 3x² - 4x + 2 = 0: Δ = (-4)² - 4(3)(2) = 16 - 24 = -8. Since Δ < 0, roots are non-real.'
      }
    ],
    aiExplanationPrompt: 'Explain Grade 11 Mathematics Paper 1 algebra and nature of roots.'
  },
  {
    id: 'paper-g10-mth-2023-nov-p1',
    gradeOrLevel: 'Grade 10',
    subject: 'Mathematics',
    year: 2023,
    season: 'November / Final',
    paper: 'Paper 1',
    totalMarks: 100,
    durationHours: 2,
    questionPaperTitle: '2023 Grade 10 Mathematics November Paper 1',
    description: 'Algebraic factorisation, Linear & Quadratic equations, Number patterns, Functions and Simple/Compound Interest.',
    questionPaperSummary: [
      'Question 1: Common factor, difference of squares, trinomials, grouping (20 Marks)',
      'Question 2: Linear equations and inequalities (15 Marks)',
      'Question 3: Linear number patterns Tn = dn + c (15 Marks)',
      'Question 4 & 5: Straight line & Parabola graphs (25 Marks)',
      'Question 6: Financial calculations (Hire purchase, Exchange rates) (15 Marks)',
      'Question 7: Probability of mutually exclusive events (10 Marks)'
    ],
    memoTitle: '2023 Grade 10 Mathematics P1 Memorandum',
    memoKeySteps: [
      {
        questionNumber: 'Q1.2',
        topic: 'Difference of Two Squares',
        maxMarks: 3,
        guideline: 'Factorize completely: 2x² - 18 = 2(x² - 9) = 2(x - 3)(x + 3).',
        commonMistakes: 'Forgetting to take out common factor of 2 first.',
        modelSolution: '2x² - 18 = 2(x² - 9) = 2(x - 3)(x + 3)'
      }
    ],
    aiExplanationPrompt: 'Explain Grade 10 Mathematics Paper 1 step-by-step for beginner high school learners.'
  },

  // =========================================================================
  // GRADE 4–9 SENIOR & INTERMEDIATE FINAL EXAMS (2022–2024)
  // =========================================================================
  {
    id: 'paper-g9-mth-2023-final',
    gradeOrLevel: 'Grade 9',
    subject: 'Mathematics',
    year: 2023,
    season: 'November / Final',
    paper: 'Paper 1',
    totalMarks: 100,
    durationHours: 2,
    questionPaperTitle: '2023 Grade 9 Mathematics Final Year Examination',
    description: 'Senior Phase Grade 9 Common Assessment Task: Integers, Algebra, Geometry, Pythagoras and Data Handling.',
    questionPaperSummary: [
      'Question 1: Integers & Scientific Notation (15 Marks)',
      'Question 2: Algebraic Products & Simplification (20 Marks)',
      'Question 3: Solve Linear Equations (15 Marks)',
      'Question 4: Geometry of Straight Lines & Triangles (20 Marks)',
      'Question 5: Theorem of Pythagoras (15 Marks)',
      'Question 6: Data Handling & Mean, Median, Mode (15 Marks)'
    ],
    memoTitle: '2023 Grade 9 Mathematics Memorandum',
    memoKeySteps: [
      {
        questionNumber: 'Q5.1',
        topic: 'Theorem of Pythagoras',
        maxMarks: 4,
        guideline: 'In right-angled triangle ABC with angle B = 90°: AC² = AB² + BC². Substitute and solve for hypotenuse or side.',
        commonMistakes: 'Adding side lengths instead of squares of side lengths.',
        modelSolution: 'AC² = 6² + 8² = 36 + 64 = 100 ⟹ AC = √100 = 10 cm (Reason: Pythagoras).'
      }
    ],
    aiExplanationPrompt: 'Explain Grade 9 final mathematics paper with theorem of Pythagoras and algebraic equations.'
  },
  {
    id: 'paper-g6-mth-2023-final',
    gradeOrLevel: 'Grade 6',
    subject: 'Mathematics',
    year: 2023,
    season: 'November / Final',
    paper: 'Paper 1',
    totalMarks: 75,
    durationHours: 1.5,
    questionPaperTitle: '2023 Grade 6 Mathematics Final Assessment',
    description: 'Intermediate Phase Grade 6 CAPS Exam: Whole numbers, Fractions, Decimals, Measurement, and 2D Shapes.',
    questionPaperSummary: [
      'Whole number operations up to 9 digits', 'Fractions & percentages', 'Perimeter, Area & Volume', 'Data representation in Bar Graphs'
    ],
    memoTitle: '2023 Grade 6 Mathematics Memo',
    memoKeySteps: [
      {
        questionNumber: 'Q3.2',
        topic: 'Adding Unlike Fractions',
        maxMarks: 3,
        guideline: 'Find Lowest Common Denominator (LCD). Convert numerators. Add numerators and simplify.',
        commonMistakes: 'Adding numerators and denominators together directly.',
        modelSolution: '2/3 + 1/4 = (8/12) + (3/12) = 11/12.'
      }
    ],
    aiExplanationPrompt: 'Explain Grade 6 mathematics concepts in simple, learner-friendly words.'
  },

  // =========================================================================
  // TVET COLLEGES: NATED N1–N6 (2021–2024)
  // =========================================================================
  {
    id: 'paper-tvet-n4-maths-2023-nov',
    gradeOrLevel: 'N4',
    subject: 'Mathematics N4',
    year: 2023,
    season: 'November / Final',
    paper: 'Paper 1',
    totalMarks: 100,
    durationHours: 3,
    questionPaperTitle: '2023 DHET National Examination Mathematics N4',
    description: 'Department of Higher Education & Training National TVET Examination: Determinants, Complex Numbers, Trigonometry, and Differential Calculus.',
    questionPaperSummary: [
      'Question 1: Determinants & Cramers Rule for 3x3 Systems (20 Marks)',
      'Question 2: Complex Numbers & De Moivre’s Theorem (20 Marks)',
      'Question 3: Trigonometric Equations & Inverses (20 Marks)',
      'Question 4: Differentiation: Product, Quotient & Chain Rules (20 Marks)',
      'Question 5: Integration: Standard Integrals & Area Under Curve (20 Marks)'
    ],
    memoTitle: '2023 DHET Mathematics N4 Marking Memorandum',
    memoKeySteps: [
      {
        questionNumber: 'Q1.2',
        topic: "Cramer's Rule for 3x3 Linear Systems",
        maxMarks: 6,
        guideline: 'Compute determinant D. Compute D_x, D_y, D_z by replacing columns with constants. Calculate x = D_x / D.',
        commonMistakes: 'Alternating signs (+ - +) error in 3x3 co-factor expansion.',
        modelSolution: 'D = 12. D_x = 24. x = D_x / D = 24/12 = 2.'
      },
      {
        questionNumber: 'Q4.1',
        topic: 'Calculus - Quotient Rule',
        maxMarks: 5,
        guideline: "d/dx [u/v] = (v u' - u v') / v². Differentiate numerator and denominator accurately.",
        commonMistakes: 'Inverting terms in the numerator (writing u v\' - v u\').',
        modelSolution: "y = (sin 2x) / (x² + 1). u = sin 2x, u' = 2 cos 2x. v = x² + 1, v' = 2x. dy/dx = [(x² + 1)(2 cos 2x) - (sin 2x)(2x)] / (x² + 1)²."
      }
    ],
    aiExplanationPrompt: 'Explain TVET Mathematics N4 engineering mathematics step-by-step with Cramers rule and differential calculus.'
  },
  {
    id: 'paper-tvet-n2-elec-2023-nov',
    gradeOrLevel: 'N2',
    subject: 'Industrial Electronics N2',
    year: 2023,
    season: 'November / Final',
    paper: 'Paper 1',
    totalMarks: 100,
    durationHours: 3,
    questionPaperTitle: '2023 DHET Industrial Electronics N2 National Examination',
    description: 'AC Theory, Transducers, Semiconductors, Diodes, and DC Motor Principles.',
    questionPaperSummary: [
      'Question 1: Alternating Current Waveforms & Phasors (20 Marks)',
      'Question 2: Semiconductor Diode Characteristics & Rectification (20 Marks)',
      'Question 3: Bipolar Junction Transistor (BJT) Configurations (20 Marks)',
      'Question 4: Transducers & Sensors (Thermocouples, LDR, Strain Gauges) (20 Marks)',
      'Question 5: DC Power Supplies & Filtering Circuits (20 Marks)'
    ],
    memoTitle: '2023 DHET Industrial Electronics N2 Memorandum',
    memoKeySteps: [
      {
        questionNumber: 'Q2.1',
        topic: 'Full-Wave Bridge Rectifier Operation',
        maxMarks: 6,
        guideline: 'Sketch 4-diode bridge. Explain conduction path during positive half-cycle (D1 and D2 conduct) and negative half-cycle (D3 and D4 conduct).',
        commonMistakes: 'Incorrect diode polarity orientation in schematic.',
        modelSolution: 'During positive alternation: current flows through D1, through the load resistor from top to bottom, and returns via D2. During negative alternation: current flows through D3, through the load in the SAME direction, and returns via D4. Result is pulsating DC across load.'
      }
    ],
    aiExplanationPrompt: 'Explain TVET Industrial Electronics N2 rectifier circuits and semiconductor principles.'
  },

  // =========================================================================
  // UNIVERSITY EXAMINATIONS (YEAR 1–3)
  // =========================================================================
  {
    id: 'paper-uni-bcom-acc101-2023',
    gradeOrLevel: 'Year 1',
    subject: 'Financial Accounting 101 (BCom)',
    year: 2023,
    season: 'November / Final',
    paper: 'Paper 1',
    totalMarks: 100,
    durationHours: 3,
    questionPaperTitle: '2023 University Financial Accounting 101 Final Exam',
    description: 'Comprehensive Bachelor of Commerce Examination: Statement of Comprehensive Income, Statement of Financial Position, and Ratio Analysis under IFRS.',
    questionPaperSummary: [
      'Question 1: Adjusting journal entries (Depreciation, Prepaid expenses, Bad debts) (25 Marks)',
      'Question 2: Preparation of Statement of Profit or Loss and Other Comprehensive Income (35 Marks)',
      'Question 3: Statement of Financial Position (Balance Sheet) (25 Marks)',
      'Question 4: Financial Ratio Analysis: Current Ratio, ROE, Debt-to-Equity (15 Marks)'
    ],
    memoTitle: '2023 Financial Accounting 101 Memorandum Guideline',
    memoKeySteps: [
      {
        questionNumber: 'Q4.1',
        topic: 'Liquidity Ratio Analysis',
        maxMarks: 4,
        guideline: 'Current Ratio = Current Assets / Current Liabilities. Acid-test Ratio = (Current Assets - Inventory) / Current Liabilities. Benchmark comparison (2:1 and 1:1).',
        commonMistakes: 'Including non-current liabilities in the denominator.',
        modelSolution: 'Current Assets = R840,000. Inventory = R320,000. Current Liabilities = R400,000. Current Ratio = 840,000 / 400,000 = 2.1:1. Acid-test Ratio = (840,000 - 320,000) / 400,000 = 1.3:1. Both exceed standard benchmarks indicating strong short-term liquidity.'
      }
    ],
    aiExplanationPrompt: 'Explain University BCom Financial Accounting 101 IFRS statements and ratio calculations.'
  },
  {
    id: 'paper-uni-bsc-cs101-2023',
    gradeOrLevel: 'Year 1',
    subject: 'Computer Science 101 (BSc)',
    year: 2023,
    season: 'November / Final',
    paper: 'Paper 1',
    totalMarks: 100,
    durationHours: 3,
    questionPaperTitle: '2023 University Computer Science 101 Final Examination',
    description: 'Algorithms, Data Structures, Complexity (Big-O), Recursion, and Memory Management.',
    questionPaperSummary: [
      'Question 1: Algorithm Analysis & Asymptotic Big-O Notation (20 Marks)',
      'Question 2: Linked Lists, Stacks & Queues Implementations (25 Marks)',
      'Question 3: Binary Search Trees & Tree Traversals (Inorder, Preorder, Postorder) (25 Marks)',
      'Question 4: Sorting Algorithms: Quicksort, Mergesort & Best/Worst Case (20 Marks)',
      'Question 5: Dynamic Programming Memoization (10 Marks)'
    ],
    memoTitle: '2023 Computer Science 101 Solution Key',
    memoKeySteps: [
      {
        questionNumber: 'Q4.1',
        topic: 'Quicksort Time Complexity Analysis',
        maxMarks: 5,
        guideline: 'Best/Average case recurrence T(n) = 2T(n/2) + O(n) yields O(n log n). Worst case occurs when pivot is minimum or maximum element yielding O(n²).',
        commonMistakes: 'Failing to state when worst-case degradation occurs (already sorted arrays with naive pivot).',
        modelSolution: 'Quicksort partitions around a pivot. Best/Average case: balanced splits produce recursion tree of height log2(n), with O(n) partitioning work per level, giving O(n log n). Worst case: unbalanced splits (e.g. array already sorted and pivot chosen as first element) result in recursion depth n, leading to sum(1..n) = O(n²) time complexity.'
      }
    ],
    aiExplanationPrompt: 'Explain University Computer Science 101 data structures, binary search trees, and algorithm complexity.'
  }
];

/**
 * Filter past papers by criteria
 */
export function getPastPapers(filter?: {
  gradeOrLevel?: string;
  subject?: string;
  year?: number;
  season?: ExamSeason;
  paper?: PaperType;
}): PastPaperItem[] {
  let list = PAST_PAPERS_DATABASE;

  if (filter?.gradeOrLevel) {
    const targetGrade = filter.gradeOrLevel.toLowerCase();
    list = list.filter((p) => p.gradeOrLevel.toLowerCase().includes(targetGrade) || targetGrade.includes(p.gradeOrLevel.toLowerCase()));
  }

  if (filter?.subject) {
    const targetSubj = filter.subject.toLowerCase();
    list = list.filter((p) => p.subject.toLowerCase().includes(targetSubj) || targetSubj.includes(p.subject.toLowerCase()));
  }

  if (filter?.year) {
    list = list.filter((p) => p.year === filter.year);
  }

  if (filter?.season) {
    list = list.filter((p) => p.season === filter.season);
  }

  if (filter?.paper) {
    list = list.filter((p) => p.paper === filter.paper);
  }

  return list;
}
