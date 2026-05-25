/**
 * @file        avatar.tsx
 * @description Avatar component representing patient initials and clinician photos.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { UserIcon } from "lucide-react"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image source URL */
  src?: string
  /** Fallback initials to display when image is absent or errors */
  fallback?: string
  /** Controls physical sizing constraints */
  size?: "sm" | "md" | "lg"
  /** Controls layout variant representation (Default, Loading, Error, Empty) */
  state?: "default" | "loading" | "error" | "empty"
}

/**
 * Avatar component using design tokens for sizes.
 * Integrates image error handlings to automatically display fallback initials.
 * 
 * @param props - Component props containing src, fallback, size, state
 * @returns React node
 */
export function Avatar({
  src,
  fallback,
  size = "md",
  state = "default",
  className,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false)

  // Dimensions classes mapping to design tokens
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-16 h-16 text-xl",
  }

  // Handle case where image loading failed
  const handleImageError = () => {
    setImageError(true)
  }

  const showFallback = state === "empty" || state === "error" || imageError || !src

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full overflow-hidden select-none bg-[var(--color-gray-100)] dark:bg-muted border border-[var(--color-border)] text-muted-foreground font-semibold",
        sizeClasses[size],
        state === "loading" && "animate-pulse",
        className
      )}
      {...props}
    >
      {state === "loading" ? (
        // Pulsing skeleton circle in loading state
        <div className="w-full h-full bg-[var(--color-gray-200)] animate-pulse rounded-full" />
      ) : showFallback ? (
        // Render text initials, fallback icons, or empty indicators
        fallback && state !== "empty" ? (
          <span className="uppercase text-foreground font-medium">{fallback}</span>
        ) : (
          <UserIcon className="h-1/2 w-1/2 text-muted-foreground" />
        )
      ) : (
        // Standard user clinician/patient image tag
        <img
          src={src}
          alt={fallback || "Avatar"}
          onError={handleImageError}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  )
}
