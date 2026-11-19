/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN ORIGINAL NCV INFORMATION TECHNOLOGY & COMPUTER SCIENCE TEXTBOOK
 * Status: LIVE — All 10 Chapters Complete (Level 2, Level 3 & Level 4)
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
  displayHeading?: string;
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
  { chapterNumber: 8, level: 4, title: 'Cybersecurity, Ethics & POPIA', status: 'LIVE' },
  { chapterNumber: 9, level: 4, title: 'Advanced Python + Capstone Project', status: 'LIVE' },
  { chapterNumber: 10, level: 4, title: 'Careers, Digital Entrepreneurship & Exam Prep', status: 'LIVE' }
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
  },
  {
    id: 'it-l4-ch8-cybersecurity-ethics-popia',
    level: 4,
    chapterNumber: 8,
    chapterLabel: 'Level 4 • Chapter 8',
    title: 'Cybersecurity, Ethics & POPIA',
    subtitle: 'Level 4 - NCV IT & Computer Science',
    sections: [
      {
        heading: 'What Is Cybersecurity & Common Attacks in South Africa',
        paragraphs: [
          'Cybersecurity means protecting computers, smartphones, networks, and personal data from hackers and online criminals. Every South African learner and small business faces four common attacks:'
        ],
        bullets: [
          'Phishing: A fake SMS, email, or WhatsApp message pretending to be a bank or courier—for example: "Your Capitec account blocked, click link." Clicking the link steals your banking password or PIN.',
          'Malware / Virus: Harmful software that deletes files, locks your PC, or spies on you. It spreads through free cracked downloads, fake apps, and infected USB drives.',
          'Password Attack: Hackers use automated tools to guess weak passwords such as 123456 or password in seconds.',
          'Social Engineering: Hackers trick YOU rather than breaking the computer—for example, calling pretending to be MTN or your bank and asking for your OTP.'
        ]
      },
      {
        heading: 'How to Protect Yourself (5 Essential Habits)',
        paragraphs: [
          'Strong everyday habits stop almost every common attack before damage happens:'
        ],
        bullets: [
          'Strong Password: Use 12+ characters mixing uppercase letters, lowercase letters, numbers, and symbols—for example, Mbombela@2026! — and NEVER use your birthdate or phone number.',
          '2FA (Two-Factor Authentication): Password + OTP sent to your phone. Even if a criminal learns your password, they cannot log in without your phone.',
          'Never Click Strange Links: Always check the real sender. South African banks NEVER ask for your PIN or OTP on WhatsApp, SMS links, or phone calls.',
          'Keep Software Updated & Antivirus ON: Install phone and Windows updates promptly and keep antivirus protection active.',
          'Back Up Important Files: Keep a safe copy in cloud storage or an external drive so a virus or broken device cannot wipe out your work.'
        ]
      },
      {
        heading: 'Computer Ethics & POPIA (South African Law)',
        paragraphs: [
          'Technical security goes hand in hand with honest digital behaviour and South African law:'
        ],
        bullets: [
          'Ethics: Use computers honestly—do not copy other learners’ work, do not hack or trespass into accounts, and never share private photos or data without consent.',
          'POPIA (Protection of Personal Information Act): South Africa’s privacy law requiring schools, businesses, and apps to protect personal information—ID numbers, phone numbers, home addresses, academic marks, and health info—and obtain permission before collecting or sharing it.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Phishing',
        definition:
          'A fake SMS, email, or WhatsApp message pretending to be a trusted bank or company to trick you into giving away your password or OTP.'
      },
      {
        term: '2FA (Two-Factor Authentication)',
        definition:
          'An extra security lock requiring both your password AND a one-time OTP code or app approval on your phone.'
      },
      {
        term: 'POPIA',
        definition:
          'South Africa’s Protection of Personal Information Act—a law requiring organisations and people to guard personal info and get permission before sharing it.'
      }
    ],
    workedExample: {
      title: 'Sipho in Mbombela — Handling a Fake Capitec SMS',
      scenario:
        'Sipho in Mbombela receives an SMS reading: "Capitec: Your account blocked. Click here to fix, enter OTP." What should he do step by step?',
      steps: [
        'Step 1 (Check if it is real): Real banks NEVER send SMS links asking you to enter your PIN or OTP. This message is PHISHING.',
        'Step 2 (Take immediate safe action): Do NOT click the link, do NOT enter any OTP, and delete the SMS right away.',
        'Step 3 (Verify safely & strengthen password): Open the official Capitec app directly yourself to confirm your balance is fine, and update your password to a strong unique one such as Nelspruit#2026!.',
        'Step 4 (Lock down account): Make sure 2FA / in-app approval is turned ON inside the banking app.'
      ],
      finalAnswer:
        'It was a phishing attack. Never click the link or share an OTP—verify directly in the real app and protect the account with a strong password + 2FA.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Security & Passwords',
        question:
          'A learner uses the password "12345" for email, school portal, and online banking—all the same. Name 2 problems and 2 solutions.',
        answer:
          'Problems: 1) "12345" is extremely weak and can be guessed in seconds; 2) Reusing one password means if a hacker breaks one account, ALL accounts are compromised. Solutions: 1) Create a unique strong password (12+ mixed characters) for every important account; 2) Turn on 2FA and store passwords safely in a trusted password manager.'
      },
      {
        number: 2,
        label: 'POPIA & Ethics',
        question:
          'A school posts learners’ full names, SA ID numbers, and test marks on a public Facebook page. Explain 2 POPIA problems and 2 solutions.',
        answer:
          'Problems: 1) ID numbers and marks are private personal information—criminals can use exposed ID numbers for identity fraud; 2) Posting publicly breaks POPIA because no consent was obtained from parents or learners. Solutions: 1) Remove the public post immediately; 2) Publish marks inside a private password-protected portal using anonymous Learner Numbers, and obtain written consent before sharing any personal info.'
      }
    ]
  },
  {
    id: 'it-l4-ch9-advanced-python-capstone',
    level: 4,
    chapterNumber: 9,
    chapterLabel: 'Level 4 • Chapter 9',
    title: 'Advanced Python + Capstone Project',
    subtitle: 'Level 4 - NCV IT & Computer Science',
    sections: [
      {
        heading: 'From Small Code to Real Programs (4 Core Python Tools)',
        paragraphs: [
          'Now we move from single-line scripts to real working programs using Lists, Loops, Functions, and File Handling:'
        ],
        codeBlock: `# 1. Lists — Store many values in one box (starts at index 0, not 1)\nmarks = [60, 75, 80, 45, 90]\nprint(marks[0])   # First mark = 60\n\n# 2. Loops — Repeat without typing 100 times\nfor mark in marks:\n    print(mark)\n\n# 3. Functions — Reusable blocks (write once, use many times)\ndef add(a, b):\n    return a + b\n\nprint(add(500, 700))   # = 1200\n\n# 4. File Handling — Save data even after computer switches off\nfile = open("learners.txt", "w")\nfile.write("Sipho - 75%")\nfile.close()`,
        bullets: [
          'Lists: Store many values inside one variable, starting at index 0 (marks[0] is the first item).',
          'Loops: Repeat an action automatically over every item in a list.',
          'Functions: Reusable blocks written once with def and called whenever needed.',
          'File Handling: Write and save output to disk (.txt files) so information stays safe even when the PC turns off.'
        ]
      },
      {
        heading: 'The Capstone Project (5 Steps to Solve a Real SA Problem)',
        paragraphs: [
          'Your Capstone Project combines everything you have learned—HTML + CSS + Python + Databases + Cybersecurity—to build a real working system for a South African school or SMME (such as a spaza shop in Mbombela):'
        ],
        bullets: [
          'Step 1 — Find a Problem: Example: A township spaza shop uses a paper notebook for stock and loses sales figures.',
          'Step 2 — Plan: Draw a clear Flowchart and write Pseudocode before coding.',
          'Step 3 — Build: Write the clean Python program and/or website with strong passwords and POPIA rules.',
          'Step 4 — Test: Try real South African Rand numbers, check edge cases, and fix any bugs.',
          'Step 5 — Present: Demonstrate clearly to your teacher or client how the system works.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'List',
        definition:
          'One variable that stores many ordered values inside square brackets, e.g. marks = [60, 75, 80], starting at index 0.'
      },
      {
        term: 'Function',
        definition:
          'A reusable block of code that you write once using def and call many times whenever needed, e.g. def add(a, b):.'
      },
      {
        term: 'Capstone Project',
        definition:
          'Your final end-of-course project combining programming, databases, web skills, and cybersecurity to solve a real-world problem.'
      }
    ],
    workedExample: {
      title: 'Mbombela Tuckshop — Python List + Loop + Function Sales Calculator',
      scenario:
        'Build a reusable Tuckshop Calculator in Python for a Mbombela tuckshop selling Bread (R20), Chips (R15), and a Cold Drink (R30).',
      codeBlock: `# List of prices\nprices = [20, 15, 30]   # Bread R20, Chips R15, Drink R30\n\ndef total_sales(prices):\n    total = 0\n    for price in prices:\n        total = total + price\n    return total\n\nprint("Total: R", total_sales(prices))`,
      steps: [
        'Step 1 (List stores prices): prices holds [20, 15, 30].',
        'Step 2 (Loop adds each item): Start total = 0 -> 0 + 20 = 20 -> 20 + 15 = 35 -> 35 + 30 = 65.',
        'Step 3 (Function returns result): total_sales(prices) returns 65 back to print().',
        'Step 4 (Output shown): Screen prints "Total: R 65". Even if the shop adds 100 items to the list, the same function calculates the total without rewriting code.'
      ],
      finalAnswer:
        'Tuckshop made R65 (prints "Total: R 65"). The exact same total_sales() function scales cleanly to 100+ items without rewriting logic.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Python Trace',
        question: 'Trace the Python list and loop code below. What number does it print?',
        questionCodeBlock: `numbers = [10, 20, 30]\ntotal = 0\nfor n in numbers:\n    total = total + n\nprint(total)`,
        answer: '0 + 10 = 10, then 10 + 20 = 30, then 30 + 30 = 60. The program prints 60.'
      },
      {
        number: 2,
        label: 'Capstone & POPIA Design',
        question:
          'A spaza shop in Nelspruit uses a paper notebook and keeps losing sales records. Design a capstone solution listing 3 practical features and 1 POPIA rule.',
        answer:
          '3 Features: 1) Add product name and price cleanly in Python or a web app; 2) Auto-calculate daily total sales with zero arithmetic mistakes; 3) Save daily totals to a file or database with quick search by date. POPIA Rule: Never store customers’ SA ID numbers or phone numbers without clear permission, and protect the system with a strong password login.'
      }
    ]
  },
  {
    id: 'it-l4-ch10-careers-entrepreneurship-exam-prep',
    level: 4,
    chapterNumber: 10,
    chapterLabel: 'Level 4 • Chapter 10',
    title: 'Careers, Digital Entrepreneurship & Exam Prep',
    subtitle: 'Level 4 - NCV IT & Computer Science',
    sections: [
      {
        heading: 'IT Careers in South Africa (Turn Skills into Income & Jobs)',
        paragraphs: [
          'With your NCV Level 2–4 IT skills, you can apply for real entry-level jobs across South African schools, lodges, government offices, and tech companies:'
        ],
        bullets: [
          'IT Support Technician: Fix PCs, Wi-Fi, and printers (around R8 000 – R15 000/month starting).',
          'Web Developer: Build websites for businesses using HTML, CSS, and JavaScript (R12 000 – R25 000/month).',
          'Python Developer: Build apps and automation tools (R15 000 – R30 000/month).',
          'Data / Admin Specialist: Manage Excel spreadsheets and databases for offices, schools, and lodges.',
          'Cybersecurity Analyst: Protect companies from hackers and phishing—one of the fastest-growing careers in South Africa.'
        ]
      },
      {
        heading: 'Digital Entrepreneurship & Why Portfolio > Certificate',
        paragraphs: [
          'You do not need big startup money in Mbombela or your hometown—you only need ONE solid skill and ONE paying client:'
        ],
        bullets: [
          'Build websites for spaza shops, churches, and local lodges: Charge R1 500 – R5 000 per site.',
          'Fix phones / PCs or install home Wi-Fi: Charge R200 – R500 per job.',
          'Teach Excel or basic computer lessons: Charge R150/hour.',
          'Market on WhatsApp, TikTok, and Facebook: No expensive physical shop needed.',
          'Portfolio > Certificate: Clients do not ask for your marks—they ask "Show me what you built." Keep 3 strong projects ready: 1 Website, 1 Python program, and 1 Excel / Database system.'
        ]
      },
      {
        heading: 'NCV Exam Prep — 5 Rules to Pass First Time',
        paragraphs: [
          'Use these five proven exam strategies before and during your NCV IT & Computer Science papers:'
        ],
        bullets: [
          '1. Theory: Learn Key Terms cleanly—examiners love clear definitions and comparisons.',
          '2. Practical: Practise Python and Excel hands-on—do not just read notes, TYPE the code and formulas.',
          '3. Past Papers: Complete at least 3 timed past papers under exam conditions.',
          '4. Time Management: Answer easy questions FIRST so you secure quick marks, and leave harder questions for last.',
          '5. Show Every Step: In calculation questions, always write the formula and working steps—even if your final number slips, you still earn method marks.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Portfolio',
        definition:
          'A collection of real completed projects (such as a live website, Python app, and Excel/database system) proving you can do practical work.'
      },
      {
        term: 'Digital Entrepreneurship',
        definition:
          'Using IT skills to start your own online or local tech business—building websites, fixing devices, teaching Excel, or selling services on social media.'
      },
      {
        term: 'Capstone',
        definition:
          'Your final showcase project bringing together programming, web design, databases, and cybersecurity into one working solution.'
      }
    ],
    workedExample: {
      title: 'Thandi in KaNyamazane — Turning IT Skills into R4 300 Profit',
      scenario:
        'Thandi in KaNyamazane combines her HTML/CSS skills (Chapter 7) and Excel skills (Chapter 6) to help a safari lodge in Hazyview that needs a simple website and a booking spreadsheet.',
      steps: [
        'Step 1 (Combine Skills): Website design + structured Excel booking sheet.',
        'Step 2 (Price Fairly): Website R3 000 + Excel system R1 500 = R4 500 total income.',
        'Step 3 (Subtract Costs): Mobile data R200 across 3 days of work -> Profit = R4 500 − R200 = R4 300.',
        'Step 4 (Grow by Referral): Happy Hazyview lodge refers 2 neighbouring lodges, bringing 2 more paid clients and a stronger portfolio.'
      ],
      finalAnswer:
        '1 skill + 1 client = R4 300 profit, a stronger portfolio, and word-of-mouth referrals that raise her future rates.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Digital Business Calculation',
        question:
          'A learner builds business websites for R2 000 each and completes 3 websites in one month. Total data cost is R300. Calculate total income and profit.',
        answer:
          'Total Income = 3 × R2 000 = R6 000. Profit = R6 000 − R300 = R5 700.'
      },
      {
        number: 2,
        label: 'Career & Portfolio Scenario',
        question:
          'Two graduates apply for an IT Support & Junior Tech role. Candidate A brings only a paper certificate; Candidate B brings a certificate PLUS a portfolio with 3 real projects. Who gets the job and why? Give 2 reasons.',
        answer:
          'Candidate B (with the portfolio) wins the job. Reasons: 1) Real projects prove she/he can actually DO the practical work rather than only memorising theory; 2) Employers can inspect working websites, Python scripts, and databases directly, making hiring much lower risk.'
      }
    ]
  }
];

