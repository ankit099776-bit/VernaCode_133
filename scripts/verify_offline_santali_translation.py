"""
Verification script for 100% offline Hindi to Santali (Ol Chiki) text translation.
"""
import asyncio
import os
import sys

sys.path.insert(0, os.path.abspath("."))

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

from app.modules.translation.local_translation import LocalTranslationProvider

async def main():
    print("=" * 70)
    print("BHASHASETU AI  OFFLINE HINDI TO SANTALI (OL CHIKI) TRANSLATION VERIFICATION")
    print("=" * 70)

    provider = LocalTranslationProvider()

    test_sentences = [
        "नमस्ते!",
        "आप कैसे हैं?",
        "जल ही जीवन है।",
        "यह एक स्कूल है।",
        "भारत हमारा देश है।",
        "किताब खोलो और पढ़ो।",
        "अंकित कुमार आ गए हैं।"
    ]

    print("\nRunning offline translation on sample Hindi sentences:\n")
    for idx, sentence in enumerate(test_sentences, 1):
        result = await provider.translate(sentence, source_language="hi", target_language="sat")
        print(f"[{idx}] Input Hindi:  {sentence}")
        print(f"    Santali (Ol): {result.translated_text}")
        print(f"    Provider:     {result.provider}\n")

    print("=" * 70)
    print(" SUCCESS: Offline Hindi -> Santali text translation executed cleanly!")
    print("=" * 70)

if __name__ == "__main__":
    asyncio.run(main())
