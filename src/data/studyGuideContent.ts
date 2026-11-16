/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN GRADE 12 STUDY GUIDE CONTENT (CAPS ALIGNED)
 * Physics + Life Sciences + Maths Literacy + Mathematics
 */

export type SubjectKey = 'physics' | 'life-sciences' | 'maths-literacy' | 'maths' | 'tvet' | 'degree' | 'ncv';

export interface PracticeQuestion {
  number: number;
  question: string;
  answer: string[];
}

export interface StudyGuideChapterData {
  subject: SubjectKey;
  subjectLabel: string;
  subjectIcon: string;
  backPath: string;
  chapterNumber: number;
  slug: string;
  aliases?: string[];
  title: string;
  shortDescription: string;
  summary: string[];
  formulasTitle: string;
  formulas: Array<{
    expression: string;
    meaning: string;
  }>;
  diagramLines?: string[];
  workedExample: {
    question: string;
    steps: string[];
    finalAnswer: string;
  };
  practiceQuestions: PracticeQuestion[];
}

export const PHYSICS_CHAPTERS: StudyGuideChapterData[] = [
  {
    subject: 'physics',
    subjectLabel: 'Physics Grade 12',
    subjectIcon: '⚡',
    backPath: '/study-guide/physics-grade-12',
    chapterNumber: 1,
    slug: 'momentum',
    title: 'Momentum & Impulse',
    shortDescription: 'Linear momentum, impulse-momentum theorem, and conservation of momentum in collisions.',
    summary: [
      'Momentum (p) = mass x velocity. Momentum is conserved in a closed system - total before = total after.',
      'Impulse = Force x time = change in momentum.'
    ],
    formulasTitle: 'Key Formulas & Collision Diagram',
    formulas: [
      { expression: 'p = mv', meaning: 'Momentum (kg·m/s) = mass (kg) × velocity (m/s)' },
      { expression: 'Fnet = Δp / Δt', meaning: 'Net force equals rate of change of momentum' },
      { expression: 'Fnet Δt = m(vf - vi)', meaning: 'Impulse equals change in momentum (N·s or kg·m/s)' },
      { expression: 'p_total before = p_total after', meaning: 'Conservation of total linear momentum in an isolated/closed system' }
    ],
    diagramLines: [
      'BEFORE COLLISION:   [ m₁ ]──▶ v₁ᵢ          v₂ᵢ ◀──[ m₂ ]',
      '                           ↓   (Closed System)   ↓',
      'AFTER COLLISION:    p_total before  =  p_total after',
      '                    m₁v₁ᵢ + m₂v₂ᵢ   =  m₁v₁f + m₂v₂f'
    ],
    workedExample: {
      question:
        'A 2kg ball moving at 3 m/s hits a wall and bounces back at 2 m/s. Calculate change in momentum.',
      steps: [
        'Take towards wall as positive (+).',
        'vi = +3 m/s, vf = -2 m/s (opposite direction, away from wall), m = 2 kg',
        'pi = m × vi = 2 × 3 = 6 kg·m/s',
        'pf = m × vf = 2 × (-2) = -4 kg·m/s',
        'Δp = pf - pi = -4 - 6 = -10 kg·m/s'
      ],
      finalAnswer: 'Δp = -10 kg·m/s (or 10 kg·m/s away from the wall)'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Define momentum.',
        answer: [
          'Linear momentum is the product of an object’s mass and its velocity (p = mv).',
          'It is a vector quantity (it has both magnitude and direction) measured in kg·m/s.'
        ]
      },
      {
        number: 2,
        question: 'A 1000kg car moves at 20 m/s. Calculate its momentum.',
        answer: [
          'Formula: p = m × v',
          'Substitute: p = 1000 kg × 20 m/s',
          'Answer: p = 20 000 kg·m/s in the direction of motion.'
        ]
      },
      {
        number: 3,
        question: 'Why does airbag reduce injury? Use impulse.',
        answer: [
          'During a crash, the person’s change in momentum (Δp) stays the same because they come to rest.',
          'Since Impulse = Fnet × Δt = Δp, the airbag increases the contact/stopping time (Δt).',
          'Because Fnet = Δp / Δt, increasing Δt decreases the net force (Fnet) exerted on the person, reducing injury.'
        ]
      },
      {
        number: 4,
        question:
          'Two trolleys collide and stick together, calculate final velocity. (Trolley A of mass 2 kg moves right at 4 m/s and collides with a stationary Trolley B of mass 2 kg.)',
        answer: [
          'Take right as positive (+).',
          'p_total before = p_total after',
          'm₁v₁ᵢ + m₂v₂ᵢ = (m₁ + m₂)vf',
          '(2 × 4) + (2 × 0) = (2 + 2)vf',
          '8 = 4vf  →  vf = 2 m/s to the right.'
        ]
      },
      {
        number: 5,
        question: 'A force of 50N acts for 0.2s. Calculate impulse.',
        answer: [
          'Formula: Impulse = Fnet × Δt',
          'Substitute: Impulse = 50 N × 0.2 s',
          'Answer: Impulse = 10 N·s (or 10 kg·m/s) in the direction of the force.'
        ]
      }
    ]
  },
  {
    subject: 'physics',
    subjectLabel: 'Physics Grade 12',
    subjectIcon: '⚡',
    backPath: '/study-guide/physics-grade-12',
    chapterNumber: 2,
    slug: 'vertical-projectile-motion',
    title: 'Vertical Projectile Motion',
    shortDescription: 'Motion under gravity only, constant 9.8 m/s² downwards acceleration, and max height.',
    summary: [
      'Vertical projectile is motion under gravity only.',
      'Acceleration is always 9.8 m/s² downwards, even at the top where velocity = 0. Take upwards as positive.'
    ],
    formulasTitle: 'Key Formulas & Motion Diagram',
    formulas: [
      { expression: 'vf = vi + gt', meaning: 'Final velocity after time t (with g = -9.8 m/s² when upwards is +)' },
      { expression: 'Δy = vi t + ½gt²', meaning: 'Vertical displacement over time t' },
      { expression: 'vf² = vi² + 2gΔy', meaning: 'Time-independent velocity-displacement formula' },
      { expression: 'At max height: vf = 0', meaning: 'Instantaneous velocity is zero at the highest point' }
    ],
    diagramLines: [
      '         ●  Max height: vf = 0 m/s, g = 9.8 m/s² ↓',
      '        ↑ ↓',
      '       ↑   ↓   Take UP as positive (+):',
      '      ↑     ↓  vi = +15 m/s, g = -9.8 m/s²',
      '  ───┴───────┴─── Launch point (Δy = 0)'
    ],
    workedExample: {
      question: 'A ball is thrown upwards at 15 m/s. Calculate max height.',
      steps: [
        'Take upwards as positive (+): vi = +15 m/s, vf = 0 m/s (at max height), g = -9.8 m/s²',
        'vf² = vi² + 2gΔy',
        '0 = 15² + 2(-9.8)Δy',
        '0 = 225 - 19.6Δy',
        '19.6Δy = 225  →  Δy = 225 / 19.6'
      ],
      finalAnswer: 'Δy = 11.48 m'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Define free fall.',
        answer: [
          'Free fall is motion in which the only force acting on an object is gravitational force (ignoring air resistance).'
        ]
      },
      {
        number: 2,
        question: 'A stone is dropped from rest. How far does it fall in 2s?',
        answer: [
          'Take upwards as positive (+): vi = 0 m/s, g = -9.8 m/s², t = 2 s.',
          'Formula: Δy = vi t + ½gt²',
          'Substitute: Δy = 0(2) + ½(-9.8)(2)² = -4.9 × 4 = -19.6 m',
          'Answer: It falls 19.6 m downwards.'
        ]
      },
      {
        number: 3,
        question: 'A ball thrown up at 20 m/s, how long to reach max height?',
        answer: [
          'Take upwards as positive (+): vi = +20 m/s, vf = 0 m/s (at max height), g = -9.8 m/s².',
          'Formula: vf = vi + gt',
          'Substitute: 0 = 20 + (-9.8)t  →  9.8t = 20',
          'Answer: t = 20 / 9.8 = 2.04 s.'
        ]
      },
      {
        number: 4,
        question: 'Why is acceleration still 9.8 at the top?',
        answer: [
          'Gravitational force (weight) never switches off — Earth still pulls the ball downwards even when its velocity momentarily equals 0 m/s at the top.',
          'Since Fnet = mg is constant, acceleration remains 9.8 m/s² downwards throughout the motion.'
        ]
      },
      {
        number: 5,
        question: 'A ball is thrown up at 10 m/s from a building 20m high. Calculate velocity when it hits ground.',
        answer: [
          'Take upwards as positive (+): vi = +10 m/s, Δy = -20 m (ground is 20 m below launch point), g = -9.8 m/s².',
          'Formula: vf² = vi² + 2gΔy',
          'Substitute: vf² = 10² + 2(-9.8)(-20) = 100 + 392 = 492',
          'vf = -√492 = -22.18 m/s',
          'Answer: 22.18 m/s downwards.'
        ]
      }
    ]
  },
  {
    subject: 'physics',
    subjectLabel: 'Physics Grade 12',
    subjectIcon: '⚡',
    backPath: '/study-guide/physics-grade-12',
    chapterNumber: 3,
    slug: 'work-energy-power',
    title: 'Work, Energy & Power',
    shortDescription: 'Work done by a force, kinetic and potential energy, power, and mechanical energy conservation.',
    summary: [
      'Work is done when a force moves an object. Energy is the ability to do work.',
      'Power is how fast work is done. Total mechanical energy is conserved if no friction.'
    ],
    formulasTitle: 'Key Formulas & Energy Box',
    formulas: [
      { expression: 'W = F Δx cosθ', meaning: 'Work done (J) by force F over displacement Δx at angle θ' },
      { expression: 'Ep = mgh', meaning: 'Gravitational potential energy (J)' },
      { expression: 'Ek = ½mv²', meaning: 'Kinetic energy (J)' },
      { expression: 'Wnet = ΔEk', meaning: 'Work-Energy Theorem: net work equals change in kinetic energy' },
      { expression: 'P = W / t', meaning: 'Power (Watts, W = J/s): rate at which work is done' },
      { expression: 'Emec = Ep + Ek', meaning: 'Total mechanical energy (conserved when no friction acts)' }
    ],
    diagramLines: [
      '         F (applied) ──▶  [ Box m ]  ──▶ Δx (θ = 0°, cos 0° = +1)',
      '      fk (friction) ◀──  [ Box m ]  ──▶ Δx (θ = 180°, cos 180° = -1)',
      '     Mechanical Energy:   Emec = Ep + Ek  (constant if no friction)'
    ],
    workedExample: {
      question: 'A 5kg box is lifted 2m. Calculate work done against gravity.',
      steps: [
        'm = 5 kg, Δx = h = 2 m, g = 9.8 m/s²',
        'Force needed to lift at constant speed: F = mg = 5 × 9.8 = 49 N',
        'Work done: W = F Δx cos 0° = 49 × 2 × 1 = 98 J',
        'Check with potential energy: Ep = mgh = 5 × 9.8 × 2 = 98 J'
      ],
      finalAnswer: 'W = 98 J (Ep gained = 98 J)'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Define work.',
        answer: [
          'Work done on an object by a constant force F is the product of the magnitude of the force, the magnitude of the displacement, and the cosine of the angle between them: W = F Δx cosθ (measured in Joules, J).'
        ]
      },
      {
        number: 2,
        question: 'A force of 100N pushes a box 5m. Calculate work done.',
        answer: [
          'Formula: W = F Δx cosθ (force is in the same direction as motion, so θ = 0° and cos 0° = 1)',
          'Substitute: W = 100 × 5 × 1 = 500 J',
          'Answer: W = 500 J.'
        ]
      },
      {
        number: 3,
        question: 'A 2kg ball moves at 4 m/s. Calculate its kinetic energy.',
        answer: [
          'Formula: Ek = ½mv²',
          'Substitute: Ek = ½ × 2 × 4² = 1 × 16 = 16 J',
          'Answer: Ek = 16 J.'
        ]
      },
      {
        number: 4,
        question: 'A motor does 500J in 10s. Calculate power.',
        answer: [
          'Formula: P = W / t',
          'Substitute: P = 500 J / 10 s = 50 W',
          'Answer: P = 50 W.'
        ]
      },
      {
        number: 5,
        question: 'Explain conservation of mechanical energy with a pendulum.',
        answer: [
          'When there is no air resistance or friction, total mechanical energy (Emec = Ep + Ek) stays constant throughout the swing.',
          'At the highest points (ends of the swing), height is maximum so Ep is maximum and velocity is 0 (Ek = 0).',
          'As it swings down to the lowest point, Ep converts into Ek so at the bottom Ek is maximum and Ep is minimum, while Ep + Ek remains constant.'
        ]
      }
    ]
  },
  {
    subject: 'physics',
    subjectLabel: 'Physics Grade 12',
    subjectIcon: '⚡',
    backPath: '/study-guide/physics-grade-12',
    chapterNumber: 4,
    slug: 'electrostatics',
    title: 'Electrostatics',
    shortDescription: 'Charges at rest, quantization of charge, Coulomb’s Law, and electric fields.',
    summary: [
      'Electrostatics is about charges at rest. Like charges repel, unlike charges attract.',
      'Charge is conserved and quantized. Electric field is force per unit charge.'
    ],
    formulasTitle: 'Key Formulas & Field Pattern Diagram',
    formulas: [
      { expression: 'F = k q1 q2 / r²', meaning: 'Coulomb’s Law with k = 9 × 10⁹ N·m²·C⁻²' },
      { expression: 'E = F / q', meaning: 'Electric field strength = force per unit charge (N·C⁻¹)' },
      { expression: 'E = kQ / r²', meaning: 'Electric field strength at distance r from charge Q' },
      { expression: 'Q = ne   |   n = Q / e', meaning: 'Charge quantization where e = 1.6 × 10⁻¹⁹ C' }
    ],
    diagramLines: [
      '   Electric Field Lines (direction a positive test charge moves):',
      '          ↑                        ↓',
      '      ↖   ↑   ↗                ↘   ↓   ↙',
      '    ← ── (+Q) ── →           → ── (−Q) ── ←',
      '      ↙   ↓   ↘                ↗   ↑   ↖',
      '          ↓                        ↑',
      '    (Outwards from +)        (Inwards to −)'
    ],
    workedExample: {
      question:
        'Two charges 2 × 10⁻⁶ C and 3 × 10⁻⁶ C are 0.1m apart. Calculate force between them.',
      steps: [
        'q1 = 2 × 10⁻⁶ C, q2 = 3 × 10⁻⁶ C, r = 0.1 m, k = 9 × 10⁹',
        'F = k q1 q2 / r²',
        'F = (9 × 10⁹)(2 × 10⁻⁶)(3 × 10⁻⁶) / (0.1)²',
        'F = (54 × 10⁻³) / 0.01'
      ],
      finalAnswer: 'F = 5.4 N, repulsive because same sign'
    },
    practiceQuestions: [
      {
        number: 1,
        question: "State Coulomb's Law.",
        answer: [
          'The magnitude of the electrostatic force exerted by one point charge on another is directly proportional to the product of the magnitudes of the charges and inversely proportional to the square of the distance between them (F = k q1 q2 / r²).'
        ]
      },
      {
        number: 2,
        question: 'Define electric field.',
        answer: [
          'An electric field is a region of space in which an electric charge experiences a force.',
          'Electric field strength at a point is the electrostatic force experienced per unit positive charge placed at that point: E = F / q (measured in N·C⁻¹).'
        ]
      },
      {
        number: 3,
        question: 'Calculate force between 4µC and 6µC charges 0.2m apart.',
        answer: [
          'Convert to Coulombs: q1 = 4 × 10⁻⁶ C, q2 = 6 × 10⁻⁶ C, r = 0.2 m, k = 9 × 10⁹.',
          'Formula: F = k q1 q2 / r²',
          'Substitute: F = (9 × 10⁹)(4 × 10⁻⁶)(6 × 10⁻⁶) / (0.2)²',
          'F = (216 × 10⁻³) / 0.04 = 0.216 / 0.04 = 5.4 N',
          'Answer: F = 5.4 N (repulsive because both charges have the same sign).'
        ]
      },
      {
        number: 4,
        question: 'How many electrons make up -3.2 x 10^-19 C?',
        answer: [
          'Formula: n = Q / e (magnitude of charge divided by elementary charge e = 1.6 × 10⁻¹⁹ C)',
          'Substitute: n = (3.2 × 10⁻¹⁹) / (1.6 × 10⁻¹⁹) = 2',
          'Answer: 2 electrons.'
        ]
      },
      {
        number: 5,
        question: 'Draw the field pattern for a positive point charge and explain it.',
        answer: [
          '       ↑       ',
          '   ↖   ↑   ↗   ',
          ' ← ── (+) ── → ',
          '   ↙   ↓   ↘   ',
          '       ↓       ',
          'Explanation: Field lines are straight radial lines pointing outwards in all directions (showing the direction a positive test charge would move). Lines are closest near the charge where the field is strongest, spread apart with distance as E weakens, and never cross.'
        ]
      }
    ]
  },
  {
    subject: 'physics',
    subjectLabel: 'Physics Grade 12',
    subjectIcon: '⚡',
    backPath: '/study-guide/physics-grade-12',
    chapterNumber: 5,
    slug: 'electrodynamics',
    title: 'Electrodynamics',
    shortDescription: 'Moving charges, Ohm’s Law, series vs parallel circuits, electrical power, and energy.',
    summary: [
      'Electrodynamics is about charges moving - current. In series, current is same everywhere. In parallel, voltage is same.',
      'Resistance opposes current. Power is energy used per second.'
    ],
    formulasTitle: 'Key Formulas & Series/Parallel Diagram',
    formulas: [
      { expression: 'I = Q / t', meaning: 'Current (A) = charge (C) divided by time (s)' },
      { expression: 'V = IR', meaning: 'Ohm’s Law: Potential difference (V) = current (A) × resistance (Ω)' },
      { expression: 'Rseries = R1 + R2', meaning: 'Total resistance in series (current is the same everywhere)' },
      { expression: '1/Rparallel = 1/R1 + 1/R2', meaning: 'Total resistance in parallel (voltage is the same across branches)' },
      { expression: 'P = VI = I²R = V²/R', meaning: 'Electrical power (W = J/s): energy used per second' },
      { expression: 'W = VIt', meaning: 'Electrical work / energy transferred (J)' }
    ],
    diagramLines: [
      '   SERIES (I same, V splits):        PARALLEL (V same, I splits):',
      '   ──[ R1 ]──[ R2 ]──                 ┌──[ R1 ]──┐',
      '   Rseries = R1 + R2               ───┼──[ R2 ]──┼───',
      '                                   1/Rp = 1/R1 + 1/R2'
    ],
    workedExample: {
      question: 'A 6V battery is connected to a 2Ω and 4Ω resistor in series. Calculate total current.',
      steps: [
        'R1 = 2 Ω, R2 = 4 Ω, V = 6 V (connected in series)',
        'Rtotal = R1 + R2 = 2 + 4 = 6 Ω',
        'I = V / Rtotal = 6 / 6 = 1 A',
        'Because the resistors are in series, the same 1 A current flows through both resistors.'
      ],
      finalAnswer: 'I = 1 A (same current through both resistors)'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Define current.',
        answer: [
          'Electric current is the rate of flow of charge past a point in a circuit: I = Q / t.',
          'It is measured in Amperes (A), where 1 A = 1 Coulomb per second.'
        ]
      },
      {
        number: 2,
        question: 'A bulb uses 0.5A at 12V. Calculate its resistance.',
        answer: [
          'Formula: V = IR  →  R = V / I',
          'Substitute: R = 12 V / 0.5 A = 24 Ω',
          'Answer: R = 24 Ω.'
        ]
      },
      {
        number: 3,
        question: 'Two 6Ω resistors in parallel. Calculate total resistance.',
        answer: [
          'Formula: 1/Rparallel = 1/R1 + 1/R2',
          'Substitute: 1/Rparallel = 1/6 + 1/6 = 2/6 = 1/3',
          'Invert: Rparallel = 3 Ω',
          'Answer: 3 Ω.'
        ]
      },
      {
        number: 4,
        question: 'A heater uses 1000W at 220V. Calculate current.',
        answer: [
          'Formula: P = VI  →  I = P / V',
          'Substitute: I = 1000 W / 220 V = 4.55 A',
          'Answer: I = 4.55 A.'
        ]
      },
      {
        number: 5,
        question: 'Why does a kettle heat up? Use P = I²R.',
        answer: [
          'The kettle’s heating element is designed with resistance R, and a large current I flows through it.',
          'According to P = I²R (and heat energy W = I²Rt), electrical energy is converted into heat every second at a rate proportional to both R and the square of the current (I²), causing the element and water to heat up rapidly.'
        ]
      }
    ]
  },
  {
    subject: 'physics',
    subjectLabel: 'Physics Grade 12',
    subjectIcon: '⚡',
    backPath: '/study-guide/physics-grade-12',
    chapterNumber: 6,
    slug: 'photoelectric-effect',
    title: 'Photoelectric Effect',
    shortDescription: 'Photons, work function, threshold frequency, and maximum kinetic energy of photoelectrons.',
    summary: [
      'When light shines on metal, electrons are knocked out - but ONLY if the frequency is high enough. Each photon has energy E = hf.',
      'If photon energy is less than work function, no electrons come out, no matter how bright the light is.'
    ],
    formulasTitle: 'Key Formulas & Photon Energy Diagram',
    formulas: [
      { expression: 'E = hf', meaning: 'Energy of one photon (h = 6.63 × 10⁻³⁴ J·s)' },
      { expression: 'Wo = h fo', meaning: 'Work function: minimum energy needed to eject an electron at threshold frequency fo' },
      { expression: 'E = Wo + Ek(max)', meaning: 'Photoelectric equation: photon energy = work function + maximum kinetic energy' },
      { expression: 'c = f λ', meaning: 'Wave equation (c = 3 × 10⁸ m/s in vacuum)' }
    ],
    diagramLines: [
      '   Photon (E = hf) ──▶ [ Metal Surface (Wo) ] ──▶ e⁻ (Ek(max) = E - Wo)',
      '   • If f < fo (E < Wo) : NO electrons emitted, no matter how bright the light is',
      '   • If f ≥ fo (E ≥ Wo) : Electrons emitted; brighter light → more photons → more e⁻/s'
    ],
    workedExample: {
      question:
        'Light with frequency 1.5 × 10¹⁵ Hz shines on metal with work function 2.2 × 10⁻¹⁹ J. Calculate max kinetic energy of electron.',
      steps: [
        'f = 1.5 × 10¹⁵ Hz, Wo = 2.2 × 10⁻¹⁹ J, h = 6.63 × 10⁻³⁴ J·s',
        'E = hf = (6.63 × 10⁻³⁴) × (1.5 × 10¹⁵) = 9.945 × 10⁻¹⁹ J',
        'E = Wo + Ek(max)  →  Ek(max) = E - Wo',
        'Ek(max) = 9.945 × 10⁻¹⁹ - 2.2 × 10⁻¹⁹'
      ],
      finalAnswer: 'Ek(max) = 7.745 × 10⁻¹⁹ J'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Define photoelectric effect.',
        answer: [
          'The photoelectric effect is the process whereby electrons are ejected from a metal surface when light of suitable (sufficiently high) frequency is incident on that surface.'
        ]
      },
      {
        number: 2,
        question: 'What is a photon?',
        answer: [
          'A photon is a discrete packet (quantum) of light/electromagnetic energy, carrying energy E = hf (where h = 6.63 × 10⁻³⁴ J·s).'
        ]
      },
      {
        number: 3,
        question: 'Define threshold frequency.',
        answer: [
          'Threshold frequency (fo) is the minimum frequency of light needed to emit electrons from a certain metal surface.'
        ]
      },
      {
        number: 4,
        question: 'Calculate energy of photon with frequency 5 x 10^14 Hz.',
        answer: [
          'Formula: E = hf',
          'Substitute: E = (6.63 × 10⁻³⁴ J·s) × (5 × 10¹⁴ Hz)',
          'E = 33.15 × 10⁻²⁰ J = 3.315 × 10⁻¹⁹ J',
          'Answer: E = 3.315 × 10⁻¹⁹ J.'
        ]
      },
      {
        number: 5,
        question: 'Why does increasing brightness NOT increase electron energy? Explain with photons.',
        answer: [
          'Each electron absorbs only ONE photon, so the maximum kinetic energy of each electron depends only on the energy of one photon (E = hf, so Ek(max) = hf - Wo).',
          'Increasing brightness (intensity) only increases the NUMBER of photons striking the metal per second — it does NOT increase the frequency f or the energy of each individual photon.',
          'Therefore, brighter light ejects more electrons per second (higher photocurrent), while the maximum kinetic energy of each electron stays unchanged.'
        ]
      }
    ]
  }
];

export const LIFE_SCIENCES_CHAPTERS: StudyGuideChapterData[] = [
  {
    subject: 'life-sciences',
    subjectLabel: 'Life Sciences Grade 12',
    subjectIcon: '🧬',
    backPath: '/study-guide/life-sciences-grade-12',
    chapterNumber: 1,
    slug: 'dna-code-of-life',
    aliases: ['dna-protein-synthesis'],
    title: 'DNA - Code of Life',
    shortDescription: 'DNA double helix, base pairing, replication, transcription, and translation.',
    summary: [
      'DNA is the code of life. It is a double helix made of 4 bases: A-T and C-G.',
      'DNA makes RNA (transcription), RNA makes protein (translation). DNA replicates before cell division so each new cell gets a copy.'
    ],
    formulasTitle: 'Key Concepts & Protein Synthesis Diagram',
    formulas: [
      { expression: 'Double Helix', meaning: 'Two DNA strands twisted around each other like a spiral ladder' },
      { expression: 'Base Pairing: A-T, C-G', meaning: 'In DNA: A pairs with T, C pairs with G (in RNA: A pairs with U)' },
      { expression: 'Transcription: DNA → mRNA', meaning: 'Occurs in the nucleus to copy the genetic message' },
      { expression: 'Translation: mRNA → Protein', meaning: 'Occurs at a ribosome to assemble amino acids into protein' },
      { expression: 'Codon = 3 bases = 1 amino acid', meaning: 'Each group of 3 mRNA bases codes for one specific amino acid' }
    ],
    diagramLines: [
      '  1. TRANSCRIPTION (Nucleus):    DNA (A-T-C-G-G-T)  ──▶  mRNA (U-A-G-C-C-A)',
      '  2. TRANSLATION (Ribosome):     mRNA codons        ──▶  tRNA anticodons ──▶ Amino acid chain (Protein)',
      '  Rule: DNA A → RNA U  |  DNA T → RNA A  |  DNA C ↔ RNA G'
    ],
    workedExample: {
      question: 'DNA strand: A-T-C-G-G-T. Give the mRNA strand.',
      steps: [
        'Write down the DNA bases: A - T - C - G - G - T',
        'Pair each DNA base with its RNA partner (A→U, T→A, C→G, G→C):',
        'A → U,  T → A,  C → G,  G → C,  G → C,  T → A'
      ],
      finalAnswer: 'mRNA strand: U-A-G-C-C-A'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Where is DNA found in a cell?',
        answer: [
          '1. Mainly in the nucleus (nuclear DNA on chromosomes).',
          '2. Also found in mitochondria (mitochondrial DNA / mtDNA) and in chloroplasts (in plant cells).'
        ]
      },
      {
        number: 2,
        question: 'Name the 4 nitrogenous bases.',
        answer: [
          'In DNA: Adenine (A), Thymine (T), Cytosine (C), and Guanine (G).',
          '(Note: In RNA, Uracil (U) replaces Thymine.)'
        ]
      },
      {
        number: 3,
        question: 'What is the difference between transcription and translation?',
        answer: [
          'Transcription: Making a complementary mRNA strand from a DNA template inside the nucleus (DNA → mRNA).',
          'Translation: Reading mRNA codons at a ribosome in the cytoplasm so tRNA brings amino acids to build a protein (mRNA → protein).'
        ]
      },
      {
        number: 4,
        question: 'A DNA triplet is AAA. What is the mRNA codon?',
        answer: [
          'DNA Adenine (A) pairs with RNA Uracil (U).',
          'Answer: mRNA codon is UUU.'
        ]
      },
      {
        number: 5,
        question: 'Why is DNA replication important before mitosis?',
        answer: [
          'DNA replication makes an exact copy of all DNA before the cell divides so that each new daughter cell receives a complete, identical copy of the genetic code.'
        ]
      }
    ]
  },
  {
    subject: 'life-sciences',
    subjectLabel: 'Life Sciences Grade 12',
    subjectIcon: '🧬',
    backPath: '/study-guide/life-sciences-grade-12',
    chapterNumber: 2,
    slug: 'meiosis',
    aliases: ['meiosis-reproduction'],
    title: 'Meiosis',
    shortDescription: 'Formation of haploid gametes, Meiosis I & II, crossing over, and genetic variation.',
    summary: [
      'Meiosis makes sex cells (gametes) with HALF the chromosomes. It has 2 divisions and makes 4 haploid cells.',
      'It creates variation through crossing over and random arrangement of chromosomes. This is why siblings are not identical.'
    ],
    formulasTitle: 'Key Concepts & Meiosis Flowchart',
    formulas: [
      { expression: 'Diploid (2n) = 46 in humans', meaning: 'Normal body cells have 2 sets of chromosomes (23 pairs)' },
      { expression: 'Haploid (n) = 23', meaning: 'Sex cells (sperm & egg) have half the chromosomes (1 set)' },
      { expression: 'Meiosis I: homologous chromosomes separate', meaning: 'Reduction division in Anaphase I (2n → n)' },
      { expression: 'Meiosis II: sister chromatids separate', meaning: 'Produces 4 haploid gametes in Anaphase II' },
      { expression: 'Crossing over = swapping DNA in Prophase I', meaning: 'Non-sister chromatids exchange genetic material for variation' }
    ],
    diagramLines: [
      '  Diploid Cell (2n = 46) ──[Meiosis I: Homologous chromosomes separate]──▶ 2 Haploid Cells (n = 23)',
      '                                                                                   │',
      '                                                        [Meiosis II: Sister chromatids separate]',
      '                                                                                   ▼',
      '                                                                 4 Genetically Different Gametes (n = 23)'
    ],
    workedExample: {
      question:
        'A human cell with 46 chromosomes undergoes meiosis. How many chromosomes in each gamete?',
      steps: [
        'Starting diploid cell has 2n = 46 chromosomes.',
        'Meiosis halves the chromosome number: n = 46 / 2 = 23 chromosomes.',
        'Because meiosis involves 2 divisions (Meiosis I and Meiosis II), 4 haploid gametes are produced.'
      ],
      finalAnswer: '23 chromosomes in each gamete (4 gametes produced)'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Define meiosis.',
        answer: [
          'Meiosis is a type of cell division (reduction division) where one diploid (2n) cell divides twice to produce four genetically different haploid (n) gametes, each with half the chromosome number of the parent cell.'
        ]
      },
      {
        number: 2,
        question: 'What is the difference between mitosis and meiosis?',
        answer: [
          'Mitosis: 1 cell division; produces 2 genetically identical diploid (2n) body cells for growth and repair (no crossing over).',
          'Meiosis: 2 cell divisions; produces 4 genetically different haploid (n) gametes for sexual reproduction (crossing over and random arrangement occur).'
        ]
      },
      {
        number: 3,
        question: 'Where does crossing over happen and why is it important?',
        answer: [
          'Where: During Prophase I of meiosis (between non-sister chromatids of homologous chromosomes).',
          'Importance: Segments of DNA are swapped between chromosomes, creating new allele combinations and increasing genetic variation in gametes.'
        ]
      },
      {
        number: 4,
        question: 'How many cells are produced by meiosis? Are they identical?',
        answer: [
          '4 haploid cells (gametes) are produced from one parent cell.',
          'No — they are NOT identical because crossing over (Prophase I) and random arrangement (Metaphase I & II) give each gamete a unique mix of genes.'
        ]
      },
      {
        number: 5,
        question: 'Why do children look different from their parents? Use meiosis.',
        answer: [
          'During meiosis, crossing over in Prophase I swaps DNA between chromosomes and random arrangement in Metaphase I & II shuffles maternal and paternal chromosomes independently into gametes.',
          'Each sperm and egg therefore carries a unique combination of genes, so when they fuse at fertilisation, the child inherits a brand-new genetic mix different from both parents and siblings.'
        ]
      }
    ]
  },
  {
    subject: 'life-sciences',
    subjectLabel: 'Life Sciences Grade 12',
    subjectIcon: '🧬',
    backPath: '/study-guide/life-sciences-grade-12',
    chapterNumber: 3,
    slug: 'genetics-inheritance',
    title: 'Genetics & Inheritance',
    shortDescription: 'Genotype vs phenotype, Punnett squares, dominance types, blood groups, and sex-linked inheritance.',
    summary: [
      'Genes are passed from parents to children. Dominant allele shows even with one copy (R). Recessive needs two copies (rr) to show.',
      'Punnett squares predict offspring. Blood groups and sex are also inherited.'
    ],
    formulasTitle: 'Key Concepts & Punnett Square Diagram',
    formulas: [
      { expression: 'Genotype = genes (e.g. Rr)', meaning: 'Allele combination; Phenotype = what you see (e.g. Round)' },
      { expression: 'Homozygous (RR or rr) | Heterozygous (Rr)', meaning: 'Homozygous = same alleles; Heterozygous = different alleles' },
      { expression: 'Monohybrid cross | Dihybrid cross', meaning: 'Crossing 1 trait (e.g. Rr × Rr) vs 2 traits together' },
      { expression: 'Incomplete dominance | Co-dominance', meaning: 'Intermediate blend (pink) vs both alleles equally shown (AB blood)' }
    ],
    diagramLines: [
      '  Punnett Square for Rr × Rr (R = Round, r = Wrinkled):',
      '             |   R   |   r   |',
      '         ----+-------+-------+',
      '          R  |  RR   |  Rr   |   Genotype ratio:  1 RR : 2 Rr : 1 rr',
      '          r  |  Rr   |  rr   |   Phenotype ratio: 3 Round : 1 Wrinkled'
    ],
    workedExample: {
      question:
        'Cross Rr × Rr for round (R dominant) vs wrinkled (r). Give genotype and phenotype ratio.',
      steps: [
        'Parents: Rr × Rr (gametes from each parent: R and r)',
        'Punnett square combinations: RR, Rr, Rr, rr',
        'Count genotypes: 1 RR : 2 Rr : 1 rr',
        'Count phenotypes: RR, Rr, Rr are Round (3); rr is Wrinkled (1)'
      ],
      finalAnswer: 'Genotype ratio 1:2:1  |  Phenotype ratio 3 round : 1 wrinkled'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Define genotype and phenotype.',
        answer: [
          'Genotype: The genetic makeup / allele combination of an organism (e.g. RR, Rr, or rr).',
          'Phenotype: The observable physical appearance / traits of an organism (what you see, e.g. round or wrinkled).'
        ]
      },
      {
        number: 2,
        question: 'What is a dominant allele?',
        answer: [
          'A dominant allele is an allele that is expressed in the phenotype whenever at least one copy is present — it masks the recessive allele in a heterozygous individual (e.g. R shows in both RR and Rr).'
        ]
      },
      {
        number: 3,
        question: 'Cross Tt x tt. Give phenotype ratio.',
        answer: [
          'Gametes from Tt: T and t  |  Gametes from tt: t and t.',
          'Punnett outcomes: Tt, Tt, tt, tt (2 Tt : 2 tt).',
          'Phenotype ratio: 1 dominant : 1 recessive (50% dominant : 50% recessive).'
        ]
      },
      {
        number: 4,
        question: 'A man with blood group AB marries a woman with O. What blood groups can their children have?',
        answer: [
          'Father (AB) = IᴬIᴮ (gametes: Iᴬ, Iᴮ)  |  Mother (O) = ii (gametes: i).',
          'Possible child genotypes: Iᴬi (Blood group A) and Iᴮi (Blood group B).',
          'Answer: Their children can only have blood group A or blood group B (50% chance each).'
        ]
      },
      {
        number: 5,
        question: 'Why do more males have colour blindness than females? Explain with X chromosome.',
        answer: [
          'Colour blindness is caused by a recessive allele carried on the X chromosome (Xᵇ), and the Y chromosome has no gene for colour vision.',
          'Males (XY) only have ONE X chromosome, so inheriting just ONE recessive allele (XᵇY) makes a male colour blind because there is no second X chromosome to mask it.',
          'Females (XX) have TWO X chromosomes, so a female with one recessive allele (XᴮXᵇ) is only a carrier with normal vision — she needs TWO recessive alleles (XᵇXᵇ) to be colour blind, which is much less common.'
        ]
      }
    ]
  },
  {
    subject: 'life-sciences',
    subjectLabel: 'Life Sciences Grade 12',
    subjectIcon: '🧬',
    backPath: '/study-guide/life-sciences-grade-12',
    chapterNumber: 4,
    slug: 'evolution',
    title: 'Evolution - Human Evolution',
    shortDescription: 'Natural selection, adaptations, human evolution in Africa, fossils, bipedalism, and Out of Africa theory.',
    summary: [
      'Evolution is change over time by natural selection. Organisms with best adaptations survive and pass genes on.',
      'Humans evolved in Africa from ape-like ancestors. Fossils, DNA and bipedalism prove it. Out of Africa theory says modern humans left Africa and spread worldwide.'
    ],
    formulasTitle: 'Key Concepts & Human Evolution Timeline',
    formulas: [
      { expression: 'Natural selection | Variation | Adaptation', meaning: 'Favourable inherited traits increase survival and reproduction' },
      { expression: 'Bipedalism = walking on 2 legs', meaning: 'Supported by forward foramen magnum, S-shaped spine, wide pelvis' },
      { expression: 'Foramen magnum & Cranial capacity', meaning: 'Moves further forward underneath skull & brain size increases over time' },
      { expression: 'Fossils | Out of Africa theory', meaning: 'Oldest hominid fossils & highest mtDNA diversity found in Africa' },
      { expression: 'Australopithecus → Homo habilis → Homo erectus → Homo sapiens', meaning: 'Main sequence of hominid evolution' }
    ],
    diagramLines: [
      '  HUMAN EVOLUTION TIMELINE:',
      '  Australopithecus ──▶ Homo habilis ──▶ Homo erectus ──▶ Homo sapiens',
      '  • Foramen magnum:    Further back ───────────────────▶ Directly underneath skull (Bipedalism)',
      '  • Cranial capacity:  ~400–500 cm³  ──▶  ~650 cm³  ──▶ ~1000 cm³  ──▶ ~1400 cm³',
      '  • Brow / Jaw size:   Large jaw, heavy brow ridges ───▶ Flat face, small jaw, chin'
    ],
    workedExample: {
      question: 'Explain why giraffes have long necks using natural selection.',
      steps: [
        '1. Variation: Variation existed in the giraffe population — some giraffes had longer necks than others.',
        '2. Competition / Selection: Those with longer necks could reach more leaves/food higher in trees.',
        '3. Survival & Reproduction: They survived better, reproduced, and passed their long-neck genes to offspring.',
        '4. Change over time: Over many generations, the whole giraffe population had longer necks.'
      ],
      finalAnswer: 'Long-necked giraffes survived, reproduced, and passed on long-neck alleles over generations.'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Define natural selection.',
        answer: [
          'Natural selection is the process whereby organisms with favourable genetic traits (adaptations) suited to their environment are more likely to survive, reproduce, and pass those beneficial genes on to their offspring, causing a population to change over time.'
        ]
      },
      {
        number: 2,
        question: 'What is bipedalism and why is it an advantage?',
        answer: [
          'Bipedalism is walking upright habitually on two legs.',
          'Advantages: Frees the hands to carry food, infants, and make/use tools; gives better vision to spot predators and food over tall grass; reduces direct heat exposure from the sun and makes long-distance travel efficient.'
        ]
      },
      {
        number: 3,
        question: 'List 3 pieces of evidence for human evolution.',
        answer: [
          '1. Fossil evidence (transitional hominid skulls and skeletons showing increasing brain size and forward foramen magnum).',
          '2. Genetic / DNA evidence (mitochondrial DNA and shared nuclear DNA showing close ancestry and highest diversity in Africa).',
          '3. Cultural / archaeological evidence (development of stone tools and control of fire).'
        ]
      },
      {
        number: 4,
        question: 'Why is Africa called the Cradle of Humankind?',
        answer: [
          'Because the oldest hominid fossils (such as Australopithecus — e.g. Mrs Ples, Little Foot, Taung Child — and early Homo species) were discovered in Africa.',
          'In addition, DNA evidence shows modern humans have the highest genetic diversity in Africa, proving humans evolved in Africa before spreading worldwide (Out of Africa theory).'
        ]
      },
      {
        number: 5,
        question: 'A farmer sprays pesticide, most insects die but some survive and breed resistant insects. Explain using natural selection.',
        answer: [
          '1. Variation: Variation existed in the original insect population — a few insects already carried a gene/mutation for pesticide resistance.',
          '2. Selection: When pesticide was sprayed, non-resistant insects died while resistant insects survived.',
          '3. Inheritance: The surviving resistant insects reproduced and passed the resistance gene to their offspring.',
          '4. Over time, the proportion of resistant insects increased until most of the population was pesticide-resistant.'
        ]
      }
    ]
  }
];

