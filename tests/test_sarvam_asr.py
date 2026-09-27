import pytest
from unittest.mock import patch
import httpx
from app.modules.asr.sarvam_asr import SarvamASRProvider
from app.modules.asr.factory import get_asr_provider
from app.modules.asr.mock_asr import MockASRProvider
from app.config import settings

@pytest.mark.asyncio
async def test_sarvam_asr_success():
    provider = SarvamASRProvider(api_key="valid_test_key", model_name="saaras:v1")
    dummy_audio = b"dummy_wav_audio_bytes"

    mock_resp = httpx.Response(
        status_code=200,
        json={
            "request_id": "test_123",
            "transcript": "नमस्ते दुनिया",
            "language_code": "hi-IN"
        }
    )

    with patch.object(httpx.AsyncClient, "post", return_value=mock_resp) as mock_post:
        result = await provider.transcribe(dummy_audio, source_language="hi")

    assert result.text == "नमस्ते दुनिया"
    assert result.source_language == "hi-IN"
    assert result.provider == "sarvam_asr"
    assert result.confidence == 1.0

    mock_post.assert_called_once()
    kwargs = mock_post.call_args.kwargs
    assert kwargs["headers"]["api-subscription-key"] == "valid_test_key"
    assert kwargs["data"]["model"] == "saaras:v1"
    assert kwargs["data"]["language_code"] == "hi-IN"

@pytest.mark.asyncio
async def test_sarvam_asr_missing_api_key():
    provider = SarvamASRProvider(api_key="mock", model_name="saaras:v1")
    with pytest.raises(ValueError, match="Sarvam ASR API key is not configured"):
        await provider.transcribe(b"audio", source_language="hi")

@pytest.mark.asyncio
async def test_sarvam_asr_http_error():
    provider = SarvamASRProvider(api_key="valid_key", model_name="saaras:v1")
    mock_resp = httpx.Response(status_code=401, text="Unauthorized - Invalid API Key")

    with patch.object(httpx.AsyncClient, "post", return_value=mock_resp):
        with pytest.raises(RuntimeError, match="Sarvam ASR API error"):
            await provider.transcribe(b"audio", source_language="hi")

@pytest.mark.asyncio
async def test_sarvam_asr_timeout():
    provider = SarvamASRProvider(api_key="valid_key", model_name="saaras:v1")

    with patch.object(httpx.AsyncClient, "post", side_effect=httpx.TimeoutException("Timeout")):
        with pytest.raises(RuntimeError, match="timed out"):
            await provider.transcribe(b"audio", source_language="hi")

def test_asr_factory_creates_sarvam_and_mock(monkeypatch):
    monkeypatch.setattr(settings, "ASR_PROVIDER", "mock")
    mock_prov = get_asr_provider()
    assert isinstance(mock_prov, MockASRProvider)

    monkeypatch.setattr(settings, "ASR_PROVIDER", "sarvam")
    sarvam_prov = get_asr_provider()
    assert isinstance(sarvam_prov, SarvamASRProvider)
