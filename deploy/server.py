"""Minimal Flask app that serves the Vite React build with SPA fallback."""
from __future__ import annotations

import os

from flask import Flask, send_from_directory

ROOT = os.path.dirname(os.path.abspath(__file__))
DIST = os.path.join(ROOT, "dist")

application = Flask(__name__, static_folder=None)


@application.route("/", defaults={"path": ""})
@application.route("/<path:path>")
def spa(path: str):
    target = os.path.join(DIST, path)
    if path and os.path.isfile(target):
        return send_from_directory(DIST, path)
    return send_from_directory(DIST, "index.html")
