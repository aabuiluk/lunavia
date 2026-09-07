#!/usr/bin/env python3
"""Upload the Vite build + Flask SPA server to PythonAnywhere and reload."""
from __future__ import annotations

import os
import sys
import time
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
SERVER = Path(__file__).resolve().parent / "server.py"

USERNAME = os.environ.get("PYTHONANYWHERE_USERNAME", "cscai")
TOKEN = os.environ.get("PYTHONANYWHERE_API_TOKEN", "")
HOST = os.environ.get("PYTHONANYWHERE_HOST", "www.pythonanywhere.com")
DOMAIN = os.environ.get(
    "PYTHONANYWHERE_DOMAIN", f"{USERNAME}.pythonanywhere.com"
)
REMOTE_ROOT = os.environ.get("PYTHONANYWHERE_REMOTE_ROOT", f"/home/{USERNAME}/lunavia")

BASE = f"https://{HOST}/api/v0/user/{USERNAME}"
HEADERS = {"Authorization": f"Token {TOKEN}"}


def fail(msg: str) -> None:
    print(msg, file=sys.stderr)
    sys.exit(1)


def post_file(remote_path: str, local: Path) -> None:
    with local.open("rb") as fh:
        for attempt in range(5):
            fh.seek(0)
            resp = requests.post(
                f"{BASE}/files/path{remote_path}",
                headers=HEADERS,
                files={"content": (local.name, fh)},
                timeout=120,
            )
            if resp.status_code in (200, 201):
                print(f"OK {resp.status_code} {remote_path}")
                return
            if resp.status_code == 429:
                time.sleep(2 + attempt * 2)
                continue
            fail(f"Upload failed {resp.status_code} {remote_path}: {resp.text[:400]}")
    fail(f"Rate-limited uploading {remote_path}")


def main() -> None:
    if not TOKEN:
        fail("PYTHONANYWHERE_API_TOKEN is required")
    if not DIST.is_dir():
        fail(f"Missing build output: {DIST} (run npm run build first)")
    if not SERVER.is_file():
        fail(f"Missing server: {SERVER}")

    uploads: list[tuple[Path, str]] = [
        (SERVER, f"{REMOTE_ROOT}/server.py"),
    ]
    for path in sorted(DIST.rglob("*")):
        if path.is_file():
            rel = path.relative_to(DIST).as_posix()
            uploads.append((path, f"{REMOTE_ROOT}/dist/{rel}"))

    print(f"Uploading {len(uploads)} files to {REMOTE_ROOT}")
    for local, remote in uploads:
        post_file(remote, local)

    wsgi = f'''import sys

path = "{REMOTE_ROOT}"
if path not in sys.path:
    sys.path.insert(0, path)

from server import application
'''
    resp = requests.post(
        f"{BASE}/files/path/var/www/{USERNAME}_pythonanywhere_com_wsgi.py",
        headers=HEADERS,
        files={"content": ("wsgi.py", wsgi.encode("utf-8"))},
        timeout=60,
    )
    if resp.status_code not in (200, 201):
        fail(f"WSGI update failed {resp.status_code}: {resp.text[:400]}")
    print(f"WSGI OK {resp.status_code}")

    resp = requests.patch(
        f"{BASE}/webapps/{DOMAIN}/",
        headers=HEADERS,
        data={"source_directory": REMOTE_ROOT},
        timeout=60,
    )
    if resp.status_code != 200:
        fail(f"Webapp patch failed {resp.status_code}: {resp.text[:400]}")
    print("Webapp source_directory updated")

    resp = requests.post(
        f"{BASE}/webapps/{DOMAIN}/reload/",
        headers=HEADERS,
        timeout=60,
    )
    if resp.status_code != 200:
        fail(f"Reload failed {resp.status_code}: {resp.text[:400]}")
    print(f"Reloaded https://{DOMAIN}/")


if __name__ == "__main__":
    main()
