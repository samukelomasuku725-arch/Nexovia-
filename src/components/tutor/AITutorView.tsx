/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN SOCRATIC AI TUTOR (DAY 1 AUTHENTIC DARK THEME)
 * 
 * Features:
 * - Pure Dark #0F0F0F Background with vibrant #FACC15 Yellow accents
 * - Top Bar: "Nexovian Xitsonga Language Engine Active 140 ENTRIES • 80 VERIFIED NATIVE"
 * - Subtitle: "Database First — AI Second • Controlled native vocabulary prioritized • Strictly no invented translations"
 * - Yellow "Xitsonga Phrasebook" button launching native phrasebook modal
 * - Native Classroom Phrases bar: "Mundyondisi, nikombela...", "Andzi Twisisi", "Ndza Twisisa", "Ahi Rhinghesi", "Kombisa ntirho wa wena"
 * - Yellow User Bubbles (bg-[#FACC15] text-black font-semibold)
 * - Socratic Step-by-Step Assistant responses with MathJax / Formula rendering
 * - Bottom Action Bar: [Create Study Plan] & [Practice Assessment]
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Sparkles,
  BookOpen,
  Calendar,
  Target,
  RefreshCw,
  HelpCircle,
  MessageSquare,
  Award,
  ChevronDown,
  Volume2,
  CheckCircle2,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useTranslation } from '../../i18n/I18nContext';
import { XitsongaPhrasebookModal } from '../language/XitsongaPhrasebookModal';
import { StudyPlanModal } from './StudyPlanModal';
import { PracticeQuizModal } from './PracticeQuizModal';
import { CleanFormulaRenderer } from '../common/CleanFormulaRenderer';
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
}

