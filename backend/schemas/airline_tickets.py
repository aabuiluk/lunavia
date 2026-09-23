
from backend.schemas import Schema


class FlightItem(Schema):
    id: int
    airline: str
    departure_time: str
    arrival_time: str
    duration: str
    stops: int
    route: str
    price_eur: int


class AirlineTicketsPage(Schema):
    title: str
    flights: list[FlightItem]