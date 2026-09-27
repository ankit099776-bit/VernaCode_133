# AdiBhashaa Santali Dataset Download & Verification Report

**Project**: BhashaSetu — Offline Hindi → Santali (Ol Chiki) Translation System  
**Source Dataset**: `misniitdelhi/AdiBhasha`  
**File**: `training/raw/adibhashaa/santali-train.csv`  

---

## 1. Dataset Verification Summary

| Parameter | Value | Notes |
| :--- | :--- | :--- |
| **Download Status** | **SUCCESS** | Authenticated download completed |
| **File Path** | `training/raw/adibhashaa/santali-train.csv` | Original CSV preserved |
| **File Size** | `7,910,286 bytes (7.54 MB)` | Verified on disk |
| **Total Rows** | `20,000` | Full sentence pairs |
| **Unique Parallel Pairs** | `19,870` | Deduplicated pair count |
| **Source Column** | `English` | Source text column in dataset |
| **Santali Target Column** | `Santali` | Target Santali Ol Chiki text |
| **Empty Rows** | `1` | Missing or blank entries |
| **Exact Duplicate Pairs** | `129` | Identical source & target pairs |
| **Unique Source Sentences** | `18,642` | Distinct source sentences |
| **Unique Santali Sentences** | `19,833` | Distinct Santali sentences |
| **Hindi Devanagari %** | `0.01%` | Devanagari Unicode `U+0900`–`U+097F` |
| **Santali Ol Chiki %** | `100.00%` | Ol Chiki Unicode `U+1C50`–`U+1C7F` |
| **License** | `CC BY-NC-SA 4.0` | Academic/Research Training Permitted |

---

## 2. Santali Script Breakdown

* **Ol Chiki Only**: `19,911` pairs
* **Mixed Script (Ol Chiki + Punctuation/Latin)**: `88` pairs
* **Devanagari Target**: `0` pairs
* **Latin / Roman Target**: `0` pairs
* **Invalid / Empty Target**: `0` pairs

---

## 3. 20 Genuine Sample Parallel Pairs

**1. Source (English)**: Deno 1.0 was released on May 13, 2020.  
**Santali (Ol Chiki)**: `ᱰᱮᱱᱳ ᱑ᱹ᱐ ᱫᱚ ᱑᱓ ᱢᱮ, ᱒᱐᱒᱐ ᱨᱮ ᱪᱷᱟᱹᱲᱮ ᱧᱟᱢ ᱞᱮᱫᱟ ᱾`  

**2. Source (English)**: Denuvo Software Solutions GmbH is a subsidary of Irdeto.  
**Santali (Ol Chiki)**: `ᱰᱮᱱᱩᱵᱷᱳ ᱥᱚᱯᱷᱴᱳᱣᱮᱨ ᱥᱚᱞᱤᱣᱥᱚᱱᱥ ᱡᱤ ᱮᱢ ᱵᱤ ᱮᱭᱤᱪ ᱫᱚ ᱤᱨᱰᱮᱴᱳ ᱨᱮᱱ ᱢᱤᱫᱴᱟᱝ ᱜᱚᱲᱚᱭᱤᱡ ᱠᱟᱱᱟᱭ ᱾`  

**3. Source (English)**: Many books specialise in the details of particular software.  
**Santali (Ol Chiki)**: `ᱟᱭᱢᱟ ᱯᱚᱛᱚᱵ ᱠᱚᱜᱮ ᱵᱤᱥᱟᱹᱥ ᱥᱚᱯᱷᱴᱳᱣᱮᱨ ᱨᱮᱭᱟᱜ ᱵᱚᱨᱱᱚᱱ ᱨᱮ ᱠᱚ ᱜᱟᱹᱠᱷᱩᱲᱟ ᱾`  

