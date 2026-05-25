/**
 * @file        progress.stories.tsx
 * @description Storybook stories for the Progress component, demonstrating Default, Loading, Error, and Empty states.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import * as React from "react"
import { Progress } from "./progress"

const meta = {
  title: "Components/UI/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["bar", "circle", "donut"],
    },
    state: {
      control: "select",
      options: ["default", "loading", "error", "empty"],
    },
  },
}

export default meta

/**
 * Default active state story showing all three shapes
 */
export const Default = {
  render: (args: React.ComponentProps<typeof Progress>) => (
    <div className="flex flex-col gap-6 w-80">
      <div>
        <span className="text-xs text-muted-foreground mb-1 block">Bar Variant (75%)</span>
        <Progress {...args} value={75} variant="bar" />
      </div>
      <div className="flex gap-6 items-center">
        <div>
          <span className="text-xs text-muted-foreground mb-1 block">Circle</span>
          <Progress {...args} value={75} variant="circle" />
        </div>
        <div>
          <span className="text-xs text-muted-foreground mb-1 block">Donut (Match)</span>
          <Progress {...args} value={92} variant="donut" />
        </div>
      </div>
    </div>
  ),
}

/**
 * Loading state showing pulsating animation
 */
export const Loading = {
  render: (args: React.ComponentProps<typeof Progress>) => (
    <div className="flex flex-col gap-6 w-80">
      <Progress {...args} value={40} variant="bar" state="loading" />
      <Progress {...args} value={40} variant="circle" state="loading" />
    </div>
  ),
}

/**
 * Error state highlighting warnings/failures
 */
export const Error = {
  render: (args: React.ComponentProps<typeof Progress>) => (
    <div className="flex flex-col gap-6 w-80">
      <Progress {...args} value={100} variant="bar" state="error" />
      <Progress {...args} value={100} variant="circle" state="error" />
    </div>
  ),
}

/**
 * Empty / Blank state before scores are entered
 */
export const Empty = {
  render: (args: React.ComponentProps<typeof Progress>) => (
    <div className="flex flex-col gap-6 w-80">
      <Progress {...args} value={0} variant="bar" state="empty" />
      <Progress {...args} value={0} variant="circle" state="empty" />
    </div>
  ),
}
