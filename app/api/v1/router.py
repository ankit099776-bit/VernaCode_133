from fastapi import APIRouter
from app.api.v1.endpoints import router as voice_router
from app.api.v1.websocket import ws_router, manager

api_v1_router = APIRouter()
api_v1_router.include_router(voice_router, prefix="", tags=["Voice Translation"])
api_v1_router.include_router(ws_router, prefix="", tags=["WebSocket Stream"])
