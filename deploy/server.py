"""WSGI entry for PythonAnywhere.

Prefers FastAPI (ASGI) wrapped with a2wsgi. If those packages are missing,
falls back to Flask: SPA + GET /api/<slug> from backend/data JSON files.
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
    from flask import Flask, abort, send_from_directory

    app = Flask(__name__, static_folder=None)

    @app.get("/api/health")
    def health():
        return {"status": "ok", "engine": "flask-fallback"}

    @app.get("/api/pages")
    def api_pages():
        if not DATA.is_dir():
            return []
        pages = []
        for file in sorted(DATA.glob("*.json")):
            pages.append({"slug": file.stem, "api": f"/api/{file.stem}"})
        return pages

    @app.get("/api/<slug>")
    def api_slug(slug: str):
        target = DATA / f"{slug}.json"
        if not target.is_file():
            abort(404)
        payload = json.loads(target.read_text(encoding="utf-8"))
        return payload

    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
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
