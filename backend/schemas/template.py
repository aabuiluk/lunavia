from backend.schemas import Schema


class CtaLink(Schema):
    label: str
    href: str


class PageStep(Schema):
    title: str
    text: str


class TemplatePage(Schema):
    """Copy this schema with `backend/pages/template.py`."""

    eyebrow: str
    title: str
    lead: str
    steps: list[PageStep]
    cta: CtaLink
