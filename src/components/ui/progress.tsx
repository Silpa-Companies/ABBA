/**
 * @file        progress.tsx
 * @description Reusable progress visualizations including linear bar, circular ring, and donut chart match score.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The current numeric progress value */
  value: number
  /** The maximum value representing 100% completion (default 100) */
  max?: number
  /** Visualization type: linear bar, circular progress indicator, or donut chart */
  variant?: "bar" | "circle" | "donut"
  /** Controls layout variant representation (Default, Loading, Error, Empty) */
  state?: "default" | "loading" | "error" | "empty"
}

/**
 * Reusable progress component with multiple shapes.
 * Avoids raw hex/pixel colors by utilizing design token variables.
 * 
 * @param props - Component props containing value, max, variant, state
 * @returns React node
 */
export function Progress({
  value,
  max = 100,
  variant = "bar",
  state = "default",
  className,
  ...props
}: ProgressProps) {
  // Ensure value lies between 0 and max (defaults to 0 in empty state)
  const currentVal = state === "empty" ? 0 : Math.min(Math.max(value, 0), max)
  const percentage = max > 0 ? (currentVal / max) * 100 : 0

  // Standard linear bar renderer
  if (variant === "bar") {
    return (
      <div
        className={cn(
          "w-full rounded-full overflow-hidden transition-all bg-[var(--color-gray-100)]",
          state === "loading" && "animate-pulse",
          className
        )}
        style={{
          height: "var(--spacing-2)",
        }}
        {...props}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300",
            state === "error"
              ? "bg-[var(--color-danger-500)]"
              : state === "loading"
              ? "bg-[var(--color-primary-300)]"
              : "bg-[var(--color-primary-600)]"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    )
  }

  // Circular ring or Donut chart settings
  const size = variant === "circle" ? 48 : 80
  const strokeWidth = variant === "circle" ? 4 : 6
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div
      className={cn(
        "relative flex items-center justify-center inline-flex select-none",
        state === "loading" && "animate-pulse",
        className
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      {...props}
    >
      <svg className="w-full h-full transform -rotate-90">
        {/* Background track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="var(--color-gray-100)"
          strokeWidth={strokeWidth}
        />
        {/* Foreground fill circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={
            state === "error"
              ? "var(--color-danger-500)"
              : state === "loading"
              ? "var(--color-primary-300)"
              : "var(--color-primary-600)"
          }
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>

      {/* Centered label element */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {variant === "donut" ? (
          <>
            <span className="text-base font-bold text-foreground">
              {state === "empty" ? "—" : `${Math.round(percentage)}%`}
            </span>
            <span
              className="text-[9px] uppercase tracking-wider text-muted-foreground"
              style={{ fontSize: "var(--font-size-xs)" }}
            >
              Match
            </span>
          </>
        ) : (
          <span className="text-xs font-semibold text-foreground">
            {state === "empty" ? "—" : `${Math.round(percentage)}%`}
          </span>
        )}
      </div>
    </div>
  )
}
