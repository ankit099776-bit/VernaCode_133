import io
import base64
import httpx
import logging
from typing import Optional
from app.modules.tts.base import BaseTTSProvider, TTSResult

logger = logging.getLogger(__name__)

# Compatible speakers for bulbul:v3
DEFAULT_HINDI_SPEAKER = "ritu"
DEFAULT_MODEL = "bulbul:v3"

class SarvamTTSProvider(BaseTTSProvider):
    """
    Sarvam AI Text-to-Speech (Bulbul:v3) provider implementation for Hindi speech synthesis.
    Documentation: https://docs.sarvam.ai/api-reference/text-to-speech
    """
    def __init__(
        self,
        api_key: Optional[str] = None,
        model_name: str = DEFAULT_MODEL,
        speaker: str = DEFAULT_HINDI_SPEAKER,
        api_url: str = "https://api.sarvam.ai/text-to-speech",
        timeout_seconds: float = 15.0
    ):
        self.api_key = api_key
        self.model_name = model_name or DEFAULT_MODEL
        self.speaker = speaker or DEFAULT_HINDI_SPEAKER
        self.api_url = api_url
        self.timeout_seconds = timeout_seconds

    async def synthesize(
        self,
        text: str,
        target_language: str = "hi",
        speaker: Optional[str] = None,
        voice_pack: Optional[str] = None
    ) -> TTSResult:
        if not text or not text.strip():
            raise ValueError("Text provided for Hindi speech synthesis is empty.")

        if not self.api_key or self.api_key.strip() in ("", "mock", "mock_tts_key", "mock_asr_key"):
            raise ValueError(
                "Sarvam TTS API key is not configured or is set to a mock value. "
                "Please set a valid TRANSLATION_API_KEY / ASR_API_KEY in your environment/.env file."
            )

        headers = {
            "api-subscription-key": self.api_key,
            "Content-Type": "application/json"
        }

        # Determine active speaker using Ollama voice pack manager if voice_pack is supplied
        if voice_pack:
            from app.modules.tts.ollama_voice_pack import ollama_voice_pack_manager
            active_speaker = ollama_voice_pack_manager.get_sarvam_speaker(voice_pack)
        else:
            active_speaker = speaker or self.speaker

        # Language code mapping
        lang_code = "hi-IN" if target_language.lower() in ("hi", "hi-in", "hindi") else "hi-IN"

        # Transliterate Ol Chiki script to Devanagari for TTS synthesis compatibility
        tts_input_text = text.strip()
        from app.modules.translation.ol_chiki_transliteration import transliterate_ol_chiki
        _, dev_text = transliterate_ol_chiki(tts_input_text)
        if dev_text and dev_text.strip():
            tts_input_text = dev_text.strip()

        payload = {
            "inputs": [tts_input_text],
            "target_language_code": lang_code,
            "speaker": active_speaker,
            "model": self.model_name,
            "speech_sample_rate": 16000,
            "enable_preprocessing": True
        }

        try:
            async with httpx.AsyncClient(timeout=self.timeout_seconds) as client:
                response = await client.post(self.api_url, json=payload, headers=headers)

                if response.status_code != 200:
                    raise RuntimeError(
                        f"Sarvam TTS API error (Status {response.status_code}): {response.text}"
                    )

                resp_json = response.json()
                audios = resp_json.get("audios", [])

                if not audios or not isinstance(audios, list):
                    raise ValueError(f"Malformed Sarvam TTS API response: missing 'audios' array. Payload: {resp_json}")

                audio_b64 = audios[0]
                audio_bytes = base64.b64decode(audio_b64)

                return TTSResult(
                    audio_bytes=audio_bytes,
                    audio_format="wav",
                    provider="sarvam_tts"
                )

        except httpx.TimeoutException:
            raise RuntimeError(f"Sarvam TTS API request to '{self.api_url}' timed out after {self.timeout_seconds}s.")
        except httpx.RequestError as exc:
            raise RuntimeError(f"Sarvam TTS API connection failed: {str(exc)}")
