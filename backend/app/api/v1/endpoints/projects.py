from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.v1.deps import EditorUser
from app.api.v1.endpoints.crud import create_item, delete_item, get_item, list_items, update_item
from app.db.session import get_db
from app.models.entities import Project
from app.schemas.common import Message, ProjectCreate, ProjectRead, ProjectUpdate

router = APIRouter()


@router.get("", response_model=list[ProjectRead])
def list_projects(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)) -> list[Project]:
    return list_items(db, Project, skip, limit)


@router.post("", response_model=ProjectRead, dependencies=[EditorUser], status_code=201)
def create_project(payload: ProjectCreate, db: Session = Depends(get_db)) -> Project:
    return create_item(db, Project, payload)


@router.get("/{project_id}", response_model=ProjectRead)
def read_project(project_id: str, db: Session = Depends(get_db)) -> Project:
    return get_item(db, Project, project_id)


@router.patch("/{project_id}", response_model=ProjectRead, dependencies=[EditorUser])
def patch_project(project_id: str, payload: ProjectUpdate, db: Session = Depends(get_db)) -> Project:
    return update_item(db, Project, project_id, payload)


@router.delete("/{project_id}", response_model=Message, dependencies=[EditorUser])
def remove_project(project_id: str, db: Session = Depends(get_db)) -> Message:
    delete_item(db, Project, project_id)
    return Message(message="Project deleted")
