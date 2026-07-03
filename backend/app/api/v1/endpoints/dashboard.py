from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.v1.deps import AdminUser
from app.db.session import get_db
from app.models.entities import Attendance, Certificate, Event, Member, Project, Registration, User, Workshop
from app.schemas.common import DashboardStats

router = APIRouter(dependencies=[AdminUser])


@router.get("/stats", response_model=DashboardStats)
def dashboard_stats(db: Session = Depends(get_db)) -> DashboardStats:
    return DashboardStats(
        users=db.query(User).count(),
        members=db.query(Member).count(),
        events=db.query(Event).count(),
        workshops=db.query(Workshop).count(),
        registrations=db.query(Registration).count(),
        attendance=db.query(Attendance).count(),
        certificates=db.query(Certificate).count(),
        projects=db.query(Project).count(),
    )
