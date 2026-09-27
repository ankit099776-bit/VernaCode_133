import base64
import httpx
import logging
from typing import Optional
from app.modules.tts.base import BaseTTSProvider, TTSResult

logger = logging.getLogger(__name__)

# Map shorthand language codes to Bhashini language tags
BHASHINI_TTS_LANGUAGE_MAP = {
    "sat": "sat",
    "sat-in": "sat",
    "hi": "hi",
    "hi-in": "hi",
    "en": "en",
    "en-in": "en",
}

class BhashiniTTSProvider(BaseTTSProvider):
    """
    Bhashini Dhruva Text-to-Speech (TTS) provider implementation.
    Documentation: https://bhashini.gov.in/
    """
    def __init__(
        self,
        api_key: Optional[str] = None,
        user_id: Optional[str] = None,
        service_id: str = "bhashini/v1/tts/sat",
        voice_id: str = "female",
        api_url: str = "https://dhruva-api.bhashini.gov.in/services/inference/tts",
        timeout_seconds: float = 10.0
    ):
        self.api_key = api_key
        self.user_id = user_id
        self.service_id = service_id or "bhashini/v1/tts/sat"
        self.voice_id = voice_id or "female"
        self.api_url = api_url
        self.timeout_seconds = timeout_seconds

    async def synthesize(self, text: str, target_language: str = "sat", voice_pack: Optional[str] = None, **kwargs) -> TTSResult:
        if not text or not text.strip():
            raise ValueError("Text provided for speech synthesis is empty.")

        if not self.api_key or self.api_key.strip() in ("", "mock", "mock_tts_key"):
            # Fast fallback mode for 0ms latency synthesis when Bhashini API key is mock
            from app.modules.tts.mock_tts import MockTTSProvider
            mock_provider = MockTTSProvider()
            return await mock_provider.synthesize(text, target_language=target_language)

        lang_code = BHASHINI_TTS_LANGUAGE_MAP.get(target_language.lower())
        if not lang_code:
            raise ValueError(f"Unsupported target language code for Bhashini TTS: '{target_language}'. Supported: ['sat', 'hi', 'en']")

        headers = {
            "ulcaApiKey": self.api_key,
            "Authorization": self.api_key,
            "Content-Type": "application/json"
        }
        if self.user_id and self.user_id.strip() not in ("mock_bhashini_user_id", ""):
            headers["userID"] = self.user_id

        payload = {
            "pipelineTasks": [
                {
                    "taskType": "tts",
                    "config": {
                        "language": {
                            "sourceLanguage": lang_code
                        },
                        "serviceId": self.service_id,
                        "gender": self.voice_id
                    }
                }
            ],
            "inputData": {
                "input": [
                    {
                        "source": text.strip()
                    }
                ]
            }
        }

        try:
            async with httpx.AsyncClient(timeout=self.timeout_seconds) as client:
                response = await client.post(self.api_url, json=payload, headers=headers)

                if response.status_code != 200:
                    raise RuntimeError(
                        f"Bhashini TTS API error (Status {response.status_code}): {response.text}"
                    )

                resp_json = response.json()
                
                try:
                    pipeline_resp = resp_json.get("pipelineResponse", [])
                    audio_list = pipeline_resp[0].get("audio", [])
                    audio_b64 = audio_list[0].get("audioContent")
                except (IndexError, AttributeError, KeyError):
                    audio_b64 = None

                if not audio_b64 or not isinstance(audio_b64, str):
                    raise ValueError(
                        f"Malformed Bhashini TTS API response: missing 'audioContent' field. Payload: {resp_json}"
                    )

                try:
                    audio_bytes = base64.b64decode(audio_b64)
                except Exception as exc:
                    raise ValueError(f"Failed to decode base64 audio from Bhashini TTS: {exc}")

                return TTSResult(
                    audio_bytes=audio_bytes,
                    audio_format="wav",
                    provider="bhashini_tts"
                )

        except httpx.TimeoutException:
            raise RuntimeError(f"Bhashini TTS API request to '{self.api_url}' timed out after {self.timeout_seconds}s.")
        except httpx.RequestError as exc:
            raise RuntimeError(f"Bhashini TTS API connection failed: {str(exc)}")
