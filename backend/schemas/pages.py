from backend.schemas import Schema, camel


class LinkAction(Schema):
    label: str
    href: str
    variant: str = "light"


class HomeSearchField(Schema):
    name: str
    label: str
    value: str = ""
    placeholder: str = ""
    type: str


class HomeAirport(Schema):
    city: str
    airport: str
    country: str
    code: str
    label: str


class HomeSearch(Schema):
    fields: list[HomeSearchField]
    note: str
    cta_label: str = camel("ctaLabel")


class HomeRouteStop(Schema):
    code: str
    title: str
    note: str
    active: bool = False


class HomeRouteMap(Schema):
    eyebrow: str
    title_lines: list[str] = camel("titleLines")
    title_highlight: str = camel("titleHighlight")
    text: str
    stops: list[HomeRouteStop]
    countries: list[str]
    link: LinkAction


class HomeDestination(Schema):
    tag: str
    country: str
    place: str
    price: str
    image: str
    span: str
    href: str


class HomeDestinations(Schema):
    eyebrow: str
    title_lines: list[str] = camel("titleLines")
    items: list[HomeDestination]


class HomePage(Schema):
    brand: str
    title: str
    title_highlight: str = camel("titleHighlight")
    title_suffix: str = camel("titleSuffix")
    lead: str
    image: str
    image_alt: str = camel("imageAlt")
    actions: list[LinkAction]
    search: HomeSearch
    route_map: HomeRouteMap = camel("routeMap")
    destinations: HomeDestinations


class RegisterField(Schema):
    name: str
    label: str
    type: str
    placeholder: str = ""


class RegisterPage(Schema):
    tag: str
    title: str
    lead: str
    fields: list[RegisterField]


class RegisterIn(Schema):
    name: str
    email: str
    password: str


class RegisterOut(Schema):
    ok: bool
    name: str
    email: str


class TourItem(Schema):
    id: str
    title: str
    category: str
    meta: str
    route: str
    price: str
    discount: str = ""
    image: str


class ToursPage(Schema):
    eyebrow: str
    title: str
    lead: str
    categories: list[str] = []
    cta: LinkAction
    tours: list[TourItem]
