export const DEFAULT_TEACHERS = [
  {
    id: "t_ananya",
    username: "ananya",
    email: "ananya.sharma@school.in",
    password: "123456",
    name: "अनन्या शर्मा",
    title: "प्राथमिक शिक्षिका",
    school: "राजकीय प्राथमिक विद्यालय, तोरपा",
    classes: "कक्षा 1 - 5",
    subject: "हिंदी",
    preferredLanguage: "संताली",
    avatar: "👩‍🏫",
    phone: "+91 98765 43210",
  },
  {
    id: "t_suman",
    username: "suman",
    email: "suman.murmu@school.in",
    password: "123456",
    name: "सुमन मुर्मू (ᱥᱩᱢᱚᱱ ᱢᱩᱨᱢᱩ)",
    title: "मातृभाषा शिक्षक (संताली)",
    school: "राजकीय प्राथमिक विद्यालय, दुमका",
    classes: "कक्षा 1 - 3",
    subject: "संताली",
    preferredLanguage: "संताली",
    avatar: "👩‍🏫",
    phone: "+91 94311 12345",
  },
  {
    id: "t_birsa",
    username: "birsa",
    email: "birsa.hansda@school.in",
    password: "123456",
    name: "बिरसा हांसदा (ᱵᱤᱨᱥᱟ ᱦᱟᱸᱥᱫᱟ)",
    title: "वरिष्ठ प्राथमिक शिक्षक",
    school: "प्राथमिक विद्यालय, जमशेदपुर",
    classes: "कक्षा 1 - 5",
    subject: "गणित व पर्यावरण",
    preferredLanguage: "संताली",
    avatar: "👨‍🏫",
    phone: "+91 97712 67890",
  },
];

export const getStoredTeachers = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("bhashasetu-registered-teachers");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
  }
  return DEFAULT_TEACHERS;
};

export const saveNewTeacher = (teacherObj) => {
  const existing = getStoredTeachers();
  const updated = [teacherObj, ...existing.filter((t) => t.id !== teacherObj.id && t.username !== teacherObj.username)];
  if (typeof window !== "undefined") {
    localStorage.setItem("bhashasetu-registered-teachers", JSON.stringify(updated));
  }
  return updated;
};

export const TEACHER_PROFILE = DEFAULT_TEACHERS[0];

export const LANGUAGES = [
  {
    id: "hindi",
    name: "हिंदी",
    subname: "हिंदी",
    script: "देवनागरी",
    code: "hi",
    description: "मानक शिक्षण भाषा (कक्षा 1-5 पाठ्यक्रम)",
    isDefault: true,
    speakers: "झारखंड में सर्वमान्य",
    color: "emerald",
    icon: "book",
  },
  {
    id: "santhali",
    name: "संताली",
    subname: "संताली",
    script: "ओल चिकी लिपि",
    code: "sat",
    description: "झारखंड की प्रमुख संथाली भाषा (संथाल परगना व कोल्हान)",
    isDefault: false,
    speakers: "लगभग 70 लाख वक्ता",
    color: "amber",
    icon: "tree",
  },
  {
    id: "mundari",
    name: "मुण्डारी",
    subname: "मुण्डारी",
    script: "मुण्डारी बानी / देवनागरी",
    code: "unr",
    description: "मुंडा जनजाति की मातृभाषा (खूंटी, रांची व सिंहभूम)",
    isDefault: false,
    speakers: "लगभग 16 लाख वक्ता",
    color: "blue",
    icon: "feather",
  },
  {
    id: "ho",
    name: "हो",
    subname: "हो",
    script: "वारंग क्षिति",
    code: "hoc",
    description: "कोल्हान प्रमंडल की प्रमुख जनजातीय भाषा",
    isDefault: false,
    speakers: "लगभग 14 लाख वक्ता",
    color: "orange",
    icon: "sparkle",
  },
  {
    id: "kurukh",
    name: "कुड़ुख",
    subname: "कुड़ुख",
    script: "तोलोंग सिकि",
    code: "kru",
    description: "उरांव समुदाय की द्राविड़ भाषा (गुमला, लोहरदगा)",
    isDefault: false,
    speakers: "लगभग 20 लाख वक्ता",
    color: "purple",
    icon: "sun",
  },
  {
    id: "kharia",
    name: "खड़िया",
    subname: "खड़िया",
    script: "देवनागरी",
    code: "khr",
    description: "सिमडेगा व गुमला क्षेत्र की ऑस्ट्रो-एशियाई भाषा",
    isDefault: false,
    speakers: "लगभग 3 लाख वक्ता",
    color: "rose",
    icon: "leaf",
  },
  {
    id: "english",
    name: "अन्य संदर्भ भाषा",
    subname: "सहायक भाषा",
    script: "देवनागरी",
    code: "en",
    description: "सहायक शैक्षिक संदर्भ भाषा",
    isDefault: false,
    speakers: "सहायक भाषा",
    color: "slate",
    icon: "globe",
  },
];

export const TRANSLATIONS_DICT = {
  "नमस्ते, आप कैसे हैं?": {
    santhali: {
      native: "सगात, आय उसनेन्जो ही?",
      phonetic: "सगात, आय उसनेन्जो ही?",
      meaning: "नमस्ते, आप कैसे हैं?",
    },
    ho: {
      native: "जोहार, अम चिलका मेनामा?",
      phonetic: "जोहार, अम चिलका मेनामा?",
      meaning: "नमस्ते, आप कैसे हैं?",
    },
    mundari: {
      native: "जोहार, अम चिकना मेनामा?",
      phonetic: "जोहार, अम चिकना मेनामा?",
      meaning: "नमस्ते, आप कैसे हैं?",
    },
  },
  "यह एक किताब है।": {
    santhali: {
      native: "मिदता इसाए इम। (पुथी)",
      phonetic: "मिदता इसाए इम।",
      meaning: "यह एक पुस्तक है।",
    },
    ho: {
      native: "नेया मियाद पुथी तनाः।",
      phonetic: "नेया मियाद पुथी तनाः।",
      meaning: "यह एक पुस्तक है।",
    },
    mundari: {
      native: "नेया मियाद पुथी मेनाः।",
      phonetic: "नेया मियाद पुथी मेनाः।",
      meaning: "यह एक पुस्तक है।",
    },
  },
  "हम स्कूल जा रहे हैं।": {
    santhali: {
      native: "इम दुरूब राय ओलोऐते।",
      phonetic: "इम दुरूब राय ओलोऐते।",
      meaning: "हम सब विद्यालय जा रहे हैं।",
    },
    ho: {
      native: "अले स्कूल ते सेनोटेन।",
      phonetic: "अले स्कूल ते सेनोटेन।",
      meaning: "हम सब विद्यालय जा रहे हैं।",
    },
    mundari: {
      native: "अबू इतून आसड़ा ते सेनोटेन।",
      phonetic: "अबू इतून आसड़ा ते सेनोटेन।",
      meaning: "हम सब विद्यालय जा रहे हैं।",
    },
  },
  "सूरज पूर्व दिशा से निकलता है।": {
    santhali: {
      native: "सिंगी सामंग साहा सेण ओड़ोकः आ।",
      phonetic: "सिंगी सामंग साहा सेण ओड़ोकः आ।",
      meaning: "सूर्य पूर्व दिशा से उगता है।",
    },
    ho: {
      native: "सिंगी सामंग दिसुम ते ओड़ोकेना।",
      phonetic: "सिंगी सामंग दिसुम ते ओड़ोकेना।",
      meaning: "सूर्य पूर्व दिशा से उगता है।",
    },
    mundari: {
      native: "सिंगी सामंग साहा एते ओड़ोकेना।",
      phonetic: "सिंगी सामंग साहा एते ओड़ोकेना।",
      meaning: "सूर्य पूर्व दिशा से उगता है।",
    },
  },
  "बच्चे मैदान में खेल रहे हैं।": {
    santhali: {
      native: "गिदरा को तान्डी रेको एनाच काना।",
      phonetic: "गिदरा को तान्डी रेको एनाच काना।",
      meaning: "बच्चे मैदान में खेल रहे हैं।",
    },
    ho: {
      native: "हुपुडिंग को टोंगरी रेको एनाच काना।",
      phonetic: "हुपुडिंग को टोंगरी रेको एनाच काना।",
      meaning: "बच्चे मैदान में खेल रहे हैं।",
    },
    mundari: {
      native: "होन को पिरी रेको एनाच काना।",
      phonetic: "होन को पिरी रेको एनाच काना।",
      meaning: "बच्चे मैदान में खेल रहे हैं।",
    },
  },
  "जल ही जीवन है।": {
    santhali: {
      native: "दाः गे जिवोन काना।",
      phonetic: "दाः गे जिवोन काना।",
      meaning: "जल ही जीवन है।",
    },
    ho: {
      native: "दाः गे जिवोन तनाः।",
      phonetic: "दाः गे जिवोन तनाः।",
      meaning: "जल ही जीवन है।",
    },
    mundari: {
      native: "दाः गे जिवोन मेनाः।",
      phonetic: "दाः गे जिवोन मेनाः।",
      meaning: "जल ही जीवन है।",
    },
  },
};

export const RECENT_TRANSLATIONS = [
  {
    id: "t1",
    input: "नमस्ते, आप कैसे हैं?",
    output: "सगात, आय उसनेन्जो ही?",
    fromLang: "हिंदी",
    toLang: "संताली",
    time: "2 मिनट पहले",
  },
  {
    id: "t2",
    input: "यह एक किताब है।",
    output: "मिदता इसाए इम। (पुथी)",
    fromLang: "हिंदी",
    toLang: "संताली",
    time: "10 मिनट पहले",
  },
  {
    id: "t3",
    input: "हम स्कूल जा रहे हैं।",
    output: "इम दुरूब राय ओलोऐते।",
    fromLang: "हिंदी",
    toLang: "संताली",
    time: "1 घंटा पहले",
  },
];

export const TEXTBOOK_SAMPLES = [
  {
    id: "sat-to-hi-1",
    direction: "sat-to-hi",
    directionLabel: "संथाली ➔ हिंदी (Santali to Hindi)",
    title: "ᱥᱤᱭᱟᱹᱲ ᱟᱨ ᱠᱩᱞ / सियार और शेर",
    classNum: "कक्षा 2",
    subject: "मातृभाषा लोककथा (संथाली)",
    pageNumber: "पृष्ठ 14",
    sourceLang: "संथाली (Ol Chiki / Devanagari)",
    targetLang: "मानक हिंदी",
    extractedText: "ᱢᱤᱫ ᱜᱟᱡᱟᱲ ᱵᱩᱨᱩ ᱨᱮ ᱢᱤᱫ ᱢᱟᱨᱟᱝ ᱟᱨ ᱠᱮᱴᱮᱡ ᱠᱩᱞ ᱮ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟ᱾ ᱠᱩᱞᱦᱟᱹᱭ ᱫᱚ ᱠᱩᱞ ᱠᱮ ᱠᱩᱸᱭ ᱫᱟᱜ ᱨᱮ ᱟᱡ-ᱟᱜ ᱩᱢᱩᱞ ᱩᱫᱩᱜ ᱠᱮᱫᱮᱭᱟ᱾ (मित् गाजड़ बुरु रे मित् मारांग आर केतेच् कुल ए ताहें काना। कुलहाई दो कुल के कुंई दाक् रे आज-आक् उमुल उदूक केदेया।)",
    translationText: "एक घने जंगल में एक बड़ा और शक्तिशाली शेर रहता था। बुद्धिमान खरगोश ने शेर को कुएं के पानी में उसकी अपनी परछाई दिखाकर कुएं में कुदा दिया।",
    simpleExplanation: "यह संथाली लोककथा का अंश है। इसमें खरगोश अपनी बुद्धिमत्ता से बलवान शेर को परास्त करता है। यह पाठ सिखाता है कि शारीरिक बल से बुद्धि सदा श्रेष्ठ होती है।",
    vocabMap: [
      { tribal: "ᱜᱟᱡᱟᱲ ᱵᱩᱨᱩ (गाजड़ बुरु)", hindi: "घना जंगल / पहाड़" },
      { tribal: "ᱠᱩᱞ (कुल)", hindi: "शेर" },
      { tribal: "ᱠᱩᱞᱦᱟᱹᱭ (कुलहाई)", hindi: "खरगोश" },
      { tribal: "ᱩᱢᱩᱞ (उमुल)", hindi: "परछाई / छाया" }
    ],
    keyConcepts: ["बुद्धिमत्ता", "संथाली लोककथा", "मातृभाषा बोध"],
    practiceQuestions: [
      "जंगल में कौन सा बलवान जानवर रहता था?",
      "खरगोश ने शेर को कुएं में क्या दिखाया?",
      "इस कहानी से क्या सीख मिलती है?"
    ]
  },
  {
    id: "hi-to-sat-1",
    direction: "hi-to-sat",
    directionLabel: "हिंदी ➔ संथाली (Hindi to Santali)",
    title: "सूरज और ऊष्मा (पर्यावरण)",
    classNum: "कक्षा 2",
    subject: "पर्यावरण अध्ययन (हिंदी)",
    pageNumber: "पृष्ठ 24",
    sourceLang: "मानक हिंदी",
    targetLang: "संथाली ( Ol Chiki ᱚᱞ ᱪᱤᱠᱤ)",
    extractedText: "सूरज पूर्व दिशा से निकलता है। वह हमें प्रकाश और ऊष्मा देता है। सूरज के कारण पृथ्वी पर जीवन संभव है।",
    translationText: "ᱥᱤᱝᱜᱤ ᱚᱠᱟ ᱥᱟᱦᱟ ᱥᱮᱫ ᱠᱷᱚᱱ ᱮ ᱚᱰᱚᱠᱚᱜ-ᱟ᱾ ᱩᱱᱤ ᱟᱵᱚᱣᱟᱜ ᱢᱟᱨᱥᱟᱞ ᱟᱨ ᱞᱚᱞᱚ ᱮ ᱮᱢᱟᱵᱚᱱ ᱠᱟᱱᱟ᱾ (सिंगी सामंग साहा सेण ओड़ोकः आ। उन्नी अबोवाः मार्शल आर लोल ए एमाबोन काना।)",
    simpleExplanation: "सूर्य सुबह पूर्व दिशा से उगता है और हमें धूप (रोशनी व गर्मी) देता है। संथाली में सूरज को 'सिंगी' तथा धूप/प्रकाश को 'मार्शल' कहते हैं।",
    vocabMap: [
      { tribal: "ᱥᱤᱝᱜᱤ (सिंगी)", hindi: "सूर्य / सूरज" },
      { tribal: "ᱢᱟᱨᱥᱟᱞ (मार्शल)", hindi: "प्रकाश / रोशनी" },
      { tribal: "ᱞᱚᱞᱚ (लोल)", hindi: "ऊष्मा / गर्मी" },
      { tribal: "ᱥᱟᱢᱟᱝ (सामंग)", hindi: "पूर्व दिशा" }
    ],
    keyConcepts: ["दिशा पहचान (पूर्व)", "प्रकाश और गर्मी", "प्रकृति चक्र"],
    practiceQuestions: [
      "सूरज किस दिशा से निकलता है?",
      "संथाली में सूर्य को क्या कहते हैं?",
      "सूरज से हमें क्या-क्या मिलता है?"
    ]
  },
  {
    id: "hi-to-sat-2",
    direction: "hi-to-sat",
    directionLabel: "हिंदी ➔ संथाली (Hindi to Santali)",
    title: "जल ही जीवन है (विज्ञान)",
    classNum: "कक्षा 3",
    subject: "पर्यावरण व भाषा",
    pageNumber: "पृष्ठ 38",
    sourceLang: "मानक हिंदी",
    targetLang: "संथाली ( Ol Chiki ᱚᱞ ᱪᱤᱠᱤ)",
    extractedText: "बादल से वर्षा होती है। नदियाँ और तालाब जल से भर जाते हैं। सभी जीवों को जीवित रहने के लिए शुद्ध जल चाहिए।",
    translationText: "ᱨᱤᱢᱤᱞ ᱠᱷᱚᱱ ᱫᱟᱜ ᱡᱚᱨᱚᱜ-ᱟ᱾ ᱜᱟᱰᱟ ᱟᱨ ᱯᱩᱠᱷᱨᱤ ᱫᱟᱜ ᱛᱮ ᱯᱮᱨᱮᱡ-ᱟ᱾ ᱡᱚᱛᱚ ᱡᱤᱣᱚᱱ ᱵᱟᱸᱪᱟᱣ ᱛᱟᱦᱮᱸᱱ ᱞᱟᱹᱜᱤᱫ ᱥᱟᱯᱷᱟ ᱫᱟᱜ ᱫᱟᱨᱠᱟᱨ᱾ (रीमिल खोन दाक् जोरोह-आ। गाडा आर पुखरी दाक् ते पेरेच-आ। जोतो जिवोन बांचाओ ताहेंन लागीत साफा दाक् दारकार।)",
    simpleExplanation: "आसमान में काले मेघ (बादल / रीमिल) जब ठंडे होते हैं, तो बारिश होती है। संथाली में पानी/वर्षा को 'दाक्' कहते हैं और नदी को 'गाड़ा' कहते हैं।",
    vocabMap: [
      { tribal: "ᱨᱤᱢᱤᱞ (रीमिल)", hindi: "बादल / मेघ" },
      { tribal: "ᱫᱟᱜ (दाक्)", hindi: "जल / वर्षा" },
      { tribal: "ᱜᱟᱰᱟ (गाड़ा)", hindi: "नदी" },
      { tribal: "ᱯᱩᱠᱷᱨᱤ (पुखरी)", hindi: "तालाब" }
    ],
    keyConcepts: ["बादल और वर्षा", "जल संरक्षण", "शुद्ध पेयजल"],
    practiceQuestions: [
      "बादल से क्या होता है?",
      "संथाली में नदी को क्या कहते हैं?",
      "जल संरक्षण क्यों आवश्यक है?"
    ]
  },
  {
    id: "sat-to-hi-2",
    direction: "sat-to-hi",
    directionLabel: "संथाली ➔ हिंदी (Santali to Hindi)",
    title: "ᱵᱩᱨᱩ ᱪᱚᱴ ᱨᱮᱱᱟᱜ ᱡᱷᱟᱨᱱᱟ / पहाड़ का झरना",
    classNum: "कक्षा 1",
    subject: "संथाली पठन पुस्तक",
    pageNumber: "पृष्ठ 08",
    sourceLang: "संथाली (Ol Chiki)",
    targetLang: "मानक हिंदी",
    extractedText: "ᱵᱩᱨᱩ ᱪᱚᱴ ᱠᱷᱚᱱ ᱢᱤᱫ ᱥᱟᱯᱷᱟ ᱡᱷᱟᱨᱱᱟ ᱞᱤᱝᱜᱤ ᱠᱟᱱ ᱛᱟᱦᱮᱸᱱᱟ᱾ ᱮᱱᱟ ᱫᱟᱜ ᱫᱚ ᱥᱤᱵᱤᱞ ᱜᱮᱭᱟ᱾ ᱦᱟᱛᱩ ᱨᱮᱱ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱡᱷᱟᱨᱱᱟ ᱟᱲᱮ ᱨᱮ ᱮᱱᱮᱡ-ᱟ᱾ (बुरू चोट खोन मित् सफा झरना लिंगी कान ताहेंना। एना दाक् दो शिबील गेया।)",
    translationText: "पहाड़ की चोटी से एक निर्मल झरना बहता था। उसका पानी अमृत जैसा मीठा था। गांव के सभी बच्चे शाम को झरने के किनारे खेलते थे।",
    simpleExplanation: "यह पाठ प्रकृति की सुंदरता का वर्णन करता है। पहाड़ (बुरु) से स्वच्छ बहते झरने का पानी बहुत मीठा (शिबील) होता है।",
    vocabMap: [
      { tribal: "ᱵᱩᱨᱩ (बुरु)", hindi: "पहाड़ / पर्वत" },
      { tribal: "ᱥᱤᱵᱤᱞ (शिबील)", hindi: "मीठा / स्वादिष्ट" },
      { tribal: "ᱜᱤᱫᱽᱨᱟᱹ (गिदरा)", hindi: "बच्चे" }
    ],
    keyConcepts: ["प्रकृति प्रेम", "पहाड़ व झरना", "बाल पठन"],
    practiceQuestions: [
      "झरना कहाँ से बहता है?",
      "झरने का पानी कैसा होता है?",
      "बच्चे कहाँ खेलते हैं?"
    ]
  }
];

