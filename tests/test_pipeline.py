import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.config import settings
from app.modules.tts.mock_tts import create_dummy_wav_bytes
from app.core.pipeline import VoiceTranslationPipeline

@pytest.fixture(autouse=True)
def force_mock_providers(monkeypatch):
    """Ensure pipeline tests always run with Mock providers regardless of .env settings."""
    monkeypatch.setattr(settings, "ASR_PROVIDER", "mock")
    monkeypatch.setattr(settings, "TRANSLATION_PROVIDER", "mock")
    monkeypatch.setattr(settings, "TTS_PROVIDER", "mock")

@pytest.mark.asyncio
async def test_health_endpoint():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["asr_provider"] == "mock"
    assert data["tts_provider"] == "mock"

@pytest.mark.asyncio
async def test_different_audio_inputs_produce_different_transcripts_and_translations():
    """
    Verify that:
    Audio A -> transcript A -> translation receives transcript A
    Audio B -> transcript B -> translation receives transcript B
    and no hard-coded sentence is used.
    """
    pipeline = VoiceTranslationPipeline()

    audio_a = b"AUDIO_A_SPECIFIC_BYTES_INPUT_1"
    audio_b = b"AUDIO_B_SPECIFIC_BYTES_INPUT_2"

    res_a = await pipeline.execute(audio_bytes=audio_a, source_language="hi", target_language="sat")
    res_b = await pipeline.execute(audio_bytes=audio_b, source_language="hi", target_language="sat")

    # Verify transcript A is passed and translated
    assert res_a.transcription == "यह पहला परीक्षण ऑडियो है।"
    assert "यह पहला परीक्षण ऑडियो है।" in res_a.translation

    # Verify transcript B is passed and translated
    assert res_b.transcription == "यह दूसरा परीक्षण ऑडियो है।"
    assert "यह दूसरा परीक्षण ऑडियो है।" in res_b.translation

    # Verify transcripts and translations are distinct
    assert res_a.transcription != res_b.transcription
    assert res_a.translation != res_b.translation

@pytest.mark.asyncio
async def test_empty_asr_result():
    """Verify that empty/silence audio produces empty transcript and returns a clear error."""
    pipeline = VoiceTranslationPipeline()
    empty_speech_audio = b"EMPTY_SPEECH_SILENCE_BYTES"

    with pytest.raises(ValueError, match="No speech detected in the audio."):
        await pipeline.execute(audio_bytes=empty_speech_audio, source_language="hi", target_language="sat")

@pytest.mark.asyncio
async def test_empty_audio_api_validation():
    """Verify that uploading an empty audio payload returns HTTP 400."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        files = {"audio_file": ("empty.wav", b"", "audio/wav")}
        data = {"source_language": "hi", "target_language": "sat"}
        response = await ac.post("/api/v1/translate-voice", files=files, data=data)

    assert response.status_code == 400
    assert "Empty audio payload provided." in response.json()["detail"]

@pytest.mark.asyncio
async def test_empty_speech_api_validation():
    """Verify that an audio file with no detected speech returns HTTP 400 Bad Request."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        files = {"audio_file": ("silence.wav", b"EMPTY_SPEECH_SILENCE_BYTES", "audio/wav")}
        data = {"source_language": "hi", "target_language": "sat"}
        response = await ac.post("/api/v1/translate-voice", files=files, data=data)

    assert response.status_code == 400
    assert "No speech detected in the audio." in response.json()["detail"]

@pytest.mark.asyncio
async def test_translation_failure_handling():
    """Verify that translation provider failure raises error cleanly."""
    class FailingTranslationClient:
        async def translate(self, text, source_language, target_language):
            raise RuntimeError("Translation API Connection Timeout")

    pipeline = VoiceTranslationPipeline(translation_client=FailingTranslationClient())
    dummy_audio = b"AUDIO_A_TEST"

    with pytest.raises(RuntimeError, match="Translation API Connection Timeout"):
        await pipeline.execute(audio_bytes=dummy_audio)

@pytest.mark.asyncio
async def test_tts_failure_handling():
    """Verify that TTS provider failure raises error cleanly."""
    class FailingTTSProvider:
        async def synthesize(self, text, target_language, **kwargs):
            raise RuntimeError("TTS Synthesis Engine Crash")

    pipeline = VoiceTranslationPipeline(tts_provider=FailingTTSProvider())
    dummy_audio = b"AUDIO_A_TEST"

    with pytest.raises(RuntimeError, match="TTS Synthesis Engine Crash"):
        await pipeline.execute(audio_bytes=dummy_audio)

@pytest.mark.asyncio
async def test_translate_voice_api_success():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        dummy_audio = create_dummy_wav_bytes(duration_ms=200)
        files = {
            "audio_file": ("test.wav", dummy_audio, "audio/wav")
        }
        data = {
            "source_language": "hi",
            "target_language": "sat"
        }
        response = await ac.post("/api/v1/translate-voice", files=files, data=data)

    assert response.status_code == 200
    res_data = response.json()
    assert res_data["status"] == "success"
    assert len(res_data["transcription"]) > 0
    assert len(res_data["translation"]) > 0
    assert "latency_metrics" in res_data
    assert res_data["latency_metrics"]["total_ms"] > 0

@pytest.mark.asyncio
async def test_status_endpoint():
    """Verify diagnostic /api/v1/status endpoint returns expected OFFLINE mode structure."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/status")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "mode" in data
    assert "is_offline" in data
    assert "internet_dependency" in data
    assert "providers" in data

@pytest.mark.asyncio
async def test_translate_voice_with_explicit_mode():
    """Verify /api/v1/translate-voice accepts explicit mode parameter (offline)."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        dummy_audio = create_dummy_wav_bytes(duration_ms=200)
        files = {
            "audio_file": ("test_mode.wav", dummy_audio, "audio/wav")
        }
        data = {
            "source_language": "hi",
            "target_language": "sat",
            "mode": "offline"
        }
        response = await ac.post("/api/v1/translate-voice", files=files, data=data)

    assert response.status_code == 200
    res_data = response.json()
    assert res_data["status"] == "success"

