---
license: cc-by-nc-sa-4.0
language: 
  - hi
  - bhb
  - gon
  - unv
  - sat
tags:
  - speech
  - text
  - translation
---

# AdiBhashaa

<h3 align="center">A Community-Curated Benchmark for Machine Translation into Indian Tribal Languages</h3>

<p align="center">
  <a href="mailto:eez228470@iitd.ac.in">Pooja Singh</a>¹ · <a href="mailto:ksandeep@iitd.ac.in">Sandeep Kumar</a>¹
</p>

<p align="center">
  ¹Indian Institute of Technology Delhi
</p>

<div align="center">
  <a href="https://arxiv.org/abs/2512.04765"><img src="https://img.shields.io/badge/Paper-arXiv-red?style=flat" alt="ArXiv"></a>
  <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/"><img src="https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg" alt="License"></a>
</div>

---

## Dataset summary

Despite substantial advances in multilingual NLP, the languages of India's tribal (Janjatiya/Adivasi) communities are almost entirely absent from public MT benchmarks and foundation models. This digital exclusion exacerbates existing inequities in education, governance, and digital participation. 

**AdiBhashaa** is a community-driven, documentation-oriented Machine Translation benchmark for four under-represented Indian tribal languages. The release contains an 80,000 sentence parallel corpus (Hindi–Tribal) created through a participatory, human-in-the-loop workflow with native speakers.

| | Benchmark Details |
| :--- | :--- |
| **Total Scale** | 80,000 parallel sentences (~20,000 per language) |
| **Language Coverage** | Bhili, Gondi, Mundari, and Santali |
| **Source Language** | Hindi |
| **Domains Covered** | Education, Governance, Healthcare, News, Social |

### Language Representation

| | Bhili | Gondi | Mundari | Santali |
| :--- | :--- | :--- | :--- | :--- |
| **ISO 639-3** | `bhb` | `gon` | `unv` | `sat` |
| **Family** | Indo-Aryan | Dravidian | Austroasiatic (Munda) | Austroasiatic (Munda) |
| **Speakers (2011)** | ~10.4 M | ~3.0 M | ~1.1 M | ~7.6 M |
| **Script in this release** | Devanagari | Devanagari | Devanagari | Ol Chiki |

## How to load

The `datasets` library enables you to load and preprocess the curated dataset directly in Python. *(Ensure you have an active HuggingFace access token).*

```python
from datasets import load_dataset

# Load the entire benchmark
dataset = load_dataset("misniitdelhi/AdiBhasha")

# Alternatively, stream the dataset without downloading
dataset_stream = load_dataset("misniitdelhi/AdiBhasha", streaming=True)
print(next(iter(dataset_stream)))
```

## Dataset structure

### Repository layout
```text
data/
├── bhili/
│   └── bhili-train.csv     (~20,565 pairs)
├── gondi/
│   └── gondi-train.csv     (~20,001 pairs)
├── mundari/
│   └── mundari-train.csv   (~20,150 pairs)
├── santali/
│   └── santali-train.csv   (~20,001 pairs)
└── test.csv                (Unified test set)
```

## Dataset creation (Participatory Workflow)

To ensure linguistic quality, cultural fidelity, and community ownership, we adopted a participatory, human-in-the-loop workflow rather than relying solely on crowdsourcing or model-generated text.

1.  **Source curation:** Researchers compile Hindi sentences from public, educational, and civic sources, prioritizing cultural appropriateness and downstream utility.
2.  **Community translation:** Native-speaking translators (experienced teachers or language activists) render the sentences into their languages with an emphasis on semantic adequacy and naturalness. 
3.  **Independent validation:** A separate group of validators (early-career researchers from the same communities) reviews each sentence pair for adequacy, fluency, and cultural sensitivity. 

## Supported tasks & Limitations

*   **Machine Translation:** The primary task is fine-tuning models for Hindi ↔ Tribal language translation.
*   **Cross-lingual transfer:** Studying cross-script transfer from high-resource languages (like Hindi) to closely related writing systems, and modeling for underserved scripts (like Ol Chiki).
*   **Known Biases:** Translating into high-resource languages (Tribal → Hindi/English) systematically outperforms translation into tribal languages due to the difficulty of generating morphologically rich, low-frequency vocabulary. Models trained on this data may exhibit this dominant-language bias.

## Licensing

| Artefact | Licence |
| :--- | :--- |
| Dataset & Transcripts | [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) |

## Citation

If you use AdiBhashaa in your work, please cite the following paper:

```bibtex
@misc{singh2025adibhashaacommunitycuratedbenchmarkmachine,
      title={AdiBhashaa: A Community-Curated Benchmark for Machine Translation into Indian Tribal Languages}, 
      author={Pooja Singh and Sandeep Kumar},
      year={2025},
      eprint={2512.04765},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/abs/2512.04765}, 
}
```
