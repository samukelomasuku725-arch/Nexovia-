/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ELECTRICAL TRADE THEORY TEXTBOOK — N3 (Chapters 9–12)
 * 100% Nexovian Original — Read Online Only.
 * Maths & formulas stay exact across all 11 official languages.
 */

import { TextbookChapter } from './officeAdminTypes';

export const ELECTRICAL_N3_CHAPTERS: TextbookChapter[] = [
  {
    id: 'elec-n3-ch9-three-phase',
    level: 4,
    chapterNumber: 9,
    chapterLabelByLanguage: {
      Xitsonga: 'N3 • Chapter 9',
      Sepedi: 'N3 • Chapter 9',
      isiZulu: 'N3 • Chapter 9',
      Tshivenda: 'N3 • Chapter 9',
      Sesotho: 'N3 • Chapter 9',
      Setswana: 'N3 • Chapter 9',
      Siswati: 'N3 • Chapter 9',
      isiNdebele: 'N3 • Chapter 9',
      isiXhosa: 'N3 • Chapter 9',
      Afrikaans: 'N3 • Chapter 9',
      English: 'N3 • Chapter 9'
    },
    titleByLanguage: {
      Xitsonga: 'Three Phase Systems - Star & Delta, Power Factor',
      Sepedi: 'Three Phase Systems - Star & Delta, Power Factor',
      isiZulu: 'Three Phase Systems - Star & Delta, Power Factor',
      Tshivenda: 'Three Phase Systems - Star & Delta, Power Factor',
      Sesotho: 'Three Phase Systems - Star & Delta, Power Factor',
      Setswana: 'Three Phase Systems - Star & Delta, Power Factor',
      Siswati: 'Three Phase Systems - Star & Delta, Power Factor',
      isiNdebele: 'Three Phase Systems - Star & Delta, Power Factor',
      isiXhosa: 'Three Phase Systems - Star & Delta, Power Factor',
      Afrikaans: 'Three Phase Systems - Star & Delta, Power Factor',
      English: 'Three Phase Systems - Star & Delta, Power Factor'
    },
    subtitleByLanguage: {
      Xitsonga: 'Star (V_L = √3·V_ph, I_L = I_ph) & Delta (V_L = V_ph, I_L = √3·I_ph), Power P = √3·V_L·I_L·cosθ',
      Sepedi: 'Star (Y) & Delta (Δ), Power Factor cosθ, True Power P = √3·V_L·I_L·cosθ',
      isiZulu: 'I-Star (Y) ne-Delta (Δ), i-Power Factor cosθ, P = √3·V_L·I_L·cosθ',
      Tshivenda: 'Star (Y) & Delta (Δ), Power Factor cosθ, P = √3·V_L·I_L·cosθ',
      Sesotho: 'Star (Y) & Delta (Δ), Power Factor cosθ, P = √3·V_L·I_L·cosθ',
      Setswana: 'Star (Y) & Delta (Δ), Power Factor cosθ, P = √3·V_L·I_L·cosθ',
      Siswati: 'Star (Y) & Delta (Δ), Power Factor cosθ, P = √3·V_L·I_L·cosθ',
      isiNdebele: 'Star (Y) & Delta (Δ), Power Factor cosθ, P = √3·V_L·I_L·cosθ',
      isiXhosa: 'Star (Y) & Delta (Δ), Power Factor cosθ, P = √3·V_L·I_L·cosθ',
      Afrikaans: 'Driefasige Stelsels — Ster (Y), Delta (Δ) & Arbeidsfaktor cosθ',
      English: 'Balanced 3-phase Star/Delta relationships, kW vs kVA & power factor'
    },
    summaryByLanguage: {
      Xitsonga:
        'Gezi ra 3-phase (400 V line-to-line eAfrika Dzonga) ri ni tiphase tinharhu leti hambaneke hi 120°. Eka Star (Y): V_L = √3 × V_ph naswona I_L = I_ph. Eka Delta (Δ): V_L = V_ph naswona I_L = √3 × I_ph. True Power i P = √3 × V_L × I_L × cosθ (W/kW), Apparent Power S = √3 × V_L × I_L (VA/kVA), na Power Factor cosθ = P ÷ S.',
      Sepedi:
        'Motlakase wa 3-phase o na le diphase tše tharo tše di aroganego ka 120°. Mo go Star: V_L = √3×V_ph, I_L = I_ph. Mo go Delta: V_L = V_ph, I_L = √3×I_ph. P = √3×V_L×I_L×cosθ.',
      isiZulu:
        'Ugesi we-3-phase unamaphase amathathu ahlukaniswe ngo-120°. Ku-Star: V_L = √3×V_ph, I_L = I_ph. Ku-Delta: V_L = V_ph, I_L = √3×I_ph. P = √3×V_L×I_L×cosθ.',
      Tshivenda:
        '3-phase i na phase tharu dzo fhambanaho nga 120°. Star: V_L = √3×V_ph, I_L = I_ph. Delta: V_L = V_ph, I_L = √3×I_ph. P = √3×V_L×I_L×cosθ.',
      Sesotho:
        '3-phase e na le diphase tse tharo tse arolwang ke 120°. Star: V_L = √3×V_ph, I_L = I_ph. Delta: V_L = V_ph, I_L = √3×I_ph.',
      Setswana:
        '3-phase e na le diphase tse tharo tse di kgaogantsweng ke 120°. Star: V_L = √3×V_ph, I_L = I_ph. Delta: V_L = V_ph, I_L = √3×I_ph.',
      Siswati: '3-phase inema-phase lamatsatfu. Star: V_L = √3×V_ph, I_L = I_ph. Delta: V_L = V_ph, I_L = √3×I_ph.',
      isiNdebele: 'I-3-phase inama-phase amathathu. Star: V_L = √3×V_ph, I_L = I_ph. Delta: V_L = V_ph, I_L = √3×I_ph.',
      isiXhosa: 'I-3-phase ineephases ezintathu. Star: V_L = √3×V_ph, I_L = I_ph. Delta: V_L = V_ph, I_L = √3×I_ph.',
      Afrikaans:
        'Driefasige stelsels het drie gelyke wisselspannings 120° uit fase (400 V / 230 V in SA). In Ster (Y): V_L = √3×V_ph en I_L = I_ph. In Delta (Δ): V_L = V_ph en I_L = √3×I_ph. Ware drywing P = √3×V_L×I_L×cosθ en arbeidsfaktor PF = cosθ = P ÷ S.',
      English:
        'Three-phase power (400 V line-to-line / 230 V phase-to-neutral in South Africa) uses three AC waveforms spaced 120° apart. In Star (Y): V_L = √3 × V_ph and I_L = I_ph. In Delta (Δ): V_L = V_ph and I_L = √3 × I_ph. Power: True Power P = √3 × V_L × I_L × cosθ (kW), Apparent Power S = √3 × V_L × I_L (kVA), and Power Factor = cosθ = P / S.'
    },
    keyTerms: [
      {
        termEn: 'Star Connection (Y)',
        translations: {
          Xitsonga: 'Nhlangano wa Star (Y) — V_L = √3·V_ph',
          Sepedi: 'Kgokagano ya Star (Y)',
          isiZulu: 'Ukuxhuma kwe-Star (Y)',
          Tshivenda: 'Thumano ya Star (Y)',
          Sesotho: 'Kgokahano ya Star (Y)',
          Setswana: 'Golagano ya Star (Y)',
          Siswati: 'Kuchuma kwe-Star (Y)',
          isiNdebele: 'Ukuthintana kwe-Star (Y)',
          isiXhosa: 'Uqhagamshelwano lwe-Star (Y)',
          Afrikaans: 'Sterverbinding (Y)',
          English: 'Four-wire system (3 phases + Neutral) giving 400 V & 230 V'
        },
        meaningByLanguage: {
          Xitsonga: 'Yi na Neutral point exikarhi; I_L = I_ph naswona V_ph = V_L ÷ √3 (400 ÷ 1.732 = 230.94 V).',
          Sepedi: 'E na le Neutral; I_L = I_ph gomme V_ph = V_L ÷ √3.',
          isiZulu: 'Ine-Neutral; I_L = I_ph kanti V_ph = V_L ÷ √3.',
          Tshivenda: 'I na Neutral; I_L = I_ph na V_ph = V_L ÷ √3.',
          Sesotho: 'E na le Neutral; I_L = I_ph mme V_ph = V_L ÷ √3.',
          Setswana: 'E na le Neutral; I_L = I_ph mme V_ph = V_L ÷ √3.',
          Siswati: 'Ine-Neutral; I_L = I_ph ne-V_ph = V_L ÷ √3.',
          isiNdebele: 'Ine-Neutral; I_L = I_ph no-V_ph = V_L ÷ √3.',
          isiXhosa: 'Ine-Neutral; I_L = I_ph no-V_ph = V_L ÷ √3.',
          Afrikaans: 'Het n sterpunt (Neutraal); V_L = √3 × V_ph en I_L = I_ph.',
          English: 'Common ends meet at the Neutral star point; provides both 400 V 3-phase and 230 V single-phase.'
        }
      },
      {
        termEn: 'Delta Connection (Δ)',
        translations: {
          Xitsonga: 'Nhlangano wa Delta (Δ) — I_L = √3·I_ph',
          Sepedi: 'Kgokagano ya Delta (Δ)',
          isiZulu: 'Ukuxhuma kwe-Delta (Δ)',
          Tshivenda: 'Thumano ya Delta (Δ)',
          Sesotho: 'Kgokahano ya Delta (Δ)',
          Setswana: 'Golagano ya Delta (Δ)',
          Siswati: 'Kuchuma kwe-Delta (Δ)',
          isiNdebele: 'Ukuthintana kwe-Delta (Δ)',
          isiXhosa: 'Uqhagamshelwano lwe-Delta (Δ)',
          Afrikaans: 'Deltaverbinding (Δ)',
          English: 'Closed triangle of 3 windings (V_L = V_ph, I_L = √3·I_ph)'
        },
        meaningByLanguage: {
          Xitsonga: 'A yi na Neutral; phase yinwana na yinwana yi amukela 400 V yo helela, naswona I_L = √3 × I_ph.',
          Sepedi: 'Ga e na Neutral; V_ph = V_L gomme I_L = √3 × I_ph.',
          isiZulu: 'Ayinayo i-Neutral; V_ph = V_L kanti I_L = √3 × I_ph.',
          Tshivenda: 'A i na Neutral; V_ph = V_L na I_L = √3 × I_ph.',
          Sesotho: 'Ha e na Neutral; V_ph = V_L mme I_L = √3 × I_ph.',
          Setswana: 'Ga e na Neutral; V_ph = V_L mme I_L = √3 × I_ph.',
          Siswati: 'Ayinayo Neutral; V_ph = V_L ne-I_L = √3 × I_ph.',
          isiNdebele: 'Ayinayo i-Neutral; V_ph = V_L no-I_L = √3 × I_ph.',
          isiXhosa: 'Ayinayo i-Neutral; V_ph = V_L no-I_L = √3 × I_ph.',
          Afrikaans: 'Geen neutraal; elke fase kry volle lynspanning (V_ph = V_L) en I_L = √3 × I_ph.',
          English: 'Windings form a closed loop with no neutral; each phase sees full 400 V line voltage.'
        }
      },
      {
        termEn: 'Power Factor (cosθ = P / S)',
        translations: {
          Xitsonga: 'Power Factor (cosθ = P ÷ S)',
          Sepedi: 'Power Factor (cosθ = P ÷ S)',
          isiZulu: 'I-Power Factor (cosθ = P ÷ S)',
          Tshivenda: 'Power Factor (cosθ = P ÷ S)',
          Sesotho: 'Power Factor (cosθ = P ÷ S)',
          Setswana: 'Power Factor (cosθ = P ÷ S)',
          Siswati: 'Power Factor (cosθ = P ÷ S)',
          isiNdebele: 'Power Factor (cosθ = P ÷ S)',
          isiXhosa: 'Power Factor (cosθ = P ÷ S)',
          Afrikaans: 'Arbeidsfaktor (cosθ = P ÷ S)',
          English: 'Ratio of working kW power P to total kVA power S (0 to 1)'
        },
        meaningByLanguage: {
          Xitsonga: 'Loko cosθ yi ri kusuhi na 1 (xik. 0.95), gezi ri tirhisiwa hi ndlela leyinene handle ko tlanga hi current.',
          Sepedi: 'Ge cosθ e le kgauswi le 1, mohlagase o šomišwa gabotse ka ntle le tahlegelo.',
          isiZulu: 'Uma u-cosθ esondele ku-1, amandla asetshenziswa ngaphandle kokulahleka okukhulu.',
          Tshivenda: 'Arali cosθ i tsini na 1, mudagasi u shuma zwavhudi.',
          Sesotho: 'Ha cosθ e le haufi le 1, motlakase o sebediswa hantle.',
          Setswana: 'Fa cosθ e le gaufi le 1, motlakase o dirisiwa sentle.',
          Siswati: 'Uma cosθ isondzele ku-1, gezi usetjentiswa kahle.',
          isiNdebele: 'Lokha i-cosθ itjhidele ku-1, igezi isetjenziswa kuhle.',
          isiXhosa: 'Xa i-cosθ ikufutshane ku-1, umbane usetyenziswa ngokufanelekileyo.',
          Afrikaans: 'Verhouding tussen ware drywing (kW) en skyndrywing (kVA); word met kapasitorbanke verbeter.',
          English: 'Measures how efficiently current converts to useful work; improved using capacitor banks.'
        }
      }
    ],
    workedExample: {
      questionByLanguage: {
        Xitsonga:
          'Load ya 3-phase Star yi tirha eka V_L = 400 V, yi koka line current I_L = 10 A hi power factor cosθ = 0.8. Hlayela: (a) phase voltage V_ph na phase current I_ph, (b) Apparent Power S (kVA), na (c) True Power P (kW).',
        Sepedi:
          'Load ya 3-phase Star e šoma go V_L = 400 V, I_L = 10 A, cosθ = 0.8. Bala: (a) V_ph le I_ph, (b) S (kVA), le (c) P (kW).',
        isiZulu:
          'I-3-phase Star load isebenza ku-V_L = 400 V, I_L = 10 A, cosθ = 0.8. Bala: (a) V_ph no-I_ph, (b) S (kVA), ne-(c) P (kW).',
        Tshivenda:
          '3-phase Star load kha V_L = 400 V, I_L = 10 A, cosθ = 0.8. Vhalelani: (a) V_ph na I_ph, (b) S (kVA), na (c) P (kW).',
        Sesotho:
          '3-phase Star load ho V_L = 400 V, I_L = 10 A, cosθ = 0.8. Bala: (a) V_ph le I_ph, (b) S (kVA), le (c) P (kW).',
        Setswana:
          '3-phase Star load mo V_L = 400 V, I_L = 10 A, cosθ = 0.8. Bala: (a) V_ph le I_ph, (b) S (kVA), le (c) P (kW).',
        Siswati:
          '3-phase Star load ku-V_L = 400 V, I_L = 10 A, cosθ = 0.8. Bala: (a) V_ph na-I_ph, (b) S (kVA), ne-(c) P (kW).',
        isiNdebele:
          '3-phase Star load ku-V_L = 400 V, I_L = 10 A, cosθ = 0.8. Bala: (a) V_ph no-I_ph, (b) S (kVA), no-(c) P (kW).',
        isiXhosa:
          '3-phase Star load ku-V_L = 400 V, I_L = 10 A, cosθ = 0.8. Bala: (a) V_ph no-I_ph, (b) S (kVA), no-(c) P (kW).',
        Afrikaans:
          'n Gebalanseerde 3-fase Ster-las werk op V_L = 400 V met I_L = 10 A by arbeidsfaktor cosθ = 0.8. Bereken: (a) V_ph en I_ph, (b) Skyndrywing S (kVA), en (c) Ware drywing P (kW).',
        English:
          'A balanced 3-phase Star-connected load runs on a V_L = 400 V supply, drawing line current I_L = 10 A at power factor cosθ = 0.8 lagging. Calculate: (a) phase voltage V_ph and phase current I_ph, (b) Apparent Power S (kVA), and (c) True Power P (kW).'
      },
      stepsByLanguage: {
        Xitsonga: [
          '(a) Eka Star (Y): V_ph = V_L ÷ √3 = 400 ÷ 1.732 = 230.94 V; I_ph = I_L = 10 A.',
          '(b) Apparent Power S = √3 × V_L × I_L = 1.732 × 400 × 10 = 6928 VA = 6.93 kVA.',
          '(c) True Power P = S × cosθ = 6928 × 0.8 = 5542.4 W = 5.54 kW.'
        ],
        Sepedi: [
          '(a) Star: V_ph = 400 ÷ 1.732 = 230.94 V; I_ph = I_L = 10 A.',
          '(b) S = 1.732 × 400 × 10 = 6928 VA = 6.93 kVA.',
          '(c) P = 6928 × 0.8 = 5542.4 W = 5.54 kW.'
        ],
        isiZulu: [
          '(a) Ku-Star: V_ph = 400 ÷ 1.732 = 230.94 V; I_ph = I_L = 10 A.',
          '(b) S = 1.732 × 400 × 10 = 6928 VA = 6.93 kVA.',
          '(c) P = 6928 × 0.8 = 5542.4 W = 5.54 kW.'
        ],
        Tshivenda: [
          '(a) V_ph = 400 ÷ 1.732 = 230.94 V; I_ph = 10 A.',
          '(b) S = 6928 VA = 6.93 kVA.',
          '(c) P = 5542.4 W = 5.54 kW.'
        ],
        Sesotho: [
          '(a) V_ph = 400 ÷ 1.732 = 230.94 V; I_ph = 10 A.',
          '(b) S = 6928 VA = 6.93 kVA.',
          '(c) P = 5542.4 W = 5.54 kW.'
        ],
        Setswana: [
          '(a) V_ph = 400 ÷ 1.732 = 230.94 V; I_ph = 10 A.',
          '(b) S = 6928 VA = 6.93 kVA.',
          '(c) P = 5542.4 W = 5.54 kW.'
        ],
        Siswati: [
          '(a) V_ph = 400 ÷ 1.732 = 230.94 V; I_ph = 10 A.',
          '(b) S = 6928 VA = 6.93 kVA.',
          '(c) P = 5542.4 W = 5.54 kW.'
        ],
        isiNdebele: [
          '(a) V_ph = 400 ÷ 1.732 = 230.94 V; I_ph = 10 A.',
          '(b) S = 6928 VA = 6.93 kVA.',
          '(c) P = 5542.4 W = 5.54 kW.'
        ],
        isiXhosa: [
          '(a) V_ph = 400 ÷ 1.732 = 230.94 V; I_ph = 10 A.',
          '(b) S = 6928 VA = 6.93 kVA.',
          '(c) P = 5542.4 W = 5.54 kW.'
        ],
        Afrikaans: [
          '(a) Ster: V_ph = V_L ÷ √3 = 400 ÷ 1.732 = 230.94 V; I_ph = I_L = 10 A.',
          '(b) S = √3 × V_L × I_L = 1.732 × 400 × 10 = 6928 VA = 6.93 kVA.',
          '(c) P = S × cosθ = 6928 × 0.8 = 5542.4 W = 5.54 kW.'
        ],
        English: [
          '(a) Star rules: V_ph = V_L ÷ √3 = 400 ÷ 1.732 = 230.94 V, and I_ph = I_L = 10 A.',
          '(b) Apparent Power: S = √3 × V_L × I_L = 1.732 × 400 × 10 = 6928 VA = 6.93 kVA.',
          '(c) True Power: P = √3 × V_L × I_L × cosθ = 6928 × 0.8 = 5542.4 W = 5.54 kW.'
        ]
      },
      finalAnswerByLanguage: {
        Xitsonga: '(a) V_ph = 230.94 V, I_ph = 10 A  |  (b) S = 6.93 kVA  |  (c) P = 5.54 kW',
        Sepedi: '(a) V_ph = 230.94 V, I_ph = 10 A  |  (b) S = 6.93 kVA  |  (c) P = 5.54 kW',
        isiZulu: '(a) V_ph = 230.94 V, I_ph = 10 A  |  (b) S = 6.93 kVA  |  (c) P = 5.54 kW',
        Tshivenda: '(a) V_ph = 230.94 V, I_ph = 10 A  |  (b) S = 6.93 kVA  |  (c) P = 5.54 kW',
        Sesotho: '(a) V_ph = 230.94 V, I_ph = 10 A  |  (b) S = 6.93 kVA  |  (c) P = 5.54 kW',
        Setswana: '(a) V_ph = 230.94 V, I_ph = 10 A  |  (b) S = 6.93 kVA  |  (c) P = 5.54 kW',
        Siswati: '(a) V_ph = 230.94 V, I_ph = 10 A  |  (b) S = 6.93 kVA  |  (c) P = 5.54 kW',
        isiNdebele: '(a) V_ph = 230.94 V, I_ph = 10 A  |  (b) S = 6.93 kVA  |  (c) P = 5.54 kW',
        isiXhosa: '(a) V_ph = 230.94 V, I_ph = 10 A  |  (b) S = 6.93 kVA  |  (c) P = 5.54 kW',
        Afrikaans: '(a) V_ph = 230.94 V, I_ph = 10 A  |  (b) S = 6.93 kVA  |  (c) P = 5.54 kW',
        English: '(a) V_ph = 230.94 V, I_ph = 10 A  |  (b) S = 6.93 kVA  |  (c) P = 5.54 kW'
      }
    },
    practiceQuestions: [
      {
        number: 1,
        questionByLanguage: {
          Xitsonga: 'Eka Delta (Δ) load ya 400 V leyi nga na I_ph = 10 A, kuma V_ph na line current I_L.',
          Sepedi: 'Mo go Delta (Δ) ya 400 V ka I_ph = 10 A, hwetša V_ph le I_L.',
          isiZulu: 'Ku-Delta (Δ) engu-400 V ene-I_ph = 10 A, thola u-V_ph no-I_L.',
          Tshivenda: 'Kha Delta (Δ) ya 400 V na I_ph = 10 A, wanani V_ph na I_L.',
          Sesotho: 'Ho Delta (Δ) ya 400 V ka I_ph = 10 A, fumana V_ph le I_L.',
          Setswana: 'Mo Delta (Δ) ya 400 V ka I_ph = 10 A, bona V_ph le I_L.',
          Siswati: 'Ku-Delta (Δ) ya-400 V na-I_ph = 10 A, tfola V_ph na-I_L.',
          isiNdebele: 'Ku-Delta (Δ) ye-400 V no-I_ph = 10 A, fumana u-V_ph no-I_L.',
          isiXhosa: 'Kwi-Delta (Δ) ye-400 V no-I_ph = 10 A, fumana u-V_ph no-I_L.',
          Afrikaans: 'In n Delta (Δ)-las op 400 V met I_ph = 10 A, bereken V_ph en lynstroom I_L.',
          English: 'In a Delta (Δ)-connected 3-phase load on 400 V with phase current I_ph = 10 A, find V_ph and line current I_L.'
        },
        answerByLanguage: {
          Xitsonga: 'Eka Delta: V_ph = V_L = 400 V; I_L = √3 × I_ph = 1.732 × 10 = 17.32 A.',
          Sepedi: 'Delta: V_ph = 400 V; I_L = 1.732 × 10 = 17.32 A.',
          isiZulu: 'Delta: V_ph = 400 V; I_L = 1.732 × 10 = 17.32 A.',
          Tshivenda: 'Delta: V_ph = 400 V; I_L = 17.32 A.',
          Sesotho: 'Delta: V_ph = 400 V; I_L = 17.32 A.',
          Setswana: 'Delta: V_ph = 400 V; I_L = 17.32 A.',
          Siswati: 'Delta: V_ph = 400 V; I_L = 17.32 A.',
          isiNdebele: 'Delta: V_ph = 400 V; I_L = 17.32 A.',
          isiXhosa: 'Delta: V_ph = 400 V; I_L = 17.32 A.',
          Afrikaans: 'Delta: V_ph = V_L = 400 V; I_L = √3 × I_ph = 1.732 × 10 = 17.32 A.',
          English: 'Delta rules: V_ph = V_L = 400 V, and I_L = √3 × I_ph = 1.732 × 10 = 17.32 A.'
        }
      },
      {
        number: 2,
        questionByLanguage: {
          Xitsonga: 'Hikwalaho ka yini tifeme ti tirhisa capacitor banks ku tlakusa power factor kusuka eka 0.7 ku ya eka 0.95?',
          Sepedi: 'Ke ka baka la eng difeme di šomiša capacitor banks go hlatloša power factor go tloga go 0.7 go ya go 0.95?',
          isiZulu: 'Kungani amafektri efaka ama-capacitor bank ukunyusa i-power factor kusuka ku-0.7 kuya ku-0.95?',
          Tshivenda: 'Ndi ngani dzifeme dzi tshi shumisa capacitor banks u khwinisa power factor?',
          Sesotho: 'Ke hobaneng ha difeme di sebedisa capacitor banks ho phahamisa power factor?',
          Setswana: 'Goreng difeme di dirisa capacitor banks go godisa power factor?',
          Siswati: 'Kungani emafektri afaka ema-capacitor bank kunyusa i-power factor?',
          isiNdebele: 'Kubayini amafektri afaka ama-capacitor bank ukukhuphula i-power factor?',
          isiXhosa: 'Kutheni iifektri zifaka ii-capacitor banks ukunyusa i-power factor?',
          Afrikaans: 'Waarom installeer fabrieke kapasitorbanke om arbeidsfaktor van 0.7 na 0.95 te verbeter?',
          English: 'Why do factories install capacitor banks to improve power factor from 0.7 to 0.95?'
        },
        answerByLanguage: {
          Xitsonga: 'Swi hunguta line current I_L ya kW leyi fanaka, swi hunguta ku hisa ka tikabel (I²R) na ku hakelela ka kVA leyo tala.',
          Sepedi: 'Go fokotša line current I_L, go fokotša phišo ya megala le ditefo tša kVA.',
          isiZulu: 'Kunciphisa i-line current I_L, kunciphisa ukushisa kwezintambo kanye nezindleko ze-kVA.',
          Tshivenda: 'U fhungudza line current I_L na mbadelo ya kVA.',
          Sesotho: 'Ho fokotsa line current I_L le ditefello tsa kVA.',
          Setswana: 'Go fokotsa line current I_L le dituelo tsa kVA.',
          Siswati: 'Kunciphisa i-line current I_L netindleko te-kVA.',
          isiNdebele: 'Ukunciphisa i-line current I_L neendleko ze-kVA.',
          isiXhosa: 'Ukunciphisa i-line current I_L neendleko ze-kVA.',
          Afrikaans: 'Hoër arbeidsfaktor verminder lynstroom I_L vir dieselfde kW, sny I²R-verliese en vermy kVA-boetes.',
          English: 'Raising power factor lowers line current I_L for the same useful kW output, cutting cable I²R heat losses and utility maximum-demand kVA charges.'
        }
      }
    ]
  },
  {
    id: 'elec-n3-ch10-induction-motors',
    level: 4,
    chapterNumber: 10,
    chapterLabelByLanguage: {
      Xitsonga: 'N3 • Chapter 10',
      Sepedi: 'N3 • Chapter 10',
      isiZulu: 'N3 • Chapter 10',
      Tshivenda: 'N3 • Chapter 10',
      Sesotho: 'N3 • Chapter 10',
      Setswana: 'N3 • Chapter 10',
      Siswati: 'N3 • Chapter 10',
      isiNdebele: 'N3 • Chapter 10',
      isiXhosa: 'N3 • Chapter 10',
      Afrikaans: 'N3 • Chapter 10',
      English: 'N3 • Chapter 10'
    },
    titleByLanguage: {
      Xitsonga: 'Induction Motors - 3-Phase Motors, Starters',
      Sepedi: 'Induction Motors - 3-Phase Motors, Starters',
      isiZulu: 'Induction Motors - 3-Phase Motors, Starters',
      Tshivenda: 'Induction Motors - 3-Phase Motors, Starters',
      Sesotho: 'Induction Motors - 3-Phase Motors, Starters',
      Setswana: 'Induction Motors - 3-Phase Motors, Starters',
      Siswati: 'Induction Motors - 3-Phase Motors, Starters',
      isiNdebele: 'Induction Motors - 3-Phase Motors, Starters',
      isiXhosa: 'Induction Motors - 3-Phase Motors, Starters',
      Afrikaans: 'Induction Motors - 3-Phase Motors, Starters',
      English: 'Induction Motors - 3-Phase Motors, Starters'
    },
    subtitleByLanguage: {
      Xitsonga: 'Rotating Magnetic Field (N_s = 120f/P), Slip %, DOL & Star-Delta Starters',
      Sepedi: 'Synchronous Speed (N_s = 120f/P), Slip %, DOL & Star-Delta Starters',
      isiZulu: 'I-Synchronous Speed (N_s = 120f/P), i-Slip %, ama-Starter e-DOL ne-Star-Delta',
      Tshivenda: 'Synchronous Speed (N_s = 120f/P), Slip %, DOL & Star-Delta',
      Sesotho: 'Synchronous Speed (N_s = 120f/P), Slip %, DOL & Star-Delta',
      Setswana: 'Synchronous Speed (N_s = 120f/P), Slip %, DOL & Star-Delta',
      Siswati: 'Synchronous Speed (N_s = 120f/P), Slip %, DOL & Star-Delta',
      isiNdebele: 'Synchronous Speed (N_s = 120f/P), Slip %, DOL & Star-Delta',
      isiXhosa: 'Synchronous Speed (N_s = 120f/P), Slip %, DOL & Star-Delta',
      Afrikaans: 'Sinchronespoed (N_s = 120f/P), Glip %, DOL- en Ster-Delta-aansitters',
      English: 'Squirrel-cage 3-phase motors, synchronous speed, slip, DOL & Star-Delta starters'
    },
    summaryByLanguage: {
      Xitsonga:
        '3-Phase Induction Motor yi tirhisa ndzhawu ya maginete leyi rhendzelekaka eka Stator leyi fambaka hi synchronous speed N_s = (120 × f) ÷ P. Rotor yi rhendzeleka hakatsongo ehansi ka N_s (N_r < N_s) hi ku ya hi Slip s = ((N_s − N_r) ÷ N_s) × 100%. Ti-motor letikulu ti sunguriwa hi Star-Delta Starter ku hunguta starting current.',
      Sepedi:
        '3-Phase Induction Motor e šomiša synchronous speed N_s = (120 × f) ÷ P. Rotor e sepela ka lebelo la N_r < N_s gomme Slip s = ((N_s − N_r) ÷ N_s) × 100%.',
      isiZulu:
        'I-3-Phase Induction Motor isebenzisa i-synchronous speed N_s = (120 × f) ÷ P. I-rotor ijikeleza nge-N_r < N_s bese i-Slip s = ((N_s − N_r) ÷ N_s) × 100%.',
      Tshivenda:
        '3-Phase Induction Motor i na N_s = (120 × f) ÷ P na Slip s = ((N_s − N_r) ÷ N_s) × 100%.',
      Sesotho:
        '3-Phase Induction Motor e na le N_s = (120 × f) ÷ P le Slip s = ((N_s − N_r) ÷ N_s) × 100%.',
      Setswana:
        '3-Phase Induction Motor e na le N_s = (120 × f) ÷ P le Slip s = ((N_s − N_r) ÷ N_s) × 100%.',
      Siswati: '3-Phase Induction Motor ine-N_s = (120 × f) ÷ P ne-Slip s = ((N_s − N_r) ÷ N_s) × 100%.',
      isiNdebele: 'I-3-Phase Induction Motor ine-N_s = (120 × f) ÷ P ne-Slip s = ((N_s − N_r) ÷ N_s) × 100%.',
      isiXhosa: 'I-3-Phase Induction Motor ine-N_s = (120 × f) ÷ P ne-Slip s = ((N_s − N_r) ÷ N_s) × 100%.',
      Afrikaans:
        'Driefasige induksiemotors skep n draaiende magneetveld teen sinchronespoed N_s = (120 × f) ÷ P. Die rotor draai effens stadiger teen N_r, wat glip s = ((N_s − N_r) ÷ N_s) × 100% gee. Ster-Delta-aansitters beperk aanloopstroom.',
      English:
        'A 3-phase squirrel-cage induction motor produces a rotating magnetic field in the stator at Synchronous Speed N_s = (120 × f) ÷ P (rpm). The rotor lags slightly behind at speed N_r so lines of flux are cut to induce rotor torque; this difference is Slip s = ((N_s − N_r) ÷ N_s) × 100%. Large motors use Star-Delta starters to limit inrush current.'
    },
    keyTerms: [
      {
        termEn: 'Synchronous Speed (N_s = 120f / P)',
        translations: {
          Xitsonga: 'Rivilo ra Maginete — N_s = (120 × f) ÷ P',
          Sepedi: 'Lebelo la Synchronous — N_s = (120 × f) ÷ P',
          isiZulu: 'Isivinini se-Synchronous — N_s = (120 × f) ÷ P',
          Tshivenda: 'Synchronous Speed — N_s = (120 × f) ÷ P',
          Sesotho: 'Synchronous Speed — N_s = (120 × f) ÷ P',
          Setswana: 'Synchronous Speed — N_s = (120 × f) ÷ P',
          Siswati: 'Synchronous Speed — N_s = (120 × f) ÷ P',
          isiNdebele: 'Synchronous Speed — N_s = (120 × f) ÷ P',
          isiXhosa: 'Synchronous Speed — N_s = (120 × f) ÷ P',
          Afrikaans: 'Sinchronespoed — N_s = (120 × f) ÷ P',
          English: 'Speed of rotating stator magnetic field in rpm'
        },
        meaningByLanguage: {
          Xitsonga: 'Eka 50 Hz: 2 poles = 3000 rpm, 4 poles = 1500 rpm, 6 poles = 1000 rpm.',
          Sepedi: 'Go 50 Hz: 2 poles = 3000 rpm, 4 poles = 1500 rpm, 6 poles = 1000 rpm.',
          isiZulu: 'Ku-50 Hz: 2 poles = 3000 rpm, 4 poles = 1500 rpm, 6 poles = 1000 rpm.',
          Tshivenda: 'Kha 50 Hz: 2 poles = 3000 rpm, 4 poles = 1500 rpm.',
          Sesotho: 'Ho 50 Hz: 2 poles = 3000 rpm, 4 poles = 1500 rpm.',
          Setswana: 'Mo 50 Hz: 2 poles = 3000 rpm, 4 poles = 1500 rpm.',
          Siswati: 'Ku-50 Hz: 2 poles = 3000 rpm, 4 poles = 1500 rpm.',
          isiNdebele: 'Ku-50 Hz: 2 poles = 3000 rpm, 4 poles = 1500 rpm.',
          isiXhosa: 'Ku-50 Hz: 2 poles = 3000 rpm, 4 poles = 1500 rpm.',
          Afrikaans: 'By 50 Hz: 2 pole = 3000 opm; 4 pole = 1500 opm; 6 pole = 1000 opm.',
          English: 'At 50 Hz: 2-pole = 3000 rpm, 4-pole = 1500 rpm, 6-pole = 1000 rpm.'
        }
      },
      {
        termEn: 'Percentage Slip (s%)',
        translations: {
          Xitsonga: 'Ku Sala Endzhaku — Slip s%',
          Sepedi: 'Slip s% = ((N_s − N_r) ÷ N_s) × 100',
          isiZulu: 'I-Slip s% = ((N_s − N_r) ÷ N_s) × 100',
          Tshivenda: 'Slip s% = ((N_s − N_r) ÷ N_s) × 100',
          Sesotho: 'Slip s% = ((N_s − N_r) ÷ N_s) × 100',
          Setswana: 'Slip s% = ((N_s − N_r) ÷ N_s) × 100',
          Siswati: 'Slip s% = ((N_s − N_r) ÷ N_s) × 100',
          isiNdebele: 'Slip s% = ((N_s − N_r) ÷ N_s) × 100',
          isiXhosa: 'Slip s% = ((N_s − N_r) ÷ N_s) × 100',
          Afrikaans: 'Persentasie Glip (s%)',
          English: 'Difference between N_s and rotor speed N_r (typically 2%–5%)'
        },
        meaningByLanguage: {
          Xitsonga: 'Handle ka slip a ku nga vi na current eka rotor naswona motor a yi nga rhendzeleki.',
          Sepedi: 'Ntle le slip ga go na rotor torque; ka tlwaelo ke 2%–5% ge e rwele morwalo.',
          isiZulu: 'Ngaphandle kwe-slip i-rotor ayikwazi ukukhiqiza amandla okujikeleza.',
          Tshivenda: 'Nga nnda ha slip motor a i koni u mona.',
          Sesotho: 'Ntle le slip motor ha e sebetse.',
          Setswana: 'Kwa ntle ga slip motor ga e dikologe.',
          Siswati: 'Ngaphandle kwe-slip i-motor ngeke ijikelete.',
          isiNdebele: 'Ngaphandle kwe-slip i-motor ayikghoni ukujikeleza.',
          isiXhosa: 'Ngaphandle kwe-slip i-motor ayinakujikeleza.',
          Afrikaans: 'Noodsaaklik vir geïnduseerde rotorstroom en wringkrag; tipies 2%–5% by vollas.',
          English: 'Required for torque production (if N_r = N_s, zero flux is cut and torque drops to zero).'
        }
      },
      {
        termEn: 'DOL vs Star-Delta Starter',
        translations: {
          Xitsonga: 'Xisungulo xa Motor (DOL vs Star-Delta)',
          Sepedi: 'DOL vs Star-Delta Starter',
          isiZulu: 'I-DOL vs Star-Delta Starter',
          Tshivenda: 'DOL vs Star-Delta Starter',
          Sesotho: 'DOL vs Star-Delta Starter',
          Setswana: 'DOL vs Star-Delta Starter',
          Siswati: 'DOL vs Star-Delta Starter',
          isiNdebele: 'DOL vs Star-Delta Starter',
          isiXhosa: 'DOL vs Star-Delta Starter',
          Afrikaans: 'DOL- teenoor Ster-Delta-aansitter',
          English: 'DOL = full voltage start; Star-Delta = 1/3 starting current'
        },
        meaningByLanguage: {
          Xitsonga: 'Star-Delta yi sungula motor hi Star ku hunguta current hi 3×, kutani timer yi cinca yi ya eka Delta.',
          Sepedi: 'Star-Delta e thoma ka Star go fokotša starting current ka 1/3 pele e fetela go Delta.',
          isiZulu: 'I-Star-Delta iqala nge-Star ukunciphisa i-current ngesithathu bese ishintshela ku-Delta.',
          Tshivenda: 'Star-Delta i thoma nga Star ya fhungudza current nga 1/3.',
          Sesotho: 'Star-Delta e qala ka Star ho fokotsa current ka 1/3.',
          Setswana: 'Star-Delta e simolola ka Star go fokotsa current ka 1/3.',
          Siswati: 'Star-Delta icala nge-Star kunciphisa current nge-1/3.',
          isiNdebele: 'Star-Delta ithoma nge-Star ukunciphisa i-current nge-1/3.',
          isiXhosa: 'Star-Delta iqala nge-Star ukunciphisa umsinga nge-1/3.',
          Afrikaans: 'Ster-aansluiting verlaag fasespanning na 58% en sny lynstroom tot een derde tydens aanloop.',
          English: 'Star-Delta connects windings in Star on start (reducing line inrush current to 1/3 of DOL) then switches to Delta at speed.'
        }
      }
    ],
    workedExample: {
      questionByLanguage: {
        Xitsonga:
          '4-pole, 3-phase induction motor yi tirha eka f = 50 Hz. Rivilo ra rotor i N_r = 1440 rpm. Hlayela: (a) synchronous speed N_s, na (b) percentage slip s%.',
        Sepedi:
          '4-pole, 3-phase motor e šoma go 50 Hz ka N_r = 1440 rpm. Bala: (a) N_s, le (b) percentage slip s%.',
        isiZulu:
          'I-4-pole, 3-phase motor isebenza ku-50 Hz nge-N_r = 1440 rpm. Bala: (a) N_s, ne-(b) percentage slip s%.',
        Tshivenda:
          '4-pole, 3-phase motor kha 50 Hz na N_r = 1440 rpm. Vhalelani: (a) N_s, na (b) slip s%.',
        Sesotho:
          '4-pole, 3-phase motor ho 50 Hz ka N_r = 1440 rpm. Bala: (a) N_s, le (b) slip s%.',
        Setswana:
          '4-pole, 3-phase motor mo 50 Hz ka N_r = 1440 rpm. Bala: (a) N_s, le (b) slip s%.',
        Siswati:
          '4-pole, 3-phase motor ku-50 Hz na-N_r = 1440 rpm. Bala: (a) N_s, ne-(b) slip s%.',
        isiNdebele:
          '4-pole, 3-phase motor ku-50 Hz no-N_r = 1440 rpm. Bala: (a) N_s, ne-(b) slip s%.',
        isiXhosa:
          '4-pole, 3-phase motor ku-50 Hz no-N_r = 1440 rpm. Bala: (a) N_s, ne-(b) slip s%.',
        Afrikaans:
          'n 4-pool, 3-fase induksiemotor loop op f = 50 Hz teen rotorspoed N_r = 1440 opm. Bereken: (a) sinchronespoed N_s, en (b) persentasie glip s%.',
        English:
          'A 4-pole, 3-phase squirrel-cage induction motor operates on a f = 50 Hz supply at a full-load rotor speed N_r = 1440 rpm. Calculate: (a) synchronous speed N_s, and (b) percentage slip s%.'
      },
      stepsByLanguage: {
        Xitsonga: [
          '(a) N_s = (120 × f) ÷ P = (120 × 50) ÷ 4 = 6000 ÷ 4 = 1500 rpm.',
          '(b) Slip s = ((N_s − N_r) ÷ N_s) × 100 = ((1500 − 1440) ÷ 1500) × 100 = (60 ÷ 1500) × 100 = 4%.'
        ],
        Sepedi: [
          '(a) N_s = (120 × 50) ÷ 4 = 1500 rpm.',
          '(b) s = ((1500 − 1440) ÷ 1500) × 100 = (60 ÷ 1500) × 100 = 4%.'
        ],
        isiZulu: [
          '(a) N_s = (120 × 50) ÷ 4 = 1500 rpm.',
          '(b) s = ((1500 − 1440) ÷ 1500) × 100 = (60 ÷ 1500) × 100 = 4%.'
        ],
        Tshivenda: [
          '(a) N_s = (120 × 50) ÷ 4 = 1500 rpm.',
          '(b) s = (60 ÷ 1500) × 100 = 4%.'
        ],
        Sesotho: [
          '(a) N_s = (120 × 50) ÷ 4 = 1500 rpm.',
          '(b) s = (60 ÷ 1500) × 100 = 4%.'
        ],
        Setswana: [
          '(a) N_s = (120 × 50) ÷ 4 = 1500 rpm.',
          '(b) s = (60 ÷ 1500) × 100 = 4%.'
        ],
        Siswati: [
          '(a) N_s = (120 × 50) ÷ 4 = 1500 rpm.',
          '(b) s = (60 ÷ 1500) × 100 = 4%.'
        ],
        isiNdebele: [
          '(a) N_s = (120 × 50) ÷ 4 = 1500 rpm.',
          '(b) s = (60 ÷ 1500) × 100 = 4%.'
        ],
        isiXhosa: [
          '(a) N_s = (120 × 50) ÷ 4 = 1500 rpm.',
          '(b) s = (60 ÷ 1500) × 100 = 4%.'
        ],
        Afrikaans: [
          '(a) N_s = (120 × f) ÷ P = (120 × 50) ÷ 4 = 6000 ÷ 4 = 1500 opm.',
          '(b) Glip s = ((1500 − 1440) ÷ 1500) × 100 = (60 ÷ 1500) × 100 = 4%.'
        ],
        English: [
          '(a) Synchronous speed: N_s = (120 × f) ÷ P = (120 × 50) ÷ 4 = 6000 ÷ 4 = 1500 rpm.',
          '(b) Percentage slip: s = ((N_s − N_r) ÷ N_s) × 100 = ((1500 − 1440) ÷ 1500) × 100 = (60 ÷ 1500) × 100 = 4%.'
        ]
      },
      finalAnswerByLanguage: {
        Xitsonga: '(a) N_s = 1500 rpm  |  (b) Slip s = 4%',
        Sepedi: '(a) N_s = 1500 rpm  |  (b) Slip s = 4%',
        isiZulu: '(a) N_s = 1500 rpm  |  (b) Slip s = 4%',
        Tshivenda: '(a) N_s = 1500 rpm  |  (b) Slip s = 4%',
        Sesotho: '(a) N_s = 1500 rpm  |  (b) Slip s = 4%',
        Setswana: '(a) N_s = 1500 rpm  |  (b) Slip s = 4%',
        Siswati: '(a) N_s = 1500 rpm  |  (b) Slip s = 4%',
        isiNdebele: '(a) N_s = 1500 rpm  |  (b) Slip s = 4%',
        isiXhosa: '(a) N_s = 1500 rpm  |  (b) Slip s = 4%',
        Afrikaans: '(a) N_s = 1500 opm  |  (b) Glip s = 4%',
        English: '(a) N_s = 1500 rpm  |  (b) Slip s = 4%'
      }
    },
    practiceQuestions: [
      {
        number: 1,
        questionByLanguage: {
          Xitsonga: 'U nga hundzuluxa njhani tlhelo ro rhendzeleka ka 3-phase induction motor?',
          Sepedi: 'O ka fetola bjang thoko ya modikologo ya 3-phase motor?',
          isiZulu: 'Ungalishintsha kanjani uhlangothi lokujikeleza kwe-3-phase induction motor?',
          Tshivenda: 'Ni nga shandukisa hani sia la u mona ha 3-phase motor?',
          Sesotho: 'O ka fetola jwang tsela ya ho dikoloha ha 3-phase motor?',
          Setswana: 'O ka fetola jang ntlha ya modikologo ya 3-phase motor?',
          Siswati: 'Ungalishintja njani luhlangotsi lwekujikeleta kwe-3-phase motor?',
          isiNdebele: 'Ungatjhugulula njani indlela yokujikeleza kwe-3-phase motor?',
          isiXhosa: 'Ungalitshintsha njani icala lokujikeleza kwe-3-phase motor?',
          Afrikaans: 'Hoe keer jy die draairigting van n 3-fase induksiemotor om?',
          English: 'How do you reverse the direction of rotation of a 3-phase induction motor?'
        },
        answerByLanguage: {
          Xitsonga: 'Cinca (swap) ti-phase timbirhi eka tinharhu leti nghenaka (xik. L1 na L2) u siya ya vunharhu yi nga cincanga.',
          Sepedi: 'Fapanyetša megala e mebedi ya diphase (mohl. L1 le L2), o tlogele wa boraro o sa fetoge.',
          isiZulu: 'Shintsha izintambo ezimbili ze-phase (isib. L1 no-L2) ushiye eyesithathu injalo.',
          Tshivenda: 'Shandukisani darata mbili dza phase (L1 na L2).',
          Sesotho: 'Fapanya dithapo tse pedi tsa phase (L1 le L2).',
          Setswana: 'Fapanya megala e mebedi ya diphase (L1 le L2).',
          Siswati: 'Shintjana tintsambo letimbili te-phase (L1 na-L2).',
          isiNdebele: 'Tjhugulula iintambo ezimbili ze-phase (L1 no-L2).',
          isiXhosa: 'Tshintsha iintambo ezimbini ze-phase (L1 no-L2).',
          Afrikaans: 'Ruil enige twee van die drie toevoerlyne om (bv. ruil L1 en L2 om) terwyl L3 onveranderd bly.',
          English: 'Swap any two of the three incoming supply phase conductors (e.g. swap L1 and L2) while leaving the third phase unchanged.'
        }
      },
      {
        number: 2,
        questionByLanguage: {
          Xitsonga: 'Hikwalaho ka yini Star-Delta starter yi tirhisiwa eka ti-motor letikulu ku tlula DOL?',
          Sepedi: 'Ke ka baka la eng Star-Delta starter e šomišwa go di-motor tše dikgolo?',
          isiZulu: 'Kungani i-Star-Delta starter isetshenziswa kuma-motor amakhulu kunokusebenzisa i-DOL?',
          Tshivenda: 'Ndi ngani Star-Delta starter i tshi shumiswa kha dzi-motor khulwane?',
          Sesotho: 'Ke hobaneng ha Star-Delta starter e sebediswa ho di-motor tse kgolo?',
          Setswana: 'Goreng Star-Delta starter e dirisiwa mo di-motor tse dikgolo?',
          Siswati: 'Kungani i-Star-Delta starter isetjentiswa kuma-motor lamakhulu?',
          isiNdebele: 'Kubayini i-Star-Delta starter isetjenziswa kuma-motor amakhulu?',
          isiXhosa: 'Kutheni i-Star-Delta starter isetyenziswa kwiimota ezinkulu?',
          Afrikaans: 'Waarom word n Ster-Delta-aansitter op groter motors bo n DOL-aansitter verkies?',
          English: 'Why is a Star-Delta starter preferred over Direct-On-Line (DOL) for motors above 7.5 kW?'
        },
        answerByLanguage: {
          Xitsonga: 'Ku sungula hi Star swi hunguta phase voltage yi ya eka 58%, leswi hungutaka starting line current hi 1/3 (33%) ku sivela ku wa ka gezi.',
          Sepedi: 'Go thoma ka Star go fokotša starting line current go 1/3 (33%) ya DOL gore go se ke gwa wa voltage.',
          isiZulu: 'Ukuqala nge-Star kunciphisa i-starting current ibe ngu-1/3 (33%) ye-DOL ukuze kungabi khona ukuwa kwe-voltage.',
          Tshivenda: 'U thoma nga Star zwi fhungudza starting current u ya kha 1/3.',
          Sesotho: 'Ho qala ka Star ho fokotsa starting current ho ba 1/3.',
          Setswana: 'Go simolola ka Star go fokotsa starting current go nna 1/3.',
          Siswati: 'Kucala nge-Star kunciphisa starting current ibe ngu-1/3.',
          isiNdebele: 'Ukuthoma nge-Star kunciphisa i-starting current ibe ngu-1/3.',
          isiXhosa: 'Ukuqala nge-Star kunciphisa i-starting current ibe yi-1/3.',
          Afrikaans: 'Ster verminder fasespanning na 1/√3 (58%) en beperk aanloopstroom en -wringkrag tot 1/3 van Delta DOL.',
          English: 'Starting in Star reduces phase voltage to 1/√3 (58%), cutting starting line current and torque to 1/3 (33%) of DOL values before switching to Delta.'
        }
      }
    ]
  },
  {
    id: 'elec-n3-ch11-measuring-instruments',
    level: 4,
    chapterNumber: 11,
    chapterLabelByLanguage: {
      Xitsonga: 'N3 • Chapter 11',
      Sepedi: 'N3 • Chapter 11',
      isiZulu: 'N3 • Chapter 11',
      Tshivenda: 'N3 • Chapter 11',
      Sesotho: 'N3 • Chapter 11',
      Setswana: 'N3 • Chapter 11',
      Siswati: 'N3 • Chapter 11',
      isiNdebele: 'N3 • Chapter 11',
      isiXhosa: 'N3 • Chapter 11',
      Afrikaans: 'N3 • Chapter 11',
      English: 'N3 • Chapter 11'
    },
    titleByLanguage: {
      Xitsonga: 'Measuring Instruments - Multimeter, Megger, Wattmeter',
      Sepedi: 'Measuring Instruments - Multimeter, Megger, Wattmeter',
      isiZulu: 'Measuring Instruments - Multimeter, Megger, Wattmeter',
      Tshivenda: 'Measuring Instruments - Multimeter, Megger, Wattmeter',
      Sesotho: 'Measuring Instruments - Multimeter, Megger, Wattmeter',
      Setswana: 'Measuring Instruments - Multimeter, Megger, Wattmeter',
      Siswati: 'Measuring Instruments - Multimeter, Megger, Wattmeter',
      isiNdebele: 'Measuring Instruments - Multimeter, Megger, Wattmeter',
      isiXhosa: 'Measuring Instruments - Multimeter, Megger, Wattmeter',
      Afrikaans: 'Measuring Instruments - Multimeter, Megger, Wattmeter',
      English: 'Measuring Instruments - Multimeter, Megger, Wattmeter'
    },
    subtitleByLanguage: {
      Xitsonga: 'Multimeter (Ammeter Series, Voltmeter Parallel), Megger (MΩ) & Two-Wattmeter Method',
      Sepedi: 'Multimeter, Megger (MΩ) & Two-Wattmeter Method (P_T = W₁ + W₂)',
      isiZulu: 'I-Multimeter, i-Megger (MΩ) ne-Two-Wattmeter Method (P_T = W₁ + W₂)',
      Tshivenda: 'Multimeter, Megger (MΩ) & Two-Wattmeter Method (P_T = W₁ + W₂)',
      Sesotho: 'Multimeter, Megger (MΩ) & Two-Wattmeter Method (P_T = W₁ + W₂)',
      Setswana: 'Multimeter, Megger (MΩ) & Two-Wattmeter Method (P_T = W₁ + W₂)',
      Siswati: 'Multimeter, Megger (MΩ) & Two-Wattmeter Method (P_T = W₁ + W₂)',
      isiNdebele: 'Multimeter, Megger (MΩ) & Two-Wattmeter Method (P_T = W₁ + W₂)',
      isiXhosa: 'Multimeter, Megger (MΩ) & Two-Wattmeter Method (P_T = W₁ + W₂)',
      Afrikaans: 'Multimeter, Megger-isolasietoetser (MΩ) en Twee-Wattmeter-metode',
      English: 'Using multimeters, shunts/multipliers, Megger insulation testing & wattmeters'
    },
    summaryByLanguage: {
      Xitsonga:
        'Swipimi swa gezi swi katsa Multimeter (yo pima Volts, Amps, Ohms), Megger (yo pima insulation resistance hi MΩ eka 500 V/1000 V DC loko gezi ri timiwile) na Wattmeter (yo pima Watts). Eka 3-phase, Two-Wattmeter Method yi nyika P_T = W₁ + W₂. Ku kurisa voltmeter ku tirhisiwa series multiplier R_s.',
      Sepedi:
        'Didirišwa tša go ela ke Multimeter, Megger (e ela insulation resistance ka MΩ) le Wattmeter (P_T = W₁ + W₂ go 3-phase).',
      isiZulu:
        'Amathuluzi okukala yilezi: i-Multimeter, i-Megger (ikala i-insulation resistance nge-MΩ) ne-Wattmeter (P_T = W₁ + W₂ ku-3-phase).',
      Tshivenda:
        'Multimeter i kala V, A, Ω; Megger i kala MΩ; Wattmeter i kala P_T = W₁ + W₂.',
      Sesotho:
        'Multimeter e lekanya V, A, Ω; Megger e lekanya MΩ; Wattmeter P_T = W₁ + W₂.',
      Setswana:
        'Multimeter e lekanya V, A, Ω; Megger e lekanya MΩ; Wattmeter P_T = W₁ + W₂.',
      Siswati: 'Multimeter ikala V, A, Ω; Megger ikala MΩ; Wattmeter P_T = W₁ + W₂.',
      isiNdebele: 'Multimeter ikala V, A, Ω; Megger ikala MΩ; Wattmeter P_T = W₁ + W₂.',
      isiXhosa: 'Multimeter ilinganisa V, A, Ω; Megger ilinganisa MΩ; Wattmeter P_T = W₁ + W₂.',
      Afrikaans:
        'Meetinstrumente sluit Multimeters (V, A, Ω), Megger-isolasietoetsers (in MΩ op dooie stroombane) en Wattmeters (P_T = W₁ + W₂ vir 3-fase) in. Voltmeters brei reikafstand uit met n seriemultiplikator R_s.',
      English:
        'Electrical measurement relies on the Multimeter (Volts in parallel, Amps in series, Ohms dead), the Megger insulation resistance tester (injects 500 V–1000 V DC on isolated circuits, reading in MΩ), and the Wattmeter (combines current + voltage coils; total 3-phase power P_T = W₁ + W₂). Voltmeter ranges extend via a series multiplier resistor R_s.'
    },
    keyTerms: [
      {
        termEn: 'Digital Multimeter & Clamp Meter',
        translations: {
          Xitsonga: 'Multimeter & Clamp Meter',
          Sepedi: 'Multimeter & Clamp Meter',
          isiZulu: 'I-Multimeter ne-Clamp Meter',
          Tshivenda: 'Multimeter & Clamp Meter',
          Sesotho: 'Multimeter & Clamp Meter',
          Setswana: 'Multimeter & Clamp Meter',
          Siswati: 'Multimeter & Clamp Meter',
          isiNdebele: 'Multimeter & Clamp Meter',
          isiXhosa: 'Multimeter & Clamp Meter',
          Afrikaans: 'Digitale Multimeter en Klampmeter',
          English: 'All-in-one meter for Voltage, Current & Resistance'
        },
        meaningByLanguage: {
          Xitsonga: 'Clamp meter yi pima AC current handle ko tsema waya hi ku veka mahlo eka conductor yinwe.',
          Sepedi: 'Clamp meter e ela AC current ntle le go kgaola terata.',
          isiZulu: 'I-clamp meter ikala ugelezi ngaphandle kokunqamula intambo.',
          Tshivenda: 'Clamp meter i kala current i songo tshea darata.',
          Sesotho: 'Clamp meter e lekanya current ntle le ho kgaola terata.',
          Setswana: 'Clamp meter e lekanya current kwa ntle ga go kgaola terata.',
          Siswati: 'Clamp meter ikala current ngaphandle kwekujuba lucingo.',
          isiNdebele: 'I-clamp meter ikala i-current ngaphandle kokusika intambo.',
          isiXhosa: 'I-clamp meter ilinganisa umsinga ngaphandle kokusika ucingo.',
          Afrikaans: 'Klampmeter meet lasstroom sonder om die geleier te ontkoppel deur om een geleier te klem.',
          English: 'Clamp meters measure high AC current safely without breaking the circuit by clamping around one conductor.'
        }
      },
      {
        termEn: 'Megger (Insulation Tester)',
        translations: {
          Xitsonga: 'Megger — Xipimi xa Insulation (MΩ)',
          Sepedi: 'Megger (MΩ Insulation Tester)',
          isiZulu: 'I-Megger (MΩ Insulation Tester)',
          Tshivenda: 'Megger (MΩ Insulation Tester)',
          Sesotho: 'Megger (MΩ Insulation Tester)',
          Setswana: 'Megger (MΩ Insulation Tester)',
          Siswati: 'Megger (MΩ Insulation Tester)',
          isiNdebele: 'Megger (MΩ Insulation Tester)',
          isiXhosa: 'Megger (MΩ Insulation Tester)',
          Afrikaans: 'Megger-isolasietoetser (MΩ)',
          English: 'High-voltage DC tester verifying cable insulation in Mega-ohms'
        },
        meaningByLanguage: {
          Xitsonga: 'Yi tirhisiwa ntsena loko gezi ri timiwile; SANS yi lava ≥ 1 MΩ exikarhi ka tiwaya na earth.',
          Sepedi: 'E šomišwa ge mohlagase o timilwe; SANS e nyaka ≥ 1 MΩ.',
          isiZulu: 'Isetshenziswa kuphela uma ugesi ucishiwe; i-SANS idinga ≥ 1 MΩ.',
          Tshivenda: 'I shumiswa musi mudagasi wo dzimiwa; SANS i toda ≥ 1 MΩ.',
          Sesotho: 'E sebediswa ha motlakase o timilwe; SANS e batla ≥ 1 MΩ.',
          Setswana: 'E dirisiwa fa motlakase o timilwe; SANS e batla ≥ 1 MΩ.',
          Siswati: 'Isetjentiswa uma gezi ucishiwe; SANS idzinga ≥ 1 MΩ.',
          isiNdebele: 'Isetjenziswa lokha igezi icinyiwe; i-SANS ifuna ≥ 1 MΩ.',
          isiXhosa: 'Isetyenziswa xa umbane ucinyiwe; i-SANS ifuna ≥ 1 MΩ.',
          Afrikaans: 'Toets slegs op geïsoleerde stroombane; SANS 10142-1 vereis ≥ 1 MΩ.',
          English: 'Must ONLY be used on isolated dead circuits with sensitive electronics disconnected; SANS requires ≥ 1 MΩ.'
        }
      },
      {
        termEn: 'Wattmeter (P_T = W₁ + W₂)',
        translations: {
          Xitsonga: 'Wattmeter — P_T = W₁ + W₂',
          Sepedi: 'Wattmeter — P_T = W₁ + W₂',
          isiZulu: 'I-Wattmeter — P_T = W₁ + W₂',
          Tshivenda: 'Wattmeter — P_T = W₁ + W₂',
          Sesotho: 'Wattmeter — P_T = W₁ + W₂',
          Setswana: 'Wattmeter — P_T = W₁ + W₂',
          Siswati: 'Wattmeter — P_T = W₁ + W₂',
          isiNdebele: 'Wattmeter — P_T = W₁ + W₂',
          isiXhosa: 'Wattmeter — P_T = W₁ + W₂',
          Afrikaans: 'Wattmeter — P_T = W₁ + W₂',
          English: 'Measures true electrical power (Watts / kW) directly'
        },
        meaningByLanguage: {
          Xitsonga: 'Yi na current coil (series) na voltage coil (parallel) ku pima V × I × cosθ.',
          Sepedi: 'E na le current coil (series) le voltage coil (parallel) go ela Watts.',
          isiZulu: 'Ine-current coil (series) ne-voltage coil (parallel) ukukala ama-Watts.',
          Tshivenda: 'I na current coil na voltage coil u kala Watts.',
          Sesotho: 'E na le current coil le voltage coil ho lekanya Watts.',
          Setswana: 'E na le current coil le voltage coil go lekanya Watts.',
          Siswati: 'Ine-current coil ne-voltage coil kukala ema-Watts.',
          isiNdebele: 'Ine-current coil ne-voltage coil ukukala ama-Watts.',
          isiXhosa: 'Ine-current coil ne-voltage coil ukulinganisa ii-Watts.',
          Afrikaans: 'Bevat n stroomspoel in serie en n spanningspoel in parallel om ware drywing (W) te meet.',
          English: 'Two-wattmeter method sums W₁ + W₂ to measure total balanced or unbalanced 3-phase 3-wire power.'
        }
      }
    ],
    workedExample: {
      questionByLanguage: {
        Xitsonga:
          'U pima 3-phase load hi Two-Wattmeter Method: W₁ = 4200 W na W₂ = 1800 W. Nakambe ku ndlandlamuxa voltmeter ya 0–10 V (R_m = 500 Ω, I_fsd = 20 mA) leswaku yi pima 0–100 V: Hlayela (a) total 3-phase power P_T, na (b) series multiplier resistor R_s.',
        Sepedi:
          'Go Two-Wattmeter Method: W₁ = 4200 W le W₂ = 1800 W. Voltmeter ya 0–10 V (R_m = 500 Ω, I_fsd = 20 mA) e katološwa go 0–100 V. Bala: (a) P_T, le (b) series multiplier R_s.',
        isiZulu:
          'Ku-Two-Wattmeter Method: W₁ = 4200 W no-W₂ = 1800 W. I-Voltmeter ye-0–10 V (R_m = 500 Ω, I_fsd = 20 mA) yandiswa iye ku-0–100 V. Bala: (a) P_T, ne-(b) R_s.',
        Tshivenda:
          'W₁ = 4200 W, W₂ = 1800 W. Voltmeter (R_m = 500 Ω, I_fsd = 20 mA) i ya kha 100 V. Vhalelani: (a) P_T, na (b) R_s.',
        Sesotho:
          'W₁ = 4200 W, W₂ = 1800 W. Voltmeter (R_m = 500 Ω, I_fsd = 20 mA) ho 100 V. Bala: (a) P_T, le (b) R_s.',
        Setswana:
          'W₁ = 4200 W, W₂ = 1800 W. Voltmeter (R_m = 500 Ω, I_fsd = 20 mA) go 100 V. Bala: (a) P_T, le (b) R_s.',
        Siswati:
          'W₁ = 4200 W, W₂ = 1800 W. Voltmeter (R_m = 500 Ω, I_fsd = 20 mA) ku-100 V. Bala: (a) P_T, ne-(b) R_s.',
        isiNdebele:
          'W₁ = 4200 W, W₂ = 1800 W. Voltmeter (R_m = 500 Ω, I_fsd = 20 mA) ku-100 V. Bala: (a) P_T, ne-(b) R_s.',
        isiXhosa:
          'W₁ = 4200 W, W₂ = 1800 W. Voltmeter (R_m = 500 Ω, I_fsd = 20 mA) ku-100 V. Bala: (a) P_T, ne-(b) R_s.',
        Afrikaans:
          'By die Twee-Wattmeter-metode lees W₁ = 4200 W en W₂ = 1800 W. Om n 0–10 V voltmeter (R_m = 500 Ω, I_fsd = 20 mA) uit te brei na 0–100 V, bereken: (a) totale drywing P_T, en (b) seriemultiplikator R_s.',
        English:
          'Measuring a 3-phase load with the Two-Wattmeter Method gives W₁ = 4200 W and W₂ = 1800 W. To extend a 0–10 V voltmeter (coil R_m = 500 Ω, full-scale I_fsd = 20 mA) to read 0–100 V, calculate: (a) total 3-phase power P_T, and (b) required series multiplier resistor R_s.'
      },
      stepsByLanguage: {
        Xitsonga: [
          '(a) P_T = W₁ + W₂ = 4200 + 1800 = 6000 W = 6.0 kW.',
          '(b) Cinca I_fsd: 20 mA = 0.02 A. R_total = V_new ÷ I_fsd = 100 ÷ 0.02 = 5000 Ω.',
          'Series Multiplier R_s = R_total − R_m = 5000 − 500 = 4500 Ω (4.5 kΩ).'
        ],
        Sepedi: [
          '(a) P_T = 4200 + 1800 = 6000 W = 6.0 kW.',
          '(b) I_fsd = 0.02 A -> R_total = 100 ÷ 0.02 = 5000 Ω.',
          'R_s = 5000 − 500 = 4500 Ω (4.5 kΩ).'
        ],
        isiZulu: [
          '(a) P_T = 4200 + 1800 = 6000 W = 6.0 kW.',
          '(b) I_fsd = 0.02 A -> R_total = 100 ÷ 0.02 = 5000 Ω.',
          'R_s = 5000 − 500 = 4500 Ω (4.5 kΩ).'
        ],
        Tshivenda: [
          '(a) P_T = 4200 + 1800 = 6000 W (6.0 kW).',
          '(b) R_total = 100 ÷ 0.02 = 5000 Ω. R_s = 5000 − 500 = 4500 Ω.'
        ],
        Sesotho: [
          '(a) P_T = 4200 + 1800 = 6000 W (6.0 kW).',
          '(b) R_total = 100 ÷ 0.02 = 5000 Ω. R_s = 5000 − 500 = 4500 Ω.'
        ],
        Setswana: [
          '(a) P_T = 4200 + 1800 = 6000 W (6.0 kW).',
          '(b) R_total = 100 ÷ 0.02 = 5000 Ω. R_s = 5000 − 500 = 4500 Ω.'
        ],
        Siswati: [
          '(a) P_T = 4200 + 1800 = 6000 W (6.0 kW).',
          '(b) R_total = 100 ÷ 0.02 = 5000 Ω. R_s = 5000 − 500 = 4500 Ω.'
        ],
        isiNdebele: [
          '(a) P_T = 4200 + 1800 = 6000 W (6.0 kW).',
          '(b) R_total = 100 ÷ 0.02 = 5000 Ω. R_s = 5000 − 500 = 4500 Ω.'
        ],
        isiXhosa: [
          '(a) P_T = 4200 + 1800 = 6000 W (6.0 kW).',
          '(b) R_total = 100 ÷ 0.02 = 5000 Ω. R_s = 5000 − 500 = 4500 Ω.'
        ],
        Afrikaans: [
          '(a) P_T = W₁ + W₂ = 4200 + 1800 = 6000 W = 6.0 kW.',
          '(b) I_fsd = 20 mA = 0.02 A. R_totaal = 100 ÷ 0.02 = 5000 Ω.',
          'R_s = R_totaal − R_m = 5000 − 500 = 4500 Ω (4.5 kΩ).'
        ],
        English: [
          '(a) Two-Wattmeter total power: P_T = W₁ + W₂ = 4200 + 1800 = 6000 W = 6.0 kW.',
          '(b) Convert I_fsd = 20 mA = 0.02 A. Total resistance needed for 100 V: R_total = V_new ÷ I_fsd = 100 ÷ 0.02 = 5000 Ω.',
          'Subtract coil resistance: Series Multiplier R_s = R_total − R_m = 5000 − 500 = 4500 Ω (4.5 kΩ).'
        ]
      },
      finalAnswerByLanguage: {
        Xitsonga: '(a) P_T = 6000 W (6.0 kW)  |  (b) R_s = 4500 Ω (4.5 kΩ)',
        Sepedi: '(a) P_T = 6000 W (6.0 kW)  |  (b) R_s = 4500 Ω (4.5 kΩ)',
        isiZulu: '(a) P_T = 6000 W (6.0 kW)  |  (b) R_s = 4500 Ω (4.5 kΩ)',
        Tshivenda: '(a) P_T = 6000 W (6.0 kW)  |  (b) R_s = 4500 Ω',
        Sesotho: '(a) P_T = 6000 W (6.0 kW)  |  (b) R_s = 4500 Ω',
        Setswana: '(a) P_T = 6000 W (6.0 kW)  |  (b) R_s = 4500 Ω',
        Siswati: '(a) P_T = 6000 W (6.0 kW)  |  (b) R_s = 4500 Ω',
        isiNdebele: '(a) P_T = 6000 W (6.0 kW)  |  (b) R_s = 4500 Ω',
        isiXhosa: '(a) P_T = 6000 W (6.0 kW)  |  (b) R_s = 4500 Ω',
        Afrikaans: '(a) P_T = 6000 W (6.0 kW)  |  (b) R_s = 4500 Ω (4.5 kΩ)',
        English: '(a) P_T = 6000 W (6.0 kW)  |  (b) R_s = 4500 Ω (4.5 kΩ)'
      }
    },
    practiceQuestions: [
      {
        number: 1,
        questionByLanguage: {
          Xitsonga: 'Ammeter yi hlanganisiwa njhani eka circuit ku hambana na Voltmeter, naswona hikwalaho ka yini?',
          Sepedi: 'Ammeter e kgokaganywa bjang mo seketing ge e bapišwa le Voltmeter?',
          isiZulu: 'I-Ammeter ixhunywa kanjani uma iqhathaniswa ne-Voltmeter, futhi ngani?',
          Tshivenda: 'Ammeter i thumanyiwa hani u fhambana na Voltmeter?',
          Sesotho: 'Ammeter e hokelwa jwang ha e bapiswa le Voltmeter?',
          Setswana: 'Ammeter e golaganngwa jang fa e bapisiwa le Voltmeter?',
          Siswati: 'Ammeter ichunywa njani uma icathaniswa ne-Voltmeter?',
          isiNdebele: 'I-Ammeter ithintaniswa njani nayiqathaniswa ne-Voltmeter?',
          isiXhosa: 'I-Ammeter iqhagamshelwa njani xa ithelekiswa ne-Voltmeter?',
          Afrikaans: 'Hoe word n Ammeter teenoor n Voltmeter in n stroombaan gekoppel, en waarom?',
          English: 'How is an Ammeter connected compared to a Voltmeter, and why?'
        },
        answerByLanguage: {
          Xitsonga: 'Ammeter hi Series (yi na resistance leyitsongo ngopfu leswaku current hinkwayo yi hundza); Voltmeter hi Parallel (yi na resistance leyikulu leswaku yi nga teki current).',
          Sepedi: 'Ammeter ka Series (kganetšo e nnyane); Voltmeter ka Parallel (kganetšo e kgolo kudu).',
          isiZulu: 'I-Ammeter nge-Series (i-resistance encane); i-Voltmeter nge-Parallel (i-resistance enkulu).',
          Tshivenda: 'Ammeter nga Series; Voltmeter nga Parallel.',
          Sesotho: 'Ammeter ka Series; Voltmeter ka Parallel.',
          Setswana: 'Ammeter ka Series; Voltmeter ka Parallel.',
          Siswati: 'Ammeter nge-Series; Voltmeter nge-Parallel.',
          isiNdebele: 'Ammeter nge-Series; Voltmeter nge-Parallel.',
          isiXhosa: 'Ammeter nge-Series; Voltmeter nge-Parallel.',
          Afrikaans: 'Ammeter in Serie (lae interne weerstand); Voltmeter in Parallel (baie hoë interne weerstand).',
          English: 'Ammeter is connected in Series (very low internal resistance so all circuit current passes through); Voltmeter is connected in Parallel (very high resistance so minimal current is drawn).'
        }
      },
      {
        number: 2,
        questionByLanguage: {
          Xitsonga: 'U nga si tirhisa Megger eka kabel, u fanele ku endla yini naswona nhlayo leyitsongo yo pfumeleriwa hi SANS i yini?',
          Sepedi: 'Pele o šomiša Megger o swanetše go dira eng gomme SANS e nyaka MΩ efe?',
          isiZulu: 'Ngaphambi kokusebenzisa i-Megger kumele wenzeni futhi iyiphi inombolo encane evunyelwe yi-SANS?',
          Tshivenda: 'Ni sa thu shumisa Megger ni ita mini, nahone SANS i toda MΩ nngafhani?',
          Sesotho: 'Pele o sebedisa Megger o etsa eng mme SANS e batla MΩ efe?',
          Setswana: 'Pele o dirisa Megger o dira eng mme SANS e batla MΩ efe?',
          Siswati: 'Ngaphambi kwekusebentisa Megger wentani futsi SANS idzinga MΩ ngakhi?',
          isiNdebele: 'Ngaphambi kokusebenzisa i-Megger wenzani begodu i-SANS ifuna MΩ engangani?',
          isiXhosa: 'Phambi kokusebenzisa i-Megger wenza ntoni kwaye i-SANS ifuna MΩ engaphi?',
          Afrikaans: 'Wat moet jy doen voordat jy n Megger gebruik, en wat is die minimum aanvaarbare SANS-lesing?',
          English: 'What safety steps are required before Megger testing a cable, and what is the SANS minimum acceptable reading?'
        },
        answerByLanguage: {
          Xitsonga: 'Tima gezi u kambela leswaku a ku na voltage, susa switirhisiwa swa electronic; SANS yi lava ≥ 1 MΩ.',
          Sepedi: 'Tima mohlagase o netefatše gore ga go na voltage; SANS e nyaka ≥ 1 MΩ.',
          isiZulu: 'Cima ugesi uhlole ukuthi awusekho, khipha ama-electronics; i-SANS idinga ≥ 1 MΩ.',
          Tshivenda: 'Dzimani mudagasi; SANS i toda ≥ 1 MΩ.',
          Sesotho: 'Tima motlakase; SANS e batla ≥ 1 MΩ.',
          Setswana: 'Tima motlakase; SANS e batla ≥ 1 MΩ.',
          Siswati: 'Cima gezi; SANS idzinga ≥ 1 MΩ.',
          isiNdebele: 'Cima igezi; i-SANS ifuna ≥ 1 MΩ.',
          isiXhosa: 'Cima umbane; i-SANS ifuna ≥ 1 MΩ.',
          Afrikaans: 'Isoleer die stroombaan, toets dood, ontkoppel elektronika; SANS vereis minstens 1 MΩ (≥ 1 MΩ).',
          English: 'Isolate and prove dead, disconnect sensitive electronics, and discharge cables after testing; SANS requires at least 1 MΩ (≥ 1 MΩ).'
        }
      }
    ]
  },
  {
    id: 'elec-n3-ch12-installation-regulations',
    level: 4,
    chapterNumber: 12,
    chapterLabelByLanguage: {
      Xitsonga: 'N3 • Chapter 12',
      Sepedi: 'N3 • Chapter 12',
      isiZulu: 'N3 • Chapter 12',
      Tshivenda: 'N3 • Chapter 12',
      Sesotho: 'N3 • Chapter 12',
      Setswana: 'N3 • Chapter 12',
      Siswati: 'N3 • Chapter 12',
      isiNdebele: 'N3 • Chapter 12',
      isiXhosa: 'N3 • Chapter 12',
      Afrikaans: 'N3 • Chapter 12',
      English: 'N3 • Chapter 12'
    },
    titleByLanguage: {
      Xitsonga: 'Installation & Regulations - Wiring, SANS, Fault Finding',
      Sepedi: 'Installation & Regulations - Wiring, SANS, Fault Finding',
      isiZulu: 'Installation & Regulations - Wiring, SANS, Fault Finding',
      Tshivenda: 'Installation & Regulations - Wiring, SANS, Fault Finding',
      Sesotho: 'Installation & Regulations - Wiring, SANS, Fault Finding',
      Setswana: 'Installation & Regulations - Wiring, SANS, Fault Finding',
      Siswati: 'Installation & Regulations - Wiring, SANS, Fault Finding',
      isiNdebele: 'Installation & Regulations - Wiring, SANS, Fault Finding',
      isiXhosa: 'Installation & Regulations - Wiring, SANS, Fault Finding',
      Afrikaans: 'Installation & Regulations - Wiring, SANS, Fault Finding',
      English: 'Installation & Regulations - Wiring, SANS, Fault Finding'
    },
    subtitleByLanguage: {
      Xitsonga: 'Ku Waya ka Tiyindlu, SANS 10142-1, Voltage Drop (<5%), COC & Fault Finding',
      Sepedi: 'Go Waya, SANS 10142-1, Voltage Drop (<5%), COC & Fault Finding',
      isiZulu: 'Ukufaka Izintambo, i-SANS 10142-1, i-Voltage Drop (<5%), i-COC & Fault Finding',
      Tshivenda: 'Wiring, SANS 10142-1, Voltage Drop (<5%), COC & Fault Finding',
      Sesotho: 'Wiring, SANS 10142-1, Voltage Drop (<5%), COC & Fault Finding',
      Setswana: 'Wiring, SANS 10142-1, Voltage Drop (<5%), COC & Fault Finding',
      Siswati: 'Wiring, SANS 10142-1, Voltage Drop (<5%), COC & Fault Finding',
      isiNdebele: 'Wiring, SANS 10142-1, Voltage Drop (<5%), COC & Fault Finding',
      isiXhosa: 'Wiring, SANS 10142-1, Voltage Drop (<5%), COC & Fault Finding',
      Afrikaans: 'Bedrading, SANS 10142-1, Spanningsval (<5%), COC & Foutopsporing',
      English: 'Domestic/industrial wiring rules, SANS 10142-1, voltage drop & systematic fault finding'
    },
    summaryByLanguage: {
      Xitsonga:
        'EAfrika Dzonga ti-installation hinkwato ti fanele ku landzela nawu wa SANS 10142-1 ku kuma Certificate of Compliance (COC). Ku hunguta voltage drop ku fanele ku va ehansi ka 5% ya supply voltage (V_d = I × R). Loko u lavisisa swihoxo (Fault Finding), kambela Continuity, Insulation, Polarity na Earth Loop.',
      Sepedi:
        'Mo Afrika Borwa, di-installation di latela SANS 10142-1 go hwetša COC. Voltage drop e swanetše go ba ka fase ga 5% (V_d = I × R).',
      isiZulu:
        'ENingizimu Afrika izintambo zilandela i-SANS 10142-1 ukuze kutholakale i-COC. I-Voltage drop kumele ibe ngaphansi kuka-5% (V_d = I × R).',
      Tshivenda:
        'Afrika Tshipembe i tevhela SANS 10142-1 kha COC. Voltage drop i tea u vha fhasi ha 5%.',
      Sesotho:
        'Afrika Borwa e latela SANS 10142-1 bakeng sa COC. Voltage drop e lokela ho ba ka tlase ho 5%.',
      Setswana:
        'Afrika Borwa e latela SANS 10142-1 mo go COC. Voltage drop e tshwanetse go nna kwa tlase ga 5%.',
      Siswati: 'Ningizimu Afrika ilandzela SANS 10142-1 ku-COC. Voltage drop ngaphansi kwa-5%.',
      isiNdebele: 'ISewula Afrika ilandela i-SANS 10142-1 ku-COC. Voltage drop ngaphasi kwe-5%.',
      isiXhosa: 'UMzantsi Afrika ulandela i-SANS 10142-1 kwi-COC. Voltage drop ngaphantsi kwe-5%.',
      Afrikaans:
        'Alle elektriese installasies in SA moet aan SANS 10142-1 voldoen vir n Sertifikaat van Nakoming (COC). Spanningsval V_d = I × R moet onder 5% bly. Foutopsporing toets kontinuïteit, isolasie en polariteit.',
      English:
        'All electrical wiring in South Africa must comply with SANS 10142-1 before issuing a Certificate of Compliance (COC). Key rules include correct cable sizing (so voltage drop stays within 5%), colour coding (Brown Live, Blue Neutral, Green/Yellow Earth), 30 mA earth leakage on plug sockets, and systematic testing for Open Circuits, Short Circuits, and Earth Faults.'
    },
    keyTerms: [
      {
        termEn: 'SANS 10142-1 & COC',
        translations: {
          Xitsonga: 'Nawu wa SANS 10142-1 & COC',
          Sepedi: 'Molao wa SANS 10142-1 & COC',
          isiZulu: 'Umthetho we-SANS 10142-1 ne-COC',
          Tshivenda: 'Mulayo wa SANS 10142-1 & COC',
          Sesotho: 'Molao wa SANS 10142-1 & COC',
          Setswana: 'Molao wa SANS 10142-1 & COC',
          Siswati: 'Umtsetfo we-SANS 10142-1 ne-COC',
          isiNdebele: 'Umthetho we-SANS 10142-1 ne-COC',
          isiXhosa: 'Umgaqo we-SANS 10142-1 ne-COC',
          Afrikaans: 'SANS 10142-1 Bedradingskode & COC',
          English: 'South African National Standard governing safe electrical installations'
        },
        meaningByLanguage: {
          Xitsonga: 'Ndzawulo ya swikambelo na vuhlayiseki bya gezi emakaya na le tikampanini ku nyika COC.',
          Sepedi: 'Melao ya tšhireletšo ye e tiišetšago gore moago o bolokegile pele go ntšhwa COC.',
          isiZulu: 'Imithetho yezokuphepha eqinisekisa ukuthi indlu noma isakhiwo siphephile ngaphambi kokunika i-COC.',
          Tshivenda: 'Milayo ya tsireledzo ya mudagasi musi hu tshi bviswa COC.',
          Sesotho: 'Melao ya polokeho pele ho fanwa ka COC.',
          Setswana: 'Melao ya pabalesego pele go ntshiwa COC.',
          Siswati: 'Imitsetfo yekuphepha ngaphambi kwekukhipha i-COC.',
          isiNdebele: 'Imithetho yokuphepha ngaphambi kokukhupha i-COC.',
          isiXhosa: 'Imigaqo yokhuseleko phambi kokukhupha i-COC.',
          Afrikaans: 'Nasionale bedradingstandaard waaraan elke installasie moet voldoen vir n wettige COC.',
          English: 'Registered electricians test continuity, earth resistance, polarity, and RCD trip times to issue a legal COC.'
        }
      },
      {
        termEn: 'Voltage Drop Limit (≤ 5%)',
        translations: {
          Xitsonga: 'Ku Hunguteka ka Voltage — V_d = I × R (≤ 5%)',
          Sepedi: 'Phokotšego ya Voltage (≤ 5%)',
          isiZulu: 'Ukwehla kwe-Voltage (≤ 5%)',
          Tshivenda: 'U Tsa ha Voltage (≤ 5%)',
          Sesotho: 'Ho Theoha ha Voltage (≤ 5%)',
          Setswana: 'Phokotsego ya Voltage (≤ 5%)',
          Siswati: 'Kwehla kwe-Voltage (≤ 5%)',
          isiNdebele: 'Ukwehla kwe-Voltage (≤ 5%)',
          isiXhosa: 'Ukuhla kwe-Voltage (≤ 5%)',
          Afrikaans: 'Spanningsval-beperking (≤ 5%)',
          English: 'Voltage lost along cable resistance (max 5% = 11.5 V on 230 V)'
        },
        meaningByLanguage: {
          Xitsonga: 'Kabel leyo leha yi lava koporo yo bumbula leswaku V_d = I × R yi tshama ehansi ka 5%.',
          Sepedi: 'Megala e metelele e nyaka koporo e koto gore V_d e dule ka fase ga 5%.',
          isiZulu: 'Izintambo ezinde zidinga ithusi elikhulu ukuze u-V_d uhlale ngaphansi kuka-5%.',
          Tshivenda: 'Darata ndapfu i toda koporo khulwane uri V_d i dzule fhasi ha 5%.',
          Sesotho: 'Terata e telele e hloka koporo e tenya hore V_d e be ka tlase ho 5%.',
          Setswana: 'Megala e meleele e tlhoka koporo e kima gore V_d e nne kwa tlase ga 5%.',
          Siswati: 'Tintsambo letindze tidzinga litfusi lelincane kutsi V_d ihlale ngaphansi kwa-5%.',
          isiNdebele: 'Iintambo ezide zifuna ikoporo etjhinileko bonyana u-V_d uhlale ngaphasi kwe-5%.',
          isiXhosa: 'Iintambo ezinde zifuna ikopore engqingqwa ukuze u-V_d uhlale ngaphantsi kwe-5%.',
          Afrikaans: 'Lang toevoerkabels benodig groter deursnee (mm²) sodat spanningsval onder 5% bly.',
          English: 'V_d = I × R must not exceed 5% of nominal supply (11.5 V on 230 V, or 20 V on 400 V).'
        }
      },
      {
        termEn: 'Fault Finding (Open / Short / Earth)',
        translations: {
          Xitsonga: 'Ku Kuma Swihoxo (Open, Short & Earth Fault)',
          Sepedi: 'Go Hwetša Diphošo (Open, Short, Earth)',
          isiZulu: 'Ukuthola Amaphutha (Open, Short, Earth)',
          Tshivenda: 'U Wana Vhukhakhi (Open, Short, Earth)',
          Sesotho: 'Ho Fumana Diphoso (Open, Short, Earth)',
          Setswana: 'Go Bona Diphoso (Open, Short, Earth)',
          Siswati: 'Kutfola Emaphutsa (Open, Short, Earth)',
          isiNdebele: 'Ukufumana Iimphoso (Open, Short, Earth)',
          isiXhosa: 'Ukufumana Iziphene (Open, Short, Earth)',
          Afrikaans: 'Foutopsporing (Oop, Kort & Aardfout)',
          English: 'Systematic testing using continuity (Ω) and insulation (MΩ)'
        },
        meaningByLanguage: {
          Xitsonga: 'Open circuit = ∞ Ω (waya yi tsemekile); Short circuit = 0 Ω (Live na Neutral ti khomana); Earth fault = < 1 MΩ.',
          Sepedi: 'Open circuit = ∞ Ω; Short circuit = ~0 Ω; Earth fault = insulation e hlapile (< 1 MΩ).',
          isiZulu: 'Open circuit = ∞ Ω; Short circuit = ~0 Ω; Earth fault = < 1 MΩ.',
          Tshivenda: 'Open = ∞ Ω; Short = ~0 Ω; Earth fault = < 1 MΩ.',
          Sesotho: 'Open = ∞ Ω; Short = ~0 Ω; Earth fault = < 1 MΩ.',
          Setswana: 'Open = ∞ Ω; Short = ~0 Ω; Earth fault = < 1 MΩ.',
          Siswati: 'Open = ∞ Ω; Short = ~0 Ω; Earth fault = < 1 MΩ.',
          isiNdebele: 'Open = ∞ Ω; Short = ~0 Ω; Earth fault = < 1 MΩ.',
          isiXhosa: 'Open = ∞ Ω; Short = ~0 Ω; Earth fault = < 1 MΩ.',
          Afrikaans: 'Oopkring = ∞ Ω; Kortsluiting = 0 Ω tussen L en N; Aardfout = lae weerstand na aarde.',
          English: 'Dead-circuit continuity & insulation tests locate breaks (∞ Ω), shorts (~0 Ω), or earth leaks (< 1 MΩ).'
        }
      }
    ],
    workedExample: {
      questionByLanguage: {
        Xitsonga:
          'Hi ku landza SANS 10142-1, kabel ya 230 V yi rhwala I = 25 A naswona resistance ya yona hinkwayo (go-and-return) i R = 0.24 Ω. Hlayela: (a) voltage drop V_d, (b) percentage voltage drop (%V_d, max 5%), na (c) voltage leyi fikaka eka muchini V_load.',
        Sepedi:
          'Kabel ya 230 V e rwala I = 25 A ka R = 0.24 Ω (go-and-return). Bala: (a) V_d, (b) %V_d (max 5%), le (c) V_load.',
        isiZulu:
          'Ikhebula le-230 V lithwele u-I = 25 A nge-R = 0.24 Ω (go-and-return). Bala: (a) V_d, (b) %V_d (max 5%), ne-(c) V_load.',
        Tshivenda:
          'Khebulu ya 230 V i hwala I = 25 A, R = 0.24 Ω. Vhalelani: (a) V_d, (b) %V_d, na (c) V_load.',
        Sesotho:
          'Thapo ya 230 V e jara I = 25 A, R = 0.24 Ω. Bala: (a) V_d, (b) %V_d, le (c) V_load.',
        Setswana:
          'Thapo ya 230 V e rwala I = 25 A, R = 0.24 Ω. Bala: (a) V_d, (b) %V_d, le (c) V_load.',
        Siswati:
          'Ikhebula la-230 V litsetse I = 25 A, R = 0.24 Ω. Bala: (a) V_d, (b) %V_d, ne-(c) V_load.',
        isiNdebele:
          'Ikhebula le-230 V lithwele I = 25 A, R = 0.24 Ω. Bala: (a) V_d, (b) %V_d, no-(c) V_load.',
        isiXhosa:
          'Intambo ye-230 V ithwele u-I = 25 A, R = 0.24 Ω. Bala: (a) V_d, (b) %V_d, no-(c) V_load.',
        Afrikaans:
          'Volgens SANS 10142-1 lewer n 230 V-kabel I = 25 A met totale lusweerstand (heen-en-terug) R = 0.24 Ω. Bereken: (a) spanningsval V_d, (b) persentasie spanningsval (%V_d, maks 5%), en (c) lasspanning V_load.',
        English:
          'Under SANS 10142-1 rules, a 230 V single-phase sub-main supplies I = 25 A through a copper cable of total go-and-return resistance R = 0.24 Ω. Calculate: (a) voltage drop V_d, (b) percentage voltage drop (%V_d, limit 5%), and (c) terminal load voltage V_load.'
      },
      stepsByLanguage: {
        Xitsonga: [
          '(a) V_d = I × R = 25 × 0.24 = 6.0 V.',
          '(b) %V_d = (6.0 ÷ 230) × 100 = 2.61% — yi le hansi ka 5% ya SANS, hikokwalaho yi pasile!',
          '(c) V_load = 230 − 6.0 = 224 V.'
        ],
        Sepedi: [
          '(a) V_d = 25 × 0.24 = 6.0 V.',
          '(b) %V_d = (6.0 ÷ 230) × 100 = 2.61% (< 5%, e a feta).',
          '(c) V_load = 230 − 6.0 = 224 V.'
        ],
        isiZulu: [
          '(a) V_d = 25 × 0.24 = 6.0 V.',
          '(b) %V_d = (6.0 ÷ 230) × 100 = 2.61% (< 5%, iyaphumelela).',
          '(c) V_load = 230 − 6.0 = 224 V.'
        ],
        Tshivenda: [
          '(a) V_d = 25 × 0.24 = 6.0 V.',
          '(b) %V_d = 2.61% (< 5%).',
          '(c) V_load = 230 − 6.0 = 224 V.'
        ],
        Sesotho: [
          '(a) V_d = 25 × 0.24 = 6.0 V.',
          '(b) %V_d = 2.61% (< 5%).',
          '(c) V_load = 230 − 6.0 = 224 V.'
        ],
        Setswana: [
          '(a) V_d = 25 × 0.24 = 6.0 V.',
          '(b) %V_d = 2.61% (< 5%).',
          '(c) V_load = 230 − 6.0 = 224 V.'
        ],
        Siswati: [
          '(a) V_d = 25 × 0.24 = 6.0 V.',
          '(b) %V_d = 2.61% (< 5%).',
          '(c) V_load = 230 − 6.0 = 224 V.'
        ],
        isiNdebele: [
          '(a) V_d = 25 × 0.24 = 6.0 V.',
          '(b) %V_d = 2.61% (< 5%).',
          '(c) V_load = 230 − 6.0 = 224 V.'
        ],
        isiXhosa: [
          '(a) V_d = 25 × 0.24 = 6.0 V.',
          '(b) %V_d = 2.61% (< 5%).',
          '(c) V_load = 230 − 6.0 = 224 V.'
        ],
        Afrikaans: [
          '(a) V_d = I × R = 25 × 0.24 = 6.0 V.',
          '(b) %V_d = (6.0 ÷ 230) × 100 = 2.61% (onder 5%-limiet — kabel slaag SANS).',
          '(c) V_load = 230 − 6.0 = 224 V.'
        ],
        English: [
          '(a) Voltage drop: V_d = I × R = 25 A × 0.24 Ω = 6.0 V.',
          '(b) Percentage drop: %V_d = (6.0 ÷ 230) × 100 = 2.61% — well within the 5% (11.5 V) SANS limit, so cable passes.',
          '(c) Load Voltage: V_load = 230 − 6.0 = 224 V.'
        ]
      },
      finalAnswerByLanguage: {
        Xitsonga: '(a) V_d = 6.0 V  |  (b) %V_d = 2.61% (Ina, < 5%)  |  (c) V_load = 224 V',
        Sepedi: '(a) V_d = 6.0 V  |  (b) %V_d = 2.61% (< 5%)  |  (c) V_load = 224 V',
        isiZulu: '(a) V_d = 6.0 V  |  (b) %V_d = 2.61% (< 5%)  |  (c) V_load = 224 V',
        Tshivenda: '(a) V_d = 6.0 V  |  (b) %V_d = 2.61%  |  (c) V_load = 224 V',
        Sesotho: '(a) V_d = 6.0 V  |  (b) %V_d = 2.61%  |  (c) V_load = 224 V',
        Setswana: '(a) V_d = 6.0 V  |  (b) %V_d = 2.61%  |  (c) V_load = 224 V',
        Siswati: '(a) V_d = 6.0 V  |  (b) %V_d = 2.61%  |  (c) V_load = 224 V',
        isiNdebele: '(a) V_d = 6.0 V  |  (b) %V_d = 2.61%  |  (c) V_load = 224 V',
        isiXhosa: '(a) V_d = 6.0 V  |  (b) %V_d = 2.61%  |  (c) V_load = 224 V',
        Afrikaans: '(a) V_d = 6.0 V  |  (b) %V_d = 2.61% (< 5%)  |  (c) V_load = 224 V',
        English: '(a) V_d = 6.0 V  |  (b) %V_d = 2.61% (< 5%, passes)  |  (c) V_load = 224 V'
      }
    },
    practiceQuestions: [
      {
        number: 1,
        questionByLanguage: {
          Xitsonga: 'Boxa mihlovo ya tiwaya ta SANS 10142-1 eka single-phase wiring eAfrika Dzonga.',
          Sepedi: 'Bolela mebala ya megala ya SANS 10142-1 mo go single-phase wiring mo Afrika Borwa.',
          isiZulu: 'Shono imibala yezintambo ze-SANS 10142-1 ku-single-phase wiring eNingizimu Afrika.',
          Tshivenda: 'Bulani mivhala ya darata dza SANS 10142-1.',
          Sesotho: 'Bolela mebala ya dithapo tsa SANS 10142-1.',
          Setswana: 'Bolela mebala ya megala ya SANS 10142-1.',
          Siswati: 'Shono imibala yetintsambo te-SANS 10142-1.',
          isiNdebele: 'Tsho imibala yeentambo ze-SANS 10142-1.',
          isiXhosa: 'Chaza imibala yeentambo ze-SANS 10142-1.',
          Afrikaans: 'Noem die standaard SANS 10142-1 enkelfase-draadkleure in Suid-Afrika.',
          English: 'State the standard SANS 10142-1 single-phase cable insulation colours in South Africa.'
        },
        answerByLanguage: {
          Xitsonga: 'Live = Brown (khale Red), Neutral = Blue (khale Black), Earth = Green/Yellow (kumbe koporo leyi nga pfariwangiki).',
          Sepedi: 'Live = Brown (Red ya kgale), Neutral = Blue (Black ya kgale), Earth = Green/Yellow.',
          isiZulu: 'Live = Brown (Red endala), Neutral = Blue (Black endala), Earth = Green/Yellow.',
          Tshivenda: 'Live = Brown, Neutral = Blue, Earth = Green/Yellow.',
          Sesotho: 'Live = Brown, Neutral = Blue, Earth = Green/Yellow.',
          Setswana: 'Live = Brown, Neutral = Blue, Earth = Green/Yellow.',
          Siswati: 'Live = Brown, Neutral = Blue, Earth = Green/Yellow.',
          isiNdebele: 'Live = Brown, Neutral = Blue, Earth = Green/Yellow.',
          isiXhosa: 'Live = Brown, Neutral = Blue, Earth = Green/Yellow.',
          Afrikaans: 'Lewendig = Bruin (ou Rooi), Neutraal = Blou (ou Swart), Aarde = Groen/Geel.',
          English: 'Live = Brown (older Red), Neutral = Blue (older Black), Protective Earth = Green/Yellow striped (or bare copper with green/yellow sleeving).'
        }
      },
      {
        number: 2,
        questionByLanguage: {
          Xitsonga: 'Hambanisa Open Circuit fault na Short Circuit fault loko u tirhisa multimeter.',
          Sepedi: 'Fapantšha Open Circuit fault le Short Circuit fault mo multimetereng.',
          isiZulu: 'Hlukanisa phakathi kwe-Open Circuit fault ne-Short Circuit fault ku-multimeter.',
          Tshivenda: 'Fhambanyisani Open Circuit na Short Circuit.',
          Sesotho: 'Fapanya Open Circuit le Short Circuit.',
          Setswana: 'Farologanya Open Circuit le Short Circuit.',
          Siswati: 'Hlukanisa Open Circuit ne-Short Circuit.',
          isiNdebele: 'Hlukanisa i-Open Circuit ne-Short Circuit.',
          isiXhosa: 'Yahlula phakathi kwe-Open Circuit ne-Short Circuit.',
          Afrikaans: 'Onderskei tussen n Oopkringfout en n Kortsluitingsfout wanneer jy met n ohmmeter toets.',
          English: 'Differentiate between an Open Circuit fault and a Short Circuit fault when fault-finding with a multimeter.'
        },
        answerByLanguage: {
          Xitsonga: 'Open Circuit = waya yi tsemekile (∞ Ω, a ku na current); Short Circuit = Live na Neutral swi khomana (~0 Ω, breaker ya tsema).',
          Sepedi: 'Open Circuit = terata e kgaogile (∞ Ω); Short Circuit = kgokagano ya phošo (~0 Ω, breaker e a kgaola).',
          isiZulu: 'Open Circuit = intambo inqamukile (∞ Ω); Short Circuit = ukuthintana okungekho emthethweni (~0 Ω).',
          Tshivenda: 'Open Circuit = ∞ Ω; Short Circuit = ~0 Ω.',
          Sesotho: 'Open Circuit = ∞ Ω; Short Circuit = ~0 Ω.',
          Setswana: 'Open Circuit = ∞ Ω; Short Circuit = ~0 Ω.',
          Siswati: 'Open Circuit = ∞ Ω; Short Circuit = ~0 Ω.',
          isiNdebele: 'Open Circuit = ∞ Ω; Short Circuit = ~0 Ω.',
          isiXhosa: 'Open Circuit = ∞ Ω; Short Circuit = ~0 Ω.',
          Afrikaans: 'Oopkring = gebreekte pad (∞ Ω, nul stroom); Kortsluiting = onbedoelde lae-weerstand pad (~0 Ω) wat hoë stroom trek.',
          English: 'Open Circuit = broken conductor path reading infinite resistance (∞ Ω) and zero current; Short Circuit = unintended low-resistance path between Live and Neutral/Earth (~0 Ω), causing excessive current that trips the breaker.'
        }
      }
    ]
  }
];
