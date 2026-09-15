"""About page API — full read model plus team CRUD."""

from fastapi import APIRouter, HTTPException, status

from backend import store
from backend.schemas.about import (
    AboutCta,
    AboutHero,
    AboutPage,
    AboutStory,
    Milestone,
    TeamMember,
    TeamMemberIn,
    ValueItem,
)

page_meta = {
    "slug": "about",
    "path": "/about",
    "title": "About",
    "order": 3,
    "summary": "Who we are, how we plan trips, and the people behind Lunavia.",
    "api": "/api/about",
}

router = APIRouter()


def _page() -> dict:
    return store.dump("about")


def _save(data: dict) -> AboutPage:
    return AboutPage.model_validate(store.save("about", data))


def _team() -> list[dict]:
    return list(_page()["team"])


def _get_member(member_id: int) -> dict:
    for member in _team():
        if member["id"] == member_id:
            return member
    raise HTTPException(status.HTTP_404_NOT_FOUND, f"Team member {member_id} not found")


@router.get("", response_model=AboutPage)
def get_about() -> AboutPage:
    return AboutPage.model_validate(_page())


@router.put("", response_model=AboutPage)
def replace_about(body: AboutPage) -> AboutPage:
    return _save(body.model_dump(by_alias=True))


@router.get("/hero", response_model=AboutHero)
def get_hero() -> AboutHero:
    return AboutHero.model_validate(_page()["hero"])


@router.get("/story", response_model=AboutStory)
def get_story() -> AboutStory:
    return AboutStory.model_validate(_page()["story"])


@router.get("/milestones", response_model=list[Milestone])
def get_milestones() -> list[Milestone]:
    return [Milestone.model_validate(item) for item in _page()["milestones"]]


@router.get("/values", response_model=list[ValueItem])
def get_values() -> list[ValueItem]:
    return [ValueItem.model_validate(item) for item in _page()["values"]]


@router.get("/cta", response_model=AboutCta)
def get_cta() -> AboutCta:
    return AboutCta.model_validate(_page()["cta"])


@router.get("/team", response_model=list[TeamMember])
def list_team() -> list[TeamMember]:
    return [TeamMember.model_validate(item) for item in _team()]


@router.get("/team/{member_id}", response_model=TeamMember)
def get_team_member(member_id: int) -> TeamMember:
    return TeamMember.model_validate(_get_member(member_id))


@router.post("/team", response_model=TeamMember, status_code=status.HTTP_201_CREATED)
def add_team_member(body: TeamMemberIn) -> TeamMember:
    data = _page()
    next_id = max((item["id"] for item in data["team"]), default=0) + 1
    member = {"id": next_id, **body.model_dump(by_alias=True)}
    data["team"].append(member)
    _save(data)
    return TeamMember.model_validate(member)


@router.put("/team/{member_id}", response_model=TeamMember)
def update_team_member(member_id: int, body: TeamMemberIn) -> TeamMember:
    data = _page()
    for index, item in enumerate(data["team"]):
        if item["id"] == member_id:
            member = {"id": member_id, **body.model_dump(by_alias=True)}
            data["team"][index] = member
            _save(data)
            return TeamMember.model_validate(member)
    raise HTTPException(status.HTTP_404_NOT_FOUND, f"Team member {member_id} not found")


@router.delete("/team/{member_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_team_member(member_id: int) -> None:
    data = _page()
    kept = [item for item in data["team"] if item["id"] != member_id]
    if len(kept) == len(data["team"]):
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"Team member {member_id} not found")
    data["team"] = kept
    _save(data)
