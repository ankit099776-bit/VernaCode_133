import asyncio
import os
import sys
import time

sys.path.insert(0, os.path.abspath("."))

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

from app.config import settings
from app.modules.translation.sarvam_translation import SarvamTranslationProvider

async def test_sarvam_translation():
    print("=" * 80)
    print("VERIFYING REAL SARVAM TRANSLATION QUALITY (HINDI -> SANTALI OL CHIKI)")
    print("=" * 80)

    provider = SarvamTranslationProvider(
        api_key=settings.TRANSLATION_API_KEY,
        model_name="sarvam-translate:v1"
    )

    test_sentences = [
        "बच्चों, आज हम गिनती सीखेंगे।",
        "यह एक पेड़ है।",
        "पानी हमारे जीवन के लिए बहुत महत्वपूर्ण है।"
    ]

    for idx, sentence in enumerate(test_sentences, 1):
        t0 = time.perf_counter()
        res = await provider.translate(sentence, source_language="hi", target_language="sat")
        t_latency = (time.perf_counter() - t0) * 1000

        print(f"\n[Test {idx}]")
        print(f"  Hindi Input:           '{sentence}'")
        print(f"  Source Code:           hi-IN")
        print(f"  Target Code:           sat-IN")
        print(f"  Santali Ol Chiki Text: '{res.translated_text}'")
        print(f"  Provider:              {res.provider}")
        print(f"  Latency:               {t_latency:.2f} ms")

if __name__ == "__main__":
    asyncio.run(test_sarvam_translation())
