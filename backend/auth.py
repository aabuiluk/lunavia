"""FastAPI wrappers around stdlib admin sessions. Default: admin / admin."""
from __future__ import annotations

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from backend.sessions import AuthError
from backend.sessions import login as session_login
from backend.sessions import logout as session_logout
from backend.sessions import username_for

_bearer = HTTPBearer(auto_error=False)


def login(username: str, password: str) -> str:
    try:
        return session_login(username, password)
    except AuthError as exc:
        raise HTTPException(exc.status_code, exc.message) from exc


def logout(token: str) -> None:
    session_logout(token)


def require_token(
    creds: HTTPAuthorizationCredentials | None = Depends(_bearer),
) -> str:
    token = creds.credentials if creds else None
    try:
        username_for(token)
    except AuthError as exc:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, exc.message) from exc
    return token or ""


def require_admin(token: str = Depends(require_token)) -> str:
    return username_for(token)
