# BhashaSetu AI — Real-Time Offline & Online Hindi → Santali Classroom Voice Platform
### 🏆 SIH 2026 Submission | Problem Statement ID: SIH26042 | Team: VernaCode_133

[![Live App](https://img.shields.io/badge/Render-Live%20Web%20App-success?style=for-the-badge&logo=render)](https://vernacode-133.onrender.com)
[![GitHub Repo](https://img.shields.io/badge/GitHub-VernaCode__133-blue?style=for-the-badge&logo=github)](https://github.com/ankit099776-bit/VernaCode_133)
[![Tests](https://img.shields.io/badge/pytest-63%20passed-brightgreen.svg)](tests/)

---

## 👥 Team VernaCode_133 — SIH 2026 Team Members & Contributors

| Member Avatar | Member Name | Role & Responsibility | GitHub Profile |
| :---: | :--- | :--- | :--- |
| 👑 | **Ankit** | **Team Lead** & Full-Stack AI Architect | [@ankit099776-bit](https://github.com/ankit099776-bit) |
| 👨‍💻 | **Team Member 2** | Frontend & Ol Chiki UI Specialist | [@team_member_2](https://github.com/ankit099776-bit/VernaCode_133) |
| 👩‍💻 | **Team Member 3** | Backend & Voice WebSockets Engineer | [@team_member_3](https://github.com/ankit099776-bit/VernaCode_133) |
| 👨‍💻 | **Team Member 4** | Translation Corpus & Dataset Specialist | [@team_member_4](https://github.com/ankit099776-bit/VernaCode_133) |
| 👩‍💻 | **Team Member 5** | Quality Assurance & Testing Lead | [@team_member_5](https://github.com/ankit099776-bit/VernaCode_133) |
| 👨‍💻 | **Team Member 6** | Vernacular Curriculum & Pedagogy Lead | [@team_member_6](https://github.com/ankit099776-bit/VernaCode_133) |

---

## 🌐 Live Web Application & Demonstration Links

* 🌐 **Live Public Web App (Render)**: [https://vernacode-133.onrender.com](https://vernacode-133.onrender.com)
* 🏫 **Teacher Portal**: [https://vernacode-133.onrender.com/teacher](https://vernacode-133.onrender.com/teacher)
* 👦 **Student Learning Portal**: [https://vernacode-133.onrender.com/student](https://vernacode-133.onrender.com/student)
* 💻 **GitHub Repository**: [https://github.com/ankit099776-bit/VernaCode_133](https://github.com/ankit099776-bit/VernaCode_133)

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
                         │   • Sarvam / Bhashini API       │
                         │   • OFFLINE: Indic-Parler-TTS   │
                         └────────────────┬────────────────┘
                                          │ Santali WAV Audio
                                          ▼
                         ┌─────────────────────────────────┐
                         │ WebSocket Broadcast Controller  │
                         │      (/ws/v1/voice-stream)      │
                         └────────────────┬────────────────┘
                                          │ Local Wi-Fi / Cloud WebSockets
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
* **Dual-Mode Provider Architecture**:
  * **ONLINE MODE**: Sarvam ASR + Sarvam Hindi $\rightarrow$ Santali Translation + Bhashini / Sarvam TTS.
  * **OFFLINE MODE**: `faster-whisper` (ASR) + `facebook/nllb-200-distilled-600M` (`hin_Deva` $\rightarrow$ `sat_Olck`) + Indic-Parler local TTS.

---

## 📊 Benchmark Telemetry & Performance Metrics (CPU Mode)

| Pipeline Step | Provider / Model | Quantization / Device | Measured Latency |
| :--- | :--- | :--- | :--- |
| **Local ASR** | `faster-whisper` (`tiny`) | FP32 / CPU | **1.15s – 5.74s** |
| **Local Translation** | `facebook/nllb-200-distilled-600M` | FP32 / CPU | **5.28s – 7.47s** |
| **Local TTS** | `ai4bharat/indic-parler-tts` | FP32 / CPU | **44.18s – 61.43s** |
| **Total End-to-End** | **Full Local Offline Pipeline** | **CPU** | **~50.6s – 74.6s** |

---

## 🛠️ Deployment & Installation Setup Guide

### 1. One-Click Cloud Web Deployment (Render)
- Build Command: `pip install -r requirements.txt && cd frontend && npm install && npm run build`
- Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### 2. Local Desktop Run
```bash
git clone https://github.com/ankit099776-bit/VernaCode_133.git
cd VernaCode_133
python app.main
```
Open browser at `http://localhost:8000`.

---

## 🧪 Verification & Testing

### Run Pytest Test Suite (63 Tests)
```bash
pytest tests/
```
Result: `63 passed in 27.75s`

---

## 📄 License
Licensed under the MIT License.
