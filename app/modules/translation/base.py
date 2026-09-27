from abc import ABC, abstractmethod
from pydantic import BaseModel, Field

class TranslationResult(BaseModel):
    translated_text: str = Field(..., description="Translated output text")
    source_language: str = Field("hi", description="Source language code")
    target_language: str = Field("sat", description="Target language code")
    provider: str = Field(..., description="Translation service provider identifier")

class BaseTranslationProvider(ABC):
    @abstractmethod
    async def translate(
        self,
        text: str,
        source_language: str = "hi",
        target_language: str = "sat"
    ) -> TranslationResult:
        """
        Translate text from source_language to target_language asynchronously.
        """
        pass

# Alias for backward compatibility
BaseTranslationClient = BaseTranslationProvider
