export interface SurahAyah {
    numberInSurah: number;
    arabic: string;
    english: string;
    urduJalandhari: string;
    urduKanzulIman: string;
}

export interface DailySurahItem {
    id: string;
    surahNumber: number;
    nameEn: string;
    nameUr: string;
    titleEn: string;
    titleUr: string;
    virtueEn: string;
    virtueUr: string;
    fullSurah: boolean;
    totalAyahs: number;
    ayahs: SurahAyah[];
}

export type UrduTranslationEdition = 'jalandhari' | 'kanzuliman';

export const DAILY_SURAHS: DailySurahItem[] = [
  {
    "id": "al_mulk",
    "surahNumber": 67,
    "nameEn": "Surah Al-Mulk",
    "nameUr": "سورۃ الملک",
    "titleEn": "The Sovereignty",
    "titleUr": "بادشاہی",
    "virtueEn": "Recited before sleep for protection from the punishment of the grave (Sunan At-Tirmidhi).",
    "virtueUr": "سونے سے قبل تلاوت: عذابِ قبر سے حفاظت اور شفاعت کا ذریعہ (جامع ترمذی)۔",
    "fullSurah": true,
    "totalAyahs": 30,
    "ayahs": [
      {
        "numberInSurah": 1,
        "arabic": "تَبَٰرَكَ ٱلَّذِى بِيَدِهِ ٱلْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَىْءٍۢ قَدِيرٌ",
        "english": "Blessed is He in whose hand is dominion, and He is over all things competent -",
        "urduJalandhari": "وہ (خدا) جس کے ہاتھ میں بادشاہی ہے بڑی برکت والا ہے۔ اور وہ ہر چیز پر قادر ہے",
        "urduKanzulIman": "بڑی برکت والا ہے وہ جس کے قبضہ میں سارا ملک اور وہ ہر چیز پر قادر ہے،"
      },
      {
        "numberInSurah": 2,
        "arabic": "ٱلَّذِى خَلَقَ ٱلْمَوْتَ وَٱلْحَيَوٰةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًۭا ۚ وَهُوَ ٱلْعَزِيزُ ٱلْغَفُورُ",
        "english": "[He] who created death and life to test you [as to] which of you is best in deed - and He is the Exalted in Might, the Forgiving -",
        "urduJalandhari": "اسی نے موت اور زندگی کو پیدا کیا تاکہ تمہاری آزمائش کرے کہ تم میں کون اچھے عمل کرتا ہے۔ اور وہ زبردست (اور) بخشنے والا ہے",
        "urduKanzulIman": "وہ جس نے موت اور زندگی پیدا کی کہ تمہاری جانچ ہو تم میں کس کا کام زیادہ اچھا ہے اور وہی عزت والا بخشش والا ہے،"
      },
      {
        "numberInSurah": 3,
        "arabic": "ٱلَّذِى خَلَقَ سَبْعَ سَمَٰوَٰتٍۢ طِبَاقًۭا ۖ مَّا تَرَىٰ فِى خَلْقِ ٱلرَّحْمَٰنِ مِن تَفَٰوُتٍۢ ۖ فَٱرْجِعِ ٱلْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍۢ",
        "english": "[And] who created seven heavens in layers. You do not see in the creation of the Most Merciful any inconsistency. So return [your] vision [to the sky]; do you see any breaks?",
        "urduJalandhari": "اس نے سات آسمان اوپر تلے بنائے۔ (اے دیکھنے والے) کیا تو (خدا) رحمٰن کی آفرینش میں کچھ نقص دیکھتا ہے؟ ذرا آنکھ اٹھا کر دیکھ بھلا تجھ کو (آسمان میں) کوئی شگاف نظر آتا ہے؟",
        "urduKanzulIman": "جس نے سات آسمان بنائے ایک کے اوپر دوسرا، تو رحمٰن کے بنانے میں کیا فرق دیکھتا ہے تو نگاہ اٹھا کر دیکھ تجھے کوئی رخنہ نظر آتا ہے،"
      },
      {
        "numberInSurah": 4,
        "arabic": "ثُمَّ ٱرْجِعِ ٱلْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ ٱلْبَصَرُ خَاسِئًۭا وَهُوَ حَسِيرٌۭ",
        "english": "Then return [your] vision twice again. [Your] vision will return to you humbled while it is fatigued.",
        "urduJalandhari": "پھر دو بارہ (سہ بارہ) نظر کر، تو نظر (ہر بار) تیرے پاس ناکام اور تھک کر لوٹ آئے گی",
        "urduKanzulIman": "پھر دوبارہ نگاہ اٹھا نظر تیری طرف ناکام پلٹ آئے گی تھکی ماندی"
      },
      {
        "numberInSurah": 5,
        "arabic": "وَلَقَدْ زَيَّنَّا ٱلسَّمَآءَ ٱلدُّنْيَا بِمَصَٰبِيحَ وَجَعَلْنَٰهَا رُجُومًۭا لِّلشَّيَٰطِينِ ۖ وَأَعْتَدْنَا لَهُمْ عَذَابَ ٱلسَّعِيرِ",
        "english": "And We have certainly beautified the nearest heaven with stars and have made [from] them what is thrown at the devils and have prepared for them the punishment of the Blaze.",
        "urduJalandhari": "اور ہم نے قریب کے آسمان کو (تاروں کے) چراغوں سے زینت دی۔ اور ان کو شیطان کے مارنے کا آلہ بنایا اور ان کے لئے دہکتی آگ کا عذاب تیار کر رکھا ہے",
        "urduKanzulIman": "اور بیشک ہم نے نیچے کے آسمان کو چراغوں سے آراستہ کیا اور انہیں شیطانوں کے لیے مار کیا اور ان کے لیے بھڑکتی آگ کا عذاب تیار فرمایا"
      },
      {
        "numberInSurah": 6,
        "arabic": "وَلِلَّذِينَ كَفَرُوا۟ بِرَبِّهِمْ عَذَابُ جَهَنَّمَ ۖ وَبِئْسَ ٱلْمَصِيرُ",
        "english": "And for those who disbelieved in their Lord is the punishment of Hell, and wretched is the destination.",
        "urduJalandhari": "اور جن لوگوں نے اپنے پروردگار سے انکار کیا ان کے لئے جہنم کا عذاب ہے۔ اور وہ برا ٹھکانہ ہے",
        "urduKanzulIman": "اور جنہوں نے اپنے رب کے ساتھ کفر کیا ان کے لیے جہنم کا عذاب ہے، اور کیا ہی برا انجام،"
      },
      {
        "numberInSurah": 7,
        "arabic": "إِذَآ أُلْقُوا۟ فِيهَا سَمِعُوا۟ لَهَا شَهِيقًۭا وَهِىَ تَفُورُ",
        "english": "When they are thrown into it, they hear from it a [dreadful] inhaling while it boils up.",
        "urduJalandhari": "جب وہ اس میں ڈالے جائیں گے تو اس کا چیخنا چلانا سنیں گے اور وہ جوش مار رہی ہوگی",
        "urduKanzulIman": "جب اس میں ڈالے جائیں گے اس کا رینکنا (چنگھاڑنا) سنیں گے کہ جوش مارتی ہے"
      },
      {
        "numberInSurah": 8,
        "arabic": "تَكَادُ تَمَيَّزُ مِنَ ٱلْغَيْظِ ۖ كُلَّمَآ أُلْقِىَ فِيهَا فَوْجٌۭ سَأَلَهُمْ خَزَنَتُهَآ أَلَمْ يَأْتِكُمْ نَذِيرٌۭ",
        "english": "It almost bursts with rage. Every time a company is thrown into it, its keepers ask them, \"Did there not come to you a warner?\"",
        "urduJalandhari": "گویا مارے جوش کے پھٹ پڑے گی۔ جب اس میں ان کی کوئی جماعت ڈالی جائے گی تو دوزخ کے داروغہ ان سے پوچھیں گے کہ تمہارے پاس کوئی ہدایت کرنے والا نہیں آیا تھا؟",
        "urduKanzulIman": "معلوم ہوتا ہے کہ شدت غضب میں پھٹ جائے گی، جب کبھی کوئی گروہ اس میں ڈالا جائے گا اس کے داروغہ ان سے پوچھیں گے کیا تمہارے پاس کوئی ڈر سنانے والا نہ آیا تھا"
      },
      {
        "numberInSurah": 9,
        "arabic": "قَالُوا۟ بَلَىٰ قَدْ جَآءَنَا نَذِيرٌۭ فَكَذَّبْنَا وَقُلْنَا مَا نَزَّلَ ٱللَّهُ مِن شَىْءٍ إِنْ أَنتُمْ إِلَّا فِى ضَلَٰلٍۢ كَبِيرٍۢ",
        "english": "They will say,\" Yes, a warner had come to us, but we denied and said, 'Allah has not sent down anything. You are not but in great error.'\"",
        "urduJalandhari": "وہ کہیں گے کیوں نہیں ضرور ہدایت کرنے والا آیا تھا لیکن ہم نے اس کو جھٹلا دیا اور کہا کہ خدا نے تو کوئی چیز نازل ہی نہیں کی۔ تم تو بڑی غلطی میں (پڑے ہوئے) ہو",
        "urduKanzulIman": "کہیں گے کیوں نہیں بیشک ہمارے پاس ڈر سنانے والے تشریف لائے پھر ہم نے جھٹلایا اور کہا اللہ نے کچھ نہیں اُتارا، تم تو نہیں مگر بڑی گمراہی میں،"
      },
      {
        "numberInSurah": 10,
        "arabic": "وَقَالُوا۟ لَوْ كُنَّا نَسْمَعُ أَوْ نَعْقِلُ مَا كُنَّا فِىٓ أَصْحَٰبِ ٱلسَّعِيرِ",
        "english": "And they will say, \"If only we had been listening or reasoning, we would not be among the companions of the Blaze.\"",
        "urduJalandhari": "اور کہیں گے اگر ہم سنتے یا سمجھتے ہوتے تو دوزخیوں میں نہ ہوتے",
        "urduKanzulIman": "اور کہیں گے اگر ہم سنتے یا سمجھتے تو دوزخ والوں میں نہ ہوتے،"
      },
      {
        "numberInSurah": 11,
        "arabic": "فَٱعْتَرَفُوا۟ بِذَنۢبِهِمْ فَسُحْقًۭا لِّأَصْحَٰبِ ٱلسَّعِيرِ",
        "english": "And they will admit their sin, so [it is] alienation for the companions of the Blaze.",
        "urduJalandhari": "پس وہ اپنے گناہ کا اقرار کرلیں گے۔ سو دوزخیوں کے لئے (رحمت خدا سے) دور ہی ہے",
        "urduKanzulIman": "اب اپنے گناہ کا اقرار کیا تو پھٹکار ہو دوزخیوں کو،"
      },
      {
        "numberInSurah": 12,
        "arabic": "إِنَّ ٱلَّذِينَ يَخْشَوْنَ رَبَّهُم بِٱلْغَيْبِ لَهُم مَّغْفِرَةٌۭ وَأَجْرٌۭ كَبِيرٌۭ",
        "english": "Indeed, those who fear their Lord unseen will have forgiveness and great reward.",
        "urduJalandhari": "(اور) جو لوگ بن دیکھے اپنے پروردگار سے ڈرتے ہیں ان کے لئے بخشش اور اجر عظیم ہے",
        "urduKanzulIman": "بیشک جو بے دیکھے اپنے رب سے ڈرتے ہیں ان کے لیے بخشش اور بڑا ثواب ہے"
      },
      {
        "numberInSurah": 13,
        "arabic": "وَأَسِرُّوا۟ قَوْلَكُمْ أَوِ ٱجْهَرُوا۟ بِهِۦٓ ۖ إِنَّهُۥ عَلِيمٌۢ بِذَاتِ ٱلصُّدُورِ",
        "english": "And conceal your speech or publicize it; indeed, He is Knowing of that within the breasts.",
        "urduJalandhari": "اور تم (لوگ) بات پوشیدہ کہو یا ظاہر۔ وہ دل کے بھیدوں تک سے واقف ہے",
        "urduKanzulIman": "اور تم اپنی بات آہستہ کہو یا آواز سے، وہ تو دلوں کی جانتا ہے"
      },
      {
        "numberInSurah": 14,
        "arabic": "أَلَا يَعْلَمُ مَنْ خَلَقَ وَهُوَ ٱللَّطِيفُ ٱلْخَبِيرُ",
        "english": "Does He who created not know, while He is the Subtle, the Acquainted?",
        "urduJalandhari": "بھلا جس نے پیدا کیا وہ بےخبر ہے؟ وہ تو پوشیدہ باتوں کا جاننے والا اور (ہر چیز سے) آگاہ ہے",
        "urduKanzulIman": "کیا وہ نہ جانے جس نے پیدا کیا؟ اور وہی ہے ہر باریکی جانتا خبردار،"
      },
      {
        "numberInSurah": 15,
        "arabic": "هُوَ ٱلَّذِى جَعَلَ لَكُمُ ٱلْأَرْضَ ذَلُولًۭا فَٱمْشُوا۟ فِى مَنَاكِبِهَا وَكُلُوا۟ مِن رِّزْقِهِۦ ۖ وَإِلَيْهِ ٱلنُّشُورُ",
        "english": "It is He who made the earth tame for you - so walk among its slopes and eat of His provision - and to Him is the resurrection.",
        "urduJalandhari": "وہی تو ہے جس نے تمہارے لئے زمین کو نرم کیا تو اس کی راہوں میں چلو پھرو اور خدا کا (دیا ہو) رزق کھاؤ اور تم کو اسی کے پاس (قبروں سے) نکل کر جانا ہے",
        "urduKanzulIman": "وہی ہے جس نے تمہارے لیے زمین رام (تابع) کر دی تو اس کے رستوں میں چلو اور اللہ کی روزی میں سے کھاؤ اور اسی کی طرف اٹھنا ہے"
      },
      {
        "numberInSurah": 16,
        "arabic": "ءَأَمِنتُم مَّن فِى ٱلسَّمَآءِ أَن يَخْسِفَ بِكُمُ ٱلْأَرْضَ فَإِذَا هِىَ تَمُورُ",
        "english": "Do you feel secure that He who [holds authority] in the heaven would not cause the earth to swallow you and suddenly it would sway?",
        "urduJalandhari": "کیا تم اس سے جو آسمان میں ہے بےخوف ہو کہ تم کو زمین میں دھنسا دے اور وہ اس وقت حرکت کرنے لگے",
        "urduKanzulIman": "کیا تم اس سےنڈر ہوگئے جس کی سلطنت آسمان میں ہے کہ تمہیں زمین میں دھنسادے جبھی وہ کانپتی رہے"
      },
      {
        "numberInSurah": 17,
        "arabic": "أَمْ أَمِنتُم مَّن فِى ٱلسَّمَآءِ أَن يُرْسِلَ عَلَيْكُمْ حَاصِبًۭا ۖ فَسَتَعْلَمُونَ كَيْفَ نَذِيرِ",
        "english": "Or do you feel secure that He who [holds authority] in the heaven would not send against you a storm of stones? Then you would know how [severe] was My warning.",
        "urduJalandhari": "کیا تم اس سے جو آسمان میں ہے نڈر ہو کہ تم پر کنکر بھری ہوا چھوڑ دے۔ سو تم عنقریب جان لو گے کہ میرا ڈرانا کیسا ہے",
        "urduKanzulIman": "یا تم نڈر ہوگئے اس سے جس کی سلطنت آسمان میں ہے کہ تم پر پتھراؤ بھیجے تو اب جانو گے کیسا تھا میرا ڈرانا،"
      },
      {
        "numberInSurah": 18,
        "arabic": "وَلَقَدْ كَذَّبَ ٱلَّذِينَ مِن قَبْلِهِمْ فَكَيْفَ كَانَ نَكِيرِ",
        "english": "And already had those before them denied, and how [terrible] was My reproach.",
        "urduJalandhari": "اور جو لوگ ان سے پہلے تھے انہوں نے بھی جھٹلایا تھا سو (دیکھ لو کہ) میرا کیسا عذاب ہوا",
        "urduKanzulIman": "اور بیشک ان سے اگلوں نے جھٹلایا تو کیسا ہوا میرا انکار"
      },
      {
        "numberInSurah": 19,
        "arabic": "أَوَلَمْ يَرَوْا۟ إِلَى ٱلطَّيْرِ فَوْقَهُمْ صَٰٓفَّٰتٍۢ وَيَقْبِضْنَ ۚ مَا يُمْسِكُهُنَّ إِلَّا ٱلرَّحْمَٰنُ ۚ إِنَّهُۥ بِكُلِّ شَىْءٍۭ بَصِيرٌ",
        "english": "Do they not see the birds above them with wings outspread and [sometimes] folded in? None holds them [aloft] except the Most Merciful. Indeed He is, of all things, Seeing.",
        "urduJalandhari": "کیا انہوں نے اپنے سروں پر اڑتے ہوئے جانوروں کو نہیں دیکھا جو پروں کو پھیلائے رہتے ہیں اور ان کو سکیڑ بھی لیتے ہیں۔ خدا کے سوا انہیں کوئی تھام نہیں سکتا۔ بےشک وہ ہر چیز کو دیکھ رہا ہے",
        "urduKanzulIman": "اور کیا انہوں نے اپنے اوپر پرندے نہ دیکھے پر پھیلاتے اور سمیٹتے انہیں کوئی نہیں روکتا سوا رحمٰن کے بیشک وہ سب کچھ دیکھتا ہے،"
      },
      {
        "numberInSurah": 20,
        "arabic": "أَمَّنْ هَٰذَا ٱلَّذِى هُوَ جُندٌۭ لَّكُمْ يَنصُرُكُم مِّن دُونِ ٱلرَّحْمَٰنِ ۚ إِنِ ٱلْكَٰفِرُونَ إِلَّا فِى غُرُورٍ",
        "english": "Or who is it that could be an army for you to aid you other than the Most Merciful? The disbelievers are not but in delusion.",
        "urduJalandhari": "بھلا ایسا کون ہے جو تمہاری فوج ہو کر خدا کے سوا تمہاری مدد کرسکے۔ کافر تو دھوکے میں ہیں",
        "urduKanzulIman": "یا وہ کونسا تمہارا لشکر ہے کہ رحمٰن کے مقابل تمہاری مدد کرے کافر نہیں مگر دھوکے میں"
      },
      {
        "numberInSurah": 21,
        "arabic": "أَمَّنْ هَٰذَا ٱلَّذِى يَرْزُقُكُمْ إِنْ أَمْسَكَ رِزْقَهُۥ ۚ بَل لَّجُّوا۟ فِى عُتُوٍّۢ وَنُفُورٍ",
        "english": "Or who is it that could provide for you if He withheld His provision? But they have persisted in insolence and aversion.",
        "urduJalandhari": "بھلا اگر وہ اپنا رزق بند کرلے تو کون ہے جو تم کو رزق دے؟ لیکن یہ سرکشی اور نفرت میں پھنسے ہوئے ہیں",
        "urduKanzulIman": "یا کونسا ایسا ہے جو تمہیں روزی دے اگر وہ اپنی روزی روک لے بلکہ وہ سرکش اور نفرت میں ڈھیٹ بنے ہوئے ہیں"
      },
      {
        "numberInSurah": 22,
        "arabic": "أَفَمَن يَمْشِى مُكِبًّا عَلَىٰ وَجْهِهِۦٓ أَهْدَىٰٓ أَمَّن يَمْشِى سَوِيًّا عَلَىٰ صِرَٰطٍۢ مُّسْتَقِيمٍۢ",
        "english": "Then is one who walks fallen on his face better guided or one who walks erect on a straight path?",
        "urduJalandhari": "بھلا جو شخص چلتا ہوا منہ کے بل گر پڑتا ہے وہ سیدھے رستے پر ہے یا وہ جو سیدھے رستے پر برابر چل رہا ہو؟",
        "urduKanzulIman": "تو کیا وہ جو اپنے منہ کے بل اوندھا چلے زیادہ راہ پر ہے یا وہ جو سیدھا چلے سیدھی راہ پر"
      },
      {
        "numberInSurah": 23,
        "arabic": "قُلْ هُوَ ٱلَّذِىٓ أَنشَأَكُمْ وَجَعَلَ لَكُمُ ٱلسَّمْعَ وَٱلْأَبْصَٰرَ وَٱلْأَفْـِٔدَةَ ۖ قَلِيلًۭا مَّا تَشْكُرُونَ",
        "english": "Say, \"It is He who has produced you and made for you hearing and vision and hearts; little are you grateful.\"",
        "urduJalandhari": "کہو وہ خدا ہی تو ہے جس نے تم کو پیدا کیا۔ اور تمہارے کان اور آنکھیں اور دل بنائے (مگر) تم کم احسان مانتے ہو",
        "urduKanzulIman": "تم فرماؤ وہی ہے جس نے تمہیں پیدا کیا اور تمہارے لیے کان اور آنکھ اور دل بنائے کتنا کم حق مانتے ہو"
      },
      {
        "numberInSurah": 24,
        "arabic": "قُلْ هُوَ ٱلَّذِى ذَرَأَكُمْ فِى ٱلْأَرْضِ وَإِلَيْهِ تُحْشَرُونَ",
        "english": "Say, \"It is He who has multiplied you throughout the earth, and to Him you will be gathered.\"",
        "urduJalandhari": "کہہ دو کہ وہی ہے جس نے تم کو زمین میں پھیلایا اور اسی کے روبرو تم جمع کئے جاؤ گے",
        "urduKanzulIman": "تم فرماؤ وہی ہے جس نے تمہیں زمین میں پھیلایا اور اسی کی طرف اٹھائے جاؤ گے"
      },
      {
        "numberInSurah": 25,
        "arabic": "وَيَقُولُونَ مَتَىٰ هَٰذَا ٱلْوَعْدُ إِن كُنتُمْ صَٰدِقِينَ",
        "english": "And they say, \"When is this promise, if you should be truthful?\"",
        "urduJalandhari": "اور کافر کہتے ہیں کہ اگر تم سچے ہو تو یہ وعید کب (پورا) ہوگا؟",
        "urduKanzulIman": "اور کہتے ہیں یہ وعدہ کب آئے گا اگر تم سچے ہو،"
      },
      {
        "numberInSurah": 26,
        "arabic": "قُلْ إِنَّمَا ٱلْعِلْمُ عِندَ ٱللَّهِ وَإِنَّمَآ أَنَا۠ نَذِيرٌۭ مُّبِينٌۭ",
        "english": "Say, \"The knowledge is only with Allah, and I am only a clear warner.\"",
        "urduJalandhari": "کہہ دو اس کا علم خدا ہی کو ہے۔ اور میں تو کھول کھول کر ڈر سنانے دینے والا ہوں",
        "urduKanzulIman": "تم فرماؤ یہ علم تو اللہ کے پاس ہے، اور میں تو یہی صاف ڈر سنانے والا ہوں"
      },
      {
        "numberInSurah": 27,
        "arabic": "فَلَمَّا رَأَوْهُ زُلْفَةًۭ سِيٓـَٔتْ وُجُوهُ ٱلَّذِينَ كَفَرُوا۟ وَقِيلَ هَٰذَا ٱلَّذِى كُنتُم بِهِۦ تَدَّعُونَ",
        "english": "But when they see it approaching, the faces of those who disbelieve will be distressed, and it will be said, \"This is that for which you used to call.\"",
        "urduJalandhari": "سو جب وہ دیکھ لیں گے کہ وہ (وعدہ) قریب آگیا تو کافروں کے منہ برے ہوجائیں گے اور (ان سے) کہا جائے گا کہ یہ وہی ہے جس کے تم خواستگار تھے",
        "urduKanzulIman": "پھر جب اسے پاس دیکھیں گے کافروں کے منہ بگڑ جائیں گے اور ان سے فرمادیا جائے گا یہ ہے جو تم مانگتے تھے"
      },
      {
        "numberInSurah": 28,
        "arabic": "قُلْ أَرَءَيْتُمْ إِنْ أَهْلَكَنِىَ ٱللَّهُ وَمَن مَّعِىَ أَوْ رَحِمَنَا فَمَن يُجِيرُ ٱلْكَٰفِرِينَ مِنْ عَذَابٍ أَلِيمٍۢ",
        "english": "Say, [O Muhammad], \"Have you considered: whether Allah should cause my death and those with me or have mercy upon us, who can protect the disbelievers from a painful punishment?\"",
        "urduJalandhari": "کہو کہ بھلا دیکھو تو اگر خدا مجھ کو اور میرے ساتھیوں کو ہلاک کردے یا ہم پر مہربانی کرے۔ تو کون ہے کافروں کو دکھ دینے والے عذاب سے پناہ دے؟",
        "urduKanzulIman": "تم فرماؤ بھلا دیکھو تو اگر اللہ مجھے اور میرے ساتھ والوں کو بلاک کردے یا ہم پر رحم فرمائے تو وہ کونسا ہے جو کافروں کو دکھ کے عذاب سے بچالے گا"
      },
      {
        "numberInSurah": 29,
        "arabic": "قُلْ هُوَ ٱلرَّحْمَٰنُ ءَامَنَّا بِهِۦ وَعَلَيْهِ تَوَكَّلْنَا ۖ فَسَتَعْلَمُونَ مَنْ هُوَ فِى ضَلَٰلٍۢ مُّبِينٍۢ",
        "english": "Say, \"He is the Most Merciful; we have believed in Him, and upon Him we have relied. And you will [come to] know who it is that is in clear error.\"",
        "urduJalandhari": "کہہ دو کہ وہ جو (خدائے) رحمٰن (ہے) ہم اسی پر ایمان لائے اور اسی پر بھروسا رکھتے ہیں۔ تم کو جلد معلوم ہوجائے گا کہ صریح گمراہی میں کون پڑ رہا تھا",
        "urduKanzulIman": "تم فرماؤ وہی رحمٰن ہے ہم اس پر ایمان لائے اور اسی پر بھروسہ کیا، تو اب جان جاؤ گے کون کھلی گمراہی میں ہے،"
      },
      {
        "numberInSurah": 30,
        "arabic": "قُلْ أَرَءَيْتُمْ إِنْ أَصْبَحَ مَآؤُكُمْ غَوْرًۭا فَمَن يَأْتِيكُم بِمَآءٍۢ مَّعِينٍۭ",
        "english": "Say, \"Have you considered: if your water was to become sunken [into the earth], then who could bring you flowing water?\"",
        "urduJalandhari": "کہو کہ بھلا دیکھو تو اگر تمہارا پانی (جو تم پیتے ہو اور برتے ہو) خشک ہوجائے تو (خدا کے) سوا کون ہے جو تمہارے لئے شیریں پانی کا چشمہ بہا لائے",
        "urduKanzulIman": "تم فرماؤ بھلا دیکھو تو اگر صبح کو تمہارا پانی زمین میں دھنس جائے تو وہ کون ہے جو تمہیں پانی لادے نگاہ کے سامنے بہتا"
      }
    ]
  },
  {
    "id": "as_sajdah",
    "surahNumber": 32,
    "nameEn": "Surah As-Sajdah",
    "nameUr": "سورۃ السجدہ",
    "titleEn": "The Prostration",
    "titleUr": "سجدہ",
    "virtueEn": "The Prophet (ﷺ) would not sleep until he recited Surah As-Sajdah and Surah Al-Mulk (At-Tirmidhi).",
    "virtueUr": "رسول اللہ ﷺ رات کو اس وقت تک نہیں سوتے تھے جب تک سورۃ السجدہ اور سورۃ الملک نہ پڑھ لیتے (ترمذی)۔",
    "fullSurah": true,
    "totalAyahs": 30,
    "ayahs": [
      {
        "numberInSurah": 1,
        "arabic": "الٓمٓ",
        "english": "Alif, Lam, Meem.",
        "urduJalandhari": "الٓمٓ",
        "urduKanzulIman": "الم"
      },
      {
        "numberInSurah": 2,
        "arabic": "تَنزِيلُ ٱلْكِتَٰبِ لَا رَيْبَ فِيهِ مِن رَّبِّ ٱلْعَٰلَمِينَ",
        "english": "[This is] the revelation of the Book about which there is no doubt from the Lord of the worlds.",
        "urduJalandhari": "اس میں کچھ شک نہیں کہ اس کتاب کا نازل کیا جانا تمام جہان کے پروردگار کی طرف سے ہے",
        "urduKanzulIman": "کتاب کا اتارنا بیشک پروردگار عالم کی طرف سے ہے،"
      },
      {
        "numberInSurah": 3,
        "arabic": "أَمْ يَقُولُونَ ٱفْتَرَىٰهُ ۚ بَلْ هُوَ ٱلْحَقُّ مِن رَّبِّكَ لِتُنذِرَ قَوْمًۭا مَّآ أَتَىٰهُم مِّن نَّذِيرٍۢ مِّن قَبْلِكَ لَعَلَّهُمْ يَهْتَدُونَ",
        "english": "Or do they say, \"He invented it\"? Rather, it is the truth from your Lord, [O Muhammad], that you may warn a people to whom no warner has come before you [so] perhaps they will be guided.",
        "urduJalandhari": "کیا یہ لوگ یہ کہتے ہیں کہ پیغمبر نے اس کو از خود بنا لیا ہے (نہیں) بلکہ وہ تمہارے پروردگار کی طرف سے برحق ہے تاکہ تم ان لوگوں کو ہدایت کرو جن کے پاس تم سے پہلے کوئی ہدایت کرنے والا نہیں آیا تاکہ یہ رستے پر چلیں",
        "urduKanzulIman": "کیا کہتے ہیں ان کی بنائی ہوئی ہے بلکہ وہی حق ہے تمہارے رب کی طرف سے کہ تم ڈراؤ ایسے لوگوں کو جن کے پاس تم سے پہلے کوئی ڈر سنانے والا نہ آیا اس امید پر کہ وہ راہ پائیں،"
      },
      {
        "numberInSurah": 4,
        "arabic": "ٱللَّهُ ٱلَّذِى خَلَقَ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ وَمَا بَيْنَهُمَا فِى سِتَّةِ أَيَّامٍۢ ثُمَّ ٱسْتَوَىٰ عَلَى ٱلْعَرْشِ ۖ مَا لَكُم مِّن دُونِهِۦ مِن وَلِىٍّۢ وَلَا شَفِيعٍ ۚ أَفَلَا تَتَذَكَّرُونَ",
        "english": "It is Allah who created the heavens and the earth and whatever is between them in six days; then He established Himself above the Throne. You have not besides Him any protector or any intercessor; so will you not be reminded?",
        "urduJalandhari": "خدا ہی تو ہے جس نے آسمانوں اور زمین کو اور جو چیزیں ان دونوں میں ہیں سب کو چھ دن میں پیدا کیا پھر عرش پر جا ٹھہرا۔ اس کے سوا نہ تمہارا کوئی دوست ہے اور نہ سفارش کرنے والا۔ کیا تم نصیحت نہیں پکڑتے؟",
        "urduKanzulIman": "اللہ ہے جس نے آسمان اور زمین اور جو کچھ ان کے بیچ میں ہے چھ دن میں بنائے پھر عرش پر استوا فرمایا اس سے چھوٹ کر (لا تعلق ہوکر) تمہارا کوئی حمایتی اور نہ سفارشی تو کیا تم دھیان نہیں کرتے،"
      },
      {
        "numberInSurah": 5,
        "arabic": "يُدَبِّرُ ٱلْأَمْرَ مِنَ ٱلسَّمَآءِ إِلَى ٱلْأَرْضِ ثُمَّ يَعْرُجُ إِلَيْهِ فِى يَوْمٍۢ كَانَ مِقْدَارُهُۥٓ أَلْفَ سَنَةٍۢ مِّمَّا تَعُدُّونَ",
        "english": "He arranges [each] matter from the heaven to the earth; then it will ascend to Him in a Day, the extent of which is a thousand years of those which you count.",
        "urduJalandhari": "وہی آسمان سے زمین تک (کے) ہر کام کا انتظام کرتا ہے۔ پھر وہ ایک روز جس کی مقدار تمہارے شمار کے مطابق ہزار برس ہوگی۔ اس کی طرف صعود (اور رجوع) کرے گا",
        "urduKanzulIman": "کام کی تدبیر فرماتا ہے آسمان سے زمین تک پھر اسی کی طرف رجوع کرے گا اس دن کہ جس کی مقدار ہزار برس ہے تمہاری گنتی میں"
      },
      {
        "numberInSurah": 6,
        "arabic": "ذَٰلِكَ عَٰلِمُ ٱلْغَيْبِ وَٱلشَّهَٰدَةِ ٱلْعَزِيزُ ٱلرَّحِيمُ",
        "english": "That is the Knower of the unseen and the witnessed, the Exalted in Might, the Merciful,",
        "urduJalandhari": "یہی تو پوشیدہ اور ظاہر کا جاننے والا (اور) غالب اور رحم والا (خدا) ہے",
        "urduKanzulIman": "یہ ہے ہر نہاں اور عیاں کا جاننے والا عزت و رحمت والا،"
      },
      {
        "numberInSurah": 7,
        "arabic": "ٱلَّذِىٓ أَحْسَنَ كُلَّ شَىْءٍ خَلَقَهُۥ ۖ وَبَدَأَ خَلْقَ ٱلْإِنسَٰنِ مِن طِينٍۢ",
        "english": "Who perfected everything which He created and began the creation of man from clay.",
        "urduJalandhari": "جس نے ہر چیز کو بہت اچھی طرح بنایا (یعنی) اس کو پیدا کیا۔ اور انسان کی پیدائش کو مٹی سے شروع کیا",
        "urduKanzulIman": "وہ جس نے جو چیز بتائی خوب بنائی اور پیدائش انسان کی ابتدا مٹی سے فرمائی"
      },
      {
        "numberInSurah": 8,
        "arabic": "ثُمَّ جَعَلَ نَسْلَهُۥ مِن سُلَٰلَةٍۢ مِّن مَّآءٍۢ مَّهِينٍۢ",
        "english": "Then He made his posterity out of the extract of a liquid disdained.",
        "urduJalandhari": "پھر اس کی نسل خلاصے سے (یعنی) حقیر پانی سے پیدا کی",
        "urduKanzulIman": "پھر اس کی نسل رکھی ایک بے قدر پانی کے خلاصہ سے"
      },
      {
        "numberInSurah": 9,
        "arabic": "ثُمَّ سَوَّىٰهُ وَنَفَخَ فِيهِ مِن رُّوحِهِۦ ۖ وَجَعَلَ لَكُمُ ٱلسَّمْعَ وَٱلْأَبْصَٰرَ وَٱلْأَفْـِٔدَةَ ۚ قَلِيلًۭا مَّا تَشْكُرُونَ",
        "english": "Then He proportioned him and breathed into him from His [created] soul and made for you hearing and vision and hearts; little are you grateful.",
        "urduJalandhari": "پھر اُس کو درست کیا پھر اس میں اپنی (طرف سے) روح پھونکی اور تمہارے کان اور آنکھیں اور دل بنائے مگر تم بہت کم شکر کرتے ہو",
        "urduKanzulIman": "پھر اسے ٹھیک کیا اور اس میں اپنی طرف کی روح پھونکی اور تمہیں کان اور آنکھیں اور دل عطا فرمائے کیا ہی تھوڑا حق مانتے ہو،"
      },
      {
        "numberInSurah": 10,
        "arabic": "وَقَالُوٓا۟ أَءِذَا ضَلَلْنَا فِى ٱلْأَرْضِ أَءِنَّا لَفِى خَلْقٍۢ جَدِيدٍۭ ۚ بَلْ هُم بِلِقَآءِ رَبِّهِمْ كَٰفِرُونَ",
        "english": "And they say, \"When we are lost within the earth, will we indeed be [recreated] in a new creation?\" Rather, they are, in [the matter of] the meeting with their Lord, disbelievers.",
        "urduJalandhari": "اور کہنے لگے کہ جب ہم زمین میں ملیامیٹ ہوجائیں گے تو کیا ازسرنو پیدا ہوں گے۔ حقیقت یہ ہے کہ یہ لوگ اپنے پروردگار کے سامنے جانے ہی کے قائل نہیں",
        "urduKanzulIman": "اور بولے کیا جب ہم مٹی میں مل جائیں گے کیا پھر نئے بنیں گے، بلکہ وہ اپنے رب کے حضور حاضری سے منکر ہیں"
      },
      {
        "numberInSurah": 11,
        "arabic": "۞ قُلْ يَتَوَفَّىٰكُم مَّلَكُ ٱلْمَوْتِ ٱلَّذِى وُكِّلَ بِكُمْ ثُمَّ إِلَىٰ رَبِّكُمْ تُرْجَعُونَ",
        "english": "Say, \"The angel of death will take you who has been entrusted with you. Then to your Lord you will be returned.\"",
        "urduJalandhari": "کہہ دو کہ موت کا فرشتہ جو تم پر مقرر کیا گیا ہے تمہاری روحیں قبض کر لیتا ہے پھر تم اپنے پروردگار کی طرف لوٹائے جاؤ گے",
        "urduKanzulIman": "تم فرماؤ تمہیں وفات دیتا ہے موت کا فرشتہ جو تم پر مقرر ہے پھر اپنے رب کی طرف واپس جاؤ گے"
      },
      {
        "numberInSurah": 12,
        "arabic": "وَلَوْ تَرَىٰٓ إِذِ ٱلْمُجْرِمُونَ نَاكِسُوا۟ رُءُوسِهِمْ عِندَ رَبِّهِمْ رَبَّنَآ أَبْصَرْنَا وَسَمِعْنَا فَٱرْجِعْنَا نَعْمَلْ صَٰلِحًا إِنَّا مُوقِنُونَ",
        "english": "If you could but see when the criminals are hanging their heads before their Lord, [saying], \"Our Lord, we have seen and heard, so return us [to the world]; we will work righteousness. Indeed, we are [now] certain.\"",
        "urduJalandhari": "اور تم (تعجب کرو) جب دیکھو کہ گنہگار اپنے پروردگار کے سامنے سرجھکائے ہوں گے (اور کہیں گے کہ) اے ہمارے پروردگار ہم نے دیکھ لیا اور سن لیا تو ہم کو (دنیا میں) واپس بھیج دے کہ نیک عمل کریں بیشک ہم یقین کرنے والے ہیں",
        "urduKanzulIman": "اور کہیں تم دیکھو جب مجرم اپنے رب کے پاس سر نیچے ڈالے ہوں گے اے ہمارے رب اب ہم نے دیکھا اور سنا ہمیں پھر بھیج کہ نیک کام کریں ہم کو یقین آگیا"
      },
      {
        "numberInSurah": 13,
        "arabic": "وَلَوْ شِئْنَا لَءَاتَيْنَا كُلَّ نَفْسٍ هُدَىٰهَا وَلَٰكِنْ حَقَّ ٱلْقَوْلُ مِنِّى لَأَمْلَأَنَّ جَهَنَّمَ مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ أَجْمَعِينَ",
        "english": "And if We had willed, We could have given every soul its guidance, but the word from Me will come into effect [that] \"I will surely fill Hell with jinn and people all together.",
        "urduJalandhari": "اور اگر ہم چاہتے تو ہر شخص کو ہدایت دے دیتے۔ لیکن میری طرف سے یہ بات قرار پاچکی ہے کہ میں دوزخ کو جنوں اور انسانوں سب سے بھردوں گا",
        "urduKanzulIman": "اور اگر ہم چاہتے ہر جان کو اس کی ہدایت فرماتے مگر میری بات قرار پاچکی کہ ضرور جہنم کو بھردوں گا ان جِنوں اور آدمیوں سب سے"
      },
      {
        "numberInSurah": 14,
        "arabic": "فَذُوقُوا۟ بِمَا نَسِيتُمْ لِقَآءَ يَوْمِكُمْ هَٰذَآ إِنَّا نَسِينَٰكُمْ ۖ وَذُوقُوا۟ عَذَابَ ٱلْخُلْدِ بِمَا كُنتُمْ تَعْمَلُونَ",
        "english": "So taste [punishment] because you forgot the meeting of this, your Day; indeed, We have [accordingly] forgotten you. And taste the punishment of eternity for what you used to do.\"",
        "urduJalandhari": "سو (اب آگ کے) مزے چکھو اس لئے کہ تم نے اُس دن کے آنے کو بھلا رکھا تھا (آج) ہم بھی تمہیں بھلا دیں گے اور جو کام تم کرتے تھے اُن کی سزا میں ہمیشہ کے عذاب کے مزے چکھتے رہو",
        "urduKanzulIman": "اب چکھو بدلہ اس کا کہ تم اپنے اس دن کی حاضری بھولے تھے ہم نے تمہیں چھوڑ دیا اب ہمیشہ کا عذاب چکھو اپنے کیے کا بدلہ،"
      },
      {
        "numberInSurah": 15,
        "arabic": "إِنَّمَا يُؤْمِنُ بِـَٔايَٰتِنَا ٱلَّذِينَ إِذَا ذُكِّرُوا۟ بِهَا خَرُّوا۟ سُجَّدًۭا وَسَبَّحُوا۟ بِحَمْدِ رَبِّهِمْ وَهُمْ لَا يَسْتَكْبِرُونَ ۩",
        "english": "Only those believe in Our verses who, when they are reminded by them, fall down in prostration and exalt [Allah] with praise of their Lord, and they are not arrogant.",
        "urduJalandhari": "ہماری آیتوں پر تو وہی لوگ ایمان لاتے ہیں کہ جب اُن کو اُن سے نصیحت کی جاتی ہے تو سجدے میں گرپڑتے اور اپنے پروردگار کی تعریف کے ساتھ تسبیح کرتے ہیں اور غرور نہیں کرتے",
        "urduKanzulIman": "ہماری آیتوں پر وہی ایمان لاتے ہیں کہ جب وہ انہیں یاد دلائی جاتی ہیں سجدہ میں گر جاتے ہیں اور اپنے رب کی تعریف کرتے ہوئے اس کی پاکی بولتے ہیں اور تکبر نہیں کرتے، السجدة۔۹"
      },
      {
        "numberInSurah": 16,
        "arabic": "تَتَجَافَىٰ جُنُوبُهُمْ عَنِ ٱلْمَضَاجِعِ يَدْعُونَ رَبَّهُمْ خَوْفًۭا وَطَمَعًۭا وَمِمَّا رَزَقْنَٰهُمْ يُنفِقُونَ",
        "english": "They arise from [their] beds; they supplicate their Lord in fear and aspiration, and from what We have provided them, they spend.",
        "urduJalandhari": "اُن کے پہلو بچھونوں سے الگ رہتے ہیں (اور) وہ اپنے پروردگار کو خوف اور اُمید سے پکارتے اور جو (مال) ہم نے اُن کو دیا ہے اس میں سے خرچ کرتے ہیں",
        "urduKanzulIman": "ان کی کروٹیں جدا ہوتی ہیں خوابگاہوں ہسے اور اپنے رب کو پکارتے ہیں ڈرتے اور امید کرتے اور ہمارے دیے ہوئے سے کچھ خیرات کرتے ہیں،"
      },
      {
        "numberInSurah": 17,
        "arabic": "فَلَا تَعْلَمُ نَفْسٌۭ مَّآ أُخْفِىَ لَهُم مِّن قُرَّةِ أَعْيُنٍۢ جَزَآءًۢ بِمَا كَانُوا۟ يَعْمَلُونَ",
        "english": "And no soul knows what has been hidden for them of comfort for eyes as reward for what they used to do.",
        "urduJalandhari": "کوئی متنفس نہیں جانتا کہ اُن کے لئے کیسی آنکھوں کی ٹھنڈک چھپا کر رکھی گئی ہے۔ یہ ان اعمال کا صلہ ہے جو وہ کرتے تھے",
        "urduKanzulIman": "تو کسی جی کو نہیں معلوم جو آنکھ کی ٹھنڈک ان کے لیے چھپا رکھی ہے صلہ ان کے کاموں کا"
      },
      {
        "numberInSurah": 18,
        "arabic": "أَفَمَن كَانَ مُؤْمِنًۭا كَمَن كَانَ فَاسِقًۭا ۚ لَّا يَسْتَوُۥنَ",
        "english": "Then is one who was a believer like one who was defiantly disobedient? They are not equal.",
        "urduJalandhari": "بھلا جو مومن ہو وہ اس شخص کی طرح ہوسکتا ہے جو نافرمان ہو؟ دونوں برابر نہیں ہو سکتے",
        "urduKanzulIman": "تو کیا جو ایمان والا ہے وہ اس جیسا ہوجائے گا جو بے حکم ہے یہ برابر نہیں،"
      },
      {
        "numberInSurah": 19,
        "arabic": "أَمَّا ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّٰلِحَٰتِ فَلَهُمْ جَنَّٰتُ ٱلْمَأْوَىٰ نُزُلًۢا بِمَا كَانُوا۟ يَعْمَلُونَ",
        "english": "As for those who believed and did righteous deeds, for them will be the Gardens of Refuge as accommodation for what they used to do.",
        "urduJalandhari": "جو لوگ ایمان لائے اور نیک عمل کرتے رہے اُن کے (رہنے کے) لئے باغ ہیں یہ مہمانی اُن کاموں کی جزا ہے جو وہ کرتے تھے",
        "urduKanzulIman": "جو ایمان لائے اور اچھے کام کیے ان کے لیے بسنے کے باغ ہیں، ان کے کاموں کے صلہ میں مہمانداری"
      },
      {
        "numberInSurah": 20,
        "arabic": "وَأَمَّا ٱلَّذِينَ فَسَقُوا۟ فَمَأْوَىٰهُمُ ٱلنَّارُ ۖ كُلَّمَآ أَرَادُوٓا۟ أَن يَخْرُجُوا۟ مِنْهَآ أُعِيدُوا۟ فِيهَا وَقِيلَ لَهُمْ ذُوقُوا۟ عَذَابَ ٱلنَّارِ ٱلَّذِى كُنتُم بِهِۦ تُكَذِّبُونَ",
        "english": "But as for those who defiantly disobeyed, their refuge is the Fire. Every time they wish to emerge from it, they will be returned to it while it is said to them, \"Taste the punishment of the Fire which you used to deny.\"",
        "urduJalandhari": "اور جنہوں نے نافرمانی کی اُن کے رہنے کے لئے دوزخ ہے جب چاہیں گے کہ اس میں سے نکل جائیں تو اس میں لوٹا دیئے جائیں گے۔ اور اُن سے کہا جائے گا کہ جس دوزخ کے عذاب کو تم جھوٹ سمجھتے تھے اس کے مزے چکھو",
        "urduKanzulIman": "رہے وہ جو بے حکم ہیں ان کا ٹھکانا آ گ ہے، جب کبھی اس میں سے نکلنا چاہیں گے پھر اسی میں پھیر دیے جائیں گے اور ان سے کہا جائے گا چکھو اس آگ کا عذاب جسے تم جھٹلاتے تھے،"
      },
      {
        "numberInSurah": 21,
        "arabic": "وَلَنُذِيقَنَّهُم مِّنَ ٱلْعَذَابِ ٱلْأَدْنَىٰ دُونَ ٱلْعَذَابِ ٱلْأَكْبَرِ لَعَلَّهُمْ يَرْجِعُونَ",
        "english": "And we will surely let them taste the nearer punishment short of the greater punishment that perhaps they will repent.",
        "urduJalandhari": "اور ہم اُن کو (قیامت کے) بڑے عذاب کے سوا عذاب دنیا کا بھی مزہ چکھائیں گے۔ شاید (ہماری طرف) لوٹ آئیں",
        "urduKanzulIman": "اور ضرور ہم انہیں چکھائیں گے کچھ نزدیک کا عذاب اس بڑے عذاب سے پہلے جسے دیکھنے والا امید کرے کہ ابھی باز آئیں گے،"
      },
      {
        "numberInSurah": 22,
        "arabic": "وَمَنْ أَظْلَمُ مِمَّن ذُكِّرَ بِـَٔايَٰتِ رَبِّهِۦ ثُمَّ أَعْرَضَ عَنْهَآ ۚ إِنَّا مِنَ ٱلْمُجْرِمِينَ مُنتَقِمُونَ",
        "english": "And who is more unjust than one who is reminded of the verses of his Lord; then he turns away from them? Indeed We, from the criminals, will take retribution.",
        "urduJalandhari": "اور اس شخص سے بڑھ کر ظالم کون جس کو اس کے پروردگار کی آیتوں سے نصیحت کی جائے تو وہ اُن سے منہ پھیر لے۔ ہم گنہگاروں سے ضرور بدلہ لینے والے ہیں",
        "urduKanzulIman": "اور اس سے بڑھ کر ظالم کون جسے اس کے رب کی آیتوں سے نصیحت کی گئی پھر اس نے ان سے منہ پھیر لیا بیشک ہم مجرموں سے بدلہ لینے والے ہیں،"
      },
      {
        "numberInSurah": 23,
        "arabic": "وَلَقَدْ ءَاتَيْنَا مُوسَى ٱلْكِتَٰبَ فَلَا تَكُن فِى مِرْيَةٍۢ مِّن لِّقَآئِهِۦ ۖ وَجَعَلْنَٰهُ هُدًۭى لِّبَنِىٓ إِسْرَٰٓءِيلَ",
        "english": "And We certainly gave Moses the Scripture, so do not be in doubt over his meeting. And we made the Torah guidance for the Children of Israel.",
        "urduJalandhari": "اور ہم نے موسٰی کو کتاب دی تو تم اُن کے ملنے سے شک میں نہ ہونا اور ہم نے اس (کتاب) کو (یا موسٰی کو) بنی اسرائیل کے لئے (ذریعہ) ہدایت بنایا",
        "urduKanzulIman": "اور بیشک ہم نے موسیٰ کو کتاب عطا فرمائی تو تم اس کے ملنے میں شک نہ کرو اور ہم نے اسے بنی اسرائیل کے لیے ہدایت کیا،"
      },
      {
        "numberInSurah": 24,
        "arabic": "وَجَعَلْنَا مِنْهُمْ أَئِمَّةًۭ يَهْدُونَ بِأَمْرِنَا لَمَّا صَبَرُوا۟ ۖ وَكَانُوا۟ بِـَٔايَٰتِنَا يُوقِنُونَ",
        "english": "And We made from among them leaders guiding by Our command when they were patient and [when] they were certain of Our signs.",
        "urduJalandhari": "اور ان میں سے ہم نے پیشوا بنائے تھے جو ہمارے حکم سے ہدایت کیا کرتے تھے۔ جب وہ صبر کرتے تھے اور وہ ہماری آیتوں پر یقین رکھتے تھے",
        "urduKanzulIman": "اور ہم نے ان میں سے کچھ امام بنائے کہ ہمارے حکم سے بناتے جبکہ انہوں نے صبر کیا اور وہ ہماری آیتوں پر یقین لاتے تھے،"
      },
      {
        "numberInSurah": 25,
        "arabic": "إِنَّ رَبَّكَ هُوَ يَفْصِلُ بَيْنَهُمْ يَوْمَ ٱلْقِيَٰمَةِ فِيمَا كَانُوا۟ فِيهِ يَخْتَلِفُونَ",
        "english": "Indeed, your Lord will judge between them on the Day of Resurrection concerning that over which they used to differ.",
        "urduJalandhari": "بلاشبہ تمہارا پروردگار ان میں جن باتوں میں وہ اختلاف کرتے تھے۔ قیامت کے روز فیصلہ کر دے گا",
        "urduKanzulIman": "بیشک تمہارا رب ان میں فیصلہ کردے گا قیامت کے دن جس بات میں اختلاف کرتے تھے"
      },
      {
        "numberInSurah": 26,
        "arabic": "أَوَلَمْ يَهْدِ لَهُمْ كَمْ أَهْلَكْنَا مِن قَبْلِهِم مِّنَ ٱلْقُرُونِ يَمْشُونَ فِى مَسَٰكِنِهِمْ ۚ إِنَّ فِى ذَٰلِكَ لَءَايَٰتٍ ۖ أَفَلَا يَسْمَعُونَ",
        "english": "Has it not become clear to them how many generations We destroyed before them, [as] they walk among their dwellings? Indeed in that are signs; then do they not hear?",
        "urduJalandhari": "کیا اُن کو اس (امر) سے ہدایت نہ ہوئی کہ ہم نے اُن سے پہلے بہت سی اُمتوں کو جن کے مقامات سکونت میں یہ چلتے پھرتے ہیں ہلاک کر دیا۔ بیشک اس میں نشانیاں ہیں۔ تو یہ سنتے کیوں نہیں",
        "urduKanzulIman": "اور کیا انہیں اس پر ہدایت نہ ہوئی کہ ہم نے ان سے پہلے کتنی سنگتیں (قومیں) ہلاک کردیں کہ آج یہ ان کے گھروں میں چل پھر رہے ہیں بیشک اس میں ضرور نشانیاں ہیں تو کیا سنتے نہیں"
      },
      {
        "numberInSurah": 27,
        "arabic": "أَوَلَمْ يَرَوْا۟ أَنَّا نَسُوقُ ٱلْمَآءَ إِلَى ٱلْأَرْضِ ٱلْجُرُزِ فَنُخْرِجُ بِهِۦ زَرْعًۭا تَأْكُلُ مِنْهُ أَنْعَٰمُهُمْ وَأَنفُسُهُمْ ۖ أَفَلَا يُبْصِرُونَ",
        "english": "Have they not seen that We drive the water [in clouds] to barren land and bring forth thereby crops from which their livestock eat and [they] themselves? Then do they not see?",
        "urduJalandhari": "کیا اُنہوں نے نہیں دیکھا کہ ہم بنجر زمین کی طرف پانی رواں کرتے ہیں پھر اس سے کھیتی پیدا کرتے ہیں جس میں سے ان کے چوپائے بھی کھاتے ہیں اور وہ خود بھی (کھاتے ہیں) تو یہ دیکھتے کیوں نہیں۔",
        "urduKanzulIman": "اور کیا نہیں دیکھتے کہ ہم پانی بھیجتے ہیں خشک زمین کی طرف پھر اس سے کھیتی نکالتے ہیں کہ اس میں سے ان کے چوپائے اور وہ خود کھاتے ہیں تو کیا انہیں سوجھتانہیں"
      },
      {
        "numberInSurah": 28,
        "arabic": "وَيَقُولُونَ مَتَىٰ هَٰذَا ٱلْفَتْحُ إِن كُنتُمْ صَٰدِقِينَ",
        "english": "And they say, \"When will be this conquest, if you should be truthful?\"",
        "urduJalandhari": "اور کہتے ہیں اگر تم سچے ہو تو یہ فیصلہ کب ہوگا؟",
        "urduKanzulIman": "اور کہتے ہیں یہ فیصلہ کب ہوگا اگر تم سچے ہو"
      },
      {
        "numberInSurah": 29,
        "arabic": "قُلْ يَوْمَ ٱلْفَتْحِ لَا يَنفَعُ ٱلَّذِينَ كَفَرُوٓا۟ إِيمَٰنُهُمْ وَلَا هُمْ يُنظَرُونَ",
        "english": "Say, [O Muhammad], \"On the Day of Conquest the belief of those who had disbelieved will not benefit them, nor will they be reprieved.\"",
        "urduJalandhari": "کہہ دو کہ فیصلے کے دن کافروں کو ان کا ایمان لانا کچھ بھی فائدہ نہ دے گا اور نہ اُن کو مہلت دی جائے گی",
        "urduKanzulIman": "تم فرماؤ فیصلہ کے دن کافروں کو ان کا ایمان لانا نفع نہ دے گا اور نہ انہیں مہلت ملے"
      },
      {
        "numberInSurah": 30,
        "arabic": "فَأَعْرِضْ عَنْهُمْ وَٱنتَظِرْ إِنَّهُم مُّنتَظِرُونَ",
        "english": "So turn away from them and wait. Indeed, they are waiting.",
        "urduJalandhari": "تو اُن سے منہ پھیر لو اور انتظار کرو یہ بھی انتظار کر رہے ہیں",
        "urduKanzulIman": "تو ان سے منہ پھیرلو اور انتظار کرو بیشک انہیں بھی انتظار کرنا ہے"
      }
    ]
  },
  {
    "id": "al_waqiah",
    "surahNumber": 56,
    "nameEn": "Surah Al-Waqi'ah",
    "nameUr": "سورۃ الواقعہ",
    "titleEn": "The Inevitable",
    "titleUr": "واقع ہونے والی",
    "virtueEn": "Recited every night for barakah and protection against poverty and distress (Ibn Sunni).",
    "virtueUr": "ہر رات تلاوت: فقر و تنگی سے حفاظت اور رزق میں برکت کا مسنون ذریعہ (ابن السنی)۔",
    "fullSurah": true,
    "totalAyahs": 96,
    "ayahs": [
      {
        "numberInSurah": 1,
        "arabic": "إِذَا وَقَعَتِ ٱلْوَاقِعَةُ",
        "english": "When the Occurrence occurs,",
        "urduJalandhari": "جب واقع ہونے والی واقع ہوجائے",
        "urduKanzulIman": "جب ہولے گی وہ ہونے والی"
      },
      {
        "numberInSurah": 2,
        "arabic": "لَيْسَ لِوَقْعَتِهَا كَاذِبَةٌ",
        "english": "There is, at its occurrence, no denial.",
        "urduJalandhari": "اس کے واقع ہونے میں کچھ جھوٹ نہیں",
        "urduKanzulIman": "اس وقت اس کے ہونے میں کسی کو انکار کی گنجائش نہ ہوگی،"
      },
      {
        "numberInSurah": 3,
        "arabic": "خَافِضَةٌۭ رَّافِعَةٌ",
        "english": "It will bring down [some] and raise up [others].",
        "urduJalandhari": "کسی کو پست کرے کسی کو بلند",
        "urduKanzulIman": "کسی کو پست کرنے والی کسی کو بلندی دینے والی"
      },
      {
        "numberInSurah": 4,
        "arabic": "إِذَا رُجَّتِ ٱلْأَرْضُ رَجًّۭا",
        "english": "When the earth is shaken with convulsion",
        "urduJalandhari": "جب زمین بھونچال سے لرزنے لگے",
        "urduKanzulIman": "جب زمین کانپے گی تھرتھرا کر"
      },
      {
        "numberInSurah": 5,
        "arabic": "وَبُسَّتِ ٱلْجِبَالُ بَسًّۭا",
        "english": "And the mountains are broken down, crumbling",
        "urduJalandhari": "اور پہاڑ ٹوٹ کر ریزہ ریزہ ہوجائیں",
        "urduKanzulIman": "اور پہاڑ ریزہ ریزہ ہوجائیں گے چُورا ہوکر"
      },
      {
        "numberInSurah": 6,
        "arabic": "فَكَانَتْ هَبَآءًۭ مُّنۢبَثًّۭا",
        "english": "And become dust dispersing.",
        "urduJalandhari": "پھر غبار ہو کر اُڑنے لگیں",
        "urduKanzulIman": "تو ہوجائیں گے جیسے روزن کی دھوپ میں غبار کے باریک ذرے پھیلے ہوئے"
      },
      {
        "numberInSurah": 7,
        "arabic": "وَكُنتُمْ أَزْوَٰجًۭا ثَلَٰثَةًۭ",
        "english": "And you become [of] three kinds:",
        "urduJalandhari": "اور تم لوگ تین قسم ہوجاؤ",
        "urduKanzulIman": "اور تین قسم کے ہوجاؤ گے،"
      },
      {
        "numberInSurah": 8,
        "arabic": "فَأَصْحَٰبُ ٱلْمَيْمَنَةِ مَآ أَصْحَٰبُ ٱلْمَيْمَنَةِ",
        "english": "Then the companions of the right - what are the companions of the right?",
        "urduJalandhari": "تو داہنے ہاتھ والے (سبحان الله) داہنے ہاتھ والے کیا (ہی چین میں) ہیں",
        "urduKanzulIman": "تو دہنی طرف والے کیسے دہنی طرف والے"
      },
      {
        "numberInSurah": 9,
        "arabic": "وَأَصْحَٰبُ ٱلْمَشْـَٔمَةِ مَآ أَصْحَٰبُ ٱلْمَشْـَٔمَةِ",
        "english": "And the companions of the left - what are the companions of the left?",
        "urduJalandhari": "اور بائیں ہاتھ والے (افسوس) بائیں ہاتھ والے کیا (گرفتار عذاب) ہیں",
        "urduKanzulIman": "اور بائیں طرف والے کیسے بائیں طرف والے"
      },
      {
        "numberInSurah": 10,
        "arabic": "وَٱلسَّٰبِقُونَ ٱلسَّٰبِقُونَ",
        "english": "And the forerunners, the forerunners -",
        "urduJalandhari": "اور جو آگے بڑھنے والے ہیں (ان کا کیا کہنا) وہ آگے ہی بڑھنے والے ہیں",
        "urduKanzulIman": "اور جو سبقت لے گئے وہ تو سبقت ہی لے گئے"
      },
      {
        "numberInSurah": 11,
        "arabic": "أُو۟لَٰٓئِكَ ٱلْمُقَرَّبُونَ",
        "english": "Those are the ones brought near [to Allah]",
        "urduJalandhari": "وہی (خدا کے) مقرب ہیں",
        "urduKanzulIman": "وہی مقربِ بارگاہ ہیں،"
      },
      {
        "numberInSurah": 12,
        "arabic": "فِى جَنَّٰتِ ٱلنَّعِيمِ",
        "english": "In the Gardens of Pleasure,",
        "urduJalandhari": "نعمت کے بہشتوں میں",
        "urduKanzulIman": "چین کے باغوں میں،"
      },
      {
        "numberInSurah": 13,
        "arabic": "ثُلَّةٌۭ مِّنَ ٱلْأَوَّلِينَ",
        "english": "A [large] company of the former peoples",
        "urduJalandhari": "وہ بہت سے تو اگلے لوگوں میں سے ہوں گے",
        "urduKanzulIman": "اگلوں میں سے ایک گروہ"
      },
      {
        "numberInSurah": 14,
        "arabic": "وَقَلِيلٌۭ مِّنَ ٱلْءَاخِرِينَ",
        "english": "And a few of the later peoples,",
        "urduJalandhari": "اور تھوڑے سے پچھلوں میں سے",
        "urduKanzulIman": "اور پچھلوں میں سے تھوڑے"
      },
      {
        "numberInSurah": 15,
        "arabic": "عَلَىٰ سُرُرٍۢ مَّوْضُونَةٍۢ",
        "english": "On thrones woven [with ornament],",
        "urduJalandhari": "(لعل و یاقوت وغیرہ سے) جڑے ہوئے تختوں پر",
        "urduKanzulIman": "جڑاؤ تختوں پر ہوں گے"
      },
      {
        "numberInSurah": 16,
        "arabic": "مُّتَّكِـِٔينَ عَلَيْهَا مُتَقَٰبِلِينَ",
        "english": "Reclining on them, facing each other.",
        "urduJalandhari": "آمنے سامنے تکیہ لگائے ہوئے",
        "urduKanzulIman": "ان پر تکیہ لگائے ہوئے آمنے سامنے"
      },
      {
        "numberInSurah": 17,
        "arabic": "يَطُوفُ عَلَيْهِمْ وِلْدَٰنٌۭ مُّخَلَّدُونَ",
        "english": "There will circulate among them young boys made eternal",
        "urduJalandhari": "نوجوان خدمت گزار جو ہمیشہ (ایک ہی حالت میں) رہیں گے ان کے آس پاس پھریں گے",
        "urduKanzulIman": "ان کے گرد لیے پھریں گے ہمیشہ رہنے والے لڑکے"
      },
      {
        "numberInSurah": 18,
        "arabic": "بِأَكْوَابٍۢ وَأَبَارِيقَ وَكَأْسٍۢ مِّن مَّعِينٍۢ",
        "english": "With vessels, pitchers and a cup [of wine] from a flowing spring -",
        "urduJalandhari": "یعنی آبخورے اور آفتابے اور صاف شراب کے گلاس لے لے کر",
        "urduKanzulIman": "کوزے اور آفتابے اور جام اور آنکھوں کے سامنے بہتی شراب"
      },
      {
        "numberInSurah": 19,
        "arabic": "لَّا يُصَدَّعُونَ عَنْهَا وَلَا يُنزِفُونَ",
        "english": "No headache will they have therefrom, nor will they be intoxicated -",
        "urduJalandhari": "اس سے نہ تو سر میں درد ہوگا اور نہ ان کی عقلیں زائل ہوں گی",
        "urduKanzulIman": "کہ اس سے نہ انہیں درد سر ہو اور نہ ہوش میں فرق آئے"
      },
      {
        "numberInSurah": 20,
        "arabic": "وَفَٰكِهَةٍۢ مِّمَّا يَتَخَيَّرُونَ",
        "english": "And fruit of what they select",
        "urduJalandhari": "اور میوے جس طرح کے ان کو پسند ہوں",
        "urduKanzulIman": "اور میوے جو پسند کریں"
      },
      {
        "numberInSurah": 21,
        "arabic": "وَلَحْمِ طَيْرٍۢ مِّمَّا يَشْتَهُونَ",
        "english": "And the meat of fowl, from whatever they desire.",
        "urduJalandhari": "اور پرندوں کا گوشت جس قسم کا ان کا جی چاہے",
        "urduKanzulIman": "اور پرندوں کا گوشت جو چاہیں"
      },
      {
        "numberInSurah": 22,
        "arabic": "وَحُورٌ عِينٌۭ",
        "english": "And [for them are] fair women with large, [beautiful] eyes,",
        "urduJalandhari": "اور بڑی بڑی آنکھوں والی حوریں",
        "urduKanzulIman": "اور بڑی آنکھ والیاں حوریں"
      },
      {
        "numberInSurah": 23,
        "arabic": "كَأَمْثَٰلِ ٱللُّؤْلُؤِ ٱلْمَكْنُونِ",
        "english": "The likenesses of pearls well-protected,",
        "urduJalandhari": "جیسے (حفاظت سے) تہہ کئے ہوئے (آب دار) موتی",
        "urduKanzulIman": "جیسے چھپے رکھے ہوئے موتی"
      },
      {
        "numberInSurah": 24,
        "arabic": "جَزَآءًۢ بِمَا كَانُوا۟ يَعْمَلُونَ",
        "english": "As reward for what they used to do.",
        "urduJalandhari": "یہ ان اعمال کا بدلہ ہے جو وہ کرتے تھے",
        "urduKanzulIman": "صلہ ان کے اعمال کا"
      },
      {
        "numberInSurah": 25,
        "arabic": "لَا يَسْمَعُونَ فِيهَا لَغْوًۭا وَلَا تَأْثِيمًا",
        "english": "They will not hear therein ill speech or commission of sin -",
        "urduJalandhari": "وہاں نہ بیہودہ بات سنیں گے اور نہ گالی گلوچ",
        "urduKanzulIman": "اس میں نہ سنیں گے نہ کوئی بیکار با ت نہ گنہگاری"
      },
      {
        "numberInSurah": 26,
        "arabic": "إِلَّا قِيلًۭا سَلَٰمًۭا سَلَٰمًۭا",
        "english": "Only a saying: \"Peace, peace.\"",
        "urduJalandhari": "ہاں ان کا کلام سلام سلام (ہوگا)",
        "urduKanzulIman": "ہاں یہ کہنا ہوگا سلام سلام"
      },
      {
        "numberInSurah": 27,
        "arabic": "وَأَصْحَٰبُ ٱلْيَمِينِ مَآ أَصْحَٰبُ ٱلْيَمِينِ",
        "english": "The companions of the right - what are the companions of the right?",
        "urduJalandhari": "اور داہنے ہاتھ والے (سبحان الله) داہنے ہاتھ والے کیا (ہی عیش میں) ہیں",
        "urduKanzulIman": "اور دہنی طرف والے کیسے دہنی طرف والے"
      },
      {
        "numberInSurah": 28,
        "arabic": "فِى سِدْرٍۢ مَّخْضُودٍۢ",
        "english": "[They will be] among lote trees with thorns removed",
        "urduJalandhari": "(یعنی) بےخار کی بیریوں",
        "urduKanzulIman": "بے کانٹوں کی بیریوں میں"
      },
      {
        "numberInSurah": 29,
        "arabic": "وَطَلْحٍۢ مَّنضُودٍۢ",
        "english": "And [banana] trees layered [with fruit]",
        "urduJalandhari": "اور تہہ بہ تہہ کیلوں",
        "urduKanzulIman": "اور کیلے کے گچھوں میں"
      },
      {
        "numberInSurah": 30,
        "arabic": "وَظِلٍّۢ مَّمْدُودٍۢ",
        "english": "And shade extended",
        "urduJalandhari": "اور لمبے لمبے سایوں",
        "urduKanzulIman": "اور ہمیشہ کے سائے میں"
      },
      {
        "numberInSurah": 31,
        "arabic": "وَمَآءٍۢ مَّسْكُوبٍۢ",
        "english": "And water poured out",
        "urduJalandhari": "اور پانی کے جھرنوں",
        "urduKanzulIman": "اور ہمیشہ جاری پانی میں"
      },
      {
        "numberInSurah": 32,
        "arabic": "وَفَٰكِهَةٍۢ كَثِيرَةٍۢ",
        "english": "And fruit, abundant [and varied],",
        "urduJalandhari": "اور میوہ ہائے کثیرہ (کے باغوں) میں",
        "urduKanzulIman": "اور بہت سے میووں میں"
      },
      {
        "numberInSurah": 33,
        "arabic": "لَّا مَقْطُوعَةٍۢ وَلَا مَمْنُوعَةٍۢ",
        "english": "Neither limited [to season] nor forbidden,",
        "urduJalandhari": "جو نہ کبھی ختم ہوں اور نہ ان سے کوئی روکے",
        "urduKanzulIman": "جو نہ ختم ہوں اور نہ روکے جائیں"
      },
      {
        "numberInSurah": 34,
        "arabic": "وَفُرُشٍۢ مَّرْفُوعَةٍ",
        "english": "And [upon] beds raised high.",
        "urduJalandhari": "اور اونچے اونچے فرشوں میں",
        "urduKanzulIman": "اور بلند بچھونوں میں"
      },
      {
        "numberInSurah": 35,
        "arabic": "إِنَّآ أَنشَأْنَٰهُنَّ إِنشَآءًۭ",
        "english": "Indeed, We have produced the women of Paradise in a [new] creation",
        "urduJalandhari": "ہم نے ان (حوروں) کو پیدا کیا",
        "urduKanzulIman": "بیشک ہم نے ان عورتوں کو اچھی اٹھان اٹھایا،"
      },
      {
        "numberInSurah": 36,
        "arabic": "فَجَعَلْنَٰهُنَّ أَبْكَارًا",
        "english": "And made them virgins,",
        "urduJalandhari": "تو ان کو کنواریاں بنایا",
        "urduKanzulIman": "تو انہیں بنایا کنواریاں اپنے شوہر پر پیاریاں،"
      },
      {
        "numberInSurah": 37,
        "arabic": "عُرُبًا أَتْرَابًۭا",
        "english": "Devoted [to their husbands] and of equal age,",
        "urduJalandhari": "(اور شوہروں کی) پیاریاں اور ہم عمر",
        "urduKanzulIman": "انہیں پیار دلائیاں ایک عمر والیاں"
      },
      {
        "numberInSurah": 38,
        "arabic": "لِّأَصْحَٰبِ ٱلْيَمِينِ",
        "english": "For the companions of the right [who are]",
        "urduJalandhari": "یعنی داہنے ہاتھ والوں کے لئے",
        "urduKanzulIman": "دہنی طرف والوں کے لیے،"
      },
      {
        "numberInSurah": 39,
        "arabic": "ثُلَّةٌۭ مِّنَ ٱلْأَوَّلِينَ",
        "english": "A company of the former peoples",
        "urduJalandhari": "(یہ) بہت سے اگلے لوگوں میں سے ہیں",
        "urduKanzulIman": "اگلوں میں سے ایک گروہ،"
      },
      {
        "numberInSurah": 40,
        "arabic": "وَثُلَّةٌۭ مِّنَ ٱلْءَاخِرِينَ",
        "english": "And a company of the later peoples.",
        "urduJalandhari": "اور بہت سے پچھلوں میں سے",
        "urduKanzulIman": "اور پچھلوں میں سے ایک گروہ"
      },
      {
        "numberInSurah": 41,
        "arabic": "وَأَصْحَٰبُ ٱلشِّمَالِ مَآ أَصْحَٰبُ ٱلشِّمَالِ",
        "english": "And the companions of the left - what are the companions of the left?",
        "urduJalandhari": "اور بائیں ہاتھ والے (افسوس) بائیں ہاتھ والے کیا (ہی عذاب میں) ہیں",
        "urduKanzulIman": "اور بائیں طرف والے کیسے بائیں طرف والے"
      },
      {
        "numberInSurah": 42,
        "arabic": "فِى سَمُومٍۢ وَحَمِيمٍۢ",
        "english": "[They will be] in scorching fire and scalding water",
        "urduJalandhari": "(یعنی دوزخ کی) لپٹ اور کھولتے ہوئے پانی میں",
        "urduKanzulIman": "جلتی ہوا اور کھولتے پانی میں،"
      },
      {
        "numberInSurah": 43,
        "arabic": "وَظِلٍّۢ مِّن يَحْمُومٍۢ",
        "english": "And a shade of black smoke,",
        "urduJalandhari": "اور سیاہ دھوئیں کے سائے میں",
        "urduKanzulIman": "اور جلتے دھوئیں کی چھاؤں میں"
      },
      {
        "numberInSurah": 44,
        "arabic": "لَّا بَارِدٍۢ وَلَا كَرِيمٍ",
        "english": "Neither cool nor beneficial.",
        "urduJalandhari": "(جو) نہ ٹھنڈا (ہے) نہ خوشنما",
        "urduKanzulIman": "جو نہ ٹھنڈی نہ عزت کی،"
      },
      {
        "numberInSurah": 45,
        "arabic": "إِنَّهُمْ كَانُوا۟ قَبْلَ ذَٰلِكَ مُتْرَفِينَ",
        "english": "Indeed they were, before that, indulging in affluence,",
        "urduJalandhari": "یہ لوگ اس سے پہلے عیشِ نعیم میں پڑے ہوئے تھے",
        "urduKanzulIman": "بیشک وہ اس سے پہلے نعمتوں میں تھے"
      },
      {
        "numberInSurah": 46,
        "arabic": "وَكَانُوا۟ يُصِرُّونَ عَلَى ٱلْحِنثِ ٱلْعَظِيمِ",
        "english": "And they used to persist in the great violation,",
        "urduJalandhari": "اور گناہ عظیم پر اڑے ہوئے تھے",
        "urduKanzulIman": "اور اس بڑے گناہ کی ہٹ (ضد) رکھتے تھے،"
      },
      {
        "numberInSurah": 47,
        "arabic": "وَكَانُوا۟ يَقُولُونَ أَئِذَا مِتْنَا وَكُنَّا تُرَابًۭا وَعِظَٰمًا أَءِنَّا لَمَبْعُوثُونَ",
        "english": "And they used to say, \"When we die and become dust and bones, are we indeed to be resurrected?",
        "urduJalandhari": "اور کہا کرتے تھے کہ بھلا جب ہم مرگئے اور مٹی ہوگئے اور ہڈیاں (ہی ہڈیاں رہ گئے) تو کیا ہمیں پھر اُٹھنا ہوگا؟",
        "urduKanzulIman": "اور کہتے تھے کیا جب ہم مرجائیں اور ہڈیاں ہوجائیں تو کیا ضرور ہم اٹھائے جائیں گے،"
      },
      {
        "numberInSurah": 48,
        "arabic": "أَوَءَابَآؤُنَا ٱلْأَوَّلُونَ",
        "english": "And our forefathers [as well]?\"",
        "urduJalandhari": "اور کیا ہمارے باپ دادا کو بھی؟",
        "urduKanzulIman": "اور کیا ہمارے اگلے باپ دادا بھی،"
      },
      {
        "numberInSurah": 49,
        "arabic": "قُلْ إِنَّ ٱلْأَوَّلِينَ وَٱلْءَاخِرِينَ",
        "english": "Say, [O Muhammad], \"Indeed, the former and the later peoples",
        "urduJalandhari": "کہہ دو کہ بےشک پہلے اور پچھلے",
        "urduKanzulIman": "تم فرماؤ بیشک سب اگلے اور پچھلے"
      },
      {
        "numberInSurah": 50,
        "arabic": "لَمَجْمُوعُونَ إِلَىٰ مِيقَٰتِ يَوْمٍۢ مَّعْلُومٍۢ",
        "english": "Are to be gathered together for the appointment of a known Day.\"",
        "urduJalandhari": "(سب) ایک روز مقرر کے وقت پر جمع کئے جائیں گے",
        "urduKanzulIman": "ضرور اکٹھے کیے جائیں گے، ایک جانے ہوئے دن کی میعاد پر"
      },
      {
        "numberInSurah": 51,
        "arabic": "ثُمَّ إِنَّكُمْ أَيُّهَا ٱلضَّآلُّونَ ٱلْمُكَذِّبُونَ",
        "english": "Then indeed you, O those astray [who are] deniers,",
        "urduJalandhari": "پھر تم اے جھٹلانے والے گمرا ہو!",
        "urduKanzulIman": "پھر بیشک تم اے گمراہو جھٹلانے والو"
      },
      {
        "numberInSurah": 52,
        "arabic": "لَءَاكِلُونَ مِن شَجَرٍۢ مِّن زَقُّومٍۢ",
        "english": "Will be eating from trees of zaqqum",
        "urduJalandhari": "تھوہر کے درخت کھاؤ گے",
        "urduKanzulIman": "ضرور تھوہر کے پیڑ میں سے کھاؤ گے،"
      },
      {
        "numberInSurah": 53,
        "arabic": "فَمَالِـُٔونَ مِنْهَا ٱلْبُطُونَ",
        "english": "And filling with it your bellies",
        "urduJalandhari": "اور اسی سے پیٹ بھرو گے",
        "urduKanzulIman": "پھر اس سے پیٹ بھرو گے،"
      },
      {
        "numberInSurah": 54,
        "arabic": "فَشَٰرِبُونَ عَلَيْهِ مِنَ ٱلْحَمِيمِ",
        "english": "And drinking on top of it from scalding water",
        "urduJalandhari": "اور اس پر کھولتا ہوا پانی پیو گے",
        "urduKanzulIman": "پھر اس پر کھولتا پانی پیو گے،"
      },
      {
        "numberInSurah": 55,
        "arabic": "فَشَٰرِبُونَ شُرْبَ ٱلْهِيمِ",
        "english": "And will drink as the drinking of thirsty camels.",
        "urduJalandhari": "اور پیو گے بھی تو اس طرح جیسے پیاسے اونٹ پیتے ہیں",
        "urduKanzulIman": "پھر ایسا پیو گے جیسے سخت پیاسے اونٹ پئیں"
      },
      {
        "numberInSurah": 56,
        "arabic": "هَٰذَا نُزُلُهُمْ يَوْمَ ٱلدِّينِ",
        "english": "That is their accommodation on the Day of Recompense.",
        "urduJalandhari": "جزا کے دن یہ ان کی ضیافت ہوگی",
        "urduKanzulIman": "یہ ان کی مہمانی ہے انصاف کے دن،"
      },
      {
        "numberInSurah": 57,
        "arabic": "نَحْنُ خَلَقْنَٰكُمْ فَلَوْلَا تُصَدِّقُونَ",
        "english": "We have created you, so why do you not believe?",
        "urduJalandhari": "ہم نے تم کو (پہلی بار بھی تو) پیدا کیا ہے تو تم (دوبارہ اُٹھنے کو) کیوں سچ نہیں سمجھتے؟",
        "urduKanzulIman": "ہم نے تمہیں پیدا کیا تو تم کیوں نہیں سچ مانتے"
      },
      {
        "numberInSurah": 58,
        "arabic": "أَفَرَءَيْتُم مَّا تُمْنُونَ",
        "english": "Have you seen that which you emit?",
        "urduJalandhari": "دیکھو تو کہ جس (نطفے) کو تم (عورتوں کے رحم میں) ڈالتے ہو",
        "urduKanzulIman": "تو بھلا دیکھو تو وہ منی جو گراتے ہو"
      },
      {
        "numberInSurah": 59,
        "arabic": "ءَأَنتُمْ تَخْلُقُونَهُۥٓ أَمْ نَحْنُ ٱلْخَٰلِقُونَ",
        "english": "Is it you who creates it, or are We the Creator?",
        "urduJalandhari": "کیا تم اس (سے انسان) کو بناتے ہو یا ہم بناتے ہیں؟",
        "urduKanzulIman": "کیا تم اس کا آدمی بناتے ہو یا ہم بنانے والے ہیں"
      },
      {
        "numberInSurah": 60,
        "arabic": "نَحْنُ قَدَّرْنَا بَيْنَكُمُ ٱلْمَوْتَ وَمَا نَحْنُ بِمَسْبُوقِينَ",
        "english": "We have decreed death among you, and We are not to be outdone",
        "urduJalandhari": "ہم نے تم میں مرنا ٹھہرا دیا ہے اور ہم اس (بات) سے عاجز نہیں",
        "urduKanzulIman": "ہم نے تم میں مرنا ٹھہرایا اور ہم اس سے ہارے نہیں،"
      },
      {
        "numberInSurah": 61,
        "arabic": "عَلَىٰٓ أَن نُّبَدِّلَ أَمْثَٰلَكُمْ وَنُنشِئَكُمْ فِى مَا لَا تَعْلَمُونَ",
        "english": "In that We will change your likenesses and produce you in that [form] which you do not know.",
        "urduJalandhari": "کہ تمہاری طرح کے اور لوگ تمہاری جگہ لے آئیں اور تم کو ایسے جہان میں جس کو تم نہیں جانتے پیدا کر دیں",
        "urduKanzulIman": "کہ تم جیسے اور بدل دیں اور تمہاری صورتیں وہ کردیں جس کی تمہیں حبر نہیں"
      },
      {
        "numberInSurah": 62,
        "arabic": "وَلَقَدْ عَلِمْتُمُ ٱلنَّشْأَةَ ٱلْأُولَىٰ فَلَوْلَا تَذَكَّرُونَ",
        "english": "And you have already known the first creation, so will you not remember?",
        "urduJalandhari": "اور تم نے پہلی پیدائش تو جان ہی لی ہے۔ پھر تم سوچتے کیوں نہیں؟",
        "urduKanzulIman": "اور بیشک تم جان چکے ہو پہلی اٹھان پھر کیوں نہیں سوچتے"
      },
      {
        "numberInSurah": 63,
        "arabic": "أَفَرَءَيْتُم مَّا تَحْرُثُونَ",
        "english": "And have you seen that [seed] which you sow?",
        "urduJalandhari": "بھلا دیکھو تو کہ جو کچھ تم بوتے ہو",
        "urduKanzulIman": "تو بھلا بتاؤ تو جو بوتے ہو،"
      },
      {
        "numberInSurah": 64,
        "arabic": "ءَأَنتُمْ تَزْرَعُونَهُۥٓ أَمْ نَحْنُ ٱلزَّٰرِعُونَ",
        "english": "Is it you who makes it grow, or are We the grower?",
        "urduJalandhari": "تو کیا تم اسے اُگاتے ہو یا ہم اُگاتے ہیں؟",
        "urduKanzulIman": "کیا تم اس کی کھیتی بناتے ہو یا ہم بنانے والے ہیں"
      },
      {
        "numberInSurah": 65,
        "arabic": "لَوْ نَشَآءُ لَجَعَلْنَٰهُ حُطَٰمًۭا فَظَلْتُمْ تَفَكَّهُونَ",
        "english": "If We willed, We could make it [dry] debris, and you would remain in wonder,",
        "urduJalandhari": "اگر ہم چاہیں تو اسے چورا چورا کردیں اور تم باتیں بناتے رہ جاؤ",
        "urduKanzulIman": "ہم چاہیں تو اسے روندن (پامال) کردیں پھر تم باتیں بناتے رہ جاؤ"
      },
      {
        "numberInSurah": 66,
        "arabic": "إِنَّا لَمُغْرَمُونَ",
        "english": "[Saying], \"Indeed, we are [now] in debt;",
        "urduJalandhari": "(کہ ہائے) ہم تو مفت تاوان میں پھنس گئے",
        "urduKanzulIman": "کہ ہم پر چٹی پڑی"
      },
      {
        "numberInSurah": 67,
        "arabic": "بَلْ نَحْنُ مَحْرُومُونَ",
        "english": "Rather, we have been deprived.\"",
        "urduJalandhari": "بلکہ ہم ہیں ہی بےنصیب",
        "urduKanzulIman": "بلکہ ہم بے نصیب رہے،"
      },
      {
        "numberInSurah": 68,
        "arabic": "أَفَرَءَيْتُمُ ٱلْمَآءَ ٱلَّذِى تَشْرَبُونَ",
        "english": "And have you seen the water that you drink?",
        "urduJalandhari": "بھلا دیکھو تو کہ جو پانی تم پیتے ہو",
        "urduKanzulIman": "تو بھلا بتاؤ تو وہ پانی جو پیتے ہو،"
      },
      {
        "numberInSurah": 69,
        "arabic": "ءَأَنتُمْ أَنزَلْتُمُوهُ مِنَ ٱلْمُزْنِ أَمْ نَحْنُ ٱلْمُنزِلُونَ",
        "english": "Is it you who brought it down from the clouds, or is it We who bring it down?",
        "urduJalandhari": "کیا تم نے اس کو بادل سے نازل کیا ہے یا ہم نازل کرتے ہیں؟",
        "urduKanzulIman": "کیا تم نے اسے بادل سے اتارا یا ہم ہیں اتارنے والے"
      },
      {
        "numberInSurah": 70,
        "arabic": "لَوْ نَشَآءُ جَعَلْنَٰهُ أُجَاجًۭا فَلَوْلَا تَشْكُرُونَ",
        "english": "If We willed, We could make it bitter, so why are you not grateful?",
        "urduJalandhari": "اگر ہم چاہیں تو ہم اسے کھاری کردیں پھر تم شکر کیوں نہیں کرتے؟",
        "urduKanzulIman": "ہم چاہیں تو اسے کھاری کردیں پھر کیوں نہیں شکر کرتے"
      },
      {
        "numberInSurah": 71,
        "arabic": "أَفَرَءَيْتُمُ ٱلنَّارَ ٱلَّتِى تُورُونَ",
        "english": "And have you seen the fire that you ignite?",
        "urduJalandhari": "بھلا دیکھو تو جو آگ تم درخت سے نکالتے ہو",
        "urduKanzulIman": "تو بھلا بتاؤں تو وہ آگ جو تم روشن کرتے ہو"
      },
      {
        "numberInSurah": 72,
        "arabic": "ءَأَنتُمْ أَنشَأْتُمْ شَجَرَتَهَآ أَمْ نَحْنُ ٱلْمُنشِـُٔونَ",
        "english": "Is it you who produced its tree, or are We the producer?",
        "urduJalandhari": "کیا تم نے اس کے درخت کو پیدا کیا ہے یا ہم پیدا کرتے ہیں؟",
        "urduKanzulIman": "کیا تم نے اس کا پیڑ پیدا کیا یا ہم ہیں پیدا کرنے والے،"
      },
      {
        "numberInSurah": 73,
        "arabic": "نَحْنُ جَعَلْنَٰهَا تَذْكِرَةًۭ وَمَتَٰعًۭا لِّلْمُقْوِينَ",
        "english": "We have made it a reminder and provision for the travelers,",
        "urduJalandhari": "ہم نے اسے یاد دلانے اور مسافروں کے برتنے کو بنایا ہے",
        "urduKanzulIman": "ہم نے اسے جہنم کا یادگار بنایا اور جنگل میں مسافروں کا فائدہ"
      },
      {
        "numberInSurah": 74,
        "arabic": "فَسَبِّحْ بِٱسْمِ رَبِّكَ ٱلْعَظِيمِ",
        "english": "So exalt the name of your Lord, the Most Great.",
        "urduJalandhari": "تو تم اپنے پروردگار بزرگ کے نام کی تسبیح کرو",
        "urduKanzulIman": "تو اے محبوب تم پاکی بولو اپنے عظمت والے رب کے نام کی،"
      },
      {
        "numberInSurah": 75,
        "arabic": "۞ فَلَآ أُقْسِمُ بِمَوَٰقِعِ ٱلنُّجُومِ",
        "english": "Then I swear by the setting of the stars,",
        "urduJalandhari": "ہمیں تاروں کی منزلوں کی قسم",
        "urduKanzulIman": "تو مجھے قسم ہے ان جگہوں کی جہاں تارے ڈوبتے ہیں"
      },
      {
        "numberInSurah": 76,
        "arabic": "وَإِنَّهُۥ لَقَسَمٌۭ لَّوْ تَعْلَمُونَ عَظِيمٌ",
        "english": "And indeed, it is an oath - if you could know - [most] great.",
        "urduJalandhari": "اور اگر تم سمجھو تو یہ بڑی قسم ہے",
        "urduKanzulIman": "اور تم سمجھو تو یہ بڑی قسم ہے،"
      },
      {
        "numberInSurah": 77,
        "arabic": "إِنَّهُۥ لَقُرْءَانٌۭ كَرِيمٌۭ",
        "english": "Indeed, it is a noble Qur'an",
        "urduJalandhari": "کہ یہ بڑے رتبے کا قرآن ہے",
        "urduKanzulIman": "بیشک یہ عزت والا قرآن ہے"
      },
      {
        "numberInSurah": 78,
        "arabic": "فِى كِتَٰبٍۢ مَّكْنُونٍۢ",
        "english": "In a Register well-protected;",
        "urduJalandhari": "(جو) کتاب محفوظ میں (لکھا ہوا ہے)",
        "urduKanzulIman": "محفوظ نوشتہ میں"
      },
      {
        "numberInSurah": 79,
        "arabic": "لَّا يَمَسُّهُۥٓ إِلَّا ٱلْمُطَهَّرُونَ",
        "english": "None touch it except the purified.",
        "urduJalandhari": "اس کو وہی ہاتھ لگاتے ہیں جو پاک ہیں",
        "urduKanzulIman": "اسے نہ چھوئیں مگر باوضو"
      },
      {
        "numberInSurah": 80,
        "arabic": "تَنزِيلٌۭ مِّن رَّبِّ ٱلْعَٰلَمِينَ",
        "english": "[It is] a revelation from the Lord of the worlds.",
        "urduJalandhari": "پروردگار عالم کی طرف سے اُتارا گیا ہے",
        "urduKanzulIman": "اتارا ہوا ہے سارے جہان کے رب کا،"
      },
      {
        "numberInSurah": 81,
        "arabic": "أَفَبِهَٰذَا ٱلْحَدِيثِ أَنتُم مُّدْهِنُونَ",
        "english": "Then is it to this statement that you are indifferent",
        "urduJalandhari": "کیا تم اس کلام سے انکار کرتے ہو؟",
        "urduKanzulIman": "تو کیا اس بات میں تم سستی کرتے ہو"
      },
      {
        "numberInSurah": 82,
        "arabic": "وَتَجْعَلُونَ رِزْقَكُمْ أَنَّكُمْ تُكَذِّبُونَ",
        "english": "And make [the thanks for] your provision that you deny [the Provider]?",
        "urduJalandhari": "اور اپنا وظیفہ یہ بناتے ہو کہ (اسے) جھٹلاتے ہو",
        "urduKanzulIman": "اور اپنا حصہ یہ رکھتے ہو کہ جھٹلاتے ہو"
      },
      {
        "numberInSurah": 83,
        "arabic": "فَلَوْلَآ إِذَا بَلَغَتِ ٱلْحُلْقُومَ",
        "english": "Then why, when the soul at death reaches the throat",
        "urduJalandhari": "بھلا جب روح گلے میں آ پہنچتی ہے",
        "urduKanzulIman": "پھر کیوں نہ ہو جب جان گلے تک پہنچے"
      },
      {
        "numberInSurah": 84,
        "arabic": "وَأَنتُمْ حِينَئِذٍۢ تَنظُرُونَ",
        "english": "And you are at that time looking on -",
        "urduJalandhari": "اور تم اس وقت کی (حالت کو) دیکھا کرتے ہو",
        "urduKanzulIman": "اور تم اس وقت دیکھ رہے ہو"
      },
      {
        "numberInSurah": 85,
        "arabic": "وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنكُمْ وَلَٰكِن لَّا تُبْصِرُونَ",
        "english": "And Our angels are nearer to him than you, but you do not see -",
        "urduJalandhari": "اور ہم اس (مرنے والے) سے تم سے بھی زیادہ نزدیک ہوتے ہیں لیکن تم کو نظر نہیں آتے",
        "urduKanzulIman": "اور ہم اس کے زیادہ پاس ہیں تم سے مگر تمہیں نگاہ نیں"
      },
      {
        "numberInSurah": 86,
        "arabic": "فَلَوْلَآ إِن كُنتُمْ غَيْرَ مَدِينِينَ",
        "english": "Then why do you not, if you are not to be recompensed,",
        "urduJalandhari": "پس اگر تم کسی کے بس میں نہیں ہو",
        "urduKanzulIman": "تو کیوں نہ ہوا اگر تمہیں بدلہ ملنا نہیں"
      },
      {
        "numberInSurah": 87,
        "arabic": "تَرْجِعُونَهَآ إِن كُنتُمْ صَٰدِقِينَ",
        "english": "Bring it back, if you should be truthful?",
        "urduJalandhari": "تو اگر سچے ہو تو روح کو پھیر کیوں نہیں لیتے؟",
        "urduKanzulIman": "کہ اسے لوٹا لاتے اگر تم سچے ہو"
      },
      {
        "numberInSurah": 88,
        "arabic": "فَأَمَّآ إِن كَانَ مِنَ ٱلْمُقَرَّبِينَ",
        "english": "And if the deceased was of those brought near to Allah,",
        "urduJalandhari": "پھر اگر وہ (خدا کے) مقربوں میں سے ہے",
        "urduKanzulIman": "پھر وہ مرنے والا اگر مقربوں سے ہے"
      },
      {
        "numberInSurah": 89,
        "arabic": "فَرَوْحٌۭ وَرَيْحَانٌۭ وَجَنَّتُ نَعِيمٍۢ",
        "english": "Then [for him is] rest and bounty and a garden of pleasure.",
        "urduJalandhari": "تو (اس کے لئے) آرام اور خوشبودار پھول اور نعمت کے باغ ہیں",
        "urduKanzulIman": "تو راحت ہے اور پھول اور چین کے باغ"
      },
      {
        "numberInSurah": 90,
        "arabic": "وَأَمَّآ إِن كَانَ مِنْ أَصْحَٰبِ ٱلْيَمِينِ",
        "english": "And if he was of the companions of the right,",
        "urduJalandhari": "اور اگر وہ دائیں ہاتھ والوں میں سے ہے",
        "urduKanzulIman": "اور اگر دہنی طرف والوں سے ہو"
      },
      {
        "numberInSurah": 91,
        "arabic": "فَسَلَٰمٌۭ لَّكَ مِنْ أَصْحَٰبِ ٱلْيَمِينِ",
        "english": "Then [the angels will say], \"Peace for you; [you are] from the companions of the right.\"",
        "urduJalandhari": "تو (کہا جائے گا کہ) تجھ پر داہنے ہاتھ والوں کی طرف سے سلام",
        "urduKanzulIman": "تو اے محبوب تم پر سلام دہنی طرف والوں سے"
      },
      {
        "numberInSurah": 92,
        "arabic": "وَأَمَّآ إِن كَانَ مِنَ ٱلْمُكَذِّبِينَ ٱلضَّآلِّينَ",
        "english": "But if he was of the deniers [who were] astray,",
        "urduJalandhari": "اور اگر وہ جھٹلانے والے گمراہوں میں سے ہے",
        "urduKanzulIman": "اور اگر جھٹلانے والے گمراہوں میں سے ہو"
      },
      {
        "numberInSurah": 93,
        "arabic": "فَنُزُلٌۭ مِّنْ حَمِيمٍۢ",
        "english": "Then [for him is] accommodation of scalding water",
        "urduJalandhari": "تو (اس کے لئے) کھولتے پانی کی ضیافت ہے",
        "urduKanzulIman": "تو اس کی مہمانی کھولتا پانی،"
      },
      {
        "numberInSurah": 94,
        "arabic": "وَتَصْلِيَةُ جَحِيمٍ",
        "english": "And burning in Hellfire",
        "urduJalandhari": "اور جہنم میں داخل کیا جانا",
        "urduKanzulIman": "اور بھڑکتی آگ میں دھنسانا"
      },
      {
        "numberInSurah": 95,
        "arabic": "إِنَّ هَٰذَا لَهُوَ حَقُّ ٱلْيَقِينِ",
        "english": "Indeed, this is the true certainty,",
        "urduJalandhari": "یہ (داخل کیا جانا یقیناً صحیح یعنی) حق الیقین ہے",
        "urduKanzulIman": "یہ بیشک اعلیٰ درجہ کی یقینی بات ہے،"
      },
      {
        "numberInSurah": 96,
        "arabic": "فَسَبِّحْ بِٱسْمِ رَبِّكَ ٱلْعَظِيمِ",
        "english": "So exalt the name of your Lord, the Most Great.",
        "urduJalandhari": "تو تم اپنے پروردگار بزرگ کے نام کی تسبیح کرتے رہو",
        "urduKanzulIman": "تو اے محبوب تم اپنے عظمت والے رب کے نام کی پاکی بولو"
      }
    ]
  },
  {
    "id": "yaseen",
    "surahNumber": 36,
    "nameEn": "Surah Ya-Sin",
    "nameUr": "سورۃ یٰس",
    "titleEn": "The Heart of the Quran",
    "titleUr": "قرآن کا دل",
    "virtueEn": "The Heart of the Quran. Whoever recites it in the morning will have his needs fulfilled (Ad-Darimi).",
    "virtueUr": "قرآن کا دل: جو صبح کے وقت تلاوت کرے اس کے کاموں میں آسانی اور کفالت عطا کی جاتی ہے (دارمی)۔",
    "fullSurah": true,
    "totalAyahs": 83,
    "ayahs": [
      {
        "numberInSurah": 1,
        "arabic": "يسٓ",
        "english": "Ya, Seen.",
        "urduJalandhari": "یٰسٓ",
        "urduKanzulIman": "یسٰں"
      },
      {
        "numberInSurah": 2,
        "arabic": "وَٱلْقُرْءَانِ ٱلْحَكِيمِ",
        "english": "By the wise Qur'an.",
        "urduJalandhari": "قسم ہے قرآن کی جو حکمت سے بھرا ہوا ہے",
        "urduKanzulIman": "حکمت والے قرآن کی قسم،"
      },
      {
        "numberInSurah": 3,
        "arabic": "إِنَّكَ لَمِنَ ٱلْمُرْسَلِينَ",
        "english": "Indeed you, [O Muhammad], are from among the messengers,",
        "urduJalandhari": "اے محمدﷺ) بےشک تم پیغمبروں میں سے ہو",
        "urduKanzulIman": "بیشک تم"
      },
      {
        "numberInSurah": 4,
        "arabic": "عَلَىٰ صِرَٰطٍۢ مُّسْتَقِيمٍۢ",
        "english": "On a straight path.",
        "urduJalandhari": "سیدھے رستے پر",
        "urduKanzulIman": "سیدھی راہ پر بھیجے گئے ہو"
      },
      {
        "numberInSurah": 5,
        "arabic": "تَنزِيلَ ٱلْعَزِيزِ ٱلرَّحِيمِ",
        "english": "[This is] a revelation of the Exalted in Might, the Merciful,",
        "urduJalandhari": "یہ خدائے) غالب (اور) مہربان نے نازل کیا ہے",
        "urduKanzulIman": "عزت والے مہربان کا اتارا ہوا،"
      },
      {
        "numberInSurah": 6,
        "arabic": "لِتُنذِرَ قَوْمًۭا مَّآ أُنذِرَ ءَابَآؤُهُمْ فَهُمْ غَٰفِلُونَ",
        "english": "That you may warn a people whose forefathers were not warned, so they are unaware.",
        "urduJalandhari": "تاکہ تم ان لوگوں کو جن کے باپ دادا کو متنبہ نہیں کیا گیا تھا متنبہ کردو وہ غفلت میں پڑے ہوئے ہیں",
        "urduKanzulIman": "تاکہ تم اس قوم کو ڈر سناؤ جس کے باپ دادا نہ ڈرائے گئے تو وہ بے خبر ہیں،"
      },
      {
        "numberInSurah": 7,
        "arabic": "لَقَدْ حَقَّ ٱلْقَوْلُ عَلَىٰٓ أَكْثَرِهِمْ فَهُمْ لَا يُؤْمِنُونَ",
        "english": "Already the word has come into effect upon most of them, so they do not believe.",
        "urduJalandhari": "ان میں سے اکثر پر (خدا کی) بات پوری ہوچکی ہے سو وہ ایمان نہیں لائیں گے",
        "urduKanzulIman": "بیشک ان میں اکثر پر بات ثابت ہوچکی ہے تو وہ ایمان نہ لائیں گے"
      },
      {
        "numberInSurah": 8,
        "arabic": "إِنَّا جَعَلْنَا فِىٓ أَعْنَٰقِهِمْ أَغْلَٰلًۭا فَهِىَ إِلَى ٱلْأَذْقَانِ فَهُم مُّقْمَحُونَ",
        "english": "Indeed, We have put shackles on their necks, and they are to their chins, so they are with heads [kept] aloft.",
        "urduJalandhari": "ہم نے ان کی گردنوں میں طوق ڈال رکھے ہیں اور وہ ٹھوڑیوں تک (پھنسے ہوئے ہیں) تو ان کے سر اُلل رہے ہیں",
        "urduKanzulIman": "ہم نے ان کی گردنو ں میں طوق کردیے ہیں کہ وہ ٹھوڑیوں تک ہیں تو یہ اوپر کو منہ اٹھائے رہ گئے"
      },
      {
        "numberInSurah": 9,
        "arabic": "وَجَعَلْنَا مِنۢ بَيْنِ أَيْدِيهِمْ سَدًّۭا وَمِنْ خَلْفِهِمْ سَدًّۭا فَأَغْشَيْنَٰهُمْ فَهُمْ لَا يُبْصِرُونَ",
        "english": "And We have put before them a barrier and behind them a barrier and covered them, so they do not see.",
        "urduJalandhari": "اور ہم نے ان کے آگے بھی دیوار بنا دی اور ان کے پیچھے بھی۔ پھر ان پر پردہ ڈال دیا تو یہ دیکھ نہیں سکتے",
        "urduKanzulIman": "اور ہم نے ان کے آگے دیوار بنادی اور ان کے پیچھے ایک دیوار اور انہیں اوپر سے ڈھانک دیا تو انہیں کچھ نہیں سوجھتا"
      },
      {
        "numberInSurah": 10,
        "arabic": "وَسَوَآءٌ عَلَيْهِمْ ءَأَنذَرْتَهُمْ أَمْ لَمْ تُنذِرْهُمْ لَا يُؤْمِنُونَ",
        "english": "And it is all the same for them whether you warn them or do not warn them - they will not believe.",
        "urduJalandhari": "اور تم ان کو نصیحت کرو یا نہ کرو ان کے لئے برابر ہے وہ ایمان نہیں لانے کے",
        "urduKanzulIman": "اور انہیں ایک سا ہے تم انہیں ڈراؤٕ یا نہ ڈراؤ وہ ایمان لانے کے نہیں،"
      },
      {
        "numberInSurah": 11,
        "arabic": "إِنَّمَا تُنذِرُ مَنِ ٱتَّبَعَ ٱلذِّكْرَ وَخَشِىَ ٱلرَّحْمَٰنَ بِٱلْغَيْبِ ۖ فَبَشِّرْهُ بِمَغْفِرَةٍۢ وَأَجْرٍۢ كَرِيمٍ",
        "english": "You can only warn one who follows the message and fears the Most Merciful unseen. So give him good tidings of forgiveness and noble reward.",
        "urduJalandhari": "تم تو صرف اس شخص کو نصیحت کرسکتے ہو جو نصیحت کی پیروی کرے اور خدا سے غائبانہ ڈرے سو اس کو مغفرت اور بڑے ثواب کی بشارت سنا دو",
        "urduKanzulIman": "تم تو اسی کو ڈر سناتے ہو جو نصیحت پر چلے اور رحمن سے بے دیکھے ڈرے، تو اسے بخشش اور عزت کے ثواب کی بشارت دو"
      },
      {
        "numberInSurah": 12,
        "arabic": "إِنَّا نَحْنُ نُحْىِ ٱلْمَوْتَىٰ وَنَكْتُبُ مَا قَدَّمُوا۟ وَءَاثَٰرَهُمْ ۚ وَكُلَّ شَىْءٍ أَحْصَيْنَٰهُ فِىٓ إِمَامٍۢ مُّبِينٍۢ",
        "english": "Indeed, it is We who bring the dead to life and record what they have put forth and what they left behind, and all things We have enumerated in a clear register.",
        "urduJalandhari": "بےشک ہم مردوں کو زندہ کریں گے اور جو کچھ وہ آگے بھیج چکے اور (جو) ان کے نشان پیچھے رہ گئے ہم ان کو قلمبند کرلیتے ہیں۔ اور ہر چیز کو ہم نے کتاب روشن (یعنی لوح محفوظ) میں لکھ رکھا ہے۔",
        "urduKanzulIman": "بیشک ہم مُردوں کو جِلائیں گے اور ہم لکھ رہے ہیں جو انہوں نے آگے بھیجا اور جو نشانیاں پیچھے چھوڑ گئے اور ہر چیز ہم نے گن رکھی ہے ایک بتانے والی کتاب میں"
      },
      {
        "numberInSurah": 13,
        "arabic": "وَٱضْرِبْ لَهُم مَّثَلًا أَصْحَٰبَ ٱلْقَرْيَةِ إِذْ جَآءَهَا ٱلْمُرْسَلُونَ",
        "english": "And present to them an example: the people of the city, when the messengers came to it -",
        "urduJalandhari": "اور ان سے گاؤں والوں کا قصہ بیان کرو جب ان کے پاس پیغمبر آئے",
        "urduKanzulIman": "اور ان سے نشانیاں بیان کرو اس شہر والوں کی جب ان کے پاس فرستادے (رسول) آئے،"
      },
      {
        "numberInSurah": 14,
        "arabic": "إِذْ أَرْسَلْنَآ إِلَيْهِمُ ٱثْنَيْنِ فَكَذَّبُوهُمَا فَعَزَّزْنَا بِثَالِثٍۢ فَقَالُوٓا۟ إِنَّآ إِلَيْكُم مُّرْسَلُونَ",
        "english": "When We sent to them two but they denied them, so We strengthened them with a third, and they said, \"Indeed, we are messengers to you.\"",
        "urduJalandhari": "(یعنی) جب ہم نے ان کی طرف دو (پیغمبر) بھیجے تو انہوں نے ان کو جھٹلایا۔ پھر ہم نے تیسرے سے تقویت دی تو انہوں نے کہا کہ ہم تمہاری طرف پیغمبر ہو کر آئے ہیں",
        "urduKanzulIman": "جب ہم نے ان کی طرف دو بھیجے پھر انہوں نے ان کو جھٹلایا تو ہم نے تیسرے سے زور دیا اب ان سب نے کہا کہ بیشک ہم تمہاری طرف بھیجے گئے ہیں،"
      },
      {
        "numberInSurah": 15,
        "arabic": "قَالُوا۟ مَآ أَنتُمْ إِلَّا بَشَرٌۭ مِّثْلُنَا وَمَآ أَنزَلَ ٱلرَّحْمَٰنُ مِن شَىْءٍ إِنْ أَنتُمْ إِلَّا تَكْذِبُونَ",
        "english": "They said, \"You are not but human beings like us, and the Most Merciful has not revealed a thing. You are only telling lies.\"",
        "urduJalandhari": "وہ بولے کہ تم (اور کچھ) نہیں مگر ہماری طرح کے آدمی (ہو) اور خدا نے کوئی چیز نازل نہیں کی تم محض جھوٹ بولتے ہو",
        "urduKanzulIman": "بولے تم تو نہیں مگر ہم جیسے آدمی اور رحمن نے کچھ نہیں اتارا تم نرے جھوٹے ہو،"
      },
      {
        "numberInSurah": 16,
        "arabic": "قَالُوا۟ رَبُّنَا يَعْلَمُ إِنَّآ إِلَيْكُمْ لَمُرْسَلُونَ",
        "english": "They said, \"Our Lord knows that we are messengers to you,",
        "urduJalandhari": "انہوں نے کہا کہ ہمارا پروردگار جانتا ہے کہ ہم تمہاری طرف (پیغام دے کر) بھیجے گئے ہیں",
        "urduKanzulIman": "وہ بولے ہمارا رب جانتا ہے کہ بیشک ضرور ہم تمہاری طرف بھیجے گئے ہیں،"
      },
      {
        "numberInSurah": 17,
        "arabic": "وَمَا عَلَيْنَآ إِلَّا ٱلْبَلَٰغُ ٱلْمُبِينُ",
        "english": "And we are not responsible except for clear notification.\"",
        "urduJalandhari": "اور ہمارے ذمے تو صاف صاف پہنچا دینا ہے اور بس",
        "urduKanzulIman": "اور ہمارے ذمہ نہیں مگر صاف پہنچا دینا"
      },
      {
        "numberInSurah": 18,
        "arabic": "قَالُوٓا۟ إِنَّا تَطَيَّرْنَا بِكُمْ ۖ لَئِن لَّمْ تَنتَهُوا۟ لَنَرْجُمَنَّكُمْ وَلَيَمَسَّنَّكُم مِّنَّا عَذَابٌ أَلِيمٌۭ",
        "english": "They said, \"Indeed, we consider you a bad omen. If you do not desist, we will surely stone you, and there will surely touch you, from us, a painful punishment.\"",
        "urduJalandhari": "وہ بولے کہ ہم تم کو نامبارک سمجھتے ہیں۔ اگر تم باز نہ آؤ گے تو ہم تمہیں سنگسار کردیں گے اور تم کو ہم سے دکھ دینے والا عذاب پہنچے گا",
        "urduKanzulIman": "بولے ہم تمہیں منحوس سمجھتے ہیں بیشک اگر تم باز نہ آئے تو ضرور ہم تمہیں سنگسار کریں گے بیشک ہمارے ہاتھوں تم پر دکھ کی مار پڑے گی،"
      },
      {
        "numberInSurah": 19,
        "arabic": "قَالُوا۟ طَٰٓئِرُكُم مَّعَكُمْ ۚ أَئِن ذُكِّرْتُم ۚ بَلْ أَنتُمْ قَوْمٌۭ مُّسْرِفُونَ",
        "english": "They said, \"Your omen is with yourselves. Is it because you were reminded? Rather, you are a transgressing people.\"",
        "urduJalandhari": "انہوں نے کہا کہ تمہاری نحوست تمہارے ساتھ ہے۔ کیا اس لئے کہ تم کو نصیحت کی گئی۔ بلکہ تم ایسے لوگ ہو جو حد سے تجاوز کر گئے ہو",
        "urduKanzulIman": "انہوں نے فرمایا تمہاری نحوست تو تمہارے ساتھ ہے کیا اس پر بدکتے ہو کہ تم سمجھائے گئے بلکہ تم حد سے بڑھنے والے لوگ ہو"
      },
      {
        "numberInSurah": 20,
        "arabic": "وَجَآءَ مِنْ أَقْصَا ٱلْمَدِينَةِ رَجُلٌۭ يَسْعَىٰ قَالَ يَٰقَوْمِ ٱتَّبِعُوا۟ ٱلْمُرْسَلِينَ",
        "english": "And there came from the farthest end of the city a man, running. He said, \"O my people, follow the messengers.",
        "urduJalandhari": "اور شہر کے پرلے کنارے سے ایک آدمی دوڑتا ہوا آیا کہنے لگا کہ اے میری قوم پیغمبروں کے پیچھے چلو",
        "urduKanzulIman": "اور شہر کے پرلے کنارے سے ایک مرد دوڑتا آیا بولا، اے میری قوم! بھیجے ہوؤں کی پیروی کرو،"
      },
      {
        "numberInSurah": 21,
        "arabic": "ٱتَّبِعُوا۟ مَن لَّا يَسْـَٔلُكُمْ أَجْرًۭا وَهُم مُّهْتَدُونَ",
        "english": "Follow those who do not ask of you [any] payment, and they are [rightly] guided.",
        "urduJalandhari": "ایسوں کے جو تم سے صلہ نہیں مانگتے اور وہ سیدھے رستے پر ہیں",
        "urduKanzulIman": "ایسوں کی پیروی کرو جو تم سے کچھ نیگ (اجر) نہیں مانگتے اور وہ راہ پر ہیں،"
      },
      {
        "numberInSurah": 22,
        "arabic": "وَمَا لِىَ لَآ أَعْبُدُ ٱلَّذِى فَطَرَنِى وَإِلَيْهِ تُرْجَعُونَ",
        "english": "And why should I not worship He who created me and to whom you will be returned?",
        "urduJalandhari": "اور مجھے کیا ہے میں اس کی پرستش نہ کروں جس نے مجھے پیدا کیا اور اسی کی طرف تم کو لوٹ کر جانا ہے",
        "urduKanzulIman": "اور مجھے کیا ہے کہ اس کی بندگی نہ کروں جس نے مجھے پیدا کیا اور اسی کی طرف تمہیں پلٹنا ہے،"
      },
      {
        "numberInSurah": 23,
        "arabic": "ءَأَتَّخِذُ مِن دُونِهِۦٓ ءَالِهَةً إِن يُرِدْنِ ٱلرَّحْمَٰنُ بِضُرٍّۢ لَّا تُغْنِ عَنِّى شَفَٰعَتُهُمْ شَيْـًۭٔا وَلَا يُنقِذُونِ",
        "english": "Should I take other than Him [false] deities [while], if the Most Merciful intends for me some adversity, their intercession will not avail me at all, nor can they save me?",
        "urduJalandhari": "کیا میں ان کو چھوڑ کر اوروں کو معبود بناؤں؟ اگر خدا میرے حق میں نقصان کرنا چاہے تو ان کی سفارش مجھے کچھ بھی فائدہ نہ دے سکے اور نہ وہ مجھ کو چھڑا ہی سکیں",
        "urduKanzulIman": "کیا اللہ کے سوا اور خدا ٹھہراؤں کہ اگر رحمٰن میرا کچھ برا چاہے تو ان کی سفارش میرے کچھ کام نہ آئے اور نہ وہ مجھے بچاسکیں،"
      },
      {
        "numberInSurah": 24,
        "arabic": "إِنِّىٓ إِذًۭا لَّفِى ضَلَٰلٍۢ مُّبِينٍ",
        "english": "Indeed, I would then be in manifest error.",
        "urduJalandhari": "تب تو میں صریح گمراہی میں مبتلا ہوگیا",
        "urduKanzulIman": "بیشک جب تو میں کھلی گمراہی میں ہو"
      },
      {
        "numberInSurah": 25,
        "arabic": "إِنِّىٓ ءَامَنتُ بِرَبِّكُمْ فَٱسْمَعُونِ",
        "english": "Indeed, I have believed in your Lord, so listen to me.\"",
        "urduJalandhari": "میں تمہارے پروردگار پر ایمان لایا ہوں سو میری بات سن رکھو",
        "urduKanzulIman": "مقرر میں تمہارے رب پر ایمان لایا تو میری سنو"
      },
      {
        "numberInSurah": 26,
        "arabic": "قِيلَ ٱدْخُلِ ٱلْجَنَّةَ ۖ قَالَ يَٰلَيْتَ قَوْمِى يَعْلَمُونَ",
        "english": "It was said, \"Enter Paradise.\" He said, \"I wish my people could know",
        "urduJalandhari": "حکم ہوا کہ بہشت میں داخل ہوجا۔ بولا کاش! میری قوم کو خبر ہو",
        "urduKanzulIman": "اس سے فرمایا گیا کہ جنت میں داخل ہو کہا کسی طرح میری قوم جانتی،"
      },
      {
        "numberInSurah": 27,
        "arabic": "بِمَا غَفَرَ لِى رَبِّى وَجَعَلَنِى مِنَ ٱلْمُكْرَمِينَ",
        "english": "Of how my Lord has forgiven me and placed me among the honored.\"",
        "urduJalandhari": "کہ خدا نے مجھے بخش دیا اور عزت والوں میں کیا",
        "urduKanzulIman": "جیسی میرے رب نے میری مغفرت کی اور مجھے عزت والوں میں کیا"
      },
      {
        "numberInSurah": 28,
        "arabic": "۞ وَمَآ أَنزَلْنَا عَلَىٰ قَوْمِهِۦ مِنۢ بَعْدِهِۦ مِن جُندٍۢ مِّنَ ٱلسَّمَآءِ وَمَا كُنَّا مُنزِلِينَ",
        "english": "And We did not send down upon his people after him any soldiers from the heaven, nor would We have done so.",
        "urduJalandhari": "اور ہم نے اس کے بعد اس کی قوم پر کوئی لشکر نہیں اُتارا اور نہ ہم اُتارنے والے تھے ہی",
        "urduKanzulIman": "اور ہم نے اس کے بعد اس کی قوم پر آسمان سے کوئی لشکر نہ اتارا اور نہ ہمیں وہاں کوئی لشکر اتارنا تھا،"
      },
      {
        "numberInSurah": 29,
        "arabic": "إِن كَانَتْ إِلَّا صَيْحَةًۭ وَٰحِدَةًۭ فَإِذَا هُمْ خَٰمِدُونَ",
        "english": "It was not but one shout, and immediately they were extinguished.",
        "urduJalandhari": "وہ تو صرف ایک چنگھاڑ تھی (آتشین) سو وہ (اس سے) ناگہاں بجھ کر رہ گئے",
        "urduKanzulIman": "وہ تو بس ایک ہی چیخ تھی جبھی وہ بجھ کر رہ گئے،"
      },
      {
        "numberInSurah": 30,
        "arabic": "يَٰحَسْرَةً عَلَى ٱلْعِبَادِ ۚ مَا يَأْتِيهِم مِّن رَّسُولٍ إِلَّا كَانُوا۟ بِهِۦ يَسْتَهْزِءُونَ",
        "english": "How regretful for the servants. There did not come to them any messenger except that they used to ridicule him.",
        "urduJalandhari": "بندوں پر افسوس ہے کہ ان کے پاس کوئی پیغمبر نہیں آتا مگر اس سے تمسخر کرتے ہیں",
        "urduKanzulIman": "اور کہا گیا کہ ہائے افسوس ان بندوں پر جب ان کے پاس کوئی رسول آتا ہے تو اس سے ٹھٹھا ہی کرتے ہیں،"
      },
      {
        "numberInSurah": 31,
        "arabic": "أَلَمْ يَرَوْا۟ كَمْ أَهْلَكْنَا قَبْلَهُم مِّنَ ٱلْقُرُونِ أَنَّهُمْ إِلَيْهِمْ لَا يَرْجِعُونَ",
        "english": "Have they not considered how many generations We destroyed before them - that they to them will not return?",
        "urduJalandhari": "کیا انہوں نے نہیں دیکھا کہ ہم نے ان سے پہلے بہت سے لوگوں کو ہلاک کردیا تھا اب وہ ان کی طرف لوٹ کر نہیں آئیں گے",
        "urduKanzulIman": "کیا انہوں نے نہ دیکھا ہم نے ان سے پہلے کتنی سنگتیں ہلاک فرمائیں کہ وہ اب ان کی طرف پلٹنے والے نہیں"
      },
      {
        "numberInSurah": 32,
        "arabic": "وَإِن كُلٌّۭ لَّمَّا جَمِيعٌۭ لَّدَيْنَا مُحْضَرُونَ",
        "english": "And indeed, all of them will yet be brought present before Us.",
        "urduJalandhari": "اور سب کے سب ہمارے روبرو حاضر کيے جائیں گے",
        "urduKanzulIman": "اور جتنے بھی ہیں سب کے سب ہمارے حضور حاضر لائے جائیں گے"
      },
      {
        "numberInSurah": 33,
        "arabic": "وَءَايَةٌۭ لَّهُمُ ٱلْأَرْضُ ٱلْمَيْتَةُ أَحْيَيْنَٰهَا وَأَخْرَجْنَا مِنْهَا حَبًّۭا فَمِنْهُ يَأْكُلُونَ",
        "english": "And a sign for them is the dead earth. We have brought it to life and brought forth from it grain, and from it they eat.",
        "urduJalandhari": "اور ایک نشانی ان کے لئے زمین مردہ ہے کہ ہم نے اس کو زندہ کیا اور اس میں سے اناج اُگایا۔ پھر یہ اس میں سے کھاتے ہیں",
        "urduKanzulIman": "اور ان کے لیے ایک نشانی مردہ زمین ہے ہم نے اسے زندہ کیا اور پھر اس سے اناج نکالا تو اس میں سے کھاتے ہیں،"
      },
      {
        "numberInSurah": 34,
        "arabic": "وَجَعَلْنَا فِيهَا جَنَّٰتٍۢ مِّن نَّخِيلٍۢ وَأَعْنَٰبٍۢ وَفَجَّرْنَا فِيهَا مِنَ ٱلْعُيُونِ",
        "english": "And We placed therein gardens of palm trees and grapevines and caused to burst forth therefrom some springs -",
        "urduJalandhari": "اور اس میں کھجوروں اور انگوروں کے باغ پیدا کیے اور اس میں چشمے جاری کردیئے",
        "urduKanzulIman": "اور ہم نے اس میں باغ بنائے کھجوروں اور انگو روں کے اور ہم نے اس میں کچھ چشمے بہائے کہ،"
      },
      {
        "numberInSurah": 35,
        "arabic": "لِيَأْكُلُوا۟ مِن ثَمَرِهِۦ وَمَا عَمِلَتْهُ أَيْدِيهِمْ ۖ أَفَلَا يَشْكُرُونَ",
        "english": "That they may eat of His fruit. And their hands have not produced it, so will they not be grateful?",
        "urduJalandhari": "تاکہ یہ ان کے پھل کھائیں اور ان کے ہاتھوں نے تو ان کو نہیں بنایا تو پھر یہ شکر کیوں نہیں کرتے؟",
        "urduKanzulIman": "اس کے پھلوں میں سے کھائیں اور یہ ان کے ہاتھ کے بنائے نہیں تو کیا حق نہ مانیں گے"
      },
      {
        "numberInSurah": 36,
        "arabic": "سُبْحَٰنَ ٱلَّذِى خَلَقَ ٱلْأَزْوَٰجَ كُلَّهَا مِمَّا تُنۢبِتُ ٱلْأَرْضُ وَمِنْ أَنفُسِهِمْ وَمِمَّا لَا يَعْلَمُونَ",
        "english": "Exalted is He who created all pairs - from what the earth grows and from themselves and from that which they do not know.",
        "urduJalandhari": "وہ خدا پاک ہے جس نے زمین کی نباتات کے اور خود ان کے اور جن چیزوں کی ان کو خبر نہیں سب کے جوڑے بنائے",
        "urduKanzulIman": "پاکی ہے اسے جس نے سب جوڑے بنائے ان چیزوں سے جنہیں زمین اگاتی ہے اور خود ان سے اور ان چیزوں سے جن کی انہیں خبر نہیں"
      },
      {
        "numberInSurah": 37,
        "arabic": "وَءَايَةٌۭ لَّهُمُ ٱلَّيْلُ نَسْلَخُ مِنْهُ ٱلنَّهَارَ فَإِذَا هُم مُّظْلِمُونَ",
        "english": "And a sign for them is the night. We remove from it [the light of] day, so they are [left] in darkness.",
        "urduJalandhari": "اور ایک نشانی ان کے لئے رات ہے کہ اس میں سے ہم دن کو کھینچ لیتے ہیں تو اس وقت ان پر اندھیرا چھا جاتا ہے",
        "urduKanzulIman": "اور ان کے لیے ایک نشانی رات ہے ہم اس پر سے دن کھینچ لیتے ہیں جبھی وہ اندھیروں میں ہیں،"
      },
      {
        "numberInSurah": 38,
        "arabic": "وَٱلشَّمْسُ تَجْرِى لِمُسْتَقَرٍّۢ لَّهَا ۚ ذَٰلِكَ تَقْدِيرُ ٱلْعَزِيزِ ٱلْعَلِيمِ",
        "english": "And the sun runs [on course] toward its stopping point. That is the determination of the Exalted in Might, the Knowing.",
        "urduJalandhari": "اور سورج اپنے مقرر رستے پر چلتا رہتا ہے۔ یہ (خدائے) غالب اور دانا کا (مقرر کیا ہوا) اندازہ ہے",
        "urduKanzulIman": "اور سورج چلتا ہے اپنے ایک ٹھہراؤ کے لیے یہ حکم ہے زبردست علم والے کا"
      },
      {
        "numberInSurah": 39,
        "arabic": "وَٱلْقَمَرَ قَدَّرْنَٰهُ مَنَازِلَ حَتَّىٰ عَادَ كَٱلْعُرْجُونِ ٱلْقَدِيمِ",
        "english": "And the moon - We have determined for it phases, until it returns [appearing] like the old date stalk.",
        "urduJalandhari": "اور چاند کی بھی ہم نے منزلیں مقرر کردیں یہاں تک کہ (گھٹتے گھٹتے) کھجور کی پرانی شاخ کی طرح ہو جاتا ہے",
        "urduKanzulIman": "اور چاند کے لیے ہم نے منزلیں مقرر کیں یہاں تک کہ پھر ہوگیا جیسے کھجور کی پرانی ڈال (ٹہنی)"
      },
      {
        "numberInSurah": 40,
        "arabic": "لَا ٱلشَّمْسُ يَنۢبَغِى لَهَآ أَن تُدْرِكَ ٱلْقَمَرَ وَلَا ٱلَّيْلُ سَابِقُ ٱلنَّهَارِ ۚ وَكُلٌّۭ فِى فَلَكٍۢ يَسْبَحُونَ",
        "english": "It is not allowable for the sun to reach the moon, nor does the night overtake the day, but each, in an orbit, is swimming.",
        "urduJalandhari": "نہ تو سورج ہی سے ہوسکتا ہے کہ چاند کو جا پکڑے اور نہ رات ہی دن سے پہلے آسکتی ہے۔ اور سب اپنے اپنے دائرے میں تیر رہے ہیں",
        "urduKanzulIman": "سورج کو نہیں پہنچتا کہ چاند کو پکڑے اور نہ رات دن پر سبقت لے جائے اور ہر ایک، ایک گھیرے میں پیر رہا ہے،"
      },
      {
        "numberInSurah": 41,
        "arabic": "وَءَايَةٌۭ لَّهُمْ أَنَّا حَمَلْنَا ذُرِّيَّتَهُمْ فِى ٱلْفُلْكِ ٱلْمَشْحُونِ",
        "english": "And a sign for them is that We carried their forefathers in a laden ship.",
        "urduJalandhari": "اور ایک نشانی ان کے لئے یہ ہے کہ ہم نے ان کی اولاد کو بھری ہوئی کشتی میں سوار کیا",
        "urduKanzulIman": "اور ان کے لیے نشانی یہ ہے کہ انہیں ان بزرگوں کی پیٹھ میں ہم نے بھری کشتی میں سوار کیا"
      },
      {
        "numberInSurah": 42,
        "arabic": "وَخَلَقْنَا لَهُم مِّن مِّثْلِهِۦ مَا يَرْكَبُونَ",
        "english": "And We created for them from the likes of it that which they ride.",
        "urduJalandhari": "اور ان کے لئے ویسی ہی اور چیزیں پیدا کیں جن پر وہ سوار ہوتے ہیں",
        "urduKanzulIman": "اور ان کے لیے ویسی ہی کشتیاں بنادیں جن پر سوار ہوتے ہیں،"
      },
      {
        "numberInSurah": 43,
        "arabic": "وَإِن نَّشَأْ نُغْرِقْهُمْ فَلَا صَرِيخَ لَهُمْ وَلَا هُمْ يُنقَذُونَ",
        "english": "And if We should will, We could drown them; then no one responding to a cry would there be for them, nor would they be saved",
        "urduJalandhari": "اور اگر ہم چاہیں تو ان کو غرق کردیں۔ پھر نہ تو ان کا کوئی فریاد رس ہوا اور نہ ان کو رہائی ملے",
        "urduKanzulIman": "اور ہم چاہیں تو انہیں ڈبودیں تو نہ کوئی ان کی فریاد کو پہنچنے والا ہو اور نہ وہ بچائے جائیں،"
      },
      {
        "numberInSurah": 44,
        "arabic": "إِلَّا رَحْمَةًۭ مِّنَّا وَمَتَٰعًا إِلَىٰ حِينٍۢ",
        "english": "Except as a mercy from Us and provision for a time.",
        "urduJalandhari": "مگر یہ ہماری رحمت اور ایک مدت تک کے فائدے ہیں",
        "urduKanzulIman": "مگر ہماری طرف کی رحمت اور ایک وقت تک برتنے دینا"
      },
      {
        "numberInSurah": 45,
        "arabic": "وَإِذَا قِيلَ لَهُمُ ٱتَّقُوا۟ مَا بَيْنَ أَيْدِيكُمْ وَمَا خَلْفَكُمْ لَعَلَّكُمْ تُرْحَمُونَ",
        "english": "But when it is said to them, \"Beware of what is before you and what is behind you; perhaps you will receive mercy... \"",
        "urduJalandhari": "اور جب ان سے کہا جاتا ہے کہ جو تمہارے آگے اور جو تمہارے پیچھے ہے اس سے ڈرو تاکہ تم پر رحم کیا جائے",
        "urduKanzulIman": "اور جب ان سے فرمایا جاتا ہے ڈرو تم اس سے جو تمہارے سامنے ہے اور جو تمہارے پیچھے آنے والا ہے اس امید پر کہ تم پر مہر ہو تو منہ پھیر لیتے ہیں،"
      },
      {
        "numberInSurah": 46,
        "arabic": "وَمَا تَأْتِيهِم مِّنْ ءَايَةٍۢ مِّنْ ءَايَٰتِ رَبِّهِمْ إِلَّا كَانُوا۟ عَنْهَا مُعْرِضِينَ",
        "english": "And no sign comes to them from the signs of their Lord except that they are from it turning away.",
        "urduJalandhari": "اور ان کے پاس ان کے پروردگار کی کوئی نشانی نہیں آتی مگر اس سے منہ پھیر لیتے ہیں",
        "urduKanzulIman": "اور جب کبھی ان کے رب کی نشانیوں سے کوئی نشانی ان کے پاس آتی ہے تو اس سے منہ پھیرلیتے ہیں،"
      },
      {
        "numberInSurah": 47,
        "arabic": "وَإِذَا قِيلَ لَهُمْ أَنفِقُوا۟ مِمَّا رَزَقَكُمُ ٱللَّهُ قَالَ ٱلَّذِينَ كَفَرُوا۟ لِلَّذِينَ ءَامَنُوٓا۟ أَنُطْعِمُ مَن لَّوْ يَشَآءُ ٱللَّهُ أَطْعَمَهُۥٓ إِنْ أَنتُمْ إِلَّا فِى ضَلَٰلٍۢ مُّبِينٍۢ",
        "english": "And when it is said to them, \"Spend from that which Allah has provided for you,\" those who disbelieve say to those who believe, \"Should we feed one whom, if Allah had willed, He would have fed? You are not but in clear error.\"",
        "urduJalandhari": "اور جب ان سے کہا جاتا ہے کہ جو رزق خدا نے تم کو دیا ہے اس میں سے خرچ کرو۔ تو کافر مومنوں سے کہتے ہیں کہ بھلا ہم ان لوگوں کو کھانا کھلائیں جن کو اگر خدا چاہتا تو خود کھلا دیتا۔ تم تو صریح غلطی میں ہو",
        "urduKanzulIman": "اور جب ان سے فرمایا جائے اللہ کے دیے میں سے کچھ اس کی راہ میں خرچ کرو تو کافر مسلمانوں کے لیے کہتے ہیں کہ کیا ہم اسے کھلائیں جسے اللہ چاہتا تو کھلادیتا تم تو نہیں مگر کھلی گمراہی میں،"
      },
      {
        "numberInSurah": 48,
        "arabic": "وَيَقُولُونَ مَتَىٰ هَٰذَا ٱلْوَعْدُ إِن كُنتُمْ صَٰدِقِينَ",
        "english": "And they say, \"When is this promise, if you should be truthful?\"",
        "urduJalandhari": "اور کہتے ہیں اگر تم سچ کہتے ہو تو یہ وعدہ کب (پورا) ہوگا؟",
        "urduKanzulIman": "اور کہتے ہیں کب آئے گا یہ وعدہ اگر تم سچے ہو"
      },
      {
        "numberInSurah": 49,
        "arabic": "مَا يَنظُرُونَ إِلَّا صَيْحَةًۭ وَٰحِدَةًۭ تَأْخُذُهُمْ وَهُمْ يَخِصِّمُونَ",
        "english": "They do not await except one blast which will seize them while they are disputing.",
        "urduJalandhari": "یہ تو ایک چنگھاڑ کے منتظر ہیں جو ان کو اس حال میں کہ باہم جھگڑ رہے ہوں گے آپکڑے گی",
        "urduKanzulIman": "راہ نہیں دیکھتے مگر ایک چیخ کی کہ انہیں آلے گی جب وہ دنیا کے جھگڑے میں پھنسے ہوں گے،"
      },
      {
        "numberInSurah": 50,
        "arabic": "فَلَا يَسْتَطِيعُونَ تَوْصِيَةًۭ وَلَآ إِلَىٰٓ أَهْلِهِمْ يَرْجِعُونَ",
        "english": "And they will not be able [to give] any instruction, nor to their people can they return.",
        "urduJalandhari": "پھر نہ وصیت کرسکیں گے اور نہ اپنے گھر والوں میں واپس جاسکیں گے",
        "urduKanzulIman": "تو نہ وصیت کرسکیں گے اور نہ اپنے گھر پلٹ کرجائیں"
      },
      {
        "numberInSurah": 51,
        "arabic": "وَنُفِخَ فِى ٱلصُّورِ فَإِذَا هُم مِّنَ ٱلْأَجْدَاثِ إِلَىٰ رَبِّهِمْ يَنسِلُونَ",
        "english": "And the Horn will be blown; and at once from the graves to their Lord they will hasten.",
        "urduJalandhari": "اور (جس وقت) صور پھونکا جائے گا یہ قبروں سے (نکل کر) اپنے پروردگار کی طرف دوڑ پڑیں گے",
        "urduKanzulIman": "اور پھونکا جائے گا صور جبھی وہ قبروں سے اپنے رب کی طرف دوڑتے چلیں گے،"
      },
      {
        "numberInSurah": 52,
        "arabic": "قَالُوا۟ يَٰوَيْلَنَا مَنۢ بَعَثَنَا مِن مَّرْقَدِنَا ۜ ۗ هَٰذَا مَا وَعَدَ ٱلرَّحْمَٰنُ وَصَدَقَ ٱلْمُرْسَلُونَ",
        "english": "They will say, \"O woe to us! Who has raised us up from our sleeping place?\" [The reply will be], \"This is what the Most Merciful had promised, and the messengers told the truth.\"",
        "urduJalandhari": "کہیں گے اے ہے ہمیں ہماری خوابگاہوں سے کس نے (جگا) اُٹھایا؟ یہ وہی تو ہے جس کا خدا نے وعدہ کیا تھا اور پیغمبروں نے سچ کہا تھا",
        "urduKanzulIman": "کہیں گے ہائے ہماری خرابی کس نے ہمیں سوتے سے جگادیا یہ ہے وہ جس کا رحمٰن نے وعدہ دیا تھا اور رسولوں نے حق فرمایا"
      },
      {
        "numberInSurah": 53,
        "arabic": "إِن كَانَتْ إِلَّا صَيْحَةًۭ وَٰحِدَةًۭ فَإِذَا هُمْ جَمِيعٌۭ لَّدَيْنَا مُحْضَرُونَ",
        "english": "It will not be but one blast, and at once they are all brought present before Us.",
        "urduJalandhari": "صرف ایک زور کی آواز کا ہونا ہوگا کہ سب کے سب ہمارے روبرو آحاضر ہوں گے",
        "urduKanzulIman": "وہ تو نہ ہوگی مگر ایک چنگھاڑ جبھی وہ سب کے سب ہمارے حضور حاضر ہوجائیں گے"
      },
      {
        "numberInSurah": 54,
        "arabic": "فَٱلْيَوْمَ لَا تُظْلَمُ نَفْسٌۭ شَيْـًۭٔا وَلَا تُجْزَوْنَ إِلَّا مَا كُنتُمْ تَعْمَلُونَ",
        "english": "So today no soul will be wronged at all, and you will not be recompensed except for what you used to do.",
        "urduJalandhari": "اس روز کسی شخص پر کچھ ظلم نہیں کیا جائے گا اور تم کو بدلہ ویسا ہی ملے گا جیسے تم کام کرتے تھے",
        "urduKanzulIman": "تو آج کسی جان پر کچھ ظلم نہ ہوگا اور تمہیں بدلا نہ ملے گا اپنے کیے کا،"
      },
      {
        "numberInSurah": 55,
        "arabic": "إِنَّ أَصْحَٰبَ ٱلْجَنَّةِ ٱلْيَوْمَ فِى شُغُلٍۢ فَٰكِهُونَ",
        "english": "Indeed the companions of Paradise, that Day, will be amused in [joyful] occupation -",
        "urduJalandhari": "اہل جنت اس روز عیش ونشاط کے مشغلے میں ہوں گے",
        "urduKanzulIman": "بیشک جنت والے آج دل کے بہلاووں میں چین کرتے ہیں"
      },
      {
        "numberInSurah": 56,
        "arabic": "هُمْ وَأَزْوَٰجُهُمْ فِى ظِلَٰلٍ عَلَى ٱلْأَرَآئِكِ مُتَّكِـُٔونَ",
        "english": "They and their spouses - in shade, reclining on adorned couches.",
        "urduJalandhari": "وہ بھی اور ان کی بیویاں بھی سایوں میں تختوں پر تکیے لگائے بیٹھے ہوں گے",
        "urduKanzulIman": "وہ اور ان کی بیبیاں سایوں میں ہیں، تختوں پر تکیہ لگائے،"
      },
      {
        "numberInSurah": 57,
        "arabic": "لَهُمْ فِيهَا فَٰكِهَةٌۭ وَلَهُم مَّا يَدَّعُونَ",
        "english": "For them therein is fruit, and for them is whatever they request [or wish]",
        "urduJalandhari": "وہاں ان کے لئے میوے اور جو چاہیں گے (موجود ہوگا)",
        "urduKanzulIman": "ان کے لیے اس میں میوہ ہے اور ان کے لیے ہے اس میں جو مانگیں،"
      },
      {
        "numberInSurah": 58,
        "arabic": "سَلَٰمٌۭ قَوْلًۭا مِّن رَّبٍّۢ رَّحِيمٍۢ",
        "english": "[And] \"Peace,\" a word from a Merciful Lord.",
        "urduJalandhari": "پروردگار مہربان کی طرف سے سلام (کہا جائے گا)",
        "urduKanzulIman": "ان پر سلام ہوگا، مہربان رب کا فرمایا ہوا"
      },
      {
        "numberInSurah": 59,
        "arabic": "وَٱمْتَٰزُوا۟ ٱلْيَوْمَ أَيُّهَا ٱلْمُجْرِمُونَ",
        "english": "[Then He will say], \"But stand apart today, you criminals.",
        "urduJalandhari": "اور گنہگارو! آج الگ ہوجاؤ",
        "urduKanzulIman": "اور آج الگ پھٹ جاؤ، اے مجرمو!"
      },
      {
        "numberInSurah": 60,
        "arabic": "۞ أَلَمْ أَعْهَدْ إِلَيْكُمْ يَٰبَنِىٓ ءَادَمَ أَن لَّا تَعْبُدُوا۟ ٱلشَّيْطَٰنَ ۖ إِنَّهُۥ لَكُمْ عَدُوٌّۭ مُّبِينٌۭ",
        "english": "Did I not enjoin upon you, O children of Adam, that you not worship Satan - [for] indeed, he is to you a clear enemy -",
        "urduJalandhari": "اے آدم کی اولاد ہم نے تم سے کہہ نہیں دیا تھا کہ شیطان کو نہ پوجنا وہ تمہارا کھلا دشمن ہے",
        "urduKanzulIman": "اے اولاد آدم کیا میں نے تم سے عہد نہ لیا تھا کہ شیطان کو نہ پوجنا بیشک وہ تمہارا کھلا دشمن ہے،"
      },
      {
        "numberInSurah": 61,
        "arabic": "وَأَنِ ٱعْبُدُونِى ۚ هَٰذَا صِرَٰطٌۭ مُّسْتَقِيمٌۭ",
        "english": "And that you worship [only] Me? This is a straight path.",
        "urduJalandhari": "اور یہ کہ میری ہی عبادت کرنا۔ یہی سیدھا رستہ ہے",
        "urduKanzulIman": "اور میری بندگی کرنا یہ سیدھی راہ ہے،"
      },
      {
        "numberInSurah": 62,
        "arabic": "وَلَقَدْ أَضَلَّ مِنكُمْ جِبِلًّۭا كَثِيرًا ۖ أَفَلَمْ تَكُونُوا۟ تَعْقِلُونَ",
        "english": "And he had already led astray from among you much of creation, so did you not use reason?",
        "urduJalandhari": "اور اس نے تم میں سے بہت سی خلقت کو گمراہ کردیا تھا۔ تو کیا تم سمجھتے نہیں تھے؟",
        "urduKanzulIman": "اور بیشک اس نے تم میں سے بہت سی خلقت کو بہکادیا، تو کیا تمہیں عقل نہ تھی"
      },
      {
        "numberInSurah": 63,
        "arabic": "هَٰذِهِۦ جَهَنَّمُ ٱلَّتِى كُنتُمْ تُوعَدُونَ",
        "english": "This is the Hellfire which you were promised.",
        "urduJalandhari": "یہی وہ جہنم ہے جس کی تمہیں خبر دی جاتی ہے",
        "urduKanzulIman": "یہ ہے وہ جہنم جس کا تم سے وعدہ تھا،"
      },
      {
        "numberInSurah": 64,
        "arabic": "ٱصْلَوْهَا ٱلْيَوْمَ بِمَا كُنتُمْ تَكْفُرُونَ",
        "english": "[Enter to] burn therein today for what you used to deny.\"",
        "urduJalandhari": "(سو) جو تم کفر کرتے رہے ہو اس کے بدلے آج اس میں داخل ہوجاؤ",
        "urduKanzulIman": "آج اسی میں جاؤ بدلہ اپنے کفر کا،"
      },
      {
        "numberInSurah": 65,
        "arabic": "ٱلْيَوْمَ نَخْتِمُ عَلَىٰٓ أَفْوَٰهِهِمْ وَتُكَلِّمُنَآ أَيْدِيهِمْ وَتَشْهَدُ أَرْجُلُهُم بِمَا كَانُوا۟ يَكْسِبُونَ",
        "english": "That Day, We will seal over their mouths, and their hands will speak to Us, and their feet will testify about what they used to earn.",
        "urduJalandhari": "آج ہم ان کے مونہوں پر مہر لگا دیں گے اور جو کچھ یہ کرتے رہے تھے ان کے ہاتھ ہم سے بیان کردیں گے اور ان کے پاؤں (اس کی) گواہی دیں گے",
        "urduKanzulIman": "آج ہم ان کے مونھوں پر مہر کردیں گے اور ان کے ہاتھ ہم سے بات کریں گے اور ان پاؤں ان کے کئے کی گواہی دیں گے"
      },
      {
        "numberInSurah": 66,
        "arabic": "وَلَوْ نَشَآءُ لَطَمَسْنَا عَلَىٰٓ أَعْيُنِهِمْ فَٱسْتَبَقُوا۟ ٱلصِّرَٰطَ فَأَنَّىٰ يُبْصِرُونَ",
        "english": "And if We willed, We could have obliterated their eyes, and they would race to [find] the path, and how could they see?",
        "urduJalandhari": "اور اگر ہم چاہیں تو ان کی آنکھوں کو مٹا کر (اندھا کر) دیں۔ پھر یہ رستے کو دوڑیں تو کہاں دیکھ سکیں گے",
        "urduKanzulIman": "اور اگر ہم چاہتے تو ان کی آنکھیں مٹادیتے پھر لپک کر رستہ کی طرف جاتے تو انہیں کچھ نہ سوجھتا"
      },
      {
        "numberInSurah": 67,
        "arabic": "وَلَوْ نَشَآءُ لَمَسَخْنَٰهُمْ عَلَىٰ مَكَانَتِهِمْ فَمَا ٱسْتَطَٰعُوا۟ مُضِيًّۭا وَلَا يَرْجِعُونَ",
        "english": "And if We willed, We could have deformed them, [paralyzing them] in their places so they would not be able to proceed, nor could they return.",
        "urduJalandhari": "اور اگر ہم چاہیں تو ان کی جگہ پر ان کی صورتیں بدل دیں پھر وہاں سے نہ آگے جاسکیں اور نہ (پیچھے) لوٹ سکیں",
        "urduKanzulIman": "اور اگر ہم چاہتے تو ان کے گھر بیٹھے ان کی صورتیں بدل دیتے نہ آگے بڑھ سکتے نہ پیچھے لوٹتے"
      },
      {
        "numberInSurah": 68,
        "arabic": "وَمَن نُّعَمِّرْهُ نُنَكِّسْهُ فِى ٱلْخَلْقِ ۖ أَفَلَا يَعْقِلُونَ",
        "english": "And he to whom We grant long life We reverse in creation; so will they not understand?",
        "urduJalandhari": "اور جس کو ہم بڑی عمر دیتے ہیں تو اسے خلقت میں اوندھا کردیتے ہیں تو کیا یہ سمجھتے نہیں؟",
        "urduKanzulIman": "اور جسے ہم بڑی عمر کا کریں اسے پیدائش میں الٹا پھیریں تو کیا سمجھے نہیں"
      },
      {
        "numberInSurah": 69,
        "arabic": "وَمَا عَلَّمْنَٰهُ ٱلشِّعْرَ وَمَا يَنۢبَغِى لَهُۥٓ ۚ إِنْ هُوَ إِلَّا ذِكْرٌۭ وَقُرْءَانٌۭ مُّبِينٌۭ",
        "english": "And We did not give Prophet Muhammad, knowledge of poetry, nor is it befitting for him. It is not but a message and a clear Qur'an",
        "urduJalandhari": "اور ہم نے ان (پیغمبر) کو شعر گوئی نہیں سکھائی اور نہ وہ ان کو شایاں ہے۔ یہ تو محض نصیحت اور صاف صاف قرآن (پُرازحکمت) ہے",
        "urduKanzulIman": "اور ہم نے ان کو شعر کہنا نہ سکھایا اور نہ وہ ان کی شان کے لائق ہے، وہ تو نہیں مگر نصیحت اور روشن قرآن"
      },
      {
        "numberInSurah": 70,
        "arabic": "لِّيُنذِرَ مَن كَانَ حَيًّۭا وَيَحِقَّ ٱلْقَوْلُ عَلَى ٱلْكَٰفِرِينَ",
        "english": "To warn whoever is alive and justify the word against the disbelievers.",
        "urduJalandhari": "تاکہ اس شخص کو جو زندہ ہو ہدایت کا رستہ دکھائے اور کافروں پر بات پوری ہوجائے",
        "urduKanzulIman": "کہ اسے ڈرائے جو زندہ ہو اور کافروں پر بات ثابت ہوجائے"
      },
      {
        "numberInSurah": 71,
        "arabic": "أَوَلَمْ يَرَوْا۟ أَنَّا خَلَقْنَا لَهُم مِّمَّا عَمِلَتْ أَيْدِينَآ أَنْعَٰمًۭا فَهُمْ لَهَا مَٰلِكُونَ",
        "english": "Do they not see that We have created for them from what Our hands have made, grazing livestock, and [then] they are their owners?",
        "urduJalandhari": "کیا انہوں نے نہیں دیکھا کہ جو چیزیں ہم نے اپنے ہاتھوں سے بنائیں ان میں سے ہم نے ان کے لئے چارپائے پیدا کر دیئے اور یہ ان کے مالک ہیں",
        "urduKanzulIman": "اور کیا انہوں نے نہ دیکھا کہ ہم نے اپنے ہاتھ کے بنائے ہوئے چوپائے ان کے لیے پیدا کیے تو یہ ان کے مالک ہیں،"
      },
      {
        "numberInSurah": 72,
        "arabic": "وَذَلَّلْنَٰهَا لَهُمْ فَمِنْهَا رَكُوبُهُمْ وَمِنْهَا يَأْكُلُونَ",
        "english": "And We have tamed them for them, so some of them they ride, and some of them they eat.",
        "urduJalandhari": "اور ان کو ان کے قابو میں کردیا تو کوئی تو ان میں سے ان کی سواری ہے اور کسی کو یہ کھاتے ہیں",
        "urduKanzulIman": "اور انہیں ان کے لیے نرم کردیا تو کسی پر سوار ہوتے ہیں اور کسی کو کھاتے ہیں،"
      },
      {
        "numberInSurah": 73,
        "arabic": "وَلَهُمْ فِيهَا مَنَٰفِعُ وَمَشَارِبُ ۖ أَفَلَا يَشْكُرُونَ",
        "english": "And for them therein are [other] benefits and drinks, so will they not be grateful?",
        "urduJalandhari": "اور ان میں ان کے لئے (اور) فائدے اور پینے کی چیزیں ہیں۔ تو یہ شکر کیوں نہیں کرتے؟",
        "urduKanzulIman": "اور ان کے لیے ان میں کئی طرح کے نفع اور پینے کی چیزیں ہیں تو کیا شکر نہ کریں گے"
      },
      {
        "numberInSurah": 74,
        "arabic": "وَٱتَّخَذُوا۟ مِن دُونِ ٱللَّهِ ءَالِهَةًۭ لَّعَلَّهُمْ يُنصَرُونَ",
        "english": "But they have taken besides Allah [false] deities that perhaps they would be helped.",
        "urduJalandhari": "اور انہوں نے خدا کے سوا (اور) معبود بنا لیے ہیں کہ شاید (ان سے) ان کو مدد پہنچے",
        "urduKanzulIman": "اور انہوں نے اللہ کے سوا اور خدا ٹھہرالیے کہ شاید ان کی مدد ہو"
      },
      {
        "numberInSurah": 75,
        "arabic": "لَا يَسْتَطِيعُونَ نَصْرَهُمْ وَهُمْ لَهُمْ جُندٌۭ مُّحْضَرُونَ",
        "english": "They are not able to help them, and they [themselves] are for them soldiers in attendance.",
        "urduJalandhari": "(مگر) وہ ان کی مدد کی (ہرگز) طاقت نہیں رکھتے۔ اور وہ ان کی فوج ہو کر حاضر کیے جائیں گے",
        "urduKanzulIman": "وہ ان کی مدد نہیں کرسکتے اور وہ ان کے لشکر سب گرفتار حاضر آئیں گے"
      },
      {
        "numberInSurah": 76,
        "arabic": "فَلَا يَحْزُنكَ قَوْلُهُمْ ۘ إِنَّا نَعْلَمُ مَا يُسِرُّونَ وَمَا يُعْلِنُونَ",
        "english": "So let not their speech grieve you. Indeed, We know what they conceal and what they declare.",
        "urduJalandhari": "تو ان کی باتیں تمہیں غمناک نہ کردیں۔ یہ جو کچھ چھپاتے اور جو کچھ ظاہر کرتے ہیں ہمیں سب معلوم ہے",
        "urduKanzulIman": "تو تم ان کی بات کا غم نہ کرو بیشک ہم جانتے ہیں جو وہ چھپاتے ہیں اور ظاہر کرتے ہیں"
      },
      {
        "numberInSurah": 77,
        "arabic": "أَوَلَمْ يَرَ ٱلْإِنسَٰنُ أَنَّا خَلَقْنَٰهُ مِن نُّطْفَةٍۢ فَإِذَا هُوَ خَصِيمٌۭ مُّبِينٌۭ",
        "english": "Does man not consider that We created him from a [mere] sperm-drop - then at once he is a clear adversary?",
        "urduJalandhari": "کیا انسان نے نہیں دیکھا کہ ہم نے اس کو نطفے سے پیدا کیا۔ پھر وہ تڑاق پڑاق جھگڑنے لگا",
        "urduKanzulIman": "اور کیا آدمی نے نہ دیکھا کہ ہم نے اسے پانی کی بوند سے بنایا جبھی وہ صریح جھگڑالو ہے"
      },
      {
        "numberInSurah": 78,
        "arabic": "وَضَرَبَ لَنَا مَثَلًۭا وَنَسِىَ خَلْقَهُۥ ۖ قَالَ مَن يُحْىِ ٱلْعِظَٰمَ وَهِىَ رَمِيمٌۭ",
        "english": "And he presents for Us an example and forgets his [own] creation. He says, \"Who will give life to bones while they are disintegrated?\"",
        "urduJalandhari": "اور ہمارے بارے میں مثالیں بیان کرنے لگا اور اپنی پیدائش کو بھول گیا۔ کہنے لگا کہ (جب) ہڈیاں بوسیدہ ہوجائیں گی تو ان کو کون زندہ کرے گا؟",
        "urduKanzulIman": "اور ہمارے لیے کہاوت کہتا ہے اور اپنی پیدائش بھول گیا بولا ایسا کون ہے کہ ہڈیوں کو زندہ کرے جب وہ بالکل گل گئیں،"
      },
      {
        "numberInSurah": 79,
        "arabic": "قُلْ يُحْيِيهَا ٱلَّذِىٓ أَنشَأَهَآ أَوَّلَ مَرَّةٍۢ ۖ وَهُوَ بِكُلِّ خَلْقٍ عَلِيمٌ",
        "english": "Say, \"He will give them life who produced them the first time; and He is, of all creation, Knowing.\"",
        "urduJalandhari": "کہہ دو کہ ان کو وہ زندہ کرے گا جس نے ان کو پہلی بار پیدا کیا تھا۔ اور وہ سب قسم کا پیدا کرنا جانتا ہے",
        "urduKanzulIman": "تم فرماؤ وہ زندہ کرے گا جس نے پہلی بار انہیں بنایا، اور اسے ہر پیدائش کا علم ہے"
      },
      {
        "numberInSurah": 80,
        "arabic": "ٱلَّذِى جَعَلَ لَكُم مِّنَ ٱلشَّجَرِ ٱلْأَخْضَرِ نَارًۭا فَإِذَآ أَنتُم مِّنْهُ تُوقِدُونَ",
        "english": "[It is] He who made for you from the green tree, fire, and then from it you ignite.",
        "urduJalandhari": "جس نے تمہارے لئے سبز درخت سے آگ پیدا کی پھر تم اس (کی ٹہنیوں کو رگڑ کر ان) سے آگ نکالتے ہو",
        "urduKanzulIman": "جس نے تمہارے لیے ہرے پیڑ میں ا ٓ گ پیدا کی جبھی تم اس سے سلگاتے ہو"
      },
      {
        "numberInSurah": 81,
        "arabic": "أَوَلَيْسَ ٱلَّذِى خَلَقَ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ بِقَٰدِرٍ عَلَىٰٓ أَن يَخْلُقَ مِثْلَهُم ۚ بَلَىٰ وَهُوَ ٱلْخَلَّٰقُ ٱلْعَلِيمُ",
        "english": "Is not He who created the heavens and the earth Able to create the likes of them? Yes, [it is so]; and He is the Knowing Creator.",
        "urduJalandhari": "بھلا جس نے آسمانوں اور زمین کو پیدا کیا، کیا وہ اس بات پر قادر نہیں کہ (ان کو پھر) ویسے ہی پیدا کر دے۔ کیوں نہیں۔ اور وہ تو بڑا پیدا کرنے والا اور علم والا ہے",
        "urduKanzulIman": "اور کیا وہ جس نے آسمان اور زمین بنائے ان جیسے اور نہیں بناسکتا کیوں نہیں اور وہی بڑا پیدا کرنے والا سب کچھ جانتا،"
      },
      {
        "numberInSurah": 82,
        "arabic": "إِنَّمَآ أَمْرُهُۥٓ إِذَآ أَرَادَ شَيْـًٔا أَن يَقُولَ لَهُۥ كُن فَيَكُونُ",
        "english": "His command is only when He intends a thing that He says to it, \"Be,\" and it is.",
        "urduJalandhari": "اس کی شان یہ ہے کہ جب وہ کسی چیز کا ارادہ کرتا ہے تو اس سے فرما دیتا ہے کہ ہوجا تو وہ ہوجاتی ہے",
        "urduKanzulIman": "اس کا کام تو یہی ہے کہ جب کسی چیز کو چاہے تو اس سے فرمائے ہو جا وہ فوراً ہوجاتی ہے،"
      },
      {
        "numberInSurah": 83,
        "arabic": "فَسُبْحَٰنَ ٱلَّذِى بِيَدِهِۦ مَلَكُوتُ كُلِّ شَىْءٍۢ وَإِلَيْهِ تُرْجَعُونَ",
        "english": "So exalted is He in whose hand is the realm of all things, and to Him you will be returned.",
        "urduJalandhari": "وہ (ذات) پاک ہے جس کے ہاتھ میں ہر چیز کی بادشاہت ہے اور اسی کی طرف تم کو لوٹ کر جانا ہے",
        "urduKanzulIman": "تو پاکی ہے، اسے جس کے ہاتھ ہر چیز کا قبضہ ہے، اور اسی کی طرف پھیرے جاؤ گے"
      }
    ]
  },
  {
    "id": "al_kahf_first_10",
    "surahNumber": 18,
    "nameEn": "Surah Al-Kahf (First 10)",
    "nameUr": "سورۃ الکہف (پہلی ۱۰ آیات)",
    "titleEn": "First 10 Ayahs of The Cave",
    "titleUr": "پہلی دس آیات",
    "virtueEn": "Whoever memorizes the first ten verses of Surah Al-Kahf will be protected from the trial of Dajjal (Sahih Muslim).",
    "virtueUr": "جو سورۃ الکہف کی پہلی دس آیات یاد کرے وہ دجال کے فتنے سے محفوظ رہے گا (صحیح مسلم)۔",
    "fullSurah": false,
    "totalAyahs": 10,
    "ayahs": [
      {
        "numberInSurah": 1,
        "arabic": "ٱلْحَمْدُ لِلَّهِ ٱلَّذِىٓ أَنزَلَ عَلَىٰ عَبْدِهِ ٱلْكِتَٰبَ وَلَمْ يَجْعَل لَّهُۥ عِوَجَا ۜ",
        "english": "[All] praise is [due] to Allah, who has sent down upon His Servant the Book and has not made therein any deviance.",
        "urduJalandhari": "سب تعریف خدا ہی کو ہے جس نے اپنے بندے (محمدﷺ) پر (یہ) کتاب نازل کی اور اس میں کسی طرح کی کجی (اور پیچیدگی) نہ رکھی",
        "urduKanzulIman": "سب خوبیاں اللہ کو جس نے اپنے بندے پر کتاب اتاری اور اس میں اصلاً (بالکل، ذرا بھی) کجی نہ رکھی،"
      },
      {
        "numberInSurah": 2,
        "arabic": "قَيِّمًۭا لِّيُنذِرَ بَأْسًۭا شَدِيدًۭا مِّن لَّدُنْهُ وَيُبَشِّرَ ٱلْمُؤْمِنِينَ ٱلَّذِينَ يَعْمَلُونَ ٱلصَّٰلِحَٰتِ أَنَّ لَهُمْ أَجْرًا حَسَنًۭا",
        "english": "[He has made it] straight, to warn of severe punishment from Him and to give good tidings to the believers who do righteous deeds that they will have a good reward",
        "urduJalandhari": "سیدھی (اور سلیس اتاری) تاکہ لوگوں کو عذاب سخت سے جو اس کی طرف سے (آنے والا) ہے ڈرائے اور مومنوں کو جو نیک عمل کرتے ہیں خوشخبری سنائے کہ اُن کے لئے (ان کے کاموں کا) نیک بدلہ (یعنی) بہشت ہے",
        "urduKanzulIman": "عدل والی کتاب کہ اللہ کے سخت عذاب سے ڈرائے اور ایمان والوں کو جو نیک کام کریں بشارت دے کہ ان کے لیے اچھا ثواب ہے،"
      },
      {
        "numberInSurah": 3,
        "arabic": "مَّٰكِثِينَ فِيهِ أَبَدًۭا",
        "english": "In which they will remain forever",
        "urduJalandhari": "جس میں وہ ابدا لاآباد رہیں گے",
        "urduKanzulIman": "جس میں ہمیشہ رہیں گے،"
      },
      {
        "numberInSurah": 4,
        "arabic": "وَيُنذِرَ ٱلَّذِينَ قَالُوا۟ ٱتَّخَذَ ٱللَّهُ وَلَدًۭا",
        "english": "And to warn those who say, \"Allah has taken a son.\"",
        "urduJalandhari": "اور ان لوگوں کو بھی ڈرائے جو کہتے ہیں کہ خدا نے (کسی کو) بیٹا بنا لیا ہے",
        "urduKanzulIman": "اور ان کو ڈرائے جو کہتے ہیں کہ اللہ نے اپنا کوئی بچہ بنایا،"
      },
      {
        "numberInSurah": 5,
        "arabic": "مَّا لَهُم بِهِۦ مِنْ عِلْمٍۢ وَلَا لِءَابَآئِهِمْ ۚ كَبُرَتْ كَلِمَةًۭ تَخْرُجُ مِنْ أَفْوَٰهِهِمْ ۚ إِن يَقُولُونَ إِلَّا كَذِبًۭا",
        "english": "They have no knowledge of it, nor had their fathers. Grave is the word that comes out of their mouths; they speak not except a lie.",
        "urduJalandhari": "ان کو اس بات کا کچھ بھی علم نہیں اور نہ ان کے باپ دادا ہی کو تھا۔ (یہ) بڑی سخت بات ہے جو ان کے منہ سے نکلتی ہے (اور کچھ شک نہیں) کہ یہ جو کہتے ہیں محض جھوٹ ہے",
        "urduKanzulIman": "اس بارے میں نہ وہ کچھ علم رکھتے ہیں نہ ان کے باپ دادا کتنا بڑا بول ہے کہ ان کے منہ سے نکلتا ہے، نِرا جھوٹ کہہ رہے ہیں،"
      },
      {
        "numberInSurah": 6,
        "arabic": "فَلَعَلَّكَ بَٰخِعٌۭ نَّفْسَكَ عَلَىٰٓ ءَاثَٰرِهِمْ إِن لَّمْ يُؤْمِنُوا۟ بِهَٰذَا ٱلْحَدِيثِ أَسَفًا",
        "english": "Then perhaps you would kill yourself through grief over them, [O Muhammad], if they do not believe in this message, [and] out of sorrow.",
        "urduJalandhari": "(اے پیغمبر) اگر یہ اس کلام پر ایمان نہ لائیں تو شاید تم کے ان پیچھے رنج کر کر کے اپنے تئیں ہلاک کردو گے",
        "urduKanzulIman": "تو کہیں تم اپنی جان پر کھیل جاؤ گے ان کے پیچھے اگر وہ اس بات پر ایمان نہ لائیں غم سے"
      },
      {
        "numberInSurah": 7,
        "arabic": "إِنَّا جَعَلْنَا مَا عَلَى ٱلْأَرْضِ زِينَةًۭ لَّهَا لِنَبْلُوَهُمْ أَيُّهُمْ أَحْسَنُ عَمَلًۭا",
        "english": "Indeed, We have made that which is on the earth adornment for it that We may test them [as to] which of them is best in deed.",
        "urduJalandhari": "جو چیز زمین پر ہے ہم نے اس کو زمین کے لئے آرائش بنایا ہے تاکہ لوگوں کی آزمائش کریں کہ ان میں کون اچھے عمل کرنے والا ہے",
        "urduKanzulIman": "بیشک ہم نے زمین کا سنگھار کیا جو کچھ اس پر ہے کہ انہیں آزمائیں ان میں کس کے کام بہتر ہیں"
      },
      {
        "numberInSurah": 8,
        "arabic": "وَإِنَّا لَجَٰعِلُونَ مَا عَلَيْهَا صَعِيدًۭا جُرُزًا",
        "english": "And indeed, We will make that which is upon it [into] a barren ground.",
        "urduJalandhari": "اور جو چیز زمین پر ہے ہم اس کو (نابود کرکے) بنجر میدان کردیں گے",
        "urduKanzulIman": "اور بیشک جو کچھ اس پر ہے ایک دن ہم اسے پٹ پر میدان (سفید زمین) کو چھوڑیں گے"
      },
      {
        "numberInSurah": 9,
        "arabic": "أَمْ حَسِبْتَ أَنَّ أَصْحَٰبَ ٱلْكَهْفِ وَٱلرَّقِيمِ كَانُوا۟ مِنْ ءَايَٰتِنَا عَجَبًا",
        "english": "Or have you thought that the companions of the cave and the inscription were, among Our signs, a wonder?",
        "urduJalandhari": "کیا تم خیال کرتے ہو کہ غار اور لوح والے ہمارے نشانیوں میں سے عجیب تھے",
        "urduKanzulIman": "کیا تمہیں معلوم ہوا کہ پہاڑ کی کھوہ اور جنگل کے کنارے والے ہماری ایک عجیب نشانی تھے،"
      },
      {
        "numberInSurah": 10,
        "arabic": "إِذْ أَوَى ٱلْفِتْيَةُ إِلَى ٱلْكَهْفِ فَقَالُوا۟ رَبَّنَآ ءَاتِنَا مِن لَّدُنكَ رَحْمَةًۭ وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًۭا",
        "english": "[Mention] when the youths retreated to the cave and said, \"Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance.\"",
        "urduJalandhari": "جب وہ جوان غار میں جا رہے تو کہنے لگے کہ اے ہمارے پروردگار ہم پر اپنے ہاں سے رحمت نازل فرما۔ اور ہمارے کام درستی (کے سامان) مہیا کر",
        "urduKanzulIman": "جب ان نوجوانوں نے غار میں پناہ لی پھر بولے اے ہمارے رب ہمیں اپنے پاس سے رحمت دے اور ہمارے کام میں ہمارے لیے راہ یابی کے سامان کر،"
      }
    ]
  },
  {
    "id": "al_kahf_full",
    "surahNumber": 18,
    "nameEn": "Surah Al-Kahf (Full Surah)",
    "nameUr": "سورۃ الکہف (مکمل سورۃ)",
    "titleEn": "The Cave (Full)",
    "titleUr": "مکمل سورۃ",
    "virtueEn": "Recited on Friday: illuminating light shines for the reciter from one Friday to the next (Al-Hakim).",
    "virtueUr": "جمعۃ المبارک کی مسنون تلاوت: پڑھنے والے کیلئے دو جمعوں کے درمیان نور روشن رہتا ہے (مستدرک حاکم)۔",
    "fullSurah": true,
    "totalAyahs": 110,
    "ayahs": [
      {
        "numberInSurah": 1,
        "arabic": "ٱلْحَمْدُ لِلَّهِ ٱلَّذِىٓ أَنزَلَ عَلَىٰ عَبْدِهِ ٱلْكِتَٰبَ وَلَمْ يَجْعَل لَّهُۥ عِوَجَا ۜ",
        "english": "[All] praise is [due] to Allah, who has sent down upon His Servant the Book and has not made therein any deviance.",
        "urduJalandhari": "سب تعریف خدا ہی کو ہے جس نے اپنے بندے (محمدﷺ) پر (یہ) کتاب نازل کی اور اس میں کسی طرح کی کجی (اور پیچیدگی) نہ رکھی",
        "urduKanzulIman": "سب خوبیاں اللہ کو جس نے اپنے بندے پر کتاب اتاری اور اس میں اصلاً (بالکل، ذرا بھی) کجی نہ رکھی،"
      },
      {
        "numberInSurah": 2,
        "arabic": "قَيِّمًۭا لِّيُنذِرَ بَأْسًۭا شَدِيدًۭا مِّن لَّدُنْهُ وَيُبَشِّرَ ٱلْمُؤْمِنِينَ ٱلَّذِينَ يَعْمَلُونَ ٱلصَّٰلِحَٰتِ أَنَّ لَهُمْ أَجْرًا حَسَنًۭا",
        "english": "[He has made it] straight, to warn of severe punishment from Him and to give good tidings to the believers who do righteous deeds that they will have a good reward",
        "urduJalandhari": "سیدھی (اور سلیس اتاری) تاکہ لوگوں کو عذاب سخت سے جو اس کی طرف سے (آنے والا) ہے ڈرائے اور مومنوں کو جو نیک عمل کرتے ہیں خوشخبری سنائے کہ اُن کے لئے (ان کے کاموں کا) نیک بدلہ (یعنی) بہشت ہے",
        "urduKanzulIman": "عدل والی کتاب کہ اللہ کے سخت عذاب سے ڈرائے اور ایمان والوں کو جو نیک کام کریں بشارت دے کہ ان کے لیے اچھا ثواب ہے،"
      },
      {
        "numberInSurah": 3,
        "arabic": "مَّٰكِثِينَ فِيهِ أَبَدًۭا",
        "english": "In which they will remain forever",
        "urduJalandhari": "جس میں وہ ابدا لاآباد رہیں گے",
        "urduKanzulIman": "جس میں ہمیشہ رہیں گے،"
      },
      {
        "numberInSurah": 4,
        "arabic": "وَيُنذِرَ ٱلَّذِينَ قَالُوا۟ ٱتَّخَذَ ٱللَّهُ وَلَدًۭا",
        "english": "And to warn those who say, \"Allah has taken a son.\"",
        "urduJalandhari": "اور ان لوگوں کو بھی ڈرائے جو کہتے ہیں کہ خدا نے (کسی کو) بیٹا بنا لیا ہے",
        "urduKanzulIman": "اور ان کو ڈرائے جو کہتے ہیں کہ اللہ نے اپنا کوئی بچہ بنایا،"
      },
      {
        "numberInSurah": 5,
        "arabic": "مَّا لَهُم بِهِۦ مِنْ عِلْمٍۢ وَلَا لِءَابَآئِهِمْ ۚ كَبُرَتْ كَلِمَةًۭ تَخْرُجُ مِنْ أَفْوَٰهِهِمْ ۚ إِن يَقُولُونَ إِلَّا كَذِبًۭا",
        "english": "They have no knowledge of it, nor had their fathers. Grave is the word that comes out of their mouths; they speak not except a lie.",
        "urduJalandhari": "ان کو اس بات کا کچھ بھی علم نہیں اور نہ ان کے باپ دادا ہی کو تھا۔ (یہ) بڑی سخت بات ہے جو ان کے منہ سے نکلتی ہے (اور کچھ شک نہیں) کہ یہ جو کہتے ہیں محض جھوٹ ہے",
        "urduKanzulIman": "اس بارے میں نہ وہ کچھ علم رکھتے ہیں نہ ان کے باپ دادا کتنا بڑا بول ہے کہ ان کے منہ سے نکلتا ہے، نِرا جھوٹ کہہ رہے ہیں،"
      },
      {
        "numberInSurah": 6,
        "arabic": "فَلَعَلَّكَ بَٰخِعٌۭ نَّفْسَكَ عَلَىٰٓ ءَاثَٰرِهِمْ إِن لَّمْ يُؤْمِنُوا۟ بِهَٰذَا ٱلْحَدِيثِ أَسَفًا",
        "english": "Then perhaps you would kill yourself through grief over them, [O Muhammad], if they do not believe in this message, [and] out of sorrow.",
        "urduJalandhari": "(اے پیغمبر) اگر یہ اس کلام پر ایمان نہ لائیں تو شاید تم کے ان پیچھے رنج کر کر کے اپنے تئیں ہلاک کردو گے",
        "urduKanzulIman": "تو کہیں تم اپنی جان پر کھیل جاؤ گے ان کے پیچھے اگر وہ اس بات پر ایمان نہ لائیں غم سے"
      },
      {
        "numberInSurah": 7,
        "arabic": "إِنَّا جَعَلْنَا مَا عَلَى ٱلْأَرْضِ زِينَةًۭ لَّهَا لِنَبْلُوَهُمْ أَيُّهُمْ أَحْسَنُ عَمَلًۭا",
        "english": "Indeed, We have made that which is on the earth adornment for it that We may test them [as to] which of them is best in deed.",
        "urduJalandhari": "جو چیز زمین پر ہے ہم نے اس کو زمین کے لئے آرائش بنایا ہے تاکہ لوگوں کی آزمائش کریں کہ ان میں کون اچھے عمل کرنے والا ہے",
        "urduKanzulIman": "بیشک ہم نے زمین کا سنگھار کیا جو کچھ اس پر ہے کہ انہیں آزمائیں ان میں کس کے کام بہتر ہیں"
      },
      {
        "numberInSurah": 8,
        "arabic": "وَإِنَّا لَجَٰعِلُونَ مَا عَلَيْهَا صَعِيدًۭا جُرُزًا",
        "english": "And indeed, We will make that which is upon it [into] a barren ground.",
        "urduJalandhari": "اور جو چیز زمین پر ہے ہم اس کو (نابود کرکے) بنجر میدان کردیں گے",
        "urduKanzulIman": "اور بیشک جو کچھ اس پر ہے ایک دن ہم اسے پٹ پر میدان (سفید زمین) کو چھوڑیں گے"
      },
      {
        "numberInSurah": 9,
        "arabic": "أَمْ حَسِبْتَ أَنَّ أَصْحَٰبَ ٱلْكَهْفِ وَٱلرَّقِيمِ كَانُوا۟ مِنْ ءَايَٰتِنَا عَجَبًا",
        "english": "Or have you thought that the companions of the cave and the inscription were, among Our signs, a wonder?",
        "urduJalandhari": "کیا تم خیال کرتے ہو کہ غار اور لوح والے ہمارے نشانیوں میں سے عجیب تھے",
        "urduKanzulIman": "کیا تمہیں معلوم ہوا کہ پہاڑ کی کھوہ اور جنگل کے کنارے والے ہماری ایک عجیب نشانی تھے،"
      },
      {
        "numberInSurah": 10,
        "arabic": "إِذْ أَوَى ٱلْفِتْيَةُ إِلَى ٱلْكَهْفِ فَقَالُوا۟ رَبَّنَآ ءَاتِنَا مِن لَّدُنكَ رَحْمَةًۭ وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًۭا",
        "english": "[Mention] when the youths retreated to the cave and said, \"Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance.\"",
        "urduJalandhari": "جب وہ جوان غار میں جا رہے تو کہنے لگے کہ اے ہمارے پروردگار ہم پر اپنے ہاں سے رحمت نازل فرما۔ اور ہمارے کام درستی (کے سامان) مہیا کر",
        "urduKanzulIman": "جب ان نوجوانوں نے غار میں پناہ لی پھر بولے اے ہمارے رب ہمیں اپنے پاس سے رحمت دے اور ہمارے کام میں ہمارے لیے راہ یابی کے سامان کر،"
      },
      {
        "numberInSurah": 11,
        "arabic": "فَضَرَبْنَا عَلَىٰٓ ءَاذَانِهِمْ فِى ٱلْكَهْفِ سِنِينَ عَدَدًۭا",
        "english": "So We cast [a cover of sleep] over their ears within the cave for a number of years.",
        "urduJalandhari": "تو ہم نے غار میں کئی سال تک ان کے کانوں پر (نیند کا) پردہ ڈالے (یعنی ان کو سلائے) رکھا",
        "urduKanzulIman": "تو ہم نے اس غار میں ان کے کے کانوں پر گنتی کے کئی برس تھپکا"
      },
      {
        "numberInSurah": 12,
        "arabic": "ثُمَّ بَعَثْنَٰهُمْ لِنَعْلَمَ أَىُّ ٱلْحِزْبَيْنِ أَحْصَىٰ لِمَا لَبِثُوٓا۟ أَمَدًۭا",
        "english": "Then We awakened them that We might show which of the two factions was most precise in calculating what [extent] they had remained in time.",
        "urduJalandhari": "پھر ان کو جگا اُٹھایا تاکہ معلوم کریں کہ جتنی مدّت وہ (غار میں) رہے دونوں جماعتوں میں سے اس کی مقدار کس کو خوب یاد ہے",
        "urduKanzulIman": "پھر ہم نے انھیں جگایا کہ دیکھیں دو گروہوں میں کون ان کے ٹھہرنے کی مدت زیادہ ٹھیک بتاتا ہے،"
      },
      {
        "numberInSurah": 13,
        "arabic": "نَّحْنُ نَقُصُّ عَلَيْكَ نَبَأَهُم بِٱلْحَقِّ ۚ إِنَّهُمْ فِتْيَةٌ ءَامَنُوا۟ بِرَبِّهِمْ وَزِدْنَٰهُمْ هُدًۭى",
        "english": "It is We who relate to you, [O Muhammad], their story in truth. Indeed, they were youths who believed in their Lord, and We increased them in guidance.",
        "urduJalandhari": "ہم اُن کے حالات تم سے صحیح صحیح بیان کرتے ہیں۔ وہ کئی جوان تھے جو اپنے پروردگار پر ایمان لائے تھے اور ہم نے ان کو اور زیادہ ہدایت دی تھی",
        "urduKanzulIman": "ہم ان کا ٹھیک ٹھیک حال تمہیں سنائیں، وہ کچھ جوان تھے کہ اپنے رب پر ایمان لائے اور ہم نے ان کو ہدایت بڑھائی،"
      },
      {
        "numberInSurah": 14,
        "arabic": "وَرَبَطْنَا عَلَىٰ قُلُوبِهِمْ إِذْ قَامُوا۟ فَقَالُوا۟ رَبُّنَا رَبُّ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضِ لَن نَّدْعُوَا۟ مِن دُونِهِۦٓ إِلَٰهًۭا ۖ لَّقَدْ قُلْنَآ إِذًۭا شَطَطًا",
        "english": "And We made firm their hearts when they stood up and said, \"Our Lord is the Lord of the heavens and the earth. Never will we invoke besides Him any deity. We would have certainly spoken, then, an excessive transgression.",
        "urduJalandhari": "اور ان کے دلوں کو مربوط (یعنی مضبوط) کردیا۔ جب وہ (اُٹھ) کھڑے ہوئے تو کہنے لگے کہ ہمارا پروردگار آسمانوں اور زمین کا مالک ہے۔ ہم اس کے سوا کسی کو معبود (سمجھ کر) نہ پکاریں گے (اگر ایسا کیا) تو اس وقت ہم نے بعید از عقل بات کہی",
        "urduKanzulIman": "اور ہم نے ان کی ڈھارس بندھائی جب کھڑے ہوکر بولے کہ ہمارا رب وہ ہے جو آسمان اور زمین کا رب ہے ہم اس کے سوا کسی معبود کو نہ پوجیں گے ایسا ہو تو ہم نے ضرور حد سے گزری ہوئی بات کہی،"
      },
      {
        "numberInSurah": 15,
        "arabic": "هَٰٓؤُلَآءِ قَوْمُنَا ٱتَّخَذُوا۟ مِن دُونِهِۦٓ ءَالِهَةًۭ ۖ لَّوْلَا يَأْتُونَ عَلَيْهِم بِسُلْطَٰنٍۭ بَيِّنٍۢ ۖ فَمَنْ أَظْلَمُ مِمَّنِ ٱفْتَرَىٰ عَلَى ٱللَّهِ كَذِبًۭا",
        "english": "These, our people, have taken besides Him deities. Why do they not bring for [worship of] them a clear authority? And who is more unjust than one who invents about Allah a lie?\"",
        "urduJalandhari": "ان ہماری قوم کے لوگوں نے اس کے سوا اور معبود بنا رکھے ہیں۔ بھلا یہ ان (کے خدا ہونے) پر کوئی کھلی دلیل کیوں نہیں لاتے۔ تو اس سے زیادہ کون ظالم ہے جو خدا پر جھوٹ افتراء کرے",
        "urduKanzulIman": "یہ جو ہماری قوم ہے اس نے اللہ کے سوا خدا بنا رکھے ہیں، کیوں نہیں لاتے ان پر کوئی روشن سند، تو اس سے بڑھ کر ظالم کون جو اللہ پر جھوٹ باندھے"
      },
      {
        "numberInSurah": 16,
        "arabic": "وَإِذِ ٱعْتَزَلْتُمُوهُمْ وَمَا يَعْبُدُونَ إِلَّا ٱللَّهَ فَأْوُۥٓا۟ إِلَى ٱلْكَهْفِ يَنشُرْ لَكُمْ رَبُّكُم مِّن رَّحْمَتِهِۦ وَيُهَيِّئْ لَكُم مِّنْ أَمْرِكُم مِّرْفَقًۭا",
        "english": "[The youths said to one another], \"And when you have withdrawn from them and that which they worship other than Allah, retreat to the cave. Your Lord will spread out for you of His mercy and will prepare for you from your affair facility.\"",
        "urduJalandhari": "اور جب تم نے ان (مشرکوں) سے اور جن کی یہ خدا کے سوا عبادت کرتے ہیں ان سے کنارہ کرلیا ہے تو غار میں چل رہو تمہارا پروردگار تمہارے لئے اپنی رحمت وسیع کردے گا اور تمہارے کاموں میں آسانی (کے سامان) مہیا کرے گا",
        "urduKanzulIman": "اور جب تم ان سے اور جو کچھ وہ اللہ سوا پوجتے ہیں سب سے الگ ہوجاؤ تو غار میں پناہ لو تمہارا رب تمہارے لیے اپنی رحمت پھیلادے گا اور تمہارے کام میں آسانی کے سامان بنادے گا،"
      },
      {
        "numberInSurah": 17,
        "arabic": "۞ وَتَرَى ٱلشَّمْسَ إِذَا طَلَعَت تَّزَٰوَرُ عَن كَهْفِهِمْ ذَاتَ ٱلْيَمِينِ وَإِذَا غَرَبَت تَّقْرِضُهُمْ ذَاتَ ٱلشِّمَالِ وَهُمْ فِى فَجْوَةٍۢ مِّنْهُ ۚ ذَٰلِكَ مِنْ ءَايَٰتِ ٱللَّهِ ۗ مَن يَهْدِ ٱللَّهُ فَهُوَ ٱلْمُهْتَدِ ۖ وَمَن يُضْلِلْ فَلَن تَجِدَ لَهُۥ وَلِيًّۭا مُّرْشِدًۭا",
        "english": "And [had you been present], you would see the sun when it rose, inclining away from their cave on the right, and when it set, passing away from them on the left, while they were [laying] within an open space thereof. That was from the signs of Allah. He whom Allah guides is the [rightly] guided, but he whom He leaves astray - never will you find for him a protecting guide.",
        "urduJalandhari": "اور جب سورج نکلے تو تم دیکھو کہ (دھوپ) ان کے غار سے داہنی طرف سمٹ جائے اور جب غروب ہو تو ان سے بائیں طرف کترا جائے اور وہ اس کے میدان میں تھے۔ یہ خدا کی نشانیوں میں سے ہیں۔ جس کو خدا ہدایت دے یا وہ ہدایت یاب ہے اور جس کو گمراہ کرے تو تم اس کے لئے کوئی دوست راہ بتانے والا نہ پاؤ گے",
        "urduKanzulIman": "اور اے محبوب! تم سورج کو دیکھو گے کہ جب نکلتا ہے تو ان کے غار سے داہنی طرف بچ جاتا ہے اور جب ڈوبتا ہے تو ان سے بائیں طرف کترا جاتا ہے حالانکہ وہ اس غار کے کھلے میدان میں میں ہیں یہ اللہ کی نشانیوں میں سے ہے جسے اللہ راہ دے تو وہی راہ پر ہے، اور جسے گمراہ کرے تو ہرگز اس کا کوئی حمایتی راہ دکھانے والا نہ پاؤ گے،"
      },
      {
        "numberInSurah": 18,
        "arabic": "وَتَحْسَبُهُمْ أَيْقَاظًۭا وَهُمْ رُقُودٌۭ ۚ وَنُقَلِّبُهُمْ ذَاتَ ٱلْيَمِينِ وَذَاتَ ٱلشِّمَالِ ۖ وَكَلْبُهُم بَٰسِطٌۭ ذِرَاعَيْهِ بِٱلْوَصِيدِ ۚ لَوِ ٱطَّلَعْتَ عَلَيْهِمْ لَوَلَّيْتَ مِنْهُمْ فِرَارًۭا وَلَمُلِئْتَ مِنْهُمْ رُعْبًۭا",
        "english": "And you would think them awake, while they were asleep. And We turned them to the right and to the left, while their dog stretched his forelegs at the entrance. If you had looked at them, you would have turned from them in flight and been filled by them with terror.",
        "urduJalandhari": "اور تم ان کو خیال کرو کہ جاگ رہے ہیں حالانکہ وہ سوتے ہیں۔ اور ہم ان کو دائیں اور بائیں کروٹ بدلاتے تھے۔ اور ان کا کتا چوکھٹ پر دونوں ہاتھ پھیلائے ہوئے تھا۔ اگر تم ان کو جھانک کر دیکھتے تو پیٹھ پھیر کر بھاگ جاتے اور ان سے دہشت میں آجاتے",
        "urduKanzulIman": "اور تم انھیں جاگتا سمجھو اور وہ سوتے ہیں اور ہم ان کی داہنی بائیں کروٹیں بدلتے ہیں اور ان کا کتا اپنی کلائیاں پھیلائے ہوئے ہے غار کی چوکھٹ پر اے سننے! والے اگر تو انہیں جھانک کر دیکھے تو ان سے پیٹھ پھیر کر بھاگے اور ان سے ہیبت میں بھر جائے"
      },
      {
        "numberInSurah": 19,
        "arabic": "وَكَذَٰلِكَ بَعَثْنَٰهُمْ لِيَتَسَآءَلُوا۟ بَيْنَهُمْ ۚ قَالَ قَآئِلٌۭ مِّنْهُمْ كَمْ لَبِثْتُمْ ۖ قَالُوا۟ لَبِثْنَا يَوْمًا أَوْ بَعْضَ يَوْمٍۢ ۚ قَالُوا۟ رَبُّكُمْ أَعْلَمُ بِمَا لَبِثْتُمْ فَٱبْعَثُوٓا۟ أَحَدَكُم بِوَرِقِكُمْ هَٰذِهِۦٓ إِلَى ٱلْمَدِينَةِ فَلْيَنظُرْ أَيُّهَآ أَزْكَىٰ طَعَامًۭا فَلْيَأْتِكُم بِرِزْقٍۢ مِّنْهُ وَلْيَتَلَطَّفْ وَلَا يُشْعِرَنَّ بِكُمْ أَحَدًا",
        "english": "And similarly, We awakened them that they might question one another. Said a speaker from among them, \"How long have you remained [here]?\" They said, \"We have remained a day or part of a day.\" They said, \"Your Lord is most knowing of how long you remained. So send one of you with this silver coin of yours to the city and let him look to which is the best of food and bring you provision from it and let him be cautious. And let no one be aware of you.",
        "urduJalandhari": "اور اس طرح ہم نے ان کو اٹھایا تاکہ آپس میں ایک دوسرے سے دریافت کریں۔ ایک کہنے والے نے کہا کہ تم (یہاں) کتنی مدت رہے؟ انہوں نے کہا کہ ایک دن یا اس سے بھی کم۔ انہوں نے کہا کہ جتنی مدت تم رہے ہو تمہارا پروردگار ہی اس کو خوب جانتا ہے۔ تو اپنے میں سے کسی کو یہ روپیہ دے کر شہر کو بھیجو وہ دیکھے کہ نفیس کھانا کون سا ہے تو اس میں سے کھانا لے آئے اور آہستہ آہستہ آئے جائے اور تمہارا حال کسی کو نہ بتائے",
        "urduKanzulIman": "اور یوں ہی ہم نے ان کو جگایا کہ آپس میں ایک دوسرے سے احوال پوچھیں ان میں ایک کہنے والا بولا تم یہاں کتنی دیر رہے، کچھ بولے کہ ایک دن رہے یا دن سے کم دوسرے بولے تمہارا رب خوب جانتا ہے جتنا تم ٹھہرے تو اپنے میں ایک کو یہ چاندی لے کر شہر میں بھیجو پھر وہ غور کرے کہ وہاں کون سا کھانا زیادہ ستھرا ہے کہ تمہارے لیے اس میں سے کھانے کو لائے اور چاہیے کہ نرمی کرے اور ہرگز کسی کو تمہاری اطلاع نہ دے،"
      },
      {
        "numberInSurah": 20,
        "arabic": "إِنَّهُمْ إِن يَظْهَرُوا۟ عَلَيْكُمْ يَرْجُمُوكُمْ أَوْ يُعِيدُوكُمْ فِى مِلَّتِهِمْ وَلَن تُفْلِحُوٓا۟ إِذًا أَبَدًۭا",
        "english": "Indeed, if they come to know of you, they will stone you or return you to their religion. And never would you succeed, then - ever.\"",
        "urduJalandhari": "اگر وہ تم پر دسترس پالیں گے تو تمہیں سنگسار کردیں گے یا پھر اپنے مذہب میں داخل کرلیں گے اور اس وقت تم کبھی فلاح نہیں پاؤ گے",
        "urduKanzulIman": "بیشک اگر وہ تمہیں جان لیں گے تو تمہیں پتھراؤ کریں گے یا اپنے دین میں پھیر لیں گے اور ایسا ہوا تو تمہارا کبھی بھلا نہ ہوگا،"
      },
      {
        "numberInSurah": 21,
        "arabic": "وَكَذَٰلِكَ أَعْثَرْنَا عَلَيْهِمْ لِيَعْلَمُوٓا۟ أَنَّ وَعْدَ ٱللَّهِ حَقٌّۭ وَأَنَّ ٱلسَّاعَةَ لَا رَيْبَ فِيهَآ إِذْ يَتَنَٰزَعُونَ بَيْنَهُمْ أَمْرَهُمْ ۖ فَقَالُوا۟ ٱبْنُوا۟ عَلَيْهِم بُنْيَٰنًۭا ۖ رَّبُّهُمْ أَعْلَمُ بِهِمْ ۚ قَالَ ٱلَّذِينَ غَلَبُوا۟ عَلَىٰٓ أَمْرِهِمْ لَنَتَّخِذَنَّ عَلَيْهِم مَّسْجِدًۭا",
        "english": "And similarly, We caused them to be found that they [who found them] would know that the promise of Allah is truth and that of the Hour there is no doubt. [That was] when they disputed among themselves about their affair and [then] said, \"Construct over them a structure. Their Lord is most knowing about them.\" Said those who prevailed in the matter, \"We will surely take [for ourselves] over them a masjid.\"",
        "urduJalandhari": "اور اسی طرح ہم نے (لوگوں کو) ان (کے حال) سے خبردار کردیا تاکہ وہ جانیں کہ خدا کا وعدہ سچا ہے اور یہ کہ قیامت (جس کا وعدہ کیا جاتا ہے) اس میں کچھ شک نہیں۔ اس وقت لوگ ان کے بارے میں باہم جھگڑنے لگے اور کہنے لگے کہ ان (کے غار) پر عمارت بنا دو۔ ان کا پروردگار ان (کے حال) سے خوب واقف ہے۔ جو لوگ ان کے معاملے میں غلبہ رکھتے تھے وہ کہنے لگے کہ ہم ان (کے غار) پر مسجد بنائیں گے",
        "urduKanzulIman": "اور اسی طرح ہم نے ان کی اطلاع کردی کہ لوگ جان لیں کہ اللہ کا وعدہ سچا ہے اور قیامت میں کچھ شبہ نہیں، جب وہ لوگ ان کے معاملہ میں باہم جھگڑنے لگے تو بولے ان کے غار پر کوئی عمارت بناؤ، ان کا رب انہیں خوب جانتا ہے، وہ بولے جو اس کام میں غالب رہے تھے قسم ہے کہ ہم تو ان پر مسجد بنائیں گے"
      },
      {
        "numberInSurah": 22,
        "arabic": "سَيَقُولُونَ ثَلَٰثَةٌۭ رَّابِعُهُمْ كَلْبُهُمْ وَيَقُولُونَ خَمْسَةٌۭ سَادِسُهُمْ كَلْبُهُمْ رَجْمًۢا بِٱلْغَيْبِ ۖ وَيَقُولُونَ سَبْعَةٌۭ وَثَامِنُهُمْ كَلْبُهُمْ ۚ قُل رَّبِّىٓ أَعْلَمُ بِعِدَّتِهِم مَّا يَعْلَمُهُمْ إِلَّا قَلِيلٌۭ ۗ فَلَا تُمَارِ فِيهِمْ إِلَّا مِرَآءًۭ ظَٰهِرًۭا وَلَا تَسْتَفْتِ فِيهِم مِّنْهُمْ أَحَدًۭا",
        "english": "They will say there were three, the fourth of them being their dog; and they will say there were five, the sixth of them being their dog - guessing at the unseen; and they will say there were seven, and the eighth of them was their dog. Say, [O Muhammad], \"My Lord is most knowing of their number. None knows them except a few. So do not argue about them except with an obvious argument and do not inquire about them among [the speculators] from anyone.\"",
        "urduJalandhari": "(بعض لوگ) اٹکل پچو کہیں گے کہ وہ تین تھے (اور) چوتھا ان کا کتّا تھا۔ اور (بعض) کہیں گے کہ وہ پانچ تھے اور چھٹا ان کا کتّا تھا۔ اور (بعض) کہیں گے کہ وہ سات تھے اور آٹھواں ان کا کتّا تھا۔ کہہ دو کہ میرا پروردگار ہی ان کے شمار سے خوب واقف ہے ان کو جانتے بھی ہیں تو تھوڑے ہی لوگ (جانتے ہیں) تو تم ان (کے معاملے) میں گفتگو نہ کرنا مگر سرسری سی گفتگو۔ اور نہ ان کے بارے میں ان میں کسی سے کچھ دریافت ہی کرنا",
        "urduKanzulIman": "اب کہیں گے کہ وہ تین ہیں چوتھا ان کا کتا اور کچھ کہیں گے پانچ ہیں، چھٹا ان کا کتا بے دیکھے الاؤتکا (تیر تکا) بات اور کچھ کہیں گے سات ہیں اور آٹھواں ان کا کتا تم فرماؤ میرا رب ان کی گنتی خوب جانتا ہے انہیں نہیں جانتے مگر تھوڑے تو ان کے بارے میں بحث نہ کرو مگر اتنی ہی بحث جو ظاہر ہوچکی"
      },
      {
        "numberInSurah": 23,
        "arabic": "وَلَا تَقُولَنَّ لِشَا۟ىْءٍ إِنِّى فَاعِلٌۭ ذَٰلِكَ غَدًا",
        "english": "And never say of anything, \"Indeed, I will do that tomorrow,\"",
        "urduJalandhari": "اور کسی کام کی نسبت نہ کہنا کہ میں اسے کل کردوں گا",
        "urduKanzulIman": "اور ان کے بارے میں کسی کتابی سے کچھ نہ پوچھو، اور ہر گز کسی بات کو نہ کہنا میں کل یہ کردوں گا،"
      },
      {
        "numberInSurah": 24,
        "arabic": "إِلَّآ أَن يَشَآءَ ٱللَّهُ ۚ وَٱذْكُر رَّبَّكَ إِذَا نَسِيتَ وَقُلْ عَسَىٰٓ أَن يَهْدِيَنِ رَبِّى لِأَقْرَبَ مِنْ هَٰذَا رَشَدًۭا",
        "english": "Except [when adding], \"If Allah wills.\" And remember your Lord when you forget [it] and say, \"Perhaps my Lord will guide me to what is nearer than this to right conduct.\"",
        "urduJalandhari": "مگر (انشاء الله کہہ کر یعنی اگر) خدا چاہے تو (کردوں گا) اور جب خدا کا نام لینا بھول جاؤ تو یاد آنے پر لے لو۔ اور کہہ دو کہ امید ہے کہ میرا پروردگار مجھے اس سے بھی زیادہ ہدایت کی باتیں بتائے",
        "urduKanzulIman": "مگر یہ کہ اللہ چاہے اور اپنے رب کی یاد کر جب تو بھول جائے اور یوں کہو کہ قریب ہے میرا رب مجھے اس سے نزدیک تو راستی کی راہ دکھائے،"
      },
      {
        "numberInSurah": 25,
        "arabic": "وَلَبِثُوا۟ فِى كَهْفِهِمْ ثَلَٰثَ مِا۟ئَةٍۢ سِنِينَ وَٱزْدَادُوا۟ تِسْعًۭا",
        "english": "And they remained in their cave for three hundred years and exceeded by nine.",
        "urduJalandhari": "اور اصحاب کہف اپنے غار میں نو اوپر تین سو سال رہے",
        "urduKanzulIman": "اور وہ اپنے غار میں تین سو برس ٹھہرے نو اوپر، ف۵۲)"
      },
      {
        "numberInSurah": 26,
        "arabic": "قُلِ ٱللَّهُ أَعْلَمُ بِمَا لَبِثُوا۟ ۖ لَهُۥ غَيْبُ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضِ ۖ أَبْصِرْ بِهِۦ وَأَسْمِعْ ۚ مَا لَهُم مِّن دُونِهِۦ مِن وَلِىٍّۢ وَلَا يُشْرِكُ فِى حُكْمِهِۦٓ أَحَدًۭا",
        "english": "Say, \"Allah is most knowing of how long they remained. He has [knowledge of] the unseen [aspects] of the heavens and the earth. How Seeing is He and how Hearing! They have not besides Him any protector, and He shares not His legislation with anyone.\"",
        "urduJalandhari": "کہہ دو کہ جتنی مدّت وہ رہے اسے خدا ہی خوب جانتا ہے۔ اسی کو آسمانوں اور زمین کی پوشیدہ باتیں (معلوم) ہیں۔ وہ کیا خوب دیکھنے والا اور کیا خوب سننے والا ہے۔ اس کے سوا ان کا کوئی کارساز نہیں اور نہ وہ اپنے حکم میں کسی شریک کو کرتا ہے",
        "urduKanzulIman": "تم فرماؤ اللہ خوب جانتا ہے وہ جتنا ٹھہرے اسی کے لیے ہیں آسمانوں اور زمینوں کے سب غیب، وہ کیا ہی دیکھتا اور کیا ہی سنتا ہے اس کے سوا ان کا کوئی والی نہیں، اور وہ اپنے حکم میں کسی کو شریک نہیں کرتا،"
      },
      {
        "numberInSurah": 27,
        "arabic": "وَٱتْلُ مَآ أُوحِىَ إِلَيْكَ مِن كِتَابِ رَبِّكَ ۖ لَا مُبَدِّلَ لِكَلِمَٰتِهِۦ وَلَن تَجِدَ مِن دُونِهِۦ مُلْتَحَدًۭا",
        "english": "And recite, [O Muhammad], what has been revealed to you of the Book of your Lord. There is no changer of His words, and never will you find in other than Him a refuge.",
        "urduJalandhari": "اور اپنے پروردگار کی کتاب جو تمہارے پاس بھیجی جاتی ہے پڑھتے رہا کرو۔ اس کی باتوں کو کوئی بدلنے والا نہیں۔ اور اس کے سوا تم کہیں پناہ کی جگہ بھی نہیں پاؤ گے",
        "urduKanzulIman": "اور تلاوت کرو جو تمہارے رب کی کتاب تمہیں وحی ہوئی اس کی باتوں کا کوئی بدلنے والا نہیں اور ہرگز تم اس کے سوا پناہ نہ پاؤ گے،"
      },
      {
        "numberInSurah": 28,
        "arabic": "وَٱصْبِرْ نَفْسَكَ مَعَ ٱلَّذِينَ يَدْعُونَ رَبَّهُم بِٱلْغَدَوٰةِ وَٱلْعَشِىِّ يُرِيدُونَ وَجْهَهُۥ ۖ وَلَا تَعْدُ عَيْنَاكَ عَنْهُمْ تُرِيدُ زِينَةَ ٱلْحَيَوٰةِ ٱلدُّنْيَا ۖ وَلَا تُطِعْ مَنْ أَغْفَلْنَا قَلْبَهُۥ عَن ذِكْرِنَا وَٱتَّبَعَ هَوَىٰهُ وَكَانَ أَمْرُهُۥ فُرُطًۭا",
        "english": "And keep yourself patient [by being] with those who call upon their Lord in the morning and the evening, seeking His countenance. And let not your eyes pass beyond them, desiring adornments of the worldly life, and do not obey one whose heart We have made heedless of Our remembrance and who follows his desire and whose affair is ever [in] neglect.",
        "urduJalandhari": "اور جو لوگ صبح و شام اپنے پروردگار کو پکارتے اور اس کی خوشنودی کے طالب ہیں۔ ان کے ساتھ صبر کرتے رہو۔ اور تمہاری نگاہیں ان میں (گزر کر اور طرف) نہ دوڑیں کہ تم آرائشِ زندگانی دنیا کے خواستگار ہوجاؤ۔ اور جس شخص کے دل کو ہم نے اپنی یاد سے غافل کردیا ہے اور وہ اپنی خواہش کی پیروی کرتا ہے اور اس کا کام حد سے بڑھ گیا ہے اس کا کہا نہ ماننا",
        "urduKanzulIman": "اور اپنی جان ان سے مانوس رکھو جو صبح و شام اپنے رب کو پکارتے ہیں اس کی رضا چاہتے ہیں اور تمہاری آنکھیں انہیں چھوڑ کر اور پر نہ پڑیں کیا تم دنیا کی زندگانی کا سنگھار چاہو گے، اور اس کا کہا نہ مانو جس کا دل ہم نے اپنی یاد سے غافل کردیا اور وہ اپنی خواہش کے پیچھے چلا اور اس کا کام حد سے گزر گیا،"
      },
      {
        "numberInSurah": 29,
        "arabic": "وَقُلِ ٱلْحَقُّ مِن رَّبِّكُمْ ۖ فَمَن شَآءَ فَلْيُؤْمِن وَمَن شَآءَ فَلْيَكْفُرْ ۚ إِنَّآ أَعْتَدْنَا لِلظَّٰلِمِينَ نَارًا أَحَاطَ بِهِمْ سُرَادِقُهَا ۚ وَإِن يَسْتَغِيثُوا۟ يُغَاثُوا۟ بِمَآءٍۢ كَٱلْمُهْلِ يَشْوِى ٱلْوُجُوهَ ۚ بِئْسَ ٱلشَّرَابُ وَسَآءَتْ مُرْتَفَقًا",
        "english": "And say, \"The truth is from your Lord, so whoever wills - let him believe; and whoever wills - let him disbelieve.\" Indeed, We have prepared for the wrongdoers a fire whose walls will surround them. And if they call for relief, they will be relieved with water like murky oil, which scalds [their] faces. Wretched is the drink, and evil is the resting place.",
        "urduJalandhari": "اور کہہ دو کہ (لوگو) یہ قرآن تمہارے پروردگار کی طرف سے برحق ہے تو جو چاہے ایمان لائے اور جو چاہے کافر رہے۔ ہم نے ظالموں کے لئے دوزخ کی آگ تیار کر رکھی ہے جس کی قناتیں ان کو گھیر رہی ہوں گی۔ اور اگر فریاد کریں گے تو ایسے کھولتے ہوئے پانی سے ان کی دادرسی کی جائے گی (جو) پگھلے ہوئے تانبے کی طرح (گرم ہوگا اور جو) مونہوں کو بھون ڈالے گا (ان کے پینے کا) پانی بھی برا اور آرام گاہ بھی بری",
        "urduKanzulIman": "اور فرما دو کہ حق تمہارے رب کی طرف سے ہے تو جو چاہے ایمان لائے اور جو چاہے کفر کرے بیشک ہم نے ظالموں کے لیے وہ آگ تیار کر رکھی ہے جس کی دیواریں انہیں گھیر لیں گی، اور اگر پانی کے لیے فریاد کریں تو ان کی فریاد رسی ہوگی اس پانی سے کہ چرخ دے (کھولتے ہوئے) دھات کی طرح ہے کہ ان کے منہ بھون دے گا کیا ہی برا پینا ہے اور دوزخ کیا ہی بری ٹھہرنے کی جگہ،"
      },
      {
        "numberInSurah": 30,
        "arabic": "إِنَّ ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّٰلِحَٰتِ إِنَّا لَا نُضِيعُ أَجْرَ مَنْ أَحْسَنَ عَمَلًا",
        "english": "Indeed, those who have believed and done righteous deeds - indeed, We will not allow to be lost the reward of any who did well in deeds.",
        "urduJalandhari": "(اور) جو ایمان لائے اور کام بھی نیک کرتے رہے تو ہم نیک کام کرنے والوں کا اجر ضائع نہیں کرتے",
        "urduKanzulIman": "بیشک جو ایمان لائے اور نیک کام کیے ہم ان کے نیگ (اجر) ضائع نہیں کرتے جن کے کام اچھے ہوں،"
      },
      {
        "numberInSurah": 31,
        "arabic": "أُو۟لَٰٓئِكَ لَهُمْ جَنَّٰتُ عَدْنٍۢ تَجْرِى مِن تَحْتِهِمُ ٱلْأَنْهَٰرُ يُحَلَّوْنَ فِيهَا مِنْ أَسَاوِرَ مِن ذَهَبٍۢ وَيَلْبَسُونَ ثِيَابًا خُضْرًۭا مِّن سُندُسٍۢ وَإِسْتَبْرَقٍۢ مُّتَّكِـِٔينَ فِيهَا عَلَى ٱلْأَرَآئِكِ ۚ نِعْمَ ٱلثَّوَابُ وَحَسُنَتْ مُرْتَفَقًۭا",
        "english": "Those will have gardens of perpetual residence; beneath them rivers will flow. They will be adorned therein with bracelets of gold and will wear green garments of fine silk and brocade, reclining therein on adorned couches. Excellent is the reward, and good is the resting place.",
        "urduJalandhari": "ایسے لوگوں کے لئے ہمیشہ رہنے کے باغ ہیں جن میں ان کے (محلوں کے) نیچے نہریں بہہ رہی ہیں ان کو وہاں سونے کے کنگن پہنائے جائیں گے اور وہ باریک دیبا اور اطلس کے سبز کپڑے پہنا کریں گے (اور) تختوں پر تکیئے لگا کر بیٹھا کریں گے۔ (کیا) خوب بدلہ اور (کیا) خوب آرام گاہ ہے",
        "urduKanzulIman": "ان کے لیے بسنے کے باغ ہیں ان کے نیچے ندیاں بہیں وہ اس میں سونے کے کنگن بہنائے جایں گے اور سبز کپڑے کریب اور قناویز کے پہنیں گے وہاں تختوں پر تکیہ لگائے کیا ہی اچھا ثواب اور جنت کی کیا ہی اچھی آرام کی جگہ،"
      },
      {
        "numberInSurah": 32,
        "arabic": "۞ وَٱضْرِبْ لَهُم مَّثَلًۭا رَّجُلَيْنِ جَعَلْنَا لِأَحَدِهِمَا جَنَّتَيْنِ مِنْ أَعْنَٰبٍۢ وَحَفَفْنَٰهُمَا بِنَخْلٍۢ وَجَعَلْنَا بَيْنَهُمَا زَرْعًۭا",
        "english": "And present to them an example of two men: We granted to one of them two gardens of grapevines, and We bordered them with palm trees and placed between them [fields of] crops.",
        "urduJalandhari": "اور ان سے دو شخصوں کا حال بیان کرو جن میں سے ایک ہم نے انگور کے دو باغ (عنایت) کئے تھے اور ان کے گردا گرد کھجوروں کے درخت لگا دیئے تھے اور ان کے درمیان کھیتی پیدا کردی تھی",
        "urduKanzulIman": "اور ان کے سامنے دو مردوں کا حال بیان کرو کہ ان میں ایک کو ہم نے انگوروں کے دو باغ دیے اور ان کو کھجوروں سے ڈھانپ لیا اور ان کے بیچ میں کھیتی رکھی"
      },
      {
        "numberInSurah": 33,
        "arabic": "كِلْتَا ٱلْجَنَّتَيْنِ ءَاتَتْ أُكُلَهَا وَلَمْ تَظْلِم مِّنْهُ شَيْـًۭٔا ۚ وَفَجَّرْنَا خِلَٰلَهُمَا نَهَرًۭا",
        "english": "Each of the two gardens produced its fruit and did not fall short thereof in anything. And We caused to gush forth within them a river.",
        "urduJalandhari": "دونوں باغ (کثرت سے) پھل لاتے۔ اور اس (کی پیداوار) میں کسی طرح کی کمی نہ ہوتی اور دونوں میں ہم نے ایک نہر بھی جاری کر رکھی تھی",
        "urduKanzulIman": "دونوں باغ اپنے پھل لائے اور اس میں کچھ کمی نہ دی اور دونوں کے بیچ میں ہم نے نہر بہائی"
      },
      {
        "numberInSurah": 34,
        "arabic": "وَكَانَ لَهُۥ ثَمَرٌۭ فَقَالَ لِصَٰحِبِهِۦ وَهُوَ يُحَاوِرُهُۥٓ أَنَا۠ أَكْثَرُ مِنكَ مَالًۭا وَأَعَزُّ نَفَرًۭا",
        "english": "And he had fruit, so he said to his companion while he was conversing with him, \"I am greater than you in wealth and mightier in [numbers of] men.\"",
        "urduJalandhari": "اور (اس طرح) اس (شخص) کو (ان کی) پیداوار (ملتی رہتی) تھی تو (ایک دن) جب کہ وہ اپنے دوست سے باتیں کر رہا تھا کہنے لگا کہ میں تم سے مال ودولت میں بھی زیادہ ہوں اور جتھے (اور جماعت) کے لحاظ سے بھی زیادہ عزت والا ہوں",
        "urduKanzulIman": "اور وہ پھل رکھتا تھا تو اپنے ساتھی سے بولا اور وہ اس سے رد و بدل کرتا تھا میں تجھ سے مال میں زیادہ ہوں اور آدمیوں کا زیادہ زور رکھتا ہوں"
      },
      {
        "numberInSurah": 35,
        "arabic": "وَدَخَلَ جَنَّتَهُۥ وَهُوَ ظَالِمٌۭ لِّنَفْسِهِۦ قَالَ مَآ أَظُنُّ أَن تَبِيدَ هَٰذِهِۦٓ أَبَدًۭا",
        "english": "And he entered his garden while he was unjust to himself. He said, \"I do not think that this will perish - ever.",
        "urduJalandhari": "اور (ایسی شیخیوں) سے اپنے حق میں ظلم کرتا ہوا اپنے باغ میں داخل ہوا۔ کہنے لگا کہ میں نہیں خیال کرتا کہ یہ باغ کبھی تباہ ہو",
        "urduKanzulIman": "اپنے باغ میں گیا اور اپنی جان پر ظلم کرتا ہوا بولا مجھے گمان نہیں کہ یہ کبھی فنا ہو،"
      },
      {
        "numberInSurah": 36,
        "arabic": "وَمَآ أَظُنُّ ٱلسَّاعَةَ قَآئِمَةًۭ وَلَئِن رُّدِدتُّ إِلَىٰ رَبِّى لَأَجِدَنَّ خَيْرًۭا مِّنْهَا مُنقَلَبًۭا",
        "english": "And I do not think the Hour will occur. And even if I should be brought back to my Lord, I will surely find better than this as a return.\"",
        "urduJalandhari": "اور نہ خیال کرتا ہوں کہ قیامت برپا ہو۔ اور اگر میں اپنے پروردگار کی طرف لوٹایا بھی جاؤں تو (وہاں) ضرور اس سے اچھی جگہ پاؤں گا",
        "urduKanzulIman": "اور میں گمان نہیں کرتا کہ قیامت قائم ہو اور اگر میں اپنے رب کی طرف پھر گیا بھی تو ضرور اس باغ سے بہتر پلٹنے کی جگہ پاؤں گا"
      },
      {
        "numberInSurah": 37,
        "arabic": "قَالَ لَهُۥ صَاحِبُهُۥ وَهُوَ يُحَاوِرُهُۥٓ أَكَفَرْتَ بِٱلَّذِى خَلَقَكَ مِن تُرَابٍۢ ثُمَّ مِن نُّطْفَةٍۢ ثُمَّ سَوَّىٰكَ رَجُلًۭا",
        "english": "His companion said to him while he was conversing with him, \"Have you disbelieved in He who created you from dust and then from a sperm-drop and then proportioned you [as] a man?",
        "urduJalandhari": "تو اس کا دوست جو اس سے گفتگو کر رہا تھا کہنے لگا کہ کیا تم اس (خدا) سے کفر کرتے ہو جس نے تم کو مٹی سے پیدا کیا پھر نطفے سے پھر تمہیں پورا مرد بنایا",
        "urduKanzulIman": "اس کے ساتھی نے اس سے اُلٹ پھیر کرتے ہوئے جواب دیا کیا تو اس کے ساتھ کفر کرتا ہے جس نے تجھے مٹی سے بنایا پھر نطفہ سے پھر تجھے ٹھیک مرد کیا"
      },
      {
        "numberInSurah": 38,
        "arabic": "لَّٰكِنَّا۠ هُوَ ٱللَّهُ رَبِّى وَلَآ أُشْرِكُ بِرَبِّىٓ أَحَدًۭا",
        "english": "But as for me, He is Allah, my Lord, and I do not associate with my Lord anyone.",
        "urduJalandhari": "مگر میں تو یہ کہتا ہوں کہ خدا ہی میرا پروردگار ہے اور میں اپنے پروردگار کے ساتھ کسی کو شریک نہیں کرتا",
        "urduKanzulIman": "لیکن میں تو یہی کہتا ہوں کہ وہ اللہ ہی میرا رب ہے او ر میں کسی کو اپنے رب کا شریک نہیں کرتا ہوں،"
      },
      {
        "numberInSurah": 39,
        "arabic": "وَلَوْلَآ إِذْ دَخَلْتَ جَنَّتَكَ قُلْتَ مَا شَآءَ ٱللَّهُ لَا قُوَّةَ إِلَّا بِٱللَّهِ ۚ إِن تَرَنِ أَنَا۠ أَقَلَّ مِنكَ مَالًۭا وَوَلَدًۭا",
        "english": "And why did you, when you entered your garden, not say, 'What Allah willed [has occurred]; there is no power except in Allah '? Although you see me less than you in wealth and children,",
        "urduJalandhari": "اور (بھلا) جب تم اپنے باغ میں داخل ہوئے تو تم نے ماشاالله لاقوة الابالله کیوں نہ کہا۔ اگر تم مجھے مال واولاد میں اپنے سے کمتر دیکھتے ہو",
        "urduKanzulIman": "اور کیوں نہ ہوا کہ جب تو اپنے باغ میں گیا تو کہا ہوتا جو چاہے اللہ، ہمیں کچھ زور نہیں مگر اللہ کی مدد کا اگر تو مجھے اپنے سے مال و اولاد میں کم دیکھتا تھا"
      },
      {
        "numberInSurah": 40,
        "arabic": "فَعَسَىٰ رَبِّىٓ أَن يُؤْتِيَنِ خَيْرًۭا مِّن جَنَّتِكَ وَيُرْسِلَ عَلَيْهَا حُسْبَانًۭا مِّنَ ٱلسَّمَآءِ فَتُصْبِحَ صَعِيدًۭا زَلَقًا",
        "english": "It may be that my Lord will give me [something] better than your garden and will send upon it a calamity from the sky, and it will become a smooth, dusty ground,",
        "urduJalandhari": "تو عجب نہیں کہ میرا پروردگار مجھے تمہارے باغ سے بہتر عطا فرمائے اور اس (تمہارے باغ) پر آسمان سے آفت بھیج دے تو وہ صاف میدان ہوجائے",
        "urduKanzulIman": "تو قریب ہے کہ میرا رب مجھے تیرے باغ سے اچھا دے اور تیرے باغ پر آسمان سے بجلیاں اتارے تو وہ پٹ پر میدان (سفید زمین) ہوکر رہ جائے"
      },
      {
        "numberInSurah": 41,
        "arabic": "أَوْ يُصْبِحَ مَآؤُهَا غَوْرًۭا فَلَن تَسْتَطِيعَ لَهُۥ طَلَبًۭا",
        "english": "Or its water will become sunken [into the earth], so you would never be able to seek it.\"",
        "urduJalandhari": "یا اس (کی نہر) کا پانی گہرا ہوجائے تو پھر تم اسے نہ لاسکو",
        "urduKanzulIman": "یا اس کا پانی زمین میں دھنس جائے پھر تو اسے ہرگز تلاش نہ کرسکے"
      },
      {
        "numberInSurah": 42,
        "arabic": "وَأُحِيطَ بِثَمَرِهِۦ فَأَصْبَحَ يُقَلِّبُ كَفَّيْهِ عَلَىٰ مَآ أَنفَقَ فِيهَا وَهِىَ خَاوِيَةٌ عَلَىٰ عُرُوشِهَا وَيَقُولُ يَٰلَيْتَنِى لَمْ أُشْرِكْ بِرَبِّىٓ أَحَدًۭا",
        "english": "And his fruits were encompassed [by ruin], so he began to turn his hands about [in dismay] over what he had spent on it, while it had collapsed upon its trellises, and said, \"Oh, I wish I had not associated with my Lord anyone.\"",
        "urduJalandhari": "اور اس کے میووں کو عذاب نے آگھیرا اور وہ اپنی چھتریوں پر گر کر رہ گیا۔ تو جو مال اس نے اس پر خرچ کیا تھا اس پر (حسرت سے) ہاتھ ملنے لگا اور کہنے لگا کہ کاش میں اپنے پروردگار کے ساتھ کسی کو شریک نہ بناتا",
        "urduKanzulIman": "اور اس کے پھل گھیر لیے گئے تو اپنے ہاتھ ملتا رہ گیا اس لاگت پر جو اس باغ میں خرچ کی تھی اور وہ اپنی ٹیٹوں پر (اوندھے منہ) گرا ہوا تھا اور کہہ رہا ہے، اے کاش! میں نے اپنے رب کا کسی کو شریک نہ کیا ہوتا،"
      },
      {
        "numberInSurah": 43,
        "arabic": "وَلَمْ تَكُن لَّهُۥ فِئَةٌۭ يَنصُرُونَهُۥ مِن دُونِ ٱللَّهِ وَمَا كَانَ مُنتَصِرًا",
        "english": "And there was for him no company to aid him other than Allah, nor could he defend himself.",
        "urduJalandhari": "(اس وقت) خدا کے سوا کوئی جماعت اس کی مددگار نہ ہوئی اور نہ وہ بدلہ لے سکا",
        "urduKanzulIman": "اور اس کے پاس کوئی جماعت نہ تھی کہ اللہ کے سامنے اس کی مدد کرتی نہ وہ بدلہ لینے کے قابل تھا"
      },
      {
        "numberInSurah": 44,
        "arabic": "هُنَالِكَ ٱلْوَلَٰيَةُ لِلَّهِ ٱلْحَقِّ ۚ هُوَ خَيْرٌۭ ثَوَابًۭا وَخَيْرٌ عُقْبًۭا",
        "english": "There the authority is [completely] for Allah, the Truth. He is best in reward and best in outcome.",
        "urduJalandhari": "یہاں (سے ثابت ہوا کہ) حکومت سب خدائے برحق ہی کی ہے۔ اسی کا صلہ بہتر اور (اسی کا) بدلہ اچھا ہے",
        "urduKanzulIman": "یہاں کھلتا ہے کہ اختیار سچے اللہ کا ہے، اس کا ثواب سب سے بہتر اور اسے ماننے کا انجام سب سے بھلا،"
      },
      {
        "numberInSurah": 45,
        "arabic": "وَٱضْرِبْ لَهُم مَّثَلَ ٱلْحَيَوٰةِ ٱلدُّنْيَا كَمَآءٍ أَنزَلْنَٰهُ مِنَ ٱلسَّمَآءِ فَٱخْتَلَطَ بِهِۦ نَبَاتُ ٱلْأَرْضِ فَأَصْبَحَ هَشِيمًۭا تَذْرُوهُ ٱلرِّيَٰحُ ۗ وَكَانَ ٱللَّهُ عَلَىٰ كُلِّ شَىْءٍۢ مُّقْتَدِرًا",
        "english": "And present to them the example of the life of this world, [its being] like rain which We send down from the sky, and the vegetation of the earth mingles with it and [then] it becomes dry remnants, scattered by the winds. And Allah is ever, over all things, Perfect in Ability.",
        "urduJalandhari": "اور ان سے دنیا کی زندگی کی مثال بھی بیان کردو (وہ ایسی ہے) جیسے پانی جسے ہم نے آسمان سے برسایا۔ تو اس کے ساتھ زمین کی روئیدگی مل گئی۔ پھر وہ چورا چورا ہوگئی کہ ہوائیں اسے اڑاتی پھرتی ہیں۔ اور خدا تو ہر چیز پر قدرت رکھتا ہے",
        "urduKanzulIman": "اور ان کے سامنے زندگانی دنیا کی کہاوت بیان کرو جیسے ایک پانی ہم نے آسمان اتارا تو اس کے سبب زمین کا سبزہ گھنا ہوکر نکلا کہ سوکھی گھاس ہوگیا جسے ہوائیں اڑائیں اور اللہ ہر چیز پر قابو والا ہے"
      },
      {
        "numberInSurah": 46,
        "arabic": "ٱلْمَالُ وَٱلْبَنُونَ زِينَةُ ٱلْحَيَوٰةِ ٱلدُّنْيَا ۖ وَٱلْبَٰقِيَٰتُ ٱلصَّٰلِحَٰتُ خَيْرٌ عِندَ رَبِّكَ ثَوَابًۭا وَخَيْرٌ أَمَلًۭا",
        "english": "Wealth and children are [but] adornment of the worldly life. But the enduring good deeds are better to your Lord for reward and better for [one's] hope.",
        "urduJalandhari": "مال اور بیٹے تو دنیا کی زندگی کی (رونق و) زینت ہیں۔ اور نیکیاں جو باقی رہنے والی ہیں وہ ثواب کے لحاظ سے تمہارے پروردگار کے ہاں بہت اچھی اور امید کے لحاظ سے بہت بہتر ہیں",
        "urduKanzulIman": "مال اور بیٹے یہ جیتی دنیا کا سنگھار ہے اور باقی رہنے والی اچھی باتیں ان کا ثواب تمہارے رب کے یہاں بہتر اور وہ امید میں سب سے بھلی،"
      },
      {
        "numberInSurah": 47,
        "arabic": "وَيَوْمَ نُسَيِّرُ ٱلْجِبَالَ وَتَرَى ٱلْأَرْضَ بَارِزَةًۭ وَحَشَرْنَٰهُمْ فَلَمْ نُغَادِرْ مِنْهُمْ أَحَدًۭا",
        "english": "And [warn of] the Day when We will remove the mountains and you will see the earth prominent, and We will gather them and not leave behind from them anyone.",
        "urduJalandhari": "اور جس دن ہم پہاڑوں کو چلائیں گے اور تم زمین کو صاف میدان دیکھو گے اور ان (لوگوں کو) ہم جمع کرلیں گے تو ان میں سے کسی کو بھی نہیں چھوڑیں گے",
        "urduKanzulIman": "اور جس دن ہم پہاڑوں کو چلائیں گے اور تم زمین کو صاف کھلی ہوئی دیکھو گے اور ہم انہیں اٹھائیں گے تو ان میں سے کسی کو نہ چھوڑیں گے،"
      },
      {
        "numberInSurah": 48,
        "arabic": "وَعُرِضُوا۟ عَلَىٰ رَبِّكَ صَفًّۭا لَّقَدْ جِئْتُمُونَا كَمَا خَلَقْنَٰكُمْ أَوَّلَ مَرَّةٍۭ ۚ بَلْ زَعَمْتُمْ أَلَّن نَّجْعَلَ لَكُم مَّوْعِدًۭا",
        "english": "And they will be presented before your Lord in rows, [and He will say], \"You have certainly come to Us just as We created you the first time. But you claimed that We would never make for you an appointment.\"",
        "urduJalandhari": "اور سب تمہارے پروردگار کے سامنے صف باندھ کر لائے جائیں گے (تو ہم ان سے کہیں گے کہ) جس طرح ہم نے تم کو پہلی بار پیدا کیا تھا (اسی طرح آج) تم ہمارے سامنے آئے لیکن تم نے تو یہ خیال کر رکھا تھا کہ ہم نے تمہارے لئے (قیامت کا) کوئی وقت مقرر ہی نہیں کیا",
        "urduKanzulIman": "اور سب تمہارے رب کے حضور پرا باندھے پیش ہوں گے بیشک تم ہمارے پاس ویسے ہی آئےجیسا ہم نے تمہیں پہلی بار بنایا تھا بلکہ تمہارا گمان تھا کہ ہم ہر گز تمہارے لیے کوئی وعدہ کا وقت نہ رکھیں گے،"
      },
      {
        "numberInSurah": 49,
        "arabic": "وَوُضِعَ ٱلْكِتَٰبُ فَتَرَى ٱلْمُجْرِمِينَ مُشْفِقِينَ مِمَّا فِيهِ وَيَقُولُونَ يَٰوَيْلَتَنَا مَالِ هَٰذَا ٱلْكِتَٰبِ لَا يُغَادِرُ صَغِيرَةًۭ وَلَا كَبِيرَةً إِلَّآ أَحْصَىٰهَا ۚ وَوَجَدُوا۟ مَا عَمِلُوا۟ حَاضِرًۭا ۗ وَلَا يَظْلِمُ رَبُّكَ أَحَدًۭا",
        "english": "And the record [of deeds] will be placed [open], and you will see the criminals fearful of that within it, and they will say, \"Oh, woe to us! What is this book that leaves nothing small or great except that it has enumerated it?\" And they will find what they did present [before them]. And your Lord does injustice to no one.",
        "urduJalandhari": "اور (عملوں کی) کتاب (کھول کر) رکھی جائے گی تو تم گنہگاروں کو دیکھو گے کہ جو کچھ اس میں (لکھا) ہوگا اس سے ڈر رہے ہوں گے اور کہیں گے ہائے شامت یہ کیسی کتاب ہے کہ نہ چھوٹی بات کو چھوڑتی ہے نہ بڑی کو۔ (کوئی بات بھی نہیں) مگر اسے لکھ رکھا ہے۔ اور جو عمل کئے ہوں گے سب کو حاضر پائیں گے۔ اور تمہارا پروردگار کسی پر ظلم نہیں کرے گا",
        "urduKanzulIman": "اور نامہٴ اعمال رکھا جائے گا تو تم مجرموں کو دیکھو گے کہ اس کے لکھے سے ڈرتے ہوں گے اور کہیں گے ہائے خرابی ہماری اس نوشتہ کو کیا ہوا نہ اس نے کوئی چھوٹا گناہ چھوڑا نہ بڑا جسے گھیر لیا ہو اور اپنا سب کیا انہوں نے سامنے پایا، اور تمہارا رب کسی پر ظلم نہیں کرتا"
      },
      {
        "numberInSurah": 50,
        "arabic": "وَإِذْ قُلْنَا لِلْمَلَٰٓئِكَةِ ٱسْجُدُوا۟ لِءَادَمَ فَسَجَدُوٓا۟ إِلَّآ إِبْلِيسَ كَانَ مِنَ ٱلْجِنِّ فَفَسَقَ عَنْ أَمْرِ رَبِّهِۦٓ ۗ أَفَتَتَّخِذُونَهُۥ وَذُرِّيَّتَهُۥٓ أَوْلِيَآءَ مِن دُونِى وَهُمْ لَكُمْ عَدُوٌّۢ ۚ بِئْسَ لِلظَّٰلِمِينَ بَدَلًۭا",
        "english": "And [mention] when We said to the angels, \"Prostrate to Adam,\" and they prostrated, except for Iblees. He was of the jinn and departed from the command of his Lord. Then will you take him and his descendants as allies other than Me while they are enemies to you? Wretched it is for the wrongdoers as an exchange.",
        "urduJalandhari": "اور جب ہم نے فرشتوں کو حکم دیا کہ آدم کو سجدہ کرو تو سب نے سجدہ کیا مگر ابلیس (نے نہ کیا) وہ جنات میں سے تھا تو اپنے پروردگار کے حکم سے باہر ہوگیا۔ کیا تم اس کو اور اس کی اولاد کو میرے سوا دوست بناتے ہو۔ حالانکہ وہ تمہارے دشمن ہیں (اور شیطان کی دوستی) ظالموں کے لئے (خدا کی دوستی کا) برا بدل ہے",
        "urduKanzulIman": "اور یاد کرو جب ہم نے فرشتوں کو فرمایا کہ آدم کو سجدہ کرو تو سب نے سجدہ کیا سوا ابلیس کے، قومِ جن سے تھا تو اپنے رب کے حکم سے نکل گیا بھلا کیا اسے اور اس کی اولاد و میرے سوا دوست بناتے ہو اور وہ ہمارے دشمن ہیں ظالموں کو کیا ہی برا بدل (بدلہ) ملا،"
      },
      {
        "numberInSurah": 51,
        "arabic": "۞ مَّآ أَشْهَدتُّهُمْ خَلْقَ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضِ وَلَا خَلْقَ أَنفُسِهِمْ وَمَا كُنتُ مُتَّخِذَ ٱلْمُضِلِّينَ عَضُدًۭا",
        "english": "I did not make them witness to the creation of the heavens and the earth or to the creation of themselves, and I would not have taken the misguiders as assistants.",
        "urduJalandhari": "میں نے ان کو نہ تو آسمانوں اور زمین کے پیدا کرنے کے وقت بلایا تھا اور نہ خود ان کے پیدا کرنے کے وقت۔ اور میں ایسا نہ تھا کہ گمراہ کرنے والوں کو مددگار بناتا",
        "urduKanzulIman": "نہ میں نے آسمانوں اور زمین کو بناتے وقت انہیں سامنے بٹھالیا تھا، نہ خود ان کے بناتے وقت اور نہ میری شان، کہ گمراہ کرنے والوں کو بازوں بناؤں"
      },
      {
        "numberInSurah": 52,
        "arabic": "وَيَوْمَ يَقُولُ نَادُوا۟ شُرَكَآءِىَ ٱلَّذِينَ زَعَمْتُمْ فَدَعَوْهُمْ فَلَمْ يَسْتَجِيبُوا۟ لَهُمْ وَجَعَلْنَا بَيْنَهُم مَّوْبِقًۭا",
        "english": "And [warn of] the Day when He will say, \"Call 'My partners' whom you claimed,\" and they will invoke them, but they will not respond to them. And We will put between them [a valley of] destruction.",
        "urduJalandhari": "اور جس دن خدا فرمائے گا کہ (اب) میرے شریکوں کو جن کی نسبت تم گمان (الوہیت) رکھتے تھے بلاؤ تو وہ ان کے بلائیں گے مگر وہ ان کو کچھ جواب نہ دیں گے۔ اور ہم ان کے بیچ میں ایک ہلاکت کی جگہ بنادیں گے",
        "urduKanzulIman": "اور جس دن فرمائے گا کہ پکارو میرے شریکوں کو جو تم گمان کرتے تھے تو انہیں پکاریں گے وہ انہیں جواب نہ دیں گے اور ہم ان کے درمیان ایک ہلاکت کا میدان کردیں گے"
      },
      {
        "numberInSurah": 53,
        "arabic": "وَرَءَا ٱلْمُجْرِمُونَ ٱلنَّارَ فَظَنُّوٓا۟ أَنَّهُم مُّوَاقِعُوهَا وَلَمْ يَجِدُوا۟ عَنْهَا مَصْرِفًۭا",
        "english": "And the criminals will see the Fire and will be certain that they are to fall therein. And they will not find from it a way elsewhere.",
        "urduJalandhari": "اور گنہگار لوگ دوزخ کو دیکھیں گے تو یقین کرلیں گے کہ وہ اس میں پڑنے والے ہیں۔ اور اس سے بچنے کا کوئی رستہ نہ پائیں گے",
        "urduKanzulIman": "اور مجرم دوزخ کو دیکھیں گے تو یقین کریں گا کہ انہیں اس میں گرنا ہے اور اس سے پھرنے کی کوئی جگہ نہ پائیں گے،"
      },
      {
        "numberInSurah": 54,
        "arabic": "وَلَقَدْ صَرَّفْنَا فِى هَٰذَا ٱلْقُرْءَانِ لِلنَّاسِ مِن كُلِّ مَثَلٍۢ ۚ وَكَانَ ٱلْإِنسَٰنُ أَكْثَرَ شَىْءٍۢ جَدَلًۭا",
        "english": "And We have certainly diversified in this Qur'an for the people from every [kind of] example; but man has ever been, most of anything, [prone to] dispute.",
        "urduJalandhari": "اور ہم نے اس قرآن میں لوگوں (کے سمجھانے) کے لئے طرح طرح کی مثالیں بیان فرمائی ہیں۔ لیکن انسان سب چیزوں سے بڑھ کر جھگڑالو ہے",
        "urduKanzulIman": "اور بیشک ہم نے لوگوں کے لیے اس قرآن میں ہر قسم کی مثل طرح طرح بیان فرمائی اور آدمی ہر چیز سے بڑھ کر جھگڑالو ہے"
      },
      {
        "numberInSurah": 55,
        "arabic": "وَمَا مَنَعَ ٱلنَّاسَ أَن يُؤْمِنُوٓا۟ إِذْ جَآءَهُمُ ٱلْهُدَىٰ وَيَسْتَغْفِرُوا۟ رَبَّهُمْ إِلَّآ أَن تَأْتِيَهُمْ سُنَّةُ ٱلْأَوَّلِينَ أَوْ يَأْتِيَهُمُ ٱلْعَذَابُ قُبُلًۭا",
        "english": "And nothing has prevented the people from believing when guidance came to them and from asking forgiveness of their Lord except that there [must] befall them the [accustomed] precedent of the former peoples or that the punishment should come [directly] before them.",
        "urduJalandhari": "اور لوگوں کے پاس جب ہدایت آگئی تو ان کو کس چیز نے منع کیا کہ ایمان لائیں۔ اور اپنے پروردگار سے بخشش مانگیں۔ بجز اس کے کہ (اس بات کے منتظر ہوں کہ) انہیں بھی پہلوں کا سا معاملہ پیش آئے یا ان پر عذاب سامنے آموجود ہو",
        "urduKanzulIman": "اور آدمیوں کو کسی چیز نے اس سے روکا کہ ایمان لاتے جب ہدایت ان کے پاس آئی اور اپنے رب سے معافی مانگتے مگر یہ کہ ان پر اگلوں کا دستور آئے یا ان پر قسم قسم کا عذاب آئے،"
      },
      {
        "numberInSurah": 56,
        "arabic": "وَمَا نُرْسِلُ ٱلْمُرْسَلِينَ إِلَّا مُبَشِّرِينَ وَمُنذِرِينَ ۚ وَيُجَٰدِلُ ٱلَّذِينَ كَفَرُوا۟ بِٱلْبَٰطِلِ لِيُدْحِضُوا۟ بِهِ ٱلْحَقَّ ۖ وَٱتَّخَذُوٓا۟ ءَايَٰتِى وَمَآ أُنذِرُوا۟ هُزُوًۭا",
        "english": "And We send not the messengers except as bringers of good tidings and warners. And those who disbelieve dispute by [using] falsehood to [attempt to] invalidate thereby the truth and have taken My verses, and that of which they are warned, in ridicule.",
        "urduJalandhari": "اور ہم جو پیغمبروں کو بھیجا کرتے ہیں تو صرف اس لئے کہ (لوگوں کو خدا کی نعمتوں کی) خوشخبریاں سنائیں اور (عذاب سے) ڈرائیں۔ اور جو کافر ہیں وہ باطل کی (سند) سے جھگڑا کرتے ہیں تاکہ اس سے حق کو پھسلا دیں اور انہوں نے ہماری آیتوں کو اور جس چیز سے ان کو ڈرایا جاتا ہے ہنسی بنا لیا",
        "urduKanzulIman": "اور ہم رسولوں کو نہیں بھیجتے مگر خوشی ڈر سنانے والے اور جو کافر ہیں وہ باطل کے ساتھ جھگڑتے ہیں کہ اس سے حق کو ہٹادیں اور انہوں نے میری آیتوں کی اور جو ڈر انہیں سناتے گئے تھے،"
      },
      {
        "numberInSurah": 57,
        "arabic": "وَمَنْ أَظْلَمُ مِمَّن ذُكِّرَ بِـَٔايَٰتِ رَبِّهِۦ فَأَعْرَضَ عَنْهَا وَنَسِىَ مَا قَدَّمَتْ يَدَاهُ ۚ إِنَّا جَعَلْنَا عَلَىٰ قُلُوبِهِمْ أَكِنَّةً أَن يَفْقَهُوهُ وَفِىٓ ءَاذَانِهِمْ وَقْرًۭا ۖ وَإِن تَدْعُهُمْ إِلَى ٱلْهُدَىٰ فَلَن يَهْتَدُوٓا۟ إِذًا أَبَدًۭا",
        "english": "And who is more unjust than one who is reminded of the verses of his Lord but turns away from them and forgets what his hands have put forth? Indeed, We have placed over their hearts coverings, lest they understand it, and in their ears deafness. And if you invite them to guidance - they will never be guided, then - ever.",
        "urduJalandhari": "اور اس سے ظالم کون جس کو اس کے پروردگار کے کلام سے سمجھایا گیا تو اُس نے اس سے منہ پھیر لیا۔ اور جو اعمال وہ آگے کرچکا اس کو بھول گیا۔ ہم نے ان کے دلوں پر پردے ڈال دیئے کہ اسے سمجھ نہ سکیں۔ اور کانوں میں ثقل (پیدا کردیا ہے کہ سن نہ سکیں) اور اگر تم ان کو رستے کی طرف بلاؤ تو کبھی رستے پر نہ آئیں گے",
        "urduKanzulIman": "ان کی ہنسی بنالی اور اس سے بڑھ کر ظالم کون جسے اس کے رب کی آیتیں یاد دلائی جائیں تو وہ ان سے منہ پھیرلے اور اس کے ہاتھ جو آگے بھیج چکے اسے بھول جائے ہم نے ان کے دلوں پر غلاف کردیے ہیں کہ قرآن نہ سمجھیں اور ان کے کانوں میں گرانی اور اگر تم انہیں ہدایت کی طرف بلاؤ تو جب بھی ہرگز کبھی راہ نہ پائیں گے"
      },
      {
        "numberInSurah": 58,
        "arabic": "وَرَبُّكَ ٱلْغَفُورُ ذُو ٱلرَّحْمَةِ ۖ لَوْ يُؤَاخِذُهُم بِمَا كَسَبُوا۟ لَعَجَّلَ لَهُمُ ٱلْعَذَابَ ۚ بَل لَّهُم مَّوْعِدٌۭ لَّن يَجِدُوا۟ مِن دُونِهِۦ مَوْئِلًۭا",
        "english": "And your Lord is the Forgiving, full of mercy. If He were to impose blame upon them for what they earned, He would have hastened for them the punishment. Rather, for them is an appointment from which they will never find an escape.",
        "urduJalandhari": "اور تمہارا پروردگار بخشنے والا صاحب رحمت ہے۔ اگر وہ ان کے کرتوتوں پر ان کو پکڑنے لگے تو ان پر جھٹ عذاب بھیج دے۔ مگر ان کے لئے ایک وقت (مقرر کر رکھا) ہے کہ اس کے عذاب سے کوئی پناہ کی جگہ نہ پائیں گے",
        "urduKanzulIman": "اور تمہارا رب بخشنے والا مہر وا لا ہے، اگر وہ انہیں ان کے کیے پر پکڑتا تو جلد ان پر عذاب بھیجتا بلکہ ان کے لیے ایک وعدہ کا وقت ہے جس کے سامنے کوئی پناہ نہ پائیں گے،"
      },
      {
        "numberInSurah": 59,
        "arabic": "وَتِلْكَ ٱلْقُرَىٰٓ أَهْلَكْنَٰهُمْ لَمَّا ظَلَمُوا۟ وَجَعَلْنَا لِمَهْلِكِهِم مَّوْعِدًۭا",
        "english": "And those cities - We destroyed them when they wronged, and We made for their destruction an appointed time.",
        "urduJalandhari": "اور یہ بستیاں (جو ویران پڑی ہیں) جب انہوں نے (کفر سے) ظلم کیا تو ہم نے ان کو تباہ کر دیا۔ اور ان کی تباہی کے لئے ایک وقت مقرر کردیا تھا",
        "urduKanzulIman": "اور یہ بستیاں ہم نے تباہ کردیں جب انہوں نے ظلم کیا اور ہم نے ان کی بربادی کا ایک وعدہ رکھا تھا،"
      },
      {
        "numberInSurah": 60,
        "arabic": "وَإِذْ قَالَ مُوسَىٰ لِفَتَىٰهُ لَآ أَبْرَحُ حَتَّىٰٓ أَبْلُغَ مَجْمَعَ ٱلْبَحْرَيْنِ أَوْ أَمْضِىَ حُقُبًۭا",
        "english": "And [mention] when Moses said to his servant, \"I will not cease [traveling] until I reach the junction of the two seas or continue for a long period.\"",
        "urduJalandhari": "اور جب موسیٰ نے اپنے شاگرد سے کہا کہ جب تک دو دریاؤں کے ملنے کی جگہ نہ پہنچ جاؤں ہٹنے کا نہیں خواہ برسوں چلتا رہوں",
        "urduKanzulIman": "اور یاد کرو جب موسیٰ نے اپنے خادم سے کہا میں باز نہ رہوں گا جب تک وہاں نہ پہنچوں جہاں دو سمندر ملے ہیں یا قرنوں (مدتوں تک) چلا جاؤں"
      },
      {
        "numberInSurah": 61,
        "arabic": "فَلَمَّا بَلَغَا مَجْمَعَ بَيْنِهِمَا نَسِيَا حُوتَهُمَا فَٱتَّخَذَ سَبِيلَهُۥ فِى ٱلْبَحْرِ سَرَبًۭا",
        "english": "But when they reached the junction between them, they forgot their fish, and it took its course into the sea, slipping away.",
        "urduJalandhari": "جب ان کے ملنے کے مقام پر پہنچے تو اپنی مچھلی بھول گئے تو اس نے دریا میں سرنگ کی طرح اپنا رستہ بنالیا",
        "urduKanzulIman": "پھر جب وہ دونوں ان دریاؤں کے ملنے کی جگہ پہنچے اپنی مچھلی بھول گئے اور اس نے سمندر میں اپنی راہ لی سرنگ بناتی،"
      },
      {
        "numberInSurah": 62,
        "arabic": "فَلَمَّا جَاوَزَا قَالَ لِفَتَىٰهُ ءَاتِنَا غَدَآءَنَا لَقَدْ لَقِينَا مِن سَفَرِنَا هَٰذَا نَصَبًۭا",
        "english": "So when they had passed beyond it, [Moses] said to his boy, \"Bring us our morning meal. We have certainly suffered in this, our journey, [much] fatigue.\"",
        "urduJalandhari": "جب آگے چلے تو (موسیٰ نے) اپنے شاگرد سے کہا کہ ہمارے لئے کھانا لاؤ۔ اس سفر سے ہم کو بہت تکان ہوگئی ہے",
        "urduKanzulIman": "پھر جبب وہاں سے گزر گئے موسیٰ نے خادم سے کہا ہمارا صبح کا کھانا لاؤ بیشک ہمیں اپنے اس سفر میں بڑی مشقت کا سامنا ہوا،"
      },
      {
        "numberInSurah": 63,
        "arabic": "قَالَ أَرَءَيْتَ إِذْ أَوَيْنَآ إِلَى ٱلصَّخْرَةِ فَإِنِّى نَسِيتُ ٱلْحُوتَ وَمَآ أَنسَىٰنِيهُ إِلَّا ٱلشَّيْطَٰنُ أَنْ أَذْكُرَهُۥ ۚ وَٱتَّخَذَ سَبِيلَهُۥ فِى ٱلْبَحْرِ عَجَبًۭا",
        "english": "He said, \"Did you see when we retired to the rock? Indeed, I forgot [there] the fish. And none made me forget it except Satan - that I should mention it. And it took its course into the sea amazingly\".",
        "urduJalandhari": "(اس نے) کہا کہ بھلا آپ نے دیکھا کہ جب ہم نے پتھر کے ساتھ آرام کیا تھا تو میں مچھلی (وہیں) بھول گیا۔ اور مجھے (آپ سے) اس کا ذکر کرنا شیطان نے بھلا دیا۔ اور اس نے عجب طرح سے دریا میں اپنا رستہ لیا",
        "urduKanzulIman": "بولا بھلا دیکھئے تو جب ہم نے اس چٹان کے پاس جگہ لی تھی تو بیشک میں مچھلی کو بھول گیا، اور مجھے شیطان ہی نے بھلا دیا کہ میں اس کا مذکور کروں اور اس نے تو سمندر میں اپنی راہ لی، اچنبھا ہے،"
      },
      {
        "numberInSurah": 64,
        "arabic": "قَالَ ذَٰلِكَ مَا كُنَّا نَبْغِ ۚ فَٱرْتَدَّا عَلَىٰٓ ءَاثَارِهِمَا قَصَصًۭا",
        "english": "[Moses] said, \"That is what we were seeking.\" So they returned, following their footprints.",
        "urduJalandhari": "(موسیٰ نے) کہا یہی تو (وہ مقام) ہے جسے ہم تلاش کرتے تھے تو وہ اپنے پاؤں کے نشان دیکھتے دیکھتے لوٹ گئے",
        "urduKanzulIman": "موسیٰ نے کہا یہی تو ہم چاہتے تھے تو پیچھے پلٹے اپنے قدموں کے نشان دیکھتے،"
      },
      {
        "numberInSurah": 65,
        "arabic": "فَوَجَدَا عَبْدًۭا مِّنْ عِبَادِنَآ ءَاتَيْنَٰهُ رَحْمَةًۭ مِّنْ عِندِنَا وَعَلَّمْنَٰهُ مِن لَّدُنَّا عِلْمًۭا",
        "english": "And they found a servant from among Our servants to whom we had given mercy from us and had taught him from Us a [certain] knowledge.",
        "urduJalandhari": "(وہاں) انہوں نے ہمارے بندوں میں سے ایک بندہ دیکھا جس کو ہم نے اپنے ہاں سے رحمت (یعنی نبوت یا نعمت ولایت) دی تھی اور اپنے پاس سے علم بخشا تھا",
        "urduKanzulIman": "تو ہمارے بندوں میں سے ایک بندہ پایا جسے ہم نے اپنے پاس سے رحمت دی اور اسے اپنا علم لدنی عطا کیا"
      },
      {
        "numberInSurah": 66,
        "arabic": "قَالَ لَهُۥ مُوسَىٰ هَلْ أَتَّبِعُكَ عَلَىٰٓ أَن تُعَلِّمَنِ مِمَّا عُلِّمْتَ رُشْدًۭا",
        "english": "Moses said to him, \"May I follow you on [the condition] that you teach me from what you have been taught of sound judgement?\"",
        "urduJalandhari": "موسیٰ نے ان سے (جن کا نام خضر تھا) کہا کہ جو علم (خدا کی طرف سے) آپ کو سکھایا گیا ہے اگر آپ اس میں سے مجھے کچھ بھلائی (کی باتیں) سکھائیں تو میں آپ کے ساتھ رہوں",
        "urduKanzulIman": "اس سے موسیٰ نے کہا کیا میں تمہارے ساتھ رہوں اس شرط پر کہ تم مجھے سکھادو گے نیک بات جو تمہیں تعلیم ہوئی"
      },
      {
        "numberInSurah": 67,
        "arabic": "قَالَ إِنَّكَ لَن تَسْتَطِيعَ مَعِىَ صَبْرًۭا",
        "english": "He said, \"Indeed, with me you will never be able to have patience.",
        "urduJalandhari": "(خضر نے) کہا کہ تم میرے ساتھ رہ کر صبر نہیں کرسکو گے",
        "urduKanzulIman": "کہا آپ میرے ساتھ ہرگز نہ ٹھہر سکیں گے"
      },
      {
        "numberInSurah": 68,
        "arabic": "وَكَيْفَ تَصْبِرُ عَلَىٰ مَا لَمْ تُحِطْ بِهِۦ خُبْرًۭا",
        "english": "And how can you have patience for what you do not encompass in knowledge?\"",
        "urduJalandhari": "اور جس بات کی تمہیں خبر ہی نہیں اس پر صبر کر بھی کیوں کرسکتے ہو",
        "urduKanzulIman": "اور اس بات پر کیونکر صبر کریں گے جسے آپ کا علم محیط نہیں"
      },
      {
        "numberInSurah": 69,
        "arabic": "قَالَ سَتَجِدُنِىٓ إِن شَآءَ ٱللَّهُ صَابِرًۭا وَلَآ أَعْصِى لَكَ أَمْرًۭا",
        "english": "[Moses] said, \"You will find me, if Allah wills, patient, and I will not disobey you in [any] order.\"",
        "urduJalandhari": "(موسیٰ نے) کہا خدا نے چاہا تو آپ مجھے صابر پایئے گا۔ اور میں آپ کے ارشاد کے خلاف نہیں کروں گا",
        "urduKanzulIman": "کہا عنقریب اللہ چاہے تو تم مجھے صابر پاؤ گے اور میں تمہارے کسی حکم کے خلاف نہ کروں گا،"
      },
      {
        "numberInSurah": 70,
        "arabic": "قَالَ فَإِنِ ٱتَّبَعْتَنِى فَلَا تَسْـَٔلْنِى عَن شَىْءٍ حَتَّىٰٓ أُحْدِثَ لَكَ مِنْهُ ذِكْرًۭا",
        "english": "He said, \"Then if you follow me, do not ask me about anything until I make to you about it mention.\"",
        "urduJalandhari": "(خضر نے) کہا کہ اگر تم میرے ساتھ رہنا چاہو تو (شرط یہ ہے) مجھ سے کوئی بات نہ پوچھنا جب تک میں خود اس کا ذکر تم سے نہ کروں",
        "urduKanzulIman": "کہا تو اگر آپ میرے ساتھ رہنے ہیں تو مجھ سے کسی بات کو نہ پوچھنا جب تک میں خود اس کا ذکر نہ کروں"
      },
      {
        "numberInSurah": 71,
        "arabic": "فَٱنطَلَقَا حَتَّىٰٓ إِذَا رَكِبَا فِى ٱلسَّفِينَةِ خَرَقَهَا ۖ قَالَ أَخَرَقْتَهَا لِتُغْرِقَ أَهْلَهَا لَقَدْ جِئْتَ شَيْـًٔا إِمْرًۭا",
        "english": "So they set out, until when they had embarked on the ship, al-Khidh r tore it open. [Moses] said, \"Have you torn it open to drown its people? You have certainly done a grave thing.\"",
        "urduJalandhari": "تو دونوں چل پڑے۔ یہاں تک کہ جب کشتی میں سوار ہوئے تو (خضر نے) کشتی کو پھاڑ ڈالا۔ (موسیٰ نے) کہا کیا آپ نے اس لئے پھاڑا ہے کہ سواروں کو غرق کردیں یہ تو آپ نے بڑی (عجیب) بات کی",
        "urduKanzulIman": "اب دونوں چلے یہاں تک کہ جب کشتی میں سوار ہوئے اس بندہ نے اسے چیر ڈالا موسیٰ نے کہا کیا تم نے اسے اس لیے چیرا کہ اس کے سواروں کو ڈبا دو بیشک یہ تم نے بری بات کی،"
      },
      {
        "numberInSurah": 72,
        "arabic": "قَالَ أَلَمْ أَقُلْ إِنَّكَ لَن تَسْتَطِيعَ مَعِىَ صَبْرًۭا",
        "english": "[Al-Khidh r] said, \"Did I not say that with me you would never be able to have patience?\"",
        "urduJalandhari": "(خضر نے) کہا۔ کیا میں نے نہیں کہا تھا کہ تم میرے ساتھ صبر نہ کرسکو گے",
        "urduKanzulIman": "کہا میں نہ کہتا تھا کہ آپ میرے ساتھ ہرگز نہ ٹھہر سکیں گے"
      },
      {
        "numberInSurah": 73,
        "arabic": "قَالَ لَا تُؤَاخِذْنِى بِمَا نَسِيتُ وَلَا تُرْهِقْنِى مِنْ أَمْرِى عُسْرًۭا",
        "english": "[Moses] said, \"Do not blame me for what I forgot and do not cover me in my matter with difficulty.\"",
        "urduJalandhari": "(موسیٰ نے) کہا کہ جو بھول مجھ سے ہوئی اس پر مواخذہ نہ کیجیئے اور میرے معاملے میں مجھ پر مشکل نہ ڈالئے",
        "urduKanzulIman": "کہا مجھ سے میری بھول پر گرفت نہ کرو اور مجھ پر میرے کام میں مشکل نہ ڈالو،"
      },
      {
        "numberInSurah": 74,
        "arabic": "فَٱنطَلَقَا حَتَّىٰٓ إِذَا لَقِيَا غُلَٰمًۭا فَقَتَلَهُۥ قَالَ أَقَتَلْتَ نَفْسًۭا زَكِيَّةًۢ بِغَيْرِ نَفْسٍۢ لَّقَدْ جِئْتَ شَيْـًۭٔا نُّكْرًۭا",
        "english": "So they set out, until when they met a boy, al-Khidh r killed him. [Moses] said, \"Have you killed a pure soul for other than [having killed] a soul? You have certainly done a deplorable thing.\"",
        "urduJalandhari": "پھر دونوں چلے۔ یہاں تک کہ (رستے میں) ایک لڑکا ملا تو (خضر نے) اُسے مار ڈالا۔ (موسیٰ نے) کہا کہ آپ نے ایک بےگناہ شخص کو ناحق بغیر قصاص کے مار ڈالا۔ (یہ تو) آپ نے بری بات کی",
        "urduKanzulIman": "پھر دونوں چلے یہاں تک کہ جب ایک لڑکا ملا اس بندہ نے اسے قتل کردیا، موسیٰ نے کہا کیا تم نے ایک ستھری جان بے کسی جان کے بدلے قتل کردی، بیشک تم نے بہت بری بات کی،"
      },
      {
        "numberInSurah": 75,
        "arabic": "۞ قَالَ أَلَمْ أَقُل لَّكَ إِنَّكَ لَن تَسْتَطِيعَ مَعِىَ صَبْرًۭا",
        "english": "[Al-Khidh r] said, \"Did I not tell you that with me you would never be able to have patience?\"",
        "urduJalandhari": "(خضر نے) کہا کیا میں نے نہیں کہا تھا کہ تم سے میرے ساتھ صبر نہیں کرسکو گے",
        "urduKanzulIman": "کہا میں نے آپ سے نہ کہا تھا کہ آپ ہرگز میرے ساتھ نہ ٹھہرسکیں گے"
      },
      {
        "numberInSurah": 76,
        "arabic": "قَالَ إِن سَأَلْتُكَ عَن شَىْءٍۭ بَعْدَهَا فَلَا تُصَٰحِبْنِى ۖ قَدْ بَلَغْتَ مِن لَّدُنِّى عُذْرًۭا",
        "english": "[Moses] said, \"If I should ask you about anything after this, then do not keep me as a companion. You have obtained from me an excuse.\"",
        "urduJalandhari": "انہوں نے کہا کہ اگر میں اس کے بعد (پھر) کوئی بات پوچھوں (یعنی اعتراض کروں) تو مجھے اپنے ساتھ نہ رکھیئے گا کہ آپ میری طرف سے عذر (کے قبول کرنے میں غایت) کو پہنچ گئے",
        "urduKanzulIman": "کہا اس کے بعد میں تم سے کچھ پوچھوں تو پھر میرے ساتھ نہ رہنا، بیشک میری طرف سے تمہارا عذر پورا ہوچکا،"
      },
      {
        "numberInSurah": 77,
        "arabic": "فَٱنطَلَقَا حَتَّىٰٓ إِذَآ أَتَيَآ أَهْلَ قَرْيَةٍ ٱسْتَطْعَمَآ أَهْلَهَا فَأَبَوْا۟ أَن يُضَيِّفُوهُمَا فَوَجَدَا فِيهَا جِدَارًۭا يُرِيدُ أَن يَنقَضَّ فَأَقَامَهُۥ ۖ قَالَ لَوْ شِئْتَ لَتَّخَذْتَ عَلَيْهِ أَجْرًۭا",
        "english": "So they set out, until when they came to the people of a town, they asked its people for food, but they refused to offer them hospitality. And they found therein a wall about to collapse, so al-Khidh r restored it. [Moses] said, \"If you wished, you could have taken for it a payment.\"",
        "urduJalandhari": "پھر دونوں چلے۔ یہاں تک کہ ایک گاؤں والوں کے پاس پہنچے اور ان سے کھانا طلب کیا۔ انہوں نے ان کی ضیافت کرنے سے انکار کر دیا۔ پھر انہوں نے وہاں ایک دیوار دیکھی جو (جھک کر) گرا چاہتی تھی۔ خضر نے اس کو سیدھا کر دیا۔ موسیٰ نے کہا اگر آپ چاہتے تو ان سے (اس کا) معاوضہ لیتے (تاکہ کھانے کا کام چلتا)",
        "urduKanzulIman": "پھر دونوں چلے یہاں تک کہ جب ایک گاؤں والوں کے پاس آئے ان دہقانوں سے کھانا مانگا انہوں نے انہیں دعوت دینی قبول نہ کی پھر دونوں نے اس گاؤں میں ایک دیوار پا ئی کہ گرا چاہتی ہے اس بندہ نے اسے سیدھا کردیا، موسیٰ نے کہا تم چاہتے تو اس پر کچھ مزدوری لے لیتے"
      },
      {
        "numberInSurah": 78,
        "arabic": "قَالَ هَٰذَا فِرَاقُ بَيْنِى وَبَيْنِكَ ۚ سَأُنَبِّئُكَ بِتَأْوِيلِ مَا لَمْ تَسْتَطِع عَّلَيْهِ صَبْرًا",
        "english": "[Al-Khidh r] said, \"This is parting between me and you. I will inform you of the interpretation of that about which you could not have patience.",
        "urduJalandhari": "خضر نے کہا اب مجھ میں اور تجھ میں علیحدگی۔ (مگر) جن باتوں پر تم صبر نہ کرسکے میں ان کا تمہیں بھید بتائے دیتا ہوں",
        "urduKanzulIman": "کہا یہ میری اور آپ کی جدائی ہے اب میں آپ کو ان باتوں کا پھیر (بھید) بتاؤں گا جن پر آپ سے صبر نہ ہوسکا"
      },
      {
        "numberInSurah": 79,
        "arabic": "أَمَّا ٱلسَّفِينَةُ فَكَانَتْ لِمَسَٰكِينَ يَعْمَلُونَ فِى ٱلْبَحْرِ فَأَرَدتُّ أَنْ أَعِيبَهَا وَكَانَ وَرَآءَهُم مَّلِكٌۭ يَأْخُذُ كُلَّ سَفِينَةٍ غَصْبًۭا",
        "english": "As for the ship, it belonged to poor people working at sea. So I intended to cause defect in it as there was after them a king who seized every [good] ship by force.",
        "urduJalandhari": "(کہ وہ جو) کشتی (تھی) غریب لوگوں کی تھی جو دریا میں محنت (کرکے یعنی کشتیاں چلا کر گذارہ) کرتے تھے۔ اور ان کے سامنے (کی طرف) ایک بادشاہ تھا جو ہر ایک کشتی کو زبردستی چھین لیتا تھا تو میں نے چاہا کہ اسے عیب دار کردوں (تاکہ وہ اسے غصب نہ کرسکے)",
        "urduKanzulIman": "وہ جو کشتی تھی وہ کچھ محتاجوں کی تھی کہ دریا میں کام کرتے تھے، تو میں نے چاہا کہ اسے عیب دار کردوں اور ان کے پیچھے ایک بادشاہ تھا کہ ہر ثابت کشتی زبردستی چھین لیتا"
      },
      {
        "numberInSurah": 80,
        "arabic": "وَأَمَّا ٱلْغُلَٰمُ فَكَانَ أَبَوَاهُ مُؤْمِنَيْنِ فَخَشِينَآ أَن يُرْهِقَهُمَا طُغْيَٰنًۭا وَكُفْرًۭا",
        "english": "And as for the boy, his parents were believers, and we feared that he would overburden them by transgression and disbelief.",
        "urduJalandhari": "اور وہ جو لڑکا تھا اس کے ماں باپ دنوں مومن تھے ہمیں اندیشہ ہوا کہ (وہ بڑا ہو کر بدکردار ہوتا کہیں) ان کو سرکشی اور کفر میں نہ پھنسا دے",
        "urduKanzulIman": "اور وہ جو لڑکا تھا اس کے ماں باپ مسلمان تھے تو ہمیں ڈر ہوا کہ وہ ان کو سرکشی اور کفر پر چڑھاوے"
      },
      {
        "numberInSurah": 81,
        "arabic": "فَأَرَدْنَآ أَن يُبْدِلَهُمَا رَبُّهُمَا خَيْرًۭا مِّنْهُ زَكَوٰةًۭ وَأَقْرَبَ رُحْمًۭا",
        "english": "So we intended that their Lord should substitute for them one better than him in purity and nearer to mercy.",
        "urduJalandhari": "تو ہم نے چاہا کہ ان کا پروردگار اس کی جگہ ان کو اور (بچّہ) عطا فرمائے جو پاک طینتی میں اور محبت میں اس سے بہتر ہو",
        "urduKanzulIman": "تو ہم نے چاہا کہ ان دونوں کا رب اس سے بہتر ستھرا اور اس سے زیادہ مہربانی میں قریب عطا کرے"
      },
      {
        "numberInSurah": 82,
        "arabic": "وَأَمَّا ٱلْجِدَارُ فَكَانَ لِغُلَٰمَيْنِ يَتِيمَيْنِ فِى ٱلْمَدِينَةِ وَكَانَ تَحْتَهُۥ كَنزٌۭ لَّهُمَا وَكَانَ أَبُوهُمَا صَٰلِحًۭا فَأَرَادَ رَبُّكَ أَن يَبْلُغَآ أَشُدَّهُمَا وَيَسْتَخْرِجَا كَنزَهُمَا رَحْمَةًۭ مِّن رَّبِّكَ ۚ وَمَا فَعَلْتُهُۥ عَنْ أَمْرِى ۚ ذَٰلِكَ تَأْوِيلُ مَا لَمْ تَسْطِع عَّلَيْهِ صَبْرًۭا",
        "english": "And as for the wall, it belonged to two orphan boys in the city, and there was beneath it a treasure for them, and their father had been righteous. So your Lord intended that they reach maturity and extract their treasure, as a mercy from your Lord. And I did it not of my own accord. That is the interpretation of that about which you could not have patience.\"",
        "urduJalandhari": "اور وہ جو دیوار تھی سو وہ دو یتیم لڑکوں کی تھی (جو) شہر میں (رہتے تھے) اور اس کے نیچے ان کا خزانہ (مدفون) تھا اور ان کا باپ ایک نیک بخت آدمی تھا۔ تو تمہارے پروردگار نے چاہا کہ وہ اپنی جوانی کو پہنچ جائیں اور (پھر) اپنا خزانہ نکالیں۔ یہ تمہارے پروردگار کی مہربانی ہے۔ اور یہ کام میں نے اپنی طرف سے نہیں کئے۔ یہ ان باتوں کا راز ہے جن پر تم صبر نہ کرسکے",
        "urduKanzulIman": "رہی وہ دیوار وہ شہر کے دو یتیم لڑکوں کی تھی اور اس کے نیچے ان کا خزانہ تھا اور ان کا باپ نیک آدمی تھا تو آپ کے رب نے چاہا کہ وہ دونوں اپنی جوانی کو پہنچیں اور اپنا خزانہ نکالیں، آپ کے رب کی رحمت سے اور یہ کچھ میں نے اپنے حکم سے نہ کیا یہ پھیر ہے ان باتوں کا جس پر آپ سے صبر نہ ہوسکا"
      },
      {
        "numberInSurah": 83,
        "arabic": "وَيَسْـَٔلُونَكَ عَن ذِى ٱلْقَرْنَيْنِ ۖ قُلْ سَأَتْلُوا۟ عَلَيْكُم مِّنْهُ ذِكْرًا",
        "english": "And they ask you, [O Muhammad], about Dhul-Qarnayn. Say, \"I will recite to you about him a report.\"",
        "urduJalandhari": "اور تم سے ذوالقرنین کے بارے میں دریافت کرتے ہیں۔ کہہ دو کہ میں اس کا کسی قدر حال تمہیں پڑھ کر سناتا ہوں",
        "urduKanzulIman": "اور تم سے ذوالقرنین کو پوچھتے ہیں تم فرماؤ میں تمہیں اس کا مذکور پڑھ کر سناتا ہوں،"
      },
      {
        "numberInSurah": 84,
        "arabic": "إِنَّا مَكَّنَّا لَهُۥ فِى ٱلْأَرْضِ وَءَاتَيْنَٰهُ مِن كُلِّ شَىْءٍۢ سَبَبًۭا",
        "english": "Indeed We established him upon the earth, and We gave him to everything a way.",
        "urduJalandhari": "ہم نے اس کو زمین میں بڑی دسترس دی تھی اور ہر طرح کا سامان عطا کیا تھا",
        "urduKanzulIman": "بیشک ہم نے اسے زمین میں قابو دیا اور ہر چیز کا ایک سامان عطا فرمایا"
      },
      {
        "numberInSurah": 85,
        "arabic": "فَأَتْبَعَ سَبَبًا",
        "english": "So he followed a way",
        "urduJalandhari": "تو اس نے (سفر کا) ایک سامان کیا",
        "urduKanzulIman": "تو وہ ایک سامان کے پیچھے چلا"
      },
      {
        "numberInSurah": 86,
        "arabic": "حَتَّىٰٓ إِذَا بَلَغَ مَغْرِبَ ٱلشَّمْسِ وَجَدَهَا تَغْرُبُ فِى عَيْنٍ حَمِئَةٍۢ وَوَجَدَ عِندَهَا قَوْمًۭا ۗ قُلْنَا يَٰذَا ٱلْقَرْنَيْنِ إِمَّآ أَن تُعَذِّبَ وَإِمَّآ أَن تَتَّخِذَ فِيهِمْ حُسْنًۭا",
        "english": "Until, when he reached the setting of the sun, he found it [as if] setting in a spring of dark mud, and he found near it a people. Allah said, \"O Dhul-Qarnayn, either you punish [them] or else adopt among them [a way of] goodness.\"",
        "urduJalandhari": "یہاں تک کہ جب سورج کے غروب ہونے کی جگہ پہنچا تو اسے ایسا پایا کہ ایک کیچڑ کی ندی میں ڈوب رہا ہے اور اس (ندی) کے پاس ایک قوم دیکھی۔ ہم نے کہا ذوالقرنین! تم ان کو خواہ تکلیف دو خواہ ان (کے بارے) میں بھلائی اختیار کرو (دونوں باتوں میں تم کو قدرت ہے)",
        "urduKanzulIman": "یہاں تک کہ جب سورج ڈوبنے کی جگہ پہنچا اسے ایک سیاہ کیچڑ کے چشمے میں ڈوبتا پایا اور وہاں ایک قوم ملی ہم نے فرمایا اے ذوالقرنین یا تو تُو انہیں عذاب دے یا ان کے ساتھ بھلائی اختیار کرے"
      },
      {
        "numberInSurah": 87,
        "arabic": "قَالَ أَمَّا مَن ظَلَمَ فَسَوْفَ نُعَذِّبُهُۥ ثُمَّ يُرَدُّ إِلَىٰ رَبِّهِۦ فَيُعَذِّبُهُۥ عَذَابًۭا نُّكْرًۭا",
        "english": "He said, \"As for one who wrongs, we will punish him. Then he will be returned to his Lord, and He will punish him with a terrible punishment.",
        "urduJalandhari": "ذوالقرنین نے کہا کہ جو (کفر وبدکرداری سے) ظلم کرے گا اسے ہم عذاب دیں گے۔ پھر (جب) وہ اپنے پروردگار کی طرف لوٹایا جائے گا تو وہ بھی اسے بُرا عذاب دے گا",
        "urduKanzulIman": "عرض کی کہ وہ جس نے ظلم کیا اسے تو ہم عنقریب سزادیں گے پھر اپنے رب کی طرف پھیرا جائے گا وہ اسے بری مار دے گا،"
      },
      {
        "numberInSurah": 88,
        "arabic": "وَأَمَّا مَنْ ءَامَنَ وَعَمِلَ صَٰلِحًۭا فَلَهُۥ جَزَآءً ٱلْحُسْنَىٰ ۖ وَسَنَقُولُ لَهُۥ مِنْ أَمْرِنَا يُسْرًۭا",
        "english": "But as for one who believes and does righteousness, he will have a reward of Paradise, and we will speak to him from our command with ease.\"",
        "urduJalandhari": "اور جو ایمان لائے گا اور عمل نیک کرے گا اس کے لئے بہت اچھا بدلہ ہے۔ اور ہم اپنے معاملے میں (اس پر کسی طرح کی سختی نہیں کریں گے بلکہ) اس سے نرم بات کہیں گے",
        "urduKanzulIman": "اور جو ایمان لایا اور نیک کام کیا تو اس کا بدلہ بھلائی ہے اور عنقریب ہم اسے آسان کام کہیں گے"
      },
      {
        "numberInSurah": 89,
        "arabic": "ثُمَّ أَتْبَعَ سَبَبًا",
        "english": "Then he followed a way",
        "urduJalandhari": "پھر اس نے ایک اور سامان (سفر کا) کیا",
        "urduKanzulIman": "پھر ایک سامان کے پیچھے چلا"
      },
      {
        "numberInSurah": 90,
        "arabic": "حَتَّىٰٓ إِذَا بَلَغَ مَطْلِعَ ٱلشَّمْسِ وَجَدَهَا تَطْلُعُ عَلَىٰ قَوْمٍۢ لَّمْ نَجْعَل لَّهُم مِّن دُونِهَا سِتْرًۭا",
        "english": "Until, when he came to the rising of the sun, he found it rising on a people for whom We had not made against it any shield.",
        "urduJalandhari": "یہاں تک کہ سورج کے طلوع ہونے کے مقام پر پہنچا تو دیکھا کہ وہ ایسے لوگوں پر طلوع کرتا ہے جن کے لئے ہم نے سورج کے اس طرف کوئی اوٹ نہیں بنائی تھی",
        "urduKanzulIman": "یہاں تک کہ جب سورج نکلنے کی جگہ پہنچا، اسے ایسی قوم پر نکلتا پایا جن کے لیے ہم نے سورج سے کوئی آڑ نہیں رکھی"
      },
      {
        "numberInSurah": 91,
        "arabic": "كَذَٰلِكَ وَقَدْ أَحَطْنَا بِمَا لَدَيْهِ خُبْرًۭا",
        "english": "Thus. And We had encompassed [all] that he had in knowledge.",
        "urduJalandhari": "(حقیقت حال) یوں (تھی) اور جو کچھ اس کے پاس تھا ہم کو سب کی خبر تھی",
        "urduKanzulIman": "بات یہی ہے، اور جو کچھ اس کے پاس تھا سب کو ہمارا علم محیط ہے"
      },
      {
        "numberInSurah": 92,
        "arabic": "ثُمَّ أَتْبَعَ سَبَبًا",
        "english": "Then he followed a way",
        "urduJalandhari": "پھر اس نے ایک اور سامان کیا",
        "urduKanzulIman": "پھر ایک ساما ن کے پیچھے چلا"
      },
      {
        "numberInSurah": 93,
        "arabic": "حَتَّىٰٓ إِذَا بَلَغَ بَيْنَ ٱلسَّدَّيْنِ وَجَدَ مِن دُونِهِمَا قَوْمًۭا لَّا يَكَادُونَ يَفْقَهُونَ قَوْلًۭا",
        "english": "Until, when he reached [a pass] between two mountains, he found beside them a people who could hardly understand [his] speech.",
        "urduJalandhari": "یہاں تک کہ دو دیواروں کے درمیان پہنچا تو دیکھا کہ ان کے اس طرف کچھ لوگ ہیں کہ بات کو سمجھ نہیں سکتے",
        "urduKanzulIman": "یہاں تک کہ جب دو پہاڑوں کے بیچ پہنچا ان سے ادھر کچھ ایسے لوگ پائے کہ کوئی بات سمجھتے معلوم نہ ہوتے تھے"
      },
      {
        "numberInSurah": 94,
        "arabic": "قَالُوا۟ يَٰذَا ٱلْقَرْنَيْنِ إِنَّ يَأْجُوجَ وَمَأْجُوجَ مُفْسِدُونَ فِى ٱلْأَرْضِ فَهَلْ نَجْعَلُ لَكَ خَرْجًا عَلَىٰٓ أَن تَجْعَلَ بَيْنَنَا وَبَيْنَهُمْ سَدًّۭا",
        "english": "They said, \"O Dhul-Qarnayn, indeed Gog and Magog are [great] corrupters in the land. So may we assign for you an expenditure that you might make between us and them a barrier?\"",
        "urduJalandhari": "ان لوگوں نے کہا ذوالقرنین! یاجوج اور ماجوج زمین میں فساد کرتے رہتے ہیں بھلا ہم آپ کے لئے خرچ (کا انتظام) کردیں کہ آپ ہمارے اور ان کے درمیان ایک دیوار کھینچ دیں",
        "urduKanzulIman": "انھوں نے کہا، اے ذوالقرنین! بیشک یاجوج ماجوج زمین میں فساد مچاتے ہیں تو کیا ہم آپ کے لیے کچھ مال مقرر کردیں اس پر کہ آپ ہم میں اور ان میں ایک دیوار بنادیں"
      },
      {
        "numberInSurah": 95,
        "arabic": "قَالَ مَا مَكَّنِّى فِيهِ رَبِّى خَيْرٌۭ فَأَعِينُونِى بِقُوَّةٍ أَجْعَلْ بَيْنَكُمْ وَبَيْنَهُمْ رَدْمًا",
        "english": "He said, \"That in which my Lord has established me is better [than what you offer], but assist me with strength; I will make between you and them a dam.",
        "urduJalandhari": "ذوالقرنین نے کہا کہ خرچ کا جو مقدور خدا نے مجھے بخشا ہے وہ بہت اچھا ہے۔ تم مجھے قوت (بازو) سے مدد دو۔ میں تمہارے اور ان کے درمیان ایک مضبوط اوٹ بنا دوں گا",
        "urduKanzulIman": "کہا وہ جس پر مجھے میرے رب نے قابو دیا ہے بہتر ہے تو میری مدد طاقت سے کرو میں تم میں اور ان میں ایک مضبوط آڑ بنادوں"
      },
      {
        "numberInSurah": 96,
        "arabic": "ءَاتُونِى زُبَرَ ٱلْحَدِيدِ ۖ حَتَّىٰٓ إِذَا سَاوَىٰ بَيْنَ ٱلصَّدَفَيْنِ قَالَ ٱنفُخُوا۟ ۖ حَتَّىٰٓ إِذَا جَعَلَهُۥ نَارًۭا قَالَ ءَاتُونِىٓ أُفْرِغْ عَلَيْهِ قِطْرًۭا",
        "english": "Bring me sheets of iron\" - until, when he had leveled [them] between the two mountain walls, he said, \"Blow [with bellows],\" until when he had made it [like] fire, he said, \"Bring me, that I may pour over it molten copper.\"",
        "urduJalandhari": "تو تم لوہے کے (بڑے بڑے) تختے لاؤ (چنانچہ کام جاری کردیا گیا) یہاں تک کہ جب اس نے دونوں پہاڑوں کے درمیان (کا حصہ) برابر کر دیا۔ اور کہا کہ (اب اسے) دھونکو۔ یہاں تک کہ جب اس کو (دھونک دھونک) کر آگ کر دیا تو کہا کہ (اب) میرے پاس تانبہ لاؤ اس پر پگھلا کر ڈال دوں",
        "urduKanzulIman": "میرے پاس لوہے کے تختے لاؤ یہاں تک کہ وہ جب دیوار دونوں پہاڑوں کے کناروں سے برابر کردی، کہا دھونکو، یہاں تک کہ جب اُسے آگ کردیا کہا لاؤ، میں اس پر گلا ہوا تانبہ اُنڈیل دوں،"
      },
      {
        "numberInSurah": 97,
        "arabic": "فَمَا ٱسْطَٰعُوٓا۟ أَن يَظْهَرُوهُ وَمَا ٱسْتَطَٰعُوا۟ لَهُۥ نَقْبًۭا",
        "english": "So Gog and Magog were unable to pass over it, nor were they able [to effect] in it any penetration.",
        "urduJalandhari": "پھر ان میں یہ قدرت نہ رہی کہ اس پر چڑھ سکیں اور نہ یہ طاقت رہی کہ اس میں نقب لگا سکیں",
        "urduKanzulIman": "تو یاجوج و ماجوج اس پر نہ چڑھ سکے اور نہ اس میں سوراخ کرسکے،"
      },
      {
        "numberInSurah": 98,
        "arabic": "قَالَ هَٰذَا رَحْمَةٌۭ مِّن رَّبِّى ۖ فَإِذَا جَآءَ وَعْدُ رَبِّى جَعَلَهُۥ دَكَّآءَ ۖ وَكَانَ وَعْدُ رَبِّى حَقًّۭا",
        "english": "[Dhul-Qarnayn] said, \"This is a mercy from my Lord; but when the promise of my Lord comes, He will make it level, and ever is the promise of my Lord true.\"",
        "urduJalandhari": "بولا کہ یہ میرے پروردگار کی مہربانی ہے۔ جب میرے پروردگار کا وعدہ آپہنچے گا تو اس کو (ڈھا کر) ہموار کردے گا اور میرے پروردگار کا وعدہ سچا ہے",
        "urduKanzulIman": "کہا یہ میرے رب کی رحمت ہے، پھر جب میرے رب کا وعدہ آئے گا اسے پاش پاش کردے گا اور میرے رب کا وعدہ سچا ہے"
      },
      {
        "numberInSurah": 99,
        "arabic": "۞ وَتَرَكْنَا بَعْضَهُمْ يَوْمَئِذٍۢ يَمُوجُ فِى بَعْضٍۢ ۖ وَنُفِخَ فِى ٱلصُّورِ فَجَمَعْنَٰهُمْ جَمْعًۭا",
        "english": "And We will leave them that day surging over each other, and [then] the Horn will be blown, and We will assemble them in [one] assembly.",
        "urduJalandhari": "(اس روز) ہم ان کو چھوڑ دیں گے کہ (روئے زمین پر پھیل کر) ایک دوسرے میں گھس جائیں گے اور صور پھونکا جائے گا تو ہم سب کو جمع کرلیں گے",
        "urduKanzulIman": "اور اس دن ہم انہیں چھوڑ دیں گے کہ ان کا ایک گروہ دوسرے پر ریلا (سیلاب کی طرح) آوے گا اور صُور پھونکا جائے گا تو ہم سب کو اکٹھا کر لائیں گے"
      },
      {
        "numberInSurah": 100,
        "arabic": "وَعَرَضْنَا جَهَنَّمَ يَوْمَئِذٍۢ لِّلْكَٰفِرِينَ عَرْضًا",
        "english": "And We will present Hell that Day to the Disbelievers, on display -",
        "urduJalandhari": "اور اُس روز جہنم کو کافروں کے سامنے لائیں گے",
        "urduKanzulIman": "اور ہم اس دن جہنم کافروں کے سامنے لائیں گے"
      },
      {
        "numberInSurah": 101,
        "arabic": "ٱلَّذِينَ كَانَتْ أَعْيُنُهُمْ فِى غِطَآءٍ عَن ذِكْرِى وَكَانُوا۟ لَا يَسْتَطِيعُونَ سَمْعًا",
        "english": "Those whose eyes had been within a cover [removed] from My remembrance, and they were not able to hear.",
        "urduJalandhari": "جن کی آنکھیں میری یاد سے پردے میں تھیں اور وہ سننے کی طاقت نہیں رکھتے تھے",
        "urduKanzulIman": "وہ جن کی آنکھوں پر میری یاد سے پردہ پڑا تھا اور حق بات سن نہ سکتے تھے"
      },
      {
        "numberInSurah": 102,
        "arabic": "أَفَحَسِبَ ٱلَّذِينَ كَفَرُوٓا۟ أَن يَتَّخِذُوا۟ عِبَادِى مِن دُونِىٓ أَوْلِيَآءَ ۚ إِنَّآ أَعْتَدْنَا جَهَنَّمَ لِلْكَٰفِرِينَ نُزُلًۭا",
        "english": "Then do those who disbelieve think that they can take My servants instead of Me as allies? Indeed, We have prepared Hell for the disbelievers as a lodging.",
        "urduJalandhari": "کیا کافر یہ خیال کرتے ہیں کہ وہ ہمارے بندوں کو ہمارے سوا (اپنا) کارساز بنائیں گے (تو ہم خفا نہیں ہوں گے) ہم نے (ایسے) کافروں کے لئے جہنم کی (مہمانی) تیار کر رکھی ہے",
        "urduKanzulIman": "تو کیا کافر یہ سمجھتے ہیں کہ میرے بندوں کو میرے سوا حمایتی بنالیں گے بیشک ہم نے کافروں کی مہمانی کو جہنم تیار کر رکھی ہے،"
      },
      {
        "numberInSurah": 103,
        "arabic": "قُلْ هَلْ نُنَبِّئُكُم بِٱلْأَخْسَرِينَ أَعْمَٰلًا",
        "english": "Say, [O Muhammad], \"Shall we [believers] inform you of the greatest losers as to [their] deeds?",
        "urduJalandhari": "کہہ دو کہ ہم تمہیں بتائیں جو عملوں کے لحاظ سے بڑے نقصان میں ہیں",
        "urduKanzulIman": "تم فرماؤ کیا ہم تمہیں بتادیں کہ سب سے بڑھ کر ناقص عمل کن کے ہیں"
      },
      {
        "numberInSurah": 104,
        "arabic": "ٱلَّذِينَ ضَلَّ سَعْيُهُمْ فِى ٱلْحَيَوٰةِ ٱلدُّنْيَا وَهُمْ يَحْسَبُونَ أَنَّهُمْ يُحْسِنُونَ صُنْعًا",
        "english": "[They are] those whose effort is lost in worldly life, while they think that they are doing well in work.\"",
        "urduJalandhari": "وہ لوگ جن کی سعی دنیا کی زندگی میں برباد ہوگئی۔ اور وہ یہ سمجھے ہوئے ہیں کہ اچھے کام کر رہے ہیں",
        "urduKanzulIman": "ان کے جن کی ساری کوشش دنیا کی زندگی میں گم گئی اور وہ اس خیال میں ہیں کہ اچھا کام کررہے ہیں،"
      },
      {
        "numberInSurah": 105,
        "arabic": "أُو۟لَٰٓئِكَ ٱلَّذِينَ كَفَرُوا۟ بِـَٔايَٰتِ رَبِّهِمْ وَلِقَآئِهِۦ فَحَبِطَتْ أَعْمَٰلُهُمْ فَلَا نُقِيمُ لَهُمْ يَوْمَ ٱلْقِيَٰمَةِ وَزْنًۭا",
        "english": "Those are the ones who disbelieve in the verses of their Lord and in [their] meeting Him, so their deeds have become worthless; and We will not assign to them on the Day of Resurrection any importance.",
        "urduJalandhari": "یہ وہ لوگ ہیں جنہوں نے اپنے پروردگار کی آیتوں اور اس کے سامنے جانے سے انکار کیا تو ان کے اعمال ضائع ہوگئے اور ہم قیامت کے دن ان کے لئے کچھ بھی وزن قائم نہیں کریں گے",
        "urduKanzulIman": "یہ لوگ جنہوں نے اپنے رب کی آیتیں اور اس کا ملنا نہ مانا تو ان کا کیا دھرا سب اکارت ہے تو ہم ان کے لیے قیامت کے دن کوئی تول نہ قائم کریں گے"
      },
      {
        "numberInSurah": 106,
        "arabic": "ذَٰلِكَ جَزَآؤُهُمْ جَهَنَّمُ بِمَا كَفَرُوا۟ وَٱتَّخَذُوٓا۟ ءَايَٰتِى وَرُسُلِى هُزُوًا",
        "english": "That is their recompense - Hell - for what they denied and [because] they took My signs and My messengers in ridicule.",
        "urduJalandhari": "یہ ان کی سزا ہے (یعنی) جہنم۔ اس لئے کہ انہوں نے کفر کیا اور ہماری آیتوں اور ہمارے پیغمبروں کی ہنسی اُڑائی",
        "urduKanzulIman": "یہ ان کا بدلہ ہے جہنم، اس پر کہ انہوں نے کفر کیا اور میری آیتوں اور میرے رسولوں کی ہنسی بنائی،"
      },
      {
        "numberInSurah": 107,
        "arabic": "إِنَّ ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّٰلِحَٰتِ كَانَتْ لَهُمْ جَنَّٰتُ ٱلْفِرْدَوْسِ نُزُلًا",
        "english": "Indeed, those who have believed and done righteous deeds - they will have the Gardens of Paradise as a lodging,",
        "urduJalandhari": "جو لوگ ایمان لائے اور عمل نیک کئے ان کے لئے بہشت کے باغ مہمانی ہوں گے",
        "urduKanzulIman": "بیشک جو ایمان لائے اور اچھے کام کیے فردوس کے باغ ان کی مہمانی ہے"
      },
      {
        "numberInSurah": 108,
        "arabic": "خَٰلِدِينَ فِيهَا لَا يَبْغُونَ عَنْهَا حِوَلًۭا",
        "english": "Wherein they abide eternally. They will not desire from it any transfer.",
        "urduJalandhari": "ہمیشہ ان میں رہیں گے اور وہاں سے مکان بدلنا نہ چاہیں گے",
        "urduKanzulIman": "وہ ہمیشہ ان ہی میں رہیں گے ان سے جگہ بدلنا نہ چاہیں گے"
      },
      {
        "numberInSurah": 109,
        "arabic": "قُل لَّوْ كَانَ ٱلْبَحْرُ مِدَادًۭا لِّكَلِمَٰتِ رَبِّى لَنَفِدَ ٱلْبَحْرُ قَبْلَ أَن تَنفَدَ كَلِمَٰتُ رَبِّى وَلَوْ جِئْنَا بِمِثْلِهِۦ مَدَدًۭا",
        "english": "Say, \"If the sea were ink for [writing] the words of my Lord, the sea would be exhausted before the words of my Lord were exhausted, even if We brought the like of it as a supplement.\"",
        "urduJalandhari": "کہہ دو کہ اگر سمندر میرے پروردگار کی باتوں کے (لکھنے کے) لئے سیاہی ہو تو قبل اس کے کہ میرے پروردگار کی باتیں تمام ہوں سمندر ختم ہوجائے اگرچہ ہم ویسا ہی اور (سمندر) اس کی مدد کو لائیں",
        "urduKanzulIman": "تم فرمادو اگر سمندر میرے رب کی باتوں کے لیے، سیاہی ہو تو ضرور سمندر ختم ہوجائے گا اور میرے رب کی باتیں ختم نہ ہوں گی اگرچہ ہم ویسا ہی اور اس کی مدد کو لے آئیں"
      },
      {
        "numberInSurah": 110,
        "arabic": "قُلْ إِنَّمَآ أَنَا۠ بَشَرٌۭ مِّثْلُكُمْ يُوحَىٰٓ إِلَىَّ أَنَّمَآ إِلَٰهُكُمْ إِلَٰهٌۭ وَٰحِدٌۭ ۖ فَمَن كَانَ يَرْجُوا۟ لِقَآءَ رَبِّهِۦ فَلْيَعْمَلْ عَمَلًۭا صَٰلِحًۭا وَلَا يُشْرِكْ بِعِبَادَةِ رَبِّهِۦٓ أَحَدًۢا",
        "english": "Say, \"I am only a man like you, to whom has been revealed that your god is one God. So whoever would hope for the meeting with his Lord - let him do righteous work and not associate in the worship of his Lord anyone.\"",
        "urduJalandhari": "کہہ دو کہ میں تمہاری طرح کا ایک بشر ہوں۔ (البتہ) میری طرف وحی آتی ہے کہ تمہارا معبود (وہی) ایک معبود ہے۔ تو جو شخص اپنے پروردگار سے ملنے کی امید رکھے چاہیئے کہ عمل نیک کرے اور اپنے پروردگار کی عبادت میں کسی کو شریک نہ بنائے",
        "urduKanzulIman": "تو فرماؤ ظاہر صورت بشری میں تو میں تم جیسا ہوں مجھے وحی آتی ہے کہ تمہارا معبود ایک ہی معبود ہے تو جسے اپنے رب سے ملنے کی امید ہو اسے چاہیے کہ نیک کام کرے اور اپنے رب کی بندگی میں کسی کو شریک نہ کرے"
      }
    ]
  }
];
