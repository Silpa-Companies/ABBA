/**
 * @file        patient-workspace.stories.tsx
 * @description Storybook stories for the PatientWorkspace component, demonstrating Default, Loading, Error, and Empty states.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import * as React from "react"
import { PatientWorkspace } from "./patient-workspace"
import { INITIAL_PATIENTS, MOCK_CLINICIANS, type PatientRecord } from "@/lib/data/mock-data"

const meta = {
  title: "Features/Workspace/PatientWorkspace",
  component: PatientWorkspace,
  tags: ["autodocs"],
}

export default meta

const patient = INITIAL_PATIENTS[0]
const actions = {
  onBack: () => alert("Back Clicked"),
  onEditIntake: () => alert("Edit Intake Clicked"),
  onUpdateRecommendations: (ids: string[]) => alert(`Updated Recommendations: ${ids.join(", ")}`),
  onUpdatePatient: (updated: PatientRecord) => alert(`Updated patient: ${JSON.stringify(updated, null, 2)}`),
}

/**
 * Default interactive workspace dashboard
 */
export const Default = {
  args: {
    patient,
    clinicians: MOCK_CLINICIANS,
    recommendedIds: ["CL-001"],
    ...actions,
  },
}

/**
 * Loading state showing a disabled layout
 */
export const Loading = {
  args: {
    patient,
    clinicians: MOCK_CLINICIANS,
    recommendedIds: [],
    ...actions,
  },
  render: (args: React.ComponentProps<typeof PatientWorkspace>) => (
    <div className="opacity-50 pointer-events-none">
      <PatientWorkspace {...args} />
    </div>
  ),
}

/**
 * Error state story with details
 */
export const Error = {
  args: {
    patient,
    clinicians: [],
    recommendedIds: [],
    ...actions,
  },
  render: () => (
    <div className="p-8 border border-[var(--color-danger-500)] bg-[var(--color-danger-50)] text-[var(--color-danger-600)] text-sm rounded-xl text-center">
      Failed to synchronize patient care workspace.
    </div>
  ),
}

/**
 * Empty state story with no recommendations shortlisted
 */
export const Empty = {
  args: {
    patient: INITIAL_PATIENTS[1], // Morgan Vance (draft status)
    clinicians: MOCK_CLINICIANS,
    recommendedIds: [],
    ...actions,
  },
}
