import os
import sys
import json
import urllib.request

sys.path.insert(0, os.path.abspath("."))

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

def check_huggingface_repo(repo_id: str):
    """Inspect HuggingFace model metadata and check if it is gated or public."""
    url = f"https://huggingface.co/api/models/{repo_id}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Python/3.12"})
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            gated = data.get("gated", False)
            pipeline_tag = data.get("pipeline_tag", "unknown")
            tags = data.get("tags", [])
            downloads = data.get("downloads", 0)
            return {
                "exists": True,
                "gated": gated,
                "pipeline_tag": pipeline_tag,
                "downloads": downloads,
                "tags": tags[:10]
            }
    except Exception as e:
        return {"exists": False, "error": str(e)}

def main():
    print("=" * 80)
    print("EMPIRICAL AUDIT OF OFFLINE TRANSLATION CANDIDATES FOR HINDI -> SANTALI")
    print("=" * 80)

    candidates = [
        "ai4bharat/indictrans2-indic-indic-1B",
        "ai4bharat/indictrans2-indic-indic-dist-320M",
        "hari31416/indictrans2-indic-indic-dist-320M-ONNX-int8",
        "facebook/nllb-200-distilled-600M",
        "facebook/nllb-200-1.3B",
        "google/madlad400-3b-mt",
        "jbochi/madlad400-3b-mt",
        "aiswarya9302/indictrans2-en-santali",
        "DipsankarSinha/Santali_ASR-Model_KIIT2024_v1"
    ]

    for model_id in candidates:
        info = check_huggingface_repo(model_id)
        print(f"\nModel: {model_id}")
        if info.get("exists"):
            print(f"  - Public Access:    {'NO (Gated / Protected)' if info['gated'] else 'YES (Public Download)'}")
            print(f"  - Downloads:        {info['downloads']}")
            print(f"  - Pipeline Tag:     {info['pipeline_tag']}")
        else:
            print(f"  - Status:           NOT FOUND / ERROR: {info.get('error')}")

if __name__ == "__main__":
    main()
