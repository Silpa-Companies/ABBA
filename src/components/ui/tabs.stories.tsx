/**
 * @file        tabs.stories.tsx
 * @description Storybook stories for the Tabs component, demonstrating Default, Loading, Error, and Empty states.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import * as React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs"

const meta = {
  title: "Components/UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
}

export default meta

/**
 * Default interactive story displaying content switching
 */
export const Default = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="matching" count={12}>Matching</TabsTrigger>
        <TabsTrigger value="recommendations" count={3}>Recommendations</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="p-4 bg-muted/20 border rounded-lg">
        Overview content panel.
      </TabsContent>
      <TabsContent value="matching" className="p-4 bg-muted/20 border rounded-lg">
        Clinician matching search interface.
      </TabsContent>
      <TabsContent value="recommendations" className="p-4 bg-muted/20 border rounded-lg">
        Top shortlists recommendations.
      </TabsContent>
    </Tabs>
  ),
}

/**
 * Loading state showing a disabled/loading appearance
 */
export const Loading = {
  render: () => (
    <Tabs defaultValue="matching">
      <TabsList className="opacity-50 pointer-events-none">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="matching" count={0}>Matching</TabsTrigger>
      </TabsList>
      <div className="h-20 bg-muted/10 animate-pulse rounded-lg border border-dashed flex items-center justify-center text-sm text-muted-foreground">
        Retrieving workspace metadata...
      </div>
    </Tabs>
  ),
}

/**
 * Error state displaying warning indicators
 */
export const Error = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="matching" className="text-[var(--color-danger-500)] border-[var(--color-danger-500)]">
          Matching ⚠️
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="p-4 bg-[var(--color-danger-50)] text-[var(--color-danger-600)] border border-[var(--color-danger-500)]/20 rounded-lg">
        Failed to fetch recommendations data.
      </TabsContent>
    </Tabs>
  ),
}

/**
 * Empty / Non-populated state
 */
export const Empty = {
  render: () => (
    <Tabs defaultValue="records">
      <TabsList>
        <TabsTrigger value="records" count={0}>Records</TabsTrigger>
      </TabsList>
      <TabsContent value="records" className="h-24 bg-muted/10 border border-dashed rounded-lg flex items-center justify-center text-muted-foreground text-sm">
        No active records tags are defined for this client.
      </TabsContent>
    </Tabs>
  ),
}
