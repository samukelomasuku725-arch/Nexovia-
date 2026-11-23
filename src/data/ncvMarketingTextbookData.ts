/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN ORIGINAL NCV MARKETING TEXTBOOK
 * Status: LIVE — Level 2 Complete: Chapters 1–10 LIVE + 100-Mark L2 Mock Exam & Memo
 * Route: /textbooks/ncv-marketing-textbook
 * Read Online Only on nexovian.group.
 */

export interface NcvMarketingKeyTerm {
  term: string;
  definition: string;
}

export interface NcvMarketingChapter {
  id: string;
  level: 2 | 3 | 4;
  chapterNumber: number;
  chapterLabel: string;
  displayHeading?: string;
  title: string;
  subtitle: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
    formulaBlock?: string;
  }>;
  keyTerms: NcvMarketingKeyTerm[];
  workedExample: {
    title: string;
    scenario: string;
    formulaBlock?: string;
    steps: string[];
    finalAnswer: string;
  };
  practiceQuestions: Array<{
    number: number;
    label: string;
    question: string;
    answer: string;
  }>;
}

export interface NcvMarketingRoadmapItem {
  chapterNumber: number;
  level: 2 | 3 | 4;
  title: string;
  status: 'LIVE' | 'COMING_SOON';
}

export interface NcvMarketingMockExamMcq {
  number: string;
  question: string;
  options: Array<{
    letter: 'A' | 'B' | 'C' | 'D';
    text: string;
  }>;
  correctLetter: 'A' | 'B' | 'C' | 'D';
  memoSummary: string;
}

export interface NcvMarketingMockExamSubQuestion {
  code: string;
  prompt: string;
  marks: number;
  memoAnswer: string;
}

export interface NcvMarketingMockExamQuestion {
  questionNumber: number;
  section: 'B' | 'C';
  title: string;
  totalMarks: number;
  scenario?: string;
  subQuestions: NcvMarketingMockExamSubQuestion[];
}

export interface NcvMarketingMockExamPaper {
  id: string;
  level: 2;
  title: string;
  subtitle: string;
  timeAllocation: string;
  totalMarks: number;
  instructions: string;
  stopNote: string;
  sectionATitle: string;
  sectionAMarks: number;
  sectionAInstructions: string;
  sectionAMcqs: NcvMarketingMockExamMcq[];
  sectionBTitle: string;
  sectionBMarks: number;
  sectionCTitle: string;
  sectionCMarks: number;
  writtenQuestions: NcvMarketingMockExamQuestion[];
}

export const NCV_MARKETING_ROADMAP: NcvMarketingRoadmapItem[] = [
  { chapterNumber: 1, level: 2, title: 'What is Marketing?', status: 'LIVE' },
  { chapterNumber: 2, level: 2, title: 'The Marketing Environment & SWOT', status: 'LIVE' },
  { chapterNumber: 3, level: 2, title: 'Consumer Behaviour — Why Customers Buy', status: 'LIVE' },
  { chapterNumber: 4, level: 2, title: 'Market Segmentation, Targeting & Positioning — STP', status: 'LIVE' },
  { chapterNumber: 5, level: 2, title: 'The Marketing Mix — 4Ps / 7Ps', status: 'LIVE' },
  { chapterNumber: 6, level: 2, title: 'Branding, Packaging & Labelling', status: 'LIVE' },
  { chapterNumber: 7, level: 2, title: 'Pricing & Promotion in Action', status: 'LIVE' },
  { chapterNumber: 8, level: 2, title: 'Distribution & Retailing', status: 'LIVE' },
  { chapterNumber: 9, level: 2, title: 'Customer Service & Customer Relationship Management — CRM', status: 'LIVE' },
  { chapterNumber: 10, level: 2, title: 'Marketing Plan + Full Exam Revision', status: 'LIVE' }
];

