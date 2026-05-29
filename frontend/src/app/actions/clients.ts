"use server";

import { PrismaClient, PatientStatus, modality_type } from "@/generated/prisma";
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
  phone?: string;
  email?: string;
  pronouns?: string;
  reasonForCare?: string;
  presentingIssues?: string[];
  patientGoals?: string;
  goalAreas?: string[];
  telehealthLink?: string;
  therapistGender?: string;
  insuranceProvider?: string;
  planType?: string;
  memberId?: string;
  availability?: string[];
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
        dob: formData.dob,
        phone: formData.phone,
        email: formData.email,
        gender_identity: formData.gender,
        pronouns: formData.pronouns,
        reason_for_care: formData.reasonForCare,
        presenting_issues: formData.presentingIssues,
        treatment_goals: formData.patientGoals,
        goal_areas: formData.goalAreas,
        location: formData.location,
        telehealth_link: formData.telehealthLink,
        preferred_language: formData.language,
        therapist_gender_pref: formData.therapistGender,
        preferred_modality: mapModality(formData.modality),
        availability_blocks: formData.availability,
        insurance_provider: formData.insuranceProvider,
        insurance_plan: formData.planType,
        insurance_id: formData.memberId,
        status: formData.status || PatientStatus.UNDER_REVIEW,
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
        phone: true,
        email: true,
        pronouns: true,
        reason_for_care: true,
        presenting_issues: true,
        treatment_goals: true,
        goal_areas: true,
        telehealth_link: true,
        therapist_gender_pref: true,
        availability_blocks: true,
        insurance_provider: true,
        insurance_plan: true,
        insurance_id: true,
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
        dob: formData.dob,
        phone: formData.phone,
        email: formData.email,
        gender_identity: formData.gender,
        pronouns: formData.pronouns,
        reason_for_care: formData.reasonForCare,
        presenting_issues: formData.presentingIssues,
        treatment_goals: formData.patientGoals,
        goal_areas: formData.goalAreas,
        location: formData.location,
        telehealth_link: formData.telehealthLink,
        preferred_language: formData.language,
        therapist_gender_pref: formData.therapistGender,
        preferred_modality: mapModality(formData.modality),
        availability_blocks: formData.availability,
        insurance_provider: formData.insuranceProvider,
        insurance_plan: formData.planType,
        insurance_id: formData.memberId,
        status: formData.status,
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
