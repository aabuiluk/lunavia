"""Home page content for the hero, route map, and destinations."""

import json
import unicodedata
from functools import lru_cache
from pathlib import Path

from fastapi import APIRouter

from backend import store
from backend.schemas.pages import HomeAirport, HomePage

page_meta = {
    "slug": "home",
    "path": "/",
    "title": "Home",
    "order": 1,
    "summary": "Start here — Lunavia’s welcome page and travel promise.",
    "api": "/api/home",
}

router = APIRouter()


@lru_cache(maxsize=1)
def airport_data() -> list[dict]:
    # Public-domain OurAirports snapshot, 24 September 2026: https://ourairports.com/data/
    path = Path(__file__).resolve().parent.parent / "data" / "airports.json"
    return json.loads(path.read_text(encoding="utf-8"))


def normalize(value: str) -> str:
    return "".join(
        char for char in unicodedata.normalize("NFKD", value.casefold())
        if not unicodedata.combining(char)
    )


@router.get("/airports", response_model=list[HomeAirport])
def search_airports(query: str = "") -> list[HomeAirport]:
    term = normalize(query.strip())[:60]
    if len(term) < 2:
        return []

    def priority(row: dict) -> tuple[int, int, str]:
        city = normalize(row["city"])
        name = normalize(row["airport"])
        if row["code"].casefold() == term or city == term:
            rank = 0
        elif city.startswith(term) or row["code"].casefold().startswith(term):
            rank = 1
        elif term in city:
            rank = 2
        elif term in name:
            rank = 3
        else:
            rank = 4
        size = {"large_airport": 0, "medium_airport": 1, "small_airport": 2}[row["type"]]
        return rank, size, city

    matches = [row for row in airport_data() if priority(row)[0] < 4]
    matches.sort(key=priority)
    return [
        HomeAirport(
            city=row["city"], airport=row["airport"], country=row["country"],
            code=row["code"], label=f'{row["city"]} ({row["code"]})',
        )
        for row in matches[:12]
    ]


@router.get("", response_model=HomePage)
def get_home() -> HomePage:
    return HomePage.model_validate(store.dump("home"))
