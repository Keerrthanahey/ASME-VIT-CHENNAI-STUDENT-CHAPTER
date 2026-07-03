import json
from datetime import UTC, datetime
from typing import Any

import firebase_admin
from firebase_admin import auth, credentials
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.models.entities import User
from app.models.enums import UserRole


def initialize_firebase() -> None:
    if firebase_admin._apps:
        return
    settings = get_settings()
    if settings.FIREBASE_CREDENTIALS_JSON:
        cred = credentials.Certificate(json.loads(settings.FIREBASE_CREDENTIALS_JSON))
    elif settings.FIREBASE_CREDENTIALS_PATH:
        cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS_PATH)
    else:
        cred = credentials.ApplicationDefault()
    firebase_admin.initialize_app(cred, {"projectId": settings.FIREBASE_PROJECT_ID})


def verify_firebase_token(id_token: str) -> dict[str, Any]:
    initialize_firebase()
    return auth.verify_id_token(id_token, check_revoked=True)


def get_or_create_user(db: Session, token_payload: dict[str, Any]) -> User:
    firebase_uid = token_payload["uid"]
    email = token_payload.get("email")
    if not email:
        raise ValueError("Firebase account does not expose an email address")
    user = db.query(User).filter(User.firebase_uid == firebase_uid).one_or_none()
    settings = get_settings()
    role = UserRole.ADMIN if email.lower() in {str(item).lower() for item in settings.ADMIN_EMAILS} else UserRole.USER
    if user is None:
        user = User(
            firebase_uid=firebase_uid,
            email=email,
            full_name=token_payload.get("name") or email.split("@")[0],
            photo_url=token_payload.get("picture"),
            role=role,
            last_login_at=datetime.now(UTC),
        )
        db.add(user)
    else:
        user.email = email
        user.full_name = token_payload.get("name") or user.full_name
        user.photo_url = token_payload.get("picture") or user.photo_url
        user.last_login_at = datetime.now(UTC)
        if user.role == UserRole.USER and role == UserRole.ADMIN:
            user.role = UserRole.ADMIN
    db.commit()
    db.refresh(user)
    return user
