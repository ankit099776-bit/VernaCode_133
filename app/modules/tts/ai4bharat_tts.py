import io
import asyncio
from typing import Optional
from app.modules.tts.base import BaseTTSProvider, TTSResult

class AI4BharatTTSProvider(BaseTTSProvider):
    def __init__(
        self,
        model_name: str = "ai4bharat/indic-parler-tts",
        device: str = "auto",
        voice_description: str = "A female speaker delivers a clear and natural speech in Santali with a calm tone."
    ):
        self.model_name = model_name
        self.device_setting = device.lower()
        self.voice_description = voice_description

        # Model and tokenizers (lazy loaded)
        self._model = None
        self._tokenizer = None
        self._description_tokenizer = None
        self._resolved_device = None

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
        """
        Lazily load the model and tokenizers on first demand.
        Does NOT execute during FastAPI startup or provider initialization.
        """
        if self._model is not None:
            return

        try:
            import torch
            import soundfile as sf
            from parler_tts import ParlerTTSForConditionalGeneration
            from transformers import AutoTokenizer
        except ImportError as e:
            raise RuntimeError(
                f"Required dependencies for AI4Bharat TTS are missing: {e}. "
                "Ensure torch, transformers, parler-tts, and soundfile are installed."
            ) from e

        self._resolved_device = self._resolve_device()

        # Load tokenizers (official dual-tokenizer pattern) with local_files_only fallback
        try:
            self._tokenizer = AutoTokenizer.from_pretrained(self.model_name, local_files_only=True)
        except Exception:
            self._tokenizer = AutoTokenizer.from_pretrained(self.model_name)

        try:
            self._model = ParlerTTSForConditionalGeneration.from_pretrained(self.model_name, local_files_only=True).to(self._resolved_device)
        except Exception:
            self._model = ParlerTTSForConditionalGeneration.from_pretrained(self.model_name).to(self._resolved_device)

        description_model_name = getattr(
            getattr(self._model.config, "text_encoder", None),
            "_name_or_path",
            self.model_name
        )
        try:
            self._description_tokenizer = AutoTokenizer.from_pretrained(description_model_name, local_files_only=True)
        except Exception:
            try:
                self._description_tokenizer = AutoTokenizer.from_pretrained(description_model_name)
            except Exception:
                self._description_tokenizer = self._tokenizer

    async def synthesize(
        self,
        text: str,
        target_language: str = "sat",
        voice_description: Optional[str] = None,
        voice_pack: Optional[str] = None
    ) -> TTSResult:
        raise NotImplementedError("AI4Bharat TTS provider is disabled in BhashaSetu AI. Please use 'bhashini', 'sarvam', or 'mock'.")

        valid_languages = ["sat", "sat-in", "sat_olck", "santali"]
        if target_language.lower() not in valid_languages:
            raise ValueError(
                f"Unsupported target language code for AI4Bharat TTS: '{target_language}'. "
                f"Supported: {valid_languages}"
            )

        # Resolve voice description from Ollama voice pack manager if voice_pack is specified
        if voice_pack or voice_description:
            from app.modules.tts.ollama_voice_pack import ollama_voice_pack_manager
            active_desc = await ollama_voice_pack_manager.get_voice_description(
                voice_pack_name=voice_pack,
                target_language=target_language
            ) if voice_pack else voice_description
        else:
            active_desc = self.voice_description

        # Run CPU/GPU heavy model loading and synthesis in a thread pool to avoid blocking async event loop
        return await asyncio.to_thread(self._synthesize_sync, text, active_desc)

    def _synthesize_sync(self, text: str, voice_description: Optional[str] = None) -> TTSResult:
        import torch
        import soundfile as sf

        self._load_model()
        desc = voice_description or self.voice_description

        try:
            description_input_ids = self._description_tokenizer(
                desc, return_tensors="pt"
            ).input_ids.to(self._resolved_device)

            prompt_input_ids = self._tokenizer(
                text, return_tensors="pt"
            ).input_ids.to(self._resolved_device)

            with torch.no_grad():
                generation = self._model.generate(
                    input_ids=description_input_ids,
                    prompt_input_ids=prompt_input_ids
                )

            audio_arr = generation.cpu().numpy().squeeze()
            sample_rate = getattr(self._model.config, "sampling_rate", 16000)

            buffer = io.BytesIO()
            sf.write(buffer, audio_arr, sample_rate, format="WAV")
            audio_bytes = buffer.getvalue()

            return TTSResult(
                audio_bytes=audio_bytes,
                audio_format="wav",
                provider="ai4bharat_tts"
            )
        except Exception as e:
            raise RuntimeError(f"AI4Bharat TTS synthesis failed: {str(e)}") from e
