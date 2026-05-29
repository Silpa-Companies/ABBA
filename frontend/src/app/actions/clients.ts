"use server";

import { PrismaClient, PatientStatus } from "@/generated/prisma/client";
import { modality_type } from "@/generated/prisma/enums";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { revalidatePath } from "next/cache";

/**
 * Types & Configuration
 */

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

type ActionResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Prisma Client Initialization
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in your environment variables.");
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
let prisma: PrismaClient;

if (globalForPrisma.prisma) {
  prisma = globalForPrisma.prisma;
} else {
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  prisma = new PrismaClient({ adapter });
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
  }
}

/**
 * Helper Functions
 */

function capitalizeName(name?: string) {
  if (!name) return "";
  const trimmed = name.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function mapModality(uiModality?: string): modality_type | undefined {
  if (uiModality === "Telehealth") return "telehealth";
  if (uiModality === "In-Person") return "in_person";
  if (uiModality === "Hybrid") return "hybrid";
  return undefined;
}

/**
 * Server Actions
 */

export async function createClientAction(
  formData: ClientFormData,
): Promise<ActionResponse> {
  try {
    const newClient = await prisma.client_profile.create({
      data: {
        first_name: capitalizeName(formData.firstName),
        last_name: capitalizeName(formData.lastName),
        location: formData.location,
        preferred_language: formData.language,
        preferred_modality: mapModality(formData.modality),
        status: formData.status || PatientStatus.UNDER_REVIEW,
        dob: formData.dob,
        gender_identity: formData.gender,
      },
    });

    revalidatePath("/");
    return { success: true, data: newClient };
  } catch (error) {
    console.error("Error creating client:", error);
    return { success: false, error: "Failed to create client profile" };
  }
}

export async function getClientsAction() {
  try {
    return await prisma.client_profile.findMany({
      orderBy: { updated_at: "desc" },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        status: true,
        updated_at: true,
        dob: true,
        gender_identity: true,
        clinician_name: true,
        location: true,
        preferred_language: true,
        preferred_modality: true,
      },
    });
  } catch (error) {
    console.error("Error fetching clients:", error);
    return [];
  }
}

export async function updateClientAction(
  id: string,
  formData: Partial<ClientFormData>,
): Promise<ActionResponse> {
  try {
    const updatedClient = await prisma.client_profile.update({
      where: { id },
      data: {
        first_name: formData.firstName
          ? capitalizeName(formData.firstName)
          : undefined,
        last_name: formData.lastName
          ? capitalizeName(formData.lastName)
          : undefined,
        location: formData.location,
        preferred_language: formData.language,
        preferred_modality: mapModality(formData.modality),
        status: formData.status,
        dob: formData.dob,
        gender_identity: formData.gender,
        updated_at: new Date(),
      },
    });

    revalidatePath("/");
    return { success: true, data: updatedClient };
  } catch (error) {
    console.error("Error updating client:", error);
    return { success: false, error: "Failed to update client profile" };
  }
}

export async function deleteClientAction(id: string): Promise<ActionResponse> {
  try {
    await prisma.client_profile.delete({
      where: { id },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting client:", error);
    return { success: false, error: "Failed to delete client profile" };
  }
}
