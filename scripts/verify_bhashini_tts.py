import sys
import os
import time
import asyncio
from app.config import settings
from app.modules.tts.bhashini_tts import BhashiniTTSProvider

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

async def main(input_text: str = "ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱛᱮᱦեᱧ ᱟᱵᱚ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱥᱮᱸᱲᱟᱭᱟ ᱾", tgt_lang: str = "sat"):
    print("==================================================")
    print("BhashaSetu AI - Real Bhashini TTS Verification")
    print("==================================================")

    api_key = settings.TTS_API_KEY
    user_id = settings.TTS_USER_ID

    if not api_key or api_key.strip() in ("", "mock", "mock_tts_key"):
        print("\n[ERROR] Real Bhashini TTS API credentials are not configured in .env.")
        print("To run with live credentials, configure .env with:")
        print("   TTS_PROVIDER=bhashini")
        print("   TTS_API_KEY=your_actual_bhashini_ulca_api_key")
        print("   TTS_USER_ID=your_actual_bhashini_user_id")
        print("\nAborting real TTS verification test until credentials are provided.")
        sys.exit(1)

    provider = BhashiniTTSProvider(
        api_key=api_key,
        user_id=user_id,
        service_id=settings.TTS_SERVICE_ID,
        voice_id=settings.TTS_VOICE_ID,
        api_url=settings.TTS_API_URL,
        timeout_seconds=settings.TTS_TIMEOUT_SECONDS
    )

    print(f"Input Santhali Text : {input_text}")
    print(f"Target Language     : {tgt_lang}")
    print(f"Target Endpoint     : {provider.api_url}")
    print("Dispatching request to Bhashini TTS API...")

    t0 = time.perf_counter()
    try:
        result = await provider.synthesize(input_text, target_language=tgt_lang)
        elapsed_ms = round((time.perf_counter() - t0) * 1000, 2)

        output_file = "samples/output_santhali.wav"
        os.makedirs(os.path.dirname(output_file), exist_ok=True)
        with open(output_file, "wb") as f:
            f.write(result.audio_bytes)

        print("\n-----------------------------")
        print("REAL BHASHINI TTS VERIFICATION")
        print("-----------------------------")
        print(f"Status          : SUCCESS")
        print(f"Input           : {input_text}")
        print(f"Output Audio    : {output_file} ({len(result.audio_bytes)} bytes)")
        print(f"Audio Format    : {result.audio_format}")
        print(f"Measured Latency: {elapsed_ms} ms")
        print(f"Provider        : {result.provider}")
        print("-----------------------------")
        print("\n[SUCCESS] Santhali speech audio successfully synthesized!")

    except Exception as exc:
        elapsed_ms = round((time.perf_counter() - t0) * 1000, 2)

        print("\n-----------------------------")
        print("REAL BHASHINI TTS VERIFICATION")
        print("-----------------------------")
        print(f"Status          : FAILED")
        print(f"Input           : {input_text}")
        print(f"Output Audio    : NONE")
        print(f"Measured Latency: {elapsed_ms} ms")
        print(f"Provider        : bhashini_tts")
        print(f"Error Details   : {exc}")
        print("-----------------------------")

if __name__ == "__main__":
    text_arg = sys.argv[1] if len(sys.argv) > 1 else "ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱥᱮᱸᱲᱟᱭᱟ ᱾"
    asyncio.run(main(text_arg))
