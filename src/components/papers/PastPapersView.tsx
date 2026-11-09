/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NEXOVIAN PAST PAPERS & MEMOS VIEW (/papers)
 * 
 * Free Preview Rules:
 * - Filter by Grade (Grade 4 to University) + Subject
 * - Shows 3 real past paper previews
 * - Questions 1 & 2: 100% FREE with full step-by-step memo in all 11 SA languages
 * - Question 3 onwards: Blurred + Locked + Button "Unlock Full Memo - R60" -> SnapScan
 * - If user has active subscription (checkAccess), all questions are unlocked!
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  FileText,
  Lock,
  Unlock,
  Sparkles,
  Search,
  CheckCircle2,
  ChevronDown,
  Languages,
  ArrowRight,
  ExternalLink,
  QrCode,
  ShieldCheck,
  ArrowLeft,
  GraduationCap,
  Download,
  Eye,
  Check,
  AlertCircle,
  KeyRound,
  X
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useAuth } from '../../context/AuthContext';
import { checkAccess, verifyAndUnlockPayment } from '../../services/snapscanSubscriptionService';
import { ALL_11_LANGUAGES } from '../home/PublicLandingView';
import { EXPANDED_PAST_PAPERS_CATALOG, BASE_GRADE_SUBJECT_MAP } from '../../data/expandedPastPapersCatalog';
import { generatePaperExplanation } from '../../services/language/paperExplanationGenerator';

interface PastPaperQuestion {
  id: string;
  questionNumber: string;
  marks: number;
  questionText: string;
  officialMemoEn: string;
  explanationsInLanguages: Record<string, string>;
}

export interface PastPaper {
  id: string;
  title: string;
  year: number;
  session: string;
  gradeId: string;
  gradeName: string;
  subject: string;
  duration: string;
  totalMarks: number;
  paperType?: string;
  languageNote?: string;
  questions: PastPaperQuestion[];
}

