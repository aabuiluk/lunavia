from fastapi.testclient import TestClient
from server import app

client = TestClient(app)

def test_get_faq():
    response = client.get("/api/support/faq")
    assert response.status_code == 200
    data = response.json()
    assert "results" in data
    assert isinstance(data["results"], list)

def test_get_faq_with_query():

    response = client.get("/api/support/faq?q=book")
    assert response.status_code == 200
    data = response.json()
    assert "results" in data
    found = any("book" in item["question"].lower() for item in data["results"])
    assert found

def test_create_support_ticket():
    ticket_data = {
        "name": "Alex",
        "email": "test@example.com",
        "subject": "Bug report",
        "message": "Nothing works, help!"
    }
    response = client.post("/api/support/ticket", json=ticket_data)
    assert response.status_code == 200
    assert response.json() == {"status": "success", "message": "Ticket received successfully"}

def test_create_ticket_validation_error():
    invalid_ticket_data = {
        "name": "Alex",
        "subject": "No email here",
        "message": "Test message"
    }
    response = client.post("/api/support/ticket", json=invalid_ticket_data)
    assert response.status_code == 422