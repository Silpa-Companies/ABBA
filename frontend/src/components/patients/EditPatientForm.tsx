"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateClientAction } from "@/app/actions/clients";
import type { client_profileModel as client_profile } from "@/generated/prisma/models/client_profile";

export default function EditPatientForm({
  patient,
}: {
  patient: client_profile;
}) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    firstName: patient.first_name,
    lastName: patient.last_name,
    location: patient.location || "",
    modality: patient.preferred_modality,
  });

  // Look how much cleaner this is! No 'e', no preventDefault().
  const handleUpdate = async () => {
    setIsSaving(true);

    const response = await updateClientAction(patient.id, formData);

    if (response.success) {
      router.refresh();
      // onClose() goes here if this is inside a modal!
    } else {
      alert("Failed to update patient profile.");
    }

    setIsSaving(false);
  };

  return (
    // Swap 'onSubmit' for React's new 'action' attribute
    <form action={handleUpdate}>
      {/* Your form inputs */}
      <button type="submit" disabled={isSaving}>
        {isSaving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
