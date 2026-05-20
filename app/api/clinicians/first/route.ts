import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const clinician = await prisma.clinician_profile.findFirst();

  if (!clinician) {
    return NextResponse.json({ error: "No clinicians found" }, { status: 404 });
  }

  return NextResponse.json(clinician);
}
