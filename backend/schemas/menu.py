from backend.schemas import Schema, camel


class MenuLink(Schema):
    label: str
    href: str


class MenuItem(Schema):
    id: str
    label: str
    href: str
    enabled: bool = True
    order: int = 0


class MenuConfig(Schema):
    items: list[MenuItem]
    cta: MenuLink
    sign_up: MenuLink = camel("signUp")
    currency: str = "UA / EN | € EUR"
