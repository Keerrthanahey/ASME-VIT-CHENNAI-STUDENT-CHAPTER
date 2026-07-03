from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.v1.deps import EditorUser
from app.api.v1.endpoints.crud import create_item, delete_item, get_item, list_items, update_item
from app.db.session import get_db
from app.models.entities import GalleryItem
from app.schemas.common import GalleryCreate, GalleryRead, GalleryUpdate, Message

router = APIRouter()


@router.get("", response_model=list[GalleryRead])
def list_gallery(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)) -> list[GalleryItem]:
    return list_items(db, GalleryItem, skip, limit)


@router.post("", response_model=GalleryRead, dependencies=[EditorUser], status_code=201)
def create_gallery_item(payload: GalleryCreate, db: Session = Depends(get_db)) -> GalleryItem:
    return create_item(db, GalleryItem, payload)


@router.get("/{item_id}", response_model=GalleryRead)
def read_gallery_item(item_id: str, db: Session = Depends(get_db)) -> GalleryItem:
    return get_item(db, GalleryItem, item_id)


@router.patch("/{item_id}", response_model=GalleryRead, dependencies=[EditorUser])
def patch_gallery_item(item_id: str, payload: GalleryUpdate, db: Session = Depends(get_db)) -> GalleryItem:
    return update_item(db, GalleryItem, item_id, payload)


@router.delete("/{item_id}", response_model=Message, dependencies=[EditorUser])
def remove_gallery_item(item_id: str, db: Session = Depends(get_db)) -> Message:
    delete_item(db, GalleryItem, item_id)
    return Message(message="Gallery item deleted")
