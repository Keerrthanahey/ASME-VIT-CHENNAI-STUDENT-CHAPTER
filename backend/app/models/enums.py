from enum import StrEnum


class UserRole(StrEnum):
    USER = "user"
    MEMBER = "member"
    EDITOR = "editor"
    ADMIN = "admin"


class EventStatus(StrEnum):
    DRAFT = "draft"
    PUBLISHED = "published"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class RegistrationStatus(StrEnum):
    REGISTERED = "registered"
    WAITLISTED = "waitlisted"
    CANCELLED = "cancelled"
    ATTENDED = "attended"


class ResourceType(StrEnum):
    DOCUMENT = "document"
    VIDEO = "video"
    LINK = "link"
    IMAGE = "image"


class MemberStatus(StrEnum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    ALUMNI = "alumni"
