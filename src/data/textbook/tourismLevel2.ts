/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NCV TOURISM TEXTBOOK — LEVEL 2 (Chapters 1–3)
 * 100% Nexovian Original — Read Online Only on nexovian.group.
 */

import { TourismChapter } from './tourismTypes';

export const TOURISM_LEVEL2_CHAPTERS: TourismChapter[] = [
  {
    id: 'tour-l2-ch1-intro-to-tourism',
    level: 2,
    chapterNumber: 1,
    chapterLabel: 'Level 2 • Chapter 1',
    title: 'Introduction to Tourism',
    subtitleByLanguage: {
      Xitsonga: 'Nhlamuselo ya Vupfhumba, Swiyenge swa 5 na Tinxaka ta Vupfhumba eAfrika-Dzonga',
      Sepedi: 'Matseno a Boeti, Dikarolo tše 5 le Mehuta ya Boeti ka Afrika Borwa',
      isiZulu: 'Isingeniso Sezokuvakasha, Imikhakha emi-5 nezinhlobo Zokuvakasha eNingizimu Afrika',
      Tshivenda: 'Mvula ya Vhuendelamashango, Zwikwama zwa 5 na Tshakha dza Vhuendelamashango',
      Sesotho: 'Selelekela sa Bohahlauli, Makala a 5 le Mefuta ya Bohahlauli Afrika Borwa',
      Setswana: 'Matseno a Bojanala, Makala a le 5 le Mefuta ya Bojanala mo Aforika Borwa',
      Siswati: 'Singeniso Setekuvakasha, Tigaba leti-5 neTinhlobo Tekuvakasha eNingizimu Afrika',
      isiNdebele: 'Isingeniso Sezokuvakasha, Imikhakha emi-5 neenhlobo Zokuvakasha eSewula Afrika',
      isiXhosa: 'Intshayelelo yoKhenketho, Amacandelo ama-5 neeNdidi zoKhenketho eMzantsi Afrika',
      Afrikaans: 'Inleiding tot Toerisme, 5 Sektore, Toeristipes & Ekonomiese Belangrikheid vir SA',
      English: 'What is tourism, tourist vs excursionist, 5 sectors, tourism types & why tourism matters to SA'
    },
    explanationParagraphs: [
      'Tourism is the temporary movement of people to destinations outside their normal place of work and home, for at least 24 hours (overnight) and not longer than one year, for leisure, business, or other personal reasons—not to earn a permanent salary at the destination.',
      'A Tourist stays at a destination for at least one night (24 hours or more) and uses accommodation such as a hotel, guesthouse, lodge, or family home. An Excursionist (day visitor) travels outside their home environment for less than 24 hours and returns home the same day without sleeping over.',
      'The tourism industry works as 5 connected sectors: (1) Accommodation (hotels, B&Bs, lodges, backpackers), (2) Transport (airlines, coaches, car hire, trains, taxis), (3) Attractions (parks, museums, beaches, theme parks), (4) Food & Beverage / Hospitality (restaurants, cafés, catering), and (5) Travel Organisers & Support Services (travel agents, tour operators, information centres, SANParks).',
      'Key types of tourism include: Domestic tourism (SA residents travelling inside SA), Inbound tourism (foreign visitors coming into SA), Outbound tourism (SA residents travelling overseas), Leisure tourism (holidays), Business / MICE (Meetings, Incentives, Conferences, Exhibitions), Cultural tourism (heritage & traditions), Adventure tourism (bungee jumping, shark cage diving, hiking), and Ecotourism (responsible nature travel that protects wildlife and benefits local communities).',
      'Why tourism matters to South Africa: It creates hundreds of thousands of jobs (especially for youth and rural communities), brings foreign currency (USD, EUR, GBP) into the country, builds infrastructure like roads and airports, supports SMMEs and craft markets, and funds conservation in places like Kruger National Park.'
    ],
    summaryByLanguage: {
      Xitsonga: 'Vupfhumba i ku famba ka nkarhinyana ku suka ekaya ku tlula tiawara ta 24. Mupfhumba u etlela vusiku byinwe kumbe ku tlula, kasi mufambi wa siku (excursionist) u vuya hi siku rero. Kuna swiyenge swa 5: ku etlela, swifambo, tindzhawu to hlamarisa, swakudya, na vaphakeri va maendzo. Vupfhumba byi tisa mintirho na mali ya matiko mambe eAfrika-Dzonga.',
      Sepedi: 'Boeti ke go sepela nakwana go ya lefelong le lengwe ka ntle ga legae go feta diiri tše 24. Moeti o robala bošego bjo tee go ya pele, mola moeng wa letšatši (excursionist) a boa ka lona letšatši leo. Dikarolo tše 5 ke marobalo, dinamelwa, mafelo a boiketlo, dijo, le ba rulaganyi ba maeto. Boeti bo tliša mešomo le tšhelete ya dinaga tša ka ntle go Afrika Borwa.',
      isiZulu: 'Ukuvakasha ukuhamba okwesikhashana ukuya endaweni engeyona yasekhaya ngaphezu kwamahora angama-24. Isivakashi silala okungenani ubusuku obubodwa, kanti i-excursionist sibuya ngalo lolo suku. Kunemikhakha emi-5: indawo yokulala, izithuthi, izindawo ezihehayo, ukudla, nabahleli bohambo. Ukuvakasha kudala imisebenzi futhi kuletha imali yamazwe angaphandle eNingizimu Afrika.',
      Tshivenda: 'Vhuendelamashango ndi u tshimbila ha tshifhinganyana u bva hayani u fhira awara dza 24. Muendi u edela vhusiku vhuthihi kana u fhira, ngeno mubveledzi wa duvha a tshi vhuya nga duvha lenelo. Hu na zwikwama zwa 5 na zwi divhelwa u bveledza mishumo kha Afrika Tshipembe.',
      Sesotho: 'Bohahlauli ke ho eta ka nakwana ho feta dihora tse 24. Mohahlauli o robala bonyane bosiu bo le bong, ha moeti wa letsatsi a kgutla ka letsatsi lona leo. Makala a 5 a kenyeletsa marobalo, dipalangwang, dibaka tse hohelang, dijo le batsamaisi ba maeto.',
      Setswana: 'Bojanala ke go eta ka nakwana go feta diura di le 24. Moeti o robala bosigo bo le bongwe, fa moeng wa letsatsi a boa ka lone letsatsi leo. Makala a 5 ke marobalo, dipalangwa, mafelo a a gogang, dijo le ba rulaganyi ba maeto.',
      Siswati: 'Tekuvakasha kuhamba kwesikhashana ngetulu kwema-awa la-24. Sivakashi silala busuku bunye, kantsi umhambi welilanga uyabuya ngalelo langa. Kunetigaba leti-5 letakha umnotfo nekuvula imisebenti eNingizimu Afrika.',
      isiNdebele: 'Ezokuvakasha kukukhamba kwesikhatjhana ngaphezu kwama-awara ama-24. Umvakashi ulala ubusuku bunye, kanti umvakatjhi welanga ubuya ngalo lelo langa. Kuneziga ezi-5 eziletha imisebenzi nemali eSewula Afrika.',
      isiXhosa: 'Ukhenketho kukuhamba okwexeshana okungaphezu kweeyure ezingama-24. Umhenkethi ulala ubuncinane ubusuku obunye, kanti umhambi wemini ubuya ngaloo mini. Amacandelo ama-5 adala imisebenzi azise imali yamazwe angaphandle eMzantsi Afrika.',
      Afrikaans: 'Toerisme is die tydelike beweging van mense buite hul gewone omgewing vir minstens 24 uur en minder as een jaar. n Toeris slaap oor, terwyl n dagbesoeker (ekskursionis) dieselfde dag terugkeer. Die 5 sektore is verblyf, vervoer, besienswaardighede, kos en drank, en reisorganiseerders.',
      English: 'Tourism involves travelling away from home for 24+ hours (overnight) up to 1 year for leisure, business, or other non-work purposes. Tourists stay overnight; excursionists return the same day. Five sectors—Accommodation, Transport, Attractions, Food & Beverage, and Travel Organisers—work together across Domestic, Inbound, Outbound, MICE, Cultural, Adventure, and Ecotourism to drive SA jobs and foreign income.'
    },
    keyTerms: [
      {
        termEn: 'Tourist vs Excursionist',
        translations: {
          Xitsonga: 'Mupfhumba vs Mufambi wa Siku',
          Sepedi: 'Moeti vs Moeng wa Letšatši',
          isiZulu: 'Isivakashi vs Umvakatshi Wosuku',
          Tshivenda: 'Muendi vs Mubveledzi wa Duvha',
          Sesotho: 'Mohahlauli vs Moeti wa Letsatsi',
          Setswana: 'Moeti vs Moeng wa Letsatsi',
          Siswati: 'Sivakashi vs Umhambi Welilanga',
          isiNdebele: 'Umvakashi vs Umvakatjhi Welanga',
          isiXhosa: 'Umhenkethi vs Umhambi Wemini',
          Afrikaans: 'Toeris vs Dagbesoeker',
          English: 'Overnight Visitor (24+ hrs) vs Day Visitor (<24 hrs)'
        },
        meaningByLanguage: {
          Xitsonga: 'Mupfhumba u etlela vusiku byinwe; excursionist u famba a vuya hi siku rinwe.',
          Sepedi: 'Moeti o robala bošego; moeng wa letšatši o boa ka lona letšatši leo.',
          isiZulu: 'Isivakashi silala ubusuku obubodwa noma ngaphezulu; umhambi wosuku ubuya ngalo lolo suku.',
          Tshivenda: 'Muendi u edela vhusiku; muendeli wa duvha u vhuya nga duvha lenelo.',
          Sesotho: 'Mohahlauli o robala bosiu; moeti wa letsatsi o kgutla ka letsatsi leo.',
          Setswana: 'Moeti o robala bosigo; moeng wa letsatsi o boa ka letsatsi leo.',
          Siswati: 'Sivakashi silala busuku; umhambi welilanga ubuya ngalo lelo langa.',
          isiNdebele: 'Umvakashi ulala ubusuku; umvakatjhi welanga ubuya ngelo langa.',
          isiXhosa: 'Umhenkethi ulala ubusuku; umhambi wemini ubuya kwangolo suku.',
          Afrikaans: 'n Toeris bly vir minstens een nag oor; n dagbesoeker keer dieselfde dag huis toe.',
          English: 'A tourist stays at least 24 hours (overnight); an excursionist visits for under 24 hours with no overnight stay.'
        }
      },
      {
        termEn: 'Inbound vs Outbound Tourism',
        translations: {
          Xitsonga: 'Vupfhumba byo Nghena vs byo Huma',
          Sepedi: 'Boeti bja ka Gare vs bja ka Ntle',
          isiZulu: 'Ukungena Kwamazwe vs Ukuphuma Kwamazwe',
          Tshivenda: 'Vhuendi ha u Dzhena vs u Bva',
          Sesotho: 'Bohahlauli bo Kenang vs bo Tswang',
          Setswana: 'Bojanala jo bo Tsenang vs jo bo Tswang',
          Siswati: 'Tekuvakasha Letingenako vs Letiphumako',
          isiNdebele: 'Ukuvakasha Okungenako vs Okuphumako',
          isiXhosa: 'Ukhenketho Olungenayo vs Oluphumayo',
          Afrikaans: 'Inkomende vs Uitgaande Toerisme',
          English: 'Foreign visitors entering SA vs SA residents visiting abroad'
        },
        meaningByLanguage: {
          Xitsonga: 'Inbound i vanhu va matiko mambe lava taka eSA; Outbound i Ma-SA lama yaka ematikweni mambe.',
          Sepedi: 'Inbound ke baeng ba tšwago dinageng tše dingwe ba etela SA; Outbound ke ma-SA ba ya dinageng dišele.',
          isiZulu: 'Inbound abantu bakwamanye amazwe abeza e-SA; Outbound izakhamuzi zase-SA eziya kwamanye amazwe.',
          Tshivenda: 'Inbound ndi vhathu vha dziñwe shango vha daho SA; Outbound ndi vhathu vha SA vha yaho nnda.',
          Sesotho: 'Inbound ke baeti ba tswang dinaheng tse ding ba etela SA; Outbound ke Ma-SA a yang mose.',
          Setswana: 'Inbound ke baeng ba tswang kwa ntle ba etela SA; Outbound ke Ma-SA a a yang kwa ntle.',
          Siswati: 'Inbound tivakashi letitako e-SA; Outbound bantfu base-SA labaya emaveni angephandle.',
          isiNdebele: 'Inbound iimvakatjhi eziza e-SA; Outbound babantu be-SA abaya kwamanye amazwe.',
          isiXhosa: 'I-Inbound ziindwendwe zamazwe angaphandle eziza e-SA; i-Outbound ngabantu base-SA abaya phesheya.',
          Afrikaans: 'Inkomende toeriste is buitelanders wat SA besoek (bring buitelandse valuta); uitgaande is Suid-Afrikaners wat oorsee reis.',
          English: 'Inbound brings international tourists and foreign exchange into SA; Outbound is South Africans travelling to other countries.'
        }
      },
      {
        termEn: 'MICE Tourism',
        translations: {
          Xitsonga: 'Vupfhumba bya Mabindzu (MICE)',
          Sepedi: 'Boeti bja Dikopano le Kgwebo (MICE)',
          isiZulu: 'Ukuvakasha Kwezamabhizinisi (MICE)',
          Tshivenda: 'Vhuendelamashango ha Mabindu (MICE)',
          Sesotho: 'Bohahlauli ba Dikopano (MICE)',
          Setswana: 'Bojanala jwa Dikopano (MICE)',
          Siswati: 'Tekuvakasha Tetinkhomfa (MICE)',
          isiNdebele: 'Ukuvakasha Kweemhlangano (MICE)',
          isiXhosa: 'Ukhenketho Lweenkomfa (MICE)',
          Afrikaans: 'MICE-saketoerisme',
          English: 'Meetings, Incentives, Conferences & Exhibitions'
        },
        meaningByLanguage: {
          Xitsonga: 'Vupfhumba bya mintirho na mabindzu: tinhlengeletano, mikhuva yo hlohlotela vatirhi, tinkonferense na swikombiso.',
          Sepedi: 'Boeti bja dikopano, dimpho tša mešomo, dikhonferense le dipontšho.',
          isiZulu: 'Uhambo lwamabhizinisi oluhlanganisa imihlangano, imiklomelo, izingqungquthela nemibukiso.',
          Tshivenda: 'Maendo a mabindu, dzikhomferentse na u sumbedza zwithu.',
          Sesotho: 'Maeto a kgwebo a dikopano, ditlotlo, dikhonferense le dipontsho.',
          Setswana: 'Maeto a kgwebo a dikopano, dimpho, dikhonferense le dipontsho.',
          Siswati: 'Kuhamba kwemabhizinisi: imihlangano, tikhomferensi nemibukiso.',
          isiNdebele: 'Ukukhamba kwamabhizinisi okuhlanganisa iimhlangano neenkhomferensi.',
          isiXhosa: 'Ukhenketho lwamashishini lweentlanganiso, iinkomfa kunye nemiboniso.',
          Afrikaans: 'Besigheidstoerisme wat bestaan uit Vergaderings (Meetings), Aansporingsreise (Incentives), Konferensies en Uitstallings (Exhibitions).',
          English: 'A high-value business tourism category covering Meetings, Incentives, Conferences, and Exhibitions (e.g., at Cape Town CTICC or Durban ICC).'
        }
      }
    ],
    workedExample: {
      title: 'Real South African Example: Classifying Visitors & Sectors at Durban ICC & uShaka Marine World',
      scenario:
        'During the Tourism Indaba in Durban: (A) Thabo lives in Pietermaritzburg (75 km away) and drives to Durban at 08:00 to visit uShaka Marine World, returning home at 18:00. (B) Amara flies from Nairobi, Kenya to attend the Tourism Indaba conference for 4 nights at Southern Sun Elangeni Hotel. Identify each person’s visitor type, tourism type, and 3 tourism sectors used by Amara.',
      steps: [
        'Step 1 (Visitor A — Thabo): He travels outside his home town for 10 hours (less than 24 hours) and does not sleep over -> Thabo is an EXCURSIONIST (day visitor), not a tourist.',
        'Step 2 (Tourism type for Thabo): He is a South African resident travelling inside South Africa for fun/recreation -> Domestic Leisure Tourism.',
        'Step 3 (Visitor B — Amara): She stays 4 nights (more than 24 hours) in another country -> Amara is an INBOUND TOURIST.',
        'Step 4 (Tourism type for Amara): She travels from Kenya into SA for a major trade conference -> Inbound Business / MICE Tourism (Exhibitions & Conferences).',
        'Step 5 (3 Sectors used by Amara): Transport (international flight/airport shuttle), Accommodation (Southern Sun Elangeni Hotel), and Food & Beverage / Travel Organisers (conference catering & booking agent).'
      ],
      finalAnswer:
        'Thabo = Domestic Leisure Excursionist (no overnight stay). Amara = Inbound Business/MICE Tourist using Transport, Accommodation, and Food & Beverage / Organisers sectors.'
    },
    practiceQuestions: [
      {
        number: 1,
        question:
          'Lerato lives in Soweto and books a 5-night safari package at Skukuza Rest Camp in Kruger National Park with her family. Classify her visitor type and tourism type, and name 2 sectors she uses.',
        answer:
          'Lerato is a Tourist (stays 5 nights, over 24 hours) doing Domestic Leisure / Ecotourism (SA resident travelling inside SA to a wildlife park). Two sectors she uses are Accommodation (Skukuza Rest Camp) and Attractions (Kruger National Park).'
      },
      {
        number: 2,
        question:
          'Give three practical reasons why inbound international tourism is important to the South African economy.',
        answer:
          '1) Earns foreign exchange (foreign currency spent on hotels, tours, and crafts strengthens SA’s economy); 2) Creates jobs across hospitality, guiding, transport, and retail; 3) Supports conservation and local SMMEs in rural and urban communities.'
      }
    ],
    quickQuiz: [
      {
        number: 1,
        question: 'Which statement correctly describes a Tourist compared to an Excursionist?',
        options: [
          'A tourist always travels by aeroplane, while an excursionist drives a car',
          'A tourist stays at least one night (24+ hours), while an excursionist returns home the same day',
          'A tourist must be from overseas, while an excursionist lives in South Africa',
          'A tourist never spends money, while an excursionist pays entrance fees'
        ],
        correctIndex: 1,
        explanation: 'By definition, a tourist stays at least 24 hours (one overnight stay) away from home, whereas an excursionist is a day visitor (<24 hours).'
      },
      {
        number: 2,
        question: 'A German family flying into Cape Town to hike Table Mountain for 7 days is an example of:',
        options: [
          'Outbound business tourism',
          'Domestic cultural tourism',
          'Inbound leisure / adventure tourism',
          'Excursionist transit travel'
        ],
        correctIndex: 2,
        explanation: 'Visitors entering South Africa from another country for holidays/hiking are Inbound leisure/adventure tourists.'
      },
      {
        number: 3,
        question: 'What does the "I" stand for in MICE tourism?',
        options: ['Inbound', 'International', 'Incentives', 'Itineraries'],
        correctIndex: 2,
        explanation: 'MICE stands for Meetings, Incentives, Conferences, and Exhibitions.'
      },
      {
        number: 4,
        question: 'Which of the following belongs to the Accommodation sector?',
        options: [
          'SANParks booking website',
          'Bed & Breakfast (B&B) and Game Lodge',
          'Gautrain Airport Link',
          'Robben Island Museum ferry'
        ],
        correctIndex: 1,
        explanation: 'B&Bs, hotels, lodges, and backpackers provide overnight lodging in the Accommodation sector.'
      },
      {
        number: 5,
        question: 'When South African residents fly to Mauritius for a beach holiday, South Africa records this as:',
        options: [
          'Domestic tourism',
          'Inbound tourism',
          'Outbound tourism',
          'Ecotourism'
        ],
        correctIndex: 2,
        explanation: 'Residents of a country travelling outside their own country is Outbound tourism.'
      }
    ]
  },
  {
    id: 'tour-l2-ch2-sa-geography',
    level: 2,
    chapterNumber: 2,
    chapterLabel: 'Level 2 • Chapter 2',
    title: 'South African Tourism Geography',
    subtitleByLanguage: {
      Xitsonga: 'Swifundzhankulu swa 9, Tindzhawu ta Ntikelo (Table Mountain, Kruger, Robben Island), Maxelo',
      Sepedi: 'Diprofense tše 9, Mafelo a Tumilego a Boeti, Klaemete le Dihla tša Ngwaga',
      isiZulu: 'Izifundazwe ezi-9, Izindawo Ezihehayo (Table Mountain, Kruger, Robben Island), Isimo Sezulu',
      Tshivenda: 'Dzingu dza 9, Fhethu ha Vhuendelamashango na Mutsho wa Shango',
      Sesotho: 'Diprofinse tse 9, Dibaka tsa Bohahlauli, Boemo ba Lehodimo le Dihla',
      Setswana: 'Diporofense tse 9, Mafelo a Bojanala, Loapi le Dipaka tsa Ngwaga',
      Siswati: 'Tifundza leti-9, Tindzawo Letidvumile Tekuvakasha neSimo Selitulu',
      isiNdebele: 'Iimfunda ezi-9, Iindawo Zokuvakasha Ezidumileko nobujamo Bezulu',
      isiXhosa: 'Amaphondo ali-9, Iindawo Eziqaqambileyo zoKhenketho neMozulu',
      Afrikaans: '9 Provinsies, Top Toeriste-aantreklikhede, Klimaat en Seisoene in Suid-Afrika',
      English: '9 provinces, top attractions (Table Mountain, Kruger, Robben Island, Drakensberg, Garden Route), climate & seasons'
    },
    explanationParagraphs: [
      'South Africa has 9 provinces, each with its own gateway cities and unique tourism appeal: Gauteng (Johannesburg & Pretoria — business, OR Tambo gateway, Apartheid Museum, Cradle of Humankind), Western Cape (Cape Town — Table Mountain, Robben Island, Cape Winelands, Garden Route), KwaZulu-Natal (Durban — beaches, uKhahlamba-Drakensberg Park, iSimangaliso Wetland Park), Mpumalanga (Nelspruit/Mbombela — Kruger National Park, Blyde River Canyon, God’s Window), and Limpopo (Polokwane — northern Kruger, Mapungubwe).',
      'The remaining 4 provinces offer rich cultural and natural gems: Eastern Cape (Gqeberha/East London — Addo Elephant National Park, Wild Coast, Tsitsikamma), North West (Rustenburg — Sun City Resort, Pilanesberg National Park), Free State (Bloemfontein — Golden Gate Highlands National Park, Gariep Dam), and Northern Cape (Kimberley — The Big Hole, Namaqualand spring wildflowers, Kgalagadi Transfrontier Park).',
      'Five flagship SA attractions every NCV Tourism student must know: (1) Table Mountain (Western Cape — cableway, New7Wonders of Nature), (2) Kruger National Park (Mpumalanga & Limpopo — Big Five safari flagship), (3) Robben Island (Western Cape — UNESCO World Heritage Site where Nelson Mandela was imprisoned), (4) uKhahlamba-Drakensberg Park (KwaZulu-Natal — UNESCO mountain wilderness & San rock art), and (5) The Garden Route (Mossel Bay to Storms River — coastal forests, Knysna lagoons, Tsitsikamma).',
      'Climate & Seasons in South Africa: Because SA is in the Southern Hemisphere, our seasons are opposite to Europe/North America: Summer (Dec–Feb), Autumn (Mar–May), Winter (Jun–Aug), Spring (Sep–Nov). Western Cape has a Mediterranean climate (hot dry summers, wet winters — peak beach season Dec–Feb). Gauteng, Mpumalanga, Limpopo & Free State have Summer rainfall (warm rainy summers, dry sunny mild winters — best Big Five game-viewing at Kruger is dry winter Jun–Sep when grass is short). KwaZulu-Natal coast is subtropical and warm all year.'
    ],
    summaryByLanguage: {
      Xitsonga: 'Afrika-Dzonga yi na swifundzhankulu swa 9. Tindzhawu letikulu ti katsa Table Mountain na Robben Island (Western Cape), Kruger National Park (Mpumalanga/Limpopo), Drakensberg (KwaZulu-Natal), na Garden Route. Eka Southern Hemisphere, ximumu i Dec–Feb kasi xixika i Jun–Aug; Kruger yi voniwa kahle hi xixika xo oma.',
      Sepedi: 'Afrika Borwa e na le diprofense tše 9. Mafelo a magolo a akaretša Table Mountain le Robben Island (WC), Kruger National Park (MP/LP), Drakensberg (KZN) le Garden Route. Selemo ke Dec–Feb gomme marega ke Jun–Aug; nako ye kaone ya go bona diphoofolo kua Kruger ke marega.',
      isiZulu: 'INingizimu Afrika inezifundazwe ezi-9. Izindawo ezihamba phambili yi-Table Mountain ne-Robben Island (WC), i-Kruger National Park (MP/LP), i-Drakensberg (KZN) ne-Garden Route. Ihlobo lingu-Dec–Feb kanti ubusika bungu-Jun–Aug; i-Kruger ihle kakhulu ebusika obomile.',
      Tshivenda: 'Afrika Tshipembe i na dzingu dza 9 na fhethu hu tamisaho sa Table Mountain, Kruger National Park, Robben Island, Drakensberg na Garden Route. Tshilimo ndi Dec–Feb, vhuria ndi Jun–Aug.',
      Sesotho: 'Afrika Borwa e na le diprofinse tse 9 le dibaka tse tummeng jwalo ka Table Mountain, Kruger National Park, Robben Island, Drakensberg le Garden Route. Lehlabula ke Dec–Feb ha mariha e le Jun–Aug.',
      Setswana: 'Aforika Borwa e na le diporofense tse 9 le mafelo a tshwanang le Table Mountain, Kruger, Robben Island, Drakensberg le Garden Route. Selemo ke Dec–Feb, mariga ke Jun–Aug.',
      Siswati: 'INingizimu Afrika inetifundza leti-9 netindzawo letidvumile njenge-Table Mountain, Kruger, Robben Island, Drakensberg ne-Garden Route.',
      isiNdebele: 'ISewula Afrika ineemfunda ezi-9 neendawo ezidumileko ezifana ne-Table Mountain, i-Kruger, i-Robben Island, i-Drakensberg ne-Garden Route.',
      isiXhosa: 'UMzantsi Afrika unamaphondo ali-9 neendawo ezifana ne-Table Mountain, Kruger, Robben Island, Drakensberg ne-Garden Route. Ihlobo ngu-Dec–Feb, ubusika ngu-Jun–Aug.',
      Afrikaans: 'Suid-Afrika het 9 provinsies met top-aantreklikhede soos Tafelberg, Krugerwildtuin, Robbeneiland, Drakensberge en die Tuinroete. Somer is Des–Feb en winter is Jun–Aug; Kruger-wildkyk is beste in die droë winter.',
      English: 'South Africa’s 9 provinces each offer distinct attractions, anchored by Table Mountain, Robben Island, Garden Route (Western Cape), Kruger National Park (Mpumalanga/Limpopo), and uKhahlamba-Drakensberg (KZN). Southern Hemisphere Summer runs Dec–Feb and Winter Jun–Aug—making Western Cape ideal in summer and Kruger safari wildlife viewing prime in dry winter.'
    },
    keyTerms: [
      {
        termEn: 'UNESCO World Heritage Site',
        translations: {
          Xitsonga: 'Ndzhawu ya Ndzhaka ya Misava ya UNESCO',
          Sepedi: 'Lefelo la Bohwa bja Lefase la UNESCO',
          isiZulu: 'Indawo Yamagugu Omhlaba ye-UNESCO',
          Tshivenda: 'Fhethu ha Vhufa ha Shango ha UNESCO',
          Sesotho: 'Sebaka sa Lefa la Lefatshe sa UNESCO',
          Setswana: 'Lefelo la Boswa jwa Lefatshe la UNESCO',
          Siswati: 'Indzawo Yemagugu Emhlaba ye-UNESCO',
          isiNdebele: 'Indawo Yamagugu Wephasi ye-UNESCO',
          isiXhosa: 'Indawo yeLifa leMveli yeHlabathi ye-UNESCO',
          Afrikaans: 'UNESCO Wêrelderfenisgebied',
          English: 'Protected site of outstanding cultural or natural value'
        },
        meaningByLanguage: {
          Xitsonga: 'Ndzhawu leyi hlayisiweke hi misava hinkwayo hikwalaho ka nkoka wa yona wa ntumbuluko kumbe ndzhavuko (xik. Robben Island na Drakensberg).',
          Sepedi: 'Lefelo leo le šireleditšwego lefaseng ka bophara ka baka la mohola wa tlhago goba setšo (bjalo ka Robben Island le Drakensberg).',
          isiZulu: 'Indawo evikelwe umhlaba wonke ngenxa yokubaluleka kwayo kwemvelo noma kwamasiko (isib. i-Robben Island ne-Drakensberg).',
          Tshivenda: 'Fhethu ho tsireledzwaho shangoni lothe nga mulandu wa mupo kana mvelele.',
          Sesotho: 'Sebaka se sireleditsweng lefatsheng ka bophara ka lebaka la bohlokwa ba tlhaho kapa botjhaba.',
          Setswana: 'Lefelo le le sireleditsweng lefatshe ka bophara ka ntlha ya tlhago kgotsa ngwao.',
          Siswati: 'Indzawo levikelekile emhlabeni wonkhe ngekubaluleka kwayo.',
          isiNdebele: 'Indawo evikelekileko ephasini loke ngobuhle bemvelo namkha besiko.',
          isiXhosa: 'Indawo ekhuselweyo ehlabathini lonke ngenxa yendalo okanye inkcubeko (umz. i-Robben Island).',
          Afrikaans: 'n Gebied wat internasionaal beskerm word vir sy uitsonderlike kulturele of natuurlike waarde, soos Robbeneiland en die Drakensberge.',
          English: 'A landmark legally protected by UNESCO for universal cultural or natural importance (e.g., Robben Island, uKhahlamba-Drakensberg, Cradle of Humankind).'
        }
      },
      {
        termEn: 'Mediterranean vs Summer Rainfall',
        translations: {
          Xitsonga: 'Maxelo ya Xirhami ya Mpfula vs Maxelo ya Ximumu',
          Sepedi: 'Klaemete ya Pula ya Marega vs ya Selemo',
          isiZulu: 'Isimo Sezulu Sasebusika vs Sasehlobo',
          Tshivenda: 'Mutsho wa Mvula ya Vhuria vs ya Tshilimo',
          Sesotho: 'Pula ya Mariha vs Pula ya Lehlabula',
          Setswana: 'Pula ya Mariga vs Pula ya Selemo',
          Siswati: 'Timvula Tebusika vs Tehlobo',
          isiNdebele: 'Izulu Lebusika vs Lehlobo',
          isiXhosa: 'Imozulu yeMvula yaseBusika vs yaseHlobo',
          Afrikaans: 'Mediterreense vs Somerreënvalklimaat',
          English: 'Western Cape wet winter vs inland wet summer'
        },
        meaningByLanguage: {
          Xitsonga: 'Western Cape yi na mpfula hi xixika (Jun–Aug); Mpumalanga/Gauteng ti na mpfula hi ximumu (Dec–Feb).',
          Sepedi: 'Western Cape e na le pula marega; Gauteng le Mpumalanga di na le pula selemo.',
          isiZulu: 'I-Western Cape ina ebusika kanti i-Gauteng ne-Mpumalanga zina ehlobo.',
          Tshivenda: 'Western Cape i na mvula vhuria; Gauteng na Mpumalanga tshilimo.',
          Sesotho: 'Western Cape e na mariha; Gauteng le Mpumalanga di na lehlabula.',
          Setswana: 'Kapa Bophirima e na mariga; Gauteng le Mpumalanga di na selemo.',
          Siswati: 'Western Cape ina ebusika; Mpumalanga ina ehlobo.',
          isiNdebele: 'I-Western Cape ina ebusika; i-Mpumalanga ina ehlobo.',
          isiXhosa: 'INtshona Koloni ina ebusika; iRhawuti neMpumalanga zina ehlobo.',
          Afrikaans: 'Die Wes-Kaap kry winterreën en droë somers; die binneland kry somerreën en droë winters.',
          English: 'Western Cape gets winter rain & dry sunny summers; Mpumalanga, Gauteng & Limpopo get summer afternoon storms & dry sunny winters.'
        }
      },
      {
        termEn: 'Gateway City',
        translations: {
          Xitsonga: 'Doroba ro Nghena hi Rona',
          Sepedi: 'Motse wa Kgoro ya Baeti',
          isiZulu: 'Idolobha Lesango Lezivakashi',
          Tshivenda: 'Dorobo la Muvhango wa Vhaendi',
          Sesotho: 'Toropo ya Monyako wa Baeti',
          Setswana: 'Toropo ya Kgoro ya Bajanala',
          Siswati: 'Lidolobha Lelisango',
          isiNdebele: 'Idorobha Lesango',
          isiXhosa: 'Isixeko esiliSango',
          Afrikaans: 'Poortstad (Gateway City)',
          English: 'Main arrival hub city for a region or attraction'
        },
        meaningByLanguage: {
          Xitsonga: 'Doroba leri nga na rivanti ra swihahampfhuka kumbe mapatu yo yisa vapfhumba etindzhawini (xik. Mbombela eKruger).',
          Sepedi: 'Motse wo mogolo wa difofane le ditsela wo o gogelago baeti go ya mafelong a boeti.',
          isiZulu: 'Idolobha elikhulu elinamabhizinisi nezindiza elingenisa izivakashi esifundazweni (isib. i-Goli noma i-Mbombela).',
          Tshivenda: 'Dorobo khulwane ya u dzhena hayo kha dzingu.',
          Sesotho: 'Toropo e kgolo moo baeti ba fihlang teng pele ba ya dibakeng tsa boithabiso.',
          Setswana: 'Toropo e bajanala ba gorogang kwa go yone pele ba ya mafelong a bojanala.',
          Siswati: 'Lidolobha lelikhulu lekwemukela tivakashi.',
          isiNdebele: 'Idorobha elikhulu lokufika kweemvakatjhi.',
          isiXhosa: 'Isixeko esikhulu apho abakhenkethi bangenela khona besiya kwiindawo zokhenketho.',
          Afrikaans: 'n Hoof-aankomspunt met n lughawe en paaie na omliggende besienswaardighede (bv. Johannesburg vir SA of Mbombela vir Kruger).',
          English: 'The major transport hub through which tourists enter a province or attraction (e.g., Johannesburg/OR Tambo for SA; Mbombela for Kruger).'
        }
      }
    ],
    workedExample: {
      title: 'Real South African Example: Planning Seasonal Destinations for a July European Family',
      scenario:
        'A family from London (United Kingdom) wants to visit South Africa in July (their European school summer holiday). They want warm, dry weather for Big Five game viewing AND ask whether July is good for beach swimming in Cape Town. Advise them using SA provinces, seasons, and attractions.',
      steps: [
        'Step 1 (Understand July in SA): Because SA is in the Southern Hemisphere, July is mid-WINTER.',
        'Step 2 (Advise on Cape Town / Western Cape): Cape Town has a Mediterranean climate with wet, cold, windy winters in July (~8°C–17°C). It is NOT ideal for beach swimming, though whale watching in Hermanus and indoor attractions/Winelands are still enjoyable.',
        'Step 3 (Recommend the right province & flagship park for Big Five): Recommend Kruger National Park in Mpumalanga / Limpopo. July is the dry winter season there—sunny days (~22°C), no malaria peak rain, and short dry bush makes Big Five animals easy to spot around waterholes.',
        'Step 4 (Add warm coastal alternative): If they still want warm beach weather in July, suggest Durban / KwaZulu-Natal North Coast (uShaka, Umhlanga, iSimangaliso), which stays mild and sunny in winter (~23°C) with warm Indian Ocean water.'
      ],
      finalAnswer:
        'Send the family to Kruger National Park (Mpumalanga/Limpopo) for dry-season Big Five viewing and KwaZulu-Natal coast for mild winter beaches; warn them that Cape Town in July is wet and cold for swimming.'
    },
    practiceQuestions: [
      {
        number: 1,
        question:
          'Match each flagship attraction to its correct South African province: (a) Table Mountain, (b) uKhahlamba-Drakensberg Park, (c) The Big Hole, (d) Blyde River Canyon.',
        answer:
          '(a) Table Mountain -> Western Cape; (b) uKhahlamba-Drakensberg Park -> KwaZulu-Natal; (c) The Big Hole (Kimberley) -> Northern Cape; (d) Blyde River Canyon -> Mpumalanga.'
      },
      {
        number: 2,
        question:
          'Why is Spring (September–October) the peak tourism season for Namaqualand in the Northern Cape, whereas December–February is peak season for Cape Town beaches?',
        answer:
          'Namaqualand relies on winter rain followed by warm Spring sunshine (Aug–Oct) for millions of wildflowers to bloom in the desert; Cape Town beaches peak in Southern Hemisphere Summer (Dec–Feb) when Western Cape weather is hot and dry.'
      }
    ],
    quickQuiz: [
      {
        number: 1,
        question: 'In which province is Robben Island located?',
        options: ['Eastern Cape', 'Western Cape', 'KwaZulu-Natal', 'Northern Cape'],
        correctIndex: 1,
        explanation: 'Robben Island lies in Table Bay off Cape Town in the Western Cape.'
      },
      {
        number: 2,
        question: 'Which two provinces share Kruger National Park?',
        options: [
          'Gauteng and North West',
          'Free State and Eastern Cape',
          'Mpumalanga and Limpopo',
          'KwaZulu-Natal and Mpumalanga'
        ],
        correctIndex: 2,
        explanation: 'Kruger National Park stretches across Mpumalanga in the south and Limpopo in the north.'
      },
      {
        number: 3,
        question: 'When is Winter in South Africa (Southern Hemisphere)?',
        options: ['December to February', 'March to May', 'June to August', 'September to November'],
        correctIndex: 2,
        explanation: 'South Africa’s winter months are June, July, and August.'
      },
      {
        number: 4,
        question: 'The Garden Route runs mainly along the coast of which province (reaching Storms River in Eastern Cape)?',
        options: ['Western Cape', 'Northern Cape', 'Free State', 'Limpopo'],
        correctIndex: 0,
        explanation: 'The famous Garden Route runs from Mossel Bay through George and Knysna in the Western Cape to Storms River/Tsitsikamma.'
      },
      {
        number: 5,
        question: 'Which province is home to Sun City Resort and Pilanesberg National Park?',
        options: ['Free State', 'North West', 'Gauteng', 'Eastern Cape'],
        correctIndex: 1,
        explanation: 'Sun City and Pilanesberg are flagship attractions in the North West province.'
      }
    ]
  },
  {
    id: 'tour-l2-ch3-customer-care',
    level: 2,
    chapterNumber: 3,
    chapterLabel: 'Level 2 • Chapter 3',
    title: 'Customer Care & Communication',
    subtitleByLanguage: {
      Xitsonga: 'Ku Khoma Vaxavi Kahle, Riqingho, Ku Lulamisa Swirilo & Xiyimo xa Ntshamo',
      Sepedi: 'Tlhokomelo ya Bareki, Mekgwa ya Mogala, Go Rarolla Dingongorego le Ponagalo',
      isiZulu: 'Ukunakekelwa Kwamakhasimende, Ucingo, Ukuxazulula Izikhalazo nokubukeka Kahle',
      Tshivenda: 'Thusedzo ya Vharengi, Lutingo, U Tandulula Mbilayelo na Vhudele',
      Sesotho: 'Tlhokomelo ya Bareki, Mohala, Ho Rarolla Ditletlebo le Ponahalo e Ntle',
      Setswana: 'Tlhokomelo ya Bareki, Mogala, Go Rarabolola Dingongorego le Ponalo',
      Siswati: 'Kunakekela Emakhasimende, Lucingo, Tinkinga neKubukeka Kahle',
      isiNdebele: 'Ukutlhogomela Abathengi, Umtato, Ukurarulula Iinlingo nokubonakala Kuhle',
      isiXhosa: 'Ukhathalelo Lwabaxhasi, Ifowuni, Ukusombulula Izikhalazo kunye Nenkangeleko',
      Afrikaans: 'Kliëntediens, Telefoonetiket, Klagtehantering en Professionele Voorkoms',
      English: 'Customer service, telephone etiquette, handling complaints & professional appearance'
    },
    explanationParagraphs: [
      'Customer care in tourism is about exceeding a guest’s expectations so they feel welcome, safe, and valued from first contact until after they return home. Great customer service turns first-time visitors into repeat guests who promote South Africa by word of mouth.',
      'Communication has two main parts: Verbal (spoken words, tone, pitch, language choice—clear, polite, no slang) and Non-verbal (body language, eye contact, warm smile, posture, open gestures). Cultural sensitivity is vital in SA: greet guests respectfully, avoid assumptions, and speak clearly without rushing.',
      'Telephone Etiquette rules: Answer within 3 rings; smile while speaking (guests hear warmth in your voice); give a standard professional greeting ("Good morning, Savanna Lodge, Thabo speaking, how may I help you?"); listen actively and take written notes (caller name, number, dates); ask permission before putting a caller on hold ("May I place you on hold for 1 minute while I check?"); and never slam the receiver down.',
      'Handling Complaints using the LAST method: (1) Listen without interrupting and maintain calm eye contact; (2) Apologise sincerely on behalf of the business ("I am sorry you experienced this"); (3) Solve immediately or offer realistic options/escalation to a manager; (4) Thank the guest for raising the issue and follow up to make sure they are happy.',
      'Professional Appearance & Grooming: Clean, pressed uniform with name badge; neat hair; trimmed clean fingernails; minimal jewellery/perfume; polished closed shoes; fresh breath and positive posture. Personal hygiene and punctuality show pride in the hospitality brand.'
    ],
    summaryByLanguage: {
      Xitsonga: 'Ku khoma vaendzi kahle swi endla leswaku va titwa va amukeriwile naswona va tlhela va vuya. Tirhisa mahanyelo lamanene ya riqingho (hlamula ka 3 rings, vula vito ra khamphani), ku yingisela swivilelo hi LAST (Listen, Apologise, Solve, Thank), na mpahla yo basa ya ntirho.',
      Sepedi: 'Tlhokomelo ya bareki e dira gore baeng ba ikwe ba amogelegile. Šomiša mekgwa ya mogala ya go araba ka pela, go theeletša dingongorego ka LAST (Listen, Apologise, Solve, Thank), le go apara yunifomo ye hlwekilego.',
      isiZulu: 'Ukunakekelwa kwamakhasimende kwenza izivakashi zizizwe zamukelekile. Sebenzisa indlela efanele yocingo (phendula ngaphambi kwama-rings ama-3), xazulula izikhalazo nge-LAST (Listen, Apologise, Solve, Thank), ugqoke iyunifomu ehlanzekile.',
      Tshivenda: 'Thusedzo ya vharengi i ita uri vhaeni vha pfe vho tanganedzwa. Aravhani lutingo nga u tavhanya, tandululani mbilayelo nga LAST, ni ambare zwavhudi.',
      Sesotho: 'Tlhokomelo ya bareki e etsa hore baeti ba ikutlwe ba amohelehile. Araba mohala ka rings tse 3, rarolla ditletlebo ka LAST, mme o apare yunifomo e hlwekileng.',
      Setswana: 'Tlhokomelo ya bareki e dira gore baeng ba ikutlwe ba amogelesegile. Araba mogala ka bonako, rarabolola dingongorego ka LAST, o apare bontle.',
      Siswati: 'Kunakekela tivakashi kwenta titive temukelekile. Phendvula lucingo masinyane, usebentise LAST etinkingeni, ugadze kuhle kwemtimba.',
      isiNdebele: 'Ukutlhogomela iimvakatjhi kwenza zizizwe zamukelekile. Phendula umtato ngaphambi kwama-rings ama-3, usebenzise i-LAST.',
      isiXhosa: 'Ukhathalelo lwabaxhasi lwenza iindwendwe zizive zamkelekile. Phendula ifowuni nge-rings ezi-3, usebenzise i-LAST kwizikhalazo, unxibe iyunifomu ecocekileyo.',
      Afrikaans: 'Goeie kliëntediens laat gaste welkom voel. Beantwoord die telefoon binne 3 luie, hanteer klagtes met die LAST-metode (Listen, Apologise, Solve, Thank), en handhaaf n netjiese professionele voorkoms.',
      English: 'Outstanding customer care builds trust and repeat visits. Receptionists and guides combine warm body language, 3-ring telephone etiquette, neat grooming/uniform standards, and the LAST complaint-handling method (Listen, Apologise, Solve, Thank).'
    },
    keyTerms: [
      {
        termEn: 'Non-Verbal Communication',
        translations: {
          Xitsonga: 'Vuhlanganisi byo Kala Marito',
          Sepedi: 'Poledišano ye e sa Šomišego Mantšu',
          isiZulu: 'Ukuxhumana Ngaphandle Kwamazwi',
          Tshivenda: 'Vhudavhidzani hu sa Shumi Maipfi',
          Sesotho: 'Puisano e sa Sebediseng Mantswe',
          Setswana: 'Puisano e e sa Diriseng Mafoko',
          Siswati: 'Kuchumana Ngaphandle Kwemagama',
          isiNdebele: 'Ukuthintana Ngaphandle Kwemezwi',
          isiXhosa: 'Unxibelelwano Olungathethiyo',
          Afrikaans: 'Nie-verbale Kommunikasie',
          English: 'Body language, eye contact, smile & posture'
        },
        meaningByLanguage: {
          Xitsonga: 'Ku hlamusela hi mahlo, ku n’wayitela, xiyimo xa miri na mavoko handle ko vulavula.',
          Sepedi: 'Go bontšha maikutlo ka mahlo, go myemyela le boitshwaro bja mmele ntle le go bolela.',
          isiZulu: 'Ukukhuluma ngomzimba, ukubuka emehlweni, ukumamatheka nokuma kahle.',
          Tshivenda: 'U amba nga mato, u nyemula na muvhili hu sa ambiwi.',
          Sesotho: 'Ho bua ka mahlo, pososelo le motsamao wa mmele.',
          Setswana: 'Go bua ka matlho, go nyenya le boitshwaro jwa mmele.',
          Siswati: 'Kukhuluma ngemtimba, kumoyitela nekubuka emehlweni.',
          isiNdebele: 'Ukukhuluma ngomzimba nokumamatheka.',
          isiXhosa: 'Ukuthetha ngomzimba, uncumo kunye nokujongana emehlweni.',
          Afrikaans: 'Kommunikasie deur liggaamstaal, oogkontak, glimlag, handgebare en voorkoms sonder woorde.',
          English: 'Messages sent without spoken words—eye contact, genuine smile, relaxed posture, and personal grooming.'
        }
      },
      {
        termEn: 'Telephone Etiquette',
        translations: {
          Xitsonga: 'Mahanyelo ya Riqingho',
          Sepedi: 'Mekgwa ya Mogala',
          isiZulu: 'Inhlonipho Yocingo',
          Tshivenda: 'Vhuthu ha Lutingo',
          Sesotho: 'Mekgwa ya Mohala',
          Setswana: 'Mekgwa ya Mogala',
          Siswati: 'Inhlonipho Yelucingo',
          isiNdebele: 'Ikambiso Yomtato',
          isiXhosa: 'Imithetho yeFowuni',
          Afrikaans: 'Telefoonetiket',
          English: 'Polite rules for answering and ending business calls'
        },
        meaningByLanguage: {
          Xitsonga: 'Ku hlamula riqingho ku nga si hundza 3 rings hi vito ra ndzhawu na rito ro nandziha.',
          Sepedi: 'Go araba mogala ka pela ka tlhompho le go ngwala molaetša gabotse.',
          isiZulu: 'Ukuphendula ucingo ngesizotha, usho igama lebhizinisi nelakho ngaphambi kokudlula ama-rings ama-3.',
          Tshivenda: 'U aravha lutingo nga thonifho na u ñwala mulaedza.',
          Sesotho: 'Ho araba mohala ka tlhompho le ka bonako.',
          Setswana: 'Go araba mogala ka bonako le ka maitseo.',
          Siswati: 'Kuphendvula lucingo ngesitfunti nangekusheshe.',
          isiNdebele: 'Ukuphendula umtato ngesithunzi nangokurhabako.',
          isiXhosa: 'Ukuphendula ifowuni ngembeko nangokukhawuleza (phambi kwe-rings ezi-3).',
          Afrikaans: 'Professionele telefoonhantering: antwoord binne 3 luie, identifiseer maatskappy en naam, en vra voordat iemand op wag geplaas word.',
          English: 'Standard professional phone protocol: answer within 3 rings, state company & name, take accurate messages, and ask before holding.'
        }
      },
      {
        termEn: 'LAST Complaint Method',
        translations: {
          Xitsonga: 'Maendlelo ya LAST yo Lulamisa Swirilo',
          Sepedi: 'Mokgwa wa LAST wa Dingongorego',
          isiZulu: 'Indlela ye-LAST Yezikhalazo',
          Tshivenda: 'Maitele a LAST a Mbilayelo',
          Sesotho: 'Mokgwa wa LAST wa Ditletlebo',
          Setswana: 'Mokgwa wa LAST wa Dingongorego',
          Siswati: 'Indlela ye-LAST Yetikhalo',
          isiNdebele: 'Indlela ye-LAST Yezinlingo',
          isiXhosa: 'Indlela ye-LAST Yezikhalazo',
          Afrikaans: 'LAST-klagtehanteringsmetode',
          English: 'Listen, Apologise, Solve, Thank'
        },
        meaningByLanguage: {
          Xitsonga: 'Yingisela (Listen), Kombela ku rivaleriwa (Apologise), Lulamisa (Solve), Khensa (Thank).',
          Sepedi: 'Theeletša (Listen), Kgopela tshwarelo (Apologise), Rarolla (Solve), Leboga (Thank).',
          isiZulu: 'Lalela (Listen), Xolisa (Apologise), Xazulula (Solve), Bonga (Thank).',
          Tshivenda: 'Thetshelesa, Humbela pfarelo, Tandulula, Livhuwa.',
          Sesotho: 'Mamela, Kopa tshwarelo, Rarolla, Leboha.',
          Setswana: 'Reetsa, Kopa maitshwarelo, Rarabolola, Leboga.',
          Siswati: 'Lalela, Colisa, Sombulula, Bonga.',
          isiNdebele: 'Lalela, Bawa ukulibalelwa, Rarulula, Thokoza.',
          isiXhosa: 'Mamela, Cela uxolo, Sombulula, Bulela.',
          Afrikaans: 'Luister sonder om in te meng, vra om verskoning, los die probleem op en bedank die gas vir terugvoer.',
          English: 'A 4-step hospitality formula for turning angry or disappointed guests into satisfied customers: Listen, Apologise, Solve, Thank.'
        }
      }
    ],
    workedExample: {
      title: 'Real South African Example: Handling an Overbooked Hotel Room Complaint in Sandton',
      scenario:
        'Mr Mokoena arrives tired at Protea Hotel Sandton at 20:30 after a delayed flight, only to hear that his pre-paid Standard Room was accidentally given to another guest. He raises his voice at the front desk. Show step-by-step how receptionist Zanele resolves this using the LAST method and professional communication.',
      steps: [
        'Step 1 (Body Language & Listen): Zanele keeps calm posture, maintains warm eye contact, never argues back, and listens fully while Mr Mokoena explains his frustration.',
        'Step 2 (Apologise sincerely): "I am truly sorry for this error after your delayed flight, Mr Mokoena. I understand why you are upset."',
        'Step 3 (Solve immediately): Zanele checks availability and upgrades Mr Mokoena to an Executive Suite at no extra charge (or arranges a free transfer + dinner at a sister 4-star hotel nearby if 100% full), plus offers a complimentary welcome drink.',
        'Step 4 (Thank & Follow-up): "Thank you for bringing this to my attention so we can fix it immediately." She asks a porter to carry his luggage and calls his room 15 minutes later to confirm he is comfortable.'
      ],
      finalAnswer:
        'Using calm non-verbal cues + Listen, Apologise, Solve (free room upgrade + welcome refreshment), and Thank turns a serious service failure into guest loyalty.'
    },
    practiceQuestions: [
      {
        number: 1,
        question:
          'Write a proper professional telephone greeting for receptionist Sipho answering an incoming call at Kruger Gate Lodge.',
        answer:
          '"Good morning, Kruger Gate Lodge, Sipho speaking. How may I assist you today?" (Answered within 3 rings with a friendly smile in the voice.)'
      },
      {
        number: 2,
        question:
          'List four personal grooming and appearance standards expected of a front-desk receptionist or tour guide.',
        answer:
          '1) Clean, ironed uniform with visible name badge; 2) Neat hair and clean trimmed nails; 3) Polished closed shoes; 4) Minimal jewellery/perfume and good personal hygiene.'
      }
    ],
    quickQuiz: [
      {
        number: 1,
        question: 'Within how many rings should a professional tourism business answer an incoming telephone call?',
        options: ['Within 10 rings', 'Within 3 rings', 'After 6 rings', 'Only when convenient'],
        correctIndex: 1,
        explanation: 'Hospitality best practice requires answering business calls within 3 rings.'
      },
      {
        number: 2,
        question: 'In the LAST complaint-handling model, what does the letter "S" stand for?',
        options: ['Smile', 'Shout', 'Solve', 'Switch'],
        correctIndex: 2,
        explanation: 'LAST stands for Listen, Apologise, Solve, Thank.'
      },
      {
        number: 3,
        question: 'Before placing a caller on hold while checking a booking, you should always:',
        options: [
          'Press hold immediately without saying anything',
          'Hang up and ask them to call back tomorrow',
          'Ask permission politely and explain briefly why',
          'Put the phone next to a radio'
        ],
        correctIndex: 2,
        explanation: 'Always ask "May I place you on hold for a moment while I check?" and wait for their reply.'
      },
      {
        number: 4,
        question: 'Which of the following is an example of POSITIVE non-verbal communication?',
        options: [
          'Crossing your arms and looking at your phone',
          'Warm eye contact, an open posture, and a genuine smile',
          'Chewing gum while greeting a guest',
          'Rolling your eyes when a guest asks a question'
        ],
        correctIndex: 1,
        explanation: 'Eye contact, open posture, and a genuine smile communicate respect and warmth.'
      },
      {
        number: 5,
        question: 'Why should tourism front-line staff avoid strong perfume and excessive jewellery?',
        options: [
          'Because guests might want to buy it',
          'To maintain a neat hygienic image and avoid distracting or triggering allergies in guests',
          'Because it slows down computer typing',
          'Because airlines ban necklaces'
        ],
        correctIndex: 1,
        explanation: 'Subtle grooming avoids guest allergies/distractions and keeps food & reception environments hygienic.'
      }
    ]
  }
];
