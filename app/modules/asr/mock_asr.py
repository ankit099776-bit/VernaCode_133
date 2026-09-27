import asyncio
from typing import Optional
from app.modules.asr.base import BaseASRProvider, ASRResult

class MockASRProvider(BaseASRProvider):
    def __init__(self, api_key: str = "mock", model_name: str = "mock-whisper"):
        self.api_key = api_key
        self.model_name = model_name

    async def transcribe(
        self,
        audio_bytes: bytes,
        source_language: str = "hi",
        filename: Optional[str] = None,
        content_type: Optional[str] = None
    ) -> ASRResult:
        # Simulate processing delay (15ms)
        await asyncio.sleep(0.015)

        if not audio_bytes or len(audio_bytes) == 0:
            return ASRResult(
                text="",
                source_language=source_language,
                provider="mock_asr",
                confidence=0.0
            )

        import hashlib
        # Dynamic mock transcription based on input audio content/signature
        if b"EMPTY_SPEECH" in audio_bytes or audio_bytes == b"SILENCE":
            mock_text = ""
        elif b"AUDIO_A" in audio_bytes:
            mock_text = "यह पहला परीक्षण ऑडियो है।"
        elif b"AUDIO_B" in audio_bytes:
            mock_text = "यह दूसरा परीक्षण ऑडियो है।"
        else:
            hash_hex = hashlib.sha256(audio_bytes).hexdigest()[:8]
            name_part = f" ({filename})" if filename else ""
            mock_text = f"परीक्षण भाषण ऑडियो {name_part} [{hash_hex}]"

        return ASRResult(
            text=mock_text,
            source_language=source_language,
            provider="mock_asr",
            confidence=0.98
        )
