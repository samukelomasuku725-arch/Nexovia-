export interface EducationCategory {
  id: string;
  name: string;
  levels: string[];
}

export const APP_LEVELS = [
  'Grade 4',
  'Grade 5',
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9',
  'Grade 10',
  'Grade 11',
  'Grade 12',
  'University 1st Year',
  'University 2nd Year',
  'University 3rd Year',
  'University 4th Year'
] as const;

export type AppLevel = typeof APP_LEVELS[number];

export const EDUCATION_SYSTEM: EducationCategory[] = [
  {
    id: 'grades_4_to_7',
    name: 'Primary (Grades 4–7)',
    levels: ['Grade 4', 'Grade 5', 'Grade 6', 'Grade 7']
  },
  {
    id: 'grades_8_to_9',
    name: 'Senior Phase (Grades 8–9)',
    levels: ['Grade 8', 'Grade 9']
  },
  {
    id: 'grades_10_to_12',
    name: 'FET Phase (Grades 10–12)',
    levels: ['Grade 10', 'Grade 11', 'Grade 12']
  },
  {
    id: 'university',
    name: 'University',
    levels: [
      'University 1st Year',
      'University 2nd Year',
      'University 3rd Year',
      'University 4th Year'
    ]
  }
];

export interface SubjectDemo {
  id: string;
  name: string;
  category: string;
  topics: string[];
}

// ====================================================
// 1. GRADES 4 - 7 SUBJECTS
// ====================================================
export const GRADES_4_TO_7_SUBJECTS: SubjectDemo[] = [
  {
    id: 'g4_7_english_home',
    name: 'English Home',
    category: 'Languages',
    topics: [
      'Phonics & Word Recognition',
      'Reading Comprehension & Summarising',
      'Language Structures & Conventions (Grammar)',
      'Creative Writing (Stories & Personal Recounts)',
      'Poetry Appreciation & Figures of Speech'
    ]
  },
  {
    id: 'g4_7_afrikaans_fal',
    name: 'Afrikaans First Additional',
    category: 'Languages',
    topics: [
      'Woordeskat & Leesbegrip',
      'Taalstrukture (Tye, STOMPI & Sinne)',
      'Kreatiewe Skryfwerk (Briewe & Stories)',
      'Luisterbegrip & Klanke',
      'Gedigte & Letterkunde'
    ]
  },
  {
    id: 'g4_7_maths',
    name: 'Mathematics',
    category: 'Mathematical Sciences',
    topics: [
      'Whole Numbers & Place Value',
      'Addition, Subtraction, Multiplication & Division',
      'Common Fractions & Decimal Fractions',
      'Geometric & Numeric Patterns',
      'Properties of 2D Shapes & 3D Objects',
      'Perimeter, Area & Volume',
      'Data Handling, Bar Graphs & Probability'
    ]
  },
  {
    id: 'g4_7_natsci',
    name: 'Natural Sciences',
    category: 'Natural Sciences',
    topics: [
      'Living & Non-Living Things',
      'Plants, Animals & Photosynthesis',
      'Matter, Materials & Particle Model',
      'Energy & Energy Transfer (Electrical Circuits)',
      'Planet Earth & The Solar System',
      'Ecosystems & Food Webs'
    ]
  },
  {
    id: 'g4_7_socsci',
    name: 'Social Sciences',
    category: 'Human & Social Sciences',
    topics: [
      'Geography: Map Skills, Grid References & South Africa',
      'Geography: Weather, Climate & Natural Vegetation',
      'Geography: Minerals, Mining & Water Resources',
      'History: Early African Farmers & Kingdoms (Mapungubwe)',
      'History: Heritage, Cultural Diversity & National Symbols',
      'History: Transport, Travel & Trade Over Time'
    ]
  },
  {
    id: 'g4_7_lifeskills',
    name: 'Life Skills',
    category: 'Life Skills',
    topics: [
      'Personal Well-Being & Positive Self-Concept',
      'Health, Nutrition & Safety',
      'Creative Arts (Visual Arts & Performing Arts)',
      'Physical Education, Coordination & Team Sports',
      'Social Relationships & Emotional Intelligence'
    ]
  },
  {
    id: 'g4_7_tech',
    name: 'Technology',
    category: 'Technology & Applied Sciences',
    topics: [
      'Design Process & Investigation Skills',
      'Structures & Strengthening Materials',
      'Simple Mechanical Systems (Levers & Pulleys)',
      'Processing Materials & Food Preservation',
      'Safety Procedures in the Technology Workshop'
    ]
  }
];