export function AITutorView() {
  const {
    learningContext,
    updateLearningContext,
    conversations,
    activeConversation,
    sendMessageToTutor,
    isTutorLoading,
    generateQuiz,
    activeGeneratedQuiz,
    setActiveGeneratedQuiz
  } = useLearning();

  const { t } = useTranslation();

  const [inputMessage, setInputMessage] = useState('');
  const [isPhrasebookOpen, setIsPhrasebookOpen] = useState(false);
  const [isStudyPlanOpen, setIsStudyPlanOpen] = useState(false);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [selectedMode, setSelectedMode] = useState<AITutorMode>('explain');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial seed messages matching the authentic Day 1 Xitsonga conversation
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
      followUps: [
        'Can you give me a more challenging problem in Quadratic Equations?',
        'Walk me through the step-by-step solution for question 1.',
        'Can we simplify the key steps or formulas further?'
      ]
    }
  ]);

  // Use active conversation messages if available, else fallback
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
          disclaimer: m.disclaimer || 'Nexovian Xitsonga Language Engine Active · Controlled native-verified vocabulary prioritized'
        }))
      : fallbackMessages;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages, isTutorLoading]);

  // Native classroom phrases
  const nativePhrases = [
    { label: 'Mundyondisi, nikombela...', text: 'Mundyondisi, nikombela uhlamisela' },
    { label: 'Andzi Twisisi', text: 'Andzi twisisi, kombela u hlamusela hi ndlela yin\'wana' },
    { label: 'Ndza Twisisa', text: 'Ndza twisisa sweswi, ndzi khensile!' },
    { label: 'Ahi Rhinghesi', text: 'Ahi rhinghesi xikombiso xin\'wana' },
    { label: 'Kombisa ntirho wa wena', text: 'Kombisa magoza yo tlhantlha xivhutiso lexi' }
  ];

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    setInputMessage('');

    if (activeConversation) {
      try {
        await sendMessageToTutor(query, selectedMode);
      } catch (e) {
        console.error('Tutor error:', e);
      }
    } else {
      // Local fallback interaction
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: query,
        timestamp: new Date().toISOString(),
        mode: selectedMode
      };

      setFallbackMessages((prev) => [...prev, userMsg]);

      // Quick auto-response simulating Socratic step-by-step
      setTimeout(() => {
        let aiContent = '';
        if (query.toLowerCase().includes('isiZulu') || query.toLowerCase().includes('zulu')) {
          aiContent = `Sawubona! Ngijabula kakhulu ukuthi ufuna ukuqonda kahle ama-**Quadratic Equations**. Nansi incazelo elula ngesiZulu ukuze ukwazi ukuwakha:

## Yini i-Quadratic Equation?
I-**Quadratic Equation** (isibalo sesikwele) isibalo lapho amandla amakhulu (exponent) kaguquguquki (variable) kuwukuthi **2** ($x^2$).

### Isakhiwo esijwayelekile:
**$ax^2 + bx + c = 0$**

1. **Ukuhlukanisa (Factorization):** Ufuna izinombolo ezimbili eziphindaphindwayo zikunike $c$, futhi zihlanganiswe zikunike $b$.
2. **Ifomula:** $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$

*Khumbula: \"Learn today. Build tomorrow.\" Uyakwazi lokhu!*`;
        } else if (query.includes('Mundyondisi') || query.includes('uhlamisela')) {
          aiContent = `Ahee! A hi sunguleni hi **Xivhutiso 1**: $x^2 + 5x + 6 = 0$.

### A hi swi tlhantlheni hi magoza (Step-by-step solution)
Ku "factorize" xikombiso lexi, hi lava ku kuma tinomboro timbirhi leti:
1. Loko hi ti **phinda** (multiply), ti endla **6**.
2. Loko hi ti **yengetela** (add), ti endla **5**.

**Step 1: Kuma tinomboro**
* $2 \\times 3 = 6$ naswona $2 + 3 = 5$ — **Hi swona leswi!**

**Step 2: Tsala xikombiso**
$(x + 2)(x + 3) = 0$

**Step 3: Nhlamulo**
* $x + 2 = 0 \\rightarrow x = -2$
* $x + 3 = 0 \\rightarrow x = -3$

**Kombisa ntirho wa wena**: Ringeta sweswi $x^2 - 7x + 10 = 0$!`;
        } else {
          aiContent = `Great question on **"${query}"**! Let's approach this using the Socratic method:

1. **Core Concept**: What is the fundamental principle behind this problem?
2. **Key Variables**: Identify the knowns and the unknowns.
3. **Step-by-Step Logic**: Apply the verified formula before calculating.

Would you like to solve this step-by-step together, or shall I provide a practice question?`;
        }

        const aiMsg: Message = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: aiContent,
          timestamp: new Date().toISOString(),
          mode: selectedMode,
          disclaimer: 'Nexovian Xitsonga Language Engine Active · Controlled native-verified vocabulary prioritized',
          followUps: [
            'Can we break down the next step?',
            'Give me another practice question.',
            'Show the general formula solution.'
          ]
        };

        setFallbackMessages((prev) => [...prev, aiMsg]);
      }, 700);
    }
  };

  const handleLaunchPracticeQuiz = async () => {
    setIsGeneratingQuiz(true);
    try {
      const topic = learningContext?.topic || 'Quadratic Equations & Algebra';
      const quiz = await generateQuiz(topic, 'Comprehensive 5-question Socratic assessment');
      setActiveGeneratedQuiz(quiz);
    } catch (err) {
      console.error('Quiz generation error:', err);
      // Fallback sample quiz
      setActiveGeneratedQuiz({
        id: `quiz-${Date.now()}`,
        topic: 'Quadratic Equations',
        level: 'Grade 10 CAPS',
        language: 'en',
        questions: [
          {
            id: 'q1',
            questionText: 'Solve for x: x^2 + 5x + 6 = 0',
            options: ['x = -2 or x = -3', 'x = 2 or x = 3', 'x = 1 or x = 6', 'x = -1 or x = -6'],
            correctAnswer: 'x = -2 or x = -3',
            explanation: 'Factorizing gives (x + 2)(x + 3) = 0, so x = -2 or x = -3.'
          },
          {
            id: 'q2',
            questionText: 'What are the roots of x^2 - 7x + 10 = 0?',
            options: ['x = 2 or x = 5', 'x = -2 or x = -5', 'x = 1 or x = 10', 'x = -1 or x = -10'],
            correctAnswer: 'x = 2 or x = 5',
            explanation: '(x - 2)(x - 5) = 0 gives x = 2 or x = 5.'
          }
        ]
      } as any);
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#F8FAFC] flex flex-col w-full max-w-[100vw] overflow-x-hidden">
      {/* 1. TOP BAR: XITSONGA LANGUAGE ENGINE BANNER */}
      <div className="w-full bg-[#141414] border-b border-[#262626] px-4 py-3 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FACC15] text-black font-black flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(250,204,21,0.4)]">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs sm:text-sm font-black tracking-wider text-[#FACC15] uppercase">
                  Nexovian Xitsonga Language Engine Active
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FACC15]/20 text-[#FACC15] border border-[#FACC15]/40 font-mono">
                  140 ENTRIES • 80 VERIFIED NATIVE
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-snug">
                Database First — AI Second • Controlled native vocabulary prioritized • Strictly no invented translations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
            <button
              onClick={() => setIsPhrasebookOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#FACC15] hover:bg-yellow-400 text-black text-xs font-black shadow-[0_0_15px_-3px_rgba(250,204,21,0.5)] transition-all cursor-pointer active:scale-95"
            >
              <BookOpen className="w-4 h-4 text-black" />
              <span>Xitsonga Phrasebook</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. CONTEXT & CONTROLS STRIP */}
      <div className="w-full bg-[#18181B]/80 border-b border-[#262626] px-4 py-2 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 font-mono text-slate-400">
            <span className="text-[#FACC15] font-bold">Level:</span>
            <span>{learningContext?.gradeOrProgramme || 'Grade 10 CAPS'}</span>
            <span className="text-slate-600">|</span>
            <span className="text-[#FACC15] font-bold">Subject:</span>
            <span>{learningContext?.subject || 'Mathematics'}</span>
          </div>

          {/* Socratic Mode Toggle */}
          <div className="flex items-center gap-1.5 bg-[#262626] p-1 rounded-xl">
            {(['explain', 'practice', 'translate'] as AITutorMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedMode(mode)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors capitalize ${
                  selectedMode === mode
                    ? 'bg-[#FACC15] text-black shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {mode === 'explain' ? 'Socratic Tutor' : mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. NATIVE PHRASES BAR */}
      <div className="w-full bg-[#121212] border-b border-[#262626] px-4 py-2 sm:px-6 overflow-x-auto scrollbar-hide">
        <div className="max-w-6xl mx-auto flex items-center gap-2 min-w-max">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#FACC15] font-mono mr-1 shrink-0">
            Native Phrases:
          </span>
          {nativePhrases.map((phrase, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(phrase.text)}
              className="px-3 py-1 rounded-lg bg-[#1E1E1E] hover:bg-[#2A2A2A] text-slate-200 hover:text-[#FACC15] border border-[#333] hover:border-[#FACC15]/50 text-xs font-medium transition-all shrink-0 cursor-pointer active:scale-95"
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
              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-5 py-4 transition-all shadow-md ${
                  isUser
                    ? 'bg-[#FACC15] text-black font-semibold rounded-br-xs'
                    : 'bg-[#1C1C1F] text-slate-100 border border-[#2E2E32] rounded-bl-xs'
                }`}
              >
                {!isUser && (
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#2E2E32]">
                    <span className="w-2 h-2 rounded-full bg-[#FACC15] animate-pulse" />
                    <span className="text-xs font-bold text-[#FACC15] uppercase tracking-wider">
                      Nexovian Socratic Tutor
                    </span>
                  </div>
                )}

                <div className="text-sm sm:text-base leading-relaxed break-words">
                  <CleanFormulaRenderer content={msg.content} />
                </div>

                {!isUser && msg.disclaimer && (
                  <div className="mt-3 pt-2 border-t border-[#2E2E32] flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FACC15] shrink-0" />
                    <span>{msg.disclaimer}</span>
                  </div>
                )}
              </div>

              {/* Follow-up suggestions for AI messages */}
              {!isUser && msg.followUps && msg.followUps.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2 max-w-[85%]">
                  {msg.followUps.map((fu, fIdx) => (
                    <button
                      key={fIdx}
                      onClick={() => handleSend(fu)}
                      className="px-2.5 py-1 rounded-full bg-[#18181B] hover:bg-[#262626] text-slate-300 hover:text-[#FACC15] border border-[#333] hover:border-[#FACC15]/40 text-xs transition-colors cursor-pointer"
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
          <div className="flex items-center gap-3 p-4 bg-[#1C1C1F] border border-[#2E2E32] rounded-2xl max-w-sm">
            <div className="w-3 h-3 rounded-full bg-[#FACC15] animate-ping" />
            <span className="text-xs font-mono text-[#FACC15]">
              Formulating Socratic response...
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 5. BOTTOM ACTIONS BAR & INPUT FORM */}
      <div className="w-full bg-[#141414] border-t border-[#262626] p-4 sm:p-5 sticky bottom-0 z-20">
        <div className="max-w-4xl mx-auto space-y-3">
          {/* Top Quick Action Buttons: Create Study Plan & Practice Assessment */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsStudyPlanOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1E1E1E] hover:bg-[#2A2A2A] text-white hover:text-[#FACC15] border border-[#333] hover:border-[#FACC15]/50 text-xs font-bold transition-all cursor-pointer active:scale-95"
              >
                <Calendar className="w-4 h-4 text-[#FACC15]" />
                <span>Create Study Plan</span>
              </button>

              <button
                onClick={handleLaunchPracticeQuiz}
                disabled={isGeneratingQuiz}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1E1E1E] hover:bg-[#2A2A2A] text-white hover:text-[#FACC15] border border-[#333] hover:border-[#FACC15]/50 text-xs font-bold transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              >
                <Target className="w-4 h-4 text-[#FACC15]" />
                <span>{isGeneratingQuiz ? 'Building Quiz...' : 'Practice Assessment'}</span>
              </button>
            </div>

            <span className="text-[11px] text-slate-500 hidden sm:inline font-mono">
              Ask in any of SA&apos;s 11 languages
            </span>
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
              placeholder="Ask anything (e.g., 'Mundyondisi, nikombela uhlamisela' or 'Solve x² - 7x + 10 = 0')..."
              className="flex-1 bg-[#1C1C1F] text-white placeholder-slate-500 px-4 py-3.5 rounded-2xl border border-[#2E2E32] focus:border-[#FACC15] focus:outline-none focus:ring-1 focus:ring-[#FACC15] text-sm sm:text-base transition-colors"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTutorLoading}
              className="h-12 px-5 rounded-2xl bg-[#FACC15] hover:bg-yellow-400 text-black font-black text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_-3px_rgba(250,204,21,0.5)] cursor-pointer shrink-0"
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
    </div>
  );
}

export default AITutorView;
