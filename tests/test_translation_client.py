import pytest
from unittest.mock import patch
import httpx
from app.modules.translation.client import TranslationClient
from app.config import settings

@pytest.mark.asyncio
async def test_translation_client_mock_mode(monkeypatch):
    monkeypatch.setattr(settings, "TRANSLATION_PROVIDER", "mock")
    client = TranslationClient(api_key="mock_translation_key")
    result = await client.translate("नमस्ते", source_language="hi", target_language="sat")
    
    assert result.translated_text == "ᱡᱚᱦᱟᱨ"
    assert result.source_language == "hi"
    assert result.target_language == "sat"
    assert result.provider == "mock_translation_provider"

@pytest.mark.asyncio
async def test_translation_client_real_success():
    client = TranslationClient(
        api_url="https://api.sarvam.ai/translate",
        api_key="real_teammate_token"
    )
    
    mock_resp = httpx.Response(
        status_code=200,
        json={
            "translated_text": "ᱡᱚᱦᱟᱨ, ᱪᱮᱫ ᱞᱮᱠᱟ ᱢᱮᱱᱟᱢᱟ?",
            "source_language_code": "hi-IN",
            "target_language_code": "sat-IN"
        }
    )
    
    with patch.object(httpx.AsyncClient, "post", return_value=mock_resp) as mock_post:
        result = await client.translate("नमस्ते, आप कैसे हैं?", source_language="hi", target_language="sat")

    assert result.translated_text == "ᱡᱚᱦᱟᱨ, ᱪᱮᱫ ᱞᱮᱠᱟ ᱢᱮᱱᱟᱢᱟ?"
    assert result.provider == "sarvam_translation_provider"
    mock_post.assert_called_once()
    
    kwargs = mock_post.call_args.kwargs
    assert kwargs["headers"]["api-subscription-key"] == "real_teammate_token"
    assert kwargs["json"]["input"] == "नमस्ते, आप कैसे हैं?"

@pytest.mark.asyncio
async def test_translation_client_real_http_error():
    client = TranslationClient(api_key="real_token")
    mock_resp = httpx.Response(status_code=500, text="Internal Server Error")
    
    with patch.object(httpx.AsyncClient, "post", return_value=mock_resp):
        with pytest.raises(RuntimeError, match="Sarvam Translation API error"):
            await client.translate("नमस्ते", source_language="hi", target_language="sat")

@pytest.mark.asyncio
async def test_translation_client_real_timeout():
    client = TranslationClient(api_key="real_token")
    
    with patch.object(httpx.AsyncClient, "post", side_effect=httpx.TimeoutException("Timed out")):
        with pytest.raises(RuntimeError, match="timed out"):
            await client.translate("नमस्ते", source_language="hi", target_language="sat")

@pytest.mark.asyncio
async def test_translation_client_real_malformed_response():
    client = TranslationClient(api_key="real_token")
    mock_resp = httpx.Response(status_code=200, json={"output_text": "wrong key"})
    
    with patch.object(httpx.AsyncClient, "post", return_value=mock_resp):
        with pytest.raises(ValueError, match="missing 'translated_text' field"):
            await client.translate("नमस्ते", source_language="hi", target_language="sat")

@pytest.mark.asyncio
async def test_bidirectional_santhali_to_hindi(monkeypatch):
    monkeypatch.setattr(settings, "TRANSLATION_PROVIDER", "mock")
    client = TranslationClient(api_key="mock_translation_key")
    result = await client.translate("ᱡᱚᱦᱟᱨ", source_language="sat", target_language="hi")
    
    assert result.translated_text == "नमस्ते"
    assert result.source_language == "sat"
    assert result.target_language == "hi"

@pytest.mark.asyncio
async def test_document_translation_endpoint(monkeypatch):
    from fastapi.testclient import TestClient
    from app.main import app
    
    monkeypatch.setattr(settings, "TRANSLATION_PROVIDER", "mock")
    client = TestClient(app)
    
    # Test multi-line text_content payload
    text = "नमस्ते\nपौधों को बढ़ने के लिए पानी और धूप की आवश्यकता होती है।"
    resp = client.post(
        "/api/v1/translate-document",
        data={
            "text_content": text,
            "source_language": "hi",
            "target_language": "sat"
        }
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "success"
    assert "ᱫᱟᱨᱮ" in data["translated_text"]
    assert data["line_count"] == 2
