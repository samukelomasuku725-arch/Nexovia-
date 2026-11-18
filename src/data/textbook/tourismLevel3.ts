/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NCV TOURISM TEXTBOOK — LEVEL 3 (Chapters 4–6)
 * 100% Nexovian Original — Read Online Only on nexovian.group.
 */

import { TourismChapter } from './tourismTypes';

export const TOURISM_LEVEL3_CHAPTERS: TourismChapter[] = [
  {
    id: 'tour-l3-ch4-accommodation-transport',
    level: 3,
    chapterNumber: 4,
    chapterLabel: 'Level 3 • Chapter 4',
    title: 'Accommodation & Transport',
    subtitleByLanguage: {
      Xitsonga: 'Tinxaka ta Tindzhawu to Etlela, Ku Pima ka Tinyeleti (TGCSA), Swifambo & Transfers',
      Sepedi: 'Mehuta ya Marobalo, Kelo ya Dinaledi (TGCSA), Dinamelwa le Ditransfer',
      isiZulu: 'Izinhlobo Zezindawo Zokulala, Ukulinganiswa (TGCSA), Izithuthi & Ama-Transfers',
      Tshivenda: 'Tshakha dza Vhudzulo, Naledzi dza TGCSA, Zwiendedzi na Transfers',
      Sesotho: 'Mefuta ya Marobalo, Dinaledi tsa TGCSA, Dipalangwang & Transfers',
      Setswana: 'Mefuta ya Marobalo, Dinaledi tsa TGCSA, Dipalangwa & Transfers',
      Siswati: 'Tinhlobo Tetindzawo Tekulala, Tinkhanyeti (TGCSA), Titfutsi ne-Transfers',
      isiNdebele: 'Iinhlobo Zeendawo Zokulala, Iinkwekwezi (TGCSA), Iinthuthi nama-Transfers',
      isiXhosa: 'Iindidi Zokuhlala, Umyinge weeNkwenkwezi (TGCSA), Izithuthi & Transfers',
      Afrikaans: 'Tipes Verblyf, TGCSA-gradering, Vervoermiddels en Pendeldienste (Transfers)',
      English: 'Types of accommodation, TGCSA star grading, transport modes & transfers'
    },
    explanationParagraphs: [
      'South African accommodation ranges from full-service hotels (24-hour reception, restaurants, conference rooms) and luxury game lodges (e.g., Sabi Sands — game drives + meals included) to intimate Bed & Breakfasts (B&Bs), guesthouses, self-catering chalets (SANParks rest camps), backpacker hostels, and homestays.',
      'The Tourism Grading Council of South Africa (TGCSA) uses a 1-Star to 5-Star system: 1-Star (clean, basic comfort), 2-Star (good quality essentials), 3-Star (very good comfort & facilities), 4-Star (superior luxury & service), and 5-Star (world-class luxury, fine dining, concierge). Grading protects tourists so they get exact quality for what they pay.',
      'Four major Transport Modes serve tourists: (1) Air transport (fastest for long haul — OR Tambo, Cape Town International, King Shaka International; scheduled airlines vs charter flights), (2) Road transport (rental cars, luxury touring coaches, Uber/metered taxis, Gautrain buses, Baz Bus for backpackers), (3) Rail transport (Gautrain rapid rail, Shosholoza Meyl, luxury Blue Train & Rovos Rail), and (4) Water transport (Robben Island ferry, Durban cruise ships, Knysna lagoon ferries).',
      'Transfers connect tourists smoothly between arrival points (airports, harbours, train stations) and their hotels or lodges. Types include private shuttle transfers, shared shuttle transfers (shuttle bus stopping at multiple hotels), and complimentary hotel courtesy buses. Meet-and-greet staff hold a clear welcome signboard with the guest’s name at the arrivals hall.'
    ],
    summaryByLanguage: {
      Xitsonga: 'Tindzhawu to etlela ti katsa tihotele, ti-B&B, ti-lodge ta swiharhi, na ti-self-catering. TGCSA yi pima khwalithi ku sukela eka 1-Star ku ya eka 5-Star. Swifambo swi katsa swihahampfhuka, mapatu, xitimela (Blue Train/Gautrain) na swikepe; transfers ti rhwala vaendzi ku suka eka airport ku ya ehotela.',
      Sepedi: 'Marobalo a akaretša dihotela, di-B&B, di-lodge tša diphoofolo le self-catering. TGCSA e lekanyetša boleng ka dinaledi tše 1 go ya go 5. Dinamelwa di akaretša difofane, ditsela, diterene le dikepe; transfers di tšea baeti boemafofaneng go ya hoteleng.',
      isiZulu: 'Izindawo zokulala zihlanganisa amahhotela, ama-B&B, ama-game lodge ne-self-catering. I-TGCSA ikala ngeenkanyezi ezi-1 kuya kwezi-5. Izithuthi zihlanganisa izindiza, umgwaqo, izitimela (Gautrain/Blue Train) nemikhumbi; ama-transfers ahambisa izivakashi esikhumulweni sezindiza ziya ehhotela.',
      Tshivenda: 'Vhudzulo vhu katela dzihodela, B&B, game lodge na self-catering. TGCSA i kala naledzi 1 u swika 5. Zwiendedzi ndi zwihahampfhuka, dzibada, zwidimela na zwikepe.',
      Sesotho: 'Marobalo a akaretsa dihotele, di-B&B, di-lodge le self-catering. TGCSA e lekanya dinaledi tse 1 ho ya ho 5. Dipalangwang ke difofane, mebila, diterene le dikepe.',
      Setswana: 'Marobalo a akaretsa dihotela, di-B&B, di-lodge le self-catering. TGCSA e lekanya dinaledi di le 1 go ya go 5. Dipalangwa ke difofane, ditsela, diterene le dikepe.',
      Siswati: 'Tindzawo tekulala tifaka emahhotela, ema-B&B, ema-lodge ne-self-catering. I-TGCSA ikala ngetinkhanyeti ta-1 kuya ku-5.',
      isiNdebele: 'Iindawo zokulala zifaka amahhotela, ama-B&B, ama-lodge ne-self-catering. I-TGCSA ilinganisa ngeenkwekwezi ezi-1 ukuya kezi-5.',
      isiXhosa: 'Iindawo zokulala ziquka iihotele, i-B&B, i-game lodge ne-self-catering. I-TGCSA ilinganisa ngeenkwekwezi ezi-1 ukuya kwezi-5.',
      Afrikaans: 'Verblyf sluit hotelle, B&B’s, wildlodges en selfsorg in, gegradeer van 1 tot 5 sterre deur TGCSA. Vervoer sluit lug-, pad-, spoor- (Gautrain, Blue Train) en watervervoer plus lughawe-pendeldienste (transfers) in.',
      English: 'SA offers hotels, B&Bs, lodges, self-catering chalets, and backpackers—quality-assured by TGCSA 1-to-5-Star grading. Air, road, rail, and water transport move tourists safely, linked by private, shared, or courtesy airport transfers.'
    },
    keyTerms: [
      {
        termEn: 'TGCSA Star Grading',
        translations: {
          Xitsonga: 'Ku Pima ka Tinyeleti ka TGCSA (1–5)',
          Sepedi: 'Kelo ya Dinaledi ya TGCSA (1–5)',
          isiZulu: 'Ukulinganiswa Kweenkanyezi kwe-TGCSA',
          Tshivenda: 'Naledzi dza TGCSA (1–5)',
          Sesotho: 'Dinaledi tsa TGCSA (1–5)',
          Setswana: 'Dinaledi tsa TGCSA (1–5)',
          Siswati: 'Tinkhanyeti te-TGCSA (1–5)',
          isiNdebele: 'Iinkwekwezi ze-TGCSA (1–5)',
          isiXhosa: 'Umyinge weeNkwenkwezi we-TGCSA',
          Afrikaans: 'TGCSA-Stergradering',
          English: 'Official SA 1-to-5-Star accommodation quality system'
        },
        meaningByLanguage: {
          Xitsonga: 'Xikalo xa ximfumo xa Afrika-Dzonga xo komba khwalithi ya tindzhawu to etlela ku suka eka 1 ku ya eka 5.',
          Sepedi: 'Mokgwa wa semmušo wa Afrika Borwa wa go bontšha boleng bja marobalo go tloga go naledi e 1 go ya go 5.',
          isiZulu: 'Uhlelo olusemthethweni e-SA lokukala izinga lendawo yokulala kusuka kwinkanyezi e-1 kuye kwezi-5.',
          Tshivenda: 'Ndila ya tshiofisi ya u kala khwalithi ya vhudzulo kha SA.',
          Sesotho: 'Mokgwa wa semmuso wa ho lekanya boleng ba marobalo ho tloha ho 1 ho isa ho 5.',
          Setswana: 'Thulaganyo ya semmuso ya go lekanya boleng jwa marobalo.',
          Siswati: 'Luhlelo lolusemtsetfweni lwekukala lizinga letindzawo tekulala.',
          isiNdebele: 'Ikambiso esemthethweni yokulinganisa izinga leendawo zokulala.',
          isiXhosa: 'Inkqubo esemthethweni e-SA yokubonisa umgangatho wendawo yokuhlala ukusuka ku-1 ukuya ku-5.',
          Afrikaans: 'Die Toerismegraderingsraad van Suid-Afrika se amptelike 1-tot-5-ster kwaliteitsmaatstaf vir verblyf.',
          English: 'Tourism Grading Council of South Africa system grading lodges, hotels, and guesthouses from 1 Star (basic) to 5 Stars (luxury).'
        }
      },
      {
        termEn: 'Airport Transfer',
        translations: {
          Xitsonga: 'Xifambo xa Airport (Transfer)',
          Sepedi: 'Namelo ya Boemafofaneng',
          isiZulu: 'Ukuthuthwa Esikhumulweni Sezindiza',
          Tshivenda: 'Transfer ya Airport',
          Sesotho: 'Sepalangwang sa Boemafofaneng',
          Setswana: 'Sepalangwa sa Boemafofaneng',
          Siswati: 'Kutfutfwa Enyangweni Yetindiza',
          isiNdebele: 'Ukuthuthwa Esikhumulweni Seendiza',
          isiXhosa: 'Uthutho lwaseSikhululweni seeNqwelo-moya',
          Afrikaans: 'Lughawe-pendeldiens (Transfer)',
          English: 'Pre-booked transport between airport and accommodation'
        },
        meaningByLanguage: {
          Xitsonga: 'Xifambo lexi hleriweke ka ha ri emahlweni ku rhwala mupfhumba ku suka eka airport ku ya ehotela.',
          Sepedi: 'Namelo ye e rulagantšwego go tšea moeti boemafofaneng go mo iša hoteleng.',
          isiZulu: 'Imoto noma ibhasi elihlelwe kusengaphambili lokuthutha isivakashi kusuka esikhumulweni sezindiza ukuya ehhotela.',
          Tshivenda: 'Tshiendedzi tsho lugiswaho u thutha muendi u bva airport u ya hodela.',
          Sesotho: 'Sepalangwang se lokisitsweng ho nka moeti boemafofaneng ho ya hoteleng.',
          Setswana: 'Sepalangwa se se rulagantsweng go isa moeti kwa hoteleng go tswa kwa boemafofaneng.',
          Siswati: 'Imoto lehleliwe yekutsatsa sivakashi e-airport kuyisa ehhotela.',
          isiNdebele: 'Ikambiso ethutha umvakashi esikhumulweni seendiza ukuya ehotela.',
          isiXhosa: 'Isithuthi esibhukishiweyo sokusa undwendwe kwihotele ukusuka kwisikhululo seenqwelo-moya.',
          Afrikaans: 'Voorafbespreekte vervoer tussen die lughawe (of hawe/stasie) en die gas se hotel of lodge.',
          English: 'Pre-arranged road transport (private car, shared shuttle, or courtesy bus) connecting an arrival hub directly to a hotel.'
        }
      },
      {
        termEn: 'Self-Catering vs Full-Board',
        translations: {
          Xitsonga: 'Ku Tiswekela vs Swakudya Hinkwaswo',
          Sepedi: 'Go Itapeela vs Dijo Ka Moka',
          isiZulu: 'Ukuziphekela vs Ukudla Konke Kubaliwe',
          Tshivenda: 'U Dibikela vs Zwiḽiwa Zwoṱhe',
          Sesotho: 'Ho Ikapehela vs Dijo Tsohle',
          Setswana: 'Go Ikapeela vs Dijo Tsotlhe',
          Siswati: 'Kutipekela vs Kudla Konkhe',
          isiNdebele: 'Ukuziphekela vs Ukudla Koke',
          isiXhosa: 'Ukuziphekela vs Ukutya Konke',
          Afrikaans: 'Selfsorg vs Volpension',
          English: 'Guest cooks own meals vs all 3 daily meals included'
        },
        meaningByLanguage: {
          Xitsonga: 'Self-catering mupfhumba u na khikhini u tiswekela; Full-board swakudya swa mixo, nhlikanhi na madyambu swi hakeriwe.',
          Sepedi: 'Self-catering moeti o a itapeela; Full-board dijo tša mesong, mosegare le mantšiboa di akareditšwe.',
          isiZulu: 'Ku-self-catering isivakashi siyaziphekela ekhishini; ku-full-board ukudla kwasekuseni, kwasemini nokwakusihlwa kufakiwe.',
          Tshivenda: 'Self-catering muendi u a dibikela; Full-board zwiḽiwa zwoṱhe zwi khou vhalwa.',
          Sesotho: 'Self-catering moeti o ikapehela; Full-board dijo tsa hoseng, motshehare le mantsiboya di kenyeleditswe.',
          Setswana: 'Self-catering moeti o a ikapeela; Full-board dijo tsotlhe tse tharo di mo tuelo.',
          Siswati: 'Self-catering sivakashi siyatipekela; Full-board kudla kwakusasa, kwasemini nekwakusihlwa kufakiwe.',
          isiNdebele: 'Self-catering umvakashi uyaziphekela; Full-board ukudla koke kufakiwe.',
          isiXhosa: 'Kwi-self-catering umhenkethi uyaziphekela; kwi-full-board isidlo sakusasa, sasemini nesangokuhlwa zibandakanyiwe.',
          Afrikaans: 'By selfsorg berei gaste hul eie kos in n toegeruste kombuis; volpension (Full-Board) sluit ontbyt, middagete en aandete in.',
          English: 'Self-catering provides a kitchen for guests to cook; Full-Board includes breakfast, lunch, and dinner in the nightly rate.'
        }
      }
    ],
    workedExample: {
      title: 'Real South African Example: Selecting Accommodation & Transport for International Backpackers vs Luxury Couple',
      scenario:
        'A travel agent at Cape Town Tourism assists two different clients arriving at Cape Town International Airport (CPT): (1) Two student backpackers on a tight budget travelling along the Garden Route to Gqeberha, and (2) A retired couple wanting 5-Star Big Five luxury near Kruger National Park from CPT. Choose the best accommodation type, grading, transport mode, and transfer for each.',
      steps: [
        'Step 1 (Student Backpackers — Accommodation & Grading): Choose a 2-Star or ungraded Backpacker Hostel (dorm room or private budget room with shared kitchen / self-catering) to keep costs low and meet young travellers.',
        'Step 2 (Student Backpackers — Transport & Transfer): Use a shared airport shuttle from CPT into Cape Town CBD, then book the hop-on hop-off Baz Bus coach (Road transport) along the Garden Route directly from hostel door to hostel door.',
        'Step 3 (Retired Couple — Transport CPT to Kruger): Fly scheduled Air transport from Cape Town International (CPT) to Kruger Mpumalanga International Airport (KMIA / MQP) or Skukuza Airport—saving 2 days of driving.',
        'Step 4 (Retired Couple — Accommodation, Grading & Transfer): Pre-book a private 4x4 safari transfer from the airport into a TGCSA 5-Star Luxury Game Lodge in Sabi Sands (Full-Board + twice-daily game drives included).'
      ],
      finalAnswer:
        'Budget backpackers -> Backpacker Hostel + Shared Shuttle + Baz Bus (Road). Luxury couple -> Scheduled Flight (CPT to KMIA) + Private 4x4 Transfer + 5-Star Full-Board Game Lodge.'
    },
    practiceQuestions: [
      {
        number: 1,
        question:
          'Explain why TGCSA Star Grading (1 to 5 Stars) helps both tourists and accommodation owners in South Africa.',
        answer:
          'Tourists get trustworthy quality assurance and know what facilities/service to expect before paying; accommodation owners gain credibility, stronger marketing with the official SA Star insignia, and higher bookings.'
      },
      {
        number: 2,
        question:
          'Compare two rail transport options in South Africa—one built for fast urban/airport commuting and one built for luxury scenic touring.',
        answer:
          '1) Gautrain: High-speed electric commuter rail linking OR Tambo International Airport, Sandton, Johannesburg, and Pretoria in ~15–35 minutes. 2) The Blue Train / Rovos Rail: Five-star luxury hotel-on-wheels trains between Pretoria and Cape Town offering fine dining and off-train excursions.'
      }
    ],
    quickQuiz: [
      {
        number: 1,
        question: 'Which South African body officially grades hotels, lodges, and B&Bs from 1 to 5 Stars?',
        options: ['SANParks', 'TGCSA (Tourism Grading Council of South Africa)', 'ACSA', 'SAPS'],
        correctIndex: 1,
        explanation: 'The Tourism Grading Council of South Africa (TGCSA) awards official 1-to-5-Star ratings.'
      },
      {
        number: 2,
        question: 'A self-catering chalet at Kruger National Park means the tourist receives:',
        options: [
          'Free helicopter transfers every day',
          'Equipped kitchen facilities to prepare their own meals',
          'Five-star room service and a personal butler',
          'Three restaurant meals included in the room price'
        ],
        correctIndex: 1,
        explanation: 'Self-catering accommodation includes cooking equipment and a fridge so guests prepare their own meals.'
      },
      {
        number: 3,
        question: 'Which rapid rail service connects OR Tambo International Airport directly with Sandton and Pretoria?',
        options: ['Shosholoza Meyl', 'Gautrain', 'Baz Bus', 'Blue Train'],
        correctIndex: 1,
        explanation: 'The Gautrain links OR Tambo International Airport, Sandton, Rosebank, Johannesburg, and Pretoria.'
      },
      {
        number: 4,
        question: 'What is a "meet-and-greet airport transfer"?',
        options: [
          'Guests walking 5 km to find a bus stop',
          'A driver waiting at arrivals with a name board to take guests directly to their accommodation',
          'An airline pilot announcing the weather',
          'A hotel receptionist cleaning rooms'
        ],
        correctIndex: 1,
        explanation: 'Meet-and-greet transfers ensure arriving guests are welcomed personally and driven safely to their hotel.'
      },
      {
        number: 5,
        question: 'Which star rating indicates world-class luxury, fine dining, and exceptional personalised service?',
        options: ['1-Star', '2-Star', '3-Star', '5-Star'],
        correctIndex: 3,
        explanation: '5-Star represents the highest TGCSA tier of international luxury and service.'
      }
    ]
  },
  {
    id: 'tour-l3-ch5-tour-planning-guiding',
    level: 3,
    chapterNumber: 5,
    chapterLabel: 'Level 3 • Chapter 5',
    title: 'Tour Planning & Tour Guiding',
    subtitleByLanguage: {
      Xitsonga: 'Ku Kunguhata Maendzo (Itineraries), Vutshila bya Tour Guide & Matirhelo ya Tour',
      Sepedi: 'Peakanyo ya Maeto (Itineraries), Bokgoni bja Mohlahli wa Baeti le Tshepedišo',
      isiZulu: 'Ukuhlela Uhambo (Itineraries), Ubuciko Bomhlahlandlela nokuphathwa Kohambo',
      Tshivenda: 'U Pulana Maendo (Itineraries), Vhutsila ha Mulaedzi wa Vhaendi',
      Sesotho: 'Moralo wa Maeto (Itineraries), Bokgoni ba Mohlahli le Tsamaiso ya Maeto',
      Setswana: 'Thulaganyo ya Maeto (Itineraries), Bokgoni jwa Mokaedi wa Bajanala',
      Siswati: 'Kuhlela Luhambo (Itineraries), Emakhono eMcondzisi neKusebenta Kweluhambo',
      isiNdebele: 'Ukuhlela Ikhambo (Itineraries), Amakghono Womhlahlandlela',
      isiXhosa: 'Ukucwangcisa Uhambo (Itineraries), Ubuchule boMkhokeli noLawulo loHambo',
      Afrikaans: 'Toerbeplanning (Reisplanne), Toergidstegnieke en Toeroperasies',
      English: 'Itineraries, guiding techniques & tour operations'
    },
    explanationParagraphs: [
      'A Tour Itinerary is the day-by-day schedule of a trip showing dates, times, transport, meals, attractions, and overnight accommodation. Good itineraries follow a logical geographical route (no wasteful back-tracking), match the client’s budget/fitness level, include realistic driving times plus rest/comfort stops, and state clearly what is included vs excluded.',
      'Types of itineraries include Scheduled / Group packaged tours (fixed departure dates and prices), Tailor-made / FIT itineraries (custom-built for an Independent Traveller), and General vs Detailed Operational itineraries (which also list emergency contacts, supplier reference numbers, and gate opening times).',
      'Tour Guiding is both a profession and a legal requirement in South Africa: under the Tourism Act 3 of 2014, all tourist guides must be trained (accredited CATHSSETA qualification), hold First Aid, and be registered with the Provincial Registrar to receive an official Tourist Guide Badge. Categories are Site Guide (e.g., Robben Island), Regional/Provincial Guide (e.g., Western Cape), and National Guide (all 9 provinces). Specialisations include Nature, Culture, and Adventure guiding.',
      'Core Guiding Techniques: Gather the group safely away from traffic before speaking; stand with the sun in your own eyes (not the guests’ eyes); speak clearly using storytelling, humour, and verified facts; manage time strictly so gates/ferries are not missed; watch group energy/hydration; and handle emergencies calmly with an emergency kit and contact list.'
    ],
    summaryByLanguage: {
      Xitsonga: 'Itinerary i xedulu xa siku na siku xa riendzo lexi kombaka swifambo, swakudya, tindzhawu na vusiku. EAfrika-Dzonga, ma-tour guide ma fanele ku tsarisiwa ximfumo na ku rhwala badge. Guide leyinene yi tirhisa marungula yo tsakisa, ku hlayisa nkarhi, na vuhlayiseki bya ntlawa.',
      Sepedi: 'Itinerary ke lenaneo la letšatši ka letšatši la leeto leo le laetšago dinamelwa, dijo, mafelo le marobalo. Ka Afrika Borwa, bahlahli ba baeti ba swanetše go ngwadišwa semmušo le go ba le badge. Mohlahli yo mobotse o boloka nako le polokego ya sehlopha.',
      isiZulu: 'I-Itinerary uhlelo lwansuku zonke lohambo olukhombisa izithuthi, ukudla, izindawo nezindawo zokulala. E-SA, ama-tour guide kumele abhaliswe ngokusemthethweni abe ne-badge. Umhlahlandlela omuhle uphatha isikhathi, azise izivakashi ngokucacile futhi aqinisekise ukuphepha.',
      Tshivenda: 'Itinerary ndi thandela ya duvha na duvha ya lwendo. Vhadededzi vha vhaendi kha SA vha tea u nwaliswa nga mulayo nahone vha vhe na badge.',
      Sesotho: 'Itinerary ke lenaneo la letsatsi le letsatsi la leeto. Afrika Borwa batsamaisi ba baeti ba tlameha ho ngodiswa mme ba be le badge ya semmuso.',
      Setswana: 'Itinerary ke thulaganyo ya letsatsi le letsatsi ya loeto. Bakaedi ba bajanala kwa Aforika Borwa ba tshwanetse go kwadisiwa semmuso.',
      Siswati: 'I-Itinerary luhlelo lwelilanga nelilanga lweluhambo. Bacondzisi betivakashi e-SA kufanele babhaliswe babe ne-badge.',
      isiNdebele: 'I-Itinerary lihlelo lelanga nelanga lekhambo. Abahlahlandlela beemvakatjhi e-SA kufanele batloliswe babe ne-badge.',
      isiXhosa: 'I-Itinerary yinkqubo yemihla ngemihla yohambo. Abakhokeli babhenkethi e-SA kufuneka babhaliswe ngokusesikweni babe ne-badge.',
      Afrikaans: 'n Reisplan (itinerary) skeduleer daagliks roetes, tye, verblyf, maaltye en besienswaardighede sonder onnodige terugry. Suid-Afrikaanse toergidse moet wetlik geregistreer wees met n amptelike gids-kenteken (badge).',
      English: 'Logical tour itineraries map routes, travel times, meals, and accommodation without wasteful backtracking. Registered SA tour guides carry an official badge and lead groups safely using clear commentary, storytelling, time control, and emergency readiness.'
    },
    keyTerms: [
      {
        termEn: 'Logical Tour Itinerary',
        translations: {
          Xitsonga: 'Xedulu xa Riendzo xo Twala',
          Sepedi: 'Lenaneo la Leeto le Kwagalago',
          isiZulu: 'Uhlelo Lohambo Oluhlelekile',
          Tshivenda: 'Thandela ya Lwendo yo Pfalaho',
          Sesotho: 'Lenaneo la Leeto le Hlakileng',
          Setswana: 'Thulaganyo ya Loeto e e Lolameng',
          Siswati: 'Luhlelo Lweluhambo Loluhlelekile',
          isiNdebele: 'Ihlelo Lekhambo Elihlelekileko',
          isiXhosa: 'Inkqubo yoHambo eCwangcisiweyo',
          Afrikaans: 'Logiese Reisplan',
          English: 'Day-by-day route plan avoiding backtracking'
        },
        meaningByLanguage: {
          Xitsonga: 'Ndzandzelelano wa riendzo wa siku na siku lowu fambaka hi ndlela yo olova ku nga tlheli u vuya endzhaku.',
          Sepedi: 'Lenaneo la matšatši ao a latelanago ka tsela ye e sa bušetšego baeti morago.',
          isiZulu: 'Uhlelo lwezinsuku ezilandelanayo oluhamba ngomzila oqondile ngaphandle kokuphindela emuva.',
          Tshivenda: 'Maitele a maduvha a lwendo a sa vhuyeleli murahu.',
          Sesotho: 'Lenaneo la matsatsi le latelang tsela e otlolohileng.',
          Setswana: 'Thulaganyo ya malatsi e e latelang tsela e e siameng.',
          Siswati: 'Luhlelo lweluhambo loluhamba ngemzila lolungekho budzakeni.',
          isiNdebele: 'Ihlelo elilandela indlela ehlelekileko.',
          isiXhosa: 'Uludwe lweemini zohambo oluhamba ngomzila ocacileyo.',
          Afrikaans: 'n Dag-vir-dag reisskedule wat aantreklikhede in geografiese volgorde verbind sonder onnodige omswerwinge.',
          English: 'A chronological day-by-day schedule linking attractions in geographical order with realistic times, meals, and overnight stops.'
        }
      },
      {
        termEn: 'Registered Tourist Guide Badge',
        translations: {
          Xitsonga: 'Baji ya Mufambisi wa Vapfhumba',
          Sepedi: 'Petšhe ya Mohlahli wa Baeti',
          isiZulu: 'Ibheji Lomhlahlandlela Obhalisiwe',
          Tshivenda: 'Badzhi ya Mulaedzi wa Vhaendi',
          Sesotho: 'Betjhe ya Mohlahli ya Ngodisitsweng',
          Setswana: 'Betšhe ya Mokaedi yo o Kwadisitsweng',
          Siswati: 'Libheji Lemcondzisi Lobhalisiwe',
          isiNdebele: 'Ibheji Lomhlahlandlela Otlolisiweko',
          isiXhosa: 'Ibheji yoMkhokeli oBhalisiweyo',
          Afrikaans: 'Geregistreerde Toergidskenteken',
          English: 'Legal SA guide ID card showing province & speciality'
        },
        meaningByLanguage: {
          Xitsonga: 'Xikombiso xa ximfumo xa Nawu wa Vupfhumba 3 wa 2014 xo pfumelela tour guide ku tirha eSA.',
          Sepedi: 'Bopaki bja semmušo bja gore mohlahli o ngwadišitšwe tlase ga Molao wa Boeti.',
          isiZulu: 'Ikhadi elisemthethweni elikhombisa ukuthi umhlahlandlela uqeqeshiwe futhi ubhalisiwe ngokoMthetho Wezokuvakasha.',
          Tshivenda: 'Karata ya mulayo ine ya tendela mulaedzi wa vhaendi u shuma SA.',
          Sesotho: 'Karete ya semmuso e dumellang mohlahli ho sebeletsa bahahlauli.',
          Setswana: 'Karata ya semmuso e e letlang mokaedi go dira kwa Aforika Borwa.',
          Siswati: 'Likhadi lelisemtsetfweni lelivumela umcondzisi kutsi asebente.',
          isiNdebele: 'Ikarada esemthethweni evumela umhlahlandlela ukusebenza.',
          isiXhosa: 'Ikhadi elisesikweni elibonisa ukuba umkhokeli ubhalisiwe phantsi koMthetho woKhenketho.',
          Afrikaans: 'Amptelike identifikasiekaart onder die Toerismewet 3 van 2014 wat bewys n gids is opgelei en geregistreer.',
          English: 'Official photo ID issued by the Provincial Registrar under the Tourism Act 3 of 2014 proving valid training, First Aid & legal registration.'
        }
      },
      {
        termEn: 'Commentary & Positioning',
        translations: {
          Xitsonga: 'Marungula & Ndzhawu yo Yima',
          Sepedi: 'Tlhalošo le Boemo bja go Ema',
          isiZulu: 'Ukuchaza Nolungiselelo Lokuma',
          Tshivenda: 'U Talutshedza na Vhuimo ha u Ima',
          Sesotho: 'Tlhaloso le Boemo ba ho Ema',
          Setswana: 'Tlhaloso le Maemo a go Ema',
          Siswati: 'Kuchaza neKuma Kahle',
          isiNdebele: 'Ihlathululo nokuJamiswa Kuhle',
          isiXhosa: 'Inkcazelo noKuma Ngokufanelekileyo',
          Afrikaans: 'Kommentaar en Groepposisionering',
          English: 'Engaging factual talk delivered in safe shaded stance'
        },
        meaningByLanguage: {
          Xitsonga: 'Ku veka ntlawa ekule na movha, dyambu ri nga vi emahlweni ka vaendzi, u vulavula hi ndlela leyi tsakisaka.',
          Sepedi: 'Go emiša sehlopha kgole le mebila, go bolela ka mokgwa wo o kwagalago.',
          isiZulu: 'Ukumisa iqembu endaweni ephephile, ilanga lingabaphuphuthekisi, ukhulume ngezindaba ezithakazelisayo.',
          Tshivenda: 'U imisa tshigwada fhethu ho tsireledzeaho nahone duvha li sa khakhisi vhaeni.',
          Sesotho: 'Ho emisa sehlopha sebakeng se bolokehileng mme o bue ka tsela e thabisang.',
          Setswana: 'Go emisa setlhopha kwa go babalesegileng le go bua ka tlhaloganyo.',
          Siswati: 'Kumisa licembu endzaweni lephephile bese uchaza ngetindzaba letimnandzi.',
          isiNdebele: 'Ukujamisa isiqhema endaweni ephephileko ukhulume ngokucacileko.',
          isiXhosa: 'Ukumisa iqela endaweni ekhuselekileyo, unike inkcazelo ephucukileyo nevakalayo.',
          Afrikaans: 'Om n groep veilig weg van verkeer en uit die son te plaas terwyl boeiende, akkurate inligting oorgedra word.',
          English: 'Delivering accurate, lively stories while positioning the group away from traffic and facing away from blinding sunlight.'
        }
      }
    ],
    workedExample: {
      title: 'Real South African Example: Sequencing a 1-Day Cape Peninsula Tour Itinerary',
      scenario:
        'A Culture & Nature Tour Guide must lead 12 tourists from a Cape Town Waterfront hotel on a 1-day Peninsula circular tour visiting: Cape Point, Boulders Beach (penguins), Kirstenbosch Botanical Gardens, and Chapman’s Peak Drive. Sequence the stops logically from 08:30 to 17:00 and state two guiding safety/comfort checks.',
      steps: [
        'Step 1 (Check Geography — Circular Route): Waterfront (City Bowl) -> Atlantic Seaboard & Chapman’s Peak Drive (southbound) -> Cape Point -> Boulders Beach (Simon’s Town) -> Kirstenbosch (Southern Suburbs) -> back to Waterfront. Zero back-tracking!',
        'Step 2 (Assign Realistic Times): 08:30 Depart Waterfront hotel via Camps Bay & Hout Bay; 09:15 Scenic stop on Chapman’s Peak Drive; 10:15–12:15 Cape Point & Cape of Good Hope; 12:45–14:30 Lunch in Simon’s Town + Boulders Beach penguins; 15:15–16:30 Kirstenbosch Boomslang canopy walk; 17:00 Return to Waterfront.',
        'Step 3 (Guiding Safety Check 1): Ensure all 12 passengers sit inside the coach safely and count heads ("headcount") before leaving every single stop.',
        'Step 4 (Guiding Comfort & Accuracy Check 2): Advise guests the day before to wear windbreakers and walking shoes (Cape Point is windy), keep baboons safe by telling guests NEVER to carry open food outside, and give commentary with the group positioned off the main road.'
      ],
      finalAnswer:
        'Waterfront -> Chapman’s Peak -> Cape Point -> Boulders Beach (lunch) -> Kirstenbosch -> Waterfront (08:30–17:00), paired with strict headcounts and baboon/road safety briefings.'
    },
    practiceQuestions: [
      {
        number: 1,
        question:
          'What is the difference between a Site Tourist Guide and a Provincial/Regional Tourist Guide in South Africa?',
        answer:
          'A Site Guide is legally permitted to guide only at one specific demarcated attraction (e.g., Robben Island Museum or Sterkfontein Caves), whereas a Provincial/Regional Guide can lead tours throughout an entire province or region (e.g., Western Cape).'
      },
      {
        number: 2,
        question:
          'State three essential details that must appear clearly on a tour itinerary given to a tourist.',
        answer:
          '1) Day-by-day dates and departure/arrival times; 2) Transport, accommodation, and meal basis (e.g., Bed & Breakfast vs Full-Board); 3) Inclusions and exclusions (e.g., park conservation fees or optional tips) plus emergency contact numbers.'
      }
    ],
    quickQuiz: [
      {
        number: 1,
        question: 'Why must a tour itinerary avoid "back-tracking"?',
        options: [
          'It makes tourists pay double for hotel breakfast',
          'It wastes fuel, driver hours, and guest sightseeing time driving over the same road twice',
          'It is illegal under SANParks laws',
          'Tour coaches cannot turn around'
        ],
        correctIndex: 1,
        explanation: 'Logical circular routes save fuel, time, and money while giving tourists more time at attractions.'
      },
      {
        number: 2,
        question: 'When addressing a tour group outside on a sunny day, where should the guide stand?',
        options: [
          'In the middle of a busy road',
          'With the sun shining into the guide’s own eyes so guests do not squint into the sun',
          'Behind a locked gate',
          'Whispering quietly so only two people hear'
        ],
        correctIndex: 1,
        explanation: 'Put the sun in your own eyes so your tourists face comfortably away from the glare while seeing the attraction behind you.'
      },
      {
        number: 3,
        question: 'Which document is legally required to work as a paid tourist guide anywhere in South Africa?',
        options: [
          'An unverified social media page',
          'Official Provincial Tourist Guide Registration Card / Badge (under the Tourism Act 3 of 2014)',
          'A supermarket loyalty card',
          'Only a foreign passport'
        ],
        correctIndex: 1,
        explanation: 'Under the Tourism Act 3 of 2014, guiding without official provincial registration and a badge is an offence.'
      },
      {
        number: 4,
        question: 'What does an "FIT itinerary" stand for in tour operations?',
        options: [
          'Fast International Taxi',
          'Free Independent Traveller (custom-built private itinerary)',
          'Flight In Transit',
          'Five-star Inclusive Tour'
        ],
        correctIndex: 1,
        explanation: 'FIT stands for Free Independent Traveller—a bespoke itinerary designed for individual guests or small private groups.'
      },
      {
        number: 5,
        question: 'What should a tour guide ALWAYS do immediately before the tour coach pulls away from each attraction?',
        options: [
          'Turn off the air conditioner',
          'Complete a headcount of all passengers',
          'Collect guests’ passports permanently',
          'Skip the next planned stop'
        ],
        correctIndex: 1,
        explanation: 'Always perform an exact headcount before departing every stop so no tourist is ever left behind.'
      }
    ]
  },
  {
    id: 'tour-l3-ch6-sustainable-responsible',
    level: 3,
    chapterNumber: 6,
    chapterLabel: 'Level 3 • Chapter 6',
    title: 'Sustainable & Responsible Tourism',
    subtitleByLanguage: {
      Xitsonga: 'Vupfhumba lebyi Yaka Emahlweni, Ecotourism, Ndzhaka & Vutihlamuleri eSA',
      Sepedi: 'Boeti bja go Swarelela, Tlhago (Ecotourism), Bohwa le Boikarabelo',
      isiZulu: 'Ukuvakasha Okusimeme, Imvelo (Ecotourism), Amagugu kanye Nokuziphendulela',
      Tshivenda: 'Vhuendelamashango ha Tshifhinga Tshothe, Mupo na Vhufa',
      Sesotho: 'Bohahlauli bo Tsitsitseng, Tlhaho, Lefa le Boikarabello',
      Setswana: 'Bojanala jo bo Tswelelang, Tlhago, Boswa le Boikarabelo',
      Siswati: 'Tekuvakasha Letisimeme, Imvelo, Emagugu neKutibophezela',
      isiNdebele: 'Ukuvakasha Okusimamako, Imvelo, Amagugu nokuziphendulela',
      isiXhosa: 'Ukhenketho Oluzinzileyo, Indalo (Ecotourism), Ilifa noxanduva',
      Afrikaans: 'Volhoubare en Verantwoordelike Toerisme, Ekotoerisme en Erfenis',
      English: 'Ecotourism, heritage, culture & responsible tourism'
    },
    explanationParagraphs: [
      'Sustainable Tourism means meeting today’s tourist and host-community needs without destroying the environment, culture, or resources that future generations need. It balances the Three Pillars (Triple Bottom Line): (1) Environmental protection (water, energy, wildlife, zero litter), (2) Social & Cultural respect (protecting local heritage and dignity), and (3) Economic fairness (paying fair wages and buying local SA crafts and food).',
      'Responsible Tourism (championed by South Africa’s Responsible Tourism Guidelines and Fair Trade Tourism) focuses on practical daily choices that create "better places for people to live in and better places for people to visit"—for example, hiring local community guides, using solar/greywater at lodges, and banning unethical wildlife interaction like canned lion hunting or cub petting.',
      'Ecotourism is responsible travel to natural areas that actively conserves nature and improves local residents’ wellbeing (e.g., community-owned concessions inside Kruger/Makuleke region or iSimangaliso Wetland Park).',
      'Heritage & Cultural Tourism celebrates both Tangible Heritage (buildings, archaeological sites like Mapungubwe, Cradle of Humankind, San rock art) and Intangible Heritage (languages, dance, beadwork, oral history, traditional cuisine). Tourists must always ask permission before photographing locals and respect sacred cultural sites.'
    ],
    summaryByLanguage: {
      Xitsonga: 'Vupfhumba lebyi yaka emahlweni byi hlayisa ntumbuluko, ndzhavuko na ikhonomi ya vaaki (3 Pillars: Planet, People, Profit). Ecotourism yi hlayisa swiharhi yi tlhela yi pfuna miganga; Fair Trade Tourism yi tiyisisa muholo lowunene na ku tirhisa swilo swa le kaya.',
      Sepedi: 'Boeti bja go swarelela bo hlokomela tikologo, setšo le ikonomi ya badudi (3 Pillars). Ecotourism e šireletša tlhago le diphoofolo gomme ya hola setšhaba sa tikologo; Fair Trade Tourism e netefatša meputso ye mebotse.',
      isiZulu: 'Ukuvakasha okusimeme kuvikela imvelo, amasiko nomnotho wendawo (Izinsika ezi-3: Planet, People, Profit). I-Ecotourism ivikela izilwane iphinde ithuthukise imiphakathi yendawo; i-Fair Trade Tourism iqinisekisa amaholo anobulungiswa.',
      Tshivenda: 'Vhuendelamashango ha tshifhinga tshothe vhu tsireledza mupo, mvelele na ikonomi ya vhathu vha hone.',
      Sesotho: 'Bohahlauli bo tsitsitseng bo sireletsa tikoloho, botjhaba le moruo wa setjhaba sa sebaka seo.',
      Setswana: 'Bojanala jo bo tswelelang bo sireletsa tikologo, ngwao le ikonomi ya baagi ba lefelo.',
      Siswati: 'Tekuvakasha letisimeme tivikela imvelo, emasiko nemnotfo wemmango.',
      isiNdebele: 'Ukuvakasha okusimamako kuvikela imvelo, isiko nomnotho womphakathi.',
      isiXhosa: 'Ukhenketho oluzinzileyo lukhusela indalo, inkcubeko noqoqosho lwabahlali (3 Pillars).',
      Afrikaans: 'Volhoubare toerisme balanseer die 3 pilare (Omgewing, Sosiaal/Kultuur, Ekonomie). Verantwoordelike toerisme ondersteun plaaslike werkers, billike lone (Fair Trade Tourism) en etiese natuurlewe-bewaring.',
      English: 'Sustainable & responsible tourism protects SA’s Triple Bottom Line—Environment, People/Heritage, and Local Economy—through ecotourism, ethical wildlife care, solar/water conservation, local procurement, and respectful cultural heritage sharing.'
    },
    keyTerms: [
      {
        termEn: 'Triple Bottom Line (3 Pillars)',
        translations: {
          Xitsonga: 'Tiphilari tinharhu (Ntumbuluko, Vanhu, Mali)',
          Sepedi: 'Dikokwane tše Tharo (Tikologo, Batho, Ekonomi)',
          isiZulu: 'Izinsika Ezi-3 (Imvelo, Abantu, Umnotho)',
          Tshivenda: 'Phuphu Tharu (Mupo, Vhathu, Ikonomi)',
          Sesotho: 'Dipilara tse Tharo (Tikoloho, Batho, Moruo)',
          Setswana: 'Dipilara tse Tharo (Tikologo, Batho, Ikonomi)',
          Siswati: 'Tinsika Leti-3 (Imvelo, Bantfu, Umnotfo)',
          isiNdebele: 'Iinsika Ezi-3 (Imvelo, Abantu, Umnotho)',
          isiXhosa: 'Iintsika Ezi-3 (Indalo, Abantu, Uqoqosho)',
          Afrikaans: 'Drievoudige Slotsom (3 Pilare)',
          English: 'Environmental, Social/Cultural & Economic balance'
        },
        meaningByLanguage: {
          Xitsonga: 'Ku ringanisa vuhlayiseki bya ntumbuluko (Planet), nhlonipho wa vaaki (People) na bindzu leri pfunaka hinkwavo (Profit).',
          Sepedi: 'Tekatekano ya tikologo (Planet), setšhaba (People) le poelo ya ekonomi (Profit).',
          isiZulu: 'Ukulinganisela phakathi kwemvelo (Planet), abantu namasiko (People), kanye nenzuzo yomnotho (Profit).',
          Tshivenda: 'Ndango yo linganaho ya mupo, vhathu na ikonomi.',
          Sesotho: 'Tekatekano pakeng tsa tikoloho, setjhaba le moruo.',
          Setswana: 'Tekatekano ya tikologo, baagi le ikonomi.',
          Siswati: 'Kulinganisa imvelo, bantfu nemnotfo.',
          isiNdebele: 'Ukulinganisa imvelo, abantu nomnotho.',
          isiXhosa: 'Ulungelelwaniso phakathi kwendalo, abantu noqoqosho.',
          Afrikaans: 'Die balans tussen Omgewing (Planet), Mens/Kultuur (People) en Ekonomie (Profit) vir langtermyn volhoubaarheid.',
          English: 'The three sustainability pillars: Environmental protection (Planet), Social/Cultural equity (People), and Local Economic benefit (Profit).'
        }
      },
      {
        termEn: 'Fair Trade Tourism (FTT)',
        translations: {
          Xitsonga: 'Fair Trade Tourism (Bindzu ro Lulama)',
          Sepedi: 'Fair Trade Tourism (Kgwebo ya Toka)',
          isiZulu: 'I-Fair Trade Tourism (Ukuhweba Ngobulungiswa)',
          Tshivenda: 'Fair Trade Tourism (Bindu lo Lugaho)',
          Sesotho: 'Fair Trade Tourism (Kgwebo e Lokileng)',
          Setswana: 'Fair Trade Tourism (Kgwebo e e Siameng)',
          Siswati: 'Fair Trade Tourism',
          isiNdebele: 'Fair Trade Tourism',
          isiXhosa: 'I-Fair Trade Tourism',
          Afrikaans: 'Fair Trade Toerisme',
          English: 'Certification for fair wages, ethical care & local ownership'
        },
        meaningByLanguage: {
          Xitsonga: 'Setifikheti leyi tiyisisaka miholo ya le nawini, swiyimo swa kahle swa vatirhi na nhlayiso wa ntumbuluko.',
          Sepedi: 'Setifikeiti sa gore mešomo e lefa gabotse gomme tikologo e a šireletšwa.',
          isiZulu: 'Uphawu oluqinisekisa ukuthi izisebenzi zikhokhelwa ngokufanele, umphakathi uyahlomula futhi imvelo iyavikelwa.',
          Tshivenda: 'Tshiga tshi sumbedzaho miholo yavhudi na u tsireledza mupo.',
          Sesotho: 'Setifikeiti se tiisang meputso e lokileng le paballo ya tikoloho.',
          Setswana: 'Setifikeiti se se rurifatsang dituelo tse di siameng le pabalesego ya tikologo.',
          Siswati: 'Sitifiketi lesicinisekisa kuholelwa kahle nekuvikela imvelo.',
          isiNdebele: 'Isitifiketi esiqinisekisa imiholo ehle nokuvikeleka kwemvelo.',
          isiXhosa: 'Isiqinisekiso semivuzo enobulungisa, impilo yabasebenzi nokhuseleko lwendalo.',
          Afrikaans: 'n Suid-Afrikaanse sertifisering vir billike lone, veilige werksomstandighede, gemeenskapsvoordele en bewaring.',
          English: 'A respected SA non-profit certification verifying fair employee wages, safe working conditions, ethical wildlife care & environmental conservation.'
        }
      },
      {
        termEn: 'Tangible vs Intangible Heritage',
        translations: {
          Xitsonga: 'Ndzhaka yo Khumbeka vs yo Kala yi nga Khumbeki',
          Sepedi: 'Bohwa bjo bo Swariwago vs bjo bo sa Swariwego',
          isiZulu: 'Amagugu Abambekayo vs Angabambeki',
          Tshivenda: 'Vhufa vhu Farwaho vs vhu sa Farwi',
          Sesotho: 'Lefa le Tshwarehang vs le sa Tshwareheng',
          Setswana: 'Boswa jo bo Tshwaregang vs jo bo sa Tshwaregeng',
          Siswati: 'Emagugu Labambekako vs Langabambeki',
          isiNdebele: 'Amagugu Abambekako vs Angabambeki',
          isiXhosa: 'Ilifa EliBambekayo vs Elingabambekiyo',
          Afrikaans: 'Tasbare vs Ontasbare Erfenis',
          English: 'Physical monuments/sites vs living traditions/languages/music'
        },
        meaningByLanguage: {
          Xitsonga: 'Tangible i tindzhawu kumbe swivumbiwa (xik. Mapungubwe); Intangible i tindzimi, mincino, tinsimu na switori.',
          Sepedi: 'Tangible ke mafelo goba meago (bjalo ka Mapungubwe); Intangible ke maleme, mmino le setšo.',
          isiZulu: 'Okubambekayo izindawo nezakhiwo (isib. i-Mapungubwe); okungabambeki izilimi, imiculo, imigidi namasiko.',
          Tshivenda: 'Tangible ndi fhethu sa Mapungubwe; Intangible ndi luambo, mitshino na ngano.',
          Sesotho: 'Tangible ke dibaka (Mapungubwe); Intangible ke dipuo, mmino le ditlwaelo.',
          Setswana: 'Tangible ke mafelo (Mapungubwe); Intangible ke dipuo, mmino le dingwao.',
          Siswati: 'Tangible tindzawo nemagugu labonakalako; Intangible tilwimi nemculo.',
          isiNdebele: 'Tangible ziindawo nemakhiwo; Intangible malimi namasiko.',
          isiXhosa: 'EliBambekayo zizakhiwo neendawo (umz. Mapungubwe); elingabambekiyo ziilwimi, umculo namabali.',
          Afrikaans: 'Tasbaar is fisiese plekke en artefakte (bv. Mapungubwe); ontasbaar is lewende tradisies, tale, dans en resepte.',
          English: 'Tangible heritage includes physical artefacts/sites (Mapungubwe, Robben Island); Intangible heritage covers living traditions (music, languages, dance, crafts).'
        }
      }
    ],
    workedExample: {
      title: 'Real South African Example: Auditing a Lodge in Limpopo for Responsible Tourism',
      scenario:
        'A rural eco-lodge near Kruger National Park wants Fair Trade Tourism certification. Currently: (1) They buy all vegetables from a city wholesaler 250 km away, (2) They throw food waste into a pit and use diesel generators all night, and (3) They offer lion-cub petting photos to international guests. Show three responsible upgrades using the Triple Bottom Line.',
      steps: [
        'Step 1 (Economic Upgrade — Support Local Community): Switch 70% of fresh vegetables, crafts, and laundry contracts to nearby village farmers and SMMEs—reducing truck transport emissions and creating local income.',
        'Step 2 (Environmental Upgrade — Energy & Waste): Install rooftop solar panels + battery banks for silent clean night power, separate glass/plastics for recycling, and compost organic kitchen scraps for the lodge herb garden.',
        'Step 3 (Social / Ethical Wildlife Upgrade): Stop lion-cub petting immediately (unethical exploitation linked to canned hunting) and replace it with guided walking safaris and authentic Makuleke/Shangaan village cultural visits where guides earn fair wages.'
      ],
      finalAnswer:
        'Buy local produce (Economic) + switch to solar & composting (Environmental) + replace cub petting with ethical bush walks & fairly paid local guides (Social/Ethical).'
    },
    practiceQuestions: [
      {
        number: 1,
        question:
          'Give two simple daily actions a hotel guest can do to support environmental sustainability during their stay in South Africa.',
        answer:
          '1) Reuse bath towels and request linen changes every 2–3 days instead of daily to save scarce SA water and electricity; 2) Turn off air-conditioning, lights, and taps completely when leaving the room.'
      },
      {
        number: 2,
        question:
          'How should a tour guide coach tourists to behave respectfully when visiting a rural cultural village in KwaZulu-Natal or Limpopo?',
        answer:
          'Ask permission before taking photographs of residents or homes, dress modestly, listen without mocking local beliefs, buy crafts at fair prices without aggressive bargaining, and stay with the community guide.'
      }
    ],
    quickQuiz: [
      {
        number: 1,
        question: 'Which set correctly names the Three Pillars (Triple Bottom Line) of Sustainable Tourism?',
        options: [
          'Flights, Hotels, Restaurants',
          'Environmental (Planet), Social/Cultural (People), and Economic (Profit)',
          'Summer, Winter, Spring',
          'Passports, Visas, Insurance'
        ],
        correctIndex: 1,
        explanation: 'Sustainable tourism balances Planet (Environment), People (Social/Cultural), and Profit (Local Economy).'
      },
      {
        number: 2,
        question: 'Which of the following is an example of INTANGIBLE heritage in South Africa?',
        options: [
          'Robben Island prison buildings',
          'Traditional isiZulu dancing, beadwork skills, and praise poetry',
          'Gold artefacts at Mapungubwe Museum',
          'The Union Buildings in Pretoria'
        ],
        correctIndex: 1,
        explanation: 'Living traditions such as songs, languages, dances, and oral history are intangible heritage.'
      },
      {
        number: 3,
        question: 'Why does Fair Trade Tourism oppose "lion-cub petting" experiences?',
        options: [
          'Because lions dislike cameras',
          'Because hand-reared cubs often end up in unethical canned hunting and cannot return to the wild',
          'Because SANParks runs out of petrol',
          'Because tourists prefer indoor malls'
        ],
        correctIndex: 1,
        explanation: 'Responsible wildlife tourism rejects cub petting because it exploits animals and fuels captive breeding for canned hunting.'
      },
      {
        number: 4,
        question: 'How does buying fresh fruit and crafts from local village suppliers benefit tourism sustainability?',
        options: [
          'It keeps tourism money circulating in the local community and lowers transport carbon footprint',
          'It increases airport landing fees',
          'It eliminates the need for tour guides',
          'It forces tourists to cook dinner'
        ],
        correctIndex: 0,
        explanation: 'Local procurement reduces economic leakage, builds rural jobs, and cuts food-mile emissions.'
      },
      {
        number: 5,
        question: 'Which practice saves the most water at a Cape Town hotel during dry summer months?',
        options: [
          'Watering lawns at midday in hot sun',
          'Installing low-flow showerheads, fixing leaks immediately, and reusing guest towels',
          'Leaving swimming pool taps running overnight',
          'Washing half-empty laundry loads'
        ],
        correctIndex: 1,
        explanation: 'Low-flow aerators, leak repairs, and towel-reuse programmes dramatically reduce water consumption.'
      }
    ]
  }
];
