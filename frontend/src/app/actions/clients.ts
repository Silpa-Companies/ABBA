"use server";

import { PrismaClient } from "@/generated/prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in your environment variables.");
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

let prisma: PrismaClient;

if (globalForPrisma.prisma) {
  // Use the existing connection during hot-reloads
  prisma = globalForPrisma.prisma;
} else {
  // Create a new pool and adapter ONLY if one doesn't exist
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  prisma = new PrismaClient({ adapter });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
  }
}

export async function getClientsAction() {
  try {
    const clients = await prisma.client_profile.findMany({
      orderBy: { created_at: "desc" },
    });
    return clients;
  } catch (error) {
    console.error("Failed to fetch clients:", error);
    return [];
  }
}
