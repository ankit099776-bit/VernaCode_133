export const TEACHER_DATA = {
  name: 'श्री राजेश शर्मा',
  title: 'वरिष्ठ सहायक शिक्षक',
  role: 'हिंदी एवं जनजातीय भाषा सेतु शिक्षक',
  school: 'राजकीय प्राथमिक विद्यालय, चाईबासा',
  district: 'पश्चिमी सिंहभूम, झारखंड',
  udise: '20200104502',
  phone: '+91 98351 45290',
  email: 'rajesh.sharma.edu@jharkhand.gov.in',
  avatar: '👨‍🏫',
  experience: '8 वर्ष (प्राथमिक विद्यालय शिक्षण)',
  qualification: 'एम.ए., बी.एड. (भाषा शिक्षण विशेष योग्यता)',
  tribalLanguageProficiency: 'जनजातीय भाषाएं (हो, संथाली, मुंडारी) - संवाद व शिक्षण',
  classesAssigned: ['कक्षा 3 (क)', 'कक्षा 4 (क)', 'कक्षा 5 (क+ख)'],
  badges: [
    { title: 'मातृभाषा सेतु शिक्षक 2026', icon: '🏆', color: 'bg-[#F8D49B]/40 text-[#8A5D15]' },
    { title: 'डिजिटल नवाचार प्रमाणन', icon: '⭐', color: 'bg-[#F8BC9A]/30 text-[#B55734]' },
    { title: '100% ऑफ़लाइन कक्षा रिकॉर्ड', icon: '📱', color: 'bg-[#75BDE0]/20 text-[#1E6080]' }
  ],
  stats: [
    { label: 'कुल कक्षाएं', value: '12', icon: 'BookOpen', color: 'text-[#75BDE0] bg-[#75BDE0]/15' },
    { label: 'कुल छात्र', value: '45', icon: 'Users', color: 'text-[#2D4B5A] bg-[#F8D49B]/30' },
    { label: 'पाठ तैयारी', value: '28', icon: 'FileText', color: 'text-[#B55734] bg-[#F8BC9A]/30' },
    { label: 'सही उत्तर', value: '78%', icon: 'CheckCircle2', color: 'text-[#C43838] bg-[#F99B9B]/25' }
  ],
  // Language Bridge Score Breakdown
  languageBridge: {
    conceptMastery: 82,
    languageMastery: 58,
    gapDifference: 24,
    diagnosticInsight: 'छात्र मुख्य अवधारणा 82% समझ रहे हैं, परंतु मानक हिंदी शब्दावली में चुनौती (58%) है। अतः छात्र असफल नहीं हैं, उन्हें केवल द्विभाषी सेतु की आवश्यकता है।',
    weeklyTrend: [
      { week: 'सप्ताह 1', concept: 70, language: 42 },
      { week: 'सप्ताह 2', concept: 76, language: 48 },
      { week: 'सप्ताह 3', concept: 80, language: 54 },
      { week: 'सप्ताह 4', concept: 82, language: 58 }
    ]
  },
  // Students requiring targeted help
  studentsNeedingHelp: [
    {
      id: 'st-1',
      name: 'बिरसा मुंडा',
      grade: 'कक्षा 5',
      conceptScore: 88,
      languageScore: 52,
      primaryGap: 'भाषा अंतर',
      notes: 'हो भाषा में "दा: अर सिंगी" का कार्य पूरी तरह समझाता है, किंतु हिंदी लिखित परीक्षा में "प्रकाश संश्लेषण" शब्द भूल जाता है।',
      suggestedAid: 'द्विभाषी सचित्र शब्द कार्ड'
    },
    {
      id: 'st-2',
      name: 'सलगे मुर्मू',
      grade: 'कक्षा 4',
      conceptScore: 62,
      languageScore: 60,
      primaryGap: 'अवधारणा अंतर',
      notes: 'संख्याओं के स्थानीय मान में भ्रम। स्थानीय कंकड़-गिनती विधि से अभ्यास की आवश्यकता।',
      suggestedAid: 'गणित वर्कशीट #03'
    },
    {
      id: 'st-3',
      name: 'सोमरा हो',
      grade: 'कक्षा 5',
      conceptScore: 84,
      languageScore: 48,
      primaryGap: 'भाषा अंतर',
      notes: 'मौखिक रूप से उत्कृष्ट उत्तर देता है, देवनागरी हिंदी लेखन में विराम चिह्नों व कठिन शब्दों में सहायता चाहिए।',
      suggestedAid: 'मौखिक अभ्यास संवाद'
    }
  ],
  // Common mistakes in classroom
  commonMistakes: [
    {
      topic: 'पर्यावरण: जल चक्र',
      confusion: 'वाष्पीकरण (हिंदी) ↔ "दा: होयो ते ओतोंग" (हो)',
      recommendation: 'भाप को हो भाषा में समझाकर हिंदी शब्द से जोड़ें।'
    },
    {
      topic: 'गणित: भिन्न',
      confusion: 'आधा / चौथाई ↔ "आधा / पावा"',
      recommendation: 'स्थानीय माप उदाहरणों का उपयोग करें।'
    }
  ],
  recentLessons: [
    { id: 1, title: 'हमारे आसपास के पेड़', class: 'कक्षा 5', subject: 'पर्यावरण', date: 'आज', status: 'पूर्ण' },
    { id: 2, title: 'पानी और जीवन', class: 'कक्षा 4', subject: 'विज्ञान', date: 'कल', status: 'प्रगति पर' },
    { id: 3, title: 'हमारा सौरमंडल और तारे', class: 'कक्षा 5', subject: 'विज्ञान', date: '2 दिन पहले', status: 'तैयार' }
  ]
};