export const NCV_MARKETING_LIVE_CHAPTERS: NcvMarketingChapter[] = [
  {
    id: 'ncv-mkt-l2-ch1-what-is-marketing',
    level: 2,
    chapterNumber: 1,
    chapterLabel: 'Level 2 • Chapter 1',
    displayHeading: 'Level 2 — Chapter 1: What is Marketing?',
    title: 'What is Marketing?',
    subtitle: 'Level 2 - NCV Marketing (Nexovian Original Series)',
    sections: [
      {
        heading: 'Marketing Definition & The 3 Core Ideas (Needs, Value & Relationships)',
        paragraphs: [
          'Marketing is NOT just selling or advertising — selling is only ONE small part of the bigger picture. Marketing means finding out what customers NEED, delivering it to them at a profit, and keeping them happy so they come back again and again.',
          'South African Kota Shop Example (Centurion): You do not simply start frying random kotas. First you ask: do commuters here want chicken or beef kotas, spicy or mild, R30 or R50, where do they walk, and what time are they hungry? When you answer those questions, customers buy eagerly; if you only cook what YOU like, your shop fails.',
          'The Marketer’s Job: Turn customer Wants into real Demand by making the product both desirable and affordable — and focus on long-term relationships rather than one-off sales.'
        ],
        bullets: [
          '1a. Need: Essential goods required to survive (food, water, shelter, basic clothes).',
          '1b. Want: A specific desire shaped by culture and taste (need food -> want a kota; need clothes -> want Nike sneakers).',
          '1c. Demand: A Want backed by the MONEY to pay for it. Wanting R2,500 Nike sneakers with only R200 in cash = NO demand; having R2,500 to buy = DEMAND.',
          '2. Value & Satisfaction: Customers ask "What do I get for my money?" A big, tasty, fast R50 kota delivers high value -> satisfied customer returns and tells friends. A small, cold, slow R50 kota delivers low value -> customer leaves and tells 10 people a bad story.',
          '3. Exchange & Customer Relationship: Exchange = customer gives Money, business gives Product. True Level 2 marketing builds repeat loyalty: instead of 1 kota, get a customer buying 5 times a week for 52 weeks (R50 × 5 × 52 = R13,000 per year from ONE loyal customer!).'
        ],
        formulaBlock: `Customer Lifetime Value Example (1 Loyal Kota Customer):
R50 per kota × 5 days/week × 52 weeks = R13,000 per year from ONE customer!`
      },
      {
        heading: 'Marketing vs Selling (Exam Favourite) & The 4 Pillars of the Marketing Concept',
        paragraphs: [
          'NCV exams frequently test the difference between a Selling focus ("pushing" whatever the factory already made) and a Marketing focus ("pulling" customers by designing what they actually want):',
          'Why Marketing Matters in South Africa: (1) Fierce competition — with 5 kota shops on one street, marketing makes the difference; (2) Informed customers have choices and will choose Shoprite if a spaza shop is dirty or rude; (3) Against high unemployment, strong marketing skills help entrepreneurs start businesses that survive.'
        ],
        bullets: [
          'Selling (Push): Product focus -> "We must sell what we already made." Starts at the factory and ends at the customer.',
          'Marketing (Pull): Customer focus -> "We must make what the customer wants." Starts with the customer and guides production.',
          'Pillar 1 — Focus on Customer Needs: Always research and prioritise what buyers need.',
          'Pillar 2 — Integrated Marketing: All business departments (kitchen, cashiers, delivery, finance) work together to satisfy the customer — not only the sales team.',
          'Pillar 3 — Profit Through Satisfaction: Long-term profit happens BECAUSE customers are happy.',
          'Pillar 4 — Social Responsibility: Never harm society — do not sell expired food or lie in advertisements.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Marketing',
        definition: 'Finding out what customers need and satisfying those needs profitably over time.'
      },
      {
        term: 'Need',
        definition: 'Basic human requirement needed for survival (food, water, shelter, basic clothing).'
      },
      {
        term: 'Want',
        definition: 'A human need shaped into a specific desired product (e.g. wanting a kota or Nike sneakers).'
      },
      {
        term: 'Demand',
        definition: 'A customer want backed by the ability and willingness (money) to pay for it.'
      },
      {
        term: 'Value',
        definition: 'The benefits a customer receives compared against the price they pay.'
      },
      {
        term: 'Satisfaction',
        definition: 'How happy a customer feels after buying and using a product compared to expectations.'
      },
      {
        term: 'Exchange',
        definition: 'Transaction where the customer gives money and the business supplies a product or service.'
      },
      {
        term: 'Selling',
        definition: 'Short-term approach focused on pushing already-made products to buyers.'
      },
      {
        term: 'Marketing Concept',
        definition: 'Philosophy focused on customer needs, integrated teamwork, social responsibility, and profit through satisfaction.'
      },
      {
        term: 'Customer Relationship',
        definition: 'Building ongoing trust and loyalty so customers keep returning rather than buying once.'
      }
    ],
    workedExample: {
      title: 'Thandi’s Hair Salon in Soshanguve — From Zero Sales to R5,000 Saturdays',
      scenario:
        'Thandi opens a hair salon in Soshanguve believing marketing only means posting photos on Facebook. Despite daily posts, nobody walks in.',
      formulaBlock: `BEFORE (SELLING / POSTING ONLY):
• Only posted on Facebook without asking local commuters what they wanted -> 0 bookings!

AFTER (REAL MARKETING):
1. Asked Customers: Desired braid style, budget (R250 vs R400), speed (2 hours), day (Saturday), location (taxi rank).
2. Acted on Needs: Relocated near Soshanguve taxi rank, priced braids at R250, opened Saturday 7am, served free tea.
3. Result: 20 customers × R250 = R5,000 every Saturday!`,
      steps: [
        'Step 1 (Listen First): Instead of pushing ads, Thandi interviewed local Soshanguve women about braid style, budget (R250 vs R400), turnaround time (2 hours), and preferred day/location.',
        'Step 2 (Deliver Value & Convenience): She moved near the busy taxi rank, opened at 7am on Saturdays, set braids at an affordable R250 completed within 2 hours, and added free tea.',
        'Step 3 (Profit Through Satisfaction): Without changing her braiding skill, aligning her marketing to customer needs generated 20 × R250 = R5,000 every Saturday and strong repeat relationships.'
      ],
      finalAnswer:
        'By switching from Facebook-only pushing to customer-first marketing (R250 braids, 2 hours, Saturday 7am near the taxi rank + free tea), Thandi generates R5,000 per Saturday.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Define Marketing (2 marks)',
        question: 'Define Marketing. (2 marks)',
        answer:
          'Finding out what customers need and want, and satisfying those needs profitably while keeping customers happy so they return.'
      },
      {
        number: 2,
        label: 'Need vs Want vs Demand With Examples (6 marks)',
        question: 'Distinguish between Need, Want, and Demand. Give 1 example of each. (6 marks)',
        answer:
          'Need = essential for survival (e.g. food). Want = need plus a specific desire (e.g. wanting a kota). Demand = a want backed by money to buy it (e.g. wanting a kota and having R50 in your pocket to buy it).'
      },
      {
        number: 3,
        label: 'Marketing vs Selling (4 marks)',
        question: 'Distinguish between Marketing and Selling. (4 marks)',
        answer:
          'Selling focuses on the product ("pushing what we made" from the factory to the customer). Marketing focuses on the customer ("making what the customer wants" starting with customer needs and earning profit through satisfaction).'
      },
      {
        number: 4,
        label: 'Customer Value & Why It Matters (3 marks)',
        question: 'What is Customer Value? Why is it important? (3 marks)',
        answer:
          'Customer Value is what the buyer gets (quality, speed, taste, service) compared to the price they pay. When value is high, customers are satisfied, keep coming back, tell friends, and grow business profit.'
      },
      {
        number: 5,
        label: '4 Pillars of the Marketing Concept (4 marks)',
        question: 'List the 4 Pillars of the Marketing Concept. (4 marks)',
        answer:
          '1) Focus on Customer Needs, 2) Integrated Marketing (all departments work together), 3) Profit through Customer Satisfaction, and 4) Social Responsibility.'
      },
      {
        number: 6,
        label: 'Applying Marketing Concept to Vetkoek Shop (3 marks)',
        question:
          'Your friend sells vetkoek for R15 but nobody buys. Using the Marketing Concept, what should he do? (3 marks)',
        answer:
          'Stop just pushing the R15 vetkoek and research customer needs first: ask buyers whether they want bigger vetkoek, different fillings (polony, mince, atchar), a lower price, or a better selling location and time near commuters.'
      }
    ]
  },
  {
    id: 'ncv-mkt-l2-ch2-marketing-environment-swot',
    level: 2,
    chapterNumber: 2,
    chapterLabel: 'Level 2 • Chapter 2',
    displayHeading: 'Level 2 — Chapter 2: The Marketing Environment & SWOT',
    title: 'The Marketing Environment & SWOT',
    subtitle: 'Level 2 - NCV Marketing (Nexovian Original Series)',
    sections: [
      {
        heading: 'The 3 Marketing Environments (Micro, Market & Macro / PESTLE)',
        paragraphs: [
          'A business cannot control everything. Every enterprise operates inside a surrounding Marketing Environment — some elements are inside your control, some you can influence, and others are completely outside your control so you must adapt.',
          'South African Kota Shop Perspective: You control your own kitchen, cleanliness, pricing, staff attitude, and choice of bread supplier (Micro). You cannot stop a new competitor from opening next door or customers demanding healthier food, so you react (Market). And when inflation, loadshedding, or new laws hit the whole country, you must adapt fast or close down (Macro / PESTLE).'
        ],
        bullets: [
          '1. MICRO Environment — YOU CONTROL IT (Inside your business): You / Owner (skills & money), Staff (friendly, skilled, punctual), Suppliers (cheap & reliable stock), Customers (who buys & what they want), Competitors nearby, and Intermediaries (middlemen — wholesalers, taxi drivers delivering goods, shops selling your product).',
          '2. MARKET Environment — YOU CAN INFLUENCE, NOT CONTROL (Your industry): Competitors get stronger (new kota shop opens next door with a lower price); Customers change taste (wanting healthy options instead of oily food); Suppliers raise prices (bread goes R10 -> R15). React by lowering prices, adding healthy options, or changing suppliers.',
          '3. MACRO Environment — YOU CANNOT CONTROL AT ALL (Whole country / world — adapt or die), remembered with PESTLE:',
          '• P - Political: Government laws, elections, corruption, NSFAS, BEE (e.g. govt bans plastic bags -> switch to paper bags).',
          '• E - Economic: Inflation, unemployment, repo rate, Rand (e.g. inflation rises -> customers have less money -> buy less).',
          '• S - Social: Culture, age, religion, lifestyle (e.g. in Mamelodi people love amapiano events; in Centurion people love gym -> different marketing).',
          '• T - Technological: Phones, TikTok, Yoco card machine, loadshedding, AI (e.g. without a card machine you lose cashless customers).',
          '• L - Legal: Laws like CPA, Labour Law, Health & Safety (e.g. Consumer Protection Act shuts shops selling expired food).',
          '• E - Environmental / Ecological: Weather, pollution, water, loadshedding (e.g. drought makes vegetables expensive -> kota cost rises).'
        ],
        formulaBlock: `3 MARKETING ENVIRONMENTS SUMMARY:
• MICRO   = Inside business -> YOU CONTROL IT
• MARKET  = Your industry   -> INFLUENCE & REACT
• MACRO   = Whole country   -> PESTLE -> ADAPT OR DIE`
      },
      {
        heading: 'SWOT Analysis (Exam Favourite) — Turning Analysis Into Action',
        paragraphs: [
          'SWOT is the strategic tool you use to audit your business BEFORE making a marketing plan: Strengths and Weaknesses are INTERNAL (inside your business — you control them), while Opportunities and Threats are EXTERNAL (outside your business — you do not control them).',
          'Golden Strategy Rule: Strengths + Opportunities = GROW. Weaknesses + Threats = FIX OR DIE.',
          'Example — Thandi’s Salon Strategy: Thandi has Strengths (skilled braider, loyal customers, cheap rent) and Weaknesses (no card machine, no online booking, works alone). Outside Opportunities (new university hostel opening nearby, TikTok hair trends) meet Threats (new salon opening next door, loadshedding, expensive hair products). Thandi uses her Strength (skill) to grab the Opportunity (hostel students via TikTok) and fixes her Weakness (gets a Yoco card machine) to fight the Threat (the new competing salon).'
        ],
        bullets: [
          'S — Strengths (Internal Good): What you do well (e.g. best kota taste, loyal customers, cheap rent, near a taxi rank).',
          'W — Weaknesses (Internal Bad): What holds you back inside (e.g. no card machine, staff always late, small shop, no Facebook page).',
          'O — Opportunities (External Good): Favourable outside changes coming (e.g. new school opening nearby = 500 new customers, TikTok kota trend).',
          'T — Threats (External Bad): Outside dangers coming (e.g. new Shoprite opening, bread price rising, 6-hour loadshedding).'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Micro Environment',
        definition: 'Factors inside the business itself that the owner directly controls (staff, prices, internal processes).'
      },
      {
        term: 'Market Environment',
        definition: 'The surrounding industry (customers, competitors, suppliers, intermediaries) that you can influence and react to, not control.'
      },
      {
        term: 'Macro Environment',
        definition: 'Broad national and global forces (PESTLE) outside business control that you must adapt to.'
      },
      {
        term: 'PESTLE',
        definition: 'Framework for Macro forces: Political, Economic, Social, Technological, Legal, and Environmental factors.'
      },
      {
        term: 'SWOT',
        definition: 'Strategic check of internal Strengths & Weaknesses and external Opportunities & Threats before planning.'
      },
      {
        term: 'Strengths',
        definition: 'Internal positive capabilities and advantages that the business controls.'
      },
      {
        term: 'Weaknesses',
        definition: 'Internal limitations or flaws inside the business that must be fixed.'
      },
      {
        term: 'Opportunities',
        definition: 'External positive trends or events the business can capture for growth.'
      },
      {
        term: 'Threats',
        definition: 'External dangers or pressures outside the business that can reduce sales or survival.'
      },
      {
        term: 'Intermediaries',
        definition: 'Middlemen (wholesalers, delivery taxi drivers, retail shops) who help move and sell products to buyers.'
      },
      {
        term: 'Competitors',
        definition: 'Other businesses selling the same or similar products to the same target customers.'
      }
    ],
    workedExample: {
      title: 'Sipho’s Kota Shop in Soshanguve — SWOT + PESTLE in Action',
      scenario:
        'Sipho sells kotas in Soshanguve. His bread supplier increases bread prices by 30%, a new competitor opens with R25 kotas, and loadshedding lasts 4 hours daily — but a new taxi rank is opening next month.',
      formulaBlock: `MACRO (PESTLE): Economic = Bread price +30% | Tech/Env = Loadshedding 4 hrs | Social = More taxi commuters arriving
MARKET:         Competitor = R25 kota Threat | Customers = Want cheaper kota
MICRO (Action): Change bread supplier | Launch smaller R25 kota | Buy gas stove | Move closer to new taxi rank`,
      steps: [
        'Step 1 (Classify Macro / PESTLE): Bread price surge (+30%) = Economic factor; 4-hour loadshedding = Technological / Environmental factor; growing commuter footfall at the new taxi rank = Social / Opportunity trend.',
        'Step 2 (Classify Market Environment): The new R25 competitor is an external Threat in the Market environment, and customers shifting toward cheaper kotas requires a competitive response.',
        'Step 3 (Use Micro Control to Adapt): Sipho buys a gas stove to beat loadshedding, sources a cheaper bread supplier, introduces a smaller R25 kota to match competitor pricing, and moves closer to the new taxi rank to grab the opportunity.'
      ],
      finalAnswer:
        'Effective marketing environment management means adapting rather than complaining: buy a gas stove, switch bread suppliers, launch a R25 kota option, and position near the new taxi rank.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: '3 Marketing Environments (3 marks)',
        question: 'Name the 3 Marketing Environments. (3 marks)',
        answer: '1) Micro Environment, 2) Market Environment, and 3) Macro Environment.'
      },
      {
        number: 2,
        label: 'PESTLE Acronym (6 marks)',
        question: 'What does PESTLE stand for? (6 marks)',
        answer:
          'Political, Economic, Social, Technological, Legal, and Environmental.'
      },
      {
        number: 3,
        label: 'Political Factor Example for a Spaza Shop (2 marks)',
        question: 'Give 1 example of a Political factor affecting a spaza shop. (2 marks)',
        answer:
          'Government bans plastic bags, increases VAT, or introduces new business/health regulations (any 1 relevant political/government policy example).'
      },
      {
        number: 4,
        label: 'Micro vs Macro Environment (4 marks)',
        question: 'Distinguish between the Micro and Macro Environment. (4 marks)',
        answer:
          'Micro Environment = internal forces inside the business that you control (staff, prices, shop cleanliness, suppliers you choose). Macro Environment = external national/global forces outside your control (inflation, laws, loadshedding) to which you must adapt.'
      },
      {
        number: 5,
        label: 'SWOT for a School Vetkoek Business (4 marks)',
        question: 'Do a SWOT for a business selling vetkoek at a school. Give 1 point for each. (4 marks)',
        answer:
          'Strength (S) = Tasty, affordable vetkoek; Weakness (W) = No card machine / small capacity; Opportunity (O) = School has 1,000 learners and no other seller; Threat (T) = School tuckshop opens or ingredient/food prices increase.'
      },
      {
        number: 6,
        label: 'Loadshedding in PESTLE & SWOT (2 marks)',
        question: 'Loadshedding is which PESTLE factor? Is it a Strength or Threat in SWOT? (2 marks)',
        answer:
          'Technological / Environmental factor in PESTLE; and a Threat in SWOT (an external negative factor outside your control).'
      },
      {
        number: 7,
        label: 'Competitor Lowers Price — Environment & Action (3 marks)',
        question: 'Your competitor lowers price. Which environment is this? What do you do? (3 marks)',
        answer:
          'Market Environment. Although you cannot control competitors, you react by matching or lowering price (e.g. smaller budget option), improving quality/service, adding extra value, or attracting new customers.'
      }
    ]
  },
  {
    id: 'ncv-mkt-l2-ch3-consumer-behaviour',
    level: 2,
    chapterNumber: 3,
    chapterLabel: 'Level 2 • Chapter 3',
    displayHeading: 'Level 2 — Chapter 3: Consumer Behaviour — Why Customers Buy',
    title: 'Consumer Behaviour — Why Customers Buy',
    subtitle: 'Level 2 - NCV Marketing (Nexovian Original Series)',
    sections: [
      {
        heading: 'Why Customers Buy & The 5 Steps of the Buying Decision (In Order)',
        paragraphs: [
          'If you do not understand WHY customers buy, you will never sell successfully. Customers do not simply buy a physical product — they buy a FEELING, a SOLUTION, and a STATUS.',
          'South African Examples: Nobody spends R2,500 on Nike sneakers just to cover their feet — they buy to feel confident, look successful, and belong to the group. Nobody buys a kota only for bread — they buy because they are hungry, want great taste, want to get full fast, and want to fit in with friends.',
          'Word-of-Mouth Golden Rule: 1 Happy customer = 5 new customers. 1 Angry customer = 10 lost customers.'
        ],
        bullets: [
          'Step 1 — Need Recognition ("I have a problem"): The customer realises they need something (hungry -> food; hair messy -> salon; phone broken -> new phone). Triggered Internally (hunger) or Externally (seeing a friend’s new shoes or a TikTok ad).',
          'Step 2 — Information Search ("Where can I get it?"): Internal search (memory: "Last time I bought a kota at Sipho’s, it was nice") + External search (asking friends, Google, TikTok, checking prices, looking at shop windows). If your business is not visible on TikTok and WhatsApp Status, you miss buyers.',
          'Step 3 — Evaluation of Alternatives ("Which one is best?"): Customer compares Price (R30 vs R50), Quality (tasty vs not tasty), Location (near vs far), Brand (known vs unknown), and Service (friendly vs rude) — picking BEST VALUE, not always the cheapest.',
          'Step 4 — Purchase Decision ("I buy it"): Customer decides to buy, though 2 factors can still stop the sale at the last minute: (a) Other people’s negative opinion ("Don’t buy there, they are dirty") and (b) Unexpected situations (sudden price hike, shop closed, loadshedding, no cash or no card machine).',
          'Step 5 — Post-Purchase Behaviour ("Am I happy?") [MOST IMPORTANT FOR LEVEL 2]: Satisfied buyers return, tell friends, and post on WhatsApp Status (= FREE marketing). Dissatisfied buyers never come back, tell 10 people, and post bad reviews (= 10 lost customers).'
        ],
        formulaBlock: `THE 5 BUYING STEPS (LEARN IN ORDER):
1. Need Recognition  ->  2. Information Search  ->  3. Evaluation of Alternatives  ->  4. Purchase Decision  ->  5. Post-Purchase Behaviour`
      },
      {
        heading: '4 Factors Influencing Buying, Maslow’s Hierarchy & Buying Behaviour Types',
        paragraphs: [
          'Four major forces shape every purchase decision in South Africa — Cultural Factors (biggest in SA), Social Factors, Personal Factors, and Psychological Factors.',
          'Maslow’s Hierarchy of Needs in Marketing: Customers satisfy needs from BOTTOM to TOP — sell at the exact level your customer is currently on. A hungry person cares about food first, not luxury status; a wealthy buyer often cares more about status than saving a few rand.'
        ],
        bullets: [
          '1. Cultural Factors (Biggest in SA): Culture, religion, and tradition (e.g. Muslim buyers avoid pork kotas; Zulu weddings require traditional food; December boosts new clothing sales).',
          '2. Social Factors: Family (mom decides household food), Friends / Reference Groups (if friends wear Nike, you want Nike), and Role & Status (a teacher wants a professional look; a student wants to look cool).',
          '3. Personal Factors: Age (15-year-old buys TikTok trends vs 50-year-old buys comfort), Income (R500 vs R20,000 salary changes choices), Lifestyle (gym-goers buy healthy food vs party-goers buy alcohol), and Occupation (builder buys strong boots vs office worker buys formal shoes).',
          '4. Psychological Factors: Motivation (hunger, thirst, safety, status), Perception (if a shop looks dirty, customers assume the food is dirty even when it is clean), Learning (one bad kota teaches the buyer never to return), and Attitudes & Beliefs ("Shoprite is cheap", "Woolworths is quality" — hard to change).',
          'Maslow’s 5 Levels (Bottom to Top): (1) Physiological (food, water, sleep — kota), (2) Safety (safe house, medical aid, insurance), (3) Social / Belonging (friends, love, matching clothes), (4) Esteem (respect & status — iPhone, Nike, car), (5) Self-Actualisation (becoming your best — university, starting a business, personal growth).',
          '4 Types of Buying Behaviour: Complex (expensive, rare, high risk, lots of research — car, house, laptop); Habitual (cheap, everyday, little thinking — bread, kota, airtime); Variety-Seeking (bored, wants change — new chips flavour or new kota shop); Dissonance-Reducing (expensive with similar brands, worries afterwards — buying a fridge and wondering "Did I choose wrong?").'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Consumer Behaviour',
        definition: 'Study of how and why customers choose, buy, use, and feel about products and services.'
      },
      {
        term: 'Need Recognition',
        definition: 'First buying step where the customer realises they have an unsatisfied problem or need.'
      },
      {
        term: 'Information Search',
        definition: 'Second buying step where the customer searches memory, friends, TikTok, or shops for options.'
      },
      {
        term: 'Evaluation',
        definition: 'Comparing competing options on price, quality, location, brand, and service to find best value.'
      },
      {
        term: 'Purchase Decision',
        definition: 'Step where the buyer selects and buys a product unless stopped by opinions or unexpected barriers.'
      },
      {
        term: 'Post-Purchase',
        definition: 'Step after buying where the customer feels satisfied or dissatisfied — driving loyalty or lost sales.'
      },
      {
        term: 'Cultural Factors',
        definition: 'Shared culture, religion, and traditions shaping what customers buy or avoid.'
      },
      {
        term: 'Social Factors',
        definition: 'Influence from family, friends/reference groups, and a buyer’s social role and status.'
      },
      {
        term: 'Personal Factors',
        definition: 'Individual traits including age, income, lifestyle, and occupation.'
      },
      {
        term: 'Psychological Factors',
        definition: 'Internal mental drivers: motivation, perception, learning, and attitudes & beliefs.'
      },
      {
        term: 'Maslow',
        definition: '5-level hierarchy of human needs from Physiological (food) up to Self-Actualisation.'
      },
      {
        term: 'Customer Satisfaction',
        definition: 'How pleased a customer feels after buying compared against what they expected.'
      },
      {
        term: 'Word of Mouth',
        definition: 'Customers telling others about their experience — creating free positive marketing or damaging losses.'
      }
    ],
    workedExample: {
      title: 'Lerato Buys Braids — The 5 Buying Decision Steps in Action',
      scenario:
        'Lerato’s hair is messy before a Saturday wedding. Compare how she moves through all 5 steps across Salon A (R400, far, rude), Salon B (R300, near taxi rank, good reviews, friendly), and Salon C (R250, cheap, dirty photos).',
      formulaBlock: `1. Need:          Hair messy + wedding on Saturday -> needs to look confident
2. Search:        Asks friends, checks TikTok, WhatsApps 3 salons for prices
3. Evaluation:    Salon A (R400, far, rude) vs Salon B (R300, near taxi rank, friendly) vs Salon C (R250, dirty photos)
4. Purchase:      Picks Salon B -> BEST VALUE (not the cheapest!)
5. Post-Purchase: Happy -> posts photo, tags salon -> 5 friends book FREE!`,
      steps: [
        'Step 1 (Need & Search): Lerato recognises her need for wedding braids and searches externally via friends, TikTok, and WhatsApp messages to 3 salons.',
        'Step 2 (Evaluation & Purchase): She compares price, distance, hygiene, and service, choosing Salon B at R300 (best overall value rather than the cheapest R250 Salon C).',
        'Step 3 (Post-Purchase Multiplier): Happy with her braids, she posts a photo tagging Salon B, bringing 5 new friends for free (whereas a rude experience would have triggered a bad review and lost 10 customers).'
      ],
      finalAnswer:
        'Great marketing sells confidence for the wedding, a friendly experience, and a post-purchase follow-up ("How is your hair?") — turning one R300 customer into 5 free new bookings.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: '5 Steps of Buying Decision in Order (5 marks)',
        question: 'List the 5 steps of the Buying Decision in order. (5 marks)',
        answer:
          '1. Need Recognition, 2. Information Search, 3. Evaluation of Alternatives, 4. Purchase Decision, 5. Post-Purchase Behaviour.'
      },
      {
        number: 2,
        label: 'Barriers at Purchase Decision Stage (2 marks)',
        question: 'What can stop a customer at the Purchase Decision stage? Give 2 factors. (2 marks)',
        answer:
          '1) Another person’s negative opinion (e.g. a friend warning the shop is dirty), and 2) An unexpected situation (e.g. sudden price increase, shop closed, loadshedding, no cash or no card machine).'
      },
      {
        number: 3,
        label: 'Why Post-Purchase Behaviour Matters Most (3 marks)',
        question: 'Why is Post-Purchase Behaviour considered the most important step? (3 marks)',
        answer:
          'A satisfied customer comes back and tells friends (generating up to 5 new customers via free word-of-mouth), while a dissatisfied customer never returns and tells about 10 people, costing the business future sales.'
      },
      {
        number: 4,
        label: '4 Buying Influence Examples (4 marks)',
        question: 'Give 1 example each of a Cultural, Social, Personal, and Psychological factor. (4 marks)',
        answer:
          'Cultural = A Muslim customer will not buy pork. Social = Friends wearing Nike encourage you to buy Nike. Personal = Low income leads to choosing cheaper products. Psychological = Seeing a dirty shop makes a customer perceive the food as dirty.'
      },
      {
        number: 5,
        label: 'Maslow Levels: Kota vs iPhone (2 marks)',
        question: 'Maslow: A hungry person buys a kota — which level is this? A person buys an iPhone to show status — which level? (2 marks)',
        answer:
          'Buying a kota when hungry = Level 1: Physiological need. Buying an iPhone for status = Level 4: Esteem need.'
      },
      {
        number: 6,
        label: 'Habitual vs Complex Buying (4 marks)',
        question: 'Distinguish between Habitual and Complex buying behaviour. Give 1 example of each. (4 marks)',
        answer:
          'Habitual buying is cheap, everyday purchasing with almost no research or thinking (e.g. bread, airtime, a regular kota). Complex buying is expensive, rare, and high-risk with heavy research beforehand (e.g. a car, laptop, or house).'
      },
      {
        number: 7,
        label: 'One-Time Buyer Fix (3 marks)',
        question: 'Your customer buys once and never returns. Which step failed and what do you do? (3 marks)',
        answer:
          'Post-Purchase Behaviour failed because the customer left dissatisfied. Ask for feedback, apologise sincerely, fix the quality or service issue, improve standards, and offer a return incentive/discount.'
      }
    ]
  },
  {
    id: 'ncv-mkt-l2-ch4-stp-segmentation-targeting-positioning',
    level: 2,
    chapterNumber: 4,
    chapterLabel: 'Level 2 • Chapter 4',
    displayHeading: 'Level 2 — Chapter 4: Market Segmentation, Targeting & Positioning — STP',
    title: 'Market Segmentation, Targeting & Positioning — STP',
    subtitle: 'Level 2 - NCV Marketing (Nexovian Original Series)',
    sections: [
      {
        heading: 'STP Step 1 & Step 2: Market Segmentation (4 Bases) & Targeting Strategies',
        paragraphs: [
          'The biggest mistake in business is trying to sell to EVERYONE. If you sell to everyone, you sell to NO ONE. Saying your kota customers are "everyone who is hungry" is far too broad. A smart marketer narrows it down: "Learners at Soshanguve High, 15–19 years, R30 budget, who want a fast, tasty, spicy kota at break time." Once you define that group, you know exactly what to make, what price to charge, where to trade, and how to advertise. That framework is STP: Segmentation -> Targeting -> Positioning.',
          'Step 1 — SEGMENTATION divides the big market into smaller groups with similar needs using 4 bases (Geographic, Demographic, Psychographic, Behavioural). Step 2 — TARGETING chooses the 1 or 2 most profitable segments to serve, checking that the target market is Measurable, Accessible, Substantial (big enough), and Actionable.'
        ],
        bullets: [
          'Base 1 — Geographic Segmentation (WHERE they live): Province (Gauteng vs Limpopo), city or township (Soshanguve vs Centurion vs Sandton), urban vs rural (e.g. coffee shops thrive in Centurion; kota shops thrive in Soshanguve).',
          'Base 2 — Demographic Segmentation (WHO they are — exam favourite): Age (15–19, 20–30, 31–50), Gender, Income (R0–R2,000 vs R2,000–R10,000 vs R10,000+), Education, Family size, and Occupation (learner, teacher, taxi driver). Example: baby clothes -> mothers 20–35; energy drink -> young males 15–25.',
          'Base 3 — Psychographic Segmentation (HOW they live / THINK): Lifestyle (gym people, party people, church people, gamers), Personality (trendy, traditional, adventurous), Values (healthy, religious, eco-friendly). Example: gym-goers want a low-fat healthy kota; party-goers want a late-night kota after groove.',
          'Base 4 — Behavioural Segmentation (HOW they BUY): Usage (heavy everyday buyer vs light once-a-month buyer), Loyalty (sticks to one shop vs always switches), Occasion (lunch, party, wedding, December), Benefits sought (cheap, fast, tasty, healthy, status).',
          'Targeting Strategy 1 — Undifferentiated / Mass Marketing: ONE product, one price, one advert for all (e.g. sugar, salt, bread, Coca-Cola). Simple and cheap, but focused rivals can out-compete you.',
          'Targeting Strategy 2 — Differentiated Marketing: DIFFERENT products for DIFFERENT segments (e.g. Nike makes running, basketball, and fashion shoes; a kota shop offers R25 small kotas for learners, R50 big kotas for workers, and R70 healthy kotas for gym-goers). Higher sales, higher operating cost.',
          'Targeting Strategy 3 — Concentrated / Niche Marketing [BEST FOR SMALL SA BUSINESS]: ONE product for ONE small group (e.g. salon only for natural hair, shop only for plus-size clothes, kota shop only for students). You become the expert with strong loyalty and less competition — though risky if that niche stops buying.',
          '4 Rules of a Good Target Market: Measurable (can count 500 school learners), Accessible (reachable near the gate / on TikTok), Substantial / Big Enough (500 customers > 10 customers), Actionable (you have the money, skills, and stock to serve them).'
        ],
        formulaBlock: `STP FRAMEWORK:
S (Segmentation: 4 Bases)  ->  T (Targeting: Mass / Differentiated / Niche)  ->  P (Positioning: Mind Share)`
      },
      {
        heading: 'STP Step 3: Positioning, Positioning Statement Formula & Positioning Map',
        paragraphs: [
          'Positioning is NOT what you claim about yourself — it is how customers SEE and remember your business in their mind compared to competitors. Think of South African brands: Shoprite = "Cheap, low price"; Woolworths = "Quality, expensive, fresh"; KFC = "Tasty, fast, family". If you fail to actively position your kota shop, customers will automatically label it "cheap and dirty".',
          'Positioning Map (Price vs Quality): Draw Price (Cheap vs Expensive) on one axis and Quality (Low vs High) on the other. Shoprite sits at Cheap + Lower Frills; Woolworths sits at Expensive + High Quality. The big market GAP is Cheap + High Quality — delivering good quality at an affordable price is a huge opportunity to win customers.'
        ],
        bullets: [
          'Positioning Statement Formula (Exam Favourite): For [Target Market], [Your Business] is [What makes you different] because [Reason to believe].',
          'Applied Kota Shop Statement: "For learners in Soshanguve, Sipho’s Kotas is the fastest, tastiest R25 kota at break time because we cook fresh every 10 minutes near the school gate."'
        ],
        formulaBlock: `POSITIONING STATEMENT FORMULA:
For [Target Market], [Your Business] is [What makes you different] because [Reason to believe].`
      }
    ],
    keyTerms: [
      {
        term: 'Segmentation',
        definition: 'Dividing a large, mixed market into smaller groups of customers with similar needs or traits.'
      },
      {
        term: 'Targeting',
        definition: 'Evaluating market segments and selecting which specific group(s) the business will serve.'
      },
      {
        term: 'Positioning',
        definition: 'How customers perceive and remember your business in their minds compared against competitors.'
      },
      {
        term: 'STP',
        definition: 'Core marketing strategy sequence: Segmentation -> Targeting -> Positioning.'
      },
      {
        term: 'Geographic',
        definition: 'Segmenting buyers by where they live or trade (province, township, suburb, urban vs rural).'
      },
      {
        term: 'Demographic',
        definition: 'Segmenting buyers by who they are — age, gender, income, education, family size, and occupation.'
      },
      {
        term: 'Psychographic',
        definition: 'Segmenting buyers by lifestyle, personality, and personal or cultural values.'
      },
      {
        term: 'Behavioural',
        definition: 'Segmenting buyers by purchasing habits — usage rate, brand loyalty, occasion, and benefits sought.'
      },
      {
        term: 'Mass Marketing',
        definition: 'Undifferentiated strategy offering one standardised product, price, and advert to everyone.'
      },
      {
        term: 'Differentiated Marketing',
        definition: 'Targeting multiple segments with tailored products, prices, and marketing for each group.'
      },
      {
        term: 'Niche / Concentrated',
        definition: 'Focusing exclusively on serving one small, well-defined customer group better than anyone else.'
      },
      {
        term: 'Positioning Statement',
        definition: 'Structured sentence defining target market, business, key difference, and proof: For [Target], [Business] is [Difference] because [Reason].'
      }
    ],
    workedExample: {
      title: 'Thandi’s Salon in Soshanguve — Complete STP Strategy',
      scenario:
        'Instead of advertising haircuts and styles to men, children, pensioners, and youth all at once, Thandi applies Segmentation, Targeting, and Positioning to grow her Soshanguve salon.',
      formulaBlock: `SEGMENTATION: Geo (Soshanguve taxi rank) | Demo (Females 16–30, R1,000–R3,000) | Psycho (Trendy, TikTok) | Behav (Braids every 3–4 wks, fast)
TARGETING:    Concentrated / Niche -> Young females 16–30 wanting R250–R350 trendy braids (NOT old-lady or men’s cuts)
POSITIONING:  "For young girls in Soshanguve, Thandi’s is the trendiest, fastest braids on TikTok because we do latest styles in 2 hours for R250."`,
      steps: [
        'Step 1 (Segmentation): Thandi defines her market across all 4 bases — Geographic (Soshanguve near the taxi rank), Demographic (females aged 16–30 earning R1,000–R3,000), Psychographic (trendy TikTok followers preparing for groove/weddings), and Behavioural (re-braid every 3–4 weeks and value fast service).',
        'Step 2 (Targeting — Concentrated / Niche): Rather than competing with big all-service salons, she targets ONLY females 16–30 wanting trendy R250–R350 braids and skips men’s and senior cuts.',
        'Step 3 (Positioning): She owns a clear mental space with her Positioning Statement: "For young girls in Soshanguve, Thandi’s is the trendiest, fastest braids on TikTok because we do latest styles in 2 hours for R250."'
      ],
      finalAnswer:
        'By owning a focused niche and sharp positioning rather than chasing everyone, Thandi avoids head-on competition with big salons and secures loyal monthly bookings.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Explain STP in One Sentence Each (3 marks)',
        question: 'What is STP? Explain each step in one sentence. (3 marks)',
        answer:
          'Segmentation = Dividing a large market into smaller groups with similar needs. Targeting = Choosing which group(s) the business will focus on serving. Positioning = Shaping how customers see your business in their minds compared to competitors.'
      },
      {
        number: 2,
        label: '4 Bases of Segmentation + Examples (8 marks)',
        question: 'Name the 4 bases of segmentation and give 1 example of each. (8 marks)',
        answer:
          '1) Geographic = Where customers live (e.g. Soshanguve vs Centurion). 2) Demographic = Who they are (e.g. age 15–19, income R2,000). 3) Psychographic = Lifestyle and values (e.g. gym-goers vs church/party-goers). 4) Behavioural = How they buy (e.g. everyday heavy user vs once-a-month buyer).'
      },
      {
        number: 3,
        label: 'Mass vs Differentiated vs Niche Marketing (6 marks)',
        question: 'Distinguish between Mass, Differentiated, and Niche marketing. (6 marks)',
        answer:
          'Mass (Undifferentiated) = One product for everyone (e.g. sugar or salt). Differentiated = Different tailored products for different segments (e.g. Nike shoes for runners and basketball players). Niche (Concentrated) = One specialised product for one small group (e.g. a salon exclusively for natural hair).'
      },
      {
        number: 4,
        label: '4 Criteria for a Good Target Market (4 marks)',
        question: 'What makes a good target market? List all 4 criteria. (4 marks)',
        answer: '1) Measurable, 2) Accessible, 3) Substantial (big enough), and 4) Actionable.'
      },
      {
        number: 5,
        label: 'Positioning Statement for Taxi Drivers (3 marks)',
        question: 'Write a Positioning Statement for a kota shop selling to taxi drivers. (3 marks)',
        answer:
          'For taxi drivers in Centurion, Sipho’s Kotas is the biggest, fastest R35 kota because we prepare and serve hot orders in 3 minutes right at the rank. (Any answer following For [Target], [Business] is [Difference] because [Reason] earns full marks).'
      },
      {
        number: 6,
        label: 'Why Selling to Everyone Fails (2 marks)',
        question: 'A business tries to sell to everyone. Why will it fail? (2 marks)',
        answer:
          'Different customers have different needs, tastes, and budgets. Trying to please everyone pleases no one, and focused competitors targeting specific niches better will beat you.'
      },
      {
        number: 7,
        label: 'Positioning Map Gap: Shoprite vs Woolworths (2 marks)',
        question: 'Shoprite is positioned as cheap and Woolworths as high quality. Where is the gap? (2 marks)',
        answer:
          'Cheap + High Quality — delivering reliable good quality at a low, affordable price is the open positioning gap.'
      }
    ]
  },
  {
    id: 'ncv-mkt-l2-ch5-marketing-mix-4ps-7ps',
    level: 2,
    chapterNumber: 5,
    chapterLabel: 'Level 2 • Chapter 5',
    displayHeading: 'Level 2 — Chapter 5: The Marketing Mix — 4Ps / 7Ps',
    title: 'The Marketing Mix — 4Ps / 7Ps',
    subtitle: 'Level 2 - NCV Marketing (Nexovian Original Series)',
    sections: [
      {
        heading: 'The 4Ps (For Products): Product, Price, Place & Promotion',
        paragraphs: [
          'Once STP defines WHO to sell to, the Marketing Mix defines HOW to sell to them. The Marketing Mix consists of the controllable tools you adjust to make target customers buy: the 4Ps apply to physical products, while services (like a salon, taxi, or tutoring) expand into the 7Ps because services cannot be touched or stored.',
          'Price is the ONLY P that brings money into the business — all the other Ps cost money. Setting price too high means nobody buys; setting it too low kills profit and signals poor quality; setting the right price balances customer value with healthy profit.'
        ],
        bullets: [
          '1. PRODUCT (What you sell — the full package): Quality (tasty, fresh, strong), Features (size, flavour, colour, ingredients), Packaging (clean, attractive, easy to carry), Branding (name & logo like "Sipho’s Kotas" vs unbranded), Variety (chicken, beef, cheese, spicy, healthy), and After-sales guarantee (replace/fix if bad).',
          'Product Levels (Exam Favourite): Core Product = real benefit bought ("I am full fast" / confidence from braids); Actual Product = physical item (kota with bread, chicken, chips, sauce in a packet); Augmented Product = free extras (extra sauce, free delivery, friendly service, loyalty card).',
          'Product Life Cycle (PLC): (1) Introduction (new, low sales, heavy ad cost, loss — e.g. new chips flavour), (2) Growth (sales & profit surge, rivals copy), (3) Maturity (peak flat sales, toughest rivalry — cut price or innovate flavour to survive), (4) Decline (sales drop as buyers move on — discontinue or reinvent).',
          '2. PRICE (Pricing Strategies): Penetration (start low to win buyers fast — R20 kota for 1 month, then R30); Skimming (start high then cut — R25,000 iPhone dropping to R15,000 after 1 year); Competitive (match rivals at R30); Cost-Plus (R15 cost + R10 profit = R25 — simplest for small businesses); Psychological (R99.99 / R29.99 feels cheaper than R100 / R30).',
          '3. PLACE / Distribution (Where & how buyers get it): Direct (no middleman — sell at your own stall for higher margin but more work) vs Indirect (supply spaza shops — lower unit profit but wider reach). Channels: shop, street stall, WhatsApp orders, TikTok Shop, school gate, taxi rank. Always locate where your target market already moves.',
          '4. PROMOTION (How you communicate & convince): Paid Advertising (TV, radio, Facebook, TikTok, posters, flyers), Sales Promotion (discounts, Buy 1 Get 1 Free, free sauce, "Buy 5, get 1 free" loyalty card), Personal Selling (face-to-face persuasion), Public Relations / PR (free newspaper feature, sponsoring school soccer team), and Direct Marketing (WhatsApp broadcast, SMS specials, calls). Rule: Always sell the BENEFIT ("Hot, fresh kota in 3 minutes for R25 at the rank — no queue").'
        ],
        formulaBlock: `PRICING FORMULAS:
Selling Price = Cost + Mark-up (Profit)
Profit        = Selling Price - Cost`
      },
      {
        heading: 'The Extra 3Ps (For Services = 7Ps): People, Process & Physical Evidence',
        paragraphs: [
          'Because services are intangible — you cannot hold a haircut before buying it or store an empty taxi seat for tomorrow — customers judge quality through three extra service Ps: People, Process, and Physical Evidence.',
          'Think of a hair salon: rude staff scrolling on phones while braiding kills the business (People), a 30-minute disorganised wait drives customers away (Process), and hair left all over a dirty floor convinces buyers you will ruin their hair (Physical Evidence).'
        ],
        bullets: [
          '5. PEOPLE (Who serves the customer): Staff attitude IS the product — friendly, skilled, punctual, wearing a clean uniform, and speaking the customer’s language. Rude staff destroy sales even when the product is great.',
          '6. PROCESS (How the service is delivered): Smooth, fast, simple steps — e.g. Order on WhatsApp -> Pay via cash or Yoco -> Collect in 2–3 minutes instead of standing in a slow 30-minute queue.',
          '7. PHYSICAL EVIDENCE (Visible proof that builds trust): Clean shop, appealing decor, neat staff uniform, clear price list on the wall, certificates, genuine photos/reviews on TikTok and WhatsApp Status, and a clean toilet.'
        ],
        formulaBlock: `PRODUCT vs SERVICE MIX:
• 4Ps (Products): Product + Price + Place + Promotion
• 7Ps (Services): 4Ps + People + Process + Physical Evidence`
      }
    ],
    keyTerms: [
      {
        term: 'Marketing Mix',
        definition: 'The controllable set of marketing tools (4Ps / 7Ps) a business uses to persuade customers to buy.'
      },
      {
        term: '4Ps',
        definition: 'Core product marketing mix elements: Product, Price, Place, and Promotion.'
      },
      {
        term: '7Ps',
        definition: 'Extended service marketing mix adding People, Process, and Physical Evidence to the 4Ps.'
      },
      {
        term: 'Core Product',
        definition: 'The underlying benefit or problem-solver the customer actually buys (e.g. hunger solved or confidence).'
      },
      {
        term: 'Actual Product',
        definition: 'The tangible physical product or core service delivered (e.g. kota with chips and chicken, or braids).'
      },
      {
        term: 'Augmented Product',
        definition: 'Added extras beyond expectation such as free extra sauce, loyalty cards, free tea, or guarantees.'
      },
      {
        term: 'PLC',
        definition: 'Product Life Cycle tracking sales through four stages: Introduction, Growth, Maturity, and Decline.'
      },
      {
        term: 'Penetration Pricing',
        definition: 'Launching with a low introductory price to attract many customers quickly before raising it later.'
      },
      {
        term: 'Skimming',
        definition: 'Starting at a high launch price for early buyers and gradually lowering the price over time.'
      },
      {
        term: 'Cost-Plus',
        definition: 'Simple pricing method adding a chosen profit mark-up onto production cost (Cost + Profit = Price).'
      },
      {
        term: 'Place / Distribution',
        definition: 'Channels and locations used to make the product conveniently available to target buyers.'
      },
      {
        term: 'Promotion',
        definition: 'Communication tools (advertising, sales promotion, personal selling, PR, direct marketing) highlighting customer benefits.'
      },
      {
        term: 'People',
        definition: 'Staff and owners interacting with customers — skill, friendliness, punctuality, language, and neatness.'
      },
      {
        term: 'Process',
        definition: 'Customer-facing steps and speed from ordering and payment through final delivery.'
      },
      {
        term: 'Physical Evidence',
        definition: 'Tangible clues customers inspect to trust a service — cleanliness, signage, price boards, uniforms, and reviews.'
      }
    ],
    workedExample: {
      title: 'Sipho’s Kota Shop — Complete 7Ps Strategy',
      scenario:
        'Sipho builds a complete 7Ps marketing mix for his Soshanguve kota business so customers happily pay R30 and keep coming back.',
      formulaBlock: `• Product:           Big fresh kota (chicken/beef) + free extra sauce + loyalty card
• Price:             R30 (Cost R18 + Profit R12); Week 1 Penetration = R20 for learners
• Place:             Direct at school gate + taxi rank + WhatsApp pre-orders
• Promotion:         TikTok "Hot kota in 3 min", school poster, Buy 5 Get 1 Free, WhatsApp broadcast
• People:            Sipho + 1 helper, friendly, clean aprons, speaks Sepedi + English
• Process:           WhatsApp order -> Cash/Yoco payment -> Ready in 3 min (no queue)
• Physical Evidence: Clean stall, big wall price list, kota photos, 5-star reviews, clean gloves`,
      steps: [
        'Step 1 (4Ps Product Alignment): Sipho combines a quality fresh kota with augmented perks (free extra sauce + loyalty card), sets cost-plus R30 pricing (R18 cost + R12 profit) after a R20 penetration launch week, sells direct at the school gate and taxi rank, and promotes benefits via TikTok, posters, and WhatsApp.',
        'Step 2 (Extra 3Ps Service Excellence): He pairs Sepedi and English friendly staff in clean aprons (People) with a 3-minute WhatsApp + Yoco ordering workflow (Process) and spotless gloves, big menu pricing, and 5-star reviews (Physical Evidence).',
        'Step 3 (Total Customer Experience): Every P reinforces the same promise — fast, clean, high-value kotas worth R30.'
      ],
      finalAnswer:
        'Customers do not buy only bread and chips — they buy a complete, trustworthy 7Ps experience that turns first-time buyers into loyal regulars.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'List 4Ps + Extra 3Ps for Services (7 marks)',
        question: 'List the 4Ps and the extra 3Ps used for services. (7 marks)',
        answer:
          '4Ps: Product, Price, Place, Promotion. Extra 3Ps for services: People, Process, Physical Evidence.'
      },
      {
        number: 2,
        label: 'Core vs Actual vs Augmented Haircut/Braids (6 marks)',
        question: 'Explain Core vs Actual vs Augmented product using a haircut or braids. (6 marks)',
        answer:
          'Core Product = Confidence and looking good. Actual Product = The haircut or braids performed. Augmented Product = Free tea, friendly conversation, a follow-up check-in message, and a guarantee to fix any issue.'
      },
      {
        number: 3,
        label: 'Cost-Plus Price Calculation (2 marks)',
        question: 'Calculate: A kota costs R18 to make and Sipho wants R12 profit. What is the selling price? (2 marks)',
        answer: 'Selling Price = Cost + Profit = R18 + R12 = R30.'
      },
      {
        number: 4,
        label: 'Penetration vs Skimming Pricing + Examples (4 marks)',
        question: 'Distinguish between Penetration and Skimming pricing. Give 1 example of each. (4 marks)',
        answer:
          'Penetration Pricing = Starting with a low price to attract many buyers fast (e.g. launching a new kota at R20 before raising to R30). Skimming = Starting with a high price and lowering it later (e.g. a new iPhone launching at R25,000 and dropping later).'
      },
      {
        number: 5,
        label: '4 Stages of Product Life Cycle (4 marks)',
        question: 'Name the 4 stages of the Product Life Cycle (PLC). (4 marks)',
        answer: '1. Introduction, 2. Growth, 3. Maturity, and 4. Decline.'
      },
      {
        number: 6,
        label: 'Diagnosing Failing Service Ps (2 marks)',
        question: 'A salon has rude staff and a dirty floor. Which 2 Ps are failing? (2 marks)',
        answer: 'People (rude staff) and Physical Evidence (dirty floor).'
      },
      {
        number: 7,
        label: 'Promotion Mix Examples (4 marks)',
        question: 'Give 1 example each of Advertising, Sales Promotion, Personal Selling, and PR. (4 marks)',
        answer:
          'Advertising = Paid TikTok video or printed poster. Sales Promotion = Buy 1 Get 1 Free or Buy 5 Get 1 Free card. Personal Selling = Face-to-face recommendation ("Try our fresh kota"). PR = Sponsoring a local school soccer team or getting a free newspaper story.'
      },
      {
        number: 8,
        label: 'Why Place Matters (2 marks)',
        question: 'Why is Place (Distribution) important in the Marketing Mix? (2 marks)',
        answer:
          'Your business must be conveniently located where your target market already is (such as a school gate or taxi rank). If customers must walk too far or wait too long, they will not buy even if the product is good.'
      }
    ]
  },
  {
    id: 'ncv-mkt-l2-ch6-branding-packaging-labelling',
    level: 2,
    chapterNumber: 6,
    chapterLabel: 'Level 2 • Chapter 6',
    displayHeading: 'Level 2 — Chapter 6: Branding, Packaging & Labelling',
    title: 'Branding, Packaging & Labelling',
    subtitle: 'Level 2 - NCV Marketing (Nexovian Original Series)',
    sections: [
      {
        heading: 'Branding — Building Recognition, Trust, Loyalty & Brand Equity',
        paragraphs: [
          'Picture two kota stalls charging the same R30 for the same kota: one has no name and serves food in a plain plastic bag, while the other is called "Sipho’s Kotas — Taste of Soshanguve" with a clean box, sharp logo, and 10k TikTok followers. Customers pick the branded stall every single time.',
          'Branding is what people say about your business when you are not in the room. A logo is only a symbol; a Brand is the complete feeling and reputation. Brand Equity is the financial value of that name — if you sold your business tomorrow, a loved brand makes it worth far more (just as Coca-Cola’s name alone is worth billions even without counting its factories).'
        ],
        bullets: [
          'Brand Elements: Brand Name ("Sipho’s Kotas", "Nike", "Shoprite"); Brand Mark / Logo (Nike tick, Apple apple, KFC Colonel); Slogan (short promise — "Just Do It", "Finger Lickin’ Good", "Hot in 3 Minutes"); Brand Image (Woolworths = Quality, Shoprite = Cheap).',
          '4 Reasons Branding Matters: (1) Recognition — instant memory from logo; (2) Trust — branded feels safe while unbranded feels risky; (3) Loyalty — customers pay more (R2,500 Nike vs R300 unbranded shoe with similar materials); (4) Differentiation — separates you from 5 nearby kota stalls so buyers choose YOU even at R5 more.',
          'Small-Business Brand Building in SA: Stay Consistent (same name, colours, quality every time); Guard Quality (one bad kota damages the brand); Tell Your Story ("Started with R500 in Soshanguve, now feeding 200 learners daily"); Stay Visible (same logo across WhatsApp Status, TikTok, posters, packaging, and aprons).'
        ]
      },
      {
        heading: 'Packaging (Your Silent Salesman) & Labelling (Consumer Protection Act + Food Law)',
        paragraphs: [
          'Packaging is your silent salesman — it sells when you are not standing next to the shelf. In South Africa, strong packaging must be clean, leak-proof, easy to carry in a taxi, display your name/price/expiry date, and avoid wasteful plastic where possible.',
          'Labelling is the legal and truthful information printed on packaging. Combining Branding + Packaging + Labelling turns one order into free TikTok marketing (e.g. red-and-yellow Sipho’s logo + sturdy leak-proof white box + complete 350g R30 Chicken Kota label with ingredients, gluten allergy note, today’s expiry, Soshanguve address, and phone number).'
        ],
        bullets: [
          '5 Functions of Packaging: (1) Protection (keeps food fresh and uncrushed); (2) Containment (bottle holds juice); (3) Convenience (box with handle or cup with lid, easy to carry and eat); (4) Communication / Information (name, price, ingredients); (5) Promotion / Attraction (colour and design pull buyers off the shelf).',
          '3 Types of Packaging: Primary (touches product directly — kota box, chips packet, juice bottle); Secondary (holds multiple primary units — outer carton of 24 chips packets for a spaza shop); Tertiary (bulk transport — pallets and shipping cartons).',
          '10 Items Required on SA Food Labels (CPA & Food Law): (1) Product Name ("Chicken Kota"), (2) Brand Name ("Sipho’s Kotas"), (3) Ingredients + allergy warning (gluten, egg), (4) Net Weight / Quantity (350g), (5) Expiry / Best Before Date [CRITICAL], (6) Price (R30), (7) Manufacturer Details (name, address, phone for complaints), (8) Storage/Use Instructions ("Keep cold, eat same day"), (9) Barcode, (10) Country of Origin ("Made in South Africa").',
          'Why Labelling Matters: Legal protection (selling unlabelled expired food risks closure/lawsuits under the Consumer Protection Act), Customer Trust (honesty about ingredients), and Marketing appeal ("100% Halal", "Fresh Daily", "No MSG", "Made in Soshanguve").'
        ],
        formulaBlock: `ONE COMPLETE PACKAGE:
Branding (Logo + Slogan)  +  Packaging (Silent Salesman)  +  Labelling (CPA Truth & Expiry)  =  Trust + Higher Sales`
      }
    ],
    keyTerms: [
      {
        term: 'Brand',
        definition: 'What customers say and feel about your business when you are not in the room — overall reputation.'
      },
      {
        term: 'Brand Name',
        definition: 'The spoken name customers remember and ask for (e.g. Sipho’s Kotas, Nike, Shoprite).'
      },
      {
        term: 'Logo / Brand Mark',
        definition: 'The visual symbol representing a brand (e.g. Nike tick or KFC Colonel).'
      },
      {
        term: 'Slogan',
        definition: 'Short memorable promise attached to a brand (e.g. "Just Do It" or "Hot in 3 Minutes").'
      },
      {
        term: 'Brand Image',
        definition: 'What customers currently believe and think about a brand (e.g. quality vs cheap).'
      },
      {
        term: 'Brand Equity',
        definition: 'The commercial financial value of a well-known, trusted brand name itself.'
      },
      {
        term: 'Packaging',
        definition: 'The container and design that protects, contains, informs, offers convenience, and promotes sales.'
      },
      {
        term: 'Primary Packaging',
        definition: 'Packaging layer that touches the product directly (e.g. kota box, chips packet, bottle).'
      },
      {
        term: 'Secondary Packaging',
        definition: 'Outer box or wrap holding several primary packs together (e.g. box of 24 chips packets).'
      },
      {
        term: 'Labelling',
        definition: 'Printed product, ingredient, price, expiry, origin, and contact information on packaging.'
      },
      {
        term: 'Expiry Date',
        definition: 'Mandatory food-safety date showing when a product is no longer safe or fresh to consume.'
      },
      {
        term: 'Consumer Protection Act',
        definition: 'South African law protecting consumers against false claims, unsafe products, and expired goods.'
      }
    ],
    workedExample: {
      title: 'Two Spaza Shops Sell Amagwinya — Plain vs Branded',
      scenario:
        'Shop A and Shop B bake identical amagwinya (vetkoek) every morning, yet Shop B sells five times more and earns a higher price per unit.',
      formulaBlock: `SHOP A (No Brand):     Plain plastic bag, no name, no price, no expiry -> 20/day
SHOP B (Branded):      "Mama’s Amagwinya — Fresh Every Morning" | Logo brown paper bag | R10–R12 + 6am label -> 100/day!`,
      steps: [
        'Step 1 (Shop A — Unbranded Problem): Selling vetkoek in an unmarked plastic bag with no price or expiry makes buyers doubt freshness and hygiene — resulting in only 20 sales per day.',
        'Step 2 (Shop B — Branding, Packaging & Labelling): Naming the product "Mama’s Amagwinya — Fresh Every Morning", packing in clean branded brown paper bags, and printing "Ingredients: Flour, yeast, oil. Made Today 6am. Mama’s, Soshanguve, 082..." builds instant professionalism and trust.',
        'Step 3 (Revenue & Margin Impact): Shop B sells 100 amagwinya per day (5x volume) even when raising price from R10 to R12.'
      ],
      finalAnswer:
        'Identical vetkoek combined with strong Branding, clean Packaging, and honest Labelling produces 5x higher daily sales and stronger profit margins.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Brand Definition & Name vs Logo vs Slogan (4 marks)',
        question: 'Define Brand, and distinguish between Brand Name, Logo, and Slogan. (4 marks)',
        answer:
          'Brand = What people say about you when you are not in the room (feeling + reputation). Brand Name = Spoken name (e.g. Nike). Logo = Visual symbol (e.g. Nike tick). Slogan = Short brand promise (e.g. "Just Do It").'
      },
      {
        number: 2,
        label: '3 Reasons Why Branding Is Important (3 marks)',
        question: 'Give 3 reasons why Branding is important for a business. (3 marks)',
        answer:
          'Any 3: Recognition (customers remember you fast), Trust (branded feels safe vs risky unbranded), Loyalty (customers return and pay more), Differentiation (stands out from rivals), or Brand Equity (raises total business value).'
      },
      {
        number: 3,
        label: '5 Functions of Packaging (5 marks)',
        question: 'List the 5 functions of Packaging. (5 marks)',
        answer:
          '1. Protection, 2. Containment, 3. Convenience, 4. Communication / Information, and 5. Promotion / Attraction.'
      },
      {
        number: 4,
        label: 'Primary vs Secondary Packaging + Examples (4 marks)',
        question: 'Distinguish between Primary and Secondary packaging and give 1 example of each. (4 marks)',
        answer:
          'Primary packaging touches the product directly (e.g. kota box or chips packet). Secondary packaging holds multiple primary packages together (e.g. large box holding 24 chips packets).'
      },
      {
        number: 5,
        label: '6 Mandatory SA Food Label Items (6 marks)',
        question: 'List 6 items that MUST appear on a food label in South Africa. (6 marks)',
        answer:
          'Any 6: Product Name, Brand Name, Ingredients (plus allergens), Net Weight/Quantity, Expiry/Best Before Date, Price, Manufacturer/Contact Details, Storage/Use Instructions, Barcode, and Country of Origin.'
      },
      {
        number: 6,
        label: 'Why Expiry Dates Matter (2 marks)',
        question: 'Why is an Expiry Date important on food packaging? (2 marks)',
        answer:
          'It protects customers from food poisoning, builds buyer trust, and complies with the Consumer Protection Act — selling expired food can result in lawsuits or shop closure.'
      },
      {
        number: 7,
        label: 'Advising Unlabelled Juice Seller (4 marks)',
        question:
          'Your friend sells homemade juice in plain bottles with no label. Advise him using Branding and Labelling. (4 marks)',
        answer:
          'Create a clear brand name, logo, and slogan, pack in clean sealed bottles, and attach a compliant label showing product name, ingredients, expiry date, price, and contact phone number — building trust, repeat recognition, higher pricing power, and legal compliance.'
      }
    ]
  },
  {
    id: 'ncv-mkt-l2-ch7-pricing-and-promotion-in-action',
    level: 2,
    chapterNumber: 7,
    chapterLabel: 'Level 2 • Chapter 7',
    displayHeading: 'Level 2 — Chapter 7: Pricing & Promotion in Action',
    title: 'Pricing & Promotion in Action',
    subtitle: 'Level 2 - NCV Marketing (Nexovian Original Series)',
    sections: [
      {
        heading: 'Part A: Pricing in Action — Fixed/Variable Costs, Cost-Plus & Break-Even Calculations',
        paragraphs: [
          'Chapter 5 introduced the 4Ps theory; Chapter 7 puts Pricing and Promotion into practical South African action with exam-ready calculations. Golden Rule: Price must cover COST + generate PROFIT + make the customer feel real VALUE.',
          'Volume Lesson: Selling 100 kotas when Fixed Costs = R3,500 (Rent R1,000 + Salary R2,000 + Electricity R500) and Variable Cost = R20 per kota (Bread R5 + Chicken R8 + Chips R3 + Sauce R2 + Packaging R2) gives Total Cost = R3,500 + R2,000 = R5,500 -> R55 per kota (far too high!). Selling 500 kotas gives Total Cost = R3,500 + R10,000 = R13,500 -> R27 per kota. Higher sales volume pushes unit cost DOWN and raises profit.'
        ],
        bullets: [
          '1. Cost-Plus Pricing (Easiest for L2): Price = Cost + Mark-up. Example: Kota cost R20 with 50% mark-up -> Mark-up = R20 × 50% = R10 -> Selling Price = R20 + R10 = R30.',
          '2. Break-Even Pricing: Point of NO profit and NO loss where all costs are covered. Example: Fixed R3,500 / (R30 Price - R20 Variable) = 3,500 / 10 = 350 kotas per month to survive (profit starts on the 351st kota).',
          '3. Competitor Pricing: Match rival at R30 (compete on quality/service), undercut at R25 (steal buyers, smaller margin), or charge R35 (only if clearly superior quality).',
          '4. Value-Based Pricing: Based on what customers believe it is worth (R40 at a school gate on a rainy exam day with no rival vs R25 during quiet hours).',
          '6 Factors Affecting Price: Costs, Competitors, Customers (learner R25 vs worker R50), Demand, Government/Law (VAT, minimum wage, bread controls), and Economy (inflation).',
          'Common SA Pricing Mistakes: Underpricing until cash runs out in 2 months; overpricing without value; forgetting hidden costs (transport, airtime, packaging, Yoco fees, spoilage); and forgetting to include YOUR own salary.'
        ],
        formulaBlock: `PRICING & BREAK-EVEN FORMULAS:
Total Cost       = Fixed Costs + (Units × Variable Cost per unit)
Cost per Unit    = Total Cost / Units
Cost-Plus Price  = Cost + Mark-up
Break-Even Units = Fixed Costs / (Selling Price - Variable Cost per unit)`
      },
      {
        heading: 'Part B: Promotion in Action — The 5 Tools, AIDA Model & R80 Small-Business Budget',
        paragraphs: [
          'Promotion gets target customers to KNOW, LIKE, TRUST, and BUY your offering. You do not need R10,000 to promote a South African small business — R80 plus 1 hour per day works (Day 1: free WhatsApp Status photo + price + location; Day 2: free 15-sec TikTok preparation video; Day 3: 50 flyers at the school gate for R50; Day 4: handmade loyalty cards for R30).',
          'AIDA Model (Exam Favourite): Every effective promotion moves customers through Attention -> Interest -> Desire -> Action. Without a clear Action ("WhatsApp, Call, Visit, Order Now"), buyers simply admire the post and scroll past.'
        ],
        bullets: [
          'Tool 1 — Advertising (Paid, Non-Personal): Traditional (taxi-rank poster R50, 500 flyers R200, radio, newspaper) and Digital (free TikTok, WhatsApp Status, Facebook Page, Instagram Reels). Always sell BENEFIT ("Hot kota in 3 min for R25 — No queue at Soshanguve High gate!").',
          'Tool 2 — Sales Promotion (Short-Term Push to Buy Now): Today-only discount (R20), Buy 1 Get 1 Free (BOGOF), Loyalty Card ("Buy 5, Get 1 Free"), Free sample bite, Competition ("Win free kota for a week"), or Combo ("Kota + Juice = R35, save R5").',
          'Tool 3 — Personal Selling (Face-to-Face): Greet -> Ask need -> Show product -> Handle objection ("It is expensive") -> Close ("Shall I make you one?") -> Thank + Follow-up (best for cars, laptops, insurance, braids, or street vending).',
          'Tool 4 — Public Relations / PR (Free Reputation): Sponsor school soccer jerseys, donate to a feeding scheme, or earn a local newspaper feature ("Young entrepreneur feeds 200 learners"). Beware: one viral video of a dirty kitchen destroys trust.',
          'Tool 5 — Direct Marketing (One-to-One): Personal WhatsApp Broadcast ("Hi Lerato, today special R25 kota, reply YES to order"), SMS, calls, emails, or letterbox flyers — personal, but avoid annoying spam.',
          'AIDA Stages: A = Attention ("HOT KOTA R25!" + bright photo); I = Interest ("Fresh chicken, extra cheese, 3 minutes"); D = Desire ("Imagine a hot, tasty kota on a cold day..."); A = Action ("WhatsApp 071... to order NOW — Only 20 left!").'
        ],
        formulaBlock: `AIDA PROMOTION MODEL:
A (Attention: Stop scrolling) -> I (Interest: Make curious) -> D (Desire: Make want it) -> A (Action: Order NOW!)`
      }
    ],
    keyTerms: [
      {
        term: 'Fixed Costs',
        definition: 'Costs a business must pay every month even if zero units are sold (e.g. rent, salaries, electricity).'
      },
      {
        term: 'Variable Costs',
        definition: 'Production costs paid per individual unit sold (e.g. bread, chicken, chips, sauce, packaging).'
      },
      {
        term: 'Total Cost',
        definition: 'Sum of all Fixed Costs plus total Variable Costs for a given output level.'
      },
      {
        term: 'Cost-Plus',
        definition: 'Setting selling price by adding a chosen profit mark-up onto unit cost (Cost + Mark-up = Price).'
      },
      {
        term: 'Mark-up',
        definition: 'The profit amount or percentage added on top of cost to reach the selling price.'
      },
      {
        term: 'Break-Even',
        definition: 'Sales point where total revenue equals total cost — zero profit and zero loss.'
      },
      {
        term: 'Break-Even Units',
        definition: 'Minimum units required to cover all costs: Fixed Costs / (Selling Price - Variable Cost per unit).'
      },
      {
        term: 'Competitor Pricing',
        definition: 'Setting prices at, below, or above rivals based on market comparison and quality.'
      },
      {
        term: 'Value-Based Pricing',
        definition: 'Setting price according to how much value the customer perceives in that moment rather than cost alone.'
      },
      {
        term: 'Advertising',
        definition: 'Paid or broadcast mass communication (posters, flyers, radio, TikTok, WhatsApp Status) highlighting customer benefits.'
      },
      {
        term: 'Sales Promotion',
        definition: 'Short-term incentives (discounts, BOGOF, combos, loyalty cards, samples) designed to trigger immediate purchase.'
      },
      {
        term: 'Personal Selling',
        definition: 'Direct face-to-face selling interaction from greeting and objection handling to closing and follow-up.'
      },
      {
        term: 'Public Relations (PR)',
        definition: 'Earned free community goodwill and publicity from sponsorships, donations, or positive media stories.'
      },
      {
        term: 'Direct Marketing',
        definition: 'Communicating directly with individual named customers via WhatsApp broadcast, SMS, calls, or flyers.'
      },
      {
        term: 'AIDA',
        definition: 'Four-stage promotional sequence: Attention, Interest, Desire, Action.'
      }
    ],
    workedExample: {
      title: 'Sipho’s Kota Shop — Full Pricing + AIDA Promotion Plan',
      scenario:
        'Sipho’s monthly Fixed Costs are Rent R1,000 + Transport R500 = R1,500. Variable Cost per kota is R20 (Bread R5 + Chicken R8 + Chips R3 + Sauce R2 + Box R2) and Selling Price is R30. Calculate break-even, calculate profit at 500 kotas, and map his AIDA promotion plan.',
      formulaBlock: `Break-Even Units = 1,500 / (30 - 20) = 1,500 / 10 = 150 kotas per month
At 500 kotas:
• Revenue    = 500 × R30 = R15,000
• Total Cost = R1,500 + (500 × R20) = R1,500 + R10,000 = R11,500
• Profit     = R15,000 - R11,500 = R3,500 profit`,
      steps: [
        'Step 1 (Break-Even Point): 1,500 / (30 - 20) = 1,500 / 10 = 150 kotas per month needed just to cover all costs.',
        'Step 2 (Profit at 500 Kotas): Total revenue (500 × R30 = R15,000) minus total cost (R1,500 + R10,000 = R11,500) yields R3,500 monthly profit.',
        'Step 3 (AIDA Promotion Execution): Attention = TikTok "R25 KOTA IN SOSHANGUVE — HOTTEST IN 3 MIN!"; Interest = fresh chicken & melting cheese visuals; Desire = "Learners say it is the best kota at the gate"; Action = "WhatsApp 071 123 4567 NOW — Only 50 today!", supported by a Buy 5 Get 1 Free loyalty card and morning WhatsApp Broadcasts.'
      ],
      finalAnswer:
        'Sipho breaks even at 150 kotas, earns R3,500 profit at 500 kotas, and drives repeat daily orders using AIDA, loyalty cards, and morning WhatsApp broadcasts.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Fixed vs Variable Costs + Examples (4 marks)',
        question: 'Distinguish between Fixed and Variable Costs and give 2 examples of each. (4 marks)',
        answer:
          'Fixed Costs must be paid even if zero products are sold (e.g. rent, monthly salaries, electricity). Variable Costs change directly per product made/sold (e.g. bread, chicken, chips, packaging).'
      },
      {
        number: 2,
        label: 'Break-Even Units Calculation (3 marks)',
        question: 'Calculate Break-Even Units: Fixed Costs R2,000, Selling Price R40, Variable Cost R25. (3 marks)',
        answer: 'Break-Even = 2,000 / (40 - 25) = 2,000 / 15 = 133.33 -> 134 units to break even.'
      },
      {
        number: 3,
        label: 'Cost-Plus Selling Price Calculation (3 marks)',
        question: 'Calculate Cost-Plus Selling Price: Cost R25, Mark-up 40%. What is the selling price? (3 marks)',
        answer: 'Mark-up = R25 × 40% = R10. Selling Price = R25 + R10 = R35.'
      },
      {
        number: 4,
        label: 'Explain AIDA Stages (4 marks)',
        question: 'What does AIDA stand for? Explain each stage briefly. (4 marks)',
        answer:
          'Attention = Stop the customer scrolling with a bold hook/photo. Interest = Build curiosity with key product details. Desire = Make them want the benefit emotionally. Action = Tell them clearly how to buy now (WhatsApp, visit, order).'
      },
      {
        number: 5,
        label: '5 Promotion Tools With Examples (5 marks)',
        question: 'Give 1 example each of Advertising, Sales Promotion, Personal Selling, PR, and Direct Marketing. (5 marks)',
        answer:
          'Advertising = TikTok video ad or taxi-rank poster. Sales Promotion = Buy 1 Get 1 Free. Personal Selling = Face-to-face pitch ("Try our fresh kota"). PR = Sponsoring a local school sports team. Direct Marketing = Personal WhatsApp broadcast message.'
      },
      {
        number: 6,
        label: 'Competing Without Cutting Price (3 marks)',
        question:
          'Your competitor sells kotas for R25 while you sell for R35 and customers are leaving. Name 3 actions you can take WITHOUT lowering your price. (3 marks)',
        answer:
          'Any 3: Improve food quality and portions, add extra value (free sauce or drink), deliver faster and friendlier customer service, upgrade branding/packaging, introduce a loyalty card, or move to a more convenient location.'
      },
      {
        number: 7,
        label: 'Loyalty Card vs Permanent Price Cut (2 marks)',
        question: 'Why is "Buy 5 Get 1 Free" better than lowering your price permanently to R25? (2 marks)',
        answer:
          'A loyalty card brings the customer back 5 times, builds a repeat relationship, and protects unit profit margins — whereas cutting price forever destroys profit on every sale.'
      }
    ]
  },
  {
    id: 'ncv-mkt-l2-ch8-distribution-and-retailing',
    level: 2,
    chapterNumber: 8,
    chapterLabel: 'Level 2 • Chapter 8',
    displayHeading: 'Level 2 — Chapter 8: Distribution & Retailing',
    title: 'Distribution & Retailing',
    subtitle: 'Level 2 - NCV Marketing (Nexovian Original Series)',
    sections: [
      {
        heading: 'The Distribution Chain & 3 Channel Levels (Direct vs Indirect)',
        paragraphs: [
          'You can cook the best kota in South Africa — yet if customers cannot FIND it, you sell ZERO. Distribution is how products move from the Producer to the final Customer.',
          'Bread Journey Example: Farmer (wheat) -> Mill (flour) -> Bakery (bread at R10) -> Wholesaler (buys 5,000 loaves) -> Spaza Shop (buys 50 loaves) -> Customer (buys 1 loaf at R15). Each link adds a small mark-up; that extra R5 covers transport, storage, and spaza profit. Small SA businesses should start DIRECT to keep full profit and learn customer feedback fast, then add indirect retailers as volume grows.'
        ],
        bullets: [
          'Chain Roles: Producer / Manufacturer (farmer, factory, Sipho making kotas) -> Wholesaler (buys in BULK such as 1,000 loaves and sells 100 each to spazas, never to end consumers) -> Retailer (spaza shop, Shoprite, or kota stall selling SMALL units to final buyers) -> Customer / Consumer (eats or uses the product).',
          'Level 0 — Direct Channel (No Middleman): Producer -> Customer (Sipho at the school gate; farmer selling vetkoek at market). Advantage: higher unit profit & instant feedback; Disadvantage: you make, sell, and deliver everything yourself.',
          'Level 1 — Indirect (One Middleman): Producer -> Retailer -> Customer (you bake amagwinya and supply a spaza shop). Advantage: spaza sells for you to reach more buyers; Disadvantage: lower unit profit because the spaza takes a cut.',
          'Level 2 — Indirect (Two Middlemen): Producer -> Wholesaler -> Retailer -> Customer (Coca-Cola Factory -> Pretoria Wholesaler -> Shoprite -> You). Advantage: nationwide reach and huge volume; Disadvantage: lowest profit per individual unit.'
        ],
        formulaBlock: `3 DISTRIBUTION CHANNEL LEVELS:
• Level 0 (Direct):        Producer -> Customer
• Level 1 (1 Middleman):   Producer -> Retailer -> Customer
• Level 2 (2 Middlemen):   Producer -> Wholesaler -> Retailer -> Customer`
      },
      {
        heading: 'Retailer Types in SA, Location Rules & Physical Distribution',
        paragraphs: [
          'Around 70% of South Africans buy regularly from Informal Retailers (spaza shops and street vendors) because they are right near home with zero taxi fare, sell affordable small portions (R2 sugar, R5 bread rather than R50 bulk bags), offer Pay-Friday credit, speak the local language, know customers by name, and open early and close late. Ignoring the informal sector means ignoring most of South Africa.',
          'Physical Distribution keeps stock moving smoothly: reliable Transport (taxi, bakkie, bicycle, walking, courier), proper Storage / Warehousing (fridge for meat, dry storage for bread), balanced Inventory (too much expires and traps cash; too little sends angry customers away), and fast Order Processing (WhatsApp order -> confirm -> prepare -> deliver in 10 minutes).'
        ],
        bullets: [
          'Formal Retailers: Supermarket (Shoprite, Pick n Pay, Checkers — large, many items, low price, self-service); Department Store (Edgars, Woolworths — clothing & departments); Speciality Store (only hair salon, cell phone shop, or bakery); Convenience Store (small, near home, open late, higher prices — garage shop/spaza); Discount Store (bulk/low price — Pep, Ackermans, China Shop).',
          'Informal Retailers (Huge in SA): Spaza Shop (township small-unit convenience), Street Vendor / Hawker (taxi rank, school gate, traffic light), Market / Flea Market (Saturday markets), and Door-to-Door (Avon / Tupperware).',
          'Non-Store Retailing (Fast-Growing): Online (Takealot, Shein, Facebook Marketplace, WhatsApp orders), Direct Selling (Avon, Herbalife), and Vending Machines (Coke or airtime machines).',
          'The 3 Location Rules: (1) Be where your target market is (learners = school gate, workers = taxi rank, affluent = mall); (2) Be visible (corner or main road with clear R25 signage, NOT hidden in a back street with no sign); (3) Be accessible (easy walk, safe, taxis nearby, parking, no long queue).'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Distribution',
        definition: 'How products and services physically and commercially move from the producer to the final customer.'
      },
      {
        term: 'Producer',
        definition: 'Creator or manufacturer making goods or food (e.g. farmer, bakery, or kota entrepreneur).'
      },
      {
        term: 'Wholesaler',
        definition: 'Intermediary that buys goods in large bulk quantities and resells them to retailers rather than end consumers.'
      },
      {
        term: 'Retailer',
        definition: 'Business that buys stock from producers/wholesalers and sells small quantities to final consumers.'
      },
      {
        term: 'Consumer',
        definition: 'The end user who buys, eats, or uses the finished product or service.'
      },
      {
        term: 'Direct Channel',
        definition: 'Level 0 channel with no middlemen where the producer sells straight to the customer.'
      },
      {
        term: 'Indirect Channel',
        definition: 'Distribution path using one or more middlemen (retailers and/or wholesalers) to reach end buyers.'
      },
      {
        term: 'Formal Retailer',
        definition: 'Registered retail store chain or shop such as Shoprite, Pick n Pay, Edgars, or Woolworths.'
      },
      {
        term: 'Informal Retailer',
        definition: 'Township spaza shops, street vendors/hawkers, flea-market stalls, and door-to-door sellers.'
      },
      {
        term: 'Spaza Shop',
        definition: 'Community township convenience shop selling everyday items in small affordable units and extending local trust/credit.'
      },
      {
        term: 'Convenience Store',
        definition: 'Small nearby shop open early and late for fast everyday top-up purchases at slightly higher prices.'
      },
      {
        term: 'Speciality Store',
        definition: 'Retailer focused on one specific product category such as a hair salon, bakery, or phone shop.'
      },
      {
        term: 'Inventory',
        definition: 'Stock held on hand for production or resale — must avoid expiring overstock or empty shelves.'
      },
      {
        term: 'Warehousing / Storage',
        definition: 'Dedicated cool or dry facilities keeping stock fresh and safe until sold (e.g. fridges for meat).'
      }
    ],
    workedExample: {
      title: 'Mama’s Amagwinya in Soshanguve — Hybrid Direct & Indirect Distribution Plan',
      scenario:
        'Mama bakes 200 amagwinya (vetkoek) daily in Soshanguve at R4 cost each and combines Direct and Indirect channels to maximise daily profit and reach.',
      formulaBlock: `DIRECT (Main — 100 at School Gate, 6am–8am):
• Profit/unit = R10 - R4 = R6  ->  100 × R6 = R600 profit
INDIRECT (Extra — 100 across 2 Spazas, 50 each at R7 wholesale):
• Profit/unit = R7 - R4  = R3  ->  100 × R3 = R300 profit (spazas sell at R10)
TOTAL DAILY PROFIT = R600 + R300 = R900 profit (School Gate + 2 Spazas!)`,
      steps: [
        'Step 1 (Direct Channel Margin): Selling 100 amagwinya herself at the school gate (6am–8am) earns R6 profit per unit (R10 - R4) = R600 daily profit.',
        'Step 2 (Indirect Reach Multiplier): Supplying 100 units across 2 local spaza shops (50 each at R7) earns R3 profit per unit = R300 extra profit without Mama needing to stand there all day.',
        'Step 3 (Location Selection): She picked the school gate because learners arrive hungry at 7am with no rival seller nearby, clearly visible from the main road and 2 minutes from the taxi rank.'
      ],
      finalAnswer:
        'Blending Direct (higher unit profit: R600) and Indirect (extra volume & spaza reach: R300) generates R900 daily profit across three Soshanguve selling points.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Draw / List the Distribution Chain (4 marks)',
        question: 'Draw or list the 4 steps in the standard Distribution Chain in order. (4 marks)',
        answer: 'Producer -> Wholesaler -> Retailer -> Customer.'
      },
      {
        number: 2,
        label: 'Wholesaler vs Retailer (4 marks)',
        question: 'Distinguish between a Wholesaler and a Retailer. (4 marks)',
        answer:
          'A Wholesaler buys goods in bulk quantities from producers and resells them to retail shops (never to final consumers). A Retailer buys from wholesalers or producers and sells in small amounts directly to final consumers.'
      },
      {
        number: 3,
        label: 'Direct, One-Middleman & Two-Middlemen Examples (3 marks)',
        question: 'Give 1 South African example each of Direct, One-Middleman, and Two-Middlemen channels. (3 marks)',
        answer:
          'Direct (Level 0) = Sipho selling kotas directly at a school gate. One Middleman (Level 1) = Baker -> Spaza Shop -> Customer. Two Middlemen (Level 2) = Coca-Cola Factory -> Wholesaler -> Shoprite -> Customer.'
      },
      {
        number: 4,
        label: '3 Formal + 2 Informal Retailer Types (5 marks)',
        question: 'Name 3 types of Formal Retailers and 2 types of Informal Retailers. (5 marks)',
        answer:
          'Formal Retailers (any 3): Supermarket (Shoprite), Department Store (Edgars), Speciality Store (Hair Salon/Bakery), Convenience Store, Discount Store (Pep). Informal Retailers (any 2): Spaza Shop, Street Vendor/Hawker, Flea Market, Door-to-Door.'
      },
      {
        number: 5,
        label: 'Why Customers Buy From Spaza Shops (3 marks)',
        question: 'Why do people still buy from spaza shops even when Shoprite is cheaper? Give 3 reasons. (3 marks)',
        answer:
          'Any 3: Located close to home with no taxi fare needed; sell tiny affordable quantities (e.g. R2 sugar); offer Pay-Friday credit; speak local languages and know regulars by name; open very early and close late.'
      },
      {
        number: 6,
        label: 'Fixing a Hidden Salon Location (3 marks)',
        question:
          'Your salon is hidden at the back of the township and has no customers. Which distribution problem is this and what do you do? (3 marks)',
        answer:
          'Bad Place / Location — the salon is neither visible nor accessible. Relocate closer to a main road or taxi rank, put up bold visible signage, promote location pins on WhatsApp/TikTok, and offer WhatsApp bookings.'
      },
      {
        number: 7,
        label: 'Inventory & Stock Risks (2 marks)',
        question: 'What is Inventory, and why is keeping too much stock bad for a business? (2 marks)',
        answer:
          'Inventory is the stock a business keeps on hand. Holding too much stock causes food/goods to expire and traps cash that is needed elsewhere (whereas too little leaves customers walking away empty-handed).'
      }
    ]
  },
  {
    id: 'ncv-mkt-l2-ch9-customer-service-and-crm',
    level: 2,
    chapterNumber: 9,
    chapterLabel: 'Level 2 • Chapter 9',
    displayHeading: 'Level 2 — Chapter 9: Customer Service & Customer Relationship Management — CRM',
    title: 'Customer Service & Customer Relationship Management — CRM',
    subtitle: 'Level 2 - NCV Marketing (Nexovian Original Series)',
    sections: [
      {
        heading: 'Customer Service, CRM & The 5 RATER Principles (Exam Favourite)',
        paragraphs: [
          'Winning a brand-new customer costs 5x MORE than keeping an existing customer. A new buyer requires advertising, persuasion, discounts, and time — whereas an existing customer already trusts you and simply WhatsApps "Same as usual." Customer Service is how you treat buyers BEFORE (fast WhatsApp replies, prices, photos), DURING (greeting, smile, speed, hygiene, accuracy), and AFTER buying (saying thank you, asking "Was it nice?", fixing issues, inviting returns).',
          'CRM (Customer Relationship Management) means building a long-term relationship rather than chasing a one-off sale — turning "Buy today" into "Come back tomorrow, bring your friend next week, and keep buying for 5 years."'
        ],
        bullets: [
          '1. Reliability (Do what you promised): Kota promised in 3 min arrives in 3 min; braids quoted at R250 do not jump to R300 at checkout; open at 8am sharp as promised.',
          '2. Responsiveness (Be fast): Reply to WhatsApp in 5 minutes instead of 5 hours; fix slow 30-minute queues; resolve complaints NOW rather than next week.',
          '3. Assurance (Make customer feel safe & confident): Skilled staff, clean shop, honest pricing, and visible expiry dates build complete buyer trust.',
          '4. Empathy (Genuine personal care): Remember names and preferences ("Hi Lerato, same braids as last time?", remembering no spice, asking about exams) — treat people as individuals, not R30 coins.',
          '5. Tangibles (Visible proof): Clean shop, neat uniforms, clean gloves, wall price boards, sharp packaging, and clean TikTok photos (if it looks dirty, customers assume the food is dirty).'
        ],
        formulaBlock: `RATER SERVICE PRINCIPLES:
R = Reliability  |  A = Assurance  |  T = Tangibles  |  E = Empathy  |  R = Responsiveness`
      },
      {
        heading: 'Complaint Handling (5 Steps), Free SA CRM Tools & Customer Lifetime Value',
        paragraphs: [
          'Smart businesses treat complaints as GOLD: for every 1 customer who speaks up, 10 silent customers simply walk away forever. Solving a complaint fast turns an angry buyer into your loudest loyal fan ("They fixed it immediately!"). Never argue, blame the customer, ignore WhatsApp, laugh, or tell them to go elsewhere — one angry TikTok video can destroy a business.',
          'Free / Low-Cost SA CRM Tools need zero expensive software: keep a Customer Database in a notebook or phone contacts (Name | Phone | Order | Frequency, e.g. Lerato 071 Braids R250 every 3 weeks; Sipho 082 Spicy Kota every lunch), send once-a-day WhatsApp Broadcasts/Status specials (never spam 10x daily), run a Buy 5 Get 1 Free or 1-year Loyalty Card, send 2-day After-Sales WhatsApp follow-ups ("How is your hair?"), and ask for product feedback.'
        ],
        bullets: [
          '5 Steps to Handle Complaints (IN ORDER): (1) Listen — let them finish without interrupting; (2) Apologise — sincerely, even if not your fault ("I’m so sorry, sister, that’s not how we do things here"); (3) Fix NOW — remake a hot kota immediately with zero arguing; (4) Compensate — small extra like a free drink, free sauce, or next-visit discount; (5) Follow-up — message later ("Hi, was the second kota better? Thank you for telling us").',
          'Customer Lifetime Value (CLV) — Why Rude Service Costs Thousands: One learner buying a R25 school kota 5 days/week = R125/week -> R500/month -> R5,000 per 10-month school year from ONE customer (20 loyal learners = R100,000 per year!). Being rude once does not lose R25 — it loses R5,000.'
        ],
        formulaBlock: `CUSTOMER LIFETIME VALUE EXAMPLE:
R25 kota × 5 days × 4 weeks × 10 school months = R5,000 per year (1 learner)
20 Loyal Learners × R5,000                     = R100,000 per year!`
      }
    ],
    keyTerms: [
      {
        term: 'Customer Service',
        definition: 'How a business treats and supports customers before, during, and after every purchase.'
      },
      {
        term: 'CRM',
        definition: 'Customer Relationship Management — building lasting customer loyalty rather than one-off transactions.'
      },
      {
        term: 'Reliability',
        definition: 'Delivering consistently on every promise of speed, price, quality, and opening times.'
      },
      {
        term: 'Responsiveness',
        definition: 'Willingness and speed in answering messages, reducing queues, and fixing complaints immediately.'
      },
      {
        term: 'Assurance',
        definition: 'Staff skill, honesty, cleanliness, and visible expiry/safety standards that make buyers feel safe.'
      },
      {
        term: 'Empathy',
        definition: 'Caring, individualised attention — knowing regulars by name and remembering their preferences.'
      },
      {
        term: 'Tangibles',
        definition: 'Physical appearance customers inspect: clean shop, uniforms, gloves, price list, and neat packaging.'
      },
      {
        term: 'RATER',
        definition: 'Memory acronym for the 5 Customer Service Principles: Reliability, Assurance, Tangibles, Empathy, Responsiveness.'
      },
      {
        term: 'Complaint',
        definition: 'Valuable customer feedback pointing out an operational flaw so the business can fix it and keep 10 silent buyers.'
      },
      {
        term: 'Loyalty Programme',
        definition: 'Structured repeat-buyer rewards such as Buy 5 Get 1 Free cards or birthday/anniversary discounts.'
      },
      {
        term: 'Customer Database',
        definition: 'Simple record of customer names, phone numbers, favourite orders, and purchase dates.'
      },
      {
        term: 'Customer Lifetime Value',
        definition: 'Total revenue one loyal customer spends with your business over months and years rather than a single visit.'
      },
      {
        term: 'Retention',
        definition: 'Keeping existing customers buying repeatedly instead of losing them to competitors.'
      },
      {
        term: 'After-Sales Service',
        definition: 'Post-purchase thank-you messages, check-ins, and free adjustments after the customer leaves.'
      }
    ],
    workedExample: {
      title: 'Two Salons Charging R250 — No CRM vs Good CRM',
      scenario:
        'Salon A and Salon B have identical braiding skill and charge the same R250, yet Salon A shrinks while Salon B generates R12,750/year from one loyal customer and her friends.',
      formulaBlock: `SALON A (No CRM):   On phone, 4 hrs late, dismisses "too tight" complaint, no follow-up
                    -> Loses R250 × 12 = R3,000 + 10 friends = R30,000 LOST!
SALON B (Good CRM): Name greeting, 2-hr Reliability, tea & clean shop (Tangibles), 2-day WhatsApp check-in, 6th-visit 50% card
                    -> Gains R250 × 17 visits = R4,250/yr + 3 friends = R12,750/yr from 1 customer!`,
      steps: [
        'Step 1 (Salon A Failure): Ignoring greetings while scrolling a phone, taking 4 hours instead of 2, refusing to fix tight braids ("It’s fine, go"), and never following up pushes Lerato and 10 friends away — losing ~R30,000.',
        'Step 2 (Salon B RATER & CRM Execution): Greeting Lerato by name ("Hi Lerato, welcome back!"), finishing in 2 hours (Reliability), serving tea in a spotless salon (Tangibles), sending a 2-day WhatsApp follow-up ("How is your hair? If tight, come fix free"), and giving a 6th-visit 50% loyalty discount builds fierce loyalty.',
        'Step 3 (Compounding CLV Result): Lerato returns every 3 weeks (17 visits × R250 = R4,250/year) and brings 3 friends -> R12,750/year from one relationship.'
      ],
      finalAnswer:
        'Same hairstyling skill, completely different service: strong CRM and RATER standards turn one R250 client into R12,750/year in recurring referrals.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Define CRM (2 marks)',
        question: 'Define Customer Relationship Management (CRM). (2 marks)',
        answer:
          'Customer Relationship Management (CRM) is building long-term, trusting relationships with customers rather than chasing one-time sales so they return repeatedly.'
      },
      {
        number: 2,
        label: '5 Principles of Good Customer Service — RATER (10 marks)',
        question: 'List the 5 principles of Good Customer Service (RATER) and give 1 example of each. (10 marks)',
        answer:
          '1) Reliability = Delivering on promises (e.g. kota ready in 3 minutes as promised). 2) Assurance = Building safety and trust (skilled staff, clean kitchen, visible expiry dates). 3) Tangibles = Clean shop, uniforms, gloves, wall price board. 4) Empathy = Personal care (greeting by name and remembering preferences). 5) Responsiveness = Fast service (answering WhatsApp quickly and fixing complaints immediately).'
      },
      {
        number: 3,
        label: 'Retention Cost Advantage (2 marks)',
        question: 'Why is it cheaper to keep an existing customer than to win a new one? (2 marks)',
        answer:
          'Winning a new customer requires advertising, persuasion, time, and introductory discounts, whereas an existing customer already trusts you and reorders directly — keeping old customers costs about 5x less.'
      },
      {
        number: 4,
        label: '5 Steps to Handle a Complaint in Order (5 marks)',
        question: 'List the 5 steps to handle a customer complaint in order. (5 marks)',
        answer: '1. Listen, 2. Apologise, 3. Fix immediately, 4. Compensate (free item/discount), 5. Follow-up.'
      },
      {
        number: 5,
        label: 'Customer Lifetime Value Calculation (3 marks)',
        question: 'Calculate Customer Lifetime Value: A customer buys a R30 kota 4 times per week for 40 weeks. (3 marks)',
        answer: 'Weekly spend = R30 × 4 = R120 per week. Annual CLV = R120 × 40 weeks = R4,800 per year from one customer.'
      },
      {
        number: 6,
        label: '3 Free CRM Tools for Small Business (3 marks)',
        question: 'Give 3 CRM tools a small business in South Africa can use with zero software budget. (3 marks)',
        answer:
          'Any 3: Simple customer database in a notebook or phone contacts, daily WhatsApp Broadcast/Status specials, handmade Buy 5 Get 1 Free loyalty cards, after-sales WhatsApp follow-up messages, or asking buyers for feedback.'
      },
      {
        number: 7,
        label: 'Cold Kota Complaint — Do vs Do Not (4 marks)',
        question: 'A customer says their kota was cold. What should you NOT do, and what SHOULD you do? (4 marks)',
        answer:
          'Do NOT: Argue, blame the customer, ignore messages, laugh, or tell them to go elsewhere. SHOULD: Listen calmly, apologise sincerely, prepare a fresh hot kota immediately, compensate with a free sauce or drink/discount, and follow up on WhatsApp later.'
      }
    ]
  },
  {
    id: 'ncv-mkt-l2-ch10-marketing-plan-and-exam-revision',
    level: 2,
    chapterNumber: 10,
    chapterLabel: 'Level 2 • Chapter 10',
    displayHeading: 'Level 2 — Chapter 10: Marketing Plan + Full Exam Revision',
    title: 'Marketing Plan + Full Exam Revision',
    subtitle: 'Level 2 Final Chapter - NCV Marketing (Nexovian Original Series)',
    sections: [
      {
        heading: 'The Marketing Plan — All 7 Sections (Exam Blueprint)',
        paragraphs: [
          'Every concept from Chapters 1 to 9 comes together in Chapter 10. A Marketing Plan is a written blueprint stating who your customer is, what you will sell them, at what price, where you will sell, how you will promote, and how you will keep them coming back. Without a plan you are guessing; with a plan you are building.',
          'Always calculate realistic budget numbers instead of guessing: for 50 kotas/day over 20 trading days (1,000 kotas/month at R30 price and R20 unit stock cost), Revenue = 50 × R30 × 20 = R30,000 while Costs = Rent R1,000 + Stock R20,000 + Packaging R500 + Promotion R200 + Transport R500 = R22,200 -> realistic profit = R7,800.'
        ],
        bullets: [
          '1. Executive Summary (1 Paragraph): Short snapshot of the whole business — e.g. "Sipho’s Kotas is a kota shop at Soshanguve High gate selling fresh, hot kotas for R25–R30 to 500 learners daily, aiming for R5,000 profit per month in Year 1."',
          '2. Situation Analysis (SWOT): Internal (you control) Strengths (tasty recipe, near school, friendly, affordable) & Weaknesses (no fridge, small capital, no delivery bike, zero TikTok followers yet) vs External (outside control, plan for them) Opportunities (500 hungry learners, no gate rival, school permits stalls, free TikTok) & Threats (new competitor, rising bread prices, loadshedding, school holidays with zero learner footfall).',
          '3. Target Market (Ch 4 STP): Learners aged 15–19 in Soshanguve with R20–R50 daily pocket money wanting fast, tasty, affordable break-time lunch.',
          '4. Marketing Objectives (Must Be SMART — Specific, Measurable, Achievable, Realistic, Time-bound): Avoid vague goals ("I want many customers"). Write SMART goals: "Sell 100 kotas per day in 3 months", "Reach 1,000 TikTok followers in 2 months", or "Make R5,000 monthly profit by December."',
          '5. Marketing Strategies (Ch 5–8 7Ps in Action): Product (big fresh kota, 3 flavours, clean box), Price (R30 = R20 cost + R10 profit; Week 1 penetration R20), Place (direct school gate + WhatsApp), Promotion (daily TikTok, WhatsApp Status, Buy 5 Get 1 Free card, poster), People (Sipho + helper, friendly, clean aprons), Process (WhatsApp order -> Yoco/cash -> 3 min ready), Physical Evidence (clean stall, price list, photos, reviews).',
          '6. Budget (How Much Money?): Revenue (50 × R30 × 20 = R30,000) minus Monthly Costs (Rent R1,000 + Stock 1,000 × R20 = R20,000 + Packaging R500 + Promotion R200 + Transport R500 = R22,200) = R7,800 profit.',
          '7. Control / Evaluation (Did It Work?): Review every month — did we sell 50/day? Did buyers complain? What needs adjustment (price, flavour, location)? If the plan misses target, change the strategy rather than repeating mistakes.'
        ],
        formulaBlock: `7 SECTIONS OF A MARKETING PLAN (IN ORDER):
1. Executive Summary -> 2. Situation Analysis (SWOT) -> 3. Target Market -> 4. SMART Objectives -> 5. 7Ps Strategies -> 6. Budget -> 7. Control`
      },
      {
        heading: 'Full Level 2 Exam Revision — All 10 Chapters in 10 High-Yield Lines',
        paragraphs: [
          'Have only 1 hour before your NCV Marketing Level 2 exam? Lock in these 10 chapter-by-chapter essentials linking Needs, Environment/SWOT, Consumer Behaviour, STP, 7Ps, Branding, Pricing/AIDA, Distribution, CRM, and the complete Marketing Plan:'
        ],
        bullets: [
          'Ch 1 — What is Marketing?: Marketing = satisfying customer needs at a profit; Marketing Concept = customer is king.',
          'Ch 2 — Marketing Environment: Micro (you control: staff, prices, suppliers) vs Macro (you cannot control: economy, loadshedding, laws -> PESTLE) + SWOT.',
          'Ch 3 — Consumer Behaviour: 5 Steps (Need -> Search -> Evaluate -> Buy -> Post-Purchase); 4 Influences (Cultural, Social, Personal, Psychological); Maslow (Food -> Safety -> Belonging -> Esteem -> Self-Actualisation).',
          'Ch 4 — STP: Segmentation (Geographic, Demographic, Psychographic, Behavioural) -> Targeting (Mass, Differentiated, Niche) -> Positioning (mind share vs rivals).',
          'Ch 5 — Marketing Mix (7Ps): Product, Price, Place, Promotion + People, Process, Physical Evidence.',
          'Ch 6 — Branding, Packaging & Labelling: Brand = reputation/feeling beyond logo; Packaging = Protect, Contain, Convenience, Inform, Promote; Labelling = product name, ingredients, expiry, price, manufacturer.',
          'Ch 7 — Pricing & Promotion in Action: Cost-Plus, Break-Even = Fixed / (Price - Variable), and AIDA (Attention, Interest, Desire, Action).',
          'Ch 8 — Distribution & Retailing: Producer -> Wholesaler -> Retailer -> Customer; Direct = higher unit profit vs Indirect = wider reach; Spaza = near home, small amounts, credit.',
          'Ch 9 — Customer Service & CRM: Retain existing customers; RATER (Reliability, Assurance, Tangibles, Empathy, Responsiveness); Complaints (Listen, Apologise, Fix, Compensate, Follow-up).',
          'Ch 10 — Marketing Plan: SWOT + SMART Objectives + 7Ps Strategies + Realistic Budget + Monthly Control.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Marketing Plan',
        definition: 'Structured written roadmap defining target customers, SWOT, SMART goals, 7Ps strategies, budget, and control checks.'
      },
      {
        term: 'SWOT',
        definition: 'Situation analysis audit of internal Strengths & Weaknesses alongside external Opportunities & Threats.'
      },
      {
        term: 'SMART',
        definition: 'Checklist for strong marketing objectives: Specific, Measurable, Achievable, Realistic, and Time-bound.'
      },
      {
        term: 'Budget',
        definition: 'Itemised financial forecast of planned marketing and operating costs against expected sales revenue and profit.'
      },
      {
        term: 'Control',
        definition: 'Monthly review comparing actual sales and customer feedback against plan targets so weak areas are fixed fast.'
      },
      {
        term: 'Strengths / Weaknesses',
        definition: 'Internal positive capabilities and internal shortcomings inside the business that the owner can control.'
      },
      {
        term: 'Opportunities / Threats',
        definition: 'External helpful trends and external dangers outside owner control that the plan must capture or defend against.'
      }
    ],
    workedExample: {
      title: 'Thandi’s Braids in Soshanguve — Complete 7-Section Exam Marketing Plan',
      scenario:
        'Exam Master Template: Use Thandi’s 7-section plan structure for any 20-mark Level 2 Marketing Plan question (simply swap product, target market, price, place, and budget figures when writing for a vetkoek or kota shop).',
      formulaBlock: `1. Summary:   Thandi’s Braids (Soshanguve) | R250 trendy braids -> females 16–30 | Target R8,000 profit/month
2. SWOT:      S (skilled, trendy, rank, TikTok) | W (1 braider, no backup, small shop) | O (1,000 school girls, weddings, no rival) | T (new salon, hair prices up, loadshedding)
3. Target:    Females 16–30, R1,000–R3,000 income, TikTok users preparing for groove/weddings
4. SMART:     80 clients/month within 3 months; R8,000 profit/month by December
5. 7Ps:       5 trendy styles + free fix | R250 (R100 cost + R150 profit) + 6th visit 50% | Rank + WhatsApp | Daily TikTok + R20 referral | Thandi + assistant | WhatsApp -> R50 deposit -> 2 hrs -> balance | Clean salon, wall price board, certs, reviews
6. Budget:    Costs (Rent R1,500 + Hair R4,000 + Promo R300 = R5,800) vs Revenue (80 × R250 = R20,000) -> ~R10,000 profit after other operating costs
7. Control:   Monthly check — hit 80 clients? If below target, survey buyers and adjust promotion`,
      steps: [
        'Step 1 (Summary, SWOT & Target): Define the offer, location, and profit aim in one paragraph, audit realistic internal S/W and external O/T, and specify the target niche (females 16–30, R1,000–R3,000 income).',
        'Step 2 (SMART Goal & Complete 7Ps): Set measurable targets (80 bookings/month in 3 months, R8,000 profit by December) backed by all 7Ps — from R250 pricing (R100 cost + R150 profit) and 6th-visit 50% loyalty to R50 deposit, 2-hour WhatsApp booking process, and visible salon certificates.',
        'Step 3 (Budget Math & Monthly Control): Subtract rent (R1,500), hair stock (R4,000), promotion (R300), and other operating expenses from revenue (80 × R250 = R20,000 -> ~R10,000 profit), then inspect performance monthly to adjust weak tactics.'
      ],
      finalAnswer:
        'Following all 7 sections in order with realistic SWOT, SMART numbers, all 7Ps, cost-vs-revenue math, and monthly control earns top marks in NCV Level 2 exams.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Write a Realistic Business SWOT (8 marks)',
        question: 'Write a realistic SWOT analysis for your own small business idea (2 marks per element). (8 marks)',
        answer:
          'Example (School Kota Shop): Strengths (2) = Tasty secret sauce recipe, friendly fast owner. Weaknesses (2) = Limited startup cash, no delivery scooter yet. Opportunities (2) = 500 learners hungry at break time, free TikTok promotion. Threats (2) = Rising bread prices, daily loadshedding.'
      },
      {
        number: 2,
        label: 'Write a SMART Objective for a Kota Shop (2 marks)',
        question: 'Write 1 SMART marketing objective for a kota shop. (2 marks)',
        answer:
          '"Sell 50 kotas per day within 2 months" — Specific (50 kotas), Measurable (can count daily sales), Achievable, Realistic, and Time-bound (within 2 months).'
      },
      {
        number: 3,
        label: 'Strengths vs Opportunities (2 marks)',
        question: 'What is the key difference between Strengths and Opportunities in SWOT? (2 marks)',
        answer:
          'Strengths are internal positive factors inside the business that you control (e.g. skilled staff or great recipe). Opportunities are external positive trends outside your business that you cannot control but can take advantage of (e.g. a new school opening nearby).'
      },
      {
        number: 4,
        label: 'Control Stage Actions When Sales Miss Target (3 marks)',
        question: 'Your plan targets 100 kotas per day, but you only sell 30. What should you do in the Control stage? (3 marks)',
        answer:
          'Investigate why sales are short (price too high, weak location, low promotion, taste or slow service), gather customer feedback, adjust your price, location, or promotion mix, set an updated realistic target, and monitor results again next month.'
      },
      {
        number: 5,
        label: '7 Sections of a Marketing Plan (7 marks)',
        question: 'List the 7 sections of a Marketing Plan in order. (7 marks)',
        answer:
          '1. Executive Summary, 2. Situation Analysis (SWOT), 3. Target Market, 4. Marketing Objectives (SMART), 5. Marketing Strategies (7Ps), 6. Budget, and 7. Control / Evaluation.'
      },
      {
        number: 6,
        label: 'MEGA EXAM QUESTION — Full School Vetkoek Marketing Plan (20 marks)',
        question:
          'MEGA QUESTION: Write a complete 7-section Marketing Plan for a business selling vetkoek at a school. (20 marks)',
        answer:
          '1) Executive Summary: Mama’s Amagwinya sells fresh R10 vetkoek at Soshanguve High gate to hungry learners, targeting R5,000 monthly profit. 2) SWOT: S (fresh hot vetkoek, low startup cost), W (small gas stove, works alone), O (800 learners & no morning seller), T (flour/oil inflation, school holidays). 3) Target Market: Learners aged 14–19 with R10–R20 daily lunch budget. 4) SMART Objective: Sell 100 vetkoek per day within 3 months and earn R5,000 monthly profit. 5) 7Ps Strategies: Product (plain & mince/polony vetkoek in branded paper bag with today’s label); Price (R10 = R4 cost + R6 profit, Buy 5 Get 1 Free); Place (direct at school gate 7am–2pm + WhatsApp pre-orders); Promotion (TikTok cooking clip, morning WhatsApp Status); People (clean apron, friendly smile); Process (pre-order/cash ready in 2 min); Physical Evidence (clean oil/stall, wall price sign). 6) Budget: Revenue 100 × R10 × 20 days = R20,000 minus Stock (R8,000) + Gas/Transport/Promo (R2,000) = ~R10,000 profit before owner pay. 7) Control: Count daily sales vs 100-unit goal every Friday, ask learners for filling ideas, and adjust stock/pricing monthly.'
      }
    ]
  }
];

