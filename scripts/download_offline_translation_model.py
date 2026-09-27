"""
Script to download NLLB-200 distilled 600M translation model weights for offline execution.
Saves model files to 'models/nllb-200-distilled-600M'.
"""
import os
import sys

def download_nllb_model():
    model_id = "facebook/nllb-200-distilled-600M"
    target_dir = os.path.join("models", "nllb-200-distilled-600M")

    print("=" * 70)
    print(f"DOWNLOADING NLLB-200 NEURAL TRANSLATION MODEL FOR OFFLINE USE")
    print(f"Model ID:   {model_id}")
    print(f"Target Dir: {target_dir}")
    print("=" * 70)

    try:
        from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
    except ImportError:
        print("Error: 'transformers' library is required. Install via `pip install transformers torch`.")
        sys.exit(1)

    os.makedirs(target_dir, exist_ok=True)

    print("\n1/2 Downloading Tokenizer...")
    tokenizer = AutoTokenizer.from_pretrained(model_id, src_lang="hin_Deva", tgt_lang="sat_Olck")
    tokenizer.save_pretrained(target_dir)

    print("\n2/2 Downloading Model Weights (approx 2.4 GB)...")
    model = AutoModelForSeq2SeqLM.from_pretrained(model_id)
    model.save_pretrained(target_dir)

    print("\n" + "=" * 70)
    print("SUCCESS: NLLB-200 model saved locally for 100% offline neural translation!")
    print(f"Model files saved in: {os.path.abspath(target_dir)}")
    print("=" * 70)

if __name__ == "__main__":
    download_nllb_model()
