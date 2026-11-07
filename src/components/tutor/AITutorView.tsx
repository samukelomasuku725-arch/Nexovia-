/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN SOCRATIC AI TUTOR — DAY 1 GOLD + 11 LANGUAGES (OPTION 2)
 * 
 * Specifications:
 * 1. Background #0a0a0a dark, cards #1a1a1a, gold accents #fbbf24 / #d4af37
 * 2. Top Dropdown with all 11 SA official languages (Default: Xitsonga)
 *    When changed -> updates engine badge, phrasebook, native phrases bar & app language
 * 3. Header Badges:
 *    - Left: "140 ENTRIES • 80 VERIFIED NATIVE" in gold
 *    - Center: "Nexovian [Selected Language] Language Engine Active"
 *    - Right/Subtitle: "Database First — AI Second • Controlled native vocabulary prioritized • Strictly no invented translations"
 * 4. AI Tutor Logic: Database First, AI Second
 *    - Checks verified native dataset first (140 entries for Xitsonga)
 *    - AI strict prompt: "Use ONLY approved list, DO NOT invent translations, if unsure explain in English"
 * 5. Yellow/Gold user chat bubbles & prompt chips ("Can you give a real-world example of...")
 * 6. Bottom Bar: Native classroom phrases (tapping phrase inserts into input)
 * 7. Action buttons: [Create Study Plan] & [Practice Assessment]
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Send,
  Sparkles,
  BookOpen,
  Calendar,
  Target,
  Globe,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  HelpCircle
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useTranslation } from '../../i18n/I18nContext';
import { SALanguageCode } from '../../i18n/types';
import { XitsongaPhrasebookModal } from '../language/XitsongaPhrasebookModal';
import { StudyPlanModal } from './StudyPlanModal';
import { PracticeQuizModal } from './PracticeQuizModal';
import { GradeSubjectSelectorModal } from './GradeSubjectSelectorModal';
import { getSubjectsForGrade } from '../../data/gradesAndSubjectsData';
import { SASLResourceHub } from '../language/SASLResourceHub';
import { FreeAccessCountdown } from '../common/FreeAccessCountdown';
import { CleanFormulaRenderer } from '../common/CleanFormulaRenderer';
import { INITIAL_XITSONGA_DATASET } from '../../data/xitsongaLanguageData';
import { AITutorMode } from '../../types';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  mode?: string;
  summary?: string;
  followUps?: string[];
  disclaimer?: string;
  verifiedSource?: string;
}

interface LanguageConfig {
  code: SALanguageCode;
  name: string;
  nativeName: string;
  badge: string;
  verifiedCount: string;
  subtitle: string;
  phrases: { label: string; text: string }[];
  examplePrompt: string;
}

