export const INITIAL_VOCABULARY = [
  {
    id: 1,
    hindi: 'पानी',
    ho: 'दा:',
    santhali: 'दा:',
    mundari: 'दा:',
    pronunciation: { ho: 'दा:', santhali: 'दा:', mundari: 'दा:' },
    category: 'प्रकृति',
    examples: {
      ho: 'पानी पियो -> दा: नुइमे',
      santhali: 'पानी पियो -> दा: ञुयमे',
      mundari: 'पानी पियो -> दा: नुइमे'
    }
  },
  {
    id: 2,
    hindi: 'सूरज',
    ho: 'सुरुज / सिंगी',
    santhali: 'सिंगी / बेरा',
    mundari: 'सिंगी',
    pronunciation: { ho: 'सिंगी', santhali: 'बेरा', mundari: 'सिंगी' },
    category: 'प्रकृति',
    examples: {
      ho: 'सूरज चमकता है -> सिंगी जुलु:आ',
      santhali: 'सूरज निकलता है -> सिंगी बेरा राकाबो: काना',
      mundari: 'सूरज की रोशनी -> सिंगी मारशाल'
    }
  },
  {
    id: 3,
    hindi: 'पेड़',
    ho: 'पेड़ा / दारु',
    santhali: 'दारे',
    mundari: 'दारु',
    pronunciation: { ho: 'दारु', santhali: 'दारे', mundari: 'दारु' },
    category: 'पर्यावरण',
    examples: {
      ho: 'पेड़ छाया देता है -> दारु उमुब एमो:आ',
      santhali: 'पेड़ हरा है -> दारे हरियर गेया',
      mundari: 'पेड़ हमारे मित्र हैं -> दारु आबोरिन गाते'
    }
  },
  {
    id: 4,
    hindi: 'पत्ती',
    ho: 'साकाम',
    santhali: 'साकाम',
    mundari: 'साकाम',
    pronunciation: { ho: 'साकाम', santhali: 'साकाम', mundari: 'साकाम' },
    category: 'पर्यावरण',
    examples: {
      ho: 'हरी पत्ती -> हरियर साकाम',
      santhali: 'पत्ती गिरती है -> साकाम ञुरू: काना',
      mundari: 'पेड़ की पत्ती -> दारु रेया: साकाम'
    }
  },
  {
    id: 5,
    hindi: 'जड़',
    ho: 'रेहेद',
    santhali: 'रेहेद',
    mundari: 'रेहेद',
    pronunciation: { ho: 'रेहेद', santhali: 'रेहेद', mundari: 'रेहेद' },
    category: 'पर्यावरण',
    examples: {
      ho: 'जड़ मिट्टी में है -> रेहेद हासा रे मेना:आ',
      santhali: 'मजबूत जड़ -> केटेच रेहेद',
      mundari: 'जड़ पानी सोखती है -> रेहेद दा: साबो:आ'
    }
  },
  {
    id: 6,
    hindi: 'फूल',
    ho: 'बाहा',
    santhali: 'बाहा',
    mundari: 'बाहा',
    pronunciation: { ho: 'बाहा', santhali: 'बाहा', mundari: 'बाहा' },
    category: 'प्रकृति',
    examples: {
      ho: 'सुंदर फूल -> बेशा बाहा',
      santhali: 'पलाश का फूल -> मुरुप बाहा',
      mundari: 'साल का फूल -> सरजोम बाहा'
    }
  },
  {
    id: 7,
    hindi: 'बढ़ना',
    ho: 'बुद्धु / हारा',
    santhali: 'हारा',
    mundari: 'हाराओ:',
    pronunciation: { ho: 'बुद्धु', santhali: 'हारा', mundari: 'हाराओ:' },
    category: 'क्रिया',
    examples: {
      ho: 'पेड़ बढ़ते हैं -> दारुको हाराओ:आ',
      santhali: 'पौधा बढ़ रहा है -> दारे हारा: काना',
      mundari: 'बच्चे बढ़ रहे हैं -> हुड़ीं को हाराओ: तनाको'
    }
  },
  {
    id: 8,
    hindi: 'घर',
    ho: 'ओड़ाक्',
    santhali: 'ओड़ाक्',
    mundari: 'ओड़ाः',
    pronunciation: { ho: 'ओड़ाक्', santhali: 'ओड़ाक्', mundari: 'ओड़ाः' },
    category: 'दैनिक जीवन',
    examples: {
      ho: 'मेरा घर -> अञा: ओड़ाक्',
      santhali: 'हमारा घर -> आबोवा: ओड़ाक्',
      mundari: 'घर चलो -> ओड़ाः सेनमे'
    }
  },
  {
    id: 9,
    hindi: 'स्कूल / विद्यालय',
    ho: 'ओल-इतुन ओड़ाक्',
    santhali: 'इतुन आड़ा',
    mundari: 'इसकूल',
    pronunciation: { ho: 'ओल-इतुन ओड़ाक्', santhali: 'इतुन आड़ा', mundari: 'इसकूल' },
    category: 'शिक्षा',
    examples: {
      ho: 'स्कूल जा रहे हैं -> स्कूल ते सेनतनाले',
      santhali: 'स्कूल में पढ़ाई -> इतुन आड़ा रे ओल-पाढ़ाव',
      mundari: 'इसकूल चलो -> इसकूल सेनबु'
    }
  },
  {
    id: 10,
    hindi: 'पुस्तक / किताब',
    ho: 'पुथी',
    santhali: 'पुथी',
    mundari: 'पुथी',
    pronunciation: { ho: 'पुथी', santhali: 'पुथी', mundari: 'पुथी' },
    category: 'शिक्षा',
    examples: {
      ho: 'किताब पढ़ो -> पुथी पढावमे',
      santhali: 'किताब खोलो -> पुथी झिजमे',
      mundari: 'किताब लाओ -> पुथी आगुइमे'
    }
  },
  {
    id: 11,
    hindi: 'मित्र / दोस्त',
    ho: 'गाते',
    santhali: 'गाते',
    mundari: 'गाते',
    pronunciation: { ho: 'गाते', santhali: 'गाते', mundari: 'गाते' },
    category: 'संबंध',
    examples: {
      ho: 'वह मेरा मित्र है -> इनि: अञा: गाते',
      santhali: 'सच्चा मित्र -> सारी गाते',
      mundari: 'मित्र के साथ -> गाते लो:'
    }
  },
  {
    id: 12,
    hindi: 'शिक्षक / गुरुजी',
    ho: 'गुरुजी / माचेत',
    santhali: 'माचेत',
    mundari: 'मास्टर / गुरुजी',
    pronunciation: { ho: 'गुरुजी', santhali: 'माचेत', mundari: 'मास्टर' },
    category: 'शिक्षा',
    examples: {
      ho: 'शिक्षक पढ़ाते हैं -> गुरुजी पढावतनाले',
      santhali: 'आदरणीय शिक्षक -> मानतान माचेत',
      mundari: 'गुरुजी को जोहार -> मास्टर के जोहार'
    }
  },
  {
    id: 13,
    hindi: 'जंगल / वन',
    ho: 'बिर',
    santhali: 'बिर',
    mundari: 'बिर',
    pronunciation: { ho: 'बिर', santhali: 'बिर', mundari: 'बिर' },
    category: 'प्रकृति',
    examples: {
      ho: 'हरा जंगल -> हरियर बिर',
      santhali: 'जंगल के पेड़ -> बिर रेया: दारे',
      mundari: 'जंगल की रक्षा -> बिर रेया: जुतन'
    }
  },
  {
    id: 14,
    hindi: 'नदी',
    ho: 'गड़ा',
    santhali: 'नाइ / गड़ा',
    mundari: 'गड़ा',
    pronunciation: { ho: 'गड़ा', santhali: 'नाइ', mundari: 'गड़ा' },
    category: 'प्रकृति',
    examples: {
      ho: 'नदी का पानी -> गड़ा रा दा:',
      santhali: 'नदी बहती है -> नाइ लिंगीन काना',
      mundari: 'नदी किनारे -> गड़ा आड़े'
    }
  },
  {
    id: 15,
    hindi: 'गाँव',
    ho: 'हातु',
    santhali: 'आतो',
    mundari: 'हातु',
    pronunciation: { ho: 'हातु', santhali: 'आतो', mundari: 'हातु' },
    category: 'दैनिक जीवन',
    examples: {
      ho: 'हमारा गाँव -> आबुवा: हातु',
      santhali: 'गाँव के लोग -> आतो होड़',
      mundari: 'सुंदर गाँव -> बेस हातु'
    }
  }
];

export const VOCAB_CATEGORIES = [
  'सभी',
  'प्रकृति',
  'पर्यावरण',
  'शिक्षा',
  'दैनिक जीवन',
  'क्रिया',
  'संबंध'
];