**4. Source (English)**: Deterministic algorithm  A deterministic algorithm is a computer science term.  
**Santali (Ol Chiki)**: `ᱰᱤᱴᱟᱨᱢᱤᱱᱤᱥᱴᱤᱠ ᱮᱞᱜᱚᱨᱤᱛᱷᱚᱢ ᱰᱤᱴᱟᱨᱢᱤᱱᱤᱥᱴᱤᱠ ᱮᱞᱜᱚᱨᱤᱛᱷᱚᱢ ᱫᱚ ᱦᱩᱭᱩᱜ ᱠᱟᱱᱟ ᱢᱤᱫᱴᱟᱝ ᱠᱚᱢᱯᱤᱭᱩᱴᱟᱨ ᱥᱟᱸᱬᱮᱥ ᱨᱮᱭᱟᱜ ᱟᱹᱲᱟᱹ ᱾`  

**5. Source (English)**: It comes with a C compiler and an assembler.  
**Santali (Ol Chiki)**: `ᱱᱚᱣᱟ ᱫᱚ ᱢᱤᱫᱴᱟᱝ ᱥᱤ ᱠᱚᱢᱯᱟᱭᱞᱟᱨ ᱟᱨ ᱢᱤᱫᱴᱟᱝ ᱮᱥᱮᱢᱵᱞᱟᱨ ᱥᱟᱶ ᱦᱩᱡᱩᱜᱼᱟ ᱾`  

**6. Source (English)**: It is headquartered in the Hollywood area of Los Angeles, California.  
**Santali (Ol Chiki)**: `ᱱᱚᱣᱟ ᱨᱮᱭᱟᱜ ᱦᱮᱰᱠᱩᱣᱟᱴᱟᱨ ᱫᱚ ᱦᱚᱞᱤᱭᱩᱰ ᱮᱞᱟᱠᱟ ᱨᱮᱭᱟᱜ ᱞᱚᱥ ᱮᱧᱡᱮᱞᱥ, ᱠᱮᱞᱤᱯᱷᱳᱨᱱᱤᱭᱟ ᱨᱮ ᱾`  

**7. Source (English)**: This software automatically generated indices and other body matter.  
**Santali (Ol Chiki)**: `ᱱᱚᱣᱟ ᱥᱚᱯᱷᱴᱳᱣᱮᱨ ᱫᱚ ᱟᱡ ᱟᱡᱛᱮᱜᱮ ᱥᱩᱪᱚᱠ ᱟᱨ ᱮᱴᱟᱜ ᱦᱤᱸᱥ ᱨᱮᱭᱟᱜ ᱥᱟᱛᱟᱠ ᱠᱚᱭ ᱵᱮᱱᱟᱣᱼᱟ ᱾`  

**8. Source (English)**: Typography styles may be applied to text automatically with style sheets.  
**Santali (Ol Chiki)**: `ᱴᱟᱭᱯᱳᱜᱨᱟᱯᱷᱤ ᱥᱳᱭᱞᱤ ᱫᱚ ᱥᱴᱟᱭᱤᱞ ᱥᱤᱴ ᱥᱟᱣ ᱟᱡ ᱟᱡᱛᱮᱜᱮ ᱯᱟᱲᱦᱟᱣ ᱨᱮ ᱵᱮᱵᱚᱦᱟᱨ ᱜᱟᱱᱚᱜᱼᱟ ᱾`  

**9. Source (English)**: Some layout programs include style sheets for images in addition to text.  
**Santali (Ol Chiki)**: `ᱠᱤᱪᱷᱩ ᱞᱮ ᱟᱣᱩᱴ ᱯᱨᱳᱜᱨᱟᱢ ᱨᱮ ᱴᱮᱠᱥᱴ ᱪᱷᱟᱰᱟ ᱦᱚᱸ ᱪᱤᱛᱟᱹᱨ ᱞᱟᱹᱜᱤᱫ ᱥᱴᱟᱭᱤᱞ ᱥᱤᱴ ᱵᱷᱚᱨᱟᱣ ᱛᱟᱦᱮᱱᱟ ᱾`  

