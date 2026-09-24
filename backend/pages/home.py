"""Home page API skeleton. Mirror of `src/pages/HomePage.jsx` content."""

from fastapi import APIRouter

from backend import store
from backend.schemas.pages import HomePage

page_meta = {
    "slug": "home",
    "path": "/",
    "title": "Home",
    "order": 1,
    "summary": "Start here — Lunavia’s welcome page and travel promise.",
    "api": "/api/home",
}

router = APIRouter()


@router.get("", response_model=HomePage)
def get_home() -> HomePage:
    return HomePage.model_validate(store.dump("home"))
