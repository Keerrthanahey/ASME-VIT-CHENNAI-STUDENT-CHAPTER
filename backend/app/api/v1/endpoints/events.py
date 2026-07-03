from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.v1.deps import EditorUser
from app.api.v1.endpoints.crud import create_item, delete_item, get_item, list_items, update_item
from app.db.session import get_db
from app.models.entities import Event
from app.schemas.common import EventCreate, EventRead, EventUpdate, Message

router = APIRouter()


@router.get("", response_model=list[EventRead])
def list_events(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)) -> list[Event]:
    return list_items(db, Event, skip, limit)


@router.post("", response_model=EventRead, dependencies=[EditorUser], status_code=201)
def create_event(payload: EventCreate, db: Session = Depends(get_db)) -> Event:
    return create_item(db, Event, payload)


@router.get("/{event_id}", response_model=EventRead)
def read_event(event_id: str, db: Session = Depends(get_db)) -> Event:
    return get_item(db, Event, event_id)


@router.patch("/{event_id}", response_model=EventRead, dependencies=[EditorUser])
def patch_event(event_id: str, payload: EventUpdate, db: Session = Depends(get_db)) -> Event:
    return update_item(db, Event, event_id, payload)


@router.delete("/{event_id}", response_model=Message, dependencies=[EditorUser])
def remove_event(event_id: str, db: Session = Depends(get_db)) -> Message:
    delete_item(db, Event, event_id)
    return Message(message="Event deleted")
