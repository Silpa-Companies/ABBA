"use server";

import { PrismaClient, PatientStatus } from "@/generated/prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

type ClientFormData = {
  firstName?: string;
  lastName?: string;
  location?: string;
  language?: string;
  modality?: string;
  status?: PatientStatus;
  dob?: Date;
  gender?: string;
};

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

function capitalizeName(name?: string) {
  if (!name) return ""; // Return empty string if undefined

  const trimmedName = name.trim(); // Removes accidental spaces at the start/end
  return trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1);
}

// ==========================================
// CREATE (C) - Add a new client
// ==========================================
export async function createClientAction(formData: ClientFormData) {
  try {
    let mappedModality: "telehealth" | "in_person" | "hybrid" | undefined =
      undefined;
    if (formData.modality === "Telehealth") mappedModality = "telehealth";
    else if (formData.modality === "In-Person") mappedModality = "in_person";
    else if (formData.modality === "Hybrid") mappedModality = "hybrid";

    const newClient = await prisma.client_profile.create({
      data: {
        first_name: capitalizeName(formData.firstName),
        last_name: capitalizeName(formData.lastName),
        location: formData.location,
        preferred_language: formData.language,
        preferred_modality: mappedModality,
        status: formData.status || PatientStatus.UNDER_REVIEW,
        dob: formData.dob,
        gender_identity: formData.gender,
      },
    });

    return { success: true, data: newClient };
  } catch (error) {
    console.error("Failed to create client:", error);
    return { success: false, error: "Database insertion failed" };
  }
}

// ==========================================
// READ (R) - Fetch all clients
// ==========================================

export async function getClientsAction() {
  try {
    const patients = await prisma.client_profile.findMany({
      orderBy: {
        updated_at: "desc",
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        status: true,
        updated_at: true,
        // IF YOU HAVE A SELECT BLOCK, ADD THESE:
        dob: true,
        gender_identity: true,
        clinician_name: true,
      },
    });
    return patients;
  } catch (error) {
    console.error("Failed to fetch clients:", error);
    return [];
  }
}

// ==========================================
// UPDATE (U) - Modify an existing client
// ==========================================
export async function updateClientAction(
  id: string,
  formData: Partial<ClientFormData>,
) {
  try {
    // 2. Strictly type the variable to match your Prisma enum exactly
    let mappedModality: "telehealth" | "in_person" | "hybrid" | undefined =
      undefined;

    if (formData.modality === "Telehealth") mappedModality = "telehealth";
    else if (formData.modality === "In-Person") mappedModality = "in_person";
    else if (formData.modality === "Hybrid") mappedModality = "hybrid";

    // 3. Pass values directly. Prisma will cleanly ignore anything that is undefined!
    const updatedClient = await prisma.client_profile.update({
      where: { id: id },
      data: {
        first_name: capitalizeName(formData.firstName),
        last_name: capitalizeName(formData.lastName),
        location: formData.location,
        preferred_language: formData.language,
        preferred_modality: mappedModality,
        status: formData.status,
        dob: formData.dob,
        gender_identity: formData.gender,
        updated_at: new Date(),
      },
    });

    return { success: true, data: updatedClient };
  } catch (error) {
    console.error("Failed to update client:", error);
    return { success: false, error: "Database update failed" };
  }
}

// ==========================================
// DELETE (D) - Remove a client permanently
// ==========================================
export async function deleteClientAction(id: string) {
  try {
    await prisma.client_profile.delete({
      where: { id: id },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to delete client:", error);
    return { success: false, error: "Database deletion failed" };
  }
}
