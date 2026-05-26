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
  console.log("Seeding database with initial client profiles...");

  // Clear existing data to prevent duplicates during testing
  await prisma.client_profile.deleteMany();

  await prisma.client_profile.createMany({
    data: [
      {
        first_name: "Eleanor",
        last_name: "Lawson",
        communication_level: 4,
        social_interaction_level: 3,
        sensory_level: 2,
        location: "Dallas, TX",
        preferred_language: "English",
        preferred_modality: "hybrid",
      },
      {
        first_name: "Marcus",
        last_name: "Reyes",
        communication_level: 2,
        social_interaction_level: 4,
        sensory_level: 5,
        location: "Austin, TX",
        preferred_language: "Spanish",
        preferred_modality: "telehealth",
      },
      {
        first_name: "Aisha",
        last_name: "Kamara",
        communication_level: 5,
        social_interaction_level: 5,
        sensory_level: 1,
        location: "Houston, TX",
        preferred_language: "English",
        preferred_modality: "in_person",
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
