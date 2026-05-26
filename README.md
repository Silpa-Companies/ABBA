# Project ABBA

A full-stack Next.js application utilizing a Dockerized PostgreSQL database and Prisma ORM for type-safe Server Actions.

## 🛠 Prerequisites

Before pulling this branch, ensure you have the following installed:

- **Node.js** (v18+)
- **Docker Desktop** (Running and active)
- **WSL 2** (If developing on Windows, ensure Docker's WSL Integration is enabled in Docker Desktop settings).

---

## 🚀 Quick Start Guide

The repository is split into a `frontend/` (Next.js) and `backend/` (Prisma/Docker) directory. You will need to run commands in both to get the full stack operational.

### 1. Configure Environment Variables

You must create a `.env` file in **both** the `frontend/` and `backend/` directories.

Create the files and paste the following database connection string into both:

```env
DATABASE_URL="postgresql://postgres:ABBA2026@127.0.0.1:5433/postgres?schema=public"
```

### 2. Start the Database Layer

Open your terminal, navigate to the `backend` folder, and spin up the Docker container. This will download the official Postgres image and bind it to port 5433.

```bash
cd backend
docker run --name abba-postgres -e POSTGRES_PASSWORD=ABBA2026 -p 5433:5432 -d postgres
```

### 3. Initialize Prisma (Schema & Seed)

With the database running, install the backend dependencies, push the schema to create the tables, and seed the initial mock data.

```bash
npm install
npx prisma db push
npx prisma db seed
npx prisma generate
```

### 4. Run the Next.js Frontend

Now that the database is prepped and seeded, leave the backend folder, install the UI dependencies, and start the development server.

```bash
cd ../frontend
npm install
npm run dev
```

Navigate to `http://localhost:3000` in your browser. The application should now load and dynamically fetch the seeded client profiles from the Docker container!

---

## 🛑 Common Troubleshooting

**"Can't reach database server at 127.0.0.1:5433"**

- Your Docker container is likely asleep. Run `docker ps -a` to see all containers. Find `abba-postgres` and run: `docker start abba-postgres`.
- If you are on Windows, verify that Docker Desktop is actually running in your system tray.

**"permission denied while trying to connect to the docker API"**

- If you are using WSL, ensure your specific Linux distribution is toggled **ON** in Docker Desktop -> Settings -> Resources -> WSL Integration.

**Red lines under `@prisma-client` imports in VS Code**

- This is a known monorepo caching issue. Open the command palette (`Ctrl + Shift + P`) and run `TypeScript: Restart TS server`. The red lines will clear.
