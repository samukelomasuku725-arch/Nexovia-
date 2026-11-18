/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ELECTRICAL TRADE THEORY TEXTBOOK — N1 (Chapters 1–4)
 * 100% Nexovian Original — Read Online Only.
 * Maths & formulas stay exact across all 11 official languages.
 */

import { TextbookChapter } from './officeAdminTypes';

export const ELECTRICAL_N1_CHAPTERS: TextbookChapter[] = [
  {
    id: 'elec-n1-ch1-basic-electricity',
    level: 2,
    chapterNumber: 1,
    chapterLabelByLanguage: {
      Xitsonga: 'N1 • Chapter 1',
      Sepedi: 'N1 • Chapter 1',
      isiZulu: 'N1 • Chapter 1',
      Tshivenda: 'N1 • Chapter 1',
      Sesotho: 'N1 • Chapter 1',
      Setswana: 'N1 • Chapter 1',
      Siswati: 'N1 • Chapter 1',
      isiNdebele: 'N1 • Chapter 1',
      isiXhosa: 'N1 • Chapter 1',
      Afrikaans: 'N1 • Chapter 1',
      English: 'N1 • Chapter 1'
    },
    titleByLanguage: {
      Xitsonga: "Basic Electricity - Atoms, Current, Voltage, Resistance, Ohm's Law (V = I × R)",
      Sepedi: "Basic Electricity - Atoms, Current, Voltage, Resistance, Ohm's Law (V = I × R)",
      isiZulu: "Basic Electricity - Atoms, Current, Voltage, Resistance, Ohm's Law (V = I × R)",
      Tshivenda: "Basic Electricity - Atoms, Current, Voltage, Resistance, Ohm's Law (V = I × R)",
      Sesotho: "Basic Electricity - Atoms, Current, Voltage, Resistance, Ohm's Law (V = I × R)",
      Setswana: "Basic Electricity - Atoms, Current, Voltage, Resistance, Ohm's Law (V = I × R)",
      Siswati: "Basic Electricity - Atoms, Current, Voltage, Resistance, Ohm's Law (V = I × R)",
      isiNdebele: "Basic Electricity - Atoms, Current, Voltage, Resistance, Ohm's Law (V = I × R)",
      isiXhosa: "Basic Electricity - Atoms, Current, Voltage, Resistance, Ohm's Law (V = I × R)",
      Afrikaans: "Basic Electricity - Atoms, Current, Voltage, Resistance, Ohm's Law (V = I × R)",
      English: "Basic Electricity - Atoms, Current, Voltage, Resistance, Ohm's Law (V = I × R)"
    },
    subtitleByLanguage: {
      Xitsonga: 'Ti-athomo, Nkhuluko wa Gezi (I), Matimba ya Gezi (V), Ku Ala (R) & Nawu wa Ohm',
      Sepedi: 'Diatomo, Moela (I), Bolothetši (V), Kganetšo (R) & Molao wa Ohm',
      isiZulu: 'Ama-athomu, Ugelezi (I), I-Voltage (V), Ukuphikisa (R) noMthetho ka-Ohm',
      Tshivenda: 'Dziathomo, Luvhilo lwa Mudagasi (I), Vhouthedzhi (V) & Mulayo wa Ohm',
      Sesotho: 'Diatomo, Phallo ya Motlakase (I), Matla a V (V), Kganyetso (R) & Molao wa Ohm',
      Setswana: 'Diatomo, Motsamao wa Motlakase (I), Boloteji (V) & Molao wa Ohm',
      Siswati: 'Ema-athomu, Kugeleta kwagezi (I), I-Voltage (V) neMtsetfo wa-Ohm',
      isiNdebele: 'Ama-athomu, Ukugijima kwegezi (I), I-Voltage (V) nomThetho ka-Ohm',
      isiXhosa: 'Iiatom, Umsinga (I), I-Voltage (V), Ukuxhathisa (R) noMthetho ka-Ohm',
      Afrikaans: 'Atome, Stroom (I), Spanning (V), Weerstand (R) en Ohm se Wet',
      English: 'Structure of the atom, free electrons, electrical quantities, units & Ohm’s Law'
    },
    summaryByLanguage: {
      Xitsonga:
        "Swilo hinkwaswo swi endliwe hi ti-athomo leti nga na ti-proton (+), ti-neutron (0) na ti-electron (-). Loko ti-electron leti tshunxekeke ti famba eka waya ya koporo, swi endla Current (I) leyi pimiwaka hi ti-Ampere (A). Voltage (V, Volts) i matimba yo susumeta ti-electron, kasi Resistance (R, Ohms Ω) i ku ala ku famba ka gezi. Nawu wa Ohm wu ri: V = I × R.",
      Sepedi:
        "Selo se sengwe le se sengwe se dirilwe ka diatomo tše di nago le diprothono (+), dineuthrono (0) le dielektrone (-). Ge dielektrone tše di lokologilego di sepela mo terating ya koporo, go tšwelela Current (I) ka di-Ampere (A). Voltage (V) e kgorometša dielektrone gomme Resistance (R, Ω) e ganetša moela. Molao wa Ohm ke V = I × R.",
      isiZulu:
        "Zonke izinto zakhiwe ngama-athomu anamaphrothoni (+), ama-neutron (0) nama-electron (-). Ukuhamba kwama-electron akhululekile ocingweni lwethusi kwakha uGezi (Current I nge-Ampere A). I-Voltage (V) iphusha ama-electron bese i-Resistance (R nge-Ohms Ω) ivimba ukugijima kwawo. Umthetho ka-Ohm uthi: V = I × R.",
      Tshivenda:
        "Zwithu zwothe zwo vhumbiwa nga dziathomo dzi re na dzifurothono (+), dzi-neutron (0) na dzielekithirono (-). U tshimbila ha dzielekithirono kha darata ya koporo zwi bveledza Current (I, Ampere A). Voltage (V) i sukumedza, ngeno Resistance (R, Ω) i tshi thivhela. Mulayo wa Ohm: V = I × R.",
      Sesotho:
        "Dintho tsohle di entswe ka diatomo tse nang le diprothono (+), dineutrone (0) le dielektrone (-). Ho tsamaya ha dielektrone terating ya koporo ho etsa Current (I, A). Voltage (V) e sutumetsa, ha Resistance (R, Ω) e hanela phallo. Molao wa Ohm ke V = I × R.",
      Setswana:
        "Dilo tsotlhe di dirilwe ka diatomo tse di nang le diprothono (+), dineutrone (0) le dielektrone (-). Motsamao wa dielektrone mo terating o dira Current (I, A). Voltage (V) e kgorometsa, fa Resistance (R, Ω) e ganetsa. Molao wa Ohm ke V = I × R.",
      Siswati:
        "Tonkhe tintfo takhiwe ngema-athomu lanema-proton (+), ema-neutron (0) nema-electron (-). Kuhamba kwema-electron kwenta i-Current (I, A). I-Voltage (V) iyachuba bese i-Resistance (R, Ω) iyavimba. Umtsetfo wa-Ohm utsi: V = I × R.",
      isiNdebele:
        "Zoke izinto zakhiwe ngama-athomu anama-proton (+), ama-neutron (0) nama-electron (-). Ukukhamba kwama-electron kwenza i-Current (I, A). I-Voltage (V) iyakhuthaza bese i-Resistance (R, Ω) iyavimba. UmThetho ka-Ohm uthi: V = I × R.",
      isiXhosa:
        "Zonke izinto zenziwe ngeiatom ezinama-proton (+), ama-neutron (0) nama-electron (-). Ukuhamba kwama-electron ekoporeni kwenza i-Current (I, A). I-Voltage (V) iyatyhala, ukanti i-Resistance (R, Ω) iyaxhathisa. Umthetho ka-Ohm ngu-V = I × R.",
      Afrikaans:
        "Alle materie bestaan uit atome met protone (+), neutrone (0) en elektrone (-). Vry elektrone wat deur n geleier beweeg vorm Stroom (I in Ampère, A). Spanning (V in Volt) druk stroom deur die kring terwyl Weerstand (R in Ohm, Ω) dit teëstaan. Ohm se Wet: V = I × R.",
      English:
        "Everything is made of atoms containing positive protons (+), neutral neutrons (0), and negative electrons (-). When free electrons flow through a copper conductor, they create electric Current (I, measured in Amperes A). Voltage (V, Volts) is the electrical pressure pushing electrons, while Resistance (R, Ohms Ω) opposes current flow. Ohm’s Law connects all three: V = I × R."
    },
    keyTerms: [
      {
        termEn: 'Current (I)',
        translations: {
          Xitsonga: 'Nkhuluko wa Gezi — Ampere (A)',
          Sepedi: 'Moela wa Mohlagase — Ampere (A)',
          isiZulu: 'Ugelezi Lukagesi — Ampere (A)',
          Tshivenda: 'Mudagasi — Ampere (A)',
          Sesotho: 'Phallo ya Motlakase — Ampere (A)',
          Setswana: 'Motsamao wa Motlakase — Ampere (A)',
          Siswati: 'Kugeleta Kwagezi — Ampere (A)',
          isiNdebele: 'Ukugijima Kwegezi — Ampere (A)',
          isiXhosa: 'Umsinga woMbane — Ampere (A)',
          Afrikaans: 'Elektriese Stroom — Ampère (A)',
          English: 'Flow rate of electric charge (Q / t) in Amperes (A)'
        },
        meaningByLanguage: {
          Xitsonga: 'Mpimo wa ti-electron leti hundzaka eka ndzhawu yinwe hi sekondi yinwana na yinwana (I = Q / t).',
          Sepedi: 'Bontši bja ditšhatšhe tše di fetago ntlheng e tee ka motsotswana (I = Q / t).',
          isiZulu: 'Isibalo sama-coulomb adlula endaweni eyodwa ngomzuzwana (I = Q / t).',
          Tshivenda: 'Tshivhalo tsha tshadzhi ine ya fhira nga tshifhinga (I = Q / t).',
          Sesotho: 'Palo ya ditjhatjhe tse fetang motsotswaneng o mong le o mong (I = Q / t).',
          Setswana: 'Palo ya ditshatšhe tse di fetang ka motsotswana (I = Q / t).',
          Siswati: 'Linani lema-electron lendlula ngemzuzwana (I = Q / t).',
          isiNdebele: 'Inani lama-electron adlulako ngomzuzwana (I = Q / t).',
          isiXhosa: 'Umlinganiselo we-charge edlula ngomzuzwana ngamnye (I = Q / t).',
          Afrikaans: 'Tempo waarteen elektriese lading verby n punt vloei: I = Q / t.',
          English: 'Rate of flow of charge past a point per second: I = Q / t (1 A = 1 C/s).'
        }
      },
      {
        termEn: 'Voltage / EMF (V)',
        translations: {
          Xitsonga: 'Matimba yo Susumeta — Volt (V)',
          Sepedi: 'Bolothetši — Volt (V)',
          isiZulu: 'Umfutho Kagesi — Volt (V)',
          Tshivenda: 'Vhouthedzhi — Volt (V)',
          Sesotho: 'Matla a Motlakase — Volt (V)',
          Setswana: 'Boloteji — Volt (V)',
          Siswati: 'Umfutfo Wagezi — Volt (V)',
          isiNdebele: 'Amandla Wegezi — Volt (V)',
          isiXhosa: 'Uxinzelelo loMbane — Volt (V)',
          Afrikaans: 'Spanning / EMK — Volt (V)',
          English: 'Electrical potential difference pushing current (Volts V)'
        },
        meaningByLanguage: {
          Xitsonga: 'Ku hambana ka matimba exikarhi ka tipholi timbirhi ku fambisa gezi eka circuit.',
          Sepedi: 'Kgapeletšo ya mohlagase ye e kgorometšago dielektrone mo seketing.',
          isiZulu: 'Amandla aphushela ama-electron ukuthi agijime ocingweni.',
          Tshivenda: 'Maanda a sukumedzaho dzielekithirono kha darata.',
          Sesotho: 'Kgatello ya motlakase e sutumetsang dielektrone.',
          Setswana: 'Kgatelelo ya motlakase e e kgorometsang dielektrone.',
          Siswati: 'Mandla lachuba ema-electron entfweni.',
          isiNdebele: 'Amandla asunduza ama-electron ekhoneni.',
          isiXhosa: 'Amandla atyhala ama-electron kwisekethi.',
          Afrikaans: 'Elektriese druk of potensiaalverskil tussen twee punte gemeet in Volt (V).',
          English: 'Electrical pressure (potential difference) between two points that drives current.'
        }
      },
      {
        termEn: 'Resistance (R)',
        translations: {
          Xitsonga: 'Ku Ala Nkhuluko — Ohm (Ω)',
          Sepedi: 'Kganetšo ya Moela — Ohm (Ω)',
          isiZulu: 'Ukuphikisa Ugelezi — Ohm (Ω)',
          Tshivenda: 'Thivhelo ya Mudagasi — Ohm (Ω)',
          Sesotho: 'Kganyetso — Ohm (Ω)',
          Setswana: 'Kganetso — Ohm (Ω)',
          Siswati: 'Kuvimba Kugeleta — Ohm (Ω)',
          isiNdebele: 'Ukuvimbela Ukugijima — Ohm (Ω)',
          isiXhosa: 'Ukuxhathisa — Ohm (Ω)',
          Afrikaans: 'Weerstand — Ohm (Ω)',
          English: 'Opposition to current flow measured in Ohms (Ω)'
        },
        meaningByLanguage: {
          Xitsonga: 'Ku nonohwa ka nkhuluko wa ti-electron; ku ya hi ririmi ra waya, vulehi, ku bumbula na ku hisa.',
          Sepedi: 'Se se fokotšago lebelo la moela wa mohlagase, se laolwa ke botelele le bokoto bja terata.',
          isiZulu: 'Isithiyo esinciphisa ugelezi kagesi; sikhula ngobude bocingo sincishiswe wugqinsi.',
          Tshivenda: 'U thivhela u tshimbila ha mudagasi kha darata.',
          Sesotho: 'Seo se sitisang phallo ya motlakase terating.',
          Setswana: 'Se se kganelang motsamao wa motlakase.',
          Siswati: 'Lokuvimba kuhamba kwagezi eseketheni.',
          isiNdebele: 'Lokhu okubamba ukukhamba kwegezi.',
          isiXhosa: 'Into ethintela umsinga wombane kwisekethi.',
          Afrikaans: 'Teenstand teen stroomvloei; hang af van materiaal, lengte, deursnee-area en temperatuur.',
          English: 'Opposition to current flow; depends on material resistivity, length, cross-sectional area & temperature.'
        }
      }
    ],
    workedExample: {
      questionByLanguage: {
        Xitsonga:
          'Xitirhisiwa xo hisa xi na resistance R = 44 Ω naswona xi hlanganisiwe eka gezi ra V = 220 V. Hlayela: (a) Current I, na (b) Charge Q leyi khulukaka hi 2 wa timinete (120 s).',
        Sepedi:
          'Sefuthumadi se na le kganetšo ya R = 44 Ω gomme se kgokagantšwe go V = 220 V. Bala: (a) Current I, le (b) Charge Q yeo e elago ka metsotso e 2 (120 s).',
        isiZulu:
          'Isifudumezi sine-resistance engu-R = 44 Ω sixhunywe ku-V = 220 V. Bala: (a) Ugelezi I, kanye ne-(b) Charge Q ehamba emizuzwini emi-2 (120 s).',
        Tshivenda:
          'Tshidudzi tshi na resistance ya R = 44 Ω kha V = 220 V. Vhalelani: (a) Current I, na (b) Charge Q nga minithi dza 2 (120 s).',
        Sesotho:
          'Sefuthumatsi se na le R = 44 Ω mme se hoketswe ho V = 220 V. Bala: (a) Current I, le (b) Charge Q ka metsotso e 2 (120 s).',
        Setswana:
          'Sefuthumatsi se na le R = 44 Ω mo V = 220 V. Bala: (a) Current I, le (b) Charge Q mo metsotsong e 2 (120 s).',
        Siswati:
          'Sisita sekushisa sine-R = 44 Ω ku-V = 220 V. Bala: (a) Current I, ne-(b) Charge Q emizuzwini le-2 (120 s).',
        isiNdebele:
          'Isitjhiso sine-R = 44 Ω ku-V = 220 V. Bala: (a) Current I, ne-(b) Charge Q emizuzwini e-2 (120 s).',
        isiXhosa:
          'Isifudumezi sine-R = 44 Ω ku-V = 220 V. Bala: (a) Current I, kunye ne-(b) Charge Q kwimizuzu emi-2 (120 s).',
        Afrikaans:
          'n Verwarmingselement met weerstand R = 44 Ω is aan n 220 V-toevoer gekoppel. Bereken: (a) Stroom I, en (b) Lading Q wat in 2 minute (120 s) vloei.',
        English:
          'A heating element has a resistance R = 44 Ω connected across a 220 V supply. Calculate: (a) Current I, and (b) Charge Q flowing in 2 minutes (120 s).'
      },
      stepsByLanguage: {
        Xitsonga: [
          '(a) Tirhisa Nawu wa Ohm: V = I × R -> I = V ÷ R = 220 ÷ 44 = 5 A.',
          '(b) Cinca nkarhi wu va tisekondi: t = 2 × 60 = 120 s.',
          'Tirhisa fomula ya charge: Q = I × t = 5 A × 120 s = 600 C (Coulombs).'
        ],
        Sepedi: [
          '(a) Šomiša Molao wa Ohm: I = V ÷ R = 220 ÷ 44 = 5 A.',
          '(b) Fetolela nako go metsotswana: t = 2 × 60 = 120 s.',
          'Bala charge: Q = I × t = 5 A × 120 s = 600 C (Coulombs).'
        ],
        isiZulu: [
          '(a) Sebenzisa uMthetho ka-Ohm: I = V ÷ R = 220 ÷ 44 = 5 A.',
          '(b) Guqula imizuzu ibe yimizuzwana: t = 2 × 60 = 120 s.',
          'Bala i-charge: Q = I × t = 5 A × 120 s = 600 C (Coulombs).'
        ],
        Tshivenda: [
          '(a) Shumisa Mulayo wa Ohm: I = V ÷ R = 220 ÷ 44 = 5 A.',
          '(b) Shandukisa tshifhinga: t = 2 × 60 = 120 s.',
          'Vhalela charge: Q = I × t = 5 A × 120 s = 600 C.'
        ],
        Sesotho: [
          '(a) Sebedisa Molao wa Ohm: I = V ÷ R = 220 ÷ 44 = 5 A.',
          '(b) Nako ka metsotswana: t = 2 × 60 = 120 s.',
          'Bala charge: Q = I × t = 5 A × 120 s = 600 C.'
        ],
        Setswana: [
          '(a) Dirisa Molao wa Ohm: I = V ÷ R = 220 ÷ 44 = 5 A.',
          '(b) Nako ka metsotswana: t = 2 × 60 = 120 s.',
          'Bala charge: Q = I × t = 5 A × 120 s = 600 C.'
        ],
        Siswati: [
          '(a) Sebentisa Umtsetfo wa-Ohm: I = V ÷ R = 220 ÷ 44 = 5 A.',
          '(b) Sikhatsi ngemzuzwana: t = 2 × 60 = 120 s.',
          'Bala charge: Q = I × t = 5 A × 120 s = 600 C.'
        ],
        isiNdebele: [
          '(a) Sebenzisa umThetho ka-Ohm: I = V ÷ R = 220 ÷ 44 = 5 A.',
          '(b) Isikhathi ngemizuzwana: t = 2 × 60 = 120 s.',
          'Bala i-charge: Q = I × t = 5 A × 120 s = 600 C.'
        ],
        isiXhosa: [
          '(a) Sebenzisa uMthetho ka-Ohm: I = V ÷ R = 220 ÷ 44 = 5 A.',
          '(b) Guqula imizuzu ibe yimizuzwana: t = 2 × 60 = 120 s.',
          'Bala i-charge: Q = I × t = 5 A × 120 s = 600 C.'
        ],
        Afrikaans: [
          '(a) Gebruik Ohm se Wet: I = V ÷ R = 220 ÷ 44 = 5 A.',
          '(b) Skakel tyd om na sekondes: t = 2 × 60 = 120 s.',
          'Bereken lading: Q = I × t = 5 A × 120 s = 600 C (Coulomb).'
        ],
        English: [
          '(a) Apply Ohm’s Law: V = I × R -> I = V ÷ R = 220 V ÷ 44 Ω = 5 A.',
          '(b) Convert 2 minutes into seconds: t = 2 × 60 = 120 s.',
          'Calculate Charge: Q = I × t = 5 A × 120 s = 600 C (Coulombs).'
        ]
      },
      finalAnswerByLanguage: {
        Xitsonga: '(a) I = 5 A  |  (b) Q = 600 C',
        Sepedi: '(a) I = 5 A  |  (b) Q = 600 C',
        isiZulu: '(a) I = 5 A  |  (b) Q = 600 C',
        Tshivenda: '(a) I = 5 A  |  (b) Q = 600 C',
        Sesotho: '(a) I = 5 A  |  (b) Q = 600 C',
        Setswana: '(a) I = 5 A  |  (b) Q = 600 C',
        Siswati: '(a) I = 5 A  |  (b) Q = 600 C',
        isiNdebele: '(a) I = 5 A  |  (b) Q = 600 C',
        isiXhosa: '(a) I = 5 A  |  (b) Q = 600 C',
        Afrikaans: '(a) I = 5 A  |  (b) Q = 600 C',
        English: '(a) I = 5 A  |  (b) Q = 600 C'
      }
    },
    practiceQuestions: [
      {
        number: 1,
        questionByLanguage: {
          Xitsonga: 'Hlayela Voltage V leyi lavekaka ku susumeta 4 A eka resistor ya 15 Ω.',
          Sepedi: 'Bala Voltage V ye e nyakegago go kgorometša 4 A ka gare ga resistor ya 15 Ω.',
          isiZulu: 'Bala i-Voltage V edingekayo ukuphusha u-4 A ku-resistor engu-15 Ω.',
          Tshivenda: 'Vhalelani Voltage V yo teaho u sukumedza 4 A kha resistor ya 15 Ω.',
          Sesotho: 'Bala Voltage V e hlokahalang ho sutumetsa 4 A ho resistor ya 15 Ω.',
          Setswana: 'Bala Voltage V e e tlhokegang go kgorometsa 4 A mo resistor ya 15 Ω.',
          Siswati: 'Bala i-Voltage V ledzingekako kuchuba 4 A ku-resistor ya-15 Ω.',
          isiNdebele: 'Bala i-Voltage V etlhogekako ukusunduza 4 A ku-resistor ye-15 Ω.',
          isiXhosa: 'Bala i-Voltage V efunekayo ukutyhala 4 A kwi-resistor eyi-15 Ω.',
          Afrikaans: 'Bereken die Spanning V wat nodig is om 4 A deur n 15 Ω-weerstand te dryf.',
          English: 'Calculate the Voltage V needed to push a current of 4 A through a 15 Ω resistor.'
        },
        answerByLanguage: {
          Xitsonga: 'V = I × R = 4 A × 15 Ω = 60 V.',
          Sepedi: 'V = I × R = 4 A × 15 Ω = 60 V.',
          isiZulu: 'V = I × R = 4 A × 15 Ω = 60 V.',
          Tshivenda: 'V = I × R = 4 A × 15 Ω = 60 V.',
          Sesotho: 'V = I × R = 4 A × 15 Ω = 60 V.',
          Setswana: 'V = I × R = 4 A × 15 Ω = 60 V.',
          Siswati: 'V = I × R = 4 A × 15 Ω = 60 V.',
          isiNdebele: 'V = I × R = 4 A × 15 Ω = 60 V.',
          isiXhosa: 'V = I × R = 4 A × 15 Ω = 60 V.',
          Afrikaans: 'V = I × R = 4 A × 15 Ω = 60 V.',
          English: 'Using Ohm’s Law: V = I × R = 4 A × 15 Ω = 60 V.'
        }
      },
      {
        number: 2,
        questionByLanguage: {
          Xitsonga: 'Betri ya 24 V yi koka current ya 3 A eka lampi. Hlayela Resistance R ya lampi.',
          Sepedi: 'Beteri ya 24 V e goga current ya 3 A. Bala Resistance R ya lebone.',
          isiZulu: 'Ibhethri elingu-24 V lidonsa ugelezi ongu-3 A. Bala i-Resistance R yesibani.',
          Tshivenda: 'Bethiri ya 24 V i koka current ya 3 A. Vhalelani Resistance R.',
          Sesotho: 'Betri ya 24 V e hula current ya 3 A. Bala Resistance R.',
          Setswana: 'Betri ya 24 V e goga current ya 3 A. Bala Resistance R.',
          Siswati: 'Libhethri la-24 V lidonsa 3 A. Bala i-Resistance R.',
          isiNdebele: 'Ibhethri le-24 V lidonsa 3 A. Bala i-Resistance R.',
          isiXhosa: 'Ibhetri eyi-24 V itsala umsinga oyi-3 A. Bala i-Resistance R.',
          Afrikaans: 'n 24 V-battery lewer 3 A aan n lamp. Bereken die Weerstand R van die lamp.',
          English: 'A 24 V battery supplies 3 A to a lamp. Calculate the lamp’s Resistance R.'
        },
        answerByLanguage: {
          Xitsonga: 'R = V ÷ I = 24 V ÷ 3 A = 8 Ω.',
          Sepedi: 'R = V ÷ I = 24 V ÷ 3 A = 8 Ω.',
          isiZulu: 'R = V ÷ I = 24 V ÷ 3 A = 8 Ω.',
          Tshivenda: 'R = V ÷ I = 24 V ÷ 3 A = 8 Ω.',
          Sesotho: 'R = V ÷ I = 24 V ÷ 3 A = 8 Ω.',
          Setswana: 'R = V ÷ I = 24 V ÷ 3 A = 8 Ω.',
          Siswati: 'R = V ÷ I = 24 V ÷ 3 A = 8 Ω.',
          isiNdebele: 'R = V ÷ I = 24 V ÷ 3 A = 8 Ω.',
          isiXhosa: 'R = V ÷ I = 24 V ÷ 3 A = 8 Ω.',
          Afrikaans: 'R = V ÷ I = 24 V ÷ 3 A = 8 Ω.',
          English: 'Using Ohm’s Law: R = V ÷ I = 24 V ÷ 3 A = 8 Ω.'
        }
      }
    ]
  },
  {
    id: 'elec-n1-ch2-tools-safety',
    level: 2,
    chapterNumber: 2,
    chapterLabelByLanguage: {
      Xitsonga: 'N1 • Chapter 2',
      Sepedi: 'N1 • Chapter 2',
      isiZulu: 'N1 • Chapter 2',
      Tshivenda: 'N1 • Chapter 2',
      Sesotho: 'N1 • Chapter 2',
      Setswana: 'N1 • Chapter 2',
      Siswati: 'N1 • Chapter 2',
      isiNdebele: 'N1 • Chapter 2',
      isiXhosa: 'N1 • Chapter 2',
      Afrikaans: 'N1 • Chapter 2',
      English: 'N1 • Chapter 2'
    },
    titleByLanguage: {
      Xitsonga: 'Electrical Tools & Safety - PPE, Tools, Lockout, Hazards',
      Sepedi: 'Electrical Tools & Safety - PPE, Tools, Lockout, Hazards',
      isiZulu: 'Electrical Tools & Safety - PPE, Tools, Lockout, Hazards',
      Tshivenda: 'Electrical Tools & Safety - PPE, Tools, Lockout, Hazards',
      Sesotho: 'Electrical Tools & Safety - PPE, Tools, Lockout, Hazards',
      Setswana: 'Electrical Tools & Safety - PPE, Tools, Lockout, Hazards',
      Siswati: 'Electrical Tools & Safety - PPE, Tools, Lockout, Hazards',
      isiNdebele: 'Electrical Tools & Safety - PPE, Tools, Lockout, Hazards',
      isiXhosa: 'Electrical Tools & Safety - PPE, Tools, Lockout, Hazards',
      Afrikaans: 'Electrical Tools & Safety - PPE, Tools, Lockout, Hazards',
      English: 'Electrical Tools & Safety - PPE, Tools, Lockout, Hazards'
    },
    subtitleByLanguage: {
      Xitsonga: 'Swiambalo swo Sirhelela (PPE), Switirhisiwa swo Pfuneta, Lockout-Tagout & Makhombo ya Gezi',
      Sepedi: 'Diaparo tša Tšhireletšo (PPE), Didirišwa tše di Šireleditšwego, Lockout-Tagout & Dikotsi',
      isiZulu: 'Izimpahla Zokuvikela (PPE), Amathuluzi Aboshwe Nge-Insulation, Lockout & Izingozi',
      Tshivenda: 'Zwiambaro zwa Tsireledzo (PPE), Zwishumiswa, Lockout-Tagout & Khombo dza Mudagasi',
      Sesotho: 'Diaparo tsa Polokeho (PPE), Disebediswa, Lockout-Tagout & Dikotsi',
      Setswana: 'Diaparo tsa Pabalesego (PPE), Didirisiwa, Lockout-Tagout & Dikotsi',
      Siswati: 'Tintfo Tekuvikela (PPE), Emathuluzi, Lockout-Tagout Netingoti',
      isiNdebele: 'Izambatho Zokuvikela (PPE), Amathuluzi, Lockout-Tagout Neengozi',
      isiXhosa: 'Izixhobo Zokhuseleko (PPE), Izixhobo Zombane, Lockout-Tagout & Iingozi',
      Afrikaans: 'Persoonlike Beskermende Toerusting (PPE), Geïsoleerde Gereedskap, Lockout & Gevare',
      English: 'PPE, VDE insulated tools, Lockout-Tagout procedures & electrical hazard control'
    },
    summaryByLanguage: {
      Xitsonga:
        'Vuhlayiseki byi ta ku sungula loko u tirha hi gezi. Swichudeni na va-electrician va fanele ku ambala PPE (tintangu ta safety leti nga hundzisiki gezi, magilavu yo sirhelela, magilazi ya mahlo), va tirhisa switirhisiwa leswi pfariweke hi 1000 V VDE (insulated pliers, screwdrivers, wire strippers), naswona va tirhisa Lockout-Tagout (ku pfala breaker hi xikhiya no veka tag) va nga si khoma tiwaya.',
      Sepedi:
        'Polokego ke selo sa pele mošomong wa mohlagase. Diriša PPE (dieta tša tšhireletšo, diatla tša rabara, digalase tša mahlo), didirišwa tše di khupeditšwego ka 1000 V VDE (pliers, screwdrivers), gomme o dire Lockout-Tagout (tswalela sekete ka senotlelo o be o ngwale tag) pele o thoma mošomo.',
      isiZulu:
        'Ukuphepha kuza kuqala emsebenzini kagesi. Gqoka i-PPE efanele (amabhuzu okuphepha, amagilavu e-insulation, izibuko zokuphepha), sebenzisa amathuluzi e-1000 V VDE (o-pliers, ama-screwdriver), futhi ulandele i-Lockout-Tagout ngaphambi kokuthinta izintambo.',
      Tshivenda:
        'Tsireledzo i da u thoma mushumoni wa mudagasi. Ambarani PPE (zwienda zwa tsireledzo, magilavu), ni shumise zwishumiswa zwa 1000 V VDE, ni khonfame Lockout-Tagout phanda ha u fara darata.',
      Sesotho:
        'Polokeho e tla pele mosebetsing wa motlakase. Apara PPE, o sebedise disebediswa tsa 1000 V VDE, mme o phethe Lockout-Tagout pele o sebetsa.',
      Setswana:
        'Pabalesego e tla pele mo tirong ya motlakase. Apara PPE, dirisa didirisiwa tsa 1000 V VDE, mme o dire Lockout-Tagout pele o simolola.',
      Siswati: 'Kuphepha kuta kucala. Gcoka i-PPE, usebentise emathuluzi e-1000 V VDE, uphindze wente i-Lockout-Tagout.',
      isiNdebele: 'Ukuphepha kuza qangi. Mbatha i-PPE, usebenzise amathuluzi we-1000 V VDE, wenze ne-Lockout-Tagout.',
      isiXhosa: 'Ukhuseleko luza kuqala. Nxiba i-PPE, sebenzisa izixhobo ze-1000 V VDE, uze wenze i-Lockout-Tagout phambi kokusebenza.',
      Afrikaans:
        'Veiligheid kom altyd eerste. Dra behoorlike PPE (veiligheidstewels, geïsoleerde handskoene, veiligheidsbril), gebruik 1000 V VDE-geïsoleerde gereedskap, en pas Lockout-Tagout (uitsluiting en etikettering) streng toe voordat jy aan enige stroombaan raak.',
      English:
        'Safety is the #1 rule in electrical work. Technicians wear PPE (non-conductive safety boots, insulated gloves, safety goggles, flame-resistant overalls), use 1000 V VDE-insulated tools (side cutters, long-nose pliers, screwdrivers, wire strippers), and follow Lockout-Tagout (LOTO) — isolate power, lock with a personal padlock, attach a danger tag, and test dead with a proven voltmeter before touching conductors.'
    },
    keyTerms: [
      {
        termEn: 'PPE (Personal Protective Equipment)',
        translations: {
          Xitsonga: 'Swiambalo swo Sirhelela Miri (PPE)',
          Sepedi: 'Diaparo tša Tšhireletšo (PPE)',
          isiZulu: 'Izimpahla Zokuvikela Umzimba (PPE)',
          Tshivenda: 'Zwiambaro zwa Tsireledzo (PPE)',
          Sesotho: 'Diaparo tsa Polokeho (PPE)',
          Setswana: 'Diaparo tsa Pabalesego (PPE)',
          Siswati: 'Tintfo Tekuvikela Umtimba (PPE)',
          isiNdebele: 'Izambatho Zokuvikela (PPE)',
          isiXhosa: 'Izixhobo Zokhuseleko (PPE)',
          Afrikaans: 'Persoonlike Beskermende Toerusting (PPE)',
          English: 'Protective gear shielding the worker from shock & arc flash'
        },
        meaningByLanguage: {
          Xitsonga: 'Tintangu leti nga hundzisiki gezi, magilazi yo sirhelela mahlo, na magilavu ya rhabara.',
          Sepedi: 'Dieta tša polokego, digalase tša mahlo le diatla tša tšhireletšo.',
          isiZulu: 'Izicathulo zokuphepha, izibuko zamehlo namagilavu okusebenza.',
          Tshivenda: 'Zwienda zwa tsireledzo, magilasi a mato na magilavu.',
          Sesotho: 'Dieta tsa polokeho, digalase le diatlana.',
          Setswana: 'Ditlhako tsa pabalesego, digalase le diatlana.',
          Siswati: 'Ticathulo tekuphepha netibuko.',
          isiNdebele: 'Izicathulo zokuphepha nezibuko.',
          isiXhosa: 'Izihlangu zokhuseleko, iiglasi kunye neeglavu.',
          Afrikaans: 'Sluit geïsoleerde veiligheidskoene, veiligheidsbril, hardehoed en vlamwerende oorpak in.',
          English: 'Includes non-conductive boots, safety glasses, insulated gloves & flame-resistant clothing.'
        }
      },
      {
        termEn: 'Lockout-Tagout (LOTO)',
        translations: {
          Xitsonga: 'Ku Khiya no Veka Xitiviso (Lockout-Tagout)',
          Sepedi: 'Go Tswalela ka Senotlelo le Tag (LOTO)',
          isiZulu: 'Ukukhiya Nekuvala Ngethegi (Lockout-Tagout)',
          Tshivenda: 'U Khona na u Vhea Thegi (Lockout-Tagout)',
          Sesotho: 'Ho Notlela le ho Beha Letshwao (LOTO)',
          Setswana: 'Go Lotlela le go Baya Letshwao (LOTO)',
          Siswati: 'Kukhiya Nekubeka Liphawu (Lockout-Tagout)',
          isiNdebele: 'Ukukhiya Nokubeka Ithegi (Lockout-Tagout)',
          isiXhosa: 'Ukutshixa Nokubeka Ithegi (Lockout-Tagout)',
          Afrikaans: 'Uitsluiting en Etikettering (LOTO)',
          English: 'Locking an isolator OFF so nobody turns power back on accidentally'
        },
        meaningByLanguage: {
          Xitsonga: 'Sivela vanwana ku lumeka gezi u ri karhi u tirha eka mapaneli kumbe michini.',
          Sepedi: 'Thibela motho ofe goba ofe go tšhuma mohlagase ge o sa šoma.',
          isiZulu: 'Kuvimbela noma ubani ukuthi avule ugesi ngesikhathi usasebenza.',
          Tshivenda: 'Thivhela munwe muthu u funga mudagasi musi ni tshi khou shuma.',
          Sesotho: 'Thibela hore ho se ke ha eba le ya bulelang motlakase ha o ntse o sebetsa.',
          Setswana: 'Thibela gore ope a se ka a tshuba motlakase fa o sa bereka.',
          Siswati: 'Vimba kutsi kungabikhona lovula gezi usasebenta.',
          isiNdebele: 'Vimba bona kungabi nomuntu ovula igezi usasebenza.',
          isiXhosa: 'Thintela nabani na ukuba avule umbane ngelixa usebenza.',
          Afrikaans: 'Verseker dat krag afgesluit en gesluit bly met jou persoonlike slot totdat werk klaar is.',
          English: 'Prevents accidental re-energisation while technicians repair or wire circuits.'
        }
      },
      {
        termEn: 'VDE Insulated Tools (1000 V)',
        translations: {
          Xitsonga: 'Switirhisiwa swo Pfariwa hi Rhabara (1000 V VDE)',
          Sepedi: 'Didirišwa tše di Khupeditšwego (1000 V VDE)',
          isiZulu: 'Amathuluzi Ane-Insulation (1000 V VDE)',
          Tshivenda: 'Zwishumiswa zwo Tsireledzwaho (1000 V VDE)',
          Sesotho: 'Disebediswa tse Sireleditsweng (1000 V VDE)',
          Setswana: 'Didirisiwa tse di Sireleditsweng (1000 V VDE)',
          Siswati: 'Emathuluzi Lavikelwe (1000 V VDE)',
          isiNdebele: 'Amathuluzi Avikelekileko (1000 V VDE)',
          isiXhosa: 'Izixhobo Ezigqunywe nge-Insulation (1000 V VDE)',
          Afrikaans: 'Geïsoleerde Gereedskap (1000 V VDE)',
          English: 'Hand tools tested up to 1000 V AC to protect hands from shock'
        },
        meaningByLanguage: {
          Xitsonga: 'Ti-pliers na ti-screwdriver leti nga na handles ta palasitiki yo tiya ku sirhelela mavoko.',
          Sepedi: 'Di-pliers le di-screwdriver tše di nago le dipolasitiki tša tšhireletšo.',
          isiZulu: 'O-pliers nama-screwdriver anokubanjwa okungadlulisi ugesi.',
          Tshivenda: 'Zwishumiswa zwi re na vhufareli ha pulasitiki ya tsireledzo.',
          Sesotho: 'Disebediswa tse nang le dipolasitiki tse sa fetiseng motlakase.',
          Setswana: 'Didirisiwa tse di nang le dikhurumelo tse di sa fetiseng motlakase.',
          Siswati: 'Emathuluzi lanetibambo letivikelako.',
          isiNdebele: 'Amathuluzi anezibambo ezivikelako.',
          isiXhosa: 'Izixhobo ezinemiphambo engadlulisi mbane.',
          Afrikaans: 'Gereedskap met dubbelgeïsoleerde handvatsels getoets vir werk naby lewendige toerusting.',
          English: 'Double-insulated handles prevent electric shock and short circuits during electrical installation.'
        }
      }
    ],
    workedExample: {
      questionByLanguage: {
        Xitsonga:
          'Miri wa munhu wu na resistance ya nhlonge leyi omeke ya kwalomu ka R = 1000 Ω. Loko mutirhi a khoma waya leyi nga na V = 230 V a nga sirhelelekanga: (a) Hlayela current leyi khulukaka emirini hi milliamperes (mA, laha 1 A = 1000 mA), naswona (b) boxa loko earth leakage ya 30 mA yi ta tsema gezi.',
        Sepedi:
          'Letlalo le le omilego la motho le na le kganetšo ya R = 1000 Ω. Ge mošomi a kgoma terata ya V = 230 V ntle le PPE: (a) Bala current ka mA (1 A = 1000 mA), gomme (b) bolela ge e ba RCD ya 30 mA e tla kgaola.',
        isiZulu:
          'Isikhumba esomile somuntu sine-resistance engu-R = 1000 Ω. Uma umsebenzi ethinta intambo engu-230 V ngaphandle kwe-PPE: (a) Bala ugelezi nge-mA, bese (b) usho ukuthi i-earth leakage engu-30 mA iyocima yini.',
        Tshivenda:
          'Lukanda lwo omaho lu na R = 1000 Ω. Arali muthu a fara V = 230 V: (a) Vhalelani current nga mA, na (b) arali RCD ya 30 mA i tshi do tuma.',
        Sesotho:
          'Letlalo le ommeng le na le R = 1000 Ω. Ha motho a tshwara V = 230 V: (a) Bala current ka mA, mme (b) na RCD ya 30 mA e tla kgaoha?',
        Setswana:
          'Letlalo le le omileng le na le R = 1000 Ω. Fa motho a tshwara V = 230 V: (a) Bala current ka mA, (b) a RCD ya 30 mA e tla kgaola?',
        Siswati:
          'Sikhumba lesomile sine-R = 1000 Ω. Uma utinta 230 V: (a) Bala current nge-mA, (b) i-RCD ya-30 mA itawucima yini?',
        isiNdebele:
          'Isikhumba esomileko sine-R = 1000 Ω. Nangabe uthinta 230 V: (a) Bala i-current nge-mA, (b) i-RCD ye-30 mA izakutjhitjha na?',
        isiXhosa:
          'Ulusu olomileyo lune-R = 1000 Ω. Ukuba umntu ubamba u-230 V: (a) Bala umsinga nge-mA, (b) ngaba i-RCD eyi-30 mA iya kucima?',
        Afrikaans:
          'Droë menslike vel het n weerstand van ongeveer R = 1000 Ω. As n werker per ongeluk aan 230 V raak sonder PPE/uitsluiting: (a) Bereken die stroom deur die liggaam in mA (1 A = 1000 mA), en (b) sal n 30 mA-aardlekskakelaar uitskakel?',
        English:
          'Dry human skin has a resistance of about R = 1000 Ω. If a worker accidentally touches a live 230 V conductor without PPE or LOTO: (a) Calculate the body current in mA (1 A = 1000 mA), and (b) determine whether a 30 mA earth leakage breaker will trip.'
      },
      stepsByLanguage: {
        Xitsonga: [
          '(a) I = V ÷ R = 230 V ÷ 1000 Ω = 0.23 A.',
          'Cinca ti-Ampere ti va ti-milliampere: 0.23 A × 1000 = 230 mA (swo dlaya swinene!).',
          '(b) Hikuva 230 mA > 30 mA, ina earth leakage yi ta tsema gezi — kambe LOTO na ku kambela zero-voltage swa boha hikuva swi sivela ku khoma gezi ku sungula.'
        ],
        Sepedi: [
          '(a) I = V ÷ R = 230 ÷ 1000 = 0.23 A.',
          'Fetolela go mA: 0.23 × 1000 = 230 mA (kotsi e kgolo).',
          '(b) Ka ge 230 mA > 30 mA, earth leakage e tla kgaola — eupša Lockout-Tagout e thibela kotsi pele e direga.'
        ],
        isiZulu: [
          '(a) I = V ÷ R = 230 ÷ 1000 = 0.23 A.',
          'Guqula ibe ngama-mA: 0.23 × 1000 = 230 mA (ingozi enkulu kakhulu).',
          '(b) Njengoba u-230 mA > 30 mA, i-earth leakage iyocima — kodwa i-LOTO iyona evikela ukushoqwa.'
        ],
        Tshivenda: [
          '(a) I = 230 ÷ 1000 = 0.23 A = 230 mA.',
          '(b) Ngauri 230 mA > 30 mA, RCD i do tuma — fhedzi LOTO i tsireledza u thoma.'
        ],
        Sesotho: [
          '(a) I = 230 ÷ 1000 = 0.23 A = 230 mA.',
          '(b) Kaha 230 mA > 30 mA, RCD e tla kgaoha — empa LOTO ke yona e thibelang kotsi.'
        ],
        Setswana: [
          '(a) I = 230 ÷ 1000 = 0.23 A = 230 mA.',
          '(b) Ka gonne 230 mA > 30 mA, RCD e tla kgaola — mme LOTO e botlhokwa pele ga tiro.'
        ],
        Siswati: [
          '(a) I = 230 ÷ 1000 = 0.23 A = 230 mA.',
          '(b) Ngoba 230 mA > 30 mA, i-RCD itawucima — kepha i-LOTO iyavikela kusukela ekucaleni.'
        ],
        isiNdebele: [
          '(a) I = 230 ÷ 1000 = 0.23 A = 230 mA.',
          '(b) Ngombana 230 mA > 30 mA, i-RCD izakutjhitjha — kodwana i-LOTO iyavikela qangi.'
        ],
        isiXhosa: [
          '(a) I = 230 ÷ 1000 = 0.23 A = 230 mA.',
          '(b) Kuba u-230 mA > 30 mA, i-RCD iya kucima — kodwa i-LOTO ikhusela kwasekuqaleni.'
        ],
        Afrikaans: [
          '(a) I = V ÷ R = 230 V ÷ 1000 Ω = 0.23 A.',
          'Skakel om na mA: 0.23 × 1000 = 230 mA (ver bo die 50 mA-dodelike drempel).',
          '(b) Aangesien 230 mA > 30 mA, sal n werkende 30 mA-aardlekskakelaar uitskakel — maar LOTO verhoed enige kontak vooraf.'
        ],
        English: [
          '(a) Using Ohm’s Law: I = V ÷ R = 230 V ÷ 1000 Ω = 0.23 A.',
          'Convert to milliamperes: 0.23 A × 1000 = 230 mA (far above the 50 mA lethal threshold).',
          '(b) Since 230 mA > 30 mA, a working 30 mA earth leakage breaker trips immediately — but Lockout-Tagout (LOTO) and testing dead prevent shock in the first place.'
        ]
      },
      finalAnswerByLanguage: {
        Xitsonga: '(a) I = 230 mA (0.23 A)  |  (b) Ina, 230 mA > 30 mA (LOTO ya boha)',
        Sepedi: '(a) I = 230 mA (0.23 A)  |  (b) Ee, 230 mA > 30 mA',
        isiZulu: '(a) I = 230 mA (0.23 A)  |  (b) Yebo, 230 mA > 30 mA',
        Tshivenda: '(a) I = 230 mA  |  (b) Ee, 230 mA > 30 mA',
        Sesotho: '(a) I = 230 mA  |  (b) Ee, 230 mA > 30 mA',
        Setswana: '(a) I = 230 mA  |  (b) Ee, 230 mA > 30 mA',
        Siswati: '(a) I = 230 mA  |  (b) Yebo, 230 mA > 30 mA',
        isiNdebele: '(a) I = 230 mA  |  (b) Iye, 230 mA > 30 mA',
        isiXhosa: '(a) I = 230 mA  |  (b) Ewe, 230 mA > 30 mA',
        Afrikaans: '(a) I = 230 mA (0.23 A)  |  (b) Ja, 230 mA > 30 mA',
        English: '(a) I = 230 mA (0.23 A)  |  (b) Yes, 230 mA > 30 mA (LOTO still mandatory)'
      }
    },
    practiceQuestions: [
      {
        number: 1,
        questionByLanguage: {
          Xitsonga: 'Boxa magoza manharhu ya Lockout-Tagout (LOTO) u nga si tirha eka circuit.',
          Sepedi: 'Bolela dikgato tše tharo tša Lockout-Tagout (LOTO) pele o šoma mo seketing.',
          isiZulu: 'Shono izinyathelo ezintathu ze-Lockout-Tagout (LOTO) ngaphambi kokusebenza ocingweni.',
          Tshivenda: 'Bulani maga mararu a Lockout-Tagout (LOTO).',
          Sesotho: 'Bolela mehato e meraro ya Lockout-Tagout (LOTO).',
          Setswana: 'Bolela dikgato tse tharo tsa Lockout-Tagout (LOTO).',
          Siswati: 'Shono tigaba letintsatfu te-Lockout-Tagout (LOTO).',
          isiNdebele: 'Tsho amagadango amathathu we-Lockout-Tagout (LOTO).',
          isiXhosa: 'Chaza amanyathelo amathathu e-Lockout-Tagout (LOTO).',
          Afrikaans: 'Noem 3 verpligte Lockout-Tagout (LOTO)-stappe voordat jy aan n stroombaan werk.',
          English: 'List 3 mandatory Lockout-Tagout (LOTO) steps before working on any circuit.'
        },
        answerByLanguage: {
          Xitsonga: '1. Tima main isolator/breaker. 2. Khiya hi padlock ya wena u veka danger tag. 3. Kambela hi voltmeter ku tiyiseka leswaku a ku na gezi.',
          Sepedi: '1. Tima isolator/breaker. 2. Notlela ka padlock o be o kgomaretše tag. 3. Lekola ka voltmeter gore ga go na mohlagase.',
          isiZulu: '1. Cima i-breaker. 2. Khiya ngelokhi lakho ubeke ithegi. 3. Hlola nge-voltmeter ukuthi awusekho ugesi.',
          Tshivenda: '1. Dzima breaker. 2. Khona nga padlock na tag. 3. Linga nga voltmeter.',
          Sesotho: '1. Tima breaker. 2. Notlela ka padlock o behe tag. 3. Lekola ka voltmeter.',
          Setswana: '1. Tima breaker. 2. Lotlela ka padlock o beye tag. 3. Lekola ka voltmeter.',
          Siswati: '1. Cima i-breaker. 2. Khiya nge-padlock ubeke ithegi. 3. Hlola nge-voltmeter.',
          isiNdebele: '1. Cima i-breaker. 2. Khiya nge-padlock ubeke ithegi. 3. Hlola nge-voltmeter.',
          isiXhosa: '1. Cima i-breaker. 2. Tshixa nge-padlock ubeke ithegi. 3. Vavanya nge-voltmeter.',
          Afrikaans: '1. Skakel die isolator AF. 2. Sluit dit met jou persoonlike hangslot en gevaaretiket. 3. Toets dood met n gekalibreerde voltmeter.',
          English: '1. Switch off and isolate the breaker. 2. Fit your personal padlock and warning tag. 3. Prove dead with a verified voltmeter ("test before you touch").'
        }
      },
      {
        number: 2,
        questionByLanguage: {
          Xitsonga: 'Hikwalaho ka yini switirhisiwa swi fanele ku va na 1000 V VDE insulation naswona u ambala tintangu ta safety?',
          Sepedi: 'Ke ka baka la eng didirišwa di swanetše go ba le 1000 V VDE insulation le dieta tša tšhireletšo?',
          isiZulu: 'Kungani amathuluzi kumele abe ne-1000 V VDE insulation futhi ugqoke izicathulo zokuphepha?',
          Tshivenda: 'Ndi ngani zwishumiswa zwi tshi tea u vha na 1000 V VDE insulation?',
          Sesotho: 'Ke hobaneng ha disebediswa di tlameha ho ba le 1000 V VDE insulation?',
          Setswana: 'Goreng didirisiwa di tshwanetse go nna le 1000 V VDE insulation?',
          Siswati: 'Kungani emathuluzi kumele abe ne-1000 V VDE insulation?',
          isiNdebele: 'Kubayini amathuluzi kufanele abe ne-1000 V VDE insulation?',
          isiXhosa: 'Kutheni izixhobo kufuneka zibe ne-1000 V VDE insulation?',
          Afrikaans: 'Waarom moet elektriese gereedskap 1000 V VDE-geïsoleer wees en veiligheidstewels gedra word?',
          English: 'Why must electrical hand tools have 1000 V VDE insulation and workers wear non-conductive safety boots?'
        },
        answerByLanguage: {
          Xitsonga: 'Ku siva ndlela ya gezi ku nghena emirini ku ya ehansi, leswi hungutaka khombo ro biwa hi gezi.',
          Sepedi: 'Go thibela mohlagase go feta mmeleng wa gago go ya fase.',
          isiZulu: 'Ukuze ugesi ungadluli emzimbeni wakho uye phansi emhlabathini.',
          Tshivenda: 'U thivhela mudagasi u fhira kha muvhili wau.',
          Sesotho: 'Ho thibela motlakase hore o se ke wa feta mmeleng wa hao.',
          Setswana: 'Go thibela motlakase go feta mo mmeleng wa gago.',
          Siswati: 'Kuvikela kutsi gezi ungendluli emtimbeni wakho.',
          isiNdebele: 'Ukuvikela bonyana igezi ingakhambi emzimbeni wakho.',
          isiXhosa: 'Ukuthintela umbane ekudluleni emzimbeni wakho.',
          Afrikaans: 'Hoë-weerstand isolasie breek die stroompad deur jou liggaam na aarde en verminder skokrisiko.',
          English: 'High-resistance insulation blocks the electrical path through the technician’s body to earth, preventing electrocution.'
        }
      }
    ]
  },
  {
    id: 'elec-n1-ch3-dc-circuits',
    level: 2,
    chapterNumber: 3,
    chapterLabelByLanguage: {
      Xitsonga: 'N1 • Chapter 3',
      Sepedi: 'N1 • Chapter 3',
      isiZulu: 'N1 • Chapter 3',
      Tshivenda: 'N1 • Chapter 3',
      Sesotho: 'N1 • Chapter 3',
      Setswana: 'N1 • Chapter 3',
      Siswati: 'N1 • Chapter 3',
      isiNdebele: 'N1 • Chapter 3',
      isiXhosa: 'N1 • Chapter 3',
      Afrikaans: 'N1 • Chapter 3',
      English: 'N1 • Chapter 3'
    },
    titleByLanguage: {
      Xitsonga: 'DC Circuits - Series, Parallel, Power (P = V × I)',
      Sepedi: 'DC Circuits - Series, Parallel, Power (P = V × I)',
      isiZulu: 'DC Circuits - Series, Parallel, Power (P = V × I)',
      Tshivenda: 'DC Circuits - Series, Parallel, Power (P = V × I)',
      Sesotho: 'DC Circuits - Series, Parallel, Power (P = V × I)',
      Setswana: 'DC Circuits - Series, Parallel, Power (P = V × I)',
      Siswati: 'DC Circuits - Series, Parallel, Power (P = V × I)',
      isiNdebele: 'DC Circuits - Series, Parallel, Power (P = V × I)',
      isiXhosa: 'DC Circuits - Series, Parallel, Power (P = V × I)',
      Afrikaans: 'DC Circuits - Series, Parallel, Power (P = V × I)',
      English: 'DC Circuits - Series, Parallel, Power (P = V × I)'
    },
    subtitleByLanguage: {
      Xitsonga: 'Ti-circuit ta Series (R_T = R₁ + R₂) & Parallel (1/R_P = 1/R₁ + 1/R₂), Matimba P = V × I',
      Sepedi: 'Dikgokagano tša Series & Parallel, Maatla a Mohlagase P = V × I',
      isiZulu: 'Amasekhethi e-Series ne-Parallel, namandla kagesi P = V × I',
      Tshivenda: 'Dzi-circuit dza Series & Parallel, Maanda P = V × I',
      Sesotho: 'Dipotoloho tsa Series & Parallel, Matla P = V × I',
      Setswana: 'Disekete tsa Series & Parallel, Maatla P = V × I',
      Siswati: 'Ema-Series & Parallel circuits, Emandla P = V × I',
      isiNdebele: 'Amasekhethi we-Series & Parallel, Amandla P = V × I',
      isiXhosa: 'Iisekethi ze-Series & Parallel, Amandla P = V × I',
      Afrikaans: 'Serie- en parallelstroombane, Elektriese Drywing P = V × I',
      English: 'Resistors in series and parallel, Kirchhoff’s laws & DC power P = V × I'
    },
    summaryByLanguage: {
      Xitsonga:
        'Eka Series circuit, current yi fana eka xiphemu xinwana na xinwana (I_T = I₁ = I₂), naswona R_T = R₁ + R₂. Eka Parallel circuit, voltage yi fana eka marhavi hinkwawo (V_T = V₁ = V₂), naswona 1/R_P = 1/R₁ + 1/R₂ (eka timbirhi: R_P = (R₁×R₂)/(R₁+R₂)). Matimba ya gezi ma hlayiwa hi P = V × I (Watts W).',
      Sepedi:
        'Mo go Series circuit, current e a swana gohle (I_T = I₁ = I₂) gomme R_T = R₁ + R₂. Mo go Parallel circuit, voltage e a swana makaleng ka moka (V_T = V₁ = V₂) gomme 1/R_P = 1/R₁ + 1/R₂. Maatla ke P = V × I (Watts W).',
      isiZulu:
        'Ku-Series circuit, ugelezi uyafana kuyo yonke indawo (I_T = I₁ = I₂), bese R_T = R₁ + R₂. Ku-Parallel circuit, i-voltage iyafana emagatsheni onke (V_T = V₁ = V₂), bese 1/R_P = 1/R₁ + 1/R₂. Amandla abalwa nge-P = V × I (Watts W).',
      Tshivenda:
        'Kha Series circuit, current i a fana hothe (I_T = I₁ = I₂), R_T = R₁ + R₂. Kha Parallel circuit, voltage i a fana, 1/R_P = 1/R₁ + 1/R₂. Maanda: P = V × I (W).',
      Sesotho:
        'Ho Series circuit, current e a tshwana (I_T = I₁ = I₂), R_T = R₁ + R₂. Ho Parallel circuit, voltage e a tshwana, 1/R_P = 1/R₁ + 1/R₂. Matla ke P = V × I (W).',
      Setswana:
        'Mo Series circuit, current e a tshwana (I_T = I₁ = I₂), R_T = R₁ + R₂. Mo Parallel circuit, voltage e a tshwana, 1/R_P = 1/R₁ + 1/R₂. Maatla ke P = V × I (W).',
      Siswati: 'Ku-Series, current iyafana, R_T = R₁ + R₂. Ku-Parallel, voltage iyafana, 1/R_P = 1/R₁ + 1/R₂. P = V × I (W).',
      isiNdebele: 'Ku-Series, i-current iyafana, R_T = R₁ + R₂. Ku-Parallel, i-voltage iyafana, 1/R_P = 1/R₁ + 1/R₂. P = V × I.',
      isiXhosa: 'Kwi-Series, umsinga uyafana, R_T = R₁ + R₂. Kwi-Parallel, i-voltage iyafana, 1/R_P = 1/R₁ + 1/R₂. P = V × I.',
      Afrikaans:
        'In n Seriekring is die stroom oral dieselfde (I_T = I₁ = I₂) en R_T = R₁ + R₂. In n Parallelkring is die spanning oor elke tak dieselfde (V_T = V₁ = V₂) en 1/R_P = 1/R₁ + 1/R₂. Drywing P = V × I (Watt, W).',
      English:
        'In a Series DC circuit, the same current flows through every component (I_T = I₁ = I₂) and total resistance adds up: R_T = R₁ + R₂. In a Parallel circuit, the same supply voltage appears across every branch (V_T = V₁ = V₂) and 1/R_P = 1/R₁ + 1/R₂. Electrical Power is calculated using P = V × I (or I²R, or V²/R) in Watts (W).'
    },
    keyTerms: [
      {
        termEn: 'Series Circuit (R_T = R₁ + R₂)',
        translations: {
          Xitsonga: 'Nkhuluko Wunwe (Series Circuit)',
          Sepedi: 'Sekete ya Tatelano (Series)',
          isiZulu: 'Isekhethi Elilandelanayo (Series)',
          Tshivenda: 'Sekithi ya Tutevhelano (Series)',
          Sesotho: 'Potoloho ya Tatelano (Series)',
          Setswana: 'Sekete sa Tatelano (Series)',
          Siswati: 'Isekhethi Lelendzelanako (Series)',
          isiNdebele: 'Isekhethi Elilandelanako (Series)',
          isiXhosa: 'Isekethi yoLandelelwano (Series)',
          Afrikaans: 'Seriekring (R_T = R₁ + R₂)',
          English: 'Single-path circuit where total resistance is the sum of parts'
        },
        meaningByLanguage: {
          Xitsonga: 'Ku na ndlela yinwe ntsena ya gezi; loko xiphemu xinwe xi tshoveka, gezi hinkwaro ra yima.',
          Sepedi: 'Tsela e tee ya moela; ge karolo e tee e kgaoga, sekete ka moka e a ema.',
          isiZulu: 'Umzila owodwa wogelezi; uma eyodwa icima konke kuyacima.',
          Tshivenda: 'Ndila nthihi ya mudagasi; arali tshinwe tsha tshinyala, zwothe zwi a ima.',
          Sesotho: 'Tsela e le nngwe feela ya motlakase.',
          Setswana: 'Tsela e le nngwe fela ya motlakase.',
          Siswati: 'Umzila munye wegezi.',
          isiNdebele: 'Indlela eyodwa yegezi.',
          isiXhosa: 'Indlela enye yomsinga.',
          Afrikaans: 'Een enkele stroompad; stroom is gelyk deur alle komponente en spanning word verdeel.',
          English: 'One continuous loop: current is equal everywhere while supply voltage divides across each resistor.'
        }
      },
      {
        termEn: 'Parallel Circuit (1/R_P = 1/R₁ + 1/R₂)',
        translations: {
          Xitsonga: 'Marhavi yo Fambelana (Parallel Circuit)',
          Sepedi: 'Sekete ya Bapileng (Parallel)',
          isiZulu: 'Isekhethi Elihambisanayo (Parallel)',
          Tshivenda: 'Sekithi yo Linganaho (Parallel)',
          Sesotho: 'Potoloho e Bapileng (Parallel)',
          Setswana: 'Sekete se se Bapileng (Parallel)',
          Siswati: 'Isekhethi Lehambisanako (Parallel)',
          isiNdebele: 'Isekhethi Elinganako (Parallel)',
          isiXhosa: 'Isekethi eNxuseneyo (Parallel)',
          Afrikaans: 'Parallelkring (1/R_P = 1/R₁ + 1/R₂)',
          English: 'Multi-branch circuit where every branch gets full supply voltage'
        },
        meaningByLanguage: {
          Xitsonga: 'Marhavi yo tala ku fana na mabulu ya le ndlwini; ku engetela marhavi swi hunguta resistance.',
          Sepedi: 'Makala a mantši go swana le mabone a ntlong; bolothetši bo a swana gohle.',
          isiZulu: 'Amagatsha amaningi njengezibani zasendlini; i-voltage iyafana kuwo wonke.',
          Tshivenda: 'Matavhi manzhi u fana na mavhone a nduni.',
          Sesotho: 'Makala a mangata jwalo ka mabone a ntlo.',
          Setswana: 'Dikala tse dintsi jaaka mabone a ntlo.',
          Siswati: 'Emagatja lamanyenti njengemalambu asendlini.',
          isiNdebele: 'Amagatja amanengi njengamalambu wendlini.',
          isiXhosa: 'Amasebe amaninzi njengezibane zasendlwini.',
          Afrikaans: 'Verskeie stroompaaie; huisbedrading is in parallel sodat elke toestel volle 230 V kry.',
          English: 'Used in house wiring so every socket/light gets full voltage and works independently.'
        }
      },
      {
        termEn: 'Electrical Power (P = V × I)',
        translations: {
          Xitsonga: 'Matimba ya Gezi — Watt (W)',
          Sepedi: 'Maatla a Mohlagase — Watt (W)',
          isiZulu: 'Amandla Kagesi — Watt (W)',
          Tshivenda: 'Maanda a Mudagasi — Watt (W)',
          Sesotho: 'Matla a Motlakase — Watt (W)',
          Setswana: 'Maatla a Motlakase — Watt (W)',
          Siswati: 'Emandla Agezi — Watt (W)',
          isiNdebele: 'Amandla Wegezi — Watt (W)',
          isiXhosa: 'Amandla oMbane — Watt (W)',
          Afrikaans: 'Elektriese Drywing — Watt (W)',
          English: 'Rate of electrical work / energy conversion per second'
        },
        meaningByLanguage: {
          Xitsonga: 'Mpimo wa ntirho lowu endliwaka hi sekondi: P = V × I = I² × R = V² ÷ R.',
          Sepedi: 'Lebelo leo enetši ya mohlagase e šomišwago ka lona: P = V × I.',
          isiZulu: 'Izinga lokuguqulwa kukagesi ube ukushisa noma ukukhanya: P = V × I.',
          Tshivenda: 'Maanda a u shandukisa mudagasi u vha mushumo: P = V × I.',
          Sesotho: 'Lebelo leo motlakase o sebediswang ka lona: P = V × I.',
          Setswana: 'Lebelo le motlakase o dirisiwang ka lone: P = V × I.',
          Siswati: 'Lizinga lekusebentisa gezi: P = V × I.',
          isiNdebele: 'Izinga lokusebenzisa igezi: P = V × I.',
          isiXhosa: 'Izinga lokusebenzisa umbane ngomzuzwana: P = V × I.',
          Afrikaans: 'Tempo van energieverbruik in Watt (W): P = V × I = I²R = V²/R.',
          English: 'Rate at which electrical energy is transferred or used per second (1 W = 1 J/s).'
        }
      }
    ],
    workedExample: {
      questionByLanguage: {
        Xitsonga:
          'Ti-resistor timbirhi R₁ = 6 Ω na R₂ = 3 Ω ti hlanganisiwile eka gezi ra 18 V DC. Hlayela: (a) R_T na current I_S eka Series, (b) R_P, current I_P na Power P = V × I_P eka Parallel.',
        Sepedi:
          'Diresistara tše pedi R₁ = 6 Ω le R₂ = 3 Ω di kgokagantšwe go 18 V DC. Bala: (a) R_T le current I_S ka Series, (b) R_P, current I_P le Power P = V × I_P ka Parallel.',
        isiZulu:
          'Ama-resistor amabili R₁ = 6 Ω no-R₂ = 3 Ω axhunywe ku-18 V DC. Bala: (a) R_T no-I_S ku-Series, (b) R_P, u-I_P ne-Power P = V × I_P ku-Parallel.',
        Tshivenda:
          'Dzi-resistor mbili R₁ = 6 Ω na R₂ = 3 Ω kha 18 V DC. Vhalelani: (a) R_T na I_S kha Series, (b) R_P, I_P na P = V × I_P kha Parallel.',
        Sesotho:
          'Diresistara tse pedi R₁ = 6 Ω le R₂ = 3 Ω ho 18 V DC. Bala: (a) R_T le I_S ho Series, (b) R_P, I_P le P = V × I_P ho Parallel.',
        Setswana:
          'Diresistara tse pedi R₁ = 6 Ω le R₂ = 3 Ω mo 18 V DC. Bala: (a) R_T le I_S mo Series, (b) R_P, I_P le P = V × I_P mo Parallel.',
        Siswati:
          'Ema-resistor lamabili R₁ = 6 Ω na-R₂ = 3 Ω ku-18 V DC. Bala: (a) R_T na-I_S ku-Series, (b) R_P, I_P na-P = V × I_P ku-Parallel.',
        isiNdebele:
          'Ama-resistor amabili R₁ = 6 Ω no-R₂ = 3 Ω ku-18 V DC. Bala: (a) R_T no-I_S ku-Series, (b) R_P, I_P no-P = V × I_P ku-Parallel.',
        isiXhosa:
          'Iiresistors ezimbini R₁ = 6 Ω no-R₂ = 3 Ω ku-18 V DC. Bala: (a) R_T no-I_S kwi-Series, (b) R_P, I_P no-P = V × I_P kwi-Parallel.',
        Afrikaans:
          'Twee weerstande R₁ = 6 Ω en R₂ = 3 Ω word aan 18 V GS verbind. Bereken: (a) R_T en I_S in Serie, (b) R_P, I_P en Drywing P = V × I_P in Parallel.',
        English:
          'Two resistors R₁ = 6 Ω and R₂ = 3 Ω are connected across an 18 V DC supply. Calculate: (a) total resistance R_T and current I_S in Series, and (b) total resistance R_P, total current I_P, and total Power P = V × I_P in Parallel.'
      },
      stepsByLanguage: {
        Xitsonga: [
          '(a) Series: R_T = R₁ + R₂ = 6 + 3 = 9 Ω. I_S = V ÷ R_T = 18 ÷ 9 = 2 A.',
          '(b) Parallel: R_P = (R₁ × R₂) ÷ (R₁ + R₂) = (6 × 3) ÷ (6 + 3) = 18 ÷ 9 = 2 Ω.',
          'Parallel Current: I_P = V ÷ R_P = 18 ÷ 2 = 9 A. Power P = V × I_P = 18 × 9 = 162 W.'
        ],
        Sepedi: [
          '(a) Series: R_T = 6 + 3 = 9 Ω. I_S = 18 ÷ 9 = 2 A.',
          '(b) Parallel: R_P = (6 × 3) ÷ (6 + 3) = 18 ÷ 9 = 2 Ω.',
          'Current & Power: I_P = 18 ÷ 2 = 9 A. P = 18 × 9 = 162 W.'
        ],
        isiZulu: [
          '(a) Series: R_T = 6 + 3 = 9 Ω. I_S = 18 ÷ 9 = 2 A.',
          '(b) Parallel: R_P = (6 × 3) ÷ (6 + 3) = 18 ÷ 9 = 2 Ω.',
          'Ugelezi Namandla: I_P = 18 ÷ 2 = 9 A. P = 18 × 9 = 162 W.'
        ],
        Tshivenda: [
          '(a) Series: R_T = 6 + 3 = 9 Ω. I_S = 18 ÷ 9 = 2 A.',
          '(b) Parallel: R_P = (6 × 3) ÷ (6 + 3) = 18 ÷ 9 = 2 Ω.',
          'I_P = 18 ÷ 2 = 9 A. P = 18 × 9 = 162 W.'
        ],
        Sesotho: [
          '(a) Series: R_T = 6 + 3 = 9 Ω. I_S = 18 ÷ 9 = 2 A.',
          '(b) Parallel: R_P = (6 × 3) ÷ (6 + 3) = 18 ÷ 9 = 2 Ω.',
          'I_P = 18 ÷ 2 = 9 A. P = 18 × 9 = 162 W.'
        ],
        Setswana: [
          '(a) Series: R_T = 6 + 3 = 9 Ω. I_S = 18 ÷ 9 = 2 A.',
          '(b) Parallel: R_P = (6 × 3) ÷ (6 + 3) = 18 ÷ 9 = 2 Ω.',
          'I_P = 18 ÷ 2 = 9 A. P = 18 × 9 = 162 W.'
        ],
        Siswati: [
          '(a) Series: R_T = 6 + 3 = 9 Ω. I_S = 18 ÷ 9 = 2 A.',
          '(b) Parallel: R_P = (6 × 3) ÷ (6 + 3) = 18 ÷ 9 = 2 Ω.',
          'I_P = 18 ÷ 2 = 9 A. P = 18 × 9 = 162 W.'
        ],
        isiNdebele: [
          '(a) Series: R_T = 6 + 3 = 9 Ω. I_S = 18 ÷ 9 = 2 A.',
          '(b) Parallel: R_P = (6 × 3) ÷ (6 + 3) = 18 ÷ 9 = 2 Ω.',
          'I_P = 18 ÷ 2 = 9 A. P = 18 × 9 = 162 W.'
        ],
        isiXhosa: [
          '(a) Series: R_T = 6 + 3 = 9 Ω. I_S = 18 ÷ 9 = 2 A.',
          '(b) Parallel: R_P = (6 × 3) ÷ (6 + 3) = 18 ÷ 9 = 2 Ω.',
          'I_P = 18 ÷ 2 = 9 A. P = 18 × 9 = 162 W.'
        ],
        Afrikaans: [
          '(a) Serie: R_T = R₁ + R₂ = 6 + 3 = 9 Ω. I_S = 18 ÷ 9 = 2 A.',
          '(b) Parallel: R_P = (6 × 3) ÷ (6 + 3) = 18 ÷ 9 = 2 Ω.',
          'Parallelstroom & Drywing: I_P = 18 ÷ 2 = 9 A. P = V × I_P = 18 × 9 = 162 W.'
        ],
        English: [
          '(a) Series: R_T = R₁ + R₂ = 6 + 3 = 9 Ω. Total Current I_S = V ÷ R_T = 18 ÷ 9 = 2 A.',
          '(b) Parallel: R_P = (R₁ × R₂) ÷ (R₁ + R₂) = (6 × 3) ÷ (6 + 3) = 18 ÷ 9 = 2 Ω.',
          'Parallel Current: I_P = V ÷ R_P = 18 ÷ 2 = 9 A. Total Power: P = V × I_P = 18 × 9 = 162 W.'
        ]
      },
      finalAnswerByLanguage: {
        Xitsonga: '(a) R_T = 9 Ω, I_S = 2 A  |  (b) R_P = 2 Ω, I_P = 9 A, P = 162 W',
        Sepedi: '(a) R_T = 9 Ω, I_S = 2 A  |  (b) R_P = 2 Ω, I_P = 9 A, P = 162 W',
        isiZulu: '(a) R_T = 9 Ω, I_S = 2 A  |  (b) R_P = 2 Ω, I_P = 9 A, P = 162 W',
        Tshivenda: '(a) R_T = 9 Ω, I_S = 2 A  |  (b) R_P = 2 Ω, I_P = 9 A, P = 162 W',
        Sesotho: '(a) R_T = 9 Ω, I_S = 2 A  |  (b) R_P = 2 Ω, I_P = 9 A, P = 162 W',
        Setswana: '(a) R_T = 9 Ω, I_S = 2 A  |  (b) R_P = 2 Ω, I_P = 9 A, P = 162 W',
        Siswati: '(a) R_T = 9 Ω, I_S = 2 A  |  (b) R_P = 2 Ω, I_P = 9 A, P = 162 W',
        isiNdebele: '(a) R_T = 9 Ω, I_S = 2 A  |  (b) R_P = 2 Ω, I_P = 9 A, P = 162 W',
        isiXhosa: '(a) R_T = 9 Ω, I_S = 2 A  |  (b) R_P = 2 Ω, I_P = 9 A, P = 162 W',
        Afrikaans: '(a) R_T = 9 Ω, I_S = 2 A  |  (b) R_P = 2 Ω, I_P = 9 A, P = 162 W',
        English: '(a) R_T = 9 Ω, I_S = 2 A  |  (b) R_P = 2 Ω, I_P = 9 A, P = 162 W'
      }
    },
    practiceQuestions: [
      {
        number: 1,
        questionByLanguage: {
          Xitsonga: 'Ti-resistor tinharhu ta 12 Ω tinwana na tinwana ti hlanganisiwile hi Parallel eka 24 V. Kuma R_P na current hinkwayo I.',
          Sepedi: 'Diresistara tše tharo tša 12 Ω di kgokagantšwe ka Parallel go 24 V. Hwetša R_P le current I.',
          isiZulu: 'Ama-resistor amathathu angu-12 Ω axhunywe nge-Parallel ku-24 V. Thola u-R_P no-I.',
          Tshivenda: 'Dzi-resistor tharu dza 12 Ω kha Parallel ya 24 V. Wanani R_P na I.',
          Sesotho: 'Diresistara tse tharo tsa 12 Ω ka Parallel ho 24 V. Fumana R_P le I.',
          Setswana: 'Diresistara tse tharo tsa 12 Ω ka Parallel mo 24 V. Bona R_P le I.',
          Siswati: 'Ema-resistor lamatsatfu a-12 Ω ku-Parallel ya-24 V. Tfola R_P na-I.',
          isiNdebele: 'Ama-resistor amathathu we-12 Ω ku-Parallel ye-24 V. Fumana u-R_P no-I.',
          isiXhosa: 'Iiresistors ezintathu eziyi-12 Ω kwi-Parallel ye-24 V. Fumana u-R_P no-I.',
          Afrikaans: 'Drie 12 Ω-weerstande is in parallel oor 24 V verbind. Bereken R_P en totale stroom I.',
          English: 'Three identical 12 Ω resistors are connected in parallel across 24 V. Find total resistance R_P and total current I.'
        },
        answerByLanguage: {
          Xitsonga: '1/R_P = 1/12 + 1/12 + 1/12 = 3/12 -> R_P = 12 ÷ 3 = 4 Ω. I = 24 ÷ 4 = 6 A.',
          Sepedi: '1/R_P = 3/12 -> R_P = 4 Ω. I = 24 ÷ 4 = 6 A.',
          isiZulu: '1/R_P = 3/12 -> R_P = 4 Ω. I = 24 ÷ 4 = 6 A.',
          Tshivenda: 'R_P = 12 ÷ 3 = 4 Ω. I = 24 ÷ 4 = 6 A.',
          Sesotho: 'R_P = 12 ÷ 3 = 4 Ω. I = 24 ÷ 4 = 6 A.',
          Setswana: 'R_P = 12 ÷ 3 = 4 Ω. I = 24 ÷ 4 = 6 A.',
          Siswati: 'R_P = 12 ÷ 3 = 4 Ω. I = 24 ÷ 4 = 6 A.',
          isiNdebele: 'R_P = 12 ÷ 3 = 4 Ω. I = 24 ÷ 4 = 6 A.',
          isiXhosa: 'R_P = 12 ÷ 3 = 4 Ω. I = 24 ÷ 4 = 6 A.',
          Afrikaans: '1/R_P = 3/12 -> R_P = 4 Ω. Stroom I = 24 ÷ 4 = 6 A.',
          English: '1/R_P = 1/12 + 1/12 + 1/12 = 3/12 => R_P = 4 Ω. Total Current I = 24 V ÷ 4 Ω = 6 A.'
        }
      },
      {
        number: 2,
        questionByLanguage: {
          Xitsonga: 'Ketlele ya 230 V yi koka 8 A. Hlayela Power P hi W na kW, na Energy E hi 2 wa tiawara (kWh).',
          Sepedi: 'Ketlele ya 230 V e goga 8 A. Bala Power P (W le kW) le Energy ka diiri tše 2.',
          isiZulu: 'Iketela elingu-230 V lidonsa u-8 A. Bala i-Power P (W no-kW) ne-Energy emahoreni ama-2.',
          Tshivenda: 'Ketlele ya 230 V i koka 8 A. Vhalelani P na Energy nga awara 2.',
          Sesotho: 'Ketlele ya 230 V e hula 8 A. Bala P le Energy ka dihora tse 2.',
          Setswana: 'Ketlele ya 230 V e goga 8 A. Bala P le Energy mo diureng tse 2.',
          Siswati: 'Liketela la-230 V lidonsa 8 A. Bala P ne-Energy ngemahora la-2.',
          isiNdebele: 'Iketela le-230 V lidonsa 8 A. Bala u-P ne-Energy ngama-awara a-2.',
          isiXhosa: 'Iketile eyi-230 V itsala u-8 A. Bala u-P ne-Energy kwiiyure ezi-2.',
          Afrikaans: 'n 230 V-ketel trek 8 A. Bereken Drywing P (in W en kW) en Energie verbruik in 2 uur (kWh).',
          English: 'A 230 V electric kettle draws 8 A. Calculate Power P (in W and kW) and Energy consumed in 2 hours (kWh).'
        },
        answerByLanguage: {
          Xitsonga: 'P = 230 × 8 = 1840 W = 1.84 kW. Energy = 1.84 kW × 2 h = 3.68 kWh.',
          Sepedi: 'P = 230 × 8 = 1840 W = 1.84 kW. E = 1.84 × 2 = 3.68 kWh.',
          isiZulu: 'P = 230 × 8 = 1840 W = 1.84 kW. E = 1.84 × 2 = 3.68 kWh.',
          Tshivenda: 'P = 1840 W = 1.84 kW. E = 3.68 kWh.',
          Sesotho: 'P = 1840 W = 1.84 kW. E = 3.68 kWh.',
          Setswana: 'P = 1840 W = 1.84 kW. E = 3.68 kWh.',
          Siswati: 'P = 1840 W = 1.84 kW. E = 3.68 kWh.',
          isiNdebele: 'P = 1840 W = 1.84 kW. E = 3.68 kWh.',
          isiXhosa: 'P = 1840 W = 1.84 kW. E = 3.68 kWh.',
          Afrikaans: 'P = V × I = 230 × 8 = 1840 W = 1.84 kW. Energie E = 1.84 kW × 2 h = 3.68 kWh.',
          English: 'P = V × I = 230 × 8 = 1840 W = 1.84 kW. Energy = 1.84 kW × 2 h = 3.68 kWh.'
        }
      }
    ]
  },
  {
    id: 'elec-n1-ch4-magnetism',
    level: 2,
    chapterNumber: 4,
    chapterLabelByLanguage: {
      Xitsonga: 'N1 • Chapter 4',
      Sepedi: 'N1 • Chapter 4',
      isiZulu: 'N1 • Chapter 4',
      Tshivenda: 'N1 • Chapter 4',
      Sesotho: 'N1 • Chapter 4',
      Setswana: 'N1 • Chapter 4',
      Siswati: 'N1 • Chapter 4',
      isiNdebele: 'N1 • Chapter 4',
      isiXhosa: 'N1 • Chapter 4',
      Afrikaans: 'N1 • Chapter 4',
      English: 'N1 • Chapter 4'
    },
    titleByLanguage: {
      Xitsonga: 'Magnetism & Electromagnetism',
      Sepedi: 'Magnetism & Electromagnetism',
      isiZulu: 'Magnetism & Electromagnetism',
      Tshivenda: 'Magnetism & Electromagnetism',
      Sesotho: 'Magnetism & Electromagnetism',
      Setswana: 'Magnetism & Electromagnetism',
      Siswati: 'Magnetism & Electromagnetism',
      isiNdebele: 'Magnetism & Electromagnetism',
      isiXhosa: 'Magnetism & Electromagnetism',
      Afrikaans: 'Magnetism & Electromagnetism',
      English: 'Magnetism & Electromagnetism'
    },
    subtitleByLanguage: {
      Xitsonga: 'Matimba ya Maginete, Flux (Φ), Flux Density (B), F = B·I·l & Electromagnetic Induction',
      Sepedi: 'Makenete, Magnetic Flux (Φ), Flux Density (B), F = B·I·l le Induction',
      isiZulu: 'Umazibuthe, i-Flux (Φ), i-Flux Density (B), F = B·I·l no-Electromagnetism',
      Tshivenda: 'Magenethe, Flux (Φ), B, F = B·I·l na Electromagnetic Induction',
      Sesotho: 'Makenete, Flux (Φ), B, F = B·I·l le Electromagnetism',
      Setswana: 'Makenete, Flux (Φ), B, F = B·I·l le Electromagnetism',
      Siswati: 'Umazibuthe, Flux (Φ), B, F = B·I·l ne-Electromagnetism',
      isiNdebele: 'Umazibuthe, Flux (Φ), B, F = B·I·l ne-Electromagnetism',
      isiXhosa: 'Umazibuthe, i-Flux (Φ), B, F = B·I·l ne-Electromagnetism',
      Afrikaans: 'Magnetiese Vloed (Φ), Vloeddigtheid (B), F = B·I·l & Elektromagnetiese Induksie',
      English: 'Magnetic fields, solenoids, force on a conductor (F = B·I·l) & Faraday’s induction'
    },
    summaryByLanguage: {
      Xitsonga:
        'Maginete yi na mapholi mambirhi (North na South); mapholi lama fanaka ma hlongolana kasi lama hambaneke ma kokana. Loko gezi ri famba eka waya kumbe khoyili (solenoid), ri tumbuluxa ndzhawu ya maginete (Electromagnetism). Ndzhawu ya maginete yi pimiwa hi Flux Φ (Webers) na Flux Density B = Φ / A (Tesla). Force eka waya yi va F = B × I × l.',
      Sepedi:
        'Makenete e na le dipholo tše pedi (N le S); dipholo tša go swana di a kganana gomme tša go fapana di a gogana. Moela ka gare ga khoyili o hlola maatla a makenete (Electromagnetism). Flux Φ e elwa ka Webers, Flux Density B = Φ / A (Tesla), gomme Force F = B × I × l.',
      isiZulu:
        'Umazibuthe unezingxenye ezimbili (N no-S); ezifanayo ziyaxoshana kanti ezingafani ziyadonsana. Ugelezi oluhamba ocingweni noma ku-coil lwakha umazibuthe kagesi (Electromagnetism). I-Flux Φ ilinganiswa nge-Webers, i-B = Φ / A (Tesla), bese i-Force F = B × I × l.',
      Tshivenda:
        'Magenethe i na N na S. Mudagasi kha khoyili u bveledza electromagnetism. Flux Φ (Webers), B = Φ / A (Tesla), Force F = B × I × l.',
      Sesotho:
        'Makenete e na le N le S. Motlakase o hlahisa electromagnetism. Flux Φ (Webers), B = Φ / A (Tesla), Force F = B × I × l.',
      Setswana:
        'Makenete e na le N le S. Motlakase o dira electromagnetism. Flux Φ (Webers), B = Φ / A (Tesla), Force F = B × I × l.',
      Siswati: 'Umazibuthe une-N na-S. Gezi wenta i-electromagnetism. Flux Φ (Wb), B = Φ / A (T), Force F = B × I × l.',
      isiNdebele: 'Umazibuthe une-N no-S. Igezi yenza i-electromagnetism. Flux Φ (Wb), B = Φ / A (T), Force F = B × I × l.',
      isiXhosa: 'Umazibuthe une-N no-S. Umbane wenza i-electromagnetism. Flux Φ (Wb), B = Φ / A (T), Force F = B × I × l.',
      Afrikaans:
        'Magnete het N- en S-pole; gelyksoortige pole stoot af en ongelyksoortige pole trek aan. Stroom deur n spoel skep n elektromagneet. Magnetiese vloed Φ word in Weber (Wb) gemeet, vloeddigtheid B = Φ/A in Tesla (T), en krag op n geleier is F = B × I × l.',
      English:
        'Every magnet has a North and South pole (like poles repel, unlike poles attract). Passing electric current through a coil (solenoid) creates an electromagnet whose strength rises with more turns (N) and current (I). Magnetic Flux (Φ, Weber) passing through area A gives Flux Density B = Φ / A (Tesla). A current-carrying conductor in a magnetic field experiences force F = B × I × l (motor principle).'
    },
    keyTerms: [
      {
        termEn: 'Magnetic Flux Density (B)',
        translations: {
          Xitsonga: 'Ku Tala ka Maginete — Tesla (T)',
          Sepedi: 'Botebo bja Makenete — Tesla (T)',
          isiZulu: 'Ukuminyana Kwamazibuthe — Tesla (T)',
          Tshivenda: 'Vhunzhi ha Magenethe — Tesla (T)',
          Sesotho: 'Tekanyo ya Makenete — Tesla (T)',
          Setswana: 'Kitsokgolo ya Makenete — Tesla (T)',
          Siswati: 'Kucinana Kwemazibuthe — Tesla (T)',
          isiNdebele: 'Ukucina Kwamazibuthe — Tesla (T)',
          isiXhosa: 'Ubunzulu boMazibuthe — Tesla (T)',
          Afrikaans: 'Magnetiese Vloeddigtheid — Tesla (T)',
          English: 'Magnetic flux per square metre: B = Φ / A (Tesla)'
        },
        meaningByLanguage: {
          Xitsonga: 'Mpimo wa milayeni ya maginete eka ndzhawu ya 1 m² (1 T = 1 Wb/m²).',
          Sepedi: 'Bontši bja flux ya makenete mo sekgobeng sa 1 m² (B = Φ / A).',
          isiZulu: 'Inani lemigqa yamazibuthe endaweni engu-1 m² (B = Φ / A).',
          Tshivenda: 'Tshivhalo tsha flux kha 1 m² (B = Φ / A).',
          Sesotho: 'Palo ya flux sebakeng sa 1 m² (B = Φ / A).',
          Setswana: 'Palo ya flux mo 1 m² (B = Φ / A).',
          Siswati: 'Linani le-flux endzaweni ya-1 m² (B = Φ / A).',
          isiNdebele: 'Inani le-flux endaweni ye-1 m² (B = Φ / A).',
          isiXhosa: 'Ubungakanani be-flux kwi-1 m² (B = Φ / A).',
          Afrikaans: 'Hoeveelheid magnetiese vloed per vierkante meter: B = Φ ÷ A in Tesla (T).',
          English: 'Amount of magnetic flux concentrated per unit area (B = Φ / A in Tesla).'
        }
      },
      {
        termEn: 'Magnetomotive Force (MMF)',
        translations: {
          Xitsonga: 'Matimba ya Khoyili — Ampere-turns (At)',
          Sepedi: 'Maatla a Khoyili — Ampere-turns (At)',
          isiZulu: 'Amandla e-Coil — Ampere-turns (At)',
          Tshivenda: 'Maanda a Khoyili — Ampere-turns (At)',
          Sesotho: 'Matla a Khoili — Ampere-turns (At)',
          Setswana: 'Maatla a Khoili — Ampere-turns (At)',
          Siswati: 'Emandla e-Coil — Ampere-turns (At)',
          isiNdebele: 'Amandla we-Coil — Ampere-turns (At)',
          isiXhosa: 'Amandla e-Coil — Ampere-turns (At)',
          Afrikaans: 'Magnetomotoriese Krag (MMK) — Ampère-windings',
          English: 'Magnetic driving force of a coil: MMF = N × I'
        },
        meaningByLanguage: {
          Xitsonga: 'Matimba yo tumbuluxa maginete eka khoyili; ya kula loko turns (N) na current (I) swi kula.',
          Sepedi: 'Maatla a go hlola flux ya makenete ka khoyiling: MMF = N × I.',
          isiZulu: 'Amandla okwenza umazibuthe ku-coil; andiswa yizinombolo zamajika (N) nogelezi (I).',
          Tshivenda: 'Maanda a u bveledza flux kha khoyili: MMF = N × I.',
          Sesotho: 'Matla a ho etsa makenete khoiling: MMF = N × I.',
          Setswana: 'Maatla a go dira makenete mo khoiling: MMF = N × I.',
          Siswati: 'Emandla ekwenta umazibuthe ku-coil: MMF = N × I.',
          isiNdebele: 'Amandla wokwenza umazibuthe ku-coil: MMF = N × I.',
          isiXhosa: 'Amandla okudala umazibuthe kwi-coil: MMF = N × I.',
          Afrikaans: 'Magnetiese dryfkrag van n spoel: MMK = N × I (windings maal stroom).',
          English: 'Calculated as number of coil turns N multiplied by current I (MMF = N × I).'
        }
      },
      {
        termEn: 'Faraday’s Induction',
        translations: {
          Xitsonga: 'Ku Tumbuluxa Gezi hi Maginete (Induction)',
          Sepedi: 'Tšweletšo ya Mohlagase ka Makenete',
          isiZulu: 'Ukukhiqiza Ugesi Ngomazibuthe',
          Tshivenda: 'U Bveledza Mudagasi nga Magenethe',
          Sesotho: 'Ho Hlahisa Motlakase ka Makenete',
          Setswana: 'Go Tlhagisa Motlakase ka Makenete',
          Siswati: 'Kukhicita Gezi Ngemazibuthe',
          isiNdebele: 'Ukukhiqiza Igezi Ngomazibuthe',
          isiXhosa: 'Ukuvelisa Umbane ngoMazibuthe',
          Afrikaans: 'Faraday se Elektromagnetiese Induksie',
          English: 'Generating voltage whenever magnetic flux links a moving conductor'
        },
        meaningByLanguage: {
          Xitsonga: 'Loko waya yi tsema milayeni ya maginete, ku tumbuluxiwa Voltage (EMF) — ndlela leyi ti-generator ti tirhaka ha yona.',
          Sepedi: 'Ge terata e kgaola mela ya makenete go tšwelela Voltage (EMF) — mokgwa wa dijenereithara.',
          isiZulu: 'Uma ucingo lunqamula imigqa yamazibuthe kukhiqizeka i-Voltage — yiyo indlela yamajeneretha.',
          Tshivenda: 'Musi darata i tshi tshea mitala ya magenethe hu bveledzwa Voltage.',
          Sesotho: 'Ha terata e kgaola mela ya makenete ho hlahiswa Voltage.',
          Setswana: 'Fa terata e kgaola mela ya makenete go tlhagisiwa Voltage.',
          Siswati: 'Uma lucingo lujuba imigca yemazibuthe kubakhona i-Voltage.',
          isiNdebele: 'Lokha intambo isika imigca yamazibuthe kuvela i-Voltage.',
          isiXhosa: 'Xa ucingo lunqumla imigca yamazibuthe kuveliswa i-Voltage.',
          Afrikaans: 'Wanneer n geleier magnetiese vloedlyne sny, word n EMK geïnduseer (beginsel van kragopwekkers).',
          English: 'Relative motion between a magnetic field and conductor induces an EMF — basis of generators & transformers.'
        }
      }
    ],
    workedExample: {
      questionByLanguage: {
        Xitsonga:
          'Waya leyi ololokeke ya ku leha l = 0.4 m yi rhwala I = 15 A eka ndzhawu ya maginete ya B = 0.5 T. Hlayela: (a) Force F eka waya, na (b) Flux Φ loko core area A = 0.02 m².',
        Sepedi:
          'Terata ya botelele l = 0.4 m e rwala I = 15 A ka gare ga makenete ya B = 0.5 T. Bala: (a) Force F, le (b) Flux Φ ge sekgoba e le A = 0.02 m².',
        isiZulu:
          'Ucingo olungamamitha l = 0.4 m luthwele u-I = 15 A endaweni yamazibuthe engu-B = 0.5 T. Bala: (a) Force F, kanye ne-(b) Flux Φ uma u-A = 0.02 m².',
        Tshivenda:
          'Darata ya l = 0.4 m i hwala I = 15 A kha B = 0.5 T. Vhalelani: (a) Force F, na (b) Flux Φ arali A = 0.02 m².',
        Sesotho:
          'Terata ya l = 0.4 m e jara I = 15 A ho B = 0.5 T. Bala: (a) Force F, le (b) Flux Φ ha A = 0.02 m².',
        Setswana:
          'Terata ya l = 0.4 m e rwala I = 15 A mo B = 0.5 T. Bala: (a) Force F, le (b) Flux Φ fa A = 0.02 m².',
        Siswati:
          'Lucingo lwa-l = 0.4 m lutsetse I = 15 A ku-B = 0.5 T. Bala: (a) Force F, ne-(b) Flux Φ uma A = 0.02 m².',
        isiNdebele:
          'Intambo ye-l = 0.4 m ithwele I = 15 A ku-B = 0.5 T. Bala: (a) Force F, ne-(b) Flux Φ uma A = 0.02 m².',
        isiXhosa:
          'Ucingo lwe-l = 0.4 m luthwele u-I = 15 A ku-B = 0.5 T. Bala: (a) Force F, kunye ne-(b) Flux Φ xa A = 0.02 m².',
        Afrikaans:
          'n Geleier met aktiewe lengte l = 0.4 m dra n stroom van I = 15 A loodreg op n magnetiese veld B = 0.5 T. Bereken: (a) Krag F op die geleier, en (b) Totale vloed Φ as A = 0.02 m².',
        English:
          'A straight conductor of active length l = 0.4 m carries I = 15 A perpendicular to a uniform magnetic field B = 0.5 T. Calculate: (a) the mechanical Force F on the conductor, and (b) total Magnetic Flux Φ if pole area A = 0.02 m².'
      },
      stepsByLanguage: {
        Xitsonga: [
          '(a) Tirhisa fomula ya Force: F = B × I × l = 0.5 × 15 × 0.4 = 3 N.',
          '(b) Tirhisa fomula ya Flux: Φ = B × A = 0.5 × 0.02 = 0.01 Wb (10 mWb).'
        ],
        Sepedi: [
          '(a) F = B × I × l = 0.5 × 15 × 0.4 = 3 N.',
          '(b) Φ = B × A = 0.5 × 0.02 = 0.01 Wb (10 mWb).'
        ],
        isiZulu: [
          '(a) F = B × I × l = 0.5 × 15 × 0.4 = 3 N.',
          '(b) Φ = B × A = 0.5 × 0.02 = 0.01 Wb (10 mWb).'
        ],
        Tshivenda: [
          '(a) F = B × I × l = 0.5 × 15 × 0.4 = 3 N.',
          '(b) Φ = B × A = 0.5 × 0.02 = 0.01 Wb (10 mWb).'
        ],
        Sesotho: [
          '(a) F = B × I × l = 0.5 × 15 × 0.4 = 3 N.',
          '(b) Φ = B × A = 0.5 × 0.02 = 0.01 Wb (10 mWb).'
        ],
        Setswana: [
          '(a) F = B × I × l = 0.5 × 15 × 0.4 = 3 N.',
          '(b) Φ = B × A = 0.5 × 0.02 = 0.01 Wb (10 mWb).'
        ],
        Siswati: [
          '(a) F = B × I × l = 0.5 × 15 × 0.4 = 3 N.',
          '(b) Φ = B × A = 0.5 × 0.02 = 0.01 Wb (10 mWb).'
        ],
        isiNdebele: [
          '(a) F = B × I × l = 0.5 × 15 × 0.4 = 3 N.',
          '(b) Φ = B × A = 0.5 × 0.02 = 0.01 Wb (10 mWb).'
        ],
        isiXhosa: [
          '(a) F = B × I × l = 0.5 × 15 × 0.4 = 3 N.',
          '(b) Φ = B × A = 0.5 × 0.02 = 0.01 Wb (10 mWb).'
        ],
        Afrikaans: [
          '(a) Krag op geleier: F = B × I × l = 0.5 × 15 × 0.4 = 3 N.',
          '(b) Magnetiese vloed: Φ = B × A = 0.5 × 0.02 = 0.01 Wb (10 mWb).'
        ],
        English: [
          '(a) Force on conductor: F = B × I × l = 0.5 T × 15 A × 0.4 m = 3 N.',
          '(b) Magnetic Flux: Φ = B × A = 0.5 T × 0.02 m² = 0.01 Wb (or 10 mWb).'
        ]
      },
      finalAnswerByLanguage: {
        Xitsonga: '(a) F = 3 N  |  (b) Φ = 0.01 Wb (10 mWb)',
        Sepedi: '(a) F = 3 N  |  (b) Φ = 0.01 Wb (10 mWb)',
        isiZulu: '(a) F = 3 N  |  (b) Φ = 0.01 Wb (10 mWb)',
        Tshivenda: '(a) F = 3 N  |  (b) Φ = 0.01 Wb (10 mWb)',
        Sesotho: '(a) F = 3 N  |  (b) Φ = 0.01 Wb (10 mWb)',
        Setswana: '(a) F = 3 N  |  (b) Φ = 0.01 Wb (10 mWb)',
        Siswati: '(a) F = 3 N  |  (b) Φ = 0.01 Wb (10 mWb)',
        isiNdebele: '(a) F = 3 N  |  (b) Φ = 0.01 Wb (10 mWb)',
        isiXhosa: '(a) F = 3 N  |  (b) Φ = 0.01 Wb (10 mWb)',
        Afrikaans: '(a) F = 3 N  |  (b) Φ = 0.01 Wb (10 mWb)',
        English: '(a) F = 3 N  |  (b) Φ = 0.01 Wb (10 mWb)'
      }
    },
    practiceQuestions: [
      {
        number: 1,
        questionByLanguage: {
          Xitsonga: 'Khoyili ya N = 200 turns yi rhwala current ya I = 2.5 A. Hlayela Magnetomotive Force (MMF).',
          Sepedi: 'Khoyili ya N = 200 turns e rwala I = 2.5 A. Bala MMF.',
          isiZulu: 'I-coil ene-N = 200 turns ithwele u-I = 2.5 A. Bala i-MMF.',
          Tshivenda: 'Khoyili ya N = 200 turns i hwala I = 2.5 A. Vhalelani MMF.',
          Sesotho: 'Khoili ya N = 200 turns e jara I = 2.5 A. Bala MMF.',
          Setswana: 'Khoili ya N = 200 turns e rwala I = 2.5 A. Bala MMF.',
          Siswati: 'I-coil ya-N = 200 turns itsetse I = 2.5 A. Bala MMF.',
          isiNdebele: 'I-coil ye-N = 200 turns ithwele I = 2.5 A. Bala MMF.',
          isiXhosa: 'I-coil ye-N = 200 turns ithwele I = 2.5 A. Bala i-MMF.',
          Afrikaans: 'n Spoel met N = 200 windings dra I = 2.5 A. Bereken die Magnetomotoriese Krag (MMK).',
          English: 'A coil of N = 200 turns carries a current I = 2.5 A. Calculate its Magnetomotive Force (MMF).'
        },
        answerByLanguage: {
          Xitsonga: 'MMF = N × I = 200 × 2.5 = 500 At (Ampere-turns).',
          Sepedi: 'MMF = N × I = 200 × 2.5 = 500 At (Ampere-turns).',
          isiZulu: 'MMF = N × I = 200 × 2.5 = 500 At (Ampere-turns).',
          Tshivenda: 'MMF = 200 × 2.5 = 500 At.',
          Sesotho: 'MMF = 200 × 2.5 = 500 At.',
          Setswana: 'MMF = 200 × 2.5 = 500 At.',
          Siswati: 'MMF = 200 × 2.5 = 500 At.',
          isiNdebele: 'MMF = 200 × 2.5 = 500 At.',
          isiXhosa: 'MMF = 200 × 2.5 = 500 At.',
          Afrikaans: 'MMK = N × I = 200 × 2.5 = 500 At (Ampère-windings).',
          English: 'MMF = N × I = 200 × 2.5 = 500 At (Ampere-turns).'
        }
      },
      {
        number: 2,
        questionByLanguage: {
          Xitsonga: 'Hambanisa exikarhi ka Fleming’s Left-Hand Rule na Fleming’s Right-Hand Rule.',
          Sepedi: 'Fapantšha Fleming’s Left-Hand Rule le Fleming’s Right-Hand Rule.',
          isiZulu: 'Hlukanisa phakathi kwe-Fleming’s Left-Hand Rule ne-Right-Hand Rule.',
          Tshivenda: 'Fhambanyisani Fleming’s Left-Hand Rule na Right-Hand Rule.',
          Sesotho: 'Fapanya Fleming’s Left-Hand Rule le Right-Hand Rule.',
          Setswana: 'Farologanya Fleming’s Left-Hand Rule le Right-Hand Rule.',
          Siswati: 'Hlukanisa Fleming’s Left-Hand Rule ne-Right-Hand Rule.',
          isiNdebele: 'Hlukanisa Fleming’s Left-Hand Rule ne-Right-Hand Rule.',
          isiXhosa: 'Yahlula phakathi kwe-Fleming’s Left-Hand Rule ne-Right-Hand Rule.',
          Afrikaans: 'Onderskei tussen Fleming se Linkerhandreël en Regterhandreël.',
          English: 'Distinguish between Fleming’s Left-Hand Rule and Fleming’s Right-Hand Rule.'
        },
        answerByLanguage: {
          Xitsonga: 'Left-Hand Rule i ya Motor (yi komba tlhelo ra ku famba/Motion); Right-Hand Rule i ya Generator (yi komba tlhelo ra EMF/Current leyi tumbuluxiweke).',
          Sepedi: 'Left-Hand Rule ke ya Motor (Motion); Right-Hand Rule ke ya Generator (induced Current).',
          isiZulu: 'I-Left-Hand Rule ngeyama-Motor (Motion); i-Right-Hand Rule ngeyama-Generator (induced Current).',
          Tshivenda: 'Left-Hand Rule ndi ya Motor; Right-Hand Rule ndi ya Generator.',
          Sesotho: 'Left-Hand Rule ke ya Motor; Right-Hand Rule ke ya Generator.',
          Setswana: 'Left-Hand Rule ke ya Motor; Right-Hand Rule ke ya Generator.',
          Siswati: 'Left-Hand Rule yema-Motor; Right-Hand Rule yema-Generator.',
          isiNdebele: 'Left-Hand Rule ngeyama-Motor; Right-Hand Rule ngeyama-Generator.',
          isiXhosa: 'Left-Hand Rule yeyee-Motor; Right-Hand Rule yeyee-Generator.',
          Afrikaans: 'Linkerhandreël geld vir Motors (wys rigting van krag/beweging); Regterhandreël geld vir Generators (wys geïnduseerde stroomrigting).',
          English: 'Left-Hand Rule applies to Motors (Thumb = Motion/Force, First finger = Field, Second = Current); Right-Hand Rule applies to Generators (gives induced EMF/Current direction).'
        }
      }
    ]
  }
];