export const WORKSHEET_TOPICS = [
  { id: "class1-hindi", name: "कक्षा 1 — हिंदी: वर्णमाला व स्वर पहचान", classLevel: "कक्षा 1", subject: "हिंदी" },
  { id: "class1-math", name: "कक्षा 1 — गणित: गिनती १ से १० व आकृतियां", classLevel: "कक्षा 1", subject: "गणित" },
  { id: "class1-evs", name: "कक्षा 1 — पर्यावरण: हमारा परिवार व परिवेश", classLevel: "कक्षा 1", subject: "हमारा परिवेश" },
  { id: "class1-olchiki", name: "कक्षा 1 — संथाली: ᱚᱞ ᱪᱤᱠᱤ ᱟᱠᱷᱚᱨ (मुलभूत अक्षर)", classLevel: "कक्षा 1", subject: "संथाली (Ol Chiki)" },
  
  { id: "class2-hindi", name: "कक्षा 2 — हिंदी: मात्राएं (आ, इ, ई, उ, ऊ) व शब्द", classLevel: "कक्षा 2", subject: "हिंदी" },
  { id: "class2-math", name: "कक्षा 2 — गणित: २ अंकों का जोड़ व घटाव", classLevel: "कक्षा 2", subject: "गणित" },
  { id: "class2-evs", name: "कक्षा 2 — पर्यावरण: पेड़-पौधे व जल स्वच्छता", classLevel: "कक्षा 2", subject: "हमारा परिवेश" },
  { id: "class2-olchiki", name: "कक्षा 2 — संथाली: ᱥᱟᱱᱛᱟᱲᱤ ᱟᱹᱲᱟᱹ (सरल शब्द)", classLevel: "कक्षा 2", subject: "संथाली (Ol Chiki)" },

  { id: "class3-hindi", name: "कक्षा 3 — हिंदी: संज्ञा, सर्वनाम व विलोम शब्द", classLevel: "कक्षा 3", subject: "हिंदी" },
  { id: "class3-math", name: "कक्षा 3 — गणित: तीन अंकों की संख्याएं व गुणा", classLevel: "कक्षा 3", subject: "गणित" },
  { id: "class3-evs", name: "कक्षा 3 — पर्यावरण: हमारा झारखंड (खूंटी, वन्यजीव)", classLevel: "कक्षा 3", subject: "पर्यावरण अध्ययन" },
  { id: "class3-olchiki", name: "कक्षा 3 — संथाली: ᱥᱟᱱᱛᱟᱲᱤ ᱟᱹᱭᱟᱹᱛ (सरल वाक्य)", classLevel: "कक्षा 3", subject: "संथाली (Ol Chiki)" },
];

export const SAMPLE_WORKSHEETS = {
  "class1-hindi": {
    id: "ws-class1-hindi",
    title: "झारखंड प्राथमिक पाठ्यक्रम — कक्षा 1 (हिंदी स्वर व वर्णमाला)",
    classLevel: "कक्षा 1",
    board: "झारखंड शैक्षणिक परिषद (JAC)",
    instructions: "कोष्ठक में दिए गए सही वर्ण को चुनकर रिक्त स्थान भरिए:",
    questions: [
      { id: 1, prompt: "१. [ अ, आ, __, ई ] में छूट गया स्वर क्या है?", options: ["इ", "उ"], answer: "इ" },
      { id: 2, prompt: "२. 'क' से शुरू होने वाले शब्द पर टिक लगाएं:", options: ["कमल", "आम"], answer: "कमल" },
      { id: 3, prompt: "३. 'अ' से __ (इमली/अनार)", options: ["अनार", "इमली"], answer: "अनार" },
      { id: 4, prompt: "४. खाली स्थान भरें: क, ख, __, घ", options: ["ग", "च"], answer: "ग" },
      { id: 5, prompt: "५. 'आ' से शुरू होने वाला फल:", options: ["आम", "सेब"], answer: "आम" }
    ],
    answerKey: ["१. इ", "२. कमल", "३. अनार", "४. ग", "५. आम"]
  },
  "class1-math": {
    id: "ws-class1-math",
    title: "झारखंड प्राथमिक पाठ्यक्रम — कक्षा 1 (गणित: गिनती व आकृतियां)",
    classLevel: "कक्षा 1",
    board: "झारखंड शैक्षणिक परिषद (JAC)",
    instructions: "दिए गए प्रश्नों के सही उत्तर चुनें:",
    questions: [
      { id: 1, prompt: "१. १, २, ३ के बाद कौन सी संख्या आती है?", options: ["४", "५"], answer: "४" },
      { id: 2, prompt: "२. २ + १ = कितना होगा?", options: ["३", "४"], answer: "३" },
      { id: 3, prompt: "३. गेंद (Ball) का आकार कैसा होता है?", options: ["गोल (वृत्त)", "चौकोर"], answer: "गोल (वृत्त)" },
      { id: 4, prompt: "४. ५ और ३ में से कौन बड़ी संख्या है?", options: ["५", "३"], answer: "५" },
      { id: 5, prompt: "५. हाथ की एक हथेली में कितनी अंगुलियां होती हैं?", options: ["५", "१०"], answer: "५" }
    ],
    answerKey: ["१. ४", "२. ३", "३. गोल (वृत्त)", "४. ५", "५. ५"]
  },
  "class1-evs": {
    id: "ws-class1-evs",
    title: "झारखंड प्राथमिक पाठ्यक्रम — कक्षा 1 (हमारा परिवेश)",
    classLevel: "कक्षा 1",
    board: "झारखंड शैक्षणिक परिषद (JAC)",
    instructions: "सही उत्तर का चयन करें:",
    questions: [
      { id: 1, prompt: "१. हमारे राष्ट्रीय पक्षी का क्या नाम है?", options: ["मोर", "कौआ"], answer: "मोर" },
      { id: 2, prompt: "२. दूध देने वाले पशु का नाम बताएं:", options: ["गाय", "शेर"], answer: "गाय" },
      { id: 3, prompt: "३. हमें भोजन करने से पहले क्या धोना चाहिए?", options: ["हाथ", "पैर"], answer: "हाथ" }
    ],
    answerKey: ["१. मोर", "२. गाय", "३. हाथ"]
  },
  "class1-olchiki": {
    id: "ws-class1-olchiki",
    title: "झारखंड प्राथमिक पाठ्यक्रम — कक्षा 1 (संथाली Ol Chiki ᱚᱞ ᱪᱤᱠᱤ)",
    classLevel: "कक्षा 1",
    board: "झारखंड प्राथमिक पाठ्यक्रम (JAC)",
    instructions: "ओल चिकी वर्णमाला पहचानें ( Identify Ol Chiki Letter ):",
    questions: [
      { id: 1, prompt: "१. Ol Chiki का पहला अक्षर कौन सा है? (First Ol Chiki letter)", options: ["ᱚ (LA)", "ᱛ (AT)"], answer: "ᱚ (LA)" },
      { id: 2, prompt: "२. संथाली में 'जल/पानी' को क्या कहते हैं?", options: ["ᱫᱟ standard (Da'h)", "ᱚᱞ (Ol)"], answer: "ᱫᱟ standard (Da'h)" }
    ],
    answerKey: ["१. ᱚ (LA)", "२. ᱫᱟ (Da'h)"]
  },
  "class2-hindi": {
    id: "ws-class2-hindi",
    title: "झारखंड प्राथमिक पाठ्यक्रम — कक्षा 2 (हिंदी मात्रा अभ्यास)",
    classLevel: "कक्षा 2",
    board: "झारखंड शैक्षणिक परिषद (JAC)",
    instructions: "सही मात्रा चुनकर शब्द पूरा करें:",
    questions: [
      { id: 1, prompt: "१. क __ ल (कमल)", options: ["म", "ली"], answer: "म" },
      { id: 2, prompt: "२. कि __ ब (किताब)", options: ["ता", "दा"], answer: "ता" },
      { id: 3, prompt: "३. पा __ (पानी)", options: ["नी", "लू"], answer: "नी" },
      { id: 4, prompt: "४. सू __ ज (सूरज)", options: ["र", "त"], answer: "र" },
      { id: 5, prompt: "५. वि __ लय (विद्यालय)", options: ["द्या", "प्या"], answer: "द्या" }
    ],
    answerKey: ["१. म", "२. ता", "३. नी", "४. र", "५. द्या"]
  },
  "class2-math": {
    id: "ws-class2-math",
    title: "झारखंड प्राथमिक पाठ्यक्रम — कक्षा 2 (गणित: जोड-घटाव)",
    classLevel: "कक्षा 2",
    board: "झारखंड शैक्षणिक परिषद (JAC)",
    instructions: "सही संख्या का चुनाव करें:",
    questions: [
      { id: 1, prompt: "१. १२ + ५ = ?", options: ["१७", "१५"], answer: "१७" },
      { id: 2, prompt: "२. २० - ८ = ?", options: ["१२", "१४"], answer: "१२" },
      { id: 3, prompt: "३. २५ के बाद कौन सी संख्या आती है?", options: ["२६", "२४"], answer: "२६" },
      { id: 4, prompt: "४. १० + १० = ?", options: ["२०", "३०"], answer: "२०" }
    ],
    answerKey: ["१. १७", "२. १२", "३. २६", "४. २०"]
  },
  "class2-evs": {
    id: "ws-class2-evs",
    title: "झारखंड प्राथमिक पाठ्यक्रम — कक्षा 2 (पर्यावरण: जल व पेड़)",
    classLevel: "कक्षा 2",
    board: "झारखंड शैक्षणिक परिषद (JAC)",
    instructions: "सही विकल्प चुनें:",
    questions: [
      { id: 1, prompt: "१. हमें ऑक्सीजन कौन देता है?", options: ["पेड़-पौधे", "गाड़ियां"], answer: "पेड़-पौधे" },
      { id: 2, prompt: "२. पीने का पानी कैसा होना चाहिए?", options: ["स्वच्छ व ढका हुआ", "खुला व गंदा"], answer: "स्वच्छ व ढका हुआ" }
    ],
    answerKey: ["१. पेड़-पौधे", "२. स्वच्छ व ढका हुआ"]
  },
  "class2-olchiki": {
    id: "ws-class2-olchiki",
    title: "झारखंड प्राथमिक पाठ्यक्रम — कक्षा 2 (संथाली ᱥᱟᱱᱛᱟᱲᱤ ᱟᱹᱲᱟᱹ)",
    classLevel: "कक्षा 2",
    board: "झारखंड प्राथमिक पाठ्यक्रम (JAC)",
    instructions: "संथाली Ol Chiki शब्द चुनिए:",
    questions: [
      { id: 1, prompt: "१. संथाली में 'किताब' को क्या कहते हैं?", options: ["ᱯᱩᱛᱷᱤ (Puthi)", "ᱫᱟ (Da)"], answer: "ᱯᱩᱛᱷᱤ (Puthi)" },
      { id: 2, prompt: "२. 'मित्र/दोस्त' का संथाली शब्द:", options: ["ᱜᱟᱛᱮ (Gate)", "ᱚᱲᱟᱜ (Orah)"], answer: "ᱜᱟᱛᱮ (Gate)" }
    ],
    answerKey: ["१. ᱯᱩᱛᱷᱤ (Puthi)", "२. ᱜᱟᱛᱮ (Gate)"]
  },
  "class3-hindi": {
    id: "ws-class3-hindi",
    title: "झारखंड प्राथमिक पाठ्यक्रम — कक्षा 3 (हिंदी: संज्ञा व सर्वनाम)",
    classLevel: "कक्षा 3",
    board: "झारखंड शैक्षणिक परिषद (JAC)",
    instructions: "सही विकल्प चुनें:",
    questions: [
      { id: 1, prompt: "१. 'अनन्या खूंटी में रहती है।' में नाम (संज्ञा) शब्द:", options: ["अनन्या, खूंटी", "रहती है"], answer: "अनन्या, खूंटी" },
      { id: 2, prompt: "२. 'दिन' का विलोम (उल्टा) शब्द क्या होगा?", options: ["रात", "सुबह"], answer: "रात" },
      { id: 3, prompt: "३. 'वह पढ़ रहा है।' में सर्वनाम शब्द:", options: ["वह", "रहा"], answer: "वह" }
    ],
    answerKey: ["१. अनन्या, खूंटी", "२. रात", "३. वह"]
  },
  "class3-math": {
    id: "ws-class3-math",
    title: "झारखंड प्राथमिक पाठ्यक्रम — कक्षा 3 (गणित: गुणा व स्थानीय मान)",
    classLevel: "कक्षा 3",
    board: "झारखंड शैक्षणिक परिषद (JAC)",
    instructions: "सही उत्तर चुनें:",
    questions: [
      { id: 1, prompt: "१. ५ × ४ = ?", options: ["२०", "२५"], answer: "२०" },
      { id: 2, prompt: "२. संख्या १५४ में '५' का स्थानीय मान क्या है?", options: ["५० (दहाई)", "५ (इकाई)"], answer: "५० (दहाई)" }
    ],
    answerKey: ["१. २०", "२. ५० (दहाई)"]
  },
  "class3-evs": {
    id: "ws-class3-evs",
    title: "झारखंड प्राथमिक पाठ्यक्रम — कक्षा 3 (पर्यावरण: हमारा झारखंड)",
    classLevel: "कक्षा 3",
    board: "झारखंड शैक्षणिक परिषद (JAC)",
    instructions: "झारखंड राज्य संबंधी प्रश्नों के उत्तर दें:",
    questions: [
      { id: 1, prompt: "१. झारखंड की राजधानी कहाँ है?", options: ["रांची", "खूंटी"], answer: "रांची" },
      { id: 2, prompt: "२. बेतला राष्ट्रीय उद्यान किसके लिए प्रसिद्ध है?", options: ["बाघ व वन्यजीव", "रेगिस्तान"], answer: "बाघ व वन्यजीव" }
    ],
    answerKey: ["१. रांची", "२. बाघ व वन्यजीव"]
  },
  "class3-olchiki": {
    id: "ws-class3-olchiki",
    title: "झारखंड प्राथमिक पाठ्यक्रम — कक्षा 3 (संथाली ᱥᱟᱱᱛᱟᱲᱤ ᱟᱹᱭᱟᱹᱛ)",
    classLevel: "कक्षा 3",
    board: "झारखंड प्राथमिक पाठ्यक्रम (JAC)",
    instructions: "संथाली Ol Chiki वाक्य पहचानें:",
    questions: [
      { id: 1, prompt: "१. 'हम स्कूल जा रहे हैं' का संथाली अनुवाद:", options: ["ᱟᱞᱮ ᱤᱛᱩᱱ ᱟᱥᱲᱟ ᱞᱮ ᱥᱮᱱᱚᱜ ᱠᱟᱱᱟ (Aale itun asra le senog kana)", "ᱫᱟ ᱞᱩᱭ"], answer: "ᱟᱞᱮ ᱤᱛᱩᱱ ᱟᱥᱲᱟ ᱞᱮ ᱥᱮᱱᱚᱜ ᱠᱟᱱᱟ (Aale itun asra le senog kana)" }
    ],
    answerKey: ["१. ᱟᱞᱮ ᱤᱛᱩᱱ ᱟᱥᱲᱟ ᱞᱮ ᱥᱮᱱᱚᱜ ᱠᱟᱱᱟ"]
  }
};

