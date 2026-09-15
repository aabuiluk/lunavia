"""Demo admin auth. Default credentials: admin / admin."""
from __future__ import annotations

import os
import secrets

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

ADMIN_USER = os.getenv("LUNAVIA_ADMIN_USER", "admin")
ADMIN_PASSWORD = os.getenv("LUNAVIA_ADMIN_PASSWORD", "admin")

_bearer = HTTPBearer(auto_error=False)
_sessions: dict[str, str] = {}


def login(username: str, password: str) -> str:
    if username != ADMIN_USER or password != ADMIN_PASSWORD:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid credentials")
    token = secrets.token_urlsafe(32)
    _sessions[token] = username
    return token


def logout(token: str) -> None:
    _sessions.pop(token, None)


def require_token(
    creds: HTTPAuthorizationCredentials | None = Depends(_bearer),
) -> str:
    if creds is None or creds.credentials not in _sessions:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Admin login required")
    return creds.credentials


def require_admin(token: str = Depends(require_token)) -> str:
    return _sessions[token]
