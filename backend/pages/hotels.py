from fastapi import APIRouter
from backend import store
from backend.schemas.hotels import HotelsPage

page_meta = {
    "slug": "hotels",
    "path": "/hotels",
    "title": "Hotels",
    "order": 3,
    "summary": "Hotel catalog with filters, backed by backend/data/hotels.json.",
    "api": "/api/hotels",
}

router = APIRouter()

@router.get("", response_model=HotelsPage)
def get_hotels() -> HotelsPage:
    return HotelsPage.model_validate(store.dump("hotels"))