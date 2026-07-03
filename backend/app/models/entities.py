from datetime import datetime
from uuid import uuid4

from sqlalchemy import Boolean, DateTime, Enum, ForeignKey, Integer, String, Text, UniqueConstraint, func
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

from app.models.enums import EventStatus, MemberStatus, RegistrationStatus, ResourceType, UserRole


class Base(DeclarativeBase):
    """SQLAlchemy declarative base."""


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)


class User(Base, TimestampMixin):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid4()))
    firebase_uid: Mapped[str] = mapped_column(String(128), unique=True, index=True, nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    photo_url: Mapped[str | None] = mapped_column(String(1024))
    role: Mapped[UserRole] = mapped_column(Enum(UserRole, name="user_role"), default=UserRole.USER, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    last_login_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    member: Mapped["Member | None"] = relationship(back_populates="user")
    registrations: Mapped[list["Registration"]] = relationship(back_populates="user")


class Member(Base, TimestampMixin):
    __tablename__ = "members"

    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid4()))
    user_id: Mapped[str | None] = mapped_column(UUID(as_uuid=False), ForeignKey("users.id", ondelete="SET NULL"), unique=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    phone: Mapped[str | None] = mapped_column(String(32))
    registration_number: Mapped[str | None] = mapped_column(String(64), unique=True)
    department: Mapped[str | None] = mapped_column(String(120))
    year: Mapped[int | None] = mapped_column(Integer)
    position: Mapped[str | None] = mapped_column(String(120))
    status: Mapped[MemberStatus] = mapped_column(Enum(MemberStatus, name="member_status"), default=MemberStatus.ACTIVE, nullable=False)
    linkedin_url: Mapped[str | None] = mapped_column(String(1024))
    avatar_url: Mapped[str | None] = mapped_column(String(1024))
    bio: Mapped[str | None] = mapped_column(Text)

    user: Mapped["User | None"] = relationship(back_populates="member")


class Event(Base, TimestampMixin):
    __tablename__ = "events"

    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid4()))
    title: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    venue: Mapped[str | None] = mapped_column(String(255))
    starts_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    ends_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    poster_url: Mapped[str | None] = mapped_column(String(1024))
    status: Mapped[EventStatus] = mapped_column(Enum(EventStatus, name="event_status"), default=EventStatus.DRAFT, nullable=False)
    capacity: Mapped[int | None] = mapped_column(Integer)
    metadata_json: Mapped[dict] = mapped_column(JSONB, default=dict, nullable=False)

    registrations: Mapped[list["Registration"]] = relationship(back_populates="event", cascade="all, delete-orphan")
    attendance: Mapped[list["Attendance"]] = relationship(back_populates="event", cascade="all, delete-orphan")
    certificates: Mapped[list["Certificate"]] = relationship(back_populates="event")


class Workshop(Base, TimestampMixin):
    __tablename__ = "workshops"

    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid4()))
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    instructor: Mapped[str | None] = mapped_column(String(255))
    venue: Mapped[str | None] = mapped_column(String(255))
    starts_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    ends_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    poster_url: Mapped[str | None] = mapped_column(String(1024))
    status: Mapped[EventStatus] = mapped_column(Enum(EventStatus, name="workshop_status"), default=EventStatus.DRAFT, nullable=False)
    capacity: Mapped[int | None] = mapped_column(Integer)
    metadata_json: Mapped[dict] = mapped_column(JSONB, default=dict, nullable=False)


