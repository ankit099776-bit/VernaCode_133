from app.config import settings
from app.modules.translation.base import BaseTranslationProvider
from app.modules.translation.mock_translation import MockTranslationProvider
from app.modules.translation.sarvam_translation import SarvamTranslationProvider

def get_translation_provider() -> BaseTranslationProvider:
    provider = settings.TRANSLATION_PROVIDER.lower()
    if provider == "mock":
        return MockTranslationProvider()
    elif provider == "sarvam":
        api_key = (
            settings.TRANSLATION_API_KEY
            if settings.TRANSLATION_API_KEY not in ("mock_translation_key", "", None)
            else settings.ASR_API_KEY
        )
        return SarvamTranslationProvider(
            api_key=api_key,
            timeout_seconds=settings.TRANSLATION_TIMEOUT_SECONDS
        )
    elif provider in ("local", "nllb"):
        from app.modules.translation.local_translation import LocalTranslationProvider
        return LocalTranslationProvider(
            model_name=settings.LOCAL_TRANSLATION_MODEL_NAME,
            device=settings.LOCAL_TRANSLATION_DEVICE
        )
    else:
        raise ValueError(
            f"Unsupported Translation Provider: '{settings.TRANSLATION_PROVIDER}'. "
            f"Supported options: ['mock', 'sarvam', 'local', 'nllb']"
        )
