from backend.schemas import Schema, camel


class LinkAction(Schema):
    label: str
    href: str
    variant: str = "light"


class HomePage(Schema):
    brand: str
    title: str
    title_highlight: str = camel("titleHighlight")
    title_suffix: str = camel("titleSuffix")
    lead: str
    image: str
    image_alt: str = camel("imageAlt")
    actions: list[LinkAction]


class TourItem(Schema):
    id: int
    title: str
    category: str
    meta: str
    route: str
    price: str
    discount: str = ""
    image: str


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


class ToursPage(Schema):
    eyebrow: str
    title: str
    lead: str
    cta: LinkAction
    tours: list[TourItem] = [ ]