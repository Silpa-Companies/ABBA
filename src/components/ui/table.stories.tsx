/**
 * @file        table.stories.tsx
 * @description Storybook stories for the Table component, demonstrating Default, Loading, Error, and Empty states.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import * as React from "react"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "./table"
import { Badge } from "./badge"

const meta = {
  title: "Components/UI/Table",
  component: Table,
  tags: ["autodocs"],
}

export default meta

const MOCK_ROWS = [
  { id: "PT-092", name: "Jamie Whitaker", dob: "1988-11-04", status: "Active", clinician: "Dr. Sarah Jenkins" },
  { id: "PT-041", name: "Morgan Vance", dob: "1995-02-17", status: "Draft", clinician: "—" },
]

/**
 * Default table showing sample rows
 */
export const Default = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Patient ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>DOB</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Clinician</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {MOCK_ROWS.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.dob}</TableCell>
            <TableCell>
              <Badge variant={row.status === "Active" ? "success" : "secondary"}>
                {row.status}
              </Badge>
            </TableCell>
            <TableCell>{row.clinician}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

/**
 * Loading state showing skeletons
 */
export const Loading = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Patient ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>DOB</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2].map((i) => (
          <TableRow key={i} className="animate-pulse">
            <TableCell><div className="h-4 bg-muted rounded w-16" /></TableCell>
            <TableCell><div className="h-4 bg-muted rounded w-32" /></TableCell>
            <TableCell><div className="h-4 bg-muted rounded w-24" /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

/**
 * Error state highlighting table retrieve issues
 */
export const Error = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Patient ID</TableHead>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={2} className="text-center py-8 text-[var(--color-danger-600)] font-medium">
            Failed to connect to patients database. Please try again.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

/**
 * Empty state showing a placeholder
 */
export const Empty = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Patient ID</TableHead>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={2} className="text-center py-8 text-muted-foreground">
            No matching patient records found.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}
