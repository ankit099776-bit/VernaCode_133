from typing import Optional
from pydantic import BaseModel, Field

class LatencyMetrics(BaseModel):
    asr_ms: float = Field(..., description="ASR processing latency in milliseconds")
    translation_ms: float = Field(..., description="Translation API latency in milliseconds")
    tts_ms: float = Field(..., description="TTS synthesis latency in milliseconds")
    total_ms: float = Field(..., description="End-to-end pipeline latency in milliseconds")

class VoiceTranslationResponse(BaseModel):
    status: str = Field("success", description="Status of the voice translation pipeline execution")
    source_language: str = Field(..., description="Source language code (e.g., hi)")
    target_language: str = Field(..., description="Target language code (e.g., sat)")
    transcription: str = Field(..., description="Transcribed source text from ASR")
    translation: str = Field(..., description="Translated target text from translation service")
    audio_format: str = Field("wav", description="Format of output speech audio")
    audio_base64: str = Field(..., description="Base64 encoded output speech audio")
    latency_metrics: LatencyMetrics = Field(..., description="Detailed latency metrics breakdown")
    asr_provider: Optional[str] = Field(None, description="ASR provider identifier used")
    tts_provider: Optional[str] = Field(None, description="TTS provider identifier used")
    audio_duration: Optional[float] = Field(None, description="Duration of generated audio in seconds")
    sample_rate: Optional[int] = Field(16000, description="Sample rate of generated audio in Hz")
    channels: Optional[int] = Field(1, description="Number of audio channels")
    mime_type: Optional[str] = Field("audio/wav", description="MIME type of output audio")
    byte_length: Optional[int] = Field(None, description="Byte size of audio data")
