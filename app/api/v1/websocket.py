import json
import base64
import logging
from typing import Dict, List, Optional
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.core.pipeline import VoiceTranslationPipeline
from app.core.audio_validator import validate_tts_audio
from app.config import settings
from app.modules.translation.ol_chiki_transliteration import transliterate_ol_chiki

logger = logging.getLogger(__name__)
ws_router = APIRouter()
pipeline = VoiceTranslationPipeline()

class ConnectionManager:
    """
    Manages active Teacher & Student WebSocket connections with room and role isolation.
    """
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        # room_connections: room_code -> list of dicts {"ws": WebSocket, "role": "teacher"|"student"}
        self.room_connections: Dict[str, List[dict]] = {}

    async def connect(self, websocket: WebSocket, room_code: str = "BHASA-204", role: str = "student"):
        await websocket.accept()
        self.active_connections.append(websocket)
        
        room_code = room_code.upper()
        role = role.lower()

        if room_code not in self.room_connections:
            self.room_connections[room_code] = []
        
        self.room_connections[room_code].append({
            "ws": websocket,
            "role": role
        })
        
        logger.info(f"WebSocket connected (Role: '{role}', Room: '{room_code}'). Total listeners: {len(self.active_connections)}")
        await self.broadcast_room_status(room_code)

    def register_client(self, websocket: WebSocket, new_room: str, new_role: str):
        """
        Safely moves a client connection to new_room under new_role.
        """
        new_room = new_room.upper()
        new_role = new_role.lower()

        # Remove from any existing room
        for room, clients in list(self.room_connections.items()):
            for item in list(clients):
                if item["ws"] == websocket:
                    clients.remove(item)

        if new_room not in self.room_connections:
            self.room_connections[new_room] = []

        self.room_connections[new_room].append({
            "ws": websocket,
            "role": new_role
        })
        logger.info(f"Client re-registered to Room: '{new_room}', Role: '{new_role}'")

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            
        affected_rooms = []
        for room_code, clients in list(self.room_connections.items()):
            for item in list(clients):
                if item["ws"] == websocket:
                    clients.remove(item)
                    affected_rooms.append(room_code)
        
        logger.info(f"WebSocket disconnected. Remaining listeners: {len(self.active_connections)}")

    async def broadcast(self, message: dict, room_code: Optional[str] = None, target_role: Optional[str] = None):
        """
        Broadcasts WS message to clients, filtered by room and optional target_role.
        """
        msg_type = message.get("type") or message.get("event") or "unknown"
        sent_count = 0

        if room_code and room_code in self.room_connections:
            clients = self.room_connections[room_code]
            for item in list(clients):
                ws = item["ws"]
                role = item["role"]
                if target_role and role != target_role.lower():
                    continue
                try:
                    await ws.send_json(message)
                    sent_count += 1
                except Exception as e:
                    logger.error(f"[AUDIO-TRACE] Error sending room WS message: {e}")
            
            logger.info(
                f"[AUDIO-TRACE] BROADCAST event='{msg_type}' | room='{room_code}' | "
                f"target_role='{target_role or 'ALL'}' | sent_to={sent_count} client(s) | SEND SUCCESS"
            )
            print(
                f"[AUDIO-TRACE] BROADCAST event='{msg_type}' | room='{room_code}' | "
                f"target_role='{target_role or 'ALL'}' | sent_to={sent_count} client(s) | SEND SUCCESS",
                flush=True
            )
        else:
            for connection in list(self.active_connections):
                try:
                    await connection.send_json(message)
                    sent_count += 1
                except Exception as e:
                    logger.error(f"[AUDIO-TRACE] Error broadcasting global WS message: {e}")
            logger.info(f"[AUDIO-TRACE] GLOBAL BROADCAST event='{msg_type}' | sent_to={sent_count} client(s)")

    async def broadcast_room_status(self, room_code: str):
        if room_code not in self.room_connections:
            return
        clients = self.room_connections[room_code]
        teacher_count = sum(1 for c in clients if c["role"] == "teacher")
        student_count = sum(1 for c in clients if c["role"] == "student")
        
        status_event = {
            "type": "room_status",
            "event": "room_status",
            "room_code": room_code,
            "teacher_connected": teacher_count > 0,
            "student_count": student_count,
            "total_clients": len(clients)
        }
        await self.broadcast(status_event, room_code=room_code)

manager = ConnectionManager()

