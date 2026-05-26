"use server";

// Update this path to be relative to the 'actions' folder.
// If 'generated' is in 'src', this will work. If not, adjust accordingly.
import type { client_profile } from "@prisma-client";
import { PrismaClient } from "@prisma-client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// 1. Force the connection string to be defined
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in your environment variables.");
}

// 2. Initialize connection
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function getClientsAction() {
  try {
    const clients = await prisma.client_profile.findMany({
      orderBy: { created_at: "desc" },
    });

    console.log("Database fetch successful, count:", clients.length);

    return clients.map((client: client_profile) => ({
      ...client,
      available_time_slots: Array.isArray(client.available_time_slots)
        ? client.available_time_slots.map((d: Date | string) =>
            d instanceof Date ? d.toISOString() : d,
          )
        : [],
      created_at:
        client.created_at instanceof Date
          ? client.created_at.toISOString()
          : client.created_at,
      updated_at:
        client.updated_at instanceof Date
          ? client.updated_at.toISOString()
          : client.updated_at,
    }));
  } catch (error) {
    console.error("DATABASE FETCH ERROR:", error);
    return [];
  }
}
