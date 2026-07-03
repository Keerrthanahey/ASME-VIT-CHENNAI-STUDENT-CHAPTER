from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.v1.deps import EditorUser
from app.api.v1.endpoints.crud import create_item, delete_item, get_item, list_items, update_item
from app.db.session import get_db
from app.models.entities import Announcement
from app.schemas.common import AnnouncementCreate, AnnouncementRead, AnnouncementUpdate, Message

router = APIRouter()


@router.get("", response_model=list[AnnouncementRead])
def list_announcements(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)) -> list[Announcement]:
    return list_items(db, Announcement, skip, limit)


@router.post("", response_model=AnnouncementRead, dependencies=[EditorUser], status_code=201)
def create_announcement(payload: AnnouncementCreate, db: Session = Depends(get_db)) -> Announcement:
    return create_item(db, Announcement, payload)


@router.get("/{announcement_id}", response_model=AnnouncementRead)
def read_announcement(announcement_id: str, db: Session = Depends(get_db)) -> Announcement:
    return get_item(db, Announcement, announcement_id)


@router.patch("/{announcement_id}", response_model=AnnouncementRead, dependencies=[EditorUser])
def patch_announcement(announcement_id: str, payload: AnnouncementUpdate, db: Session = Depends(get_db)) -> Announcement:
    return update_item(db, Announcement, announcement_id, payload)


@router.delete("/{announcement_id}", response_model=Message, dependencies=[EditorUser])
def remove_announcement(announcement_id: str, db: Session = Depends(get_db)) -> Message:
    delete_item(db, Announcement, announcement_id)
    return Message(message="Announcement deleted")
