from fastapi import APIRouter

from app.core.config import get_settings
from app.schemas.common import ContactCreate, Message
from app.services.email import send_email

router = APIRouter()


@router.post("", response_model=Message)
def submit_contact(payload: ContactCreate) -> Message:
    settings = get_settings()
    recipients = [str(email) for email in settings.ADMIN_EMAILS] or [str(settings.SMTP_FROM_EMAIL)]
    body = f"Name: {payload.name}\nEmail: {payload.email}\n\n{payload.message}"
    for recipient in recipients:
        send_email(recipient, f"Website contact: {payload.subject}", body)
    return Message(message="Contact message sent")
