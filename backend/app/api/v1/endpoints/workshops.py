from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.v1.deps import EditorUser
from app.api.v1.endpoints.crud import create_item, delete_item, get_item, list_items, update_item
from app.db.session import get_db
from app.models.entities import Workshop
from app.schemas.common import Message, WorkshopCreate, WorkshopRead, WorkshopUpdate

router = APIRouter()


@router.get("", response_model=list[WorkshopRead])
def list_workshops(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)) -> list[Workshop]:
    return list_items(db, Workshop, skip, limit)


@router.post("", response_model=WorkshopRead, dependencies=[EditorUser], status_code=201)
def create_workshop(payload: WorkshopCreate, db: Session = Depends(get_db)) -> Workshop:
    return create_item(db, Workshop, payload)


@router.get("/{workshop_id}", response_model=WorkshopRead)
def read_workshop(workshop_id: str, db: Session = Depends(get_db)) -> Workshop:
    return get_item(db, Workshop, workshop_id)


@router.patch("/{workshop_id}", response_model=WorkshopRead, dependencies=[EditorUser])
def patch_workshop(workshop_id: str, payload: WorkshopUpdate, db: Session = Depends(get_db)) -> Workshop:
    return update_item(db, Workshop, workshop_id, payload)


@router.delete("/{workshop_id}", response_model=Message, dependencies=[EditorUser])
def remove_workshop(workshop_id: str, db: Session = Depends(get_db)) -> Message:
    delete_item(db, Workshop, workshop_id)
    return Message(message="Workshop deleted")