export const NCV_IT_LEVEL4_EXTENDED_CHAPTERS: ItChapter[] = [
  {
    id: 'it-l4-spec-ch1-advanced-systems-troubleshooting',
    level: 4,
    chapterNumber: 1,
    chapterLabel: 'Level 4 • Chapter 1',
    displayHeading: 'Level 4 — Chapter 1: Advanced Computer Systems & Troubleshooting',
    title: 'Advanced Computer Systems & Troubleshooting',
    subtitle: 'Level 4 - NCV IT & Computer Science',
    sections: [
      {
        heading: 'Advanced Hardware (Fix & Upgrade Like a Technician)',
        paragraphs: [
          'In Level 2 and 3 you learned computer parts. In Level 4 you diagnose, upgrade, and repair systems like an IT support technician:'
        ],
        bullets: [
          'CPU: The brain of the PC, measured in GHz. More GHz + more cores = faster performance (e.g. an Intel Core i5 is faster than an i3).',
          'RAM: Short-term working memory. 4 GB = slow, 8 GB = good for daily work, 16 GB = best for coding and design. When RAM fills up, the PC freezes.',
          'SSD vs HDD: HDD is an older, slow spinning disk; SSD is modern flash storage with no moving parts. Upgrading to an SSD makes an older PC feel brand new—booting in ~10 seconds instead of 2 minutes.',
          'Motherboard: Connects every component together. If the motherboard fails, nothing works.'
        ]
      },
      {
        heading: 'Operating Systems (OS)',
        paragraphs: ['Technicians support all three major desktop operating systems:'],
        bullets: [
          'Windows: Most common across South African schools, TVET labs, and offices.',
          'Linux: Free, open-source OS widely used by developers and powering internet servers.',
          'macOS: Built exclusively for Apple Mac computers.'
        ]
      },
      {
        heading: 'The 5-Step Troubleshooting Method & Common Problems',
        paragraphs: [
          'Always follow this structured 5-step troubleshooting method in exams and on the job:'
        ],
        bullets: [
          'Step 1 — Identify: Ask what the exact symptom is (e.g. "PC won’t turn on").',
          'Step 2 — Check Simple Things First: Is the power cable plugged in? Wall switch ON? Monitor turned on?',
          'Step 3 — Test: Try a spare cable, swap RAM sticks, or restart the system.',
          'Step 4 — Fix: Replace faulty parts, reinstall a driver, or run system updates.',
          'Step 5 — Test Again & Document: Confirm everything works properly and write down what you fixed.',
          'Common Fix — Slow PC: Too many startup apps + full HDD + low RAM -> Uninstall unused apps, clean disk, and upgrade to SSD + 8 GB RAM.',
          'Common Fix — No Wi-Fi: Wi-Fi switched off / outdated driver / router offline -> Turn Wi-Fi on, restart router, and update the Wi-Fi driver.',
          'Common Fix — Blue Screen (BSOD): RAM fault or crashed driver -> Remove one RAM stick at a time to test, or roll back/reinstall the driver.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'SSD (Solid State Drive)',
        definition:
          'Fast permanent storage with no moving parts that allows computers to boot and open apps in seconds.'
      },
      {
        term: 'Troubleshooting',
        definition:
          'A clear, step-by-step method used to locate the root cause of a computer fault and fix it.'
      },
      {
        term: 'Driver',
        definition:
          'Small system software that lets the Operating System communicate with hardware, such as a printer driver or Wi-Fi driver.'
      }
    ],
    workedExample: {
      title: 'School PC in Mbombela — Fixing Slow Boot & Excel Freezing',
      scenario:
        'A school office PC in Mbombela takes 5 minutes to boot and freezes whenever teachers open Excel. Walk through the 5-step troubleshooting fix and calculate savings vs buying a R6 000 new PC.',
      steps: [
        'Step 1 (Identify): Extremely slow startup and Excel keeps freezing.',
        'Step 2 (Check specs): PC has only 4 GB RAM and an old 500 GB HDD that is 95% full.',
        'Step 3 (Test with Task Manager): RAM sits at 95% used and Disk sits at 100% used.',
        'Step 4 (Fix & upgrade): Upgrade RAM 4 GB → 8 GB (R600), replace HDD → 256 GB SSD (R700), and clean temporary files.',
        'Step 5 (Test again & calculate cost): Boot time drops from 5 minutes → 12 seconds and Excel opens smoothly. Total upgrade cost = R600 + R700 = R1 300. Savings vs R6 000 new PC = R6 000 − R1 300 = R4 700.'
      ],
      finalAnswer:
        'Total upgrade cost = R1 300 (boot drops from 5 min to 12 sec). The school gets a fast PC and saves R4 700 compared to buying a R6 000 replacement.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Hardware & RAM Scenario',
        question:
          'A computer has 4 GB RAM. The user opens Chrome (3 GB) and Zoom (2 GB), needing 5 GB in total. What happens and how do you fix it?',
        answer:
          'Chrome + Zoom need 3 GB + 2 GB = 5 GB, which is more than the 4 GB RAM available, causing the PC to slow down severely, freeze, or crash. Solution: Upgrade the PC to 8 GB RAM and close unused browser tabs/programs.'
      },
      {
        number: 2,
        label: 'Troubleshooting Order',
        question:
          'A client’s desktop PC will not turn on at all (no lights, no fan noise). List 3 checks in order before opening the PC case.',
        answer:
          '1) Check that the power cable is firmly plugged into both the wall and PC and that the wall plug switch is ON; 2) Test a different known-working wall socket or power cable; 3) Check the power supply (PSU) rocker switch at the back of the PC. Only open the case after these simple checks.'
      }
    ]
  },
  {
    id: 'it-l4-spec-ch2-advanced-networks-security',
    level: 4,
    chapterNumber: 2,
    chapterLabel: 'Level 4 • Chapter 2',
    displayHeading: 'Level 4 — Chapter 2: Advanced Networks & Security',
    title: 'Advanced Networks & Security',
    subtitle: 'Level 4 - NCV IT & Computer Science',
    sections: [
      {
        heading: 'Small Business Network Setup & IP Addressing (Static vs DHCP)',
        paragraphs: [
          'In Level 3 you learned LAN and WAN basics. In Level 4 you set up and lock down a real business network like a technician:'
        ],
        bullets: [
          'Router: Connects the local business LAN to the outside Internet (Fibre or LTE).',
          'Switch: Connects desktop PCs and printers using Ethernet cables for fast, stable speeds.',
          'Access Point (AP): Boosts Wi-Fi signal cleanly into back offices or customer seating areas.',
          'Cat6 Cabling: Fast network cable supporting up to 1 Gbps. Never run Cat6 directly beside electrical power cables—power causes electrical interference.',
          'Static IP: Never changes—ideal for shared printers and servers (e.g. Printer always stays at 192.168.1.20).',
          'Dynamic IP & DHCP: Changes automatically; the Router’s DHCP service assigns IPs to phones and PCs automatically, saving hours of setup.'
        ]
      },
      {
        heading: '5 Network Security Rules & Common Attacks',
        paragraphs: [
          'Every South African SMME network must block attackers with five practical defences:'
        ],
        bullets: [
          '1. Change Default Admin Password: New routers ship with admin / admin—criminals know these defaults, so change them first.',
          '2. Use Strong WPA3 / WPA2 Wi-Fi Passwords: Never use weak codes such as 12345678.',
          '3. Keep Firewall ON: Acts as a barrier between the Internet and your LAN to block unauthorised traffic.',
          '4. Separate Staff & Guest Wi-Fi: Put Staff devices on a private Wi-Fi and Customers/Guests on an isolated Guest Wi-Fi so guests can NEVER view staff files.',
          '5. Use a VPN (Virtual Private Network): Creates an encrypted tunnel for working remotely or protecting banking on public Wi-Fi.',
          'Common Attack — DoS (Denial of Service): Attacker floods the network with fake traffic until it slows down or crashes.',
          'Common Attack — Man-in-the-Middle (MitM): Attacker sits invisibly between your device and your bank/website on unsecured Wi-Fi to steal passwords.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'DHCP',
        definition:
          'Dynamic Host Configuration Protocol — the router service that automatically assigns IP addresses to devices joining a network.'
      },
      {
        term: 'Firewall',
        definition:
          'A network security wall that filters traffic between the Internet and your LAN, blocking suspicious or unauthorised connections.'
      },
      {
        term: 'VPN (Virtual Private Network)',
        definition:
          'A safe encrypted tunnel protecting your data over the internet, especially when working remotely or on public Wi-Fi.'
      }
    ],
    workedExample: {
      title: 'Café in Nelspruit — Setting Up & Securing Staff + Customer Wi-Fi',
      scenario:
        'A busy café in Nelspruit has 5 staff PCs, 1 shared receipt/office printer, and ~30 daily customers asking for Wi-Fi. Design the physical setup, IP setup, and security rules.',
      steps: [
        'Step 1 (Cabled Core & Customer AP): Fibre → Router → Switch → 5 staff PCs + 1 Printer via Cat6 cables, plus an Access Point for wireless customer coverage.',
        'Step 2 (Static IP for Printer): Assign Static IP 192.168.1.20 to the printer so every staff PC can always locate it reliably.',
        'Step 3 (Separate Wi-Fi Networks): Create private Staff Wi-Fi (CafeStaff@2026!) and isolated Guest Wi-Fi (CafeGuest2026). Staff PCs use DHCP cleanly.',
        'Step 4 (Lock Router & Firewall): Change the default router admin password immediately and keep the Firewall ON.',
        'Step 5 (Verify Isolation): Test from a guest phone trying to reach staff folders — access is BLOCKED; guests only reach the Internet.'
      ],
      finalAnswer:
        'Fast cabled staff LAN, reliable Static IP 192.168.1.20 printer, strong router/Firewall protection, and separated Guest Wi-Fi blocking access to staff data.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'DHCP vs Static IP',
        question:
          'A school has 40 lab PCs. Configuring Static IPs manually takes 2 hours, while DHCP takes 5 minutes. Which method is better for the 40 PCs and why? What should be used for the shared printer?',
        answer:
          'Use DHCP for the 40 PCs because it assigns IP addresses automatically in minutes with zero manual typing errors. Use a Static IP for the shared printer so its address never changes and every PC can always print to it.'
      },
      {
        number: 2,
        label: 'Wi-Fi & Router Security',
        question:
          'A spaza shop uses the default router password "admin" and Wi-Fi password "12345678". An attacker breaks in and views online banking activity. Name 2 security problems and 2 fixes.',
        answer:
          'Problems: 1) Leaving the default router password ("admin") lets hackers take over router settings; 2) A weak password ("12345678") can be cracked in seconds. Fixes: 1) Change the router admin password immediately and set a strong WPA2/WPA3 Wi-Fi password; 2) Turn ON the Firewall and separate Guest Wi-Fi from the business/banking network.'
      }
    ]
  },
  {
    id: 'it-l4-spec-ch3-advanced-databases-sql',
    level: 4,
    chapterNumber: 3,
    chapterLabel: 'Level 4 • Chapter 3',
    displayHeading: 'Level 4 — Chapter 3: Advanced Databases & SQL',
    title: 'Advanced Databases & SQL',
    subtitle: 'Level 4 - NCV IT & Computer Science',
    sections: [
      {
        heading: 'Why Databases Beat Excel for Big Data + Relational Tables',
        paragraphs: [
          'In Level 3 you learned Tables, Fields, and Primary Keys. In Level 4 you design multi-table relational databases and query them with SQL. While Excel works well for ~100 rows, a proper database handles 100 000+ rows with fast search, zero duplicate typing, and multi-user access.'
        ],
        codeBlock: `Table 1: Learners\nLearnerID (PK) | Name   | Phone\n1              | Sipho  | 082...\n2              | Thandi | 083...\n\nTable 2: Marks\nMarkID (PK) | LearnerID (FK) | Subject | Mark\n1           | 1              | IT      | 75\n2           | 2              | IT      | 80`,
        bullets: [
          'Foreign Key (FK): A linking field between tables—LearnerID in the Marks table points back to Learners so you never re-type Sipho’s name 100 times.',
          'Normalization: The database design rule meaning "do not repeat data"—store learner details ONCE in Learners and link via LearnerID everywhere else.'
        ]
      },
      {
        heading: 'SQL Basics — Talking to a Database',
        paragraphs: [
          'SQL (Structured Query Language) is the universal language used to read, add, update, and filter database records:'
        ],
        codeBlock: `-- Show ALL learners\nSELECT * FROM Learners;\n\n-- Show only learners who PASSED\nSELECT Name, Mark FROM Marks WHERE Mark >= 50;`,
        bullets: [
          'SELECT = Show / read matching data',
          'INSERT = Add new rows into a table',
          'UPDATE = Change existing data',
          'DELETE = Remove rows from a table',
          'WHERE = Filter rows using a condition (e.g. Mark >= 50)'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Foreign Key (FK)',
        definition:
          'A field that links one table to another table’s Primary Key, e.g. LearnerID in the Marks table linking back to Learners.'
      },
      {
        term: 'SQL',
        definition:
          'Structured Query Language — the standard language used to create, read, update, and delete data inside relational databases.'
      },
      {
        term: 'Normalization',
        definition:
          'Database design rules that eliminate repeated data—storing each person or item once and connecting tables using IDs.'
      }
    ],
    workedExample: {
      title: 'Lodge in Hazyview — Fixing 200 Duplicate Guest Rows with SQL',
      scenario:
        'A safari lodge in Hazyview stores 200 guests inside a messy Excel sheet—causing slow lookups, duplicate rows, and misspelled names. Fix it using a normalized 2-table database and SQL.',
      codeBlock: `INSERT INTO Guests (Name, Phone) VALUES ('Sipho Dlamini', '0821234567');\n\nSELECT Name, Amount FROM Bookings WHERE Amount > 1000;`,
      steps: [
        'Step 1 (Design 2 normalized tables): Create Guests (GuestID PK, Name, Phone) + Bookings (BookingID PK, GuestID FK, Date, Amount).',
        'Step 2 (Insert a new guest once): Run INSERT INTO Guests to save Sipho Dlamini cleanly.',
        'Step 3 (Query high-value bookings): Run SELECT Name, Amount FROM Bookings WHERE Amount > 1000; to list bookings above R1 000.',
        'Step 4 (Result): Instead of scrolling manually through 200 Excel rows, SQL finds matching records in 1 second with zero duplicate guest names.'
      ],
      finalAnswer:
        'Normalized tables + SQL eliminate duplicate spelling errors and return bookings over R1 000 in 1 second.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'SQL Query',
        question:
          'Write the SQL query to display learners in Mbombela who scored 80 or more in IT.',
        answer: 'Filter using WHERE Mark >= 80:',
        answerCodeBlock: `SELECT Name, Mark FROM Marks WHERE Mark >= 80;`
      },
      {
        number: 2,
        label: 'Normalization & Foreign Keys',
        question:
          'A school stores learner Name and Phone in EVERY Marks row (repeated 500 times). State 1 major problem this causes and give 2 database solutions.',
        answer:
          'Problem: If a learner’s phone number changes, staff must edit 500 rows manually—causing typos, mismatch errors, and wasted storage. Solutions: 1) Normalize the database by storing Name and Phone ONCE inside a Learners table; 2) Link tables using LearnerID as a Foreign Key inside the Marks table.'
      }
    ]
  },
  {
    id: 'it-l4-spec-ch5-advanced-web-ecommerce',
    level: 4,
    chapterNumber: 5,
    chapterLabel: 'Level 4 • Chapter 5',
    displayHeading: 'Level 4 — Chapter 5: Advanced Web Development & E-Commerce',
    title: 'Advanced Web Development & E-Commerce',
    subtitle: 'Level 4 - NCV IT & Computer Science',
    sections: [
      {
        heading: 'Static vs Dynamic Websites & Making Pages Interactive with JavaScript',
        paragraphs: [
          'In Level 3 you built static pages that show the same poster-like text to everyone. In Level 4 you build dynamic websites that respond to clicks, connect to databases, accept online orders, and process South African payments.'
        ],
        codeBlock: `// When user clicks button, show message\nfunction orderNow() {\n  alert("Thank you! Your order is received.");\n}`,
        bullets: [
          'Static Website: Uses HTML + CSS only—like a printed poster, with no login and no shopping cart.',
          'Dynamic Website: Uses HTML + CSS + JavaScript + Database—like Takealot, supporting login, product search, shopping carts, and online checkout.',
          'JavaScript: Brings buttons, forms, and carts alive—without JavaScript a button sits idle; with JavaScript it actually works.'
        ]
      },
      {
        heading: 'How E-Commerce Works & SA Online Shop Essentials',
        paragraphs: [
          'Every successful South African e-commerce website follows a 5-step order flow and prioritises mobile shoppers first:'
        ],
        bullets: [
          '1. Customer browses products loaded from a Database -> 2. Adds items to Cart -> 3. Enters Name & Address at Checkout -> 4. Pays via PayFast, Yoco, SnapScan, or EFT -> 5. Order saves to Database and owner receives SMS/Email notice.',
          'SA Shop Must-Haves: Display prices clearly in Rand (R), support local delivery (Mbombela, Nelspruit, or national courier), include a WhatsApp order button (most SA shoppers order via WhatsApp), and obey POPIA by guarding customer phone numbers and addresses.',
          'Responsive Design (Mobile-First): Roughly 90% of South African shoppers browse on phones rather than laptops—always write mobile-first CSS so pages fit small screens cleanly.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'JavaScript',
        definition:
          'The programming language that makes websites interactive—powering clickable buttons, live shopping carts, and form checks.'
      },
      {
        term: 'E-Commerce',
        definition:
          'Buying and selling goods or services online, including digital catalogues, order checkout, and online payment.'
      },
      {
        term: 'Cart',
        definition:
          'A temporary list holding the items and quantities a shopper plans to buy before completing checkout.'
      }
    ],
    workedExample: {
      title: "Gogo's Vetkoek Shop in Mbombela — Online Orders & Cart Total",
      scenario:
        "Gogo's Vetkoek Shop in Mbombela wants customers to browse menus, calculate totals automatically, and place orders online for delivery to KaNyamazane.",
      codeBlock: `let total = 20 + 30;\nalert("Total: R" + total);`,
      steps: [
        'Step 1 (Website menu): Display clean product photos with Rand prices: Vetkoek R20, Chips R30.',
        'Step 2 (JavaScript cart calculation): Customer clicks "Add to Cart" on Vetkoek (R20) + Chips (R30) -> JavaScript computes total = R50 and shows alert("Total: R50").',
        'Step 3 (Checkout details): Customer fills in Name, KaNyamazane delivery address, and WhatsApp number.',
        'Step 4 (SA payment options): Customer chooses PayFast link, Yoco, or Cash on Delivery.',
        'Step 5 (Saved order in Database): Owner receives clean record: "Sipho - 2 Vetkoek - R40 - Deliver to KaNyamazane".'
      ],
      finalAnswer:
        'Gogo’s shop now takes orders even after closing hours—no phone confusion and no customer travel needed before food is ready.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Static vs Dynamic E-Commerce',
        question:
          'A business website uses HTML and CSS only—no JavaScript and no database. Can customers order and pay online? Explain why.',
        answer:
          'No. It is a static website—it has no interactive cart, no checkout processing, and no database to store orders. It needs JavaScript + a Database + an SA payment gateway such as PayFast or Yoco.'
      },
      {
        number: 2,
        label: 'Mobile-First & Responsive Design',
        question:
          'A lodge in Hazyview builds a website that looks crisp on a laptop but breaks completely on a smartphone screen. Give 2 problems and 2 fixes.',
        answer:
          'Problems: 1) Around 90% of South African users browse on phones, so visitors leave immediately; 2) The lodge loses real bookings and revenue. Fixes: 1) Use mobile-first responsive CSS and test every screen on a phone first; 2) Add large thumb-friendly buttons plus a direct WhatsApp booking button.'
      }
    ]
  },
  {
    id: 'it-l4-spec-ch6-data-analysis-visualisation',
    level: 4,
    chapterNumber: 6,
    chapterLabel: 'Level 4 • Chapter 6',
    displayHeading: 'Level 4 — Chapter 6: Data Analysis & Visualisation',
    title: 'Data Analysis & Visualisation',
    subtitle: 'Level 4 - NCV IT & Computer Science',
    sections: [
      {
        heading: 'The 4 Steps of Data Analysis',
        paragraphs: [
          'Data Analysis means turning raw numbers into smart decisions that grow a business or improve school marks. Managers do not want 1 000 messy rows—they want ONE clear answer: "What sells best? Who is failing? Where are we losing money?"'
        ],
        bullets: [
          '1. Collect: Gather numbers from Excel, a Database, or Google Forms.',
          '2. Clean: Remove duplicate rows, fix spelling errors, and fill empty cells—dirty data always produces wrong answers.',
          '3. Analyse: Calculate totals, averages, and counts using Excel formulas or Python.',
          '4. Visualise: Build clean charts or graphs because people spot patterns in pictures faster than in tables.'
        ]
      },
      {
        heading: 'Key Excel Formulas & Python Data Analysis',
        paragraphs: [
          'Use built-in Excel functions or simple Python list functions to summarise hundreds of numbers in seconds:'
        ],
        codeBlock: `sales = [500, 700, 300, 900, 1200]\nprint(sum(sales))               # Total = 3600\nprint(sum(sales) / len(sales))  # Average = 720\nprint(max(sales))               # Best day = 1200`,
        bullets: [
          '=SUM() — Total value across selected cells',
          '=AVERAGE() — Average mark or daily sales',
          '=COUNTIF(A1:A10, ">=50") — Count how many learners passed (>=50)',
          '=MAX() / =MIN() — Highest (best) and lowest (worst) values'
        ]
      },
      {
        heading: 'Visualisation — Choosing the Right Chart',
        paragraphs: [
          'Golden rule: if your manager or teacher cannot understand the chart in 5 seconds, it is too complicated:'
        ],
        bullets: [
          'Bar Chart: Compare categories side-by-side—such as monthly sales or marks per learner.',
          'Line Chart: Show trends over time—are sales going UP or DOWN?',
          'Pie Chart: Show shares of a whole—for example, 60% Vetkoek and 40% Chips.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Data Analysis',
        definition:
          'Cleaning, organising, and studying numbers to uncover clear answers and support smart decisions.'
      },
      {
        term: 'Visualisation',
        definition:
          'Displaying numbers as clear charts or graphs so patterns and trends are understood at a glance.'
      },
      {
        term: 'Clean Data',
        definition:
          'Accurate, consistent data free from duplicate rows, spelling inconsistencies, and missing cells.'
      }
    ],
    workedExample: {
      title: 'Spaza Shop in Nelspruit — 5-Day Sales Analysis & Action Plan',
      scenario:
        'A spaza shop in Nelspruit records 5 days of sales (Tue–Sat): Sales = [R500, R700, R300, R900, R1200]. Analyse the figures and recommend a business decision.',
      steps: [
        'Step 1 (Total): 500 + 700 + 300 + 900 + 1 200 = R3 600.',
        'Step 2 (Daily Average): R3 600 ÷ 5 = R720 per day.',
        'Step 3 (Best & Worst Days): Best day = R1 200 (Saturday); Worst day = R300 (Wednesday).',
        'Step 4 (Chart): Plot a Bar Chart—Saturday stands tallest and Wednesday stands shortest.',
        'Step 5 (Business Decision): Order extra stock for busy Saturdays and run a mid-week promo/special on quiet Wednesdays.'
      ],
      finalAnswer:
        'Total = R3 600, Average = R720/day, Best = R1 200 (Sat), Worst = R300 (Wed). Do not order the same stock daily—stock up for Saturday and promote on Wednesday.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Data Calculation',
        question:
          'A teacher records 5 learner marks: Marks = [40, 60, 80, 90, 30]. Find the Total, Average, and Max, and state who needs extra help (pass mark = 50).',
        answer:
          'Total = 40 + 60 + 80 + 90 + 30 = 300. Average = 300 ÷ 5 = 60. Max = 90. The two learners with 40 and 30 need extra help because both scored below the 50 pass mark.'
      },
      {
        number: 2,
        label: 'Data Cleaning & Deduplication',
        question:
          'A school tracks marks in Excel, but one learner’s name is typed three different ways: "Sipho", "sipho", and "SIPHO". State 1 problem this causes and give 2 fixes.',
        answer:
          'Problem: Computers treat different spellings/cases as 3 separate people, producing wrong counts, broken averages, and inaccurate reports. Fixes: 1) Clean the data—standardise text to Proper Case ("Sipho") and fix typos; 2) Remove duplicates and match records using a unique LearnerID instead of relying on name text.'
      }
    ]
  },
  {
    id: 'it-l4-spec-ch7-project-management-systems-analysis',
    level: 4,
    chapterNumber: 7,
    chapterLabel: 'Level 4 • Chapter 7',
    displayHeading: 'Level 4 — Chapter 7: IT Project Management & Systems Analysis',
    title: 'IT Project Management & Systems Analysis',
    subtitle: 'Level 4 - NCV IT & Computer Science',
    sections: [
      {
        heading: 'Systems Analysis — Ask 4 Questions Before Writing Code',
        paragraphs: [
          'In Level 3 you built small individual programs. In Level 4 you manage a complete software project for a real business without chaos. Before writing a single line of code, Systems Analysis asks four key questions:'
        ],
        bullets: [
          '1. What is the problem? Example: A spaza shop loses stock records on paper.',
          '2. Who will use it? Owner and Cashier.',
          '3. What MUST it do? Add products, capture sales, calculate daily totals.',
          '4. What must it NOT do (out of scope)? Skip online payments for now so the core system finishes on time. Skipping analysis leads to building the wrong system.'
        ]
      },
      {
        heading: 'The 5 Steps of Project Management & Key Tools',
        paragraphs: [
          'Follow five structured stages from initial plan to handover and user training:'
        ],
        bullets: [
          '1. Plan: Define scope, team, timeline, and cost (e.g. Hazyview lodge booking system, 4 weeks, R0 budget, 2 developers).',
          '2. Design: Sketch flowcharts, database tables, and screens on paper before coding.',
          '3. Build: Write the working Python or Web application.',
          '4. Test: Test with valid Rand amounts AND wrong inputs to confirm it never crashes.',
          '5. Deliver & Train: Demonstrate to the client, train staff, and supply a simple user manual.',
          'Gantt Chart: A visual timeline bar chart showing who does each task and when deadlines fall—so delays show up early.',
          'Waterfall vs Agile: Waterfall runs Step 1 -> Step 2 -> Step 3 in strict order with no going back (suited to small fixed assignments). Agile builds small working pieces, shows the client for feedback, improves, and adds the next piece (used by most real tech companies).',
          'Risk Management: Plan ahead for load-shedding, laptop failures, or changing client requests—always keep daily backups on Google Drive + USB.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Systems Analysis',
        definition:
          'Studying the problem, users, and requirements thoroughly before building so the team creates the right solution.'
      },
      {
        term: 'Project Management',
        definition:
          'Planning, organising, building, testing, and delivering an IT project on time and within budget.'
      },
      {
        term: 'Gantt Chart',
        definition:
          'A timeline bar chart showing project tasks, assigned team members, start/end dates, and deadlines.'
      }
    ],
    workedExample: {
      title: 'Hazyview Lodge Booking System — 4-Week Project Plan',
      scenario:
        'Sipho and Thandi have 4 weeks to build a booking system for a Hazyview lodge suffering from double-booked rooms in a paper book.',
      codeBlock: `Week | Task                           | Who\n1    | Interview owner, list needs    | Sipho\n2    | Design database + screens      | Thandi\n3    | Build in Python                | Sipho + Thandi\n4    | Test + Train owner             | Both`,
      steps: [
        'Step 1 (Analysis): Owner uses a paper ledger where double-bookings happen often.',
        'Step 2 (Design): Tables = Guests + Bookings; Screen = simple room Calendar.',
        'Step 3 (Build): Code the logic in Python using an OOP Booking class.',
        'Step 4 (Test): Attempt booking the same room twice on the same date—system must reject it and display "Room already booked!".',
        'Step 5 (Deliver): Train the lodge owner, hand over a quick user manual, and save backups on Google Drive.'
      ],
      finalAnswer:
        'Delivered in 4 weeks with zero double-bookings, clean backups, and a trained, satisfied lodge owner.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Systems Analysis Scenario',
        question:
          'A developer team starts coding immediately without asking the client what they need. When finished, the client says: "This is not what I wanted." Which step did they skip, and what are 2 fixes?',
        answer:
          'They skipped Systems Analysis. Fixes: 1) Interview the client first and write down clear functional requirements; 2) Draw screens and database plans on paper and get client sign-off before writing code.'
      },
      {
        number: 2,
        label: 'Project Planning & Risk Control',
        question:
          'Your capstone project is due in 4 weeks, but your team has no schedule and only codes randomly. Identify 2 major risks and give 2 project-management solutions.',
        answer:
          'Risks: 1) Running out of time before all features are built and tested; 2) Losing project code due to laptop failure or load-shedding. Solutions: 1) Create a 4-week Gantt Chart (Week 1 Analysis, Week 2 Design, Week 3 Build, Week 4 Test & Deliver); 2) Back up work daily to Google Drive and a USB flash drive.'
      }
    ]
  },
  {
    id: 'it-l4-spec-ch8-cloud-ai-emerging-tech',
    level: 4,
    chapterNumber: 8,
    chapterLabel: 'Level 4 • Chapter 8',
    displayHeading: 'Level 4 — Chapter 8: Cloud, AI & Emerging Tech',
    title: 'Cloud, AI & Emerging Tech',
    subtitle: 'Level 4 - NCV IT & Computer Science',
    sections: [
      {
        heading: 'Cloud Computing — Work Anywhere, Zero Lost Files',
        paragraphs: [
          'In Level 3 you saved files only onto one PC’s local drive. In Level 4 you use Cloud Computing—storing files and running apps on secure internet servers so you can open your work anywhere:'
        ],
        bullets: [
          'Google Drive / OneDrive: Save files online and share clean links—no USB sticks needed (15 GB starts FREE on Google Drive instead of buying an R20 000 server).',
          'Google Docs / Sheets: Two or more people can edit the exact same file at the same time.',
          'Cloud Apps: Tools like Gmail, Canva, and WhatsApp Web run directly inside your browser—no installation needed.',
          'Why Cloud helps South African SMMEs: Files stay safe through load-shedding, survive laptop theft (just log in on a new device), and let a team in Mbombela collaborate live with a client in Johannesburg.'
        ]
      },
      {
        heading: 'Artificial Intelligence (AI) & Emerging Technologies',
        paragraphs: [
          'AI systems learn patterns from large data to help draft text, explain code, and answer customer queries—alongside connected IoT and 5G networks:'
        ],
        bullets: [
          'AI Tools (ChatGPT / Meta AI): Help draft emails, explain tricky Python bugs, or outline business plans.',
          'AI in Local SA Business: Lodges use AI assistants to reply to night-time enquiries; spaza owners draft neat price lists fast.',
          'Golden AI Rule: AI is a HELPER, not a replacement—ALWAYS verify AI answers against your textbook or teacher because AI can make mistakes.',
          'IoT (Internet of Things): Everyday devices (fridges, security cameras, boom gates, water-tank sensors) connected to the Internet—e.g. a farmer checks water tank levels on a phone.',
          'Cybersecurity + AI & 5G: Modern cyber defence uses AI to spot AI-driven attacks, while faster 5G mobile internet powers smoother video calls and mobile e-commerce.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Cloud Computing',
        definition:
          'Storing files and running applications on secure Internet servers rather than only on your local PC, so you can access work anywhere.'
      },
      {
        term: 'AI (Artificial Intelligence)',
        definition:
          'Software systems trained on data to generate text, explain problems, make predictions, or assist human decisions.'
      },
      {
        term: 'IoT (Internet of Things)',
        definition:
          'Everyday physical devices—such as smart cameras, farm tank sensors, or automated gates—connected to the Internet to send data.'
      }
    ],
    workedExample: {
      title: 'Tutor in Mbombela — Surviving Laptop Theft with Cloud + Smart AI Use',
      scenario:
        'A tutor in Mbombela loses all learner test marks when her laptop is stolen. Show how Cloud storage and safe AI use fix both backup safety and lesson planning.',
      steps: [
        'Step 1 (Before — Local only): Marks saved only on the stolen laptop’s hard drive are GONE forever.',
        'Step 2 (Cloud Fix): Move learner marks into Google Sheets (Cloud) with automatic backup synced to OneDrive.',
        'Step 3 (If stolen again): Even without her laptop, she logs in on a phone and recovers every mark in 2 minutes.',
        'Step 4 (Using AI responsibly): Tutor asks Meta AI: "Make a study plan for 10 learners who failed IT"—gets a structured draft in 10 seconds, then reviews and corrects it herself before teaching.'
      ],
      finalAnswer:
        'Cloud = zero lost learner records even after theft. AI = faster study-plan drafting—as long as you always verify and refine the output.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Cloud Resilience Scenario',
        question:
          'A shop keeps all customer files only on ONE desktop PC inside the store, and then faces hardware failure plus load-shedding. Name 2 problems and 2 Cloud solutions.',
        answer:
          'Problems: 1) All customer data is permanently lost if the single PC dies; 2) Staff cannot access records remotely from home or another branch. Solutions: 1) Save files in Google Drive or OneDrive with automatic cloud sync; 2) Use Google Docs and Google Sheets so authorised team members can work safely from anywhere.'
      },
      {
        number: 2,
        label: 'Responsible AI Usage',
        question:
          'A learner copy-pastes an AI-generated answer word-for-word into an assignment, and the AI gave incorrect facts about South Africa’s POPIA law. Identify the mistake and state 2 strict rules for using AI.',
        answer:
          'Mistake: Trusting AI blindly and submitting unverified copy-pasted text. Rules: 1) Always fact-check AI answers against your official NCV textbook, teacher notes, or South African law; 2) Use AI to explain concepts and outline ideas, then write the final answer in your own words.'
      }
    ]
  },
  {
    id: 'it-l4-spec-ch9-entrepreneurship-workplace-professionalism',
    level: 4,
    chapterNumber: 9,
    chapterLabel: 'Level 4 • Chapter 9',
    displayHeading: 'Level 4 — Chapter 9: Entrepreneurship, Workplace & Professionalism',
    title: 'Entrepreneurship, Workplace & Professionalism',
    subtitle: 'Level 4 - NCV IT & Computer Science',
    sections: [
      {
        heading: 'IT Entrepreneurship & Pricing Formula in Mpumalanga',
        paragraphs: [
          'Level 4 is not only about writing code—it is about turning real IT skills into reliable income. Entrepreneurship means solving a real problem for a customer and charging fairly for it without needing R100 000 in startup money.'
        ],
        codeBlock: `Price = (Hours x Hourly Rate) + Data / Costs + Profit\nExample: (5 hrs x R200) + R300 data = R1,300 minimum`,
        bullets: [
          'Mpumalanga IT Side-Hustle Ideas: Build websites for Hazyview & Kruger lodges (R2 500 – R10 000/site), fix school laptops & reinstall Windows, manage social media for spazas/salons, or sell CV/poster templates.',
          'Never work for free "exposure": Calculate time + data + profit before quoting.',
          '3 Freelance Rules: 1) Collect a 50% deposit BEFORE starting; 2) Confirm scope, price, and due date in writing (WhatsApp or paper); 3) Deliver cleanly on the promised date.'
        ]
      },
      {
        heading: 'Workplace Professionalism, CVs & Interviews',
        paragraphs: [
          'Whether freelancing or joining an IT department, everyday workplace habits separate reliable professionals from candidates who get overlooked:'
        ],
        bullets: [
          'Punctuality & Communication: Arrive at 08:50 for a 09:00 meeting; if delayed, WhatsApp BEFORE the meeting time—not afterwards.',
          'Presentation & Respectful Messages: Clean, neat clothing beats expensive labels; start work messages with a polite greeting and close with thank you.',
          'POPIA & Confidentiality: Never share client passwords, banking logins, or company customer records.',
          'CV & Portfolio: Keep CVs to 1–2 pages highlighting practical skills first, backed by 3 real projects (1 Website, 1 Python app, 1 Database). In interviews, explain what you BUILT ("I built a lodge booking system preventing double-bookings") rather than only naming subjects.'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Entrepreneurship',
        definition:
          'Starting your own income-generating service or business by solving a real customer problem and charging a fair price.'
      },
      {
        term: 'Professionalism',
        definition:
          'Consistent, trustworthy workplace behaviour—arriving on time, communicating clearly, dressing neatly, and protecting client confidentiality.'
      },
      {
        term: 'Portfolio',
        definition:
          'A showcase collection of real working projects (websites, Python tools, databases) proving practical skill to employers and clients.'
      }
    ],
    workedExample: {
      title: 'Sipho in Mbombela — From 1 Website Skill to R4 500 in 2 Weeks',
      scenario:
        'Sipho in Mbombela knows web design (Level 4 Chapter 5). A hair salon in Nelspruit has no website and keeps losing walk-in searches. Track how he turns one skill into R4 500.',
      steps: [
        'Step 1 (Spot the customer need): Nelspruit salon has no online presence or booking link.',
        'Step 2 (Make a clear offer): "I will build a 3-page mobile-friendly website + WhatsApp booking button for R1 500, ready in 5 days."',
        'Step 3 (Written WhatsApp agreement): Confirm R1 500 total price, R750 deposit (50%) upfront, and Friday delivery deadline.',
        'Step 4 (Deliver early & earn referrals): Sipho finishes on Thursday—the thrilled salon owner pays the R750 balance and refers 2 business friends.',
        'Step 5 (Referral growth): 3 websites × R1 500 = R4 500 earned within 2 weeks.'
      ],
      finalAnswer:
        '1 skill + 1 customer + clear deposit agreement + on-time professionalism = R4 500 in 2 weeks.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: 'Freelance Pricing & Boundaries',
        question:
          'A local business asks: "Build me a website for free and I will give you exposure." What should you do, why, and how should you reply professionally?',
        answer:
          'Do not work for free—exposure does not pay rent or mobile data, and an upfront deposit protects your time. Professional reply: "Thank you for reaching out! My standard rate for a business website is R1 500, with a R750 (50%) deposit to begin and the balance upon delivery. Here is a link to my portfolio so you can see my previous work."'
      },
      {
        number: 2,
        label: 'Interview & Portfolio Preparation',
        question:
          'You hold an IT certificate, and an interviewer asks: "What can you actually build?" State 2 strong answers to give and 2 actions to take BEFORE the interview.',
        answer:
          'Say in interview: 1) "I built a Python lodge booking system that blocks double-bookings"; 2) "I built a mobile-first local shop website with a JavaScript cart and WhatsApp ordering." Do before interview: 1) Build 3 working mini-projects and save screenshots/demos on your phone or GitHub; 2) Prepare a crisp 1–2 page CV listing technical skills and finished projects first.'
      }
    ]
  },
  {
    id: 'it-l4-spec-ch10-capstone-final-exam-prep',
    level: 4,
    chapterNumber: 10,
    chapterLabel: 'Level 4 • Chapter 10',
    displayHeading: 'Level 4 — Chapter 10: Capstone Project + Final Exam Prep',
    title: 'Capstone Project + Final Exam Prep',
    subtitle: 'Level 4 - NCV IT & Computer Science',
    sections: [
      {
        heading: 'Capstone Project Ideas & Examiner Checklist',
        paragraphs: [
          'Your Capstone proves you can combine ALL Level 4 practical skills into one real working system—not just theory on paper. Pick one focused project (such as a Lodge Booking System blocking double-bookings, a Spaza/Tuckshop Sales System with OOP + Bar Chart, or a Dynamic Online Shop with Cart + WhatsApp order) and make sure it meets every item on the examiner checklist:'
        ],
        bullets: [
          '1. Relational Database: At least 2 tables connected via a Foreign Key.',
          '2. Object-Oriented Programming (OOP): At least 1 Python Class creating working Objects.',
          '3. SQL Queries: Working SELECT, INSERT, and UPDATE statements.',
          '4. Live App / Website: Working Python program or web application—not just paper diagrams.',
          '5. Data Analysis: Show Total / Average plus at least 1 clean Chart.',
          '6. Project Plan & 5-Min Presentation: Include a Week 1–4 Gantt Chart, then present in 5 clear steps: Problem -> Solution -> Live Demo -> Data Summary -> Q&A.'
        ]
      },
      {
        heading: 'Final Exam Prep — Top 5 Exam Topics & Technique',
        paragraphs: [
          'Roughly 80% of NCV Level 4 IT exam marks come directly from these five high-priority areas:'
        ],
        bullets: [
          '1. SQL: Writing SELECT ... WHERE ... queries (e.g. SELECT Name FROM Learners WHERE Mark >= 50;).',
          '2. OOP: Explaining Class vs Object and tracing Python class code cleanly.',
          '3. Database Design: Drawing 2 normalized tables with Primary Key (PK) + Foreign Key (FK) and explaining Normalization.',
          '4. E-Commerce & Web: Comparing Static vs Dynamic sites and naming South African payment gateways (PayFast, Yoco, SnapScan, EFT).',
          '5. Professionalism & POPIA: Applying POPIA privacy rules, freelance pricing formulas, and client communication.',
          'Exam Technique: Read every question TWICE and underline keywords ("Explain", "List 2", "Write SQL"); match bullet count to marks; write the logic in plain English if code slips for part marks; pace at 1 mark = 1 minute (50-mark paper = 50 minutes).'
        ]
      }
    ],
    keyTerms: [
      {
        term: 'Capstone',
        definition:
          'Your final end-of-level project uniting databases, OOP programming, web/UI skills, data analysis, and planning into one working system.'
      },
      {
        term: 'Gantt Chart',
        definition:
          'A project timeline showing weekly/daily tasks, responsibilities, and delivery deadlines.'
      },
      {
        term: 'Portfolio',
        definition:
          'Your Capstone plus 2 other completed projects saved to show employers and clients—this is what wins real IT jobs.'
      }
    ],
    workedExample: {
      title: 'Capstone Walkthrough — Lodge Booking System (Tables + OOP + SQL + Analysis)',
      scenario:
        'Walk through a complete passing Capstone project for a South African lodge booking system combining relational tables, a Python OOP Class, SQL queries, and data reporting.',
      codeBlock: `# 1. Tables: Guests (GuestID PK, Name, Phone) + Bookings (BookingID PK, GuestID FK, Date, Amount)\n\n# 2. OOP Class\nclass Booking:\n    def __init__(self, guest, date, amount):\n        self.guest = guest\n        self.date = date\n        self.amount = amount\n\n# 3. SQL\nINSERT INTO Bookings VALUES (1, 1, '2026-11-20', 1500);\nSELECT SUM(Amount) FROM Bookings;   -- Total = R1,500`,
      steps: [
        'Step 1 (Relational Tables): Link Guests (GuestID PK, Name, Phone) to Bookings (BookingID PK, GuestID FK, Date, Amount).',
        'Step 2 (OOP Class): Define class Booking storing guest, date, and Rand amount per booking object.',
        'Step 3 (SQL Storage & Summary): Run INSERT INTO Bookings to save the R1 500 booking and SELECT SUM(Amount) FROM Bookings to total R1 500.',
        'Step 4 (Data Analysis & Chart): Total = R1 500, Average = R1 500, plotted on a Bar Chart of weekly bookings.',
        'Step 5 (5-Minute Presentation): Demonstrate adding a booking, prove duplicate bookings are blocked, and show the revenue total.'
      ],
      finalAnswer:
        'One unified project demonstrates Database + OOP + SQL + Data Analysis + Project Management—delivering both an NCV exam PASS and a job-ready portfolio piece.'
    },
    practiceQuestions: [
      {
        number: 1,
        label: '4-Line Exam System Design',
        question:
          'Exam Question: "A lodge double-books rooms on paper. Design a system." Write a complete high-mark answer in 4 clear lines covering Tables, Feature, Test, and Report.',
        answer:
          '1) Tables: Guests (GuestID PK) + Bookings (BookingID PK, GuestID FK). 2) Feature: System checks room + date before saving and displays "Already booked" if taken. 3) Test: Attempt booking the same room twice on the same date—the second attempt must be blocked. 4) Report: Display Total + Average booking revenue.'
      },
      {
        number: 2,
        label: '2-Week Rescue Gantt Plan',
        question:
          'You have only 2 weeks left before submission and have not started your Capstone yet. Create a realistic 2-week Gantt plan.',
        answer:
          'Week 1: Days 1–2 Systems Analysis + Design Tables/Flowchart; Days 3–5 Build working Python app or Website. Week 2: Days 1–2 Test with valid/invalid inputs and fix bugs; Days 3–4 Add Total/Average + Chart + Report; Day 5 Practise 5-minute presentation and back up everything on Google Drive.'
      }
    ]
  }
];
