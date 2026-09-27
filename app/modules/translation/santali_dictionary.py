"""
Santali Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ) Offline Dictionary & Transliteration Engine.
Provides zero-internet, deterministic Hindi -> Santali text translation.
"""
import re
from typing import Tuple

# Exact Hindi -> Santali (Ol Chiki Script) Phrase Translations
EXACT_TRANSLATIONS = {
    "नमस्ते": "ᱡᱚᱦᱟᱨ",
    "नमस्ते!": "ᱡᱚᱦᱟᱨ!",
    "आप कैसे हैं?": "ᱪᱮᱫ ᱞᱮᱠᱟ ᱢᱮᱱᱟᱢᱟ?",
    "आप कैसे हैं": "ᱪᱮᱫ ᱞᱮᱠᱟ ᱢᱮᱱᱟᱢᱟ?",
    "तुम कैसे हो?": "ᱪᱮᱫ ᱞᱮᱠᱟ ᱢᱮᱱᱟᱢᱟ?",
    "तुम कैसे हो": "ᱪᱮᱫ ᱞᱮᱠᱟ ᱢᱮᱱᱟᱢᱟ?",
    "मैं ठीक हूँ": "ᱤᱧ ᱫᱚ ᱵᱮᱥ ᱜᱮ ᱢᱮᱱᱟᱹᱧᱟ",
    "मैं ठीक हूँ।": "ᱤᱧ ᱫᱚ ᱵᱮᱥ ᱜᱮ ᱢᱮᱱᱟᱹᱧᱟ᱾",
    "आपका नाम क्या है?": "ᱟᱢᱟᱜ ᱧᱩᱛᱩᱢ ᱫᱚ ᱪᱮᱫ?",
    "आपका नाम क्या है": "ᱟᱢᱟᱜ ᱧᱩᱛᱩᱢ ᱫᱚ ᱪᱮᱫ?",
    "मेरा नाम": "ᱤᱧᱟᱜ ᱧᱩᱛᱩᱢ",
    "धन्यवाद": "ᱥᱟᱹᱨᱦᱟᱣ",
    "धन्यवाद।": "ᱥᱟᱹᱨᱦᱟᱣ᱾",
    "स्वागत है": "ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ",
    "शुभ प्रभात": "ᱥᱟᱹᱜᱩᱱ ᱥᱮᱛᱟᱜ",
    "शुभ रात्रि": "ᱥᱟᱹᱜᱩᱱ ᱧᱤᱸᱫᱟᱹ",
    "गुड मॉर्निंग": "ᱥᱟᱹᱜᱩᱱ ᱥᱮᱛᱟᱜ",
    "आज हम क्या सीखेंगे?": "ᱛᱮᱦᱮᱧ ᱵᱚᱱ ᱪᱮᱫ ᱪᱮᱫᱚᱜᱼᱟ?",
    "किताब खोलो": "ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡᱽ ᱢᱮ",
    "किताब खोलिए": "ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡᱽ ᱢᱮ",
    "बोर्ड पर देखो": "ᱵᱚᱨᱰ ᱥᱮᱫ ᱠᱚᱭᱚᱜᱽ ᱢᱮ",
    "ध्यान से सुनो": "ᱫᱷᱭᱟᱱ ᱛᱮ ᱟᱸᱡᱚᱢ ᱢᱮ",
    "यहाँ आओ": "ᱱᱚᱸᱰᱮ ᱦᱤᱡᱩᱜᱽ ᱢᱮ",
    "वहाँ जाओ": "ᱚᱸᱰᱮ ᱥᱮᱱᱚᱜᱽ ᱢᱮ",
    "बैठ जाओ": "ᱫᱩᱲᱩᱵᱽ ᱢᱮ",
    "खड़े हो जाओ": "ᱛᱤᱸᱜᱩᱱ ᱢᱮ",
    "क्या आप समझ गए?": "ᱪᱮᱫ ᱟᱢᱮᱢ ᱵᱩᱡᱷᱟᱹᱣ ᱠᱮᱫᱼᱟ?",
    "हाँ, मैं समझ गया": "ᱦᱮᱸ, ᱤᱧᱤᱧ ᱵᱩᱡᱷᱟᱹᱣ ᱠᱮᱫᱼᱟ",
    "बहुत अच्छा": "ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ",
    "शाबाश": "ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ",
    "यह एक स्कूल है": "ᱱᱚᱣᱟ ᱫᱚ ᱢᱤᱫ ᱤᱛᱩᱱ ᱟᱥᱲᱟ ᱠᱟᱱᱟ",
    "यह एक स्कूल है।": "ᱱᱚᱣᱟ ᱫᱚ ᱢᱤᱫ ᱤᱛᱩᱱ ᱟᱥᱲᱟ ᱠᱟᱱᱟ᱾",
    "जल ही जीवन है": "ᱫᱟᱜ ᱜᱮ ᱡᱤᱣᱤ ᱠᱟᱱᱟ",
    "जल ही जीवन है।": "ᱫᱟᱜ ᱜᱮ ᱡᱤᱣᱤ ᱠᱟᱱᱟ᱾",
    "भारत हमारा देश है": "ᱵᱷᱟᱨᱚᱛ ᱫᱚ ᱟᱵᱚᱣᱟᱜ ᱫᱤᱥᱚᱢ ᱠᱟᱱᱟ",
    "भारत हमारा देश है।": "ᱵᱷᱟᱨᱚᱛ ᱫᱚ ᱟᱵᱚᱣᱟᱜ ᱫᱤᱥᱚᱢ ᱠᱟᱱᱟ᱾"
}

