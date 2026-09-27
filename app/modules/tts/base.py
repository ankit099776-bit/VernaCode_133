from abc import ABC, abstractmethod
from pydantic import BaseModel, Field

class TTSResult(BaseModel):
    audio_bytes: bytes = Field(..., description="Raw output audio bytes")
    audio_format: str = Field("wav", description="Audio format (e.g., wav, mp3)")
    provider: str = Field(..., description="TTS provider identifier")

class BaseTTSProvider(ABC):
    @abstractmethod
    async def synthesize(self, text: str, target_language: str = "sat") -> TTSResult:
        """
        Synthesize text into speech audio bytes.
        """
        pass
