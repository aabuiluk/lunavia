"""Stdlib admin sessions. Used by FastAPI and the Flask production fallback."""
from __future__ import annotations

import os
import secrets

ADMIN_USER = os.getenv("LUNAVIA_ADMIN_USER", "admin")
ADMIN_PASSWORD = os.getenv("LUNAVIA_ADMIN_PASSWORD", "admin")

_sessions: dict[str, str] = {}


class AuthError(Exception):
    def __init__(self, message: str, status_code: int = 401) -> None:
        super().__init__(message)
        self.message = message
        self.status_code = status_code


def login(username: str, password: str) -> str:
    if username != ADMIN_USER or password != ADMIN_PASSWORD:
        raise AuthError("Invalid credentials")
    token = secrets.token_urlsafe(32)
    _sessions[token] = username
    return token


def logout(token: str) -> None:
    _sessions.pop(token, None)


def username_for(token: str | None) -> str:
    if not token or token not in _sessions:
        raise AuthError("Admin login required")
    return _sessions[token]
