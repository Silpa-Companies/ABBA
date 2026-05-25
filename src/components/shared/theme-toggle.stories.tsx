/**
 * @file        theme-toggle.stories.tsx
 * @description Storybook stories for the ThemeToggle component, verifying Default, Loading, Error, and Empty states.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import * as React from "react"
import { ThemeToggle } from "./theme-toggle"
import { ThemeProvider } from "./theme-provider"

const meta = {
  title: "Components/Shared/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  decorators: [
    (Story: React.ComponentType) => (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="p-6 bg-background text-foreground min-h-[100px] flex items-center justify-center border border-[var(--color-border)] rounded-lg">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
}

export default meta

/**
 * Standard ThemeToggle in normal functional state
 */
export const Default = {
  args: {},
}

/**
 * Loading state with disabled indicator and spinner icon
 */
export const Loading = {
  args: {
    isLoading: true,
  },
}

/**
 * Error state simulating failed settings or components
 */
export const Error = {
  args: {
    hasError: true,
  },
}

/**
 * Empty / unset default fallback state
 */
export const Empty = {
  args: {},
}
