/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN ORIGINAL NCV ECONOMIC ENVIRONMENT TEXTBOOK
 * Status: LIVE — Level 2 (10/10) + Level 3 (10/10) + Level 4 Chapters 1–7 LIVE = 27 Chapters
 * Route: /textbooks/ncv-economic-environment-textbook
 * Read Online Only on nexovian.group.
 */

export interface NcvEconomicEnvironmentKeyTerm {
  term: string;
  definition: string;
}

export interface NcvEconomicEnvironmentChapter {
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
  keyTerms: NcvEconomicEnvironmentKeyTerm[];
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

export interface NcvEconomicEnvironmentRoadmapItem {
  chapterNumber: number;
  level: 2 | 3 | 4;
  title: string;
  status: 'LIVE' | 'COMING_SOON';
}

export const NCV_ECONOMIC_ENVIRONMENT_ROADMAP: NcvEconomicEnvironmentRoadmapItem[] = [
  { chapterNumber: 1, level: 2, title: 'Basic Economic Principles', status: 'LIVE' },
  { chapterNumber: 2, level: 2, title: 'The Consumer in the Economy', status: 'LIVE' },
  { chapterNumber: 3, level: 2, title: 'Supply and Demand', status: 'LIVE' },
  { chapterNumber: 4, level: 2, title: 'Production of Goods and Services', status: 'LIVE' },
  { chapterNumber: 5, level: 2, title: 'Economic Systems', status: 'LIVE' },
  { chapterNumber: 6, level: 2, title: 'Money, Banking and Monetary Policy', status: 'LIVE' },
  { chapterNumber: 7, level: 2, title: 'Fiscal Policy — Government, Tax & Spending', status: 'LIVE' },
  { chapterNumber: 8, level: 2, title: 'Trade — Local, National & International', status: 'LIVE' },
  { chapterNumber: 9, level: 2, title: 'Unemployment, Poverty & Economic Growth', status: 'LIVE' },
  { chapterNumber: 10, level: 2, title: 'Business Environment & Entrepreneurship', status: 'LIVE' },
  { chapterNumber: 1, level: 3, title: 'The Circular Flow of Income', status: 'LIVE' },
  { chapterNumber: 2, level: 3, title: 'National Income & GDP', status: 'LIVE' },
  { chapterNumber: 3, level: 3, title: 'Inflation & Unemployment in Depth', status: 'LIVE' },
  { chapterNumber: 4, level: 3, title: 'Government & Fiscal Policy in Depth', status: 'LIVE' },
  { chapterNumber: 5, level: 3, title: 'Money, Banking & Monetary Policy in Depth', status: 'LIVE' },
  { chapterNumber: 6, level: 3, title: 'International Trade & Exchange Rates in Depth', status: 'LIVE' },
  { chapterNumber: 7, level: 3, title: 'Economic Growth & Development', status: 'LIVE' },
  { chapterNumber: 8, level: 3, title: 'Business Cycles & Economic Indicators', status: 'LIVE' },
  { chapterNumber: 9, level: 3, title: 'Labour Market & Productivity', status: 'LIVE' },
  { chapterNumber: 10, level: 3, title: 'Exam Prep & Final Revision — Full L3', status: 'LIVE' },
  { chapterNumber: 1, level: 4, title: 'The Macroeconomy & National Income in Depth', status: 'LIVE' },
  { chapterNumber: 2, level: 4, title: 'Aggregate Demand & Aggregate Supply (AD/AS)', status: 'LIVE' },
  { chapterNumber: 3, level: 4, title: 'Inflation & Unemployment in Depth (Phillips Curve)', status: 'LIVE' },
  { chapterNumber: 4, level: 4, title: 'Fiscal & Monetary Policy in Depth', status: 'LIVE' },
  { chapterNumber: 5, level: 4, title: 'International Trade & Globalisation in Depth', status: 'LIVE' },
  { chapterNumber: 6, level: 4, title: 'Labour Market, Productivity & Inequality', status: 'LIVE' },
  { chapterNumber: 7, level: 4, title: 'Development Economics — Poverty, Growth & Sustainability', status: 'LIVE' }
];

export const NCV_ECONOMIC_ENVIRONMENT_LIVE_CHAPTERS: NcvEconomicEnvironmentChapter[] = [
  {
    id: 'ncv-ee-l2-ch1-basic-economic-principles',
    level: 2,
    chapterNumber: 1,
    chapterLabel: 'Level 2 • Chapter 1',
    displayHeading: 'Level 2 — Chapter 1: Basic Economic Principles',
    title: 'Basic Economic Principles',
    subtitle: 'Level 2 - NCV Economic Environment (Nexovian Original Series)',
    sections: [
      {
        heading: 'What Is Economics? & The 3 Exam Words You MUST Know',
        paragraphs: [
          'Economics is about choices. We want many things, but we do not have enough money, time, or resources for all of them—so we must choose.',
          'Remember these 3 essential NCV exam concepts:'
        ],
        bullets: [
          '1. Scarcity: Wants are unlimited, while resources are limited. Example: You want 5 things, but you only have R500.',
          '2. Choice: Because of scarcity, you must pick one option. Example: Buy business stock OR buy sneakers—you cannot buy both.',
          '3. Opportunity Cost: The next best thing you GIVE UP when you choose. Example: If you choose stock, you give up sneakers -> Opportunity cost = sneakers.'
        ]
      },
      {
        heading: 'The 4 Factors of Production (NCV Exam Favourite) & Consumer vs Producer',
        paragraphs: [
          'To produce any good or service, a business needs all 4 Factors of Production—there is no production without all 4:',
          'Also know the difference between a Consumer and a Producer:'
        ],
        bullets: [
          '1. Land: What nature gives us — land, water, gold, trees, soil.',
          '2. Labour: People who work — cashier, builder, driver.',
          '3. Capital: Things we use to produce — machines, buildings, tools, and money for the business.',
          '4. Entrepreneurship: The person who organises everything and takes the risk — the owner or boss.',
          'Consumer vs Producer: A Consumer buys and uses (you when you buy bread). A Producer makes and sells (you when you sell vetkoek).'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Economics',
        definition: 'Study of choices under scarcity.'
      },
      {
        term: 'Scarcity',
        definition: 'Not enough resources for all wants.'
      },
      {
        term: 'Opportunity Cost',
        definition: 'Next best thing you give up when making a choice.'
      },
      {
        term: '4 Factors of Production',
        definition: 'Land, Labour, Capital, and Entrepreneurship — all 4 are needed for production.'
      }
    ],
    workedExample: {
      title: 'Sipho in Mbombela — Scarcity, Choice, Opportunity Cost & Factors',
      scenario:
        'Sipho in Mbombela has R1 000. He wants stock for his business (R800) AND new takkies (R800). Total wanted = R1 600, while he only has R1 000.',
      formulaBlock: `Cash Available = R1 000\nItems Wanted   = Stock (R800) + New Takkies (R800) = R1 600  -> SCARCITY\n\nSipho’s Choice = Buys Stock (R800)\nOpportunity Cost = New Takkies (the item given up)`,
      steps: [
        'Step 1 (Scarcity & Choice): R1 600 wanted vs R1 000 cash = Scarcity. Sipho makes a Choice and buys stock for his business.',
        'Step 2 (Opportunity Cost): Because he bought stock, he gave up the takkies -> Opportunity Cost = Takkies.',
        'Step 3 (His Business Factors of Production): Land = Spot at the taxi rank; Labour = Sipho + his brother helping; Capital = Gas stove, pot, table; Entrepreneurship = Sipho (he started it and took the risk).'
      ],
      finalAnswer:
        'Sipho’s Opportunity Cost is the takkies, and his business combines all 4 Factors (taxi rank spot, family labour, stove/pot/table, and Sipho’s entrepreneurship).'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Defining Scarcity (2 marks)',
        question: 'Define scarcity. (2 marks)',
        answer: 'Unlimited wants, limited resources.'
      },
      {
        number: 2,
        label: 'The 4 Factors of Production (4 marks)',
        question: 'List the 4 Factors of Production. (4 marks)',
        answer: 'Land, Labour, Capital, Entrepreneurship.'
      },
      {
        number: 3,
        label: 'Identifying Opportunity Cost',
        question: 'Zanele chooses to study instead of going to a party. What is her opportunity cost?',
        answer: 'The party.'
      },
      {
        number: 4,
        label: 'Example of Capital',
        question: 'Give 1 example of Capital for a hair salon.',
        answer: 'Hair dryer / chair / mirror / money to buy stock.'
      }
    ]
  },
  {
    id: 'ncv-ee-l2-ch2-consumer-in-economy',
    level: 2,
    chapterNumber: 2,
    chapterLabel: 'Level 2 • Chapter 2',
    displayHeading: 'Level 2 — Chapter 2: The Consumer in the Economy',
    title: 'The Consumer in the Economy',
    subtitle: 'Level 2 - NCV Economic Environment (Nexovian Original Series)',
    sections: [
      {
        heading: 'Who Is a Consumer? & Needs vs Wants',
        paragraphs: [
          'A consumer is any person who buys and uses goods and services to satisfy wants and needs—such as when you buy bread, airtime, taxi fare, or a kota.',
          'NCV Rule: A smart consumer spends on NEEDS first, and then WANTS only if money is left.'
        ],
        bullets: [
          'Need (Must have to survive): Food, water, shelter, basic clothes, medicine.',
          'Want (Nice to have, not for survival): iPhone, expensive sneakers, DSTV, weave.'
        ]
      },
      {
        heading: '5 Factors That Influence Consumer Choice (MEMORISE FOR EXAM)',
        paragraphs: [
          'NCV exams frequently ask what makes consumers buy more or less of a product:'
        ],
        bullets: [
          '1. Price: If price goes up, we buy less. If price goes down, we buy more.',
          '2. Income: If salary goes up, we buy more and better things. If salary goes down, we buy less.',
          '3. Taste / Fashion: When everyone wants something (e.g. Amapiano merch), demand goes up.',
          '4. Advertising: Adverts make us want things we did not originally plan to buy.',
          '5. Price of Other Goods: If beef becomes expensive, shoppers buy chicken instead.'
        ]
      },
      {
        heading: 'Consumer Rights & Consumer Responsibilities',
        paragraphs: [
          'Know both your legal Consumer Rights (frequently tested in NCV exams) and your Responsibilities:'
        ],
        bullets: [
          'Right to Safety: Products sold must not harm your health or safety.',
          'Right to Information: You must know the price, ingredients, and expiry date.',
          'Right to Choice: You must have different products to choose from, never forced into one.',
          'Right to be Heard: You can complain if a product or service is bad.',
          '4 Consumer Responsibilities: (1) Pay for what you buy, (2) Read labels and expiry dates, (3) Don’t waste—budget properly, and (4) Complain in the right way, not just shout.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Consumer',
        definition: 'A person who buys and uses goods and services.'
      },
      {
        term: 'Need',
        definition: 'Something you must have in order to live and survive.'
      },
      {
        term: 'Want',
        definition: 'Something nice to have, but not essential for survival.'
      },
      {
        term: 'Disposable Income',
        definition: 'Money left after tax—what you can actually spend.'
      },
      {
        term: 'Budget',
        definition: 'A clear plan of how you will spend your money.'
      }
    ],
    workedExample: {
      title: 'Lerato in Mbombela — Disposable Income, Budgeting & Price Changes',
      scenario:
        'Lerato earns R4 000 per month. After tax and taxi fare, she has R3 000 left—her Disposable Income. See how she budgets needs vs wants, and how she adapts when food prices rise next month:',
      formulaBlock: `Monthly Disposable Income = R3 000\n\nInitial Budget (Total = R3 000):\n• Food (Need):    R1 500\n• Rent (Need):    R1 000\n• Airtime (Need):   R200\n• New nails (Want): R300\n\nNext Month (Food price rises): Cut Wants FIRST -> Nails R300 -> R0 to pay for Food.`,
      steps: [
        'Step 1 (Smart Initial Budget): Lerato allocates R2 700 to Needs (Food, Rent, Airtime) and R300 to Wants (New nails) = R3 000 total. Needs come first.',
        'Step 2 (Reacting to Rising Food Prices): Next month, food becomes more expensive. She cuts WANTS first—reducing nails to R0 so food is paid for (a smart consumer). Spending on nails first and leaving no money for food makes a bad consumer.',
        'Step 3 (Exam Question — "What influences Lerato’s choice?"): Price and Income.'
      ],
      finalAnswer:
        'Lerato’s disposable income is R3 000; she cuts Wants (nails) when food prices rise, and her choices are influenced by Price and Income.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Defining Consumer (2 marks)',
        question: 'Define consumer. (2 marks)',
        answer: 'A person who buys and uses goods and services to satisfy needs and wants.'
      },
      {
        number: 2,
        label: 'Needs vs Wants Differences (4 marks)',
        question: 'Give 2 differences between Needs and Wants, with 1 example each. (4 marks)',
        answer:
          'Need = must have to survive (essential for life), e.g. food. Want = nice to have, not essential for survival, e.g. expensive sneakers.'
      },
      {
        number: 3,
        label: 'Factors Influencing Consumer Choice (3 marks)',
        question: 'List 3 factors that influence consumer choice. (3 marks)',
        answer:
          'Any 3 of: Price, Income, Taste/Fashion, Advertising, and Price of other goods.'
      },
      {
        number: 4,
        label: 'Consumer Rights Violation Scenario',
        question:
          'Thandi buys milk that is expired and the shop refuses a refund. Which consumer right is violated?',
        answer:
          'Right to Safety + Right to be Heard / Right to Information. The shop must display valid expiry dates, never sell unsafe expired stock, and honour valid complaints/refunds.'
      },
      {
        number: 5,
        label: 'Calculating Disposable Income',
        question: 'You earn R5 000 and tax is R500. What is your disposable income?',
        answer: 'R5 000 − R500 = R4 500.'
      }
    ]
  },
  {
    id: 'ncv-ee-l2-ch3-supply-and-demand',
    level: 2,
    chapterNumber: 3,
    chapterLabel: 'Level 2 • Chapter 3',
    displayHeading: 'Level 2 — Chapter 3: Supply and Demand',
    title: 'Supply and Demand',
    subtitle: 'Level 2 - NCV Economic Environment (Nexovian Original Series)',
    sections: [
      {
        heading: 'Laws of Demand & Supply (MEMORISE FOR NCV EXAMS)',
        paragraphs: [
          'Demand is what buyers WANT to buy and CAN afford. Supply is what sellers WANT to sell and CAN produce.'
        ],
        formulaBlock: `LAW OF DEMAND:\n• Price UP   -> Demand DOWN | Price DOWN -> Demand UP\n(Example: Kota at R15 = many buyers; Kota at R40 = few buyers)\n\nLAW OF SUPPLY:\n• Price UP   -> Supply UP   | Price DOWN -> Supply DOWN\n(Example: Kota at R40 = many sellers; Kota at R10 = few sellers, no profit)`
      },
      {
        heading: 'Equilibrium, Shortage & Surplus',
        paragraphs: [
          'Market prices balance buyers and sellers around Equilibrium—the sweet spot where Demand equals Supply:'
        ],
        bullets: [
          'Equilibrium (Demand = Supply): Buyers want to buy the exact quantity sellers want to sell—no shortage, no surplus.',
          'Shortage (Demand > Supply): Too many buyers, not enough goods -> Price will go UP (e.g. only 20 kotas available, 100 people want them).',
          'Surplus (Supply > Demand): Too many goods, not enough buyers -> Price will go DOWN (e.g. 100 kotas made, only 20 bought; seller drops price).'
        ]
      },
      {
        heading: 'What Shifts Demand & What Shifts Supply? (Non-Price Factors)',
        paragraphs: [
          'Other factors besides price can shift the whole Demand or Supply curve:'
        ],
        bullets: [
          'Demand Shifts UP When: (1) Income increases, (2) Consumer taste/fashion shifts toward the item, or (3) Price of a substitute rises (e.g. beef gets expensive -> chicken demand rises).',
          'Supply Shifts When: (1) Cost of production rises -> Supply goes DOWN (e.g. expensive flour = fewer kotas), (2) Better technology -> Supply goes UP (e.g. faster stove = more kotas), or (3) More sellers enter the market -> Supply goes UP.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Demand',
        definition: 'Quantity buyers are willing and able to buy at a given price.'
      },
      {
        term: 'Supply',
        definition: 'Quantity sellers are willing and able to sell at a given price.'
      },
      {
        term: 'Equilibrium',
        definition: 'Market price and quantity where Demand = Supply.'
      },
      {
        term: 'Shortage',
        definition: 'Demand is greater than Supply (excess buyers).'
      },
      {
        term: 'Surplus',
        definition: 'Supply is greater than Demand (excess unsold stock).'
      },
      {
        term: 'Substitute',
        definition: 'A product you can use instead of another—like chicken instead of beef.'
      }
    ],
    workedExample: {
      title: 'Kota Market at Taxi Rank — Equilibrium, Surplus & Shortage',
      scenario:
        'At the taxi rank Kota market, look at how buyers and sellers react at three different prices (R30, R40, and R20):',
      formulaBlock: `• At R30: Demand 80  | Supply 80  -> EQUILIBRIUM (Price = R30, Quantity = 80)\n• At R40: Demand 40  | Supply 120 -> SURPLUS of 80 kotas (Sellers cut price back to R30)\n• At R20: Demand 120 | Supply 40  -> SHORTAGE of 80 kotas (Price rises back to R30)`,
      steps: [
        'Step 1 (At Price R30): Buyers want 80 kotas and sellers want to sell 80 kotas -> Demand = Supply = Equilibrium (no shortage, no surplus).',
        'Step 2 (If Price Rises to R40): Demand falls to 40 while Supply rises to 120 -> Surplus of 80 kotas (120 − 40). Sellers must drop the price back to R30.',
        'Step 3 (If Price Drops to R20): Demand jumps to 120 while Supply falls to 40 -> Shortage of 80 kotas (120 − 40). Competition pushes price back up to R30.'
      ],
      finalAnswer:
        'Equilibrium is R30 for 80 kotas—the market always moves back toward Equilibrium.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Law of Demand (2 marks)',
        question: 'State the Law of Demand. (2 marks)',
        answer:
          'When price increases, quantity demanded decreases. When price decreases, quantity demanded increases.'
      },
      {
        number: 2,
        label: 'Law of Supply (2 marks)',
        question: 'State the Law of Supply. (2 marks)',
        answer:
          'When price increases, quantity supplied increases. When price decreases, quantity supplied decreases.'
      },
      {
        number: 3,
        label: 'Shortage or Surplus at R25 (2 marks)',
        question:
          'At R25, Demand = 100 and Supply = 60. Is this a shortage or surplus? By how much? (2 marks)',
        answer: 'Shortage. Demand > Supply by 40 (100 − 60 = 40).'
      },
      {
        number: 4,
        label: 'Shortage or Surplus at R50 (2 marks)',
        question:
          'At R50, Demand = 50 and Supply = 90. Is this a shortage or surplus? By how much? (2 marks)',
        answer: 'Surplus. Supply > Demand by 40 (90 − 50 = 40).'
      },
      {
        number: 5,
        label: 'Production Cost Shift on Kota Supply',
        question: 'Flour price goes up. What happens to the supply of kota? Why?',
        answer:
          'Supply goes DOWN. The cost of production is higher, so sellers make less profit and therefore produce and supply fewer kotas.'
      }
    ]
  },
  {
    id: 'ncv-ee-l2-ch4-production-goods-services',
    level: 2,
    chapterNumber: 4,
    chapterLabel: 'Level 2 • Chapter 4',
    displayHeading: 'Level 2 — Chapter 4: Production of Goods and Services',
    title: 'Production of Goods and Services',
    subtitle: 'Level 2 - NCV Economic Environment (Nexovian Original Series)',
    sections: [
      {
        heading: 'What Is Production? & The 3 Sectors of Production (MEMORISE)',
        paragraphs: [
          'Production is making goods and services to satisfy wants and needs. Goods are tangible things you can TOUCH (bread, kota, clothes, phone). Services are intangible things you CANNOT touch, but PAY for (taxi ride, haircut, doctor, teacher).',
          'NCV exams love the 3 Stages / Sectors of Production—one cannot work without the other (Primary -> Secondary -> Tertiary):'
        ],
        bullets: [
          '1. Primary Sector (TAKE from nature): Farming, fishing, mining, forestry—e.g. a farmer grows maize, or a miner digs gold.',
          '2. Secondary Sector (MAKE / MANUFACTURE): Factories turn raw materials into finished products—e.g. Maize -> Maize meal, Gold -> Jewellery, Wood -> Furniture.',
          '3. Tertiary Sector (SELL / SERVE): Shops, transport, banks, schools, hospitals—e.g. a shop sells maize meal, a taxi takes you to the shop, or a bank keeps your money.'
        ]
      },
      {
        heading: 'Productivity & Costs of Production',
        paragraphs: [
          'Productivity measures how much you produce with what you have. High productivity = more output with less input = MORE profit. Low productivity = less output with more input = LESS profit.'
        ],
        bullets: [
          '4 Ways to Increase Productivity: (1) Better machines / technology, (2) Train workers, (3) Workers arrive on time (no laziness), and (4) Good management.',
          'Fixed Cost: Costs you pay even if you produce 0—such as monthly rent or a manager’s salary.',
          'Variable Cost: Costs that change with production—such as flour, oil, and packaging (more kotas = more flour).',
          'Formula: Total Cost = Fixed Cost + Variable Cost.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Production',
        definition: 'Making goods and services to satisfy human wants and needs.'
      },
      {
        term: 'Goods',
        definition: 'Tangible physical products you can touch (e.g. bread, phones).'
      },
      {
        term: 'Services',
        definition: 'Intangible activities you pay for (e.g. taxi rides, haircuts).'
      },
      {
        term: 'Primary Sector',
        definition: 'Extracts raw materials directly from nature (farming, mining, fishing).'
      },
      {
        term: 'Secondary Sector',
        definition: 'Manufactures raw materials into finished goods in factories.'
      },
      {
        term: 'Tertiary Sector',
        definition: 'Sells goods and provides services (shops, transport, banks, schools).'
      },
      {
        term: 'Productivity',
        definition: 'Output produced per unit of input used.'
      }
    ],
    workedExample: {
      title: 'From Farm to Kota (Nkomazi -> Mbombela -> KaNyamazane) & Kota Seller Costing',
      scenario:
        'See how the 3 production sectors connect from farm to street shop, and how a Kota Seller calculates Fixed Cost, Variable Cost, Total Cost, Revenue, and Profit for 100 kotas:',
      formulaBlock: `3-Sector Production Chain:\n• Primary (Nkomazi):      Farmer grows and harvests 100 bags of maize\n• Secondary (Mbombela):   Factory grinds maize into maize meal + bread flour\n• Tertiary (KaNyamazane): Spaza shop sells bread, taxi delivers it, bank gives loan\n\nKota Seller Cost & Profit (100 Kotas Sold at R25 each):\n• Fixed Cost (Rent) = R500/month (paid even if 0 kotas sold)\n• Variable Cost     = 100 × R10 = R1 000\n• Total Cost        = R500 + R1 000 = R1 500\n• Revenue           = 100 × R25 = R2 500\n• Profit            = R2 500 − R1 500 = R1 000`,
      steps: [
        'Step 1 (Full Sector Chain): If the Nkomazi farmer stops, the Mbombela factory has no maize; if the factory stops, the KaNyamazane spaza has no bread; if the shop stops, buyers have no food.',
        'Step 2 (Calculate Variable & Total Cost): Rent (Fixed Cost) = R500. Variable Cost = 100 × R10 = R1 000. Total Cost = R500 + R1 000 = R1 500.',
        'Step 3 (Calculate Revenue & Profit): Selling 100 kotas at R25 brings R2 500 Revenue. Profit = R2 500 − R1 500 = R1 000.'
      ],
      finalAnswer:
        'She earns R1 000 profit—every producer must track Fixed and Variable Costs carefully or risk thinking they are making profit when losing money.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Goods vs Services Examples (2 marks)',
        question: 'Give 1 example each of Goods and Services. (2 marks)',
        answer: 'Goods: Bread / Phone. Services: Haircut / Taxi ride.'
      },
      {
        number: 2,
        label: '3 Sectors of Production (6 marks)',
        question: 'Name the 3 sectors and give 1 example of each. (6 marks)',
        answer:
          'Primary — Farming / Mining. Secondary — Factory making clothes / Bread factory. Tertiary — Shop / Bank / School.'
      },
      {
        number: 3,
        label: 'Identifying Sectors in a Fish Supply Chain (3 marks)',
        question:
          'A fisherman catches fish, a factory cans the fish, and a shop sells the canned fish. Identify the sector for each. (3 marks)',
        answer: 'Fisherman = Primary Sector. Factory = Secondary Sector. Shop = Tertiary Sector.'
      },
      {
        number: 4,
        label: 'Calculating Total Cost (3 marks)',
        question:
          'Rent is R1 000, variable cost per unit is R5, and you make 200 units. What is Total Cost? (3 marks)',
        answer: 'Variable Cost = 200 × R5 = R1 000. Total Cost = R1 000 + R1 000 = R2 000.'
      },
      {
        number: 5,
        label: 'Increasing Productivity (2 marks)',
        question: 'Give 2 ways to increase productivity in a business. (2 marks)',
        answer:
          'Any 2 of: Train workers, use better machines / technology, good management, ensure punctuality, or reduce waste.'
      }
    ]
  },
  {
    id: 'ncv-ee-l2-ch5-economic-systems',
    level: 2,
    chapterNumber: 5,
    chapterLabel: 'Level 2 • Chapter 5',
    displayHeading: 'Level 2 — Chapter 5: Economic Systems',
    title: 'Economic Systems',
    subtitle: 'Level 2 - NCV Economic Environment (Nexovian Original Series)',
    sections: [
      {
        heading: 'The 3 Questions Every Economic System Must Answer',
        paragraphs: [
          'An economic system is the way a country organises its economy to decide three essential questions:'
        ],
        bullets: [
          '1. WHAT to produce?',
          '2. HOW to produce it?',
          '3. FOR WHOM to produce it?'
        ]
      },
      {
        heading: 'The 3 Main Economic Systems (MEMORISE FOR EXAM)',
        paragraphs: [
          'Different countries answer those 3 questions using one of three main systems. South Africa uses a Mixed Economy (you can open a kota business freely, while government builds roads and pays child grants):'
        ],
        bullets: [
          '1. Free Market / Capitalist (e.g. USA): Private individuals own businesses; prices are set by Supply and Demand with minimal government interference. Advantage: Competition, choice, innovation. Disadvantage: Rich get richer, poor can suffer without support.',
          '2. Command / Centrally Planned (e.g. Old Soviet Union, North Korea): Government owns everything and decides what to make, prices, and distribution. Advantage: Everyone receives basic items, lower inequality. Disadvantage: No choice, no competition, slow, shortages.',
          '3. Mixed Economy (SOUTH AFRICA): BOTH government (schools, hospitals, police, roads, grants) and private sector (shops, mines, banks, factories) participate. Prices mostly follow Supply and Demand with some government controls. Advantage: Best of both (freedom + support for the poor). Disadvantage: Can be slow, and public spending risks corruption or waste.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Economic System',
        definition: 'How a country answers What, How, and For Whom to produce.'
      },
      {
        term: 'Free Market',
        definition: 'Private ownership and Supply & Demand pricing with minimal government control.'
      },
      {
        term: 'Command Economy',
        definition: 'Government owns resources and controls production, prices, and distribution.'
      },
      {
        term: 'Mixed Economy',
        definition: 'Both private businesses and government own and operate parts of the economy.'
      },
      {
        term: 'Privatisation',
        definition: 'When government sells a state business to private owners (e.g. Telkom).'
      },
      {
        term: 'Nationalisation',
        definition: 'When government takes over a private business to own and run it.'
      }
    ],
    workedExample: {
      title: 'Three Countries, One Bread — Comparing the 3 Economic Systems',
      scenario:
        'See how bread is baked, priced, and distributed across Country A (Free Market), Country B (Command), and Country C (Mixed — South Africa):',
      formulaBlock: `• Country A (Free Market): Baker sets R20 price. If you can’t afford, no bread; government stays out.\n• Country B (Command):     Government owns bakery & fixes price at R5. 1 basic loaf type, queues/shortages.\n• Country C (Mixed — SA):  Private baker sells at R20; government pays R500 child grant + free school feeding.`,
      steps: [
        'Step 1 (Compare Bread Access): Free Market gives variety and efficiency but leaves out anyone without R20; Command guarantees R5 bread in theory but suffers shortages and zero variety.',
        'Step 2 (How South Africa Mixes Both): Private bakeries operate for profit (Free Market), while government helps poor families buy food through child grants and school feeding schemes.',
        'Step 3 (Exam Question — "Which system does SA use? Give 2 reasons"): Mixed Economy. (1) Private businesses like Shoprite exist. (2) Government provides public schools, hospitals, and grants.'
      ],
      finalAnswer:
        'South Africa operates a Mixed Economy—combining private enterprise (Shoprite, spazas) with government services and grants.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Three Core Economic Questions (3 marks)',
        question: 'Name the 3 questions every economic system must answer. (3 marks)',
        answer: '1) What to produce?  2) How to produce?  3) For whom to produce?'
      },
      {
        number: 2,
        label: 'Three Economic Systems (3 marks)',
        question: 'Name the 3 economic systems. (3 marks)',
        answer: '1) Free Market / Capitalist  2) Command / Centrally Planned  3) Mixed Economy.'
      },
      {
        number: 3,
        label: 'SA Mixed Economy Ownership Examples (4 marks)',
        question:
          'South Africa is a Mixed Economy. Give 2 examples of government ownership and 2 examples of private ownership. (4 marks)',
        answer:
          'Government: Eskom, public schools, public hospitals, SANDF (any 2). Private: Shoprite, MTN, your spaza shop, private schools (any 2).'
      },
      {
        number: 4,
        label: 'Free Market Pros & Cons (2 marks)',
        question: 'Give 1 advantage and 1 disadvantage of a Free Market system. (2 marks)',
        answer:
          'Advantage: More choice / competition / innovation. Disadvantage: Poor suffer / high inequality.'
      },
      {
        number: 5,
        label: 'Privatisation Definition & Example',
        question: 'What is privatisation? Give 1 SA example.',
        answer:
          'When government sells a state-owned business to private owners. Example: Telkom / SAA partly sold.'
      }
    ]
  },
  {
    id: 'ncv-ee-l2-ch6-money-banking-monetary-policy',
    level: 2,
    chapterNumber: 6,
    chapterLabel: 'Level 2 • Chapter 6',
    displayHeading: 'Level 2 — Chapter 6: Money, Banking and Monetary Policy',
    title: 'Money, Banking and Monetary Policy',
    subtitle: 'Level 2 - NCV Economic Environment (Nexovian Original Series)',
    sections: [
      {
        heading: 'What Is Money? & The 4 Functions of Money (MEMORISE)',
        paragraphs: [
          'Money is anything people generally accept to buy goods and services. Before money, people used barter (swapping chickens for maize). Memorise all 4 functions for NCV exams:'
        ],
        bullets: [
          '1. Medium of Exchange: You use Rands to buy goods instead of bartering chickens for maize.',
          '2. Measure of Value: Money shows prices clearly (Kota = R30, Haircut = R100) so you can compare values.',
          '3. Store of Value: You can save money for later—R100 today stays R100 next month (unless inflation eats its buying power).',
          '4. Standard of Deferred Payment: You can buy on credit now and pay later at month-end.'
        ]
      },
      {
        heading: 'Types of Banks in South Africa & What Is Interest?',
        paragraphs: [
          'Banks keep your money safe, grant loans, and help you make payments. South Africa has three main types of banks:',
          'Interest is the price of borrowing money: if you BORROW from a bank, you pay interest; if you SAVE in a bank, the bank pays you interest.'
        ],
        bullets: [
          '1. Central Bank — SARB (South African Reserve Bank): The boss bank (only 1 in SA). Controls all other banks, prints money, and decides interest rates.',
          '2. Commercial Banks: Capitec, FNB, Standard Bank, ABSA, Nedbank—the everyday banks people and businesses use.',
          '3. Development Banks: Support poor communities, farmers, and small businesses—e.g. IDC (Industrial Development Corporation) and Land Bank.'
        ]
      },
      {
        heading: 'Monetary Policy, Inflation, Repo Rate & Prime Rate',
        paragraphs: [
          'Monetary Policy is how SARB controls money in the country using the Interest Rate (Repo Rate) to control Inflation (when prices rise over time and money buys less, e.g. bread jumping from R15 to R20).'
        ],
        formulaBlock: `Repo Rate  = Interest rate SARB charges commercial banks\nPrime Rate = Repo Rate + 3.5% (Rate commercial banks charge you)\n\nHow SARB Fights Inflation:\n• Inflation HIGH -> SARB INCREASES interest rate -> Loans expensive -> Less borrowing & spending -> Prices cool down.\n• Inflation LOW  -> SARB DECREASES interest rate -> Loans cheap -> More borrowing & spending -> Economy grows.`
      }
    ],
    keyTerms: [
      {
        term: 'Money',
        definition: 'Any generally accepted medium of exchange used to buy goods and services.'
      },
      {
        term: 'Inflation',
        definition: 'A general rise in prices over time so that money loses purchasing power.'
      },
      {
        term: 'Interest Rate',
        definition: 'The cost or price of borrowing money (or reward for saving money).'
      },
      {
        term: 'Repo Rate',
        definition: 'The interest rate the SARB charges commercial banks.'
      },
      {
        term: 'Prime Rate',
        definition: 'The rate commercial banks charge borrowers: Repo Rate + 3.5%.'
      },
      {
        term: 'Monetary Policy',
        definition: 'How the SARB controls the money supply and inflation via interest rates.'
      },
      {
        term: 'Barter',
        definition: 'Exchanging goods directly for other goods without using money.'
      }
    ],
    workedExample: {
      title: 'Thabo’s R10 000 Business Loan, Ingredient Inflation & SARB Action',
      scenario:
        'Thabo wants to borrow R10 000 for his kota business when Repo Rate = 8%. Meanwhile, his kota ingredient costs rise from R10 last year to R12 this year:',
      formulaBlock: `Thabo’s Loan (1 Year at Prime Rate):\n• Prime Rate  = Repo (8%) + 3.5% = 11.5%\n• Interest    = R10 000 × 11.5% = R1 150\n• Pay Back    = R10 000 + R1 150 = R11 150\n\nIngredient Inflation (R10 -> R12):\n• Inflation % = ((12 − 10) ÷ 10) × 100 = (2 ÷ 10) × 100 = 20%`,
      steps: [
        'Step 1 (Prime Rate & Loan Repayment): Prime Rate = 8% + 3.5% = 11.5%. One year’s interest on R10 000 is R1 150, so Thabo must pay back R11 150.',
        'Step 2 (Calculate Cost Inflation): Ingredients jumped from R10 to R12 -> (2 ÷ 10) × 100 = 20% inflation. Thabo must raise his kota price or suffer a loss.',
        'Step 3 (SARB Response): At 20% inflation, SARB INCREASES the Repo Rate to make borrowing expensive so spending slows and prices cool down.'
      ],
      finalAnswer:
        'Thabo repays R11 150 on his loan; ingredient inflation is 20%, prompting SARB to raise the Repo Rate.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: '4 Functions of Money (4 marks)',
        question: 'List the 4 functions of money. (4 marks)',
        answer:
          'Medium of exchange, Measure of value, Store of value, Standard of deferred payment.'
      },
      {
        number: 2,
        label: 'South Africa’s Central Bank (2 marks)',
        question: 'What is the name of SA’s Central Bank? What is its job? (2 marks)',
        answer:
          'South African Reserve Bank (SARB). It controls money supply, prints notes/coins, sets the repo/interest rate, supervises banks, and controls inflation.'
      },
      {
        number: 3,
        label: 'Defining Inflation (2 marks)',
        question: 'Define inflation. (2 marks)',
        answer: 'A general increase in prices over time, meaning money buys less.'
      },
      {
        number: 4,
        label: 'Calculating Prime Rate from Repo Rate (2 marks)',
        question: 'Repo Rate is 7.5%. What is Prime Rate? (2 marks)',
        answer: 'Prime Rate = 7.5% + 3.5% = 11%.'
      },
      {
        number: 5,
        label: 'SARB Action During High Inflation (3 marks)',
        question: 'Inflation is very high. What will SARB do to interest rate and why? (3 marks)',
        answer:
          'SARB will INCREASE the interest rate. Loans become expensive, so people borrow and spend less, demand falls, and prices stop rising rapidly.'
      },
      {
        number: 6,
        label: 'Simple Savings Interest Calculation',
        question: 'You save R5 000 at 10% interest for 1 year. How much will you have?',
        answer: 'Interest = R5 000 × 10% = R500. Total = R5 000 + R500 = R5 500.'
      }
    ]
  },
  {
    id: 'ncv-ee-l2-ch7-fiscal-policy-tax-spending',
    level: 2,
    chapterNumber: 7,
    chapterLabel: 'Level 2 • Chapter 7',
    displayHeading: 'Level 2 — Chapter 7: Fiscal Policy — Government, Tax & Spending',
    title: 'Fiscal Policy — Government, Tax & Spending',
    subtitle: 'Level 2 - NCV Economic Environment (Nexovian Original Series)',
    sections: [
      {
        heading: 'What Is Fiscal Policy? & Where Government Gets and Spends Money',
        paragraphs: [
          'Fiscal Policy is how Government uses TAX and SPENDING to control the economy. (Remember: Chapter 6 Monetary Policy = SARB + Interest Rate; Chapter 7 Fiscal Policy = Government + Tax & Spending.)',
          'Government collects revenue through Taxes and spends it on essential public services:'
        ],
        bullets: [
          '4 Main Taxes in SA: (1) Income Tax (on salaries—earn more, pay more), (2) VAT (15% Value Added Tax on most goods, including a R30 kota), (3) Company Tax (on business profit), and (4) Customs / Excise (on alcohol, cigarettes, petrol, and imports).',
          '5 Key Spending Areas: (1) Education (schools, NSFAS, teachers), (2) Health (hospitals, clinics), (3) Social Grants (child grant, old age pension), (4) Infrastructure (roads, water, electricity, houses), and (5) Police & Defence (SAPS, SANDF).'
        ]
      },
      {
        heading: 'The 3 Types of Budget & Expansionary vs Contractionary Policy (MEMORISE)',
        paragraphs: [
          'The Government Budget plans income vs spending for the year. Memorise the 3 budget outcomes and 2 fiscal policy directions:'
        ],
        bullets: [
          '1. Balanced Budget: Income = Spending (government spends exactly what it collects).',
          '2. Surplus Budget: Income > Spending (government saves money).',
          '3. Deficit Budget: Spending > Income (government must borrow money—South Africa mostly has a Deficit Budget).',
          'Expansionary Fiscal Policy (to GROW the economy when unemployment is high): Government SPENDS MORE + TAXES LESS -> people have more money -> buy more -> businesses grow -> more jobs.',
          'Contractionary / Restrictive Fiscal Policy (to SLOW DOWN high inflation): Government SPENDS LESS + TAXES MORE -> people have less money -> buy less -> prices cool down.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Fiscal Policy',
        definition: 'Government using taxation and public spending to influence the economy.'
      },
      {
        term: 'Tax',
        definition: 'Compulsory money collected by government from people and businesses.'
      },
      {
        term: 'VAT',
        definition: '15% Value Added Tax charged on most goods and services.'
      },
      {
        term: 'Budget',
        definition: 'Government’s annual financial plan of expected income and spending.'
      },
      {
        term: 'Deficit',
        definition: 'When government spending is greater than its tax income.'
      },
      {
        term: 'Surplus',
        definition: 'When government income is greater than its spending.'
      },
      {
        term: 'SARS',
        definition: 'South African Revenue Service — the agency that collects taxes in SA.'
      }
    ],
    workedExample: {
      title: 'Lerato’s Pay Slip, VAT at Shoprite & National Budget Deficit',
      scenario:
        'Lerato earns R10 000 per month (R1 000 Income Tax / PAYE + R100 UIF = R8 900 take-home), then buys R1 000 groceries at Shoprite. Also look at a National Budget where government collects R2 trillion in taxes and spends R2.5 trillion:',
      formulaBlock: `Lerato’s Double Tax Check:\n• Pay Slip: R10 000 − R1 000 (PAYE) − R100 (UIF) = R8 900 take-home\n• Shoprite Groceries (R1 000): Included VAT = R1 000 × 15 ÷ 115 = R130.43 to SARS\n\nNational Budget Check:\n• Tax Income = R2.0 trillion | Total Spending = R2.5 trillion\n  (includes Education R400bn, Health R300bn, Grants R250bn, Roads R200bn, Police R150bn, etc.)\n• Budget Deficit = R2.5 trillion − R2.0 trillion = R500 billion (must borrow)`,
      steps: [
        'Step 1 (Lerato’s Pay Slip & Grocery VAT): Lerato pays R1 000 PAYE on her salary AND R130.43 VAT on R1 000 of Shoprite groceries—paying tax twice (income and spending).',
        'Step 2 (National Budget Deficit): Spending R2.5 trillion while collecting R2.0 trillion leaves a R500 billion Deficit that government must borrow.',
        'Step 3 (Exam Question — "Government increases grants and cuts tax. What policy is this?"): Expansionary Fiscal Policy—puts more money into households’ hands so spending and the economy grow.'
      ],
      finalAnswer:
        'Lerato pays R1 000 PAYE + R130.43 VAT; the national budget shows a R500 billion Deficit; increasing grants while cutting tax is Expansionary Fiscal Policy.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Defining Fiscal Policy (2 marks)',
        question: 'Define Fiscal Policy. (2 marks)',
        answer: 'Government using taxation and spending to influence the economy.'
      },
      {
        number: 2,
        label: 'Types of Tax in South Africa (3 marks)',
        question: 'Name 3 types of tax in SA. (3 marks)',
        answer:
          'Any 3 of: Income Tax (PAYE), VAT (15%), Company Tax, and Customs / Excise duties on alcohol, cigarettes, and petrol.'
      },
      {
        number: 3,
        label: 'VAT Rate in South Africa (1 mark)',
        question: 'What is the VAT rate in SA? (1 mark)',
        answer: '15%.'
      },
      {
        number: 4,
        label: 'Budget Deficit vs Surplus Calculation (2 marks)',
        question:
          'Government income = R1 000 billion and spending = R1 200 billion. Is this a deficit or surplus? By how much? (2 marks)',
        answer: 'Deficit. Spending > Income by R200 billion (R1 200 billion − R1 000 billion).'
      },
      {
        number: 5,
        label: 'Fiscal Policy During High Inflation (3 marks)',
        question:
          'Inflation is high. What fiscal policy should government use? Explain. (3 marks)',
        answer:
          'Contractionary Fiscal Policy. Government increases tax and decreases spending so people have less money to spend, demand falls, and prices cool down.'
      },
      {
        number: 6,
        label: 'SA Tax Collection Agency',
        question: 'Who collects tax in SA?',
        answer: 'SARS — South African Revenue Service.'
      }
    ]
  },
  {
    id: 'ncv-ee-l2-ch8-trade-local-national-international',
    level: 2,
    chapterNumber: 8,
    chapterLabel: 'Level 2 • Chapter 8',
    displayHeading: 'Level 2 — Chapter 8: Trade — Local, National & International',
    title: 'Trade — Local, National & International',
    subtitle: 'Level 2 - NCV Economic Environment (Nexovian Original Series)',
    sections: [
      {
        heading: '3 Levels of Trade & Why Countries Trade',
        paragraphs: [
          'Trade means buying and selling goods and services. No country can make EVERYTHING (South Africa mines gold, while China manufactures iPhones), so regions and countries trade across 3 levels:'
        ],
        bullets: [
          '1. Local Trade (Inside your town): Buy kota in KaNyamazane, sell in Mbombela.',
          '2. National Trade (Between provinces inside SA): Mpumalanga sells oranges to Gauteng; Western Cape sells wine to Limpopo.',
          '3. International Trade (Between countries): SA sells gold to the USA and buys phones from China.',
          '4 Benefits of International Trade: (1) More choice (Chinese phone, German car), (2) Cheaper prices from competition, (3) Jobs in export factories, and (4) Foreign money from tourists and exports.'
        ]
      },
      {
        heading: 'Imports vs Exports & Balance of Trade (MEMORISE)',
        paragraphs: [
          'International trade tracks money flowing into and out of South Africa:'
        ],
        bullets: [
          'Exports: Goods SA SELLS to other countries — money COMES IN (gold, platinum, wine, cars, oranges).',
          'Imports: Goods SA BUYS from other countries — money GOES OUT (phones, oil/petrol, clothes, machines).',
          'Trade Surplus: Exports > Imports (Good — net money flows into SA).',
          'Trade Deficit: Imports > Exports (Bad — net money flows out of SA).'
        ]
      },
      {
        heading: 'Barriers to Trade & Exchange Rates (Weak vs Strong Rand)',
        paragraphs: [
          'Government uses trade barriers to protect local businesses and jobs so cheap imports do not force local factories to close. Meanwhile, the Exchange Rate measures what 1 unit of foreign currency costs in Rand (e.g. $1 = R18):'
        ],
        bullets: [
          '1. Tariffs / Customs Duty: Tax on imports to make them expensive (e.g. 30% tax on imported shoes so local shoes stay cheaper).',
          '2. Quotas: A limit on how many units can be imported (e.g. only 1 000 cars from China allowed).',
          '3. Embargo: A total ban on trade with a country (e.g. due to war).',
          'Rand WEAK / Depreciates ($1 = R20): Imports become expensive, exports look cheaper to foreign buyers (good for exporters, bad for local shoppers).',
          'Rand STRONG / Appreciates ($1 = R15): Imports become cheaper, exports become more expensive for foreigners.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Trade',
        definition: 'Buying and selling of goods and services.'
      },
      {
        term: 'Export',
        definition: 'Selling locally produced goods to another country (money comes in).'
      },
      {
        term: 'Import',
        definition: 'Buying goods from another country (money goes out).'
      },
      {
        term: 'Trade Surplus',
        definition: 'When total Exports are greater than total Imports.'
      },
      {
        term: 'Trade Deficit',
        definition: 'When total Imports are greater than total Exports.'
      },
      {
        term: 'Tariff',
        definition: 'Government tax placed on imported goods to protect local industry.'
      },
      {
        term: 'Quota',
        definition: 'A strict limit on the quantity of a good allowed to be imported.'
      },
      {
        term: 'Exchange Rate',
        definition: 'The value of one currency compared to another currency (e.g. $1 = R18).'
      }
    ],
    workedExample: {
      title: 'SA Monthly Trade Balance & iPhone Exchange Rate Test',
      scenario:
        'Look at South Africa’s monthly Exports vs Imports and see how a weakening Rand ($1 = R18 -> R20) changes the Rand price of a $1 000 US iPhone:',
      formulaBlock: `SA Trade in One Month:\n• Exports: Gold R50bn + Platinum R30bn + Cars R20bn    = R100 billion\n• Imports: Oil R40bn + Phones R30bn + Clothes R50bn = R120 billion\n• Trade Balance = R100bn − R120bn = −R20 billion -> TRADE DEFICIT\n\nExchange Rate Effect ($1 000 iPhone in USA):\n• At $1 = R18: $1 000 × R18 = R18 000\n• At $1 = R20: $1 000 × R20 = R20 000 (+R2 000 more expensive!)`,
      steps: [
        'Step 1 (Trade Balance Calculation): Exports (R100bn) minus Imports (R120bn) = −R20 billion. Because Imports > Exports, SA has a R20bn Trade Deficit—more money left SA than entered.',
        'Step 2 (Exchange Rate Impact): When the Rand weakens from R18 to R20 per $1, the exact same $1 000 iPhone jumps from R18 000 to R20 000.',
        'Step 3 (Consumer Impact): A weak Rand pushes up the Rand price of imported petrol and phones across South Africa.'
      ],
      finalAnswer:
        'SA has a Trade Deficit of R20 billion; when the Rand weakens from R18 to R20/$1, imported phones and petrol become more expensive.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Export vs Import With SA Examples (4 marks)',
        question: 'Define Export and Import, give 1 SA example each. (4 marks)',
        answer:
          'Export = Sell goods to another country, e.g. gold / platinum / wine. Import = Buy goods from another country, e.g. oil / phones / clothes.'
      },
      {
        number: 2,
        label: 'Calculating Trade Surplus or Deficit (2 marks)',
        question: 'Exports R80bn, Imports R60bn. Surplus or Deficit? By how much? (2 marks)',
        answer: 'Trade Surplus. Exports > Imports by R20 billion (R80bn − R60bn).'
      },
      {
        number: 3,
        label: 'Purpose of a Tariff (3 marks)',
        question: 'What is a tariff? Why does government use it? (3 marks)',
        answer:
          'A tariff is a tax on imports. Government uses it to make imports more expensive so local businesses and jobs are protected.'
      },
      {
        number: 4,
        label: 'Defining Exchange Rate (2 marks)',
        question: 'What is an exchange rate? (2 marks)',
        answer: 'The value of one currency compared to another currency, e.g. $1 = R18.'
      },
      {
        number: 5,
        label: 'Weakening Rand & Imported Petrol (2 marks)',
        question:
          'Rand goes from R18 to R20 per $1. Will imported petrol become cheaper or more expensive? Why? (2 marks)',
        answer:
          'More expensive. You need more Rands (R20 instead of R18) to buy the same $1 worth of imported petrol.'
      },
      {
        number: 6,
        label: 'Reasons Why Countries Trade (2 marks)',
        question: 'Give 2 reasons why countries trade. (2 marks)',
        answer:
          'Any 2 of: No country can produce everything, more consumer choice, cheaper prices through competition, job creation, or earning foreign currency.'
      }
    ]
  },
  {
    id: 'ncv-ee-l2-ch9-unemployment-poverty-economic-growth',
    level: 2,
    chapterNumber: 9,
    chapterLabel: 'Level 2 • Chapter 9',
    displayHeading: 'Level 2 — Chapter 9: Unemployment, Poverty & Economic Growth',
    title: 'Unemployment, Poverty & Economic Growth',
    subtitle: 'Level 2 - NCV Economic Environment (Nexovian Original Series)',
    sections: [
      {
        heading: 'What Is Unemployment? & The 4 Types of Unemployment (MEMORISE)',
        paragraphs: [
          'Unemployment means people who are able and willing to work, but cannot find a job. South Africa has one of the highest unemployment rates in the world, making this a favourite NCV exam topic. Memorise all 4 types:'
        ],
        bullets: [
          '1. Structural Unemployment: Your skills do not match jobs available (e.g. mines close and miners have no other skills; or a factory upgrades to computers while workers only know manual work).',
          '2. Cyclical Unemployment: Caused when the economy is DOWN in a recession (shops close and staff lose jobs; when growth returns, jobs come back).',
          '3. Seasonal Unemployment: Jobs exist only in certain seasons (e.g. farm workers busy during harvest, tourism workers busy in December).',
          '4. Frictional Unemployment: Short-term transition between jobs (you leave Job A while looking for Job B—normal and temporary).'
        ]
      },
      {
        heading: 'Poverty, Causes in SA & Measuring Economic Growth (GDP)',
        paragraphs: [
          'Poverty means not having enough money to meet basic needs—food, shelter, clothes, and schooling. Economic Growth means a country is producing MORE goods and services than before, measured by GDP (Gross Domestic Product) = total value of everything produced inside SA in 1 year.'
        ],
        bullets: [
          '4 Causes of Poverty in SA: (1) Unemployment, (2) Lack of education, (3) Low wages, and (4) Apartheid legacy (people historically denied opportunities).',
          'GDP UP = Economy Growing -> More jobs and higher incomes.',
          'GDP DOWN for 2 quarters in a row = Recession -> Jobs are lost.',
          '5 Ways to Reduce Unemployment & Poverty in SA: (1) Education & Skills (TVET colleges!), (2) Support SMMEs (small businesses create jobs), (3) Government infrastructure (roads, houses = jobs), (4) Foreign Investment (global firms hiring South Africans), and (5) Entrepreneurship (creating your own business).'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Unemployment',
        definition: 'People who are able and willing to work, but cannot find a job.'
      },
      {
        term: 'Poverty',
        definition: 'Not having enough income to meet basic needs (food, shelter, clothes, school).'
      },
      {
        term: 'GDP',
        definition: 'Total value of all goods and services produced inside a country in 1 year.'
      },
      {
        term: 'Recession',
        definition: 'When GDP falls for 2 consecutive quarters (6 months in a row).'
      },
      {
        term: 'Economic Growth',
        definition: 'An increase in a country’s GDP / total production over time.'
      },
      {
        term: 'SMME',
        definition: 'Small, Medium and Micro Enterprises that drive job creation.'
      }
    ],
    workedExample: {
      title: 'Thabo in Mbombela — Structural Unemployment, Poverty Line & GDP Growth',
      scenario:
        'Thabo finishes matric and searches for a job for 1 year (R0 income). Factories in Mbombela need electricians, while Thabo has no qualification yet:',
      formulaBlock: `Before TVET College:\n• Income R0 < Poverty Line R1 500/month -> Below Poverty Line (Poor)\n• Skills mismatch electrician jobs -> STRUCTURAL Unemployment\n\nAfter NCV Electrical Skills at TVET College:\n• Earns R8 000/month > Poverty Line R1 500 -> Out of Poverty\n• If 1 000 Thabos get skilled jobs & produce -> SA GDP goes UP -> ECONOMIC GROWTH`,
      steps: [
        'Step 1 (Identify the Unemployment Type & Poverty Status): Thabo is willing and able to work but lacks electrician skills -> Structural Unemployment. Earning R0 puts him below the R1 500/month poverty line.',
        'Step 2 (How TVET / NCV Breaks Poverty): Thabo completes his NCV qualification at TVET college, gets hired as an electrician assistant earning R8 000/month, pays food and rent, and moves well above the R1 500 poverty line.',
        'Step 3 (Macro Impact): When 1 000 graduates like Thabo enter skilled production, total output rises—pushing SA’s GDP upward (Economic Growth).'
      ],
      finalAnswer:
        'Skills training solves Thabo’s structural unemployment, lifts his income from R0 to R8 000 (above the R1 500 poverty line), and boosts GDP growth.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Defining Unemployment (2 marks)',
        question: 'Define unemployment. (2 marks)',
        answer: 'People who are able and willing to work, but cannot find a job.'
      },
      {
        number: 2,
        label: 'Explaining Types of Unemployment (6 marks)',
        question: 'Name and explain 3 types of unemployment. (6 marks)',
        answer:
          'Any 3 of: Structural — skills do not match available jobs; Cyclical — jobs lost because the economy is down/in recession; Seasonal — work only exists in certain seasons; Frictional — short-term transition between jobs.'
      },
      {
        number: 3,
        label: 'What Is GDP? (2 marks)',
        question: 'What is GDP? (2 marks)',
        answer: 'Total value of all goods and services produced in a country in one year.'
      },
      {
        number: 4,
        label: 'What Is a Recession? (2 marks)',
        question: 'What is a recession? (2 marks)',
        answer: 'When GDP falls for two quarters (6 months) in a row.'
      },
      {
        number: 5,
        label: 'Reducing Unemployment in SA (3 marks)',
        question: 'Give 3 ways government can reduce unemployment. (3 marks)',
        answer:
          'Any 3 of: Education and skills training (TVET colleges), supporting SMMEs, building public infrastructure, attracting foreign investment, or promoting entrepreneurship.'
      },
      {
        number: 6,
        label: 'Identifying Farm Worker Unemployment Type',
        question:
          'A farm worker only works during harvest time and has no job in winter. What type of unemployment is this?',
        answer: 'Seasonal unemployment.'
      }
    ]
  },
  {
    id: 'ncv-ee-l2-ch10-business-environment-entrepreneurship',
    level: 2,
    chapterNumber: 10,
    chapterLabel: 'Level 2 • Chapter 10',
    displayHeading: 'Level 2 — Chapter 10: Business Environment & Entrepreneurship',
    title: 'Business Environment & Entrepreneurship',
    subtitle: 'Level 2 - NCV Economic Environment (Nexovian Original Series)',
    sections: [
      {
        heading: 'The 3 Business Environments (100% EXAM TOPIC — MEMORISE)',
        paragraphs: [
          'The Business Environment is everything around a business that affects it—including factors a business controls and factors outside its control:'
        ],
        bullets: [
          '1. Micro Environment (INSIDE the business — YOU control it): Owner/Manager, Workers/Employees, Money/Capital, Machines/Equipment, and Products. Example: If workers are lazy, YOU can discipline or fire them.',
          '2. Market Environment (OUTSIDE, CLOSE — you influence a little): Customers, Suppliers, Competitors, Community. Example: If a competitor drops kota price to R20, you cannot control them directly, but you can react and compete.',
          '3. Macro Environment (FAR OUTSIDE — CANNOT control): Remember PESTLE -> Political (laws, government, elections), Economic (inflation, interest rate, unemployment, recession), Social (culture, fashion, population, crime), Technological (new machines, cellphones, social media), Legal (labour law, tax law, health & safety), and Environmental (weather, drought, load shedding, pollution—you cannot stop Eskom, so buy a gas stove!).'
        ]
      },
      {
        heading: 'Entrepreneurship & Forms of Business Ownership',
        paragraphs: [
          'An Entrepreneur is a person who sees an opportunity, takes risk, and starts a business to make profit.',
          'Know both the 5 qualities of a good entrepreneur and the 4 common forms of business ownership in South Africa:'
        ],
        bullets: [
          '5 Qualities of a Good Entrepreneur: (1) Risk-taker (not afraid to try), (2) Hardworking (works long hours), (3) Creative (finds new ideas), (4) Good with money (budgets & saves), and (5) Resilient (never gives up).',
          '1. Sole Trader (1 owner, e.g. your spaza shop): Easy to start, keeps all profit—but if the business owes money, YOU personally owe that money.',
          '2. Partnership (2–20 owners): Share profit and share risk.',
          '3. Close Corporation (CC): Older SA business form that still exists.',
          '4. Private Company — (Pty) Ltd: Larger business whose owners are shareholders, e.g. Shoprite (Pty) Ltd.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Micro Environment',
        definition: 'Factors inside the business that the owner directly controls (staff, capital, equipment).'
      },
      {
        term: 'Market Environment',
        definition: 'Close external environment including customers, competitors, and suppliers.'
      },
      {
        term: 'Macro Environment',
        definition: 'Wide external forces outside business control, remembered via PESTLE.'
      },
      {
        term: 'Entrepreneur',
        definition: 'A person who spots an opportunity, takes risk, and starts a business for profit.'
      },
      {
        term: 'Sole Trader',
        definition: 'A business owned and controlled by one person.'
      },
      {
        term: 'Partnership',
        definition: 'A business owned by 2 to 20 partners sharing profit and risk.'
      },
      {
        term: 'Pty Ltd',
        definition: 'Private company owned by shareholders (e.g. Shoprite (Pty) Ltd).'
      }
    ],
    workedExample: {
      title: 'Naledi’s Kota Business in Mbombela — Micro, Market & Macro (PESTLE)',
      scenario:
        'Naledi notices hungry taxi drivers in Mbombela, risks her R5 000 savings to start a kota stall, generates R10 000 revenue at R6 000 cost (Profit = R4 000), and navigates all 3 environments:',
      formulaBlock: `• Micro Environment (Control):  Naledi (owner), brother (worker), R5 000 capital, gas stove\n• Market Environment (React):   Customers = taxi drivers | Flour supplier | 3 rival kota sellers\n• Macro Environment (PESTLE):\n   P (Political):     Health certificate rule for food sellers\n   E (Economic):      Inflation raises flour price from R200 to R300\n   S (Social):        Buyers trend toward spicy kota\n   T (Technological): TikTok adverts bring more customers\n   L (Legal):         Must register for tax with SARS\n   E (Environmental): Load shedding -> uses gas instead of electricity\n\nProfit Check: Revenue R10 000 − Cost R6 000 = Profit R4 000`,
      steps: [
        'Step 1 (Micro & Market): Naledi controls her Micro resources (R5 000, gas stove, brother’s shifts) and reacts daily to her Market environment (taxi drivers, town flour supplier, 3 competitors).',
        'Step 2 (Macro PESTLE Adaptation): She cannot stop inflation, SARS tax laws, or Eskom load shedding—so she obeys health/SARS rules, buys a gas stove, rides the spicy kota trend, and advertises on TikTok.',
        'Step 3 (Entrepreneurship & Profit): She spotted an opportunity, took risk with R5 000, and earned R10 000 − R6 000 = R4 000 profit.'
      ],
      finalAnswer:
        'Naledi manages Micro directly, competes in Market, adapts to all 6 Macro PESTLE forces, and earns R4 000 profit.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: '3 Business Environments With Examples (6 marks)',
        question: 'Name the 3 business environments and give 1 example of each. (6 marks)',
        answer:
          'Micro — workers / owner / equipment. Market — customers / competitors / suppliers. Macro — inflation / load shedding / government law.'
      },
      {
        number: 2,
        label: 'What Does PESTLE Stand For? (6 marks)',
        question: 'What does PESTLE stand for? (6 marks)',
        answer: 'Political, Economic, Social, Technological, Legal, Environmental.'
      },
      {
        number: 3,
        label: 'Entrepreneur Definition & Qualities (4 marks)',
        question: 'Define entrepreneur and give 2 qualities. (4 marks)',
        answer:
          'A person who sees an opportunity, takes risk, and starts a business for profit. Qualities (any 2): hardworking, risk-taker, creative, good with money, resilient.'
      },
      {
        number: 4,
        label: 'Sole Trader vs Partnership (2 marks)',
        question: 'Give 2 differences between a Sole Trader and a Partnership. (2 marks)',
        answer:
          '1) Sole Trader has 1 owner, while Partnership has 2–20 owners. 2) A Sole Trader keeps all profit (and risk), while Partners share profits and risk.'
      },
      {
        number: 5,
        label: 'Load Shedding Environment & Control',
        question:
          'Load shedding affects Naledi’s business. Which environment is this and can she control it?',
        answer:
          'Macro Environment (Environmental / Infrastructure factor). No, she cannot control Eskom or load shedding—she must adapt (e.g. using a gas stove).'
      },
      {
        number: 6,
        label: 'Competitor Price Drop Environment',
        question: 'Your competitor drops their price. Which environment is this?',
        answer: 'Market Environment — Competitors.'
      }
    ]
  },
  {
    id: 'ncv-ee-l3-ch1-circular-flow-of-income',
    level: 3,
    chapterNumber: 1,
    chapterLabel: 'Level 3 • Chapter 1',
    displayHeading: 'Level 3 — Chapter 1: The Circular Flow of Income',
    title: 'The Circular Flow of Income',
    subtitle: 'Level 3 - NCV Economic Environment (Nexovian Original Series)',
    sections: [
      {
        heading: 'What Is the Circular Flow? & The 4 Players (MEMORISE)',
        paragraphs: [
          'The Circular Flow shows how money, goods, and services move in a continuous circle through the economy—money never stops circulating.',
          'Memorise the 4 main participants in the circular flow:'
        ],
        bullets: [
          '1. Households: You and me—we own the factors of production (we supply labour) and buy goods.',
          '2. Businesses / Firms: Shops and factories—they produce goods/services and hire workers.',
          '3. Government: SARS, schools, hospitals—collects taxes and spends on public services.',
          '4. Foreign Sector: Other countries—we export goods to them and import goods from them.'
        ]
      },
      {
        heading: 'The 2-Market Model: Real Flow vs Money Flow',
        paragraphs: [
          'In the simplest model (Households + Businesses only), two flows move in opposite directions. Example: You work at Shoprite (Labour), Shoprite pays you R5 000 (Income), and you buy food at Shoprite (Expenditure)—the circle continues:'
        ],
        bullets: [
          'Flow 1 — Real Flow (Goods & Services): Households give Labour to Businesses; Businesses give Goods & Services to Households.',
          'Flow 2 — Money Flow (Opposite Direction): Businesses pay Wages / Rent / Profit to Households (Income); Households pay Businesses for goods (Expenditure / Spending).'
        ]
      },
      {
        heading: 'The 4-Market Model: Leakages vs Injections (GOLDEN EXAM RULE)',
        paragraphs: [
          'In the full Level 3 model, we add Government, the Foreign Sector, and the Financial Sector (Banks):'
        ],
        formulaBlock: `LEAKAGES (Money LEAVING the circle):\n• Savings (S):  Households save in banks instead of spending\n• Taxes (T):    Households & firms pay tax to government\n• Imports (M):  Buying foreign goods -> money leaves SA\n\nINJECTIONS (Money ENTERING the circle):\n• Investment (I):          Firms borrow from banks to expand/build factories\n• Government Spending (G): Government builds roads, schools, pays grants\n• Exports (X):             Foreigners buy SA goods -> money comes IN\n\nGOLDEN RULE FOR EXAM:\n• Injections > Leakages  -> Economy GROWS\n• Leakages > Injections  -> Economy SHRINKS\n• Injections = Leakages  -> Economy BALANCED (Equilibrium)`
      }
    ],
    keyTerms: [
      {
        term: 'Circular Flow',
        definition: 'Continuous movement of money, goods, and services between households, firms, government, and the foreign sector.'
      },
      {
        term: 'Household',
        definition: 'People who own factors of production (labour) and consume goods and services.'
      },
      {
        term: 'Firm / Business',
        definition: 'Producers that hire factors of production and sell goods and services.'
      },
      {
        term: 'Leakage',
        definition: 'Money leaving the circular flow: Savings (S), Taxes (T), and Imports (M).'
      },
      {
        term: 'Injection',
        definition: 'Money entering the circular flow: Investment (I), Government Spending (G), and Exports (X).'
      },
      {
        term: 'Equilibrium',
        definition: 'When total Injections equal total Leakages in the circular flow.'
      }
    ],
    workedExample: {
      title: 'Mbombela Circular Flow — Calculating Leakages vs Injections',
      scenario:
        'Sipho (Household) works at an Orange Farm (Firm) in Mbombela for a R6 000 wage. Trace his Leakages vs the Injections happening in the same month:',
      formulaBlock: `LEAKAGES (Money Out):\n• Sipho saves in Capitec (Savings):       R1 000\n• Sipho pays tax to SARS (Tax):           R500\n• Sipho buys Chinese phone (Import):    R2 000\nTotal Leakages = R1 000 + R500 + R2 000 = R3 500\n\nINJECTIONS (Money In):\n• Gov builds road & pays workers (G):   R4 000\n• Farm borrows for new tractor (I):     R2 000\n• USA buys SA oranges (Export X):       R3 000\nTotal Injections = R4 000 + R2 000 + R3 000 = R9 000\n\nResult: Injections (R9 000) > Leakages (R3 500) -> ECONOMY GROWS!`,
      steps: [
        'Step 1 (Total Leakages): R1 000 (Savings) + R500 (Tax) + R2 000 (Import from China) = R3 500 leaving the local spending circle.',
        'Step 2 (Total Injections): R4 000 (Gov road spending) + R2 000 (Farm tractor investment) + R3 000 (Orange exports to USA) = R9 000 entering the circle.',
        'Step 3 (Compare & Exam Follow-Up): R9 000 Injections > R3 500 Leakages -> Economy GROWS with more money circulating and more jobs. If households save too much, Leakages rise, less money circulates, firms sell less, and the economy shrinks.'
      ],
      finalAnswer:
        'Total Injections (R9 000) exceed Total Leakages (R3 500) by R5 500, so the economy grows.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: '4 Circular Flow Participants (4 marks)',
        question: 'Name the 4 participants in the circular flow. (4 marks)',
        answer: 'Households, Businesses/Firms, Government, and Foreign Sector.'
      },
      {
        number: 2,
        label: '3 Leakages and 3 Injections (6 marks)',
        question: 'Name the 3 leakages and 3 injections. (6 marks)',
        answer:
          'Leakages: Savings (S), Taxes (T), Imports (M). Injections: Investment (I), Government Spending (G), Exports (X).'
      },
      {
        number: 3,
        label: 'Real Flow vs Money Flow (2 marks)',
        question: 'What is the difference between Real Flow and Money Flow? (2 marks)',
        answer:
          'Real Flow = movement of goods, services, and labour/factors. Money Flow = movement of money (wages/income and spending/expenditure) in the opposite direction.'
      },
      {
        number: 4,
        label: 'Injections vs Leakages Outcome (2 marks)',
        question:
          'Injections = R10 000 and Leakages = R15 000. What happens to the economy? (2 marks)',
        answer:
          'The economy shrinks because Leakages (R15 000) > Injections (R10 000), leaving less money circulating.'
      },
      {
        number: 5,
        label: 'Government School Spending Classification (2 marks)',
        question:
          'Government increases spending on schools. Is this a leakage or an injection? Why? (2 marks)',
        answer: 'Injection. Government spending puts new money INTO the circular flow.'
      },
      {
        number: 6,
        label: 'Imported Clothes Classification (2 marks)',
        question:
          'Households buy more imported clothes. Is this a leakage or an injection? (2 marks)',
        answer: 'Leakage. Buying imports sends money OUT of South Africa.'
      }
    ]
  },
  {
    id: 'ncv-ee-l3-ch2-national-income-and-gdp',
    level: 3,
    chapterNumber: 2,
    chapterLabel: 'Level 3 • Chapter 2',
    displayHeading: 'Level 3 — Chapter 2: National Income & GDP',
    title: 'National Income & GDP',
    subtitle: 'Level 3 - NCV Economic Environment (Nexovian Original Series)',
    sections: [
      {
        heading: 'What Is National Income & GDP? (Most Important Term in Level 3)',
        paragraphs: [
          'National Income is the total income earned by EVERYONE in the country in 1 year. When you add all wages + rent + interest + profit earned across South Africa, you get National Income.',
          'GDP (Gross Domestic Product) is the total value of ALL goods and services produced INSIDE South Africa in 1 year.',
          'Example: If South Africa produces R5 trillion worth of cars, gold, maize, haircuts, and kotas in 1 year, then GDP = R5 trillion.'
        ]
      },
      {
        heading: 'Difference Between GDP and GNP (Exam Favourite)',
        paragraphs: [
          'Examiners frequently test whether you know the difference between WHERE production happens (Domestic) and WHO produces it (National):'
        ],
        bullets: [
          "GDP (Gross Domestic Product): What is produced INSIDE South Africa, even if produced by foreigners. Example: A Chinese factory in Joburg produces phones -> counts in SA's GDP because it is inside SA.",
          "GNP (Gross National Product): What is produced BY South Africans, even if outside South Africa. Example: A South African working in Dubai sends money home -> counts in SA's GNP because he is South African, NOT in GDP because it is outside SA."
        ]
      },
      {
        heading: '3 Ways to Measure GDP (Memorise)',
        paragraphs: [
          'Economists measure GDP in three ways that all describe the same economy. Remember all three methods and especially the Expenditure formula:'
        ],
        bullets: [
          '1. Production Method: Add the value of everything produced by all industries — farming + mining + factories + services.',
          '2. Income Method: Add all incomes earned — Wages + Rent + Interest + Profit.',
          '3. Expenditure Method: Add all spending in the economy using the exam formula below.'
        ],
        formulaBlock: `GDP = C + I + G + (X - M)

• C = Consumption: What households spend (food, clothes, rent)
• I = Investment: What businesses spend (machines, factories)
• G = Government Spending: Roads, schools, hospitals
• X = Exports: Foreigners buying from SA (money comes in)
• M = Imports: SA buying from foreigners (MINUS because money leaves)`
      },
      {
        heading: 'Nominal GDP vs Real GDP & GDP per Capita',
        paragraphs: [
          'Price increases (inflation) can make GDP look bigger even when the country has not produced more goods. That is why we distinguish between Nominal and Real GDP:',
          'Oranges Example: SA produces 100 oranges. Last year orange = R10, so GDP = R1,000. This year orange = R20 (inflation), so Nominal GDP = R2,000. Nominal doubled, yet we still have only 100 oranges! Real GDP is still R1,000 — meaning NO real growth.'
        ],
        bullets: [
          'Nominal GDP: GDP measured with CURRENT prices — includes inflation. Looks bigger, not real growth.',
          'Real GDP: GDP measured with OLD / constant prices — removes inflation. This shows TRUE growth.',
          'GDP per Capita = GDP / Population: Shows average income per person. Example: GDP R5 trillion / 60 million people = R83,333 per person per year.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'GDP',
        definition: 'Total value of all goods & services produced inside a country in 1 year.'
      },
      {
        term: 'GNP',
        definition: 'Total value produced by citizens of a country, wherever they are in the world.'
      },
      {
        term: 'National Income',
        definition: 'Total income earned in a country (wages + rent + interest + profit).'
      },
      {
        term: 'Nominal GDP',
        definition: 'GDP measured at current prices with inflation included.'
      },
      {
        term: 'Real GDP',
        definition: 'GDP measured at constant prices with inflation removed — shows true growth.'
      },
      {
        term: 'GDP per Capita',
        definition: 'GDP divided by total population (average income per person).'
      }
    ],
    workedExample: {
      title: 'South Africa GDP (Expenditure Method) & GDP per Capita',
      scenario:
        'Use the annual South African spending figures below to calculate GDP, Net Exports, and GDP per Capita (Population = 60 million): Households spend (C) = R3,000 billion; Businesses invest (I) = R1,000 billion; Government spends (G) = R1,500 billion; Exports (X) = R1,800 billion; Imports (M) = R1,300 billion.',
      formulaBlock: `GDP = C + I + G + (X - M)
    = 3,000 + 1,000 + 1,500 + (1,800 - 1,300)
    = 5,500 + 500
    = R6,000 billion = R6 trillion

Net Exports = X - M = 1,800 - 1,300 = R500 billion (Surplus)

GDP per Capita = GDP / Population
               = R6,000,000,000,000 / 60,000,000
               = R100,000 per person per year (R8,333/month average)`,
      steps: [
        'Step 1 (Net Exports): X - M = R1,800 billion - R1,300 billion = R500 billion trade surplus.',
        'Step 2 (Total GDP): Add C (R3,000b) + I (R1,000b) + G (R1,500b) + Net Exports (R500b) = R6,000 billion (R6 trillion).',
        'Step 3 (GDP per Capita & Inequality Caution): R6,000,000,000,000 / 60,000,000 people = R100,000 per person per year (R8,333 per month average). Remember, some earn R100k and some earn R0 — an average hides inequality.'
      ],
      finalAnswer:
        'GDP = R6,000 billion (R6 trillion), Net Exports = R500 billion surplus, and GDP per Capita = R100,000 per person per year (R8,333 per month average).'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Define GDP (2 marks)',
        question: 'Define GDP. (2 marks)',
        answer: 'Total value of all goods and services produced inside a country in one year.'
      },
      {
        number: 2,
        label: 'Expenditure Formula & Symbols (5 marks)',
        question: 'Write the expenditure formula for GDP and explain each letter. (5 marks)',
        answer:
          'GDP = C + I + G + (X - M). C = Consumption (household spending), I = Investment (business spending), G = Government spending, X = Exports, M = Imports.'
      },
      {
        number: 3,
        label: 'GDP vs GNP Difference (2 marks)',
        question: 'What is the difference between GDP and GNP? (2 marks)',
        answer:
          'GDP = produced INSIDE the country (even by foreigners). GNP = produced BY citizens of the country (even outside the country).'
      },
      {
        number: 4,
        label: 'Calculate GDP — Expenditure Method (3 marks)',
        question: 'C = R2,000, I = R500, G = R800, X = R600, M = R400. Calculate GDP. (3 marks)',
        answer: 'GDP = 2,000 + 500 + 800 + (600 - 400) = 3,300 + 200 = R3,500.'
      },
      {
        number: 5,
        label: 'Nominal vs Real GDP (2 marks)',
        question: 'What is the difference between Nominal and Real GDP? (2 marks)',
        answer:
          'Nominal GDP includes inflation (measured at current prices), while Real GDP removes inflation (constant prices) and shows true growth.'
      },
      {
        number: 6,
        label: 'Limitation of GDP per Capita (2 marks)',
        question: 'Why is GDP per capita not a perfect measure of living standard? (2 marks)',
        answer:
          'It is an average that hides inequality — high earners pull the average up while poor people remain poor.'
      }
    ]
  },
  {
    id: 'ncv-ee-l3-ch3-inflation-and-unemployment-in-depth',
    level: 3,
    chapterNumber: 3,
    chapterLabel: 'Level 3 • Chapter 3',
    displayHeading: 'Level 3 — Chapter 3: Inflation & Unemployment in Depth',
    title: 'Inflation & Unemployment in Depth',
    subtitle: 'Level 3 - NCV Economic Environment (Nexovian Original Series)',
    sections: [
      {
        heading: 'What Is Inflation & How Do We Measure It? (CPI)',
        paragraphs: [
          'In Level 2 you learned WHAT inflation is. In Level 3 you learn WHY it happens, HOW we measure it, and HOW it hurts.',
          'Inflation is the general and continuous rise in prices over time — so your money buys LESS.',
          'In South Africa, Stats SA measures inflation using the CPI (Consumer Price Index). Every month Stats SA checks prices of a basket of everyday goods: bread, petrol, rent, kota ingredients, taxi fare, and clothes.',
          'SARB Target: The South African Reserve Bank aims to keep inflation between 3% and 6%. If inflation rises above 6%, SARB acts (typically by raising interest rates).'
        ],
        formulaBlock: `Inflation Rate = ((New Basket - Old Basket) / Old Basket) × 100

Example: Basket cost R1,000 last year and R1,060 this year:
Inflation = ((1,060 - 1,000) / 1,000) × 100 = 6%`
      },
      {
        heading: '3 Causes of Inflation (Memorise)',
        paragraphs: [
          'Examiners test whether you can identify the three main causes of rising prices from real South African scenarios:'
        ],
        bullets: [
          '1. Demand-Pull Inflation: Too much money chasing too few goods. Example: Everyone gets a SASSA increase at the same time, rushes to buy kotas, the seller runs out, and raises the price from R30 to R40 — demand pulled the price up.',
          '2. Cost-Push Inflation: The cost of making goods goes UP, so the seller pushes prices up. Example: Petrol goes up -> taxi fare goes up -> flour delivery goes up -> kota price goes up (or Eskom increases electricity, so a factory raises prices). Cost pushed the price up.',
          '3. Imported Inflation: A weak Rand makes imported goods expensive. Example: $1 weakens from R18 to R20. Oil imported in dollars becomes more expensive -> petrol goes up -> everything goes up.'
        ]
      },
      {
        heading: 'Effects of Inflation — Who Loses & Who Wins?',
        paragraphs: [
          'Inflation hurts most everyday households, but a few groups can benefit when prices rise rapidly:'
        ],
        bullets: [
          'LOSERS — People on FIXED income: Pensioners get R2,000, but bread prices rise, so they buy less.',
          'LOSERS — Savers: R10,000 sitting in a bank buys less next year.',
          'LOSERS — Workers: Workers become poorer if wages do not rise as fast as prices.',
          'WINNERS — Borrowers: You borrowed R10,000, and you pay it back later with money that is worth less.',
          'WINNERS — Business owners: They can raise their selling prices.'
        ]
      },
      {
        heading: 'Unemployment in Depth & Relationship With Inflation',
        paragraphs: [
          'Labour Force = Employed + Unemployed (everyone willing and able to work). We calculate the official rate using the formula below:',
          'Relationship Between Inflation & Unemployment: Sometimes when unemployment is LOW (everyone is working and spending), inflation rises HIGH (demand-pull). When unemployment is HIGH (no jobs, less spending), inflation stays LOW. Government must balance both — a hard job!'
        ],
        bullets: [
          'Effect 1: Poverty increases.',
          'Effect 2: Crime increases.',
          'Effect 3: Government collects less tax and must spend more on social grants.',
          'Effect 4: People lose their skills and hope.'
        ],
        formulaBlock: `Unemployment Rate = (Unemployed / Labour Force) × 100
Labour Force = Employed + Unemployed

Example: Labour Force = 20 million, Unemployed = 8 million
Rate = (8 / 20) × 100 = 40%`
      }
    ],
    keyTerms: [
      {
        term: 'Inflation',
        definition: 'General continuous rise in prices over time, causing money to lose purchasing value.'
      },
      {
        term: 'CPI',
        definition: 'Consumer Price Index — the basket of goods Stats SA tracks monthly to measure inflation.'
      },
      {
        term: 'Demand-Pull',
        definition: 'Inflation caused by too much demand chasing too few goods, pulling prices up.'
      },
      {
        term: 'Cost-Push',
        definition: 'Inflation caused when rising production or transport costs push selling prices up.'
      },
      {
        term: 'Imported Inflation',
        definition: 'Inflation caused when a weak Rand makes imported fuel, parts, or goods more expensive.'
      },
      {
        term: 'Unemployment Rate',
        definition: 'Percentage of the Labour Force that is unemployed: (Unemployed / Labour Force) × 100.'
      }
    ],
    workedExample: {
      title: 'CPI Inflation, Mbombela Unemployment & Cost-Push Scenario',
      scenario:
        '1) CPI Basket: 2024 Basket = Bread R20 + Milk R30 + Petrol R100 + Rent R1,000 = R1,150; 2025 Basket = Bread R22 + Milk R33 + Petrol R110 + Rent R1,100 = R1,265.\n2) Mbombela Labour Force: Employed = 300,000, Unemployed = 200,000.\n3) Scenario: Petrol rises from R22 to R25 -> taxi driver raises fare from R15 to R20 -> kota seller raises kota from R30 to R35.',
      formulaBlock: `1) CPI Inflation Rate:
Inflation = ((1,265 - 1,150) / 1,150) × 100
          = (115 / 1,150) × 100
          = 10%  (WAY above SARB 3%–6% target -> SARB INCREASES interest rate!)

2) Mbombela Unemployment Rate:
Labour Force = 300,000 + 200,000 = 500,000
Rate = (200,000 / 500,000) × 100 = 40%

3) Scenario Diagnosis:
Petrol R22->R25 -> Taxi R15->R20 -> Kota R30->R35 = COST-PUSH INFLATION`,
      steps: [
        'Step 1 (CPI Calculation): Subtract R1,150 from R1,265 = R115 increase. Divide R115 / R1,150 × 100 = 10%. Since 10% is well above SARB’s 3%–6% target, SARB will INCREASE the interest rate.',
        'Step 2 (Mbombela Unemployment): Add Employed (300,000) + Unemployed (200,000) = 500,000 Labour Force. Then 200,000 / 500,000 × 100 = 40%.',
        'Step 3 (Identify Inflation Type): Rising petrol costs raised transport and input expenses, pushing taxi fares and kota prices higher — Cost-Push Inflation.'
      ],
      finalAnswer:
        'CPI Inflation = 10% (above SARB 3%–6% target, triggering an interest rate hike); Mbombela Unemployment Rate = 40%; Scenario = Cost-Push Inflation.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Define Inflation and CPI (4 marks)',
        question: 'Define inflation and CPI. (4 marks)',
        answer:
          'Inflation = general, continuous rise in prices over time (money buys less). CPI = Consumer Price Index, the basket of goods used by Stats SA to measure inflation.'
      },
      {
        number: 2,
        label: '3 Causes of Inflation (6 marks)',
        question: 'Name and explain 3 causes of inflation. (6 marks)',
        answer:
          '1) Demand-Pull: too much demand chasing too few goods. 2) Cost-Push: rising production/transport costs push prices up. 3) Imported Inflation: weak Rand makes imports expensive.'
      },
      {
        number: 3,
        label: 'Calculate CPI Inflation (2 marks)',
        question: 'Calculate inflation: Basket last year R2,000, this year R2,200. (2 marks)',
        answer: '((2,200 - 2,000) / 2,000) × 100 = (200 / 2,000) × 100 = 10%.'
      },
      {
        number: 4,
        label: '2 Negative Effects of Inflation (2 marks)',
        question: 'Give 2 negative effects of inflation. (2 marks)',
        answer:
          'Any two: Fixed-income earners (like pensioners) buy less, savers lose real value on savings, or workers become poorer when wages do not keep up with rising prices.'
      },
      {
        number: 5,
        label: 'Calculate Unemployment Rate (2 marks)',
        question: 'Labour Force = 10 million, Unemployed = 3 million. Calculate unemployment rate. (2 marks)',
        answer: '(3 / 10) × 100 = 30%.'
      },
      {
        number: 6,
        label: 'Identify Grant-Driven Inflation Type (2 marks)',
        question:
          'If government gives everyone R1,000 grant and everyone rushes to shops and prices rise, what type of inflation is this?',
        answer: 'Demand-Pull Inflation (too much spending chasing limited goods).'
      }
    ]
  },
  {
    id: 'ncv-ee-l3-ch4-government-and-fiscal-policy-in-depth',
    level: 3,
    chapterNumber: 4,
    chapterLabel: 'Level 3 • Chapter 4',
    displayHeading: 'Level 3 — Chapter 4: Government & Fiscal Policy in Depth',
    title: 'Government & Fiscal Policy in Depth',
    subtitle: 'Level 3 - NCV Economic Environment (Nexovian Original Series)',
    sections: [
      {
        heading: 'Role of Government in the Economy (4 Core Roles)',
        paragraphs: [
          'In Level 2 you learned that government taxes and spends. In Level 3 you learn HOW government borrows, WHY it builds up debt, and the fiscal tools it uses.',
          'Government plays 4 essential roles in South Africa’s mixed economy:'
        ],
        bullets: [
          "1. Provider: Provides services private businesses will not supply for profit — roads, police, schools, and hospitals.",
          '2. Regulator: Makes and enforces laws — minimum wage, health & safety, and competition law.',
          '3. Redistributor: Takes from the rich (taxes) and gives to the poor (social grants) to reduce inequality.',
          '4. Stabiliser: Uses fiscal policy to keep the economy stable — not too hot (high inflation) and not too cold (recession).'
        ]
      },
      {
        heading: 'Government Revenue & Progressive vs Regressive Tax (Exam Favourite)',
        paragraphs: [
          'Government collects revenue through Direct Taxes (on income or wealth — you feel it directly) and Indirect Taxes (on spending — hidden in the price):'
        ],
        bullets: [
          'Direct Taxes: Income Tax (PAYE) on salaries, Company Tax (27% on company profit), and Capital Gains Tax when selling property for profit.',
          'Indirect Taxes: VAT (15% on most goods), Excise Duty (alcohol, tobacco, fuel), and Customs Duty (on imports).',
          'Progressive Tax: Rich pay a HIGHER % than the poor. Example: Income Tax — earn R5,000 = 0% tax; earn R100,000 = 36% tax. Fair.',
          'Regressive Tax: Poor pay a HIGHER % of their income than the rich. Example: VAT — both rich and poor pay 15% on bread. For a poor person it takes a big chunk of income; for a rich person it is tiny.'
        ]
      },
      {
        heading: 'Government Spending, Budget Deficit, National Debt & Debt Trap',
        paragraphs: [
          'Government splits its spending into Current Spending (day-to-day running costs) and Capital Spending (long-term assets):',
          'If government spends MORE than it earns in one year, it runs a Budget Deficit and must BORROW by selling Government Bonds (the public/investors buy bonds and government pays them interest later).',
          'If government keeps borrowing year after year, debt piles up into National Debt. The danger is a Debt Trap: government must pay huge interest on past debt, leaving less money for schools and hospitals.'
        ],
        bullets: [
          '1. Current Spending (Day-to-day): Salaries for teachers, nurses, and police, plus social grants and medicine.',
          '2. Capital Spending (Long-term investment): Building new schools, roads, dams, and power stations — creates jobs and future growth.'
        ]
      },
      {
        heading: 'Fiscal Policy Tools & Automatic Stabilisers (Level 3 Depth)',
        paragraphs: [
          'Government adjusts taxes and spending intentionally to steer the economy, while Automatic Stabilisers also cushion economic swings without any new law:'
        ],
        bullets: [
          'Expansionary Fiscal Policy (Grow economy): Decrease Tax (↓ Tax) and Increase Spending (↑ Spending). People have more money -> used during a RECESSION or HIGH unemployment.',
          'Contractionary Fiscal Policy (Cool economy): Increase Tax (↑ Tax) and Decrease Spending (↓ Spending). People have less money -> used when INFLATION is high.',
          'Automatic Stabilisers (In Recession): More people qualify for grants and fewer people pay income tax automatically — helping stabilise demand.',
          'Automatic Stabilisers (In Boom): More people earn and pay tax while fewer claim grants — automatically cooling the boom.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Direct Tax',
        definition: 'Tax charged directly on income or wealth (e.g. Income Tax / PAYE).'
      },
      {
        term: 'Indirect Tax',
        definition: 'Tax charged on spending and included in prices (e.g. 15% VAT).'
      },
      {
        term: 'Progressive Tax',
        definition: 'Tax system where higher-income earners pay a higher percentage than low-income earners.'
      },
      {
        term: 'Regressive Tax',
        definition: 'Tax system where lower-income earners pay a higher percentage of their income than rich earners.'
      },
      {
        term: 'Budget Deficit',
        definition: 'When government spending exceeds government income in a single financial year.'
      },
      {
        term: 'National Debt',
        definition: 'Total accumulated amount government owes from all years of borrowing.'
      },
      {
        term: 'Government Bond',
        definition: 'A loan to government where investors receive interest and repayment later.'
      },
      {
        term: 'Fiscal Policy',
        definition: 'Government using taxation and government spending to influence and stabilise the economy.'
      }
    ],
    workedExample: {
      title: 'National Budget Deficit, Bond Interest & Regressive VAT Proof',
      scenario:
        'Part A (Budget): Income = Income Tax R800b + VAT R500b + Company Tax R300b. Spending = Current (salaries & grants) R1,500b + Capital (roads & schools) R400b. Debt interest rate = 10%.\nPart B (VAT Fairness): Sipho earns R8,000/month and spends R6,000 on VAT-inclusive goods (VAT = R782.61). Thandi earns R80,000/month and spends R30,000 (VAT = R3,913).',
      formulaBlock: `PART A — BUDGET DEFICIT & INTEREST COST:
Total Income   = 800 + 500 + 300 = R1,600 billion
Total Spending = 1,500 + 400     = R1,900 billion
Budget Deficit = R1,900b - R1,600b = R300 billion (borrowed via bonds)
Next Year Interest (10% of R300b) = R30 billion (money lost from schools!)

PART B — WHY VAT IS REGRESSIVE:
• Sipho (R8,000/mo):  R782.61 / R8,000 = 9.7% of his salary goes to VAT
• Thandi (R80,000/mo): R3,913 / R80,000 = 4.8% of her salary goes to VAT
Thandi pays more Rands, but Sipho pays a bigger % -> VAT is REGRESSIVE!`,
      steps: [
        'Step 1 (Total Revenue vs Spending): Income = R800b + R500b + R300b = R1,600 billion. Spending = R1,500b + R400b = R1,900 billion.',
        'Step 2 (Deficit & Debt Servicing): Deficit = R1,900b - R1,600b = R300 billion, financed by selling government bonds. At 10% interest, taxpayers pay R30 billion in interest next year — funds that could have built schools.',
        'Step 3 (VAT Percentage Comparison): Even though Thandi pays more Rands (R3,913 vs R782.61), VAT takes 9.7% of Sipho’s R8,000 income versus only 4.8% of Thandi’s R80,000 income — proving VAT is regressive and hits the poor harder.'
      ],
      finalAnswer:
        'Budget Deficit = R300 billion (creating R30 billion annual interest at 10%); VAT takes 9.7% of Sipho’s salary vs 4.8% of Thandi’s, proving VAT is regressive.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: '4 Roles of Government (4 marks)',
        question: 'Name 4 roles of government in the economy. (4 marks)',
        answer: 'Provider, Regulator, Redistributor, and Stabiliser.'
      },
      {
        number: 2,
        label: 'Direct vs Indirect Tax (4 marks)',
        question: 'Distinguish between Direct and Indirect tax, and give 1 example each. (4 marks)',
        answer:
          'Direct tax is charged on income or wealth (e.g. Income Tax / PAYE). Indirect tax is charged on spending and hidden in prices (e.g. VAT).'
      },
      {
        number: 3,
        label: 'Is VAT Progressive or Regressive? (3 marks)',
        question: 'Is VAT progressive or regressive? Explain. (3 marks)',
        answer:
          'Regressive. Everyone pays the same 15% rate, so it takes a much larger percentage of a poor person’s income than a rich person’s income.'
      },
      {
        number: 4,
        label: 'Budget Deficit vs National Debt (4 marks)',
        question: 'Define Budget Deficit and National Debt. (4 marks)',
        answer:
          'Budget Deficit = when government spending exceeds income in ONE year. National Debt = total amount owed by government accumulated from all years of borrowing.'
      },
      {
        number: 5,
        label: 'Recession Fiscal Policy & 2 Tools (4 marks)',
        question:
          'The economy is in recession and unemployment is high. What fiscal policy should government use? Explain 2 tools. (4 marks)',
        answer:
          'Expansionary fiscal policy: (1) Decrease taxes so households/businesses keep more money, and (2) Increase government spending to boost demand and create jobs.'
      },
      {
        number: 6,
        label: 'Define Government Bond (2 marks)',
        question: 'What is a Government Bond? (2 marks)',
        answer:
          'A loan to government — the public/investors buy the bond, and government pays interest and repays the amount later.'
      }
    ]
  },
  {
    id: 'ncv-ee-l3-ch5-money-banking-and-monetary-policy-in-depth',
    level: 3,
    chapterNumber: 5,
    chapterLabel: 'Level 3 • Chapter 5',
    displayHeading: 'Level 3 — Chapter 5: Money, Banking & Monetary Policy in Depth',
    title: 'Money, Banking & Monetary Policy in Depth',
    subtitle: 'Level 3 - NCV Economic Environment (Nexovian Original Series)',
    sections: [
      {
        heading: 'Money Supply & Credit Creation (How Banks Create Money — Exam Favourite)',
        paragraphs: [
          'In Level 2 you learned that SARB sets the interest rate. In Level 3 you learn HOW commercial banks CREATE money and the TOOLS SARB uses.',
          'Money Supply is the total amount of money in South Africa — cash in your pocket plus money in bank accounts.',
          'Banks do not just keep your deposit locked in a vault: they LEND most of it out, creating NEW money through Credit Creation:',
          'Example: You deposit R10,000 in Capitec. SARB requires banks to keep 10% as a Cash Reserve = R1,000, so Capitec lends R9,000 to Thabo. Thabo pays Naledi R9,000 for stock, and Naledi deposits R9,000 in FNB. FNB keeps 10% = R900 and lends R8,100 to Sipho — and the cycle continues!'
        ],
        formulaBlock: `Money Multiplier = 1 / Reserve Ratio
If Cash Reserve = 10% (0.1): Multiplier = 1 / 0.1 = 10
Total Money Created = Initial Deposit × Multiplier
                    = R10,000 × 10 = R100,000`
      },
      {
        heading: '4 Tools of Monetary Policy Used by SARB (Memorise)',
        paragraphs: [
          'The South African Reserve Bank (SARB) uses four main monetary policy tools to control the money supply and keep inflation within 3%–6%:'
        ],
        bullets: [
          '1. Repo Rate (Most Important): Rate SARB charges commercial banks to borrow. If Repo ↑ -> Prime ↑ -> loans expensive -> spending ↓ -> inflation ↓. If Repo ↓ -> Prime ↓ -> loans cheap -> spending ↑ -> growth ↑.',
          '2. Cash Reserve Requirement: % of deposits banks must keep and NOT lend. If SARB raises the reserve requirement to 20%, banks lend less -> money supply ↓ -> inflation ↓.',
          '3. Open Market Operations: SARB buys or sells Government Bonds. To reduce money supply, SARB SELLS bonds (people pay SARB, money leaves circulation). To increase money supply, SARB BUYS bonds (SARB pays people, money enters circulation).',
          '4. Moral Persuasion: SARB advises/tells commercial banks: "Please lend less, inflation is high." Banks listen because SARB is the regulator.'
        ]
      },
      {
        heading: '6 Functions of SARB & Types of Money (M0, M1, M3)',
        paragraphs: [
          'Know all six functions of South Africa’s central bank (SARB) as well as the three monetary aggregates measured in economics:'
        ],
        bullets: [
          'SARB Functions: (1) Issues banknotes & coins (sole money printer), (2) Banker to government, (3) Banker to commercial banks (keeps bank reserves), (4) Controls money supply & inflation, (5) Keeps gold & foreign reserves (USD & gold for emergencies), (6) Lender of last resort (rescues failing banks).',
          'M0: Physical cash — banknotes and coins in circulation.',
          'M1: Cash + money in cheque / current accounts (money you can spend NOW).',
          'M3: M1 + savings + fixed deposits (broad money — most used in SA).'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Money Supply',
        definition: 'Total amount of money circulating in the economy (cash plus bank deposits).'
      },
      {
        term: 'Cash Reserve',
        definition: 'Percentage of deposits commercial banks must keep at SARB and cannot lend out.'
      },
      {
        term: 'Credit Creation',
        definition: 'Process where commercial banks lend out deposits repeatedly, creating new bank money.'
      },
      {
        term: 'Money Multiplier',
        definition: 'Formula (1 / Reserve Ratio) showing how many times an initial deposit expands.'
      },
      {
        term: 'Repo Rate',
        definition: 'Interest rate SARB charges commercial banks when they borrow from the Reserve Bank.'
      },
      {
        term: 'Prime Rate',
        definition: 'Repo Rate + 3.5% — benchmark lending rate commercial banks charge customers.'
      },
      {
        term: 'Open Market Operations',
        definition: 'SARB buying or selling government bonds to expand or shrink the money supply.'
      },
      {
        term: 'Lender of Last Resort',
        definition: 'SARB role of rescuing solvent commercial banks facing temporary cash shortages.'
      }
    ],
    workedExample: {
      title: 'Credit Creation Chain & Repo-to-Prime Loan Cost Impact',
      scenario:
        'Part A (Credit Creation): A customer deposits R5,000 when the Cash Reserve Requirement is 10%.\nPart B (Repo Rate Impact): Repo = 8.25% (Prime = Repo + 3.5% = 11.75%). You borrow R20,000 for 1 year at Prime. Then SARB increases Repo to 9.25%.',
      formulaBlock: `PART A — CREDIT CREATION (Deposit = R5,000, Reserve = 10%):
• Round 1: Bank keeps R500, lends R4,500
• Round 2: Bank keeps R450, lends R4,050
• Round 3: Bank keeps R405, lends R3,645
... continues until Total Money Created = R5,000 × (1 / 0.1) = R5,000 × 10 = R50,000

PART B — REPO HIKE ON A R20,000 LOAN (1 YEAR):
• At 8.25% Repo -> Prime = 8.25% + 3.5% = 11.75%
  Interest = R20,000 × 11.75% = R2,350  (Repay R22,350)
• At 9.25% Repo -> Prime = 9.25% + 3.5% = 12.75%
  New Interest = R20,000 × 12.75% = R2,550  (R200 MORE — cools spending!)`,
      steps: [
        'Step 1 (Credit Creation Rounds): In each round the bank keeps 10% and lends 90% (R4,500 -> R4,050 -> R3,645), giving Multiplier = 1 / 0.1 = 10 and Total = R5,000 × 10 = R50,000.',
        'Step 2 (Original Prime Cost): At 8.25% Repo, Prime = 11.75%. Interest on R20,000 = R2,350, so total repayment = R22,350.',
        'Step 3 (After Repo Hike): When SARB raises Repo to 9.25%, Prime climbs to 12.75%. Interest rises to R2,550 — costing R200 more and slowing borrowing and inflation.'
      ],
      finalAnswer:
        'R5,000 deposit at 10% reserve expands to R50,000 total money; raising Repo from 8.25% to 9.25% pushes Prime from 11.75% to 12.75%, adding R200 interest on a R20,000 loan.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: '4 Tools of Monetary Policy (4 marks)',
        question: 'Name 4 tools of monetary policy. (4 marks)',
        answer:
          'Repo rate, Cash reserve requirement, Open market operations, and Moral persuasion.'
      },
      {
        number: 2,
        label: 'Define Cash Reserve Requirement (2 marks)',
        question: 'What is the Cash Reserve Requirement? (2 marks)',
        answer:
          'The percentage of deposits commercial banks must keep in reserve and not lend out, as set by SARB.'
      },
      {
        number: 3,
        label: 'Calculate Money Multiplier & Total Created (3 marks)',
        question:
          'Deposit R20,000 with a 10% cash reserve. Calculate the Money Multiplier and total money created. (3 marks)',
        answer: 'Multiplier = 1 / 0.1 = 10. Total money created = R20,000 × 10 = R200,000.'
      },
      {
        number: 4,
        label: 'SARB Action to Reduce Inflation (3 marks)',
        question: 'SARB wants to reduce inflation. What will it do to the Repo Rate? Explain. (3 marks)',
        answer:
          'SARB will INCREASE the Repo Rate. Prime rises, loans become more expensive, households/firms borrow and spend less, demand falls, and prices cool down.'
      },
      {
        number: 5,
        label: '3 Functions of SARB (3 marks)',
        question: 'List 3 functions of SARB. (3 marks)',
        answer:
          'Any three: Issues banknotes and coins (prints money), banker to government, banker to commercial banks, controls money supply and inflation, keeps gold & foreign reserves, or acts as lender of last resort.'
      },
      {
        number: 6,
        label: 'SARB Sells Government Bonds Impact (2 marks)',
        question:
          'If SARB SELLS government bonds, will money supply increase or decrease? Why? (2 marks)',
        answer:
          'Decrease. Buyers pay cash/money to SARB for the bonds, pulling money out of circulation.'
      }
    ]
  },
  {
    id: 'ncv-ee-l3-ch6-international-trade-and-exchange-rates-in-depth',
    level: 3,
    chapterNumber: 6,
    chapterLabel: 'Level 3 • Chapter 6',
    displayHeading: 'Level 3 — Chapter 6: International Trade & Exchange Rates in Depth',
    title: 'International Trade & Exchange Rates in Depth',
    subtitle: 'Level 3 - NCV Economic Environment (Nexovian Original Series)',
    sections: [
      {
        heading: 'Why Countries Trade — Comparative vs Absolute Advantage',
        paragraphs: [
          'In Level 2 you learned Export vs Import. In Level 3 you learn WHY countries trade, HOW exchange rates move, and how the Balance of Payments works.',
          'Theory of Comparative Advantage: Countries should specialise in what they are BEST at producing, and trade for everything else. Example: SA is best at mining gold, platinum, and farming oranges, while Japan is best at making cars and electronics. When SA focuses on gold/oranges and Japan on cars, both countries get MORE by trading than trying to produce everything alone.'
        ],
        bullets: [
          'Absolute Advantage: You can produce a good cheaper than anyone else. SA can mine gold cheaper than Japan.',
          'Comparative Advantage: You give up LESS of other goods to produce it. Even if SA could make cars, it would have to give up huge gold mining — so SA sticks to gold.'
        ]
      },
      {
        heading: 'Balance of Payments (BOP) — 3 Accounts (Memorise)',
        paragraphs: [
          'BOP (Balance of Payments) is the record of ALL money coming IN and going OUT of South Africa in 1 year. It must balance overall.',
          'If the Current Account shows a DEFICIT, South Africa is buying more from abroad than it is selling — money is leaving and the Rand weakens.'
        ],
        bullets: [
          '1. Current Account (Everyday trade): Goods (Exports - Imports = Trade Balance), Services (tourism, transport), Income (wages, dividends), and Transfers (gifts, donations).',
          '2. Capital Account: Buying and selling non-produced/capital assets like land and buildings.',
          '3. Financial Account (Investment): FDI (Foreign Direct Investment — a foreign company BUILDS a factory in SA, creating jobs long-term = GOOD) and Portfolio Investment (foreigner buys shares on the JSE — short-term and can leave quickly).'
        ]
      },
      {
        heading: 'Exchange Rates in Depth — Floating Rate, Depreciation & Appreciation',
        paragraphs: [
          'South Africa uses a Floating Exchange Rate: the Rand value goes UP and DOWN daily based on supply and demand in foreign currency markets; government does NOT fix it.',
          'Effects of Weak vs Strong Rand: A WEAK Rand is GOOD for exporters (SA gold looks cheap to foreigners so they buy more) and tourism (foreigners visit SA cheaply), but BAD for importers & consumers (imported petrol, phones, clothes cost more -> inflation rises). A STRONG Rand is GOOD for importers & consumers (cheaper petrol and phones), but BAD for exporters (SA goods look expensive abroad, sales fall, jobs are lost).'
        ],
        bullets: [
          'What Makes Rand WEAK (Depreciate): Imports > Exports, high inflation in SA, high interest rates in the USA (investors move money to USA), or political instability / bad news.',
          'What Makes Rand STRONG (Appreciate): Exports > Imports, low inflation, high interest rates in SA (investors bring capital for higher returns), and good news / stable government.'
        ]
      },
      {
        heading: 'Trade Protection in Depth — 4 Tools & Arguments For vs Against',
        paragraphs: [
          'Even though free trade increases total goods, governments protect key domestic sectors using four policy tools:'
        ],
        bullets: [
          '1. Tariffs: Tax placed on imported goods.',
          '2. Quotas: Physical quantity limit on how much may be imported.',
          '3. Subsidies: Government gives financial support to LOCAL farmers or factories so they can sell cheaper.',
          '4. Embargo: Total legal ban on trading a product or with a country.',
          'Arguments FOR Protection: Protect local jobs, protect infant (new) industries, and stop foreign dumping.',
          'Arguments AGAINST Protection: Higher prices for consumers, less product choice, and trade retaliation by other countries.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Comparative Advantage',
        definition: 'Specialising in producing the goods you give up the least opportunity cost to make.'
      },
      {
        term: 'Balance of Payments',
        definition: 'Accounting record of all money flowing into and out of a country in 1 year.'
      },
      {
        term: 'Current Account',
        definition: 'BOP account tracking everyday trade in goods, services, income, and transfers.'
      },
      {
        term: 'FDI',
        definition: 'Foreign Direct Investment — foreign firm builds a long-term factory or business in SA.'
      },
      {
        term: 'Floating Exchange Rate',
        definition: 'Currency rate set daily by market supply and demand rather than fixed by government.'
      },
      {
        term: 'Depreciation',
        definition: 'When the Rand loses value against another currency (e.g. R18 to R20 per $1).'
      },
      {
        term: 'Appreciation',
        definition: 'When the Rand gains value against another currency (e.g. R18 to R16 per $1).'
      }
    ],
    workedExample: {
      title: 'Balance of Payments Deficit & Imported Car Exchange Rate Cost',
      scenario:
        'Part A (Current Account BOP): SA Exports = R1,200 billion, Imports = R1,400 billion, and Tourism Services bring in R100 billion.\nPart B (Exchange Rate Depreciation): A Toyota Corolla from Japan costs ¥2,000,000. Initially R1 = ¥8; then the Rand depreciates to R1 = ¥7.',
      formulaBlock: `PART A — BALANCE OF PAYMENTS (CURRENT ACCOUNT):
Trade Balance       = Exports - Imports = R1,200b - R1,400b = -R200 billion (DEFICIT)
Net Current Account = -R200b + R100b (Tourism) = -R100 billion DEFICIT
-> Covered by Financial Account Surplus (+R100b in FDI or JSE portfolio inflows)

PART B — RAND DEPRECIATION ON A ¥2,000,000 CAR:
• At R1 = ¥8:  Price = 2,000,000 / 8 = R250,000
• At R1 = ¥7:  Price = 2,000,000 / 7 = R285,714  (+R35,714 MORE EXPENSIVE!)`,
      steps: [
        'Step 1 (Trade & Current Account Balance): Exports (R1,200b) minus Imports (R1,400b) = -R200 billion Trade Deficit. Adding R100 billion Tourism Services reduces the deficit to -R100 billion on the Net Current Account.',
        'Step 2 (Balancing BOP): To cover the -R100 billion Current Account deficit, South Africa needs a +R100 billion Financial Account surplus from foreign FDI or share purchases.',
        'Step 3 (Exchange Rate Impact): At R1 = ¥8, a ¥2,000,000 car costs R250,000. When the Rand weakens to R1 = ¥7, the same car jumps to R285,714 — showing why depreciation pushes up imported car, phone, and petrol prices and raises inflation.'
      ],
      finalAnswer:
        'Trade Balance = -R200b and Net Current Account = -R100b deficit (requiring R100b Financial Account inflows); Rand depreciation from R1=¥8 to R1=¥7 raises the ¥2,000,000 car from R250,000 to R285,714.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Define Balance of Payments (2 marks)',
        question: 'Define Balance of Payments. (2 marks)',
        answer: 'A record of all money flowing into and out of a country in one year.'
      },
      {
        number: 2,
        label: '3 Accounts of BOP (3 marks)',
        question: 'Name the 3 accounts of BOP. (3 marks)',
        answer: 'Current Account, Capital Account, and Financial Account.'
      },
      {
        number: 3,
        label: 'FDI Definition, Example & Benefit (3 marks)',
        question: 'What is FDI? Give 1 example and 1 benefit. (3 marks)',
        answer:
          'Foreign Direct Investment is when a foreign company builds a factory or business in SA (e.g. Toyota building a manufacturing plant in Durban). Benefit: creates jobs and brings skills/technology.'
      },
      {
        number: 4,
        label: 'Rand R18 to R20 per $1 Analysis (3 marks)',
        question:
          'The Rand goes from R18 to R20 per $1. Is this appreciation or depreciation? Who benefits? (3 marks)',
        answer:
          'Depreciation (the Rand lost value). Exporters and the tourism sector benefit; importers and consumers of imported goods lose.'
      },
      {
        number: 5,
        label: '2 Reasons for Trade Protection (2 marks)',
        question: 'Give 2 reasons why government protects local industries. (2 marks)',
        answer:
          'Any two: To protect local jobs, protect infant/new industries, or prevent foreign dumping.'
      },
      {
        number: 6,
        label: 'Exports > Imports Impact (2 marks)',
        question:
          'SA exports more than it imports. What happens to the Rand and the Current Account? (2 marks)',
        answer:
          'There is a Current Account Surplus, and more foreign currency flowing in causes the Rand to strengthen (appreciate).'
      }
    ]
  },
  {
    id: 'ncv-ee-l3-ch7-economic-growth-and-development',
    level: 3,
    chapterNumber: 7,
    chapterLabel: 'Level 3 • Chapter 7',
    displayHeading: 'Level 3 — Chapter 7: Economic Growth & Development',
    title: 'Economic Growth & Development',
    subtitle: 'Level 3 - NCV Economic Environment (Nexovian Original Series)',
    sections: [
      {
        heading: 'Economic Growth vs Economic Development & Measuring Growth Rate',
        paragraphs: [
          'In Level 2 you learned that Growth and Development are different. In Level 3 you learn HOW to measure them and WHY South Africa struggles.',
          'You can have growth WITHOUT development: for example, a gold mine makes R1 billion profit (Growth ↑), yet workers still live in shacks with no clean water (Development = 0). Growth happened, but development did not.'
        ],
        bullets: [
          'Economic Growth (QUANTITY): Real GDP increases and more goods and services are produced. Example: GDP grows from R6 trillion to R6.5 trillion = 8.3% growth.',
          'Economic Development (QUALITY): People’s LIVES improve — better schools, healthcare, housing, and less poverty. Measured by HDI, poverty rate, and literacy.'
        ],
        formulaBlock: `Economic Growth Rate = ((GDP this year - GDP last year) / GDP last year) × 100

Example: 2024 GDP = R6,000 bn, 2025 GDP = R6,180 bn
Growth = ((6,180 - 6,000) / 6,000) × 100 = 3%`
      },
      {
        heading: '5 Drivers of Growth vs 5 Factors Blocking Growth in SA',
        paragraphs: [
          'Know both what drives faster economic production and the real structural obstacles slowing South Africa down:'
        ],
        bullets: [
          'Growth Driver 1 — Natural Resources: Gold, platinum, coal, and fertile farmland.',
          'Growth Driver 2 — Human Capital: Educated, skilled, healthy workers — YOU studying NCV builds human capital!',
          'Growth Driver 3 — Capital: Machines, factories, transport equipment, and roads.',
          'Growth Driver 4 — Technology: Better machinery, internet, and AI.',
          'Growth Driver 5 — Entrepreneurship: People starting businesses and taking risks.',
          'SA Blocker 1 — Load shedding / Energy crisis: Factories and workshops stop operating.',
          'SA Blocker 2 — Low education / Skills shortage: Not enough engineers and artisans.',
          'SA Blocker 3 — Unemployment & Poverty: People lack income to buy goods, keeping demand low.',
          'SA Blocker 4 — Corruption: Public money meant for roads and infrastructure is stolen.',
          'SA Blocker 5 — High crime: Businesses become scared to invest in South Africa.'
        ]
      },
      {
        heading: 'Human Development Index (HDI) — Measuring Development (0 to 1)',
        paragraphs: [
          'HDI (Human Development Index) measures economic development on a scale from 0 to 1 (higher = better).',
          'Benchmarks to remember: South Africa HDI ≈ 0.72 (Medium), Norway ≈ 0.96 (Very High), Niger ≈ 0.39 (Low).'
        ],
        bullets: [
          '1. Health: Life expectancy — how long people live.',
          '2. Education: Years of schooling and adult literacy rate.',
          '3. Income: GDP per capita (average income per person).'
        ]
      },
      {
        heading: 'SA Growth & Development Strategies + Sustainable Development',
        paragraphs: [
          'Sustainable Development means development that meets the needs of TODAY without destroying resources for TOMORROW (for example, not cutting all trees for firewood, using solar energy, and recycling).',
          'Key South African government strategies you must recognise in NCV exams:'
        ],
        bullets: [
          'NDP (National Development Plan 2030): Long-term plan to eliminate poverty and reduce unemployment toward 6% by 2030.',
          'RDP (Reconstruction & Development Programme): Early post-1994 plan providing free housing, water, and electricity for poor households.',
          'GEAR: Macroeconomic strategy focused on growth, private investment, and cutting government spending.',
          'EPWP (Expanded Public Works Programme): Government creates temporary jobs such as road cleaning and community construction.',
          'BEE / BBBEE: Policies helping black South Africans own businesses, gain employment, and build skills.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Economic Growth',
        definition: 'Quantitative increase in Real GDP and total goods and services produced.'
      },
      {
        term: 'Economic Development',
        definition: 'Qualitative improvement in people’s living standards (health, education, housing, reduced poverty).'
      },
      {
        term: 'Growth Rate',
        definition: 'Percentage change in Real GDP from one year to the next.'
      },
      {
        term: 'Human Capital',
        definition: 'The education, technical skills, and health of a country’s workforce.'
      },
      {
        term: 'HDI',
        definition: 'Human Development Index (0–1) measuring Health, Education, and Income.'
      },
      {
        term: 'NDP',
        definition: 'National Development Plan 2030 targeting poverty elimination and lower unemployment.'
      },
      {
        term: 'Sustainable Development',
        definition: 'Growth that satisfies present needs without harming resources for future generations.'
      }
    ],
    workedExample: {
      title: 'GDP Growth vs Population Growth & Comparing HDI Across Two Countries',
      scenario:
        'Part A (Growth Rate vs Population): Country X has 2023 GDP = R5,500 bn and 2024 GDP = R5,775 bn, while population grew 6% in the same year.\nPart B (Growth vs Development): Country A and Country B both have GDP = R1 trillion. Country A has HDI = 0.85, literacy = 95%, life expectancy = 78 years. Country B has HDI = 0.55, literacy = 60%, life expectancy = 55 years.',
      formulaBlock: `PART A — GROWTH RATE VS POPULATION GROWTH:
Growth Rate = ((5,775 - 5,500) / 5,500) × 100
            = (275 / 5,500) × 100
            = 5%
Compare to Population Growth (6%): GDP grew 5% < Population grew 6%
-> GDP per capita FELL (more people sharing slightly more goods = people feel poorer!)

PART B — SAME GROWTH, DIFFERENT DEVELOPMENT:
• Country A: GDP R1 trillion | HDI 0.85 | Literacy 95% | Life expectancy 78 yrs
• Country B: GDP R1 trillion | HDI 0.55 | Literacy 60% | Life expectancy 55 yrs
Both have the same GDP size, but Country A has much better DEVELOPMENT.`,
      steps: [
        'Step 1 (Calculate GDP Growth): Subtract R5,500 bn from R5,775 bn = R275 bn increase. Divide 275 / 5,500 × 100 = 5% GDP growth.',
        'Step 2 (Compare Against Population Growth): Because population grew faster (6%) than Real GDP (5%), average income per person (GDP per capita) fell — so citizens feel poorer despite positive GDP growth.',
        'Step 3 (Interpret HDI Comparison): Even though Country A and Country B both produce R1 trillion GDP, Country A converts that output into much higher literacy (95%), longer life (78 years), and higher HDI (0.85 vs 0.55).'
      ],
      finalAnswer:
        'GDP Growth = 5% (below 6% population growth, so GDP per capita fell); Country A achieves far higher Economic Development (HDI 0.85 vs 0.55) despite having the same R1 trillion GDP as Country B.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Economic Growth vs Development (4 marks)',
        question: 'Distinguish between Economic Growth and Economic Development. (4 marks)',
        answer:
          'Economic Growth = quantitative increase in Real GDP / total goods produced. Economic Development = qualitative improvement in people’s quality of life (health, education, housing, less poverty).'
      },
      {
        number: 2,
        label: 'Calculate Growth Rate (2 marks)',
        question: 'Calculate the growth rate: Last year GDP R4,000, this year GDP R4,200. (2 marks)',
        answer: '((4,200 - 4,000) / 4,000) × 100 = (200 / 4,000) × 100 = 5%.'
      },
      {
        number: 3,
        label: '3 Factors Causing Economic Growth (3 marks)',
        question: 'Name 3 factors that cause economic growth. (3 marks)',
        answer:
          'Any three: Natural resources, Human capital, Capital, Technology, or Entrepreneurship.'
      },
      {
        number: 4,
        label: '3 Factors Blocking Growth in SA (3 marks)',
        question: 'Name 3 factors that block growth in SA. (3 marks)',
        answer:
          'Any three: Load shedding / energy crisis, Corruption, Low education / skills shortage, Unemployment & poverty, or High crime.'
      },
      {
        number: 5,
        label: 'HDI Purpose & 3 Components (4 marks)',
        question: 'What does HDI measure? Name its 3 components. (4 marks)',
        answer:
          'Human Development Index measures a country’s level of economic development (0 to 1). Its 3 components are Health (life expectancy), Education (schooling & literacy), and Income (GDP per capita).'
      },
      {
        number: 6,
        label: 'Growth Without Development Example (3 marks)',
        question: 'Can a country have growth without development? Explain with an example. (3 marks)',
        answer:
          'Yes. For example, a mine can make huge profits (GDP goes up), while workers still live in poverty without clean water, decent housing, or schools — growth occurred without development.'
      }
    ]
  },
  {
    id: 'ncv-ee-l3-ch8-business-cycles-and-economic-indicators',
    level: 3,
    chapterNumber: 8,
    chapterLabel: 'Level 3 • Chapter 8',
    displayHeading: 'Level 3 — Chapter 8: Business Cycles & Economic Indicators',
    title: 'Business Cycles & Economic Indicators',
    subtitle: 'Level 3 - NCV Economic Environment (Nexovian Original Series)',
    sections: [
      {
        heading: 'The 4 Phases of the Business Cycle (Memorise)',
        paragraphs: [
          'The economy does NOT grow in a straight line — it moves UP and DOWN like a wave. This wave is the Business Cycle, and one full cycle usually takes about 5 to 10 years.'
        ],
        bullets: [
          '1. BOOM / PEAK (Top): Economy is HOT. High employment, strong spending, rising business profits, and rising prices. Problem: high inflation and worker shortages. Example: December in Mbombela — everyone shopping, taxis full, shops hiring.',
          '2. RECESSION / DOWNSWING (Going Down): Economy slows. Businesses sell less, retrench workers, and spending falls. GDP falling for 2 consecutive quarters = Official Recession. Example: January after December — shops empty, people broke.',
          '3. TROUGH / DEPRESSION (Bottom): Worst point. Highest unemployment, lowest spending, and businesses closing. Example: COVID 2020 lockdown — shops closed, no jobs.',
          '4. RECOVERY / UPSWING (Going Up): Economy starts to heal. Government/SARB cuts interest rates, businesses hire again, and spending slowly rises. Example: After COVID, shops reopen and people start working again.'
        ]
      },
      {
        heading: 'What Causes Business Cycles & How Government Responds',
        paragraphs: [
          'Several forces push the economy from boom to recession and back again. Government and SARB step in to smooth out extreme swings:'
        ],
        bullets: [
          'Causes of the Cycle: (1) Interest rate changes, (2) Consumer confidence (when people feel scared, they stop spending), (3) Government spending shifts, and (4) External shocks such as COVID, wars, droughts, or oil price spikes.',
          'In Boom (Inflation High): Government/SARB should use CONTRACTIONARY policy — increase taxes and increase the repo rate.',
          'In Recession (Unemployment High): Government/SARB should use EXPANSIONARY policy — decrease taxes, decrease the repo rate, and increase government spending.'
        ]
      },
      {
        heading: 'Economic Indicators — Leading, Coincident & Lagging',
        paragraphs: [
          'Economists track three groups of indicators to tell where the economy is going, where it is now, and what already happened:',
          'Exam Rule of Thumb: If JSE shares are falling and building plans drop, we predict a recession is coming -> Leading. If unemployment is 40% and inflation is 8%, we confirm a recession or boom already happened -> Lagging.'
        ],
        bullets: [
          '1. Leading Indicators (Predict FUTURE): Building plans approved (more plans -> construction boom coming), JSE share prices (rising shares -> investors expect growth), and new business registrations.',
          '2. Coincident Indicators (Tell us NOW): GDP, current employment numbers, and retail sales (what shops are selling right now).',
          '3. Lagging Indicators (Confirm AFTER): Unemployment rate (firms fire AFTER recession begins), inflation (prices rise AFTER boom), and interest rate changes (SARB adjusts AFTER seeing data).'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Business Cycle',
        definition: 'Up-and-down wave movement of economic activity over time (typically 5–10 years).'
      },
      {
        term: 'Boom / Peak',
        definition: 'Highest point of the cycle with high employment, high spending, and rising inflation.'
      },
      {
        term: 'Recession',
        definition: 'Downswing where Real GDP falls for 2 consecutive quarters (6 months) and spending drops.'
      },
      {
        term: 'Trough',
        definition: 'Lowest point of the cycle marked by maximum unemployment and minimal spending.'
      },
      {
        term: 'Recovery',
        definition: 'Upswing phase where output, employment, and spending begin growing again.'
      },
      {
        term: 'Leading Indicator',
        definition: 'Signals future economic direction (e.g. building plans approved, JSE share prices).'
      },
      {
        term: 'Coincident Indicator',
        definition: 'Reflects the current state of the economy right now (e.g. GDP, retail sales).'
      },
      {
        term: 'Lagging Indicator',
        definition: 'Confirms economic shifts after they happen (e.g. unemployment rate, inflation).'
      }
    ],
    workedExample: {
      title: 'Mbombela 2026 Business Cycle Timeline & Building Plans Indicator',
      scenario:
        'Part A (Mbombela 2026): Jan — Shops hire 100 workers, retail sales hit R10 million, GDP up. March — SARB raises repo rate, loans become expensive, car buying stops. June — GDP falls, shops retrench 50 workers. Sept — Unemployment reaches 45%, shops closing. Dec — Government cuts tax and SARB cuts repo, spending restarts.\nPart B (Indicator Question): Building plans approved drop from 500 to 200 this month.',
      formulaBlock: `PART A — MBOMBELA 2026 CYCLE PHASES:
• Jan:        BOOM / PEAK          (high hiring, R10m retail sales, GDP up)
• March–June: RECESSION / DOWNSWING (repo hike -> spending stops -> GDP falls, 50 fired)
• Sept:       TROUGH / DEPRESSION  (worst point: 45% unemployment, shops closing)
• Dec:        RECOVERY / UPSWING   (tax cut + repo cut -> spending rises again)

PART B — INDICATOR DIAGNOSIS:
Building plans approved fell 500 -> 200 this month:
Type: LEADING INDICATOR  |  Prediction: Construction recession coming (fewer buildings & jobs ahead).`,
      steps: [
        'Step 1 (Jan & March–June): January reflects maximum activity (Boom / Peak). March to June shows tightening credit, falling GDP, and retrenchments (Recession / Downswing).',
        'Step 2 (Sept & Dec): September hits the bottom with 45% unemployment and closures (Trough). December’s policy relief restarts hiring and demand (Recovery / Upswing).',
        'Step 3 (Leading Indicator): Building plans are approved months before actual bricklaying starts, so a drop from 500 to 200 is a Leading Indicator warning of fewer construction jobs in the future.'
      ],
      finalAnswer:
        'Phases: Jan = Boom, March–June = Recession/Downswing, Sept = Trough, Dec = Recovery/Upswing; Building plans falling from 500 to 200 is a Leading Indicator predicting a future construction slowdown.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: '4 Phases of Business Cycle (8 marks)',
        question: 'Name and explain the 4 phases of the business cycle. (8 marks)',
        answer:
          '1) Boom/Peak: high jobs, high spending, high inflation. 2) Recession/Downswing: GDP falls and jobs are lost. 3) Trough/Depression: lowest point with highest unemployment. 4) Recovery/Upswing: growth, hiring, and spending start rising again.'
      },
      {
        number: 2,
        label: 'Define Recession (2 marks)',
        question: 'What is a recession? (2 marks)',
        answer: 'A period where Real GDP falls for 2 consecutive quarters (6 months).'
      },
      {
        number: 3,
        label: 'Leading, Coincident & Lagging Indicators (6 marks)',
        question:
          'Distinguish between Leading, Coincident, and Lagging indicators, giving 1 example each. (6 marks)',
        answer:
          'Leading predicts the future (e.g. building plans approved). Coincident shows what is happening now (e.g. GDP / retail sales). Lagging confirms after an economic shift has started (e.g. unemployment rate / inflation).'
      },
      {
        number: 4,
        label: 'Government Policy During a Boom (3 marks)',
        question: 'During a Boom, what should government do? Why? (3 marks)',
        answer:
          'Use Contractionary policy — increase taxes and/or increase the repo rate to cool down inflation and stop the economy from overheating.'
      },
      {
        number: 5,
        label: 'Classify 35% Unemployment Indicator (2 marks)',
        question:
          'Unemployment rate is 35% after a recession. Is this leading or lagging? Explain. (2 marks)',
        answer:
          'Lagging indicator. Unemployment rises AFTER the recession has already begun and confirms it.'
      },
      {
        number: 6,
        label: 'Rising JSE Share Prices Prediction (2 marks)',
        question: 'JSE share prices are rising fast. What does this predict? (2 marks)',
        answer:
          'As a Leading indicator, rising JSE share prices show investor confidence and predict an upcoming economic boom / growth.'
      }
    ]
  },
  {
    id: 'ncv-ee-l3-ch9-labour-market-and-productivity',
    level: 3,
    chapterNumber: 9,
    chapterLabel: 'Level 3 • Chapter 9',
    displayHeading: 'Level 3 — Chapter 9: Labour Market & Productivity',
    title: 'Labour Market & Productivity',
    subtitle: 'Level 3 - NCV Economic Environment (Nexovian Original Series)',
    sections: [
      {
        heading: 'The Labour Market & How Wages Are Determined',
        paragraphs: [
          'In Level 2 you learned types of unemployment. In Level 3 you learn HOW wages are set, WHAT productivity means, and WHY trade unions matter.',
          'The Labour Market is where workers (Supply of Labour) meet employers (Demand for Labour). Just like a market for kotas, here the product is LABOUR, and the Wage is the Price of Labour.',
          'Minimum Wage in South Africa: Government sets the lowest wage an employer may legally pay (about R27.58 per hour in 2026) to stop exploitation. However, if the minimum wage is set too high, small businesses cannot afford to hire and unemployment rises.'
        ],
        bullets: [
          'Demand for Labour (Employers): Businesses wanting workers. When business is doing well, demand for labour is high.',
          'Supply of Labour (Workers): People wanting jobs. When many people need work, supply is high.',
          'Demand > Supply: Few skilled electricians, many businesses needing them -> Wages go UP.',
          'Supply > Demand: Many unskilled workers, few jobs -> Wages go DOWN or stay low.'
        ]
      },
      {
        heading: 'Productivity — Big Level 3 Concept & How to Increase It',
        paragraphs: [
          'Productivity = Output / Input — how much you produce with the resources and time you have.',
          'Kota Example: Thabo makes 10 kotas in 1 hour, while Sipho makes 20 kotas in 1 hour using the same ingredients -> Sipho is MORE productive.',
          'Why Productivity Matters: Higher productivity means a lower cost per item, allowing businesses to sell cheaper or pay workers more, and helping South Africa compete against manufacturers like China. Low productivity causes high costs and forces businesses to close.'
        ],
        bullets: [
          '1. Training & Education (building worker skills)',
          '2. Better technology and machines',
          '3. Good health (healthy workers work faster and miss fewer days)',
          '4. Motivation (fair wages and good working conditions)',
          '5. Good management and supervision'
        ],
        formulaBlock: `Productivity = Total Output / Number of Workers (or Hours)

Example 1: 1,000 chairs produced by 10 workers -> 1,000 / 10 = 100 chairs per worker.
Example 2: After buying a new machine, 10 workers produce 1,500 chairs -> 1,500 / 10 = 150 chairs per worker (+50% productivity!).`
      },
      {
        heading: 'Trade Unions, Bargaining Councils, CCMA & Strikes',
        paragraphs: [
          'A Trade Union is an organisation that protects workers’ rights and interests (e.g. COSATU, NUM, SADTU). Unions negotiate wages via Collective Bargaining (negotiating for ALL workers together rather than one by one — stronger together), fight for safer conditions, hours, and leave, and may strike if employers refuse.',
          'Strikes — Good & Bad: Strikes can win higher wages for workers (GOOD), but stop production, cost businesses money, scare away investors, and cause job losses (BAD for the economy).'
        ],
        bullets: [
          'Collective Bargaining: Union and employer negotiate wages and conditions for all workers as a group.',
          'Bargaining Council: Industry-level body where unions and employers agree on wages for an entire industry (e.g. all construction workers share the same minimum wage).',
          'CCMA (Commission for Conciliation, Mediation and Arbitration): Resolves labour disputes FREE without going to court — for example, ordering an employer to pay or reinstate an unfairly dismissed worker.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Labour Market',
        definition: 'Market where workers supplying labour meet employers demanding labour.'
      },
      {
        term: 'Wage',
        definition: 'The price paid to workers for their labour.'
      },
      {
        term: 'Minimum Wage',
        definition: 'Lowest hourly/monthly wage employers are legally allowed to pay (~R27.58/hr in 2026).'
      },
      {
        term: 'Productivity',
        definition: 'Ratio of output produced per unit of input (Total Output / Workers or Hours).'
      },
      {
        term: 'Trade Union',
        definition: 'Worker organisation (e.g. COSATU, NUM, SADTU) protecting wages and working conditions.'
      },
      {
        term: 'Collective Bargaining',
        definition: 'Negotiations between trade unions and employers on behalf of all workers together.'
      },
      {
        term: 'Bargaining Council',
        definition: 'Industry-wide body setting minimum wages and conditions across an entire sector.'
      },
      {
        term: 'CCMA',
        definition: 'Commission for Conciliation, Mediation and Arbitration — resolves workplace disputes for free.'
      }
    ],
    workedExample: {
      title: 'Kota Shop Productivity Gain & Mbombela Scarce-Skills Wage Gap',
      scenario:
        'Part A (Productivity): Shop A uses 5 workers to make 200 kotas per day. Shop B uses 5 workers to make 300 kotas per day after training.\nPart B (Wages): Mbombela businesses need 10 qualified electricians, but only 2 are available. Meanwhile, 1,000 people want cleaning jobs where only 50 positions exist.',
      formulaBlock: `PART A — PRODUCTIVITY COMPARISON:
• Shop A: 200 kotas / 5 workers = 40 kotas per worker
• Shop B: 300 kotas / 5 workers = 60 kotas per worker (after training)
• Increase = ((60 - 40) / 40) × 100 = +50% MORE PRODUCTIVE!

PART B — WHY SKILLS DECIDE WAGES IN MBOMBELA:
• Electricians: Need 10 vs 2 available (Demand > Supply) -> R500/hour!
• Cleaners:     50 jobs vs 1,000 seekers (Supply > Demand) -> R27.58/hour minimum wage`,
      steps: [
        'Step 1 (Shop A vs Shop B Productivity): Divide total kotas by 5 workers -> Shop A = 40 kotas/worker; Shop B = 60 kotas/worker. Training lifted productivity by 20 kotas/worker (+50%).',
        'Step 2 (Mbombela Electricians Wage): Because Demand (10) far exceeds Supply (2), employers compete for scarce electricians, pushing wages up to R500/hour.',
        'Step 3 (Mbombela Cleaners Wage & Takeaway): Because Supply (1,000 applicants) far exceeds Demand (50 jobs), employers pay the R27.58/hour minimum wage — proving why scarce skills earn high wages.'
      ],
      finalAnswer:
        'Shop B increases output from 40 to 60 kotas/worker (+50% productivity); scarce electricians earn R500/hr (Demand > Supply) while abundant cleaning labour earns R27.58/hr (Supply > Demand).'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Define Productivity & Formula (3 marks)',
        question: 'Define Productivity and give the formula. (3 marks)',
        answer:
          'Productivity = Output divided by Input (how efficiently resources produce goods). Formula: Productivity = Total Output / Number of Workers (or Hours).'
      },
      {
        number: 2,
        label: 'Calculate Productivity Before & After (4 marks)',
        question:
          'A factory has 20 workers producing 2,000 units. After installing a new machine, the same 20 workers produce 3,000 units. Calculate productivity before and after. (4 marks)',
        answer:
          'Before: 2,000 / 20 = 100 units per worker. After: 3,000 / 20 = 150 units per worker. Productivity increased by 50 units per worker (+50%).'
      },
      {
        number: 3,
        label: 'Define Collective Bargaining (2 marks)',
        question: 'What is Collective Bargaining? (2 marks)',
        answer:
          'Process where a trade union negotiates wages and working conditions for all workers together with the employer.'
      },
      {
        number: 4,
        label: '3 Ways to Increase Productivity (3 marks)',
        question: 'Give 3 ways to increase productivity. (3 marks)',
        answer:
          'Any three: Training & education, better technology/machines, good worker health, motivation (fair wages/conditions), or good management.'
      },
      {
        number: 5,
        label: 'CCMA Role & Free Service (3 marks)',
        question: 'What is the CCMA and what does it do? (3 marks)',
        answer:
          'Commission for Conciliation, Mediation and Arbitration. It resolves labour disputes between workers and employers for free without going to court (e.g. unfair dismissal cases).'
      },
      {
        number: 6,
        label: 'Many Unskilled Workers vs Few Jobs (2 marks)',
        question:
          'If there are many unskilled workers but few jobs, what happens to the wage? Explain. (2 marks)',
        answer:
          'The wage stays low / falls because Supply > Demand — many workers compete for few jobs, allowing employers to pay lower/minimum wages.'
      }
    ]
  },
  {
    id: 'ncv-ee-l3-ch10-exam-prep-and-final-revision-full-l3',
    level: 3,
    chapterNumber: 10,
    chapterLabel: 'Level 3 • Chapter 10',
    displayHeading: 'Level 3 — Chapter 10: Exam Prep & Final Revision — Full L3',
    title: 'Exam Prep & Final Revision — Full L3',
    subtitle: 'Level 3 - NCV Economic Environment (Nexovian Original Series)',
    sections: [
      {
        heading: '1. The Whole Level 3 in One Page (Chapters 1–9 Rapid Summary)',
        paragraphs: [
          'Use this master one-page revision sheet the night before your NCV Level 3 Economic Environment exam to connect every topic:'
        ],
        bullets: [
          'Ch 1 Circular Flow: Money moves between Households, Firms, Government, and Foreign Sector. Leakages = Savings (S), Tax (T), Imports (M). Injections = Investment (I), Govt Spending (G), Exports (X). Injections > Leakages = Growth.',
          'Ch 2 GDP: GDP = Total value produced INSIDE SA in 1 year -> GDP = C + I + G + (X - M). GNP = Produced BY South Africans anywhere. Nominal includes inflation; Real removes inflation.',
          'Ch 3 Inflation & Unemployment: Inflation = general continuous rise in prices, measured by CPI. Causes: Demand-Pull, Cost-Push, Imported. Unemployment Rate = (Unemployed / Labour Force) × 100.',
          'Ch 4 Fiscal Policy: Government uses Tax & Spending. Direct Tax = Income Tax; Indirect = VAT. Progressive = Rich pay higher %; Regressive = Poor pay higher % (VAT). Deficit = Spending > Income. Expansionary = ↓Tax ↑Spending (Recession); Contractionary = ↑Tax ↓Spending (Inflation).',
          'Ch 5 Monetary Policy: SARB uses Repo Rate, Cash Reserve, Open Market Operations, Moral Persuasion. Prime = Repo + 3.5%. Banks create money via credit creation: Multiplier = 1 / Reserve Ratio.',
          'Ch 6 Trade & Exchange: BOP = Money in/out across Current, Capital, Financial accounts. FDI = Foreigner builds factory in SA. Rand depreciates (R18 -> R20/$1) = good for exporters/tourism, bad for importers/inflation.',
          'Ch 7 Growth vs Development: Growth = GDP ↑ (Quantity); Development = Lives improve (Quality). HDI = Health + Education + Income. Growth without development is possible.',
          'Ch 8 Business Cycle: Boom -> Recession -> Trough -> Recovery -> Boom. Recession = GDP falls for 2 quarters. Leading predicts (building plans), Coincident shows now (GDP), Lagging confirms after (unemployment).',
          'Ch 9 Labour & Productivity: Productivity = Output / Input. Wages set by Demand & Supply (scarce skills = high wage). Trade unions protect workers (Collective Bargaining); CCMA solves disputes free.'
        ]
      },
      {
        heading: '5. Exam Tips — How to Pass First Time',
        paragraphs: [
          'Marks are often lost on exam technique rather than lack of knowledge. Apply these six rules in every NCV paper:'
        ],
        bullets: [
          'Tip 1: Always DEFINE first, then EXPLAIN, then give an EXAMPLE — that turns 1 answer into 3 easy marks.',
          'Tip 2 (Calculations): Show FORMULA, then NUMBERS, then ANSWER with R or % units. No formula = lose marks even if the answer is right.',
          'Tip 3 ("Distinguish"): Draw TWO columns — do not write a single blended paragraph.',
          'Tip 4 ("Discuss"): Give BOTH sides (Good + Bad / Advantages + Disadvantages).',
          'Tip 5 (Time Management): 1 mark = 1 minute. A 50-mark paper = 50 minutes. Never spend 10 minutes on a 2-mark question.',
          'Tip 6 (Presentation): Write NEATLY — examiners mark 100+ scripts, and clean layout earns every mark you deserve.'
        ]
      }
    ],
    keyTerms: [
      { term: '1. GDP', definition: 'Total value of goods & services produced inside SA in 1 year: C + I + G + (X - M).' },
      { term: '2. GNP', definition: 'Total value of goods & services produced by South African citizens anywhere.' },
      { term: '3. CPI', definition: 'Consumer Price Index — basket of everyday goods tracked monthly by Stats SA.' },
      { term: '4. Inflation', definition: 'General continuous rise in prices over time so money buys less.' },
      { term: '5. Leakage', definition: 'Money leaving the circular flow: Savings (S), Taxes (T), Imports (M).' },
      { term: '6. Injection', definition: 'Money entering the circular flow: Investment (I), Govt Spending (G), Exports (X).' },
      { term: '7. Fiscal Policy', definition: 'Government using taxation and government spending to stabilise the economy.' },
      { term: '8. Monetary Policy', definition: 'SARB controlling money supply and interest rates to keep inflation at 3%–6%.' },
      { term: '9. Repo Rate', definition: 'Interest rate SARB charges commercial banks when they borrow funds.' },
      { term: '10. Prime Rate', definition: 'Repo Rate + 3.5% — commercial banks’ benchmark lending rate to clients.' },
      { term: '11. VAT', definition: 'Value Added Tax (15% indirect regressive tax on most goods and services).' },
      { term: '12. Progressive Tax', definition: 'Tax where higher-income earners pay a higher percentage (e.g. Income Tax).' },
      { term: '13. Regressive Tax', definition: 'Tax taking a larger share of a poor person’s income (e.g. VAT).' },
      { term: '14. Budget Deficit', definition: 'When government spending exceeds government revenue in a single year.' },
      { term: '15. National Debt', definition: 'Total accumulated debt owed by government from years of borrowing.' },
      { term: '16. Balance of Payments', definition: 'Record of all money flowing in and out of SA in 1 year (Current, Capital, Financial).' },
      { term: '17. FDI', definition: 'Foreign Direct Investment — foreign company builds a factory or long-term operation in SA.' },
      { term: '18. Depreciation', definition: 'Floating Rand loses value against foreign currencies (e.g. R18 to R20 per $1).' },
      { term: '19. Appreciation', definition: 'Floating Rand gains value against foreign currencies (e.g. R18 to R16 per $1).' },
      { term: '20. Economic Growth', definition: 'Quantitative increase in Real GDP and total output from one year to the next.' },
      { term: '21. Economic Development', definition: 'Qualitative improvement in living standards: schools, health, housing, less poverty.' },
      { term: '22. HDI', definition: 'Human Development Index (0–1) measuring Health, Education, and Income.' },
      { term: '23. Business Cycle', definition: 'Wave movement of the economy: Boom -> Recession -> Trough -> Recovery.' },
      { term: '24. Recession', definition: 'Downswing where Real GDP falls for 2 consecutive quarters (6 months).' },
      { term: '25. Leading Indicator', definition: 'Signals future economic direction (e.g. building plans approved, JSE share prices).' },
      { term: '26. Lagging Indicator', definition: 'Confirms economic shifts after they happen (e.g. unemployment rate, inflation).' },
      { term: '27. Productivity', definition: 'Output divided by Input: Total Output / Number of Workers (or Hours).' },
      { term: '28. Trade Union', definition: 'Worker organisation (e.g. COSATU, NUM, SADTU) protecting wages and conditions.' },
      { term: '29. CCMA', definition: 'Commission for Conciliation, Mediation and Arbitration — resolves disputes free.' },
      { term: '30. Collective Bargaining', definition: 'Union and employer negotiating wages and conditions for all workers together.' }
    ],
    workedExample: {
      title: '6 Mixed Level 3 Exam Calculations',
      scenario:
        'Master these six fast calculation patterns covering every Level 3 formula (GDP, CPI Inflation, Unemployment Rate, Money Multiplier, Productivity, and Economic Growth Rate):',
      formulaBlock: `1) GDP (Expenditure): C=2,000, I=500, G=800, X=600, M=400
   GDP = 2,000 + 500 + 800 + (600 - 400) = 3,300 + 200 = R3,500

2) Inflation (CPI): Basket 2024 = R1,000, 2025 = R1,100
   Inflation = ((1,100 - 1,000) / 1,000) × 100 = 10%

3) Unemployment Rate: Employed 400k, Unemployed 100k -> Labour Force = 500k
   Rate = (100 / 500) × 100 = 20%

4) Money Multiplier: Deposit R10,000, Reserve 10% (0.1)
   Multiplier = 1 / 0.1 = 10  |  Total Created = R10,000 × 10 = R100,000

5) Productivity: 10 workers produce 500 units
   Productivity = 500 / 10 = 50 units per worker

6) Growth Rate: GDP last year 5,000, this year 5,250
   Growth = ((5,250 - 5,000) / 5,000) × 100 = 5%`,
      steps: [
        'Calculation Check 1–3: Show the exact formula first, substitute the numbers, and include units (R3,500 for GDP; 10% for CPI inflation; 20% for unemployment rate).',
        'Calculation Check 4–6: Keep decimals accurate (1 / 0.1 = 10 -> R100,000 total credit creation; 500 / 10 = 50 units per worker; (250 / 5,000) × 100 = 5% growth).'
      ],
      finalAnswer:
        '1) R3,500 | 2) 10% | 3) 20% | 4) R100,000 (Multiplier 10) | 5) 50 units/worker | 6) 5%'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Section A — Define GDP (2 marks)',
        question: 'Section A (1/5): Define GDP. (2 marks)',
        answer: 'Total value of all goods and services produced inside a country in one year.'
      },
      {
        number: 2,
        label: 'Section A — Define Inflation (2 marks)',
        question: 'Section A (2/5): Define Inflation. (2 marks)',
        answer: 'A general and continuous rise in prices over time so that money buys less.'
      },
      {
        number: 3,
        label: 'Section A — Define Fiscal Policy (2 marks)',
        question: 'Section A (3/5): Define Fiscal Policy. (2 marks)',
        answer: 'Government using taxation and government spending to control and stabilise the economy.'
      },
      {
        number: 4,
        label: 'Section A — Define Productivity (2 marks)',
        question: 'Section A (4/5): Define Productivity. (2 marks)',
        answer: 'Total Output divided by Input (how much is produced per worker or per hour).'
      },
      {
        number: 5,
        label: 'Section A — Define Depreciation (2 marks)',
        question: 'Section A (5/5): Define Depreciation. (2 marks)',
        answer: 'When the currency loses value against foreign currencies (e.g. R18 to R20 per $1).'
      },
      {
        number: 6,
        label: 'Section B — 3 Leakages & 3 Injections (6 marks)',
        question: 'Section B (1/5): Name 3 leakages and 3 injections. (6 marks)',
        answer:
          'Leakages: Savings (S), Taxes (T), Imports (M). Injections: Investment (I), Government Spending (G), Exports (X).'
      },
      {
        number: 7,
        label: 'Section B — Direct vs Indirect Tax (4 marks)',
        question: 'Section B (2/5): Distinguish between Direct and Indirect tax. (4 marks)',
        answer:
          'Direct Tax is charged directly on income or wealth (e.g. Income Tax / PAYE, Company Tax). Indirect Tax is charged on spending and included in prices (e.g. 15% VAT, Excise/Customs duty).'
      },
      {
        number: 8,
        label: 'Section B — 3 Tools of Monetary Policy (3 marks)',
        question: 'Section B (3/5): Give 3 tools of monetary policy. (3 marks)',
        answer:
          'Any three: Repo Rate, Cash Reserve Requirement, Open Market Operations (buying/selling bonds), or Moral Persuasion.'
      },
      {
        number: 9,
        label: 'Section B — 4 Phases of Business Cycle (4 marks)',
        question: 'Section B (4/5): Name 4 phases of the business cycle. (4 marks)',
        answer: 'Boom / Peak, Recession / Downswing, Trough / Depression, and Recovery / Upswing.'
      },
      {
        number: 10,
        label: 'Section B — What Is CCMA? (3 marks)',
        question: 'Section B (5/5): What is the CCMA? (3 marks)',
        answer:
          'Commission for Conciliation, Mediation and Arbitration — an independent body that resolves labour disputes between workers and employers for free (e.g. unfair dismissal).'
      },
      {
        number: 11,
        label: 'Section C — Calculate GDP (3 marks)',
        question: 'Section C (1/5): Calculate GDP: C = 3,000, I = 1,000, G = 1,500, X = 1,800, M = 1,300. (3 marks)',
        answer: 'GDP = C + I + G + (X - M) = 3,000 + 1,000 + 1,500 + (1,800 - 1,300) = 5,500 + 500 = R6,000.'
      },
      {
        number: 12,
        label: 'Section C — Calculate Unemployment Rate (2 marks)',
        question: 'Section C (2/5): Calculate Unemployment Rate: Labour Force = 20m, Unemployed = 6m. (2 marks)',
        answer: 'Unemployment Rate = (6 / 20) × 100 = 30%.'
      },
      {
        number: 13,
        label: 'Section C — Calculate Growth Rate (2 marks)',
        question: 'Section C (3/5): Calculate Growth Rate: GDP 2023 = 4,000, 2024 = 4,200. (2 marks)',
        answer: 'Growth Rate = ((4,200 - 4,000) / 4,000) × 100 = (200 / 4,000) × 100 = 5%.'
      },
      {
        number: 14,
        label: 'Section C — Calculate Prime Rate (1 mark)',
        question: 'Section C (4/5): What is the Prime Rate if Repo = 8%? (1 mark)',
        answer: 'Prime Rate = Repo + 3.5% = 8% + 3.5% = 11.5%.'
      },
      {
        number: 15,
        label: 'Section C — Calculate Productivity (2 marks)',
        question: 'Section C (5/5): Calculate Productivity: 20 workers produce 2,000 units. (2 marks)',
        answer: 'Productivity = 2,000 / 20 = 100 units per worker.'
      },
      {
        number: 16,
        label: 'Section D — Essay: "Inflation Is Bad for the Poor" (10 marks)',
        question:
          'Section D (Essay — 10 marks): "Inflation is bad for the poor." Discuss. Explain 2 causes of inflation, 2 effects on the poor, and what SARB should do. Use examples from Mbombela.',
        answer:
          'Intro: Inflation = general continuous rise in prices so money buys less. 2 Causes: (1) Cost-Push — petrol rises, taxi fare from KaNyamazane to Mbombela rises and food/kota prices rise; (2) Demand-Pull — payday rush pushes shop/kota prices up when goods run low (also Imported Inflation when weak Rand raises fuel costs). 2 Effects on Poor (with balanced discussion): Pensioners/grant recipients on fixed R2,000 incomes buy fewer groceries in Mbombela and savers lose value; meanwhile borrowers/large shops may adjust easier. SARB Action: Raise the Repo Rate (above 3%–6% target pressure) so Prime rises, borrowing/spending cools, and prices stabilise.'
      }
    ]
  },
  {
    id: 'ncv-ee-l4-ch1-the-macroeconomy-and-national-income-in-depth',
    level: 4,
    chapterNumber: 1,
    chapterLabel: 'Level 4 • Chapter 1',
    displayHeading: 'Level 4 — Chapter 1: The Macroeconomy & National Income in Depth',
    title: 'The Macroeconomy & National Income in Depth',
    subtitle: 'Level 4 - NCV Economic Environment (Nexovian Original Series)',
    sections: [
      {
        heading: 'The Macroeconomy — 4 Main Goals & Policy Trade-Offs',
        paragraphs: [
          'In Level 3 you learned GDP = C + I + G + (X - M). In Level 4 you learn WHY that single formula is not enough, and how the REAL macroeconomy behaves.',
          'Microeconomics looks at one shop in Mbombela. Macroeconomics looks at ALL shops, ALL workers, and ALL government together across South Africa.',
          'Policy Conflict / Trade-Off: Government wants to achieve all 4 goals at once, but fixing one goal often worsens another. For example, heavy government spending boosts Growth ↑ and Employment ↑, yet pushes Inflation ↑ and Imports ↑ (worsening the Balance of Payments).'
        ],
        bullets: [
          'Goal 1 — Economic Growth: GDP should grow at 5%+ per year to create jobs.',
          'Goal 2 — Full Employment: Unemployment must fall steadily.',
          'Goal 3 — Price Stability: Inflation must remain inside SARB’s 3%–6% target band.',
          'Goal 4 — Balance of Payments Stability: South Africa should not import far more than it exports.'
        ]
      },
      {
        heading: 'National Income Accounting in Depth — 3 Methods & Avoiding Double Counting',
        paragraphs: [
          'GDP is measured through three independent methods that MUST arrive at the same total value:',
          'Why Production Uses Value Added: If a farmer sells maize for R10, a miller sells mealie meal for R20, and a shop sells pap for R35, we do NOT add 10 + 20 + 35 = R65 (that is Double Counting!). We only sum the value added at each stage: 10 + (20 - 10) + (35 - 20) = R35 GDP.'
        ],
        bullets: [
          '1. Production Method (Value Added): Add the net value created at every production stage (e.g. R10 + R10 + R15 = R35).',
          '2. Income Method: GDP = Wages + Rent + Interest + Profit. Example: R500 wages + R100 rent + R100 interest + R300 profit = R1,000 GDP.',
          '3. Expenditure Method: GDP = C + I + G + (X - M).'
        ]
      },
      {
        heading: 'From GDP to National Income (Level 4 Chain) & Capital Depreciation',
        paragraphs: [
          'Machines wear out each year — called Depreciation (Capital Consumption). For example, if a taxi bought for R500k is worth R450k after 1 year, depreciation = R50k. That R50k is NOT new income; it merely replaces wear and tear.',
          'GDP Per Capita = GDP / Population. With SA GDP ≈ R7 Trillion and Population ≈ 63 Million, GDP Per Capita = 7,000,000,000,000 / 63,000,000 = R111,111 per person per year. However, averages hide severe inequality: averaging a Sandton billionaire and someone in rural Mpumalanga with R0 gives R55k, even though neither lives on R55k — making GDP per capita misleading without inequality context.'
        ],
        formulaBlock: `LEVEL 4 NATIONAL INCOME CONVERSION CHAIN:
• GDP at Market Prices
  - Taxes on Products + Subsidies   = GDP at Basic Prices
  - Depreciation (wear & tear)      = NDP (Net Domestic Product)
• GDP at Market Prices
  + Net Income from Abroad          = GNP (Gross National Product)
  - Depreciation                    = NNP = National Income`
      }
    ],
    keyTerms: [
      {
        term: 'Macroeconomics',
        definition: 'Study of the performance, structure, and policy behaviour of the whole economy.'
      },
      {
        term: 'Policy Trade-off',
        definition: 'Situation where improving one macroeconomic goal makes another goal worse.'
      },
      {
        term: 'Value Added',
        definition: 'Extra market value created at a single stage of production (Output - Intermediate Inputs).'
      },
      {
        term: 'Double Counting',
        definition: 'Counting intermediate goods more than once (e.g. adding maize + mealie meal + pap).'
      },
      {
        term: 'Depreciation',
        definition: 'Wear and tear (capital consumption) on machines, vehicles, and equipment over time.'
      },
      {
        term: 'GDP at Market Prices',
        definition: 'Total GDP value including product taxes and excluding government subsidies.'
      },
      {
        term: 'GDP at Basic Prices',
        definition: 'Total GDP excluding taxes on products and including subsidies.'
      },
      {
        term: 'GDP Per Capita',
        definition: 'Total GDP divided by total population — average annual output/income per person.'
      },
      {
        term: 'National Income',
        definition: 'Total net income (NNP) earned by all citizens’ factors of production.'
      }
    ],
    workedExample: {
      title: 'Value Added Chain (Cotton Shirt) & L4 National Income Conversion',
      scenario:
        'Part A (Value Added): Cotton farmer sells raw cotton for R200; Factory turns it into a shirt sold for R500; Retail shop sells the shirt to consumers for R800.\nPart B (National Income Chain): GDP at Market Prices = R7,000 bn; Taxes on products = R700 bn; Subsidies = R100 bn; Depreciation = R800 bn; Net Income from Abroad = -R200 bn (more income left SA than entered).',
      formulaBlock: `PART A — VALUE ADDED METHOD (AVOIDING DOUBLE COUNTING):
• Farmer:  200 - 0   = R200
• Factory: 500 - 200 = R300
• Shop:    800 - 500 = R300
Total GDP = 200 + 300 + 300 = R800  (Adding 200+500+800 = R1,500 would double count!)

PART B — NATIONAL INCOME CHAIN (R BILLIONS):
• GDP at Basic Prices   = 7,000 - 700 + 100 = R6,400 bn
• NDP                   = 6,400 - 800       = R5,600 bn
• GNP                   = 7,000 + (-200)    = R6,800 bn
• National Income (NNP) = 6,800 - 800       = R6,000 bn`,
      steps: [
        'Step 1 (Value Added): Sum only the extra value added at each stage (R200 + R300 + R300 = R800), matching the final retail shirt price without double counting intermediate cotton and fabric.',
        'Step 2 (Market Prices -> Basic Prices -> NDP): Subtract Taxes (R700 bn) and add Subsidies (R100 bn) to R7,000 bn -> R6,400 bn Basic Prices. Subtract Depreciation (R800 bn) -> R5,600 bn NDP.',
        'Step 3 (GNP -> NNP / National Income): Add Net Income from Abroad (-R200 bn) to R7,000 bn -> R6,800 bn GNP. Subtract Depreciation (R800 bn) -> R6,000 bn National Income (NNP).'
      ],
      finalAnswer:
        'Value Added GDP = R800; GDP at Basic Prices = R6,400 bn, NDP = R5,600 bn, GNP = R6,800 bn, and National Income (NNP) = R6,000 bn.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: '4 Macroeconomic Goals (4 marks)',
        question: 'Name the 4 macroeconomic goals. (4 marks)',
        answer:
          'Economic Growth, Full Employment, Price Stability (low/stable inflation), and Balance of Payments Stability.'
      },
      {
        number: 2,
        label: 'Explain Policy Trade-Off With Example (3 marks)',
        question: 'Explain Policy Trade-off with an example. (3 marks)',
        answer:
          'Fixing or improving one macroeconomic goal worsens another. Example: Government increases spending to create jobs (Growth & Employment ↑), but this causes inflation and imports to rise (Price Stability & BOP worsen).'
      },
      {
        number: 3,
        label: 'Double Counting & How to Avoid It (3 marks)',
        question: 'What is Double Counting? How is it avoided? (3 marks)',
        answer:
          'Counting intermediate products more than once in GDP. It is avoided by using the Value Added method — adding only the net value created at each stage (or counting final goods only).'
      },
      {
        number: 4,
        label: 'Calculate GDP by Value Added (3 marks)',
        question:
          'Calculate GDP by Value Added: Wood sells for R50, Chair maker sells chair for R150, Shop sells chair for R250. (3 marks)',
        answer: '50 + (150 - 50) + (250 - 150) = 50 + 100 + 100 = R250.'
      },
      {
        number: 5,
        label: 'Why GDP Per Capita Is Misleading in SA (2 marks)',
        question: 'Why is GDP Per Capita misleading in South Africa? (2 marks)',
        answer:
          'It is only an average and hides high income inequality — extreme wealth pulls the average up while poor households still remain poor.'
      },
      {
        number: 6,
        label: 'Calculate GDP Per Capita (2 marks)',
        question: 'GDP = R6,000 bn, Population = 60m. Calculate GDP per capita. (2 marks)',
        answer: 'R6,000,000,000,000 / 60,000,000 = R100,000 per person per year.'
      }
    ]
  },
  {
    id: 'ncv-ee-l4-ch2-aggregate-demand-and-aggregate-supply',
    level: 4,
    chapterNumber: 2,
    chapterLabel: 'Level 4 • Chapter 2',
    displayHeading: 'Level 4 — Chapter 2: Aggregate Demand & Aggregate Supply (AD/AS)',
    title: 'Aggregate Demand & Aggregate Supply (AD/AS)',
    subtitle: 'Level 4 - NCV Economic Environment (Nexovian Original Series)',
    sections: [
      {
        heading: 'Aggregate Demand (AD) & Its 4 Components in Depth',
        paragraphs: [
          'In Level 3 you learned demand for ONE product (e.g. kota price goes up, demand goes down). In Level 4 you learn demand for EVERYTHING in South Africa together — Aggregate Demand (AD), the total spending in the economy.',
          'Formula: AD = C + I + G + (X - M) — the same components as GDP, because AD is what sectors WANT to buy, whereas GDP is what was actually bought.'
        ],
        bullets: [
          '1. Consumption (C — ~60% of SA AD): Household spending on food, clothes, rent, transport. Shifts: Income ↑ -> C ↑; Tax ↑ -> C ↓; Interest rate ↑ -> people save more, C ↓; Consumer confidence ↑ -> C ↑.',
          '2. Investment (I): Businesses buying machines and building factories (NOT buying shares). Shifts: Interest rate ↓ -> cheap loans -> I ↑; Business confidence ↑ -> I ↑; Load shedding -> I ↓.',
          '3. Government Spending (G): Building roads, paying teachers, paying grants. Shifts: Budget policy; Election year -> G ↑.',
          '4. Net Exports (X - M): Exports minus Imports. Shifts: Weak Rand -> exports cheap -> X ↑, M ↓, so (X - M) ↑; World economy booms -> buys more SA goods -> X ↑.'
        ]
      },
      {
        heading: 'Aggregate Supply (AS) — Short-Run (SRAS) vs Long-Run (LRAS)',
        paragraphs: [
          'Aggregate Supply (AS) is the total volume of goods and services businesses WANT to produce across the economy, and Equilibrium occurs where AD = AS (giving Equilibrium Price Level + Equilibrium GDP).',
          'Short-Run AS (SRAS) slopes UPWARDS because wages are fixed in the short run: if prices rise, business profit rises, so firms produce MORE. Example: Pap price rises from R20 to R30 while workers still earn R100/day -> shop makes higher profit and produces more pap.',
          'Long-Run AS (LRAS) is a VERTICAL line: in the long run, the economy produces at FULL capacity (all workers employed, all machines used). You CANNOT produce more just by raising prices because wages also rise. The only way to shift LRAS right is MORE resources: more workers, better technology, or better education.'
        ]
      },
      {
        heading: '4 Core AD/AS Shifts — Boom, Recession, Good Shock & Stagflation',
        paragraphs: [
          'Predicting what happens to GDP, Price Level, and Unemployment when AD or AS shifts is the core skill of Level 4:'
        ],
        bullets: [
          '1. AD Shifts RIGHT (Boom): Government cuts taxes -> people spend more -> AD shifts right. Result: GDP ↑, Price Level ↑ (Demand-Pull Inflation), Unemployment ↓. Good: more jobs; Bad: inflation.',
          '2. AD Shifts LEFT (Recession): SARB raises repo rate -> loans expensive -> spending drops -> AD shifts left. Result: GDP ↓, Price Level ↓, Unemployment ↑. Good: inflation cools; Bad: jobs lost.',
          '3. AS Shifts RIGHT (Good Supply Shock — BEST OUTCOME): New technology, Eskom fixed, better roads. Result: GDP ↑ AND Price Level ↓ — growth without inflation!',
          '4. AS Shifts LEFT (Bad Supply Shock — STAGFLATION / WORST OUTCOME): Oil price ↑, load shedding, drought -> Cost-Push shift left. Result: GDP ↓ AND Price Level ↑ at the same time (Stagnation + Inflation = Stagflation). SA 2023 load shedding pushed AS left: GDP down and prices up simultaneously. Memorise Stagflation!'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Aggregate Demand',
        definition: 'Total spending on all SA goods and services at a given price level: C + I + G + (X - M).'
      },
      {
        term: 'Aggregate Supply',
        definition: 'Total quantity of goods and services all businesses want to produce.'
      },
      {
        term: 'SRAS',
        definition: 'Short-Run Aggregate Supply — slopes upwards because wages remain fixed in the short run.'
      },
      {
        term: 'LRAS',
        definition: 'Long-Run Aggregate Supply — vertical line showing full-capacity output.'
      },
      {
        term: 'Equilibrium',
        definition: 'Point where Aggregate Demand equals Aggregate Supply (Equilibrium Price + Equilibrium GDP).'
      },
      {
        term: 'Demand-Pull Inflation',
        definition: 'Rising price level caused by AD shifting right due to excessive spending.'
      },
      {
        term: 'Cost-Push Inflation',
        definition: 'Rising price level caused by AS shifting left due to higher production costs.'
      },
      {
        term: 'Stagflation',
        definition: 'GDP falls AND prices rise simultaneously when AS shifts left (exam favourite).'
      }
    ],
    workedExample: {
      title: 'Mbombela SRD Grant Expansion (AD Right) vs Stage 6 Load Shedding (AS Left)',
      scenario:
        'Scenario 1 (AD Shift): Government grants everyone a R350 SRD grant increase. Mbombela households spend more in shops.\nScenario 2 (AS Shift): Eskom imposes Stage 6 load shedding, halting factory production across South Africa.',
      formulaBlock: `SCENARIO 1 — R350 SRD GRANT INCREASE (AD SHIFTS RIGHT):
• Household Consumption C ↑ -> AD shifts RIGHT -> Shops hire more workers
• GDP ↑: R100m -> R120m  |  Price Level ↑: 100 -> 110 (10% Inflation)  |  Unemployment ↓: 35% -> 30%

SCENARIO 2 — ESKOM STAGE 6 LOAD SHEDDING (AS SHIFTS LEFT = STAGFLATION):
• Factories cannot produce -> AS shifts LEFT -> Businesses retrench workers
• GDP ↓: R120m -> R90m   |  Price Level ↑: 110 -> 125 (STAGFLATION!)    |  Unemployment ↑ -> 40%
-> Worse than a normal recession because prices rise AND jobs are lost at the same time!`,
      steps: [
        'Step 1 (Trace SRD Grant Impact): Extra grant cash boosts C, shifting AD right. Real GDP expands from R100m to R120m and unemployment falls from 35% to 30%, at the cost of 10% Demand-Pull inflation (100 -> 110).',
        'Step 2 (Trace Stage 6 Load Shedding): Power cuts raise production costs and cut output, shifting AS left. Real GDP drops from R120m to R90m while prices jump from 110 to 125.',
        'Step 3 (Diagnose Stagflation): Unlike a demand-side recession (where falling demand pulls prices down), Stage 6 load shedding triggers Stagflation — rising prices PLUS rising unemployment (up to 40%).'
      ],
      finalAnswer:
        'Scenario 1 (AD right): GDP R100m->R120m, Prices 100->110, Unemployment 35%->30%; Scenario 2 (AS left): Stagflation with GDP R120m->R90m, Prices 110->125, Unemployment ↑ to 40%.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Define Aggregate Demand & Formula (3 marks)',
        question: 'Define Aggregate Demand and give its formula. (3 marks)',
        answer: 'Total spending in the entire economy. Formula: AD = C + I + G + (X - M).'
      },
      {
        number: 2,
        label: 'Why SRAS Slopes Upwards (2 marks)',
        question: 'Why does SRAS slope upwards? (2 marks)',
        answer:
          'When prices rise while wages stay fixed in the short run, business profits increase, so firms produce more.'
      },
      {
        number: 3,
        label: 'Why LRAS Is Vertical (2 marks)',
        question: 'Why is LRAS vertical? (2 marks)',
        answer:
          'In the long run the economy operates at full capacity — raising prices alone cannot increase output; only more resources, workers, education, or technology can shift LRAS right.'
      },
      {
        number: 4,
        label: 'AD Shifts Right Impact (3 marks)',
        question: 'AD shifts right. What happens to GDP, Prices, and Unemployment? (3 marks)',
        answer: 'GDP ↑, Price Level ↑ (Inflation), and Unemployment ↓.'
      },
      {
        number: 5,
        label: 'Define & Cause of Stagflation (3 marks)',
        question: 'What is Stagflation and what causes it? (3 marks)',
        answer:
          'Stagflation is when GDP falls AND prices rise (inflation) at the same time. It is caused by AS shifting left due to supply shocks such as oil price hikes, load shedding, or drought.'
      },
      {
        number: 6,
        label: 'Fixing Eskom & Building Roads Shift Analysis (4 marks)',
        question:
          'Government fixes Eskom and builds new roads. Which curve shifts, in which direction, and what happens to GDP and Prices? (4 marks)',
        answer:
          'Aggregate Supply (AS) shifts RIGHT. Real GDP ↑ and Price Level ↓ — the best macroeconomic outcome (growth without inflation).'
      }
    ]
  },
  {
    id: 'ncv-ee-l4-ch3-inflation-and-unemployment-in-depth-phillips-curve',
    level: 4,
    chapterNumber: 3,
    chapterLabel: 'Level 4 • Chapter 3',
    displayHeading: 'Level 4 — Chapter 3: Inflation & Unemployment in Depth (Phillips Curve)',
    title: 'Inflation & Unemployment in Depth (Phillips Curve)',
    subtitle: 'Level 4 - NCV Economic Environment (Nexovian Original Series)',
    sections: [
      {
        heading: 'The Phillips Curve — Short-Run Trade-Off vs Long-Run NAIRU',
        paragraphs: [
          'In Level 3 you learned Inflation = prices rise and Unemployment = no jobs. In Level 4 you learn that they are LINKED: when one goes down, the other goes up. This inverse relationship is the Trade-off shown on the Phillips Curve — the main diagram of Level 4.',
          'Short-Run Phillips Curve (SRPC) slopes DOWNWARDS: when Unemployment ↓ (more people working) -> people have money -> they spend more -> Demand ↑ -> businesses raise prices -> Inflation ↑. Conversely, when Unemployment ↑ -> people spend less -> Demand ↓ -> businesses cut prices -> Inflation ↓. So in the SHORT RUN: Low Unemployment = High Inflation, and High Unemployment = Low Inflation.',
          'Mbombela December vs January Example: In December everyone gets shop jobs (unemployment drops from 35% to 25%); everyone has money, so shops raise kotas from R25 to R35 (inflation up — trade-off happened). In January shops fire workers (unemployment rises to 40%); nobody buys, so shops cut kota prices back to R20 to attract customers (inflation down).',
          'Long-Run Phillips Curve (LRPC) is VERTICAL at NAIRU: in the LONG RUN there is NO trade-off. If government keeps spending to force unemployment lower, workers demand higher wages because prices rose; businesses raise prices again to cover wages, inflation keeps rising, and unemployment returns to its Natural Rate (NAIRU). Government cannot hold unemployment below NAIRU forever without causing runaway inflation.'
        ],
        bullets: [
          'NAIRU (Natural Rate of Unemployment): Unemployment that will ALWAYS exist, even in good times. In South Africa NAIRU is very high (~30%+) mainly because of structural unemployment (skills mismatch).',
          '1. Frictional Unemployment: People temporarily between jobs (left one job, searching for the next).',
          '2. Structural Unemployment: Skills do not match available jobs (businesses need electricians, but people were trained as cashiers).',
          '3. Seasonal Unemployment: Work available only during certain seasons (e.g. farm workers in winter).'
        ]
      },
      {
        heading: '3 Types of Inflation in Depth — Level 4',
        paragraphs: [
          'Distinguish clearly how each type of inflation shifts Aggregate Demand (AD) or Aggregate Supply (AS) and affects South African prices:'
        ],
        bullets: [
          '1. Demand-Pull Inflation: Too much money chasing too few goods -> AD shifts Right. Example: Government expands grants, everyone buys more, and prices rise.',
          '2. Cost-Push Inflation: Costs of production rise -> AS shifts Left. Example: Petrol ↑, Wages ↑, or Eskom tariffs ↑, and businesses pass higher costs to consumers.',
          '3. Imported Inflation: Weak Rand makes imported goods expensive even without higher local production costs. Example: Rand weakens from R18 to R20 per $1 -> an imported phone jumps from R10,000 to R12,000.'
        ]
      },
      {
        heading: 'Effects of Inflation (Winners vs Losers) & How to Fight Inflation',
        paragraphs: [
          'Inflation redistributes real purchasing power unevenly across households and borrowers, while policymakers use three tools to bring inflation down:'
        ],
        bullets: [
          'LOSER — Fixed Income Earners: Pensioners receive a fixed R2,000/month. If prices rise 10%, their R2,000 buys 10% less — they grow poorer.',
          'LOSER — Savers & Lenders: You lend R1,000 and get back R1,000 a year later, but higher prices mean that R1,000 buys less.',
          'LOSER — Poor Households: Spend ~80% of income on food, so food inflation hits them hardest.',
          'WINNER — Borrowers / Debtors: You borrow R10,000 for a fridge; inflation pushes your wage up while the R10,000 loan stays fixed, so you repay with cheaper money.',
          'WINNER — Owners of Assets: Houses, gold, and land rise in value alongside inflation.',
          'Policy 1 — Monetary Policy (SARB): Increase Repo Rate -> loans expensive -> spending ↓ -> AD ↓ -> Inflation ↓ (but Unemployment ↑ — trade-off again).',
          'Policy 2 — Fiscal Policy (Govt): Increase Tax and Decrease Spending -> AD ↓ -> Inflation ↓.',
          'Policy 3 — Supply-Side Policy: Fix Eskom, build roads, and train workers -> AS shifts Right -> GDP ↑ and Prices ↓ (best long-run solution, though it takes longer).'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Phillips Curve',
        definition: 'Diagram showing the inverse relationship (trade-off) between inflation and unemployment.'
      },
      {
        term: 'SRPC',
        definition: 'Short-Run Phillips Curve — slopes downwards because a short-run trade-off exists.'
      },
      {
        term: 'LRPC',
        definition: 'Long-Run Phillips Curve — vertical line at NAIRU showing no long-run trade-off.'
      },
      {
        term: 'NAIRU / Natural Rate',
        definition: 'Unemployment that always exists even in good times (Frictional + Structural + Seasonal).'
      },
      {
        term: 'Frictional Unemployment',
        definition: 'Workers temporarily between jobs while searching for their next position.'
      },
      {
        term: 'Structural Unemployment',
        definition: 'Mismatch between the skills workers have and the skills businesses need.'
      },
      {
        term: 'Demand-Pull Inflation',
        definition: 'Too much spending in the economy pushing Aggregate Demand (AD) to the right.'
      },
      {
        term: 'Cost-Push Inflation',
        definition: 'Rising production costs (petrol, wages, electricity) pushing Aggregate Supply (AS) left.'
      },
      {
        term: 'Imported Inflation',
        definition: 'A weaker Rand making imported goods and inputs more expensive in South Africa.'
      }
    ],
    workedExample: {
      title: 'SA Phillips Curve Shift (2024–2026) & Real vs Nominal Wage Calculation',
      scenario:
        'Part A (Phillips Curve): In 2024, SA unemployment = 32% and inflation = 6%. Government increases spending to create jobs, so in 2025 unemployment drops to 29% and inflation rises to 9%. Government keeps spending in 2026.\nPart B (Real vs Nominal Wage): Your wage is R10,000 per month, inflation is 10%, and your nominal wage rises 5% to R10,500.',
      formulaBlock: `PART A — PHILLIPS CURVE (SHORT RUN VS LONG RUN):
• 2024 -> 2025: AD shifts right | Unemployment: 32% -> 29% | Inflation: 6% -> 9%
  (Movement leftwards up along the SRPC = short-run trade-off!)
• 2026 (Long Run): Workers demand higher wages for 9% inflation -> firms raise prices to 12%
  Firms cannot afford workers at high wages -> Unemployment returns to 32% (NAIRU)
  Result: SRPC shifts RIGHT -> 32% unemployment + 12% inflation = WORSE (no long-run gain!)

PART B — REAL VS NOMINAL WAGE CHANGE:
• New Nominal Wage = R10,000 × 1.05 = R10,500 (+5% nominal)
• Real Wage Change  = Nominal % Change - Inflation % = 5% - 10% = -5%
-> You are 5% POORER in purchasing power even though your payslip went up!`,
      steps: [
        'Step 1 (Short-Run Movement 2024->2025): Extra government spending shifts AD right, moving leftwards up along the SRPC — unemployment falls (32% -> 29%) while inflation climbs (6% -> 9%).',
        'Step 2 (Long-Run Adjustment 2026): Continued spending pushes workers to demand higher wages to match 9% inflation. Firms raise prices to 12% and shed unaffordable labour, pushing unemployment back to 32% NAIRU — SRPC shifts right with no lasting job gain.',
        'Step 3 (Real Wage Formula): Subtract 10% inflation from the 5% nominal raise (5% - 10% = -5%). This explains why unions fight for wage increases ABOVE inflation.'
      ],
      finalAnswer:
        'Short-run trade-off cuts unemployment to 29% at 9% inflation, but long-run wage adjustment shifts SRPC right back to 32% unemployment with 12% inflation; Real Wage Change = 5% - 10% = -5% (5% poorer).'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Short-Run Phillips Curve Explained (4 marks)',
        question: 'Draw and explain the Short-Run Phillips Curve. (4 marks)',
        answer:
          'It is a downward-sloping curve showing an inverse trade-off: Low unemployment = High inflation, and High unemployment = Low inflation, because more jobs create more spending, which pushes prices up.'
      },
      {
        number: 2,
        label: 'Why Long-Run Phillips Curve Is Vertical (3 marks)',
        question: 'Why is the Long-Run Phillips Curve vertical? (3 marks)',
        answer:
          'There is no trade-off in the long run. Unemployment returns to the natural rate (NAIRU) even if inflation keeps rising, because workers and businesses adjust wages and prices.'
      },
      {
        number: 3,
        label: 'Define NAIRU & 3 Unemployment Types (4 marks)',
        question: 'What is NAIRU? Name the 3 types of unemployment that make it up. (4 marks)',
        answer:
          'NAIRU is the Natural Rate of Unemployment that always exists, even in good economic times. It is made up of Frictional, Structural, and Seasonal unemployment.'
      },
      {
        number: 4,
        label: 'Demand-Pull vs Cost-Push Inflation (4 marks)',
        question: 'Distinguish Demand-Pull vs Cost-Push inflation, giving 1 example each. (4 marks)',
        answer:
          'Demand-Pull = too much spending shifting AD right (e.g. government grants increase). Cost-Push = rising production costs shifting AS left (e.g. petrol or Eskom tariff increases).'
      },
      {
        number: 5,
        label: '2 Groups Who Lose From Inflation (4 marks)',
        question: 'Who loses from inflation? Give 2 groups and explain why. (4 marks)',
        answer:
          '1) Pensioners / Fixed-income earners: their Rand income stays fixed while prices rise, so they buy less. 2) Savers / Lenders: money repaid or withdrawn later buys fewer goods and services.'
      },
      {
        number: 6,
        label: 'Calculate Real Wage Change (2 marks)',
        question:
          'Your wage rises 8% and inflation is 12%. Are you richer or poorer? Calculate real wage change. (2 marks)',
        answer: 'Real wage change = 8% - 12% = -4%. You are poorer by 4% in real terms.'
      }
    ]
  },
  {
    id: 'ncv-ee-l4-ch4-fiscal-and-monetary-policy-in-depth',
    level: 4,
    chapterNumber: 4,
    chapterLabel: 'Level 4 • Chapter 4',
    displayHeading: 'Level 4 — Chapter 4: Fiscal & Monetary Policy in Depth',
    title: 'Fiscal & Monetary Policy in Depth',
    subtitle: 'Level 4 - NCV Economic Environment (Nexovian Original Series)',
    sections: [
      {
        heading: 'Fiscal Policy, Budget Deficits, Multiplier Effect & Crowding Out',
        paragraphs: [
          'In Level 3 you learned Government uses Tax (T) and Spending (G) and SARB uses the Repo Rate. In Level 4 you learn HOW they work together, WHY policies fail, and the TIME LAG problem.',
          'South Africa has run a Budget Deficit (G > T) for 20+ years. To finance the deficit, government borrows by selling Government Bonds: investors buy bonds and government must repay them with interest, building up National Debt.',
          'The Multiplier Effect (Level 4 Exam Favourite): When government spends R1, it creates MORE than R1 of GDP. Example: Government builds a road in Mbombela and pays a builder R1,000 -> builder spends R800 at Shoprite -> Shoprite owner spends R640 at a taxi -> taxi driver spends R512 at a kota shop -> total GDP rises to R5,000!',
          'Why Fiscal Policy Fails in SA — Crowding Out: When government borrows heavily to fund a deficit, it competes with private businesses for bank loans. Interest rates rise for everyone, businesses cannot afford loans to invest, and government spending crowds out private investment (net growth ≈ zero).'
        ],
        bullets: [
          'Balanced Budget: G = T (government spending equals tax revenue).',
          'Budget Deficit: G > T (government spends more than it collects and must borrow).',
          'Budget Surplus: G < T (government collects more than it spends — rare in SA).'
        ],
        formulaBlock: `Multiplier = 1 / (1 - MPC)
• MPC (Marginal Propensity to Consume) = share of each extra R1 spent.
• If MPC = 0.8 (spend 80c per R1): Multiplier = 1 / (1 - 0.8) = 1 / 0.2 = 5
  R1,000 Govt Spending × 5 = R5,000 total GDP increase!
• If households save more (MPC = 0.5): Multiplier = 1 / 0.5 = 2 (smaller impact).`
      },
      {
        heading: 'Monetary Policy, Repo Rate Chain, 3–6% Target & Cash Reserve Ratio',
        paragraphs: [
          'Monetary Policy is the SARB using the Repo Rate and Money Supply to control inflation. By law, SARB follows an Inflation Targeting mandate of 3–6%: if inflation hits 7%, SARB MUST raise the Repo Rate even if unemployment rises — it cannot prioritise jobs over inflation.',
          'Cash Reserve Ratio in Depth: SARB sets the % of deposits commercial banks must keep at SARB and cannot lend out, directly controlling credit creation:'
        ],
        bullets: [
          'Raising Repo Rate Chain: SARB ↑ Repo Rate -> Banks ↑ Prime Rate -> Loans expensive -> People borrow & spend less -> Businesses sell less and slow price increases -> Inflation ↓ (but GDP ↓, Unemployment ↑).',
          'Cutting Repo Rate Chain: SARB ↓ Repo Rate -> Banks ↓ Prime Rate -> Loans cheap -> People borrow & spend more -> AD ↑ -> GDP ↑ and Unemployment ↓ (but Inflation ↑).',
          'Reserve Ratio 10%: Multiplier = 1 / 0.1 = 10 -> R10,000 deposit creates R100,000 total money.',
          'Reserve Ratio raised to 20%: Multiplier = 1 / 0.2 = 5 -> R10,000 creates only R50,000 -> Money supply shrinks and inflation falls.'
        ]
      },
      {
        heading: 'Policy Mix & The 3 Time Lags — Why Stabilisation Is Hard',
        paragraphs: [
          'Fiscal and monetary authorities can either reinforce each other or pull the economy in opposite directions. Even well-planned policy faces three Time Lags — delays between noticing an economic problem and the policy taking effect (like treating flu after the patient already developed COVID):'
        ],
        bullets: [
          'Best Case Policy Mix: Expansionary Fiscal (↓Tax, ↑Spending) + Expansionary Monetary (↓Repo) = strong growth, though high inflation risk.',
          'Worst Case Policy Mix (Common in SA): Expansionary Fiscal (high spending) + Contractionary Monetary (↑Repo to fight inflation) = government pushes while SARB pulls.',
          '1. Recognition Lag: Takes months of economic data to realise the economy entered a recession.',
          '2. Decision Lag: Parliament and Treasury take months to debate and pass the budget.',
          '3. Implementation Lag: Actually building a road or hospital takes 2+ years, by which time economic conditions have changed.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Fiscal Policy',
        definition: 'Government using Taxation (T) and Government Spending (G) to steer the economy.'
      },
      {
        term: 'Budget Deficit',
        definition: 'When Government Spending exceeds Tax Revenue (G > T), requiring borrowing.'
      },
      {
        term: 'National Debt',
        definition: 'Cumulative total money government owes from past budget deficits and bond issues.'
      },
      {
        term: 'Multiplier',
        definition: 'Factor (1 / (1 - MPC)) showing how many times initial spending expands total GDP.'
      },
      {
        term: 'MPC',
        definition: 'Marginal Propensity to Consume — fraction of each extra Rand of income spent.'
      },
      {
        term: 'Crowding Out',
        definition: 'Heavy government borrowing drives up interest rates and blocks private business investment.'
      },
      {
        term: 'Monetary Policy',
        definition: 'SARB managing the Repo Rate and Money Supply to keep prices stable.'
      },
      {
        term: 'Inflation Targeting',
        definition: 'SARB’s legal mandate to keep South African CPI inflation within the 3–6% range.'
      },
      {
        term: 'Time Lag',
        definition: 'Delay (Recognition, Decision, Implementation) between a crisis and policy working.'
      }
    ],
    workedExample: {
      title: 'Mbombela School Multiplier, 8% Inflation Repo Chain & R100bn Bailout Crowding Out',
      scenario:
        'Part A (Multiplier): Government spends R2 million on a new school in Mbombela with MPC = 0.75 (compare with MPC = 0.9).\nPart B (Repo Chain): CPI inflation climbs to 8% (above SARB’s 6% ceiling).\nPart C (Crowding Out): Government borrows R100 bn for a bailout, shrinking bank funds for firms.',
      formulaBlock: `PART A — MBOMBELA SCHOOL MULTIPLIER:
• When MPC = 0.75: Multiplier = 1 / (1 - 0.75) = 1 / 0.25 = 4
  Total GDP Increase = R2m × 4 = R8 million
• When MPC = 0.90: Multiplier = 1 / (1 - 0.90) = 1 / 0.10 = 10
  Total GDP Increase = R2m × 10 = R20 million  (Higher MPC = Bigger Multiplier!)

PART B — SARB REPO CHAIN AT 8% INFLATION:
• Repo 8.0% -> 8.5% -> Prime 11.5% -> 12.0% -> Expensive loans -> Spending ↓ -> AD Left -> Inflation cools toward 6% (short-term unemployment ↑)

PART C — R100 BN BAILOUT CROWDING OUT:
• Business loan rates rise 10% -> 13% -> Small Mbombela business cancels buying a new taxi -> 1 govt job created, 1 private job blocked!`,
      steps: [
        'Step 1 (Multiplier): At MPC = 0.75, Multiplier = 1 / 0.25 = 4 -> R2m × 4 = R8m GDP boost. If households spend 90c per Rand (MPC = 0.9), Multiplier rises to 10 -> R20m GDP boost.',
        'Step 2 (Repo Chain): At 8% inflation (above 3–6%), SARB hikes Repo from 8% to 8.5%, lifting Prime from 11.5% to 12%. Costlier credit slows borrowing and shifts AD left, pulling inflation toward 6% with a short-term jobs trade-off.',
        'Step 3 (Crowding Out): Borrowing R100 bn forces banks to raise commercial lending rates from 10% to 13%, causing an Mbombela entrepreneur to cancel buying a new taxi — offsetting private job creation.'
      ],
      finalAnswer:
        'R2m spending yields R8m total GDP at MPC 0.75 (R20m at MPC 0.9); 8% inflation triggers a Repo hike (8%->8.5%, Prime 11.5%->12%) to pull AD left; R100bn borrowing pushes loan rates from 10% to 13%, crowding out private taxi investment.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Define Fiscal & Monetary Policy + Controllers (4 marks)',
        question: 'Define Fiscal Policy and Monetary Policy. Who controls each? (4 marks)',
        answer:
          'Fiscal Policy is government using Tax (T) and Spending (G) to manage the economy, controlled by the Minister of Finance / National Treasury. Monetary Policy is managing the Repo Rate and Money Supply to control inflation, controlled by the SARB Governor / Monetary Policy Committee.'
      },
      {
        number: 2,
        label: 'Calculate Multiplier & Total GDP Increase (3 marks)',
        question:
          'Calculate the Multiplier and total GDP increase if MPC = 0.8 and Government spends R500,000. (3 marks)',
        answer: 'Multiplier = 1 / (1 - 0.8) = 1 / 0.2 = 5. Total GDP increase = R500,000 × 5 = R2,500,000.'
      },
      {
        number: 3,
        label: 'Define Crowding Out (2 marks)',
        question: 'What is Crowding Out? (2 marks)',
        answer:
          'When heavy government borrowing pushes up interest rates so private businesses cannot afford loans to invest, causing private investment to fall.'
      },
      {
        number: 4,
        label: 'SARB Response to 7.5% Inflation (4 marks)',
        question: 'Inflation is 7.5%, above target. What should SARB do? Explain the chain. (4 marks)',
        answer:
          'SARB should INCREASE the Repo Rate -> commercial banks raise the Prime Rate -> loans become expensive -> households and firms borrow and spend less -> AD shifts left -> inflation falls (though GDP slows and unemployment rises short-term).'
      },
      {
        number: 5,
        label: 'Define Inflation Targeting & SA Target (2 marks)',
        question: 'What is Inflation Targeting? What is SA’s target? (2 marks)',
        answer:
          'A monetary policy framework where SARB is legally mandated to keep CPI inflation within an announced target band. South Africa’s target is 3–6%.'
      },
      {
        number: 6,
        label: '3 Time Lags & Why Policy Is Hard (3 marks)',
        question: 'Name the 3 Time Lags and explain why they make policy hard. (3 marks)',
        answer:
          'Recognition lag, Decision lag, and Implementation lag. By the time a policy is researched, passed, and built, economic conditions have already changed — so the policy may hit at the wrong time.'
      }
    ]
  },
  {
    id: 'ncv-ee-l4-ch5-international-trade-and-globalisation-in-depth',
    level: 4,
    chapterNumber: 5,
    chapterLabel: 'Level 4 • Chapter 5',
    displayHeading: 'Level 4 — Chapter 5: International Trade & Globalisation in Depth',
    title: 'International Trade & Globalisation in Depth',
    subtitle: 'Level 4 - NCV Economic Environment (Nexovian Original Series)',
    sections: [
      {
        heading: 'Globalisation — Drivers, Benefits & Risks for South Africa',
        paragraphs: [
          'In Level 3 you learned Exports, Imports, BOP, and the Rand. In Level 4 you learn WHY South Africa loses on Unequal Exchange, WHAT Globalisation is, and HOW Exchange Rates are really determined.',
          'Globalisation means countries becoming one connected market through trade, capital flows, technology, and migration. In Mbombela, wearing Nike made in Vietnam, using an iPhone designed in the USA and assembled in China, eating KFC, and streaming Netflix are all everyday globalisation.'
        ],
        bullets: [
          'Driver 1 — Technology: Internet, WhatsApp, cheap flights, and platforms like Temu let consumers order from China in 2 minutes.',
          'Driver 2 — Trade Liberalisation: WTO agreements cut tariffs and opened borders.',
          'Driver 3 — Multinational Corporations (MNCs): Shoprite, Toyota, and Coca-Cola operate in 100+ countries.',
          'Driver 4 — Financial Flows: Money moves in seconds between the JSE and New York.',
          'Pros for SA: More choice and cheaper goods (Temu, Shein), foreign investment and jobs (Toyota plant in Durban), and technology transfer.',
          'Cons for SA: Cheap imported clothes kill local textile factories in KZN (job losses), vulnerability to global recessions (US slowdown hits SA exports), cultural loss, and Brain Drain (skilled doctors and nurses leaving SA for the UK, USA, or Dubai).'
        ]
      },
      {
        heading: 'Terms of Trade (TOT) & Unequal Exchange — Key Level 4 Formula',
        paragraphs: [
          'Terms of Trade measures how much foreign imports South Africa can buy with its exports. When export prices rise relative to import prices, TOT is favourable and living standards rise.',
          'Why SA Struggles — Unequal Exchange: South Africa exports raw materials (gold, coal — volatile prices) and imports finished goods (cars, phones, oil — persistently expensive), putting long-term pressure on our Terms of Trade.'
        ],
        formulaBlock: `Terms of Trade (TOT) = (Price of Exports / Price of Imports) × 100

• 2023 (Favourable): Export Index = 120, Import Index = 100
  TOT = (120 / 100) × 100 = 120  (More imports per unit of exports!)
• 2024 (Unfavourable — Gold falls, Oil rises): Export Index = 100, Import Index = 130
  TOT = (100 / 130) × 100 = 76.9 (Must export MORE gold to buy the SAME oil)`
      },
      {
        heading: 'Exchange Rate Parity (PPP & IRP), Trade Blocs & Fixing a BOP Deficit',
        paragraphs: [
          'Beyond daily supply and demand, Level 4 explains exchange rates through two parity rules — and shows how South Africa operates inside global trade blocs while managing Current Account deficits:',
          'Purchasing Power Parity (PPP): In the long run, identical goods should cost the same everywhere after converting currency. Example: Big Mac in SA = R60 vs USA = $6 -> PPP Rate = 60 / 6 = R10 per $1. If actual rate is R18 per $1, the Rand is UNDERVALUED and SA goods are cheap.',
          'Interest Rate Parity (IRP): Capital flows toward HIGHER interest rates. If SA Repo = 8% and USA rate = 4%, investors move dollars to SA for 8%, boosting Rand demand (Rand appreciates). If SARB cuts Repo too low (e.g. 3%), investors pull out, the Rand crashes, petrol jumps, and inflation surges — explaining why SARB cannot simply slash rates for jobs.'
        ],
        bullets: [
          'WTO (World Trade Organisation): Sets global trade rules between free trade and protection.',
          'BRICS: Brazil, Russia, India, China, South Africa + new members — power bloc exploring non-dollar trade.',
          'AfCFTA (African Continental Free Trade Area): Tariff-free trade across Africa — huge opportunity for SA firms to sell to 1.4 billion consumers.',
          'Fix Deficit 1 — Depreciation: Let Rand weaken (exports cheap, imports costly — painful inflation risk).',
          'Fix Deficit 2 — Increase Interest Rate: Attracts foreign capital inflows, but slows local firms.',
          'Fix Deficit 3 — Protection (Tariffs): Blocks imports, but risks trade retaliation.',
          'Fix Deficit 4 — Supply-Side Policy: Raise productivity so SA exports compete better globally (best long-run fix, slowest to show).'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Globalisation',
        definition: 'Integration of countries into one connected global market for goods, money, tech, and labour.'
      },
      {
        term: 'Multinational Corporation (MNC)',
        definition: 'Large company (e.g. Toyota, Shoprite, Coca-Cola) operating across many countries.'
      },
      {
        term: 'Brain Drain',
        definition: 'Emigration of skilled professionals (doctors, nurses, engineers) abroad for higher pay.'
      },
      {
        term: 'Terms of Trade',
        definition: 'Ratio of export prices to import prices: (Price of Exports / Price of Imports) × 100.'
      },
      {
        term: 'Purchasing Power Parity (PPP)',
        definition: 'Long-run theory that the same product should cost the same across countries after conversion.'
      },
      {
        term: 'Interest Rate Parity',
        definition: 'Principle that global capital flows toward countries offering higher interest rates.'
      },
      {
        term: 'AfCFTA',
        definition: 'African Continental Free Trade Area — tariff-free continental market reaching 1.4bn people.'
      },
      {
        term: 'BRICS',
        definition: 'Economic bloc of Brazil, Russia, India, China, South Africa and new member nations.'
      },
      {
        term: 'WTO',
        definition: 'World Trade Organisation — international body setting global trade rules and lowering tariffs.'
      }
    ],
    workedExample: {
      title: 'TOT Shift (2025–2026), PPP Laptop Valuation & Mbombela vs Shein Trade Dilemma',
      scenario:
        'Part A (Terms of Trade): In 2025, Export Index = 140 and Import Index = 110. In 2026, oil prices spike so Export Index = 110 and Import Index = 145.\nPart B (PPP): A laptop costs R18,000 in SA and $1,000 in the USA (actual exchange rate = R19 per $1).\nPart C (Globalisation): A Shein shirt costs R100 vs a local Mbombela factory shirt at R250.',
      formulaBlock: `PART A — TERMS OF TRADE (2025 VS 2026):
• 2025: TOT = (140 / 110) × 100 = 127.3  (Favourable — SA exports buy more imports!)
• 2026: TOT = (110 / 145) × 100 =  75.9  (Unfavourable — must export much more; living standard falls)

PART B — PURCHASING POWER PARITY (LAPTOP):
• PPP Rate = R18,000 / $1,000 = R18 per $1
• Actual Rate = R19 per $1 -> Rand is slightly UNDERVALUED (laptop slightly cheaper in SA!)

PART C — SHEIN (R100) VS MBOMBELA FACTORY (R250):
• Consumer saves R150 (wins), BUT local Mbombela factory closes (50 jobs lost) -> Tariff vs Free Trade dilemma!`,
      steps: [
        'Step 1 (Terms of Trade 2025 -> 2026): In 2025 TOT = (140/110) × 100 = 127.3 (Favourable). In 2026 oil spikes push TOT down to (110/145) × 100 = 75.9 (Unfavourable, lowering SA real purchasing power).',
        'Step 2 (PPP Valuation): Divide the SA Rand laptop price (R18,000) by the US Dollar price ($1,000) -> PPP exchange rate = R18/$1. Because the market trades at R19/$1, the Rand is slightly undervalued.',
        'Step 3 (Policy Dilemma): Imported R100 Shein shirts help shoppers save R150, yet threaten 50 local Mbombela textile jobs — highlighting the Level 4 free trade vs protection debate.'
      ],
      finalAnswer:
        'TOT drops from 127.3 (Favourable) in 2025 to 75.9 (Unfavourable) in 2026; PPP laptop rate = R18/$1 (Rand slightly undervalued at R19/$1); Shein saves consumers R150 while threatening 50 local Mbombela jobs.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Define Globalisation & 2 Drivers (3 marks)',
        question: 'Define Globalisation and give 2 drivers. (3 marks)',
        answer:
          'Globalisation is countries becoming one connected global market through trade, capital, technology, and labour flows. Drivers (any two): Technology / Internet, Trade liberalisation / WTO, Multinational Corporations (MNCs), or Financial flows.'
      },
      {
        number: 2,
        label: 'Calculate Terms of Trade (3 marks)',
        question: 'Calculate TOT: Export Index 150, Import Index 125. Is it favourable? (3 marks)',
        answer:
          'TOT = (150 / 125) × 100 = 120. Yes, it is favourable because SA’s export prices exceed import prices, letting SA afford more imports.'
      },
      {
        number: 3,
        label: 'Brain Drain & 1 SA Effect (2 marks)',
        question: 'What is Brain Drain? Give 1 effect on South Africa. (2 marks)',
        answer:
          'When skilled workers leave SA for higher pay abroad. Effect: severe skills shortage (e.g. hospitals left without trained doctors and nurses).'
      },
      {
        number: 4,
        label: 'Explain PPP With Example (3 marks)',
        question: 'Explain Purchasing Power Parity (PPP) with an example. (3 marks)',
        answer:
          'PPP states that the same product should cost the same across countries once converted into one currency. Example: if a Big Mac is R60 in SA and $6 in the USA, the PPP exchange rate is R10 per $1.'
      },
      {
        number: 5,
        label: '2 Ways to Fix BOP Deficit + Disadvantages (4 marks)',
        question: 'SA has a BOP deficit. Give 2 ways to fix it and 1 disadvantage of each. (4 marks)',
        answer:
          'Any two: 1) Depreciate the Rand -> makes exports cheap, but pushes up import costs and inflation. 2) Increase interest rates -> attracts foreign capital, but slows local businesses. 3) Put tariffs on imports -> protects local jobs, but causes higher prices and trade retaliation.'
      },
      {
        number: 6,
        label: 'AfCFTA & Importance for SA (3 marks)',
        question: 'What is AfCFTA and why is it important for South Africa? (3 marks)',
        answer:
          'African Continental Free Trade Area — an agreement allowing African countries to trade with zero tariffs. It gives SA businesses duty-free access to 1.4 billion African consumers, boosting exports and local job creation.'
      }
    ]
  },
  {
    id: 'ncv-ee-l4-ch6-labour-market-productivity-and-inequality',
    level: 4,
    chapterNumber: 6,
    chapterLabel: 'Level 4 • Chapter 6',
    displayHeading: 'Level 4 — Chapter 6: Labour Market, Productivity & Inequality',
    title: 'Labour Market, Productivity & Inequality',
    subtitle: 'Level 4 - NCV Economic Environment (Nexovian Original Series)',
    sections: [
      {
        heading: 'The Labour Market, Reservation Wage & Minimum Wage Trade-Off',
        paragraphs: [
          'In Level 3 you learned Unemployment = no job. In Level 4 you learn WHY South Africa’s unemployment stays near 32% — one of the highest in the world — and WHY unemployment persists even when GDP grows (Jobless Growth).',
          'Equilibrium Wage is where Labour Demand = Labour Supply. However, in South Africa wages often sit ABOVE equilibrium due to Minimum Wages and Trade Unions: if equilibrium is R3,000 and government sets a minimum wage of R4,500, a shop that wanted 10 workers hires only 6. Those 6 workers earn higher pay, while 4 lose their jobs — a key Level 4 policy trade-off.'
        ],
        bullets: [
          'Demand for Labour (Firms): Driven by Wage rate (Wage ↑ -> Demand ↓), Worker productivity (higher output -> higher demand), and Product price/sales (if kotas sell well, shops hire more staff).',
          'Supply of Labour (Workers): Driven by Wage rate (Wage ↑ -> Supply ↑), Population growth (more youth entering labour force), and Social Grants / Reservation Wage.',
          'Reservation Wage: Lowest wage a worker will accept — e.g. if a grant is R2,000 and transport to work costs R1,000, many workers decline a R2,500 job.'
        ]
      },
      {
        heading: 'Labour Productivity & Avoiding Cost-Push Wage Inflation',
        paragraphs: [
          'Factory A has 10 workers making 1,000 shirts/day (100 shirts/worker); Factory B has 10 workers making 500 shirts/day (50 shirts/worker). Factory A can afford higher wages without raising prices because each worker produces double.',
          'Crucial Rule: If productivity rises, wages can rise WITHOUT inflation. If wages rise while productivity does NOT rise, businesses must hike prices -> Cost-Push Inflation.'
        ],
        bullets: [
          'Why SA Productivity Is Low: (1) Poor education / skills deficit, (2) Load shedding (machines stop, workers stand idle), (3) Ill health (HIV, TB, poor healthcare), and (4) Outdated machinery/technology.',
          'Solutions: Skills training, better schooling, modern technology, reliable electricity, and healthcare.'
        ],
        formulaBlock: `Labour Productivity = Total Output / Number of Workers

• Factory A: 1,000 shirts / 10 workers = 100 shirts per worker (can pay higher wages)
• Factory B:   500 shirts / 10 workers =  50 shirts per worker`
      },
      {
        heading: 'Inequality (Gini 0.63 & Lorenz Curve), Jobless Growth & Structural Unemployment',
        paragraphs: [
          'Gini Coefficient measures inequality from 0 (Perfect Equality — everyone earns the same) to 1 (Perfect Inequality — one person earns everything). South Africa’s Gini of 0.63 is the highest in the world. On a Lorenz Curve graph, the further the curve bows away from the diagonal equality line, the greater the inequality.',
          'Jobless Growth & Structural Unemployment: Even when SA GDP grows ~1% per year, unemployment stays at 32% because growth happens in Capital-Intensive sectors (mining with machines, banks with computers) rather than Labour-Intensive sectors (textiles, farming, tourism). Meanwhile, vacant skilled jobs (10,000 electricians needed) coexist with 1 million unskilled matriculants.'
        ],
        bullets: [
          '4 Drivers of SA Inequality: (1) Apartheid legacy (land, capital, Bantustan schooling), (2) Skills gap (skilled R50,000 vs unskilled R3,500), (3) 32% earning R0 vs high top salaries, and (4) Wealth inequality (rich own homes, shares, businesses while poor hold zero assets).',
          '4 Tools to Cut Inequality: Progressive Tax (0% up to R95k, 45% above R1.7m), Social Grants (SRD R370, Child & Old Age grants cut poverty though don’t create jobs), Education (best long-term fix over 20 years), and B-BBEE (expanding black ownership, though criticised for benefiting a connected few).'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Reservation Wage',
        definition: 'Lowest wage a worker is willing to accept to take a job (net of transport and grant trade-offs).'
      },
      {
        term: 'Labour Productivity',
        definition: 'Total output produced divided by the number of workers (Output / Workers).'
      },
      {
        term: 'Minimum Wage',
        definition: 'Legal floor wage; when set above equilibrium it creates a labour surplus (unemployment).'
      },
      {
        term: 'Gini Coefficient',
        definition: 'Inequality index from 0 (perfect equality) to 1 (perfect inequality); SA = 0.63 (world’s highest).'
      },
      {
        term: 'Lorenz Curve',
        definition: 'Graph plotting cumulative income inequality — greater bow from the equality line means higher inequality.'
      },
      {
        term: 'Progressive Tax',
        definition: 'Tax system where higher-income earners pay a higher percentage rate than lower earners.'
      },
      {
        term: 'Jobless Growth',
        definition: 'Economic growth where Real GDP rises without creating sufficient new employment.'
      },
      {
        term: 'Structural Unemployment',
        definition: 'Long-term mismatch between the skills workers hold and the skills employers require.'
      },
      {
        term: 'Capital-Intensive',
        definition: 'Production relying heavily on machinery, automation, and computers rather than workers.'
      },
      {
        term: 'Labour-Intensive',
        definition: 'Industries (textiles, agriculture, tourism) employing large numbers of workers per unit of capital.'
      }
    ],
    workedExample: {
      title: 'Mbombela Chair Productivity, Minimum Wage Surplus & Global Gini Comparison',
      scenario:
        'Part A (Productivity): In 2023 an Mbombela factory uses 20 workers to make 4,000 chairs; in 2024 a new machine helps the same 20 workers make 6,000 chairs.\nPart B (Minimum Wage): Equilibrium wage = R3,500 (100 employed). Government sets Minimum Wage = R5,000 -> Labour Demand falls to 70 while Labour Supply rises to 120.\nPart C (Gini Comparison): Country A (Sweden) = 0.25, Country C (Brazil) = 0.45, Country B (SA) = 0.63.',
      formulaBlock: `PART A — MBOMBELA FACTORY PRODUCTIVITY GAIN:
• 2023: 4,000 chairs / 20 workers = 200 chairs per worker
• 2024: 6,000 chairs / 20 workers = 300 chairs per worker
• Gain = ((300 - 200) / 200) × 100 = +50% -> Can pay 50% higher wages WITHOUT inflation!

PART B — MINIMUM WAGE SURPLUS AT R5,000:
• Supply (120) - Demand (70) = 50 workers UNEMPLOYED (surplus of labour)

PART C — GINI COEFFICIENT RANKING:
• Sweden 0.25 (Very equal) < Brazil 0.45 (Unequal) < South Africa 0.63 (Extreme inequality)`,
      steps: [
        'Step 1 (Productivity Calculation): Output per worker jumped from 200 to 300 chairs (+50%), enabling non-inflationary 50% wage increases.',
        'Step 2 (Minimum Wage Surplus): Setting a R5,000 floor above the R3,500 equilibrium attracts 120 jobseekers while firms only afford 70, creating 50 unemployed workers (120 - 70).',
        'Step 3 (Gini Interpretation): Closer to 0 means greater equality (Sweden 0.25), whereas SA at 0.63 sits well above Brazil (0.45), confirming severe income disparity.'
      ],
      finalAnswer:
        'Productivity rises +50% (200 -> 300 chairs/worker); R5,000 minimum wage creates a 50-worker surplus; SA Gini 0.63 reflects far higher inequality than Brazil (0.45) and Sweden (0.25).'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Define & Calculate Labour Productivity (3 marks)',
        question: 'Define Labour Productivity and calculate: 15 workers produce 3,000 units. (3 marks)',
        answer:
          'Labour Productivity is Total Output divided by Number of Workers. Calculation: 3,000 / 15 = 200 units per worker.'
      },
      {
        number: 2,
        label: 'Why Minimum Wage Above Equilibrium Causes Unemployment (3 marks)',
        question: 'Explain why a minimum wage above equilibrium causes unemployment. (3 marks)',
        answer:
          'Because the wage exceeds market equilibrium, employers find labour more expensive and demand fewer workers, while more people supply labour for higher pay — creating a labour surplus (unemployment).'
      },
      {
        number: 3,
        label: 'Gini Coefficient & SA Score Meaning (3 marks)',
        question: 'What is the Gini Coefficient? What is SA’s Gini and what does it mean? (3 marks)',
        answer:
          'An index measuring income inequality from 0 (perfect equality) to 1 (perfect inequality). SA’s Gini is 0.63 — one of the highest in the world, showing extreme inequality.'
      },
      {
        number: 4,
        label: 'Jobless Growth & 1 SA Reason (3 marks)',
        question: 'What is Jobless Growth? Give 1 reason for it in South Africa. (3 marks)',
        answer:
          'When Real GDP grows while employment fails to grow. Reason: SA’s growth occurs mainly in capital-intensive sectors (mining, banking/finance) using machines and computers rather than labour-intensive sectors.'
      },
      {
        number: 5,
        label: 'Structural Unemployment & SA Example (3 marks)',
        question: 'What is Structural Unemployment? Give a South African example. (3 marks)',
        answer:
          'Unemployment caused by a mismatch between workers’ skills and employer needs. Example: SA faces shortages of qualified electricians and artisans while 1 million matriculants lack technical skills.'
      },
      {
        number: 6,
        label: '10% Wage Rise vs 2% Productivity Price Effect (2 marks)',
        question: 'If wages rise 10% but productivity rises only 2%, what happens to prices? Why? (2 marks)',
        answer:
          'Prices rise (Cost-Push Inflation). Because workers produce only 2% more while costing 10% more, businesses raise selling prices to cover higher unit labour costs.'
      }
    ]
  },
  {
    id: 'ncv-ee-l4-ch7-development-economics-poverty-growth-and-sustainability',
    level: 4,
    chapterNumber: 7,
    chapterLabel: 'Level 4 • Chapter 7',
    displayHeading: 'Level 4 — Chapter 7: Development Economics — Poverty, Growth & Sustainability',
    title: 'Development Economics — Poverty, Growth & Sustainability',
    subtitle: 'Level 4 - NCV Economic Environment (Nexovian Original Series)',
    sections: [
      {
        heading: 'Economic Growth vs Development & Measuring HDI (0 to 1)',
        paragraphs: [
          'In Level 3 you learned Developed vs Developing countries. In Level 4 you learn that DEVELOPMENT is not just GDP: a country can post higher GDP while citizens stay poor, sick, and uneducated. Example: if South Africa’s GDP rises while clinics lack medicine, schools lack teachers, and families drink dirty water, that is growth WITHOUT development.',
          'Economic Growth measures QUANTITY (GDP increases). Economic Development measures QUALITY — people’s lives improve in health, education, freedom, and real choices.'
        ],
        bullets: [
          'HDI (Human Development Index — UN scale 0 to 1): Combines Health (Life Expectancy), Education (Years of schooling), and Income (GDP per capita PPP).',
          'Very High HDI (0.8+): e.g. Norway = 0.96.',
          'Medium HDI (0.5–0.79): South Africa = 0.717 (under pressure as life expectancy and schooling quality lag).',
          'Low HDI (Below 0.5): e.g. Niger = 0.39.'
        ]
      },
      {
        heading: 'Absolute vs Relative Poverty & Breaking the Poverty Trap',
        paragraphs: [
          'Level 4 distinguishes two forms of poverty and explains why generational deprivation keeps repeating unless structural support breaks the cycle:'
        ],
        bullets: [
          'Absolute Poverty: Cannot afford basic survival needs (food, shelter, clothes). In SA, the Upper-Bound Poverty Line is R1,558 per person per month (2024) — around 55% of South Africans live below this line.',
          'Relative Poverty: Being poor compared with others in your society (e.g. earning R5,000 in SA while a neighbour earns R100,000 — you can eat, yet feel poor relative to society).',
          'Poverty Trap: Poor -> cannot afford schooling -> cannot qualify for a good job -> stay poor -> children also remain poor.',
          'Breaking the Trap: Free education and school feeding schemes, social grants keeping children in school, and SMME support (giving small businesses R10,000 startup capital rather than only consumption grants).'
        ]
      },
      {
        heading: 'Sustainable Development, Triple Bottom Line, Green Economy & SA Policy Record',
        paragraphs: [
          'Sustainable Development means meeting today’s needs WITHOUT destroying future generations’ ability to meet theirs. South Africa’s coal-fired power provides jobs today, yet drives air pollution, droughts, and climate damage for future generations.',
          'The Triple Bottom Line requires businesses to measure 3 Ps — Profit (financial viability), People (fair worker treatment and community upliftment), and Planet (protecting air, water, and climate). With strong sunshine, Mpumalanga can transition into a Green Economy hub for solar, wind, recycling, and EV jobs — provided SA delivers a Just Transition that retrains coal miners into solar technicians rather than simply retrenching them.'
        ],
        bullets: [
          'NDP (National Development Plan 2030): Aimed to eliminate poverty, cut Gini to 0.60, and create 11 million jobs by 2030 — most targets missed.',
          'RDP (1994, Mandela): Delivered basic water, electricity, and ~3 million houses.',
          'GEAR (1996): Focused on fiscal deficit reduction and attracting investors — boosted growth, not jobs.',
          'ASGISA / NGP / NDP Failure Drivers: Corruption (stolen funds), poor implementation (strong on paper, weak execution), skills shortages, and load shedding.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Economic Growth',
        definition: 'Quantitative increase in Real GDP and national output.'
      },
      {
        term: 'Economic Development',
        definition: 'Qualitative improvement in human well-being — health, education, freedom, and living standards.'
      },
      {
        term: 'HDI',
        definition: 'UN Human Development Index (0–1) combining Health, Education, and Income (SA = 0.717).'
      },
      {
        term: 'Absolute Poverty',
        definition: 'Inability to afford basic survival needs; below SA’s R1,558/person/month upper-bound line.'
      },
      {
        term: 'Relative Poverty',
        definition: 'Living significantly below the average standard of others within the same country.'
      },
      {
        term: 'Poverty Trap',
        definition: 'Self-reinforcing cycle where low income blocks education and traps families in poverty.'
      },
      {
        term: 'Sustainable Development',
        definition: 'Meeting present human needs without compromising future generations’ resources.'
      },
      {
        term: 'Triple Bottom Line',
        definition: 'Framework evaluating businesses across three Ps: Profit, People, and Planet.'
      },
      {
        term: 'Green Economy',
        definition: 'Low-carbon economic sectors creating jobs in solar, wind, recycling, and electric mobility.'
      },
      {
        term: 'Just Transition',
        definition: 'Fair shift from coal to green energy by retraining coal workers for new solar/green jobs.'
      },
      {
        term: 'NDP',
        definition: 'National Development Plan 2030 targeting poverty eradication, 0.60 Gini, and 11 million jobs.'
      }
    ],
    workedExample: {
      title: 'Global HDI Comparison, Rural Mpumalanga Poverty Trap & Coal-to-Solar Sustainability',
      scenario:
        'Part A (HDI): Norway (83 yrs life expectancy, 18 yrs schooling, $70k income, HDI 0.96) vs South Africa (64 yrs, 10 yrs schooling, $14k, HDI 0.717) vs Niger (59 yrs, 2 yrs schooling, $1k, HDI 0.39).\nPart B (Poverty Trap): Thandi in rural Mpumalanga earns R1,000/month, while school fees (R500) + transport (R300) + food (R800) require R1,600/month.\nPart C (Sustainability): Mpumalanga coal mine creates 500 short-term jobs (pollutes river, reserves end in 20 yrs) vs Solar farm creating 200 permanent clean jobs for 50+ years.',
      formulaBlock: `PART A — HDI BENCHMARKING:
• Norway 0.96 (Very High)  |  South Africa 0.717 (Medium)  |  Niger 0.39 (Low)
  SA GDP ($14k) exceeds Niger ($1k), yet SA lags developed nations in health (64 yrs) & schooling (10 yrs).

PART B — RURAL MPUMALANGA POVERTY TRAP:
• Income R1,000 < Essential Need R1,600 (R500 school + R300 transport + R800 food)
  -> Without help, child drops out and remains trapped near R2,000/month.
  -> Break Trap: Child Grant R500 + Free School + Feeding Scheme -> Matric -> R8,000 job!

PART C — COAL VS SOLAR SUSTAINABILITY:
• Coal Mine:  500 jobs NOW -> river pollution, asthma, exhausted in 20 yrs -> future collapse
• Solar Farm: 200 jobs NOW -> clean air, endless sun, jobs for 50+ yrs -> SUSTAINABLE!`,
      steps: [
        'Step 1 (HDI Insight): Comparing SA (0.717) to Norway (0.96) proves income alone does not deliver full development — SA must lift life expectancy (64 yrs) and schooling outcomes (10 yrs).',
        'Step 2 (Breaking Thandi’s Trap): Removing the R600 monthly deficit through a R500 Child Grant, fee-free schooling, and school nutrition keeps her child through Matric to unlock an R8,000 salary.',
        'Step 3 (Evaluating Mpumalanga Energy): While coal gives more immediate jobs (500 vs 200), only solar satisfies Sustainable Development and requires Just Transition retraining for coal miners.'
      ],
      finalAnswer:
        'SA HDI (0.717) trails Norway (0.96) due to health and schooling gaps; grants + free schooling + feeding break Thandi’s R600 deficit trap; solar provides long-run sustainability when paired with Just Transition retraining.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Economic Growth vs Development (4 marks)',
        question: 'Distinguish between Economic Growth and Economic Development. (4 marks)',
        answer:
          'Economic Growth is a quantitative increase in Real GDP and national production. Economic Development is a qualitative improvement in people’s living standards — better health, education, freedom, and life choices.'
      },
      {
        number: 2,
        label: 'HDI & Its 3 Components (4 marks)',
        question: 'What does HDI measure? Name its 3 components. (4 marks)',
        answer:
          'Human Development Index measures overall human development on a 0 to 1 scale. Its 3 components are Health (life expectancy), Education (years of schooling), and Income (GDP per capita PPP).'
      },
      {
        number: 3,
        label: 'Absolute vs Relative Poverty (4 marks)',
        question: 'Distinguish between Absolute Poverty and Relative Poverty. (4 marks)',
        answer:
          'Absolute Poverty is being unable to afford basic survival needs such as food, shelter, and clothing (below SA’s R1,558/month line). Relative Poverty is being poor compared to higher-income earners in the same country.'
      },
      {
        number: 4,
        label: 'Poverty Trap & How to Break It (3 marks)',
        question: 'What is a Poverty Trap? Give 1 way to break it. (3 marks)',
        answer:
          'A cycle where poor households stay poor because they cannot afford education or healthcare needed to earn better incomes. Break it through free education, school feeding schemes, grants, or SMME startup funding.'
      },
      {
        number: 5,
        label: 'Sustainable Development & Triple Bottom Line (4 marks)',
        question: 'Define Sustainable Development and the Triple Bottom Line. (4 marks)',
        answer:
          'Sustainable Development means meeting today’s needs without harming future generations’ ability to meet theirs. Triple Bottom Line means businesses balance three Ps: Profit, People, and Planet.'
      },
      {
        number: 6,
        label: 'Just Transition & Importance for Mpumalanga (3 marks)',
        question: 'What is a Just Transition? Why is it important for Mpumalanga? (3 marks)',
        answer:
          'Shifting from coal to green energy fairly by retraining coal workers for solar and clean-energy jobs. It is vital for Mpumalanga because its economy heavily depends on coal mining, so closing mines without retraining would cause mass unemployment.'
      }
    ]
  }
];