const ORIGINAL_BASE_PAPERS: PastPaper[] = [
  {
    id: 'paper-math-g12-2024-p1',
    title: 'DBE Mathematics Paper 1 (Algebra & Calculus)',
    year: 2024,
    session: 'November Examination',
    gradeId: 'grade-12',
    gradeName: 'Grade 12',
    subject: 'Mathematics',
    duration: '3 Hours',
    totalMarks: 150,
    questions: [
      {
        id: 'q1',
        questionNumber: 'Question 1.1',
        marks: 4,
        questionText: 'Solve for x:  2x(x - 3) = 0   and   x² - 5x - 6 = 0',
        officialMemoEn: '1.1.1: 2x = 0 or x - 3 = 0 => x = 0 or x = 3 [2 marks]\n1.1.2: (x - 6)(x + 1) = 0 => x = 6 or x = -1 [2 marks]',
        explanationsInLanguages: {
          'English': 'For 2x(x - 3) = 0, apply zero product rule: each factor can equal zero, giving x = 0 or x = 3. For the quadratic x² - 5x - 6 = 0, factorize into (x - 6)(x + 1) = 0, yielding x = 6 or x = -1.',
          'isiZulu': 'Kulesi sibalo: Uma 2x(x - 3) = 0, kusho ukuthi u-2x = 0 noma u-x - 3 = 0. Ngakho-ke u-x = 0 noma u-x = 3. Esinyathelweni sesibili, uhlukanisa u-(x - 6)(x + 1) = 0, uthole u-x = 6 noma u-x = -1.',
          'Afrikaans': 'Gebruik die nulproduk-eienskap: 2x = 0 of x - 3 = 0, dus is x = 0 of x = 3. Vir x² - 5x - 6 = 0, faktoriseer na (x - 6)(x + 1) = 0, wat x = 6 of x = -1 lewer.',
          'Sepedi': 'Šomiša molao wa lefeela: 2x = 0 goba x - 3 = 0, ka gona x = 0 goba x = 3. Go x² - 5x - 6 = 0, hlahla bjalo ka (x - 6)(x + 1) = 0, gomme x = 6 goba x = -1.',
          'Sesotho': 'Sebelisa molao wa lefeela: 2x = 0 kapa x - 3 = 0, ka hoo x = 0 kapa x = 3. Ho x² - 5x - 6 = 0, arola ka (x - 6)(x + 1) = 0, ho hlahisa x = 6 kapa x = -1.',
          'isiXhosa': 'Sebenzisa umthetho we-zero product: 2x = 0 okanye x - 3 = 0, ngoko x = 0 okanye x = 3. Ku-x² - 5x - 6 = 0, yenza i-factoriseibe ngu-(x - 6)(x + 1) = 0, unikezele x = 6 okanye x = -1.',
          'Setswana': 'Dirisa molao wa lefela: 2x = 0 kgotsa x - 3 = 0, ka jalo x = 0 kgotsa x = 3. Mo go x² - 5x - 6 = 0, arola (x - 6)(x + 1) = 0, go naya x = 6 kgotsa x = -1.',
          'Xitsonga': 'Tirhisa nawu wa ziro: 2x = 0 kumbe x - 3 = 0, leswi vulaka leswaku x = 0 kumbe x = 3. Ka x² - 5x - 6 = 0, vumba (x - 6)(x + 1) = 0, leswi nyikaka x = 6 kumbe x = -1.',
          'siSwati': 'Sebentisa umtsetfo welize: 2x = 0 nobe x - 3 = 0, lokusho kutsi x = 0 nobe x = 3. Ku-x² - 5x - 6 = 0, phendvula (x - 6)(x + 1) = 0, unike x = 6 nobe x = -1.',
          'Tshivenda': 'Shumisani mulayo wa zero: 2x = 0 kana x - 3 = 0, zwi amba uri x = 0 kana x = 3. Kha x² - 5x - 6 = 0, vhumbani (x - 6)(x + 1) = 0, zwa netshedza x = 6 kana x = -1.',
          'isiNdebele': 'Sebenzisa umthetho weqanda: 2x = 0 nofana x - 3 = 0, ngalokho x = 0 nofana x = 3. Ku-x² - 5x - 6 = 0, thola (x - 6)(x + 1) = 0, uthole x = 6 nofana x = -1.'
        }
      },
      {
        id: 'q2',
        questionNumber: 'Question 1.2',
        marks: 5,
        questionText: 'Given the geometric sequence: 3 ; 6 ; 12 ; ...  Determine T₁₀ (the 10th term) and S₁₀ (the sum of first 10 terms).',
        officialMemoEn: 'a = 3, r = 6/3 = 2\nTn = a·r^(n-1) => T10 = 3·2^9 = 3 · 512 = 1536 [2 marks]\nSn = a(r^n - 1)/(r - 1) => S10 = 3(2^10 - 1)/(2 - 1) = 3(1023) = 3069 [3 marks]',
        explanationsInLanguages: {
          'English': 'The first term a = 3 and common ratio r = 2. Plug into the geometric formula Tn = a*r^(n-1) to get T10 = 1536. Use Sn = a(r^n - 1)/(r - 1) to sum 10 terms, yielding 3069.',
          'isiZulu': 'Ithemu yokuqala ngu-a = 3 kanti i-ratio ngu-r = 2. Faka efomuleni yohlu: Tn = a*r^(n-1). Uthola ukuthi T10 = 1536. Ukuthola isamba, faka ku-Sn uthole u-3069.',
          'Afrikaans': 'Die eerste term a = 3 en die gemene verhouding r = 2. Gebruik Tn = a*r^(n-1) vir T10 = 1536. Vir die som, gebruik Sn formule om 3069 te kry.',
          'Sepedi': 'Lereo la mathomo ke a = 3 gomme kamano ke r = 2. Šomiša fomula ya geometric Tn = a*r^(n-1) go hwetša T10 = 1536. Gomme Sn = 3069.',
          'Sesotho': 'Lereo la pele ke a = 3 le tekanyo ke r = 2. Sebelisa foromo ya geometric Tn ho fumana T10 = 1536 le kakaretso Sn = 3069.',
          'isiXhosa': 'Ithem yokuqala ngu-a = 3 kwaye i-ratio ngu-r = 2. Sebenzisa ifomula: Tn = a*r^(n-1) ukufumana T10 = 1536 kunye ne-Sn = 3069.',
          'Setswana': 'Lereo la ntlha ke a = 3 le tekanyo ke r = 2. Dirisa fomete ya Tn = a*r^(n-1) go bona T10 = 1536 le palogotlhe Sn = 3069.',
          'Xitsonga': 'Rito ro sungula i a = 3 na ratio i r = 2. Tirhisa fomu ya geometric ku kuma T10 = 1536 na ku hlanganisa hinkwaswo Sn = 3069.',
          'siSwati': 'Leligama lekucala ngu-a = 3 bese ratio ngu-r = 2. Sebentisa ifomula kutfola T10 = 1536 nemiphumela ya-Sn = 3069.',
          'Tshivenda': 'Tshipida tsha u thoma ndi a = 3 na ratio ndi r = 2. Shumisani fomula u wana T10 = 1536 na mutanganyo wa Sn = 3069.',
          'isiNdebele': 'Ithemu yokuthoma ngu-a = 3 kanye ne-ratio ngu-r = 2. Sebenzisa ifomula ukuthola T10 = 1536 kanye ne-Sn = 3069.'
        }
      },
      {
        id: 'q3',
        questionNumber: 'Question 2.1',
        marks: 6,
        questionText: 'Determine the derivative f\'(x) from first principles if f(x) = 3x² - 5x.',
        officialMemoEn: 'f\'(x) = lim[h->0] (f(x+h) - f(x))/h = lim[h->0] [3(x+h)² - 5(x+h) - (3x² - 5x)]/h\n= lim[h->0] [6xh + 3h² - 5h]/h = lim[h->0] (6x + 3h - 5) = 6x - 5 [6 marks]',
        explanationsInLanguages: {
          'English': 'Premium Step-by-Step Memo Explanation: Expand f(x+h), cancel terms, factor out h, and let h tend to 0 to yield f\'(x) = 6x - 5.',
          'isiZulu': 'Incazelo ephelele ye-Memo nge-isiZulu ivuliwe kwababhalisile.',
          'Afrikaans': 'Volledige memo-verduideliking in Afrikaans beskikbaar.',
          'Sepedi': 'Tlhaloso e tletšego ya memo ka Sepedi.',
          'Sesotho': 'Tlhaloso e phethahetseng ya memo ka Sesotho.',
          'isiXhosa': 'Inkcazo epheleleyo ye-memo ngesiXhosa.',
          'Setswana': 'Tlhaloso e e feletseng ya memo ka Setswana.',
          'Xitsonga': 'Nhlamuselo leyi heleleke ya memo hi Xitsonga.',
          'siSwati': 'Inchazelo lephelele ye-memo ngesiSwati.',
          'Tshivenda': 'Thalutshedzo yo fhelelaho nga Tshivenda.',
          'isiNdebele': 'Incazelo epheleleko nge-isiNdebele.'
        }
      },
      {
        id: 'q4',
        questionNumber: 'Question 3.2',
        marks: 7,
        questionText: 'Given the cubic function g(x) = -x³ + 3x² + 9x - 27. Find stationary points, point of inflection, and sketch graph.',
        officialMemoEn: 'g\'(x) = -3x² + 6x + 9 = 0 => x² - 2x - 3 = 0 => (x - 3)(x + 1) = 0. Stationary points at (3, 0) and (-1, -32). Inflection at x = 1.',
        explanationsInLanguages: {
          'English': 'Premium Step-by-Step Calculus Memo: Stationary points & inflection curve analysis.'
        }
      }
    ]
  },
  {
    id: 'paper-phys-g12-2024-p1',
    title: 'DBE Physical Sciences Paper 1 (Physics)',
    year: 2024,
    session: 'June Senior Certificate Examination',
    gradeId: 'grade-12',
    gradeName: 'Grade 12',
    subject: 'Physical Sciences',
    duration: '3 Hours',
    totalMarks: 150,
    questions: [
      {
        id: 'p1_q1',
        questionNumber: 'Question 2.1',
        marks: 4,
        questionText: 'State Newton’s Second Law of Motion in words and calculate the net force required to accelerate a 1200 kg car at 2.5 m·s⁻².',
        officialMemoEn: 'Newton 2: When a net force acts on an object, the object will accelerate in the direction of the force at an acceleration directly proportional to the force and inversely proportional to the mass. [2 marks]\nFnet = m · a = 1200 kg · 2.5 m·s⁻² = 3000 N in the direction of motion [2 marks]',
        explanationsInLanguages: {
          'English': 'State the standard CAPS definition: acceleration is directly proportional to net force and inversely proportional to mass. Calculate Fnet = m * a = 1200 * 2.5 = 3000 N.',
          'isiZulu': 'Umthetho Wesibili ka-Newton: Lapho amandla esamba esebenza entweni, leyo nto izoshesha iye ohlangothini lwamandla. Isibalo: Fnet = m * a = 1200 * 2.5 = 3000 N.',
          'Afrikaans': 'Newton se Tweede Wet: Wanneer \'n netto krag op \'n voorwerp inwerk, versnel die voorwerp in die rigting van die krag. Fnet = m * a = 1200 * 2.5 = 3000 N.',
          'Sepedi': 'Molao wa Bobedi wa Newton: Fnet = m * a = 1200 * 2.5 = 3000 N ntlheng ya tšwelopele.',
          'Sesotho': 'Molao wa Bobedi wa Newton: Fnet = m * a = 1200 * 2.5 = 3000 N tseleng ya motsamao.',
          'isiXhosa': 'Umthetho wesibini ka-Newton: Fnet = m * a = 1200 * 2.5 = 3000 N.',
          'Setswana': 'Molao wa Bobedi wa Newton: Fnet = m * a = 1200 * 2.5 = 3000 N.',
          'Xitsonga': 'Nawu wa Vumbirhi wa Newton: Fnet = m * a = 1200 * 2.5 = 3000 N.',
          'siSwati': 'Umtsetfo Wesibili wa-Newton: Fnet = m * a = 1200 * 2.5 = 3000 N.',
          'Tshivenda': 'Mulayo wa Vhuvhili wa Newton: Fnet = m * a = 1200 * 2.5 = 3000 N.',
          'isiNdebele': 'Umthetho Wesibili ka-Newton: Fnet = m * a = 1200 * 2.5 = 3000 N.'
        }
      },
      {
        id: 'p1_q2',
        questionNumber: 'Question 3.1',
        marks: 5,
        questionText: 'A ball is projected vertically upwards with a speed of 15 m·s⁻¹ from a balcony 20 m above the ground. Calculate the maximum height reached above the balcony.',
        officialMemoEn: 'v_f² = v_i² + 2·g·Δy\n0² = (15)² + 2(-9.8)·Δy\n19.6·Δy = 225 => Δy = 11.48 m above the balcony [5 marks]',
        explanationsInLanguages: {
          'English': 'At maximum height, the final velocity v_f is 0 m/s. Acceleration g is -9.8 m/s² (downward). Using equation v_f² = v_i² + 2*g*Δy gives 0 = 225 - 19.6*Δy => Δy = 11.48 m.',
          'isiZulu': 'Ezingeni eliphakeme kakhulu, i-velocity yokugcina ingu-0 m/s. Sebenzisa ifomula yomnyakazo ukuthola ukuthi uphakama ngo-11.48 m ngaphezu kwebhalikoni.',
          'Afrikaans': 'By die hoogste punt is die finale snelheid 0 m/s. Gebruik v_f² = v_i² + 2*g*Δy om Δy = 11.48 m te bereken.',
          'Sepedi': 'Bophagamong bja godimodimo, lebelo la mafelelo ke 0 m/s. Šomiša fomula go hwetša 11.48 m.',
          'Sesotho': 'Bophahamong bo phahameng ka ho fetisisa, lebelo la ho qetela ke 0 m/s. Fumana 11.48 m.',
          'isiXhosa': 'Kweyona ndawo iphakamileyo, isantya sokugqibela ngu-0 m/s. Fumana u-11.48 m.',
          'Setswana': 'Kwa bogodimong jwa godimo, lobelo lwa bofelo ke 0 m/s. Fumana 11.48 m.',
          'Xitsonga': 'Eka vutshamo bya le henhla swinene, rivilo ro hetelela i 0 m/s. Kuma 11.48 m.',
          'siSwati': 'Endzaweni lephakeme kakhulu, velocity yekugcina ngu-0 m/s. Tfola 11.48 m.',
          'Tshivenda': 'Vhudzuloni ha nthesa, luvhilo lwa u fhedzisela ndi 0 m/s. Wanani 11.48 m.',
          'isiNdebele': 'Ezingeni eliphakemeko, i-velocity yokugcina ngu-0 m/s. Thola 11.48 m.'
        }
      },
      {
        id: 'p1_q3',
        questionNumber: 'Question 4.2',
        marks: 8,
        questionText: 'Doppler Effect: A police car emits a siren of frequency 650 Hz moving at 30 m·s⁻¹ towards a stationary listener. Calculate the frequency heard by the listener. (Speed of sound = 340 m·s⁻¹).',
        officialMemoEn: 'f_L = (v ± v_L)/(v ± v_S) · f_S = (340)/(340 - 30) · 650 = (340/310) · 650 = 712.90 Hz [8 marks]',
        explanationsInLanguages: {
          'English': 'Premium Doppler Effect breakdown with frequency shift diagrams.'
        }
      }
    ]
  },
  {
    id: 'paper-math-g10-2023-p1',
    title: 'DBE Mathematics Grade 10 Paper 1',
    year: 2023,
    session: 'November Final Examination',
    gradeId: 'grade-10',
    gradeName: 'Grade 10',
    subject: 'Mathematics',
    duration: '2 Hours',
    totalMarks: 100,
    questions: [
      {
        id: 'g10_q1',
        questionNumber: 'Question 1.1',
        marks: 3,
        questionText: 'Factorize completely:  x² - 9   and   2x² + 5x - 3',
        officialMemoEn: '1.1.1: Difference of squares: (x - 3)(x + 3) [1 mark]\n1.1.2: Trinomial: (2x - 1)(x + 3) [2 marks]',
        explanationsInLanguages: {
          'English': 'x² - 9 is a difference of two squares: (x - 3)(x + 3). For 2x² + 5x - 3, find factors of 2 * (-3) = -6 that add up to 5: (2x - 1)(x + 3).',
          'isiZulu': 'U-x² - 9 umele umehluko wezikwele: (x - 3)(x + 3). Ku-2x² + 5x - 3, thola amaphuzu atholakala ngokubuyisela: (2x - 1)(x + 3).',
          'Afrikaans': 'x² - 9 is die verskil tussen twee vierkante: (x - 3)(x + 3). Vir 2x² + 5x - 3 kry ons (2x - 1)(x + 3).',
          'Sepedi': 'x² - 9 ke phapano ya dikwere tše pedi: (x - 3)(x + 3). Go 2x² + 5x - 3, hlahla bjalo ka (2x - 1)(x + 3).',
          'Sesotho': 'x² - 9 ke phapang ya dikwere: (x - 3)(x + 3). Ho 2x² + 5x - 3 ke (2x - 1)(x + 3).',
          'isiXhosa': 'U-x² - 9 ngumahluko wezikwere: (x - 3)(x + 3). Ku-2x² + 5x - 3 ngamaphuzu (2x - 1)(x + 3).',
          'Setswana': 'x² - 9 ke pharologanyo ya dikwere: (x - 3)(x + 3). Mo go 2x² + 5x - 3 re bona (2x - 1)(x + 3).',
          'Xitsonga': 'x² - 9 i ku hambana ka swikwere: (x - 3)(x + 3). Ka 2x² + 5x - 3 hi kuma (2x - 1)(x + 3).',
          'siSwati': 'x² - 9 ngumehluko wemikwele: (x - 3)(x + 3). Ku-2x² + 5x - 3 sithola (2x - 1)(x + 3).',
          'Tshivenda': 'x² - 9 ndi phambano ya zwikwere: (x - 3)(x + 3). Kha 2x² + 5x - 3 ndi (2x - 1)(x + 3).',
          'isiNdebele': 'x² - 9 ngumehluko weenkwere: (x - 3)(x + 3). Ku-2x² + 5x - 3 kutholakala (2x - 1)(x + 3).'
        }
      },
      {
        id: 'g10_q2',
        questionNumber: 'Question 1.2',
        marks: 4,
        questionText: 'Simplify without using a calculator:  (2^(x+1) + 2^x) / 2^(x-1)',
        officialMemoEn: 'Factor out 2^x from numerator: 2^x (2^1 + 1) / (2^x · 2^(-1))\n= 2^x · 3 / (2^x · 0.5) = 3 / 0.5 = 6 [4 marks]',
        explanationsInLanguages: {
          'English': 'Factorize the common exponential base 2^x out of the numerator: 2^x(2 + 1) = 3 * 2^x. In the denominator, 2^(x-1) = 2^x * (1/2). Cancelling 2^x yields 3 / (1/2) = 6.',
          'isiZulu': 'Khipha u-2^x kwisibalo sangasenhla: uthola 2^x (2 + 1) = 3 * 2^x. Ngaphansi u-2^(x-1) = 2^x * (1/2). Uma kukhishwa u-2^x, usalelwa ngu-3 / (1/2) = 6.',
          'Afrikaans': 'Faktoriseer 2^x uit teller: 2^x(2 + 1) = 3 * 2^x. Noemer is 2^x * (1/2). Kanselleer 2^x om 3 / (1/2) = 6 te kry.',
          'Sepedi': 'Ntšha 2^x godimo: 2^x(2 + 1) = 3 * 2^x. Tlase ke 2^x * (1/2). Hlakola 2^x go hwetša 6.',
          'Sesotho': 'Ntsha 2^x hodimo: 2^x(2 + 1) = 3 * 2^x. Tlase ke 2^x * (1/2). Hlakola 2^x o fumane 6.',
          'isiXhosa': 'Khupha u-2^x ngasentla: 2^x(2 + 1) = 3 * 2^x. Ngezantsi ngu-2^x * (1/2). Cima u-2^x ufumane 6.',
          'Setswana': 'Ntsha 2^x kwa godimo: 2^x(2 + 1) = 3 * 2^x. Kwa tlase ke 2^x * (1/2). Hlakola 2^x go bona 6.',
          'Xitsonga': 'Humesa 2^x eka le henhla: 2^x(2 + 1) = 3 * 2^x. Le hansi i 2^x * (1/2). Sula 2^x u kuma 6.',
          'siSwati': 'Khipha 2^x ngenhla: 2^x(2 + 1) = 3 * 2^x. Ngaphansi ngu-2^x * (1/2). Sula 2^x utfole 6.',
          'Tshivenda': 'Bvisani 2^x ntha: 2^x(2 + 1) = 3 * 2^x. Fhasi ndi 2^x * (1/2). Pfunzani 2^x u wana 6.',
          'isiNdebele': 'Khupha 2^x ngenhla: 2^x(2 + 1) = 3 * 2^x. Ngaphasi ngu-2^x * (1/2). Sula 2^x uthole 6.'
        }
      },
      {
        id: 'g10_q3',
        questionNumber: 'Question 2.1',
        marks: 5,
        questionText: 'Solve simultaneous equations:  3x + 2y = 11   and   2x - y = 5',
        officialMemoEn: 'From eq (2): y = 2x - 5. Substitute into (1): 3x + 2(2x - 5) = 11 => 7x - 10 = 11 => 7x = 21 => x = 3. y = 2(3) - 5 = 1.',
        explanationsInLanguages: {
          'English': 'Premium simultaneous equations step-by-step substitution memo.'
        }
      }
    ]
  }
];

