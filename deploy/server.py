"""WSGI entry for PythonAnywhere.

Prefers FastAPI (ASGI) wrapped with a2wsgi. If those packages are missing,
falls back to Flask: SPA + page JSON APIs + admin login/save.
"""
from __future__ import annotations

import json
import os
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent


def find_root() -> Path:
    if (HERE / "backend").is_dir():
        return HERE
    if (HERE.parent / "backend").is_dir():
        return HERE.parent
    return HERE


ROOT = find_root()
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

DIST = ROOT / "dist"
if not DIST.is_dir():
    DIST = HERE / "dist"

DATA = ROOT / "backend" / "data"


def flask_application():
    from flask import Flask, abort, request, send_from_directory

    from backend import store
    from backend.sessions import AuthError, login, logout, username_for

    app = Flask(__name__, static_folder=None)

    def bearer() -> str | None:
        header = request.headers.get("Authorization", "")
        if header.startswith("Bearer "):
            return header[7:].strip() or None
        return None

    def admin_user():
        try:
            return username_for(bearer()), None
        except AuthError as exc:
            return None, ({"detail": exc.message}, exc.status_code)

    def page_list() -> list[dict]:
        if not DATA.is_dir():
            return []
        pages = []
        for file in sorted(DATA.glob("*.json")):
            pages.append(
                {
                    "slug": file.stem,
                    "title": file.stem.replace("-", " ").title(),
                    "path": "/" if file.stem == "home" else f"/{file.stem}",
                    "api": f"/api/{file.stem}",
                    "order": 100,
                    "summary": "",
                }
            )
        return pages

    @app.get("/api/health")
    def health():
        return {"status": "ok", "engine": "flask-fallback"}

    @app.get("/api/pages")
    def api_pages():
        return page_list()

    @app.post("/api/admin/login")
    def admin_login():
        body = request.get_json(silent=True) or {}
        try:
            token = login(str(body.get("username") or ""), str(body.get("password") or ""))
        except AuthError as exc:
            return {"detail": exc.message}, exc.status_code
        return {"token": token, "username": body.get("username")}

    @app.post("/api/admin/logout")
    def admin_logout():
        _user, err = admin_user()
        if err:
            return err
        token = bearer()
        if token:
            logout(token)
        return ("", 204)

    @app.get("/api/admin/me")
    def admin_me():
        user, err = admin_user()
        if err:
            return err
        return {"username": user}

    @app.get("/api/admin/pages")
    def admin_pages():
        _user, err = admin_user()
        if err:
            return err
        return page_list()

    @app.put("/api/admin/pages/<slug>")
    def admin_save(slug: str):
        _user, err = admin_user()
        if err:
            return err
        body = request.get_json(silent=True)
        if not isinstance(body, dict):
            return {"detail": "JSON object required"}, 400
        try:
            store.dump(slug)
        except FileNotFoundError:
            return {"detail": f"Unknown page '{slug}'"}, 404
        return store.save(slug, body)

    @app.get("/api/<slug>")
    def api_slug(slug: str):
        try:
            return store.dump(slug)
        except FileNotFoundError:
            abort(404)

    @app.route("/", defaults={"path": ""}, methods=["GET", "HEAD"])
    @app.route("/<path:path>", methods=["GET", "HEAD"])
    def spa(path: str):
        target = os.path.join(DIST, path)
        if path and os.path.isfile(target):
            return send_from_directory(DIST, path)
        return send_from_directory(DIST, "index.html")

    return app


try:
    from backend.wsgi import application
except ImportError:
    application = flask_application()
