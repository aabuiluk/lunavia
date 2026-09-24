from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sqlite3
import os
import uvicorn

app = FastAPI()

# Абсолютный путь к БД, чтобы PythonAnywhere не терял файл в своей файловой системе
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "lunavia.db")

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

# Модель для тикетов поддержки
class TicketModel(BaseModel):
    name: str = None
    email: str
    subject: str = None
    message: str

@app.post("/api/support/ticket")
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

# Эндпоинт для FAQ
@app.get("/api/support/faq")
def get_faqs(q: str = ""):
    faqs = [
        {"id": 1, "question": "How to book a trip?", "answer": "You can plan a trip using our main planner."},
        {"id": 2, "question": "What is Lunavia?", "answer": "Lunavia is your route to everywhere with less logistics."}
    ]
    if q:
        query = q.lower()
        faqs = [f for f in faqs if query in f["question"].lower() or query in f["answer"].lower()]
    return {"results": faqs}

if __name__ == "__main__":
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)