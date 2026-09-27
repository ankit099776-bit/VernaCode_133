import base64
import pytest
from unittest.mock import patch, MagicMock
import httpx
from app.modules.tts.mock_tts import MockTTSProvider
from app.modules.tts.bhashini_tts import BhashiniTTSProvider
from app.modules.tts.factory import get_tts_provider
from app.config import settings

# 1. Mock TTS Provider Tests
@pytest.mark.asyncio
async def test_mock_tts_provider_success():
    provider = MockTTSProvider()
    result = await provider.synthesize("ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱥᱮᱸᱲᱟᱭᱟ ᱾", target_language="sat")
    
    assert result.provider == "mock_tts"
    assert result.audio_format == "wav"
    assert len(result.audio_bytes) > 0
    assert result.audio_bytes.startswith(b"RIFF")

# 2. Bhashini TTS Provider Success Test
@pytest.mark.asyncio
async def test_bhashini_tts_provider_success():
    provider = BhashiniTTSProvider(api_key="valid_bhashini_key", user_id="valid_user_id")
    dummy_wav_b64 = base64.b64encode(b"RIFF_DUMMY_BHASHINI_WAV_AUDIO").decode("utf-8")
    
    mock_resp = httpx.Response(
        status_code=200,
        json={
            "pipelineResponse": [
                {
                    "taskType": "tts",
                    "audio": [
                        {
                            "audioContent": dummy_wav_b64
                        }
                    ]
                }
            ]
        }
    )

    with patch.object(httpx.AsyncClient, "post", return_value=mock_resp) as mock_post:
        result = await provider.synthesize("ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱥᱮᱸᱲᱟᱭᱟ ᱾", target_language="sat")

    assert result.audio_bytes == b"RIFF_DUMMY_BHASHINI_WAV_AUDIO"
    assert result.audio_format == "wav"
    assert result.provider == "bhashini_tts"

    mock_post.assert_called_once()
    kwargs = mock_post.call_args.kwargs
    assert kwargs["headers"]["ulcaApiKey"] == "valid_bhashini_key"
    assert kwargs["headers"]["userID"] == "valid_user_id"
    assert kwargs["json"]["pipelineTasks"][0]["config"]["language"]["sourceLanguage"] == "sat"

# 3. Missing API Key Test
@pytest.mark.asyncio
async def test_bhashini_tts_missing_credentials():
    provider = BhashiniTTSProvider(api_key="", user_id="")
    res = await provider.synthesize("ᱜᱤᱫᱽᱨᱟᱹ", target_language="sat")
    assert res.provider == "mock_tts"
    assert len(res.audio_bytes) > 0

# 4. Empty Text Test
@pytest.mark.asyncio
async def test_bhashini_tts_empty_text():
    provider = BhashiniTTSProvider(api_key="valid_key")
    with pytest.raises(ValueError, match="Text provided for speech synthesis is empty"):
        await provider.synthesize("", target_language="sat")

# 5. Unsupported Language Test
@pytest.mark.asyncio
async def test_bhashini_tts_unsupported_language():
    provider = BhashiniTTSProvider(api_key="valid_key")
    with pytest.raises(ValueError, match="Unsupported target language code for Bhashini TTS"):
        await provider.synthesize("Hello", target_language="invalid_lang")

# 6. HTTP Error Test
@pytest.mark.asyncio
async def test_bhashini_tts_http_error():
    provider = BhashiniTTSProvider(api_key="valid_key")
    mock_resp = httpx.Response(status_code=500, text="Internal Server Error")

    with patch.object(httpx.AsyncClient, "post", return_value=mock_resp):
        with pytest.raises(RuntimeError, match="Bhashini TTS API error"):
            await provider.synthesize("ᱜᱤᱫᱽᱨᱟᱹ", target_language="sat")

# 7. Timeout Test
@pytest.mark.asyncio
async def test_bhashini_tts_timeout():
    provider = BhashiniTTSProvider(api_key="valid_key")

    with patch.object(httpx.AsyncClient, "post", side_effect=httpx.TimeoutException("Timed out")):
        with pytest.raises(RuntimeError, match="timed out"):
            await provider.synthesize("ᱜᱤᱫᱽᱨᱟᱹ", target_language="sat")

# 8. Malformed Response Test
@pytest.mark.asyncio
async def test_bhashini_tts_malformed_response():
    provider = BhashiniTTSProvider(api_key="valid_key")
    mock_resp = httpx.Response(status_code=200, json={"pipelineResponse": []})

    with patch.object(httpx.AsyncClient, "post", return_value=mock_resp):
        with pytest.raises(ValueError, match="missing 'audioContent' field"):
            await provider.synthesize("ᱜᱤᱫᱽᱨᱟᱹ", target_language="sat")

# 9. Factory Test
def test_tts_factory(monkeypatch):
    monkeypatch.setattr(settings, "TTS_PROVIDER", "mock")
    mock_prov = get_tts_provider()
    assert isinstance(mock_prov, MockTTSProvider)

    monkeypatch.setattr(settings, "TTS_PROVIDER", "bhashini")
    monkeypatch.setattr(settings, "TTS_API_KEY", "real_bhashini_key")
    bhashini_prov = get_tts_provider()
    assert isinstance(bhashini_prov, BhashiniTTSProvider)

    monkeypatch.setattr(settings, "TTS_PROVIDER", "ai4bharat")
    with pytest.raises(ValueError, match="AI4Bharat TTS provider is disabled"):
        get_tts_provider()

# 10. AI4Bharat TTS Disabled Test
@pytest.mark.asyncio
async def test_ai4bharat_tts_provider_disabled():
    from app.modules.tts.ai4bharat_tts import AI4BharatTTSProvider
    provider = AI4BharatTTSProvider()
    with pytest.raises(NotImplementedError, match="AI4Bharat TTS provider is disabled"):
        await provider.synthesize("ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱥᱮᱸᱲᱟᱭᱟ ᱾", target_language="sat")

