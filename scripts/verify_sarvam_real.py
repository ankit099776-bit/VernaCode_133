import os
import sys
import time
import asyncio
from app.config import settings
from app.modules.asr.sarvam_asr import SarvamASRProvider

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

async def main():
    print("==================================================")
    print("BhashaSetu AI - Real Sarvam AI ASR Verification")
    print("==================================================")

    api_key = settings.ASR_API_KEY
    if not api_key or api_key.strip() in ("", "mock", "mock_asr_key"):
        print("\n[ERROR] Real Sarvam API key is not configured.")
        print("To run with a live key, update ASR_API_KEY in your .env file:")
        print("   ASR_PROVIDER=sarvam")
        print("   ASR_MODEL_NAME=saaras:v3")
        print("   ASR_API_KEY=your_actual_sarvam_key")
        print("\nAttempting API call to verify authentication error response...")

    # Initialize SarvamASRProvider with configured model (saaras:v3)
    provider = SarvamASRProvider(
        api_key=api_key,
        model_name=settings.ASR_MODEL_NAME or "saaras:v3"
    )

    sample_path = "samples/sample_hindi.wav"
    if not os.path.exists(sample_path):
        from scripts.generate_sample_wav import generate_sample_wav
        generate_sample_wav(sample_path, duration_sec=2.0, sample_rate=16000)

    with open(sample_path, "rb") as f:
        audio_bytes = f.read()

    print(f"\n[INFO] Loaded local audio file: {sample_path} ({len(audio_bytes)} bytes, 16kHz 16-bit Mono WAV)")
    print(f"[INFO] Dispatching POST request to Sarvam STT API (Model: {provider.model_name}, Lang: hi-IN)...")

    t0 = time.perf_counter()
    try:
        result = await provider.transcribe(audio_bytes, source_language="hi")
        elapsed_ms = round((time.perf_counter() - t0) * 1000, 2)

        print("\n==================================================")
        print("REAL SARVAM ASR API CALL RESULT: SUCCESS")
        print("==================================================")
        print(f"  Provider           : {result.provider}")
        print(f"  Language           : {result.source_language}")
        print(f"  Transcription      : {result.text}")
        print(f"  Measured Latency   : {elapsed_ms} ms")
        print(f"  Audio Format Used  : WAV (16kHz 16-bit Mono)")
        print("==================================================")
    except Exception as exc:
        elapsed_ms = round((time.perf_counter() - t0) * 1000, 2)
        print("\n==================================================")
        print("REAL SARVAM ASR API CALL RESULT: FAILED")
        print("==================================================")
        print(f"  Error Message      : {exc}")
        print(f"  Measured Latency   : {elapsed_ms} ms")
        print(f"  Audio Format Used  : WAV (16kHz 16-bit Mono)")
        print("==================================================")

if __name__ == "__main__":
    asyncio.run(main())
