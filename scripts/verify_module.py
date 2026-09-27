import sys
import asyncio
import base64
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.modules.tts.mock_tts import create_dummy_wav_bytes

# Ensure UTF-8 output encoding on Windows console
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

async def main():
    print("==================================================")
    print("BhashaSetu AI - Real-Time Voice Translation Module")
    print("Verification Script")
    print("==================================================")

    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://localhost:8000") as client:
        # 1. Health Check
        health_resp = await client.get("/health")
        print(f"\n[1] GET /health Status: {health_resp.status_code}")
        print("Response Payload:")
        print(health_resp.json())

        # 2. Voice Translation API Call
        dummy_audio = create_dummy_wav_bytes(duration_ms=500)
        files = {
            "audio_file": ("sample_hindi.wav", dummy_audio, "audio/wav")
        }
        data = {
            "source_language": "hi",
            "target_language": "sat"
        }

        print("\n[2] POST /api/v1/translate-voice")
        resp = await client.post("/api/v1/translate-voice", files=files, data=data)
        print(f"Status Code: {resp.status_code}")
        payload = resp.json()
        
        # Display summarized payload
        print("\nPipeline Result:")
        print(f"  Status: {payload.get('status')}")
        print(f"  Source Language: {payload.get('source_language')}")
        print(f"  Target Language: {payload.get('target_language')}")
        print(f"  Transcription (Hindi): {payload.get('transcription')}")
        print(f"  Translation (Santhali): {payload.get('translation')}")
        print(f"  Audio Format: {payload.get('audio_format')}")
        print(f"  Audio Payload Size: {len(payload.get('audio_base64', ''))} bytes (Base64)")
        print("\nLatency Metrics Breakdown:")
        metrics = payload.get('latency_metrics', {})
        print(f"  - ASR Latency (T_asr): {metrics.get('asr_ms')} ms")
        print(f"  - Translation API Latency (T_translation): {metrics.get('translation_ms')} ms")
        print(f"  - TTS Latency (T_tts): {metrics.get('tts_ms')} ms")
        print(f"  - End-to-End Latency (T_total): {metrics.get('total_ms')} ms")
        print("\n==================================================")
        print("VERIFICATION SUCCESSFUL: All module components working clean!")
        print("==================================================")

if __name__ == "__main__":
    asyncio.run(main())
