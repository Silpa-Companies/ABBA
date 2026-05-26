// backend/prisma/seed.ts
import "dotenv/config";
import { PrismaClient } from "./generated/client/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// 1. Initialize a native Postgres connection pool
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in your environment variables.");
}

const pool = new Pool({
  connectionString,
});

// 2. Wrap the pool in Prisma's v7 adapter
const adapter = new PrismaPg(pool);

// 3. Pass the adapter directly into the PrismaClient constructor
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("No mock data to seed. Skipping...");

  // If you ever need to wipe the database during testing, uncomment this:
  // await prisma.client_profile.deleteMany();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
