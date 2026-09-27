# RENDER DEPLOYMENT INSPECTION REPORT

This document contains the structural inspection findings for deploying **BhashaSetu AI** on **Render** as a single unified Web Service.

---

## Key Project Inspection Findings

1. **FastAPI Entry Point**:
   - File: `app/main.py`
   - App Object: `app = FastAPI(...)`
   - Server Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

2. **React/Vite Entry Point**:
   - Directory: `frontend/`
   - Entry File: `frontend/src/main.jsx`
   - Main Router/App: `frontend/src/App.jsx`

3. **Frontend Build Command & Output Directory**:
   - Build Command: `npm run build` (inside `frontend/`)
   - Output Directory: `frontend/dist/` (contains `index.html` and `assets/`)

4. **FastAPI API Routes**:
   - `/health` (System health check)
   - `/api/translate` (Direct translation endpoint)
   - `/api/tts` (Direct TTS audio synthesis endpoint)
   - `/api/v1/*` (REST router from `app/api/v1/router.py`)

5. **WebSocket Routes**:
   - `/ws/v1/voice-stream` (Primary live classroom voice & translation stream)
   - `/api/v1/ws/v1/voice-stream` (Alias mounted via API router)
   - `/ws/voice-stream` (Legacy alias)

6. **Teacher Screens**:
   - `04_TeacherDashboard.jsx` (Teacher Home Dashboard)
   - `05_LiveTranslate.jsx` (Teacher Live Classroom & Real-Time Voice Translation)
   - `06_TextbookScanner.jsx` (AI Textbook Scanner & Ol Chiki Converter)
   - `07_WorksheetGenerator.jsx` (Worksheet Generator)
   - `07_QuizGenerator.jsx` (Quiz Generator)
   - `08_Flashcards.jsx` (Interactive Vocabulary Flashcards)
   - `09_Curriculum.jsx` (Curriculum Overview)
   - `10_StudentProgress.jsx` (Student Attendance & Stars Analytics)
   - `11_TeachBack.jsx` (Teach-Back Evaluation)
   - `12_OfflineLearning.jsx` (Offline Learning Packs)
   - `13_Settings.jsx` (Settings & Configuration)

7. **Student Screens**:
   - `02_StudentLogin.jsx` (Class-wise Visual Student Login)
   - `05_StudentDashboard.jsx` (Student Learning Portal)
   - `05_StudentLiveClassroom.jsx` (Student Live Classroom Receiver)

8. **Audio Handling**:
   - Base64 WAV playback via `frontend/src/services/audioPlayer.js` and `frontend/src/data/bhashaData.js`.
   - Backend TTS synthesis via Sarvam AI, Bhashini API, and Edge TTS in `app/modules/tts/`.

9. **Environment Variables Required**:
   - `PORT` (Dynamic port allocated by Render, defaults to 8000)
   - `HOST` (`0.0.0.0`)
   - `PIPELINE_MODE` (`online`)
   - `SARVAM_API_KEY` (For Sarvam Translation & ASR)
   - `BHASHINI_API_KEY` (For Bhashini TTS)
   - `GEMINI_API_KEY` (For AI Textbook Scanner & Worksheet Generation)
   - `ASR_PROVIDER` (`sarvam`)
   - `TTS_PROVIDER` (`sarvam` or `bhashini`)
   - `TRANSLATION_PROVIDER` (`sarvam`)

10. **Current Localhost/IP References**:
    - Hardcoded candidates `wss://localhost:8000` and `wss://127.0.0.1:8000` in `05_LiveTranslate.jsx` and `05_StudentLiveClassroom.jsx`.
    - Needs dynamic origin candidate (`${protocol}//${host}/ws/v1/voice-stream`) as **first priority**.

11. **Current AI Provider Configuration**:
    - Online mode uses Sarvam AI, Bhashini, and Gemini APIs.

12. **`requirements.txt` Inspection**:
    - Contains online dependencies (`fastapi`, `uvicorn`, `httpx`, `pydantic`, `pydantic-settings`). Heavy local offline PyTorch dependencies (`torch`, `transformers`) can be isolated to `requirements-offline.txt` to optimize Render build times and avoid memory timeouts during deployment.

13. **`package.json` Inspection**:
    - Standard Vite + React 18 + Tailwind CSS dependencies.

14. **Existing Render/Deployment Configuration**:
    - None currently present.

15. **Frontend `dist` Status**:
    - `frontend/dist/` exists and is built.

16. **FastAPI Frontend Serving**:
    - Currently mounts `/assets` and serves `/`, but lacks SPA catch-all fallback route (`/{full_path:path}`) for React client routing.