// Combine existing Grade 12 Math/Physics papers + FULL catalog for all Grades 4 to University using spread operator
export const FULL_PAPERS: PastPaper[] = [
  ...ORIGINAL_BASE_PAPERS,
  ...EXPANDED_PAST_PAPERS_CATALOG
];
export const PAST_PAPERS_DATABASE: PastPaper[] = FULL_PAPERS;

export const ALL_GRADE_FILTERS = [
  { id: 'all', name: 'All Grades' },
  { id: 'grade-4', name: 'Grade 4' },
  { id: 'grade-5', name: 'Grade 5' },
  { id: 'grade-6', name: 'Grade 6' },
  { id: 'grade-7', name: 'Grade 7' },
  { id: 'grade-8', name: 'Grade 8' },
  { id: 'grade-9', name: 'Grade 9' },
  { id: 'grade-10', name: 'Grade 10' },
  { id: 'grade-11', name: 'Grade 11' },
  { id: 'grade-12', name: 'Grade 12' },
  { id: 'tvet', name: 'TVET Colleges' },
  { id: 'university', name: 'University' }
];

export const ALL_SUBJECT_FILTERS = [
  'All Subjects',
  'Mathematics',
  'Physical Sciences',
  'Life Sciences',
  'Accounting',
  'English FAL',
  'Economics',
  'Mathematical Literacy',
  'Business Studies',
  'Engineering Science'
];

