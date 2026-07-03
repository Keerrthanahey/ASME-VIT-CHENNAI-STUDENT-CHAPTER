from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.v1.deps import EditorUser, get_current_user
from app.db.session import get_db
from app.models.entities import Attendance, Registration, User
from app.models.enums import RegistrationStatus
from app.schemas.common import AttendanceCreate, AttendanceRead

router = APIRouter(dependencies=[EditorUser])


@router.get("", response_model=list[AttendanceRead])
def list_attendance(event_id: str | None = None, db: Session = Depends(get_db)) -> list[Attendance]:
    query = db.query(Attendance)
    if event_id:
        query = query.filter(Attendance.event_id == event_id)
    return query.order_by(Attendance.checked_in_at.desc()).limit(300).all()


@router.post("", response_model=AttendanceRead, status_code=201)
def mark_attendance(payload: AttendanceCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> Attendance:
    registration = db.get(Registration, payload.registration_id)
    if registration is None:
        raise HTTPException(status_code=404, detail="Registration not found")
    existing = db.query(Attendance).filter(Attendance.registration_id == payload.registration_id).one_or_none()
    if existing:
        return existing
    attendance = Attendance(
        event_id=registration.event_id,
        registration_id=registration.id,
        marked_by_user_id=current_user.id,
        notes=payload.notes,
    )
    registration.status = RegistrationStatus.ATTENDED
    db.add(attendance)
    db.commit()
    db.refresh(attendance)
    return attendance
