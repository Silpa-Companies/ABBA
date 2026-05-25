/**
 * @file        checkbox.tsx
 * @description Custom checkbox UI primitive styled with design token CSS variables.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { CheckIcon, MinusIcon } from "lucide-react"

export interface CheckboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onChange" | "checked"> {
  /** Checked state of the checkbox */
  checked?: boolean | "indeterminate"
  /** Callback triggered when checking state changes */
  onCheckedChange?: (checked: boolean) => void
  /** Displays a loading spinner and disables interaction */
  isLoading?: boolean
  /** Highlights the checkbox with an error border */
  hasError?: boolean
}

/**
 * Custom checkbox component matching design system tokens.
 * Uses inline styles/variables to prevent hardcoding hex or pixel values.
 * 
 * @param props - Props containing checked, onCheckedChange, isLoading, hasError, etc.
 * @returns React node
 */
export function Checkbox({
  checked = false,
  onCheckedChange,
  isLoading = false,
  hasError = false,
  disabled = false,
  className,
  id,
  ...props
}: CheckboxProps) {
  // Generate unique ID if none provided to ensure proper accessibility label wiring
  const generatedId = React.useId()
  const checkboxId = id || generatedId

  // Handle click to trigger change callback
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (disabled || isLoading) return
    
    // Toggle checked state
    if (onCheckedChange) {
      onCheckedChange(checked === "indeterminate" ? true : !checked)
    }
  }

  const isChecked = checked === true || checked === "indeterminate"

  return (
    <button
      type="button"
      id={checkboxId}
      role="checkbox"
      aria-checked={checked === "indeterminate" ? "mixed" : checked}
      disabled={disabled || isLoading}
      onClick={handleClick}
      className={cn(
        "flex items-center justify-center rounded border transition-all focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed",
        // Apply error border if hasError is true
        hasError
          ? "border-[var(--color-danger-500)]"
          : isChecked
          ? "bg-[var(--color-primary-600)] border-[var(--color-primary-600)]"
          : "bg-background border-[var(--color-border)] hover:border-[var(--color-primary-400)]",
        className
      )}
      style={{
        // Maintain checkbox size using design tokens
        width: "var(--spacing-4)",
        height: "var(--spacing-4)",
      }}
      {...props}
    >
      {isLoading ? (
        // Render tiny spinner in loading state
        <span className="h-2 w-2 animate-spin rounded-full border border-current border-t-transparent" />
      ) : checked === "indeterminate" ? (
        // Render dash for indeterminate state
        <MinusIcon className="h-3 w-3 text-primary-foreground stroke-[3]" />
      ) : checked === true ? (
        // Render checkmark icon for checked state
        <CheckIcon className="h-3 w-3 text-primary-foreground stroke-[3]" />
      ) : null}
    </button>
  )
}
