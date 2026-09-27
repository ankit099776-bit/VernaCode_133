# BhashaSetu AI - Render Deployment Guide

This guide provides step-by-step instructions to deploy the entire **BhashaSetu AI** application (React Production Frontend + FastAPI REST Backend + Real-Time Live Classroom WebSockets + Audio Pipeline) to **Render** as **ONE public web service** with **ONE public URL** (e.g. `https://bhashasetu.onrender.com`).

---

## 1. Prerequisites & GitHub Preparation

1. Create a new repository on [GitHub](https://github.com/new) named `bhashasetu-ai` (or use your existing repository).
2. Push your project code to GitHub:
   ```bash
   git add .
   git commit -m "Deploy: One-Service Render Architecture"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/bhashasetu-ai.git
   git push -u origin main
   ```

---

## 2. Step-by-Step Render Web Service Deployment

1. Log in to [Render.com](https://render.com).
2. Click **New +** → Select **Web Service**.
3. Connect your GitHub repository (`bhashasetu-ai`).
4. Fill in the following Web Service configuration:

| Setting Field | Value |
| :--- | :--- |
| **Name** | `bhashasetu-ai` (or your preferred name) |
| **Region** | Singapore / Oregon (or closest to your users) |
| **Branch** | `main` |
| **Runtime** | `Python 3` |
| **Build Command** | `pip install -r requirements.txt && cd frontend && npm install && npm run build` |
| **Start Command** | `uvicorn app.main:app --host 0.0.0.0 --port $PORT` |
| **Instance Type** | Free / Starter |

---

## 3. Configuring Environment Variables (Secrets)

Scroll down to the **Environment Variables** section on Render and add the following keys:

| Environment Variable | Value / Description | Required? |
| :--- | :--- | :--- |
| `PIPELINE_MODE` | `online` | **Yes** |
| `HOST` | `0.0.0.0` | **Yes** |
| `ASR_PROVIDER` | `sarvam` (or `mock`) | **Yes** |
| `TRANSLATION_PROVIDER` | `sarvam` (or `mock`) | **Yes** |
| `TTS_PROVIDER` | `bhashini` (or `sarvam` / `mock`) | **Yes** |
| `SARVAM_API_KEY` | *Your Sarvam AI API Key* | **Yes (For Sarvam AI)** |
| `BHASHINI_API_KEY` | *Your Bhashini API Key* | **Yes (For Bhashini TTS)** |
| `GEMINI_API_KEY` | *Your Google Gemini API Key* | **Yes (For Textbook Scanner OCR & Worksheets)** |

*Note: Render automatically injects the `PORT` variable — do not hard-code port numbers.*

---

## 4. Deploying & Testing the Deployed Application

1. Click **Create Web Service**.
2. Render will execute the build sequence:
   - Installs Python backend packages.
   - Compiles React production bundle into `frontend/dist/`.
   - Starts FastAPI server on `$PORT`.
3. Once deployment status turns **Live**, open your public Render URL:
   `https://bhashasetu-ai.onrender.com`

---

## 5. Verification Checklist

- [x] **Root URL (`/`)**: Loads the React UI landing splash screen.
- [x] **Teacher Portal (`/teacher`)**: Opens Teacher Dashboard with full curriculum, worksheet generator, quiz generator, and textbook scanner.
- [x] **Student Portal (`/student`)**: Logs student in smoothly without white screens.
- [x] **Live Classroom WebSockets (`/api/v1/ws/v1/voice-stream`)**: Automatically connects over Secure WebSockets (`wss://`) on the same origin.
- [x] **Client SPA Refresh**: Refreshing any sub-route (e.g. `/teacher`, `/student`) retains state and returns 200 OK without 404 errors.

---

## 6. Updating & Redeploying

- Whenever you push changes to your GitHub `main` branch, Render will automatically rebuild and deploy the new version.
- To trigger a manual redeploy: Go to your Render Dashboard → Click **Manual Deploy** → **Clear build cache & deploy**.