// ====================================================
// 2. GRADES 8 - 9 SUBJECTS
// ====================================================
export const GRADES_8_TO_9_SUBJECTS: SubjectDemo[] = [
  {
    id: 'g8_9_english',
    name: 'English',
    category: 'Languages',
    topics: [
      'Critical Reading, Comprehension & Visual Literacy',
      'Transactional Writing (Emails, Reviews & Formal Letters)',
      'Creative Writing (Narrative & Descriptive Essays)',
      'Language Structures, Clauses & Active/Passive Voice',
      'Literature Study (Short Stories, Novels & Drama)',
      'Poetry Analysis & Stylistic Devices'
    ]
  },
  {
    id: 'g8_9_afrikaans',
    name: 'Afrikaans',
    category: 'Languages',
    topics: [
      'Begripslees & Kritiese Taalbewustheid',
      'Taalstrukture & Woordorde (STOMPI, Voegwoorde & Tye)',
      'Transaksionele Skryfwerk (Verslae, Briewe & Dialoog)',
      'Letterkunde & Voorgeskrewe Gedigte',
      'Opsommings & Visuele Geletterdheid'
    ]
  },
  {
    id: 'g8_9_maths',
    name: 'Mathematics',
    category: 'Mathematical Sciences',
    topics: [
      'Integers, Rational Numbers & Scientific Notation',
      'Exponents & Exponent Laws',
      'Algebraic Expressions, Products & Factorization',
      'Linear Equations & Inequalities',
      'Geometry of Straight Lines & Triangles',
      'Theorem of Pythagoras & Applications',
      'Functions & Coordinate Graphs (Straight Lines)',
      'Data Handling, Measures of Central Tendency & Probability'
    ]
  },
  {
    id: 'g8_9_natsci',
    name: 'Natural Sciences',
    category: 'Natural Sciences',
    topics: [
      'The Periodic Table of Elements & Atomic Structure',
      'Chemical Reactions, Balancing Equations & Acids/Bases',
      'Cells as the Basic Units of Life & Microscopy',
      'Human Digestive, Circulatory & Respiratory Systems',
      'Forces, Gravitation, Mass vs Weight & Mechanical Systems',
      'Electric Cells, Series/Parallel Circuits & Resistance'
    ]
  },
  {
    id: 'g8_9_socsci',
    name: 'Social Sciences',
    category: 'Human & Social Sciences',
    topics: [
      'Geography: Topographical Maps & 1:50 000 Contour Reading',
      'Geography: Climatology, Factors Influencing Weather & Regions',
      'Geography: Settlement Geography & Urbanization',
      'History: The Industrial Revolution in Britain & Southern Africa',
      'History: The Mineral Revolution (Diamonds & Gold in SA)',
      'History: Apartheid in South Africa & Resistance Movements',
      'History: World War II & Turning Points in Modern History'
    ]
  },
  {
    id: 'g8_9_life_orientation',
    name: 'Life Orientation',
    category: 'Life Orientation',
    topics: [
      'Self-Development in Society & Goal Setting',
      'Health, Social & Environmental Responsibility',
      'Career Pathways & Subject Choice Guidance for Grade 10',
      'Democracy, Human Rights & Constitutional Values',
      'Study Skills, Exam Preparation & Stress Management'
    ]
  },
  {
    id: 'g8_9_tech',
    name: 'Technology',
    category: 'Technology & Applied Sciences',
    topics: [
      'Structural Forces (Tension, Compression, Shear & Torsion)',
      'Mechanical Systems & Control (Gears, Cams & Hydraulics)',
      'Electrical Systems, Microcontrollers & Logic Gates',
      'Processing Materials (Plastics, Metals & Composites)',
      'Orthographic & Isometric Drawing Techniques'
    ]
  },
  {
    id: 'g8_9_ems',
    name: 'EMS',
    category: 'Economic & Management Sciences',
    topics: [
      'The Economy & The Circular Flow of Goods and Money',
      'Financial Literacy: Source Documents & Accounting Cycle',
      'Cash Receipts Journal (CRJ) & Cash Payments Journal (CPJ)',
      'General Ledger Posting & Trial Balance',
      'Entrepreneurship & Developing a Business Plan',
      'Factors of Production & Forms of Business Ownership'
    ]
  },
  {
    id: 'g8_9_creative_arts',
    name: 'Creative Arts',
    category: 'Creative Arts',
    topics: [
      'Visual Arts: Drawing Techniques, Color Theory & Sculpture',
      'Dramatic Arts: Vocal Modulation, Improvisation & Staging',
      'Music: Melodic Dictation, Rhythm & African Traditional Music',
      'Dance: Body Conditioning, Choreography & Expressive Movement',
      'Appreciation of South African Art Heritage'
    ]
  }
];

