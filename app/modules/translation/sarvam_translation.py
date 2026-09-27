import httpx
import logging
from typing import Optional
from app.modules.translation.base import BaseTranslationProvider, TranslationResult

logger = logging.getLogger(__name__)

# Map shorthand language codes to Sarvam language tags
SARVAM_LANGUAGE_MAP = {
    "hi": "hi-IN",
    "sat": "sat-IN",
    "en": "en-IN",
    "hi-in": "hi-IN",
    "sat-in": "sat-IN",
    "en-in": "en-IN",
}

class SarvamTranslationProvider(BaseTranslationProvider):
    """
    Sarvam AI Neural Machine Translation provider implementation.
    Documentation: https://docs.sarvam.ai/api-reference/translate
    """
    def __init__(
        self,
        api_key: Optional[str] = None,
        model_name: str = "sarvam-translate:v1",
        api_url: str = "https://api.sarvam.ai/translate",
        timeout_seconds: float = 10.0
    ):
        self.api_key = api_key
        self.model_name = model_name or "sarvam-translate:v1"
        self.api_url = api_url
        self.timeout_seconds = timeout_seconds

    async def translate(
        self,
        text: str,
        source_language: str = "hi",
        target_language: str = "sat"
    ) -> TranslationResult:
        if not text or not text.strip():
            raise ValueError("Text provided for translation is empty.")

        if not self.api_key or self.api_key.strip() in ("", "mock", "mock_translation_key", "mock_asr_key"):
            raise ValueError(
                "Sarvam Translation API key is not configured or is set to a mock value. "
                "Please set a valid TRANSLATION_API_KEY in your environment/.env file."
            )

        src_code = SARVAM_LANGUAGE_MAP.get(source_language.lower())
        if not src_code:
            raise ValueError(f"Unsupported source language code: '{source_language}'. Supported: ['hi', 'sat', 'en']")

        tgt_code = SARVAM_LANGUAGE_MAP.get(target_language.lower())
        if not tgt_code:
            raise ValueError(f"Unsupported target language code: '{target_language}'. Supported: ['hi', 'sat', 'en']")

        headers = {
            "api-subscription-key": self.api_key,
            "Content-Type": "application/json"
        }

        payload = {
            "input": text,
            "source_language_code": src_code,
            "target_language_code": tgt_code,
            "speaker_gender": "Female",
            "mode": "formal",
            "model": self.model_name
        }

        try:
            async with httpx.AsyncClient(timeout=self.timeout_seconds) as client:
                response = await client.post(self.api_url, json=payload, headers=headers)

                if response.status_code != 200:
                    raise RuntimeError(
                        f"Sarvam Translation API error (Status {response.status_code}): {response.text}"
                    )

                resp_json = response.json()
                translated = resp_json.get("translated_text")

                if translated is None or not isinstance(translated, str):
                    raise ValueError(
                        f"Malformed Sarvam Translation API response: missing 'translated_text' field. Payload: {resp_json}"
                    )

                return TranslationResult(
                    translated_text=translated.strip(),
                    source_language=source_language,
                    target_language=target_language,
                    provider="sarvam_translation_provider"
                )

        except httpx.TimeoutException:
            raise RuntimeError(f"Sarvam Translation API request to '{self.api_url}' timed out after {self.timeout_seconds}s.")
        except httpx.RequestError as exc:
            raise RuntimeError(f"Sarvam Translation API connection failed: {str(exc)}")
