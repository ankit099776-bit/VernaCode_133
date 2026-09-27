# Hindi → Santali (Ol Chiki) Dataset Cleaning & Preparation Report

**BhashaSetu AI Project — Task 2 Data Pipeline Execution**

---

## 1. Data Cleaning & Pipeline Metrics

| Metric Category | Count / Value |
| :--- | :--- |
| **Raw Input Pairs Loaded** | `24,030` |
| **Script Validated Pairs** | `24,027` |
| **Non-Ol-Chiki Examples Rejected** | `3` |
| **Exact Duplicates Removed** | `23,956` |
| **Conflicting Source Translations** | `1` |
| **FLORES Overlaps Removed from Training** | `0` |
| **Suspicious Pairs Flagged** | `0` |
| **Final Clean Total Pairs** | `71` |

---

## 2. Dataset Split Breakdown

* **Train Set (`training/processed/train.jsonl`)**: **46 pairs** (90% non-FLORES data)
* **Validation Set (`training/processed/validation.jsonl`)**: **15 pairs** (10% non-FLORES data + FLORES dev benchmark)
* **Test Set (`training/processed/test.jsonl`)**: **10 pairs** (Unseen FLORES devtest benchmark)

---

## 3. Training Set Source Distribution

| Dataset Source Label | Number of Examples | Percentage of Training Set |
| :--- | :--- | :--- |
| **COILD (`coild`)** | `23` | `50.0%` |
| **Education (`education`)** | `16` | `34.8%` |
| **Agriculture (`agriculture`)** | `7` | `15.2%` |

---

## 4. Length Statistics

* **Hindi Source Sentence Length (chars)**:
  * Minimum: `8`
  * Maximum: `52`
  * Average: `30.3`
* **Santali Target Sentence Length (chars)**:
  * Minimum: `8`
  * Maximum: `51`
  * Average: `33.21`

---

## 5. Artifact Files Generated

1. `training/processed/train.jsonl` & `train_with_metadata.jsonl`
2. `training/processed/validation.jsonl` & `validation_with_metadata.jsonl`
3. `training/processed/test.jsonl` & `test_with_metadata.jsonl`
4. `training/processed/flagged_script_rows.jsonl`
5. `training/processed/conflicting_translations.jsonl`
6. `training/processed/suspicious_pairs.jsonl`
7. `training/reports/cleaning_report.md`
8. `training/reports/dataset_statistics.json`