export const STUDENT_DATA = {
  name: 'बिरसा मुंडा',
  greeting: 'जोहार! 👋',
  role: 'छात्र डैशबोर्ड',
  grade: 'कक्षा 5 (अनुभाग क)',
  school: 'राजकीय प्राथमिक विद्यालय, चाईबासा',
  avatar: '👦',
  stats: [
    { label: 'पूरा पाठ', value: '10', icon: 'CheckCircle', color: 'text-[#75BDE0] bg-[#75BDE0]/15' },
    { label: 'अभ्यास', value: '6', icon: 'FileEdit', color: 'text-[#2D4B5A] bg-[#F8D49B]/30' },
    { label: 'प्रगति', value: '75%', icon: 'TrendingUp', color: 'text-[#B55734] bg-[#F8BC9A]/30' },
    { label: 'बैज', value: '⭐', icon: 'Award', color: 'text-[#C43838] bg-[#F99B9B]/25' }
  ],
  todayLesson: {
    title: 'पानी का महत्व',
    titleHo: 'दा: रा महत्व',
    titleSanthali: 'दा: रेया: महत्व',
    titleMundari: 'दा: रेया: महत्व',
    progress: 60,
    summary: 'पानी जीवन के लिए अत्यंत महत्वपूर्ण है। पेड़-पौधों और सभी जीवों को पानी की आवश्यकता होती है।',
    audioText: 'पानी को मातृभाषा में "दा:" कहते हैं। पेड़ और मनुष्य सभी को पानी चाहिए। दा: आबुवा: जीवन लेकाते भारी जरूरी गेया।'
  }
};

export const OFFLINE_PACKS = [
  { id: 'lessons', name: 'पाठ्य सामग्री (ई-पुस्तिकाएं)', size: '120 एमबी', downloaded: true, icon: 'BookOpen', items: '42 पाठ, 15 अभ्यास' },
  { id: 'vocab', name: 'शब्दावली सूची (हो/मुंडारी/संथाली)', size: '45 एमबी', downloaded: true, icon: 'Languages', items: '850+ द्विभाषी शब्द' },
  { id: 'media', name: 'सचित्र व ऑडियो उच्चारण पैक', size: '60 एमबी', downloaded: true, icon: 'Volume2', items: '1200+ ऑडियो रिकॉर्डिंग्स' },
  { id: 'ai-engine', name: 'ऑफलाइन भाषा मॉडल', size: '30 एमबी', downloaded: true, icon: 'Cpu', items: 'स्थानीय अनुवाद इंजन' }
];

export const HARDWARE_DEVICE_SPECS = {
  deviceType: 'कम लागत वाला एंड्रॉइड टैबलेट',
  osVersion: 'एंड्रॉइड 9.0 / 10',
  ramInstalled: '2 जीबी रैम',
  ramUsed: '185 एमबी (अनुकूलित)',
  internalStorage: '16 जीबी आंतरिक भंडारण (उपलब्ध: 7.2 जीबी)',
  appStorageUsed: '255 एमबी (संपूर्ण डेटा ऑफलाइन सुरक्षित)',
  offlineSupport: '100% इंटरनेट मुक्त संचालन समर्थित',
  benchmarkDelay: '1.2s - 1.8s (मानक: < 3.0s पूर्ण)'
};

export const PENDING_SYNC_QUEUE = [
  { id: 'sync-1', type: 'क्विज़ परिणाम', student: 'बिरसा मुंडा', lesson: 'पेड़ों का महत्व', score: '5/5', time: '10 मिनट पहले' },
  { id: 'sync-2', type: 'टीच-बैक ऑडियो', student: 'सलगे मुर्मू', lesson: 'जल चक्र व्याख्या', score: 'अवधारणा: 92%', time: '35 मिनट पहले' },
  { id: 'sync-3', type: 'शिक्षक टिप्पणी', teacher: 'राजेश शर्मा', lesson: 'कक्षा 5 उपस्थिति', score: '42 छात्र उपस्थित', time: '1 घंटा पहले' },
  { id: 'sync-4', type: 'नया शब्द जोड़ा गया', word: 'गड़ा दा: (नदी जल)', category: 'प्रकृति', time: '2 घंटे पहले' }
];
