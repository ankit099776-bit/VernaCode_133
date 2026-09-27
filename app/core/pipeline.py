from typing import Optional
import io
import base64
import time
from app.config import settings
from app.core.latency import LatencyTracker
from app.core.audio_validator import validate_input_audio, validate_tts_audio
from app.modules.asr.factory import get_asr_provider
from app.modules.translation.client import TranslationClient
from app.modules.tts.factory import get_tts_provider
from app.schemas.voice import VoiceTranslationResponse, LatencyMetrics

class VoiceTranslationPipeline:
    def __init__(self, asr_provider=None, translation_client=None, tts_provider=None):
        self._asr_provider = asr_provider
        self._translation_client = translation_client
        self._tts_provider = tts_provider

    def get_asr(self, mode: str):
        if self._asr_provider:
            return self._asr_provider
        if mode == "mock" or settings.ASR_PROVIDER == "mock":
            from app.modules.asr.mock_asr import MockASRProvider
            return MockASRProvider()
        return get_asr_provider()

    def get_translation(self, mode: str):
        if self._translation_client:
            return self._translation_client
        if mode == "mock" or settings.TRANSLATION_PROVIDER == "mock":
            from app.modules.translation.mock_translation import MockTranslationProvider
            return MockTranslationProvider()
        return TranslationClient()

    def get_tts(self, mode: str, target_language: str = "sat"):
        if self._tts_provider:
            return self._tts_provider
        if mode == "mock" or settings.TTS_PROVIDER == "mock":
            from app.modules.tts.mock_tts import MockTTSProvider
            return MockTTSProvider()
        return get_tts_provider(target_language=target_language)

    async def execute(
        self,
        audio_bytes: bytes,
        source_language: str = "hi",
        target_language: str = "sat",
        filename: Optional[str] = None,
        content_type: Optional[str] = None,
        mode: Optional[str] = None,
        voice_pack: Optional[str] = None,
        on_translation_complete = None
    ) -> VoiceTranslationResponse:
        active_mode = "online"
        if settings.ASR_PROVIDER == "mock" and settings.TRANSLATION_PROVIDER == "mock":
            active_mode = "mock"

        # Validate incoming audio payload
        input_meta = validate_input_audio(audio_bytes, filename=filename, content_type=content_type)

        asr_engine = self.get_asr(active_mode)
        translation_engine = self.get_translation(active_mode)
        tts_engine = self.get_tts(active_mode, target_language=target_language)

        tracker = LatencyTracker()
        tracker.start()

        # Step 1: Speech-to-Text (ASR)
        t0 = time.perf_counter()
        asr_result = await asr_engine.transcribe(
            audio_bytes,
            source_language=source_language,
            filename=filename,
            content_type=content_type
        )
        tracker.record_asr(time.perf_counter() - t0)

        try:
            print(f"[PIPELINE DEBUG] Mode: ONLINE | ASR Provider: '{asr_result.provider}' | Transcript: '{asr_result.text}'", flush=True)
        except Exception:
            pass

        # Validate that ASR produced actual transcribed speech
        if not asr_result.text or not asr_result.text.strip():
            raise ValueError("No speech detected in the audio.")

        # Step 2: Text Translation
        t1 = time.perf_counter()
        trans_result = await translation_engine.translate(
            text=asr_result.text,
            source_language=source_language,
            target_language=target_language
        )
        tracker.record_translation(time.perf_counter() - t1)

        try:
            print(f"[PIPELINE DEBUG] Mode: ONLINE | Translation Provider: '{trans_result.provider}' | Translation: '{trans_result.translated_text}'", flush=True)
        except Exception:
            pass

        if not trans_result.translated_text or not trans_result.translated_text.strip():
            raise ValueError("Translation returned empty text.")

        # Progressive Streaming Callback: Broadcast text translation immediately
        if on_translation_complete:
            try:
                res_cb = on_translation_complete(asr_result.text, trans_result.translated_text, tracker.to_dict(), active_mode)
                if hasattr(res_cb, "__await__"):
                    await res_cb
            except Exception as cb_err:
                print(f"[PIPELINE WARNING] Progressive translation callback error: {cb_err}", flush=True)

        # Step 3: Text-to-Speech (TTS)
        t2 = time.perf_counter()
        tts_kwargs = {"text": trans_result.translated_text, "target_language": target_language}
        if voice_pack is not None:
            tts_kwargs["voice_pack"] = voice_pack
        tts_result = await tts_engine.synthesize(**tts_kwargs)
        tracker.record_tts(time.perf_counter() - t2)

        tracker.stop()

        # Validate TTS Audio payload and extract header metadata
        tts_meta = validate_tts_audio(
            tts_result.audio_bytes,
            provider_name=tts_result.provider,
            target_language=target_language
        )

        # Prepend 250ms lead-in silence so mobile phone speakers warm up before speech starts
        from app.core.audio_validator import add_lead_in_silence
        final_audio_bytes = add_lead_in_silence(tts_result.audio_bytes, silence_ms=250)

        # Encode synthesized audio bytes as base64 for transport
        audio_b64 = base64.b64encode(final_audio_bytes).decode("utf-8")

        return VoiceTranslationResponse(
            status="success",
            source_language=source_language,
            target_language=target_language,
            transcription=asr_result.text,
            translation=trans_result.translated_text,
            audio_format=tts_meta["audio_format"],
            audio_base64=audio_b64,
            latency_metrics=LatencyMetrics(**tracker.to_dict()),
            asr_provider=asr_result.provider,
            tts_provider=tts_result.provider,
            audio_duration=tts_meta["duration_seconds"],
            sample_rate=tts_meta["sample_rate"],
            channels=tts_meta["channels"],
            mime_type=tts_meta["mime_type"],
            byte_length=tts_meta["size_bytes"]
        )
