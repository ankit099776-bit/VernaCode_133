import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app, follow_redirects=False)

def test_root_redirects_to_login():
    response = client.get("/")
    assert response.status_code in (200, 302, 307)
    if response.status_code in (302, 307):
        assert response.headers["location"] == "/login"

def test_teacher_login_success():
    payload = {
        "username": "teacher@bhashasetu.edu.in",
        "password": "teacher123",
        "role": "teacher"
    }
    response = client.post("/api/v1/auth/login", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert data["role"] == "teacher"
    assert data["redirect_url"] == "/teacher"
    assert "token" in data
    assert data["name"] == "शिक्षक (Teacher)"

def test_teacher_login_alt_credentials():
    payload = {
        "username": "teacher@bhashasetu.edu.in",
        "password": "bhasha2026",
        "role": "teacher"
    }
    response = client.post("/api/v1/auth/login", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"

def test_student_login_success():
    payload = {
        "username": "student@bhashasetu.edu.in",
        "password": "student123",
        "role": "student"
    }
    response = client.post("/api/v1/auth/login", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert data["role"] == "student"
    assert "/student/classroom" in data["redirect_url"]
    assert "token" in data

def test_student_login_by_name():
    payload = {
        "username": "Sumitra Hembram",
        "password": "1234",
        "role": "student"
    }
    response = client.post("/api/v1/auth/login", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"

def test_invalid_password():
    payload = {
        "username": "teacher@bhashasetu.edu.in",
        "password": "12",
        "role": "teacher"
    }
    response = client.post("/api/v1/auth/login", json=payload)
    assert response.status_code == 401
    data = response.json()
    assert "detail" in data

def test_invalid_role():
    payload = {
        "username": "teacher@bhashasetu.edu.in",
        "password": "teacher123",
        "role": "invalid_role"
    }
    response = client.post("/api/v1/auth/login", json=payload)
    assert response.status_code in (400, 401)
