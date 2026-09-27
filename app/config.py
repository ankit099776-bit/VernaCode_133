from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # Server configuration
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DEBUG: bool = True

    # Translation Engine Configuration
    TRANSLATION_PROVIDER: str = "mock"    # Options: mock, sarvam
    TRANSLATION_API_URL: str = "https://api.sarvam.ai/translate"
    TRANSLATION_API_KEY: str = "mock_translation_key"
    TRANSLATION_TIMEOUT_SECONDS: float = 5.0

    # ASR Provider Configuration
    ASR_PROVIDER: str = "mock"            # Options: mock, sarvam
    ASR_API_KEY: str = "mock_asr_key"
    ASR_MODEL_NAME: str = "saaras:v1"

    # TTS Provider Configuration
    TTS_PROVIDER: str = "mock"            # Options: mock, bhashini, sarvam
    TTS_API_KEY: str = "mock_tts_key"
    TTS_USER_ID: str = "mock_bhashini_user_id"
    TTS_SERVICE_ID: str = "bhashini/v1/tts/sat"
    TTS_VOICE_ID: str = "female"
    TTS_API_URL: str = "https://dhruva-api.bhashini.gov.in/services/inference/tts"
    TTS_TIMEOUT_SECONDS: float = 10.0

    # Bhashini TTS Model Configuration
    TTS_MODEL_NAME: str = "bhashini/v1/tts/sat"
    TTS_DEVICE: str = "auto"              # Options: auto, cuda, cpu

    # Pipeline Mode Configuration
    PIPELINE_MODE: str = "offline"         # Options: online, offline

    # Local Offline ASR Configuration
    LOCAL_ASR_MODEL_NAME: str = "openai/whisper-tiny"
    LOCAL_ASR_DEVICE: str = "auto"         # Options: auto, cuda, cpu

    # Local Offline Translation Configuration
    LOCAL_TRANSLATION_MODEL_NAME: str = "facebook/nllb-200-distilled-600M"
    LOCAL_TRANSLATION_DEVICE: str = "auto" # Options: auto, cuda, cpu

    # Local Ollama AI Configuration
    OLLAMA_API_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "llama3.2"
    TTS_VOICE_PACK: str = "female_calm"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
