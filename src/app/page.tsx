/**
 * @file        page.tsx
 * @description Main dashboard page assembling the ABBA global shell, navigation sidebar, contextual topbar, patient hub, and workspace panels.
 * @owner       Shared Design System / Frontend Team
 * @created     2026-05-24
 */

"use client"

import * as React from "react"
import { Sidebar } from "@/components/shared/sidebar"
import { Topbar, type BreadcrumbItem } from "@/components/shared/topbar"
import { PatientHub } from "@/components/patients/patient-hub"
import { PatientWorkspace } from "@/components/patients/patient-workspace"
import { PatientIntakeModal } from "@/components/patients/patient-intake-modal"
import { INITIAL_PATIENTS, MOCK_CLINICIANS, type PatientRecord } from "@/lib/data/mock-data"
import type { PatientIntakeValues } from "@/lib/validation/intake"
import { toast } from "sonner"

/**
 * ABBA Application container.
 * Manages full client-side state for patients and matching shortlisted clinician recommendations.
 * 
 * @returns React view layout
 */
export default function Home() {
  // Simple react states for core features
  const [patients, setPatients] = React.useState<PatientRecord[]>(INITIAL_PATIENTS)
  const [activePatient, setActivePatient] = React.useState<PatientRecord | null>(null)

  // Track recommendations shortlist (IDs of clinicians) per patient ID
  const [shortlists, setShortlists] = React.useState<Record<string, string[]>>({
    "PT-001": ["CL-001"],
    "PT-004": ["CL-002"],
  })

  // Modal open and edit context state
  const [isIntakeOpen, setIsIntakeOpen] = React.useState(false)
  const [editingPatientData, setEditingPatientData] = React.useState<PatientIntakeValues | null>(null)
  const [editingPatientId, setEditingPatientId] = React.useState<string | null>(null)

  // Topbar navigation state
  const [navSelection, setNavSelection] = React.useState<"patients" | "clinicians" | "analytics" | "settings">("patients")

  // Simple getter for current active patient's shortlisted recommendations
  const activeShortlistedIds = activePatient ? shortlists[activePatient.id] || [] : []

  // Dynamic breadcrumbs based on navigation selections
  const breadcrumbs: BreadcrumbItem[] = [{ label: "ABBA" }]
  if (navSelection === "patients") {
    breadcrumbs.push({
      label: "Patients",
      onClick: activePatient ? () => setActivePatient(null) : undefined,
    })
    if (activePatient) {
      breadcrumbs.push({ label: activePatient.name })
    }
  } else {
    breadcrumbs.push({ label: navSelection.charAt(0).toUpperCase() + navSelection.slice(1) })
  }

  // Topbar Actions
  const topbarPrimaryAction = navSelection === "patients" ? (
    activePatient ? {
      label: "Edit Intake",
      onClick: () => {
        setEditingPatientData(activePatient.intakeData)
        setEditingPatientId(activePatient.id)
        setIsIntakeOpen(true)
      },
      variant: "outline" as const,
    } : {
      label: "New Patient Intake",
      onClick: () => {
        setEditingPatientData(null)
        setEditingPatientId(null)
        setIsIntakeOpen(true)
      },
    }
  ) : undefined

  const topbarSecondaryAction = navSelection === "patients" && activePatient ? {
    label: "Back to List",
    onClick: () => setActivePatient(null),
    variant: "ghost" as const,
  } : undefined

  // Delete patient handler
  const handleDeletePatient = (id: string) => {
    // Delete patient by filtering ID out of state array
    setPatients(patients.filter((p) => p.id !== id))
    if (activePatient?.id === id) {
      setActivePatient(null)
    }
    toast.success("Patient record successfully removed.")
  }

  // Bulk actions updates handler
  const handleBulkUpdate = (ids: string[], action: "delete" | "status" | "assign", value?: string) => {
    if (action === "delete") {
      // Bulk delete selected records
      setPatients(patients.filter((p) => !ids.includes(p.id)))
      toast.success(`${ids.length} patient records deleted.`)
    } else if (action === "status" && value) {
      // Bulk update status on matching IDs
      setPatients(
        patients.map((p) =>
          ids.includes(p.id)
            ? { ...p, status: value as PatientRecord["status"], lastUpdated: new Date().toISOString() }
            : p
        )
      )
      toast.success(`Updated status for ${ids.length} records.`)
    }
  }

  // Save partial intake values as Draft state
  const handleSaveIntakeDraft = (data: PatientIntakeValues) => {
    const id = editingPatientId || `PT-0${patients.length + 1}`
    const isNew = !editingPatientId

    const newRecord: PatientRecord = {
      id,
      name: `${data.legalFirstName} ${data.legalLastName}`.trim() || "Draft Patient",
      dob: data.dateOfBirth || "—",
      sex: data.genderIdentity || "—",
      status: "Draft",
      lastUpdated: new Date().toISOString(),
      assignedClinician: "—",
      email: data.email || "—",
      intakeData: data,
    }

    if (isNew) {
      setPatients([newRecord, ...patients])
    } else {
      setPatients(patients.map((p) => (p.id === id ? newRecord : p)))
      if (activePatient?.id === id) {
        setActivePatient(newRecord)
      }
    }

    setIsIntakeOpen(false)
    toast.info("Intake details persisted as Draft.")
  }

  // Submit complete intake values
  const handleSaveIntakeSubmit = (data: PatientIntakeValues) => {
    const id = editingPatientId || `PT-0${patients.length + 1}`
    const isNew = !editingPatientId

    const newRecord: PatientRecord = {
      id,
      name: `${data.legalFirstName} ${data.legalLastName}`,
      dob: data.dateOfBirth,
      sex: data.genderIdentity || "—",
      status: "Under Review",
      lastUpdated: new Date().toISOString(),
      assignedClinician: "—",
      email: data.email || "—",
      intakeData: data,
    }

    if (isNew) {
      setPatients([newRecord, ...patients])
    } else {
      setPatients(patients.map((p) => (p.id === id ? newRecord : p)))
      if (activePatient?.id === id) {
        setActivePatient(newRecord)
      }
    }

    setIsIntakeOpen(false)
    toast.success("Intake documentation finalized successfully.")
  }

  // Update clinician shortlisted recommendations
  const handleUpdateRecommendations = (ids: string[]) => {
    if (!activePatient) return
    setShortlists({
      ...shortlists,
      [activePatient.id]: ids,
    })
  }

  // Workspace patient record synchronization (e.g. status details updates)
  const handleUpdatePatient = (updatedPatient: PatientRecord) => {
    setPatients(patients.map((p) => (p.id === updatedPatient.id ? updatedPatient : p)))
    setActivePatient(updatedPatient)
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar navigation */}
      <Sidebar
        activeItem={navSelection}
        onItemChange={(item) => {
          setNavSelection(item)
          if (item !== "patients") {
            setActivePatient(null)
          }
        }}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Labeled breadcrumb topbar */}
        <Topbar
          breadcrumbs={breadcrumbs}
          primaryAction={topbarPrimaryAction}
          secondaryAction={topbarSecondaryAction}
        />

        {/* Dynamic content panel scroll wrapper */}
        <main className="flex-1 overflow-y-auto px-6 py-8">
          <div className="mx-auto max-w-7xl w-full">
            {navSelection === "patients" ? (
              activePatient ? (
                <PatientWorkspace
                  patient={activePatient}
                  clinicians={MOCK_CLINICIANS}
                  recommendedIds={activeShortlistedIds}
                  onBack={() => setActivePatient(null)}
                  onEditIntake={() => {
                    setEditingPatientData(activePatient.intakeData)
                    setEditingPatientId(activePatient.id)
                    setIsIntakeOpen(true)
                  }}
                  onUpdateRecommendations={handleUpdateRecommendations}
                  onUpdatePatient={handleUpdatePatient}
                />
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Patients Directory</h1>
                    <p className="text-xs text-muted-foreground">
                      Coordination hub • {patients.length} patient records registered.
                    </p>
                  </div>
                  <PatientHub
                    patients={patients}
                    onSelectPatient={setActivePatient}
                    onNewIntake={() => {
                      setEditingPatientData(null)
                      setEditingPatientId(null)
                      setIsIntakeOpen(true)
                    }}
                    onDeletePatient={handleDeletePatient}
                    onEditPatient={(p) => {
                      setEditingPatientData(p.intakeData)
                      setEditingPatientId(p.id)
                      setIsIntakeOpen(true)
                    }}
                    onBulkUpdate={handleBulkUpdate}
                  />
                </div>
              )
            ) : (
              <div className="h-96 bg-card border border-dashed rounded-2xl flex flex-col items-center justify-center p-8 text-center shadow-xs">
                <span className="font-bold text-lg mb-1 capitalize">{navSelection} Panel</span>
                <p className="text-sm text-muted-foreground max-w-sm">
                  This panel is currently inactive. Please navigate back to the Patients tab to review intakes and matching clinician lists.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Multi-step patient intake wizard modal */}
      <PatientIntakeModal
        open={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
        onSaveDraft={handleSaveIntakeDraft}
        onSubmit={handleSaveIntakeSubmit}
        editingPatient={editingPatientData}
      />
    </div>
  )
}

