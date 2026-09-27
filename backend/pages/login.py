from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/api/login", tags=["login"])


class LoginRequest(BaseModel):
    email: str
    password: str


login_config = {
    "welcomeTitle": "Ready when you are.",
    "subtext": "Log in to pick up where your travel plans left off.",
    "enableGoogleAuth": True,
    "allowPasswordReset": True,
    "bannerText": "A little less planning. A lot more going."
}


@router.get("/config")
def get_login_config():
    return login_config


@router.post("")
def login(data: LoginRequest):
    if not data.email or not data.password:
        raise HTTPException(status_code=400, detail="Input all fields.")

    if len(data.password) < 6:
        raise HTTPException(status_code=401, detail="Password must be at least 6 characters.")

    return {"message": "Success", "token": "dummy-auth-token-123"}
