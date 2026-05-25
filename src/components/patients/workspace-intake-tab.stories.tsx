/**
 * @file        workspace-intake-tab.stories.tsx
 * @description Storybook stories for the WorkspaceIntakeTab component, demonstrating Default, Loading, Error, and Empty states.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import * as React from "react"
import { WorkspaceIntakeTab } from "./workspace-intake-tab"
import { INITIAL_PATIENTS, type PatientRecord } from "@/lib/data/mock-data"

const meta = {
  title: "Features/Workspace/WorkspaceIntakeTab",
  component: WorkspaceIntakeTab,
  tags: ["autodocs"],
}

export default meta

const patient = INITIAL_PATIENTS[0]
const actions = {
  onEditIntake: () => alert("Edit Intake Clicked"),
  onUpdatePatient: (updated: PatientRecord) => alert(`Updated patient: ${JSON.stringify(updated, null, 2)}`),
}

/**
 * Default filled intake profile workspace story
 */
export const Default = {
  args: {
    patient,
    ...actions,
  },
}

/**
 * Loading state showing a disabled layout
 */
export const Loading = {
  args: {
    patient,
    ...actions,
  },
  render: (args: React.ComponentProps<typeof WorkspaceIntakeTab>) => (
    <div className="opacity-50 pointer-events-none">
      <WorkspaceIntakeTab {...args} />
    </div>
  ),
}

/**
 * Error state story with details
 */
export const Error = {
  args: {
    patient,
    ...actions,
  },
  render: () => (
    <div className="p-8 border border-[var(--color-danger-500)] bg-[var(--color-danger-50)] text-[var(--color-danger-600)] text-sm rounded-xl text-center">
      Failed to retrieve patient medical profile notes.
    </div>
  ),
}

/**
 * Empty state story with minimal demographics entered
 */
export const Empty = {
  args: {
    patient: INITIAL_PATIENTS[1], // Morgan Vance (draft status, empty screening)
    ...actions,
  },
}