// ====================================================
// 3. GRADES 10 - 12 SUBJECTS (CAPS FET Phase)
// ====================================================
export const GRADES_10_TO_12_SUBJECTS: SubjectDemo[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    category: 'Mathematical Sciences',
    topics: [
      'Algebra, Exponents & Surds',
      'Quadratic Equations & Inequalities',
      'Functions & Graphs (Parabola, Hyperbola, Exponential)',
      'Euclidean Geometry (Circle Theorems & Proofs)',
      'Analytical Geometry (Lines, Gradients & Circles)',
      'Trigonometry (Ratios, Identities, Reduction & 3D Problems)',
      'Differential Calculus (First Principles & Derivatives)',
      'Financial Mathematics (Annuities, Sinking Funds & Inflation)',
      'Statistics (Regression, Variance & Standard Deviation)',
      'Probability & Counting Principles'
    ]
  },
  {
    id: 'maths_lit',
    name: 'Maths Literacy',
    category: 'Mathematical Sciences',
    topics: [
      'Financial Mathematics (Budgets, Tariffs, Income Tax & UIF)',
      'Measurement (Perimeter, Area, Surface Area & Volume)',
      'Maps, Plans & Scale (Floor Plans, Elevation & Packaging)',
      'Data Handling (Surveys, Bias, Quartiles & Box-and-Whisker)',
      'Probability & Risk Assessment in Real-World Contexts'
    ]
  },
  {
    id: 'physical_sciences',
    name: 'Physical Sciences',
    category: 'Physical Sciences',
    topics: [
      'Vectors & Motion in One Dimension',
      'Newton’s Laws of Motion & Momentum/Impulse',
      'Work, Energy & Power Principles',
      'Doppler Effect (Sound Waves & Redshift)',
      'Electrostatics & Coulomb’s Law',
      'Electric Circuits, Internal Resistance & Emf',
      'Electrodynamics (Generators, Motors & AC)',
      'Chemical Bonding & Intermolecular Forces',
      'Stoichiometry & The Mole Concept',
      'Rates of Reaction & Chemical Equilibrium',
      'Acids, Bases & Titrations',
      'Electrochemical Cells (Galvanic & Electrolytic)',
      'Organic Chemistry (IUPAC Naming, Isomers & Reactions)'
    ]
  },
  {
    id: 'life_sciences',
    name: 'Life Sciences',
    category: 'Natural Sciences',
    topics: [
      'DNA Code of Life & RNA Transcription/Translation',
      'Meiosis & Genetic Aberrations',
      'Genetics, Monohybrid/Dihybrid Crosses & Pedigrees',
      'Human Reproduction & Endocrine Regulation',
      'Human Nervous System, Eye & Ear Structure',
      'Homeostasis & Temperature/Glucose Regulation',
      'Plant Reproduction & Growth Hormones',
      'Evolution by Natural Selection & Hominin Fossil Heritage'
    ]
  },
  {
    id: 'accounting',
    name: 'Accounting',
    category: 'Business, Commerce & Management',
    topics: [
      'The Accounting Equation & GAAP/IFRS Framework',
      'Fixed Assets, Depreciation & Asset Disposal',
      'Inventory Valuation (FIFO, Weighted Average & Specific ID)',
      'Bank & Debtors/Creditors Reconciliations',
      'Partnerships: Ledgers & Financial Statements',
      'Companies: Financial Statements, Balance Sheet & Cash Flow',
      'Cost Accounting & Manufacturing Accounts',
      'Budgets & Cash Flow Projections'
    ]
  },
  {
    id: 'economics',
    name: 'Economics',
    category: 'Business, Commerce & Management',
    topics: [
      'Circular Flow Model & National Income Accounts',
      'Business Cycles & Economic Indicators',
      'Price Elasticity of Demand & Supply',
      'Market Structures (Perfect Competition, Monopoly, Oligopoly)',
      'Public Sector Interventions & Fiscal/Monetary Policy',
      'Foreign Exchange Markets & Balance of Payments',
      'Economic Growth, Development & Poverty Alleviation'
    ]
  },
  {
    id: 'business_studies',
    name: 'Business Studies',
    category: 'Business, Commerce & Management',
    topics: [
      'Business Environments (Macro, Market & Micro Analysis)',
      'Contemporary Socio-Economic Issues & CSR',
      'Forms of Ownership & Investment/Securities',
      'Business Ventures, Leadership vs Management',
      'Human Resources Function & South African Labour Laws',
      'Marketing Function & Public Relations',
      'Professionalism, Business Ethics & Good Governance',
      'Team Dynamics & Conflict Resolution'
    ]
  },
  {
    id: 'english_home_fal',
    name: 'English Home/FAL',
    category: 'Languages',
    topics: [
      'Critical Reading Comprehension & Visual Literacy',
      'Essay Writing (Argumentative, Discursive & Reflective)',
      'Transactional Texts (Curriculum Vitae, Speeches, Letters)',
      'Language Conventions, Syntax & Critical Language Awareness',
      'Prescribed Literature Study (Shakespeare, Drama & Novels)',
      'Poetry Analysis & Unseen Poetry Comprehension'
    ]
  },
  {
    id: 'afrikaans',
    name: 'Afrikaans',
    category: 'Languages',
    topics: [
      'Begripslees, Visuele Geletterdheid & Opsommings',
      'Taal- en Woordstrukture (STOMPI, Lydende Vorm, Negatiewe Vorm)',
      'Opstelle (Verhalend, Argumenterend & Beskrywend)',
      'Transaksionele Tekste (Briewe, CV, Toesprake & Resensies)',
      'Voorgeskrewe Letterkunde (Roman, Drama & Kortverhale)',
      'Poësie & Gedigontleding'
    ]
  },
  {
    id: 'geography',
    name: 'Geography',
    category: 'Human & Social Sciences',
    topics: [
      'Climatology: Mid-Latitude Cyclones, Tropical Cyclones & Valley Climates',
      'Geomorphology: Drainage Basins, Fluvial Features & Rejuvenation',
      'Settlement Geography: Rural Settlement Patterns & Urban Land-Use',
      'Economic Geography of South Africa (Mining, Agriculture & SDI)',
      'GIS (Geographic Information Systems) & 1:50 000 Topographical Mapwork'
    ]
  },
  {
    id: 'history',
    name: 'History',
    category: 'Human & Social Sciences',
    topics: [
      'The Cold War & The Cuban Missile Crisis',
      'Independent Africa: Case Studies of Congo & Tanzania',
      'Civil Society Protests (1950s-1970s US Civil Rights)',
      'Civil Resistance in South Africa (1970s-1980s Black Consciousness)',
      'The Coming of Democracy in South Africa (1990-1994)',
      'The End of the Cold War & A New World Order'
    ]
  },
  {
    id: 'technical_maths',
    name: 'Technical Mathematics',
    category: 'Mathematical Sciences',
    topics: [
      'Complex Numbers & Argand Diagrams',
      'Functions & Conic Sections in Engineering',
      'Differential Calculus in Industrial Applications',
      'Integration & Area Calculations',
      'Circles, Angles & Radian Measure',
      'Analytical Geometry & Applied Trigonometry'
    ]
  },
  {
    id: 'computer_applications',
    name: 'Computer Applications',
    category: 'Information Technology',
    topics: [
      'Systems Technologies (Hardware, CPU Architecture & System Software)',
      'Information Management & Critical Data Verification',
      'Spreadsheets (Advanced Nesting, VLOOKUP, INDEX/MATCH, Pivot Tables)',
      'Database Architecture (Relational Tables, Queries, Forms & Reports)',
      'Word Processing (Document Conventions, Styles & Mail Merge)',
      'Internet Technologies, Networking Protocols & Cybersecurity'
    ]
  }
];

