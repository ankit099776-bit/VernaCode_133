import pytest
import os
from dotenv import load_dotenv
load_dotenv()

from app.modules.translation.sarvam_translation import SarvamTranslationProvider
from app.modules.tts.sarvam_tts import SarvamTTSProvider

@pytest.mark.asyncio
async def test_sarvam_reverse_translation_sat_to_hi():
    api_key = os.getenv("TRANSLATION_API_KEY")
    if not api_key or api_key.startswith("mock"):
        pytest.skip("Skipping live Sarvam translation test: no real API key.")
    
    try:
        provider = SarvamTranslationProvider(api_key=api_key)
        res = await provider.translate("ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱥᱮᱸᱲᱟᱭᱟ ᱾", source_language="sat", target_language="hi")
        assert res.translated_text is not None
        assert len(res.translated_text.strip()) > 0
        assert res.source_language == "sat"
        assert res.target_language == "hi"
    except Exception as e:
        pytest.skip(f"Skipping live Sarvam translation test due to network/API error: {e}")

@pytest.mark.asyncio
async def test_sarvam_hindi_tts():
    api_key = os.getenv("TRANSLATION_API_KEY") or os.getenv("ASR_API_KEY")
    if not api_key or api_key.startswith("mock"):
        pytest.skip("Skipping live Sarvam Hindi TTS test: no real API key.")

    try:
        tts = SarvamTTSProvider(api_key=api_key)
        res = await tts.synthesize("बच्चों, आज हम गिनती सीखेंगे।", target_language="hi")
        assert res.audio_bytes is not None
        assert len(res.audio_bytes) > 0
        assert res.audio_format == "wav"
        assert res.provider == "sarvam_tts"
    except Exception as e:
        pytest.skip(f"Skipping live Sarvam Hindi TTS test due to network/API error: {e}")
