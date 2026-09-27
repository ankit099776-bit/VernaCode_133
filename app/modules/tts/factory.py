from typing import Optional
from app.config import settings
from app.modules.tts.base import BaseTTSProvider
from app.modules.tts.mock_tts import MockTTSProvider
from app.modules.tts.bhashini_tts import BhashiniTTSProvider

def get_tts_provider(target_language: str = "sat", provider_name: Optional[str] = None) -> BaseTTSProvider:
    provider = (provider_name or settings.TTS_PROVIDER).lower()
    
    # If target language is Hindi, use Sarvam TTS unless explicitly requested otherwise
    if target_language.lower() in ("hi", "hi-in", "hindi") and provider != "mock":
        from app.modules.tts.sarvam_tts import SarvamTTSProvider
        return SarvamTTSProvider(api_key=settings.TRANSLATION_API_KEY or settings.ASR_API_KEY)

    if provider == "mock":
        return MockTTSProvider(
            api_key=settings.TTS_API_KEY,
            voice_id=settings.TTS_VOICE_ID
        )
    elif provider in ("ai4bharat", "ai4bharat_local", "indic-tts"):
        raise ValueError("AI4Bharat TTS provider is disabled. Please use 'bhashini', 'sarvam', or 'mock'.")
    elif provider == "bhashini":
        if settings.TTS_API_KEY and settings.TTS_API_KEY.strip() not in ("", "mock", "mock_tts_key"):
            return BhashiniTTSProvider(
                api_key=settings.TTS_API_KEY,
                user_id=settings.TTS_USER_ID,
                service_id=settings.TTS_SERVICE_ID,
                voice_id=settings.TTS_VOICE_ID,
                api_url=settings.TTS_API_URL,
                timeout_seconds=settings.TTS_TIMEOUT_SECONDS
            )
        else:
            # High-speed Sarvam AI TTS using active Sarvam API Key
            from app.modules.tts.sarvam_tts import SarvamTTSProvider
            return SarvamTTSProvider(api_key=settings.TRANSLATION_API_KEY or settings.ASR_API_KEY)
    elif provider == "sarvam":
        from app.modules.tts.sarvam_tts import SarvamTTSProvider
        return SarvamTTSProvider(api_key=settings.TRANSLATION_API_KEY or settings.ASR_API_KEY)
    else:
        # Default fallback to Bhashini / Sarvam TTS
        if settings.TTS_API_KEY and settings.TTS_API_KEY.strip() not in ("", "mock", "mock_tts_key"):
            return BhashiniTTSProvider(
                api_key=settings.TTS_API_KEY,
                user_id=settings.TTS_USER_ID,
                service_id=settings.TTS_SERVICE_ID,
                voice_id=settings.TTS_VOICE_ID,
                api_url=settings.TTS_API_URL,
                timeout_seconds=settings.TTS_TIMEOUT_SECONDS
            )
        else:
            from app.modules.tts.sarvam_tts import SarvamTTSProvider
            return SarvamTTSProvider(api_key=settings.TRANSLATION_API_KEY or settings.ASR_API_KEY)
