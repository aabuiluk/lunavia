
"""Airline Tickets page API."""

import json
import unicodedata
from functools import lru_cache
from pathlib import Path

from fastapi import APIRouter, Query

from backend import store
from backend.schemas.airline_tickets import AirlineTicketsPage


page_meta = {
    "slug": "airline-tickets",
    "path": "/airline-tickets",
    "title": "Airline Tickets",
    "order": 3,
    "summary": "Search and browse available airline tickets.",
    "api": "/api/airline-tickets",
}

router = APIRouter()


@lru_cache(maxsize=1)
def airport_data() -> list[dict]:
    path = Path(__file__).resolve().parent.parent / "data" / "airports.json"
    return json.loads(path.read_text(encoding="utf-8"))


def normalize(value: str) -> str:
    return "".join(
        char for char in unicodedata.normalize("NFKD", value.casefold())
        if not unicodedata.combining(char)
    )


@router.get("/airports")
def search_airports(query: str = "") -> list[dict]:
    """Same city and IATA-code suggestions as the home page search."""
    term = normalize(query.strip())[:60]
    if len(term) < 2:
        return []

    def priority(row: dict) -> tuple[int, int, str]:
        city = normalize(row["city"])
        name = normalize(row["airport"])
        code = row["code"].casefold()
        if code == term or city == term:
            rank = 0
        elif city.startswith(term) or code.startswith(term):
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
        {
            "city": row["city"], "airport": row["airport"],
            "country": row["country"], "code": row["code"],
            "label": f'{row["city"]} ({row["code"]})',
        }
        for row in matches[:12]
    ]



@router.get("", response_model=AirlineTicketsPage)
def get_airline_tickets(
    origin: str | None = None,
    destination: str | None = None,
    max_price: int | None = Query(default=None, ge=0),
    airline: str | None = None,
    max_stops: int | None = Query(default=None, ge=0),
) -> AirlineTicketsPage:

    data = store.dump("airline_tickets")
    flights = data["flights"]

    if origin:
        flights = [
            flight for flight in flights
            if flight["route"].lower().startswith(origin.lower())
        ]

    if destination:
        flights = [
            flight for flight in flights
            if flight["route"].lower().endswith(destination.lower())
        ]

    if max_price is not None:
        flights = [
            flight for flight in flights
            if flight["price_eur"] <= max_price
        ]

    if airline:
        flights = [
            flight for flight in flights
            if airline.lower() in flight["airline"].lower()
        ]
    
    if max_stops is not None:
        flights = [
            flight for flight in flights
            if flight["stops"] <= max_stops
        ]     
    
    data["flights"] = flights

    return AirlineTicketsPage.model_validate(data)
