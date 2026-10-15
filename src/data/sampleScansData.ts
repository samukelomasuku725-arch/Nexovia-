/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SAMPLE EDUCATIONAL SCANS FOR DEMONSTRATION & TESTING
 * 
 * Allows learners and evaluators to test Scan & Learn immediately
 * without needing an active camera or physical textbook at hand.
 */

export interface SampleScanItem {
  id: string;
  title: string;
  category: string;
  grade: string;
  subject: string;
  topic: string;
  suggestedQuestion: string;
  suggestedMode: 'explain' | 'solve_with_me' | 'simplify' | 'translate' | 'summarize' | 'practice' | 'quiz_me';
  svgDataUri: string;
}

// Crisp, high-contrast educational diagrams rendered as data URIs
export const SAMPLE_SCANS: SampleScanItem[] = [
  {
    id: 'sample-math-quadratic',
    title: 'Grade 10 Mathematics: Quadratic Equation',
    category: 'Mathematics',
    grade: 'Grade 10',
    subject: 'Mathematics',
    topic: 'Quadratic Equations & Parabola',
    suggestedQuestion: 'How do I solve 2x² - 8x + 6 = 0 step by step using factorization?',
    suggestedMode: 'solve_with_me',
    svgDataUri: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="none">
        <rect width="600" height="400" fill="#ffffff" rx="8"/>
        <rect x="20" y="20" width="560" height="360" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4 4" rx="6"/>
        
        <!-- Header -->
        <text x="40" y="55" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0f172a">MATHEMATICS (CAPS) — PAPER 1 REVISION</text>
        <text x="40" y="75" font-family="sans-serif" font-size="12" fill="#64748b">Question 2.1 [6 Marks] · Solve for x</text>
        <line x1="40" y1="90" x2="560" y2="90" stroke="#94a3b8" stroke-width="1.5"/>

        <!-- Problem statement -->
        <text x="50" y="130" font-family="sans-serif" font-size="18" font-weight="bold" fill="#1e293b">2x² - 8x + 6 = 0</text>
        
        <text x="50" y="170" font-family="sans-serif" font-size="13" fill="#334155">2.1.1 Divide both sides by the common factor 2.</text>
        <text x="50" y="195" font-family="sans-serif" font-size="13" fill="#334155">2.1.2 Factorize the remaining trinomial into two binomial factors.</text>
        <text x="50" y="220" font-family="sans-serif" font-size="13" fill="#334155">2.1.3 Determine both real roots and state the x-intercepts.</text>

        <!-- Coordinate graph illustration -->
        <g transform="translate(360, 110)">
          <rect width="180" height="150" fill="#ffffff" stroke="#94a3b8" rx="4"/>
          <!-- Axes -->
          <line x1="20" y1="120" x2="160" y2="120" stroke="#334155" stroke-width="1.5"/>
          <line x1="40" y1="20" x2="40" y2="140" stroke="#334155" stroke-width="1.5"/>
          <text x="165" y="125" font-family="sans-serif" font-size="10" fill="#334155">x</text>
          <text x="40" y="15" font-family="sans-serif" font-size="10" fill="#334155">y</text>
          <!-- Parabola curve -->
          <path d="M 50 30 Q 90 140 140 30" fill="none" stroke="#d97706" stroke-width="2.5"/>
          <!-- Root points -->
          <circle cx="68" cy="120" r="3.5" fill="#2563eb"/>
          <circle cx="120" cy="120" r="3.5" fill="#2563eb"/>
          <text x="60" y="135" font-family="sans-serif" font-size="9" fill="#2563eb">x = 1</text>
          <text x="115" y="135" font-family="sans-serif" font-size="9" fill="#2563eb">x = 3</text>
          <!-- Vertex -->
          <circle cx="94" cy="98" r="3" fill="#dc2626"/>
          <text x="96" y="95" font-family="sans-serif" font-size="8" fill="#dc2626">V(2, -2)</text>
        </g>

        <!-- Footer / Notes -->
        <rect x="40" y="270" width="520" height="85" fill="#f1f5f9" stroke="#e2e8f0" rx="4"/>
        <text x="55" y="295" font-family="sans-serif" font-size="11" font-weight="bold" fill="#0f172a">EXAM TECHNIQUE TIP:</text>
        <text x="55" y="315" font-family="sans-serif" font-size="11" fill="#475569">Always verify by re-expanding: (x - 1)(x - 3) = x² - 4x + 3 = 0, multiply by 2 gives 2x² - 8x + 6.</text>
        <text x="55" y="335" font-family="sans-serif" font-size="10" fill="#64748b">BrightPath Academy CAPS Alignment · Foundation Problem Solving</text>
      </svg>
    `)}`
  },
  {
    id: 'sample-physics-circuit',
    title: 'Physical Sciences: Electric Circuits (Ohm’s Law)',
    category: 'Physics / TVET',
    grade: 'Grade 11',
    subject: 'Physical Sciences',
    topic: 'Electric Circuits & Resistors',
    suggestedQuestion: 'How do I calculate total equivalent resistance and the current through R1 and R2?',
    suggestedMode: 'explain',
    svgDataUri: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="none">
        <rect width="600" height="400" fill="#ffffff" rx="8"/>
        <rect x="20" y="20" width="560" height="360" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" rx="6"/>

        <text x="40" y="55" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0f172a">PHYSICAL SCIENCES / TVET NATED — ELECTRIC CIRCUITS</text>
        <text x="40" y="75" font-family="sans-serif" font-size="12" fill="#64748b">Direct Current Analysis · Series-Parallel Combination</text>
        <line x1="40" y1="90" x2="560" y2="90" stroke="#94a3b8" stroke-width="1.5"/>

        <!-- Circuit diagram -->
        <g transform="translate(60, 110)">
          <!-- Wire loop -->
          <path d="M 60 40 L 400 40 L 400 80 M 400 120 L 400 160 L 60 160 Z" fill="none" stroke="#1e293b" stroke-width="2.5"/>
          
          <!-- Battery / Voltage source (left) -->
          <line x1="60" y1="85" x2="60" y2="115" stroke="#1e293b" stroke-width="4"/>
          <line x1="50" y1="92" x2="50" y2="108" stroke="#1e293b" stroke-width="2"/>
          <text x="15" y="103" font-family="sans-serif" font-size="13" font-weight="bold" fill="#0284c7">V = 12V</text>
          
          <!-- Switch -->
          <line x1="160" y1="40" x2="190" y2="28" stroke="#1e293b" stroke-width="2.5"/>
          <circle cx="160" cy="40" r="3" fill="#1e293b"/>
          <circle cx="195" cy="40" r="3" fill="#1e293b"/>
          <text x="170" y="20" font-family="sans-serif" font-size="11" fill="#475569">S (Closed)</text>

          <!-- Resistor R1 in top branch -->
          <rect x="250" y="28" width="60" height="24" fill="#fef3c7" stroke="#d97706" stroke-width="2" rx="2"/>
          <text x="260" y="44" font-family="sans-serif" font-size="11" font-weight="bold" fill="#92400e">R1 = 4 Ω</text>

          <!-- Parallel branch on right -->
          <line x1="400" y1="80" x2="360" y2="80" stroke="#1e293b" stroke-width="2"/>
          <line x1="400" y1="80" x2="440" y2="80" stroke="#1e293b" stroke-width="2"/>

          <!-- R2 (left parallel) -->
          <rect x="340" y="90" width="40" height="24" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" rx="2"/>
          <text x="345" y="106" font-family="sans-serif" font-size="10" font-weight="bold" fill="#0369a1">6 Ω</text>
          <line x1="360" y1="80" x2="360" y2="90" stroke="#1e293b" stroke-width="2"/>
          <line x1="360" y1="114" x2="360" y2="124" stroke="#1e293b" stroke-width="2"/>

          <!-- R3 (right parallel) -->
          <rect x="420" y="90" width="40" height="24" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" rx="2"/>
          <text x="425" y="106" font-family="sans-serif" font-size="10" font-weight="bold" fill="#0369a1">3 Ω</text>
          <line x1="440" y1="80" x2="440" y2="90" stroke="#1e293b" stroke-width="2"/>
          <line x1="440" y1="114" x2="440" y2="124" stroke="#1e293b" stroke-width="2"/>

          <line x1="360" y1="124" x2="440" y2="124" stroke="#1e293b" stroke-width="2"/>
          <line x1="400" y1="124" x2="400" y2="160" stroke="#1e293b" stroke-width="2"/>
        </g>

        <!-- Question text -->
        <rect x="40" y="290" width="520" height="75" fill="#f1f5f9" stroke="#e2e8f0" rx="4"/>
        <text x="55" y="312" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0f172a">GIVEN: Battery emf = 12 V with negligible internal resistance.</text>
        <text x="55" y="332" font-family="sans-serif" font-size="11" fill="#334155">Calculate: (a) The equivalent resistance of the parallel combination (6 Ω || 3 Ω).</text>
        <text x="55" y="350" font-family="sans-serif" font-size="11" fill="#334155">(b) Total current delivered by the battery, and the potential difference across R1.</text>
      </svg>
    `)}`
  },
  {
    id: 'sample-biology-cell',
    title: 'Life Sciences: Plant vs Animal Cell Organelles',
    category: 'Life Sciences',
    grade: 'Grade 10',
    subject: 'Life Sciences',
    topic: 'Cell Biology & Organelles',
    suggestedQuestion: 'Explain the function of chloroplasts, mitochondria, and cell wall shown in this diagram.',
    suggestedMode: 'simplify',
    svgDataUri: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="none">
        <rect width="600" height="400" fill="#ffffff" rx="8"/>
        <rect x="20" y="20" width="560" height="360" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" rx="6"/>

        <text x="40" y="55" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0f172a">LIFE SCIENCES (CAPS) — CELL STRUCTURE</text>
        <text x="40" y="75" font-family="sans-serif" font-size="12" fill="#64748b">Strand 1: Life at the Molecular, Cellular and Tissue Level</text>
        <line x1="40" y1="90" x2="560" y2="90" stroke="#94a3b8" stroke-width="1.5"/>

        <!-- Plant cell boundary -->
        <g transform="translate(60, 110)">
          <!-- Outer cell wall -->
          <rect x="20" y="10" width="300" height="180" rx="25" fill="#ecfdf5" stroke="#059669" stroke-width="4"/>
          <!-- Plasma membrane -->
          <rect x="26" y="16" width="288" height="168" rx="20" fill="none" stroke="#10b981" stroke-width="1.5"/>

          <!-- Large central vacuole -->
          <ellipse cx="160" cy="100" rx="80" ry="50" fill="#e0f2fe" stroke="#38bdf8" stroke-width="2"/>
          <text x="140" y="105" font-family="sans-serif" font-size="11" fill="#0284c7" font-weight="bold">Vacuole</text>

          <!-- Nucleus -->
          <circle cx="75" cy="65" r="28" fill="#f3e8ff" stroke="#9333ea" stroke-width="2"/>
          <circle cx="75" cy="65" r="10" fill="#9333ea"/>
          <text x="55" y="105" font-family="sans-serif" font-size="10" fill="#7e22ce" font-weight="bold">Nucleus</text>

          <!-- Chloroplasts -->
          <ellipse cx="250" cy="55" rx="22" ry="12" fill="#dcfce7" stroke="#15803d" stroke-width="2"/>
          <text x="230" y="58" font-family="sans-serif" font-size="9" fill="#15803d" font-weight="bold">Chloroplast</text>

          <!-- Mitochondrion -->
          <ellipse cx="260" cy="140" rx="20" ry="10" fill="#ffedd5" stroke="#ea580c" stroke-width="2"/>
          <text x="240" y="143" font-family="sans-serif" font-size="9" fill="#c2410c" font-weight="bold">Mitochondria</text>
        </g>

        <!-- Right Labeling Legend -->
        <g transform="translate(400, 110)">
          <rect width="160" height="170" fill="#ffffff" stroke="#cbd5e1" rx="4"/>
          <text x="15" y="25" font-family="sans-serif" font-size="11" font-weight="bold" fill="#0f172a">ORGANELLE LABELS</text>
          <text x="15" y="50" font-family="sans-serif" font-size="10" fill="#059669">1. Cellulose Cell Wall</text>
          <text x="15" y="75" font-family="sans-serif" font-size="10" fill="#7e22ce">2. Nucleus & DNA</text>
          <text x="15" y="100" font-family="sans-serif" font-size="10" fill="#0284c7">3. Large Central Vacuole</text>
          <text x="15" y="125" font-family="sans-serif" font-size="10" fill="#15803d">4. Chloroplasts (Photosynthesis)</text>
          <text x="15" y="150" font-family="sans-serif" font-size="10" fill="#c2410c">5. Mitochondria (Cell Respiration)</text>
        </g>

        <rect x="40" y="300" width="520" height="60" fill="#f1f5f9" stroke="#e2e8f0" rx="4"/>
        <text x="55" y="322" font-family="sans-serif" font-size="11" font-weight="bold" fill="#0f172a">ASSESSMENT QUESTION:</text>
        <text x="55" y="342" font-family="sans-serif" font-size="11" fill="#334155">Tabulate three structural differences between plant and animal cells visible in this diagram.</text>
      </svg>
    `)}`
  }
];
