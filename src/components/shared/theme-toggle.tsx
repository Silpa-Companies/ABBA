/**
 * @file        theme-toggle.tsx
 * @description Interactive button to toggle application theme between Light and Dark mode using next-themes.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { SunIcon, MoonIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface ThemeToggleProps {
  /** Enables a disabled loading spinner inside the toggle */
  isLoading?: boolean
  /** Simulates a failed state displaying an error chip */
  hasError?: boolean
}

/**
 * ThemeToggle component allowing users to switch between Light and Dark theme modes.
 * Uses next-themes under the hood. Avoids hydration mismatch errors by deferring
 * rendering of theme-dependent visual icons until component is mounted on client.
 * 
 * @param props - Custom options like loading or error states
 * @returns React node
 */
export function ThemeToggle({ isLoading = false, hasError = false }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Wait until mounted on client to read resolved theme from local storage safely
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Toggle active mode
  const handleToggle = () => {
    if (isLoading || hasError) return
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  // Pre-mount SSR placeholder to prevent layout shifts. Matches the size of icon-sm button
  if (!mounted) {
    return (
      <div
        className="h-7 w-7 rounded-lg border border-[var(--color-border)] bg-muted/20"
        aria-hidden="true"
      />
    )
  }

  // Display disabled fallback when error condition is triggered
  if (hasError) {
    return (
      <Button
        type="button"
        variant="destructive"
        size="icon-sm"
        disabled
        title="Theme controller error"
        aria-label="Theme controller error"
      >
        <span className="text-[10px] font-bold">ERR</span>
      </Button>
    )
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      onClick={handleToggle}
      disabled={isLoading}
      title={resolvedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle light and dark mode"
      className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
    >
      {isLoading ? (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border border-current border-t-transparent" />
      ) : resolvedTheme === "dark" ? (
        <SunIcon className="h-4 w-4 text-amber-500 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <MoonIcon className="h-4 w-4 text-indigo-600 transition-transform duration-300 hover:-rotate-12" />
      )}
    </Button>
  )
}