// ====================================================
// 4. UNIVERSITY SUBJECTS
// ====================================================
export const UNIVERSITY_SUBJECTS: SubjectDemo[] = [
  {
    id: 'uni_accounting',
    name: 'Accounting',
    category: 'Commerce & Management',
    topics: [
      'Financial Accounting (IFRS Standards, Consolidations & Disclosures)',
      'Management Accounting (Standard Costing, Variance Analysis & CVP)',
      'Corporate Governance, King IV Code & Auditing Standards',
      'Taxation: Personal, Corporate & Capital Gains Tax',
      'Financial Statement Analysis, Cash Flow Modeling & Valuation'
    ]
  },
  {
    id: 'uni_economics',
    name: 'Economics',
    category: 'Commerce & Management',
    topics: [
      'Advanced Microeconomics (Consumer Utility, General Equilibrium & Game Theory)',
      'Advanced Macroeconomics (IS-LM, Solow Growth Model & Monetary Policy)',
      'Econometrics: OLS Regression, Heteroscedasticity & Time Series',
      'Public Economics: Market Failures, Public Goods & Optimal Taxation',
      'International Trade: Heckscher-Ohlin Model & Exchange Rate Dynamics'
    ]
  },
  {
    id: 'uni_bus_mgmt',
    name: 'Business Management',
    category: 'Commerce & Management',
    topics: [
      'Strategic Management (Porter’s Five Forces, VRIO & Blue Ocean Strategy)',
      'Operations Management, Lean Manufacturing & Supply Chain Systems',
      'Corporate Finance, Capital Asset Pricing Model (CAPM) & WACC',
      'Marketing Strategy, Consumer Behavior & Brand Positioning',
      'Organizational Behavior, Agile Leadership & Change Management'
    ]
  },
  {
    id: 'uni_maths',
    name: 'Mathematics',
    category: 'Mathematical Sciences',
    topics: [
      'Calculus I & II (Epsilon-Delta Limits, Series & Multivariable Calculus)',
      'Linear Algebra (Vector Spaces, Linear Transformations & Diagonalization)',
      'Ordinary & Partial Differential Equations (Fourier Series, Laplace Transforms)',
      'Real Analysis & Metric Spaces',
      'Numerical Methods & Computational Linear Algebra'
    ]
  },
  {
    id: 'uni_stats',
    name: 'Statistics',
    category: 'Mathematical Sciences',
    topics: [
      'Probability Distributions (Binomial, Poisson, Normal, Chi-Square, t, F)',
      'Statistical Inference (Maximum Likelihood Estimation, Confidence Intervals)',
      'Hypothesis Testing & Analysis of Variance (ANOVA)',
      'Multivariate Data Analysis & Principal Component Analysis (PCA)',
      'Bayesian Methods & Monte Carlo Markov Chain (MCMC) Simulations'
    ]
  },
  {
    id: 'uni_cs',
    name: 'Computer Science',
    category: 'Information & Computational Sciences',
    topics: [
      'Data Structures & Algorithms (Trees, Graphs, Dijkstra, Dynamic Programming)',
      'Asymptotic Analysis & Big-O Computational Complexity',
      'Computer Systems Architecture & Operating Systems (Processes, Threads, Memory)',
      'Relational & Distributed Database Design (ACID, CAP Theorem, NoSQL)',
      'Software Engineering Design Patterns & Microservice Architectures',
      'Artificial Intelligence, Machine Learning & Neural Network Fundamentals'
    ]
  },
  {
    id: 'uni_physics',
    name: 'Physics',
    category: 'Physical Sciences',
    topics: [
      'Classical Mechanics & Lagrangian / Hamiltonian Dynamics',
      'Electrodynamics & Maxwell’s Equations in Vector Calculus',
      'Thermodynamics & Statistical Mechanics',
      'Quantum Mechanics: Schrödinger Wave Equation & Operators',
      'Optics, Wave Interference & Laser Physics',
      'Solid State Physics & Semiconductor Materials'
    ]
  },
  {
    id: 'uni_chemistry',
    name: 'Chemistry',
    category: 'Physical Sciences',
    topics: [
      'Organic Chemistry: Reaction Mechanisms (SN1, SN2, E1, E2) & Retrosynthesis',
      'Inorganic Chemistry: Crystal Field Theory & Coordination Complexes',
      'Physical Chemistry: Chemical Kinetics, Gibbs Free Energy & Electrochemistry',
      'Analytical Chemistry: Spectroscopic Identification (NMR, FTIR, Mass Spec)',
      'Biochemistry: Enzyme Kinetics & Metabolic Pathways'
    ]
  },
  {
    id: 'uni_biology',
    name: 'Biology',
    category: 'Natural & Life Sciences',
    topics: [
      'Molecular & Cellular Biology: Signal Transduction & Gene Regulation',
      'Physiology & Organ System Homeostatic Control',
      'Genomics, CRISPR & Recombinant DNA Technologies',
      'Ecology, Conservation Biology & Population Dynamics',
      'Microbiology, Virology & Immunology'
    ]
  },
  {
    id: 'uni_law',
    name: 'Law',
    category: 'Law & Jurisprudence',
    topics: [
      'South African Constitutional Law & Bill of Rights Jurisprudence',
      'Law of Contract (Offer, Acceptance, Breach & Remedies)',
      'Law of Delict (Wrongfulness, Fault, Causation & Damages)',
      'Criminal Law & Criminal Procedure',
      'Corporate & Commercial Law (Companies Act & Insolvency)',
      'Legal Interpretation, Statutory Interpretation & Legal Philosophy'
    ]
  },
  {
    id: 'uni_engineering',
    name: 'Engineering Basics',
    category: 'Engineering & Built Environment',
    topics: [
      'Engineering Mechanics: Statics, Trusses & Free Body Diagrams',
      'Strength of Materials: Stress, Strain, Torsion & Bending Moments',
      'Thermodynamics & Fluid Dynamics for Engineers',
      'Electrical Circuit Analysis: Kirchhoff’s Laws, AC Phasors & Transformers',
      'Engineering Materials: Metallurgy, Polymers & Failure Analysis',
      'Computer-Aided Engineering Design (CAD) & Engineering Ethics'
    ]
  }
];

