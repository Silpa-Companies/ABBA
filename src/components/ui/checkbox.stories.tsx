/**
 * @file        checkbox.stories.tsx
 * @description Storybook stories for the Checkbox component, demonstrating Default, Loading, Error, and Empty states.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import { Checkbox } from "./checkbox"

const meta = {
  title: "Components/UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
}

export default meta

/**
 * Default checked state story
 */
export const Default = {
  args: {
    checked: true,
  },
}

/**
 * Loading state story displaying a loading spinner
 */
export const Loading = {
  args: {
    checked: true,
    isLoading: true,
  },
}

/**
 * Error state story displaying red border highlights
 */
export const Error = {
  args: {
    checked: false,
    hasError: true,
  },
}

/**
 * Empty / Unchecked state story
 */
export const Empty = {
  args: {
    checked: false,
  },
}
