export interface AzkarItem {
    id: string;
    arabic: string;
    transliteration: string;
    english: string;
    urdu: string;
    repeat: number;
    reference: string;
}

export interface CategoryInfo {
    title: string;
    titleUr: string;
    subtitle: string;
    subtitleUr: string;
    icon: string;
    items: AzkarItem[];
}

export const azkarCollections: Record<string, CategoryInfo> = {
    morning: {
        title: "Morning Adhkar",
        titleUr: "صبح کے اذکار",
        subtitle: "Between Fajr and sunrise for daily protection & barakah",
        subtitleUr: "فجر سے طلوع آفتاب کے درمیان برکت اور حفاظت کے مسنون اذکار",
        icon: "sunny-outline",
        items: [
            {
                id: "m_kursi",
                arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
                transliteration: "Allahu la ilaha illa Huwal-Hayyul-Qayyum. La ta'khudhuhu sinatun wa la nawm. Lahu ma fis-samawati wa ma fil-ard. Man dhal-ladhi yashfa'u 'indahu illa bi-idhnih. Ya'lamu ma bayna aydihim wa ma khalfahum, wa la yuhituna bi-shay'im-min 'ilmihi illa bima sha'a. Wasi'a kursiyyuhus-samawati wal-ard, wa la ya'uduhu hifzuhuma, wa Huwal-'Aliyyul-'Azeem.",
                english: "Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth...",
                urdu: "اللہ، اس کے سوا کوئی معبود نہیں، وہ زندہ ہے سب کا تھامنے والا ہے۔ نہ اسے اونگھ آتی ہے نہ نیند۔ اسی کا ہے جو کچھ آسمانوں میں ہے اور جو زمین میں ہے۔ کون ہے جو اس کی اجازت کے بغیر اس کے حضور سفارش کر سکے؟ وہ جانتا ہے جو کچھ ان کے آگے ہے اور جو ان کے پیچھے ہے...",
                repeat: 1,
                reference: "Surah Al-Baqarah (2:255) | Protected from jinn until evening (Al-Hakim)"
            },
            {
                id: "m_muawwidhat",
                arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nقُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ\n\nبِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ\n\nبِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nقُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ",
                transliteration: "Surah Al-Ikhlas, Surah Al-Falaq, and Surah An-Nas (Recite each 3 times).",
                english: "Say: He is Allah, the One... Say: I seek refuge in the Lord of daybreak... Say: I seek refuge in the Lord of mankind...",
                urdu: "سورۃ الاخلاص، سورۃ الفلق اور سورۃ الناس تین تین مرتبہ تلاوت کریں۔ ہر قسم کے شر اور بلا سے حفاظت کیلئے کافی ہیں۔",
                repeat: 3,
                reference: "Sunan Abi Dawud & At-Tirmidhi (Suffices against everything)"
            },
            {
                id: "m_asbahna",
                arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ",
                transliteration: "Asbahna wa-asbahal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la shareeka lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadeer. Rabbi as'aluka khayra ma fi hadhal-yawmi wa khayra ma ba'dahu, wa a'udhu bika min sharri ma fi hadhal-yawmi wa sharri ma ba'dahu...",
                english: "We have reached the morning and at this very time all sovereignty belongs to Allah. All praise is due to Allah. None has the right to be worshipped except Allah alone...",
                urdu: "ہم نے صبح کی اور تمام بادشاہی اللہ کے لیے ہے، اور سب تعریفیں اللہ کے لیے ہیں۔ اللہ کے سوا کوئی معبود نہیں وہ اکیلا ہے، اس کا کوئی شریک نہیں...",
                repeat: 1,
                reference: "Sahih Muslim"
            },
            {
                id: "m_sayyidul_istighfar",
                arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
                transliteration: "Allahumma anta Rabbi la ilaha illa Anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bini'matika 'alayya, wa abu'u bidhanbi faghfir li fa'innahu la yaghfirudh-dhunuba illa Ant.",
                english: "O Allah, You are my Lord, none has the right to be worshipped except You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done...",
                urdu: "سید الاستغفار: اے اللہ! تو ہی میرا رب ہے، تیرے سوا کوئی معبود نہیں، تو نے ہی مجھے پیدا کیا اور میں تیرا ہی بندہ ہوں، اور میں اپنی طاقت کے مطابق تیرے عہد اور وعدے پر قائم ہوں۔ میں اپنے کیے کے شر سے تیری پناہ مانگتا ہوں...",
                repeat: 1,
                reference: "Sahih al-Bukhari (Sayyidul Istighfar: Chief of Forgiveness)"
            },
            {
                id: "m_bismillah_ladi",
                arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
                transliteration: "Bismillahil-ladhi la yadurru ma'as-mihi shay'un fil-ardi wa la fis-sama'i wa Huwas-Sami'ul-'Aleem.",
                english: "In the Name of Allah, with Whose Name nothing can cause harm in the earth nor in the heavens, and He is the All-Hearing, the All-Knowing.",
                urdu: "اللہ کے نام سے جس کے نام کی برکت سے زمین اور آسمان کی کوئی چیز نقصان نہیں پہنچا سکتی، اور وہ خوب سننے والا اور جاننے والا ہے۔",
                repeat: 3,
                reference: "Sunan Abi Dawud & At-Tirmidhi (Nothing will harm whoever says it 3x)"
            },
            {
                id: "m_raditu",
                arabic: "رَضِيتُ بِاللَّهِ رَبَّاً، وَبِالْإِسْلَامِ دِينَاً، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيَّاً",
                transliteration: "Radeetu billahi Rabba, wa bil-Islami deena, wa bi-Muhammadin sallallahu 'alayhi wa sallama Nabiyya.",
                english: "I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad (peace and blessings be upon him) as my Prophet.",
                urdu: "میں اللہ کے رب ہونے پر، اسلام کے دین ہونے پر اور حضرت محمد ﷺ کے نبی ہونے پر راضی اور خوش ہوا۔",
                repeat: 3,
                reference: "Sunan Abi Dawud (Allah has promised to please whoever recites this)"
            },
            {
                id: "m_ya_hayyu",
                arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ",
                transliteration: "Ya Hayyu Ya Qayyumu bi-rahmatika astagheeth, aslih li sha'ni kullahu, wa la takilni ila nafsi tarfata 'ayn.",
                english: "O Ever-Living, O Self-Sustaining, by Your mercy I seek assistance; rectify for me all of my affairs, and do not leave me to myself even for the blink of an eye.",
                urdu: "اے ہمیشہ زندہ رہنے والے! اے کائنات کے سنبھالنے والے! میں تیری رحمت کے وسیلے سے مدد مانگتا ہوں، میرے تمام احوال درست فرما دے اور پلک جھپکنے کی دیر بھی مجھے میرے نفس کے حوالے نہ کر۔",
                repeat: 1,
                reference: "Sunan an-Nasa'i & Al-Hakim (Sahih)"
            },
            {
                id: "m_subhanallah_wa_bihamdihi_100",
                arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
                transliteration: "Subhan-Allahi wa bihamdihi.",
                english: "Glory be to Allah and His is the praise.",
                urdu: "اللہ پاک ہے اور اپنی تعریفوں کے ساتھ ہے۔ (۱۰۰ مرتبہ پڑھنے سے سمندر کی جھاگ کے برابر گناہ بھی معاف ہو جاتے ہیں)۔",
                repeat: 100,
                reference: "Sahih Muslim (Sins forgiven even if like the foam of the sea)"
            }
        ]
    },
    evening: {
        title: "Evening Adhkar",
        titleUr: "شام کے اذکار",
        subtitle: "Between Asr/Maghrib and night for serene evening protection",
        subtitleUr: "عصر تا مغرب اور رات کی حفاظت و سکون کے مسنون اذکار",
        icon: "moon-outline",
        items: [
            {
                id: "e_kursi",
                arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
                transliteration: "Ayat al-Kursi (Recite once in the evening).",
                english: "Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence...",
                urdu: "شام کی آیت الکرسی: صبح تک جنات، شیاطین اور ہر ناگہانی آفت سے اللہ کی حفاظت نصیب ہوتی ہے۔",
                repeat: 1,
                reference: "Al-Hakim (Protected from jinn until morning)"
            },
            {
                id: "e_muawwidhat",
                arabic: "سُورَةُ الإِخْلَاصِ ۝ سُورَةُ الفَلَقِ ۝ سُورَةُ النَّاسِ",
                transliteration: "Surah Al-Ikhlas, Surah Al-Falaq, and Surah An-Nas (Recite each 3 times).",
                english: "The 3 Quls recited 3 times in the evening.",
                urdu: "شام کے وقت تینوں قل (سورۃ الاخلاص، سورۃ الفلق اور سورۃ الناس) تین تین مرتبہ پڑھیں۔",
                repeat: 3,
                reference: "Sunan Abi Dawud & At-Tirmidhi"
            },
            {
                id: "e_amsayna",
                arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا...",
                transliteration: "Amsayna wa-amsal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la shareeka lah...",
                english: "We have reached the evening and at this very time all sovereignty belongs to Allah. All praise is due to Allah...",
                urdu: "ہم نے شام کی اور تمام بادشاہی اللہ کی ہے اور سب تعریفیں اللہ کے لیے ہیں۔ اے میرے رب! میں تجھ سے اس رات کی اور اس کے بعد کی خیر مانگتا ہوں...",
                repeat: 1,
                reference: "Sahih Muslim"
            },
            {
                id: "e_sayyidul_istighfar",
                arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
                transliteration: "Sayyidul Istighfar (Recite once in the evening).",
                english: "O Allah, You are my Lord, none has the right to be worshipped except You...",
                urdu: "سید الاستغفار: جو شخص شام کو یقین کے ساتھ یہ پڑھے اور اسی رات فوت ہو جائے تو وہ اہل جنت میں سے ہو گا۔",
                repeat: 1,
                reference: "Sahih al-Bukhari"
            },
            {
                id: "e_audhu_bikalimat",
                arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
                transliteration: "A'udhu bi-kalimatil-lahit-tammati min sharri ma khalaq.",
                english: "I seek refuge in the perfect words of Allah from the evil of that which He has created.",
                urdu: "میں اللہ کے کامل کلمات کی پناہ مانگتا ہوں اس کی پیدا کی ہوئی ہر چیز کے شر سے۔ (کوئی زہریلی چیز یا حاسد نقصان نہیں پہنچا سکے گا)۔",
                repeat: 3,
                reference: "Sahih Muslim (Shield against stings, venomous pests & evil)"
            },
            {
                id: "e_bismillah_ladi",
                arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
                transliteration: "Bismillahil-ladhi la yadurru ma'as-mihi shay'un fil-ardi wa la fis-sama'i wa Huwas-Sami'ul-'Aleem.",
                english: "In the Name of Allah, with Whose Name nothing can cause harm in the earth nor in the heavens...",
                urdu: "اللہ کے نام کے ساتھ جس کے نام سے زمین اور آسمان میں کوئی چیز نقصان نہیں پہنچا سکتی اور وہ خوب سننے والا، جاننے والا ہے۔",
                repeat: 3,
                reference: "Sunan Abi Dawud & At-Tirmidhi"
            }
        ]
    },
    after_salah: {
        title: "Post-Salah Adhkar",
        titleUr: "نماز کے بعد کے اذکار",
        subtitle: "Supplications right after completing the 5 daily Farz prayers",
        subtitleUr: "پانچوں وقت کی فرض نمازوں کے سلام کے فوراً بعد کے مسنون اذکار",
        icon: "hand-left-outline",
        items: [
            {
                id: "s_astaghfirullah",
                arabic: "أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ\nاللَّهُمَّ أَنْتَ السَّلاَمُ وَمِنْكَ السَّلاَمُ، تَبَارَكْتَ يَا ذَا الْجَلاَلِ وَالإِكْرَامِ",
                transliteration: "Astaghfirullah (3x). Allahumma antas-Salamu wa minkas-salam, tabarakta ya Dhal-Jalali wal-Ikram.",
                english: "I seek forgiveness from Allah (3 times). O Allah, You are Peace and from You comes peace. Blessed are You, O Owner of majesty and honor.",
                urdu: "میں اللہ سے بخشش مانگتا ہوں (۳ مرتبہ)۔ اے اللہ! تو ہی سلامتی والا ہے اور تجھ ہی سے سلامتی ہے، تو بڑی برکت والا ہے، اے بزرگی اور عزت والے!",
                repeat: 1,
                reference: "Sahih Muslim"
            },
            {
                id: "s_la_ilaha_wahdahu",
                arabic: "لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، اللَّهُمَّ لاَ مَانِعَ لِمَا أَعْطَيْتَ، وَلاَ مُعْطِيَ لِمَا مَنَعْتَ، وَلاَ يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ",
                transliteration: "La ilaha illallahu wahdahu la shareeka lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadeer. Allahumma la mani'a lima a'tayta, wa la mu'tiya lima mana'ta, wa la yanfa'u dhal-jaddi minkal-jadd.",
                english: "There is none worthy of worship except Allah alone, without partner. To Him belongs the dominion and to Him is praise... O Allah, none can withhold what You give, nor can give what You withhold.",
                urdu: "اللہ کے سوا کوئی معبود نہیں وہ اکیلا ہے، اس کا کوئی شریک نہیں، اسی کی بادشاہی ہے اور اسی کے لیے تعریف ہے، اور وہ ہر چیز پر قادر ہے۔ اے اللہ! جو تو دے اسے کوئی روکنے والا نہیں...",
                repeat: 1,
                reference: "Sahih al-Bukhari & Muslim"
            },
            {
                id: "s_tasbeeh_33",
                arabic: "سُبْحَانَ اللَّهِ (٣٣x) ، الْحَمْدُ لِلَّهِ (٣٣x) ، اللَّهُ أَكْبَرُ (٣٣x)\n\nتَمَامَ الْمِائَةِ: لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِیکَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
                transliteration: "Subhanallah (33x), Alhamdulillah (33x), Allahu Akbar (33x), and complete 100 with 'La ilaha illallah...'",
                english: "Glory be to Allah (33x), Praise be to Allah (33x), Allah is the Greatest (33x), completed with the declaration of Tawhid.",
                urdu: "سبحان اللہ (۳۳ مرتبہ)، الحمد للہ (۳۳ مرتبہ)، اللہ اکبر (۳۳ مرتبہ) اور سو کا شمار اس کلمہ توحید سے پورا کریں۔ سمندر کے جھاگ جتنے گناہ بھی معاف کر دیے جاتے ہیں۔",
                repeat: 33,
                reference: "Sahih Muslim (Sins are forgiven even if as vast as the sea foam)"
            },
            {
                id: "s_kursi_after_salah",
                arabic: "آيَةُ الْكُرْسِيِّ (اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...)",
                transliteration: "Ayat al-Kursi (Recited once after every obligatory prayer).",
                english: "Recite Ayat al-Kursi following every Farz prayer.",
                urdu: "ہر فرض نماز کے بعد آیت الکرسی کی تلاوت: جو شخص ہر فرض نماز کے بعد آیت الکرسی پڑھے، اسے جنت میں داخل ہونے سے سوائے موت کے کوئی چیز نہیں روکتی۔",
                repeat: 1,
                reference: "Sunan an-Nasa'i (Nothing stands between him and entering Paradise except death)"
            }
        ]
    },
    sleep: {
        title: "Before Sleep Adhkar",
        titleUr: "سونے سے پہلے کی دعائیں",
        subtitle: "Peaceful rest, forgiveness, and protection through the night",
        subtitleUr: "پرامن نیند، حفاظت، اور رات کے وقت بخشش کی مسنون دعائیں",
        icon: "bed-outline",
        items: [
            {
                id: "sl_muawwidhat_blow",
                arabic: "سُورَةُ الإِخْلَاصِ ۝ سُورَةُ الفَلَقِ ۝ سُورَةُ النَّاسِ",
                transliteration: "Cupping hands, reciting 3 Quls, blowing into hands and wiping over the entire body (Repeat 3 times).",
                english: "Recite Surah Al-Ikhlas, Al-Falaq, and An-Nas into cupped palms and wipe all reachable body parts starting from the head and face.",
                urdu: "دونوں ہاتھوں کو جوڑ کر تینوں قل پڑھیں اور پھونک مار کر چہرے اور سر سے شروع کر کے پورے جسم پر ہاتھ پھیریں (۳ مرتبہ کریں)۔",
                repeat: 3,
                reference: "Sahih al-Bukhari"
            },
            {
                id: "sl_bismika_rabbi",
                arabic: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ",
                transliteration: "Bismika Rabbi wada'tu janbi wa bika arfa'uh, fa-in amsakta nafsi farhamha, wa in arsaltaha fahfazha bima tahfazu bihi 'ibadakas-salihin.",
                english: "In Your name my Lord, I lie down and in Your name I rise up. If You take my soul, have mercy upon it, and if You return my soul, protect it as You protect Your righteous servants.",
                urdu: "اے میرے رب! تیرے نام کے ساتھ میں نے اپنا پہلو رکھا اور تیرے ہی نام کے ساتھ اٹھوں گا۔ اگر تو میری روح کو روک لے تو اس پر رحم فرما اور اگر تو اسے چھوڑ دے تو اس کی ویسے ہی حفاظت فرما جیسے تو اپنے نیک بندوں کی فرماتا ہے۔",
                repeat: 1,
                reference: "Sahih al-Bukhari & Muslim"
            },
            {
                id: "sl_tasbeeh_fatima",
                arabic: "سُبْحَانَ اللَّهِ (٣٣x) ، الْحَمْدُ لِلَّهِ (٣٣x) ، اللَّهُ أَكْبَرُ (٣٤x)",
                transliteration: "Subhanallah (33x), Alhamdulillah (33x), Allahu Akbar (34x).",
                english: "Recite Subhanallah 33 times, Alhamdulillah 33 times, and Allahu Akbar 34 times before sleeping.",
                urdu: "تسبیح فاطمہ: سونے سے قبل ۳۳ مرتبہ سبحان اللہ، ۳۳ مرتبہ الحمد للہ اور ۳۴ مرتبہ اللہ اکبر پڑھیں۔ تھکاوٹ دور کرنے اور برکت کیلئے خادم سے بہتر ہے۔",
                repeat: 34,
                reference: "Sahih al-Bukhari (Tasbeeh Fatimi: Better than a servant for energy and ease)"
            }
        ]
    },
    everyday_duas: {
        title: "Everyday Prophetic Duas",
        titleUr: "روزمرہ کی مسنون دعائیں",
        subtitle: "Sunnah supplications for daily routines, actions, and milestones",
        subtitleUr: "سونے جاگنے، کھانے پینے، گھر اور سفر کے معمولات کی نبوی دعائیں",
        icon: "heart-circle-outline",
        items: [
            {
                id: "d_waking_up",
                arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
                transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushoor.",
                english: "All praise is due to Allah Who gave us life after having given us death, and unto Him is the resurrection.",
                urdu: "تمام تعریفیں اللہ کے لیے ہیں جس نے ہمیں مارنے (سلانے) کے بعد زندہ کیا اور اسی کی طرف اٹھ کر جانا ہے۔",
                repeat: 1,
                reference: "Sahih al-Bukhari (Upon Waking Up)"
            },
            {
                id: "d_entering_home",
                arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا",
                transliteration: "Bismillahi walajna, wa bismillahi kharajna, wa 'ala Rabbina tawakkalna.",
                english: "In the name of Allah we enter, in the name of Allah we leave, and upon our Lord we rely.",
                urdu: "ہم اللہ کے نام کے ساتھ داخل ہوئے اور اللہ کے نام کے ساتھ ہی نکلے، اور اپنے رب پر ہی ہم نے بھروسہ کیا۔",
                repeat: 1,
                reference: "Sunan Abi Dawud (Entering Home)"
            },
            {
                id: "d_leaving_home",
                arabic: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
                transliteration: "Bismillahi tawakkaltu 'alallahi, wa la hawla wa la quwwata illa billah.",
                english: "In the name of Allah, I place my trust in Allah; there is no power and no strength except with Allah.",
                urdu: "اللہ کے نام سے میں نکلتا ہوں، میں نے اللہ پر بھروسہ کیا، اور اللہ کے سوا برائی سے بچنے اور نیکی کرنے کی کوئی طاقت نہیں۔",
                repeat: 1,
                reference: "Sunan Abi Dawud & At-Tirmidhi (Leaving Home)"
            },
            {
                id: "d_eating",
                arabic: "بِسْمِ اللَّهِ (وَعَلَى بَرَكَةِ اللَّهِ)\n\nعِنْدَ الفَرَاغِ: الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
                transliteration: "Before eating: 'Bismillah'. After eating: 'Alhamdu lillahil-ladhi at'amani hadha wa razaqanihi min ghayri hawlin minni wa la quwwah.'",
                english: "Before eating: In the Name of Allah. After eating: All praise is due to Allah Who gave me this food and provided it for me without any power or strength from myself.",
                urdu: "کھانے سے پہلے: اللہ کے نام کے ساتھ اور اللہ کی برکت پر۔ کھانے کے بعد: تمام تعریفیں اللہ کے لیے ہیں جس نے مجھے یہ کھانا کھلایا اور بغیر میری طاقت کے رزق عطا فرمایا۔",
                repeat: 1,
                reference: "Sunan Abi Dawud & At-Tirmidhi (Before & After Meals)"
            },
            {
                id: "d_bathroom_enter_exit",
                arabic: "عِنْدَ الدُّخُولِ: اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ\n\nعِنْدَ الْخُرُوجِ: غُفْرَانَكَ",
                transliteration: "Entering: 'Allahumma inni a'udhu bika minal-khubthi wal-khaba'ith'. Exiting: 'Ghufranak'.",
                english: "Entering: O Allah, I seek refuge in You from the male and female impure spirits. Exiting: I seek Your forgiveness.",
                urdu: "بیت الخلاء داخل ہوتے وقت: اے اللہ! میں ناپاک جنات (نر و مادہ) کے شر سے تیری پناہ مانگتا ہوں۔ نکلتے وقت: اے اللہ میں تیری بخشش کا طلبگار ہوں۔",
                repeat: 1,
                reference: "Sahih al-Bukhari & Muslim (Bathroom Sunnah)"
            },
            {
                id: "d_travel",
                arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ",
                transliteration: "Subhanal-ladhi sakh-khara lana hadha wa ma kunna lahu muqrinin, wa inna ila Rabbina lamunqalibun.",
                english: "Glory to Him Who has subjected this to us, whereas we could not have done so by ourselves, and indeed unto our Lord we shall return.",
                urdu: "پاک ہے وہ ذات جس نے اس سواری کو ہمارے تابع کر دیا حالانکہ ہم اسے قابو کرنے والے نہ تھے، اور بے شک ہم اپنے رب کی طرف ہی لوٹ کر جانے والے ہیں۔",
                repeat: 1,
                reference: "Surah Az-Zukhruf (43:13-14) | Sahih Muslim (Travel)"
            }
        ]
    }
};
