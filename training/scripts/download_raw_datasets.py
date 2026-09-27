"""
Script to download raw Hindi-Santali parallel datasets from Hugging Face.
Downloads:
1. COILD-MT-Corpus (coild-dataset/COILD-MT-Corpus) - HIN-SAT subset
2. Education_v2 (coild-aikosh/Education_v2) - HIN-SAT subset
3. FLORES-200 / FLORES+ (Hindi hin_Deva <-> Santali sat_Olck) if available
"""
import os
import sys
from huggingface_hub import hf_hub_download

RAW_DIR = os.path.join("training", "raw")
os.makedirs(RAW_DIR, exist_ok=True)

def download_coild_mt_corpus():
    print("=" * 70)
    print("1. Downloading COILD-MT-Corpus (HIN-SAT subset)...")
    print("=" * 70)
    
    coild_dir = os.path.join(RAW_DIR, "coild_mt_corpus")
    os.makedirs(coild_dir, exist_ok=True)
    
    repo_id = "coild-dataset/COILD-MT-Corpus"
    files_to_download = [
        "HIN-SAT/Hindi.txt",
        "HIN-SAT/Santali.txt",
        "BENCHMARK/hin_Deva-sat_Olck/test.hin_Deva",
        "BENCHMARK/hin_Deva-sat_Olck/test.sat_Olck",
        "BENCHMARK/sat_Olck-hin_Deva/test.hin_Deva",
        "BENCHMARK/sat_Olck-hin_Deva/test.sat_Olck",
    ]
    
    downloaded = []
    for rel_path in files_to_download:
        try:
            local_path = hf_hub_download(
                repo_id=repo_id,
                filename=rel_path,
                repo_type="dataset",
                local_dir=coild_dir
            )
            print(f"  [OK] Downloaded: {rel_path} -> {local_path}")
            downloaded.append(local_path)
        except Exception as e:
            print(f"  [FAIL] Could not download {rel_path}: {e}")
    return downloaded

def download_education_v2():
    print("\n" + "=" * 70)
    print("2. Downloading Education_v2 (HIN-SAT subset)...")
    print("=" * 70)
    
    edu_dir = os.path.join(RAW_DIR, "education_v2")
    os.makedirs(edu_dir, exist_ok=True)
    
    repo_id = "coild-aikosh/Education_v2"
    rel_path = "HIN-SAT/Source_Reviewed/EDU/combined.txt"
    
    try:
        local_path = hf_hub_download(
            repo_id=repo_id,
            filename=rel_path,
            repo_type="dataset",
            local_dir=edu_dir
        )
        print(f"  [OK] Downloaded: {rel_path} -> {local_path}")
        return [local_path]
    except Exception as e:
        print(f"  [FAIL] Could not download Education_v2 HIN-SAT: {e}")
        return []

def download_flores_data():
    print("\n" + "=" * 70)
    print("3. Checking/Downloading FLORES Hindi-Santali data...")
    print("=" * 70)
    
    flores_dir = os.path.join(RAW_DIR, "flores_200")
    os.makedirs(flores_dir, exist_ok=True)
    
    # Try fetching FLORES-200 dev/devtest from facebook/flores or openlanguagedata/flores_plus
    repo_id = "openlanguagedata/flores_plus"
    files = [
        "dev/dev.hin_Deva",
        "dev/dev.sat_Olck",
        "devtest/devtest.hin_Deva",
        "devtest/devtest.sat_Olck"
    ]
    
    downloaded = []
    for rel_path in files:
        try:
            local_path = hf_hub_download(
                repo_id=repo_id,
                filename=rel_path,
                repo_type="dataset",
                local_dir=flores_dir
            )
            print(f"  [OK] Downloaded FLORES+: {rel_path} -> {local_path}")
            downloaded.append(local_path)
        except Exception as e:
            print(f"  [INFO] FLORES+ download skip/attempt: {rel_path} ({e})")
    
    return downloaded

if __name__ == "__main__":
    download_coild_mt_corpus()
    download_education_v2()
    download_flores_data()
