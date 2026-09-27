from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import sqlite3
import os

router = APIRouter()

page_meta = {
    "slug": "support",
    "path": "/support",
    "title": "Support",
    "order": 5,
    "summary": "Help with bookings, routes, and travel questions.",
    "api": "/api/support",
}

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Корректный путь к базе данных в корне проекта
DB_PATH = os.path.normpath(os.path.join(BASE_DIR, "../../lunavia.db"))

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS support_tickets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT NOT NULL,
            subject TEXT,
            message TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()

init_db()

class TicketModel(BaseModel):
    name: str = None
    email: str
    subject: str = None
    message: str

@router.post("/ticket")
def create_support_ticket(ticket: TicketModel):
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO support_tickets (name, email, subject, message) VALUES (?, ?, ?, ?)",
            (ticket.name, ticket.email, ticket.subject, ticket.message)
        )
        conn.commit()
        conn.close()
        return {"status": "success", "message": "Ticket received successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/faq")
def get_faqs(q: str = ""):
    faqs = [
        {"id": 1, "question": "How to book a trip?", "answer": "You can plan a trip using our main planner."},
        {"id": 2, "question": "What is Lunavia?", "answer": "Lunavia is your route to everywhere with less logistics."}
    ]
    if q:
        query = q.lower()
        faqs = [f for f in faqs if query in f["question"].lower() or query in f["answer"].lower()]
    return {"results": faqs}
