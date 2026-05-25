/**
 * @file        workspace-recommendations-tab.stories.tsx
 * @description Storybook stories for the WorkspaceRecommendationsTab component, demonstrating Default, Loading, Error, and Empty states.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import * as React from "react"
import { WorkspaceRecommendationsTab } from "./workspace-recommendations-tab"
import { INITIAL_PATIENTS, MOCK_CLINICIANS } from "@/lib/data/mock-data"

const meta = {
  title: "Features/Workspace/WorkspaceRecommendationsTab",
  component: WorkspaceRecommendationsTab,
  tags: ["autodocs"],
}

export default meta

const patient = INITIAL_PATIENTS[0]
const actions = {
  onUpdateRecommendations: (ids: string[]) => alert(`Updated Shortlists: ${ids.join(", ")}`),
  onSendToPatient: () => alert("Sent suggestions to patient"),
}

/**
 * Default interactive recommendations panel story
 */
export const Default = {
  args: {
    patient,
    clinicians: MOCK_CLINICIANS,
    recommendedIds: ["CL-001", "CL-002"],
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
    recommendedIds: ["CL-001"],
    isSending: true,
    ...actions,
  },
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
      Failed to compile email transmission templates.
    </div>
  ),
}

/**
 * Empty / Blank matches state story
 */
export const Empty = {
  args: {
    patient,
    clinicians: MOCK_CLINICIANS,
    recommendedIds: [],
    ...actions,
  },
}
