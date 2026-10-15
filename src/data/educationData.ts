export interface EducationCategory {
  id: string;
  name: string;
  levels: string[];
}

export const EDUCATION_SYSTEM: EducationCategory[] = [
  {
    id: 'school',
    name: 'School (CAPS)',
    levels: [
      'Grade R',
      'Grade 1',
      'Grade 2',
      'Grade 3',
      'Grade 4',
      'Grade 5',
      'Grade 6',
      'Grade 7',
      'Grade 8',
      'Grade 9',
      'Grade 10',
      'Grade 11',
      'Grade 12'
    ]
  },
  {
    id: 'tvet_nated',
    name: 'TVET (NATED Engineering & Business)',
    levels: [
      'NATED N1',
      'NATED N2',
      'NATED N3',
      'NATED N4',
      'NATED N5',
      'NATED N6'
    ]
  },
  {
    id: 'ncv',
    name: 'NC(V) Vocational',
    levels: [
      'Level 2',
      'Level 3',
      'Level 4'
    ]
  },
  {
    id: 'higher_ed',
    name: 'Higher Education',
    levels: [
      'College',
      'University'
    ]
  }
];

export interface SubjectDemo {
  id: string;
  name: string;
  category: string;
  topics: string[];
}

// Usable subject demo data for Grade 10 and related curricula
export const GRADE_10_SUBJECTS: SubjectDemo[] = [
  {
    id: 'life_sciences',
    name: 'Life Sciences',
    category: 'Natural Sciences',
    topics: [
      'Photosynthesis',
      'Cell Structure & Function',
      'Mitosis & Cell Division',
      'Plant & Animal Tissues',
      'Support & Transport Systems in Plants',
      'Human Skeleton & Locomotion'
    ]
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    category: 'Mathematical Sciences',
    topics: [
      'Algebra & Equations',
      'Exponents & Surds',
      'Quadratic Equations & Factorization',
      'Functions & Graphs (Parabola, Hyperbola)',
      'Euclidean Geometry',
      'Analytical Geometry',
      'Trigonometry (Ratios & Applications)',
      'Statistics & Probability'
    ]
  },
  {
    id: 'physical_sciences',
    name: 'Physical Sciences',
    category: 'Physical Sciences',
    topics: [
      'Vectors & Motion in One Dimension',
      'Mechanical Energy & Conservation of Energy',
      'States of Matter & Kinetic Theory',
      'Chemical Bonding & The Periodic Table',
      'Electric Circuits & Ohm’s Law',
      'Stoichiometry & The Mole Concept'
    ]
  },
  {
    id: 'english',
    name: 'English Home / First Additional',
    category: 'Languages',
    topics: [
      'Essay & Transactional Writing',
      'Comprehension & Language Skills',
      'Poetic Devices & Figures of Speech',
      'Critical Analysis of Literature'
    ]
  },
  {
    id: 'afrikaans',
    name: 'Afrikaans Eerste Addisionele Taal',
    category: 'Languages',
    topics: [
      'Taal- en Woordstrukture',
      'Begripslees en Opsommings',
      'Skryfwerk (Opstelle en Briewe)',
      'Letterkunde en Poësie'
    ]
  },
  {
    id: 'geography',
    name: 'Geography',
    category: 'Human & Social Sciences',
    topics: [
      'Climatology & Weather Systems',
      'Geomorphology & Plate Tectonics',
      'Mapwork Skills & Topographical Maps',
      'Population Geography & Demographics'
    ]
  },
  {
    id: 'history',
    name: 'History',
    category: 'Human & Social Sciences',
    topics: [
      'Transformations in Southern Africa',
      'The French Revolution & Democratic Ideals',
      'Colonial Expansion & South Africa in the 19th Century'
    ]
  },
  {
    id: 'accounting',
    name: 'Accounting',
    category: 'Business, Commerce & Management',
    topics: [
      'The Accounting Equation (A = O + L)',
      'Cash Receipts & Payments Journals (CRJ & CPJ)',
      'General Ledger & Trial Balance',
      'Financial Statements for Sole Traders'
    ]
  },
  {
    id: 'economics',
    name: 'Economics',
    category: 'Business, Commerce & Management',
    topics: [
      'The Circular Flow Model of the Economy',
      'Business Cycles & Economic Indicators',
      'Price Elasticity of Demand & Supply',
      'Public Sector & Market Failures'
    ]
  },
  {
    id: 'business_studies',
    name: 'Business Studies',
    category: 'Business, Commerce & Management',
    topics: [
      'Business Sectors & Environments',
      'Forms of Ownership & Entrepreneurship',
      'Business Operations & Quality Management',
      'Contemporary Socio-economic Issues'
    ]
  }
];

export const TVET_SUBJECTS: SubjectDemo[] = [
  {
    id: 'maths_n4',
    name: 'Engineering Mathematics',
    category: 'Engineering Studies',
    topics: [
      'Determinants & Matrix Systems (Cramer’s Rule)',
      'Complex Numbers & De Moivre’s Theorem',
      'Differential Calculus (Product, Quotient, Chain Rule)',
      'Integration (Standard Forms & Substitution)'
    ]
  },
  {
    id: 'electrotechnics_n4',
    name: 'Electrotechnics',
    category: 'Engineering Studies',
    topics: [
      'Direct Current Machines (Motors & Generators)',
      'AC Theory & Single-Phase Circuits',
      'Transformers & Efficiency Calculations'
    ]
  }
];

export function getSubjectsForLevel(level: string): SubjectDemo[] {
  if (level.startsWith('NATED') || level.startsWith('Level')) {
    return TVET_SUBJECTS;
  }
  return GRADE_10_SUBJECTS;
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
