import os
import asyncio
from typing import Optional
from app.modules.translation.base import BaseTranslationProvider, TranslationResult

# Map shorthand language codes to NLLB-200 language tokens
NLLB_LANGUAGE_MAP = {
    "hi": "hin_Deva",
    "hi-in": "hin_Deva",
    "sat": "sat_Olck",
    "sat-in": "sat_Olck",
    "sat_olck": "sat_Olck",
    "sat_deva": "sat_Deva",
    "en": "eng_Latn",
    "en-in": "eng_Latn"
}

class LocalTranslationProvider(BaseTranslationProvider):
    """
    Local Offline Machine Translation Provider using NLLB-200 (facebook/nllb-200-distilled-600M).
    Translates Hindi (hin_Deva) to Santali (sat_Olck / sat_Deva) 100% offline without cloud API calls.
    """
    def __init__(
        self,
        model_name: str = "facebook/nllb-200-distilled-600M",
        device: str = "auto"
    ):
        self.model_name = model_name
        self.device_setting = device.lower()
        self.provider_name = "local_nllb_translation"

        self._tokenizer = None
        self._model = None
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
        """Lazily load NLLB-200 model and tokenizer on first demand."""
        if self._model is not None:
            return

        # Disable HF symlinks warning on Windows
        os.environ["HF_HUB_DISABLE_SYMLINKS_WARNING"] = "1"

        try:
            import torch
            from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

            self._resolved_device = self._resolve_device()
            print(f"[LOCAL TRANSLATION] Loading NLLB-200 model '{self.model_name}' on {self._resolved_device}...", flush=True)

            self._tokenizer = AutoTokenizer.from_pretrained(self.model_name, src_lang="hin_Deva", tgt_lang="sat_Olck")
            self._model = AutoModelForSeq2SeqLM.from_pretrained(self.model_name).to(self._resolved_device)

            print(f"[LOCAL TRANSLATION] NLLB-200 model loaded successfully!", flush=True)
        except Exception as e:
            raise RuntimeError(f"Failed to load local offline NLLB-200 translation model: {e}") from e

    async def translate(
        self,
        text: str,
        source_language: str = "hi",
        target_language: str = "sat"
    ) -> TranslationResult:
        if not text or not text.strip():
            raise ValueError("Text provided for local translation is empty.")

        # Run CPU/GPU heavy model loading and translation in a thread pool
        return await asyncio.to_thread(self._translate_sync, text, source_language, target_language)

    def _translate_sync(self, text: str, source_language: str, target_language: str) -> TranslationResult:
        try:
            self._load_model()

            src_token = NLLB_LANGUAGE_MAP.get(source_language.lower(), "hin_Deva")
            tgt_token = NLLB_LANGUAGE_MAP.get(target_language.lower(), "sat_Olck")

            # Set source language on tokenizer
            self._tokenizer.src_lang = src_token
            inputs = self._tokenizer(text, return_tensors="pt").to(self._resolved_device)

            # Target language token id for forced BOS
            tgt_lang_id = self._tokenizer.convert_tokens_to_ids(tgt_token)

            import torch
            with torch.no_grad():
                translated_tokens = self._model.generate(
                    **inputs,
                    forced_bos_token_id=tgt_lang_id,
                    max_length=256
                )

            translated_text = self._tokenizer.batch_decode(
                translated_tokens,
                skip_special_tokens=True
            )[0].strip()

            return TranslationResult(
                translated_text=translated_text,
                source_language=source_language,
                target_language=target_language,
                provider=self.provider_name
            )
        except Exception as e:
            # Fallback to dictionary / transliteration fallback on model load/inference failure
            from app.modules.translation.santali_dictionary import SantaliDictionaryTranslator
            dict_translator = SantaliDictionaryTranslator()
            fallback_text = dict_translator.translate(text)
            return TranslationResult(
                translated_text=fallback_text,
                source_language=source_language,
                target_language=target_language,
                provider=f"{self.provider_name}-fallback"
            )
