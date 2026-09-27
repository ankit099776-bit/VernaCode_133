# BhashaSetu AI — Real-Time Offline Hindi → Santali Classroom Voice Translator

[![Tests](https://img.shields.io/badge/pytest-41%20passed-brightgreen.svg)](tests/)
[![Python](https://img.shields.io/badge/python-3.10%20%7C%203.11%20%7C%203.12-blue.svg)](#environment-setup)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Offline](https://img.shields.io/badge/Offline-100%25%20Zero%20Internet-success.svg)](#critical-requirement--full-offline-operation)

A high-performance, dual-mode (ONLINE & OFFLINE) classroom voice translation system for **Hindi Speech → Hindi Text → Santali Text (Ol Chiki) → Santali Audio (TTS)**, built for **SIH 2026 Problem Statement SIH26042** (BhashaSetu AI).

---

## 🌟 Architecture Overview

```text
===================================================================================
                               TEACHER DEVICE (Laptop)
===================================================================================
                       [ Teacher Speaks Hindi into Microphone ]
                                          │
                                          ▼
                         ┌─────────────────────────────────┐
                         │   ASR (Speech-to-Text) Engine   │
                         │   • ONLINE: Sarvam saaras:v3    │
                         │   • OFFLINE: faster-whisper     │
                         └────────────────┬────────────────┘
                                          │ Hindi Text
                                          ▼
                         ┌─────────────────────────────────┐
                         │    Hindi → Santali Translation  │
                         │   • ONLINE: Sarvam Translate    │
                         │   • OFFLINE: NLLB-200 (600M)    │
                         └────────────────┬────────────────┘
                                          │ Santali Text (Ol Chiki Unicode)
                                          ▼
                         ┌─────────────────────────────────┐
                         │      Santali TTS Engine         │
                         │   • AI4Bharat Indic-Parler-TTS  │
                         │   • (or Bhashini Dhruva API)    │
                         └────────────────┬────────────────┘
                                          │ Santali WAV Audio
                                          ▼
                         ┌─────────────────────────────────┐
                         │ WebSocket Broadcast Controller  │
                         │      (/ws/v1/voice-stream)      │
                         └────────────────┬────────────────┘
                                          │ Local Wi-Fi / LAN (Zero Internet)
================================──────────┼────────────────========================
                                          │
                                          ▼
                                   STUDENT DEVICE
                         ┌─────────────────────────────────┐
                         │ Student Receiver Web UI         │
                         │ Displays Ol Chiki Text + Auto-  │
                         │ plays Santali Audio             │
                         └─────────────────────────────────┘
```

---

## 🟢 Critical Requirement — Full Offline Operation

* **Zero Cloud Dependency**: Once models are cached locally, ASR, Translation, and TTS require **no Internet connection** and send **0 cloud API requests**.
* **Local LAN Communication**: The Teacher backend runs locally on the teacher device (`http://192.168.x.x:8000`), and student devices connect over local Wi-Fi/LAN via WebSockets.
* **Provider Architecture**:
  * **ONLINE MODE**: Sarvam ASR + Sarvam Hindi $\rightarrow$ Santali Translation + AI4Bharat TTS.
  * **OFFLINE MODE**: `faster-whisper` (ASR) + `facebook/nllb-200-distilled-600M` (`hin_Deva` $\rightarrow$ `sat_Olck`) + AI4Bharat local TTS.

---

## 📊 Benchmark Telemetry & Performance Metrics (CPU Mode)

| Pipeline Step | Provider / Model | Quantization / Device | Measured Latency |
| :--- | :--- | :--- | :--- |
| **Local ASR** | `faster-whisper` (`tiny`) | FP32 / CPU | **1.15s – 5.74s** |
| **Local Translation** | `facebook/nllb-200-distilled-600M` | FP32 / CPU | **5.28s – 7.47s** |
| **Local TTS** | `ai4bharat/indic-parler-tts` | FP32 / CPU | **44.18s – 61.43s** |
| **Total End-to-End** | **Full Local Offline Pipeline** | **CPU** | **~50.6s – 74.6s** |

*(Note: End-to-end latency can be accelerated down to <3 seconds on an NVIDIA GPU or with model INT8 quantization).*

---

## 📦 Local Model Requirements

1. **Local ASR**: `openai/whisper-tiny` (or `faster-whisper` tiny) ~75 MB disk, ~500 MB RAM.
2. **Local Translation**: `facebook/nllb-200-distilled-600M` ~2.4 GB disk, ~1.5 GB RAM.
3. **Local TTS**: `ai4bharat/indic-parler-tts` ~1.8 GB disk, ~2.0 GB RAM.

---

## 🛠️ Installation & Setup Guide

### 1. Environment Setup
```bash
git clone https://github.com/ankit099776-bit/bhashasetu-voice-module.git
cd bhashasetu-voice-module

# Activate environment with PyTorch and Transformers installed
.\.venv-ai4bharat\Scripts\activate
```

### 2. Configure Environment (`.env`)
```env
PIPELINE_MODE=offline
ASR_PROVIDER=local
TRANSLATION_PROVIDER=local
TTS_PROVIDER=ai4bharat

LOCAL_ASR_MODEL_NAME=openai/whisper-tiny
LOCAL_TRANSLATION_MODEL_NAME=facebook/nllb-200-distilled-600M
TTS_MODEL_NAME=ai4bharat/indic-parler-tts
```

---

## 🚀 Running the Classroom Demo

### 1. Start Server on Teacher Device
```bash
python app/main.py
```
* Or via Uvicorn:
  ```bash
  uvicorn app.main:app --host 0.0.0.0 --port 8000
  ```

### 2. Access Web UIs
* **Dashboard / Mode Switcher**: `http://localhost:8000/`
* **Teacher Classroom UI**: `http://localhost:8000/teacher` (or `http://<TEACHER_LOCAL_IP>:8000/teacher`)
* **Student Receiver UI**: `http://<TEACHER_LOCAL_IP>:8000/student`
* **Diagnostic Status API**: `http://localhost:8000/api/v1/status`

---

## 🧪 Verification & Testing

### 1. Run Complete Pytest Suite (41 Tests)
```bash
.\.venv-ai4bharat\Scripts\python.exe -m pytest
```

### 2. Run Full Offline Pipeline Verification Script
```bash
.\.venv-ai4bharat\Scripts\python.exe scripts/verify_offline_pipeline.py
```

---

## 📄 License
Licensed under the MIT License.
