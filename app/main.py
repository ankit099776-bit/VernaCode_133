import os
import sys

sys.path.insert(0, os.path.abspath("."))

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from app.config import settings
from app.api.v1.router import api_v1_router

# Ensure UTF-8 output encoding on Windows console for Hindi and Ol Chiki scripts
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")

app = FastAPI(
    title="BhashaSetu AI - Multilingual Classroom Platform",
    version="2.0.0",
    description="Vernacular Pedagogy Platform: Real-Time Hindi <-> Santali Ol Chiki Voice Translation"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount React SPA assets if built, alongside legacy static directory
if os.path.exists("frontend/dist/assets"):
    app.mount("/assets", StaticFiles(directory="frontend/dist/assets"), name="frontend-assets")
app.mount("/static", StaticFiles(directory="static"), name="static")

from fastapi.responses import FileResponse, RedirectResponse

@app.get("/", tags=["UI"])
async def read_index():
    if os.path.exists("frontend/dist/index.html"):
        return FileResponse("frontend/dist/index.html")
    return RedirectResponse(url="/login")

@app.get("/login", tags=["UI"])
async def read_login():
    return FileResponse("static/login.html")

@app.get("/teacher", tags=["UI"])
async def read_teacher():
    return FileResponse("static/teacher.html")

@app.get("/student", tags=["UI"])
async def read_student():
    return FileResponse("static/student.html")

@app.get("/classroom", tags=["UI"])
async def read_classroom():
    return FileResponse("static/classroom.html")

@app.get("/teacher/classroom", tags=["UI"])
async def read_teacher_classroom():
    return FileResponse("static/teacher_classroom.html")

@app.get("/student/classroom", tags=["UI"])
async def read_student_classroom():
    return FileResponse("static/student_classroom.html")

@app.get("/translator", tags=["UI"])
async def read_translator():
    return FileResponse("static/translator.html")

@app.get("/flashcards", tags=["UI"])
async def read_flashcards():
    return FileResponse("static/flashcards.html")

@app.get("/quizzes", tags=["UI"])
async def read_quizzes():
    return FileResponse("static/quizzes.html")

@app.get("/progress", tags=["UI"])
async def read_progress():
    return FileResponse("static/progress.html")

@app.get("/attendance", tags=["UI"])
async def read_attendance():
    return FileResponse("static/attendance.html")

@app.get("/lessons", tags=["UI"])
async def read_lessons():
    return FileResponse("static/lessons.html")

@app.get("/textbook", tags=["UI"])
async def read_textbook():
    return FileResponse("static/textbook.html")

from fastapi import Response, Query, Request
from app.modules.translation.client import TranslationClient
from app.modules.translation.ol_chiki_transliteration import transliterate_ol_chiki
from app.modules.tts.factory import get_tts_provider

translation_client_instance = TranslationClient()

@app.get("/api/translate", tags=["Compatibility API"])
@app.post("/api/translate", tags=["Compatibility API"])
async def api_translate_alias(
    request: Request,
    text: str = Query(None),
    source_language: str = Query("hi"),
    target_language: str = Query("sat")
):
    req_text = text
    src_lang = source_language
    tgt_lang = target_language
    if request.method == "POST":
        try:
            body = await request.json()
            req_text = body.get("text", req_text)
            src_lang = body.get("source_language", src_lang)
            tgt_lang = body.get("target_language", tgt_lang)
        except Exception:
            pass

    if not req_text or not req_text.strip():
        return {"error": "Empty text provided"}

    clean_text = req_text.strip()
    res = await translation_client_instance.translate(
        text=clean_text,
        source_language=src_lang,
        target_language=tgt_lang
    )
    ol_text = res.translated_text
    if tgt_lang.lower() in ("sat", "sat-in"):
        latin_text, dev_text = transliterate_ol_chiki(ol_text)
    else:
        latin_text, dev_text = ol_text, ol_text

    return {
        "text": clean_text,
        "translated_text": ol_text,
        "source_language": src_lang,
        "target_language": tgt_lang,
        "olChiki": ol_text if tgt_lang.lower() in ("sat", "sat-in") else "",
        "latin": latin_text or ol_text,
        "devanagari": dev_text or ol_text,
        "phonetic": dev_text or latin_text or ol_text,
        "source": res.provider
    }

@app.get("/api/tts", tags=["Compatibility API"])
async def api_tts_alias(text: str = Query("")):
    if not text or not text.strip():
        return Response(status_code=400, content="Empty text provided")

    try:
        tts_engine = get_tts_provider(target_language="sat")
        result = await tts_engine.synthesize(text=text, target_language="sat")
        return Response(
            content=result.audio_bytes,
            media_type="audio/wav",
            headers={"Cache-Control": "public, max-age=86400"}
        )
    except Exception as e:
        return Response(status_code=500, content=f"TTS Error: {str(e)}")

@app.get("/health", tags=["System"])
async def health_check():
    return {
        "status": "healthy",
        "service": "bhashasetu-voice-module",
        "mode": "ONLINE",
        "asr_provider": settings.ASR_PROVIDER,
        "tts_provider": settings.TTS_PROVIDER,
        "translation_api_url": settings.TRANSLATION_API_URL
    }

from app.api.v1.websocket import ws_router
app.include_router(api_v1_router, prefix="/api/v1")
app.include_router(ws_router, prefix="")

# SPA Fallback Catch-All Route for React Frontend (Registered after API & WS routes)
@app.get("/{full_path:path}", include_in_schema=False)
async def serve_spa_or_static(full_path: str):
    # Skip API, docs, openapi, and WebSocket routes
    if full_path.startswith("api") or full_path.startswith("docs") or full_path.startswith("openapi.json") or full_path.startswith("ws"):
        return Response(status_code=404, content="Not Found")
    
    # Serve matching static file from frontend/dist if present
    dist_file = os.path.join("frontend", "dist", full_path)
    if os.path.isfile(dist_file):
        return FileResponse(dist_file)

    # Fallback to frontend/dist/index.html for React SPA client-side routing
    index_path = os.path.join("frontend", "dist", "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)

    # Fallback for legacy static directory
    legacy_static = os.path.join("static", full_path if full_path else "index.html")
    if os.path.isfile(legacy_static):
        return FileResponse(legacy_static)

    return Response(status_code=404, content="Not Found")

if __name__ == "__main__":
    import uvicorn
    
    ssl_cert = "cert.pem"
    ssl_key = "key.pem"
    port = int(os.environ.get("PORT", settings.PORT))
    host = settings.HOST
    
    if os.path.exists(ssl_cert) and os.path.exists(ssl_key):
        print(f"🔐 HTTPS Enabled: Serving SSL/TLS certificate '{ssl_cert}' and '{ssl_key}' on https://{host}:{port}", flush=True)
        uvicorn.run(
            app,
            host=host,
            port=port,
            ssl_certfile=ssl_cert,
            ssl_keyfile=ssl_key,
            reload=False
        )
    else:
        print(f"⚠️ Serving HTTP server on http://{host}:{port}", flush=True)
        uvicorn.run(
            app,
            host=host,
            port=port,
            reload=False
        )
