/**
 * @file        table.tsx
 * @description Standard table components for tabular records structured with design tokens.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  /** Enables an overall loading state spinner */
  isLoading?: boolean
  /** Highlights the grid under error parameters */
  hasError?: boolean
  /** Alternative message shown when table contains no records */
  emptyMessage?: string
}

/**
 * Table container wrapping tabular HTML element.
 * 
 * @param props - Table element attributes
 * @returns React node
 */
export function Table({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-[var(--color-border)] bg-card shadow-xs">
      <table
        className={cn("w-full caption-bottom text-sm border-collapse", className)}
        {...props}
      />
    </div>
  )
}

/**
 * Table Header wrapper.
 */
export function TableHeader({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn("bg-[var(--color-gray-50)] dark:bg-muted/30 border-b border-[var(--color-border)]", className)}
      {...props}
    />
  )
}

/**
 * Table Body wrapper.
 */
export function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

/**
 * Table Header Cell wrapper.
 */
export function TableHead({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "h-10 text-left align-middle font-semibold text-muted-foreground transition-colors select-none [&:has([role=checkbox])]:pr-0",
        className
      )}
      style={{
        padding: "var(--spacing-2) var(--spacing-4)",
        fontSize: "var(--font-size-xs)",
      }}
      {...props}
    />
  )
}

/**
 * Table Row wrapper.
 */
export function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "border-b border-[var(--color-border)] transition-colors hover:bg-[var(--color-gray-50)] dark:hover:bg-muted/15 data-[state=selected]:bg-muted/40",
        className
      )}
      {...props}
    />
  )
}

/**
 * Table Data Cell wrapper.
 */
export function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn(
        "align-middle text-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      style={{
        padding: "var(--spacing-3) var(--spacing-4)",
      }}
      {...props}
    />
  )
}
