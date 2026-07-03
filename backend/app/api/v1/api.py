from fastapi import APIRouter

from app.api.v1.endpoints import announcements, attendance, auth, certificates, contact, dashboard, events, gallery, members, projects, registrations, resources, users, workshops

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(members.router, prefix="/members", tags=["members"])
api_router.include_router(events.router, prefix="/events", tags=["events"])
api_router.include_router(workshops.router, prefix="/workshops", tags=["workshops"])
api_router.include_router(gallery.router, prefix="/gallery", tags=["gallery"])
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(resources.router, prefix="/resources", tags=["resources"])
api_router.include_router(announcements.router, prefix="/announcements", tags=["announcements"])
api_router.include_router(registrations.router, prefix="/registrations", tags=["registrations"])
api_router.include_router(attendance.router, prefix="/attendance", tags=["attendance"])
api_router.include_router(certificates.router, prefix="/certificates", tags=["certificates"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(contact.router, prefix="/contact", tags=["contact"])