export const NCV_MARKETING_L2_MOCK_EXAM: NcvMarketingMockExamPaper = {
  id: 'ncv-mkt-l2-mock-exam-1',
  level: 2,
  title: 'NCV Marketing Level 2 — Full Mock Exam Paper & Official Memo',
  subtitle: 'Full 100-Mark Exam Practice Across Chapters 1–10 (Read Online Only)',
  timeAllocation: '2 Hours',
  totalMarks: 100,
  instructions: 'Answer ALL questions. Write clearly. Use examples from South Africa.',
  stopNote: 'Stop here. Try it first. Then check memo below.',
  sectionATitle: 'SECTION A: MULTIPLE CHOICE',
  sectionAMarks: 10,
  sectionAInstructions: 'Choose the CORRECT answer. Write only letter. E.g. 1.1 C',
  sectionAMcqs: [
    {
      number: '1.1',
      question: 'The 5 steps of buying decision in correct order are:',
      options: [
        { letter: 'A', text: 'Buy, Search, Need, Evaluate, Post-purchase' },
        { letter: 'B', text: 'Need, Search, Evaluate, Buy, Post-purchase' },
        { letter: 'C', text: 'Search, Need, Buy, Evaluate, Post-purchase' },
        { letter: 'D', text: 'Need, Evaluate, Search, Buy, Post-purchase' }
      ],
      correctLetter: 'B',
      memoSummary: '1.1 B (Need, Search, Evaluate, Buy, Post-purchase)'
    },
    {
      number: '1.2',
      question: 'Which is an example of Psychographic segmentation?',
      options: [
        { letter: 'A', text: 'Age 15-19' },
        { letter: 'B', text: 'Lives in Soshanguve' },
        { letter: 'C', text: 'Gym lifestyle, loves healthy food' },
        { letter: 'D', text: 'Income R2,000 per month' }
      ],
      correctLetter: 'C',
      memoSummary: '1.2 C (Gym lifestyle, loves healthy food)'
    },
    {
      number: '1.3',
      question: 'Break-Even formula is:',
      options: [
        { letter: 'A', text: 'Fixed Costs + Variable Costs' },
        { letter: 'B', text: 'Fixed Costs / (Price - Variable Cost)' },
        { letter: 'C', text: 'Cost + Profit' },
        { letter: 'D', text: 'Price x Quantity' }
      ],
      correctLetter: 'B',
      memoSummary: '1.3 B (Fixed Costs / (Price - Variable Cost))'
    },
    {
      number: '1.4',
      question: 'Which P is about how customer gets the product?',
      options: [
        { letter: 'A', text: 'Product' },
        { letter: 'B', text: 'Price' },
        { letter: 'C', text: 'Place' },
        { letter: 'D', text: 'Promotion' }
      ],
      correctLetter: 'C',
      memoSummary: '1.4 C (Place)'
    },
    {
      number: '1.5',
      question: '"Buy 5 Get 1 Free" is an example of:',
      options: [
        { letter: 'A', text: 'Advertising' },
        { letter: 'B', text: 'Sales Promotion' },
        { letter: 'C', text: 'Public Relations' },
        { letter: 'D', text: 'Personal Selling' }
      ],
      correctLetter: 'B',
      memoSummary: '1.5 B (Sales Promotion)'
    },
    {
      number: '1.6',
      question: 'Which is a STRENGTH in SWOT?',
      options: [
        { letter: 'A', text: 'New competitor opens' },
        { letter: 'B', text: 'Your tasty recipe and good location' },
        { letter: 'C', text: 'Loadshedding' },
        { letter: 'D', text: 'Bread price increases' }
      ],
      correctLetter: 'B',
      memoSummary: '1.6 B (Your tasty recipe and good location)'
    },
    {
      number: '1.7',
      question: 'Maslow Level 1 — Physiological need is:',
      options: [
        { letter: 'A', text: 'iPhone for status' },
        { letter: 'B', text: 'Kota for hunger' },
        { letter: 'C', text: 'Friends to belong' },
        { letter: 'D', text: 'University to be best' }
      ],
      correctLetter: 'B',
      memoSummary: '1.7 B (Kota for hunger)'
    },
    {
      number: '1.8',
      question: 'A Wholesaler is a person who:',
      options: [
        { letter: 'A', text: 'Sells to final customer in small amounts' },
        { letter: 'B', text: 'Buys in bulk and sells to retailers' },
        { letter: 'C', text: 'Makes the product' },
        { letter: 'D', text: 'Eats the product' }
      ],
      correctLetter: 'B',
      memoSummary: '1.8 B (Buys in bulk and sells to retailers)'
    },
    {
      number: '1.9',
      question: 'An example of Physical Evidence is:',
      options: [
        { letter: 'A', text: 'Friendly staff' },
        { letter: 'B', text: 'Fast service' },
        { letter: 'C', text: 'Clean shop, price list on wall' },
        { letter: 'D', text: 'WhatsApp order process' }
      ],
      correctLetter: 'C',
      memoSummary: '1.9 C (Clean shop, price list on wall)'
    },
    {
      number: '1.10',
      question: 'SMART objective means:',
      options: [
        { letter: 'A', text: 'Specific, Measurable, Achievable, Realistic, Time-bound' },
        { letter: 'B', text: 'Simple, Modern, Accurate, Rich, True' },
        { letter: 'C', text: 'Strong, Marketable, Active, Right, Tested' },
        { letter: 'D', text: 'Specific, Money, Advertising, Real, Time' }
      ],
      correctLetter: 'A',
      memoSummary: '1.10 A (Specific, Measurable, Achievable, Realistic, Time-bound)'
    }
  ],
  sectionBTitle: 'SECTION B: SHORT QUESTIONS',
  sectionBMarks: 40,
  sectionCTitle: 'SECTION C: LONG QUESTIONS',
  sectionCMarks: 50,
  writtenQuestions: [
    {
      questionNumber: 2,
      section: 'B',
      title: 'QUESTION 2 — Consumer Behaviour',
      totalMarks: 10,
      subQuestions: [
        {
          code: '2.1',
          prompt: 'List the 5 steps of the Buying Decision in order.',
          marks: 5,
          memoAnswer: 'Need, Search, Evaluate, Buy, Post-Purchase.'
        },
        {
          code: '2.2',
          prompt: 'Give 1 example each of: Cultural, Social, Personal, and Psychological factors.',
          marks: 4,
          memoAnswer:
            'Cultural = Muslim will not eat pork. Social = Friend recommends. Personal = Low income buys cheap. Psychological = Perceives dirty shop = dirty food.'
        },
        {
          code: '2.3',
          prompt: 'A customer buys once and never comes back. Which step failed and why?',
          marks: 1,
          memoAnswer: 'Post-Purchase failed — the customer was dissatisfied.'
        }
      ]
    },
    {
      questionNumber: 3,
      section: 'B',
      title: 'QUESTION 3 — STP',
      totalMarks: 10,
      subQuestions: [
        {
          code: '3.1',
          prompt: 'What does STP stand for?',
          marks: 3,
          memoAnswer: 'Segmentation, Targeting, Positioning.'
        },
        {
          code: '3.2',
          prompt: 'Name the 4 bases of Segmentation.',
          marks: 4,
          memoAnswer: 'Geographic, Demographic, Psychographic, Behavioural.'
        },
        {
          code: '3.3',
          prompt: 'Explain the difference between Mass Marketing and Niche Marketing with 1 example each.',
          marks: 3,
          memoAnswer:
            'Mass = One product for all, e.g. sugar. Niche = One product for one small group, e.g. salon only for natural hair.'
        }
      ]
    },
    {
      questionNumber: 4,
      section: 'B',
      title: 'QUESTION 4 — Marketing Mix',
      totalMarks: 10,
      subQuestions: [
        {
          code: '4.1',
          prompt: 'List the 7Ps.',
          marks: 7,
          memoAnswer: 'Product, Price, Place, Promotion, People, Process, Physical Evidence.'
        },
        {
          code: '4.2',
          prompt: 'A salon has rude staff and a dirty floor. Which 2 Ps are failing?',
          marks: 2,
          memoAnswer: 'People + Physical Evidence.'
        },
        {
          code: '4.3',
          prompt: 'Give the difference between Core Product and Augmented Product using a kota example.',
          marks: 1,
          memoAnswer: 'Core = Hunger solved / Benefit. Augmented = Extra — free sauce, loyalty card.'
        }
      ]
    },
    {
      questionNumber: 5,
      section: 'B',
      title: 'QUESTION 5 — Branding & Packaging',
      totalMarks: 10,
      subQuestions: [
        {
          code: '5.1',
          prompt: 'Define Brand.',
          marks: 2,
          memoAnswer: 'Brand = What people say about you when you are not there.'
        },
        {
          code: '5.2',
          prompt: 'List 4 functions of Packaging.',
          marks: 4,
          memoAnswer: 'Any 4: Protection, Containment, Convenience, Communication, Promotion.'
        },
        {
          code: '5.3',
          prompt: 'List 4 things that MUST be on a food label in South Africa.',
          marks: 4,
          memoAnswer:
            'Any 4: Product Name, Brand Name, Ingredients, Weight, Expiry Date, Price, Manufacturer details, Instructions, Barcode, Country of Origin.'
        }
      ]
    },
    {
      questionNumber: 6,
      section: 'C',
      title: 'QUESTION 6 — Pricing Calculation',
      totalMarks: 15,
      scenario:
        'Sipho sells kotas. Fixed Costs: Rent R1,000 + Transport R500 = R1,500. Variable Cost = R20. Selling Price = R30.',
      subQuestions: [
        {
          code: '6.1',
          prompt: 'Calculate Break-Even Units. Show formula.',
          marks: 4,
          memoAnswer: 'Break-Even Units = Fixed Costs / (Price - Variable Cost) = 1,500 / (30 - 20) = 150 kotas.'
        },
        {
          code: '6.2',
          prompt: 'If Sipho sells 500 kotas, calculate: a) Total Revenue (3), b) Total Cost (3), c) Profit (2).',
          marks: 8,
          memoAnswer:
            'a) Total Revenue = 500 × R30 = R15,000; b) Total Cost = 1,500 + (500 × R20 = 10,000) = R11,500; c) Profit = R15,000 - R11,500 = R3,500.'
        },
        {
          code: '6.3',
          prompt:
            'A competitor starts selling kotas at R25. Sipho sells at R30 and is losing customers. Give 3 things Sipho can do WITHOUT lowering his price.',
          marks: 3,
          memoAnswer:
            'Any 3: Improve quality, add value (free sauce / drink), faster / friendlier service, better branding / packaging, loyalty card.'
        }
      ]
    },
    {
      questionNumber: 7,
      section: 'C',
      title: 'QUESTION 7 — Promotion & AIDA',
      totalMarks: 10,
      subQuestions: [
        {
          code: '7.1',
          prompt: 'Explain AIDA and give 1 TikTok example for each stage for a kota shop.',
          marks: 8,
          memoAnswer:
            'A = Attention ("HOT KOTA R25!" big photo); I = Interest (show fresh chicken, cheese melting); D = Desire ("Imagine hot tasty kota on cold day"); A = Action ("WhatsApp 071... NOW, only 20 left!").'
        },
        {
          code: '7.2',
          prompt: 'Give 1 example each of Advertising and Public Relations for a small business.',
          marks: 2,
          memoAnswer: 'Advertising = TikTok ad / Poster. Public Relations (PR) = Sponsor school team / Newspaper story.'
        }
      ]
    },
    {
      questionNumber: 8,
      section: 'C',
      title: 'QUESTION 8 — CRM',
      totalMarks: 10,
      scenario:
        'Lerato goes to a salon. The braider is on her phone, does not greet, takes 4 hours instead of 2 hours promised, and braids too tight. When Lerato complains, the braider says "It’s fine, go." Lerato never comes back and tells 10 friends.',
      subQuestions: [
        {
          code: '8.1',
          prompt: 'Which 3 RATER principles failed? Explain each from the story.',
          marks: 6,
          memoAnswer:
            'Any 3: Reliability (promised 2 hours, took 4 hours); Responsiveness (did not fix complaint fast); Empathy (did not care, on phone, no greeting); Assurance (no trust — braids too tight); Tangibles (overall physical impression).'
        },
        {
          code: '8.2',
          prompt: 'List the 5 steps the salon should follow to handle Lerato’s complaint.',
          marks: 4,
          memoAnswer: 'Listen, Apologise, Fix now, Compensate, Follow-up.'
        }
      ]
    },
    {
      questionNumber: 9,
      section: 'C',
      title: 'QUESTION 9 — Marketing Plan',
      totalMarks: 15,
      scenario:
        'You want to start a business selling amagwinya (vetkoek) at a school gate. Price: R10 each. Write a mini Marketing Plan:',
      subQuestions: [
        {
          code: '9.1',
          prompt: 'Target Market',
          marks: 3,
          memoAnswer: 'Learners 15–19, Soshanguve, R10–R20/day, want cheap fast breakfast.'
        },
        {
          code: '9.2',
          prompt: 'SWOT (1 point each)',
          marks: 4,
          memoAnswer:
            'Strength = Tasty recipe / near school; Weakness = No fridge / small money; Opportunity = 500 hungry learners / no competitor; Threat = New competitor / bread or flour price up / school holidays.'
        },
        {
          code: '9.3',
          prompt: '1 SMART Objective',
          marks: 2,
          memoAnswer: '"Sell 50 amagwinya per day in 2 months."'
        },
        {
          code: '9.4',
          prompt: 'Marketing Mix: Product, Price, Place, Promotion',
          marks: 4,
          memoAnswer:
            'Product = Fresh amagwinya, clean packaging; Price = R10 (Cost R4 + Profit R6); Place = Direct at school gate; Promotion = WhatsApp Status, poster, Buy 5 Get 1 Free.'
        },
        {
          code: '9.5',
          prompt: 'Control — what will you do if after 1 month you only sell 10/day instead of 50?',
          marks: 2,
          memoAnswer:
            'Control = Ask customers why they are not buying, check price / location / promotion / taste, change the plan, and set a new target.'
        }
      ]
    }
  ]
};