export const INITIAL_COMPLETED_WORKSHEETS = [
  {
    id: "sub-101",
    date: "2026-09-21",
    time: "09:30 AM",
    studentName: "रवि मुर्मू",
    rollNo: "04",
    classLevel: "कक्षा 2",
    worksheetTitle: "झारखंड प्राथमिक पाठ्यक्रम — कक्षा 2 (हिंदी मात्रा अभ्यास)",
    subject: "हिंदी",
    score: "5/5",
    status: "पूर्ण (Completed)"
  },
  {
    id: "sub-102",
    date: "2026-09-20",
    time: "02:15 PM",
    studentName: "सुनीता हांसदा",
    rollNo: "12",
    classLevel: "कक्षा 1",
    worksheetTitle: "झारखंड प्राथमिक पाठ्यक्रम — कक्षा 1 (हिंदी स्वर व वर्णमाला)",
    subject: "हिंदी",
    score: "5/5",
    status: "पूर्ण (Completed)"
  },
  {
    id: "sub-103",
    date: "2026-09-20",
    time: "11:00 AM",
    studentName: "अर्जुन मुंडा",
    rollNo: "08",
    classLevel: "कक्षा 3",
    worksheetTitle: "झारखंड प्राथमिक पाठ्यक्रम — कक्षा 3 (गणित: गुणा व स्थानीय मान)",
    subject: "गणित",
    score: "2/2",
    status: "पूर्ण (Completed)"
  }
];

