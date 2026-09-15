"""In-memory page store seeded from JSON files in `backend/data/`."""
from __future__ import annotations

import copy
import json
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parent / "data"

_cache: dict[str, dict] = {}


def _path(slug: str) -> Path:
    return DATA_DIR / f"{slug}.json"


def load(slug: str) -> dict:
    if slug not in _cache:
        path = _path(slug)
        if not path.is_file():
            raise FileNotFoundError(f"Missing page data: {path}")
        _cache[slug] = json.loads(path.read_text(encoding="utf-8"))
    return _cache[slug]


def dump(slug: str) -> dict:
    return copy.deepcopy(load(slug))


def save(slug: str, data: dict) -> dict:
    _cache[slug] = copy.deepcopy(data)
    path = _path(slug)
    path.write_text(
        json.dumps(_cache[slug], ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    return dump(slug)
