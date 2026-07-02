# ASME VIT Chennai Student Chapter

Official digital platform for the ASME VIT Chennai Student Chapter — a premium, production-ready web application built with modern engineering-inspired design.

## Tech Stack

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, ShadCN UI
- **Backend:** Firebase (Auth, Firestore, Storage)
- **Deployment:** Vercel

## Features

- Premium dark/light theme with glassmorphism and engineering aesthetics
- Landing page with hero 3D scene, animated statistics, and sections
- Event management with registration, bookmarks, and calendar integration
- Workshops, projects showcase, and technical resources library
- Photo gallery with masonry layout and lightbox
- Achievements and core team profiles
- Member portal with digital membership card and QR attendance
- Admin dashboard with analytics charts
- Engineering tools: calculator, unit converter, formula library
- Certificate verification, global search, and FAQ chatbot
- PWA support and SEO optimization

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Add your Firebase credentials to .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Google + Email/Password)
3. Create a Firestore database
4. Copy your config values to `.env.local`

## Deployment

Deploy to Vercel:

```bash
npm run build
```

Connect your repository to Vercel and add environment variables from `.env.example`.

## Project Structure

```
app/           # Next.js App Router pages
components/    # Reusable UI and layout components
features/      # Feature-specific modules
hooks/         # Custom React hooks
lib/           # Utilities, constants, and data
firebase/      # Firebase configuration
types/         # TypeScript type definitions
```

## License

© ASME VIT Chennai Student Chapter. All rights reserved.
