# Learning Outcome (React + Vite + Express + MySQL)

This repository is a small learning-outcome management app:

- Frontend: React (Vite) at [src/main.jsx](src/main.jsx#L1-L20) and routes in [src/App.jsx](src/App.jsx#L1-L80).
- Backend: Express API at [backend/server.js](backend/server.js#L1-L40).
- Database: MySQL schema and seeder at [backend/database/schema.sql](backend/database/schema.sql#L1-L40) and [backend/database/seed.js](backend/database/seed.js#L1-L200).

Quick start (development)

1. Install root (frontend) deps:

```bash
npm install
```

2. Install backend deps and create `.env` (from example):

```bash
cd backend
npm install
copy .env.example .env
# edit .env and set DB_PASSWORD (Windows PowerShell: `notepad .env`)
```

3. Seed the database (creates `lom_db` and inserts sample data):

```bash
# from backend folder
node database/seed.js
```

4. Start backend and frontend (in two shells):

```bash
# backend (from backend folder)
npm run start

# frontend (from project root)
npm run dev
```

API health check

```bash
curl http://localhost:5000/api/health
curl http://localhost:5000/api/users
```

Notes & next improvements

- Add tests (Jest/RTL for frontend, supertest/mocha for backend).
- Improve UI consistency and add loading/error states (I added a spinner and improved login UX).
- Add a `start`/`dev` script for the backend and a `.env.example` file.

If you'd like, I can now run linting, scaffold tests, or continue polishing UI components.
