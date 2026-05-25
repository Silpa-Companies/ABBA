/**
 * @file        sidebar.tsx
 * @description Icon-only fixed sidebar navigation with tooltips, active states, and activity dots.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboardIcon,
  UsersIcon,
  StethoscopeIcon,
  BarChart3Icon,
  SettingsIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"

export interface SidebarProps {
  /** The value of the active navigation item */
  activeItem?: "patients" | "clinicians" | "analytics" | "settings"
  /** Callback triggered when a navigation item is clicked */
  onItemChange?: (item: "patients" | "clinicians" | "analytics" | "settings") => void
  /** Controls if the sidebar is expanded to show labels (optional, default collapsed) */
  defaultCollapsed?: boolean
  /** Shows a notification dot on the Clinicians item */
  hasClinicianNotification?: boolean
}

/**
 * Sidebar navigation component for global dashboard layout.
 * Strictly avoids hardcoded hex/pixel sizing using spacing tokens.
 * 
 * @param props - Sidebar navigation state and triggers
 * @returns React node
 */
export function Sidebar({
  activeItem = "patients",
  onItemChange,
  defaultCollapsed = true,
  hasClinicianNotification = true,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)

  interface NavItem {
    id: "patients" | "clinicians" | "analytics" | "settings"
    label: string
    icon: React.ComponentType<{ className?: string }>
    hasDot?: boolean
  }

  const navItems: NavItem[] = [
    { id: "patients", label: "Patients", icon: UsersIcon },
    {
      id: "clinicians",
      label: "Clinicians",
      icon: StethoscopeIcon,
      hasDot: hasClinicianNotification,
    },
    { id: "analytics", label: "Analytics", icon: BarChart3Icon },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ]

  return (
    <div
      className={cn(
        "flex flex-col h-screen border-r border-[var(--color-border)] bg-card transition-all duration-300 relative select-none",
        isCollapsed ? "w-16" : "w-64"
      )}
      style={{
        // Example spacing tokens usage
        padding: "var(--spacing-4) 0",
      }}
    >
      {/* Platform Branding Logo */}
      <div
        className={cn(
          "flex items-center px-4 mb-8 text-foreground font-bold tracking-wider",
          isCollapsed ? "justify-center" : "justify-between"
        )}
      >
        <span className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-lg bg-[var(--color-primary-600)] flex items-center justify-center text-primary-foreground font-black text-sm">
            C
          </span>
          {!isCollapsed && <span className="font-heading text-lg">ABBA</span>}
        </span>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.id

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onItemChange?.(item.id)}
              className={cn(
                "group relative flex items-center w-full rounded-lg text-sm font-medium transition-all cursor-pointer hover:bg-muted text-muted-foreground hover:text-foreground",
                isActive && "bg-muted/80 text-[var(--color-primary-600)] dark:text-foreground font-semibold",
                isCollapsed ? "justify-center" : "justify-start px-3"
              )}
              style={{
                height: "var(--spacing-10)",
              }}
              title={isCollapsed ? item.label : undefined}
            >
              <div className="relative flex items-center justify-center">
                <Icon className={cn("h-5 w-5", isActive && "text-[var(--color-primary-600)]")} />
                {item.hasDot && (
                  // Notification red indicator dot for clinicians item (signals pending activity)
                  <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[var(--color-danger-500)] ring-1 ring-background animate-pulse" />
                )}
              </div>
              {!isCollapsed && (
                <span className="ml-3 truncate">{item.label}</span>
              )}
              {isCollapsed && (
                // Hover text tooltip for collapsed navigation
                <div className="absolute left-full ml-3 px-2 py-1 bg-black text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                  {item.label}
                </div>
              )}
            </button>
          )
        })}
      </nav>

      {/* Sidebar Expand / Collapse Toggle button */}
      <div className="px-3 border-t border-[var(--color-border)] pt-4 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-center w-full h-8 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRightIcon className="h-4 w-4" />
          ) : (
            <div className="flex items-center gap-2 text-xs font-semibold px-1 w-full justify-between">
              <span>Collapse</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </div>
          )}
        </button>

        {/* Current user Profile indicator at bottom */}
        <div
          className={cn(
            "flex items-center gap-3 pt-2 text-sm",
            isCollapsed ? "justify-center" : "justify-start px-2"
          )}
        >
          <div className="h-8 w-8 rounded-full bg-[var(--color-primary-600)] text-primary-foreground font-bold flex items-center justify-center text-xs">
            JD
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0 leading-tight">
              <span className="font-semibold truncate text-foreground">John Doe</span>
              <span className="text-[10px] text-muted-foreground truncate">Care Manager</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
