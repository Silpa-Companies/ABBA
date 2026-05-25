/**
 * @file        sidebar.stories.tsx
 * @description Storybook stories for the Sidebar component, demonstrating Default, Loading, Error, and Empty states.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import * as React from "react"
import { Sidebar } from "./sidebar"

const meta = {
  title: "Components/Shared/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
}

export default meta

/**
 * Default sidebar navigation story (collapsed view)
 */
export const Default = {
  args: {
    activeItem: "patients",
    defaultCollapsed: true,
  },
}

/**
 * Loading state showing a disabled loading layout
 */
export const Loading = {
  args: {
    activeItem: "patients",
    defaultCollapsed: true,
    hasClinicianNotification: false,
  },
  render: (args: React.ComponentProps<typeof Sidebar>) => (
    <div className="opacity-50 pointer-events-none">
      <Sidebar {...args} />
    </div>
  ),
}

/**
 * Error / Warning state showing system indicators
 */
export const Error = {
  args: {
    activeItem: "patients",
    defaultCollapsed: false,
    hasClinicianNotification: true,
  },
  render: (args: React.ComponentProps<typeof Sidebar>) => (
    <div className="relative">
      <Sidebar {...args} />
      <div className="absolute top-0 right-0 p-1 bg-[var(--color-danger-500)] text-white text-[9px] font-bold rounded-bl-lg">
        Offline Mode
      </div>
    </div>
  ),
}

/**
 * Empty state story representing no clinician active notifications
 */
export const Empty = {
  args: {
    activeItem: "dashboard",
    defaultCollapsed: false,
    hasClinicianNotification: false,
  },
}
