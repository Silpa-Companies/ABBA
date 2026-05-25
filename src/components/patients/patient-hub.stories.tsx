/**
 * @file        patient-hub.stories.tsx
 * @description Storybook stories for the PatientHub component, demonstrating Default, Loading, Error, and Empty states.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import * as React from "react"
import { PatientHub } from "./patient-hub"
import { INITIAL_PATIENTS, type PatientRecord } from "@/lib/data/mock-data"

const meta = {
  title: "Features/Patients/PatientHub",
  component: PatientHub,
  tags: ["autodocs"],
}

export default meta

const actions = {
  onSelectPatient: (patient: PatientRecord) => alert(`Selected patient: ${patient.name}`),
  onNewIntake: () => alert("Opened Intake modal"),
  onDeletePatient: (id: string) => alert(`Deleted patient ID: ${id}`),
  onEditPatient: (patient: PatientRecord) => alert(`Editing details for: ${patient.name}`),
}

/**
 * Default interactive patient list dashboard
 */
export const Default = {
  args: {
    patients: INITIAL_PATIENTS,
    ...actions,
  },
}

/**
 * Loading state representation showing a disabled interface layout
 */
export const Loading = {
  args: {
    patients: INITIAL_PATIENTS.slice(0, 2),
    ...actions,
  },
  render: (args: React.ComponentProps<typeof PatientHub>) => (
    <div className="opacity-50 pointer-events-none">
      <PatientHub {...args} />
    </div>
  ),
}

/**
 * Error state story displaying failure text
 */
export const Error = {
  args: {
    patients: [],
    ...actions,
  },
  render: () => (
    <div className="w-full p-8 border border-[var(--color-danger-500)]/20 bg-[var(--color-danger-50)] text-[var(--color-danger-600)] rounded-xl text-center">
      <span className="font-semibold text-lg">Error loading patient roster</span>
      <p className="text-sm mt-1">Check database clusters connection status.</p>
    </div>
  ),
}

/**
 * Empty state story with no patient items
 */
export const Empty = {
  args: {
    patients: [],
    ...actions,
  },
}
