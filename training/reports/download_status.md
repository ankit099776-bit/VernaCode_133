# Dataset Download Status Report

**BhashaSetu AI Project — Task 2B Data Acquisition Report**

---

## Download Status by Dataset

| Dataset | Repository URL | Status | HTTP / Error Code | Reason / Access Requirement |
| :--- | :--- | :--- | :--- | :--- |
| **COILD-MT-Corpus** | `https://huggingface.co/datasets/coild-dataset/COILD-MT-Corpus` | **Failed** | `403 Forbidden` | Gated repository on Hugging Face. Authorization token user lacks access permission. |
| **Education_v2** | `https://huggingface.co/datasets/coild-aikosh/Education_v2` | **Failed** | `403 Forbidden` | Gated repository on Hugging Face. Authorization token user lacks access permission. |
| **FLORES-200** | `https://huggingface.co/datasets/openlanguagedata/flores_plus` | **Failed** | `403 Forbidden` | Gated repository on Hugging Face. Authorization token user lacks access permission. |
| **Agriculture Q&A** | `https://huggingface.co/datasets/nharshavardhana/Santali-Ol-Chiki-Agriculture_Question-Answer_Dataset` | **Downloaded** | `200 OK` | Publicly accessible. 506 monolingual Santali Ol Chiki Q&A rows (no Hindi parallel text). |

---

## Authentication & Access Analysis

* **Hugging Face Authentication Present**: `YES` (Cached Hugging Face Hub Token detected in environment).
* **Authorization Status**: **UNAUTHORIZED (HTTP 403 Forbidden)**. The current token user is not in the granted organization list for the gated repositories `coild-dataset/COILD-MT-Corpus`, `coild-aikosh/Education_v2`, and `openlanguagedata/flores_plus`.
* **Action Required**: The user must request dataset access at the respective Hugging Face URLs or provide an authorized `HF_TOKEN`.

---

> [!CAUTION]
> **NO SYNTHETIC FALLBACK DATA WAS GENERATED.** In compliance with Task 2B rules, no synthetic sentences were generated or substituted for the restricted datasets.
