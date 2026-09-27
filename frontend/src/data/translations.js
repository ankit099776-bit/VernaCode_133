export const AVAILABLE_LANGUAGES = [
  { id: 'ho', name: 'हो', region: 'कोल्हान (सिंहभूम)', nativeGreeting: 'जोहार!' },
  { id: 'santhali', name: 'संथाली', region: 'संथाल परगना (दुमका)', nativeGreeting: 'जोहार!' },
  { id: 'mundari', name: 'मुंडारी', region: 'खूंटी, रांची, गुमला', nativeGreeting: 'जोहार!' },
];

export const EXACT_TRANSLATIONS = {
  'पेड़ों को बढ़ने के लिए पानी और सूरज की रोशनी की आवश्यकता होती है।': {
    ho: 'पेड़ा बुद्धु ते आकाम ता: बिर सुरुज रे रोशनी की आवश्यकता आ।',
    santhali: 'दारे हारा लागीत दा: आर सिंगी बेर रेया: मार्शाल लक्तीयक-आ।',
    mundari: 'दारु हाराओ: लागीद दा: आर सिंगी रेया: मारशाल दरकार मेना:आ।'
  },
  'पेड़ों को बढ़ने के लिए पानी और सूरज की रोशनी की आवश्यकता होती है': {
    ho: 'पेड़ा बुद्धु ते आकाम ता: बिर सुरुज रे रोशनी की आवश्यकता आ।',
    santhali: 'दारे हारा लागीत दा: आर सिंगी बेर रेया: मार्शाल लक्तीयक-आ।',
    mundari: 'दारु हाराओ: लागीद दा: आर सिंगी रेया: मारशाल दरकार मेना:आ।'
  },
  'पानी हमारे जीवन के लिए बहुत महत्वपूर्ण है।': {
    ho: 'दा: आबुवा: जीवन लेकाते भारी जरूरी गेया।',
    santhali: 'दा: अबोवा: जीवन लागीत अडी जरूरी काना।',
    mundari: 'दा: आबुवा: जीवोन लागीद पुरसुतुंग दरकार तना।'
  },
  'नमस्ते, आप कैसे हैं?': {
    ho: 'जोहार, आम चिलकेना?',
    santhali: 'जोहार, चेत लेका मेनामा?',
    mundari: 'जोहार, चिलका मेनामा?'
  },
  'आज हम स्कूल जा रहे हैं।': {
    ho: 'तिशिङ आले स्कूल ते सेनतनाले।',
    santhali: 'तेहेञ आबो स्कूल तेबों चालाक काना।',
    mundari: 'तिसिं आबु इसकूल सेनतनाबु।'
  },
  'हमारे शिक्षक बहुत अच्छे हैं।': {
    ho: 'आलेयेन गुरुजी भारी बेशाको।',
    santhali: 'आबोरिन माचेत अडी बेस गेयाकिन।',
    mundari: 'आलेन मास्टर पुरसुतुंग बेस मेनाइया।'
  },
  'पेड़ों की पत्तियां हरी होती हैं।': {
    ho: 'दारुको रेया: साकाम हरियर ताहेना।',
    santhali: 'दारे रेया: साकाम हरियर ताहेन काना।',
    mundari: 'दारु रेया: साकाम हरियर ताहेना।'
  },
  'सूर्य की रोशनी से पौधे भोजन बनाते हैं।': {
    ho: 'सिंगी मार्शाल ते हुड़ीं दारुको जोम-तेया: बाईया।',
    santhali: 'सिंगी बेर मार्शाल ते काटीच दारेको दाका-उतु बाईया।',
    mundari: 'सिंगी मारशाल ते हुड़ीं दारुको जोम-तेया: बाईया।'
  },
  'किताब खोलो और पाठ पढ़ो।': {
    ho: 'पुथी ओलोलमे अर पाठ पढावमे।',
    santhali: 'पुथी झिजमे आर पाठ पाढ़ावमे।',
    mundari: 'पुथी ओलोलमे आर पाठ पढावमे।'
  },
  'शाबाश! आपने बहुत अच्छा उत्तर दिया।': {
    ho: 'भारी बेस! आम भारी बेस काजी किदा।',
    santhali: 'अडी बेस! आम अडी बेस तेम लई केदा।',
    mundari: 'पुरसुतुंग बेस! आम बेसते काजी किदा।'
  },
  'बारिश का पानी नदी में बहता है।': {
    ho: 'गामा दा: गड़ा ते लिंगीतना।',
    santhali: 'दा: जाड़ी दा: नाइ ते लिंगीन काना।',
    mundari: 'गामा दा: गड़ा ते लिंगीतना।'
  }
};

