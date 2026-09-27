export const WORKSHEET_TEMPLATES = [
  {
    id: 'ws-1',
    grade: 'कक्षा 5',
    subject: 'पर्यावरण अध्ययन',
    chapter: 'पाठ 1: हमारे आसपास के पेड़-पौधे',
    chapterHo: 'दाराको अर साकाम (पेड़ और पत्तियां)',
    chapterSanthali: 'दारेको आर साकाम (पेड़ और पत्तियां)',
    chapterMundari: 'दारुको आर साकाम (पेड़ और पत्तियां)',
    totalMarks: 20,
    duration: '30 मिनट',
    questions: [
      {
        id: 1,
        type: 'match',
        typeLabel: 'सचित्र मिलान',
        instruction: 'हिंदी शब्दों को उनके सही अर्थ और चित्र से मिलाएं:',
        pairs: [
          { hindi: 'पेड़', ho: 'दारु / पेड़ा', santhali: 'दारे', mundari: 'दारु', icon: '🌳' },
          { hindi: 'पानी', ho: 'दा:', santhali: 'दा:', mundari: 'दा:', icon: '💧' },
          { hindi: 'सूरज', ho: 'सिंगी', santhali: 'सिंगी / बेरा', mundari: 'सिंगी', icon: '☀️' },
          { hindi: 'पत्ती', ho: 'साकाम', santhali: 'साकाम', mundari: 'साकाम', icon: '🍃' }
        ]
      },
      {
        id: 2,
        type: 'fill',
        typeLabel: 'रिक्त स्थान भरें',
        instruction: 'कोष्ठक में दिए गए सही शब्द को चुनकर वाक्य पूरा करें:',
        items: [
          {
            text: 'पेड़ों को भोजन बनाने के लिए _______ (दा: / ओड़ाक्) और धूप चाहिए।',
            answer: 'दा: (पानी)',
            hint: 'दा: = पानी'
          },
          {
            text: 'पेड़ से हमें ताजी _______ (होयो / बिर) मिलती है।',
            answer: 'होयो (हवा)',
            hint: 'होयो = हवा'
          }
        ]
      },
      {
        id: 3,
        type: 'mcq',
        typeLabel: 'द्विभाषी प्रश्न (अवधारणा एवं भाषा)',
        instruction: 'सही विकल्प पर गोला लगाएं:',
        questionHindi: 'पेड़ों की जड़ें जमीन से क्या सोखती हैं?',
        questionHo: 'दारु रेया: रेहेद हासा एते चेना: साबो:आ?',
        options: [
          { text: 'पानी और खनिज (दा: अर खनिज)', isCorrect: true },
          { text: 'केवल प्लास्टिक (प्लास्टिक)', isCorrect: false },
          { text: 'आग (सेंगेल)', isCorrect: false }
        ],
        conceptNote: 'अवधारणा: पौधों में जल अवशोषण जड़ द्वारा होता है।'
      }
    ]
  },
  {
    id: 'ws-2',
    grade: 'कक्षा 4',
    subject: 'गणित',
    chapter: 'पाठ 3: स्थानीय मान और दैनिक जोड़',
    chapterHo: 'लेखा अर जोड़ (गिनती और जोड़)',
    chapterSanthali: 'लेखा आर जोड़ (गिनती और जोड़)',
    chapterMundari: 'लेखा आर जोड़ (गिनती और जोड़)',
    totalMarks: 15,
    duration: '25 मिनट',
    questions: [
      {
        id: 1,
        type: 'match',
        typeLabel: 'संख्या व गिनती मिलान',
        instruction: 'संख्याओं को जनजातीय भाषा के शब्दों से मिलाएं:',
        pairs: [
          { hindi: 'एक (1)', ho: 'मियद', santhali: 'मित', mundari: 'मियाद', icon: '1️⃣' },
          { hindi: 'दो (2)', ho: 'बारिया', santhali: 'बार', mundari: 'बारिया', icon: '2️⃣' },
          { hindi: 'तीन (3)', ho: 'आपिया', santhali: 'पे', mundari: 'आपिया', icon: '3️⃣' },
          { hindi: 'पाँच (5)', ho: 'मोड़ेया', santhali: 'मोड़े', mundari: 'मोड़ेया', icon: '5️⃣' }
        ]
      },
      {
        id: 2,
        type: 'fill',
        typeLabel: 'जोड़ हल करें',
        instruction: 'खाली स्थान में सही संख्या भरें:',
        items: [
          {
            text: 'बिरसा के पास 3 आम थे, सलगे ने 2 और दिए। कुल कितने हुए? _____',
            answer: '5 (मोड़ेया / मोड़े आम)',
            hint: '3 + 2 = 5'
          }
        ]
      }
    ]
  },
  {
    id: 'ws-3',
    grade: 'कक्षा 3',
    subject: 'विज्ञान व प्रकृति',
    chapter: 'पाठ 2: हमारे पशु और पक्षी',
    chapterHo: 'जिउ-जंतु अर चेणे को (पशु और पक्षी)',
    chapterSanthali: 'जिउ-जंतु आर चेणे को (पशु और पक्षी)',
    chapterMundari: 'जिउ-जंतु आर चेणे को (पशु और पक्षी)',
    totalMarks: 15,
    duration: '20 मिनट',
    questions: [
      {
        id: 1,
        type: 'match',
        typeLabel: 'पशु-पक्षी पहचानें',
        instruction: 'पशु का नाम मातृभाषा में पहचानें:',
        pairs: [
          { hindi: 'गाय', ho: 'गाइ', santhali: 'गाइ', mundari: 'गाइ', icon: '🐄' },
          { hindi: 'बैल', ho: 'उरी:', santhali: 'डांगरा', mundari: 'उरी:', icon: '🐂' },
          { hindi: 'चिड़िया', ho: 'चेणे', santhali: 'चेणे', mundari: 'चेणे', icon: '🐦' },
          { hindi: 'मछली', ho: 'हाकु', santhali: 'हाकु', mundari: 'हाकु', icon: '🐟' }
        ]
      }
    ]
  }
];
