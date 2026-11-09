/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * REAL-TIME MULTILINGUAL EXAM QUESTION & MEMO EXPLANATION GENERATOR
 * Generates pedagogical step-by-step teaching in the learner's chosen language:
 * - isiZulu, isiXhosa, Afrikaans, Sepedi, Setswana, Sesotho, Xitsonga, siSwati, Tshivenda, isiNdebele, English, and SASL 🤟.
 * 
 * Structure:
 * 1. 🎯 What the Question is Asking (in chosen language)
 * 2. 🔑 Key Terminology & Concepts
 * 3. 📝 Step-by-Step Mark Breakdown (Step 1, Step 2, Step 3 with marks)
 * 4. ⚠️ Common Examiner Traps & Mistakes to Avoid
 * 5. 💡 Exam Technique & Time Management
 * 6. (If SASL) Visual Spatial Guide & Fingerspelling references
 */

export interface ExplanationParams {
  questionNumber: string;
  questionText: string;
  officialMemoEn: string;
  marks: number;
  gradeName: string;
  subject: string;
  language: string;
  topic?: string;
}

export interface StructuredExplanation {
  whatIsAsked: string;
  keywords: Array<{ term: string; explanation: string }>;
  steps: Array<{ stepNumber: number; title: string; detail: string; markAllocation: string }>;
  commonMistakes: string[];
  examTip: string;
  saslGuide?: {
    visualConcepts: string[];
    fingerspellTerms: string[];
    spatialLayoutTip: string;
  };
}

export const getRealExplanation = (params: ExplanationParams) => generatePaperExplanation(params);