// Backwards compatibility aliases
export const FET_SUBJECTS: SubjectDemo[] = GRADES_10_TO_12_SUBJECTS;
export const GRADE_10_SUBJECTS: SubjectDemo[] = GRADES_10_TO_12_SUBJECTS;
export const INTERMEDIATE_SUBJECTS: SubjectDemo[] = GRADES_4_TO_7_SUBJECTS;
export const SENIOR_SUBJECTS: SubjectDemo[] = GRADES_8_TO_9_SUBJECTS;
export const HIGHER_ED_SUBJECTS: SubjectDemo[] = UNIVERSITY_SUBJECTS;
export const FOUNDATION_SUBJECTS: SubjectDemo[] = GRADES_4_TO_7_SUBJECTS;

// TVET Fallback definition
export const TVET_SUBJECTS: SubjectDemo[] = [
  {
    id: 'maths_n4',
    name: 'Engineering Mathematics',
    category: 'Engineering Studies',
    topics: [
      'Determinants & Matrix Systems (Cramer’s Rule)',
      'Complex Numbers & De Moivre’s Theorem',
      'Differential Calculus (Product, Quotient, Chain Rule)',
      'Integration (Standard Forms & Substitution)',
      'First-Order Differential Equations'
    ]
  },
  {
    id: 'eng_science',
    name: 'Engineering Science',
    category: 'Engineering Studies',
    topics: [
      'Statics, Moments & Friction',
      'Dynamics, Velocity & Acceleration',
      'Work, Energy & Power in Mechanical Systems',
      'Hydraulics & Fluid Pressure'
    ]
  },
  {
    id: 'electrotechnics_n4',
    name: 'Electrotechnics',
    category: 'Engineering Studies',
    topics: [
      'Direct Current Machines (Motors & Generators)',
      'AC Theory & Single-Phase Circuits',
      'Three-Phase Systems & Phasor Diagrams',
      'Transformers & Efficiency Calculations'
    ]
  }
];

