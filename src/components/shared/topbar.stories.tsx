/**
 * @file        topbar.stories.tsx
 * @description Storybook stories for the Topbar component, demonstrating Default, Loading, Error, and Empty states.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import { Topbar } from "./topbar"

const meta = {
  title: "Components/Shared/Topbar",
  component: Topbar,
  tags: ["autodocs"],
}

export default meta

const BREADCRUMBS = [
  { label: "ABBA", onClick: () => alert("Home clicked") },
  { label: "Patients", onClick: () => alert("Patients clicked") },
  { label: "Jamie Whitaker" },
]

/**
 * Default topbar story with standard action buttons
 */
export const Default = {
  args: {
    breadcrumbs: BREADCRUMBS,
    primaryAction: {
      label: "New Patient Intake",
      onClick: () => alert("Intake triggered"),
    },
    secondaryAction: {
      label: "Send to Patient",
      onClick: () => alert("Send triggered"),
    },
  },
}

/**
 * Loading state showing a spinner inside the action button
 */
export const Loading = {
  args: {
    breadcrumbs: BREADCRUMBS,
    primaryAction: {
      label: "Intake",
      onClick: () => { },
      isLoading: false,
    },
    secondaryAction: {
      label: "Sending...",
      onClick: () => { },
      isLoading: true,
    },
  },
}

/**
 * Error state highlighting error message or danger styling
 */
export const Error = {
  args: {
    breadcrumbs: BREADCRUMBS,
    primaryAction: {
      label: "Delete Patient Record",
      onClick: () => alert("Delete triggered"),
      variant: "destructive",
    },
  },
}

/**
 * Empty state story with no actions
 */
export const Empty = {
  args: {
    breadcrumbs: [{ label: "ABBA" }],
  },
}