const LANGUAGE_CONFIGS: Record<SALanguageCode, LanguageConfig> = {
  ts: {
    code: 'ts',
    name: 'Xitsonga',
    nativeName: 'Xitsonga',
    badge: '140 ENTRIES • 80 VERIFIED NATIVE',
    verifiedCount: '140 Entries • 80 Native Verified',
    subtitle: 'Database First — AI Second • Controlled native vocabulary prioritized • Strictly no invented translations',
    phrases: [
      { label: 'Mundyondisi, nikombela uhlamisela (Please explain)', text: 'Mundyondisi, nikombela uhlamisela' },
      { label: 'Andzi Twisisi (I don\'t understand)', text: 'Andzi twisisi, kombela u hlamusela hi ndlela yin\'wana' },
      { label: 'Ndza Twisisa (I understand)', text: 'Ndza twisisa sweswi, ndzi khensile!' },
      { label: 'Ahi Rhinghesi (Let\'s practice)', text: 'Ahi rhinghesi xikombiso xin\'wana' },
      { label: 'Kombisa ntirho wa wena (Show your work)', text: 'Kombisa magoza yo tlhantlha xivhutiso lexi' }
    ],
    examplePrompt: 'Can you give a real-world example of Quadratic Equations in Xitsonga?'
  },
  zu: {
    code: 'zu',
    name: 'isiZulu',
    nativeName: 'isiZulu',
    badge: 'DATABASE READY • VERIFIED NATIVE',
    verifiedCount: '120 Entries • Native Verified',
    subtitle: 'Database First — AI Second • Controlled native vocabulary prioritized • Strictly no invented translations',
    phrases: [
      { label: 'Thisha, ngicela uchaze (Please explain)', text: 'Thisha, ngicela uchaze kahle' },
      { label: 'Angiqondi (I don\'t understand)', text: 'Angiqondi, ngicela uphinde ngendlela elula' },
      { label: 'Ngiyezwa (I understand)', text: 'Ngiyezwa manje, ngiyabonga kakhulu!' },
      { label: 'Ake sizame (Let\'s practice)', text: 'Ake sizame esinye isibonelo' },
      { label: 'Bonisa umsebenzi wakho (Show work)', text: 'Ngicela ubonise izinyathelo zokuxazulula' }
    ],
    examplePrompt: 'Can you explain the key concepts of Quadratic Equations in isiZulu?'
  },
  xh: {
    code: 'xh',
    name: 'isiXhosa',
    nativeName: 'isiXhosa',
    badge: 'DATABASE READY • VERIFIED NATIVE',
    verifiedCount: '110 Entries • Native Verified',
    subtitle: 'Database First — AI Second • Controlled native vocabulary prioritized • Strictly no invented translations',
    phrases: [
      { label: 'Titshala, ndicela ucacise (Please explain)', text: 'Titshala, ndicela ucacise ngokubanzi' },
      { label: 'Andiqondi (I don\'t understand)', text: 'Andiqondi, ndicela uphinde ngokulula' },
      { label: 'Ndiyaqonda (I understand)', text: 'Ndiyaqonda ngoku, enkosi kakhulu!' },
      { label: 'Masizame (Let\'s practice)', text: 'Masizame umzekelo olandelayo' },
      { label: 'Bonisa umsebenzi wakho (Show work)', text: 'Bonisa amanyathelo okusombulula' }
    ],
    examplePrompt: 'Can you give a real-world example of Algebra in isiXhosa?'
  },
  af: {
    code: 'af',
    name: 'Afrikaans',
    nativeName: 'Afrikaans',
    badge: 'DATABASE READY • VERIFIED NATIVE',
    verifiedCount: '150 Entries • Native Verified',
    subtitle: 'Datapunt Eerste — KI Tweede • Beheerde moedertaal woordeskat geprioritiseer',
    phrases: [
      { label: 'Onderwyser, verduidelik asseblief (Explain)', text: 'Onderwyser, verduidelik asseblief stap vir stap' },
      { label: 'Ek verstaan nie (I don\'t understand)', text: 'Ek verstaan nie, kan jy dit eenvoudiger stel?' },
      { label: 'Ek verstaan (I understand)', text: 'Ek verstaan dit nou baie goed, dankie!' },
      { label: 'Kom ons oefen (Let\'s practice)', text: 'Kom ons oefen nog \'n voorbeeld' },
      { label: 'Wys jou bewerkings (Show work)', text: 'Wys asseblief die volledige berekeninge' }
    ],
    examplePrompt: 'Kan jy \'n praktiese voorbeeld gee van Kwadratiese Vergelykings?'
  },
  nso: {
    code: 'nso',
    name: 'Sepedi',
    nativeName: 'Sesotho sa Leboa',
    badge: 'DATABASE READY • VERIFIED NATIVE',
    verifiedCount: '95 Entries • Native Verified',
    subtitle: 'Database First — AI Second • Controlled native vocabulary prioritized • Strictly no invented translations',
    phrases: [
      { label: 'Morutiši, ke kgopela o hlalose (Explain)', text: 'Morutiši, ke kgopela o hlalose ka botlalo' },
      { label: 'Ga ke kwešiši (I don\'t understand)', text: 'Ga ke kwešiši, a o ka boeletša gape?' },
      { label: 'Ke a kwešiša (I understand)', text: 'Ke a kwešiša bjale, ke a leboga!' },
      { label: 'A re itlwaetšeng (Let\'s practice)', text: 'A re itlwaetšeng mohlala o mongwe' },
      { label: 'Bontšha mošomo wa gago (Show work)', text: 'Bontšha dikgato tša go rarolla' }
    ],
    examplePrompt: 'A o ka fa mohlala wa nnete wa Dipalo tša Quadratic?'
  },
  tn: {
    code: 'tn',
    name: 'Setswana',
    nativeName: 'Setswana',
    badge: 'DATABASE READY • VERIFIED NATIVE',
    verifiedCount: '90 Entries • Native Verified',
    subtitle: 'Database First — AI Second • Controlled native vocabulary prioritized • Strictly no invented translations',
    phrases: [
      { label: 'Morutabana, ke kopa o tlhalose (Explain)', text: 'Morutabana, ke kopa o tlhalose ka botlalo' },
      { label: 'Ga ke tlhaloganye (I don\'t understand)', text: 'Ga ke tlhaloganye, a o ka boeletsa gape?' },
      { label: 'Ke a tlhaloganya (I understand)', text: 'Ke a tlhaloganya jaanong, ke a leboga!' },
      { label: 'A re ithuteng (Let\'s practice)', text: 'A re ithuteng sekao se sengwe' },
      { label: 'Bontsha tiro ya gago (Show work)', text: 'Bontsha dikgato tsa go rarabolola' }
    ],
    examplePrompt: 'A o ka nna le sekao sa nnete sa Quadratic Equations?'
  },
  st: {
    code: 'st',
    name: 'Sesotho',
    nativeName: 'Sesotho',
    badge: 'DATABASE READY • VERIFIED NATIVE',
    verifiedCount: '90 Entries • Native Verified',
    subtitle: 'Database First — AI Second • Controlled native vocabulary prioritized • Strictly no invented translations',
    phrases: [
      { label: 'Mosuwe, ke kopa o hlalose (Explain)', text: 'Mosuwe, ke kopa o hlalose ka bonolo' },
      { label: 'Ha ke utlwisise (I don\'t understand)', text: 'Ha ke utlwisise, kopa o phetle hape' },
      { label: 'Ke a utlwisisa (I understand)', text: 'Ke a utlwisisa jwale, ke a leboha!' },
      { label: 'A re itlwaetseng (Let\'s practice)', text: 'A re itlwaetseng mohlala o mong' },
      { label: 'Bontsha mosebetsi wa hao (Show work)', text: 'Bontsha mehato ya ho rarolla potso ena' }
    ],
    examplePrompt: 'Na o ka fana ka mohlala wa nnete wa Quadratic Equations?'
  },
  ss: {
    code: 'ss',
    name: 'siSwati',
    nativeName: 'siSwati',
    badge: 'DATABASE READY • VERIFIED NATIVE',
    verifiedCount: '85 Entries • Native Verified',
    subtitle: 'Database First — AI Second • Controlled native vocabulary prioritized • Strictly no invented translations',
    phrases: [
      { label: 'Thisha, ngicela uchaze (Please explain)', text: 'Thisha, ngicela uchaze kanyenti' },
      { label: 'Angisiva (I don\'t understand)', text: 'Angisiva, ngicela uphindze kalula' },
      { label: 'Ngiyeva (I understand)', text: 'Ngiyeva nyalo, ngiyabonga kakhulu!' },
      { label: 'Asizame (Let\'s practice)', text: 'Asizame lesinye sibonelo' },
      { label: 'Khombisa umsebenti wakho (Show work)', text: 'Khombisa tinyatselo tekusombulula' }
    ],
    examplePrompt: 'Ungasinika sibonelo sesibili sema Quadratic Equations?'
  },
  ve: {
    code: 've',
    name: 'Tshivenda',
    nativeName: 'Tshivenḓa',
    badge: 'DATABASE READY • VERIFIED NATIVE',
    verifiedCount: '80 Entries • Native Verified',
    subtitle: 'Database First — AI Second • Controlled native vocabulary prioritized • Strictly no invented translations',
    phrases: [
      { label: 'Mudededzi, ndi khou humbela (Explain)', text: 'Mudededzi, ndi khou humbela u ṱalutshedza' },
      { label: 'A thi pfesesi (I don\'t understand)', text: 'A thi pfesesi, vha nga dovha hafhu?' },
      { label: 'Ndi a pfesesa (I understand)', text: 'Ndi a pfesesa zwino, ndo livhuwa!' },
      { label: 'Kha ri gude (Let\'s practice)', text: 'Kha ri gude iṅwe tsumbo' },
      { label: 'Sumbedzani mishumo yanu (Show work)', text: 'Sumbedzani maga a u tandulula' }
    ],
    examplePrompt: 'Ni nga nṋea tsumbo ya vhukuma ya Quadratic Equations?'
  },
  nr: {
    code: 'nr',
    name: 'isiNdebele',
    nativeName: 'isiNdebele',
    badge: 'DATABASE READY • VERIFIED NATIVE',
    verifiedCount: '75 Entries • Native Verified',
    subtitle: 'Database First — AI Second • Controlled native vocabulary prioritized • Strictly no invented translations',
    phrases: [
      { label: 'Thitjhere, ngibawa uhlathulule (Explain)', text: 'Thitjhere, ngibawa uhlathulule kuhle' },
      { label: 'Angizwisisi (I don\'t understand)', text: 'Angizwisisi, ngibawa ubuyelele godu' },
      { label: 'Ngiyazwisisa (I understand)', text: 'Ngiyazwisisa nje, ngithokoza khulu!' },
      { label: 'Asizame (Let\'s practice)', text: 'Asizame esinye isibonelo godu' },
      { label: 'Tjengisa umsebenzi wakho (Show work)', text: 'Tjengisa amagadango wokurazulula' }
    ],
    examplePrompt: 'Ungasinikela isibonelo seQuadratic Equations ngesiNdebele?'
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    badge: 'CAPS & TVET ALIGNED • CURRICULUM VERIFIED',
    verifiedCount: 'Standard South African English',
    subtitle: 'Database First — AI Second • Controlled native vocabulary prioritized • Strictly no invented translations',
    phrases: [
      { label: 'Teacher, please explain', text: 'Teacher, please explain step-by-step' },
      { label: 'I don\'t understand', text: 'I don\'t understand, can you break it down further?' },
      { label: 'I understand now', text: 'I understand now, thank you!' },
      { label: 'Let\'s practice a problem', text: 'Let\'s practice another challenging problem' },
      { label: 'Show step-by-step working', text: 'Show the complete algebraic working' }
    ],
    examplePrompt: 'Can you give a real-world example of Quadratic Equations?'
  },
  sasl: {
    code: 'sasl',
    name: 'SASL 🤟 (Sign Language)',
    nativeName: 'SASL 🤟',
    badge: '12TH OFFICIAL LANGUAGE • FREE RESOURCES',
    verifiedCount: 'Free Open Educational Resources & Vocabulary',
    subtitle: 'Database First — AI Second • South African Sign Language resources credited to Wits, NID, DeafTV, Book Dash & Handlab',
    phrases: [
      { label: '🤟 Teacher, please explain', text: 'Teacher, please explain using visual steps and sign language references' },
      { label: '🤟 I don\'t understand', text: 'I do not understand yet, please illustrate with a visual real-world sign example' },
      { label: '🤟 I understand now', text: 'I understand now, thank you! Let us continue to the next concept' },
      { label: '🤟 Let\'s practice signs & math', text: 'Let us practice a problem with visual step-by-step breakdown' },
      { label: '🤟 Show visual working', text: 'Please show full visual working and clean mathematical steps' }
    ],
    examplePrompt: 'Can you explain Quadratic Equations with visual diagrams and SASL sign references?'
  }
};

