/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN ORIGINAL NCV INFORMATION TECHNOLOGY & COMPUTER SCIENCE TEXTBOOK
 * Status: IN PROGRESS — Chapters 1–3 LIVE (out of 10 Chapters, Ch 10 = Bonus Exam Prep)
 * Route: /textbooks/ncv-it-computer-science-textbook
 * Read Online Only on nexovian.group.
 */

export interface ItKeyTerm {
  term: string;
  definition: string;
}

export interface ItChapter {
  id: string;
  level: 2 | 3 | 4;
  chapterNumber: number;
  chapterLabel: string;
  title: string;
  subtitle: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
    codeBlock?: string;
  }>;
  keyTerms: ItKeyTerm[];
  workedExample: {
    title: string;
    scenario: string;
    codeBlock?: string;
    steps: string[];
    finalAnswer: string;
  };
  practiceQuestions: Array<{
    number: number;
    label: string;
    question: string;
    questionCodeBlock?: string;
    answer: string;
    answerCodeBlock?: string;
  }>;
}

export interface ItUpcomingChapter {
  chapterNumber: number;
  level: 2 | 3 | 4;
  title: string;
  status: 'LIVE' | 'COMING_SOON';
}

export const NCV_IT_ROADMAP: ItUpcomingChapter[] = [
  { chapterNumber: 1, level: 2, title: 'Introduction to Computing & The Digital World', status: 'LIVE' },
  { chapterNumber: 2, level: 2, title: 'Computer Hardware, Storage & Peripherals', status: 'LIVE' },
  { chapterNumber: 3, level: 2, title: 'Software, Operating Systems & File Management', status: 'LIVE' },
  { chapterNumber: 4, level: 3, title: 'Networks, Internet & Communication', status: 'LIVE' },
  { chapterNumber: 5, level: 3, title: 'Programming Fundamentals - Logic, Flowcharts & Python', status: 'LIVE' },
  { chapterNumber: 6, level: 3, title: 'Data, Spreadsheets, Databases & Information Management', status: 'LIVE' },
  { chapterNumber: 7, level: 4, title: 'Web Development — HTML, CSS & JavaScript', status: 'LIVE' },
  { chapterNumber: 8, level: 4, title: 'Cybersecurity, Ethics, POPIA & IT Support', status: 'COMING_SOON' },
  { chapterNumber: 9, level: 4, title: 'Systems Development, Capstone Project & Workplace Readiness', status: 'COMING_SOON' },
  { chapterNumber: 10, level: 4, title: 'Bonus Exam Prep — NCV Past-Style Revision & Worked Problems', status: 'COMING_SOON' }
];