**10. Source (English)**: These three teach the basics of page layout design on desktop systems.  
**Santali (Ol Chiki)**: `ᱱᱚᱣᱟ ᱯᱮᱭᱟ ᱰᱮᱥᱠᱴᱚᱯ ᱫᱚ ᱥᱤᱥᱴᱟᱢ ᱨᱮ ᱥᱟᱠᱟᱢ ᱞᱮ ᱟᱣᱩᱴ ᱰᱤᱡᱟᱭᱤᱱ ᱨᱮᱭᱟᱜ ᱢᱩᱲᱩᱫ ᱥᱟᱛᱟᱢ ᱠᱚᱭ ᱥᱮᱬᱟᱭᱟ ᱾`  

**11. Source (English)**: However, some were able to realize truly professional results.  
**Santali (Ol Chiki)**: `ᱡᱟᱦᱟᱜᱮ ᱦᱩᱭᱩᱜ, ᱚᱠᱟᱭ ᱚᱠᱚᱭ ᱪᱚ ᱥᱟᱹᱨᱤᱜᱮ ᱯᱮᱥᱟᱫᱟᱹᱨᱤ ᱚᱨᱡᱚ ᱟᱹᱭᱠᱟᱹᱣ ᱫᱟᱨᱟᱢ ᱨᱮ ᱠᱚ ᱯᱟᱨᱚᱠᱷᱤᱭᱟᱹ ᱟᱠᱟᱱᱟ ᱾`  

**12. Source (English)**: Sequels of the game, Diablo II and III, were made.  
**Santali (Ol Chiki)**: `ᱜᱮᱢ ᱨᱮᱭᱟᱜ ᱥᱤᱠᱩᱣᱟᱞ, ᱰᱟᱭᱟᱵᱞᱳ II ᱟᱨ III ᱵᱮᱱᱟᱣ ᱦᱩᱭ ᱞᱮᱱᱟ ᱾`  

**13. Source (English)**: Diablo IV, which is not yet ready, might come out in 2022.  
**Santali (Ol Chiki)**: `ᱰᱟᱭᱟᱵᱞᱳ IV, ᱡᱟᱦᱟ ᱫᱚ ᱱᱤᱛ ᱦᱚᱸ ᱵᱟᱝ ᱛᱮᱭᱟᱨ ᱟᱠᱟᱱᱟ, ᱒᱐᱒᱒ ᱥᱟᱹᱦᱤᱛ ᱨᱮ ᱚᱰᱚᱠ ᱦᱮᱡ ᱫᱟᱲᱮᱭᱟᱜᱼᱟ ᱾`  

**14. Source (English)**: He wrote 70 books and 293 printed scholarly publications.  
**Santali (Ol Chiki)**: `ᱩᱱᱤ ᱫᱚ ᱗᱐ ᱜᱚᱴᱟᱝ ᱯᱚᱛᱚᱵ ᱟᱨ ᱒᱙᱓ ᱜᱚᱴᱟᱝ ᱪᱷᱟᱯᱟᱣᱟᱠᱟᱱ ᱵᱟᱹᱲᱛᱤ ᱯᱚᱱᱰᱤᱛ ᱟᱱᱟᱜ ᱩᱪᱷᱟᱹᱱᱮ ᱚᱞ ᱟᱠᱟᱫᱟ ᱾`  

**15. Source (English)**: Diabolik Lovers   is a Japanese visual novel franchise by Rejet.  
**Santali (Ol Chiki)**: `ᱰᱟᱭᱟᱵᱚᱞᱤ ᱦᱩᱭᱩᱜ ᱠᱟᱱᱟ ᱨᱮᱡᱮᱴ  ᱨᱮᱭᱟᱜ ᱢᱤᱫᱴᱟᱝ ᱡᱟᱯᱟᱱᱤ ᱵᱷᱤᱡᱩᱣᱟᱞ ᱱᱚᱵᱷᱮᱞ ᱯᱨᱷᱟᱧᱪᱟᱭᱡᱤ ᱾`  

