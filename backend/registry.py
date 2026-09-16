"""Auto-discover FastAPI page modules next to `backend/pages/`."""
from __future__ import annotations

import importlib
import pkgutil
from dataclasses import dataclass
from types import ModuleType

from fastapi import APIRouter

from backend import pages as pages_pkg


@dataclass(frozen=True)
class BackendPage:
    slug: str
    path: str
    title: str
    order: int
    summary: str
    api: str
    router: APIRouter
    module: ModuleType

    def as_dict(self) -> dict:
        return {
            "slug": self.slug,
            "path": self.path,
            "title": self.title,
            "order": self.order,
            "summary": self.summary,
            "api": self.api,
        }


def discover_pages() -> list[BackendPage]:
    found: list[BackendPage] = []
    for info in pkgutil.iter_modules(pages_pkg.__path__):
        if info.name.startswith("_"):
            continue
        module = importlib.import_module(f"{pages_pkg.__name__}.{info.name}")
        meta = getattr(module, "page_meta", None)
        router = getattr(module, "router", None)
        if not isinstance(meta, dict) or router is None:
            continue
        slug = str(meta.get("slug") or info.name)
        found.append(
            BackendPage(
                slug=slug,
                path=str(meta["path"]),
                title=str(meta["title"]),
                order=int(meta.get("order", 100)),
                summary=str(meta.get("summary", "")),
                api=str(meta.get("api", f"/api/{slug}")),
                router=router,
                module=module,
            )
        )
    found.sort(key=lambda page: (page.order, page.title))
    return found
