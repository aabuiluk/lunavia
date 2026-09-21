"""Register page API skeleton. GET form copy, POST a stub account payload."""

from fastapi import APIRouter

from backend import store
from backend.schemas.pages import RegisterIn, RegisterOut, RegisterPage

page_meta = {
    "slug": "register",
    "path": "/register",
    "title": "Register",
    "order": 2,
    "summary": "Create your Lunavia account.",
    "api": "/api/register",
}

router = APIRouter()


@router.get("", response_model=RegisterPage)
def get_register() -> RegisterPage:
    return RegisterPage.model_validate(store.dump("register"))


@router.post("", response_model=RegisterOut)
def create_account(body: RegisterIn) -> RegisterOut:
    return RegisterOut(ok=True, name=body.name, email=body.email)
