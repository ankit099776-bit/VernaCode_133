import logging
import httpx
from typing import Optional
from app.config import settings

logger = logging.getLogger(__name__)

BUILTIN_VOICE_PACKS = {
    "female_calm": "A female speaker delivers a clear and natural speech in Santali with a calm tone.",
    "male_expressive": "A male speaker delivers a clear and expressive speech in Santali with dynamic intonation.",
    "teacher_hindi": "A warm, authoritative female teacher speaking clear Hindi with encouraging expression.",
    "teacher_male_hindi": "A clear, encouraging male teacher speaking authoritative Hindi with dynamic pitch.",
    "student_santali": "A young student delivering clear, gentle Santali speech in Ol Chiki script."
}

SARVAM_SPEAKER_MAPPING = {
    "female_calm": "ritu",
    "male_expressive": "arvind",
    "teacher_hindi": "ritu",
    "teacher_male_hindi": "arvind",
    "student_santali": "pavitra"
}

class OllamaVoicePackManager:
    """
    Manages pre-configured and AI-generated voice prompts for speech synthesis.
    Integrates with local Ollama instance (http://localhost:11434) to dynamically
    generate rich voice style prompts when requested.
    """
    def __init__(
        self,
        ollama_url: Optional[str] = None,
        ollama_model: Optional[str] = None
    ):
        self.ollama_url = ollama_url or settings.OLLAMA_API_URL
        self.ollama_model = ollama_model or settings.OLLAMA_MODEL

    async def get_voice_description(
        self,
        voice_pack_name: Optional[str] = None,
        target_language: str = "sat"
    ) -> str:
        """
        Retrieves the voice description prompt for the specified voice pack.
        If voice_pack_name is 'ollama_dynamic', queries Ollama API.
        Falls back to default built-in voice pack if Ollama is unreachable.
        """
        pack_key = (voice_pack_name or settings.TTS_VOICE_PACK).lower()

        # Built-in exact key match
        if pack_key in BUILTIN_VOICE_PACKS:
            return BUILTIN_VOICE_PACKS[pack_key]

        # Dynamic Ollama generation
        if pack_key in ("ollama_dynamic", "ollama", "dynamic"):
            dynamic_prompt = await self._generate_ollama_description(target_language)
            if dynamic_prompt:
                return dynamic_prompt

        # Fallback to default
        if target_language in ("hi", "hi-in", "hindi"):
            return BUILTIN_VOICE_PACKS["teacher_hindi"]
        return BUILTIN_VOICE_PACKS["female_calm"]

    async def _generate_ollama_description(self, target_language: str) -> Optional[str]:
        """
        Queries local Ollama API to generate a single-sentence voice style description.
        """
        endpoint = f"{self.ollama_url.rstrip('/')}/api/generate"
        prompt = (
            f"Generate a single precise sentence describing the vocal characteristics for "
            f"speech synthesis in {target_language} language. Keep it under 20 words."
        )

        try:
            async with httpx.AsyncClient(timeout=2.0) as client:
                resp = await client.post(
                    endpoint,
                    json={
                        "model": self.ollama_model,
                        "prompt": prompt,
                        "stream": False
                    }
                )
                if resp.status_code == 200:
                    data = resp.json()
                    desc = data.get("response", "").strip()
                    if desc:
                        logger.info(f"[Ollama Voice Pack] Successfully generated dynamic prompt: '{desc}'")
                        return desc
        except Exception as e:
            logger.warning(f"[Ollama Voice Pack] Could not connect to local Ollama API at {self.ollama_url}: {e}. Using fallback voice pack.")
        
        return None

    def get_sarvam_speaker(self, voice_pack_name: Optional[str] = None) -> str:
        """
        Maps a voice pack name to a valid Sarvam TTS speaker ID.
        """
        pack_key = (voice_pack_name or settings.TTS_VOICE_PACK).lower()
        return SARVAM_SPEAKER_MAPPING.get(pack_key, "ritu")

# Singleton instance
ollama_voice_pack_manager = OllamaVoicePackManager()
