import asyncio
from app.modules.translation.base import BaseTranslationProvider, TranslationResult

MOCK_TRANSLATION_DICT = {
    # Hindi -> Santhali
    ("नमस्ते, आप कैसे हैं?", "hi", "sat"): "ᱡᱚᱦᱟᱨ, ᱪᱮᱫ ᱞᱮᱠᱟ ᱢᱮᱱᱟᱢᱟ?",
    ("नमस्ते", "hi", "sat"): "ᱡᱚᱦᱟᱨ",
    ("बच्चों, आज हम गिनती सीखेंगे।", "hi", "sat"): "ᱜᱤᱫᱽᱨᱟᱹ, ᱛᱮᱦᱮᱧ ᱵᱚᱱ ᱞᱮᱠᱷᱟ ᱪᱮᱫᱚᱜ-ᱟ।",
    ("पौधों को बढ़ने के लिए पानी और धूप की आवश्यकता होती है।", "hi", "sat"): "ᱫᱟᱨᱮ ᱠᱚ ᱦᱟᱨᱟᱜ ᱞᱟᱹᱜᱤᱫ ᱫᱟᱜ ᱟᱨ ᱥᱤᱛᱩᱝ ᱞᱟᱹᱠᱛᱤᱜᱼᱟ ᱾",
    ("बच्चों आज हम एक से दस तक गिनती सीखेंगे", "hi", "sat"): "ᱜᱤᱫᱽᱨᱟᱹ ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱢᱤᱫ ᱠᱷᱚᱱ ᱜᱮᱞ ᱦᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱪᱮᱫᱟ",
    
    # Santhali -> Hindi
    ("ᱡᱚᱦᱟᱨ, ᱪᱮᱫ ᱞᱮᱠᱟ ᱢᱮᱱᱟᱢᱟ?", "sat", "hi"): "नमस्ते, आप कैसे हैं?",
    ("ᱡᱚᱦᱟᱨ", "sat", "hi"): "नमस्ते",
    ("ᱜᱤᱫᱽᱨᱟᱹ, ᱛᱮᱦᱮᱧ ᱵᱚᱱ ᱞᱮᱠᱷᱟ ᱪᱮᱫᱚᱜ-ᱟ।", "sat", "hi"): "बच्चों, आज हम गिनती सीखेंगे।",
    ("ᱫᱟᱨᱮ ᱠᱚ ᱦᱟᱨᱟᱜ ᱞᱟᱹᱜᱤᱫ ᱫᱟᱜ ᱟᱨ ᱥᱤᱛᱩᱝ ᱞᱟᱹᱠᱛᱤᱜᱼᱟ ᱾", "sat", "hi"): "पौधों को बढ़ने के लिए पानी और धूप की आवश्यकता होती है।",
    ("ᱫᱟᱨᱮ ᱠᱚ ᱦᱟᱨᱟᱜ ᱞᱟᱹᱜᱤᱫ ᱫᱟᱜ ᱟᱨ ᱥᱤᱛᱩᱝ ᱞᱟᱹᱠᱛᱤᱜᱼᱟ", "sat", "hi"): "पौधों को बढ़ने के लिए पानी और धूप की आवश्यकता होती है।",
}

SUPPORTED_LANGUAGES = {"hi", "sat", "en", "hi-in", "sat-in", "en-in"}

class MockTranslationProvider(BaseTranslationProvider):
    """
    Mock Translation Provider for unit testing and offline development.
    """
    async def translate(
        self,
        text: str,
        source_language: str = "hi",
        target_language: str = "sat"
    ) -> TranslationResult:
        if not text or not text.strip():
            raise ValueError("Text provided for translation is empty.")

        src = source_language.lower()
        tgt = target_language.lower()

        if src not in SUPPORTED_LANGUAGES:
            raise ValueError(f"Unsupported source language: '{source_language}'")
        
        if tgt not in SUPPORTED_LANGUAGES:
            raise ValueError(f"Unsupported target language: '{target_language}'")

        # Simulate slight processing delay (10ms)
        await asyncio.sleep(0.010)

        # Check exact key
        key = (text.strip(), src, tgt)
        if key in MOCK_TRANSLATION_DICT:
            translated_text = MOCK_TRANSLATION_DICT[key]
        else:
            if tgt.startswith("sat"):
                translated_text = f"[Santhali Ol Chiki Translation: {text}]"
            elif tgt.startswith("hi"):
                translated_text = f"[हिंदी अनुवाद: {text}]"
            else:
                translated_text = f"[Translated: {text}]"

        return TranslationResult(
            translated_text=translated_text,
            source_language=source_language,
            target_language=target_language,
            provider="mock_translation_provider"
        )
