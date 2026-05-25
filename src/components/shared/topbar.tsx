/**
 * @file        topbar.tsx
 * @description Contextual top bar with breadcrumb trails and action buttons.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronRightIcon } from "lucide-react"

import { ThemeToggle } from "./theme-toggle"

export interface BreadcrumbItem {
  /** Label displayed in the breadcrumb */
  label: string
  /** Optional link navigation target */
  href?: string
  /** Optional click handler for breadcrumb navigation */
  onClick?: () => void
}

export interface ActionConfig {
  /** Label text for the action button */
  label: string
  /** Click event callback */
  onClick: () => void
  /** Controls disabled loading state */
  isLoading?: boolean
  /** Alternative visual appearance styles */
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost"
}

export interface TopbarProps {
  /** Array of items representing location hierarchy */
  breadcrumbs: BreadcrumbItem[]
  /** Config for the main primary action button */
  primaryAction?: ActionConfig
  /** Config for the secondary action button */
  secondaryAction?: ActionConfig
  /** Optional additional elements in action area */
  children?: React.ReactNode
}

/**
 * Contextual Topbar component for global dashboard layout.
 * Avoids raw hex colors, utilizing var spacing and border properties.
 * 
 * @param props - Topbar layout properties
 * @returns React node
 */
export function Topbar({
  breadcrumbs,
  primaryAction,
  secondaryAction,
  children,
}: TopbarProps) {
  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between w-full border-b border-[var(--color-border)] bg-background/95 backdrop-blur-md"
      style={{
        height: "var(--spacing-16)",
        padding: "0 var(--spacing-6)",
      }}
    >
      {/* Breadcrumb Trail navigation */}
      <nav className="flex items-center text-sm font-medium" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 text-muted-foreground select-none">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1
            const isClickable = !isLast && (crumb.onClick || crumb.href)

            return (
              <li key={crumb.label} className="flex items-center gap-1.5">
                {idx > 0 && <ChevronRightIcon className="h-3.5 w-3.5" />}
                {isClickable ? (
                  <button
                    type="button"
                    onClick={crumb.onClick}
                    className="hover:text-foreground cursor-pointer transition-colors"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span className={cn(isLast && "text-foreground font-semibold")}>
                    {crumb.label}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>

      {/* Primary and secondary Action Buttons plus Theme Toggle */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        {children}
        {secondaryAction && (
          <Button
            type="button"
            variant={secondaryAction.variant || "outline"}
            onClick={secondaryAction.onClick}
            disabled={secondaryAction.isLoading}
            size="sm"
          >
            {secondaryAction.isLoading ? (
              <span className="h-3 w-3 animate-spin rounded-full border border-current border-t-transparent mr-1" />
            ) : null}
            {secondaryAction.label}
          </Button>
        )}
        {primaryAction && (
          <Button
            type="button"
            variant={primaryAction.variant || "default"}
            onClick={primaryAction.onClick}
            disabled={primaryAction.isLoading}
            size="sm"
          >
            {primaryAction.isLoading ? (
              <span className="h-3 w-3 animate-spin rounded-full border border-current border-t-transparent mr-1" />
            ) : null}
            {primaryAction.label}
          </Button>
        )}
      </div>
    </header>
  )
}
