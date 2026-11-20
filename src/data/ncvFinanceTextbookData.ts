/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN ORIGINAL NCV FINANCE, ECONOMICS & ACCOUNTING (FINANCIAL MANAGEMENT) TEXTBOOK
 * Status: LIVE — All 10 Level 2 Chapters Complete (10/10 LIVE)
 * Route: /textbooks/ncv-finance-economics-accounting-textbook
 * Read Online Only on nexovian.group.
 */

export interface FinanceKeyTerm {
  term: string;
  definition: string;
}

export interface FinanceChapter {
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
  keyTerms: FinanceKeyTerm[];
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

export interface FinanceRoadmapItem {
  chapterNumber: number;
  level: 2 | 3 | 4;
  title: string;
  status: 'LIVE' | 'COMING_SOON';
}

export const NCV_FINANCE_ROADMAP: FinanceRoadmapItem[] = [
  { chapterNumber: 1, level: 2, title: 'What Is Money & Why We Manage It', status: 'LIVE' },
  { chapterNumber: 2, level: 2, title: 'Budgeting — Telling Your Money Where To Go', status: 'LIVE' },
  { chapterNumber: 3, level: 2, title: 'Interest — Simple vs Compound', status: 'LIVE' },
  { chapterNumber: 4, level: 2, title: 'Banking, Savings & Stokvels', status: 'LIVE' },
  { chapterNumber: 5, level: 2, title: 'Credit, Debt & Mashonisa Trap', status: 'LIVE' },
  { chapterNumber: 6, level: 2, title: 'Income, Expenses & Cash Flow for Small Business', status: 'LIVE' },
  { chapterNumber: 7, level: 2, title: 'Pricing — How To Price Your Product', status: 'LIVE' },
  { chapterNumber: 8, level: 2, title: 'Financial Records & Receipts', status: 'LIVE' },
  { chapterNumber: 9, level: 2, title: 'Risk & Emergency Fund', status: 'LIVE' },
  { chapterNumber: 10, level: 2, title: 'Your First Financial Plan', status: 'LIVE' }
];

export const NCV_FINANCE_LIVE_CHAPTERS: FinanceChapter[] = [
  {
    id: 'fin-l2-ch1-what-is-money',
    level: 2,
    chapterNumber: 1,
    chapterLabel: 'Level 2 • Chapter 1',
    displayHeading: 'Level 2 — Chapter 1: What Is Money & Why We Manage It',
    title: 'What Is Money & Why We Manage It',
    subtitle: 'Level 2 - Financial Management (NCV Finance, Economics & Accounting)',
    sections: [
      {
        heading: 'Money Is a Tool (Not Just Paper)',
        paragraphs: [
          'Money is not just printed paper or numbers on a phone screen—money is a TOOL to get what you need and build a secure life. If you do not manage money, money manages YOU: that is why many earners run out of cash by the 5th of every month.',
          'Financial Management means deciding where money comes from, where money goes, and how to make it grow.'
        ],
        bullets: [
          '1. Earn It — Salary, running a small business, or side hustle.',
          '2. Keep It — Do not spend every Rand you earn; put savings aside first.',
          '3. Grow It — Invest, buy fast-moving stock, or build a business.'
        ]
      },
      {
        heading: 'Same Salary, Different Management (Mbombela Example) & The Golden Rule',
        paragraphs: [
          'How much you keep depends on habits more than salary size. Compare two brothers in Mbombela who both earn R5 000 per month:'
        ],
        formulaBlock: `Rule of Financial Management:\nMoney In - Money Out = What Is Left\n\nNegative answer -> You are in financial trouble (debt)\nPositive answer -> You are building savings & wealth`,
        bullets: [
          'Brother A: Spends all R5 000 on clothes, takeaways, and airtime -> End of month = R0 left.',
          'Brother B: Spends R4 000 carefully and saves R1 000 every month -> After 12 months = R12 000 saved (enough capital to start a side business).'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Financial Management',
        definition:
          'Deciding how to earn money, spend money wisely, save consistently, and grow money over time.'
      },
      {
        term: 'Income',
        definition:
          'Money coming IN to a person or business—such as a salary, business sales, or a grant.'
      },
      {
        term: 'Expense',
        definition:
          'Money going OUT to pay for needs or wants—such as rent, food, transport, stock, or airtime.'
      }
    ],
    workedExample: {
      title: 'Thabo in Mbombela — Finding Hidden Savings Inside a R4 500 Salary',
      scenario:
        'Thabo in Mbombela earns R4 500 per month and thinks he has nothing to save. His monthly expenses are: Rent R1 500, Food R1 200, Transport R800, Airtime + Data R300, and Takeaways R500.',
      steps: [
        'Step 1 (Calculate Money In): Salary = R4 500.',
        'Step 2 (Calculate Money Out): R1 500 + R1 200 + R800 + R300 + R500 = R4 300.',
        'Step 3 (Money Left): R4 500 − R4 300 = R200 left.',
        'Step 4 (Improve Management): If Thabo cuts takeaways from R500 down to R200 (saving an extra R300), his total monthly saving becomes R200 + R300 = R500 per month -> 12 × R500 = R6 000 per year.'
      ],
      finalAnswer:
        'Currently R200 is left. By reducing takeaways by R300, Thabo CAN save R500/month (R6 000/year)—proving it is money management, not salary alone.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Calculation & Budgeting',
        question:
          'Zanele earns R3 000 per month and spends R2 800. How much money is left? Is she managing well, and give 1 practical way she can improve.',
        answer:
          'Money Left = R3 000 − R2 800 = R200 left. She is managing okay because she is positive (not in debt), but R200 saving is small. Way to improve: Cut 1 non-essential expense (such as extra airtime or takeaways) by R100 so she saves R300 per month instead of R200.'
      },
      {
        number: 2,
        label: 'Income vs Expense',
        question:
          'Give 2 examples of Income and 2 examples of Expense for a spaza shop in Nelspruit.',
        answer:
          'Income (Money In): 1) Cash from selling bread and cool drinks; 2) Commission/sales from selling airtime vouchers. Expense (Money Out): 1) Buying stock from the wholesaler; 2) Paying monthly shop rent or electricity.'
      }
    ]
  },
  {
    id: 'fin-l2-ch2-budgeting',
    level: 2,
    chapterNumber: 2,
    chapterLabel: 'Level 2 • Chapter 2',
    displayHeading: 'Level 2 — Chapter 2: Budgeting — Telling Your Money Where To Go',
    title: 'Budgeting — Telling Your Money Where To Go',
    subtitle: 'Level 2 - Financial Management (NCV Finance, Economics & Accounting)',
    sections: [
      {
        heading: 'What Is a Budget? (A Plan, Not Punishment)',
        paragraphs: [
          'A budget is NOT punishment—a budget is a PLAN for your money BEFORE the month starts. Without a budget, money disappears and you wonder "Where did my R5 000 go?" With a budget, you control every Rand.'
        ],
        bullets: [
          'Step 1 — Write Money In: Salary + Side Hustle + Other Income = Total In.',
          'Step 2 — Write Money Out: Rent, Food, Transport, Airtime, Savings, Fun = Total Out.',
          'Step 3 — Balance: Money In − Money Out must equal R0 or MORE. If it is negative, you must cut non-essential items.'
        ]
      },
      {
        heading: 'Golden Rule (Pay Yourself FIRST) & The 50 / 30 / 20 Rule',
        paragraphs: [
          'When money arrives, move your savings OUT first before spending on anything else. If you wait to save "whatever is left" at the end of the month, you will almost always save R0.'
        ],
        formulaBlock: `Simple Level 2 50 / 30 / 20 Guideline:\n• 50% Needs   -> Rent, Food, Transport, School\n• 30% Wants   -> Clothes, Takeaways, Fun\n• 20% Savings -> Future, Emergency, Business\n\n(Even 50 / 40 / 10 beats having NO budget!)`,
        bullets: [
          'Needs keep your household running and safe.',
          'Wants are enjoyable extras you can cut back on when money is tight.',
          'Savings protect you from debt during emergencies and fund future goals.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Budget',
        definition:
          'A written financial plan showing expected Money In and planned Money Out for a month before spending begins.'
      },
      {
        term: 'Needs',
        definition:
          'Essential costs you MUST pay to live and work—such as rent, basic food, electricity, school fees, and transport.'
      },
      {
        term: 'Wants',
        definition:
          'Optional extras you LIKE having but can live without—such as takeaways, new sneakers, or movies.'
      }
    ],
    workedExample: {
      title: 'Naledi in Mbombela — Building a Balanced R6 000 Budget',
      scenario:
        'Last month Naledi in Mbombela had NO budget—she spent R1 500 on takeaways and clothes and saved R0. This month she earns R6 000 and builds a written budget: Rent R1 800 (Need), Food R1 200 (Need), Transport R900 (Need), Airtime R300 (Need), Savings R1 200 (Pay Yourself First), Fun/Takeaways R600 (Want).',
      steps: [
        'Step 1 (Total Money In): R6 000.',
        'Step 2 (Total Money Out): R1 800 + R1 200 + R900 + R300 + R1 200 + R600 = R6 000.',
        'Step 3 (Check Balance): R6 000 − R6 000 = R0 — BALANCED (she hits the full 20% savings target!).'
      ],
      finalAnswer:
        'A budget did not make Naledi poor—it helped her enjoy R600 for fun while saving R1 200 in a single month instead of R0.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Checking a Monthly Budget',
        question:
          'Sipho earns R4 000. He budgets: Rent R1 500, Food R1 000, Transport R700, Savings R500, Fun R500. Is his budget balanced? Show your working and how to fix it if not.',
        answer:
          'Total Out = R1 500 + R1 000 + R700 + R500 + R500 = R4 200. Balance = R4 000 − R4 200 = −R200. It is NOT balanced—he is R200 over budget. Fix: Cut Fun from R500 down to R300 so Total Out = R4 000 and Balance = R0.'
      },
      {
        number: 2,
        label: '50 / 30 / 20 Rule Calculation',
        question:
          'You earn R2 000 from a weekend side hustle. Using the 50 / 30 / 20 rule, calculate exact Rand amounts for Needs, Wants, and Savings.',
        answer:
          'Needs (50%) = 0.50 × R2 000 = R1 000. Wants (30%) = 0.30 × R2 000 = R600. Savings (20%) = 0.20 × R2 000 = R400. (Check: R1 000 + R600 + R400 = R2 000.)'
      }
    ]
  },
  {
    id: 'fin-l2-ch3-interest-simple-vs-compound',
    level: 2,
    chapterNumber: 3,
    chapterLabel: 'Level 2 • Chapter 3',
    displayHeading: 'Level 2 — Chapter 3: Interest — Simple vs Compound',
    title: 'Interest — Simple vs Compound',
    subtitle: 'Level 2 - Financial Management (NCV Finance, Economics & Accounting)',
    sections: [
      {
        heading: 'What Is Interest? & Simple vs Compound Interest',
        paragraphs: [
          'Interest is the price of borrowing money OR the reward for saving money. When you BORROW, you pay interest to the bank or mashonisa. When you SAVE, the bank pays interest to YOU.'
        ],
        formulaBlock: `1. Simple Interest (Only on the starting amount)\nInterest = Principal x Rate x Time\n• Principal = Starting money\n• Rate = % per year (e.g. 10% = 0.10)\n• Time = Number of years\n\n2. Compound Interest (Interest on interest — grows faster!)\nExample: R1 000 at 10% for 2 years:\n• Simple: Year 1 = R100, Year 2 = R100 -> Total = R1 200\n• Compound: Year 1 = R100 (R1 100), Year 2 = 10% of R1 100 = R110 -> Total = R1 210`,
        bullets: [
          'Simple Interest: You earn or pay interest ONLY on the starting amount—it never builds on past interest.',
          'Compound Interest: You earn interest on your starting amount PLUS the interest already earned—making savings grow faster every year (just R10 more in 2 years becomes huge over 10+ years).',
          'Warning on Debt: Compound interest also works AGAINST you when borrowing—mashonisa and high-interest loan debt snowballs fast because interest builds on unpaid interest.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Interest',
        definition:
          'Extra money paid when borrowing, or extra reward money earned when saving.'
      },
      {
        term: 'Principal',
        definition:
          'The starting amount of money you originally borrow, save, or invest.'
      },
      {
        term: 'Simple Interest',
        definition:
          'Interest calculated strictly on the original Principal amount only.'
      },
      {
        term: 'Compound Interest',
        definition:
          'Interest calculated on the Principal PLUS previously earned interest—growing faster each period.'
      }
    ],
    workedExample: {
      title: 'Lerato Saves R2 000 at 10% for 3 Years — Simple vs Compound',
      scenario:
        'Lerato saves R2 000 at 10% per year for 3 years. Compare her final payout under Simple Interest versus Compound Interest.',
      steps: [
        'Step 1 (Simple Interest Formula): Interest = R2 000 × 0.10 × 3 = R600. Total back = R2 000 + R600 = R2 600.',
        'Step 2 (Compound — Year 1): R2 000 + (10% of R2 000 = R200) = R2 200.',
        'Step 3 (Compound — Year 2): R2 200 + (10% of R2 200 = R220) = R2 420.',
        'Step 4 (Compound — Year 3): R2 420 + (10% of R2 420 = R242) = R2 662.',
        'Step 5 (Compare): R2 662 − R2 600 = R62 more under Compound Interest.'
      ],
      finalAnswer:
        'Simple Interest = R2 600; Compound Interest = R2 662 (R62 more). Always choose compound interest when saving and avoid compounding debt when borrowing.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Simple Interest Loan Calculation',
        question:
          'You borrow R1 000 from a friend at 5% simple interest per year for 2 years. Calculate the interest and the total amount to pay back.',
        answer:
          'Interest = Principal × Rate × Time = R1 000 × 0.05 × 2 = R100. Total to pay back = R1 000 + R100 = R1 100.'
      },
      {
        number: 2,
        label: 'Compound Interest Savings Calculation',
        question:
          'You save R5 000 at 10% compound interest per year for 2 years. How much will you have at the end of Year 2?',
        answer:
          'Year 1: R5 000 + (10% of R5 000 = R500) = R5 500. Year 2: R5 500 + (10% of R5 500 = R550) = R6 050.'
      }
    ]
  },
  {
    id: 'fin-l2-ch4-banking-savings-stokvels',
    level: 2,
    chapterNumber: 4,
    chapterLabel: 'Level 2 • Chapter 4',
    displayHeading: 'Level 2 — Chapter 4: Banking, Savings & Stokvels',
    title: 'Banking, Savings & Stokvels',
    subtitle: 'Level 2 - Financial Management (NCV Finance, Economics & Accounting)',
    sections: [
      {
        heading: 'Bank Account Types & Why Keeping Cash in a Bank Wins',
        paragraphs: [
          'Keeping cash under a mattress exposes you to thieves, fire, and impulse spending. A bank keeps your money protected, provides official statements as proof, and helps your savings grow:'
        ],
        bullets: [
          '1. Savings Account: Built to hold money safely and earn small interest—not meant for everyday swiping.',
          '2. Cheque / Transaction Account: Built for daily use—salary deposits, paying rent, buying food, and card swipes.',
          '3. Fixed Deposit: Money is locked for a set period (such as 6 or 12 months); the bank pays HIGHER interest because you do not touch it.',
          'Why a Bank Beats Cash Under the Mattress: Safe (lost cards can be blocked immediately), Proof (bank statements track every Rand), and Growth (discipline + interest).'
        ]
      },
      {
        heading: 'Stokvels — South Africa’s Community Discipline System',
        paragraphs: [
          'A Stokvel is a group savings scheme where members contribute an agreed amount every month and take turns receiving the pooled lump sum. For example, 10 women in Mbombela putting R500 each per month creates R5 000 every month—after 10 months, every member receives R5 000 once.'
        ],
        bullets: [
          'Why Stokvels Work: Forces monthly discipline, delivers a large lump sum (to buy a fridge or business stock), and builds community trust.',
          'Main Risk: If a member or treasurer disappears with the pool, everyone loses. Always partner with trusted people, write clear rules on paper, and keep group cash inside a bank account.',
          'Winning Combination: Stokvel for monthly discipline + Bank Account for security.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Savings Account',
        definition:
          'A bank account meant for keeping reserve money safe and earning interest rather than everyday spending.'
      },
      {
        term: 'Stokvel',
        definition:
          'A South African group savings club where members contribute fixed amounts monthly and take turns receiving the pooled lump sum.'
      },
      {
        term: 'Fixed Deposit',
        definition:
          'Money locked in a bank for a fixed period (e.g. 6 or 12 months) in exchange for a higher interest rate.'
      }
    ],
    workedExample: {
      title: 'Nelspruit 12-Member Stokvel — R200 Monthly Pool to R2 400 Lump Sum',
      scenario:
        'A 12-member stokvel in Nelspruit agrees that every member contributes R200 per month.',
      steps: [
        'Step 1 (Calculate Monthly Pool): 12 members × R200 = R2 400 collected every month.',
        'Step 2 (Track Monthly Payouts): Month 1 Thandi receives R2 400 to buy spaza stock; Month 2 Sipho receives R2 400 for school fees; continuing up to Month 12 when the 12th member receives R2 400.',
        'Step 3 (Compare Paid vs Received): Each member contributed 12 × R200 = R2 400 total and received R2 400 once.',
        'Step 4 (Evaluate): Did they earn direct profit? No—but they WON because alone many members would have spent R200/month on takeaways; together each received a R2 400 lump sum for big goals.'
      ],
      finalAnswer:
        'Stokvel delivers monthly discipline and big lump-sum purchasing power (R2 400); combining it with a bank account adds safety and interest.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Choosing the Right Bank Account',
        question:
          'You have R1 000 that you must keep safe because you need it next week to pay rent. Which account should you use: Savings, Cheque, or Fixed Deposit? Explain why.',
        answer:
          'Use a Cheque / Transaction Account. You need immediate access next week for rent—a Fixed Deposit locks the money away for months, while a Cheque account is designed for regular payments and rent transfers.'
      },
      {
        number: 2,
        label: 'Stokvel Pool & Cycle Length',
        question:
          '5 friends each contribute R300 per month into a stokvel. How much does one friend receive in their payout month, and how many months will it take until everyone has received once?',
        answer:
          'Monthly payout = 5 × R300 = R1 500. One friend receives R1 500 in their turn, and it takes 5 months for all 5 friends to receive once.'
      }
    ]
  },
  {
    id: 'fin-l2-ch5-credit-debt-mashonisa',
    level: 2,
    chapterNumber: 5,
    chapterLabel: 'Level 2 • Chapter 5',
    displayHeading: 'Level 2 — Chapter 5: Credit, Debt & Mashonisa Trap',
    title: 'Credit, Debt & Mashonisa Trap',
    subtitle: 'Level 2 - Financial Management (NCV Finance, Economics & Accounting)',
    sections: [
      {
        heading: 'What Is Credit? Good Debt vs Bad Debt',
        paragraphs: [
          'Credit means using someone else’s money today and paying back MORE tomorrow. Credit is NOT free money—credit is a LOAN that costs extra interest.',
          'Before borrowing, separate Good Debt from Bad Debt:'
        ],
        bullets: [
          'Good Debt (Borrow to MAKE money): You borrow R2 000 to buy stock, sell the stock for R3 500, pay back R2 200, and keep R1 300 profit.',
          'Bad Debt (Borrow to SHOW OFF): You borrow R3 000 for new sneakers and a party—now you owe R3 900 and have nothing left to sell.'
        ]
      },
      {
        heading: 'Where People Borrow in SA & The Mashonisa Trap',
        paragraphs: [
          'Where you borrow determines how much extra you pay and how dangerous missed payments become:'
        ],
        bullets: [
          '1. Bank / Store Credit: Lower interest rate, but requires a payslip and a clean credit record.',
          '2. Mashonisa / Loan Shark: Fast cash with no paperwork, but VERY HIGH interest—R1 000 borrowed can become R1 500 in 1 month (50% interest!).',
          '3. Buy Now Pay Later: "Pay in 3 months" offers for clothes or phones; if you miss a payment, penalty fees explode.'
        ],
        formulaBlock: `The Mashonisa Trap — How R1 000 Debt Explodes:\n• Month 1: Borrow R1 000 -> Must pay R1 500 (50% interest)\n  You only have R1 000, so you borrow AGAIN to pay.\n• Month 2: Now you owe R2 250\n• Month 3: Now you owe R3 375...\nResult: You never finish—you end up working for the mashonisa!`
      },
      {
        heading: 'Three Golden Rules for Credit',
        paragraphs: [
          'Follow these three rules before signing or agreeing to any loan:'
        ],
        bullets: [
          '1. Never borrow for wants—only borrow for a business or asset that makes money.',
          '2. Always ask: "What is the TOTAL to pay back?"—not just "What is the monthly payment?"',
          '3. If interest is more than 30% per month, RUN.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Credit',
        definition:
          'Borrowing money now and agreeing to pay it back later with extra interest.'
      },
      {
        term: 'Debt',
        definition:
          'Money that you currently owe to a person, bank, shop, or lender.'
      },
      {
        term: 'Mashonisa',
        definition:
          'An informal lender who charges very high interest rates and often traps borrowers in ongoing debt.'
      }
    ],
    workedExample: {
      title: 'Two People Borrow R2 000 — Bank vs Mashonisa',
      scenario:
        'Two people each borrow R2 000. Person A borrows from a Bank at 10% simple interest for 1 year. Person B borrows from a Mashonisa at 50% per month for 1 month.',
      steps: [
        'Step 1 (A — Bank at 10% simple for 1 year): Interest = R2 000 × 10% × 1 = R200. Total to pay back = R2 000 + R200 = R2 200.',
        'Step 2 (B — Mashonisa at 50% per month for 1 month): Interest = R2 000 × 50% = R1 000. Total to pay back = R2 000 + R1 000 = R3 000 in 1 month!',
        'Step 3 (Compare Consequences): If A misses a payment, the bank calls. If B misses a payment, a mashonisa often takes an ID and threatens.',
        'Step 4 (Compare Cost): Same R2 000 borrowed -> Bank = R2 200 total over a full year vs Mashonisa = R3 000 in just 30 days.'
      ],
      finalAnswer:
        'Fast money is expensive money. Slow money from a bank or your own savings is much cheaper and safer.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Total Repayment & Good vs Bad Debt',
        question:
          'You want a phone costing R3 000. A shop says "Pay R300 × 12 months." How much do you pay in total? Is it good or bad debt? Why?',
        answer:
          'Total = R300 × 12 = R3 600 (you pay R600 extra). It is BAD debt if the phone is just for showing off and not for business. It is GOOD debt only if the phone helps you earn money.'
      },
      {
        number: 2,
        label: 'Mashonisa Interest Rate & Better Alternative',
        question:
          'A friend borrows R500 from a mashonisa and must pay R750 in 1 month. What is the interest rate? What advice would you give?',
        answer:
          'Interest = R750 − R500 = R250. Rate = R250 ÷ R500 = 50% in 1 month. Advice: Do not borrow for wants. Save R125 per week for 4 weeks instead and buy with cash—zero interest.'
      }
    ]
  },
  {
    id: 'fin-l2-ch6-income-expenses-cash-flow',
    level: 2,
    chapterNumber: 6,
    chapterLabel: 'Level 2 • Chapter 6',
    displayHeading: 'Level 2 — Chapter 6: Income, Expenses & Cash Flow for Small Business',
    title: 'Income, Expenses & Cash Flow for Small Business',
    subtitle: 'Level 2 - Financial Management (NCV Finance, Economics & Accounting)',
    sections: [
      {
        heading: 'Cash Flow: Why Busy Businesses Still Die',
        paragraphs: [
          'Many small businesses in Mbombela do not die because they fail to sell—they die because they do not manage Cash Flow.',
          'Cash Flow is Money IN vs Money OUT for your BUSINESS each month:'
        ],
        bullets: [
          'Money IN > Money OUT = Positive Cash Flow -> Business is alive and healthy.',
          'Money IN < Money OUT = Negative Cash Flow -> Business is dying, even if you look busy every day.'
        ],
        formulaBlock: `Formulas for Business:\nProfit    = Total Sales - Total Expenses\nCash Left = Cash In - Cash Out`
      },
      {
        heading: 'Fixed Costs vs Variable Costs & Payment Priority',
        paragraphs: [
          'Every business has two types of costs, and sales money must pay business obligations BEFORE the owner takes salary:'
        ],
        bullets: [
          '1. Fixed Costs: Stay the same every month, even if you sell nothing (Rent, Salaries, WiFi).',
          '2. Variable Costs: Change when you sell more (Stock, Packaging, Transport to buy stock).',
          'Mistake Many Owners Make: Taking all sales money home as salary! Order of priority: (1) Stock first, (2) Rent + Costs second, (3) Salary / Profit LAST.',
          'Spaza Reality Check: A spaza sells R10 000 in a month and the owner takes all R10 000 home -> next month there is no cash for stock -> Business DEAD. Correct: Pay R6 000 stock, R2 000 rent, keep R2 000 profit.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Cash Flow',
        definition:
          'The movement of money in and out of a business over a period (such as a week or month).'
      },
      {
        term: 'Fixed Cost',
        definition:
          'A business expense that stays the same every month regardless of sales—such as rent, salaries, or WiFi.'
      },
      {
        term: 'Variable Cost',
        definition:
          'A business expense that goes up or down as sales change—such as stock, packaging, or delivery transport.'
      }
    ],
    workedExample: {
      title: 'Kabelo’s Kota Shop in Nelspruit — 1 Month Cash Flow & Profit',
      scenario:
        'Kabelo’s Kota Shop in Nelspruit has 1 month of Cash IN (Kota sales R8 000, Cool drinks R2 000) and Cash OUT (Stock: bread, meat, chips R5 000 [Variable]; Rent R1 500 [Fixed]; Transport R500 [Variable]; Airtime / Data R200 [Fixed]).',
      formulaBlock: `Cash IN:  Kota R8 000 + Cool drinks R2 000 = R10 000\nCash OUT: Stock R5 000 + Rent R1 500 + Transport R500 + Airtime R200 = R7 200`,
      steps: [
        'Step 1 (Total Cash IN): R8 000 + R2 000 = R10 000.',
        'Step 2 (Total Cash OUT): R5 000 + R1 500 + R500 + R200 = R7 200.',
        'Step 3 (Calculate Profit & Cash Flow): Profit = R10 000 − R7 200 = R2 800 -> Positive Cash Flow of R2 800.',
        'Step 4 (Owner Salary Decision): Kabelo wants to take all R2 800 as salary, but the smart move is to take R1 800 salary and leave R1 000 in the business for emergencies and extra stock next month.'
      ],
      finalAnswer:
        'Profit is R2 800 (Positive Cash Flow), but do not eat all your profit—your business needs food too (reinvest/keep R1 000).'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Salon Profit & Cash Flow Direction',
        question:
          'A hair salon has Sales of R6 000. Its costs are Rent R1 500, Stock R1 000, and Transport R300. What is Profit? Is cash flow positive or negative?',
        answer:
          'Total Out = R1 500 + R1 000 + R300 = R2 800. Profit = R6 000 − R2 800 = R3 200. Cash flow is POSITIVE.'
      },
      {
        number: 2,
        label: 'Fixed vs Variable Cost (Mbombela Car Wash)',
        question:
          'Give 1 Fixed Cost and 1 Variable Cost for a car wash in Mbombela.',
        answer:
          'Fixed Cost: Monthly rent for the car wash stand. Variable Cost: Soap, water, and cloths—because washing more cars requires more soap and water.'
      }
    ]
  },
  {
    id: 'fin-l2-ch7-pricing',
    level: 2,
    chapterNumber: 7,
    chapterLabel: 'Level 2 • Chapter 7',
    displayHeading: 'Level 2 — Chapter 7: Pricing — How To Price Your Product',
    title: 'Pricing — How To Price Your Product',
    subtitle: 'Level 2 - Financial Management (NCV Finance, Economics & Accounting)',
    sections: [
      {
        heading: 'Price With Math (Not by Guessing)',
        paragraphs: [
          'Many new sellers price by guessing: "My friend sells a kota for R25, so I will sell for R20." Guessing without checking costs is how businesses go broke—you must price with MATH.',
          'Three things decide the right selling price:'
        ],
        bullets: [
          '1. Cost: How much it costs YOU to make or buy the product.',
          '2. Profit: How much money you want to KEEP per item.',
          '3. Market: What customers in Mbombela are willing and able to pay.'
        ],
        formulaBlock: `Formulas We Use:\nSelling Price = Cost Price + Profit You Want\nProfit        = Selling Price - Cost Price`
      },
      {
        heading: 'Two Ways to Price & Three Pricing Mistakes',
        paragraphs: [
          'Use Cost-Plus together with a Competitor Check, and avoid the hidden-cost traps that wipe out profit:'
        ],
        bullets: [
          'Cost-Plus Pricing: Cost R15 + Profit you want R10 = Sell for R25.',
          'Competitor Check: If everyone sells at R25, you cannot sell at R50 unless yours is clearly BETTER or BIGGER.',
          'Mistake 1 — Too Cheap: You work hard for almost no profit, burn out, and quit.',
          'Mistake 2 — Too Expensive: Customers refuse to buy and stock spoils or rots.',
          'Mistake 3 — Forgetting Hidden Costs: Transport, airtime, packaging, and your time are ALL real costs! Rule: If you do not know your cost, you do not know your profit.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Cost Price',
        definition:
          'The total money it costs you to make or buy one product, including packaging and transport.'
      },
      {
        term: 'Selling Price',
        definition:
          'The final price the customer pays you for one product.'
      },
      {
        term: 'Profit',
        definition:
          'Selling Price minus Cost Price—the money you keep after covering product costs.'
      }
    ],
    workedExample: {
      title: 'Naledi Sells Vetkoek + Mince in Mbombela',
      scenario:
        'Naledi sells vetkoek with mince in Mbombela. Her costs for 1 vetkoek are: Flour + oil R4, Mince R6, Packaging R2, Transport share R3. She wants R10 profit per vetkoek and sells 50 per day for 20 days per month.',
      formulaBlock: `Total Cost (1 vetkoek) = R4 + R6 + R2 + R3 = R15\nSelling Price          = R15 + R10 = R25`,
      steps: [
        'Step 1 (Full Cost per Vetkoek): R4 (flour + oil) + R6 (mince) + R2 (packaging) + R3 (transport share) = R15.',
        'Step 2 (Set Selling Price): Cost R15 + Profit wanted R10 = R25 per vetkoek.',
        'Step 3 (Calculate Daily & Monthly Profit at R25): Total Sales = 50 × R25 = R1 250; Total Cost = 50 × R15 = R750; Profit = R1 250 − R750 = R500/day -> 20 days/month = R10 000 profit per month.',
        'Step 4 (Compare Guessing R20): If she copied a cheap price of R20, profit per vetkoek = R20 − R15 = R5 only -> 50 × R5 = R250/day (HALF the money for the exact same work!).'
      ],
      finalAnswer:
        'Price is not guessing—Price is Cost + Profit (selling at R25 earns R500/day or R10 000/month).'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Full Cost & Selling Price Calculation',
        question:
          'You buy a T-shirt for R80, pay R20 for transport, and spend R10 on packaging. You want R50 profit. What is your Selling Price?',
        answer:
          'Total Cost = R80 + R20 + R10 = R110. Selling Price = R110 + R50 = R160.'
      },
      {
        number: 2,
        label: 'Daily Profit from Unit Margin',
        question:
          'You sell amagwinya at R10 each. Your cost is R7 each, and you sell 100 per day. What is your profit per day?',
        answer:
          'Profit per one = R10 − R7 = R3. Total daily profit = 100 × R3 = R300 per day.'
      }
    ]
  },
  {
    id: 'fin-l2-ch8-financial-records-receipts',
    level: 2,
    chapterNumber: 8,
    chapterLabel: 'Level 2 • Chapter 8',
    displayHeading: 'Level 2 — Chapter 8: Financial Records & Receipts',
    title: 'Financial Records & Receipts',
    subtitle: 'Level 2 - Financial Management (NCV Finance, Economics & Accounting)',
    sections: [
      {
        heading: 'Records = Proof (If It Is Not Written, It Didn’t Happen)',
        paragraphs: [
          'Many small businesses in Mbombela lose money because the owner says "I think I made money" yet has NO written proof. Records = Proof.',
          'Every small business must keep these 4 basic records:'
        ],
        bullets: [
          '1. Sales Book: Record every sale, every day (Date + What sold + How much).',
          '2. Expense Book: Record every cost (Date + What you bought + How much).',
          '3. Receipts: Keep paper proof you paid—or that someone paid you—organised in a plastic sleeve or envelope per month.',
          '4. Cash Book: Money In − Money Out = Balance. Complete it daily, not at month-end.'
        ]
      },
      {
        heading: 'Why Records Matter & The Simple Level 2 System',
        paragraphs: [
          'You do not need a computer to keep clean financial records. All you need is 1 exercise book and 1 pen—spend 5 minutes every night updating Page 1 (Money IN) and Page 2 (Money OUT):'
        ],
        formulaBlock: `Simple Exercise-Book System:\n• Page 1: Money IN  (Sales Book)\n• Page 2: Money OUT (Expense Book)\n• Daily Check: Money In - Money Out = Day Balance\n\nRule: No receipt = No claim!\n(If seller gives no receipt, write Date + Amount + Item + Seller Name yourself.)`,
        bullets: [
          'Profit vs Loss Clarity: You know for sure if you made a profit—no guessing.',
          'Access to Bank Loans: Banks ask for financial records before approving business loans.',
          'SARS Protection: Valid expense receipts protect you from penalties and fines.',
          'Theft Detection: If stock disappears without recorded sales, you spot theft immediately.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Record',
        definition:
          'Written proof showing money coming into or going out of your business.'
      },
      {
        term: 'Receipt',
        definition:
          'A small paper slip or written confirmation proving that a payment happened.'
      },
      {
        term: 'Cash Book',
        definition:
          'A daily book where you write all cash coming in and all cash going out.'
      }
    ],
    workedExample: {
      title: 'Thabo’s Spaza — Monday 18 Nov Daily Cash Book',
      scenario:
        'Thabo logs Monday 18 Nov in his spaza book. Money IN (Sales Book): 08:00 Bread R25, 10:00 Airtime R50, 13:00 Cool drink R20, 16:00 Maize meal R120. Money OUT (Expense Book): Transport to wholesaler R40, Bought 2 bread R30.',
      formulaBlock: `Money IN (Sales Book):   R25 + R50 + R20 + R120 = R215\nMoney OUT (Expense):     R40 + R30 = R70\nBalance for Monday 18:   R215 - R70 = R145`,
      steps: [
        'Step 1 (Total Money IN): 08:00 Bread R25 + 10:00 Airtime R50 + 13:00 Cool drink R20 + 16:00 Maize meal R120 = R215.',
        'Step 2 (Total Money OUT): Transport to wholesaler R40 + Bought 2 bread R30 = R70.',
        'Step 3 (Calculate Daily Balance): R215 − R70 = R145.',
        'Step 4 (Compare Guess vs Truth): Without records, Thabo would think "I made R215." With records, the truth is "I made R145 after costs"—doing this for 30 days gives his real monthly profit.'
      ],
      finalAnswer:
        'Day Balance = R145. Records turn guessing into knowing.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Daily Cash Book Balance',
        question:
          'You sell 3 items for R100, R50, and R80. You spend R60 on transport plus R40 on stock. What is your balance for the day? Show your working.',
        answer:
          'Money In = R100 + R50 + R80 = R230. Money Out = R60 + R40 = R100. Balance = R230 − R100 = R130.'
      },
      {
        number: 2,
        label: 'Why Receipts Matter',
        question:
          'Why is a receipt important if you buy stock for R500? Give 2 reasons.',
        answer:
          '1) It is proof you paid if the seller claims you did not pay. 2) It serves as proof for a bank loan or SARS that your business had real expenses, helping you qualify for finance and avoid fines.'
      }
    ]
  },
  {
    id: 'fin-l2-ch9-risk-emergency-fund',
    level: 2,
    chapterNumber: 9,
    chapterLabel: 'Level 2 • Chapter 9',
    displayHeading: 'Level 2 — Chapter 9: Risk & Emergency Fund',
    title: 'Risk & Emergency Fund',
    subtitle: 'Level 2 - Financial Management (NCV Finance, Economics & Accounting)',
    sections: [
      {
        heading: 'Risk & Why Every Earner Needs an Emergency Fund',
        paragraphs: [
          'Risk means something bad CAN happen, even when you did not plan for it—a taxi strike, a broken fridge, a sick child, a burst geyser, or a slow week with almost no customers.',
          'Without emergency cash, a single unexpected problem forces you straight to a mashonisa debt trap. An Emergency Fund is money kept aside ONLY for emergencies—never for sneakers or parties.'
        ],
        bullets: [
          'Goal 1 (Starter): Build an initial R1 000 emergency fund.',
          'Goal 2 (1 Month): Save 1 full month of expenses (if you spend R4 000/month, target R4 000).',
          'Goal 3 (Later): Grow up to 3 months of expenses.',
          'Where to Keep It: A separate bank account, envelope, or emergency stokvel—NEVER inside your everyday spending account. It should be reachable within 1 day in a crisis, not too easy to spend on wants.'
        ]
      },
      {
        heading: 'Small-Business Risks & How To Reduce Them',
        paragraphs: [
          'Your emergency fund is not savings for fun—your emergency fund is your shield against the 3 biggest small-business shocks:'
        ],
        bullets: [
          'Risk 1 — Theft / Fire: Stock stolen or damaged can wipe out a business overnight.',
          'Risk 2 — No Customers: Heavy rain, transport strikes, or a new competitor cutting sales.',
          'Risk 3 — Sickness: If the owner falls sick and cannot open, sales stop immediately.',
          'How To Reduce Risk: Never leave all cash in the shop; build relationships with 2 suppliers instead of 1; keep written records (Chapter 8) to prove losses for insurance; treat your Emergency Fund as your own personal insurance.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Risk',
        definition:
          'The chance that something unexpected happens and causes you or your business to lose money.'
      },
      {
        term: 'Emergency Fund',
        definition:
          'Money saved separately strictly for unexpected crises—never for everyday wants.'
      },
      {
        term: 'Insurance',
        definition:
          'Paying a small monthly fee so an insurance company pays a large sum if a major loss happens.'
      }
    ],
    workedExample: {
      title: 'Two Spaza Owners in Mbombela — Same Broken Fridge, Different Outcome',
      scenario:
        'Zanele and Sipho both own spaza shops in Mbombela. Both suffer the exact same emergency: their shop fridge breaks down and R2 000 worth of stock spoils.',
      steps: [
        'Step 1 (A — Zanele Has NO Emergency Fund): Zanele has R0 saved. She borrows R2 000 from a mashonisa at 50% interest and must pay back R3 000—working 2 months just to pay off the mashonisa.',
        'Step 2 (B — Sipho Has a R2 500 Emergency Fund): Sipho takes R2 000 from his emergency fund to fix the fridge and buy fresh stock—no loan, no interest, and his spaza opens normally the very next day.',
        'Step 3 (How Sipho Built His Fund): Sipho put aside R250 per month for 10 months = R2 500. Because it was small each month, he barely felt it while building full protection.'
      ],
      finalAnswer:
        'Same problem, completely different outcome—an emergency fund turns a disaster into an inconvenience.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Emergency Fund Timeline',
        question:
          'Your monthly expenses are R3 000 and you want a 1-month emergency fund. If you save R300 per month, how many months will it take to reach your goal?',
        answer:
          'Target = R3 000. Months needed = R3 000 ÷ R300 = 10 months.'
      },
      {
        number: 2,
        label: 'Real Business Emergencies vs Wants',
        question:
          'Give 2 examples of genuine emergencies for a business, and 2 examples that are NOT emergencies.',
        answer:
          'Real Emergencies: 1) Fridge breaks and stock rots; 2) Owner falls sick and cannot open the shop. NOT Emergencies: 1) Wanting new sneakers for a party; 2) Buying a new TV for the shop when the old TV still works fine.'
      }
    ]
  },
  {
    id: 'fin-l2-ch10-your-first-financial-plan',
    level: 2,
    chapterNumber: 10,
    chapterLabel: 'Level 2 • Chapter 10',
    displayHeading: 'Level 2 — Chapter 10: Your First Financial Plan',
    title: 'Your First Financial Plan',
    subtitle: 'Level 2 Graduation - Financial Management (10/10 Level 2 Complete)',
    sections: [
      {
        heading: 'Your 5-Step Financial Plan (Putting Chapters 1–9 Together)',
        paragraphs: [
          'Now we bring all 9 chapters together into ONE clear action plan—your graduation for Level 2 Financial Management.',
          'Follow these 5 steps every month:'
        ],
        bullets: [
          'Step 1 — Know Your Money (Ch 1 + 6): Write down all Money In and Money Out. If Money Out > Money In, fix that leak first.',
          'Step 2 — Budget (Ch 2): Apply 50 / 30 / 20 (Needs 50%, Wants 30%, Savings 20%) and always Pay Yourself FIRST.',
          'Step 3 — Save Smart (Ch 3 + 4): Save in a bank—not under a mattress. Choose compound interest, and join a trusted stokvel if group discipline helps.',
          'Step 4 — Avoid Bad Debt (Ch 5): Never borrow for wants. Always check the TOTAL amount to pay back, and stay far away from mashonisas.',
          'Step 5 — Protect Yourself (Ch 8 + 9): Write daily records in your book, build a R1 000 starter emergency fund first, then grow it to 1 month of expenses.'
        ]
      },
      {
        heading: 'Next Month’s Plan Example — Lethabo in Mbombela',
        paragraphs: [
          'See how Lethabo in Mbombela uses the exact same R5 000 salary—where she previously finished with R0—to save R12 000 in a single year:'
        ],
        formulaBlock: `Lethabo’s Monthly Plan (Goal: Save R1 000 + Start Emergency Fund):\n• Income:     R5 000 salary\n• Rent:       R1 500\n• Food:       R1 200\n• Transport:    R800\n• Savings:      R500 (Bank)\n• Emergency:    R500 (Separate envelope)\n• Fun:          R500\nTotal Out = R5 000 (Balanced R0!)`,
        bullets: [
          'Pricing (Ch 7): If Lethabo also sells vetkoek -> Cost R15 + Profit R10 = Sell for R25.',
          'Records (Ch 8): Write every sale and expense every night in an exercise book.',
          '12-Month Result: Savings (R500 × 12 = R6 000) + Emergency Fund (R500 × 12 = R6 000) = R12 000 saved in 1 year from the SAME salary!'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Financial Plan',
        definition:
          'A written plan combining your income, budget, savings, debt control, and future goals.'
      },
      {
        term: 'Goal',
        definition:
          'A specific target you want to achieve with money plus a clear deadline—for example, save R1 000 by March.'
      },
      {
        term: 'Discipline',
        definition:
          'Following the right money habit consistently—even on days when you do not feel like it.'
      }
    ],
    workedExample: {
      title: 'Kagiso’s Balanced Plan — R4 000 Salary to R4 800 Saved in 6 Months',
      scenario:
        'Kagiso earns R4 000 per month. He assigns every Rand before the month starts: Rent R1 200, Food R1 000, Transport R600, Airtime R200, Savings R500, Emergency R300, and Fun R200.',
      formulaBlock: `Total Out = R1 200 + R1 000 + R600 + R200 + R500 + R300 + R200 = R4 000\nBalance   = R4 000 - R4 000 = R0 — BALANCED`,
      steps: [
        'Step 1 (Check Monthly Balance): R1 200 + R1 000 + R600 + R200 + R500 + R300 + R200 = R4 000 -> R4 000 − R4 000 = R0 (BALANCED).',
        'Step 2 (6 Months Savings): R500 × 6 = R3 000.',
        'Step 3 (6 Months Emergency Fund): R300 × 6 = R1 800.',
        'Step 4 (Total Saved After 6 Months): R3 000 + R1 800 = R4 800.'
      ],
      finalAnswer:
        'Kagiso did not get a raise—he got a PLAN. Plan > Salary.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Level 2 Final Exam — Build Your 1-Month Financial Plan',
        question:
          'Write your own 1-month Financial Plan. Include: Income, Budget (Needs / Wants / Savings), 1 clear Goal, and how you will avoid a mashonisa.',
        answer:
          'Example Answer: Income R3 000. Budget: Rent R1 000, Food R800, Transport R400 (Needs R2 200), Fun R200 (Wants), Savings R400, Emergency R200 (Savings R600) = R3 000 total (R0 balance). Goal: Save R400 for business stock by month-end. Avoid mashonisa: Use the R200/month emergency fund for shocks and save before borrowing—only borrow for profitable business stock.'
      },
      {
        number: 2,
        label: 'Level 2 Final Exam — Interest & Business Cost Review',
        question:
          'What is the difference between Simple and Compound Interest? And what is the difference between a Fixed Cost and a Variable Cost?',
        answer:
          'Simple Interest is calculated only on the original starting money; Compound Interest is calculated on starting money PLUS previously earned interest, so it grows faster. Fixed Cost stays the same every month regardless of sales (e.g. rent); Variable Cost changes as sales change (e.g. stock or packaging).'
      }
    ]
  }
];
