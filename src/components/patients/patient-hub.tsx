/**
 * @file        patient-hub.tsx
 * @description Patient List Hub for managing intakes, searching, filtering, and bulk actions.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  SearchIcon,
  Trash2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreVerticalIcon,
  Edit2Icon,
  UserCheckIcon,
  ActivityIcon,
} from "lucide-react"
import type { PatientRecord } from "@/lib/data/mock-data"

export interface PatientHubProps {
  /** Master patient record list */
  patients: PatientRecord[]
  /** Triggered when a patient profile row is opened */
  onSelectPatient: (patient: PatientRecord) => void
  /** Triggered when the intake form modal should open for a new patient */
  onNewIntake: () => void
  /** Triggered when a patient record is deleted */
  onDeletePatient: (id: string) => void
  /** Triggered when editing details is requested for an existing draft */
  onEditPatient: (patient: PatientRecord) => void
  /** Triggered when bulk actions are completed */
  onBulkUpdate?: (ids: string[], action: "delete" | "status" | "assign", value?: string) => void
}

/**
 * Main Patient Hub container view.
 * Integrates search, filters, pagination, and multi-row bulk modifications.
 * 
 * @param props - Patient hub callbacks and records
 * @returns React node
 */
export function PatientHub({
  patients,
  onSelectPatient,
  onNewIntake,
  onDeletePatient,
  onEditPatient,
  onBulkUpdate,
}: PatientHubProps) {
  // Simple state fields
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("All")
  const [clinicianFilter, setClinicianFilter] = React.useState("All")
  const [selectedIds, setSelectedIds] = React.useState<string[]>([])
  const [pageSize, setPageSize] = React.useState(8)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [activeMenuId, setActiveMenuId] = React.useState<string | null>(null)

  // Extract unique clinicians list
  const clinicianOptions: string[] = []
  patients.forEach((p) => {
    if (p.assignedClinician && p.assignedClinician !== "—" && !clinicianOptions.includes(p.assignedClinician)) {
      clinicianOptions.push(p.assignedClinician)
    }
  })

  // Filter patients list
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.id.toLowerCase().includes(search.toLowerCase()) ||
      patient.email.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = statusFilter === "All" || patient.status === statusFilter
    const matchesClinician = clinicianFilter === "All" || patient.assignedClinician === clinicianFilter

    return matchesSearch && matchesStatus && matchesClinician
  })

  // Pagination bounds
  const totalItems = filteredPatients.length
  const totalPages = Math.ceil(totalItems / pageSize) || 1
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  // Selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedPatients.map((p) => p.id))
    } else {
      setSelectedIds([])
    }
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id])
    } else {
      setSelectedIds(selectedIds.filter((item) => item !== id))
    }
  }

  // Get status color mappings
  const getStatusBadgeVariant = (status: PatientRecord["status"]) => {
    if (status === "Active") return "success"
    if (status === "Under Review") return "warning"
    if (status === "Matched") return "default"
    return "secondary"
  }

  const getStatusIndicatorColor = (status: PatientRecord["status"]) => {
    if (status === "Active") return "bg-green-500"
    if (status === "Under Review") return "bg-amber-500"
    if (status === "Matched") return "bg-white"
    return "bg-gray-400"
  }

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      {/* Search and Filters panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-card border border-[var(--color-border)] p-4 rounded-xl shadow-xs">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
          <div className="relative w-full max-w-sm">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search patients by name, ID, email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-9 h-9 w-full"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="h-8 rounded-lg border border-[var(--color-border)] bg-background px-2.5 py-1 text-xs outline-none focus:border-ring focus:ring-1 focus:ring-ring"
            >
              <option value="All">All Statuses</option>
              <option value="Draft">Draft</option>
              <option value="Under Review">Under Review</option>
              <option value="Matched">Matched</option>
              <option value="Active">Active</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">Clinician:</span>
            <select
              value={clinicianFilter}
              onChange={(e) => {
                setClinicianFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="h-8 rounded-lg border border-[var(--color-border)] bg-background px-2.5 py-1 text-xs outline-none focus:border-ring focus:ring-1 focus:ring-ring max-w-[150px] truncate"
            >
              <option value="All">All Clinicians</option>
              {clinicianOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button onClick={onNewIntake} variant="default" size="sm">
          + New Patient Intake
        </Button>
      </div>

      {/* Bulk actions menu */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between bg-[var(--color-primary-50)] dark:bg-muted/30 border border-[var(--color-primary-200)] dark:border-[var(--color-border)] px-4 py-3 rounded-lg animate-in slide-in-from-top-2 duration-250">
          <span className="text-sm font-semibold text-[var(--color-primary-800)] dark:text-foreground">
            {selectedIds.length} patient{selectedIds.length > 1 ? "s" : ""} selected
          </span>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => {
                if (onBulkUpdate) {
                  onBulkUpdate(selectedIds, "status", "Active")
                  setSelectedIds([])
                }
              }}
              variant="outline"
              size="sm"
              className="h-7 text-xs bg-background"
            >
              <UserCheckIcon className="h-3 w-3 mr-1" />
              Mark Active
            </Button>
            <Button
              onClick={() => {
                if (confirm(`Delete the ${selectedIds.length} selected patient records?`) && onBulkUpdate) {
                  onBulkUpdate(selectedIds, "delete")
                  setSelectedIds([])
                }
              }}
              variant="destructive"
              size="sm"
              className="h-7 text-xs"
            >
              <Trash2Icon className="h-3 w-3 mr-1" />
              Delete Records
            </Button>
          </div>
        </div>
      )}

      {/* Patients Data Grid Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox
                checked={paginatedPatients.length > 0 && paginatedPatients.every((p) => selectedIds.includes(p.id))}
                onCheckedChange={handleSelectAll}
                aria-label="Select all patients"
              />
            </TableHead>
            <TableHead>Patient Details</TableHead>
            <TableHead>Patient ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned Clinician</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="w-12 text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedPatients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                No patients match the specified filter query.
              </TableCell>
            </TableRow>
          ) : (
            paginatedPatients.map((patient) => {
              const isSelected = selectedIds.includes(patient.id)
              const status = patient.status

              return (
                <TableRow
                  key={patient.id}
                  data-state={isSelected ? "selected" : undefined}
                  className="group/row"
                >
                  <TableCell>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => handleSelectRow(patient.id, checked)}
                      aria-label={`Select row ${patient.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div
                      className="flex flex-col cursor-pointer"
                      onClick={() => onSelectPatient(patient)}
                    >
                      <span className="font-semibold text-foreground group-hover/row:text-[var(--color-primary-600)] transition-colors">
                        {patient.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {patient.dob} ({patient.sex}) • {patient.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{patient.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <Badge variant={getStatusBadgeVariant(status)}>
                        <span className={cn("h-1.5 w-1.5 rounded-full mr-1", getStatusIndicatorColor(status))} />
                        {status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{patient.assignedClinician}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(patient.lastUpdated).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell className="text-right relative">
                    <button
                      type="button"
                      onClick={() => setActiveMenuId(activeMenuId === patient.id ? null : patient.id)}
                      className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      <MoreVerticalIcon className="h-4 w-4" />
                    </button>

                    {activeMenuId === patient.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)} />
                        <div className="absolute right-4 mt-1 w-36 bg-card border border-[var(--color-border)] rounded-lg shadow-lg py-1 z-20 text-left animate-in fade-in zoom-in-95 duration-100">
                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null)
                              onSelectPatient(patient)
                            }}
                            className="flex items-center w-full px-3 py-1.5 text-xs text-foreground hover:bg-muted cursor-pointer"
                          >
                            <ActivityIcon className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                            View Workspace
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null)
                              onEditPatient(patient)
                            }}
                            className="flex items-center w-full px-3 py-1.5 text-xs text-foreground hover:bg-muted cursor-pointer"
                          >
                            <Edit2Icon className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                            Edit Details
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null)
                              if (confirm(`Delete the record for ${patient.name}?`)) {
                                onDeletePatient(patient.id)
                              }
                            }}
                            className="flex items-center w-full px-3 py-1.5 text-xs text-[var(--color-danger-600)] hover:bg-[var(--color-danger-50)] cursor-pointer"
                          >
                            <Trash2Icon className="h-3.5 w-3.5 mr-2 text-[var(--color-danger-500)]" />
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>

      {/* Pagination controls footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
              setCurrentPage(1)
            }}
            className="h-8 rounded-lg border border-[var(--color-border)] bg-background px-2.5 py-1 text-xs outline-none"
          >
            <option value={8}>8 rows</option>
            <option value={16}>16 rows</option>
            <option value={32}>32 rows</option>
            <option value={50}>50 rows</option>
          </select>
          <span className="text-xs text-muted-foreground">
            Showing {totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1}–
            {Math.min(currentPage * pageSize, totalItems)} of {totalItems} results
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="h-8 w-8"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <span className="text-xs font-semibold px-2">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="h-8 w-8"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

