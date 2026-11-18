/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * LEVEL 2 — All 4 Chapters fully translated into all 11 official SA languages
 * Formulas & numbers stay exact across all languages.
 */

import { TextbookChapter } from './officeAdminTypes';

export const OFFICE_ADMIN_LEVEL_2_CHAPTERS: TextbookChapter[] = [
  {
    id: 'l2-ch1-office-data-processing',
    level: 2,
    chapterNumber: 1,
    chapterLabelByLanguage: {
      Xitsonga: 'Nexovian Level 2 • Ndzima 1',
      Sepedi: 'Nexovian Level 2 • Kgaolo 1',
      isiZulu: 'Nexovian Level 2 • Isahluko 1',
      Tshivenda: 'Nexovian Level 2 • Ndima 1',
      Sesotho: 'Nexovian Level 2 • Kgaolo 1',
      Setswana: 'Nexovian Level 2 • Kgaolo 1',
      Siswati: 'Nexovian Level 2 • Sehluko 1',
      isiNdebele: 'Nexovian Level 2 • Isigaba 1',
      isiXhosa: 'Nexovian Level 2 • Isahluko 1',
      Afrikaans: 'Nexovian Vlak 2 • Hoofstuk 1',
      English: 'Nexovian Level 2 • Chapter 1'
    },
    titleByLanguage: {
      Xitsonga: 'Ku Tirhisa Data ya Hofisi (Office Data Processing)',
      Sepedi: 'Tshepedišo ya Datha ya Ofisi (Office Data Processing)',
      isiZulu: 'Ukucutshungulwa Kwedatha Yehhovisi (Office Data Processing)',
      Tshivenda: 'U Shuma nga Datha ya Ofisi (Office Data Processing)',
      Sesotho: 'Tshebetso ya Data ya Ofisi (Office Data Processing)',
      Setswana: 'Tsamaiso ya Datha ya Ofisi (Office Data Processing)',
      Siswati: 'Kusebenta ngeDatha yeLihhovisi (Office Data Processing)',
      isiNdebele: 'Ukusetjenziswa Kwedatha Ye-ofisi (Office Data Processing)',
      isiXhosa: 'Ukuqhubekekiswa Kwedatha ye-Ofisi (Office Data Processing)',
      Afrikaans: 'Kantoordataverwerking (Office Data Processing)',
      English: 'Office Data Processing'
    },
    subtitleByLanguage: {
      Xitsonga: 'Ku thayipa, ku nghenisa mahungu (Data Capture), na ku hlayisa mafayela hi ririmi ra wena',
      Sepedi: 'Go thaepa, go tsenya tshedimošo (Data Capture), le go faela ka leleme la gago',
      isiZulu: 'Ukubhala ngokushesha, ukufaka idatha (Data Capture), nokufayla ngolimi lwakho',
      Tshivenda: 'U thaipha, u dzhenisa datha (Data Capture), na u vhulunga dzifaela nga luambo lwanu',
      Sesotho: 'Ho thaepa, ho kenya data (Data Capture), le ho boloka difaele ka puo ya hao',
      Setswana: 'Go tlanya, go tsenya datha (Data Capture), le go faela ka puo ya gago',
      Siswati: 'Kuthayipha, kufaka idatha (Data Capture), nekufayela ngelulwimi lwakho',
      isiNdebele: 'Ukutlola, ukufaka idatha (Data Capture), nokubeka amafayela ngelimi lakho',
      isiXhosa: 'Ukuchwetheza, ukufaka idatha (Data Capture), nokugcina iifayile ngolwimi lwakho',
      Afrikaans: 'Tikwerk, data-invoer en liassering in jou eie taal',
      English: 'Typing, Data Capture, Filing in your language'
    },
    summaryByLanguage: {
      Xitsonga:
        'Ku Tirhisa Data ya Hofisi hi Xitsonga: Ku tirhisa khompyuta ku thayipa matsalwa ya bindzu (MS Word), ku nghenisa mahungu handle ka swihoxo (data capture), ku hlaya tinhlayo eka Excel (=SUM, =AVERAGE), na ku hlayisa mafayela ya mapapila na ya khompyuta kahle ehofisini.',
      Sepedi:
        'Tshepedišo ya Datha ya Ofisi ka Sepedi: Go šomiša khomphutha go thaepa mangwalo a kgwebo (MS Word), go tsenya tshedimošo ntle le diphošo (data capture), go dira dipalo go Excel (=SUM, =AVERAGE), le go boloka difaele tša pampiri le tša khomphutha ka tshwanelo.',
      isiZulu:
        'Ukucutshungulwa Kwedatha Yehhovisi ngesiZulu: Ukusebenzisa ikhompyutha ukubhala amadokhumenti ebhizinisi (MS Word), ukufaka idatha ngokunemba (data capture), ukubala izibalo ku-Excel (=SUM, =AVERAGE), nokuhlela amafayela ephepha nawekhompyutha ngokucophelela.',
      Tshivenda:
        'U Shuma nga Datha ya Ofisi nga Tshivenda: U shumisa khomphyutha u thaipha manwalo a bindu (MS Word), u dzhenisa datha hu sina vhukhakhi, u vhalela kha Excel (=SUM, =AVERAGE), na u vhulunga dzifaela dza ofisi zwavhudi.',
      Sesotho:
        'Tshebetso ya Data ya Ofisi ka Sesotho: Ho sebedisa khomphutha ho thaepa ditokomane (MS Word), ho kenya data ka nepo, ho bala ka Excel (=SUM, =AVERAGE), le ho hlophisa difaele ofising.',
      Setswana:
        'Tsamaiso ya Datha ya Ofisi ka Setswana: Go dirisa khomphutha go tlanya makwalo (MS Word), go tsenya datha ka nepo, go bala mo Excel (=SUM, =AVERAGE), le go rulaganya difaele mo ofising.',
      Siswati:
        'Kusebenta ngeDatha yeLihhovisi ngeSiswati: Kusebentisa ikhompyutha kuthayipha emadokhumenti (MS Word), kufaka idatha ngco, kubala ku-Excel (=SUM, =AVERAGE), nekuhlela emafayela elihhovisi.',
      isiNdebele:
        'Ukusetjenziswa Kwedatha Ye-ofisi ngesiNdebele: Ukusebenzisa ikhompyutha ukutlola imitlolo (MS Word), ukufaka idatha ngokunemba, ukubala ku-Excel (=SUM, =AVERAGE), nokuhlela amafayela e-ofisini.',
      isiXhosa:
        'Ukuqhubekekiswa Kwedatha ye-Ofisi ngesiXhosa: Ukusebenzisa ikhompyutha ukuchwetheza amaxwebhu (MS Word), ukufaka idatha ngokuchanekileyo, ukubala kwi-Excel (=SUM, =AVERAGE), nokulungelelanisa iifayile e-ofisini.',
      Afrikaans:
        'Kantoordataverwerking in Afrikaans: Leer raaktik-spoed en akkuraatheid, akkurate data-invoer in vorms en databasisse, die formatering van besigheidsdokumente in MS Word, Excel-berekeninge (=SUM, =AVERAGE) en netjiese liassering.',
      English:
        'Office Data Processing teaches touch-typing speed and accuracy, accurate data capture into forms and databases, formatting business documents in MS Word, calculating totals in Excel (=SUM, =AVERAGE), and organising electronic and paper files.'
    },
    keyTerms: [
      {
        termEn: 'Data Capture',
        translations: {
          Xitsonga: 'Ku nghenisa mahungu eka khompyuta (Data Capture)',
          Sepedi: 'Go tsenya tshedimošo khomphutheng (Data Capture)',
          isiZulu: 'Ukufaka idatha kukhompyutha (Data Capture)',
          Tshivenda: 'U dzhenisa datha kha khomphyutha (Data Capture)',
          Sesotho: 'Ho kenya data khomphutheng (Data Capture)',
          Setswana: 'Go tsenya datha mo khomphutheng (Data Capture)',
          Siswati: 'Kufaka idatha kukhompyutha (Data Capture)',
          isiNdebele: 'Ukufaka idatha ekhompyutheni (Data Capture)',
          isiXhosa: 'Ukufaka idatha kwikhompyutha (Data Capture)',
          Afrikaans: 'Data-invoer (Data Capture)',
          English: 'Entering raw information accurately into a computer system'
        },
        meaningByLanguage: {
          Xitsonga: 'Ku thayipa kumbe ku nghenisa tinhlayo, mavito ya vakasitoma, na ti-invoice handle ka swihoxo.',
          Sepedi: 'Go thaepa goba go tsenya dipalo, maina a bareki, le di-invoice ntle le diphošo.',
          isiZulu: 'Ukubhala noma ukufaka izinombolo, imininingwane yamakhasimende, nama-invoice ngaphandle kwamaphutha.',
          Tshivenda: 'U thaipha kana u dzhenisa nomboro, zwidodombedzwa zwa vharengi, na dzi-invoice hu sina vhukhakhi.',
          Sesotho: 'Ho thaepa kapa ho kenya dipalo, dintlha tsa bareki, le di-invoice ntle le diphoso.',
          Setswana: 'Go tlanya kgotsa go tsenya dipalo, dintlha tsa bareki, le di-invoice kwantle ga diphoso.',
          Siswati: 'Kuthayipha nome kufaka tinombolo, imininingwane yemakhasimende, nema-invoice ngaphandle kwemaphutsa.',
          isiNdebele: 'Ukutlola namkha ukufaka iinomboro, imininingwana yabathengi, nama-invoice ngaphandle kweemphoso.',
          isiXhosa: 'Ukuchwetheza okanye ukufaka amanani, iinkcukacha zabathengi, nee-invoice ngaphandle kweempazamo.',
          Afrikaans: 'Om syfers, kliëntbesonderhede en fakture sonder foute in te tik of in te voer.',
          English: 'Typing or importing source figures, client details, or invoices without errors.'
        }
      },
      {
        termEn: 'Filing System',
        translations: {
          Xitsonga: 'Fambiselo ro hlayisa mafayela (Filing System)',
          Sepedi: 'Tsela ya go boloka difaele (Filing System)',
          isiZulu: 'Uhlelo lokufayla amafayela (Filing System)',
          Tshivenda: 'Maitele a u vhulunga dzifaela (Filing System)',
          Sesotho: 'Mokgwa wa ho boloka difaele (Filing System)',
          Setswana: 'Tsamaiso ya go faela (Filing System)',
          Siswati: 'Luhlelo lwekufayela (Filing System)',
          isiNdebele: 'Ihlelo lokubeka amafayela (Filing System)',
          isiXhosa: 'Inkqubo yokugcina iifayile (Filing System)',
          Afrikaans: 'Liasseerstelsel (Filing System)',
          English: 'Organised storage (alphabetical, numerical, or date order)'
        },
        meaningByLanguage: {
          Xitsonga: 'Ku veka matsalwa hi nxaxamelo (A–Z, tinhlayo, kumbe masiku) leswaku vatirhi va kuma fayela hi kuhatlisa.',
          Sepedi: 'Go rulaganya mangwalo ka tatelano (A–Z, dipalo, goba matšatši) gore bašomi ba hwetše faele ka pela.',
          isiZulu: 'Ukuhlela amadokhumenti ngokulandelana (A–Z, izinombolo, noma izinsuku) ukuze abasebenzi bathole ifayela ngemizuzwana.',
          Tshivenda: 'U dzudzanya manwalo nga mutevhe (A–Z, nomboro, kana maduvha) uri vhashumi vha wane faela nga u tavhanya.',
          Sesotho: 'Ho hlophisa ditokomane ka tatelano hore basebetsi ba fumane faele kapele.',
          Setswana: 'Go rulaganya makwalo ka tatelano gore badiri ba bone faele ka bonako.',
          Siswati: 'Kuhlela emadokhumenti ngekulandzelana kwentela tisebenti titfole lifayela ngekushesha.',
          isiNdebele: 'Ukuhlela imitlolo ngokulandelana ukuze abasebenzi bafumane ifayela msinyana.',
          isiXhosa: 'Ukulungelelanisa amaxwebhu ngokulandelelana ukuze abasebenzi bafumane ifayile ngokukhawuleza.',
          Afrikaans: 'Om dokumente stelselmatig te rangskik (A–Z, nommers of datums) sodat personeel enige lêer vinnig kry.',
          English: 'Arranging documents systematically so staff find any file in seconds.'
        }
      },
      {
        termEn: 'Touch Typing',
        translations: {
          Xitsonga: 'Ku thayipa u nga languti keyboard (Touch Typing)',
          Sepedi: 'Go thaepa o sa lebelele khiiboto (Touch Typing)',
          isiZulu: 'Ukubhala ngaphandle kokubuka ikhibhodi (Touch Typing)',
          Tshivenda: 'U thaipha u sa sedzi khibodo (Touch Typing)',
          Sesotho: 'Ho thaepa o sa shebe keyboard (Touch Typing)',
          Setswana: 'Go tlanya o sa lebe keyboard (Touch Typing)',
          Siswati: 'Kuthayipha ungabuki ikhibhodi (Touch Typing)',
          isiNdebele: 'Ukutlola ungaqali ikhibhodi (Touch Typing)',
          isiXhosa: 'Ukuchwetheza ungajongi ikhibhodi (Touch Typing)',
          Afrikaans: 'Raaktik (Touch Typing)',
          English: 'Typing accurately using all fingers on home row keys'
        },
        meaningByLanguage: {
          Xitsonga: 'Swi tlakusa rivilo ra WPM (marito hi minete) ku ri hava swihoxo swo tsala.',
          Sepedi: 'Go oketša lebelo la WPM (mantšu ka motsotso) ntle le diphošo tša mopeleto.',
          isiZulu: 'Kwakha isivinini se-WPM (amagama ngomzuzu) ngaphandle kwamaphutha esipelingi.',
          Tshivenda: 'Zwi engedza luvhilo lwa WPM (maipfi nga munithi) hu sina vhukhakhi ha u pela.',
          Sesotho: 'Ho eketsa lebelo la WPM ntle le diphoso tsa mopeleto.',
          Setswana: 'Go oketsa lobelo lwa WPM kwantle ga diphoso tsa mopeleto.',
          Siswati: 'Kwakha litubane le-WPM ngaphandle kwemaphutsa esipelingi.',
          isiNdebele: 'Kuthuthukisa isivinini se-WPM ngaphandle kweemphoso zokupeleda.',
          isiXhosa: 'Kwakha isantya se-WPM ngaphandle kweempazamo zopelo.',
          Afrikaans: 'Bou tikspoed (WPM) sonder spelfoute op.',
          English: 'Builds WPM (words per minute) speed with zero spelling mistakes.'
        }
      }
    ],
    workedExample: {
      questionByLanguage: {
        Xitsonga: 'Eka Excel, ku xavisiwa ka siku ehofisini ku le ka tisele B2 = 1200, B3 = 1800, B4 = 1500. Tsala fomula yo kuma (a) Ntsengo Hinkwawo wa Ku Xavisa (Total Sales) na (b) Xiringaniso xa Ku Xavisa (Average Sales).',
        Sepedi: 'Go Excel, dithekišo tša letšatši di ka go disele B2 = 1200, B3 = 1800, B4 = 1500. Ngwala fomula go hwetša (a) Palomoka ya Dithekišo (Total Sales) le (b) Palogare ya Dithekišo (Average Sales).',
        isiZulu: 'Ku-Excel, ukuthengisa kwansuku zonke kusemaselini u-B2 = 1200, B3 = 1800, B4 = 1500. Bhala i-formula yokuthola (a) Isamba Sokuthengisa (Total Sales) kanye (b) ne-Average Yokuthengisa (Average Sales).',
        Tshivenda: 'Kha Excel, thengiso dza duvha dzi kha dzisele B2 = 1200, B3 = 1800, B4 = 1500. Nwalani fomula ya u wana (a) Thengiso Yothe (Total Sales) na (b) Avharezhi ya Thengiso (Average Sales).',
        Sesotho: 'Ho Excel, dithekiso tsa letsatsi di ka hara disele tsa B2 = 1200, B3 = 1800, B4 = 1500. Ngola foromula ho fumana (a) Kakaretso ya Dithekiso (Total Sales) le (b) Karolelano (Average Sales).',
        Setswana: 'Mo Excel, dithekiso tsa letsatsi di mo diseleng tsa B2 = 1200, B3 = 1800, B4 = 1500. Kwala foromula go bona (a) Palogotlhe ya Dithekiso le (b) Palogare ya Dithekiso.',
        Siswati: 'Ku-Excel, kutsengisa kwemalanga onkhe kusetincwadzini B2 = 1200, B3 = 1800, B4 = 1500. Bhala ifomula yekutfola (a) Isamba Sekutsengisa ne (b) ne-Average Yekutsengisa.',
        isiNdebele: 'Ku-Excel, ukuthengisa kwelanga kusemaselini u-B2 = 1200, B3 = 1800, B4 = 1500. Tlola i-formula yokufumana (a) Isamba Sokuthengisa ne (b) ne-Average Yokuthengisa.',
        isiXhosa: 'Kwi-Excel, intengiso yemihla ngemihla ikwiiseli u-B2 = 1200, B3 = 1800, B4 = 1500. Bhala ifomula yokufumana (a) iTotal Sales kunye (b) ne-Average Sales.',
        Afrikaans: 'In Excel is daaglikse kantoorverkope in selle B2 = 1200, B3 = 1800, B4 = 1500. Skryf die formule om (a) Totale Verkope en (b) Gemiddelde Verkope te kry.',
        English: 'In Excel, daily office sales are in cells B2 = 1200, B3 = 1800, B4 = 1500. Write the formula to find (a) Total Sales and (b) Average Sales.'
      },
      stepsByLanguage: {
        Xitsonga: [
          'Sungula fomula yinwana na yinwana ya Excel hi xikombiso xa ku ringana (=).',
          '(a) Tirhisa SUM eka B2:B4 -> =SUM(B2:B4) = 1200 + 1800 + 1500 = 4500.',
          '(b) Tirhisa AVERAGE eka B2:B4 -> =AVERAGE(B2:B4) = 4500 / 3 = 1500.'
        ],
        Sepedi: [
          'Thoma fomula ye nngwe le ye nngwe ya Excel ka leswao la go lekana (=).',
          '(a) Šomiša SUM go B2:B4 -> =SUM(B2:B4) = 1200 + 1800 + 1500 = 4500.',
          '(b) Šomiša AVERAGE go B2:B4 -> =AVERAGE(B2:B4) = 4500 / 3 = 1500.'
        ],
        isiZulu: [
          'Qala yonke i-formula ye-Excel ngophawu lokulingana (=).',
          '(a) Sebenzisa u-SUM ku-B2:B4 -> =SUM(B2:B4) = 1200 + 1800 + 1500 = 4500.',
          '(b) Sebenzisa u-AVERAGE ku-B2:B4 -> =AVERAGE(B2:B4) = 4500 / 3 = 1500.'
        ],
        Tshivenda: [
          'Thomani fomula inwe na inwe ya Excel nga tshiga tsha u lingana (=).',
          '(a) Shumisa SUM kha B2:B4 -> =SUM(B2:B4) = 1200 + 1800 + 1500 = 4500.',
          '(b) Shumisa AVERAGE kha B2:B4 -> =AVERAGE(B2:B4) = 4500 / 3 = 1500.'
        ],
        Sesotho: [
          'Qala foromula e nngwe le e nngwe ya Excel ka letshwao la ho lekana (=).',
          '(a) Sebedisa SUM ho B2:B4 -> =SUM(B2:B4) = 1200 + 1800 + 1500 = 4500.',
          '(b) Sebedisa AVERAGE ho B2:B4 -> =AVERAGE(B2:B4) = 4500 / 3 = 1500.'
        ],
        Setswana: [
          'Simolola foromula nngwe le nngwe ya Excel ka letshwao la go lekana (=).',
          '(a) Dirisa SUM mo B2:B4 -> =SUM(B2:B4) = 1200 + 1800 + 1500 = 4500.',
          '(b) Dirisa AVERAGE mo B2:B4 -> =AVERAGE(B2:B4) = 4500 / 3 = 1500.'
        ],
        Siswati: [
          'Cala yonkhe ifomula ye-Excel ngeluphawu lwekulingana (=).',
          '(a) Sebentisa SUM ku-B2:B4 -> =SUM(B2:B4) = 1200 + 1800 + 1500 = 4500.',
          '(b) Sebentisa AVERAGE ku-B2:B4 -> =AVERAGE(B2:B4) = 4500 / 3 = 1500.'
        ],
        isiNdebele: [
          'Thoma i-formula yoke ye-Excel ngophawu lokulingana (=).',
          '(a) Sebenzisa u-SUM ku-B2:B4 -> =SUM(B2:B4) = 1200 + 1800 + 1500 = 4500.',
          '(b) Sebenzisa u-AVERAGE ku-B2:B4 -> =AVERAGE(B2:B4) = 4500 / 3 = 1500.'
        ],
        isiXhosa: [
          'Qala yonke ifomula ye-Excel ngophawu lokulingana (=).',
          '(a) Sebenzisa u-SUM ku-B2:B4 -> =SUM(B2:B4) = 1200 + 1800 + 1500 = 4500.',
          '(b) Sebenzisa u-AVERAGE ku-B2:B4 -> =AVERAGE(B2:B4) = 4500 / 3 = 1500.'
        ],
        Afrikaans: [
          'Begin elke Excel-formule met ’n gelykaanteken (=).',
          '(a) Gebruik SUM oor reeks B2:B4 -> =SUM(B2:B4) = 1200 + 1800 + 1500 = 4500.',
          '(b) Gebruik AVERAGE oor B2:B4 -> =AVERAGE(B2:B4) = 4500 / 3 = 1500.'
        ],
        English: [
          'Start every Excel formula with an equals sign (=).',
          '(a) Use SUM across the range B2:B4 -> =SUM(B2:B4) = 1200 + 1800 + 1500 = 4500.',
          '(b) Use AVERAGE across B2:B4 -> =AVERAGE(B2:B4) = 4500 / 3 = 1500.'
        ]
      },
      finalAnswerByLanguage: {
        Xitsonga: '(a) =SUM(B2:B4) yi nyika 4500  |  (b) =AVERAGE(B2:B4) yi nyika 1500',
        Sepedi: '(a) =SUM(B2:B4) e fa 4500  |  (b) =AVERAGE(B2:B4) e fa 1500',
        isiZulu: '(a) =SUM(B2:B4) inika u-4500  |  (b) =AVERAGE(B2:B4) inika u-1500',
        Tshivenda: '(a) =SUM(B2:B4) i fha 4500  |  (b) =AVERAGE(B2:B4) i fha 1500',
        Sesotho: '(a) =SUM(B2:B4) e fana ka 4500  |  (b) =AVERAGE(B2:B4) e fana ka 1500',
        Setswana: '(a) =SUM(B2:B4) e naya 4500  |  (b) =AVERAGE(B2:B4) e naya 1500',
        Siswati: '(a) =SUM(B2:B4) inika 4500  |  (b) =AVERAGE(B2:B4) inika 1500',
        isiNdebele: '(a) =SUM(B2:B4) inikela 4500  |  (b) =AVERAGE(B2:B4) inikela 1500',
        isiXhosa: '(a) =SUM(B2:B4) inika u-4500  |  (b) =AVERAGE(B2:B4) inika u-1500',
        Afrikaans: '(a) =SUM(B2:B4) gee 4500  |  (b) =AVERAGE(B2:B4) gee 1500',
        English: '(a) =SUM(B2:B4) gives 4500  |  (b) =AVERAGE(B2:B4) gives 1500'
      }
    },
    practiceQuestions: [
      {
        number: 1,
        questionByLanguage: {
          Xitsonga: 'Xivutiso 1 (Nexovian): Boxa tindlela ta 3 to hlayisa mafayela (filing methods) leti tirhisiwaka ehofisini.',
          Sepedi: 'Potšišo 1 (Nexovian): Bolela mekgwa e 3 ya go faela difaele (filing methods) yeo e šomišwago ka ofising.',
          isiZulu: 'Umbuzo 1 (Nexovian): Yisho izindlela ezi-3 zokufayla (filing methods) ezisetshenziswa ehhovisi.',
          Tshivenda: 'Mbudziso 1 (Nexovian): Bulani maitele a 3 a u vhulunga dzifaela a shumiswaho ofisini.',
          Sesotho: 'Potso 1 (Nexovian): Bolela mekgwa e 3 ya ho boloka difaele e sebediswang ofising.',
          Setswana: 'Potso 1 (Nexovian): Umaka mekgwa e 3 ya go faela e e dirisiwang mo ofising.',
          Siswati: 'Umbuto 1 (Nexovian): Shano tindlela leti-3 tekufayela letisetjentiswa ehhovisi.',
          isiNdebele: 'Umbuzo 1 (Nexovian): Tjho iindlela ezi-3 zokufayela ezisetjenziswa e-ofisini.',
          isiXhosa: 'Umbuzo 1 (Nexovian): Xela iindlela ezi-3 zokugcina iifayile ezisetyenziswa e-ofisini.',
          Afrikaans: 'Vraag 1 (Nexovian): Noem 3 liasseermetodes wat in ’n kantoor gebruik word.',
          English: 'Nexovian Chapter Practice Q1: Name 3 filing methods used in an office.'
        },
        answerByLanguage: {
          Xitsonga: '1. Ku hlayisa hi tinhlayo ta maletere (Alphabetical A–Z hi xivongo/vito ra khampani). 2. Ku hlayisa hi tinomboro (Numerical hi nomboro ya akhawunti/invoice). 3. Ku hlayisa hi masiku (Chronological hi siku).',
          Sepedi: '1. Go faela ka tlhaka (Alphabetical A–Z ka sefane/khampani). 2. Go faela ka dinomoro (Numerical ka akhaonto/invoice). 3. Go faela ka matšatši (Chronological ka letšatši).',
          isiZulu: '1. Ukufayla ngama-alfabhethi (Alphabetical A–Z ngesibongo/igama lenkampani). 2. Ukufayla ngezinombolo (Numerical ngenombolo ye-akhawunti/invoice). 3. Ukufayla ngokwezinsuku (Chronological ngosuku).',
          Tshivenda: '1. U vhulunga nga alifabeta (Alphabetical A–Z nga tshifani/dzina la khamphani). 2. Nga nomboro (Numerical nga akhaunthu/invoice). 3. Nga maduvha (Chronological nga datumu).',
          Sesotho: '1. Ka ditlhaku (Alphabetical A–Z ka fane/khamphani). 2. Ka dinomoro (Numerical ka akhaonto/invoice). 3. Ka matsatsi (Chronological ka letsatsi).',
          Setswana: '1. Ka ditlhaka (Alphabetical A–Z ka sefane/khamphani). 2. Ka dinomoro (Numerical ka akhaonto/invoice). 3. Ka matlha (Chronological ka letlha).',
          Siswati: '1. Ngeku landzelana kwetinhlavu (Alphabetical A–Z ngesibongo). 2. Ngetinombolo (Numerical nge-invoice). 3. Ngemalanga (Chronological ngelusuku).',
          isiNdebele: '1. Ngokulandelana kwamaledere (Alphabetical A–Z ngesibongo). 2. Ngeenomboro (Numerical nge-akhawundi/invoice). 3. Ngamalanga (Chronological ngelanga).',
          isiXhosa: '1. Ngokwealfabhethi (Alphabetical A–Z ngefani/inkampani). 2. Ngamanani (Numerical nge-akhawunti/invoice). 3. Ngemihla (Chronological ngomhla).',
          Afrikaans: '1. Alfabetiese liassering (A–Z volgens van/maatskappy). 2. Numeriese liassering (rekening- of faktuurnommer). 3. Chronologiese liassering (volgens datum).',
          English: '1. Alphabetical filing (A–Z by surname/company name). 2. Numerical filing (by account/invoice number). 3. Chronological filing (arranged by date).'
        }
      },
      {
        number: 2,
        questionByLanguage: {
          Xitsonga: 'Xivutiso 2 (Nexovian): Hikwalaho ka yini ku pakanisa (accuracy) ku ri ka nkoka ku tlula rivilo ntsena loko ku nghenisiwa mahungu (data capture)?',
          Sepedi: 'Potšišo 2 (Nexovian): Ke ka lebaka la eng nepagalo (accuracy) e le bohlokwa go feta lebelo fela nakong ya go tsenya tshedimošo (data capture)?',
          isiZulu: 'Umbuzo 2 (Nexovian): Kungani ukunemba (accuracy) kubaluleke kakhulu kunesivinini nje kuphela uma ufaka idatha (data capture)?',
          Tshivenda: 'Mbudziso 2 (Nexovian): Ndi ngani vhukuma (accuracy) vhu ha ndeme u fhira luvhilo fhedzi musi hu tshi dzheniswa datha?',
          Sesotho: 'Potso 2 (Nexovian): Ke hobaneng ha nepo (accuracy) e le bohlokwa ho feta lebelo feela ha ho kengwa data?',
          Setswana: 'Potso 2 (Nexovian): Ke ka ntlha ya eng nepo e le botlhokwa go feta lobelo fela fa go tsenngwa datha?',
          Siswati: 'Umbuto 2 (Nexovian): Kungani kunemba kubaluleke kakhulu kunelitubane nje nawufaka idatha?',
          isiNdebele: 'Umbuzo 2 (Nexovian): Kubayini ukunemba kuqakatheke ukudlula isivinini kwaphela nawufaka idatha?',
          isiXhosa: 'Umbuzo 2 (Nexovian): Kutheni uchaneko lubaluleke ngaphezu kwesantya kuphela xa ufaka idatha?',
          Afrikaans: 'Vraag 2 (Nexovian): Waarom is akkuraatheid tydens data-invoer belangriker as spoed alleen?',
          English: 'Nexovian Chapter Practice Q2: Why is accuracy more important than raw speed during data capture?'
        },
        answerByLanguage: {
          Xitsonga: 'Tinhlayo kumbe mavito lama hoxekeke ma vanga ti-invoice leti hoxekeke, swihoxo swa miholo (payroll), na ku lahleka ka tirhekodo ("Garbage In, Garbage Out"). Minkarhi hinkwayo kambela endzhaku ko nghenisa.',
          Sepedi: 'Dipalo goba maina ao a fošagetšego a hlola di-invoice tše di fošagetšego, diphošo tša meputso (payroll), le go lahlega ga direkhoto ("Garbage In, Garbage Out"). Ka mehla hlahloba ka morago ga go tsenya.',
          isiZulu: 'Izinombolo noma amagama angalungile abangela ama-invoice anamaphutha, amaphutha emholweni (payroll), nokulahleka kwamarekhodi ("Garbage In, Garbage Out"). Hlala uhlola ngemva kokufaka.',
          Tshivenda: 'Nomboro kana madzina a re na vhukhakhi zwi bveledza dzi-invoice dzi si dzavhudi, vhukhakhi ha miholo (payroll), na u xela ha dzirekhodo. Tshifhinga tshothe tolani nga murahu ha u dzhenisa.',
          Sesotho: 'Dipalo kapa mabitso a fosahetseng a baka di-invoice tse fosahetseng, diphoso tsa meputso, le ho lahleha ha direkoto. Kamehla lekola kamora ho kenya.',
          Setswana: 'Dipalo kgotsa maina a a phoso a baka di-invoice tse di phoso, diphoso tsa dituelo, le go latlhega ga direkoto. Ka metlha tlhola morago ga go tsenya.',
          Siswati: 'Tinombolo nome emagama langakalungi abangela ema-invoice lanemaphutsa, emaphutsa emholweni, nekulahleka kwemarekhodi. Hlala uhlola ngemuva kwekufaka.',
          isiNdebele: 'Iinomboro namkha amagama angakalungi abangela ama-invoice anamaphoso, amaphoso emholweni, nokulahleka kwamarekhodi. Hlala uhlola ngemva kokufaka.',
          isiXhosa: 'Amanani okanye amagama angachanekanga abangela ii-invoice eziphosakeleyo, iimpazamo zemivuzo, nokulahleka kweerekhodi. Hlala uhlola emva kokufaka.',
          Afrikaans: 'Verkeerde syfers of name veroorsaak foutiewe fakture, betaalstaatfoute en verlore rekords ("Garbage In, Garbage Out"). Lees altyd proef ná invoer.',
          English: 'Wrong numbers or names cause incorrect invoices, payroll errors, and lost records ("Garbage In, Garbage Out"). Always proofread after capturing.'
        }
      }
    ]
  },
  {
    id: 'l2-ch2-business-practice',
    level: 2,
    chapterNumber: 2,
    chapterLabelByLanguage: {
      Xitsonga: 'Nexovian Level 2 • Ndzima 2',
      Sepedi: 'Nexovian Level 2 • Kgaolo 2',
      isiZulu: 'Nexovian Level 2 • Isahluko 2',
      Tshivenda: 'Nexovian Level 2 • Ndima 2',
      Sesotho: 'Nexovian Level 2 • Kgaolo 2',
      Setswana: 'Nexovian Level 2 • Kgaolo 2',
      Siswati: 'Nexovian Level 2 • Sehluko 2',
      isiNdebele: 'Nexovian Level 2 • Isigaba 2',
      isiXhosa: 'Nexovian Level 2 • Isahluko 2',
      Afrikaans: 'Nexovian Vlak 2 • Hoofstuk 2',
      English: 'Nexovian Level 2 • Chapter 2'
    },
    titleByLanguage: {
      Xitsonga: 'Maendlelo ya Bindzu (Business Practice)',
      Sepedi: 'Tshepedišo ya Kgwebo (Business Practice)',
      isiZulu: 'Ukwenza Kwebhizinisi (Business Practice)',
      Tshivenda: 'Maitele a Bindu (Business Practice)',
      Sesotho: 'Tshebetso ya Kgwebo (Business Practice)',
      Setswana: 'Tsamaiso ya Kgwebo (Business Practice)',
      Siswati: 'Kusebenta kweLibhizinisi (Business Practice)',
      isiNdebele: 'Iindlela Zebhizinisi (Business Practice)',
      isiXhosa: 'Ukusebenza Kwezoshishino (Business Practice)',
      Afrikaans: 'Besigheidspraktyk (Business Practice)',
      English: 'Business Practice'
    },
    subtitleByLanguage: {
      Xitsonga: 'I yini Bindzu, Mixaka ya Mabindzu, Vuhlanganisi bya Bindzu & Vukorhokeri bya Vakasitoma',
      Sepedi: 'Ke eng Kgwebo, Mehuta ya Dikgwebo, Kgokagano ya Kgwebo & Tlhokomelo ya Bareki',
      isiZulu: 'Yini Ibhizinisi, Izinhlobo Zamabhizinisi, Ukuxhumana Kwebhizinisi & Ukunakekela Amakhasimende',
      Tshivenda: 'Ndi mini Bindu, Tshakha dza Mabindu, Vhukwamani ha Bindu & Tshumelo ya Vharengi',
      Sesotho: 'Ke eng Kgwebo, Mefuta ya Dikgwebo, Puisano ya Kgwebo & Tshebeletso ya Bareki',
      Setswana: 'Ke eng Kgwebo, Mefuta ya Dikgwebo, Puisano ya Kgwebo & Tlhokomelo ya Bareki',
      Siswati: 'Yini Libhizinisi, Tinhlobo Temabhizinisi, Kuchumana Kwebhizinisi & Kunakekela Emakhasimende',
      isiNdebele: 'Kuyini Ibhizinisi, Imihlobo Yamabhizinisi, Ukuthintana Kwebhizinisi & Ukusizwa Kwabathengi',
      isiXhosa: 'Yintoni Ishishini, Iintlobo Zamashishini, Unxibelelwano Lweshishini & Inkonzo Yabathengi',
      Afrikaans: 'Wat is ’n Besigheid, Tipes Besighede, Besigheidskommunikasie & Kliëntediens',
      English: 'What is a Business, Types of Businesses, Business Communication & Customer Service'
    },
    summaryByLanguage: {
      Xitsonga:
        'Bindzu i nhlangano lowu humesaka kumbe ku xavisa swilo na vukorhokeri ku enerisa swilaveko swa vakasitoma no kuma bindzu (profit). Mixaka ya mabindzu eAfrika Dzonga yi katsa Sole Proprietor (n’wini un’we), Partnership (van’wini va 2–20), Private Company ((Pty) Ltd), na Non-Profit Organisation (NPO). Vuhlanganisi bya bindzu (ti-imeyili, memo, mapapila, riqingho) na vukorhokeri lebyinene eka vakasitoma swi lulamisa swivilelo hi rirhandzu no aka ku tshembeka.',
      Sepedi:
        'Kgwebo ke mokgatlo wo o tšweletšago goba o rekišago dithoto le ditirelo go kgotsofatša dinyakwa tša bareki le go dira poelo (profit). Mehuta ya dikgwebo mo Afrika Borwa e akaretša Sole Proprietor (mong o tee), Partnership (balekane ba 2–20), Private Company ((Pty) Ltd), le Non-Profit Organisation (NPO). Kgokagano ye botse ya kgwebo (diimeile, dimemo, mangwalo) le tlhokomelo ya bareki di rarolla dingongorego ka botho le go aga tshepo.',
      isiZulu:
        'Ibhizinisi yinhlangano ekhiqiza noma ethengisa impahla nezinsizakalo ukuze yanelise izidingo zamakhasimende futhi yenze inzuzo (profit). Izinhlobo zamabhizinisi eNingizimu Afrika zifaka i-Sole Proprietor (umnikazi o-1), i-Partnership (abalingani abayi-2–20), i-Private Company ((Pty) Ltd), ne-Non-Profit Organisation (NPO). Ukuxhumana kwebhizinisi okucacile kanye nokunakekela amakhasimende kuxazulula izikhalazo ngenhlonipho kwakhe ukwethembana.',
      Tshivenda:
        'Bindu ndi tshiimiswa tshine tsha bveledza kana u rengisa thundu na tshumelo u fusha thodea dza vharengi na u wana mbuelo (profit). Tshakha dza mabindu Afurika Tshipembe dzi katela Sole Proprietor (mune muthihi), Partnership (vhashumisani vha 2–20), Private Company ((Pty) Ltd), na Non-Profit (NPO). Vhukwamani havhudi ha bindu na tshumelo yavhudi kha vharengi zwi tandulula zwililo nga vhuthu.',
      Sesotho:
        'Kgwebo ke mokgatlo o hlahisang kapa o rekisang dihlahiswa le ditshebeletso ho kgotsofatsa bareki le ho etsa phaello. Mefuta ya dikgwebo e kenyeletsa Sole Proprietor, Partnership (2–20), Private Company ((Pty) Ltd), le Non-Profit (NPO). Puisano e hlakileng ya kgwebo le tshebeletso e ntle di rarolla ditletlebo ka bohlale.',
      Setswana:
        'Kgwebo ke mokgatlho o o dirang kgotsa o rekisang dithoto le ditirelo go kgotsofatsa bareki le go bona poelo. Mefuta ya dikgwebo ke Sole Proprietor, Partnership (2–20), Private Company ((Pty) Ltd), le Non-Profit (NPO). Puisano e e lolameng ya kgwebo le tlhokomelo ya bareki di rarabolola dingongorego sentle.',
      Siswati:
        'Libhizinisi yinhlangano lekhicita nome letsengisa timphahla netinsita kwentela kwenetisa tidzingo temakhasimende nekutfola inzuzo. Tinhlobo temabhizinisi tiyi-Sole Proprietor, i-Partnership (2–20), i-Private Company ((Pty) Ltd), ne-Non-Profit (NPO). Kuchumana lokucacile nekunakekela emakhasimende kwakha kwetsembana.',
      isiNdebele:
        'Ibhizinisi yihlangano ekhiqiza namkha ethengisa iimpahla neensiza ukwanelisa iindingo zabathengi nokuzuza inzuzo. Imihlobo yamabhizinisi yi-Sole Proprietor, i-Partnership (2–20), i-Private Company ((Pty) Ltd), ne-Non-Profit (NPO). Ukuthintana okuhle nokusiza abathengi kwakha ukuthembana.',
      isiXhosa:
        'Ishishini ngumbutho ovelisa okanye othengisa iimpahla neenkonzo ukufezekisa iimfuno zabathengi nokufumana inzuzo. Iintlobo zamashishini ziquka i-Sole Proprietor, i-Partnership (2–20), i-Private Company ((Pty) Ltd), ne-Non-Profit (NPO). Unxibelelwano olucacileyo kunye nenkonzo yabathengi yakha ukuthembana.',
      Afrikaans:
        '’n Besigheid produseer of verkoop goedere en dienste om kliëntebehoeftes te bevredig en wins te maak. Tipes sluit in Eenmansaak (1 eienaar), Vennootskap (2–20 vennote), Privaat Maatskappy ((Pty) Ltd) en NPO. Professionele kommunikasie en kliëntediens bou langtermyn-lojaliteit.',
      English:
        'A business is an organisation that produces or sells goods and services to satisfy customer needs and earn a profit. Key types of businesses in South Africa include Sole Proprietors (1 owner), Partnerships (2–20 partners), Private Companies ((Pty) Ltd), and Non-Profit Organisations (NPOs). Business Practice also teaches clear internal and external business communication (emails, memos, formal letters, verbal etiquette) and professional customer service that resolves complaints politely and builds long-term customer loyalty.'
    },
    keyTerms: [
      {
        termEn: 'Types of Businesses',
        translations: {
          Xitsonga: 'Mixaka ya Mabindzu (Sole Proprietor, Partnership, (Pty) Ltd)',
          Sepedi: 'Mehuta ya Dikgwebo (Sole Proprietor, Partnership, (Pty) Ltd)',
          isiZulu: 'Izinhlobo Zamabhizinisi (Sole Proprietor, Partnership, (Pty) Ltd)',
          Tshivenda: 'Tshakha dza Mabindu (Sole Proprietor, Partnership, (Pty) Ltd)',
          Sesotho: 'Mefuta ya Dikgwebo (Sole Proprietor, Partnership, (Pty) Ltd)',
          Setswana: 'Mefuta ya Dikgwebo (Sole Proprietor, Partnership, (Pty) Ltd)',
          Siswati: 'Tinhlobo Temabhizinisi (Sole Proprietor, Partnership, (Pty) Ltd)',
          isiNdebele: 'Imihlobo Yamabhizinisi (Sole Proprietor, Partnership, (Pty) Ltd)',
          isiXhosa: 'Iintlobo Zamashishini (Sole Proprietor, Partnership, (Pty) Ltd)',
          Afrikaans: 'Tipes Besighede (Eenmansaak, Vennootskap, (Pty) Ltd)',
          English: 'Legal forms of ownership such as Sole Trader, Partnership & (Pty) Ltd'
        },
        meaningByLanguage: {
          Xitsonga: 'Swi komba leswaku i mani n’wini wa bindzu, ndzalo wu aviwa njhani, na loyi a rhwala swikweleti (liability).',
          Sepedi: 'Di laetša gore mong wa kgwebo ke mang, poelo e arolwa bjang, le gore mang o rwala melato (liability).',
          isiZulu: 'Kunquma ukuthi ubani umnikazi webhizinisi, inzuzo ihlukaniswa kanjani, nokuthi ubani othwala izikweletu (liability).',
          Tshivenda: 'Zwi sumbedza uri mune wa bindu ndi nnyi, mbuelo i kovhekanyiwa hani, na uri ndi nnyi ane a hwala zwikolodo.',
          Sesotho: 'Ho bontsha hore monga kgwebo ke mang, phaello e arolwa jwang, mme ke mang ya jarang mekitlane.',
          Setswana: 'Go bontsha gore mong wa kgwebo ke mang, poelo e kgaoganngwa jang, le yo o rwalang melato.',
          Siswati: 'Kukhomba kutsi ngubani umnikati welibhizinisi, inzuzo yabiwa njani, nekutsi ngubani lotfwala tikweleti.',
          isiNdebele: 'Kuveza ukuthi ngubani umnikazi webhizinisi, inzuzo yabiwa njani, begodu ngubani othwala iinkolodo.',
          isiXhosa: 'Kuchaza ukuba ngubani umnini weshishini, inzuzo yabelwa njani, kwaye ngubani othwala amatyala.',
          Afrikaans: 'Bepaal wie die eienaar is, hoe wins gedeel word, en wie vir skuld aanspreeklik is (aanspreeklikheid).',
          English: 'Determines who owns the business, how profits are shared, and who carries debt risk (liability).'
        }
      },
      {
        termEn: 'Business Communication',
        translations: {
          Xitsonga: 'Vuhlanganisi bya Bindzu (Business Communication)',
          Sepedi: 'Kgokagano ya Kgwebo (Business Communication)',
          isiZulu: 'Ukuxhumana Kwebhizinisi (Business Communication)',
          Tshivenda: 'Vhukwamani ha Bindu (Business Communication)',
          Sesotho: 'Puisano ya Kgwebo (Business Communication)',
          Setswana: 'Puisano ya Kgwebo (Business Communication)',
          Siswati: 'Kuchumana Kwebhizinisi (Business Communication)',
          isiNdebele: 'Ukuthintana Kwebhizinisi (Business Communication)',
          isiXhosa: 'Unxibelelwano Lweshishini (Business Communication)',
          Afrikaans: 'Besigheidskommunikasie (Business Communication)',
          English: 'Clear, polite workplace messages (emails, memos, letters & calls)'
        },
        meaningByLanguage: {
          Xitsonga: 'Ku avelana mahungu lama pakanisaka exikarhi ka vatirhi (internal) na vakasitoma kumbe vaphakeri (external).',
          Sepedi: 'Go abelana tshedimošo ye e nepagetšego magareng ga bašomi (internal) le bareki goba baabi (external).',
          isiZulu: 'Ukwabelana ngolwazi oluqondile phakathi kwabasebenzi (internal) namakhasimende noma abahlinzeki (external).',
          Tshivenda: 'U kovhelana mafhungo a vhukuma vhukati ha vhashumi (internal) na vharengi kana vhadisi (external).',
          Sesotho: 'Ho fana ka tlhahisoleseding e nepahetseng pakeng tsa basebetsi (internal) le bareki (external).',
          Setswana: 'Go abelana tshedimosetso e e nepagetseng fa gare ga badiri (internal) le bareki (external).',
          Siswati: 'Kwabelana ngekwatiswa lokunembako emkhatsini wetisebenti (internal) nemakhasimende (external).',
          isiNdebele: 'Ukudluliselana ilwazi elinembako phakathi kwabasebenzi (internal) nabathengi (external).',
          isiXhosa: 'Ukwabelana ngolwazi oluchanekileyo phakathi kwabasebenzi (internal) nabathengi (external).',
          Afrikaans: 'Deel akkurate inligting tussen personeel (intern) en kliënte of verskaffers (ekstern).',
          English: 'Shares accurate information between staff (internal) and with customers or suppliers (external).'
        }
      },
      {
        termEn: 'Customer Service',
        translations: {
          Xitsonga: 'Vukorhokeri bya Vakasitoma (Customer Service)',
          Sepedi: 'Tlhokomelo ya Bareki (Customer Service)',
          isiZulu: 'Ukunakekelwa Kwamakhasimende (Customer Service)',
          Tshivenda: 'Tshumelo ya Vharengi (Customer Service)',
          Sesotho: 'Tshebeletso ya Bareki (Customer Service)',
          Setswana: 'Tlhokomelo ya Bareki (Customer Service)',
          Siswati: 'Kusebentela Emakhasimende (Customer Service)',
          isiNdebele: 'Ukusizwa Kwabathengi (Customer Service)',
          isiXhosa: 'Inkonzo yaBathengi (Customer Service)',
          Afrikaans: 'Kliëntediens (Customer Service)',
          English: 'Helping buyers politely before, during, and after a purchase'
        },
        meaningByLanguage: {
          Xitsonga: 'Swi aka ku tshembeka, swi endla vaxavi va vuya nakambe, no lulamisa swivilelo hi kuhatlisa.',
          Sepedi: 'Go aga tshepo, go dira gore bareki ba boe gape, le go rarolla dingongorego ka pela.',
          isiZulu: 'Kwakha ukwethembana, kwenza abathengi babuye futhi, kuxazulule izikhalazo ngokushesha.',
          Tshivenda: 'Zwi fhafula u fulufhedzana, zwi ita uri vharengi vha vhuye hafhu, zwa tandulula zwililo nga u tavhanya.',
          Sesotho: 'Ho haha tshepo, ho etsa hore bareki ba kgutle, le ho rarolla ditletlebo kapele.',
          Setswana: 'Go aga tshepo, go dira gore bareki ba boe, le go rarabolola dingongorego ka bonako.',
          Siswati: 'Kwakha kwetsembana, kwenta batsengi babuye futsi, nekucatulula tikhalo ngekushesha.',
          isiNdebele: 'Kwakha ukuthembana, kwenza abathengi babuye godu, begodu kusombulula iinghonghoyilo msinyana.',
          isiXhosa: 'Kwakha ukuthembana, kwenza abathengi babuye kwakhona, kwaye kusombulula izikhalazo ngokukhawuleza.',
          Afrikaans: 'Bou vertroue, verander eerste kopers in gereelde kliënte en los klagtes vinnig op.',
          English: 'Builds trust, turns first-time buyers into repeat clients, and resolves complaints fast.'
        }
      }
    ],
    workedExample: {
      questionByLanguage: {
        Xitsonga: 'Thabo na Nomsa va ni Partnership yo xavisa swilo swa hofisi. Thabo u vekile R30 000 kasi Nomsa u vekile R20 000, va ava ndzalo hi xiringaniso xa mali ya vona (3 : 2). Endzhaku ka vukorhokeri lebyinene, ndzalo ya n’hweti i R15 000. (a) Hlaya xiavelo xa un’wana na un’wana, na (b) boxa magoza ya 2 ya customer service loko odara yi hlwela.',
        Sepedi: 'Thabo le Nomsa ba na le Partnership ya dipampiri tša ofisi. Thabo o tsentše R30 000 mola Nomsa a tsentše R20 000, ba arolelana poelo ka tekanyo ya (3 : 2). Poelo ya kgwedi ke R15 000. (a) Balela karolo ya yo mongwe le yo mongwe, le (b) laetša dikgato tše 2 tša tlhokomelo ya bareki ge odara e diega.',
        isiZulu: 'UThabo noNomsa banobambiswano (Partnership) lwamaphepha ehhovisi. UThabo ufake u-R30 000 uNomsa wafaka u-R20 000, behlukanisa inzuzo nge-ratio ka-3 : 2. Inzuzo yenyanga ngu-R15 000. (a) Bala isabelo salowo nalowo, (b) ubhale izinyathelo ezi-2 zokunakekela ikhasimende uma i-oda lifika sekwephuze.',
        Tshivenda: 'Thabo na Nomsa vha na Partnership. Thabo o dzhenisa R30 000 ngeno Nomsa o dzhenisa R20 000, vha tshi kovhekana mbuelo nga ratio ya 3 : 2. Mbuelo ya nwedzi ndi R15 000. (a) Vhalelani mukovhe wa munwe na munwe, na (b) vha bule maga a 2 a tshumelo ya vharengi arali odara ya lenga.',
        Sesotho: 'Thabo le Nomsa ba na le Partnership. Thabo o tsetse R30 000 mme Nomsa R20 000, ba arolelana phaello ka ratio ya 3 : 2. Phaello ya kgwedi ke R15 000. (a) Bala karolo ya e mong le e mong, le (b) mehato e 2 ya tshebeletso ya bareki.',
        Setswana: 'Thabo le Nomsa ba na le Partnership. Thabo o tsentse R30 000 mme Nomsa R20 000, ba kgaogana poelo ka 3 : 2. Poelo ya kgwedi ke R15 000. (a) Bala karolo ya mongwe le mongwe, le (b) dikgato tse 2 tsa tlhokomelo ya bareki.',
        Siswati: 'Thabo naNomsa bane-Partnership. Thabo ufake R30 000 naNomsa wafaka R20 000, bahlukanisa inzuzo nge-3 : 2. Inzuzo yenyanga ngu-R15 000. (a) Bala sabelo semuntfu ngamunye, (b) netinyatselo leti-2 tekunakekela emakhasimende.',
        isiNdebele: 'UThabo noNomsa bane-Partnership. UThabo ufake R30 000 noNomsa wafaka R20 000, bahlukanisa inzuzo nge-3 : 2. Inzuzo yenyanga yi-R15 000. (a) Bala isabelo somunye nomunye, (b) namagadango ama-2 wokusiza abathengi.',
        isiXhosa: 'UThabo noNomsa bane-Partnership. UThabo ufake u-R30 000 uNomsa wafaka u-R20 000, besahlula inzuzo nge-3 : 2. Inzuzo yenyanga yi-R15 000. (a) Bala isabelo somntu ngamnye, (b) namanyathelo ama-2 enkonzo yabathengi.',
        Afrikaans: 'Thabo en Nomsa besit ’n Vennootskap (kapitaal R30 000 : R20 000 = 3 : 2). Maandelikse netto wins is R15 000. (a) Bereken elke vennoot se winsdeel, en (b) noem 2 kliëntediens-stappe as ’n bestelling laat is.',
        English: 'Thabo and Nomsa own a stationery Partnership. Thabo invested R30 000 and Nomsa invested R20 000, sharing profit in their capital ratio (3 : 2). After strong customer service, monthly net profit is R15 000. (a) Calculate each partner’s share of the profit, and (b) list 2 customer service steps if an order arrives late.'
      },
      stepsByLanguage: {
        Xitsonga: [
          'Hlanganisa swiyenge swa ratio: 3 + 2 = 5 swiyenge hinkwaswo.',
          '(a) Xiavelo xa Thabo = (3 ÷ 5) × R15 000 = R9 000. Xiavelo xa Nomsa = (2 ÷ 5) × R15 000 = R6 000. Kambela: R9 000 + R6 000 = R15 000.',
          '(b) Goza 1: Yingisela hi ku rhula u kombela ku rivaleriwa hi ntiyiso. Goza 2: Kambela ndzhawu ya delivery hi kuhatlisa u tiyisisa nkarhi wuntshwa kumbe ku cinca.'
        ],
        Sepedi: [
          'Hlakanya dikarolo tša ratio: 3 + 2 = 5 dikarolo ka moka.',
          '(a) Karolo ya Thabo = (3 ÷ 5) × R15 000 = R9 000. Karolo ya Nomsa = (2 ÷ 5) × R15 000 = R6 000. Hlahloba: R9 000 + R6 000 = R15 000.',
          '(b) Kgato 1: Theeletša ka go iketla gomme o kgopele tshwarelo ka potego. Kgato 2: Lekola delivery tracking ka pela o nee tharollo ye e kwagalago.'
        ],
        isiZulu: [
          'Hlanganisa izingxenye ze-ratio: 3 + 2 = 5 izingxenye zonke.',
          '(a) Isabelo sikaThabo = (3 ÷ 5) × R15 000 = R9 000. Isabelo sikaNomsa = (2 ÷ 5) × R15 000 = R6 000. Hlola: R9 000 + R6 000 = R15 000.',
          '(b) Isinyathelo 1: Lalela ngokuzola futhi uxolise ngobuqotho ngaphandle kokusola abanye. Isinyathelo 2: Bheka i-tracking ngokushesha bese uqinisekisa isixazululo esicacile.'
        ],
        Tshivenda: [
          'Tanganyani zwipida zwa ratio: 3 + 2 = 5 zwipida zwothe.',
          '(a) Mukovhe wa Thabo = (3 ÷ 5) × R15 000 = R9 000. Mukovhe wa Nomsa = (2 ÷ 5) × R15 000 = R6 000. Tolani: R9 000 + R6 000 = R15 000.',
          '(b) Liga 1: Thetshelesani nga u dzika ni humbele pfarelo. Liga 2: Sedzani delivery tracking nga u tavhanya ni nee thandululo.'
        ],
        Sesotho: [
          'Kopanya dikarolo tsa ratio: 3 + 2 = 5.',
          '(a) Karolo ya Thabo = (3 ÷ 5) × R15 000 = R9 000. Karolo ya Nomsa = (2 ÷ 5) × R15 000 = R6 000. Tekolo: R9 000 + R6 000 = R15 000.',
          '(b) Mohato 1: Mamela ka kgotso mme o kope tshwarelo. Mohato 2: Hlahloba delivery tracking hang-hang o fane ka tharollo.'
        ],
        Setswana: [
          'Kopanya dikarolo tsa ratio: 3 + 2 = 5.',
          '(a) Karolo ya Thabo = (3 ÷ 5) × R15 000 = R9 000. Karolo ya Nomsa = (2 ÷ 5) × R15 000 = R6 000. Tlhola: R9 000 + R6 000 = R15 000.',
          '(b) Kgato 1: Reetsa ka tidimalo o kope maitshwarelo. Kgato 2: Tlhola delivery tracking ka bonako o rarabolole.'
        ],
        Siswati: [
          'Hlanganisa tincenye te-ratio: 3 + 2 = 5.',
          '(a) Sabelo saThabo = (3 ÷ 5) × R15 000 = R9 000. Sabelo saNomsa = (2 ÷ 5) × R15 000 = R6 000. Hlola: R9 000 + R6 000 = R15 000.',
          '(b) Sinyatselo 1: Lalela ngekutfula bese uyacolisa. Sinyatselo 2: Bheka delivery tracking ngekushesha bese ucitsa inkinga.'
        ],
        isiNdebele: [
          'Hlanganisa iingcenye ze-ratio: 3 + 2 = 5.',
          '(a) Isabelo sakaThabo = (3 ÷ 5) × R15 000 = R9 000. Isabelo sakaNomsa = (2 ÷ 5) × R15 000 = R6 000. Hlola: R9 000 + R6 000 = R15 000.',
          '(b) Igadango 1: Lalela ngokuthula ubawe ukulibalelwa. Igadango 2: Qala i-tracking msinyana bese unikela isisombululo.'
        ],
        isiXhosa: [
          'Dibanisa iinxalenye ze-ratio: 3 + 2 = 5.',
          '(a) Isabelo sikaThabo = (3 ÷ 5) × R15 000 = R9 000. Isabelo sikaNomsa = (2 ÷ 5) × R15 000 = R6 000. Jonga: R9 000 + R6 000 = R15 000.',
          '(b) Inyathelo 1: Mamela ngokuzola ucele uxolo. Inyathelo 2: Jonga i-tracking ngokukhawuleza unike isisombululo.'
        ],
        Afrikaans: [
          'Tel die verhoudingsdele op: 3 + 2 = 5 totale dele.',
          '(a) Thabo se deel = (3 ÷ 5) × R15 000 = R9 000. Nomsa se deel = (2 ÷ 5) × R15 000 = R6 000. Kontrole: R9 000 + R6 000 = R15 000.',
          '(b) Stap 1: Luister kalm en vra opreg om verskoning. Stap 2: Gaan aflewering dadelik na en bevestig vervanging of nuwe afleweringstyd.'
        ],
        English: [
          'Add the ratio parts: 3 + 2 = 5 total parts.',
          '(a) Thabo’s share = (3 ÷ 5) × R15 000 = R9 000. Nomsa’s share = (2 ÷ 5) × R15 000 = R6 000. Check: R9 000 + R6 000 = R15 000.',
          '(b) Step 1: Listen calmly and apologise sincerely without blaming colleagues. Step 2: Check delivery tracking immediately and confirm a clear solution (express replacement or refund).'
        ]
      },
      finalAnswerByLanguage: {
        Xitsonga: '(a) Thabo = R9 000, Nomsa = R6 000  |  (b) Kombela ku rivaleriwa, landzelela odara u lulamisa hi kuhatlisa',
        Sepedi: '(a) Thabo = R9 000, Nomsa = R6 000  |  (b) Kgopela tshwarelo, lekola le go rarolla ka pela',
        isiZulu: '(a) UThabo = R9 000, UNomsa = R6 000  |  (b) Xolisa ngobuqotho, hlola bese uxazulula ngokushesha',
        Tshivenda: '(a) Thabo = R9 000, Nomsa = R6 000  |  (b) Humbelani pfarelo, sedzani ni tandulule nga u tavhanya',
        Sesotho: '(a) Thabo = R9 000, Nomsa = R6 000  |  (b) Kopa tshwarelo, hlahloba o rarolle hang-hang',
        Setswana: '(a) Thabo = R9 000, Nomsa = R6 000  |  (b) Kopa maitshwarelo, tlhola o rarabolole ka bonako',
        Siswati: '(a) Thabo = R9 000, Nomsa = R6 000  |  (b) Colisa ngalokucinile, hlola bese ucatulula ngekushesha',
        isiNdebele: '(a) UThabo = R9 000, UNomsa = R6 000  |  (b) Bawa ukulibalelwa, hlola bese usombulula msinyana',
        isiXhosa: '(a) UThabo = R9 000, UNomsa = R6 000  |  (b) Cela uxolo, jonga uze usombulule ngokukhawuleza',
        Afrikaans: '(a) Thabo = R9 000, Nomsa = R6 000  |  (b) Vra opreg verskoning, spoor op & los dadelik op',
        English: '(a) Thabo = R9 000, Nomsa = R6 000  |  (b) Apologise sincerely, track & resolve immediately'
      }
    },
    practiceQuestions: [
      {
        number: 1,
        questionByLanguage: {
          Xitsonga: 'Xivutiso 1 (Nexovian): Hlamusela ku hambana lokukulu exikarhi ka Sole Proprietor na Private Company ((Pty) Ltd).',
          Sepedi: 'Potšišo 1 (Nexovian): Hlaloša phapano ye kgolo magareng ga Sole Proprietor le Private Company ((Pty) Ltd).',
          isiZulu: 'Umbuzo 1 (Nexovian): Chaza umehluko omkhulu phakathi kwe-Sole Proprietor ne-Private Company ((Pty) Ltd).',
          Tshivenda: 'Mbudziso 1 (Nexovian): Talutshedzani phambano khulwane vhukati ha Sole Proprietor na Private Company ((Pty) Ltd).',
          Sesotho: 'Potso 1 (Nexovian): Hlalosa phapano e kgolo pakeng tsa Sole Proprietor le Private Company ((Pty) Ltd).',
          Setswana: 'Potso 1 (Nexovian): Tlhalosa pharologanyo e kgolo fa gare ga Sole Proprietor le Private Company ((Pty) Ltd).',
          Siswati: 'Umbuto 1 (Nexovian): Chaza umehluko lomkhulu emkhatsini we-Sole Proprietor ne-Private Company ((Pty) Ltd).',
          isiNdebele: 'Umbuzo 1 (Nexovian): Hlathulula umehluko omkhulu phakathi kwe-Sole Proprietor ne-Private Company ((Pty) Ltd).',
          isiXhosa: 'Umbuzo 1 (Nexovian): Cacisa umahluko ophambili phakathi kwe-Sole Proprietor ne-Private Company ((Pty) Ltd).',
          Afrikaans: 'Vraag 1 (Nexovian): Verduidelik die hoofverskil tussen ’n Eenmansaak (Sole Proprietor) en ’n Privaat Maatskappy ((Pty) Ltd).',
          English: 'Nexovian Chapter Practice Q1: Explain the main difference between a Sole Proprietor and a Private Company ((Pty) Ltd).'
        },
        answerByLanguage: {
          Xitsonga: 'Sole Proprietor yi ni n’wini un’we la rhwaka vutihlamuleri bya swikweleti swa bindzu hi yexe (unlimited liability). Private Company ((Pty) Ltd) i nhlangano wo tiyimela lowu nga wa van’wini va ti-share, naswona va ni limited liability.',
          Sepedi: 'Sole Proprietor e na le mong o tee yo a rwalago melato ya kgwebo ka noši (unlimited liability). Private Company ((Pty) Ltd) ke mokgatlo wo o ikemego wa beng-dišere bao ba nago le limited liability.',
          isiZulu: 'I-Sole Proprietor inobunikazi bomuntu o-1 obhekana nezikweletu zebhizinisi mathupha (unlimited liability). I-Private Company ((Pty) Ltd) yinhlangano ezimele yabanikazi bamasheya abane-limited liability.',
          Tshivenda: 'Sole Proprietor i na mune muthihi ane a hwala zwikolodo zwa bindu ene mune (unlimited liability). Private Company ((Pty) Ltd) ndi tshiimiswa tsho diimisaho nga tshothe tshine vhane vha tsho vha vha na limited liability.',
          Sesotho: 'Sole Proprietor e na le mong a le mong ya jarang mekitlane ka boyena (unlimited liability). Private Company ((Pty) Ltd) ke mokgatlo o ikemetseng o nang le limited liability.',
          Setswana: 'Sole Proprietor e na le mong a le mongwe yo o rwalang melato ka boene (unlimited liability). Private Company ((Pty) Ltd) ke mokgatlho o o ikemetseng o o nang le limited liability.',
          Siswati: 'I-Sole Proprietor inemnikati munye lotfwala tikweleti ngekwaso (unlimited liability). I-Private Company ((Pty) Ltd) yinhlangano letimele lene-limited liability.',
          isiNdebele: 'I-Sole Proprietor inomnikazi oyedwa othwala iinkolodo ngokwakhe (unlimited liability). I-Private Company ((Pty) Ltd) yihlangano ezijameleko ene-limited liability.',
          isiXhosa: 'I-Sole Proprietor inomntu omnye othwala amatyala ngokwakhe (unlimited liability). I-Private Company ((Pty) Ltd) ngumbutho ozimeleyo one-limited liability.',
          Afrikaans: '’n Eenmansaak het 1 eienaar wat persoonlik vir alle skuld aanspreeklik is (onbeperkte aanspreeklikheid). ’n Privaat Maatskappy ((Pty) Ltd) is ’n aparte regspersoon met beperkte aanspreeklikheid.',
          English: 'A Sole Proprietor is owned by 1 person and the owner is personally responsible (unlimited liability) for business debts. A Private Company ((Pty) Ltd) is a separate legal entity owned by shareholders, giving owners limited liability.'
        }
      },
      {
        number: 2,
        questionByLanguage: {
          Xitsonga: 'Xivutiso 2 (Nexovian): Hambanyisa vuhlanganisi bya le ndzeni (internal) na bya le handle (external) bya bindzu u nyika xikombiso xin’we eka rin’wana.',
          Sepedi: 'Potšišo 2 (Nexovian): Fapantšha kgokagano ya ka gare (internal) le ya ka ntle (external) ya kgwebo gomme o nee mohlala o 1 go ye nngwe le ye nngwe.',
          isiZulu: 'Umbuzo 2 (Nexovian): Hlukanisa phakathi kokuxhumana kwangaphakathi (internal) nokwangaphandle (external) kwebhizinisi unike isibonelo esingu-1 kokunye nokunye.',
          Tshivenda: 'Mbudziso 2 (Nexovian): Fhambanyani vhukwamani ha nga ngomu (internal) na ha nnda (external) ha bindu ni nee tsumbo nthihi kha tshinwe na tshinwe.',
          Sesotho: 'Potso 2 (Nexovian): Hlalosa phapano pakeng tsa puisano ya ka hare (internal) le ya ka ntle (external) ya kgwebo ka mohlala o 1.',
          Setswana: 'Potso 2 (Nexovian): Farologanya puisano ya ka fa gare (internal) le ya kwa ntle (external) ya kgwebo ka sekao se le 1.',
          Siswati: 'Umbuto 2 (Nexovian): Hlukanisa emkhatsini wekuchumana kwangekhatsi (internal) nekwangephandle (external) ngesibonelo si-1.',
          isiNdebele: 'Umbuzo 2 (Nexovian): Hlukanisa ukuthintana kwangaphakathi (internal) nokwangaphandle (external) ngesibonelo esiyi-1.',
          isiXhosa: 'Umbuzo 2 (Nexovian): Yahlula unxibelelwano lwangaphakathi (internal) nolwangaphandle (external) ngomzekelo o-1.',
          Afrikaans: 'Vraag 2 (Nexovian): Onderskei tussen interne en eksterne besigheidskommunikasie met 1 voorbeeld van elk.',
          English: 'Nexovian Chapter Practice Q2: Differentiate between internal and external business communication and give 1 example of each.'
        },
        answerByLanguage: {
          Xitsonga: 'Vuhlanganisi bya le ndzeni (internal) byi endleka endzeni ka khampani (xik: memo ya vatirhi kumbe nhlengeletano). Bya le handle (external) byi endleka na vanhu va le handle (xik: imeyili ya invoice eka mukasitoma kumbe papila ra odara eka muphakeri).',
          Sepedi: 'Kgokagano ya ka gare (internal) e direga ka gare ga khampani (mohlala: memo ya bašomi). Ya ka ntle (external) e direga le batho ba ka ntle (mohlala: imeile ya invoice go moreki goba odara go moabi).',
          isiZulu: 'Ukuxhumana kwangaphakathi (internal) kwenzeka ngaphakathi enkampanini (isib: i-memo yabasebenzi noma umhlangano). Okwangaphandle (external) kwenzeka nabantu abangaphandle (isib: i-imeyili ye-invoice eya ekhasimendeni noma incwadi ye-oda eya kumphakeli).',
          Tshivenda: 'Vhukwamani ha nga ngomu (internal) hu itea ngomu ha khamphani (tsumbo: memo ya vhashumi). Ha nnda (external) hu itea na vha re nnda (tsumbo: imeili ya invoice kha murengi kana linwalo kha mudisi).',
          Sesotho: 'Puisano ya ka hare (internal) e etsahala ka hare ho khamphani (mohlala: memo ya basebetsi). Ya ka ntle (external) e etsahala le bareki kapa bafani (mohlala: imeile ya invoice).',
          Setswana: 'Puisano ya ka fa gare (internal) e diragala mo teng ga khampani (memo ya badiri). Ya kwa ntle (external) e diragala le bareki kgotsa baabi (imeile ya invoice).',
          Siswati: 'Kuchumana kwangekhatsi (internal) kwenteka ngekhatsi kwinkampani (memo yetisebenti). Kwangephandle (external) kwenteka nemakhasimende (imeyili ye-invoice).',
          isiNdebele: 'Ukuthintana kwangaphakathi (internal) kwenzeka ngaphakathi kwekhampani (i-memo yabasebenzi). Kwangaphandle (external) kwenzeka nabathengi (i-imeyili ye-invoice).',
          isiXhosa: 'Unxibelelwano lwangaphakathi (internal) lwenzeka ngaphakathi kwinkampani (i-memo yabasebenzi). Olwangaphandle (external) lwenzeka nabathengi (i-imeyili ye-invoice).',
          Afrikaans: 'Interne kommunikasie vind binne die maatskappy plaas (bv. personeelmemo). Eksterne kommunikasie vind met buitestanders plaas (bv. faktuur per e-pos aan ’n kliënt).',
          English: 'Internal communication happens inside the organisation (e.g. a staff memo or team meeting). External communication happens with people outside the organisation (e.g. an invoice email to a customer or an order letter to a supplier).'
        }
      }
    ]
  },
  {
    id: 'l2-ch3-office-practice',
    level: 2,
    chapterNumber: 3,
    chapterLabelByLanguage: {
      Xitsonga: 'Nexovian Level 2 • Ndzima 3',
      Sepedi: 'Nexovian Level 2 • Kgaolo 3',
      isiZulu: 'Nexovian Level 2 • Isahluko 3',
      Tshivenda: 'Nexovian Level 2 • Ndima 3',
      Sesotho: 'Nexovian Level 2 • Kgaolo 3',
      Setswana: 'Nexovian Level 2 • Kgaolo 3',
      Siswati: 'Nexovian Level 2 • Sehluko 3',
      isiNdebele: 'Nexovian Level 2 • Isigaba 3',
      isiXhosa: 'Nexovian Level 2 • Isahluko 3',
      Afrikaans: 'Nexovian Vlak 2 • Hoofstuk 3',
      English: 'Nexovian Level 2 • Chapter 3'
    },
    titleByLanguage: {
      Xitsonga: 'Maendlelo ya Hofisi (Office Practice)',
      Sepedi: 'Tshepedišo ya Ofisi (Office Practice)',
      isiZulu: 'Imisebenzi Yehhovisi (Office Practice)',
      Tshivenda: 'Maitele a Ofisi (Office Practice)',
      Sesotho: 'Tshebetso ya Ofisi (Office Practice)',
      Setswana: 'Tsamaiso ya Ofisi (Office Practice)',
      Siswati: 'Imisebenti yeLihhovisi (Office Practice)',
      isiNdebele: 'Imisebenzi Ye-ofisi (Office Practice)',
      isiXhosa: 'Imisebenzi ye-Ofisi (Office Practice)',
      Afrikaans: 'Kantoorpraktyk (Office Practice)',
      English: 'Office Practice'
    },
    subtitleByLanguage: {
      Xitsonga: 'Ku amukela vaendzi (Reception), Tinhlengeletano, Mahanyelo ya Riqingho & Maendlelo ya Hofisi',
      Sepedi: 'Kamogelo ya Baeng (Reception), Dikopano, Maitseo a Mogala & Ditshepedišo tša Ofisi',
      isiZulu: 'Ukwamukela Izivakashi (Reception), Imihlangano, Inhlonipho Yocingo & Izinqubo Zehhovisi',
      Tshivenda: 'U Tanganedza Vhaeni (Reception), Mitangano, Mikhwa ya Lutingo & Maitele a Ofisi',
      Sesotho: 'Ho Amohela Baeti (Reception), Dikopano, Mekgwa ya Mohala & Ditsamaiso tsa Ofisi',
      Setswana: 'Go Amogela Baeng (Reception), Dikopano, Maitseo a Mogala & Ditsamaiso tsa Ofisi',
      Siswati: 'Kwemukela Tivakashi (Reception), Imihlangano, Inhlonipho Yelucingo & Imitsetfo Yeluhhovisi',
      isiNdebele: 'Ukwamukela Iimvakatjhi (Reception), Imihlangano, Ukuziphatha Emtatweni & Iinkambiso Ze-ofisi',
      isiXhosa: 'Ukwamkela Iindwendwe (Reception), Iintlanganiso, Imbeko Yefowuni & Iinkqubo Ze-ofisi',
      Afrikaans: 'Ontvangsdiens, Vergaderings, Telefoonetiket & Kantoorprosedures',
      English: 'Reception, Meetings, Telephone Etiquette & Office Procedures'
    },
    summaryByLanguage: {
      Xitsonga:
        'Maendlelo ya Hofisi hi Xitsonga: Mintirho ya hofisi ya siku na siku — ku amukela vaendzi hi xichavo e-reception na ku hlayisa Visitor Register, ku hlela tinhlengeletano (Notice, Agenda, Minutes), mahanyelo lamanene ya riqingho (ku hlamula eka 3 rings, ku tsala hungu hi ku helela), na maendlelo ya mapapila na vuhlayiseki bya hofisi.',
      Sepedi:
        'Tshepedišo ya Ofisi ka Sepedi: Mešomo ya ka mehla ya ofisi — go amogela baeng (reception) le go boloka Visitor Register, go beakanya dikopano (Notice, Agenda, Metsotso), maitseo a mogala (go araba pele ga ge mogala o lla gararo, go ngwala molaetša ka botlalo), le ditshepedišo tša poso le polokego.',
      isiZulu:
        'Imisebenzi Yehhovisi ngesiZulu: Imisebenzi yansuku zonke — ukwamukela izivakashi e-reception nokugcina i-Visitor Register, ukuhlela imihlangano (Notice, Agenda, Minutes), inhlonipho yocingo (ukuphendula ngaphakathi kwamaringi ama-3, ukubhala imiyalezo ngokuphelele), nezinqubo zeposi nokuphepha.',
      Tshivenda:
        'Maitele a Ofisi nga Tshivenda: Mishumo ya duvha linwe na linwe — u tanganedza vhaeni (reception) na Visitor Register, u dzudzanya mitangano (Notice, Agenda, Minitsi), mikhwa ya lutingo (u fhindula nga ngomu ha milingo miraru), na maitele a ofisi.',
      Sesotho:
        'Tshebetso ya Ofisi ka Sesotho: Ho amohela baeti (reception) le Visitor Register, ho hlophisa dikopano (Notice, Agenda, Metsotso), mekgwa e metle ya mohala (ho araba nakong ya 3 rings), le ditsamaiso tsa ofisi.',
      Setswana:
        'Tsamaiso ya Ofisi ka Setswana: Go amogela baeng le Visitor Register, go rulaganya dikopano (Notice, Agenda, Metsotso), maitseo a mogala (go araba mo 3 rings), le ditsamaiso tsa ofisi.',
      Siswati:
        'Imisebenti yeLihhovisi ngeSiswati: Kwemukela tivakashi ne-Visitor Register, kuhlela imihlangano (Notice, Agenda, Emaminitsi), inhlonipho yelucingo (kuphendvula kungakapheli 3 rings), nemitsetfo yeluhhovisi.',
      isiNdebele:
        'Imisebenzi Ye-ofisi ngesiNdebele: Ukwamukela iimvakatjhi ne-Visitor Register, ukuhlela imihlangano (Notice, Agenda, Amaminithi), ukuziphatha kuhle emtatweni (ukudobha ngaphakathi kwe-3 rings), neenkambiso ze-ofisi.',
      isiXhosa:
        'Imisebenzi ye-Ofisi ngesiXhosa: Ukwamkela iindwendwe ne-Visitor Register, ukucwangcisa iintlanganiso (Notice, Agenda, Minutes), imbeko yefowuni (ukuphendula phakathi kwe-3 rings), kunye neenkqubo ze-ofisi.',
      Afrikaans:
        'Kantoorpraktyk in Afrikaans: Daaglikse kantoorwerk — professionele ontvangs en besoekersregister, vergaderingbeplanning (kennisgewing, agenda en notule), telefoonetiket (beantwoord binne 3 luie) en veilige poshantering.',
      English:
        'Office Practice teaches essential daily office operations: professional front-desk reception (greeting visitors, keeping a Visitor Register, verifying appointments), organising formal meetings (Notice, Agenda, Minutes), telephone etiquette (answering within 3 rings, speaking clearly, recording complete message slips), and standard office procedures for incoming mail, equipment care, and workplace safety.'
    },
    keyTerms: [
      {
        termEn: 'Receptionist',
        translations: {
          Xitsonga: 'Muamukeri wa Vaendzi (Receptionist)',
          Sepedi: 'Moamogedi wa Baeng (Receptionist)',
          isiZulu: 'Umamukeli Wezivakashi (Receptionist)',
          Tshivenda: 'Mutanganedzi wa Vhaeni (Receptionist)',
          Sesotho: 'Moamohedi wa Baeti (Receptionist)',
          Setswana: 'Moamogedi wa Baeng (Receptionist)',
          Siswati: 'Umamukeli Wetivakashi (Receptionist)',
          isiNdebele: 'Umamukeli Weemvakatjhi (Receptionist)',
          isiXhosa: 'Umamkeli Weendwendwe (Receptionist)',
          Afrikaans: 'Ontvangsdame / Ontvangsbeampte',
          English: 'Front-desk professional greeting visitors and managing access'
        },
        meaningByLanguage: {
          Xitsonga: 'U hlayisa Visitor Register, u kambela ti-appointment, no komba xifaniso lexinene xa khampani.',
          Sepedi: 'O boloka Visitor Register, o lekola dikopano, gomme o bontšha seriti sa khampani.',
          isiZulu: 'Ugcina i-Visitor Register, ahlole ama-aphoyintimenti, futhi amele isithunzi esihle senkampani.',
          Tshivenda: 'U vhulunga Visitor Register, u tola zwiimiswa, na u sumbedza tshifanyiso tshavhudi tsha khamphani.',
          Sesotho: 'O boloka Visitor Register, o hlahloba di-appointment, mme o emela setshwantsho se setle sa khamphani.',
          Setswana: 'O boloka Visitor Register, o tlhola dikopano, le go emela seriti sa khampani.',
          Siswati: 'Ugcina i-Visitor Register, ahlole ema-aphoyintimenti, aphindze amele sitfombe lesihle senkampani.',
          isiNdebele: 'Ugcina i-Visitor Register, ahlole ama-aphoyintimenti, begodu aveze isithombe esihle sekhampani.',
          isiXhosa: 'Ugcina i-Visitor Register, ajonge iidinga, kwaye amele umfanekiso omhle wenkampani.',
          Afrikaans: 'Hou die besoekersregister by, bevestig afsprake en skep ’n goeie eerste indruk.',
          English: 'Keeps the Visitor Register, checks appointments, and creates a welcoming first impression.'
        }
      },
      {
        termEn: 'Agenda & Minutes',
        translations: {
          Xitsonga: 'Nongonoko wa Nhlengeletano & Matsalwa ya Yona (Agenda & Minutes)',
          Sepedi: 'Lenaneo la Kopano & Metsotso (Agenda & Minutes)',
          isiZulu: 'Uhlelo Lomhlangano & Amaminithi (Agenda & Minutes)',
          Tshivenda: 'Mbambadzo ya Mutangano & Minitsi (Agenda & Minutes)',
          Sesotho: 'Lenaneo la Kopano & Metsotso (Agenda & Minutes)',
          Setswana: 'Lenaane la Kopano & Metsotso (Agenda & Minutes)',
          Siswati: 'Luhlelo Lwemhlangano & Emaminitsi (Agenda & Minutes)',
          isiNdebele: 'Irhelo Lomhlangano & Amaminithi (Agenda & Minutes)',
          isiXhosa: 'IAjenda & Imizuzu yeNtlanganiso (Agenda & Minutes)',
          Afrikaans: 'Agenda & Notule (Agenda & Minutes)',
          English: 'Agenda = topic list before meeting; Minutes = official record after'
        },
        meaningByLanguage: {
          Xitsonga: 'Swi endla tinhlengeletano ti famba hi nkarhi no tsala swiboho hinkwaswo na vanhu lava faneleke ku swi endla.',
          Sepedi: 'Di boloka dikopano di le mo tseleng le go ngwala diphetho ka moka le bao ba swanetšego go di phetha.',
          isiZulu: 'Kugcina imihlangano isesikhathini futhi kubhale zonke izinqumo nabazozifeza.',
          Tshivenda: 'Zwi ita uri mitangano i dzule kha tshifhinga na u nwala tsheo dzothe.',
          Sesotho: 'Ho boloka dikopano di le nakong le ho ngola diqeto tsohle.',
          Setswana: 'Go boloka dikopano mo nakong le go kwala ditshwetso tsotlhe.',
          Siswati: 'Kugcina imihlangano isesikhatsini nekubhala tonkhe tincumo.',
          isiNdebele: 'Kugcina imihlangano isesikhathini nokutlola zoke iinqunto.',
          isiXhosa: 'Kugcina iintlanganiso zihamba ngexesha kwaye kubhala zonke izigqibo.',
          Afrikaans: 'Hou vergaderings betyds en teken alle besluite en verantwoordelike persone aan.',
          English: 'Keeps meetings on time and records exact decisions, voters, and action owners.'
        }
      },
      {
        termEn: 'Telephone Etiquette',
        translations: {
          Xitsonga: 'Mahanyelo Lamanene ya Riqingho (Telephone Etiquette)',
          Sepedi: 'Maitseo a go Bolela ka Mogala (Telephone Etiquette)',
          isiZulu: 'Inhlonipho Yocingo (Telephone Etiquette)',
          Tshivenda: 'Mikhwa Yavhudi ya Lutingo (Telephone Etiquette)',
          Sesotho: 'Mekgwa e Metle ya Mohala (Telephone Etiquette)',
          Setswana: 'Maitseo a go Bua mo Mogaleng (Telephone Etiquette)',
          Siswati: 'Inhlonipho Yelucingo (Telephone Etiquette)',
          isiNdebele: 'Ukuziphatha Kuhle Emtatweni (Telephone Etiquette)',
          isiXhosa: 'Imbeko Yefowuni (Telephone Etiquette)',
          Afrikaans: 'Telefoonetiket (Telephone Etiquette)',
          English: 'Polite rules for answering business calls & taking messages'
        },
        meaningByLanguage: {
          Xitsonga: 'Hlamula eka 3 rings, xeweta hi vito ra khampani na vito ra wena, n’wayitela loko u vulavula, u nga tshiki muhlami a rindzile ehandle ka mhaka.',
          Sepedi: 'Araba pele ga ge mogala o lla gararo (3 rings), dumediša ka leina la khampani le la gago, gomme o ngwale molaetša ka botlalo.',
          isiZulu: 'Phendula phakathi kwamaringi ama-3, bingelela ngegama lenkampani nelakho, umomotheke uma ukhuluma, ungashiyi oshaya ucingo elindile.',
          Tshivenda: 'Fhindulani nga ngomu ha milingo miraru (3 rings), reshani nga dzina la khamphani na dzina lanu, ni nwale mulaedza wothe.',
          Sesotho: 'Araba nakong ya 3 rings, dumedisa ka lebitso la khamphani le la hao, mme o ngole molaetsa ka botlalo.',
          Setswana: 'Araba mo 3 rings, dumedisa ka leina la khampani le la gago, o kwale molaetsa ka botlalo.',
          Siswati: 'Phendvula kungakapheli 3 rings, bingelela ngeligama lenkampani nelakho, ubhale umlayeto wonkhe.',
          isiNdebele: 'Dobha umtato ngaphakathi kwe-3 rings, lotjhisa ngebizo lekhampani nelakho, utlole umlayezo woke.',
          isiXhosa: 'Phendula phakathi kwe-3 rings, bulisa ngegama lenkampani nelakho, ubhale umyalezo wonke.',
          Afrikaans: 'Beantwoord binne 3 luie, groet met die maatskappy se naam en jou naam, en neem volledige boodskappe.',
          English: 'Answer within 3 rings, greet with company & your name, smile while speaking, and never leave callers on silent hold.'
        }
      }
    ],
    workedExample: {
      questionByLanguage: {
        Xitsonga: 'Mukasitoma u ba riqingho hi 09:15 a lava ku vulavula na Manana Mokoena (loyi a nga eka nhlengeletano ku fika hi 10:30). Endzhaku, u hlela nhlengeletano ya vatirhi ya timinete ta 90 leyi sungulaka hi 14:00 hi siku ra 21 November, naswona Notice yi rhumeriwa masiku ya 7 emahlweni. (a) Boxa magoza ya 3 ya telephone etiquette, na (b) hlaya nkarhi lowu nhlengeletano yi helaka ha wona na siku ro hetelela ro rhumela Notice.',
        Sepedi: 'Moreki o letša ka 09:15 a nyaka Ms Mokoena (yo a lego kopanong go fihla ka 10:30). Ka morago, o beakanya kopano ya metsotso e 90 yeo e thomago ka 14:00 ka la 21 November, gomme Notice e romelwa matšatši a 7 pele. (a) Bolela dikgato tše 3 tša maitseo a mogala, le (b) balela nako ye kopano e felago ka yona le letšatši la mafelelo la go romela Notice.',
        isiZulu: 'Ikhasimende lishaya ucingo ngo-09:15 lifuna uNksz Mokoena (osemhlanganweni kuze kube ngu-10:30). Ngemuva kwalokho, uhlela umhlangano wezisebenzi wemizuzu engama-90 oqala ngo-14:00 ngo-21 November, kanti i-Notice ithunyelwa ezinsukwini eziyisi-7 ngaphambili. (a) Yisho izinyathelo ezi-3 zenhlonipho yocingo, (b) ubale isikhathi umhlangano ophela ngaso nosuku lokugcina lokuthumela i-Notice.',
        Tshivenda: 'Murengi u lidza lutingo nga 09:15 a tshi toda Ms Mokoena (a re mutanganoni u swika 10:30). Nga murahu, ni dzudzanya mutangano wa minitsi dza 90 u thomaho nga 14:00 nga 21 November, Notice i tshi rumelwa maduvha a 7 phanda. (a) Bulani maga a 3 a mikhwa ya lutingo, na (b) tshifhinga tshine mutangano wa fhela ngatsho na datumu ya u rumela Notice.',
        Sesotho: 'Moreki o letsa ka 09:15 a batla Ms Mokoena (ya kopanong ho fihlela 10:30). Hamorao, o hlophisa kopano ya metsotso e 90 e qalang ka 14:00 ka la 21 November, ka Notice e romelwang matsatsi a 7 pele. (a) Fana ka mehato e 3 ya mohala, (b) bala nako ya ho qeta le letsatsi la Notice.',
        Setswana: 'Moreki o letsa ka 09:15 a batla Ms Mokoena (yo o kwa kopanong go fitlha 10:30). O rulaganya kopano ya metsotso e 90 e e simololang ka 14:00 ka 21 November, Notice e romelwa malatsi a 7 pele. (a) Umaka dikgato tse 3 tsa mogala, (b) bala nako ya go fetsa le letlha la Notice.',
        Siswati: 'Likhasimende lishaya lucingo nga-09:15 lifuna Ms Mokoena (losemhlanganweni kute kube ngu-10:30). Uhlela umhlangano wemaminitsi la-90 locala nga-14:00 nga-21 November, i-Notice itfunyelwe emalanga la-7 ngembili. (a) Shano tinyatselo leti-3 telucingo, (b) ubale sikhatsi sekuphela nelusuku lwe-Notice.',
        isiNdebele: 'Umthengi uthinta ngo-09:15 afuna uMs Mokoena (osemhlanganweni bekube ngu-10:30). Uhlela umhlangano wemizuzu ema-90 othoma ngo-14:00 ngo-21 November, i-Notice ithunyelwa amalanga asi-7 ngaphambili. (a) Tjho amagadango ama-3 womtato, (b) ubale isikhathi sokuphela nelanga le-Notice.',
        isiXhosa: 'Umthengi ufowuna ngo-09:15 efuna uMs Mokoena (osemtlanganisweni kude kube ngu-10:30). Ucwangcisa intlanganiso yemizuzu engama-90 eqala ngo-14:00 nge-21 November, i-Notice ithunyelwa iintsuku ezi-7 ngaphambili. (a) Xela amanyathelo ama-3 efowuni, (b) ubale ixesha lokuphela nomhla we-Notice.',
        Afrikaans: '’n Kliënt bel om 09:15 vir Me Mokoena (in vergadering tot 10:30). Jy skeduleer ook ’n 90-minute vergadering wat om 14:00 op 21 November begin (Kennisgewing 7 dae vooruit). (a) Noem 3 telefoonetiket-stappe, en (b) bereken eindtyd en Kennisgewingsdatum.',
        English: 'A client phones at 09:15 for Ms Mokoena (in a meeting until 10:30). Later, you schedule a 90-minute staff meeting starting at 14:00 on 21 November, sending the Notice 7 days early. (a) List 3 telephone etiquette actions to take on the call, and (b) calculate the afternoon meeting end time and the latest date to send the Notice.'
      },
      stepsByLanguage: {
        Xitsonga: [
          '(a) Hlamula eka 3 rings hi ku xeweta kahle ("Avuxeni, Hofisi ya Nexovian, i Sipho la vulavulaka, ndzi nga mi pfuna njhani?"), hlamusela leswaku Manana Mokoena u ta kumeka endzhaku ka 10:30, u tsala vito ra muhlami, nomboro, nkarhi (09:15), na hungu.',
          '(b) Nkarhi wo heta: 14:00 + timinete ta 90 (awara yi-1 na timinete ta 30) = 15:30.',
          'Siku ra Notice: 21 November − masiku ya 7 = 14 November.'
        ],
        Sepedi: [
          '(a) Araba pele ga ge mogala o lla gararo (3 rings) ka tumedišo ye botse ("Thobela, Ofisi ya Nexovian, ke Sipho yo a bolelago, nka le thuša bjang?"), o hlaloše gore Ms Mokoena o tla ba gona ka 10:30, gomme o ngwale leina la moletsi, nomoro, nako (09:15), le molaetša.',
          '(b) Nako ya go fetša: 14:00 + metsotso e 90 (iri e 1 le metsotso e 30) = 15:30.',
          'Letšatši la Notice: 21 November − matšatši a 7 = 14 November.'
        ],
        isiZulu: [
          '(a) Phendula phakathi kwamaringi ama-3 ngokubingelela ngemfudumalo ("Sawubona, ehhovisi le-Nexovian, nguSipho okhulumayo, ngingakusiza ngani?"), uchaze ukuthi uNksz Mokoena uzotholakala ngo-10:30, bese ubhala igama loshaye ucingo, inombolo, isikhathi (09:15), nomyalezo.',
          '(b) Isikhathi sokuphela: 14:00 + imizuzu engama-90 (ihora eli-1 nemizuzu engama-30) = 15:30.',
          'Usuku lwe-Notice: 21 November − izinsuku eziyisi-7 = 14 November.'
        ],
        Tshivenda: [
          '(a) Fhindulani nga ngomu ha milingo miraru nga u resha zwavhudi, ni taluse uri Ms Mokoena u do vha hone nga 10:30, ni nwale dzina la mufouni, nomboro, tshifhinga (09:15), na mulaedza.',
          '(b) Tshifhinga tsha u fhedza: 14:00 + minitsi dza 90 (awara nthihi na minitsi dza 30) = 15:30.',
          'Datumu ya Notice: 21 November − maduvha a 7 = 14 November.'
        ],
        Sesotho: [
          '(a) Araba ka 3 rings ka tumediso e mofuthu, hlalosa hore Ms Mokoena o fumaneha ka 10:30, mme o ngole lebitso, nomoro, nako (09:15), le molaetsa.',
          '(b) Nako ya ho qeta: 14:00 + metsotso e 90 (hora e 1 metsotso e 30) = 15:30.',
          'Letsatsi la Notice: 21 November − matsatsi a 7 = 14 November.'
        ],
        Setswana: [
          '(a) Araba mo 3 rings ka dumediso e ntle, tlhalosa gore Ms Mokoena o tla nna teng ka 10:30, o kwale leina, nomoro, nako (09:15), le molaetsa.',
          '(b) Nako ya go fetsa: 14:00 + metsotso e 90 (ura e 1 metsotso e 30) = 15:30.',
          'Letlha la Notice: 21 November − malatsi a 7 = 14 November.'
        ],
        Siswati: [
          '(a) Phendvula ngaphakatsi kwa-3 rings ngekubingelela kahle, uchaze kutsi Ms Mokoena utawutfolakala nga-10:30, bese ubhala ligama, inombolo, sikhatsi (09:15), nemlayeto.',
          '(b) Sikhatsi sekuphela: 14:00 + imizuzu le-90 (lihora le-1 nemizuzu le-30) = 15:30.',
          'Lusuku lwe-Notice: 21 November − emalanga la-7 = 14 November.'
        ],
        isiNdebele: [
          '(a) Dobha ngaphakathi kwe-3 rings ngokulotjhisa kuhle, uhlathulule ukuthi uMs Mokoena uzokufumaneka ngo-10:30, utlole ibizo, inomboro, isikhathi (09:15), nomlayezo.',
          '(b) Isikhathi sokuphela: 14:00 + imizuzu ema-90 (i-awara eli-1 nemizuzu ema-30) = 15:30.',
          'Ilanga le-Notice: 21 November − amalanga asi-7 = 14 November.'
        ],
        isiXhosa: [
          '(a) Phendula phakathi kwe-3 rings ngokubulisa ngembeko, ucacise ukuba uMs Mokoena uza kufumaneka ngo-10:30, ubhale igama, inombolo, ixesha (09:15), nomyalezo.',
          '(b) Ixesha lokugqiba: 14:00 + imizuzu engama-90 (iyure e-1 nemizuzu engama-30) = 15:30.',
          'Umhla we-Notice: 21 November − iintsuku ezi-7 = 14 November.'
        ],
        Afrikaans: [
          '(a) Beantwoord binne 3 luie met ’n warm groet, sê Me Mokoena is ná 10:30 beskikbaar, en skryf beller se naam, nommer, tyd (09:15) en boodskap neer.',
          '(b) Eindtyd: 14:00 + 90 minute (1 uur 30 min) = 15:30.',
          'Kennisgewingsdatum: 21 November − 7 dae = 14 November.'
        ],
        English: [
          '(a) Answer within 3 rings with a warm greeting ("Good morning, Nexovian Office, Sipho speaking, how may I help?"), explain politely that Ms Mokoena is unavailable until 10:30, and write down the caller’s full name, number, time (09:15), and message.',
          '(b) End time: 14:00 + 90 minutes (1 hour 30 minutes) = 15:30.',
          'Notice date: 21 November − 7 days = 14 November.'
        ]
      },
      finalAnswerByLanguage: {
        Xitsonga: '(a) Xeweta eka 3 rings, vika nkarhi wa 10:30, tsala hungu hinkwaro  |  (b) Yi hela 15:30; Notice hi 14 November',
        Sepedi: '(a) Dumediša ka 3 rings, bega nako ya 10:30, ngwala molaetša  |  (b) E fela ka 15:30; Notice ka 14 November',
        isiZulu: '(a) Bingelela ku-3 rings, chaza ngo-10:30, bhala umyalezo  |  (b) Uphela ngo-15:30; i-Notice ngo-14 November',
        Tshivenda: '(a) Reshani nga 3 rings, talusani 10:30, nwalani mulaedza  |  (b) U fhela nga 15:30; Notice nga 14 November',
        Sesotho: '(a) Dumedisa ka 3 rings, hlalosa 10:30, ngola molaetsa  |  (b) E fela ka 15:30; Notice ka 14 November',
        Setswana: '(a) Dumedisa mo 3 rings, tlhalosa 10:30, kwala molaetsa  |  (b) E fela ka 15:30; Notice ka 14 November',
        Siswati: '(a) Bingelela ku-3 rings, chaza nga-10:30, bhala umlayeto  |  (b) Uphela nga-15:30; Notice nga-14 November',
        isiNdebele: '(a) Lotjhisa ku-3 rings, hlathulula ngo-10:30, tlola umlayezo  |  (b) Uphela ngo-15:30; Notice ngo-14 November',
        isiXhosa: '(a) Bulisa ku-3 rings, cacisa ngo-10:30, bhala umyalezo  |  (b) Iphela ngo-15:30; Notice nge-14 November',
        Afrikaans: '(a) Groet binne 3 luie, noem 10:30, neem volle boodskap  |  (b) Eindig 15:30; Kennisgewing teen 14 November',
        English: '(a) Greet within 3 rings, inform availability, take full message  |  (b) Ends 15:30; Notice sent by 14 November'
      }
    },
    practiceQuestions: [
      {
        number: 1,
        questionByLanguage: {
          Xitsonga: 'Xivutiso 1 (Nexovian): Hikwalaho ka yini ndzhawu ya reception yi fanele ku hlayisa Visitor Register, naswona hi swihi swihlawulekisi swa 4 leswi vaendzi va faneleke ku swi tsala?',
          Sepedi: 'Potšišo 1 (Nexovian): Ke ka lebaka la eng reception e swanetše go boloka Visitor Register, gomme ke dintlha dife tše 4 tše baeng ba swanetšego go di ngwala?',
          isiZulu: 'Umbuzo 1 (Nexovian): Kungani i-reception kufanele igcine i-Visitor Register, futhi yimiphi imininingwane emi-4 okufanele izivakashi ziyibhale?',
          Tshivenda: 'Mbudziso 1 (Nexovian): Ndi ngani reception i tshi fanela u vhulunga Visitor Register, nahone ndi zwidodombedzwa zwifhio zwi-4 zwine vhaeni vha fanela u zwikwala?',
          Sesotho: 'Potso 1 (Nexovian): Ke hobaneng ha reception e tlameha ho boloka Visitor Register, mme ke dintlha dife tse 4 tseo baeti ba di ngolang?',
          Setswana: 'Potso 1 (Nexovian): Ke ka ntlha ya eng reception e tshwanetse go boloka Visitor Register, le dintlha di le 4 tse baeng ba di kwalang?',
          Siswati: 'Umbuto 1 (Nexovian): Kungani i-reception kufanele igcine i-Visitor Register, futsi ngumiphi imininingwane lemi-4 letivakashi letiyibhalako?',
          isiNdebele: 'Umbuzo 1 (Nexovian): Kubayini i-reception kufanele ibe ne-Visitor Register, begodu ngiyiphi imininingwana emi-4 ekufanele iimvakatjhi ziyitlole?',
          isiXhosa: 'Umbuzo 1 (Nexovian): Kutheni i-reception kufuneka igcine i-Visitor Register, kwaye zeziphi iinkcukacha ezi-4 ekufuneka iindwendwe zizibhale?',
          Afrikaans: 'Vraag 1 (Nexovian): Waarom moet ontvangs ’n Besoekersregister hou, en watter 4 besonderhede moet besoekers aanteken?',
          English: 'Nexovian Chapter Practice Q1: Why must a reception area keep a Visitor Register, and what 4 details should visitors record?'
        },
        answerByLanguage: {
          Xitsonga: 'Yi sirhelela vuhlayiseki bya ngheno na ku hlaya vanhu loko ku ri na mhangu. Vaendzi va tsala: 1. Vito leri heleleke & khampani, 2. Siku & nkarhi wo nghena/huma, 3. Vito ra mutirhi loyi va n’wi endzelaka, 4. Nsino (Signature).',
          Sepedi: 'E šireletša tšhireletšego le go bala batho ge go na le kotsi. Baeng ba ngwala: 1. Leina le khampani, 2. Letšatši le nako ya go tsena/tšwa, 3. Leina la mošomi yo ba mo etelago, 4. Mosaeno.',
          isiZulu: 'Ivikela ukuphepha futhi isize ekubaleni abantu uma kunesimo esiphuthumayo. Izivakashi zibhala: 1. Igama eligcwele nenkampani, 2. Usuku nesikhathi sokungena/sokuphuma, 3. Igama lomsebenzi esimvakashelayo, 4. Isiginesha.',
          Tshivenda: 'I tsireledza vhutsireledzi na u vhalela vhathu kha khombo. Vhaeni vha nwala: 1. Dzina & khamphani, 2. Datumu & tshifhinga, 3. Dzina la mushumi, 4. Tshisaino.',
          Sesotho: 'E sireletsa polokeho le ho bala batho maemong a tshohanyetso. Baeti ba ngola: 1. Lebitso & khamphani, 2. Letsatsi & nako, 3. Lebitso la mosebetsi, 4. Tshaeno.',
          Setswana: 'E sireletsa pabalesego le go bala batho mo kotsing. Baeng ba kwala: 1. Leina & khampani, 2. Letlha & nako, 3. Leina la modiri, 4. Tshaeno.',
          Siswati: 'Ivikela kuphepha nekubala bantfu engozini. Tivakashi tibhala: 1. Ligama & nkampani, 2. Lusuku nesikhatsi, 3. Ligama lesisebenti, 4. Sayini.',
          isiNdebele: 'Ivikela ukuphepha nokubala abantu engozini. Iimvakatjhi zitlola: 1. Ibizo & ikhampani, 2. Ilanga & isikhathi, 3. Ibizo lomsebenzi, 4. Isignesha.',
          isiXhosa: 'Ikhusela ukhuseleko kunye nokubala abantu kwimeko engxamisekileyo. Iindwendwe zibhala: 1. Igama nenkampani, 2. Umhla nexesha, 3. Igama lomsebenzi, 4. Isignesha.',
          Afrikaans: 'Dit beskerm toegangsbeheer en nood-ontruimingtellings. Besoekers skryf: 1. Volle naam & maatskappy, 2. Datum & tyd in/uit, 3. Personeellid besoek, 4. Handtekening.',
          English: 'It protects security access control and emergency evacuation headcounts. Visitors record: 1. Full name & ID/company, 2. Date & time in/out, 3. Name of staff member visited, 4. Signature.'
        }
      },
      {
        number: 2,
        questionByLanguage: {
          Xitsonga: 'Xivutiso 2 (Nexovian): Boxa nawu nkulu wo hlamula riqingho ehofisini na mitirho ya 2 ya Mutshamaxitulu (Chairperson) eka nhlengeletano.',
          Sepedi: 'Potšišo 2 (Nexovian): Bolela molao wa motheo wa go araba mogala ofising le mešomo e 2 ya Modulasetulo (Chairperson) kopanong.',
          isiZulu: 'Umbuzo 2 (Nexovian): Shono umthetho omkhulu wokuphendula ucingo ehhovisi kanye nemisebenzi emi-2 kaSihlalo (Chairperson) emhlanganweni.',
          Tshivenda: 'Mbudziso 2 (Nexovian): Bulani mulayo muhulwane wa u fhindula lutingo ofisini na mishumo mivhili ya Mudzulatshidulo mutanganoni.',
          Sesotho: 'Potso 2 (Nexovian): Fana ka molao wa motheo wa ho araba mohala ofising le mesebetsi e 2 ya Modulasetulo kopanong.',
          Setswana: 'Potso 2 (Nexovian): Umaka molao wa botlhokwa wa go araba mogala le ditiro tse 2 tsa Modulasetulo mo kopanong.',
          Siswati: 'Umbuto 2 (Nexovian): Shano umtsetfo lomkhulu wekuphendvula lucingo nemisebenti lemi-2 yaSihlalo emhlanganweni.',
          isiNdebele: 'Umbuzo 2 (Nexovian): Tjho umthetho oqakathekileko wokudobha umtato nemisebenzi emi-2 kaSihlalo emhlanganweni.',
          isiXhosa: 'Umbuzo 2 (Nexovian): Xela umgaqo ophambili wokuphendula ifowuni nemisebenzi emi-2 kaSihlalo kwintlanganiso.',
          Afrikaans: 'Vraag 2 (Nexovian): Noem die goue reël vir die beantwoord van oproepe en 2 pligte van die Voorsitter tydens ’n vergadering.',
          English: 'Nexovian Chapter Practice Q2: State the golden rule for answering incoming office calls and 2 duties of the Chairperson in a meeting.'
        },
        answerByLanguage: {
          Xitsonga: 'Hlamula eka 3 rings u ri karhi u xeweta hi vito ra khampani na ra wena. Mutshamaxitulu: 1. U pfula nhlengeletano hi nkarhi no landzelela Agenda, 2. U hlayisa ku rhula no tiyisisa ku vota loku lulameke.',
          Sepedi: 'Araba pele ga ge mogala o lla gararo (3 rings) ka go dumediša ka leina la khampani le la gago. Modulasetulo: 1. O bula kopano ka nako le go latela Agenda, 2. O boloka thulaganyo le go netefatša kgetho ye e lokilego.',
          isiZulu: 'Phendula phakathi kwamaringi ama-3 ubingelele ngegama lenkampani nelakho. USihlalo: 1. Uvula umhlangano ngesikhathi alandele i-Agenda, 2. Ugcina ukuthula aqinisekise ukuvota okungenzeleli.',
          Tshivenda: 'Fhindulani nga ngomu ha 3 rings ni tshi resha nga dzina la khamphani na lanu. Mudzulatshidulo: 1. U vula mutangano nga tshifhinga na u tevhela Agenda, 2. U vhulunga mulalo.',
          Sesotho: 'Araba ka 3 rings ka lebitso la khamphani le la hao. Modulasetulo: 1. O bula kopano ka nako a latele Agenda, 2. O boloka kgotso.',
          Setswana: 'Araba mo 3 rings ka leina la khampani le la gago. Modulasetulo: 1. O bula kopano ka nako a latele Agenda, 2. O tshegetsa thulaganyo.',
          Siswati: 'Phendvula ngaphakatsi kwa-3 rings ngeligama lenkampani nelakho. Sihlalo: 1. Uvula umhlangano ngesikhatsi alandzele i-Agenda, 2. Ugcina kuthula.',
          isiNdebele: 'Dobha ngaphakathi kwe-3 rings ngebizo lekhampani nelakho. USihlalo: 1. Uvula umhlangano ngesikhathi alandele i-Agenda, 2. Ugcina ukuthula.',
          isiXhosa: 'Phendula phakathi kwe-3 rings ngegama lenkampani nelakho. USihlalo: 1. Uvula intlanganiso ngexesha alandele i-Agenda, 2. Ugcina ucwangco.',
          Afrikaans: 'Beantwoord binne 3 luie en groet met die maatskappy- en jou naam. Voorsitter: 1. Open betyds en volg die Agenda, 2. Handhaaf orde en verseker regverdige stemming.',
          English: 'Answer within 3 rings while greeting clearly with company and staff name. During meetings, the Chairperson: 1. Opens on time and follows the Agenda, and 2. Keeps order so everyone contributes fairly before voting.'
        }
      }
    ]
  },
  {
    id: 'l2-ch4-new-venture-creation',
    level: 2,
    chapterNumber: 4,
    chapterLabelByLanguage: {
      Xitsonga: 'Nexovian Level 2 • Ndzima 4',
      Sepedi: 'Nexovian Level 2 • Kgaolo 4',
      isiZulu: 'Nexovian Level 2 • Isahluko 4',
      Tshivenda: 'Nexovian Level 2 • Ndima 4',
      Sesotho: 'Nexovian Level 2 • Kgaolo 4',
      Setswana: 'Nexovian Level 2 • Kgaolo 4',
      Siswati: 'Nexovian Level 2 • Sehluko 4',
      isiNdebele: 'Nexovian Level 2 • Isigaba 4',
      isiXhosa: 'Nexovian Level 2 • Isahluko 4',
      Afrikaans: 'Nexovian Vlak 2 • Hoofstuk 4',
      English: 'Nexovian Level 2 • Chapter 4'
    },
    titleByLanguage: {
      Xitsonga: 'Ku Sungula Bindzu Lerintshwa (New Venture Creation)',
      Sepedi: 'Go Thoma Kgwebo ye Mpsha (New Venture Creation)',
      isiZulu: 'Ukusungula Ibhizinisi Elisha (New Venture Creation)',
      Tshivenda: 'U Thoma Bindu Liswa (New Venture Creation)',
      Sesotho: 'Ho Qala Kgwebo e Ntsha (New Venture Creation)',
      Setswana: 'Go Simolola Kgwebo e Ntšhwa (New Venture Creation)',
      Siswati: 'Kucala Libhizinisi Lelisha (New Venture Creation)',
      isiNdebele: 'Ukuvula Ibhizinisi Elitjha (New Venture Creation)',
      isiXhosa: 'Ukuqala Ishishini Elitsha (New Venture Creation)',
      Afrikaans: 'Nuwe Ondernemingskepping (New Venture Creation)',
      English: 'New Venture Creation'
    },
    subtitleByLanguage: {
      Xitsonga: 'I yini Entrepreneurship, Business Plan & Sungula Bindzu ra Wena',
      Sepedi: 'Ke eng Entrepreneurship, Business Plan & Thoma Kgwebo ya Gago',
      isiZulu: 'Yini Entrepreneurship, Business Plan & Qala Elakho Ibhizinisi',
      Tshivenda: 'Ndi mini Entrepreneurship, Business Plan & Thomani Bindu Lanu',
      Sesotho: 'Ke eng Entrepreneurship, Business Plan & Qala Kgwebo ya Hao',
      Setswana: 'Ke eng Entrepreneurship, Business Plan & Simolola Kgwebo ya Gago',
      Siswati: 'Yini Entrepreneurship, Business Plan & Cala Libhizinisi Lakho',
      isiNdebele: 'Kuyini Entrepreneurship, Business Plan & Thoma Ibhizinisi Lakho',
      isiXhosa: 'Yintoni Entrepreneurship, Business Plan & Qala Ishishini Lakho',
      Afrikaans: 'Wat is Entrepreneurskap, Sakeplan & Begin Jou Eie Besigheid',
      English: 'What is Entrepreneurship, Business Plan & Start Your Own Business'
    },
    summaryByLanguage: {
      Xitsonga:
        'Vusunguri bya mabindzu (Entrepreneurship) i vuswikoti byo vona xilaveko emugangeni, ku teka goza ro tumbuluxa bindzu, na ku endla bindzu (profit). Ndzima leyi yi ku komba ku tsala Business Plan (Executive Summary, Market Research, Marketing Mix, Operations, Financial Plan), ku tsarisa bindzu eka CIPC, ku hlaya Cost Price, Selling Price, na Break-Even point.',
      Sepedi:
        'Boithomelo bja kgwebo (Entrepreneurship) ke bokgoni bja go bona tlhokego setšhabeng le go thoma kgwebo ye e dirago poelo. Kgaolo ye e go ruta go ngwala Business Plan (Executive Summary, Market Research, Financial Plan), go ngwadiša kgwebo go CIPC, le go bala theko ya go rekiša le Break-Even point.',
      isiZulu:
        'Ubuhlakani bokusungula ibhizinisi (Entrepreneurship) yikhono lokubona isidingo emphakathini, ukuthatha ubungozi obuhleliwe, nokuvula ibhizinisi elenza inzuzo. Lesi sahluko sikufundisa ukubhala i-Business Plan, ukubhalisa ibhizinisi ku-CIPC, nokubala amanani okuthengisa ne-break-even point.',
      Tshivenda:
        'Vhurambindu (Entrepreneurship) ndi vhukoni ha u vhona thodea tshitshavhani na u thoma bindu line la bveledza mbuelo. Ndima iyi i ni funza u nwala Business Plan, u nwalisa bindu kha CIPC, na u vhalela mutengo na break-even point.',
      Sesotho:
        'Entrepreneurship ke bokgoni ba ho bona tlhoko setjhabeng le ho qala kgwebo e etsang phaello. Kgaolo ena e o ruta ho ngola Business Plan, ho ngodisa ho CIPC, le ho bala break-even point.',
      Setswana:
        'Entrepreneurship ke bokgoni jwa go bona tlhokego mo setšhabeng le go simolola kgwebo e e dirang poelo. Kgaolo eno e go ruta go kwala Business Plan, go kwadisa mo CIPC, le go bala break-even point.',
      Siswati:
        'Entrepreneurship likhono lekubona sidzingo emphakatsini nekucala libhizinisi lelitfola inzuzo. Lesehluko sikufundzisa kubhala i-Business Plan, kubhalisa ku-CIPC, nekubala break-even point.',
      isiNdebele:
        'I-Entrepreneurship likghono lokubona isidingo emphakathini nokuvula ibhizinisi elenza inzuzo. Isigaba lesi sikufundisa ukutlola i-Business Plan, ukutlolisa ku-CIPC, nokubala i-break-even point.',
      isiXhosa:
        'I-Entrepreneurship bubuchule bokubona imfuno eluntwini uze uqale ishishini elinenzuzo. Esi sahluko sikufundisa ukubhala i-Business Plan, ukubhalisa kwi-CIPC, nokubala i-break-even point.',
      Afrikaans:
        'Entrepreneurskap is die vaardigheid om ’n markgaping raak te sien, berekende risiko te neem en ’n winsgewende onderneming te begin. Leer hoe om ’n volledige Sakeplan te skryf, by CIPC te registreer en jou gelykbreekpunt te bereken.',
      English:
        'Entrepreneurship is the skill of spotting an unmet need in your community, taking calculated risks, and organising resources to launch a profitable venture. This chapter guides you through writing a complete Business Plan (Executive Summary, Market Research, Marketing Mix, Operations, and Financial Plan) and the practical steps to start your own business: choosing a business name, registering with CIPC, calculating start-up costs, setting profitable selling prices, and finding your break-even point.'
    },
    keyTerms: [
      {
        termEn: 'Entrepreneurship',
        translations: {
          Xitsonga: 'Vusunguri bya Mabindzu (Entrepreneurship)',
          Sepedi: 'Boithomelo bja Kgwebo (Entrepreneurship)',
          isiZulu: 'Ubuhlakani Bokusungula Ibhizinisi (Entrepreneurship)',
          Tshivenda: 'Vhurambindu (Entrepreneurship)',
          Sesotho: 'Boqapi ba Kgwebo (Entrepreneurship)',
          Setswana: 'Boitshimololedi jwa Kgwebo (Entrepreneurship)',
          Siswati: 'Bukhoni Bekucala Libhizinisi (Entrepreneurship)',
          isiNdebele: 'Uburhwebi / Ukuthoma Ibhizinisi (Entrepreneurship)',
          isiXhosa: 'Ubuchule Boshishino (Entrepreneurship)',
          Afrikaans: 'Entrepreneurskap (Entrepreneurship)',
          English: 'Creating a new business by spotting opportunities & taking calculated risks'
        },
        meaningByLanguage: {
          Xitsonga: 'Ku hlanganisa vutlhari, ku tiyisela, na pulani ya timali ku aka bindzu leri tiyimeleke.',
          Sepedi: 'Go kopanya boitlhamelo, go kgotlelela, le peakanyo ya ditšhelete go aga kgwebo ye e ikemego.',
          isiZulu: 'Kuhlanganisa ubuhlakani, ukuphikelela, nokuhlela izimali ukwakha umholo ozimele.',
          Tshivenda: 'U tanganya vhutsila, u kondelela, na pulane ya masheleni u fhafula bindu lo diimisaho.',
          Sesotho: 'Ho kopanya boiqapelo, mamello, le moralo wa ditjhelete ho haha kgwebo e ikemetseng.',
          Setswana: 'Go kopanya boitshimololedi, boitshoko, le thulaganyo ya madi go aga kgwebo e e ikemetseng.',
          Siswati: 'Kuhlanganisa buhlakani, kubeketelela, nekuhlela timali kwentela kwakha libhizinisi lelitimele.',
          isiNdebele: 'Kuhlanganisa ukusungula, ukunyamezela, nokuhlela iimali ukwakha ibhizinisi elizijameleko.',
          isiXhosa: 'Kudibanisa ubuchule, unyamezelo, nocwangciso lwemali ukwakha ishishini elizimeleyo.',
          Afrikaans: 'Kombineer kreatiwiteit, deursettingsvermoë en slim finansiële beplanning vir ’n onafhanklike inkomste.',
          English: 'Combines creativity, persistence, and smart financial planning to build an independent income.'
        }
      },
      {
        termEn: 'Business Plan',
        translations: {
          Xitsonga: 'Pulani ya Bindzu (Business Plan)',
          Sepedi: 'Leano la Kgwebo (Business Plan)',
          isiZulu: 'Uhlelo Lwebhizinisi (Business Plan)',
          Tshivenda: 'Pulane ya Bindu (Business Plan)',
          Sesotho: 'Leano la Kgwebo (Business Plan)',
          Setswana: 'Togamaano ya Kgwebo (Business Plan)',
          Siswati: 'Luhlelo Lwelibhizinisi (Business Plan)',
          isiNdebele: 'Ihlelo Lebhizinisi (Business Plan)',
          isiXhosa: 'Isicwangciso Seshishini (Business Plan)',
          Afrikaans: 'Sakeplan (Business Plan)',
          English: 'Written roadmap describing goals, target customers & finances'
        },
        meaningByLanguage: {
          Xitsonga: 'Yi ku kongomisa goza hi goza naswona yi laveka eka tibangi loko u kombela mali yo pfula bindzu.',
          Sepedi: 'E go hlahla kgato ka kgato gomme e nyakega ke dipanka pele di ka thuša ka tšhelete.',
          isiZulu: 'Ikuhola isinyathelo ngesinyathelo futhi idingwa ngamabhange nabatshali-zimali ngaphambi kokuxhasa.',
          Tshivenda: 'I ni sumbedza ndila liga nga liga nahone i todea kha dzibanga phanda ha u nea masheleni.',
          Sesotho: 'E o tataisa mohato ka mohato mme e hlokwa ke dibanka pele di tshehetsa ka ditjhelete.',
          Setswana: 'E go kaela kgato ka kgato mme e batlwa ke dibanka pele di thusa ka madi.',
          Siswati: 'Ikuhola sinyatselo ngesinyatselo futsi idzingwa ngemabhange ngembili kwekufaka timali.',
          isiNdebele: 'Ikukhombisa igadango ngegango begodu idingwa mabhanka ngaphambi kokusekela ngeemali.',
          isiXhosa: 'Ikukhokela inyathelo ngenyathelo kwaye ifunwa ziibhanki ngaphambi kokuxhasa ngemali.',
          Afrikaans: 'Lei jou stap-vir-stap en word deur banke of beleggers vereis voor befondsing.',
          English: 'Guides your launch step-by-step and is required by banks or investors before funding.'
        }
      },
      {
        termEn: 'Profit & Break-Even',
        translations: {
          Xitsonga: 'Ndzalo & Break-Even (Profit = Income - Expenses)',
          Sepedi: 'Poelo & Break-Even (Profit = Letseno - Ditshenyagalelo)',
          isiZulu: 'Inzuzo & Break-Even (Profit = Imali engenayo - Izindleko)',
          Tshivenda: 'Mbuelo & Break-Even (Profit = Mbuelo - Tshinyalelo)',
          Sesotho: 'Phaello & Break-Even (Profit = Lekeno - Ditshenyehelo)',
          Setswana: 'Poelo & Break-Even (Profit = Lotseno - Ditshenyegelo)',
          Siswati: 'Inzuzo & Break-Even (Profit = Imali lengenako - Tindleko)',
          isiNdebele: 'Inzuzo & Break-Even (Profit = Imali engenako - Iindleko)',
          isiXhosa: 'Inzuzo & Break-Even (Profit = Ingeniso - Iindleko)',
          Afrikaans: 'Wins & Gelykbreekpunt (Profit = Inkomste - Uitgawes)',
          English: 'Money left after subtracting all expenses from total sales'
        },
        meaningByLanguage: {
          Xitsonga: 'Break-even yi humelela loko Mali leyi Nghenaka yi ringana na Swipfuno Hinkwaswo (R0 ya ku lahlekeriwa, R0 ya ndzalo).',
          Sepedi: 'Break-even e direga ge Letseno ka Moka le lekana le Ditshenyagalelo ka Moka (R0 tahlegelo, R0 poelo).',
          isiZulu: 'I-Break-even yenzeka uma Imali Engenayo yonke ilingana Nezindleko zonke (R0 ukulahlekelwa, R0 inzuzo).',
          Tshivenda: 'Break-even i itea musi Masheleni o Dzhenaho a tshi lingana na Tshinyalelo Dzothe (R0 xelelwa, R0 mbuelo).',
          Sesotho: 'Break-even e etsahala ha Lekeno lohle le lekana le Ditshenyehelo tsohle (R0 tahlehelo, R0 phaello).',
          Setswana: 'Break-even e diragala fa Lotseno lotlhe lo lekana le Ditshenyegelo tsotlhe (R0 tatlhegelo, R0 poelo).',
          Siswati: 'I-Break-even yenteka uma Imali Lengenako ilingana neTindleko tonkhe (R0 kulahlekelwa, R0 inzuzo).',
          isiNdebele: 'I-Break-even yenzeka lokha Imali Engenako yoke ilingana neendleko zoke (R0 ukulahlekelwa, R0 inzuzo).',
          isiXhosa: 'I-Break-even yenzeka xa Ingeniso yonke ilingana neendleko zonke (R0 ilahleko, R0 inzuzo).',
          Afrikaans: 'Gelykbreekpunt is waar Totale Inkomste gelyk is aan Totale Koste (R0 verlies, R0 wins).',
          English: 'Break-even is the exact sales point where Total Income equals Total Costs (R0 loss, R0 profit).'
        }
      }
    ],
    workedExample: {
      questionByLanguage: {
        Xitsonga: 'U pfula bindzu ro printa tibukwana hi ntsengo wa R25 eka yin’we u tlhela u ti xavisa hi R45 eka yin’we. Rente ya n’hweti yi tiyile eka R1 000. (a) U fanele u xavisa tibukwana tingani ku fika eka break-even, na (b) ndzalo ya wena yi ta va mani loko u xavisa tibukwana ta 80?',
        Sepedi: 'O thoma kgwebo ya go printa dipukwana ka R25 ye nngwe gomme o di rekiša ka R45 ye nngwe. Rente ya kgwedi ke R1 000. (a) O swanetše go rekiša dipukwana tše kae go fihla go break-even, le (b) poelo ya gago ke bokae ge o rekiša dipukwana tše 80?',
        isiZulu: 'Uqala ibhizinisi lokushicilela izincwajana ngezindleko ezingu-R25 ngayinye uzithengise ngo-R45 ngayinye. Irenti yenyanga engaguquki ngu-R1 000. (a) Kumele uthengise izincwajana ezingaki ukuze ufike ku-break-even, (b) futhi iyini inzuzo uma uthengisa izincwajana ezingama-80?',
        Tshivenda: 'Ni thoma bindu la u printa bugwana nga R25 nthihi ni tshi rengisa nga R45 nthihi. Rente ya nwedzi ndi R1 000. (a) Ni fanela u rengisa bugwana nngana u swika kha break-even, na (b) mbuelo yanu ndi vhugai arali na rengisa 80?',
        Sesotho: 'O qala kgwebo ya ho printa dibuka ka R25 e nngwe o rekisa ka R45 e nngwe. Rente ya kgwedi ke R1 000. (a) O lokela ho rekisa dibuka tse kae ho fihla ho break-even, le (b) phaello ke bokae ha o rekisa 80?',
        Setswana: 'O simolola kgwebo ya go gatisa dibukana ka R25 nngwe o rekisa ka R45 nngwe. Rente ya kgwedi ke R1 000. (a) O tshwanetse go rekisa tse kae go fitlha mo break-even, le (b) poelo ke bokae fa o rekisa 80?',
        Siswati: 'Ucala libhizinisi lekuphrinta tincwadzi nga-R25 yinye utsengise nga-R45 yinye. Renti yenyanga ngu-R1 000. (a) Kufanele utsengise tingakhi kute ufike ku-break-even, (b) nemali yenzuzo nawutsengisa leti-80?',
        isiNdebele: 'Uthoma ibhizinisi lokugadangisa iincwajana nge-R25 yinye uzithengise nge-R45 yinye. Irenti yenyanga ngu-R1 000. (a) Kufanele uthengise ezingaki ukufika ku-break-even, (b) nenzuzo nawuthengisa ezi-80?',
        isiXhosa: 'Uqala ishishini lokushicilela iincwadana nge-R25 inye uthengise nge-R45 inye. Irenti yenyanga yi-R1 000. (a) Kufuneka uthengise ezingaphi ukufikelela kwi-break-even, (b) nenzuzo xa uthengisa ezingama-80?',
        Afrikaans: 'Jy bind studieboekies teen ’n veranderlike koste van R25 elk en verkoop dit vir R45 elk. Vaste maandelikse huur is R1 000. (a) Hoeveel boekies vir gelykbreek, en (b) netto wins as jy 80 verkoop?',
        English: 'You start a small print shop binding study booklets at a variable cost of R25 each and selling them for R45 each. Fixed monthly rent is R1 000. (a) How many booklets must you sell to break even, and (b) what is your net profit if you sell 80 booklets?'
      },
      stepsByLanguage: {
        Xitsonga: [
          'Kuma Contribution hi bukwana: Selling Price − Variable Cost = R45 − R25 = R20 hi bukwana.',
          '(a) Tibukwana ta Break-even = Fixed Costs ÷ Contribution = R1 000 ÷ R20 = 50 tibukwana. (Kambela: 50 × R45 = R2 250; Ntsengo = R1 000 + 50 × R25 = R2 250).',
          '(b) Eka tibukwana ta 80: Mali leyi nghenaka = 80 × R45 = R3 600. Swipfuno = R1 000 + (80 × R25) = R3 000. Net Profit = R3 600 − R3 000 = R600.'
        ],
        Sepedi: [
          'Hwetša Contribution ka pukwana: Selling Price − Variable Cost = R45 − R25 = R20 ka pukwana.',
          '(a) Dipukwana tša Break-even = Fixed Costs ÷ Contribution = R1 000 ÷ R20 = 50 dipukwana. (Hlahloba: 50 × R45 = R2 250; Ditshenyagalelo = R1 000 + 50 × R25 = R2 250).',
          '(b) Go dipukwana tše 80: Letseno = 80 × R45 = R3 600. Ditshenyagalelo = R1 000 + (80 × R25) = R3 000. Net Profit = R3 600 − R3 000 = R600.'
        ],
        isiZulu: [
          'Thola i-Contribution ngencwajana: Selling Price − Variable Cost = R45 − R25 = R20 ngencwajana.',
          '(a) Izincwajana ze-Break-even = Fixed Costs ÷ Contribution = R1 000 ÷ R20 = 50 izincwajana. (Hlola: 50 × R45 = R2 250; Izindleko = R1 000 + 50 × R25 = R2 250).',
          '(b) Ezincwajaneni ezingama-80: Imali engenayo = 80 × R45 = R3 600. Izindleko zonke = R1 000 + (80 × R25) = R3 000. Net Profit = R3 600 − R3 000 = R600.'
        ],
        Tshivenda: [
          'Wanani Contribution nga bugwana: Selling Price − Variable Cost = R45 − R25 = R20.',
          '(a) Bugwana dza Break-even = R1 000 ÷ R20 = 50 bugwana. (Tolani: 50 × R45 = R2 250; R1 000 + 50 × R25 = R2 250).',
          '(b) Kha 80 bugwana: Mbuelo = 80 × R45 = R3 600. Tshinyalelo = R1 000 + (80 × R25) = R3 000. Net Profit = R3 600 − R3 000 = R600.'
        ],
        Sesotho: [
          'Fumana Contribution ka buka: R45 − R25 = R20.',
          '(a) Break-even = R1 000 ÷ R20 = 50 dibuka.',
          '(b) Ho 80: Lekeno = 80 × R45 = R3 600. Ditshenyehelo = R1 000 + (80 × R25) = R3 000. Net Profit = R3 600 − R3 000 = R600.'
        ],
        Setswana: [
          'Bona Contribution ka bukana: R45 − R25 = R20.',
          '(a) Break-even = R1 000 ÷ R20 = 50 dibukana.',
          '(b) Mo go 80: Lotseno = 80 × R45 = R3 600. Ditshenyegelo = R1 000 + (80 × R25) = R3 000. Net Profit = R3 600 − R3 000 = R600.'
        ],
        Siswati: [
          'Tfola Contribution ngencwadzi: R45 − R25 = R20.',
          '(a) Break-even = R1 000 ÷ R20 = 50 tincwadzi.',
          '(b) Ku-80: Imali = 80 × R45 = R3 600. Tindleko = R1 000 + (80 × R25) = R3 000. Net Profit = R3 600 − R3 000 = R600.'
        ],
        isiNdebele: [
          'Fumana i-Contribution ngencwajana: R45 − R25 = R20.',
          '(a) Break-even = R1 000 ÷ R20 = 50 iincwajana.',
          '(b) Ezi-80: Imali = 80 × R45 = R3 600. Iindleko = R1 000 + (80 × R25) = R3 000. Net Profit = R3 600 − R3 000 = R600.'
        ],
        isiXhosa: [
          'Fumana i-Contribution ngencwadana: R45 − R25 = R20.',
          '(a) Break-even = R1 000 ÷ R20 = 50 iincwadana.',
          '(b) Kwezingama-80: Ingeniso = 80 × R45 = R3 600. Iindleko = R1 000 + (80 × R25) = R3 000. Net Profit = R3 600 − R3 000 = R600.'
        ],
        Afrikaans: [
          'Bepaal Bydrae per boekie: Verkoopprys − Veranderlike Koste = R45 − R25 = R20.',
          '(a) Gelykbreek-eenhede = Vaste Koste ÷ Bydrae = R1 000 ÷ R20 = 50 boekies.',
          '(b) By 80 boekies: Inkomste = 80 × R45 = R3 600. Totale Koste = R1 000 + (80 × R25) = R3 000. Netto Wins = R3 600 − R3 000 = R600.'
        ],
        English: [
          'Find Contribution per booklet: Selling Price − Variable Cost = R45 − R25 = R20 per booklet.',
          '(a) Break-even units = Fixed Costs ÷ Contribution = R1 000 ÷ R20 = 50 booklets. (Check: 50 × R45 = R2 250 income; Cost = R1 000 + 50 × R25 = R2 250).',
          '(b) At 80 booklets: Income = 80 × R45 = R3 600. Total Cost = R1 000 + (80 × R25) = R3 000. Net Profit = R3 600 − R3 000 = R600.'
        ]
      },
      finalAnswerByLanguage: {
        Xitsonga: '(a) 50 tibukwana ta break-even  |  (b) R600 net profit eka 80 tibukwana',
        Sepedi: '(a) 50 dipukwana tša break-even  |  (b) R600 net profit go 80 dipukwana',
        isiZulu: '(a) 50 izincwajana ze-break-even  |  (b) R600 inzuzo ngezincwajana ezingama-80',
        Tshivenda: '(a) 50 bugwana dza break-even  |  (b) R600 net profit kha 80 bugwana',
        Sesotho: '(a) 50 dibuka tsa break-even  |  (b) R600 net profit ho 80 dibuka',
        Setswana: '(a) 50 dibukana tsa break-even  |  (b) R600 net profit mo go 80 dibukana',
        Siswati: '(a) 50 tincwadzi te-break-even  |  (b) R600 net profit ku-80 tincwadzi',
        isiNdebele: '(a) 50 iincwajana ze-break-even  |  (b) R600 inzuzo ezi-80 iincwajana',
        isiXhosa: '(a) 50 iincwadana ze-break-even  |  (b) R600 inzuzo kwezingama-80',
        Afrikaans: '(a) 50 boekies vir gelykbreek  |  (b) R600 netto wins by 80 boekies',
        English: '(a) 50 booklets to break even  |  (b) R600 net profit at 80 booklets'
      }
    },
    practiceQuestions: [
      {
        number: 1,
        questionByLanguage: {
          Xitsonga: 'Xivutiso 1 (Nexovian): Boxa swiyenge swa 3 swa nkoka endzeni ka Business Plan u tlhela u hlamusela leswaku hikwalaho ka yini vasunguri va tsala yin’we.',
          Sepedi: 'Potšišo 1 (Nexovian): Bolela dikarolo tše 3 tša bohlokwa ka gare ga Business Plan gomme o hlaloše lebaka la go e ngwala.',
          isiZulu: 'Umbuzo 1 (Nexovian): Yisho izingxenye ezi-3 ezibalulekile ngaphakathi kwe-Business Plan bese uchaza ukuthi kungani abasunguli beyibhala.',
          Tshivenda: 'Mbudziso 1 (Nexovian): Bulani zwipida zwi-3 zwa ndeme nga ngomu ha Business Plan ni taluse uri ndi ngani i tshi nwalwa.',
          Sesotho: 'Potso 1 (Nexovian): Bolela dikarolo tse 3 tsa bohlokwa ka hara Business Plan mme o hlalose hore hobaneng e ngolwa.',
          Setswana: 'Potso 1 (Nexovian): Umaka dikarolo tse 3 tsa botlhokwa mo teng ga Business Plan o tlhalose lebaka la go e kwala.',
          Siswati: 'Umbuto 1 (Nexovian): Shano tincenye leti-3 letibalulekile ku-Business Plan uchaze kutsi ibhalelwani.',
          isiNdebele: 'Umbuzo 1 (Nexovian): Tjho iingcenye ezi-3 eziqakathekileko ku-Business Plan uhlathulule ukuthi itlolelwani.',
          isiXhosa: 'Umbuzo 1 (Nexovian): Xela amacandelo ama-3 abalulekileyo kwi-Business Plan ucacise ukuba ibhalelwa ntoni.',
          Afrikaans: 'Vraag 1 (Nexovian): Noem 3 noodsaaklike afdelings in ’n Sakeplan en verduidelik waarom stigters een skryf.',
          English: 'Nexovian Chapter Practice Q1: Name 3 essential sections inside a Business Plan and explain why founders write one.'
        },
        answerByLanguage: {
          Xitsonga: '1. Executive Summary & Miehleketo ya Bindzu. 2. Marketing Plan (vakasitoma, maphikizani, 4Ps). 3. Financial Plan (timali to sungula, cash flow, break-even). Yi pfuna musunguri ku tshama a kongomile no kombisa tibangi leswaku bindzu ri nga tirha.',
          Sepedi: '1. Executive Summary & Kgopolo ya Kgwebo. 2. Marketing Plan (bareki, baphadišani, 4Ps). 3. Financial Plan (ditšhelete tša go thoma, cash flow, break-even). E thuša go šireletša tsepamo le go kgodiša dipanka.',
          isiZulu: '1. I-Executive Summary & Umqondo Webhizinisi. 2. I-Marketing Plan (imakethe, izimbangi, ama-4Ps). 3. I-Financial Plan (izindleko zokuqala, ukuhamba kwemali, i-break-even). Igcina umnikazi egxilile futhi ikholwise amabhange.',
          Tshivenda: '1. Executive Summary & Muhumbulo. 2. Marketing Plan (4Ps). 3. Financial Plan (masheleni a u thoma, cash flow, break-even). Zwi thusa u dzula no sedza ndila na u khwathisedza dzibanga.',
          Sesotho: '1. Executive Summary. 2. Marketing Plan (4Ps). 3. Financial Plan (tjhelete ya qalo, cash flow, break-even). E boloka moralo o hlakile mme e kgolisa dibanka.',
          Setswana: '1. Executive Summary. 2. Marketing Plan (4Ps). 3. Financial Plan (madi a tshimologo, cash flow, break-even). E thusa go kgodisa dibanka.',
          Siswati: '1. Executive Summary. 2. Marketing Plan (4Ps). 3. Financial Plan (timali tekucala, cash flow, break-even). Igcina umcondvo ucondzile nekukholwisa emabhange.',
          isiNdebele: '1. Executive Summary. 2. Marketing Plan (4Ps). 3. Financial Plan (iimali zokuthoma, cash flow, break-even). Ikholwisa amabhanka nokubeka umgomo oqondileko.',
          isiXhosa: '1. Executive Summary. 2. Marketing Plan (4Ps). 3. Financial Plan (iindleko zokuqala, cash flow, break-even). Ibonisa iibhanki ukuba ishishini liza kuphumelela.',
          Afrikaans: '1. Bestuursopsomming & Sake-idee. 2. Bemarkingsplan (teikenmark & 4Ps). 3. Finansiële Plan (beginkoste, kontantvloei, gelykbreek). Dit bewys aan banke dat die onderneming lewensvatbaar is.',
          English: '1. Executive Summary & Business Idea. 2. Marketing Plan (target market, competitors, 4Ps pricing/promotion). 3. Financial Plan (start-up budget, cash flow, break-even forecast). It keeps the entrepreneur focused and proves to banks or partners that the venture is viable.'
        }
      },
      {
        number: 2,
        questionByLanguage: {
          Xitsonga: 'Xivutiso 2 (Nexovian): Loko bindzu ra wena lerintshwa ri kuma Mali ya N’hweti (Income) ya R20 000 no hakela Swipfuno swa N’hweti (Expenses) swa R13 000, hlaya (a) Net Profit na (b) Profit Margin (%).',
          Sepedi: 'Potšišo 2 (Nexovian): Ge kgwebo ya gago e hwetša Letseno la Kgwedi la R20 000 gomme e lefa Ditshenyagalelo tša R13 000, balela (a) Net Profit le (b) Profit Margin (%).',
          isiZulu: 'Umbuzo 2 (Nexovian): Uma ibhizinisi lakho elisha lihola i-Monthly Income engu-R20 000 likhokhe i-Monthly Expenses engu-R13 000, bala (a) i-Net Profit ne (b) i-Profit Margin (%).',
          Tshivenda: 'Mbudziso 2 (Nexovian): Arali bindu lanu li tshi wana R20 000 ya nwedzi li tshi badela R13 000 ya tshinyalelo, vhalelani (a) Net Profit na (b) Profit Margin (%).',
          Sesotho: 'Potso 2 (Nexovian): Haeba kgwebo e fumana R20 000 ya kgwedi e lefa R13 000, bala (a) Net Profit le (b) Profit Margin (%).',
          Setswana: 'Potso 2 (Nexovian): Fa kgwebo e amogela R20 000 ka kgwedi e duela R13 000, bala (a) Net Profit le (b) Profit Margin (%).',
          Siswati: 'Umbuto 2 (Nexovian): Uma libhizinisi litfola R20 000 ngenyanga likhokhe R13 000, bala (a) Net Profit ne (b) Profit Margin (%).',
          isiNdebele: 'Umbuzo 2 (Nexovian): Nangabe ibhizinisi lifumana R20 000 ngenyanga libhadele R13 000, bala (a) Net Profit ne (b) Profit Margin (%).',
          isiXhosa: 'Umbuzo 2 (Nexovian): Ukuba ishishini lifumana u-R20 000 ngenyanga lihlawule u-R13 000, bala (a) Net Profit ne (b) Profit Margin (%).',
          Afrikaans: 'Vraag 2 (Nexovian): As maandelikse inkomste R20 000 is en uitgawes R13 000 is, bereken (a) Netto Wins en (b) Winsmarge (%).',
          English: 'Nexovian Chapter Practice Q2: If your new business earns Monthly Income of R20 000 and pays Monthly Expenses of R13 000, calculate (a) Net Profit and (b) Profit Margin (%).'
        },
        answerByLanguage: {
          Xitsonga: '(a) Net Profit = Income − Expenses = R20 000 − R13 000 = R7 000. (b) Profit Margin = (R7 000 ÷ R20 000) × 100 = 35%.',
          Sepedi: '(a) Net Profit = Income − Expenses = R20 000 − R13 000 = R7 000. (b) Profit Margin = (R7 000 ÷ R20 000) × 100 = 35%.',
          isiZulu: '(a) Net Profit = Income − Expenses = R20 000 − R13 000 = R7 000. (b) Profit Margin = (R7 000 ÷ R20 000) × 100 = 35%.',
          Tshivenda: '(a) Net Profit = Income − Expenses = R20 000 − R13 000 = R7 000. (b) Profit Margin = (R7 000 ÷ R20 000) × 100 = 35%.',
          Sesotho: '(a) Net Profit = Income − Expenses = R20 000 − R13 000 = R7 000. (b) Profit Margin = (R7 000 ÷ R20 000) × 100 = 35%.',
          Setswana: '(a) Net Profit = Income − Expenses = R20 000 − R13 000 = R7 000. (b) Profit Margin = (R7 000 ÷ R20 000) × 100 = 35%.',
          Siswati: '(a) Net Profit = Income − Expenses = R20 000 − R13 000 = R7 000. (b) Profit Margin = (R7 000 ÷ R20 000) × 100 = 35%.',
          isiNdebele: '(a) Net Profit = Income − Expenses = R20 000 − R13 000 = R7 000. (b) Profit Margin = (R7 000 ÷ R20 000) × 100 = 35%.',
          isiXhosa: '(a) Net Profit = Income − Expenses = R20 000 − R13 000 = R7 000. (b) Profit Margin = (R7 000 ÷ R20 000) × 100 = 35%.',
          Afrikaans: '(a) Netto Wins = R20 000 − R13 000 = R7 000. (b) Winsmarge = (R7 000 ÷ R20 000) × 100 = 35%.',
          English: '(a) Net Profit = Income − Expenses = R20 000 − R13 000 = R7 000. (b) Profit Margin = (R7 000 ÷ R20 000) × 100 = 35%.'
        }
      }
    ]
  }
];
