# ASME VIT Chennai FastAPI Backend

Production-ready FastAPI backend for the ASME VIT Chennai Student Chapter website. It is designed to sit behind the existing Next.js 16 frontend that uses Firebase Authentication.

## Stack

- FastAPI, Uvicorn
- Python 3.12+
- SQLAlchemy 2.0, Alembic
- PostgreSQL
- Firebase Admin SDK
- Pydantic v2
- python-jose, passlib
- ReportLab PDF certificates
- qrcode QR verification
- SlowAPI rate limiting

## API Surface

Base URL: `http://localhost:8000/api/v1`

- `GET /health`
- `GET /api/v1/auth/me`
- `GET/PATCH /api/v1/users`
- `GET/POST/PATCH/DELETE /api/v1/members`
- `GET/POST/PATCH/DELETE /api/v1/events`
- `GET/POST/PATCH/DELETE /api/v1/workshops`
- `GET/POST/PATCH/DELETE /api/v1/gallery`
- `GET/POST/PATCH/DELETE /api/v1/projects`
- `GET/POST/PATCH/DELETE /api/v1/resources`
- `GET/POST/PATCH/DELETE /api/v1/announcements`
- `GET/POST /api/v1/registrations`
- `GET/POST /api/v1/attendance`
- `GET/POST /api/v1/certificates`
- `GET /api/v1/certificates/{id}/pdf`
- `GET /api/v1/certificates/verify/{verification_code}`
- `GET /api/v1/dashboard/stats`
- `POST /api/v1/contact`

OpenAPI docs are available at `http://localhost:8000/docs`.

## Authentication

The frontend should send the Firebase ID token in every authenticated request:

```ts
const token = await firebase.auth().currentUser?.getIdToken()
await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`, {
  headers: { Authorization: `Bearer ${token}` },
})
```

The backend verifies the token with Firebase Admin SDK and creates or updates the local `users` row. Emails listed in `ADMIN_EMAILS` become `admin` automatically on first login.

Roles:

- `user`: default authenticated user
- `member`: chapter member
- `editor`: can manage site content and attendance
- `admin`: can manage users and dashboard APIs

## Local Setup

1. Create the environment file:

```bash
cp .env.example .env
```

2. Set Firebase credentials. Use one of:

```env
FIREBASE_CREDENTIALS_PATH=/app/firebase-service-account.json
```

or paste the service account JSON as a single-line JSON string:

```env
FIREBASE_CREDENTIALS_JSON={"type":"service_account","project_id":"asme-vit-chennai","private_key_id":"local-development-key-id","private_key":"-----BEGIN PRIVATE KEY-----\nlocal-development-key\n-----END PRIVATE KEY-----\n","client_email":"firebase-adminsdk@asme-vit-chennai.iam.gserviceaccount.com","client_id":"100000000000000000000","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk%40asme-vit-chennai.iam.gserviceaccount.com","universe_domain":"googleapis.com"}
```

3. Start PostgreSQL and the API:

```bash
docker compose up --build
```

The API will run migrations automatically and start on `http://localhost:8000`.

## Manual Setup Without Docker

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

Use PostgreSQL and set `DATABASE_URL` in `.env`, for example:

```env
DATABASE_URL=postgresql+psycopg://asme:asme_password@localhost:5432/asme_vit
```

## Frontend Integration

Set this in the Next.js frontend:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production, set `BACKEND_CORS_ORIGINS` to the deployed frontend URL and set `NEXT_PUBLIC_API_URL` to the backend URL.

## Certificates

Admins or editors issue certificates with `POST /api/v1/certificates`. The generated PDF contains a QR code pointing to:

```text
/api/v1/certificates/verify/{verification_code}
```

The PDF can be downloaded from:

```text
/api/v1/certificates/{certificate_id}/pdf
```

## Email

Contact form submissions are emailed to `ADMIN_EMAILS`. Configure:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=notifications@example.com
SMTP_PASSWORD=app-password
SMTP_FROM_EMAIL=notifications@example.com
```

## Database Models

The initial schema includes:

- users
- members
- events
- registrations
- attendance
- certificates
- workshops
- gallery
- projects
- announcements
- resources

## Useful Commands

```bash
alembic revision --autogenerate -m "Describe change"
alembic upgrade head
uvicorn app.main:app --host 0.0.0.0 --port 8000
```
