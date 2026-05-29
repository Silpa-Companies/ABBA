import { notFound } from "next/navigation";
import Link from "next/link";
import { format, differenceInYears } from "date-fns";
import {
  ChevronLeft,
  Edit2,
  Send,
  Activity,
  ClipboardList,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrismaClient } from "@/generated/prisma";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import PatientActions from "@/components/patients/PatientActions";

// Prisma Client Initialization (Server-side singleton pattern)
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

export default async function PatientOverviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Next.js 15 requires awaiting params
  const { id } = await params;

  // 1. Fetch the real patient data from the database using the ID in the URL
  const patient = await prisma.client_profile.findUnique({
    where: { id },
  });

  // 2. If the patient doesn't exist, show a 404 page
  if (!patient) {
    notFound();
  }

  // 3. Format the data for the UI
  const fullName =
    `${patient.first_name || ""} ${patient.last_name || ""}`.trim() ||
    "Unknown Patient";
  const initials =
    `${patient.first_name?.[0] || ""}${patient.last_name?.[0] || ""}`.toUpperCase() ||
    "?";
  const dobDisplay = patient.dob
    ? format(new Date(patient.dob), "d MMM yyyy")
    : "—";
  const ageDisplay = patient.dob
    ? `${differenceInYears(new Date(), new Date(patient.dob))} years old`
    : "—";

  // Format the status enum (e.g., "UNDER_REVIEW" -> "Under Review")
  const formattedStatus = patient.status
    ? patient.status
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (c: string) => c.toUpperCase())
    : "Draft";

  // Create a clean system ID (e.g., CM-A1B2C3) using the first 6 characters of their database ID
  const systemId = `CM-${patient.id.slice(0, 6).toUpperCase()}`;

  return (
    <div className="min-h-screen p-6 bg-gray-50/50">
      {/* 1. TOP NAVIGATION / BREADCRUMBS */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-gray-500">
          ABBA <span className="mx-2">/</span> Patients{" "}
          <span className="mx-2">/</span>{" "}
          <span className="font-medium text-gray-900">{fullName}</span>
        </div>
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2">
            <ChevronLeft className="w-4 h-4" />
            Back to Patients
          </Button>
        </Link>
      </div>

      {/* 2. PATIENT HEADER */}
      <div className="flex items-center justify-between p-6 bg-white border border-b-0 border-gray-200 rounded-t-xl">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white rounded-full bg-slate-800">
            {initials}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{fullName}</h1>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
              <span>DOB: {dobDisplay}</span>
              <span>•</span>
              <span>{systemId}</span>
              <span>•</span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium">
                {formattedStatus}
              </span>
            </div>
          </div>
        </div>
        <PatientActions patient={patient} />
      </div>

      {/* 3. TABS */}
      <div className="flex gap-6 px-6 mb-6 text-sm font-medium bg-white border border-gray-200 rounded-b-xl">
        <div className="flex items-center gap-2 py-4 text-black border-b-2 border-black cursor-pointer">
          <ClipboardList className="w-4 h-4" /> Overview
        </div>
        <div className="flex items-center gap-2 py-4 text-gray-500 cursor-pointer hover:text-gray-900">
          <FileText className="w-4 h-4" /> Clinical Notes{" "}
          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
            0
          </span>
        </div>
        <div className="flex items-center gap-2 py-4 text-gray-500 cursor-pointer hover:text-gray-900">
          <Activity className="w-4 h-4" /> Matching
        </div>
      </div>

      {/* 4. MAIN CONTENT GRID */}
      {/* 4. MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* LEFT COLUMN (WIDER) */}
        <div className="space-y-6 lg:col-span-2">
          {/* Goals & Preferences Card */}
          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            {/* Added justify-between and the pencil icon */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">
                Goals & Preferences
              </h2>
              <button className="text-gray-400 transition-colors hover:text-gray-600">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>

            {patient.reason_for_care ? (
              <p className="mb-4 text-sm text-gray-700">
                {patient.reason_for_care}
              </p>
            ) : (
              <div className="flex items-center justify-center mb-4 border border-gray-100 border-dashed rounded-lg h-24 bg-gray-50">
                <span className="text-sm text-gray-400">
                  No primary reason for care provided.
                </span>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-xs text-gray-600 bg-gray-100 border border-gray-200 rounded-full">
                {patient.preferred_modality === "telehealth"
                  ? "Telehealth Preferred"
                  : patient.preferred_modality === "in_person"
                    ? "In-Person Preferred"
                    : "Hybrid Modality"}
              </span>
              {patient.preferred_language && (
                <span className="px-3 py-1 text-xs text-gray-600 bg-gray-100 border border-gray-200 rounded-full">
                  {patient.preferred_language} Speaking
                </span>
              )}
            </div>
          </div>

          {/* Screening Results Card */}
          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-gray-900">Screening Results</h2>
              <button className="text-gray-400 transition-colors hover:text-gray-600">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-center p-6 border border-gray-100 border-dashed rounded-lg bg-gray-50">
              <span className="text-sm text-gray-500">
                No screening assessments have been completed yet.
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (NARROWER) */}
        <div className="space-y-6">
          {/* Demographics Card */}
          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-gray-900">Demographics</h2>
              <button className="text-gray-400 transition-colors hover:text-gray-600">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>

            {/* Rebuilt grid to match the mockup row structure */}
            <div className="grid grid-cols-2 text-sm gap-y-6 gap-x-4">
              <div>
                <p className="mb-1 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  Full Name
                </p>
                <p className="font-medium text-gray-900">{fullName}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  Pronouns
                </p>
                <p className="font-medium text-gray-900">
                  {patient.pronouns || "Unspecified"}
                </p>
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  Date of Birth
                </p>
                <p className="font-medium text-gray-900">{dobDisplay}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  Age
                </p>
                <p className="font-medium text-gray-900">{ageDisplay}</p>
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  Phone
                </p>
                <p className="font-medium text-gray-900">
                  {patient.phone || "Unspecified"}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  Preferred Contact
                </p>
                <p className="font-medium text-gray-900">Email</p>
              </div>

              <div className="col-span-2">
                <p className="mb-1 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  Email
                </p>
                <p className="font-medium text-blue-600 truncate">
                  {patient.email || "Unspecified"}
                </p>
              </div>
              <div className="col-span-2">
                <p className="mb-1 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  Address
                </p>
                <p className="font-medium text-gray-900">
                  {patient.location || "Unspecified"}
                </p>
              </div>
            </div>

            {/* Insurance Section Divider */}
            <hr className="my-6 border-gray-100" />

            <div className="grid grid-cols-2 text-sm gap-y-6 gap-x-4">
              <div className="col-span-2">
                <p className="mb-1 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  Insurance
                </p>
                <p className="font-medium text-gray-900">
                  {patient.insurance_provider || "Self-Pay / Not Provided"}
                </p>
              </div>
              {patient.insurance_provider && (
                <>
                  <div>
                    <p className="mb-1 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                      Member ID
                    </p>
                    <p className="font-medium text-gray-900">
                      {patient.insurance_id || "--"}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                      Plan Type
                    </p>
                    <p className="font-medium text-gray-900">
                      {patient.insurance_plan || "--"}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
