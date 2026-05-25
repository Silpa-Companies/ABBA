/**
 * @file        avatar.stories.tsx
 * @description Storybook stories for the Avatar component, demonstrating Default, Loading, Error, and Empty states.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import * as React from "react"
import { Avatar } from "./avatar"

const meta = {
  title: "Components/UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    state: {
      control: "select",
      options: ["default", "loading", "error", "empty"],
    },
  },
}

export default meta

/**
 * Default active profile picture or fallback initials story
 */
export const Default = {
  render: (args: React.ComponentProps<typeof Avatar>) => (
    <div className="flex gap-4 items-center">
      <Avatar {...args} src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80" fallback="JW" size="md" />
      <Avatar {...args} fallback="JW" size="md" />
      <Avatar {...args} fallback="JW" size="lg" />
    </div>
  ),
}

/**
 * Loading state showing pulsing circle skeleton
 */
export const Loading = {
  render: (args: React.ComponentProps<typeof Avatar>) => (
    <div className="flex gap-4 items-center">
      <Avatar {...args} state="loading" size="sm" />
      <Avatar {...args} state="loading" size="md" />
    </div>
  ),
}

/**
 * Error state showing fallback text due to network error or format issues
 */
export const Error = {
  render: (args: React.ComponentProps<typeof Avatar>) => (
    <div className="flex gap-4 items-center">
      <Avatar {...args} state="error" fallback="ER" size="md" />
      <Avatar {...args} src="invalid-url.jpg" fallback="ER" size="md" />
    </div>
  ),
}

/**
 * Empty / Blank profile displaying a default icon
 */
export const Empty = {
  render: (args: React.ComponentProps<typeof Avatar>) => (
    <div className="flex gap-4 items-center">
      <Avatar {...args} state="empty" size="md" />
      <Avatar {...args} state="empty" size="lg" />
    </div>
  ),
}