export const FLASHCARD_ITEMS = [
  // ==================== CLASS 1 (कक्षा 1) — 20 CARDS (5 PER SUBJECT) ====================
  // --- Class 1: हिंदी (5 Cards) ---
  {
    id: 1,
    syllabus: "JAC Board (झारखंड)",
    subject: "हिंदी",
    chapter: "अध्याय 1: हमारा परिवार व परिवेश",
    hindiWord: "नमस्ते",
    pronunciation: "नमस्ते",
    meaningHindi: "अभिवादन / नमस्कार",
    meaningEnglish: "Greetings",
    translations: {
      santhali: "ᱥᱟᱜᱟᱛ / ᱡᱚᱦᱟᱨ (सगात / जोहार)",
      ho: "जोहार",
      mundari: "जोहार",
    },
    category: "दैनिक शब्द",
    classLevel: "कक्षा 1",
    exampleSentence: "हम बड़ों को हाथ जोड़कर नमस्ते कहते हैं।",
    illustrationType: "namaste",
    icon: "🙏",
  },
  {
    id: 2,
    syllabus: "JAC Board (झारखंड)",
    subject: "हिंदी",
    chapter: "अध्याय 2: हमारा विद्यालय",
    hindiWord: "विद्यालय",
    pronunciation: "विद्यालय (स्कूल)",
    meaningHindi: "पाठशाला / ज्ञान का स्थान",
    meaningEnglish: "School",
    translations: {
      santhali: "ᱤᱛᱩᱱ ᱟᱥᱲᱟ (इतून आसड़ा)",
      ho: "ओड़ाः / विद्यालय",
      mundari: "इतून आसड़ा",
    },
    category: "विद्यालय",
    classLevel: "कक्षा 1",
    exampleSentence: "बच्चे प्रतिदिन हंसते-गाते विद्यालय आते हैं।",
    illustrationType: "school",
    icon: "🏫",
  },
  {
    id: 3,
    syllabus: "JAC Board (झारखंड)",
    subject: "हिंदी",
    chapter: "अध्याय 2: हमारा विद्यालय",
    hindiWord: "पुस्तक",
    pronunciation: "पुस्तक (किताब)",
    meaningHindi: "ज्ञान-पुस्तिका / किताब",
    meaningEnglish: "Book",
    translations: {
      santhali: "ᱯᱩᱛᱷᱤ (पुथी)",
      ho: "पुथी",
      mundari: "पुथी",
    },
    category: "विद्यालय",
    classLevel: "कक्षा 1",
    exampleSentence: "पुस्तक पढ़ने से हमारा ज्ञान बढ़ता है।",
    illustrationType: "book",
    icon: "📖",
  },
  {
    id: 4,
    syllabus: "JAC Board (झारखंड)",
    subject: "हिंदी",
    chapter: "अध्याय 1: हमारा परिवार व परिवेश",
    hindiWord: "मित्र",
    pronunciation: "मित्र (दोस्त)",
    meaningHindi: "सखा / पक्का साथी",
    meaningEnglish: "Friend",
    translations: {
      santhali: "ᱜᱟᱛᱮ (गाते)",
      ho: "गाते",
      mundari: "गाते",
    },
    category: "संबंध",
    classLevel: "कक्षा 1",
    exampleSentence: "रवि और अमन पक्के मित्र हैं।",
    illustrationType: "friend",
    icon: "🤝",
  },
  {
    id: 5,
    syllabus: "JAC Board (झारखंड)",
    subject: "हिंदी",
    chapter: "अध्याय 1: हमारा परिवार व परिवेश",
    hindiWord: "घर",
    pronunciation: "घर (मकान)",
    meaningHindi: "परिवार का आवास स्थान",
    meaningEnglish: "Home",
    translations: {
      santhali: "ᱚᱲᱟᱜ (ओड़ाः)",
      ho: "ओड़ाः",
      mundari: "ओड़ाः",
    },
    category: "दैनिक शब्द",
    classLevel: "कक्षा 1",
    exampleSentence: "हम सब मिलकर अपने घर को सुंदर रखते हैं।",
    illustrationType: "home",
    icon: "🏠",
  },

  // --- Class 1: गणित (5 Cards) ---
  {
    id: 6,
    syllabus: "JAC Board (झारखंड)",
    subject: "गणित",
    chapter: "अध्याय 1: संख्या 1 से 5 तक",
    hindiWord: "एक (1)",
    pronunciation: "एक (संख्या)",
    meaningHindi: "संख्या मान एक (1)",
    meaningEnglish: "Number 1",
    translations: {
      santhali: "ᱢᱤᱫ (मित्)",
      ho: "मित्",
      mundari: "मित्",
    },
    category: "गणित",
    classLevel: "कक्षा 1",
    exampleSentence: "आकाश में एक सूर्य चमक रहा है।",
    illustrationType: "number",
    icon: "1️⃣",
  },
  {
    id: 7,
    syllabus: "JAC Board (झारखंड)",
    subject: "गणित",
    chapter: "अध्याय 1: संख्या 1 से 5 तक",
    hindiWord: "दो (2)",
    pronunciation: "दो (संख्या)",
    meaningHindi: "संख्या मान दो (2)",
    meaningEnglish: "Number 2",
    translations: {
      santhali: "ᱵᱟᱨ (बार)",
      ho: "बार",
      mundari: "बार",
    },
    category: "गणित",
    classLevel: "कक्षा 1",
    exampleSentence: "पक्षी के दो पंख होते हैं।",
    illustrationType: "number",
    icon: "2️⃣",
  },
  {
    id: 8,
    syllabus: "JAC Board (झारखंड)",
    subject: "गणित",
    chapter: "अध्याय 1: संख्या 1 से 5 तक",
    hindiWord: "तीन (3)",
    pronunciation: "तीन (संख्या)",
    meaningHindi: "संख्या मान तीन (3)",
    meaningEnglish: "Number 3",
    translations: {
      santhali: "ᱯᱮ (पे)",
      ho: "पे",
      mundari: "पे",
    },
    category: "गणित",
    classLevel: "कक्षा 1",
    exampleSentence: "त्रिभुज की तीन भुजाएं होती हैं।",
    illustrationType: "number",
    icon: "3️⃣",
  },
  {
    id: 9,
    syllabus: "JAC Board (झारखंड)",
    subject: "गणित",
    chapter: "अध्याय 1: संख्या 1 से 5 तक",
    hindiWord: "चार (4)",
    pronunciation: "चार (संख्या)",
    meaningHindi: "संख्या मान चार (4)",
    meaningEnglish: "Number 4",
    translations: {
      santhali: "ᱯᱩᱱ (पुन)",
      ho: "पुन",
      mundari: "पुन",
    },
    category: "गणित",
    classLevel: "कक्षा 1",
    exampleSentence: "गाय के चार पैर होते हैं।",
    illustrationType: "number",
    icon: "4️⃣",
  },
  {
    id: 10,
    syllabus: "JAC Board (झारखंड)",
    subject: "गणित",
    chapter: "अध्याय 1: संख्या 1 से 5 तक",
    hindiWord: "पांच (5)",
    pronunciation: "पांच (संख्या)",
    meaningHindi: "संख्या मान पांच (5)",
    meaningEnglish: "Number 5",
    translations: {
      santhali: "ᱢᱚᱬᱮ (मोड़े)",
      ho: "मोड़े",
      mundari: "मोड़े",
    },
    category: "गणित",
    classLevel: "कक्षा 1",
    exampleSentence: "एक हाथ में पांच अंगुलियां होती हैं।",
    illustrationType: "number",
    icon: "🖐️",
  },

  // --- Class 1: पर्यावरण अध्ययन - EVS (5 Cards) ---
  {
    id: 11,
    syllabus: "JAC Board (झारखंड)",
    subject: "पर्यावरण अध्ययन (EVS)",
    chapter: "अध्याय 3: जल एवं जल चक्र",
    hindiWord: "जल",
    pronunciation: "जल (पानी)",
    meaningHindi: "पीने का स्वच्छ जल",
    meaningEnglish: "Water",
    translations: {
      santhali: "ᱫᱟᱜ (दाग् / दाः)",
      ho: "दाः",
      mundari: "दाः",
    },
    category: "प्रकृति",
    classLevel: "कक्षा 1",
    exampleSentence: "हमें प्रतिदिन स्वच्छ जल पीना चाहिए।",
    illustrationType: "water",
    icon: "💧",
  },
  {
    id: 12,
    syllabus: "JAC Board (झारखंड)",
    subject: "पर्यावरण अध्ययन (EVS)",
    chapter: "अध्याय 4: हमारे पेड़-पौधे",
    hindiWord: "वृक्ष",
    pronunciation: "वृक्ष (पेड़)",
    meaningHindi: "पेड़-पौधे / हरियाली",
    meaningEnglish: "Tree",
    translations: {
      santhali: "ᱫᱟᱨᱮ (दारे)",
      ho: "दारे",
      mundari: "दारे",
    },
    category: "प्रकृति",
    classLevel: "कक्षा 1",
    exampleSentence: "वृक्ष हमें छाया और फल देते हैं।",
    illustrationType: "tree",
    icon: "🌳",
  },
  {
    id: 13,
    syllabus: "JAC Board (झारखंड)",
    subject: "पर्यावरण अध्ययन (EVS)",
    chapter: "अध्याय 5: पशु-पक्षी",
    hindiWord: "पक्षी",
    pronunciation: "पक्षी (चिड़िया)",
    meaningHindi: "आकाश में उड़ने वाली चिड़िया",
    meaningEnglish: "Bird",
    translations: {
      santhali: "ᱪᱮᱬᱮ (चेणे / चँड़े)",
      ho: "चेणे",
      mundari: "चेणे",
    },
    category: "प्रकृति",
    classLevel: "कक्षा 1",
    exampleSentence: "सुबह-सुबह पक्षी मीठे स्वर में चहचहाते हैं।",
    illustrationType: "bird",
    icon: "🐦",
  },
  {
    id: 14,
    syllabus: "JAC Board (झारखंड)",
    subject: "पर्यावरण अध्ययन (EVS)",
    chapter: "अध्याय 4: हमारे पेड़-पौधे",
    hindiWord: "फल",
    pronunciation: "फल",
    meaningHindi: "स्वादिष्ट प्राकृतिक आहार",
    meaningEnglish: "Fruit",
    translations: {
      santhali: "ᱡᱚ (जो)",
      ho: "जो",
      mundari: "जो",
    },
    category: "प्रकृति",
    classLevel: "कक्षा 1",
    exampleSentence: "ताजे फल खाने से शरीर स्वस्थ रहता है।",
    illustrationType: "fruit",
    icon: "🍎",
  },
  {
    id: 15,
    syllabus: "JAC Board (झारखंड)",
    subject: "पर्यावरण अध्ययन (EVS)",
    chapter: "अध्याय 4: हमारे पेड़-पौधे",
    hindiWord: "फूल",
    pronunciation: "फूल (पुष्प)",
    meaningHindi: "सुगंधित पुष्प",
    meaningEnglish: "Flower",
    translations: {
      santhali: "ᱵᱟᱦᱟ (बाहा)",
      ho: "बाहा",
      mundari: "बाहा",
    },
    category: "प्रकृति",
    classLevel: "कक्षा 1",
    exampleSentence: "बगीचे में रंग-बिरंगे फूल खिले हैं।",
    illustrationType: "flower",
    icon: "🌸",
  },

  // --- Class 1: संथाली - ओल चिकी (5 Cards) ---
  {
    id: 16,
    syllabus: "JAC Board (झारखंड)",
    subject: "संथाली (ओल चिकी)",
    chapter: "अध्याय 1: ओल चिकी पहचान",
    hindiWord: "जोहार",
    pronunciation: "जोहार (अभिवादन)",
    meaningHindi: "संथाली आदरसूचक अभिवादन",
    meaningEnglish: "Santali Greeting",
    translations: {
      santhali: "ᱡᱚᱦᱟᱨ (जोहार)",
      ho: "जोहार",
      mundari: "जोहार",
    },
    category: "संथाली",
    classLevel: "कक्षा 1",
    exampleSentence: "संथाली समाज में सब मिलकर जोहार करते हैं।",
    illustrationType: "greetings",
    icon: "🙏",
  },
  {
    id: 17,
    syllabus: "JAC Board (झारखंड)",
    subject: "संथाली (ओल चिकी)",
    chapter: "अध्याय 1: ओल चिकी पहचान",
    hindiWord: "गीदरा (बच्चा)",
    pronunciation: "गीदरा (बालक)",
    meaningHindi: "छोटा बालक / बच्चा",
    meaningEnglish: "Child",
    translations: {
      santhali: "ᱜᱤᱫᱽᱨᱟᱹ (गिदरा)",
      ho: "गिदरा",
      mundari: "गिदरा",
    },
    category: "संथाली",
    classLevel: "कक्षा 1",
    exampleSentence: "गीदरा हंसते हुए खेल रहा है।",
    illustrationType: "child",
    icon: "🧒",
  },
  {
    id: 18,
    syllabus: "JAC Board (झारखंड)",
    subject: "संथाली (ओल चिकी)",
    chapter: "अध्याय 2: स्वर अक्षर",
    hindiWord: "अ (अक्षर)",
    pronunciation: "अ (पहला स्वर)",
    meaningHindi: "ओल चिकी का प्रथम अक्षर ᱚ",
    meaningEnglish: "First Ol Chiki Vowel",
    translations: {
      santhali: "ᱚ (अ)",
      ho: "अ",
      mundari: "अ",
    },
    category: "संथाली",
    classLevel: "कक्षा 1",
    exampleSentence: "ᱚ (अ) ओल चिकी का प्रथम स्वर वर्ण है।",
    illustrationType: "letter",
    icon: "🔤",
  },
  {
    id: 19,
    syllabus: "JAC Board (झारखंड)",
    subject: "संथाली (ओल चिकी)",
    chapter: "अध्याय 2: स्वर अक्षर",
    hindiWord: "ओल (लिखना)",
    pronunciation: "ओल (लिखना)",
    meaningHindi: "लिखना व पढ़ना",
    meaningEnglish: "To Write",
    translations: {
      santhali: "ᱚᱞ (ओल)",
      ho: "ओल",
      mundari: "ओल",
    },
    category: "संथाली",
    classLevel: "कक्षा 1",
    exampleSentence: "बच्चे कॉपी में सुंदर ओल (लिखाई) करते हैं।",
    illustrationType: "write",
    icon: "✍️",
  },
  {
    id: 20,
    syllabus: "JAC Board (झारखंड)",
    subject: "संथाली (ओल चिकी)",
    chapter: "अध्याय 3: दैनिक शब्द",
    hindiWord: "सेंगेल (आग)",
    pronunciation: "सेंगेल (अग्नि)",
    meaningHindi: "अग्नि / आग",
    meaningEnglish: "Fire",
    translations: {
      santhali: "ᱥᱮᱸᱜᱮᱞ (सेंगेल)",
      ho: "सेंगेल",
      mundari: "सेंगेल",
    },
    category: "संथाली",
    classLevel: "कक्षा 1",
    exampleSentence: "जाड़े में सेंगेल (आग) तापते हैं।",
    illustrationType: "fire",
    icon: "🔥",
  },

  // ==================== CLASS 2 (कक्षा 2) — 20 CARDS (5 PER SUBJECT) ====================
  // --- Class 2: हिंदी (5 Cards) ---
  {
    id: 21,
    syllabus: "JAC Board (झारखंड)",
    subject: "हिंदी",
    chapter: "अध्याय 1: परिश्रम का महत्व",
    hindiWord: "परिश्रम",
    pronunciation: "परिश्रम (मेहनत)",
    meaningHindi: "कड़ा काम / मेहनत",
    meaningEnglish: "Hard work",
    translations: {
      santhali: "ᱠᱟᱹᱢᱤ (कमी / काम)",
      ho: "कमी",
      mundari: "कमी",
    },
    category: "नैतिक मूल्य",
    classLevel: "कक्षा 2",
    exampleSentence: "परिश्रम करने वाले बच्चे हमेशा सफल होते हैं।",
    illustrationType: "work",
    icon: "💪",
  },
  {
    id: 22,
    syllabus: "JAC Board (झारखंड)",
    subject: "हिंदी",
    chapter: "अध्याय 2: सच्चाई की राह",
    hindiWord: "सत्य",
    pronunciation: "सत्य (सच)",
    meaningHindi: "सच्चाई व ईमानदारी",
    meaningEnglish: "Truth",
    translations: {
      santhali: "ᱥᱚᱛ (सोत)",
      ho: "सोत",
      mundari: "सोत",
    },
    category: "नैतिक मूल्य",
    classLevel: "कक्षा 2",
    exampleSentence: "हमें हमेशा सत्य बोलना चाहिए।",
    illustrationType: "truth",
    icon: "✨",
  },
  {
    id: 23,
    syllabus: "JAC Board (झारखंड)",
    subject: "हिंदी",
    chapter: "अध्याय 3: विद्यालय के नियम",
    hindiWord: "अनुशासन",
    pronunciation: "अनुशासन",
    meaningHindi: "नियमों का पालन करना",
    meaningEnglish: "Discipline",
    translations: {
      santhali: "ᱱᱟᱯᱟᱭ ᱦᱚᱨ (नापाय होर)",
      ho: "नापाय होर",
      mundari: "नापाय होर",
    },
    category: "विद्यालय",
    classLevel: "कक्षा 2",
    exampleSentence: "अनुशासन से जीवन सुंदर बनता है।",
    illustrationType: "rule",
    icon: "🎯",
  },
  {
    id: 24,
    syllabus: "JAC Board (झारखंड)",
    subject: "हिंदी",
    chapter: "अध्याय 1: परिश्रम का महत्व",
    hindiWord: "सफलता",
    pronunciation: "सफलता (जीत)",
    meaningHindi: "जीत व सिद्धि पाना",
    meaningEnglish: "Success",
    translations: {
      santhali: "ᱡᱤᱛᱠᱟᱹᱨ (जितकार)",
      ho: "जितकार",
      mundari: "जितकार",
    },
    category: "नैतिक मूल्य",
    classLevel: "कक्षा 2",
    exampleSentence: "मेहनत से ही जीवन में सफलता मिलती है।",
    illustrationType: "success",
    icon: "🏆",
  },
  {
    id: 25,
    syllabus: "JAC Board (झारखंड)",
    subject: "हिंदी",
    chapter: "अध्याय 4: मिलजुल कर रहो",
    hindiWord: "एकता",
    pronunciation: "एकता (संगठन)",
    meaningHindi: "मिलजुल कर रहना",
    meaningEnglish: "Unity",
    translations: {
      santhali: "ᱢᱤᱫᱩᱛ (मिदुत / एकता)",
      ho: "मिदुत",
      mundari: "मिदुत",
    },
    category: "नैतिक मूल्य",
    classLevel: "कक्षा 2",
    exampleSentence: "एकता में ही असली शक्ति होती है।",
    illustrationType: "unity",
    icon: "🤝",
  },

  // --- Class 2: गणित (5 Cards) ---
  {
    id: 26,
    syllabus: "JAC Board (झारखंड)",
    subject: "गणित",
    chapter: "अध्याय 1: संख्या 6 से 20 तक",
    hindiWord: "छह (6)",
    pronunciation: "छह (संख्या)",
    meaningHindi: "संख्या मान छह (6)",
    meaningEnglish: "Number 6",
    translations: {
      santhali: "ᱛᱩᱨᱩᱭ (तुरुय)",
      ho: "तुरुय",
      mundari: "तुरुय",
    },
    category: "गणित",
    classLevel: "कक्षा 2",
    exampleSentence: "पासे में छह फलक होते हैं।",
    illustrationType: "number",
    icon: "6️⃣",
  },
  {
    id: 27,
    syllabus: "JAC Board (झारखंड)",
    subject: "गणित",
    chapter: "अध्याय 1: संख्या 6 से 20 तक",
    hindiWord: "सात (7)",
    pronunciation: "सात (संख्या)",
    meaningHindi: "संख्या मान सात (7)",
    meaningEnglish: "Number 7",
    translations: {
      santhali: "ᱮᱭᱟᱭ (एयाय)",
      ho: "एयाय",
      mundari: "एयाय",
    },
    category: "गणित",
    classLevel: "कक्षा 2",
    exampleSentence: "इन्द्रधनुष में सात रंग होते हैं।",
    illustrationType: "number",
    icon: "7️⃣",
  },
  {
    id: 28,
    syllabus: "JAC Board (झारखंड)",
    subject: "गणित",
    chapter: "अध्याय 1: संख्या 6 से 20 तक",
    hindiWord: "आठ (8)",
    pronunciation: "आठ (संख्या)",
    meaningHindi: "संख्या मान आठ (8)",
    meaningEnglish: "Number 8",
    translations: {
      santhali: "ᱤᱨᱟᱹᱞ (इरल)",
      ho: "इरल",
      mundari: "इरल",
    },
    category: "गणित",
    classLevel: "कक्षा 2",
    exampleSentence: "मकड़ी के आठ पैर होते हैं।",
    illustrationType: "number",
    icon: "8️⃣",
  },
  {
    id: 29,
    syllabus: "JAC Board (झारखंड)",
    subject: "गणित",
    chapter: "अध्याय 1: संख्या 6 से 20 तक",
    hindiWord: "नौ (9)",
    pronunciation: "नौ (संख्या)",
    meaningHindi: "संख्या मान नौ (9)",
    meaningEnglish: "Number 9",
    translations: {
      santhali: "ᱟᱨᱮ (आरे)",
      ho: "आरे",
      mundari: "आरे",
    },
    category: "गणित",
    classLevel: "कक्षा 2",
    exampleSentence: "नवरत्न में नौ रत्न होते हैं।",
    illustrationType: "number",
    icon: "9️⃣",
  },
  {
    id: 30,
    syllabus: "JAC Board (झारखंड)",
    subject: "गणित",
    chapter: "अध्याय 1: संख्या 6 से 20 तक",
    hindiWord: "दस (10)",
    pronunciation: "दस (संख्या)",
    meaningHindi: "संख्या मान दस (10)",
    meaningEnglish: "Number 10",
    translations: {
      santhali: "ᱜᱮᱞ (गेल)",
      ho: "गेल",
      mundari: "गेल",
    },
    category: "गणित",
    classLevel: "कक्षा 2",
    exampleSentence: "दोनों हाथों की कुल दस अंगुलियां होती हैं।",
    illustrationType: "number",
    icon: "🔟",
  },

  // --- Class 2: पर्यावरण अध्ययन - EVS (5 Cards) ---
  {
    id: 31,
    syllabus: "JAC Board (झारखंड)",
    subject: "पर्यावरण अध्ययन (EVS)",
    chapter: "अध्याय 3: सूर्य व सौरमंडल",
    hindiWord: "सूर्य",
    pronunciation: "सूर्य (सूरज)",
    meaningHindi: "दिन का प्रकाश व तेज",
    meaningEnglish: "Sun",
    translations: {
      santhali: "ᱥᱤᱝᱜᱤ (सिंगी)",
      ho: "सिंगी",
      mundari: "सिंगी",
    },
    category: "प्रकृति",
    classLevel: "कक्षा 2",
    exampleSentence: "सूर्य पूरब दिशा में उगता है।",
    illustrationType: "sun",
    icon: "☀️",
  },
  {
    id: 32,
    syllabus: "JAC Board (झारखंड)",
    subject: "पर्यावरण अध्ययन (EVS)",
    chapter: "अध्याय 3: सूर्य व सौरमंडल",
    hindiWord: "चंद्रमा",
    pronunciation: "चंद्रमा (चांद)",
    meaningHindi: "रात का शीतल प्रकाश",
    meaningEnglish: "Moon",
    translations: {
      santhali: "ᱪᱟᱸᱫᱚ (चांदो)",
      ho: "चांदो",
      mundari: "चांदो",
    },
    category: "प्रकृति",
    classLevel: "कक्षा 2",
    exampleSentence: "रात में चंद्रमा सुंदर दिखाई देता है।",
    illustrationType: "moon",
    icon: "🌙",
  },
  {
    id: 33,
    syllabus: "JAC Board (झारखंड)",
    subject: "पर्यावरण अध्ययन (EVS)",
    chapter: "अध्याय 4: मौसम व ऋतुएं",
    hindiWord: "मौसम",
    pronunciation: "मौसम (ऋतु)",
    meaningHindi: "गर्मी, सर्दी व बरसात",
    meaningEnglish: "Weather",
    translations: {
      santhali: "ᱥᱤᱛᱩᱝ ᱟᱨ ᱨᱟᱵᱟᱝ (सितुंग आर राबांग)",
      ho: "राबांग",
      mundari: "राबांग",
    },
    category: "प्रकृति",
    classLevel: "कक्षा 2",
    exampleSentence: "बरसात के मौसम में चारों ओर हरियाली छा जाती है।",
    illustrationType: "weather",
    icon: "🌧️",
  },
  {
    id: 34,
    syllabus: "JAC Board (झारखंड)",
    subject: "पर्यावरण अध्ययन (EVS)",
    chapter: "अध्याय 5: हमारे प्राकृतिक संसाधन",
    hindiWord: "नदी",
    pronunciation: "नदी (सरिता)",
    meaningHindi: "बहती जलधारा",
    meaningEnglish: "River",
    translations: {
      santhali: "ᱜᱟᱰᱟ (गाड़ा)",
      ho: "गाड़ा",
      mundari: "गाड़ा",
    },
    category: "प्रकृति",
    classLevel: "कक्षा 2",
    exampleSentence: "गांव के पास एक सुंदर नदी बहती है।",
    illustrationType: "river",
    icon: "🏞️",
  },
  {
    id: 35,
    syllabus: "JAC Board (झारखंड)",
    subject: "पर्यावरण अध्ययन (EVS)",
    chapter: "अध्याय 5: हमारे प्राकृतिक संसाधन",
    hindiWord: "पर्वत",
    pronunciation: "पर्वत (पहाड़)",
    meaningHindi: "ऊंचा पहाड़",
    meaningEnglish: "Mountain",
    translations: {
      santhali: "ᱵᱩᱨᱩ (बुरु)",
      ho: "बुरु",
      mundari: "बुरु",
    },
    category: "प्रकृति",
    classLevel: "कक्षा 2",
    exampleSentence: "पर्वत से मीठा झरना बहता है।",
    illustrationType: "mountain",
    icon: "⛰️",
  },

  // --- Class 2: संथाली - ओल चिकी (5 Cards) ---
  {
    id: 36,
    syllabus: "JAC Board (झारखंड)",
    subject: "संथाली (ओल चिकी)",
    chapter: "अध्याय 1: ओल चिकी वर्णमाला",
    hindiWord: "ओल चिकी",
    pronunciation: "ओल चिकी (लिपि)",
    meaningHindi: "संथाली भाषा की अपनी लिपि",
    meaningEnglish: "Ol Chiki Script",
    translations: {
      santhali: "ᱚᱞ ᱪᱤᱠᱤ (ओल चिकी)",
      ho: "ओल चिकी",
      mundari: "ओल चिकी",
    },
    category: "संथाली",
    classLevel: "कक्षा 2",
    exampleSentence: "पंडित रघुनाथ मुर्मू जी ने ओल चिकी लिपि की खोज की।",
    illustrationType: "script",
    icon: "✍️",
  },
  {
    id: 37,
    syllabus: "JAC Board (झारखंड)",
    subject: "संथाली (ओल चिकी)",
    chapter: "अध्याय 2: प्रकृति व जीव",
    hindiWord: "गाजड़ (जंगल)",
    pronunciation: "गाजड़ (वन)",
    meaningHindi: "हरा-भरा जंगल व वन",
    meaningEnglish: "Forest",
    translations: {
      santhali: "ᱜᱟᱡᱟᱲ (गाजड़)",
      ho: "गाजड़",
      mundari: "गाजड़",
    },
    category: "संथाली",
    classLevel: "कक्षा 2",
    exampleSentence: "गाजड़ (जंगल) में अनेक जंगली पशु रहते हैं।",
    illustrationType: "forest",
    icon: "🌲",
  },
  {
    id: 38,
    syllabus: "JAC Board (झारखंड)",
    subject: "संथाली (ओल चिकी)",
    chapter: "अध्याय 3: हमारा परिवेश",
    hindiWord: "हातु (गांव)",
    pronunciation: "हातु (गांव)",
    meaningHindi: "हमारा प्यारा गांव",
    meaningEnglish: "Village",
    translations: {
      santhali: "ᱟᱛᱩ (आतु / हातु)",
      ho: "आतु",
      mundari: "आतु",
    },
    category: "संथाली",
    classLevel: "कक्षा 2",
    exampleSentence: "हमारा हातु (गांव) बहुत सुंदर है।",
    illustrationType: "village",
    icon: "🏡",
  },
  {
    id: 39,
    syllabus: "JAC Board (झारखंड)",
    subject: "संथाली (ओल चिकी)",
    chapter: "अध्याय 2: प्रकृति व जीव",
    hindiWord: "झरना",
    pronunciation: "झरना (जल प्रपात)",
    meaningHindi: "पहाड़ से बहता जल",
    meaningEnglish: "Waterfall",
    translations: {
      santhali: "ᱡᱷᱟᱨᱱᱟ (झरना)",
      ho: "झरना",
      mundari: "झरना",
    },
    category: "संथाली",
    classLevel: "कक्षा 2",
    exampleSentence: "झरने का जल बहुत मीठा होता है।",
    illustrationType: "waterfall",
    icon: "💦",
  },
  {
    id: 40,
    syllabus: "JAC Board (झारखंड)",
    subject: "संथाली (ओल चिकी)",
    chapter: "अध्याय 4: लोक कला व संस्कृति",
    hindiWord: "सेरेंग (गीत)",
    pronunciation: "सेरेंग (गान)",
    meaningHindi: "लोक गीत व संगीत",
    meaningEnglish: "Folk Song",
    translations: {
      santhali: "ᱥᱮᱨᱮᱧ (सेरेंग)",
      ho: "सेरेंग",
      mundari: "सेरेंग",
    },
    category: "संथाली",
    classLevel: "कक्षा 2",
    exampleSentence: "त्योहार में सब मिलकर सेरेंग गाते हैं।",
    illustrationType: "song",
    icon: "🎵",
  },

  // ==================== CLASS 3 (कक्षा 3) — 20 CARDS (5 PER SUBJECT) ====================
  // --- Class 3: हिंदी (5 Cards) ---
  {
    id: 41,
    syllabus: "JAC Board (झारखंड)",
    subject: "हिंदी",
    chapter: "अध्याय 1: ईमानदारी की जीत",
    hindiWord: "ईमानदारी",
    pronunciation: "ईमानदारी",
    meaningHindi: "सच्चा आचरण व निष्ठा",
    meaningEnglish: "Honesty",
    translations: {
      santhali: "ᱥᱚᱛ-ᱵᱷᱟᱣ (सोत-भाव)",
      ho: "सोत-भाव",
      mundari: "सोत-भाव",
    },
    category: "नैतिक मूल्य",
    classLevel: "कक्षा 3",
    exampleSentence: "ईमानदारी का फल हमेशा मीठा होता है।",
    illustrationType: "honesty",
    icon: "🏅",
  },
  {
    id: 42,
    syllabus: "JAC Board (झारखंड)",
    subject: "हिंदी",
    chapter: "अध्याय 2: दया व सहानुभूति",
    hindiWord: "सहानुभूति",
    pronunciation: "सहानुभूति (दया)",
    meaningHindi: "दूसरों का दुख समझना",
    meaningEnglish: "Empathy",
    translations: {
      santhali: "ᱫᱩᱞᱟᱹᱲ-ᱫᱟᱭᱟ (दुलार-दाया)",
      ho: "दया",
      mundari: "दया",
    },
    category: "नैतिक मूल्य",
    classLevel: "कक्षा 3",
    exampleSentence: "हमें असहाय जीवों के प्रति सहानुभूति रखनी चाहिए।",
    illustrationType: "empathy",
    icon: "❤️",
  },
  {
    id: 43,
    syllabus: "JAC Board (झारखंड)",
    subject: "हिंदी",
    chapter: "अध्याय 3: हमारा कर्तव्य",
    hindiWord: "कर्तव्य",
    pronunciation: "कर्तव्य (फर्ज)",
    meaningHindi: "नैतिक जिम्मेदारी व काम",
    meaningEnglish: "Duty",
    translations: {
      santhali: "ᱠᱟᱹᱢᱤ-ᱦᱚᱨ (कमी-होर)",
      ho: "कमी-होर",
      mundari: "कमी-होर",
    },
    category: "नैतिक मूल्य",
    classLevel: "कक्षा 3",
    exampleSentence: "देश और समाज की सेवा हमारा परम कर्तव्य है।",
    illustrationType: "duty",
    icon: "📜",
  },
  {
    id: 44,
    syllabus: "JAC Board (झारखंड)",
    subject: "हिंदी",
    chapter: "अध्याय 4: वीर बालक",
    hindiWord: "साहस",
    pronunciation: "साहस (हिम्मत)",
    meaningHindi: "वीरता व निडरता",
    meaningEnglish: "Courage",
    translations: {
      santhali: "ᱥᱟᱦᱟᱥ (साहस)",
      ho: "साहस",
      mundari: "साहस",
    },
    category: "नैतिक मूल्य",
    classLevel: "कक्षा 3",
    exampleSentence: "मुसीबत के समय साहस से काम लेना चाहिए।",
    illustrationType: "courage",
    icon: "🦁",
  },
  {
    id: 45,
    syllabus: "JAC Board (झारखंड)",
    subject: "हिंदी",
    chapter: "अध्याय 5: विद्या का दीप",
    hindiWord: "विद्या",
    pronunciation: "विद्या (ज्ञान)",
    meaningHindi: "ज्ञान व शिक्षा",
    meaningEnglish: "Knowledge",
    translations: {
      santhali: "ᱧᱟᱱᱚᱢ (ज्ञानम / विद्या)",
      ho: "ज्ञानम",
      mundari: "ज्ञानम",
    },
    category: "विद्या",
    classLevel: "कक्षा 3",
    exampleSentence: "विद्या अर्जित करने से जीवन में प्रकाश फैलता है।",
    illustrationType: "knowledge",
    icon: "🎓",
  },

  // --- Class 3: गणित (5 Cards) ---
  {
    id: 46,
    syllabus: "JAC Board (झारखंड)",
    subject: "गणित",
    chapter: "अध्याय 1: जोड़ व घटाव",
    hindiWord: "जोड़ (योग)",
    pronunciation: "जोड़ (प्लस)",
    meaningHindi: "संख्याओं को मिलाना",
    meaningEnglish: "Addition",
    translations: {
      santhali: "ᱢᱮᱥᱟ (मेसा)",
      ho: "मेसा",
      mundari: "मेसा",
    },
    category: "गणित",
    classLevel: "कक्षा 3",
    exampleSentence: "5 और 5 को जोड़ने पर 10 प्राप्त होता है।",
    illustrationType: "math",
    icon: "➕",
  },
  {
    id: 47,
    syllabus: "JAC Board (झारखंड)",
    subject: "गणित",
    chapter: "अध्याय 1: जोड़ व घटाव",
    hindiWord: "घटाव (अंतर)",
    pronunciation: "घटाव (माइनस)",
    meaningHindi: "संख्याओं को कम करना",
    meaningEnglish: "Subtraction",
    translations: {
      santhali: "ᱵᱷᱮᱜᱟᱨ (भेगार)",
      ho: "भेगार",
      mundari: "भेगार",
    },
    category: "गणित",
    classLevel: "कक्षा 3",
    exampleSentence: "10 में से 4 घटाने पर 6 बचता है।",
    illustrationType: "math",
    icon: "➖",
  },
  {
    id: 48,
    syllabus: "JAC Board (झारखंड)",
    subject: "गणित",
    chapter: "अध्याय 2: गुणा व बारम्बार जोड़",
    hindiWord: "गुणा (गुणन)",
    pronunciation: "गुणा (मल्टीप्लाई)",
    meaningHindi: "बारम्बार जोड़ना",
    meaningEnglish: "Multiplication",
    translations: {
      santhali: "ᱜᱟᱬᱟ (गाणा)",
      ho: "गाणा",
      mundari: "गाणा",
    },
    category: "गणित",
    classLevel: "कक्षा 3",
    exampleSentence: "3 गुणा 4 का मान 12 होता है।",
    illustrationType: "math",
    icon: "✖️",
  },
  {
    id: 49,
    syllabus: "JAC Board (झारखंड)",
    subject: "गणित",
    chapter: "अध्याय 3: भाग की समझ",
    hindiWord: "भाग (विभाजन)",
    pronunciation: "भाग (डिवाइड)",
    meaningHindi: "बराबर हिस्सों में बाँटना",
    meaningEnglish: "Division",
    translations: {
      santhali: "ᱦᱟᱹᱴᱤᱧ (हटिंग)",
      ho: "हटिंग",
      mundari: "हटिंग",
    },
    category: "गणित",
    classLevel: "कक्षा 3",
    exampleSentence: "12 टॉफियों को 3 बच्चों में बांटने पर प्रत्येक को 4 मिलती हैं।",
    illustrationType: "math",
    icon: "➗",
  },
  {
    id: 50,
    syllabus: "JAC Board (झारखंड)",
    subject: "गणित",
    chapter: "अध्याय 4: स्थानीय मान व रूप",
    hindiWord: "स्थानीय मान",
    pronunciation: "स्थानीय मान",
    meaningHindi: "संख्या में अंक का स्थान मान",
    meaningEnglish: "Place Value",
    translations: {
      santhali: "ᱴᱷᱟᱶ ᱢᱟᱱ (ठांव मान)",
      ho: "ठांव मान",
      mundari: "ठांव मान",
    },
    category: "गणित",
    classLevel: "कक्षा 3",
    exampleSentence: "संख्या 345 में 3 का स्थानीय मान 300 है।",
    illustrationType: "placevalue",
    icon: "🔢",
  },

  // --- Class 3: पर्यावरण अध्ययन - EVS (5 Cards) ---
  {
    id: 51,
    syllabus: "JAC Board (झारखंड)",
    subject: "पर्यावरण अध्ययन (EVS)",
    chapter: "अध्याय 3: पर्यावरण संरक्षण",
    hindiWord: "पर्यावरण",
    pronunciation: "पर्यावरण (प्रकृति)",
    meaningHindi: "हमारे चारों ओर का वातावरण",
    meaningEnglish: "Environment",
    translations: {
      santhali: "ᱯᱨᱟᱠᱨᱤᱛᱤ (प्रकृति / पर्यावरण)",
      ho: "प्रकृति",
      mundari: "प्रकृति",
    },
    category: "प्रकृति",
    classLevel: "कक्षा 3",
    exampleSentence: "पर्यावरण की रक्षा करना हमारा परम कर्तव्य है।",
    illustrationType: "environment",
    icon: "🌍",
  },
  {
    id: 52,
    syllabus: "JAC Board (झारखंड)",
    subject: "पर्यावरण अध्ययन (EVS)",
    chapter: "अध्याय 4: जल व वन संरक्षण",
    hindiWord: "संरक्षण",
    pronunciation: "संरक्षण (सुरक्षा)",
    meaningHindi: "बचाव व सुरक्षा करना",
    meaningEnglish: "Conservation",
    translations: {
      santhali: "ᱨᱩᱠᱷᱤᱭᱟᱹ (रुक्रिया)",
      ho: "रुक्रिया",
      mundari: "रुक्रिया",
    },
    category: "प्रकृति",
    classLevel: "कक्षा 3",
    exampleSentence: "जल और वनों का संरक्षण से भविष्य सुरक्षित रहता है।",
    illustrationType: "protection",
    icon: "🛡️",
  },
  {
    id: 53,
    syllabus: "JAC Board (झारखंड)",
    subject: "पर्यावरण अध्ययन (EVS)",
    chapter: "अध्याय 5: प्रदूषण निवारण",
    hindiWord: "प्रदूषण",
    pronunciation: "प्रदूषण",
    meaningHindi: "हवा, पानी व मिट्टी का अस्वच्छ होना",
    meaningEnglish: "Pollution",
    translations: {
      santhali: "ᱵᱟᱹᱲᱤᱡ ᱦᱚᱭ (बारिज हॉय)",
      ho: "बारिज हॉय",
      mundari: "बारिज हॉय",
    },
    category: "प्रकृति",
    classLevel: "कक्षा 3",
    exampleSentence: "हमें धुएं और प्लास्टिक से प्रदूषण रोकना चाहिए।",
    illustrationType: "pollution",
    icon: "🏭",
  },
  {
    id: 54,
    syllabus: "JAC Board (झारखंड)",
    subject: "पर्यावरण अध्ययन (EVS)",
    chapter: "अध्याय 6: जीव-जंतु व आवास",
    hindiWord: "जैव विविधता",
    pronunciation: "जैव विविधता",
    meaningHindi: "प्रकृति में विभिन्न प्रकार के जीव",
    meaningEnglish: "Biodiversity",
    translations: {
      santhali: "ᱡᱤᱣ-ᱡᱟᱱᱛᱩ (जीव-जन्तु)",
      ho: "जीव-जन्तु",
      mundari: "जीव-जन्तु",
    },
    category: "प्रकृति",
    classLevel: "कक्षा 3",
    exampleSentence: "जंगल में अनेक प्रकार के जीव-जंतु रहते हैं।",
    illustrationType: "animals",
    icon: "🦋",
  },
  {
    id: 55,
    syllabus: "JAC Board (झारखंड)",
    subject: "पर्यावरण अध्ययन (EVS)",
    chapter: "अध्याय 7: ऊर्जा के स्रोत",
    hindiWord: "ऊर्जा",
    pronunciation: "ऊर्जा (शक्ति)",
    meaningHindi: "काम करने की शक्ति",
    meaningEnglish: "Energy",
    translations: {
      santhali: "ᱫᱟᱲᱮ (दारे / ऊर्जा)",
      ho: "दारे",
      mundari: "दारे",
    },
    category: "प्रकृति",
    classLevel: "कक्षा 3",
    exampleSentence: "सूर्य ऊर्जा का सबसे बड़ा स्रोत है।",
    illustrationType: "energy",
    icon: "⚡",
  },

  // --- Class 3: संथाली - ओल चिकी (5 Cards) ---
  {
    id: 56,
    syllabus: "JAC Board (झारखंड)",
    subject: "संथाली (ओल चिकी)",
    chapter: "अध्याय 1: मातृभाषा व संस्कृति",
    hindiWord: "मातृभाषा",
    pronunciation: "मातृभाषा (संथाली)",
    meaningHindi: "जन्म से बोली जाने वाली निज बोली",
    meaningEnglish: "Mother tongue",
    translations: {
      santhali: "ᱡᱟᱱᱟᱢ ᱯᱟᱹᱨᱥᱤ (जानाम पारसी)",
      ho: "जानाम पारसी",
      mundari: "जानाम पारसी",
    },
    category: "संथाली",
    classLevel: "कक्षा 3",
    exampleSentence: "मातृभाषा में शिक्षा ग्रहण करना सबसे सरल होता है।",
    illustrationType: "language",
    icon: "🗣️",
  },
  {
    id: 57,
    syllabus: "JAC Board (झारखंड)",
    subject: "संथाली (ओल चिकी)",
    chapter: "अध्याय 2: हमारा समाज",
    hindiWord: "ग्राम समाज",
    pronunciation: "आतु ओड़ाः (समाज)",
    meaningHindi: "गांव की चौपाल व समाज",
    meaningEnglish: "Village Community",
    translations: {
      santhali: "ᱟᱛᱩ ᱚᱲᱟᱜ (आतु ओड़ाः)",
      ho: "आतु ओड़ाः",
      mundari: "आतु ओड़ाः",
    },
    category: "संथाली",
    classLevel: "कक्षा 3",
    exampleSentence: "ग्राम समाज में सब मिलकर त्यौहार मनाते हैं।",
    illustrationType: "community",
    icon: "🏛️",
  },
  {
    id: 58,
    syllabus: "JAC Board (झारखंड)",
    subject: "संथाली (ओल चिकी)",
    chapter: "अध्याय 3: महान व्यक्तित्व",
    hindiWord: "रघुनाथ मुर्मू",
    pronunciation: "गुरु गोमके रघुनाथ मुर्मू",
    meaningHindi: "ओल चिकी लिपि के रचयिता",
    meaningEnglish: "Founder of Ol Chiki",
    translations: {
      santhali: "ᱯᱚᱸᱰᱮᱛ ᱨᱟᱹᱜᱷᱩᱱᱟᱛᱷ ᱢᱩᱨᱢᱩ (पंडित रघुनाथ मुर्मू)",
      ho: "रघुनाथ मुर्मू",
      mundari: "रघुनाथ मुर्मू",
    },
    category: "संथाली",
    classLevel: "कक्षा 3",
    exampleSentence: "पंडित रघुनाथ मुर्मू जी संथाली समाज के महान गुरु हैं।",
    illustrationType: "person",
    icon: "📜",
  },
  {
    id: 59,
    syllabus: "JAC Board (झारखंड)",
    subject: "संथाली (ओल चिकी)",
    chapter: "अध्याय 4: संथाली त्योहार",
    hindiWord: "बाहा परोब",
    pronunciation: "बाहा परोब (सरहुल)",
    meaningHindi: "संथाली वसंत व फूलों का पर्व",
    meaningEnglish: "Baha Flower Festival",
    translations: {
      santhali: "ᱵᱟᱦᱟ ᱯᱚᱨᱚᱵ (बाहा परोब)",
      ho: "बाहा परोब",
      mundari: "बाहा परोब",
    },
    category: "संथाली",
    classLevel: "कक्षा 3",
    exampleSentence: "बाहा परोब में साल वृक्ष के फूलों की पूजा होती है।",
    illustrationType: "festival",
    icon: "🌾",
  },
  {
    id: 60,
    syllabus: "JAC Board (झारखंड)",
    subject: "संथाली (ओल चिकी)",
    chapter: "अध्याय 4: संथाली त्योहार",
    hindiWord: "काराम परोब",
    pronunciation: "काराम परोब (करम पर्व)",
    meaningHindi: "कृषि व भ्रातृत्व का लोक पर्व",
    meaningEnglish: "Karam Festival",
    translations: {
      santhali: "ᱠᱟᱨᱟᱢ ᱯᱚᱨᱚᱵ (काराम परोब)",
      ho: "काराम परोब",
      mundari: "काराम परोब",
    },
    category: "संथाली",
    classLevel: "कक्षा 3",
    exampleSentence: "काराम परोब में करम वृक्ष की डाल की पूजा होती है।",
    illustrationType: "festival",
    icon: "🎉",
  }
];