# Common Hindi -> Santali (Ol Chiki) Word Mapping
WORD_MAP = {
    "नमस्ते": "ᱡᱚᱦᱟᱨ",
    "स्कूल": "ᱤᱛᱩᱱ-ᱟᱥᱲᱟ",
    "विद्यालय": "ᱤᱛᱩᱱ-ᱟᱥᱲᱟ",
    "छात्र": "ᱪᱮᱛᱮᱫᱤᱭᱟᱹ",
    "छात्रा": "ᱪᱮᱛᱮᱫᱤᱭᱟᱹ",
    "शिक्षक": "ᱢᱟᱪᱮᱛ",
    "शिक्षिका": "ᱢᱟᱪᱮᱛᱟᱹᱱᱤ",
    "किताब": "ᱯᱩᱛᱷᱤ",
    "पुस्तक": "ᱯᱩᱛᱷᱤ",
    "जल": "ᱫᱟᱜ",
    "पानी": "ᱫᱟᱜ",
    "मित्र": "ᱜᱟᱛᱮ",
    "दोस्त": "ᱜᱟᱛᱮ",
    "घर": "ᱚᱲᱟᱜ",
    "गांव": "ᱟᱹᱛᱩ",
    "गाँव": "ᱟᱹᱛᱩ",
    "नाम": "ᱧᱩᱛᱩᱢ",
    "देश": "ᱫᱤᱥᱚᱢ",
    "भारत": "ᱵᱷᱟᱨᱚᱛ",
    "अच्छा": "ᱱᱟᱯᱟᱭ",
    "साफ": "ᱯᱷᱟᱨᱪᱟ",
    "नया": "ᱱᱟᱣᱟ",
    "पुराना": "ᱢᱟᱨᱮ",
    "बड़ा": "ᱢᱟᱨᱟᱝ",
    "छोटा": "胡ᱰᱤᱧ",
    "आज": "ᱛᱮᱦᱮᱧ",
    "कल": "ᱜᱟᱯᱟ",
    "हाँ": "ᱦᱮᱸ",
    "नहीं": "ᱵᱟᱝ",
    "क्या": "ᱪᱮᱫ",
    "कौन": "ᱚᱠᱚᱭ",
    "कहाँ": "ᱚᱠᱟᱨᱮ",
    "कैसे": "ᱪᱮᱫ-ᱞᱮᱠᱟ",
    "कब": "ᱛᱤᱥ",
    "और": "ᱟᱨ",
    "ही": "ᱜᱮ",
    "जीवन": "ᱡᱤᱣᱤ",
    "है": "ᱠᱟᱱᱟ",
    "हूँ": "ᱢᱮᱱᱟᱹᱧᱟ",
    "हो": "ᱢᱮᱱᱟᱢᱟ",
    "था": "ᱛᱟᱦᱮᱸᱠᱟᱱᱟ",
    "थी": "ᱛᱟᱦᱮᱸᱠᱟᱱᱟ",
    "थे": "ᱛᱟᱦᱮᱸᱠᱟᱱᱟ",
    "का": "ᱨᱮᱱᱟᱜ",
    "की": "ᱨᱮᱱᱟᱜ",
    "के": "ᱨᱮᱱᱟᱜ",
    "में": "ᱨᱮ",
    "पर": "ᱨᱮ",
    "से": "ᱠᱷᱚᱱ",
    "को": "ᱴᱷᱮᱱ",
    "मैं": "ᱤᱧ",
    "तुम": "ᱟᱢ",
    "आप": "ᱟᱵᱤᱱ",
    "हम": "ᱟᱵᱚ",
    "वह": "ᱩᱱᱤ",
    "यह": "ᱱᱚᱣᱟ",
    "वे": "ᱩᱱᱠᱩ",
    "सुनो": "ᱟᱸᱡᱚᱢ",
    "पढ़ो": "ᱯᱟᱲᱦᱟᱣ",
    "पढ़ो": "ᱯᱟᱲᱦᱟᱣ",
    "लिखो": "ᱚᱞ",
    "देखो": "ᱠᱚᱭᱚᱜᱽ",
    "खोल": "ᱡᱷᱤᱡᱽ",
    "बंद": "ᱵᱚᱸᱫᱚ",
    "एक": "ᱢᱤᱫ",
    "दो": "ᱵᱟᱨ",
    "तीन": "ᱯᱮ",
    "चार": "ᱯᱩᱱ",
    "पाँच": "ᱢᱚᱬᱮ",
    "पांच": "ᱢᱚᱬᱮ"
}