class Registration(Base, TimestampMixin):
    __tablename__ = "registrations"
    __table_args__ = (UniqueConstraint("user_id", "event_id", name="uq_user_event_registration"),)

    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid4()))
    user_id: Mapped[str] = mapped_column(UUID(as_uuid=False), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    event_id: Mapped[str] = mapped_column(UUID(as_uuid=False), ForeignKey("events.id", ondelete="CASCADE"), nullable=False)
    status: Mapped[RegistrationStatus] = mapped_column(Enum(RegistrationStatus, name="registration_status"), default=RegistrationStatus.REGISTERED, nullable=False)
    attendee_name: Mapped[str] = mapped_column(String(255), nullable=False)
    attendee_email: Mapped[str] = mapped_column(String(255), nullable=False)
    attendee_phone: Mapped[str | None] = mapped_column(String(32))
    metadata_json: Mapped[dict] = mapped_column(JSONB, default=dict, nullable=False)

    user: Mapped["User"] = relationship(back_populates="registrations")
    event: Mapped["Event"] = relationship(back_populates="registrations")
    attendance: Mapped["Attendance | None"] = relationship(back_populates="registration")


class Attendance(Base, TimestampMixin):
    __tablename__ = "attendance"
    __table_args__ = (UniqueConstraint("registration_id", name="uq_attendance_registration"),)

    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid4()))
    event_id: Mapped[str] = mapped_column(UUID(as_uuid=False), ForeignKey("events.id", ondelete="CASCADE"), nullable=False)
    registration_id: Mapped[str] = mapped_column(UUID(as_uuid=False), ForeignKey("registrations.id", ondelete="CASCADE"), nullable=False)
    marked_by_user_id: Mapped[str | None] = mapped_column(UUID(as_uuid=False), ForeignKey("users.id", ondelete="SET NULL"))
    checked_in_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    notes: Mapped[str | None] = mapped_column(Text)

    event: Mapped["Event"] = relationship(back_populates="attendance")
    registration: Mapped["Registration"] = relationship(back_populates="attendance")


class Certificate(Base, TimestampMixin):
    __tablename__ = "certificates"

    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid4()))
    certificate_no: Mapped[str] = mapped_column(String(64), unique=True, index=True, nullable=False)
    user_id: Mapped[str | None] = mapped_column(UUID(as_uuid=False), ForeignKey("users.id", ondelete="SET NULL"))
    event_id: Mapped[str | None] = mapped_column(UUID(as_uuid=False), ForeignKey("events.id", ondelete="SET NULL"))
    recipient_name: Mapped[str] = mapped_column(String(255), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    issued_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    verification_code: Mapped[str] = mapped_column(String(128), unique=True, index=True, nullable=False)
    pdf_url: Mapped[str | None] = mapped_column(String(1024))

    event: Mapped["Event | None"] = relationship(back_populates="certificates")


class GalleryItem(Base, TimestampMixin):
    __tablename__ = "gallery"

    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid4()))
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    image_url: Mapped[str] = mapped_column(String(1024), nullable=False)
    caption: Mapped[str | None] = mapped_column(Text)
    event_id: Mapped[str | None] = mapped_column(UUID(as_uuid=False), ForeignKey("events.id", ondelete="SET NULL"))
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)


class Project(Base, TimestampMixin):
    __tablename__ = "projects"

    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid4()))
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    summary: Mapped[str] = mapped_column(Text, nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    image_url: Mapped[str | None] = mapped_column(String(1024))
    repository_url: Mapped[str | None] = mapped_column(String(1024))
    demo_url: Mapped[str | None] = mapped_column(String(1024))
    team: Mapped[list] = mapped_column(JSONB, default=list, nullable=False)
    tags: Mapped[list] = mapped_column(JSONB, default=list, nullable=False)
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)


class Announcement(Base, TimestampMixin):
    __tablename__ = "announcements"

    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid4()))
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    body: Mapped[str] = mapped_column(Text, nullable=False)
    image_url: Mapped[str | None] = mapped_column(String(1024))
    is_published: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    published_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))


class Resource(Base, TimestampMixin):
    __tablename__ = "resources"

    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid4()))
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    resource_type: Mapped[ResourceType] = mapped_column(Enum(ResourceType, name="resource_type"), nullable=False)
    url: Mapped[str] = mapped_column(String(1024), nullable=False)
    category: Mapped[str | None] = mapped_column(String(120))
    is_published: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
