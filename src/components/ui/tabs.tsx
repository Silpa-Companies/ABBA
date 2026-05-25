/**
 * @file        tabs.tsx
 * @description Tabs components for section navigation styled with design tokens.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Context for shareable active tab state
const TabsContext = React.createContext<{
  value?: string
  onValueChange?: (val: string) => void
}>({})

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The value of the default selected tab */
  defaultValue?: string
  /** Controlled value of active tab */
  value?: string
  /** Callback triggered when selected tab changes */
  onValueChange?: (value: string) => void
}

/**
 * Root container for Tabs.
 */
export function Tabs({
  defaultValue,
  value,
  onValueChange,
  className,
  children,
  ...props
}: TabsProps) {
  const [localActiveTab, setLocalActiveTab] = React.useState(defaultValue)
  const activeTab = value !== undefined ? value : localActiveTab

  const handleValueChange = React.useCallback(
    (newVal: string) => {
      if (value === undefined) {
        setLocalActiveTab(newVal)
      }
      if (onValueChange) {
        onValueChange(newVal)
      }
    },
    [value, onValueChange]
  )

  return (
    <TabsContext.Provider value={{ value: activeTab, onValueChange: handleValueChange }}>
      <div className={cn("w-full flex flex-col gap-4", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export type TabsListProps = React.HTMLAttributes<HTMLDivElement>

/**
 * List container for tabs triggers.
 */
export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 border-b border-[var(--color-border)] overflow-x-auto scrollbar-none",
        className
      )}
      style={{
        paddingBottom: "var(--spacing-1)",
      }}
      {...props}
    />
  )
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Uniquely identifies this tab trigger */
  value: string
  /** Shows a badge count indicator */
  count?: number
}

/**
 * Tab trigger button.
 */
export function TabsTrigger({
  value,
  count,
  className,
  children,
  ...props
}: TabsTriggerProps) {
  const context = React.useContext(TabsContext)
  const isActive = context.value === value

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => context.onValueChange?.(value)}
      className={cn(
        "inline-flex items-center gap-1.5 font-medium whitespace-nowrap transition-all border-b-2 border-transparent cursor-pointer text-muted-foreground hover:text-foreground",
        isActive && "text-[var(--color-primary-600)] border-[var(--color-primary-600)] font-semibold",
        className
      )}
      style={{
        padding: "var(--spacing-2) var(--spacing-4)",
        fontSize: "var(--font-size-sm)",
      }}
      {...props}
    >
      <span>{children}</span>
      {count !== undefined ? (
        <span
          className={cn(
            "rounded-full text-[10px] font-bold px-1.5 py-0.5",
            isActive
              ? "bg-[var(--color-primary-100)] text-[var(--color-primary-700)]"
              : "bg-[var(--color-gray-100)] text-muted-foreground"
          )}
        >
          {count}
        </span>
      ) : null}
    </button>
  )
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Matches the trigger value to control visibility */
  value: string
}

/**
 * Container rendering only when its value matches the active tab.
 */
export function TabsContent({ value, className, children, ...props }: TabsContentProps) {
  const context = React.useContext(TabsContext)
  const isActive = context.value === value

  if (!isActive) return null

  return (
    <div
      role="tabpanel"
      className={cn("flex-1 min-w-0 outline-none animate-in fade-in duration-200", className)}
      {...props}
    >
      {children}
    </div>
  )
}
