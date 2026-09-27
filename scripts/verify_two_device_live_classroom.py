import asyncio
import os
import sys
import time
import base64
import soundfile as sf
import io
import httpx
import websockets
import ssl

sys.path.insert(0, os.path.abspath("."))

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

async def test_live_classroom():
    print("=" * 80)
    print("LIVE TWO-DEVICE CLASSROOM DEMO VERIFICATION")
    print("=" * 80)

    ws_url = "wss://127.0.0.1:8000/api/v1/ws/v1/voice-stream"
    api_url = "https://127.0.0.1:8000/api/v1/translate-voice"

    # SSL context that trusts self-signed cert
    ssl_context = ssl.create_default_context()
    ssl_context.check_hostname = False
    ssl_context.verify_mode = ssl.CERT_NONE

    print(f"1. Connecting Student Device to WebSocket stream at '{ws_url}'...")
    async with websockets.connect(ws_url, ssl=ssl_context) as ws:
        init_msg = await ws.recv()
        print(f"  Student Connected! Initial Message: {init_msg}")

        sample_inputs = [
            ("samples/sample_hindi.wav", " बच्चों, आज हम गिनती सीखेंगे।"),
            ("samples/sample_hindi_2.wav", "नमस्ते भारत, आप सब कैसे हैं?")
        ]

        async with httpx.AsyncClient(verify=False, timeout=120.0) as http_client:
            for idx, (filepath, expected_text) in enumerate(sample_inputs, 1):
                print(f"\n" + "-" * 70)
                print(f"--- TEACHER INPUT {idx}: Spoken Audio File '{filepath}' ---")
                print(f"-" * 70)

                with open(filepath, "rb") as f:
                    audio_bytes = f.read()

                t0 = time.perf_counter()

                # Start translation API task concurrently
                files = {"audio_file": (os.path.basename(filepath), audio_bytes, "audio/wav")}
                data = {"source_language": "hi", "target_language": "sat", "mode": "online"}
                
                req_task = asyncio.create_task(http_client.post(api_url, files=files, data=data))

                # Step A: Expect immediate progressive text_translation event on WebSocket
                t_text0 = time.perf_counter()
                ws_text_evt = await ws.recv()
                t_text_lat = (time.perf_counter() - t_text0) * 1000
                
                print(f"⚡ [STUDENT RECEIVER] Event 1 (Immediate Text) in {t_text_lat:.2f} ms:")
                print(f"   Payload: {ws_text_evt}")

                # Step B: Expect full voice_translation event on WebSocket when TTS completes
                t_voice0 = time.perf_counter()
                ws_voice_evt = await ws.recv()
                t_voice_lat = (time.perf_counter() - t_voice0) * 1000

                resp = await req_task
                res_data = resp.json()
                t_total = (time.perf_counter() - t0) * 1000

                print(f"\n🔊 [STUDENT RECEIVER] Event 2 (Voice + Audio) in {t_voice_lat:.2f} ms:")
                print(f"   Hindi ASR Transcript: '{res_data.get('transcription')}'")
                print(f"   Santali Ol Chiki Text: '{res_data.get('translation')}'")
                
                audio_b64 = res_data.get("audio_base64", "")
                audio_len = len(audio_b64)
                print(f"   Santali Audio Base64: {audio_len} chars")

                # Verify WAV audio validity
                if audio_b64:
                    raw_audio = base64.b64decode(audio_b64)
                    audio_io = io.BytesIO(raw_audio)
                    audio_data, sr = sf.read(audio_io)
                    dur = len(audio_data) / sr
                    print(f"   WAV Audio Valid:      YES (Sample Rate: {sr} Hz, Duration: {dur:.2f}s, Bytes: {len(raw_audio)})")

                metrics = res_data.get("latency_metrics", {})
                print(f"\n⏱️ LATENCY TELEMETRY BREAKDOWN (Test {idx}):")
                print(f"   - Sarvam ASR:         {metrics.get('asr_ms', 0):.2f} ms")
                print(f"   - Sarvam Translation: {metrics.get('translation_ms', 0):.2f} ms")
                print(f"   - AI4Bharat TTS:      {metrics.get('tts_ms', 0):.2f} ms")
                print(f"   - Total End-to-End:   {t_total:.2f} ms (~{t_total/1000:.2f}s)")

if __name__ == "__main__":
    asyncio.run(test_live_classroom())
