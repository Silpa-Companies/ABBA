import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const clinicians = await prisma.clinician_profile.findMany();
  return NextResponse.json({ clinicians });
}
