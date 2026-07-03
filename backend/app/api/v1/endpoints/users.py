from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.v1.deps import AdminUser
from app.api.v1.endpoints.crud import get_item, list_items, update_item
from app.db.session import get_db
from app.models.entities import User
from app.schemas.common import UserRead, UserUpdate

router = APIRouter(dependencies=[AdminUser])


@router.get("", response_model=list[UserRead])
def list_users(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)) -> list[User]:
    return list_items(db, User, skip, limit)


@router.get("/{user_id}", response_model=UserRead)
def read_user(user_id: str, db: Session = Depends(get_db)) -> User:
    return get_item(db, User, user_id)


@router.patch("/{user_id}", response_model=UserRead)
def patch_user(user_id: str, payload: UserUpdate, db: Session = Depends(get_db)) -> User:
    return update_item(db, User, user_id, payload)
