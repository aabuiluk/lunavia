from backend.schemas import Schema

class Hotel(Schema):
    id: int
    title: str
    subtitle: str
    rating: str
    reviewsCount: str
    amenities: str
    oldPrice: str = ""
    price: str
    category: str
    image: str

class HotelsPage(Schema):
    hotels: list[Hotel]