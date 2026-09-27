import os
import sys
import time
import json
import urllib.request
import torch

sys.path.insert(0, os.path.abspath("."))

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

def check_ol_chiki(text: str) -> bool:
    """Check if string contains Ol Chiki script characters (Unicode U+1C50 to U+1C7F)."""
    return any(0x1C50 <= ord(char) <= 0x1C7F for char in text)

def search_hf_models(query: str):
    """Search HuggingFace Hub for models matching a query."""
    url = f"https://huggingface.co/api/models?search={query}&limit=20"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Python/3.12"})
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return [m["id"] for m in data]
    except Exception as e:
        print(f"Error searching HuggingFace for '{query}': {e}")
        return []

def test_indictrans2():
    """Test AI4Bharat IndicTrans2 model if available/downloadable."""
    print("\n" + "=" * 80)
    print("TESTING CANDIDATE: AI4Bharat IndicTrans2 (indictrans2-indic-indic-1B / dist-320M)")
    print("=" * 80)
    
    # Check model names
    model_name = "ai4bharat/indictrans2-indic-indic-1B"
    print(f"Attempting to test '{model_name}'...")

    try:
        from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
        
        tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)
        model = AutoModelForSeq2SeqLM.from_pretrained(model_name, trust_remote_code=True)

        sentences = [
            "बच्चों, आज हम गिनती सीखेंगे।",
            "यह एक पेड़ है।",
            "सूरज पूर्व दिशा से निकलता है।",
            "पानी हमारे जीवन के लिए बहुत महत्वपूर्ण है।",
            "दो और तीन को जोड़ने पर पाँच होते हैं।"
        ]

        for idx, sentence in enumerate(sentences, 1):
            t0 = time.perf_counter()
            # IndicTrans2 uses language tags like hin_Deva and sat_Olck
            inputs = tokenizer(sentence, src_lang="hin_Deva", return_tensors="pt")
            generated_tokens = model.generate(**inputs, forced_bos_token_id=tokenizer.lang_code_to_id.get("sat_Olck"))
            translated_text = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)[0]
            t_latency = (time.perf_counter() - t0) * 1000

            has_ol_chiki = check_ol_chiki(translated_text)
            print(f"\nSentence {idx}: {sentence}")
            print(f"  Result Text:    '{translated_text}'")
            print(f"  Contains Ol Chiki: {has_ol_chiki}")
            print(f"  Latency:        {t_latency:.2f} ms")

    except Exception as e:
        print(f"IndicTrans2 testing error / limitation: {e}")

def main():
    print("=" * 80)
    print("OFFLINE HINDI -> SANTALI NMT CANDIDATE INVESTIGATION")
    print("=" * 80)

    print("\n1. Searching HuggingFace Hub for Santali / Ol Chiki models...")
    santali_models = search_hf_models("santali")
    ol_chiki_models = search_hf_models("sat_Olck")
    indictrans_models = search_hf_models("indictrans")
    madlad_models = search_hf_models("madlad")

    print(f"  Found 'santali' models:   {santali_models}")
    print(f"  Found 'sat_Olck' models:  {ol_chiki_models}")
    print(f"  Found 'indictrans' models: {indictrans_models[:5]}")
    print(f"  Found 'madlad' models:    {madlad_models[:5]}")

    test_indictrans2()

if __name__ == "__main__":
    main()
