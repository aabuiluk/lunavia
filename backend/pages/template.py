"""
Page template — copy this file when adding a new site page.

1. Duplicate this module as `yourpage.py`
2. Duplicate `backend/data/template.json` as `yourpage.json`
3. Duplicate `src/pages/TemplatePage.jsx` and point `useApi` at `/api/yourpage`
4. Keep `page_meta.slug`, the JSON filename, and the URL prefix in sync

The registry picks up any module here that exports `page_meta` and `router`.
"""

from fastapi import APIRouter

from backend import store
from backend.schemas.template import TemplatePage

page_meta = {
    "slug": "template",
    "path": "/template",
    "title": "Page template",
    "order": 90,
    "summary": "Copy-this frontend + API starter for new site pages.",
    "api": "/api/template",
}

router = APIRouter()


@router.get("", response_model=TemplatePage)
def get_template() -> TemplatePage:
    return TemplatePage.model_validate(store.dump("template"))
