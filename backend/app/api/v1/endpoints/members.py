from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.v1.deps import EditorUser
from app.api.v1.endpoints.crud import create_item, delete_item, get_item, list_items, update_item
from app.db.session import get_db
from app.models.entities import Member
from app.schemas.common import MemberCreate, MemberRead, MemberUpdate, Message

router = APIRouter()


@router.get("", response_model=list[MemberRead])
def list_members(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)) -> list[Member]:
    return list_items(db, Member, skip, limit)


@router.post("", response_model=MemberRead, dependencies=[EditorUser], status_code=201)
def create_member(payload: MemberCreate, db: Session = Depends(get_db)) -> Member:
    return create_item(db, Member, payload)


@router.get("/{member_id}", response_model=MemberRead)
def read_member(member_id: str, db: Session = Depends(get_db)) -> Member:
    return get_item(db, Member, member_id)


@router.patch("/{member_id}", response_model=MemberRead, dependencies=[EditorUser])
def patch_member(member_id: str, payload: MemberUpdate, db: Session = Depends(get_db)) -> Member:
    return update_item(db, Member, member_id, payload)


@router.delete("/{member_id}", response_model=Message, dependencies=[EditorUser])
def remove_member(member_id: str, db: Session = Depends(get_db)) -> Message:
    delete_item(db, Member, member_id)
    return Message(message="Member deleted")
