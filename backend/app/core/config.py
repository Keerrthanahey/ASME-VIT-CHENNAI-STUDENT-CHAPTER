from functools import lru_cache
from typing import Any

from pydantic import AnyHttpUrl, EmailStr, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", case_sensitive=True)

    PROJECT_NAME: str = "ASME VIT Chennai API"
    ENVIRONMENT: str = "development"
    API_V1_PREFIX: str = "/api/v1"
    BACKEND_CORS_ORIGINS: list[AnyHttpUrl | str] = ["http://localhost:3000"]
    DATABASE_URL: str
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    FIREBASE_PROJECT_ID: str
    FIREBASE_CREDENTIALS_JSON: str | None = None
    FIREBASE_CREDENTIALS_PATH: str | None = None
    SMTP_HOST: str = "localhost"
    SMTP_PORT: int = 587
    SMTP_USERNAME: str | None = None
    SMTP_PASSWORD: str | None = None
    SMTP_FROM_EMAIL: EmailStr = "notifications@example.com"
    SMTP_FROM_NAME: str = "ASME VIT Chennai"
    ADMIN_EMAILS: list[EmailStr] = []
    CERTIFICATE_BASE_URL: str = "http://localhost:8000/api/v1/certificates/verify"
    RATE_LIMIT_DEFAULT: str = "120/minute"
    LOG_LEVEL: str = "INFO"

    @field_validator("BACKEND_CORS_ORIGINS", "ADMIN_EMAILS", mode="before")
    @classmethod
    def parse_list(cls, value: Any) -> Any:
        if isinstance(value, str) and value.startswith("["):
            import json

            return json.loads(value)
        if isinstance(value, str):
            return [item.strip() for item in value.split(",") if item.strip()]
        return value


@lru_cache
def get_settings() -> Settings:
    return Settings()