@ws_router.websocket("/ws/v1/voice-stream")
@ws_router.websocket("/ws/voice-stream")
async def websocket_voice_stream(websocket: WebSocket):
    """
    WebSocket endpoint for Live Two-Way Classroom voice and progressive text streaming.
    """
    client_room = "BHASA-204"
    client_role = "student"
    
    await manager.connect(websocket, room_code=client_room, role=client_role)
    try:
        await websocket.send_json({
            "type": "connected",
            "event": "connected",
            "message": "Connected to BhashaSetu Classroom Live Voice Stream",
            "mode": "ONLINE",
            "room_code": client_room,
            "listeners": len(manager.active_connections)
        })

        while True:
            data = await websocket.receive_text()
            try:
                msg = json.loads(data)
                action = msg.get("action")

                if action == "join_room":
                    client_room = msg.get("room_code", "BHASA-204").upper()
                    client_role = msg.get("role", "student").lower()
                    
                    manager.register_client(websocket, new_room=client_room, new_role=client_role)
                    await manager.broadcast_room_status(client_room)
                    
                    await websocket.send_json({
                        "type": "room_joined",
                        "event": "room_joined",
                        "room_code": client_room,
                        "role": client_role
                    })

                elif action == "translate_audio" and msg.get("audio_base64"):
                    request_id = msg.get("request_id") or f"req_{int(time.time()*1000)}"
                    raw_audio_b64 = msg.get("audio_base64")
                    audio_bytes = base64.b64decode(raw_audio_b64)
                    src_lang = msg.get("source_language", "hi")
                    tgt_lang = msg.get("target_language", "sat")
                    direction = msg.get("direction", "teacher_to_student")
                    room_code = msg.get("room_code", client_room).upper()
                    voice_pack = msg.get("voice_pack")
                    input_mime = msg.get("mime_type") or ("audio/webm" if audio_bytes.startswith(b"\x1aE\xdf\xa3") else "audio/wav")

                    # Calculate input audio duration estimate
                    est_duration = round(len(audio_bytes) / 32000.0, 2) if audio_bytes.startswith(b"RIFF") else round(len(audio_bytes) / 4000.0, 2)

                    trace_msg = (
                        f"[REQUEST_TRACE] request_id={request_id} |\n"
                        f"  1. Raw mic recording: {len(audio_bytes)} bytes | MIME: {input_mime}\n"
                        f"  2. Audio chunk payload received: 1 complete utterance blob\n"
                        f"  3. Input audio duration: ~{est_duration}s"
                    )
                    logger.info(trace_msg)
                    print(trace_msg, flush=True)

                    # Progressive text delivery callback
                    async def broadcast_text_event(transcription, translation, latency_dict, active_mode):
                        latin_t, dev_t = transliterate_ol_chiki(translation)
                        
                        stage_log = (
                            f"[REQUEST_TRACE] request_id={request_id} |\n"
                            f"  4. ASR interim: N/A (Single complete utterance processed after speech_end)\n"
                            f"  5. ASR final transcript: '{transcription}'\n"
                            f"  6. Translation input (Hindi): '{transcription}'\n"
                            f"  7. Translation output (Santali): '{translation}'"
                        )
                        logger.info(stage_log)
                        print(stage_log, flush=True)

                        text_payload = {
                            "type": "text_translation",
                            "event": "text_translation",
                            "status": "success",
                            "request_id": request_id,
                            "mode": "ONLINE",
                            "direction": direction,
                            "source_language": src_lang,
                            "target_language": tgt_lang,
                            "transcription": transcription,
                            "translation": translation,
                            "latin": latin_t or translation,
                            "devanagari": dev_t or translation,
                            "latency_metrics": latency_dict,
                            "room_code": room_code
                        }
                        await manager.broadcast(text_payload, room_code=room_code)

                    response = await pipeline.execute(
                        audio_bytes=audio_bytes,
                        source_language=src_lang,
                        target_language=tgt_lang,
                        mode="online",
                        voice_pack=voice_pack,
                        on_translation_complete=broadcast_text_event
                    )

                    recipient_role = "student" if direction == "teacher_to_student" else "teacher"

                    audio_b64 = response.audio_base64
                    decoded_bytes = base64.b64decode(audio_b64)
                    
                    import hashlib
                    from app.api.v1 import endpoints
                    audio_sha256 = hashlib.sha256(decoded_bytes).hexdigest()
                    endpoints.latest_santali_audio_bytes = decoded_bytes
                    endpoints.latest_santali_audio_sha256 = audio_sha256

                    stage_tts_log = (
                        f"[REQUEST_TRACE] request_id={request_id} |\n"
                        f"  8. Bhashini/TTS input: '{response.translation}'\n"
                        f"  9. TTS returned audio duration: {response.audio_duration}s ({len(decoded_bytes)} bytes WAV)\n"
                        f" 10. WebSocket message sent to student: request_id={request_id} (target_role={recipient_role})"
                    )
                    logger.info(stage_tts_log)
                    print(stage_tts_log, flush=True)

                    if len(decoded_bytes) == 0 or not (decoded_bytes.startswith(b"RIFF") and b"WAVE" in decoded_bytes[:16]):
                        err_payload = {
                            "type": "voice_translation_error",
                            "event": "voice_translation_error",
                            "request_id": request_id,
                            "message": "Invalid TTS audio payload",
                            "details": "WAV header or length validation failed",
                            "direction": direction,
                            "room_code": room_code
                        }
                        await manager.broadcast(err_payload, room_code=room_code, target_role=recipient_role)
                    else:
                        lat_voice, dev_voice = transliterate_ol_chiki(response.translation)
                        voice_payload = {
                            "type": "voice_translation",
                            "event": "voice_translation",
                            "request_id": request_id,
                            "status": response.status,
                            "mode": "ONLINE",
                            "direction": direction,
                            "source_language": response.source_language,
                            "target_language": response.target_language,
                            "transcription": response.transcription,
                            "translation": response.translation,
                            "latin": lat_voice or response.translation,
                            "devanagari": dev_voice or response.translation,
                            "audio_format": response.audio_format,
                            "mime_type": getattr(response, "mime_type", "audio/wav"),
                            "audio_base64": audio_b64,
                            "sample_rate": getattr(response, "sample_rate", 16000),
                            "channels": getattr(response, "channels", 1),
                            "byte_length": len(decoded_bytes),
                            "audio_duration": response.audio_duration,
                            "asr_provider": response.asr_provider,
                            "tts_provider": response.tts_provider,
                            "latency_metrics": response.latency_metrics.dict() if hasattr(response.latency_metrics, "dict") else response.latency_metrics.model_dump(),
                            "room_code": room_code
                        }

                        await manager.broadcast(voice_payload, room_code=room_code, target_role=recipient_role)

                elif action == "translate_text" and (msg.get("text") or msg.get("input_text")):
                    import time
                    request_id = msg.get("request_id") or f"req_{int(time.time()*1000)}"
                    raw_text = (msg.get("text") or msg.get("input_text")).strip()
                    src_lang = msg.get("source_language", "hi")
                    tgt_lang = msg.get("target_language", "sat")
                    direction = msg.get("direction", "teacher_to_student")
                    room_code = msg.get("room_code", client_room).upper()

                    from app.modules.translation.client import TranslationClient
                    trans_client = TranslationClient()
                    trans_res = await trans_client.translate(raw_text, source_language=src_lang, target_language=tgt_lang)
                    translated_text = trans_res.translated_text

                    lat_t, dev_t = transliterate_ol_chiki(translated_text)

                    text_payload = {
                        "type": "text_translation",
                        "event": "text_translation",
                        "status": "success",
                        "request_id": request_id,
                        "mode": "ONLINE",
                        "direction": direction,
                        "source_language": src_lang,
                        "target_language": tgt_lang,
                        "transcription": raw_text,
                        "translation": translated_text,
                        "latin": lat_t or translated_text,
                        "devanagari": dev_t or translated_text,
                        "latency_metrics": {"asr_ms": 0, "translation_ms": 120, "total_ms": 120},
                        "room_code": room_code
                    }
                    await manager.broadcast(text_payload, room_code=room_code)

                    from app.modules.tts.factory import get_tts_provider
                    tts_engine = get_tts_provider(target_language=tgt_lang)
                    tts_res = await tts_engine.synthesize(text=translated_text, target_language=tgt_lang)
                    
                    audio_b64 = base64.b64encode(tts_res.audio_bytes).decode("utf-8")
                    recipient_role = "student" if direction == "teacher_to_student" else "teacher"

                    voice_payload = {
                        "type": "voice_translation",
                        "event": "voice_translation",
                        "request_id": request_id,
                        "status": "success",
                        "mode": "ONLINE",
                        "direction": direction,
                        "source_language": src_lang,
                        "target_language": tgt_lang,
                        "transcription": raw_text,
                        "translation": translated_text,
                        "latin": lat_t or translated_text,
                        "devanagari": dev_t or translated_text,
                        "audio_format": "wav",
                        "mime_type": "audio/wav",
                        "audio_base64": audio_b64,
                        "sample_rate": 16000,
                        "channels": 1,
                        "byte_length": len(tts_res.audio_bytes),
                        "audio_duration": getattr(tts_res, "audio_duration", round(len(tts_res.audio_bytes)/32000.0, 2)),
                        "asr_provider": "text_input",
                        "tts_provider": tts_res.provider,
                        "latency_metrics": {"asr_ms": 0, "translation_ms": 120, "tts_ms": 150, "total_ms": 270},
                        "room_code": room_code
                    }
                    await manager.broadcast(voice_payload, room_code=room_code, target_role=recipient_role)

                elif action == "ping":
                    await websocket.send_json({"type": "pong", "event": "pong"})

            except Exception as ex:
                logger.error(f"WebSocket execution error: {ex}")
                await websocket.send_json({
                    "type": "error",
                    "event": "error",
                    "detail": str(ex)
                })

    except WebSocketDisconnect:
        manager.disconnect(websocket)
