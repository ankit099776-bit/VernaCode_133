import io
import os
import tempfile
import asyncio
from typing import Optional
from app.modules.asr.base import BaseASRProvider, ASRResult

class LocalASRProvider(BaseASRProvider):
    """
    Local Offline Hindi Speech-to-Text Provider using local Whisper / faster-whisper.
    Operates 100% offline without cloud API requests.
    """
    def __init__(
        self,
        model_name: str = "openai/whisper-tiny",
        device: str = "auto"
    ):
        self.model_name = model_name
        self.device_setting = device.lower()
        self.provider_name = "local_whisper_asr"

        self._model = None
        self._processor = None
        self._pipe = None
        self._faster_model = None

    def _resolve_device(self) -> str:
        if self.device_setting == "cuda":
            return "cuda"
        elif self.device_setting == "cpu":
            return "cpu"
        else: # auto
            try:
                import torch
                return "cuda" if torch.cuda.is_available() else "cpu"
            except ImportError:
                return "cpu"

    def _load_model(self):
        """Lazily load local ASR model on first demand."""
        if self._pipe is not None or self._faster_model is not None:
            return

        resolved_device = self._resolve_device()

        # Try loading faster-whisper first for optimized CTranslate2 CPU performance
        try:
            from faster_whisper import WhisperModel
            # Map HuggingFace model_id to faster-whisper size if needed
            model_size = "tiny" if "tiny" in self.model_name else ("base" if "base" in self.model_name else "small")
            print(f"[LOCAL ASR] Loading faster-whisper '{model_size}' model on {resolved_device}...", flush=True)
            self._faster_model = WhisperModel(model_size, device=resolved_device, compute_type="int8")
            print(f"[LOCAL ASR] faster-whisper '{model_size}' loaded successfully!", flush=True)
            return
        except Exception as e:
            print(f"[LOCAL ASR] faster-whisper initialization skipped/failed ({e}). Falling back to Transformers pipeline...", flush=True)

        # Fallback to PyTorch Transformers speech-recognition pipeline
        try:
            import torch
            from transformers import pipeline
            device_id = 0 if resolved_device == "cuda" else -1
            print(f"[LOCAL ASR] Loading Transformers Whisper pipeline '{self.model_name}' on device {device_id}...", flush=True)
            self._pipe = pipeline(
                "speech-recognition",
                model=self.model_name,
                device=device_id
            )
            print(f"[LOCAL ASR] Transformers Whisper pipeline loaded successfully!", flush=True)
        except Exception as ex:
            raise RuntimeError(f"Failed to load local offline Whisper ASR model: {ex}") from ex

    async def transcribe(
        self,
        audio_bytes: bytes,
        source_language: str = "hi",
        filename: Optional[str] = None,
        content_type: Optional[str] = None
    ) -> ASRResult:
        if not audio_bytes or len(audio_bytes) == 0:
            raise ValueError("Audio payload provided to Local ASR is empty.")

        # Run CPU/GPU heavy model loading and transcription in a thread pool
        return await asyncio.to_thread(self._transcribe_sync, audio_bytes, source_language, filename)

    def _transcribe_sync(self, audio_bytes: bytes, source_language: str, filename: Optional[str]) -> ASRResult:
        self._load_model()

        # Create temporary audio file for model consumption
        ext = ".webm" if audio_bytes.startswith(b"\x1aE\xdf\xa3") else ".wav"
        if filename and "." in filename:
            ext = "." + filename.rsplit(".", 1)[-1].lower()

        with tempfile.NamedTemporaryFile(suffix=ext, delete=False) as tmp:
            tmp.write(audio_bytes)
            tmp_path = tmp.name

        try:
            if self._faster_model is not None:
                segments, info = self._faster_model.transcribe(tmp_path, language="hi")
                transcript = " ".join([segment.text for segment in segments]).strip()
            elif self._pipe is not None:
                result = self._pipe(tmp_path, generate_kwargs={"language": "hindi", "task": "transcribe"})
                transcript = result.get("text", "").strip() if isinstance(result, dict) else str(result).strip()
            else:
                raise RuntimeError("Local ASR model is not initialized.")

            return ASRResult(
                text=transcript,
                source_language=source_language,
                provider=self.provider_name,
                confidence=0.95
            )
        finally:
            if os.path.exists(tmp_path):
                try:
                    os.remove(tmp_path)
                except Exception:
                    pass
