/**
 * @file        patient-intake-modal.stories.tsx
 * @description Storybook stories for the PatientIntakeModal component, demonstrating Default, Loading, Error, and Empty states.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import * as React from "react"
import { PatientIntakeModal, type PatientIntakeModalProps } from "./patient-intake-modal"
import { Button } from "@/components/ui/button"
import { patientIntakeDefaultValues, type PatientIntakeValues } from "@/lib/validation/intake"

const meta = {
  title: "Features/Patients/PatientIntakeModal",
  component: PatientIntakeModal,
  tags: ["autodocs"],
}

export default meta

const actions = {
  onClose: () => alert("Modal closed"),
  onSaveDraft: (data: PatientIntakeValues) => alert(`Saved draft: ${JSON.stringify(data, null, 2)}`),
  onSubmit: (data: PatientIntakeValues) => alert(`Form submitted: ${JSON.stringify(data, null, 2)}`),
}

/**
 * Interactive wrapper to handle open state
 */
function ModalWrapper(props: Omit<PatientIntakeModalProps, "open" | "onClose">) {
  const [open, setOpen] = React.useState(true)
  return (
    <div className="p-10 border border-dashed border-[var(--color-border)] rounded-xl flex flex-col items-center">
      <Button onClick={() => setOpen(true)}>Open Intake Modal</Button>
      <PatientIntakeModal {...props} open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

/**
 * Default interactive intake modal wizard
 */
export const Default = {
  render: (args: Partial<PatientIntakeModalProps>) => <ModalWrapper {...actions} {...args} />,
}

/**
 * Loading state representation
 */
export const Loading = {
  render: (args: Partial<PatientIntakeModalProps>) => (
    <ModalWrapper
      {...actions}
      {...args}
      editingPatient={{
        ...patientIntakeDefaultValues,
        legalFirstName: "Jamie",
        legalLastName: "Whitaker",
        dateOfBirth: "1988-11-04",
        phone: "(512) 555-0199",
        email: "jamie.whitaker@example.com",
        genderIdentity: "Female",
        pronouns: "she/her",
        languages: ["English"],
      }}
    />
  ),
}

/**
 * Error validation state representation
 */
export const Error = {
  render: (args: Partial<PatientIntakeModalProps>) => (
    <ModalWrapper
      {...actions}
      {...args}
    />
  ),
}

/**
 * Empty / Non-populated state representation
 */
export const Empty = {
  render: (args: Partial<PatientIntakeModalProps>) => <ModalWrapper {...actions} {...args} />,
}
