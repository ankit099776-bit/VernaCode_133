"""
Download all accessible raw datasets into training/raw/ for inspection.
"""
import os
import sys
from huggingface_hub import hf_hub_download

RAW_DIR = os.path.join("training", "raw")
os.makedirs(RAW_DIR, exist_ok=True)

def download_public_datasets():
    print("=" * 70)
    print("DOWNLOADING AVAILABLE PARALLEL / SANTALI DATASETS TO training/raw/")
    print("=" * 70)

    # 1. Agriculture Ol Chiki QA Dataset
    agri_dir = os.path.join(RAW_DIR, "santali_agriculture_qa")
    os.makedirs(agri_dir, exist_ok=True)
    try:
        p1 = hf_hub_download(
            repo_id="nharshavardhana/Santali-Ol-Chiki-Agriculture_Question-Answer_Dataset",
            filename="Ol Chiki (Santali)-Agriculture QAs.csv",
            repo_type="dataset",
            local_dir=agri_dir
        )
        print(f"  [OK] Downloaded Agriculture QA: {p1}")
    except Exception as e:
        print(f"  [FAIL] Agriculture QA download error: {e}")

    # 2. JanAI Workspace Santali Dataset
    jan_dir = os.path.join(RAW_DIR, "janai_santali")
    os.makedirs(jan_dir, exist_ok=True)
    for fname in ["data.csv", "chat.csv"]:
        try:
            p2 = hf_hub_download(
                repo_id="JanAI-Workspace/Santali-dataset",
                filename=fname,
                repo_type="dataset",
                local_dir=jan_dir
            )
            print(f"  [OK] Downloaded JanAI {fname}: {p2}")
        except Exception as e:
            print(f"  [FAIL] JanAI {fname} download error: {e}")

    # 3. Murmu722 Unified Santali Corpus (first batches)
    murmu_dir = os.path.join(RAW_DIR, "murmu722_unified")
    os.makedirs(murmu_dir, exist_ok=True)
    for b_num in ["0001", "0002", "0003"]:
        fname = f"data/batches/batch_{b_num}.parquet"
        try:
            p3 = hf_hub_download(
                repo_id="Murmu722/santali_corpus_unified_v2",
                filename=fname,
                repo_type="dataset",
                local_dir=murmu_dir
            )
            print(f"  [OK] Downloaded Murmu722 {fname}: {p3}")
        except Exception as e:
            print(f"  [FAIL] Murmu722 {fname} download error: {e}")

if __name__ == "__main__":
    download_public_datasets()
