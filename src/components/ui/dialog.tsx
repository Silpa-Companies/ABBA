/**
 * @file        dialog.tsx
 * @description Dialog / Modal component using React Portals, styled with design tokens.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import { XIcon } from "lucide-react"

export interface DialogProps {
  /** Visibility state of the modal */
  open: boolean
  /** Callback triggered when visibility state changes */
  onOpenChange: (open: boolean) => void
  /** Modal content */
  children: React.ReactNode
  /** Optional title displayed in header */
  title?: string
  /** Optional description text displayed under title */
  description?: string
  /** Optional custom container class */
  className?: string
  /** Displays a loading overlay instead of contents */
  isLoading?: boolean
  /** Highlights the modal header with an error banner if set */
  hasError?: boolean
}

/**
 * Reusable Dialog component for overlays and wizards.
 * Implements clean portal rendering to body, backdrop blur, and custom scroll bars.
 * 
 * @param props - Dialog props
 * @returns Portal React node
 */
export function Dialog({
  open,
  onOpenChange,
  children,
  title,
  description,
  className,
  isLoading = false,
  hasError = false,
}: DialogProps) {
  // Lock body scroll when modal is open to improve UX
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // Prevent rendering if not open
  if (!open) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if user clicks backdrop directly
    if (e.target === e.currentTarget) {
      onOpenChange(false)
    }
  }

  // Create markup to portal to document body
  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div
        className={cn(
          "relative flex flex-col w-full max-w-2xl bg-card rounded-2xl shadow-2xl border border-[var(--color-border)] max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200",
          className
        )}
        style={{
          // Apply design tokens for rounding and backgrounds
          borderRadius: "var(--radius-2xl)",
        }}
      >
        {/* Header section with optional error indicator */}
        {(title || description || hasError) && (
          <div
            className={cn(
              "px-6 py-4 border-b border-[var(--color-border)] flex flex-col gap-1",
              hasError && "bg-[var(--color-danger-50)] text-[var(--color-danger-600)]"
            )}
          >
            {hasError && (
              <div className="text-xs font-semibold uppercase tracking-wider mb-1">
                System Alert: Configuration Error
              </div>
            )}
            <div className="flex items-center justify-between">
              {title && (
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  {title}
                </h2>
              )}
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Close dialog"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
            {description && (
              <p className="text-sm text-muted-foreground leading-normal">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Content body container */}
        <div className="flex-1 overflow-y-auto px-6 py-5 relative min-h-0">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-card/85 z-10">
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
