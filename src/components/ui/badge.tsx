/**
 * @file        badge.tsx
 * @description Reusable badge/pill component for displaying status, tags, and chips.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground",
        outline:
          "text-foreground border border-border",
        success:
          "bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[var(--color-success-600)]/20 dark:text-[var(--color-success-500)]",
        warning:
          "bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[var(--color-warning-600)]/20 dark:text-[var(--color-warning-500)]",
        danger:
          "bg-[var(--color-danger-50)] text-[var(--color-danger-600)] dark:bg-[var(--color-danger-600)]/20 dark:text-[var(--color-danger-500)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Optional loading state spinner instead of children */
  isLoading?: boolean
}

/**
 * Badge component for tags, status pills, and small text representations.
 * Uses css variables to conform to design token constraints.
 * 
 * @param props - Component props containing variant, isLoading and children
 * @returns React badge span
 */
export function Badge({
  className,
  variant,
  isLoading = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      style={{
        // Example token usage to strictly verify custom styles use var format
        padding: "var(--spacing-1) var(--spacing-3)",
      }}
      {...props}
    >
      {isLoading ? (
        // Render simple spinner when loading state is requested
        <span className="h-3 w-3 animate-spin rounded-full border border-current border-t-transparent" />
      ) : (
        children
      )}
    </span>
  )
}
