"""Lunavia FastAPI app — page routers, health, optional SPA static files."""
from __future__ import annotations

import os
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from backend.registry import discover_pages

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
API_ONLY = os.getenv("LUNAVIA_API_ONLY", "").lower() in {"1", "true", "yes"}

pages = discover_pages()

app = FastAPI(
    title="Lunavia API",
    summary="Page-based API for the Lunavia site. Copy backend/pages/template.py to add a route.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok", "engine": "fastapi", "pages": len(pages)}


@app.get("/api/pages")
def list_pages() -> list[dict]:
    return [page.as_dict() for page in pages]


for page in pages:
    app.include_router(page.router, prefix=page.api, tags=[page.title])


if DIST.is_dir() and not API_ONLY:
    assets = DIST / "assets"
    if assets.is_dir():
        app.mount("/assets", StaticFiles(directory=assets), name="assets")

    @app.get("/{full_path:path}")
    def spa(full_path: str):
        target = DIST / full_path
        if full_path and target.is_file():
            return FileResponse(target)
        return FileResponse(DIST / "index.html")
