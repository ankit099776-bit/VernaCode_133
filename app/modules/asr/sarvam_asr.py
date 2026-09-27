import httpx
import logging
from typing import Optional
from app.modules.asr.base import BaseASRProvider, ASRResult

logger = logging.getLogger(__name__)

# Map shorthand language codes to Sarvam language codes
LANGUAGE_MAP = {
    "hi": "hi-IN",
    "sat": "sat-IN",
    "en": "en-IN",
}

class SarvamASRProvider(BaseASRProvider):
    """
    Sarvam AI Speech-to-Text (Saaras) provider implementation.
    Documentation: https://docs.sarvam.ai/api-reference/speech-to-text
    """
    def __init__(
        self,
        api_key: Optional[str] = None,
        model_name: str = "saaras:v1",
        api_url: str = "https://api.sarvam.ai/speech-to-text",
        timeout_seconds: float = 10.0
    ):
        self.api_key = api_key
        self.model_name = model_name or "saaras:v1"
        self.api_url = api_url
        self.timeout_seconds = timeout_seconds

    async def transcribe(
        self,
        audio_bytes: bytes,
        source_language: str = "hi",
        filename: Optional[str] = None,
        content_type: Optional[str] = None
    ) -> ASRResult:
        if not self.api_key or self.api_key.strip() in ("", "mock", "mock_asr_key"):
            raise ValueError(
                "Sarvam ASR API key is not configured or is set to a mock value. "
                "Please set a valid ASR_API_KEY in your environment/.env file."
            )

        if not audio_bytes:
            raise ValueError("Audio payload provided to Sarvam ASR is empty.")

        # Map language code if shorthand is passed (e.g., 'hi' -> 'hi-IN')
        lang_code = LANGUAGE_MAP.get(source_language.lower(), source_language)

        headers = {
            "api-subscription-key": self.api_key
        }

        # Determine appropriate filename and MIME content type based on binary header inspection
        if audio_bytes.startswith(b"\x1aE\xdf\xa3"):
            actual_filename = filename if (filename and filename.endswith('.webm')) else "audio.webm"
            actual_mime = content_type or "audio/webm"
        elif audio_bytes.startswith(b"RIFF") and b"WAVE" in audio_bytes[:16]:
            actual_filename = filename if (filename and filename.endswith('.wav')) else "audio.wav"
            actual_mime = content_type or "audio/wav"
        else:
            actual_filename = filename or "audio.webm"
            actual_mime = content_type or "audio/webm"

        # Sarvam expects multipart/form-data with 'file', 'model', and 'language_code'
        files = {
            "file": (actual_filename, audio_bytes, actual_mime)
        }
        data = {
            "model": self.model_name,
            "language_code": lang_code
        }

        try:
            async with httpx.AsyncClient(timeout=self.timeout_seconds) as client:
                response = await client.post(
                    self.api_url,
                    headers=headers,
                    files=files,
                    data=data
                )
                
                if response.status_code != 200:
                    raise RuntimeError(
                        f"Sarvam ASR API error (Status {response.status_code}): {response.text}"
                    )
                
                resp_json = response.json()
                transcript = resp_json.get("transcript")
                
                if transcript is None or not isinstance(transcript, str):
                    raise ValueError(f"Malformed Sarvam ASR response: missing 'transcript' field. Payload: {resp_json}")
                
                detected_lang = resp_json.get("language_code") or lang_code
                
                return ASRResult(
                    text=transcript.strip(),
                    source_language=detected_lang,
                    provider="sarvam_asr",
                    confidence=1.0
                )

        except httpx.TimeoutException:
            raise RuntimeError(f"Sarvam ASR API request to '{self.api_url}' timed out after {self.timeout_seconds}s.")
        except httpx.RequestError as exc:
            raise RuntimeError(f"Sarvam ASR API connection failed: {str(exc)}")
