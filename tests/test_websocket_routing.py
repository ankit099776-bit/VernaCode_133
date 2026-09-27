import pytest
import base64
import json
import asyncio
from app.api.v1.websocket import ConnectionManager

class MockWebSocket:
    def __init__(self, role: str):
        self.role = role
        self.sent_messages = []

    async def accept(self):
        pass

    async def send_json(self, data: dict):
        self.sent_messages.append(data)

@pytest.mark.asyncio
async def test_room_role_routing():
    manager = ConnectionManager()
    ws_teacher = MockWebSocket("teacher")
    ws_student = MockWebSocket("student")

    await manager.connect(ws_teacher, room_code="BHASA-204", role="teacher")
    await manager.connect(ws_student, room_code="BHASA-204", role="student")

    assert len(manager.room_connections["BHASA-204"]) == 2

    # Broadcast message specifically targeted to students
    student_payload = {
        "type": "voice_translation",
        "event": "voice_translation",
        "direction": "teacher_to_student",
        "audio_base64": "mock_audio_data"
    }
    await manager.broadcast(student_payload, room_code="BHASA-204", target_role="student")

    # Teacher should NOT have received student's voice translation
    teacher_voice_msgs = [m for m in ws_teacher.sent_messages if m.get("type") == "voice_translation"]
    assert len(teacher_voice_msgs) == 0

    # Student SHOULD have received student's voice translation
    student_voice_msgs = [m for m in ws_student.sent_messages if m.get("type") == "voice_translation"]
    assert len(student_voice_msgs) == 1
    assert student_voice_msgs[0]["direction"] == "teacher_to_student"

@pytest.mark.asyncio
async def test_reverse_room_role_routing():
    manager = ConnectionManager()
    ws_teacher = MockWebSocket("teacher")
    ws_student = MockWebSocket("student")

    await manager.connect(ws_teacher, room_code="BHASA-204", role="teacher")
    await manager.connect(ws_student, room_code="BHASA-204", role="student")

    # Broadcast message specifically targeted to teacher
    teacher_payload = {
        "type": "voice_translation",
        "event": "voice_translation",
        "direction": "student_to_teacher",
        "audio_base64": "mock_audio_data"
    }
    await manager.broadcast(teacher_payload, room_code="BHASA-204", target_role="teacher")

    # Teacher SHOULD have received teacher's voice translation
    teacher_voice_msgs = [m for m in ws_teacher.sent_messages if m.get("type") == "voice_translation"]
    assert len(teacher_voice_msgs) == 1

    # Student should NOT have received teacher's voice translation
    student_voice_msgs = [m for m in ws_student.sent_messages if m.get("type") == "voice_translation"]
    assert len(student_voice_msgs) == 0