**16. Source (English)**: A3 autoroute  The A3 is a short autoroute in France.  
**Santali (Ol Chiki)**: `ᱮ᱓ ᱚᱴᱳᱨᱩᱴ ᱮ᱓ ᱫᱚ ᱦᱩᱭᱩᱜ ᱠᱟᱱᱟ ᱯᱷᱨᱟᱱᱥ ᱨᱮᱭᱟᱜ ᱢᱤᱫᱴᱟᱝ ᱦᱩᱰᱤᱧ ᱚᱴᱳᱨᱩᱴ ᱾`  

**17. Source (English)**: A55 autoroute  The A55 autoroute is a free motorway in southern France.  
**Santali (Ol Chiki)**: `ᱮ᱕᱕ ᱚᱴᱳᱨᱩᱴ ᱮ᱕᱕ ᱚᱴᱳᱨᱩᱴ ᱫᱚ ᱫᱚᱠᱠᱷᱤᱱ ᱯᱷᱨᱟᱱᱥ ᱨᱮᱭᱟᱜ ᱢᱤᱫᱴᱟᱝ ᱵᱤᱱ ᱜᱚᱱᱚᱝ ᱨᱮᱭᱟᱜ ᱢᱳᱴᱚᱨᱣᱮ ᱾`  

**18. Source (English)**: A96 road  The A96 is a road long from Inverness to Aberdeen in Scotland.  
**Santali (Ol Chiki)**: `ᱮ᱙᱖ ᱰᱟᱦᱟᱨ ᱫᱚ ᱮ᱙᱖ ᱥᱠᱚᱴᱞᱮᱹᱱᱰ ᱨᱮᱭᱟᱜ ᱤᱱᱵᱷᱟᱨᱱᱮᱥ ᱠᱷᱚᱱ ᱮᱹᱵᱟᱨᱰᱤᱱ ᱦᱟᱹᱵᱤ ᱢᱤᱫᱴᱟᱝ ᱡᱮᱸᱞᱮᱧ ᱰᱟᱦᱟᱨ ᱾`  

**19. Source (English)**: ARM  An arm is an upper limb of the body.  
**Santali (Ol Chiki)**: `ᱮ ᱟᱨ ᱮᱢ ᱫᱚ ᱢᱤᱫᱴᱟᱝ ᱛᱤ ᱨᱮᱭᱟᱜ ᱢᱤᱫᱯᱟᱦᱚᱴᱟ ᱫᱚ ᱦᱩᱭᱩᱜ ᱠᱟᱱᱟ ᱦᱚᱲᱢᱚ ᱨᱮᱭᱟᱜ ᱢᱤᱫᱴᱟᱝ ᱪᱮᱛᱟᱱ ᱨᱮᱭᱟᱜ ᱦᱤᱸᱥ ᱾`  

**20. Source (English)**: The town never fully recovered from the loss of their talents.  
**Santali (Ol Chiki)**: `ᱥᱟᱦᱟᱨ ᱫᱚ ᱩᱱᱠᱩᱣᱟᱜ ᱦᱩᱱᱟᱹᱨ ᱨᱮᱭᱟᱜ ᱦᱟᱹᱱ ᱠᱷᱚᱱ ᱯᱩᱨᱟᱹᱯᱩᱨᱤ ᱫᱚ ᱵᱟᱭ ᱚᱣᱟᱨ ᱫᱟᱲᱮ ᱟᱠᱟᱫ ᱠᱚᱣᱟ ᱾`  


---

## 4. Verification Directives Checklist

- [x] Authentic raw download stored at `training/raw/adibhashaa/santali-train.csv`.
- [x] No synthetic fallback or generated text used.
- [x] No model fine-tuning or training performed.
- [x] License saved to `training/reports/adibhashaa_license.md`.
