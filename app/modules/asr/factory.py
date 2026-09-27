from app.config import settings
from app.modules.asr.base import BaseASRProvider
from app.modules.asr.mock_asr import MockASRProvider
from app.modules.asr.sarvam_asr import SarvamASRProvider

def get_asr_provider() -> BaseASRProvider:
    provider = settings.ASR_PROVIDER.lower()
    if provider == "mock":
        return MockASRProvider(
            api_key=settings.ASR_API_KEY,
            model_name=settings.ASR_MODEL_NAME
        )
    elif provider == "sarvam":
        return SarvamASRProvider(
            api_key=settings.ASR_API_KEY,
            model_name=settings.ASR_MODEL_NAME
        )
    elif provider in ("local", "whisper"):
        from app.modules.asr.local_asr import LocalASRProvider
        return LocalASRProvider(
            model_name=settings.LOCAL_ASR_MODEL_NAME,
            device=settings.LOCAL_ASR_DEVICE
        )
    else:
        raise ValueError(
            f"Unsupported ASR Provider: '{settings.ASR_PROVIDER}'. "
            f"Supported options: ['mock', 'sarvam', 'local', 'whisper']"
        )