/**
 * Returns available subjects based on level string.
 * Supports:
 * - Grades 4-7: English Home, Afrikaans First Additional, Mathematics, Natural Sciences, Social Sciences, Life Skills, Technology
 * - Grades 8-9: English, Afrikaans, Mathematics, Natural Sciences, Social Sciences, Life Orientation, Technology, EMS, Creative Arts
 * - Grades 10-12: Mathematics, Maths Literacy, Physical Sciences, Life Sciences, Accounting, Economics, Business Studies, English Home/FAL, Afrikaans, Geography, History, Technical Mathematics, Computer Applications
 * - University: Accounting, Economics, Business Management, Mathematics, Statistics, Computer Science, Physics, Chemistry, Biology, Law, Engineering Basics
 */
export function getSubjectsForLevel(level: string): SubjectDemo[] {
  if (!level) return GRADES_10_TO_12_SUBJECTS;
  const l = level.trim();
  const lower = l.toLowerCase();

  // University (1st - 4th Year, or University / College / Higher Ed)
  if (
    lower.includes('university') ||
    lower.includes('year') ||
    lower.includes('degree') ||
    lower.includes('college') ||
    lower.includes('higher') ||
    lower.includes('tertiary')
  ) {
    return UNIVERSITY_SUBJECTS;
  }

  // Grades 10-12 (FET Phase)
  if (
    /\bgrade\s*(10|11|12)\b/i.test(l) ||
    lower.includes('matric') ||
    lower.includes('fet')
  ) {
    return GRADES_10_TO_12_SUBJECTS;
  }

  // Grades 8-9 (Senior Phase)
  if (
    /\bgrade\s*(8|9)\b/i.test(l) ||
    lower.includes('senior')
  ) {
    return GRADES_8_TO_9_SUBJECTS;
  }

  // Grades 4-7 (Primary / Intermediate)
  if (
    /\bgrade\s*(4|5|6|7)\b/i.test(l) ||
    lower.includes('intermediate') ||
    lower.includes('primary')
  ) {
    return GRADES_4_TO_7_SUBJECTS;
  }

  // TVET legacy fallback
  if (l.startsWith('NATED') || lower.includes('ncv') || lower.includes('tvet')) {
    return TVET_SUBJECTS;
  }

  return GRADES_10_TO_12_SUBJECTS;
}