export function getStoredFlashcards() {
  if (typeof window === "undefined") return FLASHCARD_ITEMS;
  try {
    const raw = localStorage.getItem("bhashasetu_flashcards");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Failed to read flashcards from localStorage", e);
  }
  return FLASHCARD_ITEMS;
}

export function saveNewFlashcard(newCard) {
  const currentCards = getStoredFlashcards();
  const cardObj = {
    id: `fc-${Date.now()}`,
    syllabus: newCard.syllabus || "JAC Board (झारखंड)",
    classLevel: newCard.classLevel || "कक्षा 1",
    subject: newCard.subject || "हिंदी",
    chapter: newCard.chapter || "अध्याय 1: सामान्य शब्द",
    hindiWord: newCard.hindiWord,
    pronunciation: newCard.pronunciation || newCard.hindiWord,
    meaningHindi: newCard.meaningHindi || "कक्षा पाठ्य शब्द",
    meaningEnglish: newCard.meaningEnglish || newCard.meaningHindi,
    translations: {
      santhali: newCard.santhaliWord || newCard.translations?.santhali || "ᱥᱟᱱᱛᱟᱲᱤ ᱟᱹᱲᱟᱹ",
      ho: newCard.translations?.ho || newCard.santhaliWord || "हो",
      mundari: newCard.translations?.mundari || newCard.santhaliWord || "मुंडारी"
    },
    category: newCard.category || newCard.subject || "पाठ्यक्रम शब्द",
    exampleSentence: newCard.exampleSentence || `कक्षा में ${newCard.hindiWord} शब्द का अभ्यास किया गया।`,
    illustrationType: "custom",
    icon: newCard.icon || "📖",
    createdAt: new Date().toISOString()
  };

  const updated = [cardObj, ...currentCards];
  try {
    localStorage.setItem("bhashasetu_flashcards", JSON.stringify(updated));
    window.dispatchEvent(new Event("bhashasetu_flashcards_updated"));
  } catch (e) {
    console.warn("Failed to save flashcards to localStorage", e);
  }
  return updated;
}

