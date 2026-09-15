"""Tours page API skeleton. Mirror of `src/pages/ToursPage.jsx` content."""

from fastapi import APIRouter

from backend import store
from backend.schemas.pages import ToursPage

page_meta = {
    "slug": "tours",
    "path": "/tours",
    "title": "Tours",
    "order": 2,
    "summary": "Tour catalog and packages — ready for a student build-out.",
    "api": "/api/tours",
}

router = APIRouter()


@router.get("", response_model=ToursPage)
def get_tours() -> ToursPage:
    return ToursPage.model_validate(store.dump("tours"))
