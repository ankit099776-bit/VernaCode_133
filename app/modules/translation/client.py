import logging
from typing import Optional
from app.modules.translation.base import BaseTranslationClient, BaseTranslationProvider, TranslationResult
from app.modules.translation.sarvam_translation import SarvamTranslationProvider
from app.modules.translation.mock_translation import MockTranslationProvider
from app.modules.translation.factory import get_translation_provider

logger = logging.getLogger(__name__)

class TranslationClient(BaseTranslationClient):
    """
    Facade Translation Client used by Voice Pipeline and Image/OCR Service.
    Delegates to configured BaseTranslationProvider (Sarvam, Mock, etc.).
    """
    def __init__(
        self,
        provider: Optional[BaseTranslationProvider] = None,
        api_url: Optional[str] = None,
        api_key: Optional[str] = None,
        timeout: Optional[float] = None
    ):
        self._explicit_provider = provider
        if provider:
            self.provider = provider
        elif api_url or (api_key and api_key not in ("mock_translation_key", "mock")):
            self.provider = SarvamTranslationProvider(
                api_key=api_key,
                api_url=api_url or "https://api.sarvam.ai/translate",
                timeout_seconds=timeout or 10.0
            )
        else:
            self.provider = None

    async def translate(
        self,
        text: str,
        source_language: str = "hi",
        target_language: str = "sat"
    ) -> TranslationResult:
        active_provider = self.provider or get_translation_provider()
        return await active_provider.translate(
            text=text,
            source_language=source_language,
            target_language=target_language
        )
