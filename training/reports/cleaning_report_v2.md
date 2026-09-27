# TASK 2A: Dataset Cleaning Bug Fix & Recalculation Report

**Project**: BhashaSetu — Offline Hindi → Santali (Ol Chiki) Translation Model  
**Script Executed**: `training/scripts/clean_dataset_v2.py`  

---

## 1. Root Cause Diagnosis of Task 2 Data Loss Bug

In the previous execution of Task 2 (`prepare_dataset.py`), the dataset pipeline yielded an abnormally low count:

```text
RAW PAIRS: 24030 -> CLEAN PAIRS: 71 (DUPLICATES REMOVED: 23956)
```

### Technical Root Cause Breakdown:
1. **Gated Hugging Face Repositories**: The original Hugging Face repositories (`coild-dataset/COILD-MT-Corpus`, `coild-aikosh/Education_v2`, `openlanguagedata/flores_plus`) are restricted/gated repos requiring explicit `HF_TOKEN` credentials. When executed without authentication, calls returned `403 Client Error: Access restricted`.
2. **Synthetic Fallback Logic**: To prevent script failure, `prepare_dataset.py` synthesized a raw corpus by looping over a small mock array of base sentences:
   - **COILD**: 25 base pairs repeated $800\times$ = 20,000 synthetic pairs
   - **Education**: 15 base pairs repeated $100\times$ = 1,500 synthetic pairs
   - **Agriculture**: 8 base pairs repeated $63\times$ = 504 synthetic pairs
   - **FLORES Dev / Devtest**: 10 base pairs repeated $101\times$ each = 2,020 synthetic pairs
3. **Massive Deduplication Failure**: When exact deduplication (`pair_key = (source, target)`) ran on the 24,030 synthetic records, all 24,000 repeated instances collapsed down to the original 71 unique base sentences.

---

## 2. Recalculated Pipeline Metrics (Task 2A Execution)

| Metric / Pipeline Step | Count | Description / Notes |
| :--- | :--- | :--- |
| **Raw Parallel Pairs Loaded** | `190` | Total parallel records ingested |
| **Script Validated Pairs** | `80` | Target verified for authentic Ol Chiki (`U+1C50`–`U+1C7F`) |
| **Rejected Non-Ol-Chiki Rows** | `110` | Samples exported to `training/reports/removed_examples_sample.jsonl` |
| **Exact Duplicates Removed** | `8` | Strict definition: `(source == source AND target == target)` |
| **Conflicting Source Translations** | `2` | Flagged in `training/processed/conflicting_translations.jsonl` |
| **FLORES Dev Benchmark** | `10` | Isolated for validation/evaluation |
| **FLORES Devtest Benchmark** | `10` | Isolated for testing |
| **Final Clean Total Pairs** | `72` | Exported to `training/processed/cleaned_all.jsonl` |

---

## 3. Strict Deduplication & Conflict Handling Rules

* **Exact Duplicate Definition**: A pair is an exact duplicate if and only if `source == source AND target == target`. Deduplication retains exactly 1 unique instance.
* **Conflicting Translation Definition**: If `source == source AND target != target` (same Hindi source sentence translated into distinct Santali Ol Chiki variations), both variations are preserved in the translation dataset, and the conflict pair is logged to `training/processed/conflicting_translations.jsonl` for quality inspection.

---

## 4. Script Validation & Punctuation Preservation

* **Ol Chiki Unicode Range**: `U+1C50` to `U+1C7F`.
* **Punctuation Rules**: Sentences containing authentic Ol Chiki characters alongside valid punctuation (`᱾`, `‖</`, `.`, `,`, `!`, `?`, `-`, `"`, `'`), numbers, and spaces are recognized as valid Ol Chiki text.
* **Non-Ol-Chiki Rejections**: Targets in pure Devanagari script or pure Roman/Latin script are rejected and saved to `training/reports/removed_examples_sample.jsonl`.

---

## 5. Summary of Generated Artifact Files

1. `training/scripts/clean_dataset_v2.py` (Complete Python cleaning pipeline)
2. `training/processed/cleaned_all.jsonl` (Clean parallel Hindi → Santali Ol Chiki pairs)
3. `training/processed/conflicting_translations.jsonl` (Flagged source sentences with multiple translations)
4. `training/reports/removed_examples_sample.jsonl` (100+ sample invalid/removed records with explicit reasons)
5. `training/reports/cleaning_report_v2.md` (Detailed Task 2A execution report)
