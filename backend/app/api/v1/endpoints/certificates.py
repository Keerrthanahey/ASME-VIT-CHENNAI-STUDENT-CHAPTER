from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import Response
from sqlalchemy.orm import Session

from app.api.v1.deps import EditorUser
from app.api.v1.endpoints.crud import get_item
from app.db.session import get_db
from app.models.entities import Certificate
from app.schemas.common import CertificateCreate, CertificateRead
from app.services.certificates import build_certificate_pdf, create_certificate_record

router = APIRouter()


@router.get("", response_model=list[CertificateRead], dependencies=[EditorUser])
def list_certificates(db: Session = Depends(get_db)) -> list[Certificate]:
    return db.query(Certificate).order_by(Certificate.issued_at.desc()).limit(200).all()


@router.post("", response_model=CertificateRead, dependencies=[EditorUser], status_code=201)
def issue_certificate(payload: CertificateCreate, db: Session = Depends(get_db)) -> Certificate:
    return create_certificate_record(db, payload.recipient_name, payload.title, payload.event_id, payload.user_id)


@router.get("/{certificate_id}", response_model=CertificateRead, dependencies=[EditorUser])
def read_certificate(certificate_id: str, db: Session = Depends(get_db)) -> Certificate:
    return get_item(db, Certificate, certificate_id)


@router.get("/{certificate_id}/pdf")
def download_certificate_pdf(certificate_id: str, db: Session = Depends(get_db)) -> Response:
    certificate = get_item(db, Certificate, certificate_id)
    pdf_bytes = build_certificate_pdf(certificate)
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{certificate.certificate_no}.pdf"'},
    )


@router.get("/verify/{verification_code}", response_model=CertificateRead)
def verify_certificate(verification_code: str, db: Session = Depends(get_db)) -> Certificate:
    certificate = db.query(Certificate).filter(Certificate.verification_code == verification_code).one_or_none()
    if certificate is None:
        raise HTTPException(status_code=404, detail="Certificate not found")
    return certificate
