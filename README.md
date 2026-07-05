# 🚀 ASME VIT Chennai Student Chapter

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-Production-009688?logo=fastapi)
![Firebase](https://img.shields.io/badge/Firebase-Authentication-orange?logo=firebase)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)
![License](https://img.shields.io/badge/License-MIT-green)

Official full-stack digital platform for the **ASME VIT Chennai Student Chapter**, built with **Next.js 16**, **FastAPI**, **Firebase Authentication**, and **PostgreSQL**.

</div>

---

# ✨ Overview

This platform serves as the official website and member portal of the ASME VIT Chennai Student Chapter.

It provides students with a modern engineering-inspired experience including:

- Member Authentication
- Events & Workshops
- Attendance Tracking
- Digital Certificates
- Project Showcase
- Gallery
- Resources
- Admin Dashboard
- Certificate Verification
- Contact Portal

The application is built using a production-ready architecture with a decoupled frontend and backend.

---

# 🏗 Architecture

```
                Firebase Authentication
                        │
                        ▼
                Next.js Frontend
                 (Hosted on Vercel)
                        │
                Firebase ID Token
                        │
                        ▼
               FastAPI REST Backend
                 (Hosted on Render)
                        │
          Firebase Admin SDK verifies token
                        │
                        ▼
                  PostgreSQL Database
```

---

# 🚀 Tech Stack

## Frontend

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- ShadCN UI
- Firebase Authentication
- Firebase Storage

---

## Backend

- FastAPI
- Python 3.12
- SQLAlchemy 2.0
- Alembic
- PostgreSQL
- Firebase Admin SDK
- Pydantic v2
- SlowAPI
- ReportLab
- QRCode
- Python-JOSE

---

## Deployment

Frontend

- Vercel

Backend

- Render

Database

- PostgreSQL (Render)

---

# ✨ Features

## Authentication

- Firebase Google Authentication
- Email & Password Authentication
- Only VIT Email IDs Allowed
- Firebase ID Token Verification
- Role Based Authentication

---

## Member Portal

- Member Dashboard
- Attendance
- Volunteer Hours
- Digital Membership
- Certificates
- Registered Events
- Bookmarked Resources

---

## Events

- Event Listings
- Event Registration
- Event Dashboard
- Attendance Tracking

---

## Workshops

- Workshop Registration
- Learning Resources
- Instructor Profiles
- Certificate Support

---

## Projects

- Technical Projects Showcase
- GitHub Links
- Technology Stack
- Team Members

---

## Gallery

- Engineering Gallery
- Event Photos
- Workshops
- Industrial Visits

---

## Resources

- Mechanical Notes
- CAD Resources
- FEA
- CFD
- MATLAB
- Python
- Research Papers

---

## Certificates

- PDF Generation
- QR Verification
- Certificate Validation

---

## Admin Dashboard

- User Management
- Event Management
- Attendance
- Announcements
- Analytics
- Certificate Generation

---

# 📁 Project Structure

```
ASME-VIT-CHENNAI-STUDENT-CHAPTER/

│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── firebase/
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   └── public/
│
├── backend/
│   ├── app/
│   ├── alembic/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── alembic.ini
│
└── README.md
```

---

# 🔐 Authentication Flow

```
User Login
      │
      ▼
Firebase Authentication
      │
      ▼
Firebase ID Token
      │
      ▼
FastAPI Backend
      │
      ▼
Firebase Admin Verification
      │
      ▼
User Created / Updated
      │
      ▼
Dashboard
```

---

# 📡 API Endpoints

Base URL

```
https://asme-vit-chennai.onrender.com/api/v1
```

## Authentication

```
GET /auth/me
```

---

## Users

```
GET /users
PATCH /users/{id}
```

---

## Members

```
GET
POST
PATCH
DELETE
```

---

## Events

```
GET
POST
PATCH
DELETE
```

---

## Workshops

```
GET
POST
PATCH
DELETE
```

---

## Gallery

```
GET
POST
PATCH
DELETE
```

---

## Projects

```
GET
POST
PATCH
DELETE
```

---

## Resources

```
GET
POST
PATCH
DELETE
```

---

## Announcements

```
GET
POST
PATCH
DELETE
```

---

## Attendance

```
GET
POST
```

---

## Registrations

```
GET
POST
```

---

## Certificates

```
GET
POST
GET /pdf
GET /verify
```

---

## Dashboard

```
GET /dashboard/stats
```

---

## Contact

```
POST /contact
```

---

# ⚙ Local Setup

## Clone Repository

```bash
git clone https://github.com/Keerrthanahey/ASME-VIT-CHENNAI-STUDENT-CHAPTER.git

cd ASME-VIT-CHENNAI-STUDENT-CHAPTER
```

---

# 🖥 Frontend Setup

```bash
cd frontend

npm install

cp .env.example .env.local

npm run dev
```

Frontend runs on

```
http://localhost:3000
```

---

# ⚙ Backend Setup

```bash
cd backend

python -m venv .venv

source .venv/bin/activate
```

Windows

```bash
.venv\Scripts\activate
```

Install packages

```bash
pip install -r requirements.txt
```

Run migrations

```bash
alembic upgrade head
```

Run server

```bash
uvicorn app.main:app --reload
```

Backend runs on

```
http://localhost:8000
```

---

# 🐳 Docker

```bash
docker compose up --build
```

---

# 🌍 Environment Variables

## Frontend

```env
NEXT_PUBLIC_FIREBASE_API_KEY=

NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=

NEXT_PUBLIC_FIREBASE_PROJECT_ID=

NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=

NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=

NEXT_PUBLIC_FIREBASE_APP_ID=

NEXT_PUBLIC_API_URL=

NEXT_PUBLIC_SITE_URL=
```

---

## Backend

```env
DATABASE_URL=

SECRET_KEY=

FIREBASE_PROJECT_ID=

FIREBASE_CREDENTIALS_PATH=

SMTP_HOST=

SMTP_PORT=

SMTP_USERNAME=

SMTP_PASSWORD=

ADMIN_EMAILS=
```

---

# 📜 Certificate System

Features include:

- PDF Certificate Generation
- QR Code Verification
- Secure Verification Codes
- Public Certificate Validation

Verification Endpoint

```
/api/v1/certificates/verify/{verification_code}
```

---

# 📖 API Documentation

Swagger UI

```
https://asme-vit-chennai.onrender.com/docs
```

OpenAPI JSON

```
https://asme-vit-chennai.onrender.com/api/v1/openapi.json
```

---

# 🚀 Deployment

## Frontend

Hosted on

**Vercel**

---

## Backend

Hosted on

**Render**

---

## Database

Hosted on

**Render PostgreSQL**

---

# 🔮 Future Enhancements

- VTOP Integration (subject to VIT policies)
- Push Notifications
- Club Membership Approval Workflow
- AI Chatbot
- ASME India Integration
- Automated Attendance using QR
- Event Recommendation System
- Analytics Dashboard
- Mobile Application

---

# 👩‍💻 Developer

**Keerrthana N T**

Mechanical Engineering

VIT Chennai

---

# 📄 License

This project is developed for the **ASME VIT Chennai Student Chapter**.

© 2026 ASME VIT Chennai Student Chapter. All Rights Reserved.