export const MATHS_LITERACY_CHAPTERS: StudyGuideChapterData[] = [
  {
    subject: 'maths-literacy',
    subjectLabel: 'Maths Literacy Grade 12',
    subjectIcon: '📊',
    backPath: '/study-guide/maths-literacy-grade-12',
    chapterNumber: 1,
    slug: 'finance-income-expenditure-budgets',
    aliases: ['finance'],
    title: 'Finance - Income, Expenditure & Budgets',
    shortDescription: 'Income, expenditure, budgets, surplus vs deficit, simple interest, VAT, and tax.',
    summary: [
      'Finance is about money in and money out. Income is money you earn. Expenditure is money you spend. Budget = Income - Expenditure.',
      'If you spend more than you earn, you have a deficit. Interest is money paid for borrowing, or earned for saving.'
    ],
    formulasTitle: 'Key Formulas & Budget Diagram',
    formulas: [
      { expression: 'Profit = Income - Expenditure', meaning: 'Also Budget Balance = Income - Expenditure (surplus if +, deficit if −)' },
      { expression: 'Simple Interest: I = P × r × t', meaning: 'P = principal, r = annual rate (decimal), t = time in years' },
      { expression: 'Amount: A = P + I', meaning: 'Final total amount = original principal + interest earned/charged' },
      { expression: 'VAT = 15% in SA', meaning: 'Price incl. VAT = Price excl. VAT × 1.15' },
      { expression: 'Income Tax = Taxable Income × Rate', meaning: 'Tax calculated from taxable income using SARS tax bracket rates' }
    ],
    diagramLines: [
      '   MONEY IN (Income)  ─▶  [ Monthly Budget ]  ─▶  MONEY OUT (Expenditure)',
      '   • If Income > Expenditure  →  SURPLUS (+)  (Money left to save)',
      '   • If Expenditure > Income  →  DEFICIT (−)  (Shortfall / debt)'
    ],
    workedExample: {
      question:
        'Thandi earns R12 000 per month. She spends R4 500 rent, R2 500 food, R1 500 transport, R1 000 other. Calculate her balance.',
      steps: [
        'Monthly Income = R12 000',
        'Total Expenditure = R4 500 + R2 500 + R1 500 + R1 000 = R9 500',
        'Balance = Income - Total Expenditure = R12 000 - R9 500 = R2 500'
      ],
      finalAnswer: 'R2 500 surplus'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Define income and expenditure.',
        answer: [
          'Income: Money earned or received (such as salary, wages, allowance, or business sales).',
          'Expenditure: Money spent on goods, bills, and living costs (such as rent, food, transport, and electricity).'
        ]
      },
      {
        number: 2,
        question: 'What is the difference between surplus and deficit?',
        answer: [
          'Surplus: Occurs when Income is greater than Expenditure — there is money left over after paying expenses.',
          'Deficit: Occurs when Expenditure is greater than Income — you spent more money than you earned (a shortfall).'
        ]
      },
      {
        number: 3,
        question: 'You invest R5 000 at 10% simple interest for 2 years. Calculate interest earned.',
        answer: [
          'Formula: I = P × r × t',
          'P = R5 000, r = 10% = 0.10, t = 2 years',
          'I = 5 000 × 0.10 × 2 = R1 000',
          'Answer: R1 000 interest earned (Final amount A = R5 000 + R1 000 = R6 000).'
        ]
      },
      {
        number: 4,
        question: 'A shirt costs R400 excluding VAT. Calculate price including VAT (15%).',
        answer: [
          'VAT (15%) = 0.15 × R400 = R60',
          'Price including VAT = R400 + R60 = R460',
          '(Shortcut: R400 × 1.15 = R460)',
          'Answer: R460.'
        ]
      },
      {
        number: 5,
        question: 'Draw up a monthly budget for a learner who gets R2 000 allowance.',
        answer: [
          'INCOME:',
          '  Monthly Allowance ...................... R2 000',
          'EXPENDITURE:',
          '  Transport / Taxi fare ..................   R500',
          '  Food & School lunches ..................   R600',
          '  Data & Airtime .........................   R250',
          '  Stationery & Toiletries ................   R250',
          '  Total Expenditure ...................... R1 600',
          'BALANCE (Surplus / Savings) ..............   R400',
          '(Note: Total Expenditure + Savings = R2 000; any realistic breakdown with Balance = Income - Expenditure is valid.)'
        ]
      }
    ]
  },
  {
    subject: 'maths-literacy',
    subjectLabel: 'Maths Literacy Grade 12',
    subjectIcon: '📊',
    backPath: '/study-guide/maths-literacy-grade-12',
    chapterNumber: 2,
    slug: 'data-handling-mean-median-mode-graphs',
    aliases: ['data-handling'],
    title: 'Data Handling - Mean, Median, Mode & Graphs',
    shortDescription: 'Averages (mean, median, mode), range, probability, and bar, pie, line, and histogram graphs.',
    summary: [
      'Data handling is about collecting and reading data. Mean is average. Median is middle value. Mode is most common value. Range is biggest minus smallest.',
      'Graphs help us see patterns - bar, pie, line, histogram.'
    ],
    formulasTitle: 'Key Formulas & Graphs Box',
    formulas: [
      { expression: 'Mean = Sum of values / Number of values', meaning: 'Arithmetic average of all numbers in the data set' },
      { expression: 'Median = middle value when sorted', meaning: 'Order smallest to largest; if two middle values, average them' },
      { expression: 'Range = Max - Min', meaning: 'Spread between the biggest and smallest value' },
      { expression: 'Probability = Favourable / Total', meaning: 'Chance of an event happening (fraction, decimal, or %)' }
    ],
    diagramLines: [
      '  BAR GRAPH (gaps, categories)       HISTOGRAM (no gaps, intervals)',
      '   █   █   █                          ███',
      '   █   █   █   █                      ██████',
      '  ──A───B───C───D──                  ──0─10─20─30──',
      '  Pie chart full circle = 360°  |  100% = 360°'
    ],
    workedExample: {
      question: 'Marks: 5, 8, 8, 10, 14. Calculate mean, median, mode, range.',
      steps: [
        'Data sorted from smallest to biggest: 5, 8, 8, 10, 14 (5 values)',
        'Mean = (5 + 8 + 8 + 10 + 14) / 5 = 45 / 5 = 9',
        'Median = 8 (the middle 3rd value)',
        'Mode = 8 (appears twice — most common)',
        'Range = Max - Min = 14 - 5 = 9'
      ],
      finalAnswer: 'Mean = 9  |  Median = 8  |  Mode = 8  |  Range = 9'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Define mean, median and mode.',
        answer: [
          'Mean: The average value — sum of all values divided by the total number of values.',
          'Median: The middle value once all values are sorted from smallest to largest.',
          'Mode: The value that occurs most often (most common) in a data set.'
        ]
      },
      {
        number: 2,
        question: 'Data: 2, 4, 6, 6, 9, 11. Find median.',
        answer: [
          'The 6 values are already sorted in order: 2, 4, [6, 6], 9, 11.',
          'Because there is an even number of values, take the average of the two middle values (3rd and 4th):',
          'Median = (6 + 6) / 2 = 6',
          'Answer: 6.'
        ]
      },
      {
        number: 3,
        question: 'What is the difference between a bar graph and a histogram?',
        answer: [
          'Bar graph: Displays discrete / categorical data (separate groups like favourite subjects) and has spaces (gaps) between the bars.',
          'Histogram: Displays continuous / grouped numerical data (intervals like 0–9, 10–19) and the bars touch each other with NO gaps.'
        ]
      },
      {
        number: 4,
        question: 'In a pie chart, 90 degrees represents what percentage?',
        answer: [
          'A full pie chart circle equals 360° (= 100%).',
          'Percentage = (90° / 360°) × 100% = ¼ × 100% = 25%',
          'Answer: 25%.'
        ]
      },
      {
        number: 5,
        question: 'A bag has 3 red and 2 blue balls. What is probability of picking red?',
        answer: [
          'Total balls = 3 + 2 = 5',
          'Favourable outcomes (red) = 3',
          'Formula: Probability = Favourable / Total = 3 / 5',
          'Answer: 3/5 (or 0.6 or 60%).'
        ]
      }
    ]
  },
  {
    subject: 'maths-literacy',
    subjectLabel: 'Maths Literacy Grade 12',
    subjectIcon: '📊',
    backPath: '/study-guide/maths-literacy-grade-12',
    chapterNumber: 3,
    slug: 'measurement-length-area-volume-conversions',
    aliases: ['measurement'],
    title: 'Measurement - Length, Area, Volume & Conversions',
    shortDescription: 'Perimeter, area (rectangle, triangle, circle), volume (box, cylinder), and unit conversions.',
    summary: [
      'Measurement is about how big, how much space, how much it holds. Length in mm, cm, m, km. Area = length x breadth. Volume = length x breadth x height.',
      '1 litre = 1000 cm³. Always convert to same unit before calculating.'
    ],
    formulasTitle: 'Key Formulas & Conversion Box',
    formulas: [
      { expression: 'Area Rectangle = L × B  |  Triangle = ½ × b × h', meaning: 'Flat surface area (units², e.g. cm² or m²)' },
      { expression: 'Area Circle = π × r²', meaning: 'Use π = 3.14 (or 3.142 as given), r = radius' },
      { expression: 'Volume Box = L × B × H', meaning: '3D space inside rectangular prism (units³, e.g. cm³ or m³)' },
      { expression: 'Volume Cylinder = π × r² × h', meaning: 'Area of circular base × height' },
      { expression: '1 km = 1000 m  |  1 m = 100 cm  |  1 L = 1000 ml', meaning: 'Also 1 L = 1000 cm³  and  1 m³ = 1000 litres' }
    ],
    diagramLines: [
      '   LENGTH CONVERSIONS:   km ──(×1000)──▶ m ──(×100)──▶ cm ──(×10)──▶ mm',
      '                         km ◀─(÷1000)─── m ◀─(÷100)─── cm ◀─(÷10)─── mm',
      '   CAPACITY:             1 litre = 1000 ml = 1000 cm³   |   1 m³ = 1000 litres'
    ],
    workedExample: {
      question:
        'A room is 4m long and 3m wide. Calculate area. How many tiles of 50cm × 50cm needed?',
      steps: [
        'Area of room = 4 m × 3 m = 12 m²',
        'Convert tile dimensions to metres: 50 cm ÷ 100 = 0.5 m',
        'Tile area = 0.5 m × 0.5 m = 0.25 m²',
        'Number of tiles = Room Area ÷ Tile Area = 12 ÷ 0.25 = 48'
      ],
      finalAnswer: 'Area = 12 m²  |  48 tiles needed'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Convert 2.5 km to metres.',
        answer: [
          '1 km = 1 000 m',
          '2.5 km × 1 000 = 2 500 m',
          'Answer: 2 500 m.'
        ]
      },
      {
        number: 2,
        question: 'Calculate area of a circle with radius 7cm. Use pi = 3.14.',
        answer: [
          'Formula: Area = π × r²',
          'Substitute: Area = 3.14 × 7² = 3.14 × 49 = 153.86 cm²',
          'Answer: 153.86 cm².'
        ]
      },
      {
        number: 3,
        question: 'A tank is 2m x 1m x 1.5m. Calculate volume in litres.',
        answer: [
          'Formula: Volume = L × B × H',
          'Volume = 2 m × 1 m × 1.5 m = 3 m³',
          'Convert m³ to litres (1 m³ = 1 000 litres): 3 × 1 000 = 3 000 litres',
          'Answer: 3 000 litres.'
        ]
      },
      {
        number: 4,
        question: 'What is the difference between area and perimeter?',
        answer: [
          'Perimeter: The total distance AROUND the outside edge of a 2D shape (measured in mm, cm, m, or km).',
          'Area: The amount of flat SURFACE space INSIDE a 2D shape (measured in square units such as cm² or m²).'
        ]
      },
      {
        number: 5,
        question: 'You need to paint a wall 5m x 3m. Paint covers 8m2 per litre. How many litres needed?',
        answer: [
          'Wall Area = 5 m × 3 m = 15 m²',
          'Litres needed = Area ÷ Coverage = 15 ÷ 8 = 1.875 litres',
          'Answer: 1.875 litres (round up to 2 litres if buying whole 1-litre tins).'
        ]
      }
    ]
  },
  {
    subject: 'maths-literacy',
    subjectLabel: 'Maths Literacy Grade 12',
    subjectIcon: '📊',
    backPath: '/study-guide/maths-literacy-grade-12',
    chapterNumber: 4,
    slug: 'maps-plans-models-scale-directions-floor-plans',
    aliases: ['maps-plans-models'],
    title: 'Maps, Plans & Models - Scale, Directions & Floor Plans',
    shortDescription: 'Number & bar scales, compass directions, floor plan symbols, elevation views, and scale models.',
    summary: [
      'Maps show real places smaller. Scale tells you how much smaller. Ratio scale 1:50000 means 1cm on map = 50000cm in real life.',
      'Bar scale uses a line. Directions: North, South, East, West. Floor plans show a house from top view.'
    ],
    formulasTitle: 'Key Concepts & Scale/Compass Diagram',
    formulas: [
      { expression: 'Scale = Map distance : Real distance', meaning: 'Number scale (e.g. 1:1000) shows ratio in the same units' },
      { expression: 'Real = Map × Scale factor', meaning: 'Multiply map measurement by scale number, then convert units (cm → m → km)' },
      { expression: 'Bar Scale', meaning: 'A measured line bar on a map that stays accurate even if the map is resized' },
      { expression: 'Compass & Floor Plan Symbols', meaning: 'N, S, E, W directions; door, window, sink, North arrow, and Elevation view' }
    ],
    diagramLines: [
      '            N (0°)                    FLOOR PLAN SYMBOLS:',
      '            ↑                         ━━━  Thick black line = Wall',
      '   W ◀ ─────┼───── ▶ E (90°)          ⌒    Arc/gap = Door swing',
      '            ↓                         ═══  Double thin line = Window',
      '            S (180°)                  [○]  Basin / Sink  |  ↑N = North arrow'
    ],
    workedExample: {
      question:
        'On a map with scale 1:50000, distance is 4cm. What is real distance in km?',
      steps: [
        'Scale 1:50000 means 1 cm on map = 50 000 cm in real life',
        'Real distance in cm = 4 × 50 000 = 200 000 cm',
        'Convert cm to metres (÷ 100): 200 000 ÷ 100 = 2 000 m',
        'Convert metres to km (÷ 1 000): 2 000 ÷ 1 000 = 2 km'
      ],
      finalAnswer: '2 km'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Define scale.',
        answer: [
          'Scale is the ratio comparing a distance measured on a map, plan, or model to the corresponding actual distance in real life (Scale = Map distance : Real distance).'
        ]
      },
      {
        number: 2,
        question: 'Map distance is 6cm, scale 1:10000. Calculate real distance in metres.',
        answer: [
          'Real distance in cm = 6 × 10 000 = 60 000 cm',
          'Convert cm to metres (÷ 100): 60 000 ÷ 100 = 600 m',
          'Answer: 600 m.'
        ]
      },
      {
        number: 3,
        question: 'If you face North and turn 90 degrees clockwise, which direction do you face?',
        answer: [
          'Clockwise order from North is: North → East → South → West (each 90° turn).',
          'Answer: East.'
        ]
      },
      {
        number: 4,
        question: 'On a floor plan, what does a thick black line usually show?',
        answer: [
          'A thick black line usually shows a solid wall of the building.'
        ]
      },
      {
        number: 5,
        question: 'A model car is 1:24 scale. Real car is 4.8m long. How long is model?',
        answer: [
          'Formula: Model length = Real length ÷ 24',
          'Model length in metres = 4.8 m ÷ 24 = 0.2 m',
          'Convert metres to cm (× 100): 0.2 × 100 = 20 cm',
          'Answer: 20 cm (or 0.2 m).'
        ]
      }
    ]
  },
  {
    subject: 'maths-literacy',
    subjectLabel: 'Maths Literacy Grade 12',
    subjectIcon: '📊',
    backPath: '/study-guide/maths-literacy-grade-12',
    chapterNumber: 5,
    slug: 'probability-and-tariffs',
    aliases: ['probability-tariffs'],
    title: 'Probability & Tariffs',
    shortDescription: 'Chance from 0 to 1, percentage probability, tree diagrams/outcomes, and stepped utility tariff blocks.',
    summary: [
      'Probability is chance from 0 (impossible) to 1 (certain).',
      'Tariffs are prices that change in steps, like electricity, water and taxi fares. You must read tariff tables carefully and find which block you fall in.'
    ],
    formulasTitle: 'Key Formulas & Probability / Tariff Box',
    formulas: [
      { expression: 'Probability = Favourable outcomes / Total possible outcomes', meaning: 'Fraction between 0 and 1' },
      { expression: 'Percentage Probability = Probability × 100', meaning: 'Express chance as a percentage (%)' },
      { expression: 'Tariff Cost = Fixed charge + (Units used × Rate per unit)', meaning: 'Used when there is a monthly service fee + rate' },
      { expression: 'Electricity: Total = (Block 1 × Rate1) + (Block 2 × Rate2)...', meaning: 'Stepped / inclining block tariff (calculate block by block)' }
    ],
    diagramLines: [
      '   PROBABILITY SCALE:   0 (Impossible) ───── 0.5 (Even 50%) ───── 1 (Certain)',
      '   STEPPED TARIFF:      [ Block 1: 0–50 kWh @ R2 ] ─▶ [ Block 2: 51–150 kWh @ R3 ]'
    ],
    workedExample: {
      question:
        'A coin is tossed. What is probability of heads? A die is rolled, probability of 6?',
      steps: [
        'Coin outcomes: {Heads, Tails} → 2 total outcomes, 1 Heads',
        'P(Heads) = 1 / 2 = 0.5 = 50%',
        'Die outcomes: {1, 2, 3, 4, 5, 6} → 6 total outcomes, 1 six',
        'P(6) = 1 / 6 = 0.167 = 16.7%'
      ],
      finalAnswer: 'Coin: 1/2 = 0.5 = 50%  |  Die: 1/6 = 0.167 = 16.7%'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Define probability. Give an example of 0 and 1.',
        answer: [
          'Probability is a measure of how likely an event is to happen, measured from 0 (impossible) to 1 (certain).',
          'Example of 0 (impossible): Rolling a 7 on a standard 6-sided die.',
          'Example of 1 (certain): A tossed coin landing on either heads or tails.'
        ]
      },
      {
        number: 2,
        question: 'A bag has 5 red, 3 blue, 2 green balls. Probability of picking blue?',
        answer: [
          'Total balls = 5 + 3 + 2 = 10',
          'Favourable outcomes (blue) = 3',
          'P(blue) = 3 / 10 = 0.3 = 30%',
          'Answer: 3/10 (or 30%).'
        ]
      },
      {
        number: 3,
        question: 'Electricity: First 50 kWh at R2.00, next 100 kWh at R3.00. Calculate cost for 120 kWh.',
        answer: [
          'Split 120 kWh into blocks: 50 kWh in Block 1 + 70 kWh in Block 2 (since 120 - 50 = 70).',
          'Block 1 cost: 50 × R2.00 = R100.00',
          'Block 2 cost: 70 × R3.00 = R210.00',
          'Total cost = R100.00 + R210.00 = R310.00',
          'Answer: R310.00.'
        ]
      },
      {
        number: 4,
        question: 'Why does municipality use tariff blocks?',
        answer: [
          '1. To keep basic essential electricity and water affordable for households using small amounts (lower Block 1 rate).',
          '2. To encourage water/electricity saving and discourage heavy wasteful usage by charging higher rates in higher blocks.'
        ]
      },
      {
        number: 5,
        question: 'Two coins tossed. What is probability of 2 heads?',
        answer: [
          'All possible outcomes: HH, HT, TH, TT (4 total outcomes)',
          'Favourable outcome (2 heads): HH (1 outcome)',
          'P(2 heads) = 1 / 4 = 0.25 = 25%',
          'Answer: 1/4 (or 0.25 or 25%).'
        ]
      }
    ]
  }
];

export const MATHS_CHAPTERS: StudyGuideChapterData[] = [
  {
    subject: 'maths',
    subjectLabel: 'Mathematics Grade 12',
    subjectIcon: '📐',
    backPath: '/study-guide/maths-grade-12',
    chapterNumber: 1,
    slug: 'algebra-exponents-factorisation-equations',
    aliases: ['algebra'],
    title: 'Algebra - Exponents, Factorisation & Equations',
    shortDescription: 'Laws of exponents, common factor, difference of squares, trinomials, and linear/quadratic equations.',
    summary: [
      'Algebra is the language of Maths. Exponents tell you how many times to multiply. Factorisation is breaking down into factors.',
      'Equations must be balanced - what you do to one side, do to the other.'
    ],
    formulasTitle: 'Key Concepts & Algebra Rules',
    formulas: [
      { expression: 'aᵐ × aⁿ = aᵐ⁺ⁿ  |  aᵐ / aⁿ = aᵐ⁻ⁿ  |  (aᵐ)ⁿ = aᵐⁿ', meaning: 'Laws of Exponents (same base: add, subtract, or multiply exponents)' },
      { expression: 'Common Factor: ab + ac = a(b + c)', meaning: 'Always check for a Highest Common Factor (HCF) first' },
      { expression: 'Difference of Squares: a² - b² = (a - b)(a + b)', meaning: 'Two square terms separated by a minus sign' },
      { expression: 'Trinomial: x² + bx + c = (x + p)(x + q)', meaning: 'Find numbers p and q where p × q = c and p + q = b; solve linear & quadratic equations' }
    ],
    diagramLines: [
      '   FACTORISATION CHECKLIST (in order):',
      '   1. Common Factor first?   →  3x² - 12 = 3(x² - 4)',
      '   2. Two terms with minus?  →  Difference of squares: x² - 4 = (x - 2)(x + 2)',
      '   3. Three terms (ax²+bx+c)? →  Trinomial: x² + 5x + 6 = (x + 2)(x + 3)',
      '   4. Quadratic Eq (= 0):    →  If AB = 0 then A = 0 or B = 0'
    ],
    workedExample: {
      question: 'Factorise: x² + 5x + 6 and solve x² + 5x + 6 = 0',
      steps: [
        'Find two numbers that multiply to +6 and add to +5: +2 and +3',
        'Factorise: (x + 2)(x + 3)',
        'Set each factor to 0: x + 2 = 0  or  x + 3 = 0',
        'Solve: x = -2  or  x = -3'
      ],
      finalAnswer: 'Factors: (x + 2)(x + 3)  |  Solutions: x = -2 or x = -3'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Simplify: x^3 x x^4',
        answer: [
          'Use exponent law: aᵐ × aⁿ = aᵐ⁺ⁿ',
          'x³ × x⁴ = x³⁺⁴ = x⁷',
          'Answer: x⁷.'
        ]
      },
      {
        number: 2,
        question: 'Factorise: 3x^2 - 12',
        answer: [
          'Step 1 — Common factor (3): 3(x² - 4)',
          'Step 2 — Difference of two squares: x² - 4 = (x - 2)(x + 2)',
          'Answer: 3(x - 2)(x + 2).'
        ]
      },
      {
        number: 3,
        question: 'Solve: 2x + 5 = 13',
        answer: [
          'Subtract 5 from both sides: 2x = 13 - 5 = 8',
          'Divide both sides by 2: x = 8 / 2 = 4',
          'Answer: x = 4.'
        ]
      },
      {
        number: 4,
        question: 'Factorise: x^2 - 9',
        answer: [
          'Recognise difference of squares: x² - 3² = (x - 3)(x + 3)',
          'Answer: (x - 3)(x + 3).'
        ]
      },
      {
        number: 5,
        question: 'Solve: x^2 - 3x - 10 = 0 using factorisation.',
        answer: [
          'Find two numbers that multiply to -10 and add to -3: -5 and +2',
          'Factorise: (x - 5)(x + 2) = 0',
          'Set each factor equal to 0: x - 5 = 0  or  x + 2 = 0',
          'Answer: x = 5 or x = -2.'
        ]
      }
    ]
  },
  {
    subject: 'maths',
    subjectLabel: 'Mathematics Grade 12',
    subjectIcon: '📐',
    backPath: '/study-guide/maths-grade-12',
    chapterNumber: 2,
    slug: 'functions-straight-line-parabola-hyperbola-exponential',
    aliases: ['functions'],
    title: 'Functions - Straight Line, Parabola, Hyperbola & Exponential',
    shortDescription: 'Domain, range, x/y-intercepts, turning points, asymptotes, increasing/decreasing, and inverses.',
    summary: [
      'A function gives one y for each x. Straight line: y = mx + c. Parabola: y = ax² + q. Hyperbola: y = a/x + q. Exponential: y = a·bˣ + q.',
      'Learn shape, intercepts, turning point, asymptotes.'
    ],
    formulasTitle: 'Key Concepts & Function Shapes',
    formulas: [
      { expression: 'Domain (x) & Range (y)', meaning: 'Domain = allowed x-values; Range = possible y-values; x-intercept (y = 0), y-intercept (x = 0)' },
      { expression: 'Turning Point: x = -b / (2a)', meaning: 'Parabola axis of symmetry; substitute x back to get y' },
      { expression: 'Asymptote (y = q  and  x = -p)', meaning: 'Line the graph gets closer to without touching (hyperbola & exponential)' },
      { expression: 'Increasing / Decreasing | Inverse f⁻¹(x)', meaning: 'Swap x and y (reflect across line y = x) to find the inverse function' }
    ],
    diagramLines: [
      '   LINE (y=mx+c)    PARABOLA (y=ax²+q)   HYPERBOLA (y=a/x)   EXPONENTIAL (y=bˣ, b>1)',
      '        ╱               ∪ (a>0 min)         │ ╲                 │      ╱',
      '       ╱                ∩ (a<0 max)      ───┼───               ─┼─────╱───',
      '      ╱                                   ╲ │                   │   ╱'
    ],
    workedExample: {
      question: 'For y = x² - 4, find x-intercepts, y-intercept and turning point.',
      steps: [
        'y-intercept (let x = 0): y = 0² - 4 = -4  →  (0, -4)',
        'x-intercepts (let y = 0): x² - 4 = 0  →  (x - 2)(x + 2) = 0  →  x = 2 or x = -2',
        'Turning point: a = 1 (> 0, minimum), b = 0  →  x = -b/(2a) = 0, y = -4'
      ],
      finalAnswer: 'y-intercept: (0, -4)  |  x-intercepts: (2, 0) & (-2, 0)  |  Turning point: (0, -4), minimum'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What is a function?',
        answer: [
          'A function is a rule or relationship where each input value (x) gives exactly ONE output value (y).',
          'On a graph, a function passes the vertical line test (any vertical line cuts the graph at most once).'
        ]
      },
      {
        number: 2,
        question: 'Find gradient and y-intercept of y = 3x - 2',
        answer: [
          'Compare with y = mx + c:',
          'Gradient (m) = 3',
          'y-intercept (c) = -2  →  point (0, -2).'
        ]
      },
      {
        number: 3,
        question: 'Sketch y = -x^2 + 4. Give turning point.',
        answer: [
          '          y',
          '          ● (0, 4) Max TP',
          '        ╱ │ ╲',
          '       ╱  │  ╲',
          ' ───(-2,0)┼───(2,0)─── x',
          '     ╱    │    ╲',
          '• a = -1 (< 0), so parabola opens downwards (∩).',
          '• Turning point: (0, 4) — maximum.'
        ]
      },
      {
        number: 4,
        question: 'For y = 2/x, what is the asymptote?',
        answer: [
          'A hyperbola y = 2/x has TWO asymptotes (lines the graph approaches but never touches):',
          '1. Vertical asymptote: x = 0 (the y-axis, because division by 0 is undefined).',
          '2. Horizontal asymptote: y = 0 (the x-axis).'
        ]
      },
      {
        number: 5,
        question: 'If f(x) = 2^x, find f(3) and f(-1).',
        answer: [
          'f(3) = 2³ = 2 × 2 × 2 = 8',
          'f(-1) = 2⁻¹ = 1 / 2¹ = ½ (or 0.5)',
          'Answer: f(3) = 8 and f(-1) = 1/2.'
        ]
      }
    ]
  },
  {
    subject: 'maths',
    subjectLabel: 'Mathematics Grade 12',
    subjectIcon: '📐',
    backPath: '/study-guide/maths-grade-12',
    chapterNumber: 3,
    slug: 'trigonometry-sin-cos-tan-identities-2d-3d',
    aliases: ['trigonometry', 'trig'],
    title: 'Trigonometry - sin, cos, tan, Identities & 2D/3D',
    shortDescription: 'SOH CAH TOA ratios, special angles (30°, 45°, 60°), trig identities, sine rule, and cosine rule.',
    summary: [
      'Trig is about triangles and angles. sin = Opposite/Hypotenuse, cos = Adjacent/Hypotenuse, tan = Opposite/Adjacent. Use SOH CAH TOA.',
      'Special angles 30, 45, 60. Identities: sin² + cos² = 1. Sine rule and Cosine rule for non-right triangles.'
    ],
    formulasTitle: 'Key Formulas & Right Triangle Diagram',
    formulas: [
      { expression: 'sin θ = Opp/Hyp  |  cos θ = Adj/Hyp  |  tan θ = Opp/Adj', meaning: 'SOH CAH TOA for right-angled triangles' },
      { expression: 'sin²θ + cos²θ = 1', meaning: 'Fundamental Pythagorean trig identity (and tan θ = sin θ / cos θ)' },
      { expression: 'Sine Rule: a / sin A = b / sin B', meaning: 'Use in non-right triangles with opposite side-angle pairs' },
      { expression: 'Cosine Rule: c² = a² + b² - 2ab cos C', meaning: 'Use when given SAS (two sides & included angle) or SSS' }
    ],
    diagramLines: [
      '           ╱│                 SPECIAL ANGLES:',
      '    Hyp   ╱ │ Opp             • sin 30° = 1/2,  cos 30° = √3/2',
      '         ╱ θ│                 • sin 45° = √2/2, cos 45° = √2/2',
      '        └───┘                 • sin 60° = √3/2, cos 60° = 1/2',
      '         Adj'
    ],
    workedExample: {
      question: 'In right triangle, Opp = 3, Hyp = 5. Find sin θ and θ.',
      steps: [
        'Use SOH: sin θ = Opp / Hyp',
        'sin θ = 3 / 5 = 0.6',
        'Use inverse sin: θ = sin⁻¹(0.6) = 36.87°'
      ],
      finalAnswer: 'sin θ = 0.6  |  θ = 36.87°'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Define sin, cos, tan.',
        answer: [
          'In a right-angled triangle (SOH CAH TOA):',
          'sin θ = Opposite / Hypotenuse',
          'cos θ = Adjacent / Hypotenuse',
          'tan θ = Opposite / Adjacent'
        ]
      },
      {
        number: 2,
        question: 'Find x if sin x = 0.5',
        answer: [
          'x = sin⁻¹(0.5) = 30°',
          '(For 0° ≤ x ≤ 360°, sin x = 0.5 is positive in Q1 and Q2: x = 30° or x = 150°.)'
        ]
      },
      {
        number: 3,
        question: 'Prove sin^2 30 + cos^2 30 = 1',
        answer: [
          'Special angle values: sin 30° = 1/2  and  cos 30° = √3 / 2',
          'LHS = sin²30° + cos²30° = (1/2)² + (√3 / 2)²',
          '= 1/4 + 3/4 = 4/4 = 1 = RHS (Proved).'
        ]
      },
      {
        number: 4,
        question: 'In triangle ABC, a=7, b=9, angle A=40 degrees. Find angle B using sine rule.',
        answer: [
          'Formula: sin B / b = sin A / a',
          'sin B / 9 = sin 40° / 7',
          'sin B = (9 × sin 40°) / 7 ≈ (9 × 0.6428) / 7 = 0.8264',
          'B = sin⁻¹(0.8264) = 55.73° (or 124.27° in the ambiguous obtuse case).'
        ]
      },
      {
        number: 5,
        question: 'A ladder 5m leans at 60 degrees to ground. How high up wall?',
        answer: [
          'Hypotenuse = 5 m, angle to ground = 60°, wall height = Opposite side (h).',
          'sin 60° = h / 5  →  h = 5 × sin 60°',
          'h = 5 × 0.8660 = 4.33 m',
          'Answer: 4.33 m up the wall.'
        ]
      }
    ]
  },
  {
    subject: 'maths',
    subjectLabel: 'Mathematics Grade 12',
    subjectIcon: '📐',
    backPath: '/study-guide/maths-grade-12',
    chapterNumber: 4,
    slug: 'geometry-analytical-geometry-circle-parallel-lines',
    aliases: ['geometry', 'analytical-geometry'],
    title: 'Geometry & Analytical Geometry - Circle, Parallel Lines & Straight Line Graphs',
    shortDescription: 'Distance, midpoint, gradient, straight lines, circle equation x² + y² = r², and Euclidean theorems.',
    summary: [
      'Geometry proves shapes. Analytical geometry uses coordinates to find distance, midpoint, gradient.',
      'Circle theorem: angle at centre = 2 × angle at circumference. Parallel lines: alternate angles equal, corresponding angles equal.'
    ],
    formulasTitle: 'Key Formulas & Geometry Theorems Box',
    formulas: [
      { expression: 'Distance = √((x₂ - x₁)² + (y₂ - y₁)²)', meaning: 'Length of line segment between (x₁, y₁) and (x₂, y₂)' },
      { expression: 'Midpoint = ((x₁ + x₂)/2 , (y₁ + y₂)/2)', meaning: 'Halfway point between two coordinates' },
      { expression: 'Gradient: m = (y₂ - y₁)/(x₂ - x₁)', meaning: 'Slope of line; Equation: y = mx + c' },
      { expression: 'Circle centre (0,0): x² + y² = r²', meaning: 'Circle equation with radius r centred at the origin' }
    ],
    diagramLines: [
      '   EUCLIDEAN RULES:                   ANALYTICAL LINE AB:',
      '   • Angle at centre = 2 × ∠ at circ.      B(x₂,y₂) ──●',
      '   • Parallel lines (∥):                          ╱',
      '     - Alternate angles equal (Z)          A(x₁,y₁) ●',
      '     - Corresponding angles equal (F)     m = (y₂-y₁)/(x₂-x₁)'
    ],
    workedExample: {
      question: 'Points A(1,2) and B(5,6). Find distance and midpoint.',
      steps: [
        'Distance AB = √((5 - 1)² + (6 - 2)²) = √(4² + 4²) = √(16 + 16) = √32 = 5.66 units',
        'Midpoint M = ((1 + 5)/2 , (2 + 6)/2) = (6/2 , 8/2) = (3, 4)'
      ],
      finalAnswer: 'Distance = 5.66 (√32)  |  Midpoint = (3, 4)'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Define gradient.',
        answer: [
          'Gradient (m) is the measure of the steepness (slope) of a straight line — equal to the vertical change (rise) divided by the horizontal change (run): m = (y₂ - y₁) / (x₂ - x₁).'
        ]
      },
      {
        number: 2,
        question: 'Find distance between (0,0) and (3,4)',
        answer: [
          'Formula: d = √((x₂ - x₁)² + (y₂ - y₁)²)',
          'd = √((3 - 0)² + (4 - 0)²) = √(9 + 16) = √25 = 5',
          'Answer: 5 units.'
        ]
      },
      {
        number: 3,
        question: 'Find midpoint of (2,4) and (6,10)',
        answer: [
          'Formula: M = ((x₁ + x₂)/2 , (y₁ + y₂)/2)',
          'M = ((2 + 6)/2 , (4 + 10)/2) = (8/2 , 14/2) = (4, 7)',
          'Answer: (4, 7).'
        ]
      },
      {
        number: 4,
        question: 'What is angle at centre if angle at circumference is 35 degrees?',
        answer: [
          'Circle theorem: Angle at centre = 2 × angle at circumference.',
          'Angle at centre = 2 × 35° = 70°',
          'Answer: 70°.'
        ]
      },
      {
        number: 5,
        question: 'Find equation of line through (0,3) with gradient 2.',
        answer: [
          'Formula: y = mx + c',
          'Given m = 2 and y-intercept (0, 3) so c = 3.',
          'Answer: y = 2x + 3.'
        ]
      }
    ]
  },
  {
    subject: 'maths',
    subjectLabel: 'Mathematics Grade 12',
    subjectIcon: '📐',
    backPath: '/study-guide/maths-grade-12',
    chapterNumber: 5,
    slug: 'probability-statistics-mean-median-standard-deviation',
    aliases: ['probability-statistics'],
    title: 'Probability & Statistics - Mean, Median, Standard Deviation & Probability Rules',
    shortDescription: 'Mean, median, variance, standard deviation, addition rule, complementary events, and independence.',
    summary: [
      'Statistics describes data. Probability predicts chance. Mean = average, Median = middle, Standard deviation shows spread.',
      'Probability: P(A or B) = P(A) + P(B) - P(A and B). Independent events: P(A and B) = P(A) × P(B).'
    ],
    formulasTitle: 'Key Formulas & Statistics / Probability Box',
    formulas: [
      { expression: 'Mean = Sum / n  |  Variance = Sum (x - mean)² / n', meaning: 'Standard Deviation = √(Variance) measures spread around the mean' },
      { expression: 'P(A) = Favourable / Total  |  P(not A) = 1 - P(A)', meaning: 'Basic & complementary probability rules' },
      { expression: 'P(A or B) = P(A) + P(B) - P(A and B)', meaning: 'Addition rule (if mutually exclusive, P(A and B) = 0)' },
      { expression: 'P(A and B) = P(A) × P(B)', meaning: 'Multiplication rule for independent events' }
    ],
    diagramLines: [
      '   SPREAD AROUND MEAN:        PROBABILITY RULES:',
      '   Small σ:  ● ●●● ● (tight)  • Not A:        P(A\') = 1 - P(A)',
      '   Large σ: ●  ●   ●  ● (wide) • Independent: P(A∩B) = P(A) × P(B)'
    ],
    workedExample: {
      question: 'Data: 2, 4, 4, 6, 9. Find mean and standard deviation.',
      steps: [
        'Mean = (2 + 4 + 4 + 6 + 9) / 5 = 25 / 5 = 5',
        'Squared deviations (x - 5)²: (2-5)² = 9, (4-5)² = 1, (4-5)² = 1, (6-5)² = 1, (9-5)² = 16',
        'Variance = (9 + 1 + 1 + 1 + 16) / 5 = 28 / 5 = 5.6',
        'Standard Deviation = √5.6 = 2.37'
      ],
      finalAnswer: 'Mean = 5  |  Std Dev = 2.37'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Define standard deviation in words.',
        answer: [
          'Standard deviation is a measure of spread that shows how far, on average, data values lie from the mean.',
          'A smaller standard deviation means data values are clustered closely around the mean; a larger standard deviation means values are more spread out.'
        ]
      },
      {
        number: 2,
        question: 'Find median of 3, 7, 7, 9, 12, 15',
        answer: [
          'Data is sorted with 6 values (even): 3, 7, [7, 9], 12, 15.',
          'Median = average of the two middle values = (7 + 9) / 2 = 16 / 2 = 8',
          'Answer: 8.'
        ]
      },
      {
        number: 3,
        question: 'A die is rolled twice. Probability of two 6s?',
        answer: [
          'Each roll is independent with P(6) = 1/6.',
          'P(6 and 6) = (1/6) × (1/6) = 1/36',
          'Answer: 1/36 (≈ 0.0278 or 2.78%).'
        ]
      },
      {
        number: 4,
        question: 'P(A)=0.4, P(B)=0.5, independent. Find P(A and B).',
        answer: [
          'Formula for independent events: P(A and B) = P(A) × P(B)',
          'P(A and B) = 0.4 × 0.5 = 0.2',
          'Answer: 0.2 (or 20%).'
        ]
      },
      {
        number: 5,
        question: 'If P(rain) = 0.3, what is P(no rain)?',
        answer: [
          'Formula: P(not A) = 1 - P(A)',
          'P(no rain) = 1 - 0.3 = 0.7',
          'Answer: 0.7 (or 70%).'
        ]
      }
    ]
  }
];

