import os
import sys
import time
import wave
import torch

# Ensure app directory is on path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.modules.tts.ai4bharat_tts import AI4BharatTTSProvider

def run_verification():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")

    print("=" * 60)
    print("AI4Bharat Offline Santali TTS Verification Script")
    print("=" * 60)


    model_name = "ai4bharat/indic-parler-tts"
    santali_text = "ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱥᱮᱸᱲᱟᱭᱟ ᱾"
    output_filename = "santali_ai4bharat.wav"

    provider = AI4BharatTTSProvider(model_name=model_name, device="auto")

    print(f"Target Text (Ol Chiki): {santali_text}")
    print(f"Model Identifier      : {model_name}")

    # 1. Measure model loading time
    print("\nLoading model weights and tokenizers...")
    load_start = time.perf_counter()
    provider._load_model()
    load_end = time.perf_counter()
    load_time_ms = (load_end - load_start) * 1000

    resolved_device = provider._resolved_device
    sample_rate = getattr(provider._model.config, "sampling_rate", 16000)

    print(f"Model Loading Time    : {load_time_ms:.2f} ms")
    print(f"Resolved Device       : {resolved_device}")
    print(f"Model Sampling Rate   : {sample_rate} Hz")

    # 2. Measure audio generation time
    print("\nSynthesizing speech...")
    gen_start = time.perf_counter()
    result = provider._synthesize_sync(santali_text)
    gen_end = time.perf_counter()
    gen_time_ms = (gen_end - gen_start) * 1000

    # 3. Save output file
    with open(output_filename, "wb") as f:
        f.write(result.audio_bytes)

    file_size_bytes = os.path.getsize(output_filename)

    # 4. Read generated WAV header to calculate exact audio duration
    with wave.open(output_filename, "rb") as wf:
        frames = wf.getnframes()
        rate = wf.getframerate()
        duration_seconds = frames / float(rate)

    print("\n" + "=" * 60)
    print("VERIFICATION RESULTS")
    print("=" * 60)
    print(f"Status              : SUCCESS")
    print(f"Provider            : {result.provider}")
    print(f"Device Used         : {resolved_device}")
    print(f"Sample Rate         : {sample_rate} Hz")
    print(f"Output File         : {output_filename}")
    print(f"File Size           : {file_size_bytes} bytes ({file_size_bytes / 1024:.2f} KB)")
    print(f"Audio Duration      : {duration_seconds:.2f} seconds")
    print(f"Model Load Latency  : {load_time_ms:.2f} ms")
    print(f"TTS Latency         : {gen_time_ms:.2f} ms")
    print("=" * 60)

if __name__ == "__main__":
    run_verification()