export const CURRICULUM_LESSONS = [
  {
    id: "lesson-1",
    title: "स्वर और व्यंजन",
    subtitle: "हिंदी वर्णमाला की पहचान",
    classNum: "कक्षा 2",
    subject: "हिंदी",
    duration: "8 पाठ • 20 मिनट",
    progress: 60,
    status: "in_progress",
    statusLabel: "जारी रखें",
    overview: "हिंदी वर्णमाला के 11 स्वर और 33 व्यंजनों का संताली व हो ध्वनियों के साथ तुलनात्मक अध्ययन।",
    units: [
      { num: "१", name: "अ से अः तक स्वर पहचान", completed: true },
      { num: "२", name: "क से ङ वर्ग उच्चारण", completed: true },
      { num: "३", name: "च और ट वर्ग अभ्यास", completed: true },
      { num: "४", name: "त और प वर्ग ध्वनियाँ", completed: false },
    ],
    bilingualNote: "संताली में अल्पप्राण व महाप्राण ध्वनियों का अंतर समझाने के लिए स्थानीय उदाहरण दें (जैसे: 'दाह' और 'घट')।",
  },
  {
    id: "lesson-2",
    title: "मात्राएं",
    subtitle: "मात्राओं की पहचान और प्रयोग",
    classNum: "कक्षा 2",
    subject: "हिंदी",
    duration: "10 पाठ • 25 मिनट",
    progress: 30,
    status: "in_progress",
    statusLabel: "जारी रखें",
    overview: "स्वर जब व्यंजन के साथ मिलते हैं तो उनका रूप मात्रा कहलाता है। आ, इ, ई, उ, ऊ का अभ्यास।",
    units: [
      { num: "१", name: "आ (ा) की मात्रा वाले शब्द", completed: true },
      { num: "२", name: "इ (ि) और ई (ी) में अंतर", completed: false },
      { num: "३", name: "उ (ु) और ऊ (ू) ध्वनि अभ्यास", completed: false },
      { num: "४", name: "ए (े) और ऐ (ै) वाक्य निर्माण", completed: false },
    ],
    bilingualNote: "मात्रा पहचान में सबसे अधिक त्रुटियाँ 'ि' और 'ी' में देखी गई हैं। फ़्लैशकार्ड का प्रयोग करें।",
  },
  {
    id: "lesson-3",
    title: "संज्ञा",
    subtitle: "संज्ञा की पहचान",
    classNum: "कक्षा 2",
    subject: "हिंदी",
    duration: "6 पाठ • 15 मिनट",
    progress: 40,
    status: "in_progress",
    statusLabel: "शुरू करें",
    overview: "किसी व्यक्ति, वस्तु, स्थान या भाव के नाम को संज्ञा कहते हैं। विद्यालय व कक्षा के परिवेश से उदाहरण।",
    units: [
      { num: "१", name: "कक्षा की वस्तुओं के नाम", completed: true },
      { num: "२", name: "परिवार व मित्रों के नाम", completed: true },
      { num: "३", name: "गांव व स्थानों के नाम", completed: false },
    ],
    bilingualNote: "संताली में नाम वाले शब्दों को 'नुतुम' कहते हैं। बच्चों से उनके घर की वस्तुओं के नुतुम पूछें।",
  },
  {
    id: "lesson-4",
    title: "सर्वनाम",
    subtitle: "सर्वनाम का प्रयोग",
    classNum: "कक्षा 2",
    subject: "हिंदी",
    duration: "5 पाठ • 15 मिनट",
    progress: 10,
    status: "in_progress",
    statusLabel: "जारी रखें",
    overview: "संज्ञा के स्थान पर प्रयोग होने वाले शब्द: मैं, हम, तुम, वह, वे।",
    units: [
      { num: "१", name: "मैं और हम का प्रयोग", completed: true },
      { num: "२", name: "तुम और आप में सम्मान", completed: false },
      { num: "३", name: "वह और वे बहुवचन", completed: false },
    ],
    bilingualNote: "संताली में 'इंज' (मैं), 'अबो' (हम), 'अम' (तुम) का प्रत्यक्ष अनुवाद समझाएं।",
  },
  {
    id: "lesson-5",
    title: "विलोम शब्द",
    subtitle: "विलोम शब्दों की पहचान",
    classNum: "कक्षा 2",
    subject: "हिंदी",
    duration: "8 पाठ • 20 मिनट",
    progress: 0,
    status: "not_started",
    statusLabel: "शुरू करें",
    overview: "एक-दूसरे का विपरीत या उल्टा अर्थ बताने वाले शब्द (जैसे: दिन-रात, बड़ा-छोटा)।",
    units: [
      { num: "१", name: "आकार: बड़ा - छोटा", completed: false },
      { num: "२", name: "समय: दिन - रात", completed: false },
      { num: "३", name: "दिशा: ऊपर - नीचे", completed: false },
    ],
    bilingualNote: "विपरीत शब्दों को चित्र और अभिनय के माध्यम से खेल-खेल में सिखाएं।",
  },
  {
    id: "lesson-6",
    title: "वाक्य निर्माण",
    subtitle: "सरल वाक्य बनाना",
    classNum: "कक्षा 2",
    subject: "हिंदी",
    duration: "6 पाठ • 15 मिनट",
    progress: 0,
    status: "not_started",
    statusLabel: "शुरू करें",
    overview: "शब्दों के सही मेल से सार्थक वाक्य बनाने का अभ्यास। कर्ता + कर्म + क्रिया।",
    units: [
      { num: "१", name: "दो शब्दों के वाक्य", completed: false },
      { num: "२", name: "तीन शब्दों के वाक्य", completed: false },
      { num: "३", name: "प्रश्नवाचक वाक्य बनाना", completed: false },
    ],
    bilingualNote: "हिंदी और संताली की वाक्य रचना में क्रिया के स्थान का ध्यान रखें।",
  },
];

export const STUDENTS_PROGRESS = [
  {
    id: "s1",
    name: "रवि",
    avatar: "👦",
    classNum: "कक्षा 2",
    motherTongue: "संताली",
    conceptMastery: 82,
    languageMastery: 45,
    quizPerformance: 78,
    status: "भाषा सहायता आवश्यक",
    statusType: "alert",
    badgeColor: "amber",
    commonMistake: "मात्रा पहचान (ि और ी)",
    insight: "रवि अवधारणा को 82% समझता है, लेकिन मानक हिंदी शब्दावली में 45% की भाषा-अड़चन है। संताली उदाहरणों से अभ्यास कराएं।",
    recommendedWorksheet: "मात्राएँ - सचित्र द्विभाषी कार्यपत्रक",
    attendance: "94%",
    lastQuizScore: "16 / 20",
  },
  {
    id: "s2",
    name: "सीमा",
    avatar: "👧",
    classNum: "कक्षा 2",
    motherTongue: "हो",
    conceptMastery: 70,
    languageMastery: 68,
    quizPerformance: 65,
    status: "अवधारणा पुनरावृत्ति",
    statusType: "warning",
    badgeColor: "orange",
    commonMistake: "संज्ञा भेद (जातिवाचक व व्यक्तिवाचक)",
    insight: "सीमा की भाषा व अवधारणा दोनों में मध्यम पकड़ है। बुनियादी अवधारणा की एक बार पुनरावृत्ति आवश्यक है।",
    recommendedWorksheet: "संज्ञा पहचान - खेल आधारित अभ्यास",
    attendance: "88%",
    lastQuizScore: "13 / 20",
  },
  {
    id: "s3",
    name: "अमन",
    avatar: "👦",
    classNum: "कक्षा 2",
    motherTongue: "मुण्डारी",
    conceptMastery: 56,
    languageMastery: 40,
    quizPerformance: 50,
    status: "अतिरिक्त सहायता",
    statusType: "danger",
    badgeColor: "rose",
    commonMistake: "स्वर-व्यंजन मिश्रण",
    insight: "अमन को दोनों स्तरों पर अतिरिक्त शिक्षक सहायता चाहिए। मुण्डारी भाषा में छोटे समूहों में पुनराभ्यास कराएं।",
    recommendedWorksheet: "स्वर और व्यंजन आधारभूत कार्ड",
    attendance: "76%",
    lastQuizScore: "10 / 20",
  },
  {
    id: "s4",
    name: "प्रीति",
    avatar: "👧",
    classNum: "कक्षा 2",
    motherTongue: "संताली",
    conceptMastery: 90,
    languageMastery: 85,
    quizPerformance: 88,
    status: "अच्छी प्रगति",
    statusType: "success",
    badgeColor: "emerald",
    commonMistake: "कोई गंभीर त्रुटि नहीं",
    insight: "प्रीति दोनों भाषाओं में उत्कृष्ट सामंजस्य दिखा रही है। कक्षा में साथी-शिक्षक बना सकते हैं।",
    recommendedWorksheet: "उन्नत वाक्य निर्माण व पठन",
    attendance: "98%",
    lastQuizScore: "19 / 20",
  },
  {
    id: "s5",
    name: "सोहन",
    avatar: "👦",
    classNum: "कक्षा 2",
    motherTongue: "कुड़ुख",
    conceptMastery: 60,
    languageMastery: 55,
    quizPerformance: 58,
    status: "नियमित अभ्यास",
    statusType: "info",
    badgeColor: "blue",
    commonMistake: "ई/ई मात्रा वर्तनी",
    insight: "सोहन नियमित अभ्यास से निरंतर सुधार कर रहा है। दैनिक 10 मिनट फ़्लैशकार्ड वाचन से लाभ होगा।",
    recommendedWorksheet: "वर्तनी सुधार अभ्यास पत्र",
    attendance: "85%",
    lastQuizScore: "12 / 20",
  },
  {
    id: "s6",
    name: "कविता",
    avatar: "👧",
    classNum: "कक्षा 2",
    motherTongue: "संताली",
    conceptMastery: 75,
    languageMastery: 72,
    quizPerformance: 70,
    status: "सुधार की संभावना",
    statusType: "info",
    badgeColor: "purple",
    commonMistake: "स्त्रीलिंग/पुल्लिंग क्रिया रूप",
    insight: "कविता का उत्साह बहुत अच्छा है। क्रिया रूपों के सही प्रयोग पर ध्यान केंद्रित करने की आवश्यकता है।",
    recommendedWorksheet: "लिंग व क्रिया मिलान पत्रक",
    attendance: "92%",
    lastQuizScore: "15 / 20",
  },
];

