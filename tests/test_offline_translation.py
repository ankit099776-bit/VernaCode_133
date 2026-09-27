"""
Automated Pytest suite for Offline Hindi -> Santali Text Translation.
"""
import pytest
from app.modules.translation.santali_dictionary import SantaliDictionaryTranslator, transliterate_devanagari_to_ol_chiki
from app.modules.translation.local_translation import LocalTranslationProvider

def test_santali_dictionary_exact_matches():
    translator = SantaliDictionaryTranslator()
    assert translator.translate("नमस्ते") == "ᱡᱚᱦᱟᱨ"
    assert translator.translate("धन्यवाद") == "ᱥᱟᱹᱨᱦᱟᱣ"
    assert translator.translate("जल ही जीवन है") == "ᱫᱟᱜ ᱜᱮ ᱡᱤᱣᱤ ᱠᱟᱱᱟ"

def test_devanagari_to_ol_chiki_transliteration():
    # Test character mapping
    ol_text = transliterate_devanagari_to_ol_chiki("नमस्ते")
    assert any(0x1C50 <= ord(c) <= 0x1C7F for c in ol_text)

@pytest.mark.asyncio
async def test_local_translation_provider_fallback():
    provider = LocalTranslationProvider()
    res = await provider.translate("नमस्ते!", source_language="hi", target_language="sat")
    assert res.translated_text != ""
    assert res.target_language == "sat"
    # Ensure Ol Chiki characters are present in output
    assert any(0x1C50 <= ord(c) <= 0x1C7F for c in res.translated_text)
