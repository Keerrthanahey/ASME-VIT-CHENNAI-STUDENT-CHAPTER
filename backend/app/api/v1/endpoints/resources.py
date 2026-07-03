from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.v1.deps import EditorUser
from app.api.v1.endpoints.crud import create_item, delete_item, get_item, list_items, update_item
from app.db.session import get_db
from app.models.entities import Resource
from app.schemas.common import Message, ResourceCreate, ResourceRead, ResourceUpdate

router = APIRouter()


@router.get("", response_model=list[ResourceRead])
def list_resources(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)) -> list[Resource]:
    return list_items(db, Resource, skip, limit)


@router.post("", response_model=ResourceRead, dependencies=[EditorUser], status_code=201)
def create_resource(payload: ResourceCreate, db: Session = Depends(get_db)) -> Resource:
    return create_item(db, Resource, payload)


@router.get("/{resource_id}", response_model=ResourceRead)
def read_resource(resource_id: str, db: Session = Depends(get_db)) -> Resource:
    return get_item(db, Resource, resource_id)


@router.patch("/{resource_id}", response_model=ResourceRead, dependencies=[EditorUser])
def patch_resource(resource_id: str, payload: ResourceUpdate, db: Session = Depends(get_db)) -> Resource:
    return update_item(db, Resource, resource_id, payload)


@router.delete("/{resource_id}", response_model=Message, dependencies=[EditorUser])
def remove_resource(resource_id: str, db: Session = Depends(get_db)) -> Message:
    delete_item(db, Resource, resource_id)
    return Message(message="Resource deleted")
