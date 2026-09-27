import io
import wave
import pytest
from app.core.audio_validator import validate_input_audio, validate_tts_audio

def create_mock_wav_bytes(sample_rate=16000, duration_sec=1.0) -> bytes:
    buf = io.BytesIO()
    with wave.open(buf, 'wb') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sample_rate)
        nframes = int(sample_rate * duration_sec)
        wf.writeframes(b'\x00\x00' * nframes)
    return buf.getvalue()

def test_validate_input_audio_valid_wav():
    wav_bytes = create_mock_wav_bytes(16000, 1.5)
    meta = validate_input_audio(wav_bytes, filename="test.wav", content_type="audio/wav")
    assert meta["valid"] is True
    assert meta["audio_format"] == "wav"
    assert meta["sample_rate"] == 16000
    assert meta["channels"] == 1
    assert meta["duration_seconds"] == 1.5
    assert meta["size_bytes"] > 0

def test_validate_input_audio_empty_payload():
    with pytest.raises(ValueError, match="empty or zero bytes"):
        validate_input_audio(b"")

def test_validate_tts_audio_valid_wav():
    wav_bytes = create_mock_wav_bytes(16000, 2.0)
    meta = validate_tts_audio(wav_bytes, provider_name="bhashini_tts", target_language="sat")
    assert meta["valid"] is True
    assert meta["audio_format"] == "wav"
    assert meta["sample_rate"] == 16000
    assert meta["duration_seconds"] == 2.0
    assert meta["provider"] == "bhashini_tts"

def test_validate_tts_audio_invalid_header():
    invalid_bytes = b"NOT_A_WAV_FILE_HEADER_BYTES"
    with pytest.raises(ValueError, match="not a valid WAV payload"):
        validate_tts_audio(invalid_bytes, provider_name="bhashini_tts")