# Devanagari -> Ol Chiki Character Mapping
DEVANAGARI_TO_OL_CHIKI_MAP = {
    # Consonants
    'क': 'ᱠ', 'ख': 'ᱠᱷ', 'ग': 'ᱜ', 'घ': 'ᱜᱷ', 'ङ': 'ᱝ',
    'च': 'ᱪ', 'छ': 'ᱪᱷ', 'ज': 'ᱡ', 'झ': 'ᱡᱷ', 'ञ': 'ᱧ',
    'ट': 'ᱴ', 'ठ': 'ᱴᱷ', 'ड': 'ᱰ', 'ढ': 'ᱰᱷ', 'ण': 'ᱬ',
    'त': 'ᱛ', 'थ': 'ᱛᱷ', 'द': 'ᱫ', 'ध': 'ᱫᱷ', 'न': 'ᱱ',
    'प': 'ᱯ', 'फ': 'ᱯᱷ', 'ब': 'ᱵ', 'भ': 'ᱵᱷ', 'म': 'ᱢ',
    'य': 'ᱭ', 'र': 'ᱨ', 'ल': 'ᱞ', 'व': 'ᱣ',
    'श': 'ᱥ', 'ष': 'ᱥ', 'स': 'ᱥ', 'ह': 'ᱦ',
    'ड़': 'ᱲ', 'ढ़': 'ᱲᱷ', 'क़': 'ᱠ', 'ख़': 'ᱠᱷ', 'ग़': 'ᱜ', 'ज़': 'ᱡ', 'फ़': 'ᱯᱷ',

    # Independent Vowels
    'अ': 'ᱚ', 'आ': 'ᱟ', 'इ': 'ᱤ', 'ई': 'ᱤ', 'उ': 'ᱩ', 'ऊ': 'ᱩ',
    'ऋ': 'ᱨᱤ', 'ए': 'ᱮ', 'ऐ': 'ᱮ', 'ओ': 'ᱳ', 'औ': 'ᱳ',

    # Matras
    'ा': 'ᱟ', 'ि': 'ᱤ', 'ी': 'ᱤ', 'ु': 'ᱩ', 'ू': 'ᱩ',
    'ृ': 'ᱨᱤ', 'े': 'ᱮ', 'ै': 'ᱮ', 'ो': 'ᱳ', 'ौ': 'ᱳ',
    'ं': 'ᱝ', 'ँ': 'ᱸ', 'ः': 'ᱷ', '्': '',

    # Digits
    '०': '᱐', '१': '᱑', '२': '᱒', '३': '᱓', '४': '᱔',
    '५': '᱕', '६': '᱖', '७': '᱗', '८': '᱘', '९': '᱙',

    # Punctuation
    '।': '᱾', '॥': '᱾᱾'
}

