"""One-time model installer for offline Hindi transcription.

Run this while connected to the Internet.  The classroom application never
needs this script at runtime: it reads the downloaded model folder locally.
"""

from pathlib import Path

from huggingface_hub import snapshot_download


ROOT = Path(__file__).resolve().parents[1]
DESTINATION = ROOT / "models" / "faster-whisper-small"


def main() -> None:
    DESTINATION.parent.mkdir(parents=True, exist_ok=True)
    snapshot_download(
        repo_id="Systran/faster-whisper-small",
        local_dir=DESTINATION,
        local_dir_use_symlinks=False,
    )
    print(f"Offline Hindi ASR model is ready at: {DESTINATION}")


if __name__ == "__main__":
    main()