export const PastPapersView: React.FC = () => {
  const { setCurrentTab, updateLearningContext, setActiveLearningLanguage, sendMessageToTutor } = useLearning();
  const { user } = useAuth();

  const [selectedGrade, setSelectedGrade] = useState<string>('grade-12');
  const [selectedSubject, setSelectedSubject] = useState<string>('All Subjects');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
  const [activePaperId, setActivePaperId] = useState<string>(PAST_PAPERS_DATABASE[0].id);
  const [selectedPaper, setSelectedPaper] = useState<PastPaper | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Dynamic subjects based on selectedGrade
  const availableSubjectsForGrade = useMemo(() => {
    if (selectedGrade === 'all') {
      return ALL_SUBJECT_FILTERS;
    }
    const gradeTier = BASE_GRADE_SUBJECT_MAP[selectedGrade];
    if (gradeTier && gradeTier.subjects.length > 0) {
      return ['All Subjects', ...gradeTier.subjects];
    }
    return ALL_SUBJECT_FILTERS;
  }, [selectedGrade]);

  const handleGradeChange = (gradeId: string) => {
    setSelectedGrade(gradeId);
    setSelectedSubject('All Subjects');
  };

  // Check access status
  const [accessState, setAccessState] = useState(() => checkAccess(user));

  useEffect(() => {
    // Read query parameter ?grade=X from URL if present
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const g = params.get('grade');
      if (g) {
        setSelectedGrade(g);
      }
      const s = params.get('subject');
      if (s) {
        setSelectedSubject(s);
      }
    }
  }, []);

  const navigateToPaywall = () => {
    setCurrentTab('paywall');
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/paywall');
    }
  };

  const navigateToUnlock = () => {
    setCurrentTab('unlock');
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/unlock');
    }
  };

  const filteredPapers = PAST_PAPERS_DATABASE.filter((paper) => {
    const matchesGrade = selectedGrade === 'all' || paper.gradeId === selectedGrade;
    const matchesSubject = selectedSubject === 'All Subjects' || paper.subject === selectedSubject;
    const matchesSearch =
      !searchQuery ||
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesSubject && matchesSearch;
  });

  const activePaper =
    filteredPapers.find((p) => p.id === activePaperId) || filteredPapers[0] || PAST_PAPERS_DATABASE[0];

  const handleAskTishaToExplain = (q: PastPaperQuestion) => {
    const langObj = ALL_11_LANGUAGES.find((l) => l.name === selectedLanguage) || ALL_11_LANGUAGES[0];
    updateLearningContext({
      gradeOrProgramme: activePaper.gradeName,
      subject: activePaper.subject,
      topic: `${activePaper.title} - ${q.questionNumber}`
    });
    if (setActiveLearningLanguage) {
      setActiveLearningLanguage(langObj.code);
    }
    const prompt = `Please explain ${activePaper.gradeName} ${activePaper.subject} ${activePaper.title} (${q.questionNumber}) in ${selectedLanguage} step-by-step: "${q.questionText}"`;
    sendMessageToTutor(prompt, 'explain', langObj.code).catch((err) => {
      console.warn('Auto send to tutor error:', err);
    });
    setCurrentTab('home');
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans antialiased selection:bg-[#FFD700] selection:text-black pb-24">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#0A1F44]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setCurrentTab('landing');
                if (typeof window !== 'undefined') window.history.pushState({}, '', '/');
              }}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </button>
            <div className="h-6 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <span className="text-xl">📚</span>
              <div>
                <h1 className="font-display font-black text-sm sm:text-base text-white tracking-wide leading-tight">
                  DBE Past Papers &amp; Memos
                </h1>
                <span className="text-[10px] text-[#FFB612] font-mono uppercase tracking-wider block">
                  Step-by-step memos in 11 South African languages
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {accessState.allow ? (
              <div className="px-3 py-1.5 rounded-full bg-[#007A4D]/30 border border-[#007A4D] text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Full Access Active ({accessState.daysRemaining}d left)</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={navigateToUnlock}
                  className="px-3 py-1.5 rounded-full border border-[#FFB612]/60 hover:bg-[#FFB612]/10 text-[#FFB612] font-bold text-xs transition-colors cursor-pointer flex items-center gap-1"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Enter Code</span>
                </button>
                <button
                  onClick={navigateToPaywall}
                  className="px-4 py-2 rounded-full bg-[#007A4D] hover:bg-emerald-600 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer transform hover:scale-105"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Unlock for R60</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Filter Banner */}
      <section className="bg-[#0A1F44] border-b border-white/10 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB612]/20 border border-[#FFB612]/40 text-[#FFB612] text-xs font-mono font-bold uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{accessState.allow ? '🎉 Free Week Active: All Questions & Full Step-by-Step Memos 100% Unlocked' : 'Free Preview: Questions 1 & 2 Full Memo Unlocked'}</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                Original DBE Past Papers &amp; Mother-Tongue Memos
              </h2>
              <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-2xl">
                Select your grade and subject to explore real national exam papers. We don&apos;t just give the answer &mdash; we explain each step in your language!
              </p>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px] md:w-80">
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search paper or topic (e.g. Algebra)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-black/40 border border-white/20 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#FFB612]"
              />
            </div>
          </div>

          {/* Grade Selector Pills */}
          <div className="pt-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-white/60 block mb-2 font-bold">
              1. Choose Grade:
            </span>
            <div className="flex flex-wrap gap-2">
              {ALL_GRADE_FILTERS.map((grade) => {
                const isSelected = selectedGrade === grade.id;
                return (
                  <button
                    key={grade.id}
                    onClick={() => handleGradeChange(grade.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFB612] text-black font-black shadow-md scale-105'
                        : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/10'
                    }`}
                  >
                    {grade.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subject Selector Pills (Dynamic per Grade) */}
          <div className="pt-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-white/60 block mb-2 font-bold">
              2. Choose Subject:
            </span>
            <div className="flex flex-wrap gap-2">
              {availableSubjectsForGrade.map((subj) => {
                const isSelected = selectedSubject === subj;
                return (
                  <button
                    key={subj}
                    onClick={() => setSelectedSubject(subj)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1E88E5] text-white font-bold shadow-md'
                        : 'bg-white/5 hover:bg-white/15 text-white/80 border border-white/10'
                    }`}
                  >
                    {subj}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area: Papers List + Paper Viewer */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Paper Selection (3 Free Previews) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/70">
                Available Exam Papers ({filteredPapers.length})
              </span>
              <span className="text-[11px] text-[#FFB612] font-bold">CAPS Aligned</span>
            </div>

            {filteredPapers.length === 0 ? (
              <div className="p-8 rounded-3xl bg-[#0D0D0D] border border-white/10 text-center text-white/60 text-xs">
                No past papers found for this combination. Showing all papers.
                <button
                  onClick={() => {
                    setSelectedGrade('all');
                    setSelectedSubject('All Subjects');
                  }}
                  className="mt-3 block mx-auto px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredPapers.map((paper) => {
                const isSelected = paper.id === activePaper.id;
                return (
                  <div
                    key={paper.id}
                    onClick={() => {
                      setActivePaperId(paper.id);
                      setSelectedPaper(paper);
                      setShowModal(true);
                    }}
                    className={`p-5 rounded-3xl border transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'bg-[#0A1F44] border-[#FFB612] shadow-xl'
                        : 'bg-[#0D0D0D] border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#007A4D]/30 border border-[#007A4D]/50 text-emerald-300 text-[10px] font-mono font-bold">
                        FREE PREVIEW
                      </span>
                      <span className="text-[11px] text-white/50 font-mono">
                        {paper.year} &bull; {paper.session}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-base text-white mb-1.5">
                      {paper.title}
                    </h3>

                    <div className="mb-2 text-[11px] text-amber-200/90 font-mono flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#FFB612] shrink-0" />
                      <span>Original English/Afrikaans + Explain in YOUR language [{selectedLanguage}]</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-white/60 pt-3 border-t border-white/10">
                      <span>{paper.gradeName} &bull; {paper.subject}</span>
                      <span className="text-[#FFB612] font-mono font-bold">{paper.totalMarks} Marks</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePaperId(paper.id);
                        setSelectedPaper(paper);
                        setShowModal(true);
                      }}
                      className="mt-3 w-full py-2.5 px-3 rounded-2xl bg-[#FFB612] hover:bg-yellow-400 text-black font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition-transform active:scale-95 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Open Exam Paper &amp; Full Memo</span>
                    </button>
                  </div>
                );
              })
            )}

            {/* Sticky Pricing / Unlock Card or Free Week Active Card */}
            {accessState.allow ? (
              <div className="p-6 rounded-3xl bg-[#007A4D]/20 border-2 border-[#007A4D] shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-emerald-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#FFB612]" />
                    <span>NEXOVIAN PREMIUM ACTIVE</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/40">
                    {accessState.daysRemaining}d Left
                  </span>
                </div>
                <div className="text-lg font-black text-white">
                  🎉 FREE WEEK ACTIVE &mdash; 7 Days Left
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  Full access is active! All 4,000+ past exam papers across Grade 4 to University with step-by-step memos in all 12 official languages (incl SASL 🤟) are completely unlocked.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setCurrentTab('home')}
                    className="w-full py-3 rounded-2xl bg-[#FFB612] hover:bg-yellow-400 text-black font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-transform active:scale-95"
                  >
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>Go to Tutor &mdash; Ask Anything</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-3xl bg-[#0A1F44] border-2 border-[#007A4D] shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-[#FFB612]">
                    NEXOVIAN PREMIUM
                  </span>
                  <span className="text-2xl font-black text-white">R60</span>
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  Unlock full step-by-step memos for all 4,000+ past exam papers across Grade 4 to University in 12 official languages (incl SASL 🤟).
                </p>
                <div className="space-y-2 text-xs text-white/90">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#007A4D]" />
                    <span>30 Days Full Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#007A4D]" />
                    <span>Instant Auto-Unlock via SnapScan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#007A4D]" />
                    <span>Zero Admin Waiting</span>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    onClick={navigateToPaywall}
                    className="w-full py-3 rounded-2xl bg-[#007A4D] hover:bg-emerald-600 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Pay R60 with SnapScan &mdash; 30 Days</span>
                  </button>
                  <button
                    onClick={navigateToUnlock}
                    className="w-full py-3 rounded-2xl bg-[#FFB612] hover:bg-yellow-400 text-black font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <KeyRound className="w-4 h-4 text-black" />
                    <span>Enter Code to Unlock</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Paper Questions & Memo Viewer */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Paper Header Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0c0c] border border-white/15 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FFB612] uppercase mb-1">
                    <span>{activePaper.gradeName}</span>
                    <span>&bull;</span>
                    <span>{activePaper.subject}</span>
                    <span>&bull;</span>
                    <span>{activePaper.duration}</span>
                  </div>
                  <h2 className="font-display font-black text-xl sm:text-2xl text-white">
                    {activePaper.title}
                  </h2>
                </div>

                {/* Language Switcher for Memo Explanation */}
                <div className="flex items-center gap-2 bg-black/60 p-2 rounded-2xl border border-white/10">
                  <Languages className="w-4 h-4 text-[#FFB612] shrink-0 ml-1" />
                  <span className="text-[11px] font-mono text-white/60">Memo Language:</span>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="bg-[#1a1a1a] text-white text-xs font-bold rounded-xl px-3 py-1.5 border border-white/20 focus:outline-none focus:border-[#FFB612] cursor-pointer"
                  >
                    {ALL_11_LANGUAGES.map((lang) => (
                      <option key={lang.name} value={lang.name}>
                        {lang.name} ({lang.native})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Questions List */}
              <div className="mt-6 space-y-6">
                {activePaper.questions.map((q, idx) => {
                  const isFree = idx < 2 || accessState.allow;
                  const structuredExp = generatePaperExplanation({
                    questionNumber: q.questionNumber,
                    questionText: q.questionText,
                    officialMemoEn: q.officialMemoEn,
                    marks: q.marks,
                    gradeName: activePaper.gradeName,
                    subject: activePaper.subject,
                    language: selectedLanguage,
                    topic: activePaper.title
                  });

                  return (
                    <div
                      key={q.id}
                      className="p-5 sm:p-6 rounded-3xl bg-[#141414] border border-white/10 shadow-lg relative overflow-hidden"
                    >
                      {/* Question Top Header */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-xl bg-white/10 font-mono font-bold text-xs text-[#FFB612]">
                            {q.questionNumber}
                          </span>
                          <span className="text-xs text-white/50 font-mono">[{q.marks} Marks]</span>
                        </div>

                        {isFree ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/40">
                            FREE MEMO
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold border border-amber-500/40 flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            <span>PREMIUM ONLY</span>
                          </span>
                        )}
                      </div>

                      {/* Official Exam Question Text */}
                      <div className="p-4 rounded-2xl bg-black/50 border border-white/10 mb-4 font-mono text-xs sm:text-sm text-white/90 leading-relaxed">
                        {q.questionText}
                      </div>

                      {/* Memo Content: Unlocked or Blurred + Lock */}
                      {isFree ? (
                        <div className="space-y-4">
                          {/* Official English Memo */}
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-white/80">
                            <span className="text-[#FFB612] font-bold block mb-1.5 flex items-center gap-2">
                              <FileText className="w-3.5 h-3.5 text-[#FFB612]" />
                              Official DBE Memo (Examiner&apos;s Solution &mdash; English):
                            </span>
                            <pre className="whitespace-pre-wrap font-mono text-xs text-white/90 leading-relaxed">
                              {q.officialMemoEn}
                            </pre>
                          </div>

                          {/* Mother Tongue Step-by-Step Breakdown */}
                          <div className="p-5 rounded-2xl bg-[#007A4D]/15 border border-[#007A4D]/50 text-white space-y-3">
                            <div className="flex items-center justify-between gap-2 border-b border-[#007A4D]/30 pb-2">
                              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-300 uppercase">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                <span>Step-by-Step Explanation in {selectedLanguage}</span>
                              </div>
                              <span className="text-[10px] font-mono text-emerald-200/80 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                                REAL DBE TEACHING
                              </span>
                            </div>

                            {/* What is asked */}
                            <div className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans font-medium">
                              <span className="text-amber-300 font-bold block mb-1">🎯 Umnyombo Wombuzo (What Question Asks):</span>
                              <p className="whitespace-pre-wrap">{structuredExp.whatIsAsked}</p>
                            </div>

                            {/* Keywords */}
                            {structuredExp.keywords.length > 0 && (
                              <div className="pt-2 border-t border-[#007A4D]/20">
                                <span className="text-emerald-300 font-bold text-xs block mb-1.5 font-mono">🔑 Amagama Abalulekile (Keywords in {selectedLanguage}):</span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {structuredExp.keywords.map((kw, kIdx) => (
                                    <div key={kIdx} className="p-2.5 rounded-xl bg-black/40 border border-white/10 text-xs">
                                      <span className="text-[#FFB612] font-bold block">{kw.term}</span>
                                      <span className="text-white/70 text-[11px]">{kw.explanation}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Step by step breakdown */}
                            <div className="pt-2 border-t border-[#007A4D]/20 space-y-2">
                              <span className="text-emerald-300 font-bold text-xs block font-mono">📝 Izinyathelo zokuxazulula (Steps 1, 2, 3):</span>
                              {structuredExp.steps.map((st) => (
                                <div key={st.stepNumber} className="flex items-start gap-2.5 text-xs text-white/90 bg-black/30 p-2.5 rounded-xl border border-white/5">
                                  <span className="w-5 h-5 rounded-full bg-[#FFB612] text-black font-black flex items-center justify-center shrink-0 text-[10px]">
                                    {st.stepNumber}
                                  </span>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between gap-2 mb-0.5">
                                      <span className="font-bold text-white">{st.title}</span>
                                      <span className="text-[#FFB612] font-mono text-[10px]">{st.markAllocation}</span>
                                    </div>
                                    <p className="text-white/80 text-[11px] leading-relaxed whitespace-pre-wrap">{st.detail}</p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Common mistakes */}
                            {structuredExp.commonMistakes.length > 0 && (
                              <div className="pt-2 border-t border-[#007A4D]/20 text-xs">
                                <span className="text-amber-400 font-bold block mb-1 font-mono">⚠️ Amaphutha avamile (Examiner Traps to Avoid):</span>
                                <ul className="list-disc list-inside space-y-0.5 text-white/80 text-[11px]">
                                  {structuredExp.commonMistakes.map((cm, cIdx) => (
                                    <li key={cIdx}>{cm}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Exam tip */}
                            <div className="p-2.5 rounded-xl bg-black/40 border border-[#FFB612]/30 text-[11px] text-[#FFB612] flex items-center gap-2">
                              <Sparkles className="w-4 h-4 shrink-0 text-[#FFB612]" />
                              <span><strong>Isu Lokuhlola:</strong> {structuredExp.examTip}</span>
                            </div>
                          </div>

                          {/* Action Button: Ask NEXOVIAN to Explain This Question in [selectedLanguage] */}
                          <button
                            onClick={() => handleAskTishaToExplain(q)}
                            className="w-full py-3 px-4 rounded-2xl bg-[#0A1F44] hover:bg-[#122e66] border-2 border-[#FFB612] text-[#FFB612] hover:text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-xl hover:shadow-[0_0_20px_rgba(255,182,18,0.3)] active:scale-[0.99]"
                          >
                            <Sparkles className="w-4 h-4 text-[#FFB612]" />
                            <span>🤖 Ask NEXOVIAN to Explain This Question in {selectedLanguage}</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="relative rounded-2xl overflow-hidden mt-3">
                          {/* Blurred Fake Memo Content */}
                          <div className="filter blur-md select-none pointer-events-none p-6 bg-white/5 border border-white/10 text-xs font-mono opacity-40">
                            <p className="text-[#FFB612] font-bold mb-2">
                              Official DBE Memo (Examiner&apos;s Solution):
                            </p>
                            <p>f&apos;(x) = lim[h-&gt;0] [3(x+h)² - 5(x+h) - (3x² - 5x)]/h = 6x - 5</p>
                            <p className="mt-3">
                              Step-by-Step in {selectedLanguage}: Ngokusho komthetho wezibalo...
                            </p>
                          </div>

                          {/* Lock Overlay with CTA */}
                          <div className="absolute inset-0 z-10 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center">
                            <div className="w-12 h-12 rounded-full bg-[#FFB612] text-black flex items-center justify-center mb-3 shadow-lg">
                              <Lock className="w-6 h-6 text-black" />
                            </div>
                            <h4 className="font-display font-black text-base sm:text-lg text-white mb-1">
                              Locked Question Memo
                            </h4>
                            <p className="text-xs text-white/70 max-w-sm mb-4 leading-relaxed">
                              First 2 questions are 100% free. Unlock the full step-by-step memo for all questions in this paper for R60.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-2.5">
                              <button
                                onClick={navigateToPaywall}
                                className="px-5 py-2.5 rounded-xl bg-[#007A4D] hover:bg-emerald-600 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer transform hover:scale-105"
                              >
                                <QrCode className="w-4 h-4" />
                                <span>Unlock Full Memo &mdash; R60</span>
                              </button>
                              <button
                                onClick={navigateToUnlock}
                                className="px-4 py-2.5 rounded-xl bg-[#FFB612] hover:bg-yellow-400 text-black font-black text-xs border border-white/20 cursor-pointer flex items-center gap-1.5"
                              >
                                <KeyRound className="w-3.5 h-3.5 text-black" />
                                <span>Enter Code to Unlock</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/10 text-center text-xs text-white/50">
          <p>
            NEXOVIAN (Pty) Ltd &bull; 100% CAPS Aligned &bull;{' '}
            <a
              href="https://wa.me/27636508381"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FFB612] hover:underline font-bold"
            >
              Need help? WhatsApp 063 650 8381
            </a>
          </p>
        </footer>
      </main>

      {/* PAPER DETAIL MODAL (Opens immediately on clicking any paper card) */}
      {showModal && selectedPaper && (
        <div className="fixed inset-0 z-[9999] bg-[#0a0a0a] overflow-y-auto">
          {/* Modal Header Bar */}
          <div className="sticky top-0 z-20 bg-[#0A1F44]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setSelectedPaper(null);
                }}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                aria-label="Close modal"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Close Paper</span>
              </button>
              <div className="h-6 w-px bg-white/20 hidden sm:block" />
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FFB612] uppercase">
                  <span>{selectedPaper.gradeName}</span>
                  <span>&bull;</span>
                  <span>{selectedPaper.subject}</span>
                  <span>&bull;</span>
                  <span>{selectedPaper.year}</span>
                </div>
                <h2 className="font-display font-black text-sm sm:text-lg text-white whitespace-pre-wrap max-w-[280px] sm:max-w-xl">
                  {selectedPaper.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Memo Language Switcher inside Modal */}
              <div className="flex items-center gap-1.5 bg-black/60 p-1.5 rounded-xl border border-white/10">
                <Languages className="w-3.5 h-3.5 text-[#FFB612] shrink-0 ml-1" />
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-[#1a1a1a] text-white text-xs font-bold rounded-lg px-2.5 py-1 border border-white/20 focus:outline-none focus:border-[#FFB612] cursor-pointer"
                >
                  {ALL_11_LANGUAGES.map((lang) => (
                    <option key={lang.name} value={lang.name}>
                      {lang.name} ({lang.native})
                    </option>
                  ))}
                </select>
              </div>

              {/* Close X Button */}
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setSelectedPaper(null);
                }}
                className="p-2 rounded-xl bg-white/10 hover:bg-red-500/20 hover:text-red-400 text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Paper Content Body */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
            {/* Paper Overview Badge Banner */}
            <div className="p-6 rounded-3xl bg-[#0c0c0c] border border-white/15 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-[#007A4D]/30 border border-[#007A4D] text-emerald-300 text-xs font-mono font-bold">
                    {accessState.allow ? '100% UNLOCKED' : 'FREE PREVIEW: QUESTIONS 1 & 2'}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#FFB612]/20 border border-[#FFB612]/40 text-[#FFB612] text-xs font-mono font-bold">
                    {selectedPaper.totalMarks} Total Marks
                  </span>
                </div>
                <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
                  {selectedPaper.title}
                </h1>
                <p className="text-xs sm:text-sm text-white/70 mt-1 font-mono">
                  {selectedPaper.session} &bull; Duration: {selectedPaper.duration}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const q1 = selectedPaper.questions[0];
                    if (q1) handleAskTishaToExplain(q1);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#FFB612] hover:bg-yellow-400 text-black font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Ask Tisha to Explain</span>
                </button>
              </div>
            </div>

            {/* Questions List inside Modal with Scroll Container */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs font-mono text-white/70">
              <span className="font-bold text-[#FFB612]">
                Complete National Paper &bull; {selectedPaper.questions.length} Questions
              </span>
              <span>Showing All Questions (Q1 to Q{selectedPaper.questions.length})</span>
            </div>

            <div className="space-y-6 overflow-y-auto max-h-[80vh] pr-1 scrollbar-thin">
              {selectedPaper.questions.map((q, idx) => {
                const isFree = idx < 2 || accessState.allow;
                const structuredExp = generatePaperExplanation({
                  questionNumber: q.questionNumber,
                  questionText: q.questionText,
                  officialMemoEn: q.officialMemoEn,
                  marks: q.marks,
                  gradeName: selectedPaper.gradeName,
                  subject: selectedPaper.subject,
                  language: selectedLanguage,
                  topic: selectedPaper.title
                });

                return (
                  <div
                    key={q.id}
                    className="p-5 sm:p-7 rounded-3xl bg-[#141414] border border-white/10 shadow-xl relative overflow-hidden"
                  >
                    {/* Question Header */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2.5">
                        <span className="px-3 py-1.5 rounded-xl bg-white/10 font-mono font-bold text-xs sm:text-sm text-[#FFB612]">
                          {q.questionNumber} ({idx + 1} of {selectedPaper.questions.length})
                        </span>
                        <span className="text-xs sm:text-sm text-white/60 font-mono">
                          [{q.marks} Marks]
                        </span>
                      </div>

                      {isFree ? (
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-mono font-bold border border-emerald-500/40">
                          FREE MEMO
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-mono font-bold border border-amber-500/40 flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5" />
                          <span>PREMIUM ONLY</span>
                        </span>
                      )}
                    </div>

                    {/* Question Text */}
                    <div className="p-5 rounded-2xl bg-black/60 border border-white/10 mb-5 font-mono text-xs sm:text-sm text-white/95 leading-relaxed">
                      {q.questionText}
                    </div>

                    {/* Memo Content: Unlocked or Locked */}
                    {isFree ? (
                      <div className="space-y-5">
                        {/* Official English Memo */}
                        <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm font-mono text-white/85">
                          <span className="text-[#FFB612] font-bold block mb-2 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#FFB612]" />
                            Official DBE Memo (Examiner&apos;s Solution &mdash; English):
                          </span>
                          <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm text-white/95 leading-relaxed">
                            {q.officialMemoEn}
                          </pre>
                        </div>

                        {/* Mother Tongue Step-by-Step Breakdown */}
                        <div className="p-5 sm:p-6 rounded-2xl bg-[#007A4D]/15 border border-[#007A4D]/50 text-white space-y-3.5">
                          <div className="flex items-center justify-between gap-2 border-b border-[#007A4D]/30 pb-2.5">
                            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-emerald-300 uppercase">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <span>Step-by-Step Explanation in {selectedLanguage}</span>
                            </div>
                            <span className="text-[10px] font-mono text-emerald-200/90 bg-emerald-950/70 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                              REAL DBE TEACHING
                            </span>
                          </div>

                          {/* What is asked */}
                          <div className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans font-medium">
                            <span className="text-amber-300 font-bold block mb-1">🎯 Umnyombo Wombuzo (What Question Asks):</span>
                            <p className="whitespace-pre-wrap">{structuredExp.whatIsAsked}</p>
                          </div>

                          {/* Keywords */}
                          {structuredExp.keywords.length > 0 && (
                            <div className="pt-2 border-t border-[#007A4D]/20">
                              <span className="text-emerald-300 font-bold text-xs block mb-1.5 font-mono">
                                🔑 Amagama Abalulekile (Keywords in {selectedLanguage}):
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {structuredExp.keywords.map((kw, kIdx) => (
                                  <div key={kIdx} className="p-2.5 rounded-xl bg-black/40 border border-white/10 text-xs">
                                    <span className="text-[#FFB612] font-bold block">{kw.term}</span>
                                    <span className="text-white/70 text-[11px]">{kw.explanation}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Step-by-step breakdown */}
                          <div className="pt-2 border-t border-[#007A4D]/20 space-y-2">
                            <span className="text-emerald-300 font-bold text-xs block mb-1 font-mono">
                              📝 Izinyathelo Zokuphendula (Step-by-Step Solution):
                            </span>
                            {structuredExp.steps.map((st, sIdx) => (
                              <div key={sIdx} className="p-3 rounded-xl bg-black/30 border border-white/5 flex items-start gap-2.5 text-xs">
                                <span className="w-5 h-5 rounded-full bg-[#FFB612]/20 text-[#FFB612] font-mono font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">
                                  {st.stepNumber}
                                </span>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between gap-2 mb-0.5">
                                    <span className="font-bold text-white">{st.title}</span>
                                    <span className="text-[#FFB612] font-mono text-[10px]">{st.markAllocation}</span>
                                  </div>
                                  <p className="text-white/80 text-[11px] leading-relaxed whitespace-pre-wrap">{st.detail}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Common mistakes */}
                          {structuredExp.commonMistakes.length > 0 && (
                            <div className="pt-2 border-t border-[#007A4D]/20 text-xs">
                              <span className="text-amber-400 font-bold block mb-1 font-mono">
                                ⚠️ Amaphutha avamile (Examiner Traps to Avoid):
                              </span>
                              <ul className="list-disc list-inside space-y-0.5 text-white/80 text-[11px]">
                                {structuredExp.commonMistakes.map((cm, cIdx) => (
                                  <li key={cIdx}>{cm}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Exam tip */}
                          <div className="p-3 rounded-xl bg-black/40 border border-[#FFB612]/30 text-xs text-[#FFB612] flex items-center gap-2">
                            <Sparkles className="w-4 h-4 shrink-0 text-[#FFB612]" />
                            <span><strong>Isu Lokuhlola:</strong> {structuredExp.examTip}</span>
                          </div>
                        </div>

                        {/* Action Button: Ask NEXOVIAN to Explain This Question */}
                        <button
                          type="button"
                          onClick={() => {
                            setShowModal(false);
                            handleAskTishaToExplain(q);
                          }}
                          className="w-full py-3 px-4 rounded-2xl bg-[#0A1F44] hover:bg-[#122e66] border-2 border-[#FFB612] text-[#FFB612] hover:text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-xl active:scale-[0.99]"
                        >
                          <Sparkles className="w-4 h-4 text-[#FFB612]" />
                          <span>🤖 Ask NEXOVIAN to Explain This Question in {selectedLanguage}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="relative rounded-2xl overflow-hidden mt-3">
                        {/* Blurred Fake Memo Content */}
                        <div className="filter blur-md select-none pointer-events-none p-6 bg-white/5 border border-white/10 text-xs font-mono opacity-40">
                          <p className="text-[#FFB612] font-bold mb-2">
                            Official DBE Memo (Examiner&apos;s Solution):
                          </p>
                          <p>f&apos;(x) = lim[h-&gt;0] [3(x+h)² - 5(x+h) - (3x² - 5x)]/h = 6x - 5</p>
                          <p className="mt-3">
                            Step-by-Step in {selectedLanguage}: Ngokusho komthetho wezibalo...
                          </p>
                        </div>

                        {/* Lock Overlay with CTA */}
                        <div className="absolute inset-0 z-10 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center">
                          <div className="w-12 h-12 rounded-full bg-[#FFB612] text-black flex items-center justify-center mb-3 shadow-lg">
                            <Lock className="w-6 h-6 text-black" />
                          </div>
                          <h4 className="font-display font-black text-base sm:text-lg text-white mb-1">
                            Locked Question Memo
                          </h4>
                          <p className="text-xs text-white/70 max-w-sm mb-4 leading-relaxed">
                            First 2 questions are 100% free. Unlock the full step-by-step memo for all questions in this paper for R60.
                          </p>

                          <div className="flex flex-col sm:flex-row items-center gap-2.5">
                            <button
                              type="button"
                              onClick={() => {
                                setShowModal(false);
                                navigateToPaywall();
                              }}
                              className="px-5 py-2.5 rounded-xl bg-[#007A4D] hover:bg-emerald-600 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer transform hover:scale-105"
                            >
                              <QrCode className="w-4 h-4" />
                              <span>Unlock Full Memo &mdash; R60</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setShowModal(false);
                                navigateToUnlock();
                              }}
                              className="px-4 py-2.5 rounded-xl bg-[#FFB612] hover:bg-yellow-400 text-black font-black text-xs border border-white/20 cursor-pointer flex items-center gap-1.5"
                            >
                              <KeyRound className="w-3.5 h-3.5 text-black" />
                              <span>Enter Code to Unlock</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
