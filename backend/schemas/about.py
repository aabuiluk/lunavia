from backend.schemas import Schema, camel


class HeroAction(Schema):
    label: str
    href: str
    variant: str = "light"


class AboutHero(Schema):
    brand: str
    title: str
    title_highlight: str = camel("titleHighlight")
    lead: str
    image: str
    image_alt: str = camel("imageAlt")
    actions: list[HeroAction]


class AboutStory(Schema):
    eyebrow: str
    title: str
    title_highlight: str = camel("titleHighlight")
    paragraphs: list[str]
    image: str
    image_alt: str = camel("imageAlt")


class Milestone(Schema):
    value: str
    label: str


class SectionIntro(Schema):
    eyebrow: str
    title: str
    lead: str


class ValueItem(Schema):
    title: str
    text: str


class TeamMemberIn(Schema):
    name: str
    role: str
    photo: str


class TeamMember(TeamMemberIn):
    id: int


class AboutCta(Schema):
    title: str
    text: str
    button_label: str = camel("buttonLabel")
    email: str
    image: str


class AboutPage(Schema):
    hero: AboutHero
    story: AboutStory
    milestones: list[Milestone]
    values_intro: SectionIntro = camel("valuesIntro")
    values: list[ValueItem]
    team_intro: SectionIntro = camel("teamIntro")
    team: list[TeamMember]
    cta: AboutCta
