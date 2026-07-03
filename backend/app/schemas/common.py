from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict, EmailStr, Field, HttpUrl

from app.models.enums import EventStatus, MemberStatus, RegistrationStatus, ResourceType, UserRole


class ORMModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)


class Message(BaseModel):
    message: str


class UserRead(ORMModel):
    id: str
    firebase_uid: str
    email: EmailStr
    full_name: str
    photo_url: str | None = None
    role: UserRole
    is_active: bool
    last_login_at: datetime | None = None
    created_at: datetime


class UserUpdate(BaseModel):
    full_name: str | None = None
    photo_url: str | None = None
    role: UserRole | None = None
    is_active: bool | None = None


class MemberBase(BaseModel):
    name: str
    email: EmailStr
    phone: str | None = None
    registration_number: str | None = None
    department: str | None = None
    year: int | None = Field(default=None, ge=1, le=6)
    position: str | None = None
    status: MemberStatus = MemberStatus.ACTIVE
    linkedin_url: str | None = None
    avatar_url: str | None = None
    bio: str | None = None
    user_id: str | None = None


class MemberCreate(MemberBase):
    """Payload for creating a member."""


class MemberUpdate(BaseModel):
    name: str | None = None
    email: EmailStr | None = None
    phone: str | None = None
    registration_number: str | None = None
    department: str | None = None
    year: int | None = Field(default=None, ge=1, le=6)
    position: str | None = None
    status: MemberStatus | None = None
    linkedin_url: str | None = None
    avatar_url: str | None = None
    bio: str | None = None
    user_id: str | None = None


class MemberRead(MemberBase, ORMModel):
    id: str
    created_at: datetime
    updated_at: datetime


class EventBase(BaseModel):
    title: str
    slug: str
    description: str
    venue: str | None = None
    starts_at: datetime
    ends_at: datetime | None = None
    poster_url: str | None = None
    status: EventStatus = EventStatus.DRAFT
    capacity: int | None = Field(default=None, ge=1)
    metadata_json: dict[str, Any] = Field(default_factory=dict)


class EventCreate(EventBase):
    """Payload for creating an event."""


class EventUpdate(BaseModel):
    title: str | None = None
    slug: str | None = None
    description: str | None = None
    venue: str | None = None
    starts_at: datetime | None = None
    ends_at: datetime | None = None
    poster_url: str | None = None
    status: EventStatus | None = None
    capacity: int | None = Field(default=None, ge=1)
    metadata_json: dict[str, Any] | None = None


class EventRead(EventBase, ORMModel):
    id: str
    created_at: datetime
    updated_at: datetime


class WorkshopBase(EventBase):
    instructor: str | None = None


class WorkshopCreate(WorkshopBase):
    """Payload for creating a workshop."""


class WorkshopUpdate(EventUpdate):
    instructor: str | None = None


class WorkshopRead(WorkshopBase, ORMModel):
    id: str
    created_at: datetime
    updated_at: datetime


class RegistrationCreate(BaseModel):
    event_id: str
    attendee_name: str
    attendee_email: EmailStr
    attendee_phone: str | None = None
    metadata_json: dict[str, Any] = Field(default_factory=dict)


class RegistrationRead(ORMModel):
    id: str
    user_id: str
    event_id: str
    status: RegistrationStatus
    attendee_name: str
    attendee_email: EmailStr
    attendee_phone: str | None = None
    metadata_json: dict[str, Any]
    created_at: datetime


class AttendanceCreate(BaseModel):
    registration_id: str
    notes: str | None = None


class AttendanceRead(ORMModel):
    id: str
    event_id: str
    registration_id: str
    marked_by_user_id: str | None = None
    checked_in_at: datetime
    notes: str | None = None


class CertificateCreate(BaseModel):
    recipient_name: str
    title: str
    event_id: str | None = None
    user_id: str | None = None


class CertificateRead(ORMModel):
    id: str
    certificate_no: str
    user_id: str | None = None
    event_id: str | None = None
    recipient_name: str
    title: str
    issued_at: datetime
    verification_code: str
    pdf_url: str | None = None


class GalleryBase(BaseModel):
    title: str
    image_url: str
    caption: str | None = None
    event_id: str | None = None
    is_featured: bool = False
    sort_order: int = 0


class GalleryCreate(GalleryBase):
    """Payload for creating a gallery item."""


class GalleryUpdate(BaseModel):
    title: str | None = None
    image_url: str | None = None
    caption: str | None = None
    event_id: str | None = None
    is_featured: bool | None = None
    sort_order: int | None = None


class GalleryRead(GalleryBase, ORMModel):
    id: str
    created_at: datetime
    updated_at: datetime


class ProjectBase(BaseModel):
    title: str
    slug: str
    summary: str
    description: str | None = None
    image_url: str | None = None
    repository_url: str | None = None
    demo_url: str | None = None
    team: list[dict[str, Any]] = Field(default_factory=list)
    tags: list[str] = Field(default_factory=list)
    is_featured: bool = False


class ProjectCreate(ProjectBase):
    """Payload for creating a project."""


class ProjectUpdate(BaseModel):
    title: str | None = None
    slug: str | None = None
    summary: str | None = None
    description: str | None = None
    image_url: str | None = None
    repository_url: str | None = None
    demo_url: str | None = None
    team: list[dict[str, Any]] | None = None
    tags: list[str] | None = None
    is_featured: bool | None = None


class ProjectRead(ProjectBase, ORMModel):
    id: str
    created_at: datetime
    updated_at: datetime


class AnnouncementBase(BaseModel):
    title: str
    body: str
    image_url: str | None = None
    is_published: bool = False
    published_at: datetime | None = None


class AnnouncementCreate(AnnouncementBase):
    """Payload for creating an announcement."""


class AnnouncementUpdate(BaseModel):
    title: str | None = None
    body: str | None = None
    image_url: str | None = None
    is_published: bool | None = None
    published_at: datetime | None = None


class AnnouncementRead(AnnouncementBase, ORMModel):
    id: str
    created_at: datetime
    updated_at: datetime


class ResourceBase(BaseModel):
    title: str
    description: str | None = None
    resource_type: ResourceType
    url: str
    category: str | None = None
    is_published: bool = True


class ResourceCreate(ResourceBase):
    """Payload for creating a resource."""


class ResourceUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    resource_type: ResourceType | None = None
    url: str | None = None
    category: str | None = None
    is_published: bool | None = None


class ResourceRead(ResourceBase, ORMModel):
    id: str
    created_at: datetime
    updated_at: datetime


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str


class DashboardStats(BaseModel):
    users: int
    members: int
    events: int
    workshops: int
    registrations: int
    attendance: int
    certificates: int
    projects: int
