/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NEXOVIAN TEXTBOOKS LIBRARY DATA (/textbooks)
 * 100% ENGLISH ONLY • 100% FREE • 100% Nexovian Original • Read Online Only.
 * (Chapter translations only live inside individual textbook pages.)
 */

export interface TextbookCatalogItem {
  id: string;
  order: number;
  status: 'LIVE' | 'IN_PROGRESS' | 'COMING_SOON';
  statusBadge?: string;
  ctaLabel?: string;
  subjectEn: string;
  levelBadge: string;
  chaptersCount: number;
  description: string;
  href?: string;
  targetTab?:
    | 'ncvOfficeAdminTextbook'
    | 'electricalTextbook'
    | 'ncvTourismTextbook'
    | 'ncvItTextbook';
  initialVotes: number;
}

export const TEXTBOOKS_CATALOG: TextbookCatalogItem[] = [
  {
    id: 'ncv-office-administration',
    order: 1,
    status: 'LIVE',
    subjectEn: 'NCV Office Administration',
    levelBadge: 'Level 2, 3, 4',
    chaptersCount: 10,
    href: '/textbooks/ncv-office-administration-textbook',
    targetTab: 'ncvOfficeAdminTextbook',
    initialVotes: 512,
    description:
      'Office Data Processing, Business Practice, Office Practice & New Venture Creation with worked examples and practice questions.'
  },
  {
    id: 'electrical-trade-theory',
    order: 2,
    status: 'LIVE',
    subjectEn: 'Electrical Trade Theory',
    levelBadge: 'N1, N2, N3',
    chaptersCount: 12,
    href: '/textbooks/electrical-trade-theory-textbook',
    targetTab: 'electricalTextbook',
    initialVotes: 384,
    description:
      "AC/DC Circuits, Transformers, Electrical Machines, Switchgear, Earthing and Ohm's Law calculations."
  },
  {
    id: 'ncv-tourism',
    order: 3,
    status: 'LIVE',
    subjectEn: 'NCV Tourism',
    levelBadge: 'Level 2, 3, 4',
    chaptersCount: 9,
    href: '/textbooks/ncv-tourism-textbook',
    targetTab: 'ncvTourismTextbook',
    initialVotes: 279,
    description:
      'Tourism operations, SA geography, customer care, sustainable tourism, 7Ps marketing, tour costing & entrepreneurship.'
  },
  {
    id: 'ncv-it-computer-science',
    order: 4,
    status: 'IN_PROGRESS',
    statusBadge: 'IN PROGRESS - 7/10 LIVE',
    ctaLabel: 'Read Chapters 1-7 FREE',
    subjectEn: 'NCV Information Technology & Computer Science',
    levelBadge: 'Level 2, 3, 4',
    chaptersCount: 10,
    href: '/textbooks/ncv-it-computer-science-textbook',
    targetTab: 'ncvItTextbook',
    initialVotes: 341,
    description:
      'Programming logic, computer hardware, systems development, networking and data security.'
  },
  {
    id: 'ncv-finance-economics-accounting',
    order: 5,
    status: 'COMING_SOON',
    subjectEn: 'NCV Finance, Economics & Accounting',
    levelBadge: 'Level 2, 3, 4',
    chaptersCount: 10,
    initialVotes: 312,
    description:
      'Journals, General Ledger, Financial Statements, 15% VAT and practical economics.'
  },
  {
    id: 'ncv-marketing',
    order: 6,
    status: 'COMING_SOON',
    subjectEn: 'NCV Marketing',
    levelBadge: 'Level 2, 3, 4',
    chaptersCount: 9,
    initialVotes: 204,
    description:
      'Market research, 4Ps Marketing Mix, branding, advertising and consumer behaviour.'
  },
  {
    id: 'ncv-hospitality',
    order: 7,
    status: 'COMING_SOON',
    subjectEn: 'NCV Hospitality',
    levelBadge: 'Level 2, 3, 4',
    chaptersCount: 9,
    initialVotes: 193,
    description:
      'Food preparation, kitchen hygiene, guest service and accommodation operations.'
  },
  {
    id: 'ncv-civil-engineering',
    order: 8,
    status: 'COMING_SOON',
    subjectEn: 'NCV Civil Engineering & Building Construction',
    levelBadge: 'Level 2, 3, 4',
    chaptersCount: 9,
    initialVotes: 221,
    description:
      'Construction materials, building plans, setting out, brickwork and site safety.'
  },
  {
    id: 'ncv-engineering-related-design',
    order: 9,
    status: 'COMING_SOON',
    subjectEn: 'NCV Engineering & Related Design',
    levelBadge: 'Level 2, 3, 4',
    chaptersCount: 10,
    initialVotes: 256,
    description:
      'Engineering graphics & CAD, fitting & turning, welding fundamentals and workshop safety.'
  },
  {
    id: 'ncv-safety-in-society',
    order: 10,
    status: 'COMING_SOON',
    subjectEn: 'NCV Safety in Society',
    levelBadge: 'Level 2, 3, 4',
    chaptersCount: 9,
    initialVotes: 187,
    description:
      'South African Constitutional rights, policing principles, crime prevention and community safety.'
  }
];