export interface SALang {
  code: string;
  name: string;
  nativeName: string;
  hasVoice: boolean;
}

export const SA_OFFICIAL_LANGUAGES: SALang[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    hasVoice: true
  },
  {
    code: 'af',
    name: 'Afrikaans',
    nativeName: 'Afrikaans',
    hasVoice: true
  },
  {
    code: 'zu',
    name: 'isiZulu',
    nativeName: 'isiZulu',
    hasVoice: false
  },
  {
    code: 'xh',
    name: 'isiXhosa',
    nativeName: 'isiXhosa',
    hasVoice: false
  },
  {
    code: 'nr',
    name: 'isiNdebele',
    nativeName: 'isiNdebele',
    hasVoice: false
  },
  {
    code: 'ss',
    name: 'siSwati',
    nativeName: 'siSwati',
    hasVoice: false
  },
  {
    code: 'nso',
    name: 'Sepedi',
    nativeName: 'Sesotho sa Leboa',
    hasVoice: false
  },
  {
    code: 'st',
    name: 'Sesotho',
    nativeName: 'Sesotho',
    hasVoice: false
  },
  {
    code: 'tn',
    name: 'Setswana',
    nativeName: 'Setswana',
    hasVoice: false
  },
  {
    code: 've',
    name: 'Tshivenda',
    nativeName: 'Tshivenḓa',
    hasVoice: false
  },
  {
    code: 'ts',
    name: 'XiTsonga / Xitsonga',
    nativeName: 'Xitsonga',
    hasVoice: false
  }
];
