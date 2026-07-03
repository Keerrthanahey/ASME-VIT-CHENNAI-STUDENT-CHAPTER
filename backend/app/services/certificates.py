from io import BytesIO
from uuid import uuid4

from reportlab.lib.pagesizes import landscape, A4
from reportlab.lib.utils import ImageReader
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.models.entities import Certificate
from app.services.qr import generate_qr_png


def create_certificate_record(db: Session, recipient_name: str, title: str, event_id: str | None, user_id: str | None) -> Certificate:
    certificate = Certificate(
        certificate_no=f"ASME-VIT-{uuid4().hex[:10].upper()}",
        recipient_name=recipient_name,
        title=title,
        event_id=event_id,
        user_id=user_id,
        verification_code=uuid4().hex,
    )
    db.add(certificate)
    db.commit()
    db.refresh(certificate)
    return certificate


def build_certificate_pdf(certificate: Certificate) -> bytes:
    settings = get_settings()
    verification_url = f"{settings.CERTIFICATE_BASE_URL}/{certificate.verification_code}"
    buffer = BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=landscape(A4))
    width, height = landscape(A4)

    pdf.setTitle(certificate.title)
    pdf.setLineWidth(3)
    pdf.rect(0.35 * inch, 0.35 * inch, width - 0.7 * inch, height - 0.7 * inch)
    pdf.setFont("Helvetica-Bold", 28)
    pdf.drawCentredString(width / 2, height - 1.3 * inch, "ASME VIT Chennai Student Chapter")
    pdf.setFont("Helvetica", 18)
    pdf.drawCentredString(width / 2, height - 2.0 * inch, "Certificate of Participation")
    pdf.setFont("Helvetica", 14)
    pdf.drawCentredString(width / 2, height - 2.8 * inch, "This certificate is proudly presented to")
    pdf.setFont("Helvetica-Bold", 26)
    pdf.drawCentredString(width / 2, height - 3.45 * inch, certificate.recipient_name)
    pdf.setFont("Helvetica", 14)
    pdf.drawCentredString(width / 2, height - 4.1 * inch, "for")
    pdf.setFont("Helvetica-Bold", 20)
    pdf.drawCentredString(width / 2, height - 4.65 * inch, certificate.title)
    pdf.setFont("Helvetica", 10)
    pdf.drawString(0.8 * inch, 0.85 * inch, f"Certificate No: {certificate.certificate_no}")
    pdf.drawString(0.8 * inch, 0.6 * inch, f"Verify: {verification_url}")

    qr_bytes = generate_qr_png(verification_url)
    pdf.drawImage(ImageReader(BytesIO(qr_bytes)), width - 1.8 * inch, 0.6 * inch, 1.0 * inch, 1.0 * inch)
    pdf.showPage()
    pdf.save()
    return buffer.getvalue()
