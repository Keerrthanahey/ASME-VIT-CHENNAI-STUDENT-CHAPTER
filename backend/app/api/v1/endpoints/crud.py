from typing import Any, TypeVar

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

ModelT = TypeVar("ModelT")


def list_items(db: Session, model: type[ModelT], skip: int = 0, limit: int = 50) -> list[ModelT]:
    return db.query(model).offset(skip).limit(min(limit, 100)).all()


def get_item(db: Session, model: type[ModelT], item_id: str) -> ModelT:
    item = db.get(model, item_id)
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"{model.__name__} not found")
    return item


def create_item(db: Session, model: type[ModelT], payload: Any) -> ModelT:
    item = model(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


def update_item(db: Session, model: type[ModelT], item_id: str, payload: Any) -> ModelT:
    item = get_item(db, model, item_id)
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item


def delete_item(db: Session, model: type[ModelT], item_id: str) -> None:
    item = get_item(db, model, item_id)
    db.delete(item)
    db.commit()
