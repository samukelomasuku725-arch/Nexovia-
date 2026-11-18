/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * LEVEL 4 — All 3 Chapters fully translated into all 11 official SA languages
 * Formulas & numbers stay exact across all languages.
 */

import { TextbookChapter } from './officeAdminTypes';

export const OFFICE_ADMIN_LEVEL_4_CHAPTERS: TextbookChapter[] = [
  {
    id: 'l4-office-data-processing',
    level: 4,
    chapterNumber: 1,
    chapterLabelByLanguage: {
      Xitsonga: 'Nexovian Level 4 • Ndzima 1',
      Sepedi: 'Nexovian Level 4 • Kgaolo 1',
      isiZulu: 'Nexovian Level 4 • Isahluko 1',
      Tshivenda: 'Nexovian Level 4 • Ndima 1',
      Sesotho: 'Nexovian Level 4 • Kgaolo 1',
      Setswana: 'Nexovian Level 4 • Kgaolo 1',
      Siswati: 'Nexovian Level 4 • Sehluko 1',
      isiNdebele: 'Nexovian Level 4 • Isigaba 1',
      isiXhosa: 'Nexovian Level 4 • Isahluko 1',
      Afrikaans: 'Nexovian Vlak 4 • Hoofstuk 1',
      English: 'Nexovian Level 4 • Chapter 1'
    },
    titleByLanguage: {
      Xitsonga: 'Ku Tirhisa Data ya Hofisi Level 4 (Office Data Processing)',
      Sepedi: 'Tshepedišo ya Datha ya Ofisi Level 4',
      isiZulu: 'Ukucutshungulwa Kwedatha Yehhovisi Level 4',
      Tshivenda: 'U Shuma nga Datha ya Ofisi Level 4',
      Sesotho: 'Tshebetso ya Data ya Ofisi Level 4',
      Setswana: 'Tsamaiso ya Datha ya Ofisi Level 4',
      Siswati: 'Kusebenta ngeDatha yeLihhovisi Level 4',
      isiNdebele: 'Ukusetjenziswa Kwedatha Ye-ofisi Level 4',
      isiXhosa: 'Ukuqhubekekiswa Kwedatha ye-Ofisi Level 4',
      Afrikaans: 'Kantoordataverwerking Vlak 4',
      English: 'Office Data Processing Level 4'
    },
    subtitleByLanguage: {
      Xitsonga: 'Excel ya Xiyimo xa le Henhla (Pivot Tables, Tifomula), Masungulo ya Database, Swiviko & Vuhlayiseki bya Data',
      Sepedi: 'Excel ya Maemo a Godimo (Pivot Tables), Motheo wa Database, Dipego tša Profešenale & Nepagalo le Polokego ya Datha',
      isiZulu: 'I-Excel Esezingeni Eliphezulu (Pivot Tables), Izisekelo ze-Database, Imibiko Yobungcweti & Ukunemba Nokuvikeleka Kwedatha',
      Tshivenda: 'Excel ya Maimo a Ntha (Pivot Tables), Mutheo wa Database, Mivhigo & Tsireledzo ya Datha',
      Sesotho: 'Excel e Tsoetseng Pele (Pivot Tables), Metheo ya Database, Ditlaleho & Polokeho ya Data',
      Setswana: 'Excel e e Tsweletseng Pele (Pivot Tables), Metheo ya Database, Dipegelo & Pabalesego ya Datha',
      Siswati: 'Excel Lesetulu (Pivot Tables), Tisekelo te-Database, Imibiko & Kuvikeleka Kwedatha',
      isiNdebele: 'Excel Ephakemeko (Pivot Tables), Iinsisekelo ze-Database, Imibiko & Ukuvikeleka Kwedatha',
      isiXhosa: 'I-Excel Ephucukileyo (Pivot Tables), Iziseko ze-Database, Iingxelo & Ukhuseleko lweDatha',
      Afrikaans: 'Gevorderde Excel (Pivot Tables), Databasisbasisse, Professionele Verslae & Data-akkuraatheid en Sekuriteit',
      English: 'Advanced Excel (Pivot Tables, Advanced Functions), Database Basics, Professional Reports & Data Accuracy & Security'
    },
    summaryByLanguage: {
      Xitsonga:
        'Ku Tirhisa Data ya Hofisi Level 4 hi Xitsonga: Excel ya xiyimo xa le henhla (Pivot Tables, =SUMIFS, =VLOOKUP, Data Validation), masungulo ya Relational Database (Tables, Primary & Foreign Keys, Queries, Reports), ku tsala Swiviko swa Xiprofexinali, na ku hlayisa Data Accuracy & Security hi backup, password na POPIA.',
      Sepedi:
        'Tshepedišo ya Datha ya Ofisi Level 4 ka Sepedi: Excel ya maemo a godimo (Pivot Tables, =SUMIFS, =VLOOKUP, Data Validation), motheo wa Relational Database (Primary & Foreign Keys, Queries, Reports), go ngwala Dipego tša Profešenale, le go boloka Nepagalo le Polokego ya Tshedimošo ka backups le POPIA.',
      isiZulu:
        'Ukucutshungulwa Kwedatha Yehhovisi Level 4 ngesiZulu: I-Excel esezingeni eliphezulu (Pivot Tables, =SUMIFS, =VLOOKUP, Data Validation), izisekelo ze-Relational Database (Primary & Foreign Keys, Queries, Reports), ukubhala Imibiko Yobungcweti, nokugcina i-Data Accuracy & Security ngama-backup ne-POPIA.',
      Tshivenda:
        'U Shuma nga Datha ya Ofisi Level 4 nga Tshivenda: Excel ya maimo a ntha (Pivot Tables, =SUMIFS, =VLOOKUP), mutheo wa Database (Primary & Foreign Keys, Queries), mivhigo ya phurofeshenala, na u tsireledza datha nga POPIA.',
      Sesotho:
        'Tshebetso ya Data ya Ofisi Level 4 ka Sesotho: Excel e tsoetseng pele (Pivot Tables, =SUMIFS, =VLOOKUP), metheo ya Database (Primary & Foreign Keys, Queries), ditlaleho tsa botsebi, le polokeho ya data.',
      Setswana:
        'Tsamaiso ya Datha ya Ofisi Level 4 ka Setswana: Excel e e tsweletseng pele (Pivot Tables, =SUMIFS, =VLOOKUP), metheo ya Database, dipegelo tsa porofešenale, le pabalesego ya datha.',
      Siswati:
        'Kusebenta ngeDatha yeLihhovisi Level 4 ngeSiswati: Excel lesetulu (Pivot Tables, =SUMIFS, =VLOOKUP), tisekelo te-Database, imibiko yebungcweti, nekuvikeleka kwedatha.',
      isiNdebele:
        'Ukusetjenziswa Kwedatha Ye-ofisi Level 4 ngesiNdebele: Excel ephakemeko (Pivot Tables, =SUMIFS, =VLOOKUP), iinsisekelo ze-Database, imibiko yobungcweti, nokuvikeleka kwedatha.',
      isiXhosa:
        'Ukuqhubekekiswa Kwedatha ye-Ofisi Level 4 ngesiXhosa: I-Excel ephucukileyo (Pivot Tables, =SUMIFS, =VLOOKUP), iziseko ze-Database, iingxelo zobungcali, nokhuseleko lwedatha.',
      Afrikaans:
        'Kantoordataverwerking Vlak 4 in Afrikaans: Gevorderde Excel (Pivot Tables, =SUMIFS, =VLOOKUP, Data-validering), Relasionele Databasisse (Primêre/Vreemde Sleutels, Navrae), Professionele Verslae en Datasekuriteit (rugsteun & POPIA).',
      English:
        'Office Data Processing Level 4 equips senior office staff with executive data skills: Advanced Excel (Pivot Tables, =SUMIFS, =VLOOKUP, Data Validation), Relational Database basics (Tables, Primary & Foreign Keys, Queries, and Reports), formatting polished Professional Reports with executive summaries and visuals, and enforcing Data Accuracy & Security through backups, strong passwords, access permissions, and POPIA compliance.'
    },
    keyTerms: [
      {
        termEn: 'Pivot Table',
        translations: {
          Xitsonga: 'Tafula ro Hlengeleta Mahungu hi Kuhatlisa (Pivot Table)',
          Sepedi: 'Tafola ya Kakaretšo ya Excel (Pivot Table)',
          isiZulu: 'Ithebula Lokufingqa Idatha (Pivot Table)',
          Tshivenda: 'Thafula ya Manweledzo kha Excel (Pivot Table)',
          Sesotho: 'Tafole ya Kakaretso ya Excel (Pivot Table)',
          Setswana: 'Tafole ya Tshobokanyo ya Excel (Pivot Table)',
          Siswati: 'Lithebula Lekufinyeta Idatha (Pivot Table)',
          isiNdebele: 'Ithebula Lokufinyeza Idatha (Pivot Table)',
          isiXhosa: 'Itheyibhile yoShwankathelo lwe-Excel (Pivot Table)',
          Afrikaans: 'Draaitabel (Pivot Table)',
          English: 'Interactive Excel tool that groups, sums & compares large data rows'
        },
        meaningByLanguage: {
          Xitsonga: 'Yi hlengeleta madzana ya tilayini ta ku xavisa hi xiyenge, rhavi, kumbe n’hweti hi kuhatlisa handle ko tsala tifomula.',
          Sepedi: 'E kopanya makgolo a methalo ya dithekišo ka karolo, lekala, goba kgwedi ka metsotswana ntle le go ngwala difomula.',
          isiZulu: 'Ifingqa amakhulu emigqa yokuthengisa ngokwezigaba, amagatsha, noma izinyanga ngemizuzwana ngaphandle kokubhala ama-formula.',
          Tshivenda: 'I kuvhanganya dzithala dza thengiso nga tshigwada kana nwedzi nga u tavhanya.',
          Sesotho: 'E akaretsa mela e makgolo ya dithekiso ka sehlopha kapa kgwedi ka metsotswana.',
          Setswana: 'E sobokanya mela e mentsi ya dithekiso ka setlhopha kgotsa kgwedi ka bonako.',
          Siswati: 'Ifinyeta emakhulu emigca yekutsengisa ngemacembu nome ngenyanga ngekushesha.',
          isiNdebele: 'Ifinyeza amakhulu wemida yokuthengisa ngokwemikhakha namkha ngeenyanga msinyana.',
          isiXhosa: 'Ishwankathela amakhulu emigca yentengiso ngodidi, isebe, okanye inyanga ngokukhawuleza.',
          Afrikaans: 'Som honderde verkoops- of uitgawerye binne sekondes per kategorie, tak of maand op.',
          English: 'Summarises hundreds of sales or expense rows by category, branch, or month in seconds without writing manual formulas.'
        }
      },
      {
        termEn: 'Relational Database (Primary & Foreign Key)',
        translations: {
          Xitsonga: 'Database yo Hlanganisa Matafula (Primary & Foreign Key)',
          Sepedi: 'Database ye e Kgokagantšwego (Primary & Foreign Key)',
          isiZulu: 'I-Database Exhumene (Primary & Foreign Key)',
          Tshivenda: 'Dathabeisi yo Tanganywaho (Primary & Foreign Key)',
          Sesotho: 'Database e Hokahaneng (Primary & Foreign Key)',
          Setswana: 'Database e e Golaganeng (Primary & Foreign Key)',
          Siswati: 'I-Database Lehlangene (Primary & Foreign Key)',
          isiNdebele: 'I-Database Ehlangeneko (Primary & Foreign Key)',
          isiXhosa: 'I-Database Edityanisiweyo (Primary & Foreign Key)',
          Afrikaans: 'Relasionele Databasis (Primêre & Vreemde Sleutel)',
          English: 'Primary Key = unique record ID; Foreign Key = links tables together'
        },
        meaningByLanguage: {
          Xitsonga: 'Swi sivela ku phindha tirhekodo ta vakasitoma no pfumelela Queries ku koka ti-invoice leti pakanisaka.',
          Sepedi: 'Di thibela go boeletša direkhoto tša bareki le go dumelela Queries go hwetša di-invoice tše di nepagetšego.',
          isiZulu: 'Kuvimbela ukuphindwa kwamarekhodi amakhasimende futhi kuvumela ama-Queries adonse ama-invoice afanayo ngokunemba.',
          Tshivenda: 'Zwi thivhela u dovholola dzirekhodo dza vharengi nahone zwi tendela Queries u wana dzi-invoice.',
          Sesotho: 'Ho thibela ho pheta direkoto tsa bareki le ho dumella Queries ho hula di-invoice ka nepo.',
          Setswana: 'Go thibela go boelela direkoto tsa bareki le go letla Queries go bona di-invoice ka nepo.',
          Siswati: 'Kuvimbela kuphindza emarekhodi emakhasimende nekuvumela ema-Queries atfole ema-invoice ngco.',
          isiNdebele: 'Kukhandela ukubuyelelwa kwamarekhodi wabathengi begodu kuvumela ama-Queries ukuthola ama-invoice ngokunemba.',
          isiXhosa: 'Kuthintela ukuphindwa kweerekhodi zabathengi kwaye kuvumela ii-Queries zikhuphe ii-invoice ngokuchanekileyo.',
          Afrikaans: 'Voorkom duplikaatrekords en laat navrae (Queries) fakture en kliënte akkuraat koppel.',
          English: 'Prevents duplicate client records and lets Queries pull matching invoices and customer names accurately.'
        }
      },
      {
        termEn: 'Data Accuracy & Security',
        translations: {
          Xitsonga: 'Ntiyiso & Vuhlayiseki bya Mahungu (Data Accuracy & Security)',
          Sepedi: 'Nepagalo & Polokego ya Tshedimošo (Data Accuracy & Security)',
          isiZulu: 'Ukunemba & Ukuvikeleka Kwedatha (Data Accuracy & Security)',
          Tshivenda: 'Vhukuma & Tsireledzo ya Datha (Data Accuracy & Security)',
          Sesotho: 'Nepo & Polokeho ya Data (Data Accuracy & Security)',
          Setswana: 'Nepo & Pabalesego ya Datha (Data Accuracy & Security)',
          Siswati: 'Kucondza & Kuvikeleka Kwedatha (Data Accuracy & Security)',
          isiNdebele: 'Ukunemba & Ukuvikeleka Kwedatha (Data Accuracy & Security)',
          isiXhosa: 'Uchaneko & Ukhuseleko lweDatha (Data Accuracy & Security)',
          Afrikaans: 'Data-akkuraatheid & Sekuriteit (Data Accuracy & Security)',
          English: 'Checking figures (validation) & protecting files via backups/passwords'
        },
        meaningByLanguage: {
          Xitsonga: 'Swi hlanganisa Excel Data Validation na ku kambela matsalwa, ti-password, access permissions, na backup ya siku na siku.',
          Sepedi: 'Di kopanya Excel Data Validation le go bala gape, di-password tše maatla, le di-backup tša letšatši le letšatši.',
          isiZulu: 'Kuhlanganisa i-Excel Data Validation nokuhlola amaphutha, ama-password aqinile, nezimvume zokungena, nama-backup nsuku zonke.',
          Tshivenda: 'Zwi tanganya Data Validation na phasiwede dzo khwathaho na backup ya duvha linwe na linwe.',
          Sesotho: 'Ho kopanya Data Validation le di-password tse matla le di-backup tsa letsatsi le letsatsi.',
          Setswana: 'Go kopanya Data Validation le di-password tse di nonofileng le di-backup tsa letsatsi le letsatsi.',
          Siswati: 'Kuhlanganisa Data Validation nema-password lacinile nema-backup emalanga onkhe.',
          isiNdebele: 'Kuhlanganisa i-Data Validation nama-password aqinileko nama-backup wamalanga woke.',
          isiXhosa: 'Kudibanisa i-Data Validation nee-password eziqinileyo nee-backup zemihla ngemihla.',
          Afrikaans: 'Kombineer Excel Data-validering en proeflees met enkripsie, toegangsregte en daaglikse rugsteun.',
          English: 'Combines Excel Data Validation and proofreading with encryption, role-based access, and daily cloud backups.'
        }
      }
    ],
    workedExample: {
      questionByLanguage: {
        Xitsonga: 'Xikombiso xa Pivot Table: Xiphephana xa Excel xi ni tilayini ta 4 ta ku xavisa: Stationery = R2 400, Printing = R1 600, Stationery = R3 000, Binding = R1 000. (a) Hlamusela tindhawu ta 2 ta Pivot Table leti u kokelaka "Category" na "Sales" eka tona, na (b) hlaya leswi Pivot Table yi swi kombaka eka Stationery na Grand Total.',
        Sepedi: 'Mohlala wa Pivot Table: Letlakala la Excel le na le methalo e 4 ya dithekišo: Stationery = R2 400, Printing = R1 600, Stationery = R3 000, Binding = R1 000. (a) Hlaloša dikarolo tše 2 tša Pivot Table tšeo o gogelago "Category" le "Sales" go tšona, le (b) balela palomoka ya Stationery le Grand Total.',
        isiZulu: 'Isibonelo se-Pivot Table: Ishidi le-Excel linemigqa emi-4 yokuthengisa: Stationery = R2 400, Printing = R1 600, Stationery = R3 000, Binding = R1 000. (a) Chaza izindawo ezi-2 ze-Pivot Table ohudulela kuzo u-"Category" no-"Sales", (b) ubale lokho i-Pivot Table ekubonisa ku-Stationery kanye ne-Grand Total.',
        Tshivenda: 'Tsumbo ya Pivot Table: Excel i na thala dza 4: Stationery = R2 400, Printing = R1 600, Stationery = R3 000, Binding = R1 000. (a) Talusani fhethu huvhili ha Pivot Table, (b) vhalelani Stationery na Grand Total.',
        Sesotho: 'Mohlala wa Pivot Table: Excel e na le mela e 4: Stationery = R2 400, Printing = R1 600, Stationery = R3 000, Binding = R1 000. (a) Hlalosa dibaka tse 2 tsa Pivot Table, (b) bala Stationery le Grand Total.',
        Setswana: 'Sekao sa Pivot Table: Excel e na le mela e 4: Stationery = R2 400, Printing = R1 600, Stationery = R3 000, Binding = R1 000. (a) Tlhalosa mafelo a 2 a Pivot Table, (b) bala Stationery le Grand Total.',
        Siswati: 'Sibonelo se-Pivot Table: Excel inemigca lemi-4: Stationery = R2 400, Printing = R1 600, Stationery = R3 000, Binding = R1 000. (a) Chaza tindzawo leti-2 te-Pivot Table, (b) bala Stationery ne-Grand Total.',
        isiNdebele: 'Isibonelo se-Pivot Table: I-Excel inemida emi-4: Stationery = R2 400, Printing = R1 600, Stationery = R3 000, Binding = R1 000. (a) Hlathulula iindawo ezi-2 ze-Pivot Table, (b) bala Stationery ne-Grand Total.',
        isiXhosa: 'Umzekelo we-Pivot Table: I-Excel inemigca emi-4: Stationery = R2 400, Printing = R1 600, Stationery = R3 000, Binding = R1 000. (a) Cacisa iindawo ezi-2 ze-Pivot Table, (b) ubale i-Stationery ne-Grand Total.',
        Afrikaans: '’n Tak-sigblad het 4 rye: Stationery = R2 400, Printing = R1 600, Stationery = R3 000, Binding = R1 000. (a) Verduidelik die 2 Pivot Table-areas vir "Category" en "Sales", en (b) bereken Stationery en Grand Total.',
        English: 'A branch spreadsheet records 4 sales rows: Stationery = R2 400, Printing = R1 600, Stationery = R3 000, Binding = R1 000. (a) Explain the 2 Pivot Table areas you drag "Category" and "Sales" into to summarise totals by category, and (b) calculate what the Pivot Table displays for Stationery and for the Grand Total.'
      },
      stepsByLanguage: {
        Xitsonga: [
          '1. Hlawula tafula -> Insert -> PivotTable. Koka "Category" u veka eka ROWS kutani u koka "Sales (R)" eka VALUES (yi vekiwa eka Sum).',
          '2. Pivot Table yi hlengeleta swiyenge leswi fanaka hi yoxe: Stationery = R2 400 + R3 000 = R5 400; Printing = R1 600; Binding = R1 000.',
          '3. Grand Total = R5 400 + R1 600 + R1 000 = R8 000. (Xiya: =SUMIFS(B2:B5, A2:A5, "Stationery") na yona yi nyika R5 400).'
        ],
        Sepedi: [
          '1. Kgetha tafola -> Insert -> PivotTable. Gogela "Category" ka go ROWS gomme o gogele "Sales (R)" ka go VALUES (Sum).',
          '2. Pivot Table e kopanya dikarolo tše di swanago ka boyona: Stationery = R2 400 + R3 000 = R5 400; Printing = R1 600; Binding = R1 000.',
          '3. Grand Total = R5 400 + R1 600 + R1 000 = R8 000. (Tseba: =SUMIFS(B2:B5, A2:A5, "Stationery") le yona e fa R5 400).'
        ],
        isiZulu: [
          '1. Khetha ithebula -> Insert -> PivotTable. Hudula u-"Category" uye ku-ROWS bese uhudula u-"Sales (R)" uye ku-VALUES (ibekwe ku-Sum).',
          '2. I-Pivot Table ihlanganisa izigaba ezifanayo ngokuzenzakalela: Stationery = R2 400 + R3 000 = R5 400; Printing = R1 600; Binding = R1 000.',
          '3. I-Grand Total = R5 400 + R1 600 + R1 000 = R8 000. (Qaphela: =SUMIFS(B2:B5, A2:A5, "Stationery") nayo ikhipha u-R5 400).'
        ],
        Tshivenda: [
          '1. Insert -> PivotTable. Dzhenisani "Category" kha ROWS na "Sales (R)" kha VALUES (Sum).',
          '2. Stationery = R2 400 + R3 000 = R5 400; Printing = R1 600; Binding = R1 000.',
          '3. Grand Total = R5 400 + R1 600 + R1 000 = R8 000. (=SUMIFS(B2:B5, A2:A5, "Stationery") i fha R5 400).'
        ],
        Sesotho: [
          '1. Insert -> PivotTable. Hudela "Category" ho ROWS le "Sales (R)" ho VALUES (Sum).',
          '2. Stationery = R2 400 + R3 000 = R5 400; Printing = R1 600; Binding = R1 000.',
          '3. Grand Total = R5 400 + R1 600 + R1 000 = R8 000. (=SUMIFS(B2:B5, A2:A5, "Stationery") e fana ka R5 400).'
        ],
        Setswana: [
          '1. Insert -> PivotTable. Gogela "Category" mo ROWS le "Sales (R)" mo VALUES (Sum).',
          '2. Stationery = R2 400 + R3 000 = R5 400; Printing = R1 600; Binding = R1 000.',
          '3. Grand Total = R5 400 + R1 600 + R1 000 = R8 000. (=SUMIFS(B2:B5, A2:A5, "Stationery") e naya R5 400).'
        ],
        Siswati: [
          '1. Insert -> PivotTable. Hudula "Category" uye ku-ROWS ne-"Sales (R)" ku-VALUES (Sum).',
          '2. Stationery = R2 400 + R3 000 = R5 400; Printing = R1 600; Binding = R1 000.',
          '3. Grand Total = R5 400 + R1 600 + R1 000 = R8 000. (=SUMIFS(B2:B5, A2:A5, "Stationery") inika R5 400).'
        ],
        isiNdebele: [
          '1. Insert -> PivotTable. Dosa "Category" uye ku-ROWS ne-"Sales (R)" ku-VALUES (Sum).',
          '2. Stationery = R2 400 + R3 000 = R5 400; Printing = R1 600; Binding = R1 000.',
          '3. Grand Total = R5 400 + R1 600 + R1 000 = R8 000. (=SUMIFS(B2:B5, A2:A5, "Stationery") inikela R5 400).'
        ],
        isiXhosa: [
          '1. Insert -> PivotTable. Tsala "Category" uye kwi-ROWS ne-"Sales (R)" kwi-VALUES (Sum).',
          '2. Stationery = R2 400 + R3 000 = R5 400; Printing = R1 600; Binding = R1 000.',
          '3. Grand Total = R5 400 + R1 600 + R1 000 = R8 000. (=SUMIFS(B2:B5, A2:A5, "Stationery") inika u-R5 400).'
        ],
        Afrikaans: [
          '1. Kies data -> Insert -> PivotTable. Sleep "Category" na ROWS en "Sales (R)" na VALUES (Sum).',
          '2. Draaitabel groepeer outomaties: Stationery = R2 400 + R3 000 = R5 400; Printing = R1 600; Binding = R1 000.',
          '3. Grand Total = R5 400 + R1 600 + R1 000 = R8 000. (=SUMIFS(B2:B5, A2:A5, "Stationery") gee ook R5 400).'
        ],
        English: [
          '1. Select the data table -> Insert -> PivotTable. Drag "Category" into the ROWS area and "Sales (R)" into the VALUES area (set to Sum).',
          '2. The Pivot Table groups duplicate categories automatically: Stationery = R2 400 + R3 000 = R5 400; Printing = R1 600; Binding = R1 000.',
          '3. Grand Total = R5 400 + R1 600 + R1 000 = R8 000. (Note: =SUMIFS(B2:B5, A2:A5, "Stationery") also returns R5 400).'
        ]
      },
      finalAnswerByLanguage: {
        Xitsonga: '(a) Category -> Rows, Sales -> Values (Sum)  |  (b) Stationery = R5 400, Grand Total = R8 000',
        Sepedi: '(a) Category -> Rows, Sales -> Values (Sum)  |  (b) Stationery = R5 400, Grand Total = R8 000',
        isiZulu: '(a) Category -> Rows, Sales -> Values (Sum)  |  (b) Stationery = R5 400, Grand Total = R8 000',
        Tshivenda: '(a) Category -> Rows, Sales -> Values (Sum)  |  (b) Stationery = R5 400, Grand Total = R8 000',
        Sesotho: '(a) Category -> Rows, Sales -> Values (Sum)  |  (b) Stationery = R5 400, Grand Total = R8 000',
        Setswana: '(a) Category -> Rows, Sales -> Values (Sum)  |  (b) Stationery = R5 400, Grand Total = R8 000',
        Siswati: '(a) Category -> Rows, Sales -> Values (Sum)  |  (b) Stationery = R5 400, Grand Total = R8 000',
        isiNdebele: '(a) Category -> Rows, Sales -> Values (Sum)  |  (b) Stationery = R5 400, Grand Total = R8 000',
        isiXhosa: '(a) Category -> Rows, Sales -> Values (Sum)  |  (b) Stationery = R5 400, Grand Total = R8 000',
        Afrikaans: '(a) Category -> Rows, Sales -> Values (Sum)  |  (b) Stationery = R5 400, Grand Total = R8 000',
        English: '(a) Category -> Rows, Sales -> Values (Sum)  |  (b) Stationery = R5 400, Grand Total = R8 000'
      }
    },
    practiceQuestions: [
      {
        number: 1,
        questionByLanguage: {
          Xitsonga: 'Xivutiso 1 (Nexovian): Hlamusela ku hambana exikarhi ka Primary Key na Foreign Key eka database, u vula leswaku Query yi endla yini.',
          Sepedi: 'Potšišo 1 (Nexovian): Hlaloša phapano magareng ga Primary Key le Foreign Key ka gare ga database, gomme o bolele gore Query e dira eng.',
          isiZulu: 'Umbuzo 1 (Nexovian): Chaza umehluko phakathi kwe-Primary Key ne-Foreign Key ku-database, bese usho ukuthi i-Query yenzani.',
          Tshivenda: 'Mbudziso 1 (Nexovian): Fhambanyani Primary Key na Foreign Key kha database, ni bule uri Query i shuma mini.',
          Sesotho: 'Potso 1 (Nexovian): Hlalosa phapano pakeng tsa Primary Key le Foreign Key ho database, le seo Query e se etsang.',
          Setswana: 'Potso 1 (Nexovian): Tlhalosa pharologanyo fa gare ga Primary Key le Foreign Key mo database, le gore Query e dirang.',
          Siswati: 'Umbuto 1 (Nexovian): Chaza umehluko we-Primary Key ne-Foreign Key ku-database, nekutsi i-Query yentani.',
          isiNdebele: 'Umbuzo 1 (Nexovian): Hlathulula umehluko we-Primary Key ne-Foreign Key ku-database, nokuthi i-Query yenzani.',
          isiXhosa: 'Umbuzo 1 (Nexovian): Cacisa umahluko we-Primary Key ne-Foreign Key kwi-database, nento eyenziwa yi-Query.',
          Afrikaans: 'Vraag 1 (Nexovian): Verduidelik die verskil tussen ’n Primêre Sleutel en Vreemde Sleutel in ’n databasis, en wat ’n Query doen.',
          English: 'Nexovian Chapter Practice Q1: Explain the difference between a Primary Key and a Foreign Key in a database, and state what a Query does.'
        },
        answerByLanguage: {
          Xitsonga: 'Primary Key yi hlawula rhekodo yin’wana na yin’wana hi ku kongoma (ku nga vi na maphindhelo, xik: Client_ID). Foreign Key eka tafula rin’wana yi hlanganisa eka Primary Key yoleyo ku boha data. Query yi secha, yi hluta, no humesa tirhekodo leti pakanisaka.',
          Sepedi: 'Primary Key e kgetholla rekhoto ye nngwe le ye nngwe ka noši (ga go na poeletšo, mohlala Client_ID). Foreign Key tafoleng ye nngwe e kgokaganya le Primary Key yeo. Query e nyaka le go ntšha direkhoto tše di kgethilwego.',
          isiZulu: 'I-Primary Key ihlukanisa irekhodi ngalinye ngokukhethekile (akukho ukuphindaphinda, isib: Client_ID). I-Foreign Key kwelinye ithebula ixhuma kuleyo Primary Key ukuhlanganisa idatha. I-Query isesha futhi ikhiphe amarekhodi ahlangabezana nemibandela.',
          Tshivenda: 'Primary Key i khetha rekhodo inwe na inwe i yothe (Client_ID). Foreign Key i tanganya matafula. Query i toda na u bvisa dzirekhodo dzo khethwaho.',
          Sesotho: 'Primary Key e kgetholla rekoto e nngwe le e nngwe (Client_ID). Foreign Key e hokahanya ditafole. Query e batla le ho sefa direkoto tse hlokwang.',
          Setswana: 'Primary Key e tlhaola rekoto nngwe le nngwe (Client_ID). Foreign Key e golaganya ditafole. Query e batla le go tlhopha direkoto.',
          Siswati: 'Primary Key ihlukanisa irekhodi ngayinye (Client_ID). Foreign Key ihlanganisa emathebula. Query ifuna nekhipha emarekhodi lakhetsiwe.',
          isiNdebele: 'Primary Key ihlukanisa irekhodi ngalinye (Client_ID). Foreign Key ihlanganisa amathebula. Query ifuna nokukhipha amarekhodi akhethiweko.',
          isiXhosa: 'Primary Key ichaza irekhodi nganye ngokwahlukileyo (Client_ID). Foreign Key idibanisa iitheyibhile. I-Query ikhangela kwaye ikhuphe iirekhodi ezifunekayo.',
          Afrikaans: '’n Primêre Sleutel identifiseer elke rekord uniek (geen duplikate nie, bv. Client_ID). ’n Vreemde Sleutel skakel tabelle aan mekaar. ’n Navraag (Query) soek en filtreer spesifieke rekords.',
          English: 'A Primary Key uniquely identifies each record in a table (no duplicates allowed, e.g. Client_ID). A Foreign Key in another table links back to that Primary Key to connect data (e.g. Orders linked to Clients). A Query searches, filters, and extracts specific records that meet chosen criteria.'
        }
      },
      {
        number: 2,
        questionByLanguage: {
          Xitsonga: 'Xivutiso 2 (Nexovian): Boxa tindlela ta 3 to sirhelela Data Accuracy & Security ehofisini u xaxamela swihlawulekisi swa 3 swa Professional Report.',
          Sepedi: 'Potšišo 2 (Nexovian): Bolela mekgwa e 3 ya go šireletša Data Accuracy & Security ofising le dintlha tše 3 tša Pego ya Profešenale (Professional Report).',
          isiZulu: 'Umbuzo 2 (Nexovian): Yisho izindlela ezi-3 zokuvikela i-Data Accuracy & Security ehhovisi bese uhlela izici ezi-3 ze-Professional Report.',
          Tshivenda: 'Mbudziso 2 (Nexovian): Bulani ndila dza 3 dza u tsireledza Data Accuracy & Security na zwithu zwi-3 zwa Professional Report.',
          Sesotho: 'Potso 2 (Nexovian): Fana ka mekgwa e 3 ya ho sireletsa Data Accuracy & Security le dikarolo tse 3 tsa Professional Report.',
          Setswana: 'Potso 2 (Nexovian): Umaka ditsela tse 3 tsa go sireletsa Data Accuracy & Security le dikarolo tse 3 tsa Professional Report.',
          Siswati: 'Umbuto 2 (Nexovian): Shano tindlela leti-3 tekuvikela Data Accuracy & Security netintfo leti-3 te-Professional Report.',
          isiNdebele: 'Umbuzo 2 (Nexovian): Tjho iindlela ezi-3 zokuvikela Data Accuracy & Security nezinto ezi-3 ze-Professional Report.',
          isiXhosa: 'Umbuzo 2 (Nexovian): Xela iindlela ezi-3 zokukhusela Data Accuracy & Security nezinto ezi-3 ze-Professional Report.',
          Afrikaans: 'Vraag 2 (Nexovian): Noem 3 maniere om Data-akkuraatheid & Sekuriteit te beskerm en 3 elemente van ’n Professionele Verslag.',
          English: 'Nexovian Chapter Practice Q2: State 3 ways to protect Data Accuracy & Security in an office and list 3 key elements of a Professional Report.'
        },
        answerByLanguage: {
          Xitsonga: 'Accuracy & Security: 1. Excel Data Validation & proofreading ku kuma swihoxo, 2. Ti-password to tiya & permissions, 3. Ti-backup ta siku na siku (POPIA). Professional Reports: 1. Title page & Executive Summary, 2. Tinhlokomhaka leti nomboriweke & Table of Contents, 3. Ti-chart/matafula na swibumabumelo.',
          Sepedi: 'Accuracy & Security: 1. Excel Data Validation & proofreading, 2. Di-password tše maatla & permissions, 3. Di-backup tša letšatši (POPIA). Professional Reports: 1. Title page & Executive Summary, 2. Dihlogo tša dinomoro & Table of Contents, 3. Ditšhate/matafula le ditšhišinyo.',
          isiZulu: 'Accuracy & Security: 1. I-Excel Data Validation & ukuhlola amaphutha, 2. Ama-password aqinile & izimvume, 3. Ama-backup ansuku zonke (POPIA). Professional Reports: 1. I-Title page & Executive Summary, 2. Izihloko ezinenombolo & Table of Contents, 3. Ama-chart/amathebula nezincomo.',
          Tshivenda: 'Accuracy & Security: 1. Data Validation, 2. Phasiwede & permissions, 3. Backups (POPIA). Reports: 1. Title page & Executive Summary, 2. Table of Contents, 3. Charts & recommendations.',
          Sesotho: 'Accuracy & Security: 1. Data Validation, 2. Di-password, 3. Di-backup (POPIA). Reports: 1. Executive Summary, 2. Table of Contents, 3. Charts & recommendations.',
          Setswana: 'Accuracy & Security: 1. Data Validation, 2. Di-password, 3. Di-backup (POPIA). Reports: 1. Executive Summary, 2. Table of Contents, 3. Charts & recommendations.',
          Siswati: 'Accuracy & Security: 1. Data Validation, 2. Ema-password, 3. Ema-backup (POPIA). Reports: 1. Executive Summary, 2. Table of Contents, 3. Charts & recommendations.',
          isiNdebele: 'Accuracy & Security: 1. Data Validation, 2. Ama-password, 3. Ama-backup (POPIA). Reports: 1. Executive Summary, 2. Table of Contents, 3. Charts & recommendations.',
          isiXhosa: 'Accuracy & Security: 1. Data Validation, 2. Ii-password, 3. Ii-backup (POPIA). Reports: 1. Executive Summary, 2. Table of Contents, 3. Charts & recommendations.',
          Afrikaans: 'Akkuraatheid & Sekuriteit: 1. Excel Data-validering & proeflees, 2. Sterk wagwoorde & toegangsregte, 3. Daaglikse rugsteun (POPIA). Verslae: 1. Titelblad & Bestuursopsomming, 2. Genommerde opskrifte & Inhoudsopgawe, 3. Grafieke en aanbevelings.',
          English: 'Accuracy & Security: 1. Use Excel Data Validation & proofreading to catch input errors, 2. Use strong passwords and role-based permissions, 3. Keep encrypted daily backups (POPIA compliance). Professional Reports need: 1. Title page & Executive Summary, 2. Clear numbered headings & Table of Contents, 3. Supporting charts/tables and actionable recommendations.'
        }
      }
    ]
  },
  {
    id: 'l4-business-practice',
    level: 4,
    chapterNumber: 2,
    chapterLabelByLanguage: {
      Xitsonga: 'Nexovian Level 4 • Ndzima 2',
      Sepedi: 'Nexovian Level 4 • Kgaolo 2',
      isiZulu: 'Nexovian Level 4 • Isahluko 2',
      Tshivenda: 'Nexovian Level 4 • Ndima 2',
      Sesotho: 'Nexovian Level 4 • Kgaolo 2',
      Setswana: 'Nexovian Level 4 • Kgaolo 2',
      Siswati: 'Nexovian Level 4 • Sehluko 2',
      isiNdebele: 'Nexovian Level 4 • Isigaba 2',
      isiXhosa: 'Nexovian Level 4 • Isahluko 2',
      Afrikaans: 'Nexovian Vlak 4 • Hoofstuk 2',
      English: 'Nexovian Level 4 • Chapter 2'
    },
    titleByLanguage: {
      Xitsonga: 'Maendlelo ya Bindzu Level 4 (Business Practice)',
      Sepedi: 'Tshepedišo ya Kgwebo Level 4',
      isiZulu: 'Ukwenza Kwebhizinisi Level 4',
      Tshivenda: 'Maitele a Bindu Level 4',
      Sesotho: 'Tshebetso ya Kgwebo Level 4',
      Setswana: 'Tsamaiso ya Kgwebo Level 4',
      Siswati: 'Kusebenta kweLibhizinisi Level 4',
      isiNdebele: 'Iindlela Zebhizinisi Level 4',
      isiXhosa: 'Ukusebenza Kwezoshishino Level 4',
      Afrikaans: 'Besigheidspraktyk Vlak 4',
      English: 'Business Practice Level 4'
    },
    subtitleByLanguage: {
      Xitsonga: 'Vulawuri bya Bindzu (POLC), Masungulo ya HR, Matsalwa ya Timali (Invoices, Quotations, Petty Cash) & Vuxaka na Vakasitoma',
      Sepedi: 'Taolo ya Kgwebo (POLC), Motheo wa HR, Ditokomane tša Ditšhelete (Invoices, Quotations, Petty Cash) & Dikamano le Bareki',
      isiZulu: 'Ukuphathwa Kwebhizinisi (POLC), Izisekelo ze-HR, Amadokhumenti Ezezimali (Invoices, Quotations, Petty Cash) & Ubudlelwano Namakhasimende',
      Tshivenda: 'Ndangulo ya Bindu (POLC), Mutheo wa HR, Manwalo a Masheleni (Invoices, Quotations, Petty Cash) & Vhushaka na Vharengi',
      Sesotho: 'Taolo ya Kgwebo (POLC), Metheo ya HR, Ditokomane tsa Ditjhelete (Invoices, Quotations, Petty Cash) & Dikamano le Bareki',
      Setswana: 'Taolo ya Kgwebo (POLC), Metheo ya HR, Makwalo a Madi (Invoices, Quotations, Petty Cash) & Tirisano le Bareki',
      Siswati: 'Kuphatfwa Kwebhizinisi (POLC), Tisekelo te-HR, Emadokhumenti Etimali (Invoices, Quotations, Petty Cash) & Budlelwane Nemakhasimende',
      isiNdebele: 'Ukuphathwa Kwebhizinisi (POLC), Iinsisekelo ze-HR, Imitlolo Yeemali (Invoices, Quotations, Petty Cash) & Ubudlelwano Nabathengi',
      isiXhosa: 'Ulawulo Lweshishini (POLC), Iziseko ze-HR, Amaxwebhu Emali (Invoices, Quotations, Petty Cash) & Ubudlelwane Nabathengi',
      Afrikaans: 'Besigheidsbestuur (POLC), Menslike Hulpbronne (HR), Finansiële Dokumente (Fakture, Kwotasies, Kleinkas) & Kliënteverhoudings',
      English: 'Business Management, Human Resources Basics, Financial Documents (Invoices, Quotations, Petty Cash) & Customer Relations'
    },
    summaryByLanguage: {
      Xitsonga:
        'Maendlelo ya Bindzu Level 4 hi Xitsonga: Vulawuri bya bindzu (POLC — Planning, Organising, Leading, Controlling) na SWOT; masungulo ya Human Resources (ku thola, ti-interview, induction, leave); matsalwa ya timali lama pakanisaka (Quotations, Tax Invoices na 15% VAT, Petty Cash Imprest); na vuxaka bya Customer Relations.',
      Sepedi:
        'Tshepedišo ya Kgwebo Level 4 ka Sepedi: Taolo ya kgwebo (POLC) le SWOT; motheo wa Human Resources (go thwala, dipotšišo, induction, leave); ditokomane tša ditšhelete (Quotations, Tax Invoices ka 15% VAT, Petty Cash Imprest); le dikamano tše botse le bareki.',
      isiZulu:
        'Ukwenza Kwebhizinisi Level 4 ngesiZulu: Ukuphathwa kwebhizinisi (POLC) ne-SWOT; izisekelo ze-Human Resources (ukuqasha, ama-interview, i-induction, i-leave); amadokhumenti ezezimali (Quotations, Tax Invoices ne-15% VAT, Petty Cash Imprest); nobudlelwano obuhle namakhasimende.',
      Tshivenda:
        'Maitele a Bindu Level 4 nga Tshivenda: Ndangulo ya bindu (POLC) na SWOT; mutheo wa Human Resources; manwalo a masheleni (Quotations, Tax Invoices na 15% VAT, Petty Cash); na vhushaka ha vharengi.',
      Sesotho:
        'Tshebetso ya Kgwebo Level 4 ka Sesotho: Taolo ya kgwebo (POLC) le SWOT; metheo ya HR; ditokomane tsa ditjhelete (Quotations, Tax Invoices tsa 15% VAT, Petty Cash); le dikamano le bareki.',
      Setswana:
        'Tsamaiso ya Kgwebo Level 4 ka Setswana: Taolo ya kgwebo (POLC) le SWOT; metheo ya HR; makwalo a madi (Quotations, Tax Invoices tsa 15% VAT, Petty Cash); le tirisano le bareki.',
      Siswati:
        'Kusebenta kweLibhizinisi Level 4 ngeSiswati: Kuphatfwa kwebhizinisi (POLC) ne-SWOT; tisekelo te-HR; emadokhumenti etimali (Quotations, Tax Invoices ta-15% VAT, Petty Cash); nebudlelwane nemakhasimende.',
      isiNdebele:
        'Iindlela Zebhizinisi Level 4 ngesiNdebele: Ukuphathwa kwebhizinisi (POLC) ne-SWOT; iinsisekelo ze-HR; imitlolo yeemali (Quotations, Tax Invoices ezi-15% VAT, Petty Cash); nobudlelwano nabathengi.',
      isiXhosa:
        'Ukusebenza Kwezoshishino Level 4 ngesiXhosa: Ulawulo lweshishini (POLC) ne-SWOT; iziseko ze-HR; amaxwebhu emali (Quotations, Tax Invoices ezi-15% VAT, Petty Cash); nobudlelwane nabathengi.',
      Afrikaans:
        'Besigheidspraktyk Vlak 4 in Afrikaans: Bestuursfunksies (POLC) en SWOT; Menslike Hulpbronne-basisse (werwing, onderhoude, induksie); Finansiële Dokumente (Kwotasies, Belastingfakture met 15% BTW, Kleinkas); en Kliënteverhoudings.',
      English:
        'Business Practice Level 4 focuses on four core pillars tested in senior office exams: Business Management using POLC (Planning, Organising, Leading, Controlling) and SWOT analysis; Human Resources (HR) basics (job descriptions, recruitment, interviews, induction, and leave records); accurate Financial Documents (Quotations before sale, Tax Invoices with 15% VAT, and the Petty Cash Imprest system); and Customer Relations that retain loyal clients through fast after-sales support.'
    },
    keyTerms: [
      {
        termEn: 'Business Management (POLC)',
        translations: {
          Xitsonga: 'Vulawuri bya Bindzu (POLC)',
          Sepedi: 'Taolo ya Kgwebo (POLC)',
          isiZulu: 'Ukuphathwa Kwebhizinisi (POLC)',
          Tshivenda: 'Ndangulo ya Bindu (POLC)',
          Sesotho: 'Taolo ya Kgwebo (POLC)',
          Setswana: 'Taolo ya Kgwebo (POLC)',
          Siswati: 'Kuphatfwa Kwebhizinisi (POLC)',
          isiNdebele: 'Ukuphathwa Kwebhizinisi (POLC)',
          isiXhosa: 'Ulawulo Lweshishini (POLC)',
          Afrikaans: 'Besigheidsbestuur (POLC)',
          English: 'Planning, Organising, Leading & Controlling business goals'
        },
        meaningByLanguage: {
          Xitsonga: 'Mitirho ya 4 ya vurhangeri: ku veka swikongomelo (Plan), ku avela switirhisiwa (Organise), ku khutaza ntlawa (Lead), na ku kambela mbuyelo (Control).',
          Sepedi: 'Mešomo e 4 ya bolaodi: go beakanya (Plan), go rulaganya (Organise), go hlahla (Lead), le go lekola dipoelo (Control).',
          isiZulu: 'Imisebenzi emi-4 yabaphathi: ukuhlela izinhloso (Plan), ukuhlela izinsiza (Organise), ukugqugquzela ithimba (Lead), nokuhlola imiphumela (Control).',
          Tshivenda: 'Mishumo ya 4 ya vhalanguli: Planning, Organising, Leading, na Controlling.',
          Sesotho: 'Mesebetsi e 4 ya botsamaisi: Planning, Organising, Leading, le Controlling.',
          Setswana: 'Ditiro tse 4 tsa botsamaisi: Planning, Organising, Leading, le Controlling.',
          Siswati: 'Imisebenti le-4 yebaphatsi: Planning, Organising, Leading, ne-Controlling.',
          isiNdebele: 'Imisebenzi emi-4 yabaphathi: Planning, Organising, Leading, ne-Controlling.',
          isiXhosa: 'Imisebenzi emi-4 yolawulo: Planning, Organising, Leading, ne-Controlling.',
          Afrikaans: 'Die 4 bestuurstake: Beplan (Plan), Organiseer (Organise), Lei (Lead) en Beheer (Control).',
          English: 'The 4 core management tasks: set goals (Plan), assign resources (Organise), motivate teams (Lead), and check results (Control).'
        }
      },
      {
        termEn: 'Human Resources (HR) Basics',
        translations: {
          Xitsonga: 'Vulawuri bya Vatirhi (Human Resources)',
          Sepedi: 'Motheo wa Bašomi (Human Resources)',
          isiZulu: 'Izisekelo Ze-Human Resources (HR)',
          Tshivenda: 'Ndangulo ya Vhashumi (HR)',
          Sesotho: 'Motheo wa Basebetsi (HR)',
          Setswana: 'Motheo wa Badiri (HR)',
          Siswati: 'Tisekelo Te-Human Resources (HR)',
          isiNdebele: 'Iinsisekelo Ze-Human Resources (HR)',
          isiXhosa: 'Iziseko Ze-Human Resources (HR)',
          Afrikaans: 'Menslike Hulpbronne (HR)',
          English: 'Recruiting, inducting, training & caring for employees fairly'
        },
        meaningByLanguage: {
          Xitsonga: 'Yi khoma swinavetiso swa mintirho, ku hlawula, tikontiraka, ku amukela vatirhi lavantshwa (onboarding), na tirhejistara ta leave.',
          Sepedi: 'E šoma ka dipapatšo tša mošomo, kgetho, dikonteraka, kamogelo ya bašomi ba bafsa, le direjisetara tša leave.',
          isiZulu: 'Iphatha izikhangiso zemisebenzi, ukuhlunga, izinkontileka, ukwethula abasebenzi abasha (onboarding), namarejista e-leave.',
          Tshivenda: 'I shuma nga mikandiso ya mishumo, dziphambano, dzikontiraka, na dziredzhisitara dza leave.',
          Sesotho: 'E sebetsana le dipapatso tsa mesebetsi, dikonteraka, le direjistara tsa phomolo.',
          Setswana: 'E dira ka diphatlalatso tsa ditiro, dikonteraka, le direjistara tsa boikhutso.',
          Siswati: 'Isebenta ngetikhangiso temisebenti, tikontileka, nemarejista e-leave.',
          isiNdebele: 'Isebenza ngeenmemezelo zemisebenzi, iinkontraka, namarejista we-leave.',
          isiXhosa: 'Iphatha izibhengezo zemisebenzi, izivumelwano zengqesho, neerejista ze-leave.',
          Afrikaans: 'Hanteer posadvertensies, kortlyste, dienskontrakte, indiensopleiding en verlofregisters.',
          English: 'Handles job adverts, shortlisting, employment contracts, onboarding, leave registers, and performance reviews.'
        }
      },
      {
        termEn: 'Quotation, Tax Invoice & Petty Cash',
        translations: {
          Xitsonga: 'Quotation, Tax Invoice (15% VAT) & Petty Cash',
          Sepedi: 'Quotation, Tax Invoice (15% VAT) & Petty Cash',
          isiZulu: 'I-Quotation, i-Tax Invoice (15% VAT) & Petty Cash',
          Tshivenda: 'Quotation, Tax Invoice (15% VAT) & Petty Cash',
          Sesotho: 'Quotation, Tax Invoice (15% VAT) & Petty Cash',
          Setswana: 'Quotation, Tax Invoice (15% VAT) & Petty Cash',
          Siswati: 'I-Quotation, i-Tax Invoice (15% VAT) & Petty Cash',
          isiNdebele: 'I-Quotation, i-Tax Invoice (15% VAT) & Petty Cash',
          isiXhosa: 'I-Quotation, i-Tax Invoice (15% VAT) & Petty Cash',
          Afrikaans: 'Kwotasie, Belastingfaktuur (15% BTW) & Kleinkas',
          English: 'Price offer before sale, legal bill with 15% VAT & small-cash fund'
        },
        meaningByLanguage: {
          Xitsonga: 'Quotation yi komba ntsengo emahlweni ko odara; Tax Invoice yi kombela ku hakeriwa endzhaku ko yisa swilo; Petty Cash yi hakela swikoxo leswitsongo ehofisini.',
          Sepedi: 'Quotation e laetša theko pele ga odara; Tax Invoice e kgopela tefo ka morago ga thomelo; Petty Cash e lefa ditshenyagalelo tše nnyane tša ka mehla.',
          isiZulu: 'I-Quotation isho inani ngaphambi koku-oda; i-Tax Invoice icela inkokhelo ngemva kokulethwa; i-Petty Cash ikhokhela izindleko ezincane ehhovisi.',
          Tshivenda: 'Quotation i sumbedza mutengo phanda ha odara; Tax Invoice i humbela mbadelo nga murahu; Petty Cash i badela zwithu zwituku.',
          Sesotho: 'Quotation e bontsha theko pele ho odara; Tax Invoice e kopa tefo kamora moo; Petty Cash e lefa ditshenyehelo tse nyane.',
          Setswana: 'Quotation e bontsha tlhwatlhwa pele ga odara; Tax Invoice e kopa tuelo morago; Petty Cash e duela ditshenyegelo tse dinnye.',
          Siswati: 'I-Quotation ikhomba intsengo ngembili kweku-oda; i-Tax Invoice icela inkhokhelo ngemuva; i-Petty Cash ikhokha tindleko letincane.',
          isiNdebele: 'I-Quotation ikhomba intengo ngaphambi koku-oda; i-Tax Invoice ibawe umbhadelwa ngemva; i-Petty Cash ibhadela iindleko ezincani.',
          isiXhosa: 'I-Quotation ibonisa ixabiso ngaphambi koku-oda; i-Tax Invoice icela intlawulo emva koko; i-Petty Cash ihlawula iindleko ezincinci.',
          Afrikaans: '’n Kwotasie gee die prys voor bestelling; ’n Belastingfaktuur eis betaling ná lewering; Kleinkas dek klein daaglikse uitgawes.',
          English: 'A Quotation states estimated price before ordering; a Tax Invoice requests payment after delivery; Petty Cash covers small daily office costs.'
        }
      }
    ],
    workedExample: {
      questionByLanguage: {
        Xitsonga: 'Hofisi yi humesa Tax Invoice ya ti-printer cartridge ta 20 hi R350 eka yin’we (ku nga si hlanganisiwa 15% VAT). Yi tlhela yi hlayisa Petty Cash Imprest float ya R1 000 yi hakela ti-voucher ta 3: masi R85, poso R120, na courier R195. (a) Hlaya Invoice Subtotal, 15% VAT, na Total Due, na (b) mali leyi seleke na mali yo vuyisela R1 000.',
        Sepedi: 'Ofisi e ntšha Tax Invoice ya di-cartridge tše 20 ka R350 e tee (ntle le 15% VAT). E bile e boloka Petty Cash Imprest float ya R1 000 gomme ya lefa di-voucher tše 3: maswi R85, poso R120, le courier R195. (a) Balela Subtotal, 15% VAT, le Total Due, le (b) tšhelete ye e šetšego le ye e nyakegago go bušetša R1 000.',
        isiZulu: 'Ihhovisi likhipha i-Tax Invoice yama-printer cartridge angama-20 ngo-R350 lilinye (ngaphandle kwe-15% VAT). Ligcina ne-Petty Cash Imprest float engu-R1 000 lakhokha ama-voucher ama-3: ubisi R85, izitembu R120, ne-courier R195. (a) Bala i-Subtotal, i-15% VAT, ne-Total Due, (b) nemali esele kanye nokubuyisela i-R1 000.',
        Tshivenda: 'Ofisi i bvisa Tax Invoice ya dzi-cartridge dza 20 nga R350 (hu sina 15% VAT). Petty Cash float ndi R1 000 ha badelwa mafhi R85, poso R120, courier R195. (a) Vhalelani Subtotal, 15% VAT, na Total Due, (b) na masheleni o salaho na u vhuyedzedza R1 000.',
        Sesotho: 'Ofisi e ntsha Tax Invoice ya 20 cartridges ka R350 (ntle le 15% VAT). Petty Cash float ke R1 000 ho lefshwa R85, R120, R195. (a) Bala Subtotal, 15% VAT, Total Due, (b) tjhelete e setseng le ho busetsa R1 000.',
        Setswana: 'Ofisi e ntsha Tax Invoice ya 20 cartridges ka R350 (kwantle ga 15% VAT). Petty Cash ke R1 000 go duetswe R85, R120, R195. (a) Bala Subtotal, 15% VAT, Total Due, (b) madi a a setseng le go busetsa R1 000.',
        Siswati: 'Lihhovisi likhipha Tax Invoice ya-20 cartridges nga-R350 (ngaphandle kwe-15% VAT). Petty Cash ngu-R1 000 kwakhokhwa R85, R120, R195. (a) Bala Subtotal, 15% VAT, Total Due, (b) nemali leseleyo nekubuyisela R1 000.',
        isiNdebele: 'I-ofisi ikhipha Tax Invoice yama-20 cartridges nge-R350 (ngaphandle kwe-15% VAT). Petty Cash ngu-R1 000 kwabhadelwa R85, R120, R195. (a) Bala Subtotal, 15% VAT, Total Due, (b) nemali eseleko nokubuyisela R1 000.',
        isiXhosa: 'I-ofisi ikhupha Tax Invoice ye-20 cartridges nge-R350 (ngaphandle kwe-15% VAT). Petty Cash yi-R1 000 kwahlawulwa R85, R120, R195. (a) Bala Subtotal, 15% VAT, Total Due, (b) nemali eseleyo nokubuyisela i-R1 000.',
        Afrikaans: '’n Kantoor reik ’n Belastingfaktuur uit vir 20 patrone teen R350 elk (sonder 15% BTW). Kleinkas (R1 000) betaal R85, R120 en R195. (a) Bereken Subtotaal, 15% BTW & Totaal Verskuldig, en (b) kontant oor en aanvulling.',
        English: 'An office issues a Tax Invoice for 20 printer cartridges at R350 each (excluding 15% VAT). It also keeps a R1 000 Petty Cash Imprest float and paid 3 vouchers: milk R85, postage R120, and courier R195. (a) Calculate the Invoice Subtotal, 15% VAT, and Total Due, and (b) calculate cash left and the reimbursement needed to restore the R1 000 float.'
      },
      stepsByLanguage: {
        Xitsonga: [
          '(a) Invoice Subtotal = 20 × R350 = R7 000.',
          '15% VAT = R7 000 × 0.15 = R1 050.',
          'Invoice Total Due = R7 000 + R1 050 = R8 050.',
          '(b) Petty Cash leyi tirhisiweke = R85 + R120 + R195 = R400.',
          'Mali leyi seleke = R1 000 − R400 = R600. Mali yo tlherisela = R400 ku tlhela ku va R1 000.'
        ],
        Sepedi: [
          '(a) Invoice Subtotal = 20 × R350 = R7 000.',
          '15% VAT = R7 000 × 0.15 = R1 050.',
          'Invoice Total Due = R7 000 + R1 050 = R8 050.',
          '(b) Petty Cash ye e šomišitšwego = R85 + R120 + R195 = R400.',
          'Tšhelete ye e šetšego = R1 000 − R400 = R600. Pušetšo ye e nyakegago = R400 go bušetša R1 000.'
        ],
        isiZulu: [
          '(a) I-Invoice Subtotal = 20 × R350 = R7 000.',
          '15% VAT = R7 000 × 0.15 = R1 050.',
          'I-Invoice Total Due = R7 000 + R1 050 = R8 050.',
          '(b) I-Petty Cash esetshenzisiwe = R85 + R120 + R195 = R400.',
          'Imali esele ebhokisini = R1 000 − R400 = R600. Okubuyiselwayo = R400 ukubuyisela u-R1 000.'
        ],
        Tshivenda: [
          '(a) Subtotal = 20 × R350 = R7 000. 15% VAT = R7 000 × 0.15 = R1 050. Total Due = R8 050.',
          '(b) Petty Cash yo shumiswaho = R85 + R120 + R195 = R400.',
          'O salaho = R1 000 − R400 = R600. U vhuyedzedza = R400.'
        ],
        Sesotho: [
          '(a) Subtotal = 20 × R350 = R7 000. 15% VAT = R1 050. Total Due = R8 050.',
          '(b) Petty Cash e sebedisitsweng = R85 + R120 + R195 = R400.',
          'E setseng = R1 000 − R400 = R600. Pusetso = R400.'
        ],
        Setswana: [
          '(a) Subtotal = 20 × R350 = R7 000. 15% VAT = R1 050. Total Due = R8 050.',
          '(b) Petty Cash e e dirisitsweng = R85 + R120 + R195 = R400.',
          'E e setseng = R1 000 − R400 = R600. Pusetso = R400.'
        ],
        Siswati: [
          '(a) Subtotal = 20 × R350 = R7 000. 15% VAT = R1 050. Total Due = R8 050.',
          '(b) Petty Cash lesetjentisiwe = R85 + R120 + R195 = R400.',
          'Lesele = R1 000 − R400 = R600. Kubuyisela = R400.'
        ],
        isiNdebele: [
          '(a) Subtotal = 20 × R350 = R7 000. 15% VAT = R1 050. Total Due = R8 050.',
          '(b) Petty Cash esetjenzisiweko = R85 + R120 + R195 = R400.',
          'Eseleko = R1 000 − R400 = R600. Ukubuyisela = R400.'
        ],
        isiXhosa: [
          '(a) Subtotal = 20 × R350 = R7 000. 15% VAT = R1 050. Total Due = R8 050.',
          '(b) Petty Cash esetyenzisiweyo = R85 + R120 + R195 = R400.',
          'Eseleyo = R1 000 − R400 = R600. Ukubuyisela = R400.'
        ],
        Afrikaans: [
          '(a) Subtotaal = 20 × R350 = R7 000. 15% BTW = R7 000 × 0.15 = R1 050. Totaal = R8 050.',
          '(b) Kleinkas spandeer = R85 + R120 + R195 = R400.',
          'Kontant oor = R1 000 − R400 = R600. Aanvulling nodig = R400.'
        ],
        English: [
          '(a) Invoice Subtotal = 20 × R350 = R7 000.',
          '15% VAT = R7 000 × 0.15 = R1 050.',
          'Invoice Total Due = R7 000 + R1 050 = R8 050.',
          '(b) Total Petty Cash vouchers paid = R85 + R120 + R195 = R400.',
          'Cash left in box = R1 000 − R400 = R600. Reimbursement needed = R400 to restore the R1 000 float.'
        ]
      },
      finalAnswerByLanguage: {
        Xitsonga: '(a) Subtotal = R7 000, VAT = R1 050, Total Due = R8 050  |  (b) Mali leyi seleke = R600, Vuyisela = R400',
        Sepedi: '(a) Subtotal = R7 000, VAT = R1 050, Total Due = R8 050  |  (b) E šetšego = R600, Bušetša = R400',
        isiZulu: '(a) Subtotal = R7 000, VAT = R1 050, Total Due = R8 050  |  (b) Esele = R600, Buyisela = R400',
        Tshivenda: '(a) Subtotal = R7 000, VAT = R1 050, Total Due = R8 050  |  (b) O salaho = R600, Vhuyedzedza = R400',
        Sesotho: '(a) Subtotal = R7 000, VAT = R1 050, Total Due = R8 050  |  (b) E setseng = R600, Busetsa = R400',
        Setswana: '(a) Subtotal = R7 000, VAT = R1 050, Total Due = R8 050  |  (b) E setseng = R600, Busetsa = R400',
        Siswati: '(a) Subtotal = R7 000, VAT = R1 050, Total Due = R8 050  |  (b) Lesele = R600, Buyisela = R400',
        isiNdebele: '(a) Subtotal = R7 000, VAT = R1 050, Total Due = R8 050  |  (b) Eseleko = R600, Buyisela = R400',
        isiXhosa: '(a) Subtotal = R7 000, VAT = R1 050, Total Due = R8 050  |  (b) Eseleyo = R600, Buyisela = R400',
        Afrikaans: '(a) Subtotaal = R7 000, BTW = R1 050, Totaal = R8 050  |  (b) Kontant oor = R600, Aanvulling = R400',
        English: '(a) Subtotal = R7 000, VAT = R1 050, Total Due = R8 050  |  (b) Cash left = R600, Reimburse = R400'
      }
    },
    practiceQuestions: [
      {
        number: 1,
        questionByLanguage: {
          Xitsonga: 'Xivutiso 1 (Nexovian): Hambanyisa Quotation na Tax Invoice, u xaxamela mitirho ya 4 ya POLC ya Vulawuri bya Bindzu.',
          Sepedi: 'Potšišo 1 (Nexovian): Fapantšha Quotation le Tax Invoice, gomme o bolele mešomo e 4 ya POLC ya Taolo ya Kgwebo.',
          isiZulu: 'Umbuzo 1 (Nexovian): Hlukanisa phakathi kwe-Quotation ne-Tax Invoice, bese usho imisebenzi emi-4 ye-POLC ye-Business Management.',
          Tshivenda: 'Mbudziso 1 (Nexovian): Fhambanyani Quotation na Tax Invoice, ni bule mishumo ya 4 ya POLC.',
          Sesotho: 'Potso 1 (Nexovian): Hlalosa phapano pakeng tsa Quotation le Tax Invoice, le mesebetsi e 4 ya POLC.',
          Setswana: 'Potso 1 (Nexovian): Farologanya Quotation le Tax Invoice, le ditiro tse 4 tsa POLC.',
          Siswati: 'Umbuto 1 (Nexovian): Hlukanisa Quotation ne-Tax Invoice, usho imisebenti le-4 ye-POLC.',
          isiNdebele: 'Umbuzo 1 (Nexovian): Hlukanisa i-Quotation ne-Tax Invoice, utjho imisebenzi emi-4 ye-POLC.',
          isiXhosa: 'Umbuzo 1 (Nexovian): Yahlula i-Quotation ne-Tax Invoice, uchaze imisebenzi emi-4 ye-POLC.',
          Afrikaans: 'Vraag 1 (Nexovian): Onderskei tussen ’n Kwotasie en ’n Belastingfaktuur, en noem die 4 POLC-bestuursfunksies.',
          English: 'Nexovian Chapter Practice Q1: Distinguish between a Quotation and a Tax Invoice, and list the 4 POLC functions of Business Management.'
        },
        answerByLanguage: {
          Xitsonga: 'Quotation yi rhumeriwa EMAHLWENI ko odara ku komba ntsengo na swipimelo. Tax Invoice yi rhumeriwa ENDZHAKU ko yisa swilo ku kombela ku hakeriwa no komba VAT. POLC ya 4: 1. Planning, 2. Organising, 3. Leading, 4. Controlling.',
          Sepedi: 'Quotation e romelwa PELE ga odara go bontšha theko. Tax Invoice e romelwa KA MORAGO ga thomelo go kgopela tefo le VAT. POLC e 4: 1. Planning, 2. Organising, 3. Leading, 4. Controlling.',
          isiZulu: 'I-Quotation ithunyelwa NGAPHAMBI koku-oda ukukhombisa amanani. I-Tax Invoice ithunyelwa NGEMUVA kokuletha ukucela inkokhelo nokukhombisa i-VAT. POLC emi-4: 1. Planning, 2. Organising, 3. Leading, 4. Controlling.',
          Tshivenda: 'Quotation i rumelwa PHANDA ha odara; Tax Invoice i rumelwa NGA MURAHU u humbela mbadelo na VAT. POLC: 1. Planning, 2. Organising, 3. Leading, 4. Controlling.',
          Sesotho: 'Quotation e romelwa PELE ho odara; Tax Invoice e romelwa KAMORA ho fana ka thepa. POLC: 1. Planning, 2. Organising, 3. Leading, 4. Controlling.',
          Setswana: 'Quotation e romelwa PELE ga odara; Tax Invoice e romelwa MORAGO ga thomelo. POLC: 1. Planning, 2. Organising, 3. Leading, 4. Controlling.',
          Siswati: 'I-Quotation itfunyelwa NGEMBILI kweku-oda; i-Tax Invoice itfunyelwa NGEMUVA. POLC: 1. Planning, 2. Organising, 3. Leading, 4. Controlling.',
          isiNdebele: 'I-Quotation ithunyelwa NGAPHAMBI koku-oda; i-Tax Invoice ithunyelwa NGEMVA. POLC: 1. Planning, 2. Organising, 3. Leading, 4. Controlling.',
          isiXhosa: 'I-Quotation ithunyelwa NGAPHAMBI koku-oda; i-Tax Invoice ithunyelwa EMVA koko. POLC: 1. Planning, 2. Organising, 3. Leading, 4. Controlling.',
          Afrikaans: '’n Kwotasie word VOOR bestelling gestuur; ’n Belastingfaktuur NA lewering om betaling + BTW te eis. 4 POLC-funksies: 1. Beplan (Planning), 2. Organiseer (Organising), 3. Lei (Leading), 4. Beheer (Controlling).',
          English: 'A Quotation is sent BEFORE a customer places an order to state prices and terms. A Tax Invoice is sent AFTER goods/services are supplied to request payment and show VAT. The 4 POLC functions are: 1. Planning, 2. Organising, 3. Leading, and 4. Controlling.'
        }
      },
      {
        number: 2,
        questionByLanguage: {
          Xitsonga: 'Xivutiso 2 (Nexovian): Boxa switeji swa 3 swo thola vatirhi eka HR u nyika tindlela ta 2 leti Customer Relations yi kurisaka ha tona bindzu.',
          Sepedi: 'Potšišo 2 (Nexovian): Bolela dikgato tše 3 tša go thwala bašomi ka HR gomme o nee mekgwa e 2 yeo Customer Relations e godišago kgwebo.',
          isiZulu: 'Umbuzo 2 (Nexovian): Shono izigaba ezi-3 zokuqasha kwa-HR bese unika izindlela ezi-2 ubudlelwano namakhasimende obukhulisa ngazo ibhizinisi.',
          Tshivenda: 'Mbudziso 2 (Nexovian): Bulani zwitenwa zwi-3 zwa u thola vhashumi kha HR na ndila mbili dza Customer Relations.',
          Sesotho: 'Potso 2 (Nexovian): Fana ka mehato e 3 ya ho hira ya HR le ditsela tse 2 tseo Customer Relations e hodisang kgwebo.',
          Setswana: 'Potso 2 (Nexovian): Umaka dikgato tse 3 tsa go thapa tsa HR le ditsela tse 2 tse Customer Relations e godisang kgwebo.',
          Siswati: 'Umbuto 2 (Nexovian): Shano tigaba leti-3 tekucasha kwa-HR netindlela leti-2 te-Customer Relations.',
          isiNdebele: 'Umbuzo 2 (Nexovian): Tjho iingaba ezi-3 zokuqhatjha kwa-HR neendlela ezi-2 ze-Customer Relations.',
          isiXhosa: 'Umbuzo 2 (Nexovian): Xela amanqanaba ama-3 okuqesha kwe-HR neendlela ezi-2 ze-Customer Relations.',
          Afrikaans: 'Vraag 2 (Nexovian): Noem 3 fases van HR-aanstelling en 2 maniere waarop goeie Kliënteverhoudings ’n besigheid laat groei.',
          English: 'Nexovian Chapter Practice Q2: Outline 3 stages of the HR hiring process and give 2 ways good Customer Relations grows a business.'
        },
        answerByLanguage: {
          Xitsonga: 'Switeji swa HR: 1. Recruitment (xikombiso xa ntirho & ku navetisa), 2. Selection (ku hlawula, interviews & ti-reference), 3. Induction (ku sayina kontiraka & ku letela). Customer Relations: 1. Yi engetela ti-odara leti vuyaka, 2. Yi lulamisa swivilelo hi kuhatlisa.',
          Sepedi: 'Dikgato tša HR: 1. Recruitment (tlhalošo ya mošomo & papatšo), 2. Selection (shortlisting, dipotšišo), 3. Induction (konteraka & tlhahlo). Customer Relations: 1. E oketša bareki ba ba boago, 2. E šireletša leina la kgwebo.',
          isiZulu: 'Izigaba ze-HR: 1. Recruitment (ukuchaza umsebenzi nokukhangisa), 2. Selection (ukuhlunga, ama-interview), 3. Induction (inkontileka nokuqeqeshwa). Customer Relations: 1. Yandisa ukubuya kwamakhasimende, 2. Ivikela isithunzi sebhizinisi.',
          Tshivenda: 'HR: 1. Recruitment, 2. Selection (interviews), 3. Induction. Customer Relations: 1. U vhuya ha vharengi, 2. U tsireledza dzina la bindu.',
          Sesotho: 'HR: 1. Recruitment, 2. Selection, 3. Induction. Customer Relations: 1. Bareki ba kgutlang, 2. Ho sireletsa seriti sa kgwebo.',
          Setswana: 'HR: 1. Recruitment, 2. Selection, 3. Induction. Customer Relations: 1. Bareki ba ba boang, 2. Go sireletsa seriti sa kgwebo.',
          Siswati: 'HR: 1. Recruitment, 2. Selection, 3. Induction. Customer Relations: 1. Emakhasimende labuyako, 2. Kuvikela sitfombe selibhizinisi.',
          isiNdebele: 'HR: 1. Recruitment, 2. Selection, 3. Induction. Customer Relations: 1. Abathengi ababuyako, 2. Ukuvikela isithunzi sebhizinisi.',
          isiXhosa: 'HR: 1. Recruitment, 2. Selection, 3. Induction. Customer Relations: 1. Abathengi ababuyayo, 2. Ukukhusela igama leshishini.',
          Afrikaans: 'HR-fases: 1. Werwing (posbeskrywing & advertensie), 2. Keuring (kortlys & onderhoude), 3. Induksie (kontrak & opleiding). Kliënteverhoudings: 1. Verhoog herhaalde verkope, 2. Beskerm handelsmerkreputasie.',
          English: 'HR hiring stages: 1. Recruitment (job description & advert), 2. Selection (shortlisting, interviews & reference checks), 3. Induction (contract signing, workplace tour & training). Good Customer Relations: 1. Increases repeat orders and referrals, and 2. Resolves feedback early to protect brand reputation.'
        }
      }
    ]
  },
  {
    id: 'l4-office-practice',
    level: 4,
    chapterNumber: 3,
    chapterLabelByLanguage: {
      Xitsonga: 'Nexovian Level 4 • Ndzima 3',
      Sepedi: 'Nexovian Level 4 • Kgaolo 3',
      isiZulu: 'Nexovian Level 4 • Isahluko 3',
      Tshivenda: 'Nexovian Level 4 • Ndima 3',
      Sesotho: 'Nexovian Level 4 • Kgaolo 3',
      Setswana: 'Nexovian Level 4 • Kgaolo 3',
      Siswati: 'Nexovian Level 4 • Sehluko 3',
      isiNdebele: 'Nexovian Level 4 • Isigaba 3',
      isiXhosa: 'Nexovian Level 4 • Isahluko 3',
      Afrikaans: 'Nexovian Vlak 4 • Hoofstuk 3',
      English: 'Nexovian Level 4 • Chapter 3'
    },
    titleByLanguage: {
      Xitsonga: 'Maendlelo ya Hofisi Level 4 (Office Practice)',
      Sepedi: 'Tshepedišo ya Ofisi Level 4',
      isiZulu: 'Imisebenzi Yehhovisi Level 4',
      Tshivenda: 'Maitele a Ofisi Level 4',
      Sesotho: 'Tshebetso ya Ofisi Level 4',
      Setswana: 'Tsamaiso ya Ofisi Level 4',
      Siswati: 'Imisebenti yeLihhovisi Level 4',
      isiNdebele: 'Imisebenzi Ye-ofisi Level 4',
      isiXhosa: 'Imisebenzi ye-Ofisi Level 4',
      Afrikaans: 'Kantoorpraktyk Vlak 4',
      English: 'Office Practice Level 4'
    },
    subtitleByLanguage: {
      Xitsonga: 'Mitirho ya Office Manager, Ku Kongomisa Vatirhi, Conferences & Events, Records Management & Archiving & Workplace Professionalism',
      Sepedi: 'Mešomo ya Office Manager, Go Okamela Bašomi, Dikhonferense & Ditiragalo, Records Management & Archiving & Boitshwaro bja Profešenale',
      isiZulu: 'Imisebenzi ka-Office Manager, Ukuqondisa Abasebenzi, Izingqungquthela & Imicimbi, Records Management & Archiving & Ubungcweti Emsebenzini',
      Tshivenda: 'Mishumo ya Office Manager, U Langa Vhashumi, Khonfarentsi & Vhutambo, Records Management & Archiving & Vhudifari ha Phurofeshenala',
      Sesotho: 'Mesebetsi ya Office Manager, Ho Okamela Basebetsi, Dikhonferense & Diketsahalo, Records Management & Archiving & Botsebi Mosebetsing',
      Setswana: 'Ditiro tsa Office Manager, Go Etelela Badiri Pele, Dikhonferense & Ditiragalo, Records Management & Archiving & Maitseo a Porofešenale',
      Siswati: 'Imisebenti ye-Office Manager, Kwengamela Tisebenti, Emakhonferensi & Imicimbi, Records Management & Archiving & Bungcweti Emsebentini',
      isiNdebele: 'Imisebenzi ye-Office Manager, Ukulawula Abasebenzi, Iinkhonferensi & Iminyanya, Records Management & Archiving & Ubungcweti Emsebenzini',
      isiXhosa: 'Imisebenzi ye-Office Manager, Ukongamela Abasebenzi, Iinkomfa & Imisitho, Records Management & Archiving & Ubugcisa Emsebenzini',
      Afrikaans: 'Kantoorbestuurder-pligte, Personeeltoesig, Konferensies & Geleenthede, Rekordbestuur & Argivering & Werkplek-professionaliteit',
      English: 'Office Manager Duties, Supervising Staff, Organising Conferences & Events, Records Management & Archiving & Workplace Professionalism'
    },
    summaryByLanguage: {
      Xitsonga:
        'Maendlelo ya Hofisi Level 4 hi Xitsonga: Ku lunghiselela mitirho ya Office Manager — ku lawula budget, switirhisiwa, na OHSA; ku kongomisa vatirhi hi delegation leyi baseke; ku hlela Conferences & Events; ku fambisa Records Management & Archiving ku suka eka active files ku ya eka ku tsemiwa (shredding) hi POPIA; na Workplace Professionalism.',
      Sepedi:
        'Tshepedišo ya Ofisi Level 4 ka Sepedi: Mešomo ya Office Manager (tekanyetšo, dithoto, OHSA), go okamela bašomi ka delegation, go rulaganya Dikhonferense & Ditiragalo, taolo ya Direkhoto & Archiving (POPIA), le boitshwaro bja profešenale mošomong.',
      isiZulu:
        'Imisebenzi Yehhovisi Level 4 ngesiZulu: Imisebenzi ka-Office Manager (ibhajethi, impahla, OHSA), ukuqondisa abasebenzi nge-delegation ecacile, ukuhlela i-Conferences & Events, i-Records Management & Archiving (POPIA), kanye nobungcweti emsebenzini.',
      Tshivenda:
        'Maitele a Ofisi Level 4 nga Tshivenda: Mishumo ya Office Manager (OHSA), u langa vhashumi nga delegation, u dzudzanya Khonfarentsi & Vhutambo, Records Management & Archiving (POPIA), na vhudifari ha phurofeshenala.',
      Sesotho:
        'Tshebetso ya Ofisi Level 4 ka Sesotho: Mesebetsi ya Office Manager (OHSA), ho okamela basebetsi ka delegation, Dikhonferense & Diketsahalo, Records Management & Archiving (POPIA), le botsebi mosebetsing.',
      Setswana:
        'Tsamaiso ya Ofisi Level 4 ka Setswana: Ditiro tsa Office Manager (OHSA), go etelela badiri ka delegation, Dikhonferense & Ditiragalo, Records Management & Archiving (POPIA), le maitseo a porofešenale.',
      Siswati:
        'Imisebenti yeLihhovisi Level 4 ngeSiswati: Imisebenti ye-Office Manager (OHSA), kwengamela tisebenti nge-delegation, Emakhonferensi & Imicimbi, Records Management & Archiving (POPIA), nebungcweti emsebentini.',
      isiNdebele:
        'Imisebenzi Ye-ofisi Level 4 ngesiNdebele: Imisebenzi ye-Office Manager (OHSA), ukulawula abasebenzi nge-delegation, Iinkhonferensi & Iminyanya, Records Management & Archiving (POPIA), nobungcweti emsebenzini.',
      isiXhosa:
        'Imisebenzi ye-Ofisi Level 4 ngesiXhosa: Imisebenzi ye-Office Manager (OHSA), ukongamela abasebenzi nge-delegation, Iinkomfa & Imisitho, Records Management & Archiving (POPIA), nobugcisa emsebenzini.',
      Afrikaans:
        'Kantoorpraktyk Vlak 4 in Afrikaans: Berei jou voor vir senior Kantoorbestuurder-pligte — begroting en OHSA-veiligheid, personeeltoesig en delegering, konferensiekoördinering, rekordbestuur/argivering (POPIA) en werkplek-professionaliteit.',
      English:
        'Office Practice Level 4 prepares you for senior Office Manager and Executive Coordinator responsibilities: managing budgets, equipment, and OHSA safety compliance; supervising junior staff through clear delegation and fair feedback; organising large conferences and events from venue booking and budgeting to delegate packs; running full records management and archiving life-cycles; and modelling workplace professionalism in dress, punctuality, discretion, and accountability.'
    },
    keyTerms: [
      {
        termEn: 'Supervising Staff & Delegation',
        translations: {
          Xitsonga: 'Ku Kongomisa Vatirhi & Ku Avela Mintirho (Delegation)',
          Sepedi: 'Go Okamela Bašomi & Go Abela Mešomo (Delegation)',
          isiZulu: 'Ukuqondisa Abasebenzi & Ukwabelana Ngemisebenzi (Delegation)',
          Tshivenda: 'U Langa Vhashumi & U Kovhela Mishumo (Delegation)',
          Sesotho: 'Ho Okamela Basebetsi & Ho Abela Mosebetsi (Delegation)',
          Setswana: 'Go Etelela Badiri Pele & Go Aba Ditiro (Delegation)',
          Siswati: 'Kwengamela Tisebenti & Kuniketa Imisebenti (Delegation)',
          isiNdebele: 'Ukulawula Abasebenzi & Ukwaba Imisebenzi (Delegation)',
          isiXhosa: 'Ukongamela Abasebenzi & Ukwabela Imisebenzi (Delegation)',
          Afrikaans: 'Personeeltoesig & Delegering (Delegation)',
          English: 'Assigning clear tasks, authority & deadlines while giving support'
        },
        meaningByLanguage: {
          Xitsonga: 'Swi letela vatirhi no aka vutihlamuleri ematshan’wini yo lahlela ntirho lowu nga twisisekiki eka vatirhi lavantsongo.',
          Sepedi: 'E tlhahla bašomi le go aga maikarabelo go na le go lahlela mošomo wo o sa kwagalego go ba bafsa.',
          isiZulu: 'Kuqeqesha abasebenzi kwakhe ukuziphendulela kunokujikijela umsebenzi ongacacile kubasizi abancane.',
          Tshivenda: 'Zwi funza vhashumi na u fhafula vhudifhinduleli hu si u latsha mushumo.',
          Sesotho: 'Ho rupela basebetsi le ho haha boikarabelo ho e-na le ho lahlela mosebetsi.',
          Setswana: 'Go katisa badiri le go aga maikarabelo go na le go latlhela tiro.',
          Siswati: 'Kucecesha tisebenti nekwakha kutiphendvulela kunekujikijela umsebenti.',
          isiNdebele: 'Kufundisa abasebenzi nokwakha ukuziphendulela kunokuphosela umsebenzi.',
          isiXhosa: 'Kuqeqesha abasebenzi kwaye kwakha uxanduva kunokuphosa umsebenzi ongacacanga.',
          Afrikaans: 'Lei personeel op en bou aanspreeklikheid in plaas daarvan om onduidelike werk af te skuif.',
          English: 'Trains staff and builds accountability instead of dumping unclear work onto juniors.'
        }
      },
      {
        termEn: 'Conference & Event Coordination',
        translations: {
          Xitsonga: 'Ku Hlela Tinhlengeletano Letikulu & Mikhuva (Conferences & Events)',
          Sepedi: 'Go Rulaganya Dikhonferense & Ditiragalo (Conferences & Events)',
          isiZulu: 'Ukuhlela Izingqungquthela & Imicimbi (Conferences & Events)',
          Tshivenda: 'U Dzudzanya Khonfarentsi & Vhutambo (Conferences & Events)',
          Sesotho: 'Ho Hlophisa Dikhonferense & Diketsahalo (Conferences & Events)',
          Setswana: 'Go Rulaganya Dikhonferense & Ditiragalo (Conferences & Events)',
          Siswati: 'Kuhlela Emakhonferensi & Imicimbi (Conferences & Events)',
          isiNdebele: 'Ukuhlela Iinkhonferensi & Iminyanya (Conferences & Events)',
          isiXhosa: 'Ukucwangcisa Iinkomfa & Imisitho (Conferences & Events)',
          Afrikaans: 'Konferensie- & Geleentheidskoördinering',
          English: 'Managing venue, catering, speakers, budget & delegate logistics'
        },
        meaningByLanguage: {
          Xitsonga: 'Yi tirhisa checklist emahlweni ka siku, nongonoko wa nkarhi, nxaxamelo wa vayingiseri, na swivutiso endzhaku ka nhlengeletano.',
          Sepedi: 'E šomiša checklist pele ga tiragalo, lenaneo la nako, lenaneo la baeng, le dipotšišo ka morago.',
          isiZulu: 'Isebenzisa i-checklist yangaphambi komcimbi, uhlelo lwesikhathi, uhlu lwezivakashi, kanye nocwaningo lwangemva komcimbi.',
          Tshivenda: 'I shumisa checklist, mutevhe wa tshifhinga, na mbudziso nga murahu ha mutangano.',
          Sesotho: 'E sebedisa checklist, lenaneo la nako, le lethathamo la baeti.',
          Setswana: 'E dirisa checklist, lenaane la nako, le lenaane la baeng.',
          Siswati: 'Isebentisa checklist, luhlelo lwesikhatsi, neluhla lwetivakashi.',
          isiNdebele: 'Isebenzisa i-checklist, irhelo lesikhathi, nerhelo leemvakatjhi.',
          isiXhosa: 'Isebenzisa i-checklist, uluhlu lwexesha, noluhlu lweendwendwe.',
          Afrikaans: 'Gebruik ’n kontrolelys, programskedule, registrasielys en terugvoer-opname ná afloop.',
          English: 'Uses a pre-event checklist, running order, registration list, and post-event feedback survey.'
        }
      },
      {
        termEn: 'Records Management & Archiving',
        translations: {
          Xitsonga: 'Vulawuri & Nhlayiso wa Tirhekodo (Records Management & Archiving)',
          Sepedi: 'Taolo & Poloko ya Direkhoto (Records Management & Archiving)',
          isiZulu: 'Ukuphathwa & Nokugcinwa Kwamarekhodi (Records Management & Archiving)',
          Tshivenda: 'Ndangulo & U Vhulunga Dzirekhodo (Records Management & Archiving)',
          Sesotho: 'Taolo & Poloko ya Direkoto (Records Management & Archiving)',
          Setswana: 'Taolo & Poloko ya Direkoto (Records Management & Archiving)',
          Siswati: 'Kuphatfwa & Nekugcinwa Kwemarekhodi (Records Management & Archiving)',
          isiNdebele: 'Ukuphathwa & Nokubekwa Kwamarekhodi (Records Management & Archiving)',
          isiXhosa: 'Ulawulo & Ugcino Lweerekhodi (Records Management & Archiving)',
          Afrikaans: 'Rekordbestuur & Argivering',
          English: 'Controlling active files, long-term archives & secure POPIA disposal'
        },
        meaningByLanguage: {
          Xitsonga: 'Yi landzelela nkarhi wo hlayisa (xik: tirhekodo ta xibalo ti hlayisiwa malembe ya 5+) emahlweni ko tsema mafayela lama hundzeriweke hi nkarhi.',
          Sepedi: 'E latela nako ya poloko (mohlala: direkhoto tša lekgetho mengwaga e 5+) pele ga go gagolwa ka motšhene (shredding).',
          isiZulu: 'Ilandela izikhathi zokugcinwa (isib: amarekhodi entela iminyaka emi-5+) ngaphambi kokudatshulwa (shredding) okungekho emthethweni we-POPIA.',
          Tshivenda: 'I tevhela tshifhinga tsha u vhulunga (5+ minwaha ya SARS) phanda ha u kherukanya nga shredding.',
          Sesotho: 'E latela dinako tsa poloko (dilemo tse 5+ bakeng sa lekgetho) pele ho shredding.',
          Setswana: 'E latela dinako tsa poloko (dingwaga tse 5+ tsa lekgetho) pele ga shredding.',
          Siswati: 'Ilandzela tikhatsi tekugcina (5+ iminyaka yeluhlahlandlela) ngembili kwe-shredding.',
          isiNdebele: 'Ilandela iinkhathi zokubeka (5+ iminyaka ye-SARS) ngaphambi kwe-shredding.',
          isiXhosa: 'Ilandela amaxesha okugcina (5+ iminyaka ye-SARS) ngaphambi kwe-shredding.',
          Afrikaans: 'Volg bewaarskedules (bv. 5+ jaar vir belastingrekords) voordat vertroulike lêers versnipper word.',
          English: 'Follows retention schedules (e.g. tax records kept 5+ years) before shredding expired confidential files.'
        }
      }
    ],
    workedExample: {
      questionByLanguage: {
        Xitsonga: 'Tanihi Office Manager, u hlela conference ya vanhu va 120: swakudya swi durha R350 hi munhu, ku hirha ndzhawu i R4 500, na AV equipment i R1 500. U avela ntirho wa registration eka vatirhi va 2. (a) Hlaya Total Conference Cost na Average Cost hi munhu, na (b) boxa mitirho ya 3 yo kongomisa vatirhi.',
        Sepedi: 'Bjalo ka Office Manager, o beakanya khonferense ya baeng ba 120: dijo ke R350 ka motho, lefelo ke R4 500, le AV ke R1 500. O abela bašomi ba 2 mošomo wa registration. (a) Balela Total Conference Cost le Average Cost ka motho, le (b) bolela mešomo e 3 ya go okamela bašomi.',
        isiZulu: 'Njengo-Office Manager, uhlela ingqungquthela yabantu abayi-120: ukudla ngu-R350 ngomuntu, indawo ngu-R4 500, ne-AV ngu-R1 500. Wabela abasebenzi aba-2 ukuqapha i-registration. (a) Bala i-Total Conference Cost ne-Average Cost ngomuntu, (b) usho imisebenzi emi-3 yokuqondisa abasebenzi.',
        Tshivenda: 'Sa Office Manager, ni dzudzanya khonfarentsi ya vhathu vha 120: zwiliwa R350 nga muthu, fhethu R4 500, AV R1 500. (a) Vhalelani Total Cost na Cost nga muthu, (b) mishumo miraru ya u langa vhashumi.',
        Sesotho: 'Jwaloka Office Manager, o hlophisa khonferense ya ba 120: dijo R350 ka motho, sebaka R4 500, AV R1 500. (a) Bala Total Cost le Cost ka motho, (b) mesebetsi e 3 ya ho okamela basebetsi.',
        Setswana: 'Jaaka Office Manager, o rulaganya khonferense ya ba 120: dijo R350 ka motho, lefelo R4 500, AV R1 500. (a) Bala Total Cost le Cost ka motho, (b) ditiro tse 3 tsa go etelela badiri.',
        Siswati: 'Njenge-Office Manager, uhlela likhonferensi leba-120: kudla R350 ngemuntfu, indzawo R4 500, AV R1 500. (a) Bala Total Cost ne-Cost ngemuntfu, (b) imisebenti le-3 yekwengamela.',
        isiNdebele: 'Njenge-Office Manager, uhlela ikhonferensi yaba-120: ukudla R350 ngomuntu, indawo R4 500, AV R1 500. (a) Bala Total Cost ne-Cost ngomuntu, (b) imisebenzi emi-3 yokulawula.',
        isiXhosa: 'Njengo-Office Manager, ucwangcisa inkomfa yaba-120: ukutya R350 ngomntu, indawo R4 500, AV R1 500. (a) Bala Total Cost ne-Cost ngomntu, (b) imisebenzi emi-3 yokongamela.',
        Afrikaans: 'As Kantoorbestuurder reël jy ’n 120-afgevaardigde konferensie: spyseniering R350/persoon, lokaal R4 500, AV-toerusting R1 500. (a) Bereken Totale Koste & Koste per Afgevaardigde, en (b) noem 3 toesigpligte.',
        English: 'As Office Manager, you organise a 120-delegate conference: catering costs R350 per delegate, venue hire is R4 500, and audio-visual hire is R1 500. You delegate registration setup to 2 junior clerks. (a) Calculate Total Conference Cost and Average Cost per Delegate, and (b) list 3 duties you follow when supervising delegated staff.'
      },
      stepsByLanguage: {
        Xitsonga: [
          '(a) Hlaya Catering Cost: 120 delegates × R350 = R42 000.',
          'Engetela Ndzhawu & Audio-Visual: R4 500 + R1 500 = R6 000.',
          'Total Conference Cost = R42 000 + R6 000 = R48 000. Average Cost hi munhu = R48 000 ÷ 120 = R400.',
          '(b) Mitirho yo kongomisa: 1. Nyika swileriso leswi baseke & nkarhi, 2. Nyika ti-checklist na ma-badge, 3. Kambela matirhelo emahlweni ko sungula u khensa vatirhi.'
        ],
        Sepedi: [
          '(a) Balela Catering Cost: 120 delegates × R350 = R42 000.',
          'Hlakanya Lefelo & AV: R4 500 + R1 500 = R6 000.',
          'Total Conference Cost = R42 000 + R6 000 = R48 000. Average Cost ka motho = R48 000 ÷ 120 = R400.',
          '(b) Mešomo ya go okamela: 1. Efa ditaelo tše di kwagalago le nako, 2. Nea checklists le di-badge, 3. Lekola tšwelopele pele go bulwa o leboge bašomi.'
        ],
        isiZulu: [
          '(a) Bala izindleko zokudla: 120 delegates × R350 = R42 000.',
          'Engeza indawo & Audio-Visual: R4 500 + R1 500 = R6 000.',
          'Total Conference Cost = R42 000 + R6 000 = R48 000. Average Cost ngomuntu = R48 000 ÷ 120 = R400.',
          '(b) Imisebenzi yokuqondisa: 1. Nikeza imiyalelo ecacile nesikhathi, 2. Nikeza ama-checklist namabheji, 3. Hlola inqubekela phambili ubabonge ngemuva.'
        ],
        Tshivenda: [
          '(a) Catering = 120 × R350 = R42 000. Fhethu & AV = R4 500 + R1 500 = R6 000.',
          'Total = R42 000 + R6 000 = R48 000. Average = R48 000 ÷ 120 = R400.',
          '(b) 1. Ndaela dzi pfalaho, 2. Checklist & badges, 3. Tola phanda ha u vula.'
        ],
        Sesotho: [
          '(a) Catering = 120 × R350 = R42 000. Sebaka & AV = R4 500 + R1 500 = R6 000.',
          'Total = R42 000 + R6 000 = R48 000. Average = R48 000 ÷ 120 = R400.',
          '(b) 1. Ditaelo tse hlakileng, 2. Checklist le badges, 3. Lekola tswelopele.'
        ],
        Setswana: [
          '(a) Catering = 120 × R350 = R42 000. Lefelo & AV = R4 500 + R1 500 = R6 000.',
          'Total = R42 000 + R6 000 = R48 000. Average = R48 000 ÷ 120 = R400.',
          '(b) 1. Ditaelo tse di lolameng, 2. Checklist le badges, 3. Tlhola tswelelopele.'
        ],
        Siswati: [
          '(a) Catering = 120 × R350 = R42 000. Indzawo & AV = R4 500 + R1 500 = R6 000.',
          'Total = R42 000 + R6 000 = R48 000. Average = R48 000 ÷ 120 = R400.',
          '(b) 1. Tiyalo leticacile, 2. Checklist & badges, 3. Hlola chubekela phambili.'
        ],
        isiNdebele: [
          '(a) Catering = 120 × R350 = R42 000. Indawo & AV = R4 500 + R1 500 = R6 000.',
          'Total = R42 000 + R6 000 = R48 000. Average = R48 000 ÷ 120 = R400.',
          '(b) 1. Iimlayo ezicacileko, 2. Checklist & badges, 3. Hlola iragelo phambili.'
        ],
        isiXhosa: [
          '(a) Catering = 120 × R350 = R42 000. Indawo & AV = R4 500 + R1 500 = R6 000.',
          'Total = R42 000 + R6 000 = R48 000. Average = R48 000 ÷ 120 = R400.',
          '(b) 1. Imiyalelo ecacileyo, 2. I-Checklist neebadge, 3. Jonga inkqubela.'
        ],
        Afrikaans: [
          '(a) Spyseniering = 120 × R350 = R42 000. Lokaal & AV = R4 500 + R1 500 = R6 000.',
          'Totale Koste = R42 000 + R6 000 = R48 000. Koste/afgevaardigde = R48 000 ÷ 120 = R400.',
          '(b) Toesig: 1. Duidelike opdragte & spertye, 2. Voorsien kontrolelyste & naamplaatjies, 3. Kontroleer vordering en bedank personeel.'
        ],
        English: [
          '(a) Calculate Catering Cost: 120 delegates × R350 = R42 000.',
          'Add Venue and Audio-Visual hire: R4 500 + R1 500 = R6 000.',
          'Total Conference Cost = R42 000 + R6 000 = R48 000. Average Cost per Delegate = R48 000 ÷ 120 = R400.',
          '(b) Supervising duties: 1. Give clear written instructions & deadlines, 2. Provide checklists/name badges needed to finish, 3. Check progress before doors open and thank staff afterward.'
        ]
      },
      finalAnswerByLanguage: {
        Xitsonga: '(a) Total Cost = R48 000 (R400/munhu)  |  (b) Swileriso leswi baseke, switirhisiwa & ku kambela',
        Sepedi: '(a) Total Cost = R48 000 (R400/motho)  |  (b) Ditaelo, dithoto & go lekola tšwelopele',
        isiZulu: '(a) Total Cost = R48 000 (R400/ngomuntu)  |  (b) Imiyalelo ecacile, izinsiza & nokuhlola',
        Tshivenda: '(a) Total Cost = R48 000 (R400/muthu)  |  (b) Ndaela, thundu & u tola',
        Sesotho: '(a) Total Cost = R48 000 (R400/motho)  |  (b) Ditaelo, disebediswa & ho lekola',
        Setswana: '(a) Total Cost = R48 000 (R400/motho)  |  (b) Ditaelo, didirisiwa & go tlhola',
        Siswati: '(a) Total Cost = R48 000 (R400/ngemuntfu)  |  (b) Tiyalo, tintfo & kuhlola',
        isiNdebele: '(a) Total Cost = R48 000 (R400/ngomuntu)  |  (b) Iimlayo, izinto & ukuhlola',
        isiXhosa: '(a) Total Cost = R48 000 (R400/ngomntu)  |  (b) Imiyalelo, izixhobo & ukujonga',
        Afrikaans: '(a) Totale Koste = R48 000 (R400/afgevaardigde)  |  (b) Duidelike opdrag, hulpbronne & vorderingskontrole',
        English: '(a) Total Cost = R48 000 (R400/delegate)  |  (b) Clear brief, equip resources & check progress'
      }
    },
    practiceQuestions: [
      {
        number: 1,
        questionByLanguage: {
          Xitsonga: 'Xivutiso 1 (Nexovian): Xaxamela switeji swa 3 swa Records Management & Archiving u hlamusela leswaku hikwalaho ka yini tirhekodo leti hundzeriweke hi nkarhi ti fanele ku tsemiwa (shredding).',
          Sepedi: 'Potšišo 1 (Nexovian): Bolela dikgato tše 3 tša Records Management & Archiving gomme o hlaloše lebaka la go gagola direkhoto tše di fetilwego ke nako.',
          isiZulu: 'Umbuzo 1 (Nexovian): Hlela izigaba ezi-3 ze-Records Management & Archiving bese uchaza ukuthi kungani amarekhodi aphelelwe yisikhathi kufanele adatshulwe (shredding).',
          Tshivenda: 'Mbudziso 1 (Nexovian): Bulani zwitenwa zwi-3 zwa Records Management & Archiving ni taluse uri ndi ngani dzirekhodo dzo fhelelwaho dzi tshi fanela u kherukanywa.',
          Sesotho: 'Potso 1 (Nexovian): Fana ka mehato e 3 ya Records Management & Archiving le lebaka la ho shredding direkoto tse fedileng.',
          Setswana: 'Potso 1 (Nexovian): Umaka dikgato tse 3 tsa Records Management & Archiving le lebaka la go shredding direkoto.',
          Siswati: 'Umbuto 1 (Nexovian): Shano tigaba leti-3 te-Records Management & Archiving nekutsi emarekhodi aphelile abhujiswelani nge-shredding.',
          isiNdebele: 'Umbuzo 1 (Nexovian): Tjho iingaba ezi-3 ze-Records Management & Archiving nokuthi amarekhodi aphelileko asibulawa ngani nge-shredding.',
          isiXhosa: 'Umbuzo 1 (Nexovian): Xela amanqanaba ama-3 e-Records Management & Archiving nokuba kutheni iirekhodi ezindala zifanele uku-shreddwa.',
          Afrikaans: 'Vraag 1 (Nexovian): Noem die 3 stadiums van Rekordbestuur & Argivering en verduidelik waarom vervalle kliëntrekords versnipper moet word.',
          English: 'Nexovian Chapter Practice Q1: Outline the 3 stages of Records Management & Archiving and explain why expired client records must be shredded.'
        },
        answerByLanguage: {
          Xitsonga: 'Switeji swa 3: 1. Active records (ti tirhisiwa siku na siku), 2. Semi-active/Archive storage (ti hlayisiwa malembe ya 5 ya SARS/timali), 3. Safe Disposal kumbe archive ya nkarhi hinkwawo. Mafayela lama hundzeriweke ma fanele ku tsemiwa hi muchini ku landzelela POPIA no sivela vukhamba.',
          Sepedi: 'Dikgato tše 3: 1. Active records, 2. Semi-active/Archive storage (mengwaga e 5 ya SARS), 3. Safe Disposal. Di swanetše go gagolwa ka motšhene go latela POPIA le go thibela bohodu.',
          isiZulu: 'Izigaba ezi-3: 1. Active records (ezisetshenziswa nsuku zonke), 2. Semi-active/Archive storage (iminyaka emi-5 ye-SARS), 3. Safe Disposal. Amarekhodi aphelelwe yisikhathi kufanele adatshulwe ngomshini ukuze kulandelwe i-POPIA kuvikelwe ukwebiwa kwemininingwane.',
          Tshivenda: 'Zwitenwa zwi-3: 1. Active, 2. Archive (5+ minwaha ya SARS), 3. Disposal. U kherukanya hu tevhela POPIA na u thivhela vhufhura.',
          Sesotho: 'Mehato e 3: 1. Active, 2. Archive (dilemo tse 5+ tsa SARS), 3. Disposal. Shredding e latela POPIA ho thibela bosholu.',
          Setswana: 'Dikgato tse 3: 1. Active, 2. Archive (dingwaga tse 5+ tsa SARS), 3. Disposal. Shredding e latela POPIA.',
          Siswati: 'Tigaba leti-3: 1. Active, 2. Archive (5+ iminyaka ye-SARS), 3. Disposal. Shredding ilandzela POPIA.',
          isiNdebele: 'Iingaba ezi-3: 1. Active, 2. Archive (5+ iminyaka ye-SARS), 3. Disposal. Shredding ilandela POPIA.',
          isiXhosa: 'Amanqanaba ama-3: 1. Active, 2. Archive (5+ iminyaka ye-SARS), 3. Disposal. Shredding ilandela POPIA.',
          Afrikaans: '3 stadiums: 1. Aktiewe rekords, 2. Semi-aktiewe/Argiefberging (5+ jaar vir SARS/finansies), 3. Veilige Wegdoening. Versnippering voldoen aan POPIA en keer identiteitsdiefstal.',
          English: '3 stages: 1. Active/Current records (used daily in the office), 2. Semi-active/Archive storage (kept securely for legal retention periods such as 5 years for SARS/financial files), 3. Safe Disposal or permanent archive. Expired records must be cross-cut shredded to comply with POPIA and stop identity or bank fraud.'
        }
      },
      {
        number: 2,
        questionByLanguage: {
          Xitsonga: 'Xivutiso 2 (Nexovian): Boxa mitirho ya 3 ya Office Manager ya Workplace Professionalism u xaxamela swikambelo swa 3 swa OHSA safety.',
          Sepedi: 'Potšišo 2 (Nexovian): Bolela mešomo e 3 ya Office Manager ya Workplace Professionalism le ditlhahlobo tše 3 tša polokego tša OHSA.',
          isiZulu: 'Umbuzo 2 (Nexovian): Shono imisebenzi emi-3 ka-Office Manager ye-Workplace Professionalism bese ubala izinto ezi-3 zokuhlola ukuphepha kwe-OHSA.',
          Tshivenda: 'Mbudziso 2 (Nexovian): Bulani mishumo miraru ya Office Manager ya Workplace Professionalism na zwa 3 zwa OHSA safety.',
          Sesotho: 'Potso 2 (Nexovian): Bolela mesebetsi e 3 ya Office Manager ya Workplace Professionalism le dintlha tse 3 tsa OHSA safety.',
          Setswana: 'Potso 2 (Nexovian): Umaka ditiro tse 3 tsa Office Manager tsa Workplace Professionalism le dintlha tse 3 tsa OHSA safety.',
          Siswati: 'Umbuto 2 (Nexovian): Shano imisebenti lemi-3 ye-Office Manager ye-Workplace Professionalism netintfo leti-3 te-OHSA safety.',
          isiNdebele: 'Umbuzo 2 (Nexovian): Tjho imisebenzi emi-3 ye-Office Manager ye-Workplace Professionalism nezinto ezi-3 ze-OHSA safety.',
          isiXhosa: 'Umbuzo 2 (Nexovian): Xela imisebenzi emi-3 ye-Office Manager ye-Workplace Professionalism nezinto ezi-3 ze-OHSA safety.',
          Afrikaans: 'Vraag 2 (Nexovian): Noem 3 Kantoorbestuurder-pligte vir Werkplek-professionaliteit en 3 OHSA-veiligheidskontroles.',
          English: 'Nexovian Chapter Practice Q2: Name 3 key Office Manager duties for Workplace Professionalism and list 3 OHSA safety checks.'
        },
        answerByLanguage: {
          Xitsonga: 'Workplace Professionalism: 1. Ku fika hi nkarhi, ku ambala kahle & xihundla, 2. Ku avela mintirho hi ku lulama, 3. Ku khoma xiyimiso na moya lowunene wa ntlawa. OHSA safety checks: 1. Minyangwa ya ndzilo yi nga pfariwi & ti-fire extinguisher, 2. Switulu leswinene & tintambo ti nga chupuki, 3. First Aid kit leyi teleke.',
          Sepedi: 'Workplace Professionalism: 1. Go fihla ka nako, moaparo wa hlompho & diphiri, 2. Go abela mešomo gabotse, 3. Go boloka lenaneo. OHSA checks: 1. Mejako ya tšhoganetšo ye e sa notlelwago & di-fire extinguisher, 2. Ditulo tše di lokilego & megala ye e šireletšegilego, 3. First Aid kit ye e tletšego.',
          isiZulu: 'Workplace Professionalism: 1. Ukufika ngesikhathi, ukugqoka ngokuhlonipheka & imfihlo, 2. Ukwabela umsebenzi ngokungenzeleli, 3. Ukugcina izikhathi nomoya omuhle weqembu. OHSA checks: 1. Izicabha zomlilo ezingavaliwe & izicishamlilo, 2. Izihlalo ezifanele nezintambo eziphephile, 3. Ibhokisi le-First Aid eligcwele.',
          Tshivenda: 'Professionalism: 1. Tshifhinga, maambarele & tshiphiri, 2. Delegation yavhudi, 3. Morale. OHSA: 1. Vothi la mulilo & fire extinguisher, 2. Zwidulo & thambo, 3. First Aid kit.',
          Sesotho: 'Professionalism: 1. Nako, moaparo & lekunutu, 2. Delegation, 3. Morale. OHSA: 1. Menyako ya mollo, 2. Ditulo & megala, 3. First Aid kit.',
          Setswana: 'Professionalism: 1. Nako, kaparo & diphiri, 2. Delegation, 3. Morale. OHSA: 1. Ditswalo tsa molelo, 2. Ditulo & megala, 3. First Aid kit.',
          Siswati: 'Professionalism: 1. Sikhatsi, kugcoka kahle & imfihlo, 2. Delegation, 3. Morale. OHSA: 1. Tivalo temlilo, 2. Titulo & tintsambo, 3. First Aid kit.',
          isiNdebele: 'Professionalism: 1. Isikhathi, ukumbatha kuhle & iimfihlo, 2. Delegation, 3. Morale. OHSA: 1. Iminyango yomlilo, 2. Iinhlalo & iintambo, 3. First Aid kit.',
          isiXhosa: 'Professionalism: 1. Ixesha, unxibo & iimfihlo, 2. Delegation, 3. Morale. OHSA: 1. Iingcango zomlilo, 2. Izihlalo & iintambo, 3. First Aid kit.',
          Afrikaans: 'Werkplek-professionaliteit: 1. Stiptelikheid, netjiese drag & diskresie, 2. Regverdige delegering, 3. Spanmoraal. OHSA: 1. Oop nooduitgange & brandblussers, 2. Ergonomiese stoele & veilige kabels, 3. Volledige Noodhulpkissie.',
          English: 'Workplace Professionalism duties: 1. Model punctuality, neat dress code, and confidential discretion, 2. Delegate fairly with constructive feedback, 3. Keep schedules and team morale on track. OHSA safety checks: 1. Unlocked, clear emergency exits & serviced fire extinguishers, 2. Ergonomic chairs & safe electrical cables, 3. Stocked First Aid kit.'
        }
      }
    ]
  }
];
