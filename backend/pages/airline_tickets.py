
"""Airline Tickets page API."""

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