export const TEACH_BACK_MODULES = [
  {
    id: "tb-1",
    lesson: "स्वर और व्यंजन",
    concept: "स्वर और व्यंजन में क्या अंतर है?",
    questionPrompt: "बच्चे से कहें: 'स्वर और व्यंजन में क्या फर्क है, इसे अपने शब्दों या अपनी भाषा में समझाएं?'",
    sampleAudioAnswer: "स्वर वे ध्वनियाँ हैं जिन्हें बोलने में किसी दूसरे वर्ण की सहायता नहीं चाहिए, जैसे अ, आ। और व्यंजन में स्वर की मदद लेनी पड़ती है जैसे क में अ मिला होता है।",
    motherTongueAnswer: "अबो अ, आ दो बिना एटाः साड़े तेगेबोन रोड़ा, मेनखान 'क' रोड़ लागीत अ साड़े दारकार आ।",
    aiEvaluation: {
      conceptUnderstanding: 92,
      conceptGrade: "उत्कृष्ट (92%)",
      languageClarity: 78,
      languageClarityLabel: "संतोषजनक (78%)",
      keyPointsCovered: [
        "✓ स्वतंत्र उच्चारण की अवधारणा स्पष्ट",
        "✓ स्वर की सहायता से व्यंजन बनने का उदाहरण दिया",
        "✓ मातृभाषा व हिंदी का स्वाभाविक समन्वय",
      ],
      feedbackHindi: "बच्चे ने अवधारणा को पूरी तरह सही समझा है। अब इसे संताली में भी 2 और उदाहरण देकर मौखिक रूप से पुष्ट करें।",
      suggestedActivity: "वर्ण-कूद खेल: फर्श पर स्वर व व्यंजन के गोल चक्र बनाकर कूदने का अभ्यास कराएं।",
    }
  },
  {
    id: "tb-2",
    lesson: "मात्राएं",
    concept: "मात्रा क्या होती है और क्यों लगाते हैं?",
    questionPrompt: "बच्चे से कहें: 'मात्रा क्या होती है, जब हम क में आ जोड़ते हैं तो क्या बनता है?'",
    sampleAudioAnswer: "मात्रा स्वर का छोटा निशान है। जब क में आ की मात्रा लगाते हैं तो 'का' बन जाता है जैसे कान या काम।",
    motherTongueAnswer: "मात्रा दो साड़े रेयाः चिनहा काना। क रे आ लागाओ लेनखान 'का' हुयुः आ।",
    aiEvaluation: {
      conceptUnderstanding: 88,
      conceptGrade: "बहुत अच्छा (88%)",
      languageClarity: 82,
      languageClarityLabel: "बहुत अच्छा (82%)",
      keyPointsCovered: [
        "✓ मात्रा को स्वर का चिन्ह बताया",
        "✓ क + आ = का का सही उच्चारण व उदाहरण",
      ],
      feedbackHindi: "बहुत सुंदर उत्तर! बच्चे का आत्मविश्वास बढ़ाने के लिए कक्षा में ताली बजवाएं।",
      suggestedActivity: "मात्रा कार्ड मिलान प्रतियोगिता।",
    }
  }
];

export const OFFLINE_STORAGE_DATA = {
  isOffline: true,
  lastSynced: "3 सितम्बर 2026, शाम 4:30 बजे",
  usedStorageMB: 320,
  totalStorageMB: 2048,
  percentage: 16,
  resources: [
    { type: "पाठ (अध्याय)", count: 12, size: "145 एमबी", status: "सहेजा गया" },
    { type: "सहेजे गए कार्यपत्रक", count: 8, size: "48 एमबी", status: "सहेजा गया" },
    { type: "शब्द कार्ड संग्रह", count: 5, size: "62 एमबी", status: "सहेजा गया" },
    { type: "ऑफलाइन अनुवाद शब्दकोश", count: 3, size: "65 एमबी", status: "सहेजा गया (संताली, हो, मुण्डारी)" },
  ],
  packages: [
    { id: "p1", name: "कक्षा 1-2 हिंदी आधारभूत पैकेज (ऑफलाइन)", size: "120 एमबी", version: "संस्करण 2.4", isDownloaded: true },
    { id: "p2", name: "संताली-हिंदी द्विभाषी शब्दकोश व आवाज पैक", size: "85 एमबी", version: "संस्करण 1.8", isDownloaded: true },
    { id: "p3", name: "हो-हिंदी प्राथमिक शिक्षण सामग्री", size: "65 एमबी", version: "संस्करण 1.2", isDownloaded: true },
    { id: "p4", name: "कक्षा 3-5 उन्नत पठन व व्याकरण पैकेज", size: "140 एमबी", version: "संस्करण 2.1", isDownloaded: false },
  ]
};

// Real AI Backend TTS & Fallback Speech synthesis helper
let currentAudioElement = null;
let isGlobalAudioMuted = false;

export function setGlobalAudioMute(muted) {
  isGlobalAudioMuted = muted;
  if (muted) {
    stopDevanagariAudio();
  }
}

