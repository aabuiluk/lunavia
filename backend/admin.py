"""Admin login and page-content save endpoints."""
from __future__ import annotations

from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Response, status

from backend import store
from backend.auth import login, logout, require_admin, require_token
from backend.registry import discover_pages
from backend.schemas import Schema
from backend.schemas.about import AboutPage
from backend.schemas.menu import MenuConfig
from backend.schemas.pages import HomePage, RegisterPage, ToursPage
from backend.schemas.template import TemplatePage

router = APIRouter(prefix="/api/admin", tags=["Admin"])

PAGE_MODELS = {
    "about": AboutPage,
    "home": HomePage,
    "tours": ToursPage,
    "register": RegisterPage,
    "template": TemplatePage,
}


class LoginIn(Schema):
    username: str
    password: str


class LoginOut(Schema):
    token: str
    username: str


class MeOut(Schema):
    username: str


@router.post("/login", response_model=LoginOut)
def admin_login(body: LoginIn) -> LoginOut:
    token = login(body.username, body.password)
    return LoginOut(token=token, username=body.username)


@router.post("/logout")
def admin_logout(token: str = Depends(require_token)) -> Response:
    logout(token)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/me", response_model=MeOut)
def admin_me(username: str = Depends(require_admin)) -> MeOut:
    return MeOut(username=username)


@router.get("/pages")
def admin_pages(_: str = Depends(require_admin)) -> list[dict]:
    # The admin editor only works for pages with stored content. Support has
    # routes but no editable JSON payload.
    return [
        page.as_dict()
        for page in discover_pages()
        if (store.DATA_DIR / f"{page.slug}.json").is_file()
    ]


@router.get("/menu", response_model=MenuConfig)
def admin_menu(_: str = Depends(require_admin)) -> dict:
    return store.dump("menu")


@router.put("/menu", response_model=MenuConfig)
def save_menu(body: dict[str, Any], _: str = Depends(require_admin)) -> dict:
    parsed = MenuConfig.model_validate(body)
    saved = store.save("menu", parsed.model_dump(by_alias=True))
    return MenuConfig.model_validate(saved).model_dump(by_alias=True)


@router.put("/pages/{slug}")
def save_page(slug: str, body: dict[str, Any], _: str = Depends(require_admin)) -> dict:
    try:
        store.dump(slug)
    except FileNotFoundError as exc:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"Unknown page '{slug}'") from exc
    model = PAGE_MODELS.get(slug)
    if model is None:
        return store.save(slug, body)
    if slug == "home":
        # Preserve existing sections when an older admin client submits only
        # the hero fields. Validate the completed payload before writing.
        body = {**store.dump(slug), **body}
    parsed = model.model_validate(body)
    saved = store.save(slug, parsed.model_dump(by_alias=True))
    return model.model_validate(saved).model_dump(by_alias=True)
