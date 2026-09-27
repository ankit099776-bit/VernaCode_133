import pytest
from unittest.mock import patch
import httpx
from app.modules.translation.mock_translation import MockTranslationProvider
from app.modules.translation.sarvam_translation import SarvamTranslationProvider
from app.modules.translation.factory import get_translation_provider
from app.config import settings

# 1. Successful Translation Tests
@pytest.mark.asyncio
async def test_mock_translation_provider_success():
    provider = MockTranslationProvider()
    result = await provider.translate("बच्चों, आज हम गिनती सीखेंगे।", source_language="hi", target_language="sat")
    
    assert result.translated_text == "ᱜᱤᱫᱽᱨᱟᱹ, ᱛᱮᱦᱮᱧ ᱵᱚᱱ ᱞᱮᱠᱷᱟ ᱪᱮᱫᱚᱜ-ᱟ।"
    assert result.source_language == "hi"
    assert result.target_language == "sat"
    assert result.provider == "mock_translation_provider"

@pytest.mark.asyncio
async def test_sarvam_translation_provider_success():
    provider = SarvamTranslationProvider(api_key="valid_sarvam_key")
    
    mock_resp = httpx.Response(
        status_code=200,
        json={
            "translated_text": "ᱜᱤᱫᱽᱨᱟᱹ, ᱛᱮᱦᱮᱧ ᱵᱚᱱ ᱞᱮᱠᱷᱟ ᱪᱮᱫᱚᱜ-ᱟ।",
            "source_language_code": "hi-IN",
            "target_language_code": "sat-IN"
        }
    )
    
    with patch.object(httpx.AsyncClient, "post", return_value=mock_resp) as mock_post:
        result = await provider.translate("बच्चों, आज हम गिनती सीखेंगे।", source_language="hi", target_language="sat")

    assert result.translated_text == "ᱜᱤᱫᱽᱨᱟᱹ, ᱛᱮᱦᱮᱧ ᱵᱚᱱ ᱞᱮᱠᱷᱟ ᱪᱮᱫᱚᱜ-ᱟ।"
    assert result.provider == "sarvam_translation_provider"
    
    mock_post.assert_called_once()
    kwargs = mock_post.call_args.kwargs
    assert kwargs["headers"]["api-subscription-key"] == "valid_sarvam_key"
    assert kwargs["json"]["source_language_code"] == "hi-IN"
    assert kwargs["json"]["target_language_code"] == "sat-IN"

# 2. Unsupported Language Tests
@pytest.mark.asyncio
async def test_translation_unsupported_language():
    provider = MockTranslationProvider()
    with pytest.raises(ValueError, match="Unsupported target language"):
        await provider.translate("नमस्ते", source_language="hi", target_language="invalid_lang")

    sarvam_provider = SarvamTranslationProvider(api_key="valid_key")
    with pytest.raises(ValueError, match="Unsupported source language code"):
        await sarvam_provider.translate("Hello", source_language="fr", target_language="sat")

# 3. Empty Text Tests
@pytest.mark.asyncio
async def test_translation_empty_text():
    provider = MockTranslationProvider()
    with pytest.raises(ValueError, match="Text provided for translation is empty"):
        await provider.translate("", source_language="hi", target_language="sat")

    sarvam_provider = SarvamTranslationProvider(api_key="valid_key")
    with pytest.raises(ValueError, match="Text provided for translation is empty"):
        await sarvam_provider.translate("   ", source_language="hi", target_language="sat")

# 4. Provider / API Failure Tests
@pytest.mark.asyncio
async def test_sarvam_translation_http_error():
    provider = SarvamTranslationProvider(api_key="valid_key")
    mock_resp = httpx.Response(status_code=500, text="Internal Server Error")
    
    with patch.object(httpx.AsyncClient, "post", return_value=mock_resp):
        with pytest.raises(RuntimeError, match="Sarvam Translation API error"):
            await provider.translate("नमस्ते", source_language="hi", target_language="sat")

# 5. Timeout Tests
@pytest.mark.asyncio
async def test_sarvam_translation_timeout():
    provider = SarvamTranslationProvider(api_key="valid_key")
    
    with patch.object(httpx.AsyncClient, "post", side_effect=httpx.TimeoutException("Timed out")):
        with pytest.raises(RuntimeError, match="timed out"):
            await provider.translate("नमस्ते", source_language="hi", target_language="sat")

# 6. Malformed Response Tests
@pytest.mark.asyncio
async def test_sarvam_translation_malformed_response():
    provider = SarvamTranslationProvider(api_key="valid_key")
    mock_resp = httpx.Response(status_code=200, json={"result": "missing_translated_text_key"})
    
    with patch.object(httpx.AsyncClient, "post", return_value=mock_resp):
        with pytest.raises(ValueError, match="missing 'translated_text' field"):
            await provider.translate("नमस्ते", source_language="hi", target_language="sat")

# 7. Factory Tests
def test_translation_factory(monkeypatch):
    monkeypatch.setattr(settings, "TRANSLATION_PROVIDER", "mock")
    mock_prov = get_translation_provider()
    assert isinstance(mock_prov, MockTranslationProvider)

    monkeypatch.setattr(settings, "TRANSLATION_PROVIDER", "sarvam")
    sarvam_prov = get_translation_provider()
    assert isinstance(sarvam_prov, SarvamTranslationProvider)
