/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ELECTRICAL TRADE THEORY TEXTBOOK — N2 (Chapters 5–8)
 * 100% Nexovian Original — Read Online Only.
 * Maths & formulas stay exact across all 11 official languages.
 */

import { TextbookChapter } from './officeAdminTypes';

export const ELECTRICAL_N2_CHAPTERS: TextbookChapter[] = [
  {
    id: 'elec-n2-ch5-ac-theory',
    level: 3,
    chapterNumber: 5,
    chapterLabelByLanguage: {
      Xitsonga: 'N2 • Chapter 5',
      Sepedi: 'N2 • Chapter 5',
      isiZulu: 'N2 • Chapter 5',
      Tshivenda: 'N2 • Chapter 5',
      Sesotho: 'N2 • Chapter 5',
      Setswana: 'N2 • Chapter 5',
      Siswati: 'N2 • Chapter 5',
      isiNdebele: 'N2 • Chapter 5',
      isiXhosa: 'N2 • Chapter 5',
      Afrikaans: 'N2 • Chapter 5',
      English: 'N2 • Chapter 5'
    },
    titleByLanguage: {
      Xitsonga: 'AC Theory - AC, Frequency, RMS',
      Sepedi: 'AC Theory - AC, Frequency, RMS',
      isiZulu: 'AC Theory - AC, Frequency, RMS',
      Tshivenda: 'AC Theory - AC, Frequency, RMS',
      Sesotho: 'AC Theory - AC, Frequency, RMS',
      Setswana: 'AC Theory - AC, Frequency, RMS',
      Siswati: 'AC Theory - AC, Frequency, RMS',
      isiNdebele: 'AC Theory - AC, Frequency, RMS',
      isiXhosa: 'AC Theory - AC, Frequency, RMS',
      Afrikaans: 'AC Theory - AC, Frequency, RMS',
      English: 'AC Theory - AC, Frequency, RMS'
    },
    subtitleByLanguage: {
      Xitsonga: 'Alternating Current (AC), Frequency (50 Hz), Period T = 1/f, RMS (0.707 × V_max)',
      Sepedi: 'Alternating Current (AC), Frequency (50 Hz), Period T = 1/f & RMS (0.707 × V_max)',
      isiZulu: 'I-Alternating Current (AC), i-Frequency (50 Hz), i-Period T = 1/f ne-RMS (0.707 × V_max)',
      Tshivenda: 'Alternating Current (AC), Frequency (50 Hz), Period T = 1/f & RMS',
      Sesotho: 'Alternating Current (AC), Frequency (50 Hz), Period T = 1/f & RMS',
      Setswana: 'Alternating Current (AC), Frequency (50 Hz), Period T = 1/f & RMS',
      Siswati: 'Alternating Current (AC), Frequency (50 Hz), Period T = 1/f ne-RMS',
      isiNdebele: 'Alternating Current (AC), Frequency (50 Hz), Period T = 1/f ne-RMS',
      isiXhosa: 'Alternating Current (AC), Frequency (50 Hz), Period T = 1/f ne-RMS',
      Afrikaans: 'Wisselstroom (WS), Frekwensie (50 Hz), Periode T = 1/f en WGK (0.707 × V_maks)',
      English: 'Sine wave generation, frequency, periodic time, peak & RMS values'
    },
    summaryByLanguage: {
      Xitsonga:
        'Alternating Current (AC) i gezi leri cincaka tlhelo nkarhi na nkarhi tanihi gandlati (sine wave). EAfrika Dzonga gezi ra le kaya ri cinca 50 wa mikarhi hi sekondi (Frequency f = 50 Hz; Nkarhi wa cycle yinwe T = 1/f = 0.02 s). Nkoka wa RMS lowu pimiwaka hi ti-meter i V_RMS = 0.707 × V_max, kasi V_avg = 0.637 × V_max.',
      Sepedi:
        'Alternating Current (AC) e fetola thoko ya yona nako le nako ka mokgwa wa sine wave. Mo Afrika Borwa, Frequency ke f = 50 Hz (T = 1/f = 0.02 s). Bolothetši bja RMS ke V_RMS = 0.707 × V_max gomme V_avg = 0.637 × V_max.',
      isiZulu:
        'I-Alternating Current (AC) ishintsha indlela ehamba ngayo njengegagasi (sine wave). ENingizimu Afrika i-Frequency ngu-50 Hz (T = 1/f = 0.02 s). I-Voltage ye-RMS ibalwa nge-V_RMS = 0.707 × V_max kanti i-V_avg = 0.637 × V_max.',
      Tshivenda:
        'AC i shandukisa sia la u tshimbila sa sine wave. Afrika Tshipembe f = 50 Hz (T = 1/f). V_RMS = 0.707 × V_max na V_avg = 0.637 × V_max.',
      Sesotho:
        'AC e fetola tsela ya phallo sa sine wave. Afrika Borwa f = 50 Hz (T = 1/f). V_RMS = 0.707 × V_max le V_avg = 0.637 × V_max.',
      Setswana:
        'AC e fetola ntlha ya motsamao jaaka sine wave. Mo Afrika Borwa f = 50 Hz (T = 1/f). V_RMS = 0.707 × V_max le V_avg = 0.637 × V_max.',
      Siswati: 'I-AC ishintja luhlangotsi njenge-sine wave. f = 50 Hz (T = 1/f). V_RMS = 0.707 × V_max.',
      isiNdebele: 'I-AC itjhugulula indlela njenge-sine wave. f = 50 Hz (T = 1/f). V_RMS = 0.707 × V_max.',
      isiXhosa: 'I-AC itshintsha icala njenge-sine wave. f = 50 Hz (T = 1/f). V_RMS = 0.707 × V_max.',
      Afrikaans:
        'Wisselstroom (WS) wissel voortdurend van rigting in n sinusgolf. In Suid-Afrika is frekwensie f = 50 Hz (periode T = 1/f = 0.02 s = 20 ms). Effektiewe waarde (WGK/RMS) is V_RMS = 0.707 × V_max en V_avg = 0.637 × V_max.',
      English:
        'Alternating Current (AC) reverses direction periodically following a sine wave. Frequency (f, in Hertz Hz) is cycles per second (50 Hz in South Africa), and Period T = 1 / f (0.02 s = 20 ms). Because AC rises from 0 to a peak V_max and falls again, we measure heating effect using RMS (Root Mean Square): V_RMS = 0.707 × V_max, and Average Value V_avg = 0.637 × V_max.'
    },
    keyTerms: [
      {
        termEn: 'Frequency (f) & Period (T)',
        translations: {
          Xitsonga: 'Ndzhendzeleko hi Sekondi — Hertz (Hz)',
          Sepedi: 'Maqhubu ka Motsotswana — Hertz (Hz)',
          isiZulu: 'Inani Lamagagasi Ngomzuzwana — Hertz (Hz)',
          Tshivenda: 'Frequency (Hz) & Period T = 1/f',
          Sesotho: 'Frequency (Hz) & Period T = 1/f',
          Setswana: 'Frequency (Hz) & Period T = 1/f',
          Siswati: 'Frequency (Hz) & Period T = 1/f',
          isiNdebele: 'Frequency (Hz) & Period T = 1/f',
          isiXhosa: 'Frequency (Hz) & Period T = 1/f',
          Afrikaans: 'Frekwensie (f) en Periode (T)',
          English: 'Number of complete cycles per second (f = 1/T in Hz)'
        },
        meaningByLanguage: {
          Xitsonga: '1 Hz = cycle yinwe hi sekondi; eAfrika Dzonga Eskom yi nyika 50 Hz (T = 20 ms).',
          Sepedi: '1 Hz = modikologo o tee ka motsotswana; Afrika Borwa e šomiša 50 Hz.',
          isiZulu: '1 Hz = umjikelezo owodwa ngomzuzwana; eNingizimu Afrika kusetshenziswa u-50 Hz.',
          Tshivenda: '1 Hz = mutambuluwo muthihi nga tshifhinga (SA = 50 Hz).',
          Sesotho: '1 Hz = potoloho e le nngwe ka motsotswana (SA = 50 Hz).',
          Setswana: '1 Hz = modikologo o le mongwe ka motsotswana (SA = 50 Hz).',
          Siswati: '1 Hz = umjikeleto munye ngemzuzwana (SA = 50 Hz).',
          isiNdebele: '1 Hz = umjikelezo owodwa ngomzuzwana (SA = 50 Hz).',
          isiXhosa: '1 Hz = umjikelo omnye ngomzuzwana (SA = 50 Hz).',
          Afrikaans: 'Frekwensie f = aantal siklusse per sekonde (50 Hz in SA); T = 1 ÷ f.',
          English: 'Frequency f is cycles per second (Hz); Periodic Time T = 1 / f is seconds per cycle.'
        }
      },
      {
        termEn: 'RMS Value (V_RMS = 0.707 × V_max)',
        translations: {
          Xitsonga: 'Nkoka wa RMS (0.707 × V_max)',
          Sepedi: 'Boleng bja RMS (0.707 × V_max)',
          isiZulu: 'Inani le-RMS (0.707 × V_max)',
          Tshivenda: 'Ndeme ya RMS (0.707 × V_max)',
          Sesotho: 'Boleng ba RMS (0.707 × V_max)',
          Setswana: 'Boleng jwa RMS (0.707 × V_max)',
          Siswati: 'Linani le-RMS (0.707 × V_max)',
          isiNdebele: 'Inani le-RMS (0.707 × V_max)',
          isiXhosa: 'Ixabiso le-RMS (0.707 × V_max)',
          Afrikaans: 'WGK / RMS-waarde (0.707 × V_maks)',
          English: 'Effective AC value producing the same heat as DC'
        },
        meaningByLanguage: {
          Xitsonga: 'Nkoka wa AC lowu nyikaka ku hisa ku fana na DC; i nhlayo leyi multimeter yi yi kombaka (230 V).',
          Sepedi: 'Boleng bja AC bjo bo ntšhago phišo e swanago le ya DC.',
          isiZulu: 'Inani le-AC elikhiqiza ukushisa okulingana ne-DC (okukhonjiswa yi-voltmeter).',
          Tshivenda: 'Ndeme ya AC i bveledzaho mufhiso u fanaho na DC.',
          Sesotho: 'Boleng ba AC bo hlahisang mocheso o tshwanang le wa DC.',
          Setswana: 'Boleng jwa AC jo bo dirang mogote o o tshwanang le wa DC.',
          Siswati: 'Linani le-AC lelikhicita kushisa lokulingana ne-DC.',
          isiNdebele: 'Inani le-AC elikhiqiza ukutjhisa okufana ne-DC.',
          isiXhosa: 'Ixabiso le-AC elivelisa ubushushu obulingana ne-DC.',
          Afrikaans: 'Effektiewe waarde wat dieselfde verhittingseffek as gelykstroom lewer (V_RMS = V_maks / √2).',
          English: 'Standard rating printed on appliances (e.g. 230 V RMS); V_RMS = V_max / √2 = 0.707 × V_max.'
        }
      },
      {
        termEn: 'Peak / Maximum Value (V_max)',
        translations: {
          Xitsonga: 'Nkoka wa le Henhla (V_max = √2 × V_RMS)',
          Sepedi: 'Boleng bja Godimo (V_max = √2 × V_RMS)',
          isiZulu: 'Inani Eliphakeme (V_max = √2 × V_RMS)',
          Tshivenda: 'Ndeme ya Ntha (V_max = √2 × V_RMS)',
          Sesotho: 'Boleng bo Phahameng (V_max = √2 × V_RMS)',
          Setswana: 'Boleng jo bo kwa Godimo (V_max)',
          Siswati: 'Linani Lelisetulu (V_max = √2 × V_RMS)',
          isiNdebele: 'Inani Eliphezulu (V_max = √2 × V_RMS)',
          isiXhosa: 'Ixabiso Eliphezulu (V_max = √2 × V_RMS)',
          Afrikaans: 'Piek- of Maksimumwaarde (V_maks = √2 × V_RMS)',
          English: 'Highest instantaneous crest voltage of a sine wave'
        },
        meaningByLanguage: {
          Xitsonga: 'Nhlohlorhi ya gandlati ra AC; kabel yi fanele ku tiya ku kondzelela V_max (325 V eka 230 V RMS).',
          Sepedi: 'Ntlha ya godimodimo ya leqhubu la sine wave; V_max = 1.414 × V_RMS.',
          isiZulu: 'Iqophelo eliphezulu legagasi; V_max = 1.414 × V_RMS.',
          Tshivenda: 'Tshikala tsha ntha-ntha tsha sine wave.',
          Sesotho: 'Ntlha e hodimodimo ya leqhubu la AC.',
          Setswana: 'Ntlha e e kwa godimo ya lekhubu la AC.',
          Siswati: 'Licophelo lelisetulu le-sine wave.',
          isiNdebele: 'Iqophelo eliphezulu le-sine wave.',
          isiXhosa: 'Incopho ephezulu ye-sine wave.',
          Afrikaans: 'Hoogste oombliklike waarde (kruinwaarde) van n wisselstroomgolf.',
          English: 'Maximum voltage crest reached twice every cycle; insulation must withstand V_max = 1.414 × V_RMS.'
        }
      }
    ],
    workedExample: {
      questionByLanguage: {
        Xitsonga:
          'Gandlati ra AC ri na V_max = 325 V na frequency f = 50 Hz. Hlayela: (a) RMS voltage V_RMS, (b) Periodic Time T hi milliseconds (ms), na (c) Average voltage V_avg.',
        Sepedi:
          'Leqhubu la AC le na le V_max = 325 V le frequency f = 50 Hz. Bala: (a) V_RMS, (b) T ka ms, le (c) V_avg.',
        isiZulu:
          'Igagasi le-AC line-V_max = 325 V ne-frequency engu-50 Hz. Bala: (a) V_RMS, (b) T nge-ms, ne-(c) V_avg.',
        Tshivenda:
          'AC wave i na V_max = 325 V na f = 50 Hz. Vhalelani: (a) V_RMS, (b) T nga ms, na (c) V_avg.',
        Sesotho:
          'Leqhubu la AC le na le V_max = 325 V le f = 50 Hz. Bala: (a) V_RMS, (b) T ka ms, le (c) V_avg.',
        Setswana:
          'Lekhubu la AC le na le V_max = 325 V le f = 50 Hz. Bala: (a) V_RMS, (b) T ka ms, le (c) V_avg.',
        Siswati:
          'I-AC wave ine-V_max = 325 V na-f = 50 Hz. Bala: (a) V_RMS, (b) T nge-ms, ne-(c) V_avg.',
        isiNdebele:
          'I-AC wave ine-V_max = 325 V no-f = 50 Hz. Bala: (a) V_RMS, (b) T nge-ms, no-(c) V_avg.',
        isiXhosa:
          'Iliza le-AC line-V_max = 325 V no-f = 50 Hz. Bala: (a) V_RMS, (b) T nge-ms, no-(c) V_avg.',
        Afrikaans:
          'n Wisselstroom-sinusgolf het n piekspanning V_max = 325 V en frekwensie f = 50 Hz. Bereken: (a) V_RMS, (b) Periode T in ms, en (c) Gemiddelde spanning V_avg.',
        English:
          'An AC sine wave has a peak voltage V_max = 325 V and frequency f = 50 Hz. Calculate: (a) RMS voltage V_RMS, (b) periodic time T in milliseconds (ms), and (c) average voltage V_avg.'
      },
      stepsByLanguage: {
        Xitsonga: [
          '(a) V_RMS = 0.707 × V_max = 0.707 × 325 = 229.78 V (≈ 230 V).',
          '(b) T = 1 ÷ f = 1 ÷ 50 = 0.02 s = 20 ms.',
          '(c) V_avg = 0.637 × V_max = 0.637 × 325 = 207.03 V.'
        ],
        Sepedi: [
          '(a) V_RMS = 0.707 × 325 = 229.78 V (≈ 230 V).',
          '(b) T = 1 ÷ 50 = 0.02 s = 20 ms.',
          '(c) V_avg = 0.637 × 325 = 207.03 V.'
        ],
        isiZulu: [
          '(a) V_RMS = 0.707 × 325 = 229.78 V (≈ 230 V).',
          '(b) T = 1 ÷ 50 = 0.02 s = 20 ms.',
          '(c) V_avg = 0.637 × 325 = 207.03 V.'
        ],
        Tshivenda: [
          '(a) V_RMS = 0.707 × 325 = 229.78 V.',
          '(b) T = 1 ÷ 50 = 0.02 s = 20 ms.',
          '(c) V_avg = 0.637 × 325 = 207.03 V.'
        ],
        Sesotho: [
          '(a) V_RMS = 0.707 × 325 = 229.78 V.',
          '(b) T = 1 ÷ 50 = 0.02 s = 20 ms.',
          '(c) V_avg = 0.637 × 325 = 207.03 V.'
        ],
        Setswana: [
          '(a) V_RMS = 0.707 × 325 = 229.78 V.',
          '(b) T = 1 ÷ 50 = 0.02 s = 20 ms.',
          '(c) V_avg = 0.637 × 325 = 207.03 V.'
        ],
        Siswati: [
          '(a) V_RMS = 0.707 × 325 = 229.78 V.',
          '(b) T = 1 ÷ 50 = 0.02 s = 20 ms.',
          '(c) V_avg = 0.637 × 325 = 207.03 V.'
        ],
        isiNdebele: [
          '(a) V_RMS = 0.707 × 325 = 229.78 V.',
          '(b) T = 1 ÷ 50 = 0.02 s = 20 ms.',
          '(c) V_avg = 0.637 × 325 = 207.03 V.'
        ],
        isiXhosa: [
          '(a) V_RMS = 0.707 × 325 = 229.78 V.',
          '(b) T = 1 ÷ 50 = 0.02 s = 20 ms.',
          '(c) V_avg = 0.637 × 325 = 207.03 V.'
        ],
        Afrikaans: [
          '(a) V_RMS = 0.707 × V_max = 0.707 × 325 = 229.78 V (≈ 230 V).',
          '(b) T = 1 ÷ f = 1 ÷ 50 = 0.02 s = 20 ms.',
          '(c) V_avg = 0.637 × V_max = 0.637 × 325 = 207.03 V.'
        ],
        English: [
          '(a) V_RMS = 0.707 × V_max = 0.707 × 325 = 229.78 V (≈ 230 V).',
          '(b) Period T = 1 ÷ f = 1 ÷ 50 Hz = 0.02 s = 20 ms.',
          '(c) Average Voltage V_avg = 0.637 × V_max = 0.637 × 325 = 207.03 V.'
        ]
      },
      finalAnswerByLanguage: {
        Xitsonga: '(a) V_RMS = 229.78 V  |  (b) T = 20 ms  |  (c) V_avg = 207.03 V',
        Sepedi: '(a) V_RMS = 229.78 V  |  (b) T = 20 ms  |  (c) V_avg = 207.03 V',
        isiZulu: '(a) V_RMS = 229.78 V  |  (b) T = 20 ms  |  (c) V_avg = 207.03 V',
        Tshivenda: '(a) V_RMS = 229.78 V  |  (b) T = 20 ms  |  (c) V_avg = 207.03 V',
        Sesotho: '(a) V_RMS = 229.78 V  |  (b) T = 20 ms  |  (c) V_avg = 207.03 V',
        Setswana: '(a) V_RMS = 229.78 V  |  (b) T = 20 ms  |  (c) V_avg = 207.03 V',
        Siswati: '(a) V_RMS = 229.78 V  |  (b) T = 20 ms  |  (c) V_avg = 207.03 V',
        isiNdebele: '(a) V_RMS = 229.78 V  |  (b) T = 20 ms  |  (c) V_avg = 207.03 V',
        isiXhosa: '(a) V_RMS = 229.78 V  |  (b) T = 20 ms  |  (c) V_avg = 207.03 V',
        Afrikaans: '(a) V_RMS = 229.78 V  |  (b) T = 20 ms  |  (c) V_avg = 207.03 V',
        English: '(a) V_RMS = 229.78 V  |  (b) T = 20 ms  |  (c) V_avg = 207.03 V'
      }
    },
    practiceQuestions: [
      {
        number: 1,
        questionByLanguage: {
          Xitsonga: 'Hlayela peak voltage V_max ya gezi ra 230 V RMS AC.',
          Sepedi: 'Bala peak voltage V_max ya mohlagase wa 230 V RMS AC.',
          isiZulu: 'Bala i-peak voltage V_max kugesi ongu-230 V RMS AC.',
          Tshivenda: 'Vhalelani V_max ya 230 V RMS AC.',
          Sesotho: 'Bala V_max ya 230 V RMS AC.',
          Setswana: 'Bala V_max ya 230 V RMS AC.',
          Siswati: 'Bala V_max ya-230 V RMS AC.',
          isiNdebele: 'Bala u-V_max we-230 V RMS AC.',
          isiXhosa: 'Bala u-V_max we-230 V RMS AC.',
          Afrikaans: 'Bereken die piekspanning V_max van n 230 V WGK (RMS) wisselstroomtoevoer.',
          English: 'Calculate the peak (maximum) voltage V_max of a 230 V RMS AC supply.'
        },
        answerByLanguage: {
          Xitsonga: 'V_max = V_RMS ÷ 0.707 = 1.414 × 230 = 325.27 V.',
          Sepedi: 'V_max = 1.414 × 230 = 325.27 V.',
          isiZulu: 'V_max = 1.414 × 230 = 325.27 V.',
          Tshivenda: 'V_max = 1.414 × 230 = 325.27 V.',
          Sesotho: 'V_max = 1.414 × 230 = 325.27 V.',
          Setswana: 'V_max = 1.414 × 230 = 325.27 V.',
          Siswati: 'V_max = 1.414 × 230 = 325.27 V.',
          isiNdebele: 'V_max = 1.414 × 230 = 325.27 V.',
          isiXhosa: 'V_max = 1.414 × 230 = 325.27 V.',
          Afrikaans: 'V_max = √2 × V_RMS = 1.414 × 230 = 325.27 V.',
          English: 'V_max = V_RMS ÷ 0.707 = √2 × 230 = 1.414 × 230 = 325.27 V.'
        }
      },
      {
        number: 2,
        questionByLanguage: {
          Xitsonga: 'Kuma frequency f loko cycle yinwe ya AC yi teka T = 0.01 s (10 ms).',
          Sepedi: 'Hwetša frequency f ge modikologo o tee o tšea T = 0.01 s (10 ms).',
          isiZulu: 'Thola i-frequency f uma umjikelezo owodwa uthatha T = 0.01 s (10 ms).',
          Tshivenda: 'Wanani frequency f arali T = 0.01 s (10 ms).',
          Sesotho: 'Fumana frequency f ha T = 0.01 s (10 ms).',
          Setswana: 'Bona frequency f fa T = 0.01 s (10 ms).',
          Siswati: 'Tfola frequency f uma T = 0.01 s (10 ms).',
          isiNdebele: 'Fumana i-frequency f uma T = 0.01 s (10 ms).',
          isiXhosa: 'Fumana i-frequency f xa T = 0.01 s (10 ms).',
          Afrikaans: 'Bereken die frekwensie f as een volle WS-siklus T = 0.01 s (10 ms) neem.',
          English: 'Find the frequency f if one full AC cycle takes T = 0.01 s (10 ms).'
        },
        answerByLanguage: {
          Xitsonga: 'f = 1 ÷ T = 1 ÷ 0.01 = 100 Hz.',
          Sepedi: 'f = 1 ÷ 0.01 = 100 Hz.',
          isiZulu: 'f = 1 ÷ 0.01 = 100 Hz.',
          Tshivenda: 'f = 1 ÷ 0.01 = 100 Hz.',
          Sesotho: 'f = 1 ÷ 0.01 = 100 Hz.',
          Setswana: 'f = 1 ÷ 0.01 = 100 Hz.',
          Siswati: 'f = 1 ÷ 0.01 = 100 Hz.',
          isiNdebele: 'f = 1 ÷ 0.01 = 100 Hz.',
          isiXhosa: 'f = 1 ÷ 0.01 = 100 Hz.',
          Afrikaans: 'f = 1 ÷ T = 1 ÷ 0.01 s = 100 Hz.',
          English: 'f = 1 ÷ T = 1 ÷ 0.01 s = 100 Hz.'
        }
      }
    ]
  },
  {
    id: 'elec-n2-ch6-transformers',
    level: 3,
    chapterNumber: 6,
    chapterLabelByLanguage: {
      Xitsonga: 'N2 • Chapter 6',
      Sepedi: 'N2 • Chapter 6',
      isiZulu: 'N2 • Chapter 6',
      Tshivenda: 'N2 • Chapter 6',
      Sesotho: 'N2 • Chapter 6',
      Setswana: 'N2 • Chapter 6',
      Siswati: 'N2 • Chapter 6',
      isiNdebele: 'N2 • Chapter 6',
      isiXhosa: 'N2 • Chapter 6',
      Afrikaans: 'N2 • Chapter 6',
      English: 'N2 • Chapter 6'
    },
    titleByLanguage: {
      Xitsonga: 'Transformers - Turns Ratio, Efficiency',
      Sepedi: 'Transformers - Turns Ratio, Efficiency',
      isiZulu: 'Transformers - Turns Ratio, Efficiency',
      Tshivenda: 'Transformers - Turns Ratio, Efficiency',
      Sesotho: 'Transformers - Turns Ratio, Efficiency',
      Setswana: 'Transformers - Turns Ratio, Efficiency',
      Siswati: 'Transformers - Turns Ratio, Efficiency',
      isiNdebele: 'Transformers - Turns Ratio, Efficiency',
      isiXhosa: 'Transformers - Turns Ratio, Efficiency',
      Afrikaans: 'Transformers - Turns Ratio, Efficiency',
      English: 'Transformers - Turns Ratio, Efficiency'
    },
    subtitleByLanguage: {
      Xitsonga: 'Ti-transformer (V₁/V₂ = N₁/N₂ = I₂/I₁), Copper & Core Losses, Efficiency η%',
      Sepedi: 'Dithransefoma (V₁/V₂ = N₁/N₂ = I₂/I₁), Ditshenyagalelo & Efficiency η%',
      isiZulu: 'Ama-Transformer (V₁/V₂ = N₁/N₂ = I₂/I₁), Ukulahleka & Efficiency η%',
      Tshivenda: 'Dzi-transformer (V₁/V₂ = N₁/N₂ = I₂/I₁) & Efficiency η%',
      Sesotho: 'Di-transformer (V₁/V₂ = N₁/N₂ = I₂/I₁) & Efficiency η%',
      Setswana: 'Ditransefoma (V₁/V₂ = N₁/N₂ = I₂/I₁) & Efficiency η%',
      Siswati: 'Ema-transformer (V₁/V₂ = N₁/N₂ = I₂/I₁) & Efficiency η%',
      isiNdebele: 'Ama-transformer (V₁/V₂ = N₁/N₂ = I₂/I₁) & Efficiency η%',
      isiXhosa: 'Ii-transformer (V₁/V₂ = N₁/N₂ = I₂/I₁) & Efficiency η%',
      Afrikaans: 'Transformators — Wikkelingsverhouding (V₁/V₂ = N₁/N₂) & Doeltreffendheid η%',
      English: 'Mutual induction, step-up & step-down turns ratio, losses & efficiency'
    },
    summaryByLanguage: {
      Xitsonga:
        'Transformer i muchini lowu nga riki na swiphemu leswi fambaka lowu cinca AC voltage yi ya ehenhla (Step-Up, N₂ > N₁) kumbe ehansi (Step-Down, N₂ < N₁) hi ku tirhisa Mutual Induction. Ratio ya turns i V₁ / V₂ = N₁ / N₂ = I₂ / I₁. Efficiency η = (P_out ÷ (P_out + Losses)) × 100%.',
      Sepedi:
        'Thransefoma ke motšhene wa go fetola AC voltage godimo (Step-Up) goba fase (Step-Down) ka Mutual Induction. Ratio ke V₁ / V₂ = N₁ / N₂ = I₂ / I₁. Efficiency η = (P_out ÷ P_in) × 100%.',
      isiZulu:
        'I-Transformer iguqula i-AC voltage iye phezulu (Step-Up) noma phansi (Step-Down) nge-Mutual Induction. I-ratio ngu-V₁ / V₂ = N₁ / N₂ = I₂ / I₁. I-Efficiency η = (P_out ÷ P_in) × 100%.',
      Tshivenda:
        'Transformer i shandukisa AC voltage ntha kana fhasi nga Mutual Induction. V₁ / V₂ = N₁ / N₂ = I₂ / I₁. Efficiency η = (P_out ÷ P_in) × 100%.',
      Sesotho:
        'Transformer e fetola AC voltage hodimo kapa tlase ka Mutual Induction. V₁ / V₂ = N₁ / N₂ = I₂ / I₁. Efficiency η = (P_out ÷ P_in) × 100%.',
      Setswana:
        'Transefoma e fetola AC voltage kwa godimo kgotsa kwa tlase. V₁ / V₂ = N₁ / N₂ = I₂ / I₁. Efficiency η = (P_out ÷ P_in) × 100%.',
      Siswati: 'I-Transformer ishintja i-AC voltage. V₁ / V₂ = N₁ / N₂ = I₂ / I₁. η = (P_out ÷ P_in) × 100%.',
      isiNdebele: 'I-Transformer itjhugulula i-AC voltage. V₁ / V₂ = N₁ / N₂ = I₂ / I₁. η = (P_out ÷ P_in) × 100%.',
      isiXhosa: 'I-Transformer itshintsha i-AC voltage. V₁ / V₂ = N₁ / N₂ = I₂ / I₁. η = (P_out ÷ P_in) × 100%.',
      Afrikaans:
        'n Transformator verhoog (optrap) of verlaag (aftrap) wisselspanning deur wedersydse induksie sonder bewegende dele: V₁ / V₂ = N₁ / N₂ = I₂ / I₁. Doeltreffendheid η = (P_uit ÷ P_in) × 100%.',
      English:
        'A transformer is a static AC device that steps AC voltage up or down via Mutual Induction between Primary (N₁) and Secondary (N₂) windings on a laminated silicon-steel core. Turns Ratio: V₁ / V₂ = N₁ / N₂ = I₂ / I₁. Efficiency η = (P_out ÷ P_in) × 100%, where P_in = P_out + Iron Losses + Copper Losses.'
    },
    keyTerms: [
      {
        termEn: 'Turns Ratio (V₁/V₂ = N₁/N₂)',
        translations: {
          Xitsonga: 'Ndzindzano wa Turns (V₁/V₂ = N₁/N₂)',
          Sepedi: 'Tekanyo ya Turns (V₁/V₂ = N₁/N₂)',
          isiZulu: 'Isilinganiso Sama-Turns (V₁/V₂ = N₁/N₂)',
          Tshivenda: 'Ratio ya Turns (V₁/V₂ = N₁/N₂)',
          Sesotho: 'Ratio ya Turns (V₁/V₂ = N₁/N₂)',
          Setswana: 'Ratio ya Turns (V₁/V₂ = N₁/N₂)',
          Siswati: 'Ratio ye-Turns (V₁/V₂ = N₁/N₂)',
          isiNdebele: 'Ratio ye-Turns (V₁/V₂ = N₁/N₂)',
          isiXhosa: 'Ratio ye-Turns (V₁/V₂ = N₁/N₂)',
          Afrikaans: 'Wikkelingsverhouding (V₁/V₂ = N₁/N₂)',
          English: 'Ratio of primary turns N₁ to secondary turns N₂'
        },
        meaningByLanguage: {
          Xitsonga: 'Yi komba loko transformer yi tlakusa voltage (Step-Up) kumbe yi yisa ehansi (Step-Down).',
          Sepedi: 'E laetša gore voltage e a rotoga goba e a theoga go ya ka palo ya turns.',
          isiZulu: 'Kukhombisa ukuthi i-voltage iyenyuka noma iyehla kuye ngenani lamajika.',
          Tshivenda: 'I sumbedza u gonya kana u tsa ha voltage.',
          Sesotho: 'E bontsha hore na voltage e ya hodimo kapa tlase.',
          Setswana: 'E bontsha fa voltage e tlhatloga kgotsa e fokotsega.',
          Siswati: 'Kukhombisa kwenyuka noma kwehla kwe-voltage.',
          isiNdebele: 'Kutjengisa ukukhuphuka namkha ukwehla kwe-voltage.',
          isiXhosa: 'Kubonisa ukunyuka okanye ukuhla kwe-voltage.',
          Afrikaans: 'Bepaal of spanning verhoog (N₂ > N₁) of verlaag (N₂ < N₁) word.',
          English: 'Determines output voltage: N₂ < N₁ steps voltage down; N₂ > N₁ steps voltage up.'
        }
      },
      {
        termEn: 'Copper Losses & Iron Losses',
        translations: {
          Xitsonga: 'Ku Lahleka ka Matimba (I²R & Eddy Currents)',
          Sepedi: 'Ditshenyagalelo tša Koporo le Tshipi',
          isiZulu: 'Ukulahleka Kwethusi Nensimbi',
          Tshivenda: 'Tshinyalelo ya Koporo na Tsimbi',
          Sesotho: 'Tahlehelo ya Koporo le Tshepe',
          Setswana: 'Tatlegelo ya Koporo le Tshipi',
          Siswati: 'Kulahleka Kwelitfusi Nensimbi',
          isiNdebele: 'Ukulahleka Kwekoporo Nesimbi',
          isiXhosa: 'Ulahleko lweKopore neNtsimbi',
          Afrikaans: 'Koperverliese (I²R) en Ysterverliese',
          English: 'Winding heat loss (I²R) and core hysteresis / eddy-current losses'
        },
        meaningByLanguage: {
          Xitsonga: 'Copper losses (I²R) swi cinca hi load; Iron losses (Eddy current + Hysteresis) swi tshama swi ringana.',
          Sepedi: 'Copper losses ke phišo ya terata (I²R); Iron losses ke tša core.',
          isiZulu: 'Copper losses yikushisa kocingo (I²R); Iron losses zenzeka ku-core yensimbi.',
          Tshivenda: 'Copper losses ndi mufhiso wa darata; Iron losses ndi dza core.',
          Sesotho: 'Copper losses ke mocheso wa terata; Iron losses ke tsa core.',
          Setswana: 'Copper losses ke mogote wa terata; Iron losses ke tsa core.',
          Siswati: 'Copper losses kushisa kwelucingo; Iron losses ku-core.',
          isiNdebele: 'Copper losses kutjhisa kwentambo; Iron losses ku-core.',
          isiXhosa: 'Copper losses bubushushu bocingo; Iron losses kwi-core.',
          Afrikaans: 'Koperverliese (I²R) wissel met las; ysterverliese bly konstant.',
          English: 'Copper losses (I²R) vary with load current; Iron/core losses remain constant whenever energised.'
        }
      },
      {
        termEn: 'Efficiency (η%)',
        translations: {
          Xitsonga: 'Vukorhokeri bya Muchini — Efficiency (η%)',
          Sepedi: 'Tšhomo e Botse — Efficiency (η%)',
          isiZulu: 'Ukusebenza Kahle — Efficiency (η%)',
          Tshivenda: 'Vhukoni ha Mushumo — Efficiency (η%)',
          Sesotho: 'Bokgoni — Efficiency (η%)',
          Setswana: 'Bokgoni — Efficiency (η%)',
          Siswati: 'Kusebenta Kahle — Efficiency (η%)',
          isiNdebele: 'Ukusebenza Kuhle — Efficiency (η%)',
          isiXhosa: 'Ukusebenza Kakuhle — Efficiency (η%)',
          Afrikaans: 'Doeltreffendheid (η%)',
          English: 'Percentage of input power delivered as useful output (P_out / P_in × 100)'
        },
        meaningByLanguage: {
          Xitsonga: 'Ti-transformer ti tirha kahle swinene (kwalomu ka 95%–99%) hikuva a ti na swiphemu swo famba.',
          Sepedi: 'Dithransefoma di na le efficiency e kgolo (95%–99%) ka ge di se na ditho tše di sepelago.',
          isiZulu: 'Ama-transformer asebenza kahle kakhulu (95%–99%) ngoba awanazo izinto ezihambayo.',
          Tshivenda: 'Dzi-transformer dzi shuma zwavhudi (95%–99%).',
          Sesotho: 'Di-transformer di sebetsa hantle (95%–99%).',
          Setswana: 'Ditransefoma di dira sentle (95%–99%).',
          Siswati: 'Ema-transformer asebenta kahle kakhulu (95%–99%).',
          isiNdebele: 'Ama-transformer asebenza kuhle khulu (95%–99%).',
          isiXhosa: 'Ii-transformer zisebenza kakuhle kakhulu (95%–99%).',
          Afrikaans: 'Transformators bereik 95%–99% doeltreffendheid omdat daar geen wrywing is nie.',
          English: 'High efficiency (95%–99%) because transformers have no moving friction parts.'
        }
      }
    ],
    workedExample: {
      questionByLanguage: {
        Xitsonga:
          'Single-phase step-down transformer yi na N₁ = 1000 turns na N₂ = 100 turns, yi hlanganisiwile eka V₁ = 2200 V. Yi nyika P_out = 8800 W naswona losses hinkwato i 200 W. Hlayela: (a) secondary voltage V₂, (b) secondary current I₂ (PF = 1), na (c) efficiency η%.',
        Sepedi:
          'Thransefoma e na le N₁ = 1000 turns le N₂ = 100 turns go V₁ = 2200 V. E ntšha P_out = 8800 W ka ditshenyagalelo tša 200 W. Bala: (a) V₂, (b) I₂, le (c) efficiency η%.',
        isiZulu:
          'I-Transformer ine-N₁ = 1000 turns ne-N₂ = 100 turns ku-V₁ = 2200 V. Ikhipha P_out = 8800 W nokulahleka okungu-200 W. Bala: (a) V₂, (b) I₂, ne-(c) efficiency η%.',
        Tshivenda:
          'Transformer i na N₁ = 1000, N₂ = 100, V₁ = 2200 V, P_out = 8800 W, losses = 200 W. Vhalelani: (a) V₂, (b) I₂, na (c) η%.',
        Sesotho:
          'Transformer e na le N₁ = 1000, N₂ = 100, V₁ = 2200 V, P_out = 8800 W, losses = 200 W. Bala: (a) V₂, (b) I₂, le (c) η%.',
        Setswana:
          'Transefoma e na le N₁ = 1000, N₂ = 100, V₁ = 2200 V, P_out = 8800 W, losses = 200 W. Bala: (a) V₂, (b) I₂, le (c) η%.',
        Siswati:
          'I-Transformer ine-N₁ = 1000, N₂ = 100, V₁ = 2200 V, P_out = 8800 W, losses = 200 W. Bala: (a) V₂, (b) I₂, ne-(c) η%.',
        isiNdebele:
          'I-Transformer ine-N₁ = 1000, N₂ = 100, V₁ = 2200 V, P_out = 8800 W, losses = 200 W. Bala: (a) V₂, (b) I₂, ne-(c) η%.',
        isiXhosa:
          'I-Transformer ine-N₁ = 1000, N₂ = 100, V₁ = 2200 V, P_out = 8800 W, losses = 200 W. Bala: (a) V₂, (b) I₂, ne-(c) η%.',
        Afrikaans:
          'n Enkelfase aftraptransformator het N₁ = 1000 en N₂ = 100 windings by V₁ = 2200 V. Dit lewer P_out = 8800 W met totale verliese van 200 W. Bereken: (a) V₂, (b) I₂ (eenheids-arbeidsfaktor), en (c) doeltreffendheid η%.',
        English:
          'A single-phase step-down transformer has N₁ = 1000 primary turns and N₂ = 100 secondary turns, connected to V₁ = 2200 V. It delivers P_out = 8800 W with total losses of 200 W. Calculate: (a) secondary voltage V₂, (b) secondary current I₂ (at unity PF), and (c) efficiency η%.'
      },
      stepsByLanguage: {
        Xitsonga: [
          '(a) V₁ ÷ V₂ = N₁ ÷ N₂ -> V₂ = V₁ × (N₂ ÷ N₁) = 2200 × (100 ÷ 1000) = 220 V.',
          '(b) I₂ = P_out ÷ V₂ = 8800 ÷ 220 = 40 A.',
          '(c) P_in = P_out + Losses = 8800 + 200 = 9000 W. η = (8800 ÷ 9000) × 100 = 97.78%.'
        ],
        Sepedi: [
          '(a) V₂ = 2200 × (100 ÷ 1000) = 220 V.',
          '(b) I₂ = 8800 ÷ 220 = 40 A.',
          '(c) P_in = 8800 + 200 = 9000 W. η = (8800 ÷ 9000) × 100 = 97.78%.'
        ],
        isiZulu: [
          '(a) V₂ = 2200 × (100 ÷ 1000) = 220 V.',
          '(b) I₂ = 8800 ÷ 220 = 40 A.',
          '(c) P_in = 8800 + 200 = 9000 W. η = (8800 ÷ 9000) × 100 = 97.78%.'
        ],
        Tshivenda: [
          '(a) V₂ = 2200 × (100 ÷ 1000) = 220 V.',
          '(b) I₂ = 8800 ÷ 220 = 40 A.',
          '(c) P_in = 9000 W. η = (8800 ÷ 9000) × 100 = 97.78%.'
        ],
        Sesotho: [
          '(a) V₂ = 2200 × (100 ÷ 1000) = 220 V.',
          '(b) I₂ = 8800 ÷ 220 = 40 A.',
          '(c) P_in = 9000 W. η = (8800 ÷ 9000) × 100 = 97.78%.'
        ],
        Setswana: [
          '(a) V₂ = 2200 × (100 ÷ 1000) = 220 V.',
          '(b) I₂ = 8800 ÷ 220 = 40 A.',
          '(c) P_in = 9000 W. η = (8800 ÷ 9000) × 100 = 97.78%.'
        ],
        Siswati: [
          '(a) V₂ = 2200 × (100 ÷ 1000) = 220 V.',
          '(b) I₂ = 8800 ÷ 220 = 40 A.',
          '(c) P_in = 9000 W. η = (8800 ÷ 9000) × 100 = 97.78%.'
        ],
        isiNdebele: [
          '(a) V₂ = 2200 × (100 ÷ 1000) = 220 V.',
          '(b) I₂ = 8800 ÷ 220 = 40 A.',
          '(c) P_in = 9000 W. η = (8800 ÷ 9000) × 100 = 97.78%.'
        ],
        isiXhosa: [
          '(a) V₂ = 2200 × (100 ÷ 1000) = 220 V.',
          '(b) I₂ = 8800 ÷ 220 = 40 A.',
          '(c) P_in = 9000 W. η = (8800 ÷ 9000) × 100 = 97.78%.'
        ],
        Afrikaans: [
          '(a) V₂ = V₁ × (N₂ ÷ N₁) = 2200 × (100 ÷ 1000) = 220 V.',
          '(b) I₂ = P_out ÷ V₂ = 8800 ÷ 220 = 40 A.',
          '(c) P_in = P_out + Verliese = 8800 + 200 = 9000 W. η = (8800 ÷ 9000) × 100 = 97.78%.'
        ],
        English: [
          '(a) Turns ratio: V₂ = V₁ × (N₂ ÷ N₁) = 2200 V × (100 ÷ 1000) = 220 V.',
          '(b) Secondary load current: I₂ = P_out ÷ V₂ = 8800 W ÷ 220 V = 40 A.',
          '(c) Total Input Power: P_in = P_out + Losses = 8800 + 200 = 9000 W. Efficiency η = (8800 ÷ 9000) × 100 = 97.78%.'
        ]
      },
      finalAnswerByLanguage: {
        Xitsonga: '(a) V₂ = 220 V  |  (b) I₂ = 40 A  |  (c) η = 97.78%',
        Sepedi: '(a) V₂ = 220 V  |  (b) I₂ = 40 A  |  (c) η = 97.78%',
        isiZulu: '(a) V₂ = 220 V  |  (b) I₂ = 40 A  |  (c) η = 97.78%',
        Tshivenda: '(a) V₂ = 220 V  |  (b) I₂ = 40 A  |  (c) η = 97.78%',
        Sesotho: '(a) V₂ = 220 V  |  (b) I₂ = 40 A  |  (c) η = 97.78%',
        Setswana: '(a) V₂ = 220 V  |  (b) I₂ = 40 A  |  (c) η = 97.78%',
        Siswati: '(a) V₂ = 220 V  |  (b) I₂ = 40 A  |  (c) η = 97.78%',
        isiNdebele: '(a) V₂ = 220 V  |  (b) I₂ = 40 A  |  (c) η = 97.78%',
        isiXhosa: '(a) V₂ = 220 V  |  (b) I₂ = 40 A  |  (c) η = 97.78%',
        Afrikaans: '(a) V₂ = 220 V  |  (b) I₂ = 40 A  |  (c) η = 97.78%',
        English: '(a) V₂ = 220 V  |  (b) I₂ = 40 A  |  (c) η = 97.78%'
      }
    },
    practiceQuestions: [
      {
        number: 1,
        questionByLanguage: {
          Xitsonga: 'Transformer yi hunguta 400 V yi ya eka 100 V. Loko N₁ = 800 turns, kuma N₂.',
          Sepedi: 'Thransefoma e theola 400 V go ya go 100 V. Ge N₁ = 800 turns, hwetša N₂.',
          isiZulu: 'I-Transformer yehlisa u-400 V uye ku-100 V. Uma N₁ = 800 turns, thola N₂.',
          Tshivenda: 'Transformer i fhungudza 400 V u ya kha 100 V. N₁ = 800, wanani N₂.',
          Sesotho: 'Transformer e fokotsa 400 V ho ya ho 100 V. N₁ = 800, fumana N₂.',
          Setswana: 'Transefoma e fokotsa 400 V go ya go 100 V. N₁ = 800, bona N₂.',
          Siswati: 'I-Transformer yehlisela 400 V ku-100 V. N₁ = 800, tfola N₂.',
          isiNdebele: 'I-Transformer yehlisa 400 V ku-100 V. N₁ = 800, fumana N₂.',
          isiXhosa: 'I-Transformer yehlisa 400 V ku-100 V. N₁ = 800, fumana N₂.',
          Afrikaans: 'n Transformator verlaag 400 V na 100 V. As N₁ = 800 windings is, vind N₂.',
          English: 'A transformer steps 400 V down to 100 V. If primary turns N₁ = 800, calculate secondary turns N₂.'
        },
        answerByLanguage: {
          Xitsonga: 'N₂ = N₁ × (V₂ ÷ V₁) = 800 × (100 ÷ 400) = 200 turns.',
          Sepedi: 'N₂ = 800 × (100 ÷ 400) = 200 turns.',
          isiZulu: 'N₂ = 800 × (100 ÷ 400) = 200 turns.',
          Tshivenda: 'N₂ = 800 × (100 ÷ 400) = 200 turns.',
          Sesotho: 'N₂ = 800 × (100 ÷ 400) = 200 turns.',
          Setswana: 'N₂ = 800 × (100 ÷ 400) = 200 turns.',
          Siswati: 'N₂ = 800 × (100 ÷ 400) = 200 turns.',
          isiNdebele: 'N₂ = 800 × (100 ÷ 400) = 200 turns.',
          isiXhosa: 'N₂ = 800 × (100 ÷ 400) = 200 turns.',
          Afrikaans: 'N₂ = N₁ × (V₂ ÷ V₁) = 800 × (100 ÷ 400) = 200 windings.',
          English: 'N₂ = N₁ × (V₂ ÷ V₁) = 800 × (100 ÷ 400) = 200 turns.'
        }
      },
      {
        number: 2,
        questionByLanguage: {
          Xitsonga: 'Hikwalaho ka yini core ya transformer yi endliwa hi swiphepherhele swo lala swa silicon-steel ematshanweni ya nsimbi yinwe yo tiya?',
          Sepedi: 'Ke ka baka la eng core ya thransefoma e dirwa ka matlakala a masesane a silicon-steel?',
          isiZulu: 'Kungani i-core ye-transformer yenziwe ngama-laminations amancane e-silicon-steel?',
          Tshivenda: 'Ndi ngani core ya transformer i tshi itwa nga zwi-laminations zwa silicon-steel?',
          Sesotho: 'Ke hobaneng ha core ya transformer e entswe ka di-laminations tsa silicon-steel?',
          Setswana: 'Goreng core ya transefoma e dirwa ka di-laminations tsa silicon-steel?',
          Siswati: 'Kungani i-core ye-transformer yentiwe ngema-laminations e-silicon-steel?',
          isiNdebele: 'Kubayini i-core ye-transformer yenziwe ngama-laminations we-silicon-steel?',
          isiXhosa: 'Kutheni i-core ye-transformer yenziwe nge-laminations ye-silicon-steel?',
          Afrikaans: 'Waarom word n transformator-kern uit dun gelamelleerde silikonstaal-plate gebou?',
          English: 'Why is a transformer core built from thin laminated silicon-steel sheets instead of a solid iron block?'
        },
        answerByLanguage: {
          Xitsonga: 'Ku hunguta Eddy Current losses (laminations) na Hysteresis losses (silicon steel), leswaku core yi nga hisi swinene.',
          Sepedi: 'Go fokotša Eddy Current losses (matlakala a masesane) le Hysteresis losses (silicon steel).',
          isiZulu: 'Ukunciphisa ukulahleka kwe-Eddy Current (laminations) nokwe-Hysteresis (silicon steel).',
          Tshivenda: 'U fhungudza Eddy Current losses na Hysteresis losses.',
          Sesotho: 'Ho fokotsa Eddy Current losses le Hysteresis losses.',
          Setswana: 'Go fokotsa Eddy Current losses le Hysteresis losses.',
          Siswati: 'Kunciphisa Eddy Current losses ne-Hysteresis losses.',
          isiNdebele: 'Ukunciphisa i-Eddy Current losses ne-Hysteresis losses.',
          isiXhosa: 'Ukunciphisa i-Eddy Current losses ne-Hysteresis losses.',
          Afrikaans: 'Lamellasies breek werwelstrome (eddy currents) en silikonstaal verminder histerese-verliese.',
          English: 'Thin insulated laminations block circular eddy currents (cutting eddy-current loss) and silicon steel reduces magnetic hysteresis loss.'
        }
      }
    ]
  },
  {
    id: 'elec-n2-ch7-dc-machines',
    level: 3,
    chapterNumber: 7,
    chapterLabelByLanguage: {
      Xitsonga: 'N2 • Chapter 7',
      Sepedi: 'N2 • Chapter 7',
      isiZulu: 'N2 • Chapter 7',
      Tshivenda: 'N2 • Chapter 7',
      Sesotho: 'N2 • Chapter 7',
      Setswana: 'N2 • Chapter 7',
      Siswati: 'N2 • Chapter 7',
      isiNdebele: 'N2 • Chapter 7',
      isiXhosa: 'N2 • Chapter 7',
      Afrikaans: 'N2 • Chapter 7',
      English: 'N2 • Chapter 7'
    },
    titleByLanguage: {
      Xitsonga: 'Electrical Machines - DC Motors, Generators',
      Sepedi: 'Electrical Machines - DC Motors, Generators',
      isiZulu: 'Electrical Machines - DC Motors, Generators',
      Tshivenda: 'Electrical Machines - DC Motors, Generators',
      Sesotho: 'Electrical Machines - DC Motors, Generators',
      Setswana: 'Electrical Machines - DC Motors, Generators',
      Siswati: 'Electrical Machines - DC Motors, Generators',
      isiNdebele: 'Electrical Machines - DC Motors, Generators',
      isiXhosa: 'Electrical Machines - DC Motors, Generators',
      Afrikaans: 'Electrical Machines - DC Motors, Generators',
      English: 'Electrical Machines - DC Motors, Generators'
    },
    subtitleByLanguage: {
      Xitsonga: 'Ti-DC Motor (E_b = V − I_a·R_a) & DC Generators (V = E − I_a·R_a), Armature & Commutator',
      Sepedi: 'DC Motors (E_b = V − I_a·R_a) & DC Generators (V = E − I_a·R_a), Commutator',
      isiZulu: 'Ama-DC Motor (E_b = V − I_a·R_a) & DC Generators (V = E − I_a·R_a)',
      Tshivenda: 'DC Motors (E_b = V − I_a·R_a) & DC Generators (V = E − I_a·R_a)',
      Sesotho: 'DC Motors (E_b = V − I_a·R_a) & DC Generators (V = E − I_a·R_a)',
      Setswana: 'DC Motors (E_b = V − I_a·R_a) & DC Generators (V = E − I_a·R_a)',
      Siswati: 'DC Motors (E_b = V − I_a·R_a) & DC Generators (V = E − I_a·R_a)',
      isiNdebele: 'DC Motors (E_b = V − I_a·R_a) & DC Generators (V = E − I_a·R_a)',
      isiXhosa: 'DC Motors (E_b = V − I_a·R_a) & DC Generators (V = E − I_a·R_a)',
      Afrikaans: 'GS-Motors (E_b = V − I_a·R_a) en GS-Generators (V = E − I_a·R_a), Kommutator',
      English: 'DC motor back-EMF, DC generator terminal voltage, Series/Shunt/Compound connections'
    },
    summaryByLanguage: {
      Xitsonga:
        'DC Generator yi cinca matimba yo jikajika ma va DC electrical power (V = E − I_a×R_a), kasi DC Motor yi cinca gezi ra DC ri va matimba yo rhendzeleka (E_b = V − I_a×R_a). Michini hinkwayo ya DC yi na Field coils (Stator), Armature (Rotor), Commutator ya koporo na Carbon brushes.',
      Sepedi:
        'DC Generator e fetola maatla a go dikologa go ba mohlagase wa DC (V = E − I_a×R_a), mola DC Motor e fetola mohlagase go ba mosepelo (E_b = V − I_a×R_a).',
      isiZulu:
        'I-DC Generator iguqula ukujikeleza kube ugesi we-DC (V = E − I_a×R_a), kanti i-DC Motor iguqula ugesi ube ukujikeleza kwesondo (E_b = V − I_a×R_a).',
      Tshivenda:
        'DC Generator i bveledza DC (V = E − I_a×R_a), ngeno DC Motor i tshi mona nga mudagasi (E_b = V − I_a×R_a).',
      Sesotho:
        'DC Generator e etsa DC (V = E − I_a×R_a); DC Motor e fetola motlakase ho ba ho dikoloha (E_b = V − I_a×R_a).',
      Setswana:
        'DC Generator e dira DC (V = E − I_a×R_a); DC Motor e fetola motlakase go nna tsamaiso (E_b = V − I_a×R_a).',
      Siswati: 'DC Generator ikhicita DC (V = E − I_a×R_a); DC Motor igucula gezi abe kuhamba (E_b = V − I_a×R_a).',
      isiNdebele: 'I-DC Generator ikhiqiza i-DC (V = E − I_a×R_a); i-DC Motor itjhugulula igezi ibe ukukhamba.',
      isiXhosa: 'I-DC Generator ivelisa i-DC (V = E − I_a×R_a); i-DC Motor iguqula umbane ube ukujikeleza.',
      Afrikaans:
        'n GS-Generator sit meganiese rotasie om in gelykstroom (V = E − I_a×R_a), terwyl n GS-Motor GS-krag omsit in meganiese wringkrag (E_b = V − I_a×R_a).',
      English:
        'A DC Generator converts mechanical rotation into DC electricity (Terminal Voltage V = E − I_a × R_a), while a DC Motor converts DC power into rotating mechanical torque (Back EMF E_b = V − I_a × R_a). Machines are wound in Shunt (constant speed), Series (high starting torque), or Compound.'
    },
    keyTerms: [
      {
        termEn: 'Back EMF (E_b)',
        translations: {
          Xitsonga: 'Voltage leyi Lwisaka — Back EMF (E_b)',
          Sepedi: 'Back EMF (E_b = V − I_a·R_a)',
          isiZulu: 'I-Back EMF (E_b = V − I_a·R_a)',
          Tshivenda: 'Back EMF (E_b = V − I_a·R_a)',
          Sesotho: 'Back EMF (E_b = V − I_a·R_a)',
          Setswana: 'Back EMF (E_b = V − I_a·R_a)',
          Siswati: 'Back EMF (E_b = V − I_a·R_a)',
          isiNdebele: 'Back EMF (E_b = V − I_a·R_a)',
          isiXhosa: 'Back EMF (E_b = V − I_a·R_a)',
          Afrikaans: 'Teen-EMK (E_b = V − I_a·R_a)',
          English: 'Voltage induced in a spinning motor armature opposing supply V'
        },
        meaningByLanguage: {
          Xitsonga: 'Yi lawula armature current ya motor (I_a = (V − E_b) ÷ R_a); loko motor yi sungula ku rhendzeleka E_b = 0.',
          Sepedi: 'E laola armature current ge motor e dikologa.',
          isiZulu: 'Ilawula u-armature current uma i-motor ijikeleza.',
          Tshivenda: 'I langa armature current musi motor i tshi mona.',
          Sesotho: 'E laola armature current ha motor e dikoloha.',
          Setswana: 'E laola armature current fa motor e dikologa.',
          Siswati: 'Ilawula i-armature current uma i-motor ijikeleta.',
          isiNdebele: 'Ilawula i-armature current lokha i-motor ijikeleza.',
          isiXhosa: 'Ilawula i-armature current xa i-motor ijikeleza.',
          Afrikaans: 'Beperk ankerstroom tydens loop; by aanloop is E_b = 0 so n aansitterweerstand is nodig.',
          English: 'Limits armature current once spinning; at standstill E_b = 0 so large motors require a starter.'
        }
      },
      {
        termEn: 'Commutator & Carbon Brushes',
        translations: {
          Xitsonga: 'Commutator & Ti-Brush ta Khaboni',
          Sepedi: 'Commutator & Carbon Brushes',
          isiZulu: 'I-Commutator & Carbon Brushes',
          Tshivenda: 'Commutator & Carbon Brushes',
          Sesotho: 'Commutator & Carbon Brushes',
          Setswana: 'Commutator & Carbon Brushes',
          Siswati: 'I-Commutator & Carbon Brushes',
          isiNdebele: 'I-Commutator & Carbon Brushes',
          isiXhosa: 'I-Commutator & Carbon Brushes',
          Afrikaans: 'Kommutator en Koolborsels',
          English: 'Split copper ring & sliding contacts acting as mechanical rectifier'
        },
        meaningByLanguage: {
          Xitsonga: 'Yi cinca AC ya le ndzeni ka rotor yi va DC eka generator, naswona yi fambisa motor hi tlhelo rinwe.',
          Sepedi: 'E fetola AC ya ka gare ga armature go ba DC.',
          isiZulu: 'Iguqula i-AC engaphakathi ibe yi-DC ngaphandle.',
          Tshivenda: 'I shandukisa AC nga ngomu u vha DC.',
          Sesotho: 'E fetola AC ka hare ho ba DC.',
          Setswana: 'E fetola AC ka fa gare go nna DC.',
          Siswati: 'Igucula i-AC ngekhatsi ibe yi-DC.',
          isiNdebele: 'Itjhugulula i-AC ngaphakathi ibe yi-DC.',
          isiXhosa: 'Iguqula i-AC ngaphakathi ibe yi-DC.',
          Afrikaans: 'Skakel stroomrigting om by elke halfomwenteling sodat wringkrag in een rigting bly.',
          English: 'Reverses coil current every half-turn so motor torque stays continuous and generator output is DC.'
        }
      },
      {
        termEn: 'DC Series vs Shunt Motor',
        translations: {
          Xitsonga: 'Motor ya Series vs Shunt',
          Sepedi: 'DC Series vs Shunt Motor',
          isiZulu: 'DC Series vs Shunt Motor',
          Tshivenda: 'DC Series vs Shunt Motor',
          Sesotho: 'DC Series vs Shunt Motor',
          Setswana: 'DC Series vs Shunt Motor',
          Siswati: 'DC Series vs Shunt Motor',
          isiNdebele: 'DC Series vs Shunt Motor',
          isiXhosa: 'DC Series vs Shunt Motor',
          Afrikaans: 'GS Serie- teenoor Shuntmotor',
          English: 'Series = huge starting torque; Shunt = steady speed'
        },
        meaningByLanguage: {
          Xitsonga: 'Series motor yi tirhisiwa eka switirho swo tlakula (cranes/trains); Shunt yi tirhisiwa eka tilathe na fans.',
          Sepedi: 'Series motor ke ya cranes le trains (starting torque e kgolo); Shunt ke ya lebelo le le tsepamego.',
          isiZulu: 'I-Series eyama-crane nezitimela; i-Shunt igcina isivinini esifanayo (lathes).',
          Tshivenda: 'Series ndi ya cranes; Shunt i dzula i na luvhilo luthihi.',
          Sesotho: 'Series ke ya cranes; Shunt e boloka lebelo le tsitsitseng.',
          Setswana: 'Series ke ya cranes; Shunt e boloka lobelo lo lo tsepameng.',
          Siswati: 'Series yema-crane; Shunt igcina litubane lelifanako.',
          isiNdebele: 'Series ngeyama-crane; Shunt ibulunga ijubane elifanako.',
          isiXhosa: 'Series yeyee-crane; Shunt igcina isantya esizinzileyo.',
          Afrikaans: 'Seriemotor lewer hoë aansitwringkrag (hyskrane); shuntmotor handhaaf konstante spoed (draaibanke).',
          English: 'Never run a DC Series motor without a mechanical load or its speed will overspeed dangerously.'
        }
      }
    ],
    workedExample: {
      questionByLanguage: {
        Xitsonga:
          '240 V DC shunt motor yi na armature resistance R_a = 0.5 Ω naswona yi koka I_a = 20 A. Yi nyika output power P_out = 4080 W kusuka eka input P_in = 4800 W. Hlayela: (a) Back EMF E_b, na (b) efficiency η%.',
        Sepedi:
          'Motor ya 240 V DC shunt e na le R_a = 0.5 Ω le I_a = 20 A, P_out = 4080 W, P_in = 4800 W. Bala: (a) E_b, le (b) η%.',
        isiZulu:
          'I-240 V DC shunt motor ine-R_a = 0.5 Ω no-I_a = 20 A, P_out = 4080 W, P_in = 4800 W. Bala: (a) E_b, ne-(b) η%.',
        Tshivenda:
          '240 V DC shunt motor i na R_a = 0.5 Ω, I_a = 20 A, P_out = 4080 W, P_in = 4800 W. Vhalelani: (a) E_b, na (b) η%.',
        Sesotho:
          '240 V DC shunt motor e na le R_a = 0.5 Ω, I_a = 20 A, P_out = 4080 W, P_in = 4800 W. Bala: (a) E_b, le (b) η%.',
        Setswana:
          '240 V DC shunt motor e na le R_a = 0.5 Ω, I_a = 20 A, P_out = 4080 W, P_in = 4800 W. Bala: (a) E_b, le (b) η%.',
        Siswati:
          '240 V DC shunt motor ine-R_a = 0.5 Ω, I_a = 20 A, P_out = 4080 W, P_in = 4800 W. Bala: (a) E_b, ne-(b) η%.',
        isiNdebele:
          '240 V DC shunt motor ine-R_a = 0.5 Ω, I_a = 20 A, P_out = 4080 W, P_in = 4800 W. Bala: (a) E_b, ne-(b) η%.',
        isiXhosa:
          '240 V DC shunt motor ine-R_a = 0.5 Ω, I_a = 20 A, P_out = 4080 W, P_in = 4800 W. Bala: (a) E_b, ne-(b) η%.',
        Afrikaans:
          'n 240 V GS-shuntmotor het ankerweerstand R_a = 0.5 Ω en I_a = 20 A. Dit lewer P_out = 4080 W uit P_in = 4800 W. Bereken: (a) Teen-EMK E_b, en (b) doeltreffendheid η%.',
        English:
          'A 240 V DC shunt motor has armature resistance R_a = 0.5 Ω and draws armature current I_a = 20 A. It produces P_out = 4080 W mechanical power from P_in = 4800 W electrical input. Calculate: (a) back EMF E_b, and (b) efficiency η%.'
      },
      stepsByLanguage: {
        Xitsonga: [
          '(a) E_b = V − (I_a × R_a) = 240 − (20 × 0.5) = 240 − 10 = 230 V.',
          '(b) η = (P_out ÷ P_in) × 100 = (4080 ÷ 4800) × 100 = 85%.'
        ],
        Sepedi: [
          '(a) E_b = 240 − (20 × 0.5) = 240 − 10 = 230 V.',
          '(b) η = (4080 ÷ 4800) × 100 = 85%.'
        ],
        isiZulu: [
          '(a) E_b = 240 − (20 × 0.5) = 240 − 10 = 230 V.',
          '(b) η = (4080 ÷ 4800) × 100 = 85%.'
        ],
        Tshivenda: [
          '(a) E_b = 240 − (20 × 0.5) = 230 V.',
          '(b) η = (4080 ÷ 4800) × 100 = 85%.'
        ],
        Sesotho: [
          '(a) E_b = 240 − (20 × 0.5) = 230 V.',
          '(b) η = (4080 ÷ 4800) × 100 = 85%.'
        ],
        Setswana: [
          '(a) E_b = 240 − (20 × 0.5) = 230 V.',
          '(b) η = (4080 ÷ 4800) × 100 = 85%.'
        ],
        Siswati: [
          '(a) E_b = 240 − (20 × 0.5) = 230 V.',
          '(b) η = (4080 ÷ 4800) × 100 = 85%.'
        ],
        isiNdebele: [
          '(a) E_b = 240 − (20 × 0.5) = 230 V.',
          '(b) η = (4080 ÷ 4800) × 100 = 85%.'
        ],
        isiXhosa: [
          '(a) E_b = 240 − (20 × 0.5) = 230 V.',
          '(b) η = (4080 ÷ 4800) × 100 = 85%.'
        ],
        Afrikaans: [
          '(a) E_b = V − (I_a × R_a) = 240 − (20 × 0.5) = 240 − 10 = 230 V.',
          '(b) η = (P_out ÷ P_in) × 100 = (4080 ÷ 4800) × 100 = 85%.'
        ],
        English: [
          '(a) E_b = V − (I_a × R_a) = 240 − (20 × 0.5) = 240 − 10 = 230 V.',
          '(b) η = (P_out ÷ P_in) × 100 = (4080 ÷ 4800) × 100 = 85%.'
        ]
      },
      finalAnswerByLanguage: {
        Xitsonga: '(a) E_b = 230 V  |  (b) η = 85%',
        Sepedi: '(a) E_b = 230 V  |  (b) η = 85%',
        isiZulu: '(a) E_b = 230 V  |  (b) η = 85%',
        Tshivenda: '(a) E_b = 230 V  |  (b) η = 85%',
        Sesotho: '(a) E_b = 230 V  |  (b) η = 85%',
        Setswana: '(a) E_b = 230 V  |  (b) η = 85%',
        Siswati: '(a) E_b = 230 V  |  (b) η = 85%',
        isiNdebele: '(a) E_b = 230 V  |  (b) η = 85%',
        isiXhosa: '(a) E_b = 230 V  |  (b) η = 85%',
        Afrikaans: '(a) E_b = 230 V  |  (b) η = 85%',
        English: '(a) E_b = 230 V  |  (b) η = 85%'
      }
    },
    practiceQuestions: [
      {
        number: 1,
        questionByLanguage: {
          Xitsonga: 'DC generator yi tumbuluxa E = 250 V hi R_a = 0.4 Ω naswona yi nyika I_a = 25 A. Hlayela terminal voltage V.',
          Sepedi: 'DC generator e hlahisa E = 250 V ka R_a = 0.4 Ω le I_a = 25 A. Bala terminal voltage V.',
          isiZulu: 'I-DC generator ikhiqiza E = 250 V nge-R_a = 0.4 Ω no-I_a = 25 A. Bala u-V.',
          Tshivenda: 'DC generator i na E = 250 V, R_a = 0.4 Ω, I_a = 25 A. Vhalelani V.',
          Sesotho: 'DC generator e na le E = 250 V, R_a = 0.4 Ω, I_a = 25 A. Bala V.',
          Setswana: 'DC generator e na le E = 250 V, R_a = 0.4 Ω, I_a = 25 A. Bala V.',
          Siswati: 'DC generator ine-E = 250 V, R_a = 0.4 Ω, I_a = 25 A. Bala V.',
          isiNdebele: 'I-DC generator ine-E = 250 V, R_a = 0.4 Ω, I_a = 25 A. Bala V.',
          isiXhosa: 'I-DC generator ine-E = 250 V, R_a = 0.4 Ω, I_a = 25 A. Bala V.',
          Afrikaans: 'n GS-generator wek E = 250 V op met R_a = 0.4 Ω en lewer I_a = 25 A. Bereken klemspanning V.',
          English: 'A DC generator induces E = 250 V with R_a = 0.4 Ω while supplying I_a = 25 A. Calculate terminal voltage V.'
        },
        answerByLanguage: {
          Xitsonga: 'V = E − (I_a × R_a) = 250 − (25 × 0.4) = 250 − 10 = 240 V.',
          Sepedi: 'V = 250 − (25 × 0.4) = 240 V.',
          isiZulu: 'V = 250 − (25 × 0.4) = 240 V.',
          Tshivenda: 'V = 250 − (25 × 0.4) = 240 V.',
          Sesotho: 'V = 250 − (25 × 0.4) = 240 V.',
          Setswana: 'V = 250 − (25 × 0.4) = 240 V.',
          Siswati: 'V = 250 − (25 × 0.4) = 240 V.',
          isiNdebele: 'V = 250 − (25 × 0.4) = 240 V.',
          isiXhosa: 'V = 250 − (25 × 0.4) = 240 V.',
          Afrikaans: 'V = E − (I_a × R_a) = 250 − (25 × 0.4) = 250 − 10 = 240 V.',
          English: 'For a Generator: V = E − (I_a × R_a) = 250 − (25 × 0.4) = 250 − 10 = 240 V.'
        }
      },
      {
        number: 2,
        questionByLanguage: {
          Xitsonga: 'Hi wihi ntirho wa commutator na carbon brushes eka muchini wa DC?',
          Sepedi: 'Mošomo wa commutator le carbon brushes mo motšheneng wa DC ke ofe?',
          isiZulu: 'Uyini umsebenzi we-commutator nama-carbon brushes emshinini we-DC?',
          Tshivenda: 'Mushumo wa commutator na carbon brushes kha DC machine ndi ufhio?',
          Sesotho: 'Mosebetsi wa commutator le carbon brushes ke ofe?',
          Setswana: 'Tiro ya commutator le carbon brushes ke eng?',
          Siswati: 'Uyini umsebenti we-commutator nema-carbon brushes?',
          isiNdebele: 'Uyini umsebenzi we-commutator nama-carbon brushes?',
          isiXhosa: 'Yintoni umsebenzi we-commutator nee-carbon brushes?',
          Afrikaans: 'Wat is die funksie van die kommutator en koolborsels in n GS-masjien?',
          English: 'State the main function of the commutator and carbon brushes in a DC machine.'
        },
        answerByLanguage: {
          Xitsonga: 'Eka generator yi cinca AC ya le ndzeni yi va DC ehandle; eka motor yi cinca tlhelo ra current ku tiyisa ku rhendzeleka ku ya emahlweni.',
          Sepedi: 'Go generator e fetola AC ya ka gare go ba DC; go motor e boloka modikologo o lebile pele.',
          isiZulu: 'Ku-generator iguqula i-AC ibe yi-DC; ku-motor igcina ukujikeleza kuhamba ngendlela eyodwa.',
          Tshivenda: 'Kha generator i shandukisa AC u vha DC; kha motor i dzudzanya u mona.',
          Sesotho: 'Ho generator e fetola AC ho ba DC; ho motor e boloka potoloho.',
          Setswana: 'Mo generator e fetola AC go nna DC; mo motor e tshola modikologo.',
          Siswati: 'Ku-generator igucula AC ibe DC; ku-motor igcina kujikeleta.',
          isiNdebele: 'Ku-generator itjhugulula AC ibe DC; ku-motor ibulunga ukujikeleza.',
          isiXhosa: 'Kwi-generator iguqula AC ibe DC; kwi-motor igcina ukujikeleza.',
          Afrikaans: 'Skakel stroomrigting om by elke halfomwenteling — dien as gelykrigter in n generator of hou wringkrag eenrigting in n motor.',
          English: 'Acts as a mechanical switch: converts internal AC into external DC in a generator, and reverses coil current every half-turn in a motor so torque continues in one direction.'
        }
      }
    ]
  },
  {
    id: 'elec-n2-ch8-protection',
    level: 3,
    chapterNumber: 8,
    chapterLabelByLanguage: {
      Xitsonga: 'N2 • Chapter 8',
      Sepedi: 'N2 • Chapter 8',
      isiZulu: 'N2 • Chapter 8',
      Tshivenda: 'N2 • Chapter 8',
      Sesotho: 'N2 • Chapter 8',
      Setswana: 'N2 • Chapter 8',
      Siswati: 'N2 • Chapter 8',
      isiNdebele: 'N2 • Chapter 8',
      isiXhosa: 'N2 • Chapter 8',
      Afrikaans: 'N2 • Chapter 8',
      English: 'N2 • Chapter 8'
    },
    titleByLanguage: {
      Xitsonga: 'Protection - Fuses, Breakers, Earthing',
      Sepedi: 'Protection - Fuses, Breakers, Earthing',
      isiZulu: 'Protection - Fuses, Breakers, Earthing',
      Tshivenda: 'Protection - Fuses, Breakers, Earthing',
      Sesotho: 'Protection - Fuses, Breakers, Earthing',
      Setswana: 'Protection - Fuses, Breakers, Earthing',
      Siswati: 'Protection - Fuses, Breakers, Earthing',
      isiNdebele: 'Protection - Fuses, Breakers, Earthing',
      isiXhosa: 'Protection - Fuses, Breakers, Earthing',
      Afrikaans: 'Protection - Fuses, Breakers, Earthing',
      English: 'Protection - Fuses, Breakers, Earthing'
    },
    subtitleByLanguage: {
      Xitsonga: 'Ti-Fuse, Circuit Breakers (MCB), Earth Leakage (RCD 30 mA) & Earthing Systems',
      Sepedi: 'Difuse, Di-MCB, Earth Leakage (RCD 30 mA) & Earthing',
      isiZulu: 'Ama-Fuse, ama-Circuit Breaker (MCB), Earth Leakage (30 mA) & Earthing',
      Tshivenda: 'Dzi-Fuse, Breakers (MCB), Earth Leakage (30 mA) & Earthing',
      Sesotho: 'Difuse, Breakers (MCB), Earth Leakage (30 mA) & Earthing',
      Setswana: 'Difuse, Breakers (MCB), Earth Leakage (30 mA) & Earthing',
      Siswati: 'Ema-Fuse, Breakers (MCB), Earth Leakage (30 mA) & Earthing',
      isiNdebele: 'Ama-Fuse, Breakers (MCB), Earth Leakage (30 mA) & Earthing',
      isiXhosa: 'Ii-Fuse, Breakers (MCB), Earth Leakage (30 mA) & Earthing',
      Afrikaans: 'Smeltsekerings, Stroombrekers (MCB), Aardlek (RCD 30 mA) en Aarding',
      English: 'Overload & short-circuit protection, earth leakage tripping & earthing'
    },
    summaryByLanguage: {
      Xitsonga:
        'Nsirhelelo wa gezi wu sirhelela vanhu, tikabel na michini eka ndzilo na ku biwa hi gezi. Ti-Fuse ti noka loko gezi ri hundza mpimo; Circuit Breakers (MCB) ti tsema gezi hi xitshuketa naswona ti tlhela ti vuyiseriwa; Earth Leakage (RCD 30 mA) yi tsema loko gezi ri chuluka ku ya e-earth. Earthing yi hlanganisa tinsimbi hinkwato na misava.',
      Sepedi:
        'Tšhireletšo ya mohlagase e šireletša batho le megala kgahlanong le mollo le kotsi. Difuse di a tologa ge current e le kgolo; Di-MCB di a kgaola gomme di ka bušwa; Earth Leakage (30 mA RCD) e kgaola ge go na le earth fault.',
      isiZulu:
        'Ukuvikela kukagesi kuvikela abantu nezintambo emlilo-mlilo nasekuqothweni. Ama-Fuse ayancibilika; ama-MCB ayacima futhi abuye avulwe; i-Earth Leakage (30 mA RCD) icima uma kukhona ukuphuma kugesi kuye emhlabathini.',
      Tshivenda:
        'Tsireledzo i thivhela mulilo na khombo ya mudagasi. Fuse i a noka; MCB i a tuma ya dovha ya vulea; RCD (30 mA) i tuma kha earth leakage.',
      Sesotho:
        'Tshireletso e sireletsa batho le dithapo. Fuse e a qhibidiha; MCB e a kgaoha; RCD (30 mA) e kgaola ha ho na le earth fault.',
      Setswana:
        'Pabalesego e sireletsa batho le megala. Fuse e a nyera; MCB e a kgaola; RCD (30 mA) e kgaola fa go na le earth fault.',
      Siswati: 'Kuvikela kuvikela bantfu netintsambo. Fuse iyancibilika; MCB iyacima; RCD (30 mA) icima nge-earth leakage.',
      isiNdebele: 'Ukuvikela kuvikela abantu neentambo. Fuse iyancibilika; MCB iyatjhitjha; RCD (30 mA) iyacima nge-earth fault.',
      isiXhosa: 'Ukhuseleko lukhusela abantu neentambo. Fuse iyanyibilika; MCB iyacima; RCD (30 mA) iyacima nge-earth leakage.',
      Afrikaans:
        'Beskerming beskerm mense, kabels en toerusting. Smeltsekerings smelt by oorstroom; MCB-brekers skakel vinnig af en kan herstel word; 30 mA aardlekskakelaars (RCD) beskerm lewens. Aarding bind metaalkaste aan aarde vir lae foutlus-impedansie.',
      English:
        'Electrical protection safeguards lives, cables, and equipment from overloads, short circuits, and earth faults. Fuses melt a sacrificial element on excess current; MCBs trip thermally (overload) and magnetically (short circuit) and can be reset; RCDs (30 mA) detect tiny earth leakage imbalances; Earthing bonds exposed metal enclosures to earth so faults trip breakers instantly.'
    },
    keyTerms: [
      {
        termEn: 'MCB (Miniature Circuit Breaker)',
        translations: {
          Xitsonga: 'Circuit Breaker (MCB)',
          Sepedi: 'Circuit Breaker (MCB)',
          isiZulu: 'I-Circuit Breaker (MCB)',
          Tshivenda: 'Circuit Breaker (MCB)',
          Sesotho: 'Circuit Breaker (MCB)',
          Setswana: 'Circuit Breaker (MCB)',
          Siswati: 'Circuit Breaker (MCB)',
          isiNdebele: 'Circuit Breaker (MCB)',
          isiXhosa: 'Circuit Breaker (MCB)',
          Afrikaans: 'Miniatuur Stroombreker (MCB)',
          English: 'Resettable thermal + magnetic overcurrent protective switch'
        },
        meaningByLanguage: {
          Xitsonga: 'Yi tsema circuit hi ku tirhisa bi-metallic strip (overload) na electromagnet (short circuit).',
          Sepedi: 'E kgaola ge moela o le mogolo gomme e ka bušetšwa morago ga go lokiša phošo.',
          isiZulu: 'Icima ugesi uma ugelezi udlulela noma kunesifo se-short circuit.',
          Tshivenda: 'I tuma mudagasi kha overload kana short circuit.',
          Sesotho: 'E kgaola motlakase ha ho na le overload kapa short circuit.',
          Setswana: 'E kgaola motlakase fa go na le overload kgotsa short circuit.',
          Siswati: 'Icima gezi uma kune-overload noma short circuit.',
          isiNdebele: 'Iyatjhitjha lokha kune-overload namkha short circuit.',
          isiXhosa: 'Iyacima xa kukho i-overload okanye i-short circuit.',
          Afrikaans: 'Skakel termies (oorlading) en magneties (kortsluiting) af en kan weer aangeskakel word.',
          English: 'Dual-action breaker: bimetallic strip handles slow overloads; solenoid magnet trips instantaneously on short circuits.'
        }
      },
      {
        termEn: 'Earth Leakage Unit (RCD — 30 mA)',
        translations: {
          Xitsonga: 'Earth Leakage (RCD — 30 mA)',
          Sepedi: 'Earth Leakage (RCD — 30 mA)',
          isiZulu: 'I-Earth Leakage (RCD — 30 mA)',
          Tshivenda: 'Earth Leakage (RCD — 30 mA)',
          Sesotho: 'Earth Leakage (RCD — 30 mA)',
          Setswana: 'Earth Leakage (RCD — 30 mA)',
          Siswati: 'Earth Leakage (RCD — 30 mA)',
          isiNdebele: 'Earth Leakage (RCD — 30 mA)',
          isiXhosa: 'Earth Leakage (RCD — 30 mA)',
          Afrikaans: 'Aardlekskakelaar (RCD — 30 mA)',
          English: 'Life-saving switch tripping within milliseconds on 30 mA earth leakage'
        },
        meaningByLanguage: {
          Xitsonga: 'Yi pimanisa gezi leri nghenaka hi Live na leri tlhelaka hi Neutral; loko ku lahleka 30 mA ya tsema.',
          Sepedi: 'E bapiša Live le Neutral; ge 30 mA e tšwela go earth e a kgaola.',
          isiZulu: 'Iqhathanisa u-Live no-Neutral; uma u-30 mA uphuma uya emhlabathini iyacima.',
          Tshivenda: 'I vhambedza Live na Neutral; ya tuma kha 30 mA.',
          Sesotho: 'E bapisa Live le Neutral; e kgaola ho 30 mA.',
          Setswana: 'E bapisa Live le Neutral; e kgaola kwa 30 mA.',
          Siswati: 'Icathanisa Live na-Neutral; icima ku-30 mA.',
          isiNdebele: 'Iqathanisa i-Live no-Neutral; icima ku-30 mA.',
          isiXhosa: 'Ithelekisa i-Live ne-Neutral; icima ku-30 mA.',
          Afrikaans: 'Meet stroomverskil tussen Lewendig en Neutraal; skakel binne millisekondes af bokant 30 mA.',
          English: 'Monitors Live vs Neutral current balance; trips in milliseconds if ≥ 30 mA leaks to earth.'
        }
      },
      {
        termEn: 'Earthing & Bonding',
        translations: {
          Xitsonga: 'Ku Hlanganisa na Misava (Earthing)',
          Sepedi: 'Go Kgokaganya le Lefase (Earthing)',
          isiZulu: 'Ukuxhuma Emhlabathini (Earthing)',
          Tshivenda: 'U Thumana na Mavu (Earthing)',
          Sesotho: 'Ho Hokela Lefatsheng (Earthing)',
          Setswana: 'Go Golagana le Lefatshe (Earthing)',
          Siswati: 'Kuchumana Nemhlaba (Earthing)',
          isiNdebele: 'Ukuthintana Nephasi (Earthing)',
          isiXhosa: 'Ukuqhagamshela Emhlabeni (Earthing)',
          Afrikaans: 'Aarding en Verbinding',
          English: 'Connecting exposed metal parts to earth with very low impedance Z_s'
        },
        meaningByLanguage: {
          Xitsonga: 'Yi endla ndlela yo olova ya fault current leswaku breaker yi tsema hi xihatla ku ri na ku xavisa vanhu.',
          Sepedi: 'E fa moela wa phošo tsela ya bonolo gore breaker e kgaole ka pela.',
          isiZulu: 'Inikeza indlela elula ukuze i-breaker icime ngokushesha uma intambo ye-Live ithinta insimbi.',
          Tshivenda: 'I ita ndila ya vhudi uri breaker i tume nga u tavhanya.',
          Sesotho: 'E etsa tsela e bobebe hore breaker e kgaole hanghang.',
          Setswana: 'E dira tsela e e botlhofo gore breaker e kgaole ka bonako.',
          Siswati: 'Yenta indlela lelula kutsi i-breaker icime masinyane.',
          isiNdebele: 'Yenza indlela elula bonyana i-breaker icime msinyana.',
          isiXhosa: 'Yenza indlela elula yokuba i-breaker icime ngokukhawuleza.',
          Afrikaans: 'Verseker lae aardfoutlus-impedansie Z_s sodat die breker onmiddellik uitskakel.',
          English: 'Provides a low-impedance fault path back to source so overcurrent breakers trip fast and metal frames stay safe.'
        }
      }
    ],
    workedExample: {
      questionByLanguage: {
        Xitsonga:
          'Heater ya workshop ya P = 3450 W yi tirha eka 230 V. (a) Hlayela normal current I, (b) hlawula breaker ya MCB (10 A, 16 A, 20 A, kumbe 32 A), na (c) loko fault loop impedance yi ri Z_s = 2.3 Ω, hlayela fault current I_f.',
        Sepedi:
          'Heater ya 3450 W e šoma go 230 V. (a) Bala current I, (b) kgetha MCB (10 A, 16 A, 20 A, 32 A), gomme (c) ge Z_s = 2.3 Ω, bala fault current I_f.',
        isiZulu:
          'I-Heater engu-3450 W isebenza ku-230 V. (a) Bala u-I, (b) khetha i-MCB (10 A, 16 A, 20 A, 32 A), futhi (c) uma Z_s = 2.3 Ω, bala u-I_f.',
        Tshivenda:
          'Heater ya 3450 W kha 230 V. (a) Vhalelani I, (b) nangani MCB, (c) arali Z_s = 2.3 Ω, vhalelani I_f.',
        Sesotho:
          'Heater ya 3450 W ho 230 V. (a) Bala I, (b) kgetha MCB, (c) ha Z_s = 2.3 Ω, bala I_f.',
        Setswana:
          'Heater ya 3450 W mo 230 V. (a) Bala I, (b) tlhopha MCB, (c) fa Z_s = 2.3 Ω, bala I_f.',
        Siswati:
          'Heater ya-3450 W ku-230 V. (a) Bala I, (b) khetsa MCB, (c) uma Z_s = 2.3 Ω, bala I_f.',
        isiNdebele:
          'I-Heater ye-3450 W ku-230 V. (a) Bala I, (b) khetha i-MCB, (c) uma Z_s = 2.3 Ω, bala I_f.',
        isiXhosa:
          'I-Heater eyi-3450 W ku-230 V. (a) Bala I, (b) khetha i-MCB, (c) xa Z_s = 2.3 Ω, bala I_f.',
        Afrikaans:
          'n Werkswinkelverwarmer van P = 3450 W werk op 230 V. (a) Bereken normale lasstroom I, (b) kies die geskikte MCB (10 A, 16 A, 20 A of 32 A), en (c) as aardfoutlus-impedansie Z_s = 2.3 Ω is, bereken foutstroom I_f.',
        English:
          'A workshop heater rated at P = 3450 W operates on a 230 V supply. (a) Calculate normal load current I, (b) select the correct standard MCB (10 A, 16 A, 20 A, or 32 A), and (c) if earth fault loop impedance Z_s = 2.3 Ω, calculate fault current I_f.'
      },
      stepsByLanguage: {
        Xitsonga: [
          '(a) I = P ÷ V = 3450 ÷ 230 = 15 A.',
          '(b) Hlawula 20 A MCB (16 A yi le kusuhi ngopfu na 15 A naswona yi nga ha tsema handle ka xihoxo; 20 A yi sirhelela kabel kahle).',
          '(c) Fault current I_f = V ÷ Z_s = 230 ÷ 2.3 = 100 A (yi tsema 20 A MCB hi xihatla!).'
        ],
        Sepedi: [
          '(a) I = 3450 ÷ 230 = 15 A.',
          '(b) Kgetha 20 A MCB go thibela nuisance tripping go 16 A.',
          '(c) I_f = 230 ÷ 2.3 = 100 A (e kgaola 20 A MCB ka pela).'
        ],
        isiZulu: [
          '(a) I = 3450 ÷ 230 = 15 A.',
          '(b) Khetha u-20 A MCB ukuze ingacimi ngephutha ku-16 A.',
          '(c) I_f = 230 ÷ 2.3 = 100 A (icima u-20 A MCB ngokushesha).'
        ],
        Tshivenda: [
          '(a) I = 3450 ÷ 230 = 15 A.',
          '(b) Nangani 20 A MCB.',
          '(c) I_f = 230 ÷ 2.3 = 100 A.'
        ],
        Sesotho: [
          '(a) I = 3450 ÷ 230 = 15 A.',
          '(b) Kgetha 20 A MCB.',
          '(c) I_f = 230 ÷ 2.3 = 100 A.'
        ],
        Setswana: [
          '(a) I = 3450 ÷ 230 = 15 A.',
          '(b) Tlhopha 20 A MCB.',
          '(c) I_f = 230 ÷ 2.3 = 100 A.'
        ],
        Siswati: [
          '(a) I = 3450 ÷ 230 = 15 A.',
          '(b) Khetsa 20 A MCB.',
          '(c) I_f = 230 ÷ 2.3 = 100 A.'
        ],
        isiNdebele: [
          '(a) I = 3450 ÷ 230 = 15 A.',
          '(b) Khetha 20 A MCB.',
          '(c) I_f = 230 ÷ 2.3 = 100 A.'
        ],
        isiXhosa: [
          '(a) I = 3450 ÷ 230 = 15 A.',
          '(b) Khetha 20 A MCB.',
          '(c) I_f = 230 ÷ 2.3 = 100 A.'
        ],
        Afrikaans: [
          '(a) I = P ÷ V = 3450 ÷ 230 = 15 A.',
          '(b) Kies n 20 A MCB (16 A is te naby aan 15 A vollasstroom).',
          '(c) Foutstroom I_f = V ÷ Z_s = 230 ÷ 2.3 = 100 A (5 × 20 A, so dit skakel oombliklik af).'
        ],
        English: [
          '(a) Load Current: I = P ÷ V = 3450 W ÷ 230 V = 15 A.',
          '(b) Choose 20 A MCB (16 A leaves too little margin above 15 A continuous load; 20 A suits a 2.5 mm²/4 mm² radial heater circuit).',
          '(c) Earth Fault Current: I_f = V ÷ Z_s = 230 V ÷ 2.3 Ω = 100 A — equals 5 × rated current of 20 A, causing instant magnetic trip.'
        ]
      },
      finalAnswerByLanguage: {
        Xitsonga: '(a) I = 15 A  |  (b) 20 A MCB  |  (c) I_f = 100 A',
        Sepedi: '(a) I = 15 A  |  (b) 20 A MCB  |  (c) I_f = 100 A',
        isiZulu: '(a) I = 15 A  |  (b) 20 A MCB  |  (c) I_f = 100 A',
        Tshivenda: '(a) I = 15 A  |  (b) 20 A MCB  |  (c) I_f = 100 A',
        Sesotho: '(a) I = 15 A  |  (b) 20 A MCB  |  (c) I_f = 100 A',
        Setswana: '(a) I = 15 A  |  (b) 20 A MCB  |  (c) I_f = 100 A',
        Siswati: '(a) I = 15 A  |  (b) 20 A MCB  |  (c) I_f = 100 A',
        isiNdebele: '(a) I = 15 A  |  (b) 20 A MCB  |  (c) I_f = 100 A',
        isiXhosa: '(a) I = 15 A  |  (b) 20 A MCB  |  (c) I_f = 100 A',
        Afrikaans: '(a) I = 15 A  |  (b) 20 A MCB  |  (c) I_f = 100 A',
        English: '(a) I = 15 A  |  (b) 20 A MCB  |  (c) I_f = 100 A'
      }
    },
    practiceQuestions: [
      {
        number: 1,
        questionByLanguage: {
          Xitsonga: 'Pimanisa cartridge fuse na Miniature Circuit Breaker (MCB).',
          Sepedi: 'Bapiša cartridge fuse le Miniature Circuit Breaker (MCB).',
          isiZulu: 'Qhathanisa i-cartridge fuse ne-Miniature Circuit Breaker (MCB).',
          Tshivenda: 'Vhambedzani cartridge fuse na MCB.',
          Sesotho: 'Bapisa cartridge fuse le MCB.',
          Setswana: 'Bapisa cartridge fuse le MCB.',
          Siswati: 'Cathanisa i-cartridge fuse ne-MCB.',
          isiNdebele: 'Qathanisa i-cartridge fuse ne-MCB.',
          isiXhosa: 'Thelekisa i-cartridge fuse ne-MCB.',
          Afrikaans: 'Vergelyk n patroonsekering (fuse) met n miniatuur stroombreker (MCB).',
          English: 'Compare a cartridge fuse with a Miniature Circuit Breaker (MCB).'
        },
        answerByLanguage: {
          Xitsonga: 'Fuse yi noka waya yinwe naswona yi fanele ku cinciwa loko yi file; MCB yi tsema switshuketa naswona yi nga vuyiseriwa (reset) loko xihoxo xi lunghisiwile.',
          Sepedi: 'Fuse e a tologa gomme e swanetše go fetolwa; MCB e a kgaola gomme e ka bušetšwa morago ga go lokiša.',
          isiZulu: 'I-Fuse iyancibilika kufanele ishintshwe; i-MCB iyacima kodwa ingabuye ivulwe.',
          Tshivenda: 'Fuse i a noka ya shandukiswa; MCB i a vulea hafhu.',
          Sesotho: 'Fuse e a qhibidiha e nkelwa sebaka; MCB e ka bulwa hape.',
          Setswana: 'Fuse e a nyera e tsenngwa e nngwe; MCB e ka bulwa gape.',
          Siswati: 'Fuse iyancibilika kufanele ishintjwe; MCB ingabuye ivulwe.',
          isiNdebele: 'Fuse iyancibilika itjhugululwe; MCB ingabuye ivulwe.',
          isiXhosa: 'Fuse iyanyibilika itshintshwe; MCB ingaphinda ivulwe.',
          Afrikaans: 'n Sekering smelt eenmalig en moet vervang word; n MCB kan na foutopsporing herstel (aangeskakel) word.',
          English: 'A fuse melts a sacrificial wire once and must be replaced; an MCB trips thermally/magnetically and can be safely reset after clearing the fault.'
        }
      },
      {
        number: 2,
        questionByLanguage: {
          Xitsonga: 'Hikwalaho ka yini bokisi ra nsimbi ra muchini ri fanele ku hlanganisiwa na earth?',
          Sepedi: 'Ke ka baka la eng lekase la tshipi la motšhene le swanetše go kgokaganywa le earth?',
          isiZulu: 'Kungani ibhokisi lensimbi lomshini kumele lixhunywe ku-earth?',
          Tshivenda: 'Ndi ngani bogisi la tsimbi li tshi tea u thumanyiwa na earth?',
          Sesotho: 'Ke hobaneng ha lebokose la tshepe le tlameha ho hokelwa ho earth?',
          Setswana: 'Goreng lebokoso la tshipi le tshwanetse go golaganngwa le earth?',
          Siswati: 'Kungani libhokisi lensimbi kumele lichunywe ku-earth?',
          isiNdebele: 'Kubayini ibhokisi lesimbi kufanele lithintane ne-earth?',
          isiXhosa: 'Kutheni ibhokisi yentsimbi kufuneka iqhagamshelwe ku-earth?',
          Afrikaans: 'Waarom moet elke metaalbehuising van n toestel geaard wees?',
          English: 'Why must exposed metal casings of appliances always be bonded to earth?'
        },
        answerByLanguage: {
          Xitsonga: 'Loko waya ya Live yi khoma nsimbi, earthing yi endla fault current leyi tsemaka breaker hi xihatla ematshanweni yo siya nsimbi yi ri na 230 V.',
          Sepedi: 'Ge terata ya Live e kgoma tshipi, earthing e dira gore breaker e kgaole ka pela go e na le go tlogela 230 V.',
          isiZulu: 'Uma u-Live ethinta insimbi, i-earth yenza i-breaker icime ngokushesha esikhundleni sokushiya u-230 V.',
          Tshivenda: 'Arali Live ya fara tsimbi, earth i ita uri breaker i tume nga u tavhanya.',
          Sesotho: 'Ha Live e tshwara tshepe, earth e etsa hore breaker e kgaole hanghang.',
          Setswana: 'Fa Live e ama tshipi, earth e dira gore breaker e kgaole ka bonako.',
          Siswati: 'Uma Live atsinta insimbi, earth wenta breaker icime masinyane.',
          isiNdebele: 'Lokha i-Live ithinta isimbi, i-earth yenza i-breaker icime msinyana.',
          isiXhosa: 'Xa i-Live ichukumisa intsimbi, i-earth yenza i-breaker icime ngokukhawuleza.',
          Afrikaans: 'By n isolasiefout bied aarding n lae-weerstand pad sodat die breker uitskakel pleks dat die raam by 230 V bly.',
          English: 'If a live wire touches the metal frame, earthing routes fault current safely back to trip the breaker immediately instead of leaving the casing at a lethal 230 V.'
        }
      }
    ]
  }
];