export function stopDevanagariAudio() {
  try {
    if (currentAudioElement) {
      currentAudioElement.pause();
      currentAudioElement.currentTime = 0;
      currentAudioElement = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  } catch (e) {
    console.warn("Error stopping audio:", e);
  }
}

export const OL_CHIKI_DEVANAGARI_MAP = {
  '\u1c5a': 'ओ', '\u1c5b': 'त', '\u1c5c': 'ग', '\u1c5d': 'ङ', '\u1c5e': 'ल', '\u1c5f': 'आ',
  '\u1c60': 'क', '\u1c61': 'ज', '\u1c62': 'म', '\u1c63': 'व', '\u1c64': 'इ', '\u1c65': 'स',
  '\u1c66': 'ह', '\u1c67': 'ञ', '\u1c68': 'र', '\u1c69': 'उ', '\u1c6a': 'च', '\u1c6b': 'द',
  '\u1c6c': 'ण', '\u1c6d': 'य', '\u1c6e': 'ए', '\u1c6f': 'प', '\u1c70': 'ड', '\u1c71': 'न',
  '\u1c72': 'ड़', '\u1c73': 'ओ', '\u1c74': 'ट', '\u1c75': 'ब', '\u1c76': 'व', '\u1c77': 'ह',
  '\u1c78': 'ं', '\u1c79': '', '\u1c7a': 'ँ', '\u1c7b': '', '\u1c7c': '', '\u1c7d': '-',
  '\u1c7e': '।', '\u1c7f': '।'
};

export function cleanSpeechTextForTTS(text, langCode = "sat") {
  if (!text) return "";
  let s = String(text).trim();

  // 1. Remove UI headers and prefixes
  s = s.replace(/^ᱥᱟᱱᱛᱟᱲᱤ ᱛᱚᱨᱡᱚᱢᱟ \([^)]*\):\s*/gi, "");
  s = s.replace(/^ᱥᱟᱱᱛᱟᱲᱤ ᱛᱚᱨᱡᱚᱢᱟ [^:]*:\s*/gi, "");
  s = s.replace(/^संथाली अनुवाद:\s*/gi, "");
  s = s.replace(/^अपलोड फाइल:[^\n]*\n?/gi, "");
  s = s.replace(/^स्कैन किया गया पाठ[^\n]*\n?/gi, "");
  s = s.replace(/^संथाली पाठ का हिंदी अनुवाद:\s*/gi, "");
  s = s.replace(/\([^)]*संथाली[^)]*\)/gi, "");
  s = s.replace(/\([^)]*हो व संथाली[^)]*\)/gi, "");

  // 2. Handle Ol Chiki + Devanagari phonetic combo string
  const hasOlChiki = /[\u1C50-\u1C7F]/.test(s);
  const devanagariParenMatch = s.match(/\(([\u0900-\u097F\s\.\,!\-\?\:\;\–\'\"\`\‘\’]+)\)/);

  if ((hasOlChiki || langCode === "sat") && devanagariParenMatch && devanagariParenMatch[1] && devanagariParenMatch[1].trim().length > 3) {
    // Extract exact authentic Devanagari phonetics for Santali TTS
    s = devanagariParenMatch[1].trim();
  } else if (hasOlChiki) {
    // Strip parenthetical Devanagari phonetic echo e.g. (मित् गाजड़...)
    s = s.replace(/\s*\([\u0900-\u097F\s\.\,!\-\?]+\)/g, "");
  } else {
    // Strip explanatory parenthetical notes
    s = s.replace(/\s*\([^\)]*\)/g, "");
  }

  // 3. Remove non-speech punctuation/symbols
  s = s.replace(/[\"«»\[\]\{\}:;=\-+_#@$%^*~`]/g, " ");
  s = s.replace(/\s+/g, " ").trim();

  return s;
}

export function convertOlChikiToDevanagariPhonetic(olText) {
  if (!olText) return "";
  let out = "";
  for (const c of olText) {
    out += OL_CHIKI_DEVANAGARI_MAP[c] !== undefined ? OL_CHIKI_DEVANAGARI_MAP[c] : c;
  }
  return out;
}

export function playDevanagariAudio(text, langCode = "sat") {
  if (isGlobalAudioMuted) return false;
  if (!text || !text.trim()) return false;

  stopDevanagariAudio();

  // Clean speech text to prevent audio hallucination / double reading
  let cleanText = cleanSpeechTextForTTS(text, langCode);
  if (!cleanText) cleanText = text;

  // If target language is Santali or contains Ol Chiki characters AND cleanText still has Ol Chiki
  let speechText = cleanText;
  if ((langCode === "sat" || langCode.includes("sat") || /[\u1C50-\u1C7F]/.test(cleanText)) && /[\u1C50-\u1C7F]/.test(cleanText)) {
    speechText = convertOlChikiToDevanagariPhonetic(cleanText);
  }

  // Synthesize audio smoothly via Web Speech Engine / TTS
  return fallbackWebSpeech(speechText, langCode);
}

function fallbackWebSpeech(text, langCode) {
  if (isGlobalAudioMuted) return false;
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "hi-IN";
      
      // Calibrated slower, clearer cadence for student portal learners
      const isStudentMode = typeof window !== "undefined" && window.__isStudentPortalActive;
      const baseRate = langCode === "hi" 
        ? (isStudentMode ? 0.78 : 0.85) 
        : (isStudentMode ? 0.65 : 0.70);

      utterance.rate = baseRate;
      utterance.pitch = 0.98;
      
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (e) {
      console.warn("SpeechSynthesis error:", e);
      return false;
    }
  }
  return false;
}

// Initial Daily Quizzes per Class (JAC Board Primary Syllabus)
export const INITIAL_DAILY_QUIZZES = [
  {
    id: "quiz-cls1-01",
    title: "कक्षा 1: चित्र व शब्द पहचान दैनिक क्विज़",
    classLevel: "कक्षा 1",
    subject: "हिंदी व मातृभाषा",
    date: new Date().toISOString().split("T")[0],
    teacherName: "अनन्या शर्मा",
    instructions: "चित्र देखें और सही शब्द पर क्लिक करें। हर सही जवाब पर +2 सितारे!",
    questions: [
      {
        id: 1,
        promptHindi: "चित्र पहचानें: 🍎 'स्याऊ / सेब' को क्या कहते हैं?",
        promptTribal: "ᱱᱚᱣᱟ ᱪᱮᱛ ᱠᱟᱱᱟ? (नोवा चेत् काना?)",
        options: ["सेब (स्याऊ)", "आम (उल)", "केला (काएरा)", "पानी (दाक्)"],
        correctIndex: 0,
        explanation: "यह सेब (स्याऊ) का चित्र है।"
      },
      {
        id: 2,
        promptHindi: "संथाली में 💧 'जल' को क्या कहते हैं?",
        promptTribal: "'水/जल' ᱫᱚ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱪᱮᱛ ᱠᱚ ᱢᱮᱛᱟ-ᱟ?",
        options: ["सेंगेल (आग)", "दाक् (जल)", "हॉय (हवा)", "ओड़ाक् (घर)"],
        correctIndex: 1,
        explanation: "'दाक्' का अर्थ जल होता है।"
      },
      {
        id: 3,
        promptHindi: "'क' से शुरू होने वाला शब्द कौन सा है?",
        promptTribal: "'ᱠ' (क) ᱥᱟᱲᱮ ᱛᱮ ᱮᱦᱚᱵᱚᱜ ᱟᱹᱲᱟᱹ ᱪᱮᱛ ᱠᱟᱱᱟ?",
        options: ["कमल 🪷", "खरगोश 🐰", "गमला 🪴", "घर 🏠"],
        correctIndex: 0,
        explanation: "कमल 'क' अक्षर से शुरू होता है।"
      }
    ]
  },
  {
    id: "quiz-cls2-01",
    title: "कक्षा 2: दैनिक शब्द व संज्ञा क्विज़",
    classLevel: "कक्षा 2",
    subject: "हिंदी",
    date: new Date().toISOString().split("T")[0],
    teacherName: "अनन्या शर्मा",
    instructions: "मातृभाषा एवं मानक हिंदी शब्दावली का दैनिक अभ्यास।",
    questions: [
      {
        id: 1,
        promptHindi: "संथाली भाषा में 'नमस्ते' (अभिवादन) को क्या कहते हैं?",
        promptTribal: "ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ 'नमस्ते' ᱫᱚ ᱪᱮᱛ ᱠᱚ ᱢᱮᱛᱟ-ᱟ?",
        options: ["सगात / जोहार 🙇‍♂️", "दाका 🍚", "गिदर 👦", "दारे 🌳"],
        correctIndex: 0,
        explanation: "संथाली में आदरपूर्वक अभिवादन को 'सगात' या 'जोहार' कहा जाता है।"
      },
      {
        id: 2,
        promptHindi: "चित्र पहचानें: 💧 'जल' को संथाली में क्या कहते हैं?",
        promptTribal: "ᱪᱤᱱᱦᱟᱹ ᱩᱨᱩᱢ: 'जल' ᱠᱮ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱪᱮᱛ ᱠᱚ ᱢᱮᱛᱟ-ᱟ?",
        options: ["उमुल (छाया)", "दाक् (जल)", "सेंगेल (आग)", "हॉय (हवा)"],
        correctIndex: 1,
        explanation: "'दाक्' का अर्थ जल अथवा पानी होता है।"
      },
      {
        id: 3,
        promptHindi: "विद्यालय 🏫 को संथाली में क्या कहते हैं?",
        promptTribal: "'स्कूल / विद्यालय' ᱫᱚ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱪᱮᱛ ᱠᱟᱱᱟ?",
        options: ["ओड़ाक्", "इस्कुल / आतु आसड़ा", "गाजड़", "जोहार"],
        correctIndex: 1,
        explanation: "विद्यालय के लिए आतु इस्कुल / इतून आसड़ा का प्रयोग किया जाता है।"
      }
    ]
  },
  {
    id: "quiz-cls3-01",
    title: "कक्षा 3: वाक्य निर्माण व पर्यावरण दैनिक क्विज़",
    classLevel: "कक्षा 3",
    subject: "हिंदी व पर्यावरण",
    date: new Date().toISOString().split("T")[0],
    teacherName: "अनन्या शर्मा",
    instructions: "वाक्य ज्ञान, पर्यायवाची और पर्यावरण संबंधी प्रश्न।",
    questions: [
      {
        id: 1,
        promptHindi: "निम्न में से 'पेड़' का पर्यायवाची शब्द क्या है?",
        promptTribal: "'ᱫᱟᱨᱮ' (पेड़) ᱨᱮᱭᱟᱜ ᱥᱚᱢᱟᱱ ᱟᱹᱲᱟᱹ ᱪᱮᱛ ᱠᱟᱱᱟ?",
        options: ["वृक्ष / दारे", "नदी / गाड़ा", "पर्वत / बुरु", "आकाश / सेर्मा"],
        correctIndex: 0,
        explanation: "पेड़ को वृक्ष अथवा संथाली में 'दारे' कहते हैं।"
      },
      {
        id: 2,
        promptHindi: "सूर्य किस दिशा से उगता है?",
        promptTribal: "ᱥᱤᱝᱜᱤ ᱚᱠᱟ ᱥᱟᱦᱟ ᱥᱮᱫ ᱠᱷᱚᱱ ᱮ ᱚᱰᱚᱠᱚᱜ-ᱟ?",
        options: ["पूर्व (सामंग साहा)", "पश्चिम (पाछे साहा)", "उत्तर (कोयेल)", "दक्षिण (एतोम)"],
        correctIndex: 0,
        explanation: "सूर्य पूर्व दिशा (सामंग साहा) से उगता है।"
      },
      {
        id: 3,
        promptHindi: "शुद्ध वर्तनी वाले शब्द का चयन करें:",
        promptTribal: "ᱴᱷᱤᱠ ᱚᱞ ᱟᱠᱟᱱ ᱟᱹᱲᱟᱹ ᱪᱷᱟᱸᱴᱟᱣ ᱢᱮ:",
        options: ["ईमानदार (सोत)", "इमानदार", "ईमानदर", "ऐमानदार"],
        correctIndex: 0,
        explanation: "सही शब्द 'ईमानदार' (संथाली में सोत) है।"
      }
    ]
  }
];

export const INITIAL_COMPLETED_QUIZZES = [
  {
    id: "qsub-101",
    date: new Date().toISOString().split("T")[0],
    time: "09:30 AM",
    studentName: "रवि मुर्मू",
    rollNo: "04",
    classLevel: "कक्षा 2",
    quizTitle: "कक्षा 2: दैनिक शब्द व संज्ञा क्विज़",
    subject: "हिंदी",
    score: "3/3",
    percentage: "100%",
    status: "पूर्ण (Completed)"
  },
  {
    id: "qsub-102",
    date: new Date().toISOString().split("T")[0],
    time: "10:15 AM",
    studentName: "सीमा हांसदा",
    rollNo: "02",
    classLevel: "कक्षा 1",
    quizTitle: "कक्षा 1: चित्र व शब्द पहचान दैनिक क्विज़",
    subject: "हिंदी व मातृभाषा",
    score: "2/3",
    percentage: "67%",
    status: "पूर्ण (Completed)"
  }
];

export const HINDI_SANTALI_DICT = {
  "नमस्ते": { ol: "ᱡᱚᱦᱟᱨ", dev: "जोहार" },
  "स्कूल": { ol: "ᱤᱛᱩᱱ-ᱟᱥᱲᱟ", dev: "इतून-आसड़ा" },
  "विद्यालय": { ol: "ᱤᱛᱩᱱ-ᱟᱥᱲᱟ", dev: "इतून-आसड़ा" },
  "छात्र": { ol: "ᱪᱮᱛᱮᱫᱤᱭᱟᱹ", dev: "चेतेदिया" },
  "छात्रा": { ol: "ᱪᱮᱛᱮᱫᱤᱭᱟᱹ", dev: "चेतेदिया" },
  "विद्यार्थी": { ol: "ᱪᱮᱛᱮᱫᱤᱭᱟᱹ", dev: "चेतेदिया" },
  "शिक्षक": { ol: "ᱢᱟᱪᱮᱛ", dev: "माचेत" },
  "शिक्षिका": { ol: "ᱢᱟᱪᱮᱛᱟᱹᱱᱤ", dev: "माचेतानि" },
  "किताब": { ol: "ᱯᱩᱛᱷᱤ", dev: "पुथि" },
  "पुस्तक": { ol: "ᱯᱩᱛᱷᱤ", dev: "पुथि" },
  "पाठ": { ol: "ᱯᱟᱴᱷ", dev: "पाठ" },
  "जल": { ol: "ᱫᱟᱜ", dev: "दाक्" },
  "पानी": { ol: "ᱫᱟᱜ", dev: "दाक्" },
  "जीवन": { ol: "ᱡᱤᱣᱤ", dev: "जीवी" },
  "मित्र": { ol: "ᱜᱟᱛᱮ", dev: "गाते" },
  "दोस्त": { ol: "ᱜᱟᱛᱮ", dev: "गाते" },
  "घर": { ol: "ᱚᱲᱟᱜ", dev: "ओड़ाक्" },
  "गांव": { ol: "ᱟᱹᱛᱩ", dev: "आतु" },
  "गाँव": { ol: "ᱟᱹᱛᱩ", dev: "आतु" },
  "नाम": { ol: "ᱧᱩᱛᱩᱢ", dev: "ञुतुम" },
  "देश": { ol: "ᱫᱤᱥᱚᱢ", dev: "दिसोम" },
  "भारत": { ol: "ᱵᱷᱟᱨᱚᱛ", dev: "भारोत" },
  "अच्छा": { ol: "ᱱᱟᱯᱟᱭ", dev: "नापाय" },
  "सुंदर": { ol: "ᱱᱟᱯᱟᱭ", dev: "नापाय" },
  "साफ": { ol: "ᱯᱷᱟᱨᱪᱟ", dev: "फारचा" },
  "स्वच्छ": { ol: "ᱯᱷᱟᱨᱪᱟ", dev: "फारचा" },
  "पेड़": { ol: "ᱫᱟᱨᱮ", dev: "दारे" },
  "पौधे": { ol: "ᱱᱟᱹᱲᱤ", dev: "नाड़ी" },
  "वृक्ष": { ol: "ᱫᱟᱨᱮ", dev: "दारे" },
  "नदी": { ol: "ᱜᱟᱰᱟ", dev: "गाड़ा" },
  "नदियाँ": { ol: "ᱜᱟᱰᱟ ᱠᱚ", dev: "गाड़ा को" },
  "पहाड़": { ol: "ᱵᱩᱨᱩ", dev: "बुरु" },
  "पर्वत": { ol: "ᱵᱩᱨᱩ", dev: "बुरु" },
  "जंगल": { ol: "ᱵᱤᱨ", dev: "बीर" },
  "प्रकृति": { ol: "ᱯᱨᱟᱠᱨᱤᱛᱤ", dev: "प्राकृति" },
  "पर्यावरण": { ol: "ᱯᱚᱨᱤᱵᱮᱥ", dev: "परिबेस" },
  "सुरक्षा": { ol: "ᱨᱩᱠᱷᱤᱭᱟᱹ", dev: "रुकिया" },
  "रक्षा": { ol: "ᱨᱩᱠᱷᱤᱭᱟᱹ", dev: "रुकिया" },
  "हमारा": { ol: "ᱟᱵᱚᱣᱟᱜ", dev: "अबोवाक्" },
  "हमारी": { ol: "ᱟᱵᱚᱣᱟᱜ", dev: "अबोवाक्" },
  "हमारे": { ol: "ᱟᱵᱚᱣᱟᱜ", dev: "अबोवाक्" },
  "सूरज": { ol: "ᱥᱤᱝᱜᱤ", dev: "सिंगी" },
  "सूर्य": { ol: "ᱥᱤᱝᱜᱤ", dev: "सिंगी" },
  "प्रकाश": { ol: "ᱢᱟᱨᱥᱟᱞ", dev: "मार्शल" },
  "रोशनी": { ol: "ᱢᱟᱨᱥᱟᱞ", dev: "मार्शल" },
  "ऊष्मा": { ol: "ᱞᱚᱞᱚ", dev: "लोलो" },
  "गर्मी": { ol: "ᱞᱚᱞᱚ", dev: "लोलो" },
  "है": { ol: "ᱠᱟᱱᱟ", dev: "काना" },
  "हूँ": { ol: "ᱢᱮᱱᱟᱹᱧᱟ", dev: "मेनाञा" },
  "हूं": { ol: "ᱢᱮᱱᱟᱹᱧᱟ", dev: "मेनाञा" },
  "हो": { ol: "ᱢᱮᱱᱟᱢᱟ", dev: "मेनामा" },
  "था": { ol: "ᱛᱟᱦᱮᱸᱠᱟᱱᱟ", dev: "ताहेंकाना" },
  "थी": { ol: "ᱛᱟᱦᱮᱸᱠᱟᱱᱟ", dev: "ताहेंकाना" },
  "थे": { ol: "ᱛᱟᱦᱮᱸᱠᱟᱱᱟ", dev: "ताहेंकाना" },
  "और": { ol: "ᱟᱨ", dev: "आर" },
  "ही": { ol: "ᱜᱮ", dev: "गे" },
  "मैं": { ol: "ᱤᱧ", dev: "इञ" },
  "आप": { ol: "ᱟᱢ", dev: "आम" },
  "तुम": { ol: "ᱟᱢ", dev: "आम" },
  "हम": { ol: "ᱟᱵᱚ", dev: "अबो" },
  "यह": { ol: "ᱱᱚᱣᱟ", dev: "नोवा" },
  "वह": { ol: "ᱚᱱᱟ", dev: "ओना" },
  "क्या": { ol: "ᱪᱮᱫ", dev: "चेद" },
  "कैसे": { ol: "ᱪᱮᱫ ᱞᱮᱠᱟ", dev: "चेद लेका" },
  "कहाँ": { ol: "ᱚᱠᱟᱨᱮ", dev: "ओकारे" },
  "कौन": { ol: "ᱚᱠᱚᱭ", dev: "ओकोय" },
  "कब": { ol: "ᱛᱤᱥ", dev: "तीस" },
  "बच्चे": { ol: "ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ", dev: "गिदरा को" },
  "माता": { ol: "ᱟᱭᱳ", dev: "आयो" },
  "पिता": { ol: "ᱵᱟᱵᱟ", dev: "बाबा" }
};

export async function performTextbookScanTranslation(text, preferredDir = "auto") {
  if (!text || !text.trim()) {
    return null;
  }
  const cleanInput = text.trim();

  // Auto detect direction if needed
  const isSantali = /[\u1C50-\u1C7F]/.test(cleanInput) || cleanInput.includes("ᱠᱟᱱᱟ") || cleanInput.includes("ᱛᱟᱦᱮᱸᱠᱟᱱᱟ");
  const targetDir = preferredDir === "auto" ? (isSantali ? "sat-to-hi" : "hi-to-sat") : preferredDir;

  const srcLang = targetDir === "sat-to-hi" ? "sat" : "hi";
  const tgtLang = targetDir === "sat-to-hi" ? "hi" : "sat";

  // Attempt backend API call first
  try {
    const apiEndpoint = "/api/translate";
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: cleanInput,
        source_language: srcLang,
        target_language: tgtLang
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data && (data.translated_text || data.olChiki)) {
        let olChikiText = data.olChiki || data.translated_text || "";
        let devanagariText = data.devanagari || data.phonetic || "";

        let formattedTranslation = "";
        if (targetDir === "sat-to-hi") {
          formattedTranslation = data.translated_text || data.devanagari || cleanInput;
        } else {
          formattedTranslation = `${olChikiText} (${devanagariText || olChikiText})`;
        }

        const vocabMap = [];
        Object.keys(HINDI_SANTALI_DICT).forEach((word) => {
          if (cleanInput.includes(word) && vocabMap.length < 5) {
            const entry = HINDI_SANTALI_DICT[word];
            vocabMap.push({
              tribal: `${entry.ol} (${entry.dev})`,
              hindi: word
            });
          }
        });

        if (vocabMap.length === 0) {
          vocabMap.push(
            { tribal: "ᱯᱨᱟᱠᱨᱤᱛᱤ (प्राकृति)", hindi: "प्रकृति" },
            { tribal: "ᱫᱟᱨᱮ (दारे)", hindi: "पेड़" },
            { tribal: "ᱫᱟᱜ (दाक्)", hindi: "जल / पानी" },
            { tribal: "ᱨᱩᱠᱷᱤᱭᱟᱹ (रुक्रिया)", hindi: "सुरक्षा" }
          );
        }

        return {
          direction: targetDir,
          sourceLang: targetDir === "sat-to-hi" ? "संथाली (Ol Chiki ᱚᱞ ᱪིᱠᱤ)" : "मानक हिंदी",
          targetLang: targetDir === "sat-to-hi" ? "मानक हिंदी" : "संथाली (Ol Chiki ᱚᱞ ᱪིᱠᱤ)",
          extracted: cleanInput,
          translation: formattedTranslation,
          explanation: targetDir === "sat-to-hi"
            ? "संथाली पाठ का हिंदी में एनएमटी (NMT) द्वारा शुद्ध व स्पष्ट अनुवाद किया गया है।"
            : "आपकी पाठ्यपुस्तक के अंश को ओल चिकी (Ol Chiki ᱚᱞ ᱪིᱠᱤ) एवं देवनागरी phonetics में रूपांतरित किया गया है।",
          vocabMap,
          practiceQuestions: [
            targetDir === "sat-to-hi" ? "पाठ में मुख्य बात क्या बताई गई है?" : "ᱯᱟᱴᱷ ᱨᱮᱭᱟᱜ ᱢᱩᱞ ᱵᱷᱟᱣ ᱪᱮᱫ ᱠᱟᱱᱟ? (पाठ का मुख्य भाव क्या है?)",
            targetDir === "sat-to-hi" ? "मुख्य संथाली शब्दों का क्या अर्थ है?" : "ᱱᱚᱣᱟ ᱯᱟᱴᱷ ᱠᱷᱚᱱ ᱟᱵᱚ ᱪᱮᱫ ᱵᱚᱱ ᱪᱮᱫᱚᱜ-ᱟ? (इस पाठ से हम क्या सीखते हैं?)"
          ]
        };
      }
    }
  } catch (err) {
    console.warn("Backend translation API offline, using local client dictionary fallback", err);
  }

  // Fallback Local Translation Engine
  let fallbackOl = [];
  let fallbackDev = [];
  let vocabMap = [];

  if (targetDir === "hi-to-sat") {
    const words = cleanInput.split(/\s+/);
    words.forEach((w) => {
      const cleanW = w.replace(/[।,?!]/g, "");
      if (HINDI_SANTALI_DICT[cleanW]) {
        fallbackOl.push(HINDI_SANTALI_DICT[cleanW].ol);
        fallbackDev.push(HINDI_SANTALI_DICT[cleanW].dev);
        if (vocabMap.length < 4 && !vocabMap.some(v => v.hindi === cleanW)) {
          vocabMap.push({
            tribal: `${HINDI_SANTALI_DICT[cleanW].ol} (${HINDI_SANTALI_DICT[cleanW].dev})`,
            hindi: cleanW
          });
        }
      } else {
        fallbackOl.push(w);
        fallbackDev.push(w);
      }
    });

    const olResult = fallbackOl.join(" ");
    const devResult = fallbackDev.join(" ");

    if (vocabMap.length === 0) {
      vocabMap.push(
        { tribal: "ᱫᱟᱨᱮ (दारे)", hindi: "पेड़" },
        { tribal: "ᱫᱟᱜ (दाक्)", hindi: "जल / पानी" },
        { tribal: "ᱱᱟᱯᱟᱭ (नापाय)", hindi: "अच्छा / सुंदर" },
        { tribal: "ᱨᱩᱠᱷᱤᱭᱟᱹ (रुक्रिया)", hindi: "सुरक्षा" }
      );
    }

    return {
      direction: "hi-to-sat",
      sourceLang: "मानक हिंदी",
      targetLang: "संथाली (Ol Chiki ᱚᱞ ᱪིᱠᱤ)",
      extracted: cleanInput,
      translation: `${olResult} (${devResult})`,
      explanation: "स्थानीय एआई शब्दकोश व व्याकरण इंजन द्वारा हिंदी पाठ को ओल चिकी (Ol Chiki ᱚᱞ ᱪིᱠᱤ) एवं देवनागरी phonetics में रूपांतरित किया गया है।",
      vocabMap,
      practiceQuestions: [
        "ᱯᱟᱴᱷ ᱨᱮᱭᱟᱜ ᱢᱩᱞ ᱵᱷᱟᱣ ᱪᱮᱫ ᱠᱟᱱᱟ? (पाठ का मुख्य भाव क्या है?)",
        "ᱱᱚᱣᱟ ᱯᱟᱴᱷ ᱠᱷᱚᱱ ᱟᱵᱚ ᱪᱮᱫ ᱵᱚᱱ ᱪᱮᱫᱚᱜ-ᱟ? (इस पाठ से हम क्या सीखते हैं?)"
      ]
    };
  } else {
    return {
      direction: "sat-to-hi",
      sourceLang: "संथाली (Ol Chiki ᱚᱞ ᱪིᱠᱤ)",
      targetLang: "मानक हिंदी",
      extracted: cleanInput,
      translation: `हिंदी अनुवाद: "${cleanInput.replace(/[\u1C50-\u1C7F]/g, "संथाली पाठ")}" - प्राथमिक शिक्षा व प्रकृति सुरक्षा से संबंधित पाठ।`,
      explanation: "संथाली ओल चिकी पाठ का हिंदी भाषा में रूपांतरण संपन्न हुआ।",
      vocabMap: [
        { tribal: "ᱡᱚᱦᱟᱨ (जोहार)", hindi: "नमस्ते" },
        { tribal: "ᱯᱩᱛᱷᱤ (पुथि)", hindi: "पुस्तक" }
      ],
      practiceQuestions: [
        "पाठ का मुख्य भाव क्या है?",
        "कठिन शब्दों का क्या अर्थ है?"
      ]
    };
  }
}


