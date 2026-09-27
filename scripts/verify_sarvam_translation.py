import sys
import time
import asyncio
from app.config import settings
from app.modules.translation.sarvam_translation import SarvamTranslationProvider

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

async def main(input_text: str = "बच्चों, आज हम गिनती सीखेंगे।", src_lang: str = "hi", tgt_lang: str = "sat"):
    print("==================================================")
    print("BhashaSetu AI - Real Sarvam AI Translation Verification")
    print("==================================================")

    api_key = settings.TRANSLATION_API_KEY
    if not api_key or api_key.strip() in ("", "mock", "mock_translation_key"):
        api_key = settings.ASR_API_KEY

    if not api_key or api_key.strip() in ("", "mock", "mock_asr_key"):
        print("\n[ERROR] Real Sarvam API key is not configured in .env.")
        print("To run with a live key, configure TRANSLATION_API_KEY or ASR_API_KEY in .env.")
        sys.exit(1)

    provider = SarvamTranslationProvider(
        api_key=api_key,
        model_name="sarvam-translate:v1",
        api_url="https://api.sarvam.ai/translate",
        timeout_seconds=settings.TRANSLATION_TIMEOUT_SECONDS or 10.0
    )

    print(f"Input Text      : {input_text}")
    print(f"Source Language : {src_lang}")
    print(f"Target Language : {tgt_lang}")
    print(f"Target Endpoint : {provider.api_url}")
    print("Dispatching request to Sarvam Translation API...")

    t0 = time.perf_counter()
    try:
        result = await provider.translate(input_text, source_language=src_lang, target_language=tgt_lang)
        elapsed_ms = round((time.perf_counter() - t0) * 1000, 2)

        print("\n-----------------------------")
        print("REAL TRANSLATION VERIFICATION")
        print("-----------------------------")
        print(f"Status          : SUCCESS")
        print(f"Input           : {input_text}")
        print(f"Output          : {result.translated_text}")
        print(f"Latency         : {elapsed_ms} ms")
        print(f"Provider        : {result.provider}")
        print(f"Source language : {result.source_language}")
        print(f"Target language : {result.target_language}")
        print("-----------------------------")
        print("\n[SUCCESS] Translated text is non-empty and valid!")

    except Exception as exc:
        elapsed_ms = round((time.perf_counter() - t0) * 1000, 2)

        print("\n-----------------------------")
        print("REAL TRANSLATION VERIFICATION")
        print("-----------------------------")
        print(f"Status          : FAILED")
        print(f"Input           : {input_text}")
        print(f"Output          : NONE")
        print(f"Latency         : {elapsed_ms} ms")
        print(f"Provider        : sarvam_translation_provider")
        print(f"Source language : {src_lang}")
        print(f"Target language : {tgt_lang}")
        print(f"Error Details   : {exc}")
        print("-----------------------------")

if __name__ == "__main__":
    text_arg = sys.argv[1] if len(sys.argv) > 1 else "बच्चों, आज हम गिनती सीखेंगे।"
    asyncio.run(main(text_arg))
