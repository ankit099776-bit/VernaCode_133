import os
import sys
import time
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

sentences = [
    "बच्चों, आज हम गिनती सीखेंगे।",
    "यह एक पेड़ है।",
    "सूरज पूर्व दिशा से निकलता है।",
    "पानी हमारे जीवन के लिए बहुत महत्वपूर्ण है।",
    "दो और तीन को जोड़ने पर पाँच होते हैं।"
]

def eval_model_candidate(model_id: str, src_lang: str, tgt_lang: str):
    print("\n" + "=" * 80)
    print(f"TESTING CANDIDATE MODEL: '{model_id}'")
    print(f"Source Code: {src_lang} | Target Code: {tgt_lang}")
    print("=" * 80)

    try:
        from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
        print(f"Loading tokenizer & model weights for '{model_id}'...")
        t_load0 = time.perf_counter()
        
        tokenizer = AutoTokenizer.from_pretrained(model_id, trust_remote_code=True)
        model = AutoModelForSeq2SeqLM.from_pretrained(model_id, trust_remote_code=True)
        model.eval()
        
        t_load = time.perf_counter() - t_load0
        print(f"Loaded successfully in {t_load:.2f}s!")

        results = []
        for idx, sentence in enumerate(sentences, 1):
            t0 = time.perf_counter()
            if "madlad" in model_id.lower():
                # MADLAD400 format: prompt prefix like '<2sat> '
                prompt = f"<2sat> {sentence}"
                inputs = tokenizer(prompt, return_tensors="pt")
                with torch.no_grad():
                    outputs = model.generate(**inputs, max_new_tokens=100)
                translated = tokenizer.decode(outputs[0], skip_special_tokens=True)
            elif "indictrans2" in model_id.lower():
                # IndicTrans2 format
                inputs = tokenizer(sentence, return_tensors="pt")
                forced_id = getattr(tokenizer, "lang_code_to_id", {}).get(tgt_lang)
                with torch.no_grad():
                    if forced_id:
                        outputs = model.generate(**inputs, forced_bos_token_id=forced_id, max_new_tokens=100)
                    else:
                        outputs = model.generate(**inputs, max_new_tokens=100)
                translated = tokenizer.batch_decode(outputs, skip_special_tokens=True)[0]
            elif "nllb" in model_id.lower():
                tokenizer.src_lang = src_lang
                inputs = tokenizer(sentence, return_tensors="pt")
                forced_id = tokenizer.lang_code_to_id.get(tgt_lang)
                with torch.no_grad():
                    outputs = model.generate(**inputs, forced_bos_token_id=forced_id, max_new_tokens=100)
                translated = tokenizer.batch_decode(outputs, skip_special_tokens=True)[0]
            else:
                inputs = tokenizer(sentence, return_tensors="pt")
                with torch.no_grad():
                    outputs = model.generate(**inputs, max_new_tokens=100)
                translated = tokenizer.batch_decode(outputs, skip_special_tokens=True)[0]

            t_lat = (time.perf_counter() - t0) * 1000
            has_ol_chiki = check_ol_chiki(translated)
            
            print(f"\n  [Sentence {idx}]: '{sentence}'")
            print(f"    Raw Output:       '{translated}'")
            print(f"    Contains Ol Chiki: {has_ol_chiki}")
            print(f"    Latency:          {t_lat:.2f} ms")

            results.append({
                "input": sentence,
                "output": translated,
                "has_ol_chiki": has_ol_chiki,
                "latency_ms": t_lat
            })
        return True, results
    except Exception as e:
        print(f"❌ Candidate '{model_id}' Failed with error: {e}")
        return False, str(e)

def main():
    candidates = [
        ("ai4bharat/indictrans2-indic-indic-dist-320M", "hin_Deva", "sat_Olck"),
        ("hari31416/indictrans2-indic-indic-dist-320M-ONNX-int8", "hin_Deva", "sat_Olck"),
        ("facebook/nllb-200-1.3B", "hin_Deva", "sat_Olck"),
        ("jbochi/madlad400-3b-mt", "hi", "sat")
    ]

    for model_id, src, tgt in candidates:
        eval_model_candidate(model_id, src, tgt)

if __name__ == "__main__":
    main()
