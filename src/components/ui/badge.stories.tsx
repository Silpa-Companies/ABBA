/**
 * @file        badge.stories.tsx
 * @description Storybook stories for the Badge component, showcasing Default, Loading, Error, and Empty states.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import { Badge } from "./badge"

const meta = {
  title: "Components/UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "success", "warning", "danger"],
    },
  },
}

export default meta

/**
 * Default active state story
 */
export const Default = {
  args: {
    variant: "default",
    children: "Active Status",
  },
}

/**
 * Loading state story displaying a spinner
 */
export const Loading = {
  args: {
    variant: "default",
    isLoading: true,
    children: "Loading Status",
  },
}

/**
 * Error state story with danger theme
 */
export const Error = {
  args: {
    variant: "danger",
    children: "Failed to load",
  },
}

/**
 * Empty / Null state story representing no value
 */
export const Empty = {
  args: {
    variant: "outline",
    children: "—",
  },
}
