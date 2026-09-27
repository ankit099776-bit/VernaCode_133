from abc import ABC, abstractmethod
from typing import Optional
from pydantic import BaseModel, Field

class ASRResult(BaseModel):
    text: str = Field(..., description="Transcribed text string")
    source_language: str = Field("hi", description="Source language code")
    provider: str = Field(..., description="ASR provider identifier")
    confidence: float = Field(1.0, description="Transcription confidence score")

class BaseASRProvider(ABC):
    @abstractmethod
    async def transcribe(
        self,
        audio_bytes: bytes,
        source_language: str = "hi",
        filename: Optional[str] = None,
        content_type: Optional[str] = None
    ) -> ASRResult:
        """
        Transcribe audio bytes into text asynchronously.
        """
        pass
