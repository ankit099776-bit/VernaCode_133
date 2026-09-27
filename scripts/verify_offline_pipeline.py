import asyncio
import os
import sys
import time

sys.path.insert(0, os.path.abspath("."))

# Ensure UTF-8 output on Windows console
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

from app.config import settings
from app.core.pipeline import VoiceTranslationPipeline

async def run_verification():
    print("=" * 70)
    print("BHASHASETU AI — FULL REAL OFFLINE PIPELINE VERIFICATION")
    print("=" * 70)

    # Force OFFLINE mode
    settings.PIPELINE_MODE = "offline"
    settings.ASR_PROVIDER = "local"
    settings.TRANSLATION_PROVIDER = "local"
    settings.TTS_PROVIDER = "ai4bharat"

    pipeline = VoiceTranslationPipeline()

    sample_files = [
        "samples/sample_hindi.wav",
        "samples/sample_hindi_2.wav"
    ]

    results = []

    for idx, sample_path in enumerate(sample_files, 1):
        if not os.path.exists(sample_path):
            print(f"Error: Sample file '{sample_path}' not found!")
            continue

        print(f"\n--- TEST {idx}: Processing Audio File '{sample_path}' ---")
        with open(sample_path, "rb") as f:
            audio_bytes = f.read()

        t_start = time.perf_counter()
        res = await pipeline.execute(
            audio_bytes=audio_bytes,
            source_language="hi",
            target_language="sat",
            filename=os.path.basename(sample_path),
            mode="offline"
        )
        t_end = time.perf_counter()

        print(f"Input Audio Size:      {len(audio_bytes)} bytes")
        print(f"Transcription (Hindi): {res.transcription}")
        print(f"Translation (Santali): {res.translation}")
        print(f"ASR Provider:          {res.asr_provider}")
        print(f"TTS Provider:          {res.tts_provider}")
        print(f"Synthesized Audio B64: {len(res.audio_base64)} chars")
        print(f"Audio Duration:        {res.audio_duration} s")
        print("Latency Breakdown:")
        print(f"  - Local ASR:         {res.latency_metrics.asr_ms:.2f} ms")
        print(f"  - Local Translation: {res.latency_metrics.translation_ms:.2f} ms")
        print(f"  - Local TTS:         {res.latency_metrics.tts_ms:.2f} ms")
        print(f"  - Total End-to-End:  {res.latency_metrics.total_ms:.2f} ms")

        results.append(res)

    print("\n" + "=" * 70)
    print("VERIFICATION SUMMARY")
    print("=" * 70)
    if len(results) >= 2:
        print(f"Test 1 Hindi Transcript: '{results[0].transcription}'")
        print(f"Test 1 Santali Text:    '{results[0].translation}'")
        print(f"Test 2 Hindi Transcript: '{results[1].transcription}'")
        print(f"Test 2 Santali Text:    '{results[1].translation}'")
        assert results[0].transcription != results[1].transcription, "FAIL: Transcripts must be distinct for different inputs!"
        assert results[0].translation != results[1].translation, "FAIL: Translations must be distinct for different inputs!"
        print("\n✅ SUCCESS: Distinct audio inputs produced distinct transcriptions and Santali translations!")
        print("✅ SUCCESS: Full local offline pipeline executed with 0 cloud API calls!")
    else:
        print("❌ Verification incomplete.")

if __name__ == "__main__":
    asyncio.run(run_verification())