export const NCV_IT_LIVE_CHAPTERS: ItChapter[] = [
  {
    id: 'it-l2-ch1-intro-computing',
    level: 2,
    chapterNumber: 1,
    chapterLabel: 'Level 2 • Chapter 1',
    title: 'Introduction to Computing & The Digital World',
    subtitle: 'Level 2 - NCV IT & Computer Science',
    sections: [
      {
        heading: 'What Is Computing?',
        paragraphs: [
          'Computing is the use of electronic devices—such as smartphones, tablets, laptops, and desktop computers—to accept raw facts, follow instructions automatically, store records safely, and produce useful answers. Instead of writing long sales lists by hand in a paper book, a computer calculates totals in a split second without tired eyes or addition mistakes.'
        ]
      },
      {
        heading: 'How Every Computer Works: The IPO Cycle (Plus Storage)',
        paragraphs: [
          'Every digital device—from an affordable smartphone in Mbombela to a server in Cape Town—follows the IPO Cycle backed up by Storage:'
        ],
        bullets: [
          'Input: Raw facts or commands enter the computer (tapping a touchscreen, typing on a keyboard, scanning a barcode, or speaking into a microphone).',
          'Processing: The computer’s processor (CPU) works on the input using software rules—adding prices, sorting student marks, or checking stock levels.',
          'Output: The computer shows or shares the finished answer so a person can read or hear it (on a screen, through a receipt printer, or via speakers).',
          'Storage: The computer saves the work in memory (internal drive, USB flash drive, or cloud storage) so it stays safe after power is switched off.'
        ]
      },
      {
        heading: 'Data vs Information',
        paragraphs: [
          'In NCV exams, you must clearly separate raw data from useful information:'
        ],
        bullets: [
          'Data: Raw, unorganised facts—individual numbers, dates, names, or symbols on their own (for example: "18", "12", "Bread", "07:45"). Alone, they do not explain the full picture.',
          'Information: Data that has been processed, organised, and given clear meaning so someone can make a smart decision (for example: "Between 07:00 and 08:00, 12 loaves of bread at R18 each earned R216—making bread the top morning seller.").'
        ]
      },
      {
        heading: 'Inside the Digital World: Bits and Bytes (0 and 1)',
        paragraphs: [
          'All modern computers are digital. Inside their microchips, every text message, Rand amount, and photo is stored using millions of tiny switches that are either OFF (0) or ON (1).'
        ],
        bullets: [
          'A single 0 or 1 is called a bit (the smallest piece of digital data).',
          '8 bits joined together form 1 byte (enough digital space to hold one typed letter or digit, like "N" or "5").'
        ]
      },
      {
        heading: 'Everyday Computing Devices in South Africa',
        paragraphs: [
          'Different tasks call for different digital tools across South African schools, homes, and businesses:'
        ],
        bullets: [
          'Smartphones & Tablets: Pocket computers used by township SMMEs for mobile banking, WhatsApp orders, and point-of-sale apps.',
          'Desktops & Laptops: Used in school computer labs in Nelspruit and Gqeberha, TVET colleges, and small offices for typing assignments and spreadsheets.',
          'Embedded Devices: Purpose-built computers inside card speed-points, ATMs, prepaid electricity meters, and boom-gate scanners at Kruger National Park.',
          'Servers: Strong, always-on computers in data centres that host banking apps, government portals, and online study platforms 24/7.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'IPO Cycle (Input–Processing–Output)',
        definition:
          'The core 3-step computer workflow—taking in raw facts (Input), working on them with instructions (Processing), and showing meaningful results (Output), supported by Storage.'
      },
      {
        term: 'Data vs Information',
        definition:
          'Data is raw, unorganised facts (like single numbers or words), while information is processed, structured output that gives meaning and supports decisions.'
      },
      {
        term: 'Bit and Byte',
        definition:
          'A bit is a single binary digit (0 or 1), and 8 bits combined form 1 byte—the basic unit needed to store one character such as a letter or number.'
      }
    ],
    workedExample: {
      title: "Thandi's Spaza Shop in KaNyamazane, Mbombela — POS Tablet Sales & Payback",
      scenario:
        'Thandi runs a busy spaza shop in KaNyamazane outside Mbombela. Writing sales in a paper notebook caused maths mistakes and forgotten credit entries costing her R900 per month. She invests in a starter POS tablet costing R2 250 once-off plus R150 per month for mobile data. During Monday morning rush, she captures 12 loaves of bread @ R18, 8 bottles of 2 L cold drink @ R26, and 15 airtime vouchers @ R12. Wholesale stock cost is R460.',
      steps: [
        'Step 1 (Input — Raw Data): Thandi taps quantities and prices into the tablet touchscreen: 12 × R18, 8 × R26, 15 × R12, plus wholesale cost R460.',
        'Step 2 (Processing & Storage): CPU multiplies each item, totals sales, subtracts stock cost, and saves records: Bread = 12 × R18 = R216; Cold drink = 8 × R26 = R208; Airtime = 15 × R12 = R180. Total sales = R216 + R208 + R180 = R604. Gross profit = R604 − R460 = R144.',
        'Step 3 (Output — Useful Information): Screen and thermal printer produce customer receipts plus a morning report showing R604 revenue, R144 profit, and bread as the top earner (R216).',
        'Step 4 (Monthly Saving & Payback): Paper losses prevented (R900) minus mobile data (R150) = R750 net monthly saving. Payback period = R2 250 ÷ R750 = 3 months.'
      ],
      finalAnswer:
        'Total morning sales = R604, gross profit = R144, net monthly saving = R750/month, and the R2 250 POS tablet pays for itself in 3 months.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Calculation & Practical',
        question:
          'A family-run guesthouse SMME in Gqeberha buys an entry-level laptop for R4 800 and pays R220 per month for internet to manage bookings digitally, saving R1 020 per month in printing and commission costs. (a) A receptionist captures a 3-night stay at R850 per night—trace Input, Processing, Storage, and Output and calculate the total bill. (b) Calculate net monthly saving and months to pay back the R4 800 laptop.',
        answer:
          '(a) Input: Guest dates, 3 nights, R850/night. Processing: Checks availability and calculates 3 × R850 = R2 550. Storage: Saves booking record to SSD/cloud. Output: PDF invoice of R2 550 emailed to guest. (b) Net monthly saving = R1 020 − R220 = R800/month. Payback = R4 800 ÷ R800 = 6 months.'
      },
      {
        number: 2,
        label: 'Explanation & Scenario',
        question:
          'A high school near Kruger National Park records learner daily attendance in loose paper booklets that often get damp or misadded. (a) Use this scenario to explain raw data vs useful information. (b) Give two practical advantages of a digital attendance system.',
        answer:
          '(a) Individual ticks ("P", "A", "12 May", "S. Nkosi") are raw data. When processed into a term report ("Class 10A averaged 93% attendance in Term 2, with 3 learners absent 4 Mondays in a row"), it becomes useful information. (b) Two advantages: 1) Error-free automatic percentage totals save teachers hours; 2) Cloud/USB backups protect records from rain or lost booklets and allow instant searching.'
      }
    ]
  },
  {
    id: 'it-l2-ch2-hardware-storage-peripherals',
    level: 2,
    chapterNumber: 2,
    chapterLabel: 'Level 2 • Chapter 2',
    title: 'Computer Hardware, Storage & Peripherals',
    subtitle: 'Level 2 - NCV IT & Computer Science',
    sections: [
      {
        heading: 'What Is Hardware? (IPO + Storage Recap)',
        paragraphs: [
          'Hardware is every physical part of a computer you can touch—the screen, keyboard, CPU, RAM, hard drive, mouse, and printer. A computer works in 4 steps (Input -> Process -> Output -> Storage): you type learner marks in Mbombela (Input), the CPU computes averages (Process), marks appear on screen or print on a report (Output), and the file is saved for later (Storage).'
        ]
      },
      {
        heading: 'Inside the System Unit',
        paragraphs: ['Four essential components sit inside the computer case:'],
        bullets: [
          'CPU / Processor: The brain that performs all calculations and decisions. Speed is measured in GHz—e.g. a 3.5 GHz CPU performs 3.5 billion cycles per second.',
          'RAM (Random Access Memory): Temporary working memory. Open apps load into RAM; when power goes off, RAM is EMPTY. More RAM means running multiple apps without freezing.',
          'Motherboard: The large main circuit board connecting CPU, RAM, storage drives, and USB/HDMI ports together.',
          'Power Supply Unit (PSU): Converts wall electricity into safe low-voltage DC power for computer components.'
        ]
      },
      {
        heading: 'Storage — Permanent vs Temporary',
        paragraphs: ['Know the difference between temporary working memory and permanent storage:'],
        bullets: [
          'ROM: Small permanent memory storing start-up instructions that never erase when switched off.',
          'RAM: Temporary working memory—erased instantly when power cuts.',
          'Hard Disk Drive (HDD): Large capacity and cheaper, but slower because of spinning magnetic disks inside (e.g. 500 GB HDD; ~60-second boot).',
          'Solid State Drive (SSD): Very fast flash-chip drive with no moving parts (computer boots in ~10 seconds vs ~60 seconds on HDD).',
          'Portable & Cloud Storage: USB flash drives, memory cards, external hard drives, plus online Cloud Storage (Google Drive, OneDrive) that keeps files safe even if a laptop is stolen.'
        ]
      },
      {
        heading: 'Peripherals & Common Ports',
        paragraphs: [
          'Peripherals connect externally to the computer using ports such as USB (mouse, flash drive), HDMI (screen/projector), Ethernet (cable internet), and Audio jack (headphones):'
        ],
        bullets: [
          'Input Devices: Keyboard, Mouse, Scanner, Microphone, Webcam, Barcode Scanner at a Shoprite till.',
          'Output Devices: Monitor, Printer, Speakers, Classroom Projector.',
          'Input AND Output Devices: Touchscreen, Wi-Fi Router, External Hard Drive.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'CPU (Central Processing Unit)',
        definition:
          'The brain of the computer that processes all instructions and calculations, with clock speed measured in gigahertz (GHz).'
      },
      {
        term: 'RAM vs Storage',
        definition:
          'RAM is temporary working memory lost when power switches off, while Storage (HDD/SSD) is permanent and keeps files safely after power off.'
      },
      {
        term: 'Peripheral',
        definition:
          'Any external device connected to the computer that helps with input, output, or storage, such as a keyboard, printer, barcode scanner, or touchscreen.'
      }
    ],
    workedExample: {
      title: "Thandi's Spaza Shop in KaNyamazane — Choosing a New Till Computer",
      scenario:
        'Thandi has an R8 500 budget for a new till computer. The shop assistant offers Option A: 500 GB HDD, 4 GB RAM for R6 500; Option B: 256 GB SSD, 8 GB RAM for R8 000.',
      steps: [
        'Step 1 (Check Processing Need): Thandi runs only her till app, WhatsApp, and Excel. She does NOT need huge storage space—she needs fast daily speed.',
        'Step 2 (Compare RAM): Option B doubles RAM (8 GB vs 4 GB), stopping system freezes when Excel and WhatsApp run together.',
        'Step 3 (Compare Storage Type): Although Option A holds more GB, a spinning HDD is slow. Option B’s SSD opens the till app in ~5 seconds instead of ~40 seconds so customers never queue waiting.',
        'Step 4 (Compare Price vs Budget): Option B costs R1 500 more than Option A (R8 000 − R6 500), but stays inside her R8 500 budget with R8 500 − R8 000 = R500 left over for a flash drive backup.'
      ],
      finalAnswer:
        'Choose Option B (256 GB SSD + 8 GB RAM for R8 000, leaving R500 for backup). Speed and zero freezing matter far more than extra HDD gigabytes.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Calculation',
        question:
          'A school in Nelspruit buys 10 computers. Each computer has 8 GB RAM and a 256 GB SSD. What is the total RAM and total SSD storage across all 10 computers?',
        answer:
          'Total RAM = 10 × 8 GB = 80 GB RAM. Total SSD storage = 10 × 256 GB = 2 560 GB = 2.56 TB (decimal storage conversion, 1 TB = 1 000 GB).'
      },
      {
        number: 2,
        label: 'Scenario',
        question:
          'A learner says: "My computer lost my assignment when load-shedding hit because I didn’t save." Explain why this happened and give 2 practical solutions.',
        answer:
          'The unsaved assignment existed only inside RAM (temporary working memory), which clears instantly when electricity cuts off. Solutions: 1) Press Ctrl + S every 5 minutes to save onto permanent SSD/HDD storage; 2) Enable Auto-Save to Cloud Storage (such as Google Docs or OneDrive) so edits are backed up online continuously.'
      }
    ]
  },
  {
    id: 'it-l2-ch3-software-os-file-management',
    level: 2,
    chapterNumber: 3,
    chapterLabel: 'Level 2 • Chapter 3',
    title: 'Software, Operating Systems & File Management',
    subtitle: 'Level 2 - NCV IT & Computer Science',
    sections: [
      {
        heading: 'Hardware Needs Software to Work',
        paragraphs: [
          'Without software, even the fastest R15 000 laptop is just a silent box of metal and silicon. Software is the set of step-by-step digital programs and instructions that tell hardware components exactly what to do.'
        ]
      },
      {
        heading: 'System Software vs Application Software',
        paragraphs: ['All computer software falls into two broad families:'],
        bullets: [
          'System Software (Runs the Machine): Includes the Operating System (Windows 11, Ubuntu Linux, macOS, Android, iOS), Device Drivers (small translators helping printers and speed-points talk to the PC), and Utility Programs (antivirus, disk cleanup, file compression like .zip, and backup tools).',
          'Application Software (Helps the User): Everyday programs built for specific human jobs—Word processors (typing CVs and assignments), Spreadsheets (budgets and class marks), Web browsers (Chrome, Edge), Point-of-Sale apps, and WhatsApp.'
        ]
      },
      {
        heading: 'What the Operating System (OS) Does Every Second',
        paragraphs: [
          'Think of the Operating System as the strict station manager inside your computer or phone:'
        ],
        bullets: [
          'User Interface: Shows menus, icons, and windows (GUI — Graphical User Interface) or text commands (CLI — Command Line Interface).',
          'Memory & CPU Management: Shares RAM and processor time fairly so music, browser tabs, and Word run smoothly together.',
          'File & Security Management: Controls folders, permissions, user passwords, and PIN locks.'
        ]
      },
      {
        heading: 'Software Licensing: Paid vs Open-Source',
        paragraphs: [
          'Schools and township SMMEs can save thousands of Rands by understanding software licences:'
        ],
        bullets: [
          'Proprietary / Commercial Software: You pay once-off or monthly per computer (e.g. Microsoft 365, commercial accounting tools). Installing pirated copies is illegal.',
          'Open-Source & Free Software: Legal, free to install and share across 50 school PCs with zero licence fees (e.g. Ubuntu Linux OS, LibreOffice, Python).'
        ]
      },
      {
        heading: 'Smart File Management, Extensions & the 3-2-1 Backup Rule',
        paragraphs: [
          'Organised folders and clear file extensions keep projects safe and easy to find:'
        ],
        bullets: [
          'Folder Hierarchy Example: D:\\NCV_Level2\\IT_CS\\Term1\\S_Nkosi_Assign1.docx (clear names, no spaces or illegal symbols like / : * ? < > |).',
          'Common File Extensions: .docx (editable document), .pdf (locked read-only final document), .xlsx (spreadsheet), .jpg / .png (image), .zip (compressed folder), .py (Python code).',
          '3-2-1 Backup Rule: Keep 3 copies of important files, on 2 different storage types (e.g. laptop SSD + external flash drive), with 1 copy stored offsite in Cloud Storage (Google Drive/OneDrive).'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Operating System (OS)',
        definition:
          'Core system software (such as Windows, Linux, or Android) that manages hardware, allocates RAM, controls files, and gives users an interface to run apps.'
      },
      {
        term: 'Application vs Utility Software',
        definition:
          'Application software helps users perform tasks like typing or budgeting, whereas utility software maintains, scans, compresses, and backs up the computer.'
      },
      {
        term: 'File Extension & Path',
        definition:
          'The short tag after a filename dot (such as .pdf or .xlsx) showing file format, while a file path shows the exact drive and folder address where the file lives.'
      }
    ],
    workedExample: {
      title: 'Cape Town Small Bookkeeping SMME — Software Budget & File Standard',
      scenario:
        'A small printing and bookkeeping SMME in Cape Town has 4 office PCs and a software & backup budget of R6 000 for the year. Option A uses 4 paid commercial office licences @ R1 450 each plus 4 paid antivirus licences @ R350 each (local drive only). Option B uses LibreOffice (R0 open-source) + built-in Windows Defender (R0) + a shared R1 600/year business Cloud Storage plan + a R900 once-off 1 TB external drive.',
      steps: [
        'Step 1 (Calculate Option A Total): Office licences = 4 × R1 450 = R5 800. Antivirus = 4 × R350 = R1 400. Total = R5 800 + R1 400 = R7 200.',
        'Step 2 (Check Option A Against Budget): R7 200 exceeds the R6 000 budget by R7 200 − R6 000 = R1 200, and still has zero offsite cloud backup.',
        'Step 3 (Calculate Option B Total & Savings): R0 + R0 + R1 600 (Cloud) + R900 (External drive) = R2 500 total. Remaining budget = R6 000 − R2 500 = R3 500 left, saving R7 200 − R2 500 = R4 700 compared to Option A.',
        'Step 4 (Standardise File Path & Extension): Save editable drafts as .xlsx/.docx and export final client bills as .pdf inside D:\\CapeBooks_2026\\Clients\\INV_2026_014.pdf backed up to Cloud + external drive (3-2-1 rule).'
      ],
      finalAnswer:
        'Choose Option B at R2 500 total—staying R3 500 under budget, saving R4 700 over Option A, and protecting client .pdf invoices with full 3-2-1 cloud + external backups.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Calculation & Practical',
        question:
          'A TVET computer lab in Gqeberha has 25 desktop PCs. On each PC, the Operating System + software use 48 GB and student projects use 12 GB. (a) Calculate the total storage used per PC and across all 25 PCs in GB and TB (decimal). (b) Write the full Windows file path for "Task2.docx" saved inside folder "Term2", inside "IT_Lab" on drive "E:", and explain why submitting it as ".pdf" is safer.',
        answer:
          '(a) Storage per PC = 48 GB + 12 GB = 60 GB. Total across 25 PCs = 25 × 60 GB = 1 500 GB = 1.5 TB (1 TB = 1 000 GB). (b) File path: E:\\IT_Lab\\Term2\\Task2.docx. Exporting as .pdf locks fonts and page layout across any computer and prevents accidental editing.'
      },
      {
        number: 2,
        label: 'Explanation & Scenario',
        question:
          'At a school near Nelspruit, teachers save exam papers directly onto the computer Desktop with names like "test1.docx", "test new.docx", and "final.docx", with no folders and no backups. Explain three problems this causes and how good OS file management fixes each one.',
        answer:
          '1) Confusion & wrong version risk ("final.docx" gives no subject/date -> fix by using clear naming like Gr11_IT_Term2_Exam_2026.docx inside Subject/Year folders). 2) Cluttered slow Desktop & lost files (fix by organising files into a clean D:\\Exams\\2026 folder tree). 3) Total loss if the PC breaks or gets stolen (fix with the 3-2-1 rule—saving backups onto a USB drive plus password-protected Cloud Storage).'
      }
    ]
  },
  {
    id: 'it-l3-ch4-networks-internet',
    level: 3,
    chapterNumber: 4,
    chapterLabel: 'Level 3 • Chapter 4',
    title: 'Networks, Internet & Communication',
    subtitle: 'Level 3 - NCV IT & Computer Science',
    sections: [
      {
        heading: 'What Is a Computer Network?',
        paragraphs: [
          'A network is 2 or more devices connected together so they can share files, printers, software, and an internet connection quickly and cheaply.'
        ],
        bullets: [
          'PAN (Personal Area Network): Phone + wireless earphones or smartwatch for 1 person (short Bluetooth range).',
          'LAN (Local Area Network): A school computer lab in Mbombela or one office building connected together.',
          'WAN (Wide Area Network): Connects multiple LANs across cities or countries—the Internet is the largest WAN in the world.',
          'WLAN (Wireless LAN): Wi-Fi inside a building or home with no network cables needed.'
        ]
      },
      {
        heading: 'Essential Network Hardware & Concepts',
        paragraphs: [
          'Every school, lodge, and small business network relies on four core building blocks:'
        ],
        bullets: [
          'Router: Connects your local LAN to the outside Internet (fibre, LTE, or 5G).',
          'Switch: Connects many desktop PCs and printers inside one LAN using Ethernet cables.',
          'IP Address: A unique numeric address assigned to each device on a network, such as 192.168.1.5.',
          'Bandwidth: Network connection speed measured in Mbps (megabits per second). Higher Mbps means faster downloads and smoother video calls.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'LAN vs WAN',
        definition:
          'A LAN connects computers inside one building or lab, while a WAN connects many LANs across cities or countries (such as the Internet).'
      },
      {
        term: 'Bandwidth',
        definition:
          'The maximum amount of data that can travel across a network per second, measured in megabits per second (Mbps).'
      },
      {
        term: 'IP Address',
        definition:
          'A unique numerical identifier (such as 192.168.1.5) given to each computer, phone, or printer on a network so data reaches the right device.'
      }
    ],
    workedExample: {
      title: 'Nelspruit School Lab — 30 PCs, 1 Shared Printer & 100 Mbps Fibre',
      scenario:
        'A school computer lab in Nelspruit has 30 desktop PCs, 1 heavy-duty laser printer, and a 100 Mbps fibre internet line. Without networking, every PC would need its own R2 000 printer.',
      steps: [
        'Step 1 (Build the LAN): Connect all 30 PCs and the 1 laser printer to a central network Switch using Ethernet cables to create a fast LAN.',
        'Step 2 (Connect to Internet): Connect the Switch to the Router, and connect the Router to the 100 Mbps Fibre box so all 30 PCs share internet access.',
        'Step 3 (Calculate Printer Savings): Sharing 1 printer across 30 PCs avoids buying 29 extra printers: 29 × R2 000 = R58 000 saved for the school.',
        'Step 4 (Calculate Fair Bandwidth per PC): Divide total fibre speed equally across all 30 PCs: 100 Mbps ÷ 30 = 3.33 Mbps per PC.'
      ],
      finalAnswer:
        'Use a cabled LAN + Switch + Router + Fibre connection: the school saves R58 000 in printer costs and gives each PC ~3.33 Mbps when all 30 are online together.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Calculation',
        question:
          'A safari lodge near Kruger has a 50 Mbps internet line, and each Zoom video call needs 5 Mbps. How many simultaneous Zoom calls can run smoothly?',
        answer: '50 Mbps ÷ 5 Mbps = 10 simultaneous Zoom calls.'
      },
      {
        number: 2,
        label: 'Scenario',
        question:
          'A spaza shop owner uses free public Wi-Fi at a busy taxi rank for business online banking. Give 2 security risks and state how to stay safe.',
        answer:
          'Risks: 1) Hackers on the same open Wi-Fi can intercept/steal banking passwords; 2) Attackers may set up a fake hotspot ("evil twin") pretending to be free Wi-Fi. Safe solution: Never do banking on open public Wi-Fi—use private mobile data (or a trusted VPN) and two-factor authentication.'
      }
    ]
  },
  {
    id: 'it-l3-ch5-programming-python',
    level: 3,
    chapterNumber: 5,
    chapterLabel: 'Level 3 • Chapter 5',
    title: 'Programming Fundamentals - Logic, Flowcharts & Python',
    subtitle: 'Level 3 - NCV IT & Computer Science',
    sections: [
      {
        heading: 'What Is Programming & 3 Steps Before You Code',
        paragraphs: [
          'Programming means giving a computer clear, step-by-step instructions. A computer does not guess—it does EXACTLY what you tell it. Always follow 3 steps before writing real code: 1) Understand the problem, 2) Plan with Pseudocode or a Flowchart, 3) Code and Test.'
        ]
      },
      {
        heading: 'Pseudocode & Flowchart Symbols',
        paragraphs: [
          'Pseudocode is "fake code" written in plain English so anyone can plan the logic before choosing a programming language:'
        ],
        codeBlock: `START\nAsk for price\nIf price > 100, give 10% discount\nShow final price\nEND`,
        bullets: [
          'Oval = START / END',
          'Parallelogram = Input / Output',
          'Rectangle = Process / Calculate',
          'Diamond = Decision (If Yes or No)'
        ]
      },
      {
        heading: 'Python Basics & 3 Logic Structures',
        paragraphs: [
          'Python is a clean, popular programming language taught across colleges and industry. Every program uses three core logic structures:'
        ],
        bullets: [
          'print() = Show output on screen | input() = Ask the user for data',
          'Variable = A named box storing a value, e.g. price = 150',
          'if = Decision (Selection) | for = Repeat (Iteration / Loop)',
          '3 Logic Structures: 1) Sequence (do steps in order), 2) Selection (If / Else decisions), 3) Iteration (loop or repeat steps).'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Algorithm',
        definition:
          'A clear, step-by-step plan for solving a problem before you start writing actual code.'
      },
      {
        term: 'Variable',
        definition:
          'A named storage box in memory that holds a value while a program runs, such as total = 500.'
      },
      {
        term: 'Flowchart',
        definition:
          'A visual diagram built with standard shapes (Oval, Parallelogram, Rectangle, Diamond) to show program logic.'
      }
    ],
    workedExample: {
      title: 'KFC in Mbombela — Python 10% Discount Over R200',
      scenario:
        'At KFC in Mbombela, any customer spending strictly MORE than R200 gets a 10% discount. Trace the Python program below for an order of R250 (and check what happens for R150).',
      codeBlock: `total = float(input("Enter total: R"))\nif total > 200:\n    discount = total * 0.10\n    final = total - discount\nelse:\n    final = total\nprint("You pay: R", final)`,
      steps: [
        'Step 1 (Input): User enters total = R250.',
        'Step 2 (Selection Check): Is 250 > 200? YES (True), so Python enters the if block.',
        'Step 3 (Calculate Discount): discount = 250 × 0.10 = R25.',
        'Step 4 (Calculate Final Amount): final = 250 − 25 = R225. Note: if total was R150, 150 > 200 is False, so it goes to else and pays R150 (no discount).'
      ],
      finalAnswer: 'Customer pays R225 for a R250 order. If the total was R150, the customer pays R150 with no discount.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Code Trace',
        question: 'Trace the Python selection code below if marks = 75. What does it display?',
        questionCodeBlock: `if marks >= 50:\n    print("Pass")\nelse:\n    print("Fail")`,
        answer: '75 >= 50 evaluates to True, so Python runs the if branch and prints "Pass".'
      },
      {
        number: 2,
        label: 'Pseudocode Problem',
        question:
          'Write clean pseudocode for a South African bank ATM: if balance >= withdrawal, subtract the withdrawal and give cash; otherwise display "Insufficient Funds".',
        answer: 'Check both branches cleanly using an If / Else selection structure:',
        answerCodeBlock: `START\nInput withdrawal\nIf balance >= withdrawal:\n    balance = balance - withdrawal\n    Print "Take your cash"\nElse:\n    Print "Insufficient Funds"\nEND`
      }
    ]
  },
  {
    id: 'it-l3-ch6-data-spreadsheets-databases',
    level: 3,
    chapterNumber: 6,
    chapterLabel: 'Level 3 • Chapter 6',
    title: 'Data, Spreadsheets, Databases & Information Management',
    subtitle: 'Level 3 - NCV IT & Computer Science',
    sections: [
      {
        heading: 'Data vs Information',
        paragraphs: [
          'Every spreadsheet and database turns raw facts into meaningful decisions:'
        ],
        bullets: [
          'Data: Raw numbers or facts with no meaning on their own. Example: 75, 80, 60',
          'Information: Data that has been processed and given meaning. Example: "Sipho got 75% in IT — he PASSED."'
        ]
      },
      {
        heading: 'Spreadsheets (Excel / Google Sheets)',
        paragraphs: [
          'Spreadsheets are built for calculations, household or SMME budgets, and tracking class marks:'
        ],
        bullets: [
          'Cell: The box where a row and column meet, such as B2.',
          'Formula: A calculation starting with = (equals sign), such as =SUM(B2:B10).',
          'Built-in Functions: =AVERAGE() for mean, =MAX() for highest, =MIN() for lowest, and =IF() for Pass/Fail checks.'
        ]
      },
      {
        heading: 'Databases (Access) & Spreadsheet vs Database',
        paragraphs: [
          'Databases store LOTS of structured records and search them accurately in milliseconds:'
        ],
        bullets: [
          'Table: Like a grid built for one single entity—for example, Learners Table.',
          'Field: One column storing one attribute, such as Name, ID Number, or Phone.',
          'Record: One complete horizontal row holding all details for one learner.',
          'Primary Key: A unique field that never repeats across records (e.g. SA ID Number or Student Number).',
          'When to use which: Small list (20 learners) -> Spreadsheet is fine. Big list (2 000 learners + fees + marks) -> Use a Database (faster, zero duplicate records).',
          'POPIA Rule: In South Africa, never share people’s ID numbers, phone numbers, or marks in public/WhatsApp chats without consent.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Data vs Information',
        definition:
          'Data is raw unorganised facts (like numbers), while Information is processed data with meaning that supports decisions.'
      },
      {
        term: 'Cell & Formula',
        definition:
          'A Cell is a single grid box (such as B2), and a Formula is an automatic spreadsheet calculation starting with =.'
      },
      {
        term: 'Primary Key',
        definition:
          'A unique database field that identifies one specific record only (such as SA ID Number) and never repeats.'
      }
    ],
    workedExample: {
      title: 'Mbombela Teacher — Calculating 5 Learner Marks in Excel',
      scenario:
        'A teacher in Mbombela types 5 IT test marks into cells B2 to B6: B2 = 60, B3 = 75, B4 = 80, B5 = 45, B6 = 90.',
      steps: [
        'Step 1 (Total): =SUM(B2:B6) = 60 + 75 + 80 + 45 + 90 = 350.',
        'Step 2 (Class Average): =AVERAGE(B2:B6) = 350 ÷ 5 = 70%.',
        'Step 3 (Highest Mark): =MAX(B2:B6) = 90.',
        'Step 4 (Pass or Fail Check): =IF(B5>=50,"Pass","Fail") checks cell B5 (45) — since 45 < 50, Excel outputs "Fail".'
      ],
      finalAnswer: 'Class average = 70% (total 350), top learner scored 90%, and the learner with 45% received "Fail".'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Calculation',
        question:
          'A school tuckshop records daily sales in cells B2:B4 — Mon R500 (B2), Tue R700 (B3), Wed R800 (B4). Write the Excel formula for the total and calculate the final amount.',
        answer: 'Formula: =SUM(B2:B4). Total sales = R500 + R700 + R800 = R2 000.'
      },
      {
        number: 2,
        label: 'Scenario',
        question:
          'A school posts learner names, SA ID numbers, and marks inside a parent/learner WhatsApp group. Give 2 problems this creates and 2 POPIA-safe solutions.',
        answer:
          'Problems: 1) Breaks POPIA because ID numbers and personal marks are private; 2) Anyone in the chat can forward or screenshot private details. Solutions: 1) Store marks in a password-protected Google Sheet or school database restricted to teachers; 2) Replace ID numbers with anonymous Learner Numbers in shared mark lists.'
      }
    ]
  },
  {
    id: 'it-l4-ch7-web-development',
    level: 4,
    chapterNumber: 7,
    chapterLabel: 'Level 4 • Chapter 7',
    title: 'Web Development — HTML, CSS & JavaScript',
    subtitle: 'Level 4 - NCV IT & Computer Science',
    sections: [
      {
        heading: 'The 3 Parts of a Website (House Analogy)',
        paragraphs: [
          'Every modern website has three layers working together—just like building a house:'
        ],
        bullets: [
          'HTML = Structure / Walls: Tells the browser what is on the page (headings, paragraphs, images, buttons).',
          'CSS = Style / Paint: Controls how it looks (colours, font size, spacing, layout).',
          'JavaScript = Behaviour / Electricity: Controls what the page DOES (click a button, calculate a price, check a form).'
        ]
      },
      {
        heading: 'HTML, CSS & JavaScript Basics',
        paragraphs: [
          'Start with clean HTML tags, style them using CSS rules, and add interactivity using JavaScript:'
        ],
        bullets: [
          'HTML Basics: Starts with <html> and ends with </html>. Tags: <h1> = Big heading, <p> = Paragraph, <img> = Picture, <a> = Link, <button> = Button. Example: <h1>Welcome to Mbombela</h1>',
          'CSS Basics: Changes appearance without touching HTML. Example: h1 { color: blue; font-size: 30px; } makes the heading blue and large.',
          'JavaScript Basics: Brings the page alive—for example, adding prices when clicking "Calculate" or showing alert("Hello"); as a pop-up message.'
        ]
      },
      {
        heading: 'Frontend vs Backend & Responsive Design',
        paragraphs: [
          'Real-world South African websites must separate user-facing code from server logic and always prioritise smartphones:'
        ],
        bullets: [
          'Frontend: Everything the user SEES and clicks in the browser (HTML, CSS, JavaScript).',
          'Backend: What happens behind the scenes—Databases, servers, password/login checks.',
          'Responsive Design: A website must work cleanly on phones AND laptops—because most learners and customers in South Africa browse on phones first.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'HTML',
        definition:
          'The markup language that builds the structure of a webpage—headings, paragraphs, images, buttons, and links.'
      },
      {
        term: 'CSS',
        definition:
          'The styling language that controls how a webpage looks—colours, font sizes, spacing, and mobile-friendly layout.'
      },
      {
        term: 'JavaScript',
        definition:
          'The programming language that makes a webpage interactive—handling button clicks, checking forms, and calculating totals.'
      }
    ],
    workedExample: {
      title: "Thandi's Spaza Shop in KaNyamazane — Simple Website with HTML, CSS & JS",
      scenario:
        'Thandi wants a clean webpage for her spaza shop in KaNyamazane showing her shop name, bread price (R20), and an interactive "Order Now" button.',
      codeBlock: `<!-- HTML — Structure -->\n<h1>Thandi's Spaza</h1>\n<p>Fresh bread R20</p>\n<button>Order Now</button>\n\n/* CSS — Style */\nh1 { color: green; }\np { font-size: 20px; }\n\n// JavaScript — Behaviour (on button click)\nalert("Thank you! Your order is coming.");`,
      steps: [
        'Step 1 (HTML builds content): Shows the heading "Thandi\'s Spaza", price text "Fresh bread R20", and the clickable "Order Now" button.',
        'Step 2 (CSS styles appearance): Turns the <h1> heading green and increases the <p> paragraph size to 20px so it is easy to read.',
        'Step 3 (JavaScript handles clicks): When a customer taps "Order Now", alert(...) pops up "Thank you! Your order is coming."'
      ],
      finalAnswer:
        'HTML decides WHAT appears on the page, CSS controls HOW it looks, and JavaScript defines WHAT it does when clicked.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Coding',
        question:
          'A website already has <h1>Price: R100</h1>, but the owner wants it red and big. Which language do you use, and what exact code do you write?',
        answer: 'Use CSS to style the heading red and large:',
        answerCodeBlock: `h1 {\n    color: red;\n    font-size: 30px;\n}`
      },
      {
        number: 2,
        label: 'Scenario',
        question:
          'A learner’s website looks good on a laptop, but text is tiny and hard to tap on a phone. Explain 1 problem and give 2 practical solutions.',
        answer:
          'Problem: The site is not responsive—it was designed only for wide laptop screens instead of mobile phones. Solutions: 1) Write responsive CSS so text, images, and grids resize automatically for narrow phone screens; 2) Test on a phone first and use readable fonts plus large, thumb-friendly buttons.'
      }
    ]
  }
];
