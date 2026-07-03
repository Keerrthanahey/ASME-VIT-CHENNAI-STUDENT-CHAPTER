from fastapi import APIRouter, Depends

from app.api.v1.deps import get_current_user
from app.models.entities import User
from app.schemas.common import UserRead

router = APIRouter()


@router.get("/me", response_model=UserRead)
def read_me(current_user: User = Depends(get_current_user)) -> User:
    return current_user
