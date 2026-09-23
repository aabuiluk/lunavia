from fastapi import FastAPI, HTTPException, status, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
import sqlite3

app = FastAPI(title="Lunavia API")

# Настройка CORS, чтобы React-фронтенд мог свободно отправлять запросы на бэкенд
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешаем запросы с любых доменов (для разработки)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Хэширование паролей
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# Инициализация единой базы данных SQLite для проекта
def init_db():
    conn = sqlite3.connect("lunavia.db")
    cursor = conn.cursor()

    # Таблица пользователей (для регистрации)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    """)

    # Таблица тикетов поддержки
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS support_tickets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Таблица базы знаний (FAQ)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS faq_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT NOT NULL,
            answer TEXT NOT NULL
        )
    """)

    # Добавим базовые вопросы, если таблица пустая
    cursor.execute("SELECT COUNT(*) FROM faq_items")
    if cursor.fetchone()[0] == 0:
        sample_faqs = [
            ("Is travel insurance included in my booking?",
             "Coverage depends on your insurance provider and the specific policy attached to your booking."),
            ("How can I change or cancel my travel route?",
             "You can modify or cancel your tickets directly through your account dashboard or by contacting our 24/7 support team."),
            ("What payment methods are supported?",
             "We accept credit cards, bank transfers, and major payment systems including Google Pay and Apple Pay.")
        ]
        cursor.executemany("INSERT INTO faq_items (question, answer) VALUES (?, ?)", sample_faqs)

    conn.commit()
    conn.close()


init_db()


# Pydantic модели для проверки данных
class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str


class SupportTicketCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str


# Эндпоинт регистрации
@app.post("/api/register", status_code=status.HTTP_201_CREATED)
def register_user(user: UserRegister):
    conn = sqlite3.connect("lunavia.db")
    cursor = conn.cursor()

    cursor.execute("SELECT id FROM users WHERE email = ?", (user.email,))
    if cursor.fetchone():
        conn.close()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Пользователь с таким email уже зарегистрирован"
        )

    hashed_password = pwd_context.hash(user.password)
    cursor.execute(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        (user.name, user.email, hashed_password)
    )
    conn.commit()
    conn.close()

    return {"message": "Регистрация прошла успешно!", "email": user.email}


# Эндпоинт отправки тикета в поддержку
@app.post("/api/support/ticket", status_code=status.HTTP_201_CREATED)
def create_support_ticket(ticket: SupportTicketCreate):
    conn = sqlite3.connect("lunavia.db")
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO support_tickets (name, email, subject, message) VALUES (?, ?, ?, ?)",
        (ticket.name, ticket.email, ticket.subject, ticket.message)
    )
    conn.commit()
    conn.close()
    return {"message": "Your support request has been successfully sent!"}


# Эндпоинт поиска по FAQ
@app.get("/api/support/faq")
def search_faq(q: str = Query("", description="Search query")):
    conn = sqlite3.connect("lunavia.db")
    cursor = conn.cursor()
    if q:
        cursor.execute(
            "SELECT id, question, answer FROM faq_items WHERE question LIKE ? OR answer LIKE ?",
            (f"%{q}%", f"%{q}%")
        )
    else:
        cursor.execute("SELECT id, question, answer FROM faq_items")
    rows = cursor.fetchall()
    conn.close()
    results = [{"id": r[0], "question": r[1], "answer": r[2]} for r in rows]
    return {"query": q, "results": results}
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)