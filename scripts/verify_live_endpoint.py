import sys
import hashlib
import httpx

# Ensure UTF-8 console output
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

def main():
    print("======================================================================")
    print("LIVE END-TO-END VERIFICATION AGAINST HTTP SERVER ON PORT 8000")
    print("======================================================================\n")

    # Test File 1: samples/sample_hindi.wav
    with open("samples/sample_hindi.wav", "rb") as f:
        bytes_1 = f.read()
    hash_1 = hashlib.sha256(bytes_1).hexdigest()

    files_1 = {"audio_file": ("sample_hindi.wav", bytes_1, "audio/wav")}
    data_1 = {"source_language": "hi", "target_language": "sat"}

    print("[TEST FILE 1] sample_hindi.wav")
    print(f"  Size   : {len(bytes_1)} bytes")
    print(f"  SHA256 : {hash_1}")

    resp_1 = httpx.post("http://127.0.0.1:8000/api/v1/translate-voice", files=files_1, data=data_1, timeout=180.0)
    res_1 = resp_1.json()

    print(f"  HTTP Status  : {resp_1.status_code}")
    print(f"  ASR Provider : {res_1.get('asr_provider')}")
    print(f"  TTS Provider : {res_1.get('tts_provider')}")
    print(f"  Transcript   : \"{res_1.get('transcription')}\"")
    print(f"  Translation  : \"{res_1.get('translation')}\"\n")

    # Test File 2: samples/sample_hindi_2.wav
    with open("samples/sample_hindi_2.wav", "rb") as f:
        bytes_2 = f.read()
    hash_2 = hashlib.sha256(bytes_2).hexdigest()

    files_2 = {"audio_file": ("sample_hindi_2.wav", bytes_2, "audio/wav")}
    data_2 = {"source_language": "hi", "target_language": "sat"}

    print("[TEST FILE 2] sample_hindi_2.wav")
    print(f"  Size   : {len(bytes_2)} bytes")
    print(f"  SHA256 : {hash_2}")

    resp_2 = httpx.post("http://127.0.0.1:8000/api/v1/translate-voice", files=files_2, data=data_2, timeout=180.0)
    res_2 = resp_2.json()

    print(f"  HTTP Status  : {resp_2.status_code}")
    print(f"  ASR Provider : {res_2.get('asr_provider')}")
    print(f"  TTS Provider : {res_2.get('tts_provider')}")
    print(f"  Transcript   : \"{res_2.get('transcription')}\"")
    print(f"  Translation  : \"{res_2.get('translation')}\"\n")

    # Assertions
    assert resp_1.status_code == 200 and resp_2.status_code == 200, "HTTP requests failed!"
    assert hash_1 != hash_2, "Hashes of test files must be different!"
    assert res_1['transcription'] != res_2['transcription'], "Transcripts MUST be different!"
    assert res_1['translation'] != res_2['translation'], "Translations MUST be different!"

    print("======================================================================")
    print("SUCCESS: Verified that 2 DIFFERENT uploaded audio files produce 2 DIFFERENT ASR transcripts & translations!")
    print("======================================================================")

if __name__ == "__main__":
    main()