export const WORD_MAP = {
  'पानी': { ho: 'दा:', santhali: 'दा:', mundari: 'दा:' },
  'सूरज': { ho: 'सुरुज / सिंगी', santhali: 'सिंगी / बेरा', mundari: 'सिंगी' },
  'धूप': { ho: 'सिंगी जारोम', santhali: 'बेर मार्शाल', mundari: 'सिंगी जेते' },
  'रोशनी': { ho: 'रोशनी / जुलु:', santhali: 'मार्शाल', mundari: 'मारशाल' },
  'पेड़': { ho: 'पेड़ा / दारु', santhali: 'दारे', mundari: 'दारु' },
  'पेड़ों': { ho: 'पेड़ाको / दारुको', santhali: 'दारेको', mundari: 'दारुको' },
  'पौधा': { ho: 'हुड़ीं दारु', santhali: 'काटीच दारे', mundari: 'हुड़ीं दारु' },
  'पौधे': { ho: 'हुड़ीं दारुको', santhali: 'काटीच दारेको', mundari: 'हुड़ीं दारुको' },
  'पत्ती': { ho: 'साकाम', santhali: 'साकाम', mundari: 'साकाम' },
  'पत्तियां': { ho: 'साकामको', santhali: 'साकामको', mundari: 'साकामको' },
  'जड़': { ho: 'रेहेद', santhali: 'रेहेद', mundari: 'रेहेद' },
  'जड़ें': { ho: 'रेहेदको', santhali: 'रेहेदको', mundari: 'रेहेदको' },
  'फूल': { ho: 'बाहा', santhali: 'बाहा', mundari: 'बाहा' },
  'फल': { ho: 'जो', santhali: 'जो', mundari: 'जो' },
  'बढ़ना': { ho: 'बुद्धु / हारा', santhali: 'हारा', mundari: 'हाराओ:' },
  'बढ़ने': { ho: 'बुद्धु ते / हारा लागीत', santhali: 'हारा लागीत', mundari: 'हाराओ: लागीद' },
  'घर': { ho: 'ओड़ाक्', santhali: 'ओड़ाक्', mundari: 'ओड़ाः' },
  'स्कूल': { ho: 'ओल-इतुन ओड़ाक्', santhali: 'इतुन आड़ा', mundari: 'इसकूल' },
  'विद्यालय': { ho: 'ओल-इतुन ओड़ाक्', santhali: 'इतुन आड़ा', mundari: 'इसकूल' },
  'छात्र': { ho: 'चेला / पढ़ावेन को', santhali: 'चेलाको', mundari: 'चेलाको' },
  'विद्यार्थी': { ho: 'चेला', santhali: 'पाथुवा', mundari: 'चेला' },
  'शिक्षक': { ho: 'गुरुजी / माचेत', santhali: 'माचेत', mundari: 'मास्टर / गुरुजी' },
  'किताब': { ho: 'पुथी', santhali: 'पुथी', mundari: 'पुथी' },
  'पुस्तक': { ho: 'पुथी', santhali: 'पुथी', mundari: 'पुथी' },
  'हवा': { ho: 'होयो', santhali: 'होए', mundari: 'होयो' },
  'जंगल': { ho: 'बिर', santhali: 'बिर', mundari: 'बिर' },
  'नदी': { ho: 'गड़ा', santhali: 'नाइ / गड़ा', mundari: 'गड़ा' },
  'गाँव': { ho: 'हातु', santhali: 'आतो', mundari: 'हातु' },
  'मित्र': { ho: 'गाते', santhali: 'गाते', mundari: 'गाते' },
  'दोस्त': { ho: 'गाते', santhali: 'गाते', mundari: 'गाते' },
  'माता': { ho: 'एङ्गा / आयो', santhali: 'आयो', mundari: 'एंगा / आयो' },
  'माँ': { ho: 'आयो', santhali: 'आयो', mundari: 'आयो' },
  'पिता': { ho: 'आपु / बाबा', santhali: 'बाबा', mundari: 'आपु / बाबा' },
  'आकाश': { ho: 'सिरमा', santhali: 'सेरमा', mundari: 'सिरमा' },
  'धरती': { ho: 'ओते / हासा', santhali: 'ओते / धाड़ती', mundari: 'ओते / हासा' },
  'मिट्टी': { ho: 'हासा', santhali: 'हासा', mundari: 'हासा' },
  'बारिश': { ho: 'गामा', santhali: 'दा: जाड़ी', mundari: 'गामा दा:' },
  'खाना': { ho: 'मंडी / जोम', santhali: 'दाका / जोम', mundari: 'मंडी / जोम' },
  'भोजन': { ho: 'जोम-तेया:', santhali: 'दाका-उतु', mundari: 'जोम-तेया:' },
  'गाय': { ho: 'गाइ', santhali: 'गाइ', mundari: 'गाइ' },
  'बैल': { ho: 'उरी:', santhali: 'डांगरा', mundari: 'उरी:' },
  'चिड़िया': { ho: 'चेणे', santhali: 'चेणे', mundari: 'चेणे' },
  'मछली': { ho: 'हाकु', santhali: 'हाकु', mundari: 'हाकु' },
  'एक': { ho: 'मियद', santhali: 'मित', mundari: 'मियाद' },
  'दो': { ho: 'बारिया', santhali: 'बार', mundari: 'बारिया' },
  'तीन': { ho: 'आपिया', santhali: 'पे', mundari: 'आपिया' },
  'चार': { ho: 'उपोन', santhali: 'पोन', mundari: 'उपून' },
  'पाँच': { ho: 'मोड़ेया', santhali: 'मोड़े', mundari: 'मोड़ेया' },
  'आवश्यकता': { ho: 'आवश्यकता / लक्तीयक', santhali: 'लक्तीयक', mundari: 'दरकार' },
  'महत्वपूर्ण': { ho: 'भारी जरूरी', santhali: 'अडी जरूरी', mundari: 'पुरसुतुंग दरकार' },
  'नमस्ते': { ho: 'जोहार', santhali: 'जोहार', mundari: 'जोहार' },
};

export function translateText(inputText, targetLang = 'ho') {
  const trimmed = inputText.trim();
  if (!trimmed) return '';

  // 1. Check exact matches
  if (EXACT_TRANSLATIONS[trimmed] && EXACT_TRANSLATIONS[trimmed][targetLang]) {
    return EXACT_TRANSLATIONS[trimmed][targetLang];
  }

  // 2. Look for punctuation-stripped match
  const noPunct = trimmed.replace(/[।.,!?]/g, '').trim();
  for (const [key, val] of Object.entries(EXACT_TRANSLATIONS)) {
    if (key.replace(/[।.,!?]/g, '').trim() === noPunct && val[targetLang]) {
      return val[targetLang];
    }
  }

  // 3. Word-by-word intelligent replacement
  const words = trimmed.split(/(\s+|[।.,!?])/);
  let translatedWords = words.map(chunk => {
    const cleanWord = chunk.replace(/[।.,!?]/g, '').trim();
    if (!cleanWord) return chunk;
    if (WORD_MAP[cleanWord] && WORD_MAP[cleanWord][targetLang]) {
      return WORD_MAP[cleanWord][targetLang];
    }
    return chunk;
  });

  return translatedWords.join('');
}
