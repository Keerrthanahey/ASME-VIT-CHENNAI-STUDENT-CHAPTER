from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.v1.deps import EditorUser, get_current_user
from app.db.session import get_db
from app.models.entities import Event, Registration, User
from app.models.enums import RegistrationStatus
from app.schemas.common import RegistrationCreate, RegistrationRead

router = APIRouter()


@router.get("", response_model=list[RegistrationRead], dependencies=[EditorUser])
def list_registrations(event_id: str | None = None, db: Session = Depends(get_db)) -> list[Registration]:
    query = db.query(Registration)
    if event_id:
        query = query.filter(Registration.event_id == event_id)
    return query.order_by(Registration.created_at.desc()).limit(200).all()


@router.post("", response_model=RegistrationRead, status_code=201)
def register_for_event(payload: RegistrationCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> Registration:
    event = db.get(Event, payload.event_id)
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    existing = db.query(Registration).filter(Registration.user_id == current_user.id, Registration.event_id == payload.event_id).one_or_none()
    if existing:
        return existing
    registration = Registration(user_id=current_user.id, status=RegistrationStatus.REGISTERED, **payload.model_dump())
    db.add(registration)
    db.commit()
    db.refresh(registration)
    return registration


@router.get("/me", response_model=list[RegistrationRead])
def my_registrations(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> list[Registration]:
    return db.query(Registration).filter(Registration.user_id == current_user.id).order_by(Registration.created_at.desc()).all()