export const TVET_CHAPTERS: StudyGuideChapterData[] = [
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 1,
    slug: 'n1-maths-algebra-fractions-equations',
    aliases: ['n1-algebra-fractions-equations', 'tvet-n1-mathematics'],
    title: 'TVET N1 Mathematics: Algebra, Fractions & Equations',
    shortDescription:
      'Fractions, common denominators, exponent laws, transposition, and solving linear equations for all trades.',
    summary: [
      'N1 Maths is the foundation for all trades. You must master fractions, exponents, algebra and solving equations.',
      'If you fail this, you fail Engineering Science too. Always convert fractions to a common denominator before adding or subtracting, and keep every equation balanced.'
    ],
    formulasTitle: 'Key Formulas & Rules Box',
    formulas: [
      {
        expression: 'Fractions: Add = Common Denominator',
        meaning: 'a/b + c/d = (ad + bc) / bd — find the Lowest Common Denominator (LCD) first'
      },
      {
        expression: 'Exponents: aᵐ × aⁿ = aᵐ⁺ⁿ',
        meaning: 'When multiplying the same base, keep the base and add the exponents'
      },
      {
        expression: 'Solve: 2x + 5 = 13 ⇒ x = 4',
        meaning: '2x = 13 - 5 = 8, then divide both sides by 2 to get x = 4'
      },
      {
        expression: 'Transposition: Change side, change sign',
        meaning: '+ becomes −, − becomes +, × becomes ÷ when moving across the = sign'
      }
    ],
    diagramLines: [
      '   FRACTION ADDITION (LCD):          TRANSPOSITION RULE:',
      '     1     1     3     2     5         3x - 7  =  8',
      '    ─── + ─── = ─── + ─── = ───            └───▶ move across "=" → +7',
      '     2     3     6     6     6         3x      =  8 + 7 = 15  ⇒  x = 5'
    ],
    workedExample: {
      question: 'Solve: 3x - 7 = 8',
      steps: [
        'Move -7 to the right side using transposition (change side, change sign): 3x = 8 + 7',
        'Add the numbers on the right side: 3x = 15',
        'Divide both sides by 3: x = 15 / 3'
      ],
      finalAnswer: 'x = 5'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Simplify: 1/2 + 1/3',
        answer: [
          'Find the common denominator (LCD) of 2 and 3, which is 6.',
          'Convert each fraction: 1/2 = 3/6 and 1/3 = 2/6.',
          'Add the numerators: 3/6 + 2/6 = 5/6',
          'Answer: 5/6.'
        ]
      },
      {
        number: 2,
        question: 'Solve: 4x + 2 = 18',
        answer: [
          'Move +2 to the right side (change sign to -2): 4x = 18 - 2',
          'Simplify: 4x = 16',
          'Divide both sides by 4: x = 16 / 4 = 4',
          'Answer: x = 4.'
        ]
      },
      {
        number: 3,
        question: 'Simplify: x² × x³',
        answer: [
          'Use the exponent law: aᵐ × aⁿ = aᵐ⁺ⁿ',
          'x² × x³ = x²⁺³ = x⁵',
          'Answer: x⁵.'
        ]
      },
      {
        number: 4,
        question: 'A cable is 3/4 m long, cut off 1/2 m. How much left?',
        answer: [
          'Remaining length = 3/4 - 1/2',
          'Use common denominator 4: 1/2 = 2/4',
          'Subtract: 3/4 - 2/4 = 1/4 m (or 0.25 m)',
          'Answer: 1/4 m left.'
        ]
      },
      {
        number: 5,
        question: 'Make x subject: y = 2x + 3',
        answer: [
          'Move +3 to the left side (change sign to -3): y - 3 = 2x',
          'Divide both sides by 2: (y - 3) / 2 = x',
          'Answer: x = (y - 3) / 2.'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 2,
    slug: 'n1-engineering-science-forces-moments-pressure',
    aliases: ['n1-forces-moments-pressure', 'tvet-n1-engineering-science'],
    title: 'TVET N1 Engineering Science: Forces, Moments & Pressure',
    shortDescription:
      'Force (F = ma), weight, turning moments around a pivot, pressure (P = F/A), density, and SI trade units.',
    summary: [
      'Engineering Science is Physics for trades. Force = Mass × Acceleration. Moment = Force × Distance. Pressure = Force / Area.',
      'Must know units: Force in Newton (N), Mass in kilogram (kg), Acceleration in m/s², Moment in N·m, and Pressure in Pascal (Pa).'
    ],
    formulasTitle: 'Key Formulas & Units Box',
    formulas: [
      {
        expression: 'F = m × a',
        meaning: 'Force (N) = mass (kg) × acceleration (m/s²)'
      },
      {
        expression: 'Moment = F × d',
        meaning: 'Turning moment (N·m) = force (N) × perpendicular distance from pivot (m)'
      },
      {
        expression: 'Pressure = F / A',
        meaning: 'Pressure in Pascal (Pa or N/m²) = force (N) ÷ area (m²)'
      },
      {
        expression: 'Weight = m × g (g = 9.81 m/s²)',
        meaning: 'Gravitational force on a mass (N); Density = Mass / Volume (kg/m³)'
      }
    ],
    diagramLines: [
      '   TURNING MOMENT AROUND PIVOT:        PRESSURE ON SURFACE:',
      '   Force (F = 50 N) ↓                    Force (F) ↓',
      '   ─────────────────▲──────────────     ┌───────────────┐',
      '   |<-- d = 2 m --->| Pivot             │   Area (A)    │ P = F / A',
      '   Moment = F × d = 100 N·m             └───────────────┘'
    ],
    workedExample: {
      question: 'A mass of 10kg is pushed with acceleration 2 m/s². Find Force.',
      steps: [
        'Write down the given values: m = 10 kg, a = 2 m/s²',
        'Formula: F = m × a',
        'Substitute and calculate: F = 10 × 2 = 20 N'
      ],
      finalAnswer: 'F = 20 N'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Define Force and give its unit.',
        answer: [
          'Force is a push or a pull that changes, or tends to change, an object’s state of rest, motion, or shape.',
          'SI Unit: Newton (N).'
        ]
      },
      {
        number: 2,
        question: 'Find weight of 5kg mass.',
        answer: [
          'Formula: Weight = m × g (where g = 9.81 m/s²)',
          'Weight = 5 × 9.81 = 49.05 N',
          'Answer: 49.05 N (downwards).'
        ]
      },
      {
        number: 3,
        question: 'A force of 50N acts 2m from pivot. Find moment.',
        answer: [
          'Formula: Moment = F × d',
          'Moment = 50 N × 2 m = 100 N·m',
          'Answer: 100 N·m.'
        ]
      },
      {
        number: 4,
        question: 'Force 100N on area 0.5 m². Find pressure.',
        answer: [
          'Formula: Pressure = F / A',
          'Pressure = 100 N / 0.5 m² = 200 Pa',
          'Answer: 200 Pa (or 200 N/m²).'
        ]
      },
      {
        number: 5,
        question: 'Convert 5000g to kg.',
        answer: [
          '1 kg = 1000 g, so divide grams by 1000.',
          '5000 ÷ 1000 = 5 kg',
          'Answer: 5 kg.'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 3,
    slug: 'n2-maths-logarithms-mensuration-trigonometry',
    aliases: ['n2-logarithms-mensuration-trigonometry', 'tvet-n2-mathematics'],
    title: 'TVET N2 Mathematics: Logarithms, Mensuration & Trigonometry',
    shortDescription:
      'Base-10 logarithms, area & volume mensuration of circles and cylinders, and SOH CAH TOA trigonometry for trades.',
    summary: [
      'N2 Maths builds on N1. Logarithms make big numbers easy. Mensuration = Area and Volume of shapes.',
      'Trigonometry = sin, cos, tan for engineering drawings and triangles.'
    ],
    formulasTitle: 'Key Formulas & Engineering Diagram',
    formulas: [
      {
        expression: 'log(a × b) = log a + log b',
        meaning: 'Logarithm product rule; base-10 log asks "10 to what power?" (log 10ⁿ = n)'
      },
      {
        expression: 'Area Circle = πr²',
        meaning: 'Surface area of a circular plate or cross-section with radius r'
      },
      {
        expression: 'Volume Cylinder = πr²h',
        meaning: 'Volume of a cylindrical tank, pipe, or shaft with radius r and height h'
      },
      {
        expression: 'sin θ = Opp/Hyp  |  cos θ = Adj/Hyp  |  tan θ = Opp/Adj',
        meaning: 'SOH CAH TOA trigonometric ratios in a right-angled triangle'
      }
    ],
    diagramLines: [
      '   CYLINDER MENSURATION:           RIGHT TRIANGLE (SOH CAH TOA):',
      '        ╭───────╮  r                     ╱│',
      '       (─────────)                   Hyp ╱ │ Opp',
      '        │       │  h                    ╱θ │',
      '        ╰───────╯  V = πr²h            ────┘ (Adj)'
    ],
    workedExample: {
      question: 'Find log 1000.',
      steps: [
        'Write 1000 as a power of 10: 1000 = 10 × 10 × 10 = 10³',
        'A common logarithm (log) uses base 10: log₁₀(10³) = 3'
      ],
      finalAnswer: 'log 1000 = 3 (because 10³ = 1000)'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Find log 100',
        answer: [
          'Write 100 as a power of 10: 100 = 10²',
          'Therefore log 100 = 2.',
          'Answer: 2.'
        ]
      },
      {
        number: 2,
        question: 'Area of circle radius 7cm? Use pi = 3.14',
        answer: [
          'Formula: Area Circle = πr²',
          'Area = 3.14 × 7² = 3.14 × 49 = 153.86 cm²',
          'Answer: 153.86 cm².'
        ]
      },
      {
        number: 3,
        question: 'Volume of cylinder r=2, h=5?',
        answer: [
          'Formula: Volume Cylinder = πr²h',
          'Using π = 3.14: V = 3.14 × 2² × 5 = 3.14 × 4 × 5 = 62.8 units³',
          '(Using exact π gives 20π ≈ 62.83 units³.)'
        ]
      },
      {
        number: 4,
        question: 'In right triangle Opp=4, Hyp=5. Find sin theta.',
        answer: [
          'Formula: sin θ = Opp / Hyp',
          'sin θ = 4 / 5 = 0.8',
          'Answer: sin θ = 4/5 (or 0.8).'
        ]
      },
      {
        number: 5,
        question: 'Solve: log x = 2',
        answer: [
          'Common logarithm uses base 10: log₁₀ x = 2 means x = 10².',
          'x = 10 × 10 = 100',
          'Answer: x = 100.'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 4,
    slug: 'n2-engineering-science-motion-energy-power',
    aliases: ['n2-motion-energy-power', 'tvet-n2-engineering-science'],
    title: 'TVET N2 Engineering Science: Motion, Energy & Power',
    shortDescription:
      'Linear motion (v = u + at), work done, kinetic & potential energy, power (W = J/s), and machine efficiency.',
    summary: [
      'Motion: speed, velocity, acceleration. Energy cannot be created or destroyed — it only changes from one form to another.',
      'Power = Work / Time. Machines: efficiency = Output / Input × 100%.'
    ],
    formulasTitle: 'Key Formulas & Mechanics Box',
    formulas: [
      {
        expression: 'v = u + at  |  s = ut + ½at²',
        meaning: 'Equations of linear motion (u = initial velocity, v = final velocity, a = acceleration, t = time)'
      },
      {
        expression: 'Work = F × d  |  Power = Work / Time',
        meaning: 'Work in Joules (J); Power in Watts (W = J/s)'
      },
      {
        expression: 'KE = ½mv²  |  PE = mgh',
        meaning: 'Kinetic Energy (½mv²) and Gravitational Potential Energy (mgh)'
      },
      {
        expression: 'Efficiency = (Output / Input) × 100%',
        meaning: 'Percentage of input power or energy converted into useful output'
      }
    ],
    diagramLines: [
      '   ENERGY & POWER IN MACHINES:',
      '   Input Energy/Power ──▶ [ MACHINE ] ──▶ Useful Output (80 W)',
      '                              │',
      '                              ▼  Losses (Heat / Friction)',
      '   Efficiency = (Output / Input) × 100%'
    ],
    workedExample: {
      question: 'A car accelerates from 0 to 20 m/s in 5 seconds. Find acceleration.',
      steps: [
        'Given values: u = 0 m/s, v = 20 m/s, t = 5 s',
        'Rearrange v = u + at to find acceleration: a = (v - u) / t',
        'Substitute: a = (20 - 0) / 5 = 20 / 5 = 4 m/s²'
      ],
      finalAnswer: 'a = 4 m/s²'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Define Power and give unit.',
        answer: [
          'Power is the rate at which work is done (or energy is transferred): Power = Work / Time.',
          'SI Unit: Watt (W), where 1 W = 1 J/s.'
        ]
      },
      {
        number: 2,
        question: 'Work done if F=100N moves 5m?',
        answer: [
          'Formula: Work = F × d',
          'Work = 100 N × 5 m = 500 J',
          'Answer: 500 J.'
        ]
      },
      {
        number: 3,
        question: 'Find KE of 2kg mass moving at 3 m/s.',
        answer: [
          'Formula: KE = ½mv²',
          'KE = ½ × 2 × 3² = 1 × 9 = 9 J',
          'Answer: 9 J.'
        ]
      },
      {
        number: 4,
        question: 'Machine output 80W, input 100W. Find efficiency.',
        answer: [
          'Formula: Efficiency = (Output / Input) × 100%',
          'Efficiency = (80 / 100) × 100% = 80%',
          'Answer: 80%.'
        ]
      },
      {
        number: 5,
        question: 'A 10kg object lifted 2m. Find PE. (g=9.81)',
        answer: [
          'Formula: PE = m × g × h',
          'PE = 10 × 9.81 × 2 = 196.2 J',
          'Answer: 196.2 J.'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 5,
    slug: 'n3-maths-calculus-complex-numbers-determinants',
    aliases: ['n3-calculus-complex-numbers-determinants', 'tvet-n3-mathematics'],
    title: 'TVET N3 Mathematics: Calculus, Complex Numbers & Determinants',
    shortDescription:
      'Power-rule differentiation & integration, complex numbers (i² = -1), and 2×2 matrix determinants.',
    summary: [
      'N3 Maths is university level. Calculus: differentiation finds gradient. Integration finds area.',
      'Complex numbers use i where i² = -1. Determinants solve simultaneous equations fast.'
    ],
    formulasTitle: 'Key Formulas & Calculus / Matrix Box',
    formulas: [
      {
        expression: 'y = xⁿ ⇒ dy/dx = n·xⁿ⁻¹',
        meaning: 'Differentiation power rule — gives the gradient (slope) at any x'
      },
      {
        expression: '∫ xⁿ dx = xⁿ⁺¹ / (n + 1) + C',
        meaning: 'Integration power rule (n ≠ -1) — finds area under a curve'
      },
      {
        expression: 'i² = -1  (√-1 = i)',
        meaning: 'Imaginary unit for complex numbers in the form a + bi'
      },
      {
        expression: 'Det |a  b ; c  d| = ad - bc',
        meaning: '2×2 determinant calculated by cross-multiplying top-left×bottom-right minus top-right×bottom-left'
      }
    ],
    diagramLines: [
      '   CALCULUS BRIDGE:                   2×2 DETERMINANT:',
      '   y = x²  ──(Differentiate)──▶  2x     │ a  b │',
      '   x² + C  ◀──(Integrate)─────  2x      │ c  d │  =  (a × d) - (b × c)'
    ],
    workedExample: {
      question: 'Differentiate y = 3x² + 2x',
      steps: [
        'Differentiate first term 3x² using n·xⁿ⁻¹: 3 × 2x²⁻¹ = 6x',
        'Differentiate second term 2x (= 2x¹): 2 × 1x¹⁻¹ = 2',
        'Combine both derivatives: dy/dx = 6x + 2'
      ],
      finalAnswer: 'dy/dx = 6x + 2'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Differentiate y = x³',
        answer: [
          'Use power rule: if y = xⁿ, dy/dx = n·xⁿ⁻¹',
          'dy/dx = 3x³⁻¹ = 3x²',
          'Answer: dy/dx = 3x².'
        ]
      },
      {
        number: 2,
        question: 'Integrate: ∫ 2x dx',
        answer: [
          'Use integration rule: ∫ xⁿ dx = xⁿ⁺¹ / (n + 1) + C',
          '∫ 2x¹ dx = 2 × (x² / 2) + C = x² + C',
          'Answer: x² + C.'
        ]
      },
      {
        number: 3,
        question: 'Simplify: i² + 3i - 2',
        answer: [
          'Substitute i² = -1:',
          '(-1) + 3i - 2 = -3 + 3i',
          'Answer: -3 + 3i (or 3i - 3).'
        ]
      },
      {
        number: 4,
        question: 'Find determinant of [2 3; 1 4]',
        answer: [
          'Formula: Det |a b; c d| = ad - bc',
          'Det = (2 × 4) - (3 × 1) = 8 - 3 = 5',
          'Answer: 5.'
        ]
      },
      {
        number: 5,
        question: 'Find gradient of y = x² at x = 2',
        answer: [
          'First find derivative (gradient formula): dy/dx = 2x',
          'Substitute x = 2: gradient = 2(2) = 4',
          'Answer: 4.'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 6,
    slug: 'n3-engineering-science-heat-electricity-friction',
    aliases: ['n3-heat-electricity-friction', 'tvet-n3-engineering-science'],
    title: 'TVET N3 Engineering Science: Heat, Electricity & Friction',
    shortDescription:
      "Heat transfer (Q = mcΔT), Ohm's Law & circuit power (V = IR, P = VI), and friction forces (F = μN).",
    summary: [
      "Heat expands metals. Electricity: V = I × R. Friction opposes motion.",
      "Must know Ohm's Law, power in circuits, specific heat capacity (Q = m·c·ΔT), and coefficient of friction (μ)."
    ],
    formulasTitle: 'Key Formulas & Circuits / Friction Box',
    formulas: [
      {
        expression: 'V = I × R',
        meaning: "Ohm's Law: Voltage (V) = Current (A) × Resistance (Ω)"
      },
      {
        expression: 'P = V × I = I²R',
        meaning: 'Electrical power in Watts (W) dissipated in a circuit or resistor'
      },
      {
        expression: 'Q = m × c × ΔT',
        meaning: 'Heat energy (J) = mass (kg) × specific heat capacity (J/kg·°C) × temperature rise (°C)'
      },
      {
        expression: 'F = μ × N  |  Efficiency = (Out/In) × 100%',
        meaning: 'Friction force = coefficient μ × normal force N; heat & machine efficiency'
      }
    ],
    diagramLines: [
      '   OHM’S LAW CIRCUIT:              FRICTION ON SURFACE:',
      '    ┌───( V )───┐                       Normal Force N ↑',
      '    │           │                        ┌─────────────┐',
      '   (+)         [R] 10 Ω        Motion ──▶│   Object    │ ◀── Friction F = μN',
      '    │   I=2A    │                        └─────────────┘',
      '    └─────▶─────┘                       Weight W = mg ↓'
    ],
    workedExample: {
      question: 'Current 2A through resistor 10Ω. Find voltage.',
      steps: [
        'Write down given values: I = 2 A, R = 10 Ω',
        "Use Ohm's Law: V = I × R",
        'Substitute: V = 2 × 10 = 20 V'
      ],
      finalAnswer: 'V = 20 V'
    },
    practiceQuestions: [
      {
        number: 1,
        question: "Define Ohm's Law.",
        answer: [
          "Ohm's Law states that the current (I) flowing through a metallic conductor is directly proportional to the potential difference (V) across its ends, provided temperature remains constant.",
          'Formula: V = I × R.'
        ]
      },
      {
        number: 2,
        question: 'If V=12V, I=3A, find R.',
        answer: [
          'Formula: R = V / I',
          'R = 12 V / 3 A = 4 Ω',
          'Answer: 4 Ω.'
        ]
      },
      {
        number: 3,
        question: 'Power if V=20V, I=2A?',
        answer: [
          'Formula: P = V × I',
          'P = 20 V × 2 A = 40 W',
          'Answer: 40 W.'
        ]
      },
      {
        number: 4,
        question: 'Friction force if μ=0.3, N=100N?',
        answer: [
          'Formula: F = μ × N',
          'F = 0.3 × 100 N = 30 N',
          'Answer: 30 N.'
        ]
      },
      {
        number: 5,
        question: 'Heat needed to raise 2kg water by 10°C? c=4186',
        answer: [
          'Formula: Q = m × c × ΔT',
          'Q = 2 × 4186 × 10 = 83 720 J',
          'Answer: 83 720 J (or 83.72 kJ).'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 7,
    slug: 'n1-industrial-electronics-components-resistors-diodes',
    aliases: ['n1-components-resistors-diodes', 'tvet-n1-industrial-electronics'],
    title: 'TVET N1 Industrial Electronics: Components, Resistors & Diodes',
    shortDescription:
      'Electronic components, resistor colour codes, series/parallel resistance, diodes, and forward-biased LEDs.',
    summary: [
      'Electronics = control of current. Resistor limits current. Capacitor stores charge.',
      'Diode allows current one way only. LED lights up when forward biased.'
    ],
    formulasTitle: 'Key Formulas & Colour Code Box',
    formulas: [
      {
        expression: 'V = I × R',
        meaning: "Ohm's Law: I = V / R (Current in Amps, Voltage in Volts, Resistance in Ohms)"
      },
      {
        expression: 'Series: R_T = R₁ + R₂',
        meaning: 'Total resistance in series equals the sum of all resistors'
      },
      {
        expression: 'Parallel: 1/R_T = 1/R₁ + 1/R₂',
        meaning: 'Total resistance in parallel is smaller than the smallest resistor'
      },
      {
        expression: '0 Black • 1 Brown • 2 Red • 3 Orange • 4 Yellow • 5 Green • 6 Blue • 7 Violet • 8 Grey • 9 White',
        meaning: '4-Band Colour Code: (Band1 Band2) × 10^(Band3) Ohms'
      }
    ],
    diagramLines: [
      '   SERIES RESISTORS:             DIODE SYMBOL (One-Way Current):',
      '   ──[ R₁ ]──[ R₂ ]──            Anode (+) ───▶|─── Cathode (−)',
      '   R_T = R₁ + R₂                 Forward bias: (+) on Anode ⇒ Conducts!'
    ],
    workedExample: {
      question: 'Two resistors 10Ω and 20Ω in series. Find total.',
      steps: [
        'In a series circuit, the same current flows through both resistors.',
        'Formula: R_T = R₁ + R₂',
        'R_T = 10 + 20 = 30 Ω'
      ],
      finalAnswer: 'R_T = 30 Ω'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What does a diode do?',
        answer: [
          'A diode allows electric current to flow in one direction only (from Anode to Cathode when forward biased) and blocks current in the reverse direction.'
        ]
      },
      {
        number: 2,
        question: 'Total resistance of 10Ω and 10Ω in parallel?',
        answer: [
          'Formula: 1/R_T = 1/R₁ + 1/R₂',
          '1/R_T = 1/10 + 1/10 = 2/10 = 1/5',
          'Invert: R_T = 5 Ω',
          'Answer: 5 Ω.'
        ]
      },
      {
        number: 3,
        question: 'Colour code for Red, Red, Brown?',
        answer: [
          'Band 1 (Red) = 2',
          'Band 2 (Red) = 2',
          'Band 3 Multiplier (Brown) = 1 zero (× 10¹ = × 10)',
          'Resistance = 22 × 10 = 220 Ω',
          'Answer: 220 Ω.'
        ]
      },
      {
        number: 4,
        question: 'What is forward bias?',
        answer: [
          'Forward bias is when the positive terminal (+) of the power supply is connected to the diode’s Anode (P-material) and the negative terminal (−) to its Cathode (N-material), allowing current to flow (and making an LED light up).'
        ]
      },
      {
        number: 5,
        question: 'If V=9V, R=3Ω, find I.',
        answer: [
          "Formula: I = V / R (from Ohm's Law V = I × R)",
          'I = 9 V / 3 Ω = 3 A',
          'Answer: 3 A.'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 8,
    slug: 'n1-electrical-trade-theory-cables-protection',
    aliases: ['n1-basic-electricity-cables-protection', 'tvet-n1-electrical-trade-theory'],
    title: 'TVET N1 Electrical Trade Theory: Basic Electricity, Cables & Protection',
    shortDescription:
      'Electrical safety, SA 3-core wire colours (Brown/Blue/Green-Yellow), fuses, circuit breakers, cable sizing, and kWh energy.',
    summary: [
      'Electricians must know safety, cables, and circuits. Live = brown, Neutral = blue, Earth = green/yellow.',
      'Fuse and circuit breaker protect against overload and short circuits. Never work live — always isolate and test before touching.'
    ],
    formulasTitle: 'Key Formulas & Safety / Cable Box',
    formulas: [
      {
        expression: 'V = I × R  |  P = V × I',
        meaning: "Ohm's Law and Electrical Power (Watts = Volts × Amps)"
      },
      {
        expression: 'Energy (kWh) = Power (kW) × Time (h)',
        meaning: 'Convert Watts to kW by dividing by 1000 (1 kW = 1000 W)'
      },
      {
        expression: 'Live = Brown • Neutral = Blue • Earth = Green/Yellow',
        meaning: 'Standard South African 3-core cable colour code'
      },
      {
        expression: 'Cable size (mm²) depends on current (A)',
        meaning: 'Higher current requires a thicker cable conductor and properly rated breaker/fuse'
      }
    ],
    diagramLines: [
      '   3-CORE CABLE & CIRCUIT PROTECTION:',
      '   Supply ──[ Fuse / Breaker ]──▶ Live (Brown)    ──▶ [ Load ]',
      '                                  Neutral (Blue)  ◀── [ Load ]',
      '                                  Earth (Grn/Yel) ──▶ Metal Body (Safety)'
    ],
    workedExample: {
      question: 'A 2000W heater runs on 230V. Find current.',
      steps: [
        'Use power formula P = V × I and rearrange for current: I = P / V',
        'Substitute P = 2000 W and V = 230 V: I = 2000 / 230',
        'Calculate: I = 8.695... ≈ 8.7 A'
      ],
      finalAnswer: 'I = 8.7 A'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What are the colours of Live, Neutral, Earth?',
        answer: [
          'Live = Brown',
          'Neutral = Blue',
          'Earth = Green / Yellow striped.'
        ]
      },
      {
        number: 2,
        question: 'What is the purpose of a fuse?',
        answer: [
          'A fuse protects circuits and appliances against overload or short-circuit overcurrent.',
          'When too much current flows, the thin fuse wire melts and breaks the circuit before cables overheat or start a fire.'
        ]
      },
      {
        number: 3,
        question: 'A kettle 1000W runs for 2 hours. Find energy in kWh.',
        answer: [
          'Convert power to kilowatts: 1000 W ÷ 1000 = 1 kW',
          'Formula: Energy = Power (kW) × Time (hours)',
          'Energy = 1 kW × 2 h = 2 kWh',
          'Answer: 2 kWh.'
        ]
      },
      {
        number: 4,
        question: 'Why must you never work on live circuits?',
        answer: [
          'Working on live circuits can cause fatal electric shock, severe burns, or arc-flash injury and short circuits.',
          'Always switch off, isolate/lock out the supply, and test for zero voltage with a tester before working.'
        ]
      },
      {
        number: 5,
        question: 'If V=230V, I=10A, find Power.',
        answer: [
          'Formula: P = V × I',
          'P = 230 V × 10 A = 2300 W (or 2.3 kW)',
          'Answer: 2300 W (2.3 kW).'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 9,
    slug: 'n4-maths-advanced-calculus-trigonometry-graphs',
    aliases: ['n4-advanced-calculus-trig-graphs', 'tvet-n4-mathematics'],
    title: 'TVET N4 Mathematics: Advanced Calculus & Trigonometry Graphs',
    shortDescription:
      'Trig differentiation & integration, integration by parts, and amplitude/period of sine & cosine graphs.',
    summary: [
      'N4 is diploma level. Differentiation of trig functions, integration by parts, sine graphs, and cosine graphs.',
      'Used in engineering design, AC waveforms, vibrations, and electrical or mechanical signals.'
    ],
    formulasTitle: 'Key Formulas & Trig Wave Diagram',
    formulas: [
      {
        expression: 'd/dx (sin x) = cos x  |  d/dx (cos x) = -sin x',
        meaning: 'Derivatives of sine and cosine (chain rule: d/dx sin(kx) = k cos(kx))'
      },
      {
        expression: '∫ sin x dx = -cos x + C  |  ∫ cos x dx = sin x + C',
        meaning: 'Standard trigonometric integrals (don’t forget + C!)'
      },
      {
        expression: 'y = A sin(Bx + C)',
        meaning: 'Amplitude = |A|; Period = 2π / B radians (or 360° / B)'
      },
      {
        expression: '∫ u dv = u·v - ∫ v du',
        meaning: 'Integration by parts formula for products of functions'
      }
    ],
    diagramLines: [
      '   SINE GRAPH y = A sin(Bx):         TRIG DERIVATIVE CYCLE:',
      '     +A ┼   ╭─╮                        sin x ──(d/dx)──▶  cos x',
      '      0 ┼──╱───╲───╱───  (Period=2π/B)   ▲                  │',
      '     -A ┼       ╰─╯                    −cos x ◀──(d/dx)── −sin x'
    ],
    workedExample: {
      question: 'Differentiate y = sin 2x',
      steps: [
        'Use the chain rule with d/dx (sin u) = cos(u) · du/dx',
        'Let u = 2x, so du/dx = 2',
        'Multiply by derivative of inside: dy/dx = cos(2x) × 2 = 2 cos 2x'
      ],
      finalAnswer: 'dy/dx = 2 cos 2x'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Differentiate y = cos x',
        answer: [
          'Standard trig derivative: d/dx (cos x) = -sin x',
          'Answer: dy/dx = -sin x.'
        ]
      },
      {
        number: 2,
        question: 'Integrate ∫ cos x dx',
        answer: [
          'Since d/dx (sin x) = cos x, integrating cos x returns sin x + C.',
          'Answer: sin x + C.'
        ]
      },
      {
        number: 3,
        question: 'Find amplitude of y = 3 sin x',
        answer: [
          'Compare with y = A sin(Bx + C): A = 3.',
          'Amplitude = |A| = 3.',
          'Answer: 3.'
        ]
      },
      {
        number: 4,
        question: 'Differentiate y = x² + sin x',
        answer: [
          'Differentiate term by term: d/dx(x²) = 2x and d/dx(sin x) = cos x.',
          'Answer: dy/dx = 2x + cos x.'
        ]
      },
      {
        number: 5,
        question: 'What is period of y = sin 2x?',
        answer: [
          'In y = A sin(Bx), B = 2.',
          'Period in radians = 2π / B = 2π / 2 = π',
          'Period in degrees = 360° / 2 = 180°',
          'Answer: π radians (or 180°).'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 10,
    slug: 'n4-engineering-science-thermodynamics-fluid-mechanics',
    aliases: ['n4-thermodynamics-fluid-mechanics', 'tvet-n4-engineering-science'],
    title: 'TVET N4 Engineering Science: Thermodynamics & Fluid Mechanics',
    shortDescription:
      'Thermodynamics (heat & work), ideal gas law, liquid pressure, flow rate, and Bernoulli in boilers & hydraulics.',
    summary: [
      'Thermodynamics = heat and work. Fluids: pressure in liquids, Bernoulli, and flow rate.',
      'Used in boilers, steam turbines, pumps, compressors, and industrial hydraulics.'
    ],
    formulasTitle: 'Key Formulas & Fluid / Heat Diagram',
    formulas: [
      {
        expression: 'Q = m · c · ΔT',
        meaning: 'Heat energy transferred (J) = mass (kg) × specific heat capacity × temp change'
      },
      {
        expression: 'P · V = n · R · T',
        meaning: 'Ideal Gas Law connecting pressure, volume, moles, and Kelvin temperature'
      },
      {
        expression: 'Q_flow = Area × Velocity (A · v)',
        meaning: 'Volumetric flow rate in pipes (m³/s)'
      },
      {
        expression: 'P = ρ · g · h',
        meaning: 'Hydrostatic pressure in a liquid at depth h (Pa = N/m²)'
      },
      {
        expression: 'W = P · ΔV',
        meaning: 'Thermodynamic boundary work done during volume change at constant pressure'
      }
    ],
    diagramLines: [
      '   HYDROSTATIC PRESSURE:            BERNOULLI PIPE FLOW:',
      '   ~~~ water surface (h = 0) ~~~    Wide (A1) ──▶ Narrow (A2)',
      '      │  depth h                    Slow v1       Fast v2',
      '      ▼  P = ρ · g · h              High P1       Low P2'
    ],
    workedExample: {
      question: 'Pressure at depth 5m in water (ρ = 1000, g = 9.81)',
      steps: [
        'Write hydrostatic pressure formula: P = ρ × g × h',
        'Substitute values: ρ = 1000 kg/m³, g = 9.81 m/s², h = 5 m',
        'Calculate: P = 1000 × 9.81 × 5 = 49 050 Pa',
        'Convert to kilopascals: 49 050 ÷ 1000 = 49.05 kPa'
      ],
      finalAnswer: 'P = 49 050 Pa = 49.05 kPa'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Define Thermodynamics.',
        answer: [
          'Thermodynamics is the branch of engineering science that studies heat, temperature, work, and energy transformations in systems such as engines, boilers, and turbines.'
        ]
      },
      {
        number: 2,
        question: 'Flow rate if Area = 0.02 m², Velocity = 3 m/s?',
        answer: [
          'Formula: Flow Rate = Area × Velocity',
          'Flow Rate = 0.02 m² × 3 m/s = 0.06 m³/s',
          'Answer: 0.06 m³/s (or 60 litres/second).'
        ]
      },
      {
        number: 3,
        question: 'Pressure at 10m depth in water?',
        answer: [
          'Formula: P = ρ × g × h (with water ρ = 1000 kg/m³, g = 9.81 m/s²)',
          'P = 1000 × 9.81 × 10 = 98 100 Pa',
          'Answer: 98 100 Pa (or 98.1 kPa).'
        ]
      },
      {
        number: 4,
        question: "What is Bernoulli's principle in simple words?",
        answer: [
          'In a flowing fluid, where fluid speed increases, its internal pressure decreases (and where speed decreases, pressure increases), reflecting conservation of energy.'
        ]
      },
      {
        number: 5,
        question: 'If Q = 5000J, m = 1kg, ΔT = 10°C, find c?',
        answer: [
          'Formula: Q = m × c × ΔT  ⇒  c = Q ÷ (m × ΔT)',
          'c = 5000 ÷ (1 × 10) = 5000 ÷ 10 = 500 J/(kg·°C)',
          'Answer: c = 500 J/(kg·°C).'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 11,
    slug: 'n1-fitting-and-machining-tools-measuring-safety',
    aliases: ['n1-fitting-machining', 'tvet-n1-fitting-and-machining'],
    title: 'TVET N1 Fitting & Machining: Tools, Measuring & Safety',
    shortDescription:
      'Hand fitting, lathe/milling machining, vernier & micrometer measurement, RPM, tolerance, clearance & workshop safety.',
    summary: [
      'Fitting = cutting, filing, drilling, and tapping. Machining = lathe turning, milling, and grinding.',
      'Must measure accurately with a vernier caliper, micrometer, and steel rule. Safety first: wear goggles, no loose clothing, and keep machine guards in place.'
    ],
    formulasTitle: 'Key Formulas & Measurement Diagram',
    formulas: [
      {
        expression: 'Speed = Distance / Time',
        meaning: 'Linear travel or feed rate calculation'
      },
      {
        expression: 'RPM = (Cutting Speed × 1000) / (π × Diameter)',
        meaning: 'Spindle speed (rev/min) for cutting speed in m/min and diameter in mm'
      },
      {
        expression: 'Tolerance = Upper Limit − Lower Limit',
        meaning: 'Total permissible variation in part dimension (mm)'
      },
      {
        expression: 'Clearance = Hole − Shaft',
        meaning: 'Play or gap between a mating hole and shaft (mm)'
      }
    ],
    diagramLines: [
      '   FIT & CLEARANCE:               SPINDLE SPEED (LATHE / DRILL):',
      '   ┌──── Hole (50.1mm) ────┐      Cutting Speed (S) in m/min',
      '   │  [══ Shaft 50.0mm ═]  │      N = (S × 1000) ÷ (π × D)',
      '   └─ Clearance = 0.1 mm ──┘      Always wear goggles & guards!'
    ],
    workedExample: {
      question: 'Cutting speed 30 m/min, diameter 50mm. Find RPM.',
      steps: [
        'Write spindle speed formula: RPM = (Cutting Speed × 1000) / (π × Diameter)',
        'Substitute Cutting Speed = 30 m/min, π ≈ 3.142, Diameter = 50 mm',
        'Calculate numerator: 30 × 1000 = 30 000',
        'Calculate denominator: 3.142 × 50 = 157.1',
        'Divide: 30 000 ÷ 157.1 ≈ 190.96 ≈ 191 RPM'
      ],
      finalAnswer: '191 RPM'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Name 3 fitting tools.',
        answer: [
          'Any 3 standard hand fitting tools, such as:',
          '1. Hacksaw (for cutting metal)',
          '2. Flat file (for smoothing and shaping surfaces)',
          '3. Centre punch / ball-peen hammer / scriber / tap & die set.'
        ]
      },
      {
        number: 2,
        question: 'What is a micrometer used for?',
        answer: [
          'A micrometer is a precision measuring instrument used to take very accurate measurements (typically to 0.01 mm) such as shaft diameters, metal sheet thickness, or bore sizes.'
        ]
      },
      {
        number: 3,
        question: 'If upper limit 50.2mm, lower limit 49.8mm, find tolerance.',
        answer: [
          'Formula: Tolerance = Upper Limit − Lower Limit',
          'Tolerance = 50.2 mm − 49.8 mm = 0.4 mm',
          'Answer: 0.4 mm.'
        ]
      },
      {
        number: 4,
        question: 'Why must you wear goggles in workshop?',
        answer: [
          'Goggles protect your eyes from flying metal chips (swarf), hot sparks, grinding dust, broken drill bits, and cutting fluid splashes.'
        ]
      },
      {
        number: 5,
        question: 'Hole 50.1mm, Shaft 50.0mm, find clearance.',
        answer: [
          'Formula: Clearance = Hole − Shaft',
          'Clearance = 50.1 mm − 50.0 mm = 0.1 mm',
          'Answer: 0.1 mm.'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 12,
    slug: 'n1-motor-trade-theory-engine-basics-tools-safety',
    aliases: ['n1-motor-trade-theory', 'tvet-n1-motor-trade-theory'],
    title: 'TVET N1 Motor Trade Theory: Engine Basics, Tools & Safety',
    shortDescription:
      '4-stroke cycle, petrol vs diesel ignition, engine components (piston, crankshaft, camshaft, valves), power & efficiency.',
    summary: [
      'An engine converts fuel energy into mechanical motion. The 4-stroke cycle is Intake, Compression, Power, Exhaust.',
      'Petrol engines use a spark plug; diesel engines use compression ignition. Know workshop tools, safety rules, and engine parts: piston, crankshaft, camshaft, and valves.'
    ],
    formulasTitle: 'Key Formulas & 4-Stroke Cycle Diagram',
    formulas: [
      {
        expression: 'Power = Work / Time',
        meaning: 'Rate at which engine work is done (Watts = J/s)'
      },
      {
        expression: 'Efficiency = (Output / Input) × 100%',
        meaning: 'Percentage of input fuel energy converted into useful output power'
      },
      {
        expression: 'Compression Ratio = (Swept Volume + Clearance Volume) / Clearance Volume',
        meaning: 'Ratio of total cylinder volume at BDC to clearance volume at TDC'
      }
    ],
    diagramLines: [
      '   4-STROKE ENGINE CYCLE:',
      '   [1. INTAKE] ──▶ [2. COMPRESSION] ──▶ [3. POWER] ──▶ [4. EXHAUST]',
      '   Piston Down      Piston Up           Ignition!      Piston Up',
      '   Air/Fuel In      Squeeze Mixture     Piston Down    Burnt Gas Out'
    ],
    workedExample: {
      question: 'Engine does 5000J work in 10 seconds. Find power.',
      steps: [
        'Write power formula: Power = Work / Time',
        'Substitute Work = 5000 J and Time = 10 s',
        'Calculate: Power = 5000 ÷ 10 = 500 W'
      ],
      finalAnswer: 'Power = 500 W'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'List the 4 strokes in order.',
        answer: [
          '1. Intake (Induction)',
          '2. Compression',
          '3. Power (Combustion / Expansion)',
          '4. Exhaust'
        ]
      },
      {
        number: 2,
        question: 'Difference between petrol and diesel engine?',
        answer: [
          'A petrol engine draws in an air-fuel mixture and uses a spark plug to ignite it (spark ignition).',
          'A diesel engine compresses pure air to very high pressure and temperature, then injects diesel fuel which self-ignites without a spark plug (compression ignition).'
        ]
      },
      {
        number: 3,
        question: 'What does the crankshaft do?',
        answer: [
          'The crankshaft converts the up-and-down (reciprocating) motion of the pistons (via the connecting rods) into smooth rotational (rotary) motion to drive the flywheel, gearbox, and wheels.'
        ]
      },
      {
        number: 4,
        question: 'Why is safety important in a workshop?',
        answer: [
          'Workshop safety prevents serious accidents such as burns, crushed hands/feet under jacks, electric shock, eye injuries, and slipping on oil spills, while protecting tools and vehicles from damage.'
        ]
      },
      {
        number: 5,
        question: 'If output 400W, input 500W, find efficiency.',
        answer: [
          'Formula: Efficiency = (Output / Input) × 100%',
          'Efficiency = (400 / 500) × 100% = 0.8 × 100% = 80%',
          'Answer: 80%.'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 13,
    slug: 'n2-industrial-electronics-transistors-amplifiers-power-supplies',
    aliases: ['n2-transistors-amplifiers-power-supplies', 'tvet-n2-industrial-electronics'],
    title: 'TVET N2 Industrial Electronics: Transistors, Amplifiers & Power Supplies',
    shortDescription:
      'BJT transistors (Base, Collector, Emitter), signal amplification, gain, and AC-to-DC regulated power supplies.',
    summary: [
      'A transistor acts as an electronic switch and amplifier. It has three terminals: Base (B), Collector (C), and Emitter (E), in NPN and PNP types.',
      'An amplifier increases a weak signal. A DC power supply converts AC to steady DC using four stages: transformer, rectifier, filter, and voltage regulator.'
    ],
    formulasTitle: 'Key Formulas & Power Supply / BJT Diagram',
    formulas: [
      {
        expression: 'V = I × R',
        meaning: "Ohm's Law for resistor biasing and load calculations"
      },
      {
        expression: 'Gain (A_v) = Output / Input',
        meaning: 'Ratio of output signal amplitude to input signal amplitude'
      },
      {
        expression: 'I_C = β × I_B',
        meaning: 'Collector current equals DC current gain (β or h_FE) times Base current'
      },
      {
        expression: 'AC → Transformer → Rectifier → Filter → Regulator → DC',
        meaning: 'Rectification converts AC to pulsating DC; capacitor filter reduces ripple voltage'
      }
    ],
    diagramLines: [
      '   DC POWER SUPPLY STAGES:                  NPN TRANSISTOR (BJT):',
      '   [AC In] ──▶ [Transformer] ──▶ [Rectifier]     Collector (C)',
      '                                      │               │',
      '   [Steady DC Out] ◀── [Regulator] ◀── [Filter]  Base (B) ──┤▶ Emitter (E)'
    ],
    workedExample: {
      question: 'Transistor β = 100, Base current 0.02A. Find Collector current.',
      steps: [
        'Write transistor current gain formula: I_C = β × I_B',
        'Substitute β = 100 and I_B = 0.02 A',
        'Calculate: I_C = 100 × 0.02 = 2 A'
      ],
      finalAnswer: 'I_C = 2 A'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Name the 3 legs of a transistor.',
        answer: [
          '1. Base (B) — controls the transistor',
          '2. Collector (C) — main current input/collection terminal',
          '3. Emitter (E) — emits charge carriers (shown with an arrow on the symbol).'
        ]
      },
      {
        number: 2,
        question: 'What does an amplifier do?',
        answer: [
          'An amplifier takes a weak input electrical signal (such as voltage, current, or audio) and increases its strength/amplitude to produce a larger output signal without changing its shape.'
        ]
      },
      {
        number: 3,
        question: 'If Gain = 10, Input = 2V, find Output.',
        answer: [
          'Formula: Gain = Output / Input  ⇒  Output = Gain × Input',
          'Output = 10 × 2 V = 20 V',
          'Answer: 20 V.'
        ]
      },
      {
        number: 4,
        question: 'What is a rectifier?',
        answer: [
          'A rectifier is a diode circuit (half-wave or full-wave bridge) that allows current to flow in one direction only, converting Alternating Current (AC) into pulsating Direct Current (DC).'
        ]
      },
      {
        number: 5,
        question: 'If β = 50, I_B = 0.01A, find I_C.',
        answer: [
          'Formula: I_C = β × I_B',
          'I_C = 50 × 0.01 A = 0.5 A',
          'Answer: I_C = 0.5 A.'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 14,
    slug: 'n2-electrical-trade-theory-ac-circuits-transformers-motors',
    aliases: ['n2-ac-circuits-transformers-motors', 'tvet-n2-electrical-trade-theory'],
    title: 'TVET N2 Electrical Trade Theory: AC Circuits, Transformers & Motors',
    shortDescription:
      'Alternating current (50 Hz SA), step-up/down transformers, 1-phase & 3-phase motors, power factor & earthing protection.',
    summary: [
      'AC changes direction periodically. A transformer steps AC voltage up or down. Single-phase and 3-phase motors drive industrial equipment.',
      'Power factor is essential for efficient electrical power delivery. Electricians must also understand earthing and circuit protection.'
    ],
    formulasTitle: 'Key Formulas & Transformer Diagram',
    formulas: [
      {
        expression: 'V = I × R',
        meaning: "Ohm's Law linking voltage, current, and resistance/impedance"
      },
      {
        expression: 'P = V × I × Power Factor (cos θ)',
        meaning: 'True AC power (Watts) accounting for phase angle between voltage and current'
      },
      {
        expression: 'Transformer Ratio: Vp / Vs = Np / Ns',
        meaning: 'Primary-to-secondary voltage ratio equals primary-to-secondary turns ratio'
      },
      {
        expression: 'Frequency = 50 Hz (in South Africa)',
        meaning: 'AC supply completes 50 full cycles every second (period T = 1/50 = 20 ms)'
      }
    ],
    diagramLines: [
      '   IDEAL TRANSFORMER:                  AC SINE WAVE (50 Hz SA):',
      '   Vp ──┐ ╭─╮║║╭─╮ ┌── Vs                +V ┼  ╭─╮',
      '        │ │ │║║│ │ │                      0 ┼─╱───╲───▶ t (20 ms/cycle)',
      '   Np ──┘ ╰─╯║║╰─╯ └── Ns (Core)         -V ┼     ╰─╯'
    ],
    workedExample: {
      question: 'Transformer primary 230V, 500 turns, secondary 100 turns. Find secondary voltage.',
      steps: [
        'Write transformer ratio formula: Vp / Vs = Np / Ns',
        'Rearrange for secondary voltage: Vs = (Vp × Ns) / Np',
        'Substitute Vp = 230 V, Ns = 100 turns, Np = 500 turns',
        'Calculate: Vs = (230 × 100) / 500 = 23 000 / 500 = 46 V'
      ],
      finalAnswer: 'Vs = 46 V'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What is AC?',
        answer: [
          'AC stands for Alternating Current — an electric current that continuously reverses its direction of flow and changes magnitude periodically (50 times per second / 50 Hz on South African mains).'
        ]
      },
      {
        number: 2,
        question: 'What does a transformer do?',
        answer: [
          'A transformer uses electromagnetic induction between primary and secondary windings on a magnetic core to step AC voltage up (increase) or down (decrease) at the same frequency.'
        ]
      },
      {
        number: 3,
        question: 'Primary 230V, ratio 10:1, find secondary voltage.',
        answer: [
          'Formula: Vp / Vs = Np / Ns = 10 / 1',
          'Vs = 230 V ÷ 10 = 23 V',
          'Answer: 23 V.'
        ]
      },
      {
        number: 4,
        question: 'What is power factor?',
        answer: [
          'Power factor (cos θ) is the ratio of true/active power (W or kW) to apparent power (VA or kVA) in an AC circuit, indicating how efficiently supplied electrical power is converted into useful work (ideal = 1).'
        ]
      },
      {
        number: 5,
        question: 'Why is earthing important?',
        answer: [
          'Earthing connects exposed metal parts safely to the ground so that if a live fault touches the casing, a high fault current flows immediately to trip the circuit breaker or earth-leakage unit, preventing fatal electric shock and fire.'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 15,
    slug: 'n3-industrial-electronics-digital-logic-thyristors-control',
    aliases: ['n3-digital-logic-thyristors-control', 'tvet-n3-industrial-electronics'],
    title: 'TVET N3 Industrial Electronics: Digital Logic, Thyristors & Control',
    shortDescription:
      'Binary & truth tables (AND, OR, NOT, NAND, NOR), SCR/thyristor high-power switching, motor control & timers.',
    summary: [
      'Digital electronics works with binary 0 and 1. Logic gates include AND, OR, NOT, NAND, and NOR. A Thyristor / SCR controls high electrical power.',
      'Used in motor speed control, timers, and industrial alarms. You must know logic truth tables and binary-to-decimal conversions.'
    ],
    formulasTitle: 'Key Rules & Logic Gate / SCR Diagram',
    formulas: [
      {
        expression: 'Binary Counting: … 16 | 8 | 4 | 2 | 1 (2⁴, 2³, 2², 2¹, 2⁰)',
        meaning: 'Multiply each binary bit (0 or 1) by its power of 2 and add to get decimal'
      },
      {
        expression: 'AND Gate (Y = A · B)',
        meaning: 'Output is 1 ONLY if both inputs A and B are 1'
      },
      {
        expression: 'OR Gate (Y = A + B)',
        meaning: 'Output is 1 if ANY input (A or B or both) is 1'
      },
      {
        expression: 'NOT Gate (Y = Ā)',
        meaning: 'Inverts the input (0 becomes 1, and 1 becomes 0)'
      }
    ],
    diagramLines: [
      '   LOGIC GATES:                       THYRISTOR (SCR):',
      '   A ──┐                              Anode (A) ──▶|── Cathode (K)',
      '       ├─[AND]──▶ Y = A·B                           /',
      '   B ──┘   (1 only if both 1)                 Gate (G) trigger pulse'
    ],
    workedExample: {
      question: 'AND gate inputs A = 1, B = 0. Find output.',
      steps: [
        'Recall AND rule: Y = A · B (Output = 1 only when BOTH inputs are 1)',
        'Check inputs: A = 1 and B = 0 (not both 1)',
        'Evaluate: 1 · 0 = 0'
      ],
      finalAnswer: 'Output = 0'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What is a logic gate?',
        answer: [
          'A logic gate is a basic digital electronic circuit that accepts one or more binary inputs (0 or 1) and produces a single binary output (0 or 1) according to a specific logical rule (e.g., AND, OR, NOT).'
        ]
      },
      {
        number: 2,
        question: 'Truth table for OR gate?',
        answer: [
          'OR Gate (Y = A + B) — Output is 1 if any input is 1:',
          '• A = 0, B = 0  →  Y = 0',
          '• A = 0, B = 1  →  Y = 1',
          '• A = 1, B = 0  →  Y = 1',
          '• A = 1, B = 1  →  Y = 1'
        ]
      },
      {
        number: 3,
        question: 'What does NOT gate do?',
        answer: [
          'A NOT gate (inverter) reverses/inverts its single input: if input A = 0 then output Y = 1, and if input A = 1 then output Y = 0.'
        ]
      },
      {
        number: 4,
        question: 'What is a thyristor used for?',
        answer: [
          'A thyristor (SCR) is a 3-terminal semiconductor power switch (Anode, Cathode, Gate) used to control high-power AC or DC loads such as DC motor speed drives, light dimmers, controlled rectifiers, and industrial heaters.'
        ]
      },
      {
        number: 5,
        question: 'Convert binary 101 to decimal.',
        answer: [
          'Use binary place values (4, 2, 1):',
          '101₂ = (1 × 4) + (0 × 2) + (1 × 1) = 4 + 0 + 1 = 5',
          'Answer: 5 (decimal).'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 16,
    slug: 'n3-electrical-trade-theory-3-phase-protection-installations',
    aliases: ['n3-3-phase-protection-installations', 'tvet-n3-electrical-trade-theory'],
    title: 'TVET N3 Electrical Trade Theory: 3-Phase, Protection & Installations',
    shortDescription:
      'SA 3-phase systems (400V line / 230V phase), contactors, overload relays, 3-phase power, SANS 10142 & testing.',
    summary: [
      'A 3-phase supply has 3 live wires with 400V between phases and 230V from phase to neutral. Contactors, relays, and overload units switch and protect motors.',
      'Electricians must follow SANS 10142 wiring rules, correct cable sizing, and installation testing procedures.'
    ],
    formulasTitle: 'Key Formulas & 3-Phase Star Diagram',
    formulas: [
      {
        expression: 'P = √3 × V_L × I_L × Power Factor (cos θ)',
        meaning: 'Total 3-phase active power in Watts (√3 ≈ 1.732)'
      },
      {
        expression: 'V_L = √3 × V_Phase',
        meaning: 'Line-to-line voltage equals √3 times phase-to-neutral voltage (Star)'
      },
      {
        expression: 'Energy = P × t',
        meaning: 'Electrical energy consumed (kWh = Power in kW × Time in hours)'
      }
    ],
    diagramLines: [
      '   3-PHASE STAR CONNECTION (SA):       MOTOR STARTER PROTECTION:',
      '   L1 ───┐       V_L (L1–L2) = 400V    Supply ─▶ [Isolator] ─▶ [Contactor]',
      '   L2 ───┼── N   V_Ph (L–N)  = 230V                              │',
      '   L3 ───┘                             Motor ◀── [Overload Relay] ┘'
    ],
    workedExample: {
      question: '3-phase motor V_L = 400V, I_L = 10A, PF = 0.8. Find Power.',
      steps: [
        'Write 3-phase power formula: P = √3 × V_L × I_L × PF',
        'Substitute √3 ≈ 1.732, V_L = 400 V, I_L = 10 A, PF = 0.8',
        'Calculate: P = 1.732 × 400 × 10 × 0.8 = 5542.4 W ≈ 5542 W',
        'Convert to kilowatts: 5542 ÷ 1000 ≈ 5.54 kW'
      ],
      finalAnswer: 'P = 5542 W = 5.54 kW'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What is 3-phase voltage in SA?',
        answer: [
          'In South Africa, standard 3-phase voltage is 400 V between any two live phases (line voltage) and 230 V between any one phase and neutral (phase voltage) at 50 Hz.'
        ]
      },
      {
        number: 2,
        question: 'Difference between phase and line voltage?',
        answer: [
          'Phase voltage (V_Phase = 230 V) is the voltage measured between one live phase conductor and the neutral wire.',
          'Line voltage (V_L = 400 V) is the voltage measured directly between any two live phase conductors (V_L = √3 × V_Phase).'
        ]
      },
      {
        number: 3,
        question: 'What does a contactor do?',
        answer: [
          'A contactor is an electromagnetic power switch designed to safely switch heavy current loads (like 3-phase motors) ON and OFF remotely via a push-button or relay control circuit.'
        ]
      },
      {
        number: 4,
        question: 'What is an overload relay for?',
        answer: [
          'An overload relay protects a motor from drawing excessive current over time (overloading or single-phasing) by tripping open the contactor coil circuit before the motor windings overheat and burn out.'
        ]
      },
      {
        number: 5,
        question: 'If V_Phase = 230V, find V_Line.',
        answer: [
          'Formula: V_Line = √3 × V_Phase',
          'V_Line = 1.732 × 230 V = 398.36 V (standardised as 400 V)',
          'Answer: ≈ 398.4 V (400 V nominal).'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 17,
    slug: 'n2-fitting-and-machining-lathe-drilling-screw-threads',
    aliases: ['n2-lathe-drilling-screw-threads', 'tvet-n2-fitting-and-machining'],
    title: 'TVET N2 Fitting & Machining: Lathe, Drilling & Screw Threads',
    shortDescription:
      'Centre lathe parts (chuck, tool post, tailstock, bed), drilling, taps vs dies, cutting speeds, feeds & thread pitch.',
    summary: [
      'A centre lathe turns cylindrical metal workpieces. Key parts are the chuck, tool post, tailstock, and bed. Drilling produces round holes.',
      'Tapping cuts internal threads inside a hole, while a die cuts external threads on a shaft or bolt. You must know cutting speeds, feeds, and thread pitch.'
    ],
    formulasTitle: 'Key Formulas & Centre Lathe Diagram',
    formulas: [
      {
        expression: 'RPM = (Cutting Speed × 1000) / (π × Diameter)',
        meaning: 'Spindle speed (rev/min) from cutting speed (m/min) and diameter (mm)'
      },
      {
        expression: 'Feed = Feed per rev × RPM',
        meaning: 'Linear tool travel rate in mm/min along the workpiece'
      },
      {
        expression: 'Pitch = 1 / Threads per inch (TPI)',
        meaning: 'Distance from one screw thread crest to the next (imperial/metric pitch)'
      }
    ],
    diagramLines: [
      '   CENTRE LATHE LAYOUT:               SCREW THREADING:',
      '   [Headstock/Chuck]══Workpiece══▶[Tailstock]   Tap ─▶ Internal thread (hole)',
      '             [Tool Post]                        Die ─▶ External thread (rod)',
      '   ═══════════════ Bed ═══════════════════'
    ],
    workedExample: {
      question: 'Cutting speed 25 m/min, diameter 40mm. Find RPM.',
      steps: [
        'Write spindle speed formula: RPM = (Cutting Speed × 1000) / (π × Diameter)',
        'Substitute Cutting Speed = 25 m/min, π ≈ 3.142, Diameter = 40 mm',
        'Calculate numerator: 25 × 1000 = 25 000',
        'Calculate denominator: 3.142 × 40 = 125.68',
        'Divide: 25 000 ÷ 125.68 ≈ 198.9 ≈ 199 RPM'
      ],
      finalAnswer: '199 RPM'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Name 3 parts of a lathe.',
        answer: [
          'Any 3 main parts of a centre lathe, such as:',
          '1. Chuck (grips and rotates the workpiece)',
          '2. Tool post (clamps the cutting tool)',
          '3. Tailstock (supports long work or holds centre drills) — also Bed, Headstock, Saddle/Carriage.'
        ]
      },
      {
        number: 2,
        question: 'Difference between tapping and die?',
        answer: [
          'Tapping uses a tap to cut internal screw threads inside a pre-drilled hole (e.g., a nut), whereas a die cuts external screw threads on the outside of a cylindrical bar or bolt.'
        ]
      },
      {
        number: 3,
        question: 'What is feed?',
        answer: [
          'Feed is the distance the cutting tool advances along or into the workpiece during one spindle revolution (mm/rev) or per minute (mm/min).'
        ]
      },
      {
        number: 4,
        question: 'If cutting speed 20 m/min, diameter 50mm, find RPM.',
        answer: [
          'Formula: RPM = (Cutting Speed × 1000) / (π × Diameter)',
          'RPM = (20 × 1000) / (3.142 × 50) = 20 000 / 157.1 ≈ 127.3 RPM',
          'Answer: ≈ 127 RPM.'
        ]
      },
      {
        number: 5,
        question: 'Why use cutting fluid?',
        answer: [
          'Cutting fluid cools both the workpiece and cutting tool, reduces friction and tool wear, washes away metal chips (swarf), prevents overheating, and improves the final surface finish.'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 18,
    slug: 'n3-fitting-and-machining-milling-grinding-precision',
    aliases: ['n3-milling-grinding-precision', 'tvet-n3-fitting-and-machining'],
    title: 'TVET N3 Fitting & Machining: Milling, Grinding & Precision',
    shortDescription:
      'Rotating milling cutters (slots, gears), abrasive grinding finish, tolerances, allowance, limits & clearance fits.',
    summary: [
      'Milling uses a multi-tooth rotating cutter to shape flat surfaces, slots, keyways, and gears. Grinding produces a smooth, accurate finish using an abrasive grinding wheel.',
      'Precision engineering relies on tolerances, fits, and limits. You must be able to read and interpret engineering drawings accurately.'
    ],
    formulasTitle: 'Key Formulas & Limits / Fits Diagram',
    formulas: [
      {
        expression: 'Tolerance = Upper Limit − Lower Limit',
        meaning: 'Permissible size variation allowed on a single component (mm)'
      },
      {
        expression: 'Allowance = Hole − Shaft',
        meaning: 'Intentional tightest difference between mating hole and shaft (positive = clearance)'
      },
      {
        expression: 'Milling Cutting Speed: V = (π × D × N) / 1000',
        meaning: 'Cutter surface speed (m/min) from cutter diameter D (mm) and RPM (N)'
      },
      {
        expression: 'Surface Finish (Ra in μm)',
        meaning: 'Average surface roughness achieved by precision grinding vs rough milling/turning'
      }
    ],
    diagramLines: [
      '   CLEARANCE FIT (HOLE > SHAFT):      MILLING VS GRINDING:',
      '   Upper/Lower Limits ─▶ Tolerance    Milling  ─▶ Rotating tooth cutter (slots/gears)',
      '   Hole (50.05) − Shaft (50.00)       Grinding ─▶ Abrasive wheel (smooth precision finish)',
      '   = +0.05 mm Positive Allowance'
    ],
    workedExample: {
      question: 'Hole 50.05mm, Shaft 50.00mm. Find allowance.',
      steps: [
        'Write allowance formula: Allowance = Hole − Shaft',
        'Substitute Hole = 50.05 mm and Shaft = 50.00 mm',
        'Calculate: 50.05 − 50.00 = 0.05 mm',
        'Since the hole is larger than the shaft (+0.05 mm), it is a clearance fit'
      ],
      finalAnswer: 'Allowance = 0.05 mm (clearance fit)'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What is milling used for?',
        answer: [
          'Milling uses a rotating multi-tooth cutter to machine flat surfaces, slots, keyways, grooves, shoulders, and gear teeth cleanly and accurately.'
        ]
      },
      {
        number: 2,
        question: 'What is grinding used for?',
        answer: [
          'Grinding uses a high-speed abrasive wheel to remove tiny amounts of metal (even hardened steel) to produce high dimensional accuracy and a very smooth surface finish.'
        ]
      },
      {
        number: 3,
        question: 'Difference between tolerance and allowance?',
        answer: [
          'Tolerance is the acceptable size variation on ONE part (Upper Limit − Lower Limit) to account for manufacturing inaccuracy.',
          'Allowance is the intentional dimensional difference (Hole − Shaft) between TWO mating parts to create either a clearance or interference fit.'
        ]
      },
      {
        number: 4,
        question: 'If upper 60.2mm, lower 59.8mm, find tolerance.',
        answer: [
          'Formula: Tolerance = Upper Limit − Lower Limit',
          'Tolerance = 60.2 mm − 59.8 mm = 0.4 mm',
          'Answer: 0.4 mm.'
        ]
      },
      {
        number: 5,
        question: 'What is a clearance fit?',
        answer: [
          'A clearance fit is a fit in which the hole diameter is always larger than the shaft diameter (positive allowance), ensuring free sliding or rotating movement between the mating parts.'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 19,
    slug: 'n2-motor-trade-theory-fuel-cooling-lubrication-systems',
    aliases: ['n2-fuel-cooling-lubrication', 'tvet-n2-motor-trade-theory'],
    title: 'TVET N2 Motor Trade Theory: Fuel, Cooling & Lubrication Systems',
    shortDescription:
      'Fuel supply (pump, filter, injector), cooling (radiator, water pump, thermostat), oil lubrication & fuel economy.',
    summary: [
      'Fuel system: tank, pump, filter, and carburettor / fuel injector. Cooling system: radiator, water pump, thermostat, and cooling fan.',
      'Lubrication system: oil pump, oil filter, and sump. Together they supply clean fuel, keep the engine at safe operating temperature, and reduce friction.'
    ],
    formulasTitle: 'Key Formulas & Engine Systems Diagram',
    formulas: [
      {
        expression: 'Efficiency = (Output / Input) × 100%',
        meaning: 'Percentage of input fuel energy converted into useful engine work'
      },
      {
        expression: 'Fuel Consumption = Distance / Litres',
        meaning: 'Fuel economy expressed in kilometres per litre (km/L)'
      },
      {
        expression: 'Heat Transfer: Q = m · c · ΔT',
        meaning: 'Thermal energy removed by circulating engine coolant'
      },
      {
        expression: 'Pressure = Force / Area',
        meaning: 'Oil and coolant circuit pressure (Pa or kPa)'
      }
    ],
    diagramLines: [
      '   FUEL PATH:         [Tank] ─▶ [Pump] ─▶ [Filter] ─▶ [Carb / Injector]',
      '   COOLING PATH:      [Engine Jacket] ─▶ [Thermostat] ─▶ [Radiator + Fan] ─▶ [Water Pump]',
      '   LUBRICATION PATH:  [Sump] ─▶ [Oil Pump] ─▶ [Oil Filter] ─▶ [Bearings / Camshaft]'
    ],
    workedExample: {
      question: 'Car travels 400km using 32 litres. Find consumption.',
      steps: [
        'Write fuel consumption formula: Fuel Consumption = Distance / Litres',
        'Substitute Distance = 400 km and Litres = 32 L',
        'Calculate: 400 ÷ 32 = 12.5 km/L'
      ],
      finalAnswer: '12.5 km per litre'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Name parts of fuel system.',
        answer: [
          '1. Fuel tank',
          '2. Fuel lines',
          '3. Fuel pump',
          '4. Fuel filter',
          '5. Carburettor or fuel injectors (with fuel rail & pressure regulator).'
        ]
      },
      {
        number: 2,
        question: 'What does thermostat do?',
        answer: [
          'The thermostat regulates engine operating temperature: it stays closed when the engine is cold so it warms up quickly, then opens when hot to let coolant circulate through the radiator.'
        ]
      },
      {
        number: 3,
        question: 'Why is oil important?',
        answer: [
          'Engine oil creates a protective film between moving parts to reduce friction and wear, carries heat away from internal components, cleans away soot/debris, helps seal piston rings, and prevents rust.'
        ]
      },
      {
        number: 4,
        question: 'Car travels 300km using 25L, find km/L.',
        answer: [
          'Formula: Fuel Consumption = Distance ÷ Litres',
          'Consumption = 300 km ÷ 25 L = 12 km/L',
          'Answer: 12 km/L.'
        ]
      },
      {
        number: 5,
        question: 'What happens if engine overheats?',
        answer: [
          'Overheating causes metal parts to expand excessively and lubricating oil to break down, which can blow the head gasket, warp or crack the cylinder head, and cause pistons to seize in the cylinders.'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 20,
    slug: 'n3-motor-trade-theory-transmission-brakes-steering',
    aliases: ['n3-transmission-brakes-steering', 'tvet-n3-motor-trade-theory'],
    title: 'TVET N3 Motor Trade Theory: Transmission, Brakes & Steering',
    shortDescription:
      'Drivetrain (clutch, gearbox, differential), disc/drum/ABS brakes, rack-and-pinion steering, suspension & gear ratios.',
    summary: [
      'Transmission transfers power via the clutch, gearbox, driveshaft, and differential. Brakes include disc, drum, hydraulic circuits, and ABS.',
      'Steering uses rack-and-pinion and power steering for control, while suspension (shock absorbers and springs) absorbs road shocks and keeps tyres gripping.'
    ],
    formulasTitle: 'Key Formulas & Drivetrain Diagram',
    formulas: [
      {
        expression: 'Gear Ratio = Driven / Driver',
        meaning: 'Ratio of driven gear teeth to driver gear teeth (e.g., 3:1 torque multiplication)'
      },
      {
        expression: 'Braking Force = Mass × Deceleration (F = m · a)',
        meaning: 'Stopping force required to decelerate vehicle mass (Newtons)'
      },
      {
        expression: 'Torque = Force × Distance (τ = F · d)',
        meaning: 'Twisting turning effort delivered at shaft/wheel (N·m)'
      }
    ],
    diagramLines: [
      '   DRIVETRAIN FLOW:',
      '   [Engine] ──▶ [Clutch] ──▶ [Gearbox] ──▶ [Driveshaft] ──▶ [Differential] ──▶ [Wheels]',
      '   CHASSIS CONTROL:',
      '   Brakes: Disc / Drum / Hydraulic + ABS   |   Steering: Rack & Pinion + Power Assist'
    ],
    workedExample: {
      question: 'Driver gear 20 teeth, Driven gear 60 teeth. Find gear ratio.',
      steps: [
        'Write gear ratio formula: Gear Ratio = Driven Teeth / Driver Teeth',
        'Substitute Driven = 60 teeth and Driver = 20 teeth',
        'Calculate: 60 ÷ 20 = 3',
        'Express as a ratio against 1: 3:1'
      ],
      finalAnswer: 'Gear Ratio = 3:1'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What does clutch do?',
        answer: [
          'The clutch smoothly connects and disconnects engine power from the gearbox so the driver can pull off smoothly from rest, change gears without grinding, and stop without stalling the engine.'
        ]
      },
      {
        number: 2,
        question: 'Difference between disc and drum brakes?',
        answer: [
          'Disc brakes use a caliper to clamp flat brake pads onto an exposed spinning metal disc (cools faster and resists brake fade).',
          'Drum brakes push curved brake shoes outward against the inside surface of a spinning brake drum (commonly used on rear wheels and parking brakes).'
        ]
      },
      {
        number: 3,
        question: 'What is ABS?',
        answer: [
          'ABS (Anti-lock Braking System) uses wheel-speed sensors and rapid hydraulic pulsing to prevent the wheels from locking up and skidding under emergency braking, allowing the driver to maintain steering control.'
        ]
      },
      {
        number: 4,
        question: 'Driver 15 teeth, Driven 45 teeth, find ratio.',
        answer: [
          'Formula: Gear Ratio = Driven ÷ Driver',
          'Ratio = 45 ÷ 15 = 3  →  3:1',
          'Answer: 3:1.'
        ]
      },
      {
        number: 5,
        question: 'What does differential do?',
        answer: [
          'The differential transfers drive torque at 90° to the axle shafts and allows the outer driven wheel to spin faster than the inner wheel when the vehicle goes around a corner, preventing tyre scrub.'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 21,
    slug: 'n4-electrotechnics-dc-machines-ac-theory-transformers',
    aliases: ['n4-dc-machines-ac-theory-transformers', 'tvet-n4-electrotechnics'],
    title: 'TVET N4 Electrotechnics: DC Machines, AC Theory & Transformers',
    shortDescription:
      'DC generators & motors, RLC AC impedance & phasors, power factor, transformer losses & efficiency.',
    summary: [
      'Electrotechnics is advanced electrical engineering covering DC generators, DC motors, and AC circuits containing resistance (R), inductance (L), and capacitance (C).',
      'Covers transformer theory, losses, and efficiency. You must be able to work with phasor diagrams and power factor.'
    ],
    formulasTitle: 'Key Formulas & Impedance / Phasor Diagram',
    formulas: [
      {
        expression: 'E = V + I × R  (DC machine EMF equation)',
        meaning: 'Relates generated/back EMF (E), terminal voltage (V), current (I), and armature resistance (R)'
      },
      {
        expression: 'P = V × I × PF',
        meaning: 'Active AC power (Watts) where Power Factor PF = cos φ'
      },
      {
        expression: 'Transformer Efficiency = (Output / Input) × 100%',
        meaning: 'Percentage of input power delivered as useful output power'
      },
      {
        expression: 'Z = √(R² + X²)',
        meaning: 'Total AC impedance (Ω) combining resistance R and net reactance X'
      }
    ],
    diagramLines: [
      '   AC IMPEDANCE TRIANGLE:           TRANSFORMER POWER FLOW:',
      '           /|                         Input Power (P_in)',
      '      Z  /  | X (Reactance)             ├──▶ Copper Loss (I²R) + Core Loss',
      '       / φ  |                           └──▶ Output Power (P_out)' ,
      '     └──────┘  R (Resistance)'
    ],
    workedExample: {
      question: 'Transformer output 800W, input 1000W. Find efficiency.',
      steps: [
        'Write efficiency formula: Efficiency = (Output / Input) × 100%',
        'Substitute Output = 800 W and Input = 1000 W',
        'Calculate: (800 ÷ 1000) × 100% = 0.8 × 100% = 80%'
      ],
      finalAnswer: 'Efficiency = 80%'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Difference between generator and motor?',
        answer: [
          'A DC generator converts mechanical rotational energy into electrical energy (producing an EMF).',
          'A DC motor converts electrical input energy into mechanical rotational energy (torque).'
        ]
      },
      {
        number: 2,
        question: 'What is power factor?',
        answer: [
          'Power factor (PF = cos φ) is the cosine of the phase angle between AC voltage and current, equal to Active Power (W) divided by Apparent Power (VA).'
        ]
      },
      {
        number: 3,
        question: 'If output 900W, input 1200W, find efficiency.',
        answer: [
          'Formula: Efficiency = (Output / Input) × 100%',
          'Efficiency = (900 / 1200) × 100% = 0.75 × 100% = 75%',
          'Answer: 75%.'
        ]
      },
      {
        number: 4,
        question: 'What is impedance?',
        answer: [
          'Impedance (Z, measured in Ohms Ω) is the total opposition an AC circuit offers to alternating current flow, combining resistance (R) and reactance (X): Z = √(R² + X²).'
        ]
      },
      {
        number: 5,
        question: 'Why do transformers have losses?',
        answer: [
          'Transformers experience:',
          '1. Copper (I²R) losses caused by electrical resistance in the primary and secondary windings.',
          '2. Iron / Core losses caused by magnetic hysteresis and circulating eddy currents in the iron core.'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 22,
    slug: 'n4-mechanotechnics-forces-moments-friction',
    aliases: ['n4-forces-moments-friction', 'tvet-n4-mechanotechnics'],
    title: 'TVET N4 Mechanotechnics: Forces, Moments & Friction',
    shortDescription:
      'Applied mechanics: free-body diagrams, equilibrium moments, friction (μN), tensile stress & strain.',
    summary: [
      'Mechanotechnics is applied mechanical engineering covering forces, moments, static equilibrium, friction (which opposes motion), stress, strain, and beams.',
      'You must be able to draw free-body diagrams and calculate moments accurately.'
    ],
    formulasTitle: 'Key Formulas & Moment / Friction Diagram',
    formulas: [
      {
        expression: 'Moment = Force × Distance (τ = F × d)',
        meaning: 'Turning effect about a pivot (N·m), using perpendicular distance'
      },
      {
        expression: 'F = μ × N',
        meaning: 'Friction force = coefficient of friction (μ) × normal reaction force (N)'
      },
      {
        expression: 'Stress (σ) = Force / Area',
        meaning: 'Internal force per unit cross-sectional area (Pa = N/m², or MPa = N/mm²)'
      },
      {
        expression: 'Strain (ε) = Change in Length / Original Length (ΔL / L)',
        meaning: 'Dimensionless ratio of deformation to original member length'
      }
    ],
    diagramLines: [
      '   MOMENT ABOUT PIVOT:              FRICTION ON SURFACE:',
      '   [Pivot Δ]═════ d = 2m ═════╗          ┌─────────┐',
      '                              ▼ F=100N   │  Block  │ ──▶ Motion',
      '   Moment = 100 × 2 = 200 Nm             └─────────┘ ◀── Friction F = μN'
    ],
    workedExample: {
      question: 'Force 100N at 2m from pivot. Find moment.',
      steps: [
        'Write moment formula: Moment = Force × Perpendicular Distance',
        'Substitute Force = 100 N and Distance = 2 m',
        'Calculate: Moment = 100 × 2 = 200 N·m'
      ],
      finalAnswer: 'Moment = 200 Nm'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What is a moment?',
        answer: [
          'A moment is the turning effect produced by a force acting at a perpendicular distance from a pivot or fulcrum: Moment = Force × Distance (measured in N·m).'
        ]
      },
      {
        number: 2,
        question: 'What is friction?',
        answer: [
          'Friction is a resistive contact force between two surfaces that opposes relative motion (or attempted motion), calculated as F = μ × N.'
        ]
      },
      {
        number: 3,
        question: 'Force 50N at 3m, find moment.',
        answer: [
          'Formula: Moment = Force × Distance',
          'Moment = 50 N × 3 m = 150 N·m',
          'Answer: 150 Nm.'
        ]
      },
      {
        number: 4,
        question: 'What is stress?',
        answer: [
          'Stress (σ) is the internal resisting force carried per unit cross-sectional area of a material under load: Stress = Force / Area (measured in Pa = N/m², or MPa = N/mm²).'
        ]
      },
      {
        number: 5,
        question: 'If Force 2000N, Area 100mm², find stress.',
        answer: [
          'Formula: Stress = Force / Area',
          'Stress = 2000 N ÷ 100 mm² = 20 N/mm² = 20 MPa',
          '(In Pascals: 100 mm² = 100 × 10⁻⁶ m² = 1×10⁻⁴ m², so 2000 ÷ 10⁻⁴ = 20 000 000 Pa = 20 MPa)',
          'Answer: 20 MPa (20 N/mm²).'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 23,
    slug: 'n5-maths-complex-numbers-calculus-matrices',
    aliases: ['n5-complex-numbers-calculus-matrices', 'tvet-n5-mathematics'],
    title: 'TVET N5 Mathematics: Complex Numbers, Calculus & Matrices',
    shortDescription:
      'Complex numbers (a + bi), chain/product rules, integration by parts & 2×2 matrix determinants.',
    summary: [
      'N5 Maths is advanced engineering mathematics covering complex numbers (a + bi), differentiation, integration, and matrices for solving simultaneous equations.',
      'You must know the chain rule, product rule, and integration by parts.'
    ],
    formulasTitle: 'Key Formulas & Calculus / Matrix Diagram',
    formulas: [
      {
        expression: 'i² = −1',
        meaning: 'Imaginary unit foundation for complex numbers z = a + bi'
      },
      {
        expression: 'd/dx (xⁿ) = n·xⁿ⁻¹',
        meaning: 'Power rule for differentiation (alongside chain & product rules)'
      },
      {
        expression: '∫ xⁿ dx = xⁿ⁺¹ / (n + 1) + C   (n ≠ −1)',
        meaning: 'Power rule for indefinite integration (plus integration by parts)'
      },
      {
        expression: 'det |a  b ; c  d| = a·d − b·c',
        meaning: 'Determinant of a 2×2 matrix used in Cramer’s Rule'
      }
    ],
    diagramLines: [
      '   CHAIN / PRODUCT / BY-PARTS:        2×2 DETERMINANT:',
      '   d/dx[u·v] = u′v + uv′              ┌ a   b ┐',
      '   ∫ u dv = u·v − ∫ v du              │ c   d │  ⇒  Δ = (a × d) − (b × c)'
    ],
    workedExample: {
      question: 'Differentiate y = 3x² + 2x.',
      steps: [
        'Apply the power rule d/dx(xⁿ) = n·xⁿ⁻¹ to each term',
        'For 3x²: 3 × 2x²⁻¹ = 6x',
        'For 2x: 2 × 1x⁰ = 2',
        'Combine terms: dy/dx = 6x + 2'
      ],
      finalAnswer: 'dy/dx = 6x + 2'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What is i²?',
        answer: [
          'By definition of the imaginary unit i = √(−1), squaring gives i² = −1.',
          'Answer: −1.'
        ]
      },
      {
        number: 2,
        question: 'Differentiate y = x³.',
        answer: [
          'Formula: d/dx (xⁿ) = n·xⁿ⁻¹ with n = 3',
          'dy/dx = 3·x³⁻¹ = 3x²',
          'Answer: dy/dx = 3x².'
        ]
      },
      {
        number: 3,
        question: 'Integrate ∫ 2x dx.',
        answer: [
          'Formula: ∫ xⁿ dx = xⁿ⁺¹ / (n + 1) + C',
          '∫ 2x dx = 2 · (x² / 2) + C = x² + C',
          'Answer: x² + C.'
        ]
      },
      {
        number: 4,
        question: 'Find determinant of [2 3; 1 4].',
        answer: [
          'Formula: det = (a × d) − (b × c)',
          'det = (2 × 4) − (3 × 1) = 8 − 3 = 5',
          'Answer: 5.'
        ]
      },
      {
        number: 5,
        question: 'Differentiate y = 5x² + 1.',
        answer: [
          'Differentiate term by term: d/dx(5x²) = 10x and d/dx(1) = 0',
          'dy/dx = 10x + 0 = 10x',
          'Answer: dy/dx = 10x.'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 24,
    slug: 'n6-maths-differential-equations-laplace',
    aliases: ['n6-differential-equations-laplace', 'tvet-n6-mathematics'],
    title: 'TVET N6 Mathematics: Differential Equations & Laplace',
    shortDescription:
      'First & second-order differential equations, Laplace transforms, Fourier series & engineering control signals.',
    summary: [
      'N6 Maths is the highest TVET diploma level covering differential equations, Laplace transforms, and Fourier series.',
      'Used in engineering control systems and signal processing. You must be able to solve first-order and second-order differential equations.'
    ],
    formulasTitle: 'Key Formulas & Laplace Transform Table Diagram',
    formulas: [
      {
        expression: 'dy/dx + P·y = Q',
        meaning: 'Standard first-order linear differential equation (solved with integrating factor)'
      },
      {
        expression: 'L{1} = 1 / s',
        meaning: 'Laplace transform of the unit step / constant 1 (for s > 0)'
      },
      {
        expression: 'L{e^(at)} = 1 / (s − a)',
        meaning: 'Laplace transform of an exponential function e^(at)'
      },
      {
        expression: 'L{sin(at)} = a / (s² + a²)',
        meaning: 'Laplace transform of a sinusoidal function sin(at)'
      }
    ],
    diagramLines: [
      '   LAPLACE TRANSFORM WORKFLOW:',
      '   Time Domain f(t) ──[ L{f(t)} ]──▶ s-Domain Algebra F(s)',
      '   (Differential Eq.)               (Solve easily, then L⁻¹ back to f(t))'
    ],
    workedExample: {
      question: 'Find Laplace of f(t) = 1.',
      steps: [
        'Use definition L{f(t)} = ∫₀^∞ e^(−st) · f(t) dt with f(t) = 1',
        'Or apply the standard transform identity for a unit constant',
        'Therefore L{1} = 1 / s (for s > 0)'
      ],
      finalAnswer: 'L{1} = 1/s'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What is a differential equation?',
        answer: [
          'A differential equation is a mathematical equation that relates an unknown function to one or more of its derivatives (such as dy/dx or d²y/dx²), used to describe rates of change in engineering systems.'
        ]
      },
      {
        number: 2,
        question: 'Laplace of e^2t?',
        answer: [
          'Formula: L{e^(at)} = 1 / (s − a)',
          'Here a = 2, so L{e^(2t)} = 1 / (s − 2)',
          'Answer: 1 / (s − 2).'
        ]
      },
      {
        number: 3,
        question: 'What is Laplace used for?',
        answer: [
          'The Laplace transform converts complicated differential equations in the time domain (t) into simple algebraic equations in the frequency/s-domain, making it fast to solve control systems, circuits, and mechanical vibrations.'
        ]
      },
      {
        number: 4,
        question: 'Laplace of sin 3t?',
        answer: [
          'Formula: L{sin(at)} = a / (s² + a²)',
          'Here a = 3, so a² = 9',
          'L{sin 3t} = 3 / (s² + 9)',
          'Answer: 3 / (s² + 9).'
        ]
      },
      {
        number: 5,
        question: 'Solve dy/dx = 2x.',
        answer: [
          'Integrate both sides with respect to x:',
          'y = ∫ 2x dx = 2 · (x² / 2) + C = x² + C',
          'Answer: y = x² + C.'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 25,
    slug: 'n5-engineering-science-heat-thermodynamics-fluids',
    aliases: ['n5-heat-thermodynamics-fluids', 'tvet-n5-engineering-science'],
    title: 'TVET N5 Engineering Science: Heat, Thermodynamics & Fluids',
    shortDescription:
      'Laws of thermodynamics, conduction/convection/radiation, specific heat, gas laws & Bernoulli fluid flow.',
    summary: [
      'Thermodynamics studies heat and work through the laws of thermodynamics. Heat transfer occurs by conduction, convection, and radiation.',
      'Fluids cover pressure, flow rate, and Bernoulli’s principle. You must know specific heat capacity and ideal gas laws.'
    ],
    formulasTitle: 'Key Formulas & Heat / Fluid Diagram',
    formulas: [
      {
        expression: 'Q = m × c × ΔT',
        meaning: 'Heat energy absorbed or released (J) from mass m, specific heat c, and temp change ΔT'
      },
      {
        expression: 'P · V = n · R · T',
        meaning: 'Ideal Gas Law connecting pressure, volume, moles, gas constant, and Kelvin temperature'
      },
      {
        expression: 'Efficiency = (Work Output / Heat Input) × 100%',
        meaning: 'Thermal efficiency of a heat engine or boiler system'
      },
      {
        expression: 'Pressure = Force / Area  (P = F / A)',
        meaning: 'Fluid or surface pressure measured in Pascals (N/m²)'
      }
    ],
    diagramLines: [
      '   HEAT TRANSFER MODES:              HEAT ENGINE CYCLE:',
      '   1. Conduction  ─▶ Solid contact     [Heat Input Q_in]',
      '   2. Convection  ─▶ Fluid currents          ├──▶ Work Output (W)',
      '   3. Radiation   ─▶ Infrared waves          └──▶ Waste Heat (Q_out)'
    ],
    workedExample: {
      question: 'Mass 2kg, c = 4200, ΔT = 10°C. Find heat.',
      steps: [
        'Write heat energy formula: Q = m × c × ΔT',
        'Substitute m = 2 kg, c = 4200 J/(kg·°C), and ΔT = 10°C',
        'Calculate: Q = 2 × 4200 × 10 = 84 000 J',
        'Convert to kilojoules: 84 000 ÷ 1000 = 84 kJ'
      ],
      finalAnswer: 'Q = 84 000 J = 84 kJ'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Name 3 types of heat transfer.',
        answer: [
          '1. Conduction — heat transfer through solids by direct particle vibration',
          '2. Convection — heat transfer through fluids (liquids and gases) via circulation currents',
          '3. Radiation — heat transfer via electromagnetic waves (can travel through a vacuum).'
        ]
      },
      {
        number: 2,
        question: 'What is specific heat?',
        answer: [
          'Specific heat capacity (c) is the amount of heat energy required to raise the temperature of 1 kg of a substance by 1°C (or 1 K), measured in J/(kg·°C).'
        ]
      },
      {
        number: 3,
        question: 'If m = 1kg, c = 1000, ΔT = 20, find Q.',
        answer: [
          'Formula: Q = m × c × ΔT',
          'Q = 1 × 1000 × 20 = 20 000 J = 20 kJ',
          'Answer: 20 000 J (20 kJ).'
        ]
      },
      {
        number: 4,
        question: "What is Bernoulli's principle?",
        answer: [
          'In a steady, incompressible flowing fluid, an increase in fluid velocity occurs simultaneously with a decrease in static pressure (and vice versa), expressing conservation of energy along a streamline.'
        ]
      },
      {
        number: 5,
        question: 'State 1st law of thermodynamics.',
        answer: [
          'The First Law of Thermodynamics states that energy cannot be created or destroyed, only converted from one form to another (ΔU = Q − W: net heat added equals increase in internal energy plus work done by the system).'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 26,
    slug: 'n6-engineering-science-strength-of-materials-dynamics',
    aliases: ['n6-strength-of-materials-dynamics', 'tvet-n6-engineering-science'],
    title: 'TVET N6 Engineering Science: Strength of Materials & Dynamics',
    shortDescription:
      "Stress, strain, Young's Modulus, beams, torsion, columns, momentum, kinetic energy & safety factor.",
    summary: [
      'Strength of materials covers stress, strain, Young’s Modulus (E), bending beams, torsion in shafts, and buckling in columns.',
      'Dynamics covers motion with forces, momentum, and energy. Engineers must calculate structural deflection and safety factor.'
    ],
    formulasTitle: 'Key Formulas & Stress–Strain / Dynamics Diagram',
    formulas: [
      {
        expression: 'Stress (σ) = F / A',
        meaning: 'Internal resisting force per unit area (N/m² = Pa, or N/mm² = MPa)'
      },
      {
        expression: 'Strain (ε) = ΔL / L',
        meaning: 'Change in length divided by original length (dimensionless)'
      },
      {
        expression: "Young's Modulus: E = Stress / Strain (σ / ε)",
        meaning: 'Measure of material stiffness within the elastic region (Pa or GPa)'
      },
      {
        expression: 'Momentum (p) = m × v   |   KE = ½ m v²',
        meaning: 'Linear momentum (kg·m/s) and kinetic energy (Joules) of a moving mass'
      }
    ],
    diagramLines: [
      '   STRESS-STRAIN (ELASTIC):         TENSILE BAR UNDER LOAD:',
      '   Stress σ  ▲   /                  ◄── F ══[  Area A, Length L  ]══ F ──►',
      '             │  / Slope = E         σ = F / A   |   ε = ΔL / L',
      '             └────────▶ Strain ε    Factor of Safety = Ultimate / Working'
    ],
    workedExample: {
      question: 'Force 10000N, Area 50mm². Find stress.',
      steps: [
        'Write stress formula: Stress = Force / Area',
        'Substitute Force = 10 000 N and Area = 50 mm²',
        'Calculate: 10 000 ÷ 50 = 200 N/mm²',
        'Note unit equivalence: 1 N/mm² = 1 MPa, so 200 N/mm² = 200 MPa'
      ],
      finalAnswer: 'Stress = 200 N/mm² = 200 MPa'
    },
    practiceQuestions: [
      {
        number: 1,
        question: "What is Young's Modulus?",
        answer: [
          "Young's Modulus (E) is a measure of a solid material's stiffness within its elastic limit, defined as the ratio of tensile/compressive stress to strain: E = Stress / Strain (measured in Pa or GPa)."
        ]
      },
      {
        number: 2,
        question: 'What is momentum?',
        answer: [
          'Linear momentum (p) is the quantity of motion possessed by a moving object, equal to mass multiplied by velocity: p = m × v (measured in kg·m/s).'
        ]
      },
      {
        number: 3,
        question: 'Mass 5kg, velocity 4m/s, find KE.',
        answer: [
          'Formula: KE = ½ × m × v²',
          'KE = 0.5 × 5 × (4)² = 0.5 × 5 × 16 = 40 J',
          'Answer: 40 J.'
        ]
      },
      {
        number: 4,
        question: 'If F = 5000N, A = 25mm², find stress.',
        answer: [
          'Formula: Stress = F ÷ A',
          'Stress = 5000 N ÷ 25 mm² = 200 N/mm² = 200 MPa',
          'Answer: 200 MPa (200 N/mm²).'
        ]
      },
      {
        number: 5,
        question: 'What is safety factor?',
        answer: [
          'Factor of Safety (FoS) is the ratio of a structure or material’s failure/ultimate strength to its maximum allowable working stress (FoS = Ultimate Stress ÷ Working Stress), ensuring components do not fail under unexpected loads.'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 27,
    slug: 'n5-electrotechnics-power-systems-motors-protection',
    aliases: ['n5-power-systems-motors-protection', 'tvet-n5-electrotechnics'],
    title: 'TVET N5 Electrotechnics: Power Systems, Motors & Protection',
    shortDescription:
      'Power generation/distribution, 3-phase power triangle (P, Q, S), motor starters, circuit breakers & PF correction.',
    summary: [
      'Power systems cover generation, transmission, and distribution. Covers 3-phase motors, motor starters, and speed control.',
      'Circuit protection uses circuit breakers, fuses, and protective relays, alongside power factor correction.'
    ],
    formulasTitle: 'Key Formulas & Power Triangle Diagram',
    formulas: [
      {
        expression: 'P = √3 × V_L × I_L × PF',
        meaning: '3-phase True / Active Power measured in Watts (W) or kilowatts (kW)'
      },
      {
        expression: 'Q = √3 × V_L × I_L × sin φ',
        meaning: '3-phase Reactive Power measured in VAR or kVAR'
      },
      {
        expression: 'S = √3 × V_L × I_L',
        meaning: '3-phase Apparent Power measured in VA or kVA'
      },
      {
        expression: 'PF = P / S = cos φ',
        meaning: 'Power factor ratio of true power to apparent power'
      }
    ],
    diagramLines: [
      '   AC POWER TRIANGLE:               POWER SYSTEM FLOW:',
      '           /|                       [Generation] ─▶ [Transmission] ─▶ [Distribution]',
      '     S   /  | Q (kVAR)                                      │',
      '       / φ  |                                      [Motor + PF Capacitors]' ,
      '     └──────┘  P (kW)'
    ],
    workedExample: {
      question: 'S = 100kVA, P = 80kW. Find PF.',
      steps: [
        'Write power factor formula: PF = P / S',
        'Substitute P = 80 kW and S = 100 kVA',
        'Calculate: PF = 80 ÷ 100 = 0.8'
      ],
      finalAnswer: 'PF = 0.8'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What is apparent power?',
        answer: [
          'Apparent power (S, measured in VA or kVA) is the total electrical power supplied to an AC circuit combining active power (P) and reactive power (Q): S = √3 × V_L × I_L.'
        ]
      },
      {
        number: 2,
        question: 'Why correct power factor?',
        answer: [
          'Correcting power factor reduces line current for the same real power output, cutting I²R heating losses in cables, freeing up transformer/generator capacity, improving voltage regulation, and lowering electricity kVA demand charges.'
        ]
      },
      {
        number: 3,
        question: 'If P = 60kW, S = 75kVA, find PF.',
        answer: [
          'Formula: PF = P ÷ S',
          'PF = 60 ÷ 75 = 0.8',
          'Answer: 0.8.'
        ]
      },
      {
        number: 4,
        question: 'Name 2 motor starters.',
        answer: [
          'Any 2 standard 3-phase motor starters:',
          '1. Direct-On-Line (DOL) starter',
          '2. Star-Delta starter (also Auto-transformer starter, Soft starter, or Variable Speed Drive).'
        ]
      },
      {
        number: 5,
        question: 'What does a circuit breaker do?',
        answer: [
          'A circuit breaker automatically detects excessive current (overloads and short circuits) and trips open its contacts to safely disconnect the circuit, protecting equipment and cables, and can be reset after clearing the fault.'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 28,
    slug: 'n6-electrotechnics-control-systems-electronics',
    aliases: ['n6-control-systems-electronics', 'tvet-n6-electrotechnics'],
    title: 'TVET N6 Electrotechnics: Control Systems & Electronics',
    shortDescription:
      'Open-loop vs closed-loop feedback, PLCs, sensors, thyristors, inverters, transfer functions & stability.',
    summary: [
      'Control systems compare open-loop vs closed-loop operation with feedback, using PLCs, sensors, and transducers.',
      'Power electronics covers thyristors and inverters. Engineers must analyse transfer functions and system stability.'
    ],
    formulasTitle: 'Key Formulas & Closed-Loop Feedback Diagram',
    formulas: [
      {
        expression: 'Gain = Output / Input',
        meaning: 'Ratio of output response to input signal (amplification or loop gain)'
      },
      {
        expression: 'Error (e) = Setpoint − Actual',
        meaning: 'Difference driving a closed-loop controller to correct output'
      },
      {
        expression: 'Transfer Function: G(s) = Output(s) / Input(s)',
        meaning: 'Laplace s-domain ratio relating system output to input (zero initial conditions)'
      }
    ],
    diagramLines: [
      '   CLOSED-LOOP FEEDBACK CONTROL:',
      '   Setpoint ──▶(+)──[Error]──▶[Controller / PLC]──▶[Plant / Motor]──▶ Output',
      '                ▲ (−)                                                     │',
      '                └──────────────────────[ Sensor / Feedback ]──────────────┘'
    ],
    workedExample: {
      question: 'Input 10V, Output 50V. Find gain.',
      steps: [
        'Write gain formula: Gain = Output / Input',
        'Substitute Output = 50 V and Input = 10 V',
        'Calculate: Gain = 50 ÷ 10 = 5'
      ],
      finalAnswer: 'Gain = 5'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Difference open vs closed loop?',
        answer: [
          'An open-loop control system has no feedback path and cannot correct disturbances automatically.',
          'A closed-loop control system uses a sensor to measure the actual output, feeds it back to compare with the setpoint, and continuously reduces the error.'
        ]
      },
      {
        number: 2,
        question: 'What is feedback?',
        answer: [
          'Feedback is the process of feeding a measurement of the system’s actual output back to the controller input so it can be compared with the setpoint to calculate error and adjust performance.'
        ]
      },
      {
        number: 3,
        question: 'Input 5V, Output 25V, find gain.',
        answer: [
          'Formula: Gain = Output ÷ Input',
          'Gain = 25 V ÷ 5 V = 5',
          'Answer: 5.'
        ]
      },
      {
        number: 4,
        question: 'What is a PLC?',
        answer: [
          'A PLC (Programmable Logic Controller) is a rugged industrial digital controller programmed (often in ladder logic) to read input sensors and control actuators, motors, conveyors, and machinery automatically.'
        ]
      },
      {
        number: 5,
        question: 'What is a sensor?',
        answer: [
          'A sensor is an input device/transducer that detects a physical variable (such as temperature, pressure, level, light, or speed) and converts it into a usable electrical signal for measurement or control.'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 29,
    slug: 'n5-mechanotechnics-power-transmission-balancing',
    aliases: ['n5-power-transmission-balancing', 'tvet-n5-mechanotechnics'],
    title: 'TVET N5 Mechanotechnics: Power Transmission & Balancing',
    shortDescription:
      'Belt, chain & gear drives, clutches, rotating mass balancing, vibrations, velocity ratio & centrifugal force.',
    summary: [
      'Power transmission covers belts, chains, gears, and clutches, alongside balancing of rotating masses and mechanical vibrations.',
      'You must calculate belt length, pulley/gear velocity ratios, and centrifugal force.'
    ],
    formulasTitle: 'Key Formulas & Pulley & Centrifugal Diagram',
    formulas: [
      {
        expression: 'Velocity Ratio (VR) = N1 / N2 = D2 / D1',
        meaning: 'Ratio of driver speed (N1) to driven speed (N2), equal to driven diameter D2 ÷ driver D1'
      },
      {
        expression: 'Torque (T) = Force × Radius',
        meaning: 'Rotational turning moment on a pulley or gear (N·m)'
      },
      {
        expression: 'F_c = m × ω² × r',
        meaning: 'Centrifugal force (N) from unbalanced rotating mass m at radius r and angular speed ω'
      },
      {
        expression: 'Power (P) = Torque × ω',
        meaning: 'Mechanical shaft power transmitted in Watts (ω = 2πN / 60 rad/s)'
      }
    ],
    diagramLines: [
      '   BELT / PULLEY DRIVE:              ROTATING MASS UNBALANCE:',
      '   ╭───╮ D1=200mm   ╭─────╮ D2=400mm       Mass m',
      '   │ O │════════════│  O  │                  │  F_c = m · ω² · r',
      '   ╰───╯  Belt      ╰─────╯  VR = D2/D1     (O)──r──▶ Centrifugal force'
    ],
    workedExample: {
      question: 'Driver 200mm, Driven 400mm. Find velocity ratio.',
      steps: [
        'Write velocity ratio formula: VR = Driven Diameter (D2) / Driver Diameter (D1)',
        'Substitute D2 = 400 mm and D1 = 200 mm',
        'Calculate: 400 ÷ 200 = 2',
        'Express as a ratio: VR = 2:1'
      ],
      finalAnswer: 'VR = 2:1'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What is a belt drive used for?',
        answer: [
          'A belt drive transmits rotational power and torque smoothly between two shafts separated by a distance, and allows speed ratios to be stepped up or down using different pulley diameters.'
        ]
      },
      {
        number: 2,
        question: 'What is balancing?',
        answer: [
          'Balancing is adjusting the mass distribution of a rotating rotor or shaft (by adding or removing balance weights) so centrifugal forces cancel out and vibration is eliminated.'
        ]
      },
      {
        number: 3,
        question: 'Driver 100mm, Driven 300mm, find VR.',
        answer: [
          'Formula: VR = D2 ÷ D1',
          'VR = 300 mm ÷ 100 mm = 3  →  3:1',
          'Answer: 3:1.'
        ]
      },
      {
        number: 4,
        question: 'What is vibration?',
        answer: [
          'Vibration is the repetitive back-and-forth (oscillatory) mechanical motion of a machine component about its equilibrium position, commonly caused by unbalance, shaft misalignment, loose bearings, or resonance.'
        ]
      },
      {
        number: 5,
        question: 'Name 2 types of gears.',
        answer: [
          'Any 2 engineering gear types, such as:',
          '1. Spur gears (straight teeth for parallel shafts)',
          '2. Helical gears (angled teeth for quiet, high-load drives) — also Bevel gears, Worm & worm-wheel gears, Rack & pinion.'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🛠️',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 30,
    slug: 'n6-mechanotechnics-fluid-mechanics-machine-design',
    aliases: ['n6-fluid-mechanics-machine-design', 'tvet-n6-mechanotechnics'],
    title: 'TVET N6 Mechanotechnics: Fluid Mechanics & Machine Design',
    shortDescription:
      'Hydraulics vs pneumatics, pumps, shafts, bearings, keys, couplings, fatigue failure & safe design.',
    summary: [
      'Fluid mechanics covers hydraulics, pneumatics, and pumps. Machine design covers shafts, bearings, keys, and couplings.',
      'Addresses stress concentration, fatigue failure, and designing mechanical components for operational safety.'
    ],
    formulasTitle: 'Key Formulas & Hydraulic Cylinder Diagram',
    formulas: [
      {
        expression: 'Force = Pressure × Area  (F = P × A)',
        meaning: 'Hydraulic actuator force (N) from fluid pressure P (Pa) and piston area A (m²)'
      },
      {
        expression: 'Flow Rate = Area × Velocity  (Q = A × v)',
        meaning: 'Volumetric fluid flow rate in pipes or cylinders (m³/s)'
      },
      {
        expression: 'Torque = Force × Distance  (T = F × d)',
        meaning: 'Twisting torque applied to shafts, keys, and couplings (N·m)'
      },
      {
        expression: 'Power = Force × Velocity  (P = F × v)',
        meaning: 'Linear mechanical power delivered in Watts (W)'
      }
    ],
    diagramLines: [
      '   HYDRAULIC PISTON FORCE:           MACHINE SHAFT ASSEMBLY:',
      '   ┌───────────┬───────────┐         [Motor]═[Coupling]═[Bearing]═[Shaft + Key]',
      '   │ P = 500kPa│  A=0.02m² │══▶ F      Fluid Force: F = P(Pa) × A(m²)',
      '   └───────────┴───────────┘'
    ],
    workedExample: {
      question: 'Pressure 500kPa, Area 0.02m². Find force.',
      steps: [
        'Convert pressure from kPa to Pascals: 500 kPa = 500 × 1000 = 500 000 Pa',
        'Write force formula: Force = Pressure × Area',
        'Calculate: Force = 500 000 × 0.02 = 10 000 N (or 10 kN)'
      ],
      finalAnswer: 'Force = 10 000 N (10 kN)'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Difference hydraulics vs pneumatics?',
        answer: [
          'Hydraulics uses pressurized incompressible liquid (oil) to generate very high forces and precise heavy-duty positioning.',
          'Pneumatics uses pressurized compressible gas (compressed air) for fast, clean, lighter-force automation.'
        ]
      },
      {
        number: 2,
        question: 'What is a bearing for?',
        answer: [
          'A bearing supports a rotating shaft, maintains accurate alignment, carries radial and/or axial loads, and reduces friction and wear between rotating and stationary parts.'
        ]
      },
      {
        number: 3,
        question: 'Pressure 200kPa, Area 0.05m², find force.',
        answer: [
          'Convert pressure: 200 kPa = 200 000 Pa',
          'Formula: Force = Pressure × Area',
          'Force = 200 000 × 0.05 = 10 000 N (10 kN)',
          'Answer: 10 000 N (10 kN).'
        ]
      },
      {
        number: 4,
        question: 'What is fatigue failure?',
        answer: [
          'Fatigue failure is the gradual growth of cracks leading to sudden fracture of a component under repeated cyclic or fluctuating loads over many cycles, even when stresses stay below the material’s static yield strength.'
        ]
      },
      {
        number: 5,
        question: 'Name 2 types of couplings.',
        answer: [
          'Any 2 shaft couplings, such as:',
          '1. Rigid flange coupling (for perfectly aligned shafts)',
          '2. Flexible pin-and-bush coupling (absorbs slight misalignment/shock) — also Muff/sleeve coupling, Gear coupling, Universal (Hooke’s) joint.'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🔌',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 31,
    slug: 'n4-industrial-electronics-op-amps-rectifiers-transducers',
    aliases: ['n4-op-amps-rectifiers-transducers', 'tvet-n4-industrial-electronics'],
    title: 'TVET N4 Industrial Electronics: Op-Amps, Rectifiers & Transducers',
    shortDescription:
      'Operational amplifiers (inverting/non-inverting), controlled rectifiers, zener regulators & industrial transducers.',
    summary: [
      'N4 Industrial Electronics bridges discrete semiconductors into analog integrated circuits, operational amplifiers (op-amps), and regulated power supplies.',
      'Covers transducers (thermistors, strain gauges, LVDTs) that convert physical quantities into electrical signals for industrial measurement.'
    ],
    formulasTitle: 'Key Formulas & Op-Amp Circuit Diagram',
    formulas: [
      {
        expression: 'A_v (Inverting) = − R_f / R_in',
        meaning: 'Closed-loop voltage gain of an inverting op-amp (negative sign = 180° phase shift)'
      },
      {
        expression: 'A_v (Non-Inverting) = 1 + (R_f / R_1)',
        meaning: 'Closed-loop voltage gain of a non-inverting op-amp (in phase with input)'
      },
      {
        expression: 'V_dc (Full-Wave) = 2 V_m / π ≈ 0.637 V_m',
        meaning: 'Average DC output voltage of an unfiltered full-wave bridge rectifier'
      },
      {
        expression: 'P_Z = V_Z × I_Z',
        meaning: 'Power dissipated in a Zener diode voltage regulator'
      }
    ],
    diagramLines: [
      '   INVERTING OP-AMP:                  TRANSDUCER CHAIN:',
      '           ┌─── R_f ───┐              Physical Qty (Temp/Force)',
      '   V_in ─[R_in]─┤−      │                   │',
      '                │  Op-Amp├────▶ V_out        ▼',
      '   GND ─────────┤+      │              [Transducer] ─▶ [Op-Amp] ─▶ Display'
    ],
    workedExample: {
      question: 'An inverting op-amp has R_in = 10 kΩ, R_f = 100 kΩ, and V_in = 0.5 V. Find V_out.',
      steps: [
        'Write inverting gain formula: A_v = − R_f / R_in',
        'Calculate gain: A_v = − 100 kΩ / 10 kΩ = −10',
        'Calculate output: V_out = A_v × V_in = −10 × 0.5 V = −5 V'
      ],
      finalAnswer: 'V_out = −5 V (inverted, magnitude 5 V)'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What is an ideal operational amplifier (op-amp)?',
        answer: [
          'An op-amp is a high-gain differential DC amplifier with very high input impedance, very low output impedance, and infinite open-loop gain in the ideal model.'
        ]
      },
      {
        number: 2,
        question: 'Find gain of a non-inverting op-amp with R_f = 40 kΩ and R_1 = 10 kΩ.',
        answer: [
          'Formula: A_v = 1 + (R_f / R_1)',
          'A_v = 1 + (40 / 10) = 1 + 4 = 5',
          'Answer: 5.'
        ]
      },
      {
        number: 3,
        question: 'What does a transducer do?',
        answer: [
          'A transducer converts energy from one physical form (such as temperature, pressure, light, or displacement) into a proportional electrical voltage or current signal.'
        ]
      },
      {
        number: 4,
        question: 'What is the purpose of a Zener diode in a power supply?',
        answer: [
          'Operated in reverse breakdown, a Zener diode maintains a constant reference output voltage despite small changes in load current or input voltage.'
        ]
      },
      {
        number: 5,
        question: 'If V_peak = 20 V on a full-wave rectifier, find average V_dc.',
        answer: [
          'Formula: V_dc = 0.637 × V_m',
          'V_dc = 0.637 × 20 V = 12.74 V',
          'Answer: 12.74 V.'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '📏',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 32,
    slug: 'n4-mechanical-draughting-fits-tolerances-assembly-drawings',
    aliases: ['n4-mechanical-draughting', 'tvet-n4-mechanical-draughting'],
    title: 'TVET N4 Mechanical Draughting: Fits, Tolerances & Assembly Drawings',
    shortDescription:
      'SANS 10111 orthographic projection, ISO limits & fits (H7/g6), sectioning, surface finish & detailed assembly drawings.',
    summary: [
      'Mechanical Draughting translates engineering designs into exact manufacturing blueprints according to SANS 10111 standards.',
      'Covers first-angle & third-angle orthographic projection, full/half sections, ISO hole-basis fits, tolerances, and complete assembly drawings with parts lists.'
    ],
    formulasTitle: 'Key Drawing Rules & Fits / Projection Diagram',
    formulas: [
      {
        expression: 'Tolerance = Max Limit − Min Limit',
        meaning: 'Allowable size band between upper and lower limits on a drawing dimension'
      },
      {
        expression: 'Max Clearance = Max Hole − Min Shaft',
        meaning: 'Loosest possible fit between mating hole and shaft'
      },
      {
        expression: 'Min Clearance = Min Hole − Max Shaft',
        meaning: 'Tightest clearance fit (if negative, indicates interference/transition)'
      },
      {
        expression: 'Scale = Drawing Size : Actual Size',
        meaning: 'e.g., 1:2 (half size), 1:1 (full size), 2:1 (enlarged detail)'
      }
    ],
    diagramLines: [
      '   FIRST-ANGLE ORTHOGRAPHIC:           SECTIONING & TOLERANCE:',
      '   ┌──────────┐   ┌──────────┐         Shaft: Ø40.00 +0.00 / −0.02',
      '   │ Front    │   │ Left     │         Hole:  Ø40.05 +0.02 / −0.00',
      '   └──────────┘   └──────────┘         Hatching lines drawn at 45°!'
    ],
    workedExample: {
      question: 'A hole is dimensioned 40.05 ± 0.02 mm and a shaft 39.98 ± 0.01 mm. Find maximum and minimum clearance.',
      steps: [
        'Hole limits: Max = 40.07 mm, Min = 40.03 mm',
        'Shaft limits: Max = 39.99 mm, Min = 39.97 mm',
        'Max Clearance = Max Hole − Min Shaft = 40.07 − 39.97 = 0.10 mm',
        'Min Clearance = Min Hole − Max Shaft = 40.03 − 39.99 = 0.04 mm'
      ],
      finalAnswer: 'Max clearance = 0.10 mm, Min clearance = 0.04 mm'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Which orthographic projection standard is used in South African SANS 10111?',
        answer: [
          'First-angle orthographic projection (where the top view is placed below the front view, and the left side view is placed to the right of the front view).'
        ]
      },
      {
        number: 2,
        question: 'Why are section views used on mechanical drawings?',
        answer: [
          'Section views cut away part of a component virtually to reveal hidden internal features (bores, keyways, threads, webs) clearly without cluttering the drawing with hidden-detail dashed lines.'
        ]
      },
      {
        number: 3,
        question: 'A shaft is 25.00 mm (+0.00 / −0.03 mm). Find its tolerance.',
        answer: [
          'Upper Limit = 25.00 mm, Lower Limit = 24.97 mm',
          'Tolerance = 25.00 − 24.97 = 0.03 mm',
          'Answer: 0.03 mm.'
        ]
      },
      {
        number: 4,
        question: 'What is a parts list (bill of materials) on an assembly drawing?',
        answer: [
          'A structured table listing every component item number, part name, quantity required, material specification, and standard fastener details needed to assemble the machine.'
        ]
      },
      {
        number: 5,
        question: 'At what angle are standard section hatching lines drawn?',
        answer: [
          'Standard hatching lines are drawn as thin continuous lines at 45° to the horizontal or principal axis (with opposite 45° angles for adjacent mating parts).'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🔌',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 33,
    slug: 'n5-industrial-electronics-oscillators-multivibrators-op-amps',
    aliases: ['n5-oscillators-multivibrators', 'tvet-n5-industrial-electronics'],
    title: 'TVET N5 Industrial Electronics: Oscillators, Multivibrators & Op-Amps',
    shortDescription:
      'Active op-amp filters, RC/Wien-bridge & LC oscillators, 555 astable/monostable multivibrators & modulation.',
    summary: [
      'N5 Industrial Electronics covers signal generation and conditioning: sine-wave oscillators (Wien-bridge, Colpitts, Hartley) and square-wave multivibrators.',
      'Explores Barkhausen oscillation criteria, active op-amp high/low-pass filters, and 555 timer duty-cycle calculations.'
    ],
    formulasTitle: 'Key Formulas & Oscillator Feedback Diagram',
    formulas: [
      {
        expression: 'f_0 (Wien Bridge) = 1 / (2 π R C)',
        meaning: 'Resonant oscillation frequency in Hz when R1 = R2 = R and C1 = C2 = C'
      },
      {
        expression: 'A · β ≥ 1   and   ∠Aβ = 0° (or 360°)',
        meaning: 'Barkhausen criterion required for sustained self-oscillation'
      },
      {
        expression: 'f_c (RC Active Filter) = 1 / (2 π R C)',
        meaning: '−3 dB cutoff frequency separating passband and stopband'
      },
      {
        expression: 'T (555 Astable) = 0.693 (R_A + 2 R_B) C',
        meaning: 'Total clock period of an astable multivibrator square wave'
      }
    ],
    diagramLines: [
      '   OSCILLATOR (BARKHAUSEN):         ASTABLE MULTIVIBRATOR OUTPUT:',
      '   ┌───▶[ Amplifier (Gain A) ]───┬──▶ V_out     ┌──┐  ┌──┐  ┌──┐',
      '   │                             │              │  │  │  │  │  │',
      '   └────[ Feedback Network β ]◀──┘            ──┘  └──┘  └──┘  └──▶ t'
    ],
    workedExample: {
      question: 'A Wien-bridge oscillator uses R = 10 kΩ and C = 10 nF. Calculate the oscillation frequency.',
      steps: [
        'Write frequency formula: f_0 = 1 / (2 π R C)',
        'Convert units: R = 10 000 Ω, C = 10 × 10⁻⁹ F = 10⁻⁸ F',
        'Calculate 2 π R C = 2 × 3.1416 × 10 000 × 10⁻⁸ = 6.2832 × 10⁻⁴',
        'Divide: f_0 = 1 / (6.2832 × 10⁻⁴) ≈ 1591.5 Hz ≈ 1.59 kHz'
      ],
      finalAnswer: 'f_0 ≈ 1591.5 Hz (1.59 kHz)'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'State the two Barkhausen conditions for oscillation.',
        answer: [
          '1. Loop gain magnitude must be at least unity: |A · β| ≥ 1',
          '2. Total phase shift around the closed feedback loop must be 0° or 360° (positive feedback).'
        ]
      },
      {
        number: 2,
        question: 'What is the difference between astable and monostable multivibrators?',
        answer: [
          'An astable multivibrator has NO stable states and continuously switches HIGH and LOW (free-running clock/square-wave generator).',
          'A monostable (one-shot) multivibrator has ONE stable state and outputs a single timed pulse when triggered.'
        ]
      },
      {
        number: 3,
        question: 'Calculate cutoff frequency of an RC filter with R = 1 kΩ and C = 100 nF.',
        answer: [
          'f_c = 1 / (2 π R C) = 1 / (2 × 3.1416 × 1000 × 100 × 10⁻⁹)',
          'f_c = 1 / (6.2832 × 10⁻⁴) ≈ 1591.5 Hz (1.59 kHz)',
          'Answer: ≈ 1.59 kHz.'
        ]
      },
      {
        number: 4,
        question: 'What feedback gain must the amplifier have in a standard Wien-bridge oscillator?',
        answer: [
          'Since the Wien-bridge network attenuates the signal by β = 1/3 at f_0, the non-inverting amplifier must provide a minimum gain A_v = 3 (1 + R_f/R_1 = 3).'
        ]
      },
      {
        number: 5,
        question: 'What is a low-pass filter used for?',
        answer: [
          'A low-pass filter allows low-frequency signals below the cutoff frequency f_c to pass while attenuating unwanted high-frequency noise.'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🔥',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 34,
    slug: 'n5-power-machines-steam-boilers-gas-laws-nozzles',
    aliases: ['n5-power-machines', 'tvet-n5-power-machines'],
    title: 'TVET N5 Power Machines: Steam Boilers, Gas Laws & Nozzles',
    shortDescription:
      'Thermodynamic gas laws, steam tables & dryness fraction, boilers, equivalent evaporation & convergent-divergent nozzles.',
    summary: [
      'Power Machines N5 focuses on heat energy conversions in industrial steam boilers, thermodynamic gas processes (isothermal, adiabatic, polytropic), and nozzles.',
      'Students use steam tables to calculate enthalpy, dryness fraction, boiler thermal efficiency, and steam nozzle exit velocity.'
    ],
    formulasTitle: 'Key Formulas & Steam Boiler Energy Diagram',
    formulas: [
      {
        expression: 'P₁ V₁ / T₁ = P₂ V₂ / T₂',
        meaning: 'Combined ideal gas law (pressures absolute, temperatures in Kelvin)'
      },
      {
        expression: 'h = h_f + x · h_fg',
        meaning: 'Specific enthalpy of wet steam (x = dryness fraction, kJ/kg)'
      },
      {
        expression: 'η_boiler = [m_s (h − h_w)] / (m_f × CV) × 100%',
        meaning: 'Boiler thermal efficiency comparing steam heat gain to fuel calorific value'
      },
      {
        expression: 'v₂ = √(2000 Δh)   (m/s)',
        meaning: 'Steam velocity from enthalpy drop Δh (in kJ/kg) across a nozzle'
      }
    ],
    diagramLines: [
      '   STEAM BOILER SYSTEM:                 WET STEAM ENTHALPY:',
      '   Feed Water (h_w) ──▶ [ BOILER ] ──▶ Wet/Superheated Steam (h)',
      '                         ▲  Fuel (m_f × CV)',
      '   h = h_f + x · h_fg  (0 < x < 1)'
    ],
    workedExample: {
      question: 'Wet steam at 10 bar has h_f = 763 kJ/kg, h_fg = 2015 kJ/kg, and dryness fraction x = 0.9. Find specific enthalpy h.',
      steps: [
        'Write wet steam enthalpy formula: h = h_f + x · h_fg',
        'Substitute h_f = 763, x = 0.9, h_fg = 2015',
        'Multiply: 0.9 × 2015 = 1813.5 kJ/kg',
        'Add h_f: h = 763 + 1813.5 = 2576.5 kJ/kg'
      ],
      finalAnswer: 'h = 2576.5 kJ/kg'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What does dryness fraction (x) mean in steam engineering?',
        answer: [
          'Dryness fraction (x) is the ratio of the mass of dry saturated steam to the total mass of wet steam (dry steam + suspended water droplets), ranging from 0 to 1.'
        ]
      },
      {
        number: 2,
        question: 'Find enthalpy of wet steam with h_f = 500 kJ/kg, h_fg = 2100 kJ/kg, and x = 0.8.',
        answer: [
          'Formula: h = h_f + x · h_fg',
          'h = 500 + (0.8 × 2100) = 500 + 1680 = 2180 kJ/kg',
          'Answer: 2180 kJ/kg.'
        ]
      },
      {
        number: 3,
        question: 'What is the difference between an isothermal and an adiabatic process?',
        answer: [
          'An isothermal process occurs at constant temperature (PV = C), whereas an adiabatic process has zero heat transfer into or out of the system (PV^γ = C).'
        ]
      },
      {
        number: 4,
        question: 'Gas at 200 kPa, 0.5 m³ is compressed isothermally to 0.25 m³. Find new pressure.',
        answer: [
          'Isothermal (Boyle’s Law): P₁ V₁ = P₂ V₂',
          'P₂ = (200 × 0.5) / 0.25 = 400 kPa',
          'Answer: 400 kPa.'
        ]
      },
      {
        number: 5,
        question: 'Calculate nozzle exit velocity if enthalpy drop Δh = 180 kJ/kg.',
        answer: [
          'Formula: v₂ = √(2000 × Δh)',
          'v₂ = √(2000 × 180) = √360 000 = 600 m/s',
          'Answer: 600 m/s.'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🔌',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 35,
    slug: 'n6-industrial-electronics-microprocessors-control-signal-processing',
    aliases: ['n6-microprocessors-control', 'tvet-n6-industrial-electronics'],
    title: 'TVET N6 Industrial Electronics: Microprocessors, Control & Signal Conditioning',
    shortDescription:
      'ADC/DAC conversion, PID closed-loop control, microprocessor bus architecture, PLCs & instrumentation buses.',
    summary: [
      'N6 Industrial Electronics covers digital instrumentation and computer-based control: Analog-to-Digital (ADC) and Digital-to-Analog (DAC) converters.',
      'Examines microprocessor buses (address, data, control), PID (Proportional-Integral-Derivative) controllers, and noise immunity in industrial plants.'
    ],
    formulasTitle: 'Key Formulas & ADC / PID Control Diagram',
    formulas: [
      {
        expression: 'ADC Resolution = V_ref / (2ⁿ − 1)',
        meaning: 'Smallest voltage step measurable by an n-bit Analog-to-Digital converter'
      },
      {
        expression: 'Quantisation Levels = 2ⁿ',
        meaning: 'Total distinct binary codes for an n-bit ADC/DAC'
      },
      {
        expression: 'u(t) = K_p e(t) + K_i ∫e(t)dt + K_d de/dt',
        meaning: 'PID control output combining Proportional, Integral, and Derivative actions'
      },
      {
        expression: 'f_sample ≥ 2 × f_max',
        meaning: 'Nyquist sampling theorem required to reconstruct an analog signal without aliasing'
      }
    ],
    diagramLines: [
      '   DIGITAL PROCESS CONTROL LOOP:',
      '   Sensor ─▶ [Op-Amp] ─▶ [ADC] ─▶ [Microprocessor / PID] ─▶ [DAC] ─▶ Actuator',
      '   (Analog)             (Binary)    Address / Data / Control Bus'
    ],
    workedExample: {
      question: 'An 8-bit ADC has a reference voltage V_ref = 5.1 V. Find its number of levels and step resolution.',
      steps: [
        'Total binary levels = 2⁸ = 256 levels (0 to 255)',
        'Step size (resolution) = V_ref / (2ⁿ − 1) = 5.1 / 255',
        'Calculate: 5.1 ÷ 255 = 0.02 V = 20 mV per step'
      ],
      finalAnswer: '256 levels, Resolution = 20 mV'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Name the 3 main microprocessor buses.',
        answer: [
          '1. Address Bus (carries memory/I/O addresses from CPU)',
          '2. Data Bus (transfers binary instructions and data bidirectionally)',
          '3. Control Bus (carries read/write, clock, and interrupt control signals).'
        ]
      },
      {
        number: 2,
        question: 'How many quantisation levels does a 10-bit ADC provide?',
        answer: [
          'Formula: Levels = 2ⁿ = 2¹⁰ = 1024',
          'Answer: 1024 levels.'
        ]
      },
      {
        number: 3,
        question: 'What does each letter in PID control stand for?',
        answer: [
          'P = Proportional (reacts to current error)',
          'I = Integral (eliminates steady-state offset over time)',
          'D = Derivative (dampens overshoot by reacting to rate of error change).'
        ]
      },
      {
        number: 4,
        question: 'State the Nyquist sampling rule for an analog signal up to 4 kHz.',
        answer: [
          'Minimum sampling frequency f_sample ≥ 2 × f_max = 2 × 4 kHz = 8 kHz.'
        ]
      },
      {
        number: 5,
        question: 'What is the role of a DAC in industrial control?',
        answer: [
          'A Digital-to-Analog Converter (DAC) translates binary numbers from a microcontroller or PLC back into a smooth analog voltage or 4–20 mA current signal to drive actuators and variable valves.'
        ]
      }
    ]
  },
  {
    subject: 'tvet',
    subjectLabel: 'TVET N1-N6 (NATED)',
    subjectIcon: '🔥',
    backPath: '/study-guide/tvet-n1-n6',
    chapterNumber: 36,
    slug: 'n6-power-machines-turbines-compressors-thermodynamic-cycles',
    aliases: ['n6-power-machines', 'tvet-n6-power-machines'],
    title: 'TVET N6 Power Machines: Turbines, Compressors & Thermodynamic Cycles',
    shortDescription:
      'Rankine, Otto & Diesel cycles, steam/gas turbines, velocity diagrams, multi-stage air compressors & refrigeration.',
    summary: [
      'Power Machines N6 covers heavy power plant equipment: impulse/reaction steam turbines, multi-stage reciprocating air compressors, and refrigeration plants.',
      'Analyses air-standard Otto & Diesel cycles, Rankine steam power cycles, blade efficiency, and intercooling power savings.'
    ],
    formulasTitle: 'Key Formulas & Power Cycle Diagram',
    formulas: [
      {
        expression: 'η_Otto = 1 − 1 / r^(γ − 1)',
        meaning: 'Air-standard thermal efficiency of a petrol engine (r = compression ratio)'
      },
      {
        expression: 'η_Carnot = (T_high − T_low) / T_high',
        meaning: 'Maximum theoretical thermal efficiency between two Kelvin temperatures'
      },
      {
        expression: 'COP_ref = Q_L / W_in',
        meaning: 'Coefficient of Performance for an industrial refrigeration system'
      },
      {
        expression: 'P_turbine = ṁ · Δv_w · u',
        meaning: 'Turbine rotor power (W) from steam mass flow ṁ, change in whirl velocity Δv_w, and blade speed u'
      }
    ],
    diagramLines: [
      '   RANKINE STEAM POWER PLANT:          CARNOT / ENGINE THERMAL LIMIT:',
      '   [Boiler] ──▶ [Steam Turbine] ──▶ Power Out   η_max = 1 − (T_low / T_high)',
      '      ▲               │                        (Temperatures MUST be in Kelvin!)',
      '   [Feed Pump] ◀── [Condenser]'
    ],
    workedExample: {
      question: 'A heat engine operates between T_high = 900 K and T_low = 300 K. Find the maximum (Carnot) thermal efficiency.',
      steps: [
        'Write Carnot efficiency formula: η_Carnot = (T_high − T_low) / T_high',
        'Substitute Kelvin temperatures: (900 − 300) / 900 = 600 / 900',
        'Convert to percentage: 0.6667 × 100% ≈ 66.7%'
      ],
      finalAnswer: 'η_Carnot = 66.7%'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Name the 4 main components of a basic Rankine steam cycle.',
        answer: [
          '1. Steam Boiler (adds heat at constant pressure)',
          '2. Steam Turbine (expands steam to produce shaft work)',
          '3. Condenser (rejects waste heat, turning exhaust steam back to water)',
          '4. Feed Pump (pumps condensate back up to boiler pressure).'
        ]
      },
      {
        number: 2,
        question: 'Why is an intercooler used between stages in a multi-stage air compressor?',
        answer: [
          'Intercooling cools the compressed air between stages back toward ambient temperature, reducing its specific volume so the next stage requires less compression work and operates safely at lower temperatures.'
        ]
      },
      {
        number: 3,
        question: 'A Carnot engine works between 600 K and 300 K. Find efficiency.',
        answer: [
          'Formula: η = (T_high − T_low) / T_high',
          'η = (600 − 300) / 600 = 300 / 600 = 0.5 = 50%',
          'Answer: 50%.'
        ]
      },
      {
        number: 4,
        question: 'A refrigeration plant removes 12 kW of heat using 3 kW compressor work. Find COP.',
        answer: [
          'Formula: COP_ref = Q_L ÷ W_in',
          'COP = 12 kW ÷ 3 kW = 4',
          'Answer: 4.'
        ]
      },
      {
        number: 5,
        question: 'Difference between an impulse turbine and a reaction turbine?',
        answer: [
          'In an impulse turbine, all pressure drop happens in fixed nozzles and steam hits curved moving blades at constant pressure.',
          'In a reaction turbine, steam drops in pressure across BOTH the fixed stator blades and the moving rotor blades.'
        ]
      }
    ]
  }
];

export const DEGREE_CHAPTERS: StudyGuideChapterData[] = [
  {
    subject: 'degree',
    subjectLabel: 'Degree - Modules Students Fail Most',
    subjectIcon: '📊',
    backPath: '/study-guide/degree-modules',
    chapterNumber: 1,
    slug: 'bcom-accounting-financial-accounting-killer-module',
    aliases: ['financial-accounting-killer-module', 'bcom-financial-accounting'],
    title: 'BCom / Accounting: Financial Accounting - The Killer Module',
    shortDescription:
      'Double-entry Debit vs Credit, Accounting Equation, Journals, Ledgers, Trial Balance, Income Statement & Balance Sheet.',
    summary: [
      'Financial Accounting is the system of recording, classifying, and summarizing money moving through a business.',
      'Debit = what comes in (increases Assets & Expenses). Credit = what goes out (increases Liabilities, Equity & Income).',
      'Core records you must master: Accounting Equation, Journals, Ledgers, Trial Balance, Income Statement, and Balance Sheet. Most students fail because they do not practise double-entry every day.'
    ],
    formulasTitle: 'Key Formulas & Double-Entry Accounting Box',
    formulas: [
      {
        expression: 'Assets = Liabilities + Equity',
        meaning: 'The fundamental Accounting Equation — must always balance'
      },
      {
        expression: 'Profit = Income − Expenses',
        meaning: 'Net Profit calculated on the Income Statement over a financial period'
      },
      {
        expression: 'Trial Balance: Total Debits = Total Credits',
        meaning: 'Every debit entry must have an equal and opposite credit entry'
      },
      {
        expression: 'Gross Profit = Sales − Cost of Sales',
        meaning: 'Trading profit earned before subtracting operating expenses'
      }
    ],
    diagramLines: [
      '   DOUBLE-ENTRY ACCOUNTING EQUATION:   ASSETS  =  LIABILITIES  +  EQUITY',
      '   ┌───────────────────────────┐       ┌─────────────────────────────────┐',
      '   │ DEBIT (DR)  | CREDIT (CR) │       │ DEBIT (DR)    |   CREDIT (CR)   │',
      '   │ Assets   +  | Assets   −  │       │ Liab/Eqty  −  |   Liab/Eqty  +  │',
      '   │ Expenses +  | Expenses −  │       │ Income     −  |   Income     +  │',
      '   └───────────────────────────┘       └─────────────────────────────────┘'
    ],
    workedExample: {
      question: 'A business has Assets of R100 000 and Liabilities of R40 000. Find Equity.',
      steps: [
        'Write the Accounting Equation: Assets = Liabilities + Equity',
        'Rearrange to solve for Equity: Equity = Assets − Liabilities',
        'Substitute values: Equity = R100 000 − R40 000 = R60 000'
      ],
      finalAnswer: 'Equity = R60 000'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What is the Accounting Equation?',
        answer: [
          'Assets = Liabilities + Equity.',
          'Everything the business owns (Assets) equals what is owed to outsiders (Liabilities) plus the owner’s stake (Equity).'
        ]
      },
      {
        number: 2,
        question: 'What is a debit?',
        answer: [
          'A Debit (DR) is what comes into an account (recorded on the left side of a T-account/ledger).',
          'Debits INCREASE Assets and Expenses, and DECREASE Liabilities, Equity, and Income.'
        ]
      },
      {
        number: 3,
        question: 'Assets R80 000, Equity R50 000, find Liabilities.',
        answer: [
          'Formula: Assets = Liabilities + Equity  →  Liabilities = Assets − Equity',
          'Substitute: Liabilities = R80 000 − R50 000 = R30 000',
          'Answer: Liabilities = R30 000.'
        ]
      },
      {
        number: 4,
        question: 'Difference between Income Statement and Balance Sheet?',
        answer: [
          'Income Statement (Statement of Profit or Loss): Measures financial performance OVER a period of time (Income − Expenses = Profit).',
          'Balance Sheet (Statement of Financial Position): Shows what the business owns and owes AT a specific date (Assets = Liabilities + Equity).'
        ]
      },
      {
        number: 5,
        question: 'If Sales R50 000, Cost of Sales R20 000, find Gross Profit.',
        answer: [
          'Formula: Gross Profit = Sales − Cost of Sales',
          'Substitute: Gross Profit = R50 000 − R20 000 = R30 000',
          'Answer: Gross Profit = R30 000.'
        ]
      }
    ]
  },
  {
    subject: 'degree',
    subjectLabel: 'Degree - Modules Students Fail Most',
    subjectIcon: '📉',
    backPath: '/study-guide/degree-modules',
    chapterNumber: 2,
    slug: 'bcom-economics-supply-demand-elasticity',
    aliases: ['economics-supply-demand-elasticity', 'bcom-economics'],
    title: 'BCom - Economics: Supply, Demand & Elasticity',
    shortDescription:
      'Scarce resources, Laws of Demand and Supply, market equilibrium (Qd = Qs), price elasticity & Total Revenue.',
    summary: [
      'Economics is the study of how people and societies choose to use scarce resources.',
      'Demand falls when price rises (inverse relationship). Supply rises when price rises (direct relationship).',
      'Equilibrium is the price and quantity where Demand and Supply meet (Qd = Qs). Elasticity measures how sensitive quantity demanded is to a change in price.'
    ],
    formulasTitle: 'Key Formulas & Supply-Demand Equilibrium Diagram',
    formulas: [
      {
        expression: 'Equilibrium: Qd = Qs',
        meaning: 'Quantity demanded equals quantity supplied — no surplus or shortage'
      },
      {
        expression: 'Elasticity = % Change in Quantity ÷ % Change in Price',
        meaning: 'Price Elasticity of Demand (|Ed| > 1 Elastic, |Ed| < 1 Inelastic, |Ed| = 1 Unitary)'
      },
      {
        expression: 'Total Revenue = Price × Quantity',
        meaning: 'Total income earned by sellers (TR = P × Q)'
      },
      {
        expression: '% Change = (New − Old) ÷ Old × 100%',
        meaning: 'Percentage change formula used for %ΔQ and %ΔP'
      }
    ],
    diagramLines: [
      '   Price (P)',
      '     │    \\ Demand (D)      / Supply (S)',
      '     │     \\               /',
      '   P*├──────\\─────────────/───  Equilibrium (Qd = Qs)',
      '     │       \\           /',
      '     └────────┼──────────┴──────▶ Quantity (Q)',
      '              Q*'
    ],
    workedExample: {
      question:
        'Price is R10 and Quantity is 100. Price rises to R12 and Quantity falls to 80. Find elasticity.',
      steps: [
        'Find % Change in Quantity (%Q): (80 − 100) / 100 × 100 = −20%',
        'Find % Change in Price (%P): (12 − 10) / 10 × 100 = +20%',
        'Divide (using magnitude for Price Elasticity of Demand): Elasticity = |−20% / +20%| = 1'
      ],
      finalAnswer: 'Elasticity = 1 (Unitary Elastic)'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What is demand?',
        answer: [
          'Demand is the quantity of a good or service that consumers are both willing and able to buy at various prices during a given time period.'
        ]
      },
      {
        number: 2,
        question: 'What happens to demand when price rises?',
        answer: [
          'When price rises (with all other factors constant), quantity demanded falls — showing an inverse relationship between price and quantity demanded.'
        ]
      },
      {
        number: 3,
        question: 'What is equilibrium?',
        answer: [
          'Market equilibrium is the point where Demand meets Supply (Qd = Qs), resulting in a stable market-clearing price with no surplus and no shortage.'
        ]
      },
      {
        number: 4,
        question: 'What is elasticity?',
        answer: [
          'Price Elasticity measures how sensitive (responsive) the quantity demanded is to a change in price: Elasticity = % Change in Quantity ÷ % Change in Price.'
        ]
      },
      {
        number: 5,
        question: 'Price R20, Quantity 50, find Total Revenue.',
        answer: [
          'Formula: Total Revenue = Price × Quantity',
          'Substitute: Total Revenue = R20 × 50 = R1 000',
          'Answer: R1 000.'
        ]
      }
    ]
  },
  {
    subject: 'degree',
    subjectLabel: 'Degree - Modules Students Fail Most',
    subjectIcon: '🧠',
    backPath: '/study-guide/degree-modules',
    chapterNumber: 3,
    slug: 'bed-education-psychology-of-education',
    aliases: ['psychology-of-education', 'bed-psychology'],
    title: 'BEd / Education: Psychology of Education',
    shortDescription:
      'How children learn: Piaget’s 4 cognitive stages, Vygotsky’s Zone of Proximal Development (ZPD), Maslow’s Hierarchy & conditioning.',
    summary: [
      'Psychology of Education studies how children and adolescents learn, develop cognitively, and stay motivated in the classroom.',
      'Piaget explained that children learn in structured developmental stages. Vygotsky showed that children learn best with guided support (scaffolding) inside the Zone of Proximal Development.',
      'Maslow highlighted that basic needs must be met before higher learning can occur, while Behaviourism rewards positive behaviour to strengthen learning habits.'
    ],
    formulasTitle: 'Key Concepts & Learning Theory Diagram',
    formulas: [
      {
        expression: 'Piaget Stages',
        meaning: '4 stages: Sensorimotor (0–2), Preoperational (2–7), Concrete (7–11), Formal Operational (12+)'
      },
      {
        expression: 'Vygotsky ZPD',
        meaning: 'Zone of Proximal Development — tasks done with teacher/peer help (scaffolding)'
      },
      {
        expression: 'Maslow Hierarchy',
        meaning: 'Physiological → Safety → Love & Belonging → Esteem → Self-Actualisation'
      },
      {
        expression: 'Classical vs Operant Conditioning',
        meaning: 'Pavlov (stimulus association) vs Skinner (rewards & consequences shape behaviour)'
      }
    ],
    diagramLines: [
      '   VYGOTSKY ZPD MODEL:',
      '   [ Can Do Alone ] ──▶ [ ZPD: Can Do WITH Teacher Help ] ──▶ [ Too Hard For Now ]',
      '                              ▲ Scaffolding / Guidance'
    ],
    workedExample: {
      question:
        'A learner cannot do a task alone, but succeeds with help from the teacher. What is this?',
      steps: [
        'Compare what the learner can do independently against what they achieve with teacher guidance (scaffolding).',
        'That gap between unassisted performance and assisted potential is Vygotsky’s Zone of Proximal Development.'
      ],
      finalAnswer: 'Zone of Proximal Development (ZPD) — Vygotsky'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Who created ZPD?',
        answer: [
          'Lev Vygotsky created the Zone of Proximal Development (ZPD) theory.'
        ]
      },
      {
        number: 2,
        question: "What is Maslow's hierarchy?",
        answer: [
          'Maslow’s Hierarchy of Needs is a 5-tier model (Physiological, Safety, Love/Belonging, Esteem, Self-Actualisation) showing that learners must have their basic physical and emotional needs met before they can learn effectively.'
        ]
      },
      {
        number: 3,
        question: "Name Piaget's 4 stages.",
        answer: [
          '1. Sensorimotor Stage (0–2 years)',
          '2. Preoperational Stage (2–7 years)',
          '3. Concrete Operational Stage (7–11 years)',
          '4. Formal Operational Stage (12 years and older).'
        ]
      },
      {
        number: 4,
        question: 'Difference between classical and operant conditioning?',
        answer: [
          'Classical conditioning (Pavlov) pairs a neutral stimulus with an automatic response (involuntary association).',
          'Operant conditioning (Skinner) changes voluntary behaviour through positive/negative reinforcement (rewards) or punishment.'
        ]
      },
      {
        number: 5,
        question: 'Why is motivation important in class?',
        answer: [
          'Motivation increases focus, classroom participation, persistence when concepts get difficult, and long-term academic achievement.'
        ]
      }
    ]
  },
  {
    subject: 'degree',
    subjectLabel: 'Degree - Modules Students Fail Most',
    subjectIcon: '📋',
    backPath: '/study-guide/degree-modules',
    chapterNumber: 4,
    slug: 'bed-curriculum-studies-caps-lesson-planning',
    aliases: ['caps-and-lesson-planning', 'bed-curriculum-studies'],
    title: 'BEd - Curriculum Studies: CAPS & Lesson Planning',
    shortDescription:
      'CAPS policy in South Africa, 5 essential parts of a Lesson Plan, Learning Outcomes, and Formal vs Informal Assessment.',
    summary: [
      'Curriculum refers to what we teach, why we teach it, and how learning is assessed. In South Africa, the official policy is CAPS (Curriculum and Assessment Policy Statement).',
      'Every effective Lesson Plan must contain 5 key parts: Objectives, Content, Activities, Assessment, and Resources, and every lesson must align with CAPS aims.'
    ],
    formulasTitle: 'Key Concepts & CAPS Lesson Planning Box',
    formulas: [
      {
        expression: 'CAPS',
        meaning: 'Curriculum and Assessment Policy Statement (South Africa’s national school curriculum)'
      },
      {
        expression: 'Learning Outcomes',
        meaning: 'Clear statements of what learners must know and be able to do after the lesson'
      },
      {
        expression: 'Assessment: Formal vs Informal',
        meaning: 'Formal = recorded/graded tasks (tests, exams); Informal = daily classwork & feedback'
      },
      {
        expression: 'Lesson Plan Structure (5 Parts)',
        meaning: '1. Objectives  •  2. Content  •  3. Activities  •  4. Assessment  •  5. Resources'
      }
    ],
    diagramLines: [
      '   LESSON ALIGNMENT FLOW:',
      '   [ CAPS Aims ] ──▶ [ Objectives ] ──▶ [ Content + Resources ] ──▶ [ Activities ] ──▶ [ Assessment ]'
    ],
    workedExample: {
      question: 'Write a lesson objective for Grade 4 Maths - Fractions.',
      steps: [
        'Use a clear action verb suited to Grade 4 learners (identify, write).',
        'State the specific CAPS Grade 4 Maths topic and denominators clearly.'
      ],
      finalAnswer:
        'By end of lesson, learners will be able to identify and write fractions with denominators 2, 4, 8.'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What does CAPS stand for?',
        answer: [
          'CAPS stands for Curriculum and Assessment Policy Statement.'
        ]
      },
      {
        number: 2,
        question: 'Name 5 parts of a lesson plan.',
        answer: [
          '1. Objectives',
          '2. Content',
          '3. Activities',
          '4. Assessment',
          '5. Resources.'
        ]
      },
      {
        number: 3,
        question: 'Difference formal vs informal assessment?',
        answer: [
          'Formal assessment consists of planned, graded tasks (tests, assignments, exams) recorded for term/year promotion marks.',
          'Informal assessment is everyday classroom monitoring (oral questions, homework, observation) used to guide teaching without counting for report marks.'
        ]
      },
      {
        number: 4,
        question: 'Why do we need objectives?',
        answer: [
          'Objectives clarify the exact learning goal for both teacher and learners, guide the choice of activities and resources, and show what to assess at the end of the lesson.'
        ]
      },
      {
        number: 5,
        question: 'What is a learning outcome?',
        answer: [
          'A learning outcome is a specific, measurable statement of the knowledge, skill, or understanding a learner must demonstrate by the end of a lesson or course.'
        ]
      }
    ]
  },
  {
    subject: 'degree',
    subjectLabel: 'Degree - Modules Students Fail Most',
    subjectIcon: '⚖️',
    backPath: '/study-guide/degree-modules',
    chapterNumber: 5,
    slug: 'llb-law-introduction-constitutional-law',
    aliases: ['llb-constitutional-law', 'introduction-to-law-constitutional-law'],
    title: 'LLB Law: Introduction to Law & Constitutional Law',
    shortDescription:
      'Constitutional Supremacy in South Africa, Bill of Rights (Equality, Dignity, Freedom), Rule of Law, Separation of Powers & Constitutional Court.',
    summary: [
      'Law is the system of binding rules that govern society and keep order and justice.',
      'The Constitution is the supreme law of South Africa — every Act of Parliament, by-law, and government action must follow it or be declared invalid.',
      'The Bill of Rights (Chapter 2 of the Constitution) protects fundamental human rights such as equality, human dignity, and freedom. The Constitutional Court is the highest court in South Africa for constitutional matters.'
    ],
    formulasTitle: 'Key Concepts & Separation of Powers Diagram',
    formulas: [
      {
        expression: 'Constitution Supremacy (Section 2)',
        meaning: 'The Constitution is the supreme law of SA; any law inconsistent with it is invalid'
      },
      {
        expression: 'Bill of Rights (Chapter 2)',
        meaning: 'Protects core rights: Equality, Human Dignity, Life, Freedom & Security'
      },
      {
        expression: 'Rule of Law',
        meaning: 'Everyone — including government and leaders — is subject to the law equally'
      },
      {
        expression: 'Separation of Powers',
        meaning: 'Legislature (makes laws), Executive (enforces laws), Judiciary (interprets laws)'
      }
    ],
    diagramLines: [
      '   SUPREME LAW:  [ THE CONSTITUTION OF SOUTH AFRICA ]',
      '                              │',
      '        ┌─────────────────────┼─────────────────────┐',
      '        ▼                     ▼                     ▼',
      '  [ LEGISLATURE ]       [ EXECUTIVE ]         [ JUDICIARY ]',
      '  Makes Laws            Applies Laws          Interprets Laws',
      '  (Parliament)          (President/Cabinet)   (Courts / ConCourt)'
    ],
    workedExample: {
      question: 'A law says women cannot vote. Is it valid under South African law?',
      steps: [
        'Check the Constitution — Section 2 states the Constitution is the supreme law of the Republic.',
        'Check the Bill of Rights — Section 9 guarantees Equality and prohibits unfair discrimination on gender, while Section 19 guarantees adult citizens the right to vote.',
        'Any law inconsistent with the Constitution is invalid and must be struck down.'
      ],
      finalAnswer: 'No. It violates Equality (and voting rights) in the Bill of Rights, and the Constitution is supreme.'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What is the supreme law of SA?',
        answer: [
          'The Constitution of the Republic of South Africa (1996) is the supreme law of South Africa.'
        ]
      },
      {
        number: 2,
        question: 'Name 3 branches of government.',
        answer: [
          '1. Legislature (Parliament — makes laws)',
          '2. Executive (President & Cabinet — implements/enforces laws)',
          '3. Judiciary (Courts — interprets laws and resolves disputes).'
        ]
      },
      {
        number: 3,
        question: 'What is the Bill of Rights?',
        answer: [
          'Chapter 2 of the South African Constitution, which is the cornerstone of democracy and protects fundamental human rights including equality, human dignity, and freedom.'
        ]
      },
      {
        number: 4,
        question: 'What does separation of powers mean?',
        answer: [
          'It divides state authority between three independent branches (Legislature, Executive, Judiciary) with checks and balances so no single branch holds absolute power.'
        ]
      },
      {
        number: 5,
        question: 'Which court is highest for constitutional matters?',
        answer: [
          'The Constitutional Court of South Africa is the highest court for constitutional matters (and apex court in SA).'
        ]
      }
    ]
  },
  {
    subject: 'degree',
    subjectLabel: 'Degree - Modules Students Fail Most',
    subjectIcon: '📜',
    backPath: '/study-guide/degree-modules',
    chapterNumber: 6,
    slug: 'llb-criminal-law-and-contract-law',
    aliases: ['criminal-law-and-contract-law', 'llb-criminal-contract-law'],
    title: 'LLB: Criminal Law & Contract Law',
    shortDescription:
      'Crime elements (Actus Reus, Mens Rea & Unlawfulness), Murder vs Culpable Homicide, Offer & Acceptance, and Breach of Contract.',
    summary: [
      'Criminal Law deals with State vs Accused. To secure a conviction, the State must prove beyond reasonable doubt: Conduct/Act (Actus Reus) + Fault/Intent (Mens Rea) + Unlawfulness.',
      'Contract Law governs legally binding agreements between parties. A valid contract requires 5 essentials: Offer, Acceptance, Contractual Capacity, Legality, and Certainty.'
    ],
    formulasTitle: 'Key Concepts & Crime / Contract Framework',
    formulas: [
      {
        expression: 'Actus Reus + Mens Rea + Unlawfulness',
        meaning: 'Core elements of a crime: voluntary unlawful conduct + guilty state of mind'
      },
      {
        expression: 'Murder vs Culpable Homicide',
        meaning: 'Unlawful intentional killing (Murder) vs unlawful negligent killing (Culpable Homicide)'
      },
      {
        expression: 'Offer + Acceptance = Consensus',
        meaning: 'Mutual agreement (meeting of minds) forming the base of a contract'
      },
      {
        expression: 'Breach of Contract',
        meaning: 'Failure by a party to perform their contractual duties on time or properly'
      }
    ],
    diagramLines: [
      '   CRIMINAL LAW (State vs Accused):   [ Unlawful Act ] + [ Intent / Fault ] → Guilt Beyond Reasonable Doubt',
      '   CONTRACT LAW (Valid Agreement):    [ Offer ] + [ Acceptance ] + [ Capacity ] + [ Legality ] + [ Certainty ]'
    ],
    workedExample: {
      question: 'A offers to sell a car for R50 000, and B accepts. Is there a contract?',
      steps: [
        'Check Offer & Acceptance: A made a clear offer (R50 000 for car) and B accepted unequivocally.',
        'Check Capacity, Legality & Certainty: Assuming both are adults of sound mind, selling a car is legal, and price + item are certain.',
        'All 5 requirements for a valid contract are met.'
      ],
      finalAnswer: 'Yes — Offer + Acceptance + Capacity + Legality + Certainty = Valid Contract.'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What are 2 elements of a crime?',
        answer: [
          '1. Actus Reus (unlawful voluntary conduct/act)',
          '2. Mens Rea (guilty mind / fault — intention or negligence).',
          '(Along with unlawfulness and criminal capacity.)'
        ]
      },
      {
        number: 2,
        question: 'Name 5 requirements for valid contract.',
        answer: [
          '1. Offer',
          '2. Acceptance (consensus)',
          '3. Contractual Capacity',
          '4. Legality (lawfulness)',
          '5. Certainty (and possibility of performance).'
        ]
      },
      {
        number: 3,
        question: 'Difference murder vs culpable homicide?',
        answer: [
          'Murder is the unlawful and INTENTIONAL killing of another human being.',
          'Culpable Homicide is the unlawful and NEGLIGENT (unintentional) killing of another human being.'
        ]
      },
      {
        number: 4,
        question: 'What is breach of contract?',
        answer: [
          'A breach of contract occurs when one party fails to honour or perform a valid contractual obligation without a lawful excuse (for example late delivery, defective performance, or refusal to pay).'
        ]
      },
      {
        number: 5,
        question: 'Who must prove guilt in criminal case?',
        answer: [
          'The State (prosecutor) carries the burden to prove the accused guilty beyond a reasonable doubt.'
        ]
      }
    ]
  },
  {
    subject: 'degree',
    subjectLabel: 'Degree - Modules Students Fail Most',
    subjectIcon: '🫀',
    backPath: '/study-guide/degree-modules',
    chapterNumber: 7,
    slug: 'nursing-anatomy-and-physiology',
    aliases: ['anatomy-and-physiology', 'nursing-anatomy'],
    title: 'Nursing: Anatomy & Physiology',
    shortDescription:
      'Body systems (Cardiovascular, Respiratory, Digestive, Nervous), normal vital signs, and Cardiac Output (CO = HR × SV).',
    summary: [
      'Anatomy is the study of the physical structure and parts of the human body. Physiology is how those body parts work and function together.',
      'Key systems: Cardiovascular (heart pumps blood), Respiratory (lungs exchange O₂ and CO₂), Digestive (breaks down food), Nervous (brain & nerves control responses), and Renal (kidneys filter blood).',
      'Every nurse must memorise normal adult vital signs and calculate Cardiac Output accurately.'
    ],
    formulasTitle: 'Key Formulas & Normal Adult Vital Signs',
    formulas: [
      {
        expression: 'Normal BP: 120/80 mmHg',
        meaning: 'Normal adult blood pressure (Systolic 120 / Diastolic 80 mmHg)'
      },
      {
        expression: 'HR: 60–100 bpm  |  Resp: 12–20 /min',
        meaning: 'Normal resting Heart Rate (beats/min) and Respiratory Rate (breaths/min)'
      },
      {
        expression: 'Normal Temperature: 37°C (36.5–37.5°C)',
        meaning: 'Normal human core body temperature'
      },
      {
        expression: 'Cardiac Output (CO) = Heart Rate × Stroke Volume',
        meaning: 'Total volume of blood pumped by the heart per minute (CO = HR × SV)'
      }
    ],
    diagramLines: [
      '   HEART & LUNGS FLOW:   Body ──▶ Right Heart ──▶ Lungs (O₂ In / CO₂ Out) ──▶ Left Heart ──▶ Body',
      '   CARDIAC OUTPUT:       CO (ml/min) = Heart Rate (bpm) × Stroke Volume (ml)'
    ],
    workedExample: {
      question: 'A patient has Heart Rate = 75 bpm and Stroke Volume = 70 ml. Find Cardiac Output.',
      steps: [
        'Write the Cardiac Output formula: CO = Heart Rate × Stroke Volume',
        'Substitute: CO = 75 × 70 = 5 250 ml/min',
        'Convert to litres per minute (÷ 1 000): 5 250 ÷ 1 000 = 5.25 L/min'
      ],
      finalAnswer: 'CO = 5 250 ml/min = 5.25 L/min'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What is anatomy?',
        answer: [
          'Anatomy is the branch of science that studies the physical structure and parts of the human body (such as bones, muscles, heart, and organs).'
        ]
      },
      {
        number: 2,
        question: 'What is physiology?',
        answer: [
          'Physiology is the study of how the body structures and organ systems actually work and carry out life functions.'
        ]
      },
      {
        number: 3,
        question: 'Normal BP?',
        answer: [
          'Normal adult Blood Pressure (BP) is 120/80 mmHg (120 mmHg systolic over 80 mmHg diastolic).'
        ]
      },
      {
        number: 4,
        question: 'What does the heart do?',
        answer: [
          'The heart acts as a muscular pump that circulates blood throughout the body — sending deoxygenated blood to the lungs for oxygen and pumping oxygenated blood and nutrients to all tissues.'
        ]
      },
      {
        number: 5,
        question: 'If HR 80, SV 60ml, find CO.',
        answer: [
          'Formula: CO = Heart Rate × Stroke Volume',
          'Substitute: CO = 80 bpm × 60 ml = 4 800 ml/min',
          'Convert to L/min: 4 800 ÷ 1 000 = 4.8 L/min',
          'Answer: 4 800 ml/min (4.8 L/min).'
        ]
      }
    ]
  },
  {
    subject: 'degree',
    subjectLabel: 'Degree - Modules Students Fail Most',
    subjectIcon: '💊',
    backPath: '/study-guide/degree-modules',
    chapterNumber: 8,
    slug: 'nursing-pharmacology-and-community-health',
    aliases: ['pharmacology-and-community-health', 'nursing-pharmacology'],
    title: 'Nursing: Pharmacology & Community Health',
    shortDescription:
      '5 Rights of Medication Administration, Side Effects vs Adverse Effects, Immunisation & Primary Health Care in clinics.',
    summary: [
      'Pharmacology is the study of drugs, how they interact with the body, and safe administration.',
      'To prevent medication errors, nurses always verify the 5 Rights: Right Patient, Right Drug, Right Dose, Right Route, and Right Time.',
      'Community Health focuses on health for the whole population — disease prevention, local clinics, immunisation schedules, and HIV/TB care under Primary Health Care.'
    ],
    formulasTitle: 'Key Concepts & 5 Rights Medication Safety Box',
    formulas: [
      {
        expression: '5 Rights of Medication',
        meaning: '1. Right Patient  •  2. Right Drug  •  3. Right Dose  •  4. Right Route  •  5. Right Time'
      },
      {
        expression: 'Side Effects vs Adverse Effects',
        meaning: 'Expected mild unwanted effects (Side) vs harmful/dangerous drug reactions (Adverse)'
      },
      {
        expression: 'Immunisation Schedule',
        meaning: 'Planned childhood & community vaccines building immunity against infectious diseases'
      },
      {
        expression: 'Primary Health Care (PHC)',
        meaning: 'Accessible first-level clinic care focused on prevention, education, HIV/TB & maternal health'
      }
    ],
    diagramLines: [
      '   MEDICATION SAFETY CHECKLIST:  [ Patient ] ─▶ [ Drug ] ─▶ [ Dose ] ─▶ [ Route ] ─▶ [ Time ]',
      '   COMMUNITY HEALTH PYRAMID:     Prevention + Immunisation + Clinics (PHC) = Healthier Community'
    ],
    workedExample: {
      question: 'A nurse gives a patient 500 mg of a medicine instead of the prescribed 250 mg. Which Right was broken?',
      steps: [
        'Compare what was prescribed (250 mg) with what was administered (500 mg).',
        'Both describe the amount/strength of medicine given, which violates medication dosage verification.'
      ],
      finalAnswer: 'Right Dose'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Name the 5 Rights.',
        answer: [
          '1. Right Patient',
          '2. Right Drug (Medication)',
          '3. Right Dose',
          '4. Right Route',
          '5. Right Time.'
        ]
      },
      {
        number: 2,
        question: 'Difference side effect vs adverse effect?',
        answer: [
          'Side Effect: A predictable, usually mild secondary effect at normal doses (e.g., drowsiness from antihistamines).',
          'Adverse Effect: An unintended, harmful, or severe reaction to a drug that may endanger the patient and requires stopping or changing treatment.'
        ]
      },
      {
        number: 3,
        question: 'What is Primary Health Care?',
        answer: [
          'Primary Health Care (PHC) is essential, affordable first-contact healthcare provided at local clinics — covering immunisations, chronic care (HIV/TB), maternal health, and health education.'
        ]
      },
      {
        number: 4,
        question: 'Why is immunisation important?',
        answer: [
          'Immunisation protects individuals against serious infectious diseases (like measles, polio, and TB), prevents outbreaks, and builds herd immunity across the community.'
        ]
      },
      {
        number: 5,
        question: 'What is community health?',
        answer: [
          'Community health focuses on protecting, promoting, and improving the physical and social health of an entire population group through prevention, clinics, sanitation, and disease control.'
        ]
      }
    ]
  },
  {
    subject: 'degree',
    subjectLabel: 'Degree - Modules Students Fail Most',
    subjectIcon: '🔬',
    backPath: '/study-guide/degree-modules',
    chapterNumber: 9,
    slug: 'social-work-psychology-research-methods',
    aliases: ['research-methods', 'psychology-research-methods'],
    title: 'Social Work / Psychology: Research Methods',
    shortDescription:
      'Qualitative vs Quantitative research, Hypothesis, Sample vs Population, Independent vs Dependent Variable, and Research Ethics.',
    summary: [
      'Research Methods is the systematic process of finding reliable truth and evidence in social and behavioural sciences.',
      'Qualitative research uses words, interviews, and themes to explore meanings. Quantitative research uses numbers, statistics, and surveys to measure patterns.',
      'You must master Hypotheses, Samples vs Populations, Independent & Dependent Variables, and Research Ethics. Most students lose marks by confusing qualitative with quantitative research.'
    ],
    formulasTitle: 'Key Concepts & Qualitative vs Quantitative Box',
    formulas: [
      {
        expression: 'Qualitative vs Quantitative',
        meaning: 'Qualitative = words, themes & feelings; Quantitative = numbers, stats & measurements'
      },
      {
        expression: 'Independent vs Dependent Variable',
        meaning: 'Independent (IV) = cause/what is changed; Dependent (DV) = effect/what is measured'
      },
      {
        expression: 'Sample vs Population',
        meaning: 'Population = entire target group; Sample = smaller subset selected for the study'
      },
      {
        expression: 'Ethics: Consent & Confidentiality',
        meaning: 'Informed consent (voluntary agreement), privacy protection, no harm to participants'
      }
    ],
    diagramLines: [
      '   QUALITATIVE (Words / Themes / Interviews)   vs   QUANTITATIVE (Numbers / Stats / Surveys)',
      '   EXPERIMENT FLOW:  [ Independent Variable (Cause) ] ──▶ [ Dependent Variable (Measured Effect) ]'
    ],
    workedExample: {
      question: 'A study asks: "How do students feel about exams?" Is this Qualitative or Quantitative?',
      steps: [
        'Look at the data collected: it asks about feelings, experiences, and opinions expressed in words.',
        'Words, feelings, and thematic experiences (not numerical counts or scores) define Qualitative research.'
      ],
      finalAnswer: 'Qualitative — it gathers feelings and words, not numbers.'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Difference qualitative vs quantitative?',
        answer: [
          'Qualitative research collects non-numerical data (words, interviews, open-ended themes) to understand experiences and feelings.',
          'Quantitative research collects numerical data (surveys, scores, statistics) to test hypotheses and measure patterns.'
        ]
      },
      {
        number: 2,
        question: 'What is a hypothesis?',
        answer: [
          'A hypothesis is a clear, testable prediction or statement about the expected relationship between variables before data is collected.'
        ]
      },
      {
        number: 3,
        question: 'What is a sample?',
        answer: [
          'A sample is a smaller, representative group of participants selected from a larger population to take part in a study.'
        ]
      },
      {
        number: 4,
        question: 'What is independent variable?',
        answer: [
          'The Independent Variable (IV) is the factor that the researcher intentionally changes or manipulates (the presumed cause) to see its effect on the Dependent Variable.'
        ]
      },
      {
        number: 5,
        question: 'Name 2 research ethics.',
        answer: [
          '1. Informed Consent (participants agree voluntarily after understanding the study)',
          '2. Confidentiality / Privacy (keeping participant identities and answers protected and anonymous).'
        ]
      }
    ]
  },
  {
    subject: 'degree',
    subjectLabel: 'Degree - Modules Students Fail Most',
    subjectIcon: '🧬',
    backPath: '/study-guide/degree-modules',
    chapterNumber: 10,
    slug: 'psychology-developmental-psychology',
    aliases: ['developmental-psychology', 'erikson-attachment-theory'],
    title: 'Psychology: Developmental Psychology',
    shortDescription:
      'Human lifespan growth from infancy to old age: Erikson’s 8 psychosocial stages, Bowlby’s Attachment Theory, Nature vs Nurture & Adolescence.',
    summary: [
      'Developmental Psychology studies how humans grow, think, feel, and change from infancy through adulthood to old age.',
      'Erik Erikson proposed 8 psychosocial stages across the lifespan — each built around a life crisis. John Bowlby explained how early attachment bonds with a caregiver shape emotional security.',
      'Debates examine Nature (genetics/biology) vs Nurture (environment/upbringing), and why adolescence centres on forming a personal identity.'
    ],
    formulasTitle: 'Key Concepts & Lifespan Development Box',
    formulas: [
      {
        expression: 'Erikson 8 Psychosocial Stages',
        meaning: 'Trust vs Mistrust (infancy) ... Identity vs Role Confusion (teen) ... Integrity vs Despair (old age)'
      },
      {
        expression: 'Attachment Theory — John Bowlby',
        meaning: 'Strong emotional bond formed between a baby and primary caregiver ensures survival & trust'
      },
      {
        expression: 'Nature vs Nurture',
        meaning: 'Inherited genes/biology (Nature) vs family, culture, and life environment (Nurture)'
      },
      {
        expression: 'Cognitive Development',
        meaning: 'How thinking, memory, language, and reasoning mature across childhood and adolescence'
      }
    ],
    diagramLines: [
      '   ERIKSON LIFESPAN STAGES SAMPLE:',
      '   [ Baby: Trust vs Mistrust ] ──▶ [ Child: Industry vs Inferiority ] ──▶ [ Teen: Identity vs Role Confusion ]'
    ],
    workedExample: {
      question: 'A teenager asks: "Who am I and what do I want to become?" Which Erikson stage is this?',
      steps: [
        'Identify the age group: adolescence / teenage years.',
        'Match the core psychosocial crisis of adolescence in Erikson’s 8-stage theory.'
      ],
      finalAnswer: 'Identity vs Role Confusion — Adolescence (Erikson Stage 5)'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Who created attachment theory?',
        answer: [
          'John Bowlby created Attachment Theory (later expanded with Strange Situation research by Mary Ainsworth).'
        ]
      },
      {
        number: 2,
        question: 'What is nature vs nurture?',
        answer: [
          'Nature refers to biological traits and genes inherited from parents, while Nurture refers to environmental influences (upbringing, schooling, culture, and life experiences).'
        ]
      },
      {
        number: 3,
        question: 'Name Erikson stage for baby.',
        answer: [
          'Trust vs Mistrust (Infancy, 0–1 year): babies learn whether caregivers can be trusted to meet basic needs.'
        ]
      },
      {
        number: 4,
        question: 'What is attachment?',
        answer: [
          'Attachment is a deep, enduring emotional bond between an infant and their primary caregiver that provides comfort, safety, and a base for exploring the world.'
        ]
      },
      {
        number: 5,
        question: 'Why is adolescence difficult?',
        answer: [
          'Adolescents undergo rapid hormonal and physical puberty changes, intense peer pressure, emotional highs and lows, and Erikson’s Identity vs Role Confusion crisis while seeking independence.'
        ]
      }
    ]
  },
  {
    subject: 'degree',
    subjectLabel: 'Degree - Modules Students Fail Most',
    subjectIcon: '💻',
    backPath: '/study-guide/degree-modules',
    chapterNumber: 11,
    slug: 'it-computer-science-programming-and-database',
    aliases: ['programming-and-database', 'it-programming-sql'],
    title: 'IT / Computer Science: Programming & Database',
    shortDescription:
      'Programming fundamentals (Variables, If-Else decisions, Loops, Algorithms) and Relational Databases (Tables, Primary Key & SQL queries).',
    summary: [
      'Programming means writing step-by-step instructions (algorithms) for a computer to execute. Variables store data in memory, If statements make decisions, and Loops repeat actions automatically.',
      'A Database stores structured data in tables made of rows (records) and columns (fields). Every table needs a Primary Key to uniquely identify each record.',
      'SQL (Structured Query Language) is used to manage data with SELECT, INSERT, UPDATE, and DELETE.'
    ],
    formulasTitle: 'Key Formulas, Pseudocode & SQL Syntax Box',
    formulas: [
      {
        expression: 'Algorithm = Step-by-step solution',
        meaning: 'Clear, ordered finite sequence of instructions that solves a problem'
      },
      {
        expression: 'IF condition THEN action ELSE other ENDIF',
        meaning: 'Decision (selection) control structure executing code based on a true/false test'
      },
      {
        expression: 'SELECT * FROM Students WHERE Age > 18;',
        meaning: 'SQL query retrieving all columns for students older than 18'
      },
      {
        expression: 'SQL CRUD: SELECT • INSERT • UPDATE • DELETE',
        meaning: 'Read, add, modify, and remove records in relational database tables'
      }
    ],
    diagramLines: [
      '   PROGRAM LOGIC:   [ Input ] ──▶ [ Variable ] ──▶ [ IF Decision / LOOP Repeat ] ──▶ [ Output ]',
      '   SQL TABLE:       | StudentID (PK) | FullName | Age |   → Primary Key uniquely identifies each row'
    ],
    workedExample: {
      question: 'Write pseudocode: If mark >= 50 print "Pass" else print "Fail".',
      steps: [
        'Start with the IF condition comparing mark >= 50.',
        'Specify THEN PRINT "Pass", followed by ELSE PRINT "Fail", and close cleanly with ENDIF.'
      ],
      finalAnswer: 'IF mark >= 50 THEN PRINT "Pass" ELSE PRINT "Fail" ENDIF'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What is a variable?',
        answer: [
          'A variable is a named storage location in computer memory used to hold data (such as numbers or text) whose value can change while a program runs.'
        ]
      },
      {
        number: 2,
        question: 'What is a loop?',
        answer: [
          'A loop is a programming control structure (such as FOR or WHILE) that repeats a block of instructions automatically until a condition is met.'
        ]
      },
      {
        number: 3,
        question: 'What does SELECT do in SQL?',
        answer: [
          'SELECT retrieves (reads/queries) data rows and columns from one or more tables in a database.'
        ]
      },
      {
        number: 4,
        question: 'What is a primary key?',
        answer: [
          'A Primary Key is a unique column (or combination of columns) in a database table that cannot contain duplicates or NULL values and uniquely identifies every row/record (e.g., StudentID).'
        ]
      },
      {
        number: 5,
        question: 'Write SQL to show all students.',
        answer: [
          'SELECT * FROM Students;'
        ]
      }
    ]
  },
  {
    subject: 'degree',
    subjectLabel: 'Degree - Modules Students Fail Most',
    subjectIcon: '🏛️',
    backPath: '/study-guide/degree-modules',
    chapterNumber: 12,
    slug: 'it-systems-analysis-business-management-law',
    aliases: ['systems-analysis-business-management', 'sdlc-swot-polc'],
    title: 'IT: Systems Analysis & Business Management / Business Law',
    shortDescription:
      'Systems Development Life Cycle (SDLC 5 phases), Feasibility Study, SWOT Analysis, POLC Management Functions & Business Law essentials.',
    summary: [
      'Systems Analysis studies a business problem, designs an information system, tests it, and implements it using the 5-phase SDLC: Planning, Analysis, Design, Implementation, and Maintenance.',
      'Business Management centres on POLC — Planning, Organising, Leading, and Controlling — while strategic tools like SWOT Analysis evaluate internal and external positioning.',
      'Business Law covers contracts, company structures, and labour law so managers operate legally and protect the organisation.'
    ],
    formulasTitle: 'Key Concepts & SDLC / SWOT / POLC Box',
    formulas: [
      {
        expression: 'SDLC 5 Phases',
        meaning: '1. Planning  →  2. Analysis  →  3. Design  →  4. Implementation  →  5. Maintenance'
      },
      {
        expression: 'Feasibility Study',
        meaning: 'Assesses Technical, Economic (cost vs benefit), Legal, and Operational viability'
      },
      {
        expression: 'SWOT Analysis',
        meaning: 'Strengths, Weaknesses (internal)  •  Opportunities, Threats (external)'
      },
      {
        expression: 'POLC Management Functions',
        meaning: 'Planning • Organising • Leading • Controlling'
      }
    ],
    diagramLines: [
      '   SDLC CYCLE:   [ 1. Planning ] ─▶ [ 2. Analysis ] ─▶ [ 3. Design ] ─▶ [ 4. Implementation ] ─▶ [ 5. Maintenance ]',
      '   SWOT MATRIX:  Internal [ Strengths | Weaknesses ]   |   External [ Opportunities | Threats ]'
    ],
    workedExample: {
      question: 'A company analyses its internal strengths and weaknesses alongside market opportunities and threats. What strategic tool is it using?',
      steps: [
        'Match Strengths (S) and Weaknesses (W) as internal business factors.',
        'Match Opportunities (O) and Threats (T) as external environment factors.'
      ],
      finalAnswer: 'SWOT Analysis'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Name SDLC phases.',
        answer: [
          '1. Planning',
          '2. Analysis',
          '3. Design',
          '4. Implementation',
          '5. Maintenance.'
        ]
      },
      {
        number: 2,
        question: 'What is SWOT?',
        answer: [
          'SWOT stands for Strengths, Weaknesses, Opportunities, and Threats — a strategic planning tool used to evaluate a business’s internal capabilities and external environment.'
        ]
      },
      {
        number: 3,
        question: 'Name 4 management functions.',
        answer: [
          'POLC:',
          '1. Planning',
          '2. Organising',
          '3. Leading',
          '4. Controlling.'
        ]
      },
      {
        number: 4,
        question: 'What is feasibility study?',
        answer: [
          'A feasibility study evaluates whether a proposed IT or business project is practical and worthwhile by checking technical capability, financial cost-benefit, legal compliance, and schedule/operational readiness.'
        ]
      },
      {
        number: 5,
        question: 'Why is Business Law important for managers?',
        answer: [
          'Business Law helps managers draft valid contracts, comply with labour and company legislation, avoid costly lawsuits and penalties, and protect the rights of the company and its employees.'
        ]
      }
    ]
  }
];

export const NCV_CHAPTERS: StudyGuideChapterData[] = [
  {
    subject: 'ncv',
    subjectLabel: 'NCV - Level 2, 3, 4',
    subjectIcon: '💻',
    backPath: '/study-guide/ncv-level-2-3-4',
    chapterNumber: 1,
    slug: 'ncv-office-admin-office-data-processing',
    aliases: ['office-data-processing', 'ncv-odp', 'ncv-office-administration-odp'],
    title: 'NCV Office Administration L2–L4: Office Data Processing',
    shortDescription:
      'MS Word documents, Excel spreadsheets & formulas (=SUM, =AVERAGE), PowerPoint presentations, Access databases, Mail Merge & typing speed.',
    summary: [
      'Office Data Processing = using a computer to do everyday office work accurately and fast.',
      'MS Word = documents (letters, memos, reports), Excel = spreadsheets (budgets, calculations), PowerPoint = presentations, Access = databases.',
      'Must know for NCV exams: Document Formatting, Excel Formulas, Mail Merge, and fast, accurate Typing Speed.'
    ],
    formulasTitle: 'Key Formulas & MS Office Diagrams Box',
    formulas: [
      {
        expression: '=SUM(A1:A5)',
        meaning: 'Excel SUM formula: adds all numbers from cell A1 through A5'
      },
      {
        expression: '=AVERAGE(A1:A5)',
        meaning: 'Excel AVERAGE formula: finds the mean (average) of cells A1 to A5'
      },
      {
        expression: 'Mail Merge = Letters + Data Source',
        meaning: 'Combines a main letter template with a spreadsheet/database address list to create personalised letters automatically'
      },
      {
        expression: 'MS Office Core Suite',
        meaning: 'Word (Documents) • Excel (Spreadsheets) • PowerPoint (Slides) • Access (Databases)'
      }
    ],
    diagramLines: [
      '   EXCEL SPREADSHEET FORMULA:           MAIL MERGE WORKFLOW:',
      '   ┌────┬──────────┐                    ┌──────────────────┐   ┌─────────────────┐',
      '   │ A1 │    10    │                    │   Main Letter    │ + │   Data Source   │',
      '   │ A2 │    20    │                    │ (Dear <<Name>>)  │   │ (Names & Addrs) │',
      '   ├────┼──────────┤                    └────────┬─────────┘   └────────┬────────┘',
      '   │ A3 │ =SUM(A1:A2) -> 30                      └──────────┬───────────┘',
      '   └────┴──────────┘                                        ▼',
      '                                                 Personalised Letters Ready!'
    ],
    workedExample: {
      question: 'In Excel, cells A1 = 10 and A2 = 20. What is =SUM(A1:A2)?',
      steps: [
        'Look at the range inside the brackets: A1:A2 means cell A1 and cell A2.',
        'The =SUM function adds all values in that range together.',
        'Add the cell values: 10 + 20 = 30.'
      ],
      finalAnswer: '30'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What is MS Word used for?',
        answer: [
          'MS Word is a word-processing program used to type, format, edit, and print office documents such as business letters, memos, CVs, notices, and reports.'
        ]
      },
      {
        number: 2,
        question: 'What is =AVERAGE used for?',
        answer: [
          'The =AVERAGE(...) function in MS Excel calculates the arithmetic mean of a selected range of numbers (it adds the values in the cells and divides by how many numbers there are).'
        ]
      },
      {
        number: 3,
        question: 'What is Mail Merge?',
        answer: [
          'Mail Merge is a feature that combines a standard main document (such as a letter or certificate) with a Data Source (a list of names, addresses, or emails) to produce personalised copies for many recipients at once.'
        ]
      },
      {
        number: 4,
        question: 'Name 3 parts of MS Office.',
        answer: [
          '1. MS Word (documents & word processing)',
          '2. MS Excel (spreadsheets & calculations)',
          '3. MS PowerPoint (presentations) — and also MS Access (databases).'
        ]
      },
      {
        number: 5,
        question: 'What is a spreadsheet?',
        answer: [
          'A spreadsheet (such as MS Excel) is a computer grid made of rows and columns of cells used to organise numbers, run automatic formulas and calculations, create budgets, and generate charts.'
        ]
      }
    ]
  },
  {
    subject: 'ncv',
    subjectLabel: 'NCV - Level 2, 3, 4',
    subjectIcon: '🗂️',
    backPath: '/study-guide/ncv-level-2-3-4',
    chapterNumber: 2,
    slug: 'ncv-office-admin-business-practice-office-practice',
    aliases: ['business-practice-office-practice', 'ncv-office-practice', 'ncv-business-practice'],
    title: 'NCV Office Administration L2–L4: Business Practice & Office Practice',
    shortDescription:
      'Filing systems (Alphabetical & Numerical), reception, meeting agendas & minutes, business communication, customer service & ethics.',
    summary: [
      'Business Practice = how a business operates as a whole (departments, customers, ethics, and business functions).',
      'Office Practice = how the office runs day-to-day to support the business.',
      'Must know for exams: Filing, Reception duties, Meetings (Agenda & Minutes), Business Communication, Customer Service, and Business Ethics.'
    ],
    formulasTitle: 'Key Concepts & Office Systems Box',
    formulas: [
      {
        expression: 'Filing Systems: Alphabetical & Numerical',
        meaning: 'Alphabetical (sorted A–Z by client/company name) • Numerical (sorted by file or invoice number)'
      },
      {
        expression: 'Business Communication',
        meaning: 'Clear verbal, telephone, email, memo, and written communication between staff and clients'
      },
      {
        expression: 'Meeting Agenda & Minutes',
        meaning: 'Agenda = list of topics BEFORE the meeting • Minutes = official written record AFTER the meeting'
      },
      {
        expression: 'Customer Service & Business Ethics',
        meaning: 'Treating clients politely and solving problems honestly, fairly, and confidentially'
      }
    ],
    diagramLines: [
      '   HANDLING AN ANGRY CLIENT CALL:',
      '   [1. Listen Quietly] ─▶ [2. Stay Calm] ─▶ [3. Apologise] ─▶ [4. Solve Problem] ─▶ [5. Record Complaint]',
      '',
      '   MEETING FLOW:   [ Notice + Agenda ] ──▶ [ Meeting Held ] ──▶ [ Written Minutes Filed ]'
    ],
    workedExample: {
      question: 'A client calls angry about an incorrect invoice. What do you do?',
      steps: [
        'Step 1: Listen carefully without interrupting so the client feels heard.',
        'Step 2: Stay calm, polite, and professional — never argue back.',
        'Step 3: Apologise sincerely for the inconvenience caused.',
        'Step 4: Solve the problem (check details, fix the mistake, or escalate to a manager).',
        'Step 5: Record the complaint and action taken in the customer log.'
      ],
      finalAnswer: 'Listen, stay calm, apologise, solve the problem, and record the complaint.'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What is filing?',
        answer: [
          'Filing is the systematic sorting, classifying, and storing of paper or electronic office documents (using alphabetical, numerical, chronological, or subject order) so they stay safe and can be found quickly when needed.'
        ]
      },
      {
        number: 2,
        question: 'What is in a meeting agenda?',
        answer: [
          'A meeting agenda lists the meeting title, date, time, and venue, followed by items in order: Welcome, Attendance/Apologies, Minutes of Previous Meeting, Matters Arising, New Business/Topics to Discuss, General, and Date of Next Meeting / Closure.'
        ]
      },
      {
        number: 3,
        question: 'What is customer service?',
        answer: [
          'Customer service is the polite, helpful assistance and support a business gives its customers before, during, and after a purchase or enquiry to keep clients satisfied and loyal.'
        ]
      },
      {
        number: 4,
        question: 'Difference Business Practice vs Office Practice?',
        answer: [
          'Business Practice focuses on how the entire business works (business operations, departments, workplace ethics, customer relations, and economic role).',
          'Office Practice focuses on daily administrative tasks inside the office (reception, telephone etiquette, filing, mail handling, and arranging meetings).'
        ]
      },
      {
        number: 5,
        question: 'Why is communication important in office?',
        answer: [
          'Good office communication prevents costly mistakes, ensures instructions are clearly understood, builds teamwork among staff, and creates a professional, trustworthy image for clients.'
        ]
      }
    ]
  },
  {
    subject: 'ncv',
    subjectLabel: 'NCV - Level 2, 3, 4',
    subjectIcon: '💼',
    backPath: '/study-guide/ncv-level-2-3-4',
    chapterNumber: 3,
    slug: 'ncv-office-admin-new-venture-lo-english-maths-lit',
    aliases: ['new-venture-creation', 'ncv-new-venture-lo-english-maths-lit', 'ncv-fundamentals'],
    title: 'NCV Office Administration L2–L4: New Venture Creation + Life Orientation + English + Maths Lit',
    shortDescription:
      'Starting a business (Business Plan, Marketing, Finance), Life Orientation (health, career, values), English FAL communication & Maths Lit formulas.',
    summary: [
      'New Venture Creation = starting and running your own small business: Business Plan, Marketing, and Finance.',
      'Life Orientation = health, workplace readiness, career planning, and positive values.',
      'English FAL = clear speaking, reading, and written business communication. Maths Lit = real-life maths: budgets, profit, simple interest, and measurements.'
    ],
    formulasTitle: 'Key Formulas & Business Planning Box',
    formulas: [
      {
        expression: 'Profit = Income − Expenses',
        meaning: 'Money left over after paying all business costs'
      },
      {
        expression: 'Simple Interest = P × R × T',
        meaning: 'Interest = Principal (P) × Rate (R as decimal) × Time (T in years)'
      },
      {
        expression: 'Budget = Income − Expenses',
        meaning: 'Plan showing expected money coming in versus money going out over a month or year'
      },
      {
        expression: 'New Venture Creation Pillars',
        meaning: 'Business Plan (Roadmap) • Marketing (4Ps & Customers) • Finance (Cash Flow & Profit)'
      }
    ],
    diagramLines: [
      '   SMALL BUSINESS MONEY CHECK:',
      '   [ Total Income (R5 000) ]  −  [ Total Expenses (R3 000) ]  =  [ Profit (R2 000) ]',
      '',
      '   NCV SUCCESS CORE:  New Venture (Business) + LO (Life Skills) + English FAL + Maths Lit'
    ],
    workedExample: {
      question: 'A small business earns Income of R5 000 and pays Expenses of R3 000. Find the Profit.',
      steps: [
        'Write the profit formula: Profit = Income − Expenses',
        'Substitute the values: Profit = R5 000 − R3 000',
        'Calculate: 5 000 − 3 000 = 2 000'
      ],
      finalAnswer: 'Profit = R2 000'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What is a business plan?',
        answer: [
          'A business plan is a formal written document describing a business idea, its products or services, target customers, marketing strategy, operations, and financial forecasts (used to guide the owner and apply for funding).'
        ]
      },
      {
        number: 2,
        question: 'What is profit?',
        answer: [
          'Profit is the financial gain earned when a business’s total Income is greater than its total Expenses (Profit = Income − Expenses).'
        ]
      },
      {
        number: 3,
        question: 'Income R8000, Expenses R5000, find profit.',
        answer: [
          'Formula: Profit = Income − Expenses',
          'Substitute: Profit = R8 000 − R5 000 = R3 000',
          'Answer: R3 000 profit.'
        ]
      },
      {
        number: 4,
        question: 'What is a budget?',
        answer: [
          'A budget is a financial plan that estimates expected Income and planned Expenses for a set period (such as a month or year) so a person or business avoids overspending.'
        ]
      },
      {
        number: 5,
        question: 'Why is Life Orientation important?',
        answer: [
          'Life Orientation builds essential life and workplace skills — including physical/mental health, career planning, financial responsibility, human rights, and ethical values — helping learners succeed in both jobs and daily life.'
        ]
      }
    ]
  },
  {
    subject: 'ncv',
    subjectLabel: 'NCV - Level 2, 3, 4',
    subjectIcon: '🧾',
    backPath: '/study-guide/ncv-level-2-3-4',
    chapterNumber: 4,
    slug: 'ncv-finance-financial-accounting',
    aliases: ['ncv-financial-accounting', 'ncv-finance-economics-accounting-financial-accounting'],
    title: 'NCV Finance, Economics & Accounting L2–L4: Financial Accounting',
    shortDescription:
      'Debit (Dr) vs Credit (Cr), Journals, Ledgers, Trial Balance, Income Statement, Balance Sheet & Accounting Equation made practical.',
    summary: [
      'Financial Accounting = recording, sorting, and reporting money for a business.',
      'Debit = Dr (left side, what comes in / increases Assets & Expenses). Credit = Cr (right side, what goes out / increases Liabilities, Equity & Income).',
      'Must know for NCV exams: Journals, Ledgers, Trial Balance, Income Statement, and Balance Sheet — the same core principles as BCom, taught in a simpler, practical way.'
    ],
    formulasTitle: 'Key Formulas & Accounting Cycle Box',
    formulas: [
      {
        expression: 'Assets = Liabilities + Equity',
        meaning: 'The fundamental Accounting Equation — must always stay balanced'
      },
      {
        expression: 'Profit = Income − Expenses',
        meaning: 'Calculated in the Income Statement for a financial period'
      },
      {
        expression: 'Trial Balance: Debits = Credits',
        meaning: 'Sum of all Debit balances equals the sum of all Credit balances'
      }
    ],
    diagramLines: [
      '   PRACTICAL ACCOUNTING CYCLE:',
      '   [ Source Documents ] ─▶ [ Journals ] ─▶ [ Ledgers (Dr | Cr) ] ─▶ [ Trial Balance (Dr = Cr) ]',
      '                                                                            │',
      '                                              ┌─────────────────────────────┴──────────────────────┐',
      '                                              ▼                                                    ▼',
      '                                    [ Income Statement ]                                   [ Balance Sheet ]',
      '                                  (Profit = Income − Exp.)                             (Assets = Liab. + Equity)'
    ],
    workedExample: {
      question: 'A business has Assets of R60 000 and Equity of R40 000. Find Liabilities.',
      steps: [
        'Write the Accounting Equation: Assets = Liabilities + Equity',
        'Rearrange to solve for Liabilities: Liabilities = Assets − Equity',
        'Substitute values: Liabilities = R60 000 − R40 000 = R20 000'
      ],
      finalAnswer: 'Liabilities = R20 000'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What is Financial Accounting?',
        answer: [
          'Financial Accounting is the systematic process of recording, classifying, summarising, and reporting a business’s money transactions (into financial statements like the Income Statement and Balance Sheet) so owners, banks, and SARS can see financial results.'
        ]
      },
      {
        number: 2,
        question: 'What is a debit?',
        answer: [
          'A Debit (Dr) is an entry recorded on the left-hand side of a ledger account.',
          'Debits increase Assets (like Cash/Bank) and Expenses, and decrease Liabilities, Equity, and Income.'
        ]
      },
      {
        number: 3,
        question: 'Assets R90 000, Liabilities R30 000, find Equity.',
        answer: [
          'Formula: Assets = Liabilities + Equity  →  Equity = Assets − Liabilities',
          'Substitute: Equity = R90 000 − R30 000 = R60 000',
          'Answer: Equity = R60 000.'
        ]
      },
      {
        number: 4,
        question: 'What is Trial Balance?',
        answer: [
          'A Trial Balance is a list of all General Ledger account balances separated into Debit and Credit columns to check the arithmetic accuracy of double-entry bookkeeping (Total Debits must equal Total Credits).'
        ]
      },
      {
        number: 5,
        question: 'Difference Income Statement vs Balance Sheet?',
        answer: [
          'Income Statement: Shows income earned minus expenses incurred OVER a specific period to calculate Profit or Loss.',
          'Balance Sheet: Shows the business’s Assets, Liabilities, and Equity AT one specific date.'
        ]
      }
    ]
  },
  {
    subject: 'ncv',
    subjectLabel: 'NCV - Level 2, 3, 4',
    subjectIcon: '🏦',
    backPath: '/study-guide/ncv-level-2-3-4',
    chapterNumber: 5,
    slug: 'ncv-finance-economic-environment-applied-accounting',
    aliases: ['ncv-economic-environment-applied-accounting', 'ncv-applied-accounting-vat'],
    title: 'NCV Finance L2–L4: Economic Environment & Applied Accounting',
    shortDescription:
      'Economic Environment (Supply, Demand, Inflation, Unemployment) & practical Applied Accounting (15% SA VAT, Net Salaries & Bank Reconciliation).',
    summary: [
      'Economic Environment = how the wider economy affects every business — including Supply, Demand, Inflation, and Unemployment.',
      'Applied Accounting = using accounting rules in real everyday business tasks: calculating VAT, preparing Salaries & Wages, and completing Bank Reconciliation.',
      'Know South Africa’s standard 15% VAT rate and how to compare a business’s Cash Book against its Bank Statement.'
    ],
    formulasTitle: 'Key Formulas & Applied Accounting Box',
    formulas: [
      {
        expression: 'VAT = 15% in South Africa',
        meaning: 'VAT Amount = Price (Excl.) × 0.15  •  Total Incl. VAT = Price × 1.15'
      },
      {
        expression: 'Net Salary = Gross Salary − Deductions',
        meaning: 'Take-home pay after PAYE tax, UIF, medical aid, and pension deductions'
      },
      {
        expression: 'Inflation = Prices Going Up Over Time',
        meaning: 'General rise in prices causing each Rand to buy less than before'
      }
    ],
    diagramLines: [
      '   SA VAT CALCULATION (15%):          APPLIED ACCOUNTING CONTROLS:',
      '   [ Price Excl. VAT (R100) ]           1. Payroll: Gross Salary − (PAYE + UIF) = Net Salary',
      '        + 15% VAT (R15)                 2. Bank Recon: Cash Book  ◀──Match──▶  Bank Statement',
      '   = [ Total Incl. VAT (R115) ]            (Spot outstanding cheques, deposits & bank charges)'
    ],
    workedExample: {
      question: 'An item costs R100 excluding VAT. Add VAT at 15% and find the total price.',
      steps: [
        'Calculate 15% VAT: VAT = R100 × (15 ÷ 100) = R15',
        'Add VAT to the original price: Total = R100 + R15 = R115'
      ],
      finalAnswer: 'VAT = R15, Total = R115'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What is inflation?',
        answer: [
          'Inflation is the sustained general increase in the prices of goods and services over time, which reduces the purchasing power of money.'
        ]
      },
      {
        number: 2,
        question: 'What is VAT % in SA?',
        answer: [
          '15% (South Africa’s standard Value Added Tax rate).'
        ]
      },
      {
        number: 3,
        question: 'Price R200 + VAT, find total.',
        answer: [
          'VAT = R200 × 15% = R200 × 0.15 = R30',
          'Total = R200 + R30 = R230',
          'Answer: R230.'
        ]
      },
      {
        number: 4,
        question: 'What is bank reconciliation?',
        answer: [
          'Bank reconciliation is the process of comparing the business’s internal Cash Book / Cash Journals with the monthly Bank Statement from the bank and explaining any differences (such as bank charges, interest, or unpresented deposits/payments).'
        ]
      },
      {
        number: 5,
        question: 'What is unemployment?',
        answer: [
          'Unemployment occurs when people who are willing, able, and actively looking for work cannot find a job.'
        ]
      }
    ]
  },
  {
    subject: 'ncv',
    subjectLabel: 'NCV - Level 2, 3, 4',
    subjectIcon: '📈',
    backPath: '/study-guide/ncv-level-2-3-4',
    chapterNumber: 6,
    slug: 'ncv-finance-new-venture-lo-english-maths-lit',
    aliases: ['ncv-finance-new-venture-creation', 'ncv-finance-marketing-4ps'],
    title: 'NCV Finance L2–L4: New Venture Creation + Life Orientation + English + Maths Lit',
    shortDescription:
      'Business Plans, Marketing Mix 4Ps (Product, Price, Place, Promotion), Profit & Markup, Budgets, Simple Interest & Financial Percentages.',
    summary: [
      'New Venture Creation = starting and growing a sustainable business.',
      'Must know: Business Plan and the Marketing Mix 4Ps — Product, Price, Place, Promotion — alongside Life Orientation and English workplace communication.',
      'Maths Lit for Finance covers Budgets, Profit & Markup calculations, Simple Interest, and Percentages.'
    ],
    formulasTitle: 'Key Formulas & Marketing Mix 4Ps Box',
    formulas: [
      {
        expression: 'Profit = Income − Expenses',
        meaning: 'Or Selling Price − Cost Price on goods sold'
      },
      {
        expression: 'Markup = Cost + Profit',
        meaning: 'Selling Price = Cost Price + Profit added'
      },
      {
        expression: 'Simple Interest = P × R × T',
        meaning: 'Principal (P) × Interest Rate (R as decimal) × Time (T in years)'
      },
      {
        expression: 'Marketing Mix (4Ps)',
        meaning: 'Product • Price • Place • Promotion'
      }
    ],
    diagramLines: [
      '   MARKETING MIX (4Ps):   [ Product ]  +  [ Price ]  +  [ Place ]  +  [ Promotion ]',
      '',
      '   PROFIT CHECK:          Selling Price (R150) − Cost Price (R100) = Profit (R50)'
    ],
    workedExample: {
      question: 'A product has a Cost Price of R100 and you sell it for R150. Find the Profit.',
      steps: [
        'Write the profit formula: Profit = Selling Price (Income) − Cost Price (Expenses)',
        'Substitute values: Profit = R150 − R100',
        'Calculate: 150 − 100 = 50'
      ],
      finalAnswer: 'Profit = R50'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What are 4Ps?',
        answer: [
          'The Marketing Mix 4Ps:',
          '1. Product (what you sell — goods or service)',
          '2. Price (how much customers pay)',
          '3. Place (where and how it is distributed)',
          '4. Promotion (how you advertise and attract buyers).'
        ]
      },
      {
        number: 2,
        question: 'What is a business plan?',
        answer: [
          'A business plan is a written document outlining a venture’s goals, products, target market, marketing strategy (4Ps), operations, and financial forecasts (budget, costs, expected profit).'
        ]
      },
      {
        number: 3,
        question: 'Cost R80, Sell R120, find profit.',
        answer: [
          'Formula: Profit = Selling Price − Cost Price',
          'Substitute: Profit = R120 − R80 = R40',
          'Answer: R40 profit.'
        ]
      },
      {
        number: 4,
        question: 'What is marketing?',
        answer: [
          'Marketing is the process of researching what customers want, developing the right product, pricing and promoting it effectively, and delivering it to satisfy customers at a profit.'
        ]
      },
      {
        number: 5,
        question: 'Why do businesses fail?',
        answer: [
          'Common reasons include poor cash-flow/financial management, no clear business plan, weak marketing or wrong location, spending more than income, and poor customer service.'
        ]
      }
    ]
  },
  {
    subject: 'ncv',
    subjectLabel: 'NCV - Level 2, 3, 4',
    subjectIcon: '⚡',
    backPath: '/study-guide/ncv-level-2-3-4',
    chapterNumber: 7,
    slug: 'ncv-electrical-principles-and-practice',
    aliases: ['ncv-electrical-infrastructure-principles', 'ncv-electrical-ohms-law'],
    title: 'NCV Electrical Infrastructure Construction L2–L4: Electrical Principles & Practice',
    shortDescription:
      'Current, Voltage, Resistance, Ohm’s Law (V = I × R), Electrical Power (P = V × I), Series & Parallel circuit calculations.',
    summary: [
      'Electrical Principles = how electricity works in circuits and installations.',
      'Current (I, Amps) = flow of electrons, Voltage (V, Volts) = electrical pressure, Resistance (R, Ohms Ω) = opposition to current flow.',
      'Ohm’s Law is KING in NCV Electrical! Must also master Series vs Parallel resistor circuits and Electrical Power.'
    ],
    formulasTitle: 'Key Formulas & Series / Parallel Diagram Box',
    formulas: [
      {
        expression: 'V = I × R   |   I = V / R   |   R = V / I',
        meaning: 'Ohm’s Law triangle: relates Voltage (V), Current (A), and Resistance (Ω)'
      },
      {
        expression: 'P = V × I',
        meaning: 'Electrical Power in Watts (W) = Voltage (V) × Current (A)'
      },
      {
        expression: 'Series: R_total = R₁ + R₂',
        meaning: 'Same current flows through every resistor; voltages add up'
      },
      {
        expression: 'Parallel: 1/R_total = 1/R₁ + 1/R₂',
        meaning: 'Same voltage across every branch; total current splits between branches'
      }
    ],
    diagramLines: [
      '   SERIES CIRCUIT:                    PARALLEL CIRCUIT:',
      '   ┌───[ R₁ ]───[ R₂ ]───┐            ┌────[ R₁ ]────┐',
      '   │                     │            ├────[ R₂ ]────┤',
      '   └────────( V )────────┘            └────( V )─────┘',
      '   R_total = R₁ + R₂                  1/R_total = 1/R₁ + 1/R₂'
    ],
    workedExample: {
      question: 'A circuit has Voltage V = 12 V and Resistance R = 4 Ω. Find the Current I.',
      steps: [
        'Write Ohm’s Law for Current: I = V ÷ R',
        'Substitute values: I = 12 V ÷ 4 Ω',
        'Calculate: 12 ÷ 4 = 3 A'
      ],
      finalAnswer: 'I = 3 A'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What is Ohm’s Law?',
        answer: [
          'Ohm’s Law states that the current (I) flowing through a conductor is directly proportional to the voltage (V) across it and inversely proportional to its resistance (R), at constant temperature: V = I × R.'
        ]
      },
      {
        number: 2,
        question: 'V=24V, I=2A, find R.',
        answer: [
          'Formula: R = V ÷ I',
          'Substitute: R = 24 V ÷ 2 A = 12 Ω',
          'Answer: R = 12 Ω (ohms).'
        ]
      },
      {
        number: 3,
        question: 'Difference series vs parallel?',
        answer: [
          'Series circuit: Components are connected end-to-end along ONE path — current is the same everywhere, and if one component breaks, the whole circuit stops.',
          'Parallel circuit: Components are connected across separate branches — voltage is the same across each branch, and other branches keep working if one branch opens.'
        ]
      },
      {
        number: 4,
        question: 'What is voltage?',
        answer: [
          'Voltage (potential difference, measured in Volts V) is the electrical pressure or energy per unit charge that pushes electrons to flow around a circuit.'
        ]
      },
      {
        number: 5,
        question: 'P=100W, V=20V, find I.',
        answer: [
          'Formula: P = V × I  →  I = P ÷ V',
          'Substitute: I = 100 W ÷ 20 V = 5 A',
          'Answer: I = 5 A.'
        ]
      }
    ]
  },
  {
    subject: 'ncv',
    subjectLabel: 'NCV - Level 2, 3, 4',
    subjectIcon: '🔌',
    backPath: '/study-guide/ncv-level-2-3-4',
    chapterNumber: 8,
    slug: 'ncv-electrical-electronic-control-digital-workshop-practice',
    aliases: ['ncv-electronic-control-digital-electronics', 'ncv-workshop-practice-logic-gates'],
    title: 'NCV Electrical L2–L4: Electronic Control & Digital Electronics + Workshop Practice',
    shortDescription:
      'Relays & timers, Digital Electronics (0 & 1, AND / OR / NOT logic gates), Workshop Practice tools, wiring, testing & Lock-Out PPE safety.',
    summary: [
      'Electronic Control = control circuits built with relays, contactors, and timers to automate machines.',
      'Digital Electronics = binary logic using 0 (LOW/OFF) and 1 (HIGH/ON) through logic gates: AND, OR, NOT.',
      'Workshop Practice = electrical safety, hand tools, wiring, and circuit testing. Safety FIRST: always Isolate, Test Dead, Lock Out, and wear PPE.'
    ],
    formulasTitle: 'Key Concepts & Logic Gates / Safety Box',
    formulas: [
      {
        expression: 'AND Gate (Y = A · B)',
        meaning: 'Output is 1 ONLY if BOTH inputs A and B are 1'
      },
      {
        expression: 'OR Gate (Y = A + B)',
        meaning: 'Output is 1 if ANY input (A or B or both) is 1'
      },
      {
        expression: 'NOT Gate (Y = Ā)',
        meaning: 'Inverter — output is the OPPOSITE of input (0 becomes 1, 1 becomes 0)'
      },
      {
        expression: 'Workshop Safety & PPE',
        meaning: 'Isolate → Lock-Out/Tag-Out → Test Zero Volts → Wear Insulated PPE'
      }
    ],
    diagramLines: [
      '   DIGITAL LOGIC GATES:                 SAFE ISOLATION PROCEDURE:',
      '   AND:  A=1, B=0  ──▶ [ AND ] ──▶ 0     1. Switch OFF & Isolate supply',
      '   OR:   A=0, B=1  ──▶ [  OR ] ──▶ 1     2. Lock Out & Tag (LOTO)',
      '   NOT:  A=1       ──▶ [ NOT ] ──▶ 0     3. Test with calibrated multimeter (Verify Dead)'
    ],
    workedExample: {
      question: 'An AND logic gate has inputs A = 1 and B = 0. What is the output?',
      steps: [
        'Recall the AND gate rule: output is 1 ONLY when ALL inputs are 1.',
        'Here A = 1 and B = 0 (not both 1).',
        'Therefore the output is 0.'
      ],
      finalAnswer: 'Output = 0 (because an AND gate needs both inputs to be 1)'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Name 3 logic gates.',
        answer: [
          '1. AND gate',
          '2. OR gate',
          '3. NOT gate (inverter).'
        ]
      },
      {
        number: 2,
        question: 'AND gate 1,1 = ?',
        answer: [
          'Output = 1 (because both inputs are 1).'
        ]
      },
      {
        number: 3,
        question: 'OR gate 0,1 = ?',
        answer: [
          'Output = 1 (an OR gate outputs 1 whenever at least one input is 1).'
        ]
      },
      {
        number: 4,
        question: 'What is PPE?',
        answer: [
          'PPE stands for Personal Protective Equipment — safety gear worn to protect workers from electrical, mechanical, and arc-flash hazards (such as insulated gloves, safety boots, safety goggles, hard hats, and overalls).'
        ]
      },
      {
        number: 5,
        question: 'Why isolate before working?',
        answer: [
          'Isolating disconnects the electrical circuit from the live power supply so no current can flow through you — preventing fatal electric shock, electrocution, burns, and short-circuit arc flashes.'
        ]
      }
    ]
  },
  {
    subject: 'ncv',
    subjectLabel: 'NCV - Level 2, 3, 4',
    subjectIcon: '☀️',
    backPath: '/study-guide/ncv-level-2-3-4',
    chapterNumber: 9,
    slug: 'ncv-electrical-renewable-energy-maths-english-lo',
    aliases: ['ncv-renewable-energy', 'ncv-electrical-solar-renewable-energy'],
    title: 'NCV Electrical L2–L4: Renewable Energy + Maths + English + Life Orientation',
    shortDescription:
      'Solar PV panels, Wind & Hydro renewable energy, Solar Power (P = V × I) & Energy (E = P × t), technical Maths, English reports & LO.',
    summary: [
      'Renewable Energy = clean energy from natural sources that never run out: Solar (sun), Wind, and Hydro (water).',
      'A Solar PV panel converts sunlight directly into DC electricity, feeding charge controllers, batteries, and inverters.',
      'Engineering Fundamentals: Maths = algebra, trigonometry, and Ohm’s Law calculations; English = clear technical & safety reports; Life Orientation = workplace safety and career planning.'
    ],
    formulasTitle: 'Key Formulas & Solar PV System Box',
    formulas: [
      {
        expression: 'Power Solar = Voltage × Current (P = V × I)',
        meaning: 'Solar panel electrical power output in Watts (W)'
      },
      {
        expression: 'Energy = Power × Time (E = P × t)',
        meaning: 'Electrical energy in Watt-hours (Wh) or Joules (W × seconds)'
      },
      {
        expression: '3 Main Renewable Sources',
        meaning: 'Solar (Sunlight PV) • Wind (Turbines) • Hydro (Moving Water)'
      }
    ],
    diagramLines: [
      '   OFF-GRID / HYBRID SOLAR PV SYSTEM:',
      '   ☀️ Sunlight ─▶ [ Solar Panel (DC) ] ─▶ [ Charge Controller ] ─▶ [ Battery Bank ]',
      '                                                                          │',
      '                                          [ AC Appliances ] ◀─ [ Inverter (DC→AC) ]'
    ],
    workedExample: {
      question: 'A solar panel delivers Voltage = 12 V at Current = 5 A. Find its Power output.',
      steps: [
        'Write the solar power formula: Power = Voltage × Current (P = V × I)',
        'Substitute values: P = 12 V × 5 A',
        'Calculate: 12 × 5 = 60 W'
      ],
      finalAnswer: 'P = 60 W'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Name 3 renewable energies.',
        answer: [
          '1. Solar energy (sunlight)',
          '2. Wind energy (wind turbines)',
          '3. Hydroelectric energy (flowing water).'
        ]
      },
      {
        number: 2,
        question: 'What does solar panel do?',
        answer: [
          'A solar photovoltaic (PV) panel captures sunlight and converts solar light energy directly into direct-current (DC) electricity.'
        ]
      },
      {
        number: 3,
        question: 'Panel 24V, 2A, find Power.',
        answer: [
          'Formula: P = V × I',
          'Substitute: P = 24 V × 2 A = 48 W',
          'Answer: 48 W.'
        ]
      },
      {
        number: 4,
        question: 'Why is renewable energy important?',
        answer: [
          'Renewable energy never runs out, produces clean electricity with low carbon emissions/pollution, reduces load-shedding dependence on fossil fuels (coal), and lowers long-term electricity costs.'
        ]
      },
      {
        number: 5,
        question: 'What is Energy?',
        answer: [
          'Energy is the capacity to do work (for example, lighting a bulb or running a motor). Electrical energy equals Power multiplied by Time (E = P × t), measured in Joules (J) or kilowatt-hours (kWh).'
        ]
      }
    ]
  },
  {
    subject: 'ncv',
    subjectLabel: 'NCV - Level 2, 3, 4',
    subjectIcon: '🧱',
    backPath: '/study-guide/ncv-level-2-3-4',
    chapterNumber: 10,
    slug: 'ncv-civil-engineering-and-building-construction',
    aliases: ['ncv-civil-engineering', 'ncv-building-construction'],
    title: 'NCV Civil Engineering & Building Construction L2–L4',
    shortDescription:
      'Construction Planning, Materials (Cement, Sand, Bricks, Concrete 1:2:3 ratio), Drawings, Measurements, Area (L × W) & Volume (L × W × H).',
    summary: [
      'Civil Engineering & Building Construction covers building houses, roads, bridges, and safe structural foundations.',
      'Must know for NCV L2–L4 exams: Construction Planning, Building Materials, Technical Drawings, and accurate Site Measurements.',
      'Key building materials include Cement, Sand, Bricks, and Concrete. Standard Concrete Mix Ratio 1:2:3 = 1 part Cement : 2 parts Sand : 3 parts Stone.'
    ],
    formulasTitle: 'Key Formulas & Concrete Mix Ratio Box',
    formulas: [
      {
        expression: 'Area = L × W (or L × H)',
        meaning: 'Surface area of a floor, slab, or wall in square metres (m²)'
      },
      {
        expression: 'Volume = L × W × H',
        meaning: 'Three-dimensional volume of foundations, walls, or concrete pours in m³'
      },
      {
        expression: 'Concrete Ratio = 1 : 2 : 3',
        meaning: '1 part Cement : 2 parts Sand : 3 parts Stone (crushed aggregate) + clean water'
      }
    ],
    diagramLines: [
      '   CONCRETE MIX RATIO (1 : 2 : 3):',
      '   [ 1 Cement ]  +  [ 2 Sand ]  +  [ 3 Stone ]  + Clean Water  ──▶  Structural Concrete',
      '   MEASUREMENTS:    Wall Area = L × H  (m²)     |     Foundation Volume = L × W × H  (m³)'
    ],
    workedExample: {
      question: 'A brick wall has Length L = 5 m and Height H = 3 m. Find the Area.',
      steps: [
        'Write the Area formula for a rectangular wall: Area = Length × Height',
        'Substitute the given dimensions: Area = 5 m × 3 m',
        'Multiply: 5 × 3 = 15 m²'
      ],
      finalAnswer: 'Area = 15 m²'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What is concrete ratio?',
        answer: [
          'Concrete ratio is the measured proportion of dry ingredients mixed with water to make concrete. A standard 1:2:3 ratio means 1 part Cement : 2 parts Sand : 3 parts Stone.'
        ]
      },
      {
        number: 2,
        question: 'Wall 4m x 2m, find Area.',
        answer: [
          'Formula: Area = L × H',
          'Substitute: Area = 4 m × 2 m = 8 m²',
          'Answer: 8 m².'
        ]
      },
      {
        number: 3,
        question: 'Name 3 building materials.',
        answer: [
          '1. Cement',
          '2. Sand',
          '3. Bricks (or Stone / Concrete / Timber / Reinforcing Steel).'
        ]
      },
      {
        number: 4,
        question: 'What is construction planning?',
        answer: [
          'Construction planning is the process of organising tasks, timelines, materials, labour, tools, budget, and site safety rules before and during building so the project finishes on time and to specification.'
        ]
      },
      {
        number: 5,
        question: 'What is a foundation?',
        answer: [
          'A foundation is the lowest structural base of a building (usually concrete) built in the ground to carry and distribute the entire weight of the structure safely onto firm soil or rock.'
        ]
      }
    ]
  },
  {
    subject: 'ncv',
    subjectLabel: 'NCV - Level 2, 3, 4',
    subjectIcon: '⚙️',
    backPath: '/study-guide/ncv-level-2-3-4',
    chapterNumber: 11,
    slug: 'ncv-engineering-and-related-design',
    aliases: ['ncv-engineering-design', 'ncv-fitting-turning-welding'],
    title: 'NCV Engineering & Related Design L2–L4',
    shortDescription:
      'Fitting (filing, drilling, tapping), Turning, Welding, Engineering Fundamentals (F = m × a, Stress = F/A, Speed = d/t), Tools & PPE Safety.',
    summary: [
      'Engineering & Related Design covers Fitting, Turning, Welding, and Engineering Fundamentals.',
      'Must know for NCV L2–L4 exams: Workshop Tools, Safety & PPE, Precision Measurements, and Engineering Drawings.',
      'Fitting involves filing, drilling, and tapping threads; Engineering Fundamentals studies forces, stress, and material strength.'
    ],
    formulasTitle: 'Key Formulas & Engineering Fundamentals Box',
    formulas: [
      {
        expression: 'Force = Mass × Acceleration (F = m × a)',
        meaning: 'Force in Newtons (N), Mass in kg, Acceleration in m/s²'
      },
      {
        expression: 'Stress = Force / Area (σ = F / A)',
        meaning: 'Internal resisting force per unit cross-sectional area in Pascals (Pa or N/m²)'
      },
      {
        expression: 'Speed = Distance / Time (v = d / t)',
        meaning: 'Distance travelled per unit time in m/s or km/h'
      },
      {
        expression: 'Fitting Operations',
        meaning: 'Filing, Drilling, Tapping internal threads, Marking off & Assembly'
      }
    ],
    diagramLines: [
      '   WORKSHOP TRADES:    [ Drawings & Measurement ] ─▶ [ Fitting • Turning • Welding ] ─▶ [ Quality Check ]',
      '   MECHANICS CORE:     F = m × a  (Newtons)     |     Stress = F ÷ A     |     Speed = Distance ÷ Time'
    ],
    workedExample: {
      question: 'A component has Mass = 10 kg and Acceleration = 2 m/s². Find the Force.',
      steps: [
        'Write the Force formula: Force = Mass × Acceleration (F = m × a)',
        'Substitute values: F = 10 kg × 2 m/s²',
        'Calculate: 10 × 2 = 20 N'
      ],
      finalAnswer: 'F = 20 N'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What is fitting?',
        answer: [
          'Fitting is the engineering workshop process of accurately shaping, filing, drilling, tapping (cutting internal screw threads), and assembling metal parts to fit together cleanly.'
        ]
      },
      {
        number: 2,
        question: 'Mass 5kg, Acc 3m/s2, find Force.',
        answer: [
          'Formula: F = m × a',
          'Substitute: F = 5 kg × 3 m/s² = 15 N',
          'Answer: 15 N.'
        ]
      },
      {
        number: 3,
        question: 'Name 3 workshop tools.',
        answer: [
          '1. Engineer’s File (flat/round file)',
          '2. Hacksaw',
          '3. Vernier Calliper (or Drill Press / Tap & Die / Ball-peen Hammer).'
        ]
      },
      {
        number: 4,
        question: 'What is PPE in workshop?',
        answer: [
          'PPE (Personal Protective Equipment) is safety gear worn to prevent workshop injuries — including safety goggles or welding helmet, steel-toe safety boots, leather gloves, hearing protection, and flame-resistant overalls.'
        ]
      },
      {
        number: 5,
        question: 'What is welding?',
        answer: [
          'Welding is a metal-joining process that uses intense heat (from an electric arc or gas flame) to melt and permanently fuse two or more metal pieces together, often with a filler rod.'
        ]
      }
    ]
  },
  {
    subject: 'ncv',
    subjectLabel: 'NCV - Level 2, 3, 4',
    subjectIcon: '💾',
    backPath: '/study-guide/ncv-level-2-3-4',
    chapterNumber: 12,
    slug: 'ncv-information-technology',
    aliases: ['ncv-it-computer-science', 'ncv-systems-development-programming'],
    title: 'NCV Information Technology L2–L4',
    shortDescription:
      'Systems Development, Programming Logic (Algorithms, Flowcharts, If-Else, Loops), Hardware vs Software, HTML & Relational Database Tables.',
    summary: [
      'Information Technology covers Systems Development, Computer Programming, and Networks.',
      'Must know for NCV L2–L4 exams: Hardware, Software, Databases, HTML web structure, and Programming Logic.',
      'Covers the same core logic as Degree IT & Computer Science, taught at NCV level with practical hands-on application.'
    ],
    formulasTitle: 'Key Concepts & Programming Logic Box',
    formulas: [
      {
        expression: 'Hardware vs Software',
        meaning: 'Hardware = physical parts (CPU, RAM, screen); Software = programs & OS instructions'
      },
      {
        expression: 'Algorithm & Flowchart',
        meaning: 'Algorithm = step-by-step instructions; Flowchart = visual symbol diagram of program flow'
      },
      {
        expression: 'If-Else & Loop',
        meaning: 'If-Else = decision test (True/False branch); Loop = repeats statements automatically'
      },
      {
        expression: 'Database Table',
        meaning: 'Structured grid of Records (rows) and Fields (columns) identified by a Primary Key'
      }
    ],
    diagramLines: [
      '   DECISION LOGIC FLOW:   [ Input Mark ] ──▶ < Is Mark >= 50 ? > ──┬── TRUE  ──▶ Print "Pass"',
      '                                                                   └── FALSE ──▶ Print "Fail"'
    ],
    workedExample: {
      question: 'Program rule: If mark >= 50 print Pass else Fail. If Mark = 70, what is the output?',
      steps: [
        'Test the IF condition with Mark = 70: Is 70 >= 50?',
        '70 is greater than or equal to 50, so the condition evaluates to TRUE.',
        'The IF branch executes and prints "Pass".'
      ],
      finalAnswer: 'Pass'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'What is hardware?',
        answer: [
          'Hardware refers to all the physical, touchable components of a computer system — such as the CPU, RAM, hard drive/SSD, motherboard, monitor, keyboard, and printer.'
        ]
      },
      {
        number: 2,
        question: 'What is software?',
        answer: [
          'Software is the collection of computer programs, code, and instructions that tell hardware how to run and complete tasks — including Operating Systems (Windows/Linux) and applications (browsers, Word, databases).'
        ]
      },
      {
        number: 3,
        question: 'What is an algorithm?',
        answer: [
          'An algorithm is a clear, finite, step-by-step set of instructions used to solve a problem or perform a calculation in programming.'
        ]
      },
      {
        number: 4,
        question: 'Mark 30, If >=50 Pass else Fail, output?',
        answer: [
          'Test condition: Is 30 >= 50? FALSE.',
          'Since it is false, the ELSE branch executes.',
          'Output: Fail.'
        ]
      },
      {
        number: 5,
        question: 'What is a database?',
        answer: [
          'A database is an organised electronic collection of structured data stored in tables (made of rows/records and columns/fields) so information can be stored, searched, and updated efficiently.'
        ]
      }
    ]
  },
  {
    subject: 'ncv',
    subjectLabel: 'NCV - Level 2, 3, 4',
    subjectIcon: '🏨',
    backPath: '/study-guide/ncv-level-2-3-4',
    chapterNumber: 13,
    slug: 'ncv-tourism-and-hospitality',
    aliases: ['ncv-tourism', 'ncv-hospitality'],
    title: 'NCV Tourism / Hospitality L2–L4',
    shortDescription:
      'Client Services (5-Star Service: Greet, Listen, Help, Thank), Science of Tourism, SA Attractions, Front Office, Booking & Housekeeping.',
    summary: [
      'Tourism & Hospitality covers travel, hotels, guest experiences, and service excellence.',
      'Must know for NCV L2–L4 exams: Client Services, Science of Tourism, Hospitality Operations, Front Office, and Housekeeping.',
      '5-Star Service formula: Greet, Listen, Help, Thank. Major South African attractions include Table Mountain, Kruger National Park, and Robben Island.'
    ],
    formulasTitle: 'Key Concepts & 5-Star Guest Service Box',
    formulas: [
      {
        expression: '5-Star Customer Service',
        meaning: '1. Greet warmly  →  2. Listen actively  →  3. Help promptly  →  4. Thank sincerely'
      },
      {
        expression: 'SA Tourism Attractions',
        meaning: 'Table Mountain (Western Cape), Kruger National Park (Mpumalanga/Limpopo), Robben Island'
      },
      {
        expression: 'Booking & Front Office',
        meaning: 'Reception desk managing reservations, guest check-in/out, room keys, and billing'
      },
      {
        expression: 'Housekeeping',
        meaning: 'Cleaning, sanitising, linen care, and preparing rooms to 5-star guest standards'
      }
    ],
    diagramLines: [
      '   5-STAR SERVICE RULE:  [ 1. Greet ] ──▶ [ 2. Listen ] ──▶ [ 3. Help / Solve ] ──▶ [ 4. Thank ]',
      '   GUEST STAY CYCLE:     Booking ─▶ Front Office (Check-In) ─▶ Housekeeping (Clean Room) ─▶ Happy Guest'
    ],
    workedExample: {
      question: 'A tourist arrives and is angry about a dirty hotel room. What do you do?',
      steps: [
        'Stay calm, greet respectfully, and listen carefully without arguing.',
        'Apologise sincerely for the bad experience on behalf of the hotel.',
        'Solve immediately: offer a clean room or complimentary room upgrade, alert Housekeeping, and record the complaint for follow-up.'
      ],
      finalAnswer: 'Apologise sincerely, listen calmly, offer a clean room / upgrade, and record the complaint.'
    },
    practiceQuestions: [
      {
        number: 1,
        question: 'Name 3 SA tourist attractions.',
        answer: [
          '1. Table Mountain (Cape Town)',
          '2. Kruger National Park (Mpumalanga / Limpopo)',
          '3. Robben Island (Western Cape) — other valid answers include Drakensberg, Cradle of Humankind, and Blyde River Canyon.'
        ]
      },
      {
        number: 2,
        question: 'What is client services?',
        answer: [
          'Client services is the professional care, communication, and assistance given to tourists and guests before, during, and after their stay or trip to ensure satisfaction.'
        ]
      },
      {
        number: 3,
        question: 'What is front office?',
        answer: [
          'The Front Office is the main reception hub of a hotel or lodge responsible for reservations/bookings, check-in, check-out, guest enquiries, and account billing.'
        ]
      },
      {
        number: 4,
        question: 'Why is customer service important in tourism?',
        answer: [
          'Excellent customer service makes tourists feel welcome and safe, creates repeat visits and positive reviews, grows South Africa’s tourism economy, and protects jobs and hotel revenue.'
        ]
      },
      {
        number: 5,
        question: 'What is hospitality?',
        answer: [
          'Hospitality is the industry and practice of warmly welcoming, accommodating, feeding, and caring for travellers and guests in hotels, guesthouses, restaurants, and events.'
        ]
      }
    ]
  }
];

export const ALL_STUDY_GUIDE_CHAPTERS: StudyGuideChapterData[] = [
  ...PHYSICS_CHAPTERS,
  ...LIFE_SCIENCES_CHAPTERS,
  ...MATHS_LITERACY_CHAPTERS,
  ...MATHS_CHAPTERS,
  ...TVET_CHAPTERS,
  ...DEGREE_CHAPTERS,
  ...NCV_CHAPTERS
];

export function findStudyGuideChapter(rawSlug: string): StudyGuideChapterData | null {
  const clean = rawSlug.toLowerCase().replace(/\/+$/, '');
  return (
    ALL_STUDY_GUIDE_CHAPTERS.find(
      (ch) => ch.slug === clean || (ch.aliases && ch.aliases.includes(clean))
    ) || null
  );
}
