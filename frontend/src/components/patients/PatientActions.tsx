"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Send } from "lucide-react";
import IntakeModal from "@/components/patients/IntakeModal";

// 1. Import your Prisma type (adjust the path if your generated client is somewhere else!)
import type { client_profile } from "@/generated/prisma";

// 2. Replace 'any' with the strict Prisma type
export default function PatientActions({
  patient,
}: {
  patient: client_profile;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="gap-2 text-gray-700 bg-white"
          onClick={() => setIsModalOpen(true)}
        >
          <Edit2 className="w-4 h-4" /> Edit Profile
        </Button>
        <Button className="gap-2 text-white bg-black">
          <Send className="w-4 h-4" /> Send to Patient
        </Button>
      </div>

      {/* Render the modal in "edit" mode and pass the patient data! */}
      <IntakeModal
        patient={patient}
        mode="edit"
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
