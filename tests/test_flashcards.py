import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_flashcards():
    response = client.get("/api/v1/flashcards")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 11

def test_create_and_delete_flashcard():
    # 1. Create a new flashcard
    new_card_payload = {
        "hindi": "मोर",
        "santali": "ᱢᱟᱨᱟᱜ",
        "category": "पक्षी ( ᱪᱮᱬᱮ )",
        "image": "🦚",
        "description": "मोर - सुंदर राष्ट्रीय पक्षी",
        "transliteration": "Marag"
    }
    
    create_resp = client.post("/api/v1/flashcards", json=new_card_payload)
    assert create_resp.status_code == 200
    create_data = create_resp.json()
    assert create_data["status"] == "success"
    created_card = create_data["flashcard"]
    assert created_card["hindi"] == "मोर"
    assert created_card["santali"] == "ᱢᱟᱨᱟᱜ"
    card_id = created_card["id"]

    # 2. Verify it appears in GET /api/v1/flashcards
    get_resp = client.get("/api/v1/flashcards")
    assert get_resp.status_code == 200
    all_cards = get_resp.json()
    assert any(c["id"] == card_id for c in all_cards)

    # 3. Delete the created flashcard
    delete_resp = client.delete(f"/api/v1/flashcards/{card_id}")
    assert delete_resp.status_code == 200
    delete_data = delete_resp.json()
    assert delete_data["status"] == "success"

    # 4. Verify it no longer exists
    get_resp2 = client.get("/api/v1/flashcards")
    all_cards2 = get_resp2.json()
    assert not any(c["id"] == card_id for c in all_cards2)
