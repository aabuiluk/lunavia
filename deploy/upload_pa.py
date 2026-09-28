#!/usr/bin/env python3
"""Upload the Vite build + backend + WSGI server to PythonAnywhere and reload."""
from __future__ import annotations

import os
import sys
import time
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
SERVER = Path(__file__).resolve().parent / "server.py"
BACKEND = ROOT / "backend"
REQUIREMENTS = ROOT / "requirements.txt"

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


class ApiTimeout(Exception):
    pass


def call_api(method: str, url: str, *, what: str, ok: tuple[int, ...] = (200,), **kwargs):
    """Call the PythonAnywhere API, retrying timeouts and rate limits."""
    attempts = 4
    for attempt in range(attempts):
        try:
            resp = requests.request(method, url, headers=HEADERS, timeout=180, **kwargs)
        except requests.RequestException as exc:
            wait = min(30, 5 * (attempt + 1))
            print(f"{what} attempt {attempt + 1}/{attempts} failed: {exc}; sleep {wait}s")
            time.sleep(wait)
            continue
        if resp.status_code in ok:
            return resp
        if resp.status_code == 429:
            wait = min(60, 10 * (attempt + 1))
            print(f"{what} 429; sleep {wait}s (attempt {attempt + 1}/{attempts})")
            time.sleep(wait)
            continue
        fail(f"{what} failed {resp.status_code}: {resp.text[:400]}")
    raise ApiTimeout(f"{what} failed after {attempts} attempts")


def post_file(remote_path: str, local: Path) -> None:
    size_mb = local.stat().st_size / (1024 * 1024)

    for attempt in range(12):
        try:
            with local.open("rb") as fh:
                resp = requests.post(
                    f"{BASE}/files/path{remote_path}",
                    headers=HEADERS,
                    files={"content": (local.name, fh)},
                    timeout=180,
                )
        except requests.RequestException as exc:
            wait = min(60, 5 * (attempt + 1))
            print(
                f"Upload exception {remote_path}: {exc}; "
                f"sleep {wait}s (attempt {attempt + 1}/12)",
                flush=True,
            )
            time.sleep(wait)
            continue

        if resp.status_code in (200, 201):
            print(f"OK {resp.status_code} {remote_path}", flush=True)
            time.sleep(0.5)
            return

        if resp.status_code == 429:
            retry_after = resp.headers.get("Retry-After")

            if retry_after and retry_after.isdigit():
                wait = int(retry_after)
            else:
                wait = min(90, 10 * (attempt + 1))

            print(
                f"429 {remote_path} ({size_mb:.1f} MB); "
                f"sleep {wait}s (attempt {attempt + 1}/12)",
                flush=True,
            )
            time.sleep(wait)
            continue

        if resp.status_code in (500, 502, 503, 504):
            wait = min(90, 5 * (attempt + 1))

            print(
                f"Server error {resp.status_code} for {remote_path} "
                f"({size_mb:.1f} MB); "
                f"sleep {wait}s (attempt {attempt + 1}/12)",
                flush=True,
            )

            print(resp.text[:500], flush=True)

            time.sleep(wait)
            continue

        fail(
            f"Upload failed {resp.status_code} {remote_path}: "
            f"{resp.text[:500]}"
        )

    fail(f"Could not upload {remote_path} after 12 attempts")

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
    if REQUIREMENTS.is_file():
        uploads.append((REQUIREMENTS, f"{REMOTE_ROOT}/requirements.txt"))
    if BACKEND.is_dir():
        for path in sorted(BACKEND.rglob("*")):
            if not path.is_file():
                continue
            if "__pycache__" in path.parts or path.suffix == ".pyc":
                continue
            rel = path.relative_to(BACKEND).as_posix()
            uploads.append((path, f"{REMOTE_ROOT}/backend/{rel}"))
    for path in sorted(DIST.rglob("*")):
        if path.is_file():
            rel = path.relative_to(DIST).as_posix()
            uploads.append((path, f"{REMOTE_ROOT}/dist/{rel}"))

    print(f"Uploading {len(uploads)} files to {REMOTE_ROOT}", flush=True)
    for local, remote in uploads:
        post_file(remote, local)

    wsgi = f'''import sys

path = "{REMOTE_ROOT}"
if path not in sys.path:
    sys.path.insert(0, path)

from server import application
'''
    resp = call_api(
        "POST",
        f"{BASE}/files/path/var/www/{USERNAME}_pythonanywhere_com_wsgi.py",
        what="WSGI update",
        ok=(200, 201),
        files={"content": ("wsgi.py", wsgi.encode("utf-8"))},
    )
    print(f"WSGI OK {resp.status_code}")

    call_api(
        "PATCH",
        f"{BASE}/webapps/{DOMAIN}/",
        what="Webapp update",
        data={"source_directory": REMOTE_ROOT},
    )
    print("Webapp source_directory updated")

    try:
        call_api("POST", f"{BASE}/webapps/{DOMAIN}/reload/", what="Reload")
    except ApiTimeout as exc:
        # PythonAnywhere often reloads the app and then drops the HTTP response.
        health = requests.get(f"https://{DOMAIN}/api/health", timeout=30)
        if health.status_code != 200:
            fail(f"{exc}; health returned {health.status_code}")
        print(f"Reload response timed out, but https://{DOMAIN}/api/health is {health.status_code}")
    print(f"Reloaded https://{DOMAIN}/")


if __name__ == "__main__":
    main()