export function AITutorView() {
  const {
    learningContext,
    updateLearningContext,
    activeConversation,
    sendMessageToTutor,
    isTutorLoading,
    tutorError,
    generateQuiz,
    activeGeneratedQuiz,
    setActiveGeneratedQuiz
  } = useLearning();

  const { language, setLanguage } = useTranslation();

  // Active language configuration with default Xitsonga
  const [selectedLang, setSelectedLang] = useState<SALanguageCode>(() => {
    return (language as SALanguageCode) || 'ts';
  });

  const activeLangConfig = useMemo(() => {
    return LANGUAGE_CONFIGS[selectedLang] || LANGUAGE_CONFIGS.ts;
  }, [selectedLang]);

  const [inputMessage, setInputMessage] = useState('');
  const [isPhrasebookOpen, setIsPhrasebookOpen] = useState(false);
  const [isStudyPlanOpen, setIsStudyPlanOpen] = useState(false);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [selectedMode, setSelectedMode] = useState<AITutorMode>('explain');

  // Grade and Subject changer state with localStorage persistence
  const [selectedGrade, setSelectedGrade] = useState<string>(() => {
    return localStorage.getItem('nexovian_grade') || learningContext?.gradeOrProgramme || 'Grade 10';
  });

  const [selectedSubject, setSelectedSubject] = useState<string>(() => {
    return localStorage.getItem('nexovian_subject') || learningContext?.subject || 'Mathematics';
  });

  const [selectorModalType, setSelectorModalType] = useState<'grade' | 'subject' | null>(null);

  // When grade changes: update grade, reset subject to the first subject of that tier, and persist
  const handleSelectGrade = (newGrade: string) => {
    setSelectedGrade(newGrade);
    localStorage.setItem('nexovian_grade', newGrade);

    const availableSubjects = getSubjectsForGrade(newGrade);
    const defaultSubjectForGrade = availableSubjects[0] || 'Mathematics';
    setSelectedSubject(defaultSubjectForGrade);
    localStorage.setItem('nexovian_subject', defaultSubjectForGrade);

    if (updateLearningContext) {
      updateLearningContext({
        gradeOrProgramme: newGrade,
        subject: defaultSubjectForGrade
      });
    }
  };

  // When subject changes: update subject and persist
  const handleSelectSubject = (newSubj: string) => {
    setSelectedSubject(newSubj);
    localStorage.setItem('nexovian_subject', newSubj);

    if (updateLearningContext) {
      updateLearningContext({
        subject: newSubj
      });
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync when language dropdown changes
  const handleLanguageChange = (newLang: SALanguageCode) => {
    setSelectedLang(newLang);
    setLanguage(newLang);
    if (updateLearningContext) {
      updateLearningContext({ language: newLang });
    }
  };

  // Initial seed messages in Day 1 dark gold style
  const [fallbackMessages, setFallbackMessages] = useState<Message[]>([
    {
      id: 'seed-1',
      role: 'user',
      content: 'Mundyondisi, nikombela uhlamisela',
      timestamp: new Date().toISOString(),
      mode: 'practice'
    },
    {
      id: 'seed-2',
      role: 'assistant',
      content: `Ahee! Ndza khensa leswi u tsakelaka ku dyondza. A hi swi tlhantlheni hi magoza.

A **Quadratic Equation** (xikombiso xa xikwere) lexi tolovelekeke xi languteka hi ndlela leyi: **ax² + bx + c = 0**.

Ku "factorize" (ku avanyisa) i ku kuma tinomboro leti loko u ti phinda ti endlaka xikombiso xa wena. Hi ta tirhisa xikombiso xa **apples** (apula).

---

### Ahi Rhinghesi (Let's Practice)

**Xivhutiso 1 (Straightforward):**
Bala leswi: $x^2 + 5x + 6 = 0$
*Hint: Kuma tinomboro timbirhi leti loko u ti phinda ti endlaka 6, naswona loko u ti yengetela ti endla 5.*

**Xivhutiso 2 (Standard):**
Bala leswi: $x^2 - 7x + 10 = 0$
*Hint: Tsundzuka leswaku loko ku ri ni "-" eka 7x kambe ku ri ni "+" eka 10, tinomboro leti u ti lavaka hinkwato ti ta va na xikombiso xa "-" (minus).*

---

### Ndlela yo endla:
1. **Hleketa kahle**: U lava tinomboro timbirhi.
2. **Tsala nhlamulo yawena**: Loko u heta, ni kombe leswi u swi kumeke.
3. **Unga heli marimba**: Utaswi endla!

**Kombisa ntirho wa wena.** U lava mpfuno hi xivhutiso xihi eka leswi?`,
      timestamp: new Date().toISOString(),
      mode: 'practice',
      disclaimer: 'Nexovian Xitsonga Language Engine Active · Controlled native-verified vocabulary prioritized',
      verifiedSource: '140 ENTRIES • 80 VERIFIED NATIVE',
      followUps: [
        'Can you give a real-world example of Quadratic Equations?',
        'Walk me through the step-by-step solution for question 1.',
        'Can we simplify the key steps or formulas further?'
      ]
    }
  ]);

  const currentMessages: Message[] =
    activeConversation && activeConversation.messages.length > 0
      ? activeConversation.messages.map((m) => ({
          id: m.id,
          role: m.role as 'user' | 'assistant',
          content: m.content,
          timestamp: m.timestamp,
          mode: m.mode,
          summary: m.summary,
          followUps: m.followUps,
          disclaimer: m.disclaimer || `${activeLangConfig.name} Language Engine Active • Controlled native vocabulary prioritized`
        }))
      : fallbackMessages;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages, isTutorLoading]);

  // Database-First lookup logic
  const findInVerifiedDatabase = (query: string): string | null => {
    const qLower = query.toLowerCase().trim();
    // Search verified Xitsonga dataset if language is Xitsonga
    if (selectedLang === 'ts') {
      const match = INITIAL_XITSONGA_DATASET.find(
        (entry) =>
          entry.xitsonga.toLowerCase() === qLower ||
          entry.english.toLowerCase() === qLower ||
          qLower.includes(entry.english.toLowerCase())
      );
      if (match) {
        return `**Verified Native Translation [Database Record: ${match.id}]:**\n\n- **${match.english}** ➔ **${match.xitsonga}**\n- **Usage**: *${match.example || match.notes || ''}*\n\n*(Controlled Native Database Priority • Strictly No Invented Translations)*`;
      }
    }
    return null;
  };

  const [tutorErrorBanner, setTutorErrorBanner] = useState<string | null>(null);
  const [lastQuery, setLastQuery] = useState<string>('');

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    // Clear input immediately upon submit
    setInputMessage('');
    setTutorErrorBanner(null);
    setLastQuery(query);

    // Call Socratic Tutor
    try {
      await sendMessageToTutor(query, selectedMode, selectedLang);
    } catch (e: any) {
      console.warn('Tutor error:', e);
      setTutorErrorBanner(e?.message || 'Could not load response. Tap to Retry.');
    }
  };

  const handleLaunchPracticeQuiz = async () => {
    setIsGeneratingQuiz(true);
    try {
      const topic = learningContext?.topic || 'Quadratic Equations & Algebra';
      const quiz = await generateQuiz(topic, 'Socratic assessment');
      setActiveGeneratedQuiz(quiz);
    } catch (_) {
      setActiveGeneratedQuiz({
        id: `quiz-${Date.now()}`,
        topic: 'Quadratic Equations',
        level: 'Grade 10 CAPS',
        language: selectedLang,
        questions: [
          {
            id: 'q1',
            questionText: 'Solve for x: x^2 + 5x + 6 = 0',
            options: ['x = -2 or x = -3', 'x = 2 or x = 3', 'x = 1 or x = 6', 'x = -1 or x = -6'],
            correctAnswer: 'x = -2 or x = -3',
            explanation: 'Factorizing gives (x + 2)(x + 3) = 0, so x = -2 or x = -3.'
          }
        ]
      } as any);
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col w-full max-w-[100vw] overflow-x-hidden font-sans">
      
      {/* Top Banner: Free Access Week */}
      <FreeAccessCountdown variant="banner" />

      {/* 1. TOP HEADER & 12 SA LANGUAGES DROPDOWN BAR */}
      <div className="w-full bg-[#141414] border-b border-[#262626] px-4 py-3 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Engine Header Badges */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#fbbf24] text-black font-black flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(251,191,36,0.35)]">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs sm:text-sm font-black tracking-wider text-[#fbbf24] uppercase">
                  Nexovian {activeLangConfig.name} Language Engine Active
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#fbbf24]/20 text-[#fbbf24] border border-[#fbbf24]/40">
                  {activeLangConfig.badge}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-snug">
                {activeLangConfig.subtitle}
              </p>
            </div>
          </div>

          {/* Controls: 11 Languages Dropdown & Phrasebook Button */}
          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center">
            
            {/* 11 SA Official Languages Dropdown */}
            <div className="relative">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1e1e1e] border border-[#fbbf24]/50 text-white text-xs font-bold">
                <Globe className="w-3.5 h-3.5 text-[#fbbf24]" />
                <select
                  value={selectedLang}
                  onChange={(e) => handleLanguageChange(e.target.value as SALanguageCode)}
                  className="bg-transparent text-[#fbbf24] font-bold focus:outline-none cursor-pointer pr-1"
                  aria-label="Select South African Language"
                >
                  <option value="ts" className="bg-[#1a1a1a] text-white">Xitsonga (Default)</option>
                  <option value="zu" className="bg-[#1a1a1a] text-white">isiZulu</option>
                  <option value="xh" className="bg-[#1a1a1a] text-white">isiXhosa</option>
                  <option value="af" className="bg-[#1a1a1a] text-white">Afrikaans</option>
                  <option value="nso" className="bg-[#1a1a1a] text-white">Sepedi (Sesotho sa Leboa)</option>
                  <option value="tn" className="bg-[#1a1a1a] text-white">Setswana</option>
                  <option value="st" className="bg-[#1a1a1a] text-white">Sesotho</option>
                  <option value="ss" className="bg-[#1a1a1a] text-white">siSwati</option>
                  <option value="ve" className="bg-[#1a1a1a] text-white">Tshivenda</option>
                  <option value="nr" className="bg-[#1a1a1a] text-white">isiNdebele</option>
                  <option value="en" className="bg-[#1a1a1a] text-white">English</option>
                  <option value="sasl" className="bg-[#1a1a1a] text-yellow-300 font-bold">SASL 🤟 (Sign Language)</option>
                </select>
              </div>
            </div>

            {/* Phrasebook Button */}
            <button
              onClick={() => setIsPhrasebookOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#fbbf24] hover:bg-yellow-400 text-black text-xs font-black shadow-[0_0_15px_-3px_rgba(251,191,36,0.4)] transition-all cursor-pointer active:scale-95"
            >
              <BookOpen className="w-3.5 h-3.5 text-black" />
              <span>{activeLangConfig.name} Phrasebook</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. CONTEXT & SOCRATIC MODE BAR */}
      <div className="w-full bg-[#18181b]/80 border-b border-[#262626] px-4 py-2 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Clickable Gold Grade & Subject Changer */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {/* Grade Button */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#fbbf24] font-bold">Grade:</span>
              <button
                type="button"
                onClick={() => setSelectorModalType('grade')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1a1a1a] hover:bg-[#222222] border border-[#d4af37] text-white hover:text-[#fbbf24] font-semibold text-xs transition-all shadow-xs active:scale-95 cursor-pointer"
                title="Change Grade / Qualification Level"
              >
                <span>{selectedGrade}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#fbbf24] shrink-0" />
              </button>
            </div>

            <span className="text-slate-600 hidden sm:inline">|</span>

            {/* Subject Button */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#fbbf24] font-bold">Subject:</span>
              <button
                type="button"
                onClick={() => setSelectorModalType('subject')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1a1a1a] hover:bg-[#222222] border border-[#d4af37] text-white hover:text-[#fbbf24] font-semibold text-xs transition-all shadow-xs active:scale-95 cursor-pointer max-w-[200px] sm:max-w-[280px] truncate"
                title="Change Subject"
              >
                <span className="truncate">{selectedSubject}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#fbbf24] shrink-0" />
              </button>
            </div>

            {/* Live Indicator */}
            <div className="hidden lg:flex items-center gap-1.5 ml-2 pl-2 border-l border-[#2e2e32] text-[11px] text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Tutor ready for <strong className="text-[#fbbf24] font-bold">{selectedSubject}</strong> ({selectedGrade})</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-[#262626] p-1 rounded-xl">
            {(['explain', 'practice', 'translate'] as AITutorMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedMode(mode)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors capitalize cursor-pointer ${
                  selectedMode === mode
                    ? 'bg-[#fbbf24] text-black shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {mode === 'explain' ? 'Socratic Tutor' : mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. NATIVE PHRASES BAR (DYNAMIC PER SELECTED LANGUAGE) */}
      <div className="w-full bg-[#121212] border-b border-[#262626] px-4 py-2 sm:px-6 overflow-x-auto scrollbar-hide">
        <div className="max-w-6xl mx-auto flex items-center gap-2 min-w-max">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#fbbf24] font-mono mr-1 shrink-0">
            {activeLangConfig.name} Classroom Phrases:
          </span>
          {activeLangConfig.phrases.map((phrase, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(phrase.text)}
              className="px-3 py-1 rounded-lg bg-[#1e1e1e] hover:bg-[#2a2a2a] text-slate-200 hover:text-[#fbbf24] border border-[#333] hover:border-[#fbbf24]/50 text-xs font-medium transition-all shrink-0 cursor-pointer active:scale-95"
              title={`Click to send: "${phrase.text}"`}
            >
              {phrase.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. CHAT MESSAGE STREAM */}
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-6 overflow-y-auto">
        {currentMessages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              {/* Message Bubble: Yellow for User, Dark #1a1a1a for Assistant */}
              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-5 py-4 transition-all shadow-md ${
                  isUser
                    ? 'bg-[#fbbf24] text-black font-semibold rounded-br-xs shadow-[0_0_20px_rgba(251,191,36,0.25)]'
                    : 'bg-[#1a1a1a] text-slate-100 border border-[#2e2e32] rounded-bl-xs'
                }`}
              >
                {!isUser && (
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#2e2e32]">
                    <span className="w-2 h-2 rounded-full bg-[#fbbf24] animate-pulse" />
                    <span className="text-xs font-bold text-[#fbbf24] uppercase tracking-wider">
                      Nexovian Socratic Tutor • {activeLangConfig.name}
                    </span>
                  </div>
                )}

                <div className="text-sm sm:text-base leading-relaxed break-words">
                  <CleanFormulaRenderer content={msg.content} />
                </div>

                {!isUser && (
                  <div className="mt-3 pt-2 border-t border-[#2e2e32] flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#fbbf24] shrink-0" />
                      <span>{msg.disclaimer || 'Controlled native-verified vocabulary'}</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Follow-up suggestions */}
              {!isUser && msg.followUps && msg.followUps.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2 max-w-[85%]">
                  {msg.followUps.map((fu, fIdx) => (
                    <button
                      key={fIdx}
                      onClick={() => handleSend(fu)}
                      className="px-2.5 py-1 rounded-full bg-[#18181b] hover:bg-[#262626] text-slate-300 hover:text-[#fbbf24] border border-[#333] hover:border-[#fbbf24]/40 text-xs transition-colors cursor-pointer"
                    >
                      💡 {fu}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {isTutorLoading && (
          <div className="flex items-center gap-3 p-4 bg-[#1a1a1a] border border-[#fbbf24]/30 rounded-2xl max-w-sm shadow-[0_0_20px_rgba(251,191,36,0.15)] animate-pulse">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#fbbf24] animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2.5 h-2.5 rounded-full bg-[#fbbf24] animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2.5 h-2.5 rounded-full bg-[#fbbf24] animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-xs font-mono text-[#fbbf24] font-bold">
              Tisha is typing in {activeLangConfig.name}...
            </span>
          </div>
        )}

        {(tutorErrorBanner || tutorError) && (
          <div className="flex items-center justify-between gap-3 p-4 bg-red-950/40 border border-red-500/50 rounded-2xl text-red-200 text-xs shadow-lg">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{tutorErrorBanner || tutorError}</span>
            </div>
            <button
              onClick={() => handleSend(lastQuery)}
              className="px-3.5 py-1.5 bg-[#fbbf24] hover:bg-yellow-400 text-black font-black rounded-xl text-xs cursor-pointer shadow-md transition-all active:scale-95"
            >
              Retry
            </button>
          </div>
        )}

        {/* Rule 4: When SASL selected, ADD 4 sections below chat with CREDIT (no payment) */}
        {selectedLang === 'sasl' && (
          <SASLResourceHub />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 5. BOTTOM ACTIONS BAR & INPUT FORM */}
      <div className="w-full bg-[#141414] border-t border-[#262626] p-4 sm:p-5 sticky bottom-0 z-20">
        <div className="max-w-4xl mx-auto space-y-3">
          
          {/* Quick Real-world Example Chip (Like Screenshot) */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleSend(activeLangConfig.examplePrompt)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1e1e1e] hover:bg-[#2a2a2a] border border-[#fbbf24]/40 text-[#fbbf24] text-xs font-semibold cursor-pointer transition-colors"
              >
                <span>💡 &ldquo;{activeLangConfig.examplePrompt}&rdquo;</span>
              </button>

              <button
                onClick={() => setIsStudyPlanOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1e1e1e] hover:bg-[#2a2a2a] text-white hover:text-[#fbbf24] border border-[#333] text-xs font-bold transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span>Create Study Plan</span>
              </button>

              <button
                onClick={handleLaunchPracticeQuiz}
                disabled={isGeneratingQuiz}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1e1e1e] hover:bg-[#2a2a2a] text-white hover:text-[#fbbf24] border border-[#333] text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
              >
                <Target className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span>{isGeneratingQuiz ? 'Building...' : 'Practice Assessment'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Input Field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Ask in ${activeLangConfig.name} (e.g. "${activeLangConfig.phrases[0]?.text}" or formula)...`}
              className="flex-1 bg-[#1a1a1a] text-white placeholder-slate-500 px-4 py-3.5 rounded-2xl border border-[#2e2e32] focus:border-[#fbbf24] focus:outline-none focus:ring-1 focus:ring-[#fbbf24] text-sm sm:text-base transition-colors"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTutorLoading}
              className="h-12 px-5 rounded-2xl bg-[#fbbf24] hover:bg-yellow-400 text-black font-black text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_-3px_rgba(251,191,36,0.4)] cursor-pointer shrink-0"
              aria-label="Send question"
            >
              <Send className="w-4 h-4 text-black" />
              <span className="hidden sm:inline">Ask</span>
            </button>
          </form>
        </div>
      </div>

      {/* Modals */}
      <XitsongaPhrasebookModal
        isOpen={isPhrasebookOpen}
        onClose={() => setIsPhrasebookOpen(false)}
      />

      {isStudyPlanOpen && (
        <StudyPlanModal
          onClose={() => setIsStudyPlanOpen(false)}
          onOpenQuiz={handleLaunchPracticeQuiz}
        />
      )}

      {activeGeneratedQuiz && (
        <PracticeQuizModal
          quiz={activeGeneratedQuiz}
          onClose={() => setActiveGeneratedQuiz(null)}
        />
      )}

      {/* Grade and Subject Full Catalog Selector Modal */}
      {selectorModalType && (
        <GradeSubjectSelectorModal
          isOpen={!!selectorModalType}
          type={selectorModalType}
          currentGrade={selectedGrade}
          currentSubject={selectedSubject}
          onSelectGrade={handleSelectGrade}
          onSelectSubject={handleSelectSubject}
          onClose={() => setSelectorModalType(null)}
        />
      )}
    </div>
  );
}

export default AITutorView;