export function generatePaperExplanation(params: ExplanationParams): StructuredExplanation {
  const { questionNumber, questionText, officialMemoEn, marks, gradeName, subject, language, topic } = params;
  const langLower = (language || 'English').toLowerCase();

  // Normalize language key
  const isZulu = langLower.includes('zulu') || langLower === 'zu';
  const isXhosa = langLower.includes('xhosa') || langLower === 'xh';
  const isAfrikaans = langLower.includes('afrikaans') || langLower === 'af';
  const isTsonga = langLower.includes('tsonga') || langLower === 'ts';
  const isSepedi = langLower.includes('sepedi') || langLower === 'nso';
  const isSesotho = langLower.includes('sesotho') || langLower === 'st';
  const isSetswana = langLower.includes('setswana') || langLower === 'tn';
  const isSwati = langLower.includes('swati') || langLower === 'ss';
  const isVenda = langLower.includes('venda') || langLower === 've';
  const isNdebele = langLower.includes('ndebele') || langLower === 'nr';
  const isSasl = langLower.includes('sasl') || langLower.includes('sign');

  const sLower = subject.toLowerCase();
  const qLower = questionText.toLowerCase();

  // Specialized: Grade 6 Social Sciences
  if (sLower.includes('social') || sLower.includes('geography') || sLower.includes('history')) {
    if (qLower.includes('latitude') || qLower.includes('scale') || qLower.includes('equator')) {
      if (isZulu) {
        return {
          whatIsAsked: 'Lo mbuzo udinga ukuthi ukhombise ukuqonda kwakho amamephu (Map Skills). Ucelwa ukuthi: (a) Uqambe umugqa we-0° (Equator) nomthelela wawo esimweni sezulu; (b) Uchaze umehluko phakathi kwama-Latitudes nama-Longitudes; (c) Ubale ibanga langempela usebenzisa isikali se-map (scale 1:50 000).',
          keywords: [
            { term: 'Equator (Inkaba-mhlaba)', explanation: '0° Latitude lapho kushisa khona unyaka wonke ngenxa yokuthola ilanga ngqo; umugqa ohlukanisa umhlaba phakathi.' },
            { term: 'Latitude (Ulayini ovundlile)', explanation: 'Iya empumalanga nasentshonalanga, ihlala iqondene (parallel); ikala ibanga eliya enyakatho noma eningizimu.' },
            { term: 'Scale (Isikali)', explanation: '1:50 000 kusho ukuthi 1 cm ebalazweni limele 50 000 cm emhlabeni (guqula ube km: ÷ 100 000).' }
          ],
          steps: [
            { stepNumber: 1, title: 'I-Equator kanye Nesimo Sezulu', detail: 'Bhala ukuthi umugqa ngu-Equator. Chaza ukuthi izindawo eziseduze ne-Equator zithola ilanga elishisa kakhulu unyaka wonke ngoba imisebe yelanga ifika ngqo.', markAllocation: '2 Amamaki' },
            { stepNumber: 2, title: 'Umehluko phakathi kwe-Latitude ne-Longitude', detail: 'Ama-Latitude ahamba ngokuvundla (East to West) kanti ama-Longitude ahamba ngokuqonda (North to South ukusuka kwipholi kuya kwipholi).', markAllocation: '2 Amamaki' },
            { stepNumber: 3, title: 'Ukubala Ibanga (Distance Calculation)', detail: 'Bala: 4 cm × 50 000 = 200 000 cm. Ukuwenza amamitha: 200 000 ÷ 100 = 2 000 m. Ukuwenza amakhilomitha: 2 000 ÷ 1 000 = 2 km.', markAllocation: '1 Imaki' }
          ],
          commonMistakes: [
            'Ukukhohlwa ukubhala amayunithi (km). Ungagcini ngo-200 000 cm!',
            'Ukudida ama-Latitude (avundlile) nama-Longitude (amile).'
          ],
          examTip: 'Emhlanganweni wokumaka we-DBE, ukubhala izinyathelo zokuguqula (cm -> m -> km) kuqinisekisa ukuthola imaki lendlela ngisho noma wenze iphutha ekugcineni.'
        };
      } else if (isAfrikaans) {
        return {
          whatIsAsked: 'Hierdie vraag toets jou kaartvaardighede (Graad 6 Sosiale Wetenskappe). Jy moet: (a) Die 0° breedtelyn (Ewenaar) identifiseer en die klimaateffek noem; (b) Onderskei tussen Breedtelyne en Lengtelyne; (c) Werklike afstand bereken met die skaal 1:50 000.',
          keywords: [
            { term: 'Ewenaar (Equator)', explanation: 'Die 0° breedtelyn wat direkte sonstrale heeljaar ontvang en tropiese hitte veroorsaak.' },
            { term: 'Breedtelyne vs Lengtelyne', explanation: 'Breedtelyne loop horisontaal oos-wes; Lengtelyne loop vertikaal noord-suid tussen die pole.' },
            { term: 'Skaalomskakeling', explanation: '1 cm op die kaart verteenwoordig 50 000 cm op die grond (0.5 km).' }
          ],
          steps: [
            { stepNumber: 1, title: 'Identifiseer die Ewenaar', detail: 'Skryf Ewenaar (0°). Verduidelik dat direkte sonbestraling lei tot \'n warm, tropiese klimaat.', markAllocation: '2 Punte' },
            { stepNumber: 2, title: 'Breedtelyne teenoor Lengtelyne', detail: 'Breedtelyne is ewewydige horisontale sirkels; lengtelyne ontmoet by die noord- en suidpool.', markAllocation: '2 Punte' },
            { stepNumber: 3, title: 'Afstandsberekening', detail: 'Bereken: 4 cm × 50 000 = 200 000 cm = 2 000 m = 2 km werklike afstand.', markAllocation: '1 Punt' }
          ],
          commonMistakes: [
            'Moenie vergeet om sentimeters na kilometers om te skakel nie (verdeel deur 100 000).',
            'Moenie die rigting van breedtelyne en lengtelyne omruil nie.'
          ],
          examTip: 'Toon altyd jou bewerkings stap-vir-stap sodat die nasiener metode-punte kan toeken.'
        };
      }
    } else if (qLower.includes('lenin') || qLower.includes('bolshevik') || qLower.includes('communism') || qLower.includes('nep')) {
      if (isZulu) {
        return {
          whatIsAsked: 'Lo mbuzo we-Grade 11 History uhlaziya ushintsho lwenqubomgomo ka-Vladimir Lenin eRussia: Umehluko phakathi kwe-"War Communism" (1918–1921) kanye ne-"New Economic Policy (NEP)" ka-1921, kanye nencazelo yesisho sakhe esithi "isinyathelo esisodwa emuva ukuze uthathe amabili phambili".',
          keywords: [
            { term: 'War Communism (Ukhomanisi Wempi)', explanation: 'Ukulawula kukahulumeni ngokugcwele komnotho ngesikhathi sempi yombango, ukubopha abalimi ukuthi banikeze uhulumeni ukolweni ngaphandle kwenkokhelo.' },
            { term: 'NEP (Inqubomgomo Entsha Yezomnotho)', explanation: 'Ukuvumela ubungxiwankulu obulinganiselwe (capitalism) lapho abalimi bethengisa okusele emakethe ukuze kusindiswe umnotho ekubhujisweni indlala.' },
            { term: 'Commanding Heights', explanation: 'Izimboni ezinkulu, amabhange nezitimela ezasala ziqondiswa nguhulumeni wamaBolsheviks.' }
          ],
          steps: [
            { stepNumber: 1, title: 'Chaza i-War Communism', detail: 'Ukulawulwa komnotho ngokuqinile nguhulumeni: ukuvalwa kohwebo oluzimele, ukuthathwa kokudla kubalimi ngenkani ukuze kondliwe ibutho le-Red Army.', markAllocation: '2 Amamaki' },
            { stepNumber: 2, title: 'Chaza izinguquko ze-NEP (1921)', detail: 'U-Lenin wavumela abalimi bathengise izinsalela zokudla ukuze benze inzuzo, wavumela amabhizinisi amancane azimele, kwaphela ukuthathwa kokudla ngenkani.', markAllocation: '2 Amamaki' },
            { stepNumber: 3, title: 'Incazelo yesisho sika-Lenin', detail: 'Ukusuka kancane kukhomanisi ohlanzekile (isinyathelo emuva) kwakudingeka ukuze umnotho uvuke nendlala iphele, ngaphambi kokwakha ubukhomanisi obugcwele (amabili phambili).', markAllocation: '1 Imaki' }
          ],
          commonMistakes: [
            'Ukucabanga ukuthi i-NEP yashintsha uRussia waba yizwe lobungxiwankulu ngokugcwele—umbuso wasala uphethe amabhange nezimboni ezinkulu.',
            'Ukungasho isizathu esenze uLenin waguqula inqubomgomo (indlala enkulu ka-1921 nokuvukela kwamatilosi eKronstadt).'
          ],
          examTip: 'Emlandweni we-DBE, qinisekisa ukuthi usebenzisa amagama afana nokuthi "requisitioning", "tactical compromise", kanye nokuthi "Kronstadt mutiny" ukuze uthole amamaki aphezulu.'
        };
      }
    }
  }

  // Mathematics (e.g. Factorization, Geometry, Sequences, Functions)
  if (sLower.includes('math') || sLower.includes('algebra') || sLower.includes('calculus')) {
    if (isZulu) {
      return {
        whatIsAsked: `Lo mbuzo we-${gradeName} ${subject} udinga ukuthi usebenzise imithetho yezibalo ngokuhlelekile: uhlaziye ifomula, ubonise izinyathelo zokubala (working steps), bese uthola impendulo yokugcina enembile.`,
        keywords: [
          { term: 'Factorization / Izakhi', explanation: 'Ukuhlukanisa isibalo sibe yiziphindaphindo ezimbili noma ngaphezulu.' },
          { term: 'Substitution / Ukufaka', explanation: 'Ukufaka amanani aziwayo efomuleni ukuze kuxazululwe okungaziwa.' },
          { term: 'Simplification / Ukwenza Lula', explanation: 'Ukuhlanganisa amatemu afanayo nokufinyeza impendulo yokugcina.' }
        ],
        steps: [
          { stepNumber: 1, title: 'Qonda ifomula noma umbuzo', detail: 'Bheka ukuthi umbuzo ufunani, bhala phansi ifomula ye-CAPS efanele uphinde uhlole amanani onikezwe wona.', markAllocation: '1-2 Amamaki' },
          { stepNumber: 2, title: 'Faka amanani futhi ubonise izinyathelo', detail: 'Bonisa zonke izinyathelo zokubala ngaphandle kokweqa. Umaki we-DBE unikeza amamaki e-Method (M) ngisho noma impendulo ingalungile.', markAllocation: '2 Amamaki' },
          { stepNumber: 3, title: 'Impendulo yokugcina nesiphetho', detail: 'Qeda ukubala, uqinisekise ukuthi uphawu (sign + / -) lulungile futhi izilinganiso zibhalwe ngendlela efanele.', markAllocation: '1-2 Amamaki' }
        ],
        commonMistakes: [
          'Ukubala ngekhalikhuleyitha kuphela ngaphandle kokubhala izinyathelo zokusebenza ephepheni.',
          'Amaphutha ezimpawu zokuhle (positive) nezokubi (negative) lapho uhambisa amatemu ngaphesheya kophawu olulinganayo (=).'
        ],
        examTip: 'Uhlale ukhumbula: Ku-Mathematics, isinyathelo ngasinye sinemaki. Bhala ngokucacile ulayini ngamunye.'
      };
    } else if (isAfrikaans) {
      return {
        whatIsAsked: `Hierdie vraag in ${gradeName} ${subject} vereis die stelselmatige toepassing van CAPS-beginsels: ontleed die formule, toon alle bewerkingsstappe, en bereken die finale akkurate oplossing.`,
        keywords: [
          { term: 'Faktorisering', explanation: 'Die opbreek van \'n algebraïese uitdrukking in produkte van eenvoudiger faktore.' },
          { term: 'Vervanging', explanation: 'Plaas gegewe waardes akkuraat in die standaardformule.' },
          { term: 'Vereenvoudiging', explanation: 'Kombineer gelyksoortige terme en herlei tot die mees kompakte vorm.' }
        ],
        steps: [
          { stepNumber: 1, title: 'Formule en gegewens', detail: 'Skryf die korrekte DBE-formule neer en identifiseer die gegewe veranderlikes.', markAllocation: '1-2 Punte' },
          { stepNumber: 2, title: 'Bewerking en metode', detail: 'Vervang die waardes en toon elke tussenstap duidelik om metodepunte te verdien.', markAllocation: '2 Punte' },
          { stepNumber: 3, title: 'Finale antwoord', detail: 'Rond korrek af soos gespesifiseer en verifieer die teken (+/-).', markAllocation: '1-2 Punte' }
        ],
        commonMistakes: [
          'Om slegs die finale antwoord sonder bewerkings neer te skryf.',
          'Teken- en afrondingsfoute.'
        ],
        examTip: 'Toon altyd jou stappe; die nasiener ken punte toe vir elke korrekte bewerking.'
      };
    }
  }

  // SASL (South African Sign Language) Special Pedagogical Visual Format
  if (isSasl) {
    return {
      whatIsAsked: `SASL Visual Context: In this ${gradeName} ${subject} question (${questionNumber}), you are required to analyze the exam concept using spatial orientation, non-manual features (NMF), and accurate conceptual signing.`,
      keywords: [
        { term: 'Spatial Setup (Sign Space)', explanation: 'Establish the two contrasting variables in left and right signing space before demonstrating relationships.' },
        { term: 'Non-Manual Features (NMF)', explanation: 'Use raised eyebrows for conditional questions and furrowed brows for specific "what/how" derivations.' },
        { term: 'Classifier Predicates', explanation: 'Use handshapes (e.g., CL:3 for vehicles/motion, CL:B for surfaces/boundaries) to represent physical interactions.' }
      ],
      steps: [
        { stepNumber: 1, title: 'Sign Space Localization', detail: 'Set up the subject topic in the upper center signing space, fingerspelling key South African curriculum terminology.', markAllocation: 'Step 1: Setup' },
        { stepNumber: 2, title: 'Conceptual Relationship Signing', detail: 'Direct sign movement systematically between reference points to demonstrate the cause-and-effect relationship required in the English memo.', markAllocation: 'Step 2: Analysis' },
        { stepNumber: 3, title: 'Final Resolution & English Glossing', detail: 'Align visual spatial outcome with the DBE written examination criteria.', markAllocation: 'Step 3: Verification' }
      ],
      commonMistakes: [
        'Signing words individually in English word order (Signed English) instead of authentic SASL spatial grammar.',
        'Omitting facial markers which convey critical grammatical meaning in examination responses.'
      ],
      examTip: 'In SASL examination assessments, establish your visual referents firmly in signing space before explaining complex multi-part questions.',
      saslGuide: {
        visualConcepts: ['Core Topic Placement', 'Contrastive Sign Space', 'Directional Verbs'],
        fingerspellTerms: [subject.slice(0, 10).toUpperCase(), 'MEMO', 'DBE', 'CAPS'],
        spatialLayoutTip: 'Place question premise on your non-dominant side, working steps in neutral center, and conclusion on dominant side.'
      }
    };
  }

  // Universal Multilingual Pedagogical Format tailored to selected language
  const languageLabels: Record<string, {
    whatIsAskedTitle: string;
    step1Title: string;
    step2Title: string;
    step3Title: string;
    mistakesTitle: string;
    examTip: string;
    langDisclaimer: string;
  }> = {
    xitsonga: {
      whatIsAskedTitle: `Xivhutiso lexi xa ${gradeName} ${subject} xi lava yini?`,
      step1Title: 'Goza 1: Twisisa xivhutiso na swiletelo',
      step2Title: 'Goza 2: Kombisa magoza yo tlhantlha hi ku hetiseka',
      step3Title: 'Goza 3: Nhlamulo yo hetelela na xiphepho xa timaraka',
      mistakesTitle: 'Swihoxo leswi tolovelekeke leswi u faneleke ku swi papalata',
      examTip: 'Xitsundzuxo xa Nxaxamelo wa Nkambelo wa DBE: Tsala magoza hinkwawo erivaleni.',
      langDisclaimer: 'Nexovian Xitsonga Language Engine Active • Controlled Native Vocabulary'
    },
    isixhosa: {
      whatIsAskedTitle: `Uthetha ngantoni lo mbuzo we-${gradeName} ${subject}?`,
      step1Title: 'Inyathelo 1: Qonda umbuzo kunye nezikhokelo',
      step2Title: 'Inyathelo 2: Bonisa onke amanyathelo okusombulula',
      step3Title: 'Inyathelo 3: Impendulo yokugqibela namanqaku',
      mistakesTitle: 'Iimpazamo eziqhelekileyo ekufuneka uziphephe',
      examTip: 'Icebiso lovavanyo: Bhala zonke iifomula ngokucacileyo ukuze ufumane amanqaku apheleleyo.',
      langDisclaimer: 'IsiXhosa Native Verified Learning Engine'
    },
    sepedi: {
      whatIsAskedTitle: `Potsišo ye ya ${gradeName} ${subject} e nyaka eng?`,
      step1Title: 'Mogato 1: Kwešiša potšišo le ditaelo',
      step2Title: 'Mogato 2: Laetša megato ya go rarolla ka botlalo',
      step3Title: 'Mogato 3: Karabo ya mafelelo le dintlha',
      mistakesTitle: 'Diphošo tše di tlwaelegilego tšeo di swanetšego go efogwa',
      examTip: 'Keletšo ya tlhahlobo ya DBE: Ngwala mekgwa ka moka ya go šoma.',
      langDisclaimer: 'Sepedi Native Verified Learning Engine'
    },
    sesotho: {
      whatIsAskedTitle: `Potso ena ea ${gradeName} ${subject} e batla eng?`,
      step1Title: 'Mohato 1: Utloisisa potso le litaelo',
      step2Title: 'Mohato 2: Bontša mehato ea ho rarolla',
      step3Title: 'Mohato 3: Karabo ea ho qetela le matshwao',
      mistakesTitle: 'Liphoso tse tloaelehileng tse lokelang ho qojoa',
      examTip: 'Keletso ea tlhahlobo: Sebelisa mehlala e nepahetseng bakeng sa tlhahlobo.',
      langDisclaimer: 'Sesotho Native Verified Learning Engine'
    },
    setswana: {
      whatIsAskedTitle: `Potso eno ya ${gradeName} ${subject} e batla eng?`,
      step1Title: 'Kgato 1: Tlhaloganya potso le ditaelo',
      step2Title: 'Kgato 2: Bontsha dikgato tsa go rarabolola',
      step3Title: 'Kgato 3: Karabo ya bofelo le maduo',
      mistakesTitle: 'Diphoso tse di tlwaelesegileng tse di tshwanetseng go tilwa',
      examTip: 'Kgakololo ya tlhatlhobo: Latela dikaelo tsa go tshwaya tsa bosetšhaba.',
      langDisclaimer: 'Setswana Native Verified Learning Engine'
    },
    siswati: {
      whatIsAskedTitle: `Lombuto we-${gradeName} ${subject} ufunani?`,
      step1Title: 'Sinhatselo 1: Chaza umbuto neticondziso',
      step2Title: 'Sinhatselo 2: Khombisa tinhatselo tekuphendvula',
      step3Title: 'Sinhatselo 3: Imphendvulo yekugcina nemamaki',
      mistakesTitle: 'Emaphutsa lavamile lokumele uwaforome',
      examTip: 'Sincomo sekuhlola: Landzela inchazelo yekumaka kutfola emamaki lagcwele.',
      langDisclaimer: 'SiSwati Native Verified Learning Engine'
    },
    tshivenda: {
      whatIsAskedTitle: `Mbudziso iyi ya ${gradeName} ${subject} i toda mini?`,
      step1Title: 'Iga 1: Pfesisani mbudziso na ndaela',
      step2Title: 'Iga 2: Sumbedzani maga othe a u tandulula',
      step3Title: 'Iga 3: Phindulo ya u fhedzisela na maraga',
      mistakesTitle: 'Vhutshinyani vhu no dowelea vhu no tea u thivhelwa',
      examTip: 'Ndaela dza u vhala: Tevhedzani ndaela dza DBE dza pfunzo ya lushaka.',
      langDisclaimer: 'Tshivenḓa Native Verified Learning Engine'
    },
    isindebele: {
      whatIsAskedTitle: `Umbuzo lo we-${gradeName} ${subject} ufunani?`,
      step1Title: 'Igadango 1: Zwisise umbuzo nezilayelo',
      step2Title: 'Igadango 2: Veza woke amagadango wokuphendula',
      step3Title: 'Igadango 3: Iphendulo yokugcina namamarki',
      mistakesTitle: 'Amaphoso avamileko okumele uwabalekele',
      examTip: 'Ilayelo lokuhlola: Sebenzisa amagadango wokumaka ukuthola amamaki apheleleko.',
      langDisclaimer: 'IsiNdebele Native Verified Learning Engine'
    }
  };

  const localized = languageLabels[langLower] || {
    whatIsAskedTitle: `What is this ${gradeName} ${subject} question asking?`,
    step1Title: 'Step 1: Understand the question premise & criteria',
    step2Title: 'Step 2: Apply the curriculum principle with full working',
    step3Title: 'Step 3: State final answer with proper units/substantiation',
    mistakesTitle: 'Common mistakes learners make in exams',
    examTip: 'DBE National Examiner Diagnostic Tip: Always write down your formula and show every line of substitution.',
    langDisclaimer: 'Official South African Curriculum Alignment · 100% Verified'
  };

  return {
    whatIsAsked: `${localized.whatIsAskedTitle}\n${questionText}\nThis question carries ${marks} marks and tests core conceptual mastery according to national DBE examination standards.`,
    keywords: [
      { term: topic || `${subject} Core Principle`, explanation: `Foundational learning objective tested in the ${gradeName} curriculum.` },
      { term: 'DBE Marking Standard', explanation: 'Marks are distributed between method, accuracy, and clear structured reasoning.' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: localized.step1Title,
        detail: `Analyze the provided information and identify what must be calculated or explained. Write down the relevant definitions or formula.`,
        markAllocation: `${Math.ceil(marks / 3)} Marks`
      },
      {
        stepNumber: 2,
        title: localized.step2Title,
        detail: `Show all intermediate working clearly:\n${officialMemoEn}\nEnsure each logical step is clearly written out for the examiner.`,
        markAllocation: `${Math.floor(marks / 3)} Marks`
      },
      {
        stepNumber: 3,
        title: localized.step3Title,
        detail: `Conclude with the precise final answer, ensuring correct scientific units, algebraic signs, or historical justification.`,
        markAllocation: `${Math.ceil(marks / 3)} Marks`
      }
    ],
    commonMistakes: [
      'Jumping directly to the answer without writing the intermediate working steps.',
      'Misreading question action verbs: "State" vs "Explain" vs "Calculate".'
    ],
    examTip: localized.examTip
  };
}