def transliterate_devanagari_to_ol_chiki(text: str) -> str:
    """
    Transliterates any Devanagari text into Ol Chiki script syllabically.
    """
    if not text:
        return ""

    result = []
    i = 0
    length = len(text)

    while i < length:
        char = text[i]
        
        # Check two-character combinations first (e.g. ड़, ढ़)
        if i + 1 < length:
            pair = text[i:i+2]
            if pair in DEVANAGARI_TO_OL_CHIKI_MAP:
                result.append(DEVANAGARI_TO_OL_CHIKI_MAP[pair])
                i += 2
                continue

        if char in DEVANAGARI_TO_OL_CHIKI_MAP:
            result.append(DEVANAGARI_TO_OL_CHIKI_MAP[char])
        else:
            result.append(char)
        i += 1

    return "".join(result)

class SantaliDictionaryTranslator:
    """
    Deterministic Offline Translator converting Hindi text to Santali (Ol Chiki script).
    """
    def translate(self, text: str) -> str:
        if not text or not text.strip():
            return ""

        cleaned = text.strip()

        # 1. Direct exact phrase match
        if cleaned in EXACT_TRANSLATIONS:
            return EXACT_TRANSLATIONS[cleaned]

        # 2. Match without trailing punctuation
        no_punct = re.sub(r'[.,!?।]', '', cleaned).strip()
        for key, val in EXACT_TRANSLATIONS.items():
            if re.sub(r'[.,!?।]', '', key).strip() == no_punct:
                # Retain punctuation if present
                punct = cleaned[-1] if cleaned and cleaned[-1] in '.,!?।' else ''
                if punct == '।':
                    punct = '᱾'
                return val + punct

        # 3. Word-by-word intelligent dictionary substitution + transliteration fallback
        tokens = re.split(r'(\s+|[.,!?।])', cleaned)
        translated_tokens = []

        for token in tokens:
            if not token or token.isspace() or token in '.,!?।':
                if token == '।':
                    translated_tokens.append('᱾')
                else:
                    translated_tokens.append(token)
                continue

            clean_word = re.sub(r'[.,!?।]', '', token).strip()
            
            # Check dictionary word map
            if clean_word in WORD_MAP:
                translated_tokens.append(WORD_MAP[clean_word])
            elif clean_word.lower() in WORD_MAP:
                translated_tokens.append(WORD_MAP[clean_word.lower()])
            else:
                # Transliterate Devanagari to Ol Chiki for unknown words
                translated_tokens.append(transliterate_devanagari_to_ol_chiki(clean_word))

        return "".join(translated_tokens)